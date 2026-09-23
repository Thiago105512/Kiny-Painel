/* ============================================================
   14-questoes — banco de questões (filtros completos), página da questão
   com histórico de tentativas, e caderno de erros.
   ============================================================ */
const FQ = { trilha: "", inst: "", periodo: "", disc: "", esp: "", tema: "", subtema: "", dif: "", fonte: "", ano: "", prova: "", status: [], texto: "" };
const STATUS_Q = [["nao", "Não respondida"], ["correta", "Correta"], ["incorreta", "Incorreta"], ["marcada", "Marcada"], ["revisar", "Revisar"]];

/** Temas presentes nas matrizes de uma instituição (opcionalmente só de um período). */
function temasDaInstituicao(instId, periodo) {
  const s = new Set();
  gradesDe(instId).forEach(g => itensGrade(g).filter(it => !periodo || String(it.periodo) === String(periodo)).forEach(it => temasDoItem(it).forEach(t => s.add(t))));
  return s;
}
function filtrarQuestoes(F) {
  const temasInst = F.inst ? temasDaInstituicao(F.inst, F.periodo) : null, txt = norm(F.texto);
  return questoes().filter(q => {
    if (F.trilha && (F.trilha === "med" ? TRILHAS[q.t]?.dominio !== "medicina" : q.t !== F.trilha)) return false;
    if (temasInst && !temasInst.has(q.tema)) return false;
    if (F.disc && q.disc !== F.disc) return false;
    if (F.esp && q.esp !== F.esp && !(TEMAS[q.tema]?.especialidades || []).includes(F.esp)) return false;
    if (F.tema && q.tema !== F.tema) return false;
    if (F.subtema && q.subtema !== F.subtema) return false;
    if (F.dif && String(q.dif) !== F.dif) return false;
    if (F.fonte && q.fonte !== F.fonte && q.src !== F.fonte) return false;
    if (F.ano && String(q.ano) !== F.ano) return false;
    if (F.prova && q.prova !== F.prova) return false;
    if (F.status?.length) { const s = statusQ(q); if (!F.status.some(k => k === s.chave || (k === "marcada" && s.marcada) || (k === "revisar" && s.revisar))) return false; }
    if (txt && !norm(q.q + " " + q.o.join(" ")).includes(txt)) return false;
    return true;
  });
}
function formFiltros(F, prefixo = "fq") {
  const base = questoes().filter(q => !F.trilha || (F.trilha === "med" ? TRILHAS[q.t]?.dominio === "medicina" : q.t === F.trilha));
  const discs = ordenarPt(unicos(base.map(q => q.disc))), temasL = ordenarPt(unicos(base.map(q => q.tema)).filter(t => TEMAS[t]), nomeTema);
  const espL = ordenarPt(unicos(base.flatMap(q => [q.esp, ...(TEMAS[q.tema]?.especialidades || [])])).filter(e => ESPECIALIDADES[e]), e => ESPECIALIDADES[e].nome);
  const anos = unicos(base.map(q => q.ano)).sort(), provas = unicos(base.map(q => q.prova)), fontes = unicos(base.map(q => q.fonte || q.src));
  const sel = (c, lab, itens, vazioTxt = "Todas") => `<label class="campo"><span class="lab">${lab}</span><select data-chg="${prefixo}" data-c="${c}">${opcoes(itens, F[c], vazioTxt)}</select></label>`;
  return `<div class="campos">
    ${sel("trilha", "Trilha", [["med", "Medicina (graduação + residência)"], ...Object.entries(TRILHAS).map(([k, v]) => [k, v.nome])])}
    ${sel("inst", "Instituição (via grade)", instituicoes().map(i => [i.id, i.sigla]))}
    ${sel("periodo", "Período", Array.from({ length: 12 }, (_, i) => [i + 1, i + 1 + "º"]), "Todos")}
    ${sel("disc", "Disciplina", discs.map(d => [d, d]))}
    ${sel("esp", "Especialidade", espL.map(e => [e, ESPECIALIDADES[e].nome]))}
    ${sel("tema", "Tema", temasL.map(t => [t, nomeTema(t)]), "Todos")}
    ${F.tema ? sel("subtema", "Subtema", (TEMAS[F.tema]?.subtemas || []).map(s => [s.id, s.nome]), "Todos") : ""}
    ${sel("dif", "Dificuldade", Object.entries(DIFICULDADE))}
    ${sel("fonte", "Fonte", fontes.map(f => [f, { autoral: "Autoral (banco do app)", ia: "Gerada por IA", minha: "Minhas" }[f] || f]))}
    ${anos.length ? sel("ano", "Ano", anos.map(a => [a, a]), "Todos") : ""}${provas.length ? sel("prova", "Prova", provas.map(p => [p, p])) : ""}
    <label class="campo"><span class="lab">Texto</span><input type="search" value="${esc(F.texto)}" data-inp="${prefixo}-txt" placeholder="Palavra no enunciado"></label></div>
    <div style="margin-top:10px"><span class="lab">Status</span><div class="chips">${STATUS_Q.map(([k, t]) => `<button class="chip" data-act="${prefixo}-st" data-v="${k}" aria-pressed="${F.status.includes(k)}">${t}</button>`).join("")}</div></div>
    ${F.inst && !temasDaInstituicao(F.inst).size ? `<p class="aviso" style="margin-top:10px">A instituição escolhida não tem matriz importada com temas vinculados (${PENDENTE}). Nenhuma questão pode ser associada a ela ainda.</p>` : ""}`;
}
MUDANCAS.fq = el => { FQ[el.dataset.c] = el.value; if (el.dataset.c === "tema") FQ.subtema = ""; if (el.dataset.c === "trilha") Object.assign(FQ, { disc: "", tema: "", subtema: "", esp: "" }); atualizar(); };
ENTRADAS["fq-txt"] = el => { FQ.texto = el.value; atualizar(); const i = document.querySelector('[data-inp="fq-txt"]'); if (i) { i.focus(); i.setSelectionRange(i.value.length, i.value.length); } };
ACOES["fq-st"] = el => { const k = el.dataset.v; FQ.status = FQ.status.includes(k) ? FQ.status.filter(x => x !== k) : [...FQ.status, k]; atualizar(); };
ACOES["fq-limpar"] = () => { Object.assign(FQ, { trilha: "", inst: "", periodo: "", disc: "", esp: "", tema: "", subtema: "", dif: "", fonte: "", ano: "", prova: "", status: [], texto: "" }); atualizar(); };

