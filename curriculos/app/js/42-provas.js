/* ============================================================
   42-provas — "Minhas provas": contagem regressiva e plano automático até a prova.
   Fontes de provas:
     (a) avaliações de Meu curso (tipo prova / prova prática) com data futura — academico.aval[id];
     (b) provas cadastradas aqui — store.doc("plano").itens["pv…"] = {id, tipo:"prova", nome, dataProva, temas[], peso, dom, obj, criado, prep}.
         Ficam no mapa "itens" do plano porque a sincronização mescla esse mapa ITEM A ITEM (03-store, mesclarMapa):
         editar uma prova num aparelho não apaga outra criada no outro. Não têm campo "data", então não entram
         nas listas do Planejamento (19-plano filtra tipo "prova"), nas pendências (04-estudo) nem no Início como item do plano.
   Plano de cada prova: prep = {chave, calc, dias:[{d, tipo, u:[unidades], nq}], feitos:{AAAA-MM-DD:{tipo, u, nq}}}.
     Recalculado quando muda a data, os temas, a meta diária ou o dia (o que ficou para trás é redistribuído).
   Unidade de estudo: id de tema (Medicina e ENEM), "d:<disciplina do ENEM>" ou "disc:<nome>" (Direito/OAB).
   Datas: sempre as que a pessoa informar. O app nunca preenche data oficial de prova.
   ============================================================ */
const PROVA_TIPOS_CURSO = ["prova", "pratica"];
const DOM_OBJ = { medicina: "medicina", residencia: "medicina", enem: "enem", direito: "direito", oab: "direito" };
const domProva = () => DOM_OBJ[objetivo()] || null;
const IMPORTANCIA = [[1, "Normal"], [2, "Alta"], [3, "Muito alta"]];
const PROVAS_UI = { confirmar: null };   // id da prova com a exclusão aguardando confirmação (na própria página)

/* ---------- Fontes ---------- */
const registrosProva = () => Object.values(store.doc("plano").itens).filter(r => r && r.tipo === "prova");
const provaVisivel = r => !domProva() || !r.dom || r.dom === domProva();
function vmMinha(r) { return { id: r.id, origem: "minha", nome: r.nome || "Prova", data: r.dataProva || null, temas: Array.isArray(r.temas) ? r.temas : [], peso: +r.peso || 1, rec: r, salvar: () => store.mudou("plano") }; }
function vmAval(a) {
  const g = minhaGrade(), disc = nomeItem(g, a.disc);
  return { id: a.id, origem: "curso", nome: a.titulo || `${TIPO_AVAL[a.tipo] || "Prova"}${disc ? " de " + disc : ""}`, disc, data: a.data || null, temas: Array.isArray(a.temas) ? a.temas : [], peso: 1, rec: a, salvar: () => store.mudou("academico") };
}
/** Provas do curso só aparecem quando "Meu curso" é do objetivo (Medicina/Direito), nunca para ENEM. */
const cursoNoObjetivo = () => !foraDoObjetivo().includes("curso") && !!objetivo();
function todasProvas() {
  const minhas = registrosProva().filter(provaVisivel).map(vmMinha);
  const curso = cursoNoObjetivo() ? avals().filter(a => !a.feito && a.data && PROVA_TIPOS_CURSO.includes(a.tipo || "prova")).map(vmAval) : [];
  return [...minhas, ...curso].filter(p => p.data).sort((a, b) => a.data.localeCompare(b.data) || a.nome.localeCompare(b.nome, "pt"));
}
/** Só as que ainda vão acontecer (hoje inclusive). Provas passadas saem (nunca riscadas). */
const provasFuturas = () => todasProvas().filter(p => p.data >= hoje());
function provaPorId(id) {
  const r = store.doc("plano").itens[id]; if (r && r.tipo === "prova") return vmMinha(r);
  const a = acad().aval[id]; return a && cursoNoObjetivo() ? vmAval(a) : null;
}

