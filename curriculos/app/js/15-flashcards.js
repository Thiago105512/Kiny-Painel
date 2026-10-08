/* ============================================================
   15-flashcards — cards ligados a tema/subtema, com repetição espaçada.
   ============================================================ */
const ORIGEM_CARD = { manual: "manual", erro: "caderno de erros", questao: "questão", ia: "IA", pilula: "pílula" };
let CPAG = 30;   // cards mostrados na lista; "Mostrar mais" amplia
function tabelaCards(cs, vaziaMsg = "Nenhum flashcard.", limite = CPAG) {
  if (!cs.length) return vazio(vaziaMsg);
  const ord = cs.sort((a, b) => a.srs.prox.localeCompare(b.srs.prox)), mais = ord.length > limite;
  return `<div class="lista-q">${ord.slice(0, limite).map(c => `<a href="#" data-act="card-editar" data-id="${esc(c.id)}"><span class="txt">${esc(c.frente)}</span><span class="meta">${vencido(c.srs) ? pill("hoje", "azul") : `<span>${quando(c.srs.prox)}</span>`}${c.tema ? `<span>${esc(nomeTema(c.tema))}</span>` : ""}<span>${esc(ORIGEM_CARD[c.origem] || c.origem)}</span></span></a>`).join("")}</div>${mais ? `<div class="acoes"><button class="btn sec" data-act="cards-mais">Mostrar mais (${ord.length - limite} restantes)</button></div>` : ""}`;
}
const FF = { tema: "" };
ACOES["cards-mais"] = () => { CPAG += 30; atualizar(); };
rota("/flashcards", () => {
  const todos = cards().filter(cardDoObjetivo), lista = todos.filter(c => !FF.tema || c.tema === FF.tema), venc = todos.filter(c => vencido(c.srs));
  const semCard = errosSemCard();
  const temasC = ordenarPt(unicos(todos.map(c => c.tema)).filter(Boolean), nomeTema);
  return {
    secao: "flashcards", titulo: "Flashcards", sub: todos.length ? `${todos.length} cards · ${venc.length} para hoje · ${todos.filter(c => c.srs.etapa >= 2).length} consolidados` : "",
    acoes: `<button class="btn sec mini" data-act="card-novo">+ Novo</button>${todos.length && semCard.length ? `<button class="btn sec mini" data-act="cards-dos-erros">+ Dos erros (${semCard.length})</button>` : ""}`,
    html: todos.length ? `${venc.length ? `<div class="faixa"><p><b>${venc.length} para revisar hoje</b></p><a class="btn" href="#/flashcards/estudar">Estudar</a></div>` : ""}
        ${temasC.length > 1 ? `<label class="campo" style="max-width:320px"><span class="lab">Filtrar por tema</span><select data-chg="ff">${opcoes(temasC.map(t => [t, nomeTema(t)]), FF.tema, "Todos")}</select></label>` : ""}
        ${tabelaCards(lista)}
        <p class="small muted">Revisão espaçada: 1 → 7 → 30 → 90 dias, ajustada pela sua avaliação.</p>`
      : vazio(`Você ainda não tem flashcards. Crie a partir dos seus erros, das questões de um tema, com o assistente ou manualmente.${semCard.length ? "" : " (Seu caderno de erros ainda está vazio: quando você errar uma questão, ela pode virar flashcard.)"}`,
        `${semCard.length ? `<button class="btn" data-act="cards-dos-erros">Criar ${plural(semCard.length, "flashcard", "flashcards")} dos seus erros</button>` : ""}<button class="btn ${semCard.length ? "sec" : ""}" data-act="card-novo">Criar à mão</button>`),
  };
});
MUDANCAS.ff = el => { FF.tema = el.value; atualizar(); };
/** Erros abertos (do objetivo) que ainda não viraram flashcard. */
const errosSemCard = () => { const refs = new Set(cards().map(c => c.ref).filter(Boolean)); return Object.values(store.doc("erros").itens).filter(e => e.status === "aberto" && !e.card && !refs.has(e.qid) && erroDoObjetivo(e)); };
/* "Do caderno de erros" cria os cards de verdade: um por erro aberto, com a resposta certa, a explicação e a nota pessoal. */
ACOES["cards-dos-erros"] = () => {
  const E = store.doc("erros"), lista = errosSemCard(); let n = 0;
  lista.forEach(e => { const q = qPorId(e.qid); if (!q) return;
    e.card = criarCard({ frente: q.q, verso: `${q.o[q.c]}\n\n${q.e || ""}${e.coment ? "\n\nMinha nota: " + e.coment : ""}`.trim(), tema: q.tema, subtema: q.subtema, origem: "erro", ref: q.id, dif: q.dif || 2 }); n++; });
  if (n) store.mudou("erros");
  toast(n ? `${plural(n, "flashcard criado", "flashcards criados")} a partir dos erros` : "Nenhum erro aberto sem flashcard"); atualizar();
};

