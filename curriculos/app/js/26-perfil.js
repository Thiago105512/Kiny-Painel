/* ============================================================
   26-perfil — link de boas-vindas que já traz o perfil preenchido
   (#/convite/<nome>/<faculdade>[/<apresentação>]). Nada é gravado sem
   confirmação: a pessoa confere, escolhe o período e toca em "Salvar".
   ============================================================ */
function linkConvite(nome, fac, apres) {
  return location.href.split("#")[0] + "#/convite/" + [nome, fac, apres].filter(Boolean).map(encodeURIComponent).join("/");
}
function paginaConvite({ nome, fac, apres }) {
  const P = store.doc("perfil"), inst = instPorId(fac), gs = inst ? gradesDe(fac, "medicina") : [];
  const outro = P.nome && P.nome !== nome;
  return {
    secao: "inicio", titulo: `Boas-vindas, ${nome.split(" ")[0]}!`, sub: "Confira seu perfil e escolha o período.",
    html: `<form class="pilha caixa" data-form="convite">
      <div class="campos">
        <label class="campo"><span class="lab">Nome</span><input type="text" id="cv-nome" maxlength="60" value="${esc(nome)}" required></label>
        <label class="campo"><span class="lab">Apresentação</span><input type="text" id="cv-apres" maxlength="60" value="${esc(apres || "")}"></label>
        <label class="campo"><span class="lab">Objetivo de estudo</span><select id="cv-obj">${opcoes(Object.entries(OBJETIVOS), P.objetivo || (gs.length ? gs[0].curso : null), "Tudo (sem foco)")}</select></label>
        <label class="campo"><span class="lab">Faculdade</span><select id="pf-inst" data-chg="pf-inst">${opcoes(instituicoes().map(i => [i.id, i.sigla]), inst ? fac : P.faculdade, "Selecione")}</select></label>
        <label class="campo"><span class="lab">Matriz (versão)</span><select id="pf-grade">${opcoes(gs.map(g => [g.id, g.versao || g.id]), gs[0]?.id, gs.length ? "Selecione" : "Nenhuma cadastrada")}</select></label>
        <label class="campo"><span class="lab">Período atual</span><select id="cv-per">${opcoes(Array.from({ length: 12 }, (_, i) => [i + 1, i + 1 + "º período"]), P.periodo, "Escolha")}</select></label>
      </div>
      ${outro ? `<p class="aviso">Este aparelho já tem o perfil de <b>${esc(P.nome)}</b>. Salvar troca nome e faculdade; o histórico de estudo continua o mesmo.</p>` : ""}
      <button class="btn azul grande">Salvar perfil</button></form>
      <p class="small muted">Cada pessoa que abre o app com a própria conta tem os próprios dados: questões, revisões e flashcards não se misturam.</p>`,
  };
}
rota("/convite/:nome/:fac", p => paginaConvite(p));
rota("/convite/:nome/:fac/:apres", p => paginaConvite(p));
FORMS["convite"] = () => {
  const P = store.doc("perfil"), n = parseInt($("#cv-per").value, 10);
  P.nome = $("#cv-nome").value.trim() || null; P.apresentacao = $("#cv-apres").value.trim() || null; P.objetivo = $("#cv-obj").value || null;
  P.faculdade = $("#pf-inst").value || null; P.gradeId = $("#pf-grade").value || null; P.periodo = n >= 1 && n <= 12 ? n : null;
  store.mudou("perfil"); toast("Perfil salvo"); ir("#/");
};

/* ============================================================
   Boas-vindas na primeira abertura: pergunta o objetivo (e a faculdade, para Medicina)
   numa tela simples, com letras grandes e sem menu — nada de outra área aparece antes da escolha.
   Só aparece com o perfil vazio e sem nenhum dado de estudo; depois de escolher (ou "Decidir depois"), nunca mais.
   ============================================================ */
