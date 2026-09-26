/* ============================================================
   33-jogos — estudar jogando, com o conteúdo do próprio app (sempre
   no foco do objetivo do perfil):
   · Contra o relógio: 90 s de questões rápidas; acertos seguidos valem mais.
   · Três vidas: questões cada vez mais difíceis até o 3º erro.
   · Certo ou errado?: enunciado + uma alternativa — é a resposta?
   · Qual é o ritmo?: traçado do Atlas de ECG, quatro opções.
   · Linha do tempo: tocar os marcos da história em ordem cronológica.
   Respostas de questões de verdade (relógio e vidas) contam no progresso
   e erros vão para o caderno de erros, como na prática normal.
   ============================================================ */
const JOGOS = [
  { id: "relogio", curto: "90 s, acertos seguidos valem mais", nome: "Contra o relógio", arte: "relogio", cor: "#B45309", desc: "90 segundos para acertar o máximo de questões rápidas. Acertos seguidos multiplicam os pontos." },
  { id: "vidas", curto: "Cada vez mais difícil; 3 erros e acabou", nome: "Três vidas", arte: "coracao", cor: "#C0265F", desc: "As questões vão ficando mais difíceis. O jogo acaba no terceiro erro." },
  { id: "vf", curto: "É a resposta certa ou não?", nome: "Certo ou errado?", arte: "alvo", cor: "#2340B8", desc: "Uma questão e uma resposta: é essa mesmo? Dez rodadas." },
  { id: "ecg", curto: "Leia o traçado e diga o ritmo", nome: "Qual é o ritmo?", arte: "pulso", cor: "#0F766E", desc: "Olhe o traçado do ECG e escolha o ritmo. Dez rodadas." },
  { id: "linha", curto: "Ponha a história da Medicina em ordem", nome: "Linha do tempo", arte: "calendario", cor: "#6D28D9", desc: "Toque nos marcos da história do mais antigo ao mais recente. Cinco rodadas." },
];
const TEMPO_RELOGIO = 90;
const GRUPOS_JOGOS = [["plantao", "Simulações de plantão", "Você no comando: pacientes, monitor e decisões."], ["raciocinio", "Raciocínio clínico", "Pistas, perguntas e mecanismos."],
  ["imagem", "Memória, imagem e palavras", "Mapas, traçados, pares e palavras."], ["rapidos", "Desafios de perguntas", "Contra o tempo, com vidas ou valendo um milhão."]];
const GRUPO_JOGO = { triagem: "plantao", emergencia: "plantao", defesa: "plantao", quemsou: "raciocinio", cascata: "raciocinio", linha: "raciocinio",
  ecg: "imagem", anatomia: "imagem", pares: "imagem", caca: "imagem", relogio: "rapidos", vidas: "rapidos", vf: "rapidos", milhao: "rapidos" };
const JG = { id: null };
let _jgTimer = null;

/* ---------- Material de cada jogo ---------- */
const NEGATIVA = /EXCETO|INCORRET|\bNÃO\b|não é|errad|falsa/i;
const poolJogo = () => questoes().filter(q => q.src === "banco" && (objetivo() ? doObjetivo(q) : ["medicina", "residencia"].includes(q.t)) && Array.isArray(q.o) && q.o.length >= 4 && !q.img && !q.serie);
/** Marcos com ano, de um só domínio por partida (o do objetivo; sem objetivo, Medicina primeiro). */
function marcosHistoria() {
  const todos = PILULAS.filter(p => p.ano && p.titulo && pilDoObjetivo(p));
  const dom = ["medicina", "enem", "direito"].find(d => new Set(todos.filter(p => p.dominio === d).map(p => p.ano)).size >= 8);
  return dom ? todos.filter(p => p.dominio === dom) : todos;
}
const tracados = () => Object.entries(IMAGENS).filter(([, im]) => im.titulo);
function jogoDisponivel(j) {
  if (j.disponivel) return j.disponivel();
  if (j.id === "ecg") return tracados().length >= 4 && (!objetivo() || ["medicina", "residencia"].includes(objetivo()));
  if (j.id === "linha") return new Set(marcosHistoria().map(p => p.ano)).size >= 8;
  return poolJogo().length >= 20;
}
const opcoesEmbaralhadas = q => embaralhar(q.o.map((_, i) => i));

