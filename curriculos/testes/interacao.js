// Teste de navegador (Playwright): recursos de interação do player e dos flashcards —
// 1) Ouvir (leitura em voz alta, speechSynthesis simulado), 2) descartar alternativas, 3) grau de certeza
// (progresso, caderno de erros e Desempenho), 4) sequência de acertos, 5) flashcards com gesto,
// 6) vibração ligada ao "Som e vibração", 7) marca-texto no enunciado; e encaixe com letra Enorme a 360/390 px.
// Rode na raiz:  python3 -m http.server 8765 &  e  node curriculos/testes/interacao.js
const { chromium } = require('playwright');
const URL = process.env.APP_URL || 'http://localhost:8765/curriculos/app.html';
let falhas = 0; const ok = (c, m) => { console.log((c ? '  ✓ ' : '  ✗ ') + m); if (!c) falhas++; };

// Voz simulada: fala uma frase por vez (onstart → onend), registra texto, velocidade, idioma e voz; cancel() interrompe.
const vozFalsa = () => {
  window.__falas = []; window.__cancel = 0; window.__dur = 250;
  class U { constructor(t) { this.text = t; } }
  const ss = { speaking: false, pending: false, _q: [],
    speak(u) { window.__falas.push({ t: u.text, rate: u.rate, lang: u.lang, voz: u.voice && u.voice.lang }); this._q.push(u); this.speaking = true; if (this._q.length === 1) this._prox(); },
    _prox() { const u = this._q[0]; if (!u) { this.speaking = false; return; }
      setTimeout(() => { if (this._q[0] !== u) return; u.onstart && u.onstart();
        setTimeout(() => { if (this._q[0] !== u) return; this._q.shift(); u.onend && u.onend(); this._prox(); }, window.__dur); }, 0); },
    cancel() { window.__cancel++; const q = this._q; this._q = []; this.speaking = false; q.forEach(u => u.onerror && u.onerror({ error: 'interrupted' })); },
    getVoices() { return [{ lang: 'en-US', name: 'E' }, { lang: 'pt-BR', name: 'Luciana' }]; } };
  Object.defineProperty(window, 'speechSynthesis', { value: ss, configurable: true });
  window.SpeechSynthesisUtterance = U;
  window.__vib = []; Object.defineProperty(navigator, 'vibrate', { value: p => { window.__vib.push(p); return true; }, configurable: true });
};
const perfilMed = () => { const P = store.doc('perfil'); P.objetivo = 'medicina'; P.boasVindas = true; store.mudou('perfil'); };
// Questões simples (sem imagem e sem caso em partes), com enunciado de 2+ frases para o marca-texto.
const idsSimples = n => questoes().filter(q => q.t === 'medicina' && !q.img && !q.serie && !q.familia && (q.q.match(/[.!?](\s|$)/g) || []).length >= 2).slice(0, n).map(q => q.id);
const escolher = async (p, certa) => p.evaluate(c => { const q = qPorId(PL.ids[PL.i]); const i = c ? q.c : (q.c + 1) % 5; document.querySelector(`[data-act="pl-alt"][data-i="${i}"]`).click(); }, certa);
const responder = async (p, certa, cert) => { await escolher(p, certa);
  if (cert) await p.click(`[data-act="pl-cert"][data-v="${cert}"]`);
  await p.click('[data-act="pl-confirmar"]'); await p.waitForTimeout(80); };
const proxima = async p => { await p.click('[data-act="pl-prox"]'); await p.waitForTimeout(80); };

