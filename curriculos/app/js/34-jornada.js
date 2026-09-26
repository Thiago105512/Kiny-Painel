/* ============================================================
   34-jornada — camada de jogo do estudo (inspirada no Duolingo):
   XP por tudo que se estuda, níveis com títulos da carreira médica,
   3 missões diárias e conquistas (medalhas). O Doutor Boto comemora.
   Doc "jornada": {xp, dia:{d, xp, jogos, cards, pil, caso, termo, rel}, missoes:{d, ok:[]}, conq:{id: ts}, cont:{...}}
   ============================================================ */
const NIVEIS_XP = [[0, "Calouro"], [150, "Veterano"], [400, "Monitor"], [800, "Interno"], [1400, "R1"], [2200, "R2"], [3200, "R3"],
  [4500, "Especialista"], [6200, "Preceptor"], [8500, "Professor"], [11500, "Lenda do plantão"]];
const XP_EVENTO = { questao: ok => ok ? 10 : 3, card: () => 2, pilula: () => 3 };

function docJornada() {
  const J = store.doc("jornada"), d = hoje();
  if (J.dia?.d !== d) J.dia = { d, xp: 0, jogos: 0, cards: 0, pil: 0, caso: 0, termo: 0, rel: 0 };
  J.cont = J.cont || {}; J.conq = J.conq || {}; J.xp = J.xp || 0;
  return J;
}
function nivelDe(xp) {
  let i = 0; while (i + 1 < NIVEIS_XP.length && xp >= NIVEIS_XP[i + 1][0]) i++;
  const [base, nome] = NIVEIS_XP[i], prox = NIVEIS_XP[i + 1];
  return { n: i + 1, nome, base, prox: prox ? prox[0] : null, proxNome: prox ? prox[1] : null, pct: prox ? Math.round(100 * (xp - base) / (prox[0] - base)) : 100 };
}

/* ---------- Missões do dia: 3, sorteadas pela data (iguais o dia todo) ---------- */
const MISSOES = [
  { id: "q15", txt: "Responder 15 questões", meta: 15, v: J => diaDe(hoje()).q, grupo: "q" },
  { id: "q25", txt: "Responder 25 questões", meta: 25, v: J => diaDe(hoje()).q, grupo: "q" },
  { id: "ac10", txt: "Acertar 10 questões", meta: 10, v: J => diaDe(hoje()).ac, grupo: "q" },
  { id: "jogos2", txt: "Jogar 2 partidas", meta: 2, v: J => J.dia.jogos },
  { id: "cards10", txt: "Revisar 10 flashcards", meta: 10, v: J => J.dia.cards, precisa: () => cards().length >= 10 },
  { id: "pil3", txt: "Ler 3 pílulas de estudo", meta: 3, v: J => J.dia.pil, precisa: () => PILULAS.some(pilDoObjetivo) },
  { id: "caso", txt: "Resolver o Caso do dia", meta: 1, v: J => J.dia.caso, precisa: () => typeof casosDoDia === "function" && casosDoDia().length > 0 },
  { id: "termo", txt: "Jogar o Termo do dia", meta: 1, v: J => J.dia.termo, precisa: () => typeof palavrasTermo === "function" && palavrasTermo().length > 0 },
  { id: "plantao", txt: "Fazer um Plantão no PS", meta: 1, v: J => J.dia.plantao || 0, precisa: () => (DADOS.jogos?.triagem || []).length > 0 && soMedJ() },
  { id: "rel5", txt: "Fazer 5 acertos seguidos no Contra o relógio", meta: 5, v: J => J.dia.rel },
  { id: "xp150", txt: "Ganhar 150 XP hoje", meta: 150, v: J => J.dia.xp },
];
const soMedJ = () => !objetivo() || ["medicina", "residencia"].includes(objetivo());
const hashTxt = s => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
function missoesDoDia() {
  const d = hoje(), ok = MISSOES.filter(m => !m.precisa || m.precisa());
  const doQ = ok.filter(m => m.grupo === "q"), outras = ok.filter(m => m.grupo !== "q");
  const h = hashTxt(d), escolha = [doQ[h % doQ.length]];
  for (let k = 0; escolha.length < 3 && k < 20; k++) { const m = outras[(h >>> (k + 3)) % outras.length]; if (!escolha.includes(m)) escolha.push(m); }
  return escolha;
}
const progressoMissao = (m, J) => Math.min(m.meta, m.v(J) || 0);

