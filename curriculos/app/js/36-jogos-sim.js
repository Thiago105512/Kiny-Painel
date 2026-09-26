/* ============================================================
   36-jogos-sim — jogos que não parecem prova (inspirados em jogos
   sérios de Medicina: pronto-socorro virtual, Full Code, Bugs vs Drugs,
   SteWARdS, Akinator/Cara a cara e o programa de TV de perguntas):
   · Plantão no PS — triagem de Manchester com fila de pacientes.
   · Salve o paciente — atendimento ramificado com monitor ao vivo.
   · Defesa antimicrobiana — invasores descem; escolha a arma certa.
   · Cascata — pôr os passos de um mecanismo em ordem.
   · Quem sou eu? — perguntas de sim/não até descobrir a doença.
   · Rumo ao Milhão — escada de prêmios com ajudas.
   · Caça-palavras — termos médicos escondidos na grade.
   Conteúdo em curriculos/jogos/*.json (DADOS.jogos).
   ============================================================ */
const JD = () => DADOS.jogos || {};
const soMed = () => !objetivo() || ["medicina", "residencia"].includes(objetivo());

/* ================= Plantão no PS (triagem) ================= */
const CORES_MAN = [
  ["vermelho", "Vermelho", "Emergência · imediato", "#DC2626"], ["laranja", "Laranja", "Muito urgente · 10 min", "#EA580C"],
  ["amarelo", "Amarelo", "Urgente · 60 min", "#CA8A04"], ["verde", "Verde", "Pouco urgente · 120 min", "#16A34A"], ["azul", "Azul", "Não urgente · 240 min", "#2563EB"]];
const idxCor = c => CORES_MAN.findIndex(x => x[0] === c);
const jogoTriagem = {
  id: "triagem", nome: "Plantão no PS", arte: "ambulancia", cor: "#DC2626", curto: "Classifique os pacientes que chegam (Manchester)",
  desc: "Seu plantão começa às 7h. Os pacientes chegam um a um: leia a queixa e os sinais vitais e classifique pelo Protocolo de Manchester.",
  fala: "Plantão cheio hoje! Quem precisa ser atendido primeiro?",
  disponivel: () => soMed() && (JD().triagem || []).length >= 12, semPlacar: true,
  montar() { const T = JD().triagem, por = c => embaralhar(T.filter(p => p.cor === c));
    return embaralhar([...por("vermelho").slice(0, 2), ...por("laranja").slice(0, 3), ...por("amarelo").slice(0, 3), ...por("verde").slice(0, 3), ...por("azul").slice(0, 1)]).map((p, k) => ({ pid: p.id, resp: null, sem: k })); },
  tela(r) {
    const p = JD().triagem.find(x => x.id === r.pid), s = p.sinais || {}, hora = 7 + Math.floor(JG.i * 11 / JG.rodadas.length);
    const fila = JG.rodadas.slice(JG.i + 1, JG.i + 6).map(x => { const q = JD().triagem.find(y => y.id === x.pid); return avatar(q.avatar, 34, x.sem); }).join("");
    const chips = [["PA", s.PA], ["FC", s.FC], ["FR", s.FR], ["SatO₂", s.SatO2 != null ? s.SatO2 + "%" : null], ["Tax", s.Tax != null ? String(s.Tax).replace(".", ",") + " °C" : null], ["Dor", s.dor != null ? s.dor + "/10" : null], ["Glasgow", s.glasgow], ["HGT", s.HGT]].filter(([, v]) => v != null && v !== "");
    const dif = r.resp == null ? 0 : idxCor(r.resp) - idxCor(p.cor);
    return `<div class="ps-topo"><span class="ps-relogio">${String(hora).padStart(2, "0")}:${JG.i % 2 ? "30" : "00"}</span><span><b>${JG.pontos}</b> pontos</span><span>Paciente ${JG.i + 1} de ${JG.rodadas.length}</span></div>
      <div class="ps-fila" aria-label="Sala de espera">${fila ? `<span class="small muted">Na espera:</span>${fila}` : `<span class="small muted">Último paciente do plantão</span>`}</div>
      <div class="caixa ps-paciente"><div class="ps-quem">${avatar(p.avatar, 84, r.sem)}<div><b class="ps-nome">${esc(p.nome)}</b><p class="balao ps-fala">“${esc(p.queixa)}”</p></div></div>
      <div class="vitais ps-vitais">${chips.map(([a, b]) => `<span class="vital"><b>${a}</b> ${esc(String(b))}</span>`).join("")}</div>
      ${r.resp == null ? `<h3>Qual a cor da pulseira?</h3><div class="ps-cores">${CORES_MAN.map(([id, n, t, c]) => `<button class="ps-cor" data-act="ps-cor" data-c="${id}" style="--c:${c}"><b>${n}</b><small>${t}</small></button>`).join("")}</div>`
      : `<div class="retorno"><p class="veredito ${dif === 0 ? "ok" : "bad"}">${dif === 0 ? "✓ Classificação certa" : dif > 0 ? "Subtriagem: a gravidade ficou abaixo do real" : "Supertriagem: mais grave do que o caso pedia"}</p>
        <div class="ps-pulseira" style="--c:${CORES_MAN[idxCor(p.cor)][3]}"><b>${CORES_MAN[idxCor(p.cor)][1]}</b> · ${esc(p.discriminador)} <small>(fluxograma: ${esc(p.fluxograma || "—")})</small></div>
        <p class="leitura" style="margin:8px 0 0">${esc(p.porque)}</p>
        <div class="acoes"><button class="btn grande" data-act="jg-prox">${JG.i + 1 < JG.rodadas.length ? "Chamar o próximo" : "Encerrar o plantão"}</button></div></div>`}</div>`;
  },
  resumoFim() { const T = JD().triagem, sub = JG.rodadas.filter(r => r.resp && idxCor(r.resp) > idxCor(T.find(x => x.id === r.pid).cor)).length, sup = JG.rodadas.filter(r => r.resp && idxCor(r.resp) < idxCor(T.find(x => x.id === r.pid).cor)).length;
    return `<p class="leitura">Acertou <b>${JG.acertos}</b> de ${JG.rodadas.length}. Subtriagens: <b>${sub}</b> (as mais perigosas). Supertriagens: <b>${sup}</b>.</p>`; },
  aoTerminar: () => ({ cont: { triagens: JG.acertos, plantaoPerfeito: JG.acertos === JG.rodadas.length ? 1 : 0 }, dia: { plantao: 1 } }),
};
ACOES["ps-cor"] = el => {
  const r = JG.rodadas[JG.i]; if (r.resp != null) return; r.resp = el.dataset.c;
  const p = JD().triagem.find(x => x.id === r.pid), d = idxCor(r.resp) - idxCor(p.cor), grave = idxCor(p.cor) <= 1;
  if (d === 0) pontuar(true); else { pontuar(false); JG.pontos += Math.abs(d) === 1 && !(d > 0 && grave) ? 3 : d > 0 && grave ? -10 : 0; JG.pontos = Math.max(0, JG.pontos); }
  atualizar();
};

