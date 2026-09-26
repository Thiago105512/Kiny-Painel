// Teste de navegador (Playwright): questões da mesma "família" (mesmo quadro por outro ângulo)
// nunca caem juntas numa sessão de prática nem num simulado.
// Rode na raiz:   python3 -m http.server 8765 &   e   node curriculos/testes/familias.js
const { chromium } = require('playwright');
const URL = process.env.APP_URL || 'http://localhost:8765/curriculos/app.html';
let falhas = 0; const ok = (c, m) => { console.log((c ? '  ✓ ' : '  ✗ ') + m); if (!c) falhas++; };
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {}); const errs = [];
  const p = await b.newPage({ viewport: { width: 390, height: 840 } }); p.on('pageerror', e => errs.push(e.message));
  await p.goto(URL); await p.waitForTimeout(700);
  const r = await p.evaluate(() => {
    const Q = questoes(), fams = {};
    Q.forEach(q => { if (q.familia) (fams[q.familia] = fams[q.familia] || []).push(q); });
    const lista = Object.values(fams), repetidas = ids => { const v = new Set(); return ids.some(id => { const f = qPorId(id)?.familia; if (!f) return false; if (v.has(f)) return true; v.add(f); return false; }); };
    if (!lista.length) return { n: 0 };
    const g = lista[0], so = ordenarSeries(g.map(q => q.id), true);
    const avulsa = ordenarSeries([g[0].id], true);
    let simRuim = 0;
    for (const t of ["medicina", "residencia", "med"]) {
      const pool = Q.filter(q => t === "med" ? TRILHAS[q.t]?.dominio === "medicina" : q.t === t);
      for (let k = 0; k < 15; k++) if (repetidas(montarProporcional(t, pool, Math.min(150, pool.length)).map(q => q.id))) simRuim++;
    }
    const sessao = ordenarSeries(embaralhar(Q.filter(q => q.familia).map(q => q.id)), true);
    return { n: lista.length, so: so.length, avulsa: avulsa.length, simRuim, sessaoRuim: repetidas(sessao) };
  });
  console.log('1) Famílias no banco: ' + r.n);
  ok(r.n > 0, 'há famílias marcadas');
  ok(r.so === 1, 'sessão com duas irmãs fica só com a primeira');
  ok(r.avulsa === 1, 'questão avulsa continua abrindo sozinha');
  ok(r.simRuim === 0, 'nenhum simulado sorteado junta irmãs');
  ok(!r.sessaoRuim, 'sessão com todas as questões de família não repete família');
  ok(!errs.length, 'sem erros de JavaScript' + (errs.length ? ': ' + errs[0] : ''));
  await b.close(); console.log(falhas ? `\n${falhas} falha(s)` : '\nTudo certo.'); process.exit(falhas ? 1 : 0);
})();
