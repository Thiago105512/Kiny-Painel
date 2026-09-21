var PED = window.PED = window.PED || {}; PED.data = PED.data || {};
// Dados de medicamentos – Pediatria Amazônia
// Contrato: ver CONTRATO.md (PED.data.medicamentos). O "var PED" torna o arquivo carregável também em Node (validação); no navegador equivale a window.PED.
// Regras: doses somente de fontes amplamente documentadas (MS, SBP, OMS, PALS/AHA, bulas ANVISA, Harriet Lane / Lexicomp).
// Campos extras: mlKgDose (mL/kg), unidade ('mg' padrão, 'UI', 'jatos', 'comprimidos'), doseFixa (texto), faixasPeso/faixasIdade (texto), verificar (por dose).
// Apoio à decisão: sempre confirmar conforme protocolo/bula vigente antes de prescrever.
PED.data.medicamentos = [

  // ===================== ANTIMALÁRICOS =====================
  {
    id: 'artemeter_lumefantrina',
    nome: 'Artemeter + lumefantrina',
    classe: 'Antimalárico – derivado de artemisinina (ACT)',
    apresentacoes: [
      {descricao: 'Comprimido 20 mg artemeter + 120 mg lumefantrina (mg refere-se ao artemeter)', mg: 20, ml: null, tipo: 'comprimido', via: 'VO'},
      {descricao: 'Comprimido dispersível infantil 20 mg + 120 mg (mg refere-se ao artemeter)', mg: 20, ml: null, tipo: 'comprimido', via: 'VO'}
    ],
    indicacoes: ['Malária por P. falciparum não complicada', 'Malária mista (P. falciparum + P. vivax) não complicada', 'Malária por P. vivax quando cloroquina indisponível ou resistência, conforme protocolo'],
    doses: [
      {
        indicacao: 'Malária não complicada (esquema de 3 dias, 6 doses)',
        mgKgDose: null, mgKgDia: null, vezesDia: 2, frequencia: '12/12 h (0, 8, 24, 36, 48 e 60 h)', via: 'VO',
        doseMaxDose: 80, doseMaxDia: 160, duracao: '3 dias (6 doses)', faixaEtaria: '>= 6 meses e >= 5 kg',
        unidade: 'comprimidos',
        doseFixa: '1 a 4 comprimidos por dose conforme faixa de peso (ver faixasPeso), 6 doses em 3 dias',
        faixasPeso: '5 a 14 kg: 1 comprimido por dose; 15 a 24 kg: 2 comprimidos; 25 a 34 kg: 3 comprimidos; >= 35 kg: 4 comprimidos',
        obs: 'Dose por faixa de peso (1 comprimido por dose para 5 a 14 kg; 2 para 15 a 24 kg; 3 para 25 a 34 kg; 4 para >= 35 kg). Administrar com alimento ou leite para melhor absorção. Segunda dose 8 h após a primeira; depois 12/12 h. Se vômito em até 1 h, repetir a dose. Associar primaquina dose única em P. falciparum conforme protocolo do MS. Não indicado para malária grave (usar artesunato).'
      }
    ],
    diluicao: null,
    infusao: null,
    contraindicacoes: ['Hipersensibilidade', 'Primeiro trimestre de gestação (avaliar risco-benefício conforme protocolo)', 'Malária grave', 'Peso < 5 kg'],
    interacoes: ['Fármacos que prolongam QT (macrolídeos, quinolonas, antipsicóticos)', 'Indutores de CYP3A4 (rifampicina, carbamazepina, fenitoína) reduzem eficácia', 'Antirretrovirais (efavirenz, lopinavir)'],
    ajusteRenal: 'Sem ajuste em insuficiência leve a moderada; cautela em insuficiência grave.',
    ajusteHepatico: 'Cautela em hepatopatia grave; sem ajuste definido.',
    efeitosAdversos: ['Cefaleia', 'Tontura', 'Náuseas e vômitos', 'Dor abdominal', 'Prolongamento de QT (raro)', 'Tosse'],
    fontes: [{nome: 'Guia de Tratamento da Malária no Brasil – MS', ano: 2021}, {nome: 'OMS – Guidelines for Malaria', ano: 2023}, {nome: 'Bula ANVISA – Coartem', ano: 2023}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'cloroquina',
    nome: 'Cloroquina (difosfato)',
    classe: 'Antimalárico – 4-aminoquinolina',
    apresentacoes: [
      {descricao: 'Comprimido 150 mg (base)', mg: 150, ml: null, tipo: 'comprimido', via: 'VO'}
    ],
    indicacoes: ['Malária por P. vivax ou P. malariae não complicada (esquizonticida sanguíneo)', 'Profilaxia de recaída em gestantes com P. vivax (dose semanal) conforme protocolo'],
    doses: [
      {
        indicacao: 'Malária por P. vivax / P. malariae – dia 1',
        mgKgDose: 10, mgKgDia: 10, vezesDia: 1, frequencia: '1x/dia', via: 'VO',
        doseMaxDose: 600, doseMaxDia: 600, duracao: 'Dia 1', faixaEtaria: 'Todas as idades',
        obs: 'Dose em cloroquina base. Esquema total de 25 mg/kg em 3 dias (10 mg/kg no D1 e 7,5 mg/kg no D2 e D3). Administrar com alimento. Associar primaquina (se não contraindicada) para cura radical em P. vivax.'
      },
      {
        indicacao: 'Malária por P. vivax / P. malariae – dias 2 e 3',
        mgKgDose: 7.5, mgKgDia: 7.5, vezesDia: 1, frequencia: '1x/dia', via: 'VO',
        doseMaxDose: 450, doseMaxDia: 450, duracao: 'Dias 2 e 3', faixaEtaria: 'Todas as idades',
        obs: 'Dose em cloroquina base. Em menores de 6 meses e gestantes, a cloroquina é usada sem primaquina; gestantes seguem com cloroquina 5 mg/kg semanal até 3 meses após o parto conforme protocolo do MS.'
      }
    ],
    diluicao: null,
    infusao: null,
    contraindicacoes: ['Hipersensibilidade', 'Retinopatia prévia', 'Epilepsia não controlada (cautela)', 'Psoríase (cautela)'],
    interacoes: ['Fármacos que prolongam QT', 'Antiácidos reduzem absorção (separar 4 h)', 'Cimetidina aumenta níveis', 'Mefloquina (aumenta risco de convulsões)'],
    ajusteRenal: 'Reduzir dose em insuficiência renal grave (ClCr < 10 mL/min); nos esquemas curtos de 3 dias geralmente sem ajuste.',
    ajusteHepatico: 'Cautela em hepatopatia; sem ajuste definido para esquemas curtos.',
    efeitosAdversos: ['Prurido', 'Náuseas, vômitos, dor abdominal', 'Cefaleia', 'Distúrbios visuais transitórios', 'Hipotensão e arritmias em superdosagem (margem terapêutica estreita)'],
    fontes: [{nome: 'Guia de Tratamento da Malária no Brasil – MS', ano: 2021}, {nome: 'OMS – Guidelines for Malaria', ano: 2023}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'primaquina',
    nome: 'Primaquina',
    classe: 'Antimalárico – 8-aminoquinolina (hipnozoiticida / gametocitocida)',
    apresentacoes: [
      {descricao: 'Comprimido 5 mg (infantil)', mg: 5, ml: null, tipo: 'comprimido', via: 'VO'},
      {descricao: 'Comprimido 15 mg (adulto)', mg: 15, ml: null, tipo: 'comprimido', via: 'VO'}
    ],
    indicacoes: ['Cura radical de malária por P. vivax ou P. ovale (hipnozoítos)', 'Gametocitocida em P. falciparum (dose única)'],
    doses: [
      {
        indicacao: 'P. vivax – cura radical (esquema curto de 7 dias)',
        mgKgDose: 0.5, mgKgDia: 0.5, vezesDia: 1, frequencia: '1x/dia', via: 'VO',
        doseMaxDose: 30, doseMaxDia: 30, duracao: '7 dias', faixaEtaria: '>= 6 meses',
        obs: 'Dose total de 3,5 mg/kg. Alternativa: 0,25 mg/kg/dia por 14 dias (dose total igual). Contraindicada em menores de 6 meses, gestantes e lactantes de crianças menores de 6 meses. Avaliar deficiência de G6PD quando disponível; orientar sinais de hemólise (urina escura, icterícia, palidez). Administrar com alimento.'
      },
      {
        indicacao: 'P. falciparum – gametocitocida (dose única no D1)',
        mgKgDose: 0.75, mgKgDia: 0.75, vezesDia: 1, frequencia: 'Dose única', via: 'VO',
        doseMaxDose: 45, doseMaxDia: 45, duracao: 'Dose única', faixaEtaria: '>= 6 meses',
        obs: 'Administrar no primeiro dia do tratamento com artemeter+lumefantrina, conforme protocolo do MS. Mesmas contraindicações do esquema de cura radical.'
      }
    ],
    diluicao: null,
    infusao: null,
    contraindicacoes: ['Menores de 6 meses', 'Gestantes', 'Lactantes de crianças menores de 6 meses', 'Deficiência grave de G6PD', 'Doenças com tendência a granulocitopenia (LES, artrite reumatoide em atividade)'],
    interacoes: ['Outros fármacos hemolíticos ou mielotóxicos (dapsona, sulfonamidas)', 'Quinacrina'],
    ajusteRenal: 'Sem ajuste definido; cautela.',
    ajusteHepatico: 'Sem ajuste definido; cautela.',
    efeitosAdversos: ['Hemólise (grave em deficiência de G6PD)', 'Metemoglobinemia', 'Náuseas, dor abdominal', 'Cefaleia', 'Leucopenia'],
    fontes: [{nome: 'Guia de Tratamento da Malária no Brasil – MS', ano: 2021}, {nome: 'OMS – Guidelines for Malaria', ano: 2023}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'artesunato',
    nome: 'Artesunato',
    classe: 'Antimalárico – derivado de artemisinina (parenteral)',
    apresentacoes: [
      {descricao: 'Frasco-ampola 60 mg (pó) + solvente (após reconstituição e diluição: 10 mg/mL)', mg: 60, ml: 6, tipo: 'injetavel', via: 'IV/IM', reconstituicao: 'Reconstituir 60 mg com 1 mL de bicarbonato de sódio 5% (agitar até ficar límpido) e diluir com 5 mL de SF 0,9% ou SG 5% (total 6 mL = 10 mg/mL)'}
    ],
    indicacoes: ['Malária grave (qualquer espécie)', 'Malária por P. falciparum com intolerância à via oral'],
    doses: [
      {
        indicacao: 'Malária grave – criança < 20 kg',
        mgKgDose: 3, mgKgDia: null, vezesDia: 2, frequencia: '0, 12 e 24 h; depois 1x/dia', via: 'IV (preferencial) ou IM',
        doseMaxDose: null, doseMaxDia: null, duracao: 'Mínimo 24 h (3 doses); até tolerar VO, então completar com ACT oral por 3 dias', faixaEtaria: '< 20 kg',
        obs: 'Administrar em bolus IV lento (1 a 2 min). Doses às 0, 12 e 24 h e depois a cada 24 h até via oral possível (máximo 7 dias). Após artesunato, completar com artemeter+lumefantrina VO por 3 dias. Monitorar hemoglobina por até 4 semanas (hemólise tardia).'
      },
      {
        indicacao: 'Malária grave – criança >= 20 kg e adulto',
        mgKgDose: 2.4, mgKgDia: null, vezesDia: 2, frequencia: '0, 12 e 24 h; depois 1x/dia', via: 'IV (preferencial) ou IM',
        doseMaxDose: null, doseMaxDia: null, duracao: 'Mínimo 24 h (3 doses); até tolerar VO', faixaEtaria: '>= 20 kg',
        obs: 'Mesmo esquema: 0, 12, 24 h e depois 1x/dia. Usar a solução em até 1 h após o preparo. Via IM: aplicar na face anterior da coxa.'
      }
    ],
    diluicao: 'Reconstituir com 1 mL de bicarbonato 5%; diluir com 5 mL de SF 0,9% ou SG 5% (10 mg/mL) para IV. Para IM, diluir com 2 mL (20 mg/mL). Usar em até 1 h.',
    infusao: 'Bolus IV lento em 1 a 2 minutos.',
    contraindicacoes: ['Hipersensibilidade a derivados de artemisinina'],
    interacoes: ['Poucas interações clinicamente relevantes; cautela com fármacos que prolongam QT'],
    ajusteRenal: 'Sem ajuste.',
    ajusteHepatico: 'Sem ajuste.',
    efeitosAdversos: ['Anemia hemolítica tardia pós-artesunato (1 a 4 semanas)', 'Náuseas, vômitos', 'Neutropenia transitória', 'Elevação de transaminases', 'Bradicardia (raro)'],
    fontes: [{nome: 'Guia de Tratamento da Malária no Brasil – MS', ano: 2021}, {nome: 'OMS – Guidelines for Malaria', ano: 2023}, {nome: 'OMS – Management of Severe Malaria', ano: 2013}],
    atualizadoEm: '2026-09',
    verificar: false
  },

  // ===================== ANALGÉSICOS / ANTITÉRMICOS =====================
  {
    id: 'paracetamol',
    nome: 'Paracetamol',
    classe: 'Analgésico e antitérmico',
    apresentacoes: [
      {descricao: 'Solução oral (gotas) 200 mg/mL', mg: 200, ml: 1, tipo: 'gotas', via: 'VO'},
      {descricao: 'Suspensão oral 160 mg/5 mL (32 mg/mL)', mg: 160, ml: 5, tipo: 'suspensao', via: 'VO'},
      {descricao: 'Comprimido 500 mg', mg: 500, ml: null, tipo: 'comprimido', via: 'VO'},
      {descricao: 'Comprimido 750 mg', mg: 750, ml: null, tipo: 'comprimido', via: 'VO'}
    ],
    indicacoes: ['Febre', 'Dor leve a moderada'],
    doses: [
      {
        indicacao: 'Febre / dor',
        mgKgDose: 12.5, mgKgDia: 60, vezesDia: 4, frequencia: '6/6 h (até 4/4 h, máximo 5 doses/dia)', via: 'VO',
        doseMaxDose: 750, doseMaxDia: 3000, duracao: 'Enquanto necessário (avaliar se > 3 dias de febre)', faixaEtaria: 'Todas as idades (neonatos: espaçar para 8/8 h)',
        obs: 'Faixa usual 10 a 15 mg/kg/dose. Máximo 75 mg/kg/dia (não exceder 3 a 4 g/dia). Em neonatos, intervalo de 8/8 h e máximo 60 mg/kg/dia. Nas gotas 200 mg/mL, confirmar o número de gotas por mL da apresentação em uso (varia entre fabricantes). Hepatotoxicidade em superdosagem: antídoto N-acetilcisteína.'
      },
      {
        indicacao: 'Febre / dor – via retal (quando VO impossível)',
        mgKgDose: 15, mgKgDia: 60, vezesDia: 4, frequencia: '6/6 h', via: 'Retal',
        doseMaxDose: 750, doseMaxDia: 3000, duracao: 'Enquanto necessário', faixaEtaria: '> 1 mês',
        obs: 'Absorção retal errática; usar supositório quando disponível. Confirmar conforme bula/protocolo.',
        verificar: true
      }
    ],
    diluicao: null,
    infusao: null,
    contraindicacoes: ['Hipersensibilidade', 'Insuficiência hepática grave', 'Desnutrição grave e depleção de glutationa (cautela, reduzir dose)'],
    interacoes: ['Varfarina (potencializa anticoagulação em uso crônico)', 'Indutores enzimáticos (fenobarbital, fenitoína, rifampicina, isoniazida) aumentam hepatotoxicidade', 'Álcool'],
    ajusteRenal: 'ClCr < 10 mL/min: intervalo mínimo de 8 h.',
    ajusteHepatico: 'Reduzir dose (máximo 2 g/dia) em hepatopatia; evitar em insuficiência hepática grave.',
    efeitosAdversos: ['Raros nas doses habituais', 'Hepatotoxicidade em superdosagem (> 150 mg/kg)', 'Reações cutâneas graves (raro)', 'Trombocitopenia (raro)'],
    fontes: [{nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}, {nome: 'Bula ANVISA – Paracetamol', ano: 2024}, {nome: 'SBP – Tratado de Pediatria', ano: 2022}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'dipirona',
    nome: 'Dipirona (metamizol)',
    classe: 'Analgésico e antitérmico – pirazolona',
    apresentacoes: [
      {descricao: 'Solução oral (gotas) 500 mg/mL', mg: 500, ml: 1, tipo: 'gotas', via: 'VO'},
      {descricao: 'Solução oral 50 mg/mL', mg: 50, ml: 1, tipo: 'solucao', via: 'VO'},
      {descricao: 'Comprimido 500 mg', mg: 500, ml: null, tipo: 'comprimido', via: 'VO'},
      {descricao: 'Ampola 500 mg/mL (2 mL = 1 g)', mg: 500, ml: 1, tipo: 'injetavel', via: 'IV/IM'},
      {descricao: 'Supositório infantil 300 mg', mg: 300, ml: null, tipo: 'supositorio', via: 'Retal'}
    ],
    indicacoes: ['Febre', 'Dor moderada'],
    doses: [
      {
        indicacao: 'Febre / dor – VO',
        mgKgDose: 12.5, mgKgDia: 50, vezesDia: 4, frequencia: '6/6 h', via: 'VO',
        doseMaxDose: 1000, doseMaxDia: 4000, duracao: 'Enquanto necessário', faixaEtaria: '>= 3 meses e >= 5 kg',
        obs: 'Faixa usual 10 a 15 mg/kg/dose (bula: até 4 vezes ao dia). Evitar em menores de 3 meses ou com menos de 5 kg. Nas gotas 500 mg/mL, 1 gota corresponde a aproximadamente 25 mg (20 gotas/mL); confirmar na apresentação em uso.'
      },
      {
        indicacao: 'Febre / dor – IV ou IM',
        mgKgDose: 12.5, mgKgDia: 50, vezesDia: 4, frequencia: '6/6 h', via: 'IV lento ou IM',
        doseMaxDose: 1000, doseMaxDia: 4000, duracao: 'Enquanto necessário', faixaEtaria: '>= 3 meses (via IV apenas > 1 ano conforme bula)',
        obs: 'Faixa 10 a 15 mg/kg/dose. IV lento (diluir e infundir em ao menos 5 min, paciente deitado) pelo risco de hipotensão. Lactentes de 3 a 11 meses: apenas via IM conforme bula. Evitar em < 3 meses ou < 5 kg.'
      }
    ],
    diluicao: 'IV: diluir a dose em 10 a 20 mL de SF 0,9% ou SG 5%.',
    infusao: 'IV lento, ao menos 5 minutos (risco de hipotensão com infusão rápida).',
    contraindicacoes: ['Hipersensibilidade a pirazolonas', 'Menores de 3 meses ou < 5 kg', 'Discrasias sanguíneas, agranulocitose prévia', 'Porfiria aguda intermitente', 'Deficiência de G6PD (risco de hemólise)', 'Instabilidade hemodinâmica (via IV)'],
    interacoes: ['Ciclosporina (reduz níveis)', 'Metotrexato (aumenta toxicidade hematológica)', 'Clorpromazina (hipotermia grave)', 'Anticoagulantes orais'],
    ajusteRenal: 'Reduzir dose em insuficiência renal grave.',
    ajusteHepatico: 'Reduzir dose em insuficiência hepática grave.',
    efeitosAdversos: ['Hipotensão (principalmente IV rápida)', 'Reações alérgicas e anafilaxia', 'Agranulocitose (rara)', 'Reações cutâneas graves', 'Coloração avermelhada da urina'],
    fontes: [{nome: 'Bula ANVISA – Dipirona (Novalgina)', ano: 2024}, {nome: 'SBP – Tratado de Pediatria', ano: 2022}, {nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'ibuprofeno',
    nome: 'Ibuprofeno',
    classe: 'Anti-inflamatório não esteroidal (AINE)',
    apresentacoes: [
      {descricao: 'Solução oral (gotas) 50 mg/mL', mg: 50, ml: 1, tipo: 'gotas', via: 'VO'},
      {descricao: 'Solução oral (gotas) 100 mg/mL', mg: 100, ml: 1, tipo: 'gotas', via: 'VO'},
      {descricao: 'Suspensão oral 100 mg/5 mL (20 mg/mL)', mg: 100, ml: 5, tipo: 'suspensao', via: 'VO'},
      {descricao: 'Comprimido 200 mg', mg: 200, ml: null, tipo: 'comprimido', via: 'VO'},
      {descricao: 'Comprimido 400 mg', mg: 400, ml: null, tipo: 'comprimido', via: 'VO'},
      {descricao: 'Comprimido 600 mg', mg: 600, ml: null, tipo: 'comprimido', via: 'VO'}
    ],
    indicacoes: ['Febre', 'Dor leve a moderada', 'Processos inflamatórios (artrite, dor musculoesquelética)'],
    doses: [
      {
        indicacao: 'Febre / dor',
        mgKgDose: 7.5, mgKgDia: 30, vezesDia: 4, frequencia: '6/6 h a 8/8 h', via: 'VO',
        doseMaxDose: 400, doseMaxDia: 1600, duracao: 'Enquanto necessário (menor tempo possível)', faixaEtaria: '> 6 meses',
        obs: 'Faixa 5 a 10 mg/kg/dose; máximo 40 mg/kg/dia (adolescentes: até 2.400 mg/dia em uso anti-inflamatório). Administrar com alimento. Não usar em menores de 6 meses. Evitar em desidratação, suspeita de dengue, varicela e doença renal. Conferir a concentração das gotas (50 ou 100 mg/mL) antes de calcular.'
      },
      {
        indicacao: 'Anti-inflamatório (artrite, dor musculoesquelética)',
        mgKgDose: 10, mgKgDia: 40, vezesDia: 4, frequencia: '6/6 h', via: 'VO',
        doseMaxDose: 600, doseMaxDia: 2400, duracao: 'Conforme quadro clínico', faixaEtaria: '> 6 meses',
        obs: 'Faixa 30 a 40 mg/kg/dia divididos em 3 a 4 doses. Administrar com alimento. Monitorar função renal em uso prolongado.'
      }
    ],
    diluicao: null,
    infusao: null,
    contraindicacoes: ['Menores de 6 meses', 'Hipersensibilidade a AINEs / asma induzida por AINE', 'Suspeita de dengue ou outra doença hemorrágica', 'Desidratação ou hipovolemia', 'Insuficiência renal', 'Úlcera péptica ativa ou sangramento digestivo', 'Varicela (risco de infecção de partes moles)'],
    interacoes: ['Anticoagulantes e antiagregantes (sangramento)', 'Corticoides (risco gastrointestinal)', 'Outros AINEs / AAS', 'Metotrexato e lítio (aumento de níveis)', 'IECA, diuréticos (nefrotoxicidade)', 'Aminoglicosídeos'],
    ajusteRenal: 'Evitar em insuficiência renal; contraindicado se ClCr < 30 mL/min.',
    ajusteHepatico: 'Cautela; evitar em hepatopatia grave.',
    efeitosAdversos: ['Dispepsia, dor abdominal, sangramento digestivo', 'Lesão renal aguda (principalmente com desidratação)', 'Reações de hipersensibilidade, broncoespasmo', 'Retenção hídrica', 'Trombocitopatia'],
    fontes: [{nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}, {nome: 'Bula ANVISA – Ibuprofeno', ano: 2024}, {nome: 'SBP – Documento científico: Febre', ano: 2021}],
    atualizadoEm: '2026-09',
    verificar: false
  },

  // ===================== ANTIBIÓTICOS =====================
  {
    id: 'amoxicilina',
    nome: 'Amoxicilina',
    classe: 'Antibiótico – penicilina (aminopenicilina)',
    apresentacoes: [
      {descricao: 'Suspensão oral 250 mg/5 mL (50 mg/mL)', mg: 250, ml: 5, tipo: 'suspensao', via: 'VO'},
      {descricao: 'Suspensão oral 400 mg/5 mL (80 mg/mL)', mg: 400, ml: 5, tipo: 'suspensao', via: 'VO'},
      {descricao: 'Suspensão oral 500 mg/5 mL (100 mg/mL)', mg: 500, ml: 5, tipo: 'suspensao', via: 'VO'},
      {descricao: 'Cápsula ou comprimido 500 mg', mg: 500, ml: null, tipo: 'comprimido', via: 'VO'},
      {descricao: 'Comprimido 875 mg', mg: 875, ml: null, tipo: 'comprimido', via: 'VO'}
    ],
    indicacoes: ['Pneumonia adquirida na comunidade (não grave)', 'Otite média aguda', 'Sinusite bacteriana aguda', 'Faringotonsilite estreptocócica', 'Infecção do trato urinário (sensível)', 'Profilaxia de endocardite'],
    doses: [
      {
        indicacao: 'Pneumonia comunitária / OMA / sinusite (dose padrão)',
        mgKgDose: 25, mgKgDia: 50, vezesDia: 2, frequencia: '12/12 h (ou 8/8 h)', via: 'VO',
        doseMaxDose: 1000, doseMaxDia: 3000, duracao: 'Pneumonia: 7 dias; OMA: 10 dias (< 2 anos) ou 5 a 7 dias', faixaEtaria: '> 1 mês',
        obs: 'Faixa 40 a 50 mg/kg/dia divididos em 2 ou 3 tomadas. Pneumonia não grave em < 5 anos: 50 mg/kg/dia por 7 dias (SBP/OMS); em áreas com pneumococo de sensibilidade reduzida, usar dose alta.'
      },
      {
        indicacao: 'OMA / pneumonia – dose alta (pneumococo de sensibilidade reduzida)',
        mgKgDose: 45, mgKgDia: 90, vezesDia: 2, frequencia: '12/12 h', via: 'VO',
        doseMaxDose: 2000, doseMaxDia: 4000, duracao: '7 a 10 dias', faixaEtaria: '> 1 mês',
        obs: 'Faixa 80 a 90 mg/kg/dia. Indicado em OMA com falha do esquema padrão, uso recente de antibiótico, creche ou < 2 anos, conforme protocolo. Verificar a concentração da suspensão antes de calcular o volume.'
      },
      {
        indicacao: 'Faringotonsilite estreptocócica',
        mgKgDose: 50, mgKgDia: 50, vezesDia: 1, frequencia: '1x/dia (ou 25 mg/kg 12/12 h)', via: 'VO',
        doseMaxDose: 1000, doseMaxDia: 1000, duracao: '10 dias', faixaEtaria: '> 1 mês',
        obs: 'Dose única diária de 50 mg/kg (máximo 1 g) ou dividida em 2 tomadas por 10 dias.'
      },
      {
        indicacao: 'Profilaxia de endocardite (procedimentos odontológicos)',
        mgKgDose: 50, mgKgDia: 50, vezesDia: 1, frequencia: 'Dose única 30 a 60 min antes do procedimento', via: 'VO',
        doseMaxDose: 2000, doseMaxDia: 2000, duracao: 'Dose única', faixaEtaria: 'Todas as idades',
        obs: 'Somente em cardiopatias de alto risco conforme diretriz vigente.'
      }
    ],
    diluicao: null,
    infusao: null,
    contraindicacoes: ['Hipersensibilidade a penicilinas ou betalactâmicos', 'Mononucleose infecciosa (exantema frequente)'],
    interacoes: ['Alopurinol (aumenta exantema)', 'Metotrexato (aumenta toxicidade)', 'Varfarina (pode potencializar)', 'Probenecida (aumenta níveis)'],
    ajusteRenal: 'ClCr 10 a 30 mL/min: intervalo 12/12 h; ClCr < 10 mL/min: 24/24 h.',
    ajusteHepatico: 'Sem ajuste.',
    efeitosAdversos: ['Diarreia', 'Exantema', 'Náuseas', 'Candidíase', 'Reações de hipersensibilidade (urticária, anafilaxia)', 'Colite por C. difficile (raro)'],
    fontes: [{nome: 'SBP – Diretrizes de Pneumonia Adquirida na Comunidade', ano: 2018}, {nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}, {nome: 'OMS – Pocket Book of Hospital Care for Children', ano: 2013}, {nome: 'AAP – Otite média aguda (diretriz)', ano: 2013}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'amoxicilina_clavulanato',
    nome: 'Amoxicilina + clavulanato',
    classe: 'Antibiótico – penicilina com inibidor de betalactamase',
    apresentacoes: [
      {descricao: 'Suspensão oral 250 mg + 62,5 mg/5 mL (mg refere-se à amoxicilina)', mg: 250, ml: 5, tipo: 'suspensao', via: 'VO'},
      {descricao: 'Suspensão oral 400 mg + 57 mg/5 mL (mg refere-se à amoxicilina)', mg: 400, ml: 5, tipo: 'suspensao', via: 'VO'},
      {descricao: 'Suspensão oral 600 mg + 42,9 mg/5 mL (mg refere-se à amoxicilina)', mg: 600, ml: 5, tipo: 'suspensao', via: 'VO'},
      {descricao: 'Comprimido 875 mg + 125 mg', mg: 875, ml: null, tipo: 'comprimido', via: 'VO'},
      {descricao: 'Frasco-ampola 1.000 mg + 200 mg (pó) IV', mg: 1000, ml: null, tipo: 'injetavel', via: 'IV', reconstituicao: 'Reconstituir em 20 mL de água para injeção (50 mg/mL de amoxicilina); diluir em SF 0,9% (não usar glicose)'}
    ],
    indicacoes: ['OMA e sinusite com falha de amoxicilina', 'Pneumonia com suspeita de H. influenzae produtor de betalactamase', 'Infecções de pele e partes moles, mordeduras', 'ITU por germes produtores de betalactamase', 'Infecções intra-abdominais (IV)'],
    doses: [
      {
        indicacao: 'Infecções leves a moderadas (formulação 4:1 ou 7:1)',
        mgKgDose: 25, mgKgDia: 50, vezesDia: 2, frequencia: '12/12 h (formulação 7:1) ou 8/8 h (4:1)', via: 'VO',
        doseMaxDose: 875, doseMaxDia: 1750, duracao: '7 a 10 dias', faixaEtaria: '> 1 mês',
        obs: 'Doses em amoxicilina. Faixa 45 a 50 mg/kg/dia. Usar suspensão 400/57 ou 600/42,9 para 12/12 h; suspensão 250/62,5 para 8/8 h. Não exceder 10 mg/kg/dia de clavulanato (diarreia). Administrar com alimento.'
      },
      {
        indicacao: 'OMA / sinusite – dose alta (formulação 14:1 ou 7:1)',
        mgKgDose: 45, mgKgDia: 90, vezesDia: 2, frequencia: '12/12 h', via: 'VO',
        doseMaxDose: 2000, doseMaxDia: 4000, duracao: '10 dias', faixaEtaria: '> 1 mês',
        obs: 'Doses em amoxicilina. Preferir suspensão 600/42,9 mg/5 mL para manter clavulanato <= 10 mg/kg/dia.'
      },
      {
        indicacao: 'Infecções moderadas a graves – IV',
        mgKgDose: 25, mgKgDia: 75, vezesDia: 3, frequencia: '8/8 h', via: 'IV',
        doseMaxDose: 1000, doseMaxDia: 3000, duracao: 'Conforme quadro clínico (7 a 14 dias)', faixaEtaria: '> 3 meses (< 3 meses: 12/12 h)',
        obs: 'Doses em amoxicilina. Faixa 25 a 50 mg/kg/dose (do componente amoxicilina) 8/8 h; em < 3 meses, 12/12 h. Infundir em 30 a 40 min. Confirmar conforme bula/protocolo institucional.',
        verificar: true
      }
    ],
    diluicao: 'IV: reconstituir 1 g + 200 mg em 20 mL de água para injeção; diluir em 50 a 100 mL de SF 0,9% (não usar soluções com glicose).',
    infusao: 'Infusão IV em 30 a 40 minutos, em até 1 h após o preparo.',
    contraindicacoes: ['Hipersensibilidade a betalactâmicos', 'História de icterícia ou disfunção hepática com amoxicilina-clavulanato', 'Mononucleose infecciosa'],
    interacoes: ['Alopurinol', 'Metotrexato', 'Varfarina', 'Probenecida', 'Micofenolato'],
    ajusteRenal: 'ClCr 10 a 30 mL/min: 12/12 h; ClCr < 10 mL/min: 24/24 h. Não usar comprimido 875 mg se ClCr < 30.',
    ajusteHepatico: 'Cautela; monitorar função hepática em uso prolongado.',
    efeitosAdversos: ['Diarreia (mais frequente que amoxicilina isolada)', 'Náuseas, vômitos', 'Exantema', 'Candidíase', 'Hepatite colestática (rara)'],
    fontes: [{nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}, {nome: 'Bula ANVISA – Amoxicilina + clavulanato de potássio', ano: 2024}, {nome: 'BNF for Children', ano: 2024}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'penicilina_benzatina',
    nome: 'Penicilina G benzatina',
    classe: 'Antibiótico – penicilina de depósito (IM)',
    apresentacoes: [
      {descricao: 'Frasco-ampola 600.000 UI (pó para suspensão injetável) – mg expresso em UI', mg: 600000, ml: null, tipo: 'injetavel', via: 'IM', unidade: 'UI', reconstituicao: 'Reconstituir com o diluente do fabricante (geralmente 2 a 4 mL de água para injeção); uso exclusivo IM profundo'},
      {descricao: 'Frasco-ampola 1.200.000 UI (pó para suspensão injetável) – mg expresso em UI', mg: 1200000, ml: null, tipo: 'injetavel', via: 'IM', unidade: 'UI', reconstituicao: 'Reconstituir com o diluente do fabricante (geralmente 4 mL); uso exclusivo IM profundo'}
    ],
    indicacoes: ['Faringotonsilite estreptocócica (dose única)', 'Profilaxia secundária de febre reumática', 'Sífilis congênita (assintomática, sem alteração liquórica) e sífilis adquirida', 'Impetigo extenso (alternativa)'],
    doses: [
      {
        indicacao: 'Faringotonsilite estreptocócica / impetigo – dose única',
        mgKgDose: 50000, mgKgDia: 50000, vezesDia: 1, frequencia: 'Dose única', via: 'IM profundo',
        doseMaxDose: 1200000, doseMaxDia: 1200000, duracao: 'Dose única', faixaEtaria: 'Todas as idades',
        unidade: 'UI',
        faixasPeso: '< 20 kg (ou < 27 kg conforme fonte): 600.000 UI; >= 20 kg (ou >= 27 kg): 1.200.000 UI',
        obs: 'Dose em UI: 50.000 UI/kg, máximo 1.200.000 UI. Esquema prático: < 20 kg = 600.000 UI; >= 20 kg = 1.200.000 UI (SBP usa corte de 27 kg). Aplicar IM profundo (glúteo ou vasto lateral). Nunca IV (risco de morte). Observar 30 min após a aplicação.'
      },
      {
        indicacao: 'Profilaxia secundária de febre reumática',
        mgKgDose: 50000, mgKgDia: null, vezesDia: 1, frequencia: 'A cada 21 dias (ou 28 dias em baixo risco)', via: 'IM profundo',
        doseMaxDose: 1200000, doseMaxDia: 1200000, duracao: 'Anos (até 21 anos ou 5 a 10 anos após o último surto, conforme gravidade)', faixaEtaria: 'Todas as idades',
        unidade: 'UI',
        faixasPeso: '< 20 kg: 600.000 UI; >= 20 kg: 1.200.000 UI',
        obs: 'Dose em UI. Duração conforme Diretrizes Brasileiras para Febre Reumática (presença de cardite / sequela valvar).'
      },
      {
        indicacao: 'Sífilis congênita (RN assintomático, líquor normal, mãe não tratada adequadamente)',
        mgKgDose: 50000, mgKgDia: 50000, vezesDia: 1, frequencia: 'Dose única', via: 'IM',
        doseMaxDose: null, doseMaxDia: null, duracao: 'Dose única', faixaEtaria: 'Neonatos',
        unidade: 'UI',
        obs: 'Dose em UI: 50.000 UI/kg dose única, apenas em RN assintomático com exames normais e líquor normal; caso contrário usar penicilina cristalina ou procaína por 10 dias conforme PCDT de IST do MS.'
      }
    ],
    diluicao: 'Reconstituir com o diluente fornecido; suspensão leitosa. Uso exclusivamente IM profundo. Pode-se usar lidocaína 1% sem vasoconstritor como diluente para reduzir dor conforme protocolo do MS.',
    infusao: null,
    contraindicacoes: ['Hipersensibilidade a penicilinas', 'Administração IV ou intra-arterial (absolutamente contraindicada)'],
    interacoes: ['Probenecida (aumenta níveis)', 'Tetraciclinas (antagonismo)', 'Metotrexato'],
    ajusteRenal: 'Sem ajuste para dose única; cautela em insuficiência grave.',
    ajusteHepatico: 'Sem ajuste.',
    efeitosAdversos: ['Dor e endurecimento no local', 'Reação de hipersensibilidade / anafilaxia', 'Reação de Jarisch-Herxheimer (sífilis)', 'Síndrome de Hoigné (reação psicótica transitória, rara)'],
    fontes: [{nome: 'PCDT para Atenção Integral às Pessoas com IST – MS', ano: 2022}, {nome: 'Diretrizes Brasileiras para Diagnóstico, Tratamento e Prevenção da Febre Reumática – SBC/SBP/SBR', ano: 2009}, {nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'penicilina_cristalina',
    nome: 'Penicilina G cristalina (potássica)',
    classe: 'Antibiótico – penicilina natural (IV)',
    apresentacoes: [
      {descricao: 'Frasco-ampola 5.000.000 UI (pó) – mg expresso em UI', mg: 5000000, ml: null, tipo: 'injetavel', via: 'IV', unidade: 'UI', reconstituicao: 'Reconstituir 5.000.000 UI em 8 mL de água para injeção (500.000 UI/mL) ou em 10 mL (aprox. 500.000 UI/mL considerando o volume do pó); diluir a dose em SF 0,9% ou SG 5% antes de infundir'},
      {descricao: 'Frasco-ampola 1.000.000 UI (pó) – mg expresso em UI', mg: 1000000, ml: null, tipo: 'injetavel', via: 'IV', unidade: 'UI', reconstituicao: 'Reconstituir em 10 mL de água para injeção (100.000 UI/mL)'}
    ],
    indicacoes: ['Sífilis congênita', 'Pneumonia pneumocócica grave', 'Meningite por meningococo ou pneumococo sensível', 'Infecções estreptocócicas graves (fasciíte, síndrome do choque tóxico com clindamicina)', 'Leptospirose grave', 'Difteria, tétano (adjuvante)'],
    doses: [
      {
        indicacao: 'Infecções moderadas a graves (pneumonia, leptospirose, celulite estreptocócica)',
        mgKgDose: 50000, mgKgDia: 200000, vezesDia: 4, frequencia: '6/6 h', via: 'IV',
        doseMaxDose: 4000000, doseMaxDia: 24000000, duracao: '7 a 10 dias', faixaEtaria: '> 1 mês',
        unidade: 'UI',
        obs: 'Dose em UI. Faixa 100.000 a 250.000 UI/kg/dia divididas 4/4 h a 6/6 h. Infundir em 15 a 30 min. Cada 1.000.000 UI contém 1,7 mEq de potássio.'
      },
      {
        indicacao: 'Meningite bacteriana',
        mgKgDose: 75000, mgKgDia: 300000, vezesDia: 4, frequencia: '4/4 h a 6/6 h', via: 'IV',
        doseMaxDose: 4000000, doseMaxDia: 24000000, duracao: 'Meningococo: 5 a 7 dias; pneumococo: 10 a 14 dias', faixaEtaria: '> 1 mês',
        unidade: 'UI',
        obs: 'Dose em UI. Faixa 250.000 a 400.000 UI/kg/dia (máximo 24.000.000 UI/dia), divididas 4/4 h a 6/6 h. Ceftriaxona é a escolha empírica inicial na maioria dos protocolos.'
      },
      {
        indicacao: 'Sífilis congênita (RN)',
        mgKgDose: 50000, mgKgDia: 100000, vezesDia: 2, frequencia: '12/12 h nos primeiros 7 dias de vida; 8/8 h após 7 dias de vida', via: 'IV',
        doseMaxDose: null, doseMaxDia: null, duracao: '10 dias', faixaEtaria: 'Neonatos',
        unidade: 'UI',
        obs: 'Dose em UI: 50.000 UI/kg/dose. RN com até 7 dias: 12/12 h; > 7 dias: 8/8 h (após 28 dias: 4/4 h a 6/6 h). Se interrupção > 1 dia, reiniciar o esquema, conforme PCDT de IST do MS.'
      }
    ],
    diluicao: 'Reconstituir em água para injeção; diluir a dose em 50 a 100 mL de SF 0,9% ou SG 5% (concentração final até 100.000 a 500.000 UI/mL para pediatria; em neonatos preferir <= 50.000 UI/mL).',
    infusao: 'Infusão IV em 15 a 30 minutos (nunca em bolus rápido: risco de hiperpotassemia e convulsões).',
    contraindicacoes: ['Hipersensibilidade a penicilinas'],
    interacoes: ['Probenecida', 'Aminoglicosídeos (inativação se misturados na mesma solução)', 'Tetraciclinas', 'Metotrexato'],
    ajusteRenal: 'ClCr 10 a 50 mL/min: 75% da dose ou intervalo 8/8 h a 12/12 h; ClCr < 10 mL/min: 25 a 50% da dose. Atenção ao aporte de potássio.',
    ajusteHepatico: 'Sem ajuste.',
    efeitosAdversos: ['Hipersensibilidade / anafilaxia', 'Convulsões em doses altas ou insuficiência renal', 'Hiperpotassemia (sal potássico)', 'Flebite', 'Reação de Jarisch-Herxheimer', 'Anemia hemolítica, neutropenia (uso prolongado)'],
    fontes: [{nome: 'PCDT para Atenção Integral às Pessoas com IST – MS', ano: 2022}, {nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}, {nome: 'Guia de Vigilância em Saúde – MS', ano: 2024}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'ampicilina',
    nome: 'Ampicilina',
    classe: 'Antibiótico – aminopenicilina (parenteral)',
    apresentacoes: [
      {descricao: 'Frasco-ampola 500 mg (pó)', mg: 500, ml: null, tipo: 'injetavel', via: 'IV/IM', reconstituicao: 'Reconstituir em 5 mL de água para injeção (100 mg/mL)'},
      {descricao: 'Frasco-ampola 1 g (pó)', mg: 1000, ml: null, tipo: 'injetavel', via: 'IV/IM', reconstituicao: 'Reconstituir em 10 mL de água para injeção (100 mg/mL)'}
    ],
    indicacoes: ['Sepse neonatal precoce (com gentamicina)', 'Meningite bacteriana neonatal e por Listeria', 'Pneumonia grave em lactentes e crianças (OMS/SBP)', 'Infecções por enterococo sensível', 'ITU complicada (germe sensível)'],
    doses: [
      {
        indicacao: 'Infecções moderadas a graves (pneumonia grave, ITU, sepse) – lactentes e crianças',
        mgKgDose: 50, mgKgDia: 200, vezesDia: 4, frequencia: '6/6 h', via: 'IV ou IM',
        doseMaxDose: 2000, doseMaxDia: 8000, duracao: 'Pneumonia grave: 5 a 7 dias (completar VO); demais conforme quadro', faixaEtaria: '> 1 mês',
        obs: 'Faixa 100 a 200 mg/kg/dia divididos 6/6 h. Pneumonia grave (OMS): 50 mg/kg/dose 6/6 h por ao menos 5 dias, com gentamicina se muito grave.'
      },
      {
        indicacao: 'Meningite bacteriana / infecções graves',
        mgKgDose: 75, mgKgDia: 300, vezesDia: 4, frequencia: '6/6 h (até 4/4 h)', via: 'IV',
        doseMaxDose: 3000, doseMaxDia: 12000, duracao: '10 a 21 dias conforme agente', faixaEtaria: '> 1 mês',
        obs: 'Faixa 200 a 400 mg/kg/dia (máximo 12 g/dia).'
      },
      {
        indicacao: 'Sepse / meningite neonatal',
        mgKgDose: 50, mgKgDia: 100, vezesDia: 2, frequencia: '12/12 h (<= 7 dias de vida); 8/8 h (8 a 28 dias)', via: 'IV ou IM',
        doseMaxDose: null, doseMaxDia: null, duracao: 'Sepse: 7 a 10 dias; meningite: 14 a 21 dias', faixaEtaria: 'Neonatos',
        obs: '50 mg/kg/dose; em meningite neonatal usar 100 mg/kg/dose com o mesmo intervalo (confirmar conforme protocolo da unidade neonatal). Intervalos podem variar com idade gestacional e pós-natal.'
      }
    ],
    diluicao: 'IV: reconstituir a 100 mg/mL e diluir em SF 0,9% até concentração <= 30 mg/mL para infusão (ou administrar IV lento a até 100 mg/mL em 3 a 5 min). IM: reconstituir 500 mg em 1,8 mL (250 mg/mL).',
    infusao: 'Infusão IV em 15 a 30 minutos; bolus IV lento em 3 a 5 min. Usar em até 1 h após reconstituição.',
    contraindicacoes: ['Hipersensibilidade a penicilinas', 'Mononucleose infecciosa (exantema)'],
    interacoes: ['Aminoglicosídeos (não misturar na mesma solução)', 'Alopurinol', 'Probenecida', 'Metotrexato'],
    ajusteRenal: 'ClCr 10 a 50 mL/min: intervalo 6/6 h a 12/12 h; ClCr < 10 mL/min: 12/12 h a 24/24 h.',
    ajusteHepatico: 'Sem ajuste.',
    efeitosAdversos: ['Exantema maculopapular', 'Diarreia', 'Hipersensibilidade / anafilaxia', 'Flebite', 'Colite por C. difficile (raro)'],
    fontes: [{nome: 'OMS – Pocket Book of Hospital Care for Children', ano: 2013}, {nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}, {nome: 'Neofax / Pediatric & Neonatal Dosage Handbook', ano: 2023}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'ceftriaxona',
    nome: 'Ceftriaxona',
    classe: 'Antibiótico – cefalosporina de 3ª geração',
    apresentacoes: [
      {descricao: 'Frasco-ampola 500 mg (pó) IV/IM', mg: 500, ml: null, tipo: 'injetavel', via: 'IV/IM', reconstituicao: 'IV: 5 mL de água para injeção (100 mg/mL); IM: 2 mL de lidocaína 1% (250 mg/mL)'},
      {descricao: 'Frasco-ampola 1 g (pó) IV/IM', mg: 1000, ml: null, tipo: 'injetavel', via: 'IV/IM', reconstituicao: 'IV: 10 mL de água para injeção (100 mg/mL); IM: 3,5 mL de lidocaína 1% (aprox. 285 mg/mL)'}
    ],
    indicacoes: ['Meningite bacteriana', 'Sepse / febre sem foco em lactentes', 'Pneumonia grave', 'Pielonefrite', 'Infecções gonocócicas', 'Febre tifoide, salmonelose invasiva', 'Leptospirose (alternativa)', 'Doença meningocócica (tratamento e quimioprofilaxia)'],
    doses: [
      {
        indicacao: 'Infecções moderadas a graves (pneumonia, pielonefrite, sepse)',
        mgKgDose: 50, mgKgDia: 75, vezesDia: 1, frequencia: '1x/dia (ou 12/12 h)', via: 'IV ou IM',
        doseMaxDose: 2000, doseMaxDia: 4000, duracao: '7 a 14 dias conforme quadro', faixaEtaria: '> 1 mês (evitar em neonatos: ver obs)',
        obs: 'Faixa 50 a 75 mg/kg/dia em 1 dose diária ou 12/12 h (máximo 2 g/dose e 4 g/dia). Evitar em neonatos com hiperbilirrubinemia (desloca bilirrubina da albumina) e nunca administrar junto ou em sequência com soluções contendo cálcio em neonatos (precipitação fatal); em < 28 dias preferir cefotaxima.'
      },
      {
        indicacao: 'Meningite bacteriana',
        mgKgDose: 50, mgKgDia: 100, vezesDia: 2, frequencia: '12/12 h (ou 100 mg/kg 1x/dia)', via: 'IV',
        doseMaxDose: 2000, doseMaxDia: 4000, duracao: 'Meningococo 5 a 7 dias; Hib 7 a 10 dias; pneumococo 10 a 14 dias', faixaEtaria: '> 1 mês',
        obs: '100 mg/kg/dia (máximo 4 g/dia). Considerar dexametasona antes ou junto da primeira dose quando indicada.'
      },
      {
        indicacao: 'Quimioprofilaxia de contatos de doença meningocócica (alternativa) / gonococo',
        mgKgDose: null, mgKgDia: null, vezesDia: 1, frequencia: 'Dose única', via: 'IM',
        doseMaxDose: 250, doseMaxDia: 250, duracao: 'Dose única', faixaEtaria: 'Todas as idades',
        doseFixa: '< 12 anos: 125 mg IM dose única; >= 12 anos: 250 mg IM dose única',
        obs: 'Dose fixa por idade: 125 mg (< 12 anos) ou 250 mg (>= 12 anos) IM dose única. Gonococo em crianças: 25 a 50 mg/kg IM dose única (máximo 125 mg em < 45 kg). Confirmar conforme protocolo.'
      }
    ],
    diluicao: 'IV: reconstituir a 100 mg/mL e diluir em SF 0,9% ou SG 5% (10 a 40 mg/mL). Nunca com soluções contendo cálcio (Ringer lactato, gluconato de cálcio) na mesma linha. IM: reconstituir com lidocaína 1% sem vasoconstritor.',
    infusao: 'Infusão IV em 30 minutos (bolus lento em 2 a 4 min aceito em crianças maiores conforme bula).',
    contraindicacoes: ['Hipersensibilidade a cefalosporinas', 'Neonatos com hiperbilirrubinemia', 'Neonatos (<= 28 dias) que recebem ou vão receber soluções com cálcio IV', 'Prematuros'],
    interacoes: ['Soluções com cálcio (precipitação)', 'Aminoglicosídeos (não misturar na mesma solução)', 'Varfarina', 'Anticoncepcionais orais (redução de eficácia)'],
    ajusteRenal: 'Sem ajuste (eliminação biliar e renal), exceto se insuficiência renal e hepática combinadas (máximo 2 g/dia).',
    ajusteHepatico: 'Sem ajuste isolado; se associada a insuficiência renal, máximo 2 g/dia.',
    efeitosAdversos: ['Diarreia', 'Exantema', 'Pseudolitíase biliar (lama biliar), nefrolitíase', 'Dor no local da injeção IM', 'Eosinofilia, trombocitose', 'Anemia hemolítica imune (rara)'],
    fontes: [{nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}, {nome: 'Bula ANVISA – Ceftriaxona', ano: 2024}, {nome: 'Guia de Vigilância em Saúde – MS', ano: 2024}, {nome: 'AAP Red Book', ano: 2024}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'cefalexina',
    nome: 'Cefalexina',
    classe: 'Antibiótico – cefalosporina de 1ª geração (oral)',
    apresentacoes: [
      {descricao: 'Suspensão oral 250 mg/5 mL (50 mg/mL)', mg: 250, ml: 5, tipo: 'suspensao', via: 'VO'},
      {descricao: 'Comprimido ou cápsula 500 mg', mg: 500, ml: null, tipo: 'comprimido', via: 'VO'},
      {descricao: 'Comprimido 1 g', mg: 1000, ml: null, tipo: 'comprimido', via: 'VO'}
    ],
    indicacoes: ['Impetigo, celulite e infecções de pele e partes moles', 'ITU não complicada', 'Faringotonsilite estreptocócica (alérgicos a penicilina sem anafilaxia)', 'Profilaxia de ITU (dose baixa)'],
    doses: [
      {
        indicacao: 'Infecções leves a moderadas (pele, ITU, faringite)',
        mgKgDose: 12.5, mgKgDia: 50, vezesDia: 4, frequencia: '6/6 h (ou 25 mg/kg 12/12 h para faringite)', via: 'VO',
        doseMaxDose: 500, doseMaxDia: 2000, duracao: 'Pele: 7 dias; ITU: 7 a 10 dias; faringite: 10 dias', faixaEtaria: '> 1 mês',
        obs: 'Faixa 25 a 50 mg/kg/dia em 3 a 4 tomadas. Pode ser administrado com alimento.'
      },
      {
        indicacao: 'Infecções mais graves (celulite extensa, osteomielite após terapia IV)',
        mgKgDose: 25, mgKgDia: 100, vezesDia: 4, frequencia: '6/6 h', via: 'VO',
        doseMaxDose: 1000, doseMaxDia: 4000, duracao: 'Conforme quadro clínico', faixaEtaria: '> 1 mês',
        obs: 'Faixa 75 a 100 mg/kg/dia (máximo 4 g/dia).'
      },
      {
        indicacao: 'Profilaxia de ITU',
        mgKgDose: 10, mgKgDia: 10, vezesDia: 1, frequencia: '1x/dia (à noite)', via: 'VO',
        doseMaxDose: 250, doseMaxDia: 250, duracao: 'Conforme indicação nefrológica', faixaEtaria: 'Todas as idades',
        obs: 'Faixa 10 a 15 mg/kg/dia em dose única noturna (alternativa em lactentes < 2 meses, quando nitrofurantoína e SMX-TMP são contraindicados). Confirmar conforme protocolo.'
      }
    ],
    diluicao: null,
    infusao: null,
    contraindicacoes: ['Hipersensibilidade a cefalosporinas', 'Anafilaxia prévia a penicilinas (cautela, reação cruzada)'],
    interacoes: ['Metformina (aumento de níveis)', 'Probenecida', 'Varfarina'],
    ajusteRenal: 'ClCr 10 a 50 mL/min: intervalo 8/8 h a 12/12 h; ClCr < 10 mL/min: 12/12 h a 24/24 h.',
    ajusteHepatico: 'Sem ajuste.',
    efeitosAdversos: ['Diarreia', 'Náuseas', 'Exantema', 'Candidíase', 'Eosinofilia', 'Reações de hipersensibilidade'],
    fontes: [{nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}, {nome: 'Bula ANVISA – Cefalexina', ano: 2024}, {nome: 'SBP – Documento científico: Infecção do trato urinário', ano: 2021}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'cefotaxima',
    nome: 'Cefotaxima',
    classe: 'Antibiótico – cefalosporina de 3ª geração (parenteral)',
    apresentacoes: [
      {descricao: 'Frasco-ampola 500 mg (pó)', mg: 500, ml: null, tipo: 'injetavel', via: 'IV/IM', reconstituicao: 'Reconstituir em 5 mL de água para injeção (100 mg/mL)'},
      {descricao: 'Frasco-ampola 1 g (pó)', mg: 1000, ml: null, tipo: 'injetavel', via: 'IV/IM', reconstituicao: 'Reconstituir em 10 mL de água para injeção (100 mg/mL)'}
    ],
    indicacoes: ['Sepse e meningite neonatal (alternativa à ceftriaxona em neonatos)', 'Meningite bacteriana', 'Pneumonia grave, pielonefrite, sepse em lactentes'],
    doses: [
      {
        indicacao: 'Infecções moderadas a graves – lactentes e crianças',
        mgKgDose: 50, mgKgDia: 150, vezesDia: 3, frequencia: '8/8 h', via: 'IV ou IM',
        doseMaxDose: 2000, doseMaxDia: 8000, duracao: '7 a 14 dias conforme quadro', faixaEtaria: '> 1 mês',
        obs: 'Faixa 100 a 150 mg/kg/dia divididos 6/6 h a 8/8 h.'
      },
      {
        indicacao: 'Meningite bacteriana / infecções graves',
        mgKgDose: 75, mgKgDia: 300, vezesDia: 4, frequencia: '6/6 h', via: 'IV',
        doseMaxDose: 3000, doseMaxDia: 12000, duracao: '7 a 21 dias conforme agente', faixaEtaria: '> 1 mês',
        obs: 'Faixa 200 a 300 mg/kg/dia divididos 6/6 h (máximo 12 g/dia).'
      },
      {
        indicacao: 'Sepse / meningite neonatal',
        mgKgDose: 50, mgKgDia: 100, vezesDia: 2, frequencia: '12/12 h (<= 7 dias de vida); 8/8 h (8 a 28 dias)', via: 'IV ou IM',
        doseMaxDose: null, doseMaxDia: null, duracao: 'Sepse: 7 a 10 dias; meningite: 14 a 21 dias', faixaEtaria: 'Neonatos',
        obs: '50 mg/kg/dose. Intervalos variam com idade gestacional e pós-natal (prematuros < 32 semanas: 12/12 h por mais tempo). Preferida à ceftriaxona em neonatos.'
      }
    ],
    diluicao: 'Reconstituir a 100 mg/mL; diluir em SF 0,9% ou SG 5% (20 a 60 mg/mL) para infusão.',
    infusao: 'Infusão IV em 15 a 30 minutos; bolus IV lento em 3 a 5 min.',
    contraindicacoes: ['Hipersensibilidade a cefalosporinas'],
    interacoes: ['Aminoglicosídeos (não misturar na mesma solução; monitorar função renal)', 'Probenecida'],
    ajusteRenal: 'ClCr < 20 mL/min: reduzir dose em 50%.',
    ajusteHepatico: 'Sem ajuste.',
    efeitosAdversos: ['Diarreia', 'Exantema', 'Flebite', 'Eosinofilia, neutropenia (uso prolongado)', 'Arritmia com bolus rápido por cateter central (raro)'],
    fontes: [{nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}, {nome: 'Neofax / Pediatric & Neonatal Dosage Handbook', ano: 2023}, {nome: 'Bula ANVISA – Cefotaxima', ano: 2024}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'azitromicina',
    nome: 'Azitromicina',
    classe: 'Antibiótico – macrolídeo (azalídeo)',
    apresentacoes: [
      {descricao: 'Suspensão oral 200 mg/5 mL (40 mg/mL)', mg: 200, ml: 5, tipo: 'suspensao', via: 'VO'},
      {descricao: 'Comprimido 500 mg', mg: 500, ml: null, tipo: 'comprimido', via: 'VO'},
      {descricao: 'Frasco-ampola 500 mg (pó) IV', mg: 500, ml: null, tipo: 'injetavel', via: 'IV', reconstituicao: 'Reconstituir em 4,8 mL de água para injeção (100 mg/mL); diluir em SF 0,9% ou SG 5% a 1 a 2 mg/mL'}
    ],
    indicacoes: ['Pneumonia atípica (Mycoplasma, Chlamydia)', 'Coqueluche (tratamento e quimioprofilaxia)', 'Faringotonsilite estreptocócica em alérgicos a penicilina', 'OMA (alternativa)', 'Diarreia por Shigella / Campylobacter, febre tifoide (alternativa)', 'Tracoma'],
    doses: [
      {
        indicacao: 'Infecções respiratórias / OMA – esquema de 3 dias',
        mgKgDose: 10, mgKgDia: 10, vezesDia: 1, frequencia: '1x/dia', via: 'VO',
        doseMaxDose: 500, doseMaxDia: 500, duracao: '3 dias', faixaEtaria: '> 6 meses (OMA); qualquer idade para coqueluche',
        obs: 'Alternativa: 10 mg/kg no D1 (máximo 500 mg) e 5 mg/kg no D2 a D5 (máximo 250 mg). Faringite estreptocócica: 12 mg/kg/dia por 5 dias (máximo 500 mg). Administrar 1 h antes ou 2 h após as refeições (suspensão pode ser com alimento).'
      },
      {
        indicacao: 'Coqueluche (tratamento e quimioprofilaxia de contatos)',
        mgKgDose: 10, mgKgDia: 10, vezesDia: 1, frequencia: '1x/dia', via: 'VO',
        doseMaxDose: 500, doseMaxDia: 500, duracao: '< 6 meses: 5 dias (10 mg/kg/dia); >= 6 meses: D1 10 mg/kg, D2 a D5 5 mg/kg (máximo 250 mg)', faixaEtaria: 'Todas as idades (preferida em < 1 mês)',
        obs: 'Lactentes < 6 meses: 10 mg/kg/dia por 5 dias. Em < 1 mês, monitorar estenose hipertrófica de piloro. Fonte: Guia de Vigilância em Saúde – MS.'
      },
      {
        indicacao: 'Shigelose / diarreia invasiva (alternativa) / febre tifoide',
        mgKgDose: 10, mgKgDia: 10, vezesDia: 1, frequencia: '1x/dia', via: 'VO',
        doseMaxDose: 500, doseMaxDia: 500, duracao: 'Shigelose: 3 dias; febre tifoide: 7 dias (até 20 mg/kg/dia, máximo 1 g)', faixaEtaria: 'Todas as idades',
        obs: 'Febre tifoide: 10 a 20 mg/kg/dia (máximo 1 g/dia) por 7 dias. Confirmar conforme protocolo.'
      },
      {
        indicacao: 'Infecção grave – IV',
        mgKgDose: 10, mgKgDia: 10, vezesDia: 1, frequencia: '1x/dia', via: 'IV',
        doseMaxDose: 500, doseMaxDia: 500, duracao: '2 a 5 dias, depois VO', faixaEtaria: '> 6 meses',
        obs: 'Infundir em 1 a 3 h (concentração 1 a 2 mg/mL). Confirmar conforme bula/protocolo.',
        verificar: true
      }
    ],
    diluicao: 'IV: reconstituir a 100 mg/mL e diluir em SF 0,9% ou SG 5% até 1 a 2 mg/mL.',
    infusao: 'IV: 1 mg/mL em 3 h ou 2 mg/mL em 1 h. Nunca em bolus.',
    contraindicacoes: ['Hipersensibilidade a macrolídeos', 'Hepatopatia prévia com azitromicina', 'Cautela em prolongamento de QT e hipopotassemia'],
    interacoes: ['Fármacos que prolongam QT (antiarrítmicos, antipsicóticos, ondansetrona, cloroquina)', 'Antiácidos com alumínio/magnésio (separar 2 h)', 'Varfarina', 'Digoxina', 'Ciclosporina'],
    ajusteRenal: 'Sem ajuste (cautela se ClCr < 10 mL/min).',
    ajusteHepatico: 'Cautela; evitar em hepatopatia grave.',
    efeitosAdversos: ['Diarreia, dor abdominal, náuseas', 'Prolongamento de QT', 'Hepatotoxicidade (rara)', 'Estenose hipertrófica de piloro em neonatos', 'Ototoxicidade reversível em doses altas'],
    fontes: [{nome: 'Guia de Vigilância em Saúde – MS', ano: 2024}, {nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}, {nome: 'AAP Red Book', ano: 2024}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'claritromicina',
    nome: 'Claritromicina',
    classe: 'Antibiótico – macrolídeo',
    apresentacoes: [
      {descricao: 'Suspensão oral 125 mg/5 mL (25 mg/mL)', mg: 125, ml: 5, tipo: 'suspensao', via: 'VO'},
      {descricao: 'Suspensão oral 250 mg/5 mL (50 mg/mL)', mg: 250, ml: 5, tipo: 'suspensao', via: 'VO'},
      {descricao: 'Comprimido 250 mg', mg: 250, ml: null, tipo: 'comprimido', via: 'VO'},
      {descricao: 'Comprimido 500 mg', mg: 500, ml: null, tipo: 'comprimido', via: 'VO'}
    ],
    indicacoes: ['Pneumonia atípica', 'Coqueluche (alternativa)', 'OMA e sinusite em alérgicos a penicilina', 'Faringotonsilite estreptocócica em alérgicos', 'Infecções por micobactérias não tuberculosas (adjuvante)', 'Erradicação de H. pylori'],
    doses: [
      {
        indicacao: 'Infecções respiratórias / OMA / coqueluche',
        mgKgDose: 7.5, mgKgDia: 15, vezesDia: 2, frequencia: '12/12 h', via: 'VO',
        doseMaxDose: 500, doseMaxDia: 1000, duracao: '7 a 10 dias (coqueluche: 7 dias)', faixaEtaria: '> 1 mês (coqueluche: > 1 mês; preferir azitromicina em < 1 mês)',
        obs: 'Pode ser administrado com ou sem alimento. Agitar bem a suspensão; não refrigerar (fica amarga e viscosa).'
      }
    ],
    diluicao: null,
    infusao: null,
    contraindicacoes: ['Hipersensibilidade a macrolídeos', 'Uso concomitante de ergotamina, cisaprida, pimozida, lovastatina/sinvastatina, colchicina', 'Prolongamento de QT / hipopotassemia', 'Insuficiência hepática grave com insuficiência renal'],
    interacoes: ['Inibidor potente de CYP3A4: aumenta níveis de carbamazepina, midazolam, tacrolimo, ciclosporina, teofilina, digoxina', 'Fármacos que prolongam QT', 'Rifampicina reduz níveis', 'Varfarina'],
    ajusteRenal: 'ClCr < 30 mL/min: reduzir dose em 50%.',
    ajusteHepatico: 'Sem ajuste isolado, se função renal normal.',
    efeitosAdversos: ['Gosto metálico', 'Náuseas, dor abdominal, diarreia', 'Cefaleia', 'Prolongamento de QT', 'Elevação de enzimas hepáticas'],
    fontes: [{nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}, {nome: 'Bula ANVISA – Claritromicina', ano: 2024}, {nome: 'Guia de Vigilância em Saúde – MS', ano: 2024}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'gentamicina',
    nome: 'Gentamicina',
    classe: 'Antibiótico – aminoglicosídeo',
    apresentacoes: [
      {descricao: 'Ampola 40 mg/mL (2 mL = 80 mg)', mg: 40, ml: 1, tipo: 'injetavel', via: 'IV/IM'},
      {descricao: 'Ampola pediátrica 10 mg/mL (2 mL = 20 mg)', mg: 10, ml: 1, tipo: 'injetavel', via: 'IV/IM'},
      {descricao: 'Ampola 80 mg/2 mL', mg: 80, ml: 2, tipo: 'injetavel', via: 'IV/IM'}
    ],
    indicacoes: ['Sepse neonatal (com ampicilina)', 'Pneumonia muito grave em lactentes (com ampicilina, OMS)', 'Pielonefrite / ITU complicada', 'Infecções por gram-negativos', 'Infecções intra-abdominais (associada)', 'Endocardite (sinergismo)'],
    doses: [
      {
        indicacao: 'Infecções em lactentes e crianças – dose única diária',
        mgKgDose: 7.5, mgKgDia: 7.5, vezesDia: 1, frequencia: '24/24 h', via: 'IV (preferencial) ou IM',
        doseMaxDose: null, doseMaxDia: null, duracao: '5 a 10 dias conforme quadro', faixaEtaria: '> 1 mês',
        obs: 'Faixa 5 a 7,5 mg/kg/dia em dose única (ou 2,5 mg/kg/dose 8/8 h). Infundir em 30 min. Monitorar função renal e níveis séricos (vale < 1 mcg/mL) se uso > 48 a 72 h. Adolescentes / adultos: 5 a 7 mg/kg/dia.'
      },
      {
        indicacao: 'Sepse neonatal (OMS/MS)',
        mgKgDose: 5, mgKgDia: 5, vezesDia: 1, frequencia: '24/24 h (a termo >= 7 dias de vida); 36/36 h a 48/48 h em prematuros ou < 7 dias conforme protocolo', via: 'IV ou IM',
        doseMaxDose: null, doseMaxDia: null, duracao: '7 a 10 dias', faixaEtaria: 'Neonatos',
        obs: 'RN a termo: 4 a 5 mg/kg/dose 24/24 h (OMS: 5 mg/kg/dia se >= 7 dias; 3 mg/kg/dia em baixo peso < 2 kg na primeira semana). Prematuros: intervalos mais longos (36 a 48 h) conforme idade gestacional. Confirmar conforme protocolo da unidade neonatal e dosar nível sérico.',
        verificar: true
      }
    ],
    diluicao: 'IV: diluir em SF 0,9% ou SG 5% (concentração 1 a 2 mg/mL em pediatria; até 10 mg/mL em neonatos). IM: sem diluição.',
    infusao: 'Infusão IV em 30 minutos (30 a 60 min em neonatos). Não misturar com penicilinas na mesma solução.',
    contraindicacoes: ['Hipersensibilidade a aminoglicosídeos', 'Miastenia gravis', 'Cautela em insuficiência renal, desidratação, uso de outros nefrotóxicos'],
    interacoes: ['Outros nefrotóxicos/ototóxicos (vancomicina, anfotericina B, furosemida, AINEs, cisplatina)', 'Bloqueadores neuromusculares (potencializa)', 'Penicilinas (inativação in vitro se misturados)'],
    ajusteRenal: 'Ajustar intervalo conforme ClCr e nível sérico (ClCr 40 a 60: 12/12 h a 24/24 h; 20 a 40: 24/24 h a 48/48 h; < 20: por nível sérico).',
    ajusteHepatico: 'Sem ajuste.',
    efeitosAdversos: ['Nefrotoxicidade (geralmente reversível)', 'Ototoxicidade (vestibular e coclear, irreversível)', 'Bloqueio neuromuscular', 'Exantema'],
    fontes: [{nome: 'OMS – Pocket Book of Hospital Care for Children', ano: 2013}, {nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}, {nome: 'Neofax / Pediatric & Neonatal Dosage Handbook', ano: 2023}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'oxacilina',
    nome: 'Oxacilina',
    classe: 'Antibiótico – penicilina antiestafilocócica',
    apresentacoes: [
      {descricao: 'Frasco-ampola 500 mg (pó)', mg: 500, ml: null, tipo: 'injetavel', via: 'IV/IM', reconstituicao: 'Reconstituir em 5 mL de água para injeção (100 mg/mL); IM: 2,7 mL (aprox. 167 mg/mL)'}
    ],
    indicacoes: ['Infecções por S. aureus sensível à meticilina (MSSA): celulite, abscesso, osteomielite, artrite séptica, pneumonia, endocardite, sepse'],
    doses: [
      {
        indicacao: 'Infecções moderadas (pele, partes moles)',
        mgKgDose: 25, mgKgDia: 100, vezesDia: 4, frequencia: '6/6 h', via: 'IV ou IM',
        doseMaxDose: 2000, doseMaxDia: 8000, duracao: 'Conforme quadro (7 a 14 dias)', faixaEtaria: '> 1 mês',
        obs: 'Faixa 100 a 150 mg/kg/dia divididos 6/6 h.'
      },
      {
        indicacao: 'Infecções graves (osteomielite, artrite séptica, endocardite, pneumonia, sepse)',
        mgKgDose: 50, mgKgDia: 200, vezesDia: 4, frequencia: '6/6 h (até 4/4 h)', via: 'IV',
        doseMaxDose: 2000, doseMaxDia: 12000, duracao: 'Osteomielite: 4 a 6 semanas (parte VO); endocardite: 4 a 6 semanas', faixaEtaria: '> 1 mês',
        obs: 'Faixa 150 a 200 mg/kg/dia (máximo 12 g/dia).'
      },
      {
        indicacao: 'Infecções neonatais',
        mgKgDose: 25, mgKgDia: 50, vezesDia: 2, frequencia: '12/12 h (<= 7 dias de vida); 8/8 h (8 a 28 dias)', via: 'IV',
        doseMaxDose: null, doseMaxDia: null, duracao: 'Conforme quadro', faixaEtaria: 'Neonatos',
        obs: '25 mg/kg/dose; em meningite neonatal 50 mg/kg/dose. Intervalos conforme idade gestacional e pós-natal; confirmar conforme protocolo neonatal.'
      }
    ],
    diluicao: 'IV: reconstituir a 100 mg/mL e diluir em SF 0,9% ou SG 5% até 10 a 40 mg/mL.',
    infusao: 'Infusão IV em 15 a 30 minutos (bolus lento em 10 min aceito).',
    contraindicacoes: ['Hipersensibilidade a penicilinas'],
    interacoes: ['Probenecida', 'Varfarina (pode reduzir efeito)', 'Metotrexato', 'Aminoglicosídeos (não misturar)'],
    ajusteRenal: 'Sem ajuste.',
    ajusteHepatico: 'Cautela em hepatopatia (hepatotoxicidade) ; sem ajuste definido.',
    efeitosAdversos: ['Flebite (comum)', 'Hepatite / elevação de transaminases (dose alta, uso prolongado)', 'Neutropenia (uso prolongado)', 'Exantema', 'Nefrite intersticial (rara)'],
    fontes: [{nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}, {nome: 'Bula ANVISA – Oxacilina sódica', ano: 2024}, {nome: 'Neofax / Pediatric & Neonatal Dosage Handbook', ano: 2023}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'vancomicina',
    nome: 'Vancomicina',
    classe: 'Antibiótico – glicopeptídeo',
    apresentacoes: [
      {descricao: 'Frasco-ampola 500 mg (pó)', mg: 500, ml: null, tipo: 'injetavel', via: 'IV', reconstituicao: 'Reconstituir em 10 mL de água para injeção (50 mg/mL); diluir até <= 5 mg/mL'},
      {descricao: 'Frasco-ampola 1 g (pó)', mg: 1000, ml: null, tipo: 'injetavel', via: 'IV', reconstituicao: 'Reconstituir em 20 mL de água para injeção (50 mg/mL); diluir até <= 5 mg/mL'}
    ],
    indicacoes: ['Infecções por S. aureus resistente à meticilina (MRSA)', 'Meningite bacteriana (empírico, com cefalosporina de 3ª geração)', 'Sepse com cateter / infecções por estafilococo coagulase-negativo', 'Infecção por enterococo resistente à ampicilina', 'Colite por C. difficile (VO)'],
    doses: [
      {
        indicacao: 'Infecções graves / meningite / MRSA – lactentes e crianças',
        mgKgDose: 15, mgKgDia: 60, vezesDia: 4, frequencia: '6/6 h', via: 'IV',
        doseMaxDose: 1000, doseMaxDia: 4000, duracao: 'Conforme quadro (bacteremia MRSA: >= 14 dias)', faixaEtaria: '> 1 mês',
        obs: 'Faixa 40 a 60 mg/kg/dia divididos 6/6 h a 8/8 h; dose inicial máxima 1 g/dose, ajustar pelo nível sérico de vale (10 a 15 mcg/mL; 15 a 20 em meningite, pneumonia, osteomielite e bacteremia) ou AUC/MIC. Infundir em ao menos 60 min. Monitorar função renal.'
      },
      {
        indicacao: 'Infecções neonatais',
        mgKgDose: 15, mgKgDia: 30, vezesDia: 2, frequencia: '12/12 h (<= 7 dias); 8/8 h (8 a 28 dias, a termo)', via: 'IV',
        doseMaxDose: null, doseMaxDia: null, duracao: 'Conforme quadro', faixaEtaria: 'Neonatos',
        obs: '10 a 15 mg/kg/dose; intervalos conforme idade gestacional/pós-natal e função renal. Confirmar conforme protocolo neonatal e nível sérico.',
        verificar: true
      },
      {
        indicacao: 'Colite por C. difficile (VO)',
        mgKgDose: 10, mgKgDia: 40, vezesDia: 4, frequencia: '6/6 h', via: 'VO',
        doseMaxDose: 125, doseMaxDia: 500, duracao: '10 dias', faixaEtaria: 'Todas as idades',
        obs: 'Preparar solução oral a partir do pó injetável (não absorvida). Máximo 125 mg/dose (até 500 mg/dose em colite fulminante).'
      }
    ],
    diluicao: 'Reconstituir a 50 mg/mL; diluir em SF 0,9% ou SG 5% até concentração <= 5 mg/mL (10 mg/mL em restrição hídrica com acesso central).',
    infusao: 'Infusão IV em ao menos 60 minutos (máximo 10 mg/min); prolongar para 2 h se síndrome do homem vermelho.',
    contraindicacoes: ['Hipersensibilidade', 'Cautela em insuficiência renal e uso de outros nefrotóxicos'],
    interacoes: ['Aminoglicosídeos, anfotericina B, piperacilina-tazobactam, AINEs (nefrotoxicidade)', 'Bloqueadores neuromusculares', 'Diuréticos de alça (ototoxicidade)'],
    ajusteRenal: 'Ajustar intervalo conforme ClCr e nível sérico (ClCr 50 a 80: 12/12 h a 24/24 h; 10 a 50: 24/24 h a 96/96 h; < 10: por nível). Manter dose de ataque.',
    ajusteHepatico: 'Sem ajuste.',
    efeitosAdversos: ['Síndrome do homem vermelho (infusão rápida)', 'Nefrotoxicidade', 'Ototoxicidade', 'Flebite', 'Neutropenia, trombocitopenia (uso prolongado)', 'DRESS (rara)'],
    fontes: [{nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}, {nome: 'IDSA/ASHP – Vancomycin Therapeutic Monitoring Guideline', ano: 2020}, {nome: 'Neofax / Pediatric & Neonatal Dosage Handbook', ano: 2023}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'metronidazol',
    nome: 'Metronidazol',
    classe: 'Antimicrobiano – nitroimidazol (antiprotozoário e anaerobicida)',
    apresentacoes: [
      {descricao: 'Suspensão oral 40 mg/mL (benzoilmetronidazol, 200 mg/5 mL)', mg: 40, ml: 1, tipo: 'suspensao', via: 'VO'},
      {descricao: 'Comprimido 250 mg', mg: 250, ml: null, tipo: 'comprimido', via: 'VO'},
      {descricao: 'Comprimido 400 mg', mg: 400, ml: null, tipo: 'comprimido', via: 'VO'},
      {descricao: 'Solução injetável 500 mg/100 mL (5 mg/mL)', mg: 500, ml: 100, tipo: 'injetavel', via: 'IV'}
    ],
    indicacoes: ['Giardíase', 'Amebíase intestinal e abscesso hepático amebiano', 'Infecções por anaeróbios (intra-abdominal, abscesso cerebral, aspiração)', 'Colite por C. difficile (leve, alternativa)', 'Vaginose bacteriana / tricomoníase', 'Erradicação de H. pylori'],
    doses: [
      {
        indicacao: 'Giardíase',
        mgKgDose: 5, mgKgDia: 15, vezesDia: 3, frequencia: '8/8 h', via: 'VO',
        doseMaxDose: 250, doseMaxDia: 750, duracao: '5 a 7 dias', faixaEtaria: 'Todas as idades',
        obs: '15 mg/kg/dia divididos em 3 tomadas por 5 dias (MS). Administrar com alimento para reduzir intolerância gástrica.'
      },
      {
        indicacao: 'Amebíase intestinal / abscesso hepático amebiano',
        mgKgDose: 12.5, mgKgDia: 37.5, vezesDia: 3, frequencia: '8/8 h', via: 'VO (ou IV se grave)',
        doseMaxDose: 750, doseMaxDia: 2250, duracao: '7 a 10 dias (abscesso: 10 dias)', faixaEtaria: 'Todas as idades',
        obs: 'Faixa 35 a 50 mg/kg/dia divididos em 3 tomadas (máximo 750 mg/dose). Seguir com amebicida luminal (teclozana ou etofamida) conforme protocolo.'
      },
      {
        indicacao: 'Infecções por anaeróbios – IV ou VO',
        mgKgDose: 7.5, mgKgDia: 30, vezesDia: 4, frequencia: '6/6 h (ou 10 mg/kg 8/8 h)', via: 'IV ou VO',
        doseMaxDose: 500, doseMaxDia: 4000, duracao: 'Conforme quadro (7 a 14 dias)', faixaEtaria: '> 1 mês (neonatos: dose de ataque 15 mg/kg, depois 7,5 mg/kg 12/12 h a 24/24 h)',
        obs: '30 mg/kg/dia divididos 6/6 h a 8/8 h (máximo 4 g/dia). Dose de ataque de 15 mg/kg pode ser usada em infecção grave. Infusão IV em 30 a 60 min.'
      }
    ],
    diluicao: 'IV: solução pronta 5 mg/mL; não diluir adicionalmente. Proteger da luz.',
    infusao: 'Infusão IV em 30 a 60 minutos.',
    contraindicacoes: ['Hipersensibilidade a nitroimidazóis', 'Primeiro trimestre de gestação (relativa)', 'Uso de álcool (efeito dissulfiram)', 'Cautela em doença neurológica e discrasias sanguíneas'],
    interacoes: ['Álcool (reação tipo dissulfiram)', 'Varfarina (aumenta INR)', 'Fenobarbital e fenitoína (reduzem níveis de metronidazol)', 'Lítio (aumenta níveis)', 'Bussulfano, ciclosporina'],
    ajusteRenal: 'Sem ajuste; em diálise, administrar após a sessão.',
    ajusteHepatico: 'Insuficiência hepática grave: reduzir dose em 50%.',
    efeitosAdversos: ['Gosto metálico', 'Náuseas, dor abdominal', 'Urina escura', 'Neuropatia periférica (uso prolongado)', 'Convulsões, encefalopatia (raro, doses altas)', 'Neutropenia reversível'],
    fontes: [{nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}, {nome: 'Guia de Vigilância em Saúde – MS', ano: 2024}, {nome: 'Bula ANVISA – Metronidazol', ano: 2024}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'nitrofurantoina',
    nome: 'Nitrofurantoína',
    classe: 'Antibiótico urinário – nitrofurano',
    apresentacoes: [
      {descricao: 'Cápsula 100 mg', mg: 100, ml: null, tipo: 'comprimido', via: 'VO'},
      {descricao: 'Suspensão oral 5 mg/mL (25 mg/5 mL)', mg: 5, ml: 1, tipo: 'suspensao', via: 'VO'}
    ],
    indicacoes: ['Cistite (ITU baixa) não complicada', 'Profilaxia de ITU recorrente / refluxo vesicoureteral'],
    doses: [
      {
        indicacao: 'Cistite (tratamento)',
        mgKgDose: 1.5, mgKgDia: 6, vezesDia: 4, frequencia: '6/6 h', via: 'VO',
        doseMaxDose: 100, doseMaxDia: 400, duracao: '7 dias', faixaEtaria: '> 1 mês',
        obs: 'Faixa 5 a 7 mg/kg/dia divididos 6/6 h (máximo 400 mg/dia). Não usar em pielonefrite ou suspeita de infecção sistêmica (não atinge níveis teciduais). Administrar com alimento. Contraindicada em < 1 mês e em deficiência de G6PD.'
      },
      {
        indicacao: 'Profilaxia de ITU',
        mgKgDose: 1.5, mgKgDia: 1.5, vezesDia: 1, frequencia: '1x/dia (à noite)', via: 'VO',
        doseMaxDose: 100, doseMaxDia: 100, duracao: 'Conforme indicação nefrológica/urológica', faixaEtaria: '> 1 mês',
        obs: 'Faixa 1 a 2 mg/kg/dia em dose única noturna (máximo 100 mg/dia).'
      }
    ],
    diluicao: null,
    infusao: null,
    contraindicacoes: ['Menores de 1 mês', 'Deficiência de G6PD', 'Insuficiência renal (ClCr < 30 a 60 mL/min)', 'Pielonefrite / infecção sistêmica', 'Neuropatia periférica ou pneumopatia prévia por nitrofurantoína', 'Gestantes a termo (36 a 42 semanas)'],
    interacoes: ['Antiácidos com magnésio (reduzem absorção)', 'Probenecida (reduz eficácia urinária)', 'Quinolonas (antagonismo)'],
    ajusteRenal: 'Contraindicada se ClCr < 30 mL/min (ineficaz e tóxica).',
    ajusteHepatico: 'Evitar em hepatopatia (hepatotoxicidade).',
    efeitosAdversos: ['Náuseas, vômitos (menor com alimento)', 'Urina castanha', 'Reações pulmonares agudas ou crônicas (fibrose)', 'Neuropatia periférica', 'Hemólise em deficiência de G6PD', 'Hepatite (rara)'],
    fontes: [{nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}, {nome: 'SBP – Documento científico: Infecção do trato urinário', ano: 2021}, {nome: 'Bula ANVISA – Nitrofurantoína', ano: 2024}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'sulfametoxazol_trimetoprim',
    nome: 'Sulfametoxazol + trimetoprima (SMX-TMP)',
    classe: 'Antibiótico – sulfonamida + inibidor da di-hidrofolato redutase',
    apresentacoes: [
      {descricao: 'Suspensão oral 200 mg SMX + 40 mg TMP/5 mL (mg refere-se à trimetoprima: 8 mg/mL)', mg: 40, ml: 5, tipo: 'suspensao', via: 'VO'},
      {descricao: 'Comprimido 400 mg SMX + 80 mg TMP (mg refere-se à trimetoprima)', mg: 80, ml: null, tipo: 'comprimido', via: 'VO'},
      {descricao: 'Comprimido 800 mg SMX + 160 mg TMP (mg refere-se à trimetoprima)', mg: 160, ml: null, tipo: 'comprimido', via: 'VO'},
      {descricao: 'Ampola 400 mg SMX + 80 mg TMP/5 mL (mg refere-se à trimetoprima: 16 mg/mL)', mg: 80, ml: 5, tipo: 'injetavel', via: 'IV'}
    ],
    indicacoes: ['ITU (tratamento e profilaxia)', 'Otite média aguda (alternativa)', 'Infecções de pele por MRSA comunitário', 'Pneumocistose (tratamento e profilaxia)', 'Shigelose, salmonelose (se sensível)', 'Toxoplasmose (alternativa)', 'Isosporíase, ciclosporíase'],
    doses: [
      {
        indicacao: 'ITU / OMA / infecções leves a moderadas',
        mgKgDose: 4, mgKgDia: 8, vezesDia: 2, frequencia: '12/12 h', via: 'VO',
        doseMaxDose: 160, doseMaxDia: 320, duracao: 'ITU: 7 a 10 dias; OMA: 10 dias', faixaEtaria: '> 2 meses',
        obs: 'Dose em trimetoprima (TMP): 8 a 10 mg/kg/dia divididos 12/12 h (máximo 160 mg TMP/dose). Contraindicado em < 2 meses (kernicterus). Hidratar bem. Infecções por MRSA comunitário: 10 a 12 mg/kg/dia de TMP.'
      },
      {
        indicacao: 'Pneumocistose (tratamento)',
        mgKgDose: 5, mgKgDia: 20, vezesDia: 4, frequencia: '6/6 h', via: 'IV ou VO',
        doseMaxDose: 320, doseMaxDia: 1280, duracao: '21 dias', faixaEtaria: '> 2 meses',
        obs: 'Dose em TMP: 15 a 20 mg/kg/dia divididos 6/6 h a 8/8 h. Associar corticoide em hipoxemia moderada a grave conforme protocolo.'
      },
      {
        indicacao: 'Profilaxia de pneumocistose / ITU',
        mgKgDose: 2.5, mgKgDia: 5, vezesDia: 2, frequencia: '12/12 h, 3 dias consecutivos por semana (PCP) ou 1x/dia à noite (ITU: 2 mg/kg/dia de TMP)', via: 'VO',
        doseMaxDose: 160, doseMaxDia: 320, duracao: 'Conforme indicação', faixaEtaria: '> 2 meses',
        obs: 'PCP: 5 mg/kg/dia de TMP (ou 150 mg/m2/dia) em 1 ou 2 tomadas, 3 dias por semana (máximo 320 mg/dia). ITU: 2 mg/kg/dia de TMP em dose única noturna.'
      }
    ],
    diluicao: 'IV: diluir cada 5 mL (80 mg TMP) em 125 mL de SG 5% (75 mL em restrição hídrica); usar em até 6 h.',
    infusao: 'Infusão IV em 60 a 90 minutos. Não administrar em bolus ou IM.',
    contraindicacoes: ['Menores de 2 meses', 'Hipersensibilidade a sulfonamidas ou trimetoprima', 'Anemia megaloblástica por deficiência de folato', 'Insuficiência renal grave sem monitorização', 'Porfiria', 'Gestação a termo'],
    interacoes: ['Varfarina (aumenta INR)', 'Metotrexato (toxicidade)', 'Fenitoína (aumenta níveis)', 'IECA, espironolactona (hiperpotassemia)', 'Sulfonilureias (hipoglicemia)', 'Ciclosporina (nefrotoxicidade)'],
    ajusteRenal: 'ClCr 15 a 30 mL/min: 50% da dose; ClCr < 15 mL/min: evitar.',
    ajusteHepatico: 'Evitar em hepatopatia grave.',
    efeitosAdversos: ['Exantema, síndrome de Stevens-Johnson', 'Náuseas, vômitos', 'Neutropenia, trombocitopenia, anemia megaloblástica', 'Hiperpotassemia', 'Hemólise em deficiência de G6PD', 'Cristalúria, nefrite intersticial', 'Hepatite (rara)'],
    fontes: [{nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}, {nome: 'AAP Red Book', ano: 2024}, {nome: 'Bula ANVISA – Sulfametoxazol + trimetoprima', ano: 2024}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'doxiciclina',
    nome: 'Doxiciclina',
    classe: 'Antibiótico – tetraciclina',
    apresentacoes: [
      {descricao: 'Comprimido ou cápsula 100 mg', mg: 100, ml: null, tipo: 'comprimido', via: 'VO'}
    ],
    indicacoes: ['Leptospirose (forma leve, > 8 anos)', 'Febre maculosa (qualquer idade, pelo risco de morte)', 'Malária por P. falciparum (associada, alternativa)', 'Pneumonia atípica e infecções por Chlamydia em adolescentes', 'Acne moderada a grave', 'Cólera, brucelose, riquetsioses, erliquiose'],
    doses: [
      {
        indicacao: 'Infecções em geral (leptospirose, riquetsioses, pneumonia atípica)',
        mgKgDose: 2.2, mgKgDia: 4.4, vezesDia: 2, frequencia: '12/12 h', via: 'VO (ou IV)',
        doseMaxDose: 100, doseMaxDia: 200, duracao: 'Leptospirose: 5 a 7 dias; febre maculosa: até 3 dias após afebril (mínimo 7 dias); demais 7 a 14 dias', faixaEtaria: '> 8 anos (febre maculosa: qualquer idade, ciclo curto)',
        obs: 'Dose 2 a 2,2 mg/kg/dose 12/12 h (máximo 100 mg/dose; > 45 kg: 100 mg 12/12 h). Contraindicada em < 8 anos pelo risco de pigmentação dentária, exceto febre maculosa / riquetsioses (AAP: ciclos curtos são seguros em qualquer idade). Administrar com bastante líquido, sentado, evitar deitar por 30 min. Fotossensibilidade: proteção solar.'
      },
      {
        indicacao: 'Quimioprofilaxia de leptospirose (exposição de alto risco)',
        mgKgDose: null, mgKgDia: null, vezesDia: 1, frequencia: '1x/semana', via: 'VO',
        doseMaxDose: 200, doseMaxDia: 200, duracao: 'Durante o período de exposição', faixaEtaria: '> 8 anos',
        doseFixa: '200 mg VO 1x/semana (adultos e > 8 anos)',
        obs: 'Dose fixa 200 mg semanal em adultos; uso em crianças > 8 anos: confirmar conforme protocolo (Guia de Vigilância em Saúde).',
        verificar: true
      }
    ],
    diluicao: 'IV (quando disponível): diluir em SF 0,9% ou SG 5% a 0,1 a 1 mg/mL.',
    infusao: 'IV: infundir em 1 a 4 horas. Proteger da luz.',
    contraindicacoes: ['Menores de 8 anos (exceto riquetsioses / febre maculosa)', 'Gestantes e lactantes', 'Hipersensibilidade a tetraciclinas', 'Insuficiência hepática grave'],
    interacoes: ['Antiácidos, ferro, cálcio, zinco, magnésio (quelação; separar 2 a 3 h)', 'Varfarina', 'Barbitúricos, fenitoína, carbamazepina, rifampicina (reduzem níveis)', 'Isotretinoína (hipertensão intracraniana)', 'Penicilinas (antagonismo teórico)'],
    ajusteRenal: 'Sem ajuste (eliminação fecal).',
    ajusteHepatico: 'Cautela; evitar em hepatopatia grave.',
    efeitosAdversos: ['Fotossensibilidade', 'Esofagite, úlcera esofágica', 'Náuseas, diarreia', 'Pigmentação dentária e hipoplasia de esmalte (< 8 anos)', 'Hipertensão intracraniana benigna', 'Hepatotoxicidade (rara)'],
    fontes: [{nome: 'Guia de Vigilância em Saúde – MS', ano: 2024}, {nome: 'AAP Red Book', ano: 2024}, {nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}],
    atualizadoEm: '2026-09',
    verificar: false
  },

  // ===================== ANTIPARASITÁRIOS =====================
  {
    id: 'albendazol',
    nome: 'Albendazol',
    classe: 'Anti-helmíntico – benzimidazol',
    apresentacoes: [
      {descricao: 'Suspensão oral 40 mg/mL (400 mg/10 mL)', mg: 40, ml: 1, tipo: 'suspensao', via: 'VO'},
      {descricao: 'Comprimido mastigável 400 mg', mg: 400, ml: null, tipo: 'comprimido', via: 'VO'}
    ],
    indicacoes: ['Ascaridíase, ancilostomíase, tricuríase, enterobíase (oxiuríase)', 'Estrongiloidíase (alternativa à ivermectina)', 'Giardíase (alternativa)', 'Larva migrans cutânea', 'Neurocisticercose', 'Hidatidose', 'Tratamento em massa / desparasitação escolar (MS)'],
    doses: [
      {
        indicacao: 'Geo-helmintíases (ascaridíase, ancilostomíase, tricuríase, enterobíase) – dose única',
        mgKgDose: null, mgKgDia: null, vezesDia: 1, frequencia: 'Dose única', via: 'VO',
        doseMaxDose: 400, doseMaxDia: 400, duracao: 'Dose única (tricuríase: 3 dias; enterobíase: repetir em 2 semanas)', faixaEtaria: '> 1 ano (12 a 23 meses: 200 mg; >= 2 anos: 400 mg)',
        doseFixa: '12 a 23 meses: 200 mg dose única; >= 2 anos: 400 mg dose única',
        faixasIdade: '12 a 23 meses: 200 mg; >= 24 meses: 400 mg',
        obs: 'Dose fixa por idade: 200 mg (12 a 23 meses) ou 400 mg (>= 2 anos). Tricuríase intensa: 400 mg/dia por 3 dias. Enterobíase: repetir em 2 semanas e tratar contactantes. Administrar com alimento gorduroso para melhor absorção em parasitoses teciduais. Não recomendado em < 1 ano (uso off label: confirmar).'
      },
      {
        indicacao: 'Estrongiloidíase / larva migrans cutânea / giardíase',
        mgKgDose: null, mgKgDia: null, vezesDia: 1, frequencia: '1x/dia', via: 'VO',
        doseMaxDose: 400, doseMaxDia: 400, duracao: '3 dias (estrongiloidíase e larva migrans); 5 dias (giardíase)', faixaEtaria: '> 2 anos',
        doseFixa: '400 mg 1x/dia',
        obs: 'Dose fixa 400 mg/dia. Estrongiloidíase: ivermectina é a primeira escolha. Giardíase: 400 mg/dia por 5 dias (alternativa ao metronidazol).'
      },
      {
        indicacao: 'Neurocisticercose (parenquimatosa)',
        mgKgDose: 7.5, mgKgDia: 15, vezesDia: 2, frequencia: '12/12 h', via: 'VO',
        doseMaxDose: 400, doseMaxDia: 800, duracao: '8 a 30 dias conforme protocolo', faixaEtaria: '> 2 anos',
        obs: '15 mg/kg/dia divididos 12/12 h (máximo 800 mg/dia) com alimento gorduroso. Iniciar corticoide antes (edema cerebral) e avaliar exame de fundo de olho (cisticercose ocular contraindica). Confirmar conforme protocolo de neurologia.',
        verificar: true
      }
    ],
    diluicao: null,
    infusao: null,
    contraindicacoes: ['Hipersensibilidade a benzimidazóis', 'Gestação (primeiro trimestre)', 'Cisticercose ocular ou retiniana', 'Menores de 1 ano (relativa)'],
    interacoes: ['Dexametasona, praziquantel e cimetidina aumentam níveis do metabólito ativo', 'Fenitoína, carbamazepina, fenobarbital reduzem níveis'],
    ajusteRenal: 'Sem ajuste.',
    ajusteHepatico: 'Cautela; monitorar transaminases em tratamentos prolongados.',
    efeitosAdversos: ['Dor abdominal, náuseas', 'Cefaleia', 'Elevação transitória de transaminases', 'Leucopenia (tratamentos prolongados)', 'Alopecia reversível (raro)'],
    fontes: [{nome: 'OMS – Preventive chemotherapy: soil-transmitted helminthiases', ano: 2017}, {nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}, {nome: 'Guia de Vigilância em Saúde – MS', ano: 2024}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'mebendazol',
    nome: 'Mebendazol',
    classe: 'Anti-helmíntico – benzimidazol',
    apresentacoes: [
      {descricao: 'Suspensão oral 100 mg/5 mL (20 mg/mL)', mg: 100, ml: 5, tipo: 'suspensao', via: 'VO'},
      {descricao: 'Comprimido 100 mg', mg: 100, ml: null, tipo: 'comprimido', via: 'VO'},
      {descricao: 'Comprimido mastigável 500 mg', mg: 500, ml: null, tipo: 'comprimido', via: 'VO'}
    ],
    indicacoes: ['Ascaridíase, ancilostomíase, tricuríase, enterobíase'],
    doses: [
      {
        indicacao: 'Geo-helmintíases – esquema de 3 dias',
        mgKgDose: null, mgKgDia: null, vezesDia: 2, frequencia: '12/12 h', via: 'VO',
        doseMaxDose: 100, doseMaxDia: 200, duracao: '3 dias (enterobíase: dose única de 100 mg, repetir em 2 semanas)', faixaEtaria: '> 1 ano (bula: > 2 anos)',
        doseFixa: '100 mg 12/12 h por 3 dias, independente do peso',
        obs: 'Dose fixa de 100 mg 12/12 h por 3 dias (independente do peso). Enterobíase: 100 mg dose única, repetir em 2 semanas. Bula recomenda > 2 anos; OMS aceita a partir de 12 meses em programas de desparasitação. Baixa absorção sistêmica.'
      },
      {
        indicacao: 'Geo-helmintíases – dose única (desparasitação)',
        mgKgDose: null, mgKgDia: null, vezesDia: 1, frequencia: 'Dose única', via: 'VO',
        doseMaxDose: 500, doseMaxDia: 500, duracao: 'Dose única', faixaEtaria: '> 1 ano',
        doseFixa: '500 mg dose única',
        obs: 'Comprimido mastigável de 500 mg em dose única (OMS). Menor eficácia em ancilostomíase e tricuríase que o esquema de 3 dias.'
      }
    ],
    diluicao: null,
    infusao: null,
    contraindicacoes: ['Hipersensibilidade', 'Gestação (primeiro trimestre)', 'Menores de 1 ano'],
    interacoes: ['Metronidazol (relato de Stevens-Johnson na associação)', 'Carbamazepina, fenitoína (reduzem níveis)', 'Cimetidina (aumenta níveis)'],
    ajusteRenal: 'Sem ajuste.',
    ajusteHepatico: 'Cautela em hepatopatia.',
    efeitosAdversos: ['Dor abdominal, diarreia (em infestação intensa)', 'Cefaleia', 'Exantema (raro)', 'Neutropenia (doses altas prolongadas)'],
    fontes: [{nome: 'OMS – Preventive chemotherapy: soil-transmitted helminthiases', ano: 2017}, {nome: 'Bula ANVISA – Mebendazol', ano: 2024}, {nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'ivermectina',
    nome: 'Ivermectina',
    classe: 'Antiparasitário – avermectina',
    apresentacoes: [
      {descricao: 'Comprimido 6 mg', mg: 6, ml: null, tipo: 'comprimido', via: 'VO'},
      {descricao: 'Comprimido 3 mg', mg: 3, ml: null, tipo: 'comprimido', via: 'VO'}
    ],
    indicacoes: ['Estrongiloidíase', 'Escabiose (inclusive crostosa, associada a tratamento tópico)', 'Pediculose refratária', 'Larva migrans cutânea', 'Oncocercose, filariose (em programas específicos)'],
    doses: [
      {
        indicacao: 'Estrongiloidíase',
        mgKgDose: 0.2, mgKgDia: 0.2, vezesDia: 1, frequencia: '1x/dia', via: 'VO',
        doseMaxDose: 24, doseMaxDia: 24, duracao: '1 a 2 dias (hiperinfecção: até negativar exames, conforme protocolo)', faixaEtaria: '>= 15 kg (ou > 5 anos)',
        obs: '200 mcg/kg/dose (0,2 mg/kg). Esquema prático: 15 a 24 kg: meio comprimido de 6 mg; 25 a 35 kg: 1 comprimido; 36 a 50 kg: 1,5 comprimido; 51 a 65 kg: 2 comprimidos. Não recomendada em < 15 kg (bula) pela imaturidade da barreira hematoencefálica. Administrar em jejum com água.'
      },
      {
        indicacao: 'Escabiose / pediculose',
        mgKgDose: 0.2, mgKgDia: 0.2, vezesDia: 1, frequencia: 'Dose única; repetir em 7 a 14 dias', via: 'VO',
        doseMaxDose: 24, doseMaxDia: 24, duracao: '2 doses (D1 e D8 a D14); escabiose crostosa: até 3 a 7 doses conforme protocolo', faixaEtaria: '>= 15 kg (ou > 5 anos)',
        obs: '200 mcg/kg/dose. Tratar contactantes domiciliares simultaneamente. Em < 15 kg, usar permetrina tópica.'
      }
    ],
    diluicao: null,
    infusao: null,
    contraindicacoes: ['Peso < 15 kg (ou < 5 anos, conforme bula)', 'Gestação e lactação (relativa)', 'Hipersensibilidade', 'Doenças com comprometimento da barreira hematoencefálica (meningite)'],
    interacoes: ['Varfarina (aumento de INR)', 'Inibidores de P-glicoproteína (potencial aumento de níveis no SNC)'],
    ajusteRenal: 'Sem ajuste.',
    ajusteHepatico: 'Sem ajuste definido; cautela.',
    efeitosAdversos: ['Prurido, exantema transitório (reação à morte de parasitas)', 'Tontura, cefaleia', 'Dor abdominal, náuseas', 'Reação de Mazzotti em oncocercose', 'Encefalopatia em coinfecção por Loa loa (África)'],
    fontes: [{nome: 'Bula ANVISA – Ivermectina', ano: 2024}, {nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}, {nome: 'CDC – Parasites: Strongyloides, Scabies (treatment)', ano: 2024}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'praziquantel',
    nome: 'Praziquantel',
    classe: 'Anti-helmíntico – pirazinoisoquinolina (trematódeos e cestódeos)',
    apresentacoes: [
      {descricao: 'Comprimido 600 mg', mg: 600, ml: null, tipo: 'comprimido', via: 'VO'},
      {descricao: 'Comprimido 150 mg', mg: 150, ml: null, tipo: 'comprimido', via: 'VO'}
    ],
    indicacoes: ['Esquistossomose mansônica', 'Teníase (T. solium e T. saginata)', 'Himenolepíase', 'Neurocisticercose (alternativa/associação)', 'Outras trematodíases'],
    doses: [
      {
        indicacao: 'Esquistossomose – crianças (até 15 anos)',
        mgKgDose: 60, mgKgDia: 60, vezesDia: 1, frequencia: 'Dose única', via: 'VO',
        doseMaxDose: null, doseMaxDia: null, duracao: 'Dose única', faixaEtaria: '> 2 anos (até 15 anos: 60 mg/kg; adultos: 50 mg/kg)',
        obs: 'MS: crianças até 15 anos 60 mg/kg dose única; adultos 50 mg/kg. Pode ser dividida em 2 tomadas com intervalo de 4 h (reduz efeitos adversos). Administrar após refeição. Contraindicada em cisticercose ocular. Os comprimidos são sulcados para fracionamento.'
      },
      {
        indicacao: 'Teníase',
        mgKgDose: 10, mgKgDia: 10, vezesDia: 1, frequencia: 'Dose única', via: 'VO',
        doseMaxDose: 600, doseMaxDia: 600, duracao: 'Dose única', faixaEtaria: '> 2 anos',
        obs: '5 a 10 mg/kg dose única. Himenolepíase: 25 mg/kg dose única. Avaliar risco de cisticercose associada em T. solium.'
      }
    ],
    diluicao: null,
    infusao: null,
    contraindicacoes: ['Cisticercose ocular ou medular', 'Hipersensibilidade', 'Gestação (primeiro trimestre, relativa)', 'Cautela em < 2 anos (segurança não estabelecida)'],
    interacoes: ['Indutores de CYP3A4 (rifampicina, carbamazepina, fenitoína, dexametasona) reduzem níveis', 'Cimetidina, cetoconazol aumentam níveis', 'Cloroquina reduz biodisponibilidade'],
    ajusteRenal: 'Sem ajuste.',
    ajusteHepatico: 'Reduzir dose em hepatopatia grave (esquistossomose hepatoesplênica: cautela, monitorar).',
    efeitosAdversos: ['Dor abdominal, náuseas, vômitos', 'Cefaleia, tontura, sonolência', 'Febre, urticária (reação à morte de parasitas)', 'Elevação transitória de transaminases'],
    fontes: [{nome: 'Guia de Vigilância em Saúde – MS', ano: 2024}, {nome: 'Vigilância da Esquistossomose Mansoni: diretrizes técnicas – MS', ano: 2014}, {nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'nitazoxanida',
    nome: 'Nitazoxanida',
    classe: 'Antiparasitário de amplo espectro – tiazolida',
    apresentacoes: [
      {descricao: 'Suspensão oral 20 mg/mL (100 mg/5 mL)', mg: 20, ml: 1, tipo: 'suspensao', via: 'VO'},
      {descricao: 'Comprimido 500 mg', mg: 500, ml: null, tipo: 'comprimido', via: 'VO'}
    ],
    indicacoes: ['Giardíase', 'Criptosporidíase (imunocompetentes)', 'Amebíase intestinal', 'Helmintíases intestinais e teníase (alternativa)', 'Diarreia por rotavírus (evidência limitada)'],
    doses: [
      {
        indicacao: 'Giardíase / criptosporidíase / amebíase / helmintíases',
        mgKgDose: 7.5, mgKgDia: 15, vezesDia: 2, frequencia: '12/12 h', via: 'VO',
        doseMaxDose: 500, doseMaxDia: 1000, duracao: '3 dias', faixaEtaria: '>= 1 ano',
        faixasIdade: '1 a 3 anos: 100 mg 12/12 h; 4 a 11 anos: 200 mg 12/12 h; >= 12 anos: 500 mg 12/12 h',
        obs: 'Dose por faixa etária (bula): 1 a 3 anos 100 mg (5 mL) 12/12 h; 4 a 11 anos 200 mg (10 mL) 12/12 h; >= 12 anos 500 mg 12/12 h, por 3 dias. Equivale a aproximadamente 7,5 mg/kg/dose. Administrar com alimento. Não recomendada em < 1 ano.'
      }
    ],
    diluicao: null,
    infusao: null,
    contraindicacoes: ['Hipersensibilidade', 'Menores de 1 ano', 'Gestação (relativa)'],
    interacoes: ['Fármacos com alta ligação proteica (varfarina, fenitoína): cautela'],
    ajusteRenal: 'Sem dados; cautela.',
    ajusteHepatico: 'Sem dados; cautela.',
    efeitosAdversos: ['Dor abdominal, diarreia, náuseas', 'Cefaleia', 'Urina amarelo-esverdeada (inofensiva)'],
    fontes: [{nome: 'Bula ANVISA – Nitazoxanida (Annita)', ano: 2024}, {nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}, {nome: 'CDC – Parasites: Giardia, Cryptosporidium (treatment)', ano: 2024}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'permetrina',
    nome: 'Permetrina (tópica)',
    classe: 'Escabicida / pediculicida – piretroide tópico',
    apresentacoes: [
      {descricao: 'Loção ou creme 5% (50 mg/mL) – escabiose', mg: 50, ml: 1, tipo: 'topico', via: 'Tópica'},
      {descricao: 'Loção ou xampu 1% (10 mg/mL) – pediculose', mg: 10, ml: 1, tipo: 'topico', via: 'Tópica'}
    ],
    indicacoes: ['Escabiose (primeira escolha em lactentes, gestantes e < 15 kg)', 'Pediculose do couro cabeludo'],
    doses: [
      {
        indicacao: 'Escabiose – loção 5%',
        mgKgDose: null, mgKgDia: null, vezesDia: 1, frequencia: 'Aplicação única; repetir em 7 dias', via: 'Tópica',
        doseMaxDose: null, doseMaxDia: null, duracao: '2 aplicações (D1 e D8)', faixaEtaria: '> 2 meses',
        doseFixa: 'Aplicar em toda a pele do pescoço aos pés (em lactentes incluir couro cabeludo e face, evitando olhos e boca), deixar 8 a 14 h e lavar',
        obs: 'Aplicar à noite em toda a superfície corporal, incluindo dobras, região interdigital e sob as unhas; retirar após 8 a 14 h com banho. Repetir após 7 dias. Tratar todos os contactantes simultaneamente e lavar roupas e roupas de cama com água quente ou isolar em saco plástico por 72 h. Prurido pode persistir por 2 a 4 semanas após o tratamento.'
      },
      {
        indicacao: 'Pediculose – loção ou xampu 1%',
        mgKgDose: null, mgKgDia: null, vezesDia: 1, frequencia: 'Aplicação única; repetir em 7 a 10 dias', via: 'Tópica',
        doseMaxDose: null, doseMaxDia: null, duracao: '2 aplicações', faixaEtaria: '> 2 meses',
        doseFixa: 'Aplicar no couro cabeludo e cabelos secos ou úmidos, deixar 10 min e enxaguar',
        obs: 'Aplicar em cabelo lavado e seco com toalha, deixar 10 min, enxaguar; remover lêndeas com pente fino. Repetir em 7 a 10 dias.'
      }
    ],
    diluicao: null,
    infusao: null,
    contraindicacoes: ['Hipersensibilidade a piretroides ou crisântemos', 'Menores de 2 meses (uso não estabelecido)'],
    interacoes: ['Sem interações sistêmicas relevantes'],
    ajusteRenal: 'Não se aplica (uso tópico).',
    ajusteHepatico: 'Não se aplica (uso tópico).',
    efeitosAdversos: ['Ardor, prurido e eritema transitórios no local', 'Parestesia local (raro)'],
    fontes: [{nome: 'Bula ANVISA – Permetrina', ano: 2024}, {nome: 'CDC – Parasites: Scabies, Head lice (treatment)', ano: 2024}, {nome: 'SBP – Documento científico: Escabiose', ano: 2020}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'benznidazol',
    nome: 'Benznidazol',
    classe: 'Antiparasitário – nitroimidazol (tripanossomicida)',
    apresentacoes: [
      {descricao: 'Comprimido 100 mg (sulcado)', mg: 100, ml: null, tipo: 'comprimido', via: 'VO'},
      {descricao: 'Comprimido pediátrico 12,5 mg', mg: 12.5, ml: null, tipo: 'comprimido', via: 'VO'}
    ],
    indicacoes: ['Doença de Chagas aguda (inclusive por transmissão oral, comum na Amazônia)', 'Doença de Chagas congênita', 'Doença de Chagas crônica em crianças e adolescentes (< 18 anos)', 'Reativação em imunossuprimidos'],
    doses: [
      {
        indicacao: 'Doença de Chagas – crianças (aguda, congênita e crônica < 12 anos)',
        mgKgDose: 3.75, mgKgDia: 7.5, vezesDia: 2, frequencia: '12/12 h (ou 8/8 h)', via: 'VO',
        doseMaxDose: 150, doseMaxDia: 300, duracao: '60 dias', faixaEtaria: 'Todas as idades (inclusive neonatos, forma congênita)',
        obs: 'Faixa 5 a 10 mg/kg/dia divididos em 2 ou 3 tomadas por 60 dias (máximo 300 mg/dia). Adolescentes e adultos: 5 mg/kg/dia. Em neonatos e lactentes, usar comprimido de 12,5 mg. Monitorar hemograma e transaminases. Suspender se exantema grave, neuropatia ou leucopenia importante. Fonte: PCDT Doença de Chagas – MS.'
      }
    ],
    diluicao: null,
    infusao: null,
    contraindicacoes: ['Gestação', 'Insuficiência renal ou hepática graves', 'Hipersensibilidade', 'Doença neurológica grave prévia'],
    interacoes: ['Álcool (efeito dissulfiram)', 'Fenitoína, fenobarbital (podem alterar níveis)', 'Outros mielotóxicos'],
    ajusteRenal: 'Contraindicado em insuficiência renal grave.',
    ajusteHepatico: 'Contraindicado em insuficiência hepática grave.',
    efeitosAdversos: ['Dermatite alérgica (7 a 10 dias após o início, comum em adultos, rara em lactentes)', 'Anorexia, náuseas, perda de peso', 'Neuropatia periférica (tardia, dose-dependente)', 'Leucopenia, plaquetopenia (raras)', 'Parestesias'],
    fontes: [{nome: 'Protocolo Clínico e Diretrizes Terapêuticas Doença de Chagas – MS', ano: 2018}, {nome: 'II Consenso Brasileiro em Doença de Chagas – SBMT', ano: 2016}, {nome: 'Bula ANVISA – Benznidazol (LAFEPE)', ano: 2023}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'antimoniato_meglumina',
    nome: 'Antimoniato de meglumina (Glucantime)',
    classe: 'Antimonial pentavalente – antileishmania',
    apresentacoes: [
      {descricao: 'Ampola 5 mL com 1,5 g de antimoniato de meglumina = 405 mg de Sb5+ (81 mg de Sb5+/mL) – mg refere-se ao Sb5+', mg: 405, ml: 5, tipo: 'injetavel', via: 'IV/IM'}
    ],
    indicacoes: ['Leishmaniose tegumentar (cutânea e mucosa)', 'Leishmaniose visceral (alternativa quando anfotericina B lipossomal não indicada/disponível)'],
    doses: [
      {
        indicacao: 'Leishmaniose cutânea',
        mgKgDose: 15, mgKgDia: 15, vezesDia: 1, frequencia: '1x/dia', via: 'IV ou IM',
        doseMaxDose: 1215, doseMaxDia: 1215, duracao: '20 dias', faixaEtaria: 'Todas as idades (crianças < 1 ano e > 50 anos, cardiopatas, nefropatas: preferir anfotericina B)',
        obs: 'Dose em Sb5+: 10 a 20 mg/kg/dia (MS recomenda 15 mg/kg/dia), máximo 3 ampolas/dia (1.215 mg de Sb5+). Em lesão única cutânea considerar uso intralesional conforme manual do MS. Monitorar ECG (QTc), função renal, hepática e pancreática semanalmente. Se ausência de cicatrização após 30 dias do término, repetir o esquema uma vez.'
      },
      {
        indicacao: 'Leishmaniose mucosa',
        mgKgDose: 20, mgKgDia: 20, vezesDia: 1, frequencia: '1x/dia', via: 'IV ou IM',
        doseMaxDose: 1215, doseMaxDia: 1215, duracao: '30 dias', faixaEtaria: 'Todas as idades (idosos e comorbidades: anfotericina B)',
        obs: 'Dose em Sb5+: 20 mg/kg/dia por 30 dias (máximo 3 ampolas/dia). Infusão IV lenta (diluir em SG 5% ou SF, 30 a 60 min) ou IM profundo.'
      },
      {
        indicacao: 'Leishmaniose visceral (alternativa)',
        mgKgDose: 20, mgKgDia: 20, vezesDia: 1, frequencia: '1x/dia', via: 'IV ou IM',
        doseMaxDose: 1215, doseMaxDia: 1215, duracao: '20 a 30 dias', faixaEtaria: '> 1 ano (< 1 ano: anfotericina B lipossomal)',
        obs: 'Dose em Sb5+: 20 mg/kg/dia por 20 a 30 dias. Anfotericina B lipossomal é a primeira escolha em < 1 ano, > 50 anos, insuficiência renal/hepática/cardíaca, gestantes, HIV e casos graves.'
      }
    ],
    diluicao: 'IV: diluir a dose em 100 mL de SG 5% ou SF 0,9%. IM: sem diluição (aplicar profundo; dividir volumes > 5 mL em dois locais).',
    infusao: 'Infusão IV lenta em 30 a 60 minutos (maior que 5 min sempre; risco de trombose e arritmia com infusão rápida).',
    contraindicacoes: ['Gestação (usar anfotericina B)', 'Insuficiência renal, hepática ou cardíaca', 'QTc > 450 ms ou arritmias', 'Uso de betabloqueadores e antiarrítmicos (relativa)', 'Pancreatite prévia', 'Hipersensibilidade a antimoniais'],
    interacoes: ['Fármacos que prolongam QT', 'Anfotericina B (hipopotassemia e cardiotoxicidade: intervalo entre os tratamentos)', 'Diuréticos (hipopotassemia)'],
    ajusteRenal: 'Contraindicado em insuficiência renal; monitorar creatinina semanalmente.',
    ajusteHepatico: 'Contraindicado em insuficiência hepática; monitorar transaminases.',
    efeitosAdversos: ['Artralgias, mialgias (muito comuns)', 'Anorexia, náuseas, dor abdominal', 'Elevação de amilase/lipase (pancreatite química)', 'Prolongamento de QT, arritmias, morte súbita (dose alta)', 'Elevação de transaminases', 'Nefrotoxicidade', 'Dor no local da injeção IM'],
    fontes: [{nome: 'Manual de Vigilância da Leishmaniose Tegumentar – MS', ano: 2017}, {nome: 'Manual de Vigilância e Controle da Leishmaniose Visceral – MS', ano: 2014}, {nome: 'Bula ANVISA – Glucantime', ano: 2023}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'anfotericina_b_lipossomal',
    nome: 'Anfotericina B lipossomal',
    classe: 'Antifúngico / antileishmania – poliênico (formulação lipídica)',
    apresentacoes: [
      {descricao: 'Frasco-ampola 50 mg (pó liofilizado); após reconstituição com 12 mL de água para injeção: 4 mg/mL', mg: 50, ml: 12.5, tipo: 'injetavel', via: 'IV', reconstituicao: 'Reconstituir com 12 mL de água para injeção (4 mg/mL), agitar vigorosamente 30 s; filtrar (filtro 5 micra) e diluir em SG 5% até 0,2 a 2 mg/mL. Nunca usar SF (precipita).'}
    ],
    indicacoes: ['Leishmaniose visceral (primeira escolha em < 1 ano, > 50 anos, gravidade, comorbidades, gestantes, HIV)', 'Leishmaniose tegumentar (casos selecionados)', 'Infecções fúngicas invasivas (candidíase, aspergilose, criptococose, histoplasmose)', 'Mucormicose'],
    doses: [
      {
        indicacao: 'Leishmaniose visceral',
        mgKgDose: 3, mgKgDia: 3, vezesDia: 1, frequencia: '1x/dia', via: 'IV',
        doseMaxDose: null, doseMaxDia: null, duracao: '7 dias (dose total 21 mg/kg)', faixaEtaria: 'Todas as idades',
        obs: 'MS: 3 mg/kg/dia por 7 dias (dose total 21 mg/kg). Esquemas alternativos com dose total de 20 mg/kg (4 mg/kg/dia por 5 dias ou 10 mg/kg em dose única) são descritos em nota técnica; confirmar conforme protocolo vigente. Em HIV/imunossuprimidos: 4 mg/kg/dia por 10 dias (D1 a D5, D10, D17, D24, D31, D38) ou conforme protocolo. Infundir em 30 a 60 min. Monitorar potássio, magnésio e creatinina.'
      },
      {
        indicacao: 'Leishmaniose tegumentar (cutânea e mucosa)',
        mgKgDose: 3, mgKgDia: 3, vezesDia: 1, frequencia: '1x/dia', via: 'IV',
        doseMaxDose: null, doseMaxDia: null, duracao: 'Até dose total de 20 a 40 mg/kg (cutânea: 20 a 30 mg/kg; mucosa: até 40 mg/kg)', faixaEtaria: 'Todas as idades',
        obs: '1 a 5 mg/kg/dia (MS: 3 a 5 mg/kg/dia) até completar a dose total conforme forma clínica. Confirmar conforme manual do MS.',
        verificar: true
      },
      {
        indicacao: 'Infecções fúngicas invasivas',
        mgKgDose: 3, mgKgDia: 3, vezesDia: 1, frequencia: '1x/dia', via: 'IV',
        doseMaxDose: null, doseMaxDia: null, duracao: 'Conforme micose e resposta (semanas)', faixaEtaria: 'Todas as idades',
        obs: 'Faixa 3 a 5 mg/kg/dia (mucormicose: 5 a 10 mg/kg/dia). Criptococose: 3 a 4 mg/kg/dia com flucitosina ou fluconazol. Infundir em 2 h (pode reduzir para 1 h se bem tolerada).'
      }
    ],
    diluicao: 'Reconstituir com 12 mL de água para injeção (4 mg/mL); diluir em SG 5% até 0,2 a 2 mg/mL (usar filtro de 5 micra). Incompatível com SF 0,9% e com outras drogas na mesma linha (lavar a linha com SG 5%).',
    infusao: 'Infusão IV em 30 a 60 minutos (leishmaniose) ou 2 horas (micoses); reduzir velocidade se reação infusional.',
    contraindicacoes: ['Hipersensibilidade (exceto se risco de vida sem alternativa)'],
    interacoes: ['Nefrotóxicos (aminoglicosídeos, ciclosporina, vancomicina, AINEs)', 'Diuréticos e corticoides (hipopotassemia)', 'Digoxina (toxicidade por hipopotassemia)', 'Antimoniais (cardiotoxicidade)'],
    ajusteRenal: 'Sem ajuste formal; monitorar creatinina e eletrólitos. Menos nefrotóxica que a formulação convencional.',
    ajusteHepatico: 'Sem ajuste.',
    efeitosAdversos: ['Reação infusional (febre, calafrios, dor lombar ou torácica) – menos frequente que a convencional', 'Hipopotassemia, hipomagnesemia', 'Elevação de creatinina', 'Anemia', 'Náuseas, vômitos', 'Flebite'],
    fontes: [{nome: 'Manual de Vigilância e Controle da Leishmaniose Visceral – MS', ano: 2014}, {nome: 'Nota Informativa MS – Leishmaniose visceral: anfotericina B lipossomal', ano: 2020}, {nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}, {nome: 'Bula ANVISA – AmBisome', ano: 2023}],
    atualizadoEm: '2026-09',
    verificar: false
  },

  // ===================== TUBERCULOSE / HANSENÍASE =====================
  {
    id: 'rifampicina',
    nome: 'Rifampicina',
    classe: 'Antimicobacteriano – rifamicina',
    apresentacoes: [
      {descricao: 'Suspensão oral 20 mg/mL (100 mg/5 mL)', mg: 20, ml: 1, tipo: 'suspensao', via: 'VO'},
      {descricao: 'Cápsula 300 mg', mg: 300, ml: null, tipo: 'comprimido', via: 'VO'},
      {descricao: 'Comprimido combinado RH 75 mg + 50 mg (dispersível pediátrico; mg refere-se à rifampicina)', mg: 75, ml: null, tipo: 'comprimido', via: 'VO'},
      {descricao: 'Comprimido combinado RHZ 75 mg + 50 mg + 150 mg (dispersível pediátrico; mg refere-se à rifampicina)', mg: 75, ml: null, tipo: 'comprimido', via: 'VO'},
      {descricao: 'Comprimido combinado RHZE 150 + 75 + 400 + 275 mg (>= 10 anos; mg refere-se à rifampicina)', mg: 150, ml: null, tipo: 'comprimido', via: 'VO'}
    ],
    indicacoes: ['Tuberculose (todas as formas)', 'Infecção latente por tuberculose (esquema 4R)', 'Hanseníase (PQT-U, dose mensal supervisionada)', 'Quimioprofilaxia de contatos de doença meningocócica e de H. influenzae b'],
    doses: [
      {
        indicacao: 'Tuberculose – crianças < 10 anos',
        mgKgDose: 15, mgKgDia: 15, vezesDia: 1, frequencia: '1x/dia, em jejum', via: 'VO',
        doseMaxDose: 600, doseMaxDia: 600, duracao: '6 meses (2 RHZ + 4 RH); meningoencefalite e osteoarticular: 12 meses', faixaEtaria: '< 10 anos',
        obs: 'Faixa 10 a 20 mg/kg/dia (máximo 600 mg). MS: usar comprimidos dispersíveis RHZ/RH por faixa de peso (4 a 7 kg: 1 cp; 8 a 11 kg: 2 cp; 12 a 15 kg: 3 cp; 16 a 24 kg: 4 cp; >= 25 kg: esquema de adulto), conforme Manual de Recomendações do MS. Etambutol é acrescentado conforme protocolo vigente. Administrar 1 h antes ou 2 h após refeição.'
      },
      {
        indicacao: 'Tuberculose – >= 10 anos (esquema RHZE)',
        mgKgDose: 10, mgKgDia: 10, vezesDia: 1, frequencia: '1x/dia, em jejum', via: 'VO',
        doseMaxDose: 600, doseMaxDia: 600, duracao: '6 meses (2 RHZE + 4 RH)', faixaEtaria: '>= 10 anos',
        obs: 'Faixa 8 a 12 mg/kg/dia. Comprimidos RHZE por faixa de peso: 20 a 35 kg: 2 cp; 36 a 50 kg: 3 cp; 51 a 70 kg: 4 cp; > 70 kg: 5 cp.'
      },
      {
        indicacao: 'Infecção latente por tuberculose (4R)',
        mgKgDose: 15, mgKgDia: 15, vezesDia: 1, frequencia: '1x/dia', via: 'VO',
        doseMaxDose: 600, doseMaxDia: 600, duracao: '4 meses (120 doses)', faixaEtaria: 'Todas as idades (preferencial em < 10 anos e > 50 anos)',
        obs: '< 10 anos: 15 mg/kg/dia (10 a 20); >= 10 anos: 10 mg/kg/dia. Máximo 600 mg/dia.'
      },
      {
        indicacao: 'Quimioprofilaxia – doença meningocócica',
        mgKgDose: 10, mgKgDia: 20, vezesDia: 2, frequencia: '12/12 h', via: 'VO',
        doseMaxDose: 600, doseMaxDia: 1200, duracao: '2 dias (4 doses)', faixaEtaria: 'Todas as idades (< 1 mês: 5 mg/kg/dose)',
        obs: '>= 1 mês: 10 mg/kg/dose 12/12 h por 2 dias (máximo 600 mg/dose); < 1 mês: 5 mg/kg/dose 12/12 h por 2 dias. Para H. influenzae b: 20 mg/kg/dia 1x/dia por 4 dias (máximo 600 mg; < 1 mês: 10 mg/kg/dia).'
      },
      {
        indicacao: 'Hanseníase – PQT-U (dose mensal supervisionada)',
        mgKgDose: 10, mgKgDia: 10, vezesDia: 1, frequencia: '1x/mês (dose supervisionada)', via: 'VO',
        doseMaxDose: 600, doseMaxDia: 600, duracao: 'Paucibacilar: 6 doses mensais; multibacilar: 12 doses mensais', faixaEtaria: 'Todas as idades',
        faixasPeso: '< 30 kg: 10 mg/kg (ou 300 mg); 30 a 50 kg: 450 mg; > 50 kg: 600 mg',
        obs: 'Dose mensal supervisionada: > 50 kg: 600 mg; 30 a 50 kg: 450 mg; < 30 kg: 10 mg/kg (ou 300 mg conforme faixa). Associada a dapsona e clofazimina (PQT-U). Fonte: PCDT Hanseníase – MS 2022.'
      }
    ],
    diluicao: null,
    infusao: null,
    contraindicacoes: ['Hipersensibilidade a rifamicinas', 'Insuficiência hepática grave', 'Uso concomitante de inibidores de protease (avaliar com infectologia)', 'Porfiria'],
    interacoes: ['Indutor potente de CYP450: reduz níveis de anticoncepcionais, varfarina, corticoides, antirretrovirais, azóis, anticonvulsivantes, digoxina, ciclosporina, metadona, dolutegravir (ajustar)', 'Isoniazida e pirazinamida (hepatotoxicidade aditiva)', 'Antiácidos (reduzem absorção: separar 1 h)'],
    ajusteRenal: 'Sem ajuste.',
    ajusteHepatico: 'Cautela; monitorar transaminases. Suspender se transaminases > 5x o limite superior ou > 3x com sintomas.',
    efeitosAdversos: ['Coloração alaranjada de urina, lágrimas, suor (inofensiva; mancha lentes de contato)', 'Náuseas, dor abdominal', 'Hepatotoxicidade', 'Síndrome gripal (uso intermitente)', 'Trombocitopenia, anemia hemolítica (raro)', 'Exantema, prurido', 'Nefrite intersticial (raro)'],
    fontes: [{nome: 'Manual de Recomendações para o Controle da Tuberculose no Brasil – MS', ano: 2019}, {nome: 'Protocolo Clínico e Diretrizes Terapêuticas da Hanseníase – MS', ano: 2022}, {nome: 'Guia de Vigilância em Saúde – MS', ano: 2024}, {nome: 'OMS – Guidelines: Management of TB in children and adolescents', ano: 2022}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'isoniazida',
    nome: 'Isoniazida',
    classe: 'Antimicobacteriano – hidrazida',
    apresentacoes: [
      {descricao: 'Comprimido 100 mg', mg: 100, ml: null, tipo: 'comprimido', via: 'VO'},
      {descricao: 'Comprimido 300 mg', mg: 300, ml: null, tipo: 'comprimido', via: 'VO'},
      {descricao: 'Comprimido combinado RH 75 mg + 50 mg (dispersível; mg refere-se à isoniazida)', mg: 50, ml: null, tipo: 'comprimido', via: 'VO'}
    ],
    indicacoes: ['Tuberculose (todas as formas)', 'Infecção latente por tuberculose (6H ou 9H; 3HP com rifapentina em >= 2 anos)', 'Quimioprofilaxia primária do RN exposto'],
    doses: [
      {
        indicacao: 'Tuberculose – crianças < 10 anos',
        mgKgDose: 10, mgKgDia: 10, vezesDia: 1, frequencia: '1x/dia, em jejum', via: 'VO',
        doseMaxDose: 300, doseMaxDia: 300, duracao: '6 meses (2 RHZ + 4 RH); meningoencefalite: 12 meses', faixaEtaria: '< 10 anos',
        obs: 'Faixa 7 a 15 mg/kg/dia (máximo 300 mg). Usar comprimidos dispersíveis combinados por faixa de peso conforme MS. Associar piridoxina (vitamina B6) 5 a 10 mg/dia em desnutridos, HIV, adolescentes e lactentes em aleitamento.'
      },
      {
        indicacao: 'Tuberculose – >= 10 anos',
        mgKgDose: 5, mgKgDia: 5, vezesDia: 1, frequencia: '1x/dia, em jejum', via: 'VO',
        doseMaxDose: 300, doseMaxDia: 300, duracao: '6 meses (2 RHZE + 4 RH)', faixaEtaria: '>= 10 anos',
        obs: 'Faixa 4 a 6 mg/kg/dia (máximo 300 mg), em comprimidos RHZE / RH por faixa de peso.'
      },
      {
        indicacao: 'Infecção latente por tuberculose (6H a 9H) / quimioprofilaxia primária do RN',
        mgKgDose: 10, mgKgDia: 10, vezesDia: 1, frequencia: '1x/dia', via: 'VO',
        doseMaxDose: 300, doseMaxDia: 300, duracao: '6 meses (180 doses; ideal 270 doses em 9 a 12 meses)', faixaEtaria: 'Todas as idades',
        obs: '< 10 anos: 10 mg/kg/dia (7 a 15); >= 10 anos: 5 mg/kg/dia (4 a 6); máximo 300 mg. RN contato de bacilífero: isoniazida por 3 meses, depois PT: se PT >= 5 mm manter até 6 meses e não vacinar BCG; se < 5 mm suspender e vacinar BCG. O esquema 4R (rifampicina) é preferencial em < 10 anos conforme MS.'
      }
    ],
    diluicao: null,
    infusao: null,
    contraindicacoes: ['Hepatite aguda ou hepatopatia grave', 'Hipersensibilidade', 'Reação hepática prévia à isoniazida'],
    interacoes: ['Fenitoína, carbamazepina (aumenta níveis: monitorar)', 'Rifampicina e pirazinamida (hepatotoxicidade aditiva)', 'Paracetamol (hepatotoxicidade)', 'Antiácidos com alumínio (reduzem absorção)', 'Alimentos ricos em tiramina e histamina (atum, queijos)'],
    ajusteRenal: 'Sem ajuste (cautela em ClCr < 10 mL/min: 50% da dose em acetiladores lentos).',
    ajusteHepatico: 'Cautela; monitorar transaminases. Suspender se > 5x o limite superior ou > 3x com sintomas.',
    efeitosAdversos: ['Hepatotoxicidade (maior com rifampicina e em adolescentes)', 'Neuropatia periférica (prevenir com piridoxina)', 'Exantema', 'Náuseas', 'Convulsões e acidose metabólica em superdosagem (antídoto: piridoxina)', 'Lúpus induzido (raro)'],
    fontes: [{nome: 'Manual de Recomendações para o Controle da Tuberculose no Brasil – MS', ano: 2019}, {nome: 'Protocolo de Vigilância da Infecção Latente pelo M. tuberculosis – MS', ano: 2018}, {nome: 'OMS – Guidelines: Management of TB in children and adolescents', ano: 2022}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'pirazinamida',
    nome: 'Pirazinamida',
    classe: 'Antimicobacteriano – análogo da nicotinamida',
    apresentacoes: [
      {descricao: 'Comprimido 500 mg', mg: 500, ml: null, tipo: 'comprimido', via: 'VO'},
      {descricao: 'Suspensão oral 30 mg/mL (150 mg/5 mL)', mg: 30, ml: 1, tipo: 'suspensao', via: 'VO'},
      {descricao: 'Comprimido combinado RHZ 75 + 50 + 150 mg (dispersível; mg refere-se à pirazinamida)', mg: 150, ml: null, tipo: 'comprimido', via: 'VO'}
    ],
    indicacoes: ['Tuberculose – fase intensiva (2 primeiros meses)'],
    doses: [
      {
        indicacao: 'Tuberculose – crianças < 10 anos (fase intensiva)',
        mgKgDose: 35, mgKgDia: 35, vezesDia: 1, frequencia: '1x/dia, em jejum', via: 'VO',
        doseMaxDose: 1500, doseMaxDia: 1500, duracao: '2 meses', faixaEtaria: '< 10 anos',
        obs: 'Faixa 30 a 40 mg/kg/dia (máximo 1.500 mg em < 10 anos conforme MS). Usar comprimidos dispersíveis RHZ por faixa de peso. Monitorar ácido úrico e transaminases.'
      },
      {
        indicacao: 'Tuberculose – >= 10 anos (fase intensiva)',
        mgKgDose: 25, mgKgDia: 25, vezesDia: 1, frequencia: '1x/dia, em jejum', via: 'VO',
        doseMaxDose: 2000, doseMaxDia: 2000, duracao: '2 meses', faixaEtaria: '>= 10 anos',
        obs: 'Faixa 20 a 30 mg/kg/dia (máximo 2.000 mg), em comprimidos RHZE por faixa de peso.'
      }
    ],
    diluicao: null,
    infusao: null,
    contraindicacoes: ['Hepatopatia grave', 'Gota aguda', 'Hipersensibilidade', 'Porfiria'],
    interacoes: ['Rifampicina e isoniazida (hepatotoxicidade aditiva)', 'Alopurinol, probenecida (hiperuricemia)', 'Ciclosporina (reduz níveis)'],
    ajusteRenal: 'ClCr < 30 mL/min ou diálise: 25 a 35 mg/kg 3x/semana.',
    ajusteHepatico: 'Evitar em hepatopatia grave; monitorar transaminases.',
    efeitosAdversos: ['Hepatotoxicidade (dose-dependente)', 'Hiperuricemia, artralgias', 'Náuseas, anorexia', 'Exantema, fotossensibilidade', 'Rubor facial'],
    fontes: [{nome: 'Manual de Recomendações para o Controle da Tuberculose no Brasil – MS', ano: 2019}, {nome: 'OMS – Guidelines: Management of TB in children and adolescents', ano: 2022}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'etambutol',
    nome: 'Etambutol',
    classe: 'Antimicobacteriano – inibidor da síntese de arabinogalactano',
    apresentacoes: [
      {descricao: 'Comprimido 400 mg', mg: 400, ml: null, tipo: 'comprimido', via: 'VO'},
      {descricao: 'Comprimido combinado RHZE 150 + 75 + 400 + 275 mg (mg refere-se ao etambutol)', mg: 275, ml: null, tipo: 'comprimido', via: 'VO'}
    ],
    indicacoes: ['Tuberculose – fase intensiva em >= 10 anos (RHZE)', 'Tuberculose em < 10 anos quando indicado pelo protocolo vigente (HIV, resistência a isoniazida, formas graves)', 'Micobacterioses não tuberculosas'],
    doses: [
      {
        indicacao: 'Tuberculose – >= 10 anos (fase intensiva)',
        mgKgDose: 20, mgKgDia: 20, vezesDia: 1, frequencia: '1x/dia, em jejum', via: 'VO',
        doseMaxDose: 1200, doseMaxDia: 1200, duracao: '2 meses', faixaEtaria: '>= 10 anos',
        obs: 'Faixa 15 a 25 mg/kg/dia (máximo 1.200 mg), em comprimidos RHZE por faixa de peso.'
      },
      {
        indicacao: 'Tuberculose – crianças < 10 anos (quando indicado)',
        mgKgDose: 20, mgKgDia: 20, vezesDia: 1, frequencia: '1x/dia, em jejum', via: 'VO',
        doseMaxDose: 1200, doseMaxDia: 1200, duracao: '2 meses', faixaEtaria: '< 10 anos',
        obs: 'OMS: 20 mg/kg/dia (15 a 25). O uso em < 10 anos no Brasil segue o protocolo vigente do MS (historicamente não incluído no esquema básico pela dificuldade de monitorar acuidade visual). Confirmar conforme protocolo/nota técnica atual.',
        verificar: true
      }
    ],
    diluicao: null,
    infusao: null,
    contraindicacoes: ['Neurite óptica prévia', 'Incapacidade de relatar alterações visuais (relativa em crianças pequenas)', 'Hipersensibilidade'],
    interacoes: ['Antiácidos com alumínio (reduzem absorção: separar 4 h)', 'Outros fármacos neurotóxicos oculares'],
    ajusteRenal: 'ClCr < 30 mL/min ou diálise: 15 a 25 mg/kg 3x/semana.',
    ajusteHepatico: 'Sem ajuste.',
    efeitosAdversos: ['Neurite óptica (redução de acuidade visual, discromatopsia verde-vermelho; dose-dependente, geralmente reversível)', 'Hiperuricemia', 'Neuropatia periférica', 'Exantema', 'Náuseas'],
    fontes: [{nome: 'Manual de Recomendações para o Controle da Tuberculose no Brasil – MS', ano: 2019}, {nome: 'OMS – Guidelines: Management of TB in children and adolescents', ano: 2022}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'dapsona',
    nome: 'Dapsona',
    classe: 'Antimicobacteriano / antiprotozoário – sulfona',
    apresentacoes: [
      {descricao: 'Comprimido 100 mg', mg: 100, ml: null, tipo: 'comprimido', via: 'VO'},
      {descricao: 'Comprimido 50 mg', mg: 50, ml: null, tipo: 'comprimido', via: 'VO'}
    ],
    indicacoes: ['Hanseníase (PQT-U, dose diária autoadministrada)', 'Profilaxia de pneumocistose (alternativa ao SMX-TMP)', 'Dermatite herpetiforme', 'Toxoplasmose (alternativa, associada)'],
    doses: [
      {
        indicacao: 'Hanseníase – PQT-U (dose diária)',
        mgKgDose: 1.5, mgKgDia: 1.5, vezesDia: 1, frequencia: '1x/dia (autoadministrada) + dose mensal supervisionada igual', via: 'VO',
        doseMaxDose: 100, doseMaxDia: 100, duracao: 'Paucibacilar: 6 meses; multibacilar: 12 meses', faixaEtaria: 'Todas as idades',
        faixasPeso: '< 30 kg: 1 a 2 mg/kg/dia (máximo 50 mg); 30 a 50 kg: 50 mg/dia; > 50 kg: 100 mg/dia',
        obs: 'Por faixa de peso (PCDT Hanseníase – MS 2022): < 30 kg: 1 a 2 mg/kg/dia (máximo 50 mg); 30 a 50 kg: 50 mg/dia; > 50 kg: 100 mg/dia. Dose mensal supervisionada igual à diária. Avaliar G6PD quando disponível; monitorar hemograma (anemia hemolítica, metemoglobinemia).'
      },
      {
        indicacao: 'Profilaxia de pneumocistose',
        mgKgDose: 2, mgKgDia: 2, vezesDia: 1, frequencia: '1x/dia', via: 'VO',
        doseMaxDose: 100, doseMaxDia: 100, duracao: 'Enquanto imunossupressão', faixaEtaria: '> 1 mês',
        obs: '2 mg/kg/dia (máximo 100 mg) ou 4 mg/kg 1x/semana (máximo 200 mg).'
      }
    ],
    diluicao: null,
    infusao: null,
    contraindicacoes: ['Hipersensibilidade a sulfonas', 'Deficiência grave de G6PD', 'Anemia grave', 'Porfiria'],
    interacoes: ['Rifampicina (reduz níveis de dapsona)', 'Trimetoprima (aumenta níveis de ambos)', 'Primaquina e outros oxidantes (hemólise, metemoglobinemia)', 'Probenecida (aumenta níveis)'],
    ajusteRenal: 'Cautela em insuficiência renal grave; sem ajuste definido.',
    ajusteHepatico: 'Cautela; monitorar transaminases.',
    efeitosAdversos: ['Anemia hemolítica (dose-dependente; grave em G6PD)', 'Metemoglobinemia', 'Síndrome da dapsona / DRESS (febre, exantema, hepatite, 2 a 8 semanas após início)', 'Agranulocitose (rara)', 'Neuropatia periférica motora', 'Náuseas, cefaleia'],
    fontes: [{nome: 'Protocolo Clínico e Diretrizes Terapêuticas da Hanseníase – MS', ano: 2022}, {nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}, {nome: 'AAP Red Book', ano: 2024}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'clofazimina',
    nome: 'Clofazimina',
    classe: 'Antimicobacteriano – riminofenazina',
    apresentacoes: [
      {descricao: 'Cápsula 50 mg', mg: 50, ml: null, tipo: 'comprimido', via: 'VO'},
      {descricao: 'Cápsula 100 mg', mg: 100, ml: null, tipo: 'comprimido', via: 'VO'}
    ],
    indicacoes: ['Hanseníase (PQT-U, dose mensal supervisionada e dose diária)', 'Eritema nodoso hansênico (reação tipo 2) como poupador de corticoide', 'Tuberculose multirresistente (esquemas específicos)'],
    doses: [
      {
        indicacao: 'Hanseníase – PQT-U (dose diária autoadministrada)',
        mgKgDose: 1, mgKgDia: 1, vezesDia: 1, frequencia: '1x/dia (< 30 kg e > 50 kg) ou em dias alternados (30 a 50 kg)', via: 'VO',
        doseMaxDose: 50, doseMaxDia: 50, duracao: 'Paucibacilar: 6 meses; multibacilar: 12 meses', faixaEtaria: 'Todas as idades',
        faixasPeso: '< 30 kg: 1 mg/kg/dia; 30 a 50 kg: 50 mg em dias alternados; > 50 kg: 50 mg/dia',
        obs: 'Por faixa de peso (PCDT Hanseníase – MS 2022): < 30 kg: 1 mg/kg/dia (dose diária) e 6 mg/kg mensal supervisionada (máximo 150 mg); 30 a 50 kg: 150 mg mensal + 50 mg em dias alternados; > 50 kg: 300 mg mensal + 50 mg/dia. Administrar com alimento. Orientar sobre pigmentação da pele (reversível após meses do término).'
      },
      {
        indicacao: 'Hanseníase – PQT-U (dose mensal supervisionada)',
        mgKgDose: 6, mgKgDia: 6, vezesDia: 1, frequencia: '1x/mês', via: 'VO',
        doseMaxDose: 300, doseMaxDia: 300, duracao: 'Paucibacilar: 6 doses; multibacilar: 12 doses', faixaEtaria: 'Todas as idades',
        faixasPeso: '< 30 kg: 6 mg/kg (máximo 150 mg); 30 a 50 kg: 150 mg; > 50 kg: 300 mg',
        obs: 'Dose mensal supervisionada por faixa de peso. Máximo 300 mg (adultos).'
      }
    ],
    diluicao: null,
    infusao: null,
    contraindicacoes: ['Hipersensibilidade', 'Cautela em dor abdominal ou diarreia persistentes (enteropatia por cristais)', 'Cautela em prolongamento de QT'],
    interacoes: ['Fármacos que prolongam QT (bedaquilina, fluoroquinolonas)', 'Dapsona (pode reduzir efeito anti-inflamatório da clofazimina)', 'Suco de laranja e antiácidos (reduzem absorção)'],
    ajusteRenal: 'Sem ajuste.',
    ajusteHepatico: 'Cautela em hepatopatia grave.',
    efeitosAdversos: ['Pigmentação castanho-avermelhada da pele, conjuntivas e secreções (quase universal, reversível)', 'Ictiose, pele seca', 'Dor abdominal, náuseas, diarreia', 'Enteropatia por depósito de cristais (doses altas prolongadas)', 'Prolongamento de QT', 'Fotossensibilidade'],
    fontes: [{nome: 'Protocolo Clínico e Diretrizes Terapêuticas da Hanseníase – MS', ano: 2022}, {nome: 'OMS – Guidelines for the diagnosis, treatment and prevention of leprosy', ano: 2018}],
    atualizadoEm: '2026-09',
    verificar: false
  },

  // ===================== RESPIRATÓRIOS / CORTICOIDES =====================
  {
    id: 'salbutamol',
    nome: 'Salbutamol',
    classe: 'Broncodilatador – beta-2 agonista de curta ação',
    apresentacoes: [
      {descricao: 'Aerossol (spray) 100 mcg/jato (0,1 mg/jato) – mg por jato', mg: 0.1, ml: null, tipo: 'aerossol', via: 'Inalatória', unidade: 'jatos'},
      {descricao: 'Solução para nebulização 5 mg/mL (0,5%; 1 mL = 20 gotas, 1 gota = 0,25 mg)', mg: 5, ml: 1, tipo: 'solucao_nebulizacao', via: 'Inalatória'},
      {descricao: 'Xarope 2 mg/5 mL (0,4 mg/mL) – uso oral não recomendado', mg: 2, ml: 5, tipo: 'xarope', via: 'VO'}
    ],
    indicacoes: ['Crise de asma / sibilância aguda', 'Broncoespasmo', 'Hiperpotassemia (adjuvante, nebulização)'],
    doses: [
      {
        indicacao: 'Crise de asma – spray com espaçador',
        mgKgDose: null, mgKgDia: null, vezesDia: null, frequencia: 'A cada 20 min na primeira hora (3 ciclos); depois a cada 1 a 4 h conforme resposta', via: 'Inalatória (spray + espaçador)',
        doseMaxDose: 1, doseMaxDia: null, duracao: 'Durante a crise; em casa: 4/4 h a 6/6 h por poucos dias', faixaEtaria: 'Todas as idades',
        unidade: 'jatos',
        doseFixa: '2 a 4 jatos (100 mcg/jato) por ciclo; crises moderadas a graves: 4 a 10 jatos por ciclo (GINA)',
        obs: 'Dose em jatos: 2 a 4 jatos de 100 mcg por vez em crises leves; 4 a 10 jatos (até 1 mg) em crises moderadas a graves, a cada 20 min por 3 vezes, sempre com espaçador (com máscara em < 4 anos). Um jato por vez, 1 respiração profunda ou 5 a 10 respirações no espaçador. Equivalente clínico à nebulização com melhor perfil de efeitos adversos.'
      },
      {
        indicacao: 'Crise de asma – nebulização (solução 5 mg/mL)',
        mgKgDose: 0.15, mgKgDia: null, vezesDia: null, frequencia: 'A cada 20 min na primeira hora (3 ciclos); depois 1/1 h a 4/4 h conforme resposta', via: 'Inalatória (nebulização com O2 6 a 8 L/min)',
        doseMaxDose: 5, doseMaxDia: null, duracao: 'Durante a crise', faixaEtaria: 'Todas as idades',
        obs: '0,15 mg/kg/dose (mínimo 2,5 mg, máximo 5 mg) diluído em 3 a 4 mL de SF 0,9%, nebulizar com oxigênio 6 a 8 L/min. Esquema prático: < 20 kg: 2,5 mg (10 gotas); >= 20 kg: 5 mg (20 gotas). Monitorar FC, tremor e potássio em uso repetido. Preferir spray com espaçador quando possível.'
      },
      {
        indicacao: 'Crise grave – nebulização contínua (emergência / UTI)',
        mgKgDose: 0.5, mgKgDia: null, vezesDia: null, frequencia: 'Contínua (mg/kg/hora)', via: 'Inalatória (nebulização contínua)',
        doseMaxDose: 20, doseMaxDia: null, duracao: 'Enquanto necessário, com monitorização', faixaEtaria: 'Todas as idades',
        obs: 'Dose em mg/kg/HORA: 0,5 mg/kg/h (máximo 20 mg/h) em nebulização contínua, com monitorização cardíaca e de potássio. Somente em unidade de emergência/UTI. Confirmar conforme protocolo institucional.',
        verificar: true
      }
    ],
    diluicao: 'Nebulização: diluir a dose em SF 0,9% até 3 a 4 mL; nebulização contínua: diluir em SF conforme nebulizador (ex.: 10 a 20 mg em 50 mL/h).',
    infusao: null,
    contraindicacoes: ['Hipersensibilidade', 'Cautela em taquiarritmias, cardiopatia, hipertireoidismo, hipopotassemia'],
    interacoes: ['Betabloqueadores (antagonismo, broncoespasmo)', 'Corticoides, diuréticos, xantinas (hipopotassemia aditiva)', 'Outros simpaticomiméticos', 'Digoxina'],
    ajusteRenal: 'Sem ajuste.',
    ajusteHepatico: 'Sem ajuste.',
    efeitosAdversos: ['Tremor', 'Taquicardia, palpitações', 'Hipopotassemia', 'Hiperglicemia', 'Agitação', 'Acidose lática (doses altas)', 'Hipoxemia transitória (vasodilatação pulmonar)'],
    fontes: [{nome: 'GINA – Global Strategy for Asthma Management and Prevention', ano: 2024}, {nome: 'SBP – Diretrizes para o manejo da asma na infância', ano: 2020}, {nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'ipratropio',
    nome: 'Brometo de ipratrópio',
    classe: 'Broncodilatador – anticolinérgico de curta ação',
    apresentacoes: [
      {descricao: 'Solução para nebulização 0,25 mg/mL (0,025%; 1 mL = 20 gotas, 1 gota = 0,0125 mg)', mg: 0.25, ml: 1, tipo: 'solucao_nebulizacao', via: 'Inalatória'},
      {descricao: 'Aerossol (spray) 20 mcg/jato (0,02 mg/jato)', mg: 0.02, ml: null, tipo: 'aerossol', via: 'Inalatória', unidade: 'jatos'}
    ],
    indicacoes: ['Crise de asma moderada a grave (associado ao salbutamol nas primeiras horas)', 'Broncoespasmo em bronquiolite obliterante / DPOC (adolescentes)'],
    doses: [
      {
        indicacao: 'Crise de asma moderada a grave – nebulização (associado ao salbutamol)',
        mgKgDose: null, mgKgDia: null, vezesDia: null, frequencia: 'A cada 20 min por 3 doses na primeira hora; depois 4/4 h a 6/6 h se necessário', via: 'Inalatória (nebulização)',
        doseMaxDose: 0.5, doseMaxDia: null, duracao: 'Primeiras 24 a 48 h da crise', faixaEtaria: 'Todas as idades',
        faixasPeso: '< 20 kg: 0,25 mg (20 gotas / 1 mL); >= 20 kg: 0,5 mg (40 gotas / 2 mL)',
        doseFixa: '< 20 kg: 0,25 mg; >= 20 kg: 0,5 mg por nebulização, junto com o salbutamol',
        obs: 'Dose fixa por peso: 0,25 mg (< 20 kg) ou 0,5 mg (>= 20 kg) adicionada à nebulização de salbutamol, a cada 20 min por 3 vezes na primeira hora. Benefício demonstrado apenas na fase inicial de crises moderadas a graves; sem benefício na manutenção ou após internação. Evitar contato com os olhos (midríase, glaucoma).'
      },
      {
        indicacao: 'Crise de asma – spray com espaçador',
        mgKgDose: null, mgKgDia: null, vezesDia: null, frequencia: 'A cada 20 min por 3 doses; depois 4/4 h a 6/6 h', via: 'Inalatória (spray + espaçador)',
        doseMaxDose: 0.16, doseMaxDia: null, duracao: 'Primeiras 24 a 48 h', faixaEtaria: 'Todas as idades',
        unidade: 'jatos',
        doseFixa: '4 a 8 jatos de 20 mcg por vez',
        obs: 'Dose em jatos: 4 a 8 jatos (80 a 160 mcg) por vez com espaçador, junto com o salbutamol.'
      }
    ],
    diluicao: 'Nebulização: associar ao salbutamol e completar com SF 0,9% até 3 a 4 mL.',
    infusao: null,
    contraindicacoes: ['Hipersensibilidade a ipratrópio, atropina ou derivados', 'Cautela em glaucoma de ângulo fechado e obstrução urinária'],
    interacoes: ['Outros anticolinérgicos (efeito aditivo)'],
    ajusteRenal: 'Sem ajuste.',
    ajusteHepatico: 'Sem ajuste.',
    efeitosAdversos: ['Boca seca', 'Gosto amargo', 'Midríase / glaucoma agudo se contato ocular', 'Taquicardia (raro)', 'Retenção urinária (raro)'],
    fontes: [{nome: 'GINA – Global Strategy for Asthma Management and Prevention', ano: 2024}, {nome: 'SBP – Diretrizes para o manejo da asma na infância', ano: 2020}, {nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'prednisolona',
    nome: 'Prednisolona',
    classe: 'Corticoide sistêmico (oral)',
    apresentacoes: [
      {descricao: 'Solução oral 3 mg/mL', mg: 3, ml: 1, tipo: 'solucao', via: 'VO'},
      {descricao: 'Solução oral 1 mg/mL', mg: 1, ml: 1, tipo: 'solucao', via: 'VO'},
      {descricao: 'Comprimido 5 mg', mg: 5, ml: null, tipo: 'comprimido', via: 'VO'},
      {descricao: 'Comprimido 20 mg', mg: 20, ml: null, tipo: 'comprimido', via: 'VO'}
    ],
    indicacoes: ['Crise de asma (curso curto)', 'Laringite / crupe (alternativa à dexametasona)', 'Síndrome nefrótica', 'Doenças inflamatórias e autoimunes', 'Reações alérgicas'],
    doses: [
      {
        indicacao: 'Crise de asma – curso curto',
        mgKgDose: 1, mgKgDia: 1, vezesDia: 1, frequencia: '1x/dia (pela manhã) ou dividida 12/12 h', via: 'VO',
        doseMaxDose: 40, doseMaxDia: 40, duracao: '3 a 5 dias (sem necessidade de desmame se <= 7 a 10 dias)', faixaEtaria: 'Todas as idades',
        obs: 'Faixa 1 a 2 mg/kg/dia (máximo 40 mg/dia em < 12 anos; 50 mg em adolescentes). Iniciar na primeira hora da crise moderada a grave. Administrar com alimento. Se vômito, repetir a dose ou usar dexametasona.'
      },
      {
        indicacao: 'Crupe (laringotraqueíte) – alternativa',
        mgKgDose: 1, mgKgDia: 1, vezesDia: 1, frequencia: 'Dose única (pode repetir em 24 h)', via: 'VO',
        doseMaxDose: 40, doseMaxDia: 40, duracao: '1 a 3 dias', faixaEtaria: 'Todas as idades',
        obs: '1 mg/kg/dose. Dexametasona 0,15 a 0,6 mg/kg dose única é a escolha preferencial (efeito mais prolongado).'
      },
      {
        indicacao: 'Síndrome nefrótica – indução',
        mgKgDose: 2, mgKgDia: 2, vezesDia: 1, frequencia: '1x/dia (ou 60 mg/m2/dia)', via: 'VO',
        doseMaxDose: 60, doseMaxDia: 60, duracao: '4 a 6 semanas, depois 1,5 mg/kg (40 mg/m2) em dias alternados por 4 a 6 semanas', faixaEtaria: '> 1 ano',
        obs: '2 mg/kg/dia ou 60 mg/m2/dia (máximo 60 mg). Esquema completo conforme protocolo de nefrologia pediátrica (KDIGO).'
      },
      {
        indicacao: 'Anti-inflamatório / imunossupressor (doses habituais)',
        mgKgDose: 0.5, mgKgDia: 1, vezesDia: 2, frequencia: '12/12 h a 1x/dia', via: 'VO',
        doseMaxDose: 60, doseMaxDia: 60, duracao: 'Conforme doença; desmame se uso > 10 a 14 dias', faixaEtaria: 'Todas as idades',
        obs: 'Faixa 0,5 a 2 mg/kg/dia. Uso prolongado: monitorar crescimento, pressão arterial, glicemia, risco infeccioso (estrongiloidíase disseminada: considerar ivermectina antes de imunossupressão em área endêmica) e vacinas.'
      }
    ],
    diluicao: null,
    infusao: null,
    contraindicacoes: ['Infecções fúngicas sistêmicas não tratadas', 'Hipersensibilidade', 'Vacinas de vírus vivos em doses imunossupressoras', 'Cautela em varicela/sarampo ativos, tuberculose, estrongiloidíase, úlcera péptica, diabetes'],
    interacoes: ['AINEs (risco gastrointestinal)', 'Indutores de CYP3A4 (rifampicina, fenitoína, fenobarbital) reduzem efeito', 'Cetoconazol, claritromicina aumentam níveis', 'Diuréticos, anfotericina B (hipopotassemia)', 'Vacinas vivas', 'Hipoglicemiantes (reduz efeito)'],
    ajusteRenal: 'Sem ajuste.',
    ajusteHepatico: 'Prednisolona é a forma ativa (preferível à prednisona em hepatopatia); sem ajuste.',
    efeitosAdversos: ['Hiperglicemia', 'Aumento de apetite, ganho de peso', 'Alterações de humor, insônia', 'Hipertensão', 'Supressão adrenal (uso > 10 a 14 dias)', 'Retardo de crescimento, osteoporose, catarata (uso prolongado)', 'Imunossupressão', 'Gastrite'],
    fontes: [{nome: 'GINA – Global Strategy for Asthma Management and Prevention', ano: 2024}, {nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}, {nome: 'KDIGO – Glomerular Diseases Guideline', ano: 2021}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'dexametasona',
    nome: 'Dexametasona',
    classe: 'Corticoide sistêmico de longa ação',
    apresentacoes: [
      {descricao: 'Solução injetável 4 mg/mL (2,5 mL = 10 mg)', mg: 4, ml: 1, tipo: 'injetavel', via: 'IV/IM'},
      {descricao: 'Solução injetável 2 mg/mL', mg: 2, ml: 1, tipo: 'injetavel', via: 'IV/IM'},
      {descricao: 'Elixir 0,1 mg/mL (0,5 mg/5 mL)', mg: 0.1, ml: 1, tipo: 'solucao', via: 'VO'},
      {descricao: 'Comprimido 0,5 mg', mg: 0.5, ml: null, tipo: 'comprimido', via: 'VO'},
      {descricao: 'Comprimido 4 mg', mg: 4, ml: null, tipo: 'comprimido', via: 'VO'}
    ],
    indicacoes: ['Crupe (laringotraqueíte viral)', 'Crise de asma (alternativa à prednisolona)', 'Meningite bacteriana (adjuvante, principalmente por H. influenzae b)', 'Edema cerebral / hipertensão intracraniana tumoral', 'Náuseas e vômitos por quimioterapia', 'Reações alérgicas graves (adjuvante)'],
    doses: [
      {
        indicacao: 'Crupe (laringotraqueíte)',
        mgKgDose: 0.6, mgKgDia: 0.6, vezesDia: 1, frequencia: 'Dose única', via: 'VO, IM ou IV',
        doseMaxDose: 16, doseMaxDia: 16, duracao: 'Dose única (pode repetir em 24 h se necessário)', faixaEtaria: 'Todas as idades',
        obs: 'Faixa 0,15 a 0,6 mg/kg dose única (máximo 16 mg; muitos protocolos usam máximo 10 mg). A solução injetável pode ser dada por via oral (misturar com suco ou xarope). Crupe moderado a grave: associar adrenalina nebulizada.'
      },
      {
        indicacao: 'Crise de asma (alternativa à prednisolona)',
        mgKgDose: 0.6, mgKgDia: 0.6, vezesDia: 1, frequencia: '1x/dia', via: 'VO ou IM',
        doseMaxDose: 16, doseMaxDia: 16, duracao: '1 a 2 dias', faixaEtaria: 'Todas as idades',
        obs: '0,6 mg/kg/dia (máximo 16 mg) por 1 a 2 dias, equivalente a 5 dias de prednisolona. Útil em vômitos ou baixa adesão.'
      },
      {
        indicacao: 'Meningite bacteriana (adjuvante)',
        mgKgDose: 0.15, mgKgDia: 0.6, vezesDia: 4, frequencia: '6/6 h', via: 'IV',
        doseMaxDose: 10, doseMaxDia: 40, duracao: '2 a 4 dias', faixaEtaria: '> 6 semanas',
        obs: '0,15 mg/kg/dose 6/6 h por 2 a 4 dias, iniciando antes ou junto (até 1 h após) da primeira dose de antibiótico. Maior benefício em meningite por H. influenzae b e pneumococo em > 6 semanas; não recomendado em neonatos e em meningite meningocócica isolada (confirmar conforme protocolo).'
      },
      {
        indicacao: 'Edema cerebral / hipertensão intracraniana (tumor)',
        mgKgDose: 0.25, mgKgDia: 1, vezesDia: 4, frequencia: '6/6 h', via: 'IV ou VO',
        doseMaxDose: 4, doseMaxDia: 16, duracao: 'Conforme neurologia/oncologia', faixaEtaria: 'Todas as idades',
        obs: 'Dose de ataque 1 a 2 mg/kg (máximo 10 mg) seguida de 1 a 1,5 mg/kg/dia divididos 4/4 h a 6/6 h (máximo 16 mg/dia). Confirmar conforme protocolo.',
        verificar: true
      },
      {
        indicacao: 'Antiemético (quimioterapia) / reação alérgica adjuvante',
        mgKgDose: 0.15, mgKgDia: 0.3, vezesDia: 2, frequencia: '12/12 h', via: 'IV ou VO',
        doseMaxDose: 8, doseMaxDia: 16, duracao: 'Conforme protocolo', faixaEtaria: 'Todas as idades',
        obs: '0,1 a 0,3 mg/kg/dose (máximo 8 mg/dose). Anafilaxia: corticoide não substitui adrenalina.'
      }
    ],
    diluicao: 'IV: pode ser administrada sem diluição (bolus lento) ou diluída em SF 0,9% ou SG 5%.',
    infusao: 'IV em bolus lento (1 a 5 min); doses altas (> 10 mg) em 15 a 30 min (risco de prurido perineal com injeção rápida).',
    contraindicacoes: ['Infecções fúngicas sistêmicas não tratadas', 'Hipersensibilidade', 'Cautela em varicela/sarampo, tuberculose, estrongiloidíase, úlcera péptica, diabetes'],
    interacoes: ['AINEs', 'Indutores de CYP3A4 (rifampicina, fenitoína, fenobarbital, carbamazepina) reduzem efeito', 'Azóis e macrolídeos aumentam níveis', 'Vacinas vivas', 'Hipoglicemiantes', 'Diuréticos e anfotericina (hipopotassemia)'],
    ajusteRenal: 'Sem ajuste.',
    ajusteHepatico: 'Sem ajuste.',
    efeitosAdversos: ['Hiperglicemia', 'Alterações de humor, insônia', 'Aumento de apetite', 'Hipertensão', 'Supressão adrenal (uso > 10 dias)', 'Sangramento digestivo (doses altas, meningite)', 'Prurido perineal com injeção IV rápida'],
    fontes: [{nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}, {nome: 'SBP – Tratado de Pediatria', ano: 2022}, {nome: 'IDSA – Bacterial Meningitis Guidelines', ano: 2004}, {nome: 'GINA – Global Strategy for Asthma Management and Prevention', ano: 2024}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'hidrocortisona',
    nome: 'Hidrocortisona (succinato sódico)',
    classe: 'Corticoide sistêmico de curta ação (com efeito mineralocorticoide)',
    apresentacoes: [
      {descricao: 'Frasco-ampola 100 mg (pó)', mg: 100, ml: null, tipo: 'injetavel', via: 'IV/IM', reconstituicao: 'Reconstituir em 2 mL de água para injeção (50 mg/mL)'},
      {descricao: 'Frasco-ampola 500 mg (pó)', mg: 500, ml: null, tipo: 'injetavel', via: 'IV/IM', reconstituicao: 'Reconstituir em 4 mL de água para injeção (125 mg/mL)'}
    ],
    indicacoes: ['Insuficiência adrenal aguda (crise adrenal) e cobertura de estresse', 'Crise de asma grave (quando via oral impossível)', 'Anafilaxia (adjuvante, após adrenalina)', 'Choque séptico refratário a catecolaminas', 'Hiperplasia adrenal congênita (reposição)'],
    doses: [
      {
        indicacao: 'Crise de asma grave / anafilaxia (adjuvante)',
        mgKgDose: 4, mgKgDia: 16, vezesDia: 4, frequencia: '6/6 h', via: 'IV ou IM',
        doseMaxDose: 100, doseMaxDia: 400, duracao: 'Até via oral possível (trocar por prednisolona)', faixaEtaria: 'Todas as idades',
        faixasIdade: 'Alternativa por idade (BNFc): < 1 ano: 25 mg; 1 a 5 anos: 50 mg; > 5 anos: 100 mg, 6/6 h',
        obs: '4 mg/kg/dose 6/6 h (máximo 100 mg/dose). Alternativa por faixa etária: < 1 ano 25 mg; 1 a 5 anos 50 mg; > 5 anos 100 mg. Na anafilaxia, o corticoide não substitui a adrenalina e não previne reação bifásica de forma comprovada.'
      },
      {
        indicacao: 'Crise adrenal (insuficiência adrenal aguda) – dose de ataque',
        mgKgDose: 2, mgKgDia: null, vezesDia: 1, frequencia: 'Bolus inicial, seguido de manutenção 6/6 h', via: 'IV (ou IM se sem acesso)',
        doseMaxDose: 100, doseMaxDia: null, duracao: 'Bolus único', faixaEtaria: 'Todas as idades',
        faixasIdade: 'Por idade: lactentes: 25 mg; pré-escolares (1 a 5 anos): 50 mg; escolares e adolescentes: 100 mg',
        obs: 'Bolus de 50 a 100 mg/m2 (aproximadamente 2 mg/kg, máximo 100 mg) ou por idade: lactentes 25 mg; 1 a 5 anos 50 mg; > 5 anos 100 mg. Associar expansão com SF 0,9% 20 mL/kg e glicose. Confirmar conforme protocolo de endocrinologia.'
      },
      {
        indicacao: 'Crise adrenal – manutenção nas primeiras 24 h',
        mgKgDose: 1, mgKgDia: 4, vezesDia: 4, frequencia: '6/6 h (ou infusão contínua)', via: 'IV',
        doseMaxDose: 50, doseMaxDia: 200, duracao: '24 a 48 h, depois reduzir gradualmente', faixaEtaria: 'Todas as idades',
        obs: '50 a 100 mg/m2/dia divididos 6/6 h (aproximadamente 1 mg/kg/dose). Reduzir para dose de estresse e depois de reposição conforme melhora.'
      },
      {
        indicacao: 'Choque séptico refratário a catecolaminas',
        mgKgDose: 1, mgKgDia: 4, vezesDia: 4, frequencia: '6/6 h (ou 50 mg/m2/dia em infusão contínua)', via: 'IV',
        doseMaxDose: 50, doseMaxDia: 200, duracao: 'Enquanto necessidade de vasopressor; desmame gradual', faixaEtaria: 'Todas as idades',
        obs: 'Surviving Sepsis Campaign (pediátrico) 2020: considerar hidrocortisona em choque refratário a fluidos e catecolaminas; 50 a 100 mg/m2/dia (aproximadamente 2 a 4 mg/kg/dia). Confirmar conforme protocolo institucional.',
        verificar: true
      }
    ],
    diluicao: 'Reconstituir em água para injeção; para infusão, diluir em SF 0,9% ou SG 5% (0,1 a 1 mg/mL).',
    infusao: 'Bolus IV em 30 s a 10 min (doses > 500 mg em 10 min ou mais); infusão contínua possível.',
    contraindicacoes: ['Infecções fúngicas sistêmicas não tratadas', 'Hipersensibilidade', 'Cautela nas mesmas situações dos demais corticoides'],
    interacoes: ['AINEs', 'Indutores de CYP3A4 reduzem efeito', 'Diuréticos, anfotericina B (hipopotassemia)', 'Vacinas vivas', 'Hipoglicemiantes'],
    ajusteRenal: 'Sem ajuste.',
    ajusteHepatico: 'Sem ajuste.',
    efeitosAdversos: ['Hiperglicemia', 'Retenção de sódio e água, hipopotassemia (efeito mineralocorticoide)', 'Hipertensão', 'Alterações de humor', 'Supressão adrenal em uso prolongado', 'Imunossupressão'],
    fontes: [{nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}, {nome: 'BNF for Children', ano: 2024}, {nome: 'Surviving Sepsis Campaign – Pediatric Guidelines', ano: 2020}, {nome: 'Endocrine Society – Adrenal Insufficiency Guideline', ano: 2016}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'metilprednisolona',
    nome: 'Metilprednisolona (succinato sódico)',
    classe: 'Corticoide sistêmico de ação intermediária (parenteral)',
    apresentacoes: [
      {descricao: 'Frasco-ampola 40 mg (pó)', mg: 40, ml: null, tipo: 'injetavel', via: 'IV/IM', reconstituicao: 'Reconstituir com o diluente do fabricante (1 mL: 40 mg/mL)'},
      {descricao: 'Frasco-ampola 125 mg (pó)', mg: 125, ml: null, tipo: 'injetavel', via: 'IV/IM', reconstituicao: 'Reconstituir com 2 mL do diluente (62,5 mg/mL)'},
      {descricao: 'Frasco-ampola 500 mg (pó)', mg: 500, ml: null, tipo: 'injetavel', via: 'IV', reconstituicao: 'Reconstituir com 8 mL do diluente (62,5 mg/mL); diluir para infusão'}
    ],
    indicacoes: ['Crise de asma grave (via oral impossível)', 'Anafilaxia (adjuvante)', 'Pulsoterapia em doenças autoimunes (nefrite lúpica, vasculites, síndrome nefrótica corticorresistente)', 'Mielite transversa, encefalomielite disseminada aguda (ADEM)', 'Reações transfusionais e alérgicas graves'],
    doses: [
      {
        indicacao: 'Crise de asma grave / anafilaxia (adjuvante)',
        mgKgDose: 1, mgKgDia: 2, vezesDia: 2, frequencia: '12/12 h (até 6/6 h em crise muito grave conforme protocolo)', via: 'IV ou IM',
        doseMaxDose: 60, doseMaxDia: 60, duracao: 'Até via oral possível, então prednisolona (total 3 a 5 dias)', faixaEtaria: 'Todas as idades',
        obs: '1 a 2 mg/kg/dia divididos 12/12 h (máximo 60 mg/dia; GINA/NAEPP). Alguns protocolos usam 1 mg/kg/dose 6/6 h nas primeiras 24 a 48 h de crise muito grave. Equivalente à prednisolona VO em eficácia.'
      },
      {
        indicacao: 'Pulsoterapia',
        mgKgDose: 30, mgKgDia: 30, vezesDia: 1, frequencia: '1x/dia', via: 'IV',
        doseMaxDose: 1000, doseMaxDia: 1000, duracao: '3 a 5 dias consecutivos', faixaEtaria: 'Todas as idades',
        obs: '30 mg/kg/dose (máximo 1 g) em infusão de 1 a 2 h, com monitorização de PA, FC e glicemia. Indicação e esquema conforme especialista (reumatologia, nefrologia, neurologia).'
      }
    ],
    diluicao: 'Reconstituir com o diluente próprio; diluir em SF 0,9% ou SG 5% (até 2,5 mg/mL para infusão; doses de pulso em 100 a 250 mL).',
    infusao: 'Doses <= 250 mg: IV em ao menos 5 min; doses > 250 mg (pulso): infusão em 30 a 60 min (idealmente 1 a 2 h). Infusão rápida de doses altas: risco de arritmia e morte súbita.',
    contraindicacoes: ['Infecções fúngicas sistêmicas não tratadas', 'Hipersensibilidade (inclusive à lactose de algumas apresentações)', 'Prematuros (formulações com álcool benzílico)', 'Cautela nas mesmas situações dos demais corticoides'],
    interacoes: ['AINEs', 'Indutores de CYP3A4 reduzem efeito', 'Azóis, macrolídeos aumentam níveis', 'Vacinas vivas', 'Ciclosporina (convulsões)', 'Bloqueadores neuromusculares (miopatia)'],
    ajusteRenal: 'Sem ajuste.',
    ajusteHepatico: 'Sem ajuste.',
    efeitosAdversos: ['Hiperglicemia', 'Hipertensão', 'Alterações de humor, insônia', 'Rubor, gosto metálico e arritmia durante pulso rápido', 'Hipopotassemia', 'Supressão adrenal, imunossupressão', 'Miopatia (com bloqueadores neuromusculares)'],
    fontes: [{nome: 'GINA – Global Strategy for Asthma Management and Prevention', ano: 2024}, {nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}, {nome: 'Bula ANVISA – Solu-Medrol', ano: 2023}],
    atualizadoEm: '2026-09',
    verificar: false
  },

  // ===================== EMERGÊNCIA / NEUROLÓGICOS =====================
  {
    id: 'adrenalina',
    nome: 'Adrenalina (epinefrina)',
    classe: 'Simpaticomimético – agonista alfa e beta-adrenérgico',
    apresentacoes: [
      {descricao: 'Ampola 1 mg/mL (1:1.000), 1 mL', mg: 1, ml: 1, tipo: 'injetavel', via: 'IM/SC/IV/IO/nebulização'},
      {descricao: 'Solução 1:10.000 (0,1 mg/mL) – preparar: 1 mL de adrenalina 1:1.000 + 9 mL de SF 0,9%', mg: 1, ml: 10, tipo: 'injetavel', via: 'IV/IO', reconstituicao: '1 mL de 1:1.000 + 9 mL de SF 0,9% = 10 mL a 0,1 mg/mL'}
    ],
    indicacoes: ['Anafilaxia (primeira linha)', 'Parada cardiorrespiratória', 'Bradicardia sintomática refratária', 'Choque séptico / cardiogênico (infusão contínua)', 'Crupe moderado a grave (nebulização)', 'Broncoespasmo grave refratário'],
    doses: [
      {
        indicacao: 'Anafilaxia – IM (solução 1:1.000 = 1 mg/mL)',
        mgKgDose: 0.01, mgKgDia: null, vezesDia: null, frequencia: 'Repetir a cada 5 a 15 min se necessário (até 3 doses)', via: 'IM (face anterolateral da coxa)',
        doseMaxDose: 0.5, doseMaxDia: null, duracao: 'Até resolução; observar 4 a 24 h (reação bifásica)', faixaEtaria: 'Todas as idades',
        mlKgDose: 0.01,
        obs: '0,01 mg/kg = 0,01 mL/kg da solução 1:1.000 (1 mg/mL), máximo 0,5 mg (0,5 mL); muitos protocolos limitam a 0,3 mg em < 30 kg ou pré-púberes. Esquema prático: < 10 kg: 0,1 mL; 10 a 25 kg: 0,15 mL (autoinjetor 0,15 mg); > 25 kg: 0,3 mL (autoinjetor 0,3 mg). Não retardar por acesso venoso. Anti-histamínico e corticoide são adjuvantes.'
      },
      {
        indicacao: 'Parada cardiorrespiratória – IV/IO (solução 1:10.000 = 0,1 mg/mL)',
        mgKgDose: 0.01, mgKgDia: null, vezesDia: null, frequencia: 'A cada 3 a 5 min durante a RCP', via: 'IV ou IO',
        doseMaxDose: 1, doseMaxDia: null, duracao: 'Durante a RCP', faixaEtaria: 'Todas as idades',
        mlKgDose: 0.1,
        obs: '0,01 mg/kg = 0,1 mL/kg da solução 1:10.000 (0,1 mg/mL), máximo 1 mg (10 mL) por dose, a cada 3 a 5 min (PALS 2020). Preparar 1 mL de 1:1.000 + 9 mL de SF. Lavar com 5 mL de SF após a dose. Via traqueal (sem acesso IV/IO): 0,1 mg/kg = 0,1 mL/kg da solução 1:1.000 (máximo 2,5 mg).'
      },
      {
        indicacao: 'Crupe moderado a grave – nebulização (solução 1:1.000)',
        mgKgDose: 0.5, mgKgDia: null, vezesDia: null, frequencia: 'Pode repetir a cada 20 a 30 min se necessário; observar 2 a 4 h após a última dose', via: 'Inalatória (nebulização com O2)',
        doseMaxDose: 5, doseMaxDia: null, duracao: 'Conforme resposta', faixaEtaria: 'Todas as idades',
        mlKgDose: 0.5,
        obs: '0,5 mL/kg (= 0,5 mg/kg) da solução 1:1.000, máximo 5 mL (5 mg), diluída em SF até 3 a 5 mL, nebulizar com oxigênio. Efeito em 10 a 30 min, dura 2 h (efeito rebote): sempre associar dexametasona e observar por ao menos 2 a 4 h.'
      },
      {
        indicacao: 'Choque (séptico, cardiogênico) / bradicardia refratária – infusão contínua',
        mgKgDose: null, mgKgDia: null, vezesDia: null, frequencia: 'Contínua (mcg/kg/min)', via: 'IV ou IO (preferir acesso central; periférico diluído em emergência)',
        doseMaxDose: null, doseMaxDia: null, duracao: 'Enquanto instabilidade; desmame gradual', faixaEtaria: 'Todas as idades',
        doseFixa: '0,05 a 0,3 mcg/kg/min (até 1 mcg/kg/min); titular pela resposta',
        obs: 'Dose em mcg/kg/MINUTO: iniciar 0,05 a 0,1 mcg/kg/min e titular até 0,3 mcg/kg/min (máximo usual 1 mcg/kg/min). Preparo sugerido (regra prática): 0,6 x peso (kg) em mg diluídos em 100 mL de SF: 1 mL/h = 0,1 mcg/kg/min. Choque séptico pediátrico: adrenalina é vasopressor de primeira escolha em choque frio (SSC 2020). Confirmar conforme protocolo institucional.',
        verificar: true
      }
    ],
    diluicao: 'PCR: 1 mL de 1:1.000 + 9 mL de SF (1:10.000). Infusão contínua: diluir em SF 0,9% ou SG 5% (ex.: 1 mg em 100 mL = 10 mcg/mL); concentração periférica máxima 16 a 32 mcg/mL conforme protocolo. Proteger da luz.',
    infusao: 'Bolus IV/IO rápido na PCR seguido de flush; infusão contínua em bomba, de preferência em acesso central.',
    contraindicacoes: ['Nenhuma absoluta em anafilaxia ou PCR', 'Cautela em cardiopatia isquêmica, taquiarritmias, hipertireoidismo, feocromocitoma'],
    interacoes: ['Betabloqueadores (resposta reduzida e hipertensão paradoxal; considerar glucagon)', 'Antidepressivos tricíclicos, IMAO (potencializam)', 'Halotano (arritmias)', 'Alfabloqueadores'],
    ajusteRenal: 'Sem ajuste.',
    ajusteHepatico: 'Sem ajuste.',
    efeitosAdversos: ['Taquicardia, palpitações, arritmias', 'Hipertensão', 'Tremor, ansiedade, palidez', 'Cefaleia', 'Hiperglicemia, hipopotassemia', 'Necrose tecidual por extravasamento (infusão)', 'Isquemia miocárdica (doses altas)'],
    fontes: [{nome: 'PALS – Pediatric Advanced Life Support, AHA', ano: 2020}, {nome: 'WAO – Anaphylaxis Guidance', ano: 2020}, {nome: 'Surviving Sepsis Campaign – Pediatric Guidelines', ano: 2020}, {nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'midazolam',
    nome: 'Midazolam',
    classe: 'Benzodiazepínico de ação curta',
    apresentacoes: [
      {descricao: 'Ampola 5 mg/mL (3 mL = 15 mg; 10 mL = 50 mg)', mg: 5, ml: 1, tipo: 'injetavel', via: 'IV/IM/IN/bucal'},
      {descricao: 'Ampola 1 mg/mL (5 mL = 5 mg)', mg: 1, ml: 1, tipo: 'injetavel', via: 'IV/IM'},
      {descricao: 'Solução oral 2 mg/mL', mg: 2, ml: 1, tipo: 'solucao', via: 'VO'}
    ],
    indicacoes: ['Crise convulsiva / estado de mal epiléptico (primeira linha, principalmente sem acesso venoso: IM, intranasal ou bucal)', 'Sedação para procedimentos', 'Sedação pré-anestésica', 'Sedação contínua em UTI'],
    doses: [
      {
        indicacao: 'Crise convulsiva – IM (sem acesso venoso)',
        mgKgDose: 0.2, mgKgDia: null, vezesDia: null, frequencia: 'Dose única; pode repetir uma vez após 5 a 10 min', via: 'IM',
        doseMaxDose: 10, doseMaxDia: null, duracao: 'Dose única', faixaEtaria: '> 1 mês',
        faixasPeso: '13 a 40 kg: 5 mg; > 40 kg: 10 mg (AES 2016)',
        obs: '0,2 mg/kg IM (máximo 10 mg). Esquema prático (AES 2016): 13 a 40 kg: 5 mg; > 40 kg: 10 mg. Usar a solução 5 mg/mL para reduzir volume. Monitorar respiração e ter material de ventilação disponível.'
      },
      {
        indicacao: 'Crise convulsiva – intranasal ou bucal',
        mgKgDose: 0.2, mgKgDia: null, vezesDia: null, frequencia: 'Dose única; pode repetir uma vez após 5 a 10 min', via: 'Intranasal (metade em cada narina) ou bucal',
        doseMaxDose: 10, doseMaxDia: null, duracao: 'Dose única', faixaEtaria: '> 3 meses (bucal: > 6 meses)',
        obs: '0,2 mg/kg intranasal (máximo 10 mg; máximo 1 mL por narina) usando a solução 5 mg/mL com atomizador ou seringa; bucal: 0,3 a 0,5 mg/kg (máximo 10 mg). Bula da solução oral (bucal) por idade: 3 a 11 meses: 2,5 mg; 1 a 4 anos: 5 mg; 5 a 9 anos: 7,5 mg; >= 10 anos: 10 mg.'
      },
      {
        indicacao: 'Crise convulsiva / estado de mal – IV',
        mgKgDose: 0.1, mgKgDia: null, vezesDia: null, frequencia: 'Dose única; pode repetir uma vez após 5 min', via: 'IV lento (1 a 2 min)',
        doseMaxDose: 5, doseMaxDia: null, duracao: 'Dose única (até 2 doses)', faixaEtaria: '> 1 mês',
        obs: '0,1 a 0,2 mg/kg IV lento (máximo 5 mg por dose em crianças; até 10 mg em adolescentes / dose total 0,2 mg/kg). Diazepam IV é alternativa equivalente. Se persistir após 2 doses de benzodiazepínico, iniciar fenitoína ou fenobarbital. Risco de depressão respiratória, maior com doses repetidas.'
      },
      {
        indicacao: 'Sedação para procedimento – IV',
        mgKgDose: 0.05, mgKgDia: null, vezesDia: null, frequencia: 'Titular a cada 2 a 3 min até efeito', via: 'IV lento (2 a 3 min)',
        doseMaxDose: 2.5, doseMaxDia: null, duracao: 'Procedimento', faixaEtaria: '> 6 meses',
        obs: 'Inicial 0,05 a 0,1 mg/kg (máximo 2,5 mg na primeira dose em < 6 anos; adolescentes 1 a 2,5 mg), titulando até 0,4 mg/kg total (6 a 12 anos) ou 0,6 mg/kg (6 meses a 5 anos), máximo total 10 mg (6 mg em < 6 anos conforme bula). Monitorização contínua (oximetria, capnografia se disponível) e antídoto flumazenil disponível.'
      },
      {
        indicacao: 'Sedação pré-anestésica / ansiólise – VO',
        mgKgDose: 0.5, mgKgDia: null, vezesDia: 1, frequencia: 'Dose única 20 a 30 min antes', via: 'VO',
        doseMaxDose: 20, doseMaxDia: 20, duracao: 'Dose única', faixaEtaria: '> 6 meses',
        obs: '0,25 a 0,5 mg/kg VO (máximo 20 mg). Pode-se usar a solução injetável 5 mg/mL diluída em suco ou xarope. Reações paradoxais (agitação) em 1 a 10%.'
      },
      {
        indicacao: 'Sedação contínua em UTI / estado de mal refratário',
        mgKgDose: null, mgKgDia: null, vezesDia: null, frequencia: 'Contínua (mg/kg/h)', via: 'IV contínua',
        doseMaxDose: null, doseMaxDia: null, duracao: 'Enquanto necessário; desmame gradual (abstinência)', faixaEtaria: 'Todas as idades',
        doseFixa: 'Sedação: 0,05 a 0,2 mg/kg/h (1 a 3 mcg/kg/min); estado de mal refratário: ataque 0,2 mg/kg seguido de 0,05 a 2 mg/kg/h (1 a 30 mcg/kg/min) titulados pelo EEG',
        obs: 'Dose em mg/kg/HORA. Sedação em UTI: 0,05 a 0,2 mg/kg/h após ataque de 0,05 a 0,1 mg/kg. Estado de mal refratário: ataque 0,2 mg/kg e infusão 0,05 a 2 mg/kg/h com suporte ventilatório e EEG. Somente em UTI; confirmar conforme protocolo institucional.',
        verificar: true
      }
    ],
    diluicao: 'IV: diluir em SF 0,9% ou SG 5% (ex.: 1 mg/mL). Intranasal: usar solução 5 mg/mL sem diluir. Infusão contínua: ex.: 50 mg em 50 mL (1 mg/mL).',
    infusao: 'Bolus IV em 2 a 3 min (mínimo 1 min); infusão contínua em bomba.',
    contraindicacoes: ['Hipersensibilidade a benzodiazepínicos', 'Glaucoma agudo de ângulo fechado', 'Insuficiência respiratória grave sem suporte ventilatório', 'Choque / instabilidade hemodinâmica (relativa)', 'Miastenia gravis', 'Uso de inibidores potentes de CYP3A4 em sedação VO (cetoconazol, itraconazol)'],
    interacoes: ['Opioides e outros depressores do SNC (depressão respiratória sinérgica)', 'Inibidores de CYP3A4 (azóis, macrolídeos, inibidores de protease) prolongam efeito', 'Indutores (rifampicina, fenitoína, carbamazepina) reduzem efeito', 'Álcool'],
    ajusteRenal: 'Acúmulo do metabólito ativo em insuficiência renal com infusão prolongada: reduzir dose.',
    ajusteHepatico: 'Reduzir dose em hepatopatia (metabolismo hepático).',
    efeitosAdversos: ['Depressão respiratória e apneia (dose e velocidade dependentes)', 'Hipotensão', 'Sedação prolongada', 'Reação paradoxal (agitação, agressividade)', 'Ardor nasal (intranasal)', 'Amnésia anterógrada', 'Tolerância e abstinência (infusão prolongada)'],
    fontes: [{nome: 'AES – Guideline: Treatment of Convulsive Status Epilepticus', ano: 2016}, {nome: 'PALS – Pediatric Advanced Life Support, AHA', ano: 2020}, {nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}, {nome: 'Bula ANVISA – Midazolam', ano: 2024}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'diazepam',
    nome: 'Diazepam',
    classe: 'Benzodiazepínico de ação longa',
    apresentacoes: [
      {descricao: 'Ampola 5 mg/mL (2 mL = 10 mg)', mg: 5, ml: 1, tipo: 'injetavel', via: 'IV/retal'},
      {descricao: 'Comprimido 5 mg', mg: 5, ml: null, tipo: 'comprimido', via: 'VO'},
      {descricao: 'Comprimido 10 mg', mg: 10, ml: null, tipo: 'comprimido', via: 'VO'}
    ],
    indicacoes: ['Crise convulsiva / estado de mal epiléptico (primeira linha IV; retal sem acesso venoso)', 'Espasticidade, tétano (adjuvante)', 'Ansiólise, sedação leve', 'Abstinência alcoólica (adolescentes)'],
    doses: [
      {
        indicacao: 'Crise convulsiva – IV',
        mgKgDose: 0.2, mgKgDia: null, vezesDia: null, frequencia: 'Pode repetir uma vez após 5 a 10 min', via: 'IV lento (máximo 2 mg/min; 1 mg/min em lactentes)',
        doseMaxDose: 10, doseMaxDia: null, duracao: 'Dose única (até 2 doses)', faixaEtaria: '> 1 mês',
        obs: '0,1 a 0,3 mg/kg IV lento (máximo 5 mg em < 5 anos e 10 mg em >= 5 anos por dose). Não diluir (precipita) e não administrar IM (absorção errática). Ter suporte ventilatório disponível. Efeito anticonvulsivante curto (15 a 30 min): seguir com fenitoína ou fenobarbital se necessário.'
      },
      {
        indicacao: 'Crise convulsiva – retal (sem acesso venoso)',
        mgKgDose: 0.5, mgKgDia: null, vezesDia: null, frequencia: 'Pode repetir uma vez após 10 min', via: 'Retal (solução injetável com seringa sem agulha ou sonda)',
        doseMaxDose: 10, doseMaxDia: null, duracao: 'Dose única (até 2 doses)', faixaEtaria: '> 1 mês',
        obs: '0,5 mg/kg (máximo 10 mg; 20 mg em adolescentes conforme protocolo) usando a solução injetável 5 mg/mL por via retal com seringa de 1 a 3 mL sem agulha ou sonda fina, 4 a 5 cm no reto; manter as nádegas comprimidas 1 a 2 min. Faixas por idade (Harriet Lane): 2 a 5 anos: 0,5 mg/kg; 6 a 11 anos: 0,3 mg/kg; >= 12 anos: 0,2 mg/kg. Midazolam IM ou intranasal é alternativa preferível quando disponível.'
      },
      {
        indicacao: 'Ansiólise / espasticidade / tétano (adjuvante) – VO',
        mgKgDose: 0.1, mgKgDia: 0.3, vezesDia: 3, frequencia: '8/8 h', via: 'VO',
        doseMaxDose: 10, doseMaxDia: 30, duracao: 'Conforme indicação (menor tempo possível)', faixaEtaria: '> 6 meses',
        obs: '0,1 a 0,3 mg/kg/dia divididos 6/6 h a 8/8 h (máximo 10 mg/dose). Tétano: doses maiores (0,1 a 0,3 mg/kg/dose 4/4 h a 6/6 h IV) em UTI conforme protocolo; confirmar conforme protocolo.'
      }
    ],
    diluicao: 'Não diluir (precipita em soluções aquosas); administrar IV puro lentamente em veia calibrosa. Se necessário, pode ser injetado na linha de SF corrente.',
    infusao: 'IV lento: máximo 2 mg/min (adultos até 5 mg/min). Infusão contínua não recomendada (adsorção ao plástico, precipitação).',
    contraindicacoes: ['Hipersensibilidade a benzodiazepínicos', 'Glaucoma agudo de ângulo fechado', 'Insuficiência respiratória grave sem suporte', 'Miastenia gravis', 'Apneia do sono grave', 'Neonatos (formulação com álcool benzílico e propilenoglicol: cautela; preferir fenobarbital)'],
    interacoes: ['Opioides, barbitúricos, álcool e outros depressores do SNC', 'Inibidores de CYP3A4/2C19 (azóis, fluoxetina, omeprazol, valproato) aumentam efeito', 'Rifampicina, fenitoína, carbamazepina reduzem efeito', 'Fenitoína (níveis imprevisíveis)'],
    ajusteRenal: 'Sem ajuste para dose única; cautela em uso repetido.',
    ajusteHepatico: 'Reduzir dose em hepatopatia (meia-vida prolongada).',
    efeitosAdversos: ['Depressão respiratória e apneia (principalmente com IV rápido ou após fenobarbital)', 'Hipotensão', 'Sedação prolongada, ataxia', 'Flebite, tromboflebite (IV)', 'Reação paradoxal', 'Dependência e abstinência em uso crônico'],
    fontes: [{nome: 'AES – Guideline: Treatment of Convulsive Status Epilepticus', ano: 2016}, {nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}, {nome: 'OMS – Pocket Book of Hospital Care for Children', ano: 2013}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'fenobarbital',
    nome: 'Fenobarbital',
    classe: 'Anticonvulsivante – barbitúrico',
    apresentacoes: [
      {descricao: 'Ampola 100 mg/mL (1 mL) ou 200 mg/2 mL', mg: 100, ml: 1, tipo: 'injetavel', via: 'IV/IM'},
      {descricao: 'Solução oral (gotas) 40 mg/mL (1 gota = 1 mg)', mg: 40, ml: 1, tipo: 'gotas', via: 'VO'},
      {descricao: 'Comprimido 100 mg', mg: 100, ml: null, tipo: 'comprimido', via: 'VO'},
      {descricao: 'Comprimido 50 mg', mg: 50, ml: null, tipo: 'comprimido', via: 'VO'}
    ],
    indicacoes: ['Convulsões neonatais (primeira linha)', 'Estado de mal epiléptico (segunda linha, após benzodiazepínico)', 'Epilepsia (manutenção, principalmente em lactentes)', 'Crises febris recorrentes (profilaxia, raramente indicada)'],
    doses: [
      {
        indicacao: 'Estado de mal epiléptico / convulsão neonatal – dose de ataque',
        mgKgDose: 20, mgKgDia: null, vezesDia: 1, frequencia: 'Dose única; doses adicionais de 5 a 10 mg/kg a cada 15 a 30 min se persistir (até total de 40 mg/kg)', via: 'IV (infusão lenta) ou IM',
        doseMaxDose: 1000, doseMaxDia: null, duracao: 'Ataque único', faixaEtaria: 'Todas as idades (primeira escolha em neonatos)',
        obs: '15 a 20 mg/kg IV em 10 a 20 min (velocidade máxima 1 mg/kg/min, não exceder 30 mg/min em lactentes e 60 mg/min em crianças maiores; adultos até 100 mg/min), máximo 1.000 mg. Se persistir: 5 a 10 mg/kg adicionais até dose total de 40 mg/kg (neonatos) com suporte ventilatório disponível. Risco elevado de depressão respiratória e hipotensão após benzodiazepínico. Nível terapêutico 15 a 40 mcg/mL.'
      },
      {
        indicacao: 'Manutenção (epilepsia / convulsões neonatais)',
        mgKgDose: 2.5, mgKgDia: 5, vezesDia: 2, frequencia: '12/12 h (ou 1x/dia)', via: 'VO ou IV',
        doseMaxDose: 100, doseMaxDia: 200, duracao: 'Crônico (conforme neurologia)', faixaEtaria: 'Todas as idades',
        obs: '3 a 5 mg/kg/dia em 1 ou 2 tomadas, iniciando 12 a 24 h após a dose de ataque (neonatos: 3 a 4 mg/kg/dia; 1 a 5 anos: 6 a 8 mg/kg/dia; 5 a 12 anos: 4 a 6 mg/kg/dia; > 12 anos: 1 a 3 mg/kg/dia, máximo 200 mg/dia). Solução oral 40 mg/mL: 1 gota = 1 mg. Ajustar por nível sérico (15 a 40 mcg/mL).'
      }
    ],
    diluicao: 'IV: diluir a dose de ataque em SF 0,9% ou SG 5% (ex.: 1:10) e infundir lentamente; IM profundo sem diluir (máximo 5 mL por local).',
    infusao: 'Ataque em 10 a 20 min (<= 1 mg/kg/min; máximo 30 mg/min em lactentes, 60 mg/min em crianças, 100 mg/min em adultos). Monitorar FR, PA e oximetria.',
    contraindicacoes: ['Hipersensibilidade a barbitúricos', 'Porfiria aguda intermitente', 'Insuficiência respiratória grave sem suporte', 'Hepatopatia grave', 'Crises de ausência (pode agravar)'],
    interacoes: ['Indutor enzimático potente: reduz níveis de anticoncepcionais, varfarina, corticoides, valproato, lamotrigina, carbamazepina, antirretrovirais, doxiciclina, metronidazol', 'Valproato aumenta níveis de fenobarbital', 'Depressores do SNC (opioides, benzodiazepínicos): depressão respiratória', 'Fenitoína (interação bidirecional imprevisível)'],
    ajusteRenal: 'ClCr < 10 mL/min: intervalo 12/12 h a 16/16 h; remoção significativa por hemodiálise.',
    ajusteHepatico: 'Reduzir dose em hepatopatia; contraindicado em hepatopatia grave.',
    efeitosAdversos: ['Sedação, sonolência', 'Depressão respiratória e hipotensão (IV rápido, com benzodiazepínicos)', 'Hiperatividade paradoxal e alteração cognitiva/comportamental em crianças', 'Exantema, síndrome de Stevens-Johnson, DRESS', 'Deficiência de vitamina D e folato (uso crônico)', 'Tolerância e dependência'],
    fontes: [{nome: 'AES – Guideline: Treatment of Convulsive Status Epilepticus', ano: 2016}, {nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}, {nome: 'OMS – Guidelines on neonatal seizures', ano: 2011}, {nome: 'Neofax / Pediatric & Neonatal Dosage Handbook', ano: 2023}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'fenitoina',
    nome: 'Fenitoína',
    classe: 'Anticonvulsivante – hidantoína',
    apresentacoes: [
      {descricao: 'Ampola 50 mg/mL (5 mL = 250 mg)', mg: 50, ml: 1, tipo: 'injetavel', via: 'IV'},
      {descricao: 'Suspensão oral 20 mg/mL (100 mg/5 mL)', mg: 20, ml: 1, tipo: 'suspensao', via: 'VO'},
      {descricao: 'Comprimido 100 mg', mg: 100, ml: null, tipo: 'comprimido', via: 'VO'}
    ],
    indicacoes: ['Estado de mal epiléptico (segunda linha, após benzodiazepínico)', 'Convulsões neonatais refratárias ao fenobarbital', 'Epilepsia focal e tônico-clônica generalizada (manutenção)', 'Profilaxia de crises pós-traumáticas precoces'],
    doses: [
      {
        indicacao: 'Estado de mal epiléptico – dose de ataque',
        mgKgDose: 20, mgKgDia: null, vezesDia: 1, frequencia: 'Dose única; adicional de 5 a 10 mg/kg se persistir após 10 a 20 min', via: 'IV (infusão lenta em bomba)',
        doseMaxDose: 1500, doseMaxDia: null, duracao: 'Ataque único', faixaEtaria: 'Todas as idades (neonatos: 15 a 20 mg/kg)',
        obs: '20 mg/kg IV (máximo 1.500 mg; muitos protocolos usam máximo 1.000 mg) em velocidade <= 1 mg/kg/min (máximo 50 mg/min; 0,5 mg/kg/min em neonatos). Diluir exclusivamente em SF 0,9% (precipita em glicose), concentração <= 10 mg/mL, em linha exclusiva com filtro de 0,22 a 5 micra quando disponível, lavar a veia com SF antes e depois. Monitorização cardíaca contínua (bradicardia, hipotensão, arritmia) e PA. Nunca IM (necrose, absorção errática). Extravasamento: síndrome da luva roxa.'
      },
      {
        indicacao: 'Manutenção',
        mgKgDose: 2.5, mgKgDia: 5, vezesDia: 2, frequencia: '12/12 h (até 8/8 h em lactentes)', via: 'VO ou IV',
        doseMaxDose: 150, doseMaxDia: 300, duracao: 'Crônico (conforme neurologia)', faixaEtaria: 'Todas as idades',
        obs: '5 mg/kg/dia (faixa 4 a 8 mg/kg/dia em lactentes e crianças; 3 a 5 mg/kg/dia em neonatos e adolescentes), iniciando 12 a 24 h após o ataque; máximo usual 300 mg/dia. Farmacocinética não linear: ajustar por nível sérico (10 a 20 mcg/mL; corrigir para albumina). Agitar bem a suspensão; espaçar de dietas enterais (2 h).'
      }
    ],
    diluicao: 'Diluir apenas em SF 0,9% (concentração final 1 a 10 mg/mL); usar em até 1 a 4 h; não misturar com outros fármacos ou soluções glicosadas. Filtro em linha de 0,22 a 5 micra recomendado.',
    infusao: 'Infusão IV <= 1 mg/kg/min (máximo 50 mg/min; neonatos 0,5 mg/kg/min) com monitorização cardíaca. Lavar a linha com SF antes e depois.',
    contraindicacoes: ['Hipersensibilidade a hidantoínas', 'Bradicardia sinusal, bloqueio AV de 2º ou 3º grau, síndrome de Adams-Stokes', 'Uso concomitante de delavirdina', 'Crises de ausência e mioclônicas (pode agravar)', 'Porfiria'],
    interacoes: ['Indutor potente de CYP450: reduz níveis de anticoncepcionais, varfarina (efeito bifásico), corticoides, valproato, carbamazepina, lamotrigina, doxiciclina, antirretrovirais, itraconazol', 'Níveis de fenitoína aumentados por: fluconazol, isoniazida, cimetidina, amiodarona, SMX-TMP, valproato (desloca da albumina)', 'Reduzidos por: rifampicina, carbamazepina, fenobarbital, dieta enteral contínua, ácido fólico', 'Dopamina (hipotensão grave)'],
    ajusteRenal: 'Sem ajuste de dose; interpretar nível sérico pela fração livre em uremia e hipoalbuminemia.',
    ajusteHepatico: 'Reduzir dose e monitorar nível livre em hepatopatia.',
    efeitosAdversos: ['Hipotensão e bradiarritmias (infusão rápida)', 'Nistagmo, ataxia, diplopia (nível elevado)', 'Hiperplasia gengival, hirsutismo, acne (uso crônico)', 'Exantema, síndrome de Stevens-Johnson, DRESS (HLA-B*1502)', 'Síndrome da luva roxa (extravasamento)', 'Osteomalácia, deficiência de folato', 'Hepatotoxicidade (rara)'],
    fontes: [{nome: 'AES – Guideline: Treatment of Convulsive Status Epilepticus', ano: 2016}, {nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}, {nome: 'Bula ANVISA – Fenitoína sódica injetável', ano: 2024}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'ondansetrona',
    nome: 'Ondansetrona',
    classe: 'Antiemético – antagonista 5-HT3',
    apresentacoes: [
      {descricao: 'Ampola 2 mg/mL (2 mL = 4 mg; 4 mL = 8 mg)', mg: 2, ml: 1, tipo: 'injetavel', via: 'IV/IM'},
      {descricao: 'Comprimido ou comprimido orodispersível 4 mg', mg: 4, ml: null, tipo: 'comprimido', via: 'VO'},
      {descricao: 'Comprimido 8 mg', mg: 8, ml: null, tipo: 'comprimido', via: 'VO'},
      {descricao: 'Xarope 4 mg/5 mL (0,8 mg/mL)', mg: 4, ml: 5, tipo: 'xarope', via: 'VO'}
    ],
    indicacoes: ['Vômitos na gastroenterite aguda (dose única para facilitar a reidratação oral)', 'Náuseas e vômitos pós-operatórios', 'Náuseas e vômitos induzidos por quimioterapia ou radioterapia'],
    doses: [
      {
        indicacao: 'Gastroenterite aguda com vômitos – dose única',
        mgKgDose: 0.15, mgKgDia: 0.15, vezesDia: 1, frequencia: 'Dose única (pode repetir 1 vez após 8 h se necessário)', via: 'VO (preferencial) ou IV',
        doseMaxDose: 8, doseMaxDia: 8, duracao: 'Dose única', faixaEtaria: '> 6 meses (VO: >= 8 kg)',
        faixasPeso: 'VO: 8 a 15 kg: 2 mg; 15 a 30 kg: 4 mg; > 30 kg: 8 mg',
        obs: '0,15 mg/kg (máximo 8 mg VO; IV máximo 4 mg em crianças conforme muitos protocolos). Esquema prático VO: 8 a 15 kg: 2 mg; 15 a 30 kg: 4 mg; > 30 kg: 8 mg. Aguardar 15 a 30 min e iniciar SRO. Não substitui a reidratação; não usar rotineiramente em < 6 meses. Evitar em QT longo, uso de outros fármacos que prolongam QT e distúrbios eletrolíticos.'
      },
      {
        indicacao: 'Náuseas e vômitos pós-operatórios / por quimioterapia',
        mgKgDose: 0.15, mgKgDia: 0.45, vezesDia: 3, frequencia: '8/8 h (quimioterapia: 30 min antes e a cada 4 a 8 h)', via: 'IV (15 min) ou VO',
        doseMaxDose: 8, doseMaxDia: 24, duracao: 'Conforme protocolo (1 a 2 dias após quimioterapia)', faixaEtaria: '> 6 meses (pós-operatório: > 1 mês)',
        obs: '0,1 a 0,15 mg/kg/dose (máximo 8 mg por dose IV; dose única IV máxima 16 mg). Pós-operatório: 0,1 mg/kg (máximo 4 mg) dose única. Infundir IV em 15 min (bolus lento 2 a 5 min aceito em doses <= 4 mg).'
      }
    ],
    diluicao: 'IV: pode ser administrada sem diluição (bolus lento) ou diluída em 50 mL de SF 0,9% ou SG 5%.',
    infusao: 'IV em 2 a 5 min (bolus lento) ou em 15 min diluída; doses maiores sempre em 15 min.',
    contraindicacoes: ['Hipersensibilidade a antagonistas 5-HT3', 'Uso concomitante de apomorfina', 'Síndrome do QT longo congênito', 'Cautela em obstrução intestinal (pode mascarar) e distúrbios eletrolíticos'],
    interacoes: ['Fármacos que prolongam QT (macrolídeos, cloroquina, antipsicóticos, antiarrítmicos)', 'Serotoninérgicos (ISRS, tramadol): síndrome serotoninérgica', 'Tramadol (reduz efeito analgésico)', 'Indutores de CYP3A4 (rifampicina, carbamazepina) reduzem níveis'],
    ajusteRenal: 'Sem ajuste.',
    ajusteHepatico: 'Insuficiência hepática grave: máximo 8 mg/dia.',
    efeitosAdversos: ['Cefaleia', 'Constipação ou diarreia', 'Prolongamento de QT (dose-dependente)', 'Tontura', 'Reações extrapiramidais (raro)', 'Elevação transitória de transaminases'],
    fontes: [{nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}, {nome: 'SBP – Documento científico: Diarreia aguda', ano: 2017}, {nome: 'ESPGHAN/ESPID – Acute gastroenteritis guideline', ano: 2014}, {nome: 'Bula ANVISA – Ondansetrona', ano: 2024}],
    atualizadoEm: '2026-09',
    verificar: false
  },

  // ===================== HIDRATAÇÃO / NUTRICIONAIS =====================
  {
    id: 'sais_reidratacao_oral',
    nome: 'Sais de reidratação oral (SRO)',
    classe: 'Solução de reidratação oral – osmolaridade reduzida (OMS)',
    apresentacoes: [
      {descricao: 'Envelope para 1 litro de água (Na 75 mmol/L, K 20 mmol/L, Cl 65 mmol/L, citrato 10 mmol/L, glicose 75 mmol/L; 245 mOsm/L)', mg: null, ml: 1000, tipo: 'po_para_solucao', via: 'VO'},
      {descricao: 'Solução pronta 500 mL (formulação OMS de osmolaridade reduzida)', mg: null, ml: 500, tipo: 'solucao', via: 'VO'}
    ],
    indicacoes: ['Prevenção da desidratação na diarreia aguda (Plano A)', 'Tratamento da desidratação leve a moderada (Plano B)', 'Manutenção após reidratação venosa (Plano C)'],
    doses: [
      {
        indicacao: 'Plano A – sem desidratação (após cada evacuação diarreica ou vômito)',
        mgKgDose: null, mgKgDia: null, vezesDia: null, frequencia: 'Após cada evacuação líquida', via: 'VO',
        doseMaxDose: null, doseMaxDia: null, duracao: 'Enquanto durar a diarreia', faixaEtaria: 'Todas as idades',
        mlKgDose: 10,
        doseFixa: '< 1 ano: 50 a 100 mL; 1 a 10 anos: 100 a 200 mL; > 10 anos: à vontade',
        obs: 'Volume por evacuação: < 1 ano: 50 a 100 mL; 1 a 10 anos: 100 a 200 mL; > 10 anos: quantidade que desejar (aproximadamente 10 mL/kg por evacuação). Manter aleitamento materno e alimentação habitual. Oferecer em colher ou copo, em pequenos volumes frequentes. Preparar 1 envelope em 1 litro de água filtrada ou fervida; validade da solução: 24 h.'
      },
      {
        indicacao: 'Plano B – desidratação leve a moderada (TRO na unidade de saúde)',
        mgKgDose: null, mgKgDia: null, vezesDia: null, frequencia: 'Em 4 horas, em pequenos volumes frequentes (colher ou seringa a cada 1 a 2 min)', via: 'VO (ou sonda nasogástrica se recusa ou vômitos persistentes: 20 a 30 mL/kg/h)',
        doseMaxDose: null, doseMaxDia: null, duracao: '4 horas; reavaliar e reclassificar', faixaEtaria: 'Todas as idades',
        mlKgDose: 75,
        obs: '50 a 100 mL/kg em 4 horas (média 75 mL/kg), sob supervisão, em pequenos volumes frequentes. Se vômitos, reduzir o volume e aumentar a frequência; considerar ondansetrona dose única. Se não melhorar ou piorar, gastróclise (20 a 30 mL/kg/h) ou Plano C. Repor perdas adicionais conforme Plano A. Manter aleitamento materno.'
      }
    ],
    diluicao: 'Dissolver 1 envelope em 1 litro de água potável (filtrada ou fervida e fria); não adicionar açúcar; desprezar após 24 h.',
    infusao: null,
    contraindicacoes: ['Íleo paralítico / obstrução intestinal', 'Choque ou rebaixamento de consciência (usar via IV)', 'Vômitos incoercíveis (usar sonda nasogástrica ou via IV)'],
    interacoes: ['Nenhuma relevante'],
    ajusteRenal: 'Cautela em insuficiência renal (aporte de potássio).',
    ajusteHepatico: 'Sem ajuste.',
    efeitosAdversos: ['Vômitos (se volume excessivo por vez)', 'Hipernatremia (se preparo concentrado errado)', 'Edema palpebral (excesso: suspender temporariamente)'],
    fontes: [{nome: 'Manejo do paciente com diarreia – MS/OPAS (cartaz e manual)', ano: 2011}, {nome: 'OMS – The treatment of diarrhoea: a manual for physicians', ano: 2005}, {nome: 'SBP – Documento científico: Diarreia aguda', ano: 2017}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'zinco',
    nome: 'Zinco (sulfato de zinco)',
    classe: 'Micronutriente – suplemento mineral',
    apresentacoes: [
      {descricao: 'Comprimido dispersível 10 mg de zinco elementar', mg: 10, ml: null, tipo: 'comprimido', via: 'VO'},
      {descricao: 'Comprimido dispersível 20 mg de zinco elementar', mg: 20, ml: null, tipo: 'comprimido', via: 'VO'},
      {descricao: 'Solução oral 4 mg/mL de zinco elementar', mg: 4, ml: 1, tipo: 'solucao', via: 'VO'},
      {descricao: 'Xarope 2 mg/mL de zinco elementar (10 mg/5 mL)', mg: 2, ml: 1, tipo: 'xarope', via: 'VO'}
    ],
    indicacoes: ['Diarreia aguda (adjuvante: reduz duração e gravidade – OMS/MS)', 'Desnutrição aguda grave (fase de reabilitação)', 'Deficiência de zinco, acrodermatite enteropática'],
    doses: [
      {
        indicacao: 'Diarreia aguda (OMS/MS)',
        mgKgDose: null, mgKgDia: null, vezesDia: 1, frequencia: '1x/dia', via: 'VO',
        doseMaxDose: 20, doseMaxDia: 20, duracao: '10 a 14 dias', faixaEtaria: 'Todas as idades (< 6 meses: 10 mg; >= 6 meses: 20 mg)',
        doseFixa: '< 6 meses: 10 mg/dia; >= 6 meses: 20 mg/dia, por 10 a 14 dias',
        faixasIdade: '< 6 meses: 10 mg/dia; >= 6 meses: 20 mg/dia',
        obs: 'Dose fixa por idade em zinco elementar: 10 mg/dia (< 6 meses) ou 20 mg/dia (>= 6 meses) por 10 a 14 dias, mesmo após cessar a diarreia. Dissolver o comprimido em leite materno, SRO ou água. Pode causar vômitos se dado em jejum: oferecer com alimento.'
      },
      {
        indicacao: 'Desnutrição aguda grave (reabilitação) / deficiência de zinco',
        mgKgDose: 2, mgKgDia: 2, vezesDia: 1, frequencia: '1x/dia (ou dividido 12/12 h)', via: 'VO',
        doseMaxDose: 20, doseMaxDia: 40, duracao: 'Durante a fase de reabilitação (semanas) ou conforme deficiência', faixaEtaria: 'Todas as idades',
        obs: '2 mg/kg/dia de zinco elementar (OMS, desnutrição grave), a partir do início da alimentação; já contido nas fórmulas terapêuticas F-75/F-100 e RUTF (não somar). Deficiência: 0,5 a 1 mg/kg/dia; acrodermatite enteropática: 1 a 3 mg/kg/dia conforme protocolo.'
      }
    ],
    diluicao: 'Comprimido dispersível: dissolver em 5 mL de água, leite materno ou SRO.',
    infusao: null,
    contraindicacoes: ['Hipersensibilidade (rara)'],
    interacoes: ['Ferro (competição pela absorção: separar horários quando possível)', 'Tetraciclinas e quinolonas (quelação: separar 2 h)', 'Penicilamina'],
    ajusteRenal: 'Cautela em insuficiência renal grave (acúmulo).',
    ajusteHepatico: 'Sem ajuste.',
    efeitosAdversos: ['Náuseas, vômitos (dose alta ou em jejum)', 'Gosto metálico', 'Dor abdominal', 'Deficiência de cobre (uso prolongado em doses altas)'],
    fontes: [{nome: 'OMS/UNICEF – Clinical management of acute diarrhoea (joint statement)', ano: 2004}, {nome: 'OMS – Pocket Book of Hospital Care for Children', ano: 2013}, {nome: 'Manual de Atendimento da Criança com Desnutrição Grave – MS', ano: 2005}, {nome: 'SBP – Documento científico: Diarreia aguda', ano: 2017}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'sulfato_ferroso',
    nome: 'Sulfato ferroso',
    classe: 'Antianêmico – sal de ferro oral (doses em ferro elementar)',
    apresentacoes: [
      {descricao: 'Solução oral (gotas) 125 mg/mL de sulfato ferroso = 25 mg/mL de ferro elementar (1 gota = 1,25 mg de Fe) – mg refere-se ao ferro elementar', mg: 25, ml: 1, tipo: 'gotas', via: 'VO'},
      {descricao: 'Xarope 5 mg/mL de ferro elementar (sulfato ferroso 25 mg/5 mL)', mg: 5, ml: 1, tipo: 'xarope', via: 'VO'},
      {descricao: 'Comprimido 40 mg de ferro elementar (sulfato ferroso 200 mg)', mg: 40, ml: null, tipo: 'comprimido', via: 'VO'}
    ],
    indicacoes: ['Anemia ferropriva (tratamento)', 'Profilaxia de anemia ferropriva (lactentes, prematuros, gestantes)', 'Anemia associada a parasitoses intestinais (após tratamento)'],
    doses: [
      {
        indicacao: 'Anemia ferropriva – tratamento',
        mgKgDose: 3, mgKgDia: 3, vezesDia: 1, frequencia: '1x/dia (ou dividido em 2 tomadas), longe das refeições', via: 'VO',
        doseMaxDose: 120, doseMaxDia: 200, duracao: '3 a 6 meses (manter por 2 a 3 meses após normalizar a hemoglobina para repor estoques)', faixaEtaria: 'Todas as idades',
        obs: 'Dose em ferro elementar: 3 a 5 mg/kg/dia (máximo 200 mg/dia; adolescentes 60 a 120 mg/dia), preferencialmente em dose única diária, 30 a 60 min antes da refeição, com suco de fruta cítrica (vitamina C). Evitar com leite, chá ou café. Reavaliar hemoglobina em 30 dias (aumento esperado >= 1 g/dL). Investigar e tratar parasitoses (ancilostomíase) e outras causas em área endêmica.'
      },
      {
        indicacao: 'Profilaxia – lactentes a termo (MS/SBP)',
        mgKgDose: 1, mgKgDia: 1, vezesDia: 1, frequencia: '1x/dia', via: 'VO',
        doseMaxDose: 30, doseMaxDia: 30, duracao: 'Dos 6 meses (SBP: a partir dos 3 meses ou ao introduzir alimentação complementar) até 24 meses', faixaEtaria: '3 a 24 meses',
        obs: 'Dose em ferro elementar: 1 mg/kg/dia (MS Programa Nacional de Suplementação de Ferro: 6 a 24 meses; SBP: 1 mg/kg/dia dos 3 aos 24 meses em aleitamento materno exclusivo ou fórmula < 500 mL/dia). Máximo 30 mg/dia.'
      },
      {
        indicacao: 'Profilaxia – prematuros e baixo peso (SBP)',
        mgKgDose: 2, mgKgDia: 2, vezesDia: 1, frequencia: '1x/dia', via: 'VO',
        doseMaxDose: 30, doseMaxDia: 30, duracao: 'Do 30º dia de vida até 12 meses (2 mg/kg); depois 1 mg/kg até 24 meses', faixaEtaria: 'Prematuros e RN < 2.500 g a partir de 30 dias de vida',
        obs: 'Dose em ferro elementar (SBP 2018): 1.500 a 2.500 g: 2 mg/kg/dia; 1.000 a 1.500 g: 3 mg/kg/dia; < 1.000 g: 4 mg/kg/dia, do 30º dia até 1 ano; depois 1 mg/kg/dia até 2 anos.'
      }
    ],
    diluicao: null,
    infusao: null,
    contraindicacoes: ['Hemocromatose, hemossiderose', 'Anemias não ferroprivas (hemolíticas, talassemia) sem deficiência de ferro documentada', 'Hipersensibilidade', 'Cautela em úlcera péptica, doença inflamatória intestinal ativa'],
    interacoes: ['Antiácidos, inibidores de bomba de prótons, cálcio, leite (reduzem absorção)', 'Tetraciclinas, quinolonas, levotiroxina (quelação: separar 2 a 4 h)', 'Vitamina C (aumenta absorção)', 'Zinco (competição)'],
    ajusteRenal: 'Sem ajuste.',
    ajusteHepatico: 'Sem ajuste.',
    efeitosAdversos: ['Fezes escuras (inofensivo)', 'Náuseas, dor epigástrica, constipação ou diarreia', 'Escurecimento dos dentes (gotas: pingar no fundo da língua, escovar após)', 'Intoxicação aguda grave em ingestão acidental (manter fora do alcance das crianças)'],
    fontes: [{nome: 'Programa Nacional de Suplementação de Ferro: manual de condutas gerais – MS', ano: 2013}, {nome: 'SBP – Consenso sobre anemia ferropriva: mais que uma doença, uma urgência médica', ano: 2018}, {nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'vitamina_a',
    nome: 'Vitamina A (palmitato de retinol)',
    classe: 'Vitamina lipossolúvel – suplemento (doses em UI)',
    apresentacoes: [
      {descricao: 'Cápsula gelatinosa 100.000 UI (megadose, cor amarela) – mg expresso em UI', mg: 100000, ml: null, tipo: 'capsula', via: 'VO', unidade: 'UI'},
      {descricao: 'Cápsula gelatinosa 200.000 UI (megadose, cor vermelha) – mg expresso em UI', mg: 200000, ml: null, tipo: 'capsula', via: 'VO', unidade: 'UI'}
    ],
    indicacoes: ['Suplementação preventiva (Programa Nacional de Suplementação de Vitamina A – MS) em crianças de 6 a 59 meses', 'Sarampo (todas as crianças, 2 doses)', 'Xeroftalmia / deficiência clínica de vitamina A', 'Desnutrição aguda grave (se sinais de deficiência ou sarampo)'],
    doses: [
      {
        indicacao: 'Suplementação preventiva (MS)',
        mgKgDose: null, mgKgDia: null, vezesDia: 1, frequencia: '6 a 11 meses: dose única; 12 a 59 meses: a cada 6 meses', via: 'VO',
        doseMaxDose: 200000, doseMaxDia: 200000, duracao: 'Conforme calendário do programa', faixaEtaria: '6 a 59 meses',
        unidade: 'UI',
        doseFixa: '6 a 11 meses: 100.000 UI (1 dose); 12 a 59 meses: 200.000 UI a cada 6 meses',
        faixasIdade: '6 a 11 meses: 100.000 UI; 12 a 59 meses: 200.000 UI',
        obs: 'Dose fixa em UI por idade: 6 a 11 meses: 100.000 UI dose única; 12 a 59 meses: 200.000 UI a cada 6 meses. Cortar a ponta da cápsula e pingar na boca. Registrar na Caderneta da Criança. Respeitar intervalo mínimo de 4 a 6 meses entre megadoses.'
      },
      {
        indicacao: 'Sarampo / xeroftalmia (OMS)',
        mgKgDose: null, mgKgDia: null, vezesDia: 1, frequencia: '1x/dia por 2 dias (D1 e D2); xeroftalmia: terceira dose em 2 a 4 semanas', via: 'VO',
        doseMaxDose: 200000, doseMaxDia: 200000, duracao: '2 doses (3 na xeroftalmia)', faixaEtaria: 'Todas as idades',
        unidade: 'UI',
        doseFixa: '< 6 meses: 50.000 UI; 6 a 11 meses: 100.000 UI; >= 12 meses: 200.000 UI, no D1 e D2',
        faixasIdade: '< 6 meses: 50.000 UI; 6 a 11 meses: 100.000 UI; >= 12 meses: 200.000 UI',
        obs: 'Dose fixa em UI por idade, no dia do diagnóstico e no dia seguinte: < 6 meses: 50.000 UI; 6 a 11 meses: 100.000 UI; >= 12 meses: 200.000 UI. Em xeroftalmia ou desnutrição grave com sinais oculares, repetir uma terceira dose 2 a 4 semanas depois. Para 50.000 UI usar metade da cápsula de 100.000 UI (aproximado) ou apresentação específica.'
      }
    ],
    diluicao: null,
    infusao: null,
    contraindicacoes: ['Hipervitaminose A', 'Gestação (megadoses: teratogênicas)', 'Hipersensibilidade'],
    interacoes: ['Retinoides orais (isotretinoína, acitretina): toxicidade aditiva', 'Tetraciclinas (hipertensão intracraniana)', 'Varfarina (pode aumentar efeito)', 'Orlistat, colestiramina (reduzem absorção)'],
    ajusteRenal: 'Sem ajuste.',
    ajusteHepatico: 'Cautela em hepatopatia (armazenamento hepático).',
    efeitosAdversos: ['Abaulamento de fontanela em lactentes (transitório, após megadose)', 'Náuseas, vômitos, cefaleia (hipervitaminose aguda)', 'Irritabilidade', 'Em uso crônico excessivo: hepatotoxicidade, dor óssea, alopecia, descamação'],
    fontes: [{nome: 'Manual de condutas gerais do Programa Nacional de Suplementação de Vitamina A – MS', ano: 2013}, {nome: 'OMS – Guideline: Vitamin A supplementation in infants and children 6-59 months', ano: 2011}, {nome: 'Guia de Vigilância em Saúde – MS (sarampo)', ano: 2024}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'soro_fisiologico',
    nome: 'Soro fisiológico (cloreto de sódio 0,9%)',
    classe: 'Solução cristaloide isotônica',
    apresentacoes: [
      {descricao: 'Solução 0,9% (9 mg/mL de NaCl; Na 154 mEq/L, Cl 154 mEq/L; 308 mOsm/L) – bolsas ou frascos de 100, 250, 500 e 1.000 mL', mg: 9, ml: 1, tipo: 'solucao_iv', via: 'IV/IO'},
      {descricao: 'Ampola 10 mL (para diluições e flush)', mg: 90, ml: 10, tipo: 'injetavel', via: 'IV'}
    ],
    indicacoes: ['Expansão volêmica em choque (hipovolêmico, séptico) e desidratação grave', 'Reidratação venosa – Plano C (alternativa ao Ringer lactato)', 'Fluido de manutenção (associado a glicose e potássio)', 'Diluição de medicamentos, lavagem de acesso venoso', 'Nebulização e lavagem nasal'],
    doses: [
      {
        indicacao: 'Choque / desidratação grave – expansão rápida (bolus)',
        mgKgDose: null, mgKgDia: null, vezesDia: null, frequencia: 'Repetir a cada 5 a 20 min conforme reavaliação (até 40 a 60 mL/kg na primeira hora)', via: 'IV ou IO',
        doseMaxDose: null, doseMaxDia: null, duracao: 'Até restaurar perfusão ou surgirem sinais de sobrecarga (hepatomegalia, estertores)', faixaEtaria: 'Todas as idades',
        mlKgDose: 20,
        obs: '20 mL/kg em 5 a 20 min (10 mL/kg em cardiopatia, desnutrição grave, cetoacidose diabética, ou se recursos de UTI indisponíveis conforme SSC 2020), reavaliando após cada bolus (FC, perfusão, PA, fígado, ausculta). Máximo usual 40 a 60 mL/kg na primeira hora; iniciar vasopressor se choque refratário. Considerar Ringer lactato ou outra solução balanceada para grandes volumes (acidose hiperclorêmica).'
      },
      {
        indicacao: 'Reidratação venosa – Plano C (desidratação grave, MS/OMS)',
        mgKgDose: null, mgKgDia: null, vezesDia: null, frequencia: '< 1 ano: 30 mL/kg em 1 h + 70 mL/kg em 5 h; >= 1 ano: 30 mL/kg em 30 min + 70 mL/kg em 2,5 h', via: 'IV',
        doseMaxDose: null, doseMaxDia: null, duracao: 'Total 100 mL/kg em 6 h (< 1 ano) ou 3 h (>= 1 ano)', faixaEtaria: 'Todas as idades',
        mlKgDose: 100,
        obs: 'Total 100 mL/kg de SF 0,9% ou Ringer lactato: < 1 ano: 30 mL/kg em 1 h e depois 70 mL/kg em 5 h; >= 1 ano: 30 mL/kg em 30 min e depois 70 mL/kg em 2,5 h. Repetir a fase rápida se pulso ainda fraco. Iniciar SRO assim que possível (5 mL/kg/h) e reavaliar a cada 15 a 30 min. Em desnutridos graves: fase de expansão mais lenta (15 mL/kg em 1 h) conforme manual do MS.'
      },
      {
        indicacao: 'Manutenção (Holliday-Segar) – base para solução isotônica',
        mgKgDose: null, mgKgDia: null, vezesDia: null, frequencia: 'Contínua (mL/h)', via: 'IV',
        doseMaxDose: null, doseMaxDia: null, duracao: 'Enquanto sem via oral', faixaEtaria: '> 28 dias',
        doseFixa: 'Holliday-Segar: 100 mL/kg/dia até 10 kg; + 50 mL/kg/dia de 10 a 20 kg; + 20 mL/kg/dia acima de 20 kg (máximo 2.400 mL/dia)',
        obs: 'Volume de manutenção pela regra de Holliday-Segar (4-2-1 mL/kg/h). Em > 28 dias, preferir solução isotônica (SF 0,9% + glicose 5% + KCl 20 mEq/L se diurese presente) para reduzir hiponatremia hospitalar (AAP 2018). Reduzir para 2/3 em SIADH, meningite, pneumonia, pós-operatório. Confirmar conforme protocolo.'
      },
      {
        indicacao: 'Nebulização / lavagem nasal',
        mgKgDose: null, mgKgDia: null, vezesDia: null, frequencia: 'Conforme necessidade', via: 'Inalatória / nasal',
        doseMaxDose: null, doseMaxDia: null, duracao: 'Conforme necessidade', faixaEtaria: 'Todas as idades',
        doseFixa: 'Nebulização: 3 a 5 mL; lavagem nasal: 1 a 5 mL por narina (lactentes) até 10 a 20 mL por narina (maiores)',
        obs: 'Nebulização isolada com SF não tem benefício comprovado na bronquiolite (SBP 2017), mas é o veículo padrão para salbutamol/ipratrópio. Lavagem nasal antes das mamadas alivia obstrução em lactentes.'
      }
    ],
    diluicao: null,
    infusao: 'Bolus: 20 mL/kg em 5 a 20 min (seringa / bolsa pressurizada em choque; em 20 a 60 min se desidratação sem choque). Manutenção em bomba de infusão.',
    contraindicacoes: ['Hipernatremia grave, hipercloremia', 'Sobrecarga de volume / insuficiência cardíaca descompensada (cautela)', 'Desnutrição grave com edema (expansão cautelosa)'],
    interacoes: ['Incompatibilidade com anfotericina B lipossomal (usar SG 5%)', 'Corticoides (retenção de sódio)'],
    ajusteRenal: 'Cautela em oligoanúria (sobrecarga).',
    ajusteHepatico: 'Cautela em ascite/cirrose (retenção de sódio).',
    efeitosAdversos: ['Acidose metabólica hiperclorêmica (grandes volumes)', 'Sobrecarga hídrica, edema pulmonar', 'Hipernatremia', 'Hiponatremia dilucional quando usado hipotônico (soluções ao meio ou ao quarto)'],
    fontes: [{nome: 'PALS – Pediatric Advanced Life Support, AHA', ano: 2020}, {nome: 'Surviving Sepsis Campaign – Pediatric Guidelines', ano: 2020}, {nome: 'Manejo do paciente com diarreia – MS/OPAS', ano: 2011}, {nome: 'AAP – Clinical Practice Guideline: Maintenance Intravenous Fluids in Children', ano: 2018}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'ringer_lactato',
    nome: 'Ringer lactato (solução de Hartmann)',
    classe: 'Solução cristaloide isotônica balanceada',
    apresentacoes: [
      {descricao: 'Solução para infusão (por litro: Na 130 mEq, K 4 mEq, Ca 3 mEq, Cl 109 mEq, lactato 28 mEq; 273 mOsm/L) – bolsas de 500 e 1.000 mL', mg: null, ml: 1000, tipo: 'solucao_iv', via: 'IV/IO'}
    ],
    indicacoes: ['Expansão volêmica em choque e desidratação grave (preferido em grandes volumes: menor acidose hiperclorêmica)', 'Reidratação venosa – Plano C (escolha do MS/OMS)', 'Reposição em queimaduras (fórmula de Parkland)'],
    doses: [
      {
        indicacao: 'Choque / desidratação grave – expansão rápida (bolus)',
        mgKgDose: null, mgKgDia: null, vezesDia: null, frequencia: 'Repetir a cada 5 a 20 min conforme reavaliação (até 40 a 60 mL/kg na primeira hora)', via: 'IV ou IO',
        doseMaxDose: null, doseMaxDia: null, duracao: 'Até restaurar perfusão ou surgirem sinais de sobrecarga', faixaEtaria: 'Todas as idades',
        mlKgDose: 20,
        obs: '20 mL/kg em 5 a 20 min (10 mL/kg em cardiopatia, desnutrição grave ou sem UTI disponível), reavaliando após cada bolus. SSC 2020 sugere cristaloides balanceados (Ringer lactato) em vez de SF 0,9% para ressuscitação. Não infundir na mesma linha que ceftriaxona (contém cálcio) ou hemoderivados.'
      },
      {
        indicacao: 'Reidratação venosa – Plano C (desidratação grave, MS/OMS)',
        mgKgDose: null, mgKgDia: null, vezesDia: null, frequencia: '< 1 ano: 30 mL/kg em 1 h + 70 mL/kg em 5 h; >= 1 ano: 30 mL/kg em 30 min + 70 mL/kg em 2,5 h', via: 'IV',
        doseMaxDose: null, doseMaxDia: null, duracao: 'Total 100 mL/kg em 6 h (< 1 ano) ou 3 h (>= 1 ano)', faixaEtaria: 'Todas as idades',
        mlKgDose: 100,
        obs: 'Total 100 mL/kg. Ringer lactato é a solução de escolha do MS/OMS para o Plano C (SF 0,9% se indisponível). Iniciar SRO (5 mL/kg/h) assim que a criança conseguir beber. Reavaliar a cada 15 a 30 min.'
      },
      {
        indicacao: 'Queimaduras – fórmula de Parkland (primeiras 24 h)',
        mgKgDose: null, mgKgDia: null, vezesDia: null, frequencia: 'Metade nas primeiras 8 h (a partir da hora da queimadura), metade nas 16 h seguintes', via: 'IV',
        doseMaxDose: null, doseMaxDia: null, duracao: '24 h, depois ajustar pela diurese (1 mL/kg/h)', faixaEtaria: 'Todas as idades (> 10 a 15% de SCQ)',
        doseFixa: '3 a 4 mL x peso (kg) x % de superfície corporal queimada, somado à manutenção em < 30 kg (com glicose)',
        obs: 'Parkland pediátrico: 3 a 4 mL/kg por % SCQ de Ringer lactato nas primeiras 24 h (metade nas primeiras 8 h), mais fluido de manutenção com glicose em < 30 kg. Titular pela diurese (1 mL/kg/h em crianças; 0,5 mL/kg/h em adolescentes). Confirmar conforme protocolo de queimados.',
        verificar: true
      }
    ],
    diluicao: null,
    infusao: 'Bolus: 20 mL/kg em 5 a 20 min em choque; Plano C conforme faixas de tempo; queimaduras em bomba.',
    contraindicacoes: ['Hiperpotassemia grave (contém 4 mEq/L de K)', 'Hipercalcemia', 'Alcalose metabólica grave', 'Insuficiência hepática grave (metabolização do lactato prejudicada; relativa)', 'Infusão simultânea com ceftriaxona em neonatos (precipitação) ou com hemoderivados (coagulação)'],
    interacoes: ['Ceftriaxona (precipitação com cálcio)', 'Hemoderivados (cálcio ativa a coagulação: usar linha separada)', 'Fármacos incompatíveis com cálcio (fosfatos, bicarbonato em altas concentrações)'],
    ajusteRenal: 'Cautela em insuficiência renal (potássio).',
    ajusteHepatico: 'Cautela em hepatopatia grave (lactato); sem ajuste de volume.',
    efeitosAdversos: ['Sobrecarga hídrica', 'Hiperlactatemia transitória (interpretar lactato com cautela)', 'Hiperpotassemia (raro, com função renal normal)', 'Hiponatremia leve em grandes volumes (Na 130 mEq/L)'],
    fontes: [{nome: 'Manejo do paciente com diarreia – MS/OPAS', ano: 2011}, {nome: 'Surviving Sepsis Campaign – Pediatric Guidelines', ano: 2020}, {nome: 'PALS – Pediatric Advanced Life Support, AHA', ano: 2020}, {nome: 'ATLS – Advanced Trauma Life Support, 10th ed.', ano: 2018}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'glicose',
    nome: 'Glicose (dextrose) IV',
    classe: 'Solução glicosada – correção de hipoglicemia e aporte calórico',
    apresentacoes: [
      {descricao: 'Solução glicosada 5% (50 mg/mL) – bolsas de 250, 500 e 1.000 mL', mg: 50, ml: 1, tipo: 'solucao_iv', via: 'IV'},
      {descricao: 'Solução glicosada 10% (100 mg/mL) – bolsas de 250, 500 e 1.000 mL', mg: 100, ml: 1, tipo: 'solucao_iv', via: 'IV'},
      {descricao: 'Glicose hipertônica 25% (250 mg/mL) – ampola 10 mL', mg: 250, ml: 1, tipo: 'injetavel', via: 'IV'},
      {descricao: 'Glicose hipertônica 50% (500 mg/mL) – ampola 10 e 20 mL', mg: 500, ml: 1, tipo: 'injetavel', via: 'IV (acesso central ou diluída)'}
    ],
    indicacoes: ['Hipoglicemia (glicemia < 45 a 50 mg/dL no neonato; < 60 a 70 mg/dL na criança)', 'Manutenção do aporte de glicose (TIG) em neonatos e crianças sem via oral', 'Veículo para diluição de medicamentos', 'Hiperpotassemia (com insulina)'],
    doses: [
      {
        indicacao: 'Hipoglicemia – lactentes e crianças (bolus)',
        mgKgDose: 500, mgKgDia: null, vezesDia: null, frequencia: 'Dose única; repetir glicemia em 15 a 30 min e manter infusão contínua', via: 'IV ou IO',
        doseMaxDose: 25000, doseMaxDia: null, duracao: 'Bolus único, seguido de manutenção com TIG 6 a 8 mg/kg/min', faixaEtaria: '> 28 dias',
        mlKgDose: 5,
        obs: '0,5 a 1 g/kg (500 a 1.000 mg/kg) = 5 a 10 mL/kg de glicose 10% (preferida) ou 2 a 4 mL/kg de glicose 25% (PALS: 0,5 a 1 g/kg). Máximo 25 g (adolescentes: 25 g = 50 mL de G50%). Glicose 50% deve ser diluída ao meio (para 25%) em veia periférica. Após o bolus, manter infusão contínua de G10% e monitorar glicemia; investigar causa (sepse, malária, desnutrição, jejum, insulina, intoxicação).'
      },
      {
        indicacao: 'Hipoglicemia neonatal (bolus)',
        mgKgDose: 200, mgKgDia: null, vezesDia: null, frequencia: 'Dose única; seguir com infusão contínua (TIG 5 a 8 mg/kg/min) e repetir glicemia em 30 min', via: 'IV',
        doseMaxDose: null, doseMaxDia: null, duracao: 'Bolus único', faixaEtaria: 'Neonatos (0 a 28 dias)',
        mlKgDose: 2,
        obs: '200 mg/kg = 2 mL/kg de glicose 10% em 1 a 2 min, seguido de infusão contínua de G10% a 5 a 8 mg/kg/min (aproximadamente 80 mL/kg/dia). Não usar soluções hipertônicas (25% ou 50%) em neonatos (hiperosmolaridade, hemorragia intraventricular).'
      },
      {
        indicacao: 'Manutenção – taxa de infusão de glicose (TIG)',
        mgKgDose: null, mgKgDia: null, vezesDia: null, frequencia: 'Contínua (mg/kg/min)', via: 'IV',
        doseMaxDose: null, doseMaxDia: null, duracao: 'Enquanto sem via oral; reduzir gradualmente', faixaEtaria: 'Todas as idades',
        doseFixa: 'Neonatos: 4 a 8 mg/kg/min (até 12 mg/kg/min em hiperinsulinismo); lactentes e crianças: 4 a 6 mg/kg/min',
        obs: 'Dose em mg/kg/MINUTO. Cálculo: TIG (mg/kg/min) = concentração (%) x volume (mL/h) / (6 x peso em kg). Concentração máxima em veia periférica: 12,5%; acima disso usar acesso central. Ex.: G10% a 3 mL/kg/h = 5 mg/kg/min.'
      }
    ],
    diluicao: 'G50%: diluir 1:1 com água para injeção ou SF para obter 25%; para preparar G10% a partir de G5%: adicionar 10 mL de G50% a cada 90 mL de G5%.',
    infusao: 'Bolus de correção em 1 a 5 min (G10% em 2 a 5 min; G25% em 1 a 3 min); manutenção em bomba de infusão. Soluções > 12,5% apenas em acesso central.',
    contraindicacoes: ['Hiperglicemia', 'Coma hiperosmolar', 'Soluções hipertônicas em veia periférica (> 12,5%) ou em neonatos', 'Hemorragia intracraniana e AVC agudo com glicemia normal (evitar hiperglicemia)', 'Cautela em cetoacidose diabética (usar apenas quando glicemia < 250 mg/dL)'],
    interacoes: ['Insulina (potencializa entrada de glicose e potássio)', 'Corticoides (hiperglicemia)', 'Incompatibilidade com fenitoína (precipita) e com sangue na mesma linha'],
    ajusteRenal: 'Sem ajuste; atenção ao volume.',
    ajusteHepatico: 'Sem ajuste.',
    efeitosAdversos: ['Hiperglicemia, glicosúria e diurese osmótica', 'Flebite e necrose por extravasamento (soluções hipertônicas)', 'Hipoglicemia de rebote (após bolus sem manutenção)', 'Hiponatremia (solução glicosada sem eletrólitos em manutenção prolongada)', 'Hipofosfatemia e hipopotassemia (realimentação)'],
    fontes: [{nome: 'PALS – Pediatric Advanced Life Support, AHA', ano: 2020}, {nome: 'SBP – Documento científico: Hipoglicemia neonatal', ano: 2021}, {nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}, {nome: 'Neofax / Pediatric & Neonatal Dosage Handbook', ano: 2023}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'sulfato_magnesio',
    nome: 'Sulfato de magnésio',
    classe: 'Eletrólito / broncodilatador adjuvante / anticonvulsivante (eclâmpsia)',
    apresentacoes: [
      {descricao: 'Ampola 50% (500 mg/mL; 10 mL = 5 g; 4 mEq de Mg/mL)', mg: 500, ml: 1, tipo: 'injetavel', via: 'IV (diluído)/IM'},
      {descricao: 'Ampola 10% (100 mg/mL; 10 mL = 1 g)', mg: 100, ml: 1, tipo: 'injetavel', via: 'IV'}
    ],
    indicacoes: ['Crise de asma grave refratária à terapia inicial (adjuvante)', 'Hipomagnesemia', 'Torsades de pointes / TV polimórfica', 'Eclâmpsia e pré-eclâmpsia grave (adolescentes gestantes)', 'Hipocalcemia refratária com hipomagnesemia'],
    doses: [
      {
        indicacao: 'Crise de asma grave (adjuvante)',
        mgKgDose: 50, mgKgDia: null, vezesDia: 1, frequencia: 'Dose única (pode repetir uma vez em 4 a 6 h conforme protocolo)', via: 'IV (infusão em 20 a 30 min)',
        doseMaxDose: 2000, doseMaxDia: null, duracao: 'Dose única', faixaEtaria: '> 2 anos (dados limitados em menores)',
        obs: '25 a 75 mg/kg (usual 50 mg/kg; máximo 2 g) diluído em SF 0,9% até 10 a 20 mg/mL e infundido em 20 a 30 min, com monitorização de PA, FC e reflexos. Indicado em crise grave sem resposta após 1 h de broncodilatador e corticoide (GINA 2024). Hipotensão se infusão rápida.'
      },
      {
        indicacao: 'Hipomagnesemia sintomática',
        mgKgDose: 50, mgKgDia: null, vezesDia: 1, frequencia: 'A cada 4 a 6 h por 2 a 3 doses conforme nível sérico', via: 'IV (infusão lenta) ou IM',
        doseMaxDose: 2000, doseMaxDia: null, duracao: 'Até correção (repor 2 a 3 doses e dosar magnésio)', faixaEtaria: 'Todas as idades',
        obs: '25 a 50 mg/kg/dose (máximo 2 g) IV em 1 a 4 h (mais rápido, em 10 a 20 min, se arritmia ou convulsão). Neonatos: 25 a 50 mg/kg/dose 8/8 h a 12/12 h por 2 a 3 doses. Monitorar magnésio, cálcio, PA e reflexos.'
      },
      {
        indicacao: 'Torsades de pointes / TV polimórfica (PALS)',
        mgKgDose: 50, mgKgDia: null, vezesDia: 1, frequencia: 'Dose única (pode repetir)', via: 'IV ou IO',
        doseMaxDose: 2000, doseMaxDia: null, duracao: 'Dose única', faixaEtaria: 'Todas as idades',
        obs: '25 a 50 mg/kg (máximo 2 g): em PCR, bolus rápido; com pulso, infusão em 10 a 20 min (PALS 2020).'
      },
      {
        indicacao: 'Eclâmpsia / pré-eclâmpsia grave (adolescente gestante) – esquema de Zuspan',
        mgKgDose: null, mgKgDia: null, vezesDia: null, frequencia: 'Ataque 4 g IV em 15 a 20 min; manutenção 1 g/h em infusão contínua por 24 h após o parto ou a última convulsão', via: 'IV',
        doseMaxDose: 4000, doseMaxDia: null, duracao: '24 h após o parto ou última crise', faixaEtaria: 'Adolescentes gestantes',
        doseFixa: 'Ataque: 4 g IV (8 mL de MgSO4 50% em 12 mL de água para injeção) em 15 a 20 min; manutenção: 1 g/h IV contínua',
        obs: 'Doses fixas (não por kg). Esquema de Pritchard (sem bomba): 4 g IV + 10 g IM (5 g em cada glúteo), depois 5 g IM 4/4 h. Monitorar reflexo patelar, FR (>= 16), diurese (>= 25 mL/h); antídoto gluconato de cálcio 10% 10 mL IV lento. Confirmar conforme protocolo obstétrico (MS).'
      }
    ],
    diluicao: 'IV: diluir em SF 0,9% ou SG 5% até concentração <= 20% (ideal 10 a 20 mg/mL em pediatria; máximo 200 mg/mL). IM: ampola 50% sem diluir (dolorosa), volumes divididos.',
    infusao: 'Asma / hipomagnesemia: 20 a 30 min (máximo 150 mg/min; até 1 g/min apenas em emergência com pulso ausente). Infusão rápida causa hipotensão, rubor e bloqueio cardíaco.',
    contraindicacoes: ['Bloqueio cardíaco, lesão miocárdica', 'Miastenia gravis', 'Insuficiência renal grave (acúmulo)', 'Hipermagnesemia', 'Hipocalcemia grave não corrigida'],
    interacoes: ['Bloqueadores neuromusculares (potencializa)', 'Bloqueadores de canal de cálcio (hipotensão, bloqueio)', 'Depressores do SNC', 'Aminoglicosídeos (bloqueio neuromuscular)', 'Incompatível na mesma solução com cálcio, bicarbonato, fosfato, polimixina'],
    ajusteRenal: 'Reduzir dose e monitorar nível em ClCr < 30 mL/min; evitar em insuficiência grave.',
    ajusteHepatico: 'Sem ajuste.',
    efeitosAdversos: ['Rubor, sensação de calor, náuseas', 'Hipotensão (infusão rápida)', 'Abolição de reflexos, fraqueza, depressão respiratória (nível > 4 a 5 mmol/L)', 'Bradicardia, bloqueio AV, PCR (nível > 6 a 7 mmol/L)', 'Hipocalcemia', 'Dor no local (IM)'],
    fontes: [{nome: 'GINA – Global Strategy for Asthma Management and Prevention', ano: 2024}, {nome: 'PALS – Pediatric Advanced Life Support, AHA', ano: 2020}, {nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}, {nome: 'Manual de Gestação de Alto Risco – MS', ano: 2022}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'cetamina',
    nome: 'Cetamina',
    classe: 'Anestésico dissociativo – antagonista NMDA',
    apresentacoes: [
      {descricao: 'Frasco-ampola 50 mg/mL (10 mL = 500 mg)', mg: 50, ml: 1, tipo: 'injetavel', via: 'IV/IM'},
      {descricao: 'Solução diluída para IV 5 mg/mL – preparar: 1 mL (50 mg) + 9 mL de SF 0,9%', mg: 50, ml: 10, tipo: 'injetavel', via: 'IV', reconstituicao: '1 mL de cetamina 50 mg/mL + 9 mL de SF 0,9% = 10 mL a 5 mg/mL'}
    ],
    indicacoes: ['Sedação e analgesia para procedimentos (redução de fraturas, suturas, curativos de queimados)', 'Indução em sequência rápida de intubação (especialmente em choque e broncoespasmo)', 'Analgesia em dose subdissociativa (trauma, queimaduras)', 'Estado de mal asmático refratário (sedação)', 'Estado de mal epiléptico refratário (UTI)'],
    doses: [
      {
        indicacao: 'Sedação dissociativa para procedimento – IV',
        mgKgDose: 1, mgKgDia: null, vezesDia: null, frequencia: 'Doses adicionais de 0,5 mg/kg a cada 5 a 10 min se necessário', via: 'IV lento (em 1 a 2 min; solução 5 mg/mL)',
        doseMaxDose: null, doseMaxDia: null, duracao: 'Procedimento (efeito 10 a 15 min; recuperação 30 a 60 min)', faixaEtaria: '> 3 meses (ACEP: evitar em < 3 meses)',
        obs: '1 a 2 mg/kg IV em 1 a 2 min (usual 1 a 1,5 mg/kg), com doses adicionais de 0,5 mg/kg. Injeção rápida (< 1 min) aumenta o risco de apneia e laringoespasmo. Monitorização contínua (oximetria, capnografia quando disponível), jejum conforme protocolo, material de via aérea à beira do leito. Atropina e midazolam adjuvantes não são rotina (ACEP 2011). Aplicar em ambiente com profissional treinado em via aérea.'
      },
      {
        indicacao: 'Sedação dissociativa para procedimento – IM',
        mgKgDose: 4, mgKgDia: null, vezesDia: null, frequencia: 'Dose adicional de 2 a 4 mg/kg após 10 min se sedação inadequada', via: 'IM',
        doseMaxDose: null, doseMaxDia: null, duracao: 'Procedimento (efeito 15 a 30 min; recuperação 60 a 120 min)', faixaEtaria: '> 3 meses',
        obs: '4 a 5 mg/kg IM (usar solução 50 mg/mL para reduzir volume). Início em 3 a 5 min. Recuperação mais prolongada que IV; vômitos mais frequentes.'
      },
      {
        indicacao: 'Indução em sequência rápida de intubação',
        mgKgDose: 2, mgKgDia: null, vezesDia: null, frequencia: 'Dose única antes do bloqueador neuromuscular', via: 'IV ou IO (bolus)',
        doseMaxDose: null, doseMaxDia: null, duracao: 'Dose única', faixaEtaria: 'Todas as idades',
        obs: '1 a 2 mg/kg IV/IO. Preferida em choque (preserva PA), asma grave (broncodilatação) e trauma; em choque descompensado usar dose menor (0,5 a 1 mg/kg). IM: 4 mg/kg se sem acesso. Confirmar conforme protocolo de via aérea.'
      },
      {
        indicacao: 'Analgesia subdissociativa (dose baixa)',
        mgKgDose: 0.3, mgKgDia: null, vezesDia: null, frequencia: 'Pode repetir após 15 a 30 min', via: 'IV (infusão em 10 a 15 min) ou intranasal',
        doseMaxDose: 30, doseMaxDia: null, duracao: 'Conforme necessidade', faixaEtaria: '> 3 meses',
        obs: '0,1 a 0,3 mg/kg IV diluída em 50 a 100 mL de SF em 10 a 15 min (menos disforia que em bolus); intranasal: 0,5 a 1 mg/kg (solução 50 mg/mL com atomizador). Máximo usual 30 mg por dose em analgesia. Confirmar conforme protocolo institucional.',
        verificar: true
      }
    ],
    diluicao: 'IV: diluir 50 mg (1 mL) em 9 mL de SF 0,9% (5 mg/mL) para bolus; infusão contínua em SF ou SG 5% (ex.: 1 a 2 mg/mL). IM: sem diluição (50 mg/mL).',
    infusao: 'Bolus IV em 1 a 2 min (nunca < 1 min); dose analgésica em 10 a 15 min; infusão contínua (sedação em UTI / estado de mal asmático ou epiléptico refratário: 0,5 a 2 mg/kg/h, somente em UTI, conforme protocolo).',
    contraindicacoes: ['Menores de 3 meses (risco de apneia e laringoespasmo)', 'Hipersensibilidade', 'Psicose ativa', 'Hipertensão intracraniana com hidrocefalia obstrutiva ou hipertensão arterial grave não controlada (relativa)', 'Procedimentos com estimulação intensa da faringe posterior (relativa)', 'Doença da tireoide não controlada, porfiria (relativa)', 'Glaucoma / lesão ocular aberta (relativa)'],
    interacoes: ['Benzodiazepínicos e opioides (depressão respiratória aditiva; prolongam recuperação)', 'Teofilina/aminofilina (redução do limiar convulsivo)', 'Hormônios tireoidianos (hipertensão, taquicardia)', 'Anti-hipertensivos (resposta imprevisível)', 'Halogenados (potencialização)'],
    ajusteRenal: 'Sem ajuste.',
    ajusteHepatico: 'Reduzir dose em hepatopatia grave (metabolismo hepático).',
    efeitosAdversos: ['Vômitos (principalmente na recuperação, mais com IM)', 'Fenômenos de emergência (alucinações, agitação; mais em adolescentes e adultos)', 'Hipersalivação', 'Laringoespasmo (0,3 a 1%; tratar com ventilação sob pressão positiva)', 'Apneia transitória (bolus rápido)', 'Taquicardia, hipertensão', 'Nistagmo, hipertonia, movimentos mioclônicos', 'Exantema transitório'],
    fontes: [{nome: 'ACEP – Clinical Practice Guideline for Emergency Department Ketamine Dissociative Sedation', ano: 2011}, {nome: 'PALS – Pediatric Advanced Life Support, AHA', ano: 2020}, {nome: 'Harriet Lane Handbook, 23rd ed.', ano: 2023}, {nome: 'Bula ANVISA – Cloridrato de cetamina', ano: 2024}],
    atualizadoEm: '2026-09',
    verificar: false
  },
  // ---- Soros antivenenos: dose por GRAVIDADE (não por peso), igual para crianças e adultos ----
  {
    id: 'soro_antibotropico',
    nome: 'Soro antibotrópico (SAB)',
    classe: 'Soro heterólogo antiveneno (imunoglobulina equina)',
    apresentacoes: [{ descricao: 'Ampola 10 mL (dose expressa em ampolas)', mg: null, ml: 10, tipo: 'injetavel', via: 'IV', unidade: 'ampolas' }],
    indicacoes: ['Acidente botrópico (Bothrops – jararaca, jararacuçu, surucucurana)'],
    doses: [{
      indicacao: 'Acidente botrópico (Bothrops – jararaca, jararacuçu, surucucurana)', mgKgDose: null, mgKgDia: null, vezesDia: 1, frequencia: 'Dose única (repetir apenas se persistir incoagulabilidade/piora após 12 a 24 h, conforme protocolo)', via: 'IV (diluído em SF 0,9% ou SG 5%, infusão em 20 a 60 min)', doseMaxDose: null, doseMaxDia: null, duracao: 'Dose única', faixaEtaria: 'Todas as idades', unidade: 'ampolas',
      doseFixa: 'Leve: 2 a 4 ampolas; Moderado: 4 a 8 ampolas; Grave: 12 ampolas', faixasPeso: 'A dose NÃO depende do peso ou da idade: crianças recebem o mesmo número de ampolas que adultos, definido pela gravidade.',
      obs: 'Classificação pela intensidade do edema, dor, sangramento e tempo de coagulação (MS 2001). Dose definida pela classificação clínica de gravidade, igual para crianças e adultos. Administrar o mais precocemente possível; não usar via IM/local. Pré-medicação com anti-histamínico e corticoide não previne reações graves; manter adrenalina, O2 e material de reanimação à beira do leito. Observar reações precoces (urticária, broncoespasmo, hipotensão) por 24 h e reação tardia (doença do soro) em 5 a 24 dias.'
    }],
    diluicao: 'Diluir as ampolas em SF 0,9% ou SG 5% (volume conforme idade/peso, ex.: 100 a 250 mL em crianças), infundir em 20 a 60 min; em crianças pequenas com risco de sobrecarga, reduzir o volume de diluição.',
    infusao: '20 a 60 min IV; interromper temporariamente se reação e tratar (adrenalina IM 0,01 mg/kg, anti-histamínico, corticoide, broncodilatador); reiniciar em velocidade menor após controle.',
    contraindicacoes: ['Não há contraindicação absoluta quando há indicação clínica (risco de morte); reação prévia a soro heterólogo exige preparo para anafilaxia.'],
    interacoes: ['Nenhuma interação medicamentosa relevante; evitar heparina e anticoagulantes em coagulopatia por veneno.'],
    ajusteRenal: 'Não requer ajuste; monitorar função renal (lesão renal aguda é complicação do envenenamento).',
    ajusteHepatico: 'Não requer ajuste.',
    efeitosAdversos: ['Reações precoces (até 2 h): urticária, prurido, tosse, broncoespasmo, hipotensão, anafilaxia.', 'Reação tardia (doença do soro, 5 a 24 dias): febre, artralgia, urticária, linfadenopatia.', 'Reação pirogênica.'],
    fontes: [{ nome: 'Manual de Diagnóstico e Tratamento de Acidentes por Animais Peçonhentos – Ministério da Saúde/FUNASA', ano: 2001 }, { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 }, { nome: 'Instituto Butantan – Bulas dos soros antivenenos', ano: 2023 }],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'soro_antilaquetico',
    nome: 'Soro antibotrópico-laquético (SABL)',
    classe: 'Soro heterólogo antiveneno (imunoglobulina equina)',
    apresentacoes: [{ descricao: 'Ampola 10 mL (dose expressa em ampolas)', mg: null, ml: 10, tipo: 'injetavel', via: 'IV', unidade: 'ampolas' }],
    indicacoes: ['Acidente laquético (Lachesis muta – surucucu-pico-de-jaca)'],
    doses: [{
      indicacao: 'Acidente laquético (Lachesis muta – surucucu-pico-de-jaca)', mgKgDose: null, mgKgDia: null, vezesDia: 1, frequencia: 'Dose única (repetir apenas se persistir incoagulabilidade/piora após 12 a 24 h, conforme protocolo)', via: 'IV (diluído em SF 0,9% ou SG 5%, infusão em 20 a 60 min)', doseMaxDose: null, doseMaxDia: null, duracao: 'Dose única', faixaEtaria: 'Todas as idades', unidade: 'ampolas',
      doseFixa: 'Moderado: 10 ampolas; Grave: 20 ampolas', faixasPeso: 'A dose NÃO depende do peso ou da idade: crianças recebem o mesmo número de ampolas que adultos, definido pela gravidade.',
      obs: 'Considerar quadro botrópico com manifestações vagais (bradicardia, hipotensão, diarreia) na região amazônica. Dose definida pela classificação clínica de gravidade, igual para crianças e adultos. Administrar o mais precocemente possível; não usar via IM/local. Pré-medicação com anti-histamínico e corticoide não previne reações graves; manter adrenalina, O2 e material de reanimação à beira do leito. Observar reações precoces (urticária, broncoespasmo, hipotensão) por 24 h e reação tardia (doença do soro) em 5 a 24 dias.'
    }],
    diluicao: 'Diluir as ampolas em SF 0,9% ou SG 5% (volume conforme idade/peso, ex.: 100 a 250 mL em crianças), infundir em 20 a 60 min; em crianças pequenas com risco de sobrecarga, reduzir o volume de diluição.',
    infusao: '20 a 60 min IV; interromper temporariamente se reação e tratar (adrenalina IM 0,01 mg/kg, anti-histamínico, corticoide, broncodilatador); reiniciar em velocidade menor após controle.',
    contraindicacoes: ['Não há contraindicação absoluta quando há indicação clínica (risco de morte); reação prévia a soro heterólogo exige preparo para anafilaxia.'],
    interacoes: ['Nenhuma interação medicamentosa relevante; evitar heparina e anticoagulantes em coagulopatia por veneno.'],
    ajusteRenal: 'Não requer ajuste; monitorar função renal (lesão renal aguda é complicação do envenenamento).',
    ajusteHepatico: 'Não requer ajuste.',
    efeitosAdversos: ['Reações precoces (até 2 h): urticária, prurido, tosse, broncoespasmo, hipotensão, anafilaxia.', 'Reação tardia (doença do soro, 5 a 24 dias): febre, artralgia, urticária, linfadenopatia.', 'Reação pirogênica.'],
    fontes: [{ nome: 'Manual de Diagnóstico e Tratamento de Acidentes por Animais Peçonhentos – Ministério da Saúde/FUNASA', ano: 2001 }, { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 }, { nome: 'Instituto Butantan – Bulas dos soros antivenenos', ano: 2023 }],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'soro_anticrotalico',
    nome: 'Soro anticrotálico (SAC)',
    classe: 'Soro heterólogo antiveneno (imunoglobulina equina)',
    apresentacoes: [{ descricao: 'Ampola 10 mL (dose expressa em ampolas)', mg: null, ml: 10, tipo: 'injetavel', via: 'IV', unidade: 'ampolas' }],
    indicacoes: ['Acidente crotálico (Crotalus durissus – cascavel)'],
    doses: [{
      indicacao: 'Acidente crotálico (Crotalus durissus – cascavel)', mgKgDose: null, mgKgDia: null, vezesDia: 1, frequencia: 'Dose única (repetir apenas se persistir incoagulabilidade/piora após 12 a 24 h, conforme protocolo)', via: 'IV (diluído em SF 0,9% ou SG 5%, infusão em 20 a 60 min)', doseMaxDose: null, doseMaxDia: null, duracao: 'Dose única', faixaEtaria: 'Todas as idades', unidade: 'ampolas',
      doseFixa: 'Leve: 5 ampolas; Moderado: 10 ampolas; Grave: 20 ampolas', faixasPeso: 'A dose NÃO depende do peso ou da idade: crianças recebem o mesmo número de ampolas que adultos, definido pela gravidade.',
      obs: 'Fácies miastênica, mialgia, urina escura (rabdomiólise); monitorar função renal. Dose definida pela classificação clínica de gravidade, igual para crianças e adultos. Administrar o mais precocemente possível; não usar via IM/local. Pré-medicação com anti-histamínico e corticoide não previne reações graves; manter adrenalina, O2 e material de reanimação à beira do leito. Observar reações precoces (urticária, broncoespasmo, hipotensão) por 24 h e reação tardia (doença do soro) em 5 a 24 dias.'
    }],
    diluicao: 'Diluir as ampolas em SF 0,9% ou SG 5% (volume conforme idade/peso, ex.: 100 a 250 mL em crianças), infundir em 20 a 60 min; em crianças pequenas com risco de sobrecarga, reduzir o volume de diluição.',
    infusao: '20 a 60 min IV; interromper temporariamente se reação e tratar (adrenalina IM 0,01 mg/kg, anti-histamínico, corticoide, broncodilatador); reiniciar em velocidade menor após controle.',
    contraindicacoes: ['Não há contraindicação absoluta quando há indicação clínica (risco de morte); reação prévia a soro heterólogo exige preparo para anafilaxia.'],
    interacoes: ['Nenhuma interação medicamentosa relevante; evitar heparina e anticoagulantes em coagulopatia por veneno.'],
    ajusteRenal: 'Não requer ajuste; monitorar função renal (lesão renal aguda é complicação do envenenamento).',
    ajusteHepatico: 'Não requer ajuste.',
    efeitosAdversos: ['Reações precoces (até 2 h): urticária, prurido, tosse, broncoespasmo, hipotensão, anafilaxia.', 'Reação tardia (doença do soro, 5 a 24 dias): febre, artralgia, urticária, linfadenopatia.', 'Reação pirogênica.'],
    fontes: [{ nome: 'Manual de Diagnóstico e Tratamento de Acidentes por Animais Peçonhentos – Ministério da Saúde/FUNASA', ano: 2001 }, { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 }, { nome: 'Instituto Butantan – Bulas dos soros antivenenos', ano: 2023 }],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'soro_antielapidico',
    nome: 'Soro antielapídico (SAEl)',
    classe: 'Soro heterólogo antiveneno (imunoglobulina equina)',
    apresentacoes: [{ descricao: 'Ampola 10 mL (dose expressa em ampolas)', mg: null, ml: 10, tipo: 'injetavel', via: 'IV', unidade: 'ampolas' }],
    indicacoes: ['Acidente elapídico (Micrurus – coral verdadeira)'],
    doses: [{
      indicacao: 'Acidente elapídico (Micrurus – coral verdadeira)', mgKgDose: null, mgKgDia: null, vezesDia: 1, frequencia: 'Dose única (repetir apenas se persistir incoagulabilidade/piora após 12 a 24 h, conforme protocolo)', via: 'IV (diluído em SF 0,9% ou SG 5%, infusão em 20 a 60 min)', doseMaxDose: null, doseMaxDia: null, duracao: 'Dose única', faixaEtaria: 'Todas as idades', unidade: 'ampolas',
      doseFixa: 'Todos os casos considerados potencialmente graves: 10 ampolas', faixasPeso: 'A dose NÃO depende do peso ou da idade: crianças recebem o mesmo número de ampolas que adultos, definido pela gravidade.',
      obs: 'Risco de insuficiência respiratória por bloqueio neuromuscular; suporte ventilatório disponível. Dose definida pela classificação clínica de gravidade, igual para crianças e adultos. Administrar o mais precocemente possível; não usar via IM/local. Pré-medicação com anti-histamínico e corticoide não previne reações graves; manter adrenalina, O2 e material de reanimação à beira do leito. Observar reações precoces (urticária, broncoespasmo, hipotensão) por 24 h e reação tardia (doença do soro) em 5 a 24 dias.'
    }],
    diluicao: 'Diluir as ampolas em SF 0,9% ou SG 5% (volume conforme idade/peso, ex.: 100 a 250 mL em crianças), infundir em 20 a 60 min; em crianças pequenas com risco de sobrecarga, reduzir o volume de diluição.',
    infusao: '20 a 60 min IV; interromper temporariamente se reação e tratar (adrenalina IM 0,01 mg/kg, anti-histamínico, corticoide, broncodilatador); reiniciar em velocidade menor após controle.',
    contraindicacoes: ['Não há contraindicação absoluta quando há indicação clínica (risco de morte); reação prévia a soro heterólogo exige preparo para anafilaxia.'],
    interacoes: ['Nenhuma interação medicamentosa relevante; evitar heparina e anticoagulantes em coagulopatia por veneno.'],
    ajusteRenal: 'Não requer ajuste; monitorar função renal (lesão renal aguda é complicação do envenenamento).',
    ajusteHepatico: 'Não requer ajuste.',
    efeitosAdversos: ['Reações precoces (até 2 h): urticária, prurido, tosse, broncoespasmo, hipotensão, anafilaxia.', 'Reação tardia (doença do soro, 5 a 24 dias): febre, artralgia, urticária, linfadenopatia.', 'Reação pirogênica.'],
    fontes: [{ nome: 'Manual de Diagnóstico e Tratamento de Acidentes por Animais Peçonhentos – Ministério da Saúde/FUNASA', ano: 2001 }, { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 }, { nome: 'Instituto Butantan – Bulas dos soros antivenenos', ano: 2023 }],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'soro_antiescorpionico',
    nome: 'Soro antiescorpiônico (SAEsc)',
    classe: 'Soro heterólogo antiveneno (imunoglobulina equina)',
    apresentacoes: [{ descricao: 'Ampola 10 mL (dose expressa em ampolas)', mg: null, ml: 10, tipo: 'injetavel', via: 'IV', unidade: 'ampolas' }],
    indicacoes: ['Escorpionismo (Tityus) moderado ou grave'],
    doses: [{
      indicacao: 'Escorpionismo (Tityus) moderado ou grave', mgKgDose: null, mgKgDia: null, vezesDia: 1, frequencia: 'Dose única (repetir apenas se persistir incoagulabilidade/piora após 12 a 24 h, conforme protocolo)', via: 'IV (diluído em SF 0,9% ou SG 5%, infusão em 20 a 60 min)', doseMaxDose: null, doseMaxDia: null, duracao: 'Dose única', faixaEtaria: 'Todas as idades', unidade: 'ampolas',
      doseFixa: 'Moderado: 2 a 3 ampolas; Grave: 4 a 6 ampolas', faixasPeso: 'A dose NÃO depende do peso ou da idade: crianças recebem o mesmo número de ampolas que adultos, definido pela gravidade.',
      obs: 'Casos leves (dor local apenas) não recebem soro: analgesia e observação por 6 a 12 h. Crianças < 7 anos têm maior risco de gravidade. Dose definida pela classificação clínica de gravidade, igual para crianças e adultos. Administrar o mais precocemente possível; não usar via IM/local. Pré-medicação com anti-histamínico e corticoide não previne reações graves; manter adrenalina, O2 e material de reanimação à beira do leito. Observar reações precoces (urticária, broncoespasmo, hipotensão) por 24 h e reação tardia (doença do soro) em 5 a 24 dias.'
    }],
    diluicao: 'Diluir as ampolas em SF 0,9% ou SG 5% (volume conforme idade/peso, ex.: 100 a 250 mL em crianças), infundir em 20 a 60 min; em crianças pequenas com risco de sobrecarga, reduzir o volume de diluição.',
    infusao: '20 a 60 min IV; interromper temporariamente se reação e tratar (adrenalina IM 0,01 mg/kg, anti-histamínico, corticoide, broncodilatador); reiniciar em velocidade menor após controle.',
    contraindicacoes: ['Não há contraindicação absoluta quando há indicação clínica (risco de morte); reação prévia a soro heterólogo exige preparo para anafilaxia.'],
    interacoes: ['Nenhuma interação medicamentosa relevante; evitar heparina e anticoagulantes em coagulopatia por veneno.'],
    ajusteRenal: 'Não requer ajuste; monitorar função renal (lesão renal aguda é complicação do envenenamento).',
    ajusteHepatico: 'Não requer ajuste.',
    efeitosAdversos: ['Reações precoces (até 2 h): urticária, prurido, tosse, broncoespasmo, hipotensão, anafilaxia.', 'Reação tardia (doença do soro, 5 a 24 dias): febre, artralgia, urticária, linfadenopatia.', 'Reação pirogênica.'],
    fontes: [{ nome: 'Manual de Diagnóstico e Tratamento de Acidentes por Animais Peçonhentos – Ministério da Saúde/FUNASA', ano: 2001 }, { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 }, { nome: 'Instituto Butantan – Bulas dos soros antivenenos', ano: 2023 }],
    atualizadoEm: '2026-09',
    verificar: false
  },
  {
    id: 'soro_antiaracnidico',
    nome: 'Soro antiaracnídico (SAAr)',
    classe: 'Soro heterólogo antiveneno (imunoglobulina equina)',
    apresentacoes: [{ descricao: 'Ampola 10 mL (dose expressa em ampolas)', mg: null, ml: 10, tipo: 'injetavel', via: 'IV', unidade: 'ampolas' }],
    indicacoes: ['Araneísmo por Phoneutria (armadeira) moderado/grave; escorpionismo quando SAEsc indisponível'],
    doses: [{
      indicacao: 'Araneísmo por Phoneutria (armadeira) moderado/grave; escorpionismo quando SAEsc indisponível', mgKgDose: null, mgKgDia: null, vezesDia: 1, frequencia: 'Dose única (repetir apenas se persistir incoagulabilidade/piora após 12 a 24 h, conforme protocolo)', via: 'IV (diluído em SF 0,9% ou SG 5%, infusão em 20 a 60 min)', doseMaxDose: null, doseMaxDia: null, duracao: 'Dose única', faixaEtaria: 'Todas as idades', unidade: 'ampolas',
      doseFixa: 'Phoneutria moderado: 2 a 4 ampolas; grave: 5 a 10 ampolas. Loxosceles (soro antiloxoscélico/antiaracnídico): forma cutânea 5 ampolas; cutâneo-visceral 10 ampolas', faixasPeso: 'A dose NÃO depende do peso ou da idade: crianças recebem o mesmo número de ampolas que adultos, definido pela gravidade.',
      obs: 'Latrodectus: soro antilatrodéctico 1 a 2 ampolas IM quando disponível. Dose definida pela classificação clínica de gravidade, igual para crianças e adultos. Administrar o mais precocemente possível; não usar via IM/local. Pré-medicação com anti-histamínico e corticoide não previne reações graves; manter adrenalina, O2 e material de reanimação à beira do leito. Observar reações precoces (urticária, broncoespasmo, hipotensão) por 24 h e reação tardia (doença do soro) em 5 a 24 dias.'
    }],
    diluicao: 'Diluir as ampolas em SF 0,9% ou SG 5% (volume conforme idade/peso, ex.: 100 a 250 mL em crianças), infundir em 20 a 60 min; em crianças pequenas com risco de sobrecarga, reduzir o volume de diluição.',
    infusao: '20 a 60 min IV; interromper temporariamente se reação e tratar (adrenalina IM 0,01 mg/kg, anti-histamínico, corticoide, broncodilatador); reiniciar em velocidade menor após controle.',
    contraindicacoes: ['Não há contraindicação absoluta quando há indicação clínica (risco de morte); reação prévia a soro heterólogo exige preparo para anafilaxia.'],
    interacoes: ['Nenhuma interação medicamentosa relevante; evitar heparina e anticoagulantes em coagulopatia por veneno.'],
    ajusteRenal: 'Não requer ajuste; monitorar função renal (lesão renal aguda é complicação do envenenamento).',
    ajusteHepatico: 'Não requer ajuste.',
    efeitosAdversos: ['Reações precoces (até 2 h): urticária, prurido, tosse, broncoespasmo, hipotensão, anafilaxia.', 'Reação tardia (doença do soro, 5 a 24 dias): febre, artralgia, urticária, linfadenopatia.', 'Reação pirogênica.'],
    fontes: [{ nome: 'Manual de Diagnóstico e Tratamento de Acidentes por Animais Peçonhentos – Ministério da Saúde/FUNASA', ano: 2001 }, { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 }, { nome: 'Instituto Butantan – Bulas dos soros antivenenos', ano: 2023 }],
    atualizadoEm: '2026-09',
    verificar: false
  }
];
