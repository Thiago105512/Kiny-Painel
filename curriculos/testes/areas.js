// Teste de navegador (Playwright) da barra de baixo com "Áreas" e da tela de Áreas de estudo:
//  barra com 5 botões (Início · área atual · Áreas · Revisões · Mais), "Curso" dentro do Mais;
//  #/areas com um cartão por área e a atual marcada (aria-current); tocar troca o objetivo e leva à área;
//  conteúdo mostrado segue o objetivo (Medicina não vê ENEM; ENEM e Vestibulares veem as questões do ENEM e não Medicina);
//  Concursos em breve: subáreas → cargos, "Tenho interesse" guardado no perfil, sem trocar o objetivo;
//  encaixe sem estouro em 360/390 px com letra 1 e 1,7, nos temas claro e escuro.
// Rode na raiz:   python3 -m http.server 8765 &   e   node curriculos/testes/areas.js
// SHOTS=<pasta> grava capturas 390x844 (claro e escuro) da barra e da tela de Áreas.
const { chromium } = require('playwright');
const URL = process.env.APP_URL || 'http://localhost:8765/curriculos/app.html';
let falhas = 0; const ok = (c, m) => { console.log((c ? '  ✓ ' : '  ✗ ') + m); if (!c) falhas++; };
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {}); const errs = [];
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  const p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message));
  await p.goto(URL); await p.waitForTimeout(700);
  const go = async h => { await p.evaluate(h => { if (location.hash === h) render({ topo: true }); else location.hash = h; }, h); await p.waitForTimeout(200); };
  const txt = async () => (await p.innerText('#view')).replace(/\s+/g, ' ');
  const barra = () => p.evaluate(() => [...document.querySelectorAll('#nav-inferior > a, #nav-inferior > button')].map(e => ({ t: e.querySelector('span').textContent, h: e.getAttribute('href'), cur: e.getAttribute('aria-current'), lab: e.getAttribute('aria-label') })));
  const nEnem = await p.evaluate(() => questoes().filter(q => q.t === 'enem').length);

  console.log('1) Sem objetivo: barra com "Estudar"');
  await p.evaluate(() => { const P = store.doc('perfil'); P.boasVindas = true; store.mudou('perfil'); }); await go('#/');
  let bar = await barra();
  ok(bar.length === 5 && bar.map(x => x.t).join('|') === 'Início|Estudar|Áreas|Revisões|Mais', 'barra: ' + bar.map(x => x.t).join(' · '));
  ok(bar[1].h === '#/estudar', 'sem objetivo, o 2º botão leva a Estudar');

  console.log('2) Tela de Áreas');
  await p.click('#nav-inferior a[href="#/areas"]'); await p.waitForTimeout(250);
  ok(await p.evaluate(() => location.hash) === '#/areas', 'botão Áreas abre #/areas');
  bar = await barra(); ok(bar[2].cur === 'page', 'Áreas fica marcado (aria-current) na barra');
  const cartoes = await p.evaluate(() => [...document.querySelectorAll('#view .area-card')].map(e => e.querySelector('b').textContent));
  ok(['Medicina — graduação', 'Residência médica', 'ENEM', 'Vestibulares', 'Direito — graduação', 'OAB', 'Concursos'].every(n => cartoes.includes(n)), 'cartões: ' + cartoes.join(', '));
  let t = await txt();
  ok(/progresso em cada área fica guardado/.test(t), 'linha avisando que o progresso fica guardado');
  ok(/PSC\/UFAM, SIS\/UEA e Macro\/UEA — por enquanto com as questões no estilo ENEM/.test(t), 'Vestibulares explica que usa as questões no estilo ENEM');
  ok(await p.$('#view .nav-voltar .voltar') !== null, 'tela tem o botão Voltar');
  ok(await p.evaluate(() => [...document.querySelectorAll('#view .area-card')].every(e => e.getBoundingClientRect().height >= 44)), 'cartões com alvo ≥ 44 px');

  console.log('3) Trocar para Medicina');
  await p.click('[data-act="area-escolher"][data-v="medicina"]'); await p.waitForTimeout(300);
  ok(await p.evaluate(() => store.doc('perfil').objetivo) === 'medicina', 'objetivo do perfil = medicina');
  ok(await p.evaluate(() => location.hash) === '#/medicina', 'levou para a página da Medicina');
  ok(/Agora você está estudando Medicina/.test(await p.evaluate(() => [...document.querySelectorAll('.toast')].map(e => e.textContent).join('|'))), 'toast "Agora você está estudando Medicina"');
  bar = await barra();
  ok(bar.map(x => x.t).join('|') === 'Início|Medicina|Áreas|Revisões|Mais' && bar[1].cur === 'page', 'barra: Início · Medicina (atual) · Áreas · Revisões · Mais');
  ok(!bar.some(x => x.t === 'Curso'), '"Curso" saiu da barra');
  await p.click('[data-act="menu-mais"]'); await p.waitForTimeout(150);
  ok(await p.$('#camada a[href="#/curso"]') !== null, '"Meu curso" está dentro do Mais');
  ok(!/ENEM|Redação/.test(await p.innerText('#camada')), 'Mais da Medicina sem ENEM/Redação');
  await p.click('#camada a[href="#/curso"]'); await p.waitForTimeout(250);
  ok(await p.evaluate(() => location.hash) === '#/curso' && !(await p.$('#camada .folha')), 'Mais → Meu curso abre o curso');
  const med = await p.evaluate(() => ({ q: filtrarQuestoes({ ...FQ, trilha: '' }).every(q => ['medicina', 'residencia'].includes(q.t)), temas: Object.values(TEMAS).filter(temaDoObjetivo).every(t => t.dominio !== 'enem'), enem: questoes().filter(doObjetivo).some(q => q.t === 'enem') }));
  ok(med.q && med.temas && !med.enem, 'Medicina não vê questões nem temas do ENEM');
  await go('#/areas');
  ok(await p.evaluate(() => document.querySelector('.area-card[aria-current="true"]')?.dataset.v) === 'medicina', 'na tela de Áreas, Medicina marcada como atual (aria-current)');

  console.log('4) ENEM e Vestibulares');
  await p.click('[data-act="area-escolher"][data-v="enem"]'); await p.waitForTimeout(300);
  ok(await p.evaluate(() => store.doc('perfil').objetivo === 'enem' && location.hash === '#/enem'), 'ENEM: objetivo trocado e página do ENEM aberta');
  const vEnem = await p.evaluate(() => ({ n: questoes().filter(doObjetivo).length, med: questoes().filter(doObjetivo).some(q => q.t !== 'enem') }));
  ok(vEnem.n === nEnem && !vEnem.med && nEnem === 278, `ENEM vê as ${vEnem.n} questões do ENEM e nada de Medicina`);
  await go('#/areas'); await p.click('[data-act="area-escolher"][data-v="vestibulares"]'); await p.waitForTimeout(300);
  ok(await p.evaluate(() => store.doc('perfil').objetivo === 'vestibulares' && location.hash === '#/enem'), 'Vestibulares: objetivo trocado e página principal (matriz do ENEM) aberta');
  ok(/Agora você está estudando Vestibulares/.test(await p.evaluate(() => [...document.querySelectorAll('.toast')].map(e => e.textContent).join('|'))), 'toast "Agora você está estudando Vestibulares"');
  t = await txt();
  ok(/Vestibulares/.test(await p.innerText('#view h1')) && /PSC\/UFAM, SIS\/UEA, Macro\/UEA\) — por enquanto com as questões no estilo ENEM/.test(t), 'página diz que Vestibulares usa por enquanto as questões no estilo ENEM');
  const vVest = await p.evaluate(() => ({ n: questoes().filter(doObjetivo).length, med: questoes().filter(doObjetivo).some(q => q.t !== 'enem'), trilhas: trilhasDoObjetivo().join(','), temas: Object.values(TEMAS).filter(temaDoObjetivo).every(t => t.dominio === 'enem') }));
  ok(vVest.n === nEnem && !vVest.med && vVest.trilhas === 'enem' && vVest.temas, `Vestibulares vê as mesmas ${vVest.n} do ENEM (trilhas: ${vVest.trilhas}) e nenhum tema de Medicina`);
  bar = await barra();
  ok(bar[1].t === 'Vestibular' && /Vestibulares/.test(bar[1].lab) && bar[1].cur === 'page', 'barra mostra a área "Vestibular" (rótulo completo no aria-label) marcada');
  await go('#/questoes');
  ok(await p.evaluate(() => filtrarQuestoes(FQ).every(q => q.t === 'enem') && filtrarQuestoes(FQ).length > 0), 'Questões: só ENEM');
  await go('#/desempenho');
  ok(await p.evaluate(() => !document.querySelector('[data-act="dv-trilha"][data-v="medicina"]') && !document.querySelector('[data-act="dv-aba"][data-v="especialidade"]')), 'Desempenho sem Medicina');
  await go('#/biblioteca/guia');
  const guias = await p.evaluate(() => [...document.querySelectorAll('#view details summary')].map(s => s.textContent).join('|'));
  ok(guias && !/Medicina|Residência|Direito|OAB/.test(guias), 'Biblioteca: guias só de ENEM/vestibulares');
  await go('#/busca/insuficiencia%20cardiaca');
  ok(!/Cardiologia|Insuficiência cardíaca ·/.test(await txt()), 'busca sem conteúdo de Medicina');
  ok(await p.evaluate(() => [...document.querySelectorAll('#dl-temas option')].every(o => /^ENEM/.test(o.textContent))), 'autocompletar de temas só do ENEM');
  await go('#/simulados');
  ok(await p.evaluate(() => SIM.t) === 'enem', 'simulado na trilha do ENEM');
  await p.evaluate(() => ACOES['menu-mais']()); await p.waitForTimeout(100);
  const mais = await p.innerText('#camada');
  ok(/Redação/.test(mais) && !/Medicina|Casos clínicos|Meu curso/.test(mais), 'Mais dos Vestibulares com Redação e sem Medicina/Casos/Curso');
  await p.evaluate(() => fecharFolha());
  ok(await p.evaluate(() => /vestibulares \(PSC\/UFAM, SIS\/UEA e Macro\/UEA/.test(instrucoesCV())), 'Modo conversa: tutor de vestibulares');

  console.log('5) Concursos (em breve)');
  await go('#/areas');
  await p.click('#view a.area-card[href="#/concursos"]'); await p.waitForTimeout(250);
  ok(await p.evaluate(() => location.hash) === '#/concursos' && /Em breve/.test(await txt()), 'cartão Concursos abre #/concursos, marcado "Em breve"');
  ok(await p.evaluate(() => store.doc('perfil').objetivo) === 'vestibulares', 'objetivo não muda ao abrir Concursos');
  ok(/Seus interesses: nenhum ainda/.test(await txt()), 'linha "Seus interesses" no topo');
  const subs = await p.evaluate(() => [...document.querySelectorAll('#view .area-card b')].map(e => e.textContent));
  ok(subs.length === 9 && subs.includes('Saúde') && subs.includes('Legislativo'), 'subáreas: ' + subs.join(', '));
  ok(subs[0] === 'CNU — Concurso Nacional Unificado' && await p.evaluate(() => document.querySelector('#view .area-card').classList.contains('destaque')), 'CNU aparece primeiro, em destaque');
  await p.click('#view a.area-card[href="#/concursos/cnu"]'); await p.waitForTimeout(250);
  const blocos = await p.evaluate(() => [...document.querySelectorAll('#view .cargo-card b')].map(e => e.textContent));
  ok(await p.evaluate(() => location.hash) === '#/concursos/cnu' && /Blocos temáticos/.test(await txt()) && blocos.length === 9 && /^Seguridade Social/.test(blocos[0]), `CNU abre com os blocos temáticos (${blocos.length})`);
  ok(/Fonte: edital CNU 2025/.test(await txt()) && !(await p.$('#view a[href^="http"]')), 'fonte em texto pequeno ("Fonte: edital CNU 2025"), sem link');
  ok(await p.$$eval('#view [data-act="conc-interesse"]', e => e.length) === 9, 'cada bloco com "Tenho interesse"');
  await p.click('#view .nav-voltar .voltar'); await p.waitForTimeout(250);
  await p.click('#view a.area-card[href="#/concursos/saude"]'); await p.waitForTimeout(250);
  const cargos = await p.evaluate(() => [...document.querySelectorAll('#view .cargo-card b')].map(e => e.textContent));
  ok(cargos.join('|') === 'Médico(a)|Enfermeiro(a)|Técnico(a) de Enfermagem', 'Saúde: ' + cargos.join(', '));
  ok(/Conteúdo em preparação/.test(await txt()), 'cada cargo: "Conteúdo em preparação"');
  await p.click('#view a[href="#/concursos/saude/medico"]'); await p.waitForTimeout(250);
  ok(await p.evaluate(() => location.hash) === '#/concursos/saude/medico' && /Médico\(a\)/.test(await p.innerText('#view h1')), 'cargo Médico(a) abre a página do cargo');
  await p.click('[data-act="conc-interesse"]'); await p.waitForTimeout(200);
  ok(await p.evaluate(() => document.querySelector('[data-act="conc-interesse"]').getAttribute('aria-pressed')) === 'true', '"Tenho interesse" fica marcado (aria-pressed)');
  ok(await p.evaluate(() => JSON.stringify(store.doc('perfil').interessesConcursos)) === '["saude/medico"]', 'interesse guardado no perfil');
  ok(await p.evaluate(() => store.doc('perfil').objetivo) === 'vestibulares', 'objetivo continua Vestibulares');
  await p.click('#view .nav-voltar .voltar'); await p.waitForTimeout(250);
  ok(await p.evaluate(() => location.hash) === '#/concursos/saude', 'Voltar leva para a subárea');
  await p.reload(); await p.waitForTimeout(700); await go('#/concursos');
  ok(/Seus interesses: Médico\(a\)/.test(await txt()), 'interesse persiste depois de reabrir o app');
  bar = await barra(); ok(bar[2].cur === 'page', 'em Concursos, o botão Áreas fica marcado');

  console.log('6) Perfil e boas-vindas');
  await p.evaluate(() => ACOES['perfil-fac']()); await p.waitForTimeout(150);
  const opts = await p.evaluate(() => [...document.querySelectorAll('#pf-obj option')].map(o => o.value));
  ok(opts.includes('vestibulares') && !opts.includes('concursos') && await p.$eval('#pf-obj', e => e.value) === 'vestibulares', 'seletor do Perfil com Vestibulares (sem Concursos) e já selecionado');
  await p.evaluate(() => fecharFolha());
  ok(await p.evaluate(() => OBJ_BV.some(o => o[0] === 'vestibulares') && !OBJ_BV.some(o => o[0] === 'concursos')), 'boas-vindas oferecem Vestibulares (e não Concursos)');

  console.log('7) Encaixe da barra e das telas (360/390 px, letra 1 e 1,7)');
  const problemas = [];
  for (const w of [360, 390]) for (const k of ['1', '1.7']) {
    await p.setViewportSize({ width: w, height: 844 });
    for (const [obj, r] of [['vestibulares', '#/areas'], ['residencia', '#/areas'], ['medicina', '#/concursos'], ['medicina', '#/concursos/policial-seguranca'], ['medicina', '#/concursos/cnu'], ['medicina', '#/concursos/cnu/bloco-1'], ['medicina', '#/concursos/saude/tecnico-enfermagem']]) {
      await p.evaluate(o => { store.doc('perfil').objetivo = o; }, obj); await go(r);
      await p.evaluate(k => document.documentElement.style.setProperty('--k', k), k); await p.waitForTimeout(80);
      const res = await p.evaluate(() => {
        const out = [], W = document.documentElement.clientWidth;
        if (document.documentElement.scrollWidth > W + 1) out.push('rolagem lateral');
        for (const e of document.querySelectorAll('#nav-inferior span')) if (e.scrollWidth > e.clientWidth + 1) out.push('rótulo cortado na barra: ' + e.textContent);
        for (const e of document.querySelectorAll('#view .area-card, #view .cargo-card, #view .area-card *, #view .cargo-card *')) { const rc = e.getBoundingClientRect(); if (rc.right > W + 1) out.push('sai da tela: ' + e.textContent.trim().slice(0, 30)); }
        for (const e of document.querySelectorAll('#nav-inferior > *, #view .area-card, #view .cargo-card a, #view [data-act="conc-interesse"]')) if (e.getBoundingClientRect().height < 44) out.push('alvo < 44 px: ' + e.textContent.trim().slice(0, 20));
        return out;
      });
      res.forEach(x => problemas.push(`${x} (${r} ${obj} @${w}px k=${k})`));
    }
  }
  ok(!problemas.length, problemas.length ? 'problemas: ' + [...new Set(problemas)].slice(0, 6).join(' | ') : 'sem estouro nem rótulo cortado; alvos ≥ 44 px');
  await p.evaluate(() => document.documentElement.style.setProperty('--k', ls.get('gab2:letra', 1.25)));

  console.log('8) Temas claro e escuro: foco visível e contraste da área atual');
  for (const esquema of ['light', 'dark']) {
    const c2 = await b.newContext({ viewport: { width: 390, height: 844 }, colorScheme: esquema }); const q = await c2.newPage(); q.on('pageerror', e => errs.push(e.message));
    await q.goto(URL); await q.waitForTimeout(600);
    await q.evaluate(() => { const P = store.doc('perfil'); P.objetivo = 'medicina'; P.boasVindas = true; store.mudou('perfil'); location.hash = '#/areas'; }); await q.waitForTimeout(300);
    const r = await q.evaluate(() => {
      const cv = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
      const rgb = c => { cv.clearRect(0, 0, 1, 1); cv.fillStyle = c; cv.fillRect(0, 0, 1, 1); return [...cv.getImageData(0, 0, 1, 1).data].slice(0, 3); };
      const lum = a => { const f = x => { x /= 255; return x <= .04045 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4; }; return .2126 * f(a[0]) + .7152 * f(a[1]) + .0722 * f(a[2]); };
      const raz = (a, b) => { const x = lum(rgb(a)), y = lum(rgb(b)); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); };
      const atual = document.querySelector('.area-card[aria-current="true"]'), bg = getComputedStyle(atual).backgroundColor;
      const nav = document.querySelector('#nav-inferior'), navBg = getComputedStyle(nav).backgroundColor;
      const atualBar = document.querySelector('#nav-inferior [aria-current="page"]');
      atual.focus(); const foco = getComputedStyle(atual);
      return { tit: raz(getComputedStyle(atual.querySelector('b')).color, bg), desc: raz(getComputedStyle(atual.querySelector('small')).color, bg),
        barra: raz(getComputedStyle(atualBar).color, navBg), outros: Math.min(...[...nav.querySelectorAll(':scope > :not([aria-current])')].map(e => raz(getComputedStyle(e).color, navBg))),
        foco: foco.outlineStyle !== 'none' && parseFloat(foco.outlineWidth) >= 2 };
    });
    ok(r.tit >= 4.5 && r.desc >= 4.5 && r.barra >= 4.5 && r.outros >= 4.5, `${esquema}: contraste do cartão atual ${r.tit.toFixed(1)}/${r.desc.toFixed(1)}, barra ${r.barra.toFixed(1)} (atual) e ${r.outros.toFixed(1)} (demais) ≥ 4,5`);
    ok(r.foco, `${esquema}: foco visível no cartão`);
    if (process.env.SHOTS) {
      await q.evaluate(() => { location.hash = '#/areas'; }); await q.waitForTimeout(200); await q.evaluate(() => document.activeElement?.blur());
      await q.screenshot({ path: `${process.env.SHOTS}/areas-${esquema === 'dark' ? 'escuro' : 'claro'}.png` });
      await q.evaluate(() => { location.hash = '#/medicina'; }); await q.waitForTimeout(250);
      await q.screenshot({ path: `${process.env.SHOTS}/barra-${esquema === 'dark' ? 'escuro' : 'claro'}.png`, clip: { x: 0, y: 844 - 140, width: 390, height: 140 } });
      await q.evaluate(() => { document.documentElement.style.setProperty('--k', '1.7'); location.hash = '#/areas'; }); await q.waitForTimeout(250);
      await q.screenshot({ path: `${process.env.SHOTS}/areas-enorme-${esquema === 'dark' ? 'escuro' : 'claro'}.png` });
      await q.evaluate(() => { location.hash = '#/concursos'; }); await q.waitForTimeout(250);
      await q.screenshot({ path: `${process.env.SHOTS}/concursos-enorme-${esquema === 'dark' ? 'escuro' : 'claro'}.png` });
      await q.evaluate(() => { location.hash = '#/concursos/saude'; }); await q.waitForTimeout(250);
      await q.screenshot({ path: `${process.env.SHOTS}/concursos-saude-enorme-${esquema === 'dark' ? 'escuro' : 'claro'}.png` });
    }
    await c2.close();
  }

  ok(!errs.length, errs.length ? 'erros de JS: ' + [...new Set(errs)].join(' | ') : 'Sem erros de JS');
  await b.close(); console.log(falhas ? `${falhas} FALHA(S)` : 'ÁREAS OK'); process.exit(falhas ? 1 : 0);
})();
