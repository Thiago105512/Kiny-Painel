/* ============================================================
   17-casos — casos clínicos EDUCACIONAIS, com revelação progressiva.
   ============================================================ */
const AVISO_CASO = "Caso fictício, para fins educacionais. Não é orientação de atendimento a paciente real.";
const SECOES_CASO = [["identificacao", "Identificação"], ["queixaPrincipal", "Queixa principal"], ["hda", "História da doença atual"], ["antecedentes", "Antecedentes"], ["exameFisico", "Exame físico"], ["exames", "Exames complementares"]];
const SECOES_FIM = [["hipoteses", "Hipóteses diagnósticas"], ["diferenciais", "Diagnóstico diferencial"], ["conduta", "Conduta"], ["discussao", "Discussão"]];
const todosCasos = () => CASOS_BASE.concat(Object.values(store.doc("casos").itens).map(c => ({ ...c, src: c.src || "minha" })));
const casoPorId = id => todosCasos().find(c => c.id === id);
/* Cada parte do caso tem figura e cor próprias, como abas de um prontuário. */
const VISUAL_CASO = { identificacao: ["pessoa", "#2340B8"], queixaPrincipal: ["alerta", "#C0265F"], hda: ["relogio", "#B45309"], antecedentes: ["familia", "#6D28D9"],
  exameFisico: ["estetoscopio", "#0F766E"], exames: ["frasco", "#0369A1"], perguntas: ["lampada", "#D97706"], hipoteses: ["lupa", "#2340B8"],
  diferenciais: ["balanca", "#475569"], conduta: ["pilula", "#15803D"], discussao: ["livro", "#6D28D9"], referencias: ["livro", "#475569"] };
const corCaso = c => COR_AREA[areaDaEsp(c.espId)] || "#C0265F";
/** Sinais vitais citados no exame físico, para mostrar como etiquetas. */
function sinaisVitais(txt) {
  const re = /\b(PA|FC|FR|SatO2|SpO2|Tax|Temperatura|HGT|Glasgow|IMC)\s*(?:de\s*)?[:=]?\s*(\d[\d.,/x ]*?\s*(?:mmHg|bpm|irpm|ipm|%|°C|ºC|kg\/m²|mg\/dL)?)(?=[\s,;.)]|$)/g, vistos = {}, out = [];
  for (const m of String(txt || "").matchAll(re)) { const k = m[1] === "SpO2" ? "SatO2" : m[1]; if (!vistos[k] && /\d/.test(m[2])) { vistos[k] = 1; out.push([k === "Temperatura" ? "Tax" : k, m[2].trim()]); } }
  return out;
}
function tabelaCasos(cs) {
  if (!cs.length) return vazio("Nenhum caso com esses filtros.");
  return `<div class="cartoes-caso">${cs.map(c => `<a class="cartao-caso" href="#/casos/${esc(c.id)}" style="--h:${corCaso(c)}">${iluEsp(c.espId, "g")}<div>
    <b>${esc(c.titulo)}</b><small>${esc(ESPECIALIDADES[c.espId]?.nome || c.especialidade || "")}${c.temaId && TEMAS[c.temaId] ? " · " + esc(TEMAS[c.temaId].nome) : ""}</small>
    <span class="linha">${pill(DIFICULDADE[c.dificuldade] || "—", ({ 1: "ok", 2: "warn", 3: "bad" })[c.dificuldade] || "")}${c.src !== "banco" ? pill(c.src === "ia" ? "IA" : "meu") : ""}</span></div></a>`).join("")}</div>`;
}
const FC2 = { esp: "", disc: "", dif: "", tema: "" };
rota("/casos", () => {
  const todos = todosCasos(), lista = todos.filter(c => (!FC2.esp || c.espId === FC2.esp) && (!FC2.disc || c.disciplina === FC2.disc) && (!FC2.dif || String(c.dificuldade) === FC2.dif) && (!FC2.tema || c.temaId === FC2.tema));
  return {
    secao: "casos", titulo: "Casos clínicos", sub: AVISO_CASO, acoes: `<button class="btn sec mini" data-act="caso-novo">+ Novo</button>`,
    html: `<details class="filtros" ${Object.values(FC2).some(Boolean) ? "open" : ""}><summary>Filtrar${Object.values(FC2).filter(Boolean).length ? ` (${Object.values(FC2).filter(Boolean).length})` : ""}</summary><div class="campos" style="margin-top:10px">
      <label class="campo"><span class="lab">Especialidade</span><select data-chg="fc2" data-c="esp">${opcoes(ordenarPt(unicos(todos.map(c => c.espId)).filter(e => ESPECIALIDADES[e]), e => ESPECIALIDADES[e].nome).map(e => [e, ESPECIALIDADES[e].nome]), FC2.esp, "Todas")}</select></label>
      <label class="campo"><span class="lab">Disciplina</span><select data-chg="fc2" data-c="disc">${opcoes(ordenarPt(unicos(todos.map(c => c.disciplina))).map(d => [d, d]), FC2.disc, "Todas")}</select></label>
      <label class="campo"><span class="lab">Tema</span><select data-chg="fc2" data-c="tema">${opcoes(ordenarPt(unicos(todos.map(c => c.temaId)).filter(t => TEMAS[t]), nomeTema).map(t => [t, nomeTema(t)]), FC2.tema, "Todos")}</select></label>
      <label class="campo"><span class="lab">Dificuldade</span><select data-chg="fc2" data-c="dif">${opcoes(Object.entries(DIFICULDADE), FC2.dif, "Todas")}</select></label></div></details>
      ${tabelaCasos(lista)}`,
  };
});
MUDANCAS.fc2 = el => { FC2[el.dataset.c] = el.value; atualizar(); };

