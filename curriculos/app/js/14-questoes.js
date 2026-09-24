/* ============================================================
   14-questoes — banco de questões (filtros completos), página da questão
   com histórico de tentativas, e caderno de erros.
   ============================================================ */
const FQ = { trilha: "", area: "", inst: "", periodo: "", disc: "", esp: "", tema: "", subtema: "", dif: "", fonte: "", ano: "", prova: "", status: [], texto: "" };
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
    if (F.area && q.ae !== F.area) return false;
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
function formFiltros(F, prefixo = "fq", { rapidos = false } = {}) {
  const base0 = questoes().filter(q => !F.trilha || (F.trilha === "med" ? TRILHAS[q.t]?.dominio === "medicina" : q.t === F.trilha));
  const areasL = ENEM_AREAS.filter(a => base0.some(q => q.ae === a.id)), base = F.area ? base0.filter(q => q.ae === F.area) : base0;
  const discs = ordenarPt(unicos(base.map(q => q.disc))), temasL = ordenarPt(unicos(base.map(q => q.tema)).filter(t => TEMAS[t]), nomeTema);
  const espL = ordenarPt(unicos(base.flatMap(q => [q.esp, ...(TEMAS[q.tema]?.especialidades || [])])).filter(e => ESPECIALIDADES[e]), e => ESPECIALIDADES[e].nome);
  const anos = unicos(base.map(q => q.ano)).sort(), provas = unicos(base.map(q => q.prova)), fontes = unicos(base.map(q => q.fonte || q.src));
  const sel = (c, lab, itens, vazioTxt = "Todas") => `<label class="campo"><span class="lab">${lab}</span><select data-chg="${prefixo}" data-c="${c}">${opcoes(itens, F[c], vazioTxt)}</select></label>`;
  return `<div class="campos">
    ${rapidos ? "" : sel("trilha", "Trilha", [["med", "Medicina (graduação + residência)"], ...Object.entries(TRILHAS).map(([k, v]) => [k, v.nome])])}
    ${sel("inst", "Instituição (via grade)", instituicoes().map(i => [i.id, i.sigla]))}
    ${sel("periodo", "Período", Array.from({ length: 12 }, (_, i) => [i + 1, i + 1 + "º"]), "Todos")}
    ${areasL.length ? sel("area", "Área do conhecimento (ENEM)", areasL.map(a => [a.id, a.nome])) : ""}
    ${sel("disc", "Disciplina", discs.map(d => [d, d]))}
    ${sel("esp", "Especialidade", espL.map(e => [e, ESPECIALIDADES[e].nome]))}
    ${sel("tema", "Tema", temasL.map(t => [t, nomeTema(t)]), "Todos")}
    ${F.tema ? sel("subtema", "Subtema", (TEMAS[F.tema]?.subtemas || []).map(s => [s.id, s.nome]), "Todos") : ""}
    ${sel("dif", "Nível", Object.entries(DIFICULDADE), "Todos")}
    ${sel("fonte", "Fonte", fontes.map(f => [f, { autoral: "Autoral (banco do app)", ia: "Gerada por IA", minha: "Minhas" }[f] || f]))}
    ${anos.length ? sel("ano", "Ano", anos.map(a => [a, a]), "Todos") : ""}${provas.length ? sel("prova", "Prova", provas.map(p => [p, p])) : ""}
    <label class="campo"><span class="lab">Texto</span><input type="search" value="${esc(F.texto)}" data-inp="${prefixo}-txt" placeholder="Palavra no enunciado"></label></div>
    ${rapidos ? "" : `<div style="margin-top:10px"><span class="lab">Status</span><div class="chips">${STATUS_Q.map(([k, t]) => `<button class="chip" data-act="${prefixo}-st" data-v="${k}" aria-pressed="${F.status.includes(k)}">${t}</button>`).join("")}</div></div>`}
    ${F.inst && !temasDaInstituicao(F.inst).size ? `<p class="aviso" style="margin-top:10px">A instituição escolhida não tem matriz importada com temas vinculados (${PENDENTE}). Nenhuma questão pode ser associada a ela ainda.</p>` : ""}`;
}
MUDANCAS.fq = el => { FQ[el.dataset.c] = el.value; if (el.dataset.c === "tema") FQ.subtema = ""; if (el.dataset.c === "trilha") Object.assign(FQ, { area: "", disc: "", tema: "", subtema: "", esp: "" }); if (el.dataset.c === "area") Object.assign(FQ, { disc: "", tema: "", subtema: "" }); atualizar(); };
ENTRADAS["fq-txt"] = el => { FQ.texto = el.value; atualizar(); const i = document.querySelector('[data-inp="fq-txt"]'); if (i) { i.focus(); i.setSelectionRange(i.value.length, i.value.length); } };
ACOES["fq-st"] = el => { QPAG = 20; const k = el.dataset.v; FQ.status = FQ.status.includes(k) ? FQ.status.filter(x => x !== k) : [...FQ.status, k]; atualizar(); };
ACOES["fq-limpar"] = () => { Object.assign(FQ, { trilha: "", area: "", inst: "", periodo: "", disc: "", esp: "", tema: "", subtema: "", dif: "", fonte: "", ano: "", prova: "", status: [], texto: "" }); atualizar(); };

