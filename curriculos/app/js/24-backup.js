/* ============================================================
   24-backup — backup automático semanal.
   Na conta: cada semana grava um arquivo JSON no armazenamento do app (assets)
   e registra no documento "backups". Sem conta: guarda a última cópia no navegador
   e lembra de baixar. Arquivos antigos só são apagados por ação do usuário.
   ============================================================ */
const SEMANA = 7 * DIA, LS_BACKUP = "gab2:backup-auto";
const temDados = () => Object.keys(TRILHAS).some(t => Object.keys(store.doc(docProg(t)).q).length) || cards().length || Object.keys(store.doc("grades").itens).length || Object.keys(store.doc("notas").temas).length;
const backups = () => (store.doc("backups").itens || []).slice().sort((a, b) => b.ts - a.ts);
let _backupRodando = false;
async function fazerBackup(motivo = "semanal") {
  if (_backupRodando) return null; _backupRodando = true;
  try {
    const json = JSON.stringify(store.exportar());
    let reg = { ts: Date.now(), bytes: json.length, motivo, onde: "navegador" };
    if (ASSETS) { try { const r = await ASSETS.upload(new Blob([json], { type: "application/json" })); reg = { ...reg, id: r.id, onde: "conta" }; } catch (e) { reg.falhaConta = e?.code || "erro"; } }
    if (reg.onde === "navegador") { try { localStorage.setItem(LS_BACKUP, json); } catch (e) { return null; } }
    const B = store.doc("backups"); B.itens = (B.itens || []).filter(x => x.onde === "conta").concat([reg]).slice(-60); store.mudou("backups");
    const P = store.doc("perfil"); P.ultimoBackup = reg.ts; store.mudou("perfil");
    return reg;
  } finally { _backupRodando = false; }
}
/** Chamado na abertura do app: faz o backup se a última cópia tiver mais de 7 dias. */
async function backupAutomatico() {
  const P = store.doc("perfil");
  if (P.backupAuto === false || !temDados() || Date.now() - (P.ultimoBackup || 0) < SEMANA) return;
  const r = await fazerBackup("semanal"); if (r) { toast("Backup semanal feito"); if (/biblioteca\/dados/.test(caminhoAtual())) atualizar(); }
}
async function textoDoBackup(reg) {
  if (reg.id) { const r = await fetch("/_blob/" + reg.id); if (!r.ok) throw new Error("arquivo indisponível"); return r.text(); }
  const t = localStorage.getItem(LS_BACKUP); if (!t) throw new Error("cópia local não encontrada"); return t;
}
function blocoBackups() {
  const P = store.doc("perfil"), lista = backups(), prox = P.ultimoBackup ? diaISO(new Date(P.ultimoBackup + SEMANA)) : null;
  return `<section class="caixa"><h2 class="sec">Backup automático semanal</h2>
    <label class="check"><input type="checkbox" data-chg="bk-auto" ${P.backupAuto === false ? "" : "checked"}><span>Ligado — ${ASSETS ? "uma cópia por semana guardada junto com o app, na sua conta" : "uma cópia por semana neste navegador (baixe um backup para ter uma cópia fora dele)"}</span></label>
    <p class="small muted">Último: ${P.ultimoBackup ? new Date(P.ultimoBackup).toLocaleString("pt-BR") : "nunca"}${prox && P.backupAuto !== false ? ` · próximo a partir de ${dataBR(prox)}` : ""}</p>
    <div class="linha"><button class="btn sec" data-act="bk-agora">Fazer backup agora</button>${lista.filter(b => b.onde === "conta").length > 4 && ASSETS ? `<button class="btn sec" data-act="bk-limpar">Apagar antigos (manter 4)</button>` : ""}</div>
    ${lista.length ? tabela([{ t: "Data" }, { t: "Tamanho", num: 1 }, { t: "Onde" }, { t: "" }], lista.slice(0, 12).map(b => [new Date(b.ts).toLocaleString("pt-BR") + (b.motivo !== "semanal" ? ` <span class="small muted">(${esc(b.motivo)})</span>` : ""), Math.max(1, Math.round(b.bytes / 1024)) + " KB", b.onde === "conta" ? "conta" : "este navegador",
      `<span class="linha" style="flex-wrap:nowrap"><button class="btn mini sec" data-act="bk-restaurar" data-ts="${b.ts}">Restaurar</button>${DOWNLOADS ? `<button class="btn mini sec" data-act="bk-baixar-um" data-ts="${b.ts}">Baixar</button>` : ""}</span>`]), { resp: true }) : ""}</section>`;
}
MUDANCAS["bk-auto"] = el => { const P = store.doc("perfil"); P.backupAuto = el.checked; store.mudou("perfil"); atualizar(); };
ACOES["bk-agora"] = async el => { el.disabled = true; const r = await fazerBackup("manual"); toast(r ? "Backup feito" : "Não foi possível fazer o backup"); atualizar(); };
const regPorTs = ts => backups().find(b => String(b.ts) === String(ts));
ACOES["bk-restaurar"] = el => { const b = regPorTs(el.dataset.ts); abrirFolha(`<h2 class="sec">Restaurar backup de ${new Date(b.ts).toLocaleString("pt-BR")}?</h2><p>Seus dados atuais serão substituídos pelos do backup. Antes disso, o app guarda uma cópia do estado atual (aparece na lista como "antes de restaurar").</p><button class="btn perigo" data-act="bk-restaurar-ok" data-ts="${b.ts}">Restaurar</button>`); };
ACOES["bk-restaurar-ok"] = async el => {
  const b = regPorTs(el.dataset.ts); el.disabled = true;
  try { const txt = await textoDoBackup(b); await fazerBackup("antes de restaurar"); store.importar(JSON.parse(txt)); invalidarQuestoes(); fecharFolha(); toast("Backup restaurado"); ir("#/"); }
  catch (e) { el.disabled = false; toast("Não foi possível restaurar: " + (e.message || "erro")); }
};
ACOES["bk-baixar-um"] = async el => { const b = regPorTs(el.dataset.ts);
  try { await DOWNLOADS.save({ filename: `gabarito-am-backup-${diaISO(new Date(b.ts))}.json`, data: await textoDoBackup(b) }); const P = store.doc("perfil"); P.ultimoDownload = Date.now(); store.mudou("perfil"); }
  catch (e) { if (!["cancelled", "declined"].includes(e?.code)) toast("Não foi possível baixar"); } };
ACOES["bk-limpar"] = async el => {
  el.disabled = true; const B = store.doc("backups"), conta = backups().filter(b => b.onde === "conta"), apagar = conta.slice(4);
  for (const b of apagar) { try { await ASSETS.delete(b.id); } catch (e) { } }
  B.itens = B.itens.filter(x => !apagar.includes(x)); store.mudou("backups"); toast(`${apagar.length} backups antigos apagados`); atualizar();
};
/** Aviso no Início quando os dados só existem neste navegador e não há download recente. */
function avisoBackup() {
  const P = store.doc("perfil");
  if (store.naConta || !temDados() || Date.now() - (P.ultimoDownload || P.migradoEm || 0) < 2 * SEMANA) return "";
  return `<div class="aviso">Seus dados estão só neste navegador. <a href="#/biblioteca/dados">Baixe ou copie um backup</a> para não perdê-los.</div>`;
}
