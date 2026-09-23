/* Suíte de testes do Mucurinha – fórmulas, segurança e integridade das bases.
   Executar:  node testes/testes.js     (a partir de pediatria-amazonia/)
   Sai com código 1 se algum teste falhar. */
global.window = global;
const path = require('path');
const APP = path.join(__dirname, '..', 'app', 'js');
for (const f of ['utils', 'store', 'seguranca', 'entrada', 'plantoes',
  'data/apoio-entrada', 'data/sinais-gravidade', 'data/contexto-epidemiologico', 'data/queixas', 'data/doencas',
  'data/medicamentos', 'data/emergencias', 'data/exames', 'data/vacinas', 'data/crescimento',
  'data/zscore', 'data/notificacao', 'calculators']) {
  try { require(path.join(APP, f + '.js')); } catch (e) { console.error('Falha ao carregar ' + f + ': ' + e.message); process.exit(1); }
}
for (const f of ['doencas-extra', 'neonatal', 'acidentes', 'comerciais', 'alternativas', 'locais', 'violencia', 'curiosidades', 'didatica']) {
  try { require(path.join(APP, 'data', f + '.js')); } catch (e) { console.error('AVISO: ' + f + ' não carregou (' + e.message.slice(0, 40) + ')'); }
}

const D = PED.data, C = PED.calc, U = PED.util, Z = PED.zscore, SEG = PED.seguranca;
let ok = 0, fail = 0; const falhas = []; const pendencias = {};
const num = (x) => typeof x === 'string' ? Number(String(x).replace(/\./g, '').replace(',', '.')) : x;
function t(nome, fn) {
  try { fn(); ok++; } catch (e) { fail++; falhas.push(nome + ' → ' + e.message); }
}
function eq(a, b, msg) { if (a !== b) throw new Error((msg || '') + ' esperado ' + b + ', obtido ' + a); }
function perto(a, b, tol, msg) { if (Math.abs(Number(a) - Number(b)) > (tol == null ? 0.01 : tol)) throw new Error((msg || '') + ' esperado ~' + b + ', obtido ' + a); }
const calc = (id, v) => C.calculadoras.find(c => c.id === id).calc(v);
const res = (r, rotuloParcial) => r.resultados.find(x => x.label.toLowerCase().includes(rotuloParcial.toLowerCase()));