function montarRodadas(id) {
  const jj = JOGOS.find(x => x.id === id); if (jj?.montar) return jj.montar();
  const P = poolJogo();
  if (id === "relogio") { const curtas = P.filter(q => q.q.length <= 320 && (q.dif || 2) <= 2); return embaralhar(curtas.length >= 30 ? curtas : P).slice(0, 60).map(q => ({ qid: q.id, ordem: opcoesEmbaralhadas(q) })); }
  if (id === "vidas") { const d = n => embaralhar(P.filter(q => (q.dif || 2) === n));
    return [...d(1).slice(0, 5), ...d(2).slice(0, 10), ...d(3).slice(0, 45)].map(q => ({ qid: q.id, ordem: opcoesEmbaralhadas(q) })); }
  if (id === "vf") return embaralhar(P.filter(q => !NEGATIVA.test(q.q) && q.q.length <= 600)).slice(0, 10).map(q => {
    const verdade = Math.random() < .5, errada = embaralhar(q.o.map((_, i) => i).filter(i => i !== q.c))[0];
    return { qid: q.id, oi: verdade ? q.c : errada, verdade }; });
  if (id === "ecg") { const T = tracados(); return embaralhar(T).slice(0, 10).map(([img, im]) =>
    ({ img, certo: im.titulo, ops: embaralhar([im.titulo, ...embaralhar(T.filter(([i]) => i !== img).map(([, x]) => x.titulo)).slice(0, 3)]) })); }
  if (id === "linha") { const rodadas = [], usados = new Set();
    for (let r = 0; r < 5; r++) { const anos = new Set(), grupo = [];
      for (const p of embaralhar(marcosHistoria())) { if (grupo.length === 4) break; if (!anos.has(p.ano) && !usados.has(p.id)) { anos.add(p.ano); grupo.push(p); } }
      if (grupo.length < 4) break; grupo.forEach(p => usados.add(p.id));
      rodadas.push({ itens: grupo.map(p => p.id), certo: grupo.slice().sort((a, b) => a.ano - b.ano).map(p => p.id), tocados: [] }); }
    return rodadas; }
  return [];
}

function iniciarJogo(id) {
  pararRelogio();
  Object.assign(JG, { id, rodadas: montarRodadas(id), i: 0, pontos: 0, acertos: 0, erros: 0, seq: 0, melhorSeq: 0, vidas: 3, resp: null, fim: false, recorde: false, t0: Date.now(), tq: Date.now(), errados: [] });
  if (id === "relogio") { JG.ate = Date.now() + TEMPO_RELOGIO * 1000; _jgTimer = setInterval(tiqueRelogio, 250); }
  atualizar();
}
function pararRelogio() { if (_jgTimer) { clearInterval(_jgTimer); _jgTimer = null; } }
function tiqueRelogio() {
  if (JG.id !== "relogio" || JG.fim || !location.hash.startsWith("#/jogos/relogio")) { pararRelogio(); if (JG.id === "relogio" && !JG.fim) JG.id = null; return; }
  const resta = Math.max(0, Math.ceil((JG.ate - Date.now()) / 1000)), el = document.getElementById("jg-tempo");
  if (el) { el.textContent = resta + " s"; el.classList.toggle("pouco", resta <= 10); }
  if (resta <= 0) terminarJogo();
}
function terminarJogo() {
  pararRelogio(); if (JG.fim) return; JG.fim = true;
  const D = store.doc("jogos"); D.n[JG.id] = (D.n[JG.id] || 0) + 1;
  if (JG.pontos > 0 && JG.pontos > (D.rec[JG.id] || 0)) { JG.recorde = (D.rec[JG.id] || 0) > 0 ? "novo" : "primeiro"; D.rec[JG.id] = JG.pontos; }
  store.mudou("jogos");
  const j = JOGOS.find(x => x.id === JG.id), extra = j?.aoTerminar ? j.aoTerminar() : {};
  const cont = { vidas: { vidasMax: JG.acertos }, ecg: JG.acertos >= 10 ? { ecgPerfeito: 1 } : {}, linha: JG.acertos >= 5 ? { linhaPerfeita: 1 } : {} }[JG.id] || {};
  jornada("jogo", { acertos: JG.acertos, cont: { ...cont, ...(extra.cont || {}) }, dia: { ...(JG.id === "relogio" ? { rel: JG.melhorSeq } : {}), ...(extra.dia || {}) } });
  som(JG.recorde ? "festa" : "fim"); atualizar(); soltarCelebracoes();
  if (JG.recorde || JG.acertos >= 5) setTimeout(() => confete(document.querySelector("#jg-fim h2"), 26), 60);
}
function pontuar(ok, base = 10) {
  som(ok ? "ok" : "erro");
  if (ok) { JG.acertos++; JG.seq++; JG.melhorSeq = Math.max(JG.melhorSeq, JG.seq); JG.pontos += base * (JG.id === "relogio" ? multiplicador() : 1); }
  else { JG.erros++; JG.seq = 0; if (JG.id === "vidas") JG.vidas--; }
}
const multiplicador = () => Math.min(3, 1 + Math.floor(JG.seq / 3));   // x2 a partir de 3 seguidos, x3 a partir de 6
function proximaRodada() {
  JG.resp = null; JG.i++; JG.tq = Date.now();
  if (JG.i >= JG.rodadas.length || (JG.id === "vidas" && JG.vidas <= 0)) terminarJogo(); else atualizar();
}

