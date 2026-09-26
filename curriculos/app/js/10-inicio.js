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

/** Uma linha sobre a faculdade: o próximo conteúdo do período ou o que falta configurar. */
function linhaFaculdade() {
  const P = store.doc("perfil"), g = P.gradeId && gradePorId(P.gradeId);
  if (!P.faculdade) return `<div class="faixa"><p>Escolha sua faculdade para ver os conteúdos do seu período.</p><a class="btn sec mini" href="#/medicina">Escolher</a></div>`;
  const sig = esc(instPorId(P.faculdade)?.sigla || "");
  if (!g || !itensGrade(g).length) return `<div class="faixa"><p><b>${sig}</b> · <span class="muted">matriz ainda não importada</span></p><a class="btn sec mini" href="#/medicina/inst/${esc(P.faculdade)}">Importar</a></div>`;
  const per = P.periodo || 1, itens = itensGrade(g).filter(i => i.periodo === per), vistos = temasEstudados();
  const prox = itens.flatMap(it => temasDoItem(it).filter(t => !vistos.has(t)).map(t => ({ t, it })))[0];
  return `<div class="faixa"><p><b>${sig} · ${per}º período</b><br><span class="small muted">${prox ? `Próximo: ${linkTema(prox.t)} (${esc(prox.it.nome)})` : `${itens.length} disciplinas/módulos${itens.some(i => !temasDoItem(i).length) ? " · vincule temas para receber sugestões" : ""}`}</span></p><a class="btn sec mini" href="#/curso">Meu curso</a></div>`;
}

/** Lista de pendências em ordem de prioridade: revisões vencidas, erros, flashcards, plano. */
function tarefasDoDia() {
  const pend = pendencias(), T = [];
  // Provas e trabalhos nos próximos 3 dias vêm primeiro
  proximasAvals(3).forEach(a => { const g = minhaGrade(), n = diasAte(a.data);
    T.push({ tit: `${TIPO_AVAL[a.tipo] || "Avaliação"}${a.titulo ? ": " + a.titulo : nomeItem(g, a.disc) ? " de " + nomeItem(g, a.disc) : ""} ${n === 0 ? "hoje" : n === 1 ? "amanhã" : `em ${n} dias`}`, det: a.data ? dataBR(a.data) + (a.hora ? " " + a.hora : "") : "", href: `#/curso/aval/${encodeURIComponent(a.id)}`, bt: "Ver" }); });
  pend.temas.sort((a, b) => a.srs.prox.localeCompare(b.srs.prox)).forEach(t => T.push({ tit: `Revisar ${nomeTema(t.id)}`, det: `revisão ${quando(t.srs.prox)} · ~15 min`, href: `#/revisoes/tema/${encodeURIComponent(t.id)}`, bt: "Revisar", link: linkTema(t.id) }));
  if (pend.erros.length) T.push({ tit: `Refazer ${pend.erros.length} questão(ões) que você errou`, det: "caderno de erros", href: "#/revisoes/erros", bt: "Refazer" });
  if (pend.cards.length) T.push({ tit: `Estudar ${pend.cards.length} flashcard(s)`, det: `~${Math.max(2, Math.round(pend.cards.length / 3))} min`, href: "#/flashcards/estudar", bt: "Estudar" });
  Object.values(store.doc("plano").itens).filter(p => p.data === hoje() && !p.feito).forEach(p => T.push({ tit: p.titulo || nomeTema(p.tema) || p.disciplina || "Estudo planejado", det: ["planejado", p.min && p.min + " min", p.nq && p.nq + " questões"].filter(Boolean).join(" · "), href: p.tema ? "#/tema/" + encodeURIComponent(p.tema) : "#/plano", bt: "Abrir" }));
  return T;
}
/** Sugestão quando não há pendências: questões novas do ponto mais fraco (ou do banco todo). */
function sugestaoPratica() {
  const fraca = listaPor(agregados().por.disc, 3).sort((a, b) => a.p - b.p)[0];
  const novas = questoes().filter(q => doObjetivo(q) && statusQ(q).chave === "nao" && (!fraca || q.disc === fraca.k));
  return fraca && novas.length >= 5 ? { tit: `Praticar ${fraca.k}`, det: `seu ponto mais fraco (${Math.round(fraca.p * 100)}%) · ${novas.length} questões novas`, disc: fraca.k }
    : { tit: "Praticar 10 questões novas", det: `${questoes().filter(q => doObjetivo(q) && statusQ(q).chave === "nao").length} ainda não respondidas${objetivo() ? " em " + OBJETIVOS[objetivo()] : " no banco"}` };
}
const saudacao = () => { const h = new Date().getHours(); return h < 12 ? "Bom dia" : h < 18 ? "Boa tarde" : "Boa noite"; };