/* ---------- Unidades de estudo e desempenho ---------- */
function nomeUnidade(u) {
  if (u.startsWith("d:")) return ENEM_DISC[u.slice(2)]?.nome || u.slice(2);
  if (u.startsWith("disc:")) return u.slice(5);
  return nomeTema(u);
}
const _qu = { k: null, m: {} };
/** Questões do objetivo de uma unidade (com cache por render). */
function questoesUnidade(u) {
  const chave = questoes().length + "|" + objetivo();
  if (_qu.k !== chave) { _qu.k = chave; _qu.m = {}; }
  if (_qu.m[u]) return _qu.m[u];
  const Q = questoes().filter(doObjetivo);
  let r;
  if (u.startsWith("d:")) { const d = u.slice(2), nome = norm(ENEM_DISC[d]?.nome || ""); r = Q.filter(q => q.t === "enem" && (TEMAS[q.tema]?.disciplinaId === d || (!TEMAS[q.tema] && norm(q.disc) === nome))); }
  else if (u.startsWith("disc:")) r = Q.filter(q => q.disc === u.slice(5));
  else r = Q.filter(q => q.tema === u);
  return _qu.m[u] = r;
}
/** Força na unidade (0 = fraca, 1 = forte). Sem estudo conta como fraca (0,3); com poucas respostas, suavizado. */
function forcaUnidade(u) {
  let n = 0, ac = 0;
  questoesUnidade(u).forEach(q => { const p = progDe(q); if (p?.n) { n += p.n; ac += p.ac; } });
  const revisto = TEMAS[u] && store.doc("revisoes").temas[u];
  return { n, ac, score: n ? (ac + 1) / (n + 2) : revisto ? 0.55 : 0.3 };
}
/** Unidades que a prova pode ter, conforme o objetivo do perfil (para o formulário). */
function unidadesDoObjetivo() {
  const o = objetivo();
  if (o === "medicina" || o === "residencia") return Object.values(TEMAS).filter(t => t.dominio !== "enem" && temaDoObjetivo(t)).map(t => t.id);
  if (o === "enem") return Object.keys(ENEM_DISC).map(d => "d:" + d);
  if (o === "direito" || o === "oab") return unicos(questoes().filter(doObjetivo).map(q => q.disc)).map(d => "disc:" + d);
  return [];
}
/** Prova sem temas: os pontos fracos gerais do objetivo (e, na Medicina, os temas do período). */
function unidadesPadrao() {
  const o = objetivo(), ordem = l => l.map(u => [u, forcaUnidade(u)]).sort((a, b) => a[1].score - b[1].score).map(x => x[0]);
  if (o === "medicina" || o === "residencia") {
    const fracos = listaPor(agregados().por.tema, 1).sort((a, b) => a.p - b.p).map(x => x.k).filter(t => TEMAS[t] && temaDoObjetivo(TEMAS[t]));
    const g = minhaGrade(), per = store.doc("perfil").periodo;
    const doPeriodo = g && o === "medicina" ? itensGrade(g).filter(i => !per || i.periodo === per).flatMap(temasDoItem).filter(t => TEMAS[t]) : [];
    let l = unicos([...fracos.slice(0, 8), ...doPeriodo]).filter(t => questoesUnidade(t).length);
    if (!l.length) l = unidadesDoObjetivo().map(t => [t, questoesUnidade(t).length]).sort((a, b) => b[1] - a[1]).slice(0, 10).map(x => x[0]);
    return ordem(l).slice(0, 12);
  }
  return ordem(unidadesDoObjetivo().filter(u => questoesUnidade(u).length)).slice(0, 12);
}
const unidadesDe = pv => { const l = (pv.temas || []).filter(u => typeof u === "string" && u); return l.length ? l : unidadesPadrao(); };

/* ---------- Plano até a prova ---------- */
const metaQ = pv => { const m = store.doc("perfil").metas?.questoes || 20; return Math.max(5, Math.min(80, Math.round(m * ({ 2: 1.25, 3: 1.5 }[pv.peso] || 1)))); };
/** Reparte a lista em k partes contíguas de tamanhos quase iguais (mantém a ordem de prioridade). */
function repartir(l, k) { const out = [], base = Math.floor(l.length / k), extra = l.length % k; let i = 0; for (let j = 0; j < k; j++) { const n = base + (j < extra ? 1 : 0); out.push(l.slice(i, i + n)); i += n; } return out; }
/** Dias de hoje (ou amanhã, se hoje já foi feito) até a véspera:
    1º estudo dos temas que faltam, piores primeiro; perto da data, revisão do que já foi visto; véspera leve (erros + flashcards). */
