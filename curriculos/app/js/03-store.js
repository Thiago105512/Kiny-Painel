/* ============================================================
   03-store — banco do usuário.
   Cada entidade é um documento JSON separado (evita um "estado" monolítico):
     local: localStorage "gab2:<doc>"   |   conta: db data/users/<id>/<doc>
   O mais recente (_ts) vence ao sincronizar. Escritas são agrupadas (1 por doc por vez).
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
  backups:      () => ({ itens: [] }),   // registro dos backups automáticos (não entra no próprio backup)
};
// Progresso das questões, fragmentado por trilha para cada doc ficar pequeno:
// prog-<trilha>.q[qid] = {n, ac, h:[[ts, resp, ok, ms, origem]…], m: marcada, r: revisar}
const docProg = t => "prog-" + t;
const padrao = nome => nome.startsWith("prog-") ? { q: {} } : (DOC_PADRAO[nome] || (() => ({})))();

const store = (() => {
  const docs = {}, sujos = new Set(), gravando = {}, pend = {};
  let db = null, uid = null, timer = null, aoMudarRemoto = null;
  const chaveLS = n => "gab2:" + n;

  function doc(nome) {
    if (!docs[nome]) docs[nome] = Object.assign(padrao(nome), ls.get(chaveLS(nome)) || {});
    return docs[nome];
  }
  function mudou(nome) {
    const d = doc(nome); d._ts = Date.now();
    ls.set(chaveLS(nome), d);
    const lista = ls.get("gab2:lista", []); if (!lista.includes(nome)) { lista.push(nome); ls.set("gab2:lista", lista); }
    if (!db) return;
    sujos.add(nome); clearTimeout(timer); timer = setTimeout(descarregar, 900); status("salvando…");
  }
  async function gravar(nome) {
    if (gravando[nome]) { pend[nome] = true; return; }
    gravando[nome] = true;
    try { await db.doc(`data/users/${uid}/${nome}`).set(JSON.parse(JSON.stringify(docs[nome]))); status("salvo na sua conta"); }
    catch (e) { status(e?.code === "quota_exceeded" ? "limite de armazenamento atingido" : "sem conexão — salvo neste aparelho"); }
    gravando[nome] = false;
    if (pend[nome]) { pend[nome] = false; gravar(nome); }
  }
  function descarregar() { const l = [...sujos]; sujos.clear(); l.forEach(gravar); }
  function status(t) { const el = document.getElementById("sync"); if (el) el.textContent = t; }

  /** Conecta à conta (quando o app roda como artefato). Sem conta, tudo fica local. */
  async function conectar() {
    // Carrega tudo o que existe localmente
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
      for (const [nome, corpo] of Object.entries(remotos)) {
        if (nome === "estado" || !(nome in DOC_PADRAO || nome.startsWith("prog-"))) continue;
        const local = docs[nome];
        if (!local || (corpo._ts || 0) > (local._ts || 0)) { docs[nome] = Object.assign(padrao(nome), JSON.parse(JSON.stringify(corpo))); ls.set(chaveLS(nome), docs[nome]); mudouAlgo = true; }
      }
      // O que só existe (ou é mais novo) aqui sobe para a conta
      Object.keys(docs).forEach(n => { if (!remotos[n] || (docs[n]._ts || 0) > (remotos[n]._ts || 0)) sujos.add(n); });
      descarregar();
      status("salvo na sua conta");
      if (mudouAlgo && aoMudarRemoto) aoMudarRemoto();
    } catch (e) { db = null; status("salvando neste aparelho"); }
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
    else mudou("perfil");
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
      if (!(n in DOC_PADRAO || n.startsWith("prog-")) || n === "backups" || typeof corpo !== "object") continue;
      docs[n] = Object.assign(padrao(n), corpo); mudou(n);
    }
  }
  function zerar(nomes) { nomes.forEach(n => { docs[n] = padrao(n); mudou(n); }); }
  const nomes = () => Object.keys(docs);

  return { doc, mudou, conectar, exportar, importar, zerar, nomes, aoRemoto: f => { aoMudarRemoto = f; }, get naConta() { return !!db; } };
})();
