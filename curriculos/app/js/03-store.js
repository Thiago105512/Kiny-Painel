/* ============================================================
   03-store — banco do usuário.
   Cada entidade é um documento JSON separado (evita um "estado" monolítico):
     local: localStorage "gab2:<doc>"   |   conta: db data/users/<id>/<doc>
   Sincronização: mescla item a item (local × conta × última versão comum) e acompanha
   ao vivo as mudanças de outros aparelhos. Escritas são agrupadas (1 por doc por vez).
   ============================================================ */
const DOC_PADRAO = {
  perfil:       () => ({ faculdade: null, gradeId: null, periodo: null, metas: { questoes: 20, minutos: 60 } }),
  dias:         () => ({ d: {} }),       // d[AAAA-MM-DD] = {q, ac, seg, temas:[]}  → StudySession diária
  erros:        () => ({ itens: {} }),   // itens[qid] = {qid, tema, ts, resp, motivo, coment, card, srs, status}
  cards:        () => ({ itens: {} }),   // itens[id]  = {id, frente, verso, tema, subtema, origem, dif, criado, srs}
  revisoes:     () => ({ temas: {} }),   // temas[id]  = srs (revisão espaçada do tema)
  notas:        () => ({ temas: {} }),   // temas[id]  = {texto, atualizado}
  materiais:    () => ({ itens: {} }),   // itens[id]  = {id, titulo, tipo, url, assetId, tema, criado}
  plano:        () => ({ itens: {} }),   // itens[id]  = {id, data, titulo, tema, disciplina, min, nq, rev, feito}
  simulados:    () => ({ hist: [] }),    // [{d, t, n, ac, seg, areas, filtros}]
  redacoes:     () => ({ itens: {} }),   // itens[id]  = {id, proposta, tema, texto, ts, aval:{fonte, notas[5], comentario}}
  casos:        () => ({ itens: {} }),   // casos criados pelo usuário/IA
  questoes:     () => ({ itens: {} }),   // questões próprias/IA
  grades:       () => ({ itens: {} }),   // matrizes importadas/editadas
  instituicoes: () => ({ itens: {} }),   // instituições adicionadas pelo usuário
  guia:         () => ({ g: {} }),       // checklist do guia de referência
  pilulas:      () => ({ v: {} }),       // v[id] = [ts, sabia 0/1] — pílulas de estudo vistas
  backups:      () => ({ itens: [] }),   // registro dos backups automáticos (não entra no próprio backup)
};
// Progresso das questões, fragmentado por trilha para cada doc ficar pequeno:
// prog-<trilha>.q[qid] = {n, ac, h:[[ts, resp, ok, ms, origem]…], m: marcada, r: revisar}
const docProg = t => "prog-" + t;
// Questões próprias/IA ficam em blocos "q-1", "q-2"… (até 150 cada), para nenhum documento passar do limite de 256 KB.
const TAM_BLOCO_Q = 150;
const nomeValido = n => n in DOC_PADRAO || n.startsWith("prog-") || /^(q|cards)-\d+$/.test(n);
const padrao = nome => nome.startsWith("prog-") ? { q: {} } : /^(q|cards)-\d+$/.test(nome) ? { itens: {} } : (DOC_PADRAO[nome] || (() => ({})))();

