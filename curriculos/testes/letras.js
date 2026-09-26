// Teste de navegador (Playwright): proporção e encaixe do texto em todas as telas, nos 3 tamanhos de letra,
// em 360 e 390 px. Aponta: texto que sai da caixa (horizontal), palavras cortadas, títulos desproporcionais
// e rolagem lateral da página. Rode na raiz:  python3 -m http.server 8765 &  e  node curriculos/testes/letras.js
const { chromium } = require('playwright');
const URL = process.env.APP_URL || 'http://localhost:8765/curriculos/app.html';
const rotas = require('fs').readFileSync(__dirname + '/fumaca.js', 'utf8').match(/const rotas=\[([\s\S]*?)\];/)[1].match(/'([^']+)'/g).map(s => s.slice(1, -1))
  .concat(['/estudar', '/estudar/atlas', '/curso', '/curso/disciplinas', '/curso/agenda', '/medicina/area/clinica-medica']);
let total = 0; const achados = {};
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
  for (const w of [360, 390]) for (const k of ['1', '1.25', '1.45', '1.7']) {
    const p = await b.newPage({ viewport: { width: w, height: 800 } });
    await p.goto(URL + '#/'); await p.waitForTimeout(500);
    await p.evaluate(k => { document.documentElement.style.setProperty('--k', k); }, k);
    for (const r of rotas) {
      await p.evaluate(r => { location.hash = '#' + r; }, r); await p.waitForTimeout(160);
      await p.evaluate(k => { document.documentElement.style.setProperty('--k', k); }, k);
      const res = await p.evaluate(() => {
        const out = [], W = document.documentElement.clientWidth;
        if (document.documentElement.scrollWidth > W + 1) out.push('rolagem lateral da página (' + document.documentElement.scrollWidth + 'px)');
        const nome = e => e.tagName.toLowerCase() + (e.className && typeof e.className === 'string' ? '.' + e.className.trim().split(/\s+/).slice(0, 2).join('.') : '');
        for (const e of document.querySelectorAll('#view *, .inferior *, .topo *')) {
          if (e.closest('.mapa-corpo,.mon-tracado,.fig-img,.img-zoom,.tabela-wrap,.caca-grade,.desafios,[style*="overflow"],svg,pre,table')) continue;
          const cs = getComputedStyle(e); if (cs.display === 'none' || cs.visibility === 'hidden') continue;
          const rc = e.getBoundingClientRect(); if (!rc.width) continue;
          // texto saindo do próprio elemento
          if (e.scrollWidth > e.clientWidth + 2 && ['hidden', 'clip'].includes(cs.overflowX) && cs.textOverflow !== 'ellipsis') out.push('texto cortado em ' + nome(e) + ': "' + e.textContent.trim().slice(0, 40) + '"');
          // elemento saindo da tela
          if (rc.right > W + 1 && e.children.length === 0 && e.textContent.trim()) out.push('sai da tela: ' + nome(e) + ' "' + e.textContent.trim().slice(0, 40) + '" (' + Math.round(rc.right) + 'px)');
          // título desproporcional: palavra única maior que a largura disponível
          if (/^H[1-3]$/.test(e.tagName) && e.scrollWidth > e.clientWidth + 2) out.push('título estourado: ' + e.textContent.trim().slice(0, 40));
        }
        const h1 = document.querySelector('.titulo h1'); if (h1 && h1.getBoundingClientRect().height > 4.5 * parseFloat(getComputedStyle(h1).lineHeight || 30)) out.push('título ocupa mais de 4 linhas: ' + h1.textContent.slice(0, 40));
        return [...new Set(out)].slice(0, 6);
      });
      if (res.length) { total += res.length; res.forEach(x => { (achados[x.replace(/\(\d+px\)/, '')] = achados[x.replace(/\(\d+px\)/, '')] || new Set()).add(`${r} @${w}px k=${k}`); }); }
    }
    await p.close();
  }
  for (const [x, onde] of Object.entries(achados)) console.log('✗ ' + x + '\n    ' + [...onde].slice(0, 4).join(' | ') + (onde.size > 4 ? ` (+${onde.size - 4})` : ''));
  await b.close(); console.log(total ? `${Object.keys(achados).length} PROBLEMA(S) DE LETRA/ENCAIXE` : 'LETRAS E ENCAIXE OK'); process.exit(total ? 1 : 0);
})();
