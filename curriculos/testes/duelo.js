// Teste de navegador (Playwright): Duelo ao vivo (#/duelo).
// A sala ao vivo (capability "room") é simulada por um addInitScript: um room falso que compartilha a PRESENÇA
// entre as páginas do mesmo contexto por BroadcastChannel e entrega onPeers como o contrato
// (peers/joined/left/updated, sameTab, objetos congelados; emit é recusado como para quem não é admin).
// Cobre: criar, entrar com código, começar sincronizado, mesmas questões e mesma ordem, placar ao vivo,
// fim com pódio, saída de um jogador, fantasma sem sala, dados maliciosos (ids inexistentes, strings enormes, HTML)
// e encaixe a 360/390 px com letra 1 e 1,7.
// Rode na raiz:   python3 -m http.server 8765 &   e   node curriculos/testes/duelo.js
// SHOTS=<pasta> grava capturas 390x844 (sala de espera, jogo com placar, pódio, fantasma).
const { chromium } = require('playwright');
const URL = process.env.APP_URL || 'http://localhost:8765/curriculos/app.html';
const SHOTS = process.env.SHOTS;
let falhas = 0; const ok = (c, m) => { console.log((c ? '  ✓ ' : '  ✗ ') + m); if (!c) falhas++; };

/* ---------- Room falso (roda dentro de cada página, antes do app) ---------- */
function salaFalsa() {
  const me = 'p' + Math.random().toString(36).slice(2, 10), bc = new BroadcastChannel('sala-fake-duelo');
  const dados = new Map([[me, { presence: Object.freeze({}), updatedAt: Date.now() }]]), cache = new Map();
  const ouvintes = []; let pend = { joined: new Map(), left: new Map(), updated: new Map() }, agendado = false, snap = Object.freeze([]);
  const peerDe = id => { const d = dados.get(id), c = cache.get(id); if (c && c.presence === d.presence) return c;
    const p = Object.freeze({ peer: id, by: null, isMe: id === me, sameTab: id === me, kind: 'viewer', guest: id !== me, presence: d.presence, updatedAt: d.updatedAt }); cache.set(id, p); return p; };
  const refazer = () => { snap = Object.freeze([...dados.keys()].map(peerDe)); };
  refazer();
  function marcar(tipo, id, antigo) {
    if (tipo === 'left') { if (pend.joined.has(id)) pend.joined.delete(id); else pend.left.set(id, antigo); pend.updated.delete(id); }
    else if (tipo === 'joined') pend.joined.set(id, 1); else if (!pend.joined.has(id)) pend.updated.set(id, 1);
    refazer(); agendar();
  }
  function agendar() { if (agendado) return; agendado = true; setTimeout(() => { agendado = false; entregar(); }, 16); }
  function entregar() {
    const ch = { peers: snap, joined: Object.freeze([...pend.joined.keys()].filter(k => dados.has(k)).map(peerDe)), left: Object.freeze([...pend.left.values()]), updated: Object.freeze([...pend.updated.keys()].filter(k => dados.has(k)).map(peerDe)) };
    pend = { joined: new Map(), left: new Map(), updated: new Map() };
    for (const o of ouvintes) { if (!o.ativo) continue; if (!o.primeira) { o.primeira = true; o.h({ peers: snap, joined: snap, left: Object.freeze([]), updated: Object.freeze([]) }); } else if (ch.joined.length || ch.left.length || ch.updated.length) o.h(ch); }
  }
  bc.onmessage = ({ data: m }) => {
    if (!m || m.from === me) return;
    if (m.t === 'hello') { bc.postMessage({ t: 'p', from: me, presence: dados.get(me).presence }); if (!dados.has(m.from)) { dados.set(m.from, { presence: Object.freeze({}), updatedAt: Date.now() }); marcar('joined', m.from); } }
    else if (m.t === 'p') { const novo = !dados.has(m.from); dados.set(m.from, { presence: Object.freeze(m.presence || {}), updatedAt: Date.now() }); marcar(novo ? 'joined' : 'updated', m.from); }
    else if (m.t === 'bye') { if (dados.has(m.from)) { const antigo = peerDe(m.from); dados.delete(m.from); cache.delete(m.from); marcar('left', m.from, antigo); } }
  };
  bc.postMessage({ t: 'hello', from: me });
  const room = {
    presence(patch) {
      if (!patch || typeof patch !== 'object') return Promise.reject({ code: 'invalid_argument', message: 'patch' });
      const novo = { ...dados.get(me).presence };
      for (const [k, v] of Object.entries(patch)) { if (v === null) delete novo[k]; else novo[k] = v; }
      const txt = JSON.stringify(novo);
      if (new TextEncoder().encode(txt).length > 4096) return Promise.reject({ code: 'invalid_argument', message: 'presença maior que 4 KiB' });
      if (Object.values(novo).some(v => typeof v === 'string' && v.length > 1024)) return Promise.reject({ code: 'invalid_argument', message: 'string > 1 KiB' });
      dados.set(me, { presence: Object.freeze(JSON.parse(txt)), updatedAt: Date.now() }); marcar('updated', me);
      bc.postMessage({ t: 'p', from: me, presence: JSON.parse(txt) });
      return Promise.resolve();
    },
    peers: () => snap,
    onPeers(h) { const o = { h, ativo: true, primeira: false }; ouvintes.push(o); queueMicrotask(agendar); return () => { o.ativo = false; }; },
    emit: () => Promise.reject({ code: 'not_permitted', message: 'tópico só de admin' }),
    on: () => () => { },
    connected: () => true,
    onConnection(h) { setTimeout(() => h(true), 0); return () => { }; },
  };
  window.__salaFake = { room, id: me, sair() { bc.postMessage({ t: 'bye', from: me }); bc.close(); } };
  addEventListener('pagehide', () => { try { bc.postMessage({ t: 'bye', from: me }); } catch (e) { } });
  window.claude = { use: async n => n === 'room' ? room : null };
}

