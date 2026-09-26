/* ============================================================
   04-estudo — regras de negócio: tentativas, caderno de erros,
   repetição espaçada, flashcards, desempenho e matrizes.
   ============================================================ */

/* ---------- Questões (banco + próprias) ---------- */
let _cacheQ = null;
function questoes() {
  if (!_cacheQ) {
    const minhas = minhasQuestoes().filter(x => x && Array.isArray(x.o || x.alternativas)).map(x => normQuestao(x, x.t, x.src || "minha"));
    _cacheQ = QUESTOES_BASE.concat(minhas);
    _cacheQ.porId = Object.fromEntries(_cacheQ.map(q => [q.id, q]));
  }
  return _cacheQ;
}
const invalidarQuestoes = () => { _cacheQ = null; };
const qPorId = id => questoes().porId[id];
/** Blocos de questões próprias: o antigo "questoes" + "q-1", "q-2"… */
const blocosQ = () => ["questoes", ...store.nomes().filter(n => /^q-\d+$/.test(n)).sort((a, b) => +a.slice(2) - +b.slice(2))];
const minhasQuestoes = () => blocosQ().flatMap(n => Object.values(store.doc(n).itens));
function salvarQuestaoPropria(x) {
  const blocos = blocosQ();
  let nome = blocos.find(n => store.doc(n).itens[x.id]);                                    // edição: fica onde está
  if (!nome) nome = blocos.slice(1).reverse().find(n => Object.keys(store.doc(n).itens).length < TAM_BLOCO_Q);
  if (!nome) nome = "q-" + (blocos.length);                                                  // novo bloco
  store.doc(nome).itens[x.id] = x; store.mudou(nome); invalidarQuestoes();
}
function apagarQuestaoPropria(id) { const nome = blocosQ().find(n => store.doc(n).itens[id]); if (!nome) return; delete store.doc(nome).itens[id]; store.mudou(nome); invalidarQuestoes(); }

/* ---------- Progresso e tentativas (QuestionAttempt) ---------- */
const progDe = q => store.doc(docProg(q.t)).q[q.id];
function statusQ(q) {
  const p = progDe(q);
  if (!p || !p.n) return { chave: "nao", nome: "Não respondida", marcada: !!p?.m, revisar: !!p?.r };
  const ult = p.h[p.h.length - 1];
  return { chave: ult && ult[2] ? "correta" : "incorreta", nome: ult && ult[2] ? "Correta" : "Incorreta", marcada: !!p.m, revisar: !!p.r, n: p.n, ac: p.ac };
}
function alternarFlag(q, flag) {
  const d = store.doc(docProg(q.t)); const p = d.q[q.id] = d.q[q.id] || { n: 0, ac: 0, h: [], m: 0, r: 0 };
  p[flag] = p[flag] ? 0 : 1; store.mudou(docProg(q.t)); return p[flag];
}

/** Registra uma tentativa. origem: pratica | tema | simulado | revisao | erro */
function registrarResposta(q, resp, ms, origem) {
  const ok = resp === q.c, agora = Date.now();
  const d = store.doc(docProg(q.t)); const p = d.q[q.id] = d.q[q.id] || { n: 0, ac: 0, h: [], m: 0, r: 0 };
  p.n++; if (ok) p.ac++;
  if (p.n === 1) p.f = ok ? 1 : 0;   // 1ª tentativa: é ela que mede a dificuldade real da questão
  p.h.push([agora, resp, ok ? 1 : 0, Math.round(ms || 0), origem]); if (p.h.length > 12) p.h = p.h.slice(-12);
  store.mudou(docProg(q.t));
  const dia = diaDe(hoje()); dia.q++; if (ok) dia.ac++; if (q.tema && !dia.temas.includes(q.tema)) dia.temas.push(q.tema); store.mudou("dias");
  if (typeof jornada === "function") jornada("questao", { ok });
  // Caderno de erros: todo erro gera (ou reabre) um registro com revisão em 1 dia
  const E = store.doc("erros");
  if (!ok) {
    const prev = E.itens[q.id];
    E.itens[q.id] = { qid: q.id, tema: q.tema, ts: agora, resp, n: (prev?.n || 0) + 1,
      motivo: prev?.motivo || null, motivoSugerido: motivoSugerido(q, ms, prev), coment: prev?.coment || "", card: prev?.card || null,
      srs: agendar(prev?.srs && origem === "erro" ? prev.srs : null, 0), status: "aberto" };
    store.mudou("erros");
  } else if (E.itens[q.id] && E.itens[q.id].status === "aberto" && (origem === "erro" || origem === "revisao")) {
    const e = E.itens[q.id]; e.srs = agendar(e.srs, 2); if (e.srs.etapa >= 2) e.status = "resolvido"; store.mudou("erros");
  }
  return ok;
}
function motivoSugerido(q, ms, prev) {
  if (prev) return "Erro repetido — lacuna de conteúdo";
  if (ms && ms < 15000) return "Resposta rápida — possível desatenção";
  if (ms && ms > 240000) return "Muito tempo — dúvida de conteúdo ou interpretação";
  return "Conteúdo";
}
const MOTIVOS = ["Lacuna de conteúdo", "Desatenção / leitura apressada", "Interpretação do enunciado", "Chute", "Confundi conceitos parecidos", "Falta de tempo"];