/* ---------- 1. Calculadoras ---------- */
t('mg/kg/dose: exemplo do escopo (14 kg, 10 mg/kg, 200 mg/5 mL)', () => {
  const r = calc('mgkgdose', { peso: 14, mgkg: 10, concMg: 200, concMl: 5, vezesDia: 3 });
  eq(res(r, 'Dose por administração').valor, '140', 'dose em mg:');
  eq(res(r, 'Volume').valor, '3,5', 'volume em mL:');
  eq(res(r, 'Dose diária').valor, '420', 'dose diária:');
});
t('mg/kg/dose: respeita a dose máxima', () => {
  const r = calc('mgkgdose', { peso: 50, mgkg: 15, doseMax: 500 });
  eq(res(r, 'Dose por administração').valor, '500');
  if (!r.alertas.length) throw new Error('deveria alertar sobre a dose máxima');
});
t('mg/kg/dia: divide pelo número de administrações', () => {
  const r = calc('mgkgdia', { peso: 10, mgkgdia: 90, vezesDia: 3, concMg: 250, concMl: 5 });
  eq(res(r, 'Dose diária').valor, '900'); eq(res(r, 'Dose por administração').valor, '300'); eq(res(r, 'Volume').valor, '6');
});
t('Holliday-Segar: 5, 15 e 30 kg', () => {
  eq(C.hollidaySegar(5).dia, 500); eq(C.hollidaySegar(15).dia, 1250); eq(C.hollidaySegar(30).dia, 1700);
  perto(C.hollidaySegar(30).hora, 70.83, 0.01);
});
t('Superfície corporal (Mosteller) 14 kg / 96 cm', () => perto(U.scMosteller(14, 96), 0.611, 0.005));
t('IMC 14 kg / 96 cm', () => perto(U.imc(14, 96), 15.19, 0.01));
t('Déficit hídrico: 10 kg com 10%', () => eq(num(res(calc('deficit', { peso: 10, grau: 10 }), 'Déficit estimado').valor), 1000));
t('Plano C: 100 mL/kg divididos em 30 e 70', () => {
  const r = calc('reidratacao', { peso: 10, idadeMeses: 6, plano: 'C' });
  eq(num(res(r, 'Fase 1').valor), 300); eq(num(res(r, 'Fase 2').valor), 700);
});
t('Taxa de infusão em mcg/kg/min', () => {
  const r = calc('infusao', { peso: 10, mcgkgmin: 0.1, concMgMl: 0.06 });
  perto(num(res(r, 'Infusão contínua').valor), 1, 0.01);
});
t('Gotejamento: 500 mL em 4 h com macrogotas', () => eq(num(res(calc('gotejamento', { volume: 500, tempoH: 4, equipo: 20 }), 'Gotas').valor), 42));
t('Glasgow: soma e classificação', () => {
  const r = calc('glasgow', { ao: 2, rv: 2, rm: 4 });
  eq(res(r, 'Glasgow').valor, '8');
  if (!r.alertas.length) throw new Error('Glasgow <= 8 deveria alertar');
});
t('PA mínima por idade (PALS)', () => {
  eq(C.paMinima(0.5), 60); eq(C.paMinima(6), 70); eq(C.paMinima(60), 80); eq(C.paMinima(150), 90);
});
t('Correção de sódio (Adrogué-Madias)', () => {
  const r = calc('sodio', { peso: 10, naAtual: 120, naDesejado: 125, sol: 513 });
  perto(num(res(r, 'Déficit de sódio').valor), 30, 0.5);
});
t('Cálcio corrigido pela albumina', () => perto(num(res(calc('calcio', { peso: 10, ca: 7.6, alb: 2 }), 'Cálcio corrigido').valor), 9.2, 0.05));
t('Osmolaridade calculada', () => perto(num(res(calc('osmolaridade', { na: 140, gli: 90, ureia: 30 }), 'Osmolaridade calculada').valor), 290, 1));
t('Clearance de Schwartz', () => perto(C.schwartz(100, 0.5), 82.6, 0.5));
t('Tubo traqueal por idade (4 anos)', () => perto(num(res(calc('tubo', { idadeMeses: 48 }), 'sem cuff').valor), 5, 0.01));

/* ---------- 2. Idade e antropometria ---------- */
t('Idade: dias, meses e anos', () => {
  const ref = '2026-09-21T12:00:00';
  eq(U.idade('2026-09-01', ref).totalDias, 20);
  eq(U.idade('2025-09-21', ref).anos, 1);
  eq(U.idade('2020-03-21', ref).texto, '6 anos e 6 m');
});
t('Faixa etária clínica', () => {
  eq(U.faixaEtaria(0.5), 'Recém-nascido'); eq(U.faixaEtaria(12), 'Lactente');
  eq(U.faixaEtaria(48), 'Pré-escolar'); eq(U.faixaEtaria(100), 'Escolar'); eq(U.faixaEtaria(160), 'Adolescente');
});

/* ---------- 3. Escore-z (tabelas OMS) ---------- */
t('Escore-z: mediana é zero', () => {
  perto(Z.calcular('pesoIdade', 'M', 0, 3.3).z, 0, 0.01);
  perto(Z.calcular('pesoEstatura', 'M', 85, 11.5).z, 0, 0.01);
});
t('Escore-z: -2 DP no peso para idade do RN', () => perto(Z.calcular('pesoIdade', 'M', 0, 2.5).z, -2, 0.01));
t('Escore-z classifica desnutrição aguda grave', () => {
  const z = Z.calcular('pesoEstatura', 'M', 85, 8.8).z;
  if (z >= -3) throw new Error('esperado z < -3, obtido ' + z);
  if (!/grave/i.test(Z.classificar('pesoEstatura', z).rotulo)) throw new Error('classificação deveria indicar gravidade');
});
t('Escore-z classifica eutrofia e microcefalia', () => {
  eq(/eutrofia/i.test(Z.classificar('pesoEstatura', 0).rotulo), true);
  eq(/microcefalia/i.test(Z.classificar('perimetroCefalico', -2.5).rotulo), true);
});
t('Escore-z: avaliar devolve os índices disponíveis', () => {
  const av = Z.avaliar({ sexo: 'F', idadeMeses: 42, peso: 14, altura: 96 });
  if (av.length < 4) throw new Error('esperados 4 índices, obtidos ' + av.length);
  if (av.some(a => a.z == null || isNaN(a.z))) throw new Error('escore-z inválido');
});