function gerarPlano(pv, feitos) {
  const H = hoje(), vesp = somaDias(pv.data, -1), ini = feitos[H] ? somaDias(H, 1) : H, dias = [];
  if (pv.data <= H || ini > vesp) return dias;
  const n = diasAte(vesp) - diasAte(ini) + 1, meta = metaQ(pv), todas = unidadesDe(pv);
  const F = {}; todas.forEach(u => { F[u] = forcaUnidade(u).score; });
  const pior = (a, b) => F[a] - F[b] || todas.indexOf(a) - todas.indexOf(b);
  const vistas = new Set(Object.entries(feitos).filter(([d]) => d < pv.data).flatMap(([, f]) => f.u || []));
  const faltam = todas.filter(u => !vistas.has(u)).sort(pior), revisar = todas.slice().sort(pior);
  const antes = n - 1, R = antes >= 4 ? Math.max(1, Math.round(antes / 4)) : 0, E = antes - R;
  const dia = (k, tipo, u, nq) => dias.push({ d: somaDias(ini, k), tipo, u, nq });
  if (E > 0) {
    const fila = faltam.length ? faltam : revisar;
    if (fila.length >= E) repartir(fila, E).forEach((u, k) => dia(k, faltam.length ? "estudo" : "reforco", u, meta));
    else for (let k = 0; k < E; k++) dia(k, k < fila.length && faltam.length ? "estudo" : "reforco", [fila[k % fila.length]], meta);
  }
  if (R > 0) (revisar.length >= R ? repartir(revisar, R) : Array.from({ length: R }, (_, k) => [revisar[k % revisar.length]])).forEach((u, k) => dia(E + k, "revisao", u, meta));
  dia(antes, "vespera", revisar, Math.max(5, Math.round(meta / 2)));
  return dias.filter(x => x.u.length && x.u[0]);
}
/** Plano atual da prova (recalcula e grava quando muda a data, os temas, a meta ou o dia). */
function prepDe(pv) {
  if (!pv.data || pv.data < hoje()) return pv.rec.prep || { dias: [], feitos: {} };
  const chave = [pv.data, (pv.temas || []).join(","), metaQ(pv), objetivo()].join("|");
  let p = pv.rec.prep;
  if (!p || typeof p !== "object" || p.chave !== chave || p.calc !== hoje() || !Array.isArray(p.dias)) {
    const feitos = p && typeof p.feitos === "object" && p.feitos ? p.feitos : {};
    p = pv.rec.prep = { chave, calc: hoje(), feitos, dias: [] };
    p.dias = gerarPlano(pv, feitos); pv.salvar();
  }
  conferirHoje(pv, p);
  return p;
}
const inicioDoDia = () => new Date(hoje() + "T00:00:00").getTime();
/** Respostas dadas hoje em questões das unidades. */
function respondidasHoje(us) { const t0 = inicioDoDia(); let n = 0; unicos(us.flatMap(u => questoesUnidade(u))).forEach(q => { (progDe(q)?.h || []).forEach(h => { if (h[0] >= t0) n++; }); }); return n; }
const disponiveis = us => unicos(us.flatMap(u => questoesUnidade(u).map(q => q.id))).length;
/** O dia de hoje conta como feito quando ela respondeu (hoje) as questões previstas nas unidades do dia. */
function conferirHoje(pv, p) {
  const d = p.dias.find(x => x.d === hoje()); if (!d || p.feitos[d.d]) return;
  const alvo = Math.max(1, Math.min(d.nq, disponiveis(d.u)));
  if (disponiveis(d.u) && respondidasHoje(d.u) >= alvo) { p.feitos[d.d] = { tipo: d.tipo, u: d.u, nq: d.nq }; pv.salvar(); }
}
const diaDeHoje = (pv, p = prepDe(pv)) => p.dias.find(x => x.d === hoje() && !p.feitos[x.d]) || null;
/** Quanto do plano já foi cumprido: dias feitos ÷ (feitos + que faltam). */
function progressoPlano(pv, p = prepDe(pv)) {
  const feitos = Object.keys(p.feitos || {}).filter(d => d < pv.data).length, faltam = p.dias.filter(x => !p.feitos[x.d]).length;
  return { feitos, total: feitos + faltam, pct: pct(feitos, feitos + faltam) };
}
/** Questões da sessão do dia: erradas e não vistas primeiro; na véspera, os erros abertos. */
function idsDoDia(pv, dia) {
  const qs = unicos(dia.u.flatMap(u => questoesUnidade(u).map(q => q.id))).map(qPorId).filter(Boolean), E = store.doc("erros").itens;
  const peso = q => { const s = statusQ(q), p = progDe(q); return (E[q.id]?.status === "aberto" ? -1 : 0) + (s.chave === "incorreta" ? 0 : s.chave === "nao" ? (dia.tipo === "vespera" ? 2 : 1) : 3 + (p?.h?.at(-1)?.[0] || 0) / 1e13); };
  return embaralhar(qs).sort((a, b) => peso(a) - peso(b)).slice(0, dia.nq).map(q => q.id);
}
const TIPO_DIA = { estudo: "Estudo", reforco: "Reforço dos pontos fracos", revisao: "Revisão do que já viu", vespera: "Véspera leve: erros e flashcards" };
const nomesUnidades = (us, max = 3) => { const n = us.map(nomeUnidade); return n.length > max ? `${n.slice(0, max).join(", ")} e mais ${n.length - max}` : n.join(", ").replace(/, ([^,]*)$/, " e $1"); };
function marcarDiaFeito(id, d) {
  const pv = provaPorId(id); if (!pv) return; const p = prepDe(pv), dia = p.dias.find(x => x.d === d) || { tipo: "estudo", u: [], nq: 0 };
  p.feitos[d] = { tipo: dia.tipo, u: dia.u, nq: dia.nq }; pv.salvar();
}
ACOES["prova-estudar"] = el => {
  const pv = provaPorId(el.dataset.id); if (!pv) return;
  const dia = diaDeHoje(pv);
  if (!dia) { toast(diasAte(pv.data) <= 0 ? "Hoje é o dia da prova. Boa prova!" : "A sessão de hoje já foi feita. Veja o plano."); ir("#/provas/" + encodeURIComponent(pv.id)); return; }
  const ids = idsDoDia(pv, dia);
  if (!ids.length) { toast("Ainda não há questões destes temas. Estude pelo resumo e marque o dia como feito."); ir(TEMAS[dia.u[0]] ? "#/tema/" + encodeURIComponent(dia.u[0]) : "#/provas/" + encodeURIComponent(pv.id)); return; }
  const id = pv.id, d = dia.d;
  iniciarPlayer("banco", ids, "pratica", res => {
    if (res.length < Math.ceil(ids.length / 2)) return `Você respondeu ${res.length} de ${ids.length}. Responda pelo menos ${Math.ceil(ids.length / 2)} para concluir o dia do plano.`;
    marcarDiaFeito(id, d); return `Dia do plano para ${provaPorId(id)?.nome || "a prova"} concluído.`;
  });
  PL.rotulo = `${pv.nome}: ${dia.tipo === "vespera" ? "véspera" : nomesUnidades(dia.u, 2)}`; ir("#/questoes");
};
ACOES["prova-dia-feito"] = el => { marcarDiaFeito(el.dataset.id, el.dataset.d); toast("Dia marcado como feito"); atualizar(); };