/* ---------- Dia de estudo (StudySession agregada por dia) ---------- */
function diaDe(iso) { const D = store.doc("dias"); return D.d[iso] = Object.assign({ q: 0, ac: 0, seg: 0, temas: [] }, D.d[iso] || {}); }
function registrarTempo(seg) { diaDe(hoje()).seg += seg; store.mudou("dias"); }
function marcarTemaEstudado(temaId) { const d = diaDe(hoje()); if (!d.temas.includes(temaId)) d.temas.push(temaId); store.mudou("dias"); }
function sequencia() {
  const D = store.doc("dias").d; let n = 0, d = hoje();
  if (!(D[d]?.q || D[d]?.seg >= 60 || D[d]?.temas?.length)) d = somaDias(d, -1);
  while (D[d] && (D[d].q || D[d].seg >= 60 || D[d].temas?.length)) { n++; d = somaDias(d, -1); }
  return n;
}

/* ---------- Repetição espaçada ----------
   Etapas base 1 → 7 → 30 → 90 dias; depois disso o intervalo cresce pela "facilidade".
   Nota: 0 errei (volta ao início), 1 difícil (repete a etapa com metade do intervalo),
   2 bom (avança), 3 fácil (pula uma etapa). A facilidade sobe/desce com o desempenho. */
const INTERVALOS = [1, 7, 30, 90];
function agendar(srs, nota) {
  const s = Object.assign({ etapa: -1, ease: 2.2, int: 0, prox: hoje(), hist: [] }, srs ? JSON.parse(JSON.stringify(srs)) : {});
  let etapa = s.etapa, dias;
  if (nota === 0) { etapa = 0; s.ease = Math.max(1.3, s.ease - 0.2); }
  else if (nota === 1) { etapa = Math.max(0, etapa); s.ease = Math.max(1.3, s.ease - 0.15); }
  else if (nota === 2) etapa = etapa + 1;
  else { etapa = etapa + 2; s.ease = Math.min(3, s.ease + 0.15); }
  if (etapa < INTERVALOS.length) dias = INTERVALOS[etapa];
  else dias = Math.round(Math.max(90, s.int || 90) * s.ease);
  if (nota === 1) dias = Math.max(1, Math.round((INTERVALOS[etapa] || s.int || 1) / 2));
  s.etapa = etapa; s.int = dias; s.prox = somaDias(hoje(), dias);
  s.hist = (s.hist || []).concat([[Date.now(), nota]]).slice(-20);
  return s;
}
const previaIntervalo = (srs, nota) => agendar(srs, nota).int;
const vencido = srs => srs && srs.prox <= hoje();

