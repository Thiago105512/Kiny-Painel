window.PED = window.PED || {}; var PED = window.PED; PED.data = PED.data || {};

// PED.data.acidentes — acidentes da infância no cotidiano (queimadura, intoxicação,
// engasgo, afogamento, TCE, queda, mordedura, choque elétrico, ferimentos).
// Apoio à decisão: nunca "o diagnóstico é" ou "o tratamento é"; usar "considerar",
// "avaliar", "compatível com", "confirmar conforme protocolo/bula".
// Estrutura: protocolos (esquema de PED.data.doencas), queixas (esquema de PED.data.queixas),
// ferramentas (Lund-Browder, Parkland, PECARN, profilaxia de raiva e tétano, agentes tóxicos).

PED.data.acidentes = {
  protocolos: [],
  queixas: [],
  ferramentas: {},
  fontes: [
    { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
    { nome: 'Normas Técnicas de Profilaxia da Raiva Humana – Ministério da Saúde', ano: 2014 },
    { nome: 'Nota Informativa sobre o esquema de profilaxia antirrábica humana – Ministério da Saúde', ano: 2022 },
    { nome: 'Tratado de Pediatria e documentos científicos – Sociedade Brasileira de Pediatria', ano: 2022 },
    { nome: 'PALS – Pediatric Advanced Life Support, American Heart Association', ano: 2020 },
    { nome: 'Nelson Textbook of Pediatrics', ano: 2020 },
    { nome: 'OMS/OPAS – Pocket Book of Hospital Care for Children e World Report on Child Injury Prevention', ano: 2013 },
    { nome: 'Centros de Informação e Assistência Toxicológica (CIATox) e Disque Intoxicação – Ministério da Saúde / Anvisa', ano: 2023 }
  ],
  atualizadoEm: '2026-09'
};

// ============================================================ 1. QUEIMADURA
PED.data.acidentes.protocolos.push({
  id: 'queimadura',
  nome: 'Queimadura na criança',
  categoria: 'acidente',
  amazonia: true,
  cid10: 'T20 a T32',
  tags: ['dor_local', 'feridas', 'lesoes_pele', 'dispneia', 'estridor', 'tosse', 'febre', 'palidez', 'desidratacao', 'vomitos'],
  definicao: 'Lesão dos tecidos de revestimento causada por agente térmico, elétrico, químico ou por radiação, classificada pela profundidade (primeiro grau, segundo grau superficial, segundo grau profundo e terceiro grau) e pela extensão da superfície corporal queimada. Na criança, a pele é mais fina, a relação entre superfície e massa corporal é maior e a mesma exposição produz lesões mais profundas, maior perda de líquidos e maior risco de hipotermia do que no adulto.',
  epidemiologia: 'É uma das causas mais frequentes de atendimento e de internação por acidente em menores de 5 anos. A maior parte ocorre dentro de casa, com líquidos quentes: água fervente, café, leite, caldo, óleo de cozinha e, na região amazônica, água do banho aquecida no fogão, panela de açaí, farinha e beiju quentes, caldeirão de peixe e forno de farinha de mandioca. O fogão a lenha no chão, a lamparina, a vela e o querosene usados onde a energia elétrica falta ou oscila, além do uso de álcool líquido para acender o fogo e a churrasqueira, respondem por queimaduras extensas e por incêndios em casas de madeira e palafitas. A escaldadura predomina em lactentes e pré-escolares; a queimadura por chama e por eletricidade predomina em escolares e adolescentes. Em comunidades ribeirinhas e do interior, o tempo até um centro de queimados pode ser de muitas horas ou dias, o que torna decisivos o resfriamento correto nos primeiros minutos, a analgesia, a reposição volêmica iniciada localmente e o transporte com cobertura limpa e prevenção de hipotermia. Queimaduras com padrão em luva, em bota, em nádegas ou com marca de objeto devem levantar suspeita de maus-tratos.',
  agente: 'Agentes térmicos por líquido quente (escaldadura), chama, superfície quente, vapor ou brasa; agentes químicos (soda cáustica, ácido de bateria, cal, desentupidor, produtos de limpeza concentrados); corrente elétrica; e radiação solar. Na infância predomina amplamente a escaldadura por líquido quente.',
  transmissao: 'Não se aplica: trata-se de agravo por causa externa, não transmissível. A lesão depende da temperatura do agente, do tempo de contato, da espessura da pele e da presença de roupa, fralda ou tecido embebido que mantém o calor sobre a pele.',
  incubacao: 'Não se aplica. A lesão é imediata, mas a profundidade real só se define nas primeiras 48 a 72 horas, e a queimadura pode aprofundar-se nesse período; o edema e a perda de líquidos são máximos nas primeiras 24 horas.',
  manifestacoes: [
    'Primeiro grau: eritema, dor e calor local, sem bolhas, atingindo apenas a epiderme, com cicatrização em 3 a 7 dias e sem sequela. Não entra no cálculo da superfície corporal queimada.',
    'Segundo grau superficial: bolhas, base rósea e úmida, muito dolorosa, com enchimento capilar presente; cicatrização habitual em 7 a 14 dias, com risco baixo de cicatriz.',
    'Segundo grau profundo: base pálida ou salpicada, menos dolorosa, enchimento capilar lento ou ausente, com cicatrização em mais de 3 semanas e alto risco de cicatriz hipertrófica e retração.',
    'Terceiro grau: pele esbranquiçada, marrom, acastanhada ou carbonizada, seca, endurecida, indolor pela destruição das terminações nervosas, sem enchimento capilar; não cicatriza espontaneamente e exige enxerto.',
    'Dor intensa e desproporcional ao aspecto nas queimaduras superficiais; queimadura indolor sugere lesão profunda.',
    'Perda de líquidos, hipovolemia e choque em queimaduras extensas, com taquicardia, palidez, extremidades frias, oligúria e sede.',
    'Hipotermia, favorecida por curativos molhados, exposição prolongada e resfriamento excessivo, especialmente em lactentes.',
    'Sinais de lesão inalatória e de queimadura de via aérea: queimadura de face, de cílios, de sobrancelha ou de vibrissas nasais, fuligem em narinas, boca ou escarro, rouquidão, tosse, estridor, disfonia, sibilância, dispneia e história de incêndio em ambiente fechado.',
    'Queimadura circunferencial de membro, com edema progressivo, diminuição de pulso, palidez, parestesia e dor à extensão passiva (risco de síndrome compartimental); queimadura circunferencial de tórax com restrição da expansão torácica.',
    'Infecção da ferida em evolução tardia: dor crescente, exsudato purulento, odor, aprofundamento da lesão, celulite perilesional e febre.'
  ],
  sinaisAlarme: [
    'Suspeita de lesão inalatória: incêndio em ambiente fechado, fuligem em face, narinas ou escarro, rouquidão, estridor, tosse persistente ou queimadura de face e pescoço.',
    'Superfície corporal queimada extensa para a idade, com sinais de má perfusão, taquicardia, hipotensão ou oligúria.',
    'Queimadura de terceiro grau em qualquer extensão.',
    'Queimadura circunferencial de membro, de pescoço ou de tórax.',
    'Queimadura elétrica de alta tensão ou queimadura química.',
    'Alteração do nível de consciência (avaliar intoxicação por monóxido de carbono ou cianeto, trauma associado e hipóxia).',
    'Hipotermia (temperatura central abaixo de 36 graus), frequente após resfriamento prolongado em lactentes.',
    'Queimadura em face, olhos, orelhas, mãos, pés, períneo, genitália ou grandes articulações.',
    'História incompatível com a lesão, demora inexplicada na procura por atendimento, padrão em luva, em bota, simétrico, em nádegas ou marca de objeto (avaliar maus-tratos).',
    'Lactente menor de 1 ano com qualquer queimadura de segundo grau, pelo risco desproporcional de desidratação e hipotermia.'
  ],
  diagnosticoDiferencial: ['intoxicacao_fumaca', 'choque_eletrico', 'ingestao_caustico', 'síndrome da pele escaldada estafilocócica', 'síndrome de Stevens-Johnson e necrólise epidérmica tóxica', 'impetigo bolhoso', 'epidermólise bolhosa', 'dermatite de contato por planta fotossensibilizante (fitofotodermatose por limão)', 'queimadura intencional e maus-tratos'],
  exames: ['hemograma', 'eletrolitos', 'glicemia', 'ureia', 'creatinina', 'gasometria', 'lactato', 'urina_1', 'cpk', 'radiografia_torax', 'carboxihemoglobina quando houver exposição a fumaça e disponibilidade', 'fotografia ou mapa corporal da lesão para acompanhamento da evolução'],
  criteriosDiagnosticos: [
    'Avaliação clínica: identificar o agente, o tempo de contato, o ambiente (aberto ou fechado) e o horário exato da queimadura, que é o marco zero para o cálculo da reposição volêmica.',
    'Classificar a profundidade por segmento: primeiro grau (eritema sem bolha), segundo grau superficial (bolha, base rósea, dolorosa), segundo grau profundo (base pálida, pouco dolorosa) e terceiro grau (escara seca, indolor).',
    'Estimar a superfície corporal queimada com a tabela de Lund-Browder, que corrige a proporção por faixa etária, e não com a regra dos nove do adulto: na criança pequena a cabeça representa até cerca de 19 por cento da superfície e cada membro inferior bem menos do que no adulto, de modo que a regra dos nove superestima os membros e subestima a cabeça.',
    'Para queimaduras pequenas, dispersas ou salpicadas, considerar a regra da palma: a palma da mão da própria criança, incluindo os dedos, corresponde a cerca de 1 por cento da superfície corporal.',
    'Incluir no cálculo apenas as áreas de segundo e terceiro graus; o eritema de primeiro grau não entra.',
    'Reavaliar a extensão e a profundidade em 24 a 72 horas, porque a lesão pode aprofundar-se e a estimativa inicial costuma mudar.',
    'Pesquisar ativamente lesão inalatória em toda queimadura ocorrida em ambiente fechado, com fumaça ou com queimadura de face.',
    'Considerar avaliação de maus-tratos quando a história for inconsistente, mutável ou incompatível com o desenvolvimento da criança; registrar em prontuário e notificar conforme a Ficha de Notificação de Violência Interpessoal e Autoprovocada.'
  ],
  classificacaoGravidade: [
    { nivel: 'Pequeno queimado', criterios: 'Queimadura de segundo grau em menos de 10 por cento da superfície corporal, sem envolvimento de face, mãos, pés, períneo ou grandes articulações, sem lesão inalatória, sem queimadura elétrica ou química e sem comorbidade. Considerar manejo ambulatorial com curativo, analgesia, profilaxia antitetânica e retorno programado em 24 a 48 horas.' },
    { nivel: 'Médio queimado', criterios: 'Queimadura de segundo grau entre 10 e 20 por cento da superfície corporal, ou terceiro grau em menos de 5 por cento, ou acometimento de áreas nobres, ou lactente menor de 1 ano, ou impossibilidade de curativo e reavaliação em casa. Considerar internação, reposição volêmica, analgesia sistêmica e avaliação por serviço de referência.' },
    { nivel: 'Grande queimado', criterios: 'Queimadura de segundo grau em 20 por cento ou mais da superfície corporal, ou terceiro grau em 5 por cento ou mais, ou lesão inalatória, ou queimadura elétrica de alta tensão, ou queimadura química extensa, ou queimadura circunferencial, ou trauma associado. Considerar via aérea, reposição volêmica formal, analgesia potente, sondagem vesical e transferência para centro de tratamento de queimados.' }
  ],
  tratamento: [
    'Primeiros minutos: interromper o processo de queimadura, afastar a criança do agente, remover roupas, fralda e adornos que retenham calor, tomando cuidado para não arrancar tecido aderido à pele.',
    'Resfriar a área queimada com água corrente em temperatura ambiente, por cerca de 20 minutos, idealmente iniciando nos primeiros minutos e ainda útil até cerca de 3 horas após a queimadura. Nunca usar gelo, água gelada, bolsa térmica congelada ou imersão prolongada em água muito fria, que aprofundam a lesão por vasoconstrição e causam hipotermia.',
    'Nunca aplicar manteiga, margarina, óleo, gordura, banha, pasta de dente, borra ou pó de café, sal, açúcar, clara de ovo, urina, tinta, folhas, ervas, sumo de planta, mel não estéril ou qualquer remédio caseiro: aumentam a contaminação, mascaram a profundidade e dificultam a limpeza.',
    'Manter a criança aquecida durante e após o resfriamento, resfriando a ferida mas não a criança: cobrir as áreas não tratadas, usar manta térmica ou lençol limpo e seco, controlar a temperatura central, sobretudo em lactentes e em queimaduras extensas.',
    'Via aérea: em suspeita de lesão inalatória, ofertar oxigênio a alto fluxo com máscara com reservatório e considerar intubação precoce, antes que o edema progrida, porque a via aérea pediátrica é estreita e o edema evolui rapidamente; usar tubo de calibre adequado e não retardar a decisão em criança com estridor, rouquidão ou queimadura extensa de face e pescoço.',
    'Circulação: acesso venoso periférico em área não queimada quando possível; considerar acesso intraósseo se não houver acesso em criança grave. Iniciar reposição com Ringer lactato conforme a fórmula de Parkland em queimaduras de segundo e terceiro graus a partir de cerca de 10 a 15 por cento da superfície corporal em crianças, conforme protocolo do serviço.',
    'Fórmula de Parkland: 4 mL multiplicado pelo peso em quilogramas multiplicado pela porcentagem de superfície corporal queimada de Ringer lactato nas primeiras 24 horas, sendo metade nas primeiras 8 horas contadas a partir do horário da queimadura e a outra metade nas 16 horas seguintes. Atenção: na criança, o volume de manutenção deve ser somado ao volume da fórmula, porque a fórmula de Parkland foi concebida para adultos e não contempla as necessidades hídricas basais, maiores na criança; em menores de cerca de 20 a 30 kg é habitual acrescentar manutenção com solução contendo glicose para evitar hipoglicemia.',
    'Ajustar a infusão pela resposta e não pela conta: alvo habitual de diurese de 1 a 2 mL/kg/h em crianças menores de 30 kg e de 0,5 a 1 mL/kg/h nas maiores, com reavaliação de perfusão, frequência cardíaca, nível de consciência e lactato; evitar tanto a sub-reposição quanto a hiper-reposição, conforme protocolo do serviço.',
    'Analgesia precoce e generosa, antes da manipulação da ferida: a dor da queimadura é intensa e subtratada com frequência em crianças. Considerar analgésico simples em queimaduras pequenas e opioide por via intravenosa em queimaduras médias e grandes, sempre com monitorização; evitar via intramuscular em queimado extenso pela absorção errática.',
    'Limpeza com água limpa ou soro fisiológico e clorexidina degermante ou sabão neutro, conforme protocolo do serviço; desbridar tecido desvitalizado. Bolhas íntegras pequenas podem ser mantidas; bolhas rotas, muito tensas, em áreas de dobra ou que impeçam o curativo costumam ser desbridadas, conforme avaliação e protocolo local.',
    'Curativo com cobertura não aderente e pomada ou creme conforme disponibilidade do serviço (por exemplo, sulfadiazina de prata a 1 por cento ou cobertura com gaze vaselinada), trocado conforme protocolo e sempre que saturado ou sujo. Evitar sulfadiazina de prata na face e em recém-nascidos, conforme bula.',
    'Profilaxia antitetânica conforme a situação vacinal e o tipo de ferimento: a queimadura é considerada ferimento com risco de tétano.',
    'Não usar antibiótico sistêmico profilático de rotina em queimadura: reservar para infecção estabelecida, guiada por avaliação clínica e, quando possível, por cultura.',
    'Queimadura circunferencial com sinais de isquemia ou de restrição respiratória: avaliação cirúrgica urgente para eventual escarotomia, conforme serviço de referência.',
    'Queimadura química: remover roupas contaminadas com proteção do profissional, retirar o pó seco por escovação antes de irrigar (cal, cimento) e irrigar com água corrente abundante por tempo prolongado, sem tentar neutralizar o agente com ácido ou base.',
    'Manter jejum e considerar sonda nasogástrica em grandes queimados com íleo; iniciar nutrição enteral precocemente quando possível, pois o estado hipermetabólico é intenso.',
    'Elevar membros queimados, iniciar mobilização e posicionamento precoces para prevenir retração, e acionar fisioterapia e apoio psicológico quando disponíveis.',
    'Organizar transporte para centro de tratamento de queimados com analgesia, acesso venoso, reposição em curso, ferida coberta com campo limpo e seco e criança aquecida; registrar peso, horário da queimadura, volumes infundidos e diurese.'
  ],
  medicamentos: [
    { medId: 'ringer_lactato', esquema: 'Reposição volêmica pela fórmula de Parkland: 4 mL x peso (kg) x porcentagem de superfície corporal queimada nas primeiras 24 h, metade nas primeiras 8 h a partir do horário da queimadura. Em crianças, somar o volume de manutenção. Ajustar pela diurese e pela perfusão.' },
    { medId: 'soro_fisiologico', esquema: 'Expansão em sinais de choque: 10 a 20 mL/kg em bolus, reavaliando após cada alíquota; também usado para limpeza da ferida.' },
    { medId: 'glicose', esquema: 'Manutenção com solução contendo glicose em menores de cerca de 20 a 30 kg, pelo risco de hipoglicemia em jejum e estado hipermetabólico; monitorizar glicemia capilar.' },
    { medId: 'dipirona', esquema: 'Dor leve a moderada: 10 a 15 mg/kg/dose VO ou IV a cada 6 h, conforme bula.' },
    { medId: 'paracetamol', esquema: 'Dor leve a moderada: 10 a 15 mg/kg/dose VO a cada 6 h, conforme bula.' },
    { medId: 'ibuprofeno', esquema: 'Dor e inflamação em queimadura pequena, na criança hidratada e sem sangramento ou instabilidade: 5 a 10 mg/kg/dose VO a cada 6 a 8 h, conforme bula. Evitar em hipovolemia e em lesão renal.' },
    { medId: null, nome: 'Analgésico opioide (morfina ou fentanil)', esquema: 'Dor intensa e antes de curativos em queimadura média ou grande: dose, via e monitorização conforme protocolo do serviço e bula; preferir via intravenosa titulada, com monitorização respiratória. Confirmar conforme protocolo/bula.', verificar: true },
    { medId: 'cetamina', esquema: 'Analgesia e sedação para procedimento doloroso, como desbridamento e troca de curativo extenso, conforme protocolo do serviço, com monitorização e profissional habilitado. Confirmar conforme protocolo/bula.', verificar: true },
    { medId: 'midazolam', esquema: 'Ansiólise associada à analgesia para procedimento, conforme protocolo do serviço, com monitorização contínua. Confirmar conforme protocolo/bula.', verificar: true },
    { medId: null, nome: 'Sulfadiazina de prata 1 por cento', esquema: 'Cobertura tópica de queimadura de segundo grau, conforme protocolo do serviço e bula; evitar na face e em recém-nascidos. Confirmar conforme protocolo/bula.', verificar: true },
    { medId: null, nome: 'Vacina antitetânica (DTP, DT, dT ou dTpa conforme a idade) e imunoglobulina antitetânica', esquema: 'Profilaxia conforme a situação vacinal e a característica do ferimento, seguindo as orientações do Ministério da Saúde. A queimadura é ferimento com risco de tétano.' },
    { medId: 'ondansetrona', esquema: 'Náusea e vômitos associados à dor ou ao opioide: 0,15 mg/kg/dose IV (máximo 8 mg), conforme bula.' }
  ],
  criteriosInternacao: [
    'Queimadura de segundo grau em 10 por cento ou mais da superfície corporal em crianças (limiar menor em lactentes), conforme protocolo do serviço.',
    'Queimadura de terceiro grau em qualquer extensão.',
    'Queimadura de face, olhos, orelhas, mãos, pés, períneo, genitália ou grandes articulações.',
    'Queimadura circunferencial de membro, pescoço ou tórax.',
    'Suspeita de lesão inalatória ou exposição a fumaça em ambiente fechado.',
    'Queimadura elétrica de qualquer voltagem com passagem de corrente pelo corpo e queimadura química.',
    'Dor não controlada por via oral, vômitos ou impossibilidade de hidratação oral.',
    'Lactente menor de 1 ano, desnutrição, comorbidade relevante ou imunossupressão.',
    'Suspeita de maus-tratos ou de negligência, ou vulnerabilidade social importante.',
    'Impossibilidade de curativo e de reavaliação frequente, situação comum em comunidades ribeirinhas e do interior distante.'
  ],
  criteriosUTI: [
    'Necessidade de intubação ou de ventilação mecânica por lesão inalatória ou por insuficiência respiratória.',
    'Queimadura extensa com instabilidade hemodinâmica ou choque que não responde à reposição inicial.',
    'Intoxicação associada por monóxido de carbono ou por cianeto com alteração de consciência ou acidose grave.',
    'Queimadura elétrica de alta tensão com arritmia, rabdomiólise ou lesão renal aguda.',
    'Lesão renal aguda, distúrbio metabólico grave ou sepse.',
    'Necessidade de escarotomia de urgência ou de monitorização invasiva.'
  ],
  criteriosAlta: [
    'Dor controlada com analgesia por via oral.',
    'Ferida limpa, com curativo definido e responsável capaz de realizá-lo ou com curativo garantido em unidade de saúde acessível.',
    'Aceitação de líquidos e alimentos, diurese adequada e ausência de sinais de desidratação.',
    'Ausência de sinais de infecção em progressão.',
    'Profilaxia antitetânica avaliada e registrada.',
    'Responsável orientado quanto a sinais de alarme, cuidados com a ferida, proteção solar da área e prevenção de novos acidentes.',
    'Retorno agendado em 24 a 48 horas e articulação com a unidade de saúde mais próxima ou com a equipe fluvial para os curativos.',
    'Afastada suspeita de maus-tratos ou, quando houver suspeita, notificação e articulação com a rede de proteção realizadas antes da alta.'
  ],
  orientacoes: [
    'No momento do acidente, tirar a criança do contato com o agente e colocar a área queimada debaixo de água corrente em temperatura ambiente por cerca de 20 minutos. Água da torneira serve; não precisa ser gelada.',
    'Nunca colocar gelo, água com gelo, manteiga, margarina, óleo, banha, pasta de dente, pó ou borra de café, sal, açúcar, clara de ovo, tinta, folha, erva ou qualquer outro remédio caseiro sobre a queimadura.',
    'Não estourar as bolhas e não passar nada por conta própria; cobrir com um pano limpo e seco e levar a criança ao serviço de saúde.',
    'Enquanto molha a queimadura, manter o resto do corpo da criança agasalhado, porque criança pequena esfria muito rápido.',
    'Se a roupa estiver grudada na pele, não puxar: cortar ao redor e deixar o que está aderido para a equipe de saúde retirar.',
    'Levar o cartão de vacina para a equipe avaliar a vacina contra o tétano.',
    'Fazer o curativo como foi orientado, manter a área limpa e seca e não usar pomadas ou chás por conta própria.',
    'Voltar imediatamente se houver febre, dor que aumenta, pus, cheiro ruim, vermelhidão que se espalha ao redor da ferida, se a criança ficar prostrada, parar de urinar ou recusar líquidos.',
    'Depois que a ferida fechar, proteger a área do sol por pelo menos 6 meses a 1 ano com roupa e sombra, porque a pele nova mancha com facilidade.',
    'Fazer os retornos marcados: a queimadura pode deixar retração e precisar de acompanhamento e de fisioterapia para a criança não perder movimento.'
  ],
  retorno: 'Reavaliação em 24 a 48 horas para redefinir a profundidade real, que muda nesse período, e depois a cada 2 a 3 dias até a epitelização, com troca de curativo conforme a cobertura utilizada. Acompanhamento semanal ou quinzenal após o fechamento, por pelo menos 6 a 12 meses em queimaduras profundas, para vigiar cicatriz hipertrófica, retração e limitação funcional. Retorno imediato diante de febre, dor crescente, secreção purulenta, odor, vermelhidão em expansão, prostração ou redução da diurese.',
  prevencao: [
    'Cozinhar com os cabos das panelas virados para dentro do fogão e usar preferencialmente as bocas de trás.',
    'Não carregar criança no colo enquanto cozinha, serve comida quente, coa café ou mexe panela de açaí, de caldo ou de farinha.',
    'Não deixar a criança circular na área da cozinha, do fogão a lenha, do forno de farinha e da churrasqueira; usar barreira física quando possível.',
    'Testar sempre a temperatura da água do banho com o dorso da mão ou com o cotovelo antes de colocar a criança, e colocar primeiro a água fria e depois a quente na bacia.',
    'Manter fósforos, isqueiros, velas, lamparinas, álcool, querosene, gasolina e diesel guardados fora do alcance e da vista das crianças.',
    'Nunca usar álcool líquido para acender ou reavivar fogo, fogão a lenha ou churrasqueira.',
    'Manter tomadas protegidas, evitar fios desencapados, emendas improvisadas e sobrecarga de extensões, situações comuns em ligações improvisadas.',
    'Em casas de madeira e palafitas, planejar com a família uma rota de saída em caso de incêndio e combinar um ponto de encontro.',
    'Orientar a comunidade e as escolas sobre o primeiro atendimento correto: água corrente por 20 minutos, nada de gelo nem de substâncias caseiras, e procura imediata do serviço de saúde.',
    'Manter o calendário vacinal, incluindo a vacinação antitetânica, em dia em toda a família.'
  ],
  fontes: [
    { nome: 'Tratado de Pediatria – Sociedade Brasileira de Pediatria', ano: 2022 },
    { nome: 'Cartilha para tratamento de emergência das queimaduras – Ministério da Saúde', ano: 2012 },
    { nome: 'Guia de Vigilância em Saúde (profilaxia do tétano acidental) – Ministério da Saúde', ano: 2024 },
    { nome: 'OMS – A WHO plan for burn prevention and care', ano: 2008 },
    { nome: 'Nelson Textbook of Pediatrics', ano: 2020 }
  ],
  atualizadoEm: '2026-09'
});

// ========================================== 2. INTOXICAÇÃO MEDICAMENTOSA
PED.data.acidentes.protocolos.push({
  id: 'intoxicacao_medicamentosa',
  nome: 'Intoxicação exógena por medicamento',
  categoria: 'acidente',
  amazonia: false,
  cid10: 'T36 a T50',
  tags: ['alteracao_consciencia', 'vomitos', 'convulsao', 'sudorese', 'palidez', 'cianose', 'dispneia', 'dor_abdominal', 'desidratacao'],
  definicao: 'Exposição aguda a um ou mais medicamentos em dose capaz de produzir efeito tóxico, quase sempre acidental em menores de 5 anos e frequentemente intencional em adolescentes. A criança pequena atinge doses tóxicas com quantidades muito pequenas, e há um grupo de medicamentos em que um único comprimido de adulto pode ser letal para um lactente ou pré-escolar.',
  epidemiologia: 'Os medicamentos são a principal causa de intoxicação exógena notificada em crianças no Brasil, com dois picos etários bem definidos: o pré-escolar entre 1 e 4 anos, que ingere por exploração, e o adolescente, em contexto de autoagressão e sofrimento psíquico. A exposição domiciliar predomina e envolve com frequência medicamento de uso do próprio cuidador ou de avós, guardado na bolsa, na mesa de cabeceira, na cozinha ou em caixa de remédios ao alcance. Erro de dose e de diluição por parte do cuidador, uso de colher caseira em vez do dosador, confusão entre apresentações pediátrica e adulta e automedicação são causas frequentes e evitáveis. Em municípios do interior e em comunidades ribeirinhas, o acesso ao atendimento é demorado e a orientação telefônica ao cuidador pelas primeiras horas pode mudar o desfecho. Intoxicação exógena é agravo de notificação compulsória.',
  agente: 'Qualquer medicamento em dose excessiva. Os de maior letalidade em pequenas quantidades na criança pequena incluem antidepressivo tricíclico, bloqueador de canal de cálcio, betabloqueador (sobretudo propranolol), opioide (metadona, morfina, codeína, tramadol), hipoglicemiante oral do grupo das sulfonilureias (glibenclamida, clorpropamida, glimepirida), antiarrítmico (flecainida, quinidina, amiodarona), cânfora, teofilina, clonidina e outros imidazolínicos presentes em descongestionantes nasais, antimalárico como a cloroquina e o metilsalicilato de uso tópico. Outros agentes muito frequentes: paracetamol, anti-inflamatório não esteroidal, sulfato ferroso, benzodiazepínico, anti-histamínico, anticonvulsivante e antipsicótico.',
  transmissao: 'Não se aplica: agravo por causa externa. A via mais comum é a oral; também ocorrem exposições por via dérmica, ocular, nasal e por administração equivocada de medicamento injetável.',
  incubacao: 'Não se aplica. O tempo até o efeito varia conforme o agente: minutos a 1 hora para benzodiazepínicos e opioides; 2 a 6 horas para a maioria dos comprimidos de liberação imediata; até 12 a 24 horas ou mais para formulações de liberação prolongada, sulfonilureias e paracetamol, cuja lesão hepática se expressa entre 24 e 72 horas.',
  manifestacoes: [
    'Sonolência, ataxia, fala arrastada, hipotonia e coma: compatível com benzodiazepínico, anti-histamínico, anticonvulsivante, álcool, opioide, clonidina ou antipsicótico.',
    'Miose intensa com bradipneia e coma: compatível com síndrome opioide; também com clonidina e outros imidazolínicos.',
    'Midríase, pele seca e quente, rubor facial, febre, retenção urinária, agitação e delirium: compatível com síndrome anticolinérgica (anti-histamínico, antidepressivo tricíclico, antiespasmódico, planta do gênero Brugmansia).',
    'Taquicardia com alargamento do QRS, hipotensão, convulsão e rebaixamento: compatível com antidepressivo tricíclico, quadro de deterioração rápida.',
    'Bradicardia com hipotensão: compatível com betabloqueador, bloqueador de canal de cálcio, digoxina ou clonidina; a hiperglicemia sugere bloqueador de canal de cálcio e a hipoglicemia sugere betabloqueador.',
    'Hipoglicemia com sudorese, palidez, tremor, irritabilidade, convulsão ou coma: compatível com sulfonilureia, insulina, betabloqueador ou álcool; a hipoglicemia por sulfonilureia é prolongada e recorrente.',
    'Vômitos, taquipneia, sudorese, zumbido, agitação e acidose metabólica com alcalose respiratória: compatível com intoxicação por salicilato.',
    'Vômitos repetidos, dor abdominal, taquicardia, agitação, tremor, hipocalemia e arritmia: compatível com teofilina ou beta-agonista.',
    'Paracetamol: fase inicial de 0 a 24 horas pobre em sintomas ou com náusea e vômitos; entre 24 e 72 horas, dor em hipocôndrio direito e elevação de transaminases; após 72 horas, pico de hepatotoxicidade com icterícia, encefalopatia e coagulopatia.',
    'Ferro: vômitos e diarreia, por vezes com sangue, nas primeiras 6 horas; período de aparente melhora enganoso entre 6 e 24 horas; depois choque, acidose metabólica, hepatotoxicidade e, tardiamente, estenose pilórica cicatricial.',
    'Distonia aguda, crise oculogírica, torcicolo e trismo: compatível com antipsicótico, metoclopramida ou bromoprida.',
    'Criança encontrada com cartela vazia, frasco aberto ou comprimidos na boca, ainda assintomática: a ausência de sintomas na primeira hora não afasta intoxicação grave.'
  ],
  sinaisAlarme: [
    'Rebaixamento do nível de consciência, coma ou convulsão.',
    'Bradipneia, apneia, hipoventilação ou saturação baixa.',
    'Bradicardia, taquicardia com instabilidade, hipotensão ou má perfusão.',
    'Alargamento do QRS acima de 100 ms no eletrocardiograma (sugere bloqueio de canal de sódio, típico do antidepressivo tricíclico).',
    'Hipoglicemia, sobretudo se recorrente após correção.',
    'Ingestão de um dos agentes que matam com um ou poucos comprimidos, mesmo em criança assintomática.',
    'Ingestão de formulação de liberação prolongada ou de dose desconhecida.',
    'Vômitos com sangue, dor abdominal intensa ou acidose metabólica.',
    'Adolescente com ingestão intencional, mesmo com quantidade referida como pequena.',
    'História inconsistente, exposição repetida ou suspeita de administração deliberada por terceiros.'
  ],
  diagnosticoDiferencial: ['intoxicacao_domestica', 'intoxicacao_planta', 'meningite', 'sepse', 'traumatismo_cranioencefalico', 'hipoglicemia de outras causas e erro inato do metabolismo', 'cetoacidose diabética', 'encefalite', 'estado pós-ictal', 'abuso de substâncias em adolescentes'],
  exames: ['glicemia', 'gasometria', 'eletrolitos', 'hemograma', 'ureia', 'creatinina', 'ast', 'alt', 'coagulograma', 'lactato', 'urina_1', 'eletrocardiograma com medida de QRS e QTc', 'dosagem sérica de paracetamol a partir de 4 h da ingestão, quando disponível', 'dosagem sérica de salicilato, ferro, digoxina, lítio, fenitoína, fenobarbital e carbamazepina conforme o agente e a disponibilidade', 'radiografia de abdome em ingestão de ferro ou de comprimidos radiopacos'],
  criteriosDiagnosticos: [
    'História de exposição, com identificação do medicamento, da apresentação, da dose máxima possivelmente ingerida (calcular sempre pelo pior cenário, considerando todos os comprimidos que faltam), do horário e da via.',
    'Pedir que a família traga a cartela, o frasco, a receita ou fotografe a embalagem; em criança pequena, considerar que a ingestão pode ter sido múltipla.',
    'Reconhecimento de síndrome toxicológica (toxíndrome) pela combinação de pupilas, pele, mucosas, frequência cardíaca, pressão, temperatura, ruídos intestinais e nível de consciência.',
    'Glicemia capilar imediata em toda criança com rebaixamento ou convulsão.',
    'Eletrocardiograma em toda suspeita de ingestão de antidepressivo tricíclico, antiarrítmico, betabloqueador, bloqueador de canal de cálcio, antipsicótico, cloroquina ou agente desconhecido.',
    'Dosagem sérica de paracetamol entre 4 e 24 horas da ingestão aguda, interpretada no nomograma de Rumack-Matthew, que orienta a indicação de N-acetilcisteína; o nomograma não se aplica a ingestões crônicas, repetidas ou de horário desconhecido, situações em que se considera tratar.',
    'Contato precoce com o Centro de Informação e Assistência Toxicológica pelo Disque Intoxicação 0800 722 6001 para orientação sobre dose tóxica, tempo de observação e antídoto.',
    'Notificar o caso conforme a ficha de intoxicação exógena do Sistema de Informação de Agravos de Notificação.'
  ],
  classificacaoGravidade: [
    { nivel: 'Exposição de baixo risco', criterios: 'Agente de baixa toxicidade, dose abaixo do limiar tóxico conhecido, criança assintomática e horário da ingestão bem definido. Considerar orientação e observação domiciliar acordada com o CIATox, quando o acesso ao serviço estiver garantido.' },
    { nivel: 'Intoxicação leve a moderada', criterios: 'Sintomas presentes mas sem instabilidade: sonolência leve, vômitos, taquicardia isolada, agitação. Considerar observação hospitalar, monitorização, descontaminação quando indicada e exames conforme o agente.' },
    { nivel: 'Intoxicação grave', criterios: 'Rebaixamento importante, convulsão, arritmia, alargamento de QRS, instabilidade hemodinâmica, insuficiência respiratória, acidose grave, hipoglicemia refratária ou ingestão de agente de alta letalidade em qualquer quantidade. Considerar suporte avançado, antídoto e vaga em terapia intensiva.' }
  ],
  tratamento: [
    'Avaliação e estabilização pelo ABCDE, com monitorização cardíaca, oximetria e glicemia capilar imediata; a criança intoxicada grave morre por via aérea, hipoventilação, arritmia, convulsão ou hipoglicemia, não pela falta de antídoto.',
    'Nunca provocar vômito, com xarope de ipeca, com o dedo, com sal, com água morna ou por qualquer outro meio: o risco de aspiração supera qualquer benefício e a conduta foi abandonada.',
    'Nunca oferecer leite, água, suco, clara de ovo, óleo, café ou qualquer líquido para diluir ou neutralizar: pode acelerar a absorção, provocar vômito e atrapalhar a endoscopia quando esta for necessária.',
    'Carvão ativado: considerar em dose única de 1 g/kg (habitualmente até 50 g) por via oral ou por sonda, preferencialmente na primeira hora após a ingestão, na criança com via aérea protegida e ingestão de substância adsorvível em dose potencialmente tóxica. Pode ser útil além de 1 a 2 horas em ingestões de grande quantidade, de liberação prolongada ou de agentes que retardam o esvaziamento gástrico, conforme orientação do CIATox.',
    'Não usar carvão ativado quando houver rebaixamento de consciência sem via aérea protegida, ingestão de cáustico, de hidrocarboneto, de álcool, de metais como ferro e lítio, de sais inorgânicos ou de solventes, em obstrução ou perfuração do trato digestivo, ou quando houver risco de aspiração.',
    'Lavagem gástrica raramente indicada; considerar apenas em ingestão maciça de agente de alta letalidade, dentro de cerca de 1 hora, com via aérea protegida e segundo orientação do CIATox.',
    'Antídotos e medidas específicas, conforme o agente e a orientação do CIATox: N-acetilcisteína para paracetamol; naloxona para opioide; bicarbonato de sódio para alargamento de QRS por antidepressivo tricíclico; cálcio, glucagon e insulina em altas doses com glicose para bloqueador de canal de cálcio e betabloqueador; glicose e octreotida para hipoglicemia por sulfonilureia; deferoxamina para ferro; flumazenil apenas em situações muito selecionadas, pelo risco de convulsão; biperideno para distonia aguda.',
    'Hipoglicemia: corrigir prontamente com glicose intravenosa e manter infusão contínua; em intoxicação por sulfonilureia, a hipoglicemia recorre por muitas horas, exigindo observação por pelo menos 24 horas mesmo após a correção.',
    'Convulsão: considerar benzodiazepínico como primeira linha; em intoxicação por antidepressivo tricíclico e por teofilina, a convulsão agrava rapidamente a acidose e a arritmia.',
    'Hidratação e suporte conforme necessidade, com atenção a eletrólitos, função renal e equilíbrio ácido-base.',
    'Métodos de eliminação, como alcalinização urinária em salicilato ou hemodiálise em lítio, metanol, salicilato e teofilina, conforme indicação do CIATox e disponibilidade do serviço.',
    'Observação por tempo adequado ao agente, e não ao sintoma: agentes de ação retardada exigem observação prolongada mesmo em criança assintomática.',
    'Em adolescente com ingestão intencional, garantir avaliação de saúde mental antes da alta, manter vigilância durante a internação e envolver a rede de apoio e a rede de proteção.',
    'Avaliar negligência, exposição repetida e administração deliberada por terceiros; notificar violência quando houver suspeita.',
    'Notificar a intoxicação exógena e orientar a família sobre guarda segura de medicamentos antes da alta.'
  ],
  medicamentos: [
    { medId: null, nome: 'Carvão ativado', esquema: 'Dose única de 1 g/kg VO ou por sonda (habitualmente até 50 g), preferencialmente na primeira hora, com via aérea protegida e em substância adsorvível. Doses repetidas a cada 4 a 6 h apenas em agentes selecionados, conforme orientação do CIATox.' },
    { medId: null, nome: 'N-acetilcisteína', esquema: 'Antídoto do paracetamol. Esquema intravenoso habitual: 150 mg/kg em 1 h, seguido de 50 mg/kg em 4 h e 100 mg/kg em 16 h. Esquema oral: 140 mg/kg de ataque e 70 mg/kg a cada 4 h por 17 doses. Indicar conforme o nomograma de Rumack-Matthew a partir de 4 h, ou empiricamente quando a dose for tóxica e a dosagem não estiver disponível. Confirmar conforme protocolo/bula.', verificar: true },
    { medId: null, nome: 'Naloxona', esquema: 'Antídoto do opioide, na depressão respiratória: 0,01 a 0,1 mg/kg IV, IM, IO ou intranasal, repetindo conforme resposta; meia-vida curta, podendo exigir doses repetidas ou infusão contínua. Confirmar conforme protocolo/bula.', verificar: true },
    { medId: null, nome: 'Bicarbonato de sódio 8,4 por cento', esquema: 'Intoxicação por antidepressivo tricíclico com QRS acima de 100 ms, arritmia ou hipotensão: bolus de 1 a 2 mEq/kg IV, repetindo conforme QRS e pH, com monitorização de sódio e potássio. Confirmar conforme protocolo/bula.', verificar: true },
    { medId: 'glicose', esquema: 'Hipoglicemia: 0,5 a 1 g/kg IV (por exemplo, 2 a 5 mL/kg de glicose a 10 por cento em lactentes), seguida de infusão contínua; em sulfonilureia, manter infusão e observar por pelo menos 24 h.' },
    { medId: null, nome: 'Octreotida', esquema: 'Hipoglicemia refratária ou recorrente por sulfonilureia, associada à glicose: dose e intervalo conforme protocolo do serviço e orientação do CIATox. Confirmar conforme protocolo/bula.', verificar: true },
    { medId: null, nome: 'Deferoxamina', esquema: 'Intoxicação grave por ferro: infusão intravenosa conforme protocolo do serviço e orientação do CIATox, com monitorização hemodinâmica. Confirmar conforme protocolo/bula.', verificar: true },
    { medId: null, nome: 'Glucagon e cálcio (gluconato ou cloreto)', esquema: 'Intoxicação por betabloqueador e por bloqueador de canal de cálcio, associados a suporte hemodinâmico e, conforme protocolo, a insulina em altas doses com glicose. Doses conforme protocolo do serviço e orientação do CIATox. Confirmar conforme protocolo/bula.', verificar: true },
    { medId: 'diazepam', esquema: 'Convulsão associada à intoxicação: 0,2 a 0,3 mg/kg IV lento (máximo 10 mg), conforme bula; atenção à depressão respiratória quando houver coingestão de depressor.' },
    { medId: 'midazolam', esquema: 'Convulsão ou agitação grave: 0,1 a 0,2 mg/kg IV, IM ou IO (máximo habitual 10 mg), conforme bula e protocolo do serviço.' },
    { medId: null, nome: 'Biperideno', esquema: 'Distonia aguda por antipsicótico, metoclopramida ou bromoprida: dose conforme protocolo do serviço e bula. Confirmar conforme protocolo/bula.', verificar: true },
    { medId: 'soro_fisiologico', esquema: 'Expansão em hipotensão: 10 a 20 mL/kg em bolus, reavaliando após cada alíquota.' },
    { medId: 'adrenalina', esquema: 'Suporte hemodinâmico em choque refratário e na parada cardiorrespiratória, conforme protocolo de PALS.' },
    { medId: 'ondansetrona', esquema: 'Vômitos que impeçam a administração de carvão ativado ou de antídoto por via oral: 0,15 mg/kg/dose IV (máximo 8 mg), conforme bula; atenção ao prolongamento de QT em coingestões.' }
  ],
  criteriosInternacao: [
    'Qualquer sintoma atribuível à intoxicação.',
    'Ingestão de agente de alta letalidade em pequena dose (antidepressivo tricíclico, bloqueador de canal de cálcio, betabloqueador, opioide, sulfonilureia, antiarrítmico, cânfora, teofilina, clonidina, cloroquina), mesmo em criança assintomática.',
    'Ingestão de formulação de liberação prolongada.',
    'Dose ingerida desconhecida, horário desconhecido ou história inconsistente.',
    'Paracetamol em dose potencialmente tóxica ou com nível sérico acima da linha de tratamento.',
    'Ingestão de ferro com sintomas, com dose elevada ou com comprimidos visíveis na radiografia.',
    'Hipoglicemia documentada.',
    'Ingestão intencional em adolescente.',
    'Suspeita de negligência, de maus-tratos ou de administração deliberada.',
    'Domicílio distante, sem transporte ou sem condição de retorno rápido, situação frequente no interior e em comunidades ribeirinhas.'
  ],
  criteriosUTI: [
    'Coma, convulsão repetida ou necessidade de via aérea avançada.',
    'Arritmia, alargamento de QRS, bradicardia ou hipotensão que exijam antídoto e drogas vasoativas.',
    'Choque ou acidose metabólica grave.',
    'Necessidade de infusão contínua de antídoto, de insulina em altas doses ou de método dialítico.',
    'Hipoglicemia refratária apesar da infusão de glicose.',
    'Insuficiência hepática aguda por paracetamol, com encefalopatia ou coagulopatia.'
  ],
  criteriosAlta: [
    'Período de observação adequado ao agente cumprido, com criança assintomática.',
    'Exames e eletrocardiograma normais quando indicados, e glicemia estável sem necessidade de infusão.',
    'Ausência de risco de toxicidade tardia conforme o agente e o horário da ingestão.',
    'Avaliação de saúde mental realizada e plano de seguimento definido em caso de ingestão intencional.',
    'Orientação registrada sobre guarda segura de medicamentos e sobre o telefone 0800 722 6001.',
    'Rede de proteção acionada quando houver suspeita de negligência ou de violência.',
    'Caso notificado e retorno agendado.'
  ],
  orientacoes: [
    'Se a criança engoliu remédio, ligar imediatamente para o Disque Intoxicação 0800 722 6001, que funciona 24 horas, e levar a criança ao serviço de saúde.',
    'Não fazer a criança vomitar de jeito nenhum: não colocar o dedo na boca, não dar sal, não dar xarope para vomitar.',
    'Não dar leite, água, suco, óleo nem clara de ovo para diluir: isso pode fazer o remédio ser absorvido mais rápido.',
    'Levar a cartela, o frasco ou uma foto da caixa do remédio, e contar quantos comprimidos faltam.',
    'Mesmo que a criança pareça bem, procurar atendimento: muitos remédios só fazem efeito horas depois.',
    'Guardar todos os remédios em armário alto, fechado e longe da vista e do alcance das crianças, inclusive os remédios da avó, do avô e os de uso diário.',
    'Não guardar remédio na bolsa, na mesa de cabeceira, no criado-mudo, na cozinha nem em pote de outro produto.',
    'Nunca chamar remédio de doce ou de bala para a criança aceitar tomar.',
    'Não dar à criança remédio de adulto, remédio de irmão, sobra de receita antiga nem remédio indicado por vizinho.',
    'Usar sempre o copo ou a seringa dosadora que vem com o remédio, nunca colher de casa, e conferir a dose e o horário anotados pela equipe.'
  ],
  retorno: 'Após a alta, retorno em 24 a 48 horas para reavaliação clínica, e antes disso se houver sonolência, vômitos, dor abdominal, palidez, sudorese, confusão ou qualquer mudança de comportamento. Em intoxicação por paracetamol ou por ferro, seguimento laboratorial conforme o protocolo do serviço. Em ingestão intencional de adolescente, garantir consulta de saúde mental em prazo curto e acompanhamento continuado, com vigilância domiciliar e restrição de acesso a medicamentos.',
  prevencao: [
    'Guardar medicamentos em local alto, trancado e fora da vista, inclusive os de uso contínuo de adultos e idosos da casa.',
    'Preferir embalagens com tampa de segurança e manter os medicamentos em sua embalagem original, com a bula.',
    'Nunca transferir remédio para copo, garrafa, pote de alimento ou saquinho.',
    'Descartar corretamente medicamentos vencidos ou não utilizados, em pontos de coleta ou na unidade de saúde.',
    'Evitar automedicação e uso de sobras de receitas anteriores em crianças.',
    'Conferir sempre nome, concentração e dose antes de administrar, usando o dosador da embalagem.',
    'Atenção redobrada em visitas e em casas de familiares idosos, onde há mais medicamentos ao alcance.',
    'Em adolescentes com sofrimento psíquico, restringir o acesso a medicamentos em casa e manter acompanhamento em saúde mental.',
    'Divulgar nas unidades e nas escolas o telefone 0800 722 6001 do Disque Intoxicação.',
    'Notificar todos os casos, para dimensionar o problema e orientar ações locais de prevenção.'
  ],
  fontes: [
    { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
    { nome: 'Diretrizes para o atendimento de intoxicações exógenas – Centros de Informação e Assistência Toxicológica (CIATox)', ano: 2023 },
    { nome: 'Tratado de Pediatria – Sociedade Brasileira de Pediatria', ano: 2022 },
    { nome: 'Nelson Textbook of Pediatrics', ano: 2020 },
    { nome: 'PALS – Pediatric Advanced Life Support, American Heart Association', ano: 2020 }
  ],
  atualizadoEm: '2026-09'
});

// ============================================ 3. INTOXICAÇÃO DOMÉSTICA E RURAL
PED.data.acidentes.protocolos.push({
  id: 'intoxicacao_domestica',
  nome: 'Intoxicação por produto doméstico, agrotóxico e produto de uso rural',
  categoria: 'acidente',
  amazonia: true,
  cid10: 'T52 a T60',
  tags: ['vomitos', 'dor_abdominal', 'alteracao_consciencia', 'convulsao', 'sudorese', 'dispneia', 'tosse', 'cianose', 'sangramento', 'lesoes_pele'],
  definicao: 'Exposição aguda a produtos de limpeza, combustíveis, solventes, praguicidas domésticos e agrícolas, raticidas, naftalina, álcool e metais, por via oral, inalatória, dérmica ou ocular. Cada grupo tem um comportamento clínico próprio e condutas de descontaminação diferentes, algumas delas formalmente contraindicadas.',
  epidemiologia: 'Depois dos medicamentos, os produtos domésticos são a causa mais frequente de intoxicação em crianças, com pico entre 1 e 4 anos. O fator de risco mais consistente é o armazenamento em embalagem de bebida ou de alimento: soda cáustica, água sanitária, querosene, diesel, gasolina e desinfetante guardados em garrafa de refrigerante ou de água são uma causa clássica e evitável de ingestão. No interior do Amazonas e em comunidades ribeirinhas e indígenas, somam-se o querosene e o diesel usados em lamparina, motor rabeta e gerador, frequentemente guardados em garrafa no chão da casa; o mercúrio metálico presente em áreas de garimpo, que contamina também pela cadeia alimentar do pescado; agrotóxicos usados em roçado e em cultivo de subsistência, muitas vezes sem rótulo, sem equipamento de proteção e armazenados dentro de casa; e o raticida de comércio informal, conhecido como chumbinho, que frequentemente contém carbamato de uso agrícola, é vendido irregularmente e tem alta letalidade. A demora no acesso ao serviço e a prática difundida de fazer a criança vomitar ou de dar leite agravam o desfecho. Intoxicação exógena é agravo de notificação compulsória.',
  agente: 'Cáusticos (soda cáustica, desentupidor, limpa-forno, limpador de piso concentrado, ácido de bateria, cal); hipoclorito de sódio da água sanitária; hidrocarbonetos (querosene, diesel, gasolina, aguarrás, thinner, removedor, fluido de isqueiro); inseticidas organofosforados e carbamatos; piretroides de uso doméstico; raticidas cumarínicos (superwarfarínicos); raticidas clandestinos do tipo chumbinho, que costumam conter carbamato; naftalina e cânfora; álcool etílico e álcool adulterado com metanol; mercúrio metálico e mercúrio orgânico do garimpo; herbicidas como paraquate e glifosato; e produtos de limpeza tensoativos e desinfetantes.',
  transmissao: 'Não se aplica: agravo por causa externa. As vias são oral, inalatória (vapores em ambiente fechado, queima de praguicida, aplicação de inseticida), dérmica (contato com agrotóxico, com cáustico ou com roupa contaminada) e ocular (respingo).',
  incubacao: 'Não se aplica. O início varia: imediato para cáusticos e para hidrocarbonetos aspirados; minutos a poucas horas para organofosforados e carbamatos; horas para álcool; 1 a 3 dias para o sangramento do raticida cumarínico; e semanas a meses para a exposição crônica ao mercúrio.',
  manifestacoes: [
    'Cáusticos: dor imediata na boca e na garganta, sialorreia, recusa de alimentos, disfagia, odinofagia, vômitos, lesões esbranquiçadas ou enegrecidas em lábios, língua e orofaringe, estridor e dispneia se houver edema de via aérea; a ausência de lesão na boca não afasta lesão esofágica.',
    'Água sanitária de uso doméstico em concentração habitual: irritação de boca e garganta, náusea e vômitos, em geral de curso benigno; produtos concentrados ou misturados com ácido liberam cloro e causam irritação respiratória importante.',
    'Hidrocarbonetos: tosse, engasgo e sufocação no momento da ingestão, seguidos em horas de taquipneia, febre, hipoxemia e sibilância por pneumonite química aspirativa; hálito característico de querosene ou de gasolina; sonolência e convulsão em ingestões volumosas.',
    'Organofosforado e carbamato (síndrome colinérgica): miose puntiforme, sialorreia, lacrimejamento, sudorese profusa, broncorreia e broncoespasmo, vômitos, diarreia, cólicas, incontinência, bradicardia, fasciculações, fraqueza muscular, convulsão, coma e insuficiência respiratória; odor de alho ou de solvente na roupa e no hálito.',
    'Piretroides: irritação de pele e mucosas, parestesia facial, espirros, tosse e, em exposições grandes, náusea e tremor; toxicidade sistêmica grave é incomum.',
    'Raticida cumarínico: fase inicial assintomática, com sangramento surgindo depois de 1 a 3 dias (gengivorragia, epistaxe, equimoses, hematúria, sangramento digestivo), por alargamento do tempo de protrombina, que pode persistir por semanas.',
    'Raticida clandestino do tipo chumbinho: quadro colinérgico de instalação rápida e grave, indistinguível da intoxicação por carbamato agrícola.',
    'Álcool: hálito etílico, desinibição, ataxia, vômitos, rebaixamento e, na criança pequena, hipoglicemia grave com convulsão e hipotermia, que podem ocorrer com quantidades pequenas.',
    'Naftalina e cânfora: náusea, vômitos, dor abdominal; a cânfora causa convulsão precoce; a naftalina pode causar hemólise, sobretudo em deficiência de glicose-6-fosfato desidrogenase, com palidez, icterícia e urina escura.',
    'Mercúrio: a ingestão de mercúrio metálico de termômetro habitualmente tem baixa toxicidade digestiva, mas a inalação de vapor em ambiente fechado causa tosse, dispneia e pneumonite; a exposição crônica, relevante em áreas de garimpo e pelo consumo de peixe contaminado, cursa com tremor, alteração de comportamento, parestesia, alteração visual e de marcha e comprometimento do desenvolvimento neurológico.',
    'Exposição dérmica e ocular: queimadura química, dor, hiperemia, lacrimejamento e lesão de córnea.'
  ],
  sinaisAlarme: [
    'Estridor, rouquidão, dispneia, sialorreia intensa ou recusa total de saliva após ingestão de cáustico.',
    'Sinais colinérgicos: miose, sialorreia, broncorreia, sudorese profusa, bradicardia e fraqueza muscular.',
    'Taquipneia, hipoxemia ou febre nas primeiras horas após ingestão de hidrocarboneto.',
    'Rebaixamento do nível de consciência, convulsão ou hipoglicemia.',
    'Sangramento espontâneo ou alargamento do tempo de protrombina após exposição a raticida.',
    'Vômitos com sangue, dor abdominal intensa, defesa ou sinais de perfuração.',
    'Queimadura química extensa de pele ou lesão ocular.',
    'Exposição a produto sem rótulo, a agrotóxico de uso agrícola ou a raticida clandestino.',
    'Ingestão intencional em adolescente.',
    'Exposição de mais de uma criança ou de vários moradores ao mesmo tempo (avaliar fonte comum e contaminação ambiental).'
  ],
  diagnosticoDiferencial: ['intoxicacao_medicamentosa', 'ingestao_caustico', 'intoxicacao_planta', 'intoxicacao_fumaca', 'pneumonia', 'gastroenterite aguda', 'sepse', 'meningite', 'cetoacidose diabética', 'crise convulsiva de outra etiologia'],
  exames: ['glicemia', 'gasometria', 'eletrolitos', 'hemograma', 'ureia', 'creatinina', 'ast', 'alt', 'coagulograma', 'lactato', 'radiografia_torax', 'urina_1', 'atividade de colinesterase plasmática e eritrocitária quando disponível, em suspeita de organofosforado', 'tempo de protrombina e INR seriados em exposição a raticida cumarínico', 'endoscopia digestiva alta em ingestão de cáustico, conforme indicação'],
  criteriosDiagnosticos: [
    'História de exposição com identificação do produto: pedir a embalagem, o rótulo ou uma fotografia; em produto transferido para garrafa, considerar que a identificação pode estar errada.',
    'Definir via, quantidade estimada, horário e se houve exposição de outras pessoas ou animais na casa.',
    'Reconhecimento da toxíndrome: a síndrome colinérgica dos organofosforados e carbamatos é a mais característica e a mais tempo-dependente.',
    'Em hidrocarboneto, o risco principal é a aspiração e não a absorção digestiva: valorizar tosse e engasgo no momento da ingestão.',
    'Radiografia de tórax em exposição a hidrocarboneto, se sintomático, preferencialmente após 4 a 6 horas, pois a alteração radiológica é tardia em relação ao quadro clínico.',
    'Em exposição a raticida cumarínico, o exame decisivo é o tempo de protrombina com INR, repetido em 24 a 48 horas, porque o quadro inicial é assintomático.',
    'Contato imediato com o Centro de Informação e Assistência Toxicológica pelo Disque Intoxicação 0800 722 6001 para identificação do princípio ativo e orientação.',
    'Notificar a intoxicação exógena e, em exposição a agrotóxico, registrar a relação com o trabalho ou com a atividade agrícola familiar.'
  ],
  classificacaoGravidade: [
    { nivel: 'Exposição leve', criterios: 'Contato ou ingestão de pequena quantidade de produto de baixa toxicidade (água sanitária doméstica, sabão, detergente, piretroide), criança assintomática ou com irritação leve. Considerar lavagem, observação e orientação.' },
    { nivel: 'Intoxicação moderada', criterios: 'Sintomas digestivos ou respiratórios persistentes, lesão de mucosa oral, pneumonite inicial por hidrocarboneto, sinais colinérgicos leves ou exposição a produto de toxicidade relevante. Considerar observação hospitalar, monitorização e exames.' },
    { nivel: 'Intoxicação grave', criterios: 'Síndrome colinérgica com broncorreia, convulsão ou insuficiência respiratória; pneumonite extensa; lesão cáustica com estridor ou suspeita de perfuração; sangramento por raticida; rebaixamento importante; exposição a paraquate ou a raticida clandestino. Considerar suporte avançado, antídoto e terapia intensiva.' }
  ],
  tratamento: [
    'ABCDE, monitorização, oximetria e glicemia capilar; proteger a equipe com luvas e avental em exposição a agrotóxico, porque a roupa contaminada continua a expor quem atende.',
    'Descontaminação externa: retirar toda a roupa contaminada, ensacá-la, e lavar a pele e os cabelos com água corrente abundante e sabão; em exposição ocular, irrigar com soro fisiológico ou água limpa por pelo menos 15 a 20 minutos e avaliar a córnea.',
    'Nunca provocar vômito em nenhuma intoxicação, e nunca oferecer leite, água ou qualquer líquido para diluir ou neutralizar.',
    'Hidrocarbonetos (querosene, diesel, gasolina, aguarrás, thinner, fluido de isqueiro): jamais fazer lavagem gástrica e jamais provocar vômito, pelo risco de aspiração e pneumonite química; não usar carvão ativado. A conduta é observação clínica, oxigênio e suporte respiratório.',
    'Pneumonite por hidrocarboneto: oxigênio, suporte ventilatório se necessário, sem antibiótico profilático e sem corticoide de rotina; introduzir antibiótico apenas se houver evidência de infecção bacteriana secundária, conforme avaliação.',
    'Cáusticos: conduzir conforme o protocolo específico de ingestão de cáustico, sem vômito, sem neutralização, sem carvão ativado e sem sonda gástrica às cegas.',
    'Organofosforado e carbamato: descontaminação externa, oxigênio e atropina como medida central, titulada pelo objetivo de secar as secreções brônquicas, e não pela frequência cardíaca nem pela pupila; repetir e dobrar a dose conforme a resposta, segundo protocolo. Considerar pralidoxima nos organofosforados, o mais precoce possível, conforme protocolo e orientação do CIATox; na intoxicação por carbamato a pralidoxima em geral não é necessária.',
    'Convulsão na síndrome colinérgica: benzodiazepínico; evitar succinilcolina em caso de intubação, pela inibição da colinesterase.',
    'Raticida cumarínico: medir tempo de protrombina e INR na admissão e repetir em 24 a 48 horas; considerar vitamina K quando houver alargamento do INR ou sangramento, com tratamento prolongado por semanas nos superwarfarínicos, conforme orientação do CIATox; plasma fresco congelado ou complexo protrombínico em sangramento importante.',
    'Álcool: corrigir e monitorizar a glicemia, manter aquecimento e suporte; a hipoglicemia é a principal causa de morte da criança pequena intoxicada por álcool.',
    'Naftalina e cânfora: observar hemólise (hemograma, bilirrubinas, urina) na naftalina e convulsão precoce na cânfora; não há antídoto específico, e o suporte é a base do cuidado.',
    'Mercúrio: em ingestão de mercúrio metálico, ventilar o ambiente, recolher o material sem aspirador e sem vassoura, e observar; em exposição por vapor ou em suspeita de exposição crônica no garimpo, avaliar com o CIATox e com a vigilância ambiental, considerando dosagem e seguimento do neurodesenvolvimento.',
    'Paraquate: exposição de altíssima letalidade, em que o oxigênio suplementar deve ser usado com cautela e apenas se houver hipoxemia significativa, pois agrava a lesão pulmonar; contatar o CIATox imediatamente. Confirmar conforme protocolo.',
    'Carvão ativado apenas quando o agente for adsorvível e a via aérea estiver protegida; está contraindicado em cáusticos, hidrocarbonetos, álcool e metais.',
    'Notificar o caso, orientar a família sobre guarda e descarte seguros e acionar a vigilância sanitária ou ambiental quando houver produto clandestino, agrotóxico sem rótulo ou contaminação coletiva.'
  ],
  medicamentos: [
    { medId: null, nome: 'Atropina', esquema: 'Síndrome colinérgica por organofosforado ou carbamato: dose inicial habitual de 0,02 a 0,05 mg/kg IV, repetida e dobrada a cada 5 a 10 minutos até secar as secreções brônquicas (objetivo terapêutico), com posterior infusão contínua conforme necessidade. Confirmar conforme protocolo/bula e orientar-se pelo CIATox.', verificar: true },
    { medId: null, nome: 'Pralidoxima', esquema: 'Intoxicação por organofosforado, o mais precoce possível, associada à atropina: dose de ataque e infusão conforme protocolo do serviço, disponibilidade e orientação do CIATox. Em geral não indicada na intoxicação por carbamato. Confirmar conforme protocolo/bula e orientar-se pelo CIATox.', verificar: true },
    { medId: null, nome: 'Vitamina K1 (fitomenadiona)', esquema: 'Raticida cumarínico com INR alargado ou sangramento: dose e via conforme protocolo do serviço, com tratamento prolongado por semanas nos superwarfarínicos e controle seriado do INR. Confirmar conforme protocolo/bula e orientar-se pelo CIATox.', verificar: true },
    { medId: null, nome: 'Carvão ativado', esquema: 'Apenas para agentes adsorvíveis, com via aérea protegida: 1 g/kg VO ou por sonda (até 50 g). Contraindicado em cáusticos, hidrocarbonetos, álcool e metais.' },
    { medId: 'glicose', esquema: 'Hipoglicemia, frequente na intoxicação alcoólica da criança pequena: 0,5 a 1 g/kg IV seguida de infusão contínua, com controle seriado.' },
    { medId: 'soro_fisiologico', esquema: 'Irrigação ocular prolongada, lavagem de pele e expansão volêmica (10 a 20 mL/kg em bolus) conforme necessidade.' },
    { medId: 'diazepam', esquema: 'Convulsão: 0,2 a 0,3 mg/kg IV lento (máximo 10 mg), conforme bula.' },
    { medId: 'midazolam', esquema: 'Convulsão ou agitação: 0,1 a 0,2 mg/kg IV, IM ou IO, conforme bula e protocolo do serviço.' },
    { medId: 'salbutamol', esquema: 'Broncoespasmo associado à pneumonite química ou à exposição a piretroides: 2 a 4 jatos de 100 mcg com espaçador, repetidos conforme resposta.' },
    { medId: 'adrenalina', esquema: 'Suporte em choque refratário e em parada cardiorrespiratória, conforme protocolo de PALS.' }
  ],
  criteriosInternacao: [
    'Qualquer sinal colinérgico após exposição a organofosforado, carbamato ou raticida clandestino.',
    'Sintomas respiratórios após ingestão de hidrocarboneto, ou ingestão de volume significativo mesmo com poucos sintomas, para observação de 6 a 12 horas conforme protocolo.',
    'Ingestão de cáustico com sintomas, com lesão oral ou com produto de alta concentração.',
    'Exposição a raticida cumarínico com INR alargado ou sangramento.',
    'Rebaixamento de consciência, convulsão ou hipoglicemia.',
    'Exposição a paraquate ou a produto sem identificação de alta toxicidade potencial.',
    'Queimadura química de pele extensa ou lesão ocular.',
    'Ingestão intencional em adolescente.',
    'Suspeita de negligência ou de exposição repetida.',
    'Domicílio distante, sem transporte ou sem possibilidade de retorno rápido.'
  ],
  criteriosUTI: [
    'Insuficiência respiratória por broncorreia, por pneumonite extensa ou por fraqueza muscular na síndrome colinérgica.',
    'Necessidade de atropina em infusão contínua ou de doses repetidas elevadas.',
    'Convulsão repetida, coma ou necessidade de via aérea avançada.',
    'Instabilidade hemodinâmica ou choque.',
    'Sangramento grave com repercussão hemodinâmica por raticida cumarínico.',
    'Exposição a paraquate com sinais de lesão pulmonar ou renal.'
  ],
  criteriosAlta: [
    'Período de observação adequado ao agente cumprido e criança assintomática.',
    'Ausência de sinais respiratórios e radiografia sem alterações quando indicada, na exposição a hidrocarboneto.',
    'INR normal no controle indicado, na exposição a raticida cumarínico, com retorno programado para novo controle.',
    'Glicemia estável e exame neurológico normal.',
    'Produto identificado e família orientada sobre armazenamento, descarte e sobre o telefone 0800 722 6001.',
    'Retirada do produto do alcance da criança combinada com a família, com visita domiciliar pela equipe de saúde da família quando possível.',
    'Caso notificado e retorno agendado.'
  ],
  orientacoes: [
    'Nunca guardar querosene, diesel, gasolina, água sanitária, soda cáustica, desinfetante, veneno ou qualquer produto de limpeza em garrafa de refrigerante, de água, de suco ou em pote de alimento: é a principal causa de ingestão por engano.',
    'Manter todos esses produtos nas embalagens originais, fechados, em local alto e trancado, longe de comida e fora do alcance e da vista das crianças.',
    'Se a criança engolir ou respirar algum produto, ligar imediatamente para o Disque Intoxicação 0800 722 6001 e procurar o serviço de saúde levando a embalagem.',
    'Não fazer a criança vomitar e não dar leite, água, óleo, clara de ovo nem chá para cortar o efeito.',
    'Se houver respingo no olho, lavar com água limpa corrente por pelo menos 15 a 20 minutos, com a pálpebra aberta, e procurar atendimento.',
    'Se o produto cair na pele ou na roupa, tirar toda a roupa e lavar a criança com bastante água e sabão.',
    'Guardar veneno de rato, veneno de roçado e inseticida fora de casa, em local fechado, nunca embaixo da pia, nunca no quarto e nunca perto de alimentos.',
    'Não comprar veneno de rato vendido solto ou em saquinho, sem rótulo, conhecido como chumbinho: é proibido e muito perigoso para crianças.',
    'Quem aplica veneno na roça deve trocar de roupa e tomar banho antes de pegar a criança, e lavar a roupa de trabalho separada da roupa da família.',
    'Manter lamparina, querosene e combustível de motor rabeta ou de gerador em local fechado e fora do alcance, e nunca deixar a garrafa no chão da casa.'
  ],
  retorno: 'Retorno em 24 a 48 horas após a alta e imediatamente se surgirem tosse, falta de ar, febre, vômitos, sonolência, sangramento de gengiva ou nariz, manchas roxas ou urina escura. Em exposição a raticida cumarínico, novo controle de tempo de protrombina e INR em 48 a 72 horas, com seguimento por semanas conforme o produto. Em exposição a agrotóxico ou a mercúrio, articular seguimento com a equipe de saúde da família e com a vigilância em saúde do trabalhador e ambiental, incluindo avaliação do neurodesenvolvimento em exposições crônicas.',
  prevencao: [
    'Armazenamento seguro, em embalagem original, em local alto, trancado e separado de alimentos.',
    'Campanha permanente contra a transferência de produtos para garrafas de bebida, em unidades de saúde, escolas e rádios comunitárias.',
    'Guarda de agrotóxicos fora do domicílio e uso de equipamento de proteção individual por quem aplica.',
    'Higiene do aplicador e lavagem separada da roupa de trabalho antes do contato com crianças.',
    'Combate ao comércio clandestino de raticida, com acionamento da vigilância sanitária.',
    'Substituição, quando possível, de lamparina a querosene por iluminação segura, e guarda de combustíveis fora do ambiente de convivência.',
    'Orientação sobre o consumo de peixes em áreas de garimpo, conforme recomendações da vigilância local, com atenção a gestantes e crianças pequenas.',
    'Supervisão de crianças pequenas durante a limpeza da casa, período de maior risco por produtos abertos e ao alcance.',
    'Divulgação do telefone 0800 722 6001 do Disque Intoxicação nas comunidades.',
    'Notificação dos casos e retorno das informações às comunidades para orientar ações locais.'
  ],
  fontes: [
    { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
    { nome: 'Diretrizes para o atendimento de intoxicações exógenas – Centros de Informação e Assistência Toxicológica (CIATox)', ano: 2023 },
    { nome: 'Protocolo de atenção à saúde de populações expostas a agrotóxicos – Ministério da Saúde', ano: 2018 },
    { nome: 'OMS – Clinical management of acute pesticide intoxication', ano: 2008 },
    { nome: 'Tratado de Pediatria – Sociedade Brasileira de Pediatria', ano: 2022 }
  ],
  atualizadoEm: '2026-09'
});

// ============================================== 4. INGESTÃO DE CÁUSTICO
PED.data.acidentes.protocolos.push({
  id: 'ingestao_caustico',
  nome: 'Ingestão de substância cáustica',
  categoria: 'acidente',
  amazonia: false,
  cid10: 'T54',
  tags: ['dor_local', 'vomitos', 'dor_abdominal', 'dispneia', 'estridor', 'lesoes_pele', 'sangramento', 'febre', 'desidratacao'],
  definicao: 'Lesão química da boca, da faringe, do esôfago e do estômago causada pela ingestão de álcali forte (soda cáustica, desentupidor, limpa-forno, cal, detergente de máquina) ou de ácido forte (ácido muriático, ácido de bateria, removedor de ferrugem). Os álcalis produzem necrose de liquefação, que penetra profundamente e atinge preferencialmente o esôfago; os ácidos produzem necrose de coagulação, mais superficial, com predomínio gástrico.',
  epidemiologia: 'Concentra-se em crianças de 1 a 4 anos e quase sempre é acidental, com ingestão de pequeno volume. O produto guardado em embalagem de bebida, a soda cáustica usada para fazer sabão caseiro e desentupir pia, e o limpa-forno e o desentupidor deixados no chão ou embaixo da pia durante a limpeza são as situações mais frequentes. Em adolescentes, a ingestão costuma ser intencional e de volume maior, com lesão mais extensa. A estenose esofágica cicatricial é a complicação tardia mais temida, com necessidade de dilatações repetidas e, por vezes, de substituição do esôfago, com impacto nutricional e escolar prolongado, agravado em municípios distantes de serviço de endoscopia e de cirurgia pediátrica.',
  agente: 'Álcalis: hidróxido de sódio e de potássio (soda cáustica, desentupidor, limpa-forno), hipoclorito concentrado, amônia, cal virgem e detergente de lava-louças automática. Ácidos: ácido clorídrico (ácido muriático), ácido sulfúrico (ácido de bateria), ácido fosfórico e ácido oxálico. A gravidade depende do pH, da concentração, da forma (líquido ou sólido), do volume e do tempo de contato.',
  transmissao: 'Não se aplica: agravo por causa externa, por via oral, com possível acometimento simultâneo de pele, olhos e via aérea por respingo ou por aspiração.',
  incubacao: 'Não se aplica. A lesão é imediata. A fase aguda inflamatória dura cerca de 1 a 4 dias; a fase de granulação e de maior fragilidade da parede ocorre entre o quinto e o décimo quarto dia, período de maior risco de perfuração; a fase cicatricial e a estenose se estabelecem entre a terceira e a oitava semana.',
  manifestacoes: [
    'Dor imediata e intensa em boca, garganta, retroesterno ou epigástrio.',
    'Sialorreia, recusa de deglutir a própria saliva, disfagia e odinofagia.',
    'Lesões esbranquiçadas, acinzentadas, enegrecidas ou ulceradas em lábios, língua, palato e orofaringe; eritema e edema de mucosa.',
    'Vômitos, por vezes com sangue, e dor abdominal.',
    'Estridor, rouquidão, disfonia, tosse e dispneia quando há acometimento de laringe e de via aérea superior.',
    'Queimadura química perioral, de mento e de tórax anterior pelo escorrimento do produto.',
    'Lesão ocular associada por respingo, com dor, lacrimejamento e hiperemia.',
    'Sinais de perfuração esofágica: dor torácica intensa, enfisema subcutâneo cervical, febre, taquicardia, toxemia e choque.',
    'Sinais de perfuração gástrica: dor abdominal intensa, defesa, abdome em tábua e instabilidade.',
    'Ausência de lesão visível na boca não exclui lesão esofágica importante, e lesão oral extensa nem sempre corresponde a lesão esofágica grave: a correlação é fraca.',
    'Evolução tardia com disfagia progressiva, engasgos, regurgitação, perda de peso e impactação alimentar, compatível com estenose.'
  ],
  sinaisAlarme: [
    'Estridor, rouquidão, disfonia ou dispneia (acometimento de via aérea).',
    'Sialorreia com incapacidade de deglutir a saliva.',
    'Dor torácica intensa, enfisema subcutâneo cervical ou abdome em tábua.',
    'Hematêmese ou sangramento digestivo.',
    'Vômitos persistentes.',
    'Ingestão de produto sólido ou em escamas, que adere à mucosa e aprofunda a lesão.',
    'Ingestão intencional, em geral de volume maior.',
    'Febre, taquicardia, hipotensão ou toxemia (suspeitar de perfuração e de mediastinite).',
    'Lesão circunferencial ou necrose extensa à endoscopia.',
    'Recusa alimentar mantida e desidratação.'
  ],
  diagnosticoDiferencial: ['intoxicacao_domestica', 'corpo_estranho_digestivo', 'ingestao_pilha_botao', 'estomatite herpética e aftosa', 'epiglotite e laringite', 'esofagite eosinofílica em apresentação tardia', 'queimadura térmica de orofaringe por alimento ou líquido quente'],
  exames: ['hemograma', 'gasometria', 'eletrolitos', 'ureia', 'creatinina', 'coagulograma', 'radiografia_torax', 'radiografia de abdome em pé e cervical em perfil (pesquisa de pneumomediastino, pneumoperitônio e enfisema)', 'endoscopia digestiva alta precoce, conforme indicação', 'tomografia de tórax e abdome quando houver suspeita de perfuração ou de necrose transmural', 'esofagografia com contraste hidrossolúvel na avaliação tardia de estenose'],
  criteriosDiagnosticos: [
    'História de ingestão de produto cáustico, com identificação do produto, da concentração, da forma (líquida ou sólida) e do volume estimado; solicitar a embalagem.',
    'Exame cuidadoso de lábios, língua, palato e orofaringe, com registro das lesões, e avaliação de voz, saliva e via aérea.',
    'Considerar endoscopia digestiva alta em crianças sintomáticas (sialorreia, disfagia, vômitos, dor, lesão oral) e em toda ingestão intencional; em criança assintomática após ingestão acidental de pequeno volume, a indicação é individualizada conforme o protocolo do serviço.',
    'Janela habitual para a endoscopia: entre 12 e 24 horas, podendo estender-se até cerca de 48 horas. Evitar a endoscopia entre o quinto e o décimo quarto dia, período de maior fragilidade da parede e de risco de perfuração.',
    'Contraindicações à endoscopia: instabilidade hemodinâmica, suspeita de perfuração e comprometimento grave de via aérea não estabilizado.',
    'Graduação endoscópica de Zargar, que orienta prognóstico e seguimento: grau 0 sem lesão; grau I edema e hiperemia da mucosa; grau IIa ulceração superficial, erosões e exsudato; grau IIb ulceração profunda, discreta ou circunferencial; grau IIIa necrose focal; grau IIIb necrose extensa; grau IV perfuração.',
    'Risco de estenose baixo nos graus I e IIa e alto nos graus IIb e III, o que define a necessidade de seguimento prolongado.',
    'Contato com o CIATox pelo Disque Intoxicação 0800 722 6001 e notificação da intoxicação exógena.'
  ],
  classificacaoGravidade: [
    { nivel: 'Leve', criterios: 'Ingestão acidental de pequeno volume, criança assintomática ou com hiperemia oral discreta, deglutindo saliva, sem vômitos. Considerar observação, dieta conforme tolerância e reavaliação; indicação de endoscopia conforme protocolo do serviço.' },
    { nivel: 'Moderada', criterios: 'Sintomas presentes: sialorreia, disfagia, dor, vômitos ou lesões orais evidentes, sem sinais de perfuração nem de comprometimento de via aérea. Considerar internação, jejum, hidratação, analgesia e endoscopia entre 12 e 24 horas.' },
    { nivel: 'Grave', criterios: 'Comprometimento de via aérea, sinais de perfuração, sangramento importante, instabilidade, necrose extensa (Zargar IIIb) ou ingestão intencional de grande volume. Considerar via aérea avançada, suporte intensivo e avaliação cirúrgica.' }
  ],
  tratamento: [
    'Nunca provocar vômito: o retorno do cáustico expõe o esôfago uma segunda vez e aumenta o risco de aspiração e de perfuração.',
    'Nunca tentar neutralizar: não oferecer vinagre, limão, suco de fruta, bicarbonato, leite de magnésia nem qualquer ácido ou base, porque a reação é exotérmica e agrava a lesão.',
    'Nunca oferecer leite, água ou qualquer líquido para diluir: aumenta o volume, provoca vômito e prejudica a visualização na endoscopia.',
    'Nunca administrar carvão ativado: não adsorve cáusticos e impede a avaliação endoscópica.',
    'Não passar sonda nasogástrica às cegas na fase aguda, pelo risco de perfuração; quando necessária, considerar a passagem sob visão endoscópica.',
    'Avaliar e garantir a via aérea: em estridor, rouquidão ou edema progressivo, considerar intubação precoce por profissional experiente, preferencialmente sob visualização, pelo risco de edema laríngeo e de falso trajeto.',
    'Jejum, acesso venoso e hidratação intravenosa; analgesia adequada, considerando opioide na dor intensa.',
    'Limpeza da pele e da face atingidas com água corrente abundante e irrigação ocular prolongada com soro fisiológico ou água limpa em caso de respingo, com avaliação oftalmológica.',
    'Inibidor de bomba de prótons por via intravenosa, conforme protocolo do serviço, para reduzir a agressão ácida sobre a mucosa lesada.',
    'Não usar corticoide de rotina: o benefício na prevenção da estenose não está estabelecido e há risco de mascarar infecção; uso apenas em situações selecionadas, conforme protocolo do serviço e avaliação especializada.',
    'Antibiótico não é indicado de rotina; considerar em suspeita de perfuração, mediastinite, necrose extensa ou quando houver uso de corticoide, conforme protocolo.',
    'Reintrodução alimentar conforme o achado endoscópico e a capacidade de deglutição, iniciando por líquidos e progredindo; considerar nutrição enteral por sonda sob visão ou nutrição parenteral em lesões graves.',
    'Avaliação cirúrgica imediata em suspeita de perfuração, de necrose transmural ou de mediastinite.',
    'Seguimento prolongado nos graus IIb e III, com atenção a disfagia progressiva, e programação de esofagografia ou de endoscopia de controle entre 3 e 6 semanas, conforme protocolo; dilatações endoscópicas seriadas quando houver estenose.',
    'Em adolescente com ingestão intencional, garantir avaliação de saúde mental e seguimento.',
    'Notificar a intoxicação exógena e orientar a família sobre armazenamento seguro antes da alta.'
  ],
  medicamentos: [
    { medId: null, nome: 'Inibidor de bomba de prótons (omeprazol ou pantoprazol)', esquema: 'Proteção gástrica na fase aguda: dose e via conforme protocolo do serviço e bula. Confirmar conforme protocolo/bula.', verificar: true },
    { medId: null, nome: 'Analgésico opioide (morfina ou fentanil)', esquema: 'Dor intensa: dose, via e monitorização conforme protocolo do serviço e bula. Confirmar conforme protocolo/bula.', verificar: true },
    { medId: 'dipirona', esquema: 'Dor leve a moderada: 10 a 15 mg/kg/dose IV a cada 6 h, conforme bula.' },
    { medId: 'soro_fisiologico', esquema: 'Hidratação intravenosa durante o jejum e irrigação ocular prolongada em caso de respingo.' },
    { medId: 'ringer_lactato', esquema: 'Reposição volêmica em instabilidade: 10 a 20 mL/kg em bolus, reavaliando após cada alíquota.' },
    { medId: 'ondansetrona', esquema: 'Náusea e vômitos: 0,15 mg/kg/dose IV (máximo 8 mg), conforme bula.' },
    { medId: 'ceftriaxona', esquema: 'Apenas em suspeita de perfuração, mediastinite ou infecção estabelecida: 50 a 100 mg/kg/dia IV, habitualmente associada a cobertura para anaeróbios, conforme protocolo do serviço.' },
    { medId: 'metronidazol', esquema: 'Cobertura para anaeróbios em suspeita de mediastinite ou de perfuração, associada a cefalosporina: 22,5 a 30 mg/kg/dia IV dividida 8/8 h, conforme protocolo do serviço.' },
    { medId: null, nome: 'Corticosteroide sistêmico', esquema: 'Não indicado de rotina. Uso restrito a situações selecionadas (por exemplo, edema de via aérea), conforme avaliação especializada e protocolo do serviço. Confirmar conforme protocolo/bula.', verificar: true }
  ],
  criteriosInternacao: [
    'Qualquer sintoma após a ingestão: sialorreia, disfagia, dor, vômitos ou recusa alimentar.',
    'Lesão visível em orofaringe.',
    'Ingestão de produto de alta concentração, de produto sólido ou em escamas, ou de volume significativo.',
    'Ingestão intencional.',
    'Indicação de endoscopia digestiva alta.',
    'Impossibilidade de hidratação por via oral.',
    'Sinais de comprometimento de via aérea ou suspeita de perfuração.',
    'Domicílio distante ou impossibilidade de reavaliação em 24 horas.',
    'Suspeita de negligência ou de violência.'
  ],
  criteriosUTI: [
    'Comprometimento de via aérea com necessidade de intubação ou de ventilação mecânica.',
    'Perfuração esofágica ou gástrica, mediastinite ou peritonite.',
    'Instabilidade hemodinâmica, choque ou sepse.',
    'Sangramento digestivo importante.',
    'Necrose extensa identificada à endoscopia, com risco de deterioração.',
    'Pós-operatório de cirurgia de urgência.'
  ],
  criteriosAlta: [
    'Criança deglutindo saliva e aceitando líquidos e dieta adequada à idade.',
    'Dor controlada e ausência de vômitos.',
    'Endoscopia realizada quando indicada, com achado de baixo risco, e plano de seguimento definido.',
    'Ausência de sinais de perfuração e de comprometimento de via aérea.',
    'Responsável orientado sobre sinais de estenose (engasgo, disfagia progressiva, vômito após alimento sólido, perda de peso) e sobre a necessidade de retorno.',
    'Produto retirado do alcance e orientação de armazenamento seguro registrada.',
    'Avaliação de saúde mental realizada em caso de ingestão intencional.',
    'Caso notificado e retorno agendado com serviço que disponha de endoscopia ou com referência definida.'
  ],
  orientacoes: [
    'Se a criança engolir soda cáustica, desentupidor, limpa-forno, ácido muriático ou produto parecido, levar imediatamente ao serviço de saúde com a embalagem do produto.',
    'Não faça a criança vomitar e não dê nada para beber: nem água, nem leite, nem vinagre, nem limão, nem bicarbonato, nem chá.',
    'Ligar para o Disque Intoxicação 0800 722 6001 a caminho do serviço, se possível.',
    'Se o produto respingou no olho, lavar com água limpa corrente por 15 a 20 minutos, com a pálpebra aberta; se caiu na pele ou na roupa, tirar a roupa e lavar com bastante água.',
    'Mesmo que a boca pareça normal, o esôfago pode estar queimado: é preciso avaliação médica.',
    'Depois da alta, voltar imediatamente se a criança começar a engasgar, tiver dificuldade para engolir, vomitar depois de comer, perder peso ou recusar alimento sólido; isso pode ser estreitamento do esôfago e tem tratamento.',
    'Comparecer a todas as consultas e exames marcados, mesmo que a criança pareça bem, porque o estreitamento aparece semanas depois.',
    'Guardar soda cáustica, desentupidor e produtos de limpeza fortes em local alto, trancado, na embalagem original, longe de alimentos e fora do alcance da criança.',
    'Nunca colocar esses produtos em garrafa de refrigerante, de água ou em copo.',
    'Durante a limpeza da casa, não deixar o produto aberto no chão e não perder a criança de vista.'
  ],
  retorno: 'Reavaliação em 24 a 48 horas nos casos liberados sem internação, e depois conforme o grau endoscópico. Nos graus IIb, IIIa e IIIb, seguimento com serviço de gastroenterologia ou de cirurgia pediátrica, com avaliação entre 3 e 6 semanas para pesquisa de estenose, por esofagografia ou endoscopia, conforme protocolo, e programa de dilatações quando indicado. Retorno imediato diante de disfagia, engasgo, vômitos após alimentação, dor torácica, febre ou perda de peso, em qualquer momento dos meses seguintes.',
  prevencao: [
    'Manter produtos cáusticos em embalagem original, com tampa de segurança, em local alto e trancado.',
    'Nunca transferir esses produtos para garrafas, copos ou potes de alimento.',
    'Evitar a produção e a guarda de soda cáustica para sabão caseiro em domicílios com crianças pequenas e, quando houver, armazenar em local inacessível e sinalizado.',
    'Não deixar produtos abertos no chão, embaixo da pia, no boxe do banheiro ou no tanque durante a limpeza.',
    'Supervisionar a criança durante a limpeza da casa e guardar o produto imediatamente após o uso.',
    'Preferir produtos menos concentrados e com rotulagem adequada.',
    'Orientar cuidadores, avós e vizinhos sobre a conduta correta: nada de vômito, nada de neutralizar, nada de beber.',
    'Divulgar o telefone 0800 722 6001 nas unidades de saúde, nas escolas e nas rádios comunitárias.',
    'Notificar os casos e usar os dados para ações locais de prevenção.'
  ],
  fontes: [
    { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
    { nome: 'Diretrizes para o atendimento de intoxicações exógenas – Centros de Informação e Assistência Toxicológica (CIATox)', ano: 2023 },
    { nome: 'ESPGHAN/NASPGHAN – Caustic ingestion in children: position paper', ano: 2017 },
    { nome: 'Tratado de Pediatria – Sociedade Brasileira de Pediatria', ano: 2022 },
    { nome: 'Nelson Textbook of Pediatrics', ano: 2020 }
  ],
  atualizadoEm: '2026-09'
});

// ============================================ 5. INGESTÃO DE PILHA BOTÃO
PED.data.acidentes.protocolos.push({
  id: 'ingestao_pilha_botao',
  nome: 'Ingestão de pilha botão e de bateria de lítio',
  categoria: 'acidente',
  amazonia: false,
  cid10: 'T18.1',
  tags: ['vomitos', 'dor_local', 'dor_abdominal', 'sangramento', 'dispneia', 'estridor', 'tosse', 'febre', 'palidez'],
  definicao: 'Ingestão de bateria em forma de disco, presente em controle remoto, relógio, balança, calculadora, brinquedo musical, cartão sonoro, chaveiro, aparelho auditivo e luz de LED. Quando a pilha fica impactada no esôfago, a corrente elétrica gerada no contato com a mucosa úmida produz hidróxido em torno do polo negativo e causa necrose de liquefação progressiva em poucas horas, mesmo com a bateria descarregada. É emergência tempo-dependente.',
  epidemiologia: 'A frequência aumentou com a difusão de dispositivos eletrônicos domésticos e de brinquedos importados com compartimento de bateria sem parafuso. O maior risco é em menores de 6 anos, com pico entre 1 e 3 anos. As baterias de lítio de 20 mm ou mais, do tipo CR2032, são as mais perigosas porque impactam com facilidade no esôfago de crianças pequenas e mantêm voltagem elevada. A ingestão costuma não ser presenciada, e a criança chega com sintomas inespecíficos, o que atrasa o diagnóstico. A lesão pode evoluir para perfuração esofágica, fístula traqueoesofágica, mediastinite, estenose, paralisia de corda vocal e fístula para a aorta, com hemorragia maciça e óbito, inclusive dias a semanas depois da remoção. Em municípios sem endoscopia, o reconhecimento imediato e a transferência rápida são determinantes.',
  agente: 'Bateria em forma de disco, habitualmente de lítio, com diâmetro entre 10 e 25 mm. O dano é eletroquímico e não depende da carga residual: baterias consideradas descarregadas continuam a gerar corrente suficiente para causar necrose.',
  transmissao: 'Não se aplica: agravo por causa externa. A ingestão é a via mais grave; também ocorrem inserções em narina e em conduto auditivo, que causam necrose local e perfuração de septo ou de membrana timpânica.',
  incubacao: 'Não se aplica. A lesão da mucosa esofágica começa em cerca de 2 horas de contato e a necrose pode ser transmural em 4 a 6 horas. Complicações tardias, como fístula aortoesofágica e estenose, podem manifestar-se dias ou semanas após a remoção.',
  manifestacoes: [
    'Muitas vezes a ingestão não é presenciada e o quadro inicial é inespecífico.',
    'Sialorreia, recusa alimentar, disfagia, engasgo e dor ao deglutir quando a bateria está impactada no esôfago.',
    'Vômitos, dor retroesternal, dor abdominal e irritabilidade.',
    'Tosse, estridor, sibilância, rouquidão e desconforto respiratório por compressão traqueal ou por fístula.',
    'Febre e toxemia na evolução para mediastinite.',
    'Hematêmese ou sangramento em quantidade variável: sangramento sentinela deve ser considerado sinal de alarme para fístula aortoesofágica.',
    'Criança previamente hígida com quadro arrastado de recusa alimentar, tosse ou chiado sem explicação: considerar corpo estranho esofágico, inclusive bateria.',
    'Bateria já no estômago ou além do piloro, em criança assintomática, costuma seguir o trânsito sem lesão, mas exige vigilância.',
    'Bateria em narina: obstrução, secreção fétida, sangramento e destruição do septo em poucas horas.',
    'Bateria em conduto auditivo: otalgia, otorreia, sangramento e perfuração da membrana timpânica.'
  ],
  sinaisAlarme: [
    'Bateria localizada no esôfago em qualquer criança: emergência, com indicação de remoção imediata.',
    'Sialorreia, disfagia ou recusa alimentar após ingestão presenciada ou suspeita.',
    'Estridor, dispneia ou rouquidão.',
    'Qualquer sangramento digestivo, mesmo pequeno (sangramento sentinela).',
    'Dor torácica, febre ou enfisema subcutâneo cervical.',
    'Bateria de 20 mm ou mais em criança menor de 5 anos.',
    'Coingestão de bateria com ímã.',
    'Tempo desde a ingestão maior que 2 horas com bateria ainda no esôfago.',
    'Persistência de sintomas após a remoção, que sugere lesão profunda em evolução.',
    'Inserção em narina ou em ouvido, que também exige remoção urgente.'
  ],
  diagnosticoDiferencial: ['corpo_estranho_digestivo', 'corpo_estranho_via_aerea', 'ingestao_caustico', 'corpo_estranho_nasal_auricular', 'esofagite e refluxo gastroesofágico', 'faringoamigdalite', 'laringite', 'impactação alimentar'],
  exames: ['radiografia cervical, de tórax e de abdome em incidências anteroposterior e perfil, cobrindo da boca ao ânus', 'hemograma', 'coagulograma', 'tipagem sanguínea e reserva de hemocomponentes em caso de sangramento', 'radiografia_torax', 'tomografia ou angiotomografia de tórax em suspeita de fístula ou de lesão vascular', 'endoscopia digestiva alta diagnóstica e terapêutica'],
  criteriosDiagnosticos: [
    'Suspeitar de ingestão de bateria em toda criança pequena com sialorreia, recusa alimentar, disfagia, engasgo, tosse ou dor torácica de início súbito, mesmo sem relato de ingestão.',
    'Radiografia imediata em incidências anteroposterior e perfil, cobrindo pescoço, tórax e abdome; nunca tratar como ingestão de moeda sem confirmar a imagem.',
    'Sinal do halo ou do duplo anel na incidência anteroposterior, com borda periférica e centro mais denso, e sinal do degrau ou do perfil em degrau na incidência lateral: diferenciam a bateria botão da moeda, que aparece como disco homogêneo de borda lisa.',
    'Definir com precisão a localização (esôfago, estômago ou além do piloro), o diâmetro estimado e o horário da ingestão.',
    'Bateria no esôfago é emergência: indicar remoção endoscópica o mais rápido possível, idealmente em até 2 horas do diagnóstico, independentemente de jejum.',
    'Bateria no estômago em criança assintomática: conduta conforme protocolo, com observação e radiografia de controle; considerar remoção endoscópica se a criança for pequena, se a bateria for grande (20 mm ou mais), se houver sintomas, se houver coingestão de ímã ou se a bateria permanecer no estômago além do prazo definido pelo protocolo do serviço.',
    'Manter alta vigilância para complicações tardias após a remoção, sobretudo hemorragia por fístula aortoesofágica, que pode ocorrer dias depois.',
    'Contato com o CIATox pelo Disque Intoxicação 0800 722 6001 e com o serviço de endoscopia de referência desde a suspeita, para não perder tempo na transferência.'
  ],
  classificacaoGravidade: [
    { nivel: 'Emergência', criterios: 'Bateria impactada no esôfago, em qualquer idade e com qualquer tempo de ingestão, sintomática ou não. Considerar remoção endoscópica imediata e transferência prioritária quando não houver endoscopia no local.' },
    { nivel: 'Alto risco', criterios: 'Bateria no estômago em criança menor de 5 anos, bateria de 20 mm ou mais, criança sintomática, coingestão de ímã ou tempo de ingestão desconhecido. Considerar remoção endoscópica e observação hospitalar.' },
    { nivel: 'Risco menor', criterios: 'Bateria pequena já além do piloro, em criança maior, assintomática, com ingestão recente e bem definida. Considerar observação domiciliar orientada, com dieta habitual, pesquisa das fezes e radiografia de controle conforme protocolo, com retorno imediato diante de qualquer sintoma.' }
  ],
  tratamento: [
    'Reconhecer como emergência e acionar imediatamente o serviço de endoscopia e a referência de transferência: o tempo é a variável que define o desfecho.',
    'Não provocar vômito e não oferecer alimento.',
    'Mel, quando disponível: considerar 10 mL de mel por via oral a cada 10 minutos, até cerca de 6 doses, em criança maior de 1 ano, capaz de deglutir, com ingestão há menos de 12 horas e sem suspeita de perfuração ou de sangramento, como medida de barreira enquanto se aguarda a endoscopia. O mel não substitui a remoção e não deve atrasá-la. Não usar mel em menores de 1 ano, pelo risco de botulismo.',
    'Alternativa institucional ao mel, quando disponível e conforme protocolo do serviço: suspensão de sucralfato, nas mesmas condições.',
    'Remoção endoscópica da bateria esofágica o mais rápido possível, idealmente em até 2 horas do diagnóstico, com inspeção cuidadosa da mucosa após a retirada e registro da orientação do polo negativo, que indica o lado de maior lesão.',
    'Não tentar empurrar a bateria para o estômago às cegas com sonda e não usar sonda de Foley às cegas: a manipulação inadequada pode aprofundar a lesão.',
    'Após a remoção, manter jejum e observação conforme o grau de lesão da mucosa, com hidratação intravenosa, analgesia e inibidor de bomba de prótons segundo protocolo do serviço.',
    'Vigilância prolongada para complicações: reintrodução alimentar cautelosa e conforme a lesão encontrada; atenção a qualquer sangramento, que deve ser tratado como emergência vascular até prova em contrário.',
    'Bateria no estômago sem indicação de remoção: dieta habitual, observação, orientação para pesquisa nas fezes e radiografia de controle conforme protocolo; remover se surgir sintoma ou se não progredir.',
    'Bateria em narina ou em conduto auditivo: remoção urgente por otorrinolaringologista, sem irrigar a cavidade, já que o líquido acelera a reação eletroquímica.',
    'Antibiótico e avaliação cirúrgica em suspeita de perfuração, de mediastinite ou de fístula.',
    'Orientar a família antes da alta sobre a guarda de baterias e sobre o risco desses dispositivos, e notificar conforme a rotina do serviço.'
  ],
  medicamentos: [
    { medId: null, nome: 'Mel', esquema: 'Medida de barreira enquanto se aguarda a endoscopia: 10 mL VO a cada 10 minutos, até cerca de 6 doses, em maiores de 1 ano, com ingestão há menos de 12 h, sem suspeita de perfuração. Contraindicado em menores de 1 ano (risco de botulismo). Não substitui nem atrasa a remoção.' },
    { medId: null, nome: 'Sucralfato em suspensão', esquema: 'Alternativa ao mel como medida de barreira, conforme disponibilidade e protocolo do serviço, nas mesmas condições. Confirmar conforme protocolo/bula.', verificar: true },
    { medId: null, nome: 'Inibidor de bomba de prótons (omeprazol ou pantoprazol)', esquema: 'Após a remoção, conforme o grau de lesão e o protocolo do serviço. Confirmar conforme protocolo/bula.', verificar: true },
    { medId: 'soro_fisiologico', esquema: 'Hidratação intravenosa durante o jejum e no pré-procedimento.' },
    { medId: 'dipirona', esquema: 'Analgesia: 10 a 15 mg/kg/dose IV a cada 6 h, conforme bula.' },
    { medId: 'ondansetrona', esquema: 'Náusea e vômitos: 0,15 mg/kg/dose IV (máximo 8 mg), conforme bula.' },
    { medId: 'ceftriaxona', esquema: 'Suspeita de perfuração ou de mediastinite: 50 a 100 mg/kg/dia IV, associada a cobertura para anaeróbios, conforme protocolo do serviço.' },
    { medId: 'metronidazol', esquema: 'Cobertura para anaeróbios em suspeita de mediastinite: 22,5 a 30 mg/kg/dia IV dividida 8/8 h, conforme protocolo do serviço.' }
  ],
  criteriosInternacao: [
    'Bateria localizada no esôfago, em qualquer situação.',
    'Criança sintomática após ingestão de bateria em qualquer localização.',
    'Bateria de 20 mm ou mais em menor de 5 anos.',
    'Coingestão de bateria com ímã.',
    'Tempo de ingestão desconhecido.',
    'Necessidade de remoção endoscópica ou de transferência para serviço com endoscopia.',
    'Observação após a remoção, conforme o grau de lesão da mucosa.',
    'Impossibilidade de retorno rápido ou domicílio distante.',
    'Suspeita de negligência.'
  ],
  criteriosUTI: [
    'Sangramento digestivo importante ou suspeita de fístula aortoesofágica.',
    'Perfuração esofágica, mediastinite ou instabilidade hemodinâmica.',
    'Comprometimento de via aérea, estridor grave ou necessidade de ventilação mecânica.',
    'Pós-operatório de cirurgia torácica ou vascular de urgência.',
    'Sepse.'
  ],
  criteriosAlta: [
    'Bateria removida ou eliminada, com confirmação radiológica quando indicada.',
    'Criança deglutindo e aceitando dieta adequada, sem dor e sem vômitos.',
    'Ausência de sangramento, de febre e de sinais respiratórios.',
    'Plano de seguimento definido conforme a lesão encontrada na endoscopia.',
    'Responsável orientado a retornar imediatamente diante de qualquer sangramento, vômito com sangue, dor torácica, febre, engasgo ou dificuldade para engolir, inclusive semanas depois.',
    'Orientação registrada sobre guarda de baterias e sobre dispositivos com compartimento sem parafuso.',
    'Retorno agendado.'
  ],
  orientacoes: [
    'Se a criança engoliu ou pode ter engolido uma pilha redonda, do tipo botão, levar imediatamente ao serviço de saúde: é urgência, não espere para ver se passa.',
    'Não faça a criança vomitar e não dê comida.',
    'Se a criança tem mais de 1 ano, está acordada, consegue engolir e a equipe orientar, pode ser dado mel, 10 mL a cada 10 minutos, até chegar ao serviço com endoscopia. Nunca dar mel a bebê menor de 1 ano.',
    'Levar, se possível, o aparelho de onde a pilha saiu, para a equipe saber o tamanho e o tipo.',
    'Depois que a pilha for retirada, voltar imediatamente se a criança vomitar sangue, tiver fezes pretas, dor no peito, febre, tosse, engasgo ou dificuldade para engolir, mesmo que isso aconteça dias ou semanas depois.',
    'Guardar pilhas botão novas e usadas em local alto e trancado, e descartar em ponto de coleta, nunca no lixo comum de casa, onde a criança pode pegar.',
    'Verificar se os brinquedos, controles e chaveiros da casa têm o compartimento de pilha fechado com parafuso; se estiver solto, prender com fita forte ou retirar o aparelho do alcance.',
    'Não deixar controle remoto, balança de banheiro, relógio, calculadora e cartão musical ao alcance de crianças pequenas.',
    'Explicar aos irmãos maiores que pilha não é brinquedo e que não se deve dar pilha para o bebê.',
    'Pilha que já não funciona continua perigosa: ela ainda queima por dentro.'
  ],
  retorno: 'Após a remoção, seguimento conforme o grau de lesão da mucosa, com reavaliação clínica em 24 a 48 horas e acompanhamento por gastroenterologia ou cirurgia pediátrica quando houver lesão profunda, com pesquisa de estenose em 3 a 6 semanas. Manter orientação de retorno imediato diante de qualquer sangramento, disfagia, dor torácica ou febre, inclusive semanas após a alta, pelo risco de fístula e de estenose tardias. Nos casos de bateria já no trajeto intestinal, retorno com radiografia de controle conforme o protocolo do serviço.',
  prevencao: [
    'Guardar pilhas botão novas e usadas em local alto, trancado e fora da vista, e descartá-las em pontos de coleta.',
    'Preferir aparelhos e brinquedos com compartimento de bateria preso por parafuso.',
    'Prender com fita adesiva forte a tampa do compartimento de pilha de controles remotos e de brinquedos.',
    'Manter fora do alcance controle remoto, relógio, balança, calculadora, chaveiro com luz, cartão musical e aparelho auditivo.',
    'Não trocar pilha na frente da criança e não deixar a pilha sobre a mesa ou no sofá.',
    'Orientar cuidadores, creches e escolas sobre o risco e sobre a urgência do atendimento.',
    'Informar que pilha descarregada continua perigosa.',
    'Divulgar nas unidades de saúde que a ingestão de pilha botão é emergência com prazo de horas.',
    'Registrar e discutir os casos localmente, para orientar ações de prevenção.'
  ],
  fontes: [
    { nome: 'NASPGHAN – Management of ingested foreign bodies in children, clinical report', ano: 2015 },
    { nome: 'ESPGHAN/NASPGHAN – Button battery ingestion, recomendações e uso de mel e sucralfato', ano: 2021 },
    { nome: 'Tratado de Pediatria – Sociedade Brasileira de Pediatria', ano: 2022 },
    { nome: 'Nelson Textbook of Pediatrics', ano: 2020 }
  ],
  atualizadoEm: '2026-09'
});

// ==================================== 6. CORPO ESTRANHO EM VIA AÉREA (ENGASGO)
PED.data.acidentes.protocolos.push({
  id: 'corpo_estranho_via_aerea',
  nome: 'Engasgo e aspiração de corpo estranho em via aérea',
  categoria: 'acidente',
  amazonia: false,
  cid10: 'T17',
  tags: ['tosse', 'dispneia', 'estridor', 'cianose', 'alteracao_consciencia', 'febre', 'vomitos', 'palidez'],
  definicao: 'Obstrução parcial ou completa da via aérea por alimento ou objeto aspirado. A obstrução completa é uma das poucas emergências em que a intervenção de quem está ao lado, nos primeiros minutos, define a sobrevivência. A obstrução parcial com tosse eficaz tem conduta oposta: não intervir e deixar a criança tossir.',
  epidemiologia: 'Principal causa de morte por acidente em menores de 1 ano e uma das principais em menores de 4 anos. A criança pequena tem via aérea estreita, dentição incompleta, coordenação imatura entre mastigação e deglutição e o hábito de levar objetos à boca, além de correr, rir e falar enquanto come. Os alimentos mais implicados são amendoim e outras castanhas, milho, feijão, pipoca, uva inteira, salsicha em rodela, pedaço de carne, cenoura crua, bala dura, chiclete e gelatina em bloco; entre os objetos, peças pequenas de brinquedo, tampa de caneta, bolinha de gude, moeda, botão, balão de borracha e pilha. Na região, somam-se caroços de frutas regionais e espinha de peixe, presentes na alimentação diária. O balão de borracha é particularmente perigoso porque se molda à via aérea. Uma parcela importante dos casos chega tardiamente, semanas depois, com tosse crônica, sibilância unilateral ou pneumonia de repetição no mesmo lobo, quando o episódio de engasgo não foi presenciado ou não foi valorizado.',
  agente: 'Alimentos (amendoim, castanha, milho, feijão, pipoca, uva, salsicha, carne, cenoura crua, bala, caroço de fruta, espinha de peixe) e objetos (peça de brinquedo, tampa de caneta, moeda, botão, bolinha, balão de borracha, pilha, prego, parafuso, grão). Objetos orgânicos, como amendoim e feijão, causam reação inflamatória intensa e incham com a umidade.',
  transmissao: 'Não se aplica: agravo por causa externa, por aspiração acidental durante a alimentação, a brincadeira, o choro ou a corrida com objeto na boca.',
  incubacao: 'Não se aplica. A obstrução é imediata. A apresentação tardia, quando o corpo estranho permanece em brônquio, manifesta-se ao longo de dias a semanas como tosse persistente, sibilância localizada e pneumonia de repetição.',
  manifestacoes: [
    'Início súbito de engasgo, tosse, ânsia e sufocação em criança previamente bem, habitualmente durante a alimentação ou a brincadeira.',
    'Obstrução parcial com tosse eficaz: a criança tosse com força, chora, fala, respira e mantém coloração normal.',
    'Obstrução parcial com tosse ineficaz: tosse fraca e silenciosa, incapacidade de falar ou de chorar, estridor, esforço respiratório crescente, agitação e cianose.',
    'Obstrução completa: ausência de som, ausência de tosse, criança levando as mãos ao pescoço (em maiores), cianose progressiva e perda rápida da consciência.',
    'Sibilância unilateral, murmúrio vesicular assimétrico e roncos localizados quando o corpo estranho está em brônquio.',
    'Fase de acalmia enganosa: após o episódio inicial, a criança pode parecer bem por horas ou dias, com o corpo estranho alojado em brônquio.',
    'Apresentação tardia: tosse persistente, chiado que não responde a broncodilatador, pneumonia de repetição no mesmo lobo, atelectasia ou abscesso pulmonar.',
    'Corpo estranho laríngeo: estridor, disfonia, afonia, tosse ladrante e desconforto importante.',
    'Rouquidão e dor cervical quando há lesão de laringe.',
    'Parada respiratória e parada cardiorrespiratória por hipóxia nos casos de obstrução completa não resolvida.'
  ],
  sinaisAlarme: [
    'Incapacidade de tossir, de falar ou de chorar.',
    'Tosse fraca e silenciosa, estridor ou esforço respiratório importante.',
    'Cianose, palidez acentuada ou queda de saturação.',
    'Alteração do nível de consciência ou perda da consciência.',
    'Criança que respira mal após o episódio, mesmo depois de a tosse cessar.',
    'Assimetria de murmúrio vesicular ou sibilância unilateral.',
    'História de engasgo com amendoim, castanha, semente ou objeto pequeno, ainda que a criança pareça bem.',
    'Ingestão ou aspiração de balão de borracha.',
    'Tosse crônica, chiado localizado ou pneumonia de repetição no mesmo lobo.',
    'Episódio presenciado seguido de melhora aparente: não descarta corpo estranho em brônquio.'
  ],
  diagnosticoDiferencial: ['corpo_estranho_digestivo', 'ingestao_pilha_botao', 'laringotraqueíte viral (crupe)', 'epiglotite', 'asma e bronquiolite', 'pneumonia', 'anafilaxia com edema de via aérea', 'abscesso retrofaríngeo', 'malformação de via aérea', 'refluxo gastroesofágico com engasgo de repetição'],
  exames: ['oximetria de pulso', 'radiografia_torax', 'radiografia de tórax em inspiração e expiração ou em decúbito lateral (pesquisa de aprisionamento aéreo unilateral)', 'radiografia cervical em perfil', 'hemograma', 'gasometria', 'broncoscopia rígida diagnóstica e terapêutica', 'tomografia de tórax em casos selecionados e de apresentação tardia'],
  criteriosDiagnosticos: [
    'História de engasgo súbito em criança previamente bem é o dado mais importante e, por si só, justifica a investigação, mesmo com exame físico e radiografia normais.',
    'Avaliar imediatamente se a tosse é eficaz ou ineficaz: essa distinção define toda a conduta inicial.',
    'A maioria dos corpos estranhos aspirados é radiotransparente: a radiografia normal não exclui o diagnóstico.',
    'Procurar sinais indiretos na radiografia: hiperinsuflação localizada, desvio do mediastino, atelectasia, consolidação persistente e aprisionamento aéreo em expiração ou em decúbito lateral.',
    'Assimetria de ausculta com sibilância unilateral em criança sem história prévia de asma é altamente sugestiva.',
    'Considerar broncoscopia rígida, diagnóstica e terapêutica, quando a suspeita for consistente, independentemente da radiografia.',
    'Em quadro arrastado de tosse, chiado ou pneumonia de repetição no mesmo lobo, investigar corpo estranho, ainda que não haja relato de engasgo.',
    'Registrar o objeto ou alimento suspeito e o horário do episódio.'
  ],
  classificacaoGravidade: [
    { nivel: 'Obstrução parcial com tosse eficaz', criterios: 'A criança tosse com força, chora ou fala e respira. Considerar não intervir, encorajar a tosse, manter a criança calma e em posição confortável, vigiar de perto e não oferecer água nem alimento; procurar avaliação médica.' },
    { nivel: 'Obstrução com tosse ineficaz e criança consciente', criterios: 'Tosse fraca ou ausente, incapacidade de falar ou chorar, estridor, cianose. Considerar manobras de desobstrução conforme a idade, alternando e reavaliando, e acionar o SAMU pelo 192.' },
    { nivel: 'Obstrução com criança inconsciente', criterios: 'Perda de consciência, ausência de respiração eficaz. Considerar início imediato de reanimação cardiopulmonar, com inspeção da cavidade oral antes de cada sequência de ventilações e retirada apenas do objeto visível.' }
  ],
  tratamento: [
    'Reconhecer a situação e chamar ajuda: acionar o SAMU pelo 192 sem interromper as manobras.',
    'Tosse eficaz: não bater nas costas, não comprimir o abdome e não colocar o dedo na boca; encorajar a tosse, manter a criança calma e vigiar continuamente, porque a tosse pode tornar-se ineficaz.',
    'Nunca fazer varredura digital às cegas: empurra o objeto, causa edema e pode transformar obstrução parcial em completa. Retirar apenas o objeto que estiver visível e ao alcance dos dedos.',
    'Lactente menor de 1 ano, consciente, com tosse ineficaz: posicionar em decúbito ventral sobre o antebraço, com a cabeça mais baixa que o tronco e a mandíbula apoiada, e aplicar 5 golpes dorsais firmes na região interescapular com a base da mão; em seguida virar em bloco e aplicar 5 compressões torácicas no mesmo ponto das compressões da reanimação, no terço inferior do esterno, com ritmo mais lento e mais vigoroso. Alternar 5 golpes e 5 compressões, reavaliando a boca a cada ciclo sem varredura às cegas.',
    'Não aplicar compressões abdominais em lactentes, pelo risco de lesão hepática e de vísceras.',
    'Criança maior de 1 ano, consciente, com tosse ineficaz: realizar a manobra de Heimlich, com compressões abdominais rápidas para dentro e para cima, com o socorrista posicionado atrás da criança e o punho fechado acima da cicatriz umbilical e abaixo do apêndice xifoide, repetindo até a desobstrução ou até a perda de consciência. Alguns protocolos recomendam alternar 5 golpes dorsais e 5 compressões abdominais.',
    'Criança que perde a consciência: colocar em superfície rígida, iniciar reanimação cardiopulmonar com compressões torácicas, abrir a via aérea e inspecionar a boca antes de cada sequência de ventilações, removendo apenas o objeto visível; seguir o algoritmo de PALS e acionar suporte avançado.',
    'Suporte avançado: oxigênio, laringoscopia direta com pinça de Magill para corpo estranho visível acima das cordas vocais, e via aérea cirúrgica de emergência apenas em obstrução total não resolvida por profissional habilitado, conforme protocolo.',
    'Após a desobstrução, manter a criança em observação com oximetria, mesmo que pareça bem, e avaliar a necessidade de radiografia e de broncoscopia; o corpo estranho pode ter migrado para um brônquio.',
    'Corpo estranho em brônquio: remoção por broncoscopia rígida em centro com equipe habilitada; evitar manipulação e transporte sem preparo, e manter a criança em posição confortável, sem agitar.',
    'Não usar broncodilatador e fisioterapia respiratória na tentativa de mobilizar o corpo estranho, pelo risco de deslocamento para a traqueia com obstrução completa.',
    'Antibiótico apenas se houver infecção associada, como pneumonia pós-obstrutiva.',
    'Após a alta, orientação detalhada sobre alimentos e objetos de risco e sobre a manobra de desobstrução para os cuidadores.'
  ],
  medicamentos: [
    { medId: null, nome: 'Nenhum medicamento desobstrui a via aérea', esquema: 'A desobstrução da via aérea é mecânica. Medicamentos têm papel apenas no suporte, na sedação para broncoscopia e no tratamento de complicações.' },
    { medId: 'adrenalina', esquema: 'Parada cardiorrespiratória por asfixia, conforme protocolo de PALS: 0,01 mg/kg IV ou IO da solução 1:10.000, a cada 3 a 5 minutos. Também considerada por via inalatória em edema de via aérea após a remoção, conforme protocolo do serviço.' },
    { medId: 'dexametasona', esquema: 'Edema de via aérea após a remoção ou após manipulação, conforme protocolo do serviço: 0,15 a 0,6 mg/kg/dose, conforme bula.' },
    { medId: 'cetamina', esquema: 'Sedação para broncoscopia, sob responsabilidade de equipe habilitada e com monitorização, conforme protocolo do serviço. Confirmar conforme protocolo/bula.', verificar: true },
    { medId: 'midazolam', esquema: 'Sedação para procedimento, com monitorização contínua, conforme protocolo do serviço. Confirmar conforme protocolo/bula.', verificar: true },
    { medId: 'amoxicilina_clavulanato', esquema: 'Pneumonia pós-obstrutiva ou infecção associada em apresentação tardia: 45 a 50 mg/kg/dia do componente amoxicilina VO dividida 12/12 h, conforme protocolo do serviço.' },
    { medId: 'ceftriaxona', esquema: 'Infecção grave ou pneumonia pós-obstrutiva com internação: 50 a 100 mg/kg/dia IV, conforme protocolo do serviço.' },
    { medId: 'soro_fisiologico', esquema: 'Hidratação intravenosa no jejum pré-broncoscopia.' }
  ],
  criteriosInternacao: [
    'Qualquer criança com suspeita de corpo estranho em via aérea, para observação e definição de broncoscopia.',
    'Desconforto respiratório, estridor, sibilância unilateral ou queda de saturação.',
    'Episódio de engasgo com perda de consciência ou com cianose, mesmo com melhora posterior.',
    'História de aspiração de amendoim, castanha, semente ou objeto pequeno, mesmo com criança assintomática, conforme protocolo do serviço.',
    'Radiografia com sinais indiretos de corpo estranho.',
    'Apresentação tardia com pneumonia de repetição, atelectasia ou tosse crônica.',
    'Necessidade de transferência para serviço com broncoscopia rígida.',
    'Cuidador inseguro quanto aos sinais de alarme ou domicílio distante.'
  ],
  criteriosUTI: [
    'Insuficiência respiratória ou necessidade de ventilação mecânica.',
    'Parada cardiorrespiratória revertida, com necessidade de cuidados pós-parada.',
    'Encefalopatia hipóxico-isquêmica após obstrução prolongada.',
    'Instabilidade após broncoscopia, com edema de via aérea, pneumotórax ou sangramento.',
    'Obstrução de traqueia ou de brônquio principal com risco de obstrução completa.'
  ],
  criteriosAlta: [
    'Corpo estranho removido ou afastado com segurança, conforme avaliação e exames.',
    'Respiração normal, saturação adequada em ar ambiente e ausculta simétrica.',
    'Alimentação e hidratação por via oral bem toleradas após o procedimento.',
    'Ausência de febre e de sinais de infecção.',
    'Cuidador orientado sobre alimentos e objetos de risco por faixa etária e treinado na manobra de desobstrução.',
    'Retorno agendado e sinais de alarme explicados.'
  ],
  orientacoes: [
    'Se a criança está engasgada mas consegue tossir com força, chorar ou falar, não bata nas costas e não coloque o dedo na boca: incentive a tossir e fique ao lado o tempo todo.',
    'Nunca enfie o dedo na boca da criança para procurar o objeto: isso pode empurrar e fechar de vez a passagem do ar. Só tire o que estiver visível e fácil de pegar.',
    'Se o bebê com menos de 1 ano não consegue tossir, chorar nem respirar: deite o bebê de bruços sobre o seu antebraço, com a cabeça mais baixa, e dê 5 tapas firmes entre as costas, com a base da mão; depois vire o bebê de barriga para cima e faça 5 compressões no meio do peito. Repita até sair o objeto ou até chegar socorro.',
    'Se a criança tem mais de 1 ano e não consegue tossir nem falar: fique atrás dela, abrace a barriga, feche a mão acima do umbigo e faça compressões rápidas para dentro e para cima (manobra de Heimlich), até sair o objeto.',
    'Se a criança desmaiar, coloque no chão, chame o SAMU pelo 192 e inicie as compressões no peito, olhando dentro da boca antes de soprar e tirando só o que estiver visível.',
    'Não dê água, comida, pão nem nada para empurrar o objeto.',
    'Mesmo que o objeto saia e a criança melhore, leve ao serviço de saúde: um pedaço pode ter ficado no pulmão.',
    'Não ofereça a menores de 4 anos amendoim, castanha, milho, pipoca, uva inteira, salsicha em rodela, bala dura, chiclete, cenoura crua ou pedaços grandes de carne.',
    'Corte uva, tomate e salsicha no sentido do comprimento e em pedaços pequenos, e ofereça a comida com a criança sentada, calma e sempre com um adulto por perto.',
    'Não deixe a criança comer correndo, rindo, deitada, no colo em movimento ou dentro do barco em movimento, e guarde longe dela peças pequenas de brinquedo, tampas de caneta, moedas, botões, bolinhas e balões de borracha.'
  ],
  retorno: 'Reavaliação em 24 a 48 horas após a alta, com retorno imediato diante de tosse persistente, chiado, febre, dificuldade para respirar ou cansaço ao mamar e ao brincar. Em criança submetida a broncoscopia, seguimento conforme o serviço, com radiografia de controle quando indicada. Em quadros de apresentação tardia, acompanhar a resolução da atelectasia e da pneumonia e reavaliar a função pulmonar conforme necessidade.',
  prevencao: [
    'Não oferecer a menores de 4 anos alimentos duros, redondos ou pegajosos: amendoim, castanha, milho, pipoca, uva inteira, salsicha em rodela, bala dura, chiclete, cenoura crua e pedaços grandes de carne.',
    'Cortar alimentos redondos no comprimento e em pedaços pequenos, e retirar espinhas de peixe e caroços de frutas antes de oferecer.',
    'Alimentar a criança sentada, sem pressa, sem brincadeiras, sem correr e sem televisão, e sempre com supervisão de adulto.',
    'Não alimentar criança dentro de barco, carro ou moto em movimento.',
    'Guardar longe do alcance peças pequenas de brinquedo, moedas, botões, bolinhas de gude, tampas de caneta, grãos, pregos e parafusos.',
    'Não dar balão de borracha para criança pequena e recolher imediatamente os pedaços de balão estourado.',
    'Verificar a faixa etária indicada nas embalagens dos brinquedos e supervisionar brincadeiras de irmãos maiores.',
    'Treinar pais, cuidadores, professores, agentes comunitários de saúde e profissionais de creches nas manobras de desobstrução por faixa etária.',
    'Divulgar nas comunidades que não se deve colocar o dedo na boca nem oferecer água durante o engasgo.',
    'Manter o SAMU 192 e os Bombeiros 193 anotados e visíveis em casa, na creche e na escola.'
  ],
  fontes: [
    { nome: 'PALS – Pediatric Advanced Life Support, American Heart Association', ano: 2020 },
    { nome: 'European Resuscitation Council Guidelines – Paediatric Life Support', ano: 2021 },
    { nome: 'Tratado de Pediatria – Sociedade Brasileira de Pediatria', ano: 2022 },
    { nome: 'Nelson Textbook of Pediatrics', ano: 2020 }
  ],
  atualizadoEm: '2026-09'
});

// ================================ 7. CORPO ESTRANHO NO TRATO DIGESTIVO
PED.data.acidentes.protocolos.push({
  id: 'corpo_estranho_digestivo',
  nome: 'Ingestão de corpo estranho no trato digestivo',
  categoria: 'acidente',
  amazonia: false,
  cid10: 'T18',
  tags: ['vomitos', 'dor_abdominal', 'dor_local', 'sangramento', 'febre', 'desidratacao', 'tosse'],
  definicao: 'Ingestão de objeto não alimentar ou de alimento impactado no trato digestivo. A maior parte dos objetos que ultrapassa o esôfago progride espontaneamente e é eliminada nas fezes, mas há um grupo de alto risco que exige remoção imediata: pilha botão, ímãs em número maior que um, objetos pontiagudos, objetos longos e qualquer objeto impactado no esôfago.',
  epidemiologia: 'É uma das queixas mais frequentes em pronto-socorro pediátrico, com pico entre 6 meses e 3 anos, quando a exploração oral é parte do desenvolvimento. A moeda é o objeto mais ingerido no Brasil. Ganham importância crescente os ímãs de neodímio, presentes em brinquedos magnéticos, em peças de montagem e em pseudopiercings usados por adolescentes: dois ou mais ímãs, ou um ímã com um objeto metálico, atraem-se através das alças intestinais e causam necrose por pressão, fístula, perfuração, volvo e obstrução, com necessidade de cirurgia. Espinha de peixe e osso de galinha são causas comuns de impactação e de perfuração em qualquer idade, com peso especial na alimentação regional baseada em peixe. Ingestões repetidas ou ingestão em criança maior devem levantar a hipótese de transtorno do desenvolvimento, de pica ou de contexto de violência e negligência.',
  agente: 'Moeda, botão, clipe, tampa, peça de brinquedo, brinco, anel, alfinete, agulha, prego, parafuso, palito, espinha de peixe, osso, ímã de neodímio, pilha botão, elástico e bolinha de gel absorvente, que incha após a ingestão e pode causar obstrução mesmo sendo inicialmente pequena.',
  transmissao: 'Não se aplica: agravo por causa externa, por ingestão acidental, exploratória ou, em adolescentes, intencional.',
  incubacao: 'Não se aplica. Objetos que passam o esôfago costumam atravessar o trato digestivo em 4 a 7 dias, podendo levar até 2 a 4 semanas. Objetos impactados no esôfago causam sintomas imediatos. Lesões por ímãs múltiplos podem levar dias para se manifestar.',
  manifestacoes: [
    'Muitas crianças estão assintomáticas, com história de ingestão presenciada ou referida pela própria criança.',
    'Corpo estranho impactado no esôfago: sialorreia, recusa alimentar, disfagia, engasgo, dor cervical ou retroesternal, vômitos e sensação de algo parado.',
    'Sintomas respiratórios por compressão traqueal: tosse, estridor, chiado e desconforto, sobretudo em lactentes.',
    'Objeto no estômago ou no intestino: habitualmente assintomático.',
    'Dor abdominal, vômitos, distensão, parada de eliminação de gases e fezes: compatível com obstrução.',
    'Febre, dor abdominal localizada, defesa e toxemia: compatível com perfuração e peritonite, mais frequente com objetos pontiagudos, espinha de peixe e osso.',
    'Sangramento digestivo, hematêmese ou melena.',
    'Espinha de peixe encravada em orofaringe ou em amígdala: dor localizada à deglutição, sensação de espinho e sialorreia.',
    'Ímãs múltiplos: dor abdominal intermitente, vômitos e sinais de obstrução ou de perfuração dias após a ingestão, em criança que pode parecer bem no início.',
    'Bolinha de gel absorvente: quadro obstrutivo tardio, com vômitos e distensão, em objeto que era pequeno ao ser engolido.'
  ],
  sinaisAlarme: [
    'Sialorreia, disfagia ou recusa total de alimentos, que sugerem impactação esofágica.',
    'Desconforto respiratório, estridor ou tosse persistente após a ingestão.',
    'Ingestão de pilha botão: conduzir conforme o protocolo específico, como emergência.',
    'Ingestão de dois ou mais ímãs, ou de um ímã com objeto metálico.',
    'Objeto pontiagudo ou cortante (alfinete, agulha, prego, espinha grande, osso, palito).',
    'Objeto longo, acima de cerca de 5 cm em lactentes e de 6 a 10 cm em crianças maiores, conforme protocolo.',
    'Dor abdominal intensa, distensão, vômitos persistentes, febre ou sinais de peritonite.',
    'Sangramento digestivo de qualquer intensidade.',
    'Objeto parado no mesmo lugar em radiografias sucessivas.',
    'Ingestões repetidas ou em criança maior, que sugerem transtorno do desenvolvimento, pica, sofrimento psíquico ou negligência.'
  ],
  diagnosticoDiferencial: ['ingestao_pilha_botao', 'corpo_estranho_via_aerea', 'ingestao_caustico', 'impactação alimentar sobre esofagite eosinofílica ou estenose prévia', 'faringoamigdalite', 'refluxo gastroesofágico', 'invaginação intestinal', 'apendicite aguda'],
  exames: ['radiografia cervical, de tórax e de abdome em incidências anteroposterior e perfil, cobrindo da boca ao ânus', 'radiografia_torax', 'hemograma', 'radiografia de abdome seriada para acompanhar a progressão quando indicado', 'tomografia de abdome em suspeita de perfuração ou de complicação', 'endoscopia digestiva alta diagnóstica e terapêutica', 'laringoscopia ou nasofibroscopia em suspeita de espinha de peixe em orofaringe'],
  criteriosDiagnosticos: [
    'História de ingestão presenciada ou referida; em criança pequena com sialorreia, recusa alimentar ou engasgo súbito, considerar corpo estranho mesmo sem relato.',
    'Radiografia em incidências anteroposterior e perfil, cobrindo pescoço, tórax e abdome, para localizar o objeto e diferenciar esôfago de traqueia.',
    'Verificar sempre se o objeto redondo é moeda ou pilha botão, procurando o sinal do halo ou do duplo anel e o degrau lateral: a conduta é completamente diferente.',
    'Objetos radiotransparentes, como plástico, madeira, espinha fina e alguns vidros, não aparecem na radiografia; nesses casos, a decisão é clínica e pode exigir endoscopia.',
    'Definir o tamanho, a forma e o número de objetos: em ímãs, contar quantos foram ingeridos, lembrando que peças alinhadas podem parecer uma só na radiografia.',
    'Corpo estranho no esôfago: considerar remoção endoscópica, em geral em até 24 horas e imediatamente se houver sintomas, objeto pontiagudo, pilha ou ímãs.',
    'Objeto rombo e pequeno no estômago, em criança assintomática: considerar conduta expectante com dieta habitual, pesquisa nas fezes e radiografia de controle conforme protocolo, habitualmente em 1 a 2 semanas.',
    'Considerar avaliação do contexto psicossocial em ingestões repetidas ou intencionais.'
  ],
  classificacaoGravidade: [
    { nivel: 'Baixo risco', criterios: 'Objeto rombo, pequeno, já no estômago ou além, em criança assintomática. Considerar observação domiciliar orientada, dieta habitual, pesquisa do objeto nas fezes e radiografia de controle conforme protocolo.' },
    { nivel: 'Risco intermediário', criterios: 'Objeto rombo impactado no esôfago em criança pouco sintomática, ou objeto grande no estômago. Considerar internação e remoção endoscópica programada em até 24 horas.' },
    { nivel: 'Alto risco', criterios: 'Pilha botão, dois ou mais ímãs, objeto pontiagudo ou longo, impactação esofágica sintomática, sinais de obstrução, perfuração ou sangramento. Considerar remoção imediata e avaliação cirúrgica.' }
  ],
  tratamento: [
    'Não provocar vômito e não oferecer alimento antes da avaliação e da definição da conduta.',
    'Não empurrar o objeto com pão, banana, arroz ou qualquer alimento na tentativa de fazê-lo descer.',
    'Manter jejum quando houver indicação de endoscopia ou dúvida sobre a localização.',
    'Objeto no esôfago: remoção endoscópica, imediata se houver sintomas, pilha botão, ímãs ou objeto pontiagudo, e em até 24 horas nos demais casos, conforme protocolo do serviço.',
    'Pilha botão: conduzir conforme o protocolo específico, como emergência com remoção idealmente em até 2 horas.',
    'Dois ou mais ímãs, ou um ímã com objeto metálico: considerar remoção endoscópica se ainda ao alcance e avaliação cirúrgica se já no intestino, pelo risco de necrose por pressão entre alças, fístula e perfuração; manter vigilância clínica e radiológica estreita.',
    'Objeto pontiagudo no estômago ou no duodeno proximal: considerar remoção endoscópica pelo risco de perfuração.',
    'Objeto rombo e pequeno no estômago, criança assintomática: dieta habitual, atividade normal, pesquisa do objeto nas fezes e radiografia de controle conforme protocolo; remover se permanecer no estômago além do prazo definido ou se surgirem sintomas.',
    'Não usar laxante, não induzir diarreia e não usar sonda com balão às cegas para retirar objeto do esôfago.',
    'Espinha de peixe ou osso em orofaringe: inspeção com boa iluminação e remoção com pinça por profissional habilitado; se não for visualizada e a dor persistir, considerar nasofibroscopia ou avaliação por otorrinolaringologia.',
    'Analgesia e hidratação conforme necessidade; antibiótico apenas em suspeita de perfuração ou de infecção.',
    'Avaliação cirúrgica em obstrução, perfuração, peritonite, sangramento importante ou falha da endoscopia.',
    'Após a resolução, orientar guarda de objetos pequenos, de ímãs e de bolinhas de gel, e avaliar o contexto familiar em casos repetidos.'
  ],
  medicamentos: [
    { medId: 'soro_fisiologico', esquema: 'Hidratação intravenosa durante o jejum e no pré-procedimento.' },
    { medId: 'dipirona', esquema: 'Analgesia: 10 a 15 mg/kg/dose VO ou IV a cada 6 h, conforme bula.' },
    { medId: 'paracetamol', esquema: 'Analgesia: 10 a 15 mg/kg/dose VO a cada 6 h, conforme bula.' },
    { medId: 'ondansetrona', esquema: 'Náusea e vômitos: 0,15 mg/kg/dose IV (máximo 8 mg), conforme bula.' },
    { medId: 'midazolam', esquema: 'Sedação para endoscopia, com monitorização contínua e equipe habilitada, conforme protocolo do serviço. Confirmar conforme protocolo/bula.', verificar: true },
    { medId: 'cetamina', esquema: 'Sedação para procedimento conforme protocolo do serviço, com monitorização. Confirmar conforme protocolo/bula.', verificar: true },
    { medId: 'ceftriaxona', esquema: 'Suspeita de perfuração ou de infecção: 50 a 100 mg/kg/dia IV, associada a cobertura para anaeróbios, conforme protocolo do serviço.' },
    { medId: 'metronidazol', esquema: 'Cobertura para anaeróbios em perfuração ou peritonite, associada a cefalosporina: 22,5 a 30 mg/kg/dia IV dividida 8/8 h, conforme protocolo do serviço.' },
    { medId: null, nome: 'Glucagon', esquema: 'Ocasionalmente considerado em impactação alimentar esofágica em adolescentes, com eficácia limitada e sem substituir a endoscopia. Confirmar conforme protocolo/bula.', verificar: true }
  ],
  criteriosInternacao: [
    'Corpo estranho impactado no esôfago.',
    'Pilha botão em qualquer localização, conforme o protocolo específico.',
    'Dois ou mais ímãs ingeridos, ou ímã com objeto metálico.',
    'Objeto pontiagudo, cortante ou longo.',
    'Criança sintomática: sialorreia, disfagia, vômitos, dor abdominal, sinais respiratórios.',
    'Sinais de obstrução, de perfuração ou de sangramento.',
    'Necessidade de endoscopia ou de transferência para serviço que disponha dela.',
    'Ingestão intencional ou repetida, com necessidade de avaliação psicossocial.',
    'Domicílio distante ou impossibilidade de retorno para controle radiológico.'
  ],
  criteriosUTI: [
    'Perfuração com peritonite, mediastinite ou sepse.',
    'Sangramento digestivo importante com repercussão hemodinâmica.',
    'Obstrução intestinal com instabilidade ou necessidade de cirurgia de urgência.',
    'Comprometimento de via aérea por compressão esofágica em lactente.',
    'Pós-operatório complicado.'
  ],
  criteriosAlta: [
    'Objeto removido, eliminado ou em progressão, com criança assintomática.',
    'Aceitação de dieta adequada à idade, sem dor, sem vômitos e sem sialorreia.',
    'Ausência de febre, de distensão abdominal e de sangramento.',
    'Responsável orientado a observar as fezes e a retornar se o objeto não for eliminado no prazo combinado.',
    'Sinais de alarme explicados: dor abdominal, vômitos, febre, recusa alimentar, sangue nas fezes ou no vômito.',
    'Objetos e ímãs retirados do alcance, com orientação registrada.',
    'Retorno e radiografia de controle agendados quando indicados.'
  ],
  orientacoes: [
    'Se a criança engoliu um objeto, não faça ela vomitar e não dê pão, banana nem arroz para empurrar.',
    'Leve a criança ao serviço de saúde e, se possível, leve um objeto igual ao que foi engolido, para a equipe ver o tamanho e o formato.',
    'Se o objeto for uma pilha redonda ou se forem ímãs, é urgência: vá imediatamente, mesmo que a criança pareça bem.',
    'Se a criança está babando, não consegue engolir, vomita tudo, tem dor no peito ou dificuldade para respirar, procure atendimento imediatamente.',
    'Se a equipe liberar para casa, ofereça a alimentação normal e observe as fezes até o objeto sair; não é preciso dar laxante.',
    'Volte ao serviço se a criança tiver dor de barriga, vômitos, febre, barriga inchada, sangue nas fezes ou se o objeto não sair no prazo combinado.',
    'Cuidado com espinha de peixe e osso de galinha: retire antes de oferecer à criança pequena e não ofereça peixe inteiro sem limpar.',
    'Guarde longe do alcance moedas, botões, brincos, alfinetes, agulhas, pregos, parafusos, clipes e tampas.',
    'Ímãs pequenos e fortes, de brinquedo de montar ou de enfeite de geladeira, são muito perigosos: se a criança engolir dois, eles se grudam por dentro da barriga e podem furar o intestino.',
    'Bolinhas coloridas de gel que crescem na água também são perigosas: elas incham dentro da barriga depois de engolidas.'
  ],
  retorno: 'Nos casos liberados, retorno conforme o protocolo do serviço para radiografia de controle, habitualmente em 1 a 2 semanas se o objeto não for encontrado nas fezes, e imediatamente diante de dor abdominal, vômitos, febre, distensão, recusa alimentar ou sangramento. Após remoção endoscópica, reavaliação em 24 a 48 horas e seguimento conforme a lesão de mucosa encontrada. Em ingestões repetidas, encaminhar para avaliação do desenvolvimento e do contexto familiar.',
  prevencao: [
    'Manter fora do alcance moedas, botões, brincos, alfinetes, agulhas, clipes, pregos, parafusos, tampas e peças pequenas.',
    'Evitar brinquedos com ímãs pequenos e potentes em casas com crianças pequenas e recolher ímãs de geladeira ao alcance.',
    'Não usar pseudopiercings magnéticos em crianças e adolescentes.',
    'Não deixar ao alcance bolinhas de gel absorvente usadas em decoração e em brinquedos sensoriais.',
    'Retirar espinhas e ossos antes de oferecer peixe e frango a crianças pequenas.',
    'Verificar a faixa etária indicada nas embalagens dos brinquedos e supervisionar as brincadeiras com irmãos maiores.',
    'Não guardar objetos pequenos em potes de alimento ou em locais que a criança associe a comida.',
    'Orientar creches e escolas sobre objetos de risco e sobre o que fazer diante de uma ingestão.',
    'Avaliar e acompanhar crianças com pica e com transtorno do desenvolvimento, que apresentam ingestões repetidas.'
  ],
  fontes: [
    { nome: 'NASPGHAN – Management of ingested foreign bodies in children, clinical report', ano: 2015 },
    { nome: 'ESPGHAN – Foreign body ingestion in children, position paper', ano: 2021 },
    { nome: 'Tratado de Pediatria – Sociedade Brasileira de Pediatria', ano: 2022 },
    { nome: 'Nelson Textbook of Pediatrics', ano: 2020 }
  ],
  atualizadoEm: '2026-09'
});

// ======================== 8. CORPO ESTRANHO NASAL E AURICULAR
PED.data.acidentes.protocolos.push({
  id: 'corpo_estranho_nasal_auricular',
  nome: 'Corpo estranho em nariz e em ouvido',
  categoria: 'acidente',
  amazonia: false,
  cid10: 'T16 e T17.1',
  tags: ['dor_local', 'sangramento', 'feridas', 'febre', 'prurido', 'tosse', 'dispneia'],
  definicao: 'Introdução de objeto em fossa nasal ou em conduto auditivo externo, muito frequente em pré-escolares. A maior parte é de baixo risco e permite remoção ambulatorial, mas três situações exigem remoção urgente: pilha botão, ímãs em narinas opostas e objeto vegetal que incha com a umidade. Insetos vivos no conduto auditivo são causa comum e angustiante de atendimento.',
  epidemiologia: 'Ocorre principalmente entre 2 e 5 anos, faixa de exploração e de imitação, e é frequentemente descoberta dias depois por secreção nasal fétida e unilateral. Os objetos mais comuns são contas, miçangas, pedaços de espuma, papel, algodão, grãos de feijão, arroz, milho e sementes, além de peças pequenas de brinquedo e borracha de lápis. Em ambiente rural e ribeirinho, sementes e grãos são muito acessíveis e incham com a umidade, dificultando a remoção; insetos, formigas e baratas entram no conduto auditivo durante o sono, sobretudo quando a criança dorme em rede, em esteira ou no chão. A pilha botão em narina é causa de destruição do septo em poucas horas e deve ser tratada como urgência absoluta.',
  agente: 'Contas, miçangas, botões, papel, algodão, espuma, borracha, peças de brinquedo, grãos e sementes (feijão, milho, arroz, caroços), pilha botão, ímãs, e, no conduto auditivo, também insetos vivos e carrapatos.',
  transmissao: 'Não se aplica: agravo por causa externa, por introdução pela própria criança, por outra criança ou, no caso de insetos, por entrada espontânea durante o sono.',
  incubacao: 'Não se aplica. Objetos inertes podem permanecer dias a semanas antes do diagnóstico, manifestando-se por secreção fétida unilateral. A pilha botão causa necrose em poucas horas. Sementes incham em horas a dias.',
  manifestacoes: [
    'Corpo estranho nasal: obstrução unilateral, secreção purulenta ou sanguinolenta unilateral e de odor fétido, epistaxe, espirros e irritação local.',
    'Secreção nasal unilateral, fétida e persistente em criança pequena é altamente sugestiva de corpo estranho, mesmo sem história de introdução.',
    'Dor e desconforto local; em corpos estranhos antigos, pode haver formação de rinólito.',
    'Corpo estranho auricular: otalgia, sensação de plenitude, hipoacusia, zumbido, prurido e otorreia.',
    'Inseto vivo no conduto: dor intensa, ruído dentro do ouvido, agitação, choro inconsolável e, por vezes, náusea e tontura.',
    'Sangramento e otorreia quando há laceração do conduto ou perfuração da membrana timpânica, espontânea ou por tentativas de remoção.',
    'Pilha botão em narina: dor, secreção sanguinolenta e necrose de septo, com risco de perfuração em poucas horas.',
    'Ímãs em narinas opostas: necrose por pressão do septo nasal.',
    'Complicações: sinusite, celulite periorbitária, otite externa, otite média e, em corpo estranho nasal posterior, risco de aspiração para a via aérea.',
    'Febre e sinais de infecção local ou regional em casos de permanência prolongada.'
  ],
  sinaisAlarme: [
    'Pilha botão em narina ou em conduto auditivo: remoção urgente.',
    'Dois ímãs em narinas opostas ou ímã com objeto metálico.',
    'Sangramento nasal importante ou secreção sanguinolenta com dor intensa.',
    'Desconforto respiratório, tosse ou engasgo, que sugerem deslocamento posterior e risco de aspiração.',
    'Febre, edema facial, celulite periorbitária ou sinais de infecção em progressão.',
    'Objeto vegetal ou semente, que incha e dificulta a remoção.',
    'Perfuração timpânica, otorreia purulenta ou vertigem.',
    'Tentativas prévias de remoção em casa, com sangramento ou edema.',
    'Criança não colaborativa, em que a tentativa sem sedação aumenta o risco de lesão e de empurrar o objeto.',
    'Corpo estranho de longa permanência com odor fétido e granulação.'
  ],
  diagnosticoDiferencial: ['ingestao_pilha_botao', 'corpo_estranho_via_aerea', 'rinossinusite bacteriana', 'rinite alérgica e resfriado comum', 'otite externa e otite média aguda', 'atresia de coana unilateral', 'pólipo nasal', 'tumor e granuloma'],
  exames: ['exame direto com otoscópio e com espéculo nasal sob boa iluminação', 'nasofibroscopia quando disponível e necessária', 'radiografia simples apenas quando houver suspeita de objeto radiopaco, sobretudo pilha botão ou ímã', 'hemograma quando houver sinais de infecção', 'avaliação audiológica em caso de perfuração timpânica ou de hipoacusia persistente'],
  criteriosDiagnosticos: [
    'Considerar corpo estranho nasal em toda criança pequena com secreção nasal unilateral, fétida e persistente, mesmo sem relato de introdução.',
    'Inspeção direta com boa iluminação e material adequado, com a criança bem contida e confortável; evitar exames repetidos e traumáticos.',
    'Diferenciar objeto inerte de pilha botão e de ímã, porque muda o tempo de resposta: quando houver dúvida, considerar radiografia com pesquisa do sinal do halo.',
    'Avaliar a integridade da membrana timpânica antes e depois da remoção no ouvido.',
    'Verificar sempre a narina e o conduto contralaterais, porque objetos múltiplos são frequentes.',
    'Em objeto nasal posterior, ter em mente o risco de deslocamento para a via aérea durante a manipulação.',
    'Encaminhar à otorrinolaringologia quando a remoção ambulatorial não for segura, quando houver falha na primeira tentativa ou quando o objeto for de alto risco.'
  ],
  classificacaoGravidade: [
    { nivel: 'Baixo risco', criterios: 'Objeto inerte, anterior, bem visualizado, em criança colaborativa e sem sangramento. Considerar remoção ambulatorial por profissional habilitado, com material adequado e boa iluminação.' },
    { nivel: 'Risco intermediário', criterios: 'Objeto de difícil visualização, posterior, vegetal ou inchado, criança não colaborativa, tentativa prévia frustrada ou edema local. Considerar encaminhamento para otorrinolaringologia e remoção com sedação ou sob anestesia.' },
    { nivel: 'Alto risco', criterios: 'Pilha botão, ímãs em narinas opostas, sangramento importante, sinais de necrose, infecção em progressão ou risco de aspiração. Considerar remoção urgente por especialista e avaliação de lesão local.' }
  ],
  tratamento: [
    'Acalmar a criança e o acompanhante, e evitar tentativas repetidas e traumáticas, que causam edema, sangramento e empurram o objeto para trás.',
    'Nunca usar pinça em objeto liso, redondo e escorregadio, como conta ou miçanga: a pinça tende a empurrá-lo. Preferir gancho, cureta ou cateter com balão, conforme material disponível e habilidade do profissional.',
    'Não irrigar o conduto auditivo quando houver suspeita de perfuração timpânica, de pilha botão ou de objeto vegetal, porque a água faz a semente inchar e acelera a reação da pilha.',
    'Corpo estranho nasal anterior em criança colaborativa: considerar a manobra do beijo da mãe, em que o responsável oclui a narina livre e sopra pela boca da criança, gerando pressão positiva que expele o objeto. É simples, segura e frequentemente eficaz.',
    'Alternativa em serviço: pressão positiva com ambu ou insuflador, conforme protocolo, com a narina contralateral ocluída.',
    'Considerar vasoconstritor tópico nasal conforme protocolo do serviço e bula, para reduzir o edema antes da tentativa, com atenção à idade e às contraindicações.',
    'Remoção de inseto vivo no conduto auditivo: imobilizar o inseto antes da retirada, instilando óleo mineral, óleo vegetal limpo ou lidocaína conforme protocolo do serviço, desde que a membrana timpânica esteja íntegra; depois remover sob visualização.',
    'Pilha botão em narina ou em conduto: remoção urgente por otorrinolaringologia, sem irrigar; avaliar lesão de septo, de conduto e de membrana timpânica e programar reavaliação.',
    'Ímãs em narinas opostas: remoção urgente pelo risco de necrose do septo.',
    'Após a remoção, inspecionar a cavidade à procura de lesão, de sangramento e de outros objetos.',
    'Considerar antibiótico tópico ou sistêmico apenas quando houver infecção estabelecida, otite externa, sinusite ou lesão significativa de mucosa, conforme avaliação.',
    'Encaminhar para otorrinolaringologia em caso de falha, de objeto posterior, de criança não colaborativa, de lesão de conduto, de perfuração timpânica ou de necessidade de anestesia.',
    'Orientar a família sobre guarda de objetos pequenos e sobre não tentar remover em casa com pinça, cotonete, grampo ou palito.'
  ],
  medicamentos: [
    { medId: null, nome: 'Óleo mineral ou lidocaína tópica', esquema: 'Imobilização de inseto vivo no conduto auditivo antes da remoção, apenas com membrana timpânica íntegra, conforme protocolo do serviço e bula. Confirmar conforme protocolo/bula.', verificar: true },
    { medId: null, nome: 'Vasoconstritor tópico nasal (oximetazolina ou fenilefrina)', esquema: 'Redução do edema antes da tentativa de remoção nasal, conforme idade, protocolo do serviço e bula; atenção às contraindicações em lactentes. Confirmar conforme protocolo/bula.', verificar: true },
    { medId: null, nome: 'Anestésico tópico (lidocaína)', esquema: 'Analgesia local antes da remoção, conforme protocolo do serviço e bula. Confirmar conforme protocolo/bula.', verificar: true },
    { medId: 'midazolam', esquema: 'Sedação para remoção em criança não colaborativa, por equipe habilitada e com monitorização, conforme protocolo do serviço. Confirmar conforme protocolo/bula.', verificar: true },
    { medId: 'cefalexina', esquema: 'Infecção local ou celulite após remoção: 50 mg/kg/dia VO dividida 6/6 h ou 8/8 h, conforme protocolo do serviço.' },
    { medId: 'amoxicilina_clavulanato', esquema: 'Sinusite ou otite associada ao corpo estranho: 45 a 50 mg/kg/dia do componente amoxicilina VO dividida 12/12 h, conforme protocolo do serviço.' },
    { medId: 'ciprofloxacino', esquema: 'Otite externa após lesão de conduto, em apresentação tópica otológica quando disponível, ou por via sistêmica em casos selecionados, conforme protocolo do serviço e bula. Confirmar conforme protocolo/bula.', verificar: true },
    { medId: 'dipirona', esquema: 'Analgesia: 10 a 15 mg/kg/dose VO a cada 6 h, conforme bula.' },
    { medId: 'soro_fisiologico', esquema: 'Limpeza nasal suave após a remoção e irrigação do conduto quando não houver contraindicação.' }
  ],
  criteriosInternacao: [
    'Pilha botão com necrose de septo ou lesão extensa.',
    'Sangramento nasal importante que exija tamponamento e observação.',
    'Infecção com celulite facial, periorbitária ou sinais sistêmicos.',
    'Necessidade de remoção sob anestesia geral.',
    'Suspeita de aspiração do objeto para a via aérea.',
    'Criança com comorbidade ou com dificuldade de acesso a serviço especializado.'
  ],
  criteriosUTI: [
    'Comprometimento de via aérea por aspiração do objeto.',
    'Infecção grave com repercussão sistêmica, como celulite orbitária complicada ou sepse.',
    'Sangramento grave com instabilidade hemodinâmica.',
    'Complicação intracraniana de infecção de origem nasal ou auricular.'
  ],
  criteriosAlta: [
    'Objeto removido integralmente, com inspeção da cavidade e da narina ou conduto contralateral.',
    'Ausência de sangramento ativo e de sinais de infecção em progressão.',
    'Respiração nasal e audição adequadas para a condição, com plano definido quando houver perfuração timpânica.',
    'Responsável orientado sobre sinais de alarme e sobre não tentar remoções em casa.',
    'Encaminhamento garantido quando o objeto não pôde ser removido no serviço.',
    'Retorno agendado quando houver lesão de mucosa ou infecção.'
  ],
  orientacoes: [
    'Não tente tirar o objeto em casa com pinça, grampo, palito, cotonete ou chave: isso empurra o objeto para dentro, machuca e faz sangrar.',
    'Não coloque água no ouvido para tentar lavar, principalmente se o que entrou foi semente, grão ou pilha.',
    'Se a criança colocou uma pilha redonda no nariz ou no ouvido, procure atendimento imediatamente: é urgência, porque queima por dentro em poucas horas.',
    'Se a criança colocou dois imãs, um em cada narina, também é urgência.',
    'Se a criança tem mais de 2 ou 3 anos e o objeto está na frente do nariz, a equipe pode ensinar a manobra do beijo: tampa-se a narina livre e sopra-se na boca da criança.',
    'Secreção só de um lado do nariz, com cheiro ruim, mesmo sem a criança ter contado nada, quase sempre é objeto preso: leve ao serviço de saúde.',
    'Se entrou um inseto no ouvido, não coloque o dedo nem cotonete; leve ao serviço, onde a equipe pode pingar óleo para imobilizar o inseto antes de retirar.',
    'Depois da retirada, volte se houver sangramento, dor forte, febre, inchaço no rosto, secreção com cheiro ruim ou perda de audição.',
    'Guarde longe do alcance contas, miçangas, botões, grãos, sementes, borrachas, pilhas e ímãs.',
    'Explique às crianças maiores que não se deve colocar nada no nariz e no ouvido do irmão menor.'
  ],
  retorno: 'Reavaliação em 24 a 72 horas quando houver lesão de mucosa, sangramento, infecção ou permanência prolongada do objeto, e antes disso se houver febre, dor intensa, edema facial ou secreção purulenta. Em lesão por pilha botão, seguimento com otorrinolaringologia para avaliar perfuração de septo ou de membrana timpânica e sequela funcional. Em perfuração timpânica, avaliação audiológica conforme indicação.',
  prevencao: [
    'Manter fora do alcance contas, miçangas, botões, grãos, sementes, espumas, borrachas de lápis e peças pequenas de brinquedo.',
    'Guardar pilhas botão e ímãs em local alto e trancado.',
    'Supervisionar brincadeiras com materiais escolares e com brinquedos de montar.',
    'Orientar irmãos maiores a não introduzir objetos no nariz e no ouvido de crianças menores.',
    'Usar mosquiteiro e manter rede e roupa de cama limpas, reduzindo a entrada de insetos no conduto auditivo durante o sono.',
    'Evitar o uso de cotonetes e de objetos para limpar o ouvido das crianças.',
    'Orientar creches e escolas sobre materiais de risco por faixa etária.',
    'Reforçar que secreção nasal de um lado só, com odor, deve ser avaliada e não tratada apenas como resfriado.'
  ],
  fontes: [
    { nome: 'Tratado de Pediatria – Sociedade Brasileira de Pediatria', ano: 2022 },
    { nome: 'Nelson Textbook of Pediatrics', ano: 2020 },
    { nome: 'Associação Brasileira de Otorrinolaringologia e Cirurgia Cérvico-Facial – orientações sobre corpo estranho em vias aerodigestivas', ano: 2021 }
  ],
  atualizadoEm: '2026-09'
});

// ================================================== 9. AFOGAMENTO
PED.data.acidentes.protocolos.push({
  id: 'afogamento',
  nome: 'Afogamento na infância',
  categoria: 'acidente',
  amazonia: true,
  cid10: 'T75.1',
  tags: ['dispneia', 'tosse', 'cianose', 'alteracao_consciencia', 'convulsao', 'vomitos', 'palidez', 'febre'],
  definicao: 'Processo de insuficiência respiratória resultante da submersão ou da imersão em meio líquido, com ou sem óbito. O evento primário é a hipóxia: a aspiração de pequena quantidade de água desfaz o surfactante, causa colapso alveolar, desequilíbrio entre ventilação e perfusão e edema pulmonar. O desfecho depende principalmente do tempo de submersão e da rapidez com que a ventilação é restabelecida.',
  epidemiologia: 'O afogamento é uma das principais causas de morte por acidente em crianças no Amazonas e no conjunto da Amazônia, com incidência muito superior à média nacional. A vida cotidiana se organiza em torno da água: rio, igarapé, lago, paraná, poço, porto, flutuante, balsa e travessia diária de barco para a escola e para a roça. Os cenários mais frequentes são a queda do barco ou da canoa sem colete salva-vidas, o banho em igarapé e em praia de rio sem supervisão durante a vazante, o brinquedo que cai na água, a queda de flutuante, de porto e de ponte de madeira, e a travessia em período de cheia, quando a água invade o quintal e a área embaixo da palafita. Em lactentes, o afogamento ocorre com poucos centímetros de água, em balde, bacia, tanque, banheira, tina e poço, dentro da própria casa, em segundos e em silêncio, muitas vezes enquanto o cuidador atende outra criança. Crianças de 1 a 4 anos formam o grupo de maior risco, seguidas de adolescentes do sexo masculino, em que se somam superestimação da própria capacidade, correnteza, mergulho em água rasa e uso de álcool. Fatores agravantes regionais: baixa oferta de aulas de natação, colete salva-vidas ausente ou em número insuficiente nas embarcações, distância até o serviço de saúde e demora no transporte fluvial.',
  agente: 'Submersão ou imersão em água doce de rio, igarapé, lago, poço, açude, piscina, ou em recipientes domésticos com pouca água. Na região, predomina a água doce, frequentemente com correnteza, baixa visibilidade, troncos submersos e margens instáveis, e com temperatura que pode levar à hipotermia em submersão prolongada, sobretudo em crianças pequenas.',
  transmissao: 'Não se aplica: agravo por causa externa. A morbidade decorre da hipóxia e da lesão de reperfusão; a aspiração de água contaminada acrescenta risco de infecção pulmonar secundária.',
  incubacao: 'Não se aplica. A deterioração respiratória costuma ocorrer nas primeiras 4 a 8 horas após o evento; por isso, toda criança sintomática deve ser observada por esse período. A pneumonia bacteriana secundária, quando ocorre, manifesta-se habitualmente entre 48 e 72 horas.',
  manifestacoes: [
    'Criança resgatada consciente, tossindo, com respiração normal ou com taquipneia leve e ausculta limpa: quadro leve, que ainda exige observação.',
    'Tosse persistente, taquipneia, esforço respiratório, estertores, sibilos e queda de saturação: compatível com aspiração e edema pulmonar.',
    'Cianose, respiração agônica, apneia, bradicardia e parada cardiorrespiratória nos quadros graves.',
    'Alteração do nível de consciência: agitação, confusão, sonolência, convulsão ou coma, por hipóxia cerebral.',
    'Vômitos, muito frequentes durante e após o resgate, com risco adicional de aspiração.',
    'Hipotermia, favorecida pela imersão prolongada, pela criança pequena e pela água de rio e de igarapé, que pode estar mais fria do que se imagina, sobretudo à noite e em igarapés sombreados.',
    'Deterioração respiratória tardia nas primeiras horas, em criança que parecia bem logo após o resgate.',
    'Pneumonia bacteriana secundária, mais provável em afogamento em água contaminada, com febre, piora respiratória e novo infiltrado após 48 a 72 horas.',
    'Trauma associado, sobretudo trauma cervical e cranioencefálico em mergulho em água rasa, queda de altura e acidente de embarcação.',
    'Encefalopatia hipóxico-isquêmica em submersão prolongada, com repercussão neurológica que se define nos dias seguintes.'
  ],
  sinaisAlarme: [
    'Apneia, respiração agônica ou ausência de pulso: iniciar reanimação imediatamente.',
    'Alteração do nível de consciência, convulsão ou coma.',
    'Cianose, saturação baixa ou necessidade de oxigênio para manter saturação adequada.',
    'Taquipneia, esforço respiratório, estertores ou sibilos.',
    'Tempo de submersão prolongado ou desconhecido.',
    'Necessidade de qualquer manobra de reanimação no local.',
    'Hipotermia com temperatura central abaixo de 35 graus.',
    'Vômitos repetidos com suspeita de aspiração.',
    'Mecanismo com suspeita de trauma cervical (mergulho, queda de altura, acidente de embarcação).',
    'Criança assintomática mas resgatada inconsciente ou submersa por mais de alguns segundos: não liberar sem observação.'
  ],
  diagnosticoDiferencial: ['traumatismo_cranioencefalico', 'choque_eletrico', 'convulsão como causa do afogamento', 'arritmia e síndrome do QT longo como causa da submersão', 'hipoglicemia', 'intoxicacao_medicamentosa', 'uso de álcool em adolescentes', 'pneumonia', 'maus-tratos e negligência'],
  exames: ['oximetria de pulso contínua', 'gasometria', 'radiografia_torax', 'hemograma', 'eletrolitos', 'glicemia', 'ureia', 'creatinina', 'lactato', 'cpk', 'eletrocardiograma', 'tomografia de crânio e avaliação de coluna cervical quando houver suspeita de trauma', 'temperatura central'],
  criteriosDiagnosticos: [
    'Diagnóstico clínico e circunstancial: história de submersão ou de imersão, com avaliação do tempo estimado, do tipo de água, da temperatura e do que foi feito no local.',
    'Classificar a gravidade pelo quadro respiratório e neurológico no atendimento inicial, e não pela quantidade de água supostamente engolida.',
    'Saturação de oxigênio e ausculta pulmonar são os parâmetros mais úteis na primeira avaliação; a radiografia inicial pode ser normal mesmo com aspiração significativa.',
    'Glicemia capilar em toda criança com alteração de consciência.',
    'Pesquisar causa precipitante: convulsão, arritmia, síncope, hipoglicemia, uso de álcool em adolescentes e trauma.',
    'Medir a temperatura central: a hipotermia altera o quadro neurológico e a resposta à reanimação.',
    'Avaliar coluna cervical em mergulho, queda e acidente com embarcação, mantendo restrição de movimento até afastar lesão.',
    'Considerar maus-tratos e negligência quando a história for inconsistente, quando o afogamento ocorrer em banheira ou balde sem explicação plausível, ou quando houver episódios repetidos.'
  ],
  classificacaoGravidade: [
    { nivel: 'Leve', criterios: 'Criança consciente, com tosse, sem alteração de ausculta, saturação normal em ar ambiente e exame neurológico normal. Considerar observação de pelo menos 4 a 8 horas com oximetria antes da liberação.' },
    { nivel: 'Moderado', criterios: 'Taquipneia, estertores ou sibilos, necessidade de oxigênio para manter saturação adequada, com criança consciente. Considerar internação, oxigenoterapia e monitorização.' },
    { nivel: 'Grave', criterios: 'Insuficiência respiratória, alteração do nível de consciência, convulsão, hipotensão, necessidade de reanimação no local, parada cardiorrespiratória revertida ou hipotermia importante. Considerar via aérea avançada, suporte intensivo e cuidados pós-parada.' }
  ],
  tratamento: [
    'No local, garantir a segurança do socorrista: nunca entrar na água sem treinamento e sem flutuador; priorizar o resgate a partir da margem ou da embarcação, estendendo um objeto, lançando uma boia, um galão vazio ou uma corda.',
    'A prioridade absoluta é a via aérea e a ventilação: o afogamento é uma parada por asfixia, e a hipóxia é a causa da deterioração.',
    'Criança que não respira ou apresenta respiração agônica: iniciar com 5 ventilações de resgate e, em seguida, ciclos de compressões e ventilações conforme o protocolo pediátrico, mantendo a ênfase na ventilação; acionar o SAMU pelo 192 ou os Bombeiros pelo 193.',
    'Não realizar manobras para drenar água dos pulmões: não fazer compressão abdominal, não fazer manobra de Heimlich e não pendurar a criança de cabeça para baixo, porque atrasam a ventilação, causam vômito e aumentam o risco de aspiração.',
    'Aspirar a via aérea apenas se houver material visível obstruindo; manejar vômitos com lateralização em bloco quando não houver contraindicação por trauma cervical.',
    'Restrição de movimento cervical apenas quando houver mecanismo compatível com trauma, para não atrasar a ventilação.',
    'Oxigênio suplementar para toda criança sintomática, com alvo de saturação conforme protocolo; considerar ventilação não invasiva ou cânula nasal de alto fluxo quando disponíveis, e intubação com pressão expiratória final positiva na insuficiência respiratória.',
    'Aquecer a criança: retirar roupas molhadas, secar, cobrir com mantas e usar métodos de aquecimento conforme a temperatura central e o protocolo do serviço; a hipotermia deve ser corrigida de forma controlada, e a reanimação deve ser mantida até que a criança esteja aquecida, conforme protocolo.',
    'Acesso venoso, glicemia capilar e correção de hipoglicemia; expansão volêmica se houver sinais de choque.',
    'Tratar convulsões e manter cuidados neuroprotetores: normotermia ou controle de temperatura conforme protocolo, normoglicemia, normocapnia e normotensão, evitando hipóxia e hipotensão secundárias.',
    'Não usar antibiótico profilático de rotina: considerar apenas em afogamento em água notoriamente contaminada, em aspiração maciça ou quando houver sinais de infecção, com cobertura orientada por protocolo e, quando possível, por cultura.',
    'Não usar corticoide de rotina.',
    'Observar toda criança sintomática por pelo menos 4 a 8 horas, com oximetria e reavaliações seriadas, pelo risco de deterioração respiratória tardia.',
    'Vigiar entre 48 e 72 horas a possibilidade de pneumonia bacteriana secundária, com reavaliação clínica e radiológica quando indicada.',
    'Registrar o evento, notificar quando houver suspeita de violência ou de negligência e orientar a família sobre prevenção antes da alta.'
  ],
  medicamentos: [
    { medId: 'soro_fisiologico', esquema: 'Expansão volêmica em sinais de choque: 10 a 20 mL/kg em bolus, reavaliando após cada alíquota.' },
    { medId: 'ringer_lactato', esquema: 'Alternativa cristaloide para reposição volêmica, conforme protocolo do serviço.' },
    { medId: 'adrenalina', esquema: 'Parada cardiorrespiratória: 0,01 mg/kg IV ou IO da solução 1:10.000, a cada 3 a 5 minutos, conforme protocolo de PALS.' },
    { medId: 'glicose', esquema: 'Hipoglicemia: 0,5 a 1 g/kg IV, seguida de infusão de manutenção e controle seriado.' },
    { medId: 'midazolam', esquema: 'Convulsão: 0,1 a 0,2 mg/kg IV, IM ou IO, conforme bula e protocolo do serviço.' },
    { medId: 'diazepam', esquema: 'Convulsão: 0,2 a 0,3 mg/kg IV lento (máximo 10 mg), conforme bula.' },
    { medId: 'fenitoina', esquema: 'Convulsão refratária ao benzodiazepínico, conforme protocolo do serviço e bula.' },
    { medId: 'ceftriaxona', esquema: 'Apenas em suspeita de infecção pulmonar secundária ou aspiração de água muito contaminada: 50 a 100 mg/kg/dia IV, conforme protocolo do serviço.' },
    { medId: 'amoxicilina_clavulanato', esquema: 'Alternativa por via oral em pneumonia secundária de manejo ambulatorial: 45 a 50 mg/kg/dia do componente amoxicilina dividida 12/12 h, conforme protocolo do serviço.' },
    { medId: 'salbutamol', esquema: 'Broncoespasmo associado: 2 a 4 jatos de 100 mcg com espaçador, repetidos conforme resposta.' },
    { medId: 'cetamina', esquema: 'Sequência rápida de intubação, conforme protocolo do serviço e equipe habilitada. Confirmar conforme protocolo/bula.', verificar: true }
  ],
  criteriosInternacao: [
    'Qualquer sintoma respiratório: tosse persistente, taquipneia, estertores, sibilos ou necessidade de oxigênio.',
    'Qualquer alteração neurológica, mesmo transitória.',
    'Necessidade de ventilação ou de reanimação no local.',
    'Saturação abaixo do alvo em ar ambiente.',
    'Hipotermia significativa.',
    'Tempo de submersão prolongado ou desconhecido.',
    'Suspeita de trauma associado ou de causa precipitante (convulsão, arritmia).',
    'Suspeita de negligência ou de maus-tratos.',
    'Domicílio distante, transporte fluvial demorado ou impossibilidade de retorno rápido.'
  ],
  criteriosUTI: [
    'Insuficiência respiratória com necessidade de ventilação mecânica ou não invasiva.',
    'Parada cardiorrespiratória revertida, com necessidade de cuidados pós-parada.',
    'Coma, convulsão repetida ou sinais de hipertensão intracraniana.',
    'Instabilidade hemodinâmica, choque ou necessidade de droga vasoativa.',
    'Hipotermia grave com necessidade de reaquecimento controlado.',
    'Lesão renal aguda, rabdomiólise ou acidose grave.'
  ],
  criteriosAlta: [
    'Período mínimo de observação cumprido, habitualmente 4 a 8 horas, com criança assintomática.',
    'Saturação normal em ar ambiente, respiração e ausculta normais e exame neurológico normal.',
    'Ausência de vômitos e boa aceitação oral.',
    'Radiografia de tórax sem alterações quando realizada.',
    'Responsável orientado a retornar imediatamente diante de tosse, cansaço, respiração rápida, febre, sonolência ou mudança de comportamento nas 48 a 72 horas seguintes.',
    'Plano de prevenção discutido com a família: colete salva-vidas, supervisão, cerca do poço, esvaziamento de baldes e tanques.',
    'Situação de negligência afastada ou rede de proteção acionada.',
    'Retorno agendado.'
  ],
  orientacoes: [
    'Se alguém estiver se afogando, não entre na água sem saber nadar e sem flutuador: jogue uma boia, um galão vazio bem fechado, uma corda ou estenda um remo, um galho ou uma vara a partir da margem ou do barco.',
    'Tire a criança da água e verifique se ela respira. Se não estiver respirando, faça 5 ventilações boca a boca e depois compressões no peito, sem parar, e chame o SAMU 192 ou os Bombeiros 193.',
    'Não vire a criança de cabeça para baixo, não aperte a barriga e não tente tirar a água dos pulmões: isso faz perder tempo e provoca vômito.',
    'Se a criança vomitar, vire o corpo dela de lado, em bloco, e limpe a boca.',
    'Tire a roupa molhada e cubra a criança com pano seco ou manta: criança pequena esfria muito rápido na água do rio.',
    'Mesmo que a criança pareça bem depois do susto, leve ao serviço de saúde: o pulmão pode piorar nas horas seguintes.',
    'Nos dois ou três dias seguintes, volte imediatamente se aparecer tosse, febre, cansaço, respiração rápida, chiado ou sonolência.',
    'Use colete salva-vidas do tamanho da criança em todo trajeto de barco, canoa, rabeta, balsa e lancha, inclusive nas travessias curtas e na ida para a escola.',
    'Nunca deixe uma criança pequena sozinha perto da água nem por um minuto, nem mesmo em água rasa, em balde, tina, bacia, banheira, tanque ou poço: esvazie os recipientes logo depois de usar.',
    'Supervisão de afogamento é supervisão de perto: um adulto olhando só para as crianças, sem celular, sem conversa paralela e sem bebida alcoólica, a uma distância que permita tocar a criança.'
  ],
  retorno: 'Retorno imediato diante de tosse, febre, respiração rápida, chiado, cansaço, dor no peito, sonolência ou mudança de comportamento nas 72 horas seguintes, período em que podem surgir deterioração respiratória e pneumonia secundária. Reavaliação programada em 48 a 72 horas nos casos liberados após observação. Em crianças com submersão prolongada ou com reanimação, seguimento neurológico e do neurodesenvolvimento, com avaliação de fala, aprendizagem, comportamento e função motora, além de apoio psicológico à criança e à família.',
  prevencao: [
    'Colete salva-vidas de tamanho adequado à criança em toda viagem de barco, canoa, rabeta, lancha e balsa, inclusive em travessias curtas e diárias.',
    'Supervisão constante e de perto de crianças pequenas na beira do rio, do igarapé, do lago, do porto e do flutuante, sem uso de celular e sem álcool pelo adulto responsável.',
    'Esvaziar baldes, bacias, tinas, banheiras e tanques imediatamente após o uso e mantê-los virados para baixo.',
    'Cercar e cobrir poço, cacimba, cisterna e reservatório de água.',
    'Instalar barreiras e corrimão em flutuantes, portos, pontes de madeira e escadas que levam à água, e manter iluminação nesses trechos.',
    'Ensinar as crianças a nadar e a flutuar a partir da idade recomendada, lembrando que saber nadar não substitui a supervisão.',
    'Ensinar adolescentes a não mergulhar de cabeça em água rasa, turva ou desconhecida e a não nadar sob efeito de álcool.',
    'Atenção redobrada no período da cheia, quando a água chega ao quintal e à área embaixo da palafita, e na vazante, quando surgem bancos de areia e mudanças de profundidade e correnteza.',
    'Treinar comunidades, escolas, professores, barqueiros e agentes comunitários de saúde em resgate seguro a partir da margem e em reanimação cardiopulmonar com ênfase na ventilação.',
    'Manter os telefones do SAMU 192 e dos Bombeiros 193 visíveis e combinados com a comunidade, junto com o plano de transporte fluvial de emergência.'
  ],
  fontes: [
    { nome: 'OMS – Global Report on Drowning e Preventing drowning: an implementation guide', ano: 2017 },
    { nome: 'PALS – Pediatric Advanced Life Support, American Heart Association', ano: 2020 },
    { nome: 'European Resuscitation Council Guidelines – Special Circumstances (drowning)', ano: 2021 },
    { nome: 'Sociedade Brasileira de Salvamento Aquático (SOBRASA) – diretrizes de afogamento', ano: 2022 },
    { nome: 'Tratado de Pediatria – Sociedade Brasileira de Pediatria', ano: 2022 }
  ],
  atualizadoEm: '2026-09'
});

// ================================== 10. TRAUMATISMO CRANIOENCEFÁLICO
PED.data.acidentes.protocolos.push({
  id: 'traumatismo_cranioencefalico',
  nome: 'Traumatismo cranioencefálico na criança',
  categoria: 'acidente',
  amazonia: false,
  cid10: 'S06',
  tags: ['alteracao_consciencia', 'vomitos', 'convulsao', 'palidez', 'sangramento', 'dor_local', 'feridas', 'cianose'],
  definicao: 'Lesão encefálica decorrente de energia mecânica aplicada ao crânio, que varia do traumatismo leve, sem repercussão, à lesão intracraniana com risco de morte. O objetivo do atendimento é identificar a minoria de crianças com lesão intracraniana clinicamente importante sem expor as demais a tomografia desnecessária, em razão do risco de radiação no cérebro em desenvolvimento.',
  epidemiologia: 'É uma das causas mais frequentes de atendimento de urgência em pediatria e a principal causa de morte por trauma na infância. Os mecanismos variam com a idade: queda do colo, da cama, do trocador, da rede e da escada em lactentes; queda da própria altura, de brinquedo, de árvore e de bicicleta em pré-escolares e escolares; acidente de moto, atropelamento, acidente de embarcação, queda de estruturas e prática esportiva em adolescentes. Em municípios do interior, a moto é o principal meio de transporte e o uso de capacete por crianças transportadas é baixo, o que aumenta a gravidade. Em lactentes, especialmente menores de 6 meses, a lesão intracraniana pode ocorrer com mecanismos aparentemente banais e a apresentação é pobre, o que torna a avaliação mais difícil. O traumatismo craniano abusivo, incluindo a síndrome do bebê sacudido, é causa importante de lesão grave em menores de 1 ano e precisa ser considerado ativamente.',
  agente: 'Energia mecânica aplicada ao crânio, por impacto direto, por aceleração e desaceleração e por rotação, com lesões primárias (fratura, contusão, hematoma epidural e subdural, hemorragia subaracnóidea, lesão axonal difusa) e lesões secundárias (hipóxia, hipotensão, hipertensão intracraniana, hipoglicemia, hipertermia e convulsão), que são as passíveis de prevenção pelo atendimento.',
  transmissao: 'Não se aplica: agravo por causa externa.',
  incubacao: 'Não se aplica. Hematoma epidural pode ter intervalo lúcido de minutos a horas antes da deterioração; hematoma subdural e edema cerebral podem progredir ao longo de horas; sintomas pós-concussionais podem persistir por semanas.',
  manifestacoes: [
    'Traumatismo leve: criança alerta, com cefaleia, um ou dois episódios de vômito, hematoma ou escoriação em couro cabeludo e exame neurológico normal.',
    'Perda de consciência, amnésia do evento, confusão, resposta lentificada, repetição de perguntas e comportamento diferente do habitual segundo os pais.',
    'Vômitos repetidos, cefaleia progressiva e irritabilidade.',
    'Sonolência, letargia, agitação ou choro inconsolável no lactente.',
    'Convulsão precoce após o trauma.',
    'Sinais de fratura de base de crânio: hematoma periorbitário bilateral, hematoma retroauricular, saída de líquido claro ou de sangue pelo nariz ou pelo ouvido, hemotímpano.',
    'Fratura craniana palpável, afundamento ou hematoma subgaleal volumoso, sobretudo em lactentes, em que pode causar anemia significativa.',
    'Sinais de hipertensão intracraniana: rebaixamento progressivo, cefaleia intensa, vômitos em jato, anisocoria, postura de decorticação ou descerebração, bradicardia com hipertensão e alteração do padrão respiratório (tríade de Cushing), abaulamento de fontanela em lactentes.',
    'Fontanela tensa, aumento rápido do perímetro cefálico e crises em lactente, compatíveis com hematoma subdural.',
    'Síndrome pós-concussional: cefaleia, tontura, fadiga, irritabilidade, dificuldade de concentração, queda no rendimento escolar e alteração do sono nas semanas seguintes.',
    'Traumatismo craniano abusivo: lesão grave sem história de trauma compatível, hemorragias retinianas, hematoma subdural de idades diferentes, fraturas associadas e sinais de lesões prévias.'
  ],
  sinaisAlarme: [
    'Escala de coma de Glasgow pediátrica igual ou menor que 14, ou qualquer queda do nível de consciência.',
    'Sinais de fratura de base de crânio ou fratura craniana palpável.',
    'Anisocoria, pupilas não reativas, déficit motor focal ou alteração de pares cranianos.',
    'Convulsão após o trauma.',
    'Vômitos repetidos e progressivos.',
    'Cefaleia intensa e crescente.',
    'Mecanismo de alta energia: acidente de veículo motorizado com ejeção, capotamento ou óbito de outro ocupante; atropelamento ou queda de bicicleta sem capacete; queda de mais de 0,9 metro em menores de 2 anos ou de mais de 1,5 metro em maiores; impacto por objeto de alta energia.',
    'Comportamento diferente do habitual segundo o cuidador, dado especialmente valioso em lactentes.',
    'Lactente menor de 3 meses, uso de anticoagulante ou distúrbio de coagulação conhecido.',
    'História incompatível com a lesão, mutável ou ausente: considerar traumatismo craniano abusivo.',
    'Bradicardia com hipertensão arterial e alteração respiratória (sinais tardios de hipertensão intracraniana).'
  ],
  diagnosticoDiferencial: ['queda', 'afogamento', 'choque_eletrico', 'convulsão como causa da queda', 'síncope e arritmia', 'hipoglicemia', 'intoxicacao_medicamentosa', 'meningite', 'enxaqueca', 'traumatismo craniano abusivo e síndrome do bebê sacudido'],
  exames: ['tomografia computadorizada de crânio sem contraste, conforme critérios clínicos', 'glicemia', 'hemograma', 'coagulograma', 'eletrolitos', 'gasometria', 'radiografia ou tomografia de coluna cervical quando houver suspeita de lesão', 'fundo de olho e avaliação oftalmológica em suspeita de traumatismo craniano abusivo', 'radiografias de esqueleto (inquérito ósseo) em menores de 2 anos com suspeita de maus-tratos', 'ultrassonografia transfontanelar em lactentes, conforme disponibilidade e indicação'],
  criteriosDiagnosticos: [
    'Avaliação inicial pelo ABCDE, com atenção a hipóxia e hipotensão, que são os principais determinantes de lesão secundária.',
    'Glasgow pediátrico adaptado à idade, repetido de forma seriada; registrar sempre o valor e o horário.',
    'Aplicar a regra de decisão PECARN, separada por faixa etária, para orientar a indicação de tomografia: menores de 2 anos e maiores ou iguais a 2 anos têm critérios distintos.',
    'Menores de 2 anos, critérios de alto risco: Glasgow igual ou menor que 14, alteração do estado mental (agitação, sonolência, resposta lentificada, perguntas repetitivas) ou fratura craniana palpável. Nesses casos, considerar tomografia.',
    'Menores de 2 anos, critérios intermediários: hematoma de couro cabeludo occipital, parietal ou temporal; perda de consciência por 5 segundos ou mais; mecanismo grave; ou comportamento diferente do habitual segundo os pais. Nesses casos, considerar observação de 4 a 6 horas ou tomografia, conforme a presença de múltiplos critérios, a piora dos sintomas, a idade menor de 3 meses, a experiência do serviço, a distância do domicílio e a preferência dos pais.',
    'Maiores ou iguais a 2 anos, critérios de alto risco: Glasgow igual ou menor que 14, alteração do estado mental ou sinais de fratura de base de crânio. Nesses casos, considerar tomografia.',
    'Maiores ou iguais a 2 anos, critérios intermediários: perda de consciência, vômitos, mecanismo grave ou cefaleia intensa. Nesses casos, considerar observação ou tomografia, pelos mesmos critérios de julgamento.',
    'Ausência de todos os critérios: o risco de lesão intracraniana clinicamente importante é muito baixo e a tomografia em geral não é recomendada; considerar alta com observação domiciliar orientada quando houver acompanhante confiável e possibilidade de retorno.',
    'A regra foi validada para crianças com traumatismo craniano de apresentação em até 24 horas e não se aplica a traumas penetrantes, a distúrbios de coagulação conhecidos, a tumores cerebrais e a crianças com derivação ventricular.',
    'Reaplicar o julgamento a cada reavaliação: a piora clínica, e não o primeiro exame, é o que indica a tomografia em muitos casos.',
    'Considerar ativamente traumatismo craniano abusivo em lactentes com lesão intracraniana e história ausente, vaga, mutável ou incompatível com o desenvolvimento motor da criança; nesse caso, ampliar a investigação e notificar.'
  ],
  classificacaoGravidade: [
    { nivel: 'Leve', criterios: 'Glasgow de 14 a 15, sem sinais focais e sem sinais de fratura de base. Considerar aplicação da regra PECARN, observação e alta orientada quando não houver critério de risco.' },
    { nivel: 'Moderado', criterios: 'Glasgow de 9 a 13, ou presença de critérios de alto risco, ou piora clínica durante a observação. Considerar tomografia, internação, monitorização neurológica seriada e avaliação neurocirúrgica.' },
    { nivel: 'Grave', criterios: 'Glasgow igual ou menor que 8, sinais de hipertensão intracraniana, anisocoria, déficit focal, convulsão persistente ou lesão à tomografia com efeito de massa. Considerar via aérea avançada, neuroproteção, terapia intensiva e avaliação neurocirúrgica imediata.' }
  ],
  tratamento: [
    'ABCDE com restrição de movimento cervical quando o mecanismo for compatível; corrigir prontamente hipóxia e hipotensão, que são as principais causas evitáveis de lesão secundária.',
    'Oxigênio suplementar para manter saturação adequada; considerar intubação em Glasgow igual ou menor que 8, em incapacidade de proteger a via aérea ou em insuficiência respiratória, com sequência rápida realizada por profissional habilitado.',
    'Manter pressão arterial adequada para a idade: a hipotensão em criança com traumatismo craniano piora o prognóstico e deve ser tratada com cristaloide e, se necessário, com droga vasoativa.',
    'Glicemia capilar imediata e correção de hipoglicemia; evitar hiperglicemia.',
    'Elevar a cabeceira a cerca de 30 graus, manter a cabeça em posição neutra e evitar compressão jugular por colar mal ajustado.',
    'Analgesia adequada: a dor eleva a pressão intracraniana. Considerar analgésico simples no trauma leve e opioide titulado no trauma grave, conforme protocolo e com monitorização.',
    'Tratar convulsões com benzodiazepínico e considerar profilaxia de crise precoce no traumatismo grave, conforme protocolo do serviço.',
    'Sinais de hipertensão intracraniana ou de herniação: considerar medidas de urgência conforme protocolo, incluindo otimização da ventilação, terapia hiperosmolar com solução salina hipertônica ou manitol, e acionamento imediato da neurocirurgia. Confirmar doses conforme protocolo do serviço.',
    'Evitar hipertermia, tratar febre e manter normocapnia; a hiperventilação sustentada não é recomendada de rotina e fica reservada a sinais de herniação, como medida temporária, conforme protocolo.',
    'Tomografia conforme os critérios PECARN e conforme a evolução; em serviço sem tomógrafo, considerar observação prolongada e transferência quando houver qualquer critério de alto risco.',
    'Observação hospitalar mínima de 4 a 6 horas nos casos com critérios intermediários, com avaliações neurológicas seriadas registradas.',
    'Tratamento da ferida de couro cabeludo com limpeza, hemostasia e sutura quando indicada; atenção ao volume de sangramento em lactentes.',
    'Profilaxia antitetânica quando houver ferida.',
    'Avaliação neurocirúrgica em toda lesão intracraniana, em fratura com afundamento e em fratura de base de crânio.',
    'Orientação de retorno ao esporte e à escola de forma gradual após concussão, com repouso relativo inicial e progressão conforme a tolerância aos sintomas, conforme protocolo.',
    'Em suspeita de traumatismo craniano abusivo, internar para proteção, ampliar a investigação, registrar detalhadamente e notificar ao Conselho Tutelar e ao sistema de vigilância.'
  ],
  medicamentos: [
    { medId: 'soro_fisiologico', esquema: 'Expansão em hipotensão: 10 a 20 mL/kg em bolus, reavaliando após cada alíquota; manter normovolemia.' },
    { medId: null, nome: 'Solução salina hipertônica a 3 por cento', esquema: 'Terapia hiperosmolar em hipertensão intracraniana ou sinais de herniação, conforme protocolo do serviço, com controle de sódio e de osmolaridade. Confirmar conforme protocolo/bula.', verificar: true },
    { medId: null, nome: 'Manitol a 20 por cento', esquema: 'Alternativa à solução salina hipertônica em hipertensão intracraniana, conforme protocolo do serviço, com atenção à volemia e à função renal. Confirmar conforme protocolo/bula.', verificar: true },
    { medId: 'midazolam', esquema: 'Convulsão e sedação: 0,1 a 0,2 mg/kg IV, IM ou IO, conforme bula e protocolo do serviço.' },
    { medId: 'diazepam', esquema: 'Convulsão: 0,2 a 0,3 mg/kg IV lento (máximo 10 mg), conforme bula.' },
    { medId: 'fenitoina', esquema: 'Convulsão pós-traumática e profilaxia de crise precoce no traumatismo grave, conforme protocolo do serviço e bula.' },
    { medId: 'fenobarbital', esquema: 'Alternativa no controle de crises, sobretudo em lactentes, conforme protocolo do serviço e bula.' },
    { medId: 'dipirona', esquema: 'Cefaleia e dor: 10 a 15 mg/kg/dose VO ou IV a cada 6 h, conforme bula.' },
    { medId: 'paracetamol', esquema: 'Cefaleia, dor e febre: 10 a 15 mg/kg/dose VO a cada 6 h, conforme bula.' },
    { medId: null, nome: 'Analgésico opioide (fentanil ou morfina)', esquema: 'Dor intensa e sedação no trauma grave, com monitorização e via aérea assegurada, conforme protocolo do serviço e bula. Confirmar conforme protocolo/bula.', verificar: true },
    { medId: 'cetamina', esquema: 'Sequência rápida de intubação, conforme protocolo do serviço e equipe habilitada. Confirmar conforme protocolo/bula.', verificar: true },
    { medId: 'ondansetrona', esquema: 'Vômitos: 0,15 mg/kg/dose IV (máximo 8 mg), conforme bula; não usar para mascarar vômitos progressivos sem reavaliação neurológica.' },
    { medId: null, nome: 'Vacina antitetânica e imunoglobulina antitetânica', esquema: 'Profilaxia conforme a situação vacinal e o tipo de ferimento associado, segundo as orientações do Ministério da Saúde.' }
  ],
  criteriosInternacao: [
    'Glasgow menor que 15 na reavaliação ou qualquer alteração do estado mental.',
    'Presença de critério de alto risco pela regra PECARN.',
    'Lesão identificada à tomografia.',
    'Convulsão após o trauma.',
    'Vômitos persistentes ou cefaleia progressiva.',
    'Sinais de fratura de base de crânio ou fratura craniana palpável.',
    'Lactente menor de 3 meses com traumatismo craniano.',
    'Distúrbio de coagulação, uso de anticoagulante ou derivação ventricular.',
    'Suspeita de maus-tratos ou de traumatismo craniano abusivo.',
    'Cuidador incapaz de observar em casa, domicílio distante, transporte fluvial demorado ou impossibilidade de retorno rápido.'
  ],
  criteriosUTI: [
    'Glasgow igual ou menor que 8 ou necessidade de via aérea avançada.',
    'Sinais de hipertensão intracraniana ou de herniação.',
    'Lesão intracraniana com efeito de massa ou necessidade de intervenção neurocirúrgica.',
    'Convulsão refratária ou estado de mal epiléptico.',
    'Instabilidade hemodinâmica, choque ou necessidade de droga vasoativa.',
    'Politrauma associado.',
    'Necessidade de monitorização da pressão intracraniana ou de terapia hiperosmolar.'
  ],
  criteriosAlta: [
    'Glasgow de 15, exame neurológico normal e criança em seu comportamento habitual segundo os pais.',
    'Ausência de vômitos, dor controlada e boa aceitação oral.',
    'Período de observação cumprido conforme os critérios aplicados, sem piora.',
    'Tomografia normal, quando realizada.',
    'Acompanhante capaz de observar a criança e de retornar rapidamente se houver piora.',
    'Orientações de observação domiciliar entregues e compreendidas.',
    'Orientação sobre retorno gradual à escola, ao esporte e às atividades de risco após concussão.',
    'Suspeita de maus-tratos afastada ou rede de proteção acionada.',
    'Retorno agendado.'
  ],
  orientacoes: [
    'Nas primeiras 24 a 48 horas, a criança pode dormir normalmente, mas o adulto deve acordá-la algumas vezes na primeira noite para ver se ela responde, reconhece e se movimenta normalmente.',
    'Volte imediatamente ao serviço de saúde se a criança ficar muito sonolenta ou difícil de acordar, confusa, se não reconhecer as pessoas, se ficar muito irritada ou chorar sem parar.',
    'Volte imediatamente se houver vômitos repetidos, dor de cabeça que só aumenta, convulsão, perda de força ou dificuldade para andar, falar ou enxergar.',
    'Volte imediatamente se sair líquido claro ou sangue pelo nariz ou pelo ouvido, se aparecerem manchas roxas ao redor dos dois olhos ou atrás da orelha, ou se as pupilas ficarem de tamanhos diferentes.',
    'Pode dar o analgésico indicado pela equipe para a dor de cabeça; não dê remédios por conta própria e evite anti-inflamatórios nas primeiras horas, salvo orientação médica.',
    'Ofereça alimentação leve e líquidos, e mantenha a criança em ambiente calmo, com pouco barulho e pouca tela nos primeiros dias.',
    'Depois de uma concussão, a criança deve voltar à escola e ao esporte aos poucos: primeiro repouso relativo, depois atividades leves, e só liberar esporte de contato quando estiver sem sintomas e com liberação da equipe.',
    'Use sempre capacete na bicicleta e na moto, inclusive em trajeto curto e dentro da comunidade, e cadeirinha ou assento adequado no carro.',
    'Não transporte criança pequena de moto e não a leve em pé na frente do condutor.',
    'Nunca sacuda um bebê, mesmo quando ele chora muito e você está cansado: sacudir causa lesão grave no cérebro. Se estiver no limite, coloque o bebê em local seguro, respire e peça ajuda.'
  ],
  retorno: 'Reavaliação em 24 a 48 horas nos casos liberados, e imediatamente diante de qualquer sinal de alarme. Após concussão, reavaliação em 1 a 2 semanas para verificar a persistência de cefaleia, tontura, irritabilidade, alteração do sono, queda no rendimento escolar e dificuldade de concentração, com liberação progressiva para esporte de contato apenas após a resolução dos sintomas. Em lesão intracraniana, seguimento com neurologia ou neurocirurgia pediátrica e acompanhamento do neurodesenvolvimento e da aprendizagem a médio prazo.',
  prevencao: [
    'Capacete em toda criança que anda de bicicleta, de patinete e de moto, inclusive em trajetos curtos.',
    'Não transportar crianças pequenas em motocicleta; quando o transporte for inevitável, seguir as normas de segurança e usar capacete adequado ao tamanho.',
    'Uso correto de dispositivo de retenção no carro, conforme a idade, o peso e a altura, sempre no banco traseiro.',
    'Grades de proteção em janelas, portões nas escadas e barreiras em varandas, flutuantes e pontes de madeira.',
    'Não deixar lactente sozinho em cama, sofá, trocador, rede ou mesa, nem por instantes.',
    'Manter o chão livre de obstáculos e evitar andador infantil, que é fator de risco para quedas e traumatismos.',
    'Supervisionar brincadeiras em árvores, telhados, escadas e estruturas elevadas.',
    'Capacitar a comunidade para reconhecer os sinais de alarme após um trauma de cabeça.',
    'Orientar as famílias sobre o manejo do choro do bebê e sobre o risco de sacudir a criança, com apoio à rede familiar.',
    'Planejar com a comunidade o transporte de emergência, especialmente onde depende de barco.'
  ],
  fontes: [
    { nome: 'Kuppermann N. et al. – PECARN, Identification of children at very low risk of clinically-important brain injuries after head trauma, The Lancet', ano: 2009 },
    { nome: 'PALS – Pediatric Advanced Life Support, American Heart Association', ano: 2020 },
    { nome: 'Brain Trauma Foundation – Guidelines for the management of pediatric severe traumatic brain injury, 3rd edition', ano: 2019 },
    { nome: 'Tratado de Pediatria – Sociedade Brasileira de Pediatria', ano: 2022 },
    { nome: 'Nelson Textbook of Pediatrics', ano: 2020 }
  ],
  atualizadoEm: '2026-09'
});

// ====================================================== 11. QUEDA
PED.data.acidentes.protocolos.push({
  id: 'queda',
  nome: 'Queda na infância',
  categoria: 'acidente',
  amazonia: false,
  cid10: 'W00 a W19',
  tags: ['dor_local', 'feridas', 'sangramento', 'alteracao_consciencia', 'vomitos', 'palidez', 'lesoes_pele', 'dor_abdominal'],
  definicao: 'Deslocamento não intencional do corpo para um nível inferior, com impacto. É a causa mais frequente de atendimento por acidente na infância e a principal causa de fratura e de traumatismo craniano em crianças. A gravidade depende da altura, da superfície de impacto, da parte do corpo atingida e da idade.',
  epidemiologia: 'A queda tem padrão etário nítido. No lactente, ocorre do colo, da cama, do sofá, do trocador, da rede, do andador e da escada, quase sempre dentro de casa e frequentemente presenciada por um cuidador. No pré-escolar, predominam a queda da própria altura, de móveis, de escada e de janela sem tela ou grade, além da queda de rede mal amarrada e do tombo em piso molhado. No escolar e no adolescente, aparecem queda de árvore (situação muito frequente na região, ligada à colheita de açaí, manga, cupuaçu e outras frutas), de telhado, de laje, de bicicleta, de estrutura de madeira, de flutuante, de porto e de ponte, além de quedas no esporte. Casas de madeira com escadas íngremes e sem corrimão, palafitas, pontes e flutuantes ampliam o risco na região, e a queda de estrutura sobre a água associa o risco de trauma ao de afogamento. A queda de altura superior à estatura da criança e a queda de janela são associadas a lesões múltiplas. Sempre que a história for incompatível com o desenvolvimento motor da criança, como queda relatada em bebê que ainda não rola ou não senta, deve-se considerar maus-tratos.',
  agente: 'Energia mecânica de impacto, proporcional à altura da queda, à desaceleração e à dureza da superfície. Superfícies duras (cimento, madeira maciça, degraus, quina de móvel, chão de porto) causam lesões mais graves do que superfícies amortecedoras.',
  transmissao: 'Não se aplica: agravo por causa externa.',
  incubacao: 'Não se aplica. Lesões intracranianas e viscerais podem manifestar-se horas após a queda; fratura sem desvio pode tornar-se evidente apenas na reavaliação ou em radiografia repetida após 7 a 10 dias.',
  manifestacoes: [
    'Dor localizada, edema, equimose, deformidade, impotência funcional e recusa de usar o membro atingido.',
    'Choro imediato seguido de recuperação, nas quedas leves; choro inconsolável ou apatia sugerem lesão significativa.',
    'Ferida de couro cabeludo, hematoma subgaleal e escoriações, frequentes em quedas com impacto craniano.',
    'Sinais de traumatismo cranioencefálico: perda de consciência, vômitos, cefaleia, sonolência, comportamento alterado e convulsão.',
    'Recusa de andar, de apoiar o pé ou de usar o braço em criança pequena, que muitas vezes é o único sinal de fratura.',
    'Pronação dolorosa do cotovelo por tração do braço, com a criança mantendo o membro pendente e em pronação, sem edema evidente.',
    'Fraturas típicas por idade: clavícula e fratura em galho verde de antebraço em pré-escolares e escolares; fratura supracondiliana de úmero na queda com o braço estendido; fratura de rádio distal; fraturas fisárias, próprias da criança, que podem passar despercebidas.',
    'Dor abdominal, defesa, palidez e taquicardia: compatível com lesão de baço, de fígado ou de víscera oca em quedas de altura ou sobre objeto.',
    'Dor torácica, dispneia e crepitação: compatível com fratura de costela, contusão pulmonar ou pneumotórax.',
    'Dor cervical, dorsal ou lombar, parestesia, perda de força ou retenção urinária: compatível com lesão de coluna ou medular.',
    'Lesões em diferentes estágios de cicatrização, fraturas múltiplas ou de idades diferentes, lesões em áreas protegidas e história inconsistente: compatível com maus-tratos.'
  ],
  sinaisAlarme: [
    'Queda de altura maior que a estatura da criança, e em especial maior que 0,9 metro em menores de 2 anos ou maior que 1,5 metro em maiores.',
    'Queda de janela, de laje, de telhado, de árvore ou de estrutura sobre a água.',
    'Perda de consciência, vômitos repetidos, sonolência, confusão ou convulsão.',
    'Deformidade evidente, dor intensa, impotência funcional ou fratura exposta.',
    'Perda de força, alteração de sensibilidade, dor cervical ou incapacidade de mover o pescoço.',
    'Dor abdominal, distensão, palidez, taquicardia ou hipotensão.',
    'Dispneia, dor torácica ou assimetria de expansão.',
    'Sangramento importante ou ferida extensa.',
    'Palidez progressiva, sudorese e má perfusão: suspeitar de hemorragia interna.',
    'História incompatível com o desenvolvimento motor da criança ou versões divergentes entre os cuidadores.'
  ],
  diagnosticoDiferencial: ['traumatismo_cranioencefalico', 'ferimento_cortocontuso', 'afogamento', 'convulsão ou síncope como causa da queda', 'arritmia', 'hipoglicemia', 'osteogênese imperfeita e doenças ósseas em fraturas de repetição', 'maus-tratos e violência doméstica', 'infecção osteoarticular em criança que recusa apoiar o membro'],
  exames: ['radiografia do segmento acometido, com incidências adequadas e comparativa quando necessário', 'tomografia de crânio conforme critérios clínicos', 'radiografia ou tomografia de coluna cervical quando houver suspeita', 'hemograma', 'ast', 'alt', 'urina_1', 'ultrassonografia abdominal ou avaliação FAST em trauma abdominal', 'radiografia_torax', 'glicemia', 'inquérito ósseo radiológico em menores de 2 anos com suspeita de maus-tratos'],
  criteriosDiagnosticos: [
    'Reconstruir a queda com precisão: altura, superfície de impacto, parte do corpo que atingiu primeiro, quem presenciou, o que a criança fez imediatamente depois e quanto tempo se passou até a procura por atendimento.',
    'Comparar a história com o desenvolvimento motor da criança: uma queda relatada por rolamento em bebê que ainda não rola é incompatível e exige investigação.',
    'Exame completo, com a criança despida, avaliando crânio, coluna, tórax, abdome, pelve, membros, pele e couro cabeludo, e registrando todas as lesões.',
    'Aplicar os critérios de decisão para tomografia de crânio conforme a idade quando houver impacto craniano.',
    'Em criança pequena que recusa andar ou usar um membro, considerar fratura mesmo sem deformidade, e considerar radiografia comparativa; a fratura em espiral de tíbia do pré-escolar pode ser sutil.',
    'Suspeitar de pronação dolorosa quando houver tração do braço e recusa de uso sem edema nem deformidade; a redução é feita por manobra específica, conforme protocolo.',
    'Reavaliar em 7 a 10 dias quando a suspeita clínica de fratura persistir com radiografia inicial normal.',
    'Considerar lesão abdominal em quedas de altura, sobre guidão de bicicleta ou sobre objeto, mesmo com exame inicial pouco expressivo.',
    'Avaliar e registrar sinais de maus-tratos; em caso de suspeita, notificar ao Conselho Tutelar e ao sistema de vigilância, garantindo a proteção da criança.'
  ],
  classificacaoGravidade: [
    { nivel: 'Leve', criterios: 'Queda da própria altura ou de baixa altura, criança alerta, sem perda de consciência, com dor localizada e exame normal fora da área atingida. Considerar avaliação, analgesia, curativo e orientação de observação domiciliar.' },
    { nivel: 'Moderada', criterios: 'Queda de altura moderada, suspeita de fratura, impacto craniano com critérios intermediários ou vômitos. Considerar exames de imagem, observação e imobilização.' },
    { nivel: 'Grave', criterios: 'Queda de grande altura, politrauma, alteração de consciência, instabilidade hemodinâmica, suspeita de lesão de coluna, de víscera ou de fratura exposta. Considerar atendimento de trauma, estabilização e transferência para serviço de referência.' }
  ],
  tratamento: [
    'ABCDE com restrição de movimento cervical quando o mecanismo for compatível; a prioridade é identificar e tratar lesões que ameaçam a vida antes das lesões evidentes e dolorosas.',
    'Analgesia precoce e adequada: a dor da criança traumatizada é rotineiramente subtratada e dificulta o exame.',
    'Imobilizar o segmento suspeito na posição em que está, com tala ou material improvisado acolchoado, sem tentar alinhar ou reduzir fraturas no primeiro atendimento fora do serviço.',
    'Controle de hemorragia externa por compressão direta; nunca usar torniquete improvisado em ferimentos comuns.',
    'Fratura exposta: cobrir com curativo estéril umedecido, imobilizar, iniciar antibiótico conforme protocolo, garantir profilaxia antitetânica e acionar a ortopedia com urgência.',
    'Avaliar sempre perfusão, pulso, sensibilidade e motricidade distais ao foco da fratura, antes e depois da imobilização.',
    'Fraturas sem desvio: imobilização e encaminhamento à ortopedia; fraturas com desvio, fisárias, supracondilianas e exposição: avaliação ortopédica com urgência, pelo risco de complicação vascular e de sequela de crescimento.',
    'Pronação dolorosa: redução por manobra específica, com melhora habitualmente rápida, e orientação para não puxar a criança pelo braço.',
    'Impacto craniano: conduzir conforme o protocolo de traumatismo cranioencefálico, com aplicação dos critérios por faixa etária.',
    'Suspeita de lesão abdominal: monitorização, exames, imagem e avaliação cirúrgica; manter observação mesmo com exame inicial pouco expressivo, pois a lesão de víscera pode manifestar-se em horas.',
    'Profilaxia antitetânica conforme a situação vacinal e o tipo de ferimento.',
    'Reabilitação e retorno gradual às atividades, com orientação sobre uso de tala, gesso e sinais de compressão (dor crescente, formigamento, dedos frios ou pálidos).',
    'Avaliar maus-tratos em toda queda com história incompatível e notificar quando houver suspeita.',
    'Discutir prevenção com a família antes da alta: grades, portões, telas em janelas, supervisão e retirada do andador.'
  ],
  medicamentos: [
    { medId: 'dipirona', esquema: 'Dor leve a moderada: 10 a 15 mg/kg/dose VO ou IV a cada 6 h, conforme bula.' },
    { medId: 'paracetamol', esquema: 'Dor leve a moderada: 10 a 15 mg/kg/dose VO a cada 6 h, conforme bula.' },
    { medId: 'ibuprofeno', esquema: 'Dor e inflamação em criança hidratada, sem sangramento ativo e sem instabilidade: 5 a 10 mg/kg/dose VO a cada 6 a 8 h, conforme bula.' },
    { medId: null, nome: 'Analgésico opioide (morfina ou fentanil)', esquema: 'Dor intensa, fratura com desvio e redução: dose, via e monitorização conforme protocolo do serviço e bula. Confirmar conforme protocolo/bula.', verificar: true },
    { medId: 'cetamina', esquema: 'Sedação e analgesia para redução de fratura ou de luxação, conforme protocolo do serviço, por equipe habilitada e com monitorização. Confirmar conforme protocolo/bula.', verificar: true },
    { medId: 'midazolam', esquema: 'Sedação para procedimento, com monitorização contínua, conforme protocolo do serviço. Confirmar conforme protocolo/bula.', verificar: true },
    { medId: 'cefalexina', esquema: 'Ferida contaminada associada, conforme avaliação: 50 mg/kg/dia VO dividida 6/6 h ou 8/8 h, conforme protocolo do serviço.' },
    { medId: 'ceftriaxona', esquema: 'Fratura exposta ou infecção associada, conforme protocolo do serviço: 50 a 100 mg/kg/dia IV, habitualmente associada a cobertura antiestafilocócica conforme o grau da exposição.' },
    { medId: 'soro_fisiologico', esquema: 'Expansão em sinais de choque hemorrágico: 10 a 20 mL/kg em bolus, com reavaliação e preparo para hemocomponentes conforme protocolo.' },
    { medId: 'ringer_lactato', esquema: 'Alternativa cristaloide na reposição volêmica do trauma, conforme protocolo do serviço.' },
    { medId: null, nome: 'Vacina antitetânica e imunoglobulina antitetânica', esquema: 'Profilaxia conforme a situação vacinal e a característica do ferimento, segundo as orientações do Ministério da Saúde.' }
  ],
  criteriosInternacao: [
    'Queda de altura significativa com suspeita de lesão interna ou de múltiplas lesões.',
    'Alteração do nível de consciência, vômitos persistentes ou critérios de risco para lesão intracraniana.',
    'Fratura com desvio, fratura exposta, fratura supracondiliana ou fratura que exija redução e observação.',
    'Suspeita de lesão de coluna ou de medula.',
    'Suspeita de lesão abdominal ou torácica.',
    'Dor não controlada por via oral.',
    'Sangramento importante ou queda de hemoglobina.',
    'Suspeita de maus-tratos, com necessidade de proteção.',
    'Impossibilidade de observação domiciliar adequada ou domicílio distante.'
  ],
  criteriosUTI: [
    'Politrauma com instabilidade hemodinâmica ou respiratória.',
    'Traumatismo cranioencefálico grave ou necessidade de via aérea avançada.',
    'Lesão de víscera com sangramento ativo ou necessidade de cirurgia de urgência.',
    'Lesão medular com comprometimento respiratório ou autonômico.',
    'Necessidade de transfusão maciça ou de monitorização invasiva.',
    'Trauma torácico grave com contusão pulmonar extensa ou pneumotórax hipertensivo.'
  ],
  criteriosAlta: [
    'Exame neurológico normal e criança em seu comportamento habitual.',
    'Dor controlada com analgesia por via oral.',
    'Fratura adequadamente imobilizada, com perfusão, sensibilidade e mobilidade distais preservadas, e encaminhamento ortopédico garantido.',
    'Ausência de sinais de sangramento interno após o período de observação.',
    'Profilaxia antitetânica avaliada e registrada.',
    'Responsável orientado sobre sinais de alarme, cuidados com a imobilização e retorno.',
    'Plano de prevenção discutido e medidas combinadas com a família.',
    'Suspeita de maus-tratos afastada ou rede de proteção acionada.'
  ],
  orientacoes: [
    'Volte imediatamente se a criança ficar sonolenta, confusa, vomitar várias vezes, tiver dor de cabeça forte, convulsão ou comportamento diferente do habitual.',
    'Volte imediatamente se a criança não apoiar o pé, não mexer o braço, se o membro inchar muito, se ficar torto, ou se os dedos ficarem frios, roxos, pálidos ou dormentes dentro do gesso ou da tala.',
    'Volte imediatamente se aparecer dor de barriga forte, barriga inchada, palidez, suor frio ou se a criança ficar muito quieta e sem forças.',
    'Mantenha o membro imobilizado elevado e aplique compressa fria nas primeiras horas sobre o pano, nunca gelo direto na pele.',
    'Não molhe o gesso e não coloque objetos dentro dele para coçar.',
    'Dê o analgésico conforme orientado e compareça à consulta de ortopedia marcada.',
    'Não puxe a criança pelo braço, não a levante pelas mãos e não brinque de rodar pelos braços: isso causa a pronação dolorosa do cotovelo.',
    'Coloque tela ou grade em todas as janelas e portão nas escadas; não deixe cama, sofá, cadeira ou móvel embaixo da janela.',
    'Não deixe bebê sozinho na cama, no sofá, no trocador, na rede ou na mesa, nem por um instante, e não use andador.',
    'Em casas de palafita, flutuantes, portos e pontes de madeira, instale corrimão e barreiras e supervise as crianças de perto, lembrando que a queda ali soma o risco de afogamento.'
  ],
  retorno: 'Reavaliação em 24 a 48 horas nos casos liberados, e antes disso diante de qualquer sinal de alarme. Reavaliação ortopédica conforme o tipo de fratura, com controle radiológico segundo o protocolo. Quando a suspeita clínica de fratura persistir com radiografia inicial normal, considerar nova avaliação e nova radiografia em 7 a 10 dias. Após traumatismo craniano, seguimento conforme o protocolo específico. Em quedas de repetição, avaliar o ambiente domiciliar, o desenvolvimento da criança, a possibilidade de doença óssea e o contexto de cuidado e de proteção.',
  prevencao: [
    'Telas ou grades fixas em todas as janelas, com travas que impeçam a abertura ampla, e nenhum móvel embaixo das janelas.',
    'Portões de segurança no alto e no pé das escadas e corrimão em escadas de madeira.',
    'Não usar andador infantil.',
    'Não deixar lactente sozinho em superfícies altas: cama, sofá, trocador, mesa e rede.',
    'Prender bem as redes, verificar os pontos de fixação e não permitir que crianças pequenas subam sozinhas.',
    'Supervisionar a coleta de frutas e proibir que crianças subam em árvores altas e em telhados para colher açaí, manga ou cupuaçu.',
    'Instalar corrimão e barreiras em flutuantes, portos, pontes e passarelas de madeira, e manter iluminação nesses trechos.',
    'Usar capacete em bicicleta e equipamento adequado nos esportes.',
    'Manter o chão seco e livre de obstáculos e fixar tapetes.',
    'Supervisionar crianças pequenas em playgrounds e preferir superfícies amortecedoras sob os brinquedos.'
  ],
  fontes: [
    { nome: 'OMS/UNICEF – World Report on Child Injury Prevention', ano: 2008 },
    { nome: 'Tratado de Pediatria – Sociedade Brasileira de Pediatria', ano: 2022 },
    { nome: 'Sociedade Brasileira de Pediatria – Manual de segurança da criança e do adolescente', ano: 2021 },
    { nome: 'Nelson Textbook of Pediatrics', ano: 2020 }
  ],
  atualizadoEm: '2026-09'
});

// ============================================== 12. MORDEDURA DE CÃO
PED.data.acidentes.protocolos.push({
  id: 'mordedura_cao',
  nome: 'Mordedura de cão e de outros mamíferos',
  categoria: 'acidente',
  amazonia: false,
  cid10: 'W54',
  tags: ['mordedura_animal', 'feridas', 'dor_local', 'sangramento', 'febre', 'lesoes_pele', 'alteracao_consciencia'],
  definicao: 'Ferimento por dentes de mamífero, com componente de perfuração, laceração, esmagamento e inoculação de microrganismos da cavidade oral do animal. Além do tratamento da ferida, exige duas decisões independentes e obrigatórias: a profilaxia antirrábica, conforme o tipo de exposição e a condição do animal, e a profilaxia antitetânica, conforme a situação vacinal.',
  epidemiologia: 'A mordedura de cão é um dos acidentes mais frequentes na infância, e a criança é a principal vítima. Em menores de 5 anos, o cão é quase sempre conhecido, da própria casa ou da vizinhança, e a mordedura acontece durante brincadeira, alimentação do animal, aproximação enquanto ele come ou dorme, ou contato com a ninhada. Pela estatura, a criança pequena é mordida preferencialmente em face, cabeça e pescoço, o que produz lesões desfigurantes e de maior risco de complicação. Em escolares e adolescentes, predominam lesões em mãos, braços e pernas. No Brasil, a raiva humana transmitida por cão está controlada na maior parte do território, mas a raiva silvestre permanece, com destaque para o morcego hematófago, para primatas não humanos, como o sagui, e para animais silvestres mantidos como animais de estimação, situação comum na região amazônica. A raiva é doença praticamente sempre fatal e inteiramente prevenível pela profilaxia correta e oportuna, o que torna essa decisão uma das mais importantes do atendimento. Atendimento antirrábico é de notificação compulsória.',
  agente: 'Cão, gato, morcego, primata não humano, animais silvestres (raposa, quati, guaxinim, jaritataca), animais de produção (bovino, equino, suíno, caprino) e mordedura humana. A ferida é polimicrobiana: Pasteurella multocida (muito frequente no cão e sobretudo no gato), Staphylococcus aureus, Streptococcus, Capnocytophaga canimorsus e anaeróbios; na mordedura humana, Eikenella corrodens. O vírus da raiva, do gênero Lyssavirus, é transmitido pela saliva.',
  transmissao: 'A infecção bacteriana da ferida decorre da inoculação direta da flora oral do animal. O vírus da raiva é transmitido pela saliva do animal infectado, por mordedura, arranhadura ou lambedura de mucosa ou de pele lesada; o risco é maior em ferimentos profundos, múltiplos, em face, cabeça, pescoço, mãos e pés, regiões de rica inervação.',
  incubacao: 'Infecção bacteriana da ferida: 8 a 24 horas para Pasteurella (evolução rápida) e 24 a 72 horas para estafilococos e estreptococos. Raiva: habitualmente de 20 a 90 dias, podendo variar de poucos dias a mais de um ano, com período mais curto em ferimentos de face, cabeça e mãos. Tétano: 3 a 21 dias.',
  manifestacoes: [
    'Ferimento perfurante, lacerante ou com esmagamento, único ou múltiplo, com bordas irregulares e grau variável de desvitalização.',
    'Localização em face, cabeça e pescoço em crianças pequenas, e em mãos e membros em crianças maiores.',
    'Dor, edema, sangramento e limitação funcional.',
    'Lesões puntiformes profundas, especialmente de gato, que parecem pequenas e têm alto risco de infecção.',
    'Infecção precoce, em 8 a 24 horas: dor desproporcional, eritema em expansão, edema e secreção, compatível com Pasteurella.',
    'Infecção mais tardia, em 24 a 72 horas, com celulite, abscesso, linfangite, adenomegalia regional e febre, compatível com estafilococos e estreptococos.',
    'Complicações: tenossinovite, artrite séptica e osteomielite em ferimentos de mão e próximos a articulações.',
    'Lesão de estruturas profundas: tendão, nervo, vaso, glândula parótida, ducto lacrimal, cartilagem e osso.',
    'Repercussão psicológica frequente, com medo, pesadelos e fobia de animais, especialmente quando o ataque é em face.',
    'Raiva humana, em fase de doença: alteração de comportamento, agitação, alucinação, hidrofobia, aerofobia, espasmos, disfagia, sialorreia, paralisia e evolução quase invariavelmente fatal.',
    'Tétano: trismo, rigidez de nuca, disfagia, riso sardônico e espasmos, em ferimento contaminado com vacinação incompleta.'
  ],
  sinaisAlarme: [
    'Ferimento em face, cabeça, pescoço, mãos, pés, genitália ou próximo a articulação.',
    'Ferimento profundo, múltiplo, extenso ou com dilaceração e perda de tecido.',
    'Mordedura por morcego, por primata não humano ou por qualquer animal silvestre: exposição grave, independentemente do aspecto da lesão.',
    'Animal com comportamento alterado, agressivo sem provocação, com salivação excessiva, paralisia ou que morreu ou desapareceu após o ataque.',
    'Animal não vacinado, errante, desconhecido ou impossível de observar.',
    'Sinais de infecção: dor crescente, eritema em expansão, secreção purulenta, linfangite, adenomegalia dolorosa ou febre.',
    'Perda de função, déficit motor ou sensitivo, sugerindo lesão de tendão ou de nervo.',
    'Sangramento importante ou lesão vascular.',
    'Criança imunossuprimida, asplênica, desnutrida ou com doença crônica.',
    'Situação vacinal antitetânica incompleta ou desconhecida.'
  ],
  diagnosticoDiferencial: ['ferimento_cortocontuso', 'mordedura por outro animal, inclusive humana', 'acidente_ofidico', 'celulite e erisipela de outra origem', 'abscesso de partes moles', 'lesão autoprovocada ou infligida (avaliar violência)'],
  exames: ['exame detalhado da ferida com avaliação de tendões, nervos, vasos e estruturas profundas', 'radiografia do local em ferimento profundo, suspeita de fratura, de corpo estranho (fragmento de dente) ou de acometimento ósseo', 'hemograma', 'pcr', 'cultura de secreção da ferida quando houver infecção', 'hemocultura em criança com febre e toxemia', 'ultrassonografia de partes moles em suspeita de coleção'],
  criteriosDiagnosticos: [
    'Registrar com precisão: espécie do animal, se é conhecido, vacinado e passível de observação por 10 dias, se o ataque foi provocado, o local e a profundidade das lesões, o tempo decorrido e a conduta já realizada.',
    'Classificar a exposição para fins de profilaxia antirrábica em contato indireto, acidente leve ou acidente grave, conforme as normas do Ministério da Saúde.',
    'Avaliar a condição do animal: cão ou gato sadio e passível de observação por 10 dias; cão ou gato suspeito, doente, morto ou desaparecido; animal silvestre, morcego ou primata não humano, sempre considerados de alto risco.',
    'Definir a profilaxia antirrábica na primeira avaliação, mesmo que a criança volte depois para sutura ou curativo: o atraso reduz a eficácia.',
    'Avaliar a situação vacinal antitetânica e a característica do ferimento, definindo a profilaxia conforme a tabela do Ministério da Saúde.',
    'Avaliar indicação de antibiótico profilático conforme a localização, a profundidade e as condições da criança.',
    'Reavaliar entre 24 e 48 horas, período em que a infecção por Pasteurella costuma manifestar-se.',
    'Notificar o atendimento antirrábico e, quando houver suspeita de violência ou de negligência, acionar a rede de proteção.'
  ],
  classificacaoGravidade: [
    { nivel: 'Contato indireto ou sem lesão', criterios: 'Manipulação de utensílios, contato com pelo, lambedura de pele íntegra. Considerar lavagem e orientação; não há indicação de profilaxia antirrábica nem de antibiótico.' },
    { nivel: 'Acidente leve', criterios: 'Ferimento superficial, pouco extenso, único, em tronco ou em membros, exceto mãos, polpas digitais e planta do pé; arranhadura; lambedura de pele com lesão superficial. Conduzir a profilaxia antirrábica conforme a condição do animal.' },
    { nivel: 'Acidente grave', criterios: 'Ferimento em cabeça, face, pescoço, mãos, polpas digitais ou planta do pé; ferimento profundo, múltiplo ou extenso; lambedura de mucosa; lambedura de pele com lesão grave; e qualquer exposição a morcego, a primata não humano ou a animal silvestre. Conduzir com soro e vacina conforme a condição do animal, e avaliar sutura, antibiótico e avaliação especializada.' }
  ],
  tratamento: [
    'Lavagem imediata e abundante com água corrente e sabão por pelo menos 15 minutos, mecanicamente vigorosa: é a medida isolada mais eficaz para reduzir o risco de raiva e de infecção bacteriana, e deve ser feita antes de qualquer outra coisa, inclusive em casa.',
    'Irrigação da ferida com soro fisiológico sob pressão moderada, com remoção de corpos estranhos, de pelos e de fragmentos de dente, e desbridamento econômico de tecido desvitalizado.',
    'Antissepsia com clorexidina ou povidona, conforme protocolo do serviço; evitar cauterização e uso de substâncias caseiras.',
    'Decidir o fechamento caso a caso: considerar sutura primária em ferimentos de face, por resultado estético e boa vascularização, sempre após irrigação abundante; evitar sutura em ferimentos puntiformes, em mãos e pés, em ferimentos com mais de 6 a 12 horas de evolução, com esmagamento ou com sinais de infecção, preferindo cicatrização por segunda intenção ou fechamento primário tardio.',
    'Quando suturar, usar pontos frouxos, sem tensão, sem espaço morto e sem sepultar fios, mantendo reavaliação precoce.',
    'Elevar o membro acometido e imobilizar quando houver lesão de mão, para reduzir edema.',
    'Profilaxia antirrábica conforme o tipo de exposição e a condição do animal, seguindo as normas do Ministério da Saúde, com infiltração do soro ou da imunoglobulina na ferida e ao redor dela sempre que anatomicamente possível.',
    'Profilaxia antitetânica conforme a situação vacinal e o tipo de ferimento: mordedura é ferimento com risco de tétano.',
    'Antibiótico profilático por 3 a 5 dias em ferimentos de mão, pé, face, genitália, articulação, ferimentos profundos ou com esmagamento, ferimentos suturados, mordedura de gato e mordedura humana, e em crianças imunossuprimidas, asplênicas ou com atendimento tardio; a primeira escolha é amoxicilina com clavulanato.',
    'Antibiótico terapêutico por 7 a 14 dias quando já houver infecção, conforme a extensão e a resposta, com via intravenosa nas formas graves.',
    'Avaliação especializada (cirurgia plástica, cirurgia de mão, oftalmologia ou otorrinolaringologia) em lesões de face, de pálpebra, de lábio, de orelha, de nariz, de mão e em lesões com perda tecidual.',
    'Analgesia adequada; considerar anestesia local ou bloqueio para exploração e limpeza, além de sedação para procedimento em criança pequena, conforme protocolo.',
    'Orientar a observação do cão ou do gato agressor por 10 dias, quando o animal for identificável, e comunicar imediatamente qualquer alteração de comportamento, adoecimento, fuga ou morte do animal.',
    'Notificar o atendimento antirrábico e comunicar a vigilância epidemiológica; em exposição a morcego, acionar também a vigilância ambiental.',
    'Acolher a criança e a família quanto ao medo e ao trauma, e orientar convivência segura com animais.'
  ],
  medicamentos: [
    { medId: 'amoxicilina_clavulanato', esquema: 'Primeira escolha para profilaxia e para tratamento de infecção: 45 a 50 mg/kg/dia do componente amoxicilina VO dividida 12/12 h; profilaxia por 3 a 5 dias e tratamento por 7 a 14 dias, conforme protocolo do serviço.' },
    { medId: null, nome: 'Clindamicina associada a sulfametoxazol com trimetoprima', esquema: 'Alternativa em alergia a penicilina, para cobrir anaeróbios, estafilococos e Pasteurella, conforme protocolo do serviço e bula. Confirmar conforme protocolo/bula.', verificar: true },
    { medId: 'sulfametoxazol_trimetoprim', esquema: 'Componente da alternativa em alergia a penicilina: 40 mg/kg/dia de sulfametoxazol e 8 mg/kg/dia de trimetoprima VO dividida 12/12 h, habitualmente associada a antibiótico com cobertura para anaeróbios. Contraindicado em menores de 2 meses.' },
    { medId: 'ceftriaxona', esquema: 'Infecção grave com internação: 50 a 100 mg/kg/dia IV, habitualmente associada a cobertura para anaeróbios, conforme protocolo do serviço.' },
    { medId: 'metronidazol', esquema: 'Cobertura para anaeróbios em infecção grave, associada a cefalosporina: 22,5 a 30 mg/kg/dia IV ou VO dividida 8/8 h, conforme protocolo do serviço.' },
    { medId: 'cefalexina', esquema: 'Cobertura apenas para flora cutânea, insuficiente isoladamente para Pasteurella; usar somente conforme avaliação e protocolo do serviço: 50 mg/kg/dia VO dividida 6/6 h ou 8/8 h.' },
    { medId: null, nome: 'Vacina antirrábica de cultivo celular', esquema: 'Profilaxia pós-exposição por via intramuscular, em esquema de 4 doses nos dias 0, 3, 7 e 14, ou esquema de 2 doses nos dias 0 e 3 com observação do animal, conforme o tipo de exposição e a condição do animal, segundo as normas vigentes do Ministério da Saúde. Confirmar conforme a Nota Técnica e o Guia de Vigilância em Saúde vigentes.', verificar: true },
    { medId: null, nome: 'Soro antirrábico heterólogo (SAR)', esquema: 'Acidente grave com indicação: 40 UI/kg, infiltrando a maior quantidade possível na ferida e ao redor dela e aplicando o restante por via intramuscular, conforme normas do Ministério da Saúde, com material e equipe preparados para reação anafilática. Confirmar conforme a norma vigente.', verificar: true },
    { medId: null, nome: 'Imunoglobulina humana antirrábica (IGHAR)', esquema: 'Alternativa ao soro heterólogo, indicada em hipersensibilidade ou conforme disponibilidade no CRIE: 20 UI/kg, com a mesma orientação de infiltração local, conforme normas do Ministério da Saúde. Confirmar conforme a norma vigente.', verificar: true },
    { medId: null, nome: 'Vacina antitetânica (DTP, DT, dT ou dTpa conforme a idade) e imunoglobulina antitetânica', esquema: 'Profilaxia conforme a situação vacinal e a característica do ferimento, segundo as orientações do Ministério da Saúde.' },
    { medId: 'dipirona', esquema: 'Analgesia: 10 a 15 mg/kg/dose VO ou IV a cada 6 h, conforme bula.' },
    { medId: 'paracetamol', esquema: 'Analgesia: 10 a 15 mg/kg/dose VO a cada 6 h, conforme bula.' },
    { medId: 'soro_fisiologico', esquema: 'Irrigação abundante da ferida e curativos.' },
    { medId: 'adrenalina', esquema: 'Disponível durante a aplicação do soro heterólogo, para manejo imediato de anafilaxia, conforme protocolo.' }
  ],
  criteriosInternacao: [
    'Ferimento extenso, profundo, com perda tecidual ou com necessidade de reparo cirúrgico sob anestesia geral.',
    'Ferimento em face, pálpebra, orelha, nariz, lábio ou mão com comprometimento funcional ou estético importante.',
    'Infecção estabelecida com celulite extensa, abscesso, linfangite, febre ou toxemia.',
    'Suspeita de tenossinovite, artrite séptica ou osteomielite.',
    'Necessidade de antibiótico intravenoso.',
    'Lesão vascular, nervosa ou tendínea.',
    'Sangramento importante.',
    'Criança imunossuprimida, asplênica ou com comorbidade relevante.',
    'Impossibilidade de reavaliação em 24 a 48 horas ou domicílio distante.'
  ],
  criteriosUTI: [
    'Sepse ou choque séptico de foco cutâneo.',
    'Fasciíte necrosante ou infecção invasiva de partes moles.',
    'Lesão vascular com sangramento importante e instabilidade.',
    'Ferimento cervical com comprometimento de via aérea.',
    'Anafilaxia grave após a aplicação do soro heterólogo.',
    'Suspeita de raiva humana em fase de doença, com necessidade de suporte e de isolamento conforme protocolo.'
  ],
  criteriosAlta: [
    'Ferida limpa, com plano de curativo definido e sem sinais de infecção em progressão.',
    'Profilaxia antirrábica iniciada e esquema de continuidade agendado e anotado no cartão.',
    'Profilaxia antitetânica avaliada e registrada.',
    'Antibiótico, quando indicado, prescrito e compreendido pelo responsável.',
    'Dor controlada e função preservada no segmento acometido.',
    'Responsável orientado sobre os sinais de infecção e sobre a importância de completar todas as doses da vacina antirrábica.',
    'Observação do animal por 10 dias combinada e canal de comunicação definido.',
    'Atendimento antirrábico notificado.',
    'Reavaliação agendada em 24 a 48 horas.'
  ],
  orientacoes: [
    'Logo após a mordida, lave o ferimento com água corrente e sabão por pelo menos 15 minutos, esfregando bem, e depois procure o serviço de saúde.',
    'Não passe pó de café, fumo, folha, terra, urina, querosene, álcool puro nem qualquer outro produto caseiro na ferida, e não queime nem corte o local.',
    'Procure atendimento mesmo que a ferida pareça pequena: a raiva pode ser transmitida por mordida pequena, por arranhão ou por lambida em ferida.',
    'Leve a informação sobre o animal: se é seu, do vizinho ou de rua, se é vacinado, se pode ser observado por 10 dias e se estava agressivo ou estranho.',
    'Se o animal for morcego, macaco, sagui ou qualquer bicho do mato, avise imediatamente a equipe: essa exposição é sempre considerada grave.',
    'Se a equipe indicar a vacina contra a raiva, tome todas as doses nas datas marcadas, mesmo que a criança esteja bem e mesmo que o animal continue sadio, até que a equipe diga que pode parar.',
    'Observe o cão ou o gato por 10 dias sem sacrificá-lo, e avise imediatamente a unidade de saúde se ele adoecer, ficar estranho, fugir ou morrer.',
    'Leve o cartão de vacina da criança para a equipe avaliar a vacina contra o tétano.',
    'Volte imediatamente se aparecer febre, dor que aumenta, vermelhidão que se espalha, inchaço, pus, cheiro ruim, listras vermelhas subindo pelo braço ou pela perna, ou íngua dolorida.',
    'Ensine a criança a não abraçar, não beijar, não puxar rabo nem orelha de cão, a não se aproximar de cão que está comendo, dormindo ou com filhotes, e nunca deixe criança pequena sozinha com um cão, mesmo o da própria casa.'
  ],
  retorno: 'Reavaliação em 24 a 48 horas, período em que as infecções por Pasteurella costumam se manifestar, e nova avaliação em 5 a 7 dias ou para retirada de pontos, conforme o caso. Comparecimento obrigatório nas datas das doses da vacina antirrábica, com registro no cartão. Retorno imediato diante de febre, dor crescente, vermelhidão em expansão, pus, perda de movimento ou alteração da sensibilidade. Em lesões de face, seguimento com cirurgia plástica e atenção ao resultado estético e funcional; considerar apoio psicológico quando houver medo intenso, alteração do sono ou evitação persistente.',
  prevencao: [
    'Nunca deixar criança pequena sozinha com cão, inclusive com o cão da família e com cães dóceis.',
    'Ensinar a criança a não se aproximar de cão que está comendo, dormindo, machucado ou com filhotes.',
    'Ensinar a não correr, gritar nem olhar fixamente para um cão desconhecido, e a ficar parada e quieta se for cercada.',
    'Não permitir brincadeiras de puxar rabo, orelha e pelo, nem brincadeiras que estimulem a mordida no animal.',
    'Manter a vacinação antirrábica dos cães e gatos em dia nas campanhas anuais e manter os animais contidos no quintal.',
    'Castrar e cuidar dos animais, reduzindo a população de animais errantes na comunidade.',
    'Não criar animais silvestres, como saguis e quatis, como animais de estimação: além de ilegal, é risco de raiva.',
    'Orientar que morcego encontrado no chão, durante o dia ou dentro de casa não deve ser tocado, e acionar a vigilância; usar telas e vedar frestas onde houver colônias.',
    'Manter o calendário vacinal antitetânico atualizado.',
    'Divulgar nas escolas e nas comunidades a conduta correta após a mordedura: lavar com água e sabão por 15 minutos e procurar o serviço de saúde.'
  ],
  fontes: [
    { nome: 'Normas Técnicas de Profilaxia da Raiva Humana – Ministério da Saúde', ano: 2014 },
    { nome: 'Nota Informativa sobre o esquema de profilaxia antirrábica humana pós-exposição – Ministério da Saúde', ano: 2022 },
    { nome: 'Guia de Vigilância em Saúde, capítulos de raiva e de tétano acidental – Ministério da Saúde', ano: 2024 },
    { nome: 'OMS – WHO Expert Consultation on Rabies, third report', ano: 2018 },
    { nome: 'Red Book – American Academy of Pediatrics, bite wounds', ano: 2021 },
    { nome: 'Tratado de Pediatria – Sociedade Brasileira de Pediatria', ano: 2022 }
  ],
  atualizadoEm: '2026-09'
});

// ============================================== 13. CHOQUE ELÉTRICO
PED.data.acidentes.protocolos.push({
  id: 'choque_eletrico',
  nome: 'Choque elétrico e queimadura elétrica',
  categoria: 'acidente',
  amazonia: false,
  cid10: 'T75.4',
  tags: ['feridas', 'lesoes_pele', 'dor_local', 'alteracao_consciencia', 'convulsao', 'cianose', 'palidez', 'dispneia'],
  definicao: 'Lesão causada pela passagem de corrente elétrica pelo corpo, com dano térmico nos tecidos e efeito direto sobre o coração, o músculo e o sistema nervoso. A gravidade depende do tipo de corrente, da voltagem, da resistência dos tecidos, do trajeto da corrente e do tempo de contato. O trajeto que atravessa o tórax e o que vai de uma mão à outra são os de maior risco de arritmia.',
  epidemiologia: 'Em lactentes e pré-escolares, o acidente ocorre dentro de casa, por introdução de objeto metálico em tomada, mordida de fio de aparelho ligado, contato com extensão desencapada e com aparelho em ambiente úmido. Em escolares e adolescentes, aparecem o contato com rede elétrica, o empinar pipa próximo a fios, a subida em poste, telhado ou árvore próxima à rede e o trabalho informal com instalação elétrica. Na região, são especialmente relevantes as ligações improvisadas, os fios emendados com fita, a fiação exposta em casas de madeira e palafitas, o uso de geradores comunitários, a oscilação da energia, a chuveiro e bomba de água mal aterrados e o contato com equipamento elétrico em ambiente permanentemente úmido, condições que reduzem a resistência da pele e aumentam a gravidade. A descarga atmosférica (raio) é causa relevante em área aberta, no rio e em campo, sobretudo no período chuvoso.',
  agente: 'Corrente alternada domiciliar de baixa tensão (127 V ou 220 V), corrente de alta tensão (rede de distribuição, transformador, subestação), descarga atmosférica e, menos comumente, corrente contínua. A corrente alternada de baixa tensão provoca contração muscular tetânica que impede a criança de soltar o objeto, prolongando o contato e aumentando a lesão.',
  transmissao: 'Não se aplica: agravo por causa externa. A corrente entra por um ponto de contato, percorre os tecidos de menor resistência, sobretudo vasos, nervos e músculos, e sai por outro ponto, habitualmente em contato com o solo.',
  incubacao: 'Não se aplica. Arritmias graves ocorrem em geral no momento do choque ou nas primeiras horas. A lesão muscular profunda e a mionecrose podem evoluir ao longo de horas a dias, assim como a lesão renal por rabdomiólise. A queimadura de comissura labial pode sangrar tardiamente, entre o quinto e o décimo quarto dia, com a queda da escara.',
  manifestacoes: [
    'Queimadura de entrada e de saída: lesões arredondadas, deprimidas, esbranquiçadas ou enegrecidas, com aspecto pequeno na superfície e dano extenso em profundidade.',
    'Queimadura por arco elétrico, com lesão térmica intensa e possível ignição das roupas.',
    'Contração muscular tetânica com incapacidade de soltar o objeto, dor muscular intensa e, por vezes, fratura ou luxação por contração violenta.',
    'Arritmias: fibrilação ventricular, assistolia, taquicardia ventricular, fibrilação atrial, extrassístoles e alterações inespecíficas do segmento ST e da onda T.',
    'Parada cardiorrespiratória no momento do choque, em que a reanimação precoce tem alta chance de sucesso, sobretudo em crianças.',
    'Alteração do nível de consciência, confusão, convulsão, cefaleia, perda de memória do evento e síncope.',
    'Déficit motor ou sensitivo, parestesia, paresia e dor neuropática, que podem ser imediatos ou tardios.',
    'Mionecrose e rabdomiólise, com urina escura, dor muscular intensa e elevação de CPK, com risco de lesão renal aguda.',
    'Síndrome compartimental do membro acometido, com dor desproporcional, edema tenso, parestesia e dor à extensão passiva.',
    'Queimadura de comissura labial por mordida de fio em lactentes, com escara que pode desprender-se entre o quinto e o décimo quarto dia, com sangramento arterial importante da artéria labial.',
    'Lesões associadas por queda, quando o choque ocorre em altura, em poste, em telhado ou em árvore.',
    'Lesão por raio: queimadura em padrão arboriforme (figuras de Lichtenberg), ruptura timpânica, lesão ocular, confusão e parada cardiorrespiratória.'
  ],
  sinaisAlarme: [
    'Parada cardiorrespiratória, arritmia ou alteração no eletrocardiograma.',
    'Perda de consciência, confusão, convulsão ou déficit neurológico.',
    'Choque de alta tensão, contato com rede elétrica, poste, transformador ou descarga atmosférica.',
    'Trajeto de corrente que atravessa o tórax, ou entrada em uma mão e saída na outra, ou passagem da cabeça aos pés.',
    'Queimadura de entrada e de saída evidentes, mesmo que pequenas.',
    'Urina escura, dor muscular intensa ou elevação de CPK.',
    'Dor desproporcional em membro, edema tenso ou alteração de pulso e de sensibilidade.',
    'Queimadura de comissura labial em lactente, pelo risco de sangramento tardio.',
    'Choque ocorrido em ambiente úmido, dentro da água ou com a criança molhada.',
    'Queda associada ao choque, com mecanismo de trauma.'
  ],
  diagnosticoDiferencial: ['queimadura', 'traumatismo_cranioencefalico', 'queda', 'convulsão de outra etiologia', 'síncope e arritmia primária', 'afogamento quando o choque ocorre na água', 'lesão por raio'],
  exames: ['eletrocardiograma de 12 derivações na admissão', 'monitorização cardíaca contínua quando indicada', 'cpk', 'urina_1', 'eletrolitos', 'ureia', 'creatinina', 'gasometria', 'hemograma', 'glicemia', 'lactato', 'radiografia de segmentos com suspeita de fratura e de coluna cervical quando houver queda', 'tomografia de crânio quando houver alteração neurológica ou trauma associado'],
  criteriosDiagnosticos: [
    'Caracterizar o acidente: fonte, voltagem estimada, corrente alternada ou contínua, tempo de contato, se a criança estava molhada ou descalça, se houve projeção ou queda e se houve perda de consciência.',
    'Identificar os pontos de entrada e de saída e deduzir o trajeto provável da corrente: o trajeto define o risco cardíaco e muscular.',
    'A extensão da queimadura na pele subestima sistematicamente o dano profundo na lesão elétrica: uma lesão pequena pode acompanhar mionecrose extensa.',
    'Eletrocardiograma em todos os casos, exceto em choque de baixa tensão, em criança assintomática, sem perda de consciência, com pele seca, sem queimadura, sem trajeto transtorácico e com exame normal, conforme protocolo do serviço.',
    'Monitorização cardíaca por pelo menos 4 a 6 horas, ou por 24 horas conforme o protocolo, em choque de alta tensão, arritmia documentada, perda de consciência, eletrocardiograma alterado, trajeto transtorácico, choque na água ou parada revertida.',
    'Pesquisar rabdomiólise com CPK e exame de urina em choques de alta tensão, em queimaduras extensas e quando houver dor muscular ou urina escura.',
    'Reavaliar o membro acometido de forma seriada quanto a síndrome compartimental.',
    'Considerar avaliação por oftalmologia e otorrinolaringologia em lesão por raio, pelo risco de catarata e de ruptura timpânica.'
  ],
  classificacaoGravidade: [
    { nivel: 'Baixo risco', criterios: 'Choque domiciliar de baixa tensão, criança assintomática, com pele seca no momento, sem perda de consciência, sem queimadura, sem trajeto transtorácico e com exame normal. Considerar observação curta e alta orientada, conforme protocolo do serviço.' },
    { nivel: 'Risco intermediário', criterios: 'Baixa tensão com queimadura visível, dor muscular, sintomas transitórios, contato em ambiente úmido, trajeto incerto ou criança pequena que mordeu fio. Considerar eletrocardiograma, monitorização, exames e observação hospitalar.' },
    { nivel: 'Alto risco', criterios: 'Alta tensão, descarga atmosférica, perda de consciência, arritmia, parada revertida, queimadura extensa, rabdomiólise, trajeto transtorácico ou queda associada. Considerar suporte avançado, monitorização contínua, avaliação cirúrgica e terapia intensiva.' }
  ],
  tratamento: [
    'Segurança da cena antes de tudo: desligar a energia na chave geral antes de tocar na vítima; nunca tocar em criança ainda em contato com a fonte; em alta tensão, manter distância e acionar a concessionária e os Bombeiros pelo 193.',
    'Reanimação cardiopulmonar imediata se houver parada: a parada por eletrocução em criança tem bom prognóstico quando a reanimação é precoce e prolongada, e não se deve interrompê-la precocemente.',
    'ABCDE com restrição de movimento cervical quando houver queda ou projeção.',
    'Eletrocardiograma na admissão e monitorização conforme o risco.',
    'Acesso venoso e hidratação: em lesão de alta tensão e em rabdomiólise, considerar hidratação vigorosa com cristaloide para manter diurese adequada, conforme protocolo do serviço, com acompanhamento de CPK, potássio, função renal e equilíbrio ácido-base.',
    'Atenção especial à reposição volêmica na queimadura elétrica: as fórmulas baseadas na área de superfície queimada subestimam a necessidade, porque o dano profundo não aparece na pele; guiar pela diurese e pela perfusão.',
    'Analgesia adequada; a dor muscular e neuropática pode ser intensa.',
    'Cuidado das queimaduras conforme o protocolo de queimadura, com desbridamento e avaliação cirúrgica, pois a lesão profunda frequentemente exige exploração.',
    'Avaliar e reavaliar síndrome compartimental; considerar fasciotomia conforme avaliação cirúrgica.',
    'Profilaxia antitetânica conforme a situação vacinal e o tipo de ferimento.',
    'Queimadura de comissura labial: avaliação por cirurgia e orientação explícita à família sobre o risco de sangramento importante entre o quinto e o décimo quarto dia, com plano de acesso rápido ao serviço, o que é crítico em comunidades distantes.',
    'Avaliação neurológica seriada e orientação sobre sintomas tardios, como parestesia, fraqueza, dificuldade de concentração e alteração do humor.',
    'Investigar as condições da instalação elétrica do domicílio e acionar apoio social e comunitário quando houver improvisação perigosa.',
    'Considerar negligência quando o acidente decorrer de condição perigosa conhecida e não corrigida, com articulação da rede de proteção quando indicado.'
  ],
  medicamentos: [
    { medId: 'ringer_lactato', esquema: 'Hidratação e reposição volêmica na queimadura elétrica e na rabdomiólise, guiada por diurese e perfusão, conforme protocolo do serviço.' },
    { medId: 'soro_fisiologico', esquema: 'Expansão em sinais de choque: 10 a 20 mL/kg em bolus, reavaliando após cada alíquota; também usado na hidratação da rabdomiólise.' },
    { medId: 'adrenalina', esquema: 'Parada cardiorrespiratória: 0,01 mg/kg IV ou IO da solução 1:10.000, a cada 3 a 5 minutos, conforme protocolo de PALS.' },
    { medId: 'dipirona', esquema: 'Analgesia: 10 a 15 mg/kg/dose VO ou IV a cada 6 h, conforme bula.' },
    { medId: 'paracetamol', esquema: 'Analgesia: 10 a 15 mg/kg/dose VO a cada 6 h, conforme bula.' },
    { medId: null, nome: 'Analgésico opioide (morfina ou fentanil)', esquema: 'Dor intensa e curativos de queimadura elétrica: dose, via e monitorização conforme protocolo do serviço e bula. Confirmar conforme protocolo/bula.', verificar: true },
    { medId: 'midazolam', esquema: 'Convulsão ou sedação para procedimento: 0,1 a 0,2 mg/kg IV, IM ou IO, conforme bula e protocolo do serviço.' },
    { medId: 'glicose', esquema: 'Correção de hipoglicemia e manutenção conforme necessidade, com controle seriado.' },
    { medId: null, nome: 'Bicarbonato de sódio', esquema: 'Considerado em rabdomiólise com acidose ou hipercalemia, conforme protocolo do serviço e avaliação. Confirmar conforme protocolo/bula.', verificar: true },
    { medId: null, nome: 'Vacina antitetânica e imunoglobulina antitetânica', esquema: 'Profilaxia conforme a situação vacinal e a característica do ferimento, segundo as orientações do Ministério da Saúde.' }
  ],
  criteriosInternacao: [
    'Choque de alta tensão ou por descarga atmosférica.',
    'Perda de consciência, convulsão ou déficit neurológico.',
    'Eletrocardiograma alterado ou arritmia documentada.',
    'Queimadura elétrica com lesão de entrada e de saída, ou queimadura extensa.',
    'Trajeto transtorácico ou de mão a mão.',
    'Rabdomiólise, urina escura ou CPK elevada.',
    'Dor intensa, edema de membro ou suspeita de síndrome compartimental.',
    'Queimadura de comissura labial em lactente, conforme protocolo do serviço e possibilidade de acesso rápido ao serviço.',
    'Queda ou trauma associado.',
    'Domicílio distante ou impossibilidade de retorno rápido.'
  ],
  criteriosUTI: [
    'Parada cardiorrespiratória revertida ou arritmia instável.',
    'Necessidade de ventilação mecânica ou de droga vasoativa.',
    'Rabdomiólise grave com lesão renal aguda, hipercalemia ou necessidade de diálise.',
    'Queimadura elétrica extensa com necessidade de reposição volêmica intensiva e de cirurgia.',
    'Síndrome compartimental com necessidade de fasciotomia e de monitorização.',
    'Alteração neurológica grave ou convulsão refratária.'
  ],
  criteriosAlta: [
    'Período de observação e de monitorização cumprido conforme o risco, sem arritmia.',
    'Eletrocardiograma normal quando indicado e exame cardiovascular normal.',
    'Exame neurológico normal e ausência de sintomas.',
    'Ausência de sinais de rabdomiólise e função renal normal quando avaliadas.',
    'Ferida com plano de curativo definido e profilaxia antitetânica registrada.',
    'Responsável orientado sobre sinais tardios, incluindo o risco de sangramento da comissura labial entre o quinto e o décimo quarto dia.',
    'Condição elétrica do domicílio discutida e encaminhamentos combinados.',
    'Retorno agendado.'
  ],
  orientacoes: [
    'Se alguém levar choque, não toque na criança antes de desligar a chave geral da energia ou de afastar o fio com um objeto seco que não conduza eletricidade, como madeira seca.',
    'Se for fio da rede elétrica, poste ou transformador, mantenha todos longe e chame os Bombeiros pelo 193 e a companhia de energia.',
    'Se a criança não estiver respirando, chame o SAMU 192 e comece as compressões no peito imediatamente: nesses casos a reanimação salva muitas crianças.',
    'Leve a criança ao serviço de saúde mesmo que ela pareça bem depois do choque, principalmente se ficou grudada no fio, se estava molhada ou se desmaiou.',
    'Se a criança mordeu um fio e queimou o canto da boca, fique atento: entre o quinto e o décimo quarto dia a casca pode cair e sangrar muito. Se isso acontecer, aperte firme o lábio entre os dedos e leve imediatamente ao serviço de saúde.',
    'Volte ao serviço se a urina ficar escura, cor de coca-cola, se houver dor muscular forte, se o braço ou a perna inchar, ficar dormente, frio ou roxo.',
    'Volte se aparecerem desmaio, palpitação, tontura, formigamento, fraqueza, dificuldade para se concentrar ou mudança de comportamento nos dias seguintes.',
    'Coloque protetores em todas as tomadas e não deixe fios de aparelhos ligados ao alcance de bebês, que levam tudo à boca.',
    'Não use fios emendados com fita, benjamins sobrecarregados, nem ligações improvisadas; procure ajuda de um eletricista e evite gambiarras.',
    'Não empine pipa perto de fios e postes, não use linha com cerol, não suba em poste, telhado nem em árvore encostada na rede elétrica, e não mexa em aparelho elétrico com a mão molhada ou com os pés na água.'
  ],
  retorno: 'Reavaliação em 24 a 48 horas nos casos liberados e conforme a evolução da queimadura. Em queimadura de comissura labial, reavaliações programadas e orientação de retorno imediato entre o quinto e o décimo quarto dia diante de sangramento. Seguimento neurológico em crianças com sintomas persistentes, pois manifestações como parestesia, fraqueza, dor neuropática, alteração de memória, de atenção e do humor podem surgir ou persistir semanas depois. Em lesão por raio, seguimento oftalmológico e otorrinolaringológico conforme indicação. Acompanhamento de cicatrizes e reabilitação funcional nas queimaduras profundas.',
  prevencao: [
    'Protetores em todas as tomadas acessíveis e tomadas altas quando possível.',
    'Não deixar fios de aparelhos ligados ao alcance de lactentes e substituir fios desencapados ou emendados.',
    'Evitar ligações improvisadas, extensões sobrecarregadas e benjamins, e buscar orientação técnica para a instalação.',
    'Aterramento adequado de chuveiro, bomba de água, geladeira e gerador, e manutenção periódica.',
    'Não manusear aparelhos elétricos com as mãos molhadas, com os pés na água ou dentro do banheiro molhado.',
    'Não empinar pipa perto da rede elétrica e não usar linha com cerol ou material condutor.',
    'Não subir em postes, telhados e árvores próximas a fios, e orientar as crianças e os adolescentes sobre esse risco.',
    'Durante tempestades, sair da água e de áreas abertas, evitar abrigo sob árvores isoladas e permanecer em edificações seguras ou dentro do barco fechado, conforme as recomendações locais.',
    'Orientar adolescentes que fazem trabalho informal com eletricidade sobre riscos e proteção.',
    'Discutir com as comunidades e com as lideranças as condições da rede elétrica local e a substituição de instalações improvisadas.'
  ],
  fontes: [
    { nome: 'PALS – Pediatric Advanced Life Support, American Heart Association', ano: 2020 },
    { nome: 'Tratado de Pediatria – Sociedade Brasileira de Pediatria', ano: 2022 },
    { nome: 'Nelson Textbook of Pediatrics', ano: 2020 },
    { nome: 'Cartilha para tratamento de emergência das queimaduras – Ministério da Saúde', ano: 2012 }
  ],
  atualizadoEm: '2026-09'
});

// ========================================== 14. FERIMENTO CORTOCONTUSO
PED.data.acidentes.protocolos.push({
  id: 'ferimento_cortocontuso',
  nome: 'Ferimento cortocontuso e laceração',
  categoria: 'acidente',
  amazonia: false,
  cid10: 'T14.1',
  tags: ['feridas', 'dor_local', 'sangramento', 'lesoes_pele', 'febre'],
  definicao: 'Solução de continuidade da pele e dos tecidos subjacentes por objeto cortante, perfurante ou por impacto contuso. A conduta depende do tempo de evolução, do grau de contaminação, da profundidade, da localização e do comprometimento de estruturas nobres, e envolve sempre a avaliação da profilaxia antitetânica.',
  epidemiologia: 'É um dos motivos mais frequentes de atendimento pediátrico de urgência. Os mecanismos mudam com a idade: queda com impacto em quina de móvel, degrau, piso e mesa em lactentes e pré-escolares, com predomínio de lesões em fronte, supercílio, mento e lábio; vidro, faca, tesoura, lâmina, prego, anzol, terçado e facão em escolares e adolescentes, com lesões de mãos e de membros. Em ambiente rural e ribeirinho, somam-se ferimentos por terçado e facão no roçado, por anzol e por instrumentos de limpeza de pescado, além de quedas sobre madeira, prego e arame farpado. A contaminação com terra, matéria orgânica, água de rio e fezes de animais aumenta o risco de tétano e de infecção, e a cobertura vacinal incompleta em comunidades distantes torna o tétano um risco concreto.',
  agente: 'Objeto cortante (vidro, faca, lâmina, tesoura, terçado, facão, lata), perfurante (prego, arame, anzol, espinho, agulha) ou impacto contuso contra superfície dura. Agentes infecciosos relevantes: Staphylococcus aureus, Streptococcus pyogenes, anaeróbios, Clostridium tetani e, em ferimentos com contato com água de rio, Aeromonas.',
  transmissao: 'Não se aplica: agravo por causa externa. A contaminação ocorre no momento do trauma, pela introdução de terra, de matéria orgânica, de fragmentos e de água na ferida, ou depois, pelo contato continuado da ferida aberta com ambiente contaminado.',
  incubacao: 'Não se aplica. A infecção bacteriana da ferida manifesta-se habitualmente entre 24 e 72 horas. O tétano tem incubação de 3 a 21 dias, mais curta em ferimentos muito contaminados e extensos.',
  manifestacoes: [
    'Ferida com bordas regulares nos cortes por objeto afiado e bordas irregulares e contundidas nos ferimentos por impacto.',
    'Sangramento de intensidade variável, habitualmente controlável com compressão direta; couro cabeludo e face sangram muito.',
    'Dor local, edema e equimose ao redor.',
    'Presença de corpo estranho: fragmento de vidro, lasca de madeira, areia, terra, pelos e fragmento de metal, nem sempre visível.',
    'Comprometimento de estruturas profundas: tendão (perda de movimento de um dedo), nervo (alteração de sensibilidade), vaso (sangramento pulsátil), ducto parotídeo, canalículo lacrimal e cartilagem.',
    'Ferimento de face: risco estético, exigindo técnica cuidadosa e alinhamento preciso de bordas, sobretudo no vermelhão do lábio e na sobrancelha.',
    'Ferimento puntiforme profundo, de aspecto inocente, com alto risco de infecção e de retenção de corpo estranho, típico do prego e do anzol.',
    'Infecção da ferida: dor crescente, eritema em expansão, edema, calor, secreção purulenta, odor, linfangite, adenomegalia regional e febre.',
    'Tétano: trismo, rigidez de nuca, disfagia, riso sardônico, espasmos e opistótono, em criança com ferimento contaminado e vacinação incompleta.'
  ],
  sinaisAlarme: [
    'Sangramento pulsátil, abundante ou que não cede com compressão direta.',
    'Perda de movimento, de força ou de sensibilidade distal à ferida.',
    'Ferimento profundo em mão, pé, articulação, face, pescoço, tórax ou abdome.',
    'Exposição de tendão, de osso, de cartilagem ou de tecido adiposo profundo.',
    'Suspeita de corpo estranho retido, sobretudo vidro e lasca de madeira.',
    'Ferimento muito contaminado com terra, fezes, saliva, água de rio ou material orgânico.',
    'Ferimento com mais de 6 a 12 horas de evolução, ou com mais de 24 horas na face.',
    'Sinais de infecção estabelecida ou febre.',
    'Situação vacinal antitetânica incompleta ou desconhecida.',
    'História incompatível com a lesão ou lesões múltiplas e de idades diferentes (avaliar violência).'
  ],
  diagnosticoDiferencial: ['mordedura_cao', 'queda', 'acidente_arraia', 'ferimento por peixe e por instrumento de pesca', 'abscesso de partes moles', 'celulite e erisipela', 'lesão autoprovocada ou infligida'],
  exames: ['exploração cuidadosa da ferida sob analgesia e boa iluminação, com pesquisa de corpo estranho e de lesão de estruturas profundas', 'radiografia do local em suspeita de corpo estranho radiopaco (vidro, metal) ou de fratura', 'ultrassonografia de partes moles em suspeita de corpo estranho radiotransparente, como madeira', 'hemograma', 'pcr', 'cultura de secreção quando houver infecção', 'hemocultura em criança com febre e toxemia'],
  criteriosDiagnosticos: [
    'Caracterizar o mecanismo, o objeto, o ambiente, o tempo decorrido e a limpeza realizada até então.',
    'Avaliar sempre, antes de qualquer sutura, a função motora, a sensibilidade e a perfusão distais à ferida.',
    'Explorar a ferida sob analgesia adequada e boa iluminação, com hemostasia, para pesquisar corpo estranho e avaliar a profundidade.',
    'Considerar radiografia em todo ferimento por vidro, porque a maioria dos fragmentos de vidro é radiopaca e passa despercebida ao exame.',
    'Definir o grau de contaminação e o tempo de evolução, que orientam a decisão de fechar ou não a ferida.',
    'Definir a profilaxia antitetânica pela situação vacinal e pelo tipo de ferimento, conforme a tabela do Ministério da Saúde.',
    'Considerar avaliação especializada em lesões de face com comprometimento de vermelhão do lábio, de pálpebra, de canalículo lacrimal, de orelha e de nariz, e em lesões de mão com suspeita de lesão de tendão ou de nervo.',
    'Avaliar sinais de violência quando a história for inconsistente ou quando houver lesões em áreas protegidas.'
  ],
  classificacaoGravidade: [
    { nivel: 'Leve', criterios: 'Ferida superficial, limpa, recente, sem comprometimento de estruturas profundas e sem corpo estranho. Considerar limpeza, fechamento quando indicado, profilaxia antitetânica e orientação.' },
    { nivel: 'Moderada', criterios: 'Ferida profunda, extensa, contaminada, com mais de 6 a 12 horas de evolução, com corpo estranho ou em localização de risco funcional ou estético. Considerar exploração, desbridamento, antibiótico e avaliação especializada.' },
    { nivel: 'Grave', criterios: 'Sangramento importante, lesão vascular, nervosa ou tendínea, exposição óssea, infecção com repercussão sistêmica ou suspeita de tétano. Considerar internação, avaliação cirúrgica e antibiótico parenteral.' }
  ],
  tratamento: [
    'Controle do sangramento por compressão direta e firme; elevar o segmento; evitar torniquete, reservado a sangramento exsanguinante não controlável, conforme protocolo.',
    'Analgesia antes de limpar e explorar: a limpeza adequada só é possível com a criança sem dor. Considerar anestésico local ou bloqueio conforme protocolo, e sedação para procedimento em criança pequena quando indicado.',
    'Limpeza e irrigação abundante com soro fisiológico ou com água limpa corrente, sob pressão moderada, que é a medida mais eficaz para reduzir a infecção; o volume importa mais do que a solução utilizada.',
    'Não usar substâncias que lesam o tecido dentro da ferida, como álcool, água oxigenada em ferida aberta, iodo concentrado, pó de café, fumo, terra, folhas e remédios caseiros.',
    'Desbridamento econômico do tecido desvitalizado, com preservação máxima de tecido na face.',
    'Remoção de corpos estranhos identificados; quando houver suspeita de fragmento retido não localizado, considerar imagem e avaliação cirúrgica.',
    'Período de ouro para o fechamento primário: habitualmente até 6 horas em áreas de maior risco, podendo estender-se a 12 horas em áreas bem vascularizadas e limpas, e até cerca de 24 horas na face, em razão da excelente vascularização e do interesse estético, sempre após irrigação abundante e conforme protocolo do serviço.',
    'Não fechar de forma primária ferimentos muito contaminados, ferimentos por punctura profunda, ferimentos com esmagamento, com mais de 12 horas fora da face, com corpo estranho não removido ou com sinais de infecção: preferir cicatrização por segunda intenção ou fechamento primário tardio em 3 a 5 dias.',
    'Escolher a técnica conforme a localização: fio de menor calibre e retirada precoce na face, cola cirúrgica ou fita adesiva em lacerações pequenas, lineares e sem tensão, e grampos em couro cabeludo, conforme disponibilidade e protocolo.',
    'Alinhar com precisão os pontos de referência anatômicos, especialmente a borda do vermelhão do lábio e a linha da sobrancelha, que nunca deve ser raspada.',
    'Curativo, elevação do segmento e orientação sobre a manutenção seca nas primeiras 24 a 48 horas.',
    'Profilaxia antitetânica conforme a situação vacinal e a característica do ferimento.',
    'Antibiótico não é indicado de rotina em feridas limpas e bem manejadas; considerar em ferimentos muito contaminados, punctura profunda em pé, exposição óssea ou articular, mordedura, ferimento de mão, criança imunossuprimida ou infecção já estabelecida.',
    'Retirada dos pontos conforme a região: em geral 4 a 6 dias na face, 7 a 10 dias em tronco e membros, e 10 a 14 dias em áreas de dobra e em superfícies de extensão, conforme protocolo.',
    'Orientar proteção solar da cicatriz por 6 a 12 meses e acompanhar cicatrizes hipertróficas e queloides.'
  ],
  medicamentos: [
    { medId: 'soro_fisiologico', esquema: 'Irrigação abundante da ferida sob pressão moderada e curativos.' },
    { medId: null, nome: 'Anestésico local sem vasoconstritor (lidocaína)', esquema: 'Infiltração ou bloqueio para limpeza, exploração e sutura, conforme protocolo do serviço e bula, com atenção à dose máxima por peso. Confirmar conforme protocolo/bula.', verificar: true },
    { medId: 'dipirona', esquema: 'Analgesia: 10 a 15 mg/kg/dose VO ou IV a cada 6 h, conforme bula.' },
    { medId: 'paracetamol', esquema: 'Analgesia: 10 a 15 mg/kg/dose VO a cada 6 h, conforme bula.' },
    { medId: 'ibuprofeno', esquema: 'Dor e inflamação, em criança hidratada e sem sangramento ativo: 5 a 10 mg/kg/dose VO a cada 6 a 8 h, conforme bula.' },
    { medId: 'midazolam', esquema: 'Sedação para procedimento em criança pequena, com monitorização, conforme protocolo do serviço. Confirmar conforme protocolo/bula.', verificar: true },
    { medId: 'cefalexina', esquema: 'Profilaxia ou tratamento de infecção de ferida por flora cutânea: 50 mg/kg/dia VO dividida 6/6 h ou 8/8 h, por 5 a 7 dias, conforme protocolo do serviço.' },
    { medId: 'amoxicilina_clavulanato', esquema: 'Ferimento muito contaminado, punctura profunda, mordedura ou exposição a material orgânico: 45 a 50 mg/kg/dia do componente amoxicilina VO dividida 12/12 h, conforme protocolo do serviço.' },
    { medId: 'sulfametoxazol_trimetoprim', esquema: 'Cobertura adicional para Aeromonas em ferimento com contato com água de rio, associada a antibiótico com cobertura para flora cutânea: 40 mg/kg/dia de sulfametoxazol e 8 mg/kg/dia de trimetoprima VO dividida 12/12 h. Contraindicado em menores de 2 meses.' },
    { medId: 'ceftriaxona', esquema: 'Infecção grave com internação: 50 a 100 mg/kg/dia IV, conforme protocolo do serviço.' },
    { medId: null, nome: 'Vacina antitetânica (DTP, DT, dT ou dTpa conforme a idade) e imunoglobulina antitetânica', esquema: 'Profilaxia conforme a situação vacinal e a característica do ferimento, segundo as orientações do Ministério da Saúde.' }
  ],
  criteriosInternacao: [
    'Sangramento importante ou lesão vascular.',
    'Lesão de tendão, de nervo ou de estrutura profunda com necessidade de reparo cirúrgico.',
    'Ferimento extenso, com perda tecidual ou com necessidade de anestesia geral para o reparo.',
    'Ferimento com exposição óssea ou articular.',
    'Infecção estabelecida com celulite extensa, abscesso, linfangite ou febre.',
    'Necessidade de antibiótico intravenoso.',
    'Suspeita de tétano.',
    'Criança imunossuprimida ou com comorbidade relevante.',
    'Impossibilidade de curativo e de reavaliação em casa ou domicílio distante.'
  ],
  criteriosUTI: [
    'Choque hemorrágico por lesão vascular.',
    'Sepse ou fasciíte necrosante.',
    'Tétano com espasmos, comprometimento respiratório ou instabilidade autonômica.',
    'Ferimento cervical ou torácico com comprometimento de via aérea ou de órgãos internos.',
    'Pós-operatório complicado.'
  ],
  criteriosAlta: [
    'Sangramento controlado e ferida adequadamente limpa e tratada.',
    'Função motora, sensibilidade e perfusão preservadas no segmento acometido.',
    'Profilaxia antitetânica avaliada e registrada.',
    'Antibiótico prescrito e compreendido quando indicado.',
    'Plano de curativo e data de retirada dos pontos definidos e anotados.',
    'Responsável orientado sobre sinais de infecção e sobre cuidados com a cicatriz.',
    'Encaminhamento especializado garantido quando necessário.',
    'Retorno agendado em 24 a 48 horas nos ferimentos de maior risco.'
  ],
  orientacoes: [
    'Para estancar o sangramento, faça compressão firme e contínua com pano limpo por 10 a 15 minutos, sem ficar espiando a cada instante, e eleve o braço ou a perna.',
    'Lave a ferida com água limpa corrente e sabão; não coloque pó de café, fumo, terra, folha, teia de aranha, urina, querosene nem qualquer remédio caseiro.',
    'Não use álcool nem água oxigenada dentro da ferida aberta.',
    'Procure o serviço de saúde se a ferida for funda, grande, se as bordas se afastarem, se for em rosto, mão, pé ou perto de articulação, se houver vidro, prego ou madeira envolvidos, ou se o sangramento não parar.',
    'Ferida no rosto deve ser avaliada logo, porque a costura precoce e bem feita melhora muito o resultado da cicatriz.',
    'Leve o cartão de vacina para a equipe avaliar a vacina contra o tétano.',
    'Mantenha o curativo limpo e seco nas primeiras 24 a 48 horas e troque conforme a orientação recebida.',
    'Volte imediatamente se aparecer febre, dor que aumenta, vermelhidão que se espalha, inchaço, pus, cheiro ruim, listras vermelhas subindo pelo membro ou íngua dolorida.',
    'Volte também se a criança não conseguir mexer um dedo, se a região ficar dormente ou se a ferida abrir.',
    'Compareça na data marcada para tirar os pontos e, depois que a ferida fechar, proteja a cicatriz do sol por 6 meses a 1 ano com roupa, chapéu ou sombra.'
  ],
  retorno: 'Reavaliação em 24 a 48 horas nos ferimentos de maior risco, em ferimentos suturados de mão e pé e em ferimentos contaminados; retirada dos pontos conforme a região, em geral entre 4 e 6 dias na face, 7 e 10 dias em tronco e membros e 10 e 14 dias em áreas de dobra. Retorno imediato diante de febre, dor crescente, vermelhidão em expansão, pus, abertura da ferida, perda de movimento ou alteração de sensibilidade. Acompanhamento da cicatriz em ferimentos de face e em crianças com tendência a queloide.',
  prevencao: [
    'Proteger quinas de móveis, mesas de vidro e bordas cortantes em casas com crianças pequenas.',
    'Guardar facas, tesouras, lâminas, terçado, facão, anzol e ferramentas em local alto, fechado e fora do alcance.',
    'Recolher cacos de vidro, latas e arame do quintal e da área de brincadeira, e não deixar garrafas quebradas no terreno.',
    'Manter as crianças afastadas durante o uso de terçado, facão, foice, machado, roçadeira e ferramentas de corte.',
    'Usar calçado fechado para brincar no quintal, na roça e na beira do rio, onde há prego, arame, lasca de madeira e vidro.',
    'Não permitir que crianças manipulem anzóis, linhas e material de pesca sem supervisão.',
    'Orientar adolescentes sobre o uso seguro de ferramentas no trabalho familiar.',
    'Manter o calendário vacinal antitetânico em dia em toda a família, medida essencial em comunidades distantes.',
    'Garantir boa iluminação nas áreas de circulação da casa e do quintal, e corrimão em escadas de madeira.'
  ],
  fontes: [
    { nome: 'Guia de Vigilância em Saúde, capítulo de tétano acidental – Ministério da Saúde', ano: 2024 },
    { nome: 'Tratado de Pediatria – Sociedade Brasileira de Pediatria', ano: 2022 },
    { nome: 'Nelson Textbook of Pediatrics', ano: 2020 },
    { nome: 'OMS – Surgical care at the district hospital', ano: 2003 }
  ],
  atualizadoEm: '2026-09'
});

// =========================================== 15. INTOXICAÇÃO POR PLANTA
PED.data.acidentes.protocolos.push({
  id: 'intoxicacao_planta',
  nome: 'Intoxicação por plantas tóxicas',
  categoria: 'acidente',
  amazonia: true,
  cid10: 'T62.2',
  tags: ['vomitos', 'dor_abdominal', 'dor_local', 'alteracao_consciencia', 'convulsao', 'prurido', 'lesoes_pele', 'dispneia', 'sudorese', 'cianose'],
  definicao: 'Quadro clínico decorrente da ingestão, do contato ou da inalação de partes de plantas tóxicas: folhas, caule, látex, flores, frutos, sementes e raízes. Na criança pequena, predomina a ingestão exploratória de plantas ornamentais dentro de casa e no quintal; em contextos rurais e tradicionais, somam-se o preparo inadequado de alimentos de origem vegetal e o uso de chás e de garrafadas caseiras.',
  epidemiologia: 'As plantas estão entre as principais causas de intoxicação exógena em menores de 5 anos no Brasil, geralmente com quadros leves, mas com potencial de gravidade em algumas espécies. As plantas ornamentais mais implicadas são a comigo-ninguém-pode e o tinhorão, presentes em vasos dentro de casa e em jardins. No interior do Amazonas e em comunidades ribeirinhas e indígenas, ganham peso a mandioca brava, quando o processamento é insuficiente ou quando a criança come raiz crua ou bebe o líquido da prensa (manipueira), e o consumo de tucupi não fervido pelo tempo adequado, com risco de intoxicação cianídrica; a saia-branca ou trombeteira, encontrada em quintais e também usada em preparos caseiros e rituais, com quadro anticolinérgico grave; o timbó e outras plantas ictiotóxicas usadas na pesca; e a mamona, cujas sementes atraem as crianças pelo aspecto colorido. O uso de chás, garrafadas e xaropes caseiros em lactentes é prática frequente e causa intoxicações que muitas vezes não são reconhecidas como tal. Intoxicação exógena é agravo de notificação compulsória.',
  agente: 'Plantas com oxalato de cálcio em ráfides (comigo-ninguém-pode, tinhorão, copo-de-leite, taioba brava); plantas com alcaloides tropânicos anticolinérgicos (saia-branca ou trombeteira, do gênero Brugmansia, e estramônio); plantas com toxalbuminas (mamona, com ricina, e pinhão-roxo e pinhão-manso, do gênero Jatropha, com curcina); plantas com glicosídeos cianogênicos (mandioca brava, com linamarina, e sementes de algumas frutas); plantas com glicosídeos cardiotônicos (chapéu-de-napoleão e espirradeira); plantas com látex irritante (coroa-de-cristo, avelós e outras euforbiáceas); plantas urticantes (urtiga e cansanção); e plantas ictiotóxicas usadas na pesca, como o timbó, com rotenona.',
  transmissao: 'Não se aplica: agravo por causa externa. As vias são a ingestão, o contato com pele e mucosas, o contato ocular com o látex e, menos frequentemente, a inalação da fumaça de queima de partes da planta.',
  incubacao: 'Não se aplica. Plantas com oxalato causam sintomas imediatos; as anticolinérgicas, em 30 minutos a 2 horas, com duração prolongada de 12 a 48 horas; as toxalbuminas têm latência de horas, podendo chegar a 1 a 3 dias, com quadro grave depois de um período assintomático; a intoxicação cianídrica por mandioca brava manifesta-se em minutos a poucas horas.',
  manifestacoes: [
    'Comigo-ninguém-pode, tinhorão e congêneres: dor intensa e imediata em boca e lábios, sensação de queimação, edema de lábios, língua e orofaringe, sialorreia, disfagia, afonia e, em casos com edema importante, risco de comprometimento respiratório; o contato ocular com a seiva causa dor intensa, lacrimejamento e lesão de córnea.',
    'Saia-branca ou trombeteira, e outras plantas anticolinérgicas: midríase com visão borrada, pele seca, quente e ruborizada, boca seca, febre, retenção urinária, taquicardia, agitação, alucinação visual, delirium, convulsão e coma, com quadro prolongado por 12 a 48 horas.',
    'Mamona: latência de horas, seguida de náusea, vômitos, dor abdominal em cólica e diarreia por vezes sanguinolenta, desidratação, e em ingestões maiores, com mastigação das sementes, lesão hepática, renal e hemólise.',
    'Pinhão-roxo e pinhão-manso: vômitos intensos, dor abdominal e diarreia profusa, com desidratação, sendo esta a principal causa de gravidade na criança.',
    'Mandioca brava e manipueira ou tucupi mal processados: cefaleia, tontura, náusea, vômitos, taquipneia, taquicardia, confusão, convulsão, coma, acidose metabólica com lactato elevado e cianose que não melhora com oxigênio, compatível com intoxicação cianídrica.',
    'Chapéu-de-napoleão e espirradeira: vômitos, dor abdominal, bradicardia, bloqueios, arritmia, hipercalemia e alteração visual, com quadro semelhante à intoxicação digitálica.',
    'Látex de coroa-de-cristo, avelós e outras euforbiáceas: dermatite irritativa com eritema, vesículas e queimação; no olho, ceratoconjuntivite grave; na boca, edema e dor.',
    'Urtiga e cansanção: dor, prurido, urticária e edema locais.',
    'Timbó e plantas ictiotóxicas: vômitos, dor abdominal, sonolência e, em exposições importantes, depressão respiratória.',
    'Chás, garrafadas e xaropes caseiros em lactentes: sonolência, recusa alimentar, vômitos, hipoglicemia, alteração de consciência e quadros de difícil identificação quando não se pergunta ativamente sobre o uso.'
  ],
  sinaisAlarme: [
    'Edema de língua, de lábios ou de orofaringe com disfagia, sialorreia, voz abafada ou dispneia.',
    'Cianose que não melhora com oxigênio, taquipneia e acidose metabólica com lactato elevado, compatível com intoxicação cianídrica.',
    'Alteração do nível de consciência, alucinação, agitação intensa, delirium ou convulsão.',
    'Midríase fixa, pele seca e quente, febre e retenção urinária (síndrome anticolinérgica).',
    'Bradicardia, arritmia ou alteração do eletrocardiograma.',
    'Vômitos e diarreia intensos com desidratação, sobretudo em lactentes.',
    'Ingestão de sementes de mamona mastigadas.',
    'Contato ocular com látex ou com seiva.',
    'Ingestão de raiz de mandioca crua, de manipueira ou de tucupi não fervido adequadamente.',
    'Uso de chá, garrafada ou xarope caseiro em lactente com quadro neurológico ou hipoglicemia.'
  ],
  diagnosticoDiferencial: ['intoxicacao_medicamentosa', 'intoxicacao_domestica', 'ingestao_caustico', 'gastroenterite aguda', 'meningite', 'encefalite', 'sepse', 'cetoacidose diabética', 'anafilaxia com edema de orofaringe', 'angioedema', 'hipoglicemia de outras causas'],
  exames: ['glicemia', 'gasometria', 'lactato', 'eletrolitos', 'hemograma', 'ureia', 'creatinina', 'ast', 'alt', 'coagulograma', 'urina_1', 'eletrocardiograma em suspeita de planta com glicosídeo cardiotônico', 'identificação da planta por foto, por amostra ou com apoio de pessoa da comunidade'],
  criteriosDiagnosticos: [
    'História de ingestão ou de contato com planta, com pedido explícito de que a família traga a planta, um ramo ou uma fotografia; a identificação pela imagem muda a conduta.',
    'Perguntar ativamente sobre uso de chá, garrafada, xarope caseiro, banho de planta e remédio do mato, porque as famílias frequentemente não os consideram medicamento e não os relatam espontaneamente.',
    'Reconhecer as síndromes: irritação imediata de mucosa oral (oxalato), síndrome anticolinérgica (Brugmansia), gastroenterite grave com latência (toxalbuminas), quadro cianídrico (mandioca brava) e quadro cardiotóxico (glicosídeos).',
    'Em criança cianótica que não melhora com oxigênio, com acidose metabólica e lactato elevado após ingestão de derivado de mandioca, considerar intoxicação cianídrica e tratar como emergência.',
    'Glicemia capilar em toda criança com alteração de consciência, sobretudo após uso de preparos caseiros.',
    'Eletrocardiograma em suspeita de planta com ação cardiotônica e em quadros com bradicardia.',
    'Contato com o Centro de Informação e Assistência Toxicológica pelo Disque Intoxicação 0800 722 6001, que orienta a conduta específica por espécie.',
    'Notificar o caso conforme a ficha de intoxicação exógena.'
  ],
  classificacaoGravidade: [
    { nivel: 'Leve', criterios: 'Contato ou ingestão de pequena quantidade de planta de baixa toxicidade, com sintomas locais leves, como ardência oral ou irritação de pele, sem comprometimento sistêmico. Considerar lavagem, analgesia, observação e orientação.' },
    { nivel: 'Moderada', criterios: 'Edema oral importante, vômitos e diarreia com desidratação, sintomas anticolinérgicos leves a moderados ou ingestão de espécie de toxicidade relevante. Considerar observação hospitalar, hidratação, monitorização e exames.' },
    { nivel: 'Grave', criterios: 'Comprometimento de via aérea, quadro cianídrico, delirium ou convulsão, arritmia, desidratação grave, hepatotoxicidade ou lesão renal. Considerar suporte avançado, antídoto quando existir e terapia intensiva.' }
  ],
  tratamento: [
    'ABCDE, monitorização e glicemia capilar; identificar a planta sempre que possível.',
    'Nunca provocar vômito e nunca oferecer leite ou água para diluir.',
    'Plantas com oxalato (comigo-ninguém-pode, tinhorão): lavar a boca com água, remover restos vegetais, oferecer líquidos frios ou picolé para alívio conforme a tolerância, e analgesia; observar a via aérea pelo risco de edema importante. Irrigar os olhos por 15 a 20 minutos em caso de contato ocular e encaminhar para avaliação oftalmológica.',
    'Plantas anticolinérgicas (saia-branca, trombeteira): suporte, ambiente calmo, controle da agitação com benzodiazepínico, monitorização cardíaca, controle da temperatura, atenção à retenção urinária e observação prolongada, porque o quadro dura de 12 a 48 horas. O uso de fisostigmina é restrito, não está amplamente disponível no Brasil e deve ser discutido com o CIATox.',
    'Toxalbuminas (mamona, pinhão): hidratação vigorosa e correção de distúrbios hidroeletrolíticos, que são a principal medida; considerar carvão ativado conforme o tempo e a orientação do CIATox; monitorizar função hepática, renal e hemólise.',
    'Intoxicação cianídrica (mandioca brava, manipueira, tucupi mal processado): emergência. Oxigênio a 100 por cento, suporte ventilatório, correção da acidose e antídoto específico quando disponível, preferencialmente hidroxocobalamina; alternativa com tiossulfato de sódio conforme protocolo e orientação do CIATox. Confirmar doses conforme protocolo.',
    'Plantas com glicosídeos cardiotônicos: monitorização cardíaca contínua, correção de potássio conforme protocolo e contato com o CIATox; anticorpo antidigoxina é raramente disponível.',
    'Látex e plantas urticantes: lavar abundantemente com água e sabão, remover pelos e espículas quando houver, aplicar compressa fria, considerar anti-histamínico e corticoide tópico conforme avaliação; irrigação ocular prolongada em contato com o olho.',
    'Carvão ativado apenas quando houver indicação pelo agente e pelo tempo, com via aérea protegida; não usar em edema de orofaringe, em criança sonolenta sem proteção de via aérea ou quando houver previsão de endoscopia.',
    'Hidratação, analgesia, antiemético e correção de eletrólitos conforme necessidade.',
    'Observar por tempo adequado à planta, e não apenas ao sintoma inicial: espécies com toxalbumina e anticolinérgicas exigem observação prolongada.',
    'Orientar a família sobre a retirada ou o isolamento das plantas tóxicas do ambiente da criança e sobre os riscos de chás e de garrafadas em lactentes, com respeito ao saber local e em diálogo com a comunidade.',
    'Notificar o caso e, quando houver preparo alimentar inadequado, articular orientação comunitária sobre o processamento correto da mandioca e do tucupi.'
  ],
  medicamentos: [
    { medId: null, nome: 'Hidroxocobalamina', esquema: 'Antídoto de escolha na intoxicação cianídrica, quando disponível: dose conforme protocolo do serviço e orientação do CIATox, por via intravenosa. Disponibilidade limitada no Brasil. Confirmar conforme protocolo/bula e orientar-se pelo CIATox.', verificar: true },
    { medId: null, nome: 'Tiossulfato de sódio', esquema: 'Alternativa no tratamento da intoxicação cianídrica, conforme protocolo do serviço e orientação do CIATox. Confirmar conforme protocolo/bula e orientar-se pelo CIATox.', verificar: true },
    { medId: null, nome: 'Carvão ativado', esquema: 'Quando indicado pelo agente e pelo tempo de ingestão, com via aérea protegida: 1 g/kg VO ou por sonda (até 50 g). Não usar em edema de orofaringe nem em criança sem proteção de via aérea.' },
    { medId: 'soro_fisiologico', esquema: 'Hidratação e reposição em vômitos e diarreia: 10 a 20 mL/kg em bolus na desidratação grave; irrigação ocular prolongada em contato com látex ou seiva.' },
    { medId: 'ringer_lactato', esquema: 'Alternativa cristaloide para reposição volêmica, conforme protocolo do serviço.' },
    { medId: 'sais_reidratacao_oral', esquema: 'Reidratação oral em desidratação leve a moderada por gastroenterite tóxica, conforme o plano de hidratação.' },
    { medId: 'glicose', esquema: 'Hipoglicemia, sobretudo após uso de preparos caseiros em lactentes: 0,5 a 1 g/kg IV, seguida de infusão de manutenção.' },
    { medId: 'diazepam', esquema: 'Agitação intensa ou convulsão na síndrome anticolinérgica: 0,2 a 0,3 mg/kg IV lento (máximo 10 mg), conforme bula.' },
    { medId: 'midazolam', esquema: 'Agitação ou convulsão: 0,1 a 0,2 mg/kg IV, IM ou IO, conforme bula e protocolo do serviço.' },
    { medId: 'ondansetrona', esquema: 'Vômitos: 0,15 mg/kg/dose IV (máximo 8 mg), conforme bula.' },
    { medId: 'dipirona', esquema: 'Dor oral e mal-estar: 10 a 15 mg/kg/dose VO ou IV a cada 6 h, conforme bula.' },
    { medId: null, nome: 'Anti-histamínico e corticoide tópico', esquema: 'Dermatite irritativa ou urticariforme por látex e por plantas urticantes, conforme protocolo do serviço e bula. Confirmar conforme protocolo/bula.', verificar: true },
    { medId: null, nome: 'Fisostigmina', esquema: 'Uso restrito e discutido caso a caso na síndrome anticolinérgica grave, com disponibilidade limitada no Brasil e risco de bradicardia e de convulsão. Orientar-se pelo CIATox. Confirmar conforme protocolo/bula.', verificar: true }
  ],
  criteriosInternacao: [
    'Edema de orofaringe com disfagia, sialorreia ou risco de via aérea.',
    'Qualquer suspeita de intoxicação cianídrica.',
    'Síndrome anticolinérgica com agitação, alucinação, febre, retenção urinária ou alteração de consciência.',
    'Ingestão de semente de mamona mastigada ou de planta com glicosídeo cardiotônico.',
    'Vômitos e diarreia com desidratação moderada a grave.',
    'Alteração do eletrocardiograma ou arritmia.',
    'Hipoglicemia, convulsão ou rebaixamento.',
    'Ingestão de planta não identificada com sintomas persistentes.',
    'Lactente com uso de chá ou de garrafada e quadro neurológico.',
    'Domicílio distante ou impossibilidade de retorno rápido.'
  ],
  criteriosUTI: [
    'Comprometimento de via aérea por edema de orofaringe.',
    'Intoxicação cianídrica com acidose grave, coma ou instabilidade.',
    'Convulsão refratária, delirium grave ou necessidade de sedação contínua.',
    'Arritmia grave ou bloqueio com instabilidade hemodinâmica.',
    'Insuficiência hepática ou renal aguda.',
    'Choque ou necessidade de ventilação mecânica.'
  ],
  criteriosAlta: [
    'Período de observação adequado à espécie cumprido, com criança assintomática.',
    'Via aérea livre, deglutição preservada e aceitação de líquidos e de dieta.',
    'Hidratação adequada, sem vômitos e com diurese normal.',
    'Exames e eletrocardiograma normais quando indicados.',
    'Planta identificada, quando possível, e família orientada sobre a retirada ou o isolamento.',
    'Orientação registrada sobre o processamento correto da mandioca e sobre os riscos de chás e de garrafadas em crianças pequenas.',
    'Caso notificado e retorno agendado.'
  ],
  orientacoes: [
    'Se a criança colocou planta na boca ou engoliu parte de uma planta, leve-a ao serviço de saúde com um pedaço da planta ou uma foto, para a equipe identificar.',
    'Não faça a criança vomitar e não dê leite nem água para cortar o efeito.',
    'Se foi comigo-ninguém-pode ou planta parecida, lave a boca com água, tire os pedaços da boca e procure atendimento: a boca pode inchar bastante.',
    'Se a seiva ou o leite da planta caiu no olho, lave com água limpa corrente por 15 a 20 minutos e procure atendimento: pode machucar a córnea.',
    'Nunca deixe a criança comer mandioca brava crua, mascar a raiz, beber a água da prensa (manipueira) ou tomar tucupi que não foi bem fervido pelo tempo certo.',
    'Não dê chá, garrafada, xarope caseiro nem remédio do mato para bebê e criança pequena sem conversar com a equipe de saúde: algumas plantas usadas nesses preparos são tóxicas nessa idade.',
    'Cuidado com as sementes de mamona, que são bonitas e coloridas e chamam a atenção das crianças: elas são muito tóxicas quando mastigadas.',
    'Não deixe criança perto de quem prepara timbó ou outro veneno de pesca, e não guarde esse material dentro de casa.',
    'Retire ou isole os vasos de plantas tóxicas do alcance das crianças e ensine que não se coloca planta, folha, flor nem semente na boca.',
    'Ligue para o Disque Intoxicação 0800 722 6001, que funciona 24 horas em todo o país e orienta sobre a planta.'
  ],
  retorno: 'Retorno em 24 a 48 horas após a alta e imediatamente se surgirem vômitos, diarreia, dor abdominal, sonolência, agitação, confusão, dificuldade para engolir ou para respirar. Em ingestão de sementes de mamona e de plantas com toxalbumina, atenção ao quadro que pode surgir após período assintomático, com seguimento laboratorial conforme protocolo. Em exposição cianídrica, avaliação neurológica de seguimento. Articular com a equipe de saúde da família a visita domiciliar para identificar e isolar as plantas do quintal e para orientar a comunidade sobre o processamento seguro da mandioca.',
  prevencao: [
    'Conhecer e identificar as plantas tóxicas presentes em casa, no quintal, na creche e na escola.',
    'Retirar ou isolar comigo-ninguém-pode, tinhorão, coroa-de-cristo, avelós, mamona, pinhão e espirradeira do alcance das crianças.',
    'Ensinar as crianças a não colocar folhas, flores, sementes e frutos silvestres na boca.',
    'Supervisionar a brincadeira no quintal, sobretudo em crianças de 1 a 4 anos.',
    'Processar a mandioca brava conforme as práticas tradicionais corretas e completas, com descascamento, ralação, prensagem e cocção adequados, e ferver o tucupi pelo tempo recomendado.',
    'Não oferecer mandioca crua, manipueira nem tucupi mal fervido a crianças.',
    'Não usar chás, garrafadas e xaropes caseiros em lactentes sem orientação da equipe de saúde, com abordagem respeitosa do saber tradicional e diálogo com as famílias.',
    'Guardar longe das crianças o timbó e outros materiais usados na pesca.',
    'Usar luvas ao podar plantas com látex e lavar as mãos após o manuseio.',
    'Divulgar o Disque Intoxicação 0800 722 6001 e orientar as escolas e creches sobre as plantas de risco.'
  ],
  fontes: [
    { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
    { nome: 'Plantas tóxicas: conhecer para prevenir – Centros de Informação e Assistência Toxicológica (CIATox) e Fiocruz/Sinitox', ano: 2022 },
    { nome: 'OMS – Cyanide in cassava, food safety and konzo', ano: 2004 },
    { nome: 'Tratado de Pediatria – Sociedade Brasileira de Pediatria', ano: 2022 },
    { nome: 'Nelson Textbook of Pediatrics', ano: 2020 }
  ],
  atualizadoEm: '2026-09'
});

// ======================================= 16. INTOXICAÇÃO POR FUMAÇA
PED.data.acidentes.protocolos.push({
  id: 'intoxicacao_fumaca',
  nome: 'Inalação de fumaça, monóxido de carbono e cianeto',
  categoria: 'acidente',
  amazonia: false,
  cid10: 'T58 e T59',
  tags: ['dispneia', 'tosse', 'cianose', 'alteracao_consciencia', 'convulsao', 'vomitos', 'estridor', 'palidez', 'febre'],
  definicao: 'Conjunto de lesões causadas pela inalação dos produtos da combustão: lesão térmica da via aérea superior, lesão química das vias aéreas inferiores pelas partículas e gases irritantes, e intoxicação sistêmica por asfixiantes químicos, principalmente o monóxido de carbono e o cianeto. É a principal causa de morte nos incêndios, muitas vezes antes de qualquer queimadura de pele.',
  epidemiologia: 'Ocorre em incêndios domiciliares, situação de alto risco em casas de madeira, palafitas e comunidades com construções contíguas, onde o fogo se propaga com rapidez e a saída é difícil. As causas mais frequentes de incêndio nesses contextos são vela, lamparina a querosene, curto-circuito em instalação improvisada, uso de álcool líquido para acender fogo e fogão a lenha. A intoxicação por monóxido de carbono também ocorre sem incêndio, pelo uso de gerador, motor ou churrasqueira em ambiente fechado ou mal ventilado, pelo aquecimento com brasa dentro de casa e pela queima de carvão em ambiente sem ventilação. A queima de lixo e de material plástico e a fumaça de queimadas acrescentam gases irritantes. As crianças são mais vulneráveis pela maior frequência respiratória, pela via aérea mais estreita, pela menor capacidade de escapar sozinhas e pela tendência a se esconderem embaixo da cama e dentro de armários durante o incêndio.',
  agente: 'Monóxido de carbono, gás incolor, inodoro e sem sabor, que se liga à hemoglobina com afinidade muito maior que a do oxigênio, formando carboxihemoglobina, desloca a curva de dissociação para a esquerda e bloqueia a respiração celular; cianeto, liberado pela combustão de lã, seda, poliuretano, plásticos, espuma de colchão e materiais sintéticos, que bloqueia a cadeia respiratória mitocondrial; calor, que lesa a via aérea superior; e partículas e gases irritantes (aldeídos, amônia, cloro, óxidos de nitrogênio e enxofre), que lesam a via aérea inferior.',
  transmissao: 'Não se aplica: agravo por causa externa, por inalação em ambiente fechado ou mal ventilado.',
  incubacao: 'Não se aplica. A intoxicação por monóxido de carbono e por cianeto é imediata. A lesão química das vias aéreas inferiores costuma manifestar-se de forma progressiva nas primeiras 24 a 48 horas, com piora da troca gasosa e broncoespasmo. Sequelas neurológicas tardias por monóxido de carbono podem surgir dias a semanas após a exposição, mesmo em quem aparentou recuperação completa.',
  manifestacoes: [
    'Sinais de exposição: fuligem em face, em narinas, na boca e no escarro, queimadura de cílios, de sobrancelhas e de vibrissas nasais, e cheiro de fumaça nas roupas e nos cabelos.',
    'Lesão térmica de via aérea superior: rouquidão, disfonia, estridor, tosse, dor de garganta, edema de língua e de orofaringe, com risco de obstrução rapidamente progressiva.',
    'Lesão química de vias aéreas inferiores: tosse persistente, sibilância, taquipneia, hipoxemia progressiva e insuficiência respiratória, que pode instalar-se horas depois.',
    'Intoxicação leve por monóxido de carbono: cefaleia, náusea, vômitos, tontura, fadiga e irritabilidade, sintomas frequentemente atribuídos a virose.',
    'Intoxicação moderada e grave por monóxido de carbono: confusão, ataxia, alteração visual, síncope, convulsão, coma, arritmia, isquemia miocárdica e acidose.',
    'A coloração vermelho-cereja da pele é sinal tardio e pouco frequente, e sua ausência não afasta a intoxicação.',
    'Intoxicação por cianeto: rebaixamento rápido do nível de consciência, convulsão, taquipneia inicial seguida de bradipneia, colapso cardiovascular, acidose metabólica com lactato muito elevado e cianose que não responde ao oxigênio.',
    'Lactato sérico elevado em vítima de incêndio é forte indicador de intoxicação por cianeto associada.',
    'Queimaduras cutâneas associadas, em extensão variável.',
    'Mais de uma pessoa da mesma casa com cefaleia, náusea e tontura simultâneas, com melhora ao sair do ambiente: padrão característico de intoxicação por monóxido de carbono.',
    'Sequelas neurológicas tardias: alteração de memória, de atenção, do comportamento, da marcha e do rendimento escolar, semanas após a exposição.'
  ],
  sinaisAlarme: [
    'Incêndio em ambiente fechado, com tempo prolongado de exposição ou vítima encontrada inconsciente no local.',
    'Fuligem em narinas, boca ou escarro, rouquidão, estridor ou queimadura de face e de pescoço.',
    'Alteração do nível de consciência, convulsão ou síncope.',
    'Hipoxemia, taquipneia, sibilância ou esforço respiratório.',
    'Acidose metabólica com lactato elevado.',
    'Instabilidade hemodinâmica, arritmia ou dor torácica.',
    'Saturação de pulso normal em criança sintomática e exposta a fumaça: a oximetria de pulso convencional não distingue a carboxihemoglobina da oxihemoglobina e pode mostrar valores falsamente normais.',
    'Gestante adolescente exposta, pela maior afinidade da hemoglobina fetal pelo monóxido de carbono.',
    'Mais de um morador com sintomas simultâneos.',
    'Persistência de cefaleia e de alteração de comportamento após a exposição.'
  ],
  diagnosticoDiferencial: ['queimadura', 'corpo_estranho_via_aerea', 'intoxicacao_domestica', 'asma e bronquiolite', 'pneumonia', 'meningite', 'intoxicacao_medicamentosa', 'cetoacidose diabética', 'traumatismo_cranioencefalico'],
  exames: ['gasometria arterial com dosagem de carboxihemoglobina por cooximetria, quando disponível', 'lactato', 'eletrolitos', 'glicemia', 'hemograma', 'ureia', 'creatinina', 'cpk', 'radiografia_torax', 'eletrocardiograma', 'oximetria de pulso, com a ressalva de que pode ser falsamente normal', 'laringoscopia ou broncoscopia para avaliação de via aérea, conforme indicação e disponibilidade', 'tomografia de crânio em alteração neurológica persistente'],
  criteriosDiagnosticos: [
    'História de exposição a incêndio, a fumaça ou a fonte de combustão em ambiente fechado, com atenção ao tempo de exposição e ao estado de consciência no local.',
    'Suspeitar de intoxicação por monóxido de carbono em qualquer criança com cefaleia, náusea, tontura e confusão após exposição a gerador, motor, churrasqueira, brasa, carvão, fogão ou lamparina em ambiente mal ventilado, sobretudo quando outros moradores têm os mesmos sintomas.',
    'A oximetria de pulso convencional não serve para excluir a intoxicação por monóxido de carbono: o aparelho lê a carboxihemoglobina como se fosse oxihemoglobina e pode mostrar saturação normal em criança gravemente intoxicada. A decisão deve basear-se na história e no quadro clínico, e não na saturação.',
    'Dosar carboxihemoglobina por cooximetria em gasometria, quando disponível; níveis acima de cerca de 3 a 5 por cento em não fumantes confirmam exposição, mas o valor isolado não se correlaciona bem com a gravidade, sobretudo se já houve oxigênio no transporte.',
    'Considerar intoxicação por cianeto em vítima de incêndio com rebaixamento, colapso ou acidose metabólica com lactato muito elevado, situação em que se considera o tratamento empírico, sem aguardar exame confirmatório.',
    'Avaliar sistematicamente a via aérea superior e repetir a avaliação: o edema é progressivo e a janela para a intubação segura pode fechar-se em pouco tempo.',
    'Avaliar a extensão das queimaduras cutâneas e conduzir conforme o protocolo de queimadura.',
    'Notificar a intoxicação exógena e acionar os Bombeiros pelo 193 e a vigilância quando houver risco persistente no domicílio ou na comunidade.'
  ],
  classificacaoGravidade: [
    { nivel: 'Leve', criterios: 'Exposição breve, criança alerta, com cefaleia leve, náusea ou tosse, sem alteração de consciência, sem sinais de via aérea e com exame respiratório normal. Considerar oxigênio, observação e reavaliação.' },
    { nivel: 'Moderada', criterios: 'Sintomas neurológicos ou respiratórios persistentes, vômitos, tosse importante, sibilância, hipoxemia ou carboxihemoglobina elevada. Considerar internação, oxigênio a alto fluxo e monitorização.' },
    { nivel: 'Grave', criterios: 'Alteração de consciência, convulsão, síncope, instabilidade hemodinâmica, acidose metabólica com lactato muito elevado, sinais de edema de via aérea ou insuficiência respiratória. Considerar via aérea avançada, antídoto para cianeto, terapia intensiva e avaliação de oxigenoterapia hiperbárica.' }
  ],
  tratamento: [
    'Retirar imediatamente a criança do ambiente contaminado, com segurança para o socorrista, e acionar os Bombeiros pelo 193 e o SAMU pelo 192.',
    'Oxigênio a 100 por cento com máscara com reservatório para toda criança exposta a fumaça ou com suspeita de intoxicação por monóxido de carbono, independentemente da saturação medida pelo oxímetro de pulso, mantido até a reavaliação, porque o oxigênio acelera de forma decisiva a eliminação do monóxido.',
    'Via aérea: considerar intubação precoce diante de rouquidão, estridor, queimadura de face e de pescoço, edema de orofaringe, fuligem abundante ou rebaixamento, antes que o edema impeça o procedimento; usar tubo de calibre adequado e profissional experiente.',
    'Suspeita de intoxicação por cianeto em vítima de incêndio com coma, colapso ou acidose com lactato muito elevado: considerar hidroxocobalamina por via intravenosa, que é o antídoto de escolha e pode ser usado empiricamente. Evitar nitritos em vítimas de incêndio, porque a metemoglobinemia induzida agrava a hipóxia quando há carboxihemoglobina associada. Confirmar doses conforme protocolo e orientar-se pelo CIATox.',
    'Suporte ventilatório conforme a necessidade, com atenção à lesão química das vias aéreas inferiores, que costuma piorar nas primeiras 24 a 48 horas.',
    'Broncodilatador em broncoespasmo; aspiração de secreções e higiene brônquica conforme protocolo.',
    'Não usar corticoide de rotina na lesão inalatória e não usar antibiótico profilático; tratar infecção apenas quando houver evidência clínica e laboratorial.',
    'Tratar convulsão com benzodiazepínico e corrigir hipoglicemia e distúrbios metabólicos.',
    'Monitorização cardíaca e eletrocardiograma, pelo risco de isquemia miocárdica em intoxicações importantes.',
    'Considerar oxigenoterapia hiperbárica em situações selecionadas, como coma, perda de consciência, sinais neurológicos persistentes, acidose importante, isquemia miocárdica ou carboxihemoglobina muito elevada, conforme disponibilidade e discussão com o CIATox e com o serviço de referência; a indisponibilidade na região não deve atrasar o oxigênio a 100 por cento nem o suporte.',
    'Conduzir as queimaduras cutâneas conforme o protocolo específico, lembrando que a reposição volêmica segue a fórmula e a resposta clínica.',
    'Avaliar todos os moradores expostos, inclusive os assintomáticos, e não devolver a família ao ambiente antes de eliminar a fonte.',
    'Orientar seguimento neurológico, pelo risco de sequelas tardias, e notificar o caso.'
  ],
  medicamentos: [
    { medId: null, nome: 'Oxigênio a 100 por cento', esquema: 'Medida terapêutica central: máscara com reservatório a alto fluxo, mantida até reavaliação clínica e, quando disponível, até a normalização da carboxihemoglobina; o oxigênio reduz de forma marcante a meia-vida do monóxido de carbono.' },
    { medId: null, nome: 'Hidroxocobalamina', esquema: 'Antídoto de escolha na suspeita de intoxicação por cianeto em vítima de incêndio, podendo ser usado empiricamente: dose por via intravenosa conforme protocolo do serviço e orientação do CIATox. Disponibilidade limitada no Brasil. Confirmar conforme protocolo/bula e orientar-se pelo CIATox.', verificar: true },
    { medId: null, nome: 'Tiossulfato de sódio', esquema: 'Alternativa ou adjuvante no tratamento da intoxicação por cianeto, conforme protocolo do serviço e orientação do CIATox. Confirmar conforme protocolo/bula.', verificar: true },
    { medId: 'salbutamol', esquema: 'Broncoespasmo por irritação das vias aéreas: 2 a 4 jatos de 100 mcg com espaçador a cada 20 minutos na primeira hora e depois conforme a resposta.' },
    { medId: 'ipratropio', esquema: 'Associado ao broncodilatador de curta ação em broncoespasmo importante, conforme protocolo do serviço.' },
    { medId: 'adrenalina', esquema: 'Parada cardiorrespiratória, conforme protocolo de PALS; considerada também por via inalatória em edema de via aérea superior, conforme protocolo do serviço.' },
    { medId: 'midazolam', esquema: 'Convulsão: 0,1 a 0,2 mg/kg IV, IM ou IO, conforme bula e protocolo do serviço.' },
    { medId: 'diazepam', esquema: 'Convulsão: 0,2 a 0,3 mg/kg IV lento (máximo 10 mg), conforme bula.' },
    { medId: 'glicose', esquema: 'Hipoglicemia: 0,5 a 1 g/kg IV, seguida de infusão de manutenção.' },
    { medId: 'soro_fisiologico', esquema: 'Hidratação e expansão em instabilidade: 10 a 20 mL/kg em bolus, reavaliando após cada alíquota.' },
    { medId: 'ringer_lactato', esquema: 'Reposição volêmica quando houver queimadura associada, conforme a fórmula de Parkland e a resposta clínica.' },
    { medId: 'dipirona', esquema: 'Cefaleia e dor: 10 a 15 mg/kg/dose VO ou IV a cada 6 h, conforme bula.' }
  ],
  criteriosInternacao: [
    'Qualquer alteração do nível de consciência, síncope ou convulsão durante ou após a exposição.',
    'Sintomas respiratórios: tosse persistente, sibilância, taquipneia ou hipoxemia.',
    'Fuligem em narinas, boca ou escarro, rouquidão, estridor ou queimadura de face e de pescoço.',
    'Carboxihemoglobina elevada ou acidose metabólica com lactato elevado.',
    'Exposição prolongada ou em ambiente fechado, mesmo com poucos sintomas.',
    'Queimaduras cutâneas associadas com critério de internação.',
    'Alteração no eletrocardiograma ou dor torácica.',
    'Adolescente grávida exposta.',
    'Impossibilidade de retorno a um ambiente seguro ou domicílio distante.'
  ],
  criteriosUTI: [
    'Necessidade de intubação ou de ventilação mecânica por lesão inalatória ou por rebaixamento.',
    'Coma, convulsão refratária ou sinais neurológicos graves.',
    'Instabilidade hemodinâmica, arritmia ou isquemia miocárdica.',
    'Acidose metabólica grave ou suspeita de intoxicação por cianeto com necessidade de antídoto e suporte.',
    'Insuficiência respiratória progressiva nas primeiras 48 horas.',
    'Queimadura extensa associada.'
  ],
  criteriosAlta: [
    'Criança assintomática após período adequado de oxigenoterapia e observação.',
    'Exame neurológico normal e ausência de cefaleia, tontura e alteração de comportamento.',
    'Respiração normal, ausculta limpa e saturação adequada em ar ambiente.',
    'Carboxihemoglobina normalizada, quando disponível, e lactato normal.',
    'Ambiente domiciliar seguro, com a fonte de exposição eliminada e orientação registrada.',
    'Responsável orientado a retornar diante de cefaleia, tosse, cansaço, sonolência ou mudança de comportamento nos dias seguintes.',
    'Seguimento neurológico agendado quando houver exposição significativa.',
    'Caso notificado.'
  ],
  orientacoes: [
    'Tire a criança do ambiente com fumaça imediatamente e leve-a para o ar livre; chame os Bombeiros pelo 193 e o SAMU pelo 192.',
    'Não volte para dentro da casa em chamas para buscar objetos, e ensine as crianças a sair e não se esconder embaixo da cama nem dentro do armário.',
    'Em um incêndio, saia agachado, perto do chão, onde há menos fumaça, e cubra o nariz e a boca com um pano, de preferência úmido.',
    'Mesmo que a criança pareça bem, leve-a ao serviço de saúde: o gás da fumaça pode intoxicar sem dar sinal, e o pulmão pode piorar nas horas seguintes.',
    'O aparelho que mede a oxigenação no dedo pode dar resultado normal mesmo com intoxicação grave pela fumaça: por isso a avaliação médica é necessária.',
    'Volte ao serviço de saúde se, nos dias seguintes, aparecerem dor de cabeça, tontura, cansaço, falta de ar, tosse, sonolência, confusão, esquecimento ou mudança de comportamento.',
    'Nunca use gerador, motor, churrasqueira, carvão ou brasa dentro de casa, na varanda fechada, no quarto ou dentro do barco fechado: o gás não tem cheiro e mata dormindo.',
    'Se mais de uma pessoa da casa tiver dor de cabeça, enjoo e tontura ao mesmo tempo e melhorar ao sair, saia de casa com todos e procure ajuda: pode ser gás de monóxido de carbono.',
    'Não use álcool líquido para acender fogo e mantenha vela, lamparina, fósforo e isqueiro fora do alcance das crianças.',
    'Combine com a família uma rota de saída em caso de incêndio e um ponto de encontro do lado de fora, e ensine as crianças a avisar um adulto imediatamente.'
  ],
  retorno: 'Reavaliação em 24 a 48 horas após a alta, e imediatamente diante de tosse, falta de ar, febre, cansaço, dor de cabeça, sonolência ou confusão. Em exposição significativa ao monóxido de carbono, seguimento neurológico por pelo menos 4 a 6 semanas, pelo risco de sequelas tardias com alteração de memória, de atenção, de comportamento, do sono e do rendimento escolar, com avaliação do neurodesenvolvimento quando indicada. Em lesão inalatória, seguimento pneumológico conforme a evolução e reavaliação da função pulmonar quando houver sintomas persistentes.',
  prevencao: [
    'Nunca usar gerador, motor a combustão, churrasqueira, carvão ou brasa em ambiente fechado ou pouco ventilado, incluindo varandas fechadas e barcos.',
    'Manter boa ventilação onde há fogão a lenha e evitar dormir em cômodo com brasa acesa.',
    'Instalar detector de fumaça e, quando possível, detector de monóxido de carbono.',
    'Não usar álcool líquido para acender fogo ou reavivar chamas.',
    'Manter velas, lamparinas, fósforos e isqueiros fora do alcance das crianças e nunca deixar vela acesa sem supervisão ou perto de cortina, rede e mosquiteiro.',
    'Revisar a instalação elétrica e evitar ligações improvisadas, principal causa de incêndio em casas de madeira.',
    'Combinar e treinar com a família uma rota de saída e um ponto de encontro em caso de incêndio.',
    'Ensinar as crianças a sair agachadas, a não se esconder e a nunca voltar para dentro.',
    'Organizar com a comunidade o acesso a extintor, a pontos de água e a plano de evacuação, especialmente em palafitas e em conjuntos de casas contíguas de madeira.',
    'Manter os telefones dos Bombeiros 193 e do SAMU 192 visíveis em casa, na creche e na escola.'
  ],
  fontes: [
    { nome: 'Diretrizes para o atendimento de intoxicações exógenas – Centros de Informação e Assistência Toxicológica (CIATox)', ano: 2023 },
    { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
    { nome: 'PALS – Pediatric Advanced Life Support, American Heart Association', ano: 2020 },
    { nome: 'Nelson Textbook of Pediatrics', ano: 2020 },
    { nome: 'Tratado de Pediatria – Sociedade Brasileira de Pediatria', ano: 2022 }
  ],
  atualizadoEm: '2026-09'
});

// ================================================================= QUEIXAS
(function () {
  var ATUAL = '2026-09';
  var FONTES = [
    { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
    { nome: 'Tratado de Pediatria – Sociedade Brasileira de Pediatria', ano: 2022 },
    { nome: 'PALS – Pediatric Advanced Life Support, American Heart Association', ano: 2020 },
    { nome: 'Centros de Informação e Assistência Toxicológica (CIATox) – Disque Intoxicação 0800 722 6001', ano: 2023 }
  ];
  var NOMES = {
    febre: 'Febre', dor_local: 'Dor local', feridas: 'Feridas', lesoes_pele: 'Lesões de pele',
    dispneia: 'Dispneia', tosse: 'Tosse', estridor: 'Estridor', vomitos: 'Vômitos',
    dor_abdominal: 'Dor abdominal', alteracao_consciencia: 'Alteração da consciência',
    convulsao: 'Convulsão', palidez: 'Palidez', cianose: 'Cianose', sangramento: 'Sangramento',
    desidratacao: 'Sinais de desidratação', mordedura_animal: 'Mordedura de animal',
    picada_inseto: 'Picada de inseto', sudorese: 'Sudorese', prurido: 'Prurido',
    edema: 'Edema', cefaleia: 'Cefaleia', irritabilidade: 'Irritabilidade', fraqueza: 'Fraqueza',
    taquipneia: 'Taquipneia', tiragem: 'Tiragem', sibilos: 'Sibilos', hipotonia: 'Hipotonia',
    recusa_alimentar: 'Recusa alimentar', apatia: 'Apatia', dor_toracica: 'Dor torácica',
    hipoglicemia: 'Hipoglicemia', diarreia: 'Diarreia', linfonodomegalia: 'Linfonodomegalia',
    alteracao_sensibilidade: 'Alteração de sensibilidade', dor_garganta: 'Dor de garganta',
    hematuria: 'Hematúria', oliguria: 'Oligúria', ulcera_cutanea: 'Úlcera cutânea'
  };
  function sx(ids) { return ids.map(function (id) { return { id: id, nome: NOMES[id] || id }; }); }
  function d(doencaId, nota) { return nota ? { doencaId: doencaId, nota: nota } : { doencaId: doencaId }; }
  function n(nome, nota) { return nota ? { nome: nome, doencaId: null, nota: nota } : { nome: nome, doencaId: null }; }
  var Q = PED.data.acidentes.queixas;

  Q.push({
    id: 'queimadura', nome: 'Queimadura', grupo: 'acidentes', icone: '🔥',
    perguntas: [
      'Qual foi o agente (líquido quente, chama, superfície quente, produto químico, eletricidade, sol)?',
      'Horário exato da queimadura? Esse horário é o marco zero para calcular a reposição de líquidos.',
      'O acidente foi em ambiente fechado, com fumaça ou incêndio?',
      'O que foi feito no local (água corrente, gelo, manteiga, pasta de dente, borra de café, outro produto)?',
      'Quais partes do corpo foram atingidas? Há acometimento de face, mãos, pés, períneo ou dobras?',
      'A criança está com dor intensa ou a área está indolor e esbranquiçada?',
      'Está bebendo líquidos, urinando normalmente e mantendo o estado geral?',
      'A caderneta de vacinação está em dia, incluindo o tétano? A história é compatível com a lesão?'
    ],
    sintomasAssociados: sx(['dor_local', 'feridas', 'lesoes_pele', 'edema', 'dispneia', 'estridor', 'tosse', 'palidez', 'vomitos', 'desidratacao']),
    sinaisGravidade: ['estridor', 'desconforto_respiratorio', 'hipoxemia', 'choque', 'hipotensao', 'ma_perfusao', 'oliguria', 'alteracao_consciencia', 'cianose'],
    diferenciais: [
      { se: {}, hipoteses: [d('queimadura', 'classificar por profundidade e estimar a superfície queimada por Lund-Browder, não pela regra dos nove do adulto'), n('Queimadura intencional ou maus-tratos', 'avaliar padrão em luva, em bota, simétrico, em nádegas ou marca de objeto e a coerência da história')] },
      { se: { sintomas: ['estridor', 'tosse'] }, hipoteses: [d('intoxicacao_fumaca', 'considerar lesão inalatória e intoxicação por monóxido de carbono e cianeto; a oximetria de pulso pode ser falsamente normal'), d('queimadura', 'queimadura de via aérea: avaliar intubação precoce antes da progressão do edema')] },
      { se: { sintomas: ['dispneia', 'alteracao_consciencia'] }, hipoteses: [d('intoxicacao_fumaca', 'oxigênio a 100 por cento e avaliação de intoxicação por cianeto quando houver acidose com lactato elevado')] },
      { se: { sintomas: ['feridas', 'dor_local'] }, hipoteses: [d('choque_eletrico', 'se houve contato com corrente elétrica: procurar lesão de entrada e de saída e solicitar eletrocardiograma'), d('ingestao_caustico', 'se houve contato ou ingestão de produto químico, avaliar lesão de mucosa oral e esofágica')] }
    ],
    exames: ['hemograma', 'eletrolitos', 'glicemia', 'ureia', 'creatinina', 'gasometria', 'lactato', 'urina_1', 'cpk', 'radiografia_torax'],
    condutaInicial: [
      'Interromper a queimadura, remover roupas e adornos e resfriar com água corrente em temperatura ambiente por cerca de 20 minutos; nunca usar gelo e nunca aplicar manteiga, pasta de dente, borra de café ou remédio caseiro.',
      'Avaliar via aérea em toda queimadura de face, pescoço ou ocorrida em ambiente fechado, e considerar intubação precoce diante de rouquidão, estridor ou fuligem.',
      'Analgesia precoce e adequada antes de manipular a ferida, e manter a criança aquecida, resfriando a ferida e não a criança.',
      'Estimar a superfície corporal queimada pela tabela de Lund-Browder e, em áreas pequenas, pela regra da palma da mão da criança, contando apenas segundo e terceiro graus.',
      'Iniciar reposição com Ringer lactato pela fórmula de Parkland nas queimaduras extensas, somando o volume de manutenção na criança e ajustando pela diurese.',
      'Avaliar profilaxia antitetânica, definir critério de transferência para centro de queimados e avaliar sinais de maus-tratos.'
    ],
    fontes: FONTES, atualizadoEm: ATUAL
  });

  Q.push({
    id: 'engasgo', nome: 'Engasgo e aspiração de corpo estranho', grupo: 'acidentes', icone: '😮',
    perguntas: [
      'A criança consegue tossir com força, chorar ou falar neste momento?',
      'O que ela estava comendo ou com o que estava brincando (amendoim, castanha, milho, uva, salsicha, bala, peça de brinquedo, balão, pilha)?',
      'O episódio foi presenciado? Há quanto tempo?',
      'Houve cianose, perda de consciência ou necessidade de manobras?',
      'Alguém tentou retirar o objeto com o dedo ou ofereceu água, pão ou outro alimento?',
      'Depois do episódio, ficou tossindo, com chiado ou com cansaço?',
      'Há tosse arrastada, chiado de um lado só ou pneumonia de repetição no mesmo lugar?'
    ],
    sintomasAssociados: sx(['tosse', 'dispneia', 'estridor', 'cianose', 'sibilos', 'taquipneia', 'tiragem', 'alteracao_consciencia', 'vomitos', 'febre']),
    sinaisGravidade: ['estridor', 'desconforto_respiratorio', 'hipoxemia', 'cianose', 'apneia', 'alteracao_consciencia', 'letargia', 'convulsao'],
    diferenciais: [
      { se: {}, hipoteses: [d('corpo_estranho_via_aerea', 'história de engasgo súbito em criança previamente bem é o dado mais importante, mesmo com exame e radiografia normais'), n('Laringotraqueíte viral (crupe)'), n('Anafilaxia com edema de via aérea')] },
      { se: { sintomas: ['estridor', 'cianose'] }, hipoteses: [d('corpo_estranho_via_aerea', 'tosse ineficaz: lactente com 5 golpes dorsais e 5 compressões torácicas; maior de 1 ano com manobra de Heimlich; nunca varredura digital às cegas')] },
      { se: { sintomas: ['tosse', 'sibilos'] }, hipoteses: [d('corpo_estranho_via_aerea', 'sibilância unilateral e murmúrio assimétrico sugerem corpo estranho em brônquio; considerar broncoscopia'), n('Asma ou bronquiolite', 'considerar, mas não assumir sem excluir corpo estranho em quadro de início súbito')] },
      { se: { sintomas: ['febre', 'tosse'] }, hipoteses: [d('pneumonia', 'pneumonia pós-obstrutiva ou de repetição no mesmo lobo levanta a suspeita de corpo estranho retido'), d('corpo_estranho_via_aerea', 'apresentação tardia')] },
      { se: { sintomas: ['vomitos', 'dor_garganta'] }, hipoteses: [d('corpo_estranho_digestivo', 'se o objeto foi deglutido e não aspirado: sialorreia e disfagia sugerem impactação esofágica'), d('ingestao_pilha_botao', 'se houver qualquer possibilidade de pilha botão, tratar como emergência')] }
    ],
    exames: ['radiografia_torax', 'gasometria', 'hemograma'],
    condutaInicial: [
      'Avaliar imediatamente se a tosse é eficaz: se a criança tosse com força, chora ou fala, encorajar a tosse, não bater nas costas e não colocar o dedo na boca.',
      'Tosse ineficaz em lactente: 5 golpes dorsais interescapulares seguidos de 5 compressões torácicas, alternando; em maiores de 1 ano, manobra de Heimlich; acionar o SAMU 192.',
      'Criança inconsciente: iniciar reanimação cardiopulmonar, inspecionar a boca antes de cada sequência de ventilações e retirar apenas o objeto visível.',
      'Após a desobstrução, manter observação com oximetria e avaliar radiografia e indicação de broncoscopia, mesmo que a criança pareça bem.',
      'Não usar broncodilatador nem fisioterapia para tentar mobilizar o corpo estranho e organizar transferência para serviço com broncoscopia rígida quando indicado.'
    ],
    fontes: FONTES, atualizadoEm: ATUAL
  });

  Q.push({
    id: 'afogamento', nome: 'Afogamento e submersão', grupo: 'acidentes', icone: '🌊',
    perguntas: [
      'Onde ocorreu (rio, igarapé, lago, poço, balde, bacia, banheira, tanque, piscina, queda de barco)?',
      'Quanto tempo a criança ficou submersa e quem presenciou?',
      'Foi necessário fazer ventilações ou compressões no local? Houve perda de consciência?',
      'A criança tossiu, vomitou ou ficou roxa após o resgate?',
      'A água estava fria? A criança ficou muito tempo molhada antes do atendimento?',
      'Houve mergulho, queda de altura ou acidente com embarcação (risco de trauma cervical)?',
      'Houve convulsão, desmaio ou uso de álcool antes da queda na água?',
      'Estava usando colete salva-vidas? Havia adulto supervisionando?'
    ],
    sintomasAssociados: sx(['tosse', 'dispneia', 'taquipneia', 'cianose', 'vomitos', 'alteracao_consciencia', 'convulsao', 'palidez', 'febre', 'sibilos']),
    sinaisGravidade: ['apneia', 'desconforto_respiratorio', 'hipoxemia', 'cianose', 'alteracao_consciencia', 'convulsao', 'choque', 'hipotensao', 'letargia', 'edema_pulmonar'],
    diferenciais: [
      { se: {}, hipoteses: [d('afogamento', 'o evento primário é a hipóxia: priorizar via aérea e ventilação, com 5 ventilações de resgate iniciais quando não houver respiração eficaz'), n('Causa precipitante da submersão', 'considerar convulsão, arritmia, síncope, hipoglicemia e, em adolescentes, uso de álcool')] },
      { se: { sintomas: ['tosse', 'taquipneia'] }, hipoteses: [d('afogamento', 'aspiração com lesão de surfactante: observar por 4 a 8 horas com oximetria, pois a piora respiratória costuma ser tardia')] },
      { se: { sintomas: ['febre', 'dispneia'] }, hipoteses: [d('pneumonia', 'pneumonia bacteriana secundária após 48 a 72 horas, sobretudo em água contaminada'), d('afogamento', 'não usar antibiótico profilático de rotina')] },
      { se: { sintomas: ['alteracao_consciencia', 'convulsao'] }, hipoteses: [d('afogamento', 'encefalopatia hipóxico-isquêmica: manter neuroproteção, normoglicemia, normocapnia e controle de temperatura'), d('traumatismo_cranioencefalico', 'avaliar trauma associado em mergulho, queda ou acidente de embarcação')] },
      { se: { contexto: ['agua_rio', 'ribeirinha', 'agua', 'enchente'] }, hipoteses: [d('afogamento', 'cenário frequente no Amazonas: queda de barco sem colete, banho em igarapé e praia de rio sem supervisão, queda de flutuante, de porto e de ponte; atenção à hipotermia em água de rio')] }
    ],
    exames: ['gasometria', 'radiografia_torax', 'hemograma', 'eletrolitos', 'glicemia', 'lactato', 'ureia', 'creatinina', 'cpk'],
    condutaInicial: [
      'Priorizar via aérea e ventilação: se não houver respiração eficaz, iniciar com 5 ventilações de resgate e seguir com o protocolo pediátrico de reanimação, acionando o SAMU 192 ou os Bombeiros 193.',
      'Nunca fazer manobras para drenar água: não comprimir o abdome, não fazer manobra de Heimlich e não pendurar a criança de cabeça para baixo.',
      'Ofertar oxigênio a toda criança sintomática, monitorizar com oximetria e considerar ventilação não invasiva ou intubação com pressão expiratória final positiva na insuficiência respiratória.',
      'Retirar roupas molhadas, secar, aquecer e medir a temperatura central; lateralizar em bloco em caso de vômitos, mantendo restrição cervical quando o mecanismo indicar.',
      'Observar toda criança sintomática por pelo menos 4 a 8 horas, pelo risco de deterioração respiratória tardia, e orientar retorno por 48 a 72 horas pelo risco de pneumonia secundária.',
      'Avaliar causa precipitante, trauma associado e contexto de negligência, e discutir prevenção com a família antes da alta.'
    ],
    fontes: FONTES, atualizadoEm: ATUAL
  });

  Q.push({
    id: 'ingestao_substancia', nome: 'Ingestão de substância ou suspeita de intoxicação', grupo: 'acidentes', icone: '☠️',
    perguntas: [
      'Qual substância (remédio, produto de limpeza, combustível, veneno, planta, pilha, álcool)? A embalagem está disponível?',
      'Qual a maior quantidade possivelmente ingerida, considerando tudo que falta na cartela ou no frasco?',
      'Há quanto tempo ocorreu e por qual via (boca, pele, olho, inalação)?',
      'O produto estava na embalagem original ou em garrafa de refrigerante, copo ou pote de alimento?',
      'Alguém provocou vômito ou ofereceu leite, água, vinagre, limão ou outro produto?',
      'A criança está sonolenta, agitada, com vômitos, babando, com dificuldade para respirar ou com convulsão?',
      'Foi acidental ou intencional? Há outras pessoas da casa com sintomas?',
      'A família usa chá, garrafada ou remédio caseiro na criança?'
    ],
    sintomasAssociados: sx(['vomitos', 'alteracao_consciencia', 'convulsao', 'sudorese', 'dor_abdominal', 'dispneia', 'diarreia', 'palidez', 'hipoglicemia', 'dor_local']),
    sinaisGravidade: ['alteracao_consciencia', 'convulsao', 'desconforto_respiratorio', 'hipoxemia', 'choque', 'hipoglicemia', 'apneia', 'cianose', 'vomitos_persistentes', 'letargia'],
    diferenciais: [
      { se: {}, hipoteses: [d('intoxicacao_medicamentosa', 'lembrar dos agentes que matam com um comprimido em criança pequena: tricíclico, bloqueador de canal de cálcio, betabloqueador, opioide, sulfonilureia, antiarrítmico, cânfora, teofilina'), d('intoxicacao_domestica', 'produto de limpeza, cáustico, agrotóxico e hidrocarboneto; na aspiração de querosene, diesel ou gasolina, jamais lavagem gástrica e jamais provocar vômito'), d('intoxicacao_planta'), n('Contatar o CIATox pelo Disque Intoxicação 0800 722 6001')] },
      { se: { sintomas: ['dor_local', 'vomitos'] }, hipoteses: [d('ingestao_caustico', 'sialorreia, disfagia e lesão oral após soda cáustica, desentupidor ou ácido: não provocar vômito, não neutralizar, não dar carvão'), d('ingestao_pilha_botao', 'se houver possibilidade de pilha botão, radiografia imediata e remoção em até 2 horas se estiver no esôfago')] },
      { se: { sintomas: ['sudorese', 'diarreia'] }, hipoteses: [d('intoxicacao_domestica', 'síndrome colinérgica por organofosforado ou carbamato: miose, sialorreia, broncorreia e bradicardia; atropina titulada até secar as secreções')] },
      { se: { sintomas: ['alteracao_consciencia', 'hipoglicemia'] }, hipoteses: [d('intoxicacao_medicamentosa', 'sulfonilureia: hipoglicemia prolongada e recorrente, com observação por pelo menos 24 horas'), n('Álcool em criança pequena', 'hipoglicemia é a principal causa de morte')] },
      { se: { contexto: ['rural', 'indigena', 'ribeirinha', 'garimpo'] }, hipoteses: [d('intoxicacao_domestica', 'agrotóxico de roçado, raticida clandestino do tipo chumbinho, querosene de lamparina e mercúrio de garimpo'), d('intoxicacao_planta', 'mandioca brava, manipueira e tucupi mal processados, saia-branca e timbó')] }
    ],
    exames: ['glicemia', 'gasometria', 'eletrolitos', 'hemograma', 'ureia', 'creatinina', 'ast', 'alt', 'coagulograma', 'lactato', 'urina_1', 'radiografia_torax'],
    condutaInicial: [
      'ABCDE, monitorização e glicemia capilar imediata; a criança intoxicada morre por via aérea, hipoventilação, arritmia, convulsão ou hipoglicemia.',
      'Nunca provocar vômito e nunca oferecer leite, água ou qualquer líquido para diluir ou neutralizar.',
      'Contatar o Centro de Informação e Assistência Toxicológica pelo Disque Intoxicação 0800 722 6001 e pedir a embalagem ou a foto do produto.',
      'Considerar carvão ativado 1 g/kg na primeira hora, apenas em substância adsorvível e com via aérea protegida; não usar em cáustico, hidrocarboneto, álcool e metais.',
      'Descontaminação externa em exposição a agrotóxico: retirar toda a roupa e lavar pele e cabelos com água e sabão, com proteção da equipe; irrigar o olho por 15 a 20 minutos em respingo.',
      'Observar pelo tempo adequado ao agente, e não ao sintoma, e notificar a intoxicação exógena; em adolescente, avaliar intencionalidade e garantir avaliação de saúde mental.'
    ],
    fontes: FONTES, atualizadoEm: ATUAL
  });

  Q.push({
    id: 'trauma_cranio', nome: 'Trauma na cabeça', grupo: 'acidentes', icone: '🧠',
    perguntas: [
      'Qual foi o mecanismo e a altura da queda? Houve acidente de moto, atropelamento ou acidente de barco?',
      'Houve perda de consciência? Por quanto tempo? A criança lembra do que aconteceu?',
      'Vomitou? Quantas vezes? Teve convulsão?',
      'Está agindo de maneira diferente do habitual, segundo quem convive com ela?',
      'Há dor de cabeça e ela está piorando?',
      'Saiu líquido claro ou sangue pelo nariz ou pelo ouvido? Apareceu mancha roxa ao redor dos olhos ou atrás da orelha?',
      'Usava capacete, cadeirinha ou cinto? Quanto tempo se passou desde o trauma?',
      'A história contada é compatível com o desenvolvimento motor da criança?'
    ],
    sintomasAssociados: sx(['alteracao_consciencia', 'vomitos', 'cefaleia', 'convulsao', 'irritabilidade', 'palidez', 'sangramento', 'feridas', 'apatia', 'hipotonia']),
    sinaisGravidade: ['alteracao_consciencia', 'convulsao', 'letargia', 'vomitos_persistentes', 'apneia', 'choque', 'hipotensao', 'desconforto_respiratorio', 'sangramento_importante'],
    diferenciais: [
      { se: {}, hipoteses: [d('traumatismo_cranioencefalico', 'aplicar a regra PECARN separada por faixa etária para decidir entre tomografia, observação e alta'), d('queda', 'avaliar lesões associadas conforme o mecanismo'), d('ferimento_cortocontuso', 'ferida de couro cabeludo pode sangrar muito e causar anemia em lactentes')] },
      { se: { sintomas: ['alteracao_consciencia', 'vomitos'] }, hipoteses: [d('traumatismo_cranioencefalico', 'critério de alto risco do PECARN: Glasgow igual ou menor que 14 ou alteração do estado mental; considerar tomografia')] },
      { se: { sintomas: ['convulsao'] }, hipoteses: [d('traumatismo_cranioencefalico', 'convulsão pós-traumática: considerar imagem e internação'), n('Convulsão como causa da queda', 'investigar epilepsia, hipoglicemia e arritmia')] },
      { se: { sintomas: ['irritabilidade', 'hipotonia'] }, hipoteses: [n('Traumatismo craniano abusivo e síndrome do bebê sacudido', 'considerar em lactente com quadro neurológico sem história de trauma compatível; avaliar fundo de olho e inquérito ósseo e notificar'), d('traumatismo_cranioencefalico', 'em menores de 2 anos, o comportamento diferente do habitual segundo os pais é critério do PECARN')] },
      { se: { contexto: ['agua_rio', 'ribeirinha'] }, hipoteses: [d('afogamento', 'trauma craniano em queda de barco, porto ou flutuante soma o risco de submersão'), d('traumatismo_cranioencefalico', 'em serviço sem tomógrafo, considerar observação prolongada e transferência diante de critério de alto risco')] }
    ],
    exames: ['glicemia', 'hemograma', 'coagulograma', 'eletrolitos', 'gasometria'],
    condutaInicial: [
      'ABCDE com restrição de movimento cervical quando o mecanismo indicar; corrigir prontamente hipóxia e hipotensão, que são as principais causas evitáveis de lesão secundária.',
      'Registrar a escala de coma de Glasgow pediátrica com o horário e repeti-la de forma seriada, avaliando pupilas e sinais de fratura de base de crânio.',
      'Aplicar os critérios PECARN conforme a idade e definir tomografia, observação de 4 a 6 horas ou alta orientada.',
      'Glicemia capilar, analgesia adequada, cabeceira elevada a 30 graus e cabeça em posição neutra.',
      'Avaliar profilaxia antitetânica quando houver ferida e tratar a ferida de couro cabeludo com atenção ao volume de sangramento em lactentes.',
      'Entregar por escrito as orientações de observação domiciliar e avaliar suspeita de maus-tratos antes da alta.'
    ],
    fontes: FONTES, atualizadoEm: ATUAL
  });
})();

(function () {
  var ATUAL = '2026-09';
  var FONTES = [
    { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
    { nome: 'Normas Técnicas de Profilaxia da Raiva Humana e Nota Informativa do esquema pós-exposição – Ministério da Saúde', ano: 2022 },
    { nome: 'Tratado de Pediatria – Sociedade Brasileira de Pediatria', ano: 2022 },
    { nome: 'PALS – Pediatric Advanced Life Support, American Heart Association', ano: 2020 }
  ];
  var NOMES = {
    febre: 'Febre', dor_local: 'Dor local', feridas: 'Feridas', lesoes_pele: 'Lesões de pele',
    dispneia: 'Dispneia', tosse: 'Tosse', estridor: 'Estridor', vomitos: 'Vômitos',
    dor_abdominal: 'Dor abdominal', alteracao_consciencia: 'Alteração da consciência',
    convulsao: 'Convulsão', palidez: 'Palidez', cianose: 'Cianose', sangramento: 'Sangramento',
    desidratacao: 'Sinais de desidratação', mordedura_animal: 'Mordedura de animal',
    picada_inseto: 'Picada de inseto', sudorese: 'Sudorese', prurido: 'Prurido',
    edema: 'Edema', cefaleia: 'Cefaleia', irritabilidade: 'Irritabilidade', fraqueza: 'Fraqueza',
    taquipneia: 'Taquipneia', tiragem: 'Tiragem', sibilos: 'Sibilos', hipotonia: 'Hipotonia',
    recusa_alimentar: 'Recusa alimentar', apatia: 'Apatia', dor_toracica: 'Dor torácica',
    dor_garganta: 'Dor de garganta', linfonodomegalia: 'Linfonodomegalia',
    alteracao_sensibilidade: 'Alteração de sensibilidade', hematuria: 'Hematúria',
    oliguria: 'Oligúria', ulcera_cutanea: 'Úlcera cutânea', diarreia: 'Diarreia'
  };
  function sx(ids) { return ids.map(function (id) { return { id: id, nome: NOMES[id] || id }; }); }
  function d(doencaId, nota) { return nota ? { doencaId: doencaId, nota: nota } : { doencaId: doencaId }; }
  function n(nome, nota) { return nota ? { nome: nome, doencaId: null, nota: nota } : { nome: nome, doencaId: null }; }
  var Q = PED.data.acidentes.queixas;

  Q.push({
    id: 'queda_acidente', nome: 'Queda', grupo: 'acidentes', icone: '🤕',
    perguntas: [
      'De onde caiu e qual a altura aproximada? Sobre qual superfície (cimento, madeira, terra, água)?',
      'Qual parte do corpo bateu primeiro? A queda foi presenciada?',
      'Houve perda de consciência, vômitos, convulsão ou sonolência depois?',
      'A criança está mexendo os quatro membros normalmente? Está apoiando o pé e usando os dois braços?',
      'Há dor no pescoço, nas costas, na barriga ou no peito?',
      'Foi queda de janela, telhado, laje, árvore, escada, rede, flutuante, porto ou ponte?',
      'A história é compatível com o que a criança já consegue fazer sozinha, para a idade dela?',
      'A vacinação antitetânica está em dia? Houve ferimento aberto?'
    ],
    sintomasAssociados: sx(['dor_local', 'feridas', 'edema', 'sangramento', 'alteracao_consciencia', 'vomitos', 'palidez', 'dor_abdominal', 'dor_toracica', 'alteracao_sensibilidade']),
    sinaisGravidade: ['choque', 'hipotensao', 'ma_perfusao', 'alteracao_consciencia', 'sangramento_importante', 'desconforto_respiratorio', 'dor_abdominal_intensa', 'convulsao', 'letargia'],
    diferenciais: [
      { se: {}, hipoteses: [d('queda', 'classificar por altura, superfície e idade; a altura maior que 0,9 metro em menores de 2 anos e maior que 1,5 metro em maiores é mecanismo grave'), d('traumatismo_cranioencefalico', 'quando houve impacto craniano, aplicar a regra PECARN'), n('Fratura', 'recusa de andar ou de usar um membro em criança pequena pode ser o único sinal')] },
      { se: { sintomas: ['dor_abdominal', 'palidez'] }, hipoteses: [n('Lesão de víscera abdominal (baço, fígado, víscera oca)', 'considerar imagem e observação, pois o quadro pode instalar-se em horas'), d('queda')] },
      { se: { sintomas: ['alteracao_consciencia', 'vomitos'] }, hipoteses: [d('traumatismo_cranioencefalico', 'considerar tomografia conforme os critérios por faixa etária')] },
      { se: { sintomas: ['alteracao_sensibilidade', 'dor_local'] }, hipoteses: [n('Lesão de coluna ou medular', 'manter restrição de movimento e avaliar imagem'), n('Lesão de nervo periférico ou síndrome compartimental')] },
      { se: { contexto: ['ribeirinha', 'agua_rio', 'rural'] }, hipoteses: [d('afogamento', 'queda de flutuante, porto, ponte de madeira ou barco soma o risco de submersão'), d('queda', 'queda de árvore durante a colheita de açaí, manga e cupuaçu é mecanismo frequente na região')] }
    ],
    exames: ['hemograma', 'ast', 'alt', 'urina_1', 'radiografia_torax', 'glicemia'],
    condutaInicial: [
      'ABCDE com restrição de movimento cervical quando o mecanismo indicar, priorizando as lesões que ameaçam a vida antes das lesões visíveis.',
      'Analgesia precoce e adequada, e exame completo com a criança despida, registrando todas as lesões.',
      'Imobilizar o segmento suspeito na posição em que está, avaliando perfusão, sensibilidade e motricidade distais antes e depois.',
      'Aplicar os critérios de imagem para trauma de crânio e considerar avaliação abdominal quando o mecanismo ou o exame sugerirem.',
      'Avaliar profilaxia antitetânica e tratar as feridas associadas.',
      'Comparar a história com o desenvolvimento motor da criança e, diante de incompatibilidade, notificar e acionar a rede de proteção.'
    ],
    fontes: FONTES, atualizadoEm: ATUAL
  });

  Q.push({
    id: 'mordedura_cao_queixa', nome: 'Mordedura de cão ou de outro animal', grupo: 'acidentes', icone: '🐕',
    perguntas: [
      'Qual animal (cão, gato, morcego, macaco ou sagui, animal silvestre, animal de produção, humano)?',
      'O animal é conhecido e pode ser observado por 10 dias? Está vacinado contra a raiva?',
      'O animal estava agressivo sem provocação, salivando, com paralisia, adoeceu, morreu ou desapareceu?',
      'Onde é a lesão e qual a profundidade? Há acometimento de cabeça, face, pescoço, mãos, polpas digitais ou planta do pé?',
      'Houve lambedura de mucosa ou de pele com lesão?',
      'Há quanto tempo ocorreu? Lavou com água e sabão por 15 minutos?',
      'A vacinação antitetânica está em dia? Já recebeu profilaxia antirrábica antes?',
      'Há sinais de infecção (dor crescente, vermelhidão, secreção, febre)?'
    ],
    sintomasAssociados: sx(['mordedura_animal', 'feridas', 'dor_local', 'sangramento', 'edema', 'febre', 'linfonodomegalia', 'lesoes_pele', 'alteracao_sensibilidade', 'alteracao_consciencia']),
    sinaisGravidade: ['sangramento_importante', 'sepse', 'choque', 'alteracao_consciencia', 'convulsao', 'desconforto_respiratorio', 'anafilaxia'],
    diferenciais: [
      { se: {}, hipoteses: [d('mordedura_cao', 'classificar a exposição em contato indireto, acidente leve ou acidente grave e definir a profilaxia antirrábica na primeira avaliação'), n('Ferida polimicrobiana', 'Pasteurella multocida, Staphylococcus aureus, Streptococcus e anaeróbios'), n('Tétano', 'avaliar a situação vacinal: mordedura é ferimento com risco')] },
      { se: { sintomas: ['febre', 'edema'] }, hipoteses: [n('Celulite ou abscesso da ferida', 'infecção em 8 a 24 horas sugere Pasteurella'), d('sepse', 'considerar diante de toxemia, sobretudo em criança imunossuprimida ou asplênica')] },
      { se: { contexto: ['mata', 'rural', 'ribeirinha', 'indigena'] }, hipoteses: [d('mordedura_cao', 'morcego, primata não humano e animal silvestre são sempre exposição grave: soro e vacina conforme as normas do Ministério da Saúde'), n('Animal silvestre criado como animal de estimação', 'prática de risco para raiva; orientar e notificar')] },
      { se: { sintomas: ['feridas', 'dor_local'], contexto: ['animais', 'mordedura'] }, hipoteses: [d('mordedura_cao', 'ferimento em face, mãos, pés ou profundo é acidente grave; lavar por 15 minutos com água e sabão e infiltrar o soro na ferida quando indicado'), d('ferimento_cortocontuso', 'avaliar lesão de tendão, de nervo e de vaso')] },
      { se: { sintomas: ['alteracao_consciencia', 'fraqueza'] }, hipoteses: [n('Raiva humana em fase de doença', 'agitação, hidrofobia, aerofobia, disfagia e sialorreia: emergência e notificação imediata')] }
    ],
    exames: ['hemograma', 'pcr'],
    condutaInicial: [
      'Lavar a ferida com água corrente e sabão por pelo menos 15 minutos, de forma vigorosa: é a medida isolada mais eficaz contra raiva e infecção.',
      'Classificar a exposição e a condição do animal e definir a profilaxia antirrábica já na primeira avaliação, com infiltração do soro na ferida quando indicado.',
      'Avaliar e registrar a profilaxia antitetânica conforme a situação vacinal e o tipo de ferimento.',
      'Decidir o fechamento caso a caso: considerar sutura em face após irrigação abundante e evitar sutura em ferimentos puntiformes, de mãos e pés, tardios ou infectados.',
      'Considerar amoxicilina com clavulanato em ferimentos de mão, pé, face, profundos, suturados, de gato, humanos ou em criança imunossuprimida.',
      'Notificar o atendimento antirrábico, orientar a observação do animal por 10 dias e reavaliar em 24 a 48 horas.'
    ],
    fontes: FONTES, atualizadoEm: ATUAL
  });

  Q.push({
    id: 'corpo_estranho', nome: 'Corpo estranho (engolido ou introduzido)', grupo: 'acidentes', icone: '🔩',
    perguntas: [
      'O que foi engolido ou introduzido (moeda, botão, pilha redonda, ímã, espinha de peixe, osso, conta, semente, brinquedo)?',
      'Existe qualquer possibilidade de ser pilha botão ou de serem dois ou mais ímãs?',
      'Há quanto tempo? Foi presenciado ou a criança contou depois?',
      'Onde foi parar: engoliu, colocou no nariz ou no ouvido?',
      'Está babando, recusando alimento, com dor para engolir, vomitando ou com dor no peito ou na barriga?',
      'Há secreção só de um lado do nariz, com cheiro ruim? Há dor ou sangramento no ouvido?',
      'Alguém já tentou retirar em casa, com pinça, cotonete, palito ou o dedo?',
      'É a primeira vez ou já houve outras ingestões?'
    ],
    sintomasAssociados: sx(['vomitos', 'dor_local', 'dor_abdominal', 'sangramento', 'dor_garganta', 'tosse', 'dispneia', 'febre', 'recusa_alimentar', 'lesoes_pele']),
    sinaisGravidade: ['estridor', 'desconforto_respiratorio', 'sangramento_importante', 'vomitos_persistentes', 'dor_abdominal_intensa', 'sepse', 'choque', 'cianose'],
    diferenciais: [
      { se: {}, hipoteses: [d('corpo_estranho_digestivo', 'a maioria dos objetos rombos que passa o esôfago progride sem lesão, mas o objeto impactado no esôfago exige remoção'), d('corpo_estranho_nasal_auricular', 'secreção nasal unilateral e fétida sugere corpo estranho mesmo sem relato')] },
      { se: { sintomas: ['vomitos', 'dor_garganta'] }, hipoteses: [d('ingestao_pilha_botao', 'sempre verificar na radiografia o sinal do halo ou do duplo anel: pilha no esôfago é emergência com remoção idealmente em até 2 horas'), d('corpo_estranho_digestivo', 'sialorreia e disfagia indicam impactação esofágica')] },
      { se: { sintomas: ['tosse', 'dispneia'] }, hipoteses: [d('corpo_estranho_via_aerea', 'diferenciar aspiração de ingestão: radiografia em duas incidências e avaliação de broncoscopia')] },
      { se: { sintomas: ['dor_abdominal', 'vomitos'] }, hipoteses: [d('corpo_estranho_digestivo', 'dois ou mais ímãs se atraem entre alças e causam necrose por pressão, fístula e perfuração: avaliação cirúrgica'), n('Obstrução intestinal por bolinha de gel absorvente', 'objeto pequeno que incha depois de engolido')] },
      { se: { sintomas: ['sangramento', 'dor_local'] }, hipoteses: [d('corpo_estranho_nasal_auricular', 'pilha botão em narina causa necrose de septo em poucas horas: remoção urgente e não irrigar'), d('ferimento_cortocontuso', 'avaliar lesão por tentativas prévias de remoção')] }
    ],
    exames: ['radiografia_torax', 'hemograma', 'coagulograma'],
    condutaInicial: [
      'Não provocar vômito, não empurrar com pão, banana ou arroz e não tentar remover em casa com pinça, cotonete ou palito.',
      'Radiografia em duas incidências, cobrindo pescoço, tórax e abdome, e verificar sempre se o objeto redondo é moeda ou pilha botão pelo sinal do halo.',
      'Pilha botão no esôfago: emergência, com remoção endoscópica idealmente em até 2 horas; considerar mel 10 mL a cada 10 minutos, até 6 doses, em maiores de 1 ano, enquanto se aguarda, sem atrasar a remoção.',
      'Objeto pontiagudo, longo, dois ou mais ímãs, ou criança sintomática: internação e remoção; objeto rombo pequeno já no estômago em criança assintomática: dieta habitual e controle conforme protocolo.',
      'Corpo estranho nasal anterior: considerar a manobra do beijo da mãe; não irrigar o ouvido em suspeita de pilha, de semente ou de perfuração timpânica.',
      'Encaminhar à endoscopia ou à otorrinolaringologia conforme o caso e avaliar contexto psicossocial em ingestões repetidas.'
    ],
    fontes: FONTES, atualizadoEm: ATUAL
  });

  Q.push({
    id: 'choque_eletrico_queixa', nome: 'Choque elétrico', grupo: 'acidentes', icone: '⚡',
    perguntas: [
      'Qual foi a fonte (tomada, fio de aparelho, extensão, chuveiro, rede elétrica, poste, gerador, raio)?',
      'Era baixa tensão da casa ou alta tensão da rede? A criança ficou presa ao fio?',
      'A criança estava molhada, descalça ou dentro da água?',
      'Houve perda de consciência, desmaio, convulsão ou parada que exigiu manobras?',
      'Onde estão as marcas de entrada e de saída da corrente?',
      'Houve queda ou projeção após o choque?',
      'Há dor muscular forte ou urina escura?',
      'A criança mordeu fio e queimou o canto da boca?'
    ],
    sintomasAssociados: sx(['feridas', 'lesoes_pele', 'dor_local', 'alteracao_consciencia', 'convulsao', 'palidez', 'dispneia', 'hematuria', 'fraqueza', 'alteracao_sensibilidade']),
    sinaisGravidade: ['alteracao_consciencia', 'convulsao', 'choque', 'hipotensao', 'ma_perfusao', 'cianose', 'apneia', 'desconforto_respiratorio', 'oliguria'],
    diferenciais: [
      { se: {}, hipoteses: [d('choque_eletrico', 'identificar entrada e saída e deduzir o trajeto: trajeto transtorácico e de mão a mão são os de maior risco de arritmia'), d('queimadura', 'a lesão na pele subestima o dano profundo na queimadura elétrica')] },
      { se: { sintomas: ['alteracao_consciencia', 'convulsao'] }, hipoteses: [d('choque_eletrico', 'considerar monitorização cardíaca prolongada e eletrocardiograma'), d('traumatismo_cranioencefalico', 'avaliar queda ou projeção associada ao choque')] },
      { se: { sintomas: ['hematuria', 'dor_local'] }, hipoteses: [d('choque_eletrico', 'rabdomiólise: urina escura, CPK elevada e risco de lesão renal aguda; hidratar conforme protocolo'), n('Síndrome compartimental do membro', 'dor desproporcional, edema tenso e parestesia: avaliação cirúrgica')] },
      { se: { sintomas: ['feridas', 'lesoes_pele'] }, hipoteses: [d('choque_eletrico', 'queimadura de comissura labial em lactente que mordeu fio: risco de sangramento arterial entre o quinto e o décimo quarto dia'), d('queimadura', 'conduzir a lesão cutânea conforme o protocolo de queimadura')] }
    ],
    exames: ['cpk', 'urina_1', 'eletrolitos', 'ureia', 'creatinina', 'gasometria', 'hemograma', 'glicemia', 'lactato'],
    condutaInicial: [
      'Garantir a segurança da cena: desligar a energia antes de tocar na criança e, em alta tensão, manter distância e acionar os Bombeiros 193 e a companhia de energia.',
      'Iniciar reanimação imediatamente se houver parada, mantendo-a de forma prolongada, pois a eletrocução em crianças tem bom prognóstico com reanimação precoce.',
      'Eletrocardiograma na admissão e monitorização cardíaca conforme o risco: alta tensão, perda de consciência, trajeto transtorácico, choque na água ou eletrocardiograma alterado.',
      'Hidratação guiada por diurese quando houver rabdomiólise, com controle de CPK, potássio e função renal.',
      'Tratar a queimadura conforme o protocolo, avaliar síndrome compartimental de forma seriada e definir profilaxia antitetânica.',
      'Orientar explicitamente a família sobre o risco de sangramento tardio na queimadura de comissura labial e revisar as condições elétricas do domicílio.'
    ],
    fontes: FONTES, atualizadoEm: ATUAL
  });
})();

// ============================================================= FERRAMENTAS
PED.data.acidentes.ferramentas.lundBrowder = {
  nota: 'Tabela de Lund-Browder para estimativa da superfície corporal queimada em crianças. Usar esta tabela, e não a regra dos nove do adulto: na criança pequena a cabeça representa proporcionalmente muito mais e os membros inferiores muito menos da superfície corporal, de modo que a regra dos nove superestima os membros e subestima a cabeça, com erro importante no cálculo da reposição volêmica. Somar apenas as áreas de segundo e de terceiro graus; o eritema de primeiro grau não entra no cálculo. Reavaliar a estimativa em 24 a 72 horas, porque a profundidade e a extensão podem mudar.',
  faixas: [
    { idade: '0 a 1 ano', cabeca: 19, cabecaMetade: 9.5, coxaCada: 5.5, coxaMetade: 2.75, pernaCada: 5, pernaMetade: 2.5 },
    { idade: '1 a 4 anos', cabeca: 17, cabecaMetade: 8.5, coxaCada: 6.5, coxaMetade: 3.25, pernaCada: 5, pernaMetade: 2.5 },
    { idade: '5 a 9 anos', cabeca: 13, cabecaMetade: 6.5, coxaCada: 8, coxaMetade: 4, pernaCada: 5.5, pernaMetade: 2.75 },
    { idade: '10 a 14 anos', cabeca: 11, cabecaMetade: 5.5, coxaCada: 8.5, coxaMetade: 4.25, pernaCada: 6, pernaMetade: 3 },
    { idade: '15 anos', cabeca: 9, cabecaMetade: 4.5, coxaCada: 9, coxaMetade: 4.5, pernaCada: 6.5, pernaMetade: 3.25 },
    { idade: 'Adulto', cabeca: 7, cabecaMetade: 3.5, coxaCada: 9.5, coxaMetade: 4.75, pernaCada: 7, pernaMetade: 3.5 }
  ],
  segmentosFixos: [
    { segmento: 'Pescoço', pct: 2 },
    { segmento: 'Tronco anterior', pct: 13 },
    { segmento: 'Tronco posterior', pct: 13 },
    { segmento: 'Nádega (cada)', pct: 2.5 },
    { segmento: 'Genitália', pct: 1 },
    { segmento: 'Braço, do ombro ao cotovelo (cada)', pct: 4 },
    { segmento: 'Antebraço (cada)', pct: 3 },
    { segmento: 'Mão (cada)', pct: 2.5 },
    { segmento: 'Pé (cada)', pct: 3.5 }
  ],
  regraPalma: 'A palma da mão da criança, incluindo os dedos, corresponde a cerca de 1% da superfície corporal e serve para estimar queimaduras pequenas ou salpicadas.',
  observacoes: [
    'A soma de todos os segmentos, com os valores de cabeça, coxas e pernas da faixa etária correspondente, totaliza 100%.',
    'Registrar a estimativa em um mapa corporal e no prontuário, com data e horário, para permitir comparação nas reavaliações.',
    'Em queimaduras extensas e irregulares, pode ser mais preciso estimar a área poupada e subtrair de 100%.'
  ],
  fontes: [
    { nome: 'Lund C.C., Browder N.C. – The estimation of areas of burns, Surgery, Gynecology and Obstetrics', ano: 1944 },
    { nome: 'Cartilha para tratamento de emergência das queimaduras – Ministério da Saúde', ano: 2012 },
    { nome: 'Tratado de Pediatria – Sociedade Brasileira de Pediatria', ano: 2022 }
  ],
  atualizadoEm: '2026-09'
};

PED.data.acidentes.ferramentas.parkland = {
  formula: '4 mL x peso (kg) x % de superfície corporal queimada de Ringer lactato nas primeiras 24 horas, sendo metade do volume nas primeiras 8 horas contadas a partir do horário da queimadura e a outra metade nas 16 horas seguintes.',
  exemplo: 'Criança de 12 kg com 20% de superfície queimada: 4 x 12 x 20 = 960 mL de Ringer lactato em 24 h, sendo 480 mL nas primeiras 8 h a partir do horário da queimadura (cerca de 60 mL/h) e 480 mL nas 16 h seguintes (cerca de 30 mL/h), acrescidos do volume de manutenção calculado para o peso.',
  observacoes: [
    'Na criança, o volume de manutenção deve ser SOMADO ao volume da fórmula: a fórmula de Parkland foi concebida para adultos e não contempla as necessidades hídricas basais, proporcionalmente maiores na criança.',
    'Em menores de cerca de 20 a 30 kg, a manutenção deve conter glicose, pelo risco de hipoglicemia em jejum e estado hipermetabólico; monitorizar a glicemia capilar.',
    'As 8 horas iniciais são contadas a partir do horário da queimadura, e não da chegada ao serviço: se a criança chegou 3 horas depois, a primeira metade deve ser infundida nas 5 horas restantes.',
    'A fórmula é apenas um ponto de partida. Ajustar pela resposta clínica: alvo habitual de diurese de 1 a 2 mL/kg/h em crianças menores de 30 kg e de 0,5 a 1 mL/kg/h nas maiores, com reavaliação de perfusão, frequência cardíaca, nível de consciência e lactato.',
    'Evitar tanto a sub-reposição quanto a hiper-reposição; o excesso de volume agrava o edema, inclusive de via aérea, e piora a evolução.',
    'Considerar o início da reposição formal em queimaduras de segundo e terceiro graus a partir de cerca de 10 a 15% da superfície corporal em crianças, conforme o protocolo do serviço.',
    'Na queimadura elétrica, as necessidades são habitualmente maiores do que a fórmula prevê, porque o dano muscular profundo não aparece na superfície; guiar pela diurese, pela CPK e pela perfusão.',
    'Considerar sondagem vesical para medida horária da diurese nas queimaduras extensas.'
  ],
  fontes: [
    { nome: 'Cartilha para tratamento de emergência das queimaduras – Ministério da Saúde', ano: 2012 },
    { nome: 'Tratado de Pediatria – Sociedade Brasileira de Pediatria', ano: 2022 },
    { nome: 'Nelson Textbook of Pediatrics', ano: 2020 }
  ],
  atualizadoEm: '2026-09'
};

PED.data.acidentes.ferramentas.pecarn = {
  menor2anos: {
    criteriosAltoRisco: [
      'Escala de coma de Glasgow igual ou menor que 14.',
      'Alteração do estado mental: agitação, sonolência, resposta lentificada ou perguntas repetitivas.',
      'Fratura craniana palpável.'
    ],
    criteriosIntermediarios: [
      'Hematoma de couro cabeludo occipital, parietal ou temporal (o hematoma frontal isolado tem menor risco).',
      'Perda de consciência por 5 segundos ou mais.',
      'Mecanismo grave de trauma.',
      'Comportamento diferente do habitual segundo os pais ou o cuidador.'
    ],
    conduta: {
      altoRisco: 'Presença de qualquer critério de alto risco: considerar tomografia de crânio.',
      intermediario: 'Presença apenas de critérios intermediários: considerar observação em serviço por 4 a 6 horas com reavaliações seriadas OU tomografia, conforme o número de critérios presentes, a piora dos sintomas, a idade menor de 3 meses, a experiência do profissional, a distância do domicílio e a possibilidade de retorno, e a preferência dos pais após informação.',
      semCriterios: 'Ausência de todos os critérios: risco de lesão intracraniana clinicamente importante muito baixo; considerar não realizar tomografia e liberar com observação domiciliar orientada, desde que haja acompanhante confiável e possibilidade de retorno.'
    }
  },
  maior2anos: {
    criteriosAltoRisco: [
      'Escala de coma de Glasgow igual ou menor que 14.',
      'Alteração do estado mental.',
      'Sinais de fratura de base de crânio: hematoma periorbitário bilateral, hematoma retroauricular, hemotímpano, saída de líquido claro ou de sangue pelo nariz ou pelo ouvido.'
    ],
    criteriosIntermediarios: [
      'Perda de consciência.',
      'Vômitos.',
      'Mecanismo grave de trauma.',
      'Cefaleia intensa.'
    ],
    conduta: {
      altoRisco: 'Presença de qualquer critério de alto risco: considerar tomografia de crânio.',
      intermediario: 'Presença apenas de critérios intermediários: considerar observação por 4 a 6 horas com reavaliações seriadas OU tomografia, com os mesmos elementos de julgamento.',
      semCriterios: 'Ausência de todos os critérios: risco muito baixo; considerar não realizar tomografia e liberar com observação domiciliar orientada.'
    }
  },
  mecanismoGrave: [
    'Acidente com veículo motorizado com ejeção do ocupante, capotamento ou óbito de outro ocupante.',
    'Pedestre ou ciclista sem capacete atingido por veículo motorizado.',
    'Queda de mais de 0,9 metro (cerca de 3 pés) em menores de 2 anos.',
    'Queda de mais de 1,5 metro (cerca de 5 pés) em maiores de 2 anos.',
    'Cabeça atingida por objeto de alto impacto.'
  ],
  nota: 'A regra PECARN é uma ferramenta de apoio à decisão para identificar crianças com risco muito baixo de lesão intracraniana clinicamente importante e evitar tomografias desnecessárias, e não substitui o julgamento clínico nem a reavaliação seriada. Foi validada para traumatismo craniano com apresentação em até 24 horas e não se aplica a trauma penetrante, a distúrbio de coagulação conhecido, a uso de anticoagulante, a tumor cerebral e a crianças com derivação ventricular. A deterioração durante a observação, e não apenas a avaliação inicial, é o que frequentemente indica a tomografia. Em serviços sem tomógrafo, considerar observação prolongada e transferência diante de qualquer critério de alto risco.',
  fontes: [
    { nome: 'Kuppermann N. et al. – Identification of children at very low risk of clinically-important brain injuries after head trauma: a prospective cohort study (PECARN), The Lancet', ano: 2009 },
    { nome: 'Tratado de Pediatria – Sociedade Brasileira de Pediatria', ano: 2022 },
    { nome: 'Nelson Textbook of Pediatrics', ano: 2020 }
  ],
  atualizadoEm: '2026-09'
};

PED.data.acidentes.ferramentas.profilaxiaRaiva = {
  nota: 'Apoio à decisão baseado nas normas do Ministério da Saúde. A raiva é praticamente sempre fatal e inteiramente prevenível: a decisão sobre a profilaxia deve ser tomada na primeira avaliação e nunca adiada. O esquema vigente foi atualizado pelo Ministério da Saúde e deve ser confirmado na Nota Técnica e no Guia de Vigilância em Saúde vigentes, bem como com a vigilância epidemiológica municipal. Atendimento antirrábico é de notificação compulsória.',
  primeiroCuidado: 'Lavagem imediata e abundante do ferimento com água corrente e sabão, de forma mecanicamente vigorosa, por pelo menos 15 minutos. É a medida isolada mais eficaz para reduzir o risco de raiva e deve ser feita antes de qualquer outra conduta.',
  tiposExposicao: [
    {
      tipo: 'Contato indireto',
      exemplos: ['Manipulação de utensílios contaminados', 'Contato com pelo do animal', 'Lambedura de pele íntegra, sem lesão'],
      conduta: 'Lavar com água e sabão. Não há indicação de profilaxia antirrábica, nem de vacina nem de soro. Orientar e registrar.'
    },
    {
      tipo: 'Acidente leve',
      exemplos: ['Ferimento superficial, pouco extenso e geralmente único, em tronco ou em membros, exceto mãos, polpas digitais e planta do pé', 'Arranhadura superficial causada por unha ou dente', 'Lambedura de pele com lesão superficial'],
      conduta: 'Conduzir conforme a condição do animal: com cão ou gato sadio e passível de observação por 10 dias, considerar observar o animal ou iniciar esquema reduzido conforme a norma vigente; com animal suspeito, raivoso, morto, desaparecido, silvestre, morcego ou primata não humano, considerar o esquema completo de vacina. Confirmar conforme a Nota Técnica vigente do Ministério da Saúde.'
    },
    {
      tipo: 'Acidente grave',
      exemplos: ['Ferimento em cabeça, face, pescoço, mãos, polpas digitais ou planta do pé', 'Ferimento profundo, múltiplo ou extenso, em qualquer região', 'Lambedura de mucosa', 'Lambedura de pele com lesão grave', 'Qualquer exposição a morcego, a primata não humano (macaco, sagui) ou a animal silvestre, independentemente do aspecto da lesão', 'Ferimento por animal de produção não vacinado ou com suspeita'],
      conduta: 'Considerar soro antirrábico associado ao esquema de vacina, conforme a condição do animal e a norma vigente, infiltrando a maior quantidade possível do soro na ferida e ao redor dela. Confirmar conforme a Nota Técnica vigente do Ministério da Saúde.'
    }
  ],
  condicaoAnimal: [
    { situacao: 'Cão ou gato sadio, sem sinais sugestivos de raiva e passível de observação por 10 dias', conduta: 'Observar o animal por 10 dias, mantendo-o vivo e sob vigilância. Em acidente leve, pode-se adotar a observação com ou sem início de esquema reduzido; em acidente grave, considerar iniciar a profilaxia e reavaliar conforme a evolução do animal. Se o animal permanecer sadio ao final dos 10 dias, considerar encerrar o esquema; se adoecer, morrer, desaparecer ou apresentar comportamento alterado, completar o esquema indicado. Confirmar conforme a norma vigente.', verificar: true },
    { situacao: 'Cão ou gato clinicamente suspeito de raiva no momento da agressão', conduta: 'Considerar iniciar a profilaxia imediatamente e manter a observação do animal; completar ou suspender o esquema conforme a evolução do animal e a norma vigente.', verificar: true },
    { situacao: 'Cão ou gato raivoso, morto, desaparecido, errante, desconhecido ou impossível de observar', conduta: 'Considerar o esquema completo de vacina, com soro nos acidentes graves.', verificar: true },
    { situacao: 'Morcego de qualquer espécie, inclusive contato sem ferimento aparente', conduta: 'Sempre considerada exposição grave: considerar soro e esquema completo de vacina, mesmo sem lesão visível, e acionar a vigilância ambiental.', verificar: false },
    { situacao: 'Primata não humano (macaco, sagui) e animais silvestres (raposa, quati, guaxinim, jaritataca)', conduta: 'Sempre considerada exposição grave: considerar soro e esquema completo de vacina; esses animais não são passíveis de observação.', verificar: false },
    { situacao: 'Animais de produção (bovino, equino, suíno, caprino, ovino)', conduta: 'Avaliar a situação epidemiológica local, a vacinação do rebanho e a condição do animal, em conjunto com a vigilância; considerar profilaxia conforme a gravidade da exposição.', verificar: true },
    { situacao: 'Roedores urbanos e sinantrópicos (rato, camundongo, cobaia) e lagomorfos (coelho)', conduta: 'Não há indicação de profilaxia antirrábica nessas exposições, conforme as normas do Ministério da Saúde; avaliar profilaxia antitetânica e cuidado da ferida.', verificar: false },
    { situacao: 'Criança que já recebeu esquema completo de profilaxia antirrábica anteriormente', conduta: 'Considerar esquema reduzido de reforço, sem soro, conforme a norma vigente e o intervalo desde o esquema anterior. Confirmar conforme a Nota Técnica vigente.', verificar: true }
  ],
  esquema: 'Esquema de profilaxia pós-exposição com vacina antirrábica de cultivo celular por via intramuscular, em músculo deltoide ou, em menores de 2 anos, na face anterolateral da coxa. Nunca aplicar na região glútea. O esquema vigente do Ministério da Saúde prevê 4 doses, nos dias 0, 3, 7 e 14, e um esquema reduzido de 2 doses, nos dias 0 e 3, associado à observação do animal em situações definidas. Confirmar o esquema, o número de doses e os intervalos conforme a Nota Técnica e o Guia de Vigilância em Saúde vigentes, porque o esquema foi atualizado e pode ser revisto.',
  soro: 'Soro antirrábico heterólogo (SAR) na dose de 40 UI/kg ou imunoglobulina humana antirrábica (IGHAR) na dose de 20 UI/kg, em dose única, infiltrando a maior quantidade possível dentro da ferida e ao redor dela e aplicando o restante por via intramuscular em local distante da vacina. Quando não houver soro disponível no momento, considerar iniciar a vacina e completar o soro o quanto antes, até o prazo previsto na norma vigente. Nunca aplicar o soro na mesma seringa nem no mesmo local da vacina. Manter material e equipe preparados para o manejo de anafilaxia durante a aplicação do soro heterólogo.',
  observacoes: [
    'A decisão sobre a profilaxia é independente da decisão sobre o antibiótico e sobre a sutura: as três são avaliadas em toda mordedura.',
    'A profilaxia antitetânica também deve ser avaliada em toda mordedura, conforme a situação vacinal.',
    'Não suspender a profilaxia por conta própria porque o animal parece bem: seguir a orientação da equipe e da vigilância até a liberação formal.',
    'Orientar a família a comunicar imediatamente qualquer adoecimento, alteração de comportamento, fuga ou morte do animal durante os 10 dias de observação.',
    'Não sacrificar o animal agressor passível de observação: ele é a principal fonte de informação para decidir a continuidade do esquema.',
    'Morcego encontrado no chão, em voo diurno ou dentro de casa não deve ser tocado; acionar a vigilância ambiental.',
    'Registrar todas as doses no cartão da criança e notificar o atendimento antirrábico.',
    'Em caso de dúvida, contatar a vigilância epidemiológica municipal ou estadual e consultar o Guia de Vigilância em Saúde vigente.'
  ],
  fontes: [
    { nome: 'Normas Técnicas de Profilaxia da Raiva Humana – Ministério da Saúde', ano: 2014 },
    { nome: 'Nota Informativa sobre o esquema de profilaxia antirrábica humana pós-exposição – Ministério da Saúde', ano: 2022 },
    { nome: 'Guia de Vigilância em Saúde, capítulo de raiva – Ministério da Saúde', ano: 2024 },
    { nome: 'OMS – WHO Expert Consultation on Rabies, third report', ano: 2018 }
  ],
  atualizadoEm: '2026-09'
};

PED.data.acidentes.ferramentas.profilaxiaTetano = {
  nota: 'Apoio à decisão conforme as orientações do Ministério da Saúde para profilaxia do tétano acidental. Considerar sempre a situação vacinal documentada na caderneta e a característica do ferimento. Em crianças menores de 7 anos, usar as vacinas do calendário infantil (pentavalente ou DTP conforme a idade); a partir de 7 anos, usar dT ou dTpa, conforme a disponibilidade e o calendário vigente.',
  ferimentoLimpoDefinicao: 'Ferimento superficial, limpo, com bordas regulares, sem corpo estranho, sem tecido desvitalizado e de atendimento precoce.',
  ferimentoSujoDefinicao: 'Ferimento profundo, extenso, com bordas irregulares, contaminado com terra, poeira, fezes, saliva ou material orgânico, com corpo estranho ou tecido desvitalizado, puntiforme, por mordedura, por queimadura, por arma de fogo, por esmagamento, com necrose ou de atendimento tardio.',
  tabela: [
    { situacaoVacinal: 'Menos de 3 doses ou situação vacinal desconhecida', ferimentoLimpo: 'Vacinar: aplicar dose e completar o esquema básico conforme a idade. Não indicar soro nem imunoglobulina.', ferimentoSujo: 'Vacinar: aplicar dose e completar o esquema básico. Indicar soro antitetânico (SAT) ou imunoglobulina humana antitetânica (IGHAT), conforme disponibilidade e as normas do Ministério da Saúde.' },
    { situacaoVacinal: '3 doses ou mais, com a última dose há menos de 5 anos', ferimentoLimpo: 'Não vacinar e não indicar soro nem imunoglobulina.', ferimentoSujo: 'Não vacinar e não indicar soro nem imunoglobulina.' },
    { situacaoVacinal: '3 doses ou mais, com a última dose entre 5 e 10 anos', ferimentoLimpo: 'Não vacinar e não indicar soro nem imunoglobulina.', ferimentoSujo: 'Vacinar: aplicar 1 dose de reforço. Não indicar soro nem imunoglobulina.' },
    { situacaoVacinal: '3 doses ou mais, com a última dose há mais de 10 anos', ferimentoLimpo: 'Vacinar: aplicar 1 dose de reforço. Não indicar soro nem imunoglobulina.', ferimentoSujo: 'Vacinar: aplicar 1 dose de reforço. Considerar soro ou imunoglobulina em situações especiais, conforme avaliação e normas do Ministério da Saúde.' }
  ],
  situacoesEspeciais: [
    'Considerar soro ou imunoglobulina, mesmo em criança com esquema vacinal adequado, em situações especiais definidas pelo Ministério da Saúde, como imunodepressão, desnutrição grave e ferimento com alto risco associado a dúvida sobre a resposta vacinal. Confirmar conforme a norma vigente.',
    'A imunoglobulina humana antitetânica (IGHAT) é preferida em pessoas com história de hipersensibilidade a soro heterólogo e é disponibilizada pelos CRIE, conforme os critérios vigentes.',
    'A limpeza e o desbridamento adequados do ferimento são parte essencial da profilaxia do tétano e não devem ser substituídos pela imunização.',
    'Registrar sempre a dose aplicada na caderneta de vacinação e aproveitar o atendimento para atualizar o calendário vacinal completo da criança.',
    'O tétano acidental é de notificação compulsória.'
  ],
  fontes: [
    { nome: 'Guia de Vigilância em Saúde, capítulo de tétano acidental – Ministério da Saúde', ano: 2024 },
    { nome: 'Calendário Nacional de Vacinação e Manual dos Centros de Referência para Imunobiológicos Especiais (CRIE) – Ministério da Saúde', ano: 2023 }
  ],
  atualizadoEm: '2026-09'
};

PED.data.acidentes.ferramentas.agentesToxicos = [
  { agente: 'Paracetamol', doseToxica: 'Ingestão aguda a partir de cerca de 150 mg/kg (alguns protocolos pediátricos usam 200 mg/kg em crianças pequenas e hígidas) ou dose desconhecida.', quadro: 'Pobre em sintomas nas primeiras 24 h ou apenas náusea e vômitos; entre 24 e 72 h, dor em hipocôndrio direito e elevação de transaminases; após 72 h, hepatotoxicidade com icterícia, coagulopatia e encefalopatia.', antidoto: 'N-acetilcisteína', carvao: 'indicado até 1 a 2 h', conduta: 'Considerar dosagem sérica a partir de 4 h da ingestão e interpretar no nomograma de Rumack-Matthew; iniciar N-acetilcisteína quando indicado ou empiricamente se a dosagem não estiver disponível. O nomograma não se aplica a ingestões crônicas, repetidas ou de horário desconhecido. Orientar-se pelo CIATox.', verificar: true },
  { agente: 'Antidepressivo tricíclico (amitriptilina, imipramina, nortriptilina, clomipramina)', doseToxica: 'Um único comprimido de adulto pode ser letal em lactente. Toxicidade descrita a partir de cerca de 5 mg/kg e risco de morte acima de cerca de 10 a 20 mg/kg.', quadro: 'Síndrome anticolinérgica, taquicardia, alargamento do QRS, hipotensão, convulsão e coma, com deterioração rápida em 1 a 2 h.', antidoto: 'Bicarbonato de sódio (para alargamento do QRS e arritmia)', carvao: 'indicado até 1 a 2 h, com via aérea protegida', conduta: 'Considerar eletrocardiograma imediato e seriado, monitorização contínua e internação mesmo em criança assintomática. Evitar antiarrítmicos da classe IA e IC. Orientar-se pelo CIATox.', verificar: true },
  { agente: 'Bloqueador de canal de cálcio (verapamil, diltiazem, nifedipino, anlodipino)', doseToxica: 'Um a dois comprimidos de adulto, sobretudo de liberação prolongada, podem ser letais em criança pequena.', quadro: 'Bradicardia, bloqueio atrioventricular, hipotensão refratária, choque e hiperglicemia (a hiperglicemia ajuda a diferenciar do betabloqueador).', antidoto: 'Cálcio, glucagon e insulina em altas doses com glicose (terapia euglicêmica), conforme protocolo', carvao: 'indicado até 1 a 2 h; considerar doses repetidas em formulações de liberação prolongada', conduta: 'Considerar internação e monitorização prolongada mesmo em criança assintomática, sobretudo em formulação de liberação prolongada. Orientar-se pelo CIATox.', verificar: true },
  { agente: 'Betabloqueador (propranolol, atenolol, metoprolol)', doseToxica: 'Pequenas quantidades podem ser letais em criança pequena, especialmente o propranolol, que é lipofílico e atravessa a barreira hematoencefálica.', quadro: 'Bradicardia, hipotensão, broncoespasmo, hipoglicemia, convulsão, coma e, no propranolol, alargamento do QRS.', antidoto: 'Glucagon; considerar insulina em altas doses com glicose, cálcio e vasopressores conforme protocolo', carvao: 'indicado até 1 a 2 h', conduta: 'Considerar eletrocardiograma, monitorização contínua, controle de glicemia e internação mesmo em criança assintomática. Orientar-se pelo CIATox.', verificar: true },
  { agente: 'Opioide (metadona, morfina, codeína, tramadol, fentanil transdérmico)', doseToxica: 'Um comprimido ou um adesivo pode ser letal em criança pequena; a metadona é especialmente perigosa pela meia-vida longa.', quadro: 'Miose puntiforme, bradipneia, sonolência, coma, hipotensão e edema pulmonar não cardiogênico.', antidoto: 'Naloxona', carvao: 'indicado até 1 a 2 h, com via aérea protegida', conduta: 'Considerar suporte ventilatório e naloxona repetida ou em infusão, pois a duração do opioide costuma exceder a da naloxona; observação prolongada em metadona e em formulações de liberação prolongada. Orientar-se pelo CIATox.', verificar: true },
  { agente: 'Hipoglicemiante oral do grupo das sulfonilureias (glibenclamida, glimepirida, clorpropamida)', doseToxica: 'Um único comprimido pode causar hipoglicemia grave e prolongada em criança pequena.', quadro: 'Hipoglicemia de início por vezes tardio, com sudorese, palidez, tremor, irritabilidade, convulsão e coma; recorre por muitas horas após a correção.', antidoto: 'Glicose; octreotida na hipoglicemia refratária ou recorrente', carvao: 'indicado até 1 a 2 h', conduta: 'Considerar internação com controle seriado de glicemia por pelo menos 24 h, mesmo em criança assintomática, e manter infusão contínua de glicose. Orientar-se pelo CIATox.', verificar: true },
  { agente: 'Antiarrítmico (flecainida, propafenona, quinidina, amiodarona, sotalol)', doseToxica: 'Pequenas quantidades podem ser letais em criança pequena.', quadro: 'Arritmia ventricular, alargamento do QRS, prolongamento do QT, bradicardia, bloqueio, hipotensão e parada cardiorrespiratória.', antidoto: 'Não há antídoto universal; considerar bicarbonato de sódio no alargamento do QRS e magnésio no QT prolongado, conforme protocolo', carvao: 'indicado até 1 a 2 h', conduta: 'Considerar monitorização contínua, eletrocardiograma seriado e internação mesmo em criança assintomática. Orientar-se pelo CIATox.', verificar: true },
  { agente: 'Cânfora (presente em pomadas e em produtos de uso tópico caseiro)', doseToxica: 'Convulsão descrita com doses baixas, em torno de 30 mg/kg; pequenas quantidades ingeridas podem ser graves em criança pequena.', quadro: 'Queimação oral, náusea, vômitos, agitação e convulsão de início precoce, habitualmente nos primeiros 30 a 90 minutos; pode evoluir com depressão do sistema nervoso central.', antidoto: 'Não há antídoto específico', carvao: 'benefício incerto; decidir com o CIATox', conduta: 'Considerar observação hospitalar mesmo em criança assintomática, pelo risco de convulsão precoce, e tratar as crises com benzodiazepínico. Orientar-se pelo CIATox.', verificar: true },
  { agente: 'Teofilina e aminofilina', doseToxica: 'Pequenas quantidades podem causar toxicidade grave; risco maior em formulações de liberação prolongada.', quadro: 'Vômitos repetidos, taquicardia, agitação, tremor, hipocalemia, hiperglicemia, convulsão de difícil controle e arritmia.', antidoto: 'Não há antídoto; considerar hemodiálise ou hemoperfusão em intoxicação grave, conforme protocolo', carvao: 'indicado, inclusive em doses repetidas, conforme orientação do CIATox', conduta: 'Considerar monitorização, correção de potássio, controle de convulsões e internação. Orientar-se pelo CIATox.', verificar: true },
  { agente: 'Clonidina e imidazolínicos (descongestionante nasal com nafazolina, oximetazolina, tetrahidrozolina)', doseToxica: 'Poucas gotas de descongestionante nasal ou um comprimido de clonidina podem causar quadro grave em lactente.', quadro: 'Sonolência, hipotonia, miose, bradicardia, hipotensão, hipotermia e apneia, com quadro que simula intoxicação opioide.', antidoto: 'Não há antídoto consolidado; a naloxona tem resposta variável e pode ser tentada conforme protocolo', carvao: 'indicado até 1 h, com via aérea protegida', conduta: 'Considerar suporte, monitorização e internação; o quadro pode ser prolongado e flutuante. Orientar-se pelo CIATox.', verificar: true },
  { agente: 'Salicilato (ácido acetilsalicílico e metilsalicilato de uso tópico)', doseToxica: 'Ingestão aguda acima de cerca de 150 mg/kg. O metilsalicilato é muito concentrado: pequenos volumes equivalem a vários comprimidos.', quadro: 'Vômitos, zumbido, taquipneia, sudorese, agitação, alcalose respiratória seguida de acidose metabólica, hipertermia, convulsão e coma.', antidoto: 'Não há antídoto; considerar alcalinização urinária e hemodiálise conforme protocolo', carvao: 'indicado, podendo ser repetido conforme orientação do CIATox', conduta: 'Considerar gasometria e eletrólitos seriados, hidratação, reposição de potássio e avaliação de método dialítico na intoxicação grave. Orientar-se pelo CIATox.', verificar: true },
  { agente: 'Ferro (sulfato ferroso e polivitamínicos com ferro)', doseToxica: 'Toxicidade a partir de cerca de 20 mg/kg de ferro elementar e quadro grave acima de cerca de 60 mg/kg.', quadro: 'Vômitos e diarreia, por vezes com sangue, nas primeiras 6 h; período de aparente melhora enganoso entre 6 e 24 h; depois choque, acidose metabólica, hepatotoxicidade e, tardiamente, estenose pilórica cicatricial.', antidoto: 'Deferoxamina', carvao: 'não indicado (o carvão não adsorve ferro)', conduta: 'Considerar radiografia de abdome (comprimidos são radiopacos), controle de glicemia, gasometria e ferro sérico quando disponível; internar mesmo na fase de aparente melhora. Orientar-se pelo CIATox.', verificar: true },
  { agente: 'Benzodiazepínico (diazepam, clonazepam, midazolam)', doseToxica: 'Habitualmente de baixa letalidade isolado na criança; o risco aumenta muito com coingestão de outro depressor ou de álcool.', quadro: 'Sonolência, ataxia, fala arrastada, hipotonia e, em doses altas ou com coingestão, depressão respiratória.', antidoto: 'Flumazenil, de uso muito restrito pelo risco de convulsão e de abstinência', carvao: 'indicado até 1 h, com via aérea protegida', conduta: 'Considerar suporte e observação; evitar flumazenil de rotina, especialmente em uso crônico ou em suspeita de coingestão de tricíclico. Orientar-se pelo CIATox.', verificar: true },
  { agente: 'Carbamazepina e outros anticonvulsivantes', doseToxica: 'Variável; ingestões de dose de adulto podem ser tóxicas em criança pequena.', quadro: 'Ataxia, nistagmo, sonolência, coma, convulsão paradoxal, alargamento do QRS e hiponatremia.', antidoto: 'Não há antídoto específico', carvao: 'indicado, inclusive em doses repetidas na carbamazepina, conforme orientação do CIATox', conduta: 'Considerar dosagem sérica quando disponível, monitorização e observação prolongada pela absorção errática. Orientar-se pelo CIATox.', verificar: true },
  { agente: 'Antipsicótico e antieméticos dopaminérgicos (haloperidol, risperidona, metoclopramida, bromoprida)', doseToxica: 'Reação distônica pode ocorrer com doses terapêuticas em crianças suscetíveis.', quadro: 'Distonia aguda, crise oculogírica, torcicolo, trismo, sonolência, hipotensão, prolongamento do QT e, raramente, síndrome neuroléptica maligna.', antidoto: 'Biperideno ou difenidramina para a distonia aguda', carvao: 'indicado até 1 a 2 h', conduta: 'Considerar eletrocardiograma com medida de QTc e observação; a distonia responde rapidamente ao anticolinérgico. Orientar-se pelo CIATox.', verificar: true },
  { agente: 'Anti-histamínico de primeira geração (difenidramina, prometazina, dexclorfeniramina)', doseToxica: 'Doses acima de 3 a 5 vezes a terapêutica; lactentes são particularmente sensíveis.', quadro: 'Síndrome anticolinérgica com midríase, pele seca e quente, febre, retenção urinária, agitação, alucinação, taquicardia, convulsão e, em doses altas, alargamento do QRS.', antidoto: 'Não há antídoto de rotina; fisostigmina tem uso restrito e disponibilidade limitada', carvao: 'indicado até 1 a 2 h', conduta: 'Considerar monitorização, controle de temperatura, benzodiazepínico para agitação e eletrocardiograma. A prometazina deve ser evitada em menores de 2 anos, conforme bula. Orientar-se pelo CIATox.', verificar: true },
  { agente: 'Ibuprofeno e outros anti-inflamatórios não esteroidais', doseToxica: 'Sintomas habitualmente a partir de cerca de 100 mg/kg de ibuprofeno; risco de gravidade acima de cerca de 400 mg/kg.', quadro: 'Dor abdominal, vômitos, sangramento digestivo, e em ingestões grandes, acidose metabólica, lesão renal aguda, sonolência e convulsão.', antidoto: 'Não há antídoto específico', carvao: 'indicado até 1 a 2 h', conduta: 'Considerar hidratação, proteção gástrica, controle de função renal e observação. Orientar-se pelo CIATox.', verificar: true },
  { agente: 'Antimalárico (cloroquina, hidroxicloroquina, quinina)', doseToxica: 'Pequenas quantidades podem ser letais em criança pequena; a cloroquina tem margem estreita.', quadro: 'Vômitos, alteração visual, hipotensão, hipocalemia, alargamento do QRS, prolongamento do QT, arritmia e parada cardiorrespiratória de instalação rápida.', antidoto: 'Não há antídoto; considerar bicarbonato de sódio, reposição cuidadosa de potássio e suporte avançado conforme protocolo', carvao: 'indicado até 1 a 2 h', conduta: 'Considerar monitorização contínua e internação mesmo em criança assintomática. Orientar-se pelo CIATox.', verificar: true },
  { agente: 'Álcool etílico (bebida, perfume, enxaguante bucal, álcool em gel)', doseToxica: 'Quantidades pequenas causam hipoglicemia grave em crianças menores de 5 anos.', quadro: 'Hálito etílico, desinibição, ataxia, vômitos, rebaixamento, hipotermia, hipoglicemia e convulsão.', antidoto: 'Não há antídoto; glicose é a medida essencial', carvao: 'não indicado (o carvão não adsorve álcool)', conduta: 'Considerar controle seriado de glicemia, aquecimento, hidratação e observação até a normalização. Orientar-se pelo CIATox.', verificar: false },
  { agente: 'Metanol e bebida adulterada', doseToxica: 'Pequenos volumes podem causar cegueira e morte.', quadro: 'Latência de 12 a 24 h, seguida de cefaleia, alteração visual, dor abdominal, acidose metabólica com ânion gap elevado, coma e convulsão.', antidoto: 'Etanol ou fomepizol, conforme disponibilidade e protocolo; considerar hemodiálise', carvao: 'não indicado', conduta: 'Emergência: considerar gasometria, cálculo do ânion gap, antídoto precoce e avaliação de hemodiálise. Orientar-se pelo CIATox.', verificar: true },
  { agente: 'Cáusticos (soda cáustica, desentupidor, limpa-forno, ácido muriático, ácido de bateria) e hipoclorito de sódio (água sanitária)', doseToxica: 'Qualquer quantidade de cáustico concentrado pode causar lesão grave. A água sanitária de uso doméstico, em concentração habitual, costuma causar apenas irritação; produtos concentrados e misturas com ácido são perigosos.', quadro: 'Cáustico: dor oral imediata, sialorreia, disfagia, lesão esbranquiçada ou enegrecida em mucosa, vômitos, estridor e dor torácica, com risco tardio de estenose esofágica. Hipoclorito doméstico: irritação de boca e garganta, náusea e vômitos; a mistura com ácido libera cloro, com tosse, dispneia e irritação ocular intensa.', antidoto: 'Não há antídoto', carvao: 'contraindicado', conduta: 'Não provocar vômito, não neutralizar e não diluir. Em cáustico, considerar endoscopia entre 12 e 24 h e evitá-la entre o quinto e o décimo quarto dia. Em hipoclorito doméstico, considerar lavagem da boca, oferta de líquidos conforme tolerância e observação; em inalação de cloro, retirar do ambiente e ofertar oxigênio. Orientar-se pelo CIATox.', verificar: false },
  { agente: 'Hidrocarbonetos (querosene, diesel, gasolina, aguarrás, thinner, fluido de isqueiro)', doseToxica: 'O risco principal é a aspiração, e não a quantidade ingerida: pequenos volumes aspirados causam pneumonite grave.', quadro: 'Tosse e engasgo no momento da ingestão, seguidos em horas de taquipneia, febre, hipoxemia e sibilância; sonolência e convulsão em ingestões volumosas.', antidoto: 'Não há antídoto', carvao: 'contraindicado', conduta: 'Jamais provocar vômito e jamais fazer lavagem gástrica. Considerar oxigênio, observação de 6 a 12 h e radiografia de tórax após 4 a 6 h se sintomático; sem antibiótico nem corticoide de rotina. Orientar-se pelo CIATox.', verificar: false },
  { agente: 'Inseticida organofosforado', doseToxica: 'Variável conforme o produto; exposição oral, dérmica ou inalatória pode ser grave.', quadro: 'Síndrome colinérgica: miose puntiforme, sialorreia, lacrimejamento, sudorese, broncorreia, broncoespasmo, vômitos, diarreia, bradicardia, fasciculações, fraqueza, convulsão e insuficiência respiratória.', antidoto: 'Atropina titulada até secar as secreções brônquicas; pralidoxima o mais precoce possível', carvao: 'considerar, conforme orientação do CIATox e com via aérea protegida', conduta: 'Retirar as roupas e lavar pele e cabelos com água e sabão, com proteção da equipe. Titular a atropina pelo objetivo respiratório, e não pela frequência cardíaca nem pela pupila. Evitar succinilcolina na intubação. Orientar-se pelo CIATox.', verificar: true },
  { agente: 'Carbamato, incluindo o raticida clandestino conhecido como chumbinho', doseToxica: 'Pequenas quantidades são graves; produto sem rótulo, de composição incerta e alta letalidade.', quadro: 'Síndrome colinérgica de instalação rápida, indistinguível da do organofosforado, porém com duração habitualmente mais curta.', antidoto: 'Atropina titulada; a pralidoxima em geral não é necessária no carbamato', carvao: 'considerar, conforme orientação do CIATox', conduta: 'Mesma abordagem do organofosforado, com descontaminação externa e suporte ventilatório. Notificar e acionar a vigilância sanitária pelo comércio ilegal. Orientar-se pelo CIATox.', verificar: true },
  { agente: 'Piretroide de uso doméstico (inseticida em spray, espiral, líquido elétrico)', doseToxica: 'Baixa toxicidade sistêmica nas exposições domésticas habituais.', quadro: 'Irritação de pele e mucosas, parestesia facial, espirros, tosse, náusea; em ingestões grandes, tremor e, raramente, convulsão.', antidoto: 'Não há antídoto', carvao: 'considerar em ingestão significativa, conforme orientação do CIATox', conduta: 'Considerar lavagem de pele e mucosas, afastamento do ambiente e observação; atenção ao solvente hidrocarboneto presente em alguns produtos. Orientar-se pelo CIATox.', verificar: false },
  { agente: 'Raticida cumarínico (superwarfarínico)', doseToxica: 'Ingestões pequenas e únicas em crianças costumam ser de baixo risco, mas ingestões maiores causam anticoagulação prolongada.', quadro: 'Fase inicial assintomática; sangramento em 1 a 3 dias (gengivorragia, epistaxe, equimose, hematúria, sangramento digestivo), com alargamento do tempo de protrombina por semanas.', antidoto: 'Vitamina K1 (fitomenadiona); plasma fresco congelado ou complexo protrombínico no sangramento importante', carvao: 'considerar até 1 a 2 h', conduta: 'Considerar tempo de protrombina e INR na admissão e repetir em 24 a 48 h; não administrar vitamina K de forma profilática sem controle laboratorial, para não mascarar a evolução. Orientar-se pelo CIATox.', verificar: true },
  { agente: 'Naftalina', doseToxica: 'Uma a duas bolas podem ser tóxicas em criança pequena, com risco maior na deficiência de glicose-6-fosfato desidrogenase.', quadro: 'Náusea, vômitos, dor abdominal, cefaleia; hemólise com palidez, icterícia e urina escura, e metemoglobinemia.', antidoto: 'Não há antídoto específico; considerar azul de metileno na metemoglobinemia sintomática, exceto em deficiência de G6PD', carvao: 'considerar até 1 a 2 h', conduta: 'Considerar hemograma, bilirrubinas, urina e observação para hemólise tardia. Orientar-se pelo CIATox.', verificar: true },
  { agente: 'Mercúrio (termômetro e mercúrio metálico de garimpo)', doseToxica: 'A ingestão de mercúrio metálico habitualmente tem baixa toxicidade digestiva; o risco relevante é a inalação de vapor e a exposição crônica.', quadro: 'Inalação de vapor: tosse, dispneia e pneumonite. Exposição crônica: tremor, alteração de comportamento, parestesia, alteração visual e da marcha e comprometimento do neurodesenvolvimento.', antidoto: 'Quelante em situações selecionadas, conforme avaliação especializada', carvao: 'não indicado', conduta: 'Ventilar o ambiente e recolher o material sem aspirador e sem vassoura; em exposição por vapor ou em suspeita de exposição crônica, articular avaliação com o CIATox e com a vigilância ambiental. Orientar-se pelo CIATox.', verificar: true },
  { agente: 'Monóxido de carbono', doseToxica: 'Depende da concentração no ambiente e do tempo de exposição; ambientes fechados com gerador, motor, brasa ou carvão são de alto risco.', quadro: 'Cefaleia, náusea, tontura, fadiga, confusão, síncope, convulsão, coma, arritmia e isquemia miocárdica; sintomas simultâneos em vários moradores.', antidoto: 'Oxigênio a 100 por cento; considerar oxigenoterapia hiperbárica em casos selecionados', carvao: 'não se aplica', conduta: 'A oximetria de pulso convencional pode ser falsamente normal, porque não distingue a carboxihemoglobina da oxihemoglobina: não usar a saturação para excluir a intoxicação. Considerar cooximetria quando disponível. Orientar-se pelo CIATox.', verificar: false },
  { agente: 'Cianeto: fumaça de incêndio e queima de plásticos e espumas; e glicosídeos cianogênicos da mandioca brava, da manipueira e do tucupi mal processados', doseToxica: 'Exposição a fumaça em incêndio em ambiente fechado é suficiente para toxicidade grave. Na mandioca, depende do teor de linamarina e do processamento: raiz crua, água da prensa (manipueira) e tucupi não fervido pelo tempo adequado são as exposições de risco.', quadro: 'Cefaleia, tontura, náusea e vômitos; taquipneia seguida de bradipneia, rebaixamento rápido, convulsão, colapso cardiovascular, acidose metabólica com lactato muito elevado e cianose que não responde ao oxigênio.', antidoto: 'Hidroxocobalamina, de escolha; tiossulfato de sódio como alternativa ou adjuvante', carvao: 'não se aplica na inalação; considerar na ingestão de derivado de mandioca conforme orientação do CIATox', conduta: 'Emergência: oxigênio a 100 por cento, suporte e correção da acidose. Tratar empiricamente a vítima de incêndio com coma, colapso ou lactato muito elevado, sem aguardar exame confirmatório. Evitar nitritos em vítima de incêndio, pela metemoglobinemia associada à carboxihemoglobina. Orientar prevenção comunitária sobre o processamento correto da mandioca. Orientar-se pelo CIATox.', verificar: true },
  { agente: 'Plantas de contato irritante: comigo-ninguém-pode e tinhorão (oxalato de cálcio em ráfides), látex de euforbiáceas (coroa-de-cristo, avelós) e plantas urticantes (urtiga, cansanção)', doseToxica: 'A mordida ou a mastigação de uma pequena porção da folha já causa sintomas, e o contato com pequena quantidade de látex já causa lesão, especialmente na mucosa e no olho.', quadro: 'Oxalato: dor e queimação imediatas em boca e lábios, edema de lábios, língua e orofaringe, sialorreia, disfagia e afonia, com risco de comprometimento da via aérea. Látex e plantas urticantes: dermatite irritativa com eritema, vesículas e queimação, prurido e edema local. Em qualquer delas, o contato ocular causa dor intensa e ceratoconjuntivite, com risco de lesão de córnea.', antidoto: 'Não há antídoto', carvao: 'não indicado', conduta: 'Considerar lavagem da boca e remoção de restos vegetais, líquidos frios para alívio, analgesia e vigilância da via aérea no oxalato; lavagem abundante com água e sabão, remoção de espículas, compressa fria e anti-histamínico ou corticoide tópico conforme avaliação nas plantas de látex e urticantes; irrigar o olho por 15 a 20 minutos em contato ocular e encaminhar para oftalmologia. Orientar-se pelo CIATox.', verificar: false },
  { agente: 'Saia-branca ou trombeteira (Brugmansia) e outras plantas anticolinérgicas', doseToxica: 'Pequenas quantidades de flor, folha ou preparo caseiro podem causar quadro grave em criança.', quadro: 'Síndrome anticolinérgica: midríase, visão borrada, pele seca e quente, boca seca, febre, retenção urinária, taquicardia, agitação, alucinação visual, delirium, convulsão e coma, com duração de 12 a 48 h.', antidoto: 'Não há antídoto de rotina; fisostigmina tem uso restrito e disponibilidade limitada no Brasil', carvao: 'considerar até 1 a 2 h, com via aérea protegida', conduta: 'Considerar suporte, ambiente calmo, benzodiazepínico para agitação, monitorização cardíaca, controle da temperatura e observação prolongada. Orientar-se pelo CIATox.', verificar: true },
  { agente: 'Mamona (ricina) e pinhão-roxo ou pinhão-manso (curcina)', doseToxica: 'A toxicidade da mamona depende da mastigação das sementes: sementes engolidas inteiras liberam menos toxina.', quadro: 'Latência de horas, seguida de náusea, vômitos, cólica e diarreia por vezes sanguinolenta, com desidratação; em ingestões maiores, lesão hepática, renal e hemólise.', antidoto: 'Não há antídoto', carvao: 'considerar conforme o tempo e a orientação do CIATox', conduta: 'Considerar hidratação vigorosa, correção de eletrólitos, observação prolongada pela latência e controle de função hepática e renal. Orientar-se pelo CIATox.', verificar: true },
  { agente: 'Plantas com glicosídeos cardiotônicos (chapéu-de-napoleão, espirradeira)', doseToxica: 'Pequenas quantidades de folha, flor ou semente podem ser graves.', quadro: 'Vômitos, dor abdominal, bradicardia, bloqueios, arritmia, hipercalemia e alteração visual, com quadro semelhante à intoxicação digitálica.', antidoto: 'Anticorpo antidigoxina, raramente disponível no Brasil', carvao: 'considerar até 1 a 2 h', conduta: 'Considerar monitorização cardíaca contínua, eletrocardiograma, controle de potássio conforme protocolo e internação. Orientar-se pelo CIATox.', verificar: true },
  { agente: 'Timbó e plantas ictiotóxicas usadas na pesca (rotenona)', doseToxica: 'Variável conforme o preparo; a exposição ocorre pela ingestão do preparo ou pelo contato durante a pesca.', quadro: 'Vômitos, dor abdominal, sonolência e, em exposições importantes, depressão respiratória.', antidoto: 'Não há antídoto', carvao: 'considerar conforme orientação do CIATox', conduta: 'Considerar suporte, observação e orientação comunitária sobre a guarda do material fora do alcance das crianças. Orientar-se pelo CIATox.', verificar: true }
];

PED.data.acidentes.ferramentas.telefones = [
  { nome: 'Disque Intoxicação - Ministério da Saúde', numero: '0800 722 6001', obs: 'orientação toxicológica 24 h, nacional; direciona para o Centro de Informação e Assistência Toxicológica (CIATox) de referência' },
  { nome: 'SAMU', numero: '192', obs: 'urgência e emergência médica, 24 h' },
  { nome: 'Bombeiros', numero: '193', obs: 'incêndio, resgate, afogamento e salvamento, 24 h' }
];

PED.data.acidentes.ferramentas.nuncaFazer = [
  'Não provocar vômito em nenhuma intoxicação, por nenhum meio: nem com o dedo, nem com sal, nem com xarope de ipeca, nem com água morna.',
  'Não dar leite nem água para diluir ou neutralizar: pode acelerar a absorção, provocar vômito e prejudicar a endoscopia quando ela for necessária.',
  'Não tentar neutralizar cáustico com vinagre, limão, suco, bicarbonato ou leite de magnésia: a reação é exotérmica e agrava a lesão.',
  'Não usar carvão ativado em ingestão de cáustico, de hidrocarboneto, de álcool ou de metais como ferro e lítio, nem em criança sonolenta sem via aérea protegida.',
  'Não fazer lavagem gástrica em ingestão de hidrocarboneto (querosene, diesel, gasolina, thinner): o risco de aspiração e de pneumonite supera qualquer benefício.',
  'Não passar sonda nasogástrica às cegas na fase aguda da ingestão de cáustico.',
  'Não colocar gelo, água gelada, manteiga, margarina, óleo, banha, pasta de dente, pó ou borra de café, sal, açúcar, clara de ovo, urina, tinta, folha ou erva sobre queimadura.',
  'Não fazer varredura digital às cegas na boca da criança engasgada: empurra o objeto e pode transformar obstrução parcial em completa. Retirar apenas o objeto visível.',
  'Não aplicar compressões abdominais (manobra de Heimlich) em lactente menor de 1 ano: usar 5 golpes dorsais e 5 compressões torácicas.',
  'Não fazer manobras para drenar água dos pulmões no afogamento: não comprimir o abdome, não fazer Heimlich e não pendurar a criança de cabeça para baixo.',
  'Não usar a saturação do oxímetro de pulso para excluir intoxicação por monóxido de carbono: o aparelho lê a carboxihemoglobina como se fosse oxihemoglobina e pode mostrar valor normal.',
  'Não irrigar narina ou conduto auditivo com água quando houver suspeita de pilha botão, de semente ou de perfuração timpânica: a água acelera a reação da pilha e faz a semente inchar.',
  'Não atrasar a remoção de pilha botão impactada no esôfago: o mel é apenas medida de barreira e não substitui a endoscopia, que deve ocorrer idealmente em até 2 horas.',
  'Não dar mel a criança menor de 1 ano, pelo risco de botulismo.',
  'Não empurrar corpo estranho engolido com pão, banana ou arroz, e não tentar retirar objeto do nariz ou do ouvido em casa com pinça, cotonete, palito ou grampo.',
  'Não usar torniquete ou garrote improvisado em ferimentos comuns e em acidentes por animais: controlar o sangramento com compressão direta.',
  'Não suturar de forma primária ferimentos puntiformes, contaminados, tardios ou por mordedura fora da face.',
  'Não adiar a decisão sobre a profilaxia antirrábica e antitetânica para uma consulta posterior.',
  'Não sacrificar o cão ou o gato agressor passível de observação por 10 dias: ele é a principal fonte de informação para decidir a continuidade do esquema.',
  'Não tocar em criança que ainda esteja em contato com a fonte elétrica antes de desligar a energia.',
  'Não usar gerador, motor, churrasqueira, carvão ou brasa em ambiente fechado, inclusive dentro de barco.',
  'Não usar álcool líquido para acender ou reavivar fogo.',
  'Não guardar produto químico, combustível ou veneno em garrafa de bebida, copo ou pote de alimento.',
  'Não chamar medicamento de doce ou de bala para a criança aceitar tomar.',
  'Não interromper precocemente a reanimação em afogamento, em eletrocução e em hipotermia: nesses cenários a reanimação prolongada tem bom resultado em crianças.',
  'Não presumir que a criança assintomática está fora de risco: muitos agentes e situações, como sulfonilureia, paracetamol, corpo estranho em brônquio e afogamento, têm apresentação tardia.',
  'Não deixar de perguntar sobre chá, garrafada e remédio caseiro, nem de notificar a intoxicação exógena e a suspeita de violência.'
];