/* ---------- Telas ---------- */
const placar = () => `<div class="jg-placar">
  <span><b>${JG.pontos}</b> pontos</span>
  ${JG.id === "relogio" ? `<span id="jg-tempo" class="jg-tempo">${Math.max(0, Math.ceil((JG.ate - Date.now()) / 1000))} s</span>` : `<span>${Math.min(JG.i + 1, JG.rodadas.length)} de ${JG.rodadas.length}</span>`}
  ${JG.id === "vidas" ? `<span class="jg-vidas" aria-label="${JG.vidas} vidas">${[0, 1, 2].map(k => ilustra("coracao", k < JG.vidas ? "#C0265F" : "#9AA0A8", "p")).join("")}</span>` : ""}
  ${JG.seq >= 3 ? `<span class="jg-seq">${JG.seq} seguidos${JG.id === "relogio" ? ` · x${multiplicador()}` : ""}</span>` : ""}</div>`;

function telaQuestao(r) {
  const q = qPorId(r.qid), respondeu = JG.resp != null;
  const alts = r.ordem.map((i, pos) => { const s = !respondeu ? "" : i === q.c ? "ok" : i === JG.resp ? "bad" : "";
    return `<li><button class="alt" data-act="jg-alt" data-i="${i}" data-s="${s}" ${respondeu ? "disabled" : ""}>${formaAlt(pos)}<span>${esc(q.o[i])}</span></button></li>`; }).join("");
  const volta = respondeu && JG.id === "vidas" ? `<div class="retorno"><p class="veredito ${JG.resp === q.c ? "ok" : "bad"}">${JG.resp === q.c ? "✓ " + esc(sorteio(ELOGIOS)) : "Perdeu uma vida"}</p>${htmlExplicacao(q.e)}
    <div class="acoes"><button class="btn grande" data-act="jg-prox">${JG.vidas > 0 ? "Próxima" : "Ver resultado"}</button></div></div>` : "";
  return `<div class="caixa"><div class="linha entre" style="margin-bottom:8px">${nivelQ(q)}</div><p class="enunciado">${esc(q.q)}</p><ol class="alts alts-jogo">${alts}</ol>${volta}</div>`;
}
const nivelQ = q => q.dif ? pill("Nível: " + (DIFICULDADE[q.dif] || ""), ({ 1: "ok", 2: "warn", 3: "bad" })[q.dif]) : "";

