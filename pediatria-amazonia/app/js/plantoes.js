/* Plantões – Mucurinha
   Registro de plantões, horas trabalhadas, valores previstos e recebidos.
   Os dados ficam no aparelho, junto com o restante do aplicativo, e entram na cópia de segurança. */
window.PED = window.PED || {};
PED.plantao = (function () {
  const S = () => PED.store;
  const U = () => PED.util;

  /* ---------- Locais de trabalho ---------- */
  const PADRAO = [
    { nome: 'Hapvida', forma: 'hora', valorHora: null, valorFixo: null, cargaHoras: 12, diaPagamento: null, obs: '' },
    { nome: 'CardioBaby', forma: 'hora', valorHora: null, valorFixo: null, cargaHoras: 6, diaPagamento: null, obs: '' },
  ];
  /** Cria os locais iniciais na primeira vez que a aba é aberta. */
  function garantirLocais() {
    const c = S().col('locaisTrabalho');
    if (c.length) return c;
    PADRAO.forEach((l, i) => S().upsert('locaisTrabalho', Object.assign({ corIdx: i }, l)));
    return S().col('locaisTrabalho');
  }
  const locais = () => S().col('locaisTrabalho');
  const local = (id) => S().byId('locaisTrabalho', id);

  /* ---------- Horas ---------- */
  /** Aceita "1930", "19:30", "19h30" e devolve minutos desde a meia-noite. */
  function lerHora(txt) {
    const d = String(txt || '').replace(/\D/g, '');
    if (!d.length || d.length > 4) return null;
    let h, m;
    if (d.length <= 2) { h = Number(d); m = 0; }            // "7" ou "19" valem a hora cheia
    else { h = Number(d.slice(0, d.length - 2)); m = Number(d.slice(-2)); }
    if (h > 23 || m > 59) return null;
    return h * 60 + m;
  }
  const mascararHora = (v) => { const d = String(v || '').replace(/\D/g, '').slice(0, 4); return d.length <= 2 ? d : d.slice(0, d.length - 2) + ':' + d.slice(-2); };
  const fmtHoraMin = (min) => min == null ? '' : String(Math.floor(min / 60)).padStart(2, '0') + ':' + String(min % 60).padStart(2, '0');

  /** Duração em minutos, virando o dia quando o fim é menor que o início. */
  function duracaoMin(inicio, fim) {
    const a = lerHora(inicio), b = lerHora(fim);
    if (a == null || b == null) return null;
    return b > a ? b - a : (1440 - a) + b;          // plantão noturno atravessa a meia-noite
  }
  /** "12h30" a partir de minutos. */
  const fmtDuracao = (min) => {
    if (min == null) return '—';
    const h = Math.floor(min / 60), m = min % 60;
    return m ? h + 'h' + String(m).padStart(2, '0') : h + 'h';
  };
  const horasDecimais = (min) => min == null ? null : min / 60;

  /* ---------- Valores ---------- */
  /** Valor bruto, acréscimos e descontos de um plantão. */
  function valores(p) {
    const l = p.localId ? local(p.localId) : null;
    const forma = p.forma || (l && l.forma) || 'hora';
    const min = duracaoMin(p.inicio, p.fim);
    const horas = horasDecimais(min);
    let bruto = 0, base = '';
    if (forma === 'fixo') {
      bruto = Number(p.valorFixo != null && p.valorFixo !== '' ? p.valorFixo : (l && l.valorFixo) || 0);
      base = 'valor fechado do plantão';
    } else {
      const vh = Number(p.valorHora != null && p.valorHora !== '' ? p.valorHora : (l && l.valorHora) || 0);
      bruto = horas != null ? vh * horas : 0;
      base = horas != null ? `${fmtDuracao(min)} × ${moeda(vh)}/h` : 'sem horário informado';
    }
    const acrescimo = Number(p.acrescimo || 0), desconto = Number(p.desconto || 0);
    const liquido = bruto + acrescimo - desconto;
    return { forma, min, horas, bruto, acrescimo, desconto, liquido, base };
  }
  const moeda = (v) => (v == null || isNaN(v)) ? '—' : Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  /* ---------- Consultas ---------- */
  const STATUS = [
    { id: 'previsto', rotulo: 'Previsto', cor: 'gray' },
    { id: 'realizado', rotulo: 'Realizado', cor: '' },
    { id: 'faturado', rotulo: 'Faturado', cor: 'amber' },
    { id: 'pago', rotulo: 'Pago', cor: 'green' },
  ];
  const rotuloStatus = (id) => (STATUS.find(s => s.id === id) || STATUS[0]).rotulo;

  const doMes = (ano, mes) => S().where('plantoes', p => {
    if (!p.data || p.data.length < 7) return false;
    return Number(p.data.slice(0, 4)) === ano && Number(p.data.slice(5, 7)) === mes;
  }).sort((a, b) => a.data.localeCompare(b.data) || String(a.inicio).localeCompare(String(b.inicio)));

  /** Resumo do mês: horas, valores por situação e quebra por local. */
  function resumoMes(ano, mes) {
    const ps = doMes(ano, mes);
    const r = { plantoes: ps.length, minutos: 0, previsto: 0, realizado: 0, faturado: 0, pago: 0, total: 0, aReceber: 0, porLocal: [], porStatus: {} };
    const mapa = new Map();
    for (const p of ps) {
      const v = valores(p);
      r.minutos += v.min || 0;
      r.total += v.liquido;
      r[p.status || 'previsto'] = (r[p.status || 'previsto'] || 0) + v.liquido;
      r.porStatus[p.status || 'previsto'] = (r.porStatus[p.status || 'previsto'] || 0) + v.liquido;
      const l = p.localId ? local(p.localId) : null;
      const chave = l ? l.id : 'sem';
      const atual = mapa.get(chave) || { id: chave, nome: l ? l.nome : 'Sem local', corIdx: l ? (l.corIdx || 0) : 7, minutos: 0, valor: 0, plantoes: 0 };
      atual.minutos += v.min || 0; atual.valor += v.liquido; atual.plantoes++;
      mapa.set(chave, atual);
    }
    r.pago = r.porStatus.pago || 0;
    r.aReceber = r.total - r.pago;
    r.porLocal = Array.from(mapa.values()).sort((a, b) => b.valor - a.valor);
    return r;
  }

  /** Últimos N meses, do mais antigo ao mais recente. */
  function serieMeses(n, refAno, refMes) {
    const out = [];
    let ano = refAno, mes = refMes;
    for (let i = 0; i < n; i++) {
      out.unshift(Object.assign({ ano, mes, rotulo: String(mes).padStart(2, '0') + '/' + String(ano).slice(2) }, resumoMes(ano, mes)));
      mes--; if (mes < 1) { mes = 12; ano--; }
    }
    return out;
  }

  /** Plantões futuros, para a agenda. */
  const proximos = (limite) => S().where('plantoes', p => p.data >= U().today())
    .sort((a, b) => a.data.localeCompare(b.data) || String(a.inicio).localeCompare(String(b.inicio)))
    .slice(0, limite || 20);

  /** Exportação para a contabilidade. */
  function csvMes(ano, mes) {
    const linhas = [['Data', 'Local', 'Início', 'Fim', 'Horas', 'Forma', 'Bruto', 'Acréscimo', 'Desconto', 'Líquido', 'Situação', 'Pago em', 'Observação'].join(';')];
    for (const p of doMes(ano, mes)) {
      const v = valores(p), l = p.localId ? local(p.localId) : null;
      linhas.push([PED.util.fmtDate(p.data), l ? l.nome : '', p.inicio || '', p.fim || '',
        v.min != null ? (v.horas).toFixed(2).replace('.', ',') : '', v.forma,
        v.bruto.toFixed(2).replace('.', ','), Number(p.acrescimo || 0).toFixed(2).replace('.', ','),
        Number(p.desconto || 0).toFixed(2).replace('.', ','), v.liquido.toFixed(2).replace('.', ','),
        rotuloStatus(p.status), p.dataPagamento ? PED.util.fmtDate(p.dataPagamento) : '', (p.obs || '').replace(/;/g, ',')].join(';'));
    }
    return linhas.join('\n');
  }

  /* Paleta categórica validada (referência de visualização), atribuída por ordem fixa. */
  const CORES = ['#2a78d6', '#eb6834', '#1baf7a', '#eda100', '#e87ba4', '#008300', '#4a3aa7', '#e34948'];
  const CORES_ESCURO = ['#3987e5', '#d95926', '#199e70', '#c98500', '#d55181', '#008300', '#9085e9', '#e66767'];
  const corLocal = (idx) => CORES[(idx || 0) % CORES.length];

  return { garantirLocais, locais, local, lerHora, mascararHora, fmtHoraMin, duracaoMin, fmtDuracao, horasDecimais,
    valores, moeda, STATUS, rotuloStatus, doMes, resumoMes, serieMeses, proximos, csvMes, CORES, CORES_ESCURO, corLocal };
})();
