// Teste de navegador (Playwright) das correções da auditoria de código: sincronização que
// mescla item a item, aparelho novo sem sobrescrever o perfil, sessões preservadas por chave,
// lote de erros que só começa por toque, filtros que não fecham ao digitar, cards em blocos.
// Rode na raiz do repositório:   python3 -m http.server 8765 &   e   node curriculos/testes/auditoria.js
const { chromium } = require('playwright');
const URL=process.env.APP_URL||'http://localhost:8765/curriculos/app.html';
let falhas=0; const ok=(c,m)=>{console.log((c?'  ✓ ':'  ✗ ')+m); if(!c) falhas++;};
// Banco simulado com onSnapshot: window.__remoto(nome, corpo) imita uma gravação feita em outro aparelho.
const dbMock = (inicial) => `(()=>{const M=new Map(Object.entries(${JSON.stringify(inicial)}));window.__db=M;const ouvintes=[];
 const snapDe=(p,tipo)=>({docs:[],docChanges:()=>[{type:tipo,doc:{id:p.split('/').pop(),exists:true,data:()=>M.get(p)}}],metadata:{hasPendingWrites:false}});
 const doc=p=>({get:async()=>({id:p.split('/').pop(),exists:M.has(p),data:()=>M.get(p)}),set:async d=>{M.set(p,JSON.parse(JSON.stringify(d)))},collection:c=>col(p+'/'+c)});
 const col=p=>({get:async()=>{const n=p.split('/').length+1;const docs=[...M.keys()].filter(k=>k.startsWith(p+'/')&&k.split('/').length===n).map(k=>({id:k.split('/').pop(),exists:true,data:()=>M.get(k)}));return {docs,size:docs.length,empty:!docs.length}},doc:id=>doc(p+'/'+id),onSnapshot:(fn)=>{ouvintes.push(fn);return ()=>{}}});
 window.__remoto=(nome,corpo)=>{const p='data/users/u_teste/'+nome;M.set(p,corpo);ouvintes.forEach(f=>f(snapDe(p,'modified')));};
 const db={doc,collection:col};const user={id:async()=>'u_teste',isOwner:async()=>true,canEdit:async()=>true};
 window.claude={use:async n=>n==='db'?db:n==='user'?user:null};})()`;
