// Teste de navegador (Playwright). Rode na pasta raiz do repositório:
//   python3 -m http.server 8765 &   e depois   node curriculos/testes/migracao.js
// Use CHROMIUM=/caminho/do/chromium se o Playwright não achar o navegador.
const { chromium } = require('playwright');
const URL=process.env.APP_URL||'http://localhost:8765/curriculos/app.html';
let falhas=0; const ok=(c,m)=>{console.log((c?'  ✓ ':'  ✗ ')+m); if(!c) falhas++;};
const dbMock = (inicial) => `(()=>{const M=new Map(Object.entries(${JSON.stringify(inicial)}));window.__db=M;
 const doc=p=>({get:async()=>({id:p.split('/').pop(),exists:M.has(p),data:()=>M.get(p)}),set:async d=>{M.set(p,JSON.parse(JSON.stringify(d)))},collection:c=>col(p+'/'+c)});
 const col=p=>({get:async()=>{const n=p.split('/').length+1;const docs=[...M.keys()].filter(k=>k.startsWith(p+'/')&&k.split('/').length===n).map(k=>({id:k.split('/').pop(),exists:true,data:()=>M.get(k)}));return {docs,size:docs.length,empty:!docs.length}},doc:id=>doc(p+'/'+id)});
 const db={doc,collection:col};const user={id:async()=>'u_teste',isOwner:async()=>true,canEdit:async()=>true};
 window.claude={use:async n=>n==='db'?db:n==='user'?user:null};})()`;
(async()=>{const b=await chromium.launch(process.env.CHROMIUM?{executablePath:process.env.CHROMIUM}:{});
const ts=Date.now()-86400000;
console.log('1) Dados locais da versão anterior (sem conta)');
let ctx=await b.newContext();let p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(ts=>{if(!localStorage.getItem('gab2:lista'))localStorage.setItem('gabarito-am-v1',JSON.stringify({estado:{r:{'ene-6b707813':[2,1,1,ts],'med-2fd2fe07':[0,1,0,ts]},g:{'enem|Formato|0':1},dias:{'2026-09-20':3},sim:[{d:ts,t:'oab',n:10,ac:6,seg:600,areas:{}}]},extras:[{id:'qabc',t:'medicina',a:'Farmacologia',q:'Pergunta própria antiga?',o:['a','b','c','d','e'],c:2,e:'x',src:'minha'}]}))},ts);
await p.goto(URL);await p.waitForTimeout(500);
let r=await p.evaluate(()=>({pe:store.doc('prog-enem').q['ene-6b707813'],pm:store.doc('prog-medicina').q['med-2fd2fe07'],g:store.doc('guia').g,d:store.doc('dias').d['2026-09-20'],s:store.doc('simulados').hist.length,q:!!qPorId('qabc')}));
ok(r.pe&&r.pe.n===3&&r.pe.ac===2,'progresso das questões migrado (3 respostas, 2 acertos)');
ok(r.pm&&r.pm.h.at(-1)[2]===0,'última resposta errada preservada');
ok(r.g['enem|Formato|0']===1,'checklist do guia migrado');ok(r.d&&r.d.q===3,'dias de estudo migrados');ok(r.s===1,'histórico de simulados migrado');ok(r.q,'questão própria antiga continua no banco');
await p.reload();await p.waitForTimeout(400);
ok((await p.evaluate(()=>store.doc('prog-enem').q['ene-6b707813'].n))===3,'migração roda uma vez só (recarregar não duplica)');
await ctx.close();

console.log('2) Dados antigos só na conta (outro aparelho)');
ctx=await b.newContext();p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(dbMock({'data/users/u_teste/estado':{r:{'res-630b1f2d':[1,0,1,ts]},g:{},dias:{'2026-09-21':1},sim:[]},'data/users/u_teste/estado/questoes/qxyz':{t:'enem',a:'Física',q:'Questão antiga na conta?',o:['1','2','3','4','5'],c:0,e:'',src:'ia'}}));
await p.goto(URL);await p.waitForTimeout(1800);
r=await p.evaluate(()=>({p:store.doc('prog-residencia').q['res-630b1f2d'],q:!!qPorId('qxyz'),conta:store.naConta,keys:[...window.__db.keys()]}));
ok(r.conta,'conectado à conta');ok(r.p&&r.p.ac===1,'progresso remoto migrado');ok(r.q,'questão da conta migrada');
ok(r.keys.includes('data/users/u_teste/perfil')&&r.keys.includes('data/users/u_teste/prog-residencia'),'documentos novos gravados na conta');
ok(r.keys.includes('data/users/u_teste/estado'),'documento antigo mantido como cópia de segurança');
await ctx.close();

console.log('3) Sincronização entre aparelhos');
ctx=await b.newContext();p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(dbMock({'data/users/u_teste/perfil':{faculdade:'uea',metas:{questoes:40,minutos:90},_ts:Date.now()+1000},'data/users/u_teste/cards':{itens:{c1:{id:'c1',frente:'Remoto?',verso:'sim',tema:null,origem:'manual',dif:2,criado:1,srs:{etapa:-1,ease:2.2,int:0,prox:'2000-01-01',hist:[]}}},_ts:Date.now()+1000}}));
await p.goto(URL);await p.waitForTimeout(1500);
r=await p.evaluate(()=>({f:store.doc('perfil').faculdade,m:store.doc('perfil').metas.questoes,c:cards().length,pend:pendencias().cards.length,h:document.querySelector('#view').innerText}));
ok(r.f==='uea'&&r.m===40,'perfil vindo de outro aparelho aplicado');ok(r.c===1&&r.pend===1,'flashcard remoto aparece e está pendente');ok(r.h.includes('/40'),'tela atualizada após sincronizar');
await p.evaluate(()=>{criarCard({frente:'novo local',verso:'x'});});await p.waitForTimeout(1300);
ok((await p.evaluate(()=>Object.keys(window.__db.get('data/users/u_teste/cards').itens).length))===2,'alteração local sobe para a conta');
await ctx.close();
console.log(errs.length?'ERROS JS: '+errs:'Sem erros de JS');console.log(falhas?falhas+' FALHA(S)':'MIGRAÇÃO E SINCRONIZAÇÃO OK');await b.close();})();
