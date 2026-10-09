/* ============================================================
   41-duelo — Duelo ao vivo (#/duelo): as mesmas questões, ao mesmo tempo,
   com uma amiga que abre o mesmo app. Placar ao vivo, 20 s por questão,
   pontos por acerto + bônus de rapidez, pódio no fim.

   Tudo pela PRESENÇA da sala (capability "room"): qualquer pessoa na sala pode
   publicar a própria presença e todos recebem por onPeers. Não usamos emit/on
   (tópicos de evento são só de quem pode editar o artefato; a amiga que entra
   pelo link não é). Cada jogador publica:
     {duelo: código, papel: "anfitriao"|"jogador", apelido, area, r (rodada),
      ids (só a anfitriã), estado: esperando|contando|jogando|fim, inicio, i, pontos, acertos, fimEm}
   Quem lê valida tudo (código, ids existentes no banco e da área do perfil,
   números dentro dos limites, apelido curto) e mostra só com esc().
   Contagem 3-2-1: cada um conta 3 s a partir do momento em que RECEBE o
   "contando" da anfitriã (relógios diferentes não atrapalham).
   Sem sala (null) ou sem ninguém em 2 min: "Desafiar o fantasma" — as mesmas
   regras contra o próprio desempenho anterior (store.doc("jogos").duelos).
   ============================================================ */
const DUELO = { tempo: 20000, conta: 3000, espera: 120000, maxPts: 150, ns: [5, 10, 15], leitura: 3500 };
const DU_ALFA = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";   // sem 0/O, 1/I/L: fácil de ditar e de ler
const DU_ESTADOS = ["esperando", "contando", "jogando", "fim"];
const DU_AREA_NOME = { medicina: "Medicina", residencia: "Residência", enem: "ENEM", direito: "Direito", oab: "OAB" };
const DU = { fase: "inicio", modo: null, papel: null, id: "", apelido: "", n: 10, area: "", ids: [], r: 0 };
let _duRoom, _duRoomP = null, _duTimer = null, _duEspera = null, _duLiderEm = 0;

/* ---------- Sala (room): carregada só quando o Duelo é aberto ---------- */
function salaDuelo() {
  if (_duRoomP) return _duRoomP;
  _duRoomP = (async () => {
    try {
      const use = window.claude && window.claude.use; if (typeof use !== "function") return null;
      const r = await Promise.race([use.call(window.claude, "room"), new Promise(ok => setTimeout(() => ok(null), 5000))]);
      return r && typeof r.presence === "function" && typeof r.onPeers === "function" ? r : null;
    } catch (e) { return null; }
  })().then(r => {
    _duRoom = r;
    if (r) try { r.onPeers(aoMudarSala, () => { _duRoom = null; if (DU.modo === "vivo" && DU.fase !== "fim") anunciarDuelo("A sala ao vivo caiu. O seu jogo continua."); }); } catch (e) { _duRoom = null; }
    if (caminhoAtual() === "/duelo" && DU.fase === "inicio") atualizar();
    return _duRoom;
  });
  return _duRoomP;
}
const salaOk = () => !!_duRoom;

/* ---------- Validação do que chega dos outros (dados não confiáveis) ---------- */
const intEntre = (x, a, b) => Number.isInteger(x) && x >= a && x <= b ? x : null;
/** Caracteres de controle e invisíveis (direção de texto, largura zero…): fora do apelido. Montado por código-ponto. */
const DU_INVIS = new RegExp("[" + [[0, 0x1f], [0x7f, 0x9f], [0xad, 0xad], [0x61c, 0x61c], [0x180e, 0x180e], [0x200b, 0x200c], [0x200e, 0x200f], [0x2028, 0x202e], [0x2060, 0x206f], [0xfeff, 0xfeff], [0xfff9, 0xfffb]]
  .map(([a, b]) => { const h = n => "\\u" + n.toString(16).padStart(4, "0"); return h(a) + "-" + h(b); }).join("") + "]", "g");
/** Apelido: sem caracteres de controle/invisíveis, espaços simples, até 16 caracteres (emoji inteiro). */
function limparApelido(s) {
  if (typeof s !== "string") return "";
  const t = s.slice(0, 200).replace(DU_INVIS, "").replace(/\s+/g, " ").trim();
  return Array.from(t).slice(0, 16).join("").trim();
}
const codigoValido = c => typeof c === "string" && c.length === 4 && [...c].every(x => DU_ALFA.includes(x));
/** Lista de questões da anfitriã: 5, 10 ou 15 ids distintos que existem no banco. Qualquer coisa fora disso → null. */
function idsValidos(ids) {
  if (!Array.isArray(ids) || !DUELO.ns.includes(ids.length)) return null;
  const vistos = new Set();
  for (const x of ids) {
    if (typeof x !== "string" || x.length > 64 || vistos.has(x)) return null;
    const q = qPorId(x); if (!q || q.src !== "banco" || !Array.isArray(q.o) || q.o.length < 2 || q.o.length > 5) return null;
    vistos.add(x);
  }
  return ids.slice();
}
function lerJogador(peer) {
  const p = peer && peer.presence; if (!p || typeof p !== "object") return null;
  if (!codigoValido(p.duelo)) return null;
  const papel = p.papel === "anfitriao" || p.papel === "jogador" ? p.papel : null; if (!papel) return null;
  const ids = papel === "anfitriao" ? idsValidos(p.ids) : null, n = ids ? ids.length : 15;
  const num = x => typeof x === "number" && isFinite(x) ? x : 0;
  return { peer: String(peer.peer || "").slice(0, 80), id: p.duelo, papel, ids, apelido: limparApelido(p.apelido) || "Jogador",
    area: typeof p.area === "string" && /^[a-z]{1,20}$/.test(p.area) ? p.area : "", estado: DU_ESTADOS.includes(p.estado) ? p.estado : "esperando",
    r: intEntre(p.r, 0, 9999) ?? 0, i: intEntre(p.i, 0, n) ?? 0, pontos: intEntre(p.pontos, 0, n * DUELO.maxPts) ?? 0, acertos: intEntre(p.acertos, 0, n) ?? 0,
    inicio: num(p.inicio), fimEm: num(p.fimEm), revanche: p.revanche === true, guest: !!peer.guest };
}

