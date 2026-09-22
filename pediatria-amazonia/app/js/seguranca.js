/* Segurança da prescrição – Mucurinha
   Converte em alerta automático o que hoje só existe como texto nas bases:
   1. faixa etária e de peso de cada esquema posológico;
   2. alergia do cadastro comparada por classe e princípio ativo, com reatividade cruzada;
   3. conferência da prescrição: duplicidade, soma da dose diária e cruzamento com medicamentos em uso.
   Nenhum alerta substitui a conferência da médica: são apoios à decisão. */
window.PED = window.PED || {};
PED.seguranca = (function () {
  const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const f = (n) => (PED.util ? PED.util.fmt(n) : n);

  /* ---------- 1. Faixa etária e de peso ---------- */
  const MES = { dia: 1 / 30.44, dias: 1 / 30.44, semana: 7 / 30.44, semanas: 7 / 30.44, mes: 1, mes_: 1, meses: 1, ano: 12, anos: 12 };
  const unidade = (u) => MES[norm(u).replace('ê', 'e').replace('í', 'i')] || (norm(u).startsWith('me') ? 1 : norm(u).startsWith('an') ? 12 : norm(u).startsWith('se') ? 7 / 30.44 : norm(u).startsWith('di') ? 1 / 30.44 : null);

  /** Extrai limites numéricos de uma expressão como ">= 6 meses e >= 5 kg" ou "3 a 24 meses". */
  function parseFaixa(txt) {
    if (!txt) return null;
    const base = norm(txt).split('(')[0];                       // ignora exceções entre parênteses
    if (/todas as idades/.test(base)) return null;
    const r = { minMeses: null, maxMeses: null, minPeso: null, maxPeso: null, texto: String(txt).split('(')[0].trim() };
    if (/^\s*neonatos?\b/.test(base)) { r.maxMeses = 1; return r; }
    let achou = false;
    // intervalo "3 a 24 meses"
    const inter = base.match(/(\d+[.,]?\d*)\s*a\s*(\d+[.,]?\d*)\s*(dias?|semanas?|mes(?:es)?|anos?)/);
    if (inter) { const u = unidade(inter[3]); r.minMeses = parseFloat(inter[1].replace(',', '.')) * u; r.maxMeses = parseFloat(inter[2].replace(',', '.')) * u; achou = true; }
    // limites de idade
    for (const m of base.matchAll(/(>=|>|<=|<)\s*(\d+[.,]?\d*)\s*(dias?|semanas?|mes(?:es)?|anos?)/g)) {
      const v = parseFloat(m[2].replace(',', '.')) * unidade(m[3]); achou = true;
      if (m[1] === '>' || m[1] === '>=') r.minMeses = Math.max(r.minMeses == null ? -Infinity : r.minMeses, v);
      else r.maxMeses = Math.min(r.maxMeses == null ? Infinity : r.maxMeses, v);
    }
    // limites de peso
    for (const m of base.matchAll(/(>=|>|<=|<)\s*(\d+[.,]?\d*)\s*kg/g)) {
      const v = parseFloat(m[2].replace(',', '.')); achou = true;
      if (m[1] === '>' || m[1] === '>=') r.minPeso = Math.max(r.minPeso == null ? -Infinity : r.minPeso, v);
      else r.maxPeso = Math.min(r.maxPeso == null ? Infinity : r.maxPeso, v);
    }
    [r.minMeses, r.maxMeses, r.minPeso, r.maxPeso].forEach(() => {});
    if (r.minMeses === -Infinity) r.minMeses = null; if (r.maxMeses === Infinity) r.maxMeses = null;
    if (r.minPeso === -Infinity) r.minPeso = null; if (r.maxPeso === Infinity) r.maxPeso = null;
    return achou ? r : null;
  }

  const rotuloIdade = (meses) => meses == null ? '' : meses < 1 ? Math.round(meses * 30.44) + ' dias' : meses < 24 ? f(meses) + ' meses' : f(meses / 12) + ' anos';

  /** Avalia um esquema posológico contra idade (meses) e peso (kg) do paciente. */
  function checarEsquema(dose, idadeMeses, peso) {
    const alertas = [];
    const fontes = [dose && dose.faixaEtaria, dose && dose.faixasPeso, dose && dose.faixasIdade].filter(Boolean);
    for (const txt of fontes) {
      const r = parseFaixa(txt); if (!r) continue;
      if (idadeMeses != null && r.minMeses != null && idadeMeses < r.minMeses)
        alertas.push({ nivel: 'bloqueio', texto: `Paciente com ${rotuloIdade(idadeMeses)}; este esquema é indicado a partir de ${rotuloIdade(r.minMeses)}. Confirmar alternativa no protocolo antes de prescrever.` });
      if (idadeMeses != null && r.maxMeses != null && idadeMeses > r.maxMeses)
        alertas.push({ nivel: 'atencao', texto: `Paciente com ${rotuloIdade(idadeMeses)}; este esquema é descrito para até ${rotuloIdade(r.maxMeses)}. Conferir dose da faixa etária correta.` });
      if (peso != null && r.minPeso != null && peso < r.minPeso)
        alertas.push({ nivel: 'bloqueio', texto: `Peso ${f(peso)} kg abaixo do mínimo do esquema (${f(r.minPeso)} kg). Confirmar alternativa no protocolo.` });
      if (peso != null && r.maxPeso != null && peso > r.maxPeso)
        alertas.push({ nivel: 'atencao', texto: `Peso ${f(peso)} kg acima da faixa descrita (${f(r.maxPeso)} kg). Conferir a faixa correta.` });
    }
    // contraindicações que mencionam idade
    return alertas;
  }

  /** Contraindicações do medicamento que citam idade e podem se aplicar ao paciente. */
  function checarContraindicacoes(med, idadeMeses) {
    if (idadeMeses == null || !med || !med.contraindicacoes) return [];
    const out = [];
    for (const c of med.contraindicacoes) {
      const b = norm(c);
      // restrições dirigidas à mãe (gestante, lactante, nutriz) não se aplicam ao paciente pediátrico
      if (/gestante|lactante|nutriz|gravid|amamenta|puerper/.test(b)) continue;
      if (!/(menor|abaixo|<|inferior a|ate)\s*.{0,12}(dia|semana|mes|ano)/.test(b)) continue;
      const m = b.match(/(\d+[.,]?\d*)\s*(dias?|semanas?|mes(?:es)?|anos?)/);
      if (!m) continue;
      const lim = parseFloat(m[1].replace(',', '.')) * unidade(m[2]);
      if (idadeMeses < lim) out.push({ nivel: 'bloqueio', texto: 'Contraindicação por idade: ' + c });
    }
    return out;
  }

  /* ---------- 2. Alergia por classe e princípio ativo ---------- */
  // Grupos derivados do campo `classe` das bases.
  const GRUPOS = [
    { id: 'penicilina', rotulo: 'penicilinas', classe: /penicilina|aminopenicilina/, cruzado: [{ id: 'cefalosporina', nivel: 'atencao', nota: 'reatividade cruzada entre penicilinas e cefalosporinas é possível, maior com cefalosporinas de 1ª geração' }] },
    { id: 'cefalosporina', rotulo: 'cefalosporinas', classe: /cefalosporina/, cruzado: [{ id: 'penicilina', nivel: 'atencao', nota: 'reatividade cruzada com penicilinas é possível' }] },
    { id: 'sulfa', rotulo: 'sulfas', classe: /sulfonamida|sulfona/, cruzado: [] },
    { id: 'macrolideo', rotulo: 'macrolídeos', classe: /macrolideo|azalideo/, cruzado: [] },
    { id: 'aine', rotulo: 'anti-inflamatórios não esteroidais', classe: /nao esteroidal|aine/, cruzado: [{ id: 'pirazolona', nivel: 'atencao', nota: 'pacientes com reação a AINE podem reagir a dipirona' }] },
    { id: 'pirazolona', rotulo: 'pirazolonas (dipirona)', classe: /pirazolona/, cruzado: [{ id: 'aine', nivel: 'atencao', nota: 'possível reatividade cruzada com AINEs' }] },
    { id: 'aminoglicosideo', rotulo: 'aminoglicosídeos', classe: /aminoglicosideo/, cruzado: [] },
    { id: 'glicopeptideo', rotulo: 'glicopeptídeos', classe: /glicopeptideo/, cruzado: [] },
    { id: 'tetraciclina', rotulo: 'tetraciclinas', classe: /tetraciclina/, cruzado: [] },
    { id: 'nitroimidazol', rotulo: 'nitroimidazóis', classe: /nitroimidazol/, cruzado: [] },
    { id: 'nitrofurano', rotulo: 'nitrofuranos', classe: /nitrofurano/, cruzado: [] },
    { id: 'quinolina', rotulo: 'antimaláricos aminoquinolínicos', classe: /aminoquinolina/, cruzado: [] },
    { id: 'soro_heterologo', rotulo: 'soros heterólogos', classe: /soro heterologo|imunoglobulina equina/, cruzado: [] },
    { id: 'corticoide', rotulo: 'corticoides', classe: /corticoide/, cruzado: [] },
    { id: 'benzodiazepinico', rotulo: 'benzodiazepínicos', classe: /benzodiazepinico/, cruzado: [] },
  ];
  // Como a alergia costuma ser escrita pela família ou pela própria paciente.
  const SINONIMOS = {
    penicilina: ['penicilina', 'penicilinas', 'amoxicilina', 'amoxacilina', 'ampicilina', 'benzetacil', 'benzilpenicilina', 'oxacilina', 'clavulin', 'amoxil', 'betalactamico', 'beta-lactamico'],
    cefalosporina: ['cefalosporina', 'cefalexina', 'ceftriaxona', 'cefotaxima', 'cefaclor', 'keflex', 'rocefin'],
    sulfa: ['sulfa', 'sulfas', 'sulfametoxazol', 'bactrim', 'trimetoprima', 'dapsona'],
    macrolideo: ['macrolideo', 'azitromicina', 'eritromicina', 'claritromicina', 'zitromax'],
    aine: ['aine', 'anti-inflamatorio', 'antiinflamatorio', 'ibuprofeno', 'aas', 'aspirina', 'acido acetilsalicilico', 'diclofenaco', 'nimesulida', 'cetoprofeno'],
    pirazolona: ['dipirona', 'novalgina', 'metamizol', 'pirazolona'],
    aminoglicosideo: ['gentamicina', 'amicacina', 'aminoglicosideo', 'neomicina'],
    glicopeptideo: ['vancomicina', 'glicopeptideo'],
    tetraciclina: ['tetraciclina', 'doxiciclina'],
    nitroimidazol: ['metronidazol', 'flagyl', 'benznidazol', 'nitroimidazol'],
    nitrofurano: ['nitrofurantoina', 'macrodantina'],
    quinolina: ['cloroquina', 'primaquina', 'quinina'],
    soro_heterologo: ['soro antiofidico', 'soro heterologo', 'soro equino', 'soro antiveneno', 'soro anti-ofidico'],
    corticoide: ['corticoide', 'prednisolona', 'prednisona', 'dexametasona', 'hidrocortisona'],
    benzodiazepinico: ['diazepam', 'midazolam', 'benzodiazepinico'],
  };

  const grupoDoMedicamento = (med) => {
    const c = norm(med && med.classe);
    const g = GRUPOS.find(x => x.classe.test(c));
    return g || null;
  };

  /** Grupos citados no texto livre de alergias do cadastro. */
  function gruposDaAlergia(texto) {
    const t = norm(texto); if (!t) return [];
    const out = [];
    for (const [g, palavras] of Object.entries(SINONIMOS)) if (palavras.some(p => t.includes(p))) out.push(g);
    return out;
  }

  /** Alertas de alergia para um medicamento, dado o texto de alergias do paciente. */
  function checarAlergia(med, textoAlergias) {
    if (!med || !textoAlergias) return [];
    const t = norm(textoAlergias);
    const alertas = [];
    // nome do próprio princípio ativo citado
    const nomeBase = norm(med.nome).split(/[\s(]/)[0];
    if (nomeBase.length > 4 && t.includes(nomeBase))
      alertas.push({ nivel: 'bloqueio', texto: `Alergia registrada ao próprio medicamento: "${textoAlergias}". Não prescrever sem reavaliação.` });
    const grupoMed = grupoDoMedicamento(med);
    if (grupoMed) {
      const grupos = gruposDaAlergia(textoAlergias);
      if (grupos.includes(grupoMed.id) && !alertas.length)
        alertas.push({ nivel: 'bloqueio', texto: `Alergia registrada a ${grupoMed.rotulo}: "${textoAlergias}". Este medicamento pertence a essa classe.` });
      for (const cr of grupoMed.cruzado)
        if (grupos.includes(cr.id) && !alertas.some(a => a.nivel === 'bloqueio'))
          alertas.push({ nivel: cr.nivel, texto: `Alergia registrada em classe relacionada: "${textoAlergias}". Atenção: ${cr.nota}.` });
    }
    return alertas;
  }

  /* ---------- 3. Conferência da prescrição ---------- */
  const ANTIMICROBIANO = /antibiotico|antimicrobiano|antifungico|antimicobacteriano/;
  const ehAntimicrobiano = (med) => !!med && ANTIMICROBIANO.test(norm(med.classe));

  /** Identifica o princípio ativo de um item pelo medId ou pelo nome escrito. */
  function medDoItem(item) {
    const meds = (PED.data && PED.data.medicamentos) || [];
    if (item.medId) return meds.find(m => m.id === item.medId) || null;
    const n = norm(item.medicamento).split(/[\s(]/)[0];
    if (n.length < 4) return null;
    return meds.find(m => norm(m.nome).startsWith(n)) || null;
  }

  /** Confere a prescrição inteira. Devolve lista de alertas. */
  function conferirPrescricao(itens, paciente) {
    const alertas = [];
    const idade = paciente && paciente.dataNascimento && PED.util ? PED.util.idade(paciente.dataNascimento) : null;
    const idadeMeses = idade ? idade.totalMeses : null;
    const peso = paciente && paciente.peso ? Number(paciente.peso) : null;
    const vistos = new Map();

    (itens || []).forEach((item, i) => {
      const med = medDoItem(item);
      const rotulo = item.medicamento || '(item ' + (i + 1) + ')';
      // duplicidade de princípio ativo
      const chave = med ? med.id : norm(item.medicamento);
      if (chave) {
        if (vistos.has(chave)) alertas.push({ nivel: 'atencao', item: i, texto: `${rotulo} aparece mais de uma vez na prescrição. Conferir se é intencional e somar a dose diária total.` });
        else vistos.set(chave, i);
      }
      if (!med) return;
      // alergia
      if (paciente && paciente.alergias) checarAlergia(med, paciente.alergias).forEach(a => alertas.push(Object.assign({ item: i }, a, { texto: rotulo + ': ' + a.texto })));
      // faixa etária e peso, a partir do esquema gravado no item
      const esquema = (med.doses || []).find(d => item.intervalo && d.frequencia === item.intervalo) || (med.doses || [])[0];
      if (esquema) checarEsquema(esquema, idadeMeses, peso).forEach(a => alertas.push(Object.assign({ item: i }, a, { texto: rotulo + ': ' + a.texto })));
      checarContraindicacoes(med, idadeMeses).forEach(a => alertas.push(Object.assign({ item: i }, a, { texto: rotulo + ': ' + a.texto })));
      // cruzamento com medicamentos em uso
      if (paciente && paciente.medicamentosUso) {
        const uso = norm(paciente.medicamentosUso);
        const nb = norm(med.nome).split(/[\s(]/)[0];
        if (nb.length > 4 && uso.includes(nb)) alertas.push({ nivel: 'atencao', item: i, texto: `${rotulo} já consta em "medicamentos em uso" do cadastro. Conferir duplicidade e dose diária total.` });
        const g = grupoDoMedicamento(med);
        if (g && gruposDaAlergia(paciente.medicamentosUso).includes(g.id) && !(nb.length > 4 && uso.includes(nb)))
          alertas.push({ nivel: 'atencao', item: i, texto: `${rotulo} pertence à mesma classe (${g.rotulo}) de um medicamento em uso. Conferir sobreposição.` });
        // interações declaradas na base
        for (const inter of med.interacoes || []) {
          const alvo = norm(inter).match(/[a-z]{5,}/g) || [];
          if (alvo.some(p => uso.includes(p) && p.length > 6)) { alertas.push({ nivel: 'atencao', item: i, texto: `${rotulo}: possível interação com medicamento em uso. ${inter}` }); break; }
        }
      }
      if (ehAntimicrobiano(med)) alertas.push({ nivel: 'info', item: i, texto: `${rotulo} é antimicrobiano: a receita exige duas vias, conforme a RDC 20/2011 (uma retida na farmácia).` });
    });
    return alertas;
  }

  const temAntimicrobiano = (itens) => (itens || []).some(i => ehAntimicrobiano(medDoItem(i)));

  return { parseFaixa, checarEsquema, checarContraindicacoes, checarAlergia, gruposDaAlergia, grupoDoMedicamento, conferirPrescricao, temAntimicrobiano, ehAntimicrobiano, medDoItem, rotuloIdade };
})();
