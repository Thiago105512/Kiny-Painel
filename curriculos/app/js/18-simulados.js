/* ============================================================
   18-simulados — formato de prova (pesos por área) ou personalizado
   (disciplina, tema, faculdade/período, dificuldade, erradas, não respondidas).
   ============================================================ */
// min = minutos por questão na prova real; pesos = participação aproximada de cada grupo.
const FORMATO = {
  enem: { min: 3, real: "180 questões em 2 dias", grupos: { "Linguagens": ["Português", "Literatura", "Inglês", "Espanhol", "Artes", "Educação Física", "Redação"], "Humanas": ["História", "Geografia", "Filosofia", "Sociologia"], "Natureza": ["Biologia", "Química", "Física"], "Matemática": ["Matemática"] }, pesos: { "Linguagens": 1, "Humanas": 1, "Natureza": 1, "Matemática": 1 } },
  medicina: { min: 2.5, real: "provas de disciplina da graduação" },
  residencia: { min: 2.4, real: "≈100 questões em 4 h (5 grandes áreas)", pesos: { "Clínica Médica": 1, "Cirurgia": 1, "Pediatria": 1, "Ginecologia e Obstetrícia": 1, "Medicina Preventiva": 1 }, porArea: true },
  direito: { min: 2.5, real: "provas de disciplina da graduação" },
  oab: { min: 3.75, corte: .5, real: "80 questões em 5 h; aprova com 40 acertos", pesos: { "Ética": 8, "Constitucional": 6, "Civil": 7, "Processo Civil": 6, "Penal": 6, "Processo Penal": 6, "Trabalho": 5, "Processo do Trabalho": 5, "Administrativo": 5, "Tributário": 5, "Empresarial": 5, "Direitos Humanos": 3, "ECA": 2, "Consumidor": 2, "Ambiental": 2, "Filosofia do Direito": 2 } },
};
const TAMANHOS = [10, 20, 45, 80];
const chaveGrupo = (t, q) => { const f = FORMATO[t] || {}; const k = f.porArea ? q.a : q.disc || q.a; for (const [g, as] of Object.entries(f.grupos || {})) if (as.includes(k)) return g; return k; };
/** Distribui n questões entre os grupos pelo peso (maiores restos), preferindo não respondidas. */
function montarProporcional(t, pool, n) {
  const f = FORMATO[t] || {}, porG = porChave(pool, q => chaveGrupo(t, q));
  const ordem = f.pesos ? Object.keys(f.pesos) : [], gs = Object.keys(porG).sort((a, b) => ((ordem.indexOf(a) + 1) || 99) - ((ordem.indexOf(b) + 1) || 99) || a.localeCompare(b, "pt"));
  const w = g => f.pesos ? (f.pesos[g] || 1) : porG[g].length, W = gs.reduce((s, g) => s + w(g), 0); n = Math.min(n, pool.length);
  const cota = gs.map(g => { const x = n * w(g) / W; return { g, x, k: Math.min(Math.floor(x), porG[g].length) }; });
  let falta = n - cota.reduce((s, o) => s + o.k, 0);
  const porResto = cota.slice().sort((a, b) => (b.x % 1) - (a.x % 1));
  while (falta > 0) { let andou = false; for (const o of porResto) if (falta && o.k < porG[o.g].length) { o.k++; falta--; andou = true; } if (!andou) break; }
  const familias = new Set(), livre = q => !q.familia || !familias.has(q.familia);
  const escolhe = (g, k) => { const qs = embaralhar(porG[g]), out = [];
    for (const q of qs.filter(q => !progDe(q)?.n).concat(qs.filter(q => progDe(q)?.n))) { if (out.length >= k) break; if (livre(q)) { out.push(q); if (q.familia) familias.add(q.familia); } }
    return out; };
  const saida = cota.flatMap(o => embaralhar(escolhe(o.g, o.k))), ja = new Set(saida);
  for (const q of embaralhar(pool)) { if (saida.length >= n) break; if (!ja.has(q) && livre(q)) { saida.push(q); if (q.familia) familias.add(q.familia); } }
  return saida;
}

