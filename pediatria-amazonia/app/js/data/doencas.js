// Base de doenças – apoio à decisão em pediatria (ênfase Amazonas)
// Contrato: app/js/data/CONTRATO.md (PED.data.doencas)
// Conteúdo de apoio à decisão clínica. Confirmar sempre conforme protocolo vigente e bula.
window.PED = window.PED || {}; PED.data = PED.data || {};
PED.data.doencas = [
  // =====================================================================
  // AMAZÔNIA
  // =====================================================================
  {
    id: 'malaria',
    nome: 'Malária (P. vivax e P. falciparum)',
    categoria: 'amazonia',
    amazonia: true,
    cid10: 'B54',
    tags: ['febre', 'calafrios', 'sudorese', 'cefaleia', 'mialgia', 'palidez', 'ictericia', 'esplenomegalia', 'hepatomegalia', 'vomitos', 'fraqueza', 'alteracao_consciencia', 'convulsao', 'reducao_diurese'],
    definicao: 'Doença febril aguda causada por protozoários do gênero Plasmodium, transmitida pela picada da fêmea do mosquito Anopheles. No Brasil, P. vivax e P. falciparum são responsáveis por quase todos os casos. Em crianças a evolução para formas graves pode ser rápida, especialmente por P. falciparum, mas P. vivax também causa malária grave em menores de 5 anos.',
    epidemiologia: 'Cerca de 99% dos casos do Brasil ocorrem na Amazônia Legal, e o Amazonas concentra a maior parte deles. P. vivax responde por aproximadamente 80 a 85% dos casos. Municípios com maior transmissão incluem Manaus (zona rural e periurbana), Barcelos, São Gabriel da Cachoeira, Santa Isabel do Rio Negro, Tapauá, Lábrea, Atalaia do Norte, Coari, Presidente Figueiredo, Rio Preto da Eva e Careiro. Grupos mais expostos: populações ribeirinhas, indígenas (Terra Yanomami e Alto Rio Negro), garimpeiros, assentados e moradores de áreas periurbanas com igarapés. A transmissão ocorre o ano todo, com aumento na transição entre a cheia e a vazante dos rios. Toda criança com febre em área endêmica deve ter gota espessa ou teste rápido colhidos.',
    agente: 'Plasmodium vivax (predominante), Plasmodium falciparum e, raramente, Plasmodium malariae. Infecções mistas ocorrem.',
    transmissao: 'Picada da fêmea do mosquito Anopheles (principalmente Anopheles darlingi), com maior atividade ao entardecer e amanhecer. Transmissão congênita e por transfusão são raras.',
    incubacao: 'P. falciparum: 8 a 12 dias. P. vivax: 13 a 17 dias (recaídas por hipnozoítos podem ocorrer semanas a meses depois). P. malariae: 18 a 30 dias.',
    manifestacoes: [
      'Febre alta, muitas vezes irregular ou contínua em crianças (o padrão terçã clássico nem sempre está presente).',
      'Calafrios e sudorese profusa após o pico febril.',
      'Cefaleia, mialgia, prostração, inapetência e irritabilidade.',
      'Vômitos, dor abdominal e diarreia, comuns em lactentes e pré-escolares.',
      'Palidez (anemia), icterícia leve e esplenomegalia após alguns dias de evolução.',
      'Hepatomegalia dolorosa em parte dos casos.',
      'Lactentes podem apresentar apenas febre, recusa alimentar, gemência e hipoatividade.'
    ],
    sinaisAlarme: [
      'Prostração intensa, incapacidade de sentar, ficar em pé ou mamar.',
      'Alteração do nível de consciência, sonolência excessiva ou convulsões.',
      'Dispneia, taquipneia ou sinais de edema pulmonar.',
      'Icterícia evidente, urina escura (hemoglobinúria) ou oligúria.',
      'Sangramentos espontâneos, petéquias ou epistaxe.',
      'Palidez intensa (Hb menor que 7 g/dL) ou choque (extremidades frias, enchimento capilar lento, hipotensão).',
      'Vômitos persistentes com impossibilidade de tomar a medicação oral.',
      'Hipoglicemia (glicemia menor que 40 mg/dL) e hiperparasitemia.'
    ],
    diagnosticoDiferencial: ['dengue', 'leptospirose', 'febre_amarela', 'oropouche', 'sepse', 'infeccao_urinaria', 'pneumonia', 'leishmaniose_visceral', 'hepatites virais', 'febre tifoide'],
    exames: ['gota_espessa', 'teste_rapido_malaria', 'hemograma', 'glicemia', 'bilirrubinas', 'ast', 'alt', 'ureia', 'creatinina', 'gasometria', 'lactato', 'urina_1', 'eletrolitos'],
    criteriosDiagnosticos: [
      'Febre ou história de febre em pessoa residente ou procedente de área de transmissão: solicitar gota espessa ou teste rápido em todos os casos.',
      'Gota espessa positiva (padrão ouro): identifica espécie, estágio e densidade parasitária (cruzes ou parasitos por microlitro).',
      'Teste rápido imunocromatográfico positivo em locais sem microscopia; a espécie e a parasitemia devem ser confirmadas por gota espessa sempre que possível.',
      'Gota espessa negativa não exclui malária em paciente muito sintomático: repetir a cada 12 a 24 horas por até 3 coletas.',
      'Notificação compulsória obrigatória (SIVEP-Malária) de todo caso confirmado.'
    ],
    classificacaoGravidade: [
      { nivel: 'Malária não complicada', criterios: 'Febre e sintomas gerais sem nenhum critério de gravidade, tolera medicação oral, sem disfunção orgânica, parasitemia baixa a moderada. Tratamento ambulatorial com dose supervisionada sempre que possível.' },
      { nivel: 'Malária com sinais de alerta', criterios: 'Vômitos repetidos, prostração, parasitemia elevada, anemia moderada (Hb 7 a 9 g/dL), lactente menor de 1 ano, desnutrição, coinfecção ou impossibilidade de retorno em 48 horas. Avaliar observação ou internação e considerar tratamento com supervisão.' },
      { nivel: 'Malária grave', criterios: 'Qualquer um: alteração de consciência ou coma, convulsões repetidas, prostração extrema, dispneia ou edema pulmonar, choque, icterícia com disfunção orgânica, sangramento espontâneo, anemia grave (Hb menor que 5 g/dL ou Ht menor que 15% em crianças), hipoglicemia (menor que 40 mg/dL), acidose metabólica, insuficiência renal aguda, hemoglobinúria ou hiperparasitemia conforme critério do guia do MS. Exige artesunato parenteral e internação, preferencialmente em UTI.' }
    ],
    tratamento: [
      'Confirmar espécie e parasitemia; iniciar tratamento no mesmo dia do diagnóstico. Registrar peso exato para cálculo de doses.',
      'P. vivax (ou P. ovale) em criança sem contraindicação: cloroquina por 3 dias (dose total 25 mg/kg de base: 10 mg/kg no dia 1 e 7,5 mg/kg nos dias 2 e 3) associada a primaquina 0,5 mg/kg/dia por 7 dias (esquema curto do MS 2021) ou 0,25 mg/kg/dia por 14 dias. Confirmar as tabelas por peso do guia do MS.',
      'Primaquina é contraindicada em menores de 6 meses, gestantes e lactantes de bebês menores de 6 meses (usar apenas cloroquina e, nas gestantes, profilaxia semanal com cloroquina conforme protocolo). Sempre que disponível, realizar teste de G6PD antes da primaquina; em deficiência de G6PD, usar o esquema semanal supervisionado (0,75 mg/kg uma vez por semana por 8 semanas) conforme protocolo do MS.',
      'P. falciparum ou infecção mista (falciparum + vivax) não complicada: artemeter + lumefantrina por 3 dias (6 doses, às 0, 8, 24, 36, 48 e 60 horas), em comprimidos por faixa de peso conforme tabela do MS, administrado com alimento. Associar primaquina em dose única de 0,5 mg/kg no dia 1 como gametocitocida (exceto menores de 6 meses e gestantes). Na infecção mista, completar primaquina por 7 dias (0,5 mg/kg/dia). Alternativa: artesunato + mefloquina, conforme disponibilidade e protocolo.',
      'Malária grave (qualquer espécie): artesunato IV 2,4 mg/kg nas horas 0, 12 e 24 e depois a cada 24 horas (crianças com menos de 20 kg: 3 mg/kg por dose, conforme OMS/MS) por no mínimo 24 horas e até tolerar via oral; em seguida completar com artemeter + lumefantrina por 3 dias (e primaquina conforme espécie). Confirmar diluição e dose conforme protocolo e bula.',
      'Se artesunato IV indisponível, iniciar o tratamento oral (artemeter + lumefantrina) enquanto se providencia a transferência; não atrasar o tratamento.',
      'Medidas de suporte na malária grave: corrigir hipoglicemia (glicose 10% 2 a 5 mL/kg IV), tratar convulsões (diazepam ou midazolam), transfundir concentrado de hemácias em anemia grave sintomática, cautela com fluidos (risco de edema pulmonar), antitérmico (paracetamol ou dipirona) e antibiótico de amplo espectro (ceftriaxona) se houver suspeita de sepse bacteriana associada.',
      'P. malariae: cloroquina por 3 dias, sem primaquina.',
      'Controle de cura (lâmina de verificação de cura): para P. falciparum nos dias 3, 7, 14, 21, 28 e 42; para P. vivax nos dias 3, 7, 14, 21, 28, 42 e 63, ou conforme rotina do serviço.',
      'Investigar e tratar coinfecções e anemia; iniciar sulfato ferroso somente após controle da parasitemia.'
    ],
    medicamentos: [
      { medId: 'cloroquina', esquema: 'P. vivax/malariae: dose total 25 mg/kg de base em 3 dias (10 mg/kg no D1, 7,5 mg/kg no D2 e D3), VO, conforme tabela por peso do MS 2021.' },
      { medId: 'primaquina', esquema: 'P. vivax: 0,5 mg/kg/dia por 7 dias (ou 0,25 mg/kg/dia por 14 dias). P. falciparum: 0,5 mg/kg em dose única no D1. Contraindicada em menores de 6 meses e gestantes; avaliar G6PD. Dose máxima diária 30 mg de base.' },
      { medId: 'artemeter_lumefantrina', esquema: 'P. falciparum ou mista: comprimidos 20/120 mg por faixa de peso (5 a 14 kg: 1 comprimido; 15 a 24 kg: 2; 25 a 34 kg: 3; 35 kg ou mais: 4) por dose, 6 doses em 3 dias (0, 8, 24, 36, 48 e 60 h), com alimento. Existe apresentação dispersível pediátrica. Confirmar conforme tabela do MS.' },
      { medId: 'artesunato', esquema: 'Malária grave: 2,4 mg/kg IV nas horas 0, 12 e 24 e depois 1 vez ao dia (3 mg/kg por dose em crianças com menos de 20 kg), mínimo 24 h, até tolerar VO; depois completar com artemeter + lumefantrina. Confirmar reconstituição conforme bula.' },
      { medId: 'glicose', esquema: 'Hipoglicemia: glicose 10% 2 a 5 mL/kg IV em bolus, seguida de manutenção com soro glicosado; controlar glicemia a cada 4 a 6 h na malária grave.' },
      { medId: 'paracetamol', esquema: 'Febre: 10 a 15 mg/kg/dose VO a cada 6 h (máximo 5 doses/dia), conforme bula.' },
      { medId: 'ceftriaxona', esquema: 'Suspeita de sepse bacteriana associada à malária grave: 80 a 100 mg/kg/dia IV, conforme protocolo.' }
    ],
    criteriosInternacao: [
      'Qualquer critério de malária grave.',
      'Vômitos persistentes ou impossibilidade de tomar a medicação oral.',
      'Lactentes menores de 1 ano, desnutridos, imunossuprimidos ou com comorbidades.',
      'Anemia moderada a grave (Hb menor que 7 g/dL) ou parasitemia elevada.',
      'Impossibilidade de retorno para reavaliação em 24 a 48 horas (comunidades distantes) ou falha terapêutica.'
    ],
    criteriosUTI: [
      'Coma, convulsões repetidas ou alteração persistente de consciência (malária cerebral).',
      'Choque, edema pulmonar ou necessidade de ventilação mecânica.',
      'Acidose metabólica grave, insuficiência renal aguda ou hemoglobinúria maciça.',
      'Sangramento grave ou coagulação intravascular disseminada.',
      'Hipoglicemia refratária ou hiperparasitemia com disfunção orgânica.'
    ],
    criteriosAlta: [
      'Afebril por pelo menos 24 a 48 horas, aceitando dieta e medicação oral.',
      'Melhora clínica e queda da parasitemia na lâmina de controle.',
      'Hemoglobina estável e sem sinais de disfunção orgânica.',
      'Responsável orientado sobre a continuidade do esquema (primaquina) e datas das lâminas de verificação de cura.'
    ],
    orientacoes: [
      'Dar toda a medicação nos dias e horários indicados, mesmo que a criança melhore, para evitar recaída.',
      'Oferecer a primaquina e a cloroquina junto com alimento para reduzir vômitos; se vomitar em menos de 30 minutos, repetir a dose e procurar a unidade.',
      'Observar urina escura, palidez, sonolência, dificuldade de respirar ou convulsão: procurar atendimento imediatamente.',
      'Retornar para as lâminas de verificação de cura nas datas marcadas.',
      'Usar mosquiteiro impregnado, roupas longas ao entardecer e telas nas casas.'
    ],
    retorno: 'Reavaliar em 24 a 48 horas (ou antes se piora) e nas lâminas de verificação de cura (dias 3, 7, 14, 21, 28 e 42; até dia 63 no P. vivax). Retorno imediato se sinais de alarme.',
    prevencao: [
      'Mosquiteiros impregnados com inseticida de longa duração, especialmente para crianças e gestantes.',
      'Borrifação intradomiciliar e controle de criadouros conforme programa municipal.',
      'Diagnóstico e tratamento precoces (busca ativa por microscopistas e agentes de saúde nas comunidades).',
      'Evitar exposição ao entardecer e amanhecer em áreas de mata e igarapés; roupas longas e repelentes adequados à idade.',
      'Tratamento completo com primaquina para reduzir recaídas de P. vivax e transmissão.'
    ],
    fontes: [
      { nome: 'Guia de Tratamento da Malária no Brasil – Ministério da Saúde', ano: 2021 },
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
      { nome: 'OMS – Guidelines for malaria', ano: 2023 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'dengue',
    nome: 'Dengue',
    categoria: 'amazonia',
    amazonia: true,
    cid10: 'A90',
    tags: ['febre', 'cefaleia', 'mialgia', 'artralgia', 'exantema', 'prurido', 'vomitos', 'dor_abdominal', 'sangramento', 'petequias', 'fraqueza', 'palidez', 'reducao_diurese', 'alteracao_consciencia', 'desidratacao'],
    definicao: 'Arbovirose febril aguda causada pelo vírus dengue (sorotipos DENV 1 a 4), de amplo espectro clínico, desde formas assintomáticas até choque e sangramento grave. Em crianças o quadro inicial pode ser inespecífico e a piora ocorre tipicamente na defervescência (entre o 3º e o 7º dia).',
    epidemiologia: 'Transmissão urbana intensa em Manaus e nos municípios do interior do Amazonas, com picos no período chuvoso (dezembro a maio). Circulação simultânea de vários sorotipos aumenta o risco de formas graves em infecção secundária. Lactentes menores de 2 anos, crianças com asma, diabetes, doença falciforme ou desnutrição pertencem ao grupo de risco. Em área de malária, sempre colher gota espessa junto com a investigação de dengue.',
    agente: 'Vírus dengue (Flavivirus), sorotipos DENV-1, DENV-2, DENV-3 e DENV-4.',
    transmissao: 'Picada da fêmea de Aedes aegypti (e Aedes albopictus) infectada. Sem transmissão pessoa a pessoa; transmissão vertical e transfusional são raras.',
    incubacao: '4 a 10 dias (média 5 a 6 dias).',
    manifestacoes: [
      'Febre alta de início súbito, com duração de 2 a 7 dias.',
      'Cefaleia, dor retro-orbitária, mialgia, artralgia e prostração.',
      'Exantema maculopapular, frequentemente pruriginoso, entre o 3º e o 6º dia.',
      'Náuseas, vômitos, dor abdominal e inapetência.',
      'Manifestações hemorrágicas leves: petéquias, epistaxe, gengivorragia, prova do laço positiva.',
      'Em lactentes: febre, irritabilidade, choro persistente, recusa alimentar e vômitos podem ser as únicas manifestações.',
      'Fase crítica na defervescência (3º ao 7º dia): extravasamento plasmático, hemoconcentração e plaquetopenia.'
    ],
    sinaisAlarme: [
      'Dor abdominal intensa (referida ou à palpação) e contínua.',
      'Vômitos persistentes.',
      'Acúmulo de líquidos: ascite, derrame pleural ou pericárdico.',
      'Sangramento de mucosas.',
      'Letargia ou irritabilidade.',
      'Hipotensão postural ou lipotimia.',
      'Hepatomegalia maior que 2 cm abaixo do rebordo costal.',
      'Aumento progressivo do hematócrito.'
    ],
    diagnosticoDiferencial: ['malaria', 'chikungunya', 'zika', 'oropouche', 'mayaro', 'febre_amarela', 'leptospirose', 'sepse', 'meningite', 'doenca_diarreica', 'sarampo e rubéola', 'infecção por parvovírus'],
    exames: ['hemograma', 'ns1_dengue', 'sorologia_dengue', 'rt_pcr_arboviroses', 'gota_espessa', 'ast', 'alt', 'albumina', 'coagulograma', 'ureia', 'creatinina', 'eletrolitos', 'radiografia_torax', 'ultrassonografia abdominal'],
    criteriosDiagnosticos: [
      'Caso suspeito: febre de 2 a 7 dias e duas ou mais das seguintes manifestações: náusea/vômitos, exantema, mialgia/artralgia, cefaleia/dor retro-orbitária, petéquias, prova do laço positiva ou leucopenia, em área com transmissão. Em crianças menores, febre sem foco em área de transmissão já justifica investigação.',
      'Confirmação laboratorial: NS1 ou RT-PCR até o 5º dia de sintomas; sorologia IgM a partir do 6º dia.',
      'Prova do laço: manguito insuflado na pressão arterial média por 3 minutos em crianças; positiva se 10 ou mais petéquias em um quadrado de 2,5 cm de lado (20 ou mais em adultos).',
      'Hemograma para estadiamento nos grupos B, C e D: hematócrito, plaquetas e leucócitos.',
      'Notificação compulsória de todo caso suspeito.'
    ],
    classificacaoGravidade: [
      { nivel: 'Grupo A', criterios: 'Sem sinais de alarme, sem sangramento espontâneo ou prova do laço positiva, sem condição especial ou de risco (lactente menor de 2 anos, gestante, comorbidade, vulnerabilidade social). Hidratação oral domiciliar e reavaliação.' },
      { nivel: 'Grupo B', criterios: 'Sem sinais de alarme, mas com sangramento espontâneo de pele (petéquias) ou prova do laço positiva, ou condição clínica especial, risco social ou comorbidade. Hemograma obrigatório e hidratação oral supervisionada na unidade até o resultado.' },
      { nivel: 'Grupo C', criterios: 'Presença de pelo menos um sinal de alarme, sem choque. Internação (leito de observação por no mínimo 48 h) com reposição volêmica IV imediata.' },
      { nivel: 'Grupo D', criterios: 'Dengue grave: choque (taquicardia, extremidades frias, enchimento capilar maior que 2 s, pulso fino, hipotensão ou pressão convergente), sangramento grave ou disfunção orgânica (miocardite, encefalite, hepatite com AST/ALT maior que 1000). Expansão rápida e UTI.' }
    ],
    tratamento: [
      'Grupo A: hidratação oral com SRO (um terço do volume) e líquidos caseiros (dois terços): 130 mL/kg/dia para menos de 10 kg, 100 mL/kg/dia de 10 a 20 kg e 80 mL/kg/dia acima de 20 kg, ou conforme protocolo do MS. Antitérmico e orientação sobre sinais de alarme com retorno diário ou no dia da defervescência.',
      'Grupo B: hemograma imediato e hidratação oral supervisionada como no grupo A enquanto aguarda o resultado. Hematócrito normal: manter conduta do grupo A com retorno em 24 horas. Hematócrito aumentado ou surgimento de sinal de alarme: tratar como grupo C.',
      'Grupo C: reposição volêmica imediata com soro fisiológico 0,9% 10 mL/kg na primeira hora, com reavaliação clínica e hematócrito ao final; se não houver melhora, repetir a expansão (até 3 vezes) e reclassificar; se melhora, iniciar fase de manutenção conforme protocolo do MS 2024 (confirmar volumes). Manter em leito de internação por no mínimo 48 horas.',
      'Grupo D: expansão rápida com soro fisiológico 0,9% 20 mL/kg em até 20 minutos, repetida até 3 vezes se necessário, com reavaliação a cada 15 a 30 minutos e hematócrito a cada 2 horas. Se persistir choque: avaliar hemorragia oculta, considerar albumina ou coloide, drogas vasoativas e transferência para UTI. Transfundir concentrado de hemácias se sangramento importante com queda de hematócrito.',
      'Sintomáticos: paracetamol (10 a 15 mg/kg/dose até 6/6 h) ou dipirona (conforme bula, acima de 3 meses). Contraindicados AAS, anti-inflamatórios não hormonais e corticoides pelo risco de sangramento.',
      'Prurido: banhos frios, loções e anti-histamínicos conforme idade.',
      'Não usar via intramuscular para medicações. Evitar hiper-hidratação após o fim da fase crítica (risco de edema pulmonar).',
      'Plaquetopenia isolada sem sangramento não indica transfusão de plaquetas.'
    ],
    medicamentos: [
      { medId: 'sais_reidratacao_oral', esquema: 'Grupos A e B: um terço do volume diário calculado como SRO (130 mL/kg/dia para menos de 10 kg; 100 mL/kg/dia de 10 a 20 kg; 80 mL/kg/dia acima de 20 kg), oferecido em pequenos volumes frequentes.' },
      { medId: 'soro_fisiologico', esquema: 'Grupo C: 10 mL/kg em 1 h, repetir até 3 vezes conforme resposta. Grupo D: 20 mL/kg em até 20 min, repetir até 3 vezes conforme resposta.' },
      { medId: 'ringer_lactato', esquema: 'Alternativa cristaloide para expansão nos grupos C e D conforme protocolo do MS.' },
      { medId: 'paracetamol', esquema: '10 a 15 mg/kg/dose VO a cada 6 h (máximo 5 doses/dia), conforme bula.' },
      { medId: 'dipirona', esquema: 'Alternativa antitérmica em maiores de 3 meses, conforme bula; evitar dose excessiva pelo risco de hipotensão.' },
      { medId: 'ondansetrona', esquema: 'Vômitos persistentes que impedem hidratação oral: 0,15 mg/kg VO ou IV em dose única (máximo 8 mg), em maiores de 6 meses, conforme protocolo.' }
    ],
    criteriosInternacao: [
      'Qualquer sinal de alarme (grupo C) ou dengue grave (grupo D).',
      'Recusa ou impossibilidade de hidratação oral, vômitos persistentes.',
      'Lactentes menores de 2 anos com hematócrito elevado ou plaquetopenia importante.',
      'Comorbidades descompensadas (asma, diabetes, doença falciforme, cardiopatia).',
      'Dificuldade de acesso ao serviço de saúde ou de retorno diário (comunidades ribeirinhas distantes).'
    ],
    criteriosUTI: [
      'Choque persistente após expansões ou necessidade de droga vasoativa.',
      'Sangramento grave ou coagulação intravascular disseminada.',
      'Insuficiência respiratória por derrame pleural volumoso ou edema pulmonar.',
      'Disfunção orgânica grave: encefalite, miocardite, hepatite fulminante, insuficiência renal.'
    ],
    criteriosAlta: [
      'Ausência de febre por 48 horas sem antitérmico.',
      'Melhora do estado geral, apetite e diurese normal.',
      'Hematócrito estável por 24 horas e plaquetas em ascensão (acima de 50.000/mm3).',
      'Ausência de sinais de alarme, derrames ou dispneia.',
      'Responsável orientado sobre retorno e sinais de alarme.'
    ],
    orientacoes: [
      'Oferecer líquidos em pequenas quantidades muitas vezes ao dia, mesmo que a criança não peça.',
      'Não usar AAS, ibuprofeno, diclofenaco ou outros anti-inflamatórios.',
      'A piora costuma ocorrer quando a febre cede: retornar imediatamente se dor abdominal forte, vômitos repetidos, sangramento, sonolência, irritabilidade, mãos e pés frios ou diminuição da urina.',
      'Retornar todos os dias para reavaliação até 48 horas após o fim da febre, ou conforme orientado.',
      'Eliminar criadouros de mosquitos na residência e usar repelente adequado à idade.'
    ],
    retorno: 'Grupo A: retorno diário ou no dia da defervescência e 48 horas após o fim da febre. Grupo B: retorno em 24 horas com novo hemograma. Retorno imediato diante de qualquer sinal de alarme.',
    prevencao: [
      'Eliminação de criadouros de Aedes aegypti (recipientes com água parada, caixas de água tampadas, calhas).',
      'Uso de repelentes adequados à idade (a partir de 6 meses conforme produto), roupas claras e mosquiteiros.',
      'Telas em portas e janelas e controle vetorial municipal.',
      'Vacina dengue (Qdenga) para faixas etárias e municípios definidos pelo Programa Nacional de Imunizações (10 a 14 anos em áreas prioritárias), conforme calendário vigente.',
      'Notificação rápida para bloqueio vetorial.'
    ],
    fontes: [
      { nome: 'Dengue: diagnóstico e manejo clínico – adulto e criança, 6ª edição – Ministério da Saúde', ano: 2024 },
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
      { nome: 'OPAS/OMS – Diretrizes para o diagnóstico e tratamento de dengue, chikungunya e zika', ano: 2022 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'chikungunya',
    nome: 'Chikungunya',
    categoria: 'amazonia',
    amazonia: true,
    cid10: 'A92.0',
    tags: ['febre', 'artralgia', 'edema', 'exantema', 'cefaleia', 'mialgia', 'prurido', 'conjuntivite', 'vomitos', 'fraqueza'],
    definicao: 'Arbovirose causada pelo vírus chikungunya (CHIKV), caracterizada por febre alta de início abrupto e artralgia intensa, muitas vezes incapacitante, que pode persistir por meses (fase subaguda e crônica). Em neonatos e lactentes pode cursar com formas graves.',
    epidemiologia: 'Circula no Amazonas desde 2014 com surtos em Manaus e municípios do interior, no mesmo período e locais da dengue (chuvas, dezembro a maio). A transmissão vertical intraparto ocorre quando a mãe está virêmica no parto, com risco de forma neonatal grave (encefalite, miocardite, sepse-like). Crianças menores de 2 anos e neonatos são grupo de risco. Coinfecção com dengue e zika é possível.',
    agente: 'Vírus chikungunya (CHIKV), gênero Alphavirus, família Togaviridae.',
    transmissao: 'Picada de Aedes aegypti e Aedes albopictus infectados. Transmissão vertical intraparto (mãe virêmica) e, raramente, transfusional.',
    incubacao: '3 a 7 dias (intervalo de 1 a 12 dias).',
    manifestacoes: [
      'Febre alta (acima de 38,5 °C) de início súbito, com duração de 2 a 7 dias.',
      'Poliartralgia intensa, simétrica, de pequenas e grandes articulações, com edema periarticular; a criança pode recusar andar ou ser tocada.',
      'Exantema maculopapular entre o 2º e 5º dia; em lactentes podem ocorrer lesões vesicobolhosas e hiperpigmentação.',
      'Cefaleia, mialgia, dor lombar, fadiga e conjuntivite.',
      'Náuseas, vômitos e dor abdominal.',
      'Em neonatos (transmissão vertical): febre, recusa alimentar, edema, exantema, petéquias, meningoencefalite e miocardite entre o 3º e 7º dia de vida.',
      'Fase subaguda (até 3 meses) e crônica (acima de 3 meses): artralgia persistente, rigidez matinal e tenossinovite, menos frequentes em crianças do que em adultos.'
    ],
    sinaisAlarme: [
      'Alteração do nível de consciência, convulsões ou sinais meníngeos.',
      'Dispneia, dor torácica ou sinais de miocardite.',
      'Sangramentos ou sinais de choque (semelhantes aos da dengue, pois a coinfecção é possível).',
      'Vômitos persistentes e desidratação.',
      'Neonato com febre, letargia ou recusa alimentar nos primeiros 7 dias de vida com mãe sintomática.',
      'Lesões bolhosas extensas em lactentes.'
    ],
    diagnosticoDiferencial: ['dengue', 'zika', 'mayaro', 'oropouche', 'malaria', 'leptospirose', 'artrite séptica', 'febre reumática', 'artrite idiopática juvenil', 'sepse'],
    exames: ['hemograma', 'rt_pcr_arboviroses', 'sorologia_arboviroses', 'ns1_dengue', 'gota_espessa', 'ast', 'alt', 'pcr', 'creatinina', 'liquor'],
    criteriosDiagnosticos: [
      'Caso suspeito: febre de início súbito acima de 38,5 °C e artralgia ou artrite intensa de início agudo não explicada por outra condição, em residente ou visitante de área com transmissão nos últimos 14 dias.',
      'Confirmação: RT-PCR até o 8º dia de sintomas ou sorologia IgM a partir do 8º dia (IgM pode reagir cruzado com Mayaro).',
      'Investigar dengue simultaneamente (NS1, hemograma), pois a conduta hemodinâmica segue o protocolo de dengue enquanto não excluída.',
      'Notificação compulsória.'
    ],
    classificacaoGravidade: [
      { nivel: 'Forma aguda sem gravidade', criterios: 'Febre e artralgia sem sinais de alarme, sem comorbidade descompensada, em criança maior de 2 anos com hidratação oral adequada. Manejo ambulatorial com analgesia e reavaliação.' },
      { nivel: 'Grupo de risco', criterios: 'Neonatos, lactentes menores de 2 anos, crianças com comorbidades (doença falciforme, cardiopatia, nefropatia, asma grave) ou com dor intensa que impede alimentação e sono. Observação ou internação para analgesia e hidratação.' },
      { nivel: 'Forma atípica ou grave', criterios: 'Acometimento neurológico (encefalite, meningoencefalite, convulsões), cardíaco (miocardite, arritmia), hepatite grave, insuficiência renal, lesões bolhosas extensas, sangramento ou choque. Internação, preferencialmente em UTI.' }
    ],
    tratamento: [
      'Analgesia escalonada: paracetamol ou dipirona em doses habituais; se dor persistente, associar analgesia conforme escala de dor e protocolo do MS (opioides fracos apenas sob supervisão).',
      'Não usar AAS nem anti-inflamatórios não hormonais na fase aguda (até excluir dengue e por pelo menos 14 dias do início dos sintomas).',
      'Corticoide não é indicado na fase aguda; na fase subaguda ou crônica com artrite persistente, avaliar prednisolona 0,5 mg/kg/dia por curto período conforme protocolo do MS e opinião de especialista.',
      'Hidratação oral abundante e manejo de sinais de alarme conforme protocolo de dengue enquanto não excluída.',
      'Compressas frias nas articulações, repouso relativo e fisioterapia precoce em casos com limitação funcional.',
      'Neonato de mãe sintomática no periparto: observar por 7 dias, com investigação laboratorial e internação se sinais clínicos.',
      'Formas graves: suporte em UTI, tratamento de convulsões, monitorização cardíaca.'
    ],
    medicamentos: [
      { medId: 'paracetamol', esquema: '10 a 15 mg/kg/dose VO a cada 6 h (máximo 5 doses/dia), conforme bula.' },
      { medId: 'dipirona', esquema: 'Alternativa ou associação analgésica em maiores de 3 meses, conforme bula.' },
      { medId: 'prednisolona', esquema: 'Somente na fase subaguda ou crônica com artrite persistente, após exclusão de dengue: 0,5 mg/kg/dia VO por curto período, com redução gradual, confirmar conforme protocolo do MS.' },
      { medId: 'sais_reidratacao_oral', esquema: 'Hidratação oral suplementar em casos com vômitos, febre alta ou inapetência, conforme peso.' }
    ],
    criteriosInternacao: [
      'Neonatos e lactentes menores de 2 anos com sintomas ou mãe virêmica no parto.',
      'Dor intensa refratária à analgesia oral, impossibilidade de alimentação ou hidratação.',
      'Sinais de alarme de dengue (até excluir coinfecção) ou manifestações atípicas.',
      'Comorbidades descompensadas.'
    ],
    criteriosUTI: [
      'Encefalite, convulsões de difícil controle ou rebaixamento de consciência.',
      'Miocardite, arritmias ou choque.',
      'Insuficiência respiratória ou renal.',
      'Sangramento grave.'
    ],
    criteriosAlta: [
      'Afebril, com dor controlada por analgesia oral.',
      'Aceitando alimentação e hidratação oral.',
      'Sem sinais de alarme ou acometimento de órgãos.',
      'Plano de seguimento para artralgia persistente definido.'
    ],
    orientacoes: [
      'Oferecer líquidos com frequência e manter a analgesia nos horários indicados.',
      'Não usar anti-inflamatórios ou AAS por conta própria.',
      'Retornar imediatamente se sonolência, convulsão, dificuldade para respirar, sangramento, vômitos repetidos ou dor que não melhora.',
      'A dor nas articulações pode durar semanas; manter atividade leve e retornar se persistir mais de 3 meses.',
      'Eliminar criadouros e usar repelente adequado à idade.'
    ],
    retorno: 'Reavaliar em 48 a 72 horas (diariamente nos grupos de risco) e ao final da fase aguda; seguimento em 3 meses se artralgia persistente.',
    prevencao: [
      'Controle do Aedes aegypti: eliminação de criadouros e mosquiteiros.',
      'Repelentes adequados à idade e roupas que cubram braços e pernas.',
      'Proteção de gestantes no final da gravidez contra picadas para reduzir transmissão vertical.',
      'Notificação e bloqueio vetorial precoces.'
    ],
    fontes: [
      { nome: 'Chikungunya: manejo clínico – Ministério da Saúde', ano: 2017 },
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
      { nome: 'OPAS/OMS – Diretrizes para o diagnóstico e tratamento de dengue, chikungunya e zika', ano: 2022 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'zika',
    nome: 'Zika',
    categoria: 'amazonia',
    amazonia: true,
    cid10: 'A92.8',
    tags: ['febre', 'exantema', 'prurido', 'conjuntivite', 'artralgia', 'edema', 'cefaleia', 'mialgia', 'fraqueza'],
    definicao: 'Arbovirose geralmente benigna e autolimitada causada pelo vírus Zika, marcada por exantema pruriginoso, febre baixa ou ausente e conjuntivite não purulenta. Sua importância decorre da síndrome congênita associada ao vírus Zika (microcefalia e outras alterações) e da síndrome de Guillain-Barré.',
    epidemiologia: 'Introduzido no Brasil em 2015, com circulação no Amazonas nos mesmos períodos e locais da dengue (Manaus e municípios do interior, estação chuvosa). Gestantes de qualquer trimestre constituem o principal grupo de preocupação. Recém-nascidos com microcefalia ou alterações neurológicas devem ser investigados conforme protocolo de vigilância.',
    agente: 'Vírus Zika (ZIKV), gênero Flavivirus, família Flaviviridae.',
    transmissao: 'Picada de Aedes aegypti e Aedes albopictus. Transmissão vertical (transplacentária), sexual, transfusional e perinatal são documentadas.',
    incubacao: '3 a 14 dias (média 3 a 7 dias).',
    manifestacoes: [
      'Exantema maculopapular pruriginoso, de início precoce (1º ou 2º dia), craniocaudal.',
      'Febre baixa ou ausente, com duração de 1 a 2 dias.',
      'Conjuntivite não purulenta (hiperemia conjuntival sem secreção).',
      'Artralgia leve a moderada e edema de mãos e pés.',
      'Cefaleia, mialgia e adenomegalia retroauricular ou cervical.',
      'Complicações neurológicas raras: síndrome de Guillain-Barré, encefalite, mielite.',
      'Infecção congênita: microcefalia, calcificações intracranianas, alterações oculares e auditivas, artrogripose e hipertonia.'
    ],
    sinaisAlarme: [
      'Fraqueza muscular ascendente, dificuldade para andar ou hiporreflexia (Guillain-Barré).',
      'Alteração de consciência, convulsões ou sinais focais.',
      'Sinais de alarme de dengue (dor abdominal, vômitos persistentes, sangramento), pois a coinfecção é possível.',
      'Gestante com exantema: encaminhar para pré-natal de alto risco e investigação.',
      'Recém-nascido com perímetro cefálico abaixo do esperado ou alterações neurológicas.'
    ],
    diagnosticoDiferencial: ['dengue', 'chikungunya', 'oropouche', 'mayaro', 'sarampo e rubéola', 'exantema súbito e outras viroses exantemáticas', 'escarlatina', 'reação a medicamentos', 'malaria'],
    exames: ['hemograma', 'rt_pcr_arboviroses', 'sorologia_arboviroses', 'ns1_dengue', 'gota_espessa', 'urina_1', 'liquor', 'ultrassonografia transfontanela ou tomografia em recém-nascido suspeito'],
    criteriosDiagnosticos: [
      'Caso suspeito: exantema maculopapular pruriginoso com pelo menos dois dos seguintes: febre baixa, hiperemia conjuntival sem secreção, poliartralgia ou edema periarticular, em área de transmissão.',
      'Confirmação: RT-PCR em sangue até o 5º dia ou em urina até o 14º dia; sorologia IgM a partir do 6º dia (reação cruzada com dengue).',
      'Gestantes com suspeita: investigação laboratorial obrigatória e seguimento ultrassonográfico.',
      'Recém-nascido: aplicar protocolo de vigilância da síndrome congênita (perímetro cefálico, exame neurológico, imagem, avaliação ocular e auditiva).',
      'Notificação compulsória (imediata em gestantes e síndrome congênita).'
    ],
    classificacaoGravidade: [
      { nivel: 'Forma leve', criterios: 'Exantema, prurido, febre baixa e artralgia leve, sem sinais neurológicos ou de alarme. Tratamento sintomático ambulatorial.' },
      { nivel: 'Situação especial', criterios: 'Gestante, lactente menor de 3 meses ou criança com comorbidade. Investigação laboratorial e seguimento próximo.' },
      { nivel: 'Forma grave ou complicada', criterios: 'Síndrome de Guillain-Barré, encefalite, mielite, plaquetopenia grave ou coinfecção com dengue com sinais de alarme. Internação com suporte e avaliação neurológica.' }
    ],
    tratamento: [
      'Tratamento sintomático: paracetamol ou dipirona para febre e dor.',
      'Evitar AAS e anti-inflamatórios não hormonais até excluir dengue.',
      'Prurido: banhos frios, loções calmantes e anti-histamínicos adequados à idade, conforme protocolo.',
      'Hidratação oral e repouso.',
      'Sinais neurológicos: internação, avaliação neurológica, monitorização respiratória; imunoglobulina IV para Guillain-Barré conforme protocolo do serviço.',
      'Recém-nascido com suspeita de síndrome congênita: encaminhar para serviço de referência com estimulação precoce, avaliação oftalmológica, auditiva e neurológica.'
    ],
    medicamentos: [
      { medId: 'paracetamol', esquema: '10 a 15 mg/kg/dose VO a cada 6 h (máximo 5 doses/dia), conforme bula.' },
      { medId: 'dipirona', esquema: 'Alternativa em maiores de 3 meses, conforme bula.' },
      { medId: null, nome: 'Anti-histamínico (dexclorfeniramina ou loratadina)', esquema: 'Para prurido, conforme idade e bula; dexclorfeniramina apenas acima de 2 anos.' }
    ],
    criteriosInternacao: [
      'Manifestações neurológicas (fraqueza progressiva, alteração de consciência, convulsões).',
      'Sinais de alarme de dengue enquanto não excluída coinfecção.',
      'Lactentes menores de 3 meses com febre e comprometimento do estado geral.',
      'Desidratação ou impossibilidade de hidratação oral.'
    ],
    criteriosUTI: [
      'Insuficiência respiratória por Guillain-Barré ou encefalite.',
      'Rebaixamento importante de consciência ou convulsões refratárias.',
      'Choque ou sangramento grave (coinfecção com dengue).'
    ],
    criteriosAlta: [
      'Afebril e sem sinais neurológicos.',
      'Hidratação e alimentação orais adequadas.',
      'Seguimento agendado (gestante ou recém-nascido conforme protocolo).'
    ],
    orientacoes: [
      'A doença costuma ser leve e durar poucos dias; manter hidratação e repouso.',
      'Não usar AAS ou anti-inflamatórios.',
      'Retornar se fraqueza nas pernas, dificuldade para andar, sonolência, convulsão ou sinais de alarme de dengue.',
      'Gestantes com sintomas devem comunicar o pré-natal imediatamente.',
      'Usar preservativo durante a fase aguda e por período orientado, pois há transmissão sexual.'
    ],
    retorno: 'Reavaliar em 48 a 72 horas ou antes se sinais neurológicos ou de alarme. Gestantes e recém-nascidos suspeitos: seguimento em serviço de referência.',
    prevencao: [
      'Controle do Aedes aegypti e eliminação de criadouros.',
      'Repelente adequado à idade, roupas longas e mosquiteiros, com atenção especial às gestantes.',
      'Preservativo para evitar transmissão sexual em áreas de transmissão.',
      'Vigilância de microcefalia e da síndrome congênita com triagem neonatal e seguimento.'
    ],
    fontes: [
      { nome: 'Protocolo de vigilância e resposta à ocorrência de microcefalia e/ou alterações do SNC – Ministério da Saúde', ano: 2016 },
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
      { nome: 'OPAS/OMS – Diretrizes para o diagnóstico e tratamento de dengue, chikungunya e zika', ano: 2022 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'febre_amarela',
    nome: 'Febre amarela',
    categoria: 'amazonia',
    amazonia: true,
    cid10: 'A95',
    tags: ['febre', 'cefaleia', 'mialgia', 'ictericia', 'vomitos', 'sangramento', 'dor_abdominal', 'reducao_diurese', 'alteracao_consciencia', 'fraqueza'],
    definicao: 'Doença febril aguda causada pelo vírus da febre amarela, de gravidade variável, com formas leves oligossintomáticas até formas graves com icterícia, hemorragias, insuficiência hepática e renal e alta letalidade. É imunoprevenível por vacina.',
    epidemiologia: 'O Amazonas está inteiramente em área com recomendação de vacina. O ciclo silvestre é mantido por primatas não humanos e mosquitos Haemagogus e Sabethes; casos humanos ocorrem em pessoas não vacinadas que entram em áreas de mata (ribeirinhos, trabalhadores rurais, extrativistas, garimpeiros, turistas), principalmente entre dezembro e maio. Epizootias em macacos são sinal de alerta. Crianças não vacinadas ou com esquema incompleto são vulneráveis.',
    agente: 'Vírus da febre amarela, gênero Flavivirus, família Flaviviridae.',
    transmissao: 'Ciclo silvestre: picada de mosquitos Haemagogus e Sabethes infectados a partir de primatas. Ciclo urbano (Aedes aegypti) não é registrado no Brasil desde 1942, mas o risco de reurbanização existe. Sem transmissão pessoa a pessoa.',
    incubacao: '3 a 6 dias (até 15 dias).',
    manifestacoes: [
      'Período de infecção (3 dias): febre alta de início súbito, calafrios, cefaleia intensa, mialgia (lombar), náuseas e vômitos, prostração.',
      'Sinal de Faget: bradicardia relativa apesar da febre alta.',
      'Período de remissão (até 48 horas): melhora aparente dos sintomas.',
      'Período toxêmico (15 a 25% dos casos): retorno da febre, icterícia, dor abdominal, vômitos (podem ser hemorrágicos), diarreia.',
      'Manifestações hemorrágicas: epistaxe, gengivorragia, hematêmese, melena, petéquias.',
      'Oligúria, insuficiência renal aguda e encefalopatia hepática.',
      'Formas leves e moderadas correspondem à maioria dos casos e podem ser confundidas com dengue ou outras viroses.'
    ],
    sinaisAlarme: [
      'Retorno da febre após remissão, com icterícia ou dor abdominal.',
      'Vômitos persistentes, hematêmese ou qualquer sangramento.',
      'Oligúria, urina escura ou elevação de creatinina.',
      'Sonolência, agitação, confusão ou convulsões.',
      'Transaminases muito elevadas (AST maior que ALT) e alteração do coagulograma.',
      'Hipotensão, taquicardia ou sinais de choque.'
    ],
    diagnosticoDiferencial: ['malaria', 'leptospirose', 'dengue', 'hepatites virais', 'sepse', 'doenca_chagas', 'febre tifoide', 'hantavirose', 'intoxicação por paracetamol'],
    exames: ['hemograma', 'ast', 'alt', 'bilirrubinas', 'coagulograma', 'ureia', 'creatinina', 'glicemia', 'eletrolitos', 'gasometria', 'urina_1', 'gota_espessa', 'rt_pcr_arboviroses', 'sorologia_arboviroses'],
    criteriosDiagnosticos: [
      'Caso suspeito: febre aguda (até 7 dias) com icterícia ou manifestações hemorrágicas, em pessoa não vacinada ou com estado vacinal desconhecido, procedente de área com transmissão nos últimos 15 dias.',
      'Confirmação: RT-PCR em sangue até o 10º dia; sorologia IgM (MAC-ELISA) a partir do 6º dia, considerando vacinação recente; histopatologia com imuno-histoquímica em óbitos.',
      'Laboratório de alerta: leucopenia, plaquetopenia, AST maior que ALT com valores acima de 1000 U/L, bilirrubina elevada, creatinina elevada, TP alargado.',
      'Notificação imediata (até 24 horas) de todo caso suspeito.'
    ],
    classificacaoGravidade: [
      { nivel: 'Leve', criterios: 'Febre, cefaleia e mialgia por 2 a 3 dias, sem icterícia, sem alteração de exames ou com alterações discretas. Observação com hidratação oral e reavaliação laboratorial diária.' },
      { nivel: 'Moderada', criterios: 'Icterícia leve, transaminases elevadas (abaixo de 1000 U/L), plaquetopenia moderada, sem sangramento ou disfunção renal. Internação para monitorização e hidratação.' },
      { nivel: 'Grave', criterios: 'Icterícia importante, sangramentos, AST acima de 1000 U/L, creatinina elevada ou oligúria, encefalopatia, coagulopatia ou choque. UTI com suporte intensivo; avaliar diálise e transferência para centro com terapia intensiva pediátrica.' }
    ],
    tratamento: [
      'Não há antiviral específico; o tratamento é de suporte, com internação precoce dos casos moderados e graves.',
      'Hidratação venosa criteriosa com cristaloides, evitando sobrecarga em pacientes com disfunção renal.',
      'Antitérmico e analgesia com dipirona (evitar paracetamol em doses altas pela hepatotoxicidade; se usado, máximo 40 a 50 mg/kg/dia conforme protocolo). Contraindicados AAS e anti-inflamatórios.',
      'Correção de hipoglicemia (glicose 10%), distúrbios eletrolíticos e acidose.',
      'Sangramento ativo com coagulopatia: plasma fresco congelado e concentrado de plaquetas conforme protocolo; vitamina K.',
      'Proteção gástrica (bloqueador de bomba de prótons) em formas moderadas e graves.',
      'Insuficiência renal: suporte dialítico precoce em UTI.',
      'Vigilância de encefalopatia hepática: lactulose, controle de amônia e suporte ventilatório se necessário.'
    ],
    medicamentos: [
      { medId: 'dipirona', esquema: 'Febre e dor, em maiores de 3 meses, conforme bula.' },
      { medId: 'paracetamol', esquema: 'Usar com cautela pela hepatotoxicidade; não exceder 40 a 50 mg/kg/dia em suspeita de febre amarela, conforme protocolo.' },
      { medId: 'soro_fisiologico', esquema: 'Expansão em choque: 20 mL/kg em 20 min, repetir conforme resposta e sinais de sobrecarga.' },
      { medId: 'glicose', esquema: 'Hipoglicemia: glicose 10% 2 a 5 mL/kg IV, conforme protocolo.' },
      { medId: null, nome: 'Vitamina K (fitomenadiona)', esquema: 'Coagulopatia: dose conforme idade e protocolo do serviço.' }
    ],
    criteriosInternacao: [
      'Todo caso suspeito com icterícia, sangramento, vômitos persistentes ou alteração laboratorial.',
      'Retorno da febre após período de remissão.',
      'Impossibilidade de reavaliação laboratorial diária no ambulatório.',
      'Lactentes e crianças com comorbidades.'
    ],
    criteriosUTI: [
      'Insuficiência hepática aguda com encefalopatia ou coagulopatia.',
      'Insuficiência renal aguda com necessidade de diálise.',
      'Sangramento grave ou choque.',
      'Insuficiência respiratória ou convulsões.'
    ],
    criteriosAlta: [
      'Afebril, sem sangramentos e com aceitação alimentar.',
      'Função renal normalizada e transaminases em queda consistente.',
      'Coagulograma e plaquetas em recuperação.',
      'Seguimento ambulatorial com exames em 1 semana.'
    ],
    orientacoes: [
      'Manter hidratação e retornar imediatamente se pele amarelada, sangramento, vômitos ou diminuição da urina.',
      'Não usar AAS, anti-inflamatórios ou doses altas de paracetamol.',
      'Vacinar todos os contatos e moradores não vacinados da localidade.',
      'Evitar entrada em áreas de mata sem vacinação prévia.',
      'Comunicar à unidade de saúde a ocorrência de macacos doentes ou mortos na região.'
    ],
    retorno: 'Casos leves: reavaliação clínica e laboratorial diária até o 7º dia. Retorno imediato se icterícia, sangramento ou oligúria.',
    prevencao: [
      'Vacina febre amarela (atenuada): dose aos 9 meses e reforço aos 4 anos, conforme calendário do PNI; em situação de surto pode ser antecipada para 6 meses conforme orientação do MS.',
      'Não vacinar menores de 6 meses; avaliar contraindicações em imunossuprimidos e alérgicos a ovo.',
      'Vacinação de viajantes e trabalhadores de áreas de mata com pelo menos 10 dias de antecedência.',
      'Uso de repelente e roupas longas em áreas de mata.',
      'Vigilância de epizootias em primatas não humanos.'
    ],
    fontes: [
      { nome: 'Febre amarela: guia para profissionais de saúde – Ministério da Saúde', ano: 2018 },
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
      { nome: 'Calendário Nacional de Vacinação – PNI/Ministério da Saúde', ano: 2024 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'oropouche',
    nome: 'Febre do Oropouche',
    categoria: 'amazonia',
    amazonia: true,
    cid10: 'A93.0',
    tags: ['febre', 'cefaleia', 'mialgia', 'artralgia', 'exantema', 'vomitos', 'fraqueza', 'conjuntivite', 'rigidez_nuca'],
    definicao: 'Arbovirose febril aguda causada pelo vírus Oropouche, clinicamente semelhante à dengue, com cefaleia intensa, mialgia e artralgia. É autolimitada na maioria dos casos, mas pode causar meningite ou encefalite e, desde 2024, investiga-se transmissão vertical com desfechos fetais adversos.',
    epidemiologia: 'Historicamente restrita à Amazônia, com epidemias em Manaus desde a década de 1980. Em 2024 houve expansão importante no Amazonas (Manaus, Coari, Tefé, Manacapuru, Itacoatiara, Parintins e outros municípios), Pará, Rondônia, Acre e Roraima, com casos fora da região. O vetor, o maruim Culicoides paraensis, prolifera em áreas de plantação de banana, cacau e matéria orgânica em decomposição. Maior transmissão na estação chuvosa. Em 2024 foram registrados os primeiros óbitos e casos de transmissão vertical em investigação.',
    agente: 'Vírus Oropouche (OROV), gênero Orthobunyavirus, família Peribunyaviridae.',
    transmissao: 'Ciclo urbano: picada do maruim Culicoides paraensis (também Culex quinquefasciatus em menor grau). Ciclo silvestre envolve bichos-preguiça, primatas e aves. Transmissão vertical em investigação.',
    incubacao: '3 a 8 dias (4 a 8 dias em média).',
    manifestacoes: [
      'Febre alta de início súbito, com duração de 2 a 7 dias.',
      'Cefaleia intensa, dor retro-orbitária, fotofobia e tontura.',
      'Mialgia e artralgia, com prostração.',
      'Náuseas, vômitos e diarreia.',
      'Exantema em parte dos casos.',
      'Recorrência dos sintomas (febre e cefaleia) 1 a 2 semanas após a melhora em até 60% dos casos.',
      'Meningite ou meningoencefalite em uma minoria: rigidez de nuca, vômitos, sonolência.'
    ],
    sinaisAlarme: [
      'Rigidez de nuca, vômitos em jato, sonolência ou convulsão.',
      'Sangramentos ou sinais de alarme de dengue (não excluída coinfecção).',
      'Desidratação e vômitos persistentes.',
      'Gestante sintomática (investigar e encaminhar ao pré-natal de alto risco).',
      'Persistência de febre alta além de 7 dias ou piora após melhora inicial.'
    ],
    diagnosticoDiferencial: ['dengue', 'chikungunya', 'zika', 'mayaro', 'malaria', 'leptospirose', 'meningite', 'influenza e outras viroses respiratórias'],
    exames: ['hemograma', 'rt_pcr_arboviroses', 'sorologia_arboviroses', 'ns1_dengue', 'gota_espessa', 'liquor', 'ast', 'alt'],
    criteriosDiagnosticos: [
      'Caso suspeito: febre de início súbito com cefaleia, mialgia ou artralgia em residente ou visitante de área com transmissão, sem confirmação de outra arbovirose.',
      'Confirmação: RT-PCR em sangue até o 7º dia de sintomas (LACEN); sorologia em investigação de casos tardios.',
      'Investigar dengue e malária simultaneamente pela sobreposição clínica.',
      'Casos com sinais meníngeos: punção lombar e RT-PCR no líquor.',
      'Notificação compulsória; gestantes e casos graves têm investigação prioritária.'
    ],
    classificacaoGravidade: [
      { nivel: 'Leve', criterios: 'Febre, cefaleia e mialgia sem sinais neurológicos, com hidratação oral adequada. Manejo ambulatorial sintomático.' },
      { nivel: 'Moderada ou grupo de risco', criterios: 'Vômitos persistentes, desidratação, lactentes, gestantes ou comorbidades. Observação com hidratação supervisionada e exames.' },
      { nivel: 'Grave', criterios: 'Meningite, encefalite, sangramento ou choque. Internação com suporte, avaliação neurológica e transferência para UTI se necessário.' }
    ],
    tratamento: [
      'Tratamento sintomático: paracetamol ou dipirona para febre e cefaleia.',
      'Evitar AAS e anti-inflamatórios não hormonais até exclusão de dengue.',
      'Hidratação oral abundante; hidratação venosa se vômitos persistentes ou desidratação.',
      'Repouso e orientação sobre possível recorrência dos sintomas.',
      'Formas neurológicas: internação, punção lombar, suporte e antibiótico empírico até excluir meningite bacteriana.',
      'Gestantes: encaminhar para investigação laboratorial e seguimento obstétrico.'
    ],
    medicamentos: [
      { medId: 'paracetamol', esquema: '10 a 15 mg/kg/dose VO a cada 6 h (máximo 5 doses/dia), conforme bula.' },
      { medId: 'dipirona', esquema: 'Alternativa em maiores de 3 meses, conforme bula.' },
      { medId: 'sais_reidratacao_oral', esquema: 'Hidratação oral suplementar conforme peso e perdas.' },
      { medId: 'ceftriaxona', esquema: 'Suspeita de meningite bacteriana até resultado do líquor: 100 mg/kg/dia IV 12/12 h, conforme protocolo.' }
    ],
    criteriosInternacao: [
      'Sinais meníngeos ou alteração de consciência.',
      'Desidratação ou vômitos que impedem hidratação oral.',
      'Sangramento ou sinais de alarme de dengue enquanto não excluída.',
      'Lactentes jovens com comprometimento do estado geral.'
    ],
    criteriosUTI: [
      'Encefalite com rebaixamento de consciência ou convulsões refratárias.',
      'Choque ou sangramento grave.',
      'Insuficiência respiratória.'
    ],
    criteriosAlta: [
      'Afebril e hidratado, sem sinais neurológicos.',
      'Aceitação oral adequada.',
      'Orientação sobre recorrência dos sintomas e sinais de retorno.'
    ],
    orientacoes: [
      'Manter hidratação e repouso; a febre e a dor de cabeça podem voltar após alguns dias e costumam ser mais leves.',
      'Não usar AAS ou anti-inflamatórios sem orientação.',
      'Retornar se rigidez de nuca, sonolência, convulsão, sangramento ou vômitos repetidos.',
      'Usar repelente e roupas longas, especialmente ao amanhecer e entardecer; telas de malha fina, pois o maruim atravessa telas comuns.',
      'Gestantes com sintomas devem procurar o pré-natal.'
    ],
    retorno: 'Reavaliar em 48 a 72 horas ou antes se sinais de alarme; orientar retorno na recorrência dos sintomas.',
    prevencao: [
      'Repelentes adequados à idade e roupas que cubram o corpo.',
      'Telas de malha fina e mosquiteiros.',
      'Limpeza de terrenos, remoção de folhas e frutos em decomposição e manejo de matéria orgânica onde o maruim se reproduz.',
      'Notificação precoce para ações de vigilância e controle.'
    ],
    fontes: [
      { nome: 'Nota Técnica sobre febre do Oropouche – Ministério da Saúde', ano: 2024 },
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
      { nome: 'OPAS/OMS – Alerta epidemiológico Oropouche', ano: 2024 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'mayaro',
    nome: 'Febre do Mayaro',
    categoria: 'amazonia',
    amazonia: true,
    cid10: 'A92.8',
    tags: ['febre', 'artralgia', 'edema', 'exantema', 'cefaleia', 'mialgia', 'fraqueza', 'prurido'],
    definicao: 'Arbovirose silvestre causada pelo vírus Mayaro, clinicamente semelhante à chikungunya, com febre, exantema e artralgia intensa e prolongada. Doença autolimitada, mas a artralgia pode persistir por meses.',
    epidemiologia: 'Endêmica na Amazônia, com casos esporádicos e pequenos surtos no Amazonas, Pará, Mato Grosso e Goiás. Acomete principalmente pessoas com atividades em áreas de mata (extrativismo, caça, garimpo, agricultura), incluindo crianças de comunidades ribeirinhas e indígenas. Ocorre o ano todo, com mais casos na estação chuvosa. Subdiagnosticada por confusão com dengue e chikungunya.',
    agente: 'Vírus Mayaro (MAYV), gênero Alphavirus, família Togaviridae.',
    transmissao: 'Picada de mosquitos silvestres do gênero Haemagogus (principalmente Haemagogus janthinomys) infectados, com primatas como reservatório. Aedes aegypti é vetor potencial em laboratório.',
    incubacao: '1 a 12 dias (média 7 dias).',
    manifestacoes: [
      'Febre alta de início súbito com duração de 3 a 7 dias.',
      'Artralgia intensa e simétrica de punhos, tornozelos, mãos e pés, com edema articular, podendo durar semanas a meses.',
      'Exantema maculopapular no tronco e membros entre o 3º e 5º dia.',
      'Cefaleia, dor retro-orbitária, mialgia e calafrios.',
      'Náuseas, vômitos e diarreia em parte dos casos.',
      'Linfadenopatia e, raramente, manifestações hemorrágicas leves ou miocardite.'
    ],
    sinaisAlarme: [
      'Sangramentos, dor abdominal intensa ou vômitos persistentes (excluir dengue).',
      'Alteração de consciência ou sinais meníngeos.',
      'Dor torácica, dispneia ou arritmia (miocardite).',
      'Desidratação ou impossibilidade de deambular por dor.',
      'Lactentes ou crianças com comorbidades com comprometimento do estado geral.'
    ],
    diagnosticoDiferencial: ['chikungunya', 'dengue', 'zika', 'oropouche', 'malaria', 'leptospirose', 'febre_amarela', 'artrite séptica ou reativa', 'febre reumática'],
    exames: ['hemograma', 'rt_pcr_arboviroses', 'sorologia_arboviroses', 'ns1_dengue', 'gota_espessa', 'ast', 'alt', 'pcr'],
    criteriosDiagnosticos: [
      'Caso suspeito: febre aguda com artralgia ou artrite e exantema em pessoa com exposição a área de mata na Amazônia nos últimos 15 dias.',
      'Confirmação: RT-PCR até o 5º dia de sintomas ou sorologia IgM (reação cruzada com chikungunya; interpretar com cautela).',
      'Excluir dengue e malária em toda suspeita.',
      'Notificação conforme orientação da vigilância (agravo de interesse).'
    ],
    classificacaoGravidade: [
      { nivel: 'Leve', criterios: 'Febre, exantema e artralgia com hidratação e deambulação preservadas. Tratamento sintomático ambulatorial.' },
      { nivel: 'Moderada', criterios: 'Artralgia incapacitante, vômitos, desidratação leve ou grupo de risco (lactentes, comorbidades). Observação e analgesia supervisionada.' },
      { nivel: 'Grave', criterios: 'Manifestações hemorrágicas, neurológicas ou cardíacas, choque ou coinfecção com dengue grave. Internação com suporte.' }
    ],
    tratamento: [
      'Tratamento sintomático com paracetamol ou dipirona.',
      'Evitar AAS e anti-inflamatórios não hormonais até exclusão de dengue.',
      'Hidratação oral e repouso.',
      'Artralgia persistente: fisioterapia e avaliação com especialista; corticoide apenas em fase subaguda ou crônica e sob supervisão, como na chikungunya.',
      'Formas graves: suporte hospitalar conforme acometimento.'
    ],
    medicamentos: [
      { medId: 'paracetamol', esquema: '10 a 15 mg/kg/dose VO a cada 6 h (máximo 5 doses/dia), conforme bula.' },
      { medId: 'dipirona', esquema: 'Alternativa em maiores de 3 meses, conforme bula.' },
      { medId: 'sais_reidratacao_oral', esquema: 'Hidratação oral suplementar conforme peso e perdas.' }
    ],
    criteriosInternacao: [
      'Sinais de alarme ou sangramento (dengue não excluída).',
      'Desidratação ou dor que impede alimentação e hidratação.',
      'Manifestações neurológicas ou cardíacas.',
      'Lactentes jovens com comprometimento do estado geral.'
    ],
    criteriosUTI: [
      'Choque ou sangramento grave.',
      'Miocardite com instabilidade hemodinâmica.',
      'Encefalite ou convulsões refratárias.'
    ],
    criteriosAlta: [
      'Afebril, hidratado e com dor controlada por via oral.',
      'Sem sinais de alarme.',
      'Plano de seguimento para artralgia persistente.'
    ],
    orientacoes: [
      'Manter hidratação, repouso e analgesia nos horários indicados.',
      'Não usar anti-inflamatórios ou AAS por conta própria.',
      'Retornar se sangramento, dor abdominal forte, sonolência ou dificuldade para respirar.',
      'A dor nas articulações pode durar semanas; retornar se persistir.',
      'Usar repelente e roupas longas ao entrar em áreas de mata.'
    ],
    retorno: 'Reavaliar em 48 a 72 horas e ao final da fase aguda; seguimento se artralgia por mais de 4 semanas.',
    prevencao: [
      'Repelentes adequados à idade e roupas longas em atividades na mata.',
      'Mosquiteiros e telas.',
      'Vacinação contra febre amarela (mesmos vetores silvestres) para proteção de doenças coexistentes.',
      'Vigilância de casos febris com artralgia em áreas de mata.'
    ],
    fontes: [
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
      { nome: 'OPAS/OMS – Alerta epidemiológico Mayaro', ano: 2019 },
      { nome: 'Fiocruz/Instituto Evandro Chagas – Arboviroses emergentes na Amazônia', ano: 2020 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'leptospirose',
    nome: 'Leptospirose',
    categoria: 'amazonia',
    amazonia: true,
    cid10: 'A27',
    tags: ['febre', 'mialgia', 'cefaleia', 'ictericia', 'conjuntivite', 'vomitos', 'dor_abdominal', 'dispneia', 'sangramento', 'reducao_diurese', 'calafrios', 'diarreia'],
    definicao: 'Zoonose bacteriana aguda causada por espiroquetas do gênero Leptospira, com espectro desde síndrome febril inespecífica até formas graves com icterícia, insuficiência renal e hemorragia pulmonar (síndrome de Weil). O tratamento precoce com antibiótico reduz gravidade.',
    epidemiologia: 'No Amazonas os casos aumentam no período de chuvas e cheia dos rios (dezembro a junho), com alagamentos de igarapés e bairros de Manaus, e em comunidades ribeirinhas onde há contato com água e lama contaminadas por urina de roedores. Crianças que brincam em igarapés e enchentes, catadores e moradores de palafitas são os mais expostos. Coinfecção ou confusão com malária e dengue é frequente; sempre colher gota espessa.',
    agente: 'Leptospira interrogans e outras espécies patogênicas de Leptospira (diversos sorovares, como Icterohaemorrhagiae e Copenhageni).',
    transmissao: 'Contato da pele (especialmente com lesões) ou mucosas com água, lama ou solo contaminados com urina de roedores e outros animais infectados; ingestão de água contaminada. Não há transmissão pessoa a pessoa.',
    incubacao: '1 a 30 dias (geralmente 5 a 14 dias).',
    manifestacoes: [
      'Fase precoce (leptospirêmica): febre alta súbita, calafrios, cefaleia intensa, mialgia importante (principalmente panturrilhas), prostração.',
      'Sufusão conjuntival (hiperemia sem secreção), fotofobia e dor ocular.',
      'Náuseas, vômitos, diarreia e dor abdominal.',
      'Exantema, tosse e faringite em parte dos casos.',
      'Fase tardia (imune, 5 a 15% dos casos): icterícia rubínica (alaranjada), insuficiência renal aguda (oligúria ou poliúria com hipocalemia), hemorragias.',
      'Hemorragia pulmonar: tosse, dispneia, hemoptise, insuficiência respiratória rápida.',
      'Meningite asséptica na fase imune.'
    ],
    sinaisAlarme: [
      'Dispneia, tosse com sangue ou dor torácica.',
      'Icterícia, oligúria ou urina escura.',
      'Sangramentos (epistaxe, gengivorragia, hematêmese, melena, petéquias).',
      'Hipotensão, taquicardia, extremidades frias ou alteração de consciência.',
      'Vômitos persistentes com desidratação.',
      'Arritmias ou sinais de miocardite.'
    ],
    diagnosticoDiferencial: ['malaria', 'dengue', 'febre_amarela', 'hepatites virais', 'sepse', 'pneumonia', 'meningite', 'febre tifoide', 'hantavirose', 'doenca_chagas'],
    exames: ['hemograma', 'ureia', 'creatinina', 'potassio', 'sodio', 'bilirrubinas', 'ast', 'alt', 'cpk', 'coagulograma', 'gasometria', 'urina_1', 'radiografia_torax', 'gota_espessa', 'ns1_dengue', 'sorologia leptospirose (ELISA IgM e microaglutinação)', 'rt_pcr_arboviroses'],
    criteriosDiagnosticos: [
      'Caso suspeito: febre aguda com cefaleia e mialgia e antecedente de exposição a enchente, lama, esgoto, igarapé ou roedores nos últimos 30 dias; ou febre com icterícia rubínica, sufusão conjuntival ou hemorragia pulmonar.',
      'Confirmação: ELISA IgM a partir do 7º dia (repetir se negativa na 1ª semana) ou microaglutinação (MAT) com soroconversão; PCR na 1ª semana quando disponível.',
      'Laboratório sugestivo: leucocitose com neutrofilia, plaquetopenia, elevação de ureia e creatinina, hipocalemia, bilirrubina direta elevada com transaminases pouco elevadas, CPK aumentada.',
      'Notificação compulsória.'
    ],
    classificacaoGravidade: [
      { nivel: 'Leve (fase precoce)', criterios: 'Síndrome febril sem icterícia, sem disfunção renal, respiratória ou hemorragia, com hidratação oral adequada. Tratamento ambulatorial com antibiótico oral e retorno em 24 a 48 horas.' },
      { nivel: 'Moderada', criterios: 'Sinais de alerta clínicos ou laboratoriais (vômitos, desidratação, plaquetopenia, elevação discreta de creatinina, icterícia leve) sem falência orgânica. Internação com antibiótico parenteral e monitorização.' },
      { nivel: 'Grave (síndrome de Weil ou hemorragia pulmonar)', criterios: 'Icterícia com insuficiência renal, hemorragia pulmonar, insuficiência respiratória, choque, sangramento importante, arritmias ou alteração de consciência. UTI com suporte ventilatório e dialítico precoce.' }
    ],
    tratamento: [
      'Iniciar antibiótico assim que houver suspeita, preferencialmente na 1ª semana, sem aguardar confirmação laboratorial.',
      'Forma leve ambulatorial em crianças: amoxicilina 50 mg/kg/dia VO 8/8 h por 5 a 7 dias; doxiciclina pode ser usada em maiores de 8 anos conforme protocolo (100 mg 12/12 h por 5 a 7 dias).',
      'Forma moderada ou grave: penicilina cristalina 50.000 a 100.000 UI/kg/dia IV dividida 4/4 ou 6/6 h por 7 dias; alternativas ceftriaxona 80 a 100 mg/kg/dia IV ou ampicilina 50 a 100 mg/kg/dia IV 6/6 h.',
      'Hidratação venosa com cristaloides, monitorizando diurese e sinais de sobrecarga; corrigir hipocalemia.',
      'Insuficiência renal: diálise precoce em UTI (reduz letalidade).',
      'Hemorragia pulmonar: oxigênio, ventilação mecânica protetora precoce, suporte hemodinâmico.',
      'Antitérmico com paracetamol ou dipirona; evitar AAS e anti-inflamatórios.',
      'Transfusão de hemocomponentes conforme sangramento e coagulograma.'
    ],
    medicamentos: [
      { medId: 'amoxicilina', esquema: 'Forma leve: 50 mg/kg/dia VO dividida 8/8 h por 5 a 7 dias.' },
      { medId: 'doxiciclina', esquema: 'Maiores de 8 anos: 100 mg VO 12/12 h por 5 a 7 dias (2 a 4 mg/kg/dia), conforme protocolo do MS.' },
      { medId: 'penicilina_cristalina', esquema: 'Formas moderadas e graves: 50.000 a 100.000 UI/kg/dia IV, dividida 4/4 ou 6/6 h, por 7 dias.' },
      { medId: 'ceftriaxona', esquema: 'Alternativa nas formas graves: 80 a 100 mg/kg/dia IV, 1 a 2 vezes ao dia, por 7 dias.' },
      { medId: 'ampicilina', esquema: 'Alternativa: 50 a 100 mg/kg/dia IV dividida 6/6 h por 7 dias.' },
      { medId: 'soro_fisiologico', esquema: 'Expansão em hipotensão ou choque: 20 mL/kg em 20 min, reavaliar; cautela em hemorragia pulmonar.' }
    ],
    criteriosInternacao: [
      'Icterícia, oligúria, elevação de creatinina ou hipocalemia.',
      'Sintomas respiratórios, hemoptise ou alteração radiológica.',
      'Sangramentos, plaquetopenia importante ou hipotensão.',
      'Vômitos persistentes ou desidratação.',
      'Impossibilidade de retorno em 24 horas.'
    ],
    criteriosUTI: [
      'Hemorragia pulmonar ou insuficiência respiratória.',
      'Insuficiência renal aguda com indicação de diálise.',
      'Choque ou arritmias.',
      'Sangramento grave ou alteração de consciência.'
    ],
    criteriosAlta: [
      'Afebril, sem sangramentos e com diurese e função renal normais.',
      'Sem sintomas respiratórios.',
      'Completar antibiótico e agendar reavaliação de função renal.'
    ],
    orientacoes: [
      'Completar o antibiótico conforme prescrito.',
      'Retornar imediatamente se pele amarelada, tosse com sangue, falta de ar, diminuição da urina ou sangramento.',
      'Evitar contato com água de enchente ou igarapés contaminados; usar botas e luvas em limpeza pós-enchente.',
      'Armazenar alimentos protegidos de roedores, manter lixo fechado.',
      'Não deixar crianças brincarem em água de alagamento.'
    ],
    retorno: 'Casos ambulatoriais: reavaliação em 24 a 48 horas com exames (creatinina, plaquetas). Retorno imediato se sinais de alarme.',
    prevencao: [
      'Controle de roedores e acondicionamento adequado do lixo.',
      'Evitar contato com água e lama de enchentes; proteção com botas e luvas.',
      'Consumo de água tratada e lavagem de alimentos.',
      'Quimioprofilaxia com doxiciclina em exposição de alto risco apenas em maiores de 8 anos, conforme avaliação médica.',
      'Educação em saúde nas comunidades ribeirinhas e áreas alagáveis.'
    ],
    fontes: [
      { nome: 'Leptospirose: diagnóstico e manejo clínico – Ministério da Saúde', ano: 2014 },
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
      { nome: 'OMS – Human leptospirosis: guidance for diagnosis, surveillance and control', ano: 2003 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'leishmaniose_visceral',
    nome: 'Leishmaniose visceral (calazar)',
    categoria: 'amazonia',
    amazonia: true,
    cid10: 'B55.0',
    tags: ['febre', 'esplenomegalia', 'hepatomegalia', 'palidez', 'perda_peso', 'fraqueza', 'sangramento', 'edema', 'diarreia', 'tosse'],
    definicao: 'Doença infecciosa crônica causada por Leishmania infantum, transmitida por flebotomíneos, caracterizada por febre prolongada, esplenomegalia volumosa, pancitopenia e emagrecimento. Sem tratamento é potencialmente fatal, sobretudo em menores de 1 ano e desnutridos.',
    epidemiologia: 'Na região Norte a transmissão é mais intensa em Roraima (Boa Vista), Pará (Santarém, Belém) e Tocantins; no Amazonas os casos são menos frequentes, com registros em Manaus e municípios do interior, muitos importados. Deve ser considerada em crianças com febre prolongada e esplenomegalia, especialmente menores de 5 anos, desnutridas ou procedentes de áreas endêmicas. O cão é o principal reservatório urbano. O vetor Lutzomyia longipalpis prolifera em quintais com matéria orgânica e abrigos de animais.',
    agente: 'Leishmania (Leishmania) infantum (sinônimo L. chagasi), protozoário intracelular.',
    transmissao: 'Picada da fêmea de flebotomíneos (Lutzomyia longipalpis, conhecida como mosquito-palha ou birigui) infectada. Cão doméstico é o reservatório principal. Transmissão vertical e transfusional são raras.',
    incubacao: '10 dias a 24 meses (média 2 a 6 meses).',
    manifestacoes: [
      'Febre prolongada (mais de 2 semanas), irregular, muitas vezes com dois picos diários.',
      'Esplenomegalia volumosa e progressiva, com hepatomegalia.',
      'Palidez (anemia), emagrecimento, distensão abdominal e retardo de crescimento.',
      'Tosse seca, diarreia e inapetência.',
      'Edema de membros inferiores e hipoalbuminemia nas formas avançadas.',
      'Sangramentos (epistaxe, gengivorragia) por plaquetopenia.',
      'Infecções bacterianas associadas (pneumonia, otite, piodermite) por neutropenia.'
    ],
    sinaisAlarme: [
      'Sangramentos ou plaquetas abaixo de 50.000/mm3.',
      'Neutrófilos abaixo de 500/mm3 com febre ou infecção bacteriana associada.',
      'Icterícia, edema generalizado ou desnutrição grave.',
      'Dispneia, taquipneia ou pneumonia.',
      'Hemoglobina abaixo de 7 g/dL.',
      'Idade menor de 1 ano ou comorbidade (HIV, imunossupressão).'
    ],
    diagnosticoDiferencial: ['malaria', 'esquistossomose hepatoesplênica', 'leucemia e linfoma', 'doenca_chagas', 'febre tifoide', 'tuberculose', 'endocardite', 'histoplasmose', 'mononucleose', 'anemia hemolítica'],
    exames: ['hemograma', 'rk39', 'elisa_leishmaniose', 'aspirado de medula óssea (pesquisa direta ou cultura)', 'ast', 'alt', 'bilirrubinas', 'albumina e proteínas totais', 'coagulograma', 'ureia', 'creatinina', 'gota_espessa', 'hemocultura', 'radiografia_torax', 'sorologia HIV'],
    criteriosDiagnosticos: [
      'Caso suspeito: febre por mais de 7 dias com esplenomegalia, em procedente de área de transmissão, com ou sem anemia e emagrecimento.',
      'Confirmação: teste rápido rK39 ou ELISA (IFI) reagentes em caso clinicamente compatível; ou visualização de formas amastigotas em aspirado de medula óssea (padrão ouro); PCR quando disponível.',
      'Laboratório sugestivo: pancitopenia, VHS elevado, inversão albumina/globulina.',
      'Excluir malária e outras causas de esplenomegalia febril; investigar HIV.',
      'Notificação compulsória; investigar cão da residência.'
    ],
    classificacaoGravidade: [
      { nivel: 'Sem sinais de gravidade', criterios: 'Idade acima de 1 ano, sem sangramento, sem infecção associada, neutrófilos acima de 500/mm3, plaquetas acima de 50.000/mm3, Hb acima de 7 g/dL, sem edema, sem icterícia e sem comorbidade. Pode ser tratado em regime ambulatorial supervisionado ou hospital-dia se a droga permitir.' },
      { nivel: 'Com sinais de alerta', criterios: 'Idade menor de 1 ano ou comorbidade, desnutrição, plaquetopenia, neutropenia, Hb entre 5 e 7 g/dL, infecção bacteriana associada ou icterícia. Internação para tratamento com anfotericina B lipossomal e suporte.' },
      { nivel: 'Grave', criterios: 'Sangramento ativo, infecção bacteriana grave (sepse), Hb abaixo de 5 g/dL, edema generalizado, icterícia com disfunção hepática, insuficiência renal ou dispneia. Internação em unidade com suporte intensivo e hemotransfusão disponível.' }
    ],
    tratamento: [
      'Anfotericina B lipossomal é a primeira escolha em crianças, especialmente menores de 1 ano, desnutridos e casos com sinais de gravidade: 3 mg/kg/dia IV por 7 dias (dose total 21 mg/kg), ou esquemas encurtados conforme nota técnica vigente do MS; confirmar conforme protocolo.',
      'Antimoniato de meglumina (20 mg de Sb5+/kg/dia IV ou IM por 20 a 30 dias) é alternativa em crianças sem critérios de gravidade quando a anfotericina não estiver disponível, com monitorização de ECG, função renal e hepática; contraindicado em cardiopatas, nefropatas e menores de 1 ano.',
      'Anfotericina B desoxicolato (1 mg/kg/dia por 14 a 20 dias) é alternativa com maior toxicidade, exigindo internação e monitorização de função renal e potássio.',
      'Tratar infecções bacterianas associadas com antibiótico empírico (ceftriaxona ou oxacilina conforme foco) e neutropenia febril conforme protocolo.',
      'Suporte nutricional, transfusão de concentrado de hemácias se Hb abaixo de 5 a 7 g/dL sintomática, plaquetas se sangramento.',
      'Sulfato ferroso e vitamina A após controle da infecção conforme avaliação nutricional.',
      'Acompanhar com hemograma e avaliação de baço em 3, 6 e 12 meses (critérios de cura são clínicos: desaparecimento da febre, regressão do baço, ganho de peso e normalização do hemograma).'
    ],
    medicamentos: [
      { medId: 'anfotericina_b_lipossomal', esquema: '3 mg/kg/dia IV, infusão em 1 a 2 h, por 7 dias (dose total 21 mg/kg); confirmar esquema vigente e reconstituição conforme nota técnica do MS e bula.' },
      { medId: 'antimoniato_meglumina', esquema: '20 mg de Sb5+/kg/dia IV ou IM, 1 vez ao dia, por 20 a 30 dias; monitorar ECG (QT), amilase, função renal e hepática; contraindicado em menores de 1 ano e cardiopatas.' },
      { medId: null, nome: 'Anfotericina B desoxicolato', esquema: '1 mg/kg/dia IV (máximo 50 mg/dia) por 14 a 20 dias, infusão em 4 a 6 h, com monitorização de creatinina e potássio; confirmar conforme protocolo.' },
      { medId: 'ceftriaxona', esquema: 'Infecção bacteriana associada ou neutropenia febril: 80 a 100 mg/kg/dia IV, ajustar conforme foco e cultura.' },
      { medId: 'sulfato_ferroso', esquema: 'Anemia após controle da infecção: 3 a 5 mg/kg/dia de ferro elementar VO por 8 semanas ou mais, conforme protocolo.' }
    ],
    criteriosInternacao: [
      'Idade menor de 1 ano ou desnutrição moderada a grave.',
      'Plaquetas abaixo de 50.000/mm3, neutrófilos abaixo de 500/mm3 ou Hb abaixo de 7 g/dL.',
      'Sangramentos, edema, icterícia ou infecção bacteriana associada.',
      'Necessidade de anfotericina B (infusão hospitalar) ou impossibilidade de tratamento supervisionado ambulatorial.',
      'Comorbidades: HIV, cardiopatia, nefropatia.'
    ],
    criteriosUTI: [
      'Sepse ou choque séptico.',
      'Sangramento grave ou coagulação intravascular disseminada.',
      'Insuficiência respiratória.',
      'Insuficiência renal ou hepática graves.'
    ],
    criteriosAlta: [
      'Afebril por pelo menos 48 a 72 horas, sem infecção ativa.',
      'Esquema medicamentoso concluído ou continuidade garantida.',
      'Hemograma em recuperação, sem sangramentos.',
      'Ganho de peso e aceitação alimentar; seguimento agendado em 30 dias e depois trimestral até 12 meses.'
    ],
    orientacoes: [
      'A melhora é gradual: a febre cessa na 1ª semana, mas o baço e o hemograma levam meses para normalizar.',
      'Retornar imediatamente se febre, sangramento, palidez intensa ou dificuldade para respirar.',
      'Manter alimentação reforçada e suplementos prescritos.',
      'Comparecer às consultas de seguimento por 12 meses (risco de recidiva).',
      'Informar a vigilância para avaliação do cão da residência e controle vetorial.'
    ],
    retorno: 'Consultas de seguimento aos 30 dias e aos 3, 6 e 12 meses após o tratamento com hemograma; retorno imediato se febre, sangramento ou palidez.',
    prevencao: [
      'Controle vetorial: limpeza de quintais, remoção de matéria orgânica, telas de malha fina e mosquiteiros.',
      'Uso de coleiras repelentes em cães e avaliação de cães suspeitos pela vigilância.',
      'Repelentes adequados à idade e evitar exposição ao entardecer.',
      'Diagnóstico e tratamento precoces de casos humanos.'
    ],
    fontes: [
      { nome: 'Manual de Vigilância e Controle da Leishmaniose Visceral – Ministério da Saúde', ano: 2014 },
      { nome: 'Leishmaniose visceral: recomendações clínicas para redução da letalidade – Ministério da Saúde', ano: 2011 },
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
      { nome: 'OPAS/OMS – Manual de procedimentos para vigilância e controle das leishmanioses nas Américas', ano: 2019 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'leishmaniose_tegumentar',
    nome: 'Leishmaniose tegumentar americana',
    categoria: 'amazonia',
    amazonia: true,
    cid10: 'B55.1',
    tags: ['lesoes_pele', 'feridas', 'linfonodomegalia', 'picada_inseto', 'dor_local'],
    definicao: 'Doença infecciosa não contagiosa causada por protozoários do gênero Leishmania, que acomete pele (forma cutânea) e mucosas (forma mucosa), transmitida por flebotomíneos. A lesão típica é a úlcera indolor de bordas elevadas e fundo granuloso.',
    epidemiologia: 'O Amazonas é um dos estados com maior número de casos do país, com transmissão em áreas de mata, assentamentos, garimpos e comunidades ribeirinhas, inclusive em áreas periurbanas de Manaus (Zona Norte e Leste), Rio Preto da Eva, Presidente Figueiredo, Manacapuru, Itacoatiara e Alto Rio Negro. Na região predomina Leishmania (Viannia) guyanensis, com resposta insatisfatória ao antimoniato e melhor resposta à pentamidina; L. (V.) braziliensis também ocorre e está associada à forma mucosa. Crianças são acometidas quando moram em áreas de mata ou acompanham familiares em atividades extrativistas.',
    agente: 'Leishmania (Viannia) guyanensis (predominante no Amazonas), L. (V.) braziliensis, L. (L.) amazonensis, L. (V.) lainsoni, L. (V.) naiffi e L. (V.) shawi.',
    transmissao: 'Picada de fêmeas de flebotomíneos (Lutzomyia umbratilis, L. whitmani, L. flaviscutellata e outras), com maior atividade ao entardecer e à noite em áreas de mata. Reservatórios silvestres: preguiças, tamanduás, roedores e marsupiais. Não há transmissão pessoa a pessoa.',
    incubacao: '2 semanas a 3 meses (média 2 a 4 semanas); forma mucosa pode surgir meses a anos após a lesão cutânea.',
    manifestacoes: [
      'Forma cutânea localizada: pápula que evolui para úlcera indolor, arredondada, com bordas elevadas e bem delimitadas e fundo granuloso avermelhado, em áreas expostas.',
      'Lesões múltiplas, disseminadas ao longo de vasos linfáticos (linfangite nodular), comuns na infecção por L. guyanensis.',
      'Adenomegalia satélite (regional), às vezes precedendo a lesão.',
      'Forma cutânea disseminada: muitas lesões pequenas em várias regiões do corpo, com febre e mal-estar.',
      'Forma cutânea difusa (L. amazonensis): nódulos e placas infiltradas sem ulceração, anergia.',
      'Forma mucosa: obstrução e sangramento nasal, ulceração do septo, rouquidão, lesões em lábios, palato e laringe.',
      'Infecção bacteriana secundária da úlcera com dor e secreção purulenta.'
    ],
    sinaisAlarme: [
      'Lesões em mucosa nasal, oral ou laríngea (risco de destruição e dificuldade respiratória).',
      'Lesões múltiplas ou disseminadas com febre e comprometimento do estado geral.',
      'Lesões extensas na face, próximas aos olhos, ou em articulações.',
      'Sinais de infecção secundária grave (celulite, febre).',
      'Efeitos adversos do tratamento: arritmias, dor abdominal intensa (pancreatite), hipoglicemia (pentamidina).'
    ],
    diagnosticoDiferencial: ['impetigo e ectima', 'úlcera tropical e piodermites', 'esporotricose', 'paracoccidioidomicose', 'hanseniase', 'tuberculose cutânea', 'micobacterioses atípicas', 'cromomicose', 'neoplasias de pele', 'sífilis'],
    exames: ['pesquisa direta de amastigotas em raspado ou imprint da borda da lesão', 'histopatologia de biópsia de pele', 'cultura ou PCR para Leishmania', 'intradermorreação de Montenegro', 'hemograma', 'ast', 'alt', 'creatinina', 'amilase e lipase', 'glicemia', 'eletrocardiograma (durante tratamento)'],
    criteriosDiagnosticos: [
      'Caso suspeito: úlcera cutânea crônica (mais de 4 semanas) indolor com bordas elevadas, ou lesão mucosa nasal ou oral, em pessoa com exposição a área de mata.',
      'Confirmação parasitológica: visualização de amastigotas em exame direto (raspado ou imprint), histopatologia, cultura ou PCR (permite identificação da espécie).',
      'Confirmação clínico-epidemiológica: quadro compatível em área endêmica com intradermorreação de Montenegro positiva, quando o exame parasitológico for negativo ou indisponível.',
      'Avaliação de mucosas (rinoscopia e oroscopia) em todos os casos.',
      'Notificação compulsória.'
    ],
    classificacaoGravidade: [
      { nivel: 'Cutânea localizada', criterios: 'Uma ou poucas lesões (até 3, pequenas) sem acometimento mucoso, em local sem risco funcional. Tratamento ambulatorial com esquema sistêmico ou intralesional conforme protocolo.' },
      { nivel: 'Cutânea múltipla ou disseminada', criterios: 'Lesões numerosas, linfangite nodular, lesões grandes ou em face e articulações. Tratamento sistêmico supervisionado e reavaliação frequente.' },
      { nivel: 'Mucosa ou difusa', criterios: 'Acometimento de mucosas nasal, oral ou laríngea, ou forma difusa anérgica. Encaminhar a serviço de referência; tratamento sistêmico prolongado com monitorização; avaliar internação se dificuldade respiratória.' }
    ],
    tratamento: [
      'Na região amazônica com predomínio de L. guyanensis, o isetionato de pentamidina é opção de primeira linha para a forma cutânea localizada em maiores de 1 ano: 4 mg/kg IM ou IV em dias alternados, total de 3 doses (esquema do Manual do MS 2017), com monitorização de glicemia; confirmar conforme protocolo.',
      'Antimoniato de meglumina: 10 a 20 mg de Sb5+/kg/dia IV ou IM por 20 dias (forma cutânea) ou 30 dias (forma mucosa), máximo de 3 ampolas (1.215 mg de Sb5+) por dia, com ECG, função renal, hepática e pancreática semanais. Contraindicado em menores de 1 ano, cardiopatas, nefropatas e gestantes (usar anfotericina).',
      'Antimoniato intralesional pode ser usado em lesão única pequena em maiores de 12 anos conforme protocolo do MS.',
      'Miltefosina oral (incorporada ao SUS) é opção para forma cutânea em faixas etárias e pesos definidos pelo protocolo (avaliar indicação em crianças e contraindicação em gestantes); confirmar disponibilidade e dose conforme nota informativa do MS.',
      'Anfotericina B (lipossomal ou desoxicolato) para forma mucosa, falha terapêutica, gestantes, menores de 1 ano e cardiopatas, em serviço de referência.',
      'Cuidados locais: limpeza da lesão com soro fisiológico e curativo; tratar infecção bacteriana secundária com cefalexina ou amoxicilina.',
      'Critério de cura: epitelização completa das lesões em até 90 dias após o tratamento e regressão da infiltração e eritema em até 180 dias; forma mucosa requer avaliação otorrinolaringológica.'
    ],
    medicamentos: [
      { medId: null, nome: 'Isetionato de pentamidina', esquema: '4 mg/kg IM profundo ou IV lento em dias alternados, total de 3 doses, em maiores de 1 ano; monitorar glicemia antes e após cada dose; confirmar conforme Manual do MS.' },
      { medId: 'antimoniato_meglumina', esquema: '10 a 20 mg de Sb5+/kg/dia IV ou IM, 1 vez ao dia, por 20 dias (cutânea) ou 30 dias (mucosa); máximo 3 ampolas/dia; ECG, creatinina, transaminases e amilase semanais; contraindicado em menores de 1 ano.' },
      { medId: 'anfotericina_b_lipossomal', esquema: 'Forma mucosa, falha terapêutica ou contraindicação ao antimonial: dose diária e total conforme protocolo do MS (confirmar), em serviço de referência.' },
      { medId: null, nome: 'Miltefosina', esquema: 'VO por 28 dias, dose por peso conforme protocolo do MS (aproximadamente 2,5 mg/kg/dia, máximo 150 mg/dia); indicação e faixa etária conforme nota informativa vigente; contraindicada em gestantes.' },
      { medId: 'cefalexina', esquema: 'Infecção bacteriana secundária da lesão: 50 mg/kg/dia VO 6/6 h por 7 dias.' }
    ],
    criteriosInternacao: [
      'Forma mucosa com obstrução ou sangramento nasal importante, disfagia ou dispneia.',
      'Forma disseminada com febre e comprometimento do estado geral.',
      'Necessidade de anfotericina B ou monitorização de toxicidade do antimonial em criança com comorbidade.',
      'Reação adversa grave ao tratamento (arritmia, pancreatite, hipoglicemia grave).'
    ],
    criteriosUTI: [
      'Obstrução de via aérea por lesão laríngea.',
      'Arritmia grave induzida por antimonial.',
      'Sepse a partir de infecção secundária.'
    ],
    criteriosAlta: [
      'Esquema concluído ou continuidade ambulatorial garantida.',
      'Ausência de toxicidade medicamentosa relevante.',
      'Lesões em processo de epitelização.',
      'Retornos agendados para avaliação de cura em 30, 90 e 180 dias.'
    ],
    orientacoes: [
      'A lesão não é contagiosa; manter limpa e coberta com curativo.',
      'Comparecer a todas as aplicações do medicamento e aos exames de controle.',
      'Retornar se palpitações, dor abdominal forte, vômitos, tontura, desmaio ou piora da ferida.',
      'Observar sinais de acometimento nasal (obstrução, sangramento, crostas) mesmo anos após a cura.',
      'Usar roupas longas, repelente e mosquiteiro ao entrar na mata; evitar entrar na mata ao entardecer.'
    ],
    retorno: 'Reavaliação semanal durante o tratamento (clínica, ECG e exames) e após o término aos 30, 90 e 180 dias para critério de cura.',
    prevencao: [
      'Repelentes adequados à idade, roupas longas e mosquiteiros de malha fina em áreas de mata.',
      'Evitar atividades na mata ao entardecer e à noite.',
      'Manter área ao redor das casas limpa e afastada da mata (faixa de segurança).',
      'Diagnóstico e tratamento precoces para evitar forma mucosa.'
    ],
    fontes: [
      { nome: 'Manual de Vigilância da Leishmaniose Tegumentar – Ministério da Saúde', ano: 2017 },
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
      { nome: 'OPAS/OMS – Manual de procedimentos para vigilância e controle das leishmanioses nas Américas', ano: 2019 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'doenca_chagas',
    nome: 'Doença de Chagas aguda (transmissão oral)',
    categoria: 'amazonia',
    amazonia: true,
    cid10: 'B57.1',
    tags: ['febre', 'edema', 'exantema', 'hepatomegalia', 'esplenomegalia', 'dispneia', 'dor_abdominal', 'vomitos', 'linfonodomegalia', 'fraqueza', 'sangramento', 'cefaleia'],
    definicao: 'Infecção pelo protozoário Trypanosoma cruzi. Na Amazônia predomina a forma aguda por transmissão oral, em surtos familiares ou comunitários após consumo de açaí, bacaba ou patauá contaminados, com quadro febril prolongado, edema, hepatoesplenomegalia e risco de miocardite e meningoencefalite.',
    epidemiologia: 'A Amazônia Legal concentra mais de 90% dos casos agudos do Brasil, com maior número no Pará e casos no Amazonas (Manaus, Tefé, Coari, Carauari, Barcelos e outros municípios), com surtos ligados ao consumo de açaí ou bacaba processados sem higiene, principalmente entre agosto e novembro (safra do açaí na região). Triatomíneos silvestres (Rhodnius spp.) vivem em palmeiras e contaminam a polpa. O T. cruzi pode ser encontrado ocasionalmente em lâminas de gota espessa para malária, por isso microscopistas devem estar alertas. Também há transmissão vetorial esporádica e congênita.',
    agente: 'Trypanosoma cruzi (protozoário flagelado), com predomínio de TcIV e TcI na Amazônia.',
    transmissao: 'Oral (ingestão de alimentos contaminados com fezes ou triatomíneos triturados: açaí, bacaba, caldo de cana, caça), vetorial (fezes de triatomíneos após a picada), congênita, transfusional e por transplante.',
    incubacao: 'Oral: 3 a 22 dias. Vetorial: 4 a 15 dias. Transfusional: 30 a 40 dias.',
    manifestacoes: [
      'Febre prolongada (mais de 7 dias), muitas vezes vespertina, com calafrios e sudorese.',
      'Edema de face (às vezes bipalpebral bilateral) e de membros inferiores; na forma vetorial, sinal de Romaña (edema bipalpebral unilateral) ou chagoma de inoculação.',
      'Cefaleia, mialgia, astenia e inapetência.',
      'Hepatomegalia e esplenomegalia, adenomegalia generalizada.',
      'Exantema maculopapular ou urticariforme.',
      'Dor abdominal, vômitos, diarreia; icterícia e sangramento digestivo na forma oral grave.',
      'Miocardite: taquicardia desproporcional, dispneia, derrame pericárdico, arritmias; meningoencefalite em lactentes.',
      'Vários membros da mesma família com sintomas semelhantes após consumo do mesmo alimento (surto).'
    ],
    sinaisAlarme: [
      'Dispneia, taquicardia persistente, dor torácica, edema generalizado ou sinais de insuficiência cardíaca.',
      'Derrame pericárdico ou pleural.',
      'Arritmias, síncope ou alteração no ECG.',
      'Convulsões, sonolência ou sinais meníngeos.',
      'Sangramento digestivo, hematêmese ou melena.',
      'Icterícia ou hipotensão.'
    ],
    diagnosticoDiferencial: ['malaria', 'leptospirose', 'dengue', 'febre_amarela', 'leishmaniose_visceral', 'febre tifoide', 'mononucleose e citomegalovirose', 'toxoplasmose aguda', 'sepse', 'miocardite viral', 'glomerulonefrite'],
    exames: ['pesquisa direta de T. cruzi a fresco, gota espessa ou esfregaço (fase aguda)', 'gota_espessa', 'hemograma', 'sorologia para T. cruzi (ELISA, IFI, HAI) pareada', 'PCR para T. cruzi', 'ast', 'alt', 'cpk', 'eletrocardiograma', 'ecocardiograma', 'radiografia_torax', 'liquor', 'creatinina'],
    criteriosDiagnosticos: [
      'Caso suspeito: febre por mais de 7 dias com edema, hepatoesplenomegalia, adenomegalia, exantema ou miocardite, com história de consumo de açaí, bacaba ou outro alimento artesanal na Amazônia, ou contato com triatomíneo; especialmente se outros familiares estão doentes.',
      'Confirmação na fase aguda: visualização de tripomastigotas em exame direto a fresco, gota espessa, esfregaço ou método de concentração (micro-hematócrito, Strout).',
      'Sorologia IgM reagente ou soroconversão de IgG em amostras pareadas; PCR quando disponível.',
      'Avaliação cardíaca (ECG e ecocardiograma) e neurológica em todos os casos.',
      'Notificação imediata; investigar surto e a fonte alimentar.'
    ],
    classificacaoGravidade: [
      { nivel: 'Leve', criterios: 'Febre e sintomas gerais sem acometimento cardíaco ou neurológico, ECG normal, sem sangramento. Tratamento etiológico e acompanhamento ambulatorial próximo com ECG.' },
      { nivel: 'Moderada', criterios: 'Alterações discretas de ECG, derrame pericárdico pequeno, hepatite ou edema sem instabilidade. Internação para monitorização e início do tratamento.' },
      { nivel: 'Grave', criterios: 'Miocardite com insuficiência cardíaca, arritmias, derrame pericárdico volumoso ou tamponamento, meningoencefalite, sangramento digestivo, choque. Internação em UTI.' }
    ],
    tratamento: [
      'Tratamento etiológico está indicado em todos os casos de fase aguda e deve ser iniciado assim que houver confirmação (ou forte suspeita em surto).',
      'Benznidazol: crianças até 12 anos 5 a 10 mg/kg/dia VO dividido em 2 tomadas por 60 dias; acima de 12 anos 5 mg/kg/dia (máximo 300 mg/dia) por 60 dias, conforme PCDT do MS 2018. Monitorar hemograma, transaminases e reações cutâneas.',
      'Nifurtimox (10 a 15 mg/kg/dia VO em 3 tomadas por 60 dias) é alternativa em caso de intolerância ao benznidazol, conforme disponibilidade (Ministério da Saúde).',
      'Miocardite: repouso, restrição hídrica, diuréticos e manejo de insuficiência cardíaca em ambiente hospitalar; drenagem de derrame pericárdico se tamponamento.',
      'Meningoencefalite: suporte em UTI, controle de convulsões e pressão intracraniana.',
      'Antitérmicos e hidratação; evitar anti-inflamatórios em sangramento.',
      'Controle de cura: sorologia após o tratamento e seguimento clínico com ECG anual.'
    ],
    medicamentos: [
      { medId: 'benznidazol', esquema: 'Crianças até 12 anos: 5 a 10 mg/kg/dia VO dividido em 2 tomadas por 60 dias (comprimidos de 12,5 mg e 100 mg). Maiores de 12 anos: 5 mg/kg/dia (máximo 300 mg/dia) por 60 dias. Monitorar hemograma e transaminases; suspender se dermatite grave, neuropatia ou leucopenia importante.' },
      { medId: null, nome: 'Nifurtimox', esquema: '10 a 15 mg/kg/dia VO em 3 tomadas por 60 dias, alternativa ao benznidazol, conforme PCDT do MS.' },
      { medId: 'paracetamol', esquema: 'Febre e dor: 10 a 15 mg/kg/dose VO a cada 6 h, conforme bula.' },
      { medId: 'diazepam', esquema: 'Convulsões na meningoencefalite: 0,2 a 0,3 mg/kg IV lento (máximo 10 mg), conforme protocolo.' }
    ],
    criteriosInternacao: [
      'Qualquer sinal de acometimento cardíaco (ECG alterado, derrame pericárdico, taquicardia persistente, dispneia).',
      'Sinais neurológicos ou meníngeos.',
      'Sangramento digestivo, icterícia ou desidratação.',
      'Lactentes menores de 1 ano ou desnutridos.',
      'Início do tratamento em casos moderados para monitorização de reações adversas.'
    ],
    criteriosUTI: [
      'Insuficiência cardíaca, arritmias graves ou tamponamento cardíaco.',
      'Meningoencefalite com rebaixamento de consciência.',
      'Choque ou sangramento grave.'
    ],
    criteriosAlta: [
      'Afebril e hemodinamicamente estável, com ECG e ecocardiograma sem progressão.',
      'Tolerância ao benznidazol confirmada nos primeiros dias.',
      'Seguimento agendado com exames em 15 dias, 30 dias e ao final dos 60 dias.'
    ],
    orientacoes: [
      'Tomar o benznidazol nos horários corretos por 60 dias; não interromper sem orientação.',
      'Retornar se manchas na pele, coceira intensa, febre, formigamento ou dor nas pernas, palpitações, falta de ar ou inchaço.',
      'Evitar bebidas alcoólicas e uso de outros medicamentos sem orientação durante o tratamento (adolescentes).',
      'Consumir açaí e bacaba somente de fonte com boas práticas de higiene (lavagem dos frutos, branqueamento ou pasteurização).',
      'Comunicar familiares que consumiram o mesmo alimento para avaliação e exames.'
    ],
    retorno: 'Reavaliação em 7, 15, 30 e 60 dias durante o tratamento com hemograma e transaminases; ECG e sorologia após o término; seguimento anual.',
    prevencao: [
      'Boas práticas no processamento do açaí e da bacaba: lavagem, branqueamento térmico da polpa, refrigeração.',
      'Selo de qualidade e fiscalização de batedeiras de açaí.',
      'Proteção de alimentos e utensílios contra triatomíneos, com iluminação afastada das áreas de preparo.',
      'Triagem de gestantes e doadores de sangue.',
      'Vigilância entomológica e notificação de triatomíneos encontrados nas casas.'
    ],
    fontes: [
      { nome: 'Protocolo Clínico e Diretrizes Terapêuticas da Doença de Chagas – Ministério da Saúde/CONITEC', ano: 2018 },
      { nome: 'II Consenso Brasileiro em Doença de Chagas – SBMT', ano: 2016 },
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'tuberculose',
    nome: 'Tuberculose na infância',
    categoria: 'amazonia',
    amazonia: true,
    cid10: 'A15-A16',
    tags: ['tosse', 'febre', 'perda_peso', 'sudorese', 'fraqueza', 'linfonodomegalia', 'dispneia', 'rigidez_nuca', 'alteracao_consciencia', 'convulsao'],
    definicao: 'Doença infecciosa crônica causada pelo Mycobacterium tuberculosis. Na criança é geralmente paucibacilar, com quadro clínico e radiológico inespecífico, o que torna o diagnóstico baseado em sistema de pontuação (escore do MS) que combina clínica, radiologia, contato, prova tuberculínica e estado nutricional. Formas graves (meningoencefálica e miliar) são mais comuns em menores de 2 anos não vacinados.',
    epidemiologia: 'O Amazonas apresenta uma das maiores incidências de tuberculose do Brasil, concentrada em Manaus (bairros periféricos, população em situação de rua, privados de liberdade) e com incidência muito elevada em povos indígenas (Alto Rio Negro, Yanomami, Vale do Javari) e comunidades ribeirinhas. O caso pediátrico quase sempre indica contato recente com adulto bacilífero no domicílio: sempre investigar os contatos. Coinfecção com HIV e desnutrição aumentam a gravidade.',
    agente: 'Mycobacterium tuberculosis (bacilo de Koch).',
    transmissao: 'Via aérea, por inalação de aerossóis eliminados por pessoa com tuberculose pulmonar ou laríngea bacilífera (geralmente adulto ou adolescente do convívio). Crianças pequenas raramente transmitem.',
    incubacao: '4 a 12 semanas até a infecção primária; a doença pode surgir meses a anos após, com maior risco nos primeiros 2 anos após a infecção.',
    manifestacoes: [
      'Febre baixa persistente (mais de 15 dias), geralmente vespertina, com sudorese noturna.',
      'Tosse por mais de 2 semanas sem melhora com tratamento habitual de pneumonia.',
      'Perda ou não ganho de peso, inapetência, irritabilidade e apatia.',
      'Adenomegalia cervical persistente, indolor, podendo fistulizar.',
      'Sibilância ou estridor por compressão brônquica ganglionar em lactentes.',
      'Radiografia com adenomegalia hilar ou mediastinal, condensação persistente, padrão miliar, atelectasia ou derrame pleural.',
      'Forma meningoencefálica: febre, vômitos, cefaleia, irritabilidade evoluindo em 1 a 3 semanas para sonolência, convulsões, paralisia de nervos cranianos e coma.',
      'Formas extrapulmonares: ganglionar, pleural, osteoarticular (mal de Pott), abdominal, ocular.'
    ],
    sinaisAlarme: [
      'Alteração de consciência, convulsões, rigidez de nuca ou paralisia de nervos cranianos (meningoencefalite tuberculosa).',
      'Insuficiência respiratória, padrão miliar ou derrame pleural volumoso.',
      'Desnutrição grave ou perda de peso rápida.',
      'Criança menor de 2 anos não vacinada com BCG em contato com bacilífero.',
      'Coinfecção com HIV.',
      'Hemoptise ou dor torácica intensa.'
    ],
    diagnosticoDiferencial: ['pneumonia', 'asma', 'bronquiolite', 'micoses sistêmicas (histoplasmose, paracoccidioidomicose)', 'linfoma', 'leishmaniose_visceral', 'meningite', 'infecção por micobactérias não tuberculosas', 'pneumonia aspirativa e corpo estranho'],
    exames: ['radiografia_torax', 'prova_tuberculinica', 'teste_rapido_molecular_tb', 'baciloscopia', 'cultura para micobactéria (escarro, lavado gástrico ou escarro induzido)', 'hemograma', 'vhs', 'liquor', 'tomografia de tórax ou crânio', 'sorologia HIV', 'ast', 'alt'],
    criteriosDiagnosticos: [
      'Sistema de pontuação do MS para crianças e adolescentes com baciloscopia ou TRM-TB negativos ou indisponíveis: quadro clínico-radiológico (febre ou sintomas por 2 semanas ou mais: 15 pontos; assintomático ou sintomas por menos de 2 semanas: 0; infecção respiratória com melhora após antibiótico: -10), radiografia (adenomegalia hilar, padrão miliar, condensação ou infiltrado por mais de 2 semanas sem melhora com antibióticos: 15; condensação ou infiltrado de qualquer tipo por menos de 2 semanas: 5; normal: -5), contato com adulto com tuberculose nos últimos 2 anos (10), prova tuberculínica de 5 a 9 mm (5) ou 10 mm ou mais (10), desnutrição grave (5).',
      'Interpretação: 40 pontos ou mais: diagnóstico muito provável, iniciar tratamento; 30 a 35 pontos: possível, indicativo de tratamento a critério clínico; 25 pontos ou menos: pouco provável, prosseguir investigação.',
      'Confirmação bacteriológica sempre que possível: TRM-TB, baciloscopia e cultura em escarro, escarro induzido ou lavado gástrico (3 amostras em jejum). Resultado negativo não exclui a doença na criança.',
      'Meningoencefalite: líquor com pleocitose linfomonocitária, proteína elevada e glicose baixa; TRM-TB e cultura do líquor.',
      'Investigar HIV em todos os casos. Notificação compulsória.'
    ],
    classificacaoGravidade: [
      { nivel: 'Forma pulmonar ou ganglionar não grave', criterios: 'Doença limitada, sem insuficiência respiratória, sem desnutrição grave, sem acometimento do SNC. Tratamento ambulatorial com esquema básico de 6 meses e tratamento diretamente observado.' },
      { nivel: 'Forma extensa ou com fatores de risco', criterios: 'Doença pulmonar extensa, derrame pleural, desnutrição moderada, coinfecção HIV, menor de 1 ano ou hepatopatia. Avaliar internação inicial e monitorização de hepatotoxicidade.' },
      { nivel: 'Forma grave', criterios: 'Meningoencefalite, tuberculose miliar, insuficiência respiratória, osteoarticular com déficit neurológico ou tuberculose resistente. Internação, esquema prolongado (12 meses) e corticoide conforme indicação.' }
    ],
    tratamento: [
      'Esquema básico em menores de 10 anos: 2 meses de rifampicina + isoniazida + pirazinamida (RHZ) seguidos de 4 meses de rifampicina + isoniazida (RH), com comprimidos dispersíveis pediátricos em dose fixa combinada (RHZ 75/50/150 mg e RH 75/50 mg) por faixa de peso: 4 a 7 kg: 1 comprimido; 8 a 11 kg: 2; 12 a 15 kg: 3; 16 a 24 kg: 4; 25 kg ou mais: esquema de adulto (confirmar tabela do MS).',
      'Doses por peso quando necessário: rifampicina 15 mg/kg/dia (10 a 20), isoniazida 10 mg/kg/dia (7 a 15), pirazinamida 35 mg/kg/dia (30 a 40), etambutol 20 mg/kg/dia (15 a 25), em dose única diária em jejum.',
      'Maiores de 10 anos: RHZE por 2 meses (comprimido 150/75/400/275 mg por faixa de peso) seguido de RH por 4 meses.',
      'Meningoencefalite e osteoarticular: 2 meses RHZ (ou RHZE) e 10 meses RH (total 12 meses); na meningoencefalite associar prednisona 1 a 2 mg/kg/dia por 4 semanas com redução gradual (ou dexametasona nos casos graves).',
      'Tratamento diretamente observado (TDO) e consultas mensais com peso para ajuste de dose.',
      'Investigar e tratar contatos; iniciar tratamento da infecção latente (isoniazida 10 mg/kg/dia por 6 meses ou rifampicina 15 mg/kg/dia por 4 meses) em contatos infectados sem doença ativa.',
      'Piridoxina em desnutridos, HIV e adolescentes gestantes que usam isoniazida.',
      'Monitorar hepatotoxicidade (icterícia, vômitos) e acuidade visual com etambutol.',
      'Falência ou resistência: encaminhar à referência terciária (esquemas para TB multirresistente).'
    ],
    medicamentos: [
      { medId: 'rifampicina', esquema: '15 mg/kg/dia (10 a 20 mg/kg) VO em jejum, máximo 600 mg/dia, por 6 meses (12 meses na forma meningoencefálica), preferencialmente em dose fixa combinada por faixa de peso.' },
      { medId: 'isoniazida', esquema: '10 mg/kg/dia (7 a 15 mg/kg) VO, máximo 300 mg/dia, por todo o tratamento. Infecção latente: 10 mg/kg/dia por 6 meses (180 doses).' },
      { medId: 'pirazinamida', esquema: '35 mg/kg/dia (30 a 40 mg/kg) VO, máximo 1.500 mg/dia, nos 2 primeiros meses.' },
      { medId: 'etambutol', esquema: '20 mg/kg/dia (15 a 25 mg/kg) VO nos 2 primeiros meses, indicado a partir de 10 anos; em menores apenas em situações especiais conforme referência.' },
      { medId: 'prednisolona', esquema: 'Meningoencefalite tuberculosa: 1 a 2 mg/kg/dia (máximo 40 mg) por 4 semanas com retirada gradual; também em formas pleurais ou ganglionares com compressão, conforme protocolo.' },
      { medId: 'dexametasona', esquema: 'Meningoencefalite grave: 0,3 a 0,4 mg/kg/dia IV por 2 a 4 semanas com redução gradual, conforme protocolo do serviço.' }
    ],
    criteriosInternacao: [
      'Meningoencefalite, forma miliar ou insuficiência respiratória.',
      'Desnutrição grave ou intolerância oral aos medicamentos.',
      'Reações adversas graves (hepatite medicamentosa com icterícia).',
      'Situação social que impeça o tratamento supervisionado inicial (avaliar com serviço social).',
      'Necessidade de procedimentos diagnósticos (lavado gástrico seriado, biópsia) em comunidades sem acesso.'
    ],
    criteriosUTI: [
      'Meningoencefalite com rebaixamento de consciência, hipertensão intracraniana ou hidrocefalia.',
      'Insuficiência respiratória (miliar, derrame volumoso, pneumotórax).',
      'Choque ou sepse associada.',
      'Estado de mal epiléptico.'
    ],
    criteriosAlta: [
      'Estabilidade clínica e tolerância aos medicamentos.',
      'Tratamento diretamente observado organizado na unidade básica de referência.',
      'Contatos identificados e encaminhados.',
      'Retorno mensal agendado com peso e exames de controle.'
    ],
    orientacoes: [
      'Dar os comprimidos todos os dias em jejum, no mesmo horário, por todo o período (6 meses ou mais), mesmo que a criança pareça curada.',
      'A urina, lágrimas e saliva podem ficar alaranjadas pela rifampicina; isso é esperado.',
      'Retornar imediatamente se vômitos, dor abdominal, pele ou olhos amarelados, manchas na pele ou piora da tosse.',
      'Todos os moradores da casa devem ser avaliados na unidade de saúde, especialmente quem tosse há mais de 3 semanas.',
      'Manter alimentação adequada e comparecer às consultas mensais para ajustar a dose ao peso.'
    ],
    retorno: 'Consulta mensal durante todo o tratamento com peso e avaliação clínica; radiografia ao final do 2º mês e ao término; retorno imediato se sinais de hepatotoxicidade.',
    prevencao: [
      'Vacina BCG ao nascer (protege contra formas graves: miliar e meníngea).',
      'Busca ativa e tratamento de adultos sintomáticos respiratórios no domicílio e na comunidade.',
      'Avaliação de contatos e tratamento da infecção latente (isoniazida ou rifampicina).',
      'Recém-nascido de mãe bacilífera: quimioprofilaxia primária conforme protocolo do MS antes da BCG.',
      'Ventilação e iluminação das casas; redução de aglomeração.'
    ],
    fontes: [
      { nome: 'Manual de Recomendações para o Controle da Tuberculose no Brasil – Ministério da Saúde', ano: 2019 },
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
      { nome: 'OMS – WHO consolidated guidelines on tuberculosis: management of tuberculosis in children and adolescents', ano: 2022 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'hanseniase',
    nome: 'Hanseníase',
    categoria: 'amazonia',
    amazonia: true,
    cid10: 'A30',
    tags: ['lesoes_pele', 'fraqueza', 'feridas', 'edema', 'febre', 'linfonodomegalia', 'dor_local'],
    definicao: 'Doença infecciosa crônica causada pelo Mycobacterium leprae, que acomete pele e nervos periféricos, podendo causar incapacidades físicas se não tratada precocemente. O diagnóstico é essencialmente clínico e o tratamento é a poliquimioterapia única (PQT-U) com rifampicina, clofazimina e dapsona.',
    epidemiologia: 'O Brasil é o segundo país em número de casos no mundo. A região Norte tem alta endemicidade; no Amazonas os coeficientes são moderados, com maior detecção em Manaus, Parintins, Tefé, Manacapuru e municípios do sul do estado (Humaitá, Lábrea). Caso em menor de 15 anos indica transmissão recente e ativa na comunidade e é evento de vigilância. Crianças adoecem geralmente por contato domiciliar prolongado com caso multibacilar não tratado; o exame de contatos é fundamental.',
    agente: 'Mycobacterium leprae (bacilo de Hansen); M. lepromatosis raramente.',
    transmissao: 'Vias aéreas superiores (gotículas de nariz e boca) de pessoa com forma multibacilar não tratada, em contato próximo e prolongado. O tratamento interrompe a transmissão nas primeiras doses.',
    incubacao: 'Longo: em média 2 a 7 anos (pode ser mais curto em crianças, a partir de 1 ano).',
    manifestacoes: [
      'Manchas hipocrômicas, eritematosas ou acastanhadas com alteração de sensibilidade (térmica, dolorosa ou tátil), sem prurido, que não melhoram com tratamentos comuns.',
      'Placas, pápulas, nódulos ou infiltração difusa da pele (formas multibacilares); madarose (perda de sobrancelhas).',
      'Áreas com diminuição de suor ou pelos.',
      'Dormência, formigamento ou fraqueza em mãos, pés e face; dor ou espessamento de nervos periféricos (ulnar, fibular, tibial posterior, auricular).',
      'Feridas ou queimaduras indolores em mãos e pés; garras e pé caído em casos avançados.',
      'Em crianças, a forma mais comum é uma lesão única hipocrômica (indeterminada ou tuberculoide), muitas vezes na face ou membros.',
      'Reações hansênicas: tipo 1 (piora das lesões com edema, neurite) e tipo 2 (eritema nodoso, febre, mal-estar, neurite), antes, durante ou após o tratamento.'
    ],
    sinaisAlarme: [
      'Neurite aguda: dor espontânea ou à palpação do nervo, perda súbita de força ou sensibilidade (urgência para prevenir incapacidade).',
      'Reação tipo 2 com febre alta, nódulos dolorosos, artrite, orquite ou irite.',
      'Lesão ocular: dor, hiperemia, diminuição da acuidade visual, lagoftalmo.',
      'Úlceras plantares ou lesões traumáticas infectadas em área anestésica.',
      'Icterícia, anemia grave ou reações cutâneas graves durante a PQT (efeitos adversos de dapsona ou rifampicina).'
    ],
    diagnosticoDiferencial: ['pitiríase versicolor', 'pitiríase alba', 'dermatite seborreica e eczemas', 'vitiligo', 'tinha do corpo', 'nevo acrômico', 'leishmaniose_tegumentar', 'esclerodermia localizada', 'neuropatias periféricas de outras causas', 'sífilis'],
    exames: ['exame dermatoneurológico completo (sensibilidade térmica, dolorosa e tátil; palpação de nervos)', 'baciloscopia', 'avaliação do grau de incapacidade física e função neural simplificada', 'histopatologia de pele (casos duvidosos)', 'hemograma', 'ast', 'alt', 'glicemia', 'teste de G6PD quando disponível (antes da dapsona)', 'sorologia anti-PGL-1 (contatos, quando disponível)'],
    criteriosDiagnosticos: [
      'Caso de hanseníase: pessoa com um ou mais dos seguintes sinais cardinais: lesão de pele com alteração de sensibilidade; espessamento de nervo periférico com alteração sensitiva ou motora; baciloscopia positiva ou histopatologia compatível.',
      'Classificação operacional pela contagem de lesões e baciloscopia: paucibacilar (até 5 lesões e baciloscopia negativa) ou multibacilar (mais de 5 lesões, ou baciloscopia positiva, ou espessamento de mais de 1 nervo).',
      'Avaliação do grau de incapacidade física (0, 1 ou 2) no diagnóstico, ao término e na alta.',
      'Exame de todos os contatos domiciliares e sociais com aplicação de BCG conforme protocolo.',
      'Notificação compulsória; caso em menor de 15 anos exige investigação da fonte.'
    ],
    classificacaoGravidade: [
      { nivel: 'Paucibacilar sem incapacidade', criterios: 'Até 5 lesões, baciloscopia negativa, sem espessamento neural ou grau 0 de incapacidade. PQT-U por 6 meses (6 doses supervisionadas) na atenção básica.' },
      { nivel: 'Multibacilar ou com neurite', criterios: 'Mais de 5 lesões, baciloscopia positiva ou acometimento neural, grau 1 de incapacidade ou reação hansênica leve. PQT-U por 12 meses (12 doses); tratamento de reações com corticoide e acompanhamento neural mensal.' },
      { nivel: 'Com incapacidade grau 2, reação grave ou complicação', criterios: 'Deformidade visível, úlceras, lagoftalmo, neurite refratária, reação tipo 2 grave, efeitos adversos graves da PQT. Encaminhar à referência; considerar internação para pulsoterapia, cirurgia de nervo ou tratamento de úlcera.' }
    ],
    tratamento: [
      'Poliquimioterapia única (PQT-U) com rifampicina + clofazimina + dapsona para todos os casos: paucibacilar 6 doses mensais supervisionadas (em até 9 meses) e multibacilar 12 doses mensais supervisionadas (em até 18 meses), conforme PCDT 2022.',
      'Crianças de 30 a 50 kg: rifampicina 450 mg mensal; clofazimina 150 mg mensal e 50 mg em dias alternados; dapsona 50 mg mensal e 50 mg diária.',
      'Crianças com menos de 30 kg: dose por peso: rifampicina 10 mg/kg mensal; clofazimina 6 mg/kg mensal e 1 mg/kg/dia (ou em dias alternados conforme tabela); dapsona 2 mg/kg mensal e 2 mg/kg/dia (máximo 50 mg/dia). Confirmar conforme tabela do PCDT.',
      'Reação tipo 1 e neurite: prednisona 1 mg/kg/dia VO com redução gradual ao longo de semanas; imobilização do membro e avaliação neural seriada.',
      'Reação tipo 2: prednisona 1 mg/kg/dia; talidomida é contraindicada em mulheres em idade fértil e requer protocolo específico; em crianças usar corticoide e encaminhar à referência.',
      'Prevenção de incapacidades: autocuidado de olhos, mãos e pés, exame neurológico simplificado a cada consulta, calçados adequados.',
      'Monitorar efeitos adversos: anemia hemolítica e metemoglobinemia (dapsona), hepatotoxicidade (rifampicina), hiperpigmentação e ressecamento da pele (clofazimina).',
      'Alta por cura ao completar as doses no prazo; seguimento pós-alta para reações e incapacidades.'
    ],
    medicamentos: [
      { medId: 'rifampicina', esquema: 'Dose mensal supervisionada: 450 mg (30 a 50 kg) ou 10 mg/kg (menos de 30 kg); 600 mg acima de 50 kg. Por 6 (PB) ou 12 (MB) meses.' },
      { medId: 'clofazimina', esquema: '30 a 50 kg: 150 mg mensal supervisionada + 50 mg em dias alternados. Menos de 30 kg: 6 mg/kg mensal + 1 mg/kg/dia (confirmar tabela do PCDT 2022).' },
      { medId: 'dapsona', esquema: '30 a 50 kg: 50 mg mensal supervisionada + 50 mg/dia. Menos de 30 kg: 2 mg/kg mensal + 2 mg/kg/dia (máximo 50 mg/dia). Suspender se anemia hemolítica grave ou síndrome de hipersensibilidade.' },
      { medId: 'prednisolona', esquema: 'Reações hansênicas e neurite: 1 mg/kg/dia VO (máximo 60 mg) com redução gradual conforme resposta neural, sob proteção gástrica e controle de peso e pressão arterial.' }
    ],
    criteriosInternacao: [
      'Reação hansênica grave (tipo 2 com febre alta, orquite, irite, neurite intensa) sem resposta ambulatorial.',
      'Efeitos adversos graves da PQT (hepatite, anemia hemolítica grave, síndrome de hipersensibilidade à dapsona).',
      'Úlceras infectadas com celulite ou osteomielite.',
      'Necessidade de cirurgia de descompressão neural ou pulsoterapia.'
    ],
    criteriosUTI: [
      'Síndrome de hipersensibilidade à dapsona com disfunção orgânica.',
      'Sepse a partir de úlcera infectada.',
      'Reação tipo 2 grave com comprometimento sistêmico (rara em crianças).'
    ],
    criteriosAlta: [
      'Controle da reação ou do efeito adverso com esquema oral definido.',
      'Plano de autocuidado e prevenção de incapacidades orientado.',
      'Continuidade da PQT-U garantida na unidade básica.'
    ],
    orientacoes: [
      'A hanseníase tem cura; tomar a dose supervisionada mensal na unidade e as doses diárias em casa sem falhas.',
      'A pele pode escurecer e ressecar (clofazimina) e a urina ficar alaranjada (rifampicina); isso desaparece após o tratamento.',
      'Retornar imediatamente se dor nos nervos, perda de força, formigamento, olho vermelho, febre ou nódulos dolorosos.',
      'Proteger mãos, pés e olhos: examinar diariamente, usar calçados e evitar queimaduras; hidratar a pele.',
      'Todos os moradores da casa devem ser examinados e receber BCG conforme orientação.'
    ],
    retorno: 'Consulta mensal para dose supervisionada e avaliação neurológica simplificada; avaliação do grau de incapacidade no início, a cada 3 meses e na alta; seguimento pós-alta por 5 anos nas formas multibacilares.',
    prevencao: [
      'Exame de contatos domiciliares e sociais com vacinação BCG (1 dose) conforme protocolo.',
      'Diagnóstico e tratamento precoces de casos multibacilares para interromper a transmissão.',
      'Busca ativa em escolas e comunidades de áreas endêmicas.',
      'Educação em saúde para reduzir estigma e abandono do tratamento.'
    ],
    fontes: [
      { nome: 'Protocolo Clínico e Diretrizes Terapêuticas da Hanseníase – Ministério da Saúde', ano: 2022 },
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
      { nome: 'OMS – Guidelines for the diagnosis, treatment and prevention of leprosy', ano: 2018 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'acidente_ofidico',
    nome: 'Acidente ofídico (botrópico, crotálico, laquético, elapídico)',
    categoria: 'amazonia',
    amazonia: true,
    cid10: 'T63.0',
    tags: ['mordedura_animal', 'dor_local', 'edema', 'sangramento', 'reducao_diurese', 'fraqueza', 'alteracao_consciencia', 'dispneia', 'vomitos', 'feridas', 'sudorese'],
    definicao: 'Envenenamento por serpentes peçonhentas. No Brasil, os gêneros Bothrops (jararacas), Crotalus (cascavel), Lachesis (surucucu) e Micrurus (corais) produzem síndromes distintas. O tratamento específico é a soroterapia antiveneno, cuja dose depende da gravidade e NÃO do peso: crianças recebem o mesmo número de ampolas que adultos e evoluem com maior gravidade pela menor massa corporal.',
    epidemiologia: 'A região Norte tem a maior incidência de acidentes ofídicos do país. No Amazonas predominam os acidentes botrópicos por Bothrops atrox (jararaca-do-norte), responsável por mais de 85% dos casos, seguidos pelos laquéticos (Lachesis muta, surucucu-pico-de-jaca, em áreas de mata) e elapídicos (Micrurus spp.). Crotalus durissus é rara no Amazonas, restrita a áreas de savana (Humaitá e fronteiras com Roraima). Os acidentes ocorrem em ribeirinhos, extrativistas, agricultores e crianças que brincam descalças, com pico na cheia dos rios (novembro a maio), quando as serpentes se aproximam das casas. A distância até o soro é o principal determinante de gravidade; soro está disponível em polos de referência e vem sendo descentralizado para municípios e comunidades.',
    agente: 'Bothrops atrox e outras jararacas (veneno proteolítico, coagulante e hemorrágico); Lachesis muta (proteolítico, coagulante, hemorrágico e neurotóxico vagal); Micrurus spp. (neurotóxico); Crotalus durissus (neurotóxico, miotóxico e coagulante).',
    transmissao: 'Inoculação de veneno pela picada (mordedura) da serpente, geralmente em membros inferiores; a picada pode ser seca (sem envenenamento).',
    incubacao: 'Efeitos locais botrópicos em minutos; coagulopatia em 1 a 4 horas; sinais neurológicos crotálicos e elapídicos em 30 minutos a 6 horas; observação mínima de 12 a 24 horas em toda picada.',
    manifestacoes: [
      'Botrópico: dor, edema progressivo, equimose e sangramento no local; bolhas e necrose; sangramentos à distância (gengivorragia, hematúria, epistaxe); tempo de coagulação alterado; hipotensão, insuficiência renal aguda e infecção secundária nas formas graves.',
      'Laquético: quadro semelhante ao botrópico com edema intenso, mais sinais vagais: bradicardia, hipotensão, diarreia, dor abdominal, sudorese e vômitos.',
      'Crotálico: pouca dor e edema local; fácies miastênica (ptose palpebral, diplopia, oftalmoplegia, visão turva) em 1 a 6 horas; mialgia generalizada, urina escura (mioglobinúria), oligúria e insuficiência renal; coagulopatia.',
      'Elapídico: dor local discreta ou ausente; ptose, diplopia, dificuldade para engolir, sialorreia, fraqueza muscular progressiva e insuficiência respiratória por paralisia, em minutos a horas.',
      'Sinais gerais: náuseas, vômitos, sudorese, taquicardia, ansiedade.',
      'Reações à soroterapia: urticária, broncoespasmo, hipotensão (anafilaxia precoce) e doença do soro (5 a 24 dias após).'
    ],
    sinaisAlarme: [
      'Edema que ultrapassa o segmento picado ou atinge todo o membro, bolhas, necrose ou síndrome compartimental.',
      'Sangramento em locais distantes da picada (gengiva, urina, vômito, fezes, pele).',
      'Ptose palpebral, visão dupla, dificuldade de engolir ou de respirar, voz fraca.',
      'Urina escura ou redução de diurese.',
      'Hipotensão, bradicardia, extremidades frias ou alteração de consciência.',
      'Tempo de coagulação incoagulável (maior que 30 minutos).',
      'Picada em criança pequena, em face, pescoço ou tronco, ou demora superior a 6 horas para chegar ao serviço.'
    ],
    diagnosticoDiferencial: ['escorpionismo', 'araneismo', 'acidente por serpente não peçonhenta', 'celulite e abscesso', 'trauma local', 'reação alérgica', 'miastenia (crotálico)', 'botulismo (elapídico)'],
    exames: ['tempo_coagulacao', 'coagulograma', 'hemograma', 'ureia', 'creatinina', 'potassio', 'cpk', 'urina_1', 'gasometria', 'eletrolitos', 'eletrocardiograma (laquético e crotálico)', 'radiografia_torax'],
    criteriosDiagnosticos: [
      'História de picada de serpente com marcas de presas e manifestações locais ou sistêmicas compatíveis; a identificação da serpente ajuda, mas o tipo de acidente é definido pelo quadro clínico.',
      'Tempo de coagulação (TC) à beira do leito: normal até 9 minutos; prolongado 10 a 30 minutos; incoagulável acima de 30 minutos. Repetir a cada 6 a 12 horas até normalizar.',
      'Botrópico: manifestações locais com ou sem coagulopatia. Crotálico: fácies miastênica, mialgia e urina escura sem edema local relevante. Laquético: quadro botrópico com sinais vagais. Elapídico: sinais neurotóxicos sem alterações locais.',
      'Picada sem sinais de envenenamento após 12 a 24 horas de observação e TC normal: considerar picada seca ou serpente não peçonhenta.',
      'Notificação compulsória (SINAN) e registro do lote de soro.'
    ],
    classificacaoGravidade: [
      { nivel: 'Botrópico ou laquético leve', criterios: 'Dor e edema discretos restritos ao local, com ou sem TC alterado, sem sangramento sistêmico. Botrópico leve: 2 a 4 ampolas de soro antibotrópico (SAB). Laquético é sempre classificado como moderado ou grave.' },
      { nivel: 'Botrópico ou laquético moderado', criterios: 'Edema evidente ultrapassando o segmento picado, TC alterado, sangramento local ou sistêmico discreto, sem instabilidade. Botrópico: 4 a 8 ampolas de SAB. Laquético: 10 ampolas de soro antibotrópico-laquético (SABL).' },
      { nivel: 'Botrópico ou laquético grave', criterios: 'Edema intenso atingindo todo o membro, bolhas ou necrose, sangramento importante, choque, oligúria ou insuficiência renal, sinais vagais intensos. Botrópico: 12 ampolas de SAB. Laquético: 20 ampolas de SABL.' },
      { nivel: 'Crotálico leve, moderado, grave e elapídico', criterios: 'Crotálico leve (sinais neurotóxicos discretos e tardios, sem mialgia ou urina escura): 5 ampolas de soro anticrotálico (SAC); moderado (fácies miastênica evidente, mialgia discreta, urina pouco escura): 10 ampolas; grave (fácies evidente, mialgia intensa, urina escura, oligúria ou insuficiência renal): 20 ampolas. Elapídico: todo caso é considerado grave: 10 ampolas de soro antielapídico (SAE).' }
    ],
    tratamento: [
      'Primeiros cuidados: manter a criança calma e em repouso com o membro elevado, lavar o local com água e sabão, retirar anéis e adornos, não fazer torniquete, não cortar, não sugar e não aplicar substâncias no local; transportar rapidamente ao serviço com soro.',
      'Soroterapia específica o mais precocemente possível, IV, diluída em soro fisiológico (por exemplo 100 a 250 mL), infundida em 20 a 60 minutos; a dose é por gravidade e é a mesma para crianças e adultos (nunca reduzir pelo peso).',
      'Antes do soro: acesso venoso, monitorização e material de anafilaxia à mão (adrenalina, oxigênio, anti-histamínico, corticoide). A pré-medicação não é rotina; pode ser considerada em pacientes com reação prévia a soro, conforme protocolo.',
      'Reação anafilática ao soro: interromper a infusão, adrenalina IM 0,01 mg/kg (máximo 0,3 a 0,5 mg), oxigênio, expansão volêmica; após controle, reiniciar o soro em velocidade menor.',
      'Reavaliar TC em 6 a 12 horas após o soro; se persistir incoagulável, administrar dose adicional (botrópico: 2 ampolas; crotálico ou laquético conforme protocolo), confirmar conforme Manual do MS.',
      'Acidente botrópico e laquético: analgesia (dipirona ou paracetamol; evitar AINE e AAS), limpeza local, drenagem de bolhas conforme necessidade, antibiótico apenas se infecção secundária (amoxicilina-clavulanato ou oxacilina + gentamicina se abscesso grave), profilaxia antitetânica, avaliação de síndrome compartimental por cirurgião.',
      'Acidente laquético: monitorização cardíaca; bradicardia e hipotensão vagais tratadas com atropina e volume.',
      'Acidente crotálico: hidratação vigorosa e diurese mantida para prevenir insuficiência renal por mioglobina (manutenção com diurese acima de 1 a 2 mL/kg/h), alcalinização urinária se indicada, monitorar potássio e CPK.',
      'Acidente elapídico: monitorizar respiração continuamente; suporte ventilatório precoce; neostigmina (0,05 mg/kg IV, precedida de atropina 0,05 mg/kg) pode ser usada como adjuvante em Micrurus com veneno de ação pós-sináptica, conforme protocolo.',
      'Observação hospitalar mínima de 24 horas em todos os casos; orientar sobre doença do soro.'
    ],
    medicamentos: [
      { medId: 'soro_antibotropico', esquema: 'Dose por gravidade, igual para crianças e adultos: leve 2 a 4 ampolas; moderado 4 a 8 ampolas; grave 12 ampolas, IV, diluídas em SF 0,9%, em 20 a 60 min. Reavaliar TC em 6 a 12 h e repetir 2 ampolas se persistir incoagulável, conforme protocolo.' },
      { medId: 'soro_antilaquetico', esquema: 'Soro antibotrópico-laquético (SABL): moderado 10 ampolas; grave 20 ampolas, IV, em 20 a 60 min. Na falta de SABL, pode ser usado SAB conforme protocolo.' },
      { medId: 'soro_anticrotalico', esquema: 'Leve 5 ampolas; moderado 10 ampolas; grave 20 ampolas de SAC (ou SABC), IV, em 20 a 60 min, independentemente do peso.' },
      { medId: 'soro_antielapidico', esquema: 'Todo acidente elapídico: 10 ampolas de SAE, IV, em 20 a 60 min; suporte ventilatório disponível.' },
      { medId: 'adrenalina', esquema: 'Anafilaxia ao soro: 0,01 mg/kg IM (solução 1 mg/mL), máximo 0,3 mg em crianças e 0,5 mg em adolescentes; repetir em 5 a 15 min se necessário.' },
      { medId: 'hidrocortisona', esquema: 'Reação ao soro (adjuvante após adrenalina): 4 a 5 mg/kg IV (máximo 200 mg), conforme protocolo.' },
      { medId: 'dipirona', esquema: 'Analgesia: conforme peso e bula, em maiores de 3 meses; evitar AAS e anti-inflamatórios.' },
      { medId: 'amoxicilina_clavulanato', esquema: 'Infecção secundária da picada: 50 mg/kg/dia de amoxicilina VO 8/8 h por 7 dias, conforme protocolo.' },
      { medId: 'soro_fisiologico', esquema: 'Diluição do soro antiveneno e expansão em hipotensão (20 mL/kg); hidratação de manutenção no acidente crotálico para diurese adequada.' }
    ],
    criteriosInternacao: [
      'Todo acidente ofídico deve ser internado ou observado em hospital por no mínimo 24 horas, mesmo sem sinais iniciais.',
      'Necessidade de soroterapia (qualquer gravidade).',
      'Coagulopatia, sangramento, edema progressivo ou sinais neurológicos.',
      'Criança pequena, picada em cabeça, pescoço ou tronco, ou comorbidades.'
    ],
    criteriosUTI: [
      'Insuficiência respiratória ou necessidade de ventilação (elapídico, crotálico).',
      'Choque, sangramento grave ou coagulação intravascular disseminada.',
      'Insuficiência renal aguda com indicação de diálise.',
      'Anafilaxia grave ao soro.',
      'Síndrome compartimental com necessidade cirúrgica.'
    ],
    criteriosAlta: [
      'TC normalizado e ausência de sangramentos por 24 horas.',
      'Edema em regressão sem sinais de infecção ou necrose progressiva.',
      'Diurese normal e função renal estável.',
      'Ausência de sinais neurológicos e respiração normal por 24 horas (elapídico e crotálico).',
      'Orientação sobre doença do soro e retorno.'
    ],
    orientacoes: [
      'Retornar se sangramento, urina escura, febre, aumento de dor ou secreção na ferida, ou dificuldade para respirar.',
      'Entre 5 e 24 dias após o soro pode surgir febre, manchas na pele, dor nas juntas e gânglios (doença do soro): procurar atendimento.',
      'Manter o membro elevado e fazer curativos conforme orientação.',
      'Em novo acidente: manter a calma, lavar com água e sabão, não amarrar, não cortar, não passar produtos e ir ao serviço de saúde imediatamente.',
      'Completar vacinação antitetânica.'
    ],
    retorno: 'Reavaliação em 48 a 72 horas após a alta para inspeção da ferida e função renal, e entre 7 e 14 dias para sinais de doença do soro; retorno imediato se sinais de alarme.',
    prevencao: [
      'Uso de botas e perneiras em roçados, matas e áreas alagadas; não andar descalço.',
      'Manter quintais limpos, sem entulho, lixo e roedores; cuidado com lenha e palha.',
      'Não colocar as mãos em buracos, ocos de árvores ou sob troncos.',
      'Usar lanterna à noite; olhar antes de sentar ou pisar em áreas de mata.',
      'Conhecer o polo de soro antiveneno mais próximo e o meio de transporte de emergência da comunidade.'
    ],
    fontes: [
      { nome: 'Manual de Diagnóstico e Tratamento de Acidentes por Animais Peçonhentos – Ministério da Saúde/FUNASA', ano: 2001 },
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde (capítulo de acidentes por animais peçonhentos)', ano: 2024 },
      { nome: 'OMS – Guidelines for the management of snakebites (2ª ed.)', ano: 2016 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'escorpionismo',
    nome: 'Escorpionismo',
    categoria: 'amazonia',
    amazonia: true,
    cid10: 'T63.2',
    tags: ['picada_inseto', 'dor_local', 'sudorese', 'vomitos', 'dispneia', 'alteracao_consciencia', 'convulsao', 'fraqueza', 'edema'],
    definicao: 'Envenenamento pela picada de escorpiões do gênero Tityus, com dor local intensa e, nas formas moderadas e graves (principalmente em crianças menores de 7 anos), manifestações sistêmicas por descarga adrenérgica e colinérgica: vômitos, sudorese, taquicardia ou bradicardia, hipertensão, arritmias, edema pulmonar e choque. A soroterapia é indicada por gravidade e não por peso.',
    epidemiologia: 'É o acidente por animal peçonhento mais frequente no Brasil. No Amazonas os casos ocorrem em Manaus (áreas urbanas e periurbanas com entulho e esgoto) e no interior, com espécies amazônicas como Tityus obscurus (escorpião-preto), Tityus silvestris e Tityus metuensis, além de T. serrulatus introduzido em áreas urbanas. Acidentes por T. obscurus na região Norte podem cursar com manifestações neurológicas peculiares (ataxia, mioclonias, dismetria, disartria). Crianças menores de 7 anos têm maior letalidade. Ocorrem em domicílios (calçados, roupas, entulho) e em atividades de coleta na mata, mais no período chuvoso.',
    agente: 'Escorpiões do gênero Tityus: T. obscurus, T. silvestris, T. metuensis (Amazônia); T. serrulatus, T. bahiensis e T. stigmurus (outras regiões e áreas urbanas).',
    transmissao: 'Inoculação do veneno pelo ferrão (télson) do escorpião, geralmente ao calçar sapatos, vestir roupas ou manusear entulho.',
    incubacao: 'Dor imediata; manifestações sistêmicas em minutos até 2 a 3 horas (raramente após 6 horas). Observação mínima de 6 a 12 horas em crianças.',
    manifestacoes: [
      'Dor local imediata, intensa, em queimação ou agulhada, irradiando para o membro, com parestesia; sinais locais discretos (leve hiperemia, sudorese local, piloereção).',
      'Formas moderadas: náuseas, vômitos, sudorese, sialorreia, agitação, taquicardia, hipertensão, taquipneia, tremores e dor abdominal.',
      'Formas graves: vômitos profusos e incoercíveis, sudorese profusa, prostração, hipotermia ou hipertermia, bradicardia, hipotensão ou hipertensão grave, arritmias, insuficiência cardíaca, edema agudo de pulmão, choque, convulsões e coma.',
      'Tityus obscurus (Amazônia): ataxia, mioclonias, dismetria, disartria, fasciculações, sonolência e parestesias.',
      'Lactentes: choro incessante, agitação, vômitos e sudorese podem ser as únicas pistas, sem relato de picada.',
      'Alterações laboratoriais: leucocitose, hiperglicemia, hipocalemia, elevação de CPK, amilase e troponina; ECG com arritmias e alterações de repolarização.'
    ],
    sinaisAlarme: [
      'Vômitos repetidos ou sudorese profusa.',
      'Taquicardia ou bradicardia importantes, hipertensão ou hipotensão.',
      'Dispneia, estertores, cianose ou tosse com secreção rósea (edema pulmonar).',
      'Agitação intensa, sonolência, convulsão ou ataxia.',
      'Sialorreia, tremores e priapismo.',
      'Criança menor de 7 anos com qualquer manifestação sistêmica.'
    ],
    diagnosticoDiferencial: ['araneismo', 'acidente_ofidico', 'picada de himenópteros (abelhas, formigas)', 'intoxicações exógenas (organofosforados, simpaticomiméticos)', 'gastroenterite aguda', 'miocardite', 'abdome agudo'],
    exames: ['eletrocardiograma', 'hemograma', 'glicemia', 'potassio', 'sodio', 'cpk', 'troponina', 'amilase', 'gasometria', 'radiografia_torax', 'ecocardiograma (formas graves)'],
    criteriosDiagnosticos: [
      'História de picada ou visualização do escorpião com dor local intensa de início imediato, com ou sem manifestações sistêmicas.',
      'Classificação clínica pela presença de manifestações sistêmicas (moderado) e de sinais de gravidade cardiovascular, respiratória ou neurológica (grave).',
      'Em lactentes sem história clara: choro, vômitos, sudorese e taquicardia de início súbito em ambiente com escorpiões.',
      'Notificação compulsória.'
    ],
    classificacaoGravidade: [
      { nivel: 'Leve', criterios: 'Dor local, parestesia e sinais locais discretos, sem manifestações sistêmicas (taquicardia leve e agitação podem ocorrer pela dor). Sem soroterapia; analgesia e observação de 6 a 12 horas (crianças pequenas).' },
      { nivel: 'Moderado', criterios: 'Dor local intensa com uma ou mais manifestações sistêmicas: náuseas, vômitos, sudorese, sialorreia discreta, agitação, taquicardia, taquipneia, hipertensão leve. Soro antiescorpiônico (SAEsc): 2 a 3 ampolas IV.' },
      { nivel: 'Grave', criterios: 'Além das manifestações anteriores: vômitos profusos e incoercíveis, sudorese profusa, sialorreia intensa, prostração, convulsões, coma, bradicardia, insuficiência cardíaca, edema pulmonar, choque. Soro antiescorpiônico: 4 a 6 ampolas IV e UTI.' }
    ],
    tratamento: [
      'Analgesia imediata: dipirona ou paracetamol; infiltração local com lidocaína 2% sem vasoconstritor (1 a 2 mL em crianças) repetida até 3 vezes a cada 60 minutos se necessário; compressas mornas.',
      'Soroterapia antiescorpiônica (ou antiaracnídica na falta) nas formas moderadas (2 a 3 ampolas) e graves (4 a 6 ampolas), IV, diluída em soro fisiológico, infundida em 20 a 60 minutos, o mais rápido possível; a dose é a mesma para qualquer peso e não deve ser reduzida em crianças.',
      'Monitorização cardíaca e respiratória contínua nas formas moderadas e graves; acesso venoso, oxigênio e material de anafilaxia disponível.',
      'Vômitos: ondansetrona; evitar metoclopramida em crianças pequenas pelo risco de reações extrapiramidais.',
      'Hipertensão e taquicardia costumam ceder após o soro; edema pulmonar: oxigênio, ventilação não invasiva ou invasiva, diuréticos e vasodilatadores conforme protocolo de UTI; evitar sobrecarga hídrica.',
      'Choque cardiogênico: suporte inotrópico (dobutamina) em UTI; bradicardia sintomática: atropina.',
      'Convulsões: diazepam ou midazolam.',
      'Observar todas as crianças menores de 7 anos por no mínimo 6 a 12 horas, mesmo em casos leves, pela possibilidade de piora tardia.'
    ],
    medicamentos: [
      { medId: 'soro_antiescorpionico', esquema: 'Moderado: 2 a 3 ampolas; grave: 4 a 6 ampolas, IV, diluídas em SF 0,9%, em 20 a 60 min, independentemente do peso. Na falta, soro antiaracnídico na mesma dose.' },
      { medId: 'soro_antiaracnidico', esquema: 'Alternativa ao soro antiescorpiônico na mesma dose por gravidade (2 a 3 ampolas moderado; 4 a 6 grave).' },
      { medId: 'dipirona', esquema: 'Analgesia: conforme peso e bula, em maiores de 3 meses; pode ser repetida a cada 6 h.' },
      { medId: null, nome: 'Lidocaína 2% sem vasoconstritor', esquema: 'Infiltração local de 1 a 2 mL em crianças (3 a 4 mL em adultos), até 3 vezes com intervalo de 60 min.' },
      { medId: 'ondansetrona', esquema: 'Vômitos: 0,15 mg/kg IV ou VO (máximo 8 mg), conforme protocolo.' },
      { medId: 'adrenalina', esquema: 'Anafilaxia ao soro: 0,01 mg/kg IM (máximo 0,3 a 0,5 mg), repetir em 5 a 15 min se necessário.' },
      { medId: 'midazolam', esquema: 'Convulsões: 0,1 a 0,2 mg/kg IV ou IM (máximo 5 a 10 mg), conforme protocolo.' }
    ],
    criteriosInternacao: [
      'Formas moderadas e graves (necessidade de soroterapia).',
      'Crianças menores de 7 anos, mesmo com forma leve, para observação de 6 a 12 horas.',
      'Dor não controlada ou vômitos persistentes.',
      'Alterações no ECG ou nos exames laboratoriais.'
    ],
    criteriosUTI: [
      'Edema agudo de pulmão ou insuficiência respiratória.',
      'Choque, insuficiência cardíaca ou arritmias graves.',
      'Convulsões, coma ou manifestações neurológicas importantes.',
      'Anafilaxia grave ao soro.'
    ],
    criteriosAlta: [
      'Ausência de manifestações sistêmicas por 12 a 24 horas após o soro.',
      'Dor controlada com analgesia oral.',
      'ECG e exames normais ou normalizados.',
      'Orientação sobre doença do soro e retorno.'
    ],
    orientacoes: [
      'Retornar imediatamente se vômitos, suor excessivo, falta de ar, sonolência, agitação ou convulsão.',
      'Entre 5 e 24 dias após o soro pode surgir febre, manchas na pele e dor nas juntas (doença do soro): procurar atendimento.',
      'Sacudir roupas, calçados e toalhas antes de usar; afastar camas das paredes.',
      'Manter quintal limpo, sem entulho, e vedar frestas, ralos e soleiras.',
      'Levar o escorpião (se capturado com segurança) para identificação, sem atrasar o atendimento.'
    ],
    retorno: 'Reavaliação em 24 a 48 horas após a alta e entre 7 e 14 dias para sinais de doença do soro; retorno imediato se sinais sistêmicos.',
    prevencao: [
      'Limpeza de terrenos, remoção de entulho, lixo e material de construção; controle de baratas (alimento dos escorpiões).',
      'Vedação de frestas, ralos com tampa, telas em janelas e soleiras.',
      'Examinar roupas, calçados e roupas de cama antes do uso.',
      'Evitar que crianças manuseiem lenha, pedras e entulho sem luvas.',
      'Conhecer o serviço com soro mais próximo.'
    ],
    fontes: [
      { nome: 'Manual de Diagnóstico e Tratamento de Acidentes por Animais Peçonhentos – Ministério da Saúde/FUNASA', ano: 2001 },
      { nome: 'Manual de Controle de Escorpiões – Ministério da Saúde', ano: 2009 },
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'araneismo',
    nome: 'Araneísmo (Phoneutria, Loxosceles, Latrodectus)',
    categoria: 'amazonia',
    amazonia: true,
    cid10: 'T63.3',
    tags: ['picada_inseto', 'dor_local', 'edema', 'lesoes_pele', 'feridas', 'sudorese', 'vomitos', 'ictericia', 'reducao_diurese', 'fraqueza', 'dor_abdominal'],
    definicao: 'Envenenamento por picada de aranhas de importância médica: Phoneutria (armadeira, quadro neurotóxico com dor intensa), Loxosceles (aranha-marrom, quadro dermonecrótico e raramente hemolítico) e Latrodectus (viúva-negra, quadro neurotóxico com contraturas). A soroterapia é indicada por gravidade e não por peso.',
    epidemiologia: 'Na Amazônia, o acidente mais relevante é o foneutrismo por armadeiras amazônicas (Phoneutria reidyi, P. fera e P. boliviensis), presentes em bananeiras, palmeiras, açaizais, lenha e dentro das casas, com maior frequência no período chuvoso. Loxosceles é rara no Amazonas (mais comum no Sul e Sudeste), e Latrodectus tem registros esporádicos no Norte e Nordeste. Crianças menores de 7 anos e idosos têm maior risco de forma grave no foneutrismo. Muitos casos atribuídos a aranhas são na verdade picadas de outros artrópodes ou infecções de pele.',
    agente: 'Phoneutria spp. (armadeira); Loxosceles spp. (aranha-marrom); Latrodectus spp. (viúva-negra). Aranhas caranguejeiras e tarântulas causam apenas irritação local por pelos urticantes.',
    transmissao: 'Inoculação do veneno pela picada, geralmente ao manusear frutos, roupas, calçados ou lenha (Phoneutria) ou ao comprimir a aranha contra o corpo ao vestir-se ou dormir (Loxosceles).',
    incubacao: 'Phoneutria: dor imediata, manifestações sistêmicas em até 2 a 3 horas. Loxosceles: dor e lesão em 12 a 24 horas (picada pouco dolorosa inicialmente), hemólise em 24 a 72 horas. Latrodectus: dor e contraturas em 15 a 60 minutos.',
    manifestacoes: [
      'Phoneutria: dor local imediata e intensa, irradiada, com edema, sudorese e eritema discretos; nas formas moderadas e graves: sudorese, sialorreia, vômitos, agitação, taquicardia, hipertensão, tremores, priapismo, choque, edema pulmonar e convulsões (crianças pequenas).',
      'Loxosceles cutânea: dor progressiva, edema e eritema com placa marmórea (áreas violáceas e pálidas), bolhas e evolução para necrose seca e úlcera em dias; febre, mal-estar e exantema.',
      'Loxosceles cutâneo-visceral (hemolítica): icterícia, hemoglobinúria, anemia, oligúria, insuficiência renal e coagulação intravascular disseminada, nas primeiras 24 a 72 horas.',
      'Latrodectus: dor local com pápula eritematosa, evoluindo para dor irradiada, contraturas e rigidez muscular (abdome em tábua), sudorese, hipertensão, taquicardia, fácies latrodectísmica, agitação e priapismo.',
      'Caranguejeiras: irritação e prurido local, sem envenenamento sistêmico.'
    ],
    sinaisAlarme: [
      'Phoneutria: vômitos, sudorese profusa, sialorreia, hipertensão ou hipotensão, taquicardia, dispneia, priapismo ou convulsão, especialmente em menores de 7 anos.',
      'Loxosceles: icterícia, urina escura, palidez, oligúria ou sangramento (hemólise).',
      'Lesão cutânea com necrose extensa, infecção secundária ou febre alta.',
      'Latrodectus: contraturas intensas, dor abdominal em tábua, hipertensão grave ou arritmia.',
      'Alteração de consciência ou insuficiência respiratória.'
    ],
    diagnosticoDiferencial: ['escorpionismo', 'acidente_ofidico', 'escabiose_impetigo', 'celulite, abscesso e fasciíte necrosante', 'leishmaniose_tegumentar', 'picadas de himenópteros e lacraias', 'abdome agudo (Latrodectus)', 'intoxicações exógenas'],
    exames: ['hemograma', 'eletrocardiograma', 'glicemia', 'potassio', 'cpk', 'coagulograma', 'ureia', 'creatinina', 'bilirrubinas', 'urina_1', 'desidrogenase láctica e reticulócitos (loxoscelismo)', 'gasometria', 'radiografia_torax'],
    criteriosDiagnosticos: [
      'História de picada de aranha, com identificação do animal quando possível, e quadro clínico compatível com a síndrome (neurotóxica ou dermonecrótica).',
      'Foneutrismo: dor intensa imediata com ou sem manifestações sistêmicas; classificação clínica por sinais sistêmicos e de gravidade.',
      'Loxoscelismo: lesão dermonecrótica com placa marmórea de evolução lenta (12 a 72 horas), com ou sem hemólise laboratorial; classificação em cutânea leve, moderada ou cutâneo-visceral.',
      'Latrodectismo: dor com contraturas musculares e sinais autonômicos após picada.',
      'Notificação compulsória.'
    ],
    classificacaoGravidade: [
      { nivel: 'Phoneutria leve', criterios: 'Dor local, edema e sudorese discretos, taquicardia leve pela dor, sem manifestações sistêmicas. Analgesia, bloqueio anestésico local e observação (6 a 12 horas em crianças); sem soro.' },
      { nivel: 'Phoneutria moderado', criterios: 'Dor intensa associada a sudorese, vômitos ocasionais, agitação, hipertensão arterial ou taquicardia. Soro antiaracnídico (SAAr): 2 a 4 ampolas IV, principalmente em crianças.' },
      { nivel: 'Phoneutria grave', criterios: 'Sudorese profusa, sialorreia, vômitos frequentes, priapismo, hipotensão, choque, edema pulmonar, convulsões ou coma. Soro antiaracnídico: 5 a 10 ampolas IV e UTI.' },
      { nivel: 'Loxosceles e Latrodectus', criterios: 'Loxosceles cutânea leve (lesão pequena sem sinais sistêmicos): sem soro, cuidados locais e reavaliação; cutânea moderada (lesão maior que 3 cm ou sinais sistêmicos sem hemólise): 5 ampolas de soro antiaracnídico ou antiloxoscélico e prednisona 1 mg/kg/dia por 5 dias; cutâneo-visceral (hemólise): 10 ampolas e prednisona 1 mg/kg/dia por 5 a 7 dias. Latrodectus moderado a grave: soro antilatrodéctico 1 a 2 ampolas IM (quando disponível) ou benzodiazepínico, gluconato de cálcio e analgesia, conforme protocolo.' }
    ],
    tratamento: [
      'Phoneutria: analgesia com dipirona ou paracetamol e infiltração local com lidocaína 2% sem vasoconstritor (1 a 2 mL em crianças, até 3 vezes com intervalo de 60 minutos); compressas mornas; observação de 6 a 12 horas em menores de 7 anos.',
      'Phoneutria moderado e grave: soro antiaracnídico IV diluído em soro fisiológico em 20 a 60 minutos (2 a 4 ampolas no moderado; 5 a 10 no grave), com monitorização cardiorrespiratória; suporte para edema pulmonar, choque e convulsões em UTI.',
      'Loxosceles: cuidados locais (limpeza, curativo, compressas frias nas primeiras 72 horas), analgesia, anti-histamínico para prurido; soro antiaracnídico ou antiloxoscélico nas formas moderada (5 ampolas) e cutâneo-visceral (10 ampolas), idealmente nas primeiras 36 horas; prednisona 1 mg/kg/dia por 5 a 7 dias nas formas moderada e grave; hidratação, alcalinização e suporte dialítico se hemólise com insuficiência renal; desbridamento e enxerto tardios da necrose; antibiótico se infecção secundária.',
      'Latrodectus: analgesia, benzodiazepínico (diazepam) para contraturas, gluconato de cálcio 10% IV lento conforme protocolo, soro antilatrodéctico quando disponível em serviço de referência.',
      'Material de anafilaxia sempre disponível antes da soroterapia; adrenalina IM em caso de reação.',
      'Profilaxia antitetânica conforme situação vacinal.'
    ],
    medicamentos: [
      { medId: 'soro_antiaracnidico', esquema: 'Phoneutria moderado: 2 a 4 ampolas; grave: 5 a 10 ampolas, IV, em SF 0,9%, 20 a 60 min. Loxosceles moderado: 5 ampolas; cutâneo-visceral: 10 ampolas (ou soro antiloxoscélico). Dose independente do peso.' },
      { medId: null, nome: 'Soro antilatrodéctico (SALatr)', esquema: 'Latrodectus moderado a grave: 1 a 2 ampolas IM, conforme protocolo e disponibilidade em centros de referência.' },
      { medId: 'prednisolona', esquema: 'Loxoscelismo moderado e cutâneo-visceral: 1 mg/kg/dia VO (máximo 40 a 60 mg) por 5 a 7 dias, conforme protocolo.' },
      { medId: 'dipirona', esquema: 'Analgesia: conforme peso e bula, em maiores de 3 meses.' },
      { medId: null, nome: 'Lidocaína 2% sem vasoconstritor', esquema: 'Infiltração local de 1 a 2 mL em crianças, até 3 vezes com intervalo de 60 min.' },
      { medId: 'diazepam', esquema: 'Latrodectismo com contraturas: 0,1 a 0,2 mg/kg IV lento (máximo 10 mg), conforme protocolo.' },
      { medId: 'adrenalina', esquema: 'Anafilaxia ao soro: 0,01 mg/kg IM (máximo 0,3 a 0,5 mg), repetir em 5 a 15 min se necessário.' },
      { medId: 'cefalexina', esquema: 'Infecção secundária de lesão loxoscélica: 50 mg/kg/dia VO 6/6 h por 7 dias.' }
    ],
    criteriosInternacao: [
      'Foneutrismo moderado ou grave e toda criança menor de 7 anos com foneutrismo para observação.',
      'Loxoscelismo com sinais sistêmicos, hemólise ou lesão extensa.',
      'Latrodectismo com contraturas ou alterações autonômicas.',
      'Dor refratária ou vômitos persistentes.'
    ],
    criteriosUTI: [
      'Edema pulmonar, choque ou arritmias (Phoneutria).',
      'Hemólise maciça com insuficiência renal ou CIVD (Loxosceles).',
      'Convulsões, coma ou insuficiência respiratória.',
      'Anafilaxia grave ao soro.'
    ],
    criteriosAlta: [
      'Ausência de manifestações sistêmicas por 12 a 24 horas.',
      'Dor controlada por via oral.',
      'Loxoscelismo: exames de hemólise e função renal normais e lesão sem progressão, com plano de curativos.',
      'Orientação sobre doença do soro e retorno.'
    ],
    orientacoes: [
      'Retornar se vômitos, suor excessivo, falta de ar, sonolência ou convulsão (armadeira), ou se a ferida escurecer, aumentar, ou surgir urina escura e pele amarelada (aranha-marrom).',
      'Entre 5 e 24 dias após o soro pode surgir febre, manchas na pele e dor nas juntas (doença do soro): procurar atendimento.',
      'Sacudir roupas, calçados e toalhas antes de usar; examinar cachos de banana e frutos antes de manusear.',
      'Manter a casa e o quintal limpos; afastar camas das paredes; usar luvas ao mexer em lenha e entulho.',
      'Levar a aranha (se capturada com segurança) para identificação.'
    ],
    retorno: 'Foneutrismo: reavaliação em 24 a 48 horas. Loxoscelismo: reavaliação diária nos primeiros 3 dias (hemólise) e depois a cada 2 a 3 dias até cicatrização. Sinais de doença do soro entre 7 e 14 dias.',
    prevencao: [
      'Limpeza regular da casa e quintal, remoção de entulho, lenha e materiais acumulados.',
      'Examinar e sacudir roupas, calçados, toalhas e roupas de cama antes do uso.',
      'Luvas e calçados ao manusear cachos de banana, açaí, lenha e materiais de construção.',
      'Vedação de frestas e uso de telas.',
      'Conhecer o serviço com soro antiaracnídico mais próximo.'
    ],
    fontes: [
      { nome: 'Manual de Diagnóstico e Tratamento de Acidentes por Animais Peçonhentos – Ministério da Saúde/FUNASA', ano: 2001 },
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
      { nome: 'Instituto Butantan – Orientações sobre acidentes com aranhas', ano: 2023 }
    ],
    atualizadoEm: '2026-09'
  },

  // =====================================================================
  // GERAIS
  // =====================================================================
  {
    id: 'pneumonia',
    nome: 'Pneumonia adquirida na comunidade',
    categoria: 'respiratoria',
    amazonia: false,
    cid10: 'J18.9',
    tags: ['tosse', 'febre', 'dispneia', 'dor_abdominal', 'sibilancia', 'coriza', 'fraqueza', 'alteracao_consciencia', 'vomitos'],
    definicao: 'Infecção aguda do parênquima pulmonar adquirida fora do hospital, definida clinicamente pela presença de tosse ou dificuldade respiratória com taquipneia (critério da OMS) e, quando disponível, alteração radiológica. É a principal causa de morte por doença infecciosa em menores de 5 anos.',
    epidemiologia: 'No Amazonas, as infecções respiratórias agudas são a principal causa de internação pediátrica, com pico no período chuvoso (dezembro a maio) e maior gravidade em crianças indígenas, ribeirinhas, desnutridas, com baixa cobertura vacinal (pneumocócica e Hib) ou expostas à fumaça de fogão a lenha. A distância dos serviços e a demora no acesso ao oxigênio aumentam a letalidade. Em áreas endêmicas, avaliar malária e tuberculose em pneumonias que não respondem ao tratamento.',
    agente: 'Vírus (sincicial respiratório, influenza, rinovírus, adenovírus, metapneumovírus) predominam em menores de 2 anos; Streptococcus pneumoniae é a principal bactéria em todas as idades; Haemophilus influenzae, Staphylococcus aureus (formas graves, complicadas) e Mycoplasma pneumoniae (escolares). Em menores de 2 meses: estreptococo do grupo B, enterobactérias.',
    transmissao: 'Gotículas e aerossóis respiratórios e contato com secreções; aspiração de microrganismos colonizadores da nasofaringe.',
    incubacao: 'Variável conforme o agente: 1 a 3 dias (vírus e pneumococo) até 2 a 3 semanas (Mycoplasma).',
    manifestacoes: [
      'Tosse e febre, com taquipneia (FR igual ou maior que 60 irpm em menores de 2 meses, 50 irpm de 2 a 11 meses, 40 irpm de 1 a 5 anos, 30 irpm acima de 5 anos).',
      'Tiragem subcostal, batimento de asa nasal, gemência e uso de musculatura acessória.',
      'Estertores crepitantes localizados, diminuição do murmúrio vesicular ou sopro tubário.',
      'Dor abdominal ou torácica, vômitos e inapetência (pneumonia de lobo inferior).',
      'Lactentes: recusa alimentar, hipoatividade, apneia, hipotermia ou febre.',
      'Sibilância associada sugere etiologia viral ou atípica.',
      'Derrame pleural e empiema: febre persistente após 48 a 72 horas de antibiótico, dor torácica e macicez.'
    ],
    sinaisAlarme: [
      'Tiragem subcostal, gemência, batimento de asa nasal ou cianose.',
      'Saturação de oxigênio abaixo de 92% em ar ambiente.',
      'Incapacidade de beber ou mamar, vômitos de tudo que ingere.',
      'Letargia, sonolência anormal ou convulsões.',
      'Apneia ou respiração irregular em lactentes.',
      'Idade menor de 2 meses com qualquer sinal de pneumonia.',
      'Desnutrição grave ou comorbidade (cardiopatia, doença falciforme, imunossupressão).'
    ],
    diagnosticoDiferencial: ['bronquiolite', 'asma', 'tuberculose', 'malaria', 'sepse', 'laringotraqueíte e coqueluche', 'aspiração de corpo estranho', 'insuficiência cardíaca', 'acidose metabólica com taquipneia (cetoacidose, desidratação)'],
    exames: ['oximetria de pulso', 'radiografia_torax', 'hemograma', 'pcr', 'hemocultura', 'gasometria', 'eletrolitos', 'gota_espessa', 'ultrassonografia de tórax (derrame)', 'painel viral ou teste rápido influenza e VSR', 'baciloscopia ou TRM-TB (pneumonia prolongada)'],
    criteriosDiagnosticos: [
      'Critério clínico (OMS/AIDPI): tosse ou dificuldade para respirar com taquipneia para a idade, sem sibilância predominante; pneumonia grave se tiragem subcostal, sinais gerais de perigo ou saturação abaixo de 92%.',
      'Radiografia de tórax indicada em pneumonia grave, dúvida diagnóstica, falha terapêutica ou suspeita de complicação (derrame, abscesso, pneumatocele); consolidação lobar sugere etiologia bacteriana.',
      'Hemograma e PCR auxiliam, mas não definem etiologia; hemocultura em crianças internadas.',
      'Investigar tuberculose quando tosse com mais de 2 semanas, contato com adulto bacilífero ou ausência de melhora após antibiótico.',
      'Em área endêmica, solicitar gota espessa em toda criança febril com pneumonia.'
    ],
    classificacaoGravidade: [
      { nivel: 'Pneumonia (não grave)', criterios: 'Taquipneia sem tiragem subcostal, saturação igual ou maior que 92%, sem sinais de perigo, aceitando líquidos, maior de 2 meses. Amoxicilina oral e reavaliação em 48 horas.' },
      { nivel: 'Pneumonia grave', criterios: 'Tiragem subcostal, saturação abaixo de 92%, gemência, incapacidade de beber, letargia, convulsão ou menor de 2 meses. Internação, oxigênio e antibiótico parenteral.' },
      { nivel: 'Pneumonia muito grave ou complicada', criterios: 'Insuficiência respiratória, cianose central, choque, apneia, derrame pleural volumoso, empiema, pneumonia necrosante ou abscesso. UTI, suporte ventilatório e drenagem quando indicada.' }
    ],
    tratamento: [
      'Pneumonia não grave ambulatorial (maiores de 2 meses): amoxicilina 50 mg/kg/dia VO dividida a cada 8 ou 12 horas por 5 a 7 dias (doses de 80 a 90 mg/kg/dia em áreas com resistência pneumocócica ou conforme diretriz da SBP); reavaliar em 48 horas.',
      'Suspeita de pneumonia atípica (escolares, tosse prolongada, sibilância, padrão intersticial): azitromicina 10 mg/kg/dia por 5 dias ou claritromicina 15 mg/kg/dia 12/12 h por 7 a 10 dias.',
      'Pneumonia grave (internação): penicilina cristalina 150.000 a 200.000 UI/kg/dia IV 6/6 h ou ampicilina 150 a 200 mg/kg/dia IV 6/6 h; ceftriaxona 50 a 100 mg/kg/dia IV em falha ou pneumonia muito grave; transição para amoxicilina oral após 24 a 48 horas afebril, completando 7 a 10 dias.',
      'Menores de 2 meses: ampicilina + gentamicina IV (esquema de sepse neonatal), internação obrigatória.',
      'Pneumonia complicada ou suspeita de S. aureus (pneumatoceles, empiema, evolução rápida, porta de entrada cutânea): oxacilina 150 a 200 mg/kg/dia IV 6/6 h associada a ceftriaxona; vancomicina se suspeita de MRSA comunitário conforme protocolo.',
      'Oxigênio suplementar se saturação abaixo de 92% (cateter nasal 1 a 2 L/min em lactentes; máscara; cânula nasal de alto fluxo quando disponível), com alvo de 92 a 96%.',
      'Hidratação e nutrição: manter aleitamento e dieta; fluidos IV apenas se incapaz de ingerir; evitar hiper-hidratação.',
      'Antitérmico e analgesia (paracetamol ou dipirona); broncodilatador apenas se sibilância; não usar antitussígenos.',
      'Derrame pleural: toracocentese diagnóstica e drenagem se empiema, conforme cirurgia pediátrica.',
      'Falha após 48 a 72 horas: reavaliar diagnóstico (complicação, tuberculose, corpo estranho), trocar esquema e solicitar imagem.'
    ],
    medicamentos: [
      { medId: 'amoxicilina', esquema: 'Ambulatorial: 50 mg/kg/dia VO dividida 8/8 h ou 12/12 h (até 80 a 90 mg/kg/dia conforme diretriz), máximo 2 a 3 g/dia, por 5 a 7 dias.' },
      { medId: 'penicilina_cristalina', esquema: 'Internação: 150.000 a 200.000 UI/kg/dia IV dividida 6/6 h por 7 a 10 dias (transição para amoxicilina oral quando afebril).' },
      { medId: 'ampicilina', esquema: 'Internação: 150 a 200 mg/kg/dia IV dividida 6/6 h; em menores de 2 meses associar gentamicina.' },
      { medId: 'gentamicina', esquema: 'Menores de 2 meses (com ampicilina): 5 a 7,5 mg/kg/dia IV, intervalo conforme idade gestacional e pós-natal, confirmar conforme protocolo.' },
      { medId: 'ceftriaxona', esquema: 'Pneumonia muito grave ou falha: 50 a 100 mg/kg/dia IV 1 vez ao dia ou 12/12 h (máximo 2 a 4 g/dia).' },
      { medId: 'oxacilina', esquema: 'Suspeita de S. aureus: 150 a 200 mg/kg/dia IV dividida 6/6 h (máximo 12 g/dia), associada a ceftriaxona.' },
      { medId: 'vancomicina', esquema: 'Suspeita de MRSA ou pneumonia grave sem resposta: 40 a 60 mg/kg/dia IV dividida 6/6 h, com monitorização de nível sérico e função renal, conforme protocolo.' },
      { medId: 'azitromicina', esquema: 'Pneumonia atípica: 10 mg/kg/dia VO 1 vez ao dia por 5 dias (máximo 500 mg/dia).' },
      { medId: 'claritromicina', esquema: 'Alternativa para atípica: 15 mg/kg/dia VO dividida 12/12 h por 7 a 10 dias (máximo 1 g/dia).' },
      { medId: 'paracetamol', esquema: 'Febre e dor: 10 a 15 mg/kg/dose VO a cada 6 h, conforme bula.' },
      { medId: 'salbutamol', esquema: 'Apenas se sibilância associada: 100 mcg/jato, 2 a 4 jatos com espaçador a cada 20 min na 1ª hora e depois conforme resposta.' }
    ],
    criteriosInternacao: [
      'Idade menor de 2 meses.',
      'Saturação abaixo de 92% ou sinais de esforço respiratório importante (tiragem, gemência, batimento de asa nasal).',
      'Incapacidade de ingerir líquidos ou medicação, vômitos persistentes, desidratação.',
      'Sinais gerais de perigo: letargia, convulsão, cianose.',
      'Complicações: derrame pleural, abscesso, pneumatocele.',
      'Falha do tratamento ambulatorial após 48 a 72 horas.',
      'Desnutrição grave, comorbidades ou impossibilidade de retorno e cuidado domiciliar (distância, vulnerabilidade social).'
    ],
    criteriosUTI: [
      'Insuficiência respiratória com necessidade de ventilação mecânica ou não invasiva.',
      'Saturação abaixo de 92% apesar de oxigênio com FiO2 maior que 50%.',
      'Choque séptico ou instabilidade hemodinâmica.',
      'Apneias recorrentes ou alteração de consciência.',
      'Pneumonia necrosante, empiema extenso ou pneumotórax.'
    ],
    criteriosAlta: [
      'Afebril por 24 a 48 horas e melhora do desconforto respiratório.',
      'Saturação igual ou maior que 92% em ar ambiente por pelo menos 12 a 24 horas.',
      'Alimentação e hidratação orais adequadas.',
      'Tolerância ao antibiótico oral para completar o tratamento.',
      'Responsável orientado e retorno agendado.'
    ],
    orientacoes: [
      'Dar o antibiótico nos horários certos até o final, mesmo com melhora.',
      'Manter aleitamento materno e oferecer líquidos com frequência; alimentar em pequenas porções.',
      'Retornar imediatamente se respiração rápida ou difícil, afundamento das costelas, lábios roxos, recusa de líquidos, sonolência ou piora da febre.',
      'Manter vacinação em dia (pneumocócica, Hib, influenza, coqueluche).',
      'Evitar fumaça de cigarro e de fogão a lenha dentro de casa.'
    ],
    retorno: 'Reavaliação em 48 horas (ou 24 horas em lactentes) para casos ambulatoriais; retorno imediato se sinais de alarme; consulta após o término do antibiótico.',
    prevencao: [
      'Vacinação: pneumocócica 10-valente, Hib (pentavalente), influenza anual, coqueluche e sarampo.',
      'Aleitamento materno exclusivo até 6 meses e nutrição adequada com suplementação de vitamina A e zinco quando indicada.',
      'Redução da poluição domiciliar (fogão a lenha, tabagismo).',
      'Lavagem das mãos e etiqueta respiratória.',
      'Tratamento precoce de infecções respiratórias e acesso a oxigênio nas unidades do interior.'
    ],
    fontes: [
      { nome: 'Diretrizes Brasileiras em Pneumonia Adquirida na Comunidade em Pediatria – SBP', ano: 2018 },
      { nome: 'OMS – Revised WHO classification and treatment of childhood pneumonia at health facilities', ano: 2014 },
      { nome: 'Manual AIDPI Criança – Ministério da Saúde', ano: 2017 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'bronquiolite',
    nome: 'Bronquiolite viral aguda',
    categoria: 'respiratoria',
    amazonia: false,
    cid10: 'J21.9',
    tags: ['tosse', 'coriza', 'sibilancia', 'dispneia', 'febre', 'desidratacao', 'fraqueza'],
    definicao: 'Infecção viral aguda das vias aéreas inferiores em lactentes menores de 2 anos, caracterizada por obstrução dos bronquíolos com sibilância, estertores e desconforto respiratório após pródromo de resfriado. O diagnóstico é clínico e o tratamento é de suporte (oxigênio, hidratação e desobstrução nasal).',
    epidemiologia: 'Principal causa de internação de lactentes no primeiro ano de vida. No Amazonas a sazonalidade do vírus sincicial respiratório é precoce, com pico no período chuvoso (janeiro a junho), diferente das regiões Sul e Sudeste. Maior gravidade em prematuros, menores de 3 meses, cardiopatas, pneumopatas crônicos, desnutridos, expostos à fumaça e em comunidades sem acesso rápido a oxigênio. Palivizumabe é disponibilizado pelo SUS para grupos de risco na sazonalidade regional.',
    agente: 'Vírus sincicial respiratório (VSR) em 60 a 80% dos casos; rinovírus, metapneumovírus humano, parainfluenza, adenovírus, influenza e coronavírus sazonais; coinfecções são comuns.',
    transmissao: 'Contato direto com secreções respiratórias e superfícies contaminadas (mãos) e gotículas; o VSR sobrevive horas em superfícies.',
    incubacao: '2 a 8 dias (média 4 a 6 dias); eliminação viral por 1 a 3 semanas.',
    manifestacoes: [
      'Pródromo de 2 a 3 dias com coriza, obstrução nasal, tosse e febre baixa.',
      'Evolução para taquipneia, sibilância difusa, estertores finos e tempo expiratório prolongado.',
      'Tiragem subcostal e intercostal, batimento de asa nasal e gemência nos casos moderados e graves.',
      'Dificuldade para mamar por obstrução nasal e cansaço; redução da diurese.',
      'Apneia como manifestação inicial em prematuros e menores de 2 meses.',
      'Pico de gravidade entre o 3º e 5º dia de doença, com resolução gradual em 1 a 2 semanas (tosse pode persistir 3 a 4 semanas).'
    ],
    sinaisAlarme: [
      'Apneia ou pausas respiratórias, cianose.',
      'Saturação abaixo de 92% em ar ambiente.',
      'Frequência respiratória acima de 60 a 70 irpm com tiragem importante ou gemência.',
      'Recusa alimentar (ingestão abaixo de 50 a 75% do habitual) ou sinais de desidratação.',
      'Letargia, hipotonia ou irritabilidade extrema.',
      'Idade menor de 3 meses, prematuridade abaixo de 32 semanas, cardiopatia ou pneumopatia.'
    ],
    diagnosticoDiferencial: ['pneumonia', 'asma', 'coqueluche', 'laringotraqueíte', 'aspiração de corpo estranho', 'insuficiência cardíaca e cardiopatia congênita', 'refluxo com aspiração', 'fibrose cística', 'sepse'],
    exames: ['oximetria de pulso', 'painel viral ou teste rápido para VSR (opcional, para coorte)', 'radiografia_torax', 'hemograma', 'pcr', 'gasometria', 'eletrolitos', 'sodio', 'hemocultura (lactente febril grave)', 'urina_1'],
    criteriosDiagnosticos: [
      'Diagnóstico clínico: primeiro episódio de sibilância ou desconforto respiratório em menor de 2 anos, precedido por sintomas de via aérea superior, no período sazonal.',
      'Radiografia não é rotina; indicada se dúvida diagnóstica, gravidade, febre alta persistente ou piora súbita.',
      'Exames laboratoriais não são necessários na maioria; hemograma, PCR e culturas em lactentes com febre alta ou toxemia para excluir infecção bacteriana.',
      'Identificação viral não altera a conduta, mas pode orientar isolamento em coorte.',
      'Avaliar gravidade por escala (FR, tiragem, saturação, alimentação, estado geral) a cada reavaliação.'
    ],
    classificacaoGravidade: [
      { nivel: 'Leve', criterios: 'Saturação igual ou maior que 92 a 94%, FR abaixo de 60 irpm, tiragem leve ou ausente, alimentando-se bem, sem fatores de risco. Tratamento domiciliar com orientação e reavaliação.' },
      { nivel: 'Moderada', criterios: 'Saturação entre 90 e 92%, FR de 60 a 70 irpm, tiragem moderada, alimentação reduzida (50 a 75%), ou fatores de risco. Observação com oxigênio e hidratação; internação se não melhorar.' },
      { nivel: 'Grave', criterios: 'Saturação abaixo de 90%, FR acima de 70 irpm ou irregular, tiragem intensa, gemência, apneia, cianose, letargia ou incapacidade de alimentar-se. Internação, oxigênio (alto fluxo se disponível) e avaliação de UTI.' }
    ],
    tratamento: [
      'Suporte é o pilar: desobstrução nasal com soro fisiológico e aspiração suave, posicionamento com cabeceira elevada, fracionamento das mamadas.',
      'Oxigênio suplementar se saturação persistentemente abaixo de 90 a 92% (cateter nasal de baixo fluxo ou cânula nasal de alto fluxo 1 a 2 L/kg/min quando disponível); alvo 92 a 95%.',
      'Hidratação: manter aleitamento; se ingestão abaixo de 50 a 75% do habitual, sonda nasogástrica ou fluidos IV isotônicos com cautela (risco de hiponatremia e SIADH).',
      'Broncodilatadores (salbutamol) não são recomendados de rotina; pode-se fazer uma prova terapêutica em lactentes maiores com história familiar de asma ou atopia e manter apenas se resposta objetiva; adrenalina nebulizada apenas em ambiente hospitalar conforme protocolo.',
      'Corticoides sistêmicos ou inalatórios, antibióticos, fisioterapia respiratória de rotina, xaropes e descongestionantes não estão indicados.',
      'Solução salina hipertônica 3% nebulizada pode ser considerada apenas em lactentes internados, conforme protocolo do serviço.',
      'Antibiótico somente se infecção bacteriana comprovada ou fortemente suspeita (otite média, pneumonia bacteriana, sepse).',
      'Antitérmico se febre (paracetamol ou dipirona).',
      'Suporte ventilatório: CPAP ou cânula de alto fluxo nos casos graves; ventilação mecânica em UTI se falência respiratória ou apneias.'
    ],
    medicamentos: [
      { medId: 'soro_fisiologico', esquema: 'Instilação nasal de SF 0,9% (1 a 3 mL por narina) antes das mamadas e aspiração suave; fluidos IV isotônicos (SF 0,9% ou ringer com glicose) na manutenção quando via oral insuficiente.' },
      { medId: 'salbutamol', esquema: 'Não recomendado de rotina; prova terapêutica opcional: 100 mcg/jato, 2 a 4 jatos com espaçador e máscara; manter apenas se resposta clínica objetiva.' },
      { medId: 'paracetamol', esquema: 'Febre ou desconforto: 10 a 15 mg/kg/dose VO a cada 6 h, conforme bula.' },
      { medId: 'adrenalina', esquema: 'Nebulização de adrenalina (solução 1 mg/mL) apenas em ambiente hospitalar, 0,5 mL/kg (máximo 3 a 5 mL) diluída em SF, conforme protocolo do serviço; efeito transitório.' },
      { medId: null, nome: 'Palivizumabe', esquema: 'Profilaxia mensal IM (15 mg/kg) durante a sazonalidade para prematuros com menos de 29 semanas até 1 ano, cardiopatas e displásicos até 2 anos, conforme portaria do MS.' }
    ],
    criteriosInternacao: [
      'Saturação persistentemente abaixo de 90 a 92% ou necessidade de oxigênio.',
      'Apneia, cianose ou desconforto respiratório moderado a grave.',
      'Ingestão oral insuficiente ou desidratação.',
      'Idade menor de 3 meses (especialmente menor de 6 semanas), prematuridade, cardiopatia, pneumopatia crônica ou imunodeficiência.',
      'Impossibilidade de cuidado e retorno adequados no domicílio (distância, vulnerabilidade).'
    ],
    criteriosUTI: [
      'Apneias recorrentes.',
      'Insuficiência respiratória com necessidade de ventilação não invasiva ou invasiva.',
      'Saturação abaixo de 90% apesar de oxigênio suplementar ou alto fluxo.',
      'Acidose respiratória (pCO2 acima de 55 a 60 mmHg) ou fadiga.',
      'Instabilidade hemodinâmica ou alteração de consciência.'
    ],
    criteriosAlta: [
      'Saturação igual ou maior que 92% em ar ambiente por pelo menos 12 horas, incluindo durante o sono.',
      'Frequência respiratória adequada para a idade, sem tiragem importante.',
      'Alimentação oral suficiente (acima de 75% do habitual).',
      'Responsável apto a fazer desobstrução nasal e reconhecer sinais de alarme.'
    ],
    orientacoes: [
      'Limpar o nariz com soro fisiológico várias vezes ao dia, principalmente antes das mamadas e de dormir.',
      'Oferecer mamadas menores e mais frequentes; observar quantidade de fraldas molhadas.',
      'Retornar imediatamente se respiração muito rápida, afundamento do peito, pausas na respiração, lábios roxos, recusa das mamadas ou sonolência.',
      'Não usar xaropes, descongestionantes ou antibióticos sem prescrição.',
      'Evitar fumaça de cigarro e de lenha; lavar as mãos; evitar contato com pessoas resfriadas.'
    ],
    retorno: 'Reavaliação em 24 a 48 horas (o pico de gravidade ocorre entre o 3º e 5º dia); retorno imediato se sinais de alarme.',
    prevencao: [
      'Lavagem das mãos e limitação de contato com pessoas com sintomas respiratórios.',
      'Aleitamento materno e vacinação em dia (influenza a partir de 6 meses, coqueluche).',
      'Ambiente livre de tabaco e fumaça de fogão a lenha.',
      'Palivizumabe para grupos de risco durante a sazonalidade regional; vacina VSR para gestantes e anticorpo monoclonal de longa ação conforme incorporação pelo PNI.',
      'Isolamento de contato e coorte em enfermarias.'
    ],
    fontes: [
      { nome: 'Diretrizes para o manejo da infecção causada pelo vírus sincicial respiratório – SBP', ano: 2017 },
      { nome: 'American Academy of Pediatrics – Clinical Practice Guideline: bronchiolitis', ano: 2014 },
      { nome: 'Portaria MS nº 522 – Protocolo de uso do palivizumabe', ano: 2013 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'asma',
    nome: 'Asma – crise aguda (exacerbação)',
    categoria: 'respiratoria',
    amazonia: false,
    cid10: 'J45.9',
    tags: ['sibilancia', 'dispneia', 'tosse', 'coriza', 'alteracao_consciencia', 'fraqueza', 'sudorese'],
    definicao: 'Doença inflamatória crônica das vias aéreas com episódios recorrentes de sibilância, dispneia, tosse e aperto no peito, reversíveis espontaneamente ou com tratamento. A crise aguda (exacerbação) é a piora progressiva desses sintomas com obstrução ao fluxo aéreo e é uma emergência quando há hipoxemia ou fadiga.',
    epidemiologia: 'Prevalência elevada em escolares e adolescentes no Brasil; em Manaus a umidade, os ácaros, a fumaça das queimadas (agosto a novembro) e as infecções virais do período chuvoso são desencadeantes importantes. A falta de controle com corticoide inalatório e o acesso limitado a espaçadores no interior aumentam as crises graves. Diferenciar de sibilância transitória do lactente e de bronquiolite em menores de 2 anos.',
    agente: 'Não infecciosa; exacerbações desencadeadas por infecções virais (rinovírus, VSR, influenza), alérgenos (ácaros, baratas, fungos), fumaça, poluição, exercício, mudanças climáticas e má adesão ao tratamento de controle.',
    transmissao: 'Não se aplica (doença não transmissível); os vírus desencadeantes transmitem-se por gotículas e contato.',
    incubacao: 'Não se aplica; a crise pode instalar-se em horas (viral: 1 a 3 dias após o resfriado) ou minutos (alérgeno, exercício).',
    manifestacoes: [
      'Sibilância expiratória difusa, tosse seca persistente, principalmente noturna ou ao esforço.',
      'Dispneia, taquipneia, tempo expiratório prolongado e aperto no peito.',
      'Uso de musculatura acessória, tiragem intercostal e supraesternal, batimento de asa nasal.',
      'Dificuldade para falar frases completas ou para mamar; preferência pela posição sentada.',
      'Agitação, sudorese e taquicardia.',
      'Na crise muito grave: tórax silencioso (ausência de sibilos por fluxo mínimo), cianose, sonolência, bradicardia e respiração paradoxal.'
    ],
    sinaisAlarme: [
      'Saturação abaixo de 92% em ar ambiente ou cianose.',
      'Incapacidade de falar ou de mamar, frases entrecortadas.',
      'Tórax silencioso, esforço respiratório intenso ou respiração paradoxal.',
      'Sonolência, confusão ou agitação intensa.',
      'Ausência de resposta a 3 doses de salbutamol na primeira hora.',
      'História de crise com internação em UTI ou intubação, uso de corticoide oral recente, crises frequentes.'
    ],
    diagnosticoDiferencial: ['bronquiolite', 'pneumonia', 'aspiração de corpo estranho', 'laringotraqueíte', 'anafilaxia', 'insuficiência cardíaca', 'disfunção de cordas vocais', 'tuberculose com compressão brônquica', 'fibrose cística'],
    exames: ['oximetria de pulso', 'pico de fluxo expiratório (maiores de 6 anos)', 'gasometria (crise grave)', 'radiografia_torax (suspeita de pneumonia, pneumotórax ou corpo estranho)', 'hemograma', 'eletrolitos', 'potassio', 'glicemia'],
    criteriosDiagnosticos: [
      'História de sintomas respiratórios recorrentes (sibilância, tosse, dispneia) variáveis no tempo, piores à noite ou pela manhã, desencadeados por infecção viral, exercício, alérgenos ou riso, com resposta a broncodilatador.',
      'Em maiores de 5 a 6 anos: espirometria com obstrução reversível (aumento de VEF1 acima de 12% após broncodilatador) confirma; na crise, pico de fluxo abaixo de 50% do previsto indica gravidade.',
      'Em pré-escolares: diagnóstico clínico probabilístico (episódios recorrentes, atopia, resposta ao tratamento); sibilância no primeiro episódio em lactente sugere bronquiolite.',
      'Gravidade da crise avaliada por FR, uso de musculatura acessória, fala, nível de consciência, saturação e resposta ao tratamento inicial.'
    ],
    classificacaoGravidade: [
      { nivel: 'Leve a moderada', criterios: 'Fala frases completas ou parciais, prefere sentar, não agitada, FR aumentada, sem uso importante de musculatura acessória, FC até 120 a 140 bpm (conforme idade), saturação de 92 a 95%, pico de fluxo acima de 50%. Salbutamol inalatório e corticoide oral precoce; reavaliar em 1 hora.' },
      { nivel: 'Grave', criterios: 'Fala palavras isoladas, sentada inclinada para frente, agitada, FR acima de 30 irpm (escolar) ou muito elevada, uso de musculatura acessória, FC acima de 120 a 140 bpm, saturação abaixo de 92%, pico de fluxo abaixo de 50%. Oxigênio, salbutamol + ipratrópio, corticoide sistêmico, internação.' },
      { nivel: 'Iminência de parada respiratória', criterios: 'Sonolência, confusão, tórax silencioso, bradicardia, cianose, respiração paradoxal, incapacidade de falar. UTI, sulfato de magnésio IV, adrenalina IM se anafilaxia, preparo para intubação.' }
    ],
    tratamento: [
      'Salbutamol inalatório com espaçador: 100 mcg/jato, 2 a 4 jatos (até 10 jatos em crises graves) a cada 20 minutos na primeira hora, depois a cada 1 a 4 horas conforme resposta; nebulização 0,15 mg/kg (mínimo 2,5 mg, máximo 5 mg) em SF com oxigênio como alternativa.',
      'Oxigênio se saturação abaixo de 92 a 94%, com alvo de 94 a 98%.',
      'Corticoide sistêmico precoce na primeira hora em crises moderadas e graves: prednisolona 1 a 2 mg/kg/dia VO (máximo 40 mg) por 3 a 5 dias; hidrocortisona ou metilprednisolona IV se via oral inviável.',
      'Brometo de ipratrópio inalatório associado ao salbutamol nas crises moderadas a graves: 250 mcg (menores de 20 kg) ou 500 mcg por nebulização a cada 20 minutos por 3 doses (ou 4 a 8 jatos de 20 mcg com espaçador).',
      'Sulfato de magnésio IV nas crises graves sem resposta na primeira hora: 25 a 50 mg/kg (máximo 2 g) em 20 a 30 minutos, com monitorização.',
      'Adrenalina IM 0,01 mg/kg se anafilaxia ou crise muito grave sem resposta, conforme protocolo.',
      'Hidratação de manutenção, evitar sedativos, antibiótico apenas se infecção bacteriana comprovada.',
      'Reavaliar a cada 20 a 60 minutos: alta se resposta sustentada por 1 a 3 horas com saturação acima de 94% e pico de fluxo acima de 60 a 80%.',
      'Na alta: prescrever salbutamol de resgate com espaçador, corticoide oral para completar 3 a 5 dias, iniciar ou ajustar corticoide inalatório de controle (beclometasona ou budesonida) e plano de ação escrito; encaminhar para acompanhamento.'
    ],
    medicamentos: [
      { medId: 'salbutamol', esquema: 'Spray 100 mcg/jato com espaçador: 2 a 4 jatos (até 10 em crise grave) a cada 20 min na 1ª hora, depois a cada 1 a 4 h. Nebulização: 0,15 mg/kg/dose (mínimo 2,5 mg, máximo 5 mg) em 3 a 4 mL de SF com O2 6 a 8 L/min.' },
      { medId: null, nome: 'Brometo de ipratrópio', esquema: 'Crise moderada a grave, associado ao salbutamol: 250 mcg (menos de 20 kg) ou 500 mcg por nebulização a cada 20 min por 3 doses na 1ª hora.' },
      { medId: 'prednisolona', esquema: '1 a 2 mg/kg/dia VO (máximo 40 mg/dia) por 3 a 5 dias, sem necessidade de desmame.' },
      { medId: 'hidrocortisona', esquema: 'Via oral inviável: 4 a 5 mg/kg/dose IV (máximo 200 mg) a cada 6 h, conforme protocolo.' },
      { medId: null, nome: 'Sulfato de magnésio', esquema: 'Crise grave sem resposta: 25 a 50 mg/kg IV (máximo 2 g) em 20 a 30 min, com monitorização cardíaca e de pressão arterial.' },
      { medId: 'adrenalina', esquema: 'Anafilaxia ou crise muito grave refratária: 0,01 mg/kg IM (máximo 0,3 a 0,5 mg), repetir em 5 a 15 min se necessário.' },
      { medId: null, nome: 'Corticoide inalatório (beclometasona ou budesonida)', esquema: 'Tratamento de controle após a crise, dose conforme faixa etária e gravidade (GINA/PCDT), com espaçador; manter uso contínuo.' }
    ],
    criteriosInternacao: [
      'Ausência de resposta sustentada após 1 a 3 horas de tratamento na emergência.',
      'Saturação abaixo de 92% persistente ou necessidade contínua de oxigênio.',
      'Crise grave ou fatores de risco para asma fatal (internação prévia em UTI, uso de corticoide oral recente, má adesão).',
      'Incapacidade de ingerir medicação oral ou de cuidado adequado no domicílio.',
      'Complicações: pneumonia, pneumotórax, atelectasia.'
    ],
    criteriosUTI: [
      'Iminência de parada respiratória ou necessidade de ventilação (não invasiva ou invasiva).',
      'Hipoxemia refratária (saturação abaixo de 90% com oxigênio) ou pCO2 elevada com fadiga.',
      'Alteração do nível de consciência.',
      'Necessidade de salbutamol contínuo ou infusão IV de broncodilatador.',
      'Instabilidade hemodinâmica, pneumotórax ou arritmia.'
    ],
    criteriosAlta: [
      'Melhora clínica sustentada por 1 a 3 horas após a última dose de broncodilatador.',
      'Saturação igual ou maior que 94% em ar ambiente e pico de fluxo acima de 60 a 80% do previsto.',
      'Capacidade de usar spray com espaçador e compreensão do plano de ação.',
      'Corticoide oral e medicação de controle prescritos e retorno agendado.'
    ],
    orientacoes: [
      'Usar o salbutamol com espaçador conforme o plano de ação escrito e o corticoide oral pelo número de dias prescrito.',
      'Usar o corticoide inalatório de controle todos os dias, mesmo sem sintomas, e enxaguar a boca após o uso.',
      'Retornar imediatamente se falta de ar que não melhora com a bombinha, dificuldade para falar ou mamar, lábios roxos ou sonolência.',
      'Evitar fumaça de cigarro, queimadas, poeira, mofo e baratas; manter o ambiente do quarto limpo e ventilado.',
      'Manter vacinação (influenza anual, pneumocócica) e consultas regulares de controle da asma.'
    ],
    retorno: 'Reavaliação em 24 a 48 horas após a crise e consulta de controle em 1 a 4 semanas; retorno imediato se piora ou necessidade de salbutamol a cada menos de 3 a 4 horas.',
    prevencao: [
      'Tratamento de controle com corticoide inalatório e adesão ao plano de ação.',
      'Controle ambiental: ácaros, baratas, mofo, fumaça de tabaco e queimadas.',
      'Vacinação contra influenza e pneumococo.',
      'Educação da família sobre técnica inalatória e reconhecimento precoce da crise.',
      'Tratamento de rinite alérgica e obesidade associadas.'
    ],
    fontes: [
      { nome: 'GINA – Global Strategy for Asthma Management and Prevention', ano: 2024 },
      { nome: 'Protocolo Clínico e Diretrizes Terapêuticas da Asma – Ministério da Saúde/CONITEC', ano: 2021 },
      { nome: 'Diretrizes da Sociedade Brasileira de Pneumologia e Tisiologia para o manejo da asma', ano: 2012 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'infeccao_urinaria',
    nome: 'Infecção do trato urinário',
    categoria: 'urinaria',
    amazonia: false,
    cid10: 'N39.0',
    tags: ['febre', 'dor_urinaria', 'dor_abdominal', 'vomitos', 'reducao_diurese', 'fraqueza', 'ictericia', 'calafrios', 'perda_peso'],
    definicao: 'Infecção bacteriana do trato urinário, que pode acometer bexiga (cistite) ou rins (pielonefrite). Em lactentes manifesta-se como febre sem foco e exige urocultura colhida por método confiável; a pielonefrite pode causar cicatriz renal, especialmente em menores de 2 anos com refluxo vesicoureteral.',
    epidemiologia: 'Uma das infecções bacterianas mais frequentes na infância: cerca de 7% das crianças febris sem foco menores de 2 anos. Mais comum em meninos não circuncidados no primeiro ano e em meninas depois. Fatores de risco: malformações urinárias, refluxo vesicoureteral, constipação, disfunção miccional, fimose. No interior do Amazonas, a dificuldade de coleta de urocultura e de ultrassonografia exige encaminhamento após o episódio febril; sempre excluir malária em lactentes febris antes de atribuir a febre à ITU.',
    agente: 'Escherichia coli (70 a 90%); Klebsiella, Proteus (meninos, litíase), Enterococcus, Pseudomonas (malformações, uso prévio de antibiótico), Staphylococcus saprophyticus (adolescentes).',
    transmissao: 'Ascensão de bactérias da flora perineal e intestinal pela uretra; via hematogênica em neonatos.',
    incubacao: 'Não definida (infecção endógena); sintomas surgem em 1 a 3 dias após a colonização.',
    manifestacoes: [
      'Lactentes: febre sem foco (muitas vezes alta), irritabilidade, recusa alimentar, vômitos, baixo ganho de peso, icterícia prolongada em neonatos, urina com odor forte.',
      'Pré-escolares e escolares: disúria, polaciúria, urgência, incontinência nova ou enurese secundária, dor suprapúbica.',
      'Pielonefrite: febre alta com calafrios, dor lombar ou em flanco, punho-percussão lombar dolorosa, vômitos e toxemia.',
      'Hematúria macroscópica em cistite hemorrágica.',
      'Neonatos: sepse, hipotermia, letargia, distensão abdominal.'
    ],
    sinaisAlarme: [
      'Toxemia, letargia, má perfusão ou hipotensão (urossepse).',
      'Idade menor de 2 a 3 meses com febre.',
      'Vômitos persistentes ou incapacidade de tomar antibiótico oral.',
      'Desidratação ou oligúria.',
      'Massa abdominal, globo vesical ou jato urinário fraco (obstrução).',
      'Ausência de melhora após 48 horas de antibiótico adequado.'
    ],
    diagnosticoDiferencial: ['malaria', 'sepse', 'pneumonia', 'meningite', 'gastroenterite', 'vulvovaginite e balanopostite', 'apendicite', 'litíase urinária', 'glomerulonefrite'],
    exames: ['urina_1', 'urocultura', 'hemograma', 'pcr', 'ureia', 'creatinina', 'hemocultura (lactentes e graves)', 'gota_espessa', 'ultrassonografia de rins e vias urinárias', 'uretrocistografia miccional (indicações específicas)', 'cintilografia DMSA (indicações específicas)'],
    criteriosDiagnosticos: [
      'Suspeita clínica: febre sem foco em menores de 2 anos ou sintomas urinários; triagem com urina 1 (leucocitúria, nitrito positivo, bacteriúria).',
      'Coleta confiável para cultura: jato médio após higiene em crianças com controle esfincteriano; cateterismo vesical ou punção suprapúbica em lactentes. Saco coletor serve apenas para triagem: se positivo, confirmar com coleta estéril.',
      'Confirmação: urocultura com crescimento significativo (acima de 50.000 UFC/mL por cateterismo, qualquer crescimento de uropatógeno por punção suprapúbica, acima de 100.000 UFC/mL por jato médio) associada a leucocitúria.',
      'Pielonefrite sugerida por febre acima de 38,5 °C, dor lombar, PCR e leucocitose elevados.',
      'Ultrassonografia de rins e vias urinárias após a primeira ITU febril; uretrocistografia se ultrassonografia alterada, ITU recorrente ou atípica.'
    ],
    classificacaoGravidade: [
      { nivel: 'Cistite (ITU baixa)', criterios: 'Sintomas urinários sem febre alta ou toxemia, em criança maior de 2 anos, bom estado geral. Antibiótico oral por 3 a 5 dias.' },
      { nivel: 'Pielonefrite não complicada', criterios: 'Febre e sintomas sistêmicos em criança maior de 2 a 3 meses, hidratada, tolerando via oral, sem malformação conhecida. Antibiótico oral por 7 a 10 dias com reavaliação em 48 horas.' },
      { nivel: 'ITU complicada ou grave', criterios: 'Menor de 2 a 3 meses, toxemia, vômitos, desidratação, sepse, obstrução ou malformação urinária, imunossupressão, falha do tratamento oral. Internação com antibiótico parenteral.' }
    ],
    tratamento: [
      'Colher urina para cultura antes do antibiótico e iniciar empiricamente sem aguardar o resultado em crianças febris; ajustar conforme antibiograma.',
      'Cistite: nitrofurantoína 5 a 7 mg/kg/dia VO 6/6 h por 3 a 5 dias (maiores de 1 mês, apenas em ITU baixa) ou cefalexina 50 mg/kg/dia 6/6 h; sulfametoxazol-trimetoprim 8 a 10 mg/kg/dia de TMP 12/12 h (maiores de 2 meses) quando a resistência local for baixa.',
      'Pielonefrite não complicada oral: cefalexina 50 a 100 mg/kg/dia VO 6/6 h ou amoxicilina-clavulanato 50 mg/kg/dia (de amoxicilina) 8/8 h por 7 a 10 dias; cefuroxima é alternativa conforme disponibilidade.',
      'ITU complicada ou lactente jovem: ceftriaxona 50 a 75 mg/kg/dia IV 1 vez ao dia ou gentamicina 5 a 7,5 mg/kg/dia IV (com função renal normal); em menores de 2 meses ampicilina + gentamicina (cobertura de Enterococcus e Listeria); transição para via oral após 24 a 48 horas afebril, completando 10 a 14 dias.',
      'Hidratação adequada, antitérmico e tratamento da constipação associada.',
      'Reavaliar em 48 horas: se persistir febre, repetir urocultura, ultrassonografia (abscesso, obstrução) e ajustar antibiótico.',
      'Profilaxia antibiótica contínua apenas em refluxo de alto grau ou ITU recorrente conforme nefrologia pediátrica.',
      'Encaminhar para investigação por imagem e seguimento nefrológico conforme critérios.'
    ],
    medicamentos: [
      { medId: 'cefalexina', esquema: 'Cistite: 50 mg/kg/dia VO 6/6 h por 3 a 5 dias. Pielonefrite: 50 a 100 mg/kg/dia VO 6/6 h por 7 a 10 dias (máximo 4 g/dia).' },
      { medId: 'amoxicilina_clavulanato', esquema: 'Pielonefrite oral: 50 mg/kg/dia de amoxicilina VO dividida 8/8 h (ou 12/12 h com formulação 14:1) por 7 a 10 dias.' },
      { medId: 'nitrofurantoina', esquema: 'Cistite em maiores de 1 mês: 5 a 7 mg/kg/dia VO dividida 6/6 h por 3 a 5 dias (máximo 400 mg/dia); não usar em pielonefrite.' },
      { medId: 'sulfametoxazol_trimetoprim', esquema: 'Cistite em maiores de 2 meses (se resistência local baixa): 8 a 10 mg/kg/dia de trimetoprim VO 12/12 h por 3 a 5 dias.' },
      { medId: 'ceftriaxona', esquema: 'ITU complicada: 50 a 75 mg/kg/dia IV ou IM 1 vez ao dia (máximo 2 g/dia) até 24 a 48 h afebril, depois via oral.' },
      { medId: 'gentamicina', esquema: 'Alternativa parenteral: 5 a 7,5 mg/kg/dia IV 1 vez ao dia (função renal normal), monitorar creatinina; em neonatos intervalo conforme idade.' },
      { medId: 'ampicilina', esquema: 'Menores de 2 meses, associada a gentamicina: 100 a 200 mg/kg/dia IV dividida 6/6 h, conforme protocolo neonatal.' },
      { medId: 'paracetamol', esquema: 'Febre e dor: 10 a 15 mg/kg/dose VO a cada 6 h, conforme bula.' }
    ],
    criteriosInternacao: [
      'Idade menor de 2 a 3 meses com ITU febril.',
      'Toxemia, sepse ou instabilidade hemodinâmica.',
      'Vômitos, desidratação ou intolerância ao antibiótico oral.',
      'Obstrução urinária, abscesso renal ou malformação conhecida.',
      'Falha do tratamento oral em 48 horas ou impossibilidade de seguimento.'
    ],
    criteriosUTI: [
      'Choque séptico de foco urinário.',
      'Insuficiência renal aguda com necessidade de suporte.',
      'Neonato com sepse e instabilidade.'
    ],
    criteriosAlta: [
      'Afebril por 24 a 48 horas com melhora clínica.',
      'Tolerância ao antibiótico oral com antibiograma disponível ou esquema empírico adequado.',
      'Hidratação e diurese normais.',
      'Investigação por imagem programada e retorno agendado.'
    ],
    orientacoes: [
      'Dar o antibiótico até o final, mesmo que a criança melhore nos primeiros dias.',
      'Oferecer bastante líquido e incentivar a criança a urinar com frequência, sem segurar a urina.',
      'Tratar a constipação (prisão de ventre) e fazer higiene adequada da região genital (da frente para trás nas meninas).',
      'Retornar se febre persistir após 48 horas, vômitos, dor nas costas ou diminuição da urina.',
      'Comparecer ao ultrassom e às consultas de seguimento, pois algumas crianças têm alterações nos rins ou refluxo que precisam de acompanhamento.'
    ],
    retorno: 'Reavaliação em 48 horas com resultado da urocultura; consulta após o término do antibiótico com ultrassonografia agendada; retorno imediato se febre persistente ou piora.',
    prevencao: [
      'Tratamento da constipação e da disfunção miccional (micções regulares a cada 2 a 3 horas).',
      'Higiene genital adequada; tratamento de fimose sintomática ou balanopostite.',
      'Aleitamento materno e hidratação adequada.',
      'Investigação e seguimento de malformações do trato urinário.',
      'Evitar uso indiscriminado de antibióticos para reduzir resistência.'
    ],
    fontes: [
      { nome: 'Infecção do trato urinário – Documento científico do Departamento de Nefrologia da SBP', ano: 2016 },
      { nome: 'American Academy of Pediatrics – Urinary tract infection: clinical practice guideline (reafirmada)', ano: 2016 },
      { nome: 'NICE – Urinary tract infection in under 16s: diagnosis and management', ano: 2022 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'meningite',
    nome: 'Meningite bacteriana',
    categoria: 'neurologica',
    amazonia: false,
    cid10: 'G00.9',
    tags: ['febre', 'cefaleia', 'vomitos', 'rigidez_nuca', 'convulsao', 'alteracao_consciencia', 'petequias', 'fraqueza', 'sangramento'],
    definicao: 'Inflamação das meninges por infecção bacteriana, emergência médica com alta letalidade e sequelas neurológicas. O antibiótico deve ser iniciado imediatamente após a suspeita e a coleta de culturas, sem aguardar exames de imagem quando não indicados. Em lactentes os sinais são inespecíficos e a punção lombar deve ter limiar baixo.',
    epidemiologia: 'Após a introdução das vacinas Hib, pneumocócica e meningocócica C, a incidência caiu, mas casos persistem em não vacinados, com meningococo e pneumococo predominando após os 2 meses. No Amazonas, o acesso tardio (transporte fluvial), a baixa cobertura vacinal em áreas remotas e a confusão com malária cerebral atrasam o diagnóstico; a meningite tuberculosa e a criptocócica devem ser consideradas em evolução subaguda. Surtos de meningococo ocorrem em Manaus e áreas de aglomeração.',
    agente: 'Menores de 1 a 2 meses: Streptococcus agalactiae, Escherichia coli, Listeria monocytogenes. Acima de 2 a 3 meses: Streptococcus pneumoniae, Neisseria meningitidis e Haemophilus influenzae tipo b (não vacinados). Considerar Mycobacterium tuberculosis e Cryptococcus em quadros subagudos.',
    transmissao: 'Gotículas respiratórias e contato próximo com portadores nasofaríngeos (meningococo, pneumococo, Hib); vertical no período neonatal.',
    incubacao: 'Meningococo: 2 a 10 dias (média 3 a 4). Pneumococo e Hib: 1 a 4 dias.',
    manifestacoes: [
      'Febre, cefaleia intensa, vômitos em jato e fotofobia.',
      'Rigidez de nuca, sinais de Kernig e Brudzinski (pouco sensíveis em menores de 18 meses).',
      'Lactentes: febre ou hipotermia, irritabilidade, choro inconsolável, gemência, recusa alimentar, abaulamento de fontanela, convulsões, hipoatividade.',
      'Alteração de consciência, sonolência, confusão ou coma.',
      'Petéquias e púrpura de progressão rápida (meningococcemia), choque.',
      'Convulsões focais ou generalizadas e sinais neurológicos focais.',
      'Complicações: hipertensão intracraniana, coleção subdural, hidrocefalia, surdez.'
    ],
    sinaisAlarme: [
      'Petéquias ou púrpura, especialmente com febre e toxemia (meningococcemia).',
      'Rebaixamento de consciência, convulsões ou sinais focais.',
      'Sinais de hipertensão intracraniana: bradicardia, hipertensão, respiração irregular, anisocoria, papiledema.',
      'Choque: taquicardia, má perfusão, hipotensão.',
      'Abaulamento de fontanela em lactente.',
      'Piora após 24 a 48 horas de antibiótico.'
    ],
    diagnosticoDiferencial: ['malaria', 'sepse', 'encefalites virais (herpes, arboviroses)', 'meningite viral', 'tuberculose', 'oropouche', 'abscesso cerebral', 'febre_amarela', 'intoxicações e trauma craniano', 'hemorragia intracraniana'],
    exames: ['liquor', 'hemocultura', 'hemograma', 'pcr', 'glicemia', 'eletrolitos', 'sodio', 'gasometria', 'lactato', 'coagulograma', 'creatinina', 'gota_espessa', 'tomografia de crânio (sinais focais, coma ou hipertensão intracraniana antes da punção)', 'teste rápido de látex ou PCR no líquor'],
    criteriosDiagnosticos: [
      'Suspeita clínica: febre com sinais meníngeos, alteração de consciência, convulsão, petéquias ou, em lactentes, febre com irritabilidade, abaulamento de fontanela ou toxemia.',
      'Líquor compatível com meningite bacteriana: turvo, celularidade elevada (centenas a milhares) com predomínio de neutrófilos, proteína acima de 100 mg/dL e glicose abaixo de 40 mg/dL ou abaixo de 40% da glicemia; bacterioscopia (Gram), cultura, látex ou PCR identificam o agente.',
      'Punção lombar deve ser adiada (sem atrasar antibiótico) se instabilidade hemodinâmica, coagulopatia, infecção no local ou sinais de hipertensão intracraniana e déficit focal (fazer tomografia antes).',
      'Hemocultura antes do antibiótico em todos; glicemia simultânea ao líquor.',
      'Notificação imediata e quimioprofilaxia de contatos em meningococo e Hib.'
    ],
    classificacaoGravidade: [
      { nivel: 'Sem sinais de gravidade', criterios: 'Consciente, sem convulsões, hemodinamicamente estável, sem petéquias, sem sinais focais. Internação em enfermaria com antibiótico IV e monitorização neurológica.' },
      { nivel: 'Grave', criterios: 'Rebaixamento de consciência (escala de Glasgow abaixo de 12), convulsões, sinais focais, petéquias ou hiponatremia. Internação em unidade com monitorização contínua e avaliação de UTI.' },
      { nivel: 'Crítica', criterios: 'Coma, choque, púrpura extensa, coagulação intravascular disseminada, hipertensão intracraniana ou estado de mal epiléptico. UTI com suporte ventilatório e hemodinâmico.' }
    ],
    tratamento: [
      'Iniciar antibiótico IV em até 1 hora da suspeita, logo após colher hemocultura e líquor (se a punção for adiada, iniciar o antibiótico assim mesmo).',
      'Acima de 3 meses: ceftriaxona 100 mg/kg/dia IV dividida 12/12 h (máximo 4 g/dia); associar vancomicina 60 mg/kg/dia 6/6 h se suspeita de pneumococo resistente conforme protocolo local.',
      '1 a 3 meses: ampicilina 200 a 300 mg/kg/dia 6/6 h + ceftriaxona (ou cefotaxima); menores de 1 mês: ampicilina + cefotaxima ou ampicilina + gentamicina, conforme protocolo neonatal.',
      'Duração: meningococo 5 a 7 dias; Hib 7 a 10 dias; pneumococo 10 a 14 dias; agentes neonatais 14 a 21 dias.',
      'Dexametasona 0,15 mg/kg IV 6/6 h por 2 a 4 dias, iniciada antes ou junto com a primeira dose de antibiótico, em maiores de 6 semanas com suspeita de Hib ou pneumococo (reduz sequelas auditivas); não iniciar se já decorridas mais de 1 a 2 horas do antibiótico.',
      'Suporte: oxigênio, cabeceira elevada 30 graus, controle de glicemia e sódio (evitar hipotonicidade, monitorar SIADH), antitérmicos, controle de convulsões (diazepam ou midazolam, seguido de fenitoína ou fenobarbital).',
      'Choque: expansão com cristaloide 20 mL/kg e drogas vasoativas em UTI; meningococcemia com púrpura exige suporte intensivo precoce.',
      'Hipertensão intracraniana: manitol ou salina hipertônica em UTI, conforme protocolo.',
      'Repetir punção lombar em 24 a 48 horas em neonatos, pneumococo resistente ou ausência de melhora.',
      'Quimioprofilaxia dos contatos próximos: rifampicina (meningococo: 10 mg/kg 12/12 h por 2 dias, máximo 600 mg/dose; menores de 1 mês 5 mg/kg; Hib: 20 mg/kg/dia por 4 dias); alternativa ceftriaxona IM dose única em gestantes.',
      'Avaliação auditiva (BERA) após a alta em todos os casos.'
    ],
    medicamentos: [
      { medId: 'ceftriaxona', esquema: 'Maiores de 1 mês: 100 mg/kg/dia IV dividida 12/12 h (máximo 4 g/dia) por 7 a 14 dias conforme agente. Profilaxia de contatos gestantes: 250 mg IM dose única (125 mg em menores de 12 anos).' },
      { medId: 'ampicilina', esquema: 'Menores de 3 meses (cobertura de Listeria e estreptococo B): 200 a 300 mg/kg/dia IV dividida 6/6 h, associada a cefotaxima, ceftriaxona ou gentamicina conforme idade.' },
      { medId: 'gentamicina', esquema: 'Neonatos (com ampicilina): 4 a 5 mg/kg/dose IV com intervalo conforme idade gestacional e pós-natal, confirmar conforme protocolo neonatal.' },
      { medId: 'vancomicina', esquema: 'Suspeita de pneumococo resistente à ceftriaxona: 60 mg/kg/dia IV dividida 6/6 h, com nível sérico; suspender se sensibilidade confirmada.' },
      { medId: 'dexametasona', esquema: '0,15 mg/kg/dose IV 6/6 h por 2 a 4 dias, iniciada antes ou junto à primeira dose de antibiótico, em maiores de 6 semanas.' },
      { medId: 'diazepam', esquema: 'Convulsão: 0,2 a 0,3 mg/kg IV lento (máximo 10 mg) ou 0,5 mg/kg retal; repetir uma vez em 5 a 10 min se necessário.' },
      { medId: 'midazolam', esquema: 'Convulsão sem acesso venoso: 0,2 mg/kg IM ou 0,3 mg/kg bucal (máximo 10 mg); IV 0,1 a 0,2 mg/kg.' },
      { medId: 'fenitoina', esquema: 'Convulsão persistente após benzodiazepínico: 20 mg/kg IV em SF, velocidade máxima 1 mg/kg/min, com monitorização cardíaca.' },
      { medId: 'fenobarbital', esquema: 'Alternativa ou neonatos: 20 mg/kg IV lento (máximo 1 g), manutenção 3 a 5 mg/kg/dia, conforme protocolo.' },
      { medId: 'rifampicina', esquema: 'Quimioprofilaxia de contatos: meningococo 10 mg/kg 12/12 h por 2 dias (máximo 600 mg/dose; 5 mg/kg em menores de 1 mês); Hib 20 mg/kg 1 vez ao dia por 4 dias (máximo 600 mg).' },
      { medId: 'soro_fisiologico', esquema: 'Choque: 20 mL/kg em bolus, repetir conforme resposta; manutenção com solução isotônica, monitorando sódio.' }
    ],
    criteriosInternacao: [
      'Toda suspeita de meningite bacteriana deve ser internada para antibiótico IV.',
      'Febre sem foco em menores de 1 a 2 meses ou lactente toxemiado (investigar meningite).',
      'Petéquias com febre, convulsão febril complexa ou alteração de consciência.'
    ],
    criteriosUTI: [
      'Coma ou escala de Glasgow abaixo de 8 a 10, ou queda rápida do nível de consciência.',
      'Choque séptico ou púrpura fulminante.',
      'Estado de mal epiléptico ou convulsões refratárias.',
      'Sinais de hipertensão intracraniana ou herniação.',
      'Insuficiência respiratória ou necessidade de ventilação mecânica.',
      'Hiponatremia grave ou coagulação intravascular disseminada.'
    ],
    criteriosAlta: [
      'Esquema antibiótico completo pela via IV (ou transição segura conforme protocolo do serviço).',
      'Afebril por 24 a 48 horas, sem convulsões e com exame neurológico estável.',
      'Alimentação oral adequada.',
      'Avaliação auditiva agendada e seguimento neurológico e de desenvolvimento programado.'
    ],
    orientacoes: [
      'A criança precisa completar todo o antibiótico no hospital; a recuperação neurológica pode demorar.',
      'Todos os contatos próximos (casa, creche) devem receber o remédio preventivo indicado pela vigilância (nos casos de meningococo e Hib).',
      'Após a alta, retornar se febre, dor de cabeça forte, vômitos, sonolência, convulsão ou dificuldade para ouvir.',
      'Fazer o exame de audição e as consultas de acompanhamento do desenvolvimento.',
      'Manter vacinação em dia de todos os filhos.'
    ],
    retorno: 'Consulta em 1 a 2 semanas após a alta e avaliação auditiva em até 4 semanas; seguimento neurológico e do desenvolvimento por 1 a 2 anos; retorno imediato se sinais de alarme.',
    prevencao: [
      'Vacinação: pentavalente (Hib), pneumocócica 10-valente, meningocócica C e ACWY (adolescentes) e meningocócica B quando disponível.',
      'Quimioprofilaxia dos contatos próximos de meningococo e Hib em até 48 horas.',
      'Notificação imediata para bloqueio e investigação de surtos.',
      'Evitar aglomerações e ambientes fechados sem ventilação.',
      'Triagem e profilaxia de estreptococo B no pré-natal.'
    ],
    fontes: [
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde (capítulo de meningites)', ano: 2024 },
      { nome: 'IDSA – Practice guidelines for the management of bacterial meningitis', ano: 2004 },
      { nome: 'Tratado de Pediatria – Sociedade Brasileira de Pediatria (5ª ed.)', ano: 2022 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'sepse',
    nome: 'Sepse e choque séptico',
    categoria: 'infecciosa',
    amazonia: false,
    cid10: 'A41.9',
    tags: ['febre', 'alteracao_consciencia', 'dispneia', 'palidez', 'reducao_diurese', 'petequias', 'vomitos', 'fraqueza', 'calafrios', 'desidratacao', 'sudorese'],
    definicao: 'Disfunção orgânica potencialmente fatal causada por resposta desregulada do organismo a uma infecção. O choque séptico é a sepse com disfunção cardiovascular (hipotensão, necessidade de vasopressor ou hipoperfusão). O reconhecimento precoce (triagem por sinais vitais e perfusão) e o tratamento na primeira hora determinam o desfecho.',
    epidemiologia: 'Principal causa de morte em UTI pediátrica no Brasil, com maior letalidade em regiões com acesso tardio ao hospital, como o interior do Amazonas. Fatores de risco: menores de 1 ano, desnutrição, prematuridade, doença falciforme, imunossupressão, ausência de baço, cateteres. Na região, a malária grave, a leptospirose, a dengue grave, a febre amarela e a meningococcemia devem ser lembradas como causas de choque em crianças febris; solicitar gota espessa em toda criança com sepse.',
    agente: 'Bactérias (pneumococo, meningococo, S. aureus, estreptococo do grupo A, enterobactérias, estreptococo B e E. coli em neonatos), vírus (dengue, influenza), Plasmodium (malária grave), fungos (imunossuprimidos, prematuros).',
    transmissao: 'Depende do foco infeccioso primário (respiratório, urinário, cutâneo, abdominal, meníngeo, vetorial).',
    incubacao: 'Não se aplica; a progressão de infecção localizada para choque pode ocorrer em horas.',
    manifestacoes: [
      'Febre ou hipotermia (lactentes), taquicardia desproporcional à febre, taquipneia.',
      'Alteração do estado mental: irritabilidade, sonolência, choro fraco, hipoatividade, confusão.',
      'Alteração da perfusão: enchimento capilar acima de 2 segundos com extremidades frias e pulsos finos (choque frio) ou enchimento em flash com pulsos amplos e pele quente (choque quente).',
      'Diminuição da diurese (abaixo de 1 mL/kg/h).',
      'Petéquias ou púrpura (meningococcemia), livedo, cianose periférica.',
      'Hipotensão é sinal tardio em crianças: PAS abaixo de 70 + (2 x idade em anos) mmHg de 1 a 10 anos, abaixo de 70 mmHg em lactentes, abaixo de 60 mmHg em neonatos.',
      'Sinais do foco: tosse e desconforto respiratório, rigidez de nuca, dor abdominal, celulite, diarreia.'
    ],
    sinaisAlarme: [
      'Enchimento capilar acima de 2 segundos ou pulsos periféricos fracos ou ausentes.',
      'Alteração de consciência ou hipotonia.',
      'Hipotensão para a idade.',
      'Petéquias, púrpura ou cianose.',
      'Diurese reduzida ou lactato acima de 2 a 4 mmol/L.',
      'Desconforto respiratório ou saturação abaixo de 92%.',
      'Bradicardia ou hipotermia em lactente.'
    ],
    diagnosticoDiferencial: ['malaria', 'dengue', 'meningite', 'pneumonia', 'infeccao_urinaria', 'leptospirose', 'febre_amarela', 'desidratação grave por diarreia', 'choque hipovolêmico ou hemorrágico', 'cetoacidose diabética', 'miocardite e cardiopatias', 'anafilaxia', 'intoxicações'],
    exames: ['hemograma', 'pcr', 'lactato', 'gasometria', 'glicemia', 'eletrolitos', 'sodio', 'potassio', 'calcio', 'ureia', 'creatinina', 'coagulograma', 'hemocultura', 'urina_1', 'urocultura', 'liquor (se estável e suspeita meníngea)', 'radiografia_torax', 'gota_espessa', 'ns1_dengue', 'ast', 'alt', 'bilirrubinas'],
    criteriosDiagnosticos: [
      'Triagem: infecção suspeita ou confirmada associada a taquicardia, taquipneia, febre ou hipotermia e alteração de perfusão ou de consciência (ferramentas de triagem do serviço, por exemplo Phoenix ou critérios da SSC 2020).',
      'Choque séptico: sinais de hipoperfusão (enchimento capilar alterado, pulsos anormais, alteração mental, diurese reduzida) ou hipotensão, com ou sem hiperlactatemia.',
      'Disfunção orgânica: respiratória (hipoxemia), cardiovascular, neurológica, renal, hepática ou hematológica (plaquetopenia, coagulopatia).',
      'Coletar culturas antes do antibiótico sem atrasar a primeira dose; lactato e gasometria na chegada e após a reanimação.',
      'Buscar o foco: exame físico completo, imagem e exames dirigidos; em área endêmica, gota espessa e teste rápido de malária.'
    ],
    classificacaoGravidade: [
      { nivel: 'Sepse sem choque', criterios: 'Infecção com sinais sistêmicos (taquicardia, febre, taquipneia) e disfunção orgânica leve, sem hipoperfusão. Antibiótico na primeira hora, fluidos de manutenção, monitorização e reavaliação frequente.' },
      { nivel: 'Choque séptico compensado', criterios: 'Hipoperfusão (enchimento capilar alterado, pulsos anormais, alteração mental, oligúria) com pressão arterial normal. Expansão volêmica, antibiótico e preparo para vasopressor; internação em unidade com monitorização.' },
      { nivel: 'Choque séptico descompensado ou refratário', criterios: 'Hipotensão para a idade, choque persistente após 40 a 60 mL/kg de cristaloide ou necessidade de vasopressor; disfunção de múltiplos órgãos. UTI, drogas vasoativas, hidrocortisona em choque refratário a catecolaminas.' }
    ],
    tratamento: [
      'Primeiros 15 minutos: reconhecer, monitorizar (FC, FR, saturação, PA, perfusão, consciência), oxigênio, dois acessos venosos ou intraósseo, glicemia capilar e correção de hipoglicemia.',
      'Fluidos: bolus de cristaloide isotônico (SF 0,9% ou ringer lactato) 10 a 20 mL/kg em 5 a 20 minutos, reavaliando após cada bolus (perfusão, FC, fígado, estertores) até 40 a 60 mL/kg na primeira hora se houver sinais de hipoperfusão e sem sinais de sobrecarga. Em serviços sem UTI e sem ventilação disponível, seguir a recomendação da SSC 2020: bolus apenas se hipotensão, caso contrário manutenção e antibiótico; cautela extra em desnutridos, anemia grave e malária.',
      'Antibiótico de amplo espectro IV ou IM na primeira hora após coleta de culturas: comunitário acima de 1 mês: ceftriaxona 100 mg/kg/dia; associar oxacilina se foco de pele ou partes moles e vancomicina se suspeita de MRSA ou choque grave; abdominal: ceftriaxona + metronidazol; menor de 1 mês: ampicilina + gentamicina. Em área endêmica com gota espessa positiva ou forte suspeita: artesunato IV imediato.',
      'Vasopressor se choque persistir após fluidos: adrenalina 0,05 a 0,3 mcg/kg/min (choque frio) ou noradrenalina 0,05 a 0,3 mcg/kg/min (choque quente), podendo ser iniciados em veia periférica diluídos até acesso central; titular para perfusão e PA adequadas.',
      'Hidrocortisona 50 a 100 mg/m2/dia (ou 2 a 4 mg/kg/dia) IV em choque refratário a catecolaminas ou risco de insuficiência adrenal, conforme protocolo.',
      'Suporte: oxigênio ou ventilação mecânica (intubar com cautela hemodinâmica), correção de cálcio, glicose (evitar hiperglicemia acima de 180 mg/dL), transfusão se Hb abaixo de 7 g/dL, controle de temperatura.',
      'Controle do foco: drenagem de abscessos, remoção de cateteres, cirurgia quando indicada.',
      'Reavaliar lactato e perfusão a cada 1 a 2 horas; metas: enchimento capilar até 2 s, pulsos normais, diurese acima de 1 mL/kg/h, consciência normal, lactato em queda.',
      'Transferência precoce para hospital com UTI pediátrica, com o tratamento já iniciado.'
    ],
    medicamentos: [
      { medId: 'soro_fisiologico', esquema: 'Bolus de 10 a 20 mL/kg em 5 a 20 min, reavaliando após cada bolus, até 40 a 60 mL/kg na 1ª hora se hipoperfusão sem sobrecarga; ringer lactato é alternativa balanceada.' },
      { medId: 'ringer_lactato', esquema: 'Cristaloide balanceado para expansão: 10 a 20 mL/kg por bolus, mesma estratégia do SF 0,9%.' },
      { medId: 'ceftriaxona', esquema: 'Sepse comunitária acima de 1 mês: 100 mg/kg/dia IV dividida 12/12 h (máximo 4 g/dia), primeira dose na 1ª hora.' },
      { medId: 'oxacilina', esquema: 'Foco cutâneo ou osteoarticular: 150 a 200 mg/kg/dia IV dividida 6/6 h, associada a ceftriaxona.' },
      { medId: 'vancomicina', esquema: 'Choque grave ou suspeita de MRSA: 60 mg/kg/dia IV dividida 6/6 h (dose de ataque conforme protocolo), com nível sérico.' },
      { medId: 'metronidazol', esquema: 'Foco abdominal: 30 mg/kg/dia IV dividida 8/8 h (máximo 1,5 g/dia), associado a ceftriaxona.' },
      { medId: 'ampicilina', esquema: 'Menores de 1 mês: 100 a 200 mg/kg/dia IV dividida 6/6 h (300 mg/kg/dia se meningite), associada a gentamicina.' },
      { medId: 'gentamicina', esquema: 'Menores de 1 mês: 4 a 5 mg/kg/dose IV com intervalo conforme idade gestacional e pós-natal, confirmar conforme protocolo neonatal.' },
      { medId: 'artesunato', esquema: 'Sepse com malária grave confirmada ou fortemente suspeita: 2,4 mg/kg IV (3 mg/kg em menores de 20 kg) nas horas 0, 12, 24 e depois diária, conforme guia do MS.' },
      { medId: 'adrenalina', esquema: 'Choque frio refratário a fluidos: infusão contínua 0,05 a 0,3 mcg/kg/min (até 1 mcg/kg/min), titulada; pode iniciar em veia periférica diluída até acesso central.' },
      { medId: 'hidrocortisona', esquema: 'Choque refratário a catecolaminas: 50 a 100 mg/m2/dia IV (aproximadamente 2 a 4 mg/kg/dia) dividida 6/6 h, conforme protocolo.' },
      { medId: 'glicose', esquema: 'Hipoglicemia: glicose 10% 2 a 5 mL/kg IV; manter glicemia entre 70 e 180 mg/dL.' }
    ],
    criteriosInternacao: [
      'Toda criança com sepse suspeita deve ser internada em unidade com monitorização.',
      'Sinais de hipoperfusão, alteração de consciência ou disfunção orgânica.',
      'Lactentes menores de 3 meses com febre e toxemia.',
      'Comorbidades de risco (desnutrição, doença falciforme, imunossupressão).'
    ],
    criteriosUTI: [
      'Choque séptico com necessidade de vasopressor ou persistente após 40 a 60 mL/kg.',
      'Insuficiência respiratória ou necessidade de ventilação mecânica.',
      'Alteração de consciência importante, convulsões ou coagulopatia com sangramento.',
      'Disfunção de dois ou mais órgãos, lactato persistentemente elevado.',
      'Púrpura fulminante ou meningococcemia.'
    ],
    criteriosAlta: [
      'Resolução do choque e das disfunções orgânicas, sem drogas vasoativas por 24 a 48 horas.',
      'Foco infeccioso controlado e afebril por 24 a 48 horas.',
      'Antibiótico completado ou transição segura para via oral com adesão garantida.',
      'Alimentação e diurese normais; seguimento agendado.'
    ],
    orientacoes: [
      'A sepse é uma emergência: crianças com febre e mãos e pés frios, sonolência, manchas roxas na pele ou respiração rápida devem ser levadas imediatamente ao serviço mais próximo.',
      'Completar o antibiótico prescrito e comparecer ao retorno.',
      'Após sepse grave, observar o desenvolvimento, a audição e o crescimento nos meses seguintes.',
      'Manter vacinação em dia e tratar infecções de pele, ouvido e urina precocemente.',
      'Em área de malária, fazer gota espessa em qualquer febre.'
    ],
    retorno: 'Consulta em 1 semana após a alta e seguimento em 1 a 3 meses para avaliar sequelas; retorno imediato se febre ou sinais de alarme.',
    prevencao: [
      'Vacinação completa (pneumocócica, Hib, meningocócica, influenza).',
      'Aleitamento materno e nutrição adequada.',
      'Tratamento precoce de infecções localizadas e higiene das mãos.',
      'Profilaxia com penicilina em doença falciforme e asplenia.',
      'Capacitação das unidades do interior para reconhecimento e primeira hora do tratamento, com acesso a antibiótico, fluidos e oxigênio.'
    ],
    fontes: [
      { nome: 'Surviving Sepsis Campaign – International guidelines for the management of septic shock and sepsis-associated organ dysfunction in children', ano: 2020 },
      { nome: 'Phoenix Sepsis Criteria – Society of Critical Care Medicine', ano: 2024 },
      { nome: 'OMS – Pocket book of hospital care for children (2ª ed.)', ano: 2013 },
      { nome: 'Instituto Latino-Americano de Sepse (ILAS) – Protocolo pediátrico', ano: 2019 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'doenca_diarreica',
    nome: 'Doença diarreica aguda e desidratação',
    categoria: 'gastrointestinal',
    amazonia: false,
    cid10: 'A09',
    tags: ['diarreia', 'vomitos', 'desidratacao', 'febre', 'dor_abdominal', 'reducao_diurese', 'sangramento', 'fraqueza', 'alteracao_consciencia'],
    definicao: 'Ocorrência de três ou mais evacuações amolecidas ou líquidas em 24 horas, com duração de até 14 dias, geralmente de causa infecciosa. A principal complicação é a desidratação, cuja avaliação e correção seguem os planos A, B e C do Ministério da Saúde e da OMS. Disenteria é a diarreia com sangue visível.',
    epidemiologia: 'Uma das principais causas de morbidade e internação em menores de 5 anos no Amazonas, com aumento no período de cheia (contaminação de fontes de água em comunidades ribeirinhas) e na seca extrema (escassez de água limpa). O rotavírus predomina em lactentes, mas a cobertura vacinal reduziu casos graves. Fatores de risco: falta de saneamento, água não tratada dos rios e igarapés, desmame precoce, desnutrição, deficiência de zinco e vitamina A. Surtos de cólera são raros, mas a vigilância se mantém.',
    agente: 'Vírus: rotavírus, norovírus, adenovírus entérico, astrovírus. Bactérias: Escherichia coli (enterotoxigênica, enteropatogênica, entero-hemorrágica), Shigella, Salmonella, Campylobacter, Vibrio cholerae. Protozoários: Giardia lamblia, Entamoeba histolytica, Cryptosporidium.',
    transmissao: 'Fecal-oral por água e alimentos contaminados, mãos, objetos e contato pessoa a pessoa.',
    incubacao: 'Vírus: 1 a 3 dias. Bactérias: horas a 5 dias. Protozoários: 1 a 3 semanas.',
    manifestacoes: [
      'Evacuações líquidas frequentes, com ou sem muco ou sangue; vômitos e febre.',
      'Dor abdominal em cólica, distensão e inapetência.',
      'Desidratação leve: sede, mucosas secas, irritabilidade.',
      'Desidratação moderada: olhos fundos, turgor cutâneo diminuído (prega desfaz lentamente), sede intensa, oligúria, fontanela deprimida.',
      'Desidratação grave: letargia ou inconsciência, incapacidade de beber, pulso fraco, enchimento capilar acima de 2 segundos, prega desfaz muito lentamente, choque.',
      'Disenteria: sangue nas fezes, febre alta, tenesmo (Shigella, Campylobacter, E. histolytica).',
      'Diarreia persistente (acima de 14 dias): perda de peso, desnutrição, intolerância à lactose.'
    ],
    sinaisAlarme: [
      'Letargia, sonolência ou inconsciência.',
      'Incapacidade de beber ou mamar, vômitos de tudo que ingere.',
      'Olhos fundos, prega cutânea que desfaz muito lentamente, extremidades frias.',
      'Ausência de urina por 6 a 8 horas.',
      'Sangue nas fezes com febre alta ou toxemia.',
      'Convulsão (hiponatremia, hipernatremia, hipoglicemia ou shigelose).',
      'Distensão abdominal importante (íleo, hipocalemia) ou sinais de abdome cirúrgico.'
    ],
    diagnosticoDiferencial: ['parasitoses_intestinais', 'infeccao_urinaria', 'malaria', 'sepse', 'apendicite e invaginação intestinal', 'intolerância à lactose e alergia à proteína do leite', 'cetoacidose diabética', 'intoxicação alimentar', 'doenca_chagas (forma oral com diarreia)'],
    exames: ['avaliação clínica do grau de desidratação (não requer exames)', 'eletrolitos', 'sodio', 'potassio', 'glicemia', 'gasometria', 'ureia', 'creatinina', 'hemograma', 'exame_parasitologico_fezes', 'coprocultura (disenteria, surto, imunossuprimido)', 'pesquisa de rotavírus', 'gota_espessa (se febre em área endêmica)', 'urina_1'],
    criteriosDiagnosticos: [
      'Diagnóstico clínico: 3 ou mais evacuações amolecidas ou líquidas em 24 horas com menos de 14 dias de duração.',
      'Classificação da desidratação (MS/OMS) por observação de estado geral, olhos, sede e prega cutânea: sem desidratação (Plano A), com desidratação (dois ou mais sinais: inquieto ou irritado, olhos fundos, bebe avidamente, prega desfaz lentamente: Plano B), desidratação grave (dois ou mais: letárgico ou inconsciente, olhos fundos, não consegue beber, prega desfaz muito lentamente: Plano C).',
      'Perda de peso aguda, quando conhecida, estima o déficit: 3 a 5% leve, 6 a 9% moderada, 10% ou mais grave.',
      'Exames laboratoriais apenas em desidratação grave, suspeita de distúrbio eletrolítico, diarreia persistente, disenteria ou surto.',
      'Notificação de surtos e de casos suspeitos de cólera.'
    ],
    classificacaoGravidade: [
      { nivel: 'Sem desidratação (Plano A)', criterios: 'Alerta, olhos normais, bebe normalmente, prega desfaz rapidamente. Tratamento domiciliar: SRO após cada evacuação, alimentação mantida, zinco e sinais de perigo.' },
      { nivel: 'Com desidratação (Plano B)', criterios: 'Dois ou mais: inquieto ou irritado, olhos fundos, bebe avidamente com sede, prega desfaz lentamente. Terapia de reidratação oral supervisionada na unidade por 4 horas.' },
      { nivel: 'Desidratação grave (Plano C)', criterios: 'Dois ou mais: letárgico ou inconsciente, olhos fundos, não consegue beber, prega desfaz muito lentamente; ou choque. Hidratação venosa imediata.' }
    ],
    tratamento: [
      'Plano A (sem desidratação, em casa): oferecer SRO após cada evacuação líquida: menores de 1 ano 50 a 100 mL; 1 a 10 anos 100 a 200 mL; maiores de 10 anos à vontade; manter aleitamento materno e alimentação habitual; zinco por 10 a 14 dias; orientar sinais de perigo e retorno.',
      'Plano B (na unidade): SRO 50 a 100 mL/kg (aproximadamente 75 mL/kg) em 4 horas, em pequenos volumes frequentes (colher, copo ou sonda nasogástrica se vômitos); manter aleitamento; reavaliar a cada hora e ao final de 4 horas: se hidratada, Plano A; se ainda desidratada, repetir Plano B; se piorou, Plano C.',
      'Vômitos persistentes no Plano B: ondansetrona 0,15 mg/kg VO dose única (maiores de 6 meses) e reiniciar SRO em 10 a 15 minutos; se vômitos continuarem, gastróclise com SRO 20 a 30 mL/kg/h por sonda nasogástrica.',
      'Plano C (hidratação venosa, OMS): ringer lactato ou SF 0,9% 100 mL/kg: menores de 1 ano: 30 mL/kg em 1 hora e depois 70 mL/kg em 5 horas; 1 ano ou mais: 30 mL/kg em 30 minutos e depois 70 mL/kg em 2 horas e meia; reavaliar a cada 15 a 30 minutos, repetir a fase inicial se pulso fraco persistir; iniciar SRO assim que conseguir beber (5 mL/kg/h). Esquema alternativo do MS: SF 0,9% 20 mL/kg em 30 minutos, repetido até hidratação, seguido de manutenção e reposição de perdas; confirmar conforme protocolo do serviço.',
      'Choque: bolus de 20 mL/kg em 5 a 20 minutos, repetir até 3 vezes se necessário, e avaliar sepse.',
      'Após Plano C: fase de manutenção com solução isotônica com glicose (Holliday-Segar) e reposição de perdas (SRO ou solução venosa 1:1), com potássio após diurese.',
      'Zinco: 10 mg/dia (menores de 6 meses) ou 20 mg/dia (6 meses ou mais) VO por 10 a 14 dias em todos os casos.',
      'Antibiótico apenas em disenteria com febre ou toxemia (azitromicina ou ceftriaxona), cólera (azitromicina), imunossuprimidos ou lactentes muito jovens com bactéria invasiva; amebíase e giardíase confirmadas: metronidazol ou nitazoxanida.',
      'Não usar antidiarreicos (loperamida), antieméticos como metoclopramida em lactentes, nem restringir alimentação; probióticos são opcionais.',
      'Diarreia persistente: investigar intolerância à lactose e parasitoses, avaliar estado nutricional e considerar fórmula sem lactose temporária.'
    ],
    medicamentos: [
      { medId: 'sais_reidratacao_oral', esquema: 'Plano A: 50 a 100 mL (menor de 1 ano) ou 100 a 200 mL (1 a 10 anos) após cada evacuação líquida. Plano B: 50 a 100 mL/kg (aproximadamente 75 mL/kg) em 4 h, em pequenos volumes frequentes. Preparar 1 envelope em 1 litro de água tratada; validade 24 h.' },
      { medId: 'zinco', esquema: '10 mg/dia VO (menores de 6 meses) ou 20 mg/dia (6 meses ou mais) por 10 a 14 dias.' },
      { medId: 'ringer_lactato', esquema: 'Plano C: 100 mL/kg: menores de 1 ano 30 mL/kg em 1 h + 70 mL/kg em 5 h; 1 ano ou mais 30 mL/kg em 30 min + 70 mL/kg em 2 h 30 min.' },
      { medId: 'soro_fisiologico', esquema: 'Alternativa no Plano C (mesmos volumes do ringer) ou esquema do MS: 20 mL/kg em 30 min repetido até hidratação; choque: 20 mL/kg em 5 a 20 min.' },
      { medId: 'ondansetrona', esquema: 'Vômitos que impedem SRO (maiores de 6 meses): 0,15 mg/kg VO ou IV dose única (máximo 8 mg); 2 mg (8 a 15 kg), 4 mg (15 a 30 kg), 8 mg (acima de 30 kg).' },
      { medId: 'azitromicina', esquema: 'Disenteria com febre ou toxemia (Shigella, Campylobacter) e cólera: 10 mg/kg/dia VO 1 vez ao dia por 3 dias (cólera: 20 mg/kg dose única, máximo 1 g).' },
      { medId: 'ceftriaxona', esquema: 'Disenteria grave ou lactente toxemiado: 50 a 100 mg/kg/dia IV ou IM por 3 a 5 dias.' },
      { medId: 'metronidazol', esquema: 'Amebíase invasiva: 35 a 50 mg/kg/dia VO 8/8 h por 7 a 10 dias. Giardíase: 15 mg/kg/dia VO 8/8 h por 5 a 7 dias.' },
      { medId: 'nitazoxanida', esquema: 'Giardíase, criptosporidíase ou diarreia persistente (maiores de 1 ano): 7,5 mg/kg/dose VO 12/12 h por 3 dias (100 mg 1 a 3 anos; 200 mg 4 a 11 anos; 500 mg acima de 12 anos).' },
      { medId: 'glicose', esquema: 'Hipoglicemia na desidratação grave: glicose 10% 2 a 5 mL/kg IV.' }
    ],
    criteriosInternacao: [
      'Desidratação grave (Plano C) ou choque.',
      'Falha da reidratação oral (vômitos incoercíveis, íleo, perdas volumosas acima da ingestão).',
      'Distúrbios eletrolíticos (hipo ou hipernatremia, hipocalemia grave), convulsão ou alteração de consciência.',
      'Disenteria com toxemia, lactentes menores de 3 meses, desnutrição grave ou imunossupressão.',
      'Impossibilidade de cuidado domiciliar adequado ou de retorno (comunidades distantes).'
    ],
    criteriosUTI: [
      'Choque hipovolêmico refratário ou choque séptico.',
      'Hipernatremia grave (sódio acima de 160 mEq/L) ou hiponatremia sintomática exigindo correção monitorizada.',
      'Insuficiência renal aguda, convulsões refratárias ou coma.',
      'Distensão abdominal com suspeita de complicação cirúrgica ou megacólon tóxico.'
    ],
    criteriosAlta: [
      'Hidratada, com diurese normal e sem vômitos.',
      'Aceitando SRO e alimentação por via oral.',
      'Responsável treinado para preparar o SRO e reconhecer sinais de perigo.',
      'Zinco prescrito e retorno agendado.'
    ],
    orientacoes: [
      'Preparar o soro caseiro ou o SRO com água tratada ou fervida (1 envelope em 1 litro) e oferecer após cada evacuação; desprezar após 24 horas.',
      'Continuar amamentando e oferecer a alimentação habitual em pequenas porções frequentes; não fazer jejum.',
      'Dar o zinco todos os dias pelo tempo prescrito.',
      'Retornar imediatamente se a criança não conseguir beber, vomitar tudo, ficar sonolenta, tiver sangue nas fezes, febre alta, olhos fundos ou não urinar por mais de 6 horas.',
      'Lavar as mãos com sabão, tratar a água (filtrar, ferver ou clorar com hipoclorito) e proteger os alimentos.'
    ],
    retorno: 'Plano A: retorno em 24 a 48 horas ou imediato se sinais de perigo; Plano B: reavaliação ao final das 4 horas e no dia seguinte; diarreia acima de 7 dias: reavaliar e investigar.',
    prevencao: [
      'Aleitamento materno exclusivo até 6 meses e continuado até 2 anos ou mais.',
      'Vacina rotavírus (2 e 4 meses) conforme calendário do PNI.',
      'Água tratada (filtrada, fervida ou clorada), saneamento e descarte adequado de fezes.',
      'Lavagem das mãos com sabão e higiene na preparação de alimentos.',
      'Suplementação de vitamina A (6 a 59 meses) e zinco nos episódios; tratamento de desnutrição.'
    ],
    fontes: [
      { nome: 'Manejo do paciente com diarreia – Ministério da Saúde (cartaz e guia)', ano: 2014 },
      { nome: 'OMS – The treatment of diarrhoea: a manual for physicians and other senior health workers (4ª rev.)', ano: 2005 },
      { nome: 'Manual AIDPI Criança – Ministério da Saúde', ano: 2017 },
      { nome: 'Diarreia aguda: diagnóstico e tratamento – Guia prático SBP', ano: 2017 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'parasitoses_intestinais',
    nome: 'Parasitoses intestinais (giardíase, amebíase, helmintíases)',
    categoria: 'gastrointestinal',
    amazonia: false,
    cid10: 'B82.9',
    tags: ['diarreia', 'dor_abdominal', 'perda_peso', 'palidez', 'prurido', 'vomitos', 'tosse', 'sibilancia', 'edema', 'fraqueza'],
    definicao: 'Infecções do trato digestivo por protozoários (Giardia lamblia, Entamoeba histolytica) e helmintos (Ascaris lumbricoides, Trichuris trichiura, ancilostomídeos, Strongyloides stercoralis, Enterobius vermicularis, Hymenolepis nana, Taenia sp.), frequentemente assintomáticas, mas capazes de causar diarreia, dor abdominal, anemia, desnutrição e complicações obstrutivas ou disseminadas.',
    epidemiologia: 'Prevalência elevada no Amazonas, especialmente em comunidades ribeirinhas, indígenas e periferias sem saneamento, onde o poliparasitismo é comum em escolares. Ancilostomídeos e Trichuris contribuem para anemia ferropriva; Strongyloides é frequente na região e pode causar hiperinfecção em imunossuprimidos e usuários de corticoide; Giardia é a principal causa de diarreia persistente em pré-escolares. O MS recomenda tratamento coletivo periódico (albendazol) em escolares de áreas de alta prevalência.',
    agente: 'Protozoários: Giardia lamblia, Entamoeba histolytica, Cryptosporidium. Helmintos: Ascaris lumbricoides, Trichuris trichiura, Ancylostoma duodenale e Necator americanus, Strongyloides stercoralis, Enterobius vermicularis, Hymenolepis nana, Taenia solium e T. saginata.',
    transmissao: 'Fecal-oral por água e alimentos contaminados (Giardia, Entamoeba, Ascaris, Trichuris, Hymenolepis, Enterobius), penetração de larvas pela pele em contato com solo contaminado (ancilostomídeos, Strongyloides), ingestão de carne mal cozida (Taenia).',
    incubacao: 'Giardíase 1 a 3 semanas; amebíase 2 a 4 semanas; ascaridíase 4 a 8 semanas; ancilostomíase 4 a 6 semanas; estrongiloidíase 2 a 4 semanas; enterobíase 2 a 6 semanas.',
    manifestacoes: [
      'Giardíase: diarreia intermitente ou persistente com fezes gordurosas e fétidas, distensão, flatulência, dor abdominal, náuseas, perda de peso e má absorção.',
      'Amebíase: disenteria (fezes com muco e sangue), tenesmo, dor abdominal; abscesso hepático amebiano (febre, dor em hipocôndrio direito, hepatomegalia dolorosa).',
      'Ascaridíase: dor abdominal, distensão, eliminação de vermes; síndrome de Loeffler (tosse, sibilância, infiltrado pulmonar migratório) na fase larvária; obstrução intestinal ou biliar por bolo de vermes em crianças pequenas.',
      'Ancilostomíase e tricuríase: anemia ferropriva, palidez, dor abdominal; tricuríase maciça causa disenteria crônica e prolapso retal.',
      'Estrongiloidíase: dor epigástrica, diarreia, urticária ou larva currens; hiperinfecção com sepse por gram-negativos e pneumonia em imunossuprimidos ou após corticoide.',
      'Enterobíase: prurido anal noturno, irritabilidade, vulvovaginite.',
      'Teníase e himenolepíase: dor abdominal, eliminação de proglotes; neurocisticercose (convulsões) na infecção por ovos de T. solium.'
    ],
    sinaisAlarme: [
      'Distensão abdominal com vômitos e parada de eliminação de gases e fezes (obstrução por Ascaris).',
      'Icterícia, dor em hipocôndrio direito ou febre alta (obstrução biliar, abscesso hepático amebiano).',
      'Palidez intensa, taquicardia ou dispneia (anemia grave).',
      'Diarreia com sangue e febre, desidratação.',
      'Sinais de hiperinfecção por Strongyloides: dor abdominal intensa, íleo, tosse com dispneia, sepse, em criança imunossuprimida ou em uso de corticoide.',
      'Perda de peso importante ou desnutrição.',
      'Convulsões (neurocisticercose).'
    ],
    diagnosticoDiferencial: ['doenca_diarreica', 'intolerância à lactose e alergia alimentar', 'doença celíaca', 'anemia_ferropriva de outras causas', 'apendicite e outras causas de abdome agudo', 'asma (síndrome de Loeffler)', 'desnutricao', 'tuberculose intestinal', 'doença inflamatória intestinal'],
    exames: ['exame_parasitologico_fezes', 'hemograma', 'pesquisa de larvas de Strongyloides (Baermann-Moraes) e cultura em ágar', 'fita adesiva anal (Graham) para Enterobius', 'sorologia ou antígeno fecal para Entamoeba histolytica e Giardia', 'ultrassonografia abdominal (obstrução, abscesso hepático)', 'radiografia_torax (Loeffler)', 'ferritina e ferro sérico', 'sulfato de ferro / eosinofilia no hemograma'],
    criteriosDiagnosticos: [
      'Exame parasitológico de fezes em 3 amostras (dias alternados) com métodos de concentração (Hoffman, Ritchie, Kato-Katz); Baermann-Moraes para Strongyloides; fita adesiva anal para Enterobius.',
      'Amebíase: diferenciar E. histolytica de E. dispar por antígeno fecal ou PCR quando disponível; tratar disenteria compatível mesmo sem diferenciação em área endêmica.',
      'Eosinofilia sugere helmintíase tecidual (Strongyloides, ancilostomídeos, Ascaris na fase larvária, Toxocara).',
      'Tratamento empírico com albendazol é aceitável em escolares de área endêmica com sintomas compatíveis quando o exame não estiver disponível, conforme MS.',
      'Investigar anemia (hemograma, ferritina) e estado nutricional em toda parasitose confirmada.'
    ],
    classificacaoGravidade: [
      { nivel: 'Assintomática ou leve', criterios: 'Achado em exame de fezes ou sintomas leves (dor abdominal, prurido anal, diarreia leve) sem comprometimento nutricional. Tratamento ambulatorial específico e orientações de higiene.' },
      { nivel: 'Moderada', criterios: 'Diarreia persistente, má absorção, anemia leve a moderada, perda de peso, síndrome de Loeffler, disenteria amebiana sem toxemia. Tratamento específico, suplementação de ferro e reavaliação.' },
      { nivel: 'Grave ou complicada', criterios: 'Obstrução intestinal ou biliar por Ascaris, abscesso hepático amebiano, anemia grave, hiperinfecção por Strongyloides, desnutrição grave ou neurocisticercose. Internação; avaliação cirúrgica quando indicada.' }
    ],
    tratamento: [
      'Helmintíases (Ascaris, ancilostomídeos, Trichuris, Enterobius): albendazol 400 mg VO dose única em maiores de 2 anos (200 mg de 1 a 2 anos); Trichuris e ancilostomídeos: albendazol 400 mg/dia por 3 dias; alternativa mebendazol 100 mg 12/12 h por 3 dias (maiores de 1 ano).',
      'Enterobíase: albendazol 400 mg (ou mebendazol 100 mg) dose única, repetida em 2 semanas, tratando todos os moradores da casa; higiene de unhas, roupas de cama e banho matinal.',
      'Estrongiloidíase: ivermectina 200 mcg/kg VO dose única (maiores de 15 kg ou 5 anos conforme bula), repetida em 2 semanas; hiperinfecção: ivermectina diária até negativação com suporte hospitalar; alternativa albendazol 400 mg 12/12 h por 3 a 7 dias.',
      'Giardíase: metronidazol 15 mg/kg/dia VO 8/8 h por 5 a 7 dias; ou nitazoxanida 7,5 mg/kg/dose 12/12 h por 3 dias (maiores de 1 ano); ou albendazol 400 mg/dia por 5 dias (maiores de 2 anos); ou secnidazol 30 mg/kg dose única.',
      'Amebíase intestinal: metronidazol 35 a 50 mg/kg/dia VO 8/8 h por 7 a 10 dias; abscesso hepático: metronidazol IV ou VO por 10 dias com drenagem se grande ou sem resposta; seguido de amebicida luminal (teclozan ou etofamida) conforme disponibilidade.',
      'Teníase: praziquantel 10 mg/kg dose única (ou niclosamida); himenolepíase: praziquantel 25 mg/kg dose única; esquistossomose: praziquantel 60 mg/kg em crianças (dose única).',
      'Obstrução intestinal por Ascaris: jejum, sonda nasogástrica, hidratação venosa, óleo mineral ou piperazina conforme protocolo do serviço, e cirurgia se sinais de sofrimento de alça; não usar antihelmíntico paralisante isolado na obstrução completa.',
      'Anemia associada: sulfato ferroso 3 a 5 mg/kg/dia de ferro elementar por 2 a 3 meses após o tratamento antiparasitário.',
      'Antes de corticoide ou imunossupressão em área endêmica, tratar empiricamente Strongyloides com ivermectina.',
      'Controle de cura: exame de fezes 7 a 14 dias após o tratamento (Giardia, amebíase, Strongyloides).'
    ],
    medicamentos: [
      { medId: 'albendazol', esquema: '400 mg VO dose única (maiores de 2 anos; 200 mg de 1 a 2 anos); Trichuris e ancilostomídeos: 400 mg/dia por 3 dias; giardíase: 400 mg/dia por 5 dias; repetir em 2 semanas na enterobíase.' },
      { medId: 'mebendazol', esquema: '100 mg VO 12/12 h por 3 dias (maiores de 1 ano), ou 500 mg dose única; enterobíase: 100 mg dose única repetida em 2 semanas.' },
      { medId: 'ivermectina', esquema: 'Estrongiloidíase: 200 mcg/kg VO dose única (comprimido 6 mg; 15 a 24 kg: meio comprimido; 25 a 35 kg: 1; 36 a 50 kg: 1 e meio; 51 a 65 kg: 2), repetir em 2 semanas; não usar em menores de 15 kg conforme bula.' },
      { medId: 'metronidazol', esquema: 'Giardíase: 15 mg/kg/dia VO 8/8 h por 5 a 7 dias. Amebíase: 35 a 50 mg/kg/dia VO 8/8 h por 7 a 10 dias (máximo 2.250 mg/dia).' },
      { medId: 'nitazoxanida', esquema: 'Giardíase e criptosporidíase (maiores de 1 ano): 7,5 mg/kg/dose VO 12/12 h por 3 dias, com alimento.' },
      { medId: 'praziquantel', esquema: 'Teníase: 10 mg/kg VO dose única. Himenolepíase: 25 mg/kg dose única. Esquistossomose: 60 mg/kg dose única em crianças (50 mg/kg em adultos).' },
      { medId: 'sulfato_ferroso', esquema: 'Anemia associada: 3 a 5 mg/kg/dia de ferro elementar VO por 8 a 12 semanas após o tratamento antiparasitário.' }
    ],
    criteriosInternacao: [
      'Obstrução intestinal ou biliar por Ascaris.',
      'Abscesso hepático amebiano ou disenteria com toxemia e desidratação.',
      'Anemia grave (Hb abaixo de 7 g/dL) sintomática.',
      'Hiperinfecção por Strongyloides.',
      'Desnutrição grave associada.'
    ],
    criteriosUTI: [
      'Sepse por gram-negativos na hiperinfecção por Strongyloides.',
      'Abdome cirúrgico com perfuração ou volvo.',
      'Insuficiência cardíaca por anemia grave.',
      'Estado de mal epiléptico por neurocisticercose.'
    ],
    criteriosAlta: [
      'Resolução da complicação (trânsito intestinal restabelecido, abscesso drenado ou em regressão).',
      'Tolerância à dieta e ao tratamento oral.',
      'Anemia em tratamento com plano de seguimento.',
      'Orientações de higiene e controle de cura agendado.'
    ],
    orientacoes: [
      'Dar o remédio para toda a família quando indicado (oxiúros, giardíase), e repetir a dose na data marcada.',
      'Lavar as mãos antes de comer e após usar o banheiro; manter unhas curtas e limpas.',
      'Beber água tratada (filtrada, fervida ou clorada) e lavar bem frutas e verduras.',
      'Usar calçados e evitar que crianças brinquem em solo contaminado com fezes; usar fossa ou banheiro.',
      'Retornar se barriga inchada com vômitos, dor forte, sangue nas fezes, palidez intensa ou falta de ar.'
    ],
    retorno: 'Reavaliação em 2 semanas (repetição de dose quando indicada) e controle de cura com exame de fezes em 2 a 4 semanas; retorno imediato se complicação.',
    prevencao: [
      'Saneamento básico, uso de banheiro ou fossa e destino adequado das fezes.',
      'Água tratada e higiene dos alimentos; cozinhar bem carnes.',
      'Lavagem das mãos, unhas curtas e uso de calçados.',
      'Tratamento coletivo periódico com albendazol em escolares de áreas endêmicas conforme o MS.',
      'Educação em saúde nas escolas e comunidades.'
    ],
    fontes: [
      { nome: 'Guia prático para o controle das geo-helmintíases – Ministério da Saúde', ano: 2018 },
      { nome: 'OMS – Guideline: preventive chemotherapy to control soil-transmitted helminth infections', ano: 2017 },
      { nome: 'Tratado de Pediatria – Sociedade Brasileira de Pediatria (5ª ed.)', ano: 2022 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'escabiose_impetigo',
    nome: 'Escabiose e impetigo',
    categoria: 'dermatologica',
    amazonia: false,
    cid10: 'B86 / L01.0',
    tags: ['prurido', 'lesoes_pele', 'feridas', 'febre', 'linfonodomegalia', 'edema', 'reducao_diurese'],
    definicao: 'Escabiose é a infestação da pele pelo ácaro Sarcoptes scabiei, com prurido intenso predominantemente noturno e lesões em locais típicos; impetigo é a infecção bacteriana superficial da pele por Streptococcus pyogenes ou Staphylococcus aureus, frequentemente secundária à escabiose, picadas ou traumas. Ambas são muito comuns na infância, contagiosas e associadas a aglomeração e clima quente e úmido.',
    epidemiologia: 'Prevalência alta em comunidades ribeirinhas, indígenas e periferias de Manaus, com surtos em escolas, creches e abrigos. O clima quente e úmido favorece o impetigo, cuja complicação mais importante é a glomerulonefrite pós-estreptocócica (edema, hematúria, hipertensão) 1 a 3 semanas após a infecção. A escabiose crostosa ocorre em imunossuprimidos e desnutridos. O tratamento simultâneo de todos os contatos domiciliares é essencial para interromper reinfestações.',
    agente: 'Escabiose: Sarcoptes scabiei var. hominis. Impetigo: Streptococcus pyogenes (grupo A) e Staphylococcus aureus (impetigo bolhoso).',
    transmissao: 'Escabiose: contato pele a pele prolongado e, menos frequentemente, roupas e roupas de cama compartilhadas. Impetigo: contato direto com lesões ou secreções e autoinoculação por coçadura.',
    incubacao: 'Escabiose: 2 a 6 semanas na primeira infestação (1 a 4 dias em reinfestação). Impetigo: 1 a 10 dias.',
    manifestacoes: [
      'Escabiose: prurido intenso, pior à noite, em vários membros da família; pápulas, vesículas e túneis em espaços interdigitais, punhos, axilas, cintura, nádegas, genitais e mamas.',
      'Em lactentes: lesões em palmas, plantas, couro cabeludo, face e pescoço; nódulos em axilas e genitais; irritabilidade e insônia.',
      'Escabiose crostosa (norueguesa): crostas espessas generalizadas, pouco prurido, altíssima contagiosidade, em imunossuprimidos.',
      'Impetigo não bolhoso: vesículas que se rompem formando crostas melicéricas (cor de mel), em face (perinasal, perioral) e membros, com linfadenopatia regional.',
      'Impetigo bolhoso: bolhas flácidas que se rompem deixando base eritematosa brilhante, em tronco, áreas de fralda e extremidades, mais em lactentes.',
      'Ectima: úlcera com crosta espessa e aderente (forma profunda).',
      'Sinais de glomerulonefrite pós-estreptocócica: edema periorbital matinal, urina escura, oligúria e hipertensão 1 a 3 semanas após o impetigo.'
    ],
    sinaisAlarme: [
      'Febre, mal-estar ou lesões extensas com celulite, abscesso ou linfangite.',
      'Edema de face ou membros, urina escura ou diminuída, cefaleia ou hipertensão (glomerulonefrite).',
      'Bolhas extensas com descolamento da pele e febre (síndrome da pele escaldada estafilocócica).',
      'Lactente menor de 2 meses com impetigo bolhoso ou toxemia.',
      'Crostas generalizadas espessas (escabiose crostosa) em imunossuprimido.',
      'Dor desproporcional, necrose ou progressão rápida (fasciíte necrosante).'
    ],
    diagnosticoDiferencial: ['dermatite atópica e de contato', 'estrófulo (prurigo por picadas de inseto)', 'varicela', 'herpes simples', 'tinha do corpo', 'leishmaniose_tegumentar', 'hanseniase', 'miliária', 'larva migrans cutânea', 'urticária papular'],
    exames: ['diagnóstico clínico (não requer exames na maioria)', 'pesquisa de ácaro em raspado de pele com óleo mineral (dermatoscopia quando disponível)', 'cultura de secreção da lesão (casos refratários ou surtos)', 'urina_1', 'creatinina', 'complemento C3 (suspeita de glomerulonefrite)', 'hemograma', 'pcr'],
    criteriosDiagnosticos: [
      'Escabiose (critérios IACS 2020): prurido com lesões típicas em distribuição característica, especialmente com contatos domiciliares sintomáticos; confirmação por visualização do ácaro, ovos ou fezes ao microscópio ou dermatoscopia quando disponível.',
      'Impetigo: lesões com crostas melicéricas ou bolhas flácidas de base eritematosa em criança sem toxemia; a cultura é reservada a casos refratários, recorrentes ou surtos.',
      'Avaliar toda a família e contatos; verificar sinais de glomerulonefrite (pressão arterial, urina) 1 a 3 semanas após impetigo.',
      'Classificar o impetigo em localizado (poucas lesões, uma região) ou extenso (lesões múltiplas, várias regiões, ectima ou linfadenopatia).'
    ],
    classificacaoGravidade: [
      { nivel: 'Leve ou localizado', criterios: 'Escabiose clássica sem infecção secundária; impetigo com poucas lesões em uma região, sem febre. Tratamento tópico (permetrina; antibiótico tópico) e orientações.' },
      { nivel: 'Moderado ou extenso', criterios: 'Escabiose com impetiginização, eczematização ou surto familiar; impetigo extenso, ectima ou linfadenopatia. Escabicida tópico ou ivermectina oral (conforme idade) mais antibiótico oral.' },
      { nivel: 'Grave ou complicado', criterios: 'Escabiose crostosa, celulite, abscesso, síndrome da pele escaldada, glomerulonefrite, sepse ou lactente jovem toxemiado. Internação com antibiótico parenteral e tratamento combinado.' }
    ],
    tratamento: [
      'Escabiose: permetrina 5% loção ou creme em todo o corpo do pescoço para baixo (incluindo couro cabeludo e face em lactentes, evitando olhos e boca), deixar por 8 a 14 horas e enxaguar; repetir após 7 dias; pode ser usada a partir de 2 meses de idade.',
      'Tratar simultaneamente todos os contatos domiciliares, mesmo assintomáticos; lavar roupas, toalhas e roupas de cama em água quente ou deixar ensacadas por 3 dias e expor ao sol.',
      'Ivermectina oral 200 mcg/kg em dose única, repetida em 7 a 14 dias, para maiores de 15 kg (ou 5 anos conforme bula): escabiose extensa, surtos, falha do tratamento tópico ou escabiose crostosa (nesta, associar tópico e doses múltiplas conforme protocolo).',
      'Prurido pós-escabiótico pode durar 2 a 4 semanas: anti-histamínico oral conforme idade e emolientes; corticoide tópico de baixa potência em eczematização após o escabicida.',
      'Impetigo localizado: limpeza com água e sabão, remoção suave das crostas e antibiótico tópico (mupirocina 2% ou ácido fusídico 3 vezes ao dia por 5 a 7 dias); neomicina-bacitracina é alternativa de menor eficácia.',
      'Impetigo extenso, bolhoso, ectima ou com linfadenopatia: cefalexina 50 mg/kg/dia VO 6/6 h por 7 dias; alternativas amoxicilina-clavulanato ou, em alergia à penicilina, azitromicina ou claritromicina; suspeita de MRSA comunitário: sulfametoxazol-trimetoprim ou clindamicina conforme protocolo.',
      'Complicações (celulite extensa, abscesso, síndrome da pele escaldada, sepse): internação com oxacilina IV (ou vancomicina se MRSA); drenagem de abscessos.',
      'Cortar as unhas, manter higiene diária e afastar da escola até 24 horas de antibiótico (impetigo) ou após a primeira aplicação do escabicida.',
      'Glomerulonefrite pós-estreptocócica: internação para controle de pressão arterial, restrição hidrossalina, diurético e tratamento do foco com penicilina benzatina ou amoxicilina.'
    ],
    medicamentos: [
      { medId: 'permetrina', esquema: 'Loção ou creme 5%: aplicar em todo o corpo, deixar 8 a 14 h e enxaguar; repetir após 7 dias; a partir de 2 meses de idade; tratar todos os contatos no mesmo dia.' },
      { medId: 'ivermectina', esquema: 'Escabiose (maiores de 15 kg): 200 mcg/kg VO dose única, repetir em 7 a 14 dias; comprimido 6 mg: 15 a 24 kg meio comprimido; 25 a 35 kg 1; 36 a 50 kg 1 e meio; 51 a 65 kg 2.' },
      { medId: null, nome: 'Mupirocina 2% pomada', esquema: 'Impetigo localizado: aplicar nas lesões 3 vezes ao dia por 5 a 7 dias.' },
      { medId: 'cefalexina', esquema: 'Impetigo extenso ou bolhoso: 50 mg/kg/dia VO dividida 6/6 h por 7 dias (máximo 2 g/dia).' },
      { medId: 'amoxicilina_clavulanato', esquema: 'Alternativa: 50 mg/kg/dia de amoxicilina VO 8/8 h por 7 dias.' },
      { medId: 'azitromicina', esquema: 'Alergia à penicilina: 10 mg/kg/dia VO 1 vez ao dia por 3 a 5 dias.' },
      { medId: 'sulfametoxazol_trimetoprim', esquema: 'Suspeita de MRSA comunitário (maiores de 2 meses): 8 a 10 mg/kg/dia de trimetoprim VO 12/12 h por 7 dias; não cobre bem estreptococo.' },
      { medId: 'oxacilina', esquema: 'Formas graves internadas: 100 a 200 mg/kg/dia IV dividida 6/6 h.' },
      { medId: 'penicilina_benzatina', esquema: 'Impetigo estreptocócico extenso ou glomerulonefrite (erradicação do foco): 600.000 UI IM (menos de 27 kg) ou 1.200.000 UI IM (27 kg ou mais), dose única.' },
      { medId: null, nome: 'Anti-histamínico (dexclorfeniramina ou loratadina)', esquema: 'Prurido: conforme idade e bula (dexclorfeniramina acima de 2 anos; loratadina acima de 2 anos).' }
    ],
    criteriosInternacao: [
      'Celulite extensa, abscesso com necessidade de drenagem, linfangite ou febre alta com toxemia.',
      'Síndrome da pele escaldada estafilocócica ou suspeita de fasciíte necrosante.',
      'Glomerulonefrite pós-estreptocócica com hipertensão, oligúria ou edema importante.',
      'Escabiose crostosa ou lactente menor de 2 meses com impetigo bolhoso extenso.',
      'Imunossupressão ou desnutrição grave com infecção cutânea extensa.'
    ],
    criteriosUTI: [
      'Sepse ou choque de foco cutâneo.',
      'Fasciíte necrosante com necessidade cirúrgica e suporte.',
      'Encefalopatia hipertensiva ou insuficiência renal na glomerulonefrite.',
      'Descolamento cutâneo extenso com perda hídrica importante.'
    ],
    criteriosAlta: [
      'Afebril, com lesões em regressão e sem sinais de celulite.',
      'Pressão arterial e função renal normais (glomerulonefrite controlada).',
      'Tratamento oral e tópico organizado para o paciente e os contatos.',
      'Orientações de higiene e retorno agendado.'
    ],
    orientacoes: [
      'Aplicar o escabicida em todas as pessoas da casa no mesmo dia e repetir após 7 dias; a coceira pode continuar por algumas semanas mesmo após a cura.',
      'Lavar roupas, lençóis e toalhas com água quente e secar ao sol ou guardá-los fechados em saco por 3 dias.',
      'Lavar as feridas com água e sabão, não arrancar as crostas e manter as unhas curtas; não compartilhar toalhas.',
      'Dar o antibiótico até o final; a criança pode voltar à escola após 24 horas de antibiótico.',
      'Retornar imediatamente se febre, vermelhidão que se espalha, inchaço no rosto ou pernas, urina escura ou pouca urina.'
    ],
    retorno: 'Reavaliação em 7 dias (segunda aplicação do escabicida) e ao final do antibiótico; orientar observação de urina e edema por 3 semanas após impetigo.',
    prevencao: [
      'Higiene pessoal diária, unhas curtas e lavagem das mãos.',
      'Não compartilhar roupas, toalhas e roupas de cama; reduzir aglomeração no dormitório quando possível.',
      'Tratamento simultâneo dos contatos e de casos em escolas e creches.',
      'Tratamento precoce de picadas, escoriações e escabiose para evitar impetigo.',
      'Acesso a água limpa e sabão nas comunidades.'
    ],
    fontes: [
      { nome: 'Dermatologia na Atenção Básica de Saúde – Cadernos de Atenção Básica, Ministério da Saúde', ano: 2002 },
      { nome: 'International Alliance for the Control of Scabies (IACS) – Consensus criteria for the diagnosis of scabies', ano: 2020 },
      { nome: 'OMS – Recognizing neglected tropical diseases through changes on the skin: a training guide', ano: 2018 },
      { nome: 'IDSA – Practice guidelines for the diagnosis and management of skin and soft tissue infections', ano: 2014 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'anemia_ferropriva',
    nome: 'Anemia ferropriva',
    categoria: 'nutricional',
    amazonia: false,
    cid10: 'D50.9',
    tags: ['palidez', 'fraqueza', 'perda_peso', 'dispneia', 'cefaleia', 'diarreia'],
    definicao: 'Redução da hemoglobina abaixo dos valores de referência para idade e sexo causada por deficiência de ferro, a carência nutricional mais prevalente no mundo. Compromete o desenvolvimento neuropsicomotor, a imunidade e o crescimento, muitas vezes de forma irreversível quando ocorre nos primeiros 2 anos de vida.',
    epidemiologia: 'Prevalência elevada em lactentes e pré-escolares no Amazonas, com maior risco em comunidades ribeirinhas e indígenas devido à dieta pobre em ferro biodisponível, desmame precoce com introdução de mingaus e leite de vaca, ancilostomíase e tricuríase, malária de repetição (anemia mista) e baixo peso ao nascer. O Programa Nacional de Suplementação de Ferro e a fortificação de farinhas são estratégias do MS; a vitamina A também é suplementada em toda a Amazônia Legal.',
    agente: 'Não infecciosa: deficiência de ferro por ingestão insuficiente, aumento da demanda (crescimento rápido, prematuridade), má absorção ou perdas crônicas (ancilostomíase, sangramento digestivo por leite de vaca, menstruação).',
    transmissao: 'Não se aplica.',
    incubacao: 'Não se aplica; a depleção progride por meses (ferritina baixa, depois ferro sérico e saturação, depois anemia microcítica).',
    manifestacoes: [
      'Palidez cutaneomucosa (conjuntivas, palmas, leito ungueal), muitas vezes percebida apenas quando a Hb está abaixo de 8 g/dL.',
      'Irritabilidade, apatia, sonolência, redução da atividade e do rendimento escolar.',
      'Inapetência, geofagia ou pica (ingestão de terra, gelo).',
      'Taquicardia, sopro sistólico funcional, dispneia aos esforços nas formas moderadas a graves.',
      'Queilite angular, glossite atrófica, unhas quebradiças ou coiloníquia.',
      'Atraso do desenvolvimento neuropsicomotor e do crescimento; maior suscetibilidade a infecções.',
      'Espasmo do choro, síndrome das pernas inquietas.'
    ],
    sinaisAlarme: [
      'Hemoglobina abaixo de 5 a 7 g/dL ou sinais de descompensação: taquicardia importante, dispneia, edema, hepatomegalia (insuficiência cardíaca).',
      'Palidez intensa com icterícia ou esplenomegalia (hemólise, malária).',
      'Sangramento ativo ou fezes escuras.',
      'Anemia que não responde a 4 semanas de ferro adequado (má adesão, má absorção, diagnóstico incorreto, perdas persistentes).',
      'Desnutrição grave associada ou lactente menor de 6 meses com anemia.'
    ],
    diagnosticoDiferencial: ['malaria', 'talassemias e doença falciforme', 'anemia de doença crônica ou inflamação', 'leishmaniose_visceral', 'parasitoses_intestinais', 'deficiência de vitamina B12 ou folato', 'intoxicação por chumbo', 'leucemia', 'desnutricao'],
    exames: ['hemograma', 'ferritina', 'ferro sérico, transferrina e saturação de transferrina', 'reticulócitos', 'pcr', 'exame_parasitologico_fezes', 'gota_espessa', 'eletroforese de hemoglobina (se microcitose sem resposta ou suspeita de hemoglobinopatia)', 'sangue oculto nas fezes'],
    criteriosDiagnosticos: [
      'Anemia (OMS): Hb abaixo de 11 g/dL (6 a 59 meses), abaixo de 11,5 g/dL (5 a 11 anos), abaixo de 12 g/dL (12 a 14 anos e mulheres), abaixo de 13 g/dL (homens acima de 15 anos); em lactentes menores de 6 meses usar referências específicas.',
      'Deficiência de ferro: ferritina abaixo de 12 a 15 mcg/L (abaixo de 30 mcg/L na presença de inflamação com PCR elevada), saturação de transferrina abaixo de 16%, microcitose (VCM baixo) e hipocromia, RDW elevado.',
      'Prova terapêutica: aumento de Hb de pelo menos 1 g/dL após 4 semanas de ferro confirma o diagnóstico quando exames de ferro não estão disponíveis.',
      'Investigar causas: dieta, prematuridade, parasitoses, perdas sanguíneas, malária, e rastrear talassemia se não houver resposta.',
      'Triagem universal com hemograma aos 12 meses (SBP) e em grupos de risco.'
    ],
    classificacaoGravidade: [
      { nivel: 'Leve', criterios: 'Hb entre 10 e 10,9 g/dL (6 a 59 meses) ou pouco abaixo do limite para a idade, sem sintomas ou com sintomas leves. Tratamento oral e orientação alimentar.' },
      { nivel: 'Moderada', criterios: 'Hb entre 7 e 9,9 g/dL, com palidez evidente, fadiga ou taquicardia leve. Tratamento oral com ferro, investigação de causas e reavaliação em 4 semanas.' },
      { nivel: 'Grave', criterios: 'Hb abaixo de 7 g/dL (abaixo de 5 g/dL com sinais de descompensação cardíaca é emergência). Internação para investigação, ferro sob supervisão e transfusão apenas se instabilidade hemodinâmica ou Hb muito baixa com sintomas.' }
    ],
    tratamento: [
      'Sulfato ferroso VO: 3 a 5 mg/kg/dia de ferro elementar (SBP: 3 a 6 mg/kg/dia), em 1 a 2 tomadas, preferencialmente longe das refeições e com suco de frutas cítricas, por 8 semanas até normalizar a Hb e depois por mais 2 a 3 meses para repor os estoques (total de 3 a 6 meses).',
      'Reavaliar Hb ou hemograma em 4 semanas: aumento de 1 g/dL ou mais confirma resposta; se não houver resposta, verificar adesão, dose, perdas, parasitoses e considerar outros diagnósticos.',
      'Tratar causas associadas: antiparasitário (albendazol) em maiores de 1 ano de área endêmica, tratamento da malária antes de iniciar ferro em parasitemia ativa, retirada do leite de vaca integral em lactentes menores de 1 ano.',
      'Orientação alimentar: carnes, vísceras, feijão, folhas verde-escuras, alimentos com vitamina C nas refeições; evitar leite, chá e café junto com as refeições principais.',
      'Ferro parenteral (sacarato de hidróxido férrico IV) apenas em má absorção comprovada, intolerância grave ou falha da via oral, em serviço de referência.',
      'Transfusão de concentrado de hemácias (5 a 10 mL/kg lentamente) apenas em Hb abaixo de 5 g/dL com sinais de descompensação ou necessidade cirúrgica urgente; em anemia crônica infundir devagar pelo risco de sobrecarga.',
      'Profilaxia (PNSF/SBP): 1 mg/kg/dia de ferro elementar dos 3 aos 24 meses em lactentes a termo em aleitamento materno ou fórmula não fortificada (SBP); prematuros e baixo peso: 2 mg/kg/dia a partir de 30 dias por 1 ano e depois 1 mg/kg/dia até 2 anos; confirmar conforme protocolo.'
    ],
    medicamentos: [
      { medId: 'sulfato_ferroso', esquema: 'Tratamento: 3 a 5 mg/kg/dia de ferro elementar VO (máximo 150 a 200 mg/dia de ferro elementar) em 1 a 2 tomadas por 3 a 6 meses. Profilaxia: 1 mg/kg/dia dos 3 aos 24 meses (2 mg/kg/dia em prematuros no 1º ano). Solução 125 mg/mL de sulfato ferroso contém 25 mg/mL de ferro elemental; confirmar concentração da apresentação.' },
      { medId: 'albendazol', esquema: 'Tratamento antiparasitário associado em maiores de 1 a 2 anos de área endêmica: 400 mg VO dose única (3 dias se ancilostomídeos ou Trichuris).' },
      { medId: 'vitamina_a', esquema: 'Suplementação conforme programa do MS na Amazônia Legal: 100.000 UI dose única de 6 a 11 meses; 200.000 UI a cada 6 meses de 12 a 59 meses.' },
      { medId: null, nome: 'Ácido fólico', esquema: 'Apenas se deficiência associada (anemia mista, desnutrição): dose conforme protocolo.' }
    ],
    criteriosInternacao: [
      'Hb abaixo de 5 g/dL ou anemia com sinais de descompensação cardíaca.',
      'Sangramento ativo ou suspeita de causa grave (hemólise, aplasia, leucemia).',
      'Desnutrição grave ou infecção grave associada.',
      'Necessidade de ferro parenteral ou transfusão.'
    ],
    criteriosUTI: [
      'Insuficiência cardíaca ou choque por anemia grave.',
      'Sangramento maciço.',
      'Sobrecarga volêmica durante transfusão com edema pulmonar.'
    ],
    criteriosAlta: [
      'Estabilidade hemodinâmica e Hb em nível seguro.',
      'Causa identificada e tratamento oral iniciado com boa tolerância.',
      'Orientação alimentar e retorno em 4 semanas agendado.'
    ],
    orientacoes: [
      'Dar o ferro todos os dias, de preferência longe das refeições e com suco de laranja, acerola, caju ou camu-camu; as fezes ficam escuras e isso é normal.',
      'Se houver dor de barriga ou enjoo, dar junto com um pouco de alimento e avisar na consulta; não interromper.',
      'Manter o tratamento pelo tempo total prescrito (vários meses), mesmo após a melhora.',
      'Oferecer carne, peixe, fígado, feijão e folhas verde-escuras diariamente; evitar leite ou chá junto com as refeições.',
      'Guardar o frasco fora do alcance das crianças (intoxicação por ferro é grave).'
    ],
    retorno: 'Hemograma em 4 semanas para avaliar resposta e ao final do tratamento; consulta mensal de puericultura com acompanhamento do desenvolvimento.',
    prevencao: [
      'Aleitamento materno exclusivo até 6 meses e alimentação complementar rica em ferro a partir dos 6 meses; evitar leite de vaca integral antes de 1 ano.',
      'Suplementação profilática de ferro (PNSF e SBP) dos 3 aos 24 meses e em prematuros.',
      'Clampeamento tardio do cordão umbilical (1 a 3 minutos) ao nascer.',
      'Controle de parasitoses (albendazol periódico) e saneamento; prevenção e tratamento da malária.',
      'Consumo de farinhas fortificadas e suplementação de vitamina A na Amazônia Legal.'
    ],
    fontes: [
      { nome: 'Consenso sobre anemia ferropriva – Departamentos de Nutrologia e Hematologia da SBP', ano: 2018 },
      { nome: 'Programa Nacional de Suplementação de Ferro – Manual de condutas gerais, Ministério da Saúde', ano: 2013 },
      { nome: 'OMS – Haemoglobin concentrations for the diagnosis of anaemia and assessment of severity', ano: 2011 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'desnutricao',
    nome: 'Desnutrição aguda grave',
    categoria: 'nutricional',
    amazonia: false,
    cid10: 'E43',
    tags: ['perda_peso', 'edema', 'fraqueza', 'palidez', 'diarreia', 'lesoes_pele', 'alteracao_consciencia', 'desidratacao', 'febre'],
    definicao: 'Estado de deficiência grave de energia e nutrientes definido pela OMS como peso para estatura abaixo de -3 escores z, perímetro braquial abaixo de 11,5 cm (6 a 59 meses) ou edema bilateral de origem nutricional (kwashiorkor). Associa-se a alta letalidade por hipoglicemia, hipotermia, desidratação, infecções graves e distúrbios eletrolíticos, exigindo manejo em fases (estabilização e reabilitação).',
    epidemiologia: 'A desnutrição infantil persiste em bolsões de pobreza do Amazonas, com prevalências muito elevadas em povos indígenas (crise Yanomami em 2023, Alto Rio Negro, Vale do Javari) e em comunidades ribeirinhas isoladas, associada a insegurança alimentar, malária de repetição, diarreias, parasitoses, tuberculose e baixo acesso a serviços. A desnutrição crônica (baixa estatura) é ainda mais prevalente. O rastreamento com perímetro braquial e curvas de crescimento nas visitas de agentes de saúde permite identificação precoce.',
    agente: 'Não infecciosa: déficit de ingestão de energia e proteínas, frequentemente precipitado ou agravado por infecções (diarreia, malária, tuberculose, HIV, sarampo) e por doenças crônicas.',
    transmissao: 'Não se aplica.',
    incubacao: 'Não se aplica; o emagrecimento agudo instala-se em semanas, e o edema nutricional em dias a semanas.',
    manifestacoes: [
      'Marasmo: emagrecimento intenso, perda de gordura subcutânea e massa muscular, costelas visíveis, pele enrugada nas nádegas (sinal da calça larga), fácies senil, irritabilidade ou apatia.',
      'Kwashiorkor: edema bilateral de pés e pernas podendo atingir face, cabelo fino, quebradiço e descolorido, lesões de pele (dermatose descamativa e hiperpigmentada), hepatomegalia, apatia e anorexia.',
      'Formas mistas (marasmo-kwashiorkor).',
      'Hipoglicemia, hipotermia, letargia, bradicardia e hipotensão (baixa reserva).',
      'Diarreia, desidratação de avaliação difícil (olhos fundos e prega cutânea não confiáveis), distensão abdominal.',
      'Infecções com poucos sinais (sem febre), palidez por anemia, sinais de deficiência de vitamina A (xeroftalmia, manchas de Bitot) e de outros micronutrientes.',
      'Atraso do desenvolvimento e do crescimento.'
    ],
    sinaisAlarme: [
      'Letargia, inconsciência, convulsão ou hipoglicemia (glicemia abaixo de 54 mg/dL).',
      'Hipotermia (temperatura axilar abaixo de 35 °C) ou febre alta.',
      'Choque: mãos frias, enchimento capilar acima de 3 segundos, pulso fraco e rápido, com letargia.',
      'Edema generalizado (grau 3), anorexia total ou incapacidade de ingerir.',
      'Desconforto respiratório, taquipneia ou sinais de pneumonia.',
      'Diarreia profusa, vômitos persistentes ou desidratação com sinais de choque.',
      'Anemia grave (Hb abaixo de 4 a 5 g/dL) ou icterícia.',
      'Lesões de pele extensas, úlceras de córnea ou infecção grave.'
    ],
    diagnosticoDiferencial: ['tuberculose', 'infecção pelo HIV', 'malaria de repetição', 'parasitoses_intestinais', 'leishmaniose_visceral', 'síndrome nefrótica e insuficiência cardíaca (edema)', 'doença celíaca e fibrose cística', 'cardiopatias congênitas', 'erros inatos do metabolismo', 'negligência e maus-tratos'],
    exames: ['antropometria (peso, estatura, perímetro braquial, escore z peso/estatura)', 'glicemia', 'hemograma', 'eletrolitos', 'sodio', 'potassio', 'magnesio', 'calcio', 'gasometria', 'ureia', 'creatinina', 'albumina', 'urina_1', 'urocultura', 'hemocultura', 'radiografia_torax', 'gota_espessa', 'exame_parasitologico_fezes', 'sorologia HIV', 'prova_tuberculinica', 'teste_rapido_molecular_tb'],
    criteriosDiagnosticos: [
      'Desnutrição aguda grave (OMS 2013): peso para estatura ou IMC para idade abaixo de -3 escores z, ou perímetro braquial abaixo de 11,5 cm (6 a 59 meses), ou edema bilateral nutricional.',
      'Desnutrição aguda moderada: peso para estatura entre -3 e -2 escores z ou perímetro braquial entre 11,5 e 12,5 cm.',
      'Classificar como complicada (necessita internação) se apetite ausente no teste de aceitação, edema grau 3, sinais de perigo (letargia, convulsão, hipotermia, hipoglicemia, desidratação grave, choque), infecção grave, anemia grave, lesões de pele extensas ou idade menor de 6 meses.',
      'Não complicada: apetite preservado, alerta, sem sinais de perigo ou infecção grave: tratamento ambulatorial com alimento terapêutico pronto para uso (quando disponível) e acompanhamento semanal.',
      'Investigar tuberculose, HIV, malária e parasitoses em todos os casos.'
    ],
    classificacaoGravidade: [
      { nivel: 'Desnutrição aguda moderada', criterios: 'Peso para estatura entre -3 e -2 z ou PB 11,5 a 12,5 cm, sem edema. Suplementação alimentar, tratamento de infecções e parasitoses, seguimento quinzenal na atenção básica.' },
      { nivel: 'Desnutrição aguda grave não complicada', criterios: 'Critérios de gravidade antropométrica ou edema leve (grau 1 a 2) com apetite preservado, alerta e sem complicações médicas. Tratamento ambulatorial com alimento terapêutico, amoxicilina oral, micronutrientes e seguimento semanal.' },
      { nivel: 'Desnutrição aguda grave complicada', criterios: 'Qualquer sinal de perigo, edema grau 3, anorexia, infecção grave, hipoglicemia, hipotermia, desidratação, anemia grave ou menor de 6 meses. Internação hospitalar com os 10 passos da OMS (fase de estabilização e depois reabilitação).' }
    ],
    tratamento: [
      'Fase de estabilização (dias 1 a 7), 10 passos da OMS: 1) tratar e prevenir hipoglicemia: glicose 10% 5 mL/kg VO ou por sonda (ou IV se inconsciente) e alimentar a cada 2 a 3 horas dia e noite; 2) tratar e prevenir hipotermia: aquecer, contato pele a pele, cobrir; 3) tratar desidratação com ReSoMal (solução de reidratação para desnutridos, com menos sódio e mais potássio) 5 mL/kg a cada 30 minutos por 2 horas e depois 5 a 10 mL/kg/h por até 10 horas, alternando com F-75; evitar via IV, exceto em choque: 15 mL/kg em 1 hora de ringer lactato com glicose 5% ou solução meio a meio, repetir uma vez se melhorar, e transfusão se não melhorar.',
      '4) Corrigir eletrólitos: potássio 3 a 4 mmol/kg/dia e magnésio 0,4 a 0,6 mmol/kg/dia por pelo menos 2 semanas (contidos na F-75 quando preparada com mistura mineral), dieta sem sal adicionado; 5) tratar infecção: antibiótico de rotina em todos: amoxicilina VO 50 a 80 mg/kg/dia (sem complicações) ou ampicilina IV + gentamicina IV por 7 dias (com complicações); antimalárico se gota espessa positiva; 6) corrigir micronutrientes: vitamina A (se sinais de deficiência ou sarampo), ácido fólico 5 mg no dia 1 e 1 mg/dia, zinco 2 mg/kg/dia, cobre, multivitaminas; ferro somente na fase de reabilitação (3 mg/kg/dia após o início do ganho de peso).',
      '7) Iniciar alimentação cautelosa com F-75: 100 kcal/kg/dia e 1 a 1,5 g/kg/dia de proteína, 130 mL/kg/dia (100 mL/kg/dia se edema importante), em 8 a 12 refeições, por sonda se ingestão abaixo de 80%; monitorar sinais de síndrome de realimentação.',
      'Fase de reabilitação (a partir da 2ª semana, quando retorna o apetite e cede o edema): 8) transição gradual para F-100 ou alimento terapêutico pronto para uso por 2 a 3 dias, depois aumentar até 150 a 220 kcal/kg/dia e 4 a 6 g/kg/dia de proteína para ganho de peso rápido (meta acima de 10 g/kg/dia); iniciar ferro; 9) estimulação sensorial e emocional, brincadeiras estruturadas e envolvimento da mãe; 10) preparar a alta com seguimento e vinculação à rede (atenção básica, benefícios sociais, saúde indígena).',
      'Anemia grave (Hb abaixo de 4 g/dL, ou abaixo de 6 g/dL com desconforto respiratório): transfusão de concentrado de hemácias 10 mL/kg em 3 horas, com furosemida 1 mg/kg no início; sem transfusão nas primeiras 48 horas se não grave.',
      'Diarreia persistente: investigar giardíase e intolerância à lactose; metronidazol para giardíase; manter alimentação.',
      'Lesões de pele: banhos com permanganato ou clorexidina, óxido de zinco, cobrir; tratar úlceras de córnea com vitamina A e antibiótico tópico.',
      'Não usar diuréticos para o edema nutricional; evitar sobrecarga de fluidos e sódio; não usar corticoide.',
      'Alta hospitalar com peso para estatura acima de -2 z ou perímetro braquial acima de 12,5 cm e ausência de edema por 2 semanas, ou transferência para o ambulatório de reabilitação nutricional com alimento terapêutico quando estável.'
    ],
    medicamentos: [
      { medId: 'glicose', esquema: 'Hipoglicemia: 50 mL de glicose 10% VO ou por sonda (5 mL/kg) se consciente; se inconsciente, glicose 10% 5 mL/kg IV, seguida de alimentação a cada 2 h.' },
      { medId: 'sais_reidratacao_oral', esquema: 'Preferir ReSoMal (SRO modificado: 1 envelope de SRO em 2 litros com 50 g de açúcar e mistura mineral): 5 mL/kg a cada 30 min por 2 h, depois 5 a 10 mL/kg/h até 10 h, alternando com F-75. Na falta, SRO padrão diluído conforme protocolo do MS.' },
      { medId: 'ringer_lactato', esquema: 'Apenas em choque: 15 mL/kg em 1 h (ringer lactato com glicose 5% ou solução meio a meio com glicose), repetir 1 vez se houver melhora; se não melhorar, transfusão e avaliar choque séptico.' },
      { medId: 'amoxicilina', esquema: 'Desnutrição grave sem complicações: 50 a 80 mg/kg/dia VO dividida 8/8 h ou 12/12 h por 7 dias.' },
      { medId: 'ampicilina', esquema: 'Com complicações: 50 mg/kg/dose IV ou IM 6/6 h por 2 dias, depois amoxicilina VO por 5 dias, associada a gentamicina.' },
      { medId: 'gentamicina', esquema: 'Com complicações: 7,5 mg/kg IV ou IM 1 vez ao dia por 7 dias (função renal normal).' },
      { medId: 'ceftriaxona', esquema: 'Infecção grave, meningite ou sem melhora em 48 h: 50 a 100 mg/kg/dia IV, conforme protocolo.' },
      { medId: 'vitamina_a', esquema: 'Se sinais de deficiência (xeroftalmia) ou sarampo: menores de 6 meses 50.000 UI; 6 a 11 meses 100.000 UI; 12 meses ou mais 200.000 UI VO no dia 1, repetir no dia 2 e após 2 semanas se lesão ocular. Sem sinais oculares e com F-75 ou RUTF fortificados, não repetir doses altas.' },
      { medId: 'zinco', esquema: '2 mg/kg/dia VO durante a internação (incluído nas mistura mineral e RUTF) e 10 a 20 mg/dia por 10 a 14 dias se diarreia.' },
      { medId: 'sulfato_ferroso', esquema: 'Somente na fase de reabilitação, após início do ganho de peso: 3 mg/kg/dia de ferro elementar VO por 3 meses; não usar na fase de estabilização.' },
      { medId: null, nome: 'Ácido fólico', esquema: '5 mg VO no dia 1 e depois 1 mg/dia.' },
      { medId: null, nome: 'F-75, F-100 e alimento terapêutico pronto para uso (RUTF)', esquema: 'F-75: 130 mL/kg/dia (100 mL/kg/dia se edema grave) em 8 a 12 refeições na estabilização; F-100 ou RUTF: 150 a 220 kcal/kg/dia na reabilitação; preparação conforme manual do MS/OMS.' },
      { medId: 'albendazol', esquema: 'Maiores de 1 ano, na fase de reabilitação (a partir do 7º dia): 400 mg VO dose única (200 mg de 1 a 2 anos).' }
    ],
    criteriosInternacao: [
      'Desnutrição aguda grave complicada: sinais de perigo, anorexia, edema grau 3, hipoglicemia, hipotermia, desidratação, infecção grave, anemia grave, lesões cutâneas extensas.',
      'Idade menor de 6 meses com desnutrição aguda grave.',
      'Falha do tratamento ambulatorial (sem ganho de peso em 2 a 3 semanas) ou impossibilidade de seguimento semanal.',
      'Suspeita de tuberculose, HIV ou outra doença de base a investigar.',
      'Situação social de risco (negligência, insegurança alimentar extrema, comunidade sem acesso).'
    ],
    criteriosUTI: [
      'Choque que não responde à primeira expansão ou choque séptico.',
      'Insuficiência respiratória ou alteração grave de consciência.',
      'Distúrbios eletrolíticos graves com arritmia (hipocalemia, hipofosfatemia da realimentação).',
      'Hipoglicemia ou hipotermia refratárias.'
    ],
    criteriosAlta: [
      'Apetite recuperado, ingerindo pelo menos 75% da dieta prescrita, com ganho de peso acima de 5 a 10 g/kg/dia por 3 dias consecutivos.',
      'Ausência de edema por pelo menos 2 semanas (ou em regressão consistente) e infecções tratadas.',
      'Peso para estatura acima de -2 z ou perímetro braquial acima de 12,5 cm (alta do programa); ou estabilização clínica com transição segura para tratamento ambulatorial com alimento terapêutico.',
      'Mãe ou cuidador treinado na alimentação, com vinculação à atenção básica, ao programa de suplementação e à rede socioassistencial; retorno semanal agendado.'
    ],
    orientacoes: [
      'Oferecer as refeições nos horários indicados, inclusive à noite, em pequenas quantidades e com paciência; manter o aleitamento materno.',
      'Dar os suplementos (vitaminas, zinco, ferro quando prescrito) todos os dias e completar o antibiótico.',
      'Manter a criança aquecida, principalmente à noite, e brincar e conversar com ela para estimular o desenvolvimento.',
      'Retornar imediatamente se recusa alimentar, sonolência, febre, diarreia, vômitos, inchaço aumentando ou respiração rápida.',
      'Comparecer às consultas semanais de pesagem e buscar os benefícios sociais e o apoio da equipe de saúde da comunidade.'
    ],
    retorno: 'Seguimento semanal (peso, perímetro braquial, edema) até a recuperação e depois mensal por pelo menos 6 meses; retorno imediato se sinais de perigo.',
    prevencao: [
      'Aleitamento materno exclusivo até 6 meses e alimentação complementar adequada; acompanhamento do crescimento com curvas da OMS na caderneta da criança.',
      'Rastreamento com perímetro braquial pelos agentes de saúde e vigilância alimentar e nutricional (SISVAN).',
      'Suplementação de vitamina A, ferro e zinco conforme programas do MS; vacinação completa (sarampo).',
      'Controle de malária, diarreias e parasitoses; água tratada e saneamento.',
      'Segurança alimentar: programas de transferência de renda, apoio à agricultura familiar e ações intersetoriais em territórios indígenas e ribeirinhos.'
    ],
    fontes: [
      { nome: 'OMS – Guideline: updates on the management of severe acute malnutrition in infants and children', ano: 2013 },
      { nome: 'Manual de atendimento da criança com desnutrição grave em nível hospitalar – Ministério da Saúde', ano: 2005 },
      { nome: 'OMS – Pocket book of hospital care for children (2ª ed.)', ano: 2013 },
      { nome: 'OMS – Guideline on the prevention and management of wasting and nutritional oedema in infants and children', ano: 2023 }
    ],
    atualizadoEm: '2026-09'
  }
];
