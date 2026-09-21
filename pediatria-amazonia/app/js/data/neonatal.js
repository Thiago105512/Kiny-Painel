window.PED = window.PED || {}; var PED = window.PED; PED.data = PED.data || {};
// Base neonatal – apoio à decisão em pediatria (ênfase Amazonas)
// Contrato: app/js/data/CONTRATO.md (protocolos seguem o schema de PED.data.doencas)
// Conteúdo de apoio à decisão clínica. Confirmar sempre conforme protocolo vigente e bula.
PED.data.neonatal = {

  // =====================================================================
  // PROTOCOLOS (mesmo formato de PED.data.doencas; o app concatena em PED.data.doencas)
  // =====================================================================
  protocolos: [

    {
      id: 'ictericia_neonatal',
      nome: 'Icterícia neonatal (hiperbilirrubinemia indireta)',
      categoria: 'neonatal',
      amazonia: false,
      cid10: 'P59',
      tags: ['ictericia', 'recusa_alimentar', 'hipotonia', 'apatia', 'irritabilidade', 'palidez', 'letargia', 'convulsao', 'vomitos', 'hepatomegalia', 'esplenomegalia', 'febre'],
      definicao: 'Coloração amarelada de pele, escleras e mucosas do recém-nascido decorrente do acúmulo de bilirrubina. A icterícia fisiológica aparece após 24 horas de vida, atinge o pico entre 3 e 5 dias no RN a termo e regride até a segunda semana. Considera-se icterícia não fisiológica quando surge antes de 24 horas de vida, quando a bilirrubina total ultrapassa os limiares de fototerapia para a hora de vida, quando há aumento rápido (maior que 0,2 mg/dL por hora ou 5 mg/dL por dia), quando a fração direta está elevada ou quando persiste além de 14 dias no RN a termo.',
      epidemiologia: 'Cerca de 60% dos RN a termo e 80% dos prematuros apresentam icterícia visível na primeira semana de vida, e é a principal causa de reinternação neonatal. A encefalopatia bilirrubínica (kernicterus) é rara, mas evitável e permanente. No Amazonas, alta ou parto em domicílio, comunidades ribeirinhas e indígenas e transporte fluvial prolongado atrasam a dosagem de bilirrubina e o início da fototerapia, aumentando o risco de níveis críticos; nessas situações considerar avaliação por zonas de Kramer, contato precoce com a referência e transporte com o RN aquecido e em aleitamento. Deficiência de G6PD, incompatibilidade ABO e prematuridade tardia (35 a 37 semanas) são os fatores de risco mais frequentes.',
      agente: 'Não se aplica agente infeccioso na maioria dos casos. A hiperbilirrubinemia indireta resulta de produção aumentada (hemólise por incompatibilidade ABO ou Rh, deficiência de G6PD, esferocitose, céfalo-hematoma, policitemia), captação e conjugação hepática imaturas e aumento da circulação êntero-hepática (baixa ingesta de leite). Quando há elevação da bilirrubina direta, considerar colestase, infecção (sepse, sífilis congênita, TORCH, malária congênita em área endêmica) e atresia de vias biliares.',
      transmissao: 'Não se aplica. Não é doença transmissível. Na doença hemolítica isoimune ocorre passagem transplacentária de anticorpos maternos contra hemácias do RN, e não transmissão entre pessoas.',
      incubacao: 'Não se aplica. O que orienta a decisão é a hora de vida: icterícia iniciada antes de 24 horas é sempre considerada patológica; a fisiológica costuma surgir entre 48 e 72 horas e a do leite materno pode persistir por semanas.',
      manifestacoes: [
        'Icterícia de progressão cefalocaudal, avaliada em ambiente bem iluminado, com digitopressão sobre proeminência óssea (zonas de Kramer).',
        'Bom estado geral na icterícia fisiológica e na icterícia associada ao aleitamento materno.',
        'Sucção fraca, sonolência, perda de peso maior que 10% e diurese reduzida na icterícia por baixa ingesta.',
        'Palidez, hepatoesplenomegalia e icterícia antes de 24 horas de vida sugerem doença hemolítica.',
        'Colúria, acolia ou hipocolia fecal e icterícia persistente após 14 dias sugerem colestase.',
        'Icterícia associada a hipotermia, febre, gemência ou distensão abdominal levanta a suspeita de sepse.'
      ],
      sinaisAlarme: [
        'Icterícia iniciada antes de 24 horas de vida.',
        'Icterícia que atinge mãos e pés (zona 5 de Kramer) em qualquer idade.',
        'Letargia, hipotonia, sucção débil ou recusa alimentar.',
        'Choro agudo e estridente, irritabilidade, opistótono, retrocolo ou hipertonia (encefalopatia bilirrubínica aguda).',
        'Convulsão, apneia ou febre associada.',
        'Bilirrubina total acima do limiar de fototerapia para a hora de vida ou aumento maior que 0,2 mg/dL por hora.',
        'Bilirrubina direta maior que 1 mg/dL (ou maior que 20% da total), acolia fecal e colúria.',
        'Perda de peso maior que 10% do peso de nascimento com sinais de desidratação.'
      ],
      diagnosticoDiferencial: ['sepse', 'infeccao_urinaria', 'sifilis_congenita', 'malaria', 'Icterícia fisiológica', 'Icterícia do aleitamento materno (baixa ingesta) e do leite materno', 'Doença hemolítica por incompatibilidade ABO ou Rh', 'Deficiência de G6PD', 'Esferocitose hereditária', 'Céfalo-hematoma e equimoses extensas', 'Policitemia', 'Hipotireoidismo congênito', 'Colestase neonatal e atresia de vias biliares', 'Infecções congênitas (TORCH)'],
      exames: ['bilirrubinas', 'hemograma', 'glicemia', 'hemocultura', 'urina_1', 'urocultura', 'ast', 'alt', 'albumina', 'tsh', 'gota_espessa', 'Tipagem sanguínea e fator Rh da mãe e do RN', 'Teste de Coombs direto', 'Contagem de reticulócitos', 'Dosagem de G6PD (quando disponível)', 'VDRL ou teste não treponêmico do RN e da mãe'],
      criteriosDiagnosticos: [
        'Avaliação clínica das zonas de Kramer serve para triagem: a estimativa visual subestima níveis altos e não substitui a dosagem laboratorial.',
        'Dosar bilirrubina total e frações em todo RN com icterícia antes de 24 horas de vida, icterícia em zonas 3 a 5, prematuro tardio, icterícia persistente ou qualquer sinal de alarme.',
        'Interpretar sempre a bilirrubina total pela hora de vida e pelo grupo de risco (idade gestacional e fatores de neurotoxicidade), usando o gráfico oficial adotado no serviço.',
        'Compatível com doença hemolítica isoimune: icterícia antes de 24 horas, incompatibilidade ABO ou Rh, Coombs direto positivo, reticulocitose e queda de hemoglobina.',
        'Compatível com colestase: bilirrubina direta maior que 1 mg/dL (ou maior que 20% da total), acolia fecal, colúria e hepatomegalia; investigação com urgência, pois a correção cirúrgica da atresia de vias biliares tem melhor resultado antes de 60 dias de vida.',
        'Icterícia com bilirrubina indireta persistente após 14 dias em RN a termo: avaliar hipotireoidismo congênito (triagem neonatal), infecção urinária e icterícia do leite materno.'
      ],
      classificacaoGravidade: [
        { nivel: 'Icterícia fisiológica', criterios: 'Início após 24 horas de vida, RN em bom estado geral, bilirrubina total abaixo do limiar de fototerapia para a hora de vida, sem hemólise e com boa ingesta. Conduta ambulatorial, com reforço do aleitamento e reavaliação em 24 a 48 horas.' },
        { nivel: 'Icterícia com indicação de fototerapia', criterios: 'Bilirrubina total igual ou acima do limiar do grupo de risco para a hora de vida, ou icterícia antes de 24 horas de vida, ou aumento maior que 0,2 mg/dL por hora. Indicar fototerapia, manter hidratação e aleitamento e repetir bilirrubina em 4 a 12 horas conforme a velocidade de subida.' },
        { nivel: 'Icterícia grave (risco de exsanguineotransfusão)', criterios: 'Bilirrubina total próxima ou acima do limiar de exsanguineotransfusão, doença hemolítica com subida rápida apesar de fototerapia intensiva, ou relação bilirrubina/albumina elevada. Internar, iniciar fototerapia intensiva imediatamente e acionar a referência neonatal.' },
        { nivel: 'Encefalopatia bilirrubínica aguda', criterios: 'Letargia e hipotonia evoluindo para irritabilidade, choro agudo, hipertonia, retrocolo, opistótono, febre e convulsão. Emergência: fototerapia intensiva sem interrupção e exsanguineotransfusão imediata na unidade de referência.' }
      ],
      tratamento: [
        'Avaliar hora de vida, idade gestacional, fatores de risco de neurotoxicidade e peso atual comparado ao de nascimento.',
        'Dosar bilirrubina total e frações e comparar com os limiares de fototerapia do grupo de risco; não decidir apenas pela impressão visual.',
        'Indicada a fototerapia: manter o RN despido, com proteção ocular, em berço ou incubadora, com a maior superfície corporal exposta e a fonte de luz na distância recomendada pelo fabricante; controlar temperatura a cada 3 horas.',
        'Manter aleitamento materno em livre demanda, com 8 a 12 mamadas por dia; não interromper o leite materno de rotina. Se a ingesta for insuficiente ou a perda de peso maior que 10%, complementar com leite materno ordenhado por copo ou sonda.',
        'Hidratação venosa apenas se houver desidratação, recusa alimentar ou impossibilidade de ingesta oral adequada; não usar água ou soro glicosado oral para tratar icterícia.',
        'Repetir bilirrubina em 4 a 6 horas nos casos graves ou hemolíticos e em 8 a 12 horas nos demais, até queda consistente.',
        'Fototerapia intensiva (múltiplas fontes, maior irradiância) quando a bilirrubina se aproxima do limiar de exsanguineotransfusão ou nas doenças hemolíticas.',
        'Bilirrubina em nível de exsanguineotransfusão ou sinais de encefalopatia bilirrubínica: acionar a referência neonatal imediatamente, manter fototerapia intensiva durante todo o transporte e garantir acesso venoso, aquecimento e controle glicêmico.',
        'Na doença hemolítica isoimune grave, considerar imunoglobulina humana intravenosa conforme protocolo do serviço quando a bilirrubina continua subindo apesar de fototerapia intensiva; confirmar conforme protocolo.',
        'Tratar a causa de base quando identificada: antibiótico na sepse, penicilina cristalina na sífilis congênita, tratamento antimalárico na malária congênita, levotiroxina no hipotireoidismo congênito conforme referência.',
        'Bilirrubina direta elevada com acolia: não indicar fototerapia como tratamento da colestase e encaminhar com urgência para investigação de atresia de vias biliares.'
      ],
      medicamentos: [
        { medId: null, nome: 'Fototerapia (medida terapêutica não medicamentosa)', esquema: 'Fototerapia convencional ou intensiva conforme os limiares por hora de vida e grupo de risco. Proteção ocular contínua, maior superfície corporal exposta, controle de temperatura e de hidratação. Suspender quando a bilirrubina estiver pelo menos 2 a 3 mg/dL abaixo do limiar e a tendência for de queda; confirmar conforme protocolo.' },
        { medId: null, nome: 'Imunoglobulina humana intravenosa', esquema: 'Doença hemolítica isoimune com bilirrubina em ascensão apesar de fototerapia intensiva: 0,5 a 1 g/kg IV em 2 a 4 horas, podendo ser repetida em 12 horas conforme resposta. Uso restrito à unidade neonatal; confirmar conforme protocolo e bula.', verificar: true },
        { medId: 'soro_fisiologico', esquema: 'Desidratação associada à icterícia por baixa ingesta: expansão de 10 mL/kg IV em 30 a 60 minutos, reavaliando perfusão, diurese e peso. Confirmar conforme protocolo.' },
        { medId: 'glicose', esquema: 'Hipoglicemia associada (glicemia menor que 45 mg/dL): glicose 10% 2 mL/kg IV em bolus lento, seguida de infusão contínua com velocidade inicial de 5 a 8 mg/kg/min, com controle glicêmico em 30 minutos.' },
        { medId: 'ampicilina', esquema: 'Icterícia com suspeita de sepse: 50 mg/kg/dose IV, a cada 12 horas até 7 dias de vida e a cada 8 horas após, associada a gentamicina, após coleta de culturas. Confirmar conforme protocolo.' },
        { medId: 'gentamicina', esquema: 'Icterícia com suspeita de sepse: 4 mg/kg/dose IV a cada 24 horas no RN a termo; intervalos maiores (36 a 48 horas) no prematuro. Confirmar conforme protocolo e função renal.' },
        { medId: 'penicilina_cristalina', esquema: 'Icterícia com sífilis congênita confirmada ou provável: 50.000 UI/kg/dose IV, a cada 12 horas nos primeiros 7 dias de vida e a cada 8 horas após, por 10 dias.' }
      ],
      criteriosInternacao: [
        'Bilirrubina total no nível de fototerapia sem possibilidade de fototerapia domiciliar ou ambulatorial segura.',
        'Icterícia iniciada antes de 24 horas de vida.',
        'Doença hemolítica isoimune, deficiência de G6PD conhecida ou queda rápida de hemoglobina.',
        'Perda de peso maior que 10%, desidratação ou recusa alimentar.',
        'Sinais de sepse, prematuridade (menor que 35 semanas) ou comorbidades.',
        'Bilirrubina direta elevada, acolia fecal ou icterícia persistente com suspeita de colestase.',
        'Família residente em comunidade distante, com transporte fluvial prolongado ou impossibilidade de retorno em 24 a 48 horas.'
      ],
      criteriosUTI: [
        'Sinais de encefalopatia bilirrubínica aguda (hipertonia, opistótono, choro agudo, convulsão).',
        'Indicação de exsanguineotransfusão ou bilirrubina em ascensão apesar de fototerapia intensiva.',
        'Instabilidade hemodinâmica, apneia ou necessidade de suporte ventilatório.',
        'Anemia grave com repercussão hemodinâmica na doença hemolítica.',
        'Sepse associada com disfunção orgânica.'
      ],
      criteriosAlta: [
        'Bilirrubina em queda e pelo menos 2 a 3 mg/dL abaixo do limiar de fototerapia, sem rebote significativo após 12 a 24 horas da suspensão.',
        'RN ativo, com sucção eficaz, diurese adequada e ganho ou estabilização do peso.',
        'Causa de base identificada e tratada ou em seguimento definido.',
        'Responsável orientado sobre sinais de alarme e com retorno agendado.',
        'Transporte de retorno e reavaliação garantidos em famílias de comunidades distantes.'
      ],
      orientacoes: [
        'Amamentar em livre demanda, de 8 a 12 vezes por dia, inclusive à noite, para ajudar o bebê a eliminar a bilirrubina pelas fezes.',
        'Não oferecer água, chá ou soro caseiro: não reduzem a icterícia e podem piorar a situação.',
        'Observar a cor da pele diariamente, em ambiente claro e com luz natural, pressionando levemente a pele do nariz, peito, barriga, pernas e pés.',
        'Procurar atendimento imediatamente se o bebê ficar amarelo nas mãos e nos pés, muito sonolento, sem mamar, com choro diferente ou com o corpo endurecido ou arqueado.',
        'Observar cor das fezes e da urina: fezes brancas ou muito claras e urina escura exigem avaliação rápida.',
        'Não expor o bebê ao sol como tratamento: há risco de queimadura, desidratação e hipotermia.',
        'Levar sempre a caderneta da criança e o resultado dos exames às consultas.'
      ],
      retorno: 'Reavaliar em 24 a 48 horas após a alta da maternidade ou da fototerapia, com nova avaliação clínica e dosagem de bilirrubina quando indicado. Em prematuros tardios e em doença hemolítica, reavaliar em 24 horas. Retorno imediato diante de qualquer sinal de alarme. Em comunidades com transporte fluvial prolongado, antecipar a reavaliação e combinar previamente o meio de transporte.',
      prevencao: [
        'Aleitamento materno exclusivo iniciado na primeira hora de vida, com apoio à pega e à frequência das mamadas.',
        'Tipagem sanguínea e Coombs indireto no pré-natal; profilaxia com imunoglobulina anti-D nas gestantes Rh negativo conforme protocolo.',
        'Avaliação da icterícia e do peso antes da alta da maternidade, com registro da hora de vida na dosagem de bilirrubina.',
        'Consulta de puericultura entre o 3º e o 5º dia de vida, antecipada em prematuros tardios e em RN com fatores de risco.',
        'Identificação de deficiência de G6PD em famílias com história prévia e orientação sobre substâncias a evitar.',
        'Em áreas ribeirinhas e indígenas, articular com agentes comunitários de saúde a visita domiciliar na primeira semana de vida.'
      ],
      fontes: [
        { nome: 'American Academy of Pediatrics – Clinical Practice Guideline Revision: Management of Hyperbilirubinemia in the Newborn Infant 35 or More Weeks of Gestation', ano: 2022 },
        { nome: 'Sociedade Brasileira de Pediatria – Documento científico sobre icterícia neonatal', ano: 2021 },
        { nome: 'Ministério da Saúde – Atenção à Saúde do Recém-Nascido: Guia para os Profissionais de Saúde', ano: 2014 },
        { nome: 'Nelson Textbook of Pediatrics, 21ª edição', ano: 2020 }
      ],
      atualizadoEm: '2026-09'
    },

    {
      id: 'sepse_neonatal',
      nome: 'Sepse neonatal (precoce e tardia)',
      categoria: 'neonatal',
      amazonia: true,
      cid10: 'P36',
      tags: ['febre', 'recusa_alimentar', 'hipotonia', 'apatia', 'irritabilidade', 'gemencia', 'taquipneia', 'apneia', 'cianose', 'ictericia', 'vomitos', 'distensao_abdominal', 'palidez', 'convulsao', 'letargia', 'lesoes_pele'],
      definicao: 'Síndrome clínica de infecção sistêmica no recém-nascido, com ou sem confirmação por hemocultura, nos primeiros 28 dias de vida. É classificada em precoce, com início antes de 72 horas de vida e relacionada a fatores maternos e ao parto, e tardia, com início a partir de 72 horas e relacionada a infecção adquirida na comunidade ou associada a cuidados de saúde. Os sinais são inespecíficos e a deterioração pode ser rápida.',
      epidemiologia: 'A sepse neonatal é uma das principais causas de mortalidade no período neonatal no Brasil. No Amazonas, o parto domiciliar e em comunidades ribeirinhas e indígenas, o pré-natal incompleto, a assistência ao parto sem material estéril e o transporte fluvial prolongado até a referência aumentam a incidência e a letalidade. Nessas áreas, considerar também onfalite, tétano neonatal por secção do cordão umbilical com instrumento não estéril e uso de substâncias no coto, sífilis congênita por pré-natal inadequado e malária congênita quando a mãe teve malária na gestação. A demora de horas a dias até o serviço de saúde torna obrigatório iniciar o antibiótico antes da transferência.',
      agente: 'Sepse precoce: Streptococcus agalactiae (estreptococo do grupo B), Escherichia coli e outras enterobactérias, Listeria monocytogenes (menos frequente). Sepse tardia comunitária: Staphylococcus aureus, E. coli, Klebsiella spp., Streptococcus pneumoniae. Sepse tardia hospitalar: Staphylococcus coagulase negativo, S. aureus, Klebsiella spp., Enterobacter spp., Pseudomonas aeruginosa e Candida spp. Considerar também vírus (herpes simples, enterovírus), Treponema pallidum e Plasmodium na forma congênita em área endêmica.',
      transmissao: 'Na sepse precoce, transmissão vertical: infecção ascendente após ruptura de membranas ou contaminação durante a passagem pelo canal de parto. Na sepse tardia, transmissão horizontal: contato com cuidadores, manipulação sem higiene das mãos, dispositivos invasivos e cuidado inadequado do coto umbilical. A malária congênita ocorre por via transplacentária e a sífilis congênita por passagem transplacentária do Treponema pallidum.',
      incubacao: 'Não se aplica no sentido clássico, pois a maioria das infecções é adquirida no periparto. Na prática, a sepse precoce manifesta-se nas primeiras 72 horas de vida (a maioria em 24 horas) e a tardia a partir de 72 horas até o 28º dia (ou mais tarde em prematuros).',
      manifestacoes: [
        'Dificuldade para mamar, sucção fraca ou recusa alimentar, geralmente o primeiro sinal.',
        'Hipotermia (temperatura axilar menor que 36 °C) ou febre (igual ou maior que 37,8 °C); no RN a hipotermia é tão ou mais preocupante que a febre.',
        'Letargia, hipoatividade, hipotonia ou irritabilidade e choro persistente.',
        'Gemência, taquipneia (frequência respiratória maior que 60 irpm), tiragem, batimento de asa nasal, apneia ou cianose.',
        'Palidez, pele moteada, tempo de enchimento capilar maior que 3 segundos e extremidades frias.',
        'Distensão abdominal, vômitos, resíduo gástrico, diarreia ou íleo.',
        'Icterícia precoce ou de rápida progressão.',
        'Coto umbilical com hiperemia periumbilical, secreção purulenta ou odor fétido (onfalite).',
        'Petéquias, pústulas, vesículas ou esclerema.',
        'Convulsão, abaulamento de fontanela ou hipertonia sugerem meningite associada.',
        'Trismo, rigidez, espasmos ao estímulo e dificuldade para sugar em RN de parto domiciliar sugerem tétano neonatal: notificação imediata.'
      ],
      sinaisAlarme: [
        'Qualquer febre ou hipotermia em RN com menos de 28 dias.',
        'Recusa alimentar completa ou sucção débil com queda do estado geral.',
        'Letargia, hipotonia acentuada ou irresponsividade.',
        'Apneia, gemência persistente, cianose ou saturação menor que 90% em ar ambiente.',
        'Tempo de enchimento capilar maior que 3 segundos, pele moteada, pulsos finos ou hipotensão.',
        'Convulsão ou abaulamento de fontanela.',
        'Hipoglicemia (glicemia menor que 45 mg/dL) ou acidose metabólica.',
        'Sangramento, petéquias ou esclerema.',
        'Distensão abdominal com alças visíveis ou ausência de ruídos hidroaéreos.'
      ],
      diagnosticoDiferencial: ['meningite', 'pneumonia', 'infeccao_urinaria', 'sifilis_congenita', 'malaria', 'desconforto_respiratorio_rn', 'hipoglicemia_neonatal', 'Cardiopatia congênita com choque (canal arterial dependente)', 'Erro inato do metabolismo', 'Herpes simples neonatal', 'Enterocolite necrosante', 'Tétano neonatal', 'Desidratação hipernatrêmica'],
      exames: ['hemograma', 'pcr', 'hemocultura', 'liquor', 'urina_1', 'urocultura', 'glicemia', 'gasometria', 'lactato', 'eletrolitos', 'bilirrubinas', 'ureia', 'creatinina', 'coagulograma', 'radiografia_torax', 'gota_espessa', 'VDRL do RN e da mãe', 'Cultura de secreção do coto umbilical ou de lesões de pele'],
      criteriosDiagnosticos: [
        'A suspeita é clínica: RN com sinais inespecíficos de infecção deve ser tratado como sepse até prova em contrário, pois a deterioração é rápida.',
        'Coletar hemocultura antes do antibiótico sempre que possível, sem atrasar o início do tratamento além de 1 hora.',
        'Punção lombar indicada em hemocultura positiva, quadro clínico grave, convulsão, ou sepse tardia; pode ser adiada se instabilidade, mas não deve ser esquecida.',
        'Urocultura por saco coletor não é confiável: colher por cateterismo vesical ou punção suprapúbica, sobretudo na sepse tardia.',
        'Hemograma compatível: leucócitos menores que 5.000/mm3 ou maiores que 25.000/mm3, relação neutrófilos imaturos/totais igual ou maior que 0,2, plaquetas menores que 100.000/mm3. Hemograma normal não exclui sepse.',
        'Proteína C reativa seriada (na admissão e 24 a 48 horas depois) tem maior valor para acompanhar a resposta e apoiar a suspensão do antibiótico do que para o diagnóstico inicial.',
        'Compatível com sepse precoce: início antes de 72 horas com fatores de risco maternos (bolsa rota maior que 18 horas, febre materna, colonização por estreptococo do grupo B, corioamnionite, infecção urinária materna não tratada).',
        'Em área endêmica, solicitar gota espessa no RN se a mãe teve malária na gestação ou reside em área de transmissão (malária congênita cursa com febre, anemia, icterícia e esplenomegalia).',
        'Notificação compulsória de sífilis congênita e de tétano neonatal quando confirmados ou suspeitos.'
      ],
      classificacaoGravidade: [
        { nivel: 'Risco infeccioso sem sinais clínicos', criterios: 'RN assintomático com fatores de risco maternos (bolsa rota prolongada, febre materna, colonização por estreptococo do grupo B sem profilaxia adequada). Manter em observação clínica por 48 horas, com sinais vitais seriados; avaliar exames conforme protocolo do serviço.' },
        { nivel: 'Sepse neonatal (sem disfunção orgânica)', criterios: 'Sinais clínicos compatíveis, bom nível de consciência, perfusão preservada e sem necessidade de suporte. Internar, coletar culturas e iniciar antibiótico empírico nas primeiras horas.' },
        { nivel: 'Sepse grave', criterios: 'Sinais de infecção com disfunção de pelo menos um órgão: desconforto respiratório com necessidade de oxigênio, letargia, hipoglicemia persistente, acidose metabólica, oligúria, icterícia importante ou plaquetopenia. Internação, antibiótico imediato e contato com a referência.' },
        { nivel: 'Choque séptico', criterios: 'Má perfusão persistente (enchimento capilar maior que 3 segundos, extremidades frias, pulsos finos), taquicardia ou bradicardia, hipotensão, oligúria e lactato elevado, apesar da expansão volêmica inicial. Requer UTI neonatal, drogas vasoativas e suporte ventilatório.' }
      ],
      tratamento: [
        'Suspeita de sepse neonatal é emergência: estabilizar via aérea, respiração e circulação, medir glicemia capilar e temperatura e garantir acesso venoso (ou intraósseo se necessário).',
        'Coletar hemocultura e demais culturas e iniciar antibiótico empírico na primeira hora; não aguardar resultados nem a transferência.',
        'Sepse precoce (menos de 72 horas de vida): ampicilina associada a gentamicina por via intravenosa.',
        'Sepse tardia comunitária (72 horas ou mais): ampicilina associada a gentamicina, ou oxacilina associada a gentamicina ou a cefotaxima quando há foco cutâneo ou onfalite; ajustar conforme o perfil local.',
        'Sepse tardia hospitalar ou associada a cateter: considerar vancomicina associada a aminoglicosídeo ou cefalosporina antipseudomonas conforme a flora e o protocolo da unidade; confirmar conforme protocolo.',
        'Suspeita de meningite: usar ampicilina em dose meníngea associada a cefotaxima; preferir cefotaxima à ceftriaxona no período neonatal, sobretudo em RN ictéricos ou em uso de soluções com cálcio.',
        'Manter normotermia (contato pele a pele, incubadora ou berço aquecido), corrigir hipoglicemia e manter glicemia acima de 45 mg/dL.',
        'Expansão volêmica com soro fisiológico 0,9% 10 mL/kg em 20 a 30 minutos, reavaliando perfusão, frequência cardíaca e sinais de sobrecarga; repetir com cautela conforme resposta.',
        'Oxigênio para manter saturação entre 90% e 95%; considerar CPAP nasal em desconforto respiratório e intubação em apneia ou falência respiratória.',
        'Manter jejum com hidratação venosa se distensão abdominal, instabilidade ou desconforto respiratório importante; retomar o leite materno assim que possível.',
        'Tratar convulsão com fenobarbital conforme protocolo e corrigir distúrbios metabólicos associados.',
        'Suspeita de herpes simples neonatal (vesículas, convulsão, líquor alterado sem bactérias): associar aciclovir intravenoso e contatar a referência; confirmar conforme protocolo.',
        'Malária congênita confirmada: tratar conforme o guia de malária do Ministério da Saúde, considerando restrições de medicamentos no período neonatal.',
        'Reavaliar o antibiótico em 48 a 72 horas com culturas e evolução clínica: suspender se cultura negativa, proteína C reativa normal e RN assintomático; completar 7 a 10 dias na sepse confirmada e 14 a 21 dias na meningite, conforme o agente.',
        'Organizar transporte neonatal seguro (aquecimento, acesso venoso, monitorização, glicemia e oxigênio) quando a referência for distante, mantendo o antibiótico já iniciado.'
      ],
      medicamentos: [
        { medId: 'ampicilina', esquema: 'Sepse neonatal: 50 mg/kg/dose IV. Até 7 dias de vida, a cada 12 horas; após 7 dias, a cada 8 horas. Em meningite, 100 mg/kg/dose nos mesmos intervalos. Confirmar conforme protocolo, peso e idade gestacional.' },
        { medId: 'gentamicina', esquema: 'Sepse neonatal: 4 mg/kg/dose IV a cada 24 horas no RN a termo; no prematuro, 4 a 5 mg/kg/dose com intervalo de 36 a 48 horas conforme idade gestacional. Monitorar função renal e, quando disponível, níveis séricos. Confirmar conforme protocolo.' },
        { medId: 'cefotaxima', esquema: 'Suspeita de meningite neonatal ou sepse por gram-negativos: 50 mg/kg/dose IV, a cada 12 horas até 7 dias de vida e a cada 8 horas após. Preferida à ceftriaxona no período neonatal. Confirmar conforme protocolo.' },
        { medId: 'oxacilina', esquema: 'Suspeita de foco cutâneo, onfalite ou infecção estafilocócica: 25 a 50 mg/kg/dose IV, a cada 12 horas até 7 dias de vida e a cada 8 horas após. Confirmar conforme protocolo.' },
        { medId: 'vancomicina', esquema: 'Sepse tardia hospitalar ou associada a cateter, com suspeita de estafilococo resistente: 10 a 15 mg/kg/dose IV, com intervalo conforme idade gestacional e pós-natal (habitualmente 12/12 h no RN a termo). Uso restrito à unidade neonatal, com monitorização de função renal. Confirmar conforme protocolo.', verificar: true },
        { medId: 'ceftriaxona', esquema: 'Evitar no período neonatal, sobretudo em RN ictéricos ou em uso de soluções com cálcio. Quando não houver alternativa fora do período neonatal imediato, 50 a 100 mg/kg/dia IV conforme protocolo; preferir cefotaxima.', verificar: true },
        { medId: 'penicilina_cristalina', esquema: 'Sífilis congênita associada: 50.000 UI/kg/dose IV, a cada 12 horas nos primeiros 7 dias de vida e a cada 8 horas após, por 10 dias.' },
        { medId: 'soro_fisiologico', esquema: 'Choque séptico neonatal: 10 mL/kg IV em 20 a 30 minutos, reavaliando após cada alíquota; evitar sobrecarga (hepatomegalia, crepitações, piora respiratória).' },
        { medId: 'glicose', esquema: 'Hipoglicemia (glicemia menor que 45 mg/dL): glicose 10% 2 mL/kg IV em bolus lento, seguida de infusão contínua com 5 a 8 mg/kg/min, com controle em 30 minutos.' },
        { medId: 'adrenalina', esquema: 'Choque séptico refratário a volume: infusão contínua 0,05 a 0,3 mcg/kg/min IV em acesso seguro, preferencialmente central, na unidade de referência. Confirmar conforme protocolo e bomba de infusão.', verificar: true },
        { medId: 'fenobarbital', esquema: 'Convulsão neonatal: ataque de 20 mg/kg IV lento (em 15 a 20 minutos), podendo repetir 10 mg/kg até 40 mg/kg no total; manutenção de 3 a 5 mg/kg/dia. Monitorar depressão respiratória.' },
        { medId: null, nome: 'Aciclovir', esquema: 'Suspeita de herpes simples neonatal: 20 mg/kg/dose IV a cada 8 horas, por 14 dias na doença localizada de pele, olhos e boca e 21 dias na doença disseminada ou do sistema nervoso central. Confirmar conforme protocolo e função renal.', verificar: true }
      ],
      criteriosInternacao: [
        'Todo RN com menos de 28 dias e febre ou hipotermia.',
        'Qualquer sinal clínico compatível com sepse, mesmo isolado.',
        'RN com fatores de risco maternos importantes e sinais clínicos, ainda que discretos.',
        'Onfalite, lesões de pele extensas ou suspeita de tétano neonatal.',
        'Prematuridade, baixo peso ou comorbidades.',
        'Residência em comunidade distante com impossibilidade de reavaliação rápida.'
      ],
      criteriosUTI: [
        'Choque séptico ou necessidade de drogas vasoativas.',
        'Apneia recorrente, insuficiência respiratória ou necessidade de ventilação mecânica.',
        'Convulsões de difícil controle ou coma.',
        'Acidose metabólica persistente, oligúria ou insuficiência renal.',
        'Coagulopatia, sangramento ativo ou plaquetopenia grave.',
        'Hipoglicemia refratária ou necessidade de velocidade de infusão de glicose elevada.'
      ],
      criteriosAlta: [
        'Afebril e estável por pelo menos 24 a 48 horas, com sucção eficaz e ganho de peso.',
        'Tratamento antibiótico completo ou esquema de continuidade definido e garantido.',
        'Culturas e exames de controle compatíveis com boa evolução.',
        'Ausência de disfunção orgânica e de necessidade de oxigênio.',
        'Responsável orientado sobre sinais de alarme e retorno agendado; transporte de retorno viável.'
      ],
      orientacoes: [
        'Procurar atendimento imediatamente se o bebê ficar quente ou muito frio, parar de mamar, ficar molinho, gemer, respirar rápido, ficar roxo ou tiver convulsão.',
        'Manter o coto umbilical limpo e seco, higienizado com álcool 70% conforme orientação, sem aplicar teia de aranha, pó de café, ervas ou qualquer outra substância.',
        'Lavar as mãos antes de pegar o bebê e evitar visitas de pessoas doentes nos primeiros meses.',
        'Manter o aleitamento materno exclusivo, que protege contra infecções.',
        'Levar a caderneta da criança e informar todos os medicamentos usados.',
        'Não interromper o antibiótico por conta própria, mesmo com melhora.',
        'Em comunidades distantes, combinar antecipadamente o transporte para o caso de piora, pois o deslocamento pode levar horas.'
      ],
      retorno: 'Após a alta hospitalar, reavaliar em 48 a 72 horas, com nova consulta em 7 dias e seguimento de puericultura. Nos RN tratados por meningite, garantir avaliação neurológica e triagem auditiva no seguimento. Retorno imediato diante de qualquer sinal de alarme.',
      prevencao: [
        'Pré-natal completo, com pelo menos 6 consultas, testagem para sífilis, HIV e hepatites e triagem para estreptococo do grupo B entre 35 e 37 semanas conforme disponibilidade.',
        'Profilaxia antibiótica intraparto nas indicações (colonização por estreptococo do grupo B, bolsa rota prolongada, febre materna, filho anterior com doença invasiva).',
        'Parto assistido em serviço de saúde; quando ocorrer parto domiciliar, garantir material estéril para secção do cordão e avaliação do RN o quanto antes.',
        'Vacinação antitetânica da gestante (dTpa) para prevenção do tétano neonatal, prioritária em áreas com parto domiciliar.',
        'Cuidado higiênico do coto umbilical com álcool 70% e sem aplicação de substâncias caseiras.',
        'Aleitamento materno exclusivo e higiene das mãos dos cuidadores.',
        'Visita domiciliar na primeira semana de vida por agente comunitário de saúde, especialmente em comunidades ribeirinhas e indígenas.'
      ],
      fontes: [
        { nome: 'Ministério da Saúde – Atenção à Saúde do Recém-Nascido: Guia para os Profissionais de Saúde', ano: 2014 },
        { nome: 'Sociedade Brasileira de Pediatria – Documento científico sobre sepse neonatal', ano: 2021 },
        { nome: 'OMS – Pocket Book of Hospital Care for Children', ano: 2013 },
        { nome: 'Nelson Textbook of Pediatrics, 21ª edição', ano: 2020 }
      ],
      atualizadoEm: '2026-09'
    },

    {
      id: 'desconforto_respiratorio_rn',
      nome: 'Desconforto respiratório do recém-nascido',
      categoria: 'neonatal',
      amazonia: false,
      cid10: 'P22',
      tags: ['taquipneia', 'tiragem', 'gemencia', 'cianose', 'apneia', 'recusa_alimentar', 'hipotonia', 'apatia', 'letargia', 'febre', 'tosse'],
      definicao: 'Conjunto de sinais de esforço respiratório no recém-nascido: frequência respiratória maior que 60 irpm, tiragem intercostal ou subcostal, retração esternal, batimento de asa nasal, gemência expiratória e cianose. As causas mais frequentes são a taquipneia transitória do recém-nascido, a síndrome do desconforto respiratório por deficiência de surfactante (prematuro), a pneumonia ou sepse neonatal, a síndrome de aspiração meconial, o pneumotórax e as cardiopatias congênitas.',
      epidemiologia: 'O desconforto respiratório é a causa mais comum de internação em unidade neonatal. A síndrome do desconforto respiratório é tanto mais frequente quanto menor a idade gestacional; a taquipneia transitória associa-se a cesárea eletiva sem trabalho de parto. No Amazonas, a distância até unidades com CPAP, surfactante e ventilação mecânica é um fator crítico: em partos domiciliares ou em comunidades ribeirinhas, o reconhecimento precoce, o uso de CPAP nasal quando disponível, a manutenção da normotermia e o contato imediato com a central de regulação são determinantes, pois o transporte fluvial ou aéreo pode levar horas.',
      agente: 'Não se aplica um agente único. Causas não infecciosas incluem retardo de absorção do líquido pulmonar (taquipneia transitória), deficiência de surfactante, aspiração de mecônio, pneumotórax e malformações. Causas infecciosas incluem Streptococcus agalactiae, Escherichia coli e outras bactérias da sepse neonatal, além de vírus respiratórios (vírus sincicial respiratório, influenza) e Bordetella pertussis no período neonatal tardio.',
      transmissao: 'Não se aplica na maioria das causas, que são adaptativas, mecânicas ou malformativas. Quando a causa é pneumonia ou sepse, aplica-se a transmissão vertical no periparto (precoce) ou o contato com pessoas doentes e cuidadores (tardia).',
      incubacao: 'Não se aplica. O momento de início orienta o raciocínio: desconforto desde o nascimento ou nas primeiras horas sugere taquipneia transitória, síndrome do desconforto respiratório ou aspiração meconial; início após 24 a 72 horas sugere pneumonia, sepse ou cardiopatia congênita dependente de canal arterial.',
      manifestacoes: [
        'Frequência respiratória maior que 60 irpm mantida, avaliada por 1 minuto com a criança tranquila.',
        'Tiragem intercostal, subcostal e retração esternal.',
        'Batimento de asa nasal e gemência expiratória.',
        'Cianose central, palidez ou saturação menor que 90% em ar ambiente.',
        'Apneia (pausa maior que 20 segundos ou menor com bradicardia ou dessaturação), mais frequente em prematuros e na sepse.',
        'Dificuldade para mamar, cansaço e sudorese durante as mamadas.',
        'Taquipneia transitória: início logo após o nascimento, melhora progressiva em 24 a 72 horas, baixa necessidade de oxigênio.',
        'Síndrome do desconforto respiratório: prematuro, piora progressiva nas primeiras horas, gemência intensa e necessidade crescente de oxigênio.',
        'Aspiração meconial: líquido amniótico meconial, tórax insuflado, hipoxemia importante.',
        'Cardiopatia congênita: cianose que não melhora com oxigênio, sopro, pulsos femorais diminuídos, diferença entre saturação pré e pós-ductal.'
      ],
      sinaisAlarme: [
        'Apneia ou respiração irregular com bradicardia.',
        'Cianose central ou saturação menor que 90% apesar de oxigênio suplementar.',
        'Gemência persistente, tiragem intensa ou exaustão respiratória (queda da frequência respiratória com piora clínica).',
        'Frequência cardíaca menor que 100 bpm.',
        'Diferença de saturação entre membro superior direito e membros inferiores maior que 3 pontos percentuais.',
        'Hipotermia, letargia ou má perfusão associadas (sugerem sepse).',
        'Piora súbita com assimetria de expansão torácica ou redução unilateral do murmúrio (pneumotórax).',
        'Hipoglicemia associada (glicemia menor que 45 mg/dL).'
      ],
      diagnosticoDiferencial: ['sepse_neonatal', 'pneumonia', 'bronquiolite', 'Taquipneia transitória do recém-nascido', 'Síndrome do desconforto respiratório (deficiência de surfactante)', 'Síndrome de aspiração meconial', 'Pneumotórax', 'Cardiopatia congênita dependente de canal arterial', 'Hipertensão pulmonar persistente do recém-nascido', 'Hérnia diafragmática congênita', 'Atresia de coanas', 'Acidose metabólica de causa metabólica (erro inato do metabolismo)', 'Anemia grave ou policitemia'],
      exames: ['radiografia_torax', 'gasometria', 'hemograma', 'pcr', 'hemocultura', 'glicemia', 'eletrolitos', 'lactato', 'Oximetria de pulso pré-ductal (mão direita) e pós-ductal (pé)', 'Teste do coraçãozinho (oximetria de triagem entre 24 e 48 horas de vida)', 'Ecocardiograma quando suspeita de cardiopatia'],
      criteriosDiagnosticos: [
        'Avaliar frequência respiratória, esforço, saturação pré e pós-ductal, perfusão, temperatura e glicemia em todo RN com desconforto.',
        'Aplicar o boletim de Silverman-Andersen (gemência, batimento de asa nasal, retração xifoide, tiragem intercostal e balanço toracoabdominal) para graduar e acompanhar o esforço respiratório.',
        'Radiografia de tórax quando o desconforto persiste após 2 a 4 horas, é intenso ou há suspeita de pneumotórax, aspiração ou malformação.',
        'Compatível com taquipneia transitória: RN a termo ou próximo do termo, muitas vezes de cesárea eletiva, com taquipneia e melhora em até 72 horas e radiografia com trama vascular aumentada e líquido em cisuras.',
        'Compatível com síndrome do desconforto respiratório: prematuro com piora progressiva e radiografia com infiltrado reticulogranular difuso e broncogramas aéreos.',
        'Compatível com pneumonia ou sepse: fatores de risco maternos, hipotermia ou febre, alteração de hemograma e proteína C reativa, infiltrado radiológico.',
        'Cianose que não melhora com oxigênio a 100% sugere cardiopatia congênita ou hipertensão pulmonar persistente: contatar referência e não retardar a transferência.',
        'Todo desconforto respiratório neonatal com fatores de risco infeccioso deve ter hemocultura coletada e antibiótico empírico iniciado.'
      ],
      classificacaoGravidade: [
        { nivel: 'Leve', criterios: 'Taquipneia isolada (60 a 80 irpm), sem gemência, saturação igual ou maior que 90% em ar ambiente, mamando bem. Observação em unidade com monitorização, controle térmico e reavaliação a cada 1 a 2 horas.' },
        { nivel: 'Moderado', criterios: 'Taquipneia com tiragem e ou gemência, necessidade de oxigênio para manter saturação entre 90% e 95%, dificuldade para mamar. Indicar CPAP nasal quando disponível, jejum com hidratação venosa e avaliação para antibiótico.' },
        { nivel: 'Grave', criterios: 'Esforço respiratório intenso, apneia, cianose apesar de oxigênio, frequência cardíaca menor que 100 bpm, acidose ou exaustão. Suporte ventilatório, acionar referência e transporte em UTI neonatal.' }
      ],
      tratamento: [
        'Manter o RN em ambiente térmico neutro (36,5 a 37,5 °C axilar): berço aquecido, incubadora ou contato pele a pele quando estável.',
        'Posicionar em decúbito dorsal com leve extensão da cabeça; aspirar vias aéreas apenas se houver obstrução visível por secreção.',
        'Oferecer oxigênio umidificado e aquecido para manter saturação entre 90% e 95%; evitar hiperóxia, sobretudo em prematuros.',
        'Indicar CPAP nasal precoce (pressão inicial de 5 a 6 cmH2O) em gemência, tiragem ou necessidade crescente de oxigênio, quando disponível.',
        'Considerar surfactante exógeno intratraqueal nos prematuros com síndrome do desconforto respiratório, em unidade com equipe habilitada; confirmar conforme protocolo e bula.',
        'Manter jejum com hidratação venosa enquanto o desconforto for moderado a grave ou a frequência respiratória maior que 60 a 70 irpm; iniciar leite materno por sonda assim que houver estabilidade.',
        'Controlar glicemia capilar na admissão e a cada 4 a 6 horas enquanto instável; corrigir hipoglicemia.',
        'Coletar hemocultura e iniciar ampicilina associada a gentamicina quando houver fatores de risco infeccioso, início tardio, hipotermia ou febre, ou quadro grave.',
        'Suspeita de pneumotórax hipertensivo com deterioração rápida: considerar punção de alívio no 2º espaço intercostal na linha hemiclavicular por profissional habilitado e providenciar drenagem; confirmar conforme protocolo.',
        'Suspeita de cardiopatia dependente de canal arterial: contatar referência antes de iniciar prostaglandina, que exige monitorização e suporte ventilatório disponível; confirmar conforme protocolo.',
        'Intubação e ventilação mecânica em apneia recorrente, esforço exaustivo, acidose respiratória importante ou falência do CPAP.',
        'Organizar transporte neonatal com aquecimento, oxigênio, acesso venoso, monitorização e glicemia controlada, com contato prévio com a unidade de destino.'
      ],
      medicamentos: [
        { medId: null, nome: 'Oxigenoterapia e CPAP nasal (medidas não medicamentosas)', esquema: 'Oxigênio umidificado e aquecido, titulado para saturação de 90% a 95%. CPAP nasal com pressão inicial de 5 a 6 cmH2O e fração inspirada de oxigênio ajustada pela oximetria. Reavaliar a cada 30 a 60 minutos. Confirmar conforme protocolo do serviço.' },
        { medId: null, nome: 'Surfactante exógeno (poractante alfa ou beractanto)', esquema: 'Síndrome do desconforto respiratório do prematuro: administração intratraqueal precoce por equipe habilitada em unidade neonatal, com dose e repetição conforme a apresentação disponível. Confirmar conforme protocolo e bula.', verificar: true },
        { medId: 'ampicilina', esquema: 'Suspeita de pneumonia ou sepse associada: 50 mg/kg/dose IV, a cada 12 horas até 7 dias de vida e a cada 8 horas após, associada a gentamicina.' },
        { medId: 'gentamicina', esquema: 'Suspeita de pneumonia ou sepse associada: 4 mg/kg/dose IV a cada 24 horas no RN a termo; intervalo de 36 a 48 horas no prematuro. Monitorar função renal.' },
        { medId: 'cefotaxima', esquema: 'Alternativa em suspeita de meningite associada ou de infecção por gram-negativos: 50 mg/kg/dose IV, a cada 12 horas até 7 dias de vida e a cada 8 horas após.' },
        { medId: 'glicose', esquema: 'Hipoglicemia associada: glicose 10% 2 mL/kg IV em bolus lento, seguida de infusão contínua com 5 a 8 mg/kg/min.' },
        { medId: 'soro_fisiologico', esquema: 'Má perfusão ou suspeita de hipovolemia: 10 mL/kg IV em 20 a 30 minutos, com reavaliação após cada alíquota e atenção a sinais de sobrecarga.' },
        { medId: null, nome: 'Cafeína (citrato de cafeína)', esquema: 'Apneia da prematuridade: ataque e manutenção em unidade neonatal conforme protocolo do serviço, com monitorização cardiorrespiratória. Confirmar conforme protocolo e bula.', verificar: true }
      ],
      criteriosInternacao: [
        'Qualquer desconforto respiratório persistente por mais de 2 horas.',
        'Necessidade de oxigênio suplementar para manter saturação entre 90% e 95%.',
        'Gemência, tiragem intensa, apneia ou cianose.',
        'Prematuridade, baixo peso ou fatores de risco infeccioso.',
        'Dificuldade para mamar por cansaço respiratório.',
        'Impossibilidade de observação prolongada ou de retorno rápido em comunidades distantes.'
      ],
      criteriosUTI: [
        'Necessidade de ventilação mecânica ou falência do CPAP nasal.',
        'Apneia recorrente ou necessidade de estímulo repetido.',
        'Cianose que não melhora com oxigênio (suspeita de cardiopatia ou hipertensão pulmonar).',
        'Pneumotórax com repercussão hemodinâmica.',
        'Choque, acidose metabólica persistente ou necessidade de drogas vasoativas.',
        'Necessidade de surfactante exógeno.'
      ],
      criteriosAlta: [
        'Frequência respiratória menor que 60 irpm, sem tiragem ou gemência, por pelo menos 24 horas.',
        'Saturação igual ou maior que 95% em ar ambiente e sem episódios de apneia por 24 a 48 horas.',
        'Sucção eficaz com ganho de peso e sem cansaço às mamadas.',
        'Tratamento antibiótico concluído ou não indicado, com exames de controle adequados.',
        'Responsável orientado sobre sinais de alarme e retorno garantido.'
      ],
      orientacoes: [
        'Contar a respiração do bebê por 1 minuto com ele calmo: acima de 60 respirações por minuto é sinal de alerta.',
        'Procurar atendimento imediatamente se o bebê afundar as costelas, gemer, ficar roxo, parar de respirar, ficar molinho ou cansar ao mamar.',
        'Manter o bebê aquecido, sem excesso de agasalho, e amamentar em pequenas pausas se cansar.',
        'Não fumar dentro de casa e evitar fumaça de fogão a lenha e queimadas próximas ao bebê.',
        'Lavar as mãos e evitar contato com pessoas resfriadas ou com tosse.',
        'Em comunidades distantes, combinar previamente como será o transporte em caso de piora.'
      ],
      retorno: 'Reavaliar em 24 a 48 horas após a alta, com nova consulta em 7 dias. Prematuros e RN que necessitaram de oxigênio devem ter seguimento em ambulatório de acompanhamento neonatal. Retorno imediato diante de qualquer sinal de alarme.',
      prevencao: [
        'Pré-natal adequado, com corticoide antenatal entre 24 e 34 semanas quando há risco de parto prematuro, conforme protocolo obstétrico.',
        'Evitar cesárea eletiva antes de 39 semanas sem indicação médica.',
        'Assistência qualificada ao parto, com equipe treinada em reanimação neonatal e material conferido.',
        'Clampeamento oportuno do cordão e contato pele a pele no RN vigoroso.',
        'Manutenção da normotermia desde a sala de parto (sala aquecida, secagem, touca, contato pele a pele).',
        'Aleitamento materno exclusivo e vacinação em dia (incluindo dTpa na gestante e imunização contra vírus sincicial respiratório conforme disponibilidade no calendário vigente).'
      ],
      fontes: [
        { nome: 'Sociedade Brasileira de Pediatria – Reanimação do recém-nascido maior ou igual a 34 semanas em sala de parto: Diretrizes 2022', ano: 2022 },
        { nome: 'Ministério da Saúde – Atenção à Saúde do Recém-Nascido: Guia para os Profissionais de Saúde', ano: 2014 },
        { nome: 'Nelson Textbook of Pediatrics, 21ª edição', ano: 2020 },
        { nome: 'OMS – Pocket Book of Hospital Care for Children', ano: 2013 }
      ],
      atualizadoEm: '2026-09'
    },

    {
      id: 'hipoglicemia_neonatal',
      nome: 'Hipoglicemia neonatal',
      categoria: 'neonatal',
      amazonia: false,
      cid10: 'P70.4',
      tags: ['hipotonia', 'apatia', 'letargia', 'recusa_alimentar', 'irritabilidade', 'convulsao', 'apneia', 'cianose', 'taquipneia', 'sudorese', 'palidez'],
      definicao: 'Concentração de glicose no sangue insuficiente para as necessidades metabólicas do recém-nascido. Na prática, considera-se hipoglicemia a glicemia menor que 45 mg/dL após as primeiras horas de vida em RN de risco ou sintomático, e utiliza-se o alvo de manter a glicemia acima de 45 a 50 mg/dL nas primeiras 48 horas e acima de 60 mg/dL após esse período. Os limiares variam entre diretrizes e por hora de vida: confirmar conforme protocolo adotado no serviço.',
      epidemiologia: 'A hipoglicemia é o distúrbio metabólico mais frequente do período neonatal e atinge sobretudo prematuros tardios, RN pequenos ou grandes para a idade gestacional, filhos de mãe com diabetes, RN com restrição de crescimento, asfixia perinatal, hipotermia, policitemia ou sepse. No Amazonas, hipotermia no transporte fluvial, jejum prolongado antes da chegada à unidade, dificuldade de amamentação e demora no atendimento em partos domiciliares são causas evitáveis frequentes; a glicemia capilar deve ser medida em todo RN de risco ou com sinais inespecíficos logo na admissão.',
      agente: 'Não se aplica agente infeccioso. Decorre de reservas hepáticas de glicogênio insuficientes, hiperinsulinismo (filho de mãe com diabetes, RN grande para a idade gestacional, hiperinsulinismo congênito), aumento do consumo (asfixia, hipotermia, sepse, desconforto respiratório) ou distúrbios endócrinos e erros inatos do metabolismo.',
      transmissao: 'Não se aplica. Não é doença transmissível; trata-se de distúrbio metabólico da adaptação neonatal.',
      incubacao: 'Não se aplica. Importa a hora de vida: a queda fisiológica da glicemia ocorre entre 1 e 2 horas de vida, com recuperação após as primeiras mamadas. Hipoglicemia persistente após 48 a 72 horas de vida exige investigação de causa endócrina ou metabólica.',
      manifestacoes: [
        'Muitos RN são assintomáticos: a triagem nos grupos de risco é essencial.',
        'Tremores finos, irritabilidade e choro agudo.',
        'Hipotonia, letargia, hipoatividade e sucção débil ou recusa alimentar.',
        'Apneia, respiração irregular, taquipneia ou cianose.',
        'Hipotermia e sudorese.',
        'Convulsão, olhar fixo ou movimentos oculares anormais nos casos graves.',
        'Palidez e má perfusão quando há hipoglicemia associada a sepse ou asfixia.'
      ],
      sinaisAlarme: [
        'Glicemia menor que 25 mg/dL em qualquer momento ou menor que 35 mg/dL nas primeiras 4 horas de vida.',
        'Convulsão, apneia ou rebaixamento do nível de consciência.',
        'Hipoglicemia sintomática de qualquer valor.',
        'Hipoglicemia que não corrige após o bolus e a infusão contínua de glicose.',
        'Necessidade de velocidade de infusão de glicose maior que 10 a 12 mg/kg/min.',
        'Hipoglicemia persistente após 72 horas de vida ou recorrente após alimentação adequada.'
      ],
      diagnosticoDiferencial: ['sepse_neonatal', 'meningite', 'ictericia_neonatal', 'Asfixia perinatal e encefalopatia hipóxico-isquêmica', 'Hipotermia', 'Policitemia', 'Erro inato do metabolismo', 'Insuficiência adrenal congênita', 'Hiperinsulinismo congênito', 'Hipopituitarismo congênito', 'Convulsão neonatal de outras causas (hipocalcemia, hipomagnesemia)'],
      exames: ['glicemia', 'eletrolitos', 'calcio', 'magnesio', 'gasometria', 'hemograma', 'pcr', 'hemocultura', 'bilirrubinas', 'Glicemia capilar seriada com confirmação laboratorial (glicemia plasmática)', 'Amostra crítica na hipoglicemia persistente (insulina, cortisol, hormônio de crescimento, cetonas, lactato e ácidos graxos livres colhidos no momento da hipoglicemia)'],
      criteriosDiagnosticos: [
        'Medir glicemia capilar em todo RN sintomático e nos grupos de risco: prematuro, pequeno ou grande para a idade gestacional, filho de mãe com diabetes, asfixia, hipotermia, sepse e dificuldade de amamentação.',
        'Triagem nos RN de risco: primeira medida entre 30 minutos e 2 horas de vida (antes da segunda mamada) e repetição antes das mamadas nas primeiras 24 a 48 horas, conforme protocolo do serviço.',
        'Glicemia capilar é método de triagem: confirmar com glicemia plasmática sempre que possível, sem atrasar o tratamento.',
        'Compatível com hipoglicemia neonatal: glicemia abaixo do limiar do protocolo (habitualmente menor que 45 mg/dL) associada ou não a sinais clínicos, com resposta à oferta de glicose.',
        'Hipoglicemia persistente (mais de 48 a 72 horas) ou com necessidade de velocidade de infusão de glicose elevada: colher amostra crítica no momento da hipoglicemia e encaminhar para investigação endocrinológica e metabólica.',
        'Investigar sempre causas associadas: sepse, asfixia, hipotermia, policitemia e erro inato do metabolismo.'
      ],
      classificacaoGravidade: [
        { nivel: 'Assintomática leve', criterios: 'Glicemia entre 35 e 45 mg/dL em RN assintomático e com sucção preservada. Oferecer leite materno imediatamente (ou leite ordenhado por copo ou sonda) e repetir a glicemia em 30 a 60 minutos.' },
        { nivel: 'Assintomática moderada ou refratária à alimentação', criterios: 'Glicemia menor que 35 mg/dL, ou que não sobe acima de 45 mg/dL após a mamada. Iniciar acesso venoso, bolus de glicose e infusão contínua, com controle em 30 minutos.' },
        { nivel: 'Sintomática ou grave', criterios: 'Qualquer glicemia com sintomas (letargia, tremores, apneia, convulsão) ou glicemia menor que 25 mg/dL. Tratamento intravenoso imediato, internação e investigação de causas associadas.' },
        { nivel: 'Persistente ou refratária', criterios: 'Necessidade de velocidade de infusão de glicose maior que 10 a 12 mg/kg/min ou hipoglicemia além de 72 horas de vida. Encaminhar à referência para investigação de hiperinsulinismo e distúrbios endócrinos ou metabólicos.' }
      ],
      tratamento: [
        'Confirmar a glicemia e avaliar simultaneamente temperatura, perfusão, esforço respiratório e nível de consciência.',
        'RN assintomático com glicemia entre 35 e 45 mg/dL: oferecer o seio materno imediatamente ou leite materno ordenhado por copo ou sonda, manter aquecido e repetir a glicemia em 30 a 60 minutos.',
        'RN sintomático ou com glicemia menor que 35 mg/dL: obter acesso venoso e administrar glicose 10% 2 mL/kg IV em bolus lento (2 a 3 minutos), seguido imediatamente de infusão contínua.',
        'Infusão contínua inicial com velocidade de infusão de glicose de 5 a 8 mg/kg/min, ajustada conforme glicemias seriadas; calcular a velocidade pelo produto da concentração da solução, do volume infundido e do peso.',
        'Não usar glicose a 25% ou a 50% no recém-nascido pelo risco de hiperosmolaridade e de hipoglicemia de rebote; usar glicose a 10%.',
        'Repetir a glicemia 30 minutos após o bolus e depois a cada 1 hora até dois valores acima de 50 mg/dL, passando então para controles a cada 4 a 6 horas.',
        'Manter a alimentação enteral com leite materno sempre que possível, associada à infusão venosa, e reduzir a infusão progressivamente conforme a glicemia se estabiliza.',
        'Hipoglicemia refratária com necessidade de velocidade de infusão maior que 10 a 12 mg/kg/min: considerar acesso venoso central para soluções mais concentradas e discutir com a referência o uso de glucagon ou de outras terapias; confirmar conforme protocolo.',
        'Tratar simultaneamente as causas associadas: aquecer o RN hipotérmico, iniciar antibiótico se suspeita de sepse, corrigir hipocalcemia e hipomagnesemia quando presentes.',
        'Convulsão associada: corrigir a glicemia primeiro e, se persistir, considerar fenobarbital conforme protocolo.',
        'Antes do transporte, garantir glicemia acima de 50 mg/dL, acesso venoso seguro com solução glicosada em curso e manutenção da normotermia.'
      ],
      medicamentos: [
        { medId: 'glicose', esquema: 'Hipoglicemia sintomática ou glicemia menor que 35 mg/dL: glicose 10% 2 mL/kg IV em bolus lento, seguida de infusão contínua com velocidade inicial de 5 a 8 mg/kg/min, ajustada por glicemias seriadas. Não usar concentrações maiores que 10% em veia periférica no recém-nascido. Confirmar conforme protocolo.' },
        { medId: null, nome: 'Leite materno ou leite materno ordenhado (medida terapêutica de primeira linha no assintomático)', esquema: 'Hipoglicemia assintomática leve: oferecer o seio materno imediatamente ou leite ordenhado por copo ou sonda, com reavaliação da glicemia em 30 a 60 minutos. Manter contato pele a pele e normotermia.' },
        { medId: null, nome: 'Gel de dextrose oral a 40%', esquema: 'Hipoglicemia assintomática em RN com sucção preservada, onde disponível e previsto em protocolo: 0,5 mL/kg aplicado na mucosa oral, associado à amamentação, com nova glicemia em 30 minutos. Confirmar conforme protocolo do serviço.', verificar: true },
        { medId: null, nome: 'Glucagon', esquema: 'Hipoglicemia refratária com acesso venoso difícil ou suspeita de hiperinsulinismo, em unidade de referência: dose conforme protocolo e bula, com monitorização contínua da glicemia. Confirmar conforme protocolo.', verificar: true },
        { medId: 'fenobarbital', esquema: 'Convulsão neonatal que persiste após a correção da glicemia: ataque de 20 mg/kg IV lento, podendo repetir 10 mg/kg até 40 mg/kg no total; manutenção de 3 a 5 mg/kg/dia. Monitorar depressão respiratória.' },
        { medId: 'ampicilina', esquema: 'Hipoglicemia com suspeita de sepse: 50 mg/kg/dose IV, a cada 12 horas até 7 dias de vida e a cada 8 horas após, associada a gentamicina, após coleta de culturas.' },
        { medId: 'gentamicina', esquema: 'Hipoglicemia com suspeita de sepse: 4 mg/kg/dose IV a cada 24 horas no RN a termo; intervalo maior no prematuro. Monitorar função renal.' }
      ],
      criteriosInternacao: [
        'Hipoglicemia sintomática de qualquer valor.',
        'Glicemia menor que 35 mg/dL ou que não corrige após a alimentação.',
        'Necessidade de glicose intravenosa.',
        'Hipoglicemia recorrente em RN de risco.',
        'Causa associada que exige tratamento hospitalar (sepse, asfixia, prematuridade, hipotermia grave).',
        'Dificuldade de amamentação com impossibilidade de controle glicêmico ambulatorial.'
      ],
      criteriosUTI: [
        'Convulsão, apneia ou rebaixamento do nível de consciência associados.',
        'Hipoglicemia refratária com necessidade de velocidade de infusão de glicose maior que 10 a 12 mg/kg/min ou de acesso venoso central.',
        'Instabilidade hemodinâmica ou respiratória associada.',
        'Suspeita de erro inato do metabolismo com acidose ou hiperamonemia.',
        'Asfixia perinatal grave com encefalopatia.'
      ],
      criteriosAlta: [
        'Glicemias pré-mamada estáveis acima de 50 a 60 mg/dL por pelo menos 24 horas sem infusão venosa.',
        'Alimentação enteral plena, com sucção eficaz e ganho de peso.',
        'Causa de base tratada ou em seguimento definido.',
        'Ausência de sinais neurológicos ou de sintomas atribuíveis à hipoglicemia.',
        'Responsável orientado sobre a importância das mamadas frequentes e dos sinais de alarme.'
      ],
      orientacoes: [
        'Amamentar com frequência, de 8 a 12 vezes por dia, sem deixar o bebê passar longos períodos sem mamar, inclusive à noite.',
        'Manter o bebê aquecido e em contato pele a pele: o frio consome o açúcar do sangue.',
        'Procurar atendimento imediatamente se o bebê ficar molinho, muito sonolento, tremer, suar, parar de mamar, ficar roxo ou tiver convulsão.',
        'Não oferecer água com açúcar, mel ou chá: não corrigem a hipoglicemia de forma segura e podem ser perigosos.',
        'Observar o número de fraldas molhadas por dia e o ganho de peso nas consultas.',
        'Comparecer às consultas de acompanhamento com a caderneta da criança.'
      ],
      retorno: 'Reavaliar em 24 a 48 horas após a alta, com pesagem e avaliação da amamentação, e novamente em 7 dias. RN com hipoglicemia persistente ou grave devem ter seguimento em ambulatório especializado e avaliação do desenvolvimento neurológico. Retorno imediato diante de qualquer sinal de alarme.',
      prevencao: [
        'Amamentação na primeira hora de vida e em livre demanda, com apoio à pega.',
        'Manutenção da normotermia desde a sala de parto: secagem, touca, contato pele a pele e sala aquecida.',
        'Triagem de glicemia capilar nos RN de risco conforme protocolo do serviço.',
        'Controle do diabetes na gestação e acompanhamento pré-natal adequado.',
        'Evitar jejum prolongado em RN de risco antes ou durante o transporte para a referência.',
        'Orientar famílias em comunidades distantes sobre mamadas frequentes e aquecimento durante o deslocamento fluvial.'
      ],
      fontes: [
        { nome: 'Sociedade Brasileira de Pediatria – Documento científico sobre hipoglicemia neonatal', ano: 2021 },
        { nome: 'Ministério da Saúde – Atenção à Saúde do Recém-Nascido: Guia para os Profissionais de Saúde', ano: 2014 },
        { nome: 'Nelson Textbook of Pediatrics, 21ª edição', ano: 2020 },
        { nome: 'OMS – Pocket Book of Hospital Care for Children', ano: 2013 }
      ],
      atualizadoEm: '2026-09'
    },

    {
      id: 'sifilis_congenita',
      nome: 'Sífilis congênita',
      categoria: 'neonatal',
      amazonia: true,
      cid10: 'A50',
      tags: ['ictericia', 'palidez', 'hepatomegalia', 'esplenomegalia', 'lesoes_pele', 'coriza', 'febre', 'recusa_alimentar', 'irritabilidade', 'distensao_abdominal', 'hipotonia', 'sangramento'],
      definicao: 'Infecção do feto ou do recém-nascido pelo Treponema pallidum transmitido por via transplacentária a partir de gestante com sífilis não tratada ou tratada de forma não adequada. Pode ser assintomática ao nascimento em mais da metade dos casos, o que torna obrigatória a investigação de todo RN de mãe com sífilis. É classificada em precoce (manifestações até 2 anos) e tardia (após 2 anos).',
      epidemiologia: 'A sífilis congênita é agravo de notificação compulsória e permanece em patamar elevado no Brasil, sendo indicador direto da qualidade do pré-natal. No Amazonas, o pré-natal incompleto ou iniciado tardiamente, a dificuldade de acesso ao teste rápido e à penicilina benzatina em comunidades ribeirinhas e indígenas, o parto domiciliar e a falta de tratamento da parceria sexual sustentam a transmissão. Em RN de comunidades distantes, colher testagem na chegada ao serviço e não perder a oportunidade de tratamento, pois o retorno pode ser inviável.',
      agente: 'Treponema pallidum subespécie pallidum, bactéria espiroqueta.',
      transmissao: 'Transmissão vertical transplacentária, possível em qualquer fase da gestação e em qualquer estágio da sífilis materna, com maior risco nas fases primária e secundária (até 80% de transmissão). Também pode ocorrer por contato direto com lesão genital materna no momento do parto. Não há transmissão pelo leite materno, exceto se houver lesão sifilítica na mama.',
      incubacao: 'Não se aplica no sentido clássico, pois a infecção é adquirida na vida intrauterina. Na prática, as manifestações da sífilis congênita precoce surgem desde o nascimento até os 2 anos de idade, com a maioria nos primeiros 3 meses de vida; as tardias aparecem após os 2 anos.',
      manifestacoes: [
        'Mais da metade dos RN infectados é assintomática ao nascimento.',
        'Prematuridade, baixo peso ao nascer ou restrição de crescimento intrauterino.',
        'Hepatomegalia e esplenomegalia.',
        'Icterícia com elevação de bilirrubina direta e alteração de transaminases.',
        'Rinite serossanguinolenta persistente (coriza sifilítica), muito sugestiva.',
        'Lesões cutâneas: pênfigo palmoplantar (vesicobolhoso), exantema maculopapular, condiloma plano e fissuras periorais.',
        'Anemia, plaquetopenia e leucocitose ou leucopenia.',
        'Lesões ósseas: periostite, osteocondrite e pseudoparalisia de Parrot (dor à mobilização de um membro).',
        'Linfadenopatia generalizada.',
        'Hidropsia fetal, edema e ascite nos casos graves.',
        'Alterações neurológicas: irritabilidade, abaulamento de fontanela ou convulsão na neurossífilis.',
        'Manifestações tardias: dentes de Hutchinson, tíbia em sabre, nariz em sela, ceratite intersticial, surdez e alterações do desenvolvimento.'
      ],
      sinaisAlarme: [
        'Hidropsia, edema generalizado ou ascite ao nascimento.',
        'Desconforto respiratório com pneumonia alba.',
        'Sangramento, petéquias ou plaquetopenia grave.',
        'Icterícia com bilirrubina direta elevada e hepatoesplenomegalia importante.',
        'Convulsão, abaulamento de fontanela ou alteração do nível de consciência (neurossífilis).',
        'Pseudoparalisia de um membro (lesão óssea).',
        'Anemia grave com repercussão hemodinâmica.',
        'RN de mãe com sífilis não tratada ou tratada inadequadamente, mesmo assintomático.'
      ],
      diagnosticoDiferencial: ['sepse_neonatal', 'ictericia_neonatal', 'malaria', 'Infecções congênitas do grupo TORCH (toxoplasmose, rubéola, citomegalovírus, herpes)', 'Infecção congênita por HIV', 'Doença hemolítica por incompatibilidade ABO ou Rh', 'Hepatite neonatal e colestase', 'Doenças hematológicas do recém-nascido', 'Escabiose e impetigo bolhoso neonatal', 'Osteomielite neonatal'],
      exames: ['hemograma', 'liquor', 'bilirrubinas', 'ast', 'alt', 'pcr', 'radiografia_torax', 'VDRL ou RPR do sangue periférico do RN (não usar sangue de cordão)', 'VDRL ou RPR do líquor com celularidade e proteinorraquia', 'Teste treponêmico (a partir de 18 meses para confirmação)', 'Radiografia de ossos longos', 'Avaliação oftalmológica', 'Triagem auditiva neonatal'],
      criteriosDiagnosticos: [
        'Toda gestante deve ter testagem para sífilis no primeiro e no terceiro trimestres e no momento do parto; nenhum RN deve receber alta sem o resultado materno.',
        'Considerar tratamento materno adequado quando realizado com penicilina benzatina, no esquema correto para o estágio, iniciado até 30 dias antes do parto, com queda do título não treponêmico e com tratamento da parceria sexual; qualquer condição não atendida caracteriza tratamento inadequado.',
        'Colher VDRL ou RPR do sangue periférico do recém-nascido (nunca do cordão umbilical) e comparar com o título materno colhido no mesmo momento.',
        'Compatível com sífilis congênita: título não treponêmico do RN maior que o materno em pelo menos duas diluições (quatro vezes), ou qualquer titulação com manifestações clínicas, radiológicas ou laboratoriais compatíveis, ou RN de mãe com tratamento inadequado.',
        'Compatível com neurossífilis: VDRL reagente no líquor, ou celularidade maior que 25 células por mm3, ou proteinorraquia maior que 150 mg/dL no RN a termo. Confirmar os valores de referência conforme protocolo adotado.',
        'Investigação mínima nos casos suspeitos: VDRL periférico, hemograma, líquor (celularidade, proteínas e VDRL), radiografia de ossos longos, transaminases e bilirrubinas, avaliação oftalmológica e triagem auditiva.',
        'VDRL não reagente no RN não exclui sífilis congênita, sobretudo em infecção materna recente: valorizar o tratamento materno e a clínica.',
        'Notificação compulsória obrigatória de sífilis congênita e de sífilis em gestante.'
      ],
      classificacaoGravidade: [
        { nivel: 'RN de mãe adequadamente tratada, assintomático e com VDRL não reagente ou com título igual ou menor que o materno', criterios: 'Não indicar tratamento de rotina; manter seguimento sorológico aos 1, 3, 6, 12 e 18 meses. Se o seguimento não puder ser garantido (comunidade distante, transporte fluvial), considerar tratamento conforme protocolo antes da alta.' },
        { nivel: 'Sífilis congênita sem alterações de líquor', criterios: 'RN com clínica compatível, alterações laboratoriais ou radiológicas, ou título não treponêmico maior que o materno em duas diluições, com líquor normal. Tratar por 10 dias com penicilina, preferencialmente cristalina, e manter seguimento.' },
        { nivel: 'Neurossífilis', criterios: 'Alteração do líquor (VDRL reagente, celularidade ou proteinorraquia elevadas). Tratar obrigatoriamente com penicilina cristalina intravenosa por 10 dias, com internação, e repetir o líquor no seguimento conforme protocolo.' },
        { nivel: 'Sífilis congênita grave', criterios: 'Hidropsia, pneumonia alba, insuficiência respiratória, anemia grave, plaquetopenia com sangramento, insuficiência hepática ou comprometimento neurológico. Internação em unidade com suporte e tratamento imediato.' }
      ],
      tratamento: [
        'Iniciar o tratamento assim que houver indicação, sem aguardar todos os resultados quando o RN estiver sintomático ou a mãe tiver tratamento inadequado.',
        'RN com sífilis congênita e líquor normal: penicilina cristalina intravenosa 50.000 UI/kg/dose, a cada 12 horas nos primeiros 7 dias de vida e a cada 8 horas após, por 10 dias. Alternativa quando o líquor é normal e o seguimento é garantido: penicilina procaína 50.000 UI/kg/dose intramuscular uma vez ao dia por 10 dias.',
        'RN com neurossífilis: penicilina cristalina intravenosa por 10 dias, no mesmo esquema de doses, sem alternativa intramuscular.',
        'Se houver interrupção do tratamento por mais de 24 horas, reiniciar todo o esquema.',
        'RN assintomático, de mãe adequadamente tratada, com VDRL não reagente ou título menor ou igual ao materno: não tratar de rotina e garantir seguimento sorológico; quando o seguimento for inviável, considerar penicilina benzatina 50.000 UI/kg em dose única intramuscular conforme protocolo.',
        'Realizar sempre a investigação completa antes de definir o esquema, incluindo punção lombar, quando indicada.',
        'Tratar simultaneamente as complicações: fototerapia na hiperbilirrubinemia, transfusão em anemia grave sintomática, suporte respiratório na pneumonia alba.',
        'Manter o aleitamento materno, que não está contraindicado, exceto se houver lesão sifilítica ativa na mama.',
        'Notificar o caso e garantir o tratamento da mãe e da parceria sexual, com testagem para HIV e outras infecções sexualmente transmissíveis.',
        'Programar o seguimento sorológico com VDRL aos 1, 3, 6, 12 e 18 meses, suspendendo após dois resultados consecutivos não reagentes, além de avaliação neurológica, oftalmológica e auditiva.'
      ],
      medicamentos: [
        { medId: 'penicilina_cristalina', esquema: 'Sífilis congênita, com ou sem neurossífilis: 50.000 UI/kg/dose IV. Nos primeiros 7 dias de vida, a cada 12 horas; a partir do 8º dia, a cada 8 horas. Duração de 10 dias. Reiniciar o esquema se houver interrupção maior que 24 horas.' },
        { medId: null, nome: 'Penicilina G procaína', esquema: 'Sífilis congênita com líquor normal e seguimento garantido: 50.000 UI/kg/dose IM, uma vez ao dia, por 10 dias. Não usar em neurossífilis. Confirmar conforme protocolo.' },
        { medId: 'penicilina_benzatina', esquema: 'RN assintomático, de mãe adequadamente tratada, com investigação normal e risco de perda de seguimento: 50.000 UI/kg IM em dose única, conforme protocolo. Não é tratamento de sífilis congênita confirmada nem de neurossífilis.' },
        { medId: null, nome: 'Fototerapia (medida terapêutica não medicamentosa)', esquema: 'Hiperbilirrubinemia associada: indicar conforme os limiares por hora de vida e grupo de risco, com atenção à fração direta, que não responde à fototerapia e exige investigação de colestase.' },
        { medId: 'ampicilina', esquema: 'Quando houver suspeita concomitante de sepse bacteriana: 50 mg/kg/dose IV, a cada 12 horas até 7 dias de vida e a cada 8 horas após, associada a gentamicina, sem substituir a penicilina cristalina da sífilis.' },
        { medId: 'gentamicina', esquema: 'Quando houver suspeita concomitante de sepse bacteriana: 4 mg/kg/dose IV a cada 24 horas no RN a termo; intervalo maior no prematuro.' },
        { medId: 'sulfato_ferroso', esquema: 'Prevenção de anemia no seguimento, conforme a rotina de suplementação: iniciar aos 30 dias de vida no prematuro e no baixo peso (2 a 4 mg/kg/dia de ferro elementar) e a partir dos 3 meses no RN a termo (1 mg/kg/dia), conforme protocolo vigente.' }
      ],
      criteriosInternacao: [
        'Todo RN com indicação de penicilina cristalina intravenosa por 10 dias.',
        'RN sintomático ou com alterações laboratoriais, radiológicas ou liquóricas.',
        'Neurossífilis confirmada ou suspeita.',
        'Prematuridade, baixo peso ou comorbidades associadas.',
        'Impossibilidade de garantir a aplicação diária da penicilina procaína e o seguimento ambulatorial.'
      ],
      criteriosUTI: [
        'Hidropsia fetal, insuficiência respiratória ou pneumonia alba com necessidade de suporte ventilatório.',
        'Choque ou instabilidade hemodinâmica.',
        'Anemia grave com repercussão hemodinâmica ou necessidade de transfusão de grande volume.',
        'Plaquetopenia grave com sangramento ativo.',
        'Convulsões de difícil controle ou comprometimento neurológico grave.',
        'Insuficiência hepática.'
      ],
      criteriosAlta: [
        'Esquema antibiótico de 10 dias concluído sem interrupções maiores que 24 horas.',
        'RN estável, com sucção eficaz e ganho de peso.',
        'Exames de controle e avaliações oftalmológica e auditiva realizadas ou agendadas.',
        'Caso notificado, mãe e parceria sexual tratados ou encaminhados para tratamento.',
        'Seguimento sorológico agendado (1, 3, 6, 12 e 18 meses) e responsável orientado, com transporte de retorno viável.'
      ],
      orientacoes: [
        'Comparecer a todas as consultas e coletas de sangue do acompanhamento, mesmo que o bebê esteja bem: o exame precisa ser repetido até negativar.',
        'A mãe e a parceria sexual precisam completar o tratamento com penicilina para evitar nova infecção e novos casos.',
        'Manter o aleitamento materno, que não transmite a sífilis, salvo se houver ferida na mama.',
        'Procurar atendimento se o bebê apresentar feridas na pele, bolhas nas mãos e nos pés, nariz escorrendo com sangue, barriga aumentada, cor amarelada, dor ao mexer o braço ou a perna, ou parar de mamar.',
        'Levar sempre a caderneta da criança e os resultados de exames.',
        'Em comunidades distantes, combinar previamente as datas das coletas com a equipe de saúde da família ou com o agente comunitário.'
      ],
      retorno: 'Seguimento ambulatorial com VDRL aos 1, 3, 6, 12 e 18 meses de vida, com alta sorológica após dois resultados consecutivos não reagentes. Na neurossífilis, repetir o líquor conforme protocolo, habitualmente a cada 6 meses até a normalização. Avaliação neurológica, oftalmológica e auditiva no seguimento. Retorno imediato diante de sinais de alarme.',
      prevencao: [
        'Pré-natal com testagem para sífilis no primeiro e no terceiro trimestres e no momento do parto ou em caso de abortamento.',
        'Tratamento imediato da gestante com penicilina benzatina conforme o estágio da sífilis, iniciado o mais cedo possível e concluído até 30 dias antes do parto.',
        'Tratamento simultâneo da parceria sexual, condição essencial para evitar a reinfecção.',
        'Disponibilidade de teste rápido e de penicilina benzatina na atenção básica, inclusive em unidades fluviais e em equipes de saúde indígena.',
        'Testagem de toda puérpera cujo resultado do pré-natal seja desconhecido, antes da alta da maternidade.',
        'Uso de preservativo durante a gestação e educação em saúde sexual.',
        'Busca ativa de gestantes faltosas por agentes comunitários de saúde em comunidades ribeirinhas e indígenas.'
      ],
      fontes: [
        { nome: 'Ministério da Saúde – Protocolo Clínico e Diretrizes Terapêuticas para Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis (PCDT IST)', ano: 2022 },
        { nome: 'Ministério da Saúde – Guia de Vigilância em Saúde', ano: 2024 },
        { nome: 'Sociedade Brasileira de Pediatria – Documento científico sobre sífilis congênita', ano: 2021 },
        { nome: 'Nelson Textbook of Pediatrics, 21ª edição', ano: 2020 }
      ],
      atualizadoEm: '2026-09'
    },

    {
      id: 'reanimacao_neonatal_dx',
      nome: 'Asfixia perinatal e necessidade de reanimação neonatal',
      categoria: 'neonatal',
      amazonia: false,
      cid10: 'P21',
      tags: ['apneia', 'cianose', 'hipotonia', 'gemencia', 'taquipneia', 'tiragem', 'palidez', 'convulsao', 'letargia', 'apatia', 'recusa_alimentar'],
      definicao: 'Situação em que o recém-nascido não inicia ou não mantém respiração efetiva ao nascimento, com frequência cardíaca menor que 100 bpm, apneia ou respiração irregular (gasping) e hipotonia, exigindo manobras de reanimação em sala de parto. A asfixia perinatal é a agressão hipóxico-isquêmica que pode levar à encefalopatia hipóxico-isquêmica e à disfunção de múltiplos órgãos.',
      epidemiologia: 'Cerca de 10% dos recém-nascidos necessitam de alguma ajuda para iniciar a respiração ao nascer e aproximadamente 1% necessita de manobras avançadas. A asfixia perinatal é uma das principais causas de mortalidade neonatal e de sequelas neurológicas no Brasil. No Amazonas, partos domiciliares e em comunidades ribeirinhas ou indígenas, muitas vezes sem profissional treinado e sem material de reanimação, e o deslocamento fluvial prolongado até a maternidade aumentam o risco; toda unidade que assiste partos, mesmo fluvial ou de pequeno porte, deve ter material de reanimação conferido e profissional treinado presente.',
      agente: 'Não se aplica agente infeccioso. As causas incluem sofrimento fetal agudo, descolamento prematuro de placenta, prolapso e circular de cordão, trabalho de parto prolongado ou obstruído, prematuridade, anestesia e medicamentos maternos, líquido meconial, infecção intraútero e malformações.',
      transmissao: 'Não se aplica. Não é doença transmissível; trata-se de evento hipóxico-isquêmico perinatal.',
      incubacao: 'Não se aplica. A decisão é imediata, nos primeiros 60 segundos de vida (o chamado Minuto de Ouro). As manifestações da encefalopatia hipóxico-isquêmica surgem nas primeiras 6 a 24 horas de vida e a indicação de hipotermia terapêutica, quando aplicável, ocorre até 6 horas de vida.',
      manifestacoes: [
        'Ausência de respiração ou respiração irregular (gasping) ao nascimento.',
        'Frequência cardíaca menor que 100 bpm.',
        'Hipotonia e ausência de tônus em flexão.',
        'Cianose central persistente após o nascimento.',
        'Apgar baixo no 1º e no 5º minutos, usado para registro e acompanhamento, e nunca para decidir o início da reanimação.',
        'Encefalopatia hipóxico-isquêmica: alteração do nível de consciência, alteração do tônus, sucção débil, reflexos primitivos deprimidos e convulsões nas primeiras 24 horas.',
        'Disfunção de outros órgãos: oligúria, insuficiência renal, alteração de transaminases, disfunção miocárdica, hipoglicemia e coagulopatia.',
        'Aspiração meconial com desconforto respiratório importante quando houve líquido meconial.'
      ],
      sinaisAlarme: [
        'Frequência cardíaca menor que 100 bpm após 30 segundos de ventilação com pressão positiva efetiva.',
        'Frequência cardíaca menor que 60 bpm, que indica massagem cardíaca associada à ventilação.',
        'Ausência de elevação do tórax durante a ventilação (ventilação inefetiva).',
        'Palidez acentuada, pulsos finos ou sinais de hipovolemia.',
        'Convulsão nas primeiras horas de vida.',
        'Apgar menor que 5 no 5º minuto ou necessidade prolongada de reanimação.',
        'Acidose metabólica grave em gasometria de cordão ou das primeiras horas.',
        'Hipotonia persistente, sucção ausente ou alteração do nível de consciência após a estabilização.'
      ],
      diagnosticoDiferencial: ['desconforto_respiratorio_rn', 'sepse_neonatal', 'hipoglicemia_neonatal', 'Depressão respiratória por medicamentos maternos (opioides, anestésicos)', 'Prematuridade extrema', 'Malformação de via aérea (atresia de coanas, sequência de Pierre Robin)', 'Hérnia diafragmática congênita', 'Pneumotórax', 'Cardiopatia congênita grave', 'Anemia fetal e hemorragia feto-materna', 'Doença neuromuscular congênita'],
      exames: ['gasometria', 'glicemia', 'eletrolitos', 'calcio', 'hemograma', 'lactato', 'ureia', 'creatinina', 'ast', 'alt', 'coagulograma', 'radiografia_torax', 'Gasometria de cordão umbilical (artéria e veia) quando disponível', 'Ultrassonografia transfontanelar e ressonância magnética no seguimento da encefalopatia', 'Eletroencefalograma ou monitorização de amplitude integrada quando disponível'],
      criteriosDiagnosticos: [
        'As três perguntas iniciais ao nascimento definem a conduta: gestação a termo, o RN está respirando ou chorando e o tônus está em flexão.',
        'Resposta afirmativa às três perguntas: RN vigoroso, indicar clampeamento oportuno do cordão e contato pele a pele com a mãe, com avaliação continuada.',
        'Resposta negativa a qualquer pergunta: levar à mesa de reanimação e iniciar os passos iniciais.',
        'A decisão de ventilar baseia-se na respiração e na frequência cardíaca, avaliadas em até 30 segundos, e não no escore de Apgar.',
        'Compatível com asfixia perinatal: combinação de acidose metabólica em sangue de cordão, Apgar baixo mantido no 5º minuto, necessidade de reanimação avançada e disfunção de órgãos, com manifestações neurológicas precoces.',
        'Compatível com encefalopatia hipóxico-isquêmica: alteração do nível de consciência, do tônus e dos reflexos nas primeiras 24 horas em RN com evento perinatal compatível; graduar conforme a classificação adotada no serviço.',
        'RN com 35 semanas ou mais e encefalopatia moderada a grave: avaliar indicação de hipotermia terapêutica, que deve ser iniciada até 6 horas de vida em serviço habilitado; contatar a referência imediatamente.'
      ],
      classificacaoGravidade: [
        { nivel: 'RN vigoroso', criterios: 'Termo, respirando ou chorando e com tônus em flexão. Clampeamento do cordão entre 1 e 3 minutos, contato pele a pele, secagem, manutenção da temperatura e amamentação na primeira hora.' },
        { nivel: 'Necessidade de passos iniciais', criterios: 'Respiração ausente ou irregular, hipotonia ou prematuridade. Prover calor, posicionar a cabeça, aspirar vias aéreas apenas se necessário, secar e reavaliar respiração e frequência cardíaca em 30 segundos.' },
        { nivel: 'Necessidade de ventilação com pressão positiva', criterios: 'Apneia, respiração irregular ou frequência cardíaca menor que 100 bpm. Iniciar ventilação nos primeiros 60 segundos de vida, com 40 a 60 movimentos por minuto, monitorizando oximetria e frequência cardíaca.' },
        { nivel: 'Reanimação avançada', criterios: 'Frequência cardíaca menor que 60 bpm apesar de ventilação adequada, preferencialmente por cânula traqueal e com oxigênio a 100%. Indicar massagem cardíaca coordenada 3:1 e, se persistir, adrenalina e expansão volêmica.' },
        { nivel: 'Encefalopatia hipóxico-isquêmica', criterios: 'Alteração de consciência, tônus, reflexos e ou convulsões após reanimação. Internação, suporte, controle de glicemia e temperatura e avaliação de hipotermia terapêutica até 6 horas de vida em serviço habilitado.' }
      ],
      tratamento: [
        'Antes de cada parto, conferir material de reanimação, fonte de calor, oxigênio, aspirador, balão autoinflável com máscaras de tamanhos adequados, laringoscópio, cânulas traqueais, oxímetro e monitor cardíaco.',
        'RN vigoroso: clampear o cordão entre 1 e 3 minutos, secar, colocar em contato pele a pele com a mãe, manter a temperatura e estimular a amamentação na primeira hora.',
        'RN não vigoroso: levar à mesa de reanimação sob calor radiante, posicionar a cabeça em leve extensão, aspirar boca e narinas apenas se houver obstrução, secar e retirar campos úmidos, em até 30 segundos.',
        'Manter a temperatura axilar entre 36,5 e 37,5 °C; em prematuros com menos de 34 semanas, usar saco plástico e touca desde o nascimento.',
        'Avaliar respiração e frequência cardíaca: apneia, respiração irregular ou frequência cardíaca menor que 100 bpm indicam ventilação com pressão positiva iniciada no primeiro minuto de vida.',
        'Ventilar com 40 a 60 movimentos por minuto, com ar ambiente (oxigênio a 21%) nos RN com 34 semanas ou mais e com concentração inicial de 30% nos menores de 34 semanas, ajustando pela oximetria de pulso na mão direita.',
        'Instalar oxímetro de pulso no membro superior direito e monitor cardíaco de três eletrodos assim que a ventilação for iniciada.',
        'Se a frequência cardíaca não melhorar, checar a técnica da ventilação (ajuste da máscara, permeabilidade das vias aéreas, pressão e frequência) antes de avançar; considerar intubação traqueal quando a ventilação com máscara é inefetiva ou prolongada.',
        'Frequência cardíaca menor que 60 bpm após 30 segundos de ventilação adequada por cânula traqueal com oxigênio a 100%: iniciar massagem cardíaca com a técnica dos dois polegares, coordenada com a ventilação na relação 3:1, totalizando 120 eventos por minuto (90 compressões e 30 ventilações).',
        'Frequência cardíaca menor que 60 bpm após 60 segundos de massagem coordenada com ventilação: administrar adrenalina, preferencialmente pela veia umbilical, e repetir a cada 3 a 5 minutos se necessário.',
        'Suspeita de hipovolemia (palidez, pulsos finos, perda sanguínea, má resposta à reanimação): expandir com soro fisiológico 0,9% 10 mL/kg por via venosa em 5 a 10 minutos, podendo repetir.',
        'Após a estabilização, controlar glicemia, temperatura, oximetria e perfusão; evitar hipertermia, que agrava a lesão neurológica.',
        'Avaliar precocemente a indicação de hipotermia terapêutica nos RN com 35 semanas ou mais e encefalopatia moderada a grave, com contato com a referência até 6 horas de vida; enquanto isso, evitar aquecimento ativo excessivo e não iniciar resfriamento sem orientação do serviço de referência. Confirmar conforme protocolo.',
        'Tratar convulsões com fenobarbital e corrigir hipoglicemia e distúrbios eletrolíticos.',
        'Registrar detalhadamente as manobras, os horários, o Apgar no 1º, 5º e 10º minutos e a evolução.'
      ],
      medicamentos: [
        { medId: 'adrenalina', esquema: 'Reanimação neonatal com frequência cardíaca menor que 60 bpm apesar de ventilação adequada por cânula traqueal e massagem cardíaca: 0,01 a 0,03 mg/kg por via intravenosa (veia umbilical), o que corresponde a 0,1 a 0,3 mL/kg da solução 1:10.000 (0,1 mg/mL), repetindo a cada 3 a 5 minutos se necessário. Via traqueal apenas enquanto o acesso venoso não estiver disponível, com 0,05 a 0,1 mg/kg (0,5 a 1 mL/kg da solução 1:10.000). Confirmar conforme protocolo e diluição disponível.' },
        { medId: 'soro_fisiologico', esquema: 'Suspeita de hipovolemia durante ou após a reanimação: 10 mL/kg por via intravenosa (veia umbilical) em 5 a 10 minutos, podendo repetir conforme resposta. Infundir mais lentamente no prematuro pelo risco de hemorragia intracraniana.' },
        { medId: 'glicose', esquema: 'Hipoglicemia após a reanimação (glicemia menor que 45 mg/dL): glicose 10% 2 mL/kg IV em bolus lento, seguida de infusão contínua com 5 a 8 mg/kg/min, com controle em 30 minutos.' },
        { medId: 'fenobarbital', esquema: 'Convulsão associada à encefalopatia hipóxico-isquêmica: ataque de 20 mg/kg IV lento (em 15 a 20 minutos), podendo repetir 10 mg/kg até 40 mg/kg no total; manutenção de 3 a 5 mg/kg/dia. Monitorar depressão respiratória e necessidade de suporte ventilatório.' },
        { medId: 'ampicilina', esquema: 'Suspeita de infecção associada ao evento perinatal (corioamnionite, bolsa rota prolongada): 50 mg/kg/dose IV, a cada 12 horas até 7 dias de vida e a cada 8 horas após, associada a gentamicina, após coleta de culturas.' },
        { medId: 'gentamicina', esquema: 'Suspeita de infecção associada: 4 mg/kg/dose IV a cada 24 horas no RN a termo; intervalos maiores no prematuro. Monitorar função renal, especialmente na asfixia com lesão renal.' },
        { medId: null, nome: 'Hipotermia terapêutica (medida terapêutica não medicamentosa)', esquema: 'Encefalopatia hipóxico-isquêmica moderada a grave em RN com 35 semanas ou mais: iniciar até 6 horas de vida, em serviço habilitado, com controle contínuo de temperatura por 72 horas e reaquecimento lento. Não iniciar resfriamento sem orientação da referência. Confirmar conforme protocolo.', verificar: true }
      ],
      criteriosInternacao: [
        'Necessidade de ventilação com pressão positiva por mais do que poucos minutos, intubação, massagem cardíaca ou medicamentos na sala de parto.',
        'Apgar menor que 7 no 5º minuto.',
        'Qualquer sinal neurológico, respiratório ou hemodinâmico anormal após a estabilização.',
        'Líquido meconial com desconforto respiratório.',
        'Prematuridade ou baixo peso.',
        'Hipoglicemia, hipotermia ou acidose após o evento.'
      ],
      criteriosUTI: [
        'Necessidade de ventilação mecânica ou de suporte de oxigênio prolongado.',
        'Encefalopatia hipóxico-isquêmica moderada a grave ou convulsões.',
        'Indicação de hipotermia terapêutica.',
        'Instabilidade hemodinâmica com necessidade de drogas vasoativas.',
        'Disfunção renal, hepática ou coagulopatia.',
        'Hipoglicemia refratária ou acidose metabólica persistente.'
      ],
      criteriosAlta: [
        'RN estável em ar ambiente, com exame neurológico adequado para a idade e sem convulsões por período definido pela equipe.',
        'Sucção eficaz, alimentação enteral plena e ganho de peso.',
        'Glicemia, eletrólitos e função renal normalizados.',
        'Triagem auditiva, avaliação oftalmológica e exames de imagem realizados ou agendados quando indicados.',
        'Seguimento em ambulatório de acompanhamento do desenvolvimento agendado e responsável orientado.'
      ],
      orientacoes: [
        'Comparecer às consultas de acompanhamento do desenvolvimento, mesmo que o bebê pareça bem, pois algumas alterações aparecem com o tempo.',
        'Procurar atendimento imediatamente se o bebê apresentar convulsão, ficar molinho ou muito rígido, parar de mamar, ficar muito sonolento ou apresentar pausas na respiração.',
        'Manter o bebê aquecido, amamentar com frequência e observar o ganho de peso.',
        'Realizar a triagem auditiva neonatal e a avaliação dos olhos nas datas indicadas.',
        'Levar sempre a caderneta da criança e o resumo da internação às consultas.',
        'Em futuras gestações, realizar o pré-natal completo e planejar o parto em serviço de saúde com equipe treinada.'
      ],
      retorno: 'Reavaliar em 7 dias após a alta e manter seguimento mensal nos primeiros 6 meses em ambulatório de acompanhamento do recém-nascido de risco, com avaliação neurológica, auditiva, oftalmológica e do desenvolvimento. Retorno imediato diante de convulsão, apneia, recusa alimentar ou alteração do tônus.',
      prevencao: [
        'Pré-natal completo com identificação de gestação de risco e planejamento do local do parto.',
        'Parto assistido por profissional treinado em reanimação neonatal, com material conferido antes de cada nascimento.',
        'Treinamento periódico das equipes em reanimação neonatal, incluindo equipes de unidades fluviais e de atenção básica em comunidades distantes.',
        'Monitorização fetal adequada durante o trabalho de parto e atuação rápida no sofrimento fetal.',
        'Corticoide antenatal no risco de parto prematuro entre 24 e 34 semanas, conforme protocolo obstétrico.',
        'Manutenção da normotermia desde o nascimento e clampeamento oportuno do cordão nos RN vigorosos.',
        'Transporte materno oportuno para a maternidade de referência antes do parto quando há risco identificado, evitando o transporte neonatal de emergência.'
      ],
      fontes: [
        { nome: 'Sociedade Brasileira de Pediatria – Reanimação do recém-nascido maior ou igual a 34 semanas em sala de parto: Diretrizes 2022', ano: 2022 },
        { nome: 'Sociedade Brasileira de Pediatria – Reanimação do prematuro menor que 34 semanas em sala de parto: Diretrizes 2022', ano: 2022 },
        { nome: 'American Heart Association e American Academy of Pediatrics – Neonatal Resuscitation Program', ano: 2021 },
        { nome: 'Nelson Textbook of Pediatrics, 21ª edição', ano: 2020 }
      ],
      atualizadoEm: '2026-09'
    }

  ],

  // =====================================================================
  // FOTOTERAPIA E EXSANGUINEOTRANSFUSÃO POR HORA DE VIDA
  // =====================================================================
  fototerapia: {
    fonte: 'AAP 2022 / SBP – Diretrizes sobre icterícia neonatal',
    aproximado: true,
    verificar: true,
    nota: 'Valores de referência aproximados; confirmar no gráfico oficial da diretriz adotada no serviço antes de indicar fototerapia ou exsanguineotransfusão.',
    observacoes: [
      'Os limiares abaixo são conservadores e servem para apoio rápido à decisão: a leitura definitiva deve ser feita no gráfico oficial adotado pelo serviço, que varia por semana de idade gestacional (35, 36, 37, 38, 39 e 40 ou mais semanas).',
      'Os grupos de 38 semanas ou mais com fatores de risco e de 35 a 37 semanas sem fatores de risco têm limiares muito próximos nas curvas clássicas; confirmar conforme protocolo.',
      'Bilirrubina total sérica (mg/dL); não subtrair a fração direta para a decisão de fototerapia na hiperbilirrubinemia indireta.',
      'A idade deve ser contada em horas de vida, e não em dias.',
      'Aumento maior que 0,2 mg/dL por hora, icterícia antes de 24 horas de vida ou sinais de encefalopatia bilirrubínica indicam conduta imediata, independentemente do valor da tabela.',
      'Fototerapia intensiva está indicada quando a bilirrubina se aproxima do limiar de exsanguineotransfusão ou nas doenças hemolíticas.'
    ],
    grupos: [
      { id: 'ig35_sem_risco', rotulo: '>= 38 semanas, sem fatores de risco' },
      { id: 'ig35_com_risco', rotulo: '>= 38 semanas, com fatores de risco' },
      { id: 'ig35_37_sem_risco', rotulo: '35 a 37 semanas, sem fatores de risco' },
      { id: 'ig35_37_com_risco', rotulo: '35 a 37 semanas, com fatores de risco' }
    ],
    fatoresRisco: ['doença hemolítica isoimune', 'deficiência de G6PD', 'asfixia', 'letargia significativa', 'instabilidade térmica', 'sepse', 'acidose', 'albumina < 3,0 g/dL'],
    limiaresFototerapia: [
      { horas: 12, ig35_sem_risco: 9, ig35_com_risco: 7.5, ig35_37_sem_risco: 7.5, ig35_37_com_risco: 6 },
      { horas: 24, ig35_sem_risco: 12, ig35_com_risco: 10, ig35_37_sem_risco: 10, ig35_37_com_risco: 8 },
      { horas: 36, ig35_sem_risco: 13.5, ig35_com_risco: 11.5, ig35_37_sem_risco: 11.5, ig35_37_com_risco: 9.5 },
      { horas: 48, ig35_sem_risco: 15, ig35_com_risco: 13, ig35_37_sem_risco: 13, ig35_37_com_risco: 11 },
      { horas: 60, ig35_sem_risco: 16.5, ig35_com_risco: 14, ig35_37_sem_risco: 14, ig35_37_com_risco: 12 },
      { horas: 72, ig35_sem_risco: 18, ig35_com_risco: 15, ig35_37_sem_risco: 15, ig35_37_com_risco: 13.5 },
      { horas: 84, ig35_sem_risco: 19.5, ig35_com_risco: 16.5, ig35_37_sem_risco: 16.5, ig35_37_com_risco: 14 },
      { horas: 96, ig35_sem_risco: 21, ig35_com_risco: 18, ig35_37_sem_risco: 18, ig35_37_com_risco: 15 },
      { horas: 108, ig35_sem_risco: 21, ig35_com_risco: 18, ig35_37_sem_risco: 18, ig35_37_com_risco: 15 },
      { horas: 120, ig35_sem_risco: 21, ig35_com_risco: 18, ig35_37_sem_risco: 18, ig35_37_com_risco: 15 },
      { horas: 132, ig35_sem_risco: 21, ig35_com_risco: 18, ig35_37_sem_risco: 18, ig35_37_com_risco: 15 },
      { horas: 144, ig35_sem_risco: 21, ig35_com_risco: 18, ig35_37_sem_risco: 18, ig35_37_com_risco: 15 },
      { horas: 168, ig35_sem_risco: 21, ig35_com_risco: 18, ig35_37_sem_risco: 18, ig35_37_com_risco: 15 }
    ],
    limiaresExsanguineo: [
      { horas: 12, ig35_sem_risco: 17, ig35_com_risco: 15, ig35_37_sem_risco: 15, ig35_37_com_risco: 13.5 },
      { horas: 24, ig35_sem_risco: 19, ig35_com_risco: 16.5, ig35_37_sem_risco: 16.5, ig35_37_com_risco: 15 },
      { horas: 36, ig35_sem_risco: 20.5, ig35_com_risco: 18, ig35_37_sem_risco: 18, ig35_37_com_risco: 16 },
      { horas: 48, ig35_sem_risco: 22, ig35_com_risco: 19, ig35_37_sem_risco: 19, ig35_37_com_risco: 17 },
      { horas: 60, ig35_sem_risco: 23, ig35_com_risco: 20, ig35_37_sem_risco: 20, ig35_37_com_risco: 17.5 },
      { horas: 72, ig35_sem_risco: 24, ig35_com_risco: 21, ig35_37_sem_risco: 21, ig35_37_com_risco: 18.5 },
      { horas: 84, ig35_sem_risco: 24.5, ig35_com_risco: 21.5, ig35_37_sem_risco: 21.5, ig35_37_com_risco: 19 },
      { horas: 96, ig35_sem_risco: 25, ig35_com_risco: 22, ig35_37_sem_risco: 22, ig35_37_com_risco: 19 },
      { horas: 108, ig35_sem_risco: 25, ig35_com_risco: 22, ig35_37_sem_risco: 22, ig35_37_com_risco: 19 },
      { horas: 120, ig35_sem_risco: 25, ig35_com_risco: 22, ig35_37_sem_risco: 22, ig35_37_com_risco: 19 },
      { horas: 132, ig35_sem_risco: 25, ig35_com_risco: 22, ig35_37_sem_risco: 22, ig35_37_com_risco: 19 },
      { horas: 144, ig35_sem_risco: 25, ig35_com_risco: 22, ig35_37_sem_risco: 22, ig35_37_com_risco: 19 },
      { horas: 168, ig35_sem_risco: 25, ig35_com_risco: 22, ig35_37_sem_risco: 22, ig35_37_com_risco: 19 }
    ],
    zonasKramer: [
      { zona: 1, area: 'cabeça e pescoço', bilirrubinaAprox: '4 a 8 mg/dL' },
      { zona: 2, area: 'tronco até a cicatriz umbilical', bilirrubinaAprox: '5 a 12 mg/dL' },
      { zona: 3, area: 'hipogástrio e coxas (abaixo do umbigo até os joelhos)', bilirrubinaAprox: '8 a 16 mg/dL' },
      { zona: 4, area: 'braços, antebraços e pernas (abaixo dos joelhos e cotovelos)', bilirrubinaAprox: '11 a 18 mg/dL' },
      { zona: 5, area: 'palmas das mãos e plantas dos pés', bilirrubinaAprox: 'acima de 15 mg/dL' }
    ],
    sinaisAlarme: [
      'Icterícia iniciada antes de 24 horas de vida.',
      'Icterícia atingindo palmas e plantas (zona 5 de Kramer).',
      'Aumento da bilirrubina total maior que 0,2 mg/dL por hora ou maior que 5 mg/dL por dia.',
      'Letargia, hipotonia, sucção débil ou recusa alimentar.',
      'Choro agudo e estridente, irritabilidade, hipertonia, retrocolo ou opistótono.',
      'Convulsão, apneia ou febre associada.',
      'Perda de peso maior que 10% do peso de nascimento ou sinais de desidratação.',
      'Bilirrubina direta maior que 1 mg/dL, acolia fecal ou colúria.',
      'Icterícia persistente após 14 dias no RN a termo ou 21 dias no prematuro.'
    ],
    conduta: [
      'Registrar a hora exata de vida no momento da coleta da bilirrubina e usar o gráfico oficial do serviço para a decisão.',
      'Considerar fototerapia quando a bilirrubina total atingir o limiar do grupo de risco para a hora de vida; iniciar imediatamente diante de sinais de encefalopatia bilirrubínica, sem aguardar o resultado.',
      'Fototerapia com proteção ocular contínua, maior superfície corporal exposta, distância da fonte conforme o fabricante e controle de temperatura a cada 3 horas.',
      'Manter aleitamento materno em livre demanda (8 a 12 mamadas por dia); complementar com leite materno ordenhado se a ingesta for insuficiente ou a perda de peso maior que 10%.',
      'Hidratação venosa somente se houver desidratação ou impossibilidade de ingesta adequada; não usar água ou soro glicosado oral.',
      'Repetir a bilirrubina em 4 a 6 horas nos casos hemolíticos ou próximos ao limiar de exsanguineotransfusão e em 8 a 12 horas nos demais.',
      'Avaliar a causa: tipagem sanguínea da mãe e do RN, Coombs direto, hemograma, reticulócitos, G6PD quando disponível e triagem de sepse conforme a clínica.',
      'Considerar exsanguineotransfusão quando a bilirrubina atingir o limiar do grupo ou diante de encefalopatia bilirrubínica aguda: procedimento exclusivo de unidade de referência, com sangue compatibilizado e monitorização contínua.',
      'Acionar a referência e manter fototerapia intensiva durante todo o transporte, com aquecimento, acesso venoso e controle glicêmico.',
      'Suspender a fototerapia quando a bilirrubina estiver pelo menos 2 a 3 mg/dL abaixo do limiar, com tendência de queda, e repetir a dosagem 12 a 24 horas depois para avaliar rebote.',
      'Bilirrubina direta elevada com acolia fecal: não tratar com fototerapia e encaminhar com urgência para investigação de colestase e de atresia de vias biliares.'
    ],
    fontes: [
      { nome: 'American Academy of Pediatrics – Clinical Practice Guideline Revision: Management of Hyperbilirubinemia in the Newborn Infant 35 or More Weeks of Gestation', ano: 2022 },
      { nome: 'Sociedade Brasileira de Pediatria – Documento científico sobre icterícia neonatal', ano: 2021 },
      { nome: 'Ministério da Saúde – Atenção à Saúde do Recém-Nascido: Guia para os Profissionais de Saúde', ano: 2014 }
    ],
    atualizadoEm: '2026-09'
  },

  // =====================================================================
  // SEPSE NEONATAL – FATORES DE RISCO E ANTIBIOTICOTERAPIA EMPÍRICA
  // =====================================================================
  sepseNeonatal: {
    fatoresRiscoPrecoce: [
      'Ruptura de membranas amnióticas por mais de 18 horas.',
      'Febre materna igual ou maior que 38 °C no periparto ou corioamnionite.',
      'Colonização materna por Streptococcus agalactiae (estreptococo do grupo B) sem profilaxia intraparto adequada.',
      'Filho anterior com doença invasiva por estreptococo do grupo B.',
      'Infecção urinária materna não tratada ou bacteriúria por estreptococo do grupo B na gestação.',
      'Trabalho de parto prematuro sem causa definida ou prematuridade (menos de 37 semanas).',
      'Líquido amniótico fétido ou purulento.',
      'Asfixia perinatal e necessidade de reanimação ao nascimento.',
      'Parto domiciliar ou sem assistência qualificada, com material não estéril (situação frequente em comunidades ribeirinhas e indígenas do Amazonas).',
      'Pré-natal ausente ou incompleto, com sorologias desconhecidas (sífilis, HIV, hepatites).',
      'Toques vaginais repetidos ou procedimentos invasivos no trabalho de parto.'
    ],
    fatoresRiscoTardia: [
      'Prematuridade e muito baixo peso ao nascer.',
      'Internação prolongada em unidade neonatal.',
      'Cateter venoso central, cateter umbilical ou outros dispositivos invasivos.',
      'Ventilação mecânica ou suporte respiratório prolongado.',
      'Nutrição parenteral prolongada.',
      'Uso prévio e prolongado de antibióticos de amplo espectro (risco de infecção fúngica).',
      'Cirurgias e procedimentos invasivos.',
      'Higiene inadequada das mãos dos cuidadores e ambiente domiciliar com aglomeração.',
      'Cuidado inadequado do coto umbilical, com aplicação de substâncias caseiras (risco de onfalite e de tétano neonatal).',
      'Ausência de aleitamento materno.',
      'Contato com pessoas com infecção respiratória ou com tosse prolongada (vírus sincicial respiratório, coqueluche).',
      'Malária materna na gestação em área endêmica (considerar malária congênita como diferencial).'
    ],
    sinaisClinicos: [
      'Dificuldade para mamar, sucção fraca ou recusa alimentar.',
      'Hipotermia (menor que 36 °C) ou febre (igual ou maior que 37,8 °C).',
      'Letargia, hipoatividade, hipotonia ou irritabilidade.',
      'Gemência, taquipneia (maior que 60 irpm), tiragem, batimento de asa nasal, apneia ou cianose.',
      'Palidez, pele moteada, enchimento capilar maior que 3 segundos, extremidades frias.',
      'Taquicardia, bradicardia ou hipotensão.',
      'Distensão abdominal, vômitos, resíduo gástrico ou diarreia.',
      'Icterícia precoce ou de rápida progressão.',
      'Onfalite: hiperemia periumbilical, secreção purulenta ou odor fétido.',
      'Petéquias, pústulas, vesículas ou esclerema.',
      'Convulsão, abaulamento de fontanela ou hipertonia (meningite).',
      'Hipoglicemia ou hiperglicemia inexplicadas.',
      'Trismo, rigidez e espasmos ao estímulo em RN de parto domiciliar (tétano neonatal).'
    ],
    examesIniciais: [
      'Hemocultura (idealmente dois frascos ou volume adequado) antes do antibiótico, sem atrasar o início do tratamento.',
      'Hemograma completo com contagem diferencial e plaquetas (valorizar leucócitos menores que 5.000/mm3 ou maiores que 25.000/mm3, relação neutrófilos imaturos/totais igual ou maior que 0,2 e plaquetas menores que 100.000/mm3).',
      'Proteína C reativa na admissão e repetida em 24 a 48 horas, útil sobretudo para acompanhar a resposta.',
      'Glicemia capilar imediata com confirmação laboratorial.',
      'Líquor com celularidade, proteínas, glicose, bacterioscopia e cultura, quando o quadro permitir.',
      'Urina tipo 1 e urocultura colhidas por cateterismo vesical ou punção suprapúbica, principalmente na sepse tardia.',
      'Gasometria, lactato e eletrólitos nos casos graves.',
      'Radiografia de tórax quando houver desconforto respiratório.',
      'Bilirrubinas totais e frações quando houver icterícia.',
      'VDRL do RN e da mãe (sangue periférico do RN, nunca de cordão).',
      'Gota espessa ou teste rápido para malária se a mãe teve malária na gestação ou reside em área de transmissão.',
      'Cultura de secreção do coto umbilical ou de lesões de pele quando houver foco aparente.'
    ],
    antibioticoterapiaEmpirica: [
      { situacao: 'Sepse precoce (< 72 h)', esquema: 'Ampicilina + gentamicina', medIds: ['ampicilina', 'gentamicina'], obs: 'Ampicilina 50 mg/kg/dose IV a cada 12 horas até 7 dias de vida (100 mg/kg/dose se suspeita de meningite) e gentamicina 4 mg/kg/dose IV a cada 24 horas no RN a termo, com intervalo de 36 a 48 horas no prematuro. Coletar hemocultura antes e iniciar na primeira hora. Reavaliar em 48 a 72 horas conforme culturas e evolução. Confirmar conforme protocolo.' },
      { situacao: 'Sepse precoce com suspeita de meningite', esquema: 'Ampicilina em dose meníngea + cefotaxima', medIds: ['ampicilina', 'cefotaxima'], obs: 'Ampicilina 100 mg/kg/dose IV e cefotaxima 50 mg/kg/dose IV, com intervalos conforme a idade pós-natal (12/12 h até 7 dias e 8/8 h após). Preferir cefotaxima à ceftriaxona no período neonatal, sobretudo em RN ictéricos ou em uso de soluções com cálcio. Duração habitual de 14 a 21 dias conforme o agente. Confirmar conforme protocolo.' },
      { situacao: 'Sepse tardia (>= 72 h) de origem comunitária', esquema: 'Ampicilina + gentamicina, ou oxacilina + gentamicina quando há foco cutâneo ou onfalite', medIds: ['ampicilina', 'gentamicina', 'oxacilina'], obs: 'Oxacilina 25 a 50 mg/kg/dose IV com intervalo conforme a idade pós-natal quando há impetigo, onfalite, abscesso ou artrite. Considerar cefotaxima associada se houver suspeita de meningite. Ajustar conforme o perfil de sensibilidade local e as culturas. Confirmar conforme protocolo.' },
      { situacao: 'Sepse tardia (>= 72 h) associada a cuidados de saúde ou a cateter', esquema: 'Vancomicina + aminoglicosídeo ou cefalosporina conforme a flora da unidade', medIds: ['vancomicina', 'gentamicina', 'cefotaxima'], obs: 'Vancomicina 10 a 15 mg/kg/dose IV com intervalo conforme idade gestacional e pós-natal, em unidade neonatal com monitorização de função renal. Considerar cobertura antifúngica em uso prolongado de antibióticos de amplo espectro e nutrição parenteral. Escolha guiada pelo perfil microbiológico local. Confirmar conforme protocolo.', verificar: true },
      { situacao: 'Suspeita de sífilis congênita associada', esquema: 'Penicilina cristalina por 10 dias', medIds: ['penicilina_cristalina'], obs: 'Penicilina cristalina 50.000 UI/kg/dose IV a cada 12 horas nos primeiros 7 dias de vida e a cada 8 horas após, por 10 dias. Não substitui o esquema empírico da sepse bacteriana quando ambos forem necessários. Notificação compulsória.' },
      { situacao: 'Comunidade distante, antes da transferência fluvial ou aérea', esquema: 'Primeira dose de ampicilina + gentamicina antes do transporte', medIds: ['ampicilina', 'gentamicina'], obs: 'Iniciar o antibiótico na unidade de origem após coleta de hemocultura, quando disponível, e não aguardar a chegada à referência. Garantir aquecimento, acesso venoso, controle glicêmico e oxigênio durante o transporte e registrar horários e doses administradas.' }
    ],
    fontes: [
      { nome: 'Ministério da Saúde – Atenção à Saúde do Recém-Nascido: Guia para os Profissionais de Saúde', ano: 2014 },
      { nome: 'Sociedade Brasileira de Pediatria – Documento científico sobre sepse neonatal', ano: 2021 },
      { nome: 'OMS – Pocket Book of Hospital Care for Children', ano: 2013 },
      { nome: 'Nelson Textbook of Pediatrics, 21ª edição', ano: 2020 }
    ],
    atualizadoEm: '2026-09'
  },

  // =====================================================================
  // REANIMAÇÃO NEONATAL EM SALA DE PARTO
  // =====================================================================
  reanimacao: {
    passos: [
      'Antes do nascimento: conferir o material de reanimação, aquecer a sala (23 a 26 °C), ligar a fonte de calor radiante, separar máscaras e cânulas por tamanho e identificar os fatores de risco da gestação.',
      'Ao nascer, responder a três perguntas: gestação a termo, o RN está respirando ou chorando e o tônus está em flexão.',
      'Se as três respostas forem afirmativas: clampear o cordão entre 1 e 3 minutos, secar, colocar em contato pele a pele com a mãe, manter a temperatura e estimular a amamentação na primeira hora.',
      'Se qualquer resposta for negativa: levar à mesa de reanimação sob fonte de calor radiante e realizar os passos iniciais em até 30 segundos.',
      'Passos iniciais: prover calor, posicionar a cabeça em leve extensão, aspirar boca e depois narinas somente se houver obstrução por secreções, secar e desprezar os campos úmidos.',
      'Prematuros com menos de 34 semanas: envolver o corpo em saco plástico transparente e colocar touca imediatamente, sem secar o corpo, para evitar hipotermia.',
      'Avaliar simultaneamente respiração e frequência cardíaca (ausculta do precórdio por 6 segundos, multiplicando por 10).',
      'Apneia, respiração irregular (gasping) ou frequência cardíaca menor que 100 bpm: iniciar ventilação com pressão positiva dentro dos primeiros 60 segundos de vida (Minuto de Ouro).',
      'Ventilar com máscara facial bem adaptada, 40 a 60 movimentos por minuto, usando ar ambiente (21% de oxigênio) nos RN com 34 semanas ou mais e 30% nos menores de 34 semanas.',
      'Instalar oximetria de pulso no membro superior direito (pré-ductal) e monitor cardíaco de três eletrodos assim que a ventilação for iniciada.',
      'Reavaliar após 30 segundos de ventilação: se a frequência cardíaca for maior que 100 bpm e houver respiração espontânea regular, suspender a ventilação e manter observação.',
      'Se a frequência cardíaca permanecer menor que 100 bpm, checar a técnica (adaptação da máscara, permeabilidade das vias aéreas, posição da cabeça, pressão e frequência) e corrigir antes de avançar.',
      'Ventilação inefetiva ou prolongada: indicar intubação traqueal por profissional habilitado, confirmando a posição pela ausculta simétrica, pela elevação do tórax e, quando disponível, pelo detector de dióxido de carbono exalado.',
      'Frequência cardíaca menor que 60 bpm após 30 segundos de ventilação adequada por cânula traqueal com oxigênio a 100%: iniciar massagem cardíaca com a técnica dos dois polegares no terço inferior do esterno, coordenada com a ventilação na relação 3 compressões para 1 ventilação, totalizando 120 eventos por minuto.',
      'Reavaliar a cada 60 segundos de massagem coordenada com ventilação.',
      'Frequência cardíaca ainda menor que 60 bpm: administrar adrenalina 0,01 a 0,03 mg/kg por via intravenosa (veia umbilical), o que corresponde a 0,1 a 0,3 mL/kg da solução 1:10.000, repetindo a cada 3 a 5 minutos se necessário.',
      'Suspeita de hipovolemia (palidez, pulsos finos, perda sanguínea, resposta inadequada): expandir com soro fisiológico 0,9% 10 mL/kg IV em 5 a 10 minutos, mais lentamente no prematuro.',
      'Ajustar a oferta de oxigênio pelas metas de saturação pré-ductal: 70% a 80% aos 5 minutos, 80% a 90% entre 5 e 10 minutos e 85% a 95% após 10 minutos de vida.',
      'Após a estabilização, manter normotermia (36,5 a 37,5 °C), controlar glicemia, evitar hipertermia e avaliar a necessidade de cuidados intensivos.',
      'RN com 35 semanas ou mais que necessitou de reanimação avançada: avaliar sinais de encefalopatia hipóxico-isquêmica e contatar a referência para discutir hipotermia terapêutica, que deve iniciar até 6 horas de vida. Confirmar conforme protocolo.',
      'Registrar o Apgar no 1º, 5º e 10º minutos, todas as manobras realizadas, os horários, as doses administradas e a evolução, e comunicar a equipe que receberá o RN.'
    ],
    apgar: [
      { item: 'Frequência cardíaca', p0: 'Ausente', p1: 'Menor que 100 bpm', p2: 'Igual ou maior que 100 bpm' },
      { item: 'Esforço respiratório', p0: 'Ausente', p1: 'Respiração irregular, choro fraco', p2: 'Choro forte, respiração regular' },
      { item: 'Tônus muscular', p0: 'Flacidez total', p1: 'Alguma flexão de extremidades', p2: 'Movimentação ativa, flexão generalizada' },
      { item: 'Irritabilidade reflexa (resposta ao estímulo)', p0: 'Sem resposta', p1: 'Careta', p2: 'Choro, tosse ou espirro' },
      { item: 'Cor', p0: 'Cianose central ou palidez', p1: 'Corpo rosado e extremidades cianóticas', p2: 'Completamente rosado' }
    ],
    materiais: [
      'Fonte de calor radiante, campos aquecidos, touca e sacos plásticos transparentes para prematuros.',
      'Termômetro para controle da temperatura axilar e termostato da sala entre 23 e 26 °C.',
      'Aspirador a vácuo com manômetro e sondas de aspiração 6, 8 e 10 Fr.',
      'Balão autoinflável de 240 mL com válvula de escape e reservatório de oxigênio, ou ventilador manual em T.',
      'Máscaras faciais de silicone nos tamanhos para prematuro, RN a termo e prematuro extremo.',
      'Blender (misturador de ar e oxigênio) e fluxômetro, com cilindro ou rede de ar comprimido e de oxigênio.',
      'Oxímetro de pulso com sensor neonatal e monitor cardíaco com três eletrodos.',
      'Laringoscópio com lâminas retas 00, 0 e 1 e pilhas sobressalentes.',
      'Cânulas traqueais sem balonete 2,5, 3,0, 3,5 e 4,0 mm, com fio guia opcional.',
      'Máscara laríngea neonatal, quando disponível, como alternativa à intubação.',
      'Material para cateterismo de veia umbilical: cateteres 3,5 e 5 Fr, campo estéril, fio, bisturi e pinças.',
      'Seringas, agulhas, torneiras de três vias e equipos.',
      'Adrenalina diluída a 1:10.000 (0,1 mg/mL) e soro fisiológico 0,9% para expansão.',
      'Estetoscópio neonatal, relógio com ponteiro de segundos e material para registro.',
      'Detector de dióxido de carbono exalado, quando disponível, para confirmar a posição da cânula.',
      'Glicosímetro e material para controle glicêmico após a estabilização.'
    ],
    tamanhoTubo: [
      { pesoMin: 0, pesoMax: 1, igSemanas: '< 28', tubo: 2.5, profundidadeCm: '6 a 7' },
      { pesoMin: 1, pesoMax: 2, igSemanas: '28 a 33', tubo: 3.0, profundidadeCm: '7 a 8' },
      { pesoMin: 2, pesoMax: 3, igSemanas: '34 a 38', tubo: 3.5, profundidadeCm: '8 a 9' },
      { pesoMin: 3, pesoMax: 99, igSemanas: '> 38', tubo: 3.5, profundidadeCm: '9 a 10' }
    ],
    metasSaturacao: [
      { minutos: 5, alvo: '70% a 80%' },
      { minutos: 10, alvo: '80% a 90%' },
      { minutos: 15, alvo: '85% a 95%' }
    ],
    contextoAmazonia: [
      'Em partos domiciliares, ribeirinhos ou em comunidades indígenas, garantir que a equipe ou a parteira tradicional disponha de material limpo para a secção do cordão, de campo seco e aquecido e de treinamento nos passos iniciais e na ventilação com balão e máscara.',
      'Manter o RN aquecido em contato pele a pele durante todo o deslocamento fluvial, que pode levar horas, com atenção à temperatura, à glicemia e à amamentação.',
      'Unidades básicas fluviais e de comunidades distantes devem conferir periodicamente o material de reanimação e manter equipe treinada, pois a transferência não é imediata.',
      'Acionar a central de regulação precocemente diante de qualquer RN que necessitou de reanimação, antes da deterioração clínica.',
      'Não aplicar substâncias no coto umbilical e orientar a família, medida importante para prevenir onfalite e tétano neonatal.'
    ],
    fontes: [
      { nome: 'Sociedade Brasileira de Pediatria – Reanimação do recém-nascido maior ou igual a 34 semanas em sala de parto: Diretrizes 2022', ano: 2022 },
      { nome: 'Sociedade Brasileira de Pediatria – Reanimação do prematuro menor que 34 semanas em sala de parto: Diretrizes 2022', ano: 2022 },
      { nome: 'American Heart Association e American Academy of Pediatrics – Neonatal Resuscitation Program', ano: 2021 },
      { nome: 'Ministério da Saúde – Atenção à Saúde do Recém-Nascido: Guia para os Profissionais de Saúde', ano: 2014 }
    ],
    atualizadoEm: '2026-09'
  },

  fontes: [
    { nome: 'Sociedade Brasileira de Pediatria – Reanimação Neonatal: Diretrizes 2022', ano: 2022 },
    { nome: 'American Academy of Pediatrics – Clinical Practice Guideline Revision: Management of Hyperbilirubinemia in the Newborn Infant 35 or More Weeks of Gestation', ano: 2022 },
    { nome: 'Ministério da Saúde – Protocolo Clínico e Diretrizes Terapêuticas para Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis (PCDT IST)', ano: 2022 },
    { nome: 'Ministério da Saúde – Atenção à Saúde do Recém-Nascido: Guia para os Profissionais de Saúde', ano: 2014 },
    { nome: 'Ministério da Saúde – Guia de Vigilância em Saúde', ano: 2024 },
    { nome: 'Nelson Textbook of Pediatrics, 21ª edição', ano: 2020 },
    { nome: 'OMS – Pocket Book of Hospital Care for Children', ano: 2013 }
  ],
  atualizadoEm: '2026-09'
};
