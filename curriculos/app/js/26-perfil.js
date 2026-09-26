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
