/* ============================================================
   39-conversa — Modo conversa (#/conversa): tirar dúvidas por voz com o assistente.
   · Entradas: botão "Modo conversa" no Assistente (05-ia) e "Tirar dúvida por voz" no player
     depois de responder (06-ui), que leva a questão (enunciado, alternativas, gabarito, explicação).
   · Fala: o iframe do Claude bloqueia o microfone, então a entrada é o ditado do teclado do celular.
     Se o navegador tiver SpeechRecognition, aparece um 🎤; ao primeiro erro ele some até recarregar.
   · Resposta em streaming, limpa de markdown, lida em voz alta ao terminar (leitura de 37-interacao),
     com Repetir, Mais devagar/Normal, Explicar de outro jeito e Parar.
   · O sample não tem memória: cada pedido leva as instruções + contexto no 1º turno e as últimas trocas.
   ============================================================ */
const CV = { turns: [], ctx: null, ctrl: null, n: 0, gerando: false, parcial: "", erro: null, negado: false,
  rascunho: "", micOff: false, rec: null, ouvindo: false, abrindo: false, rolou: false };
const MAX_TROCAS_CV = 10;
/** Códigos em que o recurso some nesta visualização (nunca pedir de novo). */
const NEGADO_CV = ["not_granted", "sampling_disabled", "not_declared", "capability_disabled", "capability_removed"];
const conversaDisponivel = () => IA.disponivel() && !CV.negado;
const vozCVLigada = () => store.doc("perfil").cvVoz !== false;   // padrão: ligada
const lentoCV = () => ls.get("gab2:cv-lento", false) === true;
const velCV = () => lentoCV() ? Math.round(Math.min(velVoz(), 1) * 75) / 100 : velVoz();
const ultimaRespostaCV = () => [...CV.turns].reverse().find(t => t.role === "assistant")?.content || "";
const SRecCV = () => window.SpeechRecognition || window.webkitSpeechRecognition;
const micCV = () => !CV.micOff && typeof SRecCV() === "function";
const rolarCV = el => el?.scrollIntoView({ block: "start", behavior: semMovimento() ? "auto" : "smooth" });