const store = (() => {
  const docs = {}, sujos = new Set(), gravando = {}, pend = {};
  const base = {};   // última versão confirmada na conta, por documento (para mesclar item a item)
  let db = null, uid = null, timer = null, aoMudarRemoto = null, avisoLS = 0, avisoTam = {};
  const chaveLS = n => "gab2:" + n;
  const J = o => JSON.stringify(o);
  const clonar = o => JSON.parse(J(o));

  function doc(nome) {
    if (!docs[nome]) docs[nome] = Object.assign(padrao(nome), ls.get(chaveLS(nome)) || {});
    return docs[nome];
  }
  function guardarLocal(nome) {
    if (!ls.set(chaveLS(nome), docs[nome]) && Date.now() - avisoLS > 60000) {
      avisoLS = Date.now();
      aviso("A memória deste aparelho está cheia: as últimas mudanças podem não ficar salvas nele. Faça um backup em Biblioteca → Dados.");
    }
    const lista = ls.get("gab2:lista", []); if (!lista.includes(nome)) { lista.push(nome); ls.set("gab2:lista", lista); }
  }
  function mudou(nome) {
    const d = doc(nome); d._ts = Date.now();
    guardarLocal(nome);
    if (!db) return;
    sujos.add(nome); clearTimeout(timer); timer = setTimeout(descarregar, 900); status("salvando…");
  }

  /* ---------- Mescla em três vias (local × conta × última versão comum) ----------
     Mapas de itens (questões, cards, erros, dias…) são mesclados chave a chave: o que só um lado
     mudou prevalece; o que um lado apagou sem que o outro tenha mexido some; se os dois mudaram
     o mesmo item, fica o que tem mais tentativas/revisões ou, no empate, o lado mais recente. */
  const MAPAS = ["q", "itens", "temas", "d", "v", "g"];
  const eMapa = (k, x) => MAPAS.includes(k) && x && typeof x === "object" && !Array.isArray(x);
  function preferir(l, r, localVence) {
    if (l && r && typeof l === "object" && typeof r === "object") {
      if (typeof l.n === "number" && typeof r.n === "number" && l.n !== r.n) return l.n > r.n ? l : r;
      const hl = l.srs?.hist?.length, hr = r.srs?.hist?.length;
      if (typeof hl === "number" && typeof hr === "number" && hl !== hr) return hl > hr ? l : r;
    }
    return localVence ? l : r;
  }
  function tresVias(l, r, b, temBase, localVence) {
    if (J(l) === J(r)) return l;
    if (temBase) { if (J(l) === J(b)) return r; if (J(r) === J(b)) return l; }
    return preferir(l, r, localVence);
  }
  function mesclarMapa(L, R, B, localVence) {
    const out = {};
    for (const k of new Set([...Object.keys(L), ...Object.keys(R)])) {
      const naB = !!B && k in B;
      if (k in L && k in R) out[k] = tresVias(L[k], R[k], naB ? B[k] : undefined, naB, localVence);
      else if (k in L) { if (!(naB && J(L[k]) === J(B[k]))) out[k] = L[k]; }        // só local: novo aqui, ou apagado lá
      else { if (!(naB && J(R[k]) === J(B[k]))) out[k] = R[k]; }                      // só na conta: novo lá, ou apagado aqui
    }
    return out;
  }
  function mesclarLista(L, R, B) {
    if (J(L) === J(R)) return L;
    if (B) { if (J(L) === J(B)) return R; if (J(R) === J(B)) return L; }
    const vistos = new Set(R.map(J)), out = R.concat(L.filter(x => !vistos.has(J(x))));
    return out.every(x => x && typeof x.d === "string") ? out.sort((a, b) => a.d.localeCompare(b.d)) : out;
  }
  function mesclar(local, remoto, b) {
    const localVence = (local._ts || 0) >= (remoto._ts || 0), out = {};
    for (const k of new Set([...Object.keys(local), ...Object.keys(remoto)])) {
      if (k === "_ts" || k === "_sync") continue;
      const L = local[k], R = remoto[k], B = b ? b[k] : undefined;
      if (eMapa(k, L) || eMapa(k, R)) out[k] = mesclarMapa(eMapa(k, L) ? L : {}, eMapa(k, R) ? R : {}, eMapa(k, B) ? B : null, localVence);
      else if (Array.isArray(L) && Array.isArray(R)) out[k] = mesclarLista(L, R, Array.isArray(B) ? B : null);
      else if (L === undefined) { if (!(b && J(R) === J(B))) out[k] = R; }
      else if (R === undefined) { if (!(b && J(L) === J(B))) out[k] = L; }
      else out[k] = tresVias(L, R, B, !!b && k in b, localVence);
    }
    out._ts = Math.max(local._ts || 0, remoto._ts || 0);
    return out;
  }
  const semLocal = d => { const c = clonar(d); delete c._sync; return c; };

  async function gravar(nome) {
    if (gravando[nome]) { pend[nome] = true; return; }
    gravando[nome] = true;
    const corpo = semLocal(docs[nome]), tam = J(corpo).length;
    if (tam > 250000) {
      status("dados grandes demais para a conta");
      if (!avisoTam[nome]) { avisoTam[nome] = 1; aviso("Uma parte dos seus dados ficou grande demais para ser guardada na conta. Ela continua salva neste aparelho; faça um backup em Biblioteca → Dados."); }
    } else {
      try {
        await db.doc(`data/users/${uid}/${nome}`).set(corpo);
        base[nome] = corpo; docs[nome]._sync = corpo._ts; guardarLocal(nome);
        status("salvo na sua conta");
      } catch (e) { status(e?.code === "quota_exceeded" ? "limite de armazenamento atingido" : "sem conexão — salvo neste aparelho"); }
    }
    gravando[nome] = false;
    if (pend[nome]) { pend[nome] = false; gravar(nome); }
  }
  function descarregar() { const l = [...sujos]; sujos.clear(); l.forEach(gravar); }
  function status(t) { const el = document.getElementById("sync"); if (el) el.textContent = t; }
  function aviso(t) { if (typeof toast === "function") toast(t, 8000); }

  /** Recebe uma versão da conta e a combina com a local. Devolve true se a local mudou. */
  function receber(nome, remoto) {
    if (nome === "estado" || !nomeValido(nome)) return false;
    const local = docs[nome] || (ls.get(chaveLS(nome)) ? doc(nome) : null);
    let final;
    if (!local) final = remoto;
    else if (base[nome]) final = mesclar(local, remoto, base[nome]);                  // sessão já sincronizada
    else if ((local._ts || 0) <= (local._sync || 0)) final = remoto;                  // nada pendente aqui: a conta vence
    else final = mesclar(local, remoto, null);                                        // mudanças feitas fora do ar
    const antes = local ? J(semLocal(local)) : null;
    docs[nome] = Object.assign(padrao(nome), clonar(final));
    base[nome] = clonar(remoto);
    if (J(docs[nome]) !== J(remoto)) sujos.add(nome); else docs[nome]._sync = remoto._ts || 0;
    guardarLocal(nome);
    return antes !== J(semLocal(docs[nome]));
  }

  /** Conecta à conta (quando o app roda como artefato). Sem conta, tudo fica local. */
  async function conectar() {
    ls.get("gab2:lista", []).forEach(doc);
    migrarLocalV1();
    const use = window.claude && window.claude.use;
    if (!use) { status("salvando neste aparelho"); return; }
    try {
      const [u, d] = await Promise.all([use("user"), use("db")]);
      if (!u || !d) { status("salvando neste aparelho"); return; }
      uid = await u.id(); if (!uid) { status("salvando neste aparelho"); return; }
      db = d;
      const snap = await db.collection(`data/users/${uid}`).get();
      const remotos = {}; snap.docs.forEach(x => { remotos[x.id] = x.data(); });
      if (!remotos.perfil && remotos.estado) await migrarRemotoV1(remotos.estado);
      let mudouAlgo = false;
      for (const [nome, corpo] of Object.entries(remotos)) mudouAlgo = receber(nome, corpo) || mudouAlgo;
      // O que só existe aqui (ou mudou fora do ar) sobe para a conta
      Object.keys(docs).forEach(n => { if (!remotos[n] && ((docs[n]._ts || 0) > 0)) sujos.add(n); });
      descarregar();
      status("salvo na sua conta");
      if (mudouAlgo && aoMudarRemoto) aoMudarRemoto();
      acompanhar();
    } catch (e) { db = null; status("salvando neste aparelho"); }
  }
  /** Mudanças feitas em outro aparelho chegam ao vivo e são mescladas. */
  let tRemoto = null;
  function acompanhar() {
    try {
      db.collection(`data/users/${uid}`).onSnapshot(snap => {
        if (snap.metadata?.hasPendingWrites) return;
        let mudouAlgo = false;
        snap.docChanges().forEach(ch => {
          if (ch.type === "removed") return;
          const corpo = ch.doc.data(); if (!corpo || J(corpo) === J(base[ch.doc.id])) return;
          mudouAlgo = receber(ch.doc.id, corpo) || mudouAlgo;
        });
        if (sujos.size) { clearTimeout(timer); timer = setTimeout(descarregar, 900); }
        if (mudouAlgo && aoMudarRemoto) { clearTimeout(tRemoto); tRemoto = setTimeout(aoMudarRemoto, 400); }
      }, () => { });
    } catch (e) { }
  }

  /* ---------- Migração do formato v1 (estado único {r,g,dias,sim} + questões próprias) ---------- */
  function aplicarV1(estado, extras) {
    if (!estado) return;
    const tr = {};
    QUESTOES_BASE.forEach(q => { tr[q.id] = q.t; });
    (extras || []).forEach(x => { tr[x.id] = x.t; });
    for (const [qid, v] of Object.entries(estado.r || {})) {
      const t = tr[qid]; if (!t || !Array.isArray(v)) continue;
      const p = doc(docProg(t)); if (p.q[qid]) continue;
      p.q[qid] = { n: (v[0] || 0) + (v[1] || 0), ac: v[0] || 0, h: [[v[3] || Date.now(), null, v[2] ? 1 : 0, null, "v1"]], m: 0, r: 0 };
      mudou(docProg(t));
    }
    const g = doc("guia"); Object.assign(g.g, estado.g || {}); mudou("guia");
    const dd = doc("dias"); for (const [k, n] of Object.entries(estado.dias || {})) dd.d[k] = dd.d[k] || { q: n, ac: 0, seg: 0, temas: [] }; mudou("dias");
    const s = doc("simulados"); if (!s.hist.length && Array.isArray(estado.sim)) { s.hist = estado.sim.slice(-50); mudou("simulados"); }
    const qs = doc("questoes"); (extras || []).forEach(x => { if (x && x.id && !qs.itens[x.id]) qs.itens[x.id] = x; }); mudou("questoes");
    const p = doc("perfil"); p.migradoDe = "v1"; mudou("perfil");
  }
  function migrarLocalV1() {
    if (ls.get("gab2:lista", []).includes("perfil")) return;
    const v1 = ls.get("gabarito-am-v1");
    if (v1) aplicarV1(v1.estado, v1.extras);
    else { doc("perfil"); guardarLocal("perfil"); }   // sem _ts: no aparelho novo, o perfil da conta prevalece
  }
  async function migrarRemotoV1(estado) {
    let extras = [];
    try { const qs = await db.collection(`data/users/${uid}/estado/questoes`).get(); extras = qs.docs.map(x => ({ ...x.data(), id: x.id })); } catch (e) { }
    aplicarV1(estado, extras);
  }

  /** Backup completo (exportação/importação manual). */
  const exportar = () => ({ formato: "gabarito-am", versao: 2, exportado: new Date().toISOString(), docs: Object.fromEntries(Object.keys(docs).filter(n => n !== "backups").map(n => [n, docs[n]])) });
  function importar(obj) {
    if (obj && obj.estado) { aplicarV1(obj.estado, obj.extras); return; } // backup antigo
    if (!obj || obj.formato !== "gabarito-am" || typeof obj.docs !== "object") throw new Error("formato");
    // Restaurar = voltar ao estado do backup: coleções que não existiam nele voltam ao padrão.
    Object.keys(docs).forEach(n => { if (n !== "backups" && !(n in obj.docs)) { docs[n] = padrao(n); mudou(n); } });
    for (const [n, corpo] of Object.entries(obj.docs)) {
      if (!nomeValido(n) || n === "backups" || typeof corpo !== "object") continue;
      docs[n] = Object.assign(padrao(n), corpo); mudou(n);
    }
  }
  function zerar(nomes) { nomes.forEach(n => { docs[n] = padrao(n); mudou(n); }); }
  const nomes = () => Object.keys(docs);

  return { doc, mudou, conectar, exportar, importar, zerar, nomes, aoRemoto: f => { aoMudarRemoto = f; }, get naConta() { return !!db; }, _mesclar: mesclar };
})();