/* ---------- Contagem: peças visuais ---------- */
const nivelProva = n => n <= 3 ? "perto" : n <= 7 ? "meio" : "longe";
const textoFaltam = n => n === 0 ? "É hoje! Boa prova" : n === 1 ? "É amanhã" : `Faltam ${n} dias`;
function contagemGrande(pv) {
  const n = diasAte(pv.data);
  return n <= 1 ? `<p class="pv-grande">${n === 0 ? "É hoje! <span>Boa prova</span>" : "É amanhã"}</p>`
    : `<p class="pv-num"><span>Faltam</span><b>${n}</b><span>dias</span></p>`;
}
const quandoCurto = n => n === 0 ? "hoje" : n === 1 ? "amanhã" : `em ${n} dias`;
function linhaProvaMenor(pv) {
  const n = diasAte(pv.data);
  return `<a class="pv-prox" data-nivel="${nivelProva(n)}" href="#/provas/${encodeURIComponent(pv.id)}"><b>${esc(pv.nome)}</b><small>${quandoCurto(n)} · ${dataBR(pv.data)}</small></a>`;
}
/** Sem provas: convite curto no Início (pode ser dispensado; a dispensa fica no perfil). */
function conviteProvas() {
  if (!objetivo() || provasFuturas().length || store.doc("perfil").provasConviteOff) return "";
  return `<section class="pv-convite" aria-label="Contagem regressiva das provas"><p><b>Cadastre sua próxima prova</b><br><span class="small">O app conta os dias e monta um plano até a data.</span></p>
    <div class="linha"><a class="btn azul" href="#/provas/nova">Cadastrar prova</a><button class="btn sec" data-act="provas-convite-off">Agora não</button></div></section>`;
}
/** Cartão do Início: a prova mais próxima em destaque e as 2 seguintes menores. */
function cartaoProvas() {
  if (!objetivo()) return "";
  const L = provasFuturas(); if (!L.length) return "";
  const [a, ...resto] = L, n = diasAte(a.data), p = prepDe(a), pr = progressoPlano(a, p);
  return `<section class="pv-cartao" data-nivel="${nivelProva(n)}" aria-label="Contagem regressiva: ${esc(a.nome)}, ${textoFaltam(n)}">
    <span class="lab">Contagem regressiva</span>
    <p class="pv-nome">${esc(a.nome)}<small>${dataBR(a.data)}${a.origem === "curso" ? " · Meu curso" : ""}</small></p>
    ${contagemGrande(a)}
    ${n > 0 && pr.total ? `<div class="pv-plano"><span class="small">Plano: ${pr.feitos} de ${plural(pr.total, "dia feito", "dias feitos")}</span>${medidor(pr.pct, "ok")}</div>` : ""}
    <div class="linha">${n > 0 ? `<button class="btn azul grande" data-act="prova-estudar" data-id="${esc(a.id)}">Estudar para esta prova</button>` : ""}<a class="btn sec" href="#/provas">Minhas provas</a></div>
    ${resto.length ? `<div class="pv-proximas"><span class="lab">Depois</span>${resto.slice(0, 2).map(linhaProvaMenor).join("")}</div>` : ""}
  </section>`;
}
ACOES["provas-convite-off"] = () => { const P = store.doc("perfil"); P.provasConviteOff = true; store.mudou("perfil"); toast("Tudo bem. Cadastre quando quiser em Planejamento → Minhas provas."); atualizar(); };
/** Para o "Próximo passo": a sessão de hoje da prova mais próxima em até `lim` dias. */
function sessaoProvaHoje(lim = 14) {
  for (const pv of provasFuturas()) { const n = diasAte(pv.data); if (n < 1 || n > lim) continue; const dia = diaDeHoje(pv); if (dia) return { pv, dia, n }; }
  return null;
}