rota("/questoes", () => {
  if (playerAtivo("banco")) return { secao: "questoes", crumbs: [["Questões", "#/questoes"]], titulo: PL.rotulo || "Praticando", html: htmlPlayer(), ctx: { questao: PL.ids[PL.i], tema: qPorId(PL.ids[PL.i])?.tema } };
  const qs = filtrarQuestoes(FQ), ativos = Object.entries(FQ).filter(([k, v]) => k !== "status" ? v : v.length).length;
  return {
    secao: "questoes", titulo: "Questões", sub: `${questoes().length} no banco · ${qs.length} no filtro`,
    acoes: `<a class="btn sec" href="#/erros">Caderno de erros</a><a class="btn sec" href="#/biblioteca/questoes">Minhas questões</a>`,
    html: `${abas([["banco", "Banco"], ["erros", "Caderno de erros"]], "banco", "ir-aba-q")}
      <details class="filtros" ${ativos ? "open" : ""}><summary>Filtros${ativos ? ` (${ativos})` : ""}</summary><div style="margin-top:10px">${formFiltros(FQ)}</div>${ativos ? `<div class="acoes"><button class="btn sec mini" data-act="fq-limpar">Limpar filtros</button></div>` : ""}</details>
      <div class="acoes" style="margin-top:0">${qs.length ? `<button class="btn" data-act="praticar-filtro">Praticar ${Math.min(qs.length, 30)} questões</button><button class="btn sec" data-act="sim-do-filtro">Simulado com este filtro</button>` : ""}</div>
      ${listaQuestoes(qs)}`,
  };
});
ACOES["ir-aba-q"] = el => ir(el.dataset.v === "erros" ? "#/erros" : "#/questoes");
function praticar(ids, rotulo) { iniciarPlayer("banco", ids, "pratica"); PL.rotulo = rotulo || "Praticando"; ir("#/questoes"); }
ACOES["praticar-filtro"] = () => { const qs = filtrarQuestoes(FQ); const pri = qs.filter(q => statusQ(q).chave === "nao"); praticar(embaralhar(pri.length >= 10 ? pri : qs).slice(0, 30).map(q => q.id), "Praticando questões filtradas"); };
ACOES["praticar-ids"] = el => praticar(embaralhar(el.dataset.ids.split(",").filter(qPorId)).slice(0, 40), "Praticando: " + (el.dataset.ctx || "seleção"));

