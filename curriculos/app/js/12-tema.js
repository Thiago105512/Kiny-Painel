/* ============================================================
   12-tema — página central do tema (médico ou assunto do ENEM).
   Tudo sobre o tema num lugar: resumo, objetivos, onde aparece na grade,
   questões, flashcards, casos, anotações, materiais, erros, revisão e desempenho.
   ============================================================ */
/** Onde o tema aparece nas matrizes (priorizando a matriz do perfil). */
function ondeNaGrade(temaId) {
  const P = store.doc("perfil"), res = [];
  grades().forEach(g => (temasNaGrade(g)[temaId] || []).forEach(o => res.push({ g, ...o, minha: g.id === P.gradeId })));
  return res.sort((a, b) => b.minha - a.minha || a.periodo - b.periodo);
}
function crumbsTema(t) {
  if (t.dominio === "enem") { const d = ENEM_DISC[t.disciplinaId]; return [["ENEM", "#/enem"], [t.areaNome, "#/enem/" + t.area], [d?.nome || "", "#/enem/" + t.area + "/" + t.disciplinaId]]; }
  const o = ondeNaGrade(t.id).find(x => x.minha);
  if (o) return [CRUMB_MED, [nomeInst(o.g.instituicao), "#/medicina/inst/" + o.g.instituicao], [o.periodo + "º período", `#/medicina/grade/${o.g.id}/p/${o.periodo}`], [o.item.nome, `#/medicina/grade/${o.g.id}/item/${o.item.id}`]];
  const e = ESPECIALIDADES[t.especialidades?.[0]];
  return e ? [CRUMB_MED, ["Especialidades", "#/medicina/especialidades"], [e.nome, "#/medicina/esp/" + e.id]] : [CRUMB_MED];
}
const ABAS_TEMA = [["resumo", "Resumo"], ["praticar", "Praticar"], ["mapa", "Mapa"], ["notas", "Notas"], ["desempenho", "Desempenho"]];
// Endereços antigos continuam válidos
const ABA_ANTIGA = { visao: "resumo", questoes: "praticar", flashcards: "praticar", casos: "praticar", erros: "praticar", materiais: "notas" };
rota("/tema/:id", p => paginaTema(p.id, "resumo"));
rota("/tema/:id/:aba", p => paginaTema(p.id, ABA_ANTIGA[p.aba] || p.aba));

/** Faixa de revisão no topo: o que fazer com este tema agora. */
function faixaRevisao(id, rev) {
  if (!rev) return `<div class="faixa"><p class="small">Revisão espaçada ainda não agendada.</p><button class="btn mini" data-act="tema-estudei" data-t="${esc(id)}">Marcar como estudado</button></div>`;
  return `<div class="faixa"><p class="small">Próxima revisão <b>${quando(rev.prox)}</b> <span class="muted">· ${dataBR(rev.prox)}</span></p>${vencido(rev) ? `<a class="btn mini azul" href="#/revisoes/tema/${encodeURIComponent(id)}">Revisar agora</a>` : `<button class="btn mini sec" data-act="tema-estudei" data-t="${esc(id)}">Estudei hoje</button>`}</div>`;
}
const linhaSecao = (titulo, detalhe, botoes) => `<div class="tarefa"><div class="o"><b>${titulo}</b><small>${detalhe}</small></div><span class="linha" style="flex-wrap:nowrap">${botoes}</span></div>`;

