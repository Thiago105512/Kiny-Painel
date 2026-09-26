/* ============================================================
   31-imagens — imagens didáticas (ECG simulados, por enquanto) nas
   questões e no Atlas: figura com crédito, botão "Ampliar" (tela cheia
   com rolagem lateral, bom para baixa visão) e estudo com a
   interpretação escondida até tocar (tente ler antes).
   ============================================================ */
const IMAGENS = DADOS.imagens || {};
/** Figura de uma imagem do banco. */
function figuraImg(id, { legenda = false } = {}) {
  const im = IMAGENS[id]; if (!im) return "";
  return `<figure class="fig"><div class="fig-img">${im.svg}</div>
    <figcaption class="linha entre"><span class="small muted">${esc(im.credito || "")}</span><button type="button" class="btn mini sec" data-act="img-ampliar" data-img="${esc(id)}">Ampliar</button></figcaption>
    ${legenda ? `<p class="leitura" style="margin:6px 0 0">${esc(im.legenda)}</p>` : ""}</figure>`;
}
ACOES["img-ampliar"] = el => { const im = IMAGENS[el.dataset.img]; if (!im) return;
  abrirFolha(`<div class="img-zoom" tabindex="0" aria-label="Imagem ampliada; role para os lados">${im.svg}</div><p class="small muted">Role para os lados para percorrer o traçado. ${esc(im.credito || "")}</p>`, { titulo: "Imagem ampliada" }); };

/* ---------- Atlas ---------- */
const ATLAS = { aberta: {} };
rota("/estudar/atlas", () => {
  const lista = Object.entries(IMAGENS);
  return { secao: "estudar", crumbs: [["Estudar", "#/estudar"]], titulo: "Atlas de ECG",
    sub: "Olhe o traçado, tente dar o diagnóstico e só depois toque em “Ver interpretação”. Traçados didáticos simulados, no papel padrão (25 mm/s, 10 mm/mV).",
    html: lista.length ? lista.map(([id, im]) => { const qs = questoes().filter(q => q.img === id);
      return `<section class="caixa"><div class="fig-img">${im.svg}</div>
        <div class="linha entre" style="margin-top:8px"><button class="btn sec" data-act="atlas-ver" data-img="${esc(id)}">${ATLAS.aberta[id] ? "Esconder" : "Ver interpretação"}</button>
        <span class="linha">${qs.length ? `<button class="btn mini" data-act="praticar-ids" data-ids="${qs.map(q => q.id).join(",")}" data-ctx="ECG: ${esc(im.titulo)}">Praticar ${qs.length}</button>` : ""}<button type="button" class="btn mini sec" data-act="img-ampliar" data-img="${esc(id)}">Ampliar</button></span></div>
        ${ATLAS.aberta[id] ? `<h2 class="sec" style="margin-top:10px">${esc(im.titulo)}</h2><p class="leitura" style="margin:0">${esc(im.legenda)}</p>` : ""}</section>`; }).join("")
      : vazio("Nenhuma imagem cadastrada ainda.") };
});
ACOES["atlas-ver"] = el => { ATLAS.aberta[el.dataset.img] = !ATLAS.aberta[el.dataset.img]; atualizar(); };
