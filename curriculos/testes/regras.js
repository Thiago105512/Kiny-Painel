// Teste de navegador (Playwright) das regras obrigatórias do produto:
//  (1) UFAM e UEA nunca se misturam (importador e "Onde aparece" do tema);
//  (2) quem escolheu Medicina não vê ENEM/Direito/OAB (menu, filtros de Questões, Desempenho, Biblioteca, busca);
//  boas-vindas só na primeira abertura; simulado só é abandonado depois de confirmar na página.
// Rode na raiz:   python3 -m http.server 8765 &   e   node curriculos/testes/regras.js
const { chromium } = require('playwright');
const URL = process.env.APP_URL || 'http://localhost:8765/curriculos/app.html';
let falhas = 0; const ok = (c, m) => { console.log((c ? '  ✓ ' : '  ✗ ') + m); if (!c) falhas++; };
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {}); const errs = [];
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  const p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message));
  await p.goto(URL); await p.waitForTimeout(600);
  const go = async h => { await p.evaluate(h => { if (location.hash === h) render({ topo: true }); else location.hash = h; }, h); await p.waitForTimeout(200); };
  const txt = async () => (await p.innerText('#view')).replace(/\s+/g, ' ');
  const navTxt = async () => p.evaluate(() => document.querySelector('#nav-lateral').innerText + ' | ' + document.querySelector('#nav-inferior').innerText);

  console.log('1) Boas-vindas na primeira abertura');
  ok(await p.$('[data-act="bv-obj"][data-v="medicina"]') !== null, 'primeira abertura pergunta o objetivo');
  ok((await p.$$('#nav-lateral a, #nav-inferior a')).length === 0, 'sem menu antes da escolha (nada de ENEM na barra)');
  ok(!/Pílula do dia|Juiz das garantias|Questão relâmpago/.test(await txt()), 'nenhum conteúdo de estudo antes da escolha');
  await p.click('[data-act="bv-obj"][data-v="medicina"]'); await p.waitForTimeout(150);
  ok(await p.$('[data-act="bv-fac"][data-v="ufam"]') !== null && await p.$('[data-act="bv-fac"][data-v="uea"]') !== null, 'Medicina pergunta a faculdade (UFAM, UEA)');
  await p.click('[data-act="bv-fac"][data-v="ufam"]'); await p.waitForTimeout(150);
  await p.click('[data-act="bv-per"][data-v="3"]'); await p.waitForTimeout(250);
  let P = await p.evaluate(() => store.doc('perfil'));
  ok(P.objetivo === 'medicina' && P.faculdade === 'ufam' && P.periodo === 3 && P.boasVindas === true, 'perfil salvo: Medicina · UFAM · 3º período');
  ok(!(await p.$('[data-act="bv-obj"]')) && (await p.$$('#nav-inferior a')).length > 0, 'depois da escolha, o Início aparece com o menu');
  await p.reload(); await p.waitForTimeout(600);
  ok(!(await p.$('[data-act="bv-obj"]')), 'ao reabrir o app, as boas-vindas não aparecem de novo');
  const p2 = await ctx.newPage(); await p2.goto(URL + '#/'); await p2.waitForTimeout(500);
  ok(!(await p2.$('[data-act="bv-obj"]')), 'nem em outra aba do mesmo aparelho'); await p2.close();

  console.log('2) Medicina não vê ENEM/Direito/OAB');
  await go('#/');
  let nav = await navTxt();
  ok(!/ENEM|Redação|Outras áreas|Direito|OAB/.test(nav), 'menu lateral e barra sem ENEM/Redação/"Outras áreas"');
  await p.evaluate(() => ACOES['menu-mais']()); await p.waitForTimeout(100);
  ok(!/ENEM|Redação|Outras áreas/.test(await p.innerText('#camada')), 'menu "Mais" sem ENEM/Redação/"Outras áreas"');
  await p.evaluate(() => fecharFolha());
  ok(await p.evaluate(() => [...document.querySelectorAll('#dl-temas option')].every(o => !/^ENEM/.test(o.textContent)) && document.querySelectorAll('#dl-temas option').length > 0), 'autocompletar de temas sem temas do ENEM');
  await go('#/questoes');
  const fq = await p.evaluate(() => {
    const labs = [...document.querySelectorAll('.filtros .lab')].map(e => e.textContent);
    const opts = c => [...document.querySelectorAll(`select[data-chg="fq"][data-c="${c}"] option`)].map(o => o.value).filter(Boolean);
    const discsFora = unicos(questoes().filter(q => !doObjetivo(q)).map(q => q.disc)).filter(d => !questoes().some(q => doObjetivo(q) && q.disc === d));
    return { labs, discs: opts('disc'), temas: opts('tema'), discsFora, sub: document.querySelector('.titulo .sub').textContent, nObj: questoes().filter(doObjetivo).length, total: questoes().length,
      lista: filtrarQuestoes(FQ).every(q => ['medicina', 'residencia'].includes(q.t)) };
  });
  ok(!fq.labs.some(l => /ENEM/.test(l)), 'Mais filtros sem "Área do conhecimento (ENEM)"');
  ok(fq.discs.length > 0 && !fq.discs.some(d => fq.discsFora.includes(d)) && !fq.discs.some(d => /Penal|Civil|Matemática|Geografia/.test(d)), 'filtro Disciplina só com disciplinas de Medicina');
  ok(fq.temas.length > 0 && await p.evaluate(ts => ts.every(t => temaDoObjetivo(TEMAS[t])), fq.temas), 'filtro Tema sem temas do ENEM');
  ok(fq.sub.endsWith('de ' + fq.nObj) && fq.nObj < fq.total, `subtítulo conta só o banco do objetivo (${fq.sub})`);
  ok(fq.lista, 'lista de questões só de Medicina/Residência');
  await go('#/simulados'); await p.click('[data-act="sim-modo"][data-v="personalizado"]'); await p.waitForTimeout(150);
  ok(!/ENEM|Penal|Constitucional/.test(await p.evaluate(() => [...document.querySelectorAll('select[data-chg="fs"] option')].map(o => o.textContent).join('|'))), 'simulado personalizado: filtros sem ENEM/Direito');
  await p.click('[data-act="sim-modo"][data-v="prova"]'); await p.waitForTimeout(100);
  // Uma resposta de ENEM (de quando o objetivo era outro) não entra nos números de Medicina
  await p.evaluate(() => { const q = questoes().find(x => x.t === 'enem'); registrarResposta(q, (q.c + 1) % 5, 3000, 'pratica');
    const m = questoes().find(x => x.t === 'medicina'); registrarResposta(m, m.c, 3000, 'pratica'); });
  await go('#/desempenho');
  const dv = await p.evaluate(() => ({ chips: [...document.querySelectorAll('[data-act="dv-trilha"]')].map(e => e.dataset.v), abas: [...document.querySelectorAll('[data-act="dv-aba"]')].map(e => e.dataset.v),
    vistas: document.querySelector('.kpis .kpi:nth-child(3) b').textContent, n: questoes().filter(doObjetivo).length }));
  ok(!dv.chips.some(v => ['enem', 'direito', 'oab'].includes(v)), 'Desempenho sem chips ENEM/Direito/OAB (' + dv.chips.join(',') + ')');
  ok(!dv.abas.includes('enem'), 'Desempenho sem a aba ENEM');
  ok(dv.vistas.replace(/\s/g, '') === '1/' + dv.n, `total de questões vistas só do objetivo (${dv.vistas.trim()})`);
  ok(await p.evaluate(() => pendencias().erros.every(e => doObjetivo(qPorId(e.qid))) && Object.values(store.doc('erros').itens).some(e => qPorId(e.qid).t === 'enem')), 'erro antigo de ENEM não entra nas pendências de Medicina');
  ok(await p.evaluate(() => Object.values(store.doc('erros').itens).filter(erroDoObjetivo).length === 0), 'caderno de erros de Medicina não lista o erro de ENEM');
  await go('#/biblioteca/guia');
  const guias = await p.evaluate(() => [...document.querySelectorAll('#view details summary')].map(s => s.textContent));
  ok(guias.length > 0 && !guias.some(g => /ENEM|Vestibulares|Direito|OAB/.test(g)), 'Biblioteca: guias só de Medicina/Residência (' + guias.map(g => g.replace(/\s+\d+\/\d+/, '')).join(', ') + ')');
  await go('#/biblioteca/questoes');
  ok(await p.evaluate(() => [...document.querySelectorAll('#nq-t option')].every(o => ['medicina', 'residencia'].includes(o.value))), 'Minhas questões: trilhas só Medicina/Residência');
  await go('#/busca/lei');
  ok(!/Repertórios de redação|ENEM ·|Direito/.test(await txt()), 'busca sem repertórios de redação nem ENEM/Direito');
  await go('#/busca/%20'); ok(!/resultado/.test(await txt()) && /pelo menos 2 letras/.test(await txt()), 'busca vazia não lista o app inteiro');

  console.log('3) UFAM × UEA: importador');
  await go('#/medicina/importar/uea');
  await p.fill('[data-c="versao"]', 'MISTURA'); await p.dispatchEvent('[data-c="versao"]', 'change');
  await p.fill('#imp-txt', '1º período\nUEA101 Módulo Exclusivo da UEA 120h\nUEA102 Outro Módulo UEA 90h'); await p.click('[data-act="imp-interpretar"]'); await p.waitForTimeout(150);
  ok((await p.$$('[data-chg="imp-cel"][data-c="nome"]')).length === 2, 'UEA: 2 linhas extraídas');
  await p.selectOption('#imp-inst', 'ufam'); await p.waitForTimeout(250);
  const imp = await p.evaluate(() => ({ inst: IMP.inst, n: IMP.linhas.length, texto: IMP.texto, versao: IMP.versao, hash: location.hash, linhasTela: document.querySelectorAll('[data-chg="imp-cel"]').length, txtTela: document.querySelector('#imp-txt').value }));
  ok(imp.inst === 'ufam' && imp.hash === '#/medicina/importar/ufam', 'trocar para UFAM leva ao importador da UFAM');
  ok(imp.n === 0 && !imp.texto && !imp.versao && !imp.linhasTela && !imp.txtTela, 'ao trocar de faculdade, nenhuma linha/texto/versão da UEA continua carregado');
  ok(/descartado/.test(await txt()), 'avisa que o conteúdo anterior foi descartado');
  await p.click('[data-act="imp-add"]'); await p.fill('[data-c="versao"]', 'MISTURA'); await p.dispatchEvent('[data-c="versao"]', 'change');
  await p.evaluate(() => { IMP.linhas[0].nome = 'Anatomia UFAM'; }); await p.click('[data-act="imp-salvar"]'); await p.waitForTimeout(200);
  ok(await p.evaluate(() => { const g = gradePorId('ufam-medicina-mistura'); return !!g && itensGrade(g).every(i => !/UEA/.test(i.nome)) && !gradePorId('uea-medicina-mistura'); }), 'matriz salva na UFAM sem nada da UEA');
  await go('#/medicina/importar/uea'); await p.fill('#imp-txt', 'texto qualquer'); await p.dispatchEvent('#imp-txt', 'change');
  await go('#/medicina/importar/ufam'); ok(await p.evaluate(() => !IMP.texto && IMP.inst === 'ufam'), 'mudar a faculdade pelo endereço também descarta o texto');

  console.log('4) UFAM × UEA: "Onde aparece" do tema');
  const tema = await p.evaluate(() => { const g = gradesDe('ufam').find(g => Object.keys(temasNaGrade(g)).length); const t = Object.keys(temasNaGrade(g))[0];
    salvarGrade({ id: 'uea-medicina-teste-regras', instituicao: 'uea', curso: 'medicina', versao: 'teste regras', status: 'importado', periodos: [{ numero: 2, nome: '2º período', itens: [{ id: 'mod-uea', tipo: 'modulo', nome: 'Módulo UEA com o tema', temas: [t] }] }] }); return t; });
  let onde = await p.evaluate(t => ondeNaGrade(t).map(o => o.g.instituicao), tema);
  ok(onde.length > 0 && onde.every(i => i === 'ufam'), 'perfil UFAM: só matrizes da UFAM (' + onde.join(',') + ')');
  await go('#/tema/' + tema); ok(!/Módulo UEA com o tema|UEA ·/.test(await txt()), 'página do tema (UFAM) não mostra a matriz da UEA');
  await p.evaluate(() => { const P = store.doc('perfil'); P.faculdade = 'uea'; P.gradeId = 'uea-medicina-teste-regras'; store.mudou('perfil'); });
  onde = await p.evaluate(t => ondeNaGrade(t).map(o => o.g.instituicao), tema);
  ok(onde.length === 1 && onde[0] === 'uea', 'perfil UEA: só a matriz da UEA (' + onde.join(',') + ')');
  await go('#/tema/' + tema); ok(!/UFAM ·/.test(await txt()), 'página do tema (UEA) não mostra a matriz da UFAM');
  await go('#/busca/' + encodeURIComponent('Módulo UEA')); ok(/Módulo UEA com o tema/.test(await txt()), 'busca mostra a matriz da própria faculdade');
  await p.evaluate(() => { const P = store.doc('perfil'); P.faculdade = 'ufam'; P.gradeId = null; store.mudou('perfil'); });
  await go('#/busca/' + encodeURIComponent('Módulo UEA')); ok(!/Módulo UEA com o tema/.test(await txt()), 'busca (UFAM) não mostra itens da matriz da UEA');
  ok(await p.evaluate(() => { const base = GRADES_BASE[0], antes = JSON.stringify(base); const g = gradeEditavel(base.id); itensGrade(g); g.periodos[0].itens[0].conferido = true; return JSON.stringify(base) === antes; }), 'editar a matriz de fábrica não altera o original em memória');

  console.log('5) Simulado: abandonar só depois de confirmar');
  await go('#/simulados'); await p.click('[data-act="sim-n"][data-v="10"]'); await p.click('[data-act="sim-iniciar"]'); await p.waitForTimeout(250);
  await p.click('[data-act="sim-marcar"] >> nth=0'); await p.waitForTimeout(100);
  ok(await p.evaluate(() => !document.querySelector('[data-act="sim-abandonar"]').closest('.acoes')?.querySelector('[data-act="sim-entregar"]')), '"Abandonar" fica separado de "Entregar"');
  await p.click('[data-act="sim-abandonar"]'); await p.waitForTimeout(150);
  ok(await p.evaluate(() => SIM.fase === 'prova' && Object.keys(SIM.resp).length === 1), 'um toque em Abandonar não apaga a prova');
  ok(/Abandonar a prova\?/.test(await txt()) && /1 resposta marcada/.test(await txt()), 'pergunta na página, com o que se perde');
  await p.click('[data-act="sim-abandonar-nao"]'); await p.waitForTimeout(100);
  ok(await p.evaluate(() => SIM.fase === 'prova' && !SIM.abandonando), '"Continuar a prova" mantém tudo');
  await p.click('[data-act="sim-abandonar"]'); await p.click('[data-act="sim-abandonar-ok"]'); await p.waitForTimeout(150);
  ok(await p.evaluate(() => SIM.fase === 'config' && store.doc('simulados').hist.length === 0), 'só abandona depois de confirmar (e nada entra no histórico)');
  ok(/Cronometrar \(2,5 min/.test(await txt()) || /Cronometrar \(2,4 min/.test(await txt()), 'minutos por questão com vírgula');

  console.log('6) Detalhes da aluna');
  await go('#/');
  const qr = await p.$('[data-act="qr-resp"]');
  if (qr) { await p.evaluate(() => { const q = qPorId(QR.id); document.querySelector(`[data-act="qr-resp"][data-i="${(q.c + 1) % 5}"]`).click(); }); await p.waitForTimeout(250);
    const r = await p.evaluate(() => { const q = qPorId(QR.id); return { v: document.querySelector('.relampago .veredito').textContent, certa: q.o[q.c], foco: document.activeElement === document.querySelector('.relampago .veredito') }; });
    ok(r.v.includes(r.certa) && /A resposta certa é [A-E]/.test(r.v), 'relâmpago mostra por extenso a resposta certa');
    ok(r.foco, 'relâmpago leva o foco (e a rolagem) até o retorno'); }
  const pil = await p.evaluate(() => pilulaDoDia()?.id);
  if (pil) { await p.evaluate(id => { const V = store.doc('pilulas'); V.v[id] = [Date.now(), 1]; store.mudou('pilulas'); }, pil); await go('#/estudar'); await go('#/');
    ok(await p.evaluate(id => pilulaDoDia().id === id && !document.querySelector(`.desafios a[href="#/estudar/p/${id}"]`), pil), 'pílula do dia fica a mesma e sai do Início depois de vista'); }
  await p.evaluate(() => { store.zerar([...blocosCards()]); const m = questoes().find(x => x.t === 'medicina' && !store.doc('erros').itens[x.id]); registrarResposta(m, (m.c + 1) % 5, 3000, 'pratica'); });
  await go('#/flashcards'); await p.click('[data-act="cards-dos-erros"]'); await p.waitForTimeout(150);
  ok(await p.evaluate(() => cards().length >= 1 && cards().every(c => c.origem === 'erro')), '"dos seus erros" cria os flashcards de verdade');
  // Teclado (baixa visão / leitor de tela): Enter aciona o botão focado e o foco não volta ao topo
  await p.evaluate(() => praticar(questoes().filter(q => q.t === 'medicina').slice(0, 3).map(q => q.id), 'teclado')); await p.waitForTimeout(250);
  await p.focus('[data-act="pl-alt"] >> nth=1'); await p.keyboard.press('Enter'); await p.waitForTimeout(150);
  let k = await p.evaluate(() => ({ esc: PL.esc, resp: PL.resp, foco: document.activeElement?.dataset?.act, i: document.activeElement?.dataset?.i }));
  ok(k.esc !== null && !k.resp && k.foco === 'pl-alt' && +k.i === k.esc, 'Enter na alternativa focada escolhe e o foco fica nela');
  await p.focus('[data-act="pl-pular"]'); await p.keyboard.press('Enter'); await p.waitForTimeout(150);
  k = await p.evaluate(() => ({ i: PL.i, n: PL.res.length }));
  ok(k.i === 1 && k.n === 0, 'Enter em "Pular" pula (não confirma)');
  await p.click('#letra-btn'); await p.waitForTimeout(100);
  ok((await p.$$('#camada [data-act="letra-set"]')).length === 4 && (await p.$$('#camada [data-act="tema-cor"]')).length === 3, '"Aa" mostra os 4 tamanhos e as cores');
  await p.click('#camada [data-act="tema-cor"][data-v="dark"]'); ok(await p.evaluate(() => document.documentElement.dataset.theme === 'dark'), 'tema escuro escolhido à mão');
  await p.click('#camada [data-act="tema-cor"][data-v="auto"]'); await p.evaluate(() => fecharFolha());

  ok(!errs.length, errs.length ? 'erros de JS: ' + errs.join(' | ') : 'Sem erros de JS');
  await b.close(); console.log(falhas ? `${falhas} FALHA(S)` : 'REGRAS OK'); process.exit(falhas ? 1 : 0);
})();
