/* ============================================================
   28-ajuda — correção e ajuda com a IA: provas e exercícios feitos,
   trabalhos escritos, apresentações, pesquisas e resumos para prova.
   Aceita texto, PDF/DOCX/TXT (lidos no aparelho) e fotos (quando a
   visualização permite imagens). O objetivo é aprender: a IA explica,
   aponta erros e orienta; o trabalho entregue continua sendo da pessoa.
   Documento "ajudas": itens[id] = {id, tipo, disc, titulo, pedido, arquivo, resposta, ts}
   ============================================================ */
const TIPOS_AJUDA = {
  corrigir: ["Corrigir prova ou exercício", "Envie a prova/lista já feita (foto, PDF ou texto) com suas respostas e, se tiver, o gabarito.",
    "Corrija a prova/exercício enviado. Para CADA questão: diga se a resposta do aluno está certa, parcialmente certa ou errada; explique o raciocínio correto de forma didática; aponte o conceito a revisar. Se não houver gabarito, resolva você e deixe claro o grau de certeza. No fim: lista curta dos 3 a 5 assuntos para revisar e uma estimativa de nota se for possível (deixe claro que é estimativa)."],
  trabalho: ["Revisar trabalho escrito", "Envie o texto do trabalho (PDF, DOCX ou colado) e diga o que o professor pediu.",
    "Revise o trabalho enviado como um professor orientador: 1) pontos fortes; 2) problemas de conteúdo (erros conceituais, afirmações sem base); 3) estrutura e argumentação; 4) clareza, gramática e estilo acadêmico; 5) citações e referências (formato ABNT; aponte referências incompletas ou suspeitas). Dê sugestões concretas com trechos de exemplo curtos, mas NÃO reescreva o trabalho inteiro."],
  fazer: ["Ajuda para fazer um trabalho", "Conte o tema, o que o professor pediu, o tamanho e o prazo.",
    "Ajude o aluno a FAZER o próprio trabalho: proponha um roteiro (seções e o que entra em cada uma), perguntas-guia para cada parte, conceitos que precisam ser explicados, tipos de fonte a buscar e um cronograma até o prazo. Não escreva o trabalho pronto."],
  apresentacao: ["Montar apresentação ou seminário", "Diga o tema, o tempo de fala e o público (turma, banca, congresso).",
    "Monte o roteiro de uma apresentação: lista de slides (título + 3 a 5 tópicos curtos cada + sugestão de figura/tabela) e notas do apresentador para cada slide, respeitando o tempo informado (cerca de 1 slide por minuto). Inclua abertura, mensagem principal, fechamento e 3 perguntas prováveis da plateia com respostas curtas."],
  pesquisa: ["Pesquisa / revisão de literatura", "Diga a pergunta de pesquisa ou o tema.",
    "Ajude a planejar a pesquisa: refine a pergunta (PICO quando for clínica), sugira descritores DeCS/MeSH e sinônimos, monte strings de busca para SciELO, LILACS/BVS e PubMed, critérios de inclusão/exclusão e como organizar a leitura. NUNCA invente referências: se citar autores ou diretrizes, diga que o aluno deve localizar e conferir a fonte original."],
  revisao: ["Resumo para prova", "Diga o conteúdo da prova (ou escolha uma prova cadastrada em Meu curso).",
    "Faça um resumo de revisão para a prova: tópicos principais em ordem lógica, o que mais costuma cair, pegadinhas, 5 perguntas de autoteste com respostas curtas no final. Linguagem objetiva, até 600 palavras."],
};
const AJ = { tipo: "corrigir", aval: null, arquivos: [], texto: "", saida: "", ocupado: false, imgs: false };
const ajudas = () => Object.values(store.doc("ajudas").itens).sort((a, b) => b.ts - a.ts);
rota("/curso/ajuda", () => paginaAjuda());
rota("/curso/ajuda/nova/:tipo", ({ tipo }) => { if (TIPOS_AJUDA[tipo] && AJ.tipo !== tipo) Object.assign(AJ, { tipo, aval: null, saida: "" }); return paginaAjuda(); });
rota("/curso/ajuda/nova/:tipo/:aval", ({ tipo, aval }) => { if (AJ.aval !== aval) Object.assign(AJ, { tipo: TIPOS_AJUDA[tipo] ? tipo : "revisao", aval, saida: "" }); return paginaAjuda(); });
function paginaAjuda() {
  const g = minhaGrade(), its = g ? itensGrade(g).filter(x => sitDe(x) === "cursando") : [], a = AJ.aval && acad().aval[AJ.aval], dica = TIPOS_AJUDA[AJ.tipo][1];
  const disc = a?.disc || "", hist = ajudas();
  verImagens();
  const form = IA.disponivel() ? `${chips(Object.entries(TIPOS_AJUDA).map(([k, v]) => [k, v[0]]), AJ.tipo, "aj-tipo")}
      <form class="pilha caixa" data-form="aj-enviar" style="margin-top:10px">
        <p class="small muted" style="margin:0">${esc(dica)}</p>
        <div class="campos">
          <label class="campo"><span class="lab">Disciplina</span><select id="aj-disc"><option value="">—</option>${opcoes(its.map(x => [x.id, x.nome]), disc)}</select></label>
          <label class="campo"><span class="lab">Título</span><input type="text" id="aj-tit" maxlength="80" value="${esc(a ? (a.titulo || TIPO_AVAL[a.tipo]) : "")}"></label></div>
        <label class="campo"><span class="lab">Pedido e texto</span><textarea id="aj-txt" rows="6" maxlength="40000" placeholder="Explique o que precisa. Pode colar o enunciado, suas respostas ou o texto do trabalho.">${esc(a ? [a.conteudo && "Conteúdo: " + a.conteudo, a.data && "Data da avaliação: " + dataBR(a.data)].filter(Boolean).join("\n") : "")}</textarea></label>
        <div class="linha"><label class="btn sec">Anexar arquivo${AJ.imgs ? " ou foto" : ""}<input type="file" multiple accept=".pdf,.docx,.txt${AJ.imgs ? ",image/*" : ""}" data-chg="aj-arq" hidden></label>
          <span class="small muted">${AJ.arquivos.length ? AJ.arquivos.map(x => esc(x.name)).join(", ") + ` <button type="button" class="btn mini sec" data-act="aj-limpar-arq">Remover</button>` : "PDF, DOCX ou TXT" + (AJ.imgs ? ", ou fotos" : "")}</span></div>
        <button class="btn azul grande" ${AJ.ocupado ? "disabled" : ""}>${AJ.ocupado ? "Gerando…" : "Enviar"}</button></form>
      <div id="aj-saida">${AJ.saida}</div>`
    : `<div class="aviso">A correção e a ajuda usam o assistente de IA, disponível quando o app é aberto pelo link do Claude.</div>`;
  return {
    secao: "curso", crumbs: [["Meu curso", "#/curso"]], titulo: "Correção e ajuda",
    sub: "A IA explica, corrige e orienta para você aprender. O trabalho entregue continua sendo seu: confira fontes e informações.",
    html: form + (hist.length ? `<section><h2 class="sec">Pedidos anteriores</h2><div class="links-lista">${hist.slice(0, 30).map(h => `<a href="#/curso/ajuda/r/${esc(h.id)}"><span>${esc(h.titulo || TIPOS_AJUDA[h.tipo]?.[0] || "Pedido")}</span><small>${esc(TIPOS_AJUDA[h.tipo]?.[0] || "")} · ${new Date(h.ts).toLocaleDateString("pt-BR")}</small></a>`).join("")}</div></section>` : ""),
    ctx: { grade: g?.id, disciplina: nomeItem(g, disc) || undefined },
  };
}
async function verImagens() { if (AJ._lim) return; AJ._lim = true; const l = await IA.limites(); if (l?.images) { AJ.imgs = true; if (/curso\/ajuda/.test(caminhoAtual())) atualizar(); } }
ACOES["aj-tipo"] = el => { AJ.tipo = el.dataset.v; AJ.aval = null; AJ.saida = ""; ir("#/curso/ajuda/nova/" + AJ.tipo); };
MUDANCAS["aj-arq"] = el => { AJ.arquivos = [...el.files].slice(0, 8); atualizar(); };
ACOES["aj-limpar-arq"] = () => { AJ.arquivos = []; atualizar(); };
FORMS["aj-enviar"] = async () => {
  if (AJ.ocupado) return;
  const txt = $("#aj-txt").value.trim(), disc = $("#aj-disc").value, titulo = $("#aj-tit").value.trim(), g = minhaGrade();
  if (!txt && !AJ.arquivos.length) { toast("Escreva o pedido ou anexe um arquivo"); return; }
  AJ.ocupado = true; AJ.saida = `<div class="caixa"><div class="ia-txt" id="aj-out">Lendo os anexos…</div><div class="acoes"><button class="btn sec mini" data-act="ia-cancelar">Cancelar</button></div></div>`; atualizar();
  try {
    const imgs = AJ.arquivos.filter(f => /^image\//.test(f.type)), docs = AJ.arquivos.filter(f => !/^image\//.test(f.type));
    const anexos = [];
    for (const f of docs) { try { anexos.push(`--- ANEXO: ${f.name} ---\n${(await textoDoArquivo(f)).slice(0, 60000)}`); } catch (e) { anexos.push(`--- ANEXO ${f.name}: não foi possível ler ---`); } }
    const a = AJ.aval && acad().aval[AJ.aval], it = g && disc ? itensGrade(g).find(x => x.id === disc) : null;
    const pedido = `${TIPOS_AJUDA[AJ.tipo][2]}
Contexto acadêmico: ${[g && nomeInst(g.instituicao), g && (CURSOS[g.curso] || g.curso), store.doc("perfil").periodo && store.doc("perfil").periodo + "º período", it && "disciplina " + it.nome, a && `${TIPO_AVAL[a.tipo]} em ${dataBR(a.data)}`].filter(Boolean).join(", ") || "não informado"}.
${it && temasDoItem(it).length ? "Temas da disciplina no app: " + temasDoItem(it).map(nomeTema).join("; ") + ".\n" : ""}Escreva em português do Brasil, com títulos curtos e parágrafos curtos (a pessoa tem baixa visão: nada de tabelas largas). ${imgs.length ? `Há ${imgs.length} foto(s) anexada(s) — leia com atenção; se algo estiver ilegível, diga.` : ""}

PEDIDO DO ALUNO:
${txt || "(ver anexos)"}
${anexos.join("\n\n")}`;
    const el = () => document.getElementById("aj-out");
    const r = await IA.livre(pedido, s => { const e = el(); if (e) e.textContent = s; }, { images: imgs.length ? imgs : undefined });
    const id = "aj" + Date.now().toString(36), H = store.doc("ajudas");
    H.itens[id] = { id, tipo: AJ.tipo, disc: disc || null, titulo: titulo || TIPOS_AJUDA[AJ.tipo][0], pedido: txt.slice(0, 4000), arquivo: AJ.arquivos.map(f => f.name).join(", ") || null, resposta: r.slice(0, 30000), ts: Date.now() };
    store.mudou("ajudas"); AJ.arquivos = []; AJ.saida = ""; AJ.ocupado = false; ir("#/curso/ajuda/r/" + id);
  } catch (e) { AJ.ocupado = false; AJ.saida = `<div class="aviso">${IA.mensagemErro(e)}</div>`; atualizar(); }
};
rota("/curso/ajuda/r/:id", ({ id }) => {
  const h = store.doc("ajudas").itens[id]; if (!h) return paginaNaoEncontrada();
  return { secao: "curso", crumbs: [["Meu curso", "#/curso"], ["Correção e ajuda", "#/curso/ajuda"]], titulo: h.titulo || "Pedido",
    sub: [TIPOS_AJUDA[h.tipo]?.[0], nomeItem(minhaGrade(), h.disc), new Date(h.ts).toLocaleString("pt-BR"), h.arquivo && "anexos: " + h.arquivo].filter(Boolean).map(esc).join(" · "),
    acoes: `${DOWNLOADS ? `<button class="btn sec mini" data-act="aj-baixar" data-id="${esc(id)}">Baixar</button>` : ""}<button class="btn sec mini perigo" data-act="aj-del" data-id="${esc(id)}">Apagar</button>`,
    html: `${h.pedido ? `<details class="caixa"><summary>Seu pedido</summary><p class="leitura">${esc(h.pedido)}</p></details>` : ""}
      <article class="caixa"><div class="ia-txt leitura">${esc(h.resposta)}</div></article>
      <p class="small muted">Gerado por IA para estudo: confira com a bibliografia e com seu professor.</p>`,
    ctx: { texto: "Resposta anterior da IA ao pedido do aluno:\n" + h.resposta.slice(0, 6000) } };
});
ACOES["aj-del"] = el => { const H = store.doc("ajudas"); delete H.itens[el.dataset.id]; store.mudou("ajudas"); toast("Apagado"); ir("#/curso/ajuda"); };
ACOES["aj-baixar"] = async el => { const h = store.doc("ajudas").itens[el.dataset.id];
  try { await DOWNLOADS.save({ filename: `ajuda-${diaISO(new Date(h.ts))}.txt`, data: `${h.titulo}\n\nPEDIDO\n${h.pedido || ""}\n\nRESPOSTA\n${h.resposta}` }); }
  catch (e) { if (!["cancelled", "declined"].includes(e?.code)) toast("Não foi possível baixar"); } };