const FS = { trilha: "", inst: "", periodo: "", disc: "", esp: "", tema: "", subtema: "", dif: "", fonte: "", ano: "", prova: "", status: [], texto: "", erradasAntes: false };
let SIM = ls.get("gab2:sim") || { fase: "config", modo: "prova", t: "enem", n: 20, cron: true };
const guardarSim = () => ls.set("gab2:sim", SIM);
const restante = () => SIM.limite ? Math.max(0, SIM.inicio + SIM.limite - Date.now()) : null;
function poolPersonalizado() {
  const E = store.doc("erros").itens;
  return filtrarQuestoes(FS).filter(q => !FS.erradasAntes || E[q.id]);
}
function iniciarSimulado() {
  let qs, t = SIM.t;
  if (SIM.modo === "prova") qs = montarProporcional(t, questoes().filter(q => q.t === t), SIM.n);
  else { const pool = poolPersonalizado(); t = FS.trilha && FS.trilha !== "med" ? FS.trilha : (pool[0]?.t || "medicina"); qs = montarProporcional("_", pool, SIM.n); }
  if (!qs.length) { toast("Nenhuma questão com esses critérios"); return; }
  const minQ = (FORMATO[t] || {}).min || 2.5;
  SIM = { ...SIM, fase: "prova", tReal: t, ids: qs.map(q => q.id), ordens: Object.fromEntries(qs.map(q => [q.id, embaralhar([0, 1, 2, 3, 4])])), resp: {}, tq: {}, i: 0, tAtual: Date.now(),
    inicio: Date.now(), limite: SIM.cron ? Math.round(qs.length * minQ * 60000) : 0, entregando: false, filtrosTxt: SIM.modo === "prova" ? "formato de prova" : descreverFiltro(FS) };
  guardarSim(); ir("#/simulados");
}
function descreverFiltro(F) {
  return [F.trilha && (F.trilha === "med" ? "Medicina" : TRILHAS[F.trilha]?.curto), F.inst && nomeInst(F.inst), F.periodo && F.periodo + "º período", F.disc, F.esp && ESPECIALIDADES[F.esp]?.nome, F.tema && nomeTema(F.tema), F.dif && DIFICULDADE[F.dif], F.status.length && F.status.join("/"), F.erradasAntes && "erradas antes"].filter(Boolean).join(" · ") || "todas as questões";
}
function marcarTempo() { const id = SIM.ids[SIM.i]; SIM.tq[id] = (SIM.tq[id] || 0) + (Date.now() - (SIM.tAtual || Date.now())); SIM.tAtual = Date.now(); }
function entregarSimulado() {
  if (SIM.fase !== "prova") return;
  marcarTempo();
  const fim = Date.now(), areas = {}, temas = {}; let ac = 0;
  for (const id of SIM.ids) {
    const q = qPorId(id); if (!q) continue;
    const r = SIM.resp[id], ok = r === q.c; if (ok) ac++;
    const k = q.disc || q.a; (areas[k] = areas[k] || [0, 0]); areas[k][0] += ok ? 1 : 0; areas[k][1]++;
    if (q.tema) { (temas[q.tema] = temas[q.tema] || [0, 0]); temas[q.tema][0] += ok ? 1 : 0; temas[q.tema][1]++; }
    if (r !== undefined) registrarResposta(q, r, SIM.tq[id] || 0, "simulado");
  }
  const seg = Math.round((Math.min(fim, SIM.limite ? SIM.inicio + SIM.limite : fim) - SIM.inicio) / 1000);
  const H = store.doc("simulados"); H.hist = H.hist.concat([{ d: fim, t: SIM.tReal, n: SIM.ids.length, ac, seg, areas, filtros: SIM.filtrosTxt }]).slice(-80); store.mudou("simulados");
  SIM = { ...SIM, fase: "fim", fim, ac, seg, areas, temas, soErros: false }; guardarSim(); render({ topo: true });
}
setInterval(() => {
  if (SIM.fase !== "prova") return; const r = restante(), el = document.getElementById("relogio");
  if (r === null) { if (el) el.textContent = mmss(Date.now() - SIM.inicio); return; }
  if (r <= 0) return entregarSimulado();
  if (el) { el.textContent = mmss(r); el.classList.toggle("pouco", r < 300000); }
}, 1000);
function barraSim(x) { return barra(`${new Date(x.d).toLocaleDateString("pt-BR")} · ${esc(TRILHAS[x.t]?.curto || x.t)} · ${x.n} q.${x.filtros && x.filtros !== "formato de prova" ? ` <span class="muted small">(${esc(x.filtros)})</span>` : ""}`, x.ac, x.n, ` · ${mmss(x.seg * 1000)}`); }
function evolucaoSim(t) {
  const h = store.doc("simulados").hist.filter(x => !t || x.t === t).slice(-12);
  if (h.length < 2) return "";
  return `<div class="colunas" role="img" aria-label="Aproveitamento nos últimos simulados">${h.map(x => `<div class="col" title="${new Date(x.d).toLocaleDateString("pt-BR")}: ${pct(x.ac, x.n)}%"><em>${pct(x.ac, x.n)}</em><i style="height:${pct(x.ac, x.n)}%"></i><small>${dataCurta(x.d)}</small></div>`).join("")}</div>`;
}

