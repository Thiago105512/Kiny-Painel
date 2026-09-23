/* ============================================================
   10-inicio — painel com o que importa hoje (tudo calculado do uso real)
   ============================================================ */
function temasEstudados() { const s = new Set(); Object.values(store.doc("dias").d).forEach(d => (d.temas || []).forEach(t => s.add(t))); return s; }

function blocoEvolucao(nDias = 14) {
  const D = store.doc("dias").d, dias = [];
  for (let i = nDias - 1; i >= 0; i--) { const k = somaDias(hoje(), -i); dias.push({ k, ...(D[k] || { q: 0, ac: 0, seg: 0 }) }); }
  const max = Math.max(1, ...dias.map(d => d.q));
  return `<div class="colunas" role="img" aria-label="Questões por dia nos últimos ${nDias} dias">${dias.map(d => `<div class="col ${d.k === hoje() ? "hoje" : ""}" title="${dataBR(d.k)}: ${d.q} questões, ${pct(d.ac, d.q)}% de acerto, ${horas(d.seg || 0)}"><em>${d.q || ""}</em><i style="height:${d.q / max * 100}%"></i><small>${d.k.slice(8)}</small></div>`).join("")}</div>`;
}
function semanas(n = 4) {
  const D = store.doc("dias").d, linhas = [];
  for (let w = 0; w < n; w++) {
    let q = 0, ac = 0, seg = 0;
    for (let i = 0; i < 7; i++) { const d = D[somaDias(hoje(), -(w * 7 + i))]; if (d) { q += d.q || 0; ac += d.ac || 0; seg += d.seg || 0; } }
    linhas.push([w === 0 ? "Últimos 7 dias" : `${w * 7 + 1}–${w * 7 + 7} dias atrás`, q, q ? pct(ac, q) + "%" : "—", horas(seg)]);
  }
  return tabela([{ t: "Semana" }, { t: "Questões", num: 1 }, { t: "Acerto", num: 1 }, { t: "Tempo", num: 1 }], linhas);
}

/** Uma linha sobre a faculdade: o próximo conteúdo do período ou o que falta configurar. */
function linhaFaculdade() {
  const P = store.doc("perfil"), g = P.gradeId && gradePorId(P.gradeId);
  if (!P.faculdade) return `<div class="faixa"><p>Escolha sua faculdade para ver os conteúdos do seu período.</p><a class="btn sec mini" href="#/medicina">Escolher</a></div>`;
  const sig = esc(instPorId(P.faculdade)?.sigla || "");
  if (!g || !itensGrade(g).length) return `<div class="faixa"><p><b>${sig}</b> · <span class="muted">matriz ainda não importada</span></p><a class="btn sec mini" href="#/medicina/inst/${esc(P.faculdade)}">Importar</a></div>`;
  const per = P.periodo || 1, itens = itensGrade(g).filter(i => i.periodo === per), vistos = temasEstudados();
  const prox = itens.flatMap(it => temasDoItem(it).filter(t => !vistos.has(t)).map(t => ({ t, it })))[0];
  return `<div class="faixa"><p><b>${sig} · ${per}º período</b><br><span class="small muted">${prox ? `Próximo: ${linkTema(prox.t)} (${esc(prox.it.nome)})` : `${itens.length} disciplinas/módulos${itens.some(i => !temasDoItem(i).length) ? " · vincule temas para receber sugestões" : ""}`}</span></p><a class="btn sec mini" href="#/medicina/grade/${esc(g.id)}/p/${per}">Abrir período</a></div>`;
}

