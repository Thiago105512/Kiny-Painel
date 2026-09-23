// Teste de navegador (Playwright). Rode na pasta raiz do repositório:
//   python3 -m http.server 8765 &   e depois   node curriculos/testes/fluxos.js
// Use CHROMIUM=/caminho/do/chromium se o Playwright não achar o navegador.
const { chromium } = require('playwright');
const URL=process.env.APP_URL||'http://localhost:8765/curriculos/app.html';
let falhas=0; const ok=(c,m)=>{console.log((c?'  ✓ ':'  ✗ ')+m); if(!c) falhas++;};
(async()=>{const b=await chromium.launch(process.env.CHROMIUM?{executablePath:process.env.CHROMIUM}:{});
const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
// Assistente falso: registra o prompt recebido
await p.addInitScript(()=>{window.__prompts=[];const s=async(t,o)=>{window.__prompts.push(t);o&&o.onText&&o.onText({text:'ok'});return {text:'Explicação de teste'}};s.json=async t=>{window.__prompts.push(t);return [{frente:'F',verso:'V'}]};s.limits=async()=>({});window.claude={use:async n=>n==='sample'?s:null};});
await p.goto(URL);await p.waitForTimeout(500);
const go=async h=>{await p.evaluate(h=>location.hash=h,h);await p.waitForTimeout(150);};
const txt=async()=>p.innerText('#view');
const responder=async(certo)=>{ // escolhe a correta (ou uma errada) e confirma
  await p.evaluate(c=>{const q=qPorId(PL.ids[PL.i]);const i=c?q.c:(q.c+1)%5;document.querySelector(`[data-act="pl-alt"][data-i="${i}"]`).click();},certo);
  await p.click('[data-act="pl-confirmar"]');await p.waitForTimeout(80);};
const importar=async(inst,versao,texto)=>{await go('#/medicina/importar/'+inst);
  await p.fill('[data-c="versao"]',versao);await p.dispatchEvent('[data-c="versao"]','change');
  await p.fill('#imp-txt',texto);await p.click('[data-act="imp-interpretar"]');await p.waitForTimeout(100);
  const n=await p.$$eval('[data-c="nome"]',e=>e.length);await p.click('[data-act="imp-salvar"]');await p.waitForTimeout(150);return n;};
const temaCom=await p.evaluate(()=>{const c={};questoes().filter(q=>q.t==='medicina'||q.t==='residencia').forEach(q=>{c[q.tema]=(c[q.tema]||0)+1});return Object.entries(c).sort((a,b)=>b[1]-a[1]).map(x=>x[0]);});

console.log('Fluxo 1: Medicina → UFAM → período → disciplina → tema → questões → desempenho');
let n=await importar('ufam','TESTE e2e','1º período\nTST101 Anatomia Humana TESTE 120h\nTST102 Fisiologia TESTE 90h\n2º período\nTST201 Farmacologia TESTE 60h');
ok(n===3,'importador reconheceu 3 disciplinas em 2 períodos ('+n+')');
ok((await p.evaluate(()=>location.hash))==='#/medicina/grade/ufam-medicina-teste-e2e','matriz salva e aberta');
ok((await txt()).includes('Importada — conferir'),'matriz marcada como importada (pendente de validação)');
await go('#/medicina');await p.click('[data-act="perfil-fac"]');await p.selectOption('#pf-inst','ufam');await p.dispatchEvent('#pf-inst','change');await p.selectOption('#pf-grade','ufam-medicina-teste-e2e');await p.fill('#pf-per','1');await p.click('form[data-form="perfil-fac"] button');await p.waitForTimeout(100);
await go('#/medicina/grade/ufam-medicina-teste-e2e/p/1');await p.click('text=Fisiologia TESTE');await p.waitForTimeout(100);
const T1=temaCom[0], nomeT1=await p.evaluate(t=>TEMAS[t].nome,T1);
await p.fill('#it-tema',nomeT1);await p.click('form[data-form="item-tema"] button');await p.waitForTimeout(100);
ok((await txt()).includes(nomeT1),'tema "'+nomeT1+'" vinculado à disciplina');
await p.click(`#view a[href="#/tema/${T1}"]`);await p.waitForTimeout(150);
const crumbs=await p.innerText('.crumbs');ok(crumbs.includes('UFAM')&&crumbs.includes('1º período')&&crumbs.includes('Fisiologia TESTE'),'breadcrumb mostra UFAM › 1º período › disciplina ('+crumbs.replace(/\n/g,' ')+')');
await p.click('[data-act="ia-abrir"]');await p.click('[data-act="ia-acao"][data-v="explicar"]');await p.waitForTimeout(150);
const pr=await p.evaluate(()=>window.__prompts.at(-1));ok(pr.includes('UFAM')&&pr.includes('Período: 1º')&&pr.includes('Disciplina/módulo: Fisiologia TESTE')&&pr.includes('Tema: '+nomeT1),'IA recebeu contexto instituição/período/disciplina/tema');
await p.click('.folha [data-act="fechar-folha"]');
await go(`#/tema/${T1}/questoes`);await p.click('[data-act="tema-praticar"]');await p.waitForTimeout(100);
await responder(true);await p.click('[data-act="pl-prox"]');await responder(true);
await go(`#/tema/${T1}/desempenho`);ok((await txt()).includes('100%'),'desempenho do tema registrou 2 acertos');
const tent=await p.evaluate(t=>questoes().filter(q=>q.tema===t).map(progDe).filter(Boolean).map(x=>x.h.at(-1)),T1);
ok(tent.length===2&&tent.every(h=>h[3]>0&&h[4]==='tema'),'tentativas guardam resposta, tempo e origem');
await go('#/');ok(/2\s*\/\s*20/.test(await txt()),'dashboard: 2 questões hoje');

console.log('Fluxo 2: Medicina → UEA → período → módulo → tema → flashcards → revisão');
n=await importar('uea','TESTE e2e','1º período\nMódulo Sistema Cardiovascular TESTE 200h\n2º período\nMódulo Agressão e Defesa TESTE 180h');
ok(n===2,'UEA: 2 módulos importados');
const ufamIntacta=await p.evaluate(()=>itensGrade(gradePorId('ufam-medicina-teste-e2e')).length===3&&gradesDe('ufam').every(g=>g.instituicao==='ufam'));ok(ufamIntacta,'matriz da UFAM continua separada e intacta');
await go('#/medicina/grade/uea-medicina-teste-e2e/p/1');ok((await txt()).includes('Módulo'),'período lista módulos');
await p.click('text=Módulo Sistema Cardiovascular TESTE');await p.waitForTimeout(100);
const T2=temaCom[1], nomeT2=await p.evaluate(t=>TEMAS[t].nome,T2);
await p.fill('#it-tema',nomeT2);await p.click('form[data-form="item-tema"] button');await p.waitForTimeout(100);
await go(`#/tema/${T2}/flashcards`);await p.click('[data-act="tema-cards-questoes"]');await p.waitForTimeout(100);
const nc=await p.evaluate(t=>cards().filter(c=>c.tema===t).length,T2);ok(nc>0,nc+' flashcards criados a partir das questões do tema');
await go(`#/flashcards/estudar/${T2}`);await p.click('[data-act="fc-mostrar"]');await p.click('[data-act="fc-nota"][data-n="2"]');await p.waitForTimeout(100);
const srs=await p.evaluate(t=>cards().filter(c=>c.tema===t&&c.srs.hist.length)[0].srs,T2);
ok(srs&&srs.int===1&&srs.prox>new Date().toISOString().slice(0,10),'card avaliado "bom" → próxima revisão em 1 dia');
await go(`#/tema/${T2}`);await p.click('[data-act="tema-estudei"]');await p.waitForTimeout(80);
ok((await txt()).includes('Próxima revisão'),'tema marcado como estudado → revisão agendada');
const cmp=await p.evaluate(()=>{CMP.a='ufam-medicina-teste-e2e';CMP.b='uea-medicina-teste-e2e';return 1});await go('#/medicina/comparar');
ok((await txt()).includes('Por período')&&(await txt()).includes('Nome semelhante não significa equivalência'),'comparador UFAM × UEA funciona');

console.log('Fluxo 3: especialidade → tema → questão → erro → caderno → revisão');
const esp=await p.evaluate(t=>TEMAS[t].especialidades[0],T1);
await go('#/medicina/esp/'+esp);ok((await txt()).includes(nomeT1),'especialidade lista o tema');
await go(`#/tema/${T1}/questoes`);await p.click(`[data-act="pl-encerrar"]`);await p.click(`[data-act="pl-sair"]`);
await p.click('[data-act="tema-praticar"]');await p.waitForTimeout(80);
const qErr=await p.evaluate(()=>PL.ids[PL.i]);await responder(false);
ok((await txt()).includes('caderno de erros'),'feedback de erro indica o caderno');
await go('#/erros');ok(!!(await p.$('#view a[href^="#/revisoes/erros/"]')),'caderno abre agrupado por tema');await p.click('[data-act="fe-vista"][data-v="0"]');await p.waitForTimeout(100);ok((await p.$$('[data-act="erro-detalhe"]')).length>=1,'erro aparece no caderno');
await p.click(`[data-act="erro-detalhe"][data-q="${qErr}"]`);await p.selectOption('#er-mot','Confundi conceitos parecidos');await p.fill('#er-com','nota pessoal teste');
await p.click('form[data-form="erro-salvar"] button.btn:not(.sec)');await p.waitForTimeout(80);
await p.click(`[data-act="erro-detalhe"][data-q="${qErr}"]`);await p.click('[data-act="erro-card"]');await p.waitForTimeout(80);
const E=await p.evaluate(q=>store.doc('erros').itens[q],qErr);ok(E.motivo==='Confundi conceitos parecidos'&&E.coment==='nota pessoal teste'&&E.card,'motivo, comentário e flashcard registrados no erro');
await p.evaluate(q=>{const e=store.doc('erros').itens[q];e.srs.prox=hoje();store.mudou('erros');},qErr); // "amanhã chegou"
await go('#/revisoes');ok((await txt()).includes('Refazer'),'revisão do erro aparece como pendente');
await go('#/revisoes/erros');ok((await txt()).includes('Refazer lote'),'erros agrupados em lotes por tema');await go('#/revisoes/erros/todos');await responder(true);
const E2=await p.evaluate(q=>store.doc('erros').itens[q].srs,qErr);ok(E2.etapa===1&&E2.int===7,'acertou na revisão → próxima em 7 dias');

console.log('Fluxo 4: ENEM → Matemática → assunto → questões → simulado → desempenho');
await go('#/enem');await p.click('#view a[href="#/enem/matematica/matematica"]');await p.waitForTimeout(100);
const assunto=await p.evaluate(()=>{const c={};questoes().filter(q=>q.t==='enem'&&q.disc==='Matemática').forEach(q=>c[q.tema]=(c[q.tema]||0)+1);return Object.keys(c)[0];});
await p.click(`#view a[href="#/tema/${assunto}"]`);await p.waitForTimeout(100);ok((await p.innerText('.crumbs')).includes('Matemática'),'assunto do ENEM com breadcrumb ENEM › Matemática');
await go(`#/tema/${assunto}/questoes`);await p.click('[data-act="tema-praticar"]');await responder(true);
await go('#/enem/matematica/matematica');await p.click('[data-act="sim-disc"]');await p.waitForTimeout(150);
await p.click('[data-act="sim-n"][data-v="10"]');await p.click('[data-act="sim-iniciar"]');await p.waitForTimeout(150);
const disc=await p.evaluate(()=>SIM.ids.map(qPorId).every(q=>q.disc==='Matemática'));ok(disc,'simulado personalizado só com Matemática');
for(let i=0;i<10;i++){await p.keyboard.press('B');if(i<9)await p.keyboard.press('ArrowRight');}
await p.click('[data-act="sim-entregar"]');await p.click('[data-act="sim-entregar-ok"]');await p.waitForTimeout(150);
ok((await txt()).includes('Resultado do simulado')&&(await txt()).includes('Por assunto'),'resultado com desempenho por assunto');
await go('#/desempenho');await p.click('[data-act="dv-aba"][data-v="enem"]');ok((await txt()).includes('Matemática e suas Tecnologias')||(await txt()).includes('Matemática'),'desempenho mostra a área do ENEM');
ok((await p.evaluate(()=>store.doc('simulados').hist.length))>=1,'simulado entrou no histórico');

console.log('Fluxo 5: dashboard → revisão pendente → revisar → desempenho atualizado');
await p.evaluate(t=>{const R=store.doc('revisoes');R.temas[t].prox=hoje();store.mudou('revisoes');},T2);
await go('#/');ok(!!(await p.$(`#view a[href="#/revisoes/tema/${T2}"]`)),'dashboard lista a revisão pendente');
const antes=await p.evaluate(()=>pendencias().total);
await p.click(`#view a[href="#/revisoes/tema/${T2}"]`);await p.waitForTimeout(100);
await p.click('[data-act="rev-iniciar"]');await p.waitForTimeout(80);
const nq=await p.evaluate(()=>PL.ids.length);for(let i=0;i<nq;i++){await responder(true);await p.click('[data-act="pl-prox"]');}
ok((await txt()).includes('próxima revisão em'),'revisão concluída com novo intervalo informado');
const r=await p.evaluate(t=>store.doc('revisoes').temas[t],T2);ok(r.prox>new Date().toISOString().slice(0,10)&&r.etapa>=1,'tema reagendado (etapa '+(r.etapa+1)+', '+r.int+' dias)');
ok((await p.evaluate(()=>pendencias().total))<antes,'pendências diminuíram');

console.log('Busca global');
await p.fill('#busca-global','insuficiencia cardiaca');await p.press('#busca-global','Enter');await p.waitForTimeout(150);
const bt=await txt();ok(bt.includes('Temas')&&bt.includes('Casos clínicos'),'busca retorna temas e casos');
console.log(errs.length?'ERROS JS: '+errs:'Sem erros de JS');
console.log(falhas?`${falhas} FALHA(S)`:'TODOS OS FLUXOS PASSARAM');await b.close();process.exit(falhas?1:0);})();
