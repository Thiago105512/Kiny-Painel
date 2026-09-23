/* ============================================================
   20-desempenho — métricas calculadas a partir das tentativas registradas.
   ============================================================ */
const DV = { aba: "disciplina", trilha: "" };
function tabelaDesempenho(lista, rotulo, fmt = k => esc(k)) {
  return tabela([{ t: rotulo }, { t: "Respostas", num: 1 }, { t: "Acerto", num: 1 }, { t: "" }], lista.sort((a, b) => a.p - b.p).map(x => [fmt(x.k), x.n, Math.round(x.p * 100) + "%", `<div style="min-width:90px">${medidor(x.p * 100, x.p < .5 ? "bad" : "")}</div>`]), { vaziaMsg: "Sem respostas ainda." });
}
function colunasTempo(nDias = 14) {
  const D = store.doc("dias").d, dias = Array.from({ length: nDias }, (_, i) => somaDias(hoje(), i - nDias + 1)).map(k => ({ k, m: Math.round((D[k]?.seg || 0) / 60) }));
  const max = Math.max(1, ...dias.map(d => d.m));
  return `<div class="colunas" role="img" aria-label="Minutos de estudo por dia">${dias.map(d => `<div class="col ${d.k === hoje() ? "hoje" : ""}" title="${dataBR(d.k)}: ${d.m} min"><em>${d.m || ""}</em><i style="height:${d.m / max * 100}%"></i><small>${d.k.slice(8)}</small></div>`).join("")}</div>`;
}
rota("/desempenho", () => {
  const filtro = q => !DV.trilha || (DV.trilha === "med" ? TRILHAS[q.t]?.dominio === "medicina" : q.t === DV.trilha);
  const ag = agregados(filtro), D = store.doc("dias").d, segTotal = Object.values(D).reduce((s, d) => s + (d.seg || 0), 0);
  const cs = cards(), sims = store.doc("simulados").hist;
  let tab = "";
  if (DV.aba === "disciplina") tab = tabelaDesempenho(listaPor(ag.por.disc), "Disciplina");
  else if (DV.aba === "especialidade") tab = tabelaDesempenho(listaPor(ag.por.esp), "Especialidade", k => ESPECIALIDADES[k] ? `<a href="#/medicina/esp/${esc(k)}">${esc(ESPECIALIDADES[k].nome)}</a>` : esc(k));
  else if (DV.aba === "tema") tab = tabelaDesempenho(listaPor(ag.por.tema), "Tema", linkTema);
  else if (DV.aba === "enem") {
    const porA = {}; for (const [t, v] of Object.entries(ag.por.tema)) { const a = TEMAS[t]?.dominio === "enem" ? TEMAS[t].areaNome : null; if (!a) continue; const x = porA[a] = porA[a] || { n: 0, ac: 0 }; x.n += v.n; x.ac += v.ac; }
    tab = tabelaDesempenho(listaPor(porA), "Área do ENEM");
  }
  else if (DV.aba === "trilha") tab = tabelaDesempenho(listaPor(ag.por.trilha), "Trilha", k => esc(TRILHAS[k]?.nome || k));
  return {
    secao: "desempenho", titulo: "Desempenho",
    html: `<div class="linha" style="margin-bottom:12px">${chips([["", "Tudo"], ["med", "Medicina"], ["enem", "ENEM"], ["direito", "Direito"], ["oab", "OAB"]], DV.trilha, "dv-trilha")}</div>
      <div class="kpis"><div class="kpi"><b>${ag.n ? pct(ag.ac, ag.n) + "%" : "—"}</b><span>acerto geral</span></div><div class="kpi"><b>${ag.n}</b><span>respostas</span></div>
        <div class="kpi"><b>${ag.vistas}/${questoes().filter(filtro).length}</b><span>questões vistas</span></div><div class="kpi"><b>${ag.nms ? mmss(ag.ms / ag.nms) : "—"}</b><span>tempo médio/questão</span></div>
        <div class="kpi"><b>${horas(segTotal)}</b><span>tempo de estudo total</span></div><div class="kpi"><b>${sequencia()}</b><span>dias seguidos</span></div>
        <div class="kpi"><b>${cs.filter(c => c.srs.etapa >= 2).length}/${cs.length}</b><span>flashcards consolidados</span></div><div class="kpi"><b>${sims.length}</b><span>simulados</span></div></div>
      <div class="grid g2"><section><h2 class="sec">Questões por dia (30 dias)</h2>${blocoEvolucao(30)}</section><section><h2 class="sec">Minutos de estudo (14 dias)</h2>${colunasTempo()}</section></div>
      <h2 class="sec">Evolução semanal</h2>${semanas(8)}
      <h2 class="sec">Onde melhorar</h2>${abas([["disciplina", "Disciplinas"], ["especialidade", "Especialidades"], ["tema", "Temas"], ["enem", "Áreas do ENEM"], ["trilha", "Trilhas"]], DV.aba, "dv-aba")}${tab}
      <h2 class="sec">Simulados</h2>${evolucaoSim(null)}${sims.length ? `<div class="barras" style="margin-top:10px">${sims.slice(-10).reverse().map(barraSim).join("")}</div>` : `<p class="muted">Nenhum simulado feito.</p>`}`,
  };
});
ACOES["dv-aba"] = el => { DV.aba = el.dataset.v; atualizar(); };
ACOES["dv-trilha"] = el => { DV.trilha = el.dataset.v; atualizar(); };
