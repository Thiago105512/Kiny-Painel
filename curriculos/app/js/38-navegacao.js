/* ============================================================
   38-navegacao — voltar fácil, em qualquer tela:
   · histórico interno do app (cada entrada sabe o endereço, o rótulo e a rolagem);
   · botão "← Destino" grande no topo das páginas internas (06-ui chama htmlVoltar);
   · voltar do celular/navegador: fecha a folha aberta, pausa o player (a sessão fica
     guardada e aparece "Continuar sessão"), restaura a rolagem das listas;
   · questão aberta de uma lista: "‹ Anterior · N de M · Próxima ›" e "Voltar para a lista";
   · deslizar da borda esquerda para a direita = voltar; Alt+← e Backspace (fora de campos).
   ============================================================ */
try { history.scrollRestoration = "manual"; } catch (e) { }
/** pilha[idx] = { h: endereço, rot: rótulo curto, y: rolagem ao sair }. idx vem de history.state.nav. */
const NAVS = { idx: 0, pilha: {}, y: 0, ignorar: null, renderizado: null };
(function () {
  const s = history.state;
  if (s && Number.isInteger(s.nav)) NAVS.idx = s.nav;
  else try { history.replaceState({ nav: 0 }, ""); } catch (e) { }
  NAVS.pilha[NAVS.idx] = { h: location.hash || "#/" };
})();
addEventListener("scroll", () => { NAVS.y = scrollY; }, { passive: true });
const folhaAberta = () => !!$("#camada")?.innerHTML;
const ROT_MAX = 24;
const rotCurto = t => { t = String(t || "").trim(); return t && t.length <= ROT_MAX ? t : "Voltar"; };

/** Nova entrada no histórico do app (o "futuro" depois dela é descartado). */
function novaEntrada(extra = {}) {
  const novo = NAVS.idx + 1;
  Object.keys(NAVS.pilha).forEach(k => { if (+k >= novo) delete NAVS.pilha[k]; });
  NAVS.pilha[novo] = { h: location.hash || "#/", ...extra };
  NAVS.idx = novo;
  return novo;
}
function guardarRolagem() { const e = NAVS.pilha[NAVS.idx]; if (e) e.y = NAVS.y; }

/* ---------- Folhas: abrir empurra um estado; o voltar do celular fecha a folha ---------- */
let _focoAntesFolha = null;
function marcarFolhaAberta() {
  _focoAntesFolha = document.activeElement && document.activeElement !== document.body ? document.activeElement : null;
  if (history.state?.tipo === "folha") return;   // reaberta antes do history.back() pendente
  guardarRolagem();
  try { history.pushState({ nav: novaEntrada({ folha: true, rot: NAVS.pilha[NAVS.idx]?.rot }), tipo: "folha" }, ""); } catch (e) { }
}
/** Fecha só a camada (sem mexer no histórico): usado quando a própria navegação já tira a folha. */
function fecharFolhaDom() { $("#camada").innerHTML = ""; }
/** Fechar pelo ✕, pelo fundo, por Esc ou por um formulário: tira a entrada da folha do histórico. */
function fecharFolhaNav() {
  const aberta = folhaAberta(); fecharFolhaDom();
  if (!aberta) return;
  const f = _focoAntesFolha; _focoAntesFolha = null;
  if (f && document.contains(f)) try { f.focus({ preventScroll: true }); } catch (e) { }
  if (history.state?.tipo !== "folha") return;
  const idx = NAVS.idx;
  /* Adiado: se o código em seguida navegar (ir), a entrada da folha já foi trocada e nada é desfeito. */
  setTimeout(() => {
    if (history.state?.tipo !== "folha" || history.state.nav !== idx || folhaAberta()) return;
    NAVS.ignorar = { de: idx, ate: Date.now() + 1500 }; history.back();
  }, 0);
}
/** Troca a entrada atual por outro endereço (sem criar entrada nova): folha → página, anterior/próxima. */
function substituirEntrada(h) {
  guardarRolagem();
  try { history.replaceState({ nav: NAVS.idx }, "", h); } catch (e) { location.hash = h; return; }
  NAVS.pilha[NAVS.idx] = { h };
  fecharFolhaDom(); pararVoz(); render({ topo: true }); depoisDeNavegar(false);
}
/** ir() do app: dentro de uma folha, a página nova toma o lugar da folha no histórico. */
function navegarPara(h) {
  if (history.state?.tipo === "folha") { if (location.hash === h) { fecharFolhaNav(); render(); } else substituirEntrada(h); return; }
  if (location.hash === h) render(); else location.hash = h;
}
/* Links dentro da folha (menu "Mais", tema, questão…) também trocam a entrada da folha. */
addEventListener("click", e => {
  const a = e.target.closest?.('a[href^="#/"]'); if (!a || e.defaultPrevented || e.button > 0 || e.ctrlKey || e.metaKey || e.shiftKey) return;
  registrarListaDoClique(a);
  if (!a.closest("#camada") || history.state?.tipo !== "folha") return;
  e.preventDefault(); e.stopPropagation();
  const h = a.getAttribute("href"); if (h === location.hash) { fecharFolhaNav(); render(); } else substituirEntrada(h);
}, true);