/* ---------- Conquistas ---------- */
const totalQuestoes = () => Object.values(store.doc("dias").d).reduce((s, d) => s + (d.q || 0), 0);
const CONQUISTAS = [
  { id: "q10", nome: "Primeiros passos", desc: "Responder 10 questões", arte: "alvo", cor: "#2340B8", ok: () => totalQuestoes() >= 10 },
  { id: "q100", nome: "Centenário", desc: "Responder 100 questões", arte: "alvo", cor: "#0F766E", ok: () => totalQuestoes() >= 100 },
  { id: "q500", nome: "Maratonista", desc: "Responder 500 questões", arte: "alvo", cor: "#B45309", ok: () => totalQuestoes() >= 500 },
  { id: "q1000", nome: "Mil e uma questões", desc: "Responder 1.000 questões", arte: "alvo", cor: "#C0265F", ok: () => totalQuestoes() >= 1000 },
  { id: "seq3", nome: "Pegando o ritmo", desc: "Estudar 3 dias seguidos", arte: "chama", cor: "#D97706", ok: () => sequencia() >= 3 },
  { id: "seq7", nome: "Semana cheia", desc: "Estudar 7 dias seguidos", arte: "chama", cor: "#B45309", ok: () => sequencia() >= 7 },
  { id: "seq30", nome: "Plantão de 30 dias", desc: "Estudar 30 dias seguidos", arte: "chama", cor: "#C0265F", ok: () => sequencia() >= 30 },
  { id: "jogo1", nome: "Hora do recreio", desc: "Jogar a primeira partida", arte: "controle", cor: "#0F766E", ok: J => (J.cont.jogos || 0) >= 1 },
  { id: "jogo25", nome: "Viciado em plantão", desc: "Jogar 25 partidas", arte: "controle", cor: "#6D28D9", ok: J => (J.cont.jogos || 0) >= 25 },
  { id: "rel200", nome: "Relâmpago", desc: "Fazer 200 pontos no Contra o relógio", arte: "relogio", cor: "#B45309", ok: () => (store.doc("jogos").rec.relogio || 0) >= 200 },
  { id: "vidas10", nome: "Sete vidas? Três bastam", desc: "Acertar 10 no Três vidas", arte: "coracao", cor: "#C0265F", ok: J => (J.cont.vidasMax || 0) >= 10 },
  { id: "ecg10", nome: "Olho clínico", desc: "Acertar 10 de 10 no Qual é o ritmo?", arte: "pulso", cor: "#0F766E", ok: J => (J.cont.ecgPerfeito || 0) >= 1 },
  { id: "linha5", nome: "Historiador", desc: "Acertar as 5 rodadas da Linha do tempo", arte: "calendario", cor: "#6D28D9", ok: J => (J.cont.linhaPerfeita || 0) >= 1 },
  { id: "caso1", nome: "Sherlock de jaleco", desc: "Acertar um Caso do dia na 1ª pista", arte: "lupa", cor: "#2340B8", ok: J => (J.cont.casoPista1 || 0) >= 1 },
  { id: "caso10", nome: "Diagnosticador", desc: "Acertar 10 casos no Caso do dia", arte: "estetoscopio", cor: "#C0265F", ok: J => (J.cont.casos || 0) >= 10 },
  { id: "termo2", nome: "Na mosca", desc: "Acertar o Termo em até 2 tentativas", arte: "livro", cor: "#15803D", ok: J => (J.cont.termo2 || 0) >= 1 },
  { id: "pares0", nome: "Memória de elefante", desc: "Completar os Pares sem errar", arte: "chave", cor: "#0369A1", ok: J => (J.cont.paresSemErro || 0) >= 1 },
  { id: "anat10", nome: "Atlas vivo", desc: "Acertar 10 de 10 no Onde fica?", arte: "osso", cor: "#B45309", ok: J => (J.cont.anatPerfeito || 0) >= 1 },
  { id: "miss", nome: "Missão cumprida", desc: "Completar as 3 missões de um dia", arte: "escudo", cor: "#15803D", ok: J => (J.cont.diasMissao || 0) >= 1 },
  { id: "miss7", nome: "Agente especial", desc: "Completar as missões em 7 dias", arte: "escudo", cor: "#6D28D9", ok: J => (J.cont.diasMissao || 0) >= 7 },
  { id: "interno", nome: "Bem-vindo ao internato", desc: "Chegar ao nível Interno", arte: "estetoscopio", cor: "#0F766E", ok: J => J.xp >= 800 },
  { id: "plantao", nome: "Classificação perfeita", desc: "Acertar as 12 cores de um Plantão no PS", arte: "ambulancia", cor: "#DC2626", ok: J => (J.cont.plantaoPerfeito || 0) >= 1 },
  { id: "salvo", nome: "Mãos de ouro", desc: "Salvar um paciente em Salve o paciente", arte: "pulso", cor: "#059669", ok: J => (J.cont.salvos || 0) >= 1 },
  { id: "salvo5", nome: "Sala vermelha", desc: "Salvar 5 pacientes", arte: "coracao", cor: "#B42318", ok: J => (J.cont.salvos || 0) >= 5 },
  { id: "defesa20", nome: "Guardião dos antibióticos", desc: "Neutralizar 20 invasores numa partida de Defesa", arte: "escudo", cor: "#7C3AED", ok: J => (J.cont.defesaMax || 0) >= 20 },
  { id: "milhao", nome: "Milionário (de mentirinha)", desc: "Ganhar o milhão no Rumo ao Milhão", arte: "alvo", cor: "#CA8A04", ok: J => (J.cont.milhao || 0) >= 1 },
  { id: "cascata", nome: "Fisiopatologista", desc: "Montar 3 cascatas sem erro", arte: "gota", cor: "#0891B2", ok: J => (J.cont.cascataPerfeita || 0) >= 3 },
  { id: "r1", nome: "Aprovado na residência", desc: "Chegar ao nível R1", arte: "escudo", cor: "#C0265F", ok: J => J.xp >= 1400 },
];
function medalha(c, ganha, tam = "g") {
  return `<span class="medalha ${ganha ? "" : "bloq"}" style="--h:${ganha ? c.cor : "#9AA0A8"}">${ilustra(c.arte, ganha ? c.cor : "#9AA0A8", tam)}<svg class="fita" viewBox="0 0 40 24" aria-hidden="true"><path d="M8 0h9l-5 24-6-6-6 2zM23 0h9l8 20-6-2-6 6z"/></svg></span>`;
}

