/* Plantões – PedTudo
   Registro de plantões, horas trabalhadas, valores previstos e recebidos.
   Os dados ficam no aparelho, junto com o restante do aplicativo, e entram na cópia de segurança.

   As contas são feitas minuto a minuto. É o que resolve as horas quebradas: um plantão
   das 19h10 às 07h40 que atravessa a meia-noite de um feriado tem cada minuto classificado
   (diurno ou noturno, dia comum, fim de semana ou feriado) antes de virar dinheiro. */
window.PED = window.PED || {};
PED.plantao = (function () {
  const S = () => PED.store;
  const U = () => PED.util;
  const dois = (n) => String(n).padStart(2, '0');

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
  /** Aceita "7", "1930", "19:30", "19h30", "7h" e devolve minutos desde a meia-noite. */
  function lerHora(txt) {
    const d = String(txt || '').replace(/\D/g, '');
    if (!d.length || d.length > 4) return null;
    let h, m;
    if (d.length <= 2) { h = Number(d); m = 0; }            // "7" ou "19" valem a hora cheia
    else { h = Number(d.slice(0, d.length - 2)); m = Number(d.slice(-2)); }
    if (h > 24 || m > 59 || (h === 24 && m > 0)) return null;
    return (h === 24 ? 0 : h * 60 + m);                     // "24" é a meia-noite
  }
  const mascararHora = (v) => { const d = String(v || '').replace(/\D/g, '').slice(0, 4); return d.length <= 2 ? d : d.slice(0, d.length - 2) + ':' + d.slice(-2); };
  const fmtHoraMin = (min) => min == null ? '' : dois(Math.floor(min / 60) % 24) + ':' + dois(min % 60);

  /** Duração digitada direto, para quando não se sabe o horário: "6h40", "6:40", "6,5", "6.5h", "40min", "12". */
  function lerDuracao(txt) {
    const t = String(txt || '').trim().toLowerCase().replace(/\s+/g, '');
    if (!t) return null;
    let m;
    if ((m = t.match(/^(\d{1,3})(?:h|:)(\d{1,2})(?:m|min)?$/))) return Number(m[1]) * 60 + Math.min(59, Number(m[2]));
    if ((m = t.match(/^(\d{1,4})(?:m|min)$/))) return Number(m[1]);
    if ((m = t.match(/^(\d{1,3})(?:[.,](\d{1,2}))?h?$/))) return Math.round((Number(m[1]) + (m[2] ? Number('0.' + m[2]) : 0)) * 60);
    return null;
  }

  /** Duração em minutos, virando o dia quando o fim é menor ou igual ao início (07h às 07h são 24 h). */
  function duracaoMin(inicio, fim) {
    const a = lerHora(inicio), b = lerHora(fim);
    if (a == null || b == null) return null;
    return b > a ? b - a : (1440 - a) + b;
  }
  /** "12h30" a partir de minutos. */
  const fmtDuracao = (min) => {
    if (min == null) return '—';
    const t = Math.round(min);
    const h = Math.floor(t / 60), m = t % 60;
    if (!h && m) return m + 'min';
    return m ? h + 'h' + dois(m) : h + 'h';
  };
  const horasDecimais = (min) => min == null ? null : min / 60;
  /** "12,67 h": a forma que entra na conta do dinheiro. */
  const fmtDecimal = (min) => min == null ? '—' : (min / 60).toLocaleString('pt-BR', { maximumFractionDigits: 2 }) + ' h';

  /** Arredondamento combinado com o contratante: de 15 em 15, de 30 em 30 ou por hora cheia. */
  function arredondar(min, passo, modo) {
    const p = Number(passo) || 0;
    if (!p || min == null) return min;
    const f = modo === 'cima' ? Math.ceil : modo === 'baixo' ? Math.floor : Math.round;
    return f(min / p) * p;
  }

  /* ---------- Feriados ---------- */
  /** Domingo de Páscoa (algoritmo gregoriano anônimo). */
  function pascoa(ano) {
    const a = ano % 19, b = Math.floor(ano / 100), c = ano % 100, d = Math.floor(b / 4), e = b % 4;
    const f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
    const mes = Math.floor((h + l - 7 * m + 114) / 31), dia = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(ano, mes - 1, dia, 12);
  }
  const isoDe = (d) => d.getFullYear() + '-' + dois(d.getMonth() + 1) + '-' + dois(d.getDate());
  const somaDias = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  const cacheFeriados = {};
  /** Feriados nacionais, do Amazonas e de Manaus; pontos facultativos vêm marcados à parte. */
  function feriados(ano) {
    if (cacheFeriados[ano]) return cacheFeriados[ano];
    const f = {};
    const pôr = (mmdd, nome, tipo) => { f[ano + '-' + mmdd] = { nome, tipo }; };
    pôr('01-01', 'Confraternização Universal', 'nacional');
    pôr('04-21', 'Tiradentes', 'nacional');
    pôr('05-01', 'Dia do Trabalho', 'nacional');
    pôr('09-07', 'Independência do Brasil', 'nacional');
    pôr('10-12', 'Nossa Senhora Aparecida', 'nacional');
    pôr('11-02', 'Finados', 'nacional');
    pôr('11-15', 'Proclamação da República', 'nacional');
    pôr('11-20', 'Dia Nacional de Zumbi e da Consciência Negra', 'nacional');
    pôr('12-25', 'Natal', 'nacional');
    pôr('09-05', 'Elevação do Amazonas à categoria de Província', 'estadual');
    pôr('10-24', 'Aniversário de Manaus', 'municipal');
    pôr('12-08', 'Nossa Senhora da Conceição (Manaus)', 'municipal');
    const p = pascoa(ano);
    f[isoDe(somaDias(p, -2))] = { nome: 'Sexta-feira da Paixão', tipo: 'nacional' };
    f[isoDe(somaDias(p, -48))] = { nome: 'Carnaval (segunda-feira)', tipo: 'facultativo' };
    f[isoDe(somaDias(p, -47))] = { nome: 'Carnaval (terça-feira)', tipo: 'facultativo' };
    f[isoDe(somaDias(p, 60))] = { nome: 'Corpus Christi', tipo: 'facultativo' };
    cacheFeriados[ano] = f;
    return f;
  }
  /** O feriado de uma data, ou null. Pontos facultativos só contam quando `comFacultativos`. */
  function feriadoEm(iso, comFacultativos) {
    if (!iso || iso.length < 10) return null;
    const x = feriados(Number(iso.slice(0, 4)))[iso.slice(0, 10)] || null;
    if (!x) return null;
    return (x.tipo === 'facultativo' && !comFacultativos) ? null : x;
  }

  /* ---------- Linha do tempo de um plantão ---------- */
  const minutosDoDia = (d) => d.getHours() * 60 + d.getMinutes();
  /** Início e fim em datas absolutas; null quando o plantão não tem horário. */
  function linhaTempo(p) {
    if (!p || !p.data || p.data.length < 10) return null;
    const a = lerHora(p.inicio), dur = duracaoMin(p.inicio, p.fim);
    if (a == null || dur == null) return null;
    const ini = new Date(Number(p.data.slice(0, 4)), Number(p.data.slice(5, 7)) - 1, Number(p.data.slice(8, 10)), Math.floor(a / 60), a % 60);
    return { ini, fim: new Date(ini.getTime() + dur * 60000), dur };
  }
  const dentroJanela = (m, ini, fim) => ini <= fim ? (m >= ini && m < fim) : (m >= ini || m < fim);   // janela pode virar o dia

  /** Classifica cada minuto: noturno, fim de semana, feriado. */
  function repartir(p, l) {
    // sem data mas com horário: ainda dá para separar o noturno (numa quarta-feira qualquer, sem feriado)
    const semData = !(p.data && p.data.length >= 10);
    const tl = linhaTempo(semData ? Object.assign({}, p, { data: '2001-01-03', feriado: 'nao' }) : p);
    const noiteIni = lerHora((l && l.noturnoInicio) || '22:00'), noiteFim = lerHora((l && l.noturnoFim) || '05:00');
    const soDomingo = l && l.fdsDias === 'dom';
    const forcaFeriado = p.feriado === 'sim', semFeriado = p.feriado === 'nao';
    const out = { total: 0, noturno: 0, fds: 0, feriado: 0, feriadosNomes: [] };
    if (!tl) {
      // só a duração: dá para saber o dia, não a hora
      const dur = lerDuracao(p.duracao);
      if (dur == null || !p.data) return Object.assign(out, { total: dur || 0, semHorario: true });
      const dia = new Date(p.data + 'T12:00:00').getDay();
      const fer = forcaFeriado ? { nome: 'marcado no plantão' } : (semFeriado ? null : feriadoEm(p.data));
      out.total = dur;
      if (dia === 0 || (dia === 6 && !soDomingo)) out.fds = dur;
      if (fer) { out.feriado = dur; out.feriadosNomes.push(fer.nome); }
      out.semHorario = true;
      return out;
    }
    const nomes = new Set();
    for (let t = tl.ini.getTime(); t < tl.fim.getTime(); t += 60000) {
      const d = new Date(t);
      out.total++;
      if (dentroJanela(minutosDoDia(d), noiteIni, noiteFim)) out.noturno++;
      if (semData) continue;
      const dia = d.getDay();
      if (dia === 0 || (dia === 6 && !soDomingo)) out.fds++;
      const fer = forcaFeriado ? { nome: 'marcado no plantão' } : (semFeriado ? null : feriadoEm(isoDe(d)));
      if (fer) { out.feriado++; nomes.add(fer.nome); }
    }
    out.feriadosNomes = Array.from(nomes);
    return out;
  }

  /* ---------- Valores ---------- */
  const num = (x) => (x === '' || x == null || isNaN(Number(x))) ? null : Number(x);
  const moeda = (v) => (v == null || isNaN(v)) ? '—' : Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const pct = (v) => Number(v || 0).toLocaleString('pt-BR', { maximumFractionDigits: 2 }) + '%';

  /** Tudo o que um plantão vale, com a conta aberta. */
  function valores(p) {
    p = p || {};
    const l = p.localId ? local(p.localId) : null;
    const forma = p.forma || (l && l.forma) || 'hora';
    const rep = repartir(p, l);
    const pelosHorarios = duracaoMin(p.inicio, p.fim);
    const trabalhados = pelosHorarios != null ? pelosHorarios : lerDuracao(p.duracao);
    const intervalo = num(p.intervalo) != null ? num(p.intervalo) : (num(l && l.intervaloMin) || 0);
    const semPausa = trabalhados == null ? null : Math.max(0, trabalhados - intervalo);
    const pagos = arredondar(semPausa, l && l.arredondamento, l && l.arredModo);
    const fator = trabalhados ? (pagos / trabalhados) : 0;      // pausa e arredondamento valem para todos os minutos por igual
    const vh = num(p.valorHora) != null ? num(p.valorHora) : (num(l && l.valorHora) || 0);

    let bruto = 0, base = '';
    const adicionais = [];
    if (forma === 'fixo') {
      bruto = num(p.valorFixo) != null ? num(p.valorFixo) : (num(l && l.valorFixo) || 0);
      base = 'valor fechado do plantão';
    } else if (pagos != null) {
      bruto = vh * pagos / 60;
      base = pagos % 60 ? `${fmtDuracao(pagos)} = ${fmtDecimal(pagos)} × ${moeda(vh)}/h` : `${fmtDecimal(pagos)} × ${moeda(vh)}/h`;
      // adicionais: o noturno soma; entre fim de semana e feriado vale o maior
      const pNoite = num(l && l.noturnoPct) || 0, pFds = num(l && l.fdsPct) || 0, pFer = num(l && l.feriadoPct) || 0;
      if (pNoite && rep.noturno) {
        const m = rep.noturno * fator;
        adicionais.push({ rotulo: 'Adicional noturno', minutos: m, pct: pNoite, valor: vh * m / 60 * pNoite / 100 });
      }
      if (pFer && rep.feriado && pFer >= pFds) {
        const m = rep.feriado * fator;
        adicionais.push({ rotulo: 'Feriado' + (rep.feriadosNomes.length ? ' (' + rep.feriadosNomes.join(', ') + ')' : ''), minutos: m, pct: pFer, valor: vh * m / 60 * pFer / 100 });
        const fdsFora = Math.max(0, rep.fds - rep.feriado);          // fim de semana que não é feriado
        if (pFds && fdsFora) adicionais.push({ rotulo: 'Fim de semana', minutos: fdsFora * fator, pct: pFds, valor: vh * fdsFora * fator / 60 * pFds / 100 });
      } else if (pFds && rep.fds) {
        const m = rep.fds * fator;
        adicionais.push({ rotulo: 'Fim de semana', minutos: m, pct: pFds, valor: vh * m / 60 * pFds / 100 });
        const ferFora = Math.max(0, rep.feriado - rep.fds);
        if (pFer && ferFora) adicionais.push({ rotulo: 'Feriado' + (rep.feriadosNomes.length ? ' (' + rep.feriadosNomes.join(', ') + ')' : ''), minutos: ferFora * fator, pct: pFer, valor: vh * ferFora * fator / 60 * pFer / 100 });
      } else if (pFer && rep.feriado) {
        const m = rep.feriado * fator;
        adicionais.push({ rotulo: 'Feriado' + (rep.feriadosNomes.length ? ' (' + rep.feriadosNomes.join(', ') + ')' : ''), minutos: m, pct: pFer, valor: vh * m / 60 * pFer / 100 });
      }
    } else {
      base = 'sem horário nem duração informados';
    }
    const somaAdic = adicionais.reduce((a, x) => a + x.valor, 0);
    const acrescimo = Number(p.acrescimo || 0), desconto = Number(p.desconto || 0);
    const liquido = bruto + somaAdic + acrescimo - desconto;
    const retPct = num(l && l.retencaoPct) || 0;
    const retencao = liquido * retPct / 100;
    return {
      forma, min: trabalhados, horas: horasDecimais(trabalhados), intervalo, minPagos: pagos,
      arredondado: pagos != null && semPausa != null && pagos !== semPausa ? pagos - semPausa : 0,
      valorHora: vh, bruto, adicionais, somaAdicionais: somaAdic, acrescimo, desconto, liquido,
      retencaoPct: retPct, retencao, aposRetencao: liquido - retencao,
      valorHoraEfetivo: pagos ? liquido / (pagos / 60) : null,
      reparticao: rep, base,
    };
  }

  /** A conta inteira em linhas, para mostrar embaixo do valor. */
  function contaAberta(v) {
    const L = [];
    if (v.min != null && v.intervalo) L.push(`${fmtDuracao(v.min)} trabalhadas − ${fmtDuracao(v.intervalo)} de intervalo = ${fmtDuracao(v.min - v.intervalo)}`);
    if (v.arredondado) L.push(`arredondamento do contrato: ${v.arredondado > 0 ? '+' : '−'}${fmtDuracao(Math.abs(v.arredondado))}`);
    L.push(v.forma === 'fixo' ? `valor fechado: ${moeda(v.bruto)}` : `${v.base} = ${moeda(v.bruto)}`);
    for (const a of v.adicionais) L.push(`${a.rotulo}: ${fmtDuracao(Math.round(a.minutos))} × ${moeda(v.valorHora)}/h × ${pct(a.pct)} = ${moeda(a.valor)}`);
    if (v.acrescimo) L.push(`acréscimo: + ${moeda(v.acrescimo)}`);
    if (v.desconto) L.push(`desconto: − ${moeda(v.desconto)}`);
    if (v.retencaoPct) L.push(`retenção estimada de ${pct(v.retencaoPct)}: − ${moeda(v.retencao)} → ${moeda(v.aposRetencao)} na mão`);
    if (v.forma === 'fixo' && v.valorHoraEfetivo) L.push(`sua hora sai a ${moeda(v.valorHoraEfetivo)}`);
    return L;
  }

  /* ---------- Consultas ---------- */
  const STATUS = [
    { id: 'previsto', rotulo: 'Previsto', cor: 'gray' },
    { id: 'realizado', rotulo: 'Realizado', cor: '' },
    { id: 'faturado', rotulo: 'Faturado', cor: 'amber' },
    { id: 'pago', rotulo: 'Pago', cor: 'green' },
  ];
  const rotuloStatus = (id) => (STATUS.find(s => s.id === id) || STATUS[0]).rotulo;
  const TIPOS = [
    { id: 'normal', rotulo: 'Normal' }, { id: 'extra', rotulo: 'Extra' },
    { id: 'troca', rotulo: 'Troca' }, { id: 'cobertura', rotulo: 'Cobertura' },
  ];

  const ordenar = (a, b) => a.data.localeCompare(b.data) || String(a.inicio || '').localeCompare(String(b.inicio || ''));
  const doMes = (ano, mes) => S().where('plantoes', p => {
    if (!p.data || p.data.length < 7) return false;
    return Number(p.data.slice(0, 4)) === ano && Number(p.data.slice(5, 7)) === mes;
  }).sort(ordenar);

  /** Quanto de fato entrou: o valor recebido, quando informado, ou o previsto. */
  const recebido = (p, v) => p.status === 'pago' ? (num(p.valorPago) != null ? num(p.valorPago) : v.liquido) : 0;

  /** Resumo do mês: horas, valores por situação e quebra por local e por pessoa. */
  function resumoMes(ano, mes) {
    const ps = doMes(ano, mes);
    const r = { plantoes: ps.length, minutos: 0, minPagos: 0, previsto: 0, realizado: 0, faturado: 0, pago: 0, total: 0, aReceber: 0,
      adicionais: 0, retencao: 0, aposRetencao: 0, diferencas: [], porLocal: [], porPessoa: [], porStatus: {} };
    const mapa = new Map(), pessoas = new Map();
    for (const p of ps) {
      const v = valores(p);
      r.minutos += v.min || 0;
      r.minPagos += v.minPagos || 0;
      r.total += v.liquido;
      r.adicionais += v.somaAdicionais;
      r.retencao += v.retencao;
      r.aposRetencao += v.aposRetencao;
      const st = p.status || 'previsto';
      r.porStatus[st] = (r.porStatus[st] || 0) + v.liquido;
      r.pago += recebido(p, v);
      if (st === 'pago' && num(p.valorPago) != null && Math.abs(num(p.valorPago) - v.liquido) >= 0.01)
        r.diferencas.push({ id: p.id, data: p.data, localId: p.localId, previsto: v.liquido, recebido: num(p.valorPago), diferenca: num(p.valorPago) - v.liquido });
      const l = p.localId ? local(p.localId) : null;
      const chave = l ? l.id : 'sem';
      const atual = mapa.get(chave) || { id: chave, nome: l ? l.nome : 'Sem local', corIdx: l ? (l.corIdx || 0) : 7, minutos: 0, valor: 0, plantoes: 0, pago: 0 };
      atual.minutos += v.min || 0; atual.valor += v.liquido; atual.plantoes++; atual.pago += recebido(p, v);
      mapa.set(chave, atual);
      const quem = p.por || '';
      const dela = pessoas.get(quem) || { nome: quem, minutos: 0, valor: 0, plantoes: 0 };
      dela.minutos += v.min || 0; dela.valor += v.liquido; dela.plantoes++;
      pessoas.set(quem, dela);
    }
    ['previsto', 'realizado', 'faturado'].forEach(k => { r[k] = r.porStatus[k] || 0; });
    // o que falta receber é o que foi lançado e ainda não foi marcado como pago
    r.aReceber = ps.filter(p => (p.status || 'previsto') !== 'pago').reduce((a, p) => a + valores(p).liquido, 0);
    r.porLocal = Array.from(mapa.values()).sort((a, b) => b.valor - a.valor);
    r.porPessoa = Array.from(pessoas.values()).sort((a, b) => b.valor - a.valor);
    return r;
  }

  /** Últimos N meses, do mais antigo ao mais recente. */
  function serieMeses(n, refAno, refMes) {
    const out = [];
    let ano = refAno, mes = refMes;
    for (let i = 0; i < n; i++) {
      out.unshift(Object.assign({ ano, mes, rotulo: dois(mes) + '/' + String(ano).slice(2) }, resumoMes(ano, mes)));
      mes--; if (mes < 1) { mes = 12; ano--; }
    }
    return out;
  }

  /** Plantões futuros, para a agenda. */
  const proximos = (limite) => S().where('plantoes', p => p.data >= U().today()).sort(ordenar).slice(0, limite || 20);

  /* ---------- Conflitos e cansaço ---------- */
  /** Outros plantões que se sobrepõem a este no tempo. */
  function conflitos(p, lista) {
    const a = linhaTempo(p); if (!a) return [];
    return (lista || S().col('plantoes')).filter(o => {
      if (!o || o === p || (p.id && o.id === p.id)) return false;
      const b = linhaTempo(o); if (!b) return false;
      return a.ini < b.fim && b.ini < a.fim;
    });
  }
  /** Sequências de plantões emendados (menos de `folgaMin` entre um e outro). */
  function jornadas(lista, folgaMin) {
    const folga = (folgaMin == null ? 60 : folgaMin) * 60000;
    const itens = (lista || S().col('plantoes')).map(p => ({ p, t: linhaTempo(p) })).filter(x => x.t).sort((a, b) => a.t.ini - b.t.ini);
    const out = [];
    let atual = null;
    for (const x of itens) {
      if (atual && x.t.ini - atual.fim <= folga) {
        atual.plantoes.push(x.p);
        if (x.t.fim > atual.fim) atual.fim = x.t.fim;
      } else {
        if (atual) out.push(atual);
        atual = { ini: x.t.ini, fim: x.t.fim, plantoes: [x.p] };
      }
    }
    if (atual) out.push(atual);
    return out.map(j => Object.assign(j, { minutos: Math.round((j.fim - j.ini) / 60000) }));
  }
  /** Jornadas longas que merecem aviso: 24 h ou mais sem folga de verdade. */
  const jornadasLongas = (limiteMin, lista) => jornadas(lista).filter(j => j.plantoes.length > 1 && j.minutos >= (limiteMin || 1440));

  /* ---------- Escala ---------- */
  /** Gera os plantões de uma escala: dias da semana escolhidos, ou um a cada N dias (12x36, 24x72…). */
  function gerarEscala(cfg) {
    const out = [];
    if (!cfg || !cfg.de || !cfg.ate || cfg.ate < cfg.de) return out;
    let d = new Date(cfg.de + 'T12:00:00');
    const fim = new Date(cfg.ate + 'T12:00:00');
    let n = 0;
    while (d <= fim && out.length < 400) {
      const iso = isoDe(d);
      const entra = cfg.aCada ? (n % Number(cfg.aCada) === 0) : (cfg.dias || []).indexOf(d.getDay()) >= 0;
      if (entra) out.push({ localId: cfg.localId || '', data: iso, inicio: cfg.inicio || '', fim: cfg.fim || '', duracao: cfg.duracao || '',
        status: 'previsto', tipo: cfg.tipo || 'normal', obs: cfg.obs || '' });
      d = somaDias(d, 1); n++;
    }
    return out;
  }

  /* ---------- Pagamentos ---------- */
  /** Marca como pagos, de uma vez, os plantões de um local num mês. Devolve quantos e quanto. */
  function marcarPagos(ano, mes, localId, dataISO) {
    let n = 0, soma = 0;
    for (const p of doMes(ano, mes)) {
      if ((p.status || 'previsto') === 'pago') continue;
      if (localId && p.localId !== localId) continue;
      const v = valores(p);
      S().upsert('plantoes', Object.assign({}, p, { status: 'pago', dataPagamento: dataISO || U().today() }));
      n++; soma += v.liquido;
    }
    return { plantoes: n, valor: soma };
  }
  /** Data prevista do pagamento de um mês, pelo dia combinado com o local (no mês seguinte). */
  function previsaoPagamento(l, ano, mes) {
    const dia = num(l && l.diaPagamento);
    if (!dia) return null;
    const a = mes === 12 ? ano + 1 : ano, m = mes === 12 ? 1 : mes + 1;
    const ult = new Date(a, m, 0).getDate();
    return a + '-' + dois(m) + '-' + dois(Math.min(dia, ult));
  }

  /* ---------- Textos para mandar ---------- */
  /** Resumo em texto para conferir ou cobrar, pronto para colar no WhatsApp ou no e-mail. */
  function textoCobranca(ano, mes, localId) {
    const l = localId ? local(localId) : null;
    const ps = doMes(ano, mes).filter(p => !localId || p.localId === localId);
    const nomes = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    const semana = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
    const prof = ((S().load().prefs || {}).profissional) || {};
    const L = [`Plantões de ${nomes[mes - 1]} de ${ano}${l ? ' – ' + l.nome : ''}`];
    if (prof.nome) L.push(`${prof.tratamento ? prof.tratamento + ' ' : ''}${prof.nome}${prof.crm ? ' · ' + prof.crm : ''}`);
    L.push('');
    let min = 0, total = 0;
    for (const p of ps) {
      const v = valores(p);
      const ll = p.localId ? local(p.localId) : null;
      min += v.min || 0; total += v.liquido;
      L.push(`${U().fmtDate(p.data)} (${semana[new Date(p.data + 'T12:00:00').getDay()]}) ${p.inicio && p.fim ? p.inicio + '–' + p.fim : (p.duracao || '')} · ${fmtDuracao(v.min)}${!l && ll ? ' · ' + ll.nome : ''} · ${moeda(v.liquido)}${(p.status || 'previsto') === 'pago' ? ' (pago)' : ''}`);
    }
    L.push('');
    L.push(`Total: ${ps.length} plantão(ões), ${fmtDuracao(min)} (${fmtDecimal(min)}), ${moeda(total)}`);
    return L.join('\n');
  }

  /** Exportação para a contabilidade. */
  function csvMes(ano, mes) {
    const f2 = (x) => Number(x || 0).toFixed(2).replace('.', ',');
    const linhas = [['Data', 'Local', 'Início', 'Fim', 'Horas', 'Horas pagas', 'Forma', 'Bruto', 'Adicionais', 'Acréscimo', 'Desconto', 'Líquido', 'Retenção estimada', 'Situação', 'Pago em', 'Valor recebido', 'Tipo', 'Quem lançou', 'Observação'].join(';')];
    for (const p of doMes(ano, mes)) {
      const v = valores(p), l = p.localId ? local(p.localId) : null;
      linhas.push([U().fmtDate(p.data), l ? l.nome : '', p.inicio || '', p.fim || '',
        v.min != null ? (v.min / 60).toFixed(2).replace('.', ',') : '', v.minPagos != null ? (v.minPagos / 60).toFixed(2).replace('.', ',') : '', v.forma,
        f2(v.bruto), f2(v.somaAdicionais), f2(p.acrescimo), f2(p.desconto), f2(v.liquido), f2(v.retencao),
        rotuloStatus(p.status), p.dataPagamento ? U().fmtDate(p.dataPagamento) : '', p.valorPago != null ? f2(p.valorPago) : '',
        (TIPOS.find(t => t.id === p.tipo) || TIPOS[0]).rotulo, (p.por || '').replace(/;/g, ','), (p.obs || '').replace(/;/g, ',')].join(';'));
    }
    return linhas.join('\n');
  }

  /* Paleta categórica validada (referência de visualização), atribuída por ordem fixa. */
  const CORES = ['#2a78d6', '#eb6834', '#1baf7a', '#eda100', '#e87ba4', '#008300', '#4a3aa7', '#e34948'];
  const CORES_ESCURO = ['#3987e5', '#d95926', '#199e70', '#c98500', '#d55181', '#008300', '#9085e9', '#e66767'];
  const corLocal = (idx) => CORES[(idx || 0) % CORES.length];

  return { garantirLocais, locais, local, lerHora, lerDuracao, mascararHora, fmtHoraMin, duracaoMin, fmtDuracao, fmtDecimal, horasDecimais,
    arredondar, pascoa, feriados, feriadoEm, linhaTempo, repartir, valores, contaAberta, moeda, pct, STATUS, rotuloStatus, TIPOS,
    doMes, resumoMes, serieMeses, proximos, conflitos, jornadas, jornadasLongas, gerarEscala, marcarPagos, previsaoPagamento,
    textoCobranca, csvMes, CORES, CORES_ESCURO, corLocal, isoDe };
})();
