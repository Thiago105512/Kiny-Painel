// Teste de navegador (Playwright): proporção e encaixe do texto em todas as telas, nos 3 tamanhos de letra,
// em 360 e 390 px. Aponta: texto que sai da caixa (horizontal), palavras cortadas, títulos desproporcionais
// rolagem lateral da página, palavras partidas no meio (sem hífen) e contraste baixo (claro e escuro). Rode na raiz:  python3 -m http.server 8765 &  e  node curriculos/testes/letras.js
const { chromium } = require('playwright');
const URL = process.env.APP_URL || 'http://localhost:8765/curriculos/app.html';
const rotas = require('fs').readFileSync(__dirname + '/fumaca.js', 'utf8').match(/const rotas=\[([\s\S]*?)\];/)[1].match(/'([^']+)'/g).map(s => s.slice(1, -1))
  .concat(['/estudar', '/estudar/atlas', '/curso', '/curso/disciplinas', '/curso/agenda', '/medicina/area/clinica-medica'])
  // jogos em andamento (a tela da partida, não só a abertura)
  .concat(['caso', 'termo', 'pares', 'anatomia', 'triagem', 'emergencia', 'cascata', 'quemsou', 'milhao', 'caca', 'vf', 'vidas'].map(j => 'jogo:' + j));
let total = 0; const achados = {};
const medirContraste = () => {
  const cv = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  const rgba = c => { cv.clearRect(0, 0, 1, 1); cv.fillStyle = '#000'; cv.fillStyle = c; cv.fillRect(0, 0, 1, 1); const d = cv.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
  const lum = ([r, g, b]) => { const f = x => { x /= 255; return x <= .04045 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4; }; return .2126 * f(r) + .7152 * f(g) + .0722 * f(b); };
  const razao = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); };
  const mistura = (f, b) => [0, 1, 2].map(i => f[i] * f[3] + b[i] * (1 - f[3]));
  const fundo = e => { const pilha = []; for (let x = e; x; x = x.parentElement) { const cs = getComputedStyle(x); if (cs.backgroundImage !== 'none' && !x.matches('.ilu,.forma')) return null; const c = rgba(cs.backgroundColor); if (c[3] > 0) { pilha.push(c); if (c[3] >= 1) break; } }
    let b = [255, 255, 255]; if (!pilha.length || pilha[pilha.length - 1][3] < 1) b = rgba(getComputedStyle(document.body).backgroundColor).slice(0, 3);
    for (const c of pilha.reverse()) b = mistura(c, b); return b; };
  const out = [];
  for (const e of document.querySelectorAll('#view *')) {
    if (![...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) continue;
    if (e.closest('svg,[disabled],.riscada,[aria-hidden="true"],.mes .fora,.fechada,.par-item[data-s="ok"],.alt[data-s="fora"],.monitor .mon-ritmo')) continue;
    let op = 1; for (let x = e; x; x = x.parentElement) op *= +getComputedStyle(x).opacity; if (op < .99) continue;
    const cs = getComputedStyle(e), r = e.getBoundingClientRect(); if (!r.width || cs.visibility === 'hidden') continue;
    const bg = fundo(e); if (!bg) continue;
    const fg = rgba(cs.color), cor = mistura(fg, bg), q = razao(cor, bg);
    const px = parseFloat(cs.fontSize), grande = px >= 24 || (px >= 18.66 && +cs.fontWeight >= 700);
    if (q < (grande ? 3 : 4.5)) out.push(`${q.toFixed(2)} ${e.tagName.toLowerCase()}.${String(e.className).split(' ')[0]} "${e.textContent.trim().slice(0, 30)}"`);
  }
  return [...new Set(out)].slice(0, 8);
};

