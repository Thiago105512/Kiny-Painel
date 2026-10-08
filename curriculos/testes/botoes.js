// Teste de navegador (Playwright): links internos em texto viram botões/chips.
// Nas páginas principais (Medicina e ENEM), nenhum link interno visível (#/… ou "#" com ação) pode estar
// sublinhado, e todos precisam de altura ≥ 44 px; links externos (http) mostram ↗. Também confere
// encaixe dos chips a 360 px com letra Enorme (nada sai da tela) e contraste ≥ 4,5:1 nos temas claro e escuro.
// Rode na raiz:   python3 -m http.server 8765 &   e   node curriculos/testes/botoes.js
// SHOTS=<pasta> grava capturas 390x844 do Início ("Estudado hoje") e da página de uma questão.
const { chromium } = require('playwright');
const URL = process.env.APP_URL || 'http://localhost:8765/curriculos/app.html';
let falhas = 0; const ok = (c, m) => { console.log((c ? '  ✓ ' : '  ✗ ') + m); if (!c) falhas++; };
const ROTAS_MED = ['/', '/medicina', '/medicina/inst/ufam', '/medicina/especialidades', '/medicina/esp/cardiologia', '/medicina/area/clinica-medica', '/tema/hipertensao-arterial',
  '/tema/hipertensao-arterial/questoes', '/tema/hipertensao-arterial/flashcards', '/tema/hipertensao-arterial/casos', '/tema/hipertensao-arterial/desempenho', '/questoes', 'Q', '/erros',
  '/flashcards', '/revisoes', '/revisoes/erros', '/casos', '/casos/caso-malaria-vivax', '/simulados', '/plano', '/desempenho', '/biblioteca', '/biblioteca/guia', '/biblioteca/questoes',
  '/busca/insuficiencia%20cardiaca', '/curso', '/curso/disciplinas', '/curso/agenda', '/estudar', '/jogos', '/jornada', '/areas', '/concursos', '/concursos/saude', '/concursos/saude/medico'];
