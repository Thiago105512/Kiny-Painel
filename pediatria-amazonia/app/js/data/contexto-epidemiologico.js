window.PED = window.PED || {}; PED.data = PED.data || {};

// Contexto epidemiológico (anamnese ambiental/regional – Amazonas).
// tags = ids usados nas regras `se.contexto` das queixas.
// tipo 'select': cada opção pode carregar suas próprias tags (tagsPorOpcao); `tags` lista a união.
// tipo 'bool' com `tagQuandoNao: true`: a tag é aplicada quando a resposta é NÃO (ex.: vacinação não atualizada).
// `detalhe`: campo de texto complementar exibido quando a resposta é SIM.
PED.data.contextoEpidemiologico = [
  {
    id: 'municipio',
    pergunta: 'Município de residência (ou onde adoeceu)?',
    tipo: 'text',
    tags: [],
    porque: 'A incidência de malária, leishmaniose, arboviroses e acidentes por animais peçonhentos varia muito entre municípios do Amazonas e orienta a suspeita clínica e a notificação.'
  },
  {
    id: 'zona',
    pergunta: 'Zona de moradia',
    tipo: 'select',
    opcoes: [
      { valor: 'urbana', rotulo: 'Urbana' },
      { valor: 'rural', rotulo: 'Rural' },
      { valor: 'indigena', rotulo: 'Comunidade indígena' },
      { valor: 'ribeirinha', rotulo: 'Comunidade ribeirinha' }
    ],
    tagsPorOpcao: { urbana: [], rural: ['rural'], indigena: ['indigena', 'rural'], ribeirinha: ['ribeirinha', 'rural'] },
    tags: ['rural', 'indigena', 'ribeirinha'],
    porque: 'Moradia rural, ribeirinha ou indígena aumenta a probabilidade de malária, leishmaniose, parasitoses, acidentes ofídicos e desnutrição, e reduz o acesso a saneamento e a serviços de saúde.'
  },
  {
    id: 'viagem_recente',
    pergunta: 'Viagem ou deslocamento nos últimos 30 dias (interior, garimpo, outro estado ou país)?',
    tipo: 'bool',
    detalhe: { tipo: 'text', pergunta: 'Para onde e por quanto tempo?' },
    tags: ['viagem'],
    porque: 'Deslocamentos recentes para áreas endêmicas explicam malária, febre amarela, arboviroses e outras doenças fora da área habitual de transmissão e devem constar na notificação.'
  },
  {
    id: 'area_rural',
    pergunta: 'Permanência em área rural nos últimos 30 dias?',
    tipo: 'bool',
    tags: ['rural'],
    porque: 'Área rural amazônica concentra a transmissão de malária, leishmaniose, febre amarela silvestre e acidentes por animais peçonhentos.'
  },
  {
    id: 'area_ribeirinha',
    pergunta: 'Mora ou esteve em comunidade ribeirinha (beira de rio, lago ou igarapé)?',
    tipo: 'bool',
    tags: ['ribeirinha', 'rural'],
    porque: 'Comunidades ribeirinhas têm alta transmissão de malária (Anopheles em margens de rios), parasitoses por água não tratada, leptospirose em cheias e afogamentos.'
  },
  {
    id: 'area_indigena',
    pergunta: 'Pertence a comunidade indígena ou esteve em terra indígena?',
    tipo: 'bool',
    tags: ['indigena', 'rural'],
    porque: 'Populações indígenas do Amazonas apresentam maior carga de malária, tuberculose, desnutrição, parasitoses e pneumonia, além de barreiras de acesso e possível baixa cobertura vacinal.'
  },
  {
    id: 'entrada_mata',
    pergunta: 'Entrou na mata (caça, pesca, extrativismo, trilha, roça) nos últimos 30 dias?',
    tipo: 'bool',
    tags: ['mata', 'rural'],
    porque: 'A mata é o ambiente de transmissão de leishmaniose tegumentar, febre amarela silvestre, malária, febre do Mayaro e do contato com serpentes, lagartas e outros animais peçonhentos.'
  },
  {
    id: 'picada_mosquito',
    pergunta: 'Picadas frequentes de mosquito/carapanã/maruim nas últimas 2 semanas?',
    tipo: 'bool',
    tags: ['mosquito'],
    porque: 'Picadas de mosquitos transmitem malária, dengue, chikungunya, zika, oropouche, mayaro e febre amarela; a exposição relatada reforça a suspeita de arbovirose ou malária.'
  },
  {
    id: 'contato_agua_rio',
    pergunta: 'Contato com água de rio, lago, igarapé ou lagoa (banho, pesca, travessia) nos últimos 30 dias?',
    tipo: 'bool',
    tags: ['agua_rio', 'agua'],
    porque: 'Água de rio pode expor a leptospirose, parasitoses, esquistossomose em focos específicos, dermatoses e infecções de feridas por bactérias aquáticas, além de afogamento.'
  },
  {
    id: 'contato_enchente',
    pergunta: 'Contato com água de enchente, alagamento ou lama nos últimos 30 dias?',
    tipo: 'bool',
    tags: ['enchente', 'agua'],
    porque: 'Enchentes e alagamentos (cheia dos rios) elevam o risco de leptospirose, diarreias, hepatite A e acidentes com serpentes e escorpiões que buscam abrigo nas casas.'
  },
  {
    id: 'contato_animais',
    pergunta: 'Contato com animais (cães, gatos, morcegos, macacos, bovinos, aves, animais silvestres)?',
    tipo: 'bool',
    tags: ['animais'],
    porque: 'Contato com animais está associado a raiva (morcegos, cães), toxoplasmose, doença da arranhadura do gato, brucelose e outras zoonoses, e orienta a profilaxia pós-exposição.'
  },
  {
    id: 'mordedura_picada',
    pergunta: 'Mordedura ou picada de animal (cão, morcego, serpente, escorpião, aranha, lagarta, abelhas) nos últimos dias?',
    tipo: 'bool',
    detalhe: { tipo: 'text', pergunta: 'Qual animal e há quanto tempo?' },
    tags: ['mordedura', 'animais'],
    porque: 'Define a necessidade de soro antiveneno, profilaxia antirrábica e antitetânica, com janela de tempo curta para a maior eficácia.'
  },
  {
    id: 'agua_nao_tratada',
    pergunta: 'Consome água sem tratamento (rio, poço, cacimba, chuva) ou sem filtrar/ferver/clorar?',
    tipo: 'bool',
    tags: ['agua_nao_tratada', 'agua'],
    porque: 'Água não tratada é a principal fonte de diarreias infecciosas, parasitoses intestinais, hepatite A, febre tifoide e cólera em comunidades amazônicas.'
  },
  {
    id: 'malaria_previa',
    pergunta: 'Já teve malária antes (ou a mãe teve malária na gestação)?',
    tipo: 'bool',
    tags: ['malaria_previa'],
    porque: 'Malária prévia indica exposição em área de transmissão e possibilidade de recaída por P. vivax (hipnozoítos), além de malária congênita em RN de mãe infectada.'
  },
  {
    id: 'contato_tuberculose',
    pergunta: 'Contato domiciliar ou próximo com pessoa com tuberculose ou tosse prolongada (> 3 semanas)?',
    tipo: 'bool',
    tags: ['contato_tb', 'contato_infeccioso'],
    porque: 'O contato com adulto bacilífero é o principal fator de risco de tuberculose na criança, com alta incidência no Amazonas, sobretudo em populações indígenas e periferias de Manaus.'
  },
  {
    id: 'contato_infeccioso',
    pergunta: 'Contato com pessoa doente com febre, exantema, diarreia, icterícia ou sintomas semelhantes (casa, escola, creche)?',
    tipo: 'bool',
    detalhe: { tipo: 'text', pergunta: 'Qual doença ou quais sintomas?' },
    tags: ['contato_infeccioso'],
    porque: 'Casos semelhantes no domicílio ou na comunidade sugerem doença transmissível (sarampo, varicela, hepatite A, escabiose, arboviroses) e orientam bloqueio e notificação.'
  },
  {
    id: 'vacinacao_atualizada',
    pergunta: 'Caderneta de vacinação atualizada para a idade (incluindo febre amarela, tríplice viral, penta/DTP)?',
    tipo: 'bool',
    tagQuandoNao: true,
    tags: ['nao_vacinado'],
    porque: 'Criança não vacinada ou com esquema atrasado tem risco de sarampo, coqueluche, difteria, tétano, febre amarela, meningites e pneumonias graves, que devem entrar no diagnóstico diferencial.'
  },
  {
    id: 'antibiotico_recente',
    pergunta: 'Uso de antibiótico nos últimos 30 dias?',
    tipo: 'bool',
    detalhe: { tipo: 'text', pergunta: 'Qual antibiótico e por quanto tempo?' },
    tags: ['antibiotico_recente'],
    porque: 'Antibiótico recente pode mascarar culturas e meningite parcialmente tratada, selecionar resistência e causar diarreia por Clostridioides difficile.'
  },
  {
    id: 'internacao_recente',
    pergunta: 'Internação hospitalar nos últimos 3 meses?',
    tipo: 'bool',
    tags: ['internacao_recente'],
    porque: 'Internação recente aumenta o risco de infecção por germes resistentes, recorrência da doença de base e complicações de procedimentos.'
  },
  {
    id: 'garimpo',
    pergunta: 'Mora, trabalha ou esteve em área de garimpo (ou familiares em garimpo)?',
    tipo: 'bool',
    tags: ['garimpo', 'rural', 'mata'],
    porque: 'Áreas de garimpo concentram malária (inclusive P. falciparum e resistência), leishmaniose, exposição a mercúrio, violência e baixa cobertura vacinal.'
  },
  {
    id: 'consumo_acai_artesanal',
    pergunta: 'Consumo de açaí, bacaba ou caldo de cana artesanal (sem pasteurização ou branqueamento) nos últimos 30 dias?',
    tipo: 'bool',
    tags: ['acai'],
    porque: 'Açaí artesanal contaminado por triatomíneos é a principal via de transmissão oral da doença de Chagas aguda na Amazônia, com surtos familiares.'
  },
  {
    id: 'contato_roedores',
    pergunta: 'Presença de ratos em casa, no trabalho ou em depósitos de alimentos?',
    tipo: 'bool',
    tags: ['roedores'],
    porque: 'Roedores transmitem leptospirose (urina), hantavírus (síndrome cardiopulmonar) e contaminam alimentos, com maior risco nas cheias e em áreas de armazenamento de grãos.'
  },
  {
    id: 'banho_igarape',
    pergunta: 'Banho ou brincadeira em igarapé, lago ou rio nas últimas 2 semanas?',
    tipo: 'bool',
    tags: ['agua_rio', 'agua'],
    porque: 'Banho em igarapés expõe a leptospirose, dermatites, otite externa, parasitoses, feridas infectadas por bactérias aquáticas e afogamento, principal causa de morte acidental em crianças ribeirinhas.'
  }
];
