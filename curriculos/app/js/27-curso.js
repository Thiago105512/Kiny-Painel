/* ============================================================
   27-curso — "Meu curso": a grade do perfil vira o painel do semestre.
   Situação de cada disciplina, notas por avaliação, média, faltas,
   agenda de provas/trabalhos com revisão automática até a data e
   importação do histórico escolar (por código da disciplina).
   Documento "academico": disc[itemId] = {sit, notas:[{id,nome,valor,peso}], final, faltas, sem}
                          aval[id]     = {id, tipo, titulo, disc, data, hora, conteudo, temas[], peso, nota, feito}
   ============================================================ */
const SIT = {
  cursando: ["Cursando", "azul"], concluida: ["Concluída", "ok"], acursar: ["A cursar", ""],
  reprovada: ["Reprovada", "bad"], dispensada: ["Dispensada", "ok"], trancada: ["Trancada", ""],
};
const TIPO_AVAL = { prova: "Prova", pratica: "Prova prática", trabalho: "Trabalho", seminario: "Seminário", apresentacao: "Apresentação", exercicio: "Lista de exercícios", outro: "Outro" };
const OBJETIVOS = { medicina: "Medicina — graduação", residencia: "Residência médica", enem: "ENEM e vestibulares", direito: "Direito — graduação", oab: "OAB" };
const objetivo = () => store.doc("perfil").objetivo || null;
/** Trilha rápida de questões correspondente ao objetivo ("med" junta Medicina e Residência). */
const trilhaDoObjetivo = () => ({ medicina: "med", residencia: "med", enem: "enem", direito: "direito", oab: "oab" })[objetivo()] || "";
const doObjetivo = q => { const o = objetivo(); if (!o) return true; return o === "medicina" || o === "residencia" ? TRILHAS[q.t]?.dominio === "medicina" : o === "enem" ? q.t === "enem" : o === "oab" ? q.t === "oab" || q.t === "direito" : q.t === "direito" || q.t === "oab"; };

const minhaGrade = () => { const P = store.doc("perfil"); return P.gradeId ? gradePorId(P.gradeId) : null; };
const acad = () => store.doc("academico");
/** Situação: a escolhida pela pessoa ou, sem escolha, a presumida pelo período atual. */
function sitDe(it) {
  const d = acad().disc[it.id]; if (d?.sit) return d.sit;
  const per = store.doc("perfil").periodo;
  if (!per || !it.periodo || it.optativa) return "acursar";
  return it.periodo < per ? "concluida" : it.periodo === per ? "cursando" : "acursar";
}
const presumida = it => !acad().disc[it.id]?.sit;
/** Média ponderada das notas lançadas (0–10) ou a média final informada. */
function mediaDe(itId) {
  const d = acad().disc[itId]; if (!d) return null;
  if (typeof d.final === "number") return d.final;
  const ns = (d.notas || []).filter(n => typeof n.valor === "number");
  if (!ns.length) return null;
  const p = ns.reduce((s, n) => s + (+n.peso || 1), 0);
  return Math.round(ns.reduce((s, n) => s + n.valor * (+n.peso || 1), 0) / p * 100) / 100;
}
/** Coeficiente: média das médias ponderada pela carga horária (só disciplinas com média). */
function coeficiente(g) {
  let s = 0, ch = 0;
  itensGrade(g).forEach(it => { const m = mediaDe(it.id), sit = sitDe(it); if (m === null || !["concluida", "reprovada"].includes(sit)) return; const h = it.ch || 1; s += m * h; ch += h; });
  return ch ? Math.round(s / ch * 100) / 100 : null;
}
const fmtNota = n => n === null || n === undefined ? "—" : String(n).replace(".", ",");
const lerNota = v => { const n = parseFloat(String(v).replace(",", ".")); return isNaN(n) ? null : Math.max(0, Math.min(10, n)); };
const avals = () => Object.values(acad().aval).sort((a, b) => (a.data || "9").localeCompare(b.data || "9") || (a.hora || "").localeCompare(b.hora || ""));
const proximasAvals = (dias = 60) => avals().filter(a => !a.feito && a.data && a.data >= hoje() && diasAte(a.data) <= dias);
const nomeItem = (g, id) => (g && itensGrade(g).find(x => x.id === id)?.nome) || null;
const semGrade = () => ({ secao: "curso", titulo: "Meu curso", html: vazio("Escolha a matriz curricular no seu perfil primeiro.", `<a class="btn" href="#/curso">Voltar</a>`) });
function mudouAcad() { store.mudou("academico"); }
function discOuNovo(id) { const A = acad(); return A.disc[id] = A.disc[id] || { notas: [], faltas: 0 }; }