function telaVF(r) {
  const q = qPorId(r.qid), respondeu = JG.resp != null, ok = respondeu && JG.resp === r.verdade;
  return `<div class="caixa"><p class="enunciado">${esc(q.q)}</p>
    <div class="jg-proposta"><span class="lab">A resposta é…</span><p>${esc(q.o[r.oi])}</p></div>
    ${respondeu ? `<div class="retorno"><p class="veredito ${ok ? "ok" : "bad"}">${ok ? "✓ " + esc(sorteio(ELOGIOS)) : "Não foi dessa vez"} · ${r.verdade ? "era a resposta certa" : "não era a resposta"}</p>
      ${r.verdade ? "" : `<p class="leitura" style="margin:0 0 8px"><b>Resposta certa:</b> ${esc(q.o[q.c])}</p>`}${htmlExplicacao(q.e)}
      <div class="acoes"><button class="btn grande" data-act="jg-prox">${JG.i + 1 < JG.rodadas.length ? "Próxima" : "Ver resultado"}</button></div></div>`
    : `<div class="jg-vf"><button class="btn grande jg-sim" data-act="jg-vf" data-v="1">Certo</button><button class="btn grande jg-nao" data-act="jg-vf" data-v="0">Errado</button></div>`}</div>`;
}

function telaECG(r) {
  const respondeu = JG.resp != null, im = IMAGENS[r.img];
  return `<div class="caixa"><p class="enunciado">Qual é o ritmo deste traçado (DII)?</p>${figuraImg(r.img)}
    <div class="jg-opcoes">${r.ops.map(o => `<button class="btn grande sec" data-act="jg-ecg" data-o="${esc(o)}" data-s="${!respondeu ? "" : o === r.certo ? "ok" : o === JG.resp ? "bad" : ""}" ${respondeu ? "disabled" : ""}>${esc(o)}</button>`).join("")}</div>
    ${respondeu ? `<div class="retorno"><p class="veredito ${JG.resp === r.certo ? "ok" : "bad"}">${JG.resp === r.certo ? "✓ " + esc(sorteio(ELOGIOS)) : "Era: " + esc(r.certo)}</p><p class="leitura" style="margin:0">${esc(im.legenda)}</p>
      <div class="acoes"><button class="btn grande" data-act="jg-prox">${JG.i + 1 < JG.rodadas.length ? "Próximo traçado" : "Ver resultado"}</button></div></div>` : ""}</div>`;
}

function telaLinha(r) {
  const pil = id => PILULAS.find(p => p.id === id), acabou = JG.resp != null;
  return `<div class="caixa"><p class="enunciado">Toque do mais antigo para o mais recente.</p>
    <div class="jg-linha">${r.itens.map(id => { const k = r.tocados.indexOf(id), p = pil(id), pos = r.certo.indexOf(id);
      const s = acabou && id === r.erro ? "bad" : k >= 0 || (acabou && JG.resp) ? "ok" : "";
      return `<button class="jg-marco" data-act="jg-marco" data-id="${esc(id)}" data-s="${s}" ${k >= 0 || acabou ? "disabled" : ""}>
        <span class="jg-ordem">${acabou ? pos + 1 : k >= 0 ? k + 1 : ""}</span><span><b>${esc(p.titulo)}</b>${acabou ? `<small>${p.ano}</small>` : ""}</span></button>`; }).join("")}</div>
    ${acabou ? `<div class="retorno"><p class="veredito ${JG.resp ? "ok" : "bad"}">${JG.resp ? "✓ Ordem perfeita!" : "A ordem certa está nos números"}</p>
      <div class="acoes"><button class="btn grande" data-act="jg-prox">${JG.i + 1 < JG.rodadas.length ? "Próxima rodada" : "Ver resultado"}</button></div></div>` : ""}</div>`;
}