function paginaTema(id, aba) {
  const t = TEMAS[id]; if (!t) return paginaNaoEncontrada();
  const med = t.dominio === "medicina", enc = encodeURIComponent(id);
  const qs = questoes().filter(q => q.tema === id), d = desempenhoTema(id), rev = store.doc("revisoes").temas[id];
  const cs = cards().filter(c => c.tema === id), casos = todosCasos().filter(c => c.temaId === id);
  const nota = store.doc("notas").temas[id], mats = Object.values(store.doc("materiais").itens).filter(m => m.tema === id);
  const errsAb = Object.values(store.doc("erros").itens).filter(e => e.tema === id && e.status === "aberto");
  const onde = med ? ondeNaGrade(id) : [], minha = onde.find(o => o.minha);
  let corpo = "";

  if (aba === "resumo") {
    const subs = (t.subtemas || []).map(sb => { const n = qs.filter(q => q.subtema === sb.id).length; return `<span class="pill">${esc(sb.nome)}${n ? ` · ${n}` : ""}</span>`; });
    corpo = `${faixaRevisao(id, rev)}
      ${t.resumo ? `<section><p class="leitura" style="margin:0">${esc(t.resumo)}</p></section>` : ""}
      ${t.objetivos?.length ? `<section><h2 class="sec">Objetivos</h2><ul style="margin:0;padding-left:20px">${t.objetivos.map(o => `<li>${esc(o)}</li>`).join("")}</ul></section>` : ""}
      ${subs.length ? `<section><h2 class="sec">Subtemas</h2><div class="chips">${subs.join("")}</div></section>` : ""}
      ${med ? `<section><h2 class="sec">Onde aparece</h2>${onde.length ? `<div class="links-lista">${onde.map(o => `<a href="#/medicina/grade/${esc(o.g.id)}/item/${esc(o.item.id)}"><span>${esc(o.item.nome)}</span><small>${esc(nomeInst(o.g.instituicao))} · ${o.periodo}º período</small></a>`).join("")}</div>` : `<p class="small muted" style="margin:0">Ainda não vinculado às disciplinas da sua grade.</p>`}
        <p class="small" style="margin:10px 0 0"><span class="muted">Especialidades:</span> ${(t.especialidades || []).map(e => `<a href="#/medicina/esp/${esc(e)}">${esc(ESPECIALIDADES[e]?.nome || e)}</a>`).join(", ")}</p></section>` : ""}
      <p class="small muted">Resumo de referência (autoral) — aprofunde na bibliografia${med ? " da disciplina" : ""}.</p>`;
  }
  else if (aba === "praticar") {
    if (playerAtivo("tema:" + id)) corpo = htmlPlayer();
    else {
      const novas = qs.filter(q => statusQ(q).chave === "nao").length, erradas = qs.filter(q => statusQ(q).chave === "incorreta").length, venc = cs.filter(c => vencido(c.srs)).length;
      corpo = `<div class="tarefas">
        ${linhaSecao("Questões", qs.length ? `${qs.length} no banco · ${novas} novas${d.n ? ` · ${pct(d.ac, d.n)}% de acerto` : ""}` : "nenhuma ainda", qs.length ? `<button class="btn mini" data-act="tema-praticar" data-t="${esc(id)}" data-m="${novas ? "novas" : "todas"}">Praticar</button>${erradas ? `<button class="btn mini sec" data-act="tema-praticar" data-t="${esc(id)}" data-m="erradas">Só erradas</button>` : ""}` : (IA.disponivel() ? `<button class="btn mini sec" data-act="ia-abrir">Gerar</button>` : ""))}
        ${linhaSecao("Flashcards", cs.length ? `${cs.length} cards · ${venc} para hoje` : "nenhum ainda", `${venc ? `<a class="btn mini" href="#/flashcards/estudar/${enc}">Estudar</a>` : ""}${qs.length && !cs.length ? `<button class="btn mini sec" data-act="tema-cards-questoes" data-t="${esc(id)}">Criar das questões</button>` : `<button class="btn mini sec" data-act="card-novo" data-t="${esc(id)}">Novo</button>`}`)}
        ${errsAb.length ? linhaSecao("Erros deste tema", `${errsAb.length} em aberto no caderno`, `<a class="btn mini" href="#/revisoes/erros/${enc}">Refazer</a>`) : ""}
        ${med ? linhaSecao("Casos clínicos", casos.length ? casos.map(c => esc(c.titulo)).join(" · ") : "nenhum ainda", casos.length ? `<a class="btn mini sec" href="#/casos/${esc(casos[0].id)}">Abrir</a>` : "") : ""}
      </div>
      ${qs.length ? `<details class="mais" style="margin-top:12px"><summary>Ver as ${qs.length} questões</summary>${listaQuestoes(qs, 100)}</details>` : ""}
      ${cs.length ? `<details class="mais"><summary>Ver os ${cs.length} flashcards</summary>${tabelaCards(cs)}</details>` : ""}`;
    }
  }
  else if (aba === "mapa") {
    corpo = `<p class="legenda"><span>Toque num ramo para abrir ou fechar.</span><span><span class="pill ok">verde</span> ≥70% de acerto</span><span><span class="pill bad">vermelho</span> &lt;50%</span></p>${arvore(mapaDoTema(id))}
      ${IA.disponivel() ? `<div class="acoes"><button class="btn sec" data-act="ia-abrir">Mapa detalhado com IA</button></div>` : ""}`;
  }
  else if (aba === "notas") {
    corpo = `<label class="campo"><span class="lab">Anotações (salvas automaticamente)</span><textarea id="nota-txt" rows="12" data-inp="nota" data-t="${esc(id)}" placeholder="Resumo próprio, mnemônicos, dúvidas para levar à aula…">${esc(nota?.texto || "")}</textarea></label>
      <p class="small muted" id="nota-st">${nota?.atualizado ? "Última edição: " + new Date(nota.atualizado).toLocaleString("pt-BR") : ""}</p>
      <section><h2 class="sec">Materiais <button class="btn sec mini" data-act="mat-novo" data-t="${esc(id)}">+ Adicionar</button></h2>${mats.length ? listaMateriais(mats) : `<p class="small muted" style="margin:0">Links de aulas, PDFs e textos deste tema aparecem aqui.</p>`}</section>`;
  }
  else if (aba === "desempenho") {
    const hist = qs.flatMap(q => (progDe(q)?.h || []).map(h => ({ ts: h[0], ok: h[2], ms: h[3] }))).sort((a, b) => a.ts - b.ts);
    const porSub = (t.subtemas || []).map(sb => { const a = agregados(q => q.tema === id && q.subtema === sb.id); return a.n ? barra(esc(sb.nome), a.ac, a.n) : ""; }).join("");
    corpo = `<div class="kpis"><div class="kpi"><b>${d.n ? pct(d.ac, d.n) + "%" : "—"}</b><span>acerto</span></div><div class="kpi"><b>${d.n}</b><span>respostas</span></div><div class="kpi"><b>${d.tempoMedio ? mmss(d.tempoMedio) : "—"}</b><span>tempo médio</span></div><div class="kpi"><b>${errsAb.length}</b><span>erros abertos</span></div></div>
      ${porSub ? `<section><h2 class="sec">Por subtema</h2><div class="barras">${porSub}</div></section>` : ""}
      <section><h2 class="sec">Últimas tentativas</h2>${tabela([{ t: "Data" }, { t: "Resultado" }, { t: "Tempo", num: 1 }], hist.slice(-10).reverse().map(h => [new Date(h.ts).toLocaleString("pt-BR"), h.ok ? pill("certa", "ok") : pill("errada", "bad"), h.ms ? mmss(h.ms) : "—"]), { vaziaMsg: "Sem tentativas registradas." })}</section>`;
  }
  else return paginaTema(id, "resumo");
  return {
    secao: med ? "medicina" : "enem", crumbs: crumbsTema(t), titulo: t.nome,
    sub: med ? esc((t.especialidades || []).map(e => ESPECIALIDADES[e]?.nome).filter(Boolean).join(" · ")) : `ENEM · ${esc(t.areaNome)}`,
    html: `<div class="tabs" role="tablist">${ABAS_TEMA.map(([k, n]) => `<a role="tab" href="#/tema/${enc}/${k}" aria-selected="${k === aba}">${n}${k === "praticar" && (errsAb.length || cs.some(c => vencido(c.srs))) ? " •" : ""}</a>`).join("")}</div>${corpo}`,
    ctx: { tema: id, trilha: med ? "medicina" : "enem", ...(minha ? { grade: minha.g.id, periodo: minha.periodo, disciplina: minha.item.nome } : {}) },
  };
}
ACOES["tema-estudei"] = el => { estudarTema(el.dataset.t); toast("Registrado — revisão programada"); atualizar(); };
ACOES["tema-praticar"] = el => {
  const id = el.dataset.t, m = el.dataset.m; let qs = questoes().filter(q => q.tema === id);
  if (m === "novas") qs = qs.filter(q => statusQ(q).chave === "nao"); if (m === "erradas") qs = qs.filter(q => statusQ(q).chave === "incorreta");
  iniciarPlayer("tema:" + id, embaralhar(qs).map(q => q.id), "tema"); atualizar();
};
ACOES["tema-cards-questoes"] = el => {
  const existentes = new Set(cards().map(c => c.ref).filter(Boolean)); let n = 0;
  questoes().filter(q => q.tema === el.dataset.t && !existentes.has(q.id)).forEach(q => { cardDeQuestao(q); n++; });
  toast(n ? `${n} flashcards criados` : "Todas as questões já têm flashcard"); atualizar();
};
ENTRADAS.nota = el => {
  const N = store.doc("notas"); N.temas[el.dataset.t] = { texto: el.value, atualizado: Date.now() }; store.mudou("notas");
  const s = $("#nota-st"); if (s) s.textContent = "Salvo " + new Date().toLocaleTimeString("pt-BR");
};

