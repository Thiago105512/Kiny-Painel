/* ============================================================
   35-jogos-novos — jogos com conteúdo próprio (curriculos/jogos/*.json):
   · Caso do dia (inspirado no Doctordle): pistas uma a uma, 6 diagnósticos;
     cada palpite errado revela a próxima pista. Um caso por dia + treino livre.
   · Termo médico (inspirado no Wordle/Termo): palavra de 5 letras em 6 tentativas.
   · Pares (inspirado no Match do Quizlet): ligar sinal↔doença, antídoto↔intoxicação…
   · Onde fica? (atlas do corpo em SVG): tocar no órgão certo.
   Resultado do Caso e do Termo pode ser copiado como grade de quadradinhos.
   ============================================================ */
const JOGOS_DADOS = DADOS.jogos || {};
const casosDoDia = () => (JOGOS_DADOS.casos || []).filter(() => !objetivo() || ["medicina", "residencia"].includes(objetivo()));
const palavrasTermo = () => (JOGOS_DADOS.termo || []).filter(() => !objetivo() || ["medicina", "residencia"].includes(objetivo()));
const conjuntosPares = () => (JOGOS_DADOS.pares || []).filter(() => !objetivo() || ["medicina", "residencia"].includes(objetivo()));
const doDia = lista => lista.length ? lista[hashTxt("gabarito-" + hoje()) % lista.length] : null;
const diaCurto = () => hoje().split("-").reverse().slice(0, 2).join("/");
function diario() { const D = store.doc("jogos"); D.dia = D.dia?.d === hoje() ? D.dia : { d: hoje() }; return D.dia; }
const modoIntro = (id, rotHoje, feito, rotTreino) => `<div class="acoes">${feito
  ? `<p class="aviso ok" style="width:100%">Você já jogou o de hoje: ${feito}. Volte amanhã para um novo!</p>`
  : `<button class="btn grande" data-act="jg-modo" data-id="${id}" data-m="dia">${rotHoje}</button>`}
  <button class="btn grande sec" data-act="jg-modo" data-id="${id}" data-m="treino">${rotTreino}</button></div>`;
ACOES["jg-modo"] = el => { JG.modoNovo = el.dataset.m; ACOES["jg-comecar"](el); };