const ROTAS_ENEM = ['/', '/enem', '/enem/matematica', '/enem/matematica/matematica', '/redacao', '/redacao/repertorios', '/questoes', 'Q', '/desempenho', '/busca/fun%C3%A7%C3%A3o', '/revisoes'];
const medir = () => {
  const out = [];
  for (const a of document.querySelectorAll('#view a[href]')) {
    const r = a.getBoundingClientRect(), cs = getComputedStyle(a); if (!r.width || cs.visibility === 'hidden' || a.closest('[hidden],details:not([open]) > :not(summary)')) continue;
    const h = a.getAttribute('href'), nome = `"${a.textContent.trim().replace(/\s+/g, ' ').slice(0, 30)}"`;
    if (h.startsWith('#')) {
      if (cs.textDecorationLine.includes('underline')) out.push('sublinhado: ' + nome);
      if (r.height < 43.5) out.push(`baixo (${Math.round(r.height)} px): ${nome} em .${String(a.parentElement.className).split(' ')[0] || a.parentElement.tagName.toLowerCase()}`);
    } else if (/^https?:/.test(h) && !/↗/.test(getComputedStyle(a, '::after').content)) out.push('externo sem ↗: ' + nome);
  }
  return out;
};
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {}); const errs = [];
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  const p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message));
  await p.goto(URL); await p.waitForTimeout(700);
  const go = async h => { await p.evaluate(h => { if (location.hash === h) render({ topo: true }); else location.hash = h; }, h); await p.waitForTimeout(160); };
  /* Perfil de Medicina com estudo de hoje (para o "Estudado hoje"), erros e revisões */
  const qid = await p.evaluate(() => {
    const P = store.doc('perfil'); Object.assign(P, { objetivo: 'medicina', faculdade: 'ufam', gradeId: gradesDe('ufam', 'medicina').find(g => itensGrade(g).length)?.id || null, periodo: 3, boasVindas: true }); store.mudou('perfil');
    const qs = questoes().filter(q => q.t === 'medicina' && q.tema).slice(0, 4);
    qs.forEach((q, i) => registrarResposta(q, i % 2 ? q.c : (q.c + 1) % 5, 4000, 'pratica'));
    return qs[0].id;
  });
  const varrer = async (rotas, rot) => {
    const achados = {};
    for (const r of rotas) {
      await go(r === 'Q' ? '#/questoes/q/' + qid : '#' + r);
      (await p.evaluate(medir)).forEach(x => (achados[x] = achados[x] || []).push(r));
    }
    const lista = Object.entries(achados);
    ok(!lista.length, lista.length ? `${rot}: ${lista.length} link(s) fora do padrão — ` + lista.slice(0, 10).map(([x, rs]) => `${x} [${rs.slice(0, 2).join(', ')}]`).join(' | ') : `${rot}: ${rotas.length} páginas, links internos sem sublinhado e ≥ 44 px; externos com ↗`);
  };
  console.log('1) Medicina');
  await go('#/');
  ok(await p.evaluate(() => { const a = document.querySelector('.estudados-hoje a'); return !!a && getComputedStyle(a).textDecorationLine === 'none' && a.getBoundingClientRect().height >= 44 && getComputedStyle(a).borderTopStyle !== 'none'; }), 'Início: "Estudado hoje" com temas em botões (borda, sem sublinhado, ≥ 44 px)');
  if (process.env.SHOTS) { await p.evaluate(() => document.querySelector('.estudados-hoje')?.scrollIntoView({ block: 'center' })); await p.screenshot({ path: process.env.SHOTS + '/inicio-estudado-hoje.png' }); }
  await go('#/questoes/q/' + qid);
  ok(await p.evaluate(() => [...document.querySelectorAll('#view a[href^="#/tema/"]')].some(a => getComputedStyle(a).textDecorationLine === 'none' && a.getBoundingClientRect().height >= 44)), 'página da questão: link do tema vira botão');
  if (process.env.SHOTS) { await p.evaluate(() => document.querySelector('#view a[href^="#/tema/"]')?.scrollIntoView({ block: 'center' })); await p.screenshot({ path: process.env.SHOTS + '/questao.png' }); }
  await varrer(ROTAS_MED, 'Medicina');
  console.log('2) ENEM');
  await p.evaluate(() => { store.doc('perfil').objetivo = 'enem'; store.mudou('perfil'); const q = questoes().find(x => x.t === 'enem' && x.tema); registrarResposta(q, (q.c + 1) % 5, 4000, 'pratica'); });
  await varrer(ROTAS_ENEM, 'ENEM');
  console.log('3) Letra Enorme a 360 px: chips quebram em linhas sem sair da tela');
  await p.evaluate(() => { store.doc('perfil').objetivo = 'medicina'; store.mudou('perfil'); });
  await p.setViewportSize({ width: 360, height: 800 });
  const fora = [];
  for (const r of ['/', 'Q', '/tema/hipertensao-arterial', '/desempenho', '/revisoes', '/busca/insuficiencia%20cardiaca', '/curso']) {
    await go(r === 'Q' ? '#/questoes/q/' + qid : '#' + r); await p.evaluate(() => document.documentElement.style.setProperty('--k', '1.7')); await p.waitForTimeout(60);
    (await p.evaluate(() => { const W = document.documentElement.clientWidth, o = []; if (document.documentElement.scrollWidth > W + 1) o.push('rolagem lateral');
      for (const a of document.querySelectorAll('#view a[href^="#"]')) { const rc = a.getBoundingClientRect(); if (rc.width && rc.right > W + 1 && !a.closest('.tabela-wrap,[style*="overflow"],.desafios')) o.push('sai da tela: ' + a.textContent.trim().slice(0, 30)); }
      return o; })).forEach(x => fora.push(`${x} (${r})`));
  }
  ok(!fora.length, fora.length ? fora.slice(0, 6).join(' | ') : 'nada sai da tela');
  await p.evaluate(() => document.documentElement.style.setProperty('--k', ls.get('gab2:letra', 1.25)));
  console.log('4) Contraste e foco dos chips (claro e escuro)');
  for (const esquema of ['light', 'dark']) {
    await p.emulateMedia({ colorScheme: esquema }); await go('#/');
    const r = await p.evaluate(() => {
      const cv = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
      const rgb = c => { cv.clearRect(0, 0, 1, 1); cv.fillStyle = c; cv.fillRect(0, 0, 1, 1); return [...cv.getImageData(0, 0, 1, 1).data].slice(0, 3); };
      const lum = a => { const f = x => { x /= 255; return x <= .04045 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4; }; return .2126 * f(a[0]) + .7152 * f(a[1]) + .0722 * f(a[2]); };
      const a = document.querySelector('.estudados-hoje a'), cs = getComputedStyle(a), x = lum(rgb(cs.color)), y = lum(rgb(cs.backgroundColor));
      a.focus(); const f = getComputedStyle(a);
      return { q: (Math.max(x, y) + .05) / (Math.min(x, y) + .05), foco: f.outlineStyle !== 'none' && parseFloat(f.outlineWidth) >= 2 };
    });
    ok(r.q >= 4.5 && r.foco, `${esquema}: contraste do chip ${r.q.toFixed(1)}:1, foco visível`);
  }
  ok(!errs.length, errs.length ? 'erros de JS: ' + [...new Set(errs)].join(' | ') : 'Sem erros de JS');
  await b.close(); console.log(falhas ? `${falhas} FALHA(S)` : 'BOTÕES OK'); process.exit(falhas ? 1 : 0);
})();