/* ---------- Player: voltar pausa a sessão (fica guardada) ---------- */
/** Ao sair do player pelo voltar: sessão pela metade fica pausada; terminada (ou de uma questão só) é fechada. */
function pausarSeVisivel() {
  if (!PL.ativo || !(document.getElementById("pl") || document.getElementById("pl-fim"))) return false;
  if (PL.fim || PL.ids.length <= 1) { PL.ativo = false; return true; }
  PL.pausada = true; pararVoz(); return true;
}
/** Sessão começada sem trocar de endereço (Praticar na lista, no tema, na revisão): ganha uma entrada
    própria, para o voltar do celular sair do player e não da página. */
function marcarEntradaPlayer(chave) {
  const h = location.hash;
  Promise.resolve().then(() => {
    if (!PL.ativo || PL.chave !== chave || PL.ids.length <= 1 || location.hash !== h || history.state?.tipo) return;
    guardarRolagem();
    try { history.pushState({ nav: novaEntrada({ player: true, rot: "Sessão de questões" }), tipo: "player" }, ""); } catch (e) { return; }
    const nv = document.querySelector("#view .nav-voltar"); if (nv && PAGINA) nv.outerHTML = htmlVoltar(PAGINA);   // agora "voltar" sai do player
  });
}
/** Endereços onde cada sessão aparece. */
function casaSessao(chave, cam) {
  const [tipo, ...r] = String(chave).split(":"), ref = r.join(":");
  if (tipo === "banco") return cam === "/questoes";
  if (tipo === "tema") return cam === `/tema/${ref}/praticar` || cam === `/tema/${ref}/questoes`;
  if (tipo === "rev") return cam === "/revisoes/tema/" + ref;
  if (tipo === "erros") return cam === "/revisoes/erros/" + ref;
  return false;
}
function hrefSessao(chave) {
  const [tipo, ...r] = String(chave).split(":"), ref = encodeURIComponent(r.join(":"));
  return { banco: "#/questoes", tema: `#/tema/${ref}/praticar`, rev: "#/revisoes/tema/" + ref, erros: "#/revisoes/erros/" + ref }[tipo] || null;
}
/** Sessões pela metade que não estão na tela: a atual (pausada ou deixada para trás) e as guardadas. */
function sessoesAbertas() {
  const out = [], ok = s => s && s.ativo !== false && !s.fim && s.ids?.length > 1 && hrefSessao(s.chave);
  if (ok(PL)) out.push(PL);   // só é chamado no Início, onde o player nunca está
  Object.values(SALVOS).forEach(s => { if (ok(s) && s.chave !== PL.chave) out.push(s); });
  return out;
}
const descSessao = s => `${esc(s.rotulo || (String(s.chave).startsWith("rev:") ? "Revisão de tema" : String(s.chave).startsWith("erros:") ? "Refazer erros" : "Sessão de questões"))} · questão ${s.i + 1} de ${s.ids.length}`;
/** Faixa "Continuar sessão" na página da sessão pausada. */
function faixaSessaoPausada(pg) {
  if (/id="pl"/.test(pg?.html || "")) return "";
  const cam = caminhoAtual().split("?")[0];
  const s = [PL, ...Object.values(SALVOS)].find(x => x && x.ativo !== false && x.pausada && !x.fim && x.ids?.length > 1 && casaSessao(x.chave, cam));
  if (!s) return "";
  return `<div class="faixa continuar" role="region" aria-label="Sessão pausada"><p><b>Sessão pausada</b><br><span class="small">${descSessao(s)}</span></p>
    <span class="linha"><button class="btn azul" data-act="pl-continuar" data-c="${esc(s.chave)}">Continuar sessão</button><button class="btn sec" data-act="pl-descartar" data-c="${esc(s.chave)}">Encerrar</button></span></div>`;
}
/** Início: "Continuar de onde parou" (sessões, simulado e jogo pela metade). */
function blocoContinuar() {
  const itens = sessoesAbertas().map(s => `<div class="tarefa"><div class="o">${descSessao(s)}</div><button class="btn mini azul" data-act="pl-continuar" data-c="${esc(s.chave)}">Continuar</button></div>`);
  if (typeof SIM !== "undefined" && SIM.fase === "prova") itens.push(`<div class="tarefa"><div class="o">Simulado em andamento · questão ${SIM.i + 1} de ${SIM.ids.length}</div><a class="btn mini azul" href="#/simulados">Continuar</a></div>`);
  if (typeof JG !== "undefined" && JG.id && JG.rodadas?.length && !JG.fim) { const j = JOGOS.find(x => x.id === JG.id); if (j) itens.push(`<div class="tarefa"><div class="o">Jogo: ${esc(j.nome)}</div><a class="btn mini azul" href="#/jogos/${esc(j.id)}">Continuar</a></div>`); }
  return itens.length ? `<section><h2 class="sec">Continuar de onde parou</h2><div class="tarefas">${itens.join("")}</div></section>` : "";
}
ACOES["pl-continuar"] = el => {
  const c = el.dataset.c;
  if (PL.chave !== c || !PL.ativo) { const s = SALVOS[c]; if (!s) { toast("Esta sessão já terminou"); atualizar(); return; } guardarSessao(); Object.assign(PL, s); delete SALVOS[c]; }
  PL.ativo = true; PL.pausada = false; if (!PL.resp) PL.t0 = Date.now();   // o tempo pausado não conta
  const h = hrefSessao(c);
  if (h && !casaSessao(c, caminhoAtual().split("?")[0])) ir(h); else { render({ topo: true }); marcarEntradaPlayer(c); }
};
ACOES["pl-descartar"] = el => {
  const c = el.dataset.c;
  if (PL.chave === c) PL.ativo = false; delete SALVOS[c];
  toast("Sessão encerrada. As respostas dadas continuam registradas."); atualizar();
};