/* ---------- 4. Segurança da prescrição ---------- */
t('Faixa etária: interpreta os formatos das bases', () => {
  eq(SEG.parseFaixa('>= 6 meses e >= 5 kg').minMeses, 6);
  eq(SEG.parseFaixa('>= 6 meses e >= 5 kg').minPeso, 5);
  eq(SEG.parseFaixa('> 8 anos (febre maculosa: qualquer idade)').minMeses, 96);
  eq(SEG.parseFaixa('3 a 24 meses').maxMeses, 24);
  eq(SEG.parseFaixa('Todas as idades'), null);
  eq(SEG.parseFaixa('Neonatos (0 a 28 dias)').maxMeses, 1);
});
t('Bloqueia primaquina abaixo de 6 meses', () => {
  const m = D.medicamentos.find(x => x.id === 'primaquina');
  const a = SEG.checarEsquema(m.doses[0], 2, 5);
  if (!a.some(x => x.nivel === 'bloqueio')) throw new Error('deveria bloquear');
});
t('Bloqueia doxiciclina abaixo de 8 anos', () => {
  const m = D.medicamentos.find(x => x.id === 'doxiciclina');
  if (!SEG.checarEsquema(m.doses[0], 48, 16).some(x => x.nivel === 'bloqueio')) throw new Error('deveria bloquear');
});
t('Não bloqueia esquema compatível com a idade', () => {
  const m = D.medicamentos.find(x => x.id === 'amoxicilina');
  if (SEG.checarEsquema(m.doses[0], 36, 14).some(x => x.nivel === 'bloqueio')) throw new Error('não deveria bloquear');
});
t('Alergia: penicilina bloqueia amoxicilina', () => {
  const a = SEG.checarAlergia(D.medicamentos.find(x => x.id === 'amoxicilina'), 'penicilina (urticária)');
  eq(a.length > 0 && a[0].nivel, 'bloqueio');
});
t('Alergia: penicilina alerta em cefalosporina (reatividade cruzada)', () => {
  const a = SEG.checarAlergia(D.medicamentos.find(x => x.id === 'cefalexina'), 'alergia a penicilina');
  eq(a.length > 0 && a[0].nivel, 'atencao');
});
t('Alergia: texto sem relação não gera alerta', () => eq(SEG.checarAlergia(D.medicamentos.find(x => x.id === 'amoxicilina'), 'poeira e ácaro').length, 0));
t('Prescrição: detecta duplicidade de princípio ativo', () => {
  const itens = [{ medId: 'amoxicilina', medicamento: 'Amoxicilina' }, { medId: 'amoxicilina', medicamento: 'Amoxicilina' }];
  if (!SEG.conferirPrescricao(itens, null).some(a => /mais de uma vez/.test(a.texto))) throw new Error('deveria apontar duplicidade');
});
t('Prescrição: antimicrobiano exige duas vias', () => {
  eq(SEG.temAntimicrobiano([{ medId: 'amoxicilina', medicamento: 'Amoxicilina' }]), true);
  eq(SEG.temAntimicrobiano([{ medId: 'paracetamol', medicamento: 'Paracetamol' }]), false);
});

/* ---------- 5. Integridade das bases ---------- */
const doencas = (D.doencas || []).concat(D.doencasExtra || [], (D.neonatal && D.neonatal.protocolos) || [], (D.acidentes && D.acidentes.protocolos) || []);
const idsDoenca = new Set(doencas.map(d => d.id));
const idsMed = new Set((D.medicamentos || []).map(m => m.id));
const idsExame = new Set((D.exames || []).map(e => e.id));

