// Teste de navegador (Playwright): formas de voltar — botão "← Destino" grande (histórico do app ou página-mãe),
// voltar do navegador/celular (goBack) que fecha a folha antes de sair e pausa o player ("Continuar sessão"),
// questão aberta de uma lista com "‹ Anterior · N de M · Próxima ›" mantendo filtros, "Voltar para a lista",
// rolagem restaurada, fins de sessão com saídas claras, gesto da borda esquerda e Alt+← / Backspace.
// Rode na raiz:  python3 -m http.server 8765 &  e  node curriculos/testes/navegacao.js
const { chromium } = require('playwright');
const URL = process.env.APP_URL || 'http://localhost:8765/curriculos/app.html';
let falhas = 0; const ok = (c, m) => { console.log((c ? '  ✓ ' : '  ✗ ') + m); if (!c) falhas++; };
const espera = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {}); const errs = [];
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true });
  const p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message));
  await p.goto(URL); await p.waitForTimeout(500);
  // Perfil Medicina com progresso: 12 respondidas (metade erradas), 2 marcadas
  await p.evaluate(() => {
    const P = store.doc('perfil'); P.objetivo = 'medicina'; P.boasVindas = true; store.mudou('perfil');
    const qs = questoes().filter(q => q.t === 'medicina' && !q.serie && !q.familia).slice(0, 12);
    qs.forEach((q, k) => registrarResposta(q, k % 2 ? (q.c + 1) % 5 : q.c, 20000, 'pratica'));
    alternarFlag(qs[0], 'm'); alternarFlag(qs[1], 'm');
  });
  const go = async h => { await p.evaluate(h => { location.hash = h; }, h); await p.waitForTimeout(200); };
  const hash = () => p.evaluate(() => location.hash);
  const voltarBtn = () => p.evaluate(() => { const b = document.querySelector('#view .nav-voltar .voltar'); if (!b) return null; const r = b.getBoundingClientRect(), cs = getComputedStyle(b); return { t: b.innerText.replace(/\s+/g, ' ').trim(), aria: b.getAttribute('aria-label'), h: r.height, w: r.width, fs: parseFloat(cs.fontSize) }; });
  const goBack = async () => { await p.goBack(); await p.waitForTimeout(300); };

  console.log('1) Botão "← Voltar" no topo das páginas internas');
  let r; await go('#/'); r = await voltarBtn(); ok(!r, 'Início (raiz) não tem botão voltar');
  await go('#/medicina/especialidades'); await go('#/medicina/esp/cardiologia');
  r = await voltarBtn();
  ok(r && /^← Mapa por especialidades$/.test(r.t) && r.h >= 44 && r.fs >= 16, `rotulado com o destino e grande (${r && r.t}, ${r && Math.round(r.h)} px, letra ${r && r.fs} px)`);
  ok(r && /Voltar para Mapa por especialidades/.test(r.aria), 'aria-label "Voltar para …"');
  await p.click('#view .nav-voltar .voltar'); await p.waitForTimeout(250);
  ok(await hash() === '#/medicina/especialidades', 'tocar volta pela página anterior do app');
  // sem histórico (link aberto direto): vai para a página-mãe (último crumb com link)
  const p2 = await ctx.newPage(); await p2.goto(URL + '#/medicina/esp/cardiologia'); await p2.waitForTimeout(500);
  r = await p2.evaluate(() => document.querySelector('#view .voltar')?.innerText.replace(/\s+/g, ' ').trim());
  ok(r === '← Clínica Médica' || r === '← Especialidades', 'sem histórico do app: rótulo é o crumb-mãe (' + r + ')');
  await p2.click('#view .voltar'); await p2.waitForTimeout(250);
  ok(await p2.evaluate(() => location.hash) === '#/medicina/especialidades', 'e leva para a página-mãe');
  await p2.close();
  await go('#/busca/insuficiencia'); r = await voltarBtn(); ok(!!r, 'resultado da busca tem botão voltar (' + (r && r.t) + ')');
  // foco visível no botão pelo teclado
  await p.evaluate(() => document.getElementById('view').focus()); await p.keyboard.press('Tab');
  r = await p.evaluate(() => { const a = document.activeElement, cs = getComputedStyle(a); return a.classList.contains('voltar') && a.matches(':focus-visible') && cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) >= 2; });
  ok(r, 'foco visível no botão voltar');

  console.log('2) Voltar do navegador (goBack)');
  await go('#/medicina/esp/cardiologia'); await go('#/tema/hipertensao-arterial'); await goBack();
  ok(await hash() === '#/medicina/esp/cardiologia', 'tema → goBack → especialidade');

  console.log('3) Folha aberta: voltar fecha a folha em vez de sair da página');
  await go('#/revisoes'); await go('#/flashcards');
  await p.click('#letra-btn'); await p.waitForTimeout(150);
  ok(await p.evaluate(() => !!document.querySelector('#camada .folha')), 'folha "Aa" aberta');
  await goBack();
  r = await p.evaluate(() => ({ h: location.hash, folha: !!document.querySelector('#camada .folha') }));
  ok(r.h === '#/flashcards' && !r.folha, 'goBack fechou a folha e ficou na página');
  await goBack(); ok(await hash() === '#/revisoes', 'o próximo goBack sai da página normalmente');
  await go('#/flashcards'); await p.click('#letra-btn'); await p.waitForTimeout(150);
  await p.click('#camada .fechar-x'); await p.waitForTimeout(250);
  await goBack(); ok(await hash() === '#/revisoes', 'fechar no ✕ não deixa um voltar "morto" no histórico');
  await go('#/flashcards'); await p.click('[data-act="menu-mais"]'); await p.waitForTimeout(150);
  await p.click('#camada a[href="#/desempenho"]'); await p.waitForTimeout(250);
  ok(await hash() === '#/desempenho' && !(await p.$('#camada .folha')), 'link do menu "Mais" navega e fecha a folha');
  await goBack(); r = await p.evaluate(() => ({ h: location.hash, folha: !!document.querySelector('#camada .folha') }));
  ok(r.h === '#/flashcards' && !r.folha, 'voltar depois do menu vai para a página de antes (sem reabrir o menu)');
  await go('#/'); await p.click('[data-act="metas-editar"]'); await p.waitForTimeout(150);
  await p.keyboard.press('Escape'); await p.waitForTimeout(250);
  ok(!(await p.$('#camada .folha')) && await hash() === '#/', 'Esc fecha a folha');

  console.log('4) Questão aberta da lista: anterior/próxima dentro da lista filtrada');
  await go('#/questoes'); await p.evaluate(() => { FQ.status = ['incorreta']; atualizar(); }); await p.waitForTimeout(150);
  const nErr = await p.$$eval('#view .lista-q a', a => a.length); ok(nErr === 6, `filtro "Erradas": ${nErr} questões`);
  const ids = await p.$$eval('#view .lista-q a', a => a.map(x => decodeURIComponent(x.getAttribute('href').split('/').pop())));
  await p.click('#view .lista-q a >> nth=0'); await p.waitForTimeout(250);
  r = await p.evaluate(() => ({ pos: document.querySelector('.qnav-pos')?.innerText, ant: document.querySelector('.qnav [data-d="-1"]')?.disabled, h1: document.querySelector('h1').innerText, voltar: document.querySelector('#view .voltar')?.innerText.replace(/\s+/g, ' ').trim(), ja: !!document.querySelector('.ja-resp') }));
  ok(r.pos === '1 de 6' && r.ant === true && r.h1 === 'Questão 1 de 6', 'mostra "1 de 6" e Anterior desligado na primeira');
  ok(r.voltar === '← Voltar para a lista', 'botão do topo: "← Voltar para a lista"');
  ok(r.ja, 'questão já respondida avisa e oferece ver o gabarito');
  await p.click('.qnav [data-d="1"]'); await p.waitForTimeout(250);
  ok(await hash() === '#/questoes/q/' + encodeURIComponent(ids[1]) && await p.innerText('.qnav-pos') === '2 de 6', 'Próxima › abre a 2ª da lista');
  await p.click('.qnav [data-d="1"]'); await p.waitForTimeout(250);
  // responde a 3ª (errando de novo, para continuar na lista "Erradas"): o botão principal vira "Próxima da lista"
  await p.evaluate(() => { const q = qPorId(PL.ids[PL.i]); document.querySelector(`[data-act="pl-alt"][data-i="${(q.c + 1) % 5}"]`).click(); });
  await p.click('[data-act="pl-confirmar"]'); await p.waitForTimeout(150);
  ok(!!(await p.$('#pl [data-act="q-lista"][data-d="1"]')), 'depois de responder: "Próxima da lista ›" (não "Concluir")');
  await p.click('#pl [data-act="q-lista"][data-d="1"]'); await p.waitForTimeout(250);
  ok(await p.innerText('.qnav-pos') === '4 de 6', 'foi para a 4ª');
  await p.click('.qnav [data-d="-1"]'); await p.waitForTimeout(250);
  ok(await p.innerText('.qnav-pos') === '3 de 6', '‹ Anterior volta para a 3ª');
  await goBack();
  r = await p.evaluate(() => { const a = document.querySelector('#view .lista-q a.lq-vista'); const rc = a?.getBoundingClientRect(); return { h: location.hash, st: FQ.status.slice(), vista: a && decodeURIComponent(a.getAttribute('href').split('/').pop()), visivel: rc && rc.top >= 0 && rc.bottom <= innerHeight }; });
  ok(r.h === '#/questoes' && r.st.join() === 'incorreta', 'goBack volta direto para a lista (sem passar pelas 3 questões) com o filtro "Erradas"');
  ok(r.vista === ids[2] && r.visivel, 'a última questão vista fica destacada e na tela' + (r.vista === ids[2] && r.visivel ? '' : ' ' + JSON.stringify(r)));
  await p.click('#view .lista-q a >> nth=4'); await p.waitForTimeout(250);
  await p.click('#view .acoes [data-act="q-lista-voltar"]'); await p.waitForTimeout(300);
  r = await p.evaluate(() => ({ h: location.hash, st: FQ.status.slice() }));
  ok(r.h === '#/questoes' && r.st.join() === 'incorreta', '"Voltar para a lista" restaura a lista filtrada');

  console.log('5) Rolagem restaurada ao voltar para uma lista longa');
  await p.evaluate(() => { FQ.status = []; QPAG = 60; atualizar(); }); await p.waitForTimeout(200);
  await p.evaluate(() => window.scrollTo(0, 2200)); await p.waitForTimeout(150);
  const y0 = await p.evaluate(() => scrollY);
  await p.evaluate(() => { const as = [...document.querySelectorAll('#view .lista-q a')]; const a = as.find(x => x.getBoundingClientRect().top > 100); a.click(); });
  await p.waitForTimeout(300); ok(/^#\/questoes\/q\//.test(await hash()), 'abriu uma questão do meio da lista');
  await goBack();
  const y1 = await p.evaluate(() => scrollY);
  ok(y0 > 1500 && Math.abs(y1 - y0) < 40, `voltou para a mesma altura da lista (${Math.round(y0)} → ${Math.round(y1)})`);
  await go('#/simulados'); await goBack(); ok(Math.abs(await p.evaluate(() => scrollY) - y0) < 40, 'também ao voltar de outra seção');
  await p.evaluate(() => { QPAG = 20; });

  console.log('6) Player: voltar sai do player sem perder a sessão');
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.click('[data-act="praticar-filtro"]'); await p.waitForTimeout(250);
  r = await voltarBtn(); ok(r && r.t === '← Questões', 'no player, o botão voltar leva à lista (' + (r && r.t) + ')');
  await p.evaluate(() => { const q = qPorId(PL.ids[PL.i]); document.querySelector(`[data-act="pl-alt"][data-i="${q.c}"]`).click(); });
  await p.click('[data-act="pl-confirmar"]'); await p.waitForTimeout(100); await p.click('[data-act="pl-prox"]'); await p.waitForTimeout(150);
  const ses = await p.evaluate(() => ({ i: PL.i, id: PL.ids[PL.i], n: PL.ids.length }));
  await goBack();
  r = await p.evaluate(() => ({ h: location.hash, pl: !!document.getElementById('pl'), faixa: document.querySelector('.faixa.continuar')?.innerText || '', pausada: PL.pausada, ativo: PL.ativo }));
  ok(r.h === '#/questoes' && !r.pl && r.pausada && r.ativo, 'goBack no player mostra a lista e deixa a sessão pausada');
  ok(/Continuar sessão/.test(r.faixa) && r.faixa.includes(`questão ${ses.i + 1} de ${ses.n}`), 'faixa "Continuar sessão" com a questão onde parou');
  await go('#/'); r = await p.evaluate(() => document.querySelector('#view [data-act="pl-continuar"]')?.closest('section')?.innerText || '');
  ok(/Continuar de onde parou/.test(r), 'o Início oferece "Continuar de onde parou"');
  await p.click('#view [data-act="pl-continuar"]'); await p.waitForTimeout(250);
  r = await p.evaluate(() => ({ h: location.hash, pl: !!document.getElementById('pl'), i: PL.i, id: PL.ids[PL.i] }));
  ok(r.h === '#/questoes' && r.pl && r.i === ses.i && r.id === ses.id, 'Continuar volta para a mesma questão da sessão');
  r = await voltarBtn(); ok(r && r.t === '← Início', 'vindo do Início, o voltar do player diz "← Início"');
  await p.click('#view .nav-voltar .voltar'); await p.waitForTimeout(250);
  r = await p.evaluate(() => ({ h: location.hash, pausada: PL.pausada, ativo: PL.ativo }));
  ok(r.h === '#/' && r.pausada && r.ativo, 'o botão voltar do player também pausa a sessão');
  await go('#/questoes'); ok(!(await p.$('#pl')) && !!(await p.$('.faixa.continuar')), 'na lista: faixa "Continuar sessão"');
  await p.click('.faixa.continuar [data-act="pl-continuar"]'); await p.waitForTimeout(200);
  ok(!!(await p.$('#pl')), 'continuar pela faixa');
  await p.click('#view .crumbs a[data-act="crumb-aqui"]'); await p.waitForTimeout(200);
  ok(!(await p.$('#pl')) && !!(await p.$('.faixa.continuar')), 'o crumb "Questões" (mesmo endereço do player) sai do player em vez de não fazer nada');
  await p.click('.faixa.continuar [data-act="pl-continuar"]'); await p.waitForTimeout(200);

  console.log('7) Fim de sessão com saídas claras');
  await p.click('[data-act="pl-encerrar"]'); await p.waitForTimeout(200);
  r = await p.$$eval('#pl-fim .fim-acoes .btn', e => e.map(x => x.innerText.trim()));
  ok(r.includes('Voltar para onde eu estava') && r.includes('Fazer mais questões'), 'fim: "Voltar para onde eu estava" e "Fazer mais questões" (' + r.join(' | ') + ')');
  await p.click('#pl-fim [data-act="pl-sair"]'); await p.waitForTimeout(200);
  r = await p.evaluate(() => ({ h: location.hash, pl: !!document.getElementById('pl'), ativo: PL.ativo }));
  ok(r.h === '#/questoes' && !r.ativo && !r.pl, '"Voltar para onde eu estava" volta para a lista onde a sessão começou');
  await go('#/'); await p.evaluate(() => ACOES['inicio-praticar']({ dataset: { disc: '' } })); await p.waitForTimeout(250);
  await p.evaluate(() => { const q = qPorId(PL.ids[PL.i]); document.querySelector(`[data-act="pl-alt"][data-i="${q.c}"]`).click(); });
  await p.click('[data-act="pl-confirmar"]'); await p.waitForTimeout(100); await p.click('[data-act="pl-encerrar"]'); await p.waitForTimeout(150);
  await p.click('#pl-fim [data-act="pl-sair"]'); await p.waitForTimeout(250);
  ok(await hash() === '#/', 'sessão começada no Início: "Voltar para onde eu estava" leva ao Início');
  await go('#/tema/hipertensao-arterial/praticar'); await p.click('[data-act="tema-praticar"]'); await p.waitForTimeout(200);
  await p.evaluate(() => { const q = qPorId(PL.ids[PL.i]); document.querySelector(`[data-act="pl-alt"][data-i="${q.c}"]`).click(); });
  await p.click('[data-act="pl-confirmar"]'); await p.waitForTimeout(100); await p.click('[data-act="pl-encerrar"]'); await p.waitForTimeout(150);
  ok((await p.$$eval('#pl-fim .fim-acoes .btn', e => e.map(x => x.innerText.trim()))).includes('Ir para o Início'), 'fim no tema tem "Ir para o Início"');
  await p.click('#pl-fim [data-act="pl-mais"]'); await p.waitForTimeout(200);
  r = await p.evaluate(() => ({ pl: !!document.getElementById('pl'), chave: PL.chave, i: PL.i, fim: PL.fim }));
  ok(r.pl && r.chave === 'tema:hipertensao-arterial' && r.i === 0 && !r.fim, '"Fazer mais questões" começa outra rodada do mesmo tema');
  await p.click('[data-act="pl-encerrar"]'); await p.waitForTimeout(100);
  if (await p.$('#pl-fim [data-act="pl-inicio"]')) { await p.click('#pl-fim [data-act="pl-inicio"]'); await p.waitForTimeout(200); }
  else await go('#/');
  ok(await hash() === '#/', '"Ir para o Início"');

  console.log('8) Simulado: rever as questões do resultado com anterior/próxima');
  await go('#/simulados'); await p.click('[data-act="sim-n"][data-v="10"]'); await p.click('[data-act="sim-iniciar"]'); await p.waitForTimeout(200);
  await p.evaluate(() => { SIM.ids.forEach((id, k) => { SIM.resp[id] = k % 2 ? qPorId(id).c : (qPorId(id).c + 1) % 5; }); entregarSimulado(); }); await p.waitForTimeout(200);
  r = await p.$$eval('#view .acoes .btn', e => e.map(x => x.innerText.trim())); ok(r.includes('Ir para o Início') && r.includes('Fazer outro simulado'), 'resultado: "Fazer outro simulado" e "Ir para o Início"');
  const nAbrir = await p.$$eval('#view a[data-qlista="sim"]', e => e.length); ok(nAbrir === 10, `cada questão da correção tem "Abrir questão" (${nAbrir})`);
  await p.click('#view a[data-qlista="sim"] >> nth=3'); await p.waitForTimeout(250);
  ok(await p.innerText('.qnav-pos') === '4 de 10', 'abre a 4ª com "4 de 10"');
  await p.click('.qnav [data-d="1"]'); await p.waitForTimeout(200);
  await p.click('#view .nav-voltar .voltar'); await p.waitForTimeout(300);
  r = await p.evaluate(() => ({ h: location.hash, t: document.querySelector('h1').innerText }));
  ok(r.h === '#/simulados' && r.t === 'Resultado do simulado', '"Voltar para a lista" volta ao resultado do simulado');
  await p.evaluate(() => ACOES['sim-novo']());

  console.log('9) Caderno de erros: folha → "Abrir questão" → voltar');
  await go('#/erros'); await p.click('[data-act="fe-vista"][data-v="0"]'); await p.waitForTimeout(150);
  await p.click('#view .lista-q a >> nth=1'); await p.waitForTimeout(150);
  await p.click('#camada a[data-qlista="erros"]'); await p.waitForTimeout(250);
  r = await p.evaluate(() => ({ h: location.hash, folha: !!document.querySelector('#camada .folha'), pos: document.querySelector('.qnav-pos')?.innerText }));
  ok(/^#\/questoes\/q\//.test(r.h) && !r.folha && /^2 de \d+$/.test(r.pos), 'abre a questão com "2 de N" e a folha some (' + r.pos + ')');
  await goBack(); r = await p.evaluate(() => ({ h: location.hash, folha: !!document.querySelector('#camada .folha') }));
  ok(r.h === '#/erros' && !r.folha, 'goBack volta ao caderno (sem reabrir a folha)');

  console.log('10) Gesto: deslizar da borda esquerda para a direita');
  const deslizar = (x0, y0, x1, y1, alvo) => p.evaluate(({ x0, y0, x1, y1, alvo }) => {
    const el = (alvo && document.querySelector(alvo)) || document.elementFromPoint(x0, y0) || document.body;
    const T = (x, y) => new Touch({ identifier: 1, target: el, clientX: x, clientY: y });
    const ev = (tipo, t) => el.dispatchEvent(new TouchEvent(tipo, { bubbles: true, cancelable: true, touches: tipo === 'touchend' ? [] : [t], changedTouches: [t] }));
    ev('touchstart', T(x0, y0)); for (let k = 1; k <= 6; k++) ev('touchmove', T(x0 + (x1 - x0) * k / 6, y0 + (y1 - y0) * k / 6));
    window.__dica = document.getElementById('gesto-voltar')?.classList.contains('pronta');
    ev('touchend', T(x1, y1));
  }, { x0, y0, x1, y1, alvo });
  await go('#/medicina/especialidades'); await go('#/medicina/esp/cardiologia');
  await deslizar(100, 400, 260, 405); await p.waitForTimeout(250);
  ok(await hash() === '#/medicina/esp/cardiologia', 'deslizar do meio da tela não volta');
  await deslizar(8, 400, 20, 600); await p.waitForTimeout(250);
  ok(await hash() === '#/medicina/esp/cardiologia', 'arrasto vertical na borda (rolagem) não volta');
  await deslizar(8, 400, 160, 410); await p.waitForTimeout(300);
  ok(await hash() === '#/medicina/especialidades' && await p.evaluate(() => window.__dica), 'da borda para a direita volta, com a dica "Voltar" na tela');
  // não conflita com o flashcard
  await p.evaluate(() => { criarCard({ frente: 'F', verso: 'V', tema: 'hipertensao-arterial', origem: 'manual', dif: 2 }); });
  await go('#/flashcards/estudar'); await p.evaluate(() => { FC.mostrar = true; atualizar(); });
  const fcX = await p.evaluate(() => Math.round(document.getElementById('fc').getBoundingClientRect().left + 4));
  await deslizar(Math.min(fcX, 22), 400, 200, 405, '#fc'); await p.waitForTimeout(250);
  ok(await hash() === '#/flashcards/estudar', 'gesto que começa no flashcard não volta de página');

  console.log('11) Teclado: Backspace e Alt+← voltam; dentro de campo, Backspace apaga');
  await go('#/casos'); await go('#/casos/caso-malaria-vivax'); await p.focus('h1').catch(() => {});
  await p.evaluate(() => document.body.focus()); await p.keyboard.press('Backspace'); await p.waitForTimeout(250);
  ok(await hash() === '#/casos', 'Backspace fora de campo volta');
  await go('#/busca/malaria'); await p.focus('#busca-global'); await p.keyboard.type('ab'); await p.keyboard.press('Backspace'); await p.waitForTimeout(200);
  ok(await hash() === '#/busca/malaria', 'Backspace no campo de busca não navega');
  await p.click('#letra-btn'); await p.waitForTimeout(150); await p.keyboard.press('Alt+ArrowLeft'); await p.waitForTimeout(250);
  r = await p.evaluate(() => ({ h: location.hash, folha: !!document.querySelector('#camada .folha') }));
  ok(r.h === '#/busca/malaria' && !r.folha, 'Alt+← com folha aberta fecha a folha');
  await p.evaluate(() => document.activeElement.blur()); await p.keyboard.press('Alt+ArrowLeft'); await p.waitForTimeout(250);
  ok(await hash() === '#/casos', 'Alt+← volta de página');

  console.log('12) Jogo terminado: saídas');
  await go('#/jogos/vidas'); await p.evaluate(() => { iniciarJogo('vidas'); const r = JG.rodadas[0], q = qPorId(r.qid); ACOES['jg-alt']({ dataset: { i: q.c } }); terminarJogo(); }); await p.waitForTimeout(200);
  r = await p.$$eval('#jg-fim .acoes .btn', e => e.map(x => x.innerText.trim()));
  ok(r.includes('Jogar de novo') && r.includes('Ir para o Início'), 'fim de jogo: "Jogar de novo" e "Ir para o Início"');

  ok(!errs.length, 'sem erros de JavaScript' + (errs.length ? ': ' + [...new Set(errs)].slice(0, 3).join(' | ') : ''));
  await b.close();
  console.log(falhas ? `${falhas} FALHA(S)` : 'NAVEGAÇÃO OK'); process.exit(falhas ? 1 : 0);
})();
