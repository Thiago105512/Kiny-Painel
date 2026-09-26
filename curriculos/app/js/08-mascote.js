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

/* ---------- Avatares de pacientes (jogos de plantão) ---------- */
const PELES = ["#F1C9A5", "#D9A57A", "#B7825A", "#8D5B3C", "#6B4128"];
function avatar(tipo = "homem", tam = 64, semente = 0) {
  const pele = PELES[semente % PELES.length], cab = ["#2B1D14", "#4A3222", "#1A1A1A", "#6B4A2B"][semente % 4];
  const idoso = /idos/.test(tipo), mulher = /mulher|idosa|gestante/.test(tipo), pequeno = /crianca|bebe/.test(tipo);
  const cabelo = idoso ? "#D1D5DB" : cab, roupa = { homem: "#2563EB", mulher: "#C0265F", idoso: "#0F766E", idosa: "#6D28D9", crianca: "#D97706", bebe: "#38BDF8", gestante: "#DB2777" }[tipo] || "#475569";
  const r = pequeno ? 17 : 19, cy = pequeno ? 30 : 28;
  const fios = mulher ? `<path d="M${32 - r - 2} ${cy}c0-16 10-${r + 4} ${r + 2}-${r + 4}s${r + 2} ${r - 12} ${r + 2} ${r + 4}v18c-4 2-7 0-8-4-2-8-2-14-2-14-6 4-14 5-22 3 0 4-1 8-2 11-1 4-4 6-8 4z" fill="${cabelo}"/>`
    : tipo === "bebe" ? `<path d="M30 ${cy - r + 2}q4-6 6 0" fill="none" stroke="${cabelo}" stroke-width="2.5" stroke-linecap="round"/>`
    : `<path d="M${32 - r} ${cy - 2}c0-12 8-${r} ${r}-${r}s${r} ${r - 8} ${r} ${r}c-6-6-14-8-${r * 2 - 6} -2z" fill="${cabelo}"/>`;
  const barriga = tipo === "gestante" ? `<ellipse cx="40" cy="60" rx="11" ry="9" fill="${roupa}" stroke="rgba(0,0,0,.2)"/>` : "";
  const oculos = idoso ? `<circle cx="25" cy="${cy}" r="4.5" fill="none" stroke="#374151" stroke-width="1.6"/><circle cx="39" cy="${cy}" r="4.5" fill="none" stroke="#374151" stroke-width="1.6"/><path d="M29.5 ${cy}h5" stroke="#374151" stroke-width="1.6"/>` : "";
  return `<svg class="avatar" viewBox="0 0 64 64" width="${tam}" height="${tam}" aria-hidden="true">
    <circle cx="32" cy="32" r="31" fill="color-mix(in oklab, ${roupa} 16%, white)"/>
    <path d="M${pequeno ? 14 : 10} 64c0-12 10-18 22-18s22 6 22 18z" fill="${roupa}"/>${barriga}
    <circle cx="32" cy="${cy}" r="${r}" fill="${pele}"/>${fios}
    <circle cx="25" cy="${cy}" r="2" fill="#1F2937"/><circle cx="39" cy="${cy}" r="2" fill="#1F2937"/>${oculos}
    <path d="M27 ${cy + 8}q5 3 10 0" fill="none" stroke="#7C2D12" stroke-width="1.8" stroke-linecap="round"/></svg>`;
}

/* ---------- Monitor multiparamétrico (traçado animado) ---------- */
/** Um ciclo do traçado (largura 100, linha de base em y=30) para cada ritmo. */
function cicloECG(ritmo) {
  const bat = w => `l${w * .12} 0 q${w * .04} -5 ${w * .08} 0 l${w * .06} 0 l${w * .02} 3 l${w * .03} -22 l${w * .03} 26 l${w * .02} -7 l${w * .08} 0 q${w * .07} -8 ${w * .14} 0 l${w * .32} 0`;
  switch (ritmo) {
    case "assistolia": return "M0 30 l100 0";
    case "fv": return "M0 30 q6 -14 12 0 t12 0 q5 10 10 0 t8 -2 q7 -16 14 0 t10 4 q4 -9 8 0 t12 0 q5 12 14 -2";
    case "tv": return "M0 30 q8 -30 16 0 t16 0 t16 0 t16 0 t16 0 t20 0";
    case "flutter": return "M0 30 l6 -6 l4 8 l6 -6 l4 8 l2 3 l3 -22 l3 26 l2 -7 l6 -6 l4 8 l6 -6 l4 8 l6 -6 l4 8 l6 -6 l4 8 l6 -6 l4 8 l6 -6 l4 4";
    case "fa": return "M0 30 l6 1 l6 -2 l5 1 l2 3 l3 -22 l3 26 l2 -7 l8 1 l6 -2 l6 1 l4 -1 l2 3 l3 -22 l3 26 l2 -7 l5 1 l6 -2 l7 1 l6 -1 l4 0";
    case "taqui-sinusal": return `M0 30 ${bat(50)} ${bat(50)}`;
    case "bradi": case "bav3": return `M0 30 ${bat(100)}`;
    default: return `M0 30 ${bat(100)}`;
  }
}
function monitor(v = {}, { rotulo = false } = {}) {
  const ritmo = v.ritmo || "sinusal", d = cicloECG(ritmo), rep = [0, 100, 200, 300].map(x => `<path d="${d}" transform="translate(${x} 0)"/>`).join("");
  const batidas = { "taqui-sinusal": 2, fa: 2, tv: 6, fv: 3, flutter: 1, assistolia: 1 }[ritmo] || 1;   // complexos por ciclo desenhado
  const dur = Math.min(8, Math.max(1.2, 2 * batidas * 60 / (v.FC || 60)));
  const alerta = (k, val) => ({ FC: val < 50 || val > 120, SatO2: val < 92, FR: val < 10 || val > 24 })[k] ? " alerta" : "";
  const pa = !v.PA || /^0\s*x\s*0$/i.test(String(v.PA)) ? "—" : String(v.PA), pas = parseInt(pa, 10);
  return `<div class="monitor" role="img" aria-label="Monitor: FC ${v.FC ?? "—"}, PA ${pa}, SatO2 ${v.SatO2 ?? "—"}%, FR ${v.FR ?? "—"}, ritmo ${ritmo}">
    <div class="mon-tracado"><svg viewBox="0 0 400 50" preserveAspectRatio="none" style="animation-duration:${dur.toFixed(2)}s"><g class="mon-onda ${ritmo === "assistolia" ? "parada" : ""}">${rep}</g></svg>${rotulo ? `<span class="mon-ritmo">${esc(NOME_RITMO[ritmo] || ritmo)}</span>` : ""}</div>
    <div class="mon-num"><span class="m-fc${alerta("FC", v.FC)}"><small>FC</small><b>${v.FC ?? "—"}</b></span><span class="m-sat${alerta("SatO2", v.SatO2)}"><small>SpO₂</small><b>${v.SatO2 ?? "—"}</b></span>
    <span class="m-pa${pas && pas < 90 ? " alerta" : ""}"><small>PA</small><b>${esc(pa)}</b></span><span class="m-fr${alerta("FR", v.FR)}"><small>FR</small><b>${v.FR ?? "—"}</b></span></div></div>`;
}
const NOME_RITMO = { sinusal: "Ritmo sinusal", "taqui-sinusal": "Taquicardia sinusal", fa: "Fibrilação atrial", flutter: "Flutter atrial", tv: "Taquicardia ventricular", fv: "Fibrilação ventricular", assistolia: "Assistolia", bradi: "Bradicardia", bav3: "BAV total", aesp: "AESP (sem pulso)" };
