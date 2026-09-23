/* ============================================================
   11-medicina — faculdades, matrizes curriculares, importador,
   comparador de grades e mapa Área → Especialidade → Tema.
   Regra: nunca misturar matrizes de instituições diferentes;
   nada curricular é inventado — sem dado oficial, fica "pendente".
   ============================================================ */
const CRUMB_MED = ["Medicina", "#/medicina"];
const nomeInst = id => instPorId(id)?.sigla || id;

/* ---------- Hub ---------- */
rota("/medicina", () => {
  const P = store.doc("perfil"), insts = instituicoes(), g = P.gradeId && gradePorId(P.gradeId);
  const situacao = i => { const gs = gradesDe(i.id, "medicina").filter(x => itensGrade(x).length); return gs.length ? statusGrade(gs[0]).nome : "matriz pendente"; };
  return {
    secao: "medicina", titulo: "Medicina",
    html: `<div class="faixa"><p>${P.faculdade ? `<b>${esc(nomeInst(P.faculdade))}</b>${P.periodo ? ` · ${P.periodo}º período` : ""}<br><span class="small muted">${g ? esc(g.versao || "matriz") : "matriz ainda não importada"}</span>` : "Escolha sua faculdade e período"}</p>
        <span class="linha">${g ? `<a class="btn mini" href="#/medicina/grade/${esc(g.id)}${P.periodo ? "/p/" + P.periodo : ""}">Meu período</a>` : ""}<button class="btn mini sec" data-act="perfil-fac">${P.faculdade ? "Alterar" : "Escolher"}</button></span></div>
      <section><h2 class="sec">Estudar</h2><div class="links-lista">
        <a href="#/medicina/especialidades"><span>Por especialidade</span><small>${Object.keys(ESPECIALIDADES).length} especialidades · ${Object.values(TEMAS).filter(t => t.dominio === "medicina").length} temas</small></a>
        <a href="#/medicina/comparar"><span>Comparar grades</span><small>UFAM × UEA × outras</small></a>
        <a href="#/medicina/importar"><span>Importar matriz curricular</span><small>PDF, planilha ou texto</small></a></div></section>
      <section><h2 class="sec">Faculdades <button class="btn sec mini" data-act="nova-inst">+ Adicionar</button></h2><div class="links-lista">
        ${insts.map(i => `<a href="#/medicina/inst/${esc(i.id)}"><span>${esc(i.sigla)}${i.id === P.faculdade ? " " + pill("minha", "azul") : ""}</span><small>${esc(situacao(i))}</small></a>`).join("")}</div>
        <p class="small muted">Cada faculdade tem a própria matriz. Sem documento oficial, os dados curriculares ficam pendentes.</p></section>`,
  };
});
ACOES["perfil-fac"] = () => {
  const P = store.doc("perfil"), insts = instituicoes(), gradesP = P.faculdade ? gradesDe(P.faculdade) : [];
  abrirFolha(`<form class="pilha" data-form="perfil-fac"><div class="campos">
    <label class="campo"><span class="lab">Instituição</span><select id="pf-inst" data-chg="pf-inst">${opcoes(insts.map(i => [i.id, i.sigla]), P.faculdade, "Selecione")}</select></label>
    <label class="campo"><span class="lab">Matriz (versão)</span><select id="pf-grade">${opcoes(gradesP.map(g => [g.id, g.versao || g.id]), P.gradeId, gradesP.length ? "Selecione" : "Nenhuma cadastrada")}</select></label>
    <label class="campo"><span class="lab">Período atual</span><input type="number" id="pf-per" min="1" max="12" value="${P.periodo || ""}"></label></div>
    <button class="btn">Salvar</button></form>`, { titulo: "Minha faculdade" });
};
MUDANCAS["pf-inst"] = el => { const gs = gradesDe(el.value); $("#pf-grade").innerHTML = opcoes(gs.map(g => [g.id, g.versao || g.id]), gs[0]?.id, gs.length ? "Selecione" : "Nenhuma cadastrada"); };
FORMS["perfil-fac"] = () => {
  const P = store.doc("perfil"); P.faculdade = $("#pf-inst").value || null; P.gradeId = $("#pf-grade").value || null;
  const n = parseInt($("#pf-per").value, 10); P.periodo = n >= 1 && n <= 12 ? n : null; store.mudou("perfil"); fecharFolha(); toast("Faculdade salva"); atualizar();
};
ACOES["nova-inst"] = () => abrirFolha(`<h2 class="sec">Adicionar faculdade</h2><form class="pilha" data-form="nova-inst">
  <label class="campo"><span class="lab">Sigla</span><input type="text" id="ni-sigla" required maxlength="20"></label>
  <label class="campo"><span class="lab">Nome completo</span><input type="text" id="ni-nome" maxlength="120"></label>
  <label class="campo"><span class="lab">Cidade/UF</span><input type="text" id="ni-cid" maxlength="60"></label>
  <button class="btn">Adicionar</button></form>`);
FORMS["nova-inst"] = () => {
  const sigla = $("#ni-sigla").value.trim(); if (!sigla) return;
  const id = slug(sigla); if (instPorId(id)) { toast("Essa faculdade já existe"); return; }
  const I = store.doc("instituicoes"); I.itens[id] = { id, sigla, nome: $("#ni-nome").value.trim() || null, cidade: $("#ni-cid").value.trim() || null, cursos: ["medicina"], usuario: true };
  store.mudou("instituicoes"); fecharFolha(); ir("#/medicina/inst/" + id);
};

