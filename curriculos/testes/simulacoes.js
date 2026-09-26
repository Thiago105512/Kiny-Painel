// Teste de navegador (Playwright): jogos de simulação e raciocínio — Plantão no PS, Salve o paciente,
// Defesa antimicrobiana, Cascata, Quem sou eu?, Rumo ao Milhão e Caça-palavras.
// Rode na raiz:   python3 -m http.server 8765 &   e   node curriculos/testes/simulacoes.js
const { chromium } = require('playwright');
const URL = process.env.APP_URL || 'http://localhost:8765/curriculos/app.html';
let falhas = 0; const ok = (c, m) => { console.log((c ? '  ✓ ' : '  ✗ ') + m); if (!c) falhas++; };
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {}); const errs = [];
  const p = await b.newPage({ viewport: { width: 390, height: 840 } }); p.on('pageerror', e => errs.push(e.message));
  const abrir = async (id, sel = '[data-act="jg-comecar"]') => { await p.goto(URL + '#/jogos/' + id); await p.waitForTimeout(350); await p.evaluate(() => fecharFolha()); await p.click(sel); await p.waitForTimeout(200); };
  await p.goto(URL + '#/jogos'); await p.waitForTimeout(700);
  console.log('1) Plantão no PS');
  await abrir('triagem');
  let r = await p.evaluate(() => JG.rodadas.map(x => JD().triagem.find(y => y.id === x.pid).cor));
  ok(r.length === 12 && r.filter(c => c === 'vermelho').length === 2, 'plantão de 12 pacientes com 2 vermelhos');
  for (let k = 0; k < 12; k++) { await p.evaluate(() => { const c = JD().triagem.find(y => y.id === JG.rodadas[JG.i].pid).cor; document.querySelector(`[data-act="ps-cor"][data-c="${c}"]`).click(); }); await p.waitForTimeout(40); await p.click('[data-act="jg-prox"]'); await p.waitForTimeout(40); }
  ok(await p.evaluate(() => JG.fim && JG.acertos === 12 && JG.pontos === 120), 'plantão perfeito = 120 pontos');
  await abrir('triagem');
  await p.evaluate(() => { const i = JG.rodadas.findIndex(x => JD().triagem.find(y => y.id === x.pid).cor === 'vermelho'); JG.i = i; atualizar(); document.querySelector('[data-act="ps-cor"][data-c="verde"]').click(); });
  ok(/Subtriagem/.test(await p.innerText('#view')), 'vermelho classificado como verde = subtriagem');
  console.log('2) Salve o paciente');
  if (await p.evaluate(() => JOGOS.find(j => j.id === 'emergencia').disponivel())) {
    await p.goto(URL + '#/jogos/emergencia'); await p.waitForTimeout(300); await p.evaluate(() => fecharFolha());
    ok(await p.locator('.em-caso').count() >= 8, 'lista de atendimentos');
    await p.click('.em-caso'); await p.waitForTimeout(200);
    ok(await p.$('.monitor .mon-onda path') !== null, 'monitor com traçado');
    for (let k = 0; k < 12 && !(await p.evaluate(() => JG.rodadas[0].fim)); k++) {   // sempre a melhor ação
      await p.evaluate(() => { const r = JG.rodadas[0], c = JD().emergencias.find(x => x.id === r.cid), ac = c.etapas[r.etapa].acoes, best = ac.indexOf(ac.reduce((a, b) => (b.pontos > a.pontos ? b : a))); document.querySelector(`[data-act="em-acao"][data-k="${best}"]`).click(); }); await p.waitForTimeout(60); }
    r = await p.evaluate(() => { const r = JG.rodadas[0], c = JD().emergencias.find(x => x.id === r.cid); return c.finais[r.fim]?.tipo; });
    ok(r === 'bom', 'melhores condutas levam ao desfecho bom');
    ok(/Debriefing/i.test(await p.innerText('#view')), 'mostra o debriefing');
    r = await p.evaluate(() => JD().emergencias.every(c => { const vistos = new Set(), pilha = [c.inicio]; while (pilha.length) { const e = pilha.pop(); if (vistos.has(e) || c.finais[e]) continue; vistos.add(e); c.etapas[e].acoes.forEach(a => pilha.push(a.vai)); } return vistos.size === Object.keys(c.etapas).length; }));
    ok(r, 'todas as etapas de todos os casos são alcançáveis');
  } else console.log('  (sem conteúdo ainda)');
  console.log('3) Defesa antimicrobiana');
  await abrir('defesa', '[data-act="df-iniciar"][data-v="normal"]');
  ok(await p.locator('.df-arma').count() === 4 && await p.$('.df-invasor') !== null, 'invasor e 4 armas');
  r = await p.evaluate(() => JG.rodadas.every(x => { const inv = JD().defesa.invasores.find(i => i.id === x.iid); return x.ops.filter(o => o === inv.certa || (inv.aceitaveis || []).includes(o)).length === 1; }));
  ok(r, 'em toda rodada exatamente uma arma certa entre as 4');
  await p.evaluate(() => { const inv = JD().defesa.invasores.find(i => i.id === JG.rodadas[JG.i].iid); document.querySelector(`[data-act="df-disparar"][data-id="${inv.certa}"]`).click(); }); await p.waitForTimeout(100);
  ok(await p.evaluate(() => JG.pontos === 10 && JG.i === 1), 'acerto na fase 1 = 10 pontos e próximo invasor');
  await p.evaluate(() => { const inv = JD().defesa.invasores.find(i => i.id === JG.rodadas[JG.i].iid); const errada = JG.rodadas[JG.i].ops.find(o => o !== inv.certa && !(inv.aceitaveis || []).includes(o)); document.querySelector(`[data-act="df-disparar"][data-id="${errada}"]`).click(); }); await p.waitForTimeout(100);
  ok(await p.evaluate(() => JG.vidas === 2) && /Era /.test(await p.innerText('#view')), 'erro tira uma vida e explica');
  await p.evaluate(() => { DEF.chave = null; clearTimeout(DEF.timer); DEF.calmo = false; }); await p.evaluate(() => { const inv = JD().defesa.invasores.find(i => i.id === JG.rodadas[JG.i].iid); inv._dur = 1; });
  await p.evaluate(() => { resolverDefesa(null); }); await p.waitForTimeout(100);
  ok(await p.evaluate(() => JG.vidas === 1), 'tempo esgotado também tira vida');
  console.log('4) Cascata');
  await abrir('cascata');
  r = await p.evaluate(() => { const c = JD().cascatas.find(x => x.id === JG.rodadas[0].cid); const errado = JG.rodadas[0].ordem.find(i => i !== 0); document.querySelector(`[data-act="cs-passo"][data-i="${errado}"]`).click(); for (let i = 0; i < c.passos.length; i++) document.querySelector(`[data-act="cs-passo"][data-i="${i}"]`).click(); return [JG.rodadas[0].fim, JG.rodadas[0].erros, JG.pontos]; });
  ok(r[0] && r[1] === 1 && r[2] === 25, 'um erro no caminho = 25 pontos (' + r.join(',') + ')');
  console.log('5) Quem sou eu?');
  if (await p.evaluate(() => JOGOS.find(j => j.id === 'quemsou').disponivel())) {
    await abrir('quemsou');
    r = await p.evaluate(() => { const g = JD().quemsou.grupos.find(x => x.id === JG.rodadas[0].gid); document.querySelector('[data-act="qs-perg"][data-k="0"]').click(); return [document.querySelectorAll('.quem-carta.riscada').length, g.doencas.length]; });
    ok(r[0] > 0 && r[0] < r[1], 'uma pergunta risca parte das cartas (' + r[0] + ' de ' + r[1] + ')');
    r = await p.evaluate(() => JD().quemsou.grupos.every(g => g.doencas.every((a, i) => g.doencas.every((b, j) => i >= j || g.perguntas.some(q => q.sim.includes(a) !== q.sim.includes(b))))));
    ok(r, 'as perguntas distinguem todas as doenças de cada grupo');
    await p.evaluate(() => { const r = JG.rodadas[0]; document.querySelector(`[data-act="qs-palpite"][data-d="${CSS.escape(r.alvo)}"]`).click(); });
    ok(await p.evaluate(() => JG.rodadas[0].ok && JG.pontos === 55), 'acertar com 1 pergunta = 55 pontos');
  } else console.log('  (sem conteúdo ainda)');
  console.log('6) Rumo ao Milhão');
  await abrir('milhao');
  r = await p.evaluate(() => JG.rodadas.map(x => qPorId(x.qid)));
  ok(r.length === 16 && r.every(q => ['medicina', 'residencia'].includes(q.t)), '16 perguntas, só Medicina/Residência sem objetivo definido');
  await p.click('[data-a="cartas"]'); await p.waitForTimeout(80);
  ok(await p.evaluate(() => JG.rodadas[0].fora.length >= 1 && !JG.rodadas[0].fora.includes(qPorId(JG.rodadas[0].qid).c)), 'cartas tiram só alternativas erradas');
  for (let k = 0; k < 3; k++) { await p.evaluate(() => { const q = qPorId(JG.rodadas[JG.i].qid); document.querySelector(`[data-act="ml-resp"][data-i="${q.c}"]`).click(); }); await p.waitForTimeout(60); await p.click('[data-act="jg-prox"]'); await p.waitForTimeout(60); }
  await p.evaluate(() => { const q = qPorId(JG.rodadas[JG.i].qid); document.querySelector(`[data-act="ml-resp"][data-i="${(q.c + 1) % q.o.length}"]`).click(); }); await p.waitForTimeout(60);
  ok(await p.evaluate(() => JG.premio === 1), 'errar a 4ª valendo 4 mil (com 3 mil acumulados) leva a metade: 1 mil');
  console.log('7) Caça-palavras');
  await abrir('caca');
  r = await p.evaluate(() => { const r = JG.rodadas[0]; for (const pz of r.pos) { const [a, b] = pz.cel[0], [c, d] = pz.cel.at(-1); document.querySelector(`[data-act="cp-letra"][data-l="${c}"][data-c="${d}"]`).click(); document.querySelector(`[data-act="cp-letra"][data-l="${a}"][data-c="${b}"]`).click(); } return [r.achadas.length, r.ps.length, r.fim]; });
  ok(r[0] === r[1] && r[2], 'acha todas as palavras (também de trás para frente)');
  ok(!errs.length, errs.length ? 'erros de JS: ' + errs.join(' | ') : 'Sem erros de JS');
  await b.close(); console.log(falhas ? `${falhas} FALHA(S)` : 'SIMULAÇÕES OK'); process.exit(falhas ? 1 : 0);
})();