(async () => {
  const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {}); const errs = [];
  let ctx = await b.newContext({ viewport: { width: 390, height: 844 } }); let p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message));
  await p.addInitScript(vozFalsa);
  await p.goto(URL); await p.waitForTimeout(500); await p.evaluate(perfilMed);
  const go = async h => { await p.evaluate(h => { location.hash = h; }, h); await p.waitForTimeout(150); };

  console.log('3a) Desempenho sem dados de certeza não mostra a seção');
  await go('#/desempenho'); ok(!(await p.innerText('#view')).includes('Certeza × acerto'), 'sem respostas com certeza: seção "Certeza × acerto" não aparece');

  console.log('1) Ouvir no player');
  const ids = await p.evaluate(idsSimples, 12); ok(ids.length === 12, '12 questões de teste');
  await p.evaluate(ids => praticar(ids, 'interação'), ids); await p.waitForTimeout(250);
  ok(!!(await p.$('#pl [data-act="ouvir"]')), 'player tem o botão "Ouvir"');
  await p.click('#pl [data-act="ouvir"]'); await p.waitForTimeout(120);
  let r = await p.evaluate(() => { const q = qPorId(PL.ids[PL.i]); return { falas: window.__falas.map(f => f.t), q: q.q, rate: window.__falas[0]?.rate, lang: window.__falas[0]?.lang, voz: window.__falas[0]?.voz, botao: document.querySelector('#pl [data-act="ouvir"]').textContent.trim(), lendo: !!document.querySelector('#pl .enunciado.lendo') }; });
  ok(r.falas.join(' ').includes(r.q.replace(/\s+/g, ' ').trim().slice(0, 40)) && ['A', 'B', 'C', 'D', 'E'].every(l => r.falas.some(f => f.startsWith('Alternativa ' + l + ':'))), 'lê o enunciado e "Alternativa A… E"');
  ok(r.lang === 'pt-BR' && r.voz === 'pt-BR' && r.rate === 1, 'voz pt-BR, velocidade normal');
  ok(/Parar leitura/.test(r.botao) && r.lendo, 'botão vira "Parar leitura" e o enunciado fica destacado enquanto é lido');
  await p.evaluate(() => { window.__dur = 60; }); await p.waitForFunction(() => !!document.querySelector('#pl .alt.lendo'), null, { timeout: 4000 });
  ok(true, 'alternativa lida fica destacada');
  await p.click('#pl [data-act="ouvir"]'); await p.waitForTimeout(80);
  r = await p.evaluate(() => ({ id: VOZ.id, c: window.__cancel, lendo: document.querySelectorAll('.lendo').length, botao: document.querySelector('#pl [data-act="ouvir"]').textContent.trim() }));
  ok(r.id === null && r.c >= 1 && !r.lendo && /Ouvir/.test(r.botao), 'tocar de novo para a leitura e tira o destaque');
  await p.evaluate(() => { window.__dur = 250; }); await p.click('#pl [data-act="ouvir"]'); await p.waitForTimeout(60);
  await go('#/desempenho'); r = await p.evaluate(() => ({ id: VOZ.id, q: speechSynthesis._q.length })); ok(r.id === null && r.q === 0, 'trocar de página para a leitura');
  await go('#/questoes'); await responder(p, true);
  await p.evaluate(() => { window.__falas = []; }); await p.click('#pl [data-act="ouvir"]'); await p.waitForTimeout(60);
  r = await p.evaluate(() => window.__falas.map(f => f.t).join(' | ')); ok(/^Certo\./.test(r) && /Por quê:/.test(r), 'depois de responder, lê o resultado e a explicação');
  await p.click('#pl [data-act="ouvir"]');
  // velocidade na folha "Aa"
  await p.click('#letra-btn'); await p.waitForTimeout(80);
  ok((await p.$$('#camada [data-act="voz-vel"]')).length === 3 && (await p.$$('#camada [data-act="som-set"]')).length === 2, 'folha "Aa" tem velocidade da leitura (3) e Som e vibração');
  await p.click('#camada [data-act="voz-vel"][data-v="0.8"]'); await p.waitForTimeout(80);
  r = await p.evaluate(() => ({ ls: JSON.parse(localStorage.getItem('gab2:voz-vel')), amostra: window.__falas.at(-1) }));
  ok(r.ls === 0.8 && r.amostra.rate === 0.8 && /velocidade/.test(r.amostra.t), '"Mais lenta" fica gravada e toca uma amostra a 0,8');
  await p.evaluate(() => fecharFolha());
  await proxima(p);
  await p.evaluate(() => { window.__falas = []; }); await p.click('#pl [data-act="ouvir"]'); await p.waitForTimeout(60);
  ok(await p.evaluate(() => window.__falas[0].rate === 0.8), 'a leitura usa a velocidade escolhida');
  await p.click('#pl [data-act="ouvir"]');

  console.log('7) Marca-texto no enunciado');
  const nFr = await p.$$eval('#pl .enunciado .frase', e => e.length); ok(nFr >= 2, `enunciado dividido em ${nFr} frases tocáveis`);
  const textoIgual = await p.evaluate(() => document.querySelector('#pl .enunciado').textContent === qPorId(PL.ids[PL.i]).q); ok(textoIgual, 'o texto do enunciado continua idêntico');
  await p.click('#pl .enunciado .frase[data-n="1"]'); await p.waitForTimeout(60);
  r = await p.evaluate(() => { const e = document.querySelector('#pl .frase[data-n="1"]'), cs = getComputedStyle(e); return { m: e.classList.contains('marcada'), bg: cs.backgroundColor, cor: cs.color, esc: PL.esc, marcas: [...PL.marcas] }; });
  ok(r.m && r.esc === null && r.marcas.join() === '1', 'tocar numa frase destaca só ela e não escolhe alternativa');
  ok(r.bg === 'rgb(255, 228, 92)', 'destaque amarelo (' + r.bg + ')');
  const contraste = await p.evaluate(() => { const lum = s => { const [r, g, b] = s.match(/\d+/g).slice(0, 3).map(Number).map(x => { x /= 255; return x <= .04045 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4; }); return .2126 * r + .7152 * g + .0722 * b; };
    const out = {}; for (const t of ['light', 'dark']) { document.documentElement.dataset.theme = t; const cs = getComputedStyle(document.querySelector('#pl .frase.marcada')); const a = lum(cs.color), b2 = lum(cs.backgroundColor); out[t] = (Math.max(a, b2) + .05) / (Math.min(a, b2) + .05); }
    delete document.documentElement.dataset.theme; return out; });
  ok(contraste.light >= 4.5 && contraste.dark >= 4.5, `contraste do destaque: claro ${contraste.light.toFixed(1)}:1, escuro ${contraste.dark.toFixed(1)}:1`);
  await escolher(p, true); ok(await p.evaluate(() => document.querySelector('#pl .frase[data-n="1"]').classList.contains('marcada')), 'o destaque continua depois de escolher a alternativa');
  await p.click('#pl .enunciado .frase[data-n="1"]'); ok(await p.evaluate(() => !document.querySelector('#pl .frase.marcada')), 'tocar de novo tira o destaque');
  await p.click('#pl .enunciado .frase[data-n="0"]');
  await p.click('[data-act="pl-confirmar"]'); await p.waitForTimeout(60); await proxima(p);
  ok(await p.evaluate(() => !document.querySelector('#pl .frase.marcada') && PL.marcas.size === 0), 'na questão seguinte não sobra destaque');

  console.log('2) Descartar alternativas');
  r = await p.evaluate(() => { const bs = [...document.querySelectorAll('#pl [data-act="pl-desc"]')]; return { n: bs.length, rot: bs.map(b => b.getAttribute('aria-label')), tam: bs.map(b => { const x = b.getBoundingClientRect(); return Math.min(x.width, x.height); }) }; });
  ok(r.n === 5 && r.rot.join('|') === 'Descartar alternativa A|Descartar alternativa B|Descartar alternativa C|Descartar alternativa D|Descartar alternativa E', 'um ✕ por alternativa, com rótulo "Descartar alternativa X"');
  ok(r.tam.every(t => t >= 44), 'alvos de toque do ✕ com 44 px ou mais');
  const errada = await p.evaluate(() => { const q = qPorId(PL.ids[PL.i]); return (q.c + 1) % 5; });
  await p.click(`[data-act="pl-desc"][data-i="${errada}"]`); await p.waitForTimeout(60);
  r = await p.evaluate(i => { const a = document.querySelector(`#pl [data-act="pl-alt"][data-i="${i}"]`), cs = getComputedStyle(a); return { dis: a.disabled, risc: cs.textDecorationLine, op: +cs.opacity, press: document.querySelector(`[data-act="pl-desc"][data-i="${i}"]`).getAttribute('aria-pressed') }; }, errada);
  ok(r.dis && r.risc.includes('line-through') && r.op < 1 && r.press === 'true', 'descartada fica esmaecida, riscada, indisponível e com aria-pressed');
  await p.evaluate(i => { const l = LETRAS[PL.ordem.indexOf(i)]; document.dispatchEvent(new KeyboardEvent('keydown', { key: l.toLowerCase(), bubbles: true })); }, errada);
  ok(await p.evaluate(() => PL.esc === null), 'a letra da descartada no teclado não escolhe');
  await p.click(`[data-act="pl-desc"][data-i="${errada}"]`); await p.waitForTimeout(60);
  ok(await p.evaluate(i => !document.querySelector(`#pl [data-act="pl-alt"][data-i="${i}"]`).disabled, errada), 'tocar de novo restaura');
  await p.click(`[data-act="pl-alt"][data-i="${errada}"]`); await p.click(`[data-act="pl-desc"][data-i="${errada}"]`); await p.waitForTimeout(60);
  ok(await p.evaluate(() => PL.esc === null), 'descartar a alternativa escolhida desfaz a escolha');
  const antesProg = await p.evaluate(() => { const q = qPorId(PL.ids[PL.i]); return progDe(q)?.ac || 0; });
  await responder(p, true);
  r = await p.evaluate(() => { const q = qPorId(PL.ids[PL.i]); return { ac: progDe(q).ac, x: document.querySelectorAll('#pl [data-act="pl-desc"]').length, risc: document.querySelectorAll('#pl .descartada').length, ok: PL.res.at(-1).ok }; });
  ok(r.ok && r.ac === antesProg + 1, 'com descarte, o acerto conta normalmente (pontuação igual)');
  ok(r.x === 0 && r.risc === 0, 'depois de confirmar, os ✕ e o riscado somem');
  await proxima(p);

  console.log('3) Grau de certeza');
  ok(!(await p.$('[data-act="pl-cert"]')), 'antes de escolher, sem chips de certeza');
  await escolher(p, true);
  r = await p.$$eval('[data-act="pl-cert"]', e => e.map(x => x.textContent + ':' + x.getAttribute('aria-pressed')));
  ok(r.join('|') === 'Tenho certeza:false|Acho que sim:false|Chutei:false', 'depois de escolher: chips "Tenho certeza / Acho que sim / Chutei", nenhum marcado');
  await p.click('[data-act="pl-cert"][data-v="2"]'); await p.click('[data-act="pl-cert"][data-v="2"]');
  ok(await p.evaluate(() => PL.cert === null), 'tocar de novo desmarca (é opcional)');
  await p.click('[data-act="pl-cert"][data-v="1"]'); const qChute = await p.evaluate(() => PL.ids[PL.i]);
  await p.click('[data-act="pl-confirmar"]'); await p.waitForTimeout(80);
  r = await p.evaluate(id => { const q = qPorId(id), h = progDe(q).h.at(-1), e = store.doc('erros').itens[id]; return { h, e, txt: document.querySelector('#pl .retorno').innerText, amanha: somaDias(hoje(), 1) }; }, qChute);
  ok(r.h.length === 6 && r.h[5] === 1 && r.h[2] === 1, 'tentativa gravada com a certeza no 6º campo: ' + JSON.stringify(r.h.slice(2)));
  ok(r.e && r.e.motivo === 'Acertou no chute' && r.e.status === 'aberto' && r.e.srs.prox === r.amanha && !r.e.n, 'acertou no chute → caderno de erros, motivo "Acertou no chute", revisão amanhã');
  ok(/Acertou no chute/.test(r.txt), 'o retorno avisa que a questão volta mais cedo');
  await proxima(p); await responder(p, true, 3); await proxima(p); await responder(p, false, 3); await proxima(p);
  r = await p.evaluate(() => PL.res.slice(-2).map(x => x.cert)); ok(r.join() === '3,3', 'certeza guardada também no resultado da sessão');
  const semCert = await p.evaluate(() => { const q = qPorId(PL.ids[PL.i - 4]); return progDe(q).h.at(-1).length; });
  ok(semCert === 5, 'sem certeza escolhida, a tentativa mantém o formato antigo (5 campos)');
  // erro aberto + acerto no chute na revisão → revisão mais cedo (não avança a etapa)
  r = await p.evaluate(() => { const q = questoes().find(x => x.t === 'medicina' && !store.doc('erros').itens[x.id]); registrarResposta(q, (q.c + 1) % 5, 4000, 'pratica'); const e = store.doc('erros').itens[q.id]; e.srs = agendar(agendar(e.srs, 2), 2); const etapa = e.srs.etapa;
    registrarResposta(q, q.c, 4000, 'erro', 1); return { antes: etapa, depois: store.doc('erros').itens[q.id].srs.etapa, st: store.doc('erros').itens[q.id].status }; });
  ok(r.depois === r.antes && r.st === 'aberto', 'erro aberto acertado no chute: repete a etapa (revisão mais cedo) e continua aberto');

  console.log('4) Sequência de acertos');
  r = await p.evaluate(() => PL.seq); ok(r === 0, 'erro zerou a sequência');
  for (let i = 0; i < 2; i++) { await responder(p, true); await proxima(p); }
  ok(!(await p.$('.pl-seq')), 'com 2 seguidas ainda não mostra o contador');
  await responder(p, true);
  r = await p.evaluate(() => { const e = document.querySelector('.pl-seq'); return e && { t: e.textContent.trim(), novo: e.classList.contains('novo'), anim: getComputedStyle(e).animationName }; });
  ok(r && /3 seguidas/.test(r.t) && r.novo && r.anim === 'pulo', 'a partir de 3: "🔥 3 seguidas" com animação (' + (r && r.anim) + ')');
  await proxima(p); await responder(p, true); await proxima(p); await responder(p, true);
  r = await p.evaluate(() => { const c = document.querySelector('.celebra-flutuante'); return { seq: PL.seq, c: c && c.textContent, pe: c && getComputedStyle(c).pointerEvents }; });
  ok(r.seq === 5 && /5 acertos seguidos/.test(r.c || '') && r.pe === 'none', 'a cada 5: comemoração leve que não bloqueia cliques');
  await proxima(p); ok((await p.evaluate(() => PL.ativo && !PL.fim)), 'o player segue normalmente durante a comemoração');
  await responder(p, false); ok(!(await p.$('.pl-seq')) && (await p.evaluate(() => PL.seq)) === 0, 'errar zera e esconde o contador');

  console.log('3b) Certeza × acerto no Desempenho');
  await go('#/desempenho'); const dtx = await p.innerText('#view');
  ok(/Certeza × acerto/i.test(dtx) && /Tenho certeza/.test(dtx) && /Chutei/.test(dtx) && /50% · 1\/2/.test(dtx), 'Desempenho mostra "Certeza × acerto" (certeza 1/2, chute 1/1)');

  console.log('6) Vibração com o ajuste "Som e vibração"');
  await p.evaluate(() => { window.__vib = []; });
  await p.evaluate(ids => praticar(ids, 'vibra'), ids.slice(0, 3)); await p.waitForTimeout(200);
  await responder(p, true); ok(await p.evaluate(() => window.__vib.length === 0), 'com o ajuste desligado (padrão), não vibra');
  await p.click('#letra-btn'); await p.click('#camada [data-act="som-set"][data-v="1"]'); await p.evaluate(() => { fecharFolha(); window.__vib = []; });
  ok(await p.evaluate(() => store.doc('jogos').som === true), '"Som e vibração: Ligados" liga o mesmo ajuste dos jogos');
  await proxima(p); await responder(p, true); await proxima(p); await responder(p, false);
  r = await p.evaluate(() => window.__vib); ok(JSON.stringify(r) === '[30,[60,90,60]]', 'vibra curto no acerto e duas vezes no erro: ' + JSON.stringify(r));
  await go('#/jogos'); ok(/Som e vibração: ligados/.test(await p.innerText('#view')), 'rótulo nos Jogos: "Som e vibração"');
  await p.evaluate(() => { Object.defineProperty(navigator, 'vibrate', { value: undefined, configurable: true }); som('ok'); som('erro'); });
  ok(!errs.length, 'sem navigator.vibrate: segue em silêncio, sem erro');

  console.log('5) Flashcards com gesto');
  await p.evaluate(() => { store.zerar([...blocosCards()]); for (let i = 0; i < 6; i++) criarCard({ frente: 'Frente do card ' + i + '. Qual é a resposta?', verso: 'Verso do card ' + i, origem: 'manual', tema: null }); FC.chave = null; });
  await go('#/flashcards/estudar');
  ok(!!(await p.$('#fc [data-act="ouvir"]')), 'flashcard tem "Ouvir"');
  await p.evaluate(() => { window.__falas = []; }); await p.click('#fc [data-act="ouvir"]'); await p.waitForTimeout(40);
  ok(await p.evaluate(() => /^Frente do card/.test(window.__falas[0].t) && !FC.mostrar), 'Ouvir lê a frente e não vira o cartão'); await p.click('#fc [data-act="ouvir"]');
  await p.click('#fc .frente'); await p.waitForTimeout(80);
  r = await p.evaluate(() => ({ m: FC.mostrar, verso: !!document.querySelector('#fc .verso'), virou: document.querySelector('#fc').classList.contains('virou'), anim: getComputedStyle(document.querySelector('#fc')).animationName, botoes: document.querySelectorAll('[data-act="fc-nota"]').length }));
  ok(r.m && r.verso && r.virou && r.anim === 'virar', 'tocar no cartão vira (com animação de virar)');
  ok(r.botoes === 4, 'os botões Errei/Difícil/Bom/Fácil continuam');
  const arrastar = async (dx, soltar = true) => { const bx = await p.$eval('#fc', e => { const r = e.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + 60 }; });
    await p.mouse.move(bx.x, bx.y); await p.mouse.down(); for (let k = 1; k <= 6; k++) await p.mouse.move(bx.x + dx * k / 6, bx.y + 2);
    if (soltar) { await p.mouse.up(); await p.waitForTimeout(400); } };
  await arrastar(70, false);
  r = await p.evaluate(() => { const f = document.querySelector('#fc'); return { puxa: f.dataset.puxa, tr: f.style.transform, sh: getComputedStyle(f).boxShadow }; });
  ok(r.puxa === 'dir' && /translateX\(70px\)/.test(r.tr), 'o cartão acompanha o dedo, com dica verde "Lembrei" (' + r.tr + ')');
  await p.mouse.up(); await p.waitForTimeout(300);   // 70 px fica abaixo do limite: volta ao lugar
  r = await p.evaluate(() => ({ n: FC.feitos.length, m: FC.mostrar, tr: document.querySelector('#fc').style.transform, puxa: document.querySelector('#fc').dataset.puxa }));
  ok(r.n === 0 && r.m && !r.tr && !r.puxa, 'arrasto curto volta ao lugar sem avaliar (e não vira o cartão)');
  await arrastar(200);
  r = await p.evaluate(() => ({ f: FC.feitos.slice(), i: FC.i, hist: cards().filter(c => c.srs.hist.length).map(c => c.srs.hist.at(-1)[1]) }));
  ok(r.f.join() === '2' && r.i === 1 && r.hist.join() === '2', 'deslizar para a direita = "Lembrei" (nota Bom)');
  await p.click('#fc .frente'); await arrastar(-200);
  r = await p.evaluate(() => ({ f: FC.feitos.slice(), i: FC.i }));
  ok(r.f.join() === '2,0' && r.i === 2, 'deslizar para a esquerda = "Esqueci" (nota Errei)');
  await arrastar(200); ok(await p.evaluate(() => FC.feitos.length === 2), 'antes de virar, deslizar não avalia');
  await p.keyboard.press(' '); await p.waitForTimeout(60); ok(await p.evaluate(() => FC.mostrar), 'teclado: espaço mostra a resposta');
  await p.keyboard.press('ArrowLeft'); await p.waitForTimeout(60); ok(await p.evaluate(() => FC.feitos.join() === '2,0,0' && !FC.mostrar), 'teclado: ← esqueci');
  await p.keyboard.press(' '); await p.keyboard.press('3'); await p.waitForTimeout(60); ok(await p.evaluate(() => FC.feitos.at(-1) === 2), 'teclado: 1–4 continuam valendo');
  await p.click('#fc .frente'); await p.click('[data-act="fc-nota"][data-n="3"]'); await p.waitForTimeout(60); ok(await p.evaluate(() => FC.feitos.at(-1) === 3), 'botão "Fácil" continua funcionando');

  console.log('1b) Ouvir nas pílulas e no caso clínico');
  const pil = await p.evaluate(() => PILULAS.find(pilDoObjetivo)?.id);
  if (pil) { await go('#/estudar/p/' + pil); await p.evaluate(() => { window.__falas = []; }); await p.click('#pil [data-act="ouvir"]'); await p.waitForTimeout(40);
    r = await p.evaluate(id => ({ t: window.__falas.map(f => f.t).join(' '), tit: PIL[id].titulo }), pil); ok(r.t.startsWith(r.tit.slice(0, 20)), 'pílula: lê título e pergunta');
    await p.click('[data-act="pil-mostrar"]'); await p.waitForTimeout(60); ok(!!(await p.$('#pil [data-act="ouvir"]')), 'pílula aberta mantém o botão "Ouvir"');
    await p.evaluate(() => { window.__falas = []; }); await p.click('#pil [data-act="ouvir"]'); if (await p.evaluate(() => VOZ.id === null)) await p.click('#pil [data-act="ouvir"]'); await p.waitForTimeout(40);
    ok(await p.evaluate(() => /Por que importa/.test(window.__falas.map(f => f.t).join(' '))), 'pílula aberta: lê também a resposta e o porquê'); }
  const caso = await p.evaluate(() => todosCasos()[0]?.id);
  await go('#/casos/' + caso); await p.evaluate(() => { window.__falas = []; }); await p.click('[data-act="ouvir"]'); await p.waitForTimeout(40);
  r = await p.evaluate(id => ({ t: window.__falas.map(f => f.t).join(' '), c: casoPorId(id) }), caso);
  ok(r.t.includes('Queixa principal:') && !r.t.includes('Conduta:'), 'caso clínico: lê só o que já foi revelado');
  await go('#/'); ok(await p.evaluate(() => VOZ.id === null), 'sair do caso para a leitura');

  console.log('2b) Início sem nada riscado');
  r = await p.evaluate(() => [...document.querySelectorAll('#view *')].filter(e => getComputedStyle(e).textDecorationLine.includes('line-through')).map(e => e.className));
  ok(!r.length, 'nenhum texto riscado no Início' + (r.length ? ': ' + r.join(',') : ''));
  ok(!errs.length, errs.length ? 'erros de JS: ' + errs.join(' | ') : 'Sem erros de JS');
  await ctx.close();

  console.log('1c) Sem a API de voz, o botão não aparece');
  ctx = await b.newContext({ viewport: { width: 390, height: 844 } }); p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message));
  await p.addInitScript(() => { Object.defineProperty(window, 'speechSynthesis', { value: undefined, configurable: true }); Object.defineProperty(window, 'SpeechSynthesisUtterance', { value: undefined, configurable: true }); });
  await p.goto(URL); await p.waitForTimeout(400); await p.evaluate(perfilMed);
  await p.evaluate(ids => praticar(ids, 'sem voz'), ids.slice(0, 2)); await p.waitForTimeout(200);
  ok(!(await p.$('[data-act="ouvir"]')) && !!(await p.$('#pl .enunciado')), 'player sem "Ouvir"');
  await p.click('#letra-btn'); ok(!(await p.$('#camada [data-act="voz-vel"]')) && !!(await p.$('#camada [data-act="som-set"]')), 'folha "Aa" sem velocidade da leitura (mas com Som e vibração)');
  await p.evaluate(() => fecharFolha()); await responder(p, true); await p.click('[data-act="pl-prox"]');
  ok(!errs.length, 'sem erros de JS sem a API de voz');
  await ctx.close();

  console.log('4b) Movimento reduzido');
  ctx = await b.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' }); p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message));
  await p.addInitScript(vozFalsa); await p.goto(URL); await p.waitForTimeout(400); await p.evaluate(perfilMed);
  await p.evaluate(ids => praticar(ids, 'rm'), ids.slice(0, 4)); await p.waitForTimeout(200);
  for (let i = 0; i < 3; i++) { await responder(p, true); if (i < 2) await proxima(p); }
  r = await p.evaluate(() => getComputedStyle(document.querySelector('.pl-seq')).animationName); ok(r === 'none', 'contador de sequência sem animação');
  await p.evaluate(() => { store.zerar([...blocosCards()]); criarCard({ frente: 'F', verso: 'V', origem: 'manual' }); criarCard({ frente: 'F2', verso: 'V2', origem: 'manual' }); FC.chave = null; location.hash = '#/flashcards/estudar'; }); await p.waitForTimeout(200);
  await p.click('#fc .frente'); r = await p.evaluate(() => getComputedStyle(document.querySelector('#fc')).animationName); ok(r === 'none', 'cartão vira sem animação');
  const bx = await p.$eval('#fc', e => { const r = e.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + 40 }; });
  await p.mouse.move(bx.x, bx.y); await p.mouse.down(); for (let k = 1; k <= 5; k++) await p.mouse.move(bx.x + 40 * k, bx.y); await p.mouse.up(); await p.waitForTimeout(50);
  ok(await p.evaluate(() => FC.feitos.join() === '2'), 'deslizar avalia na hora (sem animação de saída)');
  await ctx.close();

  console.log('Encaixe com letra grande (360/390 px, k até 1,7)');
  const verificar = () => {
    const out = [], W = document.documentElement.clientWidth;
    if (document.documentElement.scrollWidth > W + 1) out.push('rolagem lateral (' + document.documentElement.scrollWidth + 'px)');
    for (const e of document.querySelectorAll('#view *')) { const rc = e.getBoundingClientRect(); if (!rc.width || e.closest('svg,.tabela-wrap')) continue;
      if (rc.right > W + 1 && !e.children.length && e.textContent.trim()) out.push('sai da tela: ' + e.className + ' "' + e.textContent.trim().slice(0, 30) + '"'); }
    for (const e of document.querySelectorAll('#view .alt-x, #view [data-act="pl-cert"], #view [data-act="ouvir"], #view [data-act="fc-nota"]')) { const rc = e.getBoundingClientRect(); if (rc.width && (rc.width < 44 || rc.height < 44)) out.push('alvo pequeno: ' + (e.dataset.act || e.className) + ` ${Math.round(rc.width)}x${Math.round(rc.height)}`); }
    const tw = document.createTreeWalker(document.querySelector('#view'), NodeFilter.SHOW_TEXT); let tn;
    while ((tn = tw.nextNode())) { const t = tn.textContent, pe = tn.parentElement; if (!t.trim() || !pe || pe.closest('svg,pre,table')) continue;
      const re = /[A-Za-zÀ-ÖØ-öø-ÿ]{4,}/g; let m;
      while ((m = re.exec(t))) { const rg = document.createRange(); rg.setStart(tn, m.index); rg.setEnd(tn, m.index + m[0].length);
        const rs = [...rg.getClientRects()].filter(x => x.width > 0); if (rs.length > 1 && Math.abs(rs[0].top - rs[rs.length - 1].top) > 3) out.push('palavra partida: "' + m[0] + '" em ' + pe.className); } }
    return [...new Set(out)].slice(0, 5);
  };
  for (const w of [360, 390]) {
    ctx = await b.newContext({ viewport: { width: w, height: 800 } }); p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message));
    await p.addInitScript(vozFalsa); await p.goto(URL); await p.waitForTimeout(400); await p.evaluate(perfilMed);
    for (const k of ['1.25', '1.45', '1.7']) {
      await p.evaluate(k => { document.documentElement.style.setProperty('--k', k); }, k);
      // player: sequência visível, uma alternativa descartada, uma frase marcada, alternativa escolhida e certeza
      await p.evaluate(ids => { praticar(ids, 'k'); }, ids.slice(0, 5)); await p.waitForTimeout(150);
      for (let i = 0; i < 3; i++) { await responder(p, true); await proxima(p); }
      await p.evaluate(() => { const q = qPorId(PL.ids[PL.i]); PL.desc.add((q.c + 2) % 5); PL.marcas.add(0); PL.esc = q.c; PL.cert = 1; atualizar(); });
      let res = await p.evaluate(verificar); res.forEach(x => ok(false, `player antes de responder @${w}px k=${k}: ${x}`));
      await p.click('[data-act="pl-confirmar"]'); await p.waitForTimeout(60);
      res = await p.evaluate(verificar); res.forEach(x => ok(false, `player respondido @${w}px k=${k}: ${x}`));
      await p.evaluate(() => { store.zerar([...blocosCards()]); criarCard({ frente: 'Qual é o principal achado no exame físico da insuficiência cardíaca descompensada?', verso: 'Estertores crepitantes, turgência jugular e edema de membros inferiores.', origem: 'manual' }); criarCard({ frente: 'x', verso: 'y', origem: 'manual' }); FC.chave = null; location.hash = '#/flashcards/estudar'; }); await p.waitForTimeout(150);
      await p.click('#fc .frente'); await p.waitForTimeout(60);
      res = await p.evaluate(verificar); res.forEach(x => ok(false, `flashcard @${w}px k=${k}: ${x}`));
      await p.evaluate(() => { location.hash = '#/desempenho'; }); await p.waitForTimeout(150);
      res = await p.evaluate(verificar); res.forEach(x => ok(false, `desempenho @${w}px k=${k}: ${x}`));
      const caso = await p.evaluate(() => todosCasos()[0].id); await p.evaluate(c => { location.hash = '#/casos/' + c; }, caso); await p.waitForTimeout(150);
      res = await p.evaluate(verificar); res.forEach(x => ok(false, `caso @${w}px k=${k}: ${x}`));
    }
    // varredura: alternativas com palavras longas não podem empurrar o ✕ para fora da tela (letra Enorme)
    await p.evaluate(() => { document.documentElement.style.setProperty('--k', '1.7'); praticar(questoes().filter(q => q.t === 'medicina' && !q.img).slice(0, 120).map(q => q.id), 'varredura'); }); await p.waitForTimeout(150);
    // (compara com a mesma questão sem os ✕: uma palavra maior que a tela inteira já estoura sozinha e não conta aqui)
    const largas = await p.evaluate(() => { const out = [], W = () => document.documentElement.scrollWidth;
      for (let i = 0; i < PL.ids.length; i++) { PL.i = i; prepararQuestao(); PL.resp = true; PL.esc = 0; atualizar(); const sem = W();
        PL.resp = false; PL.esc = null; PL.desc.add(PL.ordem[0]); atualizar();
        const x = Math.max(...[...document.querySelectorAll('#pl .alt-x')].map(e => e.getBoundingClientRect().right));
        if (W() > sem || x > document.documentElement.clientWidth + 1) out.push(PL.ids[i]); }
      PL.resp = false; return out; });
    ok(!largas.length, `${w} px, letra Enorme: em 120 questões o ✕ nunca causa rolagem lateral` + (largas.length ? ' — estouram: ' + largas.slice(0, 5).join(', ') : ''));
    ok(true, `encaixe conferido a ${w} px (letras Grande, Muito grande e Enorme)`);
    await ctx.close();
  }

  ok(!errs.length, errs.length ? 'erros de JS: ' + errs.join(' | ') : 'Sem erros de JS');
  await b.close(); console.log(falhas ? `${falhas} FALHA(S)` : 'INTERAÇÃO OK'); process.exit(falhas ? 1 : 0);
})();
