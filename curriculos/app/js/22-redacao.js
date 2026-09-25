/* ============================================================
   22-redacao — propostas, escrita, autoavaliação/IA pelas 5 competências,
   repertórios, estrutura e evolução.
   ============================================================ */
const CRUMB_RED = [["ENEM", "#/enem"]];
const NIVEIS = [0, 40, 80, 120, 160, 200];
let RD = ls.get("gab2:rascunho") || { proposta: "", tema: "", texto: "" };
const guardarRD = () => ls.set("gab2:rascunho", RD);
const totalNotas = a => a?.notas ? a.notas.reduce((s, x) => s + (+x || 0), 0) : null;
const linhasEstimadas = t => String(t).split("\n").reduce((s, l) => s + Math.max(1, Math.ceil(l.length / 68)), 0) - (t.trim() ? 0 : 1);
const redacoes = () => Object.values(store.doc("redacoes").itens).sort((a, b) => b.ts - a.ts);
const ABAS_RED = [["propostas", "Propostas"], ["escrever", "Escrever"], ["historico", "Histórico"], ["guia", "Competências e estrutura"], ["repertorios", "Repertórios"]];
const FR = { tipo: "", q: "" };
rota("/redacao", () => paginaRedacao("propostas"));
rota("/redacao/:aba", p => paginaRedacao(p.aba));
function paginaRedacao(aba) {
  let corpo = "";
  if (aba === "propostas") {
    corpo = REDACAO.propostas.length ? `<div class="tarefas">${REDACAO.propostas.map(p => `<div class="tarefa" style="flex-wrap:wrap"><div class="o"><b>${esc(p.tema)}</b><small>${(p.eixos || []).slice(0, 3).map(esc).join(" · ")}</small></div>
      <button class="btn mini" data-act="red-usar" data-id="${esc(p.id)}">Escrever</button>
      ${(p.textosMotivadores || []).length ? `<details class="mais" style="flex-basis:100%"><summary class="small">Textos de apoio</summary><ul class="small" style="margin:4px 0 0;padding-left:18px">${p.textosMotivadores.map(t => `<li>${esc(t)}</li>`).join("")}</ul></details>` : ""}</div>`).join("")}</div><p class="small muted">Propostas autorais, no formato do ENEM.</p>` : vazio("Sem propostas cadastradas.");
  } else if (aba === "escrever") {
    const prop = REDACAO.propostas.find(p => p.id === RD.proposta), l = linhasEstimadas(RD.texto), pal = RD.texto.trim() ? RD.texto.trim().split(/\s+/).length : 0;
    corpo = `<section class="caixa pilha">
      <label class="campo"><span class="lab">Tema</span><input type="text" id="rd-tema" value="${esc(prop?.tema || RD.tema)}" data-inp="rd-tema" placeholder="Escolha uma proposta ou escreva o tema"></label>
      <label class="campo"><span class="lab">Texto (rascunho salvo automaticamente neste aparelho)</span><textarea id="rd-txt" rows="18" data-inp="rd-txt" style="font:400 calc(17px * var(--k))/1.7 var(--read)">${esc(RD.texto)}</textarea></label>
      <p class="small muted" id="rd-cont">${pal} palavras · ≈ ${l} linhas de folha (mín. 7 para não zerar; máx. 30)</p>
      <div class="linha"><button class="btn" data-act="red-salvar">Salvar e avaliar</button><button class="btn sec" data-act="red-limpar">Limpar rascunho</button></div></section>
      <details class="filtros" style="margin-top:12px"><summary>Lembrete da estrutura</summary>${Object.entries(REDACAO.estrutura || {}).map(([k, v]) => `<h3>${esc(k)}</h3><ul class="small">${(v || []).map(x => `<li>${esc(x)}</li>`).join("")}</ul>`).join("")}</details>`;
  } else if (aba === "historico") {
    const rs = redacoes(), comNota = rs.filter(r => r.auto || r.ia).slice(0, 12).reverse();
    corpo = `${comNota.length >= 2 ? `<h2 class="sec">Evolução (nota total)</h2><div class="colunas" role="img" aria-label="Notas das redações">${comNota.map(r => { const n = totalNotas(r.ia) ?? totalNotas(r.auto); return `<div class="col" title="${dataBR(diaISO(new Date(r.ts)))}: ${n}"><em>${n}</em><i style="height:${n / 10}%"></i><small>${dataCurta(r.ts)}</small></div>`; }).join("")}</div>` : ""}
      ${tabela([{ t: "Data" }, { t: "Tema" }, { t: "Autoavaliação", num: 1 }, { t: "IA (estimativa)", num: 1 }, { t: "" }], rs.map(r => [dataBR(diaISO(new Date(r.ts))), esc(r.tema || "—"), totalNotas(r.auto) ?? "—", totalNotas(r.ia) ?? "—", `<a class="btn mini sec" href="#/redacao/r/${esc(r.id)}">Abrir</a>`]), { vaziaMsg: "Nenhuma redação salva ainda." })}`;
  } else if (aba === "guia") {
    corpo = `<h2 class="sec">As 5 competências do ENEM</h2>${REDACAO.competencias.map(c => `<details class="filtros"><summary>C${c.n} — ${esc(c.nome)}</summary><p class="small">${esc(c.descricao || "")}</p><ul class="small">${(c.niveis || []).map(n => `<li>${esc(n)}</li>`).join("")}</ul></details>`).join("")}
      <h2 class="sec">O que zera a redação</h2><ul>${(REDACAO.zeram || []).map(z => `<li>${esc(z)}</li>`).join("")}</ul><p class="small muted">Resumo baseado na Cartilha do Participante do INEP — confira a cartilha do ano da sua prova.</p>
      <h2 class="sec">Estrutura</h2>${Object.entries(REDACAO.estrutura || {}).map(([k, v]) => `<h3>${esc(k)}</h3><ul>${(v || []).map(x => `<li>${esc(x)}</li>`).join("")}</ul>`).join("")}`;
  } else if (aba === "repertorios") {
    const tipos = unicos(REDACAO.repertorios.map(r => r.tipo)), q = norm(FR.q);
    const lista = REDACAO.repertorios.filter(r => (!FR.tipo || r.tipo === FR.tipo) && (!q || norm([r.titulo, r.ideia, ...(r.usoSugerido || [])].join(" ")).includes(q)));
    corpo = `<div class="campos" style="margin-bottom:12px"><label class="campo"><span class="lab">Tipo</span><select data-chg="fr">${opcoes(tipos.map(t => [t, t]), FR.tipo, "Todos")}</select></label><label class="campo"><span class="lab">Buscar por tema</span><input type="search" value="${esc(FR.q)}" data-inp="fr-q" placeholder="ex.: meio ambiente"></label></div>
      ${tabela([{ t: "Repertório" }, { t: "Tipo" }, { t: "Ideia" }, { t: "Funciona em" }], lista.map(r => [`<b>${esc(r.titulo)}</b>`, pill(r.tipo), esc(r.ideia), `<span class="small">${(r.usoSugerido || []).map(esc).join(", ")}</span>`]), { vaziaMsg: "Nenhum repertório encontrado." })}`;
  }
  return { secao: "enem", crumbs: CRUMB_RED, titulo: "Redação", html: `<div class="tabs" role="tablist">${ABAS_RED.map(([k, n]) => `<a role="tab" href="#/redacao/${k}" aria-selected="${k === aba}">${n}</a>`).join("")}</div>${corpo}`,
    ctx: { texto: "Módulo de redação do ENEM (texto dissertativo-argumentativo, 5 competências)." } };
}
ACOES["red-usar"] = el => { RD.proposta = el.dataset.id; RD.tema = REDACAO.propostas.find(p => p.id === el.dataset.id)?.tema || ""; guardarRD(); ir("#/redacao/escrever"); };
ENTRADAS["rd-tema"] = el => { RD.tema = el.value; RD.proposta = ""; guardarRD(); };
ENTRADAS["rd-txt"] = el => { RD.texto = el.value; guardarRD(); const c = $("#rd-cont"); if (c) { const pal = el.value.trim() ? el.value.trim().split(/\s+/).length : 0; c.textContent = `${pal} palavras · ≈ ${linhasEstimadas(el.value)} linhas de folha (mín. 7 para não zerar; máx. 30)`; } };
ACOES["red-limpar"] = () => { RD = { proposta: "", tema: "", texto: "" }; guardarRD(); atualizar(); };
ACOES["red-salvar"] = () => {
  RD.texto = $("#rd-txt").value; RD.tema = $("#rd-tema").value.trim();
  if (RD.texto.trim().length < 200) { toast("Texto curto demais para salvar"); return; }
  const id = novoId("r"), R = store.doc("redacoes"); R.itens[id] = { id, proposta: RD.proposta || null, tema: RD.tema, texto: RD.texto, ts: Date.now(), auto: null, ia: null };
  store.mudou("redacoes"); RD = { proposta: "", tema: "", texto: "" }; guardarRD(); ir("#/redacao/r/" + id);
};
MUDANCAS.fr = el => { FR.tipo = el.value; atualizar(); };
ENTRADAS["fr-q"] = el => { FR.q = el.value; atualizar(); const i = document.querySelector('[data-inp="fr-q"]'); if (i) { i.focus(); i.setSelectionRange(i.value.length, i.value.length); } };