let QPAG = 20;
const TRILHAS_RAPIDAS = [["", "Todas"], ["med", "Medicina"], ["enem", "ENEM"], ["direito", "Direito"], ["oab", "OAB"]];
const STATUS_RAPIDOS = [["nao", "Não respondidas"], ["incorreta", "Erradas"], ["marcada", "Marcadas"], ["revisar", "Revisar"]];
rota("/questoes", () => {
  if (playerAtivo("banco")) return { secao: "questoes", crumbs: [["Questões", "#/questoes"]], titulo: PL.rotulo || "Praticando", html: htmlPlayer(), ctx: { questao: PL.ids[PL.i], tema: qPorId(PL.ids[PL.i])?.tema } };
  const qs = filtrarQuestoes(FQ), extras = Object.entries(FQ).filter(([k, v]) => !["trilha", "status", "texto", "dif", ...(FQ.trilha === "enem" ? ["area", "disc"] : [])].includes(k) && v).length;
  return {
    secao: "questoes", titulo: "Questões", sub: `${qs.length} de ${questoes().length}`,
    html: `${abas([["banco", "Banco"], ["erros", "Caderno de erros"]], "banco", "ir-aba-q")}
      <div class="pilha">
        ${chips(TRILHAS_RAPIDAS, FQ.trilha, "fq-trilha")}
        ${FQ.trilha === "enem" ? chipsEnem() : ""}
        ${chipsNivel()}
        <details class="filtros" ${extras || FQ.status.length ? "open" : ""} style="margin:0"><summary>Mais filtros${extras + FQ.status.length ? ` (${extras + FQ.status.length})` : ""}</summary><div style="margin-top:10px">
          <span class="lab">Situação</span><div class="chips" style="margin:4px 0 12px">${STATUS_RAPIDOS.map(([k, t]) => `<button class="chip" data-act="fq-st" data-v="${k}" aria-pressed="${FQ.status.includes(k)}">${t}</button>`).join("")}</div>${formFiltros(FQ, "fq", { rapidos: true })}</div>${extras || FQ.status.length || FQ.trilha ? `<div class="acoes"><button class="btn sec mini" data-act="fq-limpar">Limpar tudo</button></div>` : ""}</details>
        ${qs.length ? `<div class="linha"><button class="btn" data-act="praticar-filtro">Praticar ${Math.min(qs.length, 20)}</button><button class="btn sec" data-act="sim-do-filtro">Fazer simulado</button></div>` : ""}
      </div>
      ${listaQuestoes(qs, QPAG, true)}`,
  };
});
ACOES["lq-mais"] = () => { QPAG += 20; atualizar(); };
ACOES["fq-trilha"] = el => { FQ.trilha = el.dataset.v; Object.assign(FQ, { area: "", disc: "", tema: "", subtema: "", esp: "" }); QPAG = 20; atualizar(); };
/** ENEM: área do conhecimento e, dentro dela, a disciplina (História, Geografia…), com a contagem de questões. */
function chipsEnem() {
  const qs = questoes().filter(q => q.t === "enem"), n = f => qs.filter(f).length;
  const areas = [["", `Todas as áreas (${qs.length})`], ...ENEM_AREAS.map(a => [a.id, `${nomeAreaEnem(a.id)} (${n(q => q.ae === a.id)})`])];
  const discs = FQ.area ? ordenarPt(unicos(qs.filter(q => q.ae === FQ.area).map(q => q.disc))) : [];
  return `<div class="pilha" style="gap:6px"><span class="lab">Área do conhecimento</span>${chips(areas, FQ.area, "fq-area")}
    ${discs.length > 1 ? `<span class="lab">Disciplina</span>${chips([["", "Todas"], ...discs.map(d => [d, `${d} (${n(q => q.ae === FQ.area && q.disc === d)})`])], FQ.disc, "fq-disc")}` : ""}</div>`;
}
/** Nível da questão (Fácil/Média/Difícil), com a contagem dentro dos outros filtros. */
function chipsNivel() {
  const base = filtrarQuestoes({ ...FQ, dif: "" }), n = d => base.filter(q => String(q.dif) === d).length;
  return `<div class="pilha" style="gap:6px"><span class="lab">Nível da questão</span>${chips([["", "Todos"], ...Object.entries(DIFICULDADE).map(([d, t]) => [d, `${t} (${n(d)})`])], FQ.dif, "fq-nivel")}</div>`;
}
ACOES["fq-nivel"] = el => { FQ.dif = el.dataset.v; QPAG = 20; atualizar(); };
ACOES["fq-area"] = el => { FQ.area = el.dataset.v; Object.assign(FQ, { disc: "", tema: "", subtema: "" }); QPAG = 20; atualizar(); };
ACOES["fq-disc"] = el => { FQ.disc = el.dataset.v; Object.assign(FQ, { tema: "", subtema: "" }); QPAG = 20; atualizar(); };
ACOES["ir-aba-q"] = el => ir(el.dataset.v === "erros" ? "#/erros" : "#/questoes");
function praticar(ids, rotulo) { iniciarPlayer("banco", ids, "pratica"); PL.rotulo = rotulo || "Praticando"; ir("#/questoes"); }
ACOES["praticar-filtro"] = () => { const qs = filtrarQuestoes(FQ); const pri = qs.filter(q => statusQ(q).chave === "nao"); praticar(embaralhar(pri.length >= 10 ? pri : qs).slice(0, 20).map(q => q.id), "Praticando questões filtradas"); };
ACOES["praticar-ids"] = el => praticar(embaralhar(el.dataset.ids.split(",").filter(qPorId)).slice(0, 40), "Praticando: " + (el.dataset.ctx || "seleção"));

