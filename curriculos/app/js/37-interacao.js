/* ============================================================
   37-interacao — recursos de interação e acessibilidade:
   · Ouvir: leitura em voz alta (speechSynthesis, voz pt-BR) no player de questões,
     nos flashcards, nas pílulas e no caso clínico, com destaque do trecho lido;
   · ajustes de velocidade da leitura e de "Som e vibração" na folha do botão "Aa";
   · marca-texto no enunciado (frases tocáveis) e "Certeza × acerto" no Desempenho;
   · flashcards com gesto: tocar vira, deslizar → lembrei / ← esqueci.
   O player (06-ui) usa: botaoOuvir, frasesEnunciado, pararVoz, reaplicarLeitura.
   ============================================================ */

/* ---------- Ouvir (leitura em voz alta) ---------- */
const VOZ = { id: null, ger: 0, sel: null, fila: [] };
const vozDisponivel = () => { try { return !!window.speechSynthesis && typeof window.SpeechSynthesisUtterance === "function"; } catch (e) { return false; } };
const VEL_VOZ = [[0.8, "Mais lenta"], [1, "Normal"], [1.2, "Mais rápida"]];
const velVoz = () => { const v = +ls.get("gab2:voz-vel", 1); return VEL_VOZ.some(x => x[0] === v) ? v : 1; };
/** Botão "Ouvir" (some se o navegador não lê em voz alta). Tocar de novo para a leitura. */
function botaoOuvir(id) {
  if (!vozDisponivel()) return "";
  const lendo = VOZ.id === id;
  return `<button class="btn sec mini ouvir${lendo ? " ativo" : ""}" data-act="ouvir" data-v="${esc(id)}">${rotuloOuvir(lendo)}</button>`;
}
const rotuloOuvir = lendo => lendo ? `<span aria-hidden="true">⏹</span> Parar leitura` : `<span aria-hidden="true">🔊</span> Ouvir`;
function marcarBotoesVoz() {
  document.querySelectorAll('[data-act="ouvir"]').forEach(b => { const lendo = VOZ.id === b.dataset.v; b.classList.toggle("ativo", lendo); b.innerHTML = rotuloOuvir(lendo); });
}
/** Pedaços curtos (frases até ~220 caracteres): alguns navegadores cortam falas longas. */
function pedacosFala(t) {
  const s = String(t || "").replace(/\s+/g, " ").trim(); if (!s) return [];
  const out = []; let atual = "";
  for (const f of s.match(/[^.!?;:]+[.!?;:]*\s*/g) || [s]) { if (atual && (atual + f).length > 220) { out.push(atual.trim()); atual = ""; } atual += f; }
  if (atual.trim()) out.push(atual.trim());
  return out;
}
/** O que ler em cada tela: [{t: texto, sel: elemento a destacar}]. */
function partesLeitura(id) {
  const k = id.indexOf(":"), tipo = k < 0 ? id : id.slice(0, k), ref = k < 0 ? "" : id.slice(k + 1);
  if (tipo === "amostra") return [{ t: "Esta é a velocidade da leitura em voz alta." }];
  if (tipo === "pl") {
    const q = qPorId(PL.ids[PL.i]); if (!q || PL.fim) return [];
    if (!PL.resp) return [{ t: q.q, sel: "#pl .enunciado" }, ...PL.ordem.map((i, pos) => ({ t: `Alternativa ${LETRAS[pos]}${PL.desc.has(i) ? ", descartada" : ""}: ${q.o[i]}`, sel: `#pl [data-act="pl-alt"][data-i="${i}"]` }))];
    const [corpo, ...resto] = String(q.e || "Sem explicação cadastrada.").split(/\s*Para lembrar:\s*/), letra = LETRAS[PL.ordem.indexOf(q.c)];
    return [{ t: PL.esc === q.c ? `Certo. Alternativa ${letra}: ${q.o[q.c]}.` : `Errado. A resposta certa é a alternativa ${letra}: ${q.o[q.c]}.`, sel: "#pl .veredito" },
      { t: "Por quê: " + corpo, sel: "#pl .explica" }, ...(resto.length ? [{ t: "Para lembrar: " + resto.join(" "), sel: "#pl .lembrar" }] : [])];
  }
  if (tipo === "fc") {
    const c = cardPorId(FC.fila[FC.i]); if (!c) return [];
    return [{ t: c.frente, sel: "#fc .frente" }, ...(FC.mostrar ? [{ t: "Resposta: " + c.verso, sel: "#fc .verso" }] : [])];
  }
  if (tipo === "pil") {
    const p = PIL[ref]; if (!p) return [];
    const out = [{ t: p.titulo + ".", sel: "#pil .pil-tit" }, { t: p.pergunta, sel: "#pil .pil-perg" }];
    if (EST.aberta[ref]) out.push({ t: "Resposta: " + p.resposta, sel: "#pil .pil-r" }, { t: p.texto, sel: "#pil .pil-texto" }, { t: "Por que importa: " + p.porque, sel: "#pil .pil-porque" }, ...(p.exemplo ? [{ t: "Exemplo: " + p.exemplo }] : []));
    return out;
  }
  if (tipo === "caso") {
    const c = casoPorId(ref), rv = REVELADO[ref]; if (!c || !rv) return [];
    const txt = v => Array.isArray(v) ? v.join(". ") : String(v || "");
    const sec = ([kk, t]) => rv.has(kk) && c[kk] != null && txt(c[kk]) ? [{ t: `${t}: ${txt(c[kk])}`, sel: `.caso-sec[data-k="${kk}"]` }] : [];
    return [{ t: c.titulo + "." }, ...SECOES_CASO.flatMap(sec),
      ...(c.perguntas || []).map((p, i) => ({ t: `Pergunta ${i + 1}: ${p.pergunta}${rv.has("p" + i) ? " Resposta: " + p.resposta : ""}`, sel: '.caso-sec[data-k="perguntas"]' })),
      ...SECOES_FIM.flatMap(sec)];
  }
  return [];
}
function escolherVoz() {
  try { const vs = speechSynthesis.getVoices() || []; return vs.find(v => /^pt[-_]BR$/i.test(v.lang)) || vs.find(v => /^pt\b/i.test(v.lang)) || null; } catch (e) { return null; }
}
function falar(id) {
  pararVoz();
  if (!vozDisponivel()) return;
  const partes = partesLeitura(id).flatMap(p => pedacosFala(p.t).map(t => ({ t, sel: p.sel })));
  if (!partes.length) return;
  const ger = ++VOZ.ger, voz = escolherVoz(), vel = velVoz();
  VOZ.id = id;
  VOZ.fila = partes.map((p, k) => {
    const u = new SpeechSynthesisUtterance(p.t); u.lang = "pt-BR"; if (voz) u.voice = voz; u.rate = vel;
    u.onstart = () => { if (ger === VOZ.ger) destacarLeitura(p.sel || null); };
    u.onend = u.onerror = () => { if (ger === VOZ.ger && k === partes.length - 1) pararVoz(); };
    return u;   // guardadas em VOZ.fila: sem referência, alguns navegadores descartam a fala no meio
  });
  try { VOZ.fila.forEach(u => speechSynthesis.speak(u)); } catch (e) { pararVoz(); return; }
  marcarBotoesVoz();
}
/** Para a leitura (ao tocar de novo, trocar de questão/card/pílula ou de página). */
function pararVoz() {
  VOZ.ger++; const tinha = VOZ.id; VOZ.id = null; VOZ.fila = []; destacarLeitura(null);
  try { if (vozDisponivel() && (tinha || speechSynthesis.speaking || speechSynthesis.pending)) speechSynthesis.cancel(); } catch (e) { }
  if (tinha) marcarBotoesVoz();
}
function destacarLeitura(sel) {
  VOZ.sel = sel;
  document.querySelectorAll(".lendo").forEach(e => e.classList.remove("lendo"));
  if (sel) document.querySelector(sel)?.classList.add("lendo");
}
/** Depois de redesenhar a tela, o trecho que está sendo lido continua destacado. */
function reaplicarLeitura() { if (VOZ.id && VOZ.sel) document.querySelector(VOZ.sel)?.classList.add("lendo"); }
ACOES.ouvir = el => { const id = el.dataset.v; if (VOZ.id === id) pararVoz(); else falar(id); };

