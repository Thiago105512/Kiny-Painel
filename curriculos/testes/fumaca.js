// Teste de navegador (Playwright). Rode na pasta raiz do repositório:
//   python3 -m http.server 8765 &   e depois   node curriculos/testes/fumaca.js
// Use CHROMIUM=/caminho/do/chromium se o Playwright não achar o navegador.
const { chromium } = require('playwright');
const URL=process.env.APP_URL||'http://localhost:8765/curriculos/app.html';
const rotas=['/','/medicina','/medicina/inst/ufam','/medicina/inst/uea','/medicina/importar','/medicina/comparar','/medicina/especialidades','/medicina/esp/cardiologia',
 '/tema/hipertensao-arterial','/tema/hipertensao-arterial/questoes','/tema/hipertensao-arterial/flashcards','/tema/hipertensao-arterial/casos','/tema/hipertensao-arterial/notas','/tema/hipertensao-arterial/materiais','/tema/hipertensao-arterial/erros','/tema/hipertensao-arterial/desempenho',
 '/enem','/enem/matematica','/enem/matematica/matematica','/redacao','/redacao/escrever','/redacao/historico','/redacao/guia','/redacao/repertorios',
 '/questoes','/erros','/flashcards','/flashcards/estudar','/revisoes','/revisoes/erros','/casos','/casos/caso-malaria-vivax','/jogos','/jornada','/jogos/caso','/jogos/termo','/jogos/pares','/jogos/anatomia','/jogos/relogio','/jogos/triagem','/jogos/defesa','/jogos/milhao','/jogos/cascata','/jogos/quemsou','/jogos/caca','/jogos/emergencia','/simulados','/plano','/desempenho',
 '/biblioteca','/biblioteca/guia','/biblioteca/questoes','/biblioteca/dados','/busca/insuficiencia%20cardiaca','/rota-inexistente'];
(async()=>{const b=await chromium.launch(process.env.CHROMIUM?{executablePath:process.env.CHROMIUM}:{});
for (const vp of [{width:390,height:844},{width:768,height:1024},{width:1280,height:900}]){
 const p=await b.newPage({viewport:vp});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL);await p.waitForTimeout(400);
 const falhas=[];
 for(const r of rotas){await p.evaluate(h=>location.hash=h,'#'+r);await p.waitForTimeout(120);
  const info=await p.evaluate(()=>({erro:!!document.querySelector('#view .aviso')&&document.querySelector('#view').innerText.includes('Algo deu errado'),sw:document.documentElement.scrollWidth,iw:innerWidth,t:document.querySelector('h1')?.innerText||''}));
  if(info.erro||info.sw>info.iw+1||!info.t) falhas.push(r+' '+JSON.stringify(info));
 }
 console.log(vp.width,'px — falhas:',falhas.length?falhas:'nenhuma','| erros JS:',errs.length?[...new Set(errs)].slice(0,8):'nenhum');
 await p.close();}
await b.close();})();