/* ---------- Painel ---------- */
rota("/curso", () => {
  const P = store.doc("perfil"), g = minhaGrade();
  if (!g || !itensGrade(g).length) return { secao: "curso", titulo: "Meu curso",
    html: vazio(P.faculdade ? "A matriz da sua faculdade ainda não foi escolhida ou importada. Escolha a matriz no perfil (ou importe o documento oficial) para acompanhar disciplinas, notas e provas."
      : "Escolha sua faculdade, a matriz curricular e o período para acompanhar disciplinas, notas, faltas e provas.", `<button class="btn" data-act="perfil-fac">Meu perfil</button>${P.faculdade ? `<a class="btn sec" href="#/medicina/inst/${esc(P.faculdade)}">Importar matriz</a>` : ""}`) };
  const it = itensGrade(g).filter(x => !x.optativa || acad().disc[x.id]?.sit), obrig = it.filter(x => !x.optativa);
  const conc = obrig.filter(x => ["concluida", "dispensada"].includes(sitDe(x))), chConc = conc.reduce((s, x) => s + (x.ch || 0), 0), chTot = obrig.reduce((s, x) => s + (x.ch || 0), 0);
  const cursando = it.filter(x => sitDe(x) === "cursando"), cr = coeficiente(g), prox = proximasAvals(30).slice(0, 5);
  const linhaDisc = x => { const m = mediaDe(x.id), d = acad().disc[x.id], lim = x.ch ? Math.floor(x.ch * 0.25) : null, f = d?.faltas || 0;
    return `<a href="#/curso/d/${esc(x.id)}"><span>${esc(x.nome)}</span><small>${[m !== null && "média " + fmtNota(m), f ? `${f} h de falta${lim ? ` (limite ~${lim} h)` : ""}` : "", avals().filter(a => a.disc === x.id && !a.feito && a.data >= hoje()).length && "avaliação marcada"].filter(Boolean).join(" · ")}</small></a>`; };
  return {
    secao: "curso", titulo: "Meu curso", sub: `${esc(nomeInst(g.instituicao))} · ${esc(CURSOS[g.curso] || g.curso)} ${esc(g.versao || "")}${P.periodo ? ` · ${P.periodo}º período` : ""}`,
    acoes: `<button class="btn mini" data-act="aval-nova">+ Prova ou trabalho</button><button class="btn sec mini" data-act="perfil-fac">Perfil</button>`,
    html: `<div class="kpis">
        <div class="kpi"><b>${conc.length}/${obrig.length}</b><span>disciplinas concluídas</span>${medidor(pct(chConc, chTot), "ok")}</div>
        <div class="kpi"><b>${chTot ? pct(chConc, chTot) + "%" : "—"}</b><span>da carga horária obrigatória</span></div>
        <div class="kpi"><b>${cr !== null ? fmtNota(cr) : "—"}</b><span>média geral (por CH)</span></div></div>
      <section><h2 class="sec">Próximas provas e trabalhos</h2>${prox.length ? `<div class="tarefas">${prox.map(linhaAval).join("")}</div>` : `<p class="muted">Nada marcado. Cadastre provas, trabalhos e apresentações para o app montar a revisão até a data.</p>`}
        <div class="acoes"><a class="btn sec mini" href="#/curso/agenda">Agenda completa</a></div></section>
      <section><h2 class="sec">Cursando agora</h2>${cursando.length ? `<div class="links-lista">${cursando.map(linhaDisc).join("")}</div>` : `<p class="muted">Nenhuma disciplina marcada como "cursando".</p>`}</section>
      <section><h2 class="sec">Mais</h2><div class="links-lista">
        <a href="#/curso/disciplinas"><span>Todas as disciplinas</span><small>marque concluídas, cursando, reprovadas…</small></a>
        <a href="#/curso/historico"><span>Importar histórico escolar</span><small>preenche situação e médias pelo código da disciplina</small></a>
        <a href="#/curso/ajuda"><span>Correção e ajuda</span><small>envie prova, trabalho ou pedido de ajuda</small></a>
        <a href="#/medicina/grade/${esc(g.id)}"><span>Matriz curricular</span><small>${esc(statusGrade(g).nome)}</small></a></div></section>
      ${obrig.some(presumida) ? `<p class="small muted">Situações sem marcação foram presumidas pelo seu período atual. Ajuste em "Todas as disciplinas" ou importe o histórico.</p>` : ""}`,
    ctx: { grade: g.id, periodo: P.periodo },
  };
});
function linhaAval(a) {
  const g = minhaGrade(), n = a.data ? diasAte(a.data) : null;
  return `<div class="tarefa"><div class="o"><a href="#/curso/aval/${esc(a.id)}">${esc(TIPO_AVAL[a.tipo] || "Avaliação")}: ${esc(a.titulo || nomeItem(g, a.disc) || "")}</a><small>${[a.data && `${dataBR(a.data)}${a.hora ? " " + esc(a.hora) : ""} (${quando(a.data)})`, nomeItem(g, a.disc)].filter(Boolean).map(esc).join(" · ")}</small></div>${n !== null && n <= 3 && !a.feito ? pill(n <= 0 ? "hoje" : n === 1 ? "amanhã" : `${n} dias`, "bad") : ""}</div>`;
}

