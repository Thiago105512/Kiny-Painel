/* ============================================================
   21-biblioteca — materiais (links, PDFs, textos), guias de referência,
   questões próprias e dados/backup.
   ============================================================ */
let ASSETS = null, DOWNLOADS = null;
async function iniciarArquivos() {
  const use = window.claude && window.claude.use; if (!use) return;
  try { [ASSETS, DOWNLOADS] = await Promise.all([use("assets"), use("downloads")]); } catch (e) { }
}
const TIPO_MAT = { link: "Link", pdf: "PDF", texto: "Texto", aula: "Aula (vídeo)" };
function listaMateriais(mats) {
  return tabela([{ t: "Material" }, { t: "Tipo" }, { t: "Tema" }, { t: "" }], mats.sort((a, b) => b.criado - a.criado).map(m => [
    m.url ? `<a href="${esc(m.url)}" target="_blank" rel="noopener">${esc(m.titulo)}</a>` : `<a href="#" data-act="mat-ver" data-id="${esc(m.id)}">${esc(m.titulo)}</a>`,
    esc(TIPO_MAT[m.tipo] || m.tipo), m.tema ? linkTema(m.tema) : "—", `<button class="btn mini sec" data-act="mat-del" data-id="${esc(m.id)}" aria-label="Excluir">Excluir</button>`]), { vaziaMsg: "Nenhum material ainda." });
}
const ABAS_BIB = [["materiais", "Materiais"], ["guia", "Guias de referência"], ["questoes", "Minhas questões"], ["dados", "Dados e backup"]];
rota("/biblioteca", () => paginaBiblioteca("materiais"));
rota("/biblioteca/:aba", p => paginaBiblioteca(p.aba));
function paginaBiblioteca(aba) {
  let corpo = "";
  if (aba === "materiais") {
    const mats = Object.values(store.doc("materiais").itens);
    corpo = `<div class="acoes" style="margin-top:0"><button class="btn" data-act="mat-novo">+ Adicionar material</button></div>${listaMateriais(mats)}
      <p class="small muted">${ASSETS ? "PDFs enviados ficam guardados junto com este app, só para você." : "Envio de PDF disponível quando o app é aberto pelo link do Claude; aqui você pode guardar links e textos."}</p>`;
  } else if (aba === "guia") {
    corpo = `<div class="aviso">Resumo geral de referência (formatos de prova, diretrizes nacionais de curso). Não é a matriz oficial de nenhuma faculdade — matrizes ficam em <a href="#/medicina">Medicina</a>.</div>` + Object.entries(GUIA).map(([sec, dados]) => {
      let tot = 0, f = 0; Object.entries(dados).forEach(([sub, it]) => it.forEach((_, i) => { tot++; if (store.doc("guia").g[`${sec}|${sub}|${i}`]) f++; }));
      return `<details class="filtros"><summary>${esc(NOME_GUIA[sec] || sec)} <span class="small muted">${f}/${tot}</span></summary>${Object.entries(dados).map(([sub, it]) => `<h3>${esc(sub)}</h3>${it.map((x, i) => { const k = `${sec}|${sub}|${i}`; return `<label class="check"><input type="checkbox" data-chg="guia" data-k="${esc(k)}" ${store.doc("guia").g[k] ? "checked" : ""}><span>${esc(x)}</span></label>`; }).join("")}`).join("")}</details>`;
    }).join("");
  } else if (aba === "questoes") {
    const minhas = Object.values(store.doc("questoes").itens).sort((a, b) => String(b.id).localeCompare(String(a.id)));
    corpo = `<form class="caixa pilha" data-form="q-nova">
      <div class="campos"><label class="campo"><span class="lab">Trilha</span><select id="nq-t">${opcoes(Object.entries(TRILHAS).map(([k, v]) => [k, v.nome]), "medicina")}</select></label>
      <label class="campo"><span class="lab">Disciplina</span><input type="text" id="nq-disc" placeholder="ex.: Farmacologia" required></label>
      <label class="campo"><span class="lab">Dificuldade</span><select id="nq-dif">${opcoes(Object.entries(DIFICULDADE), 2)}</select></label>
      <label class="campo"><span class="lab">Fonte / prova / ano</span><input type="text" id="nq-prova" placeholder="ex.: Prova de Fisiologia UFAM 2025"></label></div>
      ${campoTema("nq-tema", null)}
      <label class="campo"><span class="lab">Enunciado</span><textarea id="nq-q" rows="3" required></textarea></label>
      ${[0, 1, 2, 3, 4].map(i => `<div class="linha" style="flex-wrap:nowrap"><label class="check" style="padding:0"><input type="radio" name="nq-c" value="${i}" ${i === 0 ? "checked" : ""} aria-label="Alternativa ${LETRAS[i]} é a correta"><span>${LETRAS[i]}</span></label><input type="text" id="nq-o${i}" required style="flex:1" placeholder="Alternativa ${LETRAS[i]} (marque a correta)"></div>`).join("")}
      <label class="campo"><span class="lab">Explicação / fundamento</span><textarea id="nq-e" rows="2"></textarea></label>
      <div><button class="btn">Adicionar questão</button></div></form>
      <h2 class="sec">Salvas <span class="small muted">${minhas.length}</span></h2>
      ${tabela([{ t: "Questão" }, { t: "Trilha" }, { t: "Tema" }, { t: "" }], minhas.map(x => [`<a href="#/questoes/q/${esc(x.id)}">${esc((x.enunciado || x.q || "").slice(0, 100))}</a>`, esc(TRILHAS[x.t]?.curto || x.t), x.tema ? linkTema(x.tema) : "—", `<button class="btn mini sec" data-act="q-del" data-id="${esc(x.id)}">Excluir</button>`]), { vaziaMsg: "Nenhuma questão sua ainda. Cadastre acima ou gere com o assistente dentro de um tema." })}`;
  } else if (aba === "dados") {
    const nomes = store.nomes().filter(n => n !== "perfil");
    corpo = `<section class="caixa"><h2 class="sec">Onde seus dados ficam</h2><p>${store.naConta ? "Na sua conta Claude (sincronizados entre aparelhos) e em cópia local neste navegador." : "Somente neste navegador. Abra pelo link do Claude para sincronizar, ou faça backup regularmente."}</p>
      <p class="small muted">${nomes.length} coleções: ${nomes.map(esc).join(", ")}</p></section>
      <section class="caixa"><h2 class="sec">Backup</h2><div class="linha">${DOWNLOADS ? `<button class="btn" data-act="bk-baixar">Baixar backup (.json)</button>` : ""}<button class="btn sec" data-act="bk-copiar">Copiar backup</button>
        <label class="btn sec">Restaurar de arquivo<input type="file" accept=".json,application/json" data-chg="bk-arquivo" hidden></label></div>
        <label class="campo" style="margin-top:10px"><span class="lab">Ou cole um backup (inclui o formato da versão anterior)</span><textarea id="bk-txt" rows="3"></textarea></label><div class="acoes"><button class="btn sec" data-act="bk-colar">Restaurar do texto</button></div></section>
      <section class="caixa"><h2 class="sec">Zerar progresso</h2><p class="small">Apaga respostas, erros, revisões, flashcards, simulados e plano. Matrizes, questões próprias, anotações e materiais são mantidos.</p><button class="btn perigo" data-act="zerar-conf">Zerar progresso…</button></section>`;
  }
  return { secao: "biblioteca", titulo: "Biblioteca", html: `<div class="tabs" role="tablist">${ABAS_BIB.map(([k, n]) => `<a role="tab" href="#/biblioteca/${k}" aria-selected="${k === aba}">${n}</a>`).join("")}</div>${corpo}` };
}
MUDANCAS.guia = el => { const G = store.doc("guia"); if (el.checked) G.g[el.dataset.k] = 1; else delete G.g[el.dataset.k]; store.mudou("guia"); };
ACOES["mat-novo"] = el => abrirFolha(`<h2 class="sec">Adicionar material</h2><form class="pilha" data-form="mat-salvar">
  <label class="campo"><span class="lab">Título</span><input type="text" id="mt-tit" required></label>
  <label class="campo"><span class="lab">Tipo</span><select id="mt-tipo">${opcoes(Object.entries(TIPO_MAT), "link")}</select></label>
  <label class="campo"><span class="lab">Link (aula, artigo, vídeo, PDF online)</span><input type="url" id="mt-url" placeholder="https://"></label>
  ${ASSETS ? `<label class="campo"><span class="lab">Ou envie um PDF/imagem (até 20 MB)</span><input type="file" id="mt-arq" accept=".pdf,image/*"></label>` : ""}
  <label class="campo"><span class="lab">Ou escreva o texto</span><textarea id="mt-txt" rows="4"></textarea></label>
  ${campoTema("mt-tema", el.dataset.t || PAGINA?.ctx?.tema)}
  <button class="btn" id="mt-btn">Salvar</button><p class="small" id="mt-st" role="status"></p></form>`);