rota("/", () => {
  const P = store.doc("perfil"), d = diaDe(hoje()), metas = P.metas || { questoes: 20, minutos: 60 };
  const min = Math.round((d.seg || 0) / 60), estudados = unicos(d.temas || []), seq = sequencia();
  const tarefas = tarefasDoDia(), prox = tarefas[0], sug = prox ? null : sugestaoPratica();
  const Q = questoes().filter(doObjetivo), feitas = Q.filter(q => progDe(q)?.n).length, pend = pendencias();
  const ag = agregados(), fracas = listaPor(ag.por.disc, 3).sort((a, b) => a.p - b.p).slice(0, 3);
  const novato = ag.n < 10;
  // Primeiros passos: o que já foi feito sai da tela (não fica riscado), para não poluir o Início
  const passos = [[!!P.faculdade, "Escolher sua faculdade e período", "#/medicina", "Escolher"], [ag.n >= 10, "Responder 10 questões", "#/questoes", "Praticar"],
    [Object.keys(store.doc("revisoes").temas).length > 0, "Marcar um tema como estudado (programa as revisões)", "#/medicina/especialidades", "Ver temas"], [cards().length > 0, "Criar seus primeiros flashcards", "#/flashcards", "Criar"]]
    .filter(([ok]) => !ok).map(([, txt, href, bt]) => `<div class="tarefa"><div class="o">${txt}</div><a class="btn mini sec" href="${href}">${bt}</a></div>`);
  return {
    secao: "inicio", titulo: saudacao() + (P.nome ? ", " + P.nome.split(" ")[0] : ""), sub: [P.apresentacao && P.apresentacao + (P.faculdade ? " · " + nomeInst(P.faculdade) : ""), new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })].filter(Boolean).map(esc).join("<br>"),
    acoes: `<button class="btn sec mini" data-act="perfil-fac">Perfil</button><button class="btn sec mini" data-act="metas-editar">Metas</button>`,
    html: `${avisoBackup()}
    <section class="hero com-ilu">${ilustra(prox ? (/Revisar|revis/i.test(prox.tit) ? "relogio" : /flashcard/i.test(prox.tit) ? "livro" : /Prova|Trabalho|Semin|Apresenta/i.test(prox.tit) ? "calendario" : "alvo") : "estetoscopio", "#2340B8", "xg")}<div><span class="lab">Próximo passo</span>
      ${prox ? `<p class="hero-tit">${esc(prox.tit)}</p><p class="small muted" style="margin:0">${esc(prox.det)}${tarefas.length > 1 ? ` · depois: mais ${tarefas.length - 1}` : ""}</p><a class="btn azul grande" href="${prox.href}">${prox.bt}</a>`
        : `<p class="hero-tit">${esc(sug.tit)}</p><p class="small muted" style="margin:0">Nada pendente para hoje · ${esc(sug.det)}</p><button class="btn azul grande" data-act="inicio-praticar" data-disc="${esc(sug.disc || "")}">Começar</button>`}
    </div></section>
    ${(() => { const p = pilulaDoDia(); return p ? `<a class="pil-link com-ilu" href="#/estudar/p/${esc(p.id)}">${iluPil(p.tipo, "g")}<div><span class="lab">Pílula do dia</span><b>${esc(p.titulo)}</b><small>${esc(p.pergunta)}</small></div></a>` : ""; })()}
    <section class="caixa"><div class="metas">
      <div class="meta-item"><span>Questões hoje</span><b>${d.q}<small class="muted" style="font-size:calc(13px * var(--k))"> de ${metas.questoes}</small></b>${medidor(pct(d.q, metas.questoes), "ok")}</div>
      <div class="meta-item"><span>Tempo de estudo</span><b>${min}<small class="muted" style="font-size:calc(13px * var(--k))"> de ${metas.minutos} min</small></b>${medidor(pct(min, metas.minutos), "ok")}</div>
      <div class="meta-item"><span>Acerto hoje</span><b>${d.q ? pct(d.ac, d.q) + "%" : "—"}</b></div>
      <div class="meta-item"><span>Sequência</span><b class="com-ilu" style="gap:6px">${seq ? ilustra("chama", "#D97706", "p") : ""}${seq} ${seq === 1 ? "dia" : "dias"}</b></div></div>
      ${estudados.length ? `<p class="small" style="margin:12px 0 0"><span class="muted">Estudado hoje:</span> ${estudados.slice(0, 3).map(linkTema).join(", ")}${estudados.length > 3 ? ` <span class="muted">e mais ${estudados.length - 3}</span>` : ""}</p>` : ""}
    </section>
    ${cartaoJornada({ compacto: true })}
    ${cardHumor()}
    <section><div class="atalhos icones">
      <a href="#/questoes">${ilustra("alvo", "#2340B8", "m")}<b>Questões</b><small>${Q.length} no banco · ${feitas} feitas</small></a>
      <a href="#/simulados">${ilustra("relogio", "#0F766E", "m")}<b>Simulado</b><small>${store.doc("simulados").hist.length ? store.doc("simulados").hist.length + " feitos" : "prova cronometrada"}</small></a>
      <a href="#/flashcards">${ilustra("livro", "#A21CAF", "m")}<b>Flashcards</b><small>${pend.cards.length ? pend.cards.length + " para hoje" : cards().length + " cards"}</small></a>
      <a href="#/casos">${ilustra("estetoscopio", "#C0265F", "m")}<b>Casos clínicos</b><small>${todosCasos().length} casos</small></a>
      <a href="#/jogos" class="largo">${ilustra("controle", "#0F766E", "m")}<b>Jogos</b><small>Contra o relógio, Três vidas, Certo ou errado e mais</small></a>
    </div></section>
    ${tarefas.length > 1 ? `<section><h2 class="sec">Também para hoje</h2><div class="tarefas">${tarefas.slice(1, 5).map(t => `<div class="tarefa"><div class="o">${t.link ? "Revisar " + t.link : esc(t.tit)}<small>${esc(t.det)}</small></div><a class="btn mini sec" href="${t.href}">${t.bt}</a></div>`).join("")}</div>${tarefas.length > 5 ? `<p class="small"><a href="#/revisoes">Ver todas as ${tarefas.length}</a></p>` : ""}</section>` : ""}
    ${novato && passos.length ? `<section><h2 class="sec">Primeiros passos</h2><div class="tarefas">${passos.join("")}</div></section>`
      : `<section><h2 class="sec">Sua faculdade</h2>${linhaFaculdade()}</section>
        ${fracas.length ? `<section><h2 class="sec">Onde focar <a class="small" href="#/desempenho">ver desempenho</a></h2><div class="barras">${fracas.map(x => barra(esc(x.k), x.ac, x.n)).join("")}</div></section>` : ""}`}`,
  };
});
ACOES["inicio-praticar"] = el => {
  const disc = el.dataset.disc, qs = questoes().filter(q => doObjetivo(q) && statusQ(q).chave === "nao" && (!disc || q.disc === disc));
  praticar(embaralhar(qs.length ? qs : questoes()).slice(0, 10).map(q => q.id), disc ? "Praticando " + disc : "10 questões novas");
};
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