/* ---------- Instituição ---------- */
rota("/medicina/inst/:id", ({ id }) => {
  const i = instPorId(id); if (!i) return paginaNaoEncontrada();
  const gs = gradesDe(id);
  return {
    secao: "medicina", crumbs: [CRUMB_MED], titulo: i.sigla, sub: esc([i.nome, i.cidade].filter(Boolean).join(" · ")),
    acoes: `<a class="btn" href="#/medicina/importar/${esc(id)}">Importar matriz</a>`,
    html: `${gs.some(g => itensGrade(g).length) ? "" : `<div class="aviso">${PENDENTE}: a matriz oficial de ${esc(i.sigla)} ainda não foi importada. Nada curricular é exibido até lá.</div>`}
    <h2 class="sec">Matrizes curriculares</h2>
    ${tabela([{ t: "Curso" }, { t: "Versão" }, { t: "Períodos", num: 1 }, { t: "Disciplinas/módulos", num: 1 }, { t: "Situação" }, { t: "Fonte" }],
      gs.map(g => [esc(CURSOS[g.curso] || g.curso), `<a href="#/medicina/grade/${esc(g.id)}">${esc(g.versao || "sem versão")}</a>`, (g.periodos || []).length, itensGrade(g).length, pill(itensGrade(g).length ? statusGrade(g).nome : PENDENTE, itensGrade(g).length ? statusGrade(g).cls : "warn"), g.fonte?.ref ? `<span class="small">${esc(g.fonte.titulo || g.fonte.tipo || "")} ${/^https?:/.test(g.fonte.ref) ? `<a href="${esc(g.fonte.ref)}" target="_blank" rel="noopener">abrir</a>` : esc(g.fonte.ref)}</span>` : "—"]),
      { vaziaMsg: "Nenhuma matriz cadastrada." })}
    ${(i.fontes || []).length ? `<h2 class="sec">Documentos oficiais para importar</h2><p class="small muted">Localizados em busca, ainda não lidos pelo app. Baixe o PDF e use "Importar matriz".</p>${tabela([{ t: "Documento" }, { t: "" }], i.fontes.map((f, k) => [`<a href="${esc(f.url)}" target="_blank" rel="noopener">${esc(f.titulo)}</a>${f.obs ? `<br><span class="small muted">${esc(f.obs)}</span>` : ""}`, `<button class="btn mini" data-act="imp-fonte" data-inst="${esc(id)}" data-k="${k}">Importar este documento</button>`]))}
    <p class="small muted">Passo a passo: abra o link → baixe o PDF da matriz → "Importar este documento" → envie o PDF → revise → confira item a item → marque como validada.</p>` : ""}
    <div class="acoes"><button class="btn sec" data-act="grade-vazia" data-inst="${esc(id)}">Cadastrar matriz manualmente</button></div>`,
    ctx: { texto: "Instituição: " + (i.nome || i.sigla) },
  };
});
ACOES["imp-fonte"] = el => {
  const f = instPorId(el.dataset.inst).fontes[+el.dataset.k], ver = (f.titulo.match(/\b(20\d\d(?:\/\d)?)\b/) || [])[1] || "";
  Object.assign(IMP, { inst: el.dataset.inst, curso: "medicina", versao: ver, fonteTipo: "pdf", fonteRef: f.url, texto: "", linhas: [], msg: "Fonte preenchida. Baixe o PDF no link oficial e envie o arquivo abaixo." });
  ir("#/medicina/importar/" + el.dataset.inst);
};
ACOES["grade-vazia"] = el => abrirFolha(`<h2 class="sec">Nova matriz (cadastro manual)</h2><form class="pilha" data-form="grade-vazia" data-inst="${esc(el.dataset.inst)}">
  <label class="campo"><span class="lab">Curso</span><select id="gv-curso">${opcoes(Object.entries(CURSOS), "medicina")}</select></label>
  <label class="campo"><span class="lab">Versão / ano da matriz</span><input type="text" id="gv-versao" required placeholder="ex.: PPC 2025/2"></label>
  <label class="campo"><span class="lab">Número de períodos</span><input type="number" id="gv-n" min="1" max="14" value="12"></label>
  <label class="campo"><span class="lab">Fonte (documento/URL de onde virão os dados)</span><input type="text" id="gv-fonte"></label>
  <button class="btn">Criar</button></form>`);
FORMS["grade-vazia"] = f => {
  const inst = f.dataset.inst, versao = $("#gv-versao").value.trim(), n = Math.max(1, Math.min(14, +$("#gv-n").value || 12));
  const g = { id: `${inst}-${$("#gv-curso").value}-${slug(versao)}`, instituicao: inst, curso: $("#gv-curso").value, versao, status: "pendente",
    fonte: { tipo: "manual", ref: $("#gv-fonte").value.trim() || null }, periodos: Array.from({ length: n }, (_, k) => ({ numero: k + 1, nome: `${k + 1}º período`, itens: [] })) };
  if (gradePorId(g.id)) { toast("Já existe uma matriz com essa versão"); return; }
  salvarGrade(g); fecharFolha(); ir("#/medicina/grade/" + g.id);
};

/* ---------- Matriz ---------- */
function crumbsGrade(g) { return [CRUMB_MED, [nomeInst(g.instituicao), "#/medicina/inst/" + g.instituicao], [g.versao || "Matriz", "#/medicina/grade/" + g.id]]; }
rota("/medicina/grade/:g", ({ g: gid }) => {
  const g = gradePorId(gid); if (!g) return paginaNaoEncontrada();
  const st = statusGrade(g), ch = chTotal(g);
  const linhas = (g.periodos || []).map(p => { const it = p.itens || []; const chs = it.filter(x => typeof x.ch === "number");
    return [`<a href="#/medicina/grade/${esc(g.id)}/p/${p.numero}">${esc(p.nome || p.numero + "º período")}</a>`, it.length, chs.length ? chs.reduce((s, x) => s + x.ch, 0) + " h" + (chs.length < it.length ? "*" : "") : "—", unicos(it.flatMap(temasDoItem)).length]; });
  return {
    secao: "medicina", crumbs: crumbsGrade(g).slice(0, 2), titulo: `${nomeInst(g.instituicao)} — ${CURSOS[g.curso] || g.curso} (${g.versao || "sem versão"})`,
    sub: `${pill(st.nome, st.cls)} ${g.fonte?.ref ? `Fonte: ${esc(g.fonte.titulo || g.fonte.ref)}` : "Fonte não informada"}${g.atualizado ? ` · atualizada em ${dataBR(g.atualizado)}` : ""}`,
    acoes: `${g.status !== "validado" && itensGrade(g).length ? `<a class="btn" href="#/medicina/grade/${esc(g.id)}/conferir">Conferir com o documento (${itensGrade(g).filter(i => i.conferido).length}/${itensGrade(g).length})</a>` : ""}<a class="btn sec" href="#/medicina/importar/${esc(g.instituicao)}">Reimportar</a>`,
    html: `${itensGrade(g).length ? "" : `<div class="aviso">${PENDENTE}. Importe o documento oficial ou cadastre as disciplinas manualmente em cada período.</div>`}
      ${g.observacoes ? `<p class="aviso info">${esc(g.observacoes)}</p>` : ""}
      <div class="kpis"><div class="kpi"><b>${(g.periodos || []).length}</b><span>períodos</span></div><div class="kpi"><b>${ch.itens}</b><span>disciplinas/módulos</span></div><div class="kpi"><b>${ch.conhecidas ? ch.total + " h" : "—"}</b><span>carga horária conhecida${ch.conhecidas < ch.itens ? ` (${ch.itens - ch.conhecidas} pendentes)` : ""}</span></div></div>
      ${tabela([{ t: "Período" }, { t: "Itens", num: 1 }, { t: "CH", num: 1 }, { t: "Temas vinculados", num: 1 }], linhas, { vaziaMsg: "Sem períodos." })}
      ${ch.conhecidas < ch.itens ? `<p class="small muted">* soma apenas das cargas horárias informadas.</p>` : ""}
      <div class="acoes">${g.origem !== "base" ? `<button class="btn sec perigo" data-act="grade-excluir" data-g="${esc(g.id)}">Excluir matriz</button>` : ""}</div>`,
    ctx: { grade: g.id },
  };
});
ACOES["grade-validar"] = el => { const g = gradePorId(el.dataset.g); if (itensGrade(g).some(i => !i.conferido)) { toast("Confira todos os itens antes de validar"); return; }
  g.status = "validado"; g.validadoEm = new Date().toISOString(); salvarGrade(g); toast("Matriz validada"); ir("#/medicina/grade/" + g.id); };