/* ---------- Eventos: tudo passa por aqui ---------- */
function ganharXP(n) { if (!n) return; const J = docJornada(), antes = nivelDe(J.xp).n; J.xp += n; J.dia.xp += n; store.mudou("jornada");
  const depois = nivelDe(J.xp); if (depois.n > antes) setTimeout(() => celebrar(`Subiu de nível! Agora você é ${depois.nome}.`), 150); }
/** Registra um evento de estudo: dá XP, avança missões e confere conquistas. */
function jornada(tipo, info = {}) {
  try {
    const J = docJornada();
    if (XP_EVENTO[tipo]) ganharXP(XP_EVENTO[tipo](info.ok));
    if (tipo === "card") J.dia.cards++;
    if (tipo === "pilula") J.dia.pil++;
    if (tipo === "jogo") { J.dia.jogos++; J.cont.jogos = (J.cont.jogos || 0) + 1; ganharXP(Math.min(60, 5 + 3 * (info.acertos || 0)));
      Object.entries(info.cont || {}).forEach(([k, v]) => { J.cont[k] = k.endsWith("Max") ? Math.max(J.cont[k] || 0, v) : (J.cont[k] || 0) + v; });
      Object.entries(info.dia || {}).forEach(([k, v]) => { J.dia[k] = Math.max(J.dia[k] || 0, v); }); }
    store.mudou("jornada"); conferirMissoes(J); conferirConquistas(J);
  } catch (e) { console.error(e); }
}
function conferirMissoes(J) {
  const ms = missoesDoDia(); J.missoes = J.missoes?.d === J.dia.d ? J.missoes : { d: J.dia.d, ok: [] };
  for (const m of ms) if (!J.missoes.ok.includes(m.id) && progressoMissao(m, J) >= m.meta) {
    J.missoes.ok.push(m.id); J.xp += 40; J.dia.xp += 40; toast(`Missão cumprida: ${m.txt} · +40 XP`);
    if (J.missoes.ok.length === ms.length) { J.cont.diasMissao = (J.cont.diasMissao || 0) + 1; J.xp += 30; setTimeout(() => celebrar("As 3 missões de hoje estão feitas! +30 XP de bônus."), 400); }
    store.mudou("jornada");
  }
}
function conferirConquistas(J) {
  for (const c of CONQUISTAS) if (!J.conq[c.id] && c.ok(J)) { J.conq[c.id] = Date.now(); store.mudou("jornada"); setTimeout(() => celebrar(`Conquista desbloqueada: ${c.nome}`, c), 250); }
}
/** Comemoração: folha com o mascote em festa e confete. */
const FILA_CELEBRA = [];
const emAndamento = () => (typeof JG !== "undefined" && JG.id && !JG.fim && JG.rodadas?.length && location.hash.startsWith("#/jogos/")) || (PL.ativo && !PL.fim);
function celebrar(msg, conq = null) {
  if (emAndamento()) { FILA_CELEBRA.push([msg, conq]); return; }   // não interrompe jogo nem sessão: comemora no fim
  if (document.querySelector(".folha")) { toast(msg); return; }
  abrirFolha(`<div class="celebra">${conq ? medalha(conq, true, "xg") : mascote("festa", 140)}<p class="celebra-tit">${esc(msg)}</p>${conq ? `<p class="muted">${esc(conq.desc)}</p>` : ""}
    <button class="btn grande" data-act="fechar-folha">Continuar</button></div>`);
  setTimeout(() => confete(document.querySelector(".celebra-tit"), 30), 80);
}

