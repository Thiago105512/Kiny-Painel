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

/* ---------- Peças do Início ---------- */
/** Anel de progresso (estilo relógio de atividades). */
function anel(pctv, cor, centro, rotulo) {
  const p = Math.max(0, Math.min(100, pctv)), r = 42, c = 2 * Math.PI * r;
  return `<div class="anel" role="img" aria-label="${esc(rotulo)}: ${Math.round(p)}%"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="${r}" class="anel-fundo" style="stroke:${cor}"/>
    <circle cx="50" cy="50" r="${r}" class="anel-val" style="stroke:${cor};stroke-dasharray:${c.toFixed(1)};--fim:${(c * (1 - p / 100)).toFixed(1)};stroke-dashoffset:${(c * (1 - p / 100)).toFixed(1)}"/></svg>
    <div class="anel-centro">${centro}</div><span class="anel-rot">${esc(rotulo)}</span></div>`;
}
/** Os 7 últimos dias como bolinhas (acesa = estudou). */
function semanaBolinhas() {
  const D = store.doc("dias").d, L = ["D", "S", "T", "Q", "Q", "S", "S"];
  return `<div class="semana" aria-label="Últimos 7 dias">${[6, 5, 4, 3, 2, 1, 0].map(i => { const k = somaDias(hoje(), -i), x = D[k], on = x && (x.q || x.seg >= 60 || x.temas?.length);
    return `<span class="dia ${on ? "on" : ""} ${i === 0 ? "hoje" : ""}" title="${dataBR(k)}"><i>${on ? ilustra("chama", "#D97706", "p") : ""}</i><small>${L[new Date(k + "T12:00").getDay()]}</small></span>`; }).join("")}</div>`;
}
/** Frase do Doutor Boto conforme o dia. */
function falaDoDia(d, metas, seq) {
  const faltam = Math.max(0, metas.questoes - d.q), h = new Date().getHours();
  if (d.q >= metas.questoes && metas.questoes) return ["Meta de questões batida! Que tal um jogo para relaxar?", "festa"];
  if (d.q && faltam <= 5) return [`Faltam só ${faltam} questões para a meta de hoje!`, "surpreso"];
  if (d.q) return [`Bom ritmo: ${d.q} questões hoje. Bora completar ${metas.questoes}?`, "feliz"];
  if (seq >= 2) return [`${seq} dias seguidos! Não deixa a chama apagar hoje.`, "feliz"];
  return [h < 12 ? "Bom dia! Uma questão relâmpago para acordar o cérebro?" : h < 18 ? "Boa tarde! Que tal começar pela questão relâmpago?" : "Boa noite! Uma questão rápida antes de descansar?", "pensando"];
}
/* Questão relâmpago: uma questão curta, respondida ali mesmo. */
const QR = { id: null, resp: null, ordem: null };
function escolherRelampago(trocar = false) {
  const pool = poolJogo().filter(q => q.q.length <= 380 && !q.img);
  if (!pool.length) return null;
  if (!trocar && QR.id && qPorId(QR.id)) return qPorId(QR.id);
  const novas = pool.filter(q => statusQ(q).chave === "nao"), base = novas.length ? novas : pool;
  const q = trocar ? base[Math.floor(Math.random() * base.length)] : base[hashTxt("qr-" + hoje()) % base.length];
  Object.assign(QR, { id: q.id, resp: null, ordem: opcoesEmbaralhadas(q) }); return q;
}
function cardRelampago() {
  const q = escolherRelampago(); if (!q) return "";
  const alts = QR.ordem.map((i, pos) => { const s = QR.resp == null ? "" : i === q.c ? "ok" : i === QR.resp ? "bad" : "";
    return `<li><button class="alt" data-act="qr-resp" data-i="${i}" data-s="${s}" ${QR.resp != null ? "disabled" : ""}>${formaAlt(pos)}<span>${esc(q.o[i])}</span></button></li>`; }).join("");
  return `<section class="relampago"><div class="relampago-cab"><span class="lab">⚡ Questão relâmpago</span>${q.dif ? pill(DIFICULDADE[q.dif], ({ 1: "ok", 2: "warn", 3: "bad" })[q.dif]) : ""}</div>
    <p class="enunciado">${esc(q.q)}</p><ol class="alts alts-jogo">${alts}</ol>
    ${QR.resp != null ? `<div class="retorno"><p class="veredito ${QR.resp === q.c ? "ok" : "bad"}">${QR.resp === q.c ? "✓ " + esc(sorteio(ELOGIOS)) + " +10 XP" : "Quase! Foi para o caderno de erros."}</p>${htmlExplicacao(q.e)}
      <div class="acoes"><button class="btn" data-act="qr-outra">Mais uma</button><button class="btn sec" data-act="inicio-praticar" data-disc="">Sessão de 10</button></div></div>` : ""}</section>`;
}
ACOES["qr-resp"] = el => { const q = qPorId(QR.id); if (!q || QR.resp != null) return; QR.resp = +el.dataset.i; registrarResposta(q, QR.resp, 0, "inicio"); if (typeof som === "function") som(QR.resp === q.c ? "ok" : "erro"); atualizar();
  if (QR.resp === q.c) setTimeout(() => confete(document.querySelector(".relampago .veredito"), 16), 60); };