rota("/medicina/grade/:g/conferir", ({ g: gid }) => {
  const g = gradePorId(gid); if (!g) return paginaNaoEncontrada();
  const it = itensGrade(g), ok = it.filter(i => i.conferido).length;
  return { secao: "medicina", crumbs: crumbsGrade(g), titulo: "Conferir com o documento oficial",
    sub: `Compare cada linha com ${g.fonte?.ref ? (/^https?:/.test(g.fonte.ref) ? `<a href="${esc(g.fonte.ref)}" target="_blank" rel="noopener">o documento de origem</a>` : esc(g.fonte.ref)) : "o documento oficial"}. Corrija o que estiver diferente e marque como conferido.`,
    html: `<div class="kpis"><div class="kpi"><b>${ok}/${it.length}</b><span>itens conferidos</span>${medidor(pct(ok, it.length), "ok")}</div></div>
      ${(g.periodos || []).map(p => `<h2 class="sec">${esc(p.nome || p.numero + "º período")} <button class="btn mini sec" data-act="conf-periodo" data-g="${esc(g.id)}" data-p="${p.numero}">Marcar período como conferido</button></h2>
        <div class="tabela-wrap"><table><thead><tr><th>Ok</th><th>Tipo</th><th>Nome (como no documento)</th><th class="num">CH</th></tr></thead><tbody>${(p.itens || []).map(x => `<tr>
          <td><input type="checkbox" data-chg="conf-item" data-g="${esc(g.id)}" data-i="${esc(x.id)}" data-c="conferido" ${x.conferido ? "checked" : ""} aria-label="Conferido: ${esc(x.nome)}" style="width:20px;height:20px;accent-color:var(--ok)"></td>
          <td><select data-chg="conf-item" data-g="${esc(g.id)}" data-i="${esc(x.id)}" data-c="tipo" aria-label="Tipo">${opcoes([["disciplina", "Disciplina"], ["modulo", "Módulo"]], x.tipo)}</select></td>
          <td><input type="text" value="${esc(x.nome)}" data-chg="conf-item" data-g="${esc(g.id)}" data-i="${esc(x.id)}" data-c="nome" style="min-width:200px;width:100%" aria-label="Nome"></td>
          <td class="num"><input type="number" min="0" value="${x.ch ?? ""}" data-chg="conf-item" data-g="${esc(g.id)}" data-i="${esc(x.id)}" data-c="ch" style="width:80px" aria-label="Carga horária"></td></tr>`).join("") || `<tr><td colspan="4" class="muted">Sem itens.</td></tr>`}</tbody></table></div>`).join("")}
      <div class="acoes"><button class="btn azul" data-act="grade-validar" data-g="${esc(g.id)}" ${ok === it.length && it.length ? "" : "disabled"}>Marcar matriz como validada</button><span class="small muted">${ok === it.length ? "Tudo conferido." : `Faltam ${it.length - ok} itens.`}</span></div>`,
    ctx: { grade: g.id } };
});
MUDANCAS["conf-item"] = el => editarItem(el.dataset.g, el.dataset.i, it => { const c = el.dataset.c;
  if (c === "conferido") it.conferido = el.checked; else if (c === "ch") it.ch = el.value === "" ? null : +el.value; else if (c === "nome") it.nome = el.value.trim() || it.nome; else it[c] = el.value;
  if (c !== "conferido") it.conferido = false; });
ACOES["conf-periodo"] = el => { const g = gradePorId(el.dataset.g), p = g.periodos.find(x => String(x.numero) === el.dataset.p); (p.itens || []).forEach(x => { x.conferido = true; }); salvarGrade(g); atualizar(); };
ACOES["grade-excluir"] = el => abrirFolha(`<h2 class="sec">Excluir matriz?</h2><p>Os temas, questões e o seu desempenho não são apagados — só esta matriz.</p><button class="btn perigo" data-act="grade-excluir-ok" data-g="${esc(el.dataset.g)}">Excluir</button>`);
ACOES["grade-excluir-ok"] = el => { const G = store.doc("grades"); const inst = G.itens[el.dataset.g]?.instituicao; delete G.itens[el.dataset.g]; store.mudou("grades"); fecharFolha(); ir("#/medicina/inst/" + (inst || "")); };

rota("/medicina/grade/:g/p/:n", ({ g: gid, n }) => {
  const g = gradePorId(gid); if (!g) return paginaNaoEncontrada();
  const p = (g.periodos || []).find(x => String(x.numero) === n); if (!p) return paginaNaoEncontrada();
  const linhas = (p.itens || []).map(it => [pill(it.tipo === "modulo" ? "Módulo" : "Disciplina"), `<a href="#/medicina/grade/${esc(g.id)}/item/${esc(it.id)}">${esc(it.nome)}</a>${it.codigo ? ` <span class="small muted">${esc(it.codigo)}</span>` : ""}`, typeof it.ch === "number" ? it.ch + " h" : `<span class="small muted">pendente</span>`, temasDoItem(it).length]);
  return {
    secao: "medicina", crumbs: crumbsGrade(g), titulo: p.nome || `${p.numero}º período`,
    html: `${tabela([{ t: "Tipo" }, { t: "Disciplina/módulo" }, { t: "CH", num: 1 }, { t: "Temas", num: 1 }], linhas, { vaziaMsg: `Nenhuma disciplina/módulo cadastrado neste período. ${PENDENTE}.` })}
      <details class="filtros" style="margin-top:12px"><summary>Adicionar disciplina/módulo manualmente</summary>
      <form class="campos" data-form="item-novo" data-g="${esc(g.id)}" data-p="${p.numero}" style="margin-top:10px">
        <label class="campo"><span class="lab">Tipo</span><select id="in-tipo"><option value="disciplina">Disciplina</option><option value="modulo">Módulo</option></select></label>
        <label class="campo"><span class="lab">Nome (como no documento)</span><input type="text" id="in-nome" required></label>
        <label class="campo"><span class="lab">Código</span><input type="text" id="in-cod"></label>
        <label class="campo"><span class="lab">CH (horas, se constar)</span><input type="number" id="in-ch" min="0" max="5000"></label>
        <button class="btn" style="align-self:end">Adicionar</button></form></details>`,
    ctx: { grade: g.id, periodo: p.numero },
  };
});
FORMS["item-novo"] = f => {
  const g = gradePorId(f.dataset.g), p = g.periodos.find(x => String(x.numero) === f.dataset.p), nome = $("#in-nome").value.trim(); if (!nome) return;
  const ch = $("#in-ch").value === "" ? null : +$("#in-ch").value;
  p.itens = p.itens || []; p.itens.push({ id: slug(nome) + "-" + Math.random().toString(36).slice(2, 5), tipo: $("#in-tipo").value, codigo: $("#in-cod").value.trim() || null, nome, ch, temas: [], unidades: [] });
  salvarGrade(g); toast("Adicionado"); atualizar();
};

