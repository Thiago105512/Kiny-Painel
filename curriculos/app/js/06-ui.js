/* ============================================================
   06-ui — roteador, layout, navegação e componentes reutilizáveis.
   Páginas registram rotas e devolvem {secao, crumbs, titulo, sub, acoes, html, ctx}.
   Eventos são delegados: data-act (clique), data-chg (change), data-inp (input), data-form (submit).
   ============================================================ */
const ROTAS = [];
function rota(padrao, fn) { const partes = padrao.split("/").filter(Boolean); ROTAS.push({ partes, fn }); }
function casar(caminho) {
  const seg = caminho.split("/").filter(Boolean).map(decodeURIComponent);
  for (const r of ROTAS) {
    if (r.partes.length !== seg.length) continue;
    const p = {}; let ok = true;
    r.partes.forEach((x, i) => { if (x[0] === ":") p[x.slice(1)] = seg[i]; else if (x !== seg[i]) ok = false; });
    if (ok) return { r, p };
  }
  return null;
}
const caminhoAtual = () => (location.hash || "#/").slice(1) || "/";
function ir(h) { if (location.hash === h) render(); else location.hash = h; }
let PAGINA = null; // última página renderizada (contexto para a IA)

/* ---------- Ícones (traço simples) ---------- */
const IC = {
  inicio: "M3 11l9-7 9 7M5 10v10h14V10",
  medicina: "M9 3h6v6h6v6h-6v6H9v-6H3V9h6z",
  enem: "M4 5h16v14H4zM8 9h8M8 13h5",
  questoes: "M9 9a3 3 0 1 1 4 2.8c-.7.3-1 1-1 1.7V15M12 18.5v.5",
  flashcards: "M4 7h13v12H4zM7 4h13v12",
  revisoes: "M4 12a8 8 0 1 0 3-6.2M4 4v4h4M12 8v4l3 2",
  casos: "M8 4h8v3H8zM6 6H5v15h14V6h-1M9 12h6M9 16h4",
  simulados: "M12 8v4l2 2M12 21a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM10 2h4",
  plano: "M4 6h16v14H4zM4 10h16M8 3v5M16 3v5",
  desempenho: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  biblioteca: "M5 4h4v16H5zM10 4h4v16h-4zM15 5l4 1-3 14-4-1z",
  mais: "M5 12h.01M12 12h.01M19 12h.01",
  ia: "M12 3l1.8 4.6L18 9l-4.2 1.4L12 15l-1.8-4.6L6 9l4.2-1.4zM18 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z",
  busca: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-5-5",
};
const icone = n => `<svg class="icone" viewBox="0 0 24 24" aria-hidden="true"><path d="${IC[n] || ""}"/></svg>`;

/* Navegação em grupos: o que estudar, praticar, revisar e organizar */
const GRUPOS_NAV = [
  ["", [["inicio", "#/", "Início"]]],
  ["Estudar", [["medicina", "#/medicina", "Medicina"], ["enem", "#/enem", "ENEM e vestibulares"]]],
  ["Praticar", [["questoes", "#/questoes", "Questões"], ["simulados", "#/simulados", "Simulados"], ["casos", "#/casos", "Casos clínicos"]]],
  ["Revisar", [["revisoes", "#/revisoes", "Revisões"], ["flashcards", "#/flashcards", "Flashcards"]]],
  ["Organizar", [["plano", "#/plano", "Planejamento"], ["desempenho", "#/desempenho", "Desempenho"], ["biblioteca", "#/biblioteca", "Biblioteca"]]],
];
const NAV = GRUPOS_NAV.flatMap(g => g[1]);
const INFERIOR = ["inicio", "medicina", "enem", "revisoes"];
const CURTO = { enem: "ENEM" };

