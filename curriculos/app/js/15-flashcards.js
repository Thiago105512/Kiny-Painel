/* ============================================================
   15-flashcards — cards ligados a tema/subtema, com repetição espaçada.
   ============================================================ */
const ORIGEM_CARD = { manual: "manual", erro: "caderno de erros", questao: "questão", ia: "IA" };
function tabelaCards(cs, vaziaMsg = "Nenhum flashcard.") {
  return tabela([{ t: "Pergunta" }, { t: "Tema" }, { t: "Origem" }, { t: "Próxima" }, { t: "" }],
    cs.sort((a, b) => a.srs.prox.localeCompare(b.srs.prox)).map(c => [esc(c.frente.length > 90 ? c.frente.slice(0, 90) + "…" : c.frente), c.tema ? linkTema(c.tema) : "—", esc(ORIGEM_CARD[c.origem] || c.origem),
      `${dataBR(c.srs.prox)} ${vencido(c.srs) ? pill("hoje", "azul") : ""}`, `<button class="btn mini sec" data-act="card-editar" data-id="${esc(c.id)}">Editar</button>`]), { vaziaMsg });
}
const FF = { tema: "" };
rota("/flashcards", () => {
  const todos = cards(), lista = todos.filter(c => !FF.tema || c.tema === FF.tema), venc = todos.filter(c => vencido(c.srs));
  const temasC = ordenarPt(unicos(todos.map(c => c.tema)).filter(Boolean), nomeTema);
  return {
    secao: "flashcards", titulo: "Flashcards", sub: "Revisão espaçada: 1 → 7 → 30 → 90 dias, ajustada pela sua avaliação a cada card.",
    acoes: `${venc.length ? `<a class="btn" href="#/flashcards/estudar">Estudar ${venc.length} vencidos</a>` : ""}<button class="btn sec" data-act="card-novo">+ Novo</button>`,
    html: `<div class="kpis"><div class="kpi"><b>${todos.length}</b><span>cards</span></div><div class="kpi"><b>${venc.length}</b><span>para hoje</span></div><div class="kpi"><b>${todos.filter(c => c.srs.etapa >= 2).length}</b><span>consolidados (≥30 dias)</span></div><div class="kpi"><b>${todos.filter(c => c.srs.hist?.length).length}</b><span>já revisados</span></div></div>
      ${todos.length ? `<div class="campos" style="margin:12px 0"><label class="campo"><span class="lab">Tema</span><select data-chg="ff">${opcoes(temasC.map(t => [t, nomeTema(t)]), FF.tema, "Todos")}</select></label></div>${tabelaCards(lista)}`
        : vazio("Você ainda não tem flashcards. Crie a partir dos seus erros, das questões de um tema, com o assistente ou manualmente.", `<a class="btn" href="#/erros">Do caderno de erros</a><button class="btn sec" data-act="card-novo">Criar manualmente</button>`)}`,
  };
});
MUDANCAS.ff = el => { FF.tema = el.value; atualizar(); };

