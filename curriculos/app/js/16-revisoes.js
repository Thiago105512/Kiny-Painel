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
/* ---------- Erros em lote, agrupados por tema ---------- */
function lotesDeErros() {
  const abertos = Object.values(store.doc("erros").itens).filter(e => e.status === "aberto" && qPorId(e.qid));
  return Object.entries(porChave(abertos, e => e.tema || "_sem")).map(([tema, es]) => ({ tema, abertos: es, vencidos: es.filter(e => vencido(e.srs)) }))
    .sort((a, b) => b.vencidos.length - a.vencidos.length || b.abertos.length - a.abertos.length);
}
const nomeLote = t => t === "_sem" ? "Sem tema" : nomeTema(t);
rota("/revisoes/erros", () => {
  const lotes = lotesDeErros(), venc = lotes.reduce((s, l) => s + l.vencidos.length, 0);
  return { secao: "revisoes", crumbs: [["Revisões", "#/revisoes"]], titulo: "Refazer erros por tema", sub: "Refazer os erros de um mesmo tema juntos ajuda a fechar a lacuna de conteúdo, não só a questão.",
    acoes: venc ? `<a class="btn" href="#/revisoes/erros/todos">Refazer todos os vencidos (${venc})</a>` : "",
    html: lotes.length ? tabela([{ t: "Tema" }, { t: "Vencidos", num: 1 }, { t: "Abertos", num: 1 }, { t: "Motivo mais comum" }, { t: "" }], lotes.map(l => {
      const mot = Object.entries(porChave(l.abertos, e => e.motivo || e.motivoSugerido || "—")).sort((a, b) => b[1].length - a[1].length)[0]?.[0];
      return [l.tema === "_sem" ? "Sem tema" : linkTema(l.tema), l.vencidos.length || "—", l.abertos.length, `<span class="small">${esc(mot || "—")}</span>`,
        `<a class="btn mini ${l.vencidos.length ? "" : "sec"}" href="#/revisoes/erros/${encodeURIComponent(l.tema)}">Refazer lote</a>`]; }))
      : vazio("Nenhum erro aberto. Quando você errar questões, elas aparecem aqui agrupadas por tema.", `<a class="btn sec" href="#/erros">Caderno de erros</a>`) };
});
rota("/revisoes/erros/:tema", ({ tema }) => {
  const chave = "erros:" + tema;
  if (!playerAtivo(chave)) {
    let es;
    if (tema === "todos") es = lotesDeErros().flatMap(l => l.vencidos);
    else { const l = lotesDeErros().find(x => x.tema === tema); es = l ? (l.vencidos.length ? l.vencidos : l.abertos) : []; }
    if (!es.length) return { secao: "revisoes", crumbs: [["Revisões", "#/revisoes"], ["Erros", "#/revisoes/erros"]], titulo: "Refazer erros", html: vazio("Nenhum erro aberto neste lote.", `<a class="btn sec" href="#/revisoes/erros">Ver lotes</a>`) };
    iniciarPlayer(chave, embaralhar(es.map(e => e.qid)), "erro", res => {
      const ok = res.filter(r => r.ok).length, p = pct(ok, res.length), errou = res.filter(r => !r.ok).map(r => r.id);
      PL.errouDeNovo = errou;
      const temas = unicos(res.map(r => r.tema)).filter(Boolean);
      return `${ok} de ${res.length} acertadas (${p}%). As acertadas avançam no intervalo; as erradas voltam para amanhã.`
        + (p < 60 && temas.length === 1 ? ` <br>Aproveitamento baixo neste tema: vale <a href="#/tema/${encodeURIComponent(temas[0])}">rever o conteúdo</a> antes da próxima rodada.` : "")
        + (errou.length ? ` <br><button class="btn mini" data-act="erros-cards" style="margin-top:6px">Criar flashcards das ${errou.length} que errei de novo</button>` : "");
    });
  }
  return { secao: "revisoes", crumbs: [["Revisões", "#/revisoes"], ["Erros", "#/revisoes/erros"]], titulo: tema === "todos" ? "Refazer todos os erros vencidos" : "Erros: " + nomeLote(tema),
    html: htmlPlayer(), ctx: { questao: PL.ids[PL.i], tema: tema !== "todos" && tema !== "_sem" ? tema : qPorId(PL.ids[PL.i])?.tema } };
});
ACOES["erros-cards"] = el => {
  const E = store.doc("erros"); let n = 0;
  (PL.errouDeNovo || []).forEach(id => { const e = E.itens[id], q = qPorId(id); if (!q || e?.card) return;
    const card = criarCard({ frente: q.q, verso: `${q.o[q.c]}\n\n${q.e || ""}${e?.coment ? "\n\nMinha nota: " + e.coment : ""}`.trim(), tema: q.tema, subtema: q.subtema, origem: "erro", ref: q.id, dif: q.dif || 2 });
    if (e) e.card = card; n++; });
  store.mudou("erros"); el.disabled = true; el.textContent = n ? `${n} flashcards criados` : "Já tinham flashcard"; toast(n ? `${n} flashcards criados` : "Essas questões já tinham flashcard");
};