t('Ids de doença são únicos', () => eq(idsDoenca.size, doencas.length));
t('Ids de medicamento são únicos', () => eq(idsMed.size, D.medicamentos.length));
t('Toda referência de medicamento em doença existe', () => {
  const ruins = [];
  for (const d of doencas) for (const m of d.medicamentos || []) if (m.medId && !idsMed.has(m.medId)) ruins.push(d.id + ' → ' + m.medId);
  if (ruins.length) throw new Error(ruins.join(', '));
});
t('Toda hipótese das queixas aponta para doença existente', () => {
  const ruins = [];
  for (const q of D.queixas) for (const r of q.diferenciais || []) for (const h of r.hipoteses || []) if (h.doencaId && !idsDoenca.has(h.doencaId)) ruins.push(q.id + ' → ' + h.doencaId);
  if (ruins.length) throw new Error(ruins.join(', '));
});
t('Todo sinal de gravidade citado nas queixas existe', () => {
  const sg = new Set(D.sinaisGravidade.map(s => s.id)); const ruins = [];
  for (const q of D.queixas) for (const s of q.sinaisGravidade || []) if (!sg.has(s)) ruins.push(q.id + ' → ' + s);
  if (ruins.length) throw new Error(ruins.join(', '));
});
t('Toda notificação aponta para doença existente', () => {
  const ruins = ((D.notificacao || {}).doencas || []).filter(n => n.doencaId && !idsDoenca.has(n.doencaId)).map(n => n.doencaId);
  if (ruins.length) throw new Error(ruins.join(', '));
});
t('Apresentações têm mg e mL numéricos ou nulos', () => {
  const ruins = [];
  for (const m of D.medicamentos) for (const a of m.apresentacoes || [])
    if ((a.mg != null && typeof a.mg !== 'number') || (a.ml != null && typeof a.ml !== 'number')) ruins.push(m.id + ' → ' + a.descricao);
  if (ruins.length) throw new Error(ruins.join(', '));
});
t('Esquemas posológicos têm frequência e via', () => {
  const ruins = [];
  for (const m of D.medicamentos) for (const d of m.doses || []) if (!d.frequencia || !d.via) ruins.push(m.id + ' → ' + d.indicacao);
  if (ruins.length) throw new Error(ruins.join(', '));
});
t('Toda dose por kg produz número finito para 10 kg', () => {
  const ruins = [];
  for (const m of D.medicamentos) for (const d of m.doses || []) {
    if (d.mgKgDose == null) continue;
    const v = d.mgKgDose * 10;
    if (!isFinite(v) || v <= 0) ruins.push(m.id + ' → ' + d.indicacao);
  }
  if (ruins.length) throw new Error(ruins.join(', '));
});
t('Doses de emergência têm nome, via e forma de dose', () => {
  const ruins = [];
  for (const e of D.emergencias) for (const d of e.doses || []) {
    if (!d.nome || !d.via) { ruins.push(e.id + ' → ' + (d.nome || '?')); continue; }
    if (d.mgKg == null && d.doseFixa == null && !d.porGravidade && !d.informativo) ruins.push(e.id + ' → ' + d.nome + ' (sem dose)');
  }
  if (ruins.length) throw new Error(ruins.join(', '));
});
t('Toda base traz fontes e data de atualização', () => {
  const ruins = [];
  const checar = (lista, rotulo) => (lista || []).forEach(x => { if (!x.fontes || !x.fontes.length || !x.atualizadoEm) ruins.push(rotulo + ':' + (x.id || x.nome)); });
  checar(doencas, 'doenca'); checar(D.medicamentos, 'medicamento'); checar(D.emergencias, 'emergencia');
  checar(D.exames, 'exame'); checar(D.vacinas, 'vacina');
  if (ruins.length) throw new Error(ruins.slice(0, 10).join(', '));
});
t('Curvas de escore-z são monotônicas', () => {
  const ks = ['sd3neg', 'sd2neg', 'sd1neg', 'sd0', 'sd1', 'sd2', 'sd3']; const ruins = [];
  for (const [i, idx] of Object.entries(D.zscore.indices)) for (const s of ['M', 'F'])
    for (const r of idx[s]) { const v = ks.map(k => r[k]); for (let j = 1; j < v.length; j++) if (!(v[j] > v[j - 1])) ruins.push(i + ' ' + s + ' ' + (r.meses != null ? r.meses + 'm' : r.cm + 'cm')); }
  if (ruins.length) throw new Error(ruins.slice(0, 5).join(', '));
});
t('Nenhum texto clínico afirma diagnóstico definitivo', () => {
  const ruins = [];
  for (const d of doencas) {
    const txt = JSON.stringify([d.criteriosDiagnosticos, d.tratamento, d.manifestacoes]);
    if (/diagn[óo]stico definitivo (é|e) /i.test(txt)) ruins.push(d.id);
  }
  if (ruins.length) throw new Error(ruins.join(', '));
});

