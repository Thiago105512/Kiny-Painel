// Teste de navegador (Playwright) da "Contagem regressiva das provas" (app/js/42-provas.js):
// cadastro com data (e recusa sem data), contagem hoje/amanhã/N dias com relógio simulado (page.clock),
// cartão do Início com a mais próxima e as 2 seguintes, provas passadas somem (sem riscado), avaliação de
// Meu curso entrando na contagem, plano até a véspera priorizando temas fracos, recálculo ao mudar a data e
// ao atrasar, dia feito vai para "Feito", exclusão com confirmação na página, Próximo passo usando o plano,
// sugestões por objetivo (Medicina × ENEM), encaixe 360/390 com letra 1 e 1,7, alvos ≥ 44 px e contraste claro/escuro.
// Rode na raiz:   python3 -m http.server 8765 &   e   node curriculos/testes/provas.js
// SHOTS=<pasta> grava capturas 390x844 (Início com cartão, Minhas provas, página da prova, letra enorme).
const { chromium } = require('playwright');
const URL = process.env.APP_URL || 'http://localhost:8765/curriculos/app.html';
const SHOTS = process.env.SHOTS || '';
let falhas = 0; const ok = (c, m) => { console.log((c ? '  ✓ ' : '  ✗ ') + m); if (!c) falhas++; };
const BASE = new Date('2026-10-09T10:00:00');   // relógio simulado (hora local)
const iso = n => { const d = new Date(BASE); d.setDate(d.getDate() + n); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
const em = n => { const d = new Date(BASE); d.setDate(d.getDate() + n); return d; };

(async () => {
  const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {}); const errs = [];
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  const p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message));
  await p.clock.setFixedTime(BASE);
  await p.goto(URL); await p.waitForTimeout(700);
  const go = async h => { await p.evaluate(h => { if (location.hash === h) render({ topo: true }); else location.hash = h; }, h); await p.waitForTimeout(180); };
  const txt = async (sel = 'main') => (await p.innerText(sel)).replace(/\s+/g, ' ');
  const dia = async n => { await p.clock.setFixedTime(em(n)); await p.evaluate(() => render()); await p.waitForTimeout(120); };

  console.log('1) Perfil de Medicina, convite e sugestões');
  const T = await p.evaluate(() => {
    const P = store.doc('perfil'); Object.assign(P, { objetivo: 'medicina', faculdade: 'ufam', gradeId: gradesDe('ufam', 'medicina').find(g => itensGrade(g).length)?.id || null, periodo: 3, boasVindas: true, metas: { questoes: 20, minutos: 60 } }); store.mudou('perfil');
    const us = unidadesDoObjetivo().filter(t => questoesUnidade(t).length >= 6).slice(0, 3);
    // tema 0: fraco (errou tudo) · tema 1: nunca estudado · tema 2: forte (acertou tudo)
    questoesUnidade(us[0]).slice(0, 4).forEach(q => registrarResposta(q, (q.c + 1) % 5, 4000, 'pratica'));
    questoesUnidade(us[2]).slice(0, 4).forEach(q => registrarResposta(q, q.c, 4000, 'pratica'));
    return us;
  });
  ok(T.length === 3, 'três temas de Medicina com questões: ' + T.join(', '));
  await go('#/');
  ok(/Cadastre sua próxima prova/.test(await txt()), 'Início sem provas: convite "Cadastre sua próxima prova"');
  await go('#/provas/nova');
  const sugMed = await p.$$eval('[data-act="prova-sug"]', l => l.map(e => e.textContent.trim()));
  ok(sugMed.some(s => /^Prova de /.test(s)) && sugMed.some(s => /^Residência — /.test(s)), 'Medicina: sugestões "Prova de <disciplina>" e "Residência — <instituição>": ' + sugMed.slice(0, 4).join(' | '));
  ok(!sugMed.some(s => /ENEM|PSC|SIS|Macro/.test(s)), 'Medicina não vê sugestões de ENEM/vestibular');
  ok(await p.evaluate(() => [...document.querySelectorAll('input[name="pv-u"]')].every(c => TEMAS[c.value] && TEMAS[c.value].dominio !== 'enem')), 'lista de temas só do objetivo (sem assuntos do ENEM)');
  ok(await p.evaluate(() => !document.querySelector('#pv-data').value), 'data vem vazia (o app nunca preenche data de prova)');

  console.log('2) Cadastro: sem data não salva; com data salva');
  await p.fill('#pv-nome', 'Prova de Clínica');
  await p.click('form[data-form="prova-salvar"] button.grande'); await p.waitForTimeout(150);
  ok(await p.evaluate(() => registrosProva().length) === 0, 'sem data: nada é salvo');
  ok(/Informe a data/.test(await p.$eval('#pv-erro', e => e.textContent)) && await p.$eval('#pv-data', e => e.getAttribute('aria-invalid')) === 'true', 'sem data: aviso "Informe a data" e campo marcado como inválido');
  await p.fill('#pv-data', iso(-1)); await p.click('form[data-form="prova-salvar"] button.grande'); await p.waitForTimeout(150);
  ok(await p.evaluate(() => registrosProva().length) === 0, 'data no passado: não salva');
  await p.fill('#pv-data', iso(10));
  for (const t of T) { await p.evaluate(t => document.querySelector(`input[name="pv-u"][value="${t}"]`).closest('details').open = true, t); await p.check(`input[name="pv-u"][value="${t}"]`); }
  await p.click('form[data-form="prova-salvar"] button.grande'); await p.waitForTimeout(250);
  const pid = await p.evaluate(() => registrosProva()[0]?.id);
  const reg = await p.evaluate(id => store.doc('plano').itens[id], pid);
  ok(reg && reg.dataProva === iso(10) && reg.temas.length === 3 && reg.tipo === 'prova' && !('data' in reg), 'salva em plano.itens com tipo "prova", dataProva e temas (sem campo "data" de item do plano)');
  ok(await p.evaluate(() => location.hash) === '#/provas/' + pid, 'depois de salvar abre a página da prova');
  ok(await p.evaluate(() => !itensPlano().some(x => x.tipo === 'prova') && !pendencias().plano.some(x => x.tipo === 'prova')), 'a prova não vira item do Planejamento nem pendência');

  console.log('3) Plano até a véspera, priorizando temas fracos');
  const pl = await p.evaluate(id => prepDe(provaPorId(id)), pid);
  const ds = pl.dias.map(x => x.d);
  ok(ds[0] === iso(0) && ds[ds.length - 1] === iso(9) && ds.every(d => d < iso(10)), `um dia por dia, de hoje até a véspera (${ds.length} dias: ${ds[0]} → ${ds[ds.length - 1]})`);
  ok(pl.dias.at(-1).tipo === 'vespera' && pl.dias.at(-1).nq < 20, 'véspera leve (erros + flashcards, menos questões)');
  ok(pl.dias[0].u[0] === T[0], 'primeiro dia: o tema com pior desempenho');
  const idx = t => pl.dias.findIndex(x => x.u.includes(t));
  ok(idx(T[0]) < idx(T[1]) && idx(T[1]) < idx(T[2]), 'ordem: fraco → nunca estudado → forte');
  ok(pl.dias.filter(x => x.tipo === 'revisao').length >= 1 && pl.dias.findIndex(x => x.tipo === 'revisao') > pl.dias.findIndex(x => x.tipo === 'estudo'), 'revisão do que já viu perto da data');
  ok(pl.dias.filter(x => x.tipo !== 'vespera').every(x => x.nq === 20), 'questões por dia = meta diária do perfil (20)');
  ok(/Estudar hoje/.test(await txt()) && /Próximos dias/.test(await txt()), 'página da prova: "Estudar hoje" e lista de dias');

  console.log('4) Cartão do Início: a mais próxima e as próximas 2');
  await p.evaluate(() => {
    const P = store.doc('plano'); [['pvb', 'Prova de Pediatria', 20], ['pvc', 'Residência — UFAM', 30], ['pvd', 'Prova distante', 40]].forEach(([id, nome, n]) => { P.itens[id] = { id, tipo: 'prova', nome, dataProva: somaDias(hoje(), n), temas: [], peso: 1, dom: 'medicina' }; }); store.mudou('plano');
  });
  await go('#/');
  let card = await txt('.pv-cartao');
  ok(/Prova de Clínica/.test(card) && /Faltam 10 dias/.test(card), 'mais próxima em destaque: "Faltam 10 dias"');
  ok(await p.$eval('.pv-num b', e => e.textContent) === '10' && await p.$eval('.pv-num b', e => parseFloat(getComputedStyle(e).fontSize)) >= 48, 'número grande (≥ 48 px)');
  ok(await p.$$eval('.pv-cartao .pv-prox', l => l.length) === 2 && /Pediatria/.test(card) && /Residência/.test(card) && !/distante/.test(card), 'as próximas 2 provas, menores (a 4ª não aparece)');
  ok(await p.$eval('.pv-cartao', e => e.dataset.nivel) === 'longe', 'cor pela proximidade: 10 dias = "longe"');
  ok(await p.$('.pv-cartao .meter') !== null && await p.$('.pv-cartao [data-act="prova-estudar"]') !== null && await p.$('.pv-cartao a[href="#/provas"]') !== null, 'barra do plano e botões "Estudar para esta prova" e "Minhas provas"');
  ok(!(await p.$('.pv-convite')), 'com provas, o convite some');

  console.log('5) Avaliação de Meu curso entra na contagem');
  const aid = await p.evaluate(() => { const A = acad(), g = minhaGrade(), it = itensGrade(g).find(x => sitDe(x) === 'cursando' && temasDoItem(x).length) || itensGrade(g).find(x => sitDe(x) === 'cursando');
    A.aval.avteste = { id: 'avteste', tipo: 'prova', titulo: 'P1 de Micro', disc: it.id, data: somaDias(hoje(), 3), temas: temasDoItem(it), peso: 1 }; store.mudou('academico'); return 'avteste'; });
  await go('#/');
  card = await txt('.pv-cartao');
  ok(/P1 de Micro/.test(card) && /Faltam 3 dias/.test(card) && /Meu curso/.test(card), 'avaliação do curso (3 dias) vira a mais próxima');
  ok(await p.$eval('.pv-cartao', e => e.dataset.nivel) === 'perto', '≤ 3 dias: destaque "perto"');
  ok(await p.$$eval('.pv-cartao .pv-prox', l => l.map(e => e.textContent).join(' ')).then(t => /Clínica/.test(t) && /Pediatria/.test(t)), 'as seguintes passam a ser Clínica e Pediatria');
  await go('#/curso/aval/' + aid);
  ok(await p.$('a[href="#/provas/avteste"]') !== null, 'página da avaliação tem "Contagem e plano"');
  await go('#/provas/avteste');
  ok(/Estudar hoje/.test(await txt()) && await p.evaluate(() => prepDe(provaPorId('avteste')).dias.at(-1).d === somaDias(hoje(), 2)), 'avaliação do curso também tem plano até a véspera');

  console.log('6) Próximo passo usa o plano da prova (≤ 14 dias)');
  await go('#/');
  ok(/Estudar para P1 de Micro/.test(await txt('.hero')), 'Próximo passo: "Estudar para P1 de Micro"');
  await p.click('.hero [data-act="prova-estudar"]'); await p.waitForTimeout(250);
  const ses = await p.evaluate(() => ({ h: location.hash, ativo: PL.ativo, n: PL.ids.length, rot: PL.rotulo, dentro: PL.ids.every(id => provaPorId('avteste') && unidadesDe(provaPorId('avteste')).flatMap(u => questoesUnidade(u).map(q => q.id)).includes(id)) }));
  ok(ses.h === '#/questoes' && ses.ativo && ses.n > 0 && ses.n <= 20 && ses.dentro, `abre a sessão do dia (${ses.n} questões dos temas da prova) · ${ses.rot}`);
  await p.evaluate(() => { PL.ativo = false; });

  console.log('7) Hoje / amanhã / passada (relógio simulado)');
  await dia(2); await go('#/');
  ok(/É amanhã/.test(await txt('.pv-cartao')) && /P1 de Micro/.test(await txt('.pv-cartao')), 'véspera: "É amanhã"');
  await dia(3); await go('#/');
  ok(/É hoje! Boa prova/.test(await txt('.pv-cartao')), 'no dia: "É hoje! Boa prova"');
  ok(!(await p.$('.pv-cartao [data-act="prova-estudar"]')), 'no dia da prova não oferece estudar');
  await dia(4); await go('#/');
  card = await txt('.pv-cartao');
  ok(!/P1 de Micro/.test(card) && /Prova de Clínica/.test(card) && /Faltam 6 dias/.test(card), 'prova passada sai do cartão; a seguinte assume (Faltam 6 dias)');
  ok(await p.evaluate(() => [...document.querySelectorAll('.pv-cartao, .pv-cartao *')].every(e => !getComputedStyle(e).textDecorationLine.includes('line-through'))), 'nada riscado no cartão');
  await go('#/provas');
  ok(await p.evaluate(() => !document.querySelector('.pv-lista')?.innerText.includes('P1 de Micro')), 'Minhas provas: a passada não fica na lista principal');

  console.log('8) Atraso: o que faltou é redistribuído');
  const atr = await p.evaluate(id => { const p = prepDe(provaPorId(id)); return { ini: p.dias[0].d, tem: [...new Set(p.dias.flatMap(x => x.u))], fim: p.dias.at(-1).d, feitos: Object.keys(p.feitos).length }; }, pid);
  ok(atr.ini === iso(4) && atr.fim === iso(9), 'plano recomeça hoje (4 dias depois) e vai até a véspera');
  ok(atr.feitos === 0 && T.every(t => atr.tem.includes(t)), 'nenhum dia feito: todos os temas continuam no plano');

  console.log('9) Dia feito vai para "Feito" (recolhido, sem riscado)');
  await go('#/provas/' + pid);
  const antes = await p.evaluate(id => progressoPlano(provaPorId(id)).feitos, pid);
  await p.click('[data-act="prova-dia-feito"]'); await p.waitForTimeout(200);
  ok(await p.evaluate(id => progressoPlano(provaPorId(id)).feitos, pid) === antes + 1, 'progresso do plano sobe');
  ok(await p.$('.pv-ok') !== null && !(await p.$('.pv-hoje')), 'hoje: aviso "Sessão de hoje feita" (o dia saiu do topo)');
  ok(await p.$eval('details.pv-feito', e => !e.open && /Feito \(1\)/.test(e.textContent)), '"Feito (1)" recolhido');
  ok(await p.evaluate(() => [...document.querySelectorAll('#view *')].every(e => !getComputedStyle(e).textDecorationLine.includes('line-through'))), 'nada riscado na página da prova');
  await dia(5);
  const dep = await p.evaluate(id => { const p = prepDe(provaPorId(id)); return { ini: p.dias[0].d, vistos: Object.values(p.feitos).flatMap(f => f.u), u0: p.dias[0].u }; }, pid);
  ok(dep.ini === iso(5) && dep.u0.length && !dep.u0.some(u => dep.vistos.includes(u)), 'dia seguinte: plano continua de hoje com os temas que ainda faltam');
  await dia(4);

  console.log('10) Mudar a data recalcula o plano');
  await go('#/provas/' + pid + '/editar');
  ok(await p.$eval('#pv-data', e => e.value) === iso(10), 'edição traz a data salva');
  await p.fill('#pv-data', iso(8)); await p.click('form[data-form="prova-salvar"] button.grande'); await p.waitForTimeout(250);
  const rc = await p.evaluate(id => { const p = prepDe(provaPorId(id)); return { fim: p.dias.at(-1).d, tipo: p.dias.at(-1).tipo, chave: p.chave }; }, pid);
  ok(rc.fim === iso(7) && rc.tipo === 'vespera' && rc.chave.startsWith(iso(8)), 'nova véspera ' + rc.fim);
  ok(/Faltam 4 dias/.test(await txt('.pv-cartao')), 'contagem atualizada (Faltam 4 dias)');
  ok(await p.$eval('.pv-cartao', e => e.dataset.nivel) === 'meio', '4 a 7 dias: "meio"');
  await dia(0); await p.evaluate(id => { store.doc('plano').itens[id].prep = null; store.mudou('plano'); }, pid);

  console.log('11) Excluir com confirmação na própria página');
  await go('#/provas/pvd');
  await p.click('[data-act="prova-excluir"]'); await p.waitForTimeout(150);
  ok(await p.$('.pv-confirmar') !== null && await p.evaluate(() => !!store.doc('plano').itens.pvd), 'pede confirmação na página; ainda não apagou');
  await p.click('[data-act="prova-excluir-nao"]'); await p.waitForTimeout(120);
  ok(!(await p.$('.pv-confirmar')) && await p.evaluate(() => !!store.doc('plano').itens.pvd), 'Cancelar mantém a prova');
  await p.click('[data-act="prova-excluir"]'); await p.waitForTimeout(120); await p.click('[data-act="prova-excluir-ok"]'); await p.waitForTimeout(200);
  ok(await p.evaluate(() => !store.doc('plano').itens.pvd && location.hash === '#/provas'), '"Sim, excluir" apaga e volta para Minhas provas');

  if (SHOTS) {
    await p.waitForTimeout(2800);   // espera os avisos (toasts) sumirem
    await go('#/'); await p.evaluate(() => document.querySelector('.pv-cartao')?.scrollIntoView({ block: 'start' })); await p.evaluate(() => scrollBy(0, -70)); await p.screenshot({ path: SHOTS + '/inicio-cartao.png' });
    await go('#/provas'); await p.screenshot({ path: SHOTS + '/minhas-provas.png' });
    await go('#/provas/' + pid); await p.screenshot({ path: SHOTS + '/prova-plano.png', fullPage: true });
    await go('#/provas/nova'); await p.screenshot({ path: SHOTS + '/nova-prova.png' });
  }

  console.log('12) Encaixe 360/390 com letra 1 e 1,7; alvos ≥ 44 px');
  const medir = () => {
    const out = [], W = document.documentElement.clientWidth;
    if (document.documentElement.scrollWidth > W + 1) out.push('rolagem lateral (' + document.documentElement.scrollWidth + ')');
    for (const e of document.querySelectorAll('#view *')) {
      const cs = getComputedStyle(e), r = e.getBoundingClientRect(); if (!r.width || cs.display === 'none' || e.closest('svg,.desafios,[style*="overflow"],details:not([open])>:not(summary)')) continue;
      if (r.right > W + 1 && e.textContent.trim() && !e.children.length) out.push('sai da tela: ' + e.tagName + '.' + e.className + ' "' + e.textContent.trim().slice(0, 30) + '"');
      if (e.scrollWidth > e.clientWidth + 2 && ['hidden', 'clip'].includes(cs.overflowX)) out.push('cortado: ' + e.className);
      if (e.matches('#view a[href^="#"], #view button') && e.closest('.pv-cartao,.pv-convite,.pv-lista,.pv-hoje,.pv-form,.pv-unidades,.pv-confirmar,.titulo')) {
        if (r.height < 43.5) out.push(`alvo baixo (${Math.round(r.height)} px): "${e.textContent.trim().slice(0, 25)}"`);
        if (e.tagName === 'A' && cs.textDecorationLine.includes('underline')) out.push('sublinhado: ' + e.textContent.trim().slice(0, 25));
      }
    }
    return [...new Set(out)].slice(0, 6);
  };
  const achados = [];
  for (const w of [360, 390]) for (const k of ['1', '1.7']) {
    await p.setViewportSize({ width: w, height: 800 });
    for (const r of ['#/', '#/provas', '#/provas/nova', '#/provas/' + pid, '#/provas/' + pid + '/editar']) {
      await go(r); await p.evaluate(k => document.documentElement.style.setProperty('--k', k), k); await p.waitForTimeout(60);
      if (r === '#/provas/nova') await p.evaluate(() => document.querySelectorAll('.pv-temas details').forEach(d => d.open = true));
      (await p.evaluate(medir)).forEach(x => achados.push(`${x} [${r} ${w}px k=${k}]`));
    }
  }
  ok(!achados.length, achados.length ? 'encaixe: ' + achados.slice(0, 8).join(' | ') : 'Início, Minhas provas, nova, página e edição cabem em 360/390 com letra 1 e 1,7 (alvos ≥ 44 px, sem sublinhado)');
  await p.setViewportSize({ width: 390, height: 844 });
  await p.evaluate(() => document.documentElement.style.setProperty('--k', '1.7'));
  if (SHOTS) { await go('#/'); await p.evaluate(() => document.querySelector('.pv-cartao')?.scrollIntoView({ block: 'start' })); await p.evaluate(() => scrollBy(0, -70)); await p.screenshot({ path: SHOTS + '/inicio-letra-enorme.png' });
    await go('#/provas/' + pid); await p.screenshot({ path: SHOTS + '/prova-letra-enorme.png' }); }
  await p.evaluate(() => document.documentElement.style.setProperty('--k', '1.25'));

  console.log('13) Contraste (claro e escuro)');
  const contraste = () => {
    const cv = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
    const rgba = c => { cv.clearRect(0, 0, 1, 1); cv.fillStyle = '#000'; cv.fillStyle = c; cv.fillRect(0, 0, 1, 1); const d = cv.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
    const lum = ([r, g, bb]) => { const f = x => { x /= 255; return x <= .04045 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4; }; return .2126 * f(r) + .7152 * f(g) + .0722 * f(bb); };
    const razao = (a, c) => { const x = lum(a), y = lum(c); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); };
    const mistura = (f, bg) => [0, 1, 2].map(i => f[i] * f[3] + bg[i] * (1 - f[3]));
    const fundo = e => { const pilha = []; for (let x = e; x; x = x.parentElement) { const c = rgba(getComputedStyle(x).backgroundColor); if (c[3] > 0) { pilha.push(c); if (c[3] >= 1) break; } }
      let bg = rgba(getComputedStyle(document.body).backgroundColor).slice(0, 3); for (const c of pilha.reverse()) bg = mistura(c, bg); return bg; };
    const out = [];
    for (const e of document.querySelectorAll('.pv-cartao *, .pv-convite *, .pv-lista *, .pv-hoje *, .pv-form *, .pv-unidades *, .pv-ok, .pv-dia *')) {
      if (![...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()) || e.closest('svg,[aria-hidden="true"]')) continue;
      const cs = getComputedStyle(e), r = e.getBoundingClientRect(); if (!r.width) continue;
      const bg = fundo(e), q = razao(mistura(rgba(cs.color), bg), bg), px = parseFloat(cs.fontSize), grande = px >= 24 || (px >= 18.66 && +cs.fontWeight >= 700);
      if (q < (grande ? 3 : 4.5)) out.push(`${q.toFixed(2)} ${e.tagName.toLowerCase()}.${String(e.className).split(' ')[0]} "${e.textContent.trim().slice(0, 25)}"`);
    }
    return [...new Set(out)].slice(0, 6);
  };
  for (const tema of ['light', 'dark']) {
    await p.evaluate(t => { document.documentElement.dataset.theme = t; }, tema);
    const ruins = [];
    for (const r of ['#/', '#/provas', '#/provas/' + pid, '#/provas/nova', '#/provas/pvb']) { await go(r); (await p.evaluate(contraste)).forEach(x => ruins.push(x + ' ' + r)); }
    // proximidade "perto" e "meio" também (cores de destaque)
    for (const n of ['perto', 'meio']) { await go('#/provas'); await p.evaluate(n => document.querySelectorAll('[data-nivel]').forEach(e => e.dataset.nivel = n), n); (await p.evaluate(contraste)).forEach(x => ruins.push(x + ' ' + n)); }
    ok(!ruins.length, ruins.length ? `contraste ${tema}: ` + ruins.slice(0, 6).join(' | ') : `contraste ≥ 4,5:1 (3:1 no texto grande) no tema ${tema === 'light' ? 'claro' : 'escuro'}, inclusive nas cores de proximidade`);
    if (SHOTS && tema === 'dark') { await go('#/'); await p.evaluate(() => document.querySelector('.pv-cartao')?.scrollIntoView({ block: 'start' })); await p.evaluate(() => scrollBy(0, -70)); await p.screenshot({ path: SHOTS + '/inicio-escuro.png' }); }
  }
  await p.evaluate(() => { delete document.documentElement.dataset.theme; });

  console.log('14) ENEM: sugestões e temas do ENEM; provas de Medicina não aparecem');
  await p.evaluate(() => { store.doc('perfil').objetivo = 'enem'; store.mudou('perfil'); });
  await go('#/provas/nova');
  const sugEnem = await p.$$eval('[data-act="prova-sug"]', l => l.map(e => e.textContent.trim()));
  ok(['ENEM', 'PSC/UFAM', 'SIS/UEA', 'Macro/UEA'].every(s => sugEnem.includes(s)), 'ENEM: sugestões ENEM, PSC/UFAM, SIS/UEA, Macro/UEA');
  ok(!sugEnem.some(s => /Prova de|Residência/.test(s)), 'ENEM não vê sugestões de Medicina');
  ok(await p.evaluate(() => { const v = [...document.querySelectorAll('input[name="pv-u"]')].map(c => c.value); return v.length > 5 && v.every(x => x.startsWith('d:')); }), 'ENEM escolhe áreas/disciplinas (não temas médicos)');
  await go('#/provas');
  ok(!/Clínica|Pediatria|P1 de Micro/.test(await txt()), 'Minhas provas no ENEM não mostra provas de Medicina nem de Meu curso');
  await go('#/provas/nova');
  await p.click('[data-act="prova-sug"]:text-is("SIS/UEA")'); await p.fill('#pv-data', iso(25)); await p.check('input[name="pv-u"][value="d:matematica"]');
  await p.click('form[data-form="prova-salvar"] button.grande'); await p.waitForTimeout(250);
  const enem = await p.evaluate(() => { const r = registrosProva().find(x => x.nome === 'SIS/UEA'); const pv = provaPorId(r.id), pr = prepDe(pv); return { dom: r.dom, dias: pr.dias.length, ok: pr.dias.every(d => d.u.every(u => u === 'd:matematica')), qs: idsDoDia(pv, pr.dias[0]).every(id => qPorId(id).t === 'enem') }; });
  ok(enem.dom === 'enem' && enem.dias === 25 && enem.ok && enem.qs, 'prova do ENEM: plano de 25 dias só com Matemática e questões só do ENEM');
  await go('#/');
  ok(/SIS\/UEA/.test(await txt('.pv-cartao')) && !/Clínica/.test(await txt('.pv-cartao')), 'cartão do Início no ENEM mostra só a prova do ENEM');
  await p.evaluate(() => { store.doc('perfil').objetivo = 'medicina'; store.mudou('perfil'); });
  await go('#/provas');
  ok(!/SIS\/UEA/.test(await txt()) && /Clínica/.test(await txt()), 'de volta à Medicina: a prova do ENEM some e as de Medicina voltam');

  console.log('15) Sem temas: usa os pontos fracos; convite dispensado fica lembrado');
  const fracos = await p.evaluate(() => { const pv = provaPorId('pvb'); return { u: unidadesDe(pv), p: prepDe(pv).dias.length }; });
  ok(fracos.u.length > 0 && fracos.u[0] === T[0] && fracos.p > 0, 'prova sem temas: plano com os pontos fracos (o tema mais fraco primeiro)');
  await p.evaluate(() => { const P = store.doc('plano'); Object.keys(P.itens).forEach(k => { if (P.itens[k].tipo === 'prova') delete P.itens[k]; }); delete acad().aval.avteste; store.mudou('plano'); store.mudou('academico'); });
  await go('#/');
  ok(await p.$('.pv-convite') !== null && !(await p.$('.pv-cartao')), 'sem provas: volta o convite');
  await p.click('[data-act="provas-convite-off"]'); await p.waitForTimeout(150);
  await p.reload(); await p.waitForTimeout(600); await go('#/');
  ok(!(await p.$('.pv-convite')) && await p.evaluate(() => store.doc('perfil').provasConviteOff === true), '"Agora não": convite dispensado e lembrado depois de recarregar');

  ok(!errs.length, errs.length ? 'erros de JS: ' + errs.join(' | ') : 'Sem erros de JS');
  await b.close(); console.log(falhas ? `${falhas} FALHA(S)` : 'PROVAS OK'); process.exit(falhas ? 1 : 0);
})();
