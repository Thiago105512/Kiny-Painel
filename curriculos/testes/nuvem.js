// Teste de navegador (Playwright): versão pública com Firebase (02b-nuvem.js), usando um Firebase SIMULADO
// (os scripts do gstatic são interceptados). Confere: login anônimo automático, progresso salvo em
// data/users/<uid>/<doc>, reporte chegando em reportes/<id>, botão "Entrar com Google" e que,
// dentro do Claude (window.claude presente), o Firebase não é usado.
// Rode na raiz:   python3 -m http.server 8765 &   e   node curriculos/testes/nuvem.js
const { chromium } = require('playwright');
const URL = process.env.APP_URL || 'http://localhost:8765/curriculos/app.html';
let falhas = 0; const ok = (c, m) => { console.log((c ? '  ✓ ' : '  ✗ ') + m); if (!c) falhas++; };
const CFG = { apiKey: 'teste', authDomain: 'simulado-teste.firebaseapp.com', projectId: 'simulado-teste', appId: '1:1:web:1' };
const MOCK = `
(() => {
  const mem = window.__fsMem = {};
  const snapDoc = (id, v) => ({ id, exists: v !== undefined, data: () => v && JSON.parse(JSON.stringify(v)) });
  const filhos = p => Object.keys(mem).filter(k => k.startsWith(p + '/') && !k.slice(p.length + 1).includes('/'));
  const auth = { currentUser: null,
    onAuthStateChanged(cb) { setTimeout(() => cb(this.currentUser)); return () => {}; },
    async signInAnonymously() { this.currentUser = { uid: 'anon1', isAnonymous: true }; },
    async getRedirectResult() { return null; }, async signOut() { this.currentUser = null; } };
  const fs = {
    doc: p => ({ async set(o) { mem[p] = JSON.parse(JSON.stringify(o)); }, async get() { return snapDoc(p.split('/').pop(), mem[p]); } }),
    collection: p => ({ async get() { return { docs: filhos(p).map(k => snapDoc(k.split('/').pop(), mem[k])) }; },
      onSnapshot(cb) { setTimeout(() => { const docs = filhos(p).map(k => snapDoc(k.split('/').pop(), mem[k])); cb({ docs, metadata: { hasPendingWrites: false }, docChanges: () => docs.map(doc => ({ type: 'added', doc })) }); }); return () => {}; } }) };
  const app = { auth: () => auth, firestore: () => fs };
  window.firebase = { apps: [], initializeApp(c) { window.__fbCfg = c; this.apps.push(app); return app; }, app: () => app,
    auth: { GoogleAuthProvider: function () {} } };
})();`;
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {}); const errs = [];
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.route('https://www.gstatic.com/**', r => r.fulfill({ contentType: 'text/javascript', body: /app-compat/.test(r.request().url()) ? MOCK : '' }));
  await ctx.route(u => u.href.split('#')[0] === URL.split('#')[0], async r => {
    const res = await r.fetch(); const body = (await res.text()).replace(/"firebase":(null|\{[^{}]*\})/, '"firebase":' + JSON.stringify(CFG));
    r.fulfill({ response: res, body });
  });
  const p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message));
  console.log('1) Site público com Firebase');
  await p.goto(URL); await p.waitForTimeout(1200);
  ok(await p.evaluate(() => NUVEM.disponivel()), 'nuvem disponível fora do Claude com configuração');
  ok(await p.evaluate(() => window.__fbCfg?.projectId === 'simulado-teste'), 'Firebase iniciado com a configuração do projeto');
  ok(await p.evaluate(() => NUVEM.estado().tipo === 'anonimo'), 'entra de forma anônima e automática');
  ok(/nuvem/.test(await p.innerText('#sync')), 'indicador mostra "salvo na nuvem"');
  await p.evaluate(() => { const P = store.doc('perfil'); P.objetivo = 'medicina'; P.nome = 'Teste'; store.mudou('perfil'); });
  await p.waitForTimeout(2500);
  ok(await p.evaluate(() => window.__fsMem['data/users/anon1/perfil']?.objetivo === 'medicina'), 'progresso gravado em data/users/<uid>/perfil');
  const q = await p.evaluate(() => questoes().find(x => x.t === 'medicina').id);
  await p.evaluate(qid => store.publicar('reportes/rteste', { qid, motivo: 'gabarito', texto: 'teste', ts: Date.now() }), q);
  ok(await p.evaluate(() => !!window.__fsMem['reportes/rteste']), 'reporte chega em reportes/<id>');
  await p.goto(URL + '#/biblioteca/dados'); await p.waitForTimeout(900);
  ok(await p.$('[data-act="nuvem-entrar"]') !== null, 'botão "Entrar com Google" na página de dados');
  console.log('2) Dentro do Claude');
  const p2 = await ctx.newPage();
  await p2.addInitScript(() => { window.claude = { use: async () => null }; });
  await p2.goto(URL); await p2.waitForTimeout(900);
  ok(await p2.evaluate(() => !NUVEM.disponivel() && !window.firebase), 'no Claude o Firebase não é carregado');
  ok(!errs.length, 'sem erros de JavaScript' + (errs.length ? ': ' + errs[0] : ''));
  await b.close(); console.log(falhas ? `\n${falhas} falha(s)` : '\nNUVEM OK'); process.exit(falhas ? 1 : 0);
})();
