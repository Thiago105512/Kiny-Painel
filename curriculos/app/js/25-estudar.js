/* ============================================================
   25-estudar — Pílulas de conhecimento: curiosidades, datas, pessoas,
   conceitos, macetes, pegadinhas e comparações.
   Método: primeiro tentar lembrar (pergunta), depois conferir a resposta
   e entender o porquê; o que não sabia vira flashcard com revisão espaçada.
   Sessões curtas (5 pílulas) intercalando áreas; no fim, questões dos temas.
   ============================================================ */
const PILULAS = (DADOS.pilulas || []);
const PIL = Object.fromEntries(PILULAS.map(p => [p.id, p]));
const TIPOS_PIL = {
  curiosidade: ["Curiosidades", "Fatos que explicam conceitos"],
  data: ["Linha do tempo", "Datas e marcos"],
  pessoa: ["Pessoas", "Quem fez a diferença"],
  conceito: ["Conceitos-chave", "O essencial que cai"],
  macete: ["Macetes", "Para não esquecer"],
  pegadinha: ["Pegadinhas", "Como não cair"],
  comparacao: ["Comparações", "X ou Y?"],
};
const DOM_PIL = [["", "Tudo"], ["medicina", "Medicina"], ["enem", "ENEM"], ["direito", "Direito"]];
const EST = { dom: "", sessao: null, aberta: {} };
const vistasPil = () => store.doc("pilulas").v;
const doDominio = p => !EST.dom || p.dominio === EST.dom;
const anoTxt = a => a == null ? "" : a < 0 ? `${-a} a.C.` : String(a);

/** Pílula do dia: a mesma o dia todo, mudando a cada dia; prefere as ainda não vistas. */
function pilulaDoDia() {
  const pool = PILULAS.filter(doDominio); if (!pool.length) return null;
  const v = vistasPil(), novas = pool.filter(p => !v[p.id]), base = novas.length ? novas : pool;
  const n = [...hoje()].reduce((s, c) => s * 31 + c.charCodeAt(0) >>> 0, 7);
  return base[n % base.length];
}
/** Escolhe n pílulas: novas primeiro, puxando temas em que você erra ou estudou há pouco; intercala áreas e tipos. */
function escolherSessao(n = 5) {
  const v = vistasPil(), erros = new Set(Object.values(store.doc("erros").itens).filter(e => e.status === "aberto").map(e => e.tema));
  const recentes = new Set(Object.values(store.doc("dias").d).slice(-7).flatMap(d => d.temas || []));
  const peso = p => (v[p.id] ? Math.min(3, (Date.now() - v[p.id][0]) / 864e5 * 0.05) : 10) + (erros.has(p.tema) ? 4 : 0) + (recentes.has(p.tema) ? 2 : 0) + Math.random() * 3;
  const cand = PILULAS.filter(doDominio).map(p => ({ p, s: peso(p) })).sort((a, b) => b.s - a.s).map(x => x.p);
  const out = [];
  while (out.length < n && cand.length) {
    const ult = out[out.length - 1], i = Math.max(0, cand.findIndex(p => !ult || (p.area !== ult.area && p.tipo !== ult.tipo)));
    out.push(cand.splice(i, 1)[0]);
  }
  return out.map(p => p.id);
}

/** O cartão: pergunta → (Mostrar) → resposta, explicação e porquê → Sabia / Não sabia. */
function cartaoPilula(p, { sessao = false } = {}) {
  const aberta = EST.aberta[p.id], v = vistasPil()[p.id], [nomeTipo] = TIPOS_PIL[p.tipo] || [p.tipo];
  const qs = p.tema ? questoes().filter(q => q.tema === p.tema).length : 0;
  return `<article class="caixa pilula" id="pil">
    <div class="linha entre" style="margin-bottom:10px"><span class="pill azul">${esc(nomeTipo)}</span><span class="small muted">${esc(p.area)}${p.ano != null && p.tipo === "data" ? " · " + anoTxt(p.ano) : ""}</span></div>
    <h2 class="pil-tit">${esc(p.titulo)}</h2>
    <p class="pil-perg">${esc(p.pergunta)}</p>
    ${aberta ? `<div class="pil-resp"><p class="pil-r">${esc(p.resposta)}</p>
        <p class="leitura">${esc(p.texto)}</p>
        ${p.pessoa ? `<p class="small muted" style="margin:-4px 0 10px">${esc(p.pessoa)}${p.vida ? " (" + esc(p.vida) + ")" : ""}</p>` : ""}
        <div class="pil-porque"><b>Por que importa</b><p>${esc(p.porque)}</p></div>
        ${p.exemplo ? `<div class="pil-porque"><b>Exemplo</b><p>${esc(p.exemplo)}</p></div>` : ""}
      </div>
      <div class="acoes">${v && !sessao ? `<span class="small muted">Você marcou: ${v[1] ? "sabia" : "não sabia"}</span>` : `<button class="btn" data-act="pil-sabia" data-id="${esc(p.id)}" data-v="1">Eu sabia</button><button class="btn sec" data-act="pil-sabia" data-id="${esc(p.id)}" data-v="0">Não sabia</button>`}</div>
      ${!sessao && (p.tema || qs) ? `<p class="small" style="margin:12px 0 0">${p.tema && TEMAS[p.tema] ? `Tema: ${linkTema(p.tema)}` : ""}${qs ? ` · <a href="#" data-act="pil-praticar" data-t="${esc(p.tema)}">praticar ${qs} questões</a>` : ""}</p>` : ""}`
    : `<p class="small muted">Tente responder de cabeça antes de ver. Lembrar é o que fixa.</p><div class="acoes"><button class="btn azul grande" data-act="pil-mostrar" data-id="${esc(p.id)}">Mostrar resposta</button></div>`}
  </article>`;
}