/** Texto limpo para mostrar e para ler: sem **, #, listas, tabelas, links, crases. */
function limparMd(t) {
  return String(t || "")
    .replace(/```[\w-]*\n?/g, "").replace(/`([^`]*)`/g, "$1")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^[ \t]*#{1,6}[ \t]*/gm, "").replace(/^[ \t]*>[ \t]?/gm, "")
    .replace(/^[ \t]*([-*_])([ \t]*\1){2,}[ \t]*$/gm, "")                           // linha horizontal
    .replace(/^[ \t]*\|?[ \t]*:?-{2,}:?[ \t]*(\|[ \t]*:?-{2,}:?[ \t]*)*\|?[ \t]*$/gm, "")   // separador de tabela
    .replace(/^[ \t]*\|(.*)\|[ \t]*$/gm, (m, c) => c.split("|").map(s => s.trim()).filter(Boolean).join(", ") + ".")
    .replace(/^[ \t]*(?:[-*+•]|\d{1,2}[.)])[ \t]+(.*)$/gm, (m, it) => it + (/[.!?:;,]$/.test(it.trim()) ? "" : "."))   // item de lista vira frase
    .replace(/(\*\*|__)(.+?)\1/g, "$2")
    .replace(/(^|[^\w*])\*(?!\s)([^*\n]+?)\*(?!\w)/g, "$1$2")
    .replace(/(^|[^\w_])_(?!\s)([^_\n]+?)_(?!\w)/g, "$1$2")
    .replace(/\*+/g, "").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

/* ---------- Contexto ---------- */
function areaQuestaoCV(q) {
  const t = TEMAS[q.tema], esp = t?.especialidades?.[0];
  return (esp && ESPECIALIDADES[esp]?.nome) || (t?.dominio === "enem" ? ENEM_DISC[t.disciplinaId]?.nome || t.areaNome : null) || t?.nome || TRILHAS[q.t]?.curto || "estudo";
}
function ctxQuestaoCV(q, ordem, esc) {
  const O = Array.isArray(ordem) && ordem.length === 5 ? ordem.slice() : [0, 1, 2, 3, 4], letra = i => LETRAS[O.indexOf(i)];
  const texto = [`Questão de ${areaQuestaoCV(q)}${q.tema && TEMAS[q.tema] ? " (tema: " + TEMAS[q.tema].nome + ")" : ""}:`, q.q,
    "Alternativas, na ordem em que a estudante viu:", ...O.map((j, k) => `${LETRAS[k]}) ${q.o[j]}`),
    `Gabarito: ${letra(q.c)}) ${q.o[q.c]}`,
    esc != null && q.o[esc] != null ? `A estudante marcou ${letra(esc)}) ${q.o[esc]} e ${esc === q.c ? "acertou" : "errou"}.` : "",
    `Explicação do banco de questões: ${q.e || "sem explicação cadastrada."}`].filter(Boolean).join("\n");
  return { chave: "q:" + q.id, qid: q.id, sobre: `Sobre: questão de ${areaQuestaoCV(q)}`, detalhe: q.q.length > 90 ? q.q.slice(0, 88).trim() + "…" : q.q, texto };
}
function instrucoesCV() {
  const o = objetivo(), tr = trilhasDoObjetivo();
  const area = o === "enem" ? "ENEM e vestibulares" : o === "direito" || o === "oab" ? "Direito e Exame da OAB" : tr.includes("medicina") || !o ? "Medicina e Residência Médica" : "estudos";
  const SIS = `Você é um tutor de ${area} conversando por voz com uma estudante brasileira. Suas respostas serão LIDAS EM VOZ ALTA.
Regras:
- Português do Brasil. Respostas curtas: no máximo cerca de 120 palavras, a não ser que ela peça mais.
- Frases curtas e simples, como numa conversa. Sem markdown: sem asteriscos, sem títulos, sem tabelas, sem listas longas (no máximo três itens, ditos em frase corrida).
- Escreva números e siglas de um jeito fácil de falar; use números por extenso quando ajudar a fala.
- Não invente. Se não souber, diga que não sabe.
- Se a dúvida for sobre a questão do contexto, use o gabarito e a explicação fornecidos.
${area.startsWith("Medicina") ? "- Condutas clínicas são educacionais, para prova, e não orientação médica real.\n" : ""}- Termine com uma pergunta curta para checar se ela entendeu, ou com uma sugestão de próximo passo.`;
  return `${SIS}\n\nCONTEXTO\n${CV.ctx?.texto || "Conversa livre, sem questão específica."}\n\nA conversa com a estudante começa a seguir.`;
}
/** Turnos do pedido: instruções + contexto no 1º turno; depois as últimas ~10 trocas (começando em "user"). */
function turnosCV() {
  let hist = CV.turns.slice(-MAX_TROCAS_CV * 2);
  while (hist.length && hist[0].role !== "user") hist = hist.slice(1);
  return [{ role: "user", content: instrucoesCV() }, ...hist.map(t => ({ role: t.role, content: String(t.content).slice(0, 4000) }))];
}

/* ---------- Conversa ---------- */
function novaConversa(ctx) {
  CV.n++; CV.ctrl?.abort(); CV.ctrl = null; pararVoz();
  Object.assign(CV, { turns: [], ctx: ctx || null, gerando: false, parcial: "", erro: null });
}
function enviarCV(conteudo, mostrar) {
  conteudo = String(conteudo || "").trim();
  if (!conteudo || !conversaDisponivel()) return;
  CV.turns.push({ role: "user", content: conteudo.slice(0, 2000), ...(mostrar ? { mostrar } : {}) });
  pedirCV();
}
async function pedirCV() {
  if (CV.turns.at(-1)?.role !== "user") return;
  CV.ctrl?.abort(); pararVoz();   // um pedido de cada vez: o anterior é cancelado
  const n = ++CV.n, ctrl = CV.ctrl = new AbortController();
  Object.assign(CV, { gerando: true, parcial: "", erro: null, rolou: false });
  redesenharCV(); rolarCV($("#cv-ult"));
  try {
    const r = await IA.conversar(turnosCV(), { signal: ctrl.signal, onText: t => {
      if (n !== CV.n) return;
      CV.parcial = limparMd(t);
      const el = $("#cv-ult .cv-tx"); if (el) el.textContent = CV.parcial;
    } });
    if (n !== CV.n) return;
    CV.turns.push({ role: "assistant", content: (limparMd(r?.text) || "…") + (r?.truncated ? " (A resposta foi cortada. Peça para continuar.)" : "") });
    Object.assign(CV, { gerando: false, parcial: "", ctrl: null });
    redesenharCV(); rolarCV($("#cv-ult"));
    if (vozCVLigada() && vozDisponivel()) lerCV(); else focarCampoCV(true);
  } catch (e) {
    if (n !== CV.n) return;
    Object.assign(CV, { gerando: false, ctrl: null });
    const c = e?.code, parcial = limparMd(e?.text || CV.parcial); CV.parcial = "";
    if (NEGADO_CV.includes(c)) { CV.negado = true; render(); return; }
    if (c === "cancelled") { if (parcial) CV.turns.push({ role: "assistant", content: parcial + " (interrompida)" }); }
    else if (c === "rate_limited") CV.erro = { msg: "Muitas perguntas seguidas, espere um pouco e pergunte de novo." };
    else CV.erro = { msg: "Não consegui responder agora.", repetir: true };
    redesenharCV();
    if (CV.erro) $("#cv-hist .cv-erro")?.focus({ preventScroll: true });
  }
}
function lerCV() { if (ultimaRespostaCV()) falar("cv", { vel: velCV(), aoFim: () => focarCampoCV(true) }); }
const LIBERA_CV = ["pointerdown", "touchstart", "mousedown", "click", "keydown", "blur"];
/** Foco de volta no campo. semTeclado: só leva o foco (readonly até o próximo toque/tecla), sem abrir o teclado. */
function focarCampoCV(semTeclado) {
  const t = $("#cv-q"), a = document.activeElement; if (!t || a === t) return;
  if (a && a !== document.body && !$("#cv")?.contains(a)) return;   // não rouba o foco de outro lugar
  if (semTeclado) {
    t.readOnly = true;
    const soltar = () => { t.readOnly = false; LIBERA_CV.forEach(ev => t.removeEventListener(ev, soltar)); };
    LIBERA_CV.forEach(ev => t.addEventListener(ev, soltar));
  }
  t.focus({ preventScroll: true });
}

/* ---------- Tela ---------- */
rota("/conversa", () => paginaConversa());
function paginaConversa() {
  const base = { secao: "assistente", titulo: "Modo conversa", rotulo: "Conversa", voltar: true, ilu: "" };
  if (!conversaDisponivel()) return { ...base, html: vazio(CV.negado ? "O assistente não foi autorizado nesta visualização, então o Modo conversa fica desligado." : "O Modo conversa precisa do assistente do Claude, que não está disponível aqui.", `<a class="btn" href="#/">Ir para o início</a>`) };
  setTimeout(depoisDeAbrirCV, 0);
  const ctx = CV.ctx;
  return { ...base, html: `<section class="cv" id="cv">
    <div class="cv-sobre"><p class="cv-assunto"><b>${esc(ctx?.sobre || "Conversa livre")}</b>${ctx?.detalhe ? `<span>${esc(ctx.detalhe)}</span>` : ""}</p>
      <button class="btn sec" data-act="cv-limpar">Trocar assunto / limpar</button></div>
    <div class="cv-hist" id="cv-hist" aria-live="polite" aria-busy="${CV.gerando}">${htmlHistCV()}</div>
    <div id="cv-ctrl">${htmlCtrlCV()}</div>
    <form class="cv-form" data-form="cv-enviar">
      <label class="cv-lab" for="cv-q">Sua dúvida</label>
      <textarea id="cv-q" data-act="cv-campo" rows="3" maxlength="2000" enterkeyhint="send" autocomplete="off" autocapitalize="sentences" placeholder="Fale ou digite sua dúvida" aria-describedby="cv-dica">${esc(CV.rascunho)}</textarea>
      <div class="cv-envio"><button type="submit" class="btn azul cv-perguntar" data-act="cv-perguntar">Perguntar</button>${htmlMicCV()}</div>
      <p class="cv-dica" id="cv-dica">${CV.micOff ? "Use o microfone do teclado para falar." : "Para falar, toque no 🎤 do teclado."}</p>
    </form></section>` };
}
const htmlMicCV = () => micCV() ? `<button type="button" class="btn sec cv-mic" id="cv-mic" data-act="cv-mic" aria-pressed="${CV.ouvindo}"><span aria-hidden="true">🎤</span> ${CV.ouvindo ? "Ouvindo… toque para parar" : "Falar"}</button>` : "";
function htmlHistCV() {
  const balao = (quem, tx, ult, pend) => `<div class="cv-b ${quem === "user" ? "eu" : "ia"}${pend ? " pendente" : ""}"${ult ? ' id="cv-ult"' : ""}><span class="cv-quem">${quem === "user" ? "Você" : "Assistente"}</span><p class="cv-tx">${esc(tx)}</p></div>`;
  const ultIA = CV.gerando ? -1 : CV.turns.map(t => t.role).lastIndexOf("assistant");
  let h = CV.turns.map((t, i) => balao(t.role, t.mostrar || t.content, i === ultIA)).join("");
  if (CV.gerando) h += balao("assistant", CV.parcial || "Pensando…", true, true);
  if (CV.erro) h += `<div class="aviso cv-erro" role="alert" tabindex="-1"><p>${esc(CV.erro.msg)}</p>${CV.erro.repetir ? `<button class="btn azul" data-act="cv-tentar">Tentar de novo</button>` : ""}</div>`;
  return h || `<p class="cv-vazio">${CV.ctx?.qid ? "Pergunte o que ficou de dúvida nesta questão. Por exemplo: por que a minha resposta está errada?" : "Pergunte qualquer dúvida de estudo. Por exemplo: qual a diferença entre sensibilidade e especificidade?"}</p>`;
}
function htmlCtrlCV() {
  const voz = vozDisponivel(), lento = lentoCV();
  const parar = `<button class="btn sec" data-act="cv-parar"><span aria-hidden="true">⏹</span> Parar</button>`;
  let b = "";
  if (CV.gerando) b = parar;
  else if (ultimaRespostaCV()) b = (voz ? `<button class="btn sec" data-act="cv-repetir"><span aria-hidden="true">🔁</span> Repetir</button>
      <button class="btn sec" data-act="cv-lento" aria-pressed="${lento}">${lento ? `<span aria-hidden="true">🐇</span> Normal` : `<span aria-hidden="true">🐢</span> Mais devagar`}</button>` : "")
    + `<button class="btn sec" data-act="cv-outro"><span aria-hidden="true">🔄</span> Explicar de outro jeito</button>` + (voz ? parar : "");
  const chave = voz ? `<label class="check cv-voz"><input type="checkbox" role="switch" data-chg="cv-voz" ${vozCVLigada() ? "checked" : ""}><span>Ler respostas em voz alta</span></label>` : "";
  return (b ? `<div class="cv-acoes">${b}</div>` : "") + chave;
}
/** Redesenha só o histórico e os controles (o campo e o teclado ficam como estão). */
function redesenharCV() {
  const h = $("#cv-hist"), c = $("#cv-ctrl"); if (!h || !c) return;
  const f = document.activeElement, act = c.contains(f) ? f.dataset.act : null;
  h.setAttribute("aria-busy", String(CV.gerando)); h.innerHTML = htmlHistCV(); c.innerHTML = htmlCtrlCV();
  if (act) (c.querySelector(`[data-act="${act}"]`) || c.querySelector("button"))?.focus({ preventScroll: true });
}
function depoisDeAbrirCV() {
  if (!$("#cv")) return;
  if (CV.abrindo) { CV.abrindo = false; $("#cv-q")?.focus({ preventScroll: true }); }
  const u = $("#cv-ult"); if (u) u.scrollIntoView({ block: "start" });
}

/* ---------- Entradas ---------- */
function abrirConversa(ctx) {
  if (!conversaDisponivel()) return;
  if (ctx ? ctx.chave !== CV.ctx?.chave : !CV.turns.length && !CV.gerando) novaConversa(ctx);
  CV.abrindo = true;
  ir("#/conversa");
  /* Dentro da folha do Assistente a tela é desenhada na hora: focar ainda no toque abre o teclado no iPhone. */
  const t = $("#cv-q"); if (t) { CV.abrindo = false; t.focus({ preventScroll: true }); }
}
ACOES["cv-abrir"] = () => {
  const q = PL.ativo && PL.resp && document.getElementById("pl") ? qPorId(PL.ids[PL.i]) : null;
  if (q) return abrirConversa(ctxQuestaoCV(q, PL.ordem, PL.esc));
  const tema = PAGINA?.ctx?.tema;
  if (tema && TEMAS[tema]) return abrirConversa({ chave: "tema:" + tema, sobre: "Sobre: " + TEMAS[tema].nome, texto: IA.contexto() });
  abrirConversa(null);
};
ACOES["cv-questao"] = () => { const q = qPorId(PL.ids[PL.i]); if (!q || !PL.resp) return; pararVoz(); abrirConversa(ctxQuestaoCV(q, PL.ordem, PL.esc)); };

/* ---------- Ações da tela ---------- */
ACOES["cv-perguntar"] = () => {
  const t = $("#cv-q"); if (!t) return;
  const v = t.value.trim();
  if (!v) { t.readOnly = false; t.focus(); return; }   // campo vazio: o toque leva ao campo (o teclado sobe)
  t.value = ""; CV.rascunho = "";
  if (document.activeElement === t) t.blur();   // o teclado desce e a resposta fica à vista
  pararMicCV(); enviarCV(v);
};
FORMS["cv-enviar"] = () => ACOES["cv-perguntar"]();
ACOES["cv-tentar"] = () => { if (!CV.gerando) pedirCV(); };   // uma tentativa por toque, nunca em laço
ACOES["cv-limpar"] = () => { pararMicCV(); novaConversa(null); CV.rascunho = ""; render(); const t = $("#cv-q"); if (t) { t.value = ""; t.focus({ preventScroll: true }); } toast("Conversa nova"); };
ACOES["cv-repetir"] = () => { pararVoz(); lerCV(); };
ACOES["cv-lento"] = () => { ls.set("gab2:cv-lento", !lentoCV()); redesenharCV(); pararVoz(); if (vozDisponivel()) lerCV(); };
ACOES["cv-outro"] = () => { if (!ultimaRespostaCV()) return; pararVoz();
  enviarCV("Não entendi bem. Explique a sua última resposta de outro jeito, mais simples, usando uma analogia do dia a dia. Continue curto.", "Explique de outro jeito, mais simples, por favor."); };
ACOES["cv-parar"] = () => { pararVoz(); if (CV.gerando) CV.ctrl?.abort(); };
MUDANCAS["cv-voz"] = el => { const P = store.doc("perfil"); P.cvVoz = !!el.checked; store.mudou("perfil"); if (!el.checked) pararVoz(); toast(el.checked ? "Respostas lidas em voz alta" : "Leitura das respostas desligada"); };
document.addEventListener("input", e => { if (e.target?.id === "cv-q") CV.rascunho = e.target.value; });
/* Enter envia (Shift+Enter quebra a linha); no celular é a tecla "Enviar" do teclado. */
document.addEventListener("keydown", e => {
  if (e.target?.id !== "cv-q" || e.key !== "Enter" || e.shiftKey || e.isComposing) return;
  e.preventDefault(); ACOES["cv-perguntar"]();
});

/* ---------- Microfone (só se o navegador permitir; senão, o ditado do teclado) ---------- */
function pararMicCV() { const r = CV.rec; if (!r) return; CV.rec = null; CV.ouvindo = false; r.onerror = r.onend = r.onresult = null; try { r.abort(); } catch (e) { } atualizarMicCV(); }
function atualizarMicCV() { const b = $("#cv-mic"); if (b) b.outerHTML = htmlMicCV(); }
function micFalhouCV() {
  const r = CV.rec; CV.rec = null; CV.ouvindo = false; CV.micOff = true;   // some até recarregar: nunca insistir
  if (r) { r.onerror = r.onend = r.onresult = null; try { r.abort(); } catch (e) { } }
  $("#cv-mic")?.remove();
  const d = $("#cv-dica"); if (d) d.textContent = "Use o microfone do teclado para falar.";
  toast("Use o microfone do teclado para falar");
}
ACOES["cv-mic"] = () => {
  if (CV.rec) { try { CV.rec.stop(); } catch (e) { pararMicCV(); } return; }
  const SR = SRecCV(); if (!micCV()) return;
  let r; try { r = new SR(); r.lang = "pt-BR"; r.interimResults = true; r.continuous = false; r.maxAlternatives = 1; } catch (e) { micFalhouCV(); return; }
  const antes = CV.rascunho.trim() ? CV.rascunho.trim() + " " : "";
  r.onresult = ev => { let s = ""; for (const res of ev.results) s += res[0]?.transcript || ""; CV.rascunho = antes + s.trim(); const t = $("#cv-q"); if (t) t.value = CV.rascunho; };
  r.onerror = () => micFalhouCV();
  r.onend = () => { if (CV.rec !== r) return; CV.rec = null; CV.ouvindo = false; atualizarMicCV(); if (CV.rascunho.trim()) $("#cv-q")?.focus({ preventScroll: true }); };
  pararVoz(); CV.rec = r;
  try { r.start(); CV.ouvindo = true; atualizarMicCV(); } catch (e) { micFalhouCV(); }
};

/* ---------- Saída da tela: cancela o pedido, o microfone e a leitura da conversa ---------- */
AO_RENDER.push(cam => {
  if (cam === "/conversa") return;
  if (CV.ctrl) CV.ctrl.abort();
  pararMicCV();
  if (VOZ.id === "cv") pararVoz();
});