/* ---------- Disciplina / módulo ---------- */
function acharItem(g, iid) { for (const p of g.periodos || []) { const it = (p.itens || []).find(x => x.id === iid); if (it) return { p, it }; } return {}; }
/** Sugestão determinística: temas cujas disciplinas de referência ou nome se parecem com o item. Só sugere; o usuário confirma. */
function sugerirTemas(nome) {
  return Object.values(TEMAS).filter(t => t.dominio === "medicina").map(t => ({ t, s: Math.max(similaridade(nome, t.nome), ...(t.disciplinas || []).map(d => similaridade(nome, d))) }))
    .filter(x => x.s >= 0.5).sort((a, b) => b.s - a.s).slice(0, 12).map(x => x.t.id);
}
rota("/medicina/grade/:g/item/:i", ({ g: gid, i: iid }) => {
  const g = gradePorId(gid); if (!g) return paginaNaoEncontrada();
  const { p, it } = acharItem(g, iid); if (!it) return paginaNaoEncontrada();
  const temas = temasDoItem(it), sug = sugerirTemas(it.nome).filter(t => !temas.includes(t));
  const qs = questoes().filter(q => temas.includes(q.tema));
  return {
    secao: "medicina", crumbs: [...crumbsGrade(g), [p.nome || p.numero + "º período", `#/medicina/grade/${g.id}/p/${p.numero}`]], titulo: it.nome,
    sub: `${pill(it.tipo === "modulo" ? "Módulo" : "Disciplina")} ${it.codigo ? esc(it.codigo) + " · " : ""}${typeof it.ch === "number" ? it.ch + " h" : "Carga horária: " + PENDENTE}`,
    acoes: qs.length ? `<button class="btn" data-act="praticar-ids" data-ids="${qs.map(q => q.id).join(",")}" data-ctx="Disciplina ${esc(it.nome)}">Praticar ${qs.length} questões</button>` : "",
    html: `<h2 class="sec">Temas desta ${it.tipo === "modulo" ? "módulo" : "disciplina"}</h2>
      ${temas.length ? tabela([{ t: "Tema" }, { t: "Questões", num: 1 }, { t: "Acerto", num: 1 }, { t: "" }], temas.map(t => { const d = desempenhoTema(t); return [linkTema(t), d.total, d.n ? pct(d.ac, d.n) + "%" : "—", `<button class="btn mini sec" data-act="item-tema-del" data-g="${esc(g.id)}" data-i="${esc(it.id)}" data-t="${esc(t)}" aria-label="Desvincular">Desvincular</button>`]; })) : vazio("Nenhum tema vinculado. Vincule temas do catálogo para ligar esta disciplina a questões, flashcards, casos e revisões.")}
      <form class="linha" data-form="item-tema" data-g="${esc(g.id)}" data-i="${esc(it.id)}" style="margin-top:10px">${campoTema("it-tema", null, "Vincular tema")}<button class="btn sec" style="align-self:end">Vincular</button></form>
      ${sug.length ? `<h3>Sugestões pelo nome (confirme pela ementa)</h3><div class="chips">${sug.map(t => `<button class="chip" data-act="item-tema-add" data-g="${esc(g.id)}" data-i="${esc(it.id)}" data-t="${esc(t)}">+ ${esc(nomeTema(t))}</button>`).join("")}</div>` : ""}
      ${IA.disponivel() ? `<div class="acoes"><button class="btn sec mini" data-act="item-ia-temas" data-g="${esc(g.id)}" data-i="${esc(it.id)}">Sugerir temas com IA</button></div><div id="item-ia"></div>` : ""}
      <h2 class="sec">Unidades</h2>
      ${(it.unidades || []).length ? tabela([{ t: "Unidade" }, { t: "Temas" }], it.unidades.map(u => [esc(u.nome), (u.temas || []).map(linkTema).join(", ") || "—"])) : `<p class="muted small">Sem unidades cadastradas (só aparecem se constarem na ementa oficial).</p>`}
      <form class="linha" data-form="item-unidade" data-g="${esc(g.id)}" data-i="${esc(it.id)}"><label class="campo" style="flex:1"><span class="lab">Nova unidade</span><input type="text" id="un-nome" required></label><button class="btn sec" style="align-self:end">Adicionar</button></form>
      <details class="filtros" style="margin-top:14px"><summary>Editar dados da ${it.tipo === "modulo" ? "módulo" : "disciplina"}</summary>
        <form class="campos" data-form="item-editar" data-g="${esc(g.id)}" data-i="${esc(it.id)}" style="margin-top:10px">
          <label class="campo"><span class="lab">Nome</span><input type="text" id="ie-nome" value="${esc(it.nome)}" required></label>
          <label class="campo"><span class="lab">Código</span><input type="text" id="ie-cod" value="${esc(it.codigo || "")}"></label>
          <label class="campo"><span class="lab">CH (h)</span><input type="number" id="ie-ch" value="${typeof it.ch === "number" ? it.ch : ""}"></label>
          <button class="btn" style="align-self:end">Salvar</button>
          <button class="btn perigo" type="button" data-act="item-excluir" data-g="${esc(g.id)}" data-i="${esc(it.id)}" style="align-self:end">Excluir</button></form></details>`,
    ctx: { grade: g.id, periodo: p.numero, disciplina: it.nome },
  };
});
function editarItem(gid, iid, f) { const g = gradePorId(gid), { it } = acharItem(g, iid); if (!it) return; f(it, g); salvarGrade(g); atualizar(); }
FORMS["item-tema"] = f => { const t = lerTema("it-tema"); if (!t) { toast("Escolha um tema da lista"); return; } editarItem(f.dataset.g, f.dataset.i, it => { it.temas = unicos([...(it.temas || []), t]); }); };
ACOES["item-tema-add"] = el => editarItem(el.dataset.g, el.dataset.i, it => { it.temas = unicos([...(it.temas || []), el.dataset.t]); });
ACOES["item-tema-del"] = el => editarItem(el.dataset.g, el.dataset.i, it => { it.temas = (it.temas || []).filter(t => t !== el.dataset.t); (it.unidades || []).forEach(u => { u.temas = (u.temas || []).filter(t => t !== el.dataset.t); }); });
FORMS["item-unidade"] = f => { const nome = $("#un-nome").value.trim(); if (nome) editarItem(f.dataset.g, f.dataset.i, it => { (it.unidades = it.unidades || []).push({ id: slug(nome), nome, temas: [], objetivos: [] }); }); };
FORMS["item-editar"] = f => editarItem(f.dataset.g, f.dataset.i, it => { it.nome = $("#ie-nome").value.trim() || it.nome; it.codigo = $("#ie-cod").value.trim() || null; it.ch = $("#ie-ch").value === "" ? null : +$("#ie-ch").value; });
ACOES["item-excluir"] = el => { const g = gradePorId(el.dataset.g), { p } = acharItem(g, el.dataset.i); p.itens = p.itens.filter(x => x.id !== el.dataset.i); salvarGrade(g); ir(`#/medicina/grade/${g.id}/p/${p.numero}`); };
ACOES["item-ia-temas"] = async el => {
  const g = gradePorId(el.dataset.g), { it } = acharItem(g, el.dataset.i), out = $("#item-ia");
  out.innerHTML = `<p class="muted">Consultando…</p>`;
  const catalogo = Object.values(TEMAS).filter(t => t.dominio === "medicina").map(t => `${t.id}: ${t.nome}`).join("\n");
  try {
    const r = await IA.json(`Da lista de temas abaixo, escolha os que provavelmente são ensinados na disciplina/módulo "${it.nome}" (${it.unidades?.map(u => u.nome).join(", ") || "sem ementa informada"}). É só sugestão para o aluno confirmar pela ementa oficial. Use apenas ids da lista.\n${catalogo}`, `{"temas":["id"]}`);
    const ids = (r?.temas || []).filter(t => TEMAS[t] && !temasDoItem(it).includes(t));
    out.innerHTML = ids.length ? `<h3>Sugeridos pela IA (confirme)</h3><div class="chips">${ids.map(t => `<button class="chip" data-act="item-tema-add" data-g="${esc(g.id)}" data-i="${esc(it.id)}" data-t="${esc(t)}">+ ${esc(nomeTema(t))}</button>`).join("")}</div>` : `<p class="muted">Nenhuma sugestão nova.</p>`;
  } catch (e) { out.innerHTML = `<div class="aviso">${IA.mensagemErro(e)}</div>`; }
};