/* ================= Caso do dia ================= */
const PTS_PISTA = [50, 40, 30, 20, 10];
const jogoCaso = {
  id: "caso", nome: "Caso do dia", arte: "lupa", cor: "#C0265F", diario: () => !!diario().caso,
  desc: "Descubra o diagnóstico com o mínimo de pistas. Cada palpite errado revela mais uma.",
  fala: "Tenho um paciente misterioso. Quantas pistas você precisa?",
  disponivel: () => casosDoDia().length > 0,
  intro: () => { const d = diario(); return modoIntro("caso", "Caso de hoje", d.caso && `${d.caso.ok ? "acertou" : "não acertou"}${d.caso.ok ? ` com ${d.caso.pistas} pista${d.caso.pistas > 1 ? "s" : ""}` : ""}`, "Treinar com 5 casos"); },
  montar() {
    JG.modo = JG.modoNovo || "treino"; JG.modoNovo = null;
    const lista = JG.modo === "dia" ? [doDia(casosDoDia())] : embaralhar(casosDoDia()).slice(0, 5);
    return lista.map(c => ({ cid: c.id, k: 1, errados: [], fim: false, ok: false }));
  },
  tela(r) {
    const c = casosDoDia().find(x => x.id === r.cid);
    const grade = [0, 1, 2, 3, 4].map(i => `<span class="q ${i < r.errados.length ? "bad" : i === r.errados.length && r.ok ? "ok" : i < r.k ? "vista" : ""}"></span>`).join("");
    return `<div class="caixa caso-jogo">
      <div class="linha entre"><span class="lab">${JG.modo === "dia" ? `Caso de ${diaCurto()}` : `Caso ${JG.i + 1} de ${JG.rodadas.length}`} · vale ${r.fim ? (r.ok ? PTS_PISTA[r.k - 1] : 0) : PTS_PISTA[r.k - 1]} pontos</span><span class="grade-cd" aria-hidden="true">${grade}</span></div>
      <ol class="pistas">${c.pistas.map((p, i) => i < r.k || r.fim ? `<li class="${i < r.k ? "aberta" : "extra"}"><span class="n">${i + 1}</span><span>${esc(p)}</span></li>` : `<li class="fechada"><span class="n">${i + 1}</span><span>Pista escondida</span></li>`).join("")}</ol>
      ${!r.fim && r.k < 5 ? `<button class="btn sec" data-act="cd-pista">Mostrar mais uma pista (−10)</button>` : ""}
      <h3>Qual é o diagnóstico?</h3>
      <div class="jg-opcoes">${c.opcoes.map(o => { const s = r.fim ? (o === c.diagnostico ? "ok" : r.errados.includes(o) ? "bad" : "") : r.errados.includes(o) ? "bad" : "";
        return `<button class="btn grande sec" data-act="cd-palpite" data-o="${esc(o)}" data-s="${s}" ${r.fim || r.errados.includes(o) ? "disabled" : ""}>${esc(o)}</button>`; }).join("")}</div>
      ${r.fim ? `<div class="retorno">${falaMascote(r.ok ? `${esc(sorteio(ELOGIOS))} Era <b>${esc(c.diagnostico)}</b>, com ${r.k} pista${r.k > 1 ? "s" : ""}.` : `Era <b>${esc(c.diagnostico)}</b>. Esse foi difícil!`, r.ok ? "festa" : "triste", 76)}
        <div class="explica"><h3>${ilustra("livro", "#2340B8", "p")}Por quê</h3><p class="leitura">${esc(c.explicacao)}</p></div>
        <div class="acoes">${JG.modo === "dia" ? `<button class="btn sec" data-act="cd-compartilhar">Copiar resultado</button>` : ""}<button class="btn grande" data-act="jg-prox">${JG.i + 1 < JG.rodadas.length ? "Próximo caso" : "Ver resultado"}</button></div></div>` : ""}</div>`;
  },
  semPlacar: false,
  aoTerminar() {
    const acertos = JG.rodadas.filter(r => r.ok), cont = { casos: acertos.length, casoPista1: acertos.filter(r => r.k === 1).length };
    if (JG.modo === "dia") { const r = JG.rodadas[0]; diario().caso = { ok: r.ok, pistas: r.k, errados: r.errados.length }; store.mudou("jogos"); }
    return { cont, dia: JG.modo === "dia" ? { caso: 1 } : {} };
  },
};
function fecharCaso(r, ok) { r.fim = true; r.ok = ok; if (ok) { JG.acertos++; JG.seq++; JG.melhorSeq = Math.max(JG.melhorSeq, JG.seq); JG.pontos += PTS_PISTA[r.k - 1]; som("ok"); } else { JG.seq = 0; JG.erros++; som("erro"); } }
ACOES["cd-pista"] = () => { const r = JG.rodadas[JG.i]; if (!r.fim && r.k < 5) { r.k++; atualizar(); } };
ACOES["cd-palpite"] = el => {
  const r = JG.rodadas[JG.i], c = casosDoDia().find(x => x.id === r.cid), o = el.dataset.o; if (r.fim) return;
  if (o === c.diagnostico) fecharCaso(r, true);
  else { r.errados.push(o); som("erro"); if (r.k < 5) r.k++; else fecharCaso(r, false); }
  atualizar();
};
ACOES["cd-compartilhar"] = () => { const r = JG.rodadas[0];
  compartilharTexto(`Gabarito AM · Caso do dia ${diaCurto()}\n${[0, 1, 2, 3, 4].map(i => i < r.errados.length ? "🟥" : i === r.errados.length && r.ok ? "🟩" : "⬜").join("")}\n${r.ok ? `Acertei com ${r.k} pista${r.k > 1 ? "s" : ""}!` : "Não acertei hoje."}`); };