const DU = p => p.evaluate(() => ({ fase: DU.fase, papel: DU.papel, id: DU.id, ids: DU.ids.slice(), r: DU.r, i: DU.i, pontos: DU.pontos, acertos: DU.acertos, inicio: DU.inicio, erro: DU.erro, outros: Object.values(DU.outros).map(j => j.apelido), modo: DU.modo }));
const esperar = (p, fn, arg, ms = 6000) => p.waitForFunction(fn, arg, { timeout: ms, polling: 100 }).then(() => true, () => false);
const perfilMedicina = p => p.evaluate(() => { Object.assign(store.doc('perfil'), { objetivo: 'medicina', boasVindas: true }); store.mudou('perfil'); });
/** Responde a questão atual: certa (true) ou errada (false), clicando no botão da alternativa. */
const responder = (p, certa) => p.evaluate(certa => { const q = qPorId(DU.ids[DU.i]); const i = certa ? q.c : (q.c + 1) % q.o.length; document.querySelector(`[data-act="du-alt"][data-i="${i}"]`).click(); }, certa);
const ordemNaTela = p => p.evaluate(() => [...document.querySelectorAll('[data-act="du-alt"]')].map(b => b.dataset.i).join(','));
/** Encaixe: sem rolagem lateral, nada sai da tela, alvos ≥ 44 px. */
const medir = () => {
  const W = document.documentElement.clientWidth, out = [];
  if (document.documentElement.scrollWidth > W + 1) out.push('rolagem lateral (' + document.documentElement.scrollWidth + 'px)');
  for (const e of document.querySelectorAll('#view *')) {
    const r = e.getBoundingClientRect(), cs = getComputedStyle(e); if (!r.width || cs.display === 'none' || e.closest('svg')) continue;
    if (r.right > W + 1) out.push('sai da tela: ' + e.tagName.toLowerCase() + '.' + String(e.className).split(' ')[0] + ' "' + e.textContent.trim().slice(0, 25) + '"');
    if (e.scrollWidth > e.clientWidth + 2 && ['hidden', 'clip'].includes(cs.overflowX) && !e.closest('.du-degraus li,.lista-q') ) out.push('texto cortado: ' + e.tagName.toLowerCase() + '.' + String(e.className).split(' ')[0]);
    if ((e.matches('button,a.btn,input') || e.matches('a.jg-cartao')) && r.height < 43.5 && !e.disabled) out.push(`alvo baixo (${Math.round(r.height)}px): "${e.textContent.trim().slice(0, 25)}"`);
  }
  return [...new Set(out)].slice(0, 6);
};