(async () => {
  const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
  for (const w of [360, 390]) for (const k of ['1', '1.25', '1.45', '1.7']) {
    const p = await b.newPage({ viewport: { width: w, height: 800 } });
    await p.goto(URL + '#/'); await p.waitForTimeout(500);
    await p.evaluate(k => { document.documentElement.style.setProperty('--k', k); }, k);
    for (const r of rotas) {
      if (r.startsWith('jogo:')) await p.evaluate(id => { location.hash = '#/jogos/' + id; JG.modoNovo = 'treino'; iniciarJogo(id); }, r.slice(5));
      else await p.evaluate(r => { location.hash = '#' + r; }, r);
      await p.waitForTimeout(160);
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
        // palavra partida no meio (sem hífen): o texto deve descer inteiro para a linha de baixo
        const tw = document.createTreeWalker(document.querySelector('#view'), NodeFilter.SHOW_TEXT); let tn;
        while ((tn = tw.nextNode())) {
          const t = tn.textContent, pe = tn.parentElement; if (!t.trim() || !pe || pe.closest('svg,.caca-grade,.termo-grade,.mm,pre,table,input,textarea,.desafios,[style*="overflow"]')) continue;
          const re = /[A-Za-zÀ-ÖØ-öø-ÿ₂]{4,}/g; let m;
          while ((m = re.exec(t))) { const rg = document.createRange(); rg.setStart(tn, m.index); rg.setEnd(tn, m.index + m[0].length);
            const rs = [...rg.getClientRects()].filter(x => x.width > 0); if (rs.length > 1 && Math.abs(rs[0].top - rs[rs.length - 1].top) > 3) out.push('palavra partida: "' + m[0] + '" em ' + nome(pe)); }
        }
        const h1 = document.querySelector('.titulo h1'); if (h1 && h1.getBoundingClientRect().height > 4.5 * parseFloat(getComputedStyle(h1).lineHeight || 30)) out.push('título ocupa mais de 4 linhas: ' + h1.textContent.slice(0, 40));
        return [...new Set(out)].slice(0, 6);
      });
      if (res.length) { total += res.length; res.forEach(x => { (achados[x.replace(/\(\d+px\)/, '')] = achados[x.replace(/\(\d+px\)/, '')] || new Set()).add(`${r} @${w}px k=${k}`); }); }
    }
    await p.close();
  }
  // Contraste de verdade (cores calculadas pelo navegador, com color-mix), nos temas claro e escuro:
  // texto normal ≥ 4,5:1 e texto grande ≥ 3:1 (ignora desabilitado/riscado e fundos em degradê).
  for (const esquema of ['light', 'dark']) {
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, colorScheme: esquema }); const p = await ctx.newPage();
    await p.goto(URL + '#/'); await p.waitForTimeout(500);
    for (const r of ['/', '/questoes', '/jogos', '/jornada', '/casos', '/casos/caso-malaria-vivax', '/medicina', '/estudar', '/revisoes', '/biblioteca', '/simulados', '/desempenho', '/curso',
      'jogo:triagem', 'jogo:termo', 'jogo:milhao', 'jogo:quemsou', 'jogo:emergencia', 'jogo:vidas', 'jogo:caso', 'jogo:caca', 'jogo:pares', 'jogo:defesa', 'jogo:cascata']) {
      if (r.startsWith('jogo:')) await p.evaluate(id => { location.hash = '#/jogos/' + id; JG.modoNovo = 'treino'; iniciarJogo(id); if (id === 'termo') { 'SOPRO'.split('').forEach(termoTecla); termoTecla('ENTER'); } }, r.slice(5));
      else await p.evaluate(r => { location.hash = '#' + r; }, r);
      await p.waitForTimeout(200); await p.evaluate(() => document.querySelectorAll('.folha').forEach(() => fecharFolha()));
      const res = await p.evaluate(medirContraste);
      if (res.length) { total += res.length; res.forEach(x => { (achados['contraste baixo: ' + x] = achados['contraste baixo: ' + x] || new Set()).add(`${r} (${esquema})`); }); }
    }
    await ctx.close();
  }
  for (const [x, onde] of Object.entries(achados)) console.log('✗ ' + x + '\n    ' + [...onde].slice(0, 4).join(' | ') + (onde.size > 4 ? ` (+${onde.size - 4})` : ''));
  await b.close(); console.log(total ? `${Object.keys(achados).length} PROBLEMA(S) DE LETRA/ENCAIXE` : 'LETRAS E ENCAIXE OK'); process.exit(total ? 1 : 0);
})();