/* ================= Termo médico ================= */
const TECLADO = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
const semAcento = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase();
function avaliarTermo(tent, alvo) {
  const r = Array(5).fill("n"), resto = {};
  for (let i = 0; i < 5; i++) if (tent[i] === alvo[i]) r[i] = "c"; else resto[alvo[i]] = (resto[alvo[i]] || 0) + 1;
  for (let i = 0; i < 5; i++) if (r[i] !== "c" && resto[tent[i]]) { r[i] = "p"; resto[tent[i]]--; }
  return r;
}
const jogoTermo = {
  id: "termo", nome: "Termo médico", arte: "livro", cor: "#15803D", diario: () => !!diario().termo,
  desc: "Descubra a palavra médica de 5 letras em 6 tentativas. Verde: letra no lugar certo. Amarelo: a letra existe em outro lugar.",
  fala: "Uma palavra da Medicina, cinco letras. Acentos não contam!",
  disponivel: () => palavrasTermo().length > 0, semPlacar: true,
  intro: () => { const d = diario(); return modoIntro("termo", "Palavra de hoje", d.termo && (d.termo.ok ? `acertou em ${d.termo.n} tentativa${d.termo.n > 1 ? "s" : ""}` : "não acertou"), "Treinar com 3 palavras"); },
  montar() {
    JG.modo = JG.modoNovo || "treino"; JG.modoNovo = null;
    const lista = JG.modo === "dia" ? [doDia(palavrasTermo())] : embaralhar(palavrasTermo()).slice(0, 3);
    return lista.map(p => ({ w: p.palavra, tent: [], atual: "", fim: false, ok: false, dica: false }));
  },
  tela(r) {
    const p = palavrasTermo().find(x => x.palavra === r.w), linhas = [];
    const marca = { c: "certa", p: "existe", n: "não existe" };
    for (let i = 0; i < 6; i++) {
      const t = r.tent[i], av = t ? avaliarTermo(t, r.w) : null, txt = t || (i === r.tent.length && !r.fim ? r.atual : "");
      linhas.push(`<div class="termo-linha ${i === r.tent.length && !r.fim ? "atual" : ""}">${[0, 1, 2, 3, 4].map(k => `<span class="termo-casa ${av ? av[k] : ""}" ${av ? `aria-label="${txt[k]}: ${marca[av[k]]}"` : ""}>${txt[k] || ""}</span>`).join("")}</div>`);
    }
    const est = {}; r.tent.forEach(t => avaliarTermo(t, r.w).forEach((s, k) => { const l = t[k]; if (est[l] !== "c") est[l] = s === "c" ? "c" : est[l] === "p" ? "p" : s; }));
    const tecla = l => `<button class="tecla ${est[l] || ""}" data-act="tm-letra" data-l="${l}" ${r.fim ? "disabled" : ""}>${l}</button>`;
    return `<div class="caixa termo">
      <div class="linha entre"><span class="lab">${JG.modo === "dia" ? `Palavra de ${diaCurto()}` : `Palavra ${JG.i + 1} de ${JG.rodadas.length}`}</span><span><b>${JG.pontos}</b> pontos</span></div>
      <div class="termo-grade" aria-live="polite">${linhas.join("")}</div>
      ${r.dica || r.fim ? `<p class="aviso info" style="margin:8px 0">Dica: ${esc(p.dica)} <small>(${esc(p.area)})</small></p>` : !r.fim ? `<button class="btn sec mini" data-act="tm-dica">Ver dica (vale menos pontos)</button>` : ""}
      ${r.fim ? `<div class="retorno">${falaMascote(r.ok ? `${esc(sorteio(ELOGIOS))} Era <b>${esc(p.exibir)}</b>.` : `Era <b>${esc(p.exibir)}</b>. Na próxima vai!`, r.ok ? "festa" : "triste", 76)}
        <div class="explica"><h3>${ilustra("livro", "#2340B8", "p")}${esc(p.exibir)}</h3><p class="leitura">${esc(p.definicao)}</p></div>
        <div class="acoes">${JG.modo === "dia" ? `<button class="btn sec" data-act="tm-compartilhar">Copiar resultado</button>` : ""}<button class="btn grande" data-act="jg-prox">${JG.i + 1 < JG.rodadas.length ? "Próxima palavra" : "Ver resultado"}</button></div></div>`
      : `<div class="teclado">${TECLADO.map((l, i) => `<div>${i === 2 ? `<button class="tecla larga" data-act="tm-enter">Enviar</button>` : ""}${[...l].map(tecla).join("")}${i === 2 ? `<button class="tecla larga" data-act="tm-apagar" aria-label="Apagar">⌫</button>` : ""}</div>`).join("")}</div>`}</div>`;
  },
  aoTerminar() {
    const r0 = JG.rodadas[0], cont = { termo2: JG.rodadas.filter(r => r.ok && r.tent.length <= 2).length };
    if (JG.modo === "dia") { diario().termo = { ok: r0.ok, n: r0.tent.length, grade: r0.tent.map(t => avaliarTermo(t, r0.w).join("")) }; store.mudou("jogos"); }
    return { cont, dia: JG.modo === "dia" ? { termo: 1 } : {} };
  },
};
function termoTecla(k) {
  const r = JG.id === "termo" && !JG.fim && JG.rodadas?.[JG.i]; if (!r || r.fim) return;
  if (k === "ENTER") {
    if (r.atual.length < 5) { toast("A palavra tem 5 letras"); return; }
    r.tent.push(r.atual); r.atual = "";
    const ok = r.tent[r.tent.length - 1] === r.w;
    if (ok || r.tent.length >= 6) { r.fim = true; r.ok = ok; if (ok) { JG.acertos++; JG.seq++; JG.melhorSeq = Math.max(JG.melhorSeq, JG.seq); JG.pontos += Math.max(10, (7 - r.tent.length) * 10 - (r.dica ? 10 : 0)); } else { JG.seq = 0; JG.erros++; } som(ok ? "festa" : "erro"); }
    else som("tecla");
  } else if (k === "APAGAR") r.atual = r.atual.slice(0, -1);
  else if (/^[A-Z]$/.test(k) && r.atual.length < 5) { r.atual += k; som("tecla"); }
  atualizar();
}
ACOES["tm-letra"] = el => termoTecla(el.dataset.l);
ACOES["tm-enter"] = () => termoTecla("ENTER");
ACOES["tm-apagar"] = () => termoTecla("APAGAR");
ACOES["tm-dica"] = () => { const r = JG.rodadas[JG.i]; r.dica = true; atualizar(); };
ACOES["tm-compartilhar"] = () => { const r = JG.rodadas[0];
  compartilharTexto(`Gabarito AM · Termo médico ${diaCurto()} · ${r.ok ? r.tent.length : "X"}/6\n${r.tent.map(t => avaliarTermo(t, r.w).map(s => ({ c: "🟩", p: "🟨", n: "⬛" })[s]).join("")).join("\n")}`); };
