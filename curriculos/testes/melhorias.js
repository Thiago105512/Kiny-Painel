// Teste de navegador (Playwright): casos em sequência, questão irmã, selo de revisão e reportar problema.
// Rode na raiz:   python3 -m http.server 8765 &   e   node curriculos/testes/melhorias.js
const { chromium } = require('playwright');
const URL = process.env.APP_URL || 'http://localhost:8765/curriculos/app.html';
let falhas = 0; const ok = (c, m) => { console.log((c ? '  ✓ ' : '  ✗ ') + m); if (!c) falhas++; };
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {}); const errs = [];
  const p = await b.newPage({ viewport: { width: 390, height: 840 } }); p.on('pageerror', e => errs.push(e.message));
  await p.goto(URL); await p.waitForTimeout(700);
  // três partes de um caso como questões próprias
  await p.evaluate(() => { const D = store.doc(blocosQ()[0] || 'questoes'); const base = { t: 'medicina', a: 'Clínica', o: ['a1', 'b1', 'c1', 'd1', 'e1'], c: 0, e: 'x'.repeat(210), tema: 'hipertensao-arterial', dif: 2, serie: 's-abc123', partes: 3, revisado: '2026-09' };
    [3, 1, 2].forEach(n => { D.itens['t-s' + n] = { ...base, id: 't-s' + n, q: 'Parte ' + n + ' do caso', parte: n, o: base.o.map(x => x + n) }; }); store.mudou(blocosQ()[0] || 'questoes'); invalidarQuestoes(); });
  console.log('1) Caso em sequência');
  let r = await p.evaluate(() => ordenarSeries(['x', 't-s2'], true).filter(i => i.startsWith('t-s')));
  ok(JSON.stringify(r) === '["t-s1","t-s2","t-s3"]', 'na prática, o caso entra inteiro e em ordem: ' + r.join(','));
  r = await p.evaluate(() => ordenarSeries(['t-s3', 't-s1'], false));
  ok(JSON.stringify(r) === '["t-s1","t-s3"]', 'fora da prática, só reordena o que foi escolhido');
  await p.evaluate(() => { praticar(['t-s2'], 'teste'); }); await p.waitForTimeout(250);
  ok(/Caso em 3 partes · parte 1/.test(await p.innerText('#pl')), 'player mostra "Caso em 3 partes · parte 1"');
  console.log('2) Selo, questão irmã e reportar');
  await p.click('[data-act="pl-alt"][data-i="1"]'); await p.click('[data-act="pl-confirmar"]'); await p.waitForTimeout(150);
  ok(/revisada em/.test(await p.innerText('#pl')), 'selo "revisada em" aparece depois de responder');
  const temIrma = await p.$('[data-act="pl-irma"]'); ok(!!temIrma, 'depois de errar, oferece "Treinar este ponto de novo"');
  const antes = await p.evaluate(() => PL.ids.length); await p.click('[data-act="pl-irma"]'); await p.waitForTimeout(150);
  r = await p.evaluate(() => ({ n: PL.ids.length, i: PL.i, tema: qPorId(PL.ids[PL.i]).tema, serie: qPorId(PL.ids[PL.i]).serie }));
  ok(r.n === antes + 1 && r.i === 1 && r.tema === 'hipertensao-arterial' && !r.serie, 'questão irmã do mesmo tema entra a seguir');
  await p.click('[data-act="pl-alt"][data-i="0"]'); await p.click('[data-act="pl-confirmar"]'); await p.waitForTimeout(100);
  await p.click('[data-act="reportar"]'); await p.waitForTimeout(100); await p.check('input[name="rep-m"][value="desatualizada"]'); await p.fill('#rep-txt', 'teste');
  await p.click('form[data-form="reportar"] button'); await p.waitForTimeout(200);
  r = await p.evaluate(() => Object.values(store.doc('reportes').itens));
  ok(r.length === 1 && r[0].motivo === 'desatualizada' && r[0].texto === 'teste', 'problema reportado fica registrado');
  ok(!errs.length, errs.length ? 'erros de JS: ' + errs.join(' | ') : 'Sem erros de JS');
  await b.close(); console.log(falhas ? `${falhas} FALHA(S)` : 'MELHORIAS OK'); process.exit(falhas ? 1 : 0);
})();