/* ---------- Voltar: botão, gesto, teclado ---------- */
/** Para onde o voltar leva: a página anterior do app (histórico) ou a página-mãe (último crumb com link). */
function alvoVoltar(pg = PAGINA) {
  if (pg?.voltar && typeof pg.voltar === "object" && pg.voltar.act) return { act: pg.voltar.act, rot: pg.voltar.rot };
  const ant = NAVS.pilha[NAVS.idx - 1];
  if (ant && ant.h) return { hist: true, rot: ant.rot || "Voltar" };
  const cr = (pg?.crumbs || []).filter(c => c[1]).pop();
  if (cr) return { h: cr[1], rot: cr[0] };
  if (caminhoAtual() !== "/") return { h: "#/", rot: "Início" };
  return null;
}
/** Botão grande do topo: só nas páginas internas (com crumbs ou com pg.voltar). */
function htmlVoltar(pg) {
  if (pg.semVoltar || !(pg.crumbs?.length || pg.voltar)) return "";
  const a = alvoVoltar(pg); if (!a) return "";
  const rot = a.act ? a.rot : rotCurto(a.rot), destino = a.act ? a.rot.replace(/^Voltar para /, "") : rot === "Voltar" ? "a página anterior" : rot;
  return `<div class="nav-voltar"><button type="button" class="btn sec voltar" data-act="${esc(a.act || "voltar")}" aria-label="Voltar para ${esc(destino)}"><span aria-hidden="true">←</span> ${esc(rot)}</button></div>`;
}
function voltar() {
  if (folhaAberta()) { fecharFolhaNav(); return true; }
  const a = alvoVoltar(PAGINA); if (!a) return false;
  if (a.act && ACOES[a.act]) { ACOES[a.act]({ dataset: {} }); return true; }
  pausarSeVisivel();
  if (a.hist) { guardarRolagem(); history.back(); }
  else { const h = a.h; if (h === location.hash) render({ topo: true }); else ir(h); }
  return true;
}
ACOES.voltar = () => voltar();
/* Crumb que aponta para o próprio endereço (o player fica em #/questoes): sai do player. */
ACOES["crumb-aqui"] = () => { pausarSeVisivel(); render({ topo: true }); };

