/* Suíte de testes do Mucurinha – fórmulas, segurança e integridade das bases.
   Executar:  node testes/testes.js     (a partir de pediatria-amazonia/)
   Sai com código 1 se algum teste falhar. */
global.window = global;
const path = require('path');
const APP = path.join(__dirname, '..', 'app', 'js');
for (const f of ['utils', 'store', 'seguranca',
  'data/sinais-gravidade', 'data/contexto-epidemiologico', 'data/queixas', 'data/doencas',
  'data/medicamentos', 'data/emergencias', 'data/exames', 'data/vacinas', 'data/crescimento',
  'data/zscore', 'data/notificacao', 'calculators']) {
  try { require(path.join(APP, f + '.js')); } catch (e) { console.error('Falha ao carregar ' + f + ': ' + e.message); process.exit(1); }
}
try { require(path.join(APP, 'data', 'doencas-extra.js')); } catch (e) {}
try { require(path.join(APP, 'data', 'neonatal.js')); } catch (e) {}

const D = PED.data, C = PED.calc, U = PED.util, Z = PED.zscore, SEG = PED.seguranca;
let ok = 0, fail = 0; const falhas = [];
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
const doencas = (D.doencas || []).concat(D.doencasExtra || [], (D.neonatal && D.neonatal.protocolos) || []);
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

/* ---------- Resultado ---------- */
console.log('\nMucurinha – suíte de testes');
console.log('  bases: ' + doencas.length + ' doenças, ' + D.medicamentos.length + ' medicamentos, ' + D.queixas.length + ' queixas, ' +
  D.emergencias.length + ' emergências, ' + D.exames.length + ' exames, ' + D.vacinas.length + ' vacinas, ' + C.calculadoras.length + ' calculadoras');
console.log('  ' + ok + ' passaram, ' + fail + ' falharam');
if (fail) { console.log('\nFalhas:'); falhas.forEach(x => console.log('  ✗ ' + x)); process.exit(1); }
console.log('  ✓ tudo certo\n');
