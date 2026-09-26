// Teste de navegador (Playwright): "Pausa para rir" — cartão no Início, "Outra" não repete, "Ri" registra, esconder e religar.
// Rode na raiz:   python3 -m http.server 8765 &   e   node curriculos/testes/humor.js
const { chromium } = require('playwright');
const URL = process.env.APP_URL || 'http://localhost:8765/curriculos/app.html';
let falhas = 0; const ok = (c, m) => { console.log((c ? '  ✓ ' : '  ✗ ') + m); if (!c) falhas++; };
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {}); const errs = [];
  const p = await b.newPage({ viewport: { width: 390, height: 840 } }); p.on('pageerror', e => errs.push(e.message));
  await p.goto(URL + '#/'); await p.waitForTimeout(700);
  console.log('1) Cartão no Início');
  ok(await p.evaluate(() => HUMOR.length >= 100), 'piadas carregadas');
  const t1 = await p.innerText('.humor-txt').catch(() => ''); ok(!!t1, 'cartão "Pausa para rir" aparece: ' + t1.slice(0, 60));
  await p.click('[data-act="hum-outra"]'); await p.waitForTimeout(150);
  const t2 = await p.innerText('.humor-txt'); ok(t2 && t2 !== t1, '"Outra" troca a piada');
  await p.click('[data-act="hum-ri"]'); await p.waitForTimeout(150);
  let r = await p.evaluate(() => Object.values(store.doc('humor').v).map(x => x[1]).sort().join(','));
  ok(r === '0,1', 'vistas guardadas (passou e riu): ' + r);
  r = await p.evaluate(() => { const vistos = new Set(); for (let i = 0; i < 40; i++) { const h = escolherPiada(true); if (vistos.has(h.id)) return false; vistos.add(h.id); marcarVista(h.id, 0); } return true; });
  ok(r, '40 piadas seguidas sem repetição');
  console.log('2) Foco no objetivo e desligar');
  r = await p.evaluate(() => { const P = store.doc('perfil'); P.objetivo = 'direito'; const n = humorDoObjetivo().length; P.objetivo = 'residencia'; const m = humorDoObjetivo().length; P.objetivo = null; return [n, m]; });
  ok(r[0] === 0 && r[1] > 0, 'piadas de Medicina não aparecem para objetivo Direito; aparecem para Residência');
  await p.click('[data-act="hum-off"]'); await p.waitForTimeout(150);
  ok(!(await p.$('.humor')), '"Esconder" tira o cartão');
  await p.evaluate(() => { store.doc('perfil').humor = true; store.mudou('perfil'); atualizar(); }); await p.waitForTimeout(150);
  ok(!!(await p.$('.humor')), 'religado pelo perfil, volta');
  ok(!errs.length, errs.length ? 'erros de JS: ' + errs.join(' | ') : 'Sem erros de JS');
  await b.close(); console.log(falhas ? `${falhas} FALHA(S)` : 'HUMOR OK'); process.exit(falhas ? 1 : 0);
})();