function telaFim(j) {
  const D = store.doc("jogos"), rec = D.rec[j.id] || 0;
  const msg = JG.recorde === "novo" ? "Novo recorde!" : JG.recorde === "primeiro" ? "Primeiro recorde registrado!" : JG.acertos ? "Fim de jogo" : "Fim de jogo — bora de novo?";
  return `<div class="caixa jg-fim" id="jg-fim" style="--h:${j.cor}"><h2 class="sec com-ilu" style="gap:10px">${mascote(JG.recorde ? "festa" : JG.acertos ? "feliz" : "triste", 88)}${msg}</h2>${j.resumoFim ? j.resumoFim() : ""}
    <div class="kpis"><div class="kpi"><b>${JG.pontos}</b><span>pontos</span></div><div class="kpi"><b>${JG.acertos}</b><span>acertos</span></div>
    <div class="kpi"><b>${JG.melhorSeq}</b><span>melhor sequência</span></div><div class="kpi"><b>${rec}</b><span>seu recorde</span></div></div>
    <div class="acoes"><button class="btn grande" data-act="jg-comecar" data-id="${j.id}">Jogar de novo</button>
    ${JG.errados.length ? `<button class="btn sec" data-act="praticar-ids" data-ids="${JG.errados.join(",")}" data-ctx="erros do jogo">Rever as ${JG.errados.length} que errei</button>` : ""}
    <a class="btn sec" href="#/jogos">Outros jogos</a></div></div>`;
}

rota("/jogos", () => {
  const D = store.doc("jogos"), lista = JOGOS.filter(jogoDisponivel);
  return { secao: "jogos", titulo: "Jogos", sub: "Estudar também pode ser divertido. Tudo com questões e conteúdos do seu foco de estudo.",
    acoes: `<button class="btn sec mini" data-act="jg-som">${store.doc("jogos").som ? "Sons: ligados" : "Sons: desligados"}</button>`,
    html: `${cartaoJornada()}
      ${lista.some(j => j.diario) ? `<section><h2 class="sec">Desafios de hoje</h2><div class="jg-hoje">${lista.filter(j => j.diario).map(j => { const feito = j.diario();
        return `<a class="jg-desafio ${feito ? "feito" : ""}" href="#/jogos/${j.id}" style="--h:${j.cor}">${ilustra(j.arte, j.cor, "g")}<b>${esc(j.nome)}</b><span class="pill ${feito ? "ok" : "warn"}">${feito ? "✓ Feito hoje" : "Novo hoje"}</span></a>`; }).join("")}</div></section>` : ""}
      ${GRUPOS_JOGOS.map(([g, tit, sub]) => { const js = lista.filter(j => !j.diario && (GRUPO_JOGO[j.id] || "rapidos") === g); return js.length ? `<section><h2 class="sec">${tit}</h2><p class="muted" style="margin:-4px 0 10px">${sub}</p><div class="jg-lista">${js.map(j => `<a class="jg-cartao" href="#/jogos/${j.id}" style="--h:${j.cor}">${ilustra(j.arte, j.cor, "g")}<div>
      <b>${esc(j.nome)}</b><small>${esc(j.curto || j.desc)}</small>${D.rec[j.id] ? `<span class="pill">Recorde: ${D.rec[j.id]} pontos</span>` : ""}</div></a>`).join("")}</div></section>` : ""; }).join("")}` };
});
rota("/jogos/:id", ({ id }) => {
  const j = JOGOS.find(x => x.id === id); if (!j || !jogoDisponivel(j)) return paginaNaoEncontrada();
  const base = { secao: "jogos", crumbs: [["Jogos", "#/jogos"]], titulo: j.nome, ilu: ilustra(j.arte, j.cor, "g"), cor: j.cor };
  if (JG.id !== id || !JG.rodadas?.length) {
    const rec = store.doc("jogos").rec[id];
    return { ...base, sub: esc(j.desc), html: `<div class="caixa jg-intro">${falaMascote(esc(j.fala || "Bora jogar? Cada acerto vale XP na sua jornada."), "feliz")}${rec ? `<p><b>Seu recorde:</b> ${rec} pontos</p>` : ""}
      ${j.intro ? j.intro() : `<button class="btn grande" data-act="jg-comecar" data-id="${id}">Começar</button>`}</div>` };
  }
  if (JG.fim) return { ...base, html: telaFim(j) };
  const r = JG.rodadas[JG.i];
  const tela = j.tela ? j.tela(r) : id === "vf" ? telaVF(r) : id === "ecg" ? telaECG(r) : id === "linha" ? telaLinha(r) : telaQuestao(r);
  return { ...base, html: (j.semPlacar ? "" : placar()) + tela + `<div class="acoes"><button class="btn sec mini" data-act="jg-parar">Encerrar jogo</button></div>` };
});