const REVELADO = {}; // id -> Set de seções abertas (só nesta visita)
rota("/casos/:id", ({ id }) => {
  const c = casoPorId(id); if (!c) return paginaNaoEncontrada();
  const rv = REVELADO[id] = REVELADO[id] || new Set(["identificacao", "queixaPrincipal", "hda"]);
  const val = v => Array.isArray(v) ? `<ul>${v.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : `<p class="leitura" style="margin:0">${esc(v || "—")}</p>`;
  const cab = (k, t) => `<h3>${ilustra(...VISUAL_CASO[k], "p")}${t}</h3>`, estilo = k => `style="--h:${VISUAL_CASO[k][1]}"`;
  const vit = k => k === "exameFisico" && rv.has(k) ? (v => v.length ? `<div class="vitais">${v.map(([a, b]) => `<span class="vital"><b>${a}</b> ${esc(b)}</span>`).join("")}</div>` : "")(sinaisVitais(c[k])) : "";
  const sec = ([k, t]) => c[k] == null || (Array.isArray(c[k]) && !c[k].length) ? "" : `<div class="caso-sec" ${estilo(k)}>${cab(k, t)}${vit(k)}${rv.has(k) ? val(c[k]) : `<button class="btn sec mini" data-act="caso-revelar" data-id="${esc(id)}" data-k="${k}">Mostrar ${t.toLowerCase()}</button>`}</div>`;
  return {
    secao: "casos", crumbs: [["Casos clínicos", "#/casos"]], titulo: c.titulo, ilu: iluEsp(c.espId, "g"), cor: corCaso(c),
    sub: `${c.temaId ? linkTema(c.temaId) + " · " : ""}${esc(ESPECIALIDADES[c.espId]?.nome || c.especialidade || "")} · ${esc(c.disciplina || "")} · ${DIFICULDADE[c.dificuldade] || ""}`,
    acoes: `<button class="btn sec mini" data-act="caso-tudo" data-id="${esc(id)}">Revelar tudo</button>`,
    html: `<div class="aviso">${AVISO_CASO}</div><article class="caixa">${SECOES_CASO.map(sec).join("")}
      ${(c.perguntas || []).length ? `<div class="caso-sec" ${estilo("perguntas")}>${cab("perguntas", "Perguntas")}${c.perguntas.map((p, i) => `<div style="margin-bottom:10px"><p style="margin:0 0 4px;font-weight:600">${i + 1}. ${esc(p.pergunta)}</p>${rv.has("p" + i) ? `<p class="leitura" style="margin:0;color:var(--ink2)">${esc(p.resposta)}</p>` : `<button class="btn sec mini" data-act="caso-revelar" data-id="${esc(id)}" data-k="p${i}">Ver resposta</button>`}</div>`).join("")}</div>` : ""}
      ${SECOES_FIM.map(sec).join("")}
      ${(c.referencias || []).length && rv.has("discussao") ? `<div class="caso-sec" ${estilo("referencias")}>${cab("referencias", "Referências")}${val(c.referencias)}</div>` : ""}</article>
      <div class="acoes">${c.temaId ? `<a class="btn sec" href="#/tema/${encodeURIComponent(c.temaId)}">Estudar o tema</a>` : ""}${c.src !== "banco" ? `<button class="btn perigo mini" data-act="caso-excluir" data-id="${esc(id)}">Excluir caso</button>` : ""}</div>`,
    ctx: { tema: c.temaId, caso: `${c.titulo}. ${c.queixaPrincipal || ""} ${c.hda || ""}`.slice(0, 600) },
  };
});
ACOES["caso-revelar"] = el => { REVELADO[el.dataset.id].add(el.dataset.k); atualizar(); };
ACOES["caso-tudo"] = el => { const c = casoPorId(el.dataset.id), s = REVELADO[el.dataset.id]; [...SECOES_CASO, ...SECOES_FIM].forEach(([k]) => s.add(k)); (c.perguntas || []).forEach((_, i) => s.add("p" + i)); atualizar(); };
ACOES["caso-excluir"] = el => { const C = store.doc("casos"); delete C.itens[el.dataset.id]; store.mudou("casos"); ir("#/casos"); };
ACOES["caso-novo"] = () => abrirFolha(`<h2 class="sec">Novo caso clínico (educacional)</h2><form class="pilha" data-form="caso-salvar">
  <label class="campo"><span class="lab">Título</span><input type="text" id="cs-titulo" required></label>
  ${campoTema("cs-tema", PAGINA?.ctx?.tema)}
  <label class="campo"><span class="lab">Disciplina</span><input type="text" id="cs-disc"></label>
  ${SECOES_CASO.map(([k, t]) => `<label class="campo"><span class="lab">${t}</span><textarea id="cs-${k}" rows="2"></textarea></label>`).join("")}
  <label class="campo"><span class="lab">Hipóteses (uma por linha)</span><textarea id="cs-hipoteses" rows="2"></textarea></label>
  <label class="campo"><span class="lab">Diagnóstico diferencial (um por linha)</span><textarea id="cs-diferenciais" rows="2"></textarea></label>
  <label class="campo"><span class="lab">Conduta</span><textarea id="cs-conduta" rows="2"></textarea></label>
  <label class="campo"><span class="lab">Discussão</span><textarea id="cs-discussao" rows="3"></textarea></label>
  <label class="campo"><span class="lab">Dificuldade</span><select id="cs-dif">${opcoes(Object.entries(DIFICULDADE), 2)}</select></label>
  <button class="btn">Salvar caso</button></form>`);
FORMS["caso-salvar"] = () => {
  const titulo = $("#cs-titulo").value.trim(); if (!titulo) return;
  const tema = lerTema("cs-tema"), c = { id: novoId("caso"), titulo, temaId: tema, espId: TEMAS[tema]?.especialidades?.[0] || null, disciplina: $("#cs-disc").value.trim(), dificuldade: +$("#cs-dif").value, src: "minha", perguntas: [] };
  SECOES_CASO.forEach(([k]) => { c[k] = $("#cs-" + k).value.trim(); });
  ["hipoteses", "diferenciais"].forEach(k => { c[k] = $("#cs-" + k).value.split("\n").map(s => s.trim()).filter(Boolean); });
  c.conduta = $("#cs-conduta").value.trim(); c.discussao = $("#cs-discussao").value.trim();
  const C = store.doc("casos"); C.itens[c.id] = c; store.mudou("casos"); fecharFolha(); ir("#/casos/" + c.id);
};
