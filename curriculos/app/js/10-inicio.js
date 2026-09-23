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

function proximosDaFaculdade() {
  const P = store.doc("perfil"), g = P.gradeId && gradePorId(P.gradeId);
  if (!P.faculdade) return vazio("Escolha sua faculdade para ver aqui os próximos conteúdos do seu período.", `<a class="btn" href="#/medicina">Escolher faculdade</a>`);
  const inst = instPorId(P.faculdade);
  if (!g || !itensGrade(g).length) return `<div class="aviso">${esc(inst?.sigla || "")}: ${PENDENTE}. Importe a matriz oficial para acompanhar os conteúdos do período.</div><a class="btn sec" href="#/medicina/importar/${esc(P.faculdade)}">Importar matriz</a>`;
  const per = P.periodo || 1, itens = itensGrade(g).filter(i => i.periodo === per), vistos = temasEstudados();
  const pend = itens.flatMap(it => temasDoItem(it).filter(t => !vistos.has(t)).map(t => ({ t, it }))).slice(0, 8);
  if (!itens.length) return vazio(`Nenhuma disciplina cadastrada no ${per}º período.`, `<a class="btn sec" href="#/medicina/grade/${esc(g.id)}">Ver matriz</a>`);
  if (!pend.length) return `<p>${itens.length} disciplinas/módulos no ${per}º período.${itens.some(i => !temasDoItem(i).length) ? " Vincule temas às disciplinas para receber sugestões do que estudar." : " Todos os temas vinculados já foram estudados."}</p><a class="btn sec" href="#/medicina/grade/${esc(g.id)}/p/${per}">Abrir ${per}º período</a>`;
  return tabela([{ t: "Tema" }, { t: "Disciplina/módulo" }], pend.map(({ t, it }) => [linkTema(t), `<a href="#/medicina/grade/${esc(g.id)}/item/${esc(it.id)}">${esc(it.nome)}</a>`]));
}

