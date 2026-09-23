/* ============================================================
   05-ia — assistente de estudo.
   Toda chamada leva o CONTEXTO da página (caminho, instituição, período,
   disciplina, tema, objetivos, desempenho e erros recentes), nunca só a mensagem.
   ============================================================ */
const IA = (() => {
  let sample = null, ultimo = null, gerando = false, ctrl = null;
  async function iniciar() {
    const use = window.claude && window.claude.use; if (!use) return;
    try { sample = await use("sample"); } catch (e) { sample = null; }
    if (sample) atualizar();
  }
  const disponivel = () => !!sample;
  const SISTEMA = "Você é um assistente de estudos de um estudante brasileiro (Medicina — UFAM/UEA — e ENEM/vestibulares). Responda em português do Brasil, de forma didática e objetiva. O conteúdo é educacional e não substitui atendimento a paciente real. Nunca invente dados curriculares (disciplinas, módulos, cargas horárias, períodos): se não estiverem no contexto, diga que não sabe. Evite doses exatas e metas que variam entre diretrizes; quando necessário, oriente conferir a diretriz vigente.";

  /** Monta o contexto a partir da página atual (PAGINA.ctx é preenchido por cada página). */
  function contexto(extra = {}) {
    const pg = PAGINA || {}, c = { ...(pg.ctx || {}), ...extra }, L = [];
    if (pg.crumbs?.length || pg.titulo) L.push("Local no app: " + [...(pg.crumbs || []).map(x => x[0]), pg.titulo].filter(Boolean).join(" → "));
    if (c.grade) { const g = gradePorId(c.grade); if (g) L.push(`Matriz: ${instPorId(g.instituicao)?.sigla || g.instituicao} — ${CURSOS[g.curso] || g.curso} — ${g.versao || "versão não informada"} (${statusGrade(g).nome})`); }
    if (c.periodo) L.push("Período: " + c.periodo + "º");
    if (c.disciplina) L.push("Disciplina/módulo: " + c.disciplina);
    if (c.especialidade) L.push("Especialidade: " + (ESPECIALIDADES[c.especialidade]?.nome || c.especialidade));
    if (c.tema && TEMAS[c.tema]) {
      const t = TEMAS[c.tema], d = desempenhoTema(c.tema);
      L.push(`Tema: ${t.nome}${t.dominio === "enem" ? ` (ENEM — ${t.areaNome})` : ""}`);
      if (t.subtemas?.length) L.push("Subtemas: " + t.subtemas.map(s => s.nome).join("; "));
      if (t.objetivos?.length) L.push("Objetivos de aprendizagem: " + t.objetivos.join("; "));
      if (t.disciplinas?.length) L.push("Disciplinas relacionadas: " + t.disciplinas.join(", "));
      if (t.especialidades?.length) L.push("Especialidades: " + t.especialidades.map(e => ESPECIALIDADES[e]?.nome || e).join(", "));
      if (t.resumo) L.push("Resumo de referência: " + t.resumo);
      L.push(d.n ? `Desempenho do aluno no tema: ${pct(d.ac, d.n)}% de acerto em ${d.n} respostas.` : "O aluno ainda não respondeu questões deste tema.");
      const errs = Object.values(store.doc("erros").itens).filter(e => e.tema === c.tema).slice(-3).map(e => qPorId(e.qid)).filter(Boolean);
      if (errs.length) L.push("Questões que o aluno errou neste tema:\n" + errs.map(q => `- ${q.q.slice(0, 220)} (correta: ${q.o[q.c]})`).join("\n"));
    }
    if (c.subtema) L.push("Subtema em foco: " + c.subtema);
    if (c.questao) { const q = qPorId(c.questao); if (q) L.push(`Questão em foco: ${q.q}\nAlternativas: ${q.o.join(" | ")}\nGabarito: ${q.o[q.c]}`); }
    if (c.caso) L.push("Caso clínico em foco: " + c.caso);
    if (c.texto) L.push(c.texto);
    return L.join("\n");
  }
  const mensagemErro = e => e?.code === "not_granted" ? "O assistente não foi autorizado nesta visualização." : e?.code === "rate_limited" ? "Muitos pedidos seguidos. Tente novamente em alguns minutos." : e?.code === "cancelled" ? "Cancelado." : "Não foi possível falar com o assistente agora.";

  async function texto(pedido, onText, extra) {
    if (!sample) throw { code: "not_granted" };
    ctrl = new AbortController();
    const r = await sample(`${SISTEMA}\n\nCONTEXTO\n${contexto(extra) || "(sem contexto específico)"}\n\nPEDIDO\n${pedido}`, { onText: ({ text }) => onText && onText(text), signal: ctrl.signal, cache: false });
    return r.text;
  }
  async function json(pedido, formato, extra) {
    if (!sample) throw { code: "not_granted" };
    ctrl = new AbortController();
    return sample.json(`${SISTEMA}\n\nCONTEXTO\n${contexto(extra) || "(sem contexto específico)"}\n\nPEDIDO\n${pedido}\n\nResponda SOMENTE com JSON no formato: ${formato}`, { signal: ctrl.signal });
  }

  /* ---------- Ações do assistente ---------- */
  const ACOES_IA = [
    ["explicar", "Explicar o assunto", "Explique o tema/assunto em foco para um estudante, do básico ao que costuma cair em prova, em até 350 palavras, com os pontos que mais confundem."],
    ["resumo", "Criar resumo", "Faça um resumo estruturado (tópicos curtos) do tema em foco, cobrindo os objetivos de aprendizagem. Até 300 palavras."],
    ["mapa", "Mapa mental", "Crie um mapa mental em texto do tema em foco, usando indentação com dois espaços e hífens (máximo 4 níveis, até 40 linhas). Sem markdown além disso."],
    ["relacionar", "Relacionar conteúdos", "Relacione o tema em foco com outros temas e disciplinas (ciclo básico ↔ clínica, ou entre áreas do ENEM), explicando cada conexão em uma frase."],
    ["erro", "Explicar meus erros", "Analise as questões que o aluno errou neste tema (ver contexto), diga o provável motivo de cada erro e o que revisar."],
    ["questoes", "Gerar questões", null],
    ["cards", "Gerar flashcards", null],
    ["caso", "Gerar caso clínico", null],
    ["plano", "Plano de revisão", null],
  ];

  function abrir() {
    const ctx = contexto();
    const temTema = !!PAGINA?.ctx?.tema;
    abrirFolha(`<h2 class="sec">${icone("ia")} Assistente de estudo</h2>
      <p class="ia-ctx">${ctx ? esc(ctx.split("\n").slice(0, 3).join(" · ")).slice(0, 260) : "Sem contexto: abra um tema, disciplina ou questão para respostas mais precisas."}</p>
      <div class="chips" style="margin:10px 0">${ACOES_IA.filter(([k]) => temTema || ["explicar", "resumo", "relacionar", "plano"].includes(k) || k === "questoes").map(([k, t]) => `<button class="chip" data-act="ia-acao" data-v="${k}">${t}</button>`).join("")}</div>
      <form data-form="ia-pergunta" class="linha"><input type="text" id="ia-q" placeholder="Pergunte algo sobre este conteúdo" style="flex:1" required><button class="btn">Perguntar</button></form>
      <div id="ia-saida" style="margin-top:12px">${ultimo ? ultimo : ""}</div>
      <p class="small muted">Respostas geradas por IA: confira na bibliografia. Uso consome sua conta Claude.</p>`);
  }
  function saida(html) { ultimo = html; const el = document.getElementById("ia-saida"); if (el) el.innerHTML = html; }
  async function rodarTexto(pedido, titulo) {
    if (gerando) return; gerando = true;
    saida(`<h3>${esc(titulo)}</h3><div class="ia-txt" id="ia-out">Pensando…</div><div class="acoes" id="ia-pos"><button class="btn sec mini" data-act="ia-cancelar">Cancelar</button></div>`);
    try {
      const t = await texto(pedido, s => { const el = document.getElementById("ia-out"); if (el) el.textContent = s; });
      const tema = PAGINA?.ctx?.tema;
      saida(`<h3>${esc(titulo)}</h3><div class="ia-txt ${titulo === "Mapa mental" ? "mm" : ""}">${esc(t)}</div>${tema ? `<div class="acoes"><button class="btn sec mini" data-act="ia-salvar-nota">Salvar nas anotações do tema</button></div>` : ""}`);
      IA._txt = { titulo, t, tema };
    } catch (e) { saida(`<div class="aviso">${mensagemErro(e)}</div>`); }
    gerando = false;
  }

  async function gerarQuestoes(n = 5) {
    const c = PAGINA?.ctx || {}, t = TEMAS[c.tema];
    const trilha = t?.dominio === "enem" ? "enem" : c.trilha || (c.tema ? "medicina" : "enem");
    saida(`<p class="muted">Gerando ${n} questões…</p>`);
    try {
      const arr = await json(`Crie ${n} questões de múltipla escolha INÉDITAS sobre o tema em foco (${trilha === "enem" ? "nível ENEM/vestibular" : "nível graduação/residência em Medicina"}), com 5 alternativas, uma correta, e explicação curta citando a base. Varie a posição da correta.`,
        `[{"enunciado":"","alternativas":["","","","",""],"correta":0,"explicacao":"","dificuldade":2}]`);
      const ok = (Array.isArray(arr) ? arr : []).filter(x => x && typeof x.enunciado === "string" && Array.isArray(x.alternativas) && x.alternativas.length === 5 && x.correta >= 0 && x.correta < 5);
      IA._lote = ok.map(x => ({ id: novoId("q"), t: trilha, area: t?.disciplinas?.[0] || t?.nome || "Geral", enunciado: x.enunciado, alternativas: x.alternativas.map(String), correta: +x.correta, explicacao: String(x.explicacao || ""), tema: c.tema || null, disciplina: c.disciplina || t?.disciplinas?.[0] || null, dificuldade: [1, 2, 3].includes(x.dificuldade) ? x.dificuldade : 2, src: "ia", fonte: "ia" }));
      saida(ok.length ? `<h3>${ok.length} questões geradas</h3><ol class="small">${IA._lote.map(x => `<li>${esc(x.enunciado.slice(0, 140))}</li>`).join("")}</ol><div class="acoes"><button class="btn" data-act="ia-salvar-questoes">Salvar no banco</button></div>` : `<div class="aviso">A resposta não trouxe questões válidas. Tente de novo.</div>`);
    } catch (e) { saida(`<div class="aviso">${mensagemErro(e)}</div>`); }
  }
  async function gerarCards() {
    const c = PAGINA?.ctx || {};
    saida(`<p class="muted">Gerando flashcards…</p>`);
    try {
      const arr = await json("Crie 8 flashcards objetivos sobre o tema em foco (pergunta curta na frente, resposta direta no verso), priorizando o que o aluno erra.", `[{"frente":"","verso":""}]`);
      IA._cards = (Array.isArray(arr) ? arr : []).filter(x => x?.frente && x?.verso).map(x => ({ frente: String(x.frente), verso: String(x.verso), tema: c.tema || null, origem: "ia" }));
      saida(IA._cards.length ? `<h3>${IA._cards.length} flashcards</h3><ul class="small">${IA._cards.map(x => `<li><b>${esc(x.frente)}</b> — ${esc(x.verso)}</li>`).join("")}</ul><div class="acoes"><button class="btn" data-act="ia-salvar-cards">Salvar flashcards</button></div>` : `<div class="aviso">Nenhum flashcard válido. Tente de novo.</div>`);
    } catch (e) { saida(`<div class="aviso">${mensagemErro(e)}</div>`); }
  }
  async function gerarCaso() {
    const c = PAGINA?.ctx || {};
    saida(`<p class="muted">Gerando caso clínico educacional…</p>`);
    try {
      const x = await json("Crie um caso clínico EDUCACIONAL fictício sobre o tema em foco, coerente e sem doses de medicamentos, com contexto amazônico quando fizer sentido.",
        `{"titulo":"","identificacao":"","queixaPrincipal":"","hda":"","antecedentes":"","exameFisico":"","exames":"","perguntas":[{"pergunta":"","resposta":""}],"hipoteses":[""],"diferenciais":[""],"conduta":"","discussao":"","dificuldade":2}`);
      if (!x?.titulo || !x?.hda) throw { code: "invalid" };
      IA._caso = { ...x, id: novoId("caso"), temaId: c.tema || null, espId: TEMAS[c.tema]?.especialidades?.[0] || null, disciplina: c.disciplina || TEMAS[c.tema]?.disciplinas?.[0] || "", src: "ia" };
      saida(`<h3>${esc(x.titulo)}</h3><p class="small">${esc(x.queixaPrincipal || "")}</p><div class="acoes"><button class="btn" data-act="ia-salvar-caso">Salvar em Casos clínicos</button></div>`);
    } catch (e) { saida(`<div class="aviso">${e?.code === "invalid" ? "O caso veio incompleto. Tente de novo." : mensagemErro(e)}</div>`); }
  }
  async function gerarPlano() {
    saida(`<p class="muted">Montando plano de revisão…</p>`);
    const p = pendencias(), fracos = listaPor(agregados().por.tema, 2).sort((a, b) => a.p - b.p).slice(0, 6).map(x => `${nomeTema(x.k)} (${Math.round(x.p * 100)}%)`);
    try {
      const arr = await json(`Monte um plano de revisão para os próximos 7 dias considerando: revisões vencidas (${p.total}), temas com pior desempenho: ${fracos.join(", ") || "sem dados"}. Cada item com dia (0 = hoje), título curto, minutos e número de questões.`, `[{"dia":0,"titulo":"","minutos":30,"questoes":10}]`);
      IA._plano = (Array.isArray(arr) ? arr : []).filter(x => x?.titulo).slice(0, 21).map(x => ({ data: somaDias(hoje(), Math.max(0, Math.min(30, +x.dia || 0))), titulo: String(x.titulo), min: +x.minutos || 30, nq: +x.questoes || 0 }));
      saida(IA._plano.length ? `<h3>Plano sugerido</h3>${tabela([{ t: "Dia" }, { t: "Atividade" }, { t: "Min", num: 1 }], IA._plano.map(x => [dataBR(x.data), esc(x.titulo), x.min]))}<div class="acoes"><button class="btn" data-act="ia-salvar-plano">Adicionar ao planejamento</button></div>` : `<div class="aviso">Sem plano válido. Tente de novo.</div>`);
    } catch (e) { saida(`<div class="aviso">${mensagemErro(e)}</div>`); }
  }

  function explicarQuestao(q, escolhida, ordem, onText) {
    const letra = i => LETRAS[ordem.indexOf(i)];
    onText("Pensando…");
    texto(`Explique por que a alternativa correta está certa e por que cada errada está errada, em até 200 palavras. O aluno marcou ${letra(escolhida)}.\nQuestão: ${q.q}\n${ordem.map((j, k) => LETRAS[k] + ") " + q.o[j]).join("\n")}\nGabarito: ${letra(q.c)}`, onText, { tema: q.tema })
      .then(onText).catch(e => onText(mensagemErro(e)));
  }

  /* ---------- Eventos ---------- */
  ACOES["ia-abrir"] = () => abrir();
  ACOES["ia-cancelar"] = () => ctrl?.abort();
  ACOES["ia-acao"] = el => {
    const k = el.dataset.v, a = ACOES_IA.find(x => x[0] === k);
    if (a[2]) return rodarTexto(a[2], a[1]);
    ({ questoes: gerarQuestoes, cards: gerarCards, caso: gerarCaso, plano: gerarPlano })[k]();
  };
  FORMS["ia-pergunta"] = f => { const q = f.querySelector("#ia-q").value.trim(); if (q) rodarTexto(q, "Resposta"); };
  ACOES["ia-salvar-nota"] = () => {
    const { titulo, t, tema } = IA._txt || {}; if (!tema) return;
    const N = store.doc("notas"); const n = N.temas[tema] = N.temas[tema] || { texto: "" };
    n.texto = (n.texto ? n.texto + "\n\n" : "") + `— ${titulo} (gerado por IA em ${dataBR(hoje())}, conferir) —\n${t}`; n.atualizado = Date.now(); store.mudou("notas");
    toast("Salvo nas anotações do tema"); atualizar();
  };
  ACOES["ia-salvar-questoes"] = () => { (IA._lote || []).forEach(salvarQuestaoPropria); toast(`${IA._lote?.length || 0} questões salvas`); IA._lote = []; saida(""); atualizar(); };
  ACOES["ia-salvar-cards"] = () => { (IA._cards || []).forEach(criarCard); toast(`${IA._cards?.length || 0} flashcards criados`); IA._cards = []; saida(""); atualizar(); };
  ACOES["ia-salvar-caso"] = () => { const C = store.doc("casos"); C.itens[IA._caso.id] = IA._caso; store.mudou("casos"); toast("Caso salvo"); saida(""); fecharFolha(); ir("#/casos/" + IA._caso.id); };
  ACOES["ia-salvar-plano"] = () => { const P = store.doc("plano"); (IA._plano || []).forEach(x => { const id = novoId("p"); P.itens[id] = { id, ...x, tema: null, disciplina: null, rev: false, feito: false }; }); store.mudou("plano"); toast("Plano adicionado"); saida(""); fecharFolha(); ir("#/plano"); };

  return { iniciar, disponivel, contexto, explicarQuestao, texto, json, mensagemErro, abrir };
})();
