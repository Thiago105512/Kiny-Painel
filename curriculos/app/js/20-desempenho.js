/* ============================================================
   20-desempenho — métricas calculadas a partir das tentativas registradas.
   ============================================================ */
const DV = { aba: "disciplina", trilha: "" };
/** Os pontos mais fracos primeiro, só com base suficiente (3+ respostas). */
function tabelaDesempenho(lista, rotulo, fmt = k => esc(k)) {
  const l = lista.filter(x => x.n >= 3).sort((a, b) => a.p - b.p);
  if (!l.length) return vazio("Responda ao menos 3 questões de um assunto para ele aparecer aqui.");
  return `<div class="barras">${l.slice(0, 8).map(x => barra(fmt(x.k), x.ac, x.n)).join("")}</div>${l.length > 8 ? `<p class="small muted">+${l.length - 8} com melhor desempenho</p>` : ""}`;
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
  const temTempo = Object.values(D).some(d => d.seg >= 60), sem = semanasComDados(4);
  return {
    secao: "desempenho", titulo: "Desempenho",
    html: `${chips([["", "Tudo"], ["med", "Medicina"], ["enem", "ENEM"], ["direito", "Direito"], ["oab", "OAB"]], DV.trilha, "dv-trilha")}
      <div class="kpis"><div class="kpi"><b>${ag.n ? pct(ag.ac, ag.n) + "%" : "—"}</b><span>acerto geral</span></div><div class="kpi"><b>${ag.n}</b><span>respostas</span></div>
        <div class="kpi"><b>${ag.vistas}<small class="muted" style="font-size:13px"> / ${questoes().filter(filtro).length}</small></b><span>questões vistas</span></div><div class="kpi"><b>${horas(segTotal)}</b><span>tempo de estudo</span></div></div>
      <section><h2 class="sec">Onde melhorar</h2>${abas([["disciplina", "Disciplinas"], ["tema", "Temas"], ["especialidade", "Especialidades"], ["enem", "ENEM"]], DV.aba, "dv-aba")}${tab}</section>
      <section><h2 class="sec">Questões nos últimos 14 dias</h2>${blocoEvolucao(14)}</section>
      ${temTempo ? `<section><h2 class="sec">Minutos de estudo</h2>${colunasTempo()}</section>` : ""}
      ${sem ? `<section><h2 class="sec">Por semana</h2>${sem}</section>` : ""}
      ${sims.length ? `<section><h2 class="sec">Simulados</h2>${evolucaoSim(null)}<div class="barras" style="margin-top:10px">${sims.slice(-5).reverse().map(barraSim).join("")}</div></section>` : ""}
      <p class="small muted">Tempo médio por questão: ${ag.nms ? mmss(ag.ms / ag.nms) : "—"} · flashcards consolidados: ${cs.filter(c => c.srs.etapa >= 2).length}/${cs.length} · sequência: ${sequencia()} dia(s)</p>`,
  };
});
ACOES["dv-aba"] = el => { DV.aba = el.dataset.v; atualizar(); };
ACOES["dv-trilha"] = el => { DV.trilha = el.dataset.v; atualizar(); };
/** Semanas com algum estudo (as vazias não aparecem). */
function semanasComDados(n = 4) {
  const D = store.doc("dias").d, linhas = [];
  for (let w = 0; w < n; w++) {
    let q = 0, ac = 0, seg = 0;
    for (let i = 0; i < 7; i++) { const d = D[somaDias(hoje(), -(w * 7 + i))]; if (d) { q += d.q || 0; ac += d.ac || 0; seg += d.seg || 0; } }
    if (q || seg >= 60) linhas.push([w === 0 ? "Esta semana" : `Há ${w} semana${w > 1 ? "s" : ""}`, q, q ? pct(ac, q) + "%" : "—", horas(seg)]);
  }
  return linhas.length ? tabela([{ t: "Semana" }, { t: "Questões", num: 1 }, { t: "Acerto", num: 1 }, { t: "Tempo", num: 1 }], linhas) : "";
}