/* ---------- Página de uma questão ---------- */
rota("/questoes/q/:id", ({ id }) => {
  const q = qPorId(id); if (!q) return paginaNaoEncontrada();
  if (!playerAtivo("q:" + id)) iniciarPlayer("q:" + id, [id], "pratica");
  const p = progDe(q), E = store.doc("erros").itens[id];
  const hist = (p?.h || []).slice().reverse().map(h => [new Date(h[0]).toLocaleString("pt-BR"), h[1] == null ? "—" : esc(q.o[h[1]] || "—"), h[2] ? pill("certa", "ok") : pill("errada", "bad"), h[3] ? mmss(h[3]) : "—", esc({ pratica: "prática", tema: "tema", simulado: "simulado", revisao: "revisão", erro: "caderno de erros", v1: "versão anterior" }[h[4]] || h[4] || "")]);
  return {
    secao: "questoes", crumbs: [["Questões", "#/questoes"]], titulo: "Questão",
    sub: `${esc(TRILHAS[q.t]?.nome || q.t)}${q.ae ? " · " + esc(nomeAreaEnem(q.ae)) + (q.disc ? " · " + esc(q.disc) : "") : ""} · ${q.tema ? linkTema(q.tema) : esc(q.a)}${q.subtema ? " · " + esc(nomeSubtema(q.tema, q.subtema) || "") : ""} · fonte: ${esc(q.fonte || q.src)}${q.ano ? " · " + q.ano : ""}${q.prova ? " · " + esc(q.prova) : ""}`,
    html: `${htmlPlayer()}
      <h2 class="sec">Histórico de tentativas</h2>${tabela([{ t: "Quando" }, { t: "Sua resposta" }, { t: "Resultado" }, { t: "Tempo", num: 1 }, { t: "Origem" }], hist, { vaziaMsg: "Nenhuma tentativa ainda." })}
      ${E ? `<h2 class="sec">No caderno de erros</h2><p>${pill(E.status === "aberto" ? "aberto" : "resolvido", E.status === "aberto" ? "bad" : "ok")} Errou ${E.n}× · motivo: ${esc(E.motivo || E.motivoSugerido + " (sugerido)")} · próxima revisão ${dataBR(E.srs?.prox)}</p><button class="btn sec mini" data-act="erro-detalhe" data-q="${esc(id)}">Editar registro do erro</button>` : ""}`,
    ctx: { questao: id, tema: q.tema },
  };
});