/* ---------- Questões: do objetivo, fáceis/médias, curtas, de preferência inéditas ---------- */
const areaDuelo = () => objetivo() || "medicina";
function poolDuelo() {
  const P = poolJogo().filter(q => q.o.length <= 5);
  const curtas = P.filter(q => (q.dif || 2) <= 2 && q.q.length <= 360);
  return curtas.length >= 15 ? curtas : P;
}
const dueloDisponivel = () => poolDuelo().length >= 15;
function montarIdsDuelo(n) {
  const P = poolDuelo(), novas = embaralhar(P.filter(q => statusQ(q).chave === "nao")), velhas = embaralhar(P.filter(q => statusQ(q).chave !== "nao"));
  const out = [], fam = new Set();
  for (const q of novas.concat(velhas)) { if (out.length >= n) break; if (q.familia) { if (fam.has(q.familia)) continue; fam.add(q.familia); } out.push(q.id); }
  return out;
}
/** Ordem das alternativas igual para todos: sorteio com semente = código + rodada + questão. */
function ordemDuelo(qid, n) {
  let s = hashTxt(`${DU.id}:${DU.r}:${qid}`) || 1;
  const rnd = () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const a = [...Array(n).keys()];
  for (let i = n - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
const pontosDe = (ok, ms) => ok ? 100 + Math.round(50 * Math.max(0, 1 - ms / DUELO.tempo)) : 0;

/* ---------- Estado e presença ---------- */
function zerarRodada() { Object.assign(DU, { i: 0, resp: null, tq: 0, pontos: 0, acertos: 0, porQ: [], fimEm: 0, jogou: false, contou: false, festejou: false, saiu: {}, lider: null, aviso5: -1, verErros: false, inicio: 0, convite: false, querRevanche: false, aviso: "" }); }
function zerarDuelo() { pararTiqueDuelo(); clearTimeout(_duEspera); Object.assign(DU, { fase: "inicio", modo: null, papel: null, id: "", ids: [], r: 0, area: "", outros: {}, ninguem: false, erro: "", fantasma: null, hostVisto: false, procurandoDesde: 0 }); zerarRodada(); }
zerarDuelo();
const estadoDuelo = () => ({ sala: "esperando", procurando: "esperando", contando: "contando", jogando: "jogando", fim: "fim" })[DU.fase] || "esperando";
function publicarDuelo() {
  if (!_duRoom || DU.modo !== "vivo" || !DU.id) return;
  try {
    _duRoom.presence({ duelo: DU.id, papel: DU.papel, apelido: DU.apelido, area: DU.area, r: DU.r, estado: estadoDuelo(), ids: DU.papel === "anfitriao" ? DU.ids : null,
      inicio: DU.inicio || null, i: DU.i, pontos: DU.pontos, acertos: DU.acertos, fimEm: DU.fimEm || null, revanche: DU.fase === "fim" && !!DU.querRevanche }).catch(() => { });
  } catch (e) { }
}
function sairDaSala() {
  if (!_duRoom) return;
  try { _duRoom.presence({ duelo: null, papel: null, apelido: null, area: null, r: null, estado: null, ids: null, inicio: null, i: null, pontos: null, acertos: null, fimEm: null, revanche: null }).catch(() => { }); } catch (e) { }
}
/** Leitor de tela: uma região só, fora da página (não é refeita a cada render), e só para o que importa. */
function anunciarDuelo(txt) {
  let el = document.getElementById("du-anuncio");
  if (!el) { el = document.createElement("p"); el.id = "du-anuncio"; el.className = "du-anuncio"; el.setAttribute("aria-live", "polite"); el.setAttribute("role", "status"); document.body.appendChild(el); }
  el.textContent = ""; setTimeout(() => { el.textContent = txt; }, 60);
}
const anfitria = () => Object.values(DU.outros).find(j => j.papel === "anfitriao");
/** Jogadores desta rodada que já estão no jogo (ou no fim). */
const naPartida = j => j.r === DU.r && j.estado !== "esperando";

function aoMudarSala(ch) {
  if (DU.modo !== "vivo" || !DU.id) return;
  const novos = {};
  for (const peer of ch.peers || []) {
    if (!peer || peer.sameTab || (peer.kind && peer.kind !== "viewer")) continue;
    const j = lerJogador(peer); if (j && j.id === DU.id) novos[j.peer] = j;
  }
  // Quem estava e sumiu (fechou o app ou saiu do duelo): "X saiu", o duelo continua para os outros.
  for (const [k, j] of Object.entries(DU.outros)) if (!novos[k]) {
    DU.saiu[k] = j;
    if (DU.fase !== "inicio") { anunciarDuelo(`${j.apelido} saiu do duelo.`); toast(`${j.apelido} saiu do duelo`); }
  }
  for (const k of Object.keys(novos)) delete DU.saiu[k];
  DU.outros = novos;
  reagirDuelo();
}

/** Decide o que fazer com o que os outros publicaram. */
function reagirDuelo() {
  const h = anfitria(), aqui = caminhoAtual() === "/duelo";
  if (DU.papel === "jogador") {
    if (!h) {
      if (DU.hostVisto && (DU.fase === "sala" || DU.fase === "procurando")) { DU.fase = "procurando"; DU.erro = "A anfitriã saiu e o duelo foi cancelado."; DU.hostVisto = false; if (aqui) atualizar(); return; }
    } else {
      // Entrando, ou chamado para a revanche
      const novaRodada = h.r !== DU.r && h.estado === "esperando";
      if (DU.fase === "procurando" || (DU.fase === "fim" && novaRodada && DU.querRevanche)) {
        const erro = h.ids ? erroArea(h) : "Este duelo chegou com dados inválidos. Peça para a anfitriã criar outro.";
        if (erro) { DU.erro = erro; if (aqui) atualizar(); return; }
        if (DU.fase === "procurando" && h.estado !== "esperando") { DU.erro = "Este duelo já começou. Espere a próxima rodada ou peça uma revanche."; if (aqui) atualizar(); return; }
        Object.assign(DU, { ids: h.ids, r: h.r, area: h.area, n: h.ids.length, fase: "sala", erro: "", hostVisto: true }); zerarRodada();
        publicarDuelo(); anunciarDuelo("Você entrou no duelo. Esperando a anfitriã começar."); if (aqui) atualizar(); return;
      }
      if (DU.fase === "fim" && novaRodada && !DU.convite) { DU.convite = true; if (aqui) atualizar(); return; }
      if (DU.fase === "sala" && h.r === DU.r && (h.estado === "contando" || h.estado === "jogando")) { comecarContagem(); return; }
      if (DU.fase === "sala" && h.ids && h.r !== DU.r && h.estado === "esperando" && !erroArea(h)) { Object.assign(DU, { ids: h.ids, r: h.r, n: h.ids.length }); zerarRodada(); publicarDuelo(); }
    }
  }
  if (DU.fase === "sala" && DU.papel === "anfitriao" && Object.keys(DU.outros).length) DU.ninguem = false;
  if (!aqui) return;
  if (DU.fase === "sala" || DU.fase === "procurando" || DU.fase === "fim") { atualizar(); if (DU.fase === "fim") conferirVitoria(); }
  else if (DU.fase === "jogando" || DU.fase === "contando") atualizarPlacar();
}
function erroArea(h) {
  const o = objetivo();
  if (o && h.area && h.area !== o) return `Este duelo é de ${DU_AREA_NOME[h.area] || "outra área"} e o seu perfil está em ${DU_AREA_NOME[o] || o}. Para entrar, troque a área em Áreas de estudo.`;
  if (!h.ids.every(id => doObjetivo(qPorId(id)))) return "Este duelo tem questões de outra área de estudo. Peça para a anfitriã criar outro.";
  return "";
}

/* ---------- Fantasma: o seu desempenho anterior (ou a sua média) ---------- */
function historicoDuelos() { const D = store.doc("jogos"); return (Array.isArray(D.duelos) ? D.duelos : []).filter(h => h && Array.isArray(h.pts) && h.pts.length); }
function montarFantasma() {
  const ult = historicoDuelos().filter(h => h.area === DU.area).pop(), n = DU.ids.length;
  const lim = (x, a, b, d) => typeof x === "number" && isFinite(x) ? Math.max(a, Math.min(b, Math.round(x))) : d;
  if (ult) {
    const k = i => i % ult.pts.length;
    return { nome: "Fantasma", desc: `o seu duelo de ${dataBR(ult.d)}`, plano: DU.ids.map((_, i) => ({ pts: lim(ult.pts[k(i)], 0, DUELO.maxPts, 0), ms: lim(ult.ms?.[k(i)], 1500, DUELO.tempo, 9000) })) };
  }
  // Sem histórico: média de acerto nos temas destas questões (ou geral) e o ritmo médio dela.
  const temas = new Set(DU.ids.map(id => qPorId(id)?.tema).filter(Boolean));
  let n0 = 0, ac = 0; const tempos = [];
  for (const q of questoes()) { if (!temas.has(q.tema)) continue; const p = progDe(q); if (!p?.n) continue; n0 += p.n; ac += p.ac; (p.h || []).forEach(t => { if (t[3] > 0) tempos.push(t[3]); }); }
  if (n0 < 5) { const d = Object.values(store.doc("dias").d); const q = d.reduce((s, x) => s + (x.q || 0), 0), a = d.reduce((s, x) => s + (x.ac || 0), 0); if (q >= 5) { n0 = q; ac = a; } }
  const taxa = n0 >= 5 ? ac / n0 : 0.6, ritmo = lim(tempos.length ? tempos.reduce((s, x) => s + x, 0) / tempos.length : 9000, 4000, 18000, 9000);
  const plano = DU.ids.map(qid => { const ok = hashTxt(DU.id + ":" + qid) % 100 < Math.round(taxa * 100); return { pts: pontosDe(ok, ritmo), ms: ritmo }; });
  return { nome: "Fantasma", desc: `a sua média: ${Math.round(taxa * 100)}% de acerto, ${Math.round(ritmo / 1000)} s por questão`, plano };
}
/** Onde o fantasma está agora: responde cada questão no tempo dele e "lê" a explicação por alguns segundos. */
function estadoFantasma() {
  const F = DU.fantasma; if (!F) return null;
  const decorrido = DU.inicio ? Date.now() - DU.inicio : 0; let t = 0, feitas = 0, pontos = 0, acertos = 0;
  for (const x of F.plano) { t += x.ms; if (t > decorrido) break; feitas++; pontos += x.pts; if (x.pts > 0) acertos++; t += DUELO.leitura; }
  const n = F.plano.length;
  return { peer: "fantasma", apelido: "Fantasma", fantasma: true, i: Math.min(feitas, n - 1), feitas, pontos, acertos, estado: feitas >= n ? "fim" : "jogando" };
}

/* ---------- Placar ---------- */
function jogadoresDuelo() {
  const n = DU.ids.length, eu = { peer: "eu", eu: true, apelido: DU.modo === "vivo" ? DU.apelido : "Você", i: DU.i, pontos: DU.pontos, acertos: DU.acertos, estado: estadoDuelo(), feitas: DU.porQ.length };
  const lista = [eu];
  if (DU.modo === "fantasma") { const f = estadoFantasma(); if (f) lista.push(f); }
  else {
    Object.values(DU.outros).filter(naPartida).forEach(j => lista.push({ ...j, pontos: Math.min(j.pontos, n * DUELO.maxPts), acertos: Math.min(j.acertos, n), i: Math.min(j.i, n - 1) }));
    Object.values(DU.saiu).filter(naPartida).forEach(j => lista.push({ ...j, saiu: true, pontos: Math.min(j.pontos, n * DUELO.maxPts), i: Math.min(j.i, n - 1) }));
  }
  return lista.sort((a, b) => b.pontos - a.pontos || (b.eu ? 1 : 0) - (a.eu ? 1 : 0));
}
const nomeJog = j => j.eu ? (DU.modo === "vivo" ? `${esc(j.apelido)} <small>(você)</small>` : "Você") : j.fantasma ? `<span aria-hidden="true">👻</span> Fantasma` : esc(j.apelido);
function situacaoJog(j) {
  if (j.saiu) return "saiu";
  if (j.estado === "fim") return "terminou";
  if (j.estado === "contando") return "preparando";
  return `questão ${Math.min(j.i + 1, DU.ids.length)} de ${DU.ids.length}`;
}
function htmlPlacar() {
  const L = jogadoresDuelo(), top = L[0]?.pontos || 0, lider = top > 0 && L.filter(j => j.pontos === top).length === 1 ? L[0] : null;
  return `<ol class="du-placar">${L.map((j, k) => `<li class="${j.eu ? "eu" : ""}${j === lider ? " lider" : ""}${j.saiu ? " saiu" : ""}">
    <span class="du-pos" aria-hidden="true">${j === lider ? "👑" : k + 1 + "º"}</span><span class="du-nome"><b>${nomeJog(j)}</b><small>${situacaoJog(j)}${j === lider ? " · lidera" : ""}</small></span>
    <span class="du-pts"><b>${j.pontos}</b> <small>${j.pontos === 1 ? "ponto" : "pontos"}</small></span></li>`).join("")}</ol>`;
}
/** Só o placar (sem refazer a página): chamado quando os outros avançam ou quando o fantasma responde. */
function atualizarPlacar() {
  const el = document.getElementById("du-placar"); if (el) el.innerHTML = htmlPlacar();
  // Mudança de liderança: um aviso falado, no máximo a cada 4 s (sem tagarelar a cada ponto).
  const L = jogadoresDuelo(), top = L[0]?.pontos || 0, lider = top > 0 && L.filter(j => j.pontos === top).length === 1 ? L[0] : null, chave = lider ? lider.peer : null;
  if (chave && chave !== DU.lider && Date.now() - _duLiderEm > 4000 && DU.fase === "jogando") {
    _duLiderEm = Date.now(); anunciarDuelo(lider.eu ? "Você assumiu a liderança." : `${lider.fantasma ? "O fantasma" : lider.apelido} assumiu a liderança.`);
  }
  if (chave) DU.lider = chave;
  const pod = document.getElementById("du-podio"); if (pod && DU.fase === "fim" && DU.modo === "fantasma") { pod.outerHTML = htmlPodio(); conferirVitoria(); }
}

/* ---------- Relógio: contagem 3-2-1, 20 s por questão, fantasma ---------- */
function tiqueDuelo() {
  const agora = Date.now();
  if (DU.fase === "contando") {
    const s = Math.max(1, Math.ceil((DU.inicio - agora) / 1000)), el = document.getElementById("du-conta");
    if (el && el.textContent !== String(s)) el.textContent = s;
    if (agora >= DU.inicio) comecarJogo();
    return;
  }
  if (DU.fase === "jogando") {
    if (DU.resp == null) {
      const resta = Math.max(0, DUELO.tempo - (agora - DU.tq)), seg = Math.ceil(resta / 1000);
      const el = document.getElementById("du-tempo"); if (el) { el.textContent = seg + " s"; el.classList.toggle("pouco", seg <= 5); }
      const b = document.getElementById("du-barra"); if (b) b.style.width = (100 * resta / DUELO.tempo).toFixed(1) + "%";
      if (seg <= 5 && DU.aviso5 !== DU.i) { DU.aviso5 = DU.i; anunciarDuelo("Faltam 5 segundos."); }
      if (resta <= 0) { responderDuelo(-1); return; }
    }
    if (DU.modo === "fantasma") { const f = estadoFantasma(), k = f ? f.feitas : 0; if (k !== DU._fk) { DU._fk = k; atualizarPlacar(); } }
    return;
  }
  if (DU.fase === "fim" && DU.modo === "fantasma") { const f = estadoFantasma(); if (f && f.feitas !== DU._fk) { DU._fk = f.feitas; atualizarPlacar(); } if (!f || f.estado === "fim") pararTiqueDuelo(); return; }
  pararTiqueDuelo();
}
function iniciarTiqueDuelo() { pararTiqueDuelo(); _duTimer = setInterval(tiqueDuelo, 200); }
function pararTiqueDuelo() { if (_duTimer) { clearInterval(_duTimer); _duTimer = null; } }

function comecarContagem() {
  if (DU.fase === "contando" || DU.fase === "jogando") return;
  zerarRodada(); DU.fase = "contando"; DU.inicio = Date.now() + DUELO.conta;
  publicarDuelo(); anunciarDuelo("O duelo vai começar em 3 segundos.");
  if (caminhoAtual() === "/duelo") render({ topo: true }); else ir("#/duelo");
  iniciarTiqueDuelo();
}
function comecarJogo() {
  DU.fase = "jogando"; DU.i = 0; DU.resp = null; DU.tq = Date.now(); DU._fk = 0;
  if (DU.modo === "fantasma") DU.inicio = Date.now();
  publicarDuelo(); if (caminhoAtual() === "/duelo") render({ topo: true });
  iniciarTiqueDuelo(); focarQuestaoDuelo();
}
const focarQuestaoDuelo = () => setTimeout(() => document.querySelector('#du-jogo [data-act="du-alt"]')?.focus({ preventScroll: true }), 0);
function responderDuelo(k) {
  if (DU.fase !== "jogando" || DU.resp != null) return;
  const q = qPorId(DU.ids[DU.i]); if (!q) return;
  const ms = Math.min(DUELO.tempo, Date.now() - DU.tq), ok = k === q.c, pts = k >= 0 ? pontosDe(ok, ms) : 0;
  DU.resp = k; DU.pontos += pts; if (ok) DU.acertos++;
  DU.porQ.push({ qid: q.id, ok: ok ? 1 : 0, pts, ms });
  if (k >= 0) { DU.jogou = true; registrarResposta(q, k, ms, "jogo"); }
  som(ok ? "ok" : "erro"); publicarDuelo();
  if (caminhoAtual() === "/duelo") render();
  setTimeout(() => { const v = document.querySelector("#du-jogo .veredito"); if (v) { v.focus({ preventScroll: true }); if (ok) confete(v); } }, 0);
}
function proximaDuelo() {
  if (DU.fase !== "jogando" || DU.resp == null) return;
  if (DU.i + 1 >= DU.ids.length) { terminarDuelo(); return; }
  DU.i++; DU.resp = null; DU.tq = Date.now(); publicarDuelo(); render({ topo: true }); focarQuestaoDuelo();
}
function terminarDuelo() {
  DU.fase = "fim"; DU.fimEm = Date.now(); publicarDuelo();
  if (DU.jogou && !DU.contou) {
    DU.contou = true;
    const D = store.doc("jogos"); D.n.duelo = (D.n.duelo || 0) + 1;
    if (DU.pontos > (D.rec.duelo || 0)) D.rec.duelo = DU.pontos;
    D.duelos = (Array.isArray(D.duelos) ? D.duelos : []).concat([{ d: hoje(), ts: Date.now(), area: DU.area, modo: DU.modo, n: DU.ids.length, pts: DU.porQ.map(x => x.pts), ms: DU.porQ.map(x => x.ms), ok: DU.porQ.map(x => x.ok) }]).slice(-20);
    store.mudou("jogos");
    jornada("jogo", { acertos: DU.acertos });
  }
  if (DU.modo === "vivo" || estadoFantasma()?.estado !== "fim") iniciarTiqueDuelo(); else pararTiqueDuelo();
  if (caminhoAtual() === "/duelo") render({ topo: true });
  const L = jogadoresDuelo(); som(L[0]?.eu ? "festa" : "fim");
  setTimeout(() => { confete(document.querySelector("#du-podio h2"), 26); soltarCelebracoes(); conferirVitoria(); }, 80);
  anunciarDuelo(`Fim! Você fez ${plural(DU.pontos, "ponto", "pontos")} e acertou ${DU.acertos} de ${DU.ids.length}.`);
}
/** Todos terminaram e ela ficou em 1º: comemoração (cartão flutuante, não bloqueia; confete respeita "reduzir movimento"). */
function conferirVitoria() {
  if (DU.festejou || DU.fase !== "fim") return;
  const L = jogadoresDuelo(); if (L.length < 2 || L.some(j => j.estado !== "fim" && !j.saiu)) return;
  DU.festejou = true;
  if (L[0].eu && L[0].pontos > (L[1]?.pontos || 0)) { som("festa"); celebrar(DU.modo === "fantasma" ? "Você venceu o fantasma!" : "Você venceu o duelo!", null, true); }
}

/* ---------- Telas ---------- */
function htmlPodio() {
  const L = jogadoresDuelo(), degraus = L.slice(0, 3), resto = L.slice(3), n = DU.ids.length, alguemJogando = L.some(j => j.estado !== "fim" && !j.saiu);
  const msg = L[0]?.eu && !alguemJogando && L.length > 1 && L[0].pontos > L[1].pontos ? "Você venceu!" : alguemJogando ? "Você terminou!" : "Fim do duelo";
  return `<section class="caixa du-podio" id="du-podio"><h2 class="sec com-ilu" style="gap:10px">${mascote(L[0]?.eu ? "festa" : "feliz", 72)}${msg}</h2>
    <ol class="du-degraus" aria-label="Pódio">${degraus.map(j => { const pos = L.indexOf(j) + 1;
      return `<li class="d${pos}${j.eu ? " eu" : ""}"><span class="du-medalha" aria-hidden="true">${["🥇", "🥈", "🥉"][pos - 1]}</span><b>${nomeJog(j)}</b><span>${plural(j.pontos, "ponto", "pontos")}</span><small>${pos}º lugar${j.saiu ? " · saiu" : j.estado !== "fim" ? " · ainda jogando" : ""}</small><i aria-hidden="true">${pos}</i></li>`; }).join("")}</ol>
    ${resto.length ? `<ol class="du-placar" start="4">${resto.map(j => `<li><span class="du-pos" aria-hidden="true">${L.indexOf(j) + 1}º</span><span class="du-nome"><b>${nomeJog(j)}</b><small>${situacaoJog(j)}</small></span><span class="du-pts"><b>${j.pontos}</b></span></li>`).join("")}</ol>` : ""}
    ${alguemJogando ? `<p class="aviso info">${L.filter(j => j.estado !== "fim" && !j.saiu).map(j => `${j.fantasma ? "O fantasma" : nomeJog(j)} ainda está na questão ${Math.min(j.i + 1, n)}`).join(" · ")}. O pódio se atualiza sozinho.</p>` : ""}
    <div class="kpis"><div class="kpi"><b>${DU.pontos}</b><span>seus pontos</span></div><div class="kpi"><b>${DU.acertos}/${n}</b><span>acertos</span></div>
    <div class="kpi"><b>${mmss(DU.porQ.reduce((s, x) => s + x.ms, 0) / Math.max(1, DU.porQ.length))}</b><span>tempo médio</span></div></div></section>`;
}
function telaQuestaoDuelo() {
  const qid = DU.ids[DU.i], q = qPorId(qid), n = DU.ids.length; if (!q) return vazio("Esta questão não está disponível.");
  const respondeu = DU.resp != null, ordem = ordemDuelo(qid, q.o.length), ult = DU.porQ[DU.porQ.length - 1];
  const resta = respondeu ? 0 : Math.max(0, DUELO.tempo - (Date.now() - DU.tq));
  const alts = ordem.map((i, pos) => { const s = !respondeu ? "" : i === q.c ? "ok" : i === DU.resp ? "bad" : "";
    return `<li><button class="alt" data-act="du-alt" data-i="${i}" data-s="${s}" ${respondeu ? "disabled" : ""}>${formaAlt(pos)}<span>${esc(q.o[i])}</span></button></li>`; }).join("");
  const ok = respondeu && DU.resp === q.c, letra = LETRAS[ordem.indexOf(q.c)];
  const volta = respondeu ? `<div class="retorno"><p class="veredito ${ok ? "ok" : "bad"}" tabindex="-1">${ok ? `✓ ${esc(sorteio(ELOGIOS))} +${ult.pts} pontos` : DU.resp < 0 ? "Tempo esgotado" : "Não foi dessa vez"}</p>
      ${ok ? "" : `<p class="leitura" style="margin:0 0 8px"><b>Resposta certa (${letra}):</b> ${esc(q.o[q.c])}</p>`}
      <div class="explica"><h3>${ilustra("livro", "#2340B8", "p")}Por quê</h3><p class="leitura">${esc(explicacaoCurta(q.e))}</p></div>
      <div class="acoes"><button class="btn grande" data-act="du-prox">${DU.i + 1 < n ? "Próxima questão" : "Ver o pódio"}</button></div></div>` : "";
  return `<div class="du-topo"><span>Questão <b>${DU.i + 1}</b> de ${n}</span><span id="du-tempo" class="jg-tempo${resta <= 5000 && !respondeu ? " pouco" : ""}">${respondeu ? "—" : Math.ceil(resta / 1000) + " s"}</span>
      <div class="du-tempo-barra" aria-hidden="true"><i id="du-barra" style="width:${(100 * resta / DUELO.tempo).toFixed(1)}%"></i></div></div>
    <section class="du-ao-vivo" aria-label="Placar ao vivo"><h2 class="lab">Placar ao vivo</h2><div id="du-placar">${htmlPlacar()}</div></section>
    <div class="caixa" id="du-jogo"><div class="linha entre" style="margin-bottom:8px">${nivelQ(q)}</div><p class="enunciado">${esc(q.q)}</p><ol class="alts alts-jogo">${alts}</ol>${volta}</div>`;
}
/** Explicação curta: as primeiras frases (até ~260 caracteres), sem o "Para lembrar". */
function explicacaoCurta(e) {
  const corpo = String(e || "Sem explicação cadastrada.").split(/\s*Para lembrar:\s*/)[0], frases = corpo.match(/[^.!?]+[.!?]+(\s+|$)/g) || [corpo];
  let out = ""; for (const f of frases) { if (out && (out + f).length > 260) break; out += f; }
  return (out || corpo).trim().slice(0, 400);
}
function listaSala() {
  const eu = `<li class="eu"><span class="du-nome"><b>${esc(DU.apelido)} <small>(você)</small></b><small>${DU.papel === "anfitriao" ? "anfitriã" : "pronta"}</small></span></li>`;
  const outros = Object.values(DU.outros).sort((a, b) => (a.papel === "anfitriao" ? -1 : 0) - (b.papel === "anfitriao" ? -1 : 0)).map(j =>
    `<li><span class="du-nome"><b>${esc(j.apelido)}</b><small>${j.papel === "anfitriao" ? "anfitriã" : j.r === DU.r && j.estado === "esperando" ? "pronta" : j.estado === "fim" ? (DU.papel === "anfitriao" ? "quer revanche?" : "no pódio") : "jogando"}</small></span></li>`).join("");
  return `<ul class="du-sala" aria-label="Quem está no duelo">${eu}${outros}</ul>`;
}
const prontosNaSala = () => Object.values(DU.outros).filter(j => j.r === DU.r && j.estado === "esperando");
const codigoFalado = c => [...c].join(" ");
const chipsN = () => `<div class="chips" role="group" aria-label="Número de questões">${DUELO.ns.map(n => `<button type="button" class="chip" data-act="du-n" data-v="${n}" aria-pressed="${n === DU.n}">${n} questões</button>`).join("")}</div>`;
const apelidoPadrao = () => DU.apelido || limparApelido(ls.get("gab2:duelo-apelido", "")) || "";

function paginaDuelo() {
  const base = { secao: "jogos", crumbs: [["Jogos", "#/jogos"]], titulo: DU.modo === "fantasma" && ["contando", "jogando", "fim"].includes(DU.fase) ? "Contra o fantasma" : "Duelo ao vivo", ilu: ilustra("escudo", "#B42318", "g"), cor: "#B42318" };
  const nomeArea = DU_AREA_NOME[DU.area || areaDuelo()] || "seu foco";
  if (!dueloDisponivel()) return { ...base, html: vazio("Ainda não há questões suficientes da sua área para um duelo.", `<a class="btn" href="#/jogos">Voltar aos jogos</a>`) };
  const sair = `<div class="acoes"><button class="btn sec mini" data-act="du-sair">Sair do duelo</button></div>`;
  switch (DU.fase) {
    case "config": {
      const vivo = DU.modo === "vivo";
      return { ...base, sub: vivo ? "Crie a sala e chame uma amiga." : "Jogue contra o seu próprio desempenho.", html: `<form class="caixa pilha du-form" data-form="du-criar">
        <span class="lab">Quantas questões?</span>${chipsN()}
        <p class="small muted" style="margin:0">Questões de ${esc(nomeArea)}, níveis fácil e médio · 20 s cada · acerto vale 100 pontos + até 50 de rapidez.</p>
        ${vivo ? `<label class="campo"><span class="lab">Seu apelido no duelo</span><input type="text" id="du-apelido" class="du-campo" maxlength="16" autocomplete="off" value="${esc(apelidoPadrao())}" placeholder="Ex.: Kiny" aria-describedby="du-ap-ajuda"></label>
        <p class="small muted" id="du-ap-ajuda" style="margin:0">Aparece para quem jogar com você. Use um apelido, não precisa ser o seu nome.</p>` : ""}
        <button class="btn grande azul">${vivo ? "Criar duelo" : "Começar contra o fantasma"}</button></form>
        <div class="acoes"><button class="btn sec" data-act="du-voltar">Voltar</button></div>` };
    }
    case "entrar":
      return { ...base, sub: "Digite o código que a sua amiga está vendo.", html: `<form class="caixa pilha du-form" data-form="du-entrar">
        <label class="campo"><span class="lab">Código do duelo</span><input type="text" id="du-codigo" class="du-campo du-campo-codigo" maxlength="4" autocomplete="off" autocapitalize="characters" spellcheck="false" inputmode="text" placeholder="XXXX" value="${esc(DU.codigoDigitado || "")}"></label>
        <label class="campo"><span class="lab">Seu apelido no duelo</span><input type="text" id="du-apelido" class="du-campo" maxlength="16" autocomplete="off" value="${esc(apelidoPadrao())}" placeholder="Ex.: Ana"></label>
        ${DU.erro ? `<p class="aviso" role="alert">${esc(DU.erro)}</p>` : ""}
        <button class="btn grande azul">Entrar</button></form><div class="acoes"><button class="btn sec" data-act="du-voltar">Voltar</button></div>` };
    case "procurando": {
      const demorou = Date.now() - DU.procurandoDesde > DUELO.espera;
      return { ...base, sub: `Código ${esc(DU.id)}`, html: `<div class="caixa du-espera">${DU.erro ? `<p class="aviso" role="alert">${esc(DU.erro)}</p>` : `${falaMascote(`Procurando o duelo <b class="du-cod-mini">${esc(DU.id)}</b>…`, "pensando")}<p class="muted">Confira se a sua amiga está com a tela do duelo aberta e se o código está certo.</p>`}
        ${demorou && !DU.erro ? `<p class="aviso">Não achamos esse duelo. Enquanto isso, que tal desafiar o fantasma?</p>` : ""}
        <div class="acoes"><button class="btn sec" data-act="du-entrar">Digitar outro código</button><button class="btn sec" data-act="du-fantasma">Desafiar o fantasma <span aria-hidden="true">👻</span></button></div></div>${sair}` };
    }
    case "sala": {
      const host = DU.papel === "anfitriao", prontos = prontosNaSala().length;
      return { ...base, sub: host ? "Sala criada. Chame a sua amiga!" : "Você está na sala.", html: `<div class="caixa du-espera">
        ${host ? `<p class="lab">Código do duelo</p><p class="du-codigo" aria-label="Código: ${esc(codigoFalado(DU.id))}">${esc(DU.id)}</p>
          <p class="du-instrucao">Peça para sua amiga abrir este mesmo app e tocar em <b>Jogos → Duelo ao vivo → Entrar com código</b> e digitar <b>${esc(DU.id)}</b>.</p>`
        : `${falaMascote("Tudo pronto! Esperando a anfitriã tocar em Começar.", "feliz")}`}
        <p class="small muted">${plural(DU.ids.length, "questão", "questões")} de ${esc(DU_AREA_NOME[DU.area] || "")} · 20 s cada · mesma ordem para todas</p>
        <h2 class="lab">Quem está aqui</h2>${listaSala()}
        ${host && DU.ninguem && !Object.keys(DU.outros).length ? `<p class="aviso" role="status">Ninguém entrou ainda. Quer jogar estas mesmas questões contra o fantasma?</p>` : ""}
        <div class="acoes">${host ? `<button class="btn grande azul" data-act="du-comecar" ${prontos ? "" : "disabled"}>${prontos ? "Começar" : "Começar (esperando alguém entrar)"}</button>` : ""}
          ${host ? `<button class="btn sec" data-act="du-fantasma" data-mesmas="1">Desafiar o fantasma <span aria-hidden="true">👻</span></button>` : ""}</div></div>${sair}` };
    }
    case "contando":
      return { ...base, html: `<div class="caixa du-contagem"><p class="lab">${DU.modo === "fantasma" ? "Contra o fantasma" : "Prepare-se!"}</p><p id="du-conta" class="du-conta" aria-hidden="true">${Math.max(1, Math.ceil((DU.inicio - Date.now()) / 1000))}</p>
        <p class="du-instrucao">${plural(DU.ids.length, "questão", "questões")} · 20 s cada</p></div>
        <section class="du-ao-vivo" aria-label="Quem joga"><h2 class="lab">Quem joga</h2><div id="du-placar">${htmlPlacar()}</div></section>` };
    case "jogando":
      return { ...base, html: telaQuestaoDuelo() + sair };
    case "fim": {
      const erradas = DU.porQ.filter(x => !x.ok).map(x => x.qid).filter(qPorId), host = DU.papel === "anfitriao";
      const querem = DU.modo === "vivo" && host ? Object.values(DU.outros).filter(j => j.r === DU.r && j.revanche) : [];
      return { ...base, html: `${htmlPodio()}
        ${DU.modo === "fantasma" && DU.fantasma ? `<p class="small muted">O fantasma repetiu ${esc(DU.fantasma.desc)}.</p>` : ""}
        ${querem.length ? `<p class="aviso info" role="status">${querem.map(j => esc(j.apelido)).join(" e ")} ${querem.length > 1 ? "querem" : "quer"} revanche!</p>` : ""}
        ${DU.convite ? `<p class="aviso info" role="status">A anfitriã abriu a revanche! Toque em Revanche para entrar.</p>` : ""}
        ${DU.querRevanche && !DU.convite && !host && DU.modo === "vivo" ? `<p class="aviso info" role="status">Esperando a anfitriã abrir a revanche…</p>` : ""}
        <div class="acoes"><button class="btn grande azul" data-act="du-revanche">Revanche</button>
          ${erradas.length ? `<button class="btn sec" data-act="du-errei" aria-expanded="${!!DU.verErros}">${DU.verErros ? "Esconder as que errei" : erradas.length === 1 ? "Ver a questão que errei" : `Ver as ${erradas.length} questões que errei`}</button>` : ""}
          <a class="btn sec" href="#/jogos" data-act="du-jogos">Voltar aos jogos</a></div>
        ${DU.verErros && erradas.length ? `<section><h2 class="sec">Questões que errei</h2>${listaQuestoes(erradas.map(qPorId), 15)}</section>` : ""}` };
    }
    default: {
      const carregando = _duRoom === undefined;
      return { ...base, sub: "As mesmas questões, ao mesmo tempo, com uma amiga. Placar ao vivo!", html: `<div class="caixa jg-intro">
        ${falaMascote("Desafie uma amiga: mesmas questões, mesma ordem, 20 segundos cada. Quem acerta mais rápido leva!", "feliz")}
        <p class="small muted" style="margin:0">Questões de ${esc(nomeArea)} · você escolhe 5, 10 ou 15.</p>
        ${carregando ? `<p class="muted" role="status">Procurando a sala ao vivo…</p>` : !salaOk() ? `<p class="aviso">O duelo ao vivo precisa do app aberto pelo link do Claude, com a sala ao vivo ligada. Aqui você pode desafiar o fantasma: o seu próprio desempenho.</p>` : ""}
        <div class="du-opcoes">
          ${salaOk() || carregando ? `<button class="btn grande azul" data-act="du-criar">Criar duelo</button><button class="btn grande" data-act="du-entrar">Entrar com código</button>` : ""}
          <button class="btn grande ${salaOk() || carregando ? "sec" : "azul"}" data-act="du-fantasma">Desafiar o fantasma <span aria-hidden="true">👻</span></button></div></div>
        ${historicoDuelos().length ? `<p class="small muted">Seu recorde no duelo: ${plural(store.doc("jogos").rec.duelo || 0, "ponto", "pontos")} · ${plural(historicoDuelos().length, "partida guardada", "partidas guardadas")} para o fantasma.</p>` : ""}` };
    }
  }
}
rota("/duelo", () => { if (_duRoom === undefined) salaDuelo(); return paginaDuelo(); });

/** Cartão grande no hub de Jogos. */
const cartaoDuelo = () => dueloDisponivel() ? `<section class="du-hub"><a class="jg-cartao du-cartao" href="#/duelo" style="--h:#B42318">${ilustra("escudo", "#B42318", "g")}<div>
  <b>Duelo ao vivo <span aria-hidden="true">⚔️</span></b><small>Chame uma amiga: as mesmas questões ao mesmo tempo, com placar ao vivo. Sozinha? Enfrente o seu fantasma.</small>
  ${store.doc("jogos").rec.duelo ? `<span class="pill">Recorde: ${plural(store.doc("jogos").rec.duelo, "ponto", "pontos")}</span>` : ""}</div></a></section>` : "";

/* ---------- Ações ---------- */
function novoCodigo() { let c = ""; for (let i = 0; i < 4; i++) c += DU_ALFA[Math.floor(Math.random() * DU_ALFA.length)]; return c; }
ACOES["du-criar"] = async () => { const r = await salaDuelo(); if (!r) { toast("O duelo ao vivo não está disponível aqui. Desafie o fantasma!"); atualizar(); return; } zerarDuelo(); Object.assign(DU, { fase: "config", modo: "vivo" }); atualizar(); };
ACOES["du-fantasma"] = el => {
  if (el?.dataset?.mesmas && DU.ids.length) { sairDaSala(); clearTimeout(_duEspera); Object.assign(DU, { modo: "fantasma", papel: null, outros: {} }); DU.fantasma = montarFantasma(); comecarContagem(); return; }
  zerarDuelo(); Object.assign(DU, { fase: "config", modo: "fantasma" }); atualizar();
};
ACOES["du-entrar"] = async () => { sairDaSala(); zerarDuelo(); DU.codigoDigitado = ""; DU.fase = "entrar"; atualizar(); setTimeout(() => document.getElementById("du-codigo")?.focus(), 0); const r = await salaDuelo(); if (!r && DU.fase === "entrar") { DU.fase = "inicio"; atualizar(); } };
ACOES["du-voltar"] = () => { sairDaSala(); zerarDuelo(); atualizar(); };
ACOES["du-n"] = el => { const n = +el.dataset.v; if (!DUELO.ns.includes(n)) return; DU.n = n; document.querySelectorAll('[data-act="du-n"]').forEach(b => b.setAttribute("aria-pressed", String(+b.dataset.v === n))); };
FORMS["du-criar"] = () => {
  const n = DUELO.ns.includes(DU.n) ? DU.n : 10;
  Object.assign(DU, { area: areaDuelo(), r: 0, ids: montarIdsDuelo(n), outros: {}, ninguem: false }); zerarRodada();
  if (DU.ids.length < n) { toast("Não há questões suficientes da sua área."); return; }
  if (DU.modo === "fantasma") { DU.id = novoCodigo(); DU.fantasma = montarFantasma(); comecarContagem(); return; }
  const ap = limparApelido($("#du-apelido")?.value); if (!ap) { toast("Escolha um apelido"); $("#du-apelido")?.focus(); return; }
  ls.set("gab2:duelo-apelido", ap);
  Object.assign(DU, { apelido: ap, papel: "anfitriao", id: novoCodigo(), fase: "sala" });
  publicarDuelo(); atualizar(); anunciarDuelo(`Duelo criado. Código ${codigoFalado(DU.id)}.`);
  clearTimeout(_duEspera);
  _duEspera = setTimeout(() => { if (DU.fase === "sala" && DU.papel === "anfitriao" && !Object.keys(DU.outros).length) { DU.ninguem = true; anunciarDuelo("Ninguém entrou ainda. Você pode desafiar o fantasma."); if (caminhoAtual() === "/duelo") atualizar(); } }, DUELO.espera);
  reagirDuelo();
};
FORMS["du-entrar"] = () => {
  const cod = String($("#du-codigo")?.value || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 4), ap = limparApelido($("#du-apelido")?.value);
  DU.codigoDigitado = cod; if (ap) DU.apelido = ap;   // o que ela digitou continua no campo se houver aviso
  if (!codigoValido(cod)) { DU.erro = "O código tem 4 letras ou números (sem O, I nem L). Confira com a sua amiga."; atualizar(); $("#du-codigo")?.focus(); return; }
  if (!ap) { DU.erro = "Escolha um apelido."; atualizar(); $("#du-apelido")?.focus(); return; }
  ls.set("gab2:duelo-apelido", ap);
  Object.assign(DU, { modo: "vivo", papel: "jogador", id: cod, apelido: ap, fase: "procurando", erro: "", procurandoDesde: Date.now(), area: areaDuelo() });
  publicarDuelo(); atualizar(); anunciarDuelo(`Procurando o duelo ${codigoFalado(cod)}.`);
  setTimeout(() => { if (DU.fase === "procurando" && DU.id === cod && caminhoAtual() === "/duelo") atualizar(); }, DUELO.espera + 100);
  if (_duRoom) aoMudarSala({ peers: _duRoom.peers() });
};
ACOES["du-comecar"] = () => { if (DU.papel !== "anfitriao" || DU.fase !== "sala" || !prontosNaSala().length) return; clearTimeout(_duEspera); comecarContagem(); };
ACOES["du-alt"] = el => responderDuelo(+el.dataset.i);
ACOES["du-prox"] = () => proximaDuelo();
ACOES["du-sair"] = () => { sairDaSala(); zerarDuelo(); render({ topo: true }); };
ACOES["du-jogos"] = () => { if (DU.fase === "fim") { sairDaSala(); zerarDuelo(); } };
ACOES["du-errei"] = () => { DU.verErros = !DU.verErros; atualizar(); if (DU.verErros) setTimeout(() => document.querySelector("#view .lista-q a")?.focus(), 0); };
ACOES["du-revanche"] = () => {
  if (DU.modo === "fantasma") { const n = DU.ids.length; DU.ids = montarIdsDuelo(n); DU.r++; DU.fantasma = montarFantasma(); comecarContagem(); return; }
  if (DU.papel === "anfitriao") {
    const n = DU.ids.length; Object.assign(DU, { ids: montarIdsDuelo(n), r: DU.r + 1, fase: "sala", ninguem: false }); zerarRodada();
    publicarDuelo(); render({ topo: true }); anunciarDuelo("Revanche aberta. Quando todas estiverem prontas, toque em Começar."); return;
  }
  DU.querRevanche = true; DU.convite = false; publicarDuelo(); reagirDuelo(); if (DU.fase === "fim") atualizar();
};
/* Teclado: A–E escolhem, Enter vai para a próxima (fora de campos e com nenhuma folha aberta). */
document.addEventListener("keydown", e => {
  if (DU.fase !== "jogando" || caminhoAtual() !== "/duelo" || e.ctrlKey || e.metaKey || e.altKey || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName) || $("#camada").innerHTML) return;
  if ((e.key === "Enter" || e.key === " ") && /^(BUTTON|A)$/.test(e.target.tagName)) return;
  const pos = LETRAS.indexOf(e.key.toUpperCase());
  if (pos >= 0 && DU.resp == null) { const q = qPorId(DU.ids[DU.i]); const ordem = q && ordemDuelo(q.id, q.o.length); if (ordem && pos < ordem.length) { e.preventDefault(); responderDuelo(ordem[pos]); } }
  else if (e.key === "Enter" && DU.resp != null) { e.preventDefault(); proximaDuelo(); }
});
/* Fechar o app no meio: a presença some sozinha (a sala limpa quem sai); aqui só paramos o relógio. */
addEventListener("pagehide", () => { pararTiqueDuelo(); });
