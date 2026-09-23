/* ============================================================
   16-revisoes — agenda unificada de revisão espaçada:
   temas (questões + releitura), flashcards e caderno de erros.
   ============================================================ */
rota("/revisoes", () => {
  const p = pendencias(), R = store.doc("revisoes").temas;
  const prox = [];
  for (let i = 1; i <= 14; i++) {
    const d = somaDias(hoje(), i);
    const t = Object.values(R).filter(s => s.prox === d).length, c = cards().filter(x => x.srs.prox === d).length, e = Object.values(store.doc("erros").itens).filter(x => x.status === "aberto" && x.srs?.prox === d).length;
    if (t + c + e) prox.push([dataBR(d) + ` <span class="muted small">${new Date(d + "T12:00").toLocaleDateString("pt-BR", { weekday: "short" })}</span>`, t || "—", c || "—", e || "—"]);
  }
  return {
    secao: "revisoes", titulo: "Revisões", sub: "Intervalos base de 1, 7, 30 e 90 dias. Acertar adianta a próxima etapa; errar volta ao início.",
    html: `<div class="kpis"><div class="kpi"><b>${p.temas.length}</b><span>temas vencidos</span></div><div class="kpi"><b>${p.cards.length}</b><span>flashcards</span></div><div class="kpi"><b>${p.erros.length}</b><span>erros para refazer</span></div></div>
      ${p.total ? "" : `<div class="aviso info" style="margin-top:12px">Tudo em dia. Novas revisões surgem quando você marca um tema como estudado, cria flashcards ou erra questões.</div>`}
      ${p.temas.length ? `<h2 class="sec">Temas para revisar</h2>${tabela([{ t: "Tema" }, { t: "Etapa", num: 1 }, { t: "Venceu" }, { t: "Acerto", num: 1 }, { t: "" }], p.temas.sort((a, b) => a.srs.prox.localeCompare(b.srs.prox)).map(({ id, srs }) => { const d = desempenhoTema(id); return [linkTema(id), srs.etapa + 1, quando(srs.prox), d.n ? pct(d.ac, d.n) + "%" : "—", `<a class="btn mini" href="#/revisoes/tema/${encodeURIComponent(id)}">Revisar</a>`]; }))}` : ""}
      ${p.cards.length || p.erros.length ? `<h2 class="sec">Outras revisões de hoje</h2><div class="linha">${p.cards.length ? `<a class="btn" href="#/flashcards/estudar">Estudar ${p.cards.length} flashcards</a>` : ""}${p.erros.length ? `<a class="btn" href="#/revisoes/erros">Refazer ${p.erros.length} questões erradas</a>` : ""}</div>` : ""}
      <h2 class="sec">Próximos 14 dias</h2>${tabela([{ t: "Dia" }, { t: "Temas", num: 1 }, { t: "Cards", num: 1 }, { t: "Erros", num: 1 }], prox, { vaziaMsg: "Nada agendado para os próximos 14 dias." })}`,
  };
});

/** Seleção de questões para revisar um tema: erradas e não vistas primeiro, depois as mais antigas. */
function questoesParaRevisao(temaId, n = 10) {
  const qs = questoes().filter(q => q.tema === temaId);
  const peso = q => { const s = statusQ(q), p = progDe(q); return s.chave === "incorreta" ? 0 : s.chave === "nao" ? 1 : 2 + (p?.h?.at(-1)?.[0] || 0) / 1e13; };
  return qs.sort((a, b) => peso(a) - peso(b)).slice(0, n).map(q => q.id);
}
rota("/revisoes/tema/:id", ({ id }) => {
  const t = TEMAS[id]; if (!t) return paginaNaoEncontrada();
  const chave = "rev:" + id, srs = store.doc("revisoes").temas[id], ids = questoesParaRevisao(id);
  let corpo;
  if (playerAtivo(chave)) corpo = htmlPlayer();
  else corpo = `<section class="caixa"><h2 class="sec">1. Releia os pontos-chave</h2>${t.resumo ? `<p class="leitura">${esc(t.resumo)}</p>` : ""}${t.objetivos?.length ? `<ul>${t.objetivos.map(o => `<li>${esc(o)}</li>`).join("")}</ul>` : ""}${store.doc("notas").temas[id]?.texto ? `<details><summary>Suas anotações</summary><p class="leitura">${esc(store.doc("notas").temas[id].texto)}</p></details>` : ""}</section>
    <section class="caixa"><h2 class="sec">2. Teste-se</h2>${ids.length ? `<p>${ids.length} questões (erradas e não vistas primeiro). O resultado define a próxima revisão.</p><button class="btn" data-act="rev-iniciar" data-t="${esc(id)}">Começar</button>`
      : `<p>Sem questões deste tema. Avalie sua lembrança:</p><div class="notas">${[[0, "Não lembrei"], [1, "Com dificuldade"], [2, "Lembrei bem"], [3, "Fácil"]].map(([n, r]) => `<button class="btn ${n === 2 ? "azul" : "sec"}" data-act="rev-auto" data-t="${esc(id)}" data-n="${n}">${r}<small>${previaIntervalo(srs, n)} d</small></button>`).join("")}</div>`}</section>`;
  return { secao: "revisoes", crumbs: [["Revisões", "#/revisoes"]], titulo: "Revisar: " + t.nome, sub: srs ? `Etapa ${srs.etapa + 1} · agendada para ${dataBR(srs.prox)}` : "Primeira revisão", html: corpo, ctx: { tema: id } };
});
ACOES["rev-iniciar"] = el => {
  const id = el.dataset.t;
  iniciarPlayer("rev:" + id, questoesParaRevisao(id), "revisao", res => {
    const p = pct(res.filter(r => r.ok).length, res.length), nota = notaPorDesempenho(p); revisarTema(id, nota);
    return `Aproveitamento ${p}% → próxima revisão em ${store.doc("revisoes").temas[id].int} dias (${dataBR(store.doc("revisoes").temas[id].prox)}).`;
  }); atualizar();
};
ACOES["rev-auto"] = el => { revisarTema(el.dataset.t, +el.dataset.n); toast(`Próxima revisão em ${store.doc("revisoes").temas[el.dataset.t].int} dias`); ir("#/revisoes"); };
rota("/revisoes/erros", () => {
  if (!playerAtivo("erros")) {
    const ids = pendencias().erros.map(e => e.qid);
    if (!ids.length) return { secao: "revisoes", crumbs: [["Revisões", "#/revisoes"]], titulo: "Refazer erros", html: vazio("Nenhuma questão errada vencida hoje.", `<a class="btn sec" href="#/erros">Abrir caderno de erros</a>`) };
    iniciarPlayer("erros", embaralhar(ids), "erro", res => { const ok = res.filter(r => r.ok).length; return `${ok} de ${res.length} acertadas. As acertadas avançam no intervalo; as erradas voltam para amanhã.`; });
  }
  return { secao: "revisoes", crumbs: [["Revisões", "#/revisoes"]], titulo: "Refazer questões erradas", html: htmlPlayer(), ctx: { questao: PL.ids[PL.i], tema: qPorId(PL.ids[PL.i])?.tema } };
});