/* ---------- Caderno de erros ---------- */
const FE = { status: "aberto", tema: "", motivo: "", agrupar: true };
function tabelaErros(errs) {
  const l = errs.filter(e => qPorId(e.qid)).sort((a, b) => (a.srs?.prox || "").localeCompare(b.srs?.prox || ""));
  if (!l.length) return vazio("Nenhum erro com esses filtros.");
  return `<div class="lista-q">${l.map(e => { const q = qPorId(e.qid);
    return `<a href="#" data-act="erro-detalhe" data-q="${esc(q.id)}"><span class="txt">${esc(q.q)}</span><span class="meta">${e.status === "aberto" ? (vencido(e.srs) ? pill("revisar hoje", "bad") : `<span>revisão ${quando(e.srs?.prox)}</span>`) : pill("resolvido", "ok")}<span>${esc(e.tema ? nomeTema(e.tema) : q.a)}</span><span>${esc(e.motivo || e.motivoSugerido || "")}</span></span></a>`; }).join("")}</div>`;
}
rota("/erros", () => {
  const todos = Object.values(store.doc("erros").itens).filter(e => qPorId(e.qid));
  const lista = todos.filter(e => (!FE.status || e.status === FE.status) && (!FE.tema || e.tema === FE.tema) && (!FE.motivo || (e.motivo || "") === FE.motivo));
  const venc = todos.filter(e => e.status === "aberto" && vencido(e.srs));
  return {
    secao: "questoes", crumbs: [["Questões", "#/questoes"]], titulo: "Caderno de erros", sub: `${todos.filter(e => e.status === "aberto").length} abertos · ${todos.filter(e => e.status === "resolvido").length} resolvidos`,
    acoes: venc.length ? `<a class="btn" href="#/revisoes/erros">Refazer ${venc.length} vencidas</a>` : "",
    html: `${abas([["banco", "Banco"], ["erros", "Caderno de erros"]], "erros", "ir-aba-q")}
      <details class="filtros" ${FE.tema || FE.motivo || FE.status !== "aberto" ? "open" : ""}><summary>Filtrar</summary><div class="campos" style="margin-top:10px">
        <label class="campo"><span class="lab">Status</span><select data-chg="fe" data-c="status">${opcoes([["aberto", "Abertos"], ["resolvido", "Resolvidos"]], FE.status, "Todos")}</select></label>
        <label class="campo"><span class="lab">Tema</span><select data-chg="fe" data-c="tema">${opcoes(ordenarPt(unicos(todos.map(e => e.tema)).filter(Boolean), nomeTema).map(t => [t, nomeTema(t)]), FE.tema, "Todos")}</select></label>
        <label class="campo"><span class="lab">Motivo</span><select data-chg="fe" data-c="motivo">${opcoes(MOTIVOS.map(m => [m, m]), FE.motivo, "Todos")}</select></label></div></details>
      ${todos.length ? `${chips([["1", "Por tema"], ["0", "Todas as questões"]], FE.agrupar ? "1" : "0", "fe-vista")}` : ""}
      ${todos.length && FE.agrupar ? `<div class="tarefas">${Object.entries(porChave(lista, e => e.tema || "_sem")).sort((a, b) => b[1].length - a[1].length).map(([tm, es]) => {
        const ab = es.filter(e => e.status === "aberto").length, ve = es.filter(e => e.status === "aberto" && vencido(e.srs)).length;
        return `<div class="tarefa"><div class="o">${tm === "_sem" ? "Sem tema" : linkTema(tm)}<small>${ab ? `${ab} aberto(s)` : "resolvidos"}${ve ? ` · <b style="color:var(--bad)">${ve} para hoje</b>` : ""}</small></div>${ab ? `<a class="btn mini ${ve ? "" : "sec"}" href="#/revisoes/erros/${encodeURIComponent(tm)}">Refazer</a>` : ""}</div>`; }).join("")}</div>`
      : todos.length ? tabelaErros(lista) : vazio("Nenhum erro registrado ainda. Quando você errar uma questão, ela aparece aqui com revisão programada.", `<a class="btn" href="#/questoes">Praticar questões</a>`)}`,
  };
});
MUDANCAS.fe = el => { FE[el.dataset.c] = el.value; atualizar(); };
MUDANCAS["fe-agrupar"] = el => { FE.agrupar = el.checked; atualizar(); };
ACOES["fe-vista"] = el => { FE.agrupar = el.dataset.v === "1"; atualizar(); };
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
