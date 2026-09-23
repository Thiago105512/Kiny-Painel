/* Agenda – Mucurinha
   Leva os plantões para o calendário do Google (a agenda do Gmail) e traz de volta
   os compromissos do mês, para que o planner mostre tudo no mesmo lugar.

   Dois caminhos, porque nem sempre há internet ou vontade de configurar nada:
   1. Arquivo .ics — funciona em qualquer lugar, sem conta e sem configuração.
      Serve para o Google Agenda, o Apple Calendário e o Outlook.
   2. Ligação direta com o Google — cria e atualiza os eventos sozinha, e também
      mostra no calendário os compromissos que já existem na agenda.

   O caminho 2 precisa de um ID de cliente OAuth e só funciona quando o aplicativo
   é aberto de um endereço autorizado (o Firebase Hosting, por exemplo): o Google
   recusa origens que não conhece, e o visualizador do claude.ai bloqueia a rede. */
window.PED = window.PED || {};
PED.agenda = (function () {
  const S = () => PED.store;
  const PL = () => PED.plantao;
  const FUSO = 'America/Manaus';
  const API = 'https://www.googleapis.com/calendar/v3';
  const ESCOPO = 'https://www.googleapis.com/auth/calendar';

  let token = null, expiraEm = 0, gis = null;

  /* ---------- Configuração ---------- */
  const cfg = () => S().pref('google') || {};
  const clientId = () => (cfg().clientId || '').trim();
  const configurado = () => !!clientId();
  const calendarioId = () => cfg().calendarId || 'primary';
  function salvarConfig(c) { S().pref('google', Object.assign({}, cfg(), c)); token = null; }
  function limparConfig() { S().pref('google', null); S().pref('googleEventos', null); token = null; expiraEm = 0; }
  const ligado = () => !!token && Date.now() < expiraEm;
  const getEstado = () => ({ configurado: configurado(), ligado: ligado(), calendarId: calendarioId(), nomeCalendario: cfg().calendarNome || '' });

  /** Mapa plantão → evento criado por nós, para atualizar em vez de duplicar. */
  const mapa = () => S().pref('googleEventos') || {};
  function lembrar(plantaoId, calendarId, eventId) {
    const m = mapa(); m[plantaoId] = { calendarId, eventId }; S().pref('googleEventos', m);
  }
  function esquecer(plantaoId) { const m = mapa(); delete m[plantaoId]; S().pref('googleEventos', m); }

  /* ---------- Texto dos eventos ---------- */
  const dois = (n) => String(n).padStart(2, '0');
  /** Data e hora locais a partir do plantão; o fim vira o dia seguinte quando atravessa a meia-noite. */
  function janela(p) {
    const min = PL().duracaoMin(p.inicio, p.fim);
    if (min == null) return { diaInteiro: true, inicio: p.data, fim: proximoDia(p.data) };
    const ini = PL().lerHora(p.inicio);
    const fimMin = ini + min;
    const viraDia = fimMin >= 1440;
    return {
      diaInteiro: false,
      inicio: p.data + 'T' + dois(Math.floor(ini / 60)) + ':' + dois(ini % 60) + ':00',
      fim: (viraDia ? proximoDia(p.data) : p.data) + 'T' + dois(Math.floor((fimMin % 1440) / 60)) + ':' + dois(fimMin % 60) + ':00',
    };
  }
  function proximoDia(iso) {
    const d = new Date(iso + 'T12:00:00');
    d.setDate(d.getDate() + 1);
    return d.getFullYear() + '-' + dois(d.getMonth() + 1) + '-' + dois(d.getDate());
  }
  function titulo(p) {
    const l = p.localId ? PL().local(p.localId) : null;
    return 'Plantão' + (l ? ' · ' + l.nome : '');
  }
  function descricao(p) {
    const v = PL().valores(p);
    const linhas = [];
    if (v.min != null) linhas.push('Duração: ' + PL().fmtDuracao(v.min));
    linhas.push('Valor: ' + PL().moeda(v.liquido) + (v.base ? ' (' + v.base + ')' : ''));
    linhas.push('Situação: ' + PL().rotuloStatus(p.status));
    if (p.por) linhas.push('Lançado por: ' + p.por);
    if (p.obs) linhas.push(p.obs);
    linhas.push('— Mucurinha');
    return linhas.join('\n');
  }

  /* ---------- Arquivo .ics (sem conta, funciona em qualquer agenda) ---------- */
  const escapar = (s) => String(s || '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
  /** Dobra as linhas em 75 octetos, como pede o RFC 5545. */
  function dobrar(linha) {
    if (linha.length <= 75) return linha;
    const partes = [linha.slice(0, 75)];
    let resto = linha.slice(75);
    while (resto.length > 74) { partes.push(' ' + resto.slice(0, 74)); resto = resto.slice(74); }
    if (resto.length) partes.push(' ' + resto);
    return partes.join('\r\n');
  }
  const semTraco = (s) => String(s).replace(/[-:]/g, '');
  const agoraUTC = () => new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z');

  /** Calendário .ics com os plantões recebidos. */
  function ics(plantoes) {
    const L = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Mucurinha//Plantoes//PT-BR', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
      'X-WR-CALNAME:Plantões (Mucurinha)', 'X-WR-TIMEZONE:' + FUSO,
      'BEGIN:VTIMEZONE', 'TZID:' + FUSO, 'BEGIN:STANDARD', 'DTSTART:19700101T000000',
      'TZOFFSETFROM:-0400', 'TZOFFSETTO:-0400', 'TZNAME:-04', 'END:STANDARD', 'END:VTIMEZONE'];
    for (const p of plantoes) {
      if (!p || !p.data) continue;
      const j = janela(p);
      const l = p.localId ? PL().local(p.localId) : null;
      L.push('BEGIN:VEVENT');
      L.push('UID:plantao-' + p.id + '@mucurinha');
      L.push('DTSTAMP:' + agoraUTC());
      if (j.diaInteiro) {
        L.push('DTSTART;VALUE=DATE:' + semTraco(j.inicio));
        L.push('DTEND;VALUE=DATE:' + semTraco(j.fim));
      } else {
        L.push('DTSTART;TZID=' + FUSO + ':' + semTraco(j.inicio));
        L.push('DTEND;TZID=' + FUSO + ':' + semTraco(j.fim));
      }
      L.push('SUMMARY:' + escapar(titulo(p)));
      L.push('DESCRIPTION:' + escapar(descricao(p)));
      if (l) L.push('LOCATION:' + escapar(l.nome));
      if (p.atualizadoEm) L.push('LAST-MODIFIED:' + semTraco(p.atualizadoEm).replace(/\.\d+Z$/, 'Z'));
      L.push('END:VEVENT');
    }
    L.push('END:VCALENDAR');
    return L.map(dobrar).join('\r\n');
  }
  const icsMes = (ano, mes) => ics(PL().doMes(ano, mes));
  const icsFuturos = () => ics(PL().proximos(200));

  /* ---------- Ligação direta com o Google ---------- */
  function carregarGIS() {
    if (gis) return gis;
    gis = new Promise((ok, falha) => {
      if (typeof window === 'undefined' || !window.document) { falha(new Error('sem navegador')); return; }
      if (window.google && window.google.accounts) { ok(window.google); return; }
      const s = document.createElement('script');
      s.src = 'https://accounts.google.com/gsi/client';
      s.async = true;
      s.onload = () => ok(window.google);
      s.onerror = () => { gis = null; falha(new Error('Failed to fetch')); };
      document.head.appendChild(s);
    });
    return gis;
  }

  /** Pede autorização ao Google. `silencioso` tenta renovar sem mostrar tela. */
  async function entrar(silencioso) {
    if (!configurado()) throw new Error('Informe o ID de cliente do Google antes de conectar.');
    const g = await carregarGIS();
    return new Promise((ok, falha) => {
      const cliente = g.accounts.oauth2.initTokenClient({
        client_id: clientId(),
        scope: ESCOPO,
        callback: (r) => {
          if (r && r.access_token) {
            token = r.access_token;
            expiraEm = Date.now() + ((Number(r.expires_in) || 3600) - 60) * 1000;
            ok(true);
          } else falha(new Error((r && r.error) || 'autorização negada'));
        },
        error_callback: (e) => falha(new Error((e && (e.type || e.message)) || 'autorização cancelada')),
      });
      cliente.requestAccessToken({ prompt: silencioso ? '' : 'consent' });
    });
  }
  function sair() { token = null; expiraEm = 0; }

  async function chamar(caminho, opcoes) {
    if (!ligado()) await entrar(true);
    const o = Object.assign({ method: 'GET' }, opcoes || {});
    o.headers = Object.assign({ Authorization: 'Bearer ' + token }, o.headers || {});
    if (o.corpo !== undefined) { o.headers['Content-Type'] = 'application/json'; o.body = JSON.stringify(o.corpo); delete o.corpo; }
    const r = await fetch(API + caminho, o);
    if (r.status === 204) return {};
    const j = await r.json().catch(() => ({}));
    if (!r.ok) {
      const e = new Error((j.error && (j.error.message || j.error.status)) || ('HTTP ' + r.status));
      e.status = r.status;
      throw e;
    }
    return j;
  }

  /** Agendas disponíveis na conta, para escolher onde gravar. */
  async function calendarios() {
    const r = await chamar('/users/me/calendarList?minAccessRole=writer&maxResults=50');
    return (r.items || []).map(c => ({ id: c.id, nome: c.summary, principal: !!c.primary }));
  }

  const corpoEvento = (p) => {
    const j = janela(p);
    const l = p.localId ? PL().local(p.localId) : null;
    return {
      summary: titulo(p),
      description: descricao(p),
      location: l ? l.nome : undefined,
      start: j.diaInteiro ? { date: j.inicio } : { dateTime: j.inicio, timeZone: FUSO },
      end: j.diaInteiro ? { date: j.fim } : { dateTime: j.fim, timeZone: FUSO },
      extendedProperties: { private: { mucurinha: p.id } },
    };
  };

  /** Manda os plantões do mês para a agenda: cria, atualiza e apaga o que foi excluído aqui. */
  async function enviarMes(ano, mes) {
    const cal = calendarioId();
    const ps = PL().doMes(ano, mes);
    const conta = { criados: 0, atualizados: 0, removidos: 0 };
    for (const p of ps) {
      const ref = mapa()[p.id];
      if (ref && ref.eventId) {
        try {
          await chamar('/calendars/' + encodeURIComponent(ref.calendarId) + '/events/' + encodeURIComponent(ref.eventId),
            { method: 'PATCH', corpo: corpoEvento(p) });
          conta.atualizados++;
          continue;
        } catch (e) {
          if (e.status !== 404 && e.status !== 410) throw e;
          esquecer(p.id);                     // o evento foi apagado no Google: cria de novo
        }
      }
      const novo = await chamar('/calendars/' + encodeURIComponent(cal) + '/events', { method: 'POST', corpo: corpoEvento(p) });
      lembrar(p.id, cal, novo.id);
      conta.criados++;
    }
    // plantões apagados aqui saem também de lá
    const vivos = new Set(S().col('plantoes').map(x => x.id));
    for (const [id, ref] of Object.entries(mapa())) {
      if (vivos.has(id) || !ref || !ref.eventId) continue;
      try { await chamar('/calendars/' + encodeURIComponent(ref.calendarId) + '/events/' + encodeURIComponent(ref.eventId), { method: 'DELETE' }); conta.removidos++; }
      catch (e) { if (e.status !== 404 && e.status !== 410) throw e; }
      esquecer(id);
    }
    S().pref('googleUltimoEnvio', new Date().toISOString());
    return conta;
  }

  /** Compromissos do mês que não são plantões lançados aqui, para aparecerem no calendário. */
  async function compromissosDoMes(ano, mes) {
    const ini = ano + '-' + dois(mes) + '-01T00:00:00-04:00';
    const fimData = new Date(ano, mes, 0).getDate();
    const fim = ano + '-' + dois(mes) + '-' + dois(fimData) + 'T23:59:59-04:00';
    const r = await chamar('/calendars/' + encodeURIComponent(calendarioId()) + '/events?singleEvents=true&orderBy=startTime&maxResults=250'
      + '&timeMin=' + encodeURIComponent(ini) + '&timeMax=' + encodeURIComponent(fim));
    return (r.items || [])
      .filter(ev => !((ev.extendedProperties || {}).private || {}).mucurinha)      // o que veio daqui já está no calendário
      .map(ev => ({
        id: ev.id,
        titulo: ev.summary || '(sem título)',
        data: ((ev.start || {}).dateTime || (ev.start || {}).date || '').slice(0, 10),
        hora: (ev.start || {}).dateTime ? ev.start.dateTime.slice(11, 16) : '',
        diaInteiro: !(ev.start || {}).dateTime,
        local: ev.location || '',
      }))
      .filter(x => x.data);
  }

  function mensagemErro(e) {
    const m = String((e && (e.message || e.code)) || e);
    if (/Failed to fetch|NetworkError|ERR_/i.test(m))
      return 'Não foi possível falar com o Google a partir daqui. No visualizador do claude.ai a rede é bloqueada: use o aplicativo publicado no seu endereço do Firebase Hosting.';
    if (/idpiframe|origin|redirect_uri|invalid_client/i.test(m))
      return 'O Google recusou este endereço. No console do Google Cloud, inclua o endereço do aplicativo nas origens JavaScript autorizadas do ID de cliente.';
    if (/popup_closed|cancel|denied|access_denied/i.test(m)) return 'Autorização cancelada.';
    if (/insufficient|403/i.test(m)) return 'A conta não autorizou o acesso à agenda. Refaça a autorização marcando a permissão do Google Agenda.';
    return 'Não foi possível usar a agenda do Google: ' + m;
  }

  return { configurado, getEstado, salvarConfig, limparConfig, cfg, calendarioId, entrar, sair, ligado,
    calendarios, enviarMes, compromissosDoMes, ics, icsMes, icsFuturos, janela, titulo, descricao,
    mapa, esquecer, mensagemErro, FUSO };
})();