/* ---------- Eventos do histórico ---------- */
function restaurarRolagem(idx) {
  const y = NAVS.pilha[idx]?.y;
  if (y > 0) { window.scrollTo(0, y); requestAnimationFrame(() => window.scrollTo(0, y)); }
}
/** Depois de desenhar uma página: na lista de onde a questão foi aberta, rola até a última vista. */
function depoisDeNavegar(travessia) {
  const L = CTXQ;
  if (L && L.h === location.hash && caminhoAtual() !== "/questoes/q/" + L.foco) {
    const a = document.querySelector(`#view a[href="#/questoes/q/${CSS.escape(L.foco)}"]`);
    const andou = L.foco !== L.aberta;
    L.aberta = L.foco;
    if (a && (andou || !travessia)) { a.scrollIntoView({ block: "center" }); a.focus({ preventScroll: true }); a.classList.add("lq-vista"); return; }
  }
  if (travessia) restaurarRolagem(NAVS.idx);
}
addEventListener("popstate", e => {
  const s = e.state;
  if (!s || !Number.isInteger(s.nav)) return;   // navegação nova por âncora: o hashchange cuida
  const de = NAVS.idx, para = s.nav; if (de === para) return;
  guardarRolagem(); NAVS.idx = para;
  if (!NAVS.pilha[para]) NAVS.pilha[para] = { h: location.hash };
  const ig = NAVS.ignorar; NAVS.ignorar = null;
  if (ig && ig.de === de && para === de - 1 && Date.now() < ig.ate) return;   // o próprio app tirou a folha
  const mesmo = location.hash === NAVS.renderizado;
  if (folhaAberta()) { if (mesmo) { const f = _focoAntesFolha; fecharFolhaDom(); if (f && document.contains(f)) f.focus({ preventScroll: true }); return; } fecharFolhaDom(); }
  pausarSeVisivel();
  /* Entrada velha de folha (a folha já foi fechada): pula para a próxima no mesmo sentido. */
  if (s.tipo === "folha" && mesmo) { history.go(para < de ? -1 : 1); return; }
  if (mesmo) { pararVoz(); render({ topo: true }); depoisDeNavegar(true); }
  /* senão o hashchange desenha a página */
});
addEventListener("hashchange", () => {
  const s = history.state; let travessia = false;
  if (s && Number.isInteger(s.nav)) {
    if (s.nav !== NAVS.idx) { guardarRolagem(); NAVS.idx = s.nav; pausarSeVisivel(); }
    if (!NAVS.pilha[NAVS.idx]) NAVS.pilha[NAVS.idx] = { h: location.hash };
    travessia = true;
  } else {
    guardarRolagem();
    const novo = novaEntrada();
    try { history.replaceState({ nav: novo }, ""); } catch (e) { }
  }
  fecharFolhaDom(); pararVoz(); render({ topo: true }); depoisDeNavegar(travessia);
});
/** Chamado pelo render: guarda o endereço e o rótulo da entrada atual. */
function registrarPagina(pg) {
  NAVS.renderizado = location.hash;
  const e = NAVS.pilha[NAVS.idx] = NAVS.pilha[NAVS.idx] || {}, h = location.hash || "#/", outro = e.h !== h;
  e.h = h;
  /* Player numa página que já tinha rótulo (lista → Praticar): a entrada da lista guarda o nome da lista. */
  if (/id="pl"/.test(pg.html || "") && PL.ativo && !PL.fim && PL.ids.length > 1) { if (e.player || !e.rot || outro) e.rot = "Sessão de questões"; }
  else e.rot = caminhoAtual() === "/" ? "Início" : rotCurto(pg.rotulo || pg.titulo);
}

