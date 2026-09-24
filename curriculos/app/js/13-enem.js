/* ============================================================
   13-enem — ENEM e vestibulares: Área → Disciplina → Assunto (tema) → Subassunto.
   ============================================================ */
const CRUMB_ENEM = ["ENEM", "#/enem"];
const idsDaArea = area => questoes().filter(q => q.t === "enem" && q.ae === area).map(q => q.id);
const btnPraticarArea = a => { const ids = idsDaArea(a.id); return ids.length ? `<button class="btn sec mini" data-act="praticar-ids" data-ids="${ids.join(",")}" data-ctx="ENEM ${esc(a.nome)}">Praticar a área (${ids.length})</button>` : ""; };
const temasEnemDe = discId => Object.values(TEMAS).filter(t => t.dominio === "enem" && t.disciplinaId === discId);
function resumoDisc(discId) {
  const ts = temasEnemDe(discId).map(t => t.id), qs = questoes().filter(q => q.t === "enem" && ts.includes(q.tema)), a = agregados(q => q.t === "enem" && ts.includes(q.tema));
  return { assuntos: ts.length, questoes: qs.length, ids: qs.map(q => q.id), a };
}
rota("/enem", () => ({
  secao: "enem", titulo: "ENEM e vestibulares", sub: "Organizado pela Matriz de Referência do ENEM (resumo para estudo). Serve também para PSC/UFAM e SIS/UEA.",
  acoes: `<a class="btn" href="#/simulados">Simulado</a><a class="btn sec" href="#/redacao">Redação</a>`,
  html: ENEM_AREAS.map(a => `<section><div class="linha entre"><h2 class="sec"><a href="#/enem/${esc(a.id)}" style="color:inherit;text-decoration:none">${esc(a.nome)}</a></h2>${a.id === "redacao" ? "" : btnPraticarArea(a)}</div>
    ${a.id === "redacao" ? `<p><a class="btn sec" href="#/redacao">Abrir módulo de redação</a></p>` : tabela([{ t: "Disciplina" }, { t: "Assuntos", num: 1 }, { t: "Questões", num: 1 }, { t: "Acerto", num: 1 }], (a.disciplinas || []).map(d => { const r = resumoDisc(d.id); return [`<a href="#/enem/${esc(a.id)}/${esc(d.id)}">${esc(d.nome)}</a>`, r.assuntos, r.questoes, r.a.n ? pct(r.a.ac, r.a.n) + "%" : "—"]; }))}</section>`).join("")
    + `<p class="small muted">Guias de formato das provas (FUVEST, Unicamp, UERJ, PSC, SIS…) estão em <a href="#/biblioteca/guia">Biblioteca → Guias de referência</a>.</p>`,
}));
rota("/enem/:area", ({ area }) => {
  const a = ENEM_AREAS.find(x => x.id === area); if (!a) return paginaNaoEncontrada();
  if (area === "redacao") { location.hash = "#/redacao"; return { html: "" }; }
  return { secao: "enem", crumbs: [CRUMB_ENEM], titulo: a.nome, acoes: btnPraticarArea(a),
    html: tabela([{ t: "Disciplina" }, { t: "Assuntos", num: 1 }, { t: "Questões", num: 1 }, { t: "Acerto", num: 1 }], (a.disciplinas || []).map(d => { const r = resumoDisc(d.id); return [`<a href="#/enem/${esc(a.id)}/${esc(d.id)}">${esc(d.nome)}</a>`, r.assuntos, r.questoes, r.a.n ? pct(r.a.ac, r.a.n) + "%" : "—"]; })) };
});
rota("/enem/:area/:disc", ({ area, disc }) => {
  const a = ENEM_AREAS.find(x => x.id === area), d = ENEM_DISC[disc]; if (!a || !d) return paginaNaoEncontrada();
  const r = resumoDisc(disc), R = store.doc("revisoes").temas;
  return {
    secao: "enem", crumbs: [CRUMB_ENEM, [a.nome, "#/enem/" + area]], titulo: d.nome,
    acoes: r.ids.length ? `<button class="btn" data-act="praticar-ids" data-ids="${r.ids.join(",")}" data-ctx="ENEM ${esc(d.nome)}">Praticar ${r.ids.length} questões</button><a class="btn sec" href="#/simulados?disc=${encodeURIComponent(d.nome)}" data-act="sim-disc" data-v="${esc(d.nome)}">Simulado de ${esc(d.nome)}</a>` : "",
    html: tabela([{ t: "Assunto" }, { t: "Subassuntos" }, { t: "Questões", num: 1 }, { t: "Acerto", num: 1 }, { t: "Revisão" }],
      temasEnemDe(disc).map(t => { const dt = desempenhoTema(t.id); return [linkTema(t.id), `<span class="small">${(t.subtemas || []).map(s => esc(s.nome)).join(" · ")}</span>`, dt.total, dt.n ? pct(dt.ac, dt.n) + "%" : "—", R[t.id] ? quando(R[t.id].prox) : "—"]; }), { vaziaMsg: "Sem assuntos cadastrados." }),
    ctx: { disciplina: d.nome, texto: "Área do ENEM: " + a.nome },
  };
});
