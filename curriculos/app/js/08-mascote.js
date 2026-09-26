/* ============================================================
   08-mascote — o Doutor Boto: boto-cor-de-rosa da Amazônia com
   espelho frontal e estetoscópio. Aparece nos jogos, na Jornada e
   nos resultados, com humores: feliz, festa, triste, surpreso, pensando.
   SVG próprio (sem imagens externas); cores fixas, legíveis no claro e no escuro.
   ============================================================ */
function mascote(humor = "feliz", tam = 96, rotulo = "Doutor Boto") {
  const olho = {
    feliz: `<path d="M50 55q5-6 10 0" fill="none" stroke="#2A1A22" stroke-width="3.2" stroke-linecap="round"/>`,
    festa: `<path d="M50 55q5-6 10 0" fill="none" stroke="#2A1A22" stroke-width="3.2" stroke-linecap="round"/>`,
    triste: `<circle cx="55" cy="55" r="4" fill="#2A1A22"/><path d="M48 47l10 3" stroke="#2A1A22" stroke-width="2.6" stroke-linecap="round"/><path d="M58 62q-2 5 0 7q2-2 0-7z" fill="#5AB0E8"/>`,
    surpreso: `<circle cx="55" cy="54" r="5.5" fill="#fff" stroke="#2A1A22" stroke-width="2"/><circle cx="55" cy="54" r="2.6" fill="#2A1A22"/>`,
    pensando: `<circle cx="56" cy="53" r="4" fill="#2A1A22"/><circle cx="57.4" cy="51.6" r="1.3" fill="#fff"/><path d="M49 45l12-2" stroke="#2A1A22" stroke-width="2.6" stroke-linecap="round"/>`,
  }[humor] || "";
  const boca = {
    feliz: `<path d="M9 79q13 9 27 1" fill="none" stroke="#8E2350" stroke-width="2.6" stroke-linecap="round"/>`,
    festa: `<path d="M9 78q13 13 27 2z" fill="#8E2350"/><path d="M15 82q7 4 14 0" fill="#F58FB0"/>`,
    triste: `<path d="M10 83q12-6 25-1" fill="none" stroke="#8E2350" stroke-width="2.6" stroke-linecap="round"/>`,
    surpreso: `<ellipse cx="24" cy="81" rx="5" ry="4" fill="#8E2350"/>`,
    pensando: `<path d="M10 80h24" stroke="#8E2350" stroke-width="2.6" stroke-linecap="round"/>`,
  }[humor] || "";
  const extra = humor === "festa"
    ? `<path d="M70 20l12-18 8 22z" fill="#D97706" stroke="#8A4B00" stroke-width="1.5"/><circle cx="82" cy="3" r="3.5" fill="#15803D"/><circle cx="12" cy="22" r="3" fill="#2340B8"/><circle cx="108" cy="42" r="3" fill="#C0265F"/><path d="M20 10l4 4M104 18l-3 5" stroke="#15803D" stroke-width="2.5" stroke-linecap="round"/>`
    : humor === "pensando" ? `<circle cx="100" cy="20" r="4" fill="#9AA3AF"/><circle cx="108" cy="9" r="6" fill="#9AA3AF"/>` : "";
  return `<svg class="mascote" viewBox="0 0 120 120" width="${tam}" height="${tam}" ${rotulo ? `role="img" aria-label="${esc(rotulo)}"` : 'aria-hidden="true"'}>
    <path d="M70 32l9-15 7 19z" fill="#E4789E" stroke="#B0426C" stroke-width="2" stroke-linejoin="round"/>
    <path d="M26 74C22 46 44 30 68 31c24 1 38 19 36 41-2 22-21 34-44 34-19 0-32-12-34-32z" fill="#F4A3BE" stroke="#B0426C" stroke-width="2.4"/>
    <path d="M30 70C16 69 5 73 5 79c0 6 12 8 29 5" fill="#F4A3BE" stroke="#B0426C" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M40 92c10 8 30 10 46 2" fill="none" stroke="#FBD3E0" stroke-width="7" stroke-linecap="round"/>
    <path d="M90 84c10 4 16 12 14 18-8-2-14-8-16-14" fill="#E4789E" stroke="#B0426C" stroke-width="2" stroke-linejoin="round"/>
    <circle cx="66" cy="70" r="5.5" fill="#F07AA0" opacity=".55"/>
    <circle cx="62" cy="39" r="8.5" fill="#E5E7EB" stroke="#6B7280" stroke-width="2"/><circle cx="62" cy="39" r="3.2" fill="#fff" stroke="#9CA3AF" stroke-width="1.2"/>
    <path d="M54 37C62 30 76 30 86 36" fill="none" stroke="#6B7280" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M44 86c-2 12 10 22 24 20 10-1 14-8 12-15" fill="none" stroke="#1F2937" stroke-width="3" stroke-linecap="round"/>
    <circle cx="80" cy="89" r="5.5" fill="#9CA3AF" stroke="#1F2937" stroke-width="2.2"/>
    ${olho}${boca}${extra}</svg>`;
}
/** Balão de fala do mascote (feedback de jogos, telas vazias). */
const falaMascote = (texto, humor = "feliz", tam = 84) => `<div class="fala-mascote">${mascote(humor, tam)}<p class="balao">${texto}</p></div>`;