rota("/", () => {
  const P = store.doc("perfil"), d = diaDe(hoje()), pend = pendencias(), metas = P.metas || { questoes: 20, minutos: 60 };
  const min = Math.round((d.seg || 0) / 60), estudados = unicos(d.temas || []);
  const fracas = listaPor(agregados().por.disc, 3).sort((a, b) => a.p - b.p).slice(0, 3);
  // Tarefas em ordem de prioridade; no máximo 5 visíveis
  const tarefas = [];
  pend.temas.forEach(t => tarefas.push({ o: `Revisar ${linkTema(t.id)}`, s: quando(t.srs.prox), b: `<a class="btn mini" href="#/revisoes/tema/${encodeURIComponent(t.id)}">Revisar</a>` }));
  if (pend.erros.length) tarefas.push({ o: `Refazer ${pend.erros.length} questão(ões) que você errou`, s: "caderno de erros", b: `<a class="btn mini" href="#/revisoes/erros">Refazer</a>` });
  if (pend.cards.length) tarefas.push({ o: `${pend.cards.length} flashcard(s)`, s: "revisão de hoje", b: `<a class="btn mini" href="#/flashcards/estudar">Estudar</a>` });
  Object.values(store.doc("plano").itens).filter(p => p.data === hoje()).forEach(p => tarefas.push({ o: `<label class="check" style="padding:0"><input type="checkbox" data-chg="plano-feito" data-id="${esc(p.id)}" ${p.feito ? "checked" : ""}><span style="${p.feito ? "text-decoration:line-through;color:var(--muted)" : ""}">${esc(p.titulo || nomeTema(p.tema) || p.disciplina || "Estudo planejado")}</span></label>`, s: [p.min && p.min + " min", p.nq && p.nq + " questões"].filter(Boolean).join(" · ") || "planejado", b: p.tema && !p.feito ? `<a class="btn mini sec" href="#/tema/${encodeURIComponent(p.tema)}">Abrir</a>` : "" }));
  const visiveis = tarefas.slice(0, 5);
  return {
    secao: "inicio", titulo: "Hoje", sub: new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" }),
    acoes: `<button class="btn sec mini" data-act="metas-editar">Metas</button>`,
    html: `${avisoBackup()}
    <section class="caixa"><div class="metas">
      <div class="meta-item"><span>Questões</span><b>${d.q}<small class="muted" style="font-size:13px"> / ${metas.questoes}</small></b>${medidor(pct(d.q, metas.questoes), "ok")}</div>
      <div class="meta-item"><span>Tempo de estudo</span><b>${min}<small class="muted" style="font-size:13px"> / ${metas.minutos} min</small></b>${medidor(pct(min, metas.minutos), "ok")}</div>
      <div class="meta-item"><span>Acerto hoje</span><b>${d.q ? pct(d.ac, d.q) + "%" : "—"}</b></div>
      <div class="meta-item"><span>Sequência</span><b>${sequencia()} ${sequencia() === 1 ? "dia" : "dias"}</b></div>
    </div></section>
    <section><h2 class="sec">Para fazer agora ${tarefas.length > 5 ? `<a class="small" href="#/revisoes">ver tudo (${tarefas.length})</a>` : ""}</h2>
      ${visiveis.length ? `<div class="tarefas">${visiveis.map(t => `<div class="tarefa"><div class="o">${t.o}<small>${t.s}</small></div>${t.b}</div>`).join("")}</div>`
        : vazio("Tudo em dia. Pratique algumas questões ou planeje a semana.", `<a class="btn" href="#/questoes">Praticar</a><a class="btn sec" href="#/plano">Planejar</a>`)}</section>
    <section><h2 class="sec">Sua faculdade</h2>${linhaFaculdade()}</section>
    ${estudados.length ? `<section><h2 class="sec">Estudado hoje</h2><p style="margin:0">${estudados.slice(0, 4).map(linkTema).join(" · ")}${estudados.length > 4 ? ` <span class="muted">e mais ${estudados.length - 4}</span>` : ""}</p></section>` : ""}
    ${fracas.length ? `<section><h2 class="sec">Onde focar <a class="small" href="#/desempenho">desempenho</a></h2><div class="barras">${fracas.map(x => barra(esc(x.k), x.ac, x.n)).join("")}</div></section>` : ""}`,
  };
});
ACOES["metas-editar"] = () => { const m = store.doc("perfil").metas || { questoes: 20, minutos: 60 };
  abrirFolha(`<form class="pilha" data-form="metas"><div class="campos">
    <label class="campo"><span class="lab">Questões por dia</span><input type="number" id="meta-q" min="0" max="500" value="${m.questoes}"></label>
    <label class="campo"><span class="lab">Minutos por dia</span><input type="number" id="meta-m" min="0" max="900" value="${m.minutos}"></label></div>
    <button class="btn">Salvar metas</button></form>`, { titulo: "Metas diárias" }); };
FORMS.metas = () => {
  const q = Math.max(0, Math.min(500, +$("#meta-q").value || 0)), m = Math.max(0, Math.min(900, +$("#meta-m").value || 0));
  const P = store.doc("perfil"); P.metas = { questoes: q, minutos: m }; store.mudou("perfil"); fecharFolha(); toast("Metas salvas"); atualizar();
};
MUDANCAS["plano-feito"] = el => { const P = store.doc("plano"); const p = P.itens[el.dataset.id]; if (!p) return; p.feito = el.checked; if (p.feito && p.rev && p.tema) estudarTema(p.tema); store.mudou("plano"); atualizar(); };