ACOES["qr-outra"] = () => { escolherRelampago(true); atualizar(); setTimeout(() => document.querySelector(".relampago")?.scrollIntoView({ block: "start", behavior: "smooth" }), 30); };
/** Faixa horizontal com os desafios do dia (o que já foi feito sai da faixa). */
function faixaDesafios() {
  const itens = [], d = typeof diario === "function" ? diario() : {};
  const p = pilulaDoDia(); if (p) itens.push(`<a class="desafio" href="#/estudar/p/${esc(p.id)}" style="--h:${COR_PIL[p.tipo] || "#D97706"}">${iluPil(p.tipo, "m")}<b>Pílula do dia</b><small>${esc(p.titulo)}</small></a>`);
  if (typeof jogoCaso !== "undefined" && jogoCaso.disponivel() && !d.caso) itens.push(`<a class="desafio" href="#/jogos/caso" style="--h:#C0265F">${ilustra("lupa", "#C0265F", "m")}<b>Caso do dia</b><small>Descubra o diagnóstico</small></a>`);
  if (typeof jogoTermo !== "undefined" && jogoTermo.disponivel() && !d.termo) itens.push(`<a class="desafio" href="#/jogos/termo" style="--h:#15803D">${ilustra("livro", "#15803D", "m")}<b>Termo do dia</b><small>Palavra de 5 letras</small></a>`);
  const J = docJornada(), ms = missoesDoDia().filter(m => !(J.missoes?.d === J.dia.d && J.missoes.ok.includes(m.id)));
  if (ms.length) itens.push(`<a class="desafio" href="#/jornada" style="--h:#6D28D9">${ilustra("escudo", "#6D28D9", "m")}<b>Missões</b><small>${ms.length} de 3 para hoje · +40 XP cada</small></a>`);
  return itens.length ? `<section><h2 class="sec">Desafios de hoje</h2><div class="desafios">${itens.join("")}</div></section>` : "";
}