function desenharNav(secao) {
  const n = pendencias().total;
  const badge = k => k === "revisoes" && n ? `<span class="n" aria-label="${n} pendentes">${n}</span>` : "";
  $("#nav-lateral").innerHTML = GRUPOS_NAV.map(([g, itens]) => (g ? `<div class="grupo">${g}</div>` : "") +
    itens.map(([k, h, t]) => `<a href="${h}" ${k === secao ? 'aria-current="page"' : ""}>${icone(k)}<span>${t}</span>${badge(k)}</a>`).join("")).join("");
  $("#nav-inferior").innerHTML = INFERIOR.map(k => { const [, h, t] = NAV.find(x => x[0] === k);
    return `<a href="${h}" ${k === secao ? 'aria-current="page"' : ""}>${icone(k)}<span>${CURTO[k] || t}</span>${badge(k)}</a>`; }).join("")
    + `<button data-act="menu-mais" ${INFERIOR.includes(secao) ? "" : 'aria-current="page"'}>${icone("mais")}<span>Mais</span></button>`;
}
ACOES["menu-mais"] = () => abrirFolha(GRUPOS_NAV.filter(([g]) => g).map(([g, itens]) => {
  const extra = g === "Estudar" ? [["enem", "#/redacao", "Redação"]] : g === "Revisar" ? [["questoes", "#/erros", "Caderno de erros"]] : [];
  return `<div class="menu-grupo"><h3>${g}</h3><div class="links-lista">${itens.concat(extra).filter(([k, h]) => !INFERIOR.includes(k) || extra.some(x => x[1] === h)).map(([k, h, t]) => `<a href="${h}" data-act="fechar-folha"><span class="linha" style="flex-wrap:nowrap">${icone(k)}${t}</span></a>`).join("")}</div></div>`;
}).join(""), { titulo: "Menu" });

/* ---------- Render ---------- */
function render(opts = {}) {
  const cam = caminhoAtual().split("?")[0];
  const m = casar(cam);
  let pg;
  try { pg = m ? m.r.fn(m.p) : paginaNaoEncontrada(); }
  catch (e) { console.error(e); pg = { secao: "", titulo: "Algo deu errado nesta página", html: `<div class="aviso">A página não pôde ser montada (${esc(e.message)}). Seus dados não foram afetados. <a href="#/">Voltar ao início</a></div>` }; }
  if (typeof pg === "string") pg = { html: pg };
  PAGINA = pg;
  desenharNav(pg.secao);
  const crumbs = pg.crumbs?.length ? `<nav class="crumbs" aria-label="Você está em">${pg.crumbs.map(([t, h], i) => (i ? '<span aria-hidden="true">›</span>' : "") + (h ? `<a href="${h}">${esc(t)}</a>` : `<span>${esc(t)}</span>`)).join("")}</nav>` : "";
  const titulo = pg.titulo ? `<div class="titulo"><h1>${esc(pg.titulo)}</h1>${pg.acoes ? `<div class="linha">${pg.acoes}</div>` : ""}${pg.sub ? `<div class="sub">${pg.sub}</div>` : ""}</div>` : "";
  const fab = IA.disponivel() && pg.secao !== "assistente" ? `<button class="btn azul fab" data-act="ia-abrir" aria-label="Abrir assistente de estudo">${icone("ia")} Assistente</button>` : "";
  $("#view").innerHTML = crumbs + titulo + (pg.html || "") + fab;
  document.title = (pg.titulo ? pg.titulo + " · " : "") + "Gabarito Amazonas";
  if (opts.topo) { window.scrollTo(0, 0); $("#view").focus({ preventScroll: true }); }
}
const atualizar = () => render();
function paginaNaoEncontrada() { return { titulo: "Página não encontrada", html: vazio("Este endereço não existe mais.", `<a class="btn" href="#/">Ir para o início</a>`) }; }

