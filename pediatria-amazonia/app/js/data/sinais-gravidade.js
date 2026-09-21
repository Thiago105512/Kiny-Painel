window.PED = window.PED || {}; PED.data = PED.data || {};

// Sinais de gravidade (bandeiras vermelhas) usados pelas queixas.
// Linguagem de apoio à decisão. Valores de corte conforme AIDPI/OMS, PALS/AHA, MS e SBP.
PED.data.sinaisGravidade = [
  {
    id: 'choque',
    nome: 'Choque',
    descricao: 'Taquicardia desproporcional à febre (FC > 180 bpm em lactentes, > 160 bpm em pré-escolares, > 140 bpm em escolares), tempo de enchimento capilar (TEC) > 2 s, pulsos periféricos finos ou ausentes, extremidades frias, pele moteada, taquipneia, oligúria e alteração do nível de consciência. Hipotensão é sinal tardio (choque descompensado).',
    acao: 'Acionar emergência; O2 suplementar; acesso venoso ou intraósseo em até 5 min; bolus de cristaloide 20 mL/kg (10 mL/kg se suspeita de cardiopatia, desnutrição grave ou anemia grave) com reavaliação após cada bolus; glicemia capilar; considerar antibiótico na primeira hora se suspeita de sepse; monitorar FC, TEC, PA, diurese e consciência; transferir para unidade com suporte intensivo.'
  },
  {
    id: 'hipotensao',
    nome: 'Hipotensão arterial',
    descricao: 'PAS < 60 mmHg no RN a termo, < 70 mmHg de 1 a 12 meses, < 70 + (2 x idade em anos) mmHg de 1 a 10 anos, < 90 mmHg acima de 10 anos. Em crianças é sinal tardio de choque e indica descompensação iminente.',
    acao: 'Tratar como choque descompensado: acionar emergência, O2, acesso vascular imediato (intraósseo se acesso venoso difícil), cristaloide 20 mL/kg em bolus com reavaliação; considerar droga vasoativa precoce se refratário a 40–60 mL/kg; investigar sepse, desidratação grave, hemorragia, anafilaxia e envenenamento.'
  },
  {
    id: 'ma_perfusao',
    nome: 'Má perfusão periférica',
    descricao: 'TEC > 2 s, extremidades frias ou moteadas, pulsos periféricos finos, gradiente térmico centro-periferia, palidez ou cianose de extremidades. Costuma preceder a hipotensão (choque compensado).',
    acao: 'Considerar choque compensado: O2, acesso venoso, bolus de cristaloide 20 mL/kg com reavaliação, glicemia capilar; monitorar FC, PA, diurese e consciência; investigar causa (sepse, desidratação, hemorragia, dengue com extravasamento, malária grave).'
  },
  {
    id: 'alteracao_consciencia',
    nome: 'Alteração do nível de consciência',
    descricao: 'Sonolência excessiva, dificuldade em despertar, não reconhece os pais, resposta apenas à dor ou ausente (AVPU: V, P ou U; Glasgow pediátrico < 15, sobretudo <= 12), irritabilidade inconsolável ou olhar vago em lactentes, confusão ou agitação em escolares.',
    acao: 'ABC com O2; glicemia capilar e correção de hipoglicemia; proteger via aérea se Glasgow <= 8; acesso venoso; considerar meningite/encefalite, malária cerebral, sepse, intoxicação, TCE, cetoacidose e distúrbio de sódio; se febre em área endêmica, gota espessa ou teste rápido imediato; transferir para unidade com suporte.'
  },
  {
    id: 'convulsao',
    nome: 'Convulsão em curso ou recente',
    descricao: 'Movimentos tônico-clônicos, desvio do olhar, cianose ou apneia; gravidade maior se crise > 5 min (estado de mal epiléptico), crises repetidas sem recuperação da consciência, crise focal, pós-ictal prolongado, primeira crise febril em < 6 meses ou > 5 anos, ou crise com sinais meníngeos.',
    acao: 'Decúbito lateral, aspirar secreções, O2, glicemia capilar; se crise > 5 min, benzodiazepínico conforme protocolo (diazepam retal/IV ou midazolam IM/bucal) e segunda linha se persistir; investigar febre, meningite, malária, hipoglicemia, hiponatremia, intoxicação e trauma; observar via aérea e respiração; internar se não for crise febril simples.'
  },
  {
    id: 'desconforto_respiratorio',
    nome: 'Desconforto respiratório',
    descricao: 'FR acima do limite para a idade (>= 60 irpm em < 2 meses, >= 50 irpm de 2 a 11 meses, >= 40 irpm de 1 a 5 anos, >= 30 irpm acima de 5 anos), tiragem subcostal ou intercostal, batimento de asa nasal, gemência, balanço tóraco-abdominal, uso de musculatura acessória, incapacidade de falar, beber ou mamar, pausas respiratórias.',
    acao: 'O2 para manter SpO2 >= 94%; posição confortável; avaliar via aérea; broncodilatador inalatório se sibilância; considerar pneumonia grave, bronquiolite, asma aguda grave, laringite, corpo estranho; radiografia de tórax se disponível; preparar suporte ventilatório (VNI ou intubação) se piora ou exaustão.'
  },
  {
    id: 'hipoxemia',
    nome: 'Hipoxemia',
    descricao: 'SpO2 < 92% em ar ambiente (< 90% indica gravidade acentuada), cianose central, agitação ou sonolência. Em RN, SpO2 pré-ductal < 90% após a primeira hora de vida.',
    acao: 'O2 imediato (cateter nasal 1–2 L/min em lactentes; máscara com reservatório 10–15 L/min se grave), reavaliar SpO2 e esforço respiratório; se não melhora com O2, considerar cardiopatia cianótica, pneumotórax, edema pulmonar ou metemoglobinemia; suporte ventilatório se necessário; transferir para unidade com O2 e monitorização.'
  },
  {
    id: 'sangramento_importante',
    nome: 'Sangramento ativo importante',
    descricao: 'Sangramento que não cessa com compressão, hematêmese, melena, hematúria macroscópica, sangramento em múltiplos sítios, gengivorragia ou epistaxe espontâneas e volumosas, associado a palidez, taquicardia ou hipotensão; prova do laço positiva com sangramento em suspeita de dengue; incoagulabilidade após picada de serpente.',
    acao: 'Compressão local; dois acessos venosos; cristaloide 20 mL/kg se sinais de choque; tipagem sanguínea, hemograma, coagulograma ou tempo de coagulação; considerar dengue grave, acidente botrópico/laquético (soro antiveneno), leptospirose, febre amarela, PTI, leucemia; hemocomponentes conforme protocolo; transferir.'
  },
  {
    id: 'desidratacao_grave',
    nome: 'Desidratação grave',
    descricao: 'Dois ou mais dos seguintes: letárgico ou inconsciente, olhos muito fundos, incapaz de beber ou bebe muito mal, sinal da prega desaparece muito lentamente (> 2 s); pode haver pulsos fracos, TEC > 2 s, extremidades frias, oligúria, perda de peso > 9%.',
    acao: 'Plano C (MS/OMS): hidratação venosa imediata com SF 0,9% ou Ringer lactato 100 mL/kg (< 1 ano: 30 mL/kg em 1 h e 70 mL/kg em 5 h; >= 1 ano: 30 mL/kg em 30 min e 70 mL/kg em 2 h 30 min); repetir a primeira fase se pulso ainda fraco; reavaliar a cada 15–30 min; glicemia; iniciar SRO assim que conseguir beber; zinco; se desnutrição grave, hidratar com cautela conforme protocolo específico.'
  },
  {
    id: 'oliguria',
    nome: 'Oligúria',
    descricao: 'Diurese < 1 mL/kg/h em lactentes ou < 0,5 mL/kg/h por mais de 6 h em crianças maiores; menos de 3–4 micções em 24 h; fraldas secas por > 6–8 h.',
    acao: 'Avaliar hidratação e perfusão; expansão volêmica se hipovolemia; considerar lesão renal aguda por sepse, leptospirose, síndrome hemolítico-urêmica, malária grave, acidente ofídico ou glomerulonefrite; ureia, creatinina, eletrólitos, urina 1; sonda vesical para medir débito se grave; evitar nefrotóxicos.'
  },
  {
    id: 'anuria',
    nome: 'Anúria',
    descricao: 'Ausência de diurese por mais de 12 h (ou > 6–8 h em lactente já hidratado adequadamente), com ou sem edema, hipertensão ou sinais de hipervolemia.',
    acao: 'Emergência renal: reavaliar volemia e sondagem vesical; ureia, creatinina, potássio, gasometria; ECG se hiperpotassemia; restringir potássio e nefrotóxicos; considerar terapia de substituição renal (contato com nefrologia); transferir para unidade de referência.'
  },
  {
    id: 'hipoglicemia',
    nome: 'Hipoglicemia',
    descricao: 'Glicemia capilar < 45 mg/dL (2,5 mmol/L) em lactentes e crianças (alguns protocolos usam < 60 mg/dL para tratar); no RN, < 40–45 mg/dL nas primeiras 24–48 h. Sinais: sudorese, tremores, palidez, irritabilidade, sonolência, hipotonia, convulsão, apneia no RN. Risco maior em desnutridos, malária grave, sepse, jejum prolongado e diarreia.',
    acao: 'Glicose 10% IV 2–5 mL/kg em bolus (0,2–0,5 g/kg); se sem acesso venoso, glicose oral, por sonda gástrica ou leite materno se consciente; repetir glicemia em 15–30 min; manter infusão contínua de glicose (taxa de infusão 4–8 mg/kg/min) até estabilizar; investigar e tratar a causa.'
  },
  {
    id: 'sepse',
    nome: 'Suspeita de sepse',
    descricao: 'Febre ou hipotermia (< 36 °C) associada a taquicardia, taquipneia, alteração da consciência, má perfusão (TEC > 2 s, pele moteada), petéquias ou hipotensão (tardia); em lactentes: recusa alimentar, letargia, gemência, hipotermia, apneia. Toxemia sem foco aparente também deve levantar suspeita.',
    acao: 'Pacote da primeira hora: O2, acesso venoso ou intraósseo, hemocultura antes do antibiótico se não atrasar, antibiótico empírico em até 1 h conforme protocolo local, cristaloide 20 mL/kg se sinais de choque com reavaliação, glicemia capilar, lactato se disponível; reavaliação frequente; considerar malária grave em área endêmica; transferir para unidade com suporte intensivo.'
  },
  {
    id: 'rigidez_nuca',
    nome: 'Rigidez de nuca / sinais meníngeos',
    descricao: 'Resistência à flexão passiva do pescoço, sinais de Kernig e Brudzinski, fotofobia. Em lactentes podem estar ausentes: valorizar abaulamento de fontanela, irritabilidade inconsolável, gemência, vômitos, convulsão, letargia.',
    acao: 'Considerar meningite bacteriana: hemocultura e punção lombar se não houver contraindicação, sem atrasar o antibiótico; ceftriaxona empírica (ampicilina + cefotaxima/gentamicina em < 1–2 meses) conforme protocolo; dexametasona conforme protocolo; isolamento respiratório nas primeiras 24 h; notificação; quimioprofilaxia dos contatos se meningococo ou Hib.'
  },
  {
    id: 'petequias_purpura',
    nome: 'Petéquias / púrpura',
    descricao: 'Lesões puntiformes vermelho-arroxeadas que não desaparecem à digitopressão; púrpura, equimoses ou necrose de extremidades. Com febre e toxemia sugere meningococemia, dengue grave ou sepse; petéquias apenas acima da linha mamilar após tosse ou vômito são menos preocupantes.',
    acao: 'Se febre + petéquias: emergência; acesso venoso, hemocultura, antibiótico imediato (ceftriaxona conforme protocolo), cristaloide se choque; hemograma, coagulograma; isolamento respiratório; notificar; considerar dengue grave em área endêmica (hidratação conforme protocolo do MS).'
  },
  {
    id: 'dor_abdominal_intensa',
    nome: 'Dor abdominal intensa e contínua',
    descricao: 'Dor intensa que não melhora, defesa ou rigidez, descompressão dolorosa, distensão, silêncio abdominal, vômitos biliosos, massa palpável, sangue nas fezes. Em suspeita de dengue é sinal de alarme (extravasamento plasmático).',
    acao: 'Jejum, acesso venoso, hidratação, analgesia; avaliação cirúrgica (apendicite, invaginação, obstrução por áscaris, perfuração, torção); hemograma, amilase/lipase e ultrassonografia se disponíveis; em suspeita de dengue, hidratação venosa conforme grupo C do MS; considerar acidente laquético e latrodectismo se picada.'
  },
  {
    id: 'vomitos_persistentes',
    nome: 'Vômitos persistentes',
    descricao: 'Vômitos que impedem a hidratação oral, >= 3 episódios em 1 h ou >= 4–6 em 6 h, vômitos biliosos ou com sangue, vômitos em jato associados a cefaleia ou sonolência. Em suspeita de dengue é sinal de alarme; após picada de escorpião indica gravidade.',
    acao: 'Avaliar hidratação e sinais de alarme; ondansetrona conforme protocolo se > 6 meses; hidratação venosa se falha da TRO; glicemia, eletrólitos; considerar causas cirúrgicas, hipertensão intracraniana, cetoacidose, intoxicação e escorpionismo moderado/grave (soro antiescorpiônico).'
  },
  {
    id: 'lactente_jovem_febre',
    nome: 'Lactente < 3 meses com febre',
    descricao: 'Temperatura axilar >= 37,8 °C (retal >= 38 °C) em menor de 90 dias, mesmo com bom estado geral. Risco elevado de infecção bacteriana grave (ITU, bacteremia, meningite, pneumonia) com sinais inespecíficos: recusa alimentar, gemência, hipotonia, hipotermia, letargia, apneia, icterícia.',
    acao: 'Avaliar em unidade com exames: hemograma, PCR, urina 1 e urocultura, hemocultura; punção lombar em < 28 dias e em qualquer < 90 dias com toxemia ou exames alterados; < 28 dias: internar e antibiótico empírico (ampicilina + gentamicina ou cefotaxima); 29–90 dias: conduzir conforme critérios de baixo risco; evitar ceftriaxona em RN ictérico; gota espessa se mãe com malária na gestação ou área endêmica.'
  },
  {
    id: 'cianose',
    nome: 'Cianose central',
    descricao: 'Coloração azulada de lábios, língua e mucosas (central); cianose apenas de extremidades pode ser por frio. Verificar SpO2. Cianose central persistente sugere hipoxemia grave, cardiopatia congênita, hipertensão pulmonar ou metemoglobinemia (exposição a nitratos, dapsona, anilinas).',
    acao: 'O2 imediato; avaliar via aérea e respiração; se RN sem melhora com O2, considerar cardiopatia congênita dependente do canal (teste da hiperóxia, prostaglandina conforme protocolo de referência); considerar metemoglobinemia se SpO2 não corresponde ao quadro; suporte ventilatório e transferência.'
  },
  {
    id: 'estridor',
    nome: 'Estridor',
    descricao: 'Ruído inspiratório agudo por obstrução de via aérea superior. Grave quando presente em repouso, com tiragem, agitação ou sonolência, cianose, sialorreia, voz abafada, posição em tripé (epiglotite), início súbito com engasgo (corpo estranho) ou febre alta com toxemia (traqueíte bacteriana, abscesso retrofaríngeo).',
    acao: 'Manter a criança calma no colo; não forçar exame da orofaringe se suspeita de epiglotite; O2; laringotraqueíte: dexametasona VO/IM conforme protocolo e adrenalina inalatória se estridor em repouso; corpo estranho com asfixia: manobras de desobstrução; preparar via aérea avançada e transferir.'
  },
  {
    id: 'apneia',
    nome: 'Apneia',
    descricao: 'Pausa respiratória >= 20 s, ou menor quando acompanhada de bradicardia, cianose, palidez ou hipotonia. Frequente em RN prematuro, bronquiolite em < 2 meses, coqueluche, sepse, meningite, convulsão, hipoglicemia e RGE grave.',
    acao: 'Estimulação tátil; O2; ventilação com bolsa-válvula-máscara se não retomar; monitorização contínua de FC e SpO2; glicemia; investigar sepse, meningite, coqueluche, bronquiolite; internar; considerar cafeína no prematuro conforme protocolo; transferir para unidade neonatal/pediátrica.'
  },
  {
    id: 'letargia',
    nome: 'Letargia (sinal geral de perigo)',
    descricao: 'Criança que não se move espontaneamente, não acorda ou acorda apenas com estímulo intenso, não interage, olhar vago, sem sorriso social; no lactente pode ser o único sinal de sepse, meningite, desidratação grave, hipoglicemia ou malária grave. Faz parte dos sinais gerais de perigo do AIDPI junto com incapacidade de beber/mamar, vômito de tudo e convulsão.',
    acao: 'ABC, O2, glicemia capilar, acesso venoso; avaliar sepse, meningite, desidratação, malária (gota espessa/teste rápido); tratar hipoglicemia; antibiótico empírico se suspeita de infecção bacteriana grave; encaminhar urgente para unidade de maior complexidade.'
  },
  {
    id: 'ictericia_intensa',
    nome: 'Icterícia intensa',
    descricao: 'No RN: icterícia que atinge palmas e plantas (zona 5 de Kramer), início < 24 h de vida, bilirrubina total acima da linha de fototerapia para idade em horas, ou icterícia com letargia, hipotonia, choro agudo (encefalopatia bilirrubínica). Na criança maior: icterícia com febre, alteração da consciência, sangramento, colúria ou oligúria (hepatite fulminante, malária grave, leptospirose, febre amarela, hemólise aguda).',
    acao: 'RN: bilirrubina total e frações, tipagem sanguínea e Coombs, hematócrito; fototerapia ou exsanguineotransfusão conforme nomograma. Criança: AST, ALT, bilirrubinas, TAP/coagulograma, glicemia, gota espessa; isolar e notificar suspeita de hepatite A e febre amarela; suporte e transferência se sinais de falência hepática.'
  },
  {
    id: 'edema_pulmonar',
    nome: 'Edema pulmonar / SDRA',
    descricao: 'Dispneia progressiva, taquipneia, estertores crepitantes bilaterais, tosse com secreção rósea, hipoxemia refratária, piora após hidratação venosa. Pode ocorrer em malária grave, dengue com extravasamento, leptospirose, escorpionismo grave, glomerulonefrite aguda, miocardite e síndrome cardiopulmonar por hantavírus.',
    acao: 'Cabeceira elevada; O2 em alto fluxo, VNI ou intubação conforme gravidade; reduzir ou suspender fluidos; furosemida se hipervolemia (evitar em dengue com choque); radiografia de tórax; monitorização e UTI pediátrica.'
  },
  {
    id: 'anafilaxia',
    nome: 'Anafilaxia',
    descricao: 'Início súbito (minutos a poucas horas) após picada, medicamento, soro antiveneno ou alimento: urticária ou angioedema associados a dispneia, sibilância, estridor, rouquidão, hipotensão, síncope, vômitos ou dor abdominal intensa. Pode ocorrer sem lesão de pele.',
    acao: 'Adrenalina IM 0,01 mg/kg (solução 1 mg/mL; máx. 0,3 mg na criança e 0,5 mg no adolescente) na face lateral da coxa, repetir em 5–15 min se necessário; decúbito dorsal com pernas elevadas; O2; cristaloide 20 mL/kg se hipotensão; broncodilatador se sibilância; anti-histamínico e corticoide são adjuvantes; observar 6–24 h pelo risco de reação bifásica.'
  }
];
