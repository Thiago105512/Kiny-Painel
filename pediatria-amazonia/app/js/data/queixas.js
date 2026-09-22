window.PED = window.PED || {}; var PED = window.PED; PED.data = PED.data || {};

// Queixas (anamnese dirigida + diferenciais por regras).
// Regra: se.sintomas = todos os ids marcados; se.contexto = ao menos um id marcado; se: {} = sempre aplicada.
// Apoio à decisão: nunca "diagnóstico"; usar "considerar", "compatível com", "avaliar".
(function () {
  // Vocabulário global de sintomas (ids únicos, reutilizados entre queixas)
  var SINT = {
    febre: 'Febre', calafrios: 'Calafrios', cefaleia: 'Cefaleia', mialgia: 'Mialgia', artralgia: 'Artralgia',
    exantema: 'Exantema', ictericia: 'Icterícia', tosse: 'Tosse', dispneia: 'Dispneia', sibilancia: 'Sibilância',
    coriza: 'Coriza', dor_garganta: 'Dor de garganta', diarreia: 'Diarreia', diarreia_sangue: 'Diarreia com sangue',
    vomitos: 'Vômitos', dor_abdominal: 'Dor abdominal', convulsao: 'Convulsão', alteracao_consciencia: 'Alteração da consciência',
    palidez: 'Palidez', fraqueza: 'Fraqueza', perda_peso: 'Perda de peso', edema: 'Edema', sangramento: 'Sangramento',
    petequias: 'Petéquias', lesoes_pele: 'Lesões de pele', prurido: 'Prurido', feridas: 'Feridas',
    linfonodomegalia: 'Linfonodomegalia', hepatomegalia: 'Hepatomegalia', esplenomegalia: 'Esplenomegalia',
    dor_urinaria: 'Dor ao urinar', reducao_diurese: 'Redução da diurese', picada_inseto: 'Picada de inseto',
    mordedura_animal: 'Mordedura de animal', conjuntivite: 'Conjuntivite', rigidez_nuca: 'Rigidez de nuca',
    desidratacao: 'Sinais de desidratação', sudorese: 'Sudorese', dor_local: 'Dor local', dor_retroorbitaria: 'Dor retro-orbitária',
    dor_toracica: 'Dor torácica', taquipneia: 'Taquipneia', tiragem: 'Tiragem', estridor: 'Estridor', sibilos: 'Sibilos',
    gemencia: 'Gemência', distensao_abdominal: 'Distensão abdominal', febre_prolongada: 'Febre prolongada (> 7 dias)',
    tosse_prolongada: 'Tosse prolongada (> 3 semanas)', hematuria: 'Hematúria', oliguria: 'Oligúria', hipotonia: 'Hipotonia',
    irritabilidade: 'Irritabilidade', recusa_alimentar: 'Recusa alimentar', apatia: 'Apatia', ulcera_cutanea: 'Úlcera cutânea',
    lesao_hipocromica: 'Mancha hipocrômica', alteracao_sensibilidade: 'Alteração de sensibilidade',
    sangramento_gengival: 'Sangramento gengival', epistaxe: 'Epistaxe', hipoglicemia: 'Hipoglicemia'
  };
  function sx(ids) { return ids.map(function (id) { return { id: id, nome: SINT[id] || id }; }); }
  function d(doencaId, nota) { return nota ? { doencaId: doencaId, nota: nota } : { doencaId: doencaId }; }
  function n(nome, nota) { return nota ? { nome: nome, doencaId: null, nota: nota } : { nome: nome, doencaId: null }; }

  var FONTES = [
    { nome: 'Ministério da Saúde – Guias de vigilância, malária, dengue, animais peçonhentos e AIDPI', ano: 2024 },
    { nome: 'Sociedade Brasileira de Pediatria – Tratado e documentos científicos', ano: 2023 },
    { nome: 'OMS/OPAS – AIDPI e Pocket Book of Hospital Care for Children', ano: 2013 }
  ];
  var ATUAL = '2026-09';
  var CTX_MALARIA = ['rural', 'ribeirinha', 'indigena', 'mata', 'garimpo', 'malaria_previa', 'viagem', 'mosquito'];
  var CTX_LEPTO = ['enchente', 'agua_rio', 'agua', 'roedores'];

  PED.data.queixas = [
    // ---------------------------------------------------------------- FEBRE
    {
      id: 'febre', nome: 'Febre', grupo: 'febre', icone: '🌡️',
      perguntas: [
        'Há quantos dias? Temperatura máxima e como foi medida?',
        'Padrão da febre (contínua, intermitente, com calafrios e sudorese)?',
        'Melhora o estado geral entre os picos?',
        'Aceita líquidos e alimentos? Diurese normal?',
        'Sintomas associados (tosse, coriza, diarreia, vômitos, exantema, dor ao urinar)?',
        'Caderneta de vacinação em dia?',
        'Alguém em casa ou na comunidade com o mesmo quadro?',
        'Mora ou esteve em área de malária nos últimos 30 dias?'
      ],
      sintomasAssociados: sx(['calafrios', 'tosse', 'coriza', 'dor_garganta', 'diarreia', 'vomitos', 'exantema', 'cefaleia', 'mialgia', 'dor_urinaria']),
      sinaisGravidade: ['letargia', 'alteracao_consciencia', 'convulsao', 'desconforto_respiratorio', 'ma_perfusao', 'petequias_purpura', 'rigidez_nuca', 'lactente_jovem_febre', 'sepse'],
      diferenciais: [
        { se: {}, hipoteses: [n('Infecção viral de vias aéreas superiores'), d('pneumonia'), d('infeccao_urinaria'), n('Otite média aguda'), d('doenca_diarreica'), d('dengue'), d('malaria', 'em área endêmica, toda febre sem foco definido deve ter gota espessa ou teste rápido')] },
        { se: { contexto: CTX_MALARIA }, hipoteses: [d('malaria', 'alta prioridade: solicitar gota espessa ou teste rápido no primeiro atendimento'), d('dengue'), d('oropouche')] },
        { se: { sintomas: ['calafrios'] }, hipoteses: [d('malaria'), n('Infecção bacteriana (pielonefrite, pneumonia, bacteremia)'), d('sepse')] },
        { se: { sintomas: ['tosse'] }, hipoteses: [d('pneumonia', 'contar FR por 1 minuto e observar tiragem'), d('bronquiolite')] },
        { se: { sintomas: ['exantema'] }, hipoteses: [d('dengue'), d('chikungunya'), d('zika'), n('Sarampo'), n('Escarlatina')] },
        { se: { sintomas: ['febre_prolongada'] }, hipoteses: [d('leishmaniose_visceral'), d('tuberculose'), n('Febre tifoide'), n('Endocardite'), n('Doença de Kawasaki')] }
      ],
      exames: ['hemograma', 'pcr', 'gota_espessa', 'teste_rapido_malaria', 'ns1_dengue', 'urina_1', 'urocultura', 'radiografia_torax', 'hemocultura'],
      condutaInicial: [
        'Avaliar sinais gerais de perigo (AIDPI): letargia, incapaz de beber, vômito de tudo, convulsão.',
        'Considerar gota espessa ou teste rápido de malária em toda febre em área endêmica, mesmo com foco aparente.',
        'Avaliar foco clínico: orofaringe, otoscopia, FR e ausculta, sinais meníngeos, pele, abdome, articulações.',
        'Antitérmico (dipirona ou paracetamol) conforme peso; evitar AINE se suspeita de dengue.',
        'Orientar sinais de alarme e retorno em 48 h se febre persistir, ou imediato se piora.',
        'Notificar suspeita de dengue, malária e outras doenças de notificação compulsória.'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },
    {
      id: 'febre_sem_foco', nome: 'Febre sem foco', grupo: 'febre', icone: '🔍',
      perguntas: [
        'Idade (menor de 3 meses? menor de 36 meses?)',
        'Duração da febre e temperatura máxima?',
        'Estado geral entre os picos (brinca, sorri, mama)?',
        'Diurese e aceitação alimentar?',
        'Vacinas pneumocócica, Hib e meningocócica em dia?',
        'Uso de antibiótico recente?',
        'Mora ou esteve em área de malária?'
      ],
      sintomasAssociados: sx(['febre', 'irritabilidade', 'recusa_alimentar', 'apatia', 'calafrios', 'sudorese', 'dor_urinaria', 'palidez', 'febre_prolongada']),
      sinaisGravidade: ['lactente_jovem_febre', 'letargia', 'ma_perfusao', 'sepse', 'petequias_purpura', 'alteracao_consciencia', 'convulsao'],
      diferenciais: [
        { se: {}, hipoteses: [n('Virose autolimitada'), d('infeccao_urinaria', 'principal infecção bacteriana oculta em lactentes'), d('malaria'), n('Bacteremia oculta (pneumococo, meningococo)'), n('Exantema súbito (roséola)'), d('pneumonia', 'pneumonia oculta se leucocitose importante')] },
        { se: { contexto: CTX_MALARIA }, hipoteses: [d('malaria', 'alta prioridade: gota espessa ou teste rápido')] },
        { se: { sintomas: ['febre_prolongada'] }, hipoteses: [d('leishmaniose_visceral', 'febre prolongada + esplenomegalia + palidez: solicitar rK39'), d('tuberculose'), n('Febre tifoide'), n('Doença de Kawasaki'), n('Artrite idiopática juvenil sistêmica')] },
        { se: { sintomas: ['irritabilidade', 'recusa_alimentar'] }, hipoteses: [d('meningite'), d('sepse')] },
        { se: { sintomas: ['palidez'] }, hipoteses: [d('malaria'), d('leishmaniose_visceral'), n('Leucemia')] },
        { se: { contexto: ['antibiotico_recente'] }, hipoteses: [d('meningite', 'meningite parcialmente tratada pode ter apresentação atenuada')] }
      ],
      exames: ['hemograma', 'pcr', 'urina_1', 'urocultura', 'hemocultura', 'gota_espessa', 'teste_rapido_malaria', 'radiografia_torax', 'liquor', 'rk39'],
      condutaInicial: [
        'Menor de 3 meses: avaliar como risco de infecção bacteriana grave (ver sinal lactente_jovem_febre).',
        'Entre 3 e 36 meses com bom estado geral: considerar urina 1 e urocultura; hemograma e PCR conforme protocolo.',
        'Considerar gota espessa ou teste rápido de malária em área endêmica antes de outros exames.',
        'Reavaliar em 24–48 h se sem foco e exames normais; orientar sinais de alarme.',
        'Se toxemia, petéquias ou alteração de consciência: hemocultura, punção lombar e antibiótico empírico.'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },
    {
      id: 'febre_exantema', nome: 'Febre + exantema', grupo: 'febre', icone: '🔴',
      perguntas: [
        'Em que dia da febre surgiu o exantema?',
        'Tipo de lesão (maculopapular, vesicular, petequial, urticariforme)?',
        'Distribuição e progressão (crânio-caudal, palmas e plantas)?',
        'Prurido? Descamação?',
        'Tosse, coriza e conjuntivite (tríade do sarampo)?',
        'Artralgia ou edema articular?',
        'Medicamento novo nos últimos 15 dias?',
        'Tríplice viral em dia? Contato com caso semelhante?'
      ],
      sintomasAssociados: sx(['exantema', 'prurido', 'conjuntivite', 'coriza', 'tosse', 'artralgia', 'cefaleia', 'dor_retroorbitaria', 'linfonodomegalia', 'petequias']),
      sinaisGravidade: ['petequias_purpura', 'sangramento_importante', 'choque', 'alteracao_consciencia', 'desconforto_respiratorio', 'dor_abdominal_intensa', 'vomitos_persistentes'],
      diferenciais: [
        { se: {}, hipoteses: [d('dengue'), d('chikungunya'), d('zika'), n('Sarampo'), n('Rubéola'), n('Exantema súbito'), n('Eritema infeccioso'), n('Síndrome mão-pé-boca'), n('Escarlatina'), n('Reação medicamentosa')] },
        { se: { contexto: ['mosquito', 'rural', 'ribeirinha', 'viagem', 'indigena'] }, hipoteses: [d('dengue', 'realizar prova do laço e pesquisar sinais de alarme'), d('chikungunya'), d('zika'), d('oropouche'), d('mayaro')] },
        { se: { sintomas: ['conjuntivite', 'tosse', 'coriza'] }, hipoteses: [n('Sarampo', 'notificação imediata; isolar; verificar manchas de Koplik e vacinação')] },
        { se: { contexto: ['nao_vacinado', 'contato_infeccioso'] }, hipoteses: [n('Sarampo'), n('Rubéola'), n('Varicela')] },
        { se: { sintomas: ['artralgia'] }, hipoteses: [d('chikungunya', 'artralgia intensa e edema articular'), d('mayaro'), n('Rubéola')] },
        { se: { sintomas: ['petequias'] }, hipoteses: [d('dengue', 'petéquias e sangramento: avaliar plaquetas e hematócrito'), d('meningite', 'meningococemia se toxemia'), d('sepse')] }
      ],
      exames: ['hemograma', 'ns1_dengue', 'sorologia_dengue', 'pcr', 'ast', 'alt', 'gota_espessa'],
      condutaInicial: [
        'Avaliar sinais de alarme de dengue (dor abdominal, vômitos persistentes, sangramento, letargia, hipotensão postural) e classificar em grupo A–D.',
        'Considerar hidratação oral abundante; evitar AINE e AAS na suspeita de arbovirose.',
        'Suspeita de sarampo ou rubéola: notificar em até 24 h, isolar e coletar sorologia conforme vigilância.',
        'Avaliar necessidade de suspender medicamento suspeito de reação cutânea.',
        'Orientar retorno diário na fase crítica da dengue (defervescência, dias 3 a 7).'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },
    {
      id: 'febre_cefaleia', nome: 'Febre + cefaleia', grupo: 'febre', icone: '🤕',
      perguntas: [
        'Cefaleia intensa, holocraniana, que acorda a criança?',
        'Dor retro-orbitária e mialgia?',
        'Vômitos (em jato)? Fotofobia?',
        'Alteração de comportamento, sonolência ou convulsão?',
        'Contato com caso de meningite? Vacinas meningocócica, pneumocócica e Hib em dia?',
        'Exantema ou petéquias?',
        'Área de malária ou dengue?'
      ],
      sintomasAssociados: sx(['cefaleia', 'dor_retroorbitaria', 'vomitos', 'rigidez_nuca', 'mialgia', 'exantema', 'irritabilidade', 'alteracao_consciencia', 'convulsao', 'petequias']),
      sinaisGravidade: ['rigidez_nuca', 'alteracao_consciencia', 'convulsao', 'petequias_purpura', 'sepse', 'choque'],
      diferenciais: [
        { se: {}, hipoteses: [d('dengue'), n('Síndrome gripal / virose'), d('meningite'), d('malaria'), n('Sinusite aguda'), d('oropouche')] },
        { se: { sintomas: ['rigidez_nuca'] }, hipoteses: [d('meningite', 'punção lombar e antibiótico sem atraso'), n('Encefalite viral')] },
        { se: { sintomas: ['vomitos'] }, hipoteses: [d('meningite'), d('dengue', 'vômitos persistentes são sinal de alarme'), n('Hipertensão intracraniana')] },
        { se: { contexto: CTX_MALARIA }, hipoteses: [d('malaria', 'cefaleia é sintoma frequente da malária; gota espessa'), d('dengue'), d('oropouche'), d('mayaro')] },
        { se: { sintomas: ['alteracao_consciencia'] }, hipoteses: [d('meningite'), d('malaria', 'malária cerebral: emergência'), n('Encefalite viral (herpes, arbovírus)')] },
        { se: { sintomas: ['petequias'] }, hipoteses: [d('meningite', 'meningococemia: emergência'), d('dengue')] }
      ],
      exames: ['hemograma', 'pcr', 'ns1_dengue', 'sorologia_dengue', 'gota_espessa', 'teste_rapido_malaria', 'liquor', 'hemocultura', 'glicemia'],
      condutaInicial: [
        'Pesquisar sinais meníngeos, fontanela, nível de consciência e petéquias em toda criança com febre e cefaleia.',
        'Se suspeita de meningite: hemocultura, punção lombar (se sem contraindicação) e antibiótico empírico na primeira hora.',
        'Considerar gota espessa ou teste rápido de malária e NS1/sorologia de dengue conforme dia de doença.',
        'Analgesia com dipirona ou paracetamol; evitar AINE na suspeita de dengue.',
        'Orientar retorno imediato se vômitos, sonolência, convulsão ou manchas na pele.'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },
    {
      id: 'febre_mialgia', nome: 'Febre + mialgia', grupo: 'febre', icone: '💪',
      perguntas: [
        'Dor muscular generalizada ou localizada (panturrilhas sugere leptospirose)?',
        'Artralgia ou edema articular?',
        'Dor retro-orbitária, cefaleia, exantema?',
        'Olhos vermelhos (sufusão conjuntival)? Icterícia? Urina escura?',
        'Contato com água de enchente, rio ou lama nos últimos 30 dias?',
        'Entrou na mata ou esteve em área de garimpo?',
        'Vacina de febre amarela em dia?'
      ],
      sintomasAssociados: sx(['mialgia', 'artralgia', 'cefaleia', 'dor_retroorbitaria', 'exantema', 'ictericia', 'conjuntivite', 'calafrios', 'dor_abdominal', 'sudorese']),
      sinaisGravidade: ['choque', 'sangramento_importante', 'oliguria', 'ictericia_intensa', 'dor_abdominal_intensa', 'alteracao_consciencia', 'edema_pulmonar'],
      diferenciais: [
        { se: {}, hipoteses: [d('dengue'), d('chikungunya'), n('Síndrome gripal (influenza)'), d('malaria'), d('leptospirose'), d('oropouche'), d('mayaro')] },
        { se: { contexto: CTX_LEPTO }, hipoteses: [d('leptospirose', 'mialgia em panturrilhas, sufusão conjuntival, icterícia; iniciar antibiótico precocemente'), n('Síndrome cardiopulmonar por hantavírus')] },
        { se: { contexto: CTX_MALARIA }, hipoteses: [d('malaria', 'gota espessa'), d('dengue'), d('oropouche'), d('mayaro'), d('febre_amarela')] },
        { se: { sintomas: ['ictericia'] }, hipoteses: [d('leptospirose', 'síndrome de Weil'), d('malaria', 'icterícia é critério de gravidade'), d('febre_amarela', 'verificar vacinação; notificar')] },
        { se: { sintomas: ['artralgia'] }, hipoteses: [d('chikungunya'), d('mayaro'), d('zika')] },
        { se: { contexto: ['mata', 'garimpo', 'nao_vacinado'] }, hipoteses: [d('febre_amarela', 'não vacinado com exposição silvestre: notificação imediata'), d('mayaro'), d('malaria')] }
      ],
      exames: ['hemograma', 'pcr', 'ns1_dengue', 'sorologia_dengue', 'gota_espessa', 'teste_rapido_malaria', 'cpk', 'ureia', 'creatinina', 'bilirrubinas', 'ast', 'alt'],
      condutaInicial: [
        'Avaliar sinais de alarme de dengue e sinais de gravidade de leptospirose (icterícia, oligúria, dispneia, sangramento).',
        'Considerar antibiótico empírico para leptospirose (amoxicilina ou doxiciclina > 8 anos; penicilina cristalina ou ceftriaxona se grave) quando exposição compatível.',
        'Solicitar gota espessa ou teste rápido de malária em área endêmica.',
        'Hidratação oral ou venosa conforme classificação; evitar AINE.',
        'Notificar dengue, leptospirose, febre amarela e chikungunya conforme vigilância.'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },
    {
      id: 'febre_calafrios', nome: 'Febre + calafrios', grupo: 'febre', icone: '🥶',
      perguntas: [
        'Há quantos dias? Padrão em paroxismos (calafrio, febre alta, sudorese) a cada 48 ou 72 h?',
        'Mora ou esteve em área rural, ribeirinha, indígena ou de garimpo?',
        'Malária prévia? Quando? Tratamento completo?',
        'Dor ao urinar, dor lombar, tosse, dor abdominal?',
        'Palidez, urina escura, icterícia?',
        'Uso de antibiótico ou antimalárico recente?'
      ],
      sintomasAssociados: sx(['calafrios', 'sudorese', 'cefaleia', 'mialgia', 'palidez', 'ictericia', 'esplenomegalia', 'dor_urinaria', 'tosse', 'vomitos']),
      sinaisGravidade: ['choque', 'alteracao_consciencia', 'convulsao', 'ictericia_intensa', 'hipoglicemia', 'oliguria', 'desconforto_respiratorio', 'sepse', 'sangramento_importante'],
      diferenciais: [
        { se: {}, hipoteses: [d('malaria'), d('dengue'), d('leptospirose'), n('Infecção bacteriana (pielonefrite, pneumonia, bacteremia)'), n('Arboviroses (oropouche, mayaro)'), d('sepse')] },
        { se: { sintomas: ['calafrios'], contexto: CTX_MALARIA }, hipoteses: [d('malaria', 'alta prioridade: gota espessa ou teste rápido; repetir se negativo e persistir a suspeita')] },
        { se: { sintomas: ['palidez'] }, hipoteses: [d('malaria', 'anemia grave é critério de gravidade'), d('leishmaniose_visceral')] },
        { se: { sintomas: ['esplenomegalia'] }, hipoteses: [d('malaria'), d('leishmaniose_visceral', 'febre prolongada + esplenomegalia: rK39')] },
        { se: { sintomas: ['dor_urinaria'] }, hipoteses: [d('infeccao_urinaria', 'pielonefrite: urocultura antes do antibiótico')] },
        { se: { contexto: CTX_LEPTO }, hipoteses: [d('leptospirose')] }
      ],
      exames: ['gota_espessa', 'teste_rapido_malaria', 'hemograma', 'pcr', 'urina_1', 'urocultura', 'hemocultura', 'glicemia', 'bilirrubinas', 'creatinina', 'ns1_dengue'],
      condutaInicial: [
        'Solicitar gota espessa ou teste rápido no primeiro atendimento; resultado em até 1 h quando disponível.',
        'Se malária confirmada: identificar espécie, avaliar sinais de gravidade e iniciar tratamento conforme Guia do MS (peso e idade).',
        'Glicemia capilar em toda criança com suspeita de malária grave, alteração de consciência ou convulsão.',
        'Se gota espessa negativa, investigar ITU, pneumonia, dengue, leptospirose e bacteremia.',
        'Notificar malária (SIVEP) e orientar retorno para lâmina de controle.'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },
    {
      id: 'febre_ictericia', nome: 'Febre + icterícia', grupo: 'febre', icone: '🟡',
      perguntas: [
        'Início da icterícia em relação à febre? Colúria e acolia?',
        'Palidez, urina cor de coca-cola (hemólise)?',
        'Sangramento (gengiva, nariz, pele, vômito)?',
        'Contato com água de enchente, rio ou ratos?',
        'Consumo de água não tratada ou contato com hepatite?',
        'Vacinas de hepatite A/B e febre amarela em dia?',
        'Área de malária? Malária prévia?'
      ],
      sintomasAssociados: sx(['ictericia', 'calafrios', 'vomitos', 'dor_abdominal', 'hepatomegalia', 'esplenomegalia', 'palidez', 'sangramento', 'mialgia', 'reducao_diurese']),
      sinaisGravidade: ['ictericia_intensa', 'alteracao_consciencia', 'sangramento_importante', 'oliguria', 'choque', 'hipoglicemia'],
      diferenciais: [
        { se: {}, hipoteses: [d('malaria'), n('Hepatite viral (A, B, E)'), d('leptospirose'), n('Hemólise (anemia falciforme, deficiência de G6PD)'), d('sepse'), d('febre_amarela')] },
        { se: { contexto: CTX_MALARIA }, hipoteses: [d('malaria', 'icterícia = malária grave: internar e tratar conforme protocolo de gravidade'), d('febre_amarela', 'se não vacinado')] },
        { se: { contexto: CTX_LEPTO }, hipoteses: [d('leptospirose', 'síndrome de Weil: icterícia rubínica, LRA, hemorragia pulmonar')] },
        { se: { contexto: ['agua_nao_tratada', 'contato_infeccioso'] }, hipoteses: [n('Hepatite A', 'notificar; orientar higiene e vacinação de contatos')] },
        { se: { sintomas: ['sangramento'] }, hipoteses: [d('febre_amarela'), d('leptospirose'), d('malaria'), d('dengue'), n('Insuficiência hepática aguda')] },
        { se: { sintomas: ['palidez', 'esplenomegalia'] }, hipoteses: [d('malaria'), n('Crise hemolítica (falciforme, G6PD, esferocitose)')] }
      ],
      exames: ['gota_espessa', 'teste_rapido_malaria', 'hemograma', 'bilirrubinas', 'ast', 'alt', 'coagulograma', 'ureia', 'creatinina', 'glicemia', 'hemocultura', 'urina_1'],
      condutaInicial: [
        'Tratar como potencialmente grave: acesso venoso, glicemia capilar, avaliação de consciência e diurese.',
        'Gota espessa ou teste rápido imediato; se positivo com icterícia, conduzir como malária grave (artesunato IV conforme protocolo).',
        'Considerar antibiótico para leptospirose se exposição compatível; suporte renal se oligúria.',
        'Evitar paracetamol em dose alta e AINE; avaliar coagulograma antes de procedimentos.',
        'Notificar febre amarela, hepatite viral, leptospirose e malária; isolar contato se hepatite A.'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },

    // ---------------------------------------------------------- RESPIRATÓRIO
    {
      id: 'tosse', nome: 'Tosse', grupo: 'respiratorio', icone: '🤧',
      perguntas: [
        'Duração (aguda < 2 semanas ou prolongada > 3 semanas)?',
        'Seca ou produtiva? Piora à noite?',
        'Tosse em acessos com guincho ou vômito pós-tosse (coqueluche)?',
        'Febre, dificuldade para respirar, chiado?',
        'Contato com pessoa com tuberculose ou tosse crônica?',
        'Exposição a fumaça (fogão a lenha, queimadas, tabaco)?',
        'Vacinas pentavalente/DTP em dia?',
        'Perda de peso ou sudorese noturna?'
      ],
      sintomasAssociados: sx(['febre', 'coriza', 'dispneia', 'sibilancia', 'taquipneia', 'tiragem', 'tosse_prolongada', 'perda_peso', 'sudorese', 'vomitos']),
      sinaisGravidade: ['desconforto_respiratorio', 'hipoxemia', 'cianose', 'apneia', 'estridor', 'letargia'],
      diferenciais: [
        { se: {}, hipoteses: [n('Resfriado comum / IVAS'), d('pneumonia'), d('bronquiolite'), d('asma'), n('Laringotraqueíte viral'), n('Coqueluche')] },
        { se: { sintomas: ['taquipneia'] }, hipoteses: [d('pneumonia', 'taquipneia é o melhor sinal isolado de pneumonia (AIDPI)'), d('bronquiolite')] },
        { se: { sintomas: ['sibilancia'] }, hipoteses: [d('asma'), d('bronquiolite', 'em < 2 anos com pródromo de coriza')] },
        { se: { contexto: ['contato_tb'] }, hipoteses: [d('tuberculose', 'avaliar sistema de pontuação do MS; prova tuberculínica e radiografia')] },
        { se: { sintomas: ['tosse_prolongada'] }, hipoteses: [d('tuberculose'), d('asma'), n('Coqueluche'), n('Rinossinusite / gotejamento pós-nasal'), n('Corpo estranho')] },
        { se: { contexto: ['nao_vacinado'] }, hipoteses: [n('Coqueluche', 'notificar; macrolídeo para o caso e contatos'), n('Difteria'), n('Sarampo')] }
      ],
      exames: ['radiografia_torax', 'hemograma', 'pcr', 'teste_rapido_molecular_tb', 'baciloscopia'],
      condutaInicial: [
        'Contar FR por 1 minuto com a criança calma e observar tiragem subcostal; medir SpO2.',
        'Classificar conforme AIDPI: pneumonia grave, pneumonia ou tosse/resfriado.',
        'Considerar amoxicilina para pneumonia sem gravidade; encaminhar se sinais de gravidade.',
        'Tosse > 3 semanas: considerar investigação de tuberculose (contato, radiografia, prova tuberculínica, escarro/lavado gástrico).',
        'Evitar antitussígenos em < 6 anos; orientar hidratação e limpeza nasal.',
        'Retorno em 48 h ou imediato se dificuldade para respirar, incapaz de beber ou piora.'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },
    {
      id: 'dispneia', nome: 'Dificuldade para respirar', grupo: 'respiratorio', icone: '😮‍💨',
      perguntas: [
        'Início (súbito ou progressivo)? Engasgo prévio (corpo estranho)?',
        'Febre, tosse, chiado, ruído inspiratório (estridor)?',
        'Episódios prévios semelhantes? Asma na família?',
        'Consegue falar, mamar ou beber?',
        'Picada ou mordedura recente? Medicamento novo?',
        'Cardiopatia conhecida? Suor ou cansaço ao mamar?',
        'Urina reduzida, edema, palidez?'
      ],
      sintomasAssociados: sx(['tosse', 'febre', 'sibilancia', 'taquipneia', 'tiragem', 'estridor', 'gemencia', 'dor_toracica', 'palidez', 'edema']),
      sinaisGravidade: ['desconforto_respiratorio', 'hipoxemia', 'cianose', 'apneia', 'estridor', 'edema_pulmonar', 'alteracao_consciencia', 'choque', 'anafilaxia'],
      diferenciais: [
        { se: {}, hipoteses: [d('pneumonia'), d('asma'), d('bronquiolite'), n('Laringotraqueíte / corpo estranho de via aérea'), n('Insuficiência cardíaca / cardiopatia congênita'), n('Acidose metabólica (cetoacidose, sepse, desidratação)')] },
        { se: { sintomas: ['estridor'] }, hipoteses: [n('Laringotraqueíte viral'), n('Epiglotite / traqueíte bacteriana'), n('Corpo estranho de via aérea'), n('Abscesso retrofaríngeo')] },
        { se: { sintomas: ['febre', 'taquipneia'] }, hipoteses: [d('pneumonia'), d('sepse'), d('malaria', 'acidose e edema pulmonar na malária grave')] },
        { se: { sintomas: ['edema', 'palidez'] }, hipoteses: [n('Insuficiência cardíaca'), n('Glomerulonefrite aguda com congestão'), d('anemia_ferropriva', 'anemia grave descompensada')] },
        { se: { contexto: ['mordedura', 'animais'] }, hipoteses: [d('acidente_ofidico', 'elapídico: ptose, paralisia respiratória'), d('escorpionismo', 'edema pulmonar no escorpionismo grave'), n('Anafilaxia a picada de himenópteros')] },
        { se: { contexto: CTX_LEPTO }, hipoteses: [d('leptospirose', 'hemorragia pulmonar'), n('Síndrome cardiopulmonar por hantavírus')] }
      ],
      exames: ['radiografia_torax', 'gasometria', 'hemograma', 'pcr', 'glicemia', 'eletrolitos', 'hemocultura'],
      condutaInicial: [
        'Avaliar via aérea, FR, tiragem, SpO2 e nível de consciência; O2 se SpO2 < 94%.',
        'Sibilância: salbutamol inalatório em ciclos e reavaliar; corticoide oral se asma moderada/grave.',
        'Estridor em repouso: dexametasona e adrenalina inalatória; não examinar orofaringe se suspeita de epiglotite.',
        'Considerar radiografia de tórax e gasometria se hipoxemia ou dúvida diagnóstica.',
        'Encaminhar para unidade com O2 e suporte ventilatório se sinais de gravidade.'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },
    {
      id: 'sibilancia', nome: 'Chiado no peito (sibilância)', grupo: 'respiratorio', icone: '🌬️',
      perguntas: [
        'Idade? Primeiro episódio ou recorrente (>= 3 episódios)?',
        'Pródromo de coriza e febre baixa (bronquiolite)?',
        'Desencadeantes: infecção viral, poeira, fumaça, exercício, frio?',
        'Resposta a broncodilatador em episódios anteriores?',
        'Atopia pessoal ou familiar (asma, rinite, eczema)?',
        'Engasgo súbito com alimento ou objeto?',
        'Internações ou uso de corticoide prévios?'
      ],
      sintomasAssociados: sx(['tosse', 'coriza', 'febre', 'dispneia', 'taquipneia', 'tiragem', 'sibilos', 'prurido', 'exantema', 'dor_toracica']),
      sinaisGravidade: ['desconforto_respiratorio', 'hipoxemia', 'cianose', 'apneia', 'alteracao_consciencia', 'anafilaxia'],
      diferenciais: [
        { se: {}, hipoteses: [d('asma'), d('bronquiolite'), n('Sibilância induzida por vírus (lactente sibilante)'), d('pneumonia'), n('Corpo estranho de via aérea'), n('Refluxo / aspiração')] },
        { se: { sintomas: ['coriza', 'febre'] }, hipoteses: [d('bronquiolite', 'em < 2 anos, primeiro episódio: broncodilatador não é rotina'), d('pneumonia')] },
        { se: { sintomas: ['exantema', 'prurido'] }, hipoteses: [n('Anafilaxia (urticária + broncoespasmo): adrenalina IM')] },
        { se: { contexto: ['rural', 'agua_nao_tratada', 'ribeirinha'] }, hipoteses: [d('parasitoses_intestinais', 'síndrome de Löffler por migração larvária (áscaris, ancilóstomo, estrongiloides)'), n('Larva migrans visceral (toxocaríase)')] },
        { se: { contexto: ['contato_tb'] }, hipoteses: [d('tuberculose', 'compressão brônquica por adenomegalia')] }
      ],
      exames: ['radiografia_torax', 'hemograma', 'gasometria', 'exame_parasitologico_fezes'],
      condutaInicial: [
        'Medir SpO2, FR, tiragem e capacidade de falar/mamar; classificar a crise (leve, moderada, grave).',
        'Salbutamol inalatório (spray com espaçador ou nebulização) em até 3 ciclos na primeira hora e reavaliar.',
        'Considerar corticoide oral (prednisolona) em crise moderada/grave ou sem resposta ao broncodilatador.',
        'Bronquiolite: suporte (aspiração nasal, hidratação, O2 se SpO2 < 92%); evitar corticoide e antibiótico de rotina.',
        'Orientar plano de ação, controle ambiental (fumaça de fogão a lenha) e retorno se piora.'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },
    {
      id: 'coriza', nome: 'Coriza / obstrução nasal', grupo: 'respiratorio', icone: '👃',
      perguntas: [
        'Duração? Secreção clara ou purulenta? Mais de 10 dias sem melhora?',
        'Febre? Tosse? Dor de garganta ou de ouvido?',
        'Espirros, prurido nasal e ocular (rinite alérgica)?',
        'Conjuntivite e tosse com febre alta (sarampo)?',
        'Dificuldade para mamar por obstrução nasal (lactente)?',
        'Contato com pessoas resfriadas? Vacinação em dia?'
      ],
      sintomasAssociados: sx(['febre', 'tosse', 'dor_garganta', 'conjuntivite', 'exantema', 'cefaleia', 'sibilancia', 'prurido', 'recusa_alimentar', 'irritabilidade']),
      sinaisGravidade: ['desconforto_respiratorio', 'hipoxemia', 'lactente_jovem_febre', 'apneia'],
      diferenciais: [
        { se: {}, hipoteses: [n('Resfriado comum'), n('Rinite alérgica'), n('Síndrome gripal (influenza)'), n('Rinossinusite aguda'), n('Otite média aguda associada')] },
        { se: { sintomas: ['conjuntivite', 'tosse', 'febre'] }, hipoteses: [n('Sarampo', 'pródromo catarral: notificar e isolar se exantema surgir')] },
        { se: { contexto: ['nao_vacinado', 'contato_infeccioso'] }, hipoteses: [n('Sarampo'), n('Coqueluche (fase catarral)')] },
        { se: { sintomas: ['sibilancia'] }, hipoteses: [d('bronquiolite'), d('asma')] },
        { se: { sintomas: ['prurido'] }, hipoteses: [n('Rinite alérgica')] },
        { se: { sintomas: ['dor_garganta'] }, hipoteses: [n('Faringite viral')] }
      ],
      exames: [],
      condutaInicial: [
        'Orientar lavagem nasal com soro fisiológico, hidratação e antitérmico se necessário.',
        'Evitar descongestionantes e antitussígenos em crianças pequenas.',
        'Avaliar otoscopia e orofaringe; considerar otite ou sinusite se febre persistente ou secreção purulenta > 10 dias.',
        'Considerar rinite alérgica se sintomas persistentes com prurido e espirros: controle ambiental e anti-histamínico.',
        'Retorno se febre > 3 dias, dificuldade respiratória ou recusa alimentar.'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },
    {
      id: 'dor_garganta', nome: 'Dor de garganta', grupo: 'respiratorio', icone: '😷',
      perguntas: [
        'Idade (estreptococo é raro < 3 anos)?',
        'Febre alta, exsudato amigdaliano, petéquias no palato, gânglios cervicais dolorosos?',
        'Tosse e coriza (favorecem etiologia viral)?',
        'Exantema em lixa, língua em framboesa (escarlatina)?',
        'Vesículas ou úlceras na boca (herpangina, mão-pé-boca)?',
        'Dificuldade para engolir saliva, voz abafada, trismo (abscesso)?',
        'Vacinação (difteria) em dia?'
      ],
      sintomasAssociados: sx(['febre', 'tosse', 'coriza', 'exantema', 'linfonodomegalia', 'dor_abdominal', 'vomitos', 'cefaleia', 'lesoes_pele', 'dispneia']),
      sinaisGravidade: ['estridor', 'desconforto_respiratorio', 'desidratacao_grave', 'sepse'],
      diferenciais: [
        { se: {}, hipoteses: [n('Faringoamigdalite viral'), n('Faringoamigdalite estreptocócica'), n('Mononucleose infecciosa'), n('Herpangina / síndrome mão-pé-boca')] },
        { se: { sintomas: ['exantema'] }, hipoteses: [n('Escarlatina', 'penicilina/amoxicilina; descamação tardia'), n('Mononucleose (exantema após amoxicilina)')] },
        { se: { sintomas: ['linfonodomegalia', 'febre'] }, hipoteses: [n('Mononucleose infecciosa'), n('Faringoamigdalite estreptocócica')] },
        { se: { contexto: ['nao_vacinado'] }, hipoteses: [n('Difteria', 'placas acinzentadas aderidas, pescoço taurino: notificar, soro antidiftérico')] },
        { se: { sintomas: ['dispneia'] }, hipoteses: [n('Abscesso periamigdaliano / retrofaríngeo'), n('Epiglotite')] },
        { se: { sintomas: ['tosse', 'coriza'] }, hipoteses: [n('Faringite viral')] }
      ],
      exames: ['hemograma', 'pcr'],
      condutaInicial: [
        'Avaliar critérios clínicos (Centor modificado) e, se disponível, teste rápido para estreptococo.',
        'Considerar penicilina benzatina ou amoxicilina por 10 dias se estreptocócica; evitar antibiótico em quadro viral.',
        'Analgesia e antitérmico; hidratação; alimentos frios e pastosos.',
        'Encaminhar se dificuldade respiratória, sialorreia, trismo ou toxemia.',
        'Orientar retorno se febre > 72 h ou piora da dor.'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },

    // ------------------------------------------------------ GASTROINTESTINAL
    {
      id: 'diarreia', nome: 'Diarreia', grupo: 'gastrointestinal', icone: '💩',
      perguntas: [
        'Início e número de evacuações por dia? Há mais de 14 dias?',
        'Sangue ou muco nas fezes?',
        'Vômitos? Aceita líquidos? Diurese nas últimas 6 h?',
        'Fonte de água e saneamento? Alimentos suspeitos (açaí, leite, frutos do mar)?',
        'Peso anterior e alimentação atual (aleitamento)?',
        'Uso de antibiótico recente?',
        'Outros casos na família ou comunidade?'
      ],
      sintomasAssociados: sx(['diarreia_sangue', 'vomitos', 'febre', 'dor_abdominal', 'desidratacao', 'distensao_abdominal', 'perda_peso', 'reducao_diurese', 'palidez', 'prurido']),
      sinaisGravidade: ['desidratacao_grave', 'choque', 'letargia', 'oliguria', 'anuria', 'alteracao_consciencia', 'hipoglicemia', 'dor_abdominal_intensa'],
      diferenciais: [
        { se: {}, hipoteses: [d('doenca_diarreica', 'viral (rotavírus, norovírus) é a causa mais comum'), d('parasitoses_intestinais'), n('Intolerância à lactose pós-infecciosa'), n('Diarreia associada a infecção extraintestinal (otite, ITU)')] },
        { se: { sintomas: ['diarreia_sangue'] }, hipoteses: [n('Shigelose / disenteria bacteriana', 'antibiótico conforme protocolo (ciprofloxacino ou azitromicina)'), n('Amebíase'), n('Campylobacter / Salmonella'), n('Síndrome hemolítico-urêmica (E. coli produtora de shigatoxina)')] },
        { se: { contexto: ['agua_nao_tratada', 'agua_rio', 'enchente', 'ribeirinha'] }, hipoteses: [d('parasitoses_intestinais', 'giardíase, amebíase, estrongiloidíase'), n('Cólera (surto, fezes em água de arroz): notificar'), n('Febre tifoide'), n('Hepatite A')] },
        { se: { contexto: ['antibiotico_recente'] }, hipoteses: [n('Diarreia associada a antibiótico / Clostridioides difficile')] },
        { se: { sintomas: ['perda_peso'] }, hipoteses: [d('desnutricao', 'diarreia persistente com desnutrição: internar se < 6 meses ou grave'), d('parasitoses_intestinais'), n('Doença celíaca / má absorção'), n('HIV')] },
        { se: { sintomas: ['febre'], contexto: CTX_MALARIA }, hipoteses: [d('malaria', 'diarreia e vômitos podem ser a forma de apresentação em crianças pequenas')] }
      ],
      exames: ['eletrolitos', 'hemograma', 'exame_parasitologico_fezes', 'ureia', 'creatinina', 'glicemia', 'gota_espessa'],
      condutaInicial: [
        'Classificar hidratação (AIDPI): sem desidratação (plano A), desidratação (plano B), desidratação grave (plano C).',
        'SRO após cada evacuação; manter aleitamento e alimentação; zinco por 10–14 dias (10 mg < 6 meses; 20 mg >= 6 meses).',
        'Considerar antibiótico apenas em disenteria, cólera ou suspeita de sepse; evitar antidiarreicos.',
        'Diarreia com sangue: pesquisar SHU (palidez, oligúria, petéquias).',
        'Diarreia > 14 dias: avaliar estado nutricional, parasitológico de fezes e intolerância à lactose.',
        'Orientar sinais de alarme: sede intensa, olhos fundos, sonolência, sangue nas fezes, vômito de tudo.'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },
    {
      id: 'vomitos', nome: 'Vômitos', grupo: 'gastrointestinal', icone: '🤮',
      perguntas: [
        'Início, frequência e aspecto (alimentar, bilioso, sangue, em jato)?',
        'Diarreia associada? Febre?',
        'Dor abdominal e localização? Distensão?',
        'Cefaleia, sonolência, rigidez de nuca?',
        'Aceita líquidos? Diurese?',
        'Trauma craniano, ingestão de medicamento ou tóxico?',
        'Idade < 3 meses com vômitos em jato após mamadas (estenose de piloro)?',
        'Picada de escorpião ou outro animal?'
      ],
      sintomasAssociados: sx(['diarreia', 'febre', 'dor_abdominal', 'cefaleia', 'distensao_abdominal', 'desidratacao', 'ictericia', 'tosse', 'reducao_diurese', 'irritabilidade']),
      sinaisGravidade: ['vomitos_persistentes', 'desidratacao_grave', 'alteracao_consciencia', 'rigidez_nuca', 'dor_abdominal_intensa', 'hipoglicemia', 'choque'],
      diferenciais: [
        { se: {}, hipoteses: [d('doenca_diarreica', 'gastroenterite aguda'), n('Infecção extraintestinal (otite, ITU, pneumonia, faringite)'), n('Estenose hipertrófica do piloro (< 3 meses)'), n('Invaginação / obstrução intestinal'), n('Cetoacidose diabética')] },
        { se: { sintomas: ['cefaleia', 'rigidez_nuca'] }, hipoteses: [d('meningite'), n('Hipertensão intracraniana (tumor, hidrocefalia, TCE)')] },
        { se: { sintomas: ['dor_abdominal'] }, hipoteses: [n('Apendicite'), n('Invaginação intestinal (< 2 anos, fezes em geleia de framboesa)'), d('dengue', 'vômitos persistentes e dor abdominal são sinais de alarme'), d('parasitoses_intestinais', 'obstrução por áscaris')] },
        { se: { contexto: ['mordedura'] }, hipoteses: [d('escorpionismo', 'vômitos após picada = moderado/grave: soro antiescorpiônico'), d('acidente_ofidico', 'laquético e crotálico')] },
        { se: { sintomas: ['ictericia'] }, hipoteses: [n('Hepatite viral'), d('malaria'), d('leptospirose')] },
        { se: { contexto: ['rural', 'garimpo'] }, hipoteses: [n('Intoxicação exógena (agrotóxicos, plantas, medicamentos)')] }
      ],
      exames: ['glicemia', 'eletrolitos', 'gasometria', 'hemograma', 'urina_1', 'ureia', 'creatinina', 'ast', 'alt'],
      condutaInicial: [
        'Avaliar hidratação, glicemia capilar e sinais neurológicos e abdominais.',
        'Considerar ondansetrona em dose única (> 6 meses) para facilitar a TRO; hidratação venosa se falha ou desidratação grave.',
        'Vômitos biliosos, distensão ou sangue: jejum, sonda e avaliação cirúrgica.',
        'Descartar causas extraintestinais (otoscopia, urina 1, ausculta).',
        'Orientar SRO em pequenos volumes frequentes e retorno se vômito de tudo, sonolência ou dor intensa.'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },
    {
      id: 'dor_abdominal', nome: 'Dor abdominal', grupo: 'gastrointestinal', icone: '🫃',
      perguntas: [
        'Início (súbito ou gradual), localização, intensidade e migração (periumbilical para FID)?',
        'Febre, vômitos, diarreia, constipação?',
        'Sangue nas fezes ou urina? Dor ao urinar?',
        'Choro intermitente com pernas fletidas em lactente (invaginação)?',
        'Tosse ou dificuldade respiratória (pneumonia de base)?',
        'Picada de aranha ou escorpião? Trauma?',
        'Exantema, dor articular (púrpura de Henoch-Schönlein)?',
        'Eliminação de vermes?'
      ],
      sintomasAssociados: sx(['febre', 'vomitos', 'diarreia', 'diarreia_sangue', 'distensao_abdominal', 'dor_urinaria', 'ictericia', 'tosse', 'hematuria', 'exantema']),
      sinaisGravidade: ['dor_abdominal_intensa', 'choque', 'vomitos_persistentes', 'desidratacao_grave', 'sangramento_importante'],
      diferenciais: [
        { se: {}, hipoteses: [n('Gastroenterite aguda'), n('Constipação'), n('Cólica do lactente'), n('Apendicite aguda'), d('infeccao_urinaria'), d('parasitoses_intestinais'), n('Dor abdominal funcional')] },
        { se: { sintomas: ['febre', 'vomitos'] }, hipoteses: [n('Apendicite aguda', 'dor migratória, defesa em FID'), n('Adenite mesentérica'), d('pneumonia', 'pneumonia de base pode simular abdome agudo')] },
        { se: { sintomas: ['diarreia_sangue', 'vomitos'] }, hipoteses: [n('Invaginação intestinal (< 2 anos)'), n('Disenteria bacteriana')] },
        { se: { contexto: ['rural', 'agua_nao_tratada', 'ribeirinha', 'indigena'] }, hipoteses: [d('parasitoses_intestinais', 'ascaridíase com suboclusão: massa palpável, vômitos'), n('Febre tifoide')] },
        { se: { contexto: ['mordedura'] }, hipoteses: [d('araneismo', 'latrodectismo: dor abdominal em tábua, sudorese'), d('escorpionismo'), d('acidente_ofidico', 'laquético: dor abdominal, diarreia, bradicardia')] },
        { se: { sintomas: ['exantema'] }, hipoteses: [d('dengue', 'dor abdominal intensa é sinal de alarme'), n('Púrpura de Henoch-Schönlein')] }
      ],
      exames: ['hemograma', 'pcr', 'urina_1', 'exame_parasitologico_fezes', 'radiografia_torax', 'ast', 'alt'],
      condutaInicial: [
        'Examinar abdome com a criança calma: defesa, descompressão, massa, ruídos; toque retal apenas se indicado.',
        'Avaliar sinais de abdome cirúrgico e encaminhar para avaliação cirúrgica se suspeita de apendicite, invaginação ou obstrução.',
        'Analgesia não retarda o diagnóstico; evitar AINE se suspeita de dengue.',
        'Considerar ultrassonografia abdominal quando disponível.',
        'Se parasitose provável, tratar conforme protocolo após avaliação (albendazol não deve ser dado em suboclusão por áscaris).'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },
    {
      id: 'constipacao', nome: 'Constipação', grupo: 'gastrointestinal', icone: '🚽',
      perguntas: [
        'Frequência das evacuações e consistência (escala de Bristol)?',
        'Início neonatal? Eliminação de mecônio após 48 h de vida?',
        'Dor ou sangue ao evacuar, comportamento de retenção, escape fecal?',
        'Dieta (fibras, água, leite de vaca em excesso)?',
        'Distensão abdominal, vômitos, perda de peso?',
        'Crescimento e desenvolvimento adequados?',
        'Medicamentos em uso (ferro, anticolinérgicos)?'
      ],
      sintomasAssociados: sx(['dor_abdominal', 'distensao_abdominal', 'vomitos', 'sangramento', 'perda_peso', 'recusa_alimentar', 'dor_urinaria', 'irritabilidade']),
      sinaisGravidade: ['dor_abdominal_intensa', 'vomitos_persistentes', 'desidratacao_grave'],
      diferenciais: [
        { se: {}, hipoteses: [n('Constipação funcional'), n('Fissura anal'), n('Doença de Hirschsprung'), n('Hipotireoidismo'), n('Alergia à proteína do leite de vaca')] },
        { se: { sintomas: ['distensao_abdominal', 'vomitos'] }, hipoteses: [n('Doença de Hirschsprung / obstrução intestinal'), d('parasitoses_intestinais', 'suboclusão por áscaris')] },
        { se: { sintomas: ['perda_peso'] }, hipoteses: [n('Hipotireoidismo'), n('Doença celíaca'), d('desnutricao')] },
        { se: { sintomas: ['dor_urinaria'] }, hipoteses: [d('infeccao_urinaria', 'ITU de repetição associada a constipação')] },
        { se: { contexto: ['rural', 'agua_nao_tratada'] }, hipoteses: [d('parasitoses_intestinais')] }
      ],
      exames: ['exame_parasitologico_fezes', 'urina_1'],
      condutaInicial: [
        'Diferenciar constipação funcional de sinais de alarme (início neonatal, retardo de mecônio, distensão, vômitos, déficit de crescimento).',
        'Orientar dieta rica em fibras, água e rotina de evacuação após refeições.',
        'Considerar desimpactação e manutenção com polietilenoglicol ou lactulose conforme idade.',
        'Tratar fissura anal e evitar retenção dolorosa.',
        'Encaminhar para investigação se sinais de alarme ou falha após 4–8 semanas.'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },

    // ----------------------------------------------------------- NEUROLÓGICO
    {
      id: 'convulsao', nome: 'Convulsão', grupo: 'neurologico', icone: '⚡',
      perguntas: [
        'Idade? Febre associada?',
        'Duração, tipo (generalizada ou focal) e número de crises nas últimas 24 h?',
        'Primeira crise? Recuperou totalmente após?',
        'Epilepsia ou crise febril na criança ou na família?',
        'Trauma craniano, ingestão de tóxico ou medicamento?',
        'Vômitos, diarreia, jejum prolongado (distúrbio metabólico)?',
        'Vacinação em dia? Área de malária?',
        'Picada de escorpião ou serpente?'
      ],
      sintomasAssociados: sx(['febre', 'cefaleia', 'vomitos', 'rigidez_nuca', 'alteracao_consciencia', 'irritabilidade', 'exantema', 'hipoglicemia', 'diarreia', 'ictericia']),
      sinaisGravidade: ['convulsao', 'alteracao_consciencia', 'rigidez_nuca', 'hipoglicemia', 'hipoxemia', 'choque', 'sepse', 'petequias_purpura', 'desconforto_respiratorio'],
      diferenciais: [
        { se: {}, hipoteses: [n('Crise febril simples (6 meses a 5 anos)'), d('meningite'), n('Epilepsia'), n('Distúrbio metabólico (hipoglicemia, hiponatremia, hipocalcemia)'), n('Intoxicação exógena'), n('TCE')] },
        { se: { sintomas: ['febre'], contexto: CTX_MALARIA }, hipoteses: [d('malaria', 'malária cerebral: gota espessa imediata, glicemia, artesunato IV'), d('meningite')] },
        { se: { sintomas: ['rigidez_nuca'] }, hipoteses: [d('meningite'), n('Encefalite viral')] },
        { se: { sintomas: ['diarreia'] }, hipoteses: [n('Hiponatremia ou hipernatremia'), n('Shigelose (convulsão associada)')] },
        { se: { sintomas: ['hipoglicemia'] }, hipoteses: [d('malaria'), d('desnutricao'), n('Erro inato do metabolismo')] },
        { se: { contexto: ['mordedura'] }, hipoteses: [d('escorpionismo', 'convulsão no escorpionismo grave em crianças pequenas')] }
      ],
      exames: ['glicemia', 'eletrolitos', 'gota_espessa', 'teste_rapido_malaria', 'liquor', 'hemograma', 'pcr', 'hemocultura', 'gasometria'],
      condutaInicial: [
        'Crise em curso: proteger, decúbito lateral, O2, glicemia capilar; benzodiazepínico se > 5 min conforme protocolo.',
        'Após a crise: avaliar febre, sinais meníngeos, fontanela, petéquias, nível de consciência.',
        'Crise febril simples em 6 meses a 5 anos com exame normal: observação e orientação; punção lombar se < 12 meses com suspeita clínica ou sinais meníngeos.',
        'Considerar gota espessa e glicemia em toda convulsão febril em área endêmica.',
        'Internar se crise complexa, estado de mal, alteração persistente da consciência ou suspeita de meningite.'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },
    {
      id: 'alteracao_consciencia', nome: 'Alteração da consciência / sonolência', grupo: 'neurologico', icone: '🧠',
      perguntas: [
        'Início (súbito ou progressivo)? Escala AVPU ou Glasgow?',
        'Febre? Convulsão prévia?',
        'Trauma craniano? Ingestão de medicamento, álcool, agrotóxico ou planta?',
        'Diarreia, vômitos, jejum prolongado?',
        'Icterícia, palidez, sangramento?',
        'Diabetes conhecido (cetoacidose)? Sede e poliúria?',
        'Área de malária? Picada de animal peçonhento?'
      ],
      sintomasAssociados: sx(['febre', 'cefaleia', 'vomitos', 'convulsao', 'rigidez_nuca', 'ictericia', 'palidez', 'hipoglicemia', 'diarreia', 'desidratacao']),
      sinaisGravidade: ['alteracao_consciencia', 'letargia', 'choque', 'hipoglicemia', 'rigidez_nuca', 'convulsao', 'hipoxemia', 'sepse', 'desidratacao_grave'],
      diferenciais: [
        { se: {}, hipoteses: [d('meningite'), n('Encefalite'), d('malaria', 'malária cerebral em área endêmica'), n('Hipoglicemia'), n('Intoxicação exógena'), n('Traumatismo cranioencefálico'), n('Cetoacidose diabética'), d('sepse'), n('Estado pós-ictal')] },
        { se: { sintomas: ['febre'], contexto: CTX_MALARIA }, hipoteses: [d('malaria', 'malária cerebral: artesunato IV, glicemia, punção lombar para excluir meningite'), d('meningite')] },
        { se: { sintomas: ['febre', 'rigidez_nuca'] }, hipoteses: [d('meningite'), n('Encefalite viral')] },
        { se: { sintomas: ['ictericia', 'palidez'] }, hipoteses: [d('malaria', 'grave'), n('Insuficiência hepática aguda'), d('leptospirose')] },
        { se: { sintomas: ['diarreia', 'desidratacao'] }, hipoteses: [n('Desidratação grave / choque hipovolêmico'), n('Hipernatremia ou hiponatremia')] },
        { se: { contexto: ['rural', 'garimpo', 'indigena', 'mordedura'] }, hipoteses: [n('Intoxicação por organofosforado/carbamato'), n('Intoxicação por plantas (mandioca brava, timbó)'), n('Exposição a mercúrio (garimpo)'), d('escorpionismo', 'se picada'), d('acidente_ofidico', 'crotálico/elapídico se picada')] }
      ],
      exames: ['glicemia', 'gota_espessa', 'teste_rapido_malaria', 'eletrolitos', 'gasometria', 'liquor', 'hemograma', 'hemocultura', 'ureia', 'creatinina', 'ast', 'alt'],
      condutaInicial: [
        'ABCDE: via aérea, O2, acesso venoso, glicemia capilar imediata e correção de hipoglicemia.',
        'Se febre: tratar como meningite/sepse até prova contrária (hemocultura, antibiótico empírico) e gota espessa em área endêmica.',
        'Avaliar pupilas, postura, sinais de hipertensão intracraniana; proteger via aérea se Glasgow <= 8.',
        'Pesquisar história de exposição a tóxicos e contatar centro de informação toxicológica.',
        'Transferir para unidade com suporte intensivo.'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },
    {
      id: 'cefaleia', nome: 'Cefaleia', grupo: 'neurologico', icone: '🤯',
      perguntas: [
        'Início, frequência, localização e intensidade? Acorda a criança à noite?',
        'Febre associada? Vômitos (sobretudo matinais ou em jato)?',
        'Alteração visual, de marcha, de comportamento ou convulsão?',
        'Fotofobia, fonofobia, aura (enxaqueca)? História familiar?',
        'Trauma craniano recente?',
        'Sintomas nasais (sinusite)? Dificuldade visual na escola?',
        'Área de dengue ou malária?'
      ],
      sintomasAssociados: sx(['febre', 'vomitos', 'rigidez_nuca', 'dor_retroorbitaria', 'mialgia', 'exantema', 'alteracao_consciencia', 'convulsao', 'coriza', 'fraqueza']),
      sinaisGravidade: ['rigidez_nuca', 'alteracao_consciencia', 'convulsao', 'petequias_purpura', 'choque', 'hipotensao'],
      diferenciais: [
        { se: {}, hipoteses: [n('Cefaleia tensional'), n('Enxaqueca'), n('Cefaleia associada a infecção viral'), n('Rinossinusite'), d('dengue'), n('Erro de refração')] },
        { se: { sintomas: ['febre'], contexto: ['mosquito', 'rural', 'ribeirinha', 'viagem'] }, hipoteses: [d('dengue'), d('oropouche'), d('malaria'), d('chikungunya')] },
        { se: { sintomas: ['febre', 'rigidez_nuca'] }, hipoteses: [d('meningite')] },
        { se: { sintomas: ['vomitos', 'alteracao_consciencia'] }, hipoteses: [n('Hipertensão intracraniana (tumor, hidrocefalia, hemorragia)'), d('meningite')] },
        { se: { sintomas: ['febre'], contexto: CTX_MALARIA }, hipoteses: [d('malaria', 'gota espessa')] },
        { se: { contexto: ['garimpo'] }, hipoteses: [n('Exposição a mercúrio ou monóxido de carbono')] }
      ],
      exames: ['hemograma', 'ns1_dengue', 'gota_espessa', 'liquor'],
      condutaInicial: [
        'Pesquisar sinais de alarme: cefaleia progressiva, matinal, com vômitos, déficit neurológico, papiledema, febre com rigidez de nuca.',
        'Cefaleia com febre em área endêmica: considerar dengue (prova do laço) e malária (gota espessa).',
        'Analgesia simples (dipirona ou paracetamol); evitar uso excessivo de analgésicos.',
        'Sem sinais de alarme e exame neurológico normal: orientar diário de cefaleia, sono, hidratação e tela.',
        'Encaminhar para neuroimagem se sinais de alarme ou exame neurológico alterado.'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },

    // ----------------------------------------------------------------- GERAL
    {
      id: 'palidez', nome: 'Palidez', grupo: 'geral', icone: '😶',
      perguntas: [
        'Início súbito ou progressivo? Cansaço, taquicardia, dispneia aos esforços?',
        'Alimentação: ferro, carne, leite de vaca em excesso, aleitamento?',
        'Sangramento visível (fezes, urina, epistaxe, menstruação)?',
        'Icterícia ou urina escura (hemólise)?',
        'Febre, aumento do abdome (baço)?',
        'Verminose conhecida, anda descalço?',
        'Anemia falciforme ou outra anemia na família?',
        'Malária prévia ou atual?'
      ],
      sintomasAssociados: sx(['fraqueza', 'ictericia', 'febre', 'esplenomegalia', 'hepatomegalia', 'sangramento', 'petequias', 'perda_peso', 'dispneia', 'edema']),
      sinaisGravidade: ['choque', 'desconforto_respiratorio', 'hipoxemia', 'sangramento_importante', 'alteracao_consciencia', 'letargia'],
      diferenciais: [
        { se: {}, hipoteses: [d('anemia_ferropriva'), d('parasitoses_intestinais', 'ancilostomíase e tricuríase'), d('malaria'), d('desnutricao'), n('Anemia falciforme / hemoglobinopatias'), n('Hemólise (G6PD, esferocitose)')] },
        { se: { contexto: ['rural', 'ribeirinha', 'indigena', 'agua_nao_tratada'] }, hipoteses: [d('parasitoses_intestinais'), d('anemia_ferropriva'), d('malaria')] },
        { se: { sintomas: ['febre', 'esplenomegalia'] }, hipoteses: [d('malaria', 'anemia grave: Hb < 5 g/dL é critério de gravidade'), d('leishmaniose_visceral')] },
        { se: { sintomas: ['petequias'] }, hipoteses: [n('Leucemia aguda / aplasia medular'), d('leishmaniose_visceral', 'pancitopenia')] },
        { se: { sintomas: ['ictericia'] }, hipoteses: [n('Anemia hemolítica'), d('malaria'), n('Deficiência de G6PD (após primaquina ou infecção)')] },
        { se: { sintomas: ['edema', 'fraqueza'] }, hipoteses: [d('desnutricao', 'kwashiorkor'), n('Síndrome nefrótica')] }
      ],
      exames: ['hemograma', 'gota_espessa', 'exame_parasitologico_fezes', 'bilirrubinas', 'rk39'],
      condutaInicial: [
        'Avaliar palidez palmar (AIDPI): grave (encaminhar) ou leve/moderada.',
        'Hemograma com índices e reticulócitos; gota espessa em área endêmica.',
        'Considerar sulfato ferroso terapêutico (3–5 mg/kg/dia de ferro elementar) por 3 meses se ferropriva provável, com reavaliação em 30 dias.',
        'Tratar parasitoses (albendazol > 1 ano) e orientar alimentação rica em ferro.',
        'Anemia grave com descompensação (dispneia, taquicardia, letargia): transfusão conforme protocolo e transferência.'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },
    {
      id: 'fraqueza', nome: 'Fraqueza / prostração', grupo: 'geral', icone: '🪫',
      perguntas: [
        'Início (agudo ou progressivo)? Generalizada ou localizada (membros, pálpebras)?',
        'Febre, perda de peso, diarreia ou vômitos?',
        'Dificuldade para andar, subir escadas, engolir ou respirar?',
        'Formigamento ou perda de sensibilidade?',
        'Picada de serpente, carrapato ou exposição a agrotóxico?',
        'Alimentação adequada? Palidez?',
        'Infecção viral ou vacina nas últimas semanas (Guillain-Barré)?'
      ],
      sintomasAssociados: sx(['febre', 'palidez', 'perda_peso', 'fraqueza', 'hipotonia', 'alteracao_sensibilidade', 'diarreia', 'vomitos', 'dispneia', 'recusa_alimentar']),
      sinaisGravidade: ['alteracao_consciencia', 'desconforto_respiratorio', 'hipoglicemia', 'apneia', 'hipotensao', 'letargia'],
      diferenciais: [
        { se: {}, hipoteses: [d('anemia_ferropriva'), d('desnutricao'), n('Astenia pós-infecciosa'), n('Hipoglicemia'), n('Distúrbio hidroeletrolítico (hipocalemia)'), n('Síndrome de Guillain-Barré')] },
        { se: { contexto: ['mordedura'] }, hipoteses: [d('acidente_ofidico', 'elapídico ou crotálico: ptose, fácies miastênica, insuficiência respiratória')] },
        { se: { sintomas: ['alteracao_sensibilidade'] }, hipoteses: [d('hanseniase', 'neuropatia com espessamento de nervos'), n('Polineuropatia (Guillain-Barré)')] },
        { se: { sintomas: ['febre', 'perda_peso'] }, hipoteses: [d('leishmaniose_visceral'), d('tuberculose'), n('HIV')] },
        { se: { sintomas: ['diarreia', 'vomitos'] }, hipoteses: [n('Desidratação e hipocalemia'), d('doenca_diarreica')] },
        { se: { contexto: ['garimpo', 'rural'] }, hipoteses: [n('Intoxicação por mercúrio'), n('Intoxicação por organofosforado (fraqueza, fasciculações)')] }
      ],
      exames: ['hemograma', 'glicemia', 'eletrolitos', 'cpk', 'gota_espessa', 'rk39'],
      condutaInicial: [
        'Diferenciar fraqueza muscular verdadeira de prostração por doença sistêmica; examinar força, reflexos, sensibilidade e nervos periféricos.',
        'Glicemia capilar e avaliação de hidratação e nutrição.',
        'Fraqueza ascendente aguda ou dificuldade respiratória: internar e monitorar função respiratória.',
        'Investigar anemia, parasitoses e infecção crônica conforme contexto.',
        'Encaminhar para neurologia se déficit focal, arreflexia ou progressão.'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },
    {
      id: 'perda_peso', nome: 'Perda de peso / baixo ganho ponderal', grupo: 'geral', icone: '⚖️',
      perguntas: [
        'Peso anterior registrado? Curva de crescimento na caderneta?',
        'Ingestão alimentar (quantidade, frequência, insegurança alimentar)?',
        'Diarreia crônica, vômitos, distensão abdominal?',
        'Febre prolongada, tosse > 3 semanas, sudorese noturna?',
        'Contato com tuberculose?',
        'Sede e poliúria (diabetes)?',
        'Infecções de repetição?',
        'Condições de moradia, água e saneamento?'
      ],
      sintomasAssociados: sx(['febre_prolongada', 'tosse_prolongada', 'diarreia', 'fraqueza', 'palidez', 'esplenomegalia', 'hepatomegalia', 'linfonodomegalia', 'sudorese', 'edema']),
      sinaisGravidade: ['hipoglicemia', 'letargia', 'desidratacao_grave', 'choque', 'hipotensao'],
      diferenciais: [
        { se: {}, hipoteses: [d('desnutricao'), d('parasitoses_intestinais'), d('tuberculose'), n('Insegurança alimentar / erro alimentar'), n('Doença celíaca / má absorção'), n('HIV'), n('Diabetes mellitus tipo 1')] },
        { se: { contexto: ['contato_tb'] }, hipoteses: [d('tuberculose', 'aplicar sistema de pontuação do MS')] },
        { se: { sintomas: ['tosse_prolongada'] }, hipoteses: [d('tuberculose'), n('HIV')] },
        { se: { sintomas: ['febre_prolongada', 'esplenomegalia'] }, hipoteses: [d('leishmaniose_visceral', 'rK39 e mielograma se disponível'), d('tuberculose'), n('Leucemia / linfoma')] },
        { se: { contexto: ['rural', 'indigena', 'ribeirinha', 'agua_nao_tratada'] }, hipoteses: [d('parasitoses_intestinais'), d('desnutricao'), d('anemia_ferropriva')] },
        { se: { sintomas: ['diarreia'] }, hipoteses: [d('parasitoses_intestinais', 'giardíase, estrongiloidíase'), n('Doença celíaca'), n('HIV'), n('Alergia à proteína do leite de vaca')] }
      ],
      exames: ['hemograma', 'exame_parasitologico_fezes', 'glicemia', 'radiografia_torax', 'teste_rapido_molecular_tb', 'rk39', 'urina_1'],
      condutaInicial: [
        'Medir peso, comprimento/estatura, perímetro braquial e calcular escores z (P/E, E/I, IMC/I) nas curvas da OMS.',
        'Desnutrição grave (P/E < -3 DP ou PB < 11,5 cm ou edema bilateral): avaliar complicações e internar conforme protocolo do MS.',
        'Investigar tuberculose, HIV e parasitoses conforme contexto.',
        'Orientar alimentação, suplementação de micronutrientes e acompanhamento na atenção básica.',
        'Acionar assistência social se insegurança alimentar.'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },
    {
      id: 'edema', nome: 'Edema', grupo: 'geral', icone: '💧',
      perguntas: [
        'Localização (palpebral matinal, membros inferiores, generalizado, unilateral)?',
        'Início? Ganho de peso recente?',
        'Urina escura, espumosa ou reduzida?',
        'Faringite ou impetigo nas últimas 2–3 semanas?',
        'Dieta pobre em proteína? Diarreia crônica?',
        'Dispneia, cansaço, sudorese ao mamar (cardiopatia)?',
        'Picada ou mordedura recente no local? Consumo de açaí artesanal?'
      ],
      sintomasAssociados: sx(['hematuria', 'reducao_diurese', 'palidez', 'dispneia', 'febre', 'dor_local', 'lesoes_pele', 'perda_peso', 'distensao_abdominal', 'prurido']),
      sinaisGravidade: ['edema_pulmonar', 'oliguria', 'anuria', 'desconforto_respiratorio', 'anafilaxia', 'choque', 'convulsao'],
      diferenciais: [
        { se: {}, hipoteses: [n('Glomerulonefrite pós-estreptocócica'), n('Síndrome nefrótica'), d('desnutricao', 'kwashiorkor: edema bilateral com desnutrição'), n('Insuficiência cardíaca'), n('Hepatopatia / hipoalbuminemia'), n('Reação alérgica / angioedema')] },
        { se: { sintomas: ['hematuria'] }, hipoteses: [n('Glomerulonefrite pós-estreptocócica', 'medir PA; risco de encefalopatia hipertensiva e edema pulmonar'), n('Síndrome hemolítico-urêmica')] },
        { se: { sintomas: ['lesoes_pele'] }, hipoteses: [d('escabiose_impetigo', 'impetigo estreptocócico precede a GNPE em 2–3 semanas'), n('Glomerulonefrite pós-estreptocócica')] },
        { se: { contexto: ['mordedura'] }, hipoteses: [d('acidente_ofidico', 'botrópico: edema local progressivo, bolhas, sangramento'), n('Anafilaxia'), n('Reação local a picada de himenóptero')] },
        { se: { sintomas: ['febre'], contexto: ['acai', 'rural'] }, hipoteses: [d('doenca_chagas', 'forma aguda: edema facial/palpebral, febre prolongada, hepatoesplenomegalia; surto familiar após açaí')] },
        { se: { sintomas: ['dispneia', 'palidez'] }, hipoteses: [n('Insuficiência cardíaca'), n('Anemia grave')] }
      ],
      exames: ['urina_1', 'ureia', 'creatinina', 'eletrolitos', 'hemograma', 'radiografia_torax'],
      condutaInicial: [
        'Medir pressão arterial com manguito adequado e comparar com percentis; pesar diariamente.',
        'Urina 1 (hematúria, proteinúria), função renal e albumina se disponível.',
        'GNPE: restrição hidrossalina, furosemida se congestão, controle da hipertensão; tratar foco estreptocócico.',
        'Edema com desnutrição: conduzir como desnutrição grave (protocolo do MS), com hidratação cautelosa.',
        'Encaminhar se hipertensão, oligúria, dispneia ou proteinúria nefrótica.'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },
    {
      id: 'sangramento', nome: 'Sangramento', grupo: 'geral', icone: '🩸',
      perguntas: [
        'Local (gengiva, nariz, pele, urina, fezes, vômito, local de picada)?',
        'Início e volume? Sangramento espontâneo ou após trauma?',
        'Febre nos últimos dias? Exantema?',
        'Palidez, cansaço, aumento do abdome?',
        'Picada de serpente ou lagarta (taturana)?',
        'Uso de AAS/AINE ou anticoagulante? Doença hepática?',
        'Vitamina K ao nascer (RN)? História familiar de sangramento?'
      ],
      sintomasAssociados: sx(['petequias', 'epistaxe', 'sangramento_gengival', 'febre', 'palidez', 'ictericia', 'hematuria', 'dor_abdominal', 'esplenomegalia', 'diarreia_sangue']),
      sinaisGravidade: ['sangramento_importante', 'choque', 'hipotensao', 'petequias_purpura', 'alteracao_consciencia', 'oliguria', 'ictericia_intensa'],
      diferenciais: [
        { se: {}, hipoteses: [d('dengue', 'dengue com sinais de alarme / grave'), n('Púrpura trombocitopênica imune'), n('Coagulopatia / deficiência de vitamina K'), n('Leucemia aguda'), n('Trauma / violência')] },
        { se: { contexto: ['mordedura'] }, hipoteses: [d('acidente_ofidico', 'botrópico/laquético: tempo de coagulação e soro antiveneno'), n('Acidente por lagarta Lonomia (erucismo): soro antilonômico')] },
        { se: { sintomas: ['febre'], contexto: ['mosquito', 'rural', 'ribeirinha', 'viagem'] }, hipoteses: [d('dengue'), d('febre_amarela'), d('malaria', 'grave'), d('leptospirose')] },
        { se: { contexto: CTX_LEPTO }, hipoteses: [d('leptospirose', 'hemorragia pulmonar'), n('Síndrome cardiopulmonar por hantavírus')] },
        { se: { sintomas: ['ictericia'] }, hipoteses: [d('febre_amarela'), d('leptospirose'), n('Insuficiência hepática aguda')] },
        { se: { sintomas: ['esplenomegalia', 'palidez'] }, hipoteses: [n('Leucemia'), d('leishmaniose_visceral')] }
      ],
      exames: ['hemograma', 'coagulograma', 'tempo_coagulacao', 'ns1_dengue', 'sorologia_dengue', 'ast', 'alt', 'bilirrubinas', 'creatinina', 'gota_espessa'],
      condutaInicial: [
        'Compressão local, avaliar perfusão e sinais de choque; acesso venoso se sangramento importante.',
        'Hemograma com plaquetas e hematócrito; coagulograma ou tempo de coagulação à beira do leito (Lee-White) se picada de serpente.',
        'Dengue: classificar grupo C/D, hidratação venosa conforme protocolo; evitar AINE e injeções IM.',
        'Acidente ofídico com incoagulabilidade: soro antiveneno conforme classificação; não fazer torniquete.',
        'Encaminhar para unidade com banco de sangue se instabilidade ou plaquetopenia grave.'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },
    {
      id: 'petequias', nome: 'Petéquias', grupo: 'geral', icone: '🟣',
      perguntas: [
        'Início? Distribuição (só acima da linha mamilar após tosse/vômito ou generalizadas)?',
        'Febre associada? Estado geral?',
        'Outros sangramentos (gengiva, nariz)?',
        'Palidez, aumento do baço ou gânglios?',
        'Infecção viral recente? Medicamentos?',
        'Vacinas meningocócica e pneumocócica em dia? Contato com meningite?',
        'Área de dengue?'
      ],
      sintomasAssociados: sx(['febre', 'sangramento', 'epistaxe', 'sangramento_gengival', 'palidez', 'cefaleia', 'rigidez_nuca', 'mialgia', 'esplenomegalia', 'vomitos']),
      sinaisGravidade: ['petequias_purpura', 'sepse', 'choque', 'rigidez_nuca', 'alteracao_consciencia', 'sangramento_importante'],
      diferenciais: [
        { se: {}, hipoteses: [d('dengue'), d('meningite', 'meningococemia'), n('Púrpura trombocitopênica imune'), n('Petéquias mecânicas por tosse ou vômito (acima da linha mamilar)'), n('Leucemia aguda'), d('sepse')] },
        { se: { sintomas: ['febre', 'rigidez_nuca'] }, hipoteses: [d('meningite', 'meningococemia: antibiótico imediato')] },
        { se: { sintomas: ['febre'], contexto: ['mosquito', 'rural', 'ribeirinha', 'viagem'] }, hipoteses: [d('dengue', 'prova do laço, plaquetas e hematócrito')] },
        { se: { contexto: ['mordedura'] }, hipoteses: [d('acidente_ofidico', 'botrópico')] },
        { se: { sintomas: ['palidez', 'esplenomegalia'] }, hipoteses: [n('Leucemia aguda'), d('leishmaniose_visceral')] },
        { se: { contexto: CTX_LEPTO }, hipoteses: [d('leptospirose')] }
      ],
      exames: ['hemograma', 'coagulograma', 'pcr', 'hemocultura', 'ns1_dengue', 'liquor'],
      condutaInicial: [
        'Febre + petéquias: tratar como emergência (meningococemia até prova contrária): acesso, hemocultura, ceftriaxona, avaliação de choque.',
        'Sem febre e bom estado geral com plaquetopenia isolada: considerar PTI; evitar AINE e esportes de contato.',
        'Dengue: avaliar sinais de alarme e classificar; hidratação conforme grupo.',
        'Hemograma com plaquetas em todos; esfregaço se palidez ou esplenomegalia.',
        'Notificar meningite e dengue.'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },
    {
      id: 'linfonodomegalia', nome: 'Gânglios aumentados', grupo: 'geral', icone: '🫘',
      perguntas: [
        'Localização (cervical, axilar, inguinal, generalizada)?',
        'Tamanho, consistência, dor, mobilidade, flutuação?',
        'Duração (> 2–4 semanas)?',
        'Febre, sudorese noturna, perda de peso?',
        'Lesão de pele, ferida ou úlcera na área drenada?',
        'Contato com tuberculose? Contato com gatos?',
        'Dor de garganta ou infecção recente?',
        'Consumo de açaí artesanal (Chagas aguda)?'
      ],
      sintomasAssociados: sx(['febre', 'febre_prolongada', 'perda_peso', 'sudorese', 'dor_garganta', 'lesoes_pele', 'ulcera_cutanea', 'hepatomegalia', 'esplenomegalia', 'exantema']),
      sinaisGravidade: ['desconforto_respiratorio', 'sepse', 'letargia'],
      diferenciais: [
        { se: {}, hipoteses: [n('Linfadenite reativa viral'), n('Linfadenite bacteriana (S. aureus, estreptococo)'), n('Mononucleose infecciosa'), d('tuberculose', 'ganglionar'), n('Doença da arranhadura do gato'), n('Linfoma / leucemia')] },
        { se: { contexto: ['contato_tb'] }, hipoteses: [d('tuberculose', 'linfadenite cervical fria, fistulizante')] },
        { se: { sintomas: ['febre_prolongada', 'sudorese'] }, hipoteses: [d('tuberculose'), n('Linfoma'), d('leishmaniose_visceral')] },
        { se: { sintomas: ['ulcera_cutanea'], contexto: ['mata', 'rural', 'garimpo'] }, hipoteses: [d('leishmaniose_tegumentar', 'adenopatia satélite / linfangite'), n('Esporotricose')] },
        { se: { sintomas: ['hepatomegalia', 'esplenomegalia'] }, hipoteses: [d('leishmaniose_visceral'), d('doenca_chagas', 'fase aguda, sobretudo após açaí artesanal'), n('Toxoplasmose'), n('Mononucleose'), n('Leucemia')] },
        { se: { sintomas: ['exantema', 'febre'] }, hipoteses: [n('Rubéola (retroauricular)'), d('zika'), n('Mononucleose')] }
      ],
      exames: ['hemograma', 'pcr', 'radiografia_torax', 'teste_rapido_molecular_tb', 'rk39', 'ast', 'alt'],
      condutaInicial: [
        'Examinar todas as cadeias, fígado e baço; medir e registrar o gânglio.',
        'Linfadenite bacteriana aguda: antibiótico (cefalexina ou amoxicilina-clavulanato) e reavaliar em 48–72 h; drenar se flutuação.',
        'Gânglio > 2 cm, duro, aderido, supraclavicular ou > 4 semanas: hemograma, radiografia de tórax, investigar TB e neoplasia.',
        'Sinais sistêmicos (febre prolongada, perda de peso, hepatoesplenomegalia): investigar LV, TB, Chagas aguda, leucemia.',
        'Encaminhar para biópsia se persistência sem etiologia.'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },
    {
      id: 'hepatomegalia', nome: 'Hepatomegalia', grupo: 'geral', icone: '🟠',
      perguntas: [
        'Há quanto tempo foi notado o aumento do abdome?',
        'Febre (aguda ou prolongada)? Icterícia, colúria?',
        'Palidez, aumento do baço?',
        'Dispneia, edema, cansaço ao mamar (cardiopatia)?',
        'Dor abdominal em hipocôndrio direito?',
        'Água não tratada, contato com hepatite, açaí artesanal?',
        'Área de malária ou leishmaniose (calazar)?'
      ],
      sintomasAssociados: sx(['febre', 'ictericia', 'esplenomegalia', 'palidez', 'dor_abdominal', 'distensao_abdominal', 'perda_peso', 'edema', 'febre_prolongada', 'sangramento']),
      sinaisGravidade: ['ictericia_intensa', 'alteracao_consciencia', 'sangramento_importante', 'hipoglicemia', 'choque'],
      diferenciais: [
        { se: {}, hipoteses: [n('Hepatite viral (A, B)'), d('malaria'), d('leishmaniose_visceral'), n('Insuficiência cardíaca congestiva'), n('Doenças de depósito / metabólicas'), n('Abscesso hepático (amebiano ou piogênico)')] },
        { se: { sintomas: ['febre'], contexto: CTX_MALARIA }, hipoteses: [d('malaria'), d('leishmaniose_visceral')] },
        { se: { sintomas: ['febre_prolongada', 'palidez', 'esplenomegalia'] }, hipoteses: [d('leishmaniose_visceral', 'rK39; pancitopenia e hipergamaglobulinemia')] },
        { se: { contexto: ['agua_nao_tratada', 'contato_infeccioso'] }, hipoteses: [n('Hepatite A'), n('Abscesso hepático amebiano'), d('parasitoses_intestinais')] },
        { se: { contexto: ['acai'] }, hipoteses: [d('doenca_chagas', 'fase aguda: hepatoesplenomegalia, febre, edema')] },
        { se: { sintomas: ['ictericia'] }, hipoteses: [n('Hepatite viral'), d('malaria'), d('leptospirose'), n('Colestase')] }
      ],
      exames: ['hemograma', 'ast', 'alt', 'bilirrubinas', 'coagulograma', 'gota_espessa', 'rk39', 'elisa_leishmaniose', 'glicemia'],
      condutaInicial: [
        'Medir o fígado em cm abaixo do rebordo costal na linha hemiclavicular; avaliar consistência, dor e baço.',
        'Hemograma, transaminases, bilirrubinas e coagulograma; gota espessa em área endêmica.',
        'Febre prolongada + hepatoesplenomegalia + citopenias: investigar leishmaniose visceral e encaminhar.',
        'Ultrassonografia abdominal quando disponível.',
        'Notificar hepatite viral, malária, LV e Chagas aguda.'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },
    {
      id: 'esplenomegalia', nome: 'Esplenomegalia', grupo: 'geral', icone: '🫧',
      perguntas: [
        'Febre atual ou prolongada (> 2 semanas)?',
        'Palidez, perda de peso, aumento do abdome progressivo?',
        'Sangramentos ou petéquias?',
        'Malária prévia ou repetida? Área de calazar?',
        'Anemia falciforme na família? Icterícia?',
        'Contato com água de rio (esquistossomose)? Açaí artesanal?',
        'Gânglios aumentados, dor de garganta (mononucleose)?'
      ],
      sintomasAssociados: sx(['febre', 'febre_prolongada', 'palidez', 'hepatomegalia', 'perda_peso', 'ictericia', 'sangramento', 'linfonodomegalia', 'distensao_abdominal', 'fraqueza']),
      sinaisGravidade: ['choque', 'sangramento_importante', 'letargia', 'hipoglicemia', 'sepse', 'ictericia_intensa'],
      diferenciais: [
        { se: {}, hipoteses: [d('malaria'), d('leishmaniose_visceral'), n('Anemia falciforme / hemoglobinopatias / esferocitose'), n('Mononucleose infecciosa'), n('Leucemia / linfoma'), n('Esquistossomose hepatoesplênica')] },
        { se: { contexto: CTX_MALARIA }, hipoteses: [d('malaria', 'esplenomegalia palúdica hiper-reativa em exposição repetida'), d('leishmaniose_visceral')] },
        { se: { sintomas: ['febre_prolongada', 'palidez', 'perda_peso'] }, hipoteses: [d('leishmaniose_visceral', 'alta prioridade: rK39, hemograma, albumina/globulina')] },
        { se: { sintomas: ['ictericia', 'palidez'] }, hipoteses: [n('Hemólise crônica (falciforme, esferocitose)'), d('malaria'), n('Sequestro esplênico (falciforme): emergência')] },
        { se: { sintomas: ['sangramento'] }, hipoteses: [n('Leucemia'), d('leishmaniose_visceral', 'pancitopenia'), n('Hiperesplenismo')] },
        { se: { contexto: ['agua_rio'] }, hipoteses: [n('Esquistossomose (focos restritos no Amazonas)')] }
      ],
      exames: ['hemograma', 'gota_espessa', 'teste_rapido_malaria', 'rk39', 'elisa_leishmaniose', 'bilirrubinas', 'ast', 'alt', 'exame_parasitologico_fezes'],
      condutaInicial: [
        'Palpar baço em decúbito dorsal e lateral; medir em cm; avaliar fígado, gânglios e palidez.',
        'Hemograma com plaquetas e reticulócitos; gota espessa em área endêmica.',
        'Febre + esplenomegalia + citopenias em área endêmica: investigar leishmaniose visceral e encaminhar para tratamento hospitalar.',
        'Evitar esportes de contato e trauma abdominal enquanto persistir esplenomegalia.',
        'Palidez súbita com esplenomegalia em falciforme: sequestro esplênico, transferir para transfusão.'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },
    {
      id: 'ictericia', nome: 'Icterícia', grupo: 'geral', icone: '🟡',
      perguntas: [
        'Início (aguda ou progressiva)? Colúria e acolia?',
        'Febre associada? Calafrios?',
        'Dor abdominal, vômitos, inapetência?',
        'Palidez ou urina cor de coca-cola (hemólise)?',
        'Contato com hepatite? Água não tratada?',
        'Medicamentos (paracetamol, isoniazida, anticonvulsivantes, chás)?',
        'Vacinas de hepatite A/B e febre amarela em dia?',
        'Área de malária? Deficiência de G6PD ou anemia falciforme na família?'
      ],
      sintomasAssociados: sx(['febre', 'palidez', 'dor_abdominal', 'vomitos', 'hepatomegalia', 'esplenomegalia', 'prurido', 'sangramento', 'alteracao_consciencia', 'calafrios']),
      sinaisGravidade: ['ictericia_intensa', 'alteracao_consciencia', 'sangramento_importante', 'hipoglicemia', 'oliguria', 'choque'],
      diferenciais: [
        { se: {}, hipoteses: [n('Hepatite viral A'), d('malaria'), n('Hemólise (deficiência de G6PD, anemia falciforme)'), d('leptospirose'), n('Colestase / atresia de vias biliares (lactente)'), n('Hepatite medicamentosa ou por plantas')] },
        { se: { sintomas: ['febre', 'calafrios'], contexto: CTX_MALARIA }, hipoteses: [d('malaria', 'icterícia = critério de gravidade')] },
        { se: { contexto: CTX_LEPTO }, hipoteses: [d('leptospirose')] },
        { se: { contexto: ['agua_nao_tratada', 'contato_infeccioso'] }, hipoteses: [n('Hepatite A', 'notificar; vacinar contatos')] },
        { se: { contexto: ['nao_vacinado', 'mata'] }, hipoteses: [d('febre_amarela', 'notificação imediata')] },
        { se: { sintomas: ['alteracao_consciencia', 'sangramento'] }, hipoteses: [n('Insuficiência hepática aguda'), d('malaria'), d('febre_amarela')] }
      ],
      exames: ['bilirrubinas', 'ast', 'alt', 'hemograma', 'coagulograma', 'gota_espessa', 'teste_rapido_malaria', 'urina_1', 'glicemia', 'creatinina'],
      condutaInicial: [
        'Bilirrubinas totais e frações, transaminases, coagulograma (TAP é marcador de gravidade) e glicemia.',
        'Gota espessa ou teste rápido de malária em área endêmica.',
        'Hepatite A: repouso relativo, hidratação, evitar hepatotóxicos; isolar e notificar; higiene das mãos.',
        'Sinais de insuficiência hepática (alteração de consciência, sangramento, TAP alargado, hipoglicemia): transferir para referência.',
        'Suspender medicamentos potencialmente hepatotóxicos e chás.'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },

    // -------------------------------------------------------------- URINÁRIO
    {
      id: 'dor_urinaria', nome: 'Dor ao urinar (disúria)', grupo: 'urinario', icone: '🚻',
      perguntas: [
        'Febre com calafrios ou dor lombar (ITU alta)?',
        'Urgência, polaciúria, urina turva ou com sangue?',
        'Vômitos, dor abdominal?',
        'ITU prévia? Malformação urinária conhecida?',
        'Constipação? Higiene perineal, uso de banho de espuma?',
        'Corrimento vaginal, prurido anal noturno (oxiuríase)?',
        'Diurese e ingestão de líquidos?'
      ],
      sintomasAssociados: sx(['febre', 'dor_abdominal', 'hematuria', 'vomitos', 'calafrios', 'reducao_diurese', 'irritabilidade', 'recusa_alimentar', 'edema', 'prurido']),
      sinaisGravidade: ['sepse', 'lactente_jovem_febre', 'oliguria', 'choque', 'desidratacao_grave'],
      diferenciais: [
        { se: {}, hipoteses: [d('infeccao_urinaria', 'cistite ou pielonefrite'), n('Vulvovaginite / balanite'), n('Uretrite / irritação química'), n('Litíase urinária'), d('parasitoses_intestinais', 'oxiuríase')] },
        { se: { sintomas: ['febre', 'calafrios'] }, hipoteses: [d('infeccao_urinaria', 'pielonefrite: urocultura antes do antibiótico; internar se < 3 meses ou toxemia')] },
        { se: { sintomas: ['hematuria', 'edema'] }, hipoteses: [n('Glomerulonefrite pós-estreptocócica')] },
        { se: { sintomas: ['febre', 'vomitos'] }, hipoteses: [d('infeccao_urinaria'), d('sepse')] },
        { se: { sintomas: ['prurido'] }, hipoteses: [n('Vulvovaginite'), d('parasitoses_intestinais', 'oxiuríase')] },
        { se: { contexto: ['agua_rio'] }, hipoteses: [n('Esquistossomose (hematúria terminal, focos restritos)')] }
      ],
      exames: ['urina_1', 'urocultura', 'hemograma', 'pcr', 'ureia', 'creatinina'],
      condutaInicial: [
        'Coletar urina 1 e urocultura antes do antibiótico (jato médio, cateterismo ou punção suprapúbica em lactentes).',
        'Considerar antibiótico empírico (cefalexina, amoxicilina-clavulanato ou cefuroxima) e ajustar pela cultura.',
        'ITU febril em < 3 meses, toxemia ou vômitos: internar e antibiótico parenteral.',
        'Orientar hidratação, tratar constipação e higiene; ultrassonografia de vias urinárias após primeira ITU febril.',
        'Retorno em 48–72 h para avaliar resposta e cultura.'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },
    {
      id: 'reducao_diurese', nome: 'Redução da diurese', grupo: 'urinario', icone: '💧',
      perguntas: [
        'Última micção (horas)? Número de fraldas nas últimas 24 h?',
        'Diarreia, vômitos, febre, baixa ingestão de líquidos?',
        'Edema, urina escura ou espumosa?',
        'Palidez, sangue nas fezes (SHU)?',
        'Picada de serpente ou aranha?',
        'Medicamentos nefrotóxicos (AINE, aminoglicosídeo)?',
        'Jato urinário fraco ou esforço para urinar (obstrução)?'
      ],
      sintomasAssociados: sx(['diarreia', 'vomitos', 'febre', 'desidratacao', 'edema', 'hematuria', 'dor_abdominal', 'palidez', 'ictericia', 'oliguria']),
      sinaisGravidade: ['oliguria', 'anuria', 'desidratacao_grave', 'choque', 'edema_pulmonar', 'alteracao_consciencia', 'sepse'],
      diferenciais: [
        { se: {}, hipoteses: [n('Desidratação (oligúria pré-renal)'), d('doenca_diarreica'), n('Glomerulonefrite aguda'), n('Síndrome hemolítico-urêmica'), n('Lesão renal aguda'), n('Uropatia obstrutiva / retenção urinária')] },
        { se: { sintomas: ['diarreia', 'palidez'] }, hipoteses: [n('Síndrome hemolítico-urêmica', 'anemia hemolítica, plaquetopenia, LRA')] },
        { se: { sintomas: ['edema', 'hematuria'] }, hipoteses: [n('Glomerulonefrite pós-estreptocócica')] },
        { se: { contexto: ['mordedura'] }, hipoteses: [d('acidente_ofidico', 'botrópico e crotálico: LRA; hidratar e monitorar'), d('araneismo', 'loxoscelismo cutâneo-hemolítico')] },
        { se: { sintomas: ['febre'], contexto: CTX_LEPTO }, hipoteses: [d('leptospirose', 'LRA com hipocalemia'), d('malaria', 'grave')] },
        { se: { sintomas: ['febre', 'desidratacao'] }, hipoteses: [d('dengue', 'choque com extravasamento'), d('sepse'), d('malaria')] }
      ],
      exames: ['ureia', 'creatinina', 'eletrolitos', 'urina_1', 'hemograma', 'gasometria', 'glicemia'],
      condutaInicial: [
        'Avaliar hidratação, perfusão, PA e peso; se hipovolemia, expansão com cristaloide 20 mL/kg e reavaliar diurese.',
        'Sondagem vesical para medir débito se oligúria persistente.',
        'Ureia, creatinina, potássio e gasometria; ECG se hiperpotassemia.',
        'Suspender nefrotóxicos; ajustar doses de medicamentos.',
        'Encaminhar para referência com nefrologia se anúria, hiperpotassemia, sobrecarga ou uremia.'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },

    // ------------------------------------------------------------- ACIDENTES
    {
      id: 'picada_inseto', nome: 'Picada de inseto', grupo: 'acidentes', icone: '🦟',
      perguntas: [
        'Qual inseto (mosquito, abelha/vespa/formiga, carrapato, lagarta/taturana, mutuca)?',
        'Local e número de picadas? Tempo desde a picada?',
        'Reação local (dor, edema, urticária, bolha)?',
        'Sintomas sistêmicos (dispneia, vômitos, tontura, urticária generalizada)?',
        'Reação grave prévia a picadas?',
        'Febre dias após a picada (arbovirose, malária)?',
        'Sangramento após contato com lagarta?'
      ],
      sintomasAssociados: sx(['dor_local', 'edema', 'prurido', 'exantema', 'febre', 'dispneia', 'vomitos', 'sangramento', 'lesoes_pele', 'cefaleia']),
      sinaisGravidade: ['anafilaxia', 'desconforto_respiratorio', 'choque', 'sangramento_importante', 'oliguria', 'alteracao_consciencia'],
      diferenciais: [
        { se: {}, hipoteses: [n('Reação local à picada'), n('Prurigo estrófulo'), n('Anafilaxia'), n('Acidente por himenópteros (abelhas, vespas, formigas) – múltiplas picadas'), n('Erucismo (lagarta Lonomia)'), d('escabiose_impetigo', 'impetiginização secundária')] },
        { se: { sintomas: ['sangramento'] }, hipoteses: [n('Erucismo por Lonomia (síndrome hemorrágica)', 'tempo de coagulação; soro antilonômico conforme gravidade')] },
        { se: { sintomas: ['febre', 'cefaleia'], contexto: ['mosquito', 'rural', 'ribeirinha', 'mata', 'viagem'] }, hipoteses: [d('dengue'), d('malaria'), d('chikungunya'), d('zika'), d('oropouche'), d('mayaro'), d('febre_amarela')] },
        { se: { sintomas: ['dispneia', 'exantema'] }, hipoteses: [n('Anafilaxia: adrenalina IM imediata')] },
        { se: { sintomas: ['vomitos', 'edema'] }, hipoteses: [n('Envenenamento por múltiplas picadas de abelhas (rabdomiólise, LRA, hemólise)')] },
        { se: { sintomas: ['ulcera_cutanea'], contexto: ['mata', 'rural'] }, hipoteses: [d('leishmaniose_tegumentar', 'picada de flebotomíneo semanas antes')] }
      ],
      exames: ['hemograma', 'tempo_coagulacao', 'coagulograma', 'cpk', 'creatinina', 'urina_1', 'gota_espessa'],
      condutaInicial: [
        'Avaliar sinais de anafilaxia; se presentes, adrenalina IM sem atraso.',
        'Reação local: lavar, compressa fria, anti-histamínico oral e analgesia; remover ferrão de abelha por raspagem.',
        'Múltiplas picadas de abelhas (> 20 em crianças) ou sintomas sistêmicos: internar, hidratar, monitorar CPK e função renal; considerar soro antiapílico onde disponível.',
        'Contato com lagarta: tempo de coagulação; se alterado, soro antilonômico e evitar procedimentos invasivos.',
        'Orientar sobre febre nos dias seguintes (arboviroses e malária) e retorno.'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },
    {
      id: 'mordedura_animal', nome: 'Mordedura de animal', grupo: 'acidentes', icone: '🐕',
      perguntas: [
        'Animal (cão, gato, morcego, macaco, animal silvestre, humano)?',
        'Animal é conhecido e observável por 10 dias? Ataque provocado?',
        'Local e profundidade da lesão (cabeça, pescoço, mãos e lesões profundas são graves)?',
        'Tempo desde o acidente? Lavou com água e sabão?',
        'Vacinação antitetânica em dia?',
        'Profilaxia antirrábica prévia?',
        'Sinais de infecção (dor, edema, secreção, febre)?'
      ],
      sintomasAssociados: sx(['dor_local', 'edema', 'feridas', 'febre', 'sangramento', 'linfonodomegalia', 'alteracao_sensibilidade', 'fraqueza', 'irritabilidade', 'lesoes_pele']),
      sinaisGravidade: ['sangramento_importante', 'sepse', 'choque', 'alteracao_consciencia', 'convulsao', 'desconforto_respiratorio'],
      diferenciais: [
        { se: {}, hipoteses: [n('Ferida por mordedura com risco de infecção (Pasteurella, S. aureus, anaeróbios)'), n('Exposição ao vírus da raiva – avaliar profilaxia pós-exposição'), n('Tétano – avaliar profilaxia')] },
        { se: { contexto: ['animais', 'mordedura'] }, hipoteses: [n('Raiva: morcego, animal silvestre ou cão/gato não observável = soro + vacina conforme esquema do MS')] },
        { se: { sintomas: ['febre', 'edema'] }, hipoteses: [n('Celulite / infecção da ferida'), d('sepse')] },
        { se: { sintomas: ['alteracao_consciencia', 'fraqueza'] }, hipoteses: [n('Raiva humana (encefalite): emergência, notificação imediata')] },
        { se: { contexto: ['mata', 'rural', 'ribeirinha'] }, hipoteses: [d('acidente_ofidico', 'se serpente, conduzir como acidente ofídico'), n('Mordedura por animal silvestre (raiva, infecção)')] }
      ],
      exames: ['hemograma', 'pcr'],
      condutaInicial: [
        'Lavar abundantemente com água corrente e sabão por 15 min; não suturar feridas puntiformes ou de risco (exceto face, com cuidado).',
        'Avaliar indicação de profilaxia antirrábica (vacina e soro/imunoglobulina) conforme animal, gravidade e observabilidade (protocolo do MS).',
        'Profilaxia antitetânica conforme histórico vacinal e tipo de ferida.',
        'Antibiótico profilático (amoxicilina-clavulanato) em mordeduras de gato, mãos, face, feridas profundas ou imunossuprimidos.',
        'Notificar atendimento antirrábico e orientar observação do animal por 10 dias quando aplicável.'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },
    {
      id: 'acidente_ofidico', nome: 'Acidente ofídico (picada de serpente)', grupo: 'acidentes', icone: '🐍',
      perguntas: [
        'Tempo desde a picada? Serpente vista ou identificada (jararaca, surucucu, cascavel, coral)?',
        'Local da picada e marcas de presas?',
        'Dor e edema progressivo no membro? Bolhas, equimose?',
        'Sangramento (gengiva, local, urina, pele)?',
        'Ptose palpebral, visão dupla, dificuldade para engolir ou respirar?',
        'Dor muscular generalizada, urina escura?',
        'Vômitos, diarreia, dor abdominal, tontura (laquético)?',
        'Fez torniquete, cortes ou uso de substâncias no local? Vacina antitetânica?'
      ],
      sintomasAssociados: sx(['dor_local', 'edema', 'sangramento', 'sangramento_gengival', 'hematuria', 'oliguria', 'fraqueza', 'hipotonia', 'vomitos', 'dor_abdominal']),
      sinaisGravidade: ['sangramento_importante', 'choque', 'oliguria', 'anuria', 'desconforto_respiratorio', 'apneia', 'anafilaxia', 'alteracao_consciencia', 'hipotensao'],
      diferenciais: [
        { se: {}, hipoteses: [d('acidente_ofidico', 'botrópico (jararaca) é o mais frequente na Amazônia'), n('Acidente por serpente não peçonhenta (sem manifestações locais ou sistêmicas)')] },
        { se: { sintomas: ['dor_local', 'edema'] }, hipoteses: [d('acidente_ofidico', 'botrópico: classificar leve/moderado/grave pelo edema, sangramento e coagulação; soro antibotrópico')] },
        { se: { sintomas: ['sangramento'] }, hipoteses: [d('acidente_ofidico', 'botrópico ou laquético: tempo de coagulação; soro conforme gravidade')] },
        { se: { sintomas: ['vomitos', 'dor_abdominal'], contexto: ['mata', 'rural'] }, hipoteses: [d('acidente_ofidico', 'laquético (surucucu): síndrome vagal (bradicardia, hipotensão, diarreia); soro antibotrópico-laquético')] },
        { se: { sintomas: ['fraqueza', 'hipotonia'] }, hipoteses: [d('acidente_ofidico', 'crotálico: ptose, fácies miastênica, mialgia, urina escura; soro anticrotálico'), d('acidente_ofidico', 'elapídico (coral): paralisia sem lesão local; soro antielapídico e suporte ventilatório')] },
        { se: { sintomas: ['oliguria', 'hematuria'] }, hipoteses: [d('acidente_ofidico', 'lesão renal aguda: hidratação e monitorização de diurese')] }
      ],
      exames: ['tempo_coagulacao', 'coagulograma', 'hemograma', 'ureia', 'creatinina', 'cpk', 'urina_1', 'eletrolitos'],
      condutaInicial: [
        'Remover torniquete e anéis; manter membro elevado; lavar o local; não cortar, sugar ou aplicar substâncias.',
        'Tempo de coagulação (Lee-White) na admissão e após 12–24 h; hemograma, creatinina, CPK, urina 1.',
        'Classificar gravidade e administrar soro antiveneno específico IV conforme Manual do MS (mesmo número de ampolas para crianças e adultos); pré-medicação e material para anafilaxia disponível.',
        'Analgesia (evitar AINE e AAS), hidratação para manter diurese, profilaxia antitetânica.',
        'Monitorar edema, síndrome compartimental, sangramentos, diurese e função respiratória; notificar (SINAN).'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },
    {
      id: 'acidente_escorpiao', nome: 'Acidente escorpiônico', grupo: 'acidentes', icone: '🦂',
      perguntas: [
        'Tempo desde a picada? Escorpião visto (amarelo – Tityus)?',
        'Idade da criança (< 7 anos = maior risco de gravidade)?',
        'Dor local intensa, parestesia?',
        'Vômitos (sinal de gravidade), sudorese profusa, salivação?',
        'Agitação, tremores, taquicardia, palidez?',
        'Dificuldade para respirar, sonolência?',
        'Doença cardíaca prévia?'
      ],
      sintomasAssociados: sx(['dor_local', 'vomitos', 'sudorese', 'irritabilidade', 'dispneia', 'taquipneia', 'palidez', 'convulsao', 'dor_abdominal', 'edema']),
      sinaisGravidade: ['edema_pulmonar', 'choque', 'vomitos_persistentes', 'desconforto_respiratorio', 'convulsao', 'alteracao_consciencia', 'hipotensao', 'anafilaxia'],
      diferenciais: [
        { se: {}, hipoteses: [d('escorpionismo', 'leve: apenas dor local; moderado: dor + vômitos ocasionais, sudorese, agitação; grave: vômitos incoercíveis, salivação, bradicardia, edema pulmonar, choque'), d('araneismo', 'foneutrismo pode ser confundido quando o animal não é visto')] },
        { se: { sintomas: ['vomitos'] }, hipoteses: [d('escorpionismo', 'moderado/grave: soro antiescorpiônico (2–3 ampolas moderado; 4–6 grave) IV')] },
        { se: { sintomas: ['sudorese', 'dor_local'] }, hipoteses: [d('escorpionismo', 'moderado: observar 6–12 h, soro conforme evolução')] },
        { se: { sintomas: ['dispneia'] }, hipoteses: [d('escorpionismo', 'grave: edema pulmonar, UTI, soro imediato')] },
        { se: { contexto: ['rural', 'enchente'] }, hipoteses: [d('escorpionismo', 'aumento de acidentes na cheia e em áreas com entulho')] }
      ],
      exames: ['glicemia', 'eletrolitos', 'cpk', 'hemograma', 'radiografia_torax', 'gasometria'],
      condutaInicial: [
        'Analgesia imediata: bloqueio local com lidocaína sem vasoconstritor e/ou dipirona; compressa morna.',
        'Crianças < 7 anos: observar em unidade por no mínimo 6–12 h mesmo em quadro leve.',
        'Vômitos, sudorese, agitação, taquicardia ou hipertensão: soro antiescorpiônico IV conforme classificação do MS, o mais precoce possível.',
        'Monitorar FC, PA, SpO2, glicemia; ECG e radiografia de tórax se moderado/grave.',
        'Grave: UTI pediátrica, suporte ventilatório e hemodinâmico; notificar (SINAN).'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },
    {
      id: 'acidente_aranha', nome: 'Acidente por aranha', grupo: 'acidentes', icone: '🕷️',
      perguntas: [
        'Aranha vista (armadeira – grande e agressiva; marrom – pequena, em casas e roupas; viúva-negra)?',
        'Tempo desde a picada?',
        'Dor imediata intensa (armadeira) ou picada indolor com lesão que piora em 24–72 h (marrom)?',
        'Lesão local: edema, palidez central, bolha, necrose (placa marmórea)?',
        'Urina escura, icterícia, palidez (loxoscelismo hemolítico)?',
        'Sudorese, salivação, vômitos, priapismo (foneutrismo)?',
        'Dor abdominal em tábua, contraturas (latrodectismo)?'
      ],
      sintomasAssociados: sx(['dor_local', 'edema', 'lesoes_pele', 'ulcera_cutanea', 'hematuria', 'febre', 'vomitos', 'sudorese', 'ictericia', 'palidez']),
      sinaisGravidade: ['choque', 'oliguria', 'edema_pulmonar', 'ictericia_intensa', 'hipotensao', 'anafilaxia', 'convulsao'],
      diferenciais: [
        { se: {}, hipoteses: [d('araneismo', 'foneutrismo (Phoneutria), loxoscelismo (Loxosceles) ou latrodectismo (Latrodectus)'), n('Picada de outro artrópode'), n('Celulite / infecção secundária')] },
        { se: { sintomas: ['dor_local', 'sudorese'] }, hipoteses: [d('araneismo', 'foneutrismo: dor intensa imediata; moderado/grave em crianças: soro antiaracnídico')] },
        { se: { sintomas: ['lesoes_pele', 'febre'] }, hipoteses: [d('araneismo', 'loxoscelismo cutâneo: lesão necrótica em 24–72 h; soro antiaracnídico/antiloxoscélico se precoce')] },
        { se: { sintomas: ['ictericia', 'hematuria'] }, hipoteses: [d('araneismo', 'loxoscelismo cutâneo-hemolítico: hemólise, LRA; internar')] },
        { se: { sintomas: ['dor_abdominal', 'sudorese'] }, hipoteses: [d('araneismo', 'latrodectismo: dor abdominal, contraturas, hipertensão; soro antilatrodéctico')] },
        { se: { contexto: ['rural', 'enchente'] }, hipoteses: [d('araneismo'), d('escorpionismo')] }
      ],
      exames: ['hemograma', 'bilirrubinas', 'creatinina', 'urina_1', 'cpk', 'coagulograma'],
      condutaInicial: [
        'Identificar síndrome clínica (foneutrismo, loxoscelismo, latrodectismo) pela apresentação, mesmo sem ver a aranha.',
        'Foneutrismo: bloqueio anestésico local, analgesia; observar 6 h; soro antiaracnídico em moderado/grave (sudorese, vômitos, hipertensão, choque).',
        'Loxoscelismo: soro antiaracnídico ou antiloxoscélico se lesão precoce (< 72 h) ou hemólise; corticoide conforme protocolo; cuidados com a ferida.',
        'Latrodectismo: analgesia, benzodiazepínico para contraturas, soro antilatrodéctico se moderado/grave.',
        'Monitorar diurese, hemograma e função renal em loxoscelismo; notificar (SINAN).'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },
    {
      id: 'intoxicacao', nome: 'Intoxicação / exposição a tóxico', grupo: 'acidentes', icone: '☠️',
      perguntas: [
        'Substância (medicamento, agrotóxico, produto de limpeza, derivado de petróleo, planta, mercúrio, álcool)?',
        'Quantidade estimada, via e tempo desde a exposição?',
        'Sintomas iniciais e evolução?',
        'Acidental ou intencional? Vômito provocado?',
        'Uso de chás, plantas medicinais ou mandioca brava mal processada?',
        'Exposição ocupacional da família (garimpo, agricultura)?',
        'Embalagem disponível para identificação?'
      ],
      sintomasAssociados: sx(['vomitos', 'alteracao_consciencia', 'convulsao', 'sudorese', 'dispneia', 'diarreia', 'dor_abdominal', 'hipotonia', 'irritabilidade', 'fraqueza']),
      sinaisGravidade: ['alteracao_consciencia', 'convulsao', 'desconforto_respiratorio', 'hipoxemia', 'choque', 'hipoglicemia', 'apneia', 'cianose'],
      diferenciais: [
        { se: {}, hipoteses: [n('Intoxicação medicamentosa (paracetamol, ferro, anticonvulsivantes, antidepressivos)'), n('Produtos domésticos (cáusticos, hidrocarbonetos)'), n('Agrotóxicos (organofosforados, carbamatos, piretroides)'), n('Plantas tóxicas (mandioca brava, comigo-ninguém-pode, timbó)'), n('Metais (mercúrio no garimpo, chumbo)'), n('Álcool')] },
        { se: { sintomas: ['sudorese', 'diarreia'] }, hipoteses: [n('Síndrome colinérgica por organofosforado/carbamato', 'miose, sialorreia, broncorreia, bradicardia: atropina conforme protocolo')] },
        { se: { contexto: ['garimpo'] }, hipoteses: [n('Intoxicação por mercúrio (tremor, alteração neurológica, nefropatia)')] },
        { se: { contexto: ['rural', 'indigena', 'ribeirinha'] }, hipoteses: [n('Agrotóxicos'), n('Mandioca brava mal processada (cianeto): dispneia, convulsão, acidose'), n('Timbó / plantas ictiotóxicas')] },
        { se: { sintomas: ['alteracao_consciencia', 'hipoglicemia'] }, hipoteses: [n('Álcool ou hipoglicemiantes orais')] },
        { se: { sintomas: ['dispneia', 'vomitos'] }, hipoteses: [n('Aspiração de hidrocarboneto (querosene, gasolina): pneumonite química; não induzir vômito')] }
      ],
      exames: ['glicemia', 'gasometria', 'eletrolitos', 'ast', 'alt', 'creatinina', 'hemograma', 'radiografia_torax'],
      condutaInicial: [
        'ABCDE, glicemia capilar e monitorização; contatar centro de informação toxicológica (Disque-Intoxicação 0800 722 6001).',
        'Descontaminação conforme substância e tempo: carvão ativado em até 1–2 h quando indicado; não induzir vômito; não usar carvão em cáusticos e hidrocarbonetos.',
        'Antídoto quando aplicável (atropina para organofosforados, N-acetilcisteína para paracetamol, hidroxocobalamina para cianeto) conforme protocolo.',
        'Retirar roupas contaminadas e lavar a pele em exposição dérmica a agrotóxicos.',
        'Observar por período mínimo conforme substância; avaliar contexto de negligência ou intenção suicida em adolescentes.'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },
    {
      id: 'trauma', nome: 'Trauma', grupo: 'acidentes', icone: '🚑',
      perguntas: [
        'Mecanismo (queda, acidente de moto/barco, atropelamento, afogamento, queimadura, agressão)?',
        'Altura da queda, velocidade, uso de capacete/colete?',
        'Perda de consciência, vômitos, convulsão ou sonolência após o trauma?',
        'Sangramento, deformidade, dor cervical?',
        'Tempo desde o evento?',
        'História compatível com as lesões (suspeita de maus-tratos)?',
        'Vacinação antitetânica em dia?'
      ],
      sintomasAssociados: sx(['alteracao_consciencia', 'vomitos', 'cefaleia', 'convulsao', 'sangramento', 'dor_local', 'dispneia', 'palidez', 'dor_abdominal', 'dor_toracica']),
      sinaisGravidade: ['choque', 'alteracao_consciencia', 'sangramento_importante', 'desconforto_respiratorio', 'hipoxemia', 'convulsao', 'hipotensao', 'cianose'],
      diferenciais: [
        { se: {}, hipoteses: [n('Traumatismo cranioencefálico'), n('Trauma abdominal ou torácico'), n('Fratura / luxação'), n('Afogamento (rios, igarapés)'), n('Queimadura'), n('Maus-tratos / violência')] },
        { se: { sintomas: ['alteracao_consciencia', 'vomitos'] }, hipoteses: [n('TCE com risco de lesão intracraniana', 'critérios PECARN para tomografia; observar 6–24 h')] },
        { se: { sintomas: ['dor_abdominal', 'palidez'] }, hipoteses: [n('Trauma abdominal com hemorragia interna (baço, fígado)')] },
        { se: { contexto: ['agua_rio', 'ribeirinha', 'agua'] }, hipoteses: [n('Afogamento: hipoxemia, aspiração, hipotermia; observar 6–8 h mesmo se assintomático')] },
        { se: { sintomas: ['dispneia', 'dor_toracica'] }, hipoteses: [n('Pneumotórax / contusão pulmonar / fratura de costela')] },
        { se: { sintomas: ['feridas'], contexto: ['animais'] }, hipoteses: [n('Ferida contaminada: profilaxia antitetânica e antirrábica conforme caso')] }
      ],
      exames: ['hemograma', 'gasometria', 'radiografia_torax', 'glicemia', 'ast', 'alt', 'urina_1'],
      condutaInicial: [
        'ABCDE com estabilização cervical se mecanismo de risco; O2; controle de hemorragia; acesso venoso e cristaloide se choque.',
        'Avaliar Glasgow pediátrico, pupilas e sinais de fratura de base de crânio; aplicar critérios de imagem para TCE.',
        'Analgesia adequada; imobilizar fraturas; curativo e profilaxia antitetânica.',
        'Suspeita de maus-tratos (lesões incompatíveis, múltiplas idades, atraso na busca de cuidado): notificar Conselho Tutelar e registrar.',
        'Transferir para referência em trauma se instabilidade, TCE moderado/grave ou lesões múltiplas.'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },

    // -------------------------------------------------------------- NEONATAL
    {
      id: 'rn_febre', nome: 'Recém-nascido com febre', grupo: 'neonatal', icone: '👶',
      perguntas: [
        'Idade em dias? Temperatura axilar medida (>= 37,8 °C) ou hipotermia (< 36 °C)?',
        'Peso ao nascer e idade gestacional?',
        'Parto (domiciliar? bolsa rota > 18 h? febre materna? ITU materna? Estreptococo B?)',
        'Mama bem? Gemência, apneia, cianose, hipotonia?',
        'Icterícia, vômitos, distensão abdominal?',
        'Coto umbilical com hiperemia, secreção ou mau cheiro?',
        'Lesões de pele, conjuntivite? Contato com pessoas doentes?',
        'Mãe teve malária na gestação?'
      ],
      sintomasAssociados: sx(['recusa_alimentar', 'irritabilidade', 'hipotonia', 'apatia', 'gemencia', 'taquipneia', 'ictericia', 'vomitos', 'diarreia', 'lesoes_pele']),
      sinaisGravidade: ['lactente_jovem_febre', 'sepse', 'letargia', 'apneia', 'cianose', 'hipoglicemia', 'convulsao', 'desconforto_respiratorio', 'ma_perfusao'],
      diferenciais: [
        { se: {}, hipoteses: [d('sepse', 'sepse neonatal precoce ou tardia'), d('meningite'), d('infeccao_urinaria'), n('Infecção viral (enterovírus, herpes simples, VSR)'), n('Hipertermia por excesso de agasalho / desidratação hipernatrêmica'), n('Onfalite')] },
        { se: { contexto: ['rural', 'ribeirinha', 'indigena', 'malaria_previa'] }, hipoteses: [d('sepse', 'parto domiciliar: maior risco de sepse e onfalite'), n('Tétano neonatal (trismo, rigidez, dificuldade de sugar)'), d('malaria', 'malária congênita se mãe com malária na gestação: gota espessa do RN')] },
        { se: { sintomas: ['ictericia'] }, hipoteses: [d('sepse'), d('infeccao_urinaria')] },
        { se: { sintomas: ['convulsao'] }, hipoteses: [d('meningite'), n('Encefalite herpética'), n('Hipoglicemia / hipocalcemia')] },
        { se: { sintomas: ['lesoes_pele'] }, hipoteses: [n('Herpes simples neonatal (vesículas)'), d('escabiose_impetigo', 'impetigo bolhoso neonatal')] },
        { se: { contexto: ['contato_infeccioso'] }, hipoteses: [n('Infecção viral adquirida no domicílio (VSR, enterovírus)')] }
      ],
      exames: ['hemograma', 'pcr', 'hemocultura', 'urina_1', 'urocultura', 'liquor', 'glicemia', 'bilirrubinas', 'gota_espessa', 'radiografia_torax'],
      condutaInicial: [
        'Todo RN (< 28 dias) com febre: internar, coletar hemocultura, urocultura, líquor e iniciar antibiótico empírico (ampicilina + gentamicina ou cefotaxima).',
        'Glicemia capilar, avaliação de perfusão, SpO2 e FR; O2 e suporte se necessário.',
        'Manter aleitamento ou dieta por sonda se não mamar; controlar temperatura (evitar hipertermia ambiental).',
        'Considerar aciclovir se vesículas, convulsão ou líquor com pleocitose sem bactérias.',
        'Gota espessa no RN se mãe com malária na gestação ou área de alta transmissão.',
        'Transferir para unidade neonatal se sinais de gravidade.'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },
    {
      id: 'rn_ictericia', nome: 'Recém-nascido com icterícia', grupo: 'neonatal', icone: '🟡',
      perguntas: [
        'Idade em horas/dias no início (< 24 h é sempre patológica)?',
        'Tipo sanguíneo da mãe e do RN? Coombs?',
        'Prematuridade, céfalo-hematoma, equimoses?',
        'Aleitamento (frequência, pega) e perda de peso (> 10%)?',
        'Cor das fezes (acolia) e urina (colúria)?',
        'Icterícia com mais de 14 dias?',
        'Letargia, hipotonia, choro agudo, recusa alimentar?',
        'Irmão com icterícia/fototerapia? História familiar de G6PD ou esferocitose?'
      ],
      sintomasAssociados: sx(['ictericia', 'recusa_alimentar', 'hipotonia', 'apatia', 'irritabilidade', 'febre', 'vomitos', 'hepatomegalia', 'palidez', 'distensao_abdominal']),
      sinaisGravidade: ['ictericia_intensa', 'letargia', 'sepse', 'hipoglicemia', 'apneia', 'convulsao'],
      diferenciais: [
        { se: {}, hipoteses: [n('Icterícia fisiológica'), n('Icterícia do aleitamento materno (baixa ingesta) / do leite materno'), n('Doença hemolítica (incompatibilidade ABO/Rh)'), n('Deficiência de G6PD'), n('Sepse neonatal'), n('Hipotireoidismo congênito'), n('Colestase / atresia de vias biliares')] },
        { se: { sintomas: ['palidez'] }, hipoteses: [n('Doença hemolítica (ABO, Rh, G6PD, esferocitose)', 'início < 24 h; risco de exsanguineotransfusão')] },
        { se: { sintomas: ['febre', 'recusa_alimentar'] }, hipoteses: [d('sepse'), d('infeccao_urinaria')] },
        { se: { sintomas: ['hepatomegalia'] }, hipoteses: [n('Colestase neonatal / atresia de vias biliares (acolia: urgência cirúrgica até 60 dias)'), n('Infecção congênita (TORCH)')] },
        { se: { contexto: ['malaria_previa', 'rural', 'ribeirinha'] }, hipoteses: [d('malaria', 'malária congênita: icterícia, anemia, esplenomegalia'), d('sepse', 'parto domiciliar')] },
        { se: { sintomas: ['hipotonia', 'apatia'] }, hipoteses: [n('Encefalopatia bilirrubínica aguda: emergência'), d('sepse'), n('Hipotireoidismo congênito')] }
      ],
      exames: ['bilirrubinas', 'hemograma', 'glicemia', 'hemocultura', 'urina_1', 'urocultura', 'ast', 'alt', 'gota_espessa'],
      condutaInicial: [
        'Avaliar extensão (zonas de Kramer) e dosar bilirrubina total e frações; interpretar pelo nomograma de horas de vida e fatores de risco.',
        'Tipagem sanguínea, Coombs direto, hematócrito e reticulócitos; G6PD quando disponível.',
        'Fototerapia conforme curvas; exsanguineotransfusão se níveis críticos ou sinais de encefalopatia; transferir se necessário.',
        'Reforçar aleitamento frequente (8–12 mamadas/dia) e verificar ganho de peso; evitar suspender o leite materno.',
        'Icterícia > 14 dias ou bilirrubina direta elevada/acolia: investigar colestase com urgência.',
        'Sinais de infecção: triagem de sepse e antibiótico.'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },
    {
      id: 'rn_dificuldade_alimentacao', nome: 'Recém-nascido que mama mal', grupo: 'neonatal', icone: '🍼',
      perguntas: [
        'Idade em dias? Peso ao nascer e peso atual (perda > 7–10% ou ganho < 20 g/dia)?',
        'Frequência e duração das mamadas? Pega e sucção efetivas?',
        'Vômitos (biliosos?) ou regurgitação? Distensão abdominal?',
        'Diurese (>= 6 fraldas/dia após o 5º dia) e evacuações?',
        'Sonolência, hipotonia, cianose ou suor ao mamar?',
        'Febre ou hipotermia?',
        'Trismo, rigidez, choro contínuo (tétano neonatal)?',
        'Parto domiciliar? Mãe com dificuldade de amamentar ou pouco leite?'
      ],
      sintomasAssociados: sx(['recusa_alimentar', 'vomitos', 'hipotonia', 'apatia', 'irritabilidade', 'ictericia', 'taquipneia', 'sudorese', 'distensao_abdominal', 'reducao_diurese']),
      sinaisGravidade: ['letargia', 'hipoglicemia', 'sepse', 'desidratacao_grave', 'cianose', 'apneia', 'desconforto_respiratorio', 'lactente_jovem_febre'],
      diferenciais: [
        { se: {}, hipoteses: [n('Dificuldade de pega / técnica de amamentação'), d('sepse', 'sepse neonatal: mamar mal é sinal precoce'), n('Desidratação hipernatrêmica'), n('Hipoglicemia'), n('Cardiopatia congênita'), n('Hipotireoidismo congênito'), n('Erro inato do metabolismo'), n('Obstrução intestinal (vômito bilioso)')] },
        { se: { sintomas: ['hipotonia', 'apatia'] }, hipoteses: [d('sepse'), n('Hipoglicemia'), n('Hipotireoidismo congênito'), d('meningite')] },
        { se: { sintomas: ['sudorese', 'taquipneia'] }, hipoteses: [n('Cardiopatia congênita / insuficiência cardíaca')] },
        { se: { sintomas: ['vomitos', 'distensao_abdominal'] }, hipoteses: [n('Obstrução intestinal / enterocolite necrosante'), n('Estenose hipertrófica do piloro (2–8 semanas)')] },
        { se: { sintomas: ['reducao_diurese'] }, hipoteses: [n('Desidratação por baixa ingesta / hipernatremia')] },
        { se: { contexto: ['rural', 'indigena', 'ribeirinha'] }, hipoteses: [d('sepse', 'parto domiciliar'), n('Tétano neonatal (dificuldade de sugar + trismo + rigidez): notificação imediata')] }
      ],
      exames: ['glicemia', 'eletrolitos', 'hemograma', 'pcr', 'hemocultura', 'bilirrubinas', 'urina_1'],
      condutaInicial: [
        'Observar uma mamada (pega, posição, sucção, deglutição) e pesar antes e depois; corrigir técnica.',
        'Glicemia capilar; avaliar hidratação, perfusão, tônus, temperatura e SpO2.',
        'Perda de peso > 10%, sonolência ou sinais de desidratação: complementar com leite ordenhado por copo/sonda e reavaliar em 24 h; hidratação venosa se grave.',
        'Qualquer sinal de infecção (hipotermia, febre, letargia, apneia): triagem de sepse e antibiótico empírico.',
        'Vômito bilioso ou distensão: jejum, sonda gástrica e avaliação cirúrgica.',
        'Encaminhar para banco de leite/atenção básica para apoio à amamentação.'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },
    {
      id: 'rn_desconforto_respiratorio', nome: 'Recém-nascido com desconforto respiratório', grupo: 'neonatal', icone: '🫁',
      perguntas: [
        'Idade em horas/dias? Início (ao nascer ou tardio)?',
        'Prematuridade, cesárea sem trabalho de parto, líquido meconial, asfixia?',
        'FR > 60 irpm, gemência, tiragem, batimento de asa nasal, cianose?',
        'Febre materna, bolsa rota > 18 h, corioamnionite?',
        'Mama bem? Febre ou hipotermia?',
        'Tosse, coriza, contato com pessoas com sintomas respiratórios?',
        'Apneia? Sopro cardíaco ou cianose que não melhora com O2?'
      ],
      sintomasAssociados: sx(['taquipneia', 'tiragem', 'gemencia', 'tosse', 'coriza', 'febre', 'recusa_alimentar', 'hipotonia', 'apatia', 'estridor']),
      sinaisGravidade: ['desconforto_respiratorio', 'hipoxemia', 'cianose', 'apneia', 'sepse', 'letargia', 'choque', 'hipoglicemia'],
      diferenciais: [
        { se: {}, hipoteses: [n('Taquipneia transitória do RN'), n('Síndrome do desconforto respiratório (prematuro)'), n('Pneumonia / sepse neonatal'), n('Síndrome de aspiração meconial'), n('Cardiopatia congênita'), n('Pneumotórax'), d('bronquiolite', 'período neonatal tardio')] },
        { se: { sintomas: ['febre', 'recusa_alimentar'] }, hipoteses: [d('sepse'), d('pneumonia')] },
        { se: { sintomas: ['coriza', 'tosse'] }, hipoteses: [d('bronquiolite', 'risco de apneia em < 2 meses'), n('Coqueluche (contato com adulto com tosse prolongada)')] },
        { se: { sintomas: ['estridor'] }, hipoteses: [n('Laringomalácia / obstrução de via aérea superior'), n('Atresia de coanas (cianose que melhora ao chorar)')] },
        { se: { contexto: ['rural', 'ribeirinha', 'indigena'] }, hipoteses: [d('sepse', 'parto domiciliar sem assistência'), d('pneumonia')] },
        { se: { contexto: ['contato_infeccioso'] }, hipoteses: [d('bronquiolite'), n('Coqueluche'), n('Influenza')] }
      ],
      exames: ['radiografia_torax', 'gasometria', 'hemograma', 'pcr', 'hemocultura', 'glicemia'],
      condutaInicial: [
        'Avaliar FR, tiragem, gemência, SpO2 pré e pós-ductal e perfusão; escore de Silverman-Andersen.',
        'O2 para SpO2 alvo 90–95%; CPAP nasal precoce se tiragem/gemência; intubar se apneia ou falência.',
        'Manter temperatura, glicemia e jejum com hidratação venosa enquanto instável.',
        'Fatores de risco infeccioso ou início tardio: hemocultura e antibiótico empírico (ampicilina + gentamicina).',
        'Cianose que não melhora com O2: considerar cardiopatia dependente de canal e contatar referência.',
        'Transferir para UTI neonatal se necessidade de suporte ventilatório.'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },

    // ------------------------------------------------------------------ PELE
    {
      id: 'lesoes_pele', nome: 'Lesões de pele', grupo: 'pele', icone: '🟤',
      perguntas: [
        'Tipo de lesão (mácula, pápula, vesícula, pústula, placa, úlcera, nódulo)?',
        'Localização, distribuição e tempo de evolução?',
        'Prurido? Dor? Perda de sensibilidade na lesão?',
        'Febre ou sintomas sistêmicos?',
        'Outros casos na casa ou escola?',
        'Contato com mata, água de rio ou animais?',
        'Uso de medicamentos ou produtos tópicos?',
        'Vacinação (varicela, tríplice viral) em dia?'
      ],
      sintomasAssociados: sx(['prurido', 'febre', 'exantema', 'ulcera_cutanea', 'lesao_hipocromica', 'alteracao_sensibilidade', 'feridas', 'linfonodomegalia', 'dor_local', 'edema']),
      sinaisGravidade: ['sepse', 'anafilaxia', 'petequias_purpura', 'ma_perfusao'],
      diferenciais: [
        { se: {}, hipoteses: [d('escabiose_impetigo'), n('Dermatite atópica'), n('Micoses superficiais (tinha, pitiríase versicolor)'), n('Miliária'), n('Larva migrans cutânea'), n('Tungíase (bicho-de-pé)'), n('Prurigo estrófulo (picadas de inseto)'), n('Celulite / erisipela / abscesso')] },
        { se: { sintomas: ['lesao_hipocromica'] }, hipoteses: [d('hanseniase', 'mancha com alteração de sensibilidade: testar sensibilidade térmica, dolorosa e tátil'), n('Pitiríase versicolor'), n('Pitiríase alba'), n('Vitiligo')] },
        { se: { sintomas: ['alteracao_sensibilidade'] }, hipoteses: [d('hanseniase', 'examinar nervos periféricos; notificar; investigar contatos')] },
        { se: { sintomas: ['ulcera_cutanea'], contexto: ['mata', 'rural', 'garimpo', 'ribeirinha'] }, hipoteses: [d('leishmaniose_tegumentar', 'úlcera indolor com bordas elevadas e fundo granuloso'), n('Esporotricose'), n('Úlcera tropical / ectima')] },
        { se: { sintomas: ['prurido'], contexto: ['contato_infeccioso'] }, hipoteses: [d('escabiose_impetigo', 'prurido noturno, lesões interdigitais, axilas e genitais; tratar contatos')] },
        { se: { sintomas: ['febre', 'exantema'] }, hipoteses: [d('dengue'), d('zika'), d('chikungunya'), n('Sarampo'), n('Varicela'), n('Escarlatina')] }
      ],
      exames: ['hemograma', 'baciloscopia'],
      condutaInicial: [
        'Examinar toda a pele, couro cabeludo, unhas e mucosas; testar sensibilidade em manchas hipocrômicas.',
        'Escabiose: permetrina 5% em toda a família e contatos; tratar impetigo com antibiótico tópico ou sistêmico conforme extensão.',
        'Úlcera crônica em área endêmica: encaminhar para investigação de leishmaniose tegumentar (exame direto, PCR) antes de tratar.',
        'Suspeita de hanseníase: encaminhar para confirmação e tratamento com PQT; notificar e avaliar contatos.',
        'Orientar higiene, corte de unhas e observação de sinais de infecção secundária.'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },
    {
      id: 'prurido', nome: 'Prurido (coceira)', grupo: 'pele', icone: '🐛',
      perguntas: [
        'Localizado ou generalizado? Piora à noite?',
        'Lesões de pele visíveis (pápulas, escoriações, túneis, placas)?',
        'Outras pessoas da casa com coceira?',
        'Prurido anal ou vulvar noturno (oxiuríase)?',
        'Icterícia ou urina escura (colestase)?',
        'Uso de medicamentos novos, alimentos, contato com plantas?',
        'Atopia (asma, rinite, dermatite) pessoal ou familiar?'
      ],
      sintomasAssociados: sx(['lesoes_pele', 'exantema', 'prurido', 'ictericia', 'feridas', 'febre', 'coriza', 'sibilancia', 'dor_local', 'palidez']),
      sinaisGravidade: ['anafilaxia', 'desconforto_respiratorio', 'ictericia_intensa'],
      diferenciais: [
        { se: {}, hipoteses: [d('escabiose_impetigo'), n('Dermatite atópica'), n('Urticária'), n('Prurigo estrófulo'), n('Pediculose'), n('Larva migrans cutânea'), n('Dermatite de contato')] },
        { se: { sintomas: ['lesoes_pele'], contexto: ['contato_infeccioso'] }, hipoteses: [d('escabiose_impetigo', 'tratar todos os contatos ao mesmo tempo')] },
        { se: { sintomas: ['ictericia'] }, hipoteses: [n('Colestase (hepatite, atresia de vias biliares)')] },
        { se: { sintomas: ['exantema', 'febre'] }, hipoteses: [d('zika', 'prurido intenso é característico'), d('dengue'), d('chikungunya'), n('Varicela')] },
        { se: { contexto: ['rural', 'agua_nao_tratada', 'ribeirinha'] }, hipoteses: [d('parasitoses_intestinais', 'oxiuríase: prurido anal noturno; estrongiloidíase: larva currens'), n('Larva migrans cutânea')] },
        { se: { sintomas: ['sibilancia'] }, hipoteses: [n('Anafilaxia (urticária + broncoespasmo)')] }
      ],
      exames: ['hemograma', 'exame_parasitologico_fezes', 'bilirrubinas'],
      condutaInicial: [
        'Examinar pele completa, espaços interdigitais, punhos, axilas, genitais e couro cabeludo.',
        'Escabiose provável: permetrina 5% (ou ivermectina > 15 kg) para paciente e contatos; lavar roupas e roupas de cama.',
        'Anti-histamínico oral para alívio; hidratação da pele em dermatite atópica; evitar corticoide sistêmico de rotina.',
        'Prurido anal noturno: considerar tratamento para oxiuríase (albendazol ou mebendazol) para a família.',
        'Prurido generalizado sem lesão: investigar colestase, insuficiência renal e causas sistêmicas.'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    },
    {
      id: 'feridas', nome: 'Feridas / úlceras', grupo: 'pele', icone: '🩹',
      perguntas: [
        'Tempo de evolução? Mecanismo (trauma, picada, coçadura, espontânea)?',
        'Dor ou indolor? Bordas elevadas, fundo granuloso (leishmaniose)?',
        'Secreção purulenta, mau cheiro, crostas melicéricas?',
        'Febre, edema ou vermelhidão ao redor?',
        'Perda de sensibilidade na área?',
        'Vacinação antitetânica em dia?',
        'Contato com mata, água de rio ou animais?',
        'Presença de larvas (miíase) ou pontos negros nos pés (tungíase)?'
      ],
      sintomasAssociados: sx(['febre', 'dor_local', 'ulcera_cutanea', 'edema', 'linfonodomegalia', 'prurido', 'lesoes_pele', 'alteracao_sensibilidade', 'feridas', 'sangramento']),
      sinaisGravidade: ['sepse', 'ma_perfusao', 'choque', 'letargia', 'anafilaxia'],
      diferenciais: [
        { se: {}, hipoteses: [d('escabiose_impetigo', 'impetigo / ectima'), n('Ferida traumática infectada / celulite'), n('Abscesso'), d('leishmaniose_tegumentar'), n('Miíase (berne)'), n('Tungíase')] },
        { se: { sintomas: ['ulcera_cutanea'], contexto: ['mata', 'rural', 'garimpo', 'ribeirinha', 'indigena'] }, hipoteses: [d('leishmaniose_tegumentar', 'úlcera indolor > 2 semanas em área exposta: investigar antes de antibiótico prolongado'), n('Esporotricose'), n('Úlcera tropical')] },
        { se: { contexto: ['mordedura', 'animais'] }, hipoteses: [n('Ferida por mordedura: risco de raiva e tétano'), d('acidente_ofidico', 'necrose local no botrópico')] },
        { se: { sintomas: ['alteracao_sensibilidade'] }, hipoteses: [d('hanseniase', 'úlcera plantar neuropática')] },
        { se: { sintomas: ['febre', 'edema'] }, hipoteses: [n('Celulite / erisipela'), n('Fasciíte necrosante (dor desproporcional, toxemia)'), d('sepse')] },
        { se: { contexto: ['agua_rio', 'ribeirinha', 'enchente'] }, hipoteses: [n('Infecção de ferida por bactérias aquáticas (Aeromonas)'), n('Tungíase'), n('Miíase')] }
      ],
      exames: ['hemograma', 'pcr', 'baciloscopia'],
      condutaInicial: [
        'Limpar com água e sabão ou soro fisiológico; desbridar tecido desvitalizado; curativo adequado.',
        'Impetigo: antibiótico tópico (mupirocina) se localizado ou cefalexina/amoxicilina se extenso; tratar escabiose associada.',
        'Celulite com febre ou toxemia: antibiótico sistêmico e reavaliação em 48 h; internar se sinais de gravidade.',
        'Úlcera crônica em área endêmica: coletar exame direto/biópsia para leishmaniose antes de tratamento empírico prolongado.',
        'Profilaxia antitetânica conforme histórico; remover larvas (miíase) e pulgas (tungíase) e tratar infecção secundária.'
      ],
      fontes: FONTES, atualizadoEm: ATUAL
    }
  ];
})();