/* ============================================================
   Importador de matriz: PDF, planilha (XLSX/CSV), DOCX, texto, URL (referência) ou manual.
   Pipeline: arquivo → texto → linhas estruturadas (regra ou IA) → revisão → salvar como "importado".
   ============================================================ */
const IMP = { inst: "", curso: "medicina", versao: "", fonteTipo: "pdf", fonteRef: "", texto: "", linhas: [], msg: "", ocupado: false };
const CDN = {
  pdf: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",
  pdfw: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js",
  xlsx: "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js",
  docx: "https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js",
};
async function textoDoArquivo(file) {
  const nome = file.name.toLowerCase();
  if (nome.endsWith(".pdf")) {
    await carregarScript(CDN.pdf); await carregarScript(CDN.pdfw); // worker em modo "fake" (sem fetch externo)
    const pdf = await window.pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise; const out = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const c = await (await pdf.getPage(i)).getTextContent(); const linhas = {};
      c.items.forEach(x => { const y = Math.round(x.transform[5]); (linhas[y] = linhas[y] || []).push([x.transform[4], x.str]); });
      Object.keys(linhas).map(Number).sort((a, b) => b - a).forEach(y => out.push(linhas[y].sort((a, b) => a[0] - b[0]).map(z => z[1]).join(" ").replace(/\s+/g, " ").trim()));
    }
    return out.filter(Boolean).join("\n");
  }
  if (/\.(xlsx|xls|ods)$/.test(nome)) { await carregarScript(CDN.xlsx); const wb = window.XLSX.read(await file.arrayBuffer()); return wb.SheetNames.map(n => window.XLSX.utils.sheet_to_csv(wb.Sheets[n], { FS: ";" })).join("\n"); }
  if (nome.endsWith(".docx")) { await carregarScript(CDN.docx); return (await window.mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() })).value; }
  return file.text();
}
/** Interpretação por regras: cabeçalhos de período, linhas CSV/TSV ou linhas "CÓDIGO Nome ... 60h". */
function interpretarTexto(txt) {
  const linhas = [], rePer = /(?:^|\b)(\d{1,2})\s*[ºo°ª]?\s*(?:per[ií]odo|semestre|termo|s[ée]rie)\b|(?:per[ií]odo|semestre|termo)\s*(\d{1,2})\b/i;
  const ignorar = /^(disciplinas?|componentes? curricular|carga hor[aá]ria|c\.?\s?h\.?|total|subtotal|c[oó]digo|nome|pr[ée]-?requisito|cr[ée]ditos?)\b/i;
  let per = null;
  for (const bruta of String(txt).split(/\r?\n/)) {
    const l = bruta.replace(/\s+/g, " ").trim(); if (!l) continue;
    const campos = l.split(/[;\t|]/).map(s => s.trim());
    if (campos.length >= 3 && /^\d{1,2}$/.test(campos[0])) {
      const [p, tipo, nome, ch] = campos; if (!nome) continue;
      linhas.push({ periodo: +p, tipo: /m[óo]d/i.test(tipo) ? "modulo" : "disciplina", codigo: null, nome, ch: /^\d+$/.test(ch || "") ? +ch : null }); continue;
    }
    const mp = l.match(rePer);
    if (mp && l.length < 50) { per = +(mp[1] || mp[2]); continue; }
    if (ignorar.test(l) || l.length < 4 || /^[\d\s.,h]+$/i.test(l)) continue;
    let resto = l.replace(/\b\d+\.\d+\.\d+\b/g, " "), ch = null, codigo = null; // "4.2.0" = créditos
    const mch = resto.match(/(\d{2,4})\s*(?:h\b|horas\b|h\/a\b|h\.)/i);
    if (mch) { ch = +mch[1]; resto = resto.replace(mch[0], " "); }
    else {
      // Colunas numéricas no fim (CH total, teórica, prática, créditos…): a total é a maior.
      const mt = resto.match(/((?:[\s;,|]+\d{1,4}){1,6})\s*$/);
      let toks = mt ? mt[1].trim().split(/[\s;,|]+/) : [];
      let k = 0; while (k < toks.length - 1 && +toks[k] < 10) k++;       // "Saúde Coletiva 2 60 …": o 2 é do nome
      const cand = toks.slice(k).map(Number).filter(n => n >= 15);
      if (cand.length) { ch = Math.max(...cand); resto = resto.slice(0, resto.length - mt[0].length) + (k ? " " + toks.slice(0, k).join(" ") : ""); }
    }
    const mcod = resto.match(/^([A-Z]{2,5}[\s-]?\d{2,6}[A-Z]?)\b/); if (mcod) { codigo = mcod[1]; resto = resto.slice(mcod[0].length); }
    const nome = resto.replace(/\s{2,}/g, " ").replace(/^[\s\-–:;,.]+|[\s\-–:;,.]+$/g, "").trim();
    if (nome.length < 3 || per === null) continue;
    linhas.push({ periodo: per, tipo: /^m[óo]dulo\b/i.test(nome) ? "modulo" : "disciplina", codigo, nome, ch });
  }
  return linhas;
}
rota("/medicina/importar", () => paginaImportar(""));
rota("/medicina/importar/:inst", ({ inst }) => paginaImportar(inst));
function paginaImportar(inst) {
  // A instituição do endereço sempre manda: evita gravar a matriz de uma faculdade em outra.
  if (inst && IMP.inst !== inst) Object.assign(IMP, { inst, versao: "", fonteRef: "", texto: "", linhas: [], msg: "" });
  const insts = instituicoes();
  const prev = IMP.linhas.length ? `<h2 class="sec">3. Revise antes de salvar <span class="small muted">${IMP.linhas.length} itens · ${unicos(IMP.linhas.map(l => l.periodo)).length} períodos</span></h2>
    <p class="small muted">Corrija nomes, períodos e cargas horárias conforme o documento. Deixe CH em branco se não constar.</p>
    <div class="tabela-wrap"><table><thead><tr><th>Per.</th><th>Tipo</th><th>Código</th><th>Nome</th><th class="num">CH</th><th></th></tr></thead><tbody>${IMP.linhas.map((l, k) => `<tr>
      <td><input type="number" min="0" max="14" value="${l.periodo}" data-chg="imp-cel" data-k="${k}" data-c="periodo" style="width:64px" aria-label="Período"></td>
      <td><select data-chg="imp-cel" data-k="${k}" data-c="tipo" aria-label="Tipo">${opcoes([["disciplina", "Disciplina"], ["modulo", "Módulo"]], l.tipo)}</select></td>
      <td><input type="text" value="${esc(l.codigo || "")}" data-chg="imp-cel" data-k="${k}" data-c="codigo" style="width:90px" aria-label="Código"></td>
      <td><input type="text" value="${esc(l.nome)}" data-chg="imp-cel" data-k="${k}" data-c="nome" style="min-width:220px;width:100%" aria-label="Nome"></td>
      <td class="num"><input type="number" min="0" value="${l.ch ?? ""}" data-chg="imp-cel" data-k="${k}" data-c="ch" style="width:80px" aria-label="Carga horária"></td>
      <td><button class="btn mini sec" data-act="imp-del" data-k="${k}" aria-label="Remover linha">×</button></td></tr>`).join("")}</tbody></table></div>
    <div class="acoes"><button class="btn sec" data-act="imp-add">+ Linha</button><button class="btn azul dir" data-act="imp-salvar">Salvar matriz</button></div>` : "";
  return {
    secao: "medicina", crumbs: [CRUMB_MED], titulo: "Importar matriz curricular",
    sub: "PDF, planilha (XLSX/CSV), DOCX, texto colado ou cadastro manual. Nada é salvo sem sua revisão.",
    html: `<section class="caixa"><h2 class="sec">1. Identificação</h2><div class="campos">
      <label class="campo"><span class="lab">Instituição</span><select id="imp-inst" data-chg="imp-meta" data-c="inst">${opcoes(insts.map(i => [i.id, i.sigla]), IMP.inst, "Selecione")}</select></label>
      <label class="campo"><span class="lab">Curso</span><select data-chg="imp-meta" data-c="curso">${opcoes(Object.entries(CURSOS), IMP.curso)}</select></label>
      <label class="campo"><span class="lab">Versão/ano da matriz</span><input type="text" value="${esc(IMP.versao)}" data-chg="imp-meta" data-c="versao" placeholder="ex.: PPC 2025/2"></label>
      ${IMP.inst && IMP.versao && gradePorId(`${IMP.inst}-${IMP.curso}-${slug(IMP.versao)}`) ? `<p class="aviso" style="grid-column:1/-1;margin:0">Já existe a matriz ${esc(nomeInst(IMP.inst))} — ${esc(IMP.versao)}. Salvar vai atualizá-la (vínculos de temas das disciplinas com o mesmo nome são mantidos).</p>` : ""}
      <label class="campo"><span class="lab">Tipo de fonte</span><select data-chg="imp-meta" data-c="fonteTipo">${opcoes([["pdf", "PDF"], ["planilha", "Planilha"], ["documento", "Documento"], ["url", "URL"], ["texto", "Texto"], ["manual", "Manual"]], IMP.fonteTipo)}</select></label>
      <label class="campo" style="grid-column:1/-1"><span class="lab">Referência da fonte (título do documento ou URL oficial)</span><input type="text" value="${esc(IMP.fonteRef)}" data-chg="imp-meta" data-c="fonteRef"></label></div>
      ${IMP.fonteTipo === "url" ? `<p class="aviso info">Por segurança o app não baixa páginas de outros sites. Abra a URL, baixe o PDF/planilha e envie abaixo — a URL fica registrada como fonte.</p>` : ""}</section>
    <section class="caixa"><h2 class="sec">2. Conteúdo</h2>
      <div class="linha"><label class="btn sec">Escolher arquivo<input type="file" id="imp-arq" accept=".pdf,.xlsx,.xls,.ods,.csv,.txt,.docx" data-chg="imp-arquivo" hidden></label><span class="small muted">PDF, XLSX, CSV, DOCX ou TXT</span></div>
      <label class="campo" style="margin-top:10px"><span class="lab">Texto extraído / colado</span><textarea id="imp-txt" rows="8" data-chg="imp-texto" placeholder="Cole aqui o texto da matriz. Formato aceito, por exemplo:&#10;1º período&#10;ANA101 Anatomia Humana I 120h&#10;— ou CSV: período;tipo;nome;CH">${esc(IMP.texto)}</textarea></label>
      <div class="acoes"><button class="btn" data-act="imp-interpretar" ${IMP.ocupado ? "disabled" : ""}>Interpretar por regras</button>${IA.disponivel() ? `<button class="btn sec" data-act="imp-ia" ${IMP.ocupado ? "disabled" : ""}>Estruturar com IA</button>` : ""}<button class="btn sec" data-act="imp-add">Cadastrar manualmente</button></div>
      ${IMP.msg ? `<p class="small" role="status">${esc(IMP.msg)}</p>` : ""}</section>
    ${prev}`,
  };
}
MUDANCAS["imp-meta"] = el => { IMP[el.dataset.c] = el.value; if (el.dataset.c === "inst" && el.value) { ir("#/medicina/importar/" + el.value); return; } if (["fonteTipo", "versao", "curso"].includes(el.dataset.c)) atualizar(); };
MUDANCAS["imp-texto"] = el => { IMP.texto = el.value; };
MUDANCAS["imp-cel"] = el => { const l = IMP.linhas[+el.dataset.k], c = el.dataset.c; l[c] = c === "periodo" ? (+el.value || 0) : c === "ch" ? (el.value === "" ? null : +el.value) : el.value; };
MUDANCAS["imp-arquivo"] = async el => {
  const f = el.files[0]; if (!f) return;
  IMP.ocupado = true; IMP.msg = `Lendo ${f.name}…`; if (!IMP.fonteRef) IMP.fonteRef = f.name; atualizar();
  try { IMP.texto = (await textoDoArquivo(f)).slice(0, 400000); IMP.msg = `Texto extraído (${IMP.texto.split("\n").length} linhas). Agora interprete por regras ou com IA.`; }
  catch (e) { IMP.msg = "Não foi possível ler o arquivo: " + (e.message || "formato não suportado") + ". Tente colar o texto."; }
  IMP.ocupado = false; atualizar();
};
ACOES["imp-interpretar"] = () => { IMP.texto = $("#imp-txt").value; IMP.linhas = interpretarTexto(IMP.texto); IMP.msg = IMP.linhas.length ? `${IMP.linhas.length} itens reconhecidos. Revise a tabela.` : "Nenhum item reconhecido. Verifique se há cabeçalhos de período (ex.: \"1º período\") ou use o formato CSV."; atualizar(); };
ACOES["imp-ia"] = async () => {
  IMP.texto = $("#imp-txt").value; if (!IMP.texto.trim()) { IMP.msg = "Envie um arquivo ou cole o texto primeiro."; return atualizar(); }
  IMP.ocupado = true; IMP.msg = "Estruturando com IA…"; atualizar();
  try {
    const r = await IA.json(`Extraia a matriz curricular do texto abaixo. Use SOMENTE o que está escrito: não complete, não invente disciplinas nem cargas horárias (use null quando não constar). Optativas no período 0.\n\nTEXTO:\n${IMP.texto.slice(0, 60000)}`, `{"itens":[{"periodo":1,"tipo":"disciplina|modulo","codigo":null,"nome":"","ch":null}]}`);
    IMP.linhas = (r?.itens || []).filter(x => x?.nome).map(x => ({ periodo: +x.periodo || 0, tipo: x.tipo === "modulo" ? "modulo" : "disciplina", codigo: x.codigo || null, nome: String(x.nome), ch: typeof x.ch === "number" ? x.ch : null }));
    IMP.msg = `${IMP.linhas.length} itens estruturados pela IA. Confira cada linha com o documento.`;
  } catch (e) { IMP.msg = IA.mensagemErro(e); }
  IMP.ocupado = false; atualizar();
};
ACOES["imp-add"] = () => { IMP.linhas.push({ periodo: IMP.linhas.at(-1)?.periodo || 1, tipo: "disciplina", codigo: null, nome: "", ch: null }); atualizar(); };
ACOES["imp-del"] = el => { IMP.linhas.splice(+el.dataset.k, 1); atualizar(); };
ACOES["imp-salvar"] = () => {
  const linhas = IMP.linhas.filter(l => l.nome.trim());
  if (!IMP.inst) { toast("Escolha a instituição"); return; }
  if (!IMP.versao.trim()) { toast("Informe a versão/ano da matriz"); return; }
  if (!linhas.length) { toast("Nenhuma linha para salvar"); return; }
  const id = `${IMP.inst}-${IMP.curso}-${slug(IMP.versao)}`, antiga = gradePorId(id);
  const porP = porChave(linhas, l => l.periodo), usados = new Set();
  const periodos = Object.keys(porP).map(Number).sort((a, b) => (a || 99) - (b || 99)).map(n => ({ numero: n, nome: n ? `${n}º período` : "Optativas/eletivas",
    itens: porP[n].map(l => { let iid = slug(l.codigo || l.nome); while (usados.has(iid)) iid += "-x"; usados.add(iid);
      const velho = antiga && itensGrade(antiga).find(x => norm(x.nome) === norm(l.nome)); // preserva vínculos de temas ao reimportar
      return { id: velho?.id || iid, tipo: l.tipo, codigo: l.codigo || null, nome: l.nome.trim(), ch: l.ch ?? null, temas: velho?.temas || [], unidades: velho?.unidades || [] }; }) }));
  salvarGrade({ id, instituicao: IMP.inst, curso: IMP.curso, versao: IMP.versao.trim(), status: "importado", fonte: { tipo: IMP.fonteTipo, ref: IMP.fonteRef || null }, periodos });
  Object.assign(IMP, { inst: "", versao: "", fonteRef: "", texto: "", linhas: [], msg: "" });
  toast(antiga ? "Matriz existente atualizada (vínculos de temas preservados)" : "Matriz salva — confira e marque como validada"); ir("#/medicina/grade/" + id);
};