/* ---------- Todas as disciplinas ---------- */
rota("/curso/disciplinas", () => {
  const g = minhaGrade(); if (!g) return semGrade();
  const sel = it => `<select data-chg="disc-sit" data-i="${esc(it.id)}" aria-label="Situação de ${esc(it.nome)}">${opcoes(Object.entries(SIT).map(([k, [t]]) => [k, t]), sitDe(it))}</select>`;
  return { secao: "curso", crumbs: [["Meu curso", "#/curso"]], titulo: "Disciplinas",
    sub: "Escolha a situação de cada uma. As não marcadas são presumidas pelo seu período atual.",
    html: (g.periodos || []).map(p => `<section><h2 class="sec">${esc(p.nome || p.numero + "º período")} <button class="btn mini sec" data-act="disc-per" data-p="${p.numero}" data-s="concluida">Tudo concluído</button></h2>
      <div class="tarefas">${(p.itens || []).map(it0 => { const it = { ...it0, periodo: p.numero }, m = mediaDe(it.id);
        return `<div class="tarefa"><div class="o"><a href="#/curso/d/${esc(it.id)}">${esc(it.nome)}</a><small>${[it.codigo, it.ch && it.ch + " h", m !== null && "média " + fmtNota(m), presumida(it) && "presumida"].filter(Boolean).map(esc).join(" · ")}</small></div>${sel(it)}</div>`; }).join("")}</div></section>`).join(""),
    ctx: { grade: g.id } };
});
MUDANCAS["disc-sit"] = el => { discOuNovo(el.dataset.i).sit = el.value; mudouAcad(); toast("Situação salva"); atualizar(); };
ACOES["disc-per"] = el => { const g = minhaGrade(), p = g.periodos.find(x => String(x.numero) === el.dataset.p); (p.itens || []).forEach(it => { discOuNovo(it.id).sit = el.dataset.s; }); mudouAcad(); toast("Período marcado como concluído"); atualizar(); };