/* ---------- Gesto: deslizar da borda esquerda para a direita ---------- */
const GV = { on: false, x0: 0, y0: 0, dx: 0, dir: null };
const BORDA = 24, LIMIAR_GV = 80;
function rolaDeLado(el) {
  for (let x = el; x && x !== document.body; x = x.parentElement) {
    if (x.scrollWidth > x.clientWidth + 2 && /(auto|scroll)/.test(getComputedStyle(x).overflowX)) return true;
  }
  return false;
}
function dicaGesto() {
  let d = document.getElementById("gesto-voltar");
  if (!d) { d = document.createElement("div"); d.id = "gesto-voltar"; d.className = "gesto-voltar"; d.setAttribute("aria-hidden", "true"); d.innerHTML = `<span>←</span><small>Voltar</small>`; document.body.appendChild(d); }
  return d;
}
addEventListener("touchstart", e => {
  GV.on = false;
  if (e.touches.length !== 1) return;
  const t = e.touches[0];
  if (t.clientX > BORDA || e.target.closest?.("#fc, .tabela-wrap, input, textarea, select, [data-sem-gesto]") || rolaDeLado(e.target)) return;
  Object.assign(GV, { on: true, x0: t.clientX, y0: t.clientY, dx: 0, dir: null });
}, { passive: true });
addEventListener("touchmove", e => {
  if (!GV.on) return;
  const t = e.touches[0], dx = t.clientX - GV.x0, dy = t.clientY - GV.y0;
  if (GV.dir === null && Math.hypot(dx, dy) > 10) GV.dir = dx > Math.abs(dy) * 1.2 ? "h" : "v";
  if (GV.dir === "v") { GV.on = false; dicaGesto().classList.remove("ativa", "pronta"); return; }
  if (GV.dir !== "h") return;
  GV.dx = dx;
  const d = dicaGesto(), f = Math.max(0, Math.min(1, dx / LIMIAR_GV));
  d.classList.add("ativa"); d.classList.toggle("pronta", dx >= LIMIAR_GV);
  d.style.setProperty("--f", f.toFixed(2));
}, { passive: true });
function fimGesto(e) {
  if (!GV.on) return;
  GV.on = false;
  const d = document.getElementById("gesto-voltar"); if (d) d.classList.remove("ativa", "pronta");
  if (e.type === "touchend" && GV.dir === "h" && GV.dx >= LIMIAR_GV) voltar();
}
addEventListener("touchend", fimGesto, { passive: true });
addEventListener("touchcancel", fimGesto, { passive: true });

/* ---------- Teclado: Alt+← e Backspace fora de campos ---------- */
document.addEventListener("keydown", e => {
  const campo = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable;
  if (e.altKey && e.key === "ArrowLeft" && !e.ctrlKey && !e.metaKey && !e.shiftKey) { e.preventDefault(); voltar(); return; }
  if (e.key === "Backspace" && !campo && !e.altKey && !e.ctrlKey && !e.metaKey && !location.hash.startsWith("#/jogos/termo")) { e.preventDefault(); voltar(); }
});

