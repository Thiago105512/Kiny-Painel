/* ============================================================
   07-ilustra — ilustrações do app: um desenho de traço simples por
   especialidade (como um esboço de caderno), uma cor por grande área,
   ícones das pílulas e pequenas comemorações ao acertar.
   Tudo em SVG inline, sem imagens externas; respeita "reduzir movimento".
   ============================================================ */
const ARTE = {
  coracao: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10zM6 12h3l1.5-3 2 5 1.5-2H18",
  pulmao: "M12 3v8M12 11l-3 2M12 11l3 2M8.5 7C5 8 3 12.5 3 17c0 2 1.8 3 3.8 2.2L9 18.3V9.5zM15.5 7C19 8 21 12.5 21 17c0 2-1.8 3-3.8 2.2L15 18.3V9.5z",
  cerebro: "M9.5 4A3 3 0 0 0 6.6 6.2 3 3 0 0 0 4.5 11a3 3 0 0 0 1.8 4.9A3 3 0 0 0 12 17.5V5.2A3 3 0 0 0 9.5 4zM14.5 4a3 3 0 0 1 2.9 2.2 3 3 0 0 1 2.1 4.8 3 3 0 0 1-1.8 4.9A3 3 0 0 1 12 17.5M12 17.5V21",
  rim: "M9 3.5C5.5 3.5 4 7 4 11.5S6 20 9 20c2.6 0 3.4-2.3 2.5-4.2-.8-1.6-.8-2.9 0-4.4 1.2-2.2 1-7.9-2.5-7.9zM14 11.5h3.5M17.5 11.5c1.5 0 2.5 2 2.5 5",
  osso: "M7.2 3.7a2.5 2.5 0 0 0-3.5 3.5 2.5 2.5 0 0 0 1.8 3.1l8.2 8.2a2.5 2.5 0 0 0 3.1 1.8 2.5 2.5 0 0 0 3.5-3.5 2.5 2.5 0 0 0-1.8-3.1L10.3 5.5a2.5 2.5 0 0 0-3.1-1.8z",
  bebe: "M12 3.5a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4zM6.5 20.5c0-4.2 2.4-7.5 5.5-7.5s5.5 3.3 5.5 7.5zM10.8 6.8h.01M13.2 6.8h.01",
  mulher: "M12 3.5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM12 13.5V21M9 17.5h6",
  gestante: "M11 3a2.4 2.4 0 1 0 0 4.8A2.4 2.4 0 0 0 11 3zM9.5 21v-6.5L8 13.5l1.5-4.5h3.2c2.8 1.2 4.8 3.2 4.8 5.3 0 1.9-1.7 3-4 3V21",
  estetoscopio: "M6 3v6a4 4 0 0 0 8 0V3M10 13v2.5a4.5 4.5 0 0 0 9 0V13M19 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4",
  pilula: "M4.6 19.4a4 4 0 0 1 0-5.7l9.1-9.1a4 4 0 0 1 5.7 5.7l-9.1 9.1a4 4 0 0 1-5.7 0zM9.2 9.2l5.6 5.6",
  microscopio: "M9 3h4l-1 7h-2zM11 10v2.5M7 14a5 5 0 0 0 10 0M5 21h14M12 17v4",
  virus: "M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1M10.5 11h.01M13.5 13h.01",
  bacteria: "M6.3 17.7a4 4 0 0 1 0-5.6l5.8-5.8a4 4 0 0 1 5.6 5.6l-5.8 5.8a4 4 0 0 1-5.6 0zM10 12h.01M13 10h.01M12 15h.01M4 20l1.5-1.5M18.5 5.5 20 4",
  mosquito: "M12 9v9M12 9a2.2 2.2 0 1 0 0-4.4A2.2 2.2 0 0 0 12 9zM8.5 10.5 4 8M15.5 10.5 20 8M8.5 14 4 16.5M15.5 14 20 16.5M12 18l-2 3M12 18l2 3M12 4.6 12 2",
  seringa: "M17.5 3.5l3 3M15.5 5.5l3 3M17 7l-9 9-3.5 1 1-3.5 9-9M9 11l4 4M5.5 18.5 3 21",
  bisturi: "M3 21l6.5-6.5M9.5 14.5 19 5a2.1 2.1 0 0 1 3 3l-8.5 9.5z",
  curativo: "M4.6 14.4 14.4 4.6a3.2 3.2 0 0 1 4.5 4.5l-9.8 9.8a3.2 3.2 0 0 1-4.5-4.5zM9.5 9.5l5 5M11 12h.01M13 12h.01M12 11h.01M12 13h.01",
  ambulancia: "M3 17V8.5h11V17M14 10.5h4l3 3.5V17h-7M5 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0M15 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0M8.5 10.5v4M6.5 12.5h4",
  gota: "M12 3s6.5 7.2 6.5 11.5a6.5 6.5 0 0 1-13 0C5.5 10.2 12 3 12 3zM9.5 15a2.5 2.5 0 0 0 2.5 2.5",
  pele: "M4 6h16v12H4zM4 10.5h16M8 7.8h.01M12 14h.01M16 7.8h.01M9 15.5h.01M15.5 15h.01",
  dna: "M7 3c0 6 10 6 10 9s-10 3-10 9M17 3c0 6-10 6-10 9s10 3 10 9M8.5 6h7M8.5 18h7M10 12h4",
  celula: "M12 3l7.8 4.5v9L12 21l-7.8-4.5v-9zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  tireoide: "M12 7v10M12 9.5C10 5.5 5 5.5 5 11s5 5.5 7 2.5M12 9.5c2-4 7-4 7 1.5s-5 5.5-7 2.5",
  estomago: "M9 3v4.2C6 8.2 4 11 4 14.5a6 6 0 0 0 11 3.3c1-1.9 5-1.2 5-5.1 0-2.8-2.8-4-4.8-3-1.3.7-2.2-.2-2.2-1.8V3",
  fita: "M12 3a3 3 0 0 0-3 3c0 2.9 3 6 3 6s3-3.1 3-6a3 3 0 0 0-3-3zM12 12l-5 9M12 12l5 9M9.3 16.5h5.4",
  mascara: "M5 9.5h14l-2 7.5H7zM9 9.5V6h6v3.5M12 17v4M4 9.5 2.5 8M20 9.5 21.5 8",
  grafico: "M4 20V11M10 20V5M16 20v-7M21 20H3M4 11l6-6 6 8 5-5",
  casa: "M3 11 12 4l9 7M5.5 9.5V20h13V9.5M12 11.5v5M9.5 14h5",
  familia: "M8 10.5a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6M16.5 11.5a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6M2.5 20.5c0-4 2.5-7 5.5-7s5.5 3 5.5 7M13.5 20.5c.3-3.3 1.4-6 3-6 2.3 0 4.5 2.7 5 6",
  cabeca: "M12.5 3a7 7 0 0 0-7 7c0 2.6 1.6 3.8 1.6 5.8V21h7v-3h2.4a2 2 0 0 0 2-2v-2.5l1.9-.9-1.9-3.2A7 7 0 0 0 12.5 3zM10 9.5a2.5 2.5 0 0 1 5 0c0 1.5-1.5 2-1.5 3.3",
  balanca: "M12 3v18M7 21h10M4.5 7.5h15M7 7.5l-3 6.5a3 3 0 0 0 6 0zM17 7.5l-3 6.5a3 3 0 0 0 6 0z",
  lupa: "M10.5 17.5a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-5.5-5.5",
  frasco: "M9 3h6M10 3v6.2L5 18a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-8.8V3M7.3 15h9.4",
  escudo: "M12 3l7 3v5.5c0 4.6-3 7.9-7 9.5-4-1.6-7-4.9-7-9.5V6zM9 12l2 2 4-4",
  pulso: "M3 12h4l2.2-5.5 4 11 2.3-5.5H21",
  // pílulas
  lampada: "M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z",
  calendario: "M4 6h16v14H4zM4 10h16M8 3v5M16 3v5M8.5 14h2M13.5 14h2M8.5 17h2",
  pessoa: "M12 4a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM5 20.5c0-4 3.1-7 7-7s7 3 7 7",
  livro: "M4 5.5C6.5 4.5 9.5 4.5 12 6c2.5-1.5 5.5-1.5 8-.5v13c-2.5-1-5.5-1-8 .5-2.5-1.5-5.5-1.5-8-.5zM12 6v13",
  chave: "M8 14a4 4 0 1 1 3-6.6L20 7.5v3h-2v2h-2.5v-2H11A4 4 0 0 1 8 14zM6.5 10.5h.01",
  alerta: "M12 3.5 21.5 20h-19zM12 10v4.5M12 17.5h.01",
  chama: "M12 21c-3.9 0-6.5-2.6-6.5-6.2 0-3.4 2.3-5.4 3.6-8 .6 1.8 1.6 2.8 2.9 3.3C12 7 13.5 4.6 15.8 3c-.3 3.2 2.7 5.6 2.7 10.6 0 4.3-2.8 7.4-6.5 7.4zM12 21c-1.6 0-2.8-1.2-2.8-2.9 0-1.9 1.6-2.9 2.8-4.6 1.2 1.7 2.8 2.7 2.8 4.6 0 1.7-1.2 2.9-2.8 2.9z",
  alvo: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zM12 12h.01",
  relogio: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3.5 2",
};
/** Cor de cada grande área (tons de caneta e marca-texto). */
const COR_AREA = {
  "ciencias-basicas": "#0F766E", "clinica-medica": "#C0265F", "cirurgia": "#B45309", "pediatria": "#D97706",
  "ginecologia-obstetricia": "#A21CAF", "medicina-preventiva": "#15803D", "saude-mental": "#6D28D9", "etica-medicina-legal": "#475569",
};
const ARTE_AREA = { "ciencias-basicas": "microscopio", "clinica-medica": "estetoscopio", "cirurgia": "bisturi", "pediatria": "bebe", "ginecologia-obstetricia": "gestante", "medicina-preventiva": "casa", "saude-mental": "cabeca", "etica-medicina-legal": "balanca" };
const ARTE_ESP = {
  anatomia: "osso", fisiologia: "pulso", bioquimica: "frasco", "histologia-embriologia": "celula", genetica: "dna", imunologia: "escudo", microbiologia: "bacteria",
  parasitologia: "mosquito", patologia: "microscopio", farmacologia: "pilula", semiologia: "estetoscopio", cardiologia: "coracao", pneumologia: "pulmao",
  endocrinologia: "tireoide", nefrologia: "rim", gastroenterologia: "estomago", hematologia: "gota", reumatologia: "osso", infectologia: "virus", neurologia: "cerebro",
  dermatologia: "pele", oncologia: "fita", "medicina-de-urgencia": "ambulancia", "cirurgia-geral": "bisturi", trauma: "curativo", urologia: "rim", ortopedia: "osso",
  anestesiologia: "mascara", "pediatria-geral": "bebe", neonatologia: "bebe", ginecologia: "mulher", obstetricia: "gestante", epidemiologia: "grafico",
  "saude-publica-sus": "casa", "medicina-de-familia": "familia", psiquiatria: "cabeca", "etica-medica": "balanca", "medicina-legal": "lupa",
};
const ARTE_PIL = { curiosidade: "lampada", data: "calendario", pessoa: "pessoa", conceito: "livro", macete: "chave", pegadinha: "alerta", comparacao: "balanca" };
const COR_PIL = { curiosidade: "#D97706", data: "#0F766E", pessoa: "#6D28D9", conceito: "#2340B8", macete: "#15803D", pegadinha: "#C0265F", comparacao: "#475569" };
const areaDaEsp = id => AREAS_MED.find(a => (a.especialidades || []).some(e => e.id === id))?.id;
/** Desenho num círculo colorido. tam: p (pequeno), m, g (grande), xg (destaque). */
function ilustra(nome, cor = "#2340B8", tam = "m", rotulo = "") {
  const d = ARTE[nome]; if (!d) return "";
  return `<span class="ilu ilu-${tam}" style="--h:${cor}" ${rotulo ? `role="img" aria-label="${esc(rotulo)}"` : 'aria-hidden="true"'}><svg viewBox="0 0 24 24"><path d="${d}"/></svg></span>`;
}
const iluEsp = (id, tam = "m") => ilustra(ARTE_ESP[id] || "estetoscopio", COR_AREA[areaDaEsp(id)] || "#2340B8", tam);
const iluArea = (id, tam = "m") => ilustra(ARTE_AREA[id] || "estetoscopio", COR_AREA[id] || "#2340B8", tam);
const iluTema = (temaId, tam = "m") => { const t = TEMAS[temaId]; if (!t) return ""; if (t.dominio === "enem") return ilustra("livro", "#2340B8", tam); return iluEsp(t.especialidades?.[0], tam); };
const iluPil = (tipo, tam = "m") => ilustra(ARTE_PIL[tipo] || "lampada", COR_PIL[tipo] || "#D97706", tam);