(async()=>{const b=await chromium.launch(process.env.CHROMIUM?{executablePath:process.env.CHROMIUM}:{});const errs=[];
const agora=Date.now(), antes=agora-3600000;

console.log('1) Aparelho novo não sobrescreve o perfil da conta');
let ctx=await b.newContext();let p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(dbMock({'data/users/u_teste/perfil':{faculdade:'ufam',periodo:3,metas:{questoes:40,minutos:90},_ts:antes}}));
await p.goto(URL);await p.waitForTimeout(1500);
let r=await p.evaluate(()=>({f:store.doc('perfil').faculdade,m:store.doc('perfil').metas.questoes,remoto:window.__db.get('data/users/u_teste/perfil').faculdade}));
ok(r.f==='ufam'&&r.m===40,'perfil da conta carregado no aparelho novo');ok(r.remoto==='ufam','perfil da conta não foi sobrescrito pelo padrão');

console.log('2) Mescla item a item entre aparelhos');
// Cenário real de perda: este aparelho cria um card e, antes de enviar, chega a gravação de outro
// aparelho feita a partir da versão anterior (que não tinha este card), com um card diferente.
await p.evaluate(()=>{const antes=JSON.parse(JSON.stringify(window.__db.get('data/users/u_teste/cards')||{itens:{}}));
  criarCard({frente:'Card do celular',verso:'x',origem:'manual'});
  antes.itens.cOutro={id:'cOutro',frente:'Card do computador',verso:'y',tema:null,origem:'manual',criado:Date.now(),srs:{etapa:-1,ease:2.2,int:0,prox:hoje(),hist:[]}};antes._ts=Date.now()+5;
  window.__remoto('cards',antes);});
await p.waitForTimeout(1600);
r=await p.evaluate(()=>cards().map(c=>c.frente).sort());
ok(r.includes('Card do celular')&&r.includes('Card do computador'),'cards dos dois aparelhos ficam (sem perda): '+r.join(', '));
r=await p.evaluate(()=>Object.values(window.__db.get('data/users/u_teste/cards').itens).map(c=>c.frente).sort());
ok(r.includes('Card do celular')&&r.includes('Card do computador'),'conta recebeu a versão mesclada');
// Progresso: outro aparelho respondeu mais vezes → prevalece o que tem mais tentativas
r=await p.evaluate(()=>{const m=store._mesclar;
  const L={q:{a:{n:1,ac:1,h:[[1,0,1]]}},_ts:5},R={q:{a:{n:4,ac:2,h:[[1,0,1],[2,1,0],[3,0,1],[4,0,0]]},b:{n:1,ac:0,h:[]}},_ts:6},B={q:{a:{n:0,ac:0,h:[]}},_ts:1};
  const o=m(L,R,B);return {a:o.q.a.n,b:!!o.q.b};});
ok(r.a===4&&r.b,'progresso: mantém a versão com mais tentativas e acrescenta a nova questão');
r=await p.evaluate(()=>{const m=store._mesclar;const B={itens:{x:{id:'x',v:1},y:{id:'y',v:1}},_ts:1};
  const L={itens:{y:{id:'y',v:1}},_ts:3};             // aqui: x foi apagado
  const R={itens:{x:{id:'x',v:1},y:{id:'y',v:2}},_ts:2}; // lá: y foi editado
  const o=m(L,R,B);return {x:'x' in o.itens,y:o.itens.y.v};});
ok(!r.x&&r.y===2,'exclusão feita aqui e edição feita lá são respeitadas juntas');
await ctx.close();

console.log('3) Sessões e telas');
ctx=await b.newContext();p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto(URL);await p.waitForTimeout(600);
const go=async h=>{await p.evaluate(h=>location.hash=h,h);await p.waitForTimeout(180);};
await go('#/questoes');await p.click('[data-act="praticar-filtro"]');await p.waitForTimeout(200);
for(let i=0;i<2;i++){await p.evaluate(()=>{const q=qPorId(PL.ids[PL.i]);document.querySelector(`[data-act="pl-alt"][data-i="${q.c}"]`).click();});await p.click('[data-act="pl-confirmar"]');await p.click('[data-act="pl-prox"]');await p.waitForTimeout(100);}
const outra=await p.evaluate(()=>questoes().find(q=>!PL.ids.includes(q.id)).id);
await go('#/questoes/q/'+outra);await go('#/questoes');
r=await p.evaluate(()=>({i:PL.i,n:PL.ids.length,ch:PL.chave}));
ok(r.ch==='banco'&&r.i===2&&r.n>2,'abrir uma questão avulsa não perde a sessão em andamento (volta na questão 3)');
// Lote de erros: fechar não reinicia
await p.evaluate(()=>{const qs=questoes().slice(0,2);qs.forEach(q=>registrarResposta(q,(q.c+1)%5,5000,'pratica'));const E=store.doc('erros');qs.forEach(q=>{E.itens[q.id].srs.prox=hoje();});store.mudou('erros');});
await go('#/revisoes/erros/todos');
ok(!!(await p.$('[data-act="erros-iniciar"]')),'lote de erros mostra "Começar" em vez de iniciar sozinho');
await p.click('[data-act="erros-iniciar"]');await p.waitForTimeout(150);
await p.evaluate(()=>{PL.fim=true;});await p.evaluate(()=>atualizar());await p.click('[data-act="pl-sair"]');await p.waitForTimeout(150);
r=await p.evaluate(()=>({ativo:PL.ativo,botao:!!document.querySelector('[data-act="erros-iniciar"]')}));
ok(!r.ativo,'"Fechar" encerra o lote sem começar outro');
// Filtros não fecham ao digitar
await go('#/questoes');await p.evaluate(()=>{PL.ativo=false;});await go('#/erros');await go('#/questoes');
await p.evaluate(()=>{document.querySelector('details.filtros').open=true;});
await p.fill('[data-inp="fq-txt"]','ins');await p.waitForTimeout(400);
r=await p.evaluate(()=>({aberto:document.querySelector('details.filtros').open,foco:document.activeElement?.dataset?.inp}));
ok(r.aberto&&r.foco==='fq-txt','painel "Mais filtros" continua aberto e com o cursor no campo ao digitar');
// Cards em blocos
r=await p.evaluate(()=>{for(let i=0;i<130;i++)criarCard({frente:'c'+i,verso:'v',origem:'manual'});return {n:cards().length,blocos:blocosCards()};});
ok(r.n>=130&&r.blocos.includes('cards-1'),'flashcards divididos em blocos ('+r.blocos.join(', ')+')');
// Pílula "Não sabia" vira card para amanhã
r=await p.evaluate(()=>{const id=criarCard({frente:'p',verso:'r',origem:'pilula'});return cardPorId(id).srs.prox===somaDias(hoje(),1);});
ok(r,'card de pílula "não sabia" agendado para amanhã');
await ctx.close();

console.log('4) Calibração do nível pelo uso (anônima)');
ctx=await b.newContext();p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(dbMock({'data/users/u_teste/perfil':{faculdade:'ufam',_ts:antes},'data/users/u_teste/prog-medicina':{q:{'med-cc68d69f':{n:1,ac:1,h:[[antes,0,1,5000,'pratica']],f:1}},_ts:antes},'calibracao_total/geral':{q:{'med-cc68d69f':[40,26]}}}));
await p.goto(URL);await p.waitForTimeout(7500);
r=await p.evaluate(()=>{const k=[...window.__db.keys()].find(k=>k.startsWith('calibracao/'));return {k,doc:k&&window.__db.get(k),txt:acertoGeral(qPorId('med-cc68d69f'))};});
ok(r.k&&r.doc.q['med-cc68d69f']===1&&!('_ts' in r.doc),'1ª tentativa enviada de forma anônima ('+r.k+')');
ok(r.txt==='acertam 65% na 1ª tentativa (40)','mostra o acerto geral da questão: '+r.txt);
await ctx.close();

ok(!errs.length,errs.length?'erros de JS: '+errs.join(' | '):'Sem erros de JS');
await b.close();console.log(falhas?`${falhas} FALHA(S)`:'AUDITORIA OK');process.exit(falhas?1:0);})();