/* Folha "Aa": velocidade da leitura e Som e vibração (o mesmo ajuste dos jogos). */
function htmlVozSom() {
  const vel = velVoz(), somOn = !!store.doc("jogos").som;
  return `${vozDisponivel() ? `<span class="lab">Leitura em voz alta</span><div class="aparencia-opcoes">${VEL_VOZ.map(([v, n]) => `<button class="btn ${v === vel ? "azul" : "sec"}" data-act="voz-vel" data-v="${v}" aria-pressed="${v === vel}">${n}</button>`).join("")}</div>` : ""}
    <span class="lab">Som e vibração</span><div class="aparencia-opcoes">${[[1, "Ligados"], [0, "Desligados"]].map(([v, n]) => `<button class="btn ${!!v === somOn ? "azul" : "sec"}" data-act="som-set" data-v="${v}" aria-pressed="${!!v === somOn}">${n}</button>`).join("")}</div>`;
}
ACOES["voz-vel"] = el => {
  const v = +el.dataset.v, nome = VEL_VOZ.find(x => x[0] === v)?.[1]; if (!nome) return;
  ls.set("gab2:voz-vel", v); abrirFolha(htmlAparencia(), { titulo: TIT_APARENCIA }); $(`#camada [data-act="voz-vel"][data-v="${v}"]`)?.focus();
  falar("amostra"); toast("Leitura: " + nome);
};
ACOES["som-set"] = el => {
  const D = store.doc("jogos"), v = el.dataset.v === "1"; D.som = v; store.mudou("jogos");
  abrirFolha(htmlAparencia(), { titulo: TIT_APARENCIA }); $(`#camada [data-act="som-set"][data-v="${el.dataset.v}"]`)?.focus();
  if (v) som("ok"); toast(v ? "Som e vibração ligados" : "Som e vibração desligados");
};