/* ---------- Sessão de estudo ---------- */
const FC = { chave: null, fila: [], i: 0, mostrar: false, feitos: [], virou: false };
function paginaEstudoCards(temaId) {
  const chave = temaId || "*";
  const venc = cards().filter(c => vencido(c.srs) && cardDoObjetivo(c) && (!temaId || c.tema === temaId)).map(c => c.id);
  const concluida = FC.chave === chave && FC.i >= FC.fila.length, novos = venc.some(id => !FC.fila.includes(id));
  if (FC.chave !== chave || (concluida && novos)) Object.assign(FC, { chave, fila: embaralhar(venc), i: 0, mostrar: false, feitos: [] });
  const crumbs = [["Flashcards", "#/flashcards"]].concat(temaId ? [[nomeTema(temaId), "#/tema/" + encodeURIComponent(temaId) + "/flashcards"]] : []);
  if (!FC.fila.length) return { secao: "flashcards", crumbs, titulo: "Estudar flashcards", html: vazio("Nenhum card vencido agora. Volte mais tarde ou crie novos.", `<a class="btn sec" href="#/flashcards">Voltar</a>`) };
  if (FC.i >= FC.fila.length) {
    const n = FC.feitos.length, ok = FC.feitos.filter(x => x >= 2).length;
    return { secao: "flashcards", crumbs, titulo: "Sessão concluída", html: `<div class="kpis"><div class="kpi"><b>${n}</b><span>cards revisados</span></div><div class="kpi"><b>${pct(ok, n)}%</b><span>lembrei (bom/fácil)</span></div></div><div class="acoes"><a class="btn" href="#/revisoes">Outras revisões</a><button class="btn sec" data-act="fc-reiniciar">Nova sessão</button></div>` };
  }
  const c = cardPorId(FC.fila[FC.i]);
  if (!c) { FC.i++; return paginaEstudoCards(temaId); }
  const rot = [[0, "Errei"], [1, "Difícil"], [2, "Bom"], [3, "Fácil"]];
  const virou = FC.virou; FC.virou = false;   // animação de virar só logo depois do toque
  return {
    secao: "flashcards", crumbs, titulo: `Card ${FC.i + 1} de ${FC.fila.length}`,
    html: `<div class="fc${virou ? " virou" : ""}${FC.mostrar ? " aberto" : ""}" id="fc"><div class="fc-topo"><span class="small muted">${c.tema ? linkTema(c.tema) : "sem tema"}${c.subtema ? " · " + esc(nomeSubtema(c.tema, c.subtema) || "") : ""} · ${esc(ORIGEM_CARD[c.origem] || c.origem)}</span>${botaoOuvir("fc")}</div>
      <div class="frente">${esc(c.frente)}</div>${FC.mostrar ? `<div class="verso">${esc(c.verso)}</div>` : `<p class="fc-toque small muted">Toque no cartão para virar</p>`}</div>
      <div style="margin-top:12px">${FC.mostrar ? `<p class="fc-dica small muted"><span>← Esqueci</span><span>deslize o cartão</span><span>Lembrei →</span></p><div class="notas">${rot.map(([n, t]) => `<button class="btn ${n === 0 ? "perigo" : n === 2 ? "azul" : "sec"}" data-act="fc-nota" data-n="${n}">${t}<small>${previaIntervalo(c.srs, n)} d</small></button>`).join("")}</div>`
        : `<button class="btn" style="width:100%" data-act="fc-mostrar">Mostrar resposta (espaço)</button>`}</div>
      <p class="small muted so-teclado">Atalhos: espaço mostra · 1 errei · 2 difícil · 3 bom · 4 fácil · ← esqueci · → lembrei</p>`,
    ctx: { tema: c.tema, texto: "Flashcard em estudo: " + c.frente },
  };
}
rota("/flashcards/estudar", () => paginaEstudoCards(null));
rota("/flashcards/estudar/:tema", p => paginaEstudoCards(p.tema));
ACOES["fc-mostrar"] = () => { FC.mostrar = true; FC.virou = true; atualizar(); };
ACOES["fc-nota"] = el => { pararVoz(); const n = +el.dataset.n; avaliarCard(FC.fila[FC.i], n); FC.feitos.push(n); FC.i++; FC.mostrar = false; atualizar(); };
ACOES["fc-reiniciar"] = () => { FC.chave = null; atualizar(); };
document.addEventListener("keydown", e => {
  if (!document.getElementById("fc") || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName) || $("#camada").innerHTML) return;
  if (e.key === " " && !FC.mostrar) { e.preventDefault(); ACOES["fc-mostrar"](); }
  else if (FC.mostrar && ["1", "2", "3", "4"].includes(e.key)) ACOES["fc-nota"]({ dataset: { n: +e.key - 1 } });
  else if (FC.mostrar && (e.key === "ArrowRight" || e.key === "ArrowLeft") && !/^(BUTTON|A)$/.test(e.target.tagName)) { e.preventDefault(); ACOES["fc-nota"]({ dataset: { n: e.key === "ArrowRight" ? 2 : 0 } }); }
});