/* ---------- Listas reutilizadas por outras páginas ---------- */
/** Lista compacta de questões (enunciado em 2 linhas + uma linha de detalhes). */
function listaQuestoes(qs, limite = 20, paginar = false) {
  if (!qs.length) return vazio("Nenhuma questão com esses critérios.");
  const cls = { correta: "ok", incorreta: "bad", nao: "" };
  return `<div class="lista-q">${qs.slice(0, limite).map(q => { const s = statusQ(q);
    return `<a href="#/questoes/q/${esc(q.id)}"><span class="txt">${esc(q.q)}</span><span class="meta">${pill(s.nome, cls[s.chave])}${s.marcada ? "<span>★ marcada</span>" : ""}<span>${esc(q.tema ? nomeTema(q.tema) : q.a)}</span>${seloNivel(q.dif, true)}</span></a>`; }).join("")}</div>`
    + (qs.length > limite ? (paginar ? `<div class="acoes"><button class="btn sec" data-act="lq-mais">Mostrar mais (${qs.length - limite} restantes)</button></div>` : `<p class="small muted">Mostrando ${limite} de ${qs.length}.</p>`) : "");
}

/** Mapa do tema montado só com dados do app: subtemas (com desempenho), objetivos, grade, especialidades, materiais e temas relacionados. */
function mapaDoTema(id) {
  const t = TEMAS[id], med = t.dominio === "medicina", enc = encodeURIComponent(id);
  const qs = questoes().filter(q => q.tema === id), cs = cards().filter(c => c.tema === id), casos = todosCasos().filter(c => c.temaId === id);
  const nota = store.doc("notas").temas[id]?.texto, mats = Object.values(store.doc("materiais").itens).filter(m => m.tema === id);
  const subs = (t.subtemas || []).map(s => { const a = agregados(q => q.tema === id && q.subtema === s.id), n = qs.filter(q => q.subtema === s.id).length;
    return { t: s.nome, sub: n ? `${n} q.${a.n ? " · " + pct(a.ac, a.n) + "%" : ""}` : "", cls: clsDesempenho(a) }; });
  const rel = med ? Object.values(TEMAS).filter(x => x.id !== id && x.dominio === "medicina").map(x => ({ x, s: (x.especialidades || []).filter(e => (t.especialidades || []).includes(e)).length * 2 + (x.disciplinas || []).filter(d => (t.disciplinas || []).includes(d)).length }))
    .filter(o => o.s >= 3).sort((a, b) => b.s - a.s).slice(0, 6).map(o => ({ t: o.x.nome, href: "#/tema/" + encodeURIComponent(o.x.id) }))
    : Object.values(TEMAS).filter(x => x.id !== id && x.disciplinaId === t.disciplinaId).slice(0, 6).map(x => ({ t: x.nome, href: "#/tema/" + encodeURIComponent(x.id) }));
  const onde = med ? ondeNaGrade(id) : [];
  const d = desempenhoTema(id);
  return { t: t.nome, sub: d.n ? `${pct(d.ac, d.n)}% em ${d.n} resp.` : "", filhos: [
    subs.length && { t: "Subtemas", filhos: subs },
    (t.objetivos || []).length && { t: "Objetivos", filhos: t.objetivos.map(o => ({ t: o })) },
    onde.length && { t: "Na grade", filhos: onde.map(o => ({ t: `${nomeInst(o.g.instituicao)} · ${o.periodo}º · ${o.item.nome}`, href: `#/medicina/grade/${o.g.id}/item/${o.item.id}` })) },
    med && (t.especialidades || []).length && { t: "Especialidades", filhos: t.especialidades.map(e => ({ t: ESPECIALIDADES[e]?.nome || e, href: "#/medicina/esp/" + e })) },
    (t.disciplinas || []).length && { t: "Disciplinas relacionadas", filhos: t.disciplinas.map(x => ({ t: x })) },
    { t: "Estudar", filhos: [
      { t: "Questões", sub: String(qs.length), href: `#/tema/${enc}/questoes`, cls: clsDesempenho(d) },
      { t: "Flashcards", sub: String(cs.length), href: `#/tema/${enc}/flashcards` },
      med && { t: "Casos clínicos", sub: String(casos.length), href: `#/tema/${enc}/casos`, filhos: casos.map(c => ({ t: c.titulo, href: "#/casos/" + c.id })) },
      nota && { t: "Minhas anotações", href: `#/tema/${enc}/notas` },
      mats.length && { t: "Materiais", sub: String(mats.length), href: `#/tema/${enc}/materiais` },
    ] },
    rel.length && { t: "Temas relacionados", filhos: rel },
  ] };
}
