/* Calculadoras pediátricas – cada calculadora expõe campos e uma função calc(v, paciente)
   que devolve { resultados:[{label, valor, unidade, destaque}], formula, alertas:[], fontes:[] }.
   Fórmulas padronizadas (SBP, OMS, PALS/AHA, Nelson). Sempre exibir a fórmula ao usuário. */
window.PED = window.PED || {};
PED.calc = (function () {
  const f = PED.util.fmt;
  const num = (x) => (x === '' || x == null || isNaN(Number(x))) ? null : Number(x);

  /* ---- Fórmulas reutilizáveis ---- */
  function hollidaySegar(peso) {
    if (!peso || peso <= 0) return null;
    let dia;
    if (peso <= 10) dia = peso * 100;
    else if (peso <= 20) dia = 1000 + (peso - 10) * 50;
    else dia = 1500 + (peso - 20) * 20;
    return { dia, hora: dia / 24 };
  }
  function schwartz(altCm, creat) { return (altCm > 0 && creat > 0) ? (0.413 * altCm) / creat : null; }
  function paMinima(totalMeses) {
    if (totalMeses == null) return null;
    if (totalMeses < 1) return 60;
    if (totalMeses < 12) return 70;
    if (totalMeses < 120) return 70 + 2 * Math.floor(totalMeses / 12);
    return 90;
  }
  function sinaisVitaisFaixa(totalMeses) {
    const t = (PED.data.crescimento && PED.data.crescimento.sinaisVitais) || [];
    return t.find(x => totalMeses >= x.minMeses && totalMeses < x.maxMeses) || null;
  }
  /** Percentil aproximado por interpolação linear entre p3/p15/p50/p85/p97 da tabela OMS */
  function percentilAprox(valor, linha) {
    if (!linha || valor == null) return null;
    const pts = [[3, linha.p3], [15, linha.p15], [50, linha.p50], [85, linha.p85], [97, linha.p97]].filter(p => p[1] != null);
    if (pts.length < 2) return null;
    if (valor <= pts[0][1]) return { p: '< 3', z: '< -1,88' };
    if (valor >= pts[pts.length - 1][1]) return { p: '> 97', z: '> +1,88' };
    for (let i = 0; i < pts.length - 1; i++) {
      const [pa, va] = pts[i], [pb, vb] = pts[i + 1];
      if (valor >= va && valor <= vb) {
        const p = pa + (pb - pa) * (valor - va) / (vb - va);
        return { p: '≈ ' + Math.round(p), z: null };
      }
    }
    return null;
  }
  function linhaCurva(tabela, sexo, meses) {
    if (!tabela || !tabela[sexo]) return null;
    const rows = tabela[sexo];
    // escolhe a linha mais próxima em meses (ou cm)
    let best = null, bd = Infinity;
    for (const r of rows) {
      const k = r.meses != null ? r.meses : r.cm;
      const d = Math.abs(k - meses);
      if (d < bd) { bd = d; best = r; }
    }
    return best;
  }

  const PESO = { id: 'peso', label: 'Peso (kg)', tipo: 'number', step: '0.1', fromPatient: 'peso' };
  const ALTURA = { id: 'altura', label: 'Altura (cm)', tipo: 'number', step: '0.5', fromPatient: 'altura' };
  const IDADE_M = { id: 'idadeMeses', label: 'Idade (meses)', tipo: 'number', step: '1', fromPatient: 'idadeMeses' };
  const SEXO = { id: 'sexo', label: 'Sexo', tipo: 'select', opcoes: [['M', 'Masculino'], ['F', 'Feminino']], fromPatient: 'sexo' };

  const calculadoras = [
    {
      id: 'mgkgdose', nome: 'Dose mg/kg/dose', icone: '💊', grupo: 'Doses',
      descricao: 'Calcula a dose em mg e o volume em mL a partir do peso, da dose por kg e da concentração da apresentação.',
      campos: [PESO,
        { id: 'mgkg', label: 'Dose (mg/kg/dose)', tipo: 'number', step: '0.01' },
        { id: 'concMg', label: 'Apresentação: mg', tipo: 'number', step: '0.1', placeholder: 'ex.: 200' },
        { id: 'concMl', label: 'Apresentação: em mL', tipo: 'number', step: '0.1', placeholder: 'ex.: 5' },
        { id: 'vezesDia', label: 'Administrações/dia', tipo: 'number', step: '1', placeholder: 'ex.: 3' },
        { id: 'doseMax', label: 'Dose máxima por dose (mg) – opcional', tipo: 'number', step: '1' }],
      calc(v) {
        const peso = num(v.peso), mgkg = num(v.mgkg), cm = num(v.concMg), cml = num(v.concMl), n = num(v.vezesDia), max = num(v.doseMax);
        if (!peso || mgkg == null) return null;
        let dose = peso * mgkg; const alertas = [];
        if (max && dose > max) { alertas.push(`Dose calculada (${f(dose)} mg) excede a dose máxima (${f(max)} mg): limitar a ${f(max)} mg.`); dose = max; }
        const conc = (cm && cml) ? cm / cml : null;
        const vol = conc ? dose / conc : null;
        const res = [{ label: 'Dose por administração', valor: f(dose), unidade: 'mg', destaque: true }];
        if (vol != null) res.push({ label: 'Volume por administração', valor: f(vol), unidade: 'mL', destaque: true });
        if (n) res.push({ label: 'Dose diária total', valor: f(dose * n), unidade: 'mg/dia' }, { label: 'mg/kg/dia', valor: f(mgkg * n), unidade: 'mg/kg/dia' });
        return {
          resultados: res, alertas,
          formula: `Dose = ${f(peso)} kg × ${f(mgkg)} mg/kg = ${f(peso * mgkg)} mg` + (conc ? `\nConcentração = ${f(cm)} mg ÷ ${f(cml)} mL = ${f(conc)} mg/mL\nVolume = ${f(dose)} mg ÷ ${f(conc)} mg/mL = ${f(vol)} mL` : ''),
          fontes: ['Cálculo aritmético padrão; conferir dose e apresentação na bula/protocolo']
        };
      }
    },
    {
      id: 'mgkgdia', nome: 'Dose mg/kg/dia', icone: '📅', grupo: 'Doses',
      descricao: 'Converte a dose diária total por kg em dose por administração e volume.',
      campos: [PESO,
        { id: 'mgkgdia', label: 'Dose (mg/kg/dia)', tipo: 'number', step: '0.01' },
        { id: 'vezesDia', label: 'Administrações/dia', tipo: 'number', step: '1', placeholder: 'ex.: 2' },
        { id: 'concMg', label: 'Apresentação: mg', tipo: 'number', step: '0.1' },
        { id: 'concMl', label: 'Apresentação: em mL', tipo: 'number', step: '0.1' },
        { id: 'doseMaxDia', label: 'Dose máxima diária (mg) – opcional', tipo: 'number' }],
      calc(v) {
        const peso = num(v.peso), d = num(v.mgkgdia), n = num(v.vezesDia) || 1, cm = num(v.concMg), cml = num(v.concMl), max = num(v.doseMaxDia);
        if (!peso || d == null) return null;
        let dia = peso * d; const alertas = [];
        if (max && dia > max) { alertas.push(`Dose diária calculada (${f(dia)} mg) excede o máximo (${f(max)} mg): limitar.`); dia = max; }
        const dose = dia / n; const conc = (cm && cml) ? cm / cml : null; const vol = conc ? dose / conc : null;
        const res = [{ label: 'Dose diária', valor: f(dia), unidade: 'mg/dia', destaque: true }, { label: 'Dose por administração', valor: f(dose), unidade: 'mg', destaque: true }];
        if (vol != null) res.push({ label: 'Volume por administração', valor: f(vol), unidade: 'mL', destaque: true });
        return { resultados: res, alertas, formula: `Dose diária = ${f(peso)} kg × ${f(d)} mg/kg/dia = ${f(peso * d)} mg\nDose/administração = ${f(dia)} ÷ ${n} = ${f(dose)} mg` + (conc ? `\nVolume = ${f(dose)} ÷ ${f(conc)} mg/mL = ${f(vol)} mL` : ''), fontes: ['Cálculo aritmético padrão'] };
      }
    },
    {
      id: 'sc', nome: 'Superfície corporal', icone: '📐', grupo: 'Antropometria',
      descricao: 'Superfície corporal pela fórmula de Mosteller (m²).',
      campos: [PESO, ALTURA],
      calc(v) {
        const p = num(v.peso), a = num(v.altura); const sc = PED.util.scMosteller(p, a); if (sc == null) return null;
        return { resultados: [{ label: 'Superfície corporal', valor: f(sc, 2), unidade: 'm²', destaque: true }], formula: `SC = √((${f(p)} × ${f(a)}) ÷ 3600) = ${f(sc, 2)} m²`, fontes: ['Mosteller RD. N Engl J Med 1987'] };
      }
    },
    {
      id: 'imc', nome: 'IMC', icone: '⚖️', grupo: 'Antropometria',
      descricao: 'Índice de massa corporal; interpretar sempre pela curva IMC/idade (OMS).',
      campos: [PESO, ALTURA, IDADE_M, SEXO],
      calc(v) {
        const p = num(v.peso), a = num(v.altura); const imc = PED.util.imc(p, a); if (imc == null) return null;
        const m = num(v.idadeMeses); const res = [{ label: 'IMC', valor: f(imc, 1), unidade: 'kg/m²', destaque: true }];
        const cur = PED.data.crescimento && PED.data.crescimento.curvasOMS;
        if (cur && m != null && v.sexo) { const pc = percentilAprox(imc, linhaCurva(cur.imcIdade, v.sexo, m)); if (pc) res.push({ label: 'Percentil IMC/idade (aprox.)', valor: pc.p, unidade: '' }); }
        return { resultados: res, formula: `IMC = ${f(p)} ÷ (${f(a / 100, 2)} m)² = ${f(imc, 1)} kg/m²`, alertas: ['Em pediatria, classificar pelo percentil/z-score IMC-para-idade, não por valores absolutos.'], fontes: ['OMS 2006/2007; Caderneta da Criança – MS'] };
      }
    },
    {
      id: 'percentis', nome: 'Percentis de crescimento', icone: '📈', grupo: 'Antropometria',
      descricao: 'Percentil aproximado de peso/idade, estatura/idade, PC/idade e peso/estatura (tabelas OMS 2006).',
      campos: [SEXO, IDADE_M, PESO, ALTURA, { id: 'pc', label: 'Perímetro cefálico (cm)', tipo: 'number', step: '0.1', fromPatient: 'pc' }],
      calc(v) {
        const cur = PED.data.crescimento && PED.data.crescimento.curvasOMS; if (!cur) return null;
        const m = num(v.idadeMeses), s = v.sexo; if (m == null || !s) return null;
        const res = [], al = [];
        const add = (label, val, tab, key) => { if (val == null) return; const pc = percentilAprox(val, linhaCurva(tab, s, key)); if (pc) { res.push({ label, valor: pc.p, unidade: '' }); if (pc.p === '< 3' || pc.p === '> 97') al.push(`${label}: fora da faixa p3–p97 – avaliar com curva oficial.`); } };
        add('Peso/idade – percentil', num(v.peso), cur.pesoIdade, m);
        add('Estatura/idade – percentil', num(v.altura), cur.estaturaIdade, m);
        if (m <= 36) add('PC/idade – percentil', num(v.pc), cur.perimetroCefalico, m);
        if (num(v.altura) && num(v.peso) && cur.pesoEstatura) { const pc = percentilAprox(num(v.peso), linhaCurva(cur.pesoEstatura, s, num(v.altura))); if (pc) res.push({ label: 'Peso/estatura – percentil', valor: pc.p, unidade: '' }); }
        if (!res.length) return null;
        return { resultados: res, alertas: al.concat(['Valores aproximados por interpolação linear entre percentis; usar as curvas oficiais (Caderneta da Criança) para decisão.']), formula: 'Interpolação linear entre p3, p15, p50, p85 e p97 das tabelas OMS 2006 (linha de idade/comprimento mais próxima).', fontes: ['WHO Child Growth Standards 2006'] };
      }
    },
    {
      id: 'holliday', nome: 'Manutenção hídrica (Holliday-Segar)', icone: '💧', grupo: 'Fluidos',
      descricao: 'Volume de manutenção em 24 h e mL/h pela regra 100/50/20.',
      campos: [PESO],
      calc(v) {
        const p = num(v.peso); const h = hollidaySegar(p); if (!h) return null;
        return { resultados: [{ label: 'Manutenção 24 h', valor: f(h.dia, 0), unidade: 'mL/dia', destaque: true }, { label: 'Taxa horária', valor: f(h.hora, 1), unidade: 'mL/h', destaque: true }],
          formula: '100 mL/kg (primeiros 10 kg) + 50 mL/kg (10–20 kg) + 20 mL/kg (> 20 kg)\n' + `Peso ${f(p)} kg → ${f(h.dia, 0)} mL/dia ÷ 24 = ${f(h.hora, 1)} mL/h`,
          alertas: ['Ajustar em febre, desidratação, cardiopatia, nefropatia, SIADH e neonatos (usar regime neonatal).'], fontes: ['Holliday MA, Segar WE. Pediatrics 1957'] };
      }
    },
    {
      id: 'deficit', nome: 'Déficit hídrico', icone: '🩸', grupo: 'Fluidos',
      descricao: 'Déficit estimado pelo grau de desidratação (% do peso).',
      campos: [PESO, { id: 'grau', label: 'Grau de desidratação', tipo: 'select', opcoes: [['5', 'Leve (~5 %)'], ['7.5', 'Moderada (~7,5 %)'], ['10', 'Grave (~10 %)'], ['3', 'Mínima (~3 %)']] }],
      calc(v) {
        const p = num(v.peso), g = num(v.grau); if (!p || !g) return null; const def = p * g * 10; const h = hollidaySegar(p);
        return { resultados: [{ label: 'Déficit estimado', valor: f(def, 0), unidade: 'mL', destaque: true }, { label: 'Déficit + manutenção 24 h', valor: f(def + h.dia, 0), unidade: 'mL' }],
          formula: `Déficit (mL) = peso (kg) × % desidratação × 10 = ${f(p)} × ${g} × 10 = ${f(def, 0)} mL`, alertas: ['Em desidratação grave com choque, iniciar expansão rápida (plano C) antes de calcular reposição lenta.'], fontes: ['SBP – Departamento de Nefrologia; OMS'] };
      }
    },
    {
      id: 'reidratacao', nome: 'Reposição da desidratação (planos A/B/C)', icone: '🥤', grupo: 'Fluidos',
      descricao: 'Volumes de SRO (plano B) e expansão venosa (plano C) conforme MS/OMS.',
      campos: [PESO, IDADE_M, { id: 'plano', label: 'Plano', tipo: 'select', opcoes: [['B', 'Plano B – SRO na unidade'], ['C', 'Plano C – hidratação venosa']] }],
      calc(v) {
        const p = num(v.peso), m = num(v.idadeMeses); if (!p) return null;
        if (v.plano === 'B') {
          return { resultados: [{ label: 'SRO em 4 h (50–100 mL/kg)', valor: `${f(p * 50, 0)} – ${f(p * 100, 0)}`, unidade: 'mL', destaque: true }, { label: 'Oferta por hora', valor: `${f(p * 12.5, 0)} – ${f(p * 25, 0)}`, unidade: 'mL/h' }],
            formula: `SRO = 50 a 100 mL/kg em 4 h → ${f(p)} kg × 50–100`, alertas: ['Reavaliar a cada 1–2 h; se vômitos persistentes, considerar sonda nasogástrica ou ondansetrona; se piora, passar ao plano C.'], fontes: ['Manejo do paciente com diarreia – MS/OMS; AIDPI'] };
        }
        const lt1 = m != null && m < 12;
        const fase1 = p * 30, fase2 = p * 70;
        return { resultados: [{ label: 'Fase 1: 30 mL/kg', valor: f(fase1, 0), unidade: lt1 ? 'mL em 1 h' : 'mL em 30 min', destaque: true }, { label: 'Fase 2: 70 mL/kg', valor: f(fase2, 0), unidade: lt1 ? 'mL em 5 h' : 'mL em 2 h 30 min', destaque: true }, { label: 'Total 100 mL/kg', valor: f(p * 100, 0), unidade: 'mL' }],
          formula: `SF 0,9 % ou Ringer lactato: 100 mL/kg → ${f(p)} kg\n< 1 ano: 30 mL/kg em 1 h + 70 mL/kg em 5 h\n≥ 1 ano: 30 mL/kg em 30 min + 70 mL/kg em 2,5 h`, alertas: ['Se choque: bolus 20 mL/kg rápido e reavaliar; iniciar SRO assim que possível.'], fontes: ['Manejo do paciente com diarreia – MS/OMS 2023; AIDPI'] };
      }
    },
    {
      id: 'infusao', nome: 'Taxa de infusão', icone: '⏱️', grupo: 'Fluidos',
      descricao: 'Converte volume e tempo em mL/h, e dose em mcg/kg/min em mL/h.',
      campos: [PESO, { id: 'volume', label: 'Volume (mL)', tipo: 'number' }, { id: 'tempoH', label: 'Tempo (h)', tipo: 'number', step: '0.25' },
        { id: 'mcgkgmin', label: 'Ou: dose em mcg/kg/min', tipo: 'number', step: '0.01' }, { id: 'concMgMl', label: 'Concentração da solução (mg/mL)', tipo: 'number', step: '0.001' }],
      calc(v) {
        const p = num(v.peso), vol = num(v.volume), t = num(v.tempoH), d = num(v.mcgkgmin), c = num(v.concMgMl);
        const res = []; let formula = '';
        if (vol && t) { res.push({ label: 'Taxa', valor: f(vol / t, 1), unidade: 'mL/h', destaque: true }); formula += `Taxa = ${f(vol)} mL ÷ ${f(t)} h = ${f(vol / t, 1)} mL/h\n`; }
        if (p && d != null && c) { const mlh = (d * p * 60) / (c * 1000); res.push({ label: 'Infusão contínua', valor: f(mlh, 2), unidade: 'mL/h', destaque: true }); formula += `mL/h = (mcg/kg/min × peso × 60) ÷ (mg/mL × 1000) = (${f(d)} × ${f(p)} × 60) ÷ (${f(c, 3)} × 1000) = ${f(mlh, 2)} mL/h`; }
        if (!res.length) return null;
        return { resultados: res, formula, fontes: ['Cálculo aritmético padrão'] };
      }
    },
    {
      id: 'gotejamento', nome: 'Gotejamento', icone: '💦', grupo: 'Fluidos',
      descricao: 'Gotas/min e microgotas/min a partir de volume e tempo.',
      campos: [{ id: 'volume', label: 'Volume (mL)', tipo: 'number' }, { id: 'tempoH', label: 'Tempo (h)', tipo: 'number', step: '0.25' }, { id: 'equipo', label: 'Equipo', tipo: 'select', opcoes: [['20', 'Macrogotas (20 gts/mL)'], ['60', 'Microgotas (60 mgts/mL)']] }],
      calc(v) {
        const vol = num(v.volume), t = num(v.tempoH), e = num(v.equipo) || 20; if (!vol || !t) return null;
        const gpm = (vol * e) / (t * 60);
        return { resultados: [{ label: e === 60 ? 'Microgotas/min' : 'Gotas/min', valor: f(gpm, 0), unidade: e === 60 ? 'mgts/min' : 'gts/min', destaque: true }, { label: 'mL/h', valor: f(vol / t, 1), unidade: 'mL/h' }],
          formula: `${e === 60 ? 'mgts' : 'gts'}/min = (volume × ${e}) ÷ (tempo em min) = (${f(vol)} × ${e}) ÷ ${f(t * 60)} = ${f(gpm, 0)}`, fontes: ['Cálculo aritmético padrão'] };
      }
    },
    {
      id: 'glasgow', nome: 'Glasgow pediátrico', icone: '🧠', grupo: 'Escores',
      descricao: 'Escala de coma de Glasgow adaptada (abertura ocular, resposta verbal, resposta motora).',
      campos: [
        { id: 'ao', label: 'Abertura ocular', tipo: 'select', opcoes: [['4', '4 – Espontânea'], ['3', '3 – Ao estímulo verbal'], ['2', '2 – À dor'], ['1', '1 – Ausente']] },
        { id: 'rv', label: 'Resposta verbal (< 2 anos: balbucio/choro)', tipo: 'select', opcoes: [['5', '5 – Orientada / balbucia, sorri'], ['4', '4 – Confusa / choro consolável'], ['3', '3 – Palavras inapropriadas / choro persistente'], ['2', '2 – Sons incompreensíveis / gemidos'], ['1', '1 – Ausente']] },
        { id: 'rm', label: 'Resposta motora', tipo: 'select', opcoes: [['6', '6 – Obedece / movimentos espontâneos'], ['5', '5 – Localiza dor / retira ao toque'], ['4', '4 – Retirada à dor'], ['3', '3 – Flexão anormal (decorticação)'], ['2', '2 – Extensão anormal (descerebração)'], ['1', '1 – Ausente']] }],
      calc(v) {
        const a = num(v.ao), b = num(v.rv), c = num(v.rm); if (a == null || b == null || c == null) return null; const t = a + b + c;
        const cls = t <= 8 ? 'Grave (≤ 8): considerar proteção de via aérea' : t <= 12 ? 'Moderado (9–12)' : 'Leve (13–15)';
        return { resultados: [{ label: 'Glasgow', valor: `${t}`, unidade: '/15', destaque: true }, { label: 'Interpretação', valor: cls, unidade: '' }], formula: `AO ${a} + RV ${b} + RM ${c} = ${t}`, alertas: t <= 8 ? ['Glasgow ≤ 8: avaliar intubação e suporte avançado.'] : [], fontes: ['PALS/AHA 2020; SBP'] };
      }
    },
    {
      id: 'pews', nome: 'PEWS (alerta precoce pediátrico)', icone: '🚨', grupo: 'Escores',
      descricao: 'Pediatric Early Warning Score (Brighton) – comportamento, cardiovascular, respiratório.',
      campos: [
        { id: 'comp', label: 'Comportamento', tipo: 'select', opcoes: [['0', '0 – Brincando/adequado'], ['1', '1 – Sonolento'], ['2', '2 – Irritado'], ['3', '3 – Letárgico/confuso ou resposta reduzida à dor']] },
        { id: 'cv', label: 'Cardiovascular', tipo: 'select', opcoes: [['0', '0 – Corado, TEC 1–2 s'], ['1', '1 – Pálido ou TEC 3 s'], ['2', '2 – Acinzentado ou TEC 4 s ou FC > 20 acima do normal'], ['3', '3 – Cianótico/moteado ou TEC ≥ 5 s ou FC > 30 acima do normal ou bradicardia']] },
        { id: 'resp', label: 'Respiratório', tipo: 'select', opcoes: [['0', '0 – Normal, sem retrações'], ['1', '1 – FR > 10 acima do normal, uso de musculatura acessória, O2 30 % ou 3 L/min'], ['2', '2 – FR > 20 acima do normal, retrações, O2 40 % ou 6 L/min'], ['3', '3 – FR ≥ 5 abaixo do normal com retrações/gemência, O2 50 % ou 8 L/min']] },
        { id: 'extra', label: 'Nebulização a cada 15 min ou vômitos persistentes pós-cirurgia (+2)', tipo: 'select', opcoes: [['0', 'Não'], ['2', 'Sim (+2)']] }],
      calc(v) {
        const t = (num(v.comp) || 0) + (num(v.cv) || 0) + (num(v.resp) || 0) + (num(v.extra) || 0);
        const cls = t >= 5 ? 'Alto risco: avaliação médica imediata / considerar UTI' : t >= 3 ? 'Risco intermediário: reavaliar em 30 min e comunicar equipe' : 'Baixo risco: manter monitorização';
        return { resultados: [{ label: 'PEWS', valor: `${t}`, unidade: '', destaque: true }, { label: 'Interpretação', valor: cls, unidade: '' }], formula: 'Soma dos domínios (0–3 cada) + extras', alertas: t >= 5 ? ['Escore ≥ 5 ou 3 em um único domínio: acionar equipe de resposta rápida.'] : [], fontes: ['Monaghan A. Brighton PEWS 2005; adaptado SBP'] };
      }
    },
    {
      id: 'sinaisvitais', nome: 'PA, FC e FR por idade', icone: '❤️', grupo: 'Escores',
      descricao: 'Faixas de referência por idade e PA sistólica mínima (limite de hipotensão).',
      campos: [IDADE_M, { id: 'fc', label: 'FC medida (bpm)', tipo: 'number' }, { id: 'fr', label: 'FR medida (irpm)', tipo: 'number' }, { id: 'pas', label: 'PAS medida (mmHg)', tipo: 'number' }],
      calc(v) {
        const m = num(v.idadeMeses); if (m == null) return null; const fx = sinaisVitaisFaixa(m); const min = paMinima(m); const al = [];
        const res = [{ label: 'PAS mínima aceitável (hipotensão se abaixo)', valor: `${min}`, unidade: 'mmHg', destaque: true }];
        if (fx) { res.push({ label: `FC normal (${fx.faixa})`, valor: `${fx.fc[0]}–${fx.fc[1]}`, unidade: 'bpm' }, { label: 'FR normal', valor: `${fx.fr[0]}–${fx.fr[1]}`, unidade: 'irpm' }, { label: 'PAS normal', valor: `${fx.pas[0]}–${fx.pas[1]}`, unidade: 'mmHg' });
          const fc = num(v.fc), fr = num(v.fr), pas = num(v.pas);
          if (fc != null && (fc < fx.fc[0] || fc > fx.fc[1])) al.push(`FC ${fc} bpm fora da faixa (${fx.fc[0]}–${fx.fc[1]}).`);
          if (fr != null && (fr < fx.fr[0] || fr > fx.fr[1])) al.push(`FR ${fr} irpm fora da faixa (${fx.fr[0]}–${fx.fr[1]}).`);
          if (pas != null && pas < min) al.push(`PAS ${pas} mmHg abaixo do limite de hipotensão (${min}): avaliar choque.`); }
        return { resultados: res, alertas: al, formula: 'PAS mínima: RN 60; 1–12 m 70; 1–10 a 70 + 2 × idade (anos); ≥ 10 a 90 mmHg', fontes: ['PALS/AHA 2020'] };
      }
    },
    {
      id: 'sodio', nome: 'Correção de sódio', icone: '🧂', grupo: 'Eletrólitos',
      descricao: 'Déficit de sódio na hiponatremia e variação esperada por litro de solução (Adrogué-Madias).',
      campos: [PESO, { id: 'naAtual', label: 'Na atual (mEq/L)', tipo: 'number' }, { id: 'naDesejado', label: 'Na desejado (mEq/L)', tipo: 'number', placeholder: 'ex.: 125' }, { id: 'sol', label: 'Solução', tipo: 'select', opcoes: [['513', 'NaCl 3 % (513 mEq/L)'], ['154', 'SF 0,9 % (154 mEq/L)'], ['130', 'Ringer lactato (130 mEq/L)']] }],
      calc(v) {
        const p = num(v.peso), na = num(v.naAtual), nd = num(v.naDesejado), s = num(v.sol) || 513; if (!p || na == null) return null;
        const act = 0.6 * p; const res = []; let formula = `Água corporal total = 0,6 × ${f(p)} = ${f(act, 1)} L\n`;
        if (nd != null) { const def = act * (nd - na); res.push({ label: 'Déficit de sódio', valor: f(def, 0), unidade: 'mEq', destaque: true }); formula += `Déficit Na = ACT × (Na desejado − Na atual) = ${f(act, 1)} × (${nd} − ${na}) = ${f(def, 0)} mEq\n`; if (s === 513) { res.push({ label: 'Volume de NaCl 3 %', valor: f(def / 0.513, 0), unidade: 'mL' }); formula += `NaCl 3 % = ${f(def, 0)} ÷ 0,513 mEq/mL = ${f(def / 0.513, 0)} mL\n`; } }
        const delta = (s - na) / (act + 1); res.push({ label: 'Variação do Na por 1 L da solução', valor: f(delta, 1), unidade: 'mEq/L' }); formula += `ΔNa/L = (Na solução − Na sérico) ÷ (ACT + 1) = (${s} − ${na}) ÷ (${f(act, 1)} + 1) = ${f(delta, 1)}`;
        return { resultados: res, formula, alertas: ['Limitar correção a 8–10 mEq/L em 24 h (risco de desmielinização osmótica). Sintomático agudo: NaCl 3 % 3–5 mL/kg em 10–15 min, repetir conforme protocolo.', 'Em hipernatremia, reduzir Na no máximo 10–12 mEq/L/24 h.'], fontes: ['Adrogué HJ, Madias NE. N Engl J Med 2000; SBP'] };
      }
    },
    {
      id: 'calcio', nome: 'Correção de cálcio', icone: '🦴', grupo: 'Eletrólitos',
      descricao: 'Cálcio corrigido pela albumina e reposição de gluconato de cálcio 10 %.',
      campos: [PESO, { id: 'ca', label: 'Cálcio total (mg/dL)', tipo: 'number', step: '0.1' }, { id: 'alb', label: 'Albumina (g/dL)', tipo: 'number', step: '0.1' }],
      calc(v) {
        const p = num(v.peso), ca = num(v.ca), alb = num(v.alb); if (ca == null) return null; const res = []; let formula = '';
        if (alb != null) { const cc = ca + 0.8 * (4 - alb); res.push({ label: 'Cálcio corrigido', valor: f(cc, 1), unidade: 'mg/dL', destaque: true }); formula += `Ca corrigido = ${f(ca, 1)} + 0,8 × (4 − ${f(alb, 1)}) = ${f(cc, 1)} mg/dL\n`; }
        if (p) { res.push({ label: 'Gluconato de cálcio 10 % (hipocalcemia sintomática)', valor: `${f(p * 0.5, 1)} – ${f(p * 1, 1)}`, unidade: 'mL IV lento (0,5–1 mL/kg; máx. 20 mL)' }); formula += `Gluconato Ca 10 %: 0,5–1 mL/kg (50–100 mg/kg) IV em 5–10 min com monitorização cardíaca`; }
        return { resultados: res, formula, alertas: ['Infundir lentamente com monitorização; extravasamento causa necrose. Confirmar dose no protocolo institucional.'], fontes: ['Nelson Textbook of Pediatrics; SBP'] };
      }
    },
    {
      id: 'osmolaridade', nome: 'Osmolaridade sérica', icone: '🧪', grupo: 'Eletrólitos',
      descricao: 'Osmolaridade calculada e gap osmolar (se medida disponível).',
      campos: [{ id: 'na', label: 'Na (mEq/L)', tipo: 'number' }, { id: 'gli', label: 'Glicose (mg/dL)', tipo: 'number' }, { id: 'ureia', label: 'Ureia (mg/dL)', tipo: 'number' }, { id: 'osmMed', label: 'Osmolaridade medida (opcional)', tipo: 'number' }],
      calc(v) {
        const na = num(v.na), g = num(v.gli), u = num(v.ureia); if (na == null || g == null || u == null) return null; const osm = 2 * na + g / 18 + u / 6; const res = [{ label: 'Osmolaridade calculada', valor: f(osm, 0), unidade: 'mOsm/kg', destaque: true }]; const m = num(v.osmMed); if (m != null) res.push({ label: 'Gap osmolar', valor: f(m - osm, 0), unidade: 'mOsm/kg (normal < 10)' });
        return { resultados: res, formula: `Osm = 2 × Na + glicose/18 + ureia/6 = 2 × ${na} + ${g}/18 + ${u}/6 = ${f(osm, 0)}`, fontes: ['Fórmula padrão (ureia em mg/dL)'] };
      }
    },
    {
      id: 'clearance', nome: 'Clearance estimado (Schwartz)', icone: '🫘', grupo: 'Eletrólitos',
      descricao: 'Taxa de filtração glomerular estimada pela equação de Schwartz revisada (bedside 2009).',
      campos: [ALTURA, { id: 'creat', label: 'Creatinina sérica (mg/dL)', tipo: 'number', step: '0.01' }],
      calc(v) {
        const a = num(v.altura), c = num(v.creat); const tfg = schwartz(a, c); if (tfg == null) return null; const al = [];
        if (tfg < 60) al.push('TFGe < 60 mL/min/1,73 m²: avaliar ajuste renal de medicamentos.');
        return { resultados: [{ label: 'TFG estimada', valor: f(tfg, 0), unidade: 'mL/min/1,73 m²', destaque: true }], formula: `TFGe = 0,413 × altura (cm) ÷ creatinina = 0,413 × ${f(a)} ÷ ${f(c, 2)} = ${f(tfg, 0)}`, alertas: al.concat(['Válida para 1–18 anos com creatinina por método enzimático rastreável (IDMS).']), fontes: ['Schwartz GJ et al. J Am Soc Nephrol 2009'] };
      }
    },
    {
      id: 'tubo', nome: 'Tubo traqueal e materiais por idade', icone: '🩺', grupo: 'Emergência',
      descricao: 'Estimativa do diâmetro do tubo, profundidade e peso por idade.',
      campos: [IDADE_M, PESO],
      calc(v) {
        const m = num(v.idadeMeses); if (m == null) return null; const anos = m / 12; const semCuff = anos < 1 ? 3.5 : (anos / 4) + 4; const comCuff = anos < 1 ? 3.0 : (anos / 4) + 3.5; const prof = semCuff * 3; const pe = PED.util.pesoEstimado(m);
        const res = [{ label: 'Tubo sem cuff (DI)', valor: f(semCuff, 1), unidade: 'mm', destaque: true }, { label: 'Tubo com cuff (DI)', valor: f(comCuff, 1), unidade: 'mm' }, { label: 'Profundidade (rima labial)', valor: f(prof, 0), unidade: 'cm' }];
        if (pe) res.push({ label: 'Peso estimado por idade', valor: f(pe, 1), unidade: 'kg (usar peso real quando disponível)' });
        return { resultados: res, formula: 'Sem cuff = idade/4 + 4; com cuff = idade/4 + 3,5; profundidade = 3 × DI\n(< 1 ano: 3,0–3,5 mm; RN a termo 3,0–3,5; prematuro 2,5)', fontes: ['PALS/AHA 2020'] };
      }
    }
  ];

  return { calculadoras, hollidaySegar, schwartz, paMinima, sinaisVitaisFaixa, percentilAprox, linhaCurva };
})();