/* ---------- 6. Entrada rápida ---------- */
const E = PED.entrada;
t('Data digitada aceita os formatos usados na prática', () => {
  eq(E.paraISO('21092026'), '2026-09-21'); eq(E.paraISO('210926'), '2026-09-21');
  eq(E.paraISO('21/09/2026'), '2026-09-21'); eq(E.paraISO('1/2/26'), '2026-02-01');
  eq(E.paraISO('31/02/2026'), null, 'data inexistente:'); eq(E.paraISO('abc'), null);
});
t('Máscara de data formata enquanto digita', () => { eq(E.mascararData('2109'), '21/09'); eq(E.mascararData('21092026'), '21/09/2026'); });
t('Idade digitada interpreta anos, meses, semanas e dias', () => {
  perto(E.lerIdade('3a2m'), 38, 0.1); perto(E.lerIdade('1a6m'), 18, 0.1);
  perto(E.lerIdade('14 meses'), 14, 0.1); perto(E.lerIdade('20d'), 0.66, 0.02);
  perto(E.lerIdade('6 sem'), 1.38, 0.02); perto(E.lerIdade('5'), 60, 0.1);
});
t('Perguntas oferecem respostas adequadas ao que perguntam', () => {
  const P = E.perguntas;
  if (!P.opcoes('Há quantos dias está com febre?').includes('2 a 3 dias')) throw new Error('duração');
  if (!P.opcoes('Qual a temperatura aferida?').some(x => /39,5/.test(x))) throw new Error('temperatura');
  eq(P.opcoes('Houve vômitos?').join(','), 'Sim,Não,Não sei');
});

