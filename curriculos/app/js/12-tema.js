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
const ABAS_TEMA = [["visao", "Visão geral"], ["questoes", "Questões"], ["flashcards", "Flashcards"], ["casos", "Casos"], ["notas", "Anotações"], ["materiais", "Materiais"], ["erros", "Erros"], ["desempenho", "Desempenho"]];
rota("/tema/:id", p => paginaTema(p.id, "visao"));
rota("/tema/:id/:aba", p => paginaTema(p.id, p.aba));

function paginaTema(id, aba) {
  const t = TEMAS[id]; if (!t) return paginaNaoEncontrada();
  const med = t.dominio === "medicina";
  const qs = questoes().filter(q => q.tema === id), d = desempenhoTema(id), rev = store.doc("revisoes").temas[id];
  const cs = cards().filter(c => c.tema === id), casos = todosCasos().filter(c => c.temaId === id);
  const nota = store.doc("notas").temas[id], mats = Object.values(store.doc("materiais").itens).filter(m => m.tema === id);
  const errs = Object.values(store.doc("erros").itens).filter(e => e.tema === id);
  const onde = med ? ondeNaGrade(id) : [], minha = onde.find(o => o.minha);
  const abas = ABAS_TEMA.filter(([k]) => med || k !== "casos").map(([k, n]) => [k, n + ({ questoes: qs.length, flashcards: cs.length, casos: casos.length, erros: errs.filter(e => e.status === "aberto").length, materiais: mats.length }[k] ? ` (${({ questoes: qs.length, flashcards: cs.length, casos: casos.length, erros: errs.filter(e => e.status === "aberto").length, materiais: mats.length })[k]})` : "")]);
  let corpo = "";

  if (aba === "visao") {
    corpo = `<div class="grid g2">
      <section class="caixa"><h2 class="sec">${t.dominio === "enem" ? "Teoria essencial" : "Resumo"}</h2>${t.resumo ? `<p class="leitura">${esc(t.resumo)}</p><p class="small muted">Resumo de referência (autoral). Aprofunde na bibliografia da disciplina.</p>` : `<p class="muted">Resumo ainda não cadastrado.</p>`}
        ${IA.disponivel() ? `<button class="btn sec mini" data-act="ia-abrir">Pedir explicação ao assistente</button>` : ""}</section>
      <section class="caixa"><h2 class="sec">Revisão espaçada</h2>
        ${rev ? `<p>Próxima revisão: <b>${dataBR(rev.prox)}</b> (${quando(rev.prox)}) · etapa ${rev.etapa + 1}</p>` : `<p class="muted">Ainda não agendada. Marque como estudado para programar revisões em 1, 7, 30 e 90 dias (ajustadas pelo seu desempenho).</p>`}
        <div class="linha"><button class="btn" data-act="tema-estudei" data-t="${esc(id)}">${rev ? "Estudei de novo hoje" : "Marcar como estudado"}</button>${rev && vencido(rev) ? `<a class="btn azul" href="#/revisoes/tema/${encodeURIComponent(id)}">Revisar agora</a>` : ""}</div>
        <div class="kpis" style="margin-top:12px"><div class="kpi"><b>${d.n ? pct(d.ac, d.n) + "%" : "—"}</b><span>acerto (${d.n} resp.)</span></div><div class="kpi"><b>${d.vistas}/${qs.length}</b><span>questões vistas</span></div></div></section>
    </div>
    ${t.objetivos?.length ? `<h2 class="sec">Objetivos de aprendizagem</h2><ul class="leitura" style="white-space:normal">${t.objetivos.map(o => `<li>${esc(o)}</li>`).join("")}</ul><p class="small muted">Objetivos sugeridos. Os objetivos oficiais vêm do plano de ensino da sua faculdade.</p>` : ""}
    ${t.subtemas?.length ? `<h2 class="sec">Subtemas</h2>${tabela([{ t: "Subtema" }, { t: "Questões", num: 1 }, { t: "Acerto", num: 1 }], t.subtemas.map(s => { const a = agregados(q => q.tema === id && q.subtema === s.id), n = qs.filter(q => q.subtema === s.id).length; return [esc(s.nome), n, a.n ? pct(a.ac, a.n) + "%" : "—"]; }))}` : ""}
    ${med ? `<div class="grid g2"><section><h2 class="sec">Onde aparece nas suas grades</h2>${onde.length ? tabela([{ t: "Instituição" }, { t: "Período", num: 1 }, { t: "Disciplina/módulo" }], onde.map(o => [esc(nomeInst(o.g.instituicao)) + (o.minha ? " " + pill("minha", "azul") : ""), o.periodo + "º", `<a href="#/medicina/grade/${esc(o.g.id)}/item/${esc(o.item.id)}">${esc(o.item.nome)}</a>`])) : `<p class="muted small">Não vinculado a nenhuma disciplina das matrizes importadas.</p>`}</section>
      <section><h2 class="sec">Disciplinas e especialidades relacionadas</h2><p class="small muted" style="margin-top:0">Referência geral (não é a grade de uma faculdade).</p>
        <div class="chips">${(t.especialidades || []).map(e => `<a class="chip" href="#/medicina/esp/${esc(e)}">${esc(ESPECIALIDADES[e]?.nome || e)}</a>`).join("")}</div>
        <p class="small" style="margin-top:8px">${(t.disciplinas || []).map(esc).join(" · ")}</p></section></div>` : ""}`;
  }
  else if (aba === "questoes") {
    const chave = "tema:" + id;
    if (playerAtivo(chave)) corpo = htmlPlayer();
    else corpo = qs.length ? `<div class="acoes" style="margin-top:0"><button class="btn" data-act="tema-praticar" data-t="${esc(id)}" data-m="todas">Praticar todas (${qs.length})</button>
        ${qs.some(q => statusQ(q).chave === "nao") ? `<button class="btn sec" data-act="tema-praticar" data-t="${esc(id)}" data-m="novas">Só não respondidas</button>` : ""}
        ${qs.some(q => statusQ(q).chave === "incorreta") ? `<button class="btn sec" data-act="tema-praticar" data-t="${esc(id)}" data-m="erradas">Só as que errei</button>` : ""}</div>
      ${listaQuestoes(qs)}` : vazio("Nenhuma questão deste tema no banco ainda.", IA.disponivel() ? `<button class="btn" data-act="ia-abrir">Gerar questões com o assistente</button>` : `<a class="btn sec" href="#/biblioteca/questoes">Cadastrar questão</a>`);
  }
  else if (aba === "flashcards") {
    corpo = `<div class="acoes" style="margin-top:0">${cs.some(c => vencido(c.srs)) ? `<a class="btn" href="#/flashcards/estudar/${encodeURIComponent(id)}">Estudar ${cs.filter(c => vencido(c.srs)).length} vencidos</a>` : ""}<button class="btn sec" data-act="card-novo" data-t="${esc(id)}">+ Novo flashcard</button>${qs.length ? `<button class="btn sec" data-act="tema-cards-questoes" data-t="${esc(id)}">Criar a partir das questões</button>` : ""}</div>
      ${tabelaCards(cs, "Nenhum flashcard deste tema.")}`;
  }
  else if (aba === "casos") corpo = casos.length ? tabelaCasos(casos) : vazio("Nenhum caso clínico deste tema.", IA.disponivel() ? `<button class="btn" data-act="ia-abrir">Gerar caso com o assistente</button>` : "");
  else if (aba === "notas") {
    corpo = `<label class="campo"><span class="lab">Suas anotações (salvas automaticamente)</span><textarea id="nota-txt" rows="14" data-inp="nota" data-t="${esc(id)}" placeholder="Resumo próprio, mnemônicos, dúvidas para levar à aula…">${esc(nota?.texto || "")}</textarea></label>
      <p class="small muted" id="nota-st">${nota?.atualizado ? "Última edição: " + new Date(nota.atualizado).toLocaleString("pt-BR") : ""}</p>`;
  }
  else if (aba === "materiais") corpo = `${listaMateriais(mats)}<div class="acoes"><button class="btn sec" data-act="mat-novo" data-t="${esc(id)}">+ Adicionar material</button></div>`;
  else if (aba === "erros") {
    corpo = errs.length ? tabelaErros(errs) : vazio("Nenhum erro registrado neste tema. Erros entram aqui automaticamente.");
  }
  else if (aba === "desempenho") {
    const hist = qs.flatMap(q => (progDe(q)?.h || []).map(h => ({ ts: h[0], ok: h[2], ms: h[3] }))).sort((a, b) => a.ts - b.ts);
    corpo = `<div class="kpis"><div class="kpi"><b>${d.n ? pct(d.ac, d.n) + "%" : "—"}</b><span>acerto</span></div><div class="kpi"><b>${d.n}</b><span>respostas</span></div><div class="kpi"><b>${d.tempoMedio ? mmss(d.tempoMedio) : "—"}</b><span>tempo médio</span></div><div class="kpi"><b>${cs.filter(c => c.srs.etapa >= 2).length}/${cs.length}</b><span>cards consolidados</span></div></div>
      ${t.subtemas?.length ? `<h2 class="sec">Por subtema</h2><div class="barras">${t.subtemas.map(s => { const a = agregados(q => q.tema === id && q.subtema === s.id); return a.n ? barra(esc(s.nome), a.ac, a.n) : ""; }).join("") || `<p class="muted">Sem respostas por subtema ainda.</p>`}</div>` : ""}
      <h2 class="sec">Últimas tentativas</h2>${tabela([{ t: "Data" }, { t: "Resultado" }, { t: "Tempo", num: 1 }], hist.slice(-15).reverse().map(h => [new Date(h.ts).toLocaleString("pt-BR"), h.ok ? pill("certa", "ok") : pill("errada", "bad"), h.ms ? mmss(h.ms) : "—"]), { vaziaMsg: "Sem tentativas registradas." })}`;
  }
  return {
    secao: med ? "medicina" : "enem", crumbs: crumbsTema(t), titulo: t.nome,
    sub: `${med ? (t.especialidades || []).map(e => ESPECIALIDADES[e]?.nome).filter(Boolean).join(" · ") : `ENEM · ${esc(t.areaNome)}`}${(t.sinonimos || []).length ? ` · também: ${t.sinonimos.map(esc).join(", ")}` : ""}`,
    html: abas.length ? `<div class="tabs" role="tablist">${abas.map(([k, n]) => `<a role="tab" href="#/tema/${encodeURIComponent(id)}/${k}" aria-selected="${k === aba}">${n}</a>`).join("")}</div>${corpo}` : corpo,
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
function listaQuestoes(qs, limite = 200) {
  const cls = { correta: "ok", incorreta: "bad", nao: "" };
  return tabela([{ t: "Questão" }, { t: "Tema" }, { t: "Dif." }, { t: "Status" }],
    qs.slice(0, limite).map(q => { const s = statusQ(q); return [`<a href="#/questoes/q/${esc(q.id)}">${esc(q.q.length > 110 ? q.q.slice(0, 110) + "…" : q.q)}</a>`, q.tema ? linkTema(q.tema) : esc(q.a), q.dif ? DIFICULDADE[q.dif] : "—", pill(s.nome, cls[s.chave]) + (s.marcada ? " ★" : "") + (s.revisar ? " ↻" : "")]; }))
    + (qs.length > limite ? `<p class="small muted">Mostrando ${limite} de ${qs.length}. Use os filtros para refinar.</p>` : "");
}
