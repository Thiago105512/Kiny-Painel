// Teste de navegador (Playwright): módulo de Jogos — os 5 jogos do começo ao fim, recorde e foco no objetivo.
// Rode na raiz:   python3 -m http.server 8765 &   e   node curriculos/testes/jogos.js
const { chromium } = require('playwright');
const URL = process.env.APP_URL || 'http://localhost:8765/curriculos/app.html';
let falhas = 0; const ok = (c, m) => { console.log((c ? '  ✓ ' : '  ✗ ') + m); if (!c) falhas++; };
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {}); const errs = [];
  const p = await b.newPage({ viewport: { width: 390, height: 840 } }); p.on('pageerror', e => errs.push(e.message));
  await p.goto(URL + '#/jogos'); await p.waitForTimeout(700);
  console.log('1) Lista');
  ok(await p.locator('.jg-cartao').count() === 7, '7 jogos rápidos na lista (sem objetivo definido)');
  console.log('2) Três vidas: errar 3 vezes encerra');
  await p.goto(URL + '#/jogos/vidas'); await p.waitForTimeout(300); await p.evaluate(() => fecharFolha()); await p.click('[data-act="jg-comecar"]'); await p.waitForTimeout(200);
  for (let k = 0; k < 3; k++) { await p.evaluate(() => { const q = qPorId(JG.rodadas[JG.i].qid); document.querySelector(`[data-act="jg-alt"][data-i="${(q.c + 1) % q.o.length}"]`).click(); }); await p.waitForTimeout(120);
    ok(await p.$('.explica') !== null || k > 0, k ? `erro ${k + 1}` : 'depois de responder mostra a explicação'); await p.click('[data-act="jg-prox"]'); await p.waitForTimeout(120); }
  ok(await p.evaluate(() => JG.fim && JG.vidas === 0), 'terceiro erro encerra o jogo');
  ok(await p.evaluate(() => Object.keys(store.doc('erros').itens).length === 3), 'os 3 erros foram para o caderno de erros');
  ok(/Rever as 3 que errei/.test(await p.innerText('#jg-fim')), 'oferece rever as que errou');
  console.log('3) Contra o relógio: acertos seguidos multiplicam; tempo acaba');
  await p.goto(URL + '#/jogos/relogio'); await p.waitForTimeout(300); await p.evaluate(() => fecharFolha()); await p.click('[data-act="jg-comecar"]'); await p.waitForTimeout(200);
  for (let k = 0; k < 4; k++) { await p.evaluate(() => { const q = qPorId(JG.rodadas[JG.i].qid); document.querySelector(`[data-act="jg-alt"][data-i="${q.c}"]`).click(); }); await p.waitForTimeout(800); }
  let r = await p.evaluate(() => ({ pts: JG.pontos, seq: JG.seq, i: JG.i }));
  ok(r.pts === 60 && r.seq === 4 && r.i === 4, `4 acertos seguidos = 10+10+20+20 (x2 a partir do 3º): pontos ${r.pts}, avança sozinho (i=${r.i})`);
  await p.evaluate(() => { JG.ate = Date.now() + 300; }); await p.waitForTimeout(900);
  r = await p.evaluate(() => ({ fim: JG.fim, rec: store.doc('jogos').rec.relogio }));
  ok(r.fim && r.rec === 60, 'tempo acaba, recorde gravado: ' + r.rec);
  console.log('4) Certo ou errado');
  await p.goto(URL + '#/jogos/vf'); await p.waitForTimeout(300); await p.evaluate(() => fecharFolha()); await p.click('[data-act="jg-comecar"]'); await p.waitForTimeout(200);
  for (let k = 0; k < 10; k++) { await p.evaluate(() => { const r = JG.rodadas[JG.i]; document.querySelector(`[data-act="jg-vf"][data-v="${r.verdade ? 1 : 0}"]`).click(); }); await p.waitForTimeout(80); await p.click('[data-act="jg-prox"]'); await p.waitForTimeout(80); }
  r = await p.evaluate(() => ({ fim: JG.fim, pts: JG.pontos, neg: JG.rodadas.some(x => /EXCETO|INCORRET/i.test(qPorId(x.qid).q)) }));
  ok(r.fim && r.pts === 100 && !r.neg, '10 de 10 = 100 pontos, sem questões negativas');
  console.log('5) Qual é o ritmo?');
  await p.goto(URL + '#/jogos/ecg'); await p.waitForTimeout(300); await p.evaluate(() => fecharFolha()); await p.click('[data-act="jg-comecar"]'); await p.waitForTimeout(200);
  ok(await p.$('.fig-img svg') !== null && await p.locator('[data-act="jg-ecg"]').count() === 4, 'traçado + 4 opções');
  await p.evaluate(() => { const r = JG.rodadas[JG.i]; [...document.querySelectorAll('[data-act="jg-ecg"]')].find(b => b.dataset.o !== r.certo).click(); }); await p.waitForTimeout(100);
  ok(/Era: /.test(await p.innerText('#view')), 'errar mostra o ritmo certo e a legenda');
  console.log('6) Linha do tempo');
  await p.goto(URL + '#/jogos/linha'); await p.waitForTimeout(300); await p.evaluate(() => fecharFolha()); await p.click('[data-act="jg-comecar"]'); await p.waitForTimeout(200);
  r = await p.evaluate(() => JG.rodadas.every(x => new Set(x.itens.map(id => PILULAS.find(p => p.id === id).ano)).size === 4));
  ok(r, 'cada rodada tem 4 marcos de anos diferentes');
  await p.evaluate(() => { for (const id of JG.rodadas[0].certo) document.querySelector(`[data-act="jg-marco"][data-id="${id}"]`).click(); }); await p.waitForTimeout(100);
  ok(await p.evaluate(() => JG.resp === true && JG.pontos === 20), 'ordem certa = 20 pontos');
  await p.click('[data-act="jg-prox"]'); await p.waitForTimeout(100);
  await p.evaluate(() => { const r = JG.rodadas[1]; document.querySelector(`[data-act="jg-marco"][data-id="${r.certo[3]}"]`).click(); }); await p.waitForTimeout(100);
  ok(await p.evaluate(() => JG.resp === false) && await p.locator('.jg-marco small').count() === 4, 'erro revela a ordem com os anos');
  console.log('7) Foco no objetivo');
  r = await p.evaluate(() => { store.doc('perfil').objetivo = 'direito'; const l = JOGOS.filter(jogoDisponivel).map(j => j.id); const med = poolJogo().some(q => q.t === 'medicina'); store.doc('perfil').objetivo = null; return { l, med }; });
  ok(!r.l.includes('ecg') && !r.l.includes('anatomia') && !r.l.includes('pares') && !r.med, 'objetivo Direito: sem jogo de ECG e sem questões de Medicina (' + r.l.join(',') + ')');
  ok(!errs.length, errs.length ? 'erros de JS: ' + errs.join(' | ') : 'Sem erros de JS');
  await b.close(); console.log(falhas ? `${falhas} FALHA(S)` : 'JOGOS OK'); process.exit(falhas ? 1 : 0);
})();