/* ---------- Disciplina ---------- */
rota("/curso/d/:i", ({ i }) => {
  const g = minhaGrade(); const it = g && itensGrade(g).find(x => x.id === i); if (!it) return paginaNaoEncontrada();
  const d = acad().disc[i] || { notas: [], faltas: 0 }, m = mediaDe(i), lim = it.ch ? Math.floor(it.ch * 0.25) : null, f = d.faltas || 0;
  const temas = temasDoItem(it), qs = questoes().filter(q => temas.includes(q.tema)), av = avals().filter(a => a.disc === i);
  return {
    secao: "curso", crumbs: [["Meu curso", "#/curso"], ["Disciplinas", "#/curso/disciplinas"]], titulo: it.nome,
    sub: `${pill(SIT[sitDe(it)][0], SIT[sitDe(it)][1])} ${[it.codigo, it.periodoNome, it.ch && it.ch + " h"].filter(Boolean).map(esc).join(" · ")}`,
    acoes: `${qs.length ? `<button class="btn" data-act="praticar-ids" data-ids="${qs.map(q => q.id).join(",")}" data-ctx="Disciplina ${esc(it.nome)}">Praticar ${qs.length} questões</button>` : ""}<button class="btn sec" data-act="aval-nova" data-d="${esc(i)}">+ Prova ou trabalho</button>`,
    html: `<section class="caixa"><h2 class="sec">Situação</h2><select data-chg="disc-sit" data-i="${esc(i)}" aria-label="Situação">${opcoes(Object.entries(SIT).map(([k, [t]]) => [k, t]), sitDe(it))}</select></section>
      <section class="caixa"><h2 class="sec">Notas <span class="small muted">média ${fmtNota(m)}</span></h2>
        ${(d.notas || []).length ? `<div class="tarefas">${d.notas.map(n => `<div class="tarefa"><div class="o">${esc(n.nome)}<small>nota ${fmtNota(n.valor)}${(+n.peso || 1) !== 1 ? " · peso " + fmtNota(n.peso) : ""}</small></div><button class="btn mini sec" data-act="nota-del" data-i="${esc(i)}" data-n="${esc(n.id)}" aria-label="Apagar nota ${esc(n.nome)}">Apagar</button></div>`).join("")}</div>` : `<p class="muted">Nenhuma nota lançada.</p>`}
        <form class="campos" data-form="nota-nova" data-i="${esc(i)}" style="margin-top:10px">
          <label class="campo"><span class="lab">Avaliação</span><input type="text" id="nn-nome" required maxlength="60" placeholder="Ex.: 1ª prova"></label>
          <label class="campo"><span class="lab">Nota (0 a 10)</span><input type="text" inputmode="decimal" id="nn-valor" required></label>
          <label class="campo"><span class="lab">Peso</span><input type="text" inputmode="decimal" id="nn-peso" value="1"></label>
          <button class="btn sec" style="align-self:end">Lançar nota</button></form>
        <form class="campos" data-form="nota-final" data-i="${esc(i)}" style="margin-top:10px"><label class="campo"><span class="lab">Média final (se já souber)</span><input type="text" inputmode="decimal" id="nf-valor" value="${typeof d.final === "number" ? fmtNota(d.final) : ""}"></label><button class="btn sec" style="align-self:end">Salvar média</button></form></section>
      <section class="caixa"><h2 class="sec">Faltas</h2>
        <div class="linha" style="align-items:center"><button class="btn sec" data-act="falta" data-i="${esc(i)}" data-n="-1" aria-label="Menos uma hora de falta">−</button><b style="font-size:calc(24px * var(--k));min-width:3ch;text-align:center">${f}</b><button class="btn sec" data-act="falta" data-i="${esc(i)}" data-n="1" aria-label="Mais uma hora de falta">+</button><span>horas-aula</span></div>
        ${lim ? `${medidor(pct(f, lim), f >= lim ? "bad" : f >= lim * 0.75 ? "warn" : "ok")}<p class="small muted">Limite estimado: ${lim} h (25% de ${it.ch} h, regra comum de 75% de frequência). Confira no regimento da sua faculdade.</p>` : ""}</section>
      <section><h2 class="sec">Provas e trabalhos</h2>${av.length ? `<div class="tarefas">${av.map(linhaAval).join("")}</div>` : `<p class="muted">Nenhuma cadastrada.</p>`}</section>
      <section><h2 class="sec">Temas</h2>${temas.length ? `<div class="links-lista">${temas.map(t => `<a href="#/tema/${esc(t)}"><span>${esc(nomeTema(t))}</span><small>${questoes().filter(q => q.tema === t).length} questões</small></a>`).join("")}</div>` : `<p class="muted">Nenhum tema vinculado. <a href="#/medicina/grade/${esc(g.id)}/item/${esc(i)}">Vincular temas</a></p>`}</section>`,
    ctx: { grade: g.id, periodo: it.periodo, disciplina: it.nome },
  };
});
FORMS["nota-nova"] = f => { const v = lerNota($("#nn-valor").value); if (v === null) { toast("Nota inválida"); return; }
  const d = discOuNovo(f.dataset.i); d.notas = d.notas || []; d.notas.push({ id: "n" + Date.now().toString(36), nome: $("#nn-nome").value.trim(), valor: v, peso: parseFloat(String($("#nn-peso").value).replace(",", ".")) || 1 }); mudouAcad(); toast("Nota lançada"); atualizar(); };