/* ---------- Página de uma questão ---------- */
rota("/questoes/q/:id", ({ id }) => {
  const q = qPorId(id); if (!q) return paginaNaoEncontrada();
  if (!playerAtivo("q:" + id)) iniciarPlayer("q:" + id, [id], "pratica");
  const p = progDe(q), E = store.doc("erros").itens[id];
  const hist = (p?.h || []).slice().reverse().map(h => [new Date(h[0]).toLocaleString("pt-BR"), h[1] == null ? "—" : esc(q.o[h[1]] || "—"), h[2] ? pill("certa", "ok") : pill("errada", "bad"), h[3] ? mmss(h[3]) : "—", esc({ pratica: "prática", tema: "tema", simulado: "simulado", revisao: "revisão", erro: "caderno de erros", v1: "versão anterior" }[h[4]] || h[4] || "")]);
  return {
    secao: "questoes", crumbs: [["Questões", "#/questoes"]], titulo: "Questão",
    sub: `${esc(TRILHAS[q.t]?.nome || q.t)} · ${q.tema ? linkTema(q.tema) : esc(q.a)}${q.subtema ? " · " + esc(nomeSubtema(q.tema, q.subtema) || "") : ""} · fonte: ${esc(q.fonte || q.src)}${q.ano ? " · " + q.ano : ""}${q.prova ? " · " + esc(q.prova) : ""}`,
    html: `${htmlPlayer()}
      <h2 class="sec">Histórico de tentativas</h2>${tabela([{ t: "Quando" }, { t: "Sua resposta" }, { t: "Resultado" }, { t: "Tempo", num: 1 }, { t: "Origem" }], hist, { vaziaMsg: "Nenhuma tentativa ainda." })}
      ${E ? `<h2 class="sec">No caderno de erros</h2><p>${pill(E.status === "aberto" ? "aberto" : "resolvido", E.status === "aberto" ? "bad" : "ok")} Errou ${E.n}× · motivo: ${esc(E.motivo || E.motivoSugerido + " (sugerido)")} · próxima revisão ${dataBR(E.srs?.prox)}</p><button class="btn sec mini" data-act="erro-detalhe" data-q="${esc(id)}">Editar registro do erro</button>` : ""}`,
    ctx: { questao: id, tema: q.tema },
  };
});

