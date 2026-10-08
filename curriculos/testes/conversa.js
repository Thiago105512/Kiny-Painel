// Teste de navegador (Playwright): Modo conversa (#/conversa) — tirar dúvidas por voz com o assistente.
// sample simulado (streaming em pedaços, resposta com markdown) e speechSynthesis simulado. Verifica: entradas só com IA,
// contexto da questão no prompt, histórico como turnos, markdown limpo, leitura automática, Repetir/Mais devagar/
// Explicar de outro jeito/Parar, interruptor de leitura, cancelar ao sair, erros (not_granted, rate_limited, outros),
// 🎤 só com SpeechRecognition (e some ao primeiro erro), teclado, acessibilidade e encaixe a 360/390 px com letra 1 e 1,7.
// Rode na raiz:  python3 -m http.server 8765 &  e  node curriculos/testes/conversa.js
const { chromium } = require('playwright');
const fs = require('fs');
const URL = process.env.APP_URL || 'http://localhost:8765/curriculos/app.html';
const FOTOS = process.env.FOTOS || '/tmp/claude-0/-home-user-Kiny-Painel/1a6e6749-2018-5b88-94f4-cc7b8d68edda/scratchpad/conversa';
let falhas = 0; const ok = (c, m) => { console.log((c ? '  ✓ ' : '  ✗ ') + m); if (!c) falhas++; };

// sample falso: grava cada chamada; modos: ok, negado, limite, falha. Responde em pedaços (onText com o texto inteiro até agora).
const iaFalsa = () => {
  window.__chamadas = []; window.__aborts = 0; window.__modo = 'ok'; window.__passo = 15; window.__resposta = null;
  const s = async (input, o = {}) => {
    window.__chamadas.push({ input: JSON.parse(JSON.stringify(input)), cache: o.cache, sinal: !!o.signal });
    if (o.signal && o.signal.aborted) throw { code: 'cancelled' };
    if (window.__modo === 'negado') throw { code: 'not_granted', message: 'x' };
    if (window.__modo === 'limite') throw { code: 'rate_limited', message: 'x' };
    if (window.__modo === 'falha') throw { code: 'upstream_error', message: 'x' };
    const resp = window.__resposta || '## Resposta\n**Sim**: a alternativa *C* está certa.\n- Primeiro ponto\n- Segundo ponto\n\n| a | b |\n|---|---|\n| 1 | 2 |\nEntendeu?';
    let t = '';
    for (const pd of resp.match(/[\s\S]{1,10}/g)) {
      await new Promise((res, rej) => { const tm = setTimeout(res, window.__passo);
        if (o.signal) o.signal.addEventListener('abort', () => { window.__aborts++; clearTimeout(tm); rej({ code: 'cancelled', text: t || undefined }); }, { once: true }); });
      t += pd; o.onText && o.onText({ text: t, delta: pd });
    }
    return { text: t, truncated: false, modelTierApplied: 'default' };
  };
  s.json = async () => []; s.limits = async () => ({ maxPromptBytes: 65536 });
  window.claude = { use: async n => n === 'sample' ? s : null };
};
// Voz simulada (como em interacao.js): fala uma frase por vez; registra texto e velocidade.
const vozFalsa = () => {
  window.__falas = []; window.__cancel = 0; window.__dur = 30;
  class U { constructor(t) { this.text = t; } }
  const ss = { speaking: false, pending: false, _q: [],
    speak(u) { window.__falas.push({ t: u.text, rate: u.rate, lang: u.lang }); this._q.push(u); this.speaking = true; if (this._q.length === 1) this._prox(); },
    _prox() { const u = this._q[0]; if (!u) { this.speaking = false; return; }
      setTimeout(() => { if (this._q[0] !== u) return; u.onstart && u.onstart();
        setTimeout(() => { if (this._q[0] !== u) return; this._q.shift(); u.onend && u.onend(); this._prox(); }, window.__dur); }, 0); },
    cancel() { window.__cancel++; const q = this._q; this._q = []; this.speaking = false; q.forEach(u => u.onerror && u.onerror({ error: 'interrupted' })); },
    getVoices() { return [{ lang: 'pt-BR', name: 'Luciana' }]; } };
  Object.defineProperty(window, 'speechSynthesis', { value: ss, configurable: true });
  window.SpeechSynthesisUtterance = U;
};
const semMic = () => { for (const k of ['SpeechRecognition', 'webkitSpeechRecognition']) try { Object.defineProperty(window, k, { value: undefined, configurable: true, writable: true }); } catch (e) { } };
// Microfone falso: modo 'texto' devolve um ditado; modo 'erro' falha com not-allowed.
const micFalso = () => {
  window.__mic = 'texto'; window.__micStarts = 0;
  class R { start() { window.__micStarts++; setTimeout(() => {
    if (window.__mic === 'erro') { this.onerror && this.onerror({ error: 'not-allowed' }); this.onend && this.onend(); return; }
    this.onresult && this.onresult({ results: [[{ transcript: 'o que é sopro sistólico' }]] }); this.onend && this.onend(); }, 20); }
    stop() { this.onend && this.onend(); } abort() { } }
  window.webkitSpeechRecognition = R; window.SpeechRecognition = undefined;
};
const perfilMed = () => { const P = store.doc('perfil'); P.objetivo = 'medicina'; P.boasVindas = true; store.mudou('perfil'); };
const idsSimples = n => questoes().filter(q => q.t === 'medicina' && !q.img && !q.serie && !q.familia && q.e && q.tema).slice(0, n).map(q => q.id);
const fimResposta = p => p.waitForFunction(() => !CV.gerando, null, { timeout: 8000 });
const fimLeitura = p => p.waitForFunction(() => VOZ.id === null, null, { timeout: 8000 });
const perguntar = async (p, txt) => { await p.click('#cv-q'); await p.fill('#cv-q', txt); await p.click('[data-act="cv-perguntar"]'); };
const ultimaChamada = p => p.evaluate(() => window.__chamadas.at(-1));