const BV = { passo: "objetivo", obj: null, fac: null };
const OBJ_BV = [["medicina", "Medicina", "Graduação: matérias da faculdade, casos e questões"], ["residencia", "Residência médica", "Provas de residência e revisão por grandes áreas"],
  ["enem", "ENEM", "Questões, redação e matérias do ensino médio"],
  ["vestibulares", "Vestibulares", "PSC/UFAM, SIS/UEA e Macro/UEA — por enquanto com as questões no estilo ENEM, que cobrem os mesmos conteúdos"], ["direito", "Direito ou OAB", "Graduação em Direito e Exame de Ordem"]];
function precisaBoasVindas() {
  const P = store.doc("perfil");
  return !P.objetivo && !P.boasVindas && !P.nome && !P.faculdade && !temDados();
}
function paginaBoasVindas() {
  let corpo;
  if (BV.passo === "faculdade") corpo = `<p class="bv-pergunta">Em qual faculdade você estuda?</p>
    <div class="bv-opcoes">${instituicoes().map(i => `<button class="btn sec" data-act="bv-fac" data-v="${esc(i.id)}"><b>${esc(i.sigla)}</b>${i.nome ? `<small>${esc(i.nome)}</small>` : ""}</button>`).join("")}
      <button class="btn sec" data-act="bv-fac" data-v=""><b>Outra / escolher depois</b></button></div>
    <div class="acoes"><button class="btn sec" data-act="bv-voltar">Voltar</button></div>`;
  else if (BV.passo === "periodo") corpo = `<p class="bv-pergunta">Em que período você está?</p>
    <div class="bv-opcoes bv-periodos">${Array.from({ length: 12 }, (_, i) => `<button class="btn sec" data-act="bv-per" data-v="${i + 1}"><b>${i + 1}º</b></button>`).join("")}</div>
    <div class="acoes"><button class="btn sec" data-act="bv-per" data-v="">Pular</button><button class="btn sec" data-act="bv-voltar">Voltar</button></div>`;
  else corpo = `<p class="bv-pergunta">O que você vai estudar?</p>
    <div class="bv-opcoes">${OBJ_BV.map(([k, t, d]) => `<button class="btn sec" data-act="bv-obj" data-v="${k}"><b>${esc(t)}</b><small>${esc(d)}</small></button>`).join("")}</div>
    <p class="small muted">Você pode mudar depois no Perfil. O app mostra só o conteúdo do que você escolher.</p>
    <div class="acoes"><button class="btn sec mini" data-act="bv-depois">Decidir depois</button></div>`;
  return { secao: "boas-vindas", titulo: "Boas-vindas!", ilu: mascote("feliz", 64, ""), html: `<section class="boas-vindas">${corpo}</section>` };
}
function concluirBoasVindas(campos) {
  const P = store.doc("perfil"); Object.assign(P, campos, { boasVindas: true }); store.mudou("perfil");
  Object.assign(BV, { passo: "objetivo", obj: null, fac: null }); toast("Tudo pronto!"); render({ topo: true });
}
ACOES["bv-obj"] = el => { const o = el.dataset.v; if (!OBJETIVOS[o]) return;
  if (o === "medicina") { BV.obj = o; BV.passo = "faculdade"; render({ topo: true }); } else concluirBoasVindas({ objetivo: o }); };
ACOES["bv-fac"] = el => { BV.fac = el.dataset.v || null; if (BV.fac) { BV.passo = "periodo"; render({ topo: true }); } else concluirBoasVindas({ objetivo: BV.obj }); };
ACOES["bv-per"] = el => { const n = parseInt(el.dataset.v, 10), gs = gradesDe(BV.fac, "medicina"), g = gs.find(x => itensGrade(x).length) || gs[0];
  concluirBoasVindas({ objetivo: BV.obj, faculdade: BV.fac, gradeId: g?.id || null, periodo: n >= 1 && n <= 12 ? n : null }); };
ACOES["bv-voltar"] = () => { BV.passo = BV.passo === "periodo" ? "faculdade" : "objetivo"; render({ topo: true }); };
ACOES["bv-depois"] = () => concluirBoasVindas({});