rota("/estudar", () => {
  if (EST.sessao) return paginaSessao();
  const pool = PILULAS.filter(doDominio), v = vistasPil(), dia = pilulaDoDia();
  const vistas = pool.filter(p => v[p.id]).length, naoSabia = pool.filter(p => v[p.id] && !v[p.id][1]).length;
  return {
    secao: "estudar", titulo: "Estudar", sub: "Pílulas de 5 minutos: tente lembrar, confira e entenda o porquê.",
    html: PILULAS.length ? `${chips(DOM_PIL, EST.dom, "pil-dom")}
      <section class="hero"><span class="lab">Sessão rápida</span><p class="hero-tit">5 pílulas misturadas</p>
        <p class="small muted" style="margin:0">${vistas ? `${vistas} de ${pool.length} vistas${naoSabia ? ` · ${naoSabia} viraram flashcards` : ""}` : `${pool.length} pílulas para descobrir`}</p>
        <button class="btn azul grande" data-act="pil-sessao">Começar</button></section>
      ${dia ? `<section><h2 class="sec">Pílula do dia</h2><a class="pil-link" href="#/estudar/p/${esc(dia.id)}"><b>${esc(dia.titulo)}</b><small>${esc((TIPOS_PIL[dia.tipo] || [])[0] || "")} · ${esc(dia.area)}</small></a></section>` : ""}
      <section><h2 class="sec">Explorar</h2><div class="atalhos">${Object.entries(TIPOS_PIL).map(([k, [nome, desc]]) => { const n = pool.filter(p => p.tipo === k).length;
        return n ? `<a href="#/estudar/tipo/${k}"><b>${nome}</b><small>${desc} · ${n}</small></a>` : ""; }).join("")}</div></section>`
      : vazio("As pílulas de estudo ainda estão sendo preparadas."),
  };
});

rota("/estudar/tipo/:tipo", ({ tipo }) => {
  const info = TIPOS_PIL[tipo]; if (!info) return paginaNaoEncontrada();
  let lista = PILULAS.filter(p => p.tipo === tipo && doDominio(p)), v = vistasPil(), corpo;
  const item = p => `<a href="#/estudar/p/${esc(p.id)}"><span class="txt">${v[p.id] ? "✓ " : ""}${esc(p.titulo)}</span><span class="meta"><span>${esc(p.area)}</span>${tipo === "pessoa" && p.vida ? `<span>${esc(p.vida)}</span>` : ""}</span></a>`;
  if (tipo === "data") {
    lista.sort((a, b) => a.ano - b.ano);
    const seculo = a => a < 0 ? "Antes de Cristo" : a < 1500 ? "Até 1500" : `Século ${["XVI", "XVII", "XVIII", "XIX", "XX", "XXI"][Math.min(5, Math.floor((a - 1501) / 100))]}`;
    const grupos = porChave(lista, p => seculo(p.ano));
    corpo = Object.entries(grupos).map(([s, ps]) => `<h2 class="sec">${s}</h2><div class="linha-tempo">${ps.map(p => `<a href="#/estudar/p/${esc(p.id)}"><em>${anoTxt(p.ano)}</em><span>${v[p.id] ? "✓ " : ""}${esc(p.titulo)}<small>${esc(p.area)}</small></span></a>`).join("")}</div>`).join("");
  } else {
    lista = ordenarPt(lista, p => tipo === "pessoa" ? p.pessoa || p.titulo : p.area + " " + p.titulo);
    corpo = `<div class="lista-q">${lista.map(item).join("")}</div>`;
  }
  return {
    secao: "estudar", crumbs: [["Estudar", "#/estudar"]], titulo: info[0], sub: `${info[1]} · ${lista.length}`,
    acoes: lista.length ? `<button class="btn sec mini" data-act="pil-sessao" data-tipo="${tipo}">Sessão com 5</button>` : "",
    html: `${chips(DOM_PIL, EST.dom, "pil-dom")}${lista.length ? corpo : vazio("Nada aqui ainda para esta área.")}`,
  };
});

