/* ============================================================
   32-humor — "Pausa para rir": uma piada por vez, discreta, da área
   do objetivo do perfil (por enquanto Medicina e Residência).
   Pode ser desligada no perfil. Guarda o que já foi visto para não repetir.
   ============================================================ */
const HUMOR = DADOS.humor || [];
const HUM = { id: null };
const humorLigado = () => store.doc("perfil").humor !== false;
function humorDoObjetivo() {
  const o = objetivo(), dom = !o || o === "medicina" || o === "residencia" ? "medicina" : o === "oab" ? "direito" : o;
  return HUMOR.filter(h => h.dominio === dom);
}
/** Escolhe uma piada ainda não vista (ou a vista há mais tempo). */
function escolherPiada(trocar = false) {
  const pool = humorDoObjetivo(); if (!pool.length) return null;
  if (!trocar && HUM.id && pool.some(h => h.id === HUM.id)) return pool.find(h => h.id === HUM.id);
  const v = store.doc("humor").v, novas = pool.filter(h => !v[h.id] && h.id !== HUM.id);
  const base = novas.length ? novas : pool.slice().sort((a, b) => (v[a.id]?.[0] || 0) - (v[b.id]?.[0] || 0)).slice(0, Math.max(1, Math.ceil(pool.length / 3)));
  const h = base[Math.floor(Math.random() * base.length)]; HUM.id = h.id; return h;
}
function marcarVista(id, reacao) { const H = store.doc("humor"); H.v[id] = [Date.now(), reacao]; store.mudou("humor"); }
/** Cartão discreto. */
function cardHumor() {
  if (!humorLigado()) return "";
  const h = escolherPiada(); if (!h) return "";
  return `<section class="humor com-ilu" aria-label="Pausa para rir">${ilustra("sorriso", "#D97706", "m")}<div>
    <span class="lab">Pausa para rir</span><p class="humor-txt">${esc(h.texto)}</p>
    <div class="linha"><button class="btn mini sec" data-act="hum-ri" data-id="${esc(h.id)}">Ri</button><button class="btn mini sec" data-act="hum-outra" data-id="${esc(h.id)}">Outra</button><button class="btn mini sec" data-act="hum-off">Esconder</button></div></div></section>`;
}
ACOES["hum-ri"] = el => { marcarVista(el.dataset.id, 1); escolherPiada(true); toast("Boa! Guardei que você riu dessa"); atualizar(); };
ACOES["hum-outra"] = el => { marcarVista(el.dataset.id, 0); escolherPiada(true); atualizar(); };
ACOES["hum-off"] = () => { const P = store.doc("perfil"); P.humor = false; store.mudou("perfil"); toast("Piadas escondidas. Para voltar: Perfil → Mostrar piadas"); atualizar(); };