/* ============================================================
   Comparar grades — por período, CH, temas comuns/exclusivos e ordem de ensino.
   Equivalência só por temas vinculados; nomes parecidos são apenas um alerta.
   ============================================================ */
const CMP = { a: "", b: "" };
rota("/medicina/comparar", () => {
  const gs = grades().filter(g => itensGrade(g).length), op = gs.map(g => [g.id, `${nomeInst(g.instituicao)} — ${g.versao || g.id}`]);
  const A = gradePorId(CMP.a), B = gradePorId(CMP.b);
  let corpo = "";
  if (gs.length < 2) corpo = vazio(`É preciso ao menos duas matrizes importadas para comparar. Hoje: ${gs.length}. As matrizes da UFAM e da UEA estão como "${PENDENTE}".`, `<a class="btn" href="#/medicina/importar">Importar matriz</a>`);
  else if (A && B && A.id !== B.id) {
    const ta = temasNaGrade(A), tb = temasNaGrade(B), comuns = Object.keys(ta).filter(t => tb[t]), soA = Object.keys(ta).filter(t => !tb[t]), soB = Object.keys(tb).filter(t => !ta[t]);
    const nA = nomeInst(A.instituicao), nB = nomeInst(B.instituicao), cA = chTotal(A), cB = chTotal(B);
    const maxP = Math.max(...(A.periodos || []).map(p => p.numero), ...(B.periodos || []).map(p => p.numero));
    const lista = (g, n) => ((g.periodos || []).find(p => p.numero === n)?.itens || []).map(i => `${esc(i.nome)}${typeof i.ch === "number" ? ` <span class="muted small">${i.ch}h</span>` : ""}`).join("<br>") || "—";
    const parecidos = []; itensGrade(A).forEach(x => itensGrade(B).forEach(y => { const s = similaridade(x.nome, y.nome); if (s >= 0.5) parecidos.push([x, y, s]); }));
    const onde = (m, t) => unicos(m[t].map(o => o.periodo)).sort((a, b) => a - b).map(n => n + "º").join(", ");
    corpo = `<div class="kpis"><div class="kpi"><b>${(A.periodos || []).length} × ${(B.periodos || []).length}</b><span>períodos</span></div><div class="kpi"><b>${cA.itens} × ${cB.itens}</b><span>disciplinas/módulos</span></div><div class="kpi"><b>${cA.conhecidas ? cA.total : "?"} × ${cB.conhecidas ? cB.total : "?"}</b><span>CH conhecida (h)</span></div><div class="kpi"><b>${comuns.length}</b><span>temas em comum</span></div></div>
      <h2 class="sec">Por período</h2>${tabela([{ t: "Período" }, { t: nA }, { t: nB }], Array.from({ length: maxP + 1 }, (_, n) => n).filter(n => (A.periodos || []).some(p => p.numero === n) || (B.periodos || []).some(p => p.numero === n)).map(n => [n ? n + "º" : "Optativas", lista(A, n), lista(B, n)]), { resp: false })}
      <h2 class="sec">Temas em comum e ordem de ensino</h2>${comuns.length ? tabela([{ t: "Tema" }, { t: `Período em ${nA}` }, { t: `Período em ${nB}` }, { t: "Diferença" }], comuns.map(t => { const pa = Math.min(...ta[t].map(o => o.periodo)), pb = Math.min(...tb[t].map(o => o.periodo)); return [linkTema(t), `${onde(ta, t)} <span class="small muted">${ta[t].map(o => esc(o.item.nome)).join(", ")}</span>`, `${onde(tb, t)} <span class="small muted">${tb[t].map(o => esc(o.item.nome)).join(", ")}</span>`, pa === pb ? "mesmo período" : `${Math.abs(pa - pb)} período(s) ${pa < pb ? "antes em " + nA : "antes em " + nB}`]; })) : vazio("Nenhum tema vinculado em comum. Vincule temas às disciplinas das duas matrizes para comparar conteúdo.")}
      <div class="grid g2"><section><h2 class="sec">Só em ${esc(nA)}</h2>${soA.length ? `<div class="chips">${soA.map(t => `<a class="chip" href="#/tema/${encodeURIComponent(t)}">${esc(nomeTema(t))}</a>`).join("")}</div>` : `<p class="muted">—</p>`}</section>
      <section><h2 class="sec">Só em ${esc(nB)}</h2>${soB.length ? `<div class="chips">${soB.map(t => `<a class="chip" href="#/tema/${encodeURIComponent(t)}">${esc(nomeTema(t))}</a>`).join("")}</div>` : `<p class="muted">—</p>`}</section></div>
      <h2 class="sec">Nomes parecidos</h2><p class="small muted">Nome semelhante não significa equivalência: confira ementa e carga horária.</p>
      ${tabela([{ t: nA }, { t: nB }, { t: "CH", num: 1 }], parecidos.sort((a, b) => b[2] - a[2]).slice(0, 40).map(([x, y]) => [`${esc(x.nome)} <span class="small muted">${x.periodo}º</span>`, `${esc(y.nome)} <span class="small muted">${y.periodo}º</span>`, `${x.ch ?? "?"} × ${y.ch ?? "?"}`]), { vaziaMsg: "Nenhum par de nomes parecidos." })}`;
  } else corpo = `<p class="muted">Escolha duas matrizes diferentes.</p>`;
  return {
    secao: "medicina", crumbs: [CRUMB_MED], titulo: "Comparar grades",
    html: `<div class="campos" style="margin-bottom:14px"><label class="campo"><span class="lab">Matriz A</span><select data-chg="cmp" data-c="a">${opcoes(op, CMP.a, "Selecione")}</select></label><label class="campo"><span class="lab">Matriz B</span><select data-chg="cmp" data-c="b">${opcoes(op, CMP.b, "Selecione")}</select></label></div>${corpo}`,
  };
});
MUDANCAS.cmp = el => { CMP[el.dataset.c] = el.value; atualizar(); };