FORMS["mat-salvar"] = async () => {
  const titulo = $("#mt-tit").value.trim(); if (!titulo) return;
  const url = $("#mt-url").value.trim(), txt = $("#mt-txt").value.trim(), arq = $("#mt-arq")?.files?.[0];
  if (url && !/^https?:\/\//i.test(url)) { $("#mt-st").textContent = "O link precisa começar com http:// ou https://"; return; }
  if (!url && !txt && !arq) { $("#mt-st").textContent = "Informe um link, um arquivo ou um texto."; return; }
  const m = { id: novoId("m"), titulo, tipo: arq ? "pdf" : $("#mt-tipo").value, url: url || null, texto: txt || null, tema: lerTema("mt-tema"), criado: Date.now() };
  if (arq) {
    $("#mt-btn").disabled = true; $("#mt-st").textContent = "Enviando arquivo…";
    try { const r = await ASSETS.upload(arq); m.assetId = r.id; m.url = r.url; }
    catch (e) { $("#mt-btn").disabled = false; $("#mt-st").textContent = "Não foi possível enviar: " + ({ too_large: "arquivo grande demais", unsupported_type: "tipo não aceito", quota_or_state: "espaço esgotado" }[e?.code] || "tente de novo") + "."; return; }
  }
  const M = store.doc("materiais"); M.itens[m.id] = m; store.mudou("materiais"); fecharFolha(); toast("Material salvo"); atualizar();
};
ACOES["mat-ver"] = el => { const m = store.doc("materiais").itens[el.dataset.id]; abrirFolha(`<h2 class="sec">${esc(m.titulo)}</h2><p class="leitura">${esc(m.texto || "")}</p>`); };
ACOES["mat-del"] = async el => { const M = store.doc("materiais"), m = M.itens[el.dataset.id]; if (m?.assetId && ASSETS) { try { await ASSETS.delete(m.assetId); } catch (e) { } } delete M.itens[el.dataset.id]; store.mudou("materiais"); atualizar(); };
FORMS["q-nova"] = () => {
  const o = [0, 1, 2, 3, 4].map(i => $("#nq-o" + i).value.trim()), enunciado = $("#nq-q").value.trim();
  if (!enunciado || o.some(v => !v)) { toast("Preencha o enunciado e as 5 alternativas"); return; }
  if (new Set(o).size < 5) { toast("As alternativas precisam ser diferentes"); return; }
  const x = { id: novoId("q"), t: $("#nq-t").value, area: $("#nq-disc").value.trim() || "Geral", disciplina: $("#nq-disc").value.trim() || null, enunciado, alternativas: o, correta: +document.querySelector('input[name="nq-c"]:checked').value, explicacao: $("#nq-e").value.trim(), tema: lerTema("nq-tema"), dificuldade: +$("#nq-dif").value, prova: $("#nq-prova").value.trim() || null, fonte: "minha", src: "minha" };
  salvarQuestaoPropria(x); toast("Questão adicionada ao banco"); atualizar();
};
ACOES["q-del"] = el => { apagarQuestaoPropria(el.dataset.id); toast("Questão excluída"); atualizar(); };
ACOES["bk-baixar"] = async () => { try { await DOWNLOADS.save({ filename: `gabarito-am-backup-${hoje()}.json`, data: JSON.stringify(store.exportar()) }); } catch (e) { if (e?.code !== "cancelled" && e?.code !== "declined") toast("Não foi possível baixar. Use Copiar backup."); } };
ACOES["bk-copiar"] = async () => { const t = JSON.stringify(store.exportar()); try { await navigator.clipboard.writeText(t); toast("Backup copiado"); } catch (e) { const a = $("#bk-txt"); a.value = t; a.select(); toast("Selecionado — copie com Ctrl+C"); } };
function restaurar(txt) { try { store.importar(JSON.parse(txt)); invalidarQuestoes(); toast("Backup restaurado"); atualizar(); } catch (e) { toast("Arquivo inválido: use um backup exportado por este app"); } }
ACOES["bk-colar"] = () => restaurar($("#bk-txt").value);
MUDANCAS["bk-arquivo"] = async el => { const f = el.files[0]; if (f) restaurar(await f.text()); };
ACOES["zerar-conf"] = () => abrirFolha(`<h2 class="sec">Zerar progresso?</h2><p>Respostas, erros, revisões, flashcards, simulados, plano e tempo de estudo serão apagados. Não tem volta — faça um backup antes.</p><button class="btn perigo" data-act="zerar-ok">Zerar</button>`);
ACOES["zerar-ok"] = () => { store.zerar([...Object.keys(TRILHAS).map(docProg), "dias", "erros", "cards", "revisoes", "simulados", "plano", "guia"]); fecharFolha(); toast("Progresso zerado"); ir("#/"); };