/* ---------- Revisão de temas ---------- */
function estudarTema(temaId) {
  marcarTemaEstudado(temaId);
  const R = store.doc("revisoes");
  if (!R.temas[temaId]) { R.temas[temaId] = agendar(null, 2); store.mudou("revisoes"); } // 1ª revisão em 1 dia
}
/** Nota da revisão a partir do aproveitamento nas questões do tema. */
const notaPorDesempenho = p => p < 50 ? 0 : p < 70 ? 1 : p < 90 ? 2 : 3;
function revisarTema(temaId, nota) {
  const R = store.doc("revisoes"); R.temas[temaId] = agendar(R.temas[temaId], nota); store.mudou("revisoes"); marcarTemaEstudado(temaId);
}

/* ---------- Flashcards ---------- */
/* Flashcards em blocos ("cards", "cards-1"…) para nenhum documento passar do limite de 256 KB da conta. */
const TAM_BLOCO_C = 120;
const blocosCards = () => ["cards", ...store.nomes().filter(n => /^cards-\d+$/.test(n)).sort((a, b) => +a.slice(6) - +b.slice(6))];
const blocoDoCard = id => blocosCards().find(n => store.doc(n).itens[id]);
const cardPorId = id => { const n = blocoDoCard(id); return n ? store.doc(n).itens[id] : null; };
function cardMudou(id) { const n = blocoDoCard(id); if (n) store.mudou(n); }
function excluirCard(id) { const n = blocoDoCard(id); if (!n) return; delete store.doc(n).itens[id]; store.mudou(n); }
function criarCard(c) {
  const blocos = blocosCards(), nome = blocos.find(n => Object.keys(store.doc(n).itens).length < TAM_BLOCO_C) || "cards-" + blocos.length;
  const C = store.doc(nome), id = novoId("c");
  C.itens[id] = { id, frente: c.frente, verso: c.verso, tema: c.tema || null, subtema: c.subtema || null, origem: c.origem || "manual", ref: c.ref || null, dif: c.dif || 2, criado: Date.now(), srs: { etapa: -1, ease: 2.2, int: 0, prox: c.origem === "pilula" ? somaDias(hoje(), 1) : hoje(), hist: [] } };
  store.mudou(nome); return id;
}
function cardDeQuestao(q, origem = "questao") {
  return criarCard({ frente: q.q, verso: `${q.o[q.c]}\n\n${q.e || ""}`.trim(), tema: q.tema, subtema: q.subtema, origem, ref: q.id, dif: q.dif || 2 });
}
function avaliarCard(id, nota) { const c = cardPorId(id); if (!c) return; c.srs = agendar(c.srs, nota); cardMudou(id); if (c.tema) marcarTemaEstudado(c.tema); if (typeof jornada === "function") jornada("card"); }
const cards = () => blocosCards().flatMap(n => Object.values(store.doc(n).itens));

/* ---------- Pendências de revisão (agenda unificada) ---------- */
function pendencias() {
  const cs = cards().filter(c => vencido(c.srs));
  const temas = Object.entries(store.doc("revisoes").temas).filter(([, s]) => vencido(s)).map(([id, s]) => ({ id, srs: s }));
  const erros = Object.values(store.doc("erros").itens).filter(e => e.status === "aberto" && vencido(e.srs) && qPorId(e.qid));
  const planoHoje = Object.values(store.doc("plano").itens).filter(p => !p.feito && p.data <= hoje());
  return { cards: cs, temas, erros, plano: planoHoje, total: cs.length + temas.length + erros.length };
}

/* ---------- Desempenho (PerformanceMetric calculado sob demanda) ---------- */
function agregados(filtro = () => true) {
  const res = { n: 0, ac: 0, ms: 0, nms: 0, vistas: 0, por: { disc: {}, esp: {}, tema: {}, trilha: {}, area: {}, ae: {}, discEnem: {}, dif: {} } };
  const soma = (m, k, p, ok) => { if (!k) return; const x = m[k] = m[k] || { n: 0, ac: 0 }; x.n += p; x.ac += ok; };
  for (const q of questoes()) {
    if (!filtro(q)) continue;
    const p = progDe(q); if (!p || !p.n) continue;
    res.vistas++; res.n += p.n; res.ac += p.ac;
    for (const h of p.h) if (h[3]) { res.ms += h[3]; res.nms++; }
    soma(res.por.disc, q.disc, p.n, p.ac); soma(res.por.esp, q.esp, p.n, p.ac); soma(res.por.tema, q.tema, p.n, p.ac);
    soma(res.por.trilha, q.t, p.n, p.ac); soma(res.por.area, q.a, p.n, p.ac);
    soma(res.por.dif, q.dif, p.n, p.ac);
    if (q.ae) { soma(res.por.ae, q.ae, p.n, p.ac); soma(res.por.discEnem, q.disc, p.n, p.ac); }
  }
  return res;
}
const listaPor = (m, min = 1) => Object.entries(m).filter(([, v]) => v.n >= min).map(([k, v]) => ({ k, ...v, p: v.ac / v.n }));
function desempenhoTema(temaId) {
  const a = agregados(q => q.tema === temaId);
  return { ...a, total: questoes().filter(q => q.tema === temaId).length, tempoMedio: a.nms ? a.ms / a.nms : null };
}