/* ---------- Criar / editar ---------- */
function formCard(c = {}) {
  const t = c.tema && TEMAS[c.tema];
  return `<form class="pilha" data-form="card-salvar" data-id="${esc(c.id || "")}">
    <label class="campo"><span class="lab">Pergunta (frente)</span><textarea id="cd-f" rows="3" required>${esc(c.frente || "")}</textarea></label>
    <label class="campo"><span class="lab">Resposta (verso)</span><textarea id="cd-v" rows="4" required>${esc(c.verso || "")}</textarea></label>
    ${campoTema("cd-tema", c.tema)}
    ${t?.subtemas?.length ? `<label class="campo"><span class="lab">Subtema</span><select id="cd-sub">${opcoes(t.subtemas.map(s => [s.id, s.nome]), c.subtema, "—")}</select></label>` : ""}
    <label class="campo"><span class="lab">Dificuldade</span><select id="cd-dif">${opcoes(Object.entries(DIFICULDADE), c.dif || 2)}</select></label>
    <div class="linha"><button class="btn">Salvar</button>${c.id ? `<button class="btn perigo" type="button" data-act="card-excluir" data-id="${esc(c.id)}">Excluir</button>` : ""}</div>
    ${c.srs?.hist?.length ? `<p class="small muted">Histórico: ${c.srs.hist.map(h => `${dataCurta(h[0])} ${["errei", "difícil", "bom", "fácil"][h[1]]}`).join(" · ")}</p>` : ""}</form>`;
}
ACOES["card-novo"] = el => abrirFolha(`<h2 class="sec">Novo flashcard</h2>${formCard({ tema: el.dataset.t || null })}`);
ACOES["card-editar"] = el => abrirFolha(`<h2 class="sec">Editar flashcard</h2>${formCard(cardPorId(el.dataset.id))}`);
FORMS["card-salvar"] = f => {
  const frente = $("#cd-f").value.trim(), verso = $("#cd-v").value.trim(); if (!frente || !verso) return;
  const tema = lerTema("cd-tema"), sub = $("#cd-sub")?.value || null, dif = +$("#cd-dif").value;
  if ($("#cd-tema").value.trim() && !tema) { toast("Tema não encontrado — escolha um da lista"); return; }
  if (f.dataset.id) { const c = cardPorId(f.dataset.id); if (c) { Object.assign(c, { frente, verso, tema, subtema: sub, dif }); cardMudou(f.dataset.id); } }
  else criarCard({ frente, verso, tema, subtema: sub, dif, origem: "manual" });
  fecharFolha(); toast("Flashcard salvo"); atualizar();
};
ACOES["card-excluir"] = el => { excluirCard(el.dataset.id); fecharFolha(); toast("Flashcard excluído"); atualizar(); };