FORMS["nota-final"] = f => { const d = discOuNovo(f.dataset.i), v = $("#nf-valor").value.trim(); d.final = v === "" ? null : lerNota(v); mudouAcad(); toast("Média salva"); atualizar(); };
ACOES["nota-del"] = el => { const d = discOuNovo(el.dataset.i); d.notas = (d.notas || []).filter(n => n.id !== el.dataset.n); mudouAcad(); atualizar(); };
ACOES["falta"] = el => { const d = discOuNovo(el.dataset.i); d.faltas = Math.max(0, (d.faltas || 0) + +el.dataset.n); mudouAcad(); atualizar(); };

/* ---------- Agenda de avaliações + revisão automática ---------- */
rota("/curso/agenda", () => {
  const futuras = avals().filter(a => !a.feito && (!a.data || a.data >= hoje())), passadas = avals().filter(a => a.feito || (a.data && a.data < hoje())).reverse();
  return { secao: "curso", crumbs: [["Meu curso", "#/curso"]], titulo: "Provas e trabalhos", acoes: `<button class="btn mini" data-act="aval-nova">+ Adicionar</button>`,
    html: `<section><h2 class="sec">Próximas</h2>${futuras.length ? `<div class="tarefas">${futuras.map(linhaAval).join("")}</div>` : `<p class="muted">Nada marcado.</p>`}</section>
      ${passadas.length ? `<section><h2 class="sec">Anteriores</h2><div class="tarefas">${passadas.slice(0, 40).map(linhaAval).join("")}</div></section>` : ""}` };
});
ACOES["aval-nova"] = el => formAval({ disc: el.dataset.d || "" });
function formAval(a) {
  const g = minhaGrade(), its = g ? itensGrade(g).filter(x => sitDe(x) === "cursando" || x.id === a.disc) : [];
  const outras = g ? itensGrade(g).filter(x => !its.includes(x)) : [];
  abrirFolha(`<form class="pilha" data-form="aval-salvar" data-id="${esc(a.id || "")}">
    <div class="campos">
      <label class="campo"><span class="lab">Tipo</span><select id="av-tipo">${opcoes(Object.entries(TIPO_AVAL), a.tipo || "prova")}</select></label>
      <label class="campo"><span class="lab">Disciplina</span><select id="av-disc"><option value="">—</option>${its.length ? `<optgroup label="Cursando">${opcoes(its.map(x => [x.id, x.nome]), a.disc)}</optgroup>` : ""}${outras.length ? `<optgroup label="Outras">${opcoes(outras.map(x => [x.id, x.nome]), a.disc)}</optgroup>` : ""}</select></label>
      <label class="campo"><span class="lab">Título (opcional)</span><input type="text" id="av-tit" maxlength="80" value="${esc(a.titulo || "")}" placeholder="Ex.: 2ª prova — sistema digestório"></label>
      <label class="campo"><span class="lab">Data</span><input type="date" id="av-data" value="${esc(a.data || "")}" required></label>
      <label class="campo"><span class="lab">Hora</span><input type="time" id="av-hora" value="${esc(a.hora || "")}"></label>
      <label class="campo"><span class="lab">Peso</span><input type="text" inputmode="decimal" id="av-peso" value="${esc(a.peso ?? 1)}"></label></div>
    <label class="campo"><span class="lab">Conteúdo / observações</span><textarea id="av-cont" rows="3" maxlength="2000">${esc(a.conteudo || "")}</textarea></label>
    ${a.id ? "" : `<label class="check"><input type="checkbox" id="av-rev" checked><span>Montar revisão no Planejamento até a data (temas da disciplina, questões e um simulado na véspera)</span></label>`}
    <button class="btn azul grande">Salvar</button></form>`, { titulo: a.id ? "Editar avaliação" : "Nova prova ou trabalho" });
}
FORMS["aval-salvar"] = f => {
  const A = acad(), id = f.dataset.id || "av" + Date.now().toString(36), velho = A.aval[id] || {};
  const disc = $("#av-disc").value || null, g = minhaGrade(), it = g && disc ? itensGrade(g).find(x => x.id === disc) : null;
  const a = A.aval[id] = { ...velho, id, tipo: $("#av-tipo").value, disc, titulo: $("#av-tit").value.trim(), data: $("#av-data").value, hora: $("#av-hora").value,
    peso: parseFloat(String($("#av-peso").value).replace(",", ".")) || 1, conteudo: $("#av-cont").value.trim(), temas: velho.temas || (it ? temasDoItem(it) : []) };
  mudouAcad();
  const n = !f.dataset.id && $("#av-rev")?.checked ? montarRevisao(a) : 0;
  fecharFolha(); toast(n ? `Salvo · ${n} sessões de revisão no Planejamento` : "Salvo"); atualizar();
};
/** Distribui os temas entre amanhã e a véspera (até 14 dias), com um simulado misto na véspera. */
function montarRevisao(a) {
  const P = store.doc("plano"), g = minhaGrade(), nome = a.titulo || nomeItem(g, a.disc) || TIPO_AVAL[a.tipo];
  Object.keys(P.itens).forEach(k => { if (P.itens[k].aval === a.id && !P.itens[k].feito) delete P.itens[k]; });
  if (!a.data) return 0;
  const ate = diasAte(a.data), temas = (a.temas || []).filter(t => questoes().some(q => q.tema === t));
  const disc = nomeItem(g, a.disc) || "", novo = (data, extra) => { const id = "pa" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); P.itens[id] = { id, data, disciplina: disc, min: 30, nq: 10, rev: true, feito: false, aval: a.id, ...extra }; };
  let n = 0;
  if (ate >= 2 && temas.length) {
    const dias = Math.min(14, ate - 1), ini = somaDias(a.data, -dias);   // de (data − dias) até a antevéspera
    const slots = Array.from({ length: Math.max(1, dias - 1) }, (_, k) => somaDias(ini, k));
    // uma sessão por dia; com mais temas que dias, cada sessão junta alguns temas
    slots.forEach((d, k) => { const ts = temas.filter((_, j) => j % slots.length === k); if (!ts.length) return;
      const nomes = ts.map(nomeTema), tit = nomes.length > 2 ? `${nomes.slice(0, 2).join(", ")} e mais ${nomes.length - 2}` : nomes.join(" e ");
      novo(d, { titulo: `Revisão para ${nome}: ${tit}`, tema: ts[0], temas: ts, nq: Math.min(20, 8 + 2 * ts.length), min: Math.min(60, 20 + 10 * ts.length) }); n++; });
  }
  if (ate >= 1 && temas.length) { novo(somaDias(a.data, -1), { titulo: `Simulado para ${nome}`, temas, nq: 20, min: 45 }); n++; }
  store.mudou("plano"); return n;
}
rota("/curso/aval/:id", ({ id }) => {
  const a = acad().aval[id]; if (!a) return paginaNaoEncontrada();
  const g = minhaGrade(), rev = Object.values(store.doc("plano").itens).filter(p => p.aval === id).sort((x, y) => x.data.localeCompare(y.data));
  return { secao: "curso", crumbs: [["Meu curso", "#/curso"], ["Provas e trabalhos", "#/curso/agenda"]], titulo: `${TIPO_AVAL[a.tipo] || "Avaliação"}${a.titulo ? ": " + a.titulo : ""}`,
    sub: [a.data && `${dataBR(a.data)}${a.hora ? " " + a.hora : ""} (${quando(a.data)})`, nomeItem(g, a.disc), (+a.peso || 1) !== 1 && "peso " + fmtNota(a.peso)].filter(Boolean).map(esc).join(" · "),
    acoes: `<button class="btn sec mini" data-act="aval-editar" data-id="${esc(id)}">Editar</button><button class="btn sec mini perigo" data-act="aval-del" data-id="${esc(id)}">Apagar</button>`,
    html: `${a.conteudo ? `<section class="caixa"><h2 class="sec">Conteúdo</h2><p class="leitura">${esc(a.conteudo)}</p></section>` : ""}
      <section class="caixa"><h2 class="sec">Revisão até a data</h2>${rev.length ? `<div class="tarefas">${rev.map(p => `<div class="tarefa"><div class="o" style="${p.feito ? "text-decoration:line-through;color:var(--muted)" : ""}">${esc(p.titulo)}<small>${dataBR(p.data)} · ${p.nq} questões</small></div></div>`).join("")}</div>` : `<p class="muted">Sem sessões de revisão${(a.temas || []).length ? "" : " (a disciplina não tem temas vinculados)"}.</p>`}
        ${(a.temas || []).length && a.data >= hoje() ? `<div class="acoes"><button class="btn sec mini" data-act="aval-rev" data-id="${esc(id)}">${rev.length ? "Refazer revisão" : "Montar revisão"}</button>${IA.disponivel() ? `<a class="btn sec mini" href="#/curso/ajuda/nova/revisao/${esc(id)}">Pedir resumo à IA</a>` : ""}</div>` : ""}</section>
      <section class="caixa"><h2 class="sec">Depois da avaliação</h2>
        <form class="campos" data-form="aval-nota" data-id="${esc(id)}"><label class="campo"><span class="lab">Nota (0 a 10)</span><input type="text" inputmode="decimal" id="an-nota" value="${a.nota != null ? fmtNota(a.nota) : ""}"></label>
        <button class="btn sec" style="align-self:end">${a.disc ? "Salvar e lançar na disciplina" : "Salvar"}</button></form>
        <p class="small muted">Recebeu a prova corrigida? Envie em <a href="#/curso/ajuda">Correção e ajuda</a> para entender cada erro.</p></section>` };
});
ACOES["aval-editar"] = el => formAval(acad().aval[el.dataset.id]);
ACOES["aval-rev"] = el => { const n = montarRevisao(acad().aval[el.dataset.id]); toast(`${n} sessões de revisão no Planejamento`); atualizar(); };
ACOES["aval-del"] = el => abrirFolha(`<h2 class="sec">Apagar esta avaliação?</h2><p>As sessões de revisão ainda não feitas também saem do Planejamento.</p><button class="btn perigo" data-act="aval-del-ok" data-id="${esc(el.dataset.id)}">Apagar</button>`);
ACOES["aval-del-ok"] = el => { const A = acad(), P = store.doc("plano"), id = el.dataset.id;
  Object.keys(P.itens).forEach(k => { if (P.itens[k].aval === id && !P.itens[k].feito) delete P.itens[k]; }); store.mudou("plano");
  const nId = A.aval[id]?.notaId, d = A.aval[id]?.disc && A.disc[A.aval[id].disc]; if (d && nId) d.notas = (d.notas || []).filter(n => n.id !== nId);
  delete A.aval[id]; mudouAcad(); fecharFolha(); ir("#/curso/agenda"); };
