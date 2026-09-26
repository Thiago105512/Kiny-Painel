/* ============================================================
   29-calibracao — nível das questões calibrado pelo uso.
   Cada aparelho envia, no máximo 1×/dia, só o resultado da 1ª tentativa
   de cada questão (acertou/errou), sob um identificador anônimo:
     compartilhado  calibracao/<anon> = {q: {qid: 0|1}, ts}
   O ciclo de revisão soma tudo em calibracao_total/geral = {q: {qid: [n, acertos]}, ts}
   e ajusta a dificuldade das questões no banco quando há respostas suficientes.
   O app mostra "acertam X% de quem respondeu" a partir de 10 primeiras respostas.
   ============================================================ */
const CALIB = { total: null, lido: false };
const MIN_CALIB = 10;
function primeirasTentativas() {
  const out = {};
  Object.keys(TRILHAS).forEach(t => Object.entries(store.doc(docProg(t)).q).forEach(([id, p]) => {
    if (p.f === 0 || p.f === 1) out[id] = p.f;
    else if (p.n && p.h?.length === p.n) out[id] = p.h[0][2] ? 1 : 0;   // progresso antigo, histórico completo
  }));
  return out;
}
async function enviarCalibracao() {
  if (!store.naConta) return;
  const P = store.doc("perfil");
  if (!P.anon) { P.anon = "a" + Math.random().toString(36).slice(2, 12); store.mudou("perfil"); }
  if (Date.now() - (P.calibEnviada || 0) < DIA) return;
  const q = primeirasTentativas(); if (!Object.keys(q).length) return;
  if (await store.publicar("calibracao/" + P.anon, { q, ts: Date.now() })) { P.calibEnviada = Date.now(); store.mudou("perfil"); }
}
async function lerCalibracao() {
  if (CALIB.lido) return; CALIB.lido = true;
  CALIB.total = (await store.lerCompartilhado("calibracao_total/geral"))?.q || null;
}
/** Texto curto para depois de responder: "acertam 62% de quem respondeu (48)". */
function acertoGeral(q) {
  const x = CALIB.total?.[q.id]; if (!x || x[0] < MIN_CALIB) return "";
  return `acertam ${Math.round(x[1] / x[0] * 100)}% na 1ª tentativa (${x[0]})`;
}
