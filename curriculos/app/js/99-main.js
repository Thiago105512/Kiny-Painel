/* ============================================================
   99-main — inicialização: dados locais primeiro (tela imediata),
   depois conta, assistente e arquivos; contagem do tempo de estudo.
   ============================================================ */
(function iniciar() {
  // Lista global de temas para os campos com autocompletar
  const dl = document.createElement("datalist"); dl.id = "dl-temas";
  dl.innerHTML = ordenarPt(Object.values(TEMAS), t => t.nome).map(t => `<option value="${esc(t.nome)}">${esc(t.dominio === "enem" ? "ENEM · " + (ENEM_DISC[t.disciplinaId]?.nome || "") : (t.especialidades || []).map(e => ESPECIALIDADES[e]?.nome).filter(Boolean).join(", "))}</option>`).join("");
  document.body.appendChild(dl);

  store.aoRemoto(() => { invalidarQuestoes(); render(); });
  store.conectar().then(() => { invalidarQuestoes(); render(); });
  render();
  IA.iniciar();
  iniciarArquivos().then(() => { if (/biblioteca/.test(caminhoAtual())) render(); });

  // Tempo de estudo: conta blocos de 15 s com a página visível e interação nos últimos 3 min.
  let ultimaAcao = Date.now(), acumulado = 0;
  ["click", "keydown", "scroll", "touchstart", "input"].forEach(ev => document.addEventListener(ev, () => { ultimaAcao = Date.now(); }, { passive: true }));
  setInterval(() => {
    if (document.visibilityState !== "visible" || Date.now() - ultimaAcao > 180000 || /biblioteca\/dados/.test(caminhoAtual())) return;
    acumulado += 15;
    if (acumulado >= 60) { registrarTempo(acumulado); acumulado = 0; }
  }, 15000);
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden" && acumulado) { registrarTempo(acumulado); acumulado = 0; } });
})();