/* ---------- Cartão compacto (Início e Jogos) e página ---------- */
function cartaoJornada({ compacto = false } = {}) {
  const J = docJornada(), nv = nivelDe(J.xp), ms = missoesDoDia(), feitas = ms.filter(m => (J.missoes?.d === J.dia.d && J.missoes.ok.includes(m.id))).length;
  return `<a class="jornada-card" href="#/jornada">${mascote(feitas === 3 ? "festa" : "feliz", compacto ? 64 : 84)}<div>
    <span class="lab">Nível ${nv.n} · ${esc(nv.nome)}</span><div class="xp-barra" role="progressbar" aria-valuenow="${nv.pct}" aria-valuemin="0" aria-valuemax="100"><i style="width:${nv.pct}%"></i></div>
    <small>${J.xp} XP${nv.prox ? ` · faltam ${nv.prox - J.xp} para ${esc(nv.proxNome)}` : ""} · missões ${feitas}/3</small></div></a>`;
}
rota("/jornada", () => {
  const J = docJornada(), nv = nivelDe(J.xp), ms = missoesDoDia(), ok = J.missoes?.d === J.dia.d ? J.missoes.ok : [];
  const ganhas = CONQUISTAS.filter(c => J.conq[c.id]).length;
  return { secao: "jogos", crumbs: [["Jogos", "#/jogos"]], titulo: "Sua jornada", ilu: mascote("feliz", 64, ""), cor: "#C0265F",
    sub: "XP, nível, missões do dia e medalhas. Tudo o que você estuda conta.",
    html: `${cartaoJornada()}
    <section><h2 class="sec">Missões de hoje</h2><div class="missoes">${ms.map(m => { const p = progressoMissao(m, J), feita = ok.includes(m.id);
      return `<div class="missao ${feita ? "feita" : ""}">${ilustra(feita ? "escudo" : "alvo", feita ? "#15803D" : "#2340B8", "m")}<div><b>${esc(m.txt)}</b>
        <div class="xp-barra"><i style="width:${Math.round(100 * p / m.meta)}%"></i></div><small>${feita ? "Feita · +40 XP" : `${p} de ${m.meta}`}</small></div></div>`; }).join("")}</div></section>
    <section><h2 class="sec">Medalhas <small class="muted">${ganhas} de ${CONQUISTAS.length}</small></h2><div class="medalhas">${CONQUISTAS.map(c => `<div class="medalha-item ${J.conq[c.id] ? "" : "bloq"}">${medalha(c, !!J.conq[c.id])}<b>${esc(c.nome)}</b><small>${esc(c.desc)}</small></div>`).join("")}</div></section>
    <section><h2 class="sec">Níveis</h2><ol class="niveis">${NIVEIS_XP.map(([x, n], i) => `<li class="${i + 1 === nv.n ? "atual" : i + 1 < nv.n ? "feito" : ""}"><b>${i + 1}. ${esc(n)}</b><small>${x} XP</small></li>`).join("")}</ol></section>` };
});
/** Mostra as comemorações guardadas durante o jogo/sessão (a primeira em destaque, as outras como aviso). */
function soltarCelebracoes() { const f = FILA_CELEBRA.splice(0); if (!f.length) return; setTimeout(() => { celebrar(...f[0]); f.slice(1).forEach(([m]) => toast(m, 3500)); }, 700); }