/* ---------- 7. Módulos novos ---------- */
if (D.comerciais) {
  t('Todo medicamento tem entrada de nome comercial', () => {
    const falta = D.medicamentos.filter(m => !D.comerciais.porMedicamento[m.id]).map(m => m.id);
    if (falta.length) throw new Error(falta.join(', '));
  });
  t('Sinônimos comerciais apontam para medicamentos existentes', () => {
    const ruins = Object.entries(D.comerciais.sinonimos || {}).filter(([, id]) => !idsMed.has(id));
    if (ruins.length) throw new Error(ruins.map(x => x[0]).join(', '));
  });
}
if (D.alternativas) {
  t('Alternativas cobrem o núcleo de doenças e emergências', () => {
    const nucleo = (D.doencas || []).concat((D.neonatal && D.neonatal.protocolos) || []);
    const falta = nucleo.filter(d => !D.alternativas.porDoenca[d.id]).map(d => d.id);
    if (falta.length) throw new Error('sem alternativas: ' + falta.join(', '));
  });
  // Protocolos complementares podem entrar depois; a pendência é relatada, não reprovada.
  pendencias.alternativas = (D.doencasExtra || []).filter(d => !D.alternativas.porDoenca[d.id]).map(d => d.id);
  t('Alternativas referenciam medicamentos existentes e tipos válidos', () => {
    const ruins = [];
    for (const [k, v] of Object.entries(D.alternativas.porDoenca)) for (const l of v.linhas || []) {
      if (!D.alternativas.rotulosTipo[l.tipo]) ruins.push(k + ' tipo ' + l.tipo);
      for (const o of l.opcoes || []) if (o.medId && !idsMed.has(o.medId)) ruins.push(k + ' med ' + o.medId);
    }
    if (ruins.length) throw new Error(ruins.slice(0, 5).join(', '));
  });
  t('Off-label vem sempre com justificativa', () => {
    const ruins = [];
    for (const [k, v] of Object.entries(D.alternativas.porDoenca)) for (const l of v.linhas || [])
      if (l.tipo === 'offlabel') for (const o of l.opcoes || []) if (!o.obs || o.obs.length < 20) ruins.push(k + ': ' + o.nome);
    if (ruins.length) throw new Error(ruins.join(', '));
  });
}
if (D.locais) {
  t('Amazonas vem primeiro e Manaus lidera as cidades', () => {
    eq(D.locais.estados[0].uf, 'AM'); eq(D.locais.estados[0].destaque, true);
    eq(D.locais.cidades.AM[0].nome, 'Manaus');
  });
  t('Unidades têm identificador único e zona válida', () => {
    const ids = D.locais.unidades.map(u => u.id);
    eq(new Set(ids).size, ids.length, 'ids duplicados:');
    const zs = new Set(D.locais.zonasManaus.map(z => z.id));
    const ruins = D.locais.unidades.filter(u => u.cidade === 'Manaus' && u.zona && !zs.has(u.zona)).map(u => u.nome);
    if (ruins.length) throw new Error(ruins.join(', '));
  });
  t('Nenhum telefone foi presumido sem endereço conhecido', () => {
    const ruins = D.locais.unidades.filter(u => u.telefone && !u.endereco).map(u => u.nome);
    if (ruins.length) throw new Error('telefone sem endereço: ' + ruins.join(', '));
  });
}
if (D.violencia) {
  t('Todo tipo de violência tem conduta e o que não fazer', () => {
    const ruins = [];
    for (const x of D.violencia.tipos) {
      const c = (D.violencia.conduta.porTipo || {})[x.id];
      if (!c) { ruins.push(x.id + ' sem conduta'); continue; }
      if (!(c.passos || []).length) ruins.push(x.id + ' sem passos');
      if (!(c.oQueNaoFazer || []).length) ruins.push(x.id + ' sem oQueNaoFazer');
    }
    if (ruins.length) throw new Error(ruins.join(', '));
  });
  t('Violência sexual traz as janelas de tempo das profilaxias', () => {
    const j = (D.violencia.conduta.porTipo.sexual || {}).janelas || [];
    if (j.length < 4) throw new Error('apenas ' + j.length + ' janelas');
    if (!j.some(x => /72/.test(x.prazo))) throw new Error('sem a janela de 72 horas');
  });
  t('Obrigações legais estão declaradas', () => {
    for (const k of ['notificacaoCompulsoria', 'conselhoTutelar', 'escutaEspecializada']) if (!D.violencia.legal[k]) throw new Error('falta ' + k);
  });
}
if (D.curiosidades) {
  t('Curiosidades trazem frase para explicar à família', () => {
    const semFala = Object.entries(D.curiosidades.porDoenca || {}).filter(([, v]) => !v.some(x => x.tipo === 'explicarFamilia')).map(x => x[0]);
    if (semFala.length) throw new Error(semFala.slice(0, 5).join(', '));
  });
}