rota("/", () => {
  const P = store.doc("perfil"), d = diaDe(hoje()), metas = P.metas || { questoes: 20, minutos: 60 };
  const min = Math.round((d.seg || 0) / 60), estudados = unicos(d.temas || []), seq = sequencia();
  const tarefas = tarefasDoDia(), prox = tarefas[0], sug = prox ? null : sugestaoPratica();
  const Q = questoes().filter(doObjetivo), feitas = Q.filter(q => progDe(q)?.n).length, pend = pendencias();
  const ag = agregados(), fracas = listaPor(ag.por.disc, 3).sort((a, b) => a.p - b.p).slice(0, 3);
  const novato = ag.n < 10, J = docJornada(), nv = nivelDe(J.xp), [fala, humor] = falaDoDia(d, metas, seq);
  // Primeiros passos: o que já foi feito sai da tela (não fica riscado), para não poluir o Início
  const passos = [[!!P.faculdade, "Escolher sua faculdade e período", "#/medicina", "Escolher"], [ag.n >= 10, "Responder 10 questões", "#/questoes", "Praticar"],
    [Object.keys(store.doc("revisoes").temas).length > 0, "Marcar um tema como estudado (programa as revisões)", "#/medicina/especialidades", "Ver temas"], [cards().length > 0, "Criar seus primeiros flashcards", "#/flashcards", "Criar"]]
    .filter(([ok]) => !ok).map(([, txt, href, bt]) => `<div class="tarefa"><div class="o">${txt}</div><a class="btn mini sec" href="${href}">${bt}</a></div>`);
  return {
    secao: "inicio", titulo: saudacao() + (P.nome ? ", " + P.nome.split(" ")[0] : ""), ilu: mascote(humor, 64, ""),
    sub: [P.apresentacao && P.apresentacao + (P.faculdade ? " · " + nomeInst(P.faculdade) : ""), new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })].filter(Boolean).map(esc).join("<br>"),
    acoes: `<button class="btn sec mini" data-act="perfil-fac">Perfil</button><button class="btn sec mini" data-act="metas-editar">Metas</button>`,
    html: `${avisoBackup()}
    <section class="painel-dia">
      <p class="balao painel-fala">${esc(fala)}</p>
      <div class="aneis">${anel(pct(d.q, metas.questoes), "#2340B8", `<b>${d.q}</b><small>de ${metas.questoes}</small>`, "Questões")}
        ${anel(pct(min, metas.minutos), "#0F766E", `<b>${min}</b><small>de ${metas.minutos} min</small>`, "Tempo")}
        ${anel(d.q ? pct(d.ac, d.q) : 0, "#C0265F", `<b>${d.q ? pct(d.ac, d.q) + "%" : "—"}</b><small>acerto</small>`, "Acerto")}</div>
      <div class="painel-linha"><div><span class="lab">Sequência · ${seq} ${seq === 1 ? "dia" : "dias"}</span>${semanaBolinhas()}</div>
        <a class="painel-nivel" href="#/jornada"><span class="lab">Nível ${nv.n} · ${esc(nv.nome)}</span><div class="xp-barra"><i style="width:${nv.pct}%"></i></div><small>${J.xp} XP${nv.prox ? ` · faltam ${nv.prox - J.xp}` : ""}</small></a></div>
      ${estudados.length ? `<p class="small" style="margin:0"><span class="muted">Estudado hoje:</span> ${estudados.slice(0, 3).map(linkTema).join(", ")}${estudados.length > 3 ? ` <span class="muted">e mais ${estudados.length - 3}</span>` : ""}</p>` : ""}
    </section>
    <section class="hero com-ilu">${ilustra(prox ? (/Revisar|revis/i.test(prox.tit) ? "relogio" : /flashcard/i.test(prox.tit) ? "livro" : /Prova|Trabalho|Semin|Apresenta/i.test(prox.tit) ? "calendario" : "alvo") : "estetoscopio", "#2340B8", "xg")}<div><span class="lab">Próximo passo</span>
      ${prox ? `<p class="hero-tit">${esc(prox.tit)}</p><p class="small muted" style="margin:0">${esc(prox.det)}${tarefas.length > 1 ? ` · depois: mais ${tarefas.length - 1}` : ""}</p><a class="btn azul grande" href="${prox.href}">${prox.bt}</a>`
        : `<p class="hero-tit">${esc(sug.tit)}</p><p class="small muted" style="margin:0">Nada pendente para hoje · ${esc(sug.det)}</p><button class="btn azul grande" data-act="inicio-praticar" data-disc="${esc(sug.disc || "")}">Começar</button>`}
    </div></section>
    ${cardRelampago()}
    ${faixaDesafios()}
    <section><h2 class="sec">Estudar agora</h2><div class="atalhos icones cores">
      <a href="#/questoes" style="--h:#2340B8">${ilustra("alvo", "#2340B8", "m")}<b>Questões</b><small>${Q.length} no banco · ${feitas} feitas</small></a>
      <a href="#/simulados" style="--h:#0F766E">${ilustra("relogio", "#0F766E", "m")}<b>Simulado</b><small>${store.doc("simulados").hist.length ? store.doc("simulados").hist.length + " feitos" : "prova cronometrada"}</small></a>
      <a href="#/flashcards" style="--h:#A21CAF">${ilustra("livro", "#A21CAF", "m")}<b>Flashcards</b><small>${pend.cards.length ? pend.cards.length + " para hoje" : cards().length + " cards"}</small></a>
      <a href="#/casos" style="--h:#C0265F">${ilustra("estetoscopio", "#C0265F", "m")}<b>Casos clínicos</b><small>${todosCasos().length} casos</small></a>
      <a href="#/jogos" class="largo" style="--h:#DC2626">${ilustra("controle", "#DC2626", "m")}<b>Jogos</b><small>Plantão no PS, Salve o paciente, Caso do dia e mais</small></a>
    </div></section>
    ${tarefas.length > 1 ? `<section><h2 class="sec">Também para hoje</h2><div class="tarefas">${tarefas.slice(1, 5).map(t => `<div class="tarefa"><div class="o">${t.link ? "Revisar " + t.link : esc(t.tit)}<small>${esc(t.det)}</small></div><a class="btn mini sec" href="${t.href}">${t.bt}</a></div>`).join("")}</div>${tarefas.length > 5 ? `<p class="small"><a href="#/revisoes">Ver todas as ${tarefas.length}</a></p>` : ""}</section>` : ""}
    ${novato && passos.length ? `<section><h2 class="sec">Primeiros passos</h2><div class="tarefas">${passos.join("")}</div></section>`
      : `<section><h2 class="sec">Sua faculdade</h2>${linhaFaculdade()}</section>
        ${fracas.length ? `<section><h2 class="sec">Onde focar <a class="small" href="#/desempenho">ver desempenho</a></h2><div class="barras">${fracas.map(x => barra(esc(x.k), x.ac, x.n)).join("")}</div></section>` : ""}`}
    ${cardHumor()}`,
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