/* ---------- Questão aberta de uma lista: anterior / próxima / voltar para a lista ---------- */
/** Listas de questões desenhadas (por chave): ids na ordem da tela e o endereço da lista. */
const LISTAS_Q = {};
let CTXQ = null;   // { ids, h, rot, idxLista, foco, aberta }
function registrarLista(chave, ids) { LISTAS_Q[chave] = { ids: ids.slice(), h: location.hash }; return chave; }
function registrarListaDoClique(a) {
  const m = (a.getAttribute("href") || "").match(/^#\/questoes\/q\/(.+)$/); if (!m) return;
  const k = a.closest("[data-lista]")?.dataset.lista || a.dataset.qlista; if (!k || !LISTAS_Q[k]) return;
  const id = decodeURIComponent(m[1]), L = LISTAS_Q[k]; if (!L.ids.includes(id)) return;
  const naFolha = history.state?.tipo === "folha";
  CTXQ = { ids: L.ids, h: L.h, k, rot: NAVS.pilha[naFolha ? NAVS.idx - 1 : NAVS.idx]?.rot || "lista", idxLista: naFolha ? NAVS.idx - 1 : NAVS.idx, foco: id, aberta: id };
}
/** Contexto válido só se a questão foi aberta da lista (entrada logo depois dela). */
function ctxLista(id) {
  const L = CTXQ;
  if (!L || !L.ids.includes(id) || NAVS.idx !== L.idxLista + 1) return null;
  L.foco = id; return { ...L, i: L.ids.indexOf(id), n: L.ids.length };
}
function barraLista(id) {
  const L = ctxLista(id); if (!L) return "";
  return `<nav class="qnav" aria-label="Questões da lista"><button class="btn sec" data-act="q-lista" data-d="-1" ${L.i ? "" : "disabled"} aria-label="Questão anterior da lista">‹ Anterior</button>
    <span class="qnav-pos" aria-live="polite">${L.i + 1} de ${L.n}</span>
    <button class="btn sec" data-act="q-lista" data-d="1" ${L.i < L.n - 1 ? "" : "disabled"} aria-label="Próxima questão da lista">Próxima ›</button></nav>`;
}
/** Depois de responder uma questão avulsa da lista: o botão principal leva à próxima da lista. */
function botaoProxLista(pular = false) {
  const m = caminhoAtual().match(/^\/questoes\/q\/(.+)$/); if (!m) return "";
  const L = ctxLista(decodeURIComponent(m[1])); if (!L) return "";
  if (pular) return L.i < L.n - 1 ? `<button class="btn sec" data-act="q-lista" data-d="1">Pular ›</button>` : "";
  return L.i < L.n - 1 ? `<button class="btn" data-act="q-lista" data-d="1">Próxima da lista ›</button>` : `<button class="btn" data-act="q-lista-voltar">Voltar para a lista</button>`;
}
ACOES["q-lista"] = el => {
  const m = caminhoAtual().match(/^\/questoes\/q\/(.+)$/); if (!m) return;
  const L = ctxLista(decodeURIComponent(m[1])); if (!L) return;
  const j = L.i + +el.dataset.d; if (j < 0 || j >= L.n) return;
  CTXQ.foco = L.ids[j];
  substituirEntrada("#/questoes/q/" + encodeURIComponent(L.ids[j]));   // sem nova entrada: o voltar leva direto à lista
  document.querySelector(`.qnav [data-act="q-lista"][data-d="${el.dataset.d}"]:not([disabled])`)?.focus({ preventScroll: true });
};
ACOES["q-lista-voltar"] = () => {
  const L = CTXQ; if (!L) { voltar(); return; }
  /* Lista paginada ("Mostrar mais"): a questão vista por último precisa estar na tela. */
  const i = L.ids.indexOf(L.foco);
  if (L.h === "#/questoes" || /^#\/tema\//.test(L.h)) QPAG = Math.max(QPAG, Math.ceil((i + 1) / 20) * 20);
  if (L.k === "erros" && typeof EPAG !== "undefined") EPAG = Math.max(EPAG, Math.ceil((i + 1) / 30) * 30);
  if (PL.ativo && PL.ids.length <= 1) PL.ativo = false;
  if (NAVS.idx === L.idxLista + 1 && NAVS.pilha[L.idxLista]?.h === L.h) { guardarRolagem(); history.back(); }
  else ir(L.h);
};