/* ================= Salve o paciente (atendimento ramificado) ================= */
const jogoEmerg = {
  id: "emergencia", nome: "Salve o paciente", arte: "pulso", cor: "#059669", curto: "Atenda com o monitor ao vivo: cada decisão muda o paciente",
  desc: "Você é o médico da sala vermelha. Olhe o monitor, decida a conduta e veja o paciente responder. Erros leves têm volta; erros graves, não.",
  fala: "O monitor não mente. Olho nele e mãos à obra!",
  disponivel: () => soMed() && (JD().emergencias || []).length > 0, semPlacar: true,
  intro() { const D = store.doc("jogos"), feitos = D.emerg || {};
    return `<h3>Escolha o atendimento</h3><div class="em-lista">${JD().emergencias.map(c => `<button class="em-caso" data-act="em-escolher" data-id="${c.id}">${avatar(c.avatar, 48, c.id.length)}<span><b>${esc(c.titulo)}</b><small>${esc(c.paciente)}${feitos[c.id] ? ` · melhor: ${feitos[c.id]} pts ${feitos[c.id + "-ok"] ? "✓ salvo" : ""}` : ""}</small></span></button>`).join("")}</div>
      <button class="btn sec" data-act="em-escolher" data-id="">Sortear um caso</button>`; },
  montar() { const L = JD().emergencias, c = L.find(x => x.id === JG.emCaso) || embaralhar(L)[0]; JG.emCaso = null;
    return [{ cid: c.id, etapa: c.inicio, hist: [], nota: null, fim: null, vitais: c.etapas[c.inicio].vitais }]; },
  tela(r) {
    const c = JD().emergencias.find(x => x.id === r.cid);
    if (r.fim) { const f = c.finais[r.fim], bom = f.tipo === "bom";
      return `<div class="caixa em-fim">${monitor(r.vitais, { rotulo: true })}${falaMascote(esc(f.texto), bom ? "festa" : f.tipo === "parcial" ? "pensando" : "triste", 80)}<p class="em-desfecho ${f.tipo}">${bom ? "Paciente salvo" : f.tipo === "parcial" ? "Sobreviveu, mas com sequelas ou atraso" : "O paciente não resistiu"}</p>
        <p class="leitura"><b>Diagnóstico:</b> ${esc(c.diagnostico)}</p><h3>Debriefing</h3><ul class="pares-notas">${c.debriefing.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
        <p class="small muted">Referência: ${esc(c.referencia || "")}</p><div class="acoes"><button class="btn grande" data-act="jg-prox">Ver resultado</button></div></div>`; }
    const e = c.etapas[r.etapa];
    return `<div class="em-tela"><div class="linha entre"><span class="lab">${esc(c.paciente)} · ${esc(c.titulo)}</span><span><b>${JG.pontos}</b> pts</span></div>
      ${monitor(r.vitais)}
      ${r.nota ? `<div class="em-nota ${r.nota.pontos > 0 ? "boa" : r.nota.pontos < 0 ? "ruim" : ""}">${r.nota.pontos > 0 ? "✓" : r.nota.pontos < 0 ? "✗" : "•"} ${esc(r.nota.nota)}</div>` : ""}
      <div class="caixa"><div class="ps-quem">${avatar(c.avatar, 64, c.id.length)}<p class="leitura" style="margin:0">${esc(r.hist.length ? e.texto : c.cenario + " " + e.texto)}</p></div>
      <h3>O que você faz?</h3><div class="jg-opcoes">${embaralharFixo(e.acoes, r.etapa).map((a, k) => `<button class="btn grande sec" data-act="em-acao" data-k="${e.acoes.indexOf(a)}">${esc(a.txt)}</button>`).join("")}</div></div></div>`;
  },
  aoTerminar() { const r = JG.rodadas[0], c = JD().emergencias.find(x => x.id === r.cid), bom = r.fim && c.finais[r.fim].tipo === "bom", D = store.doc("jogos");
    D.emerg = D.emerg || {}; D.emerg[c.id] = Math.max(D.emerg[c.id] || 0, JG.pontos); if (bom) D.emerg[c.id + "-ok"] = 1; store.mudou("jogos");
    return { cont: bom ? { salvos: 1 } : {} }; },
};
const embaralharFixo = (lista, semente) => lista.map((x, i) => [x, hashTxt(semente + i + (x.txt || ""))]).sort((a, b) => a[1] - b[1]).map(x => x[0]);
ACOES["em-escolher"] = el => { JG.emCaso = el.dataset.id || null; iniciarJogo("emergencia"); };
ACOES["em-acao"] = el => {
  const r = JG.rodadas[0], c = JD().emergencias.find(x => x.id === r.cid), a = c.etapas[r.etapa].acoes[+el.dataset.k];
  r.hist.push([r.etapa, +el.dataset.k]); r.nota = a; JG.pontos = Math.max(0, JG.pontos + (a.pontos || 0));
  if (a.pontos > 0) { JG.acertos++; JG.seq++; JG.melhorSeq = Math.max(JG.melhorSeq, JG.seq); som("ok"); } else { JG.seq = 0; if (a.pontos < 0) { JG.erros++; som("erro"); } }
  if (c.finais[a.vai]) { r.fim = a.vai; if (c.finais[a.vai].tipo !== "bom") r.vitais = { ...r.vitais, ritmo: r.vitais.ritmo === "fv" || r.vitais.ritmo === "tv" ? "assistolia" : r.vitais.ritmo }; }
  else { r.etapa = a.vai; r.vitais = c.etapas[a.vai].vitais || r.vitais; }
  atualizar(); window.scrollTo({ top: 0 });
};