/* ---------- Componentes ---------- */
const vazio = (txt, botoes = "") => `<div class="vazio"><p>${txt}</p>${botoes ? `<div class="linha">${botoes}</div>` : ""}</div>`;
const pill = (t, cls = "") => `<span class="pill ${cls}">${esc(t)}</span>`;
const medidor = (p, cls = "") => `<div class="meter ${cls}" role="img" aria-label="${Math.round(p)}%"><i style="width:${Math.max(0, Math.min(100, p))}%"></i></div>`;
const barra = (rotulo, a, n, extra = "") => `<div class="barra"><span>${rotulo}</span><small>${pct(a, n)}% · ${a}/${n}${extra}</small>${medidor(pct(a, n), pct(a, n) < 50 ? "bad" : "")}</div>`;
function tabela(cols, linhas, { resp = true, vaziaMsg = "Nada para mostrar." } = {}) {
  if (!linhas.length) return vazio(vaziaMsg);
  return `<div class="tabela-wrap"><table class="${resp ? "resp" : ""}"><thead><tr>${cols.map(c => `<th class="${c.num ? "num" : ""}" scope="col">${esc(c.t)}</th>`).join("")}</tr></thead><tbody>${linhas.map(l => `<tr>${l.map((v, i) => `<td class="${cols[i].num ? "num" : ""}" data-l="${esc(cols[i].t)}">${v ?? "—"}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}
const abas = (itens, atual, acao) => `<div class="tabs" role="tablist">${itens.map(([k, t]) => `<button role="tab" aria-selected="${k === atual}" data-act="${acao}" data-v="${k}">${t}</button>`).join("")}</div>`;
const chips = (itens, atual, acao, extra = "") => `<div class="chips">${itens.map(([k, t]) => `<button class="chip" aria-pressed="${String(k) === String(atual)}" data-act="${acao}" data-v="${esc(k)}" ${extra}>${esc(t)}</button>`).join("")}</div>`;
const opcoes = (itens, atual, vazioTxt) => (vazioTxt !== undefined ? `<option value="">${esc(vazioTxt)}</option>` : "") + itens.map(([k, t]) => `<option value="${esc(k)}" ${String(k) === String(atual ?? "") ? "selected" : ""}>${esc(t)}</option>`).join("");
const linkTema = id => TEMAS[id] ? `<a href="#/tema/${encodeURIComponent(id)}">${esc(TEMAS[id].nome)}</a>` : `<span class="muted">${esc(id || "sem tema")}</span>`;
/** Campo de tema com autocompletar (datalist global). Guarda o id no data-tema-id via lookup do nome. */
const campoTema = (id, valor, rotulo = "Tema") => `<label class="campo"><span class="lab">${rotulo}</span><input type="text" id="${id}" list="dl-temas" value="${esc(TEMAS[valor]?.nome || "")}" placeholder="Digite para buscar"></label>`;
const lerTema = id => { const v = document.getElementById(id)?.value.trim(); return v ? (temaPorNome(v) || null) : null; };

function toast(msg) {
  const t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); t.textContent = msg;
  document.body.appendChild(t); setTimeout(() => t.remove(), 2600);
}
function abrirFolha(html, { titulo } = {}) {
  $("#camada").innerHTML = `<div class="folha-fundo" data-act="fechar-folha"></div><div class="folha" role="dialog" aria-modal="true" ${titulo ? `aria-label="${esc(titulo)}"` : ""}><button class="btn sec mini fechar-x" data-act="fechar-folha" aria-label="Fechar">✕</button>${titulo ? `<h2 class="sec">${esc(titulo)}</h2>` : ""}${html}</div>`;
  $("#camada .folha").querySelector("input,textarea,select")?.focus();
}
function fecharFolha() { $("#camada").innerHTML = ""; }
ACOES["fechar-folha"] = () => fecharFolha();

/* ---------- Delegação de eventos ---------- */
document.addEventListener("click", e => {
  const el = e.target.closest("[data-act]"); if (!el) return;
  const f = ACOES[el.dataset.act]; if (!f) return;
  const href = el.tagName === "A" ? el.getAttribute("href") || "" : "";
  if (href.startsWith("#") && href.length > 1) { f(el, e); return; } // link de rota: deixa navegar
  e.preventDefault(); f(el, e);
});
document.addEventListener("change", e => { const el = e.target.closest("[data-chg]"); if (el && MUDANCAS[el.dataset.chg]) MUDANCAS[el.dataset.chg](el, e); });
let _tInp = null;
document.addEventListener("input", e => { const el = e.target.closest("[data-inp]"); if (!el || !ENTRADAS[el.dataset.inp]) return; clearTimeout(_tInp); _tInp = setTimeout(() => ENTRADAS[el.dataset.inp](el, e), 220); });
document.addEventListener("submit", e => { const f = e.target.closest("form[data-form]"); if (!f) return; e.preventDefault(); FORMS[f.dataset.form]?.(f, e); });
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && $("#camada").innerHTML) { fecharFolha(); return; }
  if (/INPUT|TEXTAREA|SELECT/.test(e.target.tagName) || e.ctrlKey || e.metaKey || e.altKey || $("#camada").innerHTML) return;
  if (PL.ativo && document.getElementById("pl")) teclaPlayer(e);
  else if (SIM.fase === "prova" && document.getElementById("prova")) teclaProva(e);
});
window.addEventListener("hashchange", () => { fecharFolha(); render({ topo: true }); });

/* ============================================================
   Player de questões — usado em Questões, Tema, Revisões, Caderno de erros.
   Registra resposta, tempo, erro e oferece flashcard / IA.
   ============================================================ */
const PL = { ativo: false, chave: null, ids: [], i: 0, ordem: [], esc: null, resp: false, t0: 0, origem: "pratica", res: [], aoFim: null, ia: "", fim: false };
function iniciarPlayer(chave, ids, origem = "pratica", aoFim = null) {
  Object.assign(PL, { ativo: true, chave, ids: ids.slice(), i: 0, esc: null, resp: false, origem, res: [], aoFim, ia: "", fim: false });
  prepararQuestao();
}
function prepararQuestao() { PL.ordem = embaralhar([0, 1, 2, 3, 4]); PL.esc = null; PL.resp = false; PL.t0 = Date.now(); PL.ia = ""; }
const playerAtivo = chave => PL.ativo && PL.chave === chave;
function htmlPlayer() {
  if (PL.fim) {
    const ac = PL.res.filter(r => r.ok).length, n = PL.res.length;
    return `<div class="caixa" id="pl-fim"><h2 class="sec">Sessão concluída</h2>
      <div class="kpis"><div class="kpi"><b>${ac}/${n}</b><span>acertos</span></div><div class="kpi"><b>${pct(ac, n)}%</b><span>aproveitamento</span></div>
      <div class="kpi"><b>${mmss(PL.res.reduce((s, r) => s + r.ms, 0) / Math.max(1, n))}</b><span>tempo médio</span></div></div>
      ${PL.msgFim ? `<p class="aviso info">${PL.msgFim}</p>` : ""}
      <div class="acoes"><button class="btn sec" data-act="pl-sair">Fechar</button>${PL.res.some(r => !r.ok) ? `<a class="btn" href="#/erros">Ver caderno de erros</a>` : ""}</div></div>`;
  }
  const q = qPorId(PL.ids[PL.i]); if (!q) return vazio("Questão indisponível.");
  const st = statusQ(q);
  const alts = PL.ordem.map((i, pos) => {
    let s = ""; if (PL.resp) { if (i === q.c) s = "ok"; else if (i === PL.esc) s = "bad"; } else if (i === PL.esc) s = "sel";
    return `<li><button class="alt" data-act="pl-alt" data-i="${i}" data-s="${s}" ${PL.resp ? "disabled" : ""}><span class="bolha">${LETRAS[pos]}</span><span>${esc(q.o[i])}</span></button></li>`;
  }).join("");
  const letra = i => LETRAS[PL.ordem.indexOf(i)];
  const ok = PL.esc === q.c;
  return `<article class="caixa questao" id="pl">
    <div class="meta"><span>${PL.i + 1}/${PL.ids.length}</span><span>${esc(TRILHAS[q.t]?.curto || q.t)}</span>${q.tema ? `<span>${linkTema(q.tema)}</span>` : `<span>${esc(q.a)}</span>`}${q.dif ? `<span>${DIFICULDADE[q.dif]}</span>` : ""}${q.src !== "banco" ? `<span>${q.src === "ia" ? "gerada por IA" : "minha"}</span>` : ""}${st.n ? `<span>${st.ac}/${st.n} antes</span>` : ""}</div>
    <p class="enunciado">${esc(q.q)}</p>
    <ol class="alts">${alts}</ol>
    ${PL.resp ? `<div class="retorno"><p class="veredito ${ok ? "ok" : "bad"}">${ok ? "Certo" : "Errado — gabarito " + letra(q.c)}${PL.ms ? ` · ${mmss(PL.ms)}` : ""}</p><p class="leitura" style="color:var(--ink2);margin:0">${esc(q.e || "Sem explicação cadastrada.")}</p>
      ${!ok ? `<p class="small muted" style="margin:8px 0 0">Registrado no <a href="#/erros">caderno de erros</a> com revisão amanhã.</p>` : ""}
      ${PL.ia ? `<h3>Assistente</h3><div class="ia-txt" id="pl-ia">${esc(PL.ia)}</div>` : ""}</div>` : ""}
    <div class="acoes">
      ${PL.resp ? `<button class="btn" data-act="pl-prox">${PL.i < PL.ids.length - 1 ? "Próxima" : "Concluir"}</button>` : `<button class="btn" data-act="pl-confirmar" ${PL.esc === null ? "disabled" : ""}>Confirmar</button><button class="btn sec" data-act="pl-pular">Pular</button>`}
      <button class="btn sec mini" data-act="pl-flag" data-f="m" aria-pressed="${st.marcada}">${st.marcada ? "★ Marcada" : "☆ Marcar"}</button>
      <button class="btn sec mini" data-act="pl-flag" data-f="r" aria-pressed="${st.revisar}">${st.revisar ? "↻ Revisar" : "Revisar depois"}</button>
      ${PL.resp ? `<button class="btn sec mini" data-act="pl-card">+ Flashcard</button>${IA.disponivel() ? `<button class="btn sec mini" data-act="pl-ia">Explicar com IA</button>` : ""}` : ""}
      ${PL.ids.length > 1 ? `<button class="btn sec mini dir" data-act="pl-encerrar">Encerrar sessão</button>` : ""}
    </div></article><p class="small muted">Atalhos: A–E escolhem · Enter confirma/avança</p>`;
}
ACOES["pl-alt"] = el => { if (PL.resp) return; PL.esc = +el.dataset.i; atualizar(); };
ACOES["pl-confirmar"] = () => {
  if (PL.esc === null || PL.resp) return;
  const q = qPorId(PL.ids[PL.i]); PL.ms = Date.now() - PL.t0; PL.resp = true;
  const ok = registrarResposta(q, PL.esc, PL.ms, PL.origem);
  PL.res.push({ id: q.id, ok, ms: PL.ms, tema: q.tema }); atualizar();
};
ACOES["pl-prox"] = () => { if (PL.i < PL.ids.length - 1) { PL.i++; prepararQuestao(); } else { PL.fim = true; PL.msgFim = PL.aoFim ? PL.aoFim(PL.res) : ""; } atualizar(); document.getElementById("pl")?.scrollIntoView({ block: "start" }); };
ACOES["pl-pular"] = () => { if (PL.i < PL.ids.length - 1) { PL.i++; prepararQuestao(); } else { PL.fim = true; PL.msgFim = PL.aoFim ? PL.aoFim(PL.res) : ""; } atualizar(); };
ACOES["pl-flag"] = el => { const q = qPorId(PL.ids[PL.i]); const v = alternarFlag(q, el.dataset.f); toast(el.dataset.f === "m" ? (v ? "Questão marcada" : "Marcação removida") : (v ? "Adicionada a revisar" : "Removida de revisar")); atualizar(); };
ACOES["pl-card"] = () => { const q = qPorId(PL.ids[PL.i]); const id = cardDeQuestao(q, PL.esc === q.c ? "questao" : "erro"); const E = store.doc("erros"); if (E.itens[q.id]) { E.itens[q.id].card = id; store.mudou("erros"); } toast("Flashcard criado — revisão a partir de hoje"); };
ACOES["pl-ia"] = () => { const q = qPorId(PL.ids[PL.i]); IA.explicarQuestao(q, PL.esc, PL.ordem, t => { PL.ia = t; const el = document.getElementById("pl-ia"); if (el) el.textContent = t; else atualizar(); }); };
ACOES["pl-sair"] = () => { PL.ativo = false; atualizar(); };
ACOES["pl-encerrar"] = () => { if (!PL.res.length) { PL.ativo = false; } else { PL.fim = true; PL.msgFim = PL.aoFim ? PL.aoFim(PL.res) : ""; } atualizar(); };
function teclaPlayer(e) {
  if (PL.fim) return;
  const i = LETRAS.indexOf(e.key.toUpperCase());
  if (i >= 0 && !PL.resp) { PL.esc = PL.ordem[i]; atualizar(); }
  else if (e.key === "Enter") { e.preventDefault(); PL.resp ? ACOES["pl-prox"]() : ACOES["pl-confirmar"](); }
}
