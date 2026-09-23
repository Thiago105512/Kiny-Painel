/* ============================================================
   07-arvore — mapa mental visual (árvore vertical com ramos recolhíveis).
   Vertical de propósito: cabe no celular sem rolagem lateral.
   no = {t, sub?, href?, cls?: "ok"|"bad"|"", filhos?: no[]}
   ============================================================ */
function noHTML(no, nivel) {
  const f = (no.filhos || []).filter(Boolean);
  const rot = `<span class="no ${no.cls || ""}">${no.href ? `<a href="${no.href}">${esc(no.t)}</a>` : esc(no.t)}${no.sub ? ` <small>${esc(no.sub)}</small>` : ""}</span>`;
  if (!f.length) return `<li>${rot}</li>`;
  return `<li><details ${nivel < 2 ? "open" : ""}><summary>${rot} <small class="muted">${f.length}</small></summary><ul>${f.map(x => noHTML(x, nivel + 1)).join("")}</ul></details></li>`;
}
const arvore = raiz => `<ul class="arvore" role="tree">${noHTML(raiz, 0)}</ul>`;

/** Converte um texto indentado ("- item" / "  - subitem") numa árvore. Usado no mapa mental da IA. */
function textoParaArvore(txt, titulo = "Mapa mental") {
  const linhas = String(txt).split(/\r?\n/).map(l => {
    const m = l.replace(/\t/g, "  ").match(/^(\s*)(?:[-*•]|\d+[.)])?\s*(.+?)\s*$/);
    return m && m[2] ? { n: m[1].length, t: m[2].replace(/\*\*/g, "") } : null;
  }).filter(Boolean);
  if (!linhas.length) return { t: titulo };
  const min = Math.min(...linhas.map(l => l.n)), topo = linhas.filter(l => l.n === min);
  const raiz = topo.length === 1 && linhas[0].n === min ? { t: linhas.shift().t, filhos: [] } : { t: titulo, filhos: [] };
  const pilha = [{ n: -1, no: raiz }];
  for (const l of linhas) {
    const no = { t: l.t, filhos: [] };
    while (pilha.length > 1 && pilha[pilha.length - 1].n >= l.n) pilha.pop();
    pilha[pilha.length - 1].no.filhos.push(no);
    pilha.push({ n: l.n, no });
  }
  return raiz;
}
/** Classe de cor pelo aproveitamento (só com 2+ respostas, para não pintar por acaso). */
const clsDesempenho = a => a.n >= 2 ? (a.ac / a.n >= .7 ? "ok" : a.ac / a.n < .5 ? "bad" : "") : "";