rota("/redacao/r/:id", ({ id }) => {
  const r = store.doc("redacoes").itens[id]; if (!r) return paginaNaoEncontrada();
  const comp = REDACAO.competencias.length ? REDACAO.competencias : [1, 2, 3, 4, 5].map(n => ({ n, nome: "Competência " + n }));
  const blocoNotas = (a, rotulo) => a ? `<h3>${rotulo}: ${totalNotas(a)} / 1000</h3>${tabela([{ t: "Competência" }, { t: "Nota", num: 1 }, { t: "Comentário" }], comp.map((c, i) => [`C${c.n} — ${esc(c.nome)}`, a.notas[i], esc(a.comentarios?.[i] || "")]))}${a.geral ? `<p class="leitura">${esc(a.geral)}</p>` : ""}` : "";
  return {
    secao: "enem", crumbs: [...CRUMB_RED, ["Redação", "#/redacao/historico"]], titulo: r.tema || "Redação", sub: new Date(r.ts).toLocaleString("pt-BR"),
    html: `<article class="caixa"><p class="leitura">${esc(r.texto)}</p></article>
      ${blocoNotas(r.auto, "Autoavaliação")}${blocoNotas(r.ia, "Estimativa da IA (não oficial)")}
      <section class="caixa" style="margin-top:12px"><h2 class="sec">Autoavaliar</h2><form class="pilha" data-form="red-auto" data-id="${esc(id)}">
        <div class="campos">${comp.map((c, i) => `<label class="campo"><span class="lab">C${c.n}</span><select id="ra-${i}">${opcoes(NIVEIS.map(n => [n, n]), r.auto?.notas?.[i] ?? 120)}</select></label>`).join("")}</div>
        <button class="btn sec">Salvar autoavaliação</button></form>
        ${IA.disponivel() ? `<div class="acoes"><button class="btn" data-act="red-ia" data-id="${esc(id)}">Avaliar com IA</button><span class="small muted" id="red-ia-st"></span></div>` : ""}</section>
      <div class="acoes"><button class="btn perigo mini" data-act="red-excluir" data-id="${esc(id)}">Excluir redação</button></div>`,
    ctx: { texto: `Redação do aluno sobre "${r.tema}". Texto:\n${r.texto.slice(0, 4000)}` },
  };
});
FORMS["red-auto"] = f => { const R = store.doc("redacoes"), r = R.itens[f.dataset.id]; r.auto = { notas: [0, 1, 2, 3, 4].map(i => +$("#ra-" + i).value), fonte: "auto" }; store.mudou("redacoes"); toast("Autoavaliação salva"); atualizar(); };
ACOES["red-excluir"] = el => { const R = store.doc("redacoes"); delete R.itens[el.dataset.id]; store.mudou("redacoes"); ir("#/redacao/historico"); };
ACOES["red-ia"] = async el => {
  const R = store.doc("redacoes"), r = R.itens[el.dataset.id]; $("#red-ia-st").textContent = "Avaliando…"; el.disabled = true;
  const crit = REDACAO.competencias.map(c => `C${c.n} ${c.nome}: ${c.descricao || ""}`).join("\n");
  try {
    const x = await IA.json(`Avalie a redação (texto dissertativo-argumentativo do ENEM) pelas 5 competências abaixo, com notas em 0, 40, 80, 120, 160 ou 200. Seja criterioso como um corretor do INEP e explique cada nota em 1-2 frases, citando trechos. Termine com 3 sugestões práticas.\n${crit}\n\nTEMA: ${r.tema}\nTEXTO:\n${r.texto}`, `{"notas":[0,0,0,0,0],"comentarios":["","","","",""],"geral":""}`);
    if (!Array.isArray(x?.notas) || x.notas.length !== 5) throw { code: "invalid" };
    r.ia = { notas: x.notas.map(n => NIVEIS.reduce((a, b) => Math.abs(b - n) < Math.abs(a - n) ? b : a, 0)), comentarios: (x.comentarios || []).map(String), geral: String(x.geral || ""), fonte: "ia", ts: Date.now() };
    store.mudou("redacoes"); atualizar();
  } catch (e) { $("#red-ia-st").textContent = e?.code === "invalid" ? "Resposta incompleta; tente de novo." : IA.mensagemErro(e); el.disabled = false; }
};