/* ---------- Ações ---------- */
ACOES["jg-comecar"] = el => { iniciarJogo(el.dataset.id); if (!location.hash.startsWith("#/jogos/" + el.dataset.id)) ir("#/jogos/" + el.dataset.id); };
ACOES["jg-parar"] = () => terminarJogo();
ACOES["jg-prox"] = () => proximaRodada();
ACOES["jg-alt"] = el => {
  if (JG.resp != null || JG.fim) return;
  const r = JG.rodadas[JG.i], q = qPorId(r.qid), i = +el.dataset.i, ok = i === q.c;
  JG.resp = i; registrarResposta(q, i, Date.now() - JG.tq, "jogo"); if (!ok) JG.errados.push(q.id);
  pontuar(ok, JG.id === "vidas" ? 10 * (q.dif || 2) : 10); atualizar();
  if (JG.id === "relogio") setTimeout(() => { if (JG.id === "relogio" && !JG.fim) proximaRodada(); }, ok ? 650 : 1300);
};
ACOES["jg-vf"] = el => { if (JG.resp != null) return; const r = JG.rodadas[JG.i]; JG.resp = el.dataset.v === "1"; const ok = JG.resp === r.verdade; if (!ok) JG.errados.push(r.qid); pontuar(ok); atualizar(); };
ACOES["jg-ecg"] = el => { if (JG.resp != null) return; const r = JG.rodadas[JG.i]; JG.resp = el.dataset.o; pontuar(JG.resp === r.certo); atualizar(); };
ACOES["jg-marco"] = el => {
  const r = JG.rodadas[JG.i]; if (JG.resp != null) return;
  const id = el.dataset.id, esperado = r.certo[r.tocados.length];
  if (id !== esperado) { r.erro = id; JG.resp = false; pontuar(false); }
  else { r.tocados.push(id); if (r.tocados.length === r.certo.length) { JG.resp = true; pontuar(true, 20); } }
  atualizar();
};

/* ---------- Formas coloridas nas alternativas (estilo Kahoot) e sons ---------- */
const FORMAS = ["M12 3 22 20H2z", "M12 2 22 12 12 22 2 12z", "M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20z", "M3 3h18v18H3z", "M12 2l3 7 7 .6-5.3 4.7L18.3 22 12 18.2 5.7 22l1.6-7.7L2 9.6 9 9z"];
const formaAlt = pos => `<span class="forma forma-${pos}" aria-label="${LETRAS[pos]}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${FORMAS[pos]}"/></svg><b>${LETRAS[pos]}</b></span>`;
let _audio = null;
function som(tipo) {
  if (!store.doc("jogos").som) return;
  try {
    _audio = _audio || new (window.AudioContext || window.webkitAudioContext)();
    const notas = { ok: [660, 880], erro: [220, 180], fim: [523, 659, 784], festa: [523, 659, 784, 1047], tecla: [440] }[tipo] || [440];
    notas.forEach((f, k) => { const o = _audio.createOscillator(), g = _audio.createGain(), t = _audio.currentTime + k * .11;
      o.type = tipo === "erro" ? "sawtooth" : "sine"; o.frequency.value = f; g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(tipo === "tecla" ? .04 : .12, t + .02); g.gain.exponentialRampToValueAtTime(.0001, t + .18);
      o.connect(g).connect(_audio.destination); o.start(t); o.stop(t + .2); });
  } catch (e) { /* sem áudio: segue em silêncio */ }
}
ACOES["jg-som"] = () => { const D = store.doc("jogos"); D.som = !D.som; store.mudou("jogos"); if (D.som) som("ok"); atualizar(); };
/** Copia o resultado para colar no WhatsApp; se o navegador recusar, mostra o texto para selecionar. */
function compartilharTexto(txt) {
  const mostrar = () => abrirFolha(`<p>Selecione e copie:</p><textarea class="copiar" rows="5" readonly>${esc(txt)}</textarea>`, { titulo: "Compartilhar resultado" });
  try { navigator.clipboard.writeText(txt).then(() => toast("Resultado copiado. É só colar no WhatsApp!"), mostrar); } catch (e) { mostrar(); }
}