FORMS["aval-nota"] = f => {
  const A = acad(), a = A.aval[f.dataset.id], v = $("#an-nota").value.trim(), nota = v === "" ? null : lerNota(v);
  a.nota = nota; a.feito = nota !== null || a.feito;
  if (a.disc && nota !== null) { const d = discOuNovo(a.disc); d.notas = d.notas || []; const nid = a.notaId || "n" + a.id, ex = d.notas.find(n => n.id === nid), g = minhaGrade();
    const reg = { id: nid, nome: a.titulo || `${TIPO_AVAL[a.tipo]} de ${dataBR(a.data)}`, valor: nota, peso: a.peso || 1 };
    if (ex) Object.assign(ex, reg); else d.notas.push(reg); a.notaId = nid; }
  mudouAcad(); toast("Nota salva"); atualizar();
};

/* ---------- Histórico escolar ---------- */
const HIST = { linhas: [], msg: "", ocupado: false };
rota("/curso/historico", () => {
  const g = minhaGrade(); if (!g) return semGrade();
  return { secao: "curso", crumbs: [["Meu curso", "#/curso"]], titulo: "Importar histórico escolar",
    sub: "Envie o PDF do histórico (ou cole o texto). O app procura o código de cada disciplina da sua matriz, a média e a situação. Nada é salvo sem sua revisão.",
    html: `<section class="caixa"><div class="linha"><label class="btn">Escolher arquivo<input type="file" accept=".pdf,.txt,.csv,.xlsx,.docx" data-chg="hist-arq" hidden></label></div>
      <label class="campo" style="margin-top:10px"><span class="lab">Ou cole o texto do histórico</span><textarea id="hist-txt" rows="5"></textarea></label>
      <div class="acoes"><button class="btn sec" data-act="hist-ler">Ler texto colado</button></div>${HIST.msg ? `<p class="aviso info">${esc(HIST.msg)}</p>` : ""}</section>
      ${HIST.linhas.length ? `<section><h2 class="sec">Revise (${HIST.linhas.length} disciplinas encontradas)</h2>
        ${tabela([{ t: "" }, { t: "Disciplina" }, { t: "Média", num: 1 }, { t: "Situação" }], HIST.linhas.map((l, k) => [`<input type="checkbox" data-chg="hist-marca" data-k="${k}" ${l.usar ? "checked" : ""} aria-label="Usar ${esc(l.nome)}" style="width:calc(20px * var(--k));height:calc(20px * var(--k))">`, `${esc(l.nome)} <span class="small muted">${esc(l.codigo)}${l.sem ? " · " + esc(l.sem) : ""}</span>`, fmtNota(l.media), pill(SIT[l.sit][0], SIT[l.sit][1])]), { resp: false })}
        <div class="acoes"><button class="btn azul grande" data-act="hist-aplicar">Salvar marcadas</button></div></section>` : ""}`,
    ctx: { grade: g.id } };
});
/** Interpretação por código: linha com o código da disciplina → média (0–10) e situação por palavras-chave. */
function lerHistorico(txt, g) {
  const L = String(txt).split(/\r?\n/), res = [];
  itensGrade(g).filter(it => it.codigo).forEach(it => {
    const re = new RegExp("\\b" + it.codigo.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "i");
    const idx = L.findIndex(l => re.test(l)); if (idx < 0) return;
    const cont = L[idx + 1] && !/\b[A-Z]{2,5}\d{2,3}\b/i.test(L[idx + 1]) ? L[idx + 1] : "", linha = (L[idx] + " " + cont).toUpperCase();   // a linha seguinte só conta se for continuação
    const num = re2 => (L[idx].match(re2) || []).map(x => parseFloat(x.replace(",", "."))).filter(n => n >= 0 && n <= 10);
    const dec = num(/(?<![\d/])\d{1,2}[.,]\d{1,2}(?![\d/])/g), ints = num(/(?<![\d/.,])(?:10|\d)(?![\d/.,])/g), nums = dec.length ? dec : ints;
    const sit = /REPROV|RF\b|RN\b/.test(linha) ? "reprovada" : /DISPENS|APROVEIT|EQUIVAL/.test(linha) ? "dispensada" : /TRANC|CANCEL/.test(linha) ? "trancada" : /MATRIC|CURSANDO|EM CURSO/.test(linha) ? "cursando" : /APROV|\bAP\b|CUMPRI/.test(linha) ? "concluida" : null;
    const sem = (L[idx].match(/\b(20\d\d)[./-]?([12])\b/) || []).slice(1).join("/") || null;
    const media = nums.length ? nums[nums.length - 1] : null;
    res.push({ id: it.id, codigo: it.codigo, nome: it.nome, media: sit === "cursando" ? null : media, sit: sit || (media !== null ? (media >= 5 ? "concluida" : "reprovada") : "concluida"), sem, usar: true });
  });
  return res;
}
async function processarHistorico(txt) {
  const g = minhaGrade(); HIST.linhas = lerHistorico(txt, g);
  HIST.msg = HIST.linhas.length ? `Encontrei ${HIST.linhas.length} de ${itensGrade(g).filter(x => x.codigo).length} disciplinas da matriz. Confira média e situação de cada uma antes de salvar (o critério de aprovação é o da sua faculdade).`
    : "Não encontrei códigos de disciplina da sua matriz neste texto. Confira se o histórico é do mesmo curso/matriz.";
  atualizar();
}
MUDANCAS["hist-arq"] = async el => { const f = el.files[0]; if (!f) return; HIST.msg = "Lendo o arquivo…"; atualizar();
  try { await processarHistorico(await textoDoArquivo(f)); } catch (e) { HIST.msg = "Não foi possível ler o arquivo. Tente colar o texto."; atualizar(); } };
ACOES["hist-ler"] = () => { const t = $("#hist-txt").value; if (t.trim()) processarHistorico(t); };
MUDANCAS["hist-marca"] = el => { HIST.linhas[+el.dataset.k].usar = el.checked; };
ACOES["hist-aplicar"] = () => { let n = 0;
  HIST.linhas.filter(l => l.usar).forEach(l => { const d = discOuNovo(l.id); d.sit = l.sit; if (l.media !== null) d.final = l.media; if (l.sem) d.sem = l.sem; n++; });
  mudouAcad(); HIST.linhas = []; HIST.msg = ""; toast(`${n} disciplinas atualizadas`); ir("#/curso"); };