/* ---------- Páginas ---------- */
const CRUMB_PROVAS = ["Minhas provas", "#/provas"];
rota("/provas", () => {
  const T = todasProvas(), fut = T.filter(p => p.data >= hoje()), pas = T.filter(p => p.data < hoje()).reverse();
  const item = pv => { const n = diasAte(pv.data), pr = progressoPlano(pv);
    return `<a class="pv-item" data-nivel="${nivelProva(n)}" href="#/provas/${encodeURIComponent(pv.id)}"><span class="pv-dias">${n === 0 ? "<b>Hoje</b>" : n === 1 ? "<b>Amanhã</b>" : `<b>${n}</b><small>dias</small>`}</span>
      <span class="pv-item-tx"><b>${esc(pv.nome)}</b><small>${dataBR(pv.data)}${pv.origem === "curso" ? " · Meu curso" : ""}${pr.total ? ` · plano ${pr.feitos}/${pr.total}` : ""}</small></span></a>`; };
  return {
    secao: "plano", crumbs: [["Planejamento", "#/plano"]], titulo: "Minhas provas", sub: fut.length ? `${plural(fut.length, "prova marcada", "provas marcadas")}` : "Conte os dias e estude com um plano até a data",
    acoes: `<a class="btn azul" href="#/provas/nova">+ Nova prova</a>`,
    html: `${fut.length ? `<div class="pv-lista">${fut.map(item).join("")}</div>` : vazio("Nenhuma prova marcada. Cadastre a próxima: você informa a data e o app monta o plano até lá.", `<a class="btn azul" href="#/provas/nova">Cadastrar prova</a>`)}
      ${pas.length ? `<details class="mais"><summary>Já passaram (${pas.length})</summary><div class="tarefas">${pas.slice(0, 30).map(pv => `<div class="tarefa"><div class="o">${esc(pv.nome)}<small>${dataBR(pv.data)}</small></div><a class="btn mini sec" href="#/provas/${encodeURIComponent(pv.id)}">Ver</a></div>`).join("")}</div></details>` : ""}
      <p class="small muted">As datas são sempre as que você informa. Confira o edital ou o calendário oficial da sua prova.${cursoNoObjetivo() ? " Provas de Meu curso entram aqui sozinhas." : ""}</p>`,
  };
});
/* Formulário (página, não folha: a lista de temas é longa e precisa caber com letra enorme). */
function sugestoesProva() {
  const o = objetivo(), oe = objetivoEscolhido(), S = [], P = store.doc("perfil");
  if (o === "medicina" || o === "residencia" || o === "direito") {
    const g = minhaGrade(), cursando = g && o !== "residencia" ? itensGrade(g).filter(x => sitDe(x) === "cursando") : [];
    if (cursando.length) cursando.slice(0, 8).forEach(it => S.push([`Prova de ${it.nome}`, `Prova de ${it.nome}`, temasDoItem(it).filter(t => TEMAS[t] && temaDoObjetivo(TEMAS[t]))]));
    else S.push(["Prova de (disciplina)", "Prova de ", []]);
  }
  if (o === "medicina" || o === "residencia") { const inst = P.faculdade && instPorId(P.faculdade); S.push(inst ? [`Residência — ${inst.sigla}`, `Residência — ${inst.sigla}`, []] : ["Residência — (instituição)", "Residência — ", []]); }
  if (o === "enem") ["ENEM", "PSC/UFAM", "SIS/UEA", "Macro/UEA"].forEach(n => S.push([n, n, []]));
  if (oe === "oab") S.push(["OAB — 1ª fase", "OAB — 1ª fase", []]);
  if ((P.interessesConcursos || []).some(x => String(x).startsWith("cnu"))) S.push(["CNU", "CNU", []]);
  return S;
}
function grupoUnidades() {
  const o = objetivo(), us = unidadesDoObjetivo();
  if (o === "medicina" || o === "residencia") {
    const area = t => ESPECIALIDADES[(TEMAS[t].especialidades || [])[0]]?.areaNome || "Outros temas";
    return Object.entries(porChave(us, area)).sort((a, b) => a[0].localeCompare(b[0], "pt")).map(([g, l]) => [g, ordenarPt(l, nomeTema)]);
  }
  if (o === "enem") return ENEM_AREAS.map(a => [a.nome, (a.disciplinas || []).map(d => "d:" + d.id)]);
  return us.length ? [["Disciplinas", ordenarPt(us, nomeUnidade)]] : [];
}
function formProva(r) {
  const sel = new Set(r?.temas || []), grupos = grupoUnidades(), sug = r ? [] : sugestoesProva();
  const marcados = grupos.reduce((s, [, l]) => s + l.filter(u => sel.has(u)).length, 0);
  return `<form class="pilha pv-form" data-form="prova-salvar" data-id="${esc(r?.id || "")}" novalidate>
    <label class="campo"><span class="lab">Nome da prova</span><input type="text" id="pv-nome" maxlength="80" value="${esc(r?.nome || "")}" placeholder="Ex.: ${esc(objetivo() === "enem" ? "ENEM" : "Prova de Anatomia")}" autocomplete="off"></label>
    ${sug.length ? `<div class="pv-sug-bloco"><span class="lab">Sugestões · toque para preencher</span><div class="pv-sug">${sug.slice(0, 4).map(([rot, nome, us]) => `<button type="button" class="btn sec" data-act="prova-sug" data-nome="${esc(nome)}" data-u="${esc(us.join(","))}">${esc(rot)}</button>`).join("")}</div>
      ${sug.length > 4 ? `<details class="mais"><summary>Mais sugestões (${sug.length - 4})</summary><div class="pv-sug">${sug.slice(4).map(([rot, nome, us]) => `<button type="button" class="btn sec" data-act="prova-sug" data-nome="${esc(nome)}" data-u="${esc(us.join(","))}">${esc(rot)}</button>`).join("")}</div></details>` : ""}</div>` : ""}
    <label class="campo pv-data"><span class="lab">Data da prova</span><input type="date" id="pv-data" value="${esc(r?.dataProva || "")}" min="${hoje()}" aria-describedby="pv-erro"></label>
    <p id="pv-erro" class="pv-erro" role="alert"></p>
    <label class="campo"><span class="lab">Importância (opcional)</span><select id="pv-peso">${opcoes(IMPORTANCIA, r?.peso || 1)}</select></label>
    ${grupos.length ? `<fieldset class="pv-temas"><legend class="lab">${objetivo() === "enem" ? "Áreas e disciplinas" : "Temas"} (opcional) · <span id="pv-n">${marcados}</span> escolhidos</legend>
      <p class="small muted">Sem temas, o plano usa seus pontos fracos.</p>
      ${grupos.map(([g, l]) => `<details ${l.some(u => sel.has(u)) || grupos.length <= 5 ? "open" : ""}><summary>${esc(g)} <small>(${l.length})</small></summary>${l.map(u => `<label class="check"><input type="checkbox" name="pv-u" value="${esc(u)}" data-chg="prova-u" ${sel.has(u) ? "checked" : ""}><span>${esc(nomeUnidade(u))}</span></label>`).join("")}</details>`).join("")}</fieldset>` : ""}
    <button class="btn azul grande">${r ? "Salvar mudanças" : "Salvar prova"}</button></form>`;
}
const contarU = () => { const n = document.getElementById("pv-n"); if (n) n.textContent = document.querySelectorAll('input[name="pv-u"]:checked').length; };
MUDANCAS["prova-u"] = contarU;
ACOES["prova-sug"] = el => {
  const nome = $("#pv-nome"); nome.value = el.dataset.nome;
  const us = (el.dataset.u || "").split(",").filter(Boolean);
  if (us.length) { document.querySelectorAll('input[name="pv-u"]').forEach(c => { c.checked = us.includes(c.value); if (c.checked) c.closest("details")?.setAttribute("open", ""); }); contarU(); }
  if (/ $/.test(el.dataset.nome)) { nome.focus(); nome.setSelectionRange(nome.value.length, nome.value.length); } else $("#pv-data").focus();
};
rota("/provas/nova", () => ({ secao: "plano", crumbs: [CRUMB_PROVAS], titulo: "Nova prova", sub: "Você informa a data; o app conta os dias e monta o plano.", html: objetivo() ? formProva(null) : vazio("Escolha primeiro a sua área de estudo.", `<a class="btn" href="#/areas">Áreas de estudo</a>`) }));
rota("/provas/:id/editar", ({ id }) => {
  const r = store.doc("plano").itens[id]; if (!r || r.tipo !== "prova") return paginaNaoEncontrada();
  return { secao: "plano", crumbs: [CRUMB_PROVAS, [r.nome || "Prova", "#/provas/" + encodeURIComponent(id)]], titulo: "Editar prova", html: formProva(r) };
});
FORMS["prova-salvar"] = f => {
  const nome = $("#pv-nome").value.trim() || "Prova", data = $("#pv-data").value, erro = $("#pv-erro"), campo = $("#pv-data");
  const falha = msg => { erro.textContent = msg; campo.setAttribute("aria-invalid", "true"); campo.focus(); toast(msg); };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data)) return falha("Informe a data da prova para salvar.");
  if (data < hoje()) return falha("Essa data já passou. Escolha a data da próxima prova.");
  const P = store.doc("plano"), id = f.dataset.id || novoId("pv"), velho = P.itens[id] || {};
  const temas = [...document.querySelectorAll('input[name="pv-u"]:checked')].map(c => c.value);
  P.itens[id] = { ...velho, id, tipo: "prova", nome, dataProva: data, temas, peso: +$("#pv-peso").value || 1, dom: velho.dom || domProva(), obj: velho.obj || objetivoEscolhido(), criado: velho.criado || Date.now() };
  store.mudou("plano"); toast(f.dataset.id ? "Prova atualizada · plano recalculado" : "Prova salva · plano montado");
  ir("#/provas/" + encodeURIComponent(id));
};
function linhaDia(pv, x, hojeAqui) {
  const dt = new Date(x.d + "T12:00").toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "2-digit" });
  return `<div class="tarefa pv-dia" data-tipo="${esc(x.tipo)}"><div class="o"><b>${hojeAqui ? "Hoje" : esc(dt)}</b> · ${esc(TIPO_DIA[x.tipo] || "Estudo")}<small>${esc(nomesUnidades(x.u))} · ${plural(x.nq, "questão", "questões")}</small></div></div>`;
}
rota("/provas/:id", ({ id }) => {
  const pv = provaPorId(id); if (!pv) return paginaNaoEncontrada();
  const n = diasAte(pv.data), p = prepDe(pv), pr = progressoPlano(pv, p), dHoje = diaDeHoje(pv, p);
  const proximos = p.dias.filter(x => !p.feitos[x.d] && x.d > hoje()), feitos = Object.entries(p.feitos || {}).filter(([d]) => d < pv.data).sort((a, b) => b[0].localeCompare(a[0]));
  const cardsHoje = pendencias().cards.length;
  const acoes = pv.origem === "minha" ? `<a class="btn sec" href="#/provas/${encodeURIComponent(id)}/editar">Editar</a><button class="btn sec perigo-tx" data-act="prova-excluir" data-id="${esc(id)}">Excluir</button>`
    : `<button class="btn sec" data-act="aval-editar" data-id="${esc(id)}">Editar data e temas</button><a class="btn sec" href="#/curso/aval/${encodeURIComponent(id)}">Em Meu curso</a>`;
  const confirmar = PROVAS_UI.confirmar === id ? `<div class="pv-confirmar" role="alert"><p><b>Excluir “${esc(pv.nome)}”?</b> O plano desta prova também sai. Não dá para desfazer.</p>
    <div class="linha"><button class="btn perigo" data-act="prova-excluir-ok" data-id="${esc(id)}">Sim, excluir</button><button class="btn sec" data-act="prova-excluir-nao">Cancelar</button></div></div>` : "";
  const blocoHoje = n <= 0 ? "" : dHoje ? `<section class="pv-hoje"><span class="lab">Hoje · ${esc(TIPO_DIA[dHoje.tipo] || "Estudo")}</span><p class="pv-hoje-tit">${esc(nomesUnidades(dHoje.u, 4))}</p><p class="small">${plural(dHoje.nq, "questão", "questões")}${dHoje.tipo === "vespera" ? " · erros abertos primeiro" : " · as erradas e as novas primeiro"}</p>
      <div class="linha"><button class="btn azul grande" data-act="prova-estudar" data-id="${esc(id)}">Estudar hoje</button>${dHoje.tipo === "vespera" && cardsHoje ? `<a class="btn sec" href="#/flashcards/estudar">Flashcards (${cardsHoje})</a>` : ""}<button class="btn sec" data-act="prova-dia-feito" data-id="${esc(id)}" data-d="${hoje()}">Já fiz hoje</button></div></section>`
    : p.feitos[hoje()] ? `<p class="pv-ok" role="status">✓ Sessão de hoje feita. Amanhã o plano continua.</p>` : "";
  const unidades = unidadesDe(pv), semTemas = !pv.temas.length;
  return {
    secao: "plano", crumbs: [CRUMB_PROVAS], titulo: pv.nome,
    sub: [dataBR(pv.data), pv.origem === "curso" ? "Meu curso" : "", pv.peso > 1 ? "importância " + IMPORTANCIA.find(x => x[0] === pv.peso)?.[1].toLowerCase() : ""].filter(Boolean).join(" · "),
    acoes,
    html: `${confirmar}
      ${n < 0 ? `<div class="vazio"><p>Esta prova já passou (${dataBR(pv.data)}).</p></div>` : `<section class="pv-cartao pv-cartao-pg" data-nivel="${nivelProva(n)}">${contagemGrande(pv)}
        ${pr.total ? `<div class="pv-plano"><span class="small">Plano: ${pr.feitos} de ${plural(pr.total, "dia feito", "dias feitos")}</span>${medidor(pr.pct, "ok")}</div>` : ""}</section>`}
      ${blocoHoje}
      ${n > 0 ? `<section><h2 class="sec">Próximos dias</h2>${proximos.length ? `<div class="tarefas">${proximos.map(x => linhaDia(pv, x)).join("")}</div>` : `<p class="muted">${n === 1 && !dHoje ? "Amanhã é a prova: descanse e durma bem." : "Nada mais até a prova."}</p>`}</section>` : ""}
      ${feitos.length ? `<details class="mais pv-feito"><summary>Feito (${feitos.length})</summary><div class="tarefas">${feitos.map(([d, f]) => linhaDia(pv, { d, ...f, u: f.u || [] })).join("")}</div></details>` : ""}
      <section><h2 class="sec">${objetivo() === "enem" ? "Áreas e disciplinas" : "Temas"}</h2>
        ${semTemas ? `<p class="small">Esta prova não tem temas escolhidos. O plano usa seus pontos fracos${objetivoEscolhido() ? " em " + esc(NOME_CURTO_OBJ[objetivoEscolhido()] || "") : ""}:</p>` : ""}
        <div class="pv-unidades">${unidades.map(u => TEMAS[u] ? `<a href="#/tema/${encodeURIComponent(u)}">${esc(nomeUnidade(u))}</a>` : `<span>${esc(nomeUnidade(u))}</span>`).join("")}</div></section>
      <p class="small muted">O plano vai até a véspera: primeiro os temas em que você está pior ou ainda não estudou, revisão do que já viu perto da data e uma véspera leve. Se um dia ficar para trás, o que faltou é redistribuído nos dias seguintes.</p>`,
    ctx: { prova: pv.nome },
  };
});
ACOES["prova-excluir"] = el => { PROVAS_UI.confirmar = el.dataset.id; atualizar(); setTimeout(() => document.querySelector(".pv-confirmar .btn")?.focus(), 30); };
ACOES["prova-excluir-nao"] = () => { PROVAS_UI.confirmar = null; atualizar(); };
ACOES["prova-excluir-ok"] = el => { const P = store.doc("plano"), r = P.itens[el.dataset.id]; PROVAS_UI.confirmar = null; if (!r || r.tipo !== "prova") return; delete P.itens[el.dataset.id]; store.mudou("plano"); toast("Prova excluída"); ir("#/provas"); };