/* ---------- Mapa do conhecimento: Área → Especialidade → Tema ---------- */
const temasDaEsp = id => Object.values(TEMAS).filter(t => (t.especialidades || []).includes(id));
rota("/medicina/especialidades", () => ({
  secao: "medicina", crumbs: [CRUMB_MED], titulo: "Mapa por especialidades", sub: "Mesmos temas da grade, organizados pela medicina. Um tema pode aparecer em várias especialidades.",
  html: AREAS_MED.length ? AREAS_MED.map(a => `<section><h2 class="sec">${esc(a.nome)}</h2>${tabela([{ t: "Especialidade" }, { t: "Temas", num: 1 }, { t: "Questões", num: 1 }, { t: "Acerto", num: 1 }],
    (a.especialidades || []).map(e => { const ts = temasDaEsp(e.id).map(t => t.id), ag = agregados(q => ts.includes(q.tema) || q.esp === e.id); return [`<a href="#/medicina/esp/${esc(e.id)}">${esc(e.nome)}</a>`, ts.length, questoes().filter(q => ts.includes(q.tema) || q.esp === e.id).length, ag.n ? pct(ag.ac, ag.n) + "%" : "—"]; }))}</section>`).join("") : vazio("Catálogo de especialidades não carregado."),
}));
rota("/medicina/esp/:id", ({ id }) => {
  const e = ESPECIALIDADES[id]; if (!e) return paginaNaoEncontrada();
  const ts = ordenarPt(temasDaEsp(id), t => t.nome), R = store.doc("revisoes").temas;
  const ids = questoes().filter(q => ts.some(t => t.id === q.tema) || q.esp === id).map(q => q.id);
  return {
    secao: "medicina", crumbs: [CRUMB_MED, ["Especialidades", "#/medicina/especialidades"], [e.areaNome, "#/medicina/especialidades"]], titulo: e.nome,
    acoes: ids.length ? `<button class="btn" data-act="praticar-ids" data-ids="${ids.join(",")}" data-ctx="Especialidade ${esc(e.nome)}">Praticar ${ids.length} questões</button>` : "",
    html: tabela([{ t: "Tema" }, { t: "Questões", num: 1 }, { t: "Acerto", num: 1 }, { t: "Próxima revisão" }], ts.map(t => { const d = desempenhoTema(t.id); return [linkTema(t.id), d.total, d.n ? pct(d.ac, d.n) + "%" : "—", R[t.id] ? quando(R[t.id].prox) : "—"]; }), { vaziaMsg: "Sem temas nesta especialidade." }),
    ctx: { especialidade: id },
  };
});