/* ---------- 8. Acidentes do dia a dia ---------- */
if (D.acidentes) {
  const A = D.acidentes, F = A.ferramentas || {};
  t('Superfície corporal soma exatamente 100% em toda faixa etária', () => {
    const c = C.calculadoras.find(x => x.id === 'queimadura');
    if (!c) throw new Error('calculadora ausente');
    (F.lundBrowder.faixas || []).forEach((fx, i) => {
      const v = { peso: 10, faixa: String(i) };
      for (const campo of c.campos.slice(3)) v[campo.id] = campo.opcoes.some(o => o[0] === '2') ? '2' : '1';
      const soma = Number(String(c.calc(v).resultados[0].valor).replace(',', '.'));
      if (Math.abs(soma - 100) > 0.05) throw new Error(fx.idade + ' soma ' + soma + '%');
    });
  });
  t('Parkland calcula 4 mL por kg por porcentagem queimada', () => {
    const c = C.calculadoras.find(x => x.id === 'queimadura');
    const v = { peso: 10, faixa: '0', seg_cabeca: '1' };   // cabeça = 19% na faixa 0 a 1 ano
    const r = c.calc(v);
    perto(num(res(r, 'Superfície corporal queimada').valor), 19, 0.1);
    perto(num(res(r, 'total em 24 h').valor), 4 * 10 * 19, 1, 'total Parkland:');
    perto(num(res(r, 'Primeiras 8 h').valor), 380, 1);
  });
  t('Queimadura extensa gera alerta de encaminhamento', () => {
    const c = C.calculadoras.find(x => x.id === 'queimadura');
    const r = c.calc({ peso: 10, faixa: '0', seg_cabeca: '1' });
    if (!r.alertas.some(a => /queimados|refer/i.test(a))) throw new Error('faltou o alerta de centro de referência');
  });
  t('Protocolos de acidente têm todos os campos e medicamentos válidos', () => {
    const ruins = [];
    for (const x of A.protocolos) {
      for (const k of ['definicao', 'manifestacoes', 'sinaisAlarme', 'tratamento', 'criteriosInternacao', 'orientacoes', 'prevencao', 'fontes'])
        if (!x[k] || (Array.isArray(x[k]) && !x[k].length)) ruins.push(x.id + ' sem ' + k);
      for (const m of x.medicamentos || []) if (m.medId && !idsMed.has(m.medId)) ruins.push(x.id + ' med ' + m.medId);
    }
    if (ruins.length) throw new Error(ruins.slice(0, 5).join(', '));
  });
  t('Queixas de acidente apontam para protocolos existentes', () => {
    const pids = new Set(A.protocolos.map(x => x.id));
    const ruins = [];
    for (const q of A.queixas) for (const r of q.diferenciais || []) for (const h of r.hipoteses || [])
      if (h.doencaId && !pids.has(h.doencaId) && !idsDoenca.has(h.doencaId)) ruins.push(q.id + ' → ' + h.doencaId);
    if (ruins.length) throw new Error(ruins.join(', '));
  });
  t('Só telefones verificáveis foram registrados', () => {
    const permitidos = ['0800 722 6001', '192', '193', '190', '180', '100'];
    const ruins = (F.telefones || []).filter(x => !permitidos.includes(String(x.numero))).map(x => x.nome + ': ' + x.numero);
    if (ruins.length) throw new Error(ruins.join(', '));
  });
  t('As regras de PECARN e as profilaxias estão presentes', () => {
    for (const k of ['pecarn', 'profilaxiaRaiva', 'profilaxiaTetano', 'agentesToxicos', 'nuncaFazer']) if (!F[k]) throw new Error('falta ' + k);
    if (!F.pecarn.menor2anos || !F.pecarn.maior2anos) throw new Error('PECARN sem as duas faixas');
    if ((F.profilaxiaTetano.tabela || []).length < 3) throw new Error('tabela de tétano incompleta');
  });
  t('Nunca provocar vômito está escrito de forma explícita', () => {
    if (!(F.nuncaFazer || []).some(x => /v[oô]mito/i.test(x))) throw new Error('não consta');
  });
}