/* ---------- Comemoração ao acertar ---------- */
const ELOGIOS = ["Isso!", "Boa!", "Na mosca!", "Mandou bem!", "Certíssimo!", "Exato!"];
const ANIMO = ["Quase! Veja o porquê abaixo.", "Faz parte: é assim que fixa.", "Errar aqui é melhor que na prova."];
const sorteio = lista => lista[Math.floor(Math.random() * lista.length)];
const semMovimento = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
/** Pequena chuva de confete a partir de um elemento (some sozinha). */
function confete(el, n = 14) {
  if (!el || semMovimento()) return;
  const r = el.getBoundingClientRect(), cores = ["#2340B8", "#1C7C4A", "#D97706", "#C0265F", "#0F766E", "#A21CAF"];
  for (let i = 0; i < n; i++) {
    const s = document.createElement("i"); s.className = "confete";
    const ang = (Math.PI * 2 * i) / n + Math.random() * .5, dist = 40 + Math.random() * 70;
    s.style.cssText = `left:${r.left + Math.min(60, r.width / 2)}px;top:${r.top + r.height / 2}px;background:${cores[i % cores.length]};--dx:${Math.cos(ang) * dist}px;--dy:${Math.sin(ang) * dist - 30}px;--rz:${Math.random() * 360}deg`;
    document.body.appendChild(s); setTimeout(() => s.remove(), 900);
  }
}