document.addEventListener("keydown", e => {
  if (!location.hash.startsWith("#/jogos/termo") || e.ctrlKey || e.metaKey || e.altKey || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
  const k = e.key === "Enter" ? "ENTER" : e.key === "Backspace" ? "APAGAR" : semAcento(e.key);
  if (k === "ENTER" || k === "APAGAR" || /^[A-Z]$/.test(k)) { e.preventDefault(); termoTecla(k); }
});

/* ================= Pares ================= */
const jogoPares = {
  id: "pares", curto: "Ligue sinal a doença, antídoto a veneno…", nome: "Pares", arte: "chave", cor: "#0369A1",
  desc: "Toque num item da esquerda e depois no par dele à direita. Rápido e sem errar vale mais. Dois conjuntos por partida.",
  fala: "Memória e raciocínio: ligue cada item ao seu par!",
  disponivel: () => conjuntosPares().length > 0, semPlacar: true,
  montar: () => embaralhar(conjuntosPares()).slice(0, 2).map(c => { const ps = embaralhar(c.pares).slice(0, 6);
    return { cid: c.id, pares: ps, dir: embaralhar(ps.map(p => p[1])), feitos: [], sel: null, erro: null, erros: 0, t0: Date.now(), fim: false }; }),
  tela(r) {
    const c = conjuntosPares().find(x => x.id === r.cid), feitoE = e => r.feitos.includes(e), feitoD = d => r.pares.some(p => p[1] === d && feitoE(p[0]));
    return `<div class="caixa pares">
      <div class="linha entre"><span class="lab">${esc(c.titulo)} · ${JG.i + 1} de ${JG.rodadas.length}</span><span><b>${JG.pontos}</b> pontos · ${r.erros} erro${r.erros === 1 ? "" : "s"}</span></div>
      <p class="muted" style="margin:4px 0 10px">${esc(c.instrucao)}</p>
      <div class="pares-grade"><div>${r.pares.map(([e]) => `<button class="par-item" data-act="pr-esq" data-v="${esc(e)}" data-s="${feitoE(e) ? "ok" : r.sel === e ? "sel" : ""}" ${feitoE(e) || r.fim ? "disabled" : ""}>${esc(e)}</button>`).join("")}</div>
      <div>${r.dir.map(d => `<button class="par-item" data-act="pr-dir" data-v="${esc(d)}" data-s="${feitoD(d) ? "ok" : r.erro === d ? "bad" : ""}" ${feitoD(d) || r.fim ? "disabled" : ""}>${esc(d)}</button>`).join("")}</div></div>
      ${r.fim ? `<div class="retorno">${falaMascote(r.erros ? `Feito em ${r.seg} s, com ${r.erros} erro${r.erros > 1 ? "s" : ""}.` : `Perfeito, em ${r.seg} s!`, r.erros ? "feliz" : "festa", 72)}
        <h3>Para fixar</h3><ul class="pares-notas">${r.pares.map(([e, d]) => `<li><b>${esc(e)} → ${esc(d)}</b>${c.notas?.[e] ? `<br><span class="muted">${esc(c.notas[e])}</span>` : ""}</li>`).join("")}</ul>
        <div class="acoes"><button class="btn grande" data-act="jg-prox">${JG.i + 1 < JG.rodadas.length ? "Próximo conjunto" : "Ver resultado"}</button></div></div>` : ""}</div>`;
  },
  aoTerminar: () => ({ cont: { paresSemErro: JG.rodadas.filter(r => r.fim && !r.erros).length } }),
};
ACOES["pr-esq"] = el => { const r = JG.rodadas[JG.i]; r.sel = el.dataset.v; r.erro = null; som("tecla"); atualizar(); };
ACOES["pr-dir"] = el => {
  const r = JG.rodadas[JG.i]; if (!r.sel) { toast("Primeiro toque num item da esquerda"); return; }
  const par = r.pares.find(p => p[0] === r.sel);
  if (par[1] === el.dataset.v) { r.feitos.push(r.sel); r.sel = null; r.erro = null; JG.acertos++; som("ok");
    if (r.feitos.length === r.pares.length) { r.fim = true; r.seg = Math.round((Date.now() - r.t0) / 1000); JG.pontos += Math.max(20, 120 - r.seg - 10 * r.erros); JG.melhorSeq = Math.max(JG.melhorSeq, r.pares.length); } }
  else { r.erros++; JG.erros++; r.erro = el.dataset.v; som("erro"); }
  atualizar();
};

/* ================= Onde fica? (atlas do corpo) ================= */
const ORGAOS = {
  cerebro: "Cérebro", tireoide: "Tireoide", pulmao: "Pulmão", coracao: "Coração", figado: "Fígado", vesicula: "Vesícula biliar",
  estomago: "Estômago", baco: "Baço", pancreas: "Pâncreas", rim: "Rim", delgado: "Intestino delgado", grosso: "Intestino grosso", apendice: "Apêndice", bexiga: "Bexiga",
};
// [pergunta, órgão, explicação curta]
const PERGUNTAS_ANAT = [
  ["Toque no fígado.", "figado", "O fígado ocupa o hipocôndrio direito, sob o diafragma."],
  ["Toque no baço.", "baco", "O baço fica no hipocôndrio esquerdo, protegido pelas costelas 9 a 11."],
  ["Toque no pâncreas.", "pancreas", "O pâncreas é retroperitoneal, atrás do estômago, com a cabeça no arco do duodeno."],
  ["Toque na vesícula biliar.", "vesicula", "A vesícula fica sob o fígado, na altura da ponta da 9ª cartilagem costal direita."],
  ["Toque na tireoide.", "tireoide", "A tireoide fica na frente da traqueia, abaixo da cartilagem tireóidea."],
  ["Toque no apêndice.", "apendice", "O apêndice sai do ceco, na fossa ilíaca direita."],
  ["Qual órgão produz a bile?", "figado", "Os hepatócitos produzem a bile; a vesícula só armazena e concentra."],
  ["Qual órgão armazena e concentra a bile?", "vesicula", "A vesícula concentra a bile e a libera após refeições gordurosas, estimulada pela colecistocinina."],
  ["Qual órgão produz insulina e enzimas digestivas?", "pancreas", "O pâncreas tem parte endócrina (ilhotas: insulina, glucagon) e exócrina (amilase, lipase, tripsina)."],
  ["Qual glândula produz T3 e T4?", "tireoide", "A tireoide produz T4 e T3, sob o comando do TSH da hipófise."],
  ["Qual órgão filtra o sangue e produz a urina?", "rim", "Cada rim tem cerca de 1 milhão de néfrons, que filtram o plasma e formam a urina."],
  ["Onde acontece a maior parte da absorção dos nutrientes?", "delgado", "O intestino delgado (jejuno e íleo) absorve a maior parte dos nutrientes; a B12 é absorvida no íleo terminal."],
  ["Qual órgão absorve água e forma as fezes?", "grosso", "O cólon absorve água e eletrólitos e forma as fezes."],
  ["Qual órgão produz ácido clorídrico?", "estomago", "As células parietais do estômago secretam HCl e fator intrínseco."],
  ["Onde acontecem as trocas gasosas?", "pulmao", "Nos alvéolos pulmonares, o O₂ passa ao sangue e o CO₂ é eliminado."],
  ["Qual órgão armazena a urina?", "bexiga", "A bexiga armazena a urina até a micção."],
  ["Sinal de Murphy positivo sugere inflamação de qual órgão?", "vesicula", "Murphy: a inspiração é interrompida pela dor à palpação do ponto cístico. Pensa-se em colecistite aguda."],
  ["Sinal de Giordano positivo aponta para qual órgão?", "rim", "Giordano: dor à punho-percussão lombar. Sugere pielonefrite ou cálculo renal."],
  ["Dor que começa no umbigo e migra para a fossa ilíaca direita: qual órgão?", "apendice", "A migração da dor periumbilical para a fossa ilíaca direita é típica da apendicite aguda."],
  ["Trauma abdominal com dor no ombro esquerdo (sinal de Kehr): qual órgão se rompeu?", "baco", "O sangue irrita o diafragma e a dor é referida no ombro esquerdo. O baço é o órgão mais lesado no trauma fechado."],
  ["Dor em faixa no andar superior, após álcool, com lipase alta: qual órgão?", "pancreas", "Dor em faixa e lipase acima de 3 vezes o normal fazem o diagnóstico de pancreatite aguda."],
  ["Bócio é o aumento de qual glândula?", "tireoide", "Bócio é o aumento da tireoide. A carência de iodo é a causa clássica."],
  ["Esplenomegalia volumosa na leishmaniose visceral: qual órgão?", "baco", "Na leishmaniose visceral (calazar), o baço pode chegar à fossa ilíaca."],
  ["Úlcera péptica por H. pylori costuma acometer o duodeno ou qual órgão?", "estomago", "O H. pylori causa gastrite e úlceras gástricas e duodenais."],
  ["Globo vesical na retenção urinária: qual órgão está distendido?", "bexiga", "A bexiga distendida fica palpável e maciça acima da sínfise púbica."],
  ["Sopro sistólico no foco aórtico, na estenose aórtica: qual órgão?", "coracao", "A estenose aórtica causa sopro sistólico ejetivo no foco aórtico, irradiado para as carótidas."],
  ["A doença de Crohn acomete com mais frequência o íleo terminal. Toque no órgão.", "delgado", "O íleo terminal é o segmento mais acometido pela doença de Crohn."],
  ["A retocolite ulcerativa começa no reto e sobe continuamente por qual órgão?", "grosso", "A retocolite ulcerativa acomete a mucosa do cólon de forma contínua, a partir do reto."],
  ["AVC isquêmico: qual órgão sofre com a falta de fluxo?", "cerebro", "No AVC isquêmico, a oclusão de uma artéria cerebral leva à morte de neurônios."],
  ["Hepatomegalia dolorosa com icterícia na hepatite aguda: qual órgão?", "figado", "Na hepatite aguda, o fígado aumenta e fica doloroso; há aumento de ALT e AST."],
  ["Pneumonia com macicez e estertores crepitantes: qual órgão?", "pulmao", "A consolidação alveolar dá macicez, frêmito aumentado e crepitantes."],
  ["Cálculo coraliforme se forma em qual órgão?", "rim", "O cálculo coraliforme ocupa a pelve e os cálices renais, em geral de estruvita, associado a infecção."],
];
function mapaCorpo(r) {
  const s = org => r.resp == null ? "" : org === r.certo ? "ok" : org === r.resp ? "bad" : "";
  const o = (org, d, extra = "") => `<path class="orgao ${s(org)}" data-act="an-toque" data-org="${org}" d="${d}" ${extra}><title>${r.resp != null ? ORGAOS[org] : "órgão"}</title></path>`;
  return `<svg class="mapa-corpo" viewBox="0 0 200 300" role="group" aria-label="Mapa do corpo: toque num órgão">
    <path class="silhueta" d="M100 4c14 0 24 11 24 25s-10 25-24 25-24-11-24-25 10-25 24-25zM88 54h24v10c20 2 40 8 46 22 4 10 4 40 2 60-2 24-4 60-8 84-4 24-20 40-54 40s-50-16-54-40c-4-24-6-60-8-84-2-20-2-50 2-60 6-14 26-20 46-22z"/>
    ${o("cerebro", "M84 22c0-10 7-15 16-15s16 5 16 15c0 8-7 12-16 12s-16-4-16-12z")}
    ${o("tireoide", "M92 62c3-3 6-3 8 0 2-3 5-3 8 0 1 4-2 8-8 8s-9-4-8-8z")}
    ${o("pulmao", "M60 96c4-12 14-16 24-14 6 2 8 8 8 16v48c-10 4-24 6-34 2-4-18-2-38 2-52z")}
    ${o("pulmao", "M140 96c-4-12-14-16-24-14-6 2-8 8-8 16v26c6 6 8 14 6 22 10 4 22 4 28 0 4-18 2-36-2-50z")}
    ${o("coracao", "M98 118c6-6 16-4 18 4 2 8-4 18-18 28-8-8-12-16-10-24 1-6 5-10 10-8z")}
    ${o("figado", "M56 158c10-6 34-8 52-4 4 2 4 8 0 12-10 8-26 16-44 18-8 0-12-8-10-16 0-4 1-8 2-10z")}
    ${o("vesicula", "M84 176c4-2 9 0 10 5 1 6-3 10-7 10s-6-3-6-8c0-3 1-6 3-7z")}
    ${o("estomago", "M110 152c10-4 24-2 30 6 4 8 0 18-10 22-8 4-18 2-22-4 6-2 8-8 4-12-4-2-6-6-2-12z")}
    ${o("baco", "M144 160c6 0 10 6 10 14s-4 14-10 14c-2-8-2-18 0-28z")}
    ${o("pancreas", "M96 192c10-4 30-6 44-4 4 2 4 6 0 8-14 2-32 4-44 4-4-2-4-6 0-8z")}
    ${o("rim", "M62 196c6-4 12 0 12 8s-2 14-8 14-8-6-8-12 1-8 4-10z", 'stroke-dasharray="3 2"')}
    ${o("rim", "M138 196c-6-4-12 0-12 8s2 14 8 14 8-6 8-12-1-8-4-10z", 'stroke-dasharray="3 2"')}
    ${o("grosso", "M66 250v-38c0-8 6-10 14-10h40c8 0 14 2 14 10v38c0 8-6 12-12 12h-2v-10h2c2 0 2-2 2-4v-34c0-2-2-4-4-4H80c-2 0-4 2-4 4v34c0 2 0 4 2 4h2v10h-2c-6 0-12-4-12-12z")}
    ${o("delgado", "M84 222c4-6 12-8 18-6s12-2 16 4c4 6 2 16-4 20s-16 4-22 2-10-6-10-12c0-2 0-6 2-8z")}
    ${o("apendice", "M68 256c-2 4-2 10 2 14 3 2 5-1 4-4-1-3-1-7 0-10z")}
    ${o("bexiga", "M88 272c4-6 20-6 24 0 3 6-2 14-12 14s-15-8-12-14z")}
  </svg>`;
}
const jogoAnatomia = {
  id: "anatomia", curto: "Toque no órgão certo do mapa do corpo", nome: "Onde fica?", arte: "osso", cor: "#B45309",
  desc: "Um mapa do corpo: toque no órgão certo. Anatomia, função e sinais clínicos. Dez rodadas.",
  fala: "Anatomia é o mapa da Medicina. Mostre que você conhece o caminho!",
  disponivel: () => !objetivo() || ["medicina", "residencia"].includes(objetivo()),
  montar: () => embaralhar(PERGUNTAS_ANAT).slice(0, 10).map(([p, certo, exp]) => ({ p, certo, exp, resp: null })),
  tela(r) {
    return `<div class="caixa anat"><p class="enunciado">${esc(r.p)}</p><div class="anat-mapa">${mapaCorpo(r)}</div>
      <p class="small muted" style="text-align:center;margin:4px 0 0">Figura esquemática, em vista anterior: o lado direito do paciente fica à sua esquerda. Rins em tracejado (ficam atrás).</p>
      ${r.resp != null ? `<div class="retorno"><p class="veredito ${r.resp === r.certo ? "ok" : "bad"}">${r.resp === r.certo ? "✓ " + esc(sorteio(ELOGIOS)) : `Você tocou: ${esc(ORGAOS[r.resp])}. Era: ${esc(ORGAOS[r.certo])}`}</p>
        <p class="leitura" style="margin:0">${esc(r.exp)}</p><div class="acoes"><button class="btn grande" data-act="jg-prox">${JG.i + 1 < JG.rodadas.length ? "Próxima" : "Ver resultado"}</button></div></div>` : ""}</div>`;
  },
  aoTerminar: () => ({ cont: JG.acertos >= 10 ? { anatPerfeito: 1 } : {} }),
};
ACOES["an-toque"] = el => { const r = JG.rodadas[JG.i]; if (r.resp != null) return; r.resp = el.dataset.org; pontuar(r.resp === r.certo); atualizar(); };

JOGOS.unshift(jogoCaso, jogoTermo);
JOGOS.push(jogoPares, jogoAnatomia);
