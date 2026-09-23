// Teste de navegador (Playwright) dos recursos da etapa 2: mapa mental, erros em lote,
// backup automático semanal e conferência/validação da matriz. Rode na raiz do repositório:
//   python3 -m http.server 8765 &   e depois   node curriculos/testes/etapa2.js
const { chromium } = require('playwright');
const URL=process.env.APP_URL||'http://localhost:8765/curriculos/app.html';
let falhas=0; const ok=(c,m)=>{console.log((c?'  ✓ ':'  ✗ ')+m); if(!c) falhas++;};
(async()=>{const b=await chromium.launch(process.env.CHROMIUM?{executablePath:process.env.CHROMIUM}:{});
const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
// Conta simulada: armazenamento de arquivos (assets) e IA falsa que devolve um mapa em texto
await p.addInitScript(()=>{const A=new Map();window.__assets=A;let n=0;
  const assets={upload:async blob=>{const id=('a'+(++n)).padEnd(32,'0');A.set(id,await blob.text());return {id,url:'/_blob/'+id,sizeBytes:blob.size,contentType:blob.type}},delete:async id=>{A.delete(id);return {deleted:true}}};
  const s=async(t,o)=>{const txt='Hipertensão\n  - Diagnóstico\n    - Medida em consultório\n  - Tratamento\n    - Mudança de estilo de vida';o&&o.onText&&o.onText({text:txt});return {text:txt}};s.json=async()=>[];
  window.claude={use:async k=>k==='assets'?assets:k==='sample'?s:null};
  const f=window.fetch;window.fetch=async u=>String(u).startsWith('/_blob/')?new Response(A.get(String(u).slice(7))):f(u);});
await p.goto(URL);await p.waitForTimeout(600);
const go=async h=>{await p.evaluate(h=>location.hash=h,h);await p.waitForTimeout(150);};
const txt=()=>p.innerText('#view');

console.log('Item 3: mapa mental');
const T=await p.evaluate(()=>{const c={};questoes().filter(q=>q.t==='residencia').forEach(q=>c[q.tema]=(c[q.tema]||0)+1);return Object.entries(c).sort((a,b)=>b[1]-a[1])[0][0];});
await go(`#/tema/${T}/mapa`);
const nos=await p.$$eval('.arvore .no',e=>e.map(x=>x.innerText));
ok(nos.length>5&&nos.some(t=>t.includes('Subtemas'))&&nos.some(t=>t.includes('Questões')),`mapa do tema com ${nos.length} nós (subtemas, estudar…)`);
ok((await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)),'mapa não rola para o lado no celular');
await p.click('[data-act="ia-abrir"]');await p.click('[data-act="ia-acao"][data-v="mapa"]');await p.waitForTimeout(200);
ok((await p.$$('.folha .arvore .no')).length===5,'mapa mental da IA desenhado como árvore (5 nós)');
await p.click('.folha [data-act="fechar-folha"]');

console.log('Item 4: erros em lote por tema');
const temas=await p.evaluate(()=>{const c={};questoes().filter(q=>q.tema).forEach(q=>(c[q.tema]=c[q.tema]||[]).push(q.id));return Object.values(c).filter(v=>v.length>=3).slice(0,2);});
await p.evaluate(ts=>{ts.flat().forEach(id=>{const q=qPorId(id);registrarResposta(q,(q.c+1)%5,5000,'pratica');});const E=store.doc('erros');Object.values(E.itens).forEach(e=>e.srs.prox=hoje());store.mudou('erros');},temas);
await go('#/revisoes/erros');
ok((await p.$$('a[href^="#/revisoes/erros/"]')).length>=3,'lotes agrupados por tema + "todos"');
const tema1=await p.evaluate(id=>qPorId(id).tema,temas[0][0]);
await go('#/revisoes/erros/'+encodeURIComponent(tema1));
const ids=await p.evaluate(()=>PL.ids.map(i=>qPorId(i).tema));ok(ids.length===temas[0].length&&ids.every(t=>t===tema1),'lote contém só erros do tema ('+ids.length+')');
for(let i=0;i<ids.length;i++){await p.evaluate(ultima=>{const q=qPorId(PL.ids[PL.i]);const r=ultima?(q.c+1)%5:q.c;document.querySelector(`[data-act="pl-alt"][data-i="${r}"]`).click();},i===ids.length-1);await p.click('[data-act="pl-confirmar"]');await p.click('[data-act="pl-prox"]');}
ok((await txt()).includes('acertadas'),'resumo do lote exibido');
await p.click('[data-act="erros-cards"]');await p.waitForTimeout(100);
ok((await p.evaluate(t=>cards().filter(c=>c.tema===t&&c.origem==='erro').length,tema1))===1,'flashcard criado para a que errou de novo');
await go('#/erros');await p.click('[data-act="fe-vista"][data-v="1"]');await p.waitForTimeout(100);
ok(!!(await p.$('#view a[href^="#/revisoes/erros/"]')),'caderno de erros agrupado por tema');

console.log('Item 5: backup automático semanal');
await p.evaluate(()=>{const P=store.doc('perfil');P.ultimoBackup=Date.now()-8*86400000;store.mudou('perfil');});
await p.evaluate(()=>backupAutomatico());await p.waitForTimeout(200);
let bk=await p.evaluate(()=>({n:backups().length,onde:backups()[0]?.onde,arquivos:window.__assets.size,ult:store.doc('perfil').ultimoBackup}));
ok(bk.n===1&&bk.onde==='conta'&&bk.arquivos===1,'backup semanal gravado no armazenamento da conta');
await p.evaluate(()=>backupAutomatico());ok((await p.evaluate(()=>backups().length))===1,'não repete antes de 7 dias');
const antes=await p.evaluate(()=>Object.keys(store.doc('erros').itens).length);
await p.evaluate(()=>{store.zerar(['erros']);});
await go('#/biblioteca/dados');ok((await txt()).includes('Backup automático semanal'),'painel de backups na Biblioteca');
await p.click('[data-act="bk-restaurar"]');await p.click('[data-act="bk-restaurar-ok"]');await p.waitForTimeout(400);
ok((await p.evaluate(()=>Object.keys(store.doc('erros').itens).length))===antes,'restaurar trouxe de volta o caderno de erros');
ok((await p.evaluate(()=>backups().some(b=>b.motivo==='antes de restaurar'))),'cópia de segurança feita antes de restaurar');
ok((await p.evaluate(()=>!('backups' in store.exportar().docs))),'registro de backups não entra no próprio backup');

console.log('Item 1: importar documento oficial, conferir e validar');
await go('#/medicina/inst/ufam');ok((await p.$$('[data-act="imp-fonte"]')).length===2,'documentos oficiais com botão "Importar este documento"');
await p.click('[data-act="imp-fonte"]');await p.waitForTimeout(150);
ok((await p.evaluate(()=>IMP.fonteRef.startsWith('https://fm.ufam.edu.br'))),'fonte oficial preenchida no importador');
await p.fill('[data-c="versao"]','TESTE conferência');await p.dispatchEvent('[data-c="versao"]','change');
await p.fill('#imp-txt','1º PERÍODO\nTST001 DISCIPLINA TESTE A 120 60 60 6\nTST002 DISCIPLINA TESTE B 2 60 60 0 4');await p.click('[data-act="imp-interpretar"]');await p.click('[data-act="imp-salvar"]');await p.waitForTimeout(150);
const gid=await p.evaluate(()=>location.hash.split('/').pop());
await go(`#/medicina/grade/${gid}/conferir`);
ok(await p.$eval('[data-act="grade-validar"]',e=>e.disabled),'validar bloqueado antes de conferir');
await p.fill('[data-c="ch"] >> nth=1','75');await p.dispatchEvent('[data-c="ch"] >> nth=1','change');await p.waitForTimeout(100);
await p.click('[data-act="conf-periodo"]');await p.waitForTimeout(100);
await p.click('[data-act="grade-validar"]');await p.waitForTimeout(150);
const g=await p.evaluate(id=>{const g=gradePorId(id);return {st:g.status,em:g.validadoEm,it:itensGrade(g)};},gid);
ok(g.st==='validado'&&g.em&&g.it[1].ch===75&&g.it[1].nome==='DISCIPLINA TESTE B 2','matriz corrigida, conferida e validada');
console.log(errs.length?'ERROS JS: '+errs:'Sem erros de JS');console.log(falhas?falhas+' FALHA(S)':'ETAPA 2 OK');await b.close();process.exit(falhas?1:0);})();