/* ---------- Matrizes curriculares ---------- */
function instituicoes() {
  const extras = Object.values(store.doc("instituicoes").itens);
  return INSTITUICOES_BASE.concat(extras.filter(e => !INSTITUICOES_BASE.some(b => b.id === e.id)));
}
const instPorId = id => instituicoes().find(i => i.id === id);
function grades() {
  const user = store.doc("grades").itens, porId = {};
  GRADES_BASE.forEach(g => { porId[g.id] = { ...g, origem: "base" }; });
  Object.values(user).forEach(g => { porId[g.id] = { ...g, origem: porId[g.id] ? "editada" : "importada" }; });
  return Object.values(porId);
}
const gradePorId = id => grades().find(g => g.id === id);
const gradesDe = (instId, curso) => grades().filter(g => g.instituicao === instId && (!curso || g.curso === curso));
/** Grava a matriz no banco do usuário (uma matriz de fábrica editada vira cópia do usuário). */
function salvarGrade(g) {
  const G = store.doc("grades"); const c = JSON.parse(JSON.stringify(g)); delete c.origem;
  c.atualizado = new Date().toISOString(); G.itens[c.id] = c; store.mudou("grades");
}
function itensGrade(g) { return (g?.periodos || []).flatMap(p => (p.itens || []).map(it => ({ ...it, periodo: p.numero, periodoNome: p.nome || `${p.numero}º período` }))); }
const temasDoItem = it => unicos([...(it.temas || []), ...(it.unidades || []).flatMap(u => u.temas || [])]);
/** tema → onde aparece na matriz: [{periodo, item}] */
function temasNaGrade(g) {
  const m = {};
  itensGrade(g).forEach(it => temasDoItem(it).forEach(t => { (m[t] = m[t] || []).push({ periodo: it.periodo, item: it }); }));
  return m;
}
const chTotal = g => { const it = itensGrade(g).filter(x => !x.optativa); const conhecidas = it.filter(x => typeof x.ch === "number"); return { total: conhecidas.reduce((s, x) => s + x.ch, 0), conhecidas: conhecidas.length, itens: it.length }; };
/** Rótulo do tipo de item da matriz. */
const tipoItem = it => it.optativa ? "Optativa" : it.tipo === "modulo" ? "Módulo" : it.tipo === "estagio" ? "Estágio" : "Disciplina";
/** Créditos, divisão da carga horária e pré-requisitos, quando constam do documento. */
function detalhesItem(g, it) {
  const partes = [];
  if (typeof it.creditos === "number") partes.push(it.creditos + " créditos");
  const ch = [["teórica", it.chTeorica], ["prática", it.chPratica], ["extensão", it.chExtensao]].filter(([, v]) => v).map(([n, v]) => `${v} h ${n}`);
  if (ch.length) partes.push(ch.join(" + "));
  if (it.prerequisitos?.length) partes.push("pré-requisito: " + it.prerequisitos.map(c => itensGrade(g).find(x => x.codigo === c)?.nome || c).join(", "));
  return partes.join(" · ");
}
const statusGrade = g => g?.status === "validado" ? { nome: "Validada por você", cls: "ok" } : g?.status === "importado" ? { nome: "Importada — conferir", cls: "warn" } : { nome: PENDENTE, cls: "warn" };