/* ---------- Marca-texto no enunciado ---------- */
/** Enunciado em frases tocáveis; as marcadas ficam com fundo amarelo. Espaços e quebras ficam fora do destaque. */
function frasesEnunciado(t, marcas = new Set()) {
  const partes = String(t || "").match(/[\s\S]+?(?:[.!?…]+["”’)\]]*(?=\s|$)|\n+|$)/g) || [];
  let n = 0;
  return partes.map(p => {
    const [, ini, corpo, fim] = p.match(/^(\s*)([\s\S]*?)(\s*)$/);
    if (!corpo) return esc(p);
    const k = n++;
    return `${esc(ini)}<span class="frase${marcas.has(k) ? " marcada" : ""}" data-act="pl-marca" data-n="${k}">${esc(corpo)}</span>${esc(fim)}`;
  }).join("");
}

/* ---------- Certeza × acerto (Desempenho) ---------- */
function certezaXAcerto(filtro = () => true) {
  const c = { 3: { n: 0, ac: 0 }, 2: { n: 0, ac: 0 }, 1: { n: 0, ac: 0 } };
  for (const q of questoes()) {
    if (!filtro(q)) continue; const p = progDe(q); if (!p?.h) continue;
    for (const h of p.h) if (c[h[5]]) { c[h[5]].n++; c[h[5]].ac += h[2] ? 1 : 0; }
  }
  return c;
}
function blocoCerteza(filtro) {
  const c = certezaXAcerto(filtro), linhas = CERTEZA.filter(([v]) => c[v].n);
  if (!linhas.length) return "";
  const cert = c[3], alerta = cert.n >= 5 && cert.ac / cert.n < 0.8;
  return `<section><h2 class="sec">Certeza × acerto</h2><div class="barras">${linhas.map(([v, t]) => barra(t, c[v].ac, c[v].n)).join("")}</div>
    <p class="small muted">${alerta ? "Quando você tem certeza, ainda erra bastante: vale revisar com calma os conceitos que parecem óbvios." : "O ideal é acertar quase tudo quando tem certeza. Acertos no chute voltam mais cedo para revisão."}</p></section>`;
}

/* ---------- Flashcards: tocar vira, deslizar avalia ---------- */
const GESTO = { ativo: false, arrastou: false, id: null, x0: 0, y0: 0, dx: 0, horiz: null };
const limiteGesto = fc => Math.min(120, fc.offsetWidth * 0.3);
document.addEventListener("pointerdown", e => {
  const fc = e.target.closest?.("#fc"); if (!fc || e.target.closest("a,button") || e.button > 0) return;
  Object.assign(GESTO, { ativo: true, arrastou: false, id: e.pointerId, x0: e.clientX, y0: e.clientY, dx: 0, horiz: null });
});
document.addEventListener("pointermove", e => {
  if (!GESTO.ativo || e.pointerId !== GESTO.id) return;
  const fc = document.getElementById("fc"); if (!fc) { GESTO.ativo = false; return; }
  const dx = e.clientX - GESTO.x0, dy = e.clientY - GESTO.y0;
  if (GESTO.horiz === null && Math.hypot(dx, dy) > 10) GESTO.horiz = Math.abs(dx) > Math.abs(dy);
  if (!GESTO.horiz || !FC.mostrar) return;   // só depois de ver a resposta; arrasto vertical é rolagem
  GESTO.arrastou = true; GESTO.dx = dx; fc.classList.add("arrastando");
  fc.style.transform = `translateX(${dx}px)` + (semMovimento() ? "" : ` rotate(${dx / 30}deg)`);
  const f = Math.min(1, Math.abs(dx) / limiteGesto(fc));
  if (Math.abs(dx) > 12) { fc.dataset.puxa = dx > 0 ? "dir" : "esq"; fc.dataset.rot = dx > 0 ? "✓ Lembrei" : "✗ Esqueci"; } else fc.removeAttribute("data-puxa");
  fc.style.setProperty("--f", f.toFixed(2));
});
function soltarGesto(e) {
  if (!GESTO.ativo || e.pointerId !== GESTO.id) return;
  GESTO.ativo = false;
  const fc = document.getElementById("fc"); if (!fc || !GESTO.arrastou) return;
  const dx = GESTO.dx, i = FC.i;
  fc.classList.remove("arrastando");
  if (e.type === "pointerup" && Math.abs(dx) >= limiteGesto(fc)) {
    const n = dx > 0 ? 2 : 0, avaliar = () => { if (FC.i !== i || !FC.mostrar) return; ACOES["fc-nota"]({ dataset: { n } }); toast(n ? "Lembrei — volta mais tarde" : "Esqueci — volta amanhã", 1600); };
    if (semMovimento()) avaliar();
    else { fc.classList.add("sai"); fc.style.transform = `translateX(${dx > 0 ? 110 : -110}vw) rotate(${dx > 0 ? 12 : -12}deg)`; setTimeout(avaliar, 180); }
  } else { fc.style.transform = ""; fc.removeAttribute("data-puxa"); fc.style.removeProperty("--f"); }
}
document.addEventListener("pointerup", soltarGesto);
document.addEventListener("pointercancel", soltarGesto);
/* Toque (ou clique) no cartão vira; links e botões dentro dele funcionam normalmente. */
document.addEventListener("click", e => {
  const fc = e.target.closest?.("#fc"); if (!fc || e.target.closest("a,button")) return;
  if (GESTO.arrastou) { GESTO.arrastou = false; return; }
  if (String(window.getSelection?.() || "").length) return;   // selecionando texto
  FC.mostrar = !FC.mostrar; FC.virou = true; atualizar();
});