/* ---------- Caderno de erros ---------- */
const FE = { status: "aberto", tema: "", motivo: "" };
function tabelaErros(errs) {
  return tabela([{ t: "Questão" }, { t: "Tema" }, { t: "Sua resposta" }, { t: "Motivo" }, { t: "Revisão" }, { t: "" }],
    errs.sort((a, b) => (a.srs?.prox || "").localeCompare(b.srs?.prox || "")).map(e => { const q = qPorId(e.qid); if (!q) return null;
      return [`<a href="#/questoes/q/${esc(q.id)}">${esc(q.q.slice(0, 90))}${q.q.length > 90 ? "…" : ""}</a>`, e.tema ? linkTema(e.tema) : esc(q.a), `<span class="small">${esc(q.o[e.resp] ?? "—")}</span>`,
        `<span class="small">${esc(e.motivo || e.motivoSugerido || "—")}${e.motivo ? "" : " <i class='muted'>(sugerido)</i>"}</span>`, e.status === "aberto" ? `${dataBR(e.srs?.prox)} ${vencido(e.srs) ? pill("vencida", "bad") : ""}` : pill("resolvido", "ok"),
        `<button class="btn mini sec" data-act="erro-detalhe" data-q="${esc(q.id)}">Abrir</button>`]; }).filter(Boolean), { vaziaMsg: "Nenhum erro com esses filtros." });
}
rota("/erros", () => {
  const todos = Object.values(store.doc("erros").itens).filter(e => qPorId(e.qid));
  const lista = todos.filter(e => (!FE.status || e.status === FE.status) && (!FE.tema || e.tema === FE.tema) && (!FE.motivo || (e.motivo || "") === FE.motivo));
  const venc = todos.filter(e => e.status === "aberto" && vencido(e.srs));
  const porTema = listaPor(Object.fromEntries(Object.entries(porChave(todos.filter(e => e.status === "aberto"), e => e.tema || "—")).map(([k, v]) => [k, { n: v.length, ac: 0 }]))).sort((a, b) => b.n - a.n).slice(0, 6);
  return {
    secao: "questoes", crumbs: [["Questões", "#/questoes"]], titulo: "Caderno de erros", sub: `${todos.filter(e => e.status === "aberto").length} abertos · ${todos.filter(e => e.status === "resolvido").length} resolvidos. Toda questão errada entra aqui automaticamente, com revisão em 1 dia.`,
    acoes: venc.length ? `<a class="btn" href="#/revisoes/erros">Refazer ${venc.length} vencidas</a>` : "",
    html: `${abas([["banco", "Banco"], ["erros", "Caderno de erros"]], "erros", "ir-aba-q")}
      ${porTema.length ? `<p class="small">Temas com mais erros abertos: ${porTema.map(x => `${linkTema(x.k)} (${x.n})`).join(" · ")}</p>` : ""}
      <div class="campos" style="margin-bottom:12px">
        <label class="campo"><span class="lab">Status</span><select data-chg="fe" data-c="status">${opcoes([["aberto", "Abertos"], ["resolvido", "Resolvidos"]], FE.status, "Todos")}</select></label>
        <label class="campo"><span class="lab">Tema</span><select data-chg="fe" data-c="tema">${opcoes(ordenarPt(unicos(todos.map(e => e.tema)).filter(Boolean), nomeTema).map(t => [t, nomeTema(t)]), FE.tema, "Todos")}</select></label>
        <label class="campo"><span class="lab">Motivo</span><select data-chg="fe" data-c="motivo">${opcoes(MOTIVOS.map(m => [m, m]), FE.motivo, "Todos")}</select></label></div>
      ${todos.length ? tabelaErros(lista) : vazio("Nenhum erro registrado ainda. Quando você errar uma questão, ela aparece aqui com revisão programada.", `<a class="btn" href="#/questoes">Praticar questões</a>`)}`,
  };
});
MUDANCAS.fe = el => { FE[el.dataset.c] = el.value; atualizar(); };
ACOES["erro-detalhe"] = el => {
  const e = store.doc("erros").itens[el.dataset.q], q = qPorId(el.dataset.q); if (!e || !q) return;
  abrirFolha(`<h2 class="sec">Registro do erro</h2><p class="leitura" style="margin:0 0 8px">${esc(q.q)}</p>
    <p class="small">Sua resposta: <b style="color:var(--bad)">${esc(q.o[e.resp] ?? "—")}</b><br>Correta: <b style="color:var(--ok)">${esc(q.o[q.c])}</b></p><p class="small muted">${esc(q.e || "")}</p>
    <form class="pilha" data-form="erro-salvar" data-q="${esc(q.id)}">
      <label class="campo"><span class="lab">Motivo (sugerido: ${esc(e.motivoSugerido || "—")})</span><select id="er-mot">${opcoes(MOTIVOS.map(m => [m, m]), e.motivo, "Selecione")}</select></label>
      <label class="campo"><span class="lab">Comentário pessoal</span><textarea id="er-com" rows="3" placeholder="O que eu confundi? Como lembrar?">${esc(e.coment || "")}</textarea></label>
      <div class="linha"><button class="btn">Salvar</button>${e.card ? pill("flashcard criado", "ok") : `<button class="btn sec" type="button" data-act="erro-card" data-q="${esc(q.id)}">Gerar flashcard</button>`}
      <button class="btn sec" type="button" data-act="erro-refazer" data-q="${esc(q.id)}">Refazer agora</button>
      <button class="btn sec" type="button" data-act="erro-status" data-q="${esc(q.id)}">${e.status === "aberto" ? "Marcar resolvido" : "Reabrir"}</button></div>
      <p class="small muted">Próxima revisão: ${dataBR(e.srs?.prox)} · errou ${e.n}×</p></form>`);
};
FORMS["erro-salvar"] = f => { const E = store.doc("erros"), e = E.itens[f.dataset.q]; e.motivo = $("#er-mot").value || null; e.coment = $("#er-com").value; store.mudou("erros"); fecharFolha(); toast("Erro atualizado"); atualizar(); };
ACOES["erro-card"] = el => { const E = store.doc("erros"), q = qPorId(el.dataset.q); const e = E.itens[q.id]; const com = e.coment ? `\n\nMinha nota: ${e.coment}` : "";
  e.card = criarCard({ frente: q.q, verso: `${q.o[q.c]}\n\n${q.e || ""}${com}`.trim(), tema: q.tema, subtema: q.subtema, origem: "erro", ref: q.id, dif: q.dif || 2 }); store.mudou("erros"); fecharFolha(); toast("Flashcard criado a partir do erro"); atualizar(); };
ACOES["erro-refazer"] = el => { fecharFolha(); iniciarPlayer("banco", [el.dataset.q], "erro"); PL.rotulo = "Refazendo questão do caderno de erros"; ir("#/questoes"); };
ACOES["erro-status"] = el => { const E = store.doc("erros"), e = E.itens[el.dataset.q]; e.status = e.status === "aberto" ? "resolvido" : "aberto"; if (e.status === "aberto") e.srs = agendar(e.srs, 0); store.mudou("erros"); fecharFolha(); atualizar(); };