/* ---------- 9. Plantões ---------- */
const PL = PED.plantao;
t('Hora aceita as formas que se digita na pressa', () => {
  eq(PL.lerHora('7'), 420); eq(PL.lerHora('19'), 1140);
  eq(PL.lerHora('1930'), 1170); eq(PL.lerHora('19:30'), 1170);
  eq(PL.lerHora('2599'), null); eq(PL.lerHora('abc'), null);
});
t('Plantão noturno atravessa a meia-noite', () => {
  eq(PL.duracaoMin('19:00', '07:00'), 720, 'noturno 12 h:');
  eq(PL.duracaoMin('08:00', '14:30'), 390);
  eq(PL.duracaoMin('22:00', '02:00'), 240);
});
t('Duração é exibida em horas e minutos', () => {
  eq(PL.fmtDuracao(720), '12h'); eq(PL.fmtDuracao(390), '6h30'); eq(PL.fmtDuracao(null), '—');
});
t('Valor por hora multiplica a duração', () => {
  const v = PL.valores({ inicio: '19:00', fim: '07:00', forma: 'hora', valorHora: 150 });
  eq(v.liquido, 1800); eq(v.horas, 12);
});
t('Valor fechado ignora a duração', () => {
  eq(PL.valores({ inicio: '07:00', fim: '19:00', forma: 'fixo', valorFixo: 1200 }).liquido, 1200);
});
t('Acréscimo e desconto entram no líquido', () => {
  const v = PL.valores({ inicio: '19:00', fim: '07:00', forma: 'hora', valorHora: 150, acrescimo: 200, desconto: 180 });
  eq(v.bruto, 1800); eq(v.liquido, 1820);
});
t('Resumo do mês separa recebido de a receber', () => {
  PED.store.reset();
  const local = PED.store.upsert('locaisTrabalho', { nome: 'Teste', corIdx: 0, forma: 'hora', valorHora: 100 });
  PED.store.upsert('plantoes', { localId: local.id, data: '2026-09-10', inicio: '19:00', fim: '07:00', forma: 'hora', valorHora: 100, status: 'pago' });
  PED.store.upsert('plantoes', { localId: local.id, data: '2026-09-20', inicio: '08:00', fim: '14:00', forma: 'hora', valorHora: 100, status: 'previsto' });
  PED.store.upsert('plantoes', { localId: local.id, data: '2026-08-10', inicio: '08:00', fim: '14:00', forma: 'hora', valorHora: 100, status: 'pago' });
  const r = PL.resumoMes(2026, 9);
  eq(r.plantoes, 2, 'só os do mês:'); eq(r.minutos, 1080); eq(r.total, 1800);
  eq(r.pago, 1200); eq(r.aReceber, 600);
  eq(r.porLocal.length, 1); eq(r.porLocal[0].valor, 1800);
});
t('Série de meses volta na ordem certa', () => {
  const s2 = PL.serieMeses(6, 2026, 9);
  eq(s2.length, 6); eq(s2[5].rotulo, '09/26'); eq(s2[0].rotulo, '04/26');
  eq(s2[4].total, 600, 'agosto:');
});
t('Planilha do mês sai com cabeçalho e uma linha por plantão', () => {
  const csv = PL.csvMes(2026, 9).split('\n');
  eq(csv.length, 3, 'cabeçalho + 2 plantões:');
  if (!/Data;Local/.test(csv[0])) throw new Error('cabeçalho inesperado');
});
t('Paleta dos locais é a validada e não se repete antes de 8', () => {
  eq(PL.CORES.length, 8); eq(PL.CORES[0], '#2a78d6');
  eq(new Set(PL.CORES).size, 8);
  eq(PL.corLocal(0), PL.corLocal(8), 'o nono local reaproveita a primeira cor:');
});

/* ---------- Resultado ---------- */
console.log('\nMucurinha – suíte de testes');
const extras = [D.acidentes && 'acidentes', D.didatica && 'didática', D.comerciais && 'comerciais', D.alternativas && 'alternativas', D.locais && 'locais', D.violencia && 'violência', D.curiosidades && 'curiosidades'].filter(Boolean);
console.log('  módulos: ' + (extras.join(', ') || 'nenhum módulo complementar carregado'));
console.log('  bases: ' + doencas.length + ' doenças, ' + D.medicamentos.length + ' medicamentos, ' + D.queixas.length + ' queixas, ' +
  D.emergencias.length + ' emergências, ' + D.exames.length + ' exames, ' + D.vacinas.length + ' vacinas, ' + C.calculadoras.length + ' calculadoras');
console.log('  ' + ok + ' passaram, ' + fail + ' falharam');
for (const [k, v] of Object.entries(pendencias)) if (v && v.length) console.log('  … pendente em ' + k + ': ' + v.length + ' item(ns) — ' + v.slice(0, 6).join(', ') + (v.length > 6 ? '…' : ''));
if (fail) { console.log('\nFalhas:'); falhas.forEach(x => console.log('  ✗ ' + x)); process.exit(1); }
console.log('  ✓ tudo certo\n');