(async () => {
  const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
  let r; const errs = []; const pegar = p => p.on('pageerror', e => errs.push(e.message));
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } }); await ctx.addInitScript(salaFalsa);
  const p1 = await ctx.newPage(); pegar(p1);
  await p1.goto(URL + '#/jogos'); await p1.waitForTimeout(600); await perfilMedicina(p1); await p1.evaluate(() => render());

  console.log('1) Hub de jogos');
  const card = await p1.evaluate(() => { const a = document.querySelector('a.du-cartao[href="#/duelo"]'); return a && { h: a.getBoundingClientRect().height, sub: getComputedStyle(a).textDecorationLine, txt: a.textContent }; });
  ok(card && card.h >= 44 && !card.sub.includes('underline') && /Duelo ao vivo/.test(card.txt), 'cartão grande "Duelo ao vivo ⚔️" no hub (botão, sem sublinhado)');

  console.log('2) Criar duelo');
  await p1.click('a.du-cartao'); await p1.waitForTimeout(300);
  ok(await p1.evaluate(() => location.hash === '#/duelo' && !!document.querySelector('[data-act="du-criar"]')), 'rota #/duelo com "Criar duelo"');
  ok(await p1.evaluate(() => !document.querySelector('.du-anuncio') || document.querySelector('.du-anuncio').getAttribute('aria-live') === 'polite'), 'região de anúncio é polite');
  await p1.click('[data-act="du-criar"]'); await p1.waitForTimeout(150);
  await p1.click('[data-act="du-n"][data-v="5"]');
  ok(await p1.evaluate(() => document.querySelector('[data-act="du-n"][data-v="5"]').getAttribute('aria-pressed') === 'true'), 'escolhe 5 questões');
  await p1.fill('#du-apelido', 'Kiny'); await p1.click('form[data-form="du-criar"] button.azul'); await p1.waitForTimeout(200);
  let s1 = await DU(p1);
  ok(s1.fase === 'sala' && /^[A-Z0-9]{4}$/.test(s1.id) && s1.ids.length === 5, `sala criada, código ${s1.id}, 5 questões`);
  ok(await p1.evaluate(() => DU.ids.every(id => { const q = qPorId(id); return doObjetivo(q) && (q.dif || 2) <= 2 && q.src === 'banco'; })), 'questões do objetivo (Medicina), nível fácil/médio');
  ok(new RegExp(`abrir este mesmo app[\\s\\S]*Entrar com código[\\s\\S]*${s1.id}`).test(await p1.innerText('#view')), 'instrução: abrir o mesmo app → Entrar com código XXXX');
  ok(await p1.evaluate(() => document.querySelector('[data-act="du-comecar"]').disabled), '"Começar" desabilitado até alguém entrar');
  r = await p1.evaluate(() => __salaFake.room.peers().find(x => x.sameTab).presence);
  ok(r.duelo === s1.id && r.papel === 'anfitriao' && r.estado === 'esperando' && r.ids.length === 5 && r.apelido === 'Kiny', 'anfitriã publica na presença: código, papel, apelido, ids, estado');

  console.log('3) Entrar com código');
  const p2 = await ctx.newPage(); pegar(p2);
  await p2.goto(URL + '#/duelo'); await p2.waitForTimeout(500);
  await p2.click('[data-act="du-entrar"]'); await p2.waitForTimeout(150);
  await p2.fill('#du-codigo', 'xx'); await p2.fill('#du-apelido', 'Ana'); await p2.click('form[data-form="du-entrar"] button.azul'); await p2.waitForTimeout(150);
  ok(/4 letras ou números/.test(await p2.innerText('#view')) && await p2.inputValue('#du-apelido') === 'Ana', 'código inválido: aviso claro, apelido digitado continua no campo');
  await p2.fill('#du-codigo', s1.id.toLowerCase()); await p2.click('form[data-form="du-entrar"] button.azul');
  ok(await esperar(p2, () => DU.fase === 'sala'), 'amiga entrou na sala (código digitado em minúsculas)');
  ok(await esperar(p1, () => /Ana/.test(document.querySelector('.du-sala')?.textContent || '') && !document.querySelector('[data-act="du-comecar"]').disabled), 'anfitriã vê "Ana" na lista e "Começar" liberado');
  let s2 = await DU(p2);
  ok(JSON.stringify(s2.ids) === JSON.stringify(s1.ids), 'mesmas questões nas duas telas');
  if (SHOTS) await p1.screenshot({ path: SHOTS + '/sala-de-espera.png' });

  console.log('4) Dados maliciosos de um terceiro na sala');
  const p3 = await ctx.newPage(); pegar(p3);
  await p3.goto(URL + '#/jogos'); await p3.waitForTimeout(400);
  const enorme = '<img src=x onerror="window.__xss=1">' + 'A'.repeat(900);
  await p3.evaluate(([cod, ap]) => __salaFake.room.presence({ duelo: cod, papel: 'jogador', apelido: ap, area: 'medicina', r: 0, estado: 'esperando', pontos: 1e9, i: -4, acertos: '9', ids: ['<b>x</b>'] }), [s1.id, enorme]);
  ok(await esperar(p1, () => Object.keys(DU.outros).length === 2), 'terceiro jogador aparece na sala');
  r = await p1.evaluate(() => ({ img: !!document.querySelector('#view .du-sala img'), xss: !!window.__xss, nomes: Object.values(DU.outros).map(j => j.apelido), j: Object.values(DU.outros).find(j => j.apelido.startsWith('<')) }));
  ok(!r.img && !r.xss && r.nomes.every(n => [...n].length <= 16), 'HTML no apelido vira texto e o apelido é cortado em 16 caracteres: ' + JSON.stringify(r.nomes));
  ok(r.j && r.j.pontos === 0 && r.j.i === 0 && r.j.acertos === 0 && r.j.ids === null, 'números fora dos limites viram 0; ids de jogador são ignorados');

  console.log('5) Começar sincronizado');
  await p1.click('[data-act="du-comecar"]');
  ok(await esperar(p2, () => DU.fase === 'contando', null, 3000), 'amiga recebe a contagem 3-2-1');
  ok(/^[123]$/.test((await p1.textContent('#du-conta')).trim()), 'contagem grande na tela');
  // o terceiro "joga" com números absurdos
  await p3.evaluate(cod => __salaFake.room.presence({ estado: 'jogando', pontos: 99999999, i: 99, acertos: 99 }), s1.id);
  ok(await esperar(p1, () => DU.fase === 'jogando', null, 5000) && await esperar(p2, () => DU.fase === 'jogando', null, 5000), 'as duas começam a jogar');
  r = await Promise.all([p1.evaluate(() => DU.inicio), p2.evaluate(() => DU.inicio)]);
  ok(Math.abs(r[0] - r[1]) < 600, `início das duas com diferença de ${Math.abs(r[0] - r[1])} ms`);
  ok(await ordemNaTela(p1) === await ordemNaTela(p2), 'mesma ordem de alternativas: ' + await ordemNaTela(p1));
  ok(await p1.evaluate(() => { const q = document.querySelector('#du-placar'); return !!q && !q.closest('[aria-live]'); }), 'placar sem aria-live (não tagarela)');

  console.log('6) Placar ao vivo');
  await responder(p1, true); await p1.waitForTimeout(100);
  ok(/\+1[0-5]\d pontos/.test(await p1.innerText('#du-jogo .veredito')) && await p1.$('#du-jogo .explica') !== null, 'acerto mostra +pontos (acerto + rapidez) e a explicação curta');
  const pts1 = (await DU(p1)).pontos;
  ok(await esperar(p2, pts => new RegExp('Kiny[\\s\\S]*' + pts).test(document.querySelector('#du-placar').textContent), pts1), `amiga vê os ${pts1} pontos da Kiny no placar`);
  ok(await p2.evaluate(() => /lidera/.test(document.querySelector('#du-placar li.lider')?.textContent || '')), 'quem lidera fica em destaque');
  r = await p2.evaluate(() => [...document.querySelectorAll('#du-placar li')].map(li => li.textContent.replace(/\s+/g, ' ').trim()));
  ok(r.some(t => /<img/.test(t) && /\b0 pontos/.test(t)), 'terceiro malicioso aparece com 0 pontos (99999999 recusado): ' + r.find(t => /<img/.test(t)));
  await responder(p2, false); await p2.waitForTimeout(100);
  ok(/Não foi dessa vez/.test(await p2.innerText('#du-jogo')) && /Resposta certa/.test(await p2.innerText('#du-jogo')), 'erro mostra a resposta certa');
  if (SHOTS) { await p2.evaluate(() => scrollTo(0, 0)); await p2.screenshot({ path: SHOTS + '/jogo-com-placar.png' }); }

  console.log('7) Saída de um jogador');
  await p3.evaluate(() => __salaFake.sair()); await p3.close();
  ok(await esperar(p1, () => /saiu/.test(document.querySelector('#du-placar').textContent)), 'placar mostra "saiu"');
  ok(await p1.evaluate(() => [...document.querySelectorAll('.toast')].some(t => /saiu do duelo/.test(t.textContent))), 'aviso "… saiu do duelo"');
  ok((await DU(p1)).fase === 'jogando', 'o duelo continua para as outras');

  console.log('8) Até o fim');
  await p1.click('[data-act="du-prox"]'); await p2.click('[data-act="du-prox"]');
  ok(await ordemNaTela(p1) === await ordemNaTela(p2), 'questão 2 com a mesma ordem nas duas');
  ok(await p1.evaluate(() => document.activeElement?.dataset.act === 'du-alt'), 'foco vai para a 1ª alternativa');
  // teclado: tecla A responde, Enter avança
  await p1.keyboard.press('a'); await p1.waitForTimeout(80);
  ok(await p1.evaluate(() => DU.resp != null), 'teclado: A responde');
  await p1.evaluate(() => document.activeElement.blur()); await p1.keyboard.press('Enter'); await p1.waitForTimeout(80);
  ok((await DU(p1)).i === 2, 'teclado: Enter vai para a próxima');
  for (let k = 2; k < 5; k++) { await responder(p1, true); await p1.waitForTimeout(40); await p1.click('[data-act="du-prox"]'); await p1.waitForTimeout(40); }
  ok(await esperar(p1, () => DU.fase === 'fim'), 'anfitriã terminou');
  ok(/ainda está na questão 2/.test(await p1.innerText('#du-podio')), 'pódio mostra a amiga ainda jogando');
  for (let k = 1; k < 5; k++) { await responder(p2, k % 2 === 0); await p2.waitForTimeout(40); await p2.click('[data-act="du-prox"]'); await p2.waitForTimeout(40); }
  ok(await esperar(p2, () => DU.fase === 'fim'), 'amiga terminou');
  ok(await esperar(p1, () => !/ainda está/.test(document.querySelector('#du-podio').textContent)), 'pódio da anfitriã se atualiza quando a amiga termina');
  r = await p1.evaluate(() => ({ ordem: [...document.querySelectorAll('.du-degraus li')].map(li => li.className + ':' + li.querySelector('b').textContent), venc: document.querySelector('#du-podio h2').textContent }));
  ok(/d1[^:]*:Kiny/.test(r.ordem[0]) && r.ordem.some(x => /d2.*Ana/.test(x)), 'pódio: Kiny em 1º, Ana em 2º — ' + r.ordem.join(' | '));
  ok(/venceu/.test(r.venc), 'título comemora: ' + r.venc.trim());
  ok(await p1.evaluate(() => (store.doc('jogos').duelos || []).length >= 1 && store.doc('jogos').duelos.slice(-1)[0].pts.length === 5 && store.doc('jornada').cont.jogos >= 1), 'partida guardada (pontos por questão) e contada na jornada');
  if (SHOTS) { await p1.evaluate(() => scrollTo(0, 0)); await p1.screenshot({ path: SHOTS + '/podio.png' }); }

  console.log('9) Ver questões que errei (navegação da lista)');
  await p2.click('[data-act="du-errei"]'); await p2.waitForTimeout(150);
  const nErr = await p2.locator('#view .lista-q a').count();
  ok(nErr >= 2, `lista das ${nErr} questões erradas`);
  await p2.click('#view .lista-q a'); await p2.waitForTimeout(250);
  ok(/#\/questoes\/q\//.test(await p2.evaluate(() => location.hash)) && /1 de \d/.test(await p2.innerText('.qnav-pos').catch(() => '')), 'abre a questão com "‹ Anterior · 1 de N · Próxima ›"');
  await p2.goBack(); await p2.waitForTimeout(250);
  ok(await p2.evaluate(() => location.hash === '#/duelo' && DU.fase === 'fim'), 'voltar retorna ao pódio');

  console.log('10) Revanche');
  await p1.click('[data-act="du-revanche"]');
  ok(await esperar(p2, () => DU.convite === true), 'amiga recebe o convite de revanche');
  await p2.click('[data-act="du-revanche"]');
  ok(await esperar(p2, () => DU.fase === 'sala' && DU.r === 1), 'amiga entra na revanche (rodada nova)');
  ok(await esperar(p1, () => !document.querySelector('[data-act="du-comecar"]').disabled), 'anfitriã pode começar a revanche');
  ok(JSON.stringify((await DU(p1)).ids) === JSON.stringify((await DU(p2)).ids), 'revanche com as mesmas questões nas duas');

  console.log('11) Anfitriã maliciosa / de outra área');
  await p2.click('[data-act="du-sair"]'); await p2.waitForTimeout(100);
  const p4 = await ctx.newPage(); pegar(p4); await p4.goto(URL + '#/jogos'); await p4.waitForTimeout(400);
  await p4.evaluate(() => __salaFake.room.presence({ duelo: 'ZZZZ', papel: 'anfitriao', apelido: 'Má', area: 'medicina', r: 0, estado: 'esperando', ids: ['nao-existe', 'x', 'y', 'z', 'w'] }));
  await p2.bringToFront(); await p2.click('[data-act="du-entrar"]'); await p2.waitForTimeout(100); await p2.fill('#du-codigo', 'ZZZZ'); await p2.fill('#du-apelido', 'Ana'); await p2.click('form[data-form="du-entrar"] button.azul');
  ok(await esperar(p2, () => /dados inválidos/.test(document.querySelector('#view').textContent)) && (await DU(p2)).fase === 'procurando', 'ids inexistentes: duelo recusado com aviso');
  const idsEnem = await p4.evaluate(() => questoes().filter(q => q.t === 'enem' && q.src === 'banco').slice(0, 5).map(q => q.id));
  await p4.evaluate(ids => __salaFake.room.presence({ duelo: 'YYYY', area: 'enem', ids }), idsEnem);
  await p2.bringToFront(); await p2.waitForTimeout(300);
  await p2.click('[data-act="du-entrar"]'); await p2.waitForTimeout(100); await p2.fill('#du-codigo', 'YYYY'); await p2.fill('#du-apelido', 'Ana'); await p2.click('form[data-form="du-entrar"] button.azul');
  ok(await esperar(p2, () => /é de ENEM/.test(document.querySelector('#view').textContent)), 'duelo de outra área (ENEM) não entra no perfil de Medicina' + ' — ' + JSON.stringify(await DU(p2)).slice(0, 200));
  await p4.close(); await p2.click('[data-act="du-sair"]');

  console.log('12) Ninguém entrou em 2 min → fantasma com as mesmas questões');
  await p2.close();
  await p1.click('[data-act="du-sair"]'); await p1.evaluate(() => { DUELO.espera = 400; });
  await p1.click('[data-act="du-criar"]'); await p1.fill('#du-apelido', 'Kiny'); await p1.click('form[data-form="du-criar"] button.azul');
  ok(await esperar(p1, () => /Ninguém entrou ainda/.test(document.querySelector('#view').textContent), null, 3000), 'aviso "Ninguém entrou ainda" com a opção do fantasma');
  const idsSala = (await DU(p1)).ids;
  await p1.click('[data-act="du-fantasma"][data-mesmas]');
  ok(await esperar(p1, () => DU.fase === 'jogando' && DU.modo === 'fantasma', null, 5000) && JSON.stringify((await DU(p1)).ids) === JSON.stringify(idsSala), 'joga contra o fantasma com as mesmas questões');
  ok(await p1.evaluate(() => /seu duelo de/.test(DU.fantasma.desc)), 'fantasma = o duelo anterior (histórico guardado): ' + await p1.evaluate(() => DU.fantasma.desc));
  await p1.click('[data-act="du-sair"]');

  console.log('13) Sem sala (null): fantasma');
  const ctx2 = await b.newContext({ viewport: { width: 390, height: 844 } });
  const f = await ctx2.newPage(); pegar(f);
  await f.goto(URL + '#/jogos'); await f.waitForTimeout(500); await perfilMedicina(f);
  await f.evaluate(() => { location.hash = '#/duelo'; }); await f.waitForTimeout(400);
  r = await f.evaluate(() => ({ criar: !!document.querySelector('[data-act="du-criar"]'), fant: !!document.querySelector('[data-act="du-fantasma"]'), txt: document.querySelector('#view').textContent }));
  ok(!r.criar && r.fant && /precisa do app aberto pelo link do Claude/.test(r.txt), 'sem sala: explica e oferece só o fantasma');
  await f.click('[data-act="du-fantasma"]'); await f.click('[data-act="du-n"][data-v="5"]'); await f.click('form[data-form="du-criar"] button.azul');
  ok(await esperar(f, () => DU.fase === 'jogando', null, 5000), 'contagem e jogo contra o fantasma');
  ok(await f.evaluate(() => /média/.test(DU.fantasma.desc) && DU.fantasma.plano.length === 5), 'sem histórico: fantasma pela média — ' + await f.evaluate(() => DU.fantasma.desc));
  ok(/Fantasma/.test(await f.innerText('#du-placar')), 'fantasma no placar');
  await f.evaluate(() => { DU.inicio -= 30000; }); await f.waitForTimeout(400);
  ok(await f.evaluate(() => estadoFantasma().feitas >= 1 && /questão [2-5] de 5|terminou/.test([...document.querySelectorAll('#du-placar li')].find(li => /Fantasma/.test(li.textContent)).textContent)), 'placar do fantasma avança sozinho');
  if (SHOTS) await f.screenshot({ path: SHOTS + '/fantasma.png' });
  // tempo esgotado
  await f.evaluate(() => { DU.tq = Date.now() - DUELO.tempo - 50; }); await f.waitForTimeout(400);
  ok(/Tempo esgotado/.test(await f.innerText('#du-jogo')), '20 s sem resposta: "Tempo esgotado" e mostra a certa');
  for (let k = 0; k < 5; k++) { if (await f.evaluate(() => DU.resp == null)) await responder(f, true); await f.waitForTimeout(40); await f.click('[data-act="du-prox"]'); await f.waitForTimeout(40); }
  ok(await esperar(f, () => DU.fase === 'fim'), 'fim contra o fantasma');
  await f.evaluate(() => { DU.inicio -= 1e6; }); await f.waitForTimeout(500);
  ok(/Fantasma/.test(await f.innerText('.du-degraus')) && !/ainda está/.test(await f.innerText('#du-podio')), 'pódio com o fantasma (já terminou)');
  if (SHOTS) { await f.evaluate(() => scrollTo(0, 0)); await f.screenshot({ path: SHOTS + '/fantasma-podio.png' }); }
  r = await f.evaluate(() => ({ n: store.doc('jogos').n.duelo, j: store.doc('jornada').cont.jogos }));
  ok(r.n === 1 && r.j >= 1, 'partida contra o fantasma conta como jogo (XP/missões)');
  // Sem jogar nada: não conta
  await f.click('[data-act="du-revanche"]'); await esperar(f, () => DU.fase === 'jogando', null, 5000);
  for (let k = 0; k < 5; k++) { await f.evaluate(() => { DU.tq = Date.now() - DUELO.tempo - 50; }); await f.waitForTimeout(300); await f.click('[data-act="du-prox"]'); await f.waitForTimeout(40); }
  ok(await esperar(f, () => DU.fase === 'fim') && await f.evaluate(() => store.doc('jogos').n.duelo === 1), 'só tempo esgotado (sem jogar de verdade): não conta partida');

  console.log('14) Encaixe a 360/390 px, letra 1 e 1,7');
  const achados = [];
  for (const w of [360, 390]) for (const k of ['1', '1.7']) {
    await f.setViewportSize({ width: w, height: 800 });
    const telas = [['inicio', () => ACOES['du-sair']()], ['config', () => ACOES['du-fantasma']({ dataset: {} })],
      ['jogo', () => { DU.n = 5; FORMS['du-criar'](); const l = questoes().find(q => doObjetivo(q) && q.o.some(o => /glicuronidação/.test(o))); if (l) DU.ids[0] = l.id; DU.inicio = Date.now() - 1; }]   /* palavra longa de propósito */, ['resposta', null], ['podio', null]];
    for (const [nome, acao] of telas) {
      if (nome === 'resposta') { await esperar(f, () => DU.fase === 'jogando', null, 4000); await responder(f, false); }
      else if (nome === 'podio') { for (let q = 0; q < 5; q++) { if (await f.evaluate(() => DU.resp == null)) await responder(f, true); await f.evaluate(() => ACOES['du-prox']()); } }
      else await f.evaluate(acao);
      await f.waitForTimeout(250);
      await f.evaluate(k => document.documentElement.style.setProperty('--k', k), k); await f.waitForTimeout(60);
      (await f.evaluate(medir)).forEach(x => achados.push(`${w}/${k}/${nome}: ${x}`));
    }
  }
  // sala (com room) e hub
  await p1.bringToFront();
  for (const w of [360, 390]) for (const k of ['1', '1.7']) {
    await p1.setViewportSize({ width: w, height: 800 });
    await p1.evaluate(() => { ACOES['du-sair'](); DU.modo = 'vivo'; DU.fase = 'config'; render(); });
    await p1.fill('#du-apelido', 'Mariazinha Souza'); await p1.evaluate(() => FORMS['du-criar']());
    await p1.evaluate(k => document.documentElement.style.setProperty('--k', k), k); await p1.waitForTimeout(80);
    (await p1.evaluate(medir)).forEach(x => achados.push(`${w}/${k}/sala: ${x}`));
    await p1.evaluate(() => { location.hash = '#/jogos'; }); await p1.waitForTimeout(200);
    await p1.evaluate(k => document.documentElement.style.setProperty('--k', k), k); await p1.waitForTimeout(60);
    (await p1.evaluate(medir)).filter(x => /du-|Duelo/.test(x) || /rolagem/.test(x)).forEach(x => achados.push(`${w}/${k}/hub: ${x}`));
    await p1.evaluate(() => { location.hash = '#/duelo'; }); await p1.waitForTimeout(150);
  }
  ok(!achados.length, achados.length ? 'fora do padrão: ' + achados.slice(0, 10).join(' | ') : 'nada sai da tela, sem rolagem lateral, alvos ≥ 44 px (início, config, sala, jogo, resposta, pódio, hub)');

  console.log('15) Contraste do placar e do pódio (claro e escuro)');
  for (const esquema of ['light', 'dark']) {
    await f.emulateMedia({ colorScheme: esquema });
    const baixos = await f.evaluate(() => {
      const cv = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
      const rgba = c => { cv.clearRect(0, 0, 1, 1); cv.fillStyle = '#000'; cv.fillStyle = c; cv.fillRect(0, 0, 1, 1); const d = cv.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
      const lum = ([r, g, b]) => { const f = x => { x /= 255; return x <= .04045 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4; }; return .2126 * f(r) + .7152 * f(g) + .0722 * f(b); };
      const mist = (a, b) => [0, 1, 2].map(i => a[i] * a[3] + b[i] * (1 - a[3]));
      const fundo = e => { const pilha = []; for (let x = e; x; x = x.parentElement) { const c = rgba(getComputedStyle(x).backgroundColor); if (c[3] > 0) { pilha.push(c); if (c[3] >= 1) break; } } let b = rgba(getComputedStyle(document.body).backgroundColor).slice(0, 3); for (const c of pilha.reverse()) b = mist(c, b); return b; };
      const out = [];
      for (const e of document.querySelectorAll('#du-podio *, .du-placar *')) {
        if (![...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()) || e.closest('[aria-hidden="true"],svg')) continue;
        const bg = fundo(e), fg = mist(rgba(getComputedStyle(e).color), bg), a = lum(fg), c = lum(bg), q = (Math.max(a, c) + .05) / (Math.min(a, c) + .05);
        if (q < 4.5) out.push(q.toFixed(2) + ' ' + e.tagName + ' "' + e.textContent.trim().slice(0, 20) + '"');
      }
      return out;
    });
    ok(!baixos.length, `${esquema}: contraste ≥ 4,5:1 no pódio${baixos.length ? ' — ' + baixos.slice(0, 5).join(' | ') : ''}`);
  }

  ok(!errs.length, errs.length ? 'erros de JS: ' + [...new Set(errs)].join(' | ') : 'Sem erros de JS');
  await b.close(); console.log(falhas ? `${falhas} FALHA(S)` : 'DUELO OK'); process.exit(falhas ? 1 : 0);
})();