(async () => {
  fs.mkdirSync(FOTOS, { recursive: true });
  const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {}); const errs = [];
  const abrir = async (inits, opts = {}) => {
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, ...opts }); const p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message));
    for (const f of inits) await p.addInitScript(f);
    await p.goto(URL); await p.waitForTimeout(400); await p.evaluate(perfilMed);
    return { ctx, p, go: async h => { await p.evaluate(h => { location.hash = h; }, h); await p.waitForTimeout(150); } };
  };
  const responderQuestao = async p => {
    await p.evaluate(() => { const q = qPorId(PL.ids[PL.i]); document.querySelector(`[data-act="pl-alt"][data-i="${(q.c + 1) % 5}"]`).click(); });
    await p.click('[data-act="pl-confirmar"]'); await p.waitForTimeout(80);
  };

  console.log('1) Sem IA: nada do Modo conversa');
  { const { ctx, p, go } = await abrir([vozFalsa, semMic]);
    const ids = await p.evaluate(idsSimples, 3); await p.evaluate(ids => praticar(ids, 'teste'), ids); await p.waitForTimeout(200);
    await responderQuestao(p);
    ok(!(await p.$('[data-act="cv-questao"]')) && !(await p.$('[data-act="ia-abrir"]')), 'player respondido sem IA: sem "Tirar dúvida por voz" (e sem Assistente)');
    await go('#/conversa'); const t = await p.innerText('#view');
    ok(/não está disponível/.test(t) && !(await p.$('#cv-q')), '#/conversa sem IA mostra aviso e nenhum campo');
    await ctx.close(); }

  console.log('2) Assistente → Modo conversa (conversa livre)');
  const { ctx, p, go } = await abrir([iaFalsa, vozFalsa, semMic]);
  await p.waitForFunction(() => IA.disponivel()); await go('#/questoes');
  await p.click('[data-act="ia-abrir"]'); await p.waitForTimeout(100);
  ok(!!(await p.$('#camada [data-act="cv-abrir"]')), 'Assistente tem o botão grande "Modo conversa"');
  const altBtn = await p.$eval('#camada [data-act="cv-abrir"]', e => e.getBoundingClientRect().height); ok(altBtn >= 48, `botão grande (${Math.round(altBtn)} px de altura)`);
  await p.click('#camada [data-act="cv-abrir"]'); await p.waitForTimeout(150);
  let r = await p.evaluate(() => ({ h: location.hash, folha: !!document.querySelector('#camada .folha'), sobre: document.querySelector('.cv-assunto').textContent, foco: document.activeElement.id, mic: !!document.querySelector('#cv-mic'),
    dica: document.querySelector('#cv-dica').textContent, ph: document.querySelector('#cv-q').placeholder, ekh: document.querySelector('#cv-q').getAttribute('enterkeyhint'),
    fs: parseFloat(getComputedStyle(document.querySelector('#cv-q')).fontSize), live: document.querySelector('#cv-hist').getAttribute('aria-live'), voltar: !!document.querySelector('.nav-voltar [data-act="voltar"]'), fab: !!document.querySelector('.fab') }));
  ok(r.h === '#/conversa' && !r.folha, 'abre a tela #/conversa e fecha a folha');
  ok(/Conversa livre/.test(r.sobre), 'mostra "Conversa livre"');
  ok(r.foco === 'cv-q', 'o campo recebe o foco ao abrir (no toque: o teclado sobe)');
  ok(r.ph === 'Fale ou digite sua dúvida' && r.ekh === 'send' && r.fs >= 18, `campo "Fale ou digite sua dúvida", enterkeyhint=send, letra ${r.fs}px`);
  ok(!r.mic && /🎤 do teclado/.test(r.dica), 'sem SpeechRecognition: sem botão 🎤, com a dica do microfone do teclado');
  ok(r.live === 'polite', 'histórico com aria-live="polite"');
  ok(r.voltar && !r.fab, 'botão Voltar do sistema de navegação; sem o botão flutuante do Assistente');

  console.log('3) Pergunta, streaming, markdown limpo, leitura automática');
  await p.evaluate(() => { window.__passo = 40; window.__dur = 60; });
  await perguntar(p, 'O que é sopro sistólico?');
  await p.waitForFunction(() => { const e = document.querySelector('#cv-ult .cv-tx'); return e && e.textContent.length > 3 && CV.gerando; }, null, { timeout: 4000 });
  r = await p.evaluate(() => ({ parcial: document.querySelector('#cv-ult .cv-tx').textContent, busy: document.querySelector('#cv-hist').getAttribute('aria-busy'), parar: !!document.querySelector('#cv-ctrl [data-act="cv-parar"]'), eu: document.querySelector('.cv-b.eu .cv-tx')?.textContent }));
  ok(r.busy === 'true' && r.parar && r.eu === 'O que é sopro sistólico?', 'durante o streaming: balão "Você", texto parcial, aria-busy e botão Parar');
  await fimResposta(p);
  let c = await ultimaChamada(p);
  ok(Array.isArray(c.input) && c.input[0].role === 'user' && /LIDAS EM VOZ ALTA/.test(c.input[0].content) && /Medicina e Residência/.test(c.input[0].content) && /120 palavras/.test(c.input[0].content) && /Conversa livre/.test(c.input[0].content), '1º turno: instruções (tutor de Medicina/Residência, fala curta) + contexto');
  ok(c.input.at(-1).role === 'user' && c.input.at(-1).content === 'O que é sopro sistólico?' && c.input.length === 2, 'último turno é a pergunta');
  ok(c.cache === false && c.sinal, 'cache:false e com AbortController');
  r = await p.evaluate(() => document.querySelector('#cv-ult .cv-tx').textContent);
  ok(!/[*#|`]/.test(r) && !/^\s*-\s/m.test(r) && /Sim: a alternativa C está certa\./.test(r) && /Primeiro ponto\./.test(r) && /a, b\./.test(r), 'markdown limpo na tela: "' + r.replace(/\n/g, ' / ') + '"');
  await p.waitForFunction(() => window.__falas.length > 0, null, { timeout: 3000 });
  r = await p.evaluate(() => ({ falas: window.__falas.map(f => f.t).join(' '), rate: window.__falas[0].rate, lang: window.__falas[0].lang, lendo: document.querySelector('#cv-ult').classList.contains('lendo') }));
  ok(/Sim: a alternativa C está certa/.test(r.falas) && !/[*#|]/.test(r.falas) && r.lang === 'pt-BR' && r.rate === 1, 'resposta lida em voz alta (texto limpo, pt-BR, velocidade normal)');
  ok(r.lendo, 'balão da resposta destacado enquanto é lido');
  await fimLeitura(p); await p.waitForTimeout(30);
  r = await p.evaluate(() => ({ foco: document.activeElement.id, ro: document.querySelector('#cv-q').readOnly }));
  ok(r.foco === 'cv-q' && r.ro, 'ao terminar a leitura, o foco volta ao campo (somente leitura até o toque: não abre o teclado)');
  await p.click('#cv-q'); ok(!(await p.evaluate(() => document.querySelector('#cv-q').readOnly)), 'tocar no campo libera a digitação');

  console.log('4) Histórico como turnos; teclado (Enter envia, Shift+Enter quebra linha)');
  await p.evaluate(() => { window.__falas = []; window.__passo = 5; window.__dur = 10; });
  await p.focus('#cv-q'); await p.keyboard.type('E o diastólico?'); await p.keyboard.press('Shift+Enter'); await p.keyboard.type('Explique');
  ok(await p.evaluate(() => document.querySelector('#cv-q').value === 'E o diastólico?\nExplique' && window.__chamadas.length === 1), 'Shift+Enter quebra a linha sem enviar');
  await p.keyboard.press('Enter'); await fimResposta(p);
  c = await ultimaChamada(p);
  ok(c.input.length === 4 && c.input.map(t => t.role).join() === 'user,user,assistant,user' && c.input[2].content.startsWith('Resposta') && !/[*#]/.test(c.input[2].content) && c.input[3].content === 'E o diastólico?\nExplique', 'Enter envia; histórico vai como turnos (user, assistant limpo, user)');
  ok(await p.evaluate(() => document.querySelectorAll('#cv-hist .cv-b').length === 4 && document.querySelector('#cv-q').value === ''), '4 balões na tela e campo limpo');
  await fimLeitura(p);

  console.log('5) Repetir, Mais devagar/Normal, Parar, Explicar de outro jeito');
  await p.evaluate(() => { window.__falas = []; window.__dur = 400; });
  await p.click('[data-act="cv-repetir"]'); await p.waitForTimeout(40);
  r = await p.evaluate(() => ({ n: window.__falas.length, t: window.__falas[0]?.t, id: VOZ.id }));
  ok(r.n >= 1 && /^Resposta/.test(r.t) && r.id === 'cv', 'Repetir lê a última resposta de novo');
  await p.click('[data-act="cv-lento"]'); await p.waitForTimeout(40);
  r = await p.evaluate(() => ({ rate: window.__falas.at(-1).rate, b: document.querySelector('[data-act="cv-lento"]').textContent.trim(), pr: document.querySelector('[data-act="cv-lento"]').getAttribute('aria-pressed'), ls: localStorage.getItem('gab2:cv-lento') }));
  ok(r.rate === 0.75 && /Normal/.test(r.b) && r.pr === 'true' && r.ls === 'true', `"Mais devagar" relê a 0,75 e vira "Normal" (${r.b})`);
  await p.click('[data-act="cv-lento"]'); await p.waitForTimeout(40);
  r = await p.evaluate(() => ({ rate: window.__falas.at(-1).rate, b: document.querySelector('[data-act="cv-lento"]').textContent.trim() }));
  ok(r.rate === 1 && /Mais devagar/.test(r.b), '"Normal" volta à velocidade normal');
  const cancel0 = await p.evaluate(() => window.__cancel);
  await p.click('[data-act="cv-parar"]'); await p.waitForTimeout(30);
  r = await p.evaluate(() => ({ id: VOZ.id, c: window.__cancel, q: speechSynthesis._q.length }));
  ok(r.id === null && r.c > cancel0 && r.q === 0, 'Parar interrompe a leitura');
  await p.evaluate(() => { window.__dur = 10; window.__resposta = 'Pense no coração como uma bomba de água.'; });
  await p.click('[data-act="cv-outro"]'); await fimResposta(p);
  c = await ultimaChamada(p);
  ok(/outro jeito/.test(c.input.at(-1).content) && /analogia/.test(c.input.at(-1).content) && c.input.length === 6, '"Explicar de outro jeito" pede reexplicação mais simples com analogia, com o histórico');
  ok(await p.evaluate(() => /Explique de outro jeito/.test([...document.querySelectorAll('.cv-b.eu')].at(-1).textContent) && /bomba de água/.test(document.querySelector('#cv-ult').textContent)), 'aparece como pedido seu e a nova resposta chega');
  await fimLeitura(p);

  console.log('6) Interruptor "Ler respostas em voz alta"');
  r = await p.evaluate(() => { const i = document.querySelector('[data-chg="cv-voz"]'); return { on: i.checked, role: i.getAttribute('role'), rot: i.closest('label').textContent.trim() }; });
  ok(r.on && r.role === 'switch' && r.rot === 'Ler respostas em voz alta', 'interruptor ligado por padrão');
  await p.click('[data-chg="cv-voz"]'); await p.waitForTimeout(40);
  ok(await p.evaluate(() => store.doc('perfil').cvVoz === false), 'desligar fica gravado no perfil (store)');
  await p.evaluate(() => { window.__falas = []; });
  await perguntar(p, 'Mais uma'); await fimResposta(p); await p.waitForTimeout(80);
  r = await p.evaluate(() => ({ n: window.__falas.length, foco: document.activeElement.id }));
  ok(r.n === 0 && r.foco === 'cv-q', 'desligado: a resposta não é lida e o foco volta ao campo');
  await p.click('[data-chg="cv-voz"]'); await p.waitForTimeout(40);
  ok(await p.evaluate(() => store.doc('perfil').cvVoz === true), 'religar');

  console.log('7) Limite do histórico (~10 trocas)');
  await p.evaluate(() => { for (let i = 0; i < 15; i++) CV.turns.push({ role: 'user', content: 'p' + i }, { role: 'assistant', content: 'r' + i }); });
  await perguntar(p, 'Última'); await fimResposta(p);
  c = await ultimaChamada(p);
  ok(c.input.length <= 22 && c.input[0].content.includes('LIDAS EM VOZ ALTA') && c.input[1].role === 'user' && c.input.at(-1).content === 'Última', `só as últimas trocas vão (${c.input.length} turnos, instruções sempre no 1º)`);
  await fimLeitura(p);

  console.log('8) Cancelar ao sair da tela e ao enviar outra');
  await p.evaluate(() => { window.__passo = 300; window.__resposta = null; });
  await perguntar(p, 'Pergunta longa'); await p.waitForTimeout(100);
  const ab0 = await p.evaluate(() => window.__aborts);
  await p.click('#cv-q'); await p.fill('#cv-q', 'Outra pergunta'); await p.click('[data-act="cv-perguntar"]'); await p.waitForTimeout(80);
  ok(await p.evaluate(a => window.__aborts === a + 1 && CV.gerando, ab0), 'enviar outra cancela a anterior');
  await p.click('.nav-voltar [data-act="voltar"]'); await p.waitForTimeout(150);
  r = await p.evaluate(() => ({ h: location.hash, a: window.__aborts, g: CV.gerando }));
  ok(r.h === '#/questoes' && r.a === ab0 + 2 && !r.g, 'Voltar leva à página anterior e cancela o pedido em andamento');
  await p.evaluate(() => { window.__passo = 5; });

  console.log('9) "Tirar dúvida por voz" no player, com o contexto da questão');
  const ids = await p.evaluate(idsSimples, 3); await p.evaluate(ids => praticar(ids, 'teste'), ids); await p.waitForTimeout(200);
  ok(!(await p.$('[data-act="cv-questao"]')), 'antes de responder: sem o botão');
  await responderQuestao(p);
  ok(!!(await p.$('[data-act="cv-questao"]')), 'depois de responder: botão "Tirar dúvida por voz"');
  await p.$eval('[data-act="cv-questao"]', e => e.scrollIntoView({ block: 'center' })); await p.screenshot({ path: FOTOS + '/player-botao.png' });
  const q = await p.evaluate(() => { const q = qPorId(PL.ids[PL.i]); return { id: q.id, q: q.q, e: q.e, gab: q.o[q.c], o: q.o }; });
  await p.click('[data-act="cv-questao"]'); await p.waitForTimeout(200);
  r = await p.evaluate(() => ({ h: location.hash, sobre: document.querySelector('.cv-assunto').textContent, n: document.querySelectorAll('.cv-b').length }));
  ok(r.h === '#/conversa' && /Sobre: questão de /.test(r.sobre) && r.n === 0, `abre o modo com o assunto ("${r.sobre.slice(0, 60)}…") e conversa nova`);
  await perguntar(p, 'Por que errei?'); await fimResposta(p);
  c = await ultimaChamada(p);
  const c0 = c.input[0].content;
  ok(c0.includes(q.q) && c0.includes('Gabarito:') && c0.includes(q.gab) && c0.includes(q.e.slice(0, 60)) && q.o.every(x => c0.includes(x)) && /errou/.test(c0), 'contexto no 1º turno: enunciado, 5 alternativas, gabarito, explicação e o que ela marcou');
  await p.screenshot({ path: FOTOS + '/conversa-claro.png' });
  await fimLeitura(p);
  await p.click('.nav-voltar [data-act="voltar"]'); await p.waitForTimeout(200);
  ok(await p.evaluate(() => location.hash === '#/questoes'), 'Voltar volta ao player/lista de questões');
  await p.click('.fab'); await p.waitForTimeout(100); await p.click('#camada [data-act="cv-abrir"]'); await p.waitForTimeout(150);
  ok(await p.evaluate(() => document.querySelectorAll('.cv-b').length >= 2), 'reabrir sobre a mesma questão mantém a conversa');
  await p.click('[data-act="cv-limpar"]'); await p.waitForTimeout(100);
  r = await p.evaluate(() => ({ sobre: document.querySelector('.cv-assunto').textContent, n: document.querySelectorAll('.cv-b').length, foco: document.activeElement.id }));
  ok(/Conversa livre/.test(r.sobre) && r.n === 0 && r.foco === 'cv-q', '"Trocar assunto / limpar" zera a conversa e volta a ser livre');

  console.log('10) Erros');
  await p.evaluate(() => { window.__modo = 'limite'; });
  let n0 = await p.evaluate(() => window.__chamadas.length);
  await perguntar(p, 'Teste limite'); await fimResposta(p); await p.waitForTimeout(50);
  r = await p.evaluate(() => ({ t: document.querySelector('.cv-erro')?.textContent || '', tentar: !!document.querySelector('[data-act="cv-tentar"]'), n: window.__chamadas.length }));
  ok(/Muitas perguntas seguidas, espere um pouco/.test(r.t) && !r.tentar && r.n === n0 + 1, 'rate_limited: "Muitas perguntas seguidas, espere um pouco" (sem repetir sozinho)');
  await p.evaluate(() => { window.__modo = 'falha'; });
  n0 = await p.evaluate(() => window.__chamadas.length);
  await perguntar(p, 'Teste falha'); await fimResposta(p); await p.waitForTimeout(300);
  r = await p.evaluate(() => ({ t: document.querySelector('.cv-erro')?.textContent || '', tentar: !!document.querySelector('[data-act="cv-tentar"]'), n: window.__chamadas.length, foco: document.activeElement.className }));
  ok(/Não consegui responder agora/.test(r.t) && r.tentar && r.n === n0 + 1, 'outros erros: "Não consegui responder agora" + "Tentar de novo", uma chamada só');
  await p.evaluate(() => { window.__modo = 'ok'; });
  await p.click('[data-act="cv-tentar"]'); await fimResposta(p);
  r = await p.evaluate(() => ({ n: window.__chamadas.length, erro: !!document.querySelector('.cv-erro'), ult: window.__chamadas.at(-1).input.at(-1).content }));
  ok(r.n === n0 + 2 && !r.erro && r.ult === 'Teste falha', '"Tentar de novo" faz uma nova chamada com a mesma pergunta');
  await fimLeitura(p);
  await p.evaluate(() => { window.__modo = 'negado'; });
  await perguntar(p, 'Teste negado'); await p.waitForTimeout(150);
  r = await p.evaluate(() => ({ t: document.querySelector('#view').innerText, campo: !!document.querySelector('#cv-q') }));
  ok(/não foi autorizado/.test(r.t) && !r.campo, 'not_granted: mensagem amigável e o modo some');
  await go('#/questoes'); await p.evaluate(ids => praticar(ids, 'teste2'), ids); await p.waitForTimeout(150); await responderQuestao(p);
  ok(!(await p.$('[data-act="cv-questao"]')), 'not_granted: o botão do player some');
  await p.click('.fab'); await p.waitForTimeout(100);
  ok(!(await p.$('#camada [data-act="cv-abrir"]')), 'not_granted: o botão do Assistente some');
  await ctx.close();

  console.log('11) Microfone do navegador (quando existe)');
  { const { ctx, p, go } = await abrir([iaFalsa, vozFalsa, micFalso]);
    await p.waitForFunction(() => IA.disponivel()); await go('#/conversa');
    r = await p.evaluate(() => { const m = document.querySelector('#cv-mic'); return m && { rot: m.textContent.trim(), h: m.getBoundingClientRect().height }; });
    ok(r && /Falar/.test(r.rot) && r.h >= 44, 'com SpeechRecognition: botão 🎤 "Falar"');
    await p.click('#cv-mic'); await p.waitForTimeout(80);
    ok(await p.evaluate(() => document.querySelector('#cv-q').value === 'o que é sopro sistólico' && window.__chamadas.length === 0), 'o ditado vai para o campo (sem enviar sozinho)');
    await p.evaluate(() => { window.__mic = 'erro'; }); await p.click('#cv-mic'); await p.waitForTimeout(80);
    r = await p.evaluate(() => ({ mic: !!document.querySelector('#cv-mic'), dica: document.querySelector('#cv-dica').textContent }));
    ok(!r.mic && r.dica === 'Use o microfone do teclado para falar.', 'erro: o 🎤 some e aparece "Use o microfone do teclado para falar."');
    await go('#/'); await go('#/conversa');
    ok(!(await p.$('#cv-mic')) && (await p.evaluate(() => window.__micStarts)) === 2, 'o 🎤 continua escondido na sessão (sem insistir)');
    await ctx.close(); }

  console.log('12) Movimento reduzido');
  { const { ctx, p, go } = await abrir([iaFalsa, vozFalsa, semMic], { reducedMotion: 'reduce' });
    await p.waitForFunction(() => IA.disponivel()); await go('#/conversa');
    await p.evaluate(() => { window.__passo = 400; }); await perguntar(p, 'x'); await p.waitForTimeout(50);
    r = await p.evaluate(() => getComputedStyle(document.querySelector('.cv-b.pendente .cv-quem'), '::after').animationName);
    ok(r === 'none', 'sem animação do "Pensando" com prefers-reduced-motion');
    await ctx.close(); }

  console.log('13) Encaixe e contraste a 360/390 px, letra 1 e 1,7, claro e escuro');
  const contraste = () => {
    const cv = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
    const rgba = c => { cv.clearRect(0, 0, 1, 1); cv.fillStyle = '#000'; cv.fillStyle = c; cv.fillRect(0, 0, 1, 1); const d = cv.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
    const lum = ([r, g, b]) => { const f = x => { x /= 255; return x <= .04045 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4; }; return .2126 * f(r) + .7152 * f(g) + .0722 * f(b); };
    const mistura = (f, b) => [0, 1, 2].map(i => f[i] * f[3] + b[i] * (1 - f[3]));
    const fundo = e => { const pilha = []; for (let x = e; x; x = x.parentElement) { const c = rgba(getComputedStyle(x).backgroundColor); if (c[3] > 0) { pilha.push(c); if (c[3] >= 1) break; } }
      let b = rgba(getComputedStyle(document.body).backgroundColor).slice(0, 3); for (const c of pilha.reverse()) b = mistura(c, b); return b; };
    const out = [];
    for (const e of document.querySelectorAll('#view *')) {
      if (![...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()) || e.closest('[aria-hidden="true"],[disabled]')) continue;
      const cs = getComputedStyle(e); if (!e.getBoundingClientRect().width) continue;
      const bg = fundo(e), fg = mistura(rgba(cs.color), bg), a = lum(fg), b2 = lum(bg), q = (Math.max(a, b2) + .05) / (Math.min(a, b2) + .05);
      if (q < 4.5) out.push(q.toFixed(2) + ' ' + e.tagName + '.' + e.className + ' "' + e.textContent.trim().slice(0, 25) + '"');
    }
    return out;
  };
  for (const esquema of ['light', 'dark']) for (const w of [360, 390]) for (const k of ['1', '1.7']) {
    const { ctx, p, go } = await abrir([iaFalsa, vozFalsa, micFalso], { viewport: { width: w, height: 844 }, colorScheme: esquema });
    await p.waitForFunction(() => IA.disponivel());
    await p.evaluate(k => { localStorage.setItem('gab2:letra', k); aplicarLetra(+k); }, k);
    await p.evaluate(ids => { const q = qPorId(ids[0]); CV.ctx = ctxQuestaoCV(q, [0, 1, 2, 3, 4], (q.c + 1) % 5); CV.turns = [{ role: 'user', content: 'Por que a minha resposta está errada?' }, { role: 'assistant', content: 'Porque o achado principal aponta para outra causa. Pense no coração como uma bomba: quando a válvula não fecha bem, o sangue volta. Faz sentido?' }]; }, ids);
    await go('#/conversa'); await p.evaluate(() => { CV.erro = { msg: 'Não consegui responder agora.', repetir: true }; redesenharCV(); }); await p.waitForTimeout(80);
    r = await p.evaluate(() => {
      const W = document.documentElement.clientWidth, out = [];
      if (document.documentElement.scrollWidth > W + 1) out.push('rolagem lateral ' + document.documentElement.scrollWidth);
      for (const e of document.querySelectorAll('#cv *')) { const rc = e.getBoundingClientRect(); if (rc.width && rc.right > W + 1) out.push('sai da tela: ' + e.tagName + '.' + e.className); if (e.scrollWidth > e.clientWidth + 2 && getComputedStyle(e).overflowX === 'hidden') out.push('cortado: ' + e.className); }
      for (const e of document.querySelectorAll('#cv button, #cv textarea, #cv .check')) { const rc = e.getBoundingClientRect(); if (rc.height < 44 || rc.width < 44) out.push('alvo pequeno: ' + (e.dataset.act || e.className) + ' ' + Math.round(rc.width) + 'x' + Math.round(rc.height)); }
      return [...new Set(out)];
    });
    const cc = await p.evaluate(contraste);
    ok(!r.length, `${esquema} ${w}px k=${k}: sem estouro e alvos ≥ 44 px${r.length ? ' — ' + r.join('; ') : ''}`);
    ok(!cc.length, `${esquema} ${w}px k=${k}: contraste ≥ 4,5:1${cc.length ? ' — ' + cc.slice(0, 4).join('; ') : ''}`);
    if (w === 390 && (esquema === 'dark' || k === '1.7')) { await p.evaluate(() => { CV.erro = null; redesenharCV(); window.scrollTo(0, 0); }); const nome = `${FOTOS}/conversa-${esquema === 'dark' ? 'escuro' : 'claro'}${k === '1.7' ? '-enorme' : ''}`; await p.screenshot({ path: nome + '.png' });
      await p.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight)); await p.waitForTimeout(50); await p.screenshot({ path: nome + '-fim.png' }); }
    await ctx.close();
  }

  ok(!errs.length, 'sem erros de JavaScript' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
  await b.close();
  console.log(falhas ? `\n${falhas} falha(s)` : '\nTudo certo'); process.exit(falhas ? 1 : 0);
})();
