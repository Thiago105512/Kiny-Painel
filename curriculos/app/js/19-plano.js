/* ============================================================
   19-plano — planejamento diário, semanal e mensal.
   Cada item: disciplina, tema, tempo previsto, nº de questões, revisão, concluído.
   ============================================================ */
const PV = { vista: "semana", data: hoje() };
const itensPlano = () => Object.values(store.doc("plano").itens);
const inicioSemana = iso => { const d = new Date(iso + "T12:00"); return somaDias(iso, -((d.getDay() + 6) % 7)); };
function linhaPlano(p) {
  return `<div class="linha entre" style="flex-wrap:nowrap;padding:6px 0;border-bottom:1px solid var(--line2)">
    <label class="check" style="padding:0;flex:1;min-width:0"><input type="checkbox" data-chg="plano-feito" data-id="${esc(p.id)}" ${p.feito ? "checked" : ""}>
      <span style="${p.feito ? "text-decoration:line-through;color:var(--muted)" : ""}">${esc(p.titulo || nomeTema(p.tema) || p.disciplina || "Estudo")}${p.tema && p.titulo ? " · " + linkTema(p.tema) : ""}
      <span class="small muted">${[p.disciplina, p.min && p.min + " min", p.nq && p.nq + " questões", p.rev && "com revisão"].filter(Boolean).map(esc).join(" · ")}</span></span></label>
    <span class="linha" style="flex-wrap:nowrap">${p.tema && !p.feito ? `<button class="btn mini" data-act="plano-comecar" data-id="${esc(p.id)}">Começar</button>` : ""}<button class="btn mini sec" data-act="plano-del" data-id="${esc(p.id)}" aria-label="Remover">×</button></span></div>`;
}
rota("/plano", () => {
  const todos = itensPlano(), doDia = d => todos.filter(p => p.data === d);
  let corpo = "", titulo = "";
  if (PV.vista === "dia") {
    titulo = new Date(PV.data + "T12:00").toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" });
    const l = doDia(PV.data); corpo = l.length ? l.map(linhaPlano).join("") : vazio("Nada planejado para este dia.");
  } else if (PV.vista === "semana") {
    const ini = inicioSemana(PV.data); titulo = `Semana de ${dataBR(ini)} a ${dataBR(somaDias(ini, 6))}`;
    corpo = Array.from({ length: 7 }, (_, i) => somaDias(ini, i)).map(d => { const l = doDia(d), min = l.reduce((s, p) => s + (+p.min || 0), 0);
      return `<section style="margin-bottom:10px"><h3 style="${d === hoje() ? "color:var(--pen)" : ""}">${new Date(d + "T12:00").toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "2-digit" })}${min ? ` · ${horas(min * 60)}` : ""} <button class="btn mini sec" data-act="plano-novo" data-d="${d}" style="margin-left:6px">+</button></h3>${l.length ? l.map(linhaPlano).join("") : `<p class="small muted" style="margin:0">—</p>`}</section>`; }).join("");
  } else {
    const [a, m] = PV.data.split("-").map(Number), prim = `${a}-${String(m).padStart(2, "0")}-01`, ini = inicioSemana(prim);
    titulo = new Date(prim + "T12:00").toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
    corpo = `<div class="mes">${["seg", "ter", "qua", "qui", "sex", "sáb", "dom"].map(d => `<div class="dow">${d}</div>`).join("")}${Array.from({ length: 42 }, (_, i) => somaDias(ini, i)).map(d => { const l = doDia(d);
      return `<button class="dia ${d.slice(5, 7) !== prim.slice(5, 7) ? "fora" : ""} ${d === hoje() ? "hoje" : ""}" data-act="plano-dia" data-d="${d}" aria-label="${dataBR(d)}: ${l.length} itens"><b>${+d.slice(8)}</b>${l.slice(0, 2).map(p => `<i>${p.feito ? "✓ " : ""}${esc(p.titulo || nomeTema(p.tema) || p.disciplina || "estudo")}</i>`).join("")}${l.length > 2 ? `<i>+${l.length - 2}</i>` : ""}</button>`; }).join("")}</div>`;
  }
  const passo = { dia: 1, semana: 7, mes: 30 }[PV.vista];
  const semana = todos.filter(p => p.data >= inicioSemana(hoje()) && p.data <= somaDias(inicioSemana(hoje()), 6));
  return {
    secao: "plano", titulo: "Planejamento", sub: `Esta semana: ${semana.filter(p => p.feito).length}/${semana.length} concluídos · ${horas(semana.reduce((s, p) => s + (+p.min || 0), 0) * 60)} previstos`,
    acoes: `<button class="btn" data-act="plano-novo" data-d="${PV.vista === "dia" ? PV.data : hoje()}">+ Adicionar</button>`,
    html: `${abas([["dia", "Dia"], ["semana", "Semana"], ["mes", "Mês"]], PV.vista, "plano-vista")}
      <div class="linha entre" style="margin-bottom:10px"><button class="btn sec mini" data-act="plano-mover" data-n="-${passo}" aria-label="Anterior">‹</button><b style="text-transform:capitalize">${esc(titulo)}</b><span class="linha"><button class="btn sec mini" data-act="plano-hoje">Hoje</button><button class="btn sec mini" data-act="plano-mover" data-n="${passo}" aria-label="Próximo">›</button></span></div>
      ${corpo}`,
  };
});
ACOES["plano-vista"] = el => { PV.vista = el.dataset.v; atualizar(); };
ACOES["plano-mover"] = el => { const n = +el.dataset.n; PV.data = PV.vista === "mes" ? diaISO(new Date(+PV.data.slice(0, 4), +PV.data.slice(5, 7) - 1 + Math.sign(n), 1)) : somaDias(PV.data, n); atualizar(); };
ACOES["plano-hoje"] = () => { PV.data = hoje(); atualizar(); };
ACOES["plano-dia"] = el => { PV.data = el.dataset.d; PV.vista = "dia"; atualizar(); };
ACOES["plano-del"] = el => { const P = store.doc("plano"); delete P.itens[el.dataset.id]; store.mudou("plano"); atualizar(); };
ACOES["plano-comecar"] = el => {
  const p = store.doc("plano").itens[el.dataset.id];
  if (p.nq && p.tema) { const ids = embaralhar(questoes().filter(q => q.tema === p.tema)).slice(0, p.nq).map(q => q.id); if (ids.length) return praticar(ids, "Plano: " + (p.titulo || nomeTema(p.tema))); }
  ir("#/tema/" + encodeURIComponent(p.tema));
};
function disciplinasSugeridas() {
  const P = store.doc("perfil"), g = P.gradeId && gradePorId(P.gradeId);
  const daGrade = g ? itensGrade(g).filter(i => !P.periodo || i.periodo === P.periodo).map(i => i.nome) : [];
  return unicos([...daGrade, ...questoes().map(q => q.disc)]).slice(0, 200);
}
ACOES["plano-novo"] = el => abrirFolha(`<h2 class="sec">Adicionar ao planejamento</h2><form class="pilha" data-form="plano-salvar">
  <div class="campos"><label class="campo"><span class="lab">Data</span><input type="date" id="pl-data" value="${esc(el.dataset.d || hoje())}" required></label>
  <label class="campo"><span class="lab">Repetir</span><select id="pl-rep"><option value="0">Não</option><option value="7">Toda semana (4×)</option><option value="1">Todo dia (7×)</option></select></label></div>
  <label class="campo"><span class="lab">Disciplina</span><input type="text" id="pl-disc" list="dl-disc"><datalist id="dl-disc">${disciplinasSugeridas().map(d => `<option value="${esc(d)}">`).join("")}</datalist></label>
  ${campoTema("pl-tema", PAGINA?.ctx?.tema)}
  <label class="campo"><span class="lab">Título (opcional)</span><input type="text" id="pl-tit" placeholder="ex.: Ler capítulo, aula, resumo"></label>
  <div class="campos"><label class="campo"><span class="lab">Tempo previsto (min)</span><input type="number" id="pl-min" min="0" max="600" value="45"></label>
  <label class="campo"><span class="lab">Questões</span><input type="number" id="pl-nq" min="0" max="200" value="10"></label></div>
  <label class="check"><input type="checkbox" id="pl-rev" checked><span>Programar revisão espaçada do tema ao concluir</span></label>
  <button class="btn">Adicionar</button></form>`);
FORMS["plano-salvar"] = () => {
  const data = $("#pl-data").value, tema = lerTema("pl-tema"), disc = $("#pl-disc").value.trim(), tit = $("#pl-tit").value.trim();
  if (!data) return; if (!tema && !disc && !tit) { toast("Informe disciplina, tema ou título"); return; }
  const rep = +$("#pl-rep").value, vezes = rep === 7 ? 4 : rep === 1 ? 7 : 1, P = store.doc("plano");
  for (let k = 0; k < vezes; k++) { const id = novoId("p"); P.itens[id] = { id, data: somaDias(data, k * (rep || 0)), titulo: tit, tema, disciplina: disc || null, min: +$("#pl-min").value || 0, nq: +$("#pl-nq").value || 0, rev: $("#pl-rev").checked, feito: false }; }
  store.mudou("plano"); fecharFolha(); toast("Adicionado ao planejamento"); atualizar();
};