rota("/", () => {
  const P = store.doc("perfil"), d = diaDe(hoje()), pend = pendencias(), metas = P.metas || { questoes: 20, minutos: 60 };
  const ag = agregados(), discs = listaPor(ag.por.disc, 3).sort((a, b) => a.p - b.p);
  const estudadosHoje = unicos(d.temas || []);
  const planoHoje = Object.values(store.doc("plano").itens).filter(p => p.data === hoje());
  const fazer = [];
  if (pend.cards.length) fazer.push([`${pend.cards.length} flashcard(s) para revisar`, `<a class="btn mini" href="#/flashcards/estudar">Estudar</a>`]);
  pend.temas.slice(0, 4).forEach(t => fazer.push([`Revisão do tema ${linkTema(t.id)} <span class="muted small">(${quando(t.srs.prox)})</span>`, `<a class="btn mini" href="#/revisoes/tema/${encodeURIComponent(t.id)}">Revisar</a>`]));
  if (pend.temas.length > 4) fazer.push([`+${pend.temas.length - 4} temas vencidos`, `<a class="btn mini sec" href="#/revisoes">Ver todos</a>`]);
  if (pend.erros.length) fazer.push([`${pend.erros.length} questão(ões) do caderno de erros para refazer`, `<a class="btn mini" href="#/revisoes/erros">Refazer por tema</a>`]);
  planoHoje.forEach(p => fazer.push([`<label class="check" style="padding:0"><input type="checkbox" data-chg="plano-feito" data-id="${esc(p.id)}" ${p.feito ? "checked" : ""}><span>${esc(p.titulo)}${p.tema ? " · " + linkTema(p.tema) : ""} <span class="muted small">${p.min ? p.min + " min" : ""}${p.nq ? " · " + p.nq + " questões" : ""}</span></span></label>`, p.tema ? `<a class="btn mini sec" href="#/tema/${encodeURIComponent(p.tema)}">Abrir</a>` : ""]));
  return {
    secao: "inicio", titulo: "Início", sub: new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" }),
    html: `${avisoBackup()}<div class="kpis">
      <div class="kpi"><b>${d.q}<small class="muted" style="font-size:14px">/${metas.questoes}</small></b><span>questões hoje</span>${medidor(pct(d.q, metas.questoes), "ok")}</div>
      <div class="kpi"><b>${d.q ? pct(d.ac, d.q) + "%" : "—"}</b><span>acerto hoje</span></div>
      <div class="kpi"><b>${Math.round((d.seg || 0) / 60)}<small class="muted" style="font-size:14px">/${metas.minutos} min</small></b><span>tempo de estudo</span>${medidor(pct((d.seg || 0) / 60, metas.minutos), "ok")}</div>
      <div class="kpi"><b>${sequencia()}</b><span>dias seguidos</span></div>
      <div class="kpi"><a href="#/revisoes"><b style="color:${pend.total ? "var(--bad)" : "inherit"}">${pend.total}</b><span>revisões pendentes</span></a></div>
    </div>
    <div class="grid g2" style="margin-top:14px">
      <section class="caixa"><h2 class="sec">Para fazer agora</h2>${fazer.length ? `<div class="pilha">${fazer.map(([a, b]) => `<div class="linha entre" style="flex-wrap:nowrap"><div>${a}</div>${b}</div>`).join("")}</div>` : vazio("Nada pendente. Que tal praticar questões ou planejar a semana?", `<a class="btn" href="#/questoes">Praticar questões</a><a class="btn sec" href="#/plano">Planejar</a>`)}</section>
      <section class="caixa"><h2 class="sec">Próximos conteúdos da faculdade ${P.faculdade ? pill((instPorId(P.faculdade)?.sigla || "") + (P.periodo ? ` · ${P.periodo}º período` : "")) : ""}</h2>${proximosDaFaculdade()}</section>
    </div>
    <section><h2 class="sec">Estudado hoje <span class="muted small">${estudadosHoje.length} assunto(s)</span></h2>${estudadosHoje.length ? `<div class="chips">${estudadosHoje.map(t => `<a class="chip" href="#/tema/${encodeURIComponent(t)}">${esc(nomeTema(t))}</a>`).join("")}</div>` : `<p class="muted">Nenhum assunto ainda hoje.</p>`}</section>
    <div class="grid g2">
      <section><h2 class="sec">Evolução — 14 dias <a class="small" href="#/desempenho">detalhes</a></h2>${blocoEvolucao()}</section>
      <section><h2 class="sec">Por semana</h2>${semanas()}</section>
    </div>
    <div class="grid g2">
      <section><h2 class="sec">Disciplinas com pior desempenho</h2>${discs.length ? `<div class="barras">${discs.slice(0, 4).map(x => barra(esc(x.k), x.ac, x.n)).join("")}</div>` : `<p class="muted">Responda ao menos 3 questões de uma disciplina para aparecer aqui.</p>`}</section>
      <section><h2 class="sec">Melhor desempenho</h2>${discs.length ? `<div class="barras">${discs.slice(-4).reverse().map(x => barra(esc(x.k), x.ac, x.n)).join("")}</div>` : `<p class="muted">—</p>`}</section>
    </div>
    <section><h2 class="sec">Metas diárias</h2><form class="linha" data-form="metas">
      <label class="campo"><span class="lab">Questões/dia</span><input type="number" id="meta-q" min="0" max="500" value="${metas.questoes}"></label>
      <label class="campo"><span class="lab">Minutos/dia</span><input type="number" id="meta-m" min="0" max="900" value="${metas.minutos}"></label>
      <button class="btn sec" style="align-self:end">Salvar metas</button></form></section>`,
  };
});
FORMS.metas = () => {
  const q = Math.max(0, Math.min(500, +$("#meta-q").value || 0)), m = Math.max(0, Math.min(900, +$("#meta-m").value || 0));
  const P = store.doc("perfil"); P.metas = { questoes: q, minutos: m }; store.mudou("perfil"); toast("Metas salvas"); atualizar();
};
MUDANCAS["plano-feito"] = el => { const P = store.doc("plano"); const p = P.itens[el.dataset.id]; if (!p) return; p.feito = el.checked; if (p.feito && p.rev && p.tema) estudarTema(p.tema); store.mudou("plano"); atualizar(); };