rota("/estudar/p/:id", ({ id }) => {
  const p = PIL[id]; if (!p) return paginaNaoEncontrada();
  return { secao: "estudar", crumbs: [["Estudar", "#/estudar"], [(TIPOS_PIL[p.tipo] || [p.tipo])[0], "#/estudar/tipo/" + p.tipo]], titulo: "Pílula",
    html: cartaoPilula(p), ctx: { tema: p.tema, texto: `${p.titulo}. ${p.texto}` } };
});

function paginaSessao() {
  const S = EST.sessao;
  if (S.i >= S.ids.length) {
    const sab = S.res.filter(Boolean).length, temas = unicos(S.ids.map(i => PIL[i]?.tema).filter(Boolean));
    const qids = questoes().filter(q => temas.includes(q.tema) && statusQ(q).chave !== "correta").map(q => q.id);
    return { secao: "estudar", crumbs: [["Estudar", "#/estudar"]], titulo: "Sessão concluída",
      html: `<div class="caixa"><div class="kpis"><div class="kpi"><b>${sab}/${S.ids.length}</b><span>você sabia</span></div><div class="kpi"><b>${S.ids.length - sab}</b><span>viraram flashcards</span></div></div>
        <p class="small muted">O que você não sabia volta amanhã nos flashcards. Para fixar, pratique agora com questões dos mesmos temas.</p>
        <div class="acoes">${qids.length ? `<button class="btn azul" data-act="praticar-ids" data-ids="${qids.join(",")}" data-ctx="temas das pílulas">Praticar ${Math.min(qids.length, 10)} questões</button>` : ""}<button class="btn sec" data-act="pil-sessao">Mais 5 pílulas</button><button class="btn sec" data-act="pil-sair">Voltar</button></div></div>` };
  }
  const p = PIL[S.ids[S.i]];
  return { secao: "estudar", crumbs: [["Estudar", "#/estudar"]], titulo: `Pílula ${S.i + 1} de ${S.ids.length}`,
    html: `<div style="margin-bottom:12px">${medidor(pct(S.i, S.ids.length), "ok")}</div>${cartaoPilula(p, { sessao: true })}
      <div class="acoes"><button class="btn sec mini dir" data-act="pil-sair">Encerrar</button></div>`,
    ctx: { tema: p.tema, texto: `${p.titulo}. ${p.texto}` } };
}

ACOES["pil-dom"] = el => { EST.dom = el.dataset.v; atualizar(); };
ACOES["pil-mostrar"] = el => { EST.aberta[el.dataset.id] = true; atualizar(); };
ACOES["pil-sessao"] = el => {
  const tipo = el.dataset.tipo, ids = tipo ? embaralhar(PILULAS.filter(p => p.tipo === tipo && doDominio(p) && !vistasPil()[p.id]).concat(PILULAS.filter(p => p.tipo === tipo && doDominio(p) && vistasPil()[p.id]))).slice(0, 5).map(p => p.id) : escolherSessao(5);
  if (!ids.length) { toast("Nenhuma pílula disponível"); return; }
  ids.forEach(i => delete EST.aberta[i]); EST.sessao = { ids, i: 0, res: [] }; ir("#/estudar"); atualizar();
};
ACOES["pil-sair"] = () => { EST.sessao = null; ir("#/estudar"); atualizar(); };
ACOES["pil-sabia"] = el => {
  const p = PIL[el.dataset.id], sabia = el.dataset.v === "1", V = store.doc("pilulas");
  V.v[p.id] = [Date.now(), sabia ? 1 : 0]; store.mudou("pilulas");
  if (!sabia && !cards().some(c => c.ref === p.id)) criarCard({ frente: p.pergunta, verso: `${p.resposta}\n\n${p.texto}\n\nPor que importa: ${p.porque}`, tema: p.tema, origem: "pilula", ref: p.id, dif: 2 });
  if (p.tema) marcarTemaEstudado(p.tema);
  const S = EST.sessao;
  if (S && S.ids[S.i] === p.id) { S.res.push(sabia); S.i++; atualizar(); document.getElementById("view")?.scrollIntoView({ block: "start" }); return; }
  toast(sabia ? "Ótimo!" : "Virou flashcard — revisão amanhã"); atualizar();
};
ACOES["pil-praticar"] = el => { const ids = embaralhar(questoes().filter(q => q.tema === el.dataset.t).map(q => q.id)).slice(0, 10); if (ids.length) praticar(ids, "Praticando: " + nomeTema(el.dataset.t)); };