rota("/simulados", () => {
  if (!trilhasDoObjetivo().includes(SIM.t)) { SIM.t = trilhasDoObjetivo().includes(objetivo()) ? objetivo() : trilhasDoObjetivo()[0]; guardarSim(); }
  const f = FORMATO[SIM.t] || {};
  if (SIM.fase === "prova") {
    const id = SIM.ids[SIM.i], q = qPorId(id), ord = SIM.ordens[id], marc = SIM.resp[id], rest = restante(), brancos = SIM.ids.filter(x => SIM.resp[x] === undefined).length;
    return { secao: "simulados", titulo: "Simulado em andamento", ctx: {},
      html: `<div class="provabar" id="prova"><span class="small muted">${esc(TRILHAS[SIM.tReal]?.curto || "")} · questão ${SIM.i + 1} de ${SIM.ids.length}</span><span class="relogio ${rest !== null && rest < 300000 ? "pouco" : ""}" id="relogio">${rest === null ? mmss(Date.now() - SIM.inicio) : mmss(rest)}</span></div>
      ${q ? `<article class="caixa questao"><div class="meta">${q.ae ? `<span>${esc(nomeAreaEnem(q.ae))}</span>` : ""}<span>${esc(q.disc || q.a)}</span></div><p class="enunciado">${esc(q.q)}</p>
        <ol class="alts">${ord.map((i, pos) => `<li><button class="alt" data-act="sim-marcar" data-i="${i}" data-s="${marc === i ? "sel" : ""}"><span class="bolha">${LETRAS[pos]}</span><span>${esc(q.o[i])}</span></button></li>`).join("")}</ol>
        <div class="acoes"><button class="btn sec" data-act="sim-nav" data-d="-1" ${SIM.i ? "" : "disabled"}>Anterior</button>${SIM.i < SIM.ids.length - 1 ? `<button class="btn" data-act="sim-nav" data-d="1">Próxima</button>` : `<button class="btn" data-act="sim-entregar">Entregar prova</button>`}</div></article>` : vazio("Questão removida do banco. Siga para a próxima.")}
      <h2 class="sec">Cartão-resposta <span class="small muted">${SIM.ids.length - brancos}/${SIM.ids.length} marcadas</span></h2>
      <div class="cartao">${SIM.ids.map((x, k) => `<button data-act="sim-ir" data-k="${k}" data-f="${SIM.resp[x] !== undefined ? 1 : 0}" aria-current="${k === SIM.i}" aria-label="Questão ${k + 1}">${k + 1}</button>`).join("")}</div>
      <div class="acoes">${SIM.entregando ? `<div class="aviso" style="margin:0">${brancos ? `${brancos} em branco (contam como erro). ` : ""}Entregar agora? <button class="btn mini" data-act="sim-entregar-ok">Entregar</button> <button class="btn mini sec" data-act="sim-entregar-nao">Continuar</button></div>` : `<button class="btn sec" data-act="sim-entregar">Entregar prova</button><button class="btn sec" data-act="sim-abandonar">Abandonar</button>`}</div>
      <p class="small muted">Atalhos: A–E marcam · ← → mudam de questão</p>` };
  }
  if (SIM.fase === "fim") {
    const ff = FORMATO[SIM.tReal] || {}, p = SIM.ac / SIM.ids.length;
    const linhas = Object.entries(SIM.areas).map(([a, [x, n]]) => ({ a, x, n })).sort((a, b) => a.x / a.n - b.x / b.n);
    const lista = SIM.ids.map((id, k) => ({ k, q: qPorId(id), r: SIM.resp[id] })).filter(x => x.q && (!SIM.soErros || x.r !== x.q.c));
    return { secao: "simulados", titulo: "Resultado do simulado", sub: esc(SIM.filtrosTxt || ""),
      html: `<div class="kpis"><div class="kpi"><b>${SIM.ac}/${SIM.ids.length}</b><span>acertos</span></div><div class="kpi"><b>${Math.round(p * 100)}%</b><span>aproveitamento</span></div><div class="kpi"><b>${SIM.ids.length - SIM.ac}</b><span>erros e brancos</span></div><div class="kpi"><b>${mmss(SIM.seg * 1000)}</b><span>tempo${SIM.limite ? " de " + mmss(SIM.limite) : ""}</span></div>
        ${ff.corte ? `<div class="kpi"><b style="color:${p >= ff.corte ? "var(--ok)" : "var(--bad)"}">${p >= ff.corte ? "Acima" : "Abaixo"}</b><span>do corte de ${Math.round(ff.corte * 100)}%</span></div>` : ""}</div>
        <div class="grid g2"><section><h2 class="sec">Por disciplina/área</h2><div class="barras">${linhas.map(l => barra(esc(l.a), l.x, l.n)).join("")}</div></section>
        <section><h2 class="sec">Por assunto</h2><div class="barras">${Object.entries(SIM.temas || {}).sort((a, b) => a[1][0] / a[1][1] - b[1][0] / b[1][1]).slice(0, 10).map(([t, [x, n]]) => barra(linkTema(t), x, n)).join("") || `<p class="muted">—</p>`}</div></section></div>
        <h2 class="sec">Correção <label class="check" style="font:500 calc(14px * var(--k)) var(--display);padding:0"><input type="checkbox" data-chg="sim-soerros" ${SIM.soErros ? "checked" : ""}><span>só erros e brancos</span></label></h2>
        ${lista.map(({ k, q, r }) => `<div class="caso-sec"><div class="small muted">Questão ${k + 1} · ${q.tema ? linkTema(q.tema) : esc(q.a)}${SIM.tq?.[q.id] ? " · " + mmss(SIM.tq[q.id]) : ""}</div><p class="leitura" style="margin:6px 0">${esc(q.q)}</p>
          <p style="margin:2px 0;color:${r === q.c ? "var(--ok)" : "var(--bad)"}">${r === undefined ? "Em branco" : "Sua resposta: " + esc(q.o[r])}${r === q.c ? " ✓" : ""}</p>${r !== q.c ? `<p style="margin:2px 0;color:var(--ok)">Gabarito: ${esc(q.o[q.c])}</p>` : ""}<p class="small" style="color:var(--ink2)">${esc(q.e || "")}</p></div>`).join("") || `<p class="muted">Nenhum erro. Excelente!</p>`}
        <div class="acoes"><button class="btn" data-act="sim-novo">Novo simulado</button><a class="btn sec" href="#/erros">Caderno de erros</a></div>` };
  }
  // Configuração
  const disp = SIM.modo === "prova" ? questoes().filter(q => q.t === SIM.t).length : poolPersonalizado().length, n = Math.min(SIM.n, disp);
  const minQ = SIM.modo === "prova" ? f.min : 2.5;
  return {
    secao: "simulados", titulo: "Simulados",
    html: `${abas([["prova", "Formato de prova"], ["personalizado", "Personalizado"]], SIM.modo, "sim-modo")}
    <section class="caixa pilha">
      ${SIM.modo === "prova" ? `<div><span class="lab">Prova</span>${chips(Object.entries(TRILHAS).filter(([k]) => trilhasDoObjetivo().includes(k)).map(([k, v]) => [k, v.curto]), SIM.t, "sim-t")}<p class="small muted" style="margin:6px 0 0">Prova real: ${esc(f.real || "")}. Questões distribuídas pelo peso de cada área, priorizando as que você não respondeu.</p></div>`
        : `<div>${formFiltros(FS, "fs")}<label class="check"><input type="checkbox" data-chg="fs-erradas" ${FS.erradasAntes ? "checked" : ""}><span>Somente questões que já errei alguma vez</span></label></div>`}
      <div><span class="lab">Número de questões (${disp} disponíveis)</span>${chips(TAMANHOS.map(x => [x, x]), SIM.n, "sim-n")}</div>
      <label class="check"><input type="checkbox" data-chg="sim-cron" ${SIM.cron ? "checked" : ""}><span>Cronometrar (${minQ} min por questão → ${mmss(n * minQ * 60000)})</span></label>
      <div><button class="btn" data-act="sim-iniciar" ${disp ? "" : "disabled"}>Começar simulado de ${n} questões</button></div></section>
    <h2 class="sec">Evolução histórica</h2>${evolucaoSim(SIM.modo === "prova" ? SIM.t : null) || `<p class="muted small">Faça ao menos dois simulados para ver a evolução.</p>`}
    ${store.doc("simulados").hist.length ? `<div class="barras" style="margin-top:12px">${store.doc("simulados").hist.slice(-10).reverse().map(barraSim).join("")}</div>` : ""}`,
  };
});
ACOES["sim-modo"] = el => { SIM.modo = el.dataset.v; guardarSim(); atualizar(); };
ACOES["sim-t"] = el => { SIM.t = el.dataset.v; guardarSim(); atualizar(); };
ACOES["sim-n"] = el => { SIM.n = +el.dataset.v; guardarSim(); atualizar(); };
MUDANCAS["sim-cron"] = el => { SIM.cron = el.checked; guardarSim(); atualizar(); };
MUDANCAS["sim-soerros"] = el => { SIM.soErros = el.checked; guardarSim(); atualizar(); };
MUDANCAS.fs = el => { FS[el.dataset.c] = el.value; if (el.dataset.c === "tema") FS.subtema = ""; atualizar(); };
MUDANCAS["fs-erradas"] = el => { FS.erradasAntes = el.checked; atualizar(); };
ENTRADAS["fs-txt"] = el => { FS.texto = el.value; atualizar(); };
ACOES["fs-st"] = el => { const k = el.dataset.v; FS.status = FS.status.includes(k) ? FS.status.filter(x => x !== k) : [...FS.status, k]; atualizar(); };
ACOES["sim-iniciar"] = () => iniciarSimulado();
ACOES["sim-do-filtro"] = () => { Object.assign(FS, JSON.parse(JSON.stringify(FQ)), { erradasAntes: false }); SIM.modo = "personalizado"; SIM.fase = "config"; guardarSim(); ir("#/simulados"); };
ACOES["sim-disc"] = el => { Object.assign(FS, { trilha: "enem", disc: el.dataset.v, tema: "", subtema: "", status: [] }); SIM.modo = "personalizado"; SIM.fase = "config"; guardarSim(); };
ACOES["sim-marcar"] = el => { const id = SIM.ids[SIM.i], v = +el.dataset.i; if (SIM.resp[id] === v) delete SIM.resp[id]; else SIM.resp[id] = v; guardarSim(); atualizar(); };
ACOES["sim-nav"] = el => { marcarTempo(); SIM.i = Math.max(0, Math.min(SIM.ids.length - 1, SIM.i + +el.dataset.d)); SIM.entregando = false; guardarSim(); render({ topo: true }); };
ACOES["sim-ir"] = el => { marcarTempo(); SIM.i = +el.dataset.k; guardarSim(); render({ topo: true }); };
ACOES["sim-entregar"] = () => { SIM.entregando = true; atualizar(); };
ACOES["sim-entregar-nao"] = () => { SIM.entregando = false; atualizar(); };
ACOES["sim-entregar-ok"] = () => entregarSimulado();
ACOES["sim-abandonar"] = () => { SIM = { fase: "config", modo: SIM.modo, t: SIM.t, n: SIM.n, cron: SIM.cron }; guardarSim(); atualizar(); };
ACOES["sim-novo"] = () => { SIM = { fase: "config", modo: SIM.modo, t: SIM.t, n: SIM.n, cron: SIM.cron }; guardarSim(); render({ topo: true }); };
function teclaProva(e) {
  const i = LETRAS.indexOf(e.key.toUpperCase()), id = SIM.ids[SIM.i];
  if (i >= 0 && SIM.ordens[id]) { SIM.resp[id] = SIM.ordens[id][i]; guardarSim(); atualizar(); }
  else if (e.key === "ArrowRight" && SIM.i < SIM.ids.length - 1) ACOES["sim-nav"]({ dataset: { d: 1 } });
  else if (e.key === "ArrowLeft" && SIM.i > 0) ACOES["sim-nav"]({ dataset: { d: -1 } });
}