/* ================= Defesa antimicrobiana ================= */
const ICONE_INV = { bacteria: "bacteria", virus: "virus", fungo: "celula", protozoario: "mosquito", helminto: "fita" };
const DEF = { timer: null };
const jogoDefesa = {
  id: "defesa", nome: "Defesa antimicrobiana", arte: "escudo", cor: "#7C3AED", curto: "Invasores descem: dispare o tratamento certo",
  desc: "Infecções descem em direção à sua linha de defesa. Toque no tratamento certo antes que cheguem. Você tem 3 vidas; a cada 8 invasores, a fase fica mais difícil.",
  fala: "Antibiótico certo, na hora certa. E às vezes a melhor arma é não usar nenhum!",
  disponivel: () => soMed() && (JD().defesa?.invasores || []).length >= 20, semPlacar: true,
  intro: () => `<div class="acoes"><button class="btn grande" data-act="df-iniciar" data-v="normal">Começar</button><button class="btn grande sec" data-act="df-iniciar" data-v="calmo">Modo calmo (mais devagar)</button></div>`,
  montar() { const I = JD().defesa.invasores, f = n => embaralhar(I.filter(x => x.fase === n));
    return [...f(1).slice(0, 8), ...f(2).slice(0, 8), ...f(3).slice(0, 24)].map(inv => { const armas = JD().defesa.armas, ok = [inv.certa, ...(inv.aceitaveis || [])];
      return { iid: inv.id, ops: embaralhar([inv.certa, ...embaralhar(armas.filter(a => !ok.includes(a.id)).map(a => a.id)).slice(0, 3)]), resp: null }; }); },
  tela(r) {
    const D = JD().defesa, inv = D.invasores.find(x => x.id === r.iid), fase = inv.fase, arma = id => D.armas.find(a => a.id === id);
    const dur = (fase === 1 ? 16 : fase === 2 ? 13 : 11) * (DEF.calmo ? 1.6 : 1);
    const ult = JG.ultimo, chave = JG.t0 + ":" + JG.i;
    if (r.resp == null && !JG.pausa && DEF.chave !== chave) setTimeout(armarDefesa, 0);   // arma o cronômetro deste invasor (também no "Jogar de novo")
    const passou = DEF.chave === chave ? (Date.now() - DEF.inicio) / 1000 : 0;
    return `<div class="df-topo"><span><b>${JG.pontos}</b> pontos</span><span>Fase ${fase}</span><span class="jg-vidas">${[0, 1, 2].map(k => ilustra("escudo", k < JG.vidas ? "#7C3AED" : "#9AA0A8", "p")).join("")}</span></div>
      <div class="df-campo" id="df-campo">
        ${r.resp == null ? `<div class="df-invasor ${JG.pausa ? "pausado" : ""}" id="df-inv" style="animation-duration:${dur}s;animation-delay:-${passou.toFixed(2)}s">${ilustra(ICONE_INV[inv.tipo] || "bacteria", fase === 3 ? "#B42318" : "#7C3AED", "g")}<div><b>${esc(inv.nome)}</b><small>${esc(inv.detalhe)}</small></div></div>` : ""}
        <div class="df-linha">linha de defesa</div></div>
      ${ult ? `<div class="em-nota ${ult.ok ? "boa" : "ruim"}">${ult.ok ? "✓" : "✗"} <b>${esc(ult.nome)}</b>: ${esc(ult.porque)}</div>` : ""}
      <div class="df-armas">${r.ops.map(id => { const a = arma(id); return `<button class="df-arma" data-act="df-disparar" data-id="${id}" style="--c:${a.cor || "#7C3AED"}"><b>${esc(a.nome)}</b><small>${esc(a.classe || "")}</small></button>`; }).join("")}</div>
      <div class="acoes"><button class="btn sec mini" data-act="df-pausa">${JG.pausa ? "Continuar" : "Pausar"}</button></div>`;
  },
  resumoFim() { const erros = JG.revisar || [];
    return erros.length ? `<h3>Para revisar</h3><ul class="pares-notas">${erros.map(i => `<li><b>${esc(i.nome)} → ${esc(i.certa)}</b><br><span class="muted">${esc(i.porque)}${i.armadilha ? " " + esc(i.armadilha) : ""}</span></li>`).join("")}</ul>` : ""; },
  aoTerminar: () => { clearTimeout(DEF.timer); return { cont: { defesaMax: JG.acertos } }; },
};
function armarDefesa() {
  clearTimeout(DEF.timer); if (JG.id !== "defesa" || JG.fim || JG.pausa) return;
  const r = JG.rodadas[JG.i], inv = JD().defesa.invasores.find(x => x.id === r.iid), dur = (inv.fase === 1 ? 16 : inv.fase === 2 ? 13 : 11) * (DEF.calmo ? 1.6 : 1);
  const alvo = JG.i; DEF.chave = JG.t0 + ":" + JG.i; DEF.inicio = Date.now();
  DEF.timer = setTimeout(() => { if (JG.id === "defesa" && !JG.fim && JG.i === alvo && location.hash.startsWith("#/jogos/defesa")) resolverDefesa(null); }, dur * 1000);
}
function resolverDefesa(id) {
  const r = JG.rodadas[JG.i]; if (!r || r.resp != null) return; clearTimeout(DEF.timer);
  const D = JD().defesa, inv = D.invasores.find(x => x.id === r.iid), ok = id && (id === inv.certa || (inv.aceitaveis || []).includes(id));
  r.resp = id || "tempo"; const nomeCerta = D.armas.find(a => a.id === inv.certa)?.nome || inv.certa;
  JG.ultimo = { ok, nome: inv.nome, porque: ok ? inv.porque : (id ? "" : "O tempo acabou. ") + `Era ${nomeCerta}. ${inv.porque}` };
  if (ok) { pontuar(true, 10 * inv.fase); } else { JG.erros++; JG.seq = 0; JG.vidas--; som("erro"); (JG.revisar = JG.revisar || []).push({ nome: inv.nome, certa: nomeCerta, porque: inv.porque, armadilha: inv.armadilha }); }
  if (JG.vidas <= 0 || JG.i + 1 >= JG.rodadas.length) { terminarJogo(); return; }
  JG.i++; atualizar();
}
ACOES["df-iniciar"] = el => { DEF.calmo = el.dataset.v === "calmo"; iniciarJogo("defesa"); };
ACOES["df-disparar"] = el => { if (JG.pausa) return; resolverDefesa(el.dataset.id); };
ACOES["df-pausa"] = () => { JG.pausa = !JG.pausa; clearTimeout(DEF.timer); DEF.chave = null; atualizar(); };

/* ================= Cascata ================= */
const jogoCascata = {
  id: "cascata", nome: "Cascata", arte: "gota", cor: "#0891B2", curto: "Monte o mecanismo na ordem certa",
  desc: "Os passos de um mecanismo, processo ou protocolo estão embaralhados. Toque na ordem certa. Cinco rodadas.",
  fala: "Fisiopatologia é uma história: primeiro isso, depois aquilo…",
  disponivel: () => soMed() && (JD().cascatas || []).length >= 5, semPlacar: true,
  montar: () => embaralhar(JD().cascatas).slice(0, 5).map(c => ({ cid: c.id, ordem: embaralhar(c.passos.map((_, i) => i)), feitos: [], erros: 0, erro: null, fim: false })),
  tela(r) {
    const c = JD().cascatas.find(x => x.id === r.cid);
    return `<div class="caixa"><div class="linha entre"><span class="lab">${esc(c.area)} · ${JG.i + 1} de ${JG.rodadas.length}</span><span><b>${JG.pontos}</b> pontos</span></div>
      <h2 class="sec" style="margin-top:6px">${esc(c.titulo)}</h2>
      ${r.feitos.length ? `<ol class="cascata-feita">${r.feitos.map(i => `<li>${esc(c.passos[i])}</li>`).join("")}</ol>` : `<p class="muted">Toque no primeiro passo.</p>`}
      ${r.fim ? `<div class="retorno">${falaMascote(r.erros ? `Montado, com ${r.erros} erro${r.erros > 1 ? "s" : ""} no caminho.` : "Sequência perfeita!", r.erros ? "feliz" : "festa", 70)}<p class="leitura">${esc(c.explicacao)}</p>
        <div class="acoes"><button class="btn grande" data-act="jg-prox">${JG.i + 1 < JG.rodadas.length ? "Próxima" : "Ver resultado"}</button></div></div>`
      : `<div class="jg-linha">${r.ordem.filter(i => !r.feitos.includes(i)).map(i => `<button class="jg-marco" data-act="cs-passo" data-i="${i}" data-s="${r.erro === i ? "bad" : ""}"><span class="jg-ordem">?</span><span><b>${esc(c.passos[i])}</b></span></button>`).join("")}</div>`}</div>`;
  },
  aoTerminar: () => ({ cont: { cascataPerfeita: JG.rodadas.filter(r => r.fim && !r.erros).length } }),
};
ACOES["cs-passo"] = el => {
  const r = JG.rodadas[JG.i], i = +el.dataset.i;
  if (i === r.feitos.length) { r.feitos.push(i); r.erro = null; som("tecla"); if (r.feitos.length === JD().cascatas.find(x => x.id === r.cid).passos.length) { r.fim = true; const pts = Math.max(5, 30 - 5 * r.erros); JG.pontos += pts; if (!r.erros) { JG.acertos++; som("ok"); } } }
  else { r.erros++; r.erro = i; JG.erros++; som("erro"); }
  atualizar();
};

/* ================= Quem sou eu? ================= */
const jogoQuem = {
  id: "quemsou", nome: "Quem sou eu?", arte: "lupa", cor: "#9333EA", curto: "Pergunte sim ou não e descubra a doença",
  desc: "Eu penso numa doença; você faz perguntas de sim ou não. As que não combinam vão sendo riscadas. Acerte com o mínimo de perguntas.",
  fala: "Pensei numa doença… Duvido você descobrir em poucas perguntas!",
  disponivel: () => soMed() && (JD().quemsou?.grupos || []).length > 0, semPlacar: true,
  montar: () => embaralhar(JD().quemsou.grupos).slice(0, 3).map(g => ({ gid: g.id, alvo: embaralhar(g.doencas)[0], feitas: [], palpites: [], fim: false, ok: false })),
  tela(r) {
    const g = JD().quemsou.grupos.find(x => x.id === r.gid), resp = (pq, d) => pq.sim.includes(d);
    const viva = d => r.feitas.every(k => resp(g.perguntas[k], d) === resp(g.perguntas[k], r.alvo)) && !r.palpites.includes(d);
    const vivas = g.doencas.filter(viva);
    return `<div class="caixa quem"><div class="linha entre"><span class="lab">${esc(g.titulo)} · ${JG.i + 1} de ${JG.rodadas.length}</span><span><b>${JG.pontos}</b> pontos</span></div>
      ${falaMascote(r.fim ? (r.ok ? `Acertou! Eu era <b>${esc(r.alvo)}</b>.` : `Eu era <b>${esc(r.alvo)}</b>!`) : `${vivas.length} possibilidade${vivas.length > 1 ? "s" : ""}. ${r.feitas.length} pergunta${r.feitas.length === 1 ? "" : "s"} feita${r.feitas.length === 1 ? "" : "s"}.`, r.fim ? (r.ok ? "festa" : "triste") : "pensando", 70)}
      <div class="quem-cartas">${g.doencas.map(d => `<button class="quem-carta ${viva(d) ? "" : "riscada"} ${r.fim && d === r.alvo ? "alvo" : ""}" data-act="qs-palpite" data-d="${esc(d)}" ${r.fim || !viva(d) ? "disabled" : ""}>${esc(d)}</button>`).join("")}</div>
      ${r.fim ? `<p class="leitura">${esc(g.notas?.[r.alvo] || "")}</p><div class="acoes"><button class="btn grande" data-act="jg-prox">${JG.i + 1 < JG.rodadas.length ? "Próxima rodada" : "Ver resultado"}</button></div>`
      : `<h3>Perguntas (toque para perguntar)</h3><div class="quem-perguntas">${g.perguntas.map((pq, k) => { const f = r.feitas.includes(k);
          return `<button class="quem-perg ${f ? (resp(pq, r.alvo) ? "sim" : "nao") : ""}" data-act="qs-perg" data-k="${k}" ${f ? "disabled" : ""}>${esc(pq.txt)}${f ? ` <b>${resp(pq, r.alvo) ? "SIM" : "NÃO"}</b>` : ""}</button>`; }).join("")}</div>
        <p class="small muted">Quando tiver certeza, toque na carta da doença.</p>`}</div>`;
  },
};
ACOES["qs-perg"] = el => { const r = JG.rodadas[JG.i]; r.feitas.push(+el.dataset.k); som("tecla"); atualizar(); };
ACOES["qs-palpite"] = el => {
  const r = JG.rodadas[JG.i], d = el.dataset.d;
  if (d === r.alvo) { r.fim = r.ok = true; JG.acertos++; JG.pontos += Math.max(10, 60 - 5 * r.feitas.length - 15 * r.palpites.length); som("festa"); }
  else { r.palpites.push(d); JG.erros++; som("erro"); if (r.palpites.length >= 3) { r.fim = true; } }
  atualizar();
};

/* ================= Rumo ao Milhão ================= */
const PREMIOS = [1, 2, 3, 4, 5, 10, 20, 30, 40, 50, 100, 200, 300, 400, 500, 1000];   // em mil reais de mentirinha
const fmtPremio = k => k >= 1000 ? "R$ 1 milhão" : k ? `R$ ${k} mil` : "R$ 0";
const jogoMilhao = {
  id: "milhao", nome: "Rumo ao Milhão", arte: "alvo", cor: "#CA8A04", curto: "16 perguntas, ajudas e um milhão (de mentirinha)",
  desc: "Programa de perguntas: 16 degraus até o milhão (de mentirinha). Pode parar e levar o que tem. Errou, leva a metade. Ajudas: cartas, colegas, placas e 3 pulos.",
  fala: "Está valendo! Vai parar ou vai continuar?", semPlacar: true,
  montar() {
    const P = poolJogo().filter(q => q.q.length <= 420), d = n => embaralhar(P.filter(q => (q.dif || 2) === n));
    const qs = [...d(1).slice(0, 8), ...d(2).slice(0, 8), ...d(3).slice(0, 8)];
    JG.ajudas = { cartas: 1, colegas: 1, placas: 1, pulos: 3 }; JG.degrau = 0; JG.reserva = { 1: d(1).slice(8, 12), 2: d(2).slice(8, 12), 3: d(3).slice(8, 12) };
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(k => { const n = k < 5 ? 1 : k < 10 ? 2 : 3, q = n === 1 ? qs[k] : n === 2 ? qs[8 + k - 5] : qs[16 + k - 10];
      return { qid: q.id, ordem: opcoesEmbaralhadas(q), resp: null, fora: [], ajuda: null }; });
  },
  tela(r) {
    const q = qPorId(r.qid), k = JG.i, ac = k ? PREMIOS[k - 1] : 0, errar = k === 15 ? 0 : Math.floor(ac / 2), A = JG.ajudas;
    const escada = PREMIOS.map((p, i) => `<li class="${i === k ? "atual" : i < k ? "feito" : ""}">${fmtPremio(p)}</li>`).reverse().join("");
    const alts = r.ordem.map((i, pos) => { const s = r.resp == null ? (r.fora.includes(i) ? "fora" : "") : i === q.c ? "ok" : i === r.resp ? "bad" : "";
      return `<li><button class="alt" data-act="ml-resp" data-i="${i}" data-s="${s}" ${r.resp != null || r.fora.includes(i) ? "disabled" : ""}>${formaAlt(pos)}<span>${esc(q.o[i])}</span></button></li>`; }).join("");
    return `<div class="ml-painel"><div class="ml-valores"><span>Parar: <b>${fmtPremio(ac)}</b></span><span>Acertar: <b>${fmtPremio(PREMIOS[k])}</b></span><span>Errar: <b>${fmtPremio(errar)}</b></span></div>
      <details class="ml-escada-box"><summary>Escada de prêmios · pergunta ${k + 1} de 16</summary><ol class="ml-escada">${escada}</ol></details></div>
      <div class="caixa"><p class="enunciado">${esc(q.q)}</p><ol class="alts alts-jogo">${alts}</ol>
      ${r.ajuda ? `<div class="ml-ajuda">${r.ajuda}</div>` : ""}
      ${r.resp == null ? `<div class="ml-ajudas">
        <button class="btn sec" data-act="ml-ajuda" data-a="cartas" ${A.cartas ? "" : "disabled"}>Cartas</button>
        <button class="btn sec" data-act="ml-ajuda" data-a="colegas" ${A.colegas ? "" : "disabled"}>Colegas residentes</button>
        <button class="btn sec" data-act="ml-ajuda" data-a="placas" ${A.placas ? "" : "disabled"}>Placas</button>
        <button class="btn sec" data-act="ml-ajuda" data-a="pular" ${A.pulos ? "" : "disabled"}>Pular (${A.pulos})</button>
        <button class="btn perigo" data-act="ml-parar">Parar com ${fmtPremio(ac)}</button></div>`
      : `<div class="retorno"><p class="veredito ${r.resp === q.c ? "ok" : "bad"}">${r.resp === q.c ? (k === 15 ? "VOCÊ GANHOU O MILHÃO!" : "Certa resposta!") : `Que pena! Você leva ${fmtPremio(errar)}.`}</p>${htmlExplicacao(q.e)}
        <div class="acoes"><button class="btn grande" data-act="${r.resp === q.c && k < 15 ? "jg-prox" : "ml-fim"}">${r.resp === q.c && k < 15 ? `Valendo ${fmtPremio(PREMIOS[k + 1])}!` : "Ver resultado"}</button></div></div>`}</div>`;
  },
  resumoFim: () => `<p class="ml-final">Prêmio: <b>${fmtPremio(JG.premio || 0)}</b> <small class="muted">(de mentirinha)</small></p>`,
  aoTerminar: () => ({ cont: { milhaoMax: JG.degrau || 0, milhao: JG.premio >= 1000 ? 1 : 0 } }),
};
ACOES["ml-resp"] = el => {
  const r = JG.rodadas[JG.i], q = qPorId(r.qid), i = +el.dataset.i; if (r.resp != null) return;
  r.resp = i; registrarResposta(q, i, Date.now() - JG.tq, "jogo");
  if (i === q.c) { JG.acertos++; JG.degrau = JG.i + 1; JG.pontos = PREMIOS[JG.i]; JG.premio = PREMIOS[JG.i]; som(JG.i === 15 ? "festa" : "ok"); }
  else { JG.premio = JG.i === 15 ? 0 : Math.floor((JG.i ? PREMIOS[JG.i - 1] : 0) / 2); JG.pontos = JG.premio; JG.errados.push(q.id); som("erro"); }
  atualizar();
};
ACOES["ml-fim"] = () => terminarJogo();
ACOES["ml-parar"] = () => { JG.premio = JG.i ? PREMIOS[JG.i - 1] : 0; JG.pontos = JG.premio; terminarJogo(); };
ACOES["ml-ajuda"] = el => {
  const r = JG.rodadas[JG.i], q = qPorId(r.qid), A = JG.ajudas, a = el.dataset.a, erradas = r.ordem.filter(i => i !== q.c), dif = q.dif || 2;
  const letraDe = i => LETRAS[r.ordem.indexOf(i)];
  if (a === "cartas" && A.cartas) { A.cartas = 0; const n = 1 + Math.floor(Math.random() * 3); r.fora = embaralhar(erradas).slice(0, n); r.ajuda = `Você tirou a carta ${n}: ${n} alternativa${n > 1 ? "s" : ""} errada${n > 1 ? "s" : ""} saiu${n > 1 ? "ram" : ""}.`; }
  if (a === "colegas" && A.colegas) { A.colegas = 0; const acerta = [.85, .7, .55][dif - 1];
    r.ajuda = ["R1 Ana", "R2 Bruno", "R3 Carla"].map(n => { const i = Math.random() < acerta ? q.c : embaralhar(erradas)[0]; return `<b>${n}:</b> “Acho que é a ${letraDe(i)}.”`; }).join("<br>"); }
  if (a === "placas" && A.placas) { A.placas = 0; const base = [60, 45, 32][dif - 1], pc = {}; let resto = 100 - base; pc[q.c] = base;
    embaralhar(erradas).forEach((i, k, arr) => { const v = k === arr.length - 1 ? resto : Math.floor(Math.random() * (resto + 1) * .6); pc[i] = v; resto -= v; });
    r.ajuda = `<div class="ml-placas">${r.ordem.map(i => `<span><small>${pc[i] || 0}%</small><i style="height:${Math.round((pc[i] || 0) * .65)}%"></i><b>${letraDe(i)}</b></span>`).join("")}</div>`; }
  if (a === "pular" && A.pulos) { A.pulos--; const n = JG.i < 5 ? 1 : JG.i < 10 ? 2 : 3, nova = JG.reserva[n].shift(); if (nova) { JG.rodadas[JG.i] = { qid: nova.id, ordem: opcoesEmbaralhadas(nova), resp: null, fora: [], ajuda: null }; } }
  atualizar();
};

/* ================= Caça-palavras ================= */
const TAM_GRADE = 9;
function montarGrade(palavras) {
  for (let tentativa = 0; tentativa < 50; tentativa++) {
    const g = Array.from({ length: TAM_GRADE }, () => Array(TAM_GRADE).fill("")), pos = [];
    const ok = palavras.every(w => { for (let t = 0; t < 80; t++) { const hor = Math.random() < .5, l = Math.floor(Math.random() * (hor ? TAM_GRADE : TAM_GRADE - w.length + 1)), c = Math.floor(Math.random() * (hor ? TAM_GRADE - w.length + 1 : TAM_GRADE));
      const cel = [...w].map((_, k) => hor ? [l, c + k] : [l + k, c]); if (cel.every(([a, b], k) => !g[a][b] || g[a][b] === w[k])) { cel.forEach(([a, b], k) => { g[a][b] = w[k]; }); pos.push({ w, cel }); return true; } } return false; });
    if (ok) { const AB = "ABCDEFGHIJLMNOPRSTUV"; g.forEach(l => l.forEach((x, j) => { if (!x) l[j] = AB[Math.floor(Math.random() * AB.length)]; })); return { g, pos }; }
  }
  return null;
}
const jogoCaca = {
  id: "caca", nome: "Caça-palavras", arte: "lupa", cor: "#0D9488", curto: "Ache os termos médicos escondidos",
  desc: "Seis termos médicos escondidos na grade, na horizontal ou na vertical. Toque na primeira e na última letra de cada palavra.",
  fala: "As palavras estão escondidas. Use a dica se precisar!",
  disponivel: () => soMed() && palavrasTermo().length >= 12, semPlacar: true,
  montar() { const areas = [...new Set(palavrasTermo().map(p => p.area))].filter(a => a !== "outros" && palavrasTermo().filter(p => p.area === a).length >= 6);
    return embaralhar(areas).slice(0, 2).map(a => { const ps = embaralhar(palavrasTermo().filter(p => p.area === a)).slice(0, 6), gr = montarGrade(ps.map(p => p.palavra));
      return { area: a, ps: (gr ? ps : ps.slice(0, 4)).map(p => p.palavra), ...(gr || montarGrade(ps.slice(0, 4).map(p => p.palavra))), achadas: [], sel: null, t0: Date.now(), dicas: [], fim: false }; }); },
  tela(r) {
    const achada = (l, c) => r.pos.some(p => r.achadas.includes(p.w) && p.cel.some(([a, b]) => a === l && b === c));
    const info = w => palavrasTermo().find(p => p.palavra === w);
    return `<div class="caixa caca"><div class="linha entre"><span class="lab">Tema: ${esc(r.area)} · ${JG.i + 1} de ${JG.rodadas.length}</span><span><b>${JG.pontos}</b> pontos</span></div>
      <div class="caca-grade" style="--n:${TAM_GRADE}">${r.g.map((lin, l) => lin.map((x, c) => `<button class="caca-l ${achada(l, c) ? "ok" : ""} ${r.sel && r.sel[0] === l && r.sel[1] === c ? "sel" : ""}" data-act="cp-letra" data-l="${l}" data-c="${c}" ${r.fim ? "disabled" : ""}>${x}</button>`).join("")).join("")}</div>
      <ul class="caca-lista">${r.ps.map(w => { const p = info(w), a = r.achadas.includes(w), d = r.dicas.includes(w);
        return `<li class="${a ? "ok" : ""}">${a ? `<b>${esc(p.exibir)}</b> — ${esc(p.definicao)}` : d ? `<span>${esc(p.dica)}</span> <small class="muted">(${w.length} letras)</small>` : `<button class="btn sec mini" data-act="cp-dica" data-w="${w}">Dica</button> <span class="muted">${w.length} letras, começa com ${w[0]}</span>`}</li>`; }).join("")}</ul>
      ${r.fim ? `<div class="acoes"><button class="btn grande" data-act="jg-prox">${JG.i + 1 < JG.rodadas.length ? "Próxima grade" : "Ver resultado"}</button></div>` : ""}</div>`;
  },
};
ACOES["cp-dica"] = el => { const r = JG.rodadas[JG.i]; r.dicas.push(el.dataset.w); atualizar(); };
ACOES["cp-letra"] = el => {
  const r = JG.rodadas[JG.i], l = +el.dataset.l, c = +el.dataset.c;
  if (!r.sel) { r.sel = [l, c]; som("tecla"); atualizar(); return; }
  const [l0, c0] = r.sel; r.sel = null;
  const p = r.pos.find(p => !r.achadas.includes(p.w) && ((p.cel[0][0] === l0 && p.cel[0][1] === c0 && p.cel.at(-1)[0] === l && p.cel.at(-1)[1] === c) || (p.cel[0][0] === l && p.cel[0][1] === c && p.cel.at(-1)[0] === l0 && p.cel.at(-1)[1] === c0)));
  if (p) { r.achadas.push(p.w); JG.acertos++; JG.pontos += r.dicas.includes(p.w) ? 5 : 10; som("ok"); if (r.achadas.length === r.ps.length) { r.fim = true; JG.pontos += Math.max(0, 30 - Math.round((Date.now() - r.t0) / 10000)); } }
  else { som("erro"); toast("Não é uma das palavras. Toque na primeira e na última letra."); }
  atualizar();
};

JOGOS.push(jogoTriagem, jogoEmerg, jogoDefesa, jogoMilhao, jogoCascata, jogoQuem, jogoCaca);