/* ---------- Sessão de estudo ---------- */
const FC = { chave: null, fila: [], i: 0, mostrar: false, feitos: [] };
function paginaEstudoCards(temaId) {
  const chave = temaId || "*";
  if (FC.chave !== chave) Object.assign(FC, { chave, fila: embaralhar(cards().filter(c => vencido(c.srs) && (!temaId || c.tema === temaId))).map(c => c.id), i: 0, mostrar: false, feitos: [] });
  const crumbs = [["Flashcards", "#/flashcards"]].concat(temaId ? [[nomeTema(temaId), "#/tema/" + encodeURIComponent(temaId) + "/flashcards"]] : []);
  if (!FC.fila.length) return { secao: "flashcards", crumbs, titulo: "Estudar flashcards", html: vazio("Nenhum card vencido agora. Volte mais tarde ou crie novos.", `<a class="btn sec" href="#/flashcards">Voltar</a>`) };
  if (FC.i >= FC.fila.length) {
    const n = FC.feitos.length, ok = FC.feitos.filter(x => x >= 2).length;
    return { secao: "flashcards", crumbs, titulo: "Sessão concluída", html: `<div class="kpis"><div class="kpi"><b>${n}</b><span>cards revisados</span></div><div class="kpi"><b>${pct(ok, n)}%</b><span>lembrei (bom/fácil)</span></div></div><div class="acoes"><a class="btn" href="#/revisoes">Outras revisões</a><button class="btn sec" data-act="fc-reiniciar">Nova sessão</button></div>` };
  }
  const c = store.doc("cards").itens[FC.fila[FC.i]];
  if (!c) { FC.i++; return paginaEstudoCards(temaId); }
  const rot = [[0, "Errei"], [1, "Difícil"], [2, "Bom"], [3, "Fácil"]];
  return {
    secao: "flashcards", crumbs, titulo: `Card ${FC.i + 1} de ${FC.fila.length}`,
    html: `<div class="fc" id="fc"><div class="small muted">${c.tema ? linkTema(c.tema) : "sem tema"}${c.subtema ? " · " + esc(nomeSubtema(c.tema, c.subtema) || "") : ""} · ${esc(ORIGEM_CARD[c.origem] || c.origem)}</div>
      <div class="frente">${esc(c.frente)}</div>${FC.mostrar ? `<div class="verso">${esc(c.verso)}</div>` : ""}</div>
      <div style="margin-top:12px">${FC.mostrar ? `<div class="notas">${rot.map(([n, t]) => `<button class="btn ${n === 0 ? "perigo" : n === 2 ? "azul" : "sec"}" data-act="fc-nota" data-n="${n}">${t}<small>${previaIntervalo(c.srs, n)} d</small></button>`).join("")}</div>`
        : `<button class="btn" style="width:100%" data-act="fc-mostrar">Mostrar resposta (espaço)</button>`}</div>
      <p class="small muted">Atalhos: espaço mostra · 1 errei · 2 difícil · 3 bom · 4 fácil</p>`,
    ctx: { tema: c.tema, texto: "Flashcard em estudo: " + c.frente },
  };
}
rota("/flashcards/estudar", () => paginaEstudoCards(null));
rota("/flashcards/estudar/:tema", p => paginaEstudoCards(p.tema));
ACOES["fc-mostrar"] = () => { FC.mostrar = true; atualizar(); };
ACOES["fc-nota"] = el => { const n = +el.dataset.n; avaliarCard(FC.fila[FC.i], n); FC.feitos.push(n); FC.i++; FC.mostrar = false; atualizar(); };
ACOES["fc-reiniciar"] = () => { FC.chave = null; atualizar(); };
document.addEventListener("keydown", e => {
  if (!document.getElementById("fc") || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName) || $("#camada").innerHTML) return;
  if (e.key === " " && !FC.mostrar) { e.preventDefault(); ACOES["fc-mostrar"](); }
  else if (FC.mostrar && ["1", "2", "3", "4"].includes(e.key)) ACOES["fc-nota"]({ dataset: { n: +e.key - 1 } });
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
ACOES["card-editar"] = el => abrirFolha(`<h2 class="sec">Editar flashcard</h2>${formCard(store.doc("cards").itens[el.dataset.id])}`);
FORMS["card-salvar"] = f => {
  const frente = $("#cd-f").value.trim(), verso = $("#cd-v").value.trim(); if (!frente || !verso) return;
  const tema = lerTema("cd-tema"), sub = $("#cd-sub")?.value || null, dif = +$("#cd-dif").value;
  if ($("#cd-tema").value.trim() && !tema) { toast("Tema não encontrado — escolha um da lista"); return; }
  if (f.dataset.id) { const C = store.doc("cards"), c = C.itens[f.dataset.id]; Object.assign(c, { frente, verso, tema, subtema: sub, dif }); store.mudou("cards"); }
  else criarCard({ frente, verso, tema, subtema: sub, dif, origem: "manual" });
  fecharFolha(); toast("Flashcard salvo"); atualizar();
};
ACOES["card-excluir"] = el => { const C = store.doc("cards"); delete C.itens[el.dataset.id]; store.mudou("cards"); fecharFolha(); toast("Flashcard excluído"); atualizar(); };
