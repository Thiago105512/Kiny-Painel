/* Utilitários gerais – Mucurinha */
window.PED = window.PED || {};
PED.util = (function () {
  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const fmt = (n, dec) => {
    if (n == null || isNaN(n)) return '—';
    const d = dec == null ? (Math.abs(n) < 1 ? 2 : Math.abs(n) < 10 ? 2 : 1) : dec;
    return Number(n).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: d });
  };

  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

  const today = () => new Date().toISOString().slice(0, 10);

  const fmtDate = (iso) => {
    if (!iso) return '—';
    const d = new Date(iso.length === 10 ? iso + 'T12:00:00' : iso);
    if (isNaN(d)) return iso;
    return d.toLocaleDateString('pt-BR');
  };
  const fmtDateTime = (iso) => {
    if (!iso) return '—';
    const d = new Date(iso);
    if (isNaN(d)) return iso;
    return d.toLocaleDateString('pt-BR') + ' ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  /** Idade calculada a partir da data de nascimento. Retorna {anos, meses, dias, totalMeses, totalDias, texto} */
  function idade(dataNasc, ref) {
    if (!dataNasc) return null;
    const n = new Date(dataNasc + 'T00:00:00');
    const r = ref ? new Date(ref) : new Date();
    if (isNaN(n) || n > r) return null;
    let anos = r.getFullYear() - n.getFullYear();
    let meses = r.getMonth() - n.getMonth();
    let dias = r.getDate() - n.getDate();
    if (dias < 0) { meses -= 1; dias += new Date(r.getFullYear(), r.getMonth(), 0).getDate(); }
    if (meses < 0) { anos -= 1; meses += 12; }
    const totalDias = Math.floor((r - n) / 86400000);
    const totalMeses = anos * 12 + meses + dias / 30.44;
    let texto;
    if (totalDias < 60) texto = `${totalDias} dia${totalDias === 1 ? '' : 's'}`;
    else if (anos < 2) texto = `${anos * 12 + meses} meses${dias ? ' e ' + dias + ' d' : ''}`;
    else texto = `${anos} ano${anos === 1 ? '' : 's'}${meses ? ' e ' + meses + ' m' : ''}`;
    return { anos, meses, dias, totalMeses, totalDias, texto };
  }

  /** Faixa etária clínica */
  function faixaEtaria(totalMeses) {
    if (totalMeses == null) return null;
    if (totalMeses < 1) return 'Recém-nascido';
    if (totalMeses < 24) return 'Lactente';
    if (totalMeses < 72) return 'Pré-escolar';
    if (totalMeses < 144) return 'Escolar';
    return 'Adolescente';
  }

  /** IMC */
  const imc = (pesoKg, alturaCm) => (pesoKg > 0 && alturaCm > 0) ? pesoKg / Math.pow(alturaCm / 100, 2) : null;

  /** Superfície corporal – Mosteller */
  const scMosteller = (pesoKg, alturaCm) => (pesoKg > 0 && alturaCm > 0) ? Math.sqrt((pesoKg * alturaCm) / 3600) : null;

  /** Peso estimado por idade (regras práticas – apenas quando peso real indisponível) */
  function pesoEstimado(totalMeses) {
    if (totalMeses == null) return null;
    const anos = totalMeses / 12;
    if (totalMeses < 12) return (totalMeses + 9) / 2;       // lactentes (aprox.)
    if (anos <= 5) return 2 * anos + 8;                     // 1–5 anos (APLS)
    if (anos <= 14) return 4 * anos;                        // 6–14 anos (aprox.)
    return null;
  }

  function debounce(fn, ms) { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; }

  const normalize = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  function toast(msg) {
    const el = document.createElement('div');
    el.className = 'toast'; el.textContent = msg; document.body.appendChild(el);
    setTimeout(() => el.remove(), 2400);
  }

  const list = (arr, cls) => (arr && arr.length) ? `<ul${cls ? ' class="' + cls + '"' : ''}>${arr.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : '<p class="muted">—</p>';

  const fontes = (obj) => {
    if (!obj) return '';
    const f = (obj.fontes || []).map(x => typeof x === 'string' ? x : `${x.nome}${x.ano ? ' (' + x.ano + ')' : ''}`).join('; ');
    return `<div class="source">Fontes: ${esc(f || 'não informada')} · Atualizado em ${esc(obj.atualizadoEm || '—')}${obj.verificar ? ' · <span class="chip amber">verificar</span>' : ''}</div>`;
  };

  return { esc, fmt, uid, today, fmtDate, fmtDateTime, idade, faixaEtaria, imc, scMosteller, pesoEstimado, debounce, normalize, toast, list, fontes };
})();
