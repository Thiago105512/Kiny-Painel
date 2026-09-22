window.PED = window.PED || {}; var PED = window.PED; PED.data = PED.data || {};

/* =========================================================================
   PED.data.doencasExtra
   Protocolos complementares: exantemáticas, outras infecções prevalentes
   e agravos amazônicos. Segue o contrato de PED.data.doencas (CONTRATO.md).
   Linguagem de apoio à decisão. Doses conforme MS, SBP, OMS e Nelson.
   ========================================================================= */

PED.data.doencasExtra = [

  // =====================================================================
  // EXANTEMÁTICAS E INFECCIOSAS
  // =====================================================================
  {
    id: 'sarampo',
    nome: 'Sarampo',
    categoria: 'infecciosa',
    amazonia: false,
    cid10: 'B05',
    tags: ['febre', 'exantema', 'tosse', 'coriza', 'conjuntivite', 'dispneia', 'diarreia', 'fraqueza', 'linfonodomegalia'],
    definicao: 'Doença exantemática viral aguda, altamente contagiosa, caracterizada por febre alta, tosse, coriza e conjuntivite (pródromo catarral), enantema de Koplik e exantema maculopapular morbiliforme de progressão craniocaudal. Cursa com imunossupressão transitória e risco elevado de complicações respiratórias e neurológicas em menores de 5 anos e desnutridos.',
    epidemiologia: 'O Brasil perdeu o certificado de eliminação do sarampo em 2019 após surtos sustentados com origem em transmissão importada, com reintrodução repetida em estados da Região Norte, incluindo Amazonas, Roraima e Pará, associada a fluxo migratório e a bolsões de baixa cobertura vacinal. No Amazonas a transmissão se amplifica em comunidades ribeirinhas e indígenas, em populações com difícil acesso à sala de vacina e em ambientes de aglomeração (barcos, escolas, unidades de saúde). Todo caso suspeito deve ser tratado como emergência de saúde pública: o sarampo é doença de notificação compulsória imediata (até 24 horas) à vigilância epidemiológica municipal e estadual. A letalidade é maior em menores de 1 ano, desnutridos, portadores de hipovitaminose A e imunossuprimidos.',
    agente: 'Vírus do sarampo (Morbillivirus, família Paramyxoviridae), RNA vírus de sorotipo único.',
    transmissao: 'Via aérea por aerossóis e gotículas respiratórias, com transmissibilidade muito alta (número reprodutivo básico de 12 a 18). O vírus permanece viável em aerossol por até 2 horas no ambiente. O período de transmissibilidade vai de cerca de 4 a 6 dias antes até 4 dias após o início do exantema; em imunossuprimidos pode ser prolongado.',
    incubacao: '7 a 21 dias entre a exposição e o início dos sintomas (média de 10 dias até a febre e 14 dias até o exantema).',
    manifestacoes: [
      'Pródromo catarral de 2 a 4 dias com febre alta e ascendente, tosse seca intensa, coriza e conjuntivite com fotofobia (tríade catarral).',
      'Manchas de Koplik: pequenas lesões branco-azuladas sobre base eritematosa na mucosa jugal, surgindo 1 a 2 dias antes do exantema e fugazes.',
      'Exantema maculopapular morbiliforme que inicia na região retroauricular e na linha de implantação dos cabelos e progride em sentido craniocaudal ao longo de 3 dias, poupando raramente palmas e plantas.',
      'Febre habitualmente mais alta no momento do surgimento do exantema; persistência da febre além do 3º ou 4º dia de exantema sugere complicação.',
      'Descamação furfurácea fina durante a convalescença, com escurecimento do exantema.',
      'Adenomegalia cervical, diarreia, vômitos e prostração acentuada, com risco de desidratação em lactentes.',
      'Complicações frequentes: otite média aguda, pneumonia (viral primária ou bacteriana secundária), laringotraqueobronquite, diarreia, ceratite e úlcera de córnea por hipovitaminose A, encefalite aguda e, tardiamente, panencefalite esclerosante subaguda.'
    ],
    sinaisAlarme: [
      'Dificuldade respiratória, taquipneia, tiragem, estridor ou saturação de oxigênio abaixo de 92%.',
      'Febre que persiste ou reaparece após o 4º dia de exantema (sugere infecção bacteriana secundária).',
      'Convulsão, sonolência, irritabilidade extrema, rigidez de nuca ou alteração de consciência.',
      'Incapacidade de beber ou mamar, vômitos persistentes, sinais de desidratação.',
      'Opacidade ou ulceração de córnea, fotofobia intensa e secreção ocular purulenta.',
      'Estomatite extensa impedindo alimentação.',
      'Desnutrição grave, menor de 12 meses ou imunossupressão.'
    ],
    diagnosticoDiferencial: ['rubeola', 'exantema_subito', 'eritema_infeccioso', 'escarlatina', 'dengue', 'zika', 'chikungunya', 'mononucleose', 'doença de Kawasaki', 'farmacodermia e exantema por drogas', 'riquetsiose e febre maculosa', 'enteroviroses'],
    exames: ['sorologia específica IgM e IgG para sarampo (ELISA) na 1ª consulta', 'RT-PCR em swab nasofaríngeo, orofaríngeo e urina até o 7º dia do exantema (coleta para genotipagem)', 'hemograma', 'pcr', 'radiografia_torax', 'eletrolitos', 'sorologia_arboviroses', 'ast', 'alt'],
    criteriosDiagnosticos: [
      'Caso suspeito (MS): toda pessoa com febre e exantema maculopapular acompanhados de tosse, coriza ou conjuntivite, independentemente da idade e da situação vacinal.',
      'Confirmação laboratorial compatível: IgM reagente para sarampo ou soroconversão de IgG em amostras pareadas ou RT-PCR detectável.',
      'Coletar sangue na primeira oportunidade do atendimento e amostras de swab e urina até o 7º dia do exantema, conforme orientação do laboratório de referência.',
      'Resultado de IgM não reagente em amostra colhida muito precocemente não afasta o caso: manter investigação e nova coleta conforme a vigilância.',
      'Investigar vínculo epidemiológico com caso confirmado, viagem ou contato com viajante nos 7 a 21 dias anteriores.',
      'Notificação compulsória imediata em até 24 horas, com preenchimento da ficha de investigação e busca ativa de contatos.'
    ],
    classificacaoGravidade: [
      { nivel: 'Sarampo não complicado', criterios: 'Criança com bom estado geral, aceitando líquidos, sem sinais respiratórios de alarme, sem acometimento ocular ou neurológico. Manejo domiciliar com isolamento, vitamina A, hidratação e reavaliação programada.' },
      { nivel: 'Sarampo complicado', criterios: 'Presença de pneumonia, otite média, diarreia com desidratação, estomatite que impede alimentação, ceratoconjuntivite ou febre persistente após o 4º dia de exantema. Considerar internação com isolamento aéreo.' },
      { nivel: 'Sarampo grave', criterios: 'Insuficiência respiratória, encefalite, convulsões, alteração de consciência, úlcera de córnea, desidratação grave, desnutrição grave ou imunossupressão. Internação em isolamento com suporte avançado e avaliação de UTI.' }
    ],
    tratamento: [
      'Não existe antiviral específico: o tratamento é de suporte, associado à administração universal de vitamina A e à prevenção de complicações.',
      'Vitamina A para TODA criança com sarampo, independentemente do estado nutricional, em duas doses VO: no dia do diagnóstico e no dia seguinte. Menor de 6 meses: 50.000 UI por dose. De 6 a 11 meses: 100.000 UI por dose. Igual ou maior que 12 meses: 200.000 UI por dose.',
      'Terceira dose de vitamina A (mesma dose para a faixa etária) após 4 a 6 semanas quando houver sinais clínicos de deficiência de vitamina A (mancha de Bitot, xeroftalmia) ou desnutrição grave.',
      'Isolamento respiratório por aerossóis desde a suspeita até 4 dias após o início do exantema (em imunossuprimidos, durante toda a doença); na unidade, quarto privativo com porta fechada e máscara N95 para os profissionais.',
      'Antitérmico e analgesia com paracetamol ou dipirona; evitar ácido acetilsalicílico.',
      'Hidratação oral com sais de reidratação oral e manutenção do aleitamento materno e da alimentação; fluidos IV se desidratação moderada a grave ou intolerância oral.',
      'Higiene ocular com soro fisiológico e avaliação oftalmológica se fotofobia intensa, secreção purulenta ou suspeita de úlcera de córnea.',
      'Antibiótico apenas quando houver complicação bacteriana documentada ou fortemente suspeita: amoxicilina para otite média aguda e pneumonia não grave; penicilina cristalina ou ceftriaxona nas formas graves internadas.',
      'Oxigênio suplementar se saturação abaixo de 92%; avaliar suporte ventilatório nos casos com insuficiência respiratória.',
      'Vacinação de bloqueio dos contatos suscetíveis em até 72 horas da exposição (vacina tríplice ou tetraviral, conforme a idade), inclusive vacinação seletiva de 6 a 11 meses (dose zero, que não substitui o esquema de rotina).',
      'Imunoglobulina humana normal para contatos suscetíveis com contraindicação à vacina (menores de 6 meses, gestantes, imunossuprimidos), preferencialmente em até 6 dias da exposição, conforme protocolo do CRIE.',
      'Zinco e suporte nutricional conforme estado nutricional; investigar e tratar desnutrição associada.'
    ],
    medicamentos: [
      { medId: 'vitamina_a', esquema: 'Dose universal em todo caso de sarampo, VO, no dia do diagnóstico e repetida no dia seguinte: menor de 6 meses 50.000 UI/dose; 6 a 11 meses 100.000 UI/dose; 12 meses ou mais 200.000 UI/dose. Terceira dose após 4 a 6 semanas se sinais de deficiência de vitamina A ou desnutrição grave.' },
      { medId: 'paracetamol', esquema: 'Febre e dor: 10 a 15 mg/kg/dose VO a cada 6 horas, conforme bula.' },
      { medId: 'dipirona', esquema: 'Alternativa antitérmica: 10 a 15 mg/kg/dose VO ou IV a cada 6 horas, conforme bula.' },
      { medId: 'sais_reidratacao_oral', esquema: 'Prevenção e tratamento da desidratação: SRO após cada evacuação líquida ou vômito, conforme plano A ou B do MS.' },
      { medId: 'amoxicilina', esquema: 'Complicação bacteriana (otite média aguda ou pneumonia não grave): 50 mg/kg/dia VO dividida 8/8 h ou 12/12 h, podendo chegar a 80 a 90 mg/kg/dia conforme diretriz, por 7 a 10 dias.' },
      { medId: 'ceftriaxona', esquema: 'Complicação bacteriana grave com internação: 50 a 100 mg/kg/dia IV, conforme protocolo do serviço.' },
      { medId: 'zinco', esquema: 'Se diarreia associada: 10 mg/dia VO em menores de 6 meses e 20 mg/dia em maiores de 6 meses, por 10 a 14 dias.' },
      { medId: null, nome: 'Vacina tríplice viral ou tetraviral', esquema: 'Bloqueio vacinal dos contatos suscetíveis em até 72 horas da exposição, conforme idade e situação vacinal, segundo o Calendário Nacional de Vacinação.' },
      { medId: null, nome: 'Imunoglobulina humana normal', esquema: 'Contatos suscetíveis com contraindicação à vacina (menores de 6 meses, gestantes, imunossuprimidos): aplicação preferencialmente em até 6 dias da exposição, dose e via conforme protocolo do CRIE e bula, confirmar conforme protocolo.' }
    ],
    criteriosInternacao: [
      'Pneumonia, laringotraqueíte com estridor em repouso ou qualquer sinal de desconforto respiratório.',
      'Desidratação moderada a grave ou incapacidade de manter hidratação oral.',
      'Menor de 12 meses com comprometimento do estado geral.',
      'Desnutrição grave, imunossupressão ou comorbidade crônica.',
      'Complicação ocular com risco de ceratite ou úlcera de córnea.',
      'Manifestações neurológicas (convulsão, alteração de consciência).',
      'Impossibilidade de isolamento domiciliar adequado ou de retorno para reavaliação (distância, vulnerabilidade social).'
    ],
    criteriosUTI: [
      'Insuficiência respiratória com necessidade de ventilação não invasiva ou invasiva.',
      'Encefalite com rebaixamento do nível de consciência ou estado de mal convulsivo.',
      'Choque ou instabilidade hemodinâmica associada a infecção bacteriana secundária.',
      'Obstrução alta grave por laringotraqueíte com falha do tratamento inicial.'
    ],
    criteriosAlta: [
      'Afebril e com melhora do exantema e do estado geral.',
      'Aceitação adequada de líquidos e alimentos, sem sinais de desidratação.',
      'Ausência de desconforto respiratório e saturação igual ou maior que 92% em ar ambiente.',
      'Complicações identificadas em tratamento e com evolução favorável.',
      'Duas doses de vitamina A administradas e registradas.',
      'Responsável orientado sobre isolamento domiciliar até 4 dias após o início do exantema e sobre sinais de alarme.',
      'Notificação realizada e amostras laboratoriais coletadas.'
    ],
    orientacoes: [
      'Manter a criança em casa, sem creche, escola ou visitas, até 4 dias após o início das manchas.',
      'Evitar contato com bebês menores de 1 ano, gestantes e pessoas com imunidade baixa.',
      'Oferecer líquidos com frequência e manter o aleitamento materno e a alimentação habitual.',
      'Limpar os olhos com soro fisiológico e manter o ambiente com pouca luz se houver fotofobia.',
      'Não usar ácido acetilsalicílico; usar apenas os antitérmicos prescritos.',
      'Retornar imediatamente se respiração rápida ou difícil, sonolência, convulsão, recusa de líquidos, dor ou mancha no olho, ou febre que volta depois de melhorar.',
      'Levar o cartão de vacina de todos os moradores da casa à unidade de saúde para atualização.'
    ],
    retorno: 'Reavaliação em 24 a 48 horas enquanto durar a febre e sempre que surgir sinal de alarme; consulta de revisão ao final do quadro para verificar complicações, estado nutricional e situação vacinal da família.',
    prevencao: [
      'Vacinação é a principal medida: tríplice viral aos 12 meses e tetraviral aos 15 meses, conforme o Calendário Nacional de Vacinação, garantindo duas doses até os 29 anos.',
      'Dose zero de tríplice viral entre 6 e 11 meses em situação de surto ou viagem para área de transmissão (não substitui as doses de rotina).',
      'Vacinação de bloqueio dos contatos suscetíveis em até 72 horas da exposição e busca ativa de não vacinados no domicílio, na escola e na comunidade.',
      'Notificação imediata em até 24 horas e investigação pela vigilância epidemiológica.',
      'Isolamento respiratório do caso e uso de máscara N95 pelos profissionais que o atendem.',
      'Manutenção de coberturas vacinais altas e homogêneas em comunidades ribeirinhas e indígenas, com estratégias de vacinação fluvial.',
      'Triagem de febre e exantema na entrada dos serviços de saúde, com atendimento imediato e separado.'
    ],
    fontes: [
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
      { nome: 'Nota Técnica e Manual de Vigilância do Sarampo – Ministério da Saúde', ano: 2023 },
      { nome: 'OMS – Measles: vaccines, treatment and vitamin A supplementation', ano: 2023 },
      { nome: 'Tratado de Pediatria – Sociedade Brasileira de Pediatria', ano: 2022 },
      { nome: 'Nelson Textbook of Pediatrics, 22ª edição', ano: 2024 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'rubeola',
    nome: 'Rubéola',
    categoria: 'infecciosa',
    amazonia: false,
    cid10: 'B06',
    tags: ['febre', 'exantema', 'linfonodomegalia', 'artralgia', 'cefaleia', 'conjuntivite', 'coriza'],
    definicao: 'Doença exantemática viral aguda, geralmente benigna na infância, caracterizada por exantema maculopapular róseo de progressão craniocaudal, febre baixa e linfadenopatia retroauricular, occipital e cervical posterior. Sua importância maior está no risco de síndrome da rubéola congênita quando a infecção ocorre na gestação.',
    epidemiologia: 'O Brasil recebeu a certificação de eliminação da rubéola e da síndrome da rubéola congênita em 2015, mantida desde então, mas a queda das coberturas vacinais e a circulação do vírus em outras regiões do mundo mantêm o risco de reintrodução, especialmente em áreas de fronteira e fluxo migratório da Região Norte. No Amazonas, comunidades com baixa cobertura de tríplice viral e mulheres em idade fértil não vacinadas constituem os grupos de maior vulnerabilidade. Toda suspeita de rubéola é de notificação compulsória imediata, na mesma ficha de vigilância das doenças exantemáticas febris.',
    agente: 'Vírus da rubéola (gênero Rubivirus, família Matonaviridae), RNA vírus de sorotipo único.',
    transmissao: 'Gotículas respiratórias e contato direto com secreções nasofaríngeas. Transmissão vertical transplacentária durante a gestação. Recém-nascidos com síndrome da rubéola congênita podem eliminar vírus por meses na urina e secreções.',
    incubacao: '14 a 21 dias (média de 17 dias). Transmissibilidade de cerca de 7 dias antes até 7 dias após o início do exantema.',
    manifestacoes: [
      'Pródromo discreto ou ausente em crianças: febre baixa, mal-estar, coriza leve e conjuntivite sem fotofobia importante.',
      'Linfadenopatia retroauricular, occipital e cervical posterior dolorosa, que pode preceder o exantema em 5 a 10 dias e é o sinal mais característico.',
      'Exantema maculopapular róseo, mais discreto e de coloração mais clara que o do sarampo, com início na face e progressão craniocaudal rápida, desaparecendo em cerca de 3 dias.',
      'Enantema de Forchheimer: petéquias em palato mole, presente em parte dos casos e não específico.',
      'Artralgia e artrite, mais frequentes em adolescentes e mulheres, acometendo pequenas articulações das mãos, punhos e joelhos, com duração de dias a semanas.',
      'Ausência da tríade catarral intensa do sarampo e estado geral habitualmente preservado.',
      'Complicações raras: púrpura trombocitopênica pós-infecciosa, encefalite e neurite.'
    ],
    sinaisAlarme: [
      'Sangramento cutâneo ou mucoso, petéquias e equimoses (sugestivo de púrpura trombocitopênica).',
      'Cefaleia intensa, vômitos, convulsão, rigidez de nuca ou alteração de consciência.',
      'Artrite intensa com limitação funcional importante.',
      'Contato de gestante suscetível com o caso (emergência de vigilância, mesmo sem gravidade clínica).',
      'Recém-nascido de mãe com suspeita de rubéola na gestação (investigar síndrome da rubéola congênita).'
    ],
    diagnosticoDiferencial: ['sarampo', 'exantema_subito', 'eritema_infeccioso', 'escarlatina', 'mononucleose', 'dengue', 'zika', 'chikungunya', 'enteroviroses', 'farmacodermia', 'doença de Kawasaki'],
    exames: ['sorologia IgM e IgG para rubéola (ELISA) na primeira consulta', 'RT-PCR em swab de nasofaringe e urina até o 5º dia do exantema', 'hemograma', 'pcr', 'coagulograma', 'sorologia_arboviroses'],
    criteriosDiagnosticos: [
      'Caso suspeito (MS): pessoa com febre e exantema maculopapular acompanhado de linfadenopatia retroauricular, occipital ou cervical, independentemente da idade e situação vacinal.',
      'Confirmação laboratorial compatível: IgM reagente, soroconversão ou aumento significativo de IgG em amostras pareadas, ou detecção viral por RT-PCR.',
      'Coleta de sangue no primeiro atendimento e amostras de swab e urina até o 5º dia do exantema.',
      'Considerar reação cruzada sorológica com parvovírus B19, dengue e outros arbovírus na interpretação do IgM isolado.',
      'Notificação compulsória imediata em até 24 horas, com investigação de contatos, em especial gestantes.',
      'Em recém-nascido com suspeita de rubéola congênita, avaliar IgM específico no sangue do RN e persistência de IgG além dos 6 a 12 meses.'
    ],
    classificacaoGravidade: [
      { nivel: 'Rubéola não complicada', criterios: 'Criança com bom estado geral, exantema e linfadenopatia, sem sangramento, sem sinais neurológicos. Manejo domiciliar com sintomáticos e afastamento.' },
      { nivel: 'Rubéola com complicação', criterios: 'Púrpura trombocitopênica, artrite incapacitante ou sinais neurológicos. Avaliação hospitalar, exames complementares e acompanhamento especializado.' },
      { nivel: 'Situação de risco epidemiológico', criterios: 'Caso com contato de gestante suscetível ou suspeita de rubéola congênita. Independe da gravidade clínica: acionamento imediato da vigilância epidemiológica e referência obstétrica e neonatal.' }
    ],
    tratamento: [
      'Não há tratamento antiviral específico: manejo sintomático e de suporte.',
      'Antitérmico e analgesia com paracetamol ou dipirona; ibuprofeno pode ser considerado na artralgia de adolescentes, conforme bula.',
      'Hidratação oral e manutenção da alimentação habitual.',
      'Afastamento de creche, escola e atividades coletivas até 7 dias após o início do exantema.',
      'Evitar rigorosamente contato com gestantes suscetíveis durante todo o período de transmissibilidade.',
      'Notificação imediata e investigação de contatos, com verificação da situação vacinal e sorológica de gestantes expostas.',
      'Vacinação de bloqueio dos contatos suscetíveis não gestantes em até 72 horas da exposição (tríplice viral).',
      'Púrpura trombocitopênica: avaliação hematológica, hemograma e coagulograma, evitando anti-inflamatórios e antiagregantes; conduta conforme protocolo do serviço.',
      'Recém-nascido com suspeita de rubéola congênita: precauções de contato prolongadas e avaliação auditiva, oftalmológica, cardiológica e neurológica.'
    ],
    medicamentos: [
      { medId: 'paracetamol', esquema: 'Febre e dor: 10 a 15 mg/kg/dose VO a cada 6 horas, conforme bula.' },
      { medId: 'dipirona', esquema: 'Alternativa antitérmica: 10 a 15 mg/kg/dose VO ou IV a cada 6 horas, conforme bula.' },
      { medId: 'ibuprofeno', esquema: 'Artralgia ou artrite, quando não houver sangramento ou plaquetopenia: 5 a 10 mg/kg/dose VO a cada 6 a 8 horas, conforme bula.' },
      { medId: null, nome: 'Vacina tríplice viral', esquema: 'Bloqueio vacinal de contatos suscetíveis não gestantes em até 72 horas da exposição, conforme o Calendário Nacional de Vacinação. Contraindicada na gestação e em imunossupressão grave.' }
    ],
    criteriosInternacao: [
      'Púrpura trombocitopênica com sangramento ativo.',
      'Manifestações neurológicas (encefalite, convulsão, alteração de consciência).',
      'Artrite grave com incapacidade funcional e dor não controlada.',
      'Desidratação ou incapacidade de manter ingestão oral.',
      'Recém-nascido com suspeita de rubéola congênita, para investigação e avaliação multiprofissional.'
    ],
    criteriosUTI: [
      'Encefalite com rebaixamento do nível de consciência ou estado de mal convulsivo.',
      'Sangramento grave com repercussão hemodinâmica.',
      'Insuficiência respiratória ou instabilidade hemodinâmica associadas.'
    ],
    criteriosAlta: [
      'Melhora clínica, exantema em regressão e estado geral preservado.',
      'Ausência de sangramento ativo e plaquetas em recuperação, quando houve púrpura.',
      'Aceitação oral adequada.',
      'Notificação realizada e amostras coletadas.',
      'Responsável orientado sobre afastamento até 7 dias após o início do exantema e sobre evitar contato com gestantes.'
    ],
    orientacoes: [
      'Manter a criança fora da creche ou escola até 7 dias após o aparecimento das manchas.',
      'Evitar qualquer contato com mulheres grávidas, mesmo que se sintam bem, pois o vírus pode afetar o bebê.',
      'Oferecer líquidos com frequência e manter a alimentação habitual.',
      'Usar apenas os remédios prescritos para febre e dor.',
      'Avisar a unidade de saúde se alguma gestante da casa ou da vizinhança teve contato com a criança.',
      'Retornar imediatamente se aparecerem manchas roxas na pele, sangramento de gengiva ou nariz, dor de cabeça forte, vômitos, convulsão ou sonolência.',
      'Levar o cartão de vacinas de todos os moradores da casa para atualização.'
    ],
    retorno: 'Reavaliação em 48 a 72 horas ou antes se sinais de alarme; retorno com resultado da sorologia e para verificação da situação vacinal da família e dos contatos.',
    prevencao: [
      'Vacinação com tríplice viral aos 12 meses e tetraviral aos 15 meses, garantindo duas doses até os 29 anos, conforme o Calendário Nacional de Vacinação.',
      'Vacinação de mulheres em idade fértil não gestantes e verificação da situação vacinal no pré-concepcional, com orientação para evitar gestação por 30 dias após a vacina.',
      'Bloqueio vacinal de contatos suscetíveis em até 72 horas da exposição.',
      'Notificação compulsória imediata e investigação de todos os casos suspeitos de doença exantemática febril.',
      'Vigilância da síndrome da rubéola congênita em recém-nascidos de mães com exantema na gestação.',
      'Afastamento do caso das atividades coletivas durante a transmissibilidade.',
      'Manutenção de coberturas vacinais altas em comunidades ribeirinhas, indígenas e de fronteira.'
    ],
    fontes: [
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
      { nome: 'Calendário Nacional de Vacinação – Ministério da Saúde', ano: 2025 },
      { nome: 'OPAS/OMS – Plano de ação para eliminação do sarampo, rubéola e SRC nas Américas', ano: 2023 },
      { nome: 'Tratado de Pediatria – Sociedade Brasileira de Pediatria', ano: 2022 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'varicela',
    nome: 'Varicela (catapora)',
    categoria: 'infecciosa',
    amazonia: false,
    cid10: 'B01',
    tags: ['febre', 'exantema', 'lesoes_pele', 'prurido', 'cefaleia', 'fraqueza', 'feridas', 'dispneia', 'alteracao_consciencia'],
    definicao: 'Infecção primária pelo vírus varicela-zóster, caracterizada por exantema vesicular pruriginoso generalizado em diferentes estágios evolutivos simultâneos (polimorfismo regional), acompanhado de febre e mal-estar. Habitualmente benigna em crianças imunocompetentes, mas com risco de infecção bacteriana secundária, pneumonia, ataxia cerebelar e complicações graves em lactentes, adolescentes, gestantes e imunossuprimidos.',
    epidemiologia: 'Doença de alta transmissibilidade, com surtos em creches, escolas e domicílios. No Amazonas, a convivência em domicílios com muitos moradores e em comunidades ribeirinhas facilita a transmissão intradomiciliar, e o atraso no acesso ao serviço aumenta a chance de complicações bacterianas de pele já instaladas na primeira avaliação. A vacina varicela está no Calendário Nacional (tetraviral aos 15 meses e varicela aos 4 anos), o que reduziu a incidência, mas casos em não vacinados e formas atenuadas em vacinados seguem ocorrendo. Surtos de varicela em ambiente hospitalar ou em comunidades indígenas exigem notificação; casos graves internados e óbitos são de notificação compulsória.',
    agente: 'Vírus varicela-zóster (VVZ, herpes-vírus humano tipo 3).',
    transmissao: 'Via aérea por aerossóis e gotículas e por contato direto com o líquido das vesículas. Transmissibilidade de 1 a 2 dias antes do exantema até que todas as lesões estejam em crosta (habitualmente 5 a 7 dias). Transmissão vertical e perinatal possível.',
    incubacao: '10 a 21 dias (média de 14 a 16 dias); pode se estender até 28 dias após uso de imunoglobulina específica.',
    manifestacoes: [
      'Pródromo curto com febre baixa a moderada, mal-estar, cefaleia e inapetência, mais evidente em adolescentes.',
      'Exantema que inicia em couro cabeludo, face e tronco e se dissemina de forma centrípeta, com predomínio em tronco e poupando relativamente extremidades.',
      'Evolução das lesões de mácula para pápula, vesícula com conteúdo claro, pústula e crosta, com surtos sucessivos e coexistência de todos os estágios na mesma região (polimorfismo regional).',
      'Prurido intenso, que favorece escoriação e infecção bacteriana secundária.',
      'Acometimento de mucosas (oral, conjuntival, genital), com úlceras rasas e dor à deglutição.',
      'Febre habitualmente por 2 a 4 dias; nova elevação térmica após esse período sugere complicação bacteriana.',
      'Complicações: celulite, abscesso, piodermite, fasciíte necrosante e síndrome do choque tóxico por Streptococcus pyogenes ou Staphylococcus aureus; pneumonia varicelosa; ataxia cerebelar aguda; encefalite; hepatite; plaquetopenia.'
    ],
    sinaisAlarme: [
      'Lesão cutânea com eritema, calor, dor desproporcional, endurecimento ou secreção purulenta (celulite, fasciíte necrosante).',
      'Febre que persiste além de 4 dias ou que reaparece após período afebril.',
      'Dificuldade respiratória, tosse intensa, taquipneia ou dor torácica (pneumonia varicelosa).',
      'Marcha instável, incoordenação, tremor e alteração da fala (ataxia cerebelar) ou rebaixamento de consciência e convulsão.',
      'Vômitos persistentes, cefaleia intensa e rigidez de nuca.',
      'Sangramento em lesões, petéquias ou púrpura.',
      'Recusa alimentar por lesões orais extensas e sinais de desidratação.',
      'Menor de 1 ano, adolescente, gestante, imunossuprimido, uso de corticoide sistêmico ou doença cutânea crônica.'
    ],
    diagnosticoDiferencial: ['mao_pe_boca', 'escabiose_impetigo', 'herpes-zóster disseminado', 'infecção herpética disseminada', 'picadas de inseto com reação vesicular (estrófulo)', 'riquetsiose e varicela-like por monkeypox', 'farmacodermia bolhosa', 'eritema multiforme'],
    exames: ['hemograma', 'pcr', 'radiografia_torax', 'ast', 'alt', 'hemocultura', 'coagulograma', 'liquor', 'PCR para VVZ em raspado de lesão ou líquor (casos atípicos ou graves)', 'cultura de secreção de lesão infectada'],
    criteriosDiagnosticos: [
      'Diagnóstico eminentemente clínico: exantema vesicular pruriginoso generalizado com lesões em diferentes estágios evolutivos na mesma área corporal, com ou sem febre.',
      'História de contato com caso de varicela ou herpes-zóster nos 10 a 21 dias anteriores reforça a suspeita.',
      'Exames laboratoriais desnecessários na forma típica; reservar PCR ou imunofluorescência de raspado de lesão para casos atípicos, graves, em imunossuprimidos ou para investigação de surto.',
      'Hemograma, PCR e hemocultura quando houver suspeita de infecção bacteriana secundária ou sepse.',
      'Radiografia de tórax se tosse, taquipneia ou hipoxemia.',
      'Considerar avaliação de líquor e neuroimagem se sinais neurológicos.',
      'Em vacinados, o quadro pode ser atenuado (poucas lesões, predominantemente maculopapulares, febre ausente), o que não afasta a transmissibilidade.'
    ],
    classificacaoGravidade: [
      { nivel: 'Leve', criterios: 'Criança imunocompetente maior de 1 ano, poucas lesões, febre baixa, sem infecção secundária, hidratada e com bom estado geral. Manejo domiciliar com sintomáticos, higiene e isolamento.' },
      { nivel: 'Moderada', criterios: 'Lesões numerosas ou confluentes, febre alta, lesões orais dificultando alimentação, infecção cutânea secundária localizada ou fator de risco (lactente, adolescente, doença cutânea crônica, corticoterapia). Considerar antiviral oral e antibiótico específico, com reavaliação frequente.' },
      { nivel: 'Grave', criterios: 'Pneumonia varicelosa, encefalite, ataxia com incapacidade, celulite extensa, fasciíte necrosante, choque tóxico, sangramento, desidratação grave ou imunossupressão. Internação com aciclovir intravenoso e suporte.' }
    ],
    tratamento: [
      'Medidas gerais: banho diário com água e sabonete neutro, unhas curtas e limpas, roupas leves, evitando coçar; não usar talco, pomadas com corante ou preparações caseiras sobre as lesões.',
      'Antitérmico com paracetamol ou dipirona. Não usar ácido acetilsalicílico (risco de síndrome de Reye) e evitar ibuprofeno e outros anti-inflamatórios não esteroidais na fase aguda, pela associação com infecção invasiva de pele e partes moles.',
      'Anti-histamínico oral para prurido intenso, conforme bula.',
      'Aciclovir oral não é indicado de rotina em criança previamente hígida maior de 2 anos com quadro leve; considerar quando iniciado nas primeiras 24 a 48 horas do exantema em grupos de maior risco: adolescentes e maiores de 12 anos, segundo caso no domicílio, doença cutânea ou pulmonar crônica, uso de corticoide sistêmico ou de ácido acetilsalicílico crônico.',
      'Aciclovir intravenoso para imunossuprimidos, recém-nascidos, gestantes com doença grave e formas complicadas (pneumonia, encefalite, varicela disseminada), conforme protocolo do serviço.',
      'Infecção bacteriana secundária de pele: cefalexina ou amoxicilina com clavulanato conforme extensão; celulite extensa, fasciíte ou choque tóxico exigem internação, antibiótico intravenoso e avaliação cirúrgica.',
      'Hidratação oral e dieta pastosa e fria quando houver lesões orais dolorosas; analgesia adequada.',
      'Isolamento domiciliar e afastamento de creche e escola até que todas as lesões estejam em crosta; em ambiente hospitalar, precauções de aerossol e contato.',
      'Profilaxia pós-exposição: vacina varicela em contatos suscetíveis maiores de 9 meses em até 5 dias da exposição (preferencialmente 72 horas); imunoglobulina específica anti-varicela-zóster para suscetíveis de alto risco (imunossuprimidos, gestantes, recém-nascidos de mães com varicela peri-parto, prematuros), conforme critérios do CRIE.',
      'Manter vigilância para novo pico febril, que deve motivar reavaliação imediata.'
    ],
    medicamentos: [
      { medId: null, nome: 'Aciclovir', esquema: 'VO em grupos de risco, iniciado idealmente nas primeiras 24 a 48 horas: 20 mg/kg/dose 4 vezes ao dia (máximo 800 mg por dose) por 5 dias. Forma grave ou imunossuprimido: 10 mg/kg/dose IV a cada 8 horas (30 mg/kg/dia) por 7 a 10 dias, com hidratação adequada; confirmar conforme protocolo do serviço e bula.' },
      { medId: 'paracetamol', esquema: 'Febre e dor: 10 a 15 mg/kg/dose VO a cada 6 horas, conforme bula.' },
      { medId: 'dipirona', esquema: 'Alternativa antitérmica: 10 a 15 mg/kg/dose VO ou IV a cada 6 horas, conforme bula.' },
      { medId: 'cefalexina', esquema: 'Infecção bacteriana secundária de pele não complicada: 50 a 100 mg/kg/dia VO dividida a cada 6 horas por 7 a 10 dias, conforme protocolo.' },
      { medId: 'amoxicilina_clavulanato', esquema: 'Piodermite extensa ou falha da cefalexina: 45 a 50 mg/kg/dia (componente amoxicilina) VO dividida 12/12 h por 7 a 10 dias.' },
      { medId: 'ceftriaxona', esquema: 'Celulite extensa ou infecção invasiva com internação: 50 a 100 mg/kg/dia IV, associada a cobertura antiestafilocócica conforme protocolo do serviço.' },
      { medId: null, nome: 'Vacina varicela (monovalente ou tetraviral)', esquema: 'Profilaxia pós-exposição em contato suscetível a partir de 9 meses, em até 5 dias da exposição, preferencialmente nas primeiras 72 horas, conforme o Calendário Nacional e o CRIE.' },
      { medId: null, nome: 'Imunoglobulina humana anti-varicela-zóster (IGHAVZ)', esquema: 'Suscetíveis de alto risco (imunossuprimidos, gestantes, RN de mãe com varicela de 5 dias antes a 2 dias após o parto, prematuros conforme critério), preferencialmente em até 96 horas da exposição, dose conforme protocolo do CRIE e bula, confirmar conforme protocolo.' }
    ],
    criteriosInternacao: [
      'Celulite extensa, abscesso, suspeita de fasciíte necrosante ou síndrome do choque tóxico.',
      'Pneumonia varicelosa ou qualquer desconforto respiratório.',
      'Manifestações neurológicas (ataxia incapacitante, encefalite, convulsão).',
      'Desidratação ou incapacidade de ingestão oral por lesões orais extensas.',
      'Recém-nascido, lactente jovem com quadro exuberante, imunossuprimido ou em uso de corticoide sistêmico.',
      'Sangramento, plaquetopenia ou púrpura.',
      'Impossibilidade de isolamento e cuidado domiciliar adequados.'
    ],
    criteriosUTI: [
      'Insuficiência respiratória por pneumonia varicelosa com necessidade de suporte ventilatório.',
      'Choque séptico ou síndrome do choque tóxico estreptocócico.',
      'Encefalite com rebaixamento de consciência ou estado de mal convulsivo.',
      'Varicela disseminada em imunossuprimido com disfunção orgânica.',
      'Fasciíte necrosante com necessidade de desbridamento e suporte hemodinâmico.'
    ],
    criteriosAlta: [
      'Afebril, com lesões em crostas e sem sinais de infecção secundária ativa.',
      'Aceitação oral adequada e hidratação mantida.',
      'Ausência de desconforto respiratório e de sinais neurológicos.',
      'Antiviral ou antibiótico oral em curso, com esquema compreendido pelo responsável.',
      'Responsável orientado sobre isolamento até todas as lesões estarem em crosta e sobre sinais de alarme.'
    ],
    orientacoes: [
      'Manter a criança em casa, sem creche ou escola, até que todas as feridas estejam em casquinha.',
      'Cortar e limpar as unhas e evitar que a criança cace as lesões; pode-se usar luvas de algodão em lactentes.',
      'Dar banho normalmente com água e sabonete neutro e secar sem esfregar.',
      'Não passar talco, pomadas coloridas, borra de café, folhas ou qualquer preparação caseira nas lesões.',
      'Não dar ácido acetilsalicílico (AAS) nem anti-inflamatórios como ibuprofeno ou nimesulida.',
      'Oferecer alimentos frios e pastosos se houver feridas na boca, e bastante líquido.',
      'Retornar imediatamente se a febre voltar depois de melhorar, se alguma ferida ficar vermelha, quente, inchada ou com pus, se houver falta de ar, dificuldade para andar, vômitos, sonolência ou convulsão.',
      'Avisar a unidade de saúde se houver em casa gestante, recém-nascido ou pessoa com imunidade baixa.'
    ],
    retorno: 'Reavaliação em 48 a 72 horas, ou em 24 horas em lactentes e nos casos com muitas lesões; retorno imediato diante de qualquer sinal de alarme, em especial novo pico de febre ou lesão infectada.',
    prevencao: [
      'Vacinação: tetraviral aos 15 meses e varicela aos 4 anos, conforme o Calendário Nacional de Vacinação.',
      'Profilaxia pós-exposição com vacina em contatos suscetíveis em até 5 dias, preferencialmente 72 horas.',
      'Imunoglobulina específica para contatos suscetíveis de alto risco conforme critérios do CRIE.',
      'Afastamento do caso de creche, escola e atividades coletivas até todas as lesões estarem em crosta.',
      'Higiene das mãos e das lesões e corte das unhas para reduzir infecção bacteriana secundária.',
      'Precauções de aerossol e contato em ambiente hospitalar, com quarto privativo quando possível.',
      'Identificação precoce de contatos gestantes, recém-nascidos e imunossuprimidos no domicílio.'
    ],
    fontes: [
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
      { nome: 'Manual dos Centros de Referência para Imunobiológicos Especiais (CRIE) – Ministério da Saúde', ano: 2023 },
      { nome: 'Documento Científico de Infectologia – Sociedade Brasileira de Pediatria', ano: 2023 },
      { nome: 'Nelson Textbook of Pediatrics, 22ª edição', ano: 2024 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'exantema_subito',
    nome: 'Exantema súbito (roséola infantil)',
    categoria: 'infecciosa',
    amazonia: false,
    cid10: 'B08.2',
    tags: ['febre', 'exantema', 'convulsao', 'coriza', 'diarreia', 'linfonodomegalia', 'fraqueza'],
    definicao: 'Doença exantemática viral benigna do lactente, caracterizada por febre alta de 3 a 5 dias com bom estado geral relativo, seguida de defervescência súbita e surgimento de exantema maculopapular róseo em tronco. É causa frequente de crise febril nesta faixa etária.',
    epidemiologia: 'Acomete predominantemente lactentes de 6 a 24 meses, com pico entre 6 e 15 meses; quase todas as crianças são infectadas até os 3 anos de idade. É uma das causas mais comuns de febre alta sem sinais localizatórios no lactente e uma das principais causas identificáveis de atendimento de urgência por febre e por crise febril simples. Não tem sazonalidade marcada e é igualmente frequente nas comunidades urbanas e ribeirinhas do Amazonas. A principal armadilha regional é atribuir febre alta em lactente exclusivamente à roséola em área endêmica de malária e arboviroses, sem investigar essas causas.',
    agente: 'Herpes-vírus humano tipo 6 (HHV-6B) na maioria dos casos; herpes-vírus humano tipo 7 (HHV-7) em parte deles, podendo causar um segundo episódio.',
    transmissao: 'Contato com saliva de adultos e crianças maiores portadores assintomáticos, que eliminam o vírus de forma intermitente; transmissão respiratória por gotículas.',
    incubacao: '5 a 15 dias (média de 9 a 10 dias).',
    manifestacoes: [
      'Febre alta, muitas vezes acima de 39 a 40 graus, com duração de 3 a 5 dias e bom estado geral entre os picos febris.',
      'Irritabilidade, inapetência leve e sono agitado durante a fase febril, sem sinais localizatórios evidentes.',
      'Defervescência em crise (queda rápida da febre) seguida, em horas, do surgimento do exantema.',
      'Exantema maculopapular róseo, de pequenas lesões, iniciando em tronco e pescoço e estendendo-se para face e raiz dos membros, não pruriginoso e sem descamação, com duração de 1 a 3 dias.',
      'Hiperemia de orofaringe, coriza discreta, edema periorbitário leve e diarreia leve podem acompanhar.',
      'Adenomegalia cervical e occipital de pequeno volume.',
      'Manchas de Nagayama: pápulas eritematosas em palato mole e úvula, descritas em parte dos casos.',
      'Crise febril simples em cerca de 10 a 15% dos casos, geralmente durante a fase febril.'
    ],
    sinaisAlarme: [
      'Aspecto toxêmico, palidez, moteamento cutâneo ou enchimento capilar lentificado durante a febre.',
      'Convulsão focal, prolongada (mais de 15 minutos) ou repetida no mesmo episódio, ou recuperação lenta da consciência.',
      'Rigidez de nuca, abaulamento de fontanela, vômitos persistentes ou letargia.',
      'Petéquias, púrpura ou qualquer sangramento.',
      'Febre por mais de 5 dias ou reaparecimento da febre após o exantema.',
      'Menor de 3 meses com febre (investigação de infecção bacteriana grave é mandatória).',
      'Desidratação ou recusa alimentar importante.'
    ],
    diagnosticoDiferencial: ['sarampo', 'rubeola', 'eritema_infeccioso', 'escarlatina', 'dengue', 'zika', 'malaria', 'infeccao_urinaria', 'meningite', 'sepse', 'farmacodermia (exantema após antibiótico iniciado na fase febril)', 'doença de Kawasaki'],
    exames: ['hemograma', 'pcr', 'urina_1', 'urocultura', 'gota espessa em área endêmica de malária', 'sorologia_dengue', 'hemocultura (se toxemia)', 'liquor (se sinais meníngeos ou crise febril complexa)'],
    criteriosDiagnosticos: [
      'Diagnóstico clínico e habitualmente retrospectivo: lactente de 6 a 24 meses com febre alta de 3 a 5 dias e bom estado geral, seguida de exantema róseo em tronco ao cessar a febre.',
      'A sequência temporal febre alta seguida de exantema após a defervescência é o elemento mais característico.',
      'Não há indicação de sorologia ou PCR para HHV-6 na prática assistencial de rotina.',
      'Durante a fase febril, o diagnóstico é de exclusão: avaliar foco bacteriano, solicitar urina rotina e urocultura em lactentes com febre sem sinais localizatórios e gota espessa em área endêmica.',
      'Hemograma pode mostrar leucopenia com linfocitose relativa na fase febril.',
      'Exantema que surge com a febre ainda presente, ou com criança toxemiada, deve motivar revisão diagnóstica.'
    ],
    classificacaoGravidade: [
      { nivel: 'Típico e benigno', criterios: 'Lactente de 6 a 24 meses, bom estado geral entre picos febris, hidratado, sem sinais localizatórios nem de alarme. Manejo domiciliar com antitérmico, hidratação e reavaliação.' },
      { nivel: 'Com crise febril simples', criterios: 'Convulsão generalizada, com menos de 15 minutos, única em 24 horas, com recuperação completa da consciência, em criança de 6 meses a 5 anos. Observação, orientação aos pais e investigação da causa da febre; não indica exames neurológicos de rotina.' },
      { nivel: 'Atípico ou de risco', criterios: 'Febre além de 5 dias, toxemia, crise febril complexa, sinais meníngeos, petéquias, menor de 3 meses ou imunossuprimido. Investigação ampliada e observação hospitalar.' }
    ],
    tratamento: [
      'Não há tratamento antiviral indicado em crianças imunocompetentes; o manejo é sintomático.',
      'Antitérmico com paracetamol ou dipirona, com orientação de que o objetivo é o conforto e não a normalização estrita da temperatura.',
      'Ibuprofeno pode ser considerado como alternativa, conforme bula, evitando-se em desidratação, sangramento ou suspeita de dengue.',
      'Hidratação oral frequente, manutenção do aleitamento materno e da alimentação conforme aceitação.',
      'Não são indicados banhos gelados, álcool, compressas frias agressivas ou associação alternada rotineira de dois antitérmicos sem orientação.',
      'Antibióticos não têm indicação; se um antibiótico foi iniciado antes do exantema, orientar que o exantema da roséola pode ser confundido com alergia medicamentosa, devendo a avaliação ser feita pelo médico.',
      'Orientação estruturada sobre crise febril: posicionar a criança em decúbito lateral, não conter os movimentos, não colocar nada na boca, marcar o tempo e procurar atendimento.',
      'Em imunossuprimidos ou quadros graves atribuídos a HHV-6, a conduta antiviral deve ser definida por infectologia, conforme protocolo do serviço.',
      'Reavaliação obrigatória se a febre persistir além de 5 dias ou se surgir qualquer sinal de alarme.'
    ],
    medicamentos: [
      { medId: 'paracetamol', esquema: 'Febre e desconforto: 10 a 15 mg/kg/dose VO a cada 6 horas, conforme bula.' },
      { medId: 'dipirona', esquema: 'Alternativa antitérmica: 10 a 15 mg/kg/dose VO a cada 6 horas, conforme bula.' },
      { medId: 'ibuprofeno', esquema: 'Alternativa: 5 a 10 mg/kg/dose VO a cada 6 a 8 horas, conforme bula; evitar em desidratação, sangramento ou suspeita de dengue.' },
      { medId: 'sais_reidratacao_oral', esquema: 'Se diarreia ou risco de desidratação: SRO conforme plano A do MS.' }
    ],
    criteriosInternacao: [
      'Aspecto toxêmico ou suspeita de infecção bacteriana grave.',
      'Crise febril complexa (focal, prolongada ou repetida) ou recuperação neurológica incompleta.',
      'Menor de 3 meses com febre.',
      'Desidratação com falha da reidratação oral.',
      'Febre além de 5 dias sem diagnóstico ou reaparecimento da febre após o exantema.',
      'Imunossupressão ou comorbidade relevante.',
      'Dificuldade de acesso ao serviço para reavaliação, em contexto ribeirinho ou rural.'
    ],
    criteriosUTI: [
      'Estado de mal convulsivo.',
      'Rebaixamento persistente do nível de consciência ou suspeita de encefalite por HHV-6.',
      'Choque ou instabilidade hemodinâmica decorrente de diagnóstico alternativo (sepse, dengue grave, malária grave).'
    ],
    criteriosAlta: [
      'Criança hidratada, com boa aceitação oral e estado geral preservado.',
      'Ausência de sinais de alarme e de sinais localizatórios de infecção bacteriana.',
      'Exames de triagem, quando realizados, sem alterações preocupantes.',
      'Responsável orientado sobre sinais de alarme, manejo da febre e conduta em caso de convulsão.',
      'Retorno agendado ou acesso garantido para reavaliação.'
    ],
    orientacoes: [
      'A febre alta por 3 a 5 dias com a criança ainda brincando entre os picos é comum nessa doença; o importante é observar o comportamento e não apenas o número do termômetro.',
      'Oferecer líquidos com frequência e manter o peito ou a alimentação habitual.',
      'Dar o antitérmico prescrito quando a criança estiver desconfortável, respeitando o intervalo indicado.',
      'Não usar álcool, banho gelado ou remédio de outra pessoa.',
      'As manchas que aparecem quando a febre passa são esperadas, não coçam e somem em 1 a 3 dias; não é preciso pomada.',
      'Se a criança tiver uma convulsão: deitar de lado, afrouxar a roupa, não segurar com força, não colocar nada na boca, marcar o tempo e levar ao serviço de saúde.',
      'Retornar imediatamente se a criança ficar muito molinha, sonolenta, com manchas roxas, vômitos repetidos, dificuldade para respirar, febre por mais de 5 dias ou se a febre voltar depois das manchas.'
    ],
    retorno: 'Reavaliação em 24 a 48 horas enquanto houver febre e imediatamente se sinais de alarme; se a febre ultrapassar 5 dias, retorno obrigatório para reinvestigação.',
    prevencao: [
      'Não há vacina disponível.',
      'Higiene das mãos e evitar beijar a boca da criança e compartilhar talheres, chupetas e copos.',
      'Não há indicação de afastamento prolongado: a criança pode retornar às atividades quando estiver afebril e em bom estado geral.',
      'Manter o calendário vacinal em dia, para reduzir outras causas de febre e exantema.',
      'Orientar a família sobre manejo da febre e reconhecimento de sinais de alarme, reduzindo automedicação.'
    ],
    fontes: [
      { nome: 'Tratado de Pediatria – Sociedade Brasileira de Pediatria', ano: 2022 },
      { nome: 'Nelson Textbook of Pediatrics, 22ª edição', ano: 2024 },
      { nome: 'Documento Científico: Febre sem sinais localizatórios – Sociedade Brasileira de Pediatria', ano: 2021 },
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'eritema_infeccioso',
    nome: 'Eritema infeccioso (quinta doença)',
    categoria: 'infecciosa',
    amazonia: false,
    cid10: 'B08.3',
    tags: ['febre', 'exantema', 'artralgia', 'palidez', 'fraqueza', 'cefaleia', 'prurido'],
    definicao: 'Doença exantemática causada pelo parvovírus B19, caracterizada por eritema facial intenso em vespertilio ("face esbofeteada") seguido de exantema reticulado em rendilhado nos membros, com evolução flutuante por semanas. Pode cursar com artropatia, crise aplástica transitória em portadores de anemia hemolítica e hidropisia fetal quando adquirida na gestação.',
    epidemiologia: 'Ocorre em surtos escolares e comunitários, acometendo principalmente crianças de 5 a 15 anos, com maior circulação no fim do inverno e na primavera nas regiões temperadas e distribuição ao longo do ano na Região Norte. No Amazonas, tem relevância especial pela alta prevalência de anemias hemolíticas hereditárias e de anemia ferropriva, situações em que a infecção pelo parvovírus B19 pode desencadear crise aplástica transitória grave. Também é importante a identificação de gestantes expostas, pelo risco de hidropisia fetal e perda gestacional, sobretudo antes da 20ª semana.',
    agente: 'Parvovírus B19 (Erythroparvovirus, família Parvoviridae), DNA vírus com tropismo por precursores eritroides da medula óssea.',
    transmissao: 'Gotículas respiratórias e contato com secreções; transmissão por hemoderivados e transmissão vertical transplacentária. A transmissibilidade é maior na fase febril prodrômica e cessa praticamente com o surgimento do exantema, que é fenômeno imunomediado.',
    incubacao: '4 a 14 dias até os pródromos, podendo chegar a 21 dias até o exantema.',
    manifestacoes: [
      'Pródromo inespecífico e leve: febre baixa, cefaleia, coriza, mialgia e mal-estar, em cerca de metade dos casos.',
      'Primeira fase do exantema: eritema intenso e quente em ambas as bochechas, com palidez perioral, conferindo o aspecto de face esbofeteada.',
      'Segunda fase: exantema maculopapular em tronco e superfícies extensoras dos membros que clareia no centro, assumindo padrão reticulado ou rendilhado.',
      'Terceira fase: recidiva ou acentuação do exantema por semanas, desencadeada por sol, calor, exercício, banho quente ou estresse.',
      'Prurido leve, mais frequente em adolescentes e nas plantas.',
      'Artralgia e artrite simétrica de pequenas articulações, mais comuns em adolescentes e mulheres, com duração de semanas.',
      'Síndrome papular-purpúrica em luvas e meias em adolescentes: edema e petéquias de mãos e pés, com demarcação nítida.',
      'Crise aplástica transitória em portadores de anemia falciforme, esferocitose ou talassemia: palidez intensa, astenia, taquicardia, sem exantema típico.',
      'Em imunossuprimidos: anemia crônica por aplasia pura de série vermelha persistente.'
    ],
    sinaisAlarme: [
      'Palidez acentuada, taquicardia, dispneia aos esforços ou sopro novo em criança com anemia hemolítica conhecida (suspeita de crise aplástica).',
      'Queda importante de hemoglobina com reticulócitos baixos.',
      'Petéquias, púrpura ou sangramento.',
      'Edema generalizado, oligúria ou sinais de insuficiência cardíaca.',
      'Artrite intensa com limitação funcional.',
      'Contato de gestante suscetível com o caso.',
      'Febre alta e prolongada, que não é típica da doença e sugere diagnóstico alternativo.'
    ],
    diagnosticoDiferencial: ['rubeola', 'sarampo', 'escarlatina', 'exantema_subito', 'mao_pe_boca', 'dengue', 'chikungunya', 'lúpus eritematoso sistêmico (eritema malar)', 'artrite idiopática juvenil', 'farmacodermia', 'urticária'],
    exames: ['hemograma', 'contagem de reticulócitos', 'sorologia IgM e IgG para parvovírus B19', 'PCR para parvovírus B19 (imunossuprimidos, crise aplástica, hidropisia fetal)', 'pcr', 'vhs', 'ferritina', 'bilirrubinas', 'coagulograma'],
    criteriosDiagnosticos: [
      'Diagnóstico clínico na forma típica: face esbofeteada seguida de exantema reticulado em membros, com estado geral preservado e sem febre alta.',
      'Sorologia IgM reagente indica infecção recente; IgG isolado indica imunidade prévia. Solicitar em gestantes expostas, imunossuprimidos e em quadros atípicos.',
      'PCR para parvovírus B19 é o método de escolha em imunossuprimidos, que podem não produzir anticorpos, e na investigação de crise aplástica e hidropisia fetal.',
      'Hemograma com reticulócitos é mandatório sempre que houver palidez ou doença hemolítica de base.',
      'Considerar reação cruzada e falsos positivos de IgM em interpretações isoladas; correlacionar com o quadro clínico.',
      'Na presença do exantema típico, a criança já não é considerada transmissível e não necessita de afastamento escolar.'
    ],
    classificacaoGravidade: [
      { nivel: 'Forma clássica benigna', criterios: 'Criança hígida com exantema típico, sem febre alta, sem palidez, com bom estado geral. Manejo domiciliar com orientação, sem necessidade de exames.' },
      { nivel: 'Forma com artropatia', criterios: 'Artralgia ou artrite simétrica com dor e limitação, mais comum em adolescentes. Analgesia, anti-inflamatório conforme bula e reavaliação; considerar avaliação reumatológica se persistir além de 6 semanas.' },
      { nivel: 'Forma grave ou de risco', criterios: 'Crise aplástica transitória (palidez intensa, queda de hemoglobina, reticulocitopenia), aplasia crônica em imunossuprimido, síndrome papular-purpúrica extensa ou exposição de gestante suscetível. Internação ou referência especializada.' }
    ],
    tratamento: [
      'Não há antiviral específico: o tratamento é sintomático na forma clássica.',
      'Antitérmico e analgesia com paracetamol ou dipirona; ibuprofeno para artralgia e artrite, conforme bula, evitando em plaquetopenia ou sangramento.',
      'Hidratação e manutenção das atividades habituais; não há indicação de repouso prolongado.',
      'Orientar que o exantema pode recidivar por semanas com sol, calor e exercício e que isso não significa reinfecção nem falha de tratamento.',
      'Crise aplástica transitória: internação, monitorização de hemoglobina e reticulócitos, suporte transfusional conforme critérios do serviço de hematologia e precaução de gotículas, pois esses pacientes são altamente transmissíveis.',
      'Imunossuprimido com aplasia pura crônica: avaliação de imunoglobulina humana intravenosa e ajuste da imunossupressão, conforme protocolo e serviço especializado.',
      'Gestante exposta ou infectada: encaminhamento ao pré-natal de alto risco para sorologia e acompanhamento ecográfico seriado (risco de hidropisia fetal), conforme protocolo obstétrico.',
      'Não há indicação de antibiótico nem de corticoide na forma clássica.',
      'Não é necessário afastamento escolar quando o exantema já está presente, pois a transmissibilidade ocorreu na fase prodrômica.'
    ],
    medicamentos: [
      { medId: 'paracetamol', esquema: 'Febre e dor: 10 a 15 mg/kg/dose VO a cada 6 horas, conforme bula.' },
      { medId: 'dipirona', esquema: 'Alternativa antitérmica e analgésica: 10 a 15 mg/kg/dose VO a cada 6 horas, conforme bula.' },
      { medId: 'ibuprofeno', esquema: 'Artralgia e artrite: 5 a 10 mg/kg/dose VO a cada 6 a 8 horas, conforme bula; evitar se plaquetopenia, sangramento ou suspeita de dengue.' },
      { medId: null, nome: 'Imunoglobulina humana intravenosa', esquema: 'Aplasia pura de série vermelha persistente em imunossuprimido: indicação, dose e duração definidas por hematologia e infectologia, confirmar conforme protocolo do serviço e bula.' },
      { medId: null, nome: 'Concentrado de hemácias', esquema: 'Crise aplástica transitória com anemia sintomática: transfusão conforme limiar clínico e protocolo do serviço de hemoterapia.' }
    ],
    criteriosInternacao: [
      'Crise aplástica transitória com anemia sintomática ou queda rápida de hemoglobina.',
      'Palidez intensa, taquicardia, dispneia ou insuficiência cardíaca.',
      'Aplasia crônica em imunossuprimido com necessidade de terapia específica.',
      'Síndrome papular-purpúrica extensa com dor ou comprometimento funcional importante.',
      'Artrite grave sem controle da dor em domicílio.',
      'Dúvida diagnóstica com quadro febril grave em área endêmica de arboviroses e malária.'
    ],
    criteriosUTI: [
      'Anemia grave com instabilidade hemodinâmica ou insuficiência cardíaca descompensada.',
      'Choque ou hipóxia tecidual por anemia aguda profunda.',
      'Miocardite associada com disfunção ventricular.'
    ],
    criteriosAlta: [
      'Hemoglobina estável ou em recuperação, com reticulócitos em ascensão nos casos de crise aplástica.',
      'Ausência de sinais de descompensação cardiovascular.',
      'Dor articular controlada com analgesia oral.',
      'Responsável orientado sobre o caráter recidivante do exantema e sobre sinais de alarme.',
      'Encaminhamento garantido à hematologia nos casos com doença hemolítica de base.'
    ],
    orientacoes: [
      'As manchas podem ir e voltar por várias semanas, principalmente com sol, calor, banho quente ou exercício; isso é esperado e não é doença nova.',
      'Quando as manchas aparecem, a criança já não transmite mais a doença e pode voltar à escola, se estiver bem.',
      'Evitar exposição solar prolongada e banhos muito quentes enquanto houver manchas.',
      'Usar apenas os remédios prescritos para dor e febre.',
      'Avisar a unidade de saúde se houver gestante na casa ou na escola que teve contato com a criança.',
      'Se a criança tem anemia falciforme, talassemia ou outra doença do sangue, procurar atendimento imediatamente ao aparecer palidez, cansaço ou falta de ar.',
      'Retornar se surgirem manchas roxas, sangramento, inchaço das articulações com dificuldade de movimentar, febre alta ou palidez.'
    ],
    retorno: 'Reavaliação em 7 dias na forma clássica ou antes se sinais de alarme; em portadores de anemia hemolítica, reavaliação clínica e hemograma conforme orientação da hematologia; gestantes expostas devem ser reavaliadas no pré-natal em até 7 dias.',
    prevencao: [
      'Não há vacina disponível.',
      'Higiene das mãos e etiqueta respiratória, especialmente em creches e escolas durante surtos.',
      'Identificação ativa de gestantes e de portadores de anemia hemolítica entre os contatos, com orientação específica.',
      'Precaução de gotículas em pacientes internados com crise aplástica ou aplasia crônica, que são altamente transmissíveis.',
      'Não há indicação de afastamento escolar para o caso típico com exantema já instalado.',
      'Triagem sorológica de gestantes expostas conforme protocolo do pré-natal.'
    ],
    fontes: [
      { nome: 'Nelson Textbook of Pediatrics, 22ª edição', ano: 2024 },
      { nome: 'Tratado de Pediatria – Sociedade Brasileira de Pediatria', ano: 2022 },
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
      { nome: 'Red Book – American Academy of Pediatrics', ano: 2024 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'mao_pe_boca',
    nome: 'Doença mão-pé-boca',
    categoria: 'infecciosa',
    amazonia: false,
    cid10: 'B08.4',
    tags: ['febre', 'exantema', 'lesoes_pele', 'dor_garganta', 'desidratacao', 'prurido', 'vomitos', 'convulsao'],
    definicao: 'Enterovirose aguda caracterizada por enantema vesicular e ulcerado em cavidade oral associado a exantema vesicular ou maculopapular em mãos, pés, nádegas e região perioral, acompanhado de febre. Habitualmente autolimitada, tem como principal risco a desidratação por recusa alimentar decorrente da dor oral.',
    epidemiologia: 'Acomete principalmente crianças menores de 5 anos, com surtos frequentes em creches e escolas de educação infantil. No Amazonas ocorre ao longo de todo o ano, com surtos em creches urbanas de Manaus e em comunidades com aglomeração domiciliar; o calor e a umidade favorecem a manutenção da transmissão. A eliminação viral prolongada pelas fezes (semanas) sustenta a transmissão mesmo após a melhora clínica. Enterovírus A71 está associado a formas neurológicas graves, descritas em surtos em várias regiões do mundo; coxsackievírus A6 associa-se a formas atípicas e extensas, com descamação e onicomadese tardias.',
    agente: 'Enterovírus, principalmente coxsackievírus A16 e A6 e enterovírus A71; outros coxsackievírus do grupo A e echovírus também podem causar o quadro.',
    transmissao: 'Contato direto com secreções orais e respiratórias, com o líquido das vesículas e por via fecal-oral. Transmissibilidade maior na primeira semana de doença; eliminação viral nas fezes por 4 a 8 semanas. Transmissão indireta por brinquedos, mãos e superfícies contaminadas.',
    incubacao: '3 a 6 dias (variação de 2 a 10 dias).',
    manifestacoes: [
      'Febre baixa a moderada por 1 a 3 dias, com irritabilidade, inapetência e dor de garganta.',
      'Enantema: vesículas e úlceras rasas e dolorosas em língua, mucosa jugal, palato e pilares amigdalianos, causando recusa alimentar e sialorreia.',
      'Exantema vesicular de formato elíptico, com halo eritematoso, em palmas, plantas, dorso de mãos e pés e região interdigital; as lesões podem ser dolorosas e pouco pruriginosas.',
      'Lesões em nádegas e região perineal, frequentes em lactentes que usam fralda, muitas vezes maculopapulares em vez de vesiculares.',
      'Forma atípica por coxsackievírus A6: lesões mais extensas e numerosas, envolvendo tronco, face e membros, com aspecto bolhoso ou eczematoso sobre áreas de dermatite prévia (eczema coxsackium).',
      'Descamação de palmas e plantas 1 a 3 semanas após o quadro e onicomadese (queda das unhas) 3 a 8 semanas depois, ambas benignas.',
      'Herpangina como forma relacionada: úlceras restritas ao palato mole e pilares, com febre alta e sem lesões cutâneas.',
      'Complicações raras: desidratação, meningite asséptica, encefalite de tronco e romboencefalite, miocardite e edema pulmonar neurogênico, associados principalmente ao enterovírus A71.'
    ],
    sinaisAlarme: [
      'Recusa completa de líquidos, boca seca, choro sem lágrimas, diminuição da diurese ou olhos encovados (desidratação).',
      'Febre alta persistente por mais de 3 dias.',
      'Mioclonias durante o sono, tremores, ataxia, incoordenação ou nistagmo (sinais de acometimento de tronco).',
      'Letargia, irritabilidade extrema, vômitos persistentes, convulsão ou rigidez de nuca.',
      'Taquicardia desproporcional à febre, taquipneia, sudorese fria, moteamento cutâneo ou dor torácica (suspeita de miocardite).',
      'Lesões cutâneas com sinais de infecção bacteriana secundária (calor, dor, pus).',
      'Menor de 3 meses com o quadro.'
    ],
    diagnosticoDiferencial: ['varicela', 'herpes-vírus simples (gengivoestomatite herpética)', 'escabiose_impetigo', 'aftas e estomatite aftosa recorrente', 'eritema multiforme', 'escarlatina', 'farmacodermia', 'sífilis secundária em adolescentes', 'reação a picadas de inseto'],
    exames: ['hemograma', 'pcr', 'eletrolitos', 'sodio', 'potassio', 'glicemia', 'liquor', 'PCR para enterovírus em swab de orofaringe, fezes ou líquor (casos graves ou surtos)', 'gasometria', 'lactato'],
    criteriosDiagnosticos: [
      'Diagnóstico clínico: úlceras orais dolorosas associadas a lesões vesiculares em mãos, pés e nádegas, com febre, em criança menor de 5 anos, especialmente em contexto de surto em creche.',
      'Exames laboratoriais não são necessários na forma típica.',
      'PCR para enterovírus em swab de orofaringe, fezes ou líquor deve ser reservado para casos graves, com acometimento neurológico ou cardíaco, e para investigação de surtos pela vigilância.',
      'Punção lombar indicada se sinais meníngeos, alteração de consciência, mioclonias ou ataxia; líquor pode mostrar pleocitose com predomínio linfocitário.',
      'Avaliar eletrólitos, glicemia e função renal quando houver desidratação por recusa alimentar.',
      'Considerar eletrocardiograma, troponina e ecocardiograma se suspeita de miocardite, conforme protocolo do serviço.'
    ],
    classificacaoGravidade: [
      { nivel: 'Leve', criterios: 'Criança com febre baixa, poucas lesões, aceitando líquidos e alimentos pastosos, hidratada e sem sinais neurológicos. Manejo domiciliar com analgesia e hidratação.' },
      { nivel: 'Moderada', criterios: 'Lesões orais extensas com recusa alimentar parcial, desidratação leve, febre por mais de 3 dias ou lesões cutâneas muito numerosas. Observação em unidade, reidratação e analgesia otimizada.' },
      { nivel: 'Grave', criterios: 'Desidratação moderada a grave, sinais neurológicos (mioclonias, ataxia, alteração de consciência, convulsão), suspeita de miocardite ou edema pulmonar. Internação, monitorização e investigação para enterovírus A71.' }
    ],
    tratamento: [
      'Não há antiviral específico disponível na rotina: o tratamento é sintomático e o foco é manter a hidratação.',
      'Analgesia regular e programada com paracetamol ou dipirona, administrada cerca de 30 minutos antes das refeições para facilitar a aceitação oral.',
      'Ibuprofeno pode ser usado como alternativa analgésica conforme bula, evitando em desidratação.',
      'Oferecer líquidos gelados, sorvetes, gelatina, leite, iogurte e alimentos pastosos e frios; evitar sucos ácidos, alimentos salgados, quentes ou condimentados.',
      'Sais de reidratação oral em pequenos volumes e com frequência; hidratação venosa se recusa completa ou desidratação moderada a grave.',
      'Evitar soluções orais com anestésicos tópicos em lactentes pelo risco de aspiração e toxicidade; se usadas em crianças maiores, apenas conforme prescrição e bula.',
      'Não usar antibióticos, corticoides tópicos nas lesões orais ou preparações caseiras.',
      'Higiene das lesões cutâneas com água e sabonete neutro; antibiótico tópico ou sistêmico apenas se infecção bacteriana secundária.',
      'Afastamento de creche e escola enquanto houver febre, lesões orais dolorosas com sialorreia ou lesões vesiculares ativas; o retorno não depende do desaparecimento completo das lesões nem da eliminação viral fecal.',
      'Casos com sinais neurológicos ou cardíacos: internação, monitorização contínua, suporte e avaliação por neurologia e cardiologia pediátricas, conforme protocolo do serviço.',
      'Orientar sobre descamação de mãos e pés e possível queda de unhas semanas depois, fenômenos benignos que não requerem tratamento.'
    ],
    medicamentos: [
      { medId: 'paracetamol', esquema: 'Dor oral e febre: 10 a 15 mg/kg/dose VO a cada 6 horas, conforme bula; administrar antes das refeições para facilitar a aceitação.' },
      { medId: 'dipirona', esquema: 'Alternativa analgésica e antitérmica: 10 a 15 mg/kg/dose VO ou IV a cada 6 horas, conforme bula.' },
      { medId: 'ibuprofeno', esquema: 'Alternativa analgésica: 5 a 10 mg/kg/dose VO a cada 6 a 8 horas, conforme bula; evitar se desidratação.' },
      { medId: 'sais_reidratacao_oral', esquema: 'Reidratação e prevenção de desidratação: SRO em pequenos volumes frequentes, conforme plano A ou B do MS.' },
      { medId: 'soro_fisiologico', esquema: 'Desidratação com recusa oral: expansão e hidratação venosa com SF 0,9% conforme plano C ou protocolo do serviço.' },
      { medId: 'ringer_lactato', esquema: 'Alternativa para expansão volêmica na desidratação moderada a grave, conforme protocolo do serviço.' },
      { medId: 'cefalexina', esquema: 'Apenas se infecção bacteriana secundária de pele: 50 a 100 mg/kg/dia VO dividida a cada 6 horas por 7 dias, conforme protocolo.' }
    ],
    criteriosInternacao: [
      'Desidratação moderada a grave ou recusa completa de líquidos.',
      'Vômitos persistentes impedindo a reidratação oral.',
      'Febre alta por mais de 3 a 5 dias ou toxemia.',
      'Qualquer sinal neurológico: mioclonias, ataxia, tremor, alteração de consciência, convulsão ou rigidez de nuca.',
      'Suspeita de miocardite (taquicardia desproporcional, dispneia, sudorese, dor torácica).',
      'Infecção bacteriana secundária extensa de pele.',
      'Lactente menor de 3 meses ou imunossuprimido.',
      'Dificuldade de retorno para reavaliação em contexto rural ou ribeirinho.'
    ],
    criteriosUTI: [
      'Romboencefalite ou encefalite com rebaixamento de consciência, apneia ou instabilidade autonômica.',
      'Edema pulmonar neurogênico ou insuficiência respiratória.',
      'Miocardite com disfunção ventricular, arritmia ou choque cardiogênico.',
      'Estado de mal convulsivo.',
      'Choque hipovolêmico refratário à reposição inicial.'
    ],
    criteriosAlta: [
      'Aceitação oral adequada de líquidos e alimentos pastosos, com hidratação mantida.',
      'Dor oral controlada com analgesia oral domiciliar.',
      'Afebril ou com febre em declínio, sem sinais neurológicos ou cardíacos.',
      'Diurese normal e eletrólitos corrigidos, quando alterados.',
      'Responsável orientado sobre hidratação, analgesia programada, afastamento e sinais de alarme.'
    ],
    orientacoes: [
      'O mais importante é manter a criança bebendo líquidos: oferecer pequenas quantidades muitas vezes ao dia.',
      'Dar o remédio para dor no horário certo, cerca de meia hora antes das refeições, para que a criança consiga comer.',
      'Oferecer alimentos frios e macios como gelatina, iogurte, sorvete, purê e leite; evitar suco de laranja, limão, alimentos quentes, salgados ou temperados.',
      'Não passar remédios ou receitas caseiras na boca sem orientação médica.',
      'Lavar bem as mãos após trocar fraldas e antes de preparar alimentos; o vírus sai nas fezes por várias semanas.',
      'Manter a criança fora da creche enquanto tiver febre, muita baba e feridas na boca doendo.',
      'É normal a pele das mãos e dos pés descascar depois e, semanas depois, alguma unha cair e nascer de novo.',
      'Retornar imediatamente se a criança parar de beber, urinar pouco, ficar muito sonolenta ou irritada, apresentar tremores ou abalos durante o sono, andar cambaleando, vomitar muito, tiver convulsão ou dificuldade para respirar.'
    ],
    retorno: 'Reavaliação em 24 a 48 horas nos casos com lesões orais extensas ou em lactentes, e imediatamente diante de qualquer sinal de alarme; nos casos leves, retorno se a febre passar de 3 dias ou se houver piora da aceitação oral.',
    prevencao: [
      'Não há vacina disponível no Brasil (vacinas contra enterovírus A71 existem apenas em alguns países).',
      'Lavagem frequente das mãos com água e sabão, especialmente após troca de fraldas e uso do banheiro.',
      'Limpeza e desinfecção de brinquedos, superfícies, chupetas e mamadeiras em creches, com atenção a superfícies compartilhadas.',
      'Afastamento da criança sintomática das atividades coletivas durante a fase aguda.',
      'Evitar compartilhar copos, talheres, chupetas e escovas de dente.',
      'Orientação às creches sobre notificação de surtos à vigilância municipal.',
      'Cuidado redobrado com gestantes próximas ao parto e com recém-nascidos, pelo risco de doença neonatal grave por enterovírus.'
    ],
    fontes: [
      { nome: 'Nelson Textbook of Pediatrics, 22ª edição', ano: 2024 },
      { nome: 'Tratado de Pediatria – Sociedade Brasileira de Pediatria', ano: 2022 },
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
      { nome: 'OMS – A Guide to Clinical Management and Public Health Response for Hand, Foot and Mouth Disease', ano: 2011 }
    ],
    atualizadoEm: '2026-09'
  }
,

  {
    id: 'escarlatina',
    nome: 'Escarlatina',
    categoria: 'infecciosa',
    amazonia: false,
    cid10: 'A38',
    tags: ['febre', 'exantema', 'dor_garganta', 'linfonodomegalia', 'cefaleia', 'vomitos', 'dor_abdominal', 'lesoes_pele'],
    definicao: 'Doença exantemática causada por cepas de Streptococcus pyogenes produtoras de toxina eritrogênica, caracterizada por faringoamigdalite aguda associada a exantema micropapular áspero (aspecto de lixa), língua em framboesa, palidez perioral e descamação lamelar tardia de mãos e pés.',
    epidemiologia: 'Acomete principalmente escolares de 5 a 15 anos, sendo rara antes dos 3 anos. Ocorre em surtos escolares e domiciliares, com maior frequência no período de maior aglomeração. No Amazonas, a relevância principal está no risco de complicações não supurativas em populações com acesso tardio ao serviço de saúde: febre reumática e glomerulonefrite difusa aguda pós-estreptocócica seguem sendo problemas em comunidades ribeirinhas e periferias urbanas, onde a faringite estreptocócica frequentemente não é tratada. O tratamento antibiótico adequado previne a febre reumática, mas não previne a glomerulonefrite.',
    agente: 'Streptococcus pyogenes (estreptococo beta-hemolítico do grupo A) produtor de exotoxinas pirogênicas (toxinas eritrogênicas A, B e C).',
    transmissao: 'Gotículas respiratórias e contato direto com secreções de nasofaringe de doentes ou portadores; raramente por alimentos contaminados. A transmissibilidade cessa em cerca de 24 horas após o início do antibiótico eficaz.',
    incubacao: '1 a 4 dias (podendo chegar a 7 dias).',
    manifestacoes: [
      'Início abrupto com febre alta, dor de garganta intensa, cefaleia, vômitos e dor abdominal.',
      'Faringe e amígdalas hiperemiadas, com exsudato, petéquias em palato e adenomegalia cervical anterior dolorosa.',
      'Exantema micropapular difuso, eritematoso, de textura áspera ao tato (aspecto de lixa), surgindo 12 a 48 horas após a febre, iniciando em pescoço, tórax e axilas e poupando palmas e plantas.',
      'Acentuação do exantema em dobras cutâneas com linhas transversais mais escuras e petequiais (sinal de Pastia), em fossas antecubitais, axilas e virilhas.',
      'Rubor facial com palidez perioral característica (sinal de Filatov).',
      'Língua inicialmente saburrosa com papilas proeminentes (língua em morango branca) evoluindo para língua vermelha e papilada (língua em framboesa) por volta do 4º ao 5º dia.',
      'Descamação lamelar de mãos, pés e dedos 1 a 3 semanas após o quadro, e descamação furfurácea em tronco.',
      'Complicações supurativas: abscesso periamigdaliano e retrofaríngeo, otite média, sinusite, adenite cervical supurada.',
      'Complicações não supurativas: febre reumática (2 a 4 semanas após) e glomerulonefrite difusa aguda (1 a 3 semanas após).'
    ],
    sinaisAlarme: [
      'Dificuldade respiratória, estridor, sialorreia, trismo, voz abafada ou desvio de úvula (abscesso periamigdaliano ou retrofaríngeo).',
      'Incapacidade de deglutir saliva ou líquidos, com desidratação.',
      'Toxemia, hipotensão, exantema com descamação precoce e difusa (suspeita de síndrome do choque tóxico estreptocócico).',
      'Edema periorbitário, urina escura, oligúria ou hipertensão (glomerulonefrite pós-estreptocócica).',
      'Artrite migratória, cardite, coreia ou nódulos subcutâneos (febre reumática).',
      'Celulite, dor desproporcional em partes moles ou lesão cutânea de evolução rápida (infecção invasiva).',
      'Febre persistente após 48 a 72 horas de antibiótico adequado.'
    ],
    diagnosticoDiferencial: ['faringoamigdalite_estreptococica', 'sarampo', 'rubeola', 'mononucleose', 'doença de Kawasaki', 'síndrome do choque tóxico', 'farmacodermia', 'exantema_subito', 'eritema_infeccioso', 'dengue', 'síndrome da pele escaldada estafilocócica'],
    exames: ['teste rápido para antígeno de estreptococo do grupo A em swab de orofaringe', 'cultura de orofaringe (swab)', 'hemograma', 'pcr', 'vhs', 'urina_1', 'ureia', 'creatinina', 'antiestreptolisina O (ASLO)', 'hemocultura (suspeita de infecção invasiva)'],
    criteriosDiagnosticos: [
      'Quadro clínico compatível: faringoamigdalite aguda febril em escolar com exantema micropapular áspero, palidez perioral, sinal de Pastia e língua em framboesa.',
      'Teste rápido de antígeno para estreptococo do grupo A positivo confirma; teste rápido negativo em criança com quadro sugestivo deve ser seguido de cultura de orofaringe, quando disponível.',
      'Escores clínicos (Centor modificado por McIsaac) auxiliam a estimar a probabilidade de etiologia estreptocócica, mas na escarlatina o exantema típico já eleva muito a suspeição.',
      'ASLO tem valor retrospectivo e não serve para decisão terapêutica na fase aguda.',
      'Solicitar urina rotina, ureia e creatinina se edema, hipertensão, urina escura ou oligúria após o quadro.',
      'Não há indicação de cultura de controle após o tratamento em pacientes assintomáticos, exceto em situações especiais definidas pelo serviço.'
    ],
    classificacaoGravidade: [
      { nivel: 'Leve a moderada (não complicada)', criterios: 'Febre, faringite e exantema típico, com boa aceitação oral, sem sinais de obstrução de via aérea nem toxemia. Tratamento ambulatorial com antibiótico e sintomáticos.' },
      { nivel: 'Com complicação supurativa', criterios: 'Abscesso periamigdaliano ou retrofaríngeo, adenite supurada, otite média complicada. Internação, antibiótico intravenoso e avaliação otorrinolaringológica e cirúrgica.' },
      { nivel: 'Invasiva ou grave', criterios: 'Síndrome do choque tóxico estreptocócico, fasciíte necrosante, bacteremia, ou complicação não supurativa com repercussão (glomerulonefrite com hipertensão e oligúria, cardite reumática). Internação e suporte, com avaliação especializada.' }
    ],
    tratamento: [
      'Antibioticoterapia visando erradicação do estreptococo e prevenção da febre reumática, eficaz mesmo quando iniciada até o 9º dia do início dos sintomas.',
      'Primeira escolha: penicilina benzatina em dose única intramuscular ou amoxicilina por via oral por 10 dias; a duração completa de 10 dias é essencial para a erradicação.',
      'Alergia à penicilina: azitromicina por 5 dias ou claritromicina por 10 dias, conforme bula e perfil de resistência local; cefalexina é opção em alergia não anafilática.',
      'Analgesia e antitérmico com paracetamol ou dipirona; ibuprofeno pode ser usado para dor de garganta conforme bula, evitando em desidratação ou suspeita de infecção invasiva de partes moles.',
      'Hidratação oral, dieta leve e fria, com atenção à aceitação de líquidos.',
      'A criança deixa de ser transmissível cerca de 24 horas após o início do antibiótico eficaz e pode retornar à escola após esse período, se afebril.',
      'Não usar corticoide de rotina; reservar para situações específicas de obstrução, conforme avaliação especializada.',
      'Reavaliar em 48 a 72 horas: persistência da febre sugere complicação supurativa, má adesão ou diagnóstico alternativo.',
      'Orientar retorno em 1 a 3 semanas para pesquisa ativa de sinais de glomerulonefrite (edema, urina escura, oligúria) e, em 2 a 4 semanas, de febre reumática (artrite, cardite, coreia).',
      'Investigar e tratar contatos domiciliares sintomáticos; não há indicação de tratamento de portadores assintomáticos de rotina.',
      'Suspeita de síndrome do choque tóxico ou infecção invasiva: internação imediata, expansão volêmica, penicilina cristalina associada a clindamicina e avaliação cirúrgica, conforme protocolo do serviço.'
    ],
    medicamentos: [
      { medId: 'penicilina_benzatina', esquema: 'Dose única IM: 600.000 UI em crianças com peso abaixo de 27 kg e 1.200.000 UI em peso igual ou acima de 27 kg. Observar por 30 minutos após a aplicação.' },
      { medId: 'amoxicilina', esquema: 'Alternativa oral: 50 mg/kg/dia VO (máximo 1 g/dia) em 1 ou 2 tomadas por 10 dias; a duração de 10 dias não deve ser encurtada.' },
      { medId: 'azitromicina', esquema: 'Alergia à penicilina: 12 mg/kg/dia VO uma vez ao dia (máximo 500 mg/dia) por 5 dias, conforme bula.' },
      { medId: 'claritromicina', esquema: 'Alergia à penicilina: 15 mg/kg/dia VO dividida 12/12 h (máximo 500 mg por dose) por 10 dias.' },
      { medId: 'cefalexina', esquema: 'Alergia não anafilática à penicilina: 40 a 50 mg/kg/dia VO dividida 12/12 h (máximo 1 g/dia) por 10 dias.' },
      { medId: 'penicilina_cristalina', esquema: 'Infecção invasiva ou choque tóxico estreptocócico internado: 200.000 a 400.000 UI/kg/dia IV dividida 4/4 ou 6/6 h, associada a clindamicina, conforme protocolo do serviço.' },
      { medId: 'paracetamol', esquema: 'Dor e febre: 10 a 15 mg/kg/dose VO a cada 6 horas, conforme bula.' },
      { medId: 'ibuprofeno', esquema: 'Odinofagia: 5 a 10 mg/kg/dose VO a cada 6 a 8 horas, conforme bula; evitar se suspeita de infecção invasiva de pele e partes moles ou desidratação.' }
    ],
    criteriosInternacao: [
      'Suspeita de abscesso periamigdaliano ou retrofaríngeo (trismo, voz abafada, sialorreia, desvio de úvula).',
      'Incapacidade de deglutir com desidratação ou intolerância ao antibiótico oral.',
      'Toxemia, hipotensão ou suspeita de infecção invasiva.',
      'Glomerulonefrite pós-estreptocócica com hipertensão, edema importante ou oligúria.',
      'Suspeita de febre reumática com cardite ou artrite incapacitante.',
      'Falha do tratamento ambulatorial após 48 a 72 horas.',
      'Impossibilidade de adesão ou de retorno para reavaliação.'
    ],
    criteriosUTI: [
      'Choque tóxico estreptocócico ou choque séptico.',
      'Obstrução de via aérea superior por abscesso com necessidade de via aérea artificial.',
      'Fasciíte necrosante com necessidade de desbridamento e suporte hemodinâmico.',
      'Insuficiência cardíaca por cardite reumática grave.',
      'Encefalopatia hipertensiva ou insuficiência renal aguda com necessidade de diálise.'
    ],
    criteriosAlta: [
      'Afebril por pelo menos 24 horas e com melhora da odinofagia e do estado geral.',
      'Aceitação adequada de líquidos e do antibiótico por via oral.',
      'Ausência de sinais de complicação supurativa ou de acometimento renal e cardíaco.',
      'Pressão arterial e diurese normais.',
      'Responsável orientado sobre a necessidade de completar 10 dias de antibiótico oral, quando for o caso.',
      'Retorno agendado para vigilância de complicações tardias.'
    ],
    orientacoes: [
      'Dar o antibiótico todos os dias, no horário certo, até completar 10 dias, mesmo que a criança melhore em 2 dias; interromper antes aumenta o risco de problema no coração (febre reumática).',
      'Se foi aplicada a injeção de penicilina benzatina, o tratamento já está completo com a dose única.',
      'A criança pode voltar à escola 24 horas depois de começar o antibiótico, se estiver sem febre.',
      'Oferecer líquidos gelados, sorvete, gelatina e alimentos macios; evitar alimentos ácidos e condimentados.',
      'A pele das mãos e dos pés pode descascar em placas 1 a 3 semanas depois; é esperado e não precisa de tratamento.',
      'Observar nas próximas semanas: inchaço nos olhos ou pernas, urina escura como refrigerante ou em pouca quantidade, dor e inchaço nas juntas, falta de ar ou movimentos involuntários; procurar a unidade de saúde se aparecerem.',
      'Retornar imediatamente se houver dificuldade para respirar ou engolir saliva, boca que não abre, voz muito abafada, ou febre que continua depois de 3 dias de antibiótico.',
      'Levar à unidade de saúde outras crianças da casa que estejam com dor de garganta e febre.'
    ],
    retorno: 'Reavaliação em 48 a 72 horas para verificar resposta ao antibiótico; retorno programado em 1 a 3 semanas para pesquisa de glomerulonefrite (pressão arterial, edema, urina rotina) e orientação sobre sinais de febre reumática por até 4 semanas.',
    prevencao: [
      'Não há vacina disponível contra o estreptococo do grupo A.',
      'Diagnóstico e tratamento precoces da faringoamigdalite estreptocócica, principal medida de prevenção da febre reumática.',
      'Higiene das mãos, etiqueta respiratória e não compartilhamento de copos e talheres.',
      'Afastamento escolar até 24 horas após o início do antibiótico.',
      'Avaliação de contatos domiciliares sintomáticos.',
      'Em pacientes com febre reumática prévia, profilaxia secundária com penicilina benzatina conforme protocolo do Ministério da Saúde.',
      'Redução da aglomeração domiciliar e melhoria das condições de moradia como medida estrutural.'
    ],
    fontes: [
      { nome: 'Diretrizes Brasileiras para o Diagnóstico e Tratamento da Febre Reumática – Sociedade Brasileira de Cardiologia e SBP', ano: 2009 },
      { nome: 'Tratado de Pediatria – Sociedade Brasileira de Pediatria', ano: 2022 },
      { nome: 'Nelson Textbook of Pediatrics, 22ª edição', ano: 2024 },
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'coqueluche',
    nome: 'Coqueluche',
    categoria: 'respiratoria',
    amazonia: false,
    cid10: 'A37',
    tags: ['tosse', 'coriza', 'vomitos', 'dispneia', 'febre', 'convulsao', 'alteracao_consciencia', 'palidez', 'fraqueza'],
    definicao: 'Doença respiratória bacteriana aguda e altamente transmissível, caracterizada por tosse paroxística prolongada, muitas vezes seguida de guincho inspiratório e vômitos pós-tosse. Em lactentes menores de 6 meses pode manifestar-se por apneia, cianose e evolução maligna com hiperleucocitose e hipertensão pulmonar.',
    epidemiologia: 'A coqueluche é doença de notificação compulsória imediata no Brasil. A incidência voltou a subir após quedas nas coberturas vacinais de penta e dTpa, com surtos em várias unidades federadas. No Amazonas, a gravidade concentra-se em lactentes menores de 3 meses ainda não imunizados ou com esquema incompleto, sobretudo em comunidades ribeirinhas e indígenas com dificuldade de acesso à sala de vacina e ao transporte para o hospital de referência em Manaus. Adolescentes e adultos com imunidade em declínio são a principal fonte de infecção para os lactentes do domicílio. A vacinação de gestantes com dTpa a partir da 20ª semana é a estratégia mais eficaz para proteger o recém-nascido.',
    agente: 'Bordetella pertussis; Bordetella parapertussis causa quadro semelhante e mais brando.',
    transmissao: 'Gotículas respiratórias de pessoa doente, com transmissibilidade muito alta entre contatos domiciliares suscetíveis. O período de transmissão vai do início dos sintomas catarrais até cerca de 3 semanas após o início dos paroxismos, reduzindo-se a 5 dias após o início do antibiótico adequado.',
    incubacao: '5 a 10 dias, podendo chegar a 21 dias.',
    manifestacoes: [
      'Fase catarral (1 a 2 semanas): coriza, espirros, tosse leve e febre baixa ou ausente, indistinguível de resfriado comum, porém com tosse que progride em vez de melhorar.',
      'Fase paroxística (2 a 6 semanas): acessos de tosse súbitos, repetitivos e intensos, em salvas, sem intervalo para inspiração, seguidos de guincho inspiratório e frequentemente de vômito pós-tosse.',
      'Congestão facial, cianose, lacrimejamento, protrusão de língua e exaustão durante e após o paroxismo, com aspecto normal entre as crises.',
      'Em lactentes menores de 6 meses o guincho pode estar ausente: apneia, cianose, engasgo, bradicardia e episódio de aparente risco de vida podem ser as únicas manifestações.',
      'Febre habitualmente ausente ou baixa; febre alta sugere coinfecção ou pneumonia bacteriana secundária.',
      'Fase de convalescença (semanas a meses): redução gradual da frequência e intensidade dos paroxismos, com recrudescência a cada nova infecção respiratória.',
      'Complicações mecânicas: hemorragia subconjuntival, petéquias em face e pescoço, hérnia, pneumotórax, enfisema subcutâneo e úlcera de frênulo lingual.',
      'Complicações graves: pneumonia (primária ou secundária), convulsão, encefalopatia, desnutrição por vômitos repetidos e coqueluche maligna com hiperleucocitose, hipertensão pulmonar e choque.'
    ],
    sinaisAlarme: [
      'Apneia, cianose ou bradicardia durante ou após os acessos de tosse.',
      'Idade menor de 3 meses, prematuridade ou esquema vacinal incompleto.',
      'Taquipneia persistente entre os paroxismos, tiragem ou saturação abaixo de 92%.',
      'Leucocitose acentuada (contagem de leucócitos acima de 50.000/mm3 ou linfocitose extrema), preditora de coqueluche maligna.',
      'Vômitos que impedem a alimentação, perda de peso ou desidratação.',
      'Convulsão, sonolência ou alteração de consciência.',
      'Taquicardia desproporcional e sinais de baixo débito (suspeita de hipertensão pulmonar).',
      'Febre alta ou piora súbita (pneumonia bacteriana secundária).'
    ],
    diagnosticoDiferencial: ['bronquiolite', 'pneumonia', 'asma', 'tuberculose', 'aspiração de corpo estranho', 'refluxo gastroesofágico com aspiração', 'infecção por Mycoplasma, Chlamydia trachomatis ou adenovírus', 'fibrose cística', 'tosse psicogênica em adolescentes'],
    exames: ['PCR em tempo real para Bordetella pertussis em aspirado ou swab de nasofaringe (swab de rayon ou dacron)', 'cultura de nasofaringe para Bordetella pertussis', 'hemograma', 'radiografia_torax', 'pcr', 'gasometria', 'eletrolitos', 'sodio', 'glicemia', 'hemocultura (suspeita de infecção secundária)'],
    criteriosDiagnosticos: [
      'Definição de caso suspeito (MS): todo indivíduo com tosse por 14 dias ou mais associada a paroxismos, guincho inspiratório ou vômitos pós-tosse; em menores de 6 meses, considerar suspeito todo lactente com tosse de qualquer duração associada a apneia, cianose, engasgo ou paroxismos.',
      'Coletar aspirado ou swab de nasofaringe para PCR e cultura antes ou nas primeiras horas do antibiótico, preferencialmente nas primeiras 3 semanas de tosse.',
      'Hemograma com leucocitose e linfocitose absoluta reforça a suspeita em lactentes; leucometria muito elevada é marcador de gravidade.',
      'Radiografia de tórax pode mostrar infiltrado peri-hilar, atelectasias ou o clássico coração felpudo; serve sobretudo para excluir complicações.',
      'Vínculo epidemiológico com caso confirmado ou contato com tossidor crônico no domicílio apoia o diagnóstico.',
      'Iniciar tratamento e quimioprofilaxia com base na suspeita clínica, sem aguardar o resultado laboratorial.',
      'Notificação compulsória imediata e investigação de contatos pela vigilância epidemiológica.'
    ],
    classificacaoGravidade: [
      { nivel: 'Leve', criterios: 'Criança maior de 6 meses ou adolescente, com paroxismos tolerados, sem apneia, cianose ou vômitos incoercíveis, alimentando-se bem e com saturação normal. Tratamento ambulatorial com macrolídeo e isolamento.' },
      { nivel: 'Moderada', criterios: 'Paroxismos frequentes com cianose transitória, vômitos pós-tosse limitando a alimentação, perda de peso ou idade entre 3 e 6 meses. Observação hospitalar com monitorização e suporte alimentar.' },
      { nivel: 'Grave (coqueluche maligna)', criterios: 'Lactente menor de 3 meses, apneias, insuficiência respiratória, leucocitose acima de 50.000/mm3, hipertensão pulmonar, choque ou encefalopatia. Internação em UTI, com suporte avançado e avaliação de exsanguineotransfusão conforme protocolo.' }
    ],
    tratamento: [
      'Antibioticoterapia com macrolídeo: reduz a transmissibilidade e, quando iniciada na fase catarral, pode atenuar a evolução; iniciada após o início dos paroxismos, tem pouco efeito sobre a duração da tosse mas mantém a indicação para bloqueio da transmissão.',
      'Azitromicina é o macrolídeo de escolha, inclusive em menores de 1 mês, situação em que é preferida à eritromicina pelo risco de estenose hipertrófica de piloro associada à eritromicina.',
      'Claritromicina é alternativa em maiores de 1 mês; sulfametoxazol com trimetoprima é a alternativa para maiores de 2 meses com contraindicação a macrolídeos.',
      'Quimioprofilaxia para todos os contatos domiciliares e contatos próximos de risco (lactentes menores de 1 ano, gestantes no terceiro trimestre, imunossuprimidos, profissionais e crianças de creches), com o mesmo esquema do tratamento, conforme as definições do Guia de Vigilância em Saúde.',
      'Isolamento respiratório por gotículas até completar 5 dias de antibiótico eficaz; afastamento de creche e escola pelo mesmo período.',
      'Suporte em lactentes: monitorização cardiorrespiratória e oximetria contínua, oxigênio suplementar durante e após os paroxismos, aspiração suave de vias aéreas e ambiente calmo, evitando estímulos que desencadeiem crises.',
      'Alimentação fracionada em pequenos volumes após os paroxismos; sonda nasogástrica ou hidratação venosa se vômitos repetidos ou risco de aspiração.',
      'Não há benefício comprovado de broncodilatadores, corticoides, anti-histamínicos ou antitussígenos; não devem ser usados de rotina.',
      'Coqueluche maligna: internação em UTI, suporte ventilatório, manejo de hipertensão pulmonar e consideração de exsanguineotransfusão ou leucoaférese em casos de hiperleucocitose refratária, conforme protocolo do serviço de referência.',
      'Atualizar o esquema vacinal da criança e dos contatos após o episódio: a doença não confere imunidade duradoura e a vacinação permanece indicada.',
      'Notificação imediata e investigação de comunicantes pela vigilância epidemiológica.'
    ],
    medicamentos: [
      { medId: 'azitromicina', esquema: 'Tratamento e quimioprofilaxia. Menores de 6 meses: 10 mg/kg/dia VO uma vez ao dia por 5 dias. Maiores de 6 meses: 10 mg/kg no 1º dia (máximo 500 mg) e 5 mg/kg/dia do 2º ao 5º dia (máximo 250 mg/dia). É o macrolídeo preferido em menores de 1 mês.' },
      { medId: 'claritromicina', esquema: 'Alternativa em maiores de 1 mês: 15 mg/kg/dia VO dividida 12/12 h (máximo 1 g/dia) por 7 dias.' },
      { medId: 'sulfametoxazol_trimetoprim', esquema: 'Alternativa em maiores de 2 meses com contraindicação a macrolídeo: 40 mg/kg/dia de sulfametoxazol e 8 mg/kg/dia de trimetoprima VO dividida 12/12 h por 14 dias. Contraindicado em menores de 2 meses.' },
      { medId: 'soro_fisiologico', esquema: 'Aspiração e higiene nasal suave antes das mamadas e hidratação venosa com SF 0,9% quando houver intolerância oral, conforme protocolo do serviço.' },
      { medId: 'paracetamol', esquema: 'Desconforto ou febre associada: 10 a 15 mg/kg/dose VO a cada 6 horas, conforme bula.' },
      { medId: null, nome: 'Vacina penta (DTP/Hib/HB), DTP e dTpa', esquema: 'Esquema básico aos 2, 4 e 6 meses com reforços aos 15 meses e 4 anos; dTpa em gestantes a cada gestação a partir da 20ª semana e em profissionais de saúde, conforme o Calendário Nacional de Vacinação.' }
    ],
    criteriosInternacao: [
      'Idade menor de 3 meses com suspeita de coqueluche (internação recomendada mesmo com quadro aparentemente leve).',
      'Apneia, cianose, engasgo ou bradicardia durante os paroxismos.',
      'Saturação abaixo de 92%, taquipneia persistente ou desconforto respiratório.',
      'Vômitos pós-tosse impedindo alimentação, perda de peso ou desidratação.',
      'Leucocitose acentuada ou linfocitose extrema.',
      'Pneumonia, convulsão ou qualquer complicação.',
      'Prematuridade, cardiopatia, pneumopatia ou imunossupressão.',
      'Impossibilidade de observação domiciliar ou de retorno rápido (comunidade distante, transporte fluvial demorado).'
    ],
    criteriosUTI: [
      'Apneias recorrentes ou necessidade de ventilação não invasiva ou invasiva.',
      'Insuficiência respiratória ou hipoxemia refratária.',
      'Coqueluche maligna com hiperleucocitose, hipertensão pulmonar ou choque.',
      'Encefalopatia, convulsões repetidas ou estado de mal convulsivo.',
      'Necessidade de exsanguineotransfusão ou leucoaférese.'
    ],
    criteriosAlta: [
      'Ausência de apneia, cianose ou dessaturação durante os paroxismos por pelo menos 48 horas de observação.',
      'Alimentação oral adequada com ganho ou estabilização do peso.',
      'Pelo menos 5 dias de antibiótico eficaz completados ou em curso com adesão garantida.',
      'Ausência de complicações ativas.',
      'Contatos domiciliares avaliados e quimioprofilaxia orientada.',
      'Responsável orientado sobre a duração prolongada da tosse e sobre sinais de alarme.',
      'Notificação realizada e calendário vacinal da criança e da família programado.'
    ],
    orientacoes: [
      'A tosse pode durar semanas ou até meses, melhorando aos poucos; isso não significa que o tratamento falhou.',
      'Dar o antibiótico todos os dias até o fim, mesmo com a tosse continuando: ele serve principalmente para a criança parar de transmitir.',
      'Manter a criança em casa, longe de bebês e gestantes, até completar 5 dias de antibiótico.',
      'Alimentar em pequenas quantidades e com mais frequência, logo após os acessos de tosse, para reduzir os vômitos.',
      'Manter o ambiente calmo, sem fumaça de cigarro, de fogão a lenha ou cheiros fortes, que desencadeiam as crises.',
      'Não usar xaropes para tosse, remédios caseiros ou antialérgicos por conta própria.',
      'Todos os moradores da casa devem procurar a unidade de saúde para avaliar a necessidade de antibiótico preventivo e atualizar as vacinas.',
      'Retornar imediatamente se o bebê ficar roxo, parar de respirar, ficar molinho, vomitar tudo o que mama, tiver febre alta, respiração rápida ou convulsão.'
    ],
    retorno: 'Reavaliação em 24 a 48 horas nos lactentes tratados ambulatorialmente e em 3 a 5 dias nas demais idades; retorno imediato diante de apneia, cianose, dificuldade respiratória ou piora da aceitação alimentar. Consulta de revisão ao final do tratamento para avaliação do peso e do calendário vacinal.',
    prevencao: [
      'Vacinação com pentavalente aos 2, 4 e 6 meses e reforços com DTP aos 15 meses e 4 anos, conforme o Calendário Nacional de Vacinação.',
      'Vacinação de gestantes com dTpa em cada gestação, a partir da 20ª semana, para proteção passiva do recém-nascido, com esforço especial nas comunidades ribeirinhas e indígenas.',
      'Estratégia de cocoon: vacinação de pais, cuidadores e profissionais de saúde que convivem com lactentes.',
      'Quimioprofilaxia de contatos domiciliares e próximos conforme o Guia de Vigilância em Saúde.',
      'Isolamento respiratório por gotículas e afastamento por 5 dias após o início do antibiótico.',
      'Notificação compulsória imediata e investigação de comunicantes.',
      'Busca ativa de faltosos da vacinação e vacinação em barcos e unidades fluviais no interior do Amazonas.'
    ],
    fontes: [
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
      { nome: 'Calendário Nacional de Vacinação – Ministério da Saúde', ano: 2025 },
      { nome: 'Documento Científico de Infectologia – Sociedade Brasileira de Pediatria', ano: 2023 },
      { nome: 'Red Book – American Academy of Pediatrics', ano: 2024 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'mononucleose',
    nome: 'Mononucleose infecciosa',
    categoria: 'infecciosa',
    amazonia: false,
    cid10: 'B27',
    tags: ['febre', 'dor_garganta', 'linfonodomegalia', 'esplenomegalia', 'hepatomegalia', 'fraqueza', 'exantema', 'ictericia', 'cefaleia', 'dor_abdominal'],
    definicao: 'Síndrome clínica causada principalmente pelo vírus Epstein-Barr, caracterizada pela tríade febre, faringoamigdalite e linfadenopatia generalizada, frequentemente acompanhada de esplenomegalia, hepatite leve e linfocitose com linfócitos atípicos. Em crianças pequenas a infecção costuma ser oligossintomática.',
    epidemiologia: 'A infecção pelo vírus Epstein-Barr é praticamente universal, ocorrendo precocemente em populações com aglomeração domiciliar e condições socioeconômicas desfavoráveis. Nas comunidades do Amazonas a soroconversão tende a acontecer ainda na primeira infância, período em que a infecção geralmente é subclínica ou confundida com uma virose comum; a síndrome de mononucleose clássica é mais vista em adolescentes e adultos jovens. A relevância prática regional está no diagnóstico diferencial com faringoamigdalite estreptocócica (evitando antibióticos desnecessários), com dengue, malária, leishmaniose visceral, HIV agudo e hepatites virais, e na orientação de restrição de atividades pelo risco de ruptura esplênica.',
    agente: 'Vírus Epstein-Barr (herpes-vírus humano tipo 4) na maioria dos casos; síndromes semelhantes podem ser causadas por citomegalovírus, Toxoplasma gondii, HIV em infecção aguda, herpes-vírus humano tipo 6 e adenovírus.',
    transmissao: 'Contato com saliva (doença do beijo), compartilhamento de copos, talheres e escovas de dente; eliminação viral intermitente e prolongada pela orofaringe por meses após a infecção. Transmissão por transfusão e transplante é possível, porém rara.',
    incubacao: '30 a 50 dias em adolescentes e adultos; possivelmente mais curta em crianças pequenas.',
    manifestacoes: [
      'Pródromo de 1 a 2 semanas com mal-estar, fadiga intensa, cefaleia, mialgia e febre.',
      'Faringoamigdalite exsudativa intensa, muitas vezes com membranas esbranquiçadas espessas e halitose, que não responde a antibióticos.',
      'Linfadenopatia generalizada, com destaque para as cadeias cervicais posteriores, que é achado mais sugestivo que a adenomegalia cervical anterior isolada.',
      'Esplenomegalia em cerca de metade dos casos, geralmente na segunda ou terceira semana, e hepatomegalia com hepatite anictérica leve.',
      'Edema palpebral bilateral (sinal de Hoagland) e petéquias em palato.',
      'Fadiga desproporcional e prolongada, que pode persistir por semanas a meses.',
      'Exantema maculopapular difuso após uso de amoxicilina ou ampicilina, sem significar alergia verdadeira à penicilina.',
      'Icterícia leve em uma minoria dos casos, com elevação de transaminases na maioria.',
      'Complicações: obstrução de via aérea por hipertrofia amigdaliana, ruptura esplênica, anemia hemolítica autoimune, plaquetopenia, meningoencefalite, síndrome de Guillain-Barré e síndrome hemofagocítica.'
    ],
    sinaisAlarme: [
      'Estridor, roncos intensos, dificuldade respiratória ou sialorreia por obstrução amigdaliana.',
      'Dor abdominal intensa, principalmente em quadrante superior esquerdo ou ombro esquerdo, palidez e hipotensão (suspeita de ruptura esplênica).',
      'Icterícia progressiva, sangramento ou sonolência (hepatite grave).',
      'Petéquias, púrpura ou sangramento (plaquetopenia).',
      'Palidez intensa e taquicardia (anemia hemolítica).',
      'Cefaleia intensa, convulsão, rigidez de nuca ou alteração de consciência.',
      'Febre persistente por mais de 2 a 3 semanas com piora do estado geral, citopenias e hiperferritinemia (suspeita de síndrome hemofagocítica).',
      'Desidratação por incapacidade de deglutir.'
    ],
    diagnosticoDiferencial: ['faringoamigdalite_estreptococica', 'escarlatina', 'hiv_pediatrico', 'hepatite_a', 'citomegalovirose', 'toxoplasmose adquirida', 'leishmaniose_visceral', 'dengue', 'malaria', 'leucemia aguda e linfoma', 'adenovirose', 'tuberculose ganglionar'],
    exames: ['hemograma', 'sorologia específica para Epstein-Barr (anti-VCA IgM e IgG, anti-EBNA)', 'teste de anticorpos heterófilos (Monoteste ou Paul-Bunnell)', 'ast', 'alt', 'bilirrubinas', 'teste rápido para estreptococo do grupo A em orofaringe', 'ultrassonografia de abdome (avaliação de baço e fígado)', 'pcr', 'vhs', 'ferritina', 'coagulograma', 'sorologia para HIV'],
    criteriosDiagnosticos: [
      'Quadro clínico compatível: febre, faringoamigdalite exsudativa, linfadenopatia cervical posterior e fadiga, com ou sem esplenomegalia.',
      'Hemograma com linfocitose (habitualmente acima de 50% de linfócitos) e presença de linfócitos atípicos acima de 10% reforça fortemente a hipótese.',
      'Anticorpos heterófilos positivos confirmam em adolescentes e adultos, mas apresentam baixa sensibilidade em menores de 4 anos.',
      'Sorologia específica para Epstein-Barr é o método de escolha em crianças pequenas: anti-VCA IgM reagente com anti-EBNA não reagente indica infecção aguda; anti-EBNA reagente indica infecção passada.',
      'Elevação leve a moderada de transaminases é achado esperado e não exige investigação adicional se assintomática.',
      'Teste rápido para estreptococo pode ser positivo por estado de portador: a positividade isolada não afasta mononucleose nem justifica atribuir todo o quadro ao estreptococo.',
      'Ultrassonografia abdominal quando houver esplenomegalia ao exame ou antes da liberação para esportes de contato, conforme conduta do serviço.',
      'Solicitar sorologia para HIV em adolescentes com síndrome mononucleose-símile, considerando a infecção aguda pelo HIV no diferencial.'
    ],
    classificacaoGravidade: [
      { nivel: 'Leve', criterios: 'Febre, faringite e adenomegalia com boa aceitação oral, sem esplenomegalia dolorosa, sem obstrução respiratória e sem citopenias importantes. Manejo domiciliar com sintomáticos e restrição de atividades.' },
      { nivel: 'Moderada', criterios: 'Faringite intensa limitando a ingestão, desidratação leve, hepatite com transaminases elevadas e sintomáticas, esplenomegalia volumosa ou fadiga incapacitante. Observação, hidratação e reavaliação seriada.' },
      { nivel: 'Grave', criterios: 'Obstrução de via aérea superior, ruptura esplênica, hepatite grave com coagulopatia, anemia hemolítica ou plaquetopenia sintomáticas, manifestações neurológicas ou síndrome hemofagocítica. Internação e avaliação especializada.' }
    ],
    tratamento: [
      'Tratamento é de suporte: repouso relativo conforme a tolerância, hidratação e analgesia.',
      'Antitérmico e analgésico com paracetamol ou dipirona; ibuprofeno pode ser usado conforme bula, evitando se houver plaquetopenia ou sangramento.',
      'Evitar amoxicilina e ampicilina quando houver suspeita de mononucleose, pelo alto risco de exantema; se houver comprovação de faringite estreptocócica concomitante, preferir outro antibiótico conforme protocolo.',
      'Aciclovir não é indicado: reduz a eliminação viral orofaríngea sem alterar a evolução clínica.',
      'Corticoide não deve ser usado de rotina; considerar apenas em obstrução de via aérea superior por hipertrofia amigdaliana, anemia hemolítica grave ou plaquetopenia grave, conforme avaliação especializada.',
      'Restrição de esportes de contato, educação física, lutas e atividades com risco de trauma abdominal por pelo menos 3 a 4 semanas do início dos sintomas, e por mais tempo se esplenomegalia persistente, conforme reavaliação clínica.',
      'Dieta leve, fria e pastosa enquanto houver odinofagia; sais de reidratação oral se ingestão reduzida.',
      'Orientar que a fadiga pode persistir por semanas e que o retorno às atividades deve ser gradual.',
      'Monitorizar hemograma e transaminases nos casos com citopenias ou hepatite significativa, conforme protocolo do serviço.',
      'Casos com obstrução respiratória: internação, monitorização, corticoide conforme avaliação e suporte de via aérea.'
    ],
    medicamentos: [
      { medId: 'paracetamol', esquema: 'Febre e dor: 10 a 15 mg/kg/dose VO a cada 6 horas, conforme bula.' },
      { medId: 'dipirona', esquema: 'Alternativa antitérmica e analgésica: 10 a 15 mg/kg/dose VO ou IV a cada 6 horas, conforme bula.' },
      { medId: 'ibuprofeno', esquema: 'Odinofagia e mialgia: 5 a 10 mg/kg/dose VO a cada 6 a 8 horas, conforme bula; evitar se plaquetopenia, sangramento ou hepatite importante.' },
      { medId: 'prednisolona', esquema: 'Apenas em situações selecionadas (obstrução de via aérea por hipertrofia amigdaliana, anemia hemolítica ou plaquetopenia graves): 1 a 2 mg/kg/dia VO (máximo 60 mg/dia) por curto período, conforme avaliação especializada e protocolo do serviço.' },
      { medId: 'dexametasona', esquema: 'Alternativa em obstrução de via aérea superior, conforme protocolo do serviço e avaliação especializada, confirmar conforme protocolo.' },
      { medId: 'sais_reidratacao_oral', esquema: 'Manutenção da hidratação quando a ingestão estiver reduzida pela odinofagia, conforme plano A do MS.' }
    ],
    criteriosInternacao: [
      'Obstrução de via aérea superior com estridor, sialorreia ou desconforto respiratório.',
      'Desidratação ou incapacidade de ingerir líquidos.',
      'Suspeita de ruptura esplênica ou dor abdominal intensa.',
      'Hepatite com icterícia progressiva, coagulopatia ou encefalopatia.',
      'Plaquetopenia com sangramento ou anemia hemolítica sintomática.',
      'Manifestações neurológicas.',
      'Suspeita de síndrome hemofagocítica ou de neoplasia hematológica.'
    ],
    criteriosUTI: [
      'Obstrução de via aérea com necessidade de intubação ou via aérea cirúrgica.',
      'Choque hemorrágico por ruptura esplênica.',
      'Insuficiência hepática aguda com encefalopatia.',
      'Síndrome hemofagocítica com disfunção orgânica múltipla.',
      'Encefalite com rebaixamento de consciência ou estado de mal convulsivo.'
    ],
    criteriosAlta: [
      'Via aérea pérvia e sem desconforto respiratório.',
      'Aceitação oral adequada e hidratação mantida.',
      'Ausência de dor abdominal significativa e estabilidade hemodinâmica.',
      'Hemograma e transaminases estáveis ou em melhora.',
      'Responsável e adolescente orientados sobre restrição de esportes de contato e sinais de alarme abdominais.',
      'Retorno agendado para reavaliação do baço e da fadiga.'
    ],
    orientacoes: [
      'O cansaço pode durar várias semanas; o retorno às atividades deve ser aos poucos, respeitando o ritmo da criança ou do adolescente.',
      'Evitar esportes de contato, lutas, educação física e brincadeiras com risco de pancada na barriga por pelo menos 3 a 4 semanas, pelo risco de ruptura do baço.',
      'Procurar atendimento de urgência se houver dor forte na barriga, principalmente do lado esquerdo ou no ombro esquerdo, palidez, tontura ou desmaio.',
      'Oferecer líquidos gelados e alimentos macios enquanto a garganta doer.',
      'Não compartilhar copos, talheres, garrafas, chupetas ou escovas de dente; evitar beijo na boca.',
      'Se aparecerem manchas no corpo após o uso de antibiótico, comunicar o serviço: em geral não é alergia verdadeira, mas deve ser avaliado.',
      'Não é necessário afastamento escolar prolongado: a criança pode voltar quando estiver sem febre e se sentindo melhor.',
      'Retornar se houver falta de ar, ronco alto com pausas, dificuldade para engolir saliva, amarelão nos olhos, manchas roxas, sangramentos, dor de cabeça forte ou sonolência.'
    ],
    retorno: 'Reavaliação em 5 a 7 dias para verificar hidratação, tamanho do baço e evolução das transaminases; nova avaliação antes da liberação para esportes de contato, habitualmente após 3 a 4 semanas, e retorno imediato diante de dor abdominal, palidez ou dificuldade respiratória.',
    prevencao: [
      'Não há vacina disponível.',
      'Evitar compartilhamento de copos, talheres, garrafas e escovas de dente e orientar adolescentes sobre transmissão pela saliva.',
      'Higiene das mãos e etiqueta respiratória.',
      'Não há indicação de isolamento nem de afastamento escolar prolongado.',
      'Evitar doação de sangue durante e logo após a doença, conforme critérios da hemoterapia.',
      'Orientação sobre restrição esportiva para prevenir ruptura esplênica, principal medida de prevenção de complicação grave.'
    ],
    fontes: [
      { nome: 'Nelson Textbook of Pediatrics, 22ª edição', ano: 2024 },
      { nome: 'Tratado de Pediatria – Sociedade Brasileira de Pediatria', ano: 2022 },
      { nome: 'Red Book – American Academy of Pediatrics', ano: 2024 },
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'caxumba',
    nome: 'Caxumba (parotidite infecciosa)',
    categoria: 'infecciosa',
    amazonia: false,
    cid10: 'B26',
    tags: ['febre', 'dor_local', 'cefaleia', 'vomitos', 'linfonodomegalia', 'dor_abdominal', 'rigidez_nuca', 'alteracao_consciencia', 'fraqueza'],
    definicao: 'Doença viral aguda caracterizada por aumento doloroso das glândulas salivares, principalmente das parótidas, de forma uni ou bilateral, acompanhada de febre e mal-estar. Pode cursar com meningite asséptica, orquite, ooforite, pancreatite e surdez neurossensorial.',
    epidemiologia: 'A caxumba mantém circulação no Brasil, com surtos periódicos em escolas, universidades, quartéis e comunidades fechadas, inclusive em populações com esquema vacinal completo, pela queda de imunidade ao longo dos anos. No Amazonas, surtos comunitários em escolas e em comunidades ribeirinhas e indígenas com cobertura vacinal irregular são descritos; a orquite em adolescentes é a complicação que mais motiva procura ao serviço. Surtos de caxumba são de notificação (notificação de surtos à vigilância municipal), ainda que o caso isolado não seja de notificação compulsória individual em todo o território; seguir a normativa local.',
    agente: 'Vírus da caxumba (Orthorubulavirus parotitidis, família Paramyxoviridae).',
    transmissao: 'Gotículas respiratórias, contato direto com saliva e fômites contaminados. A transmissibilidade vai de cerca de 2 dias antes até 5 dias após o início do aumento da parótida.',
    incubacao: '12 a 25 dias (média de 16 a 18 dias).',
    manifestacoes: [
      'Pródromo de 1 a 2 dias com febre baixa, cefaleia, mialgia, mal-estar e inapetência.',
      'Aumento doloroso da parótida, inicialmente unilateral e tornando-se bilateral em cerca de 70% dos casos, com apagamento do ângulo da mandíbula e deslocamento do lobo da orelha para cima e para fora.',
      'Dor que piora com a mastigação e com alimentos ácidos; edema do óstio do ducto de Stensen na mucosa jugal, sem saída de pus.',
      'Acometimento de glândulas submandibulares e sublinguais em parte dos casos.',
      'Febre habitualmente por 3 a 4 dias, com resolução do edema glandular em 7 a 10 dias.',
      'Meningite asséptica: cefaleia, vômitos, rigidez de nuca e fotofobia, podendo ocorrer antes, durante ou após a parotidite, e mesmo sem parotidite.',
      'Orquite e epididimite em adolescentes e adultos pós-púberes: dor testicular intensa, edema e febre, geralmente unilateral, surgindo na primeira semana após a parotidite.',
      'Ooforite com dor pélvica, pancreatite com dor abdominal epigástrica e vômitos, e tireoidite, menos frequentes.',
      'Surdez neurossensorial, em geral unilateral, é complicação rara mas potencialmente permanente.',
      'Encefalite e mielite são raras.'
    ],
    sinaisAlarme: [
      'Cefaleia intensa, vômitos persistentes, rigidez de nuca, fotofobia ou alteração de consciência (meningite ou encefalite).',
      'Convulsão.',
      'Dor e edema testicular intensos em adolescente (orquite, com risco de atrofia testicular).',
      'Dor abdominal epigástrica intensa com vômitos (pancreatite).',
      'Redução súbita da audição, zumbido ou desequilíbrio.',
      'Desidratação por dor à deglutição.',
      'Edema cervical com eritema intenso, flutuação ou saída de pus pelo ducto (sugere parotidite bacteriana supurativa, que exige antibiótico).',
      'Febre alta persistente por mais de 5 dias.'
    ],
    diagnosticoDiferencial: ['parotidite bacteriana supurativa', 'adenite cervical', 'linfadenite por micobactéria atípica', 'cálculo de glândula salivar (sialolitíase)', 'parotidite recorrente juvenil', 'tumor de parótida', 'mononucleose', 'hiv_pediatrico (parotidite crônica)', 'abscesso dentário', 'reação a medicamentos'],
    exames: ['sorologia IgM e IgG para caxumba', 'RT-PCR em saliva, swab de ducto parotídeo ou urina (até o 5º dia)', 'hemograma', 'amilase e lipase séricas', 'liquor', 'pcr', 'ultrassonografia de bolsa escrotal com Doppler (suspeita de orquite ou torção testicular)', 'ultrassonografia de glândulas salivares', 'glicemia'],
    criteriosDiagnosticos: [
      'Diagnóstico eminentemente clínico: aumento doloroso de parótida, uni ou bilateral, de início agudo, com febre, em contexto epidemiológico compatível.',
      'Confirmação laboratorial por IgM reagente ou soroconversão de IgG, ou por RT-PCR em saliva ou urina nos primeiros dias; sorologia pode ser falsamente negativa em vacinados.',
      'Amilase sérica elevada é comum na parotidite e não indica necessariamente pancreatite; a lipase é mais específica para acometimento pancreático.',
      'Punção lombar indicada quando houver sinais meníngeos ou neurológicos; líquor mostra pleocitose linfocitária com glicose habitualmente normal.',
      'Ultrassonografia escrotal com Doppler é mandatória diante de dor testicular aguda, para afastar torção de testículo, que é emergência cirúrgica.',
      'Considerar parotidite bacteriana quando houver eritema intenso, flutuação, toxemia ou drenagem purulenta pelo ducto de Stensen.',
      'Notificar surtos à vigilância epidemiológica municipal conforme a normativa local.'
    ],
    classificacaoGravidade: [
      { nivel: 'Não complicada', criterios: 'Parotidite com febre e dor controláveis, boa aceitação oral, sem sinais meníngeos, sem acometimento testicular ou abdominal. Manejo domiciliar com analgesia, hidratação e afastamento.' },
      { nivel: 'Com complicação localizada', criterios: 'Orquite, ooforite ou pancreatite com dor importante, vômitos ou limitação funcional. Avaliação hospitalar, analgesia otimizada, repouso e suporte, com reavaliação frequente.' },
      { nivel: 'Grave', criterios: 'Meningite com vômitos incoercíveis, encefalite, convulsão, alteração de consciência, pancreatite grave, desidratação importante ou perda auditiva aguda. Internação e avaliação especializada.' }
    ],
    tratamento: [
      'Não há antiviral específico: o tratamento é sintomático e de suporte.',
      'Analgesia e antitérmico com paracetamol ou dipirona; ibuprofeno é útil pelo componente inflamatório, conforme bula.',
      'Compressas mornas ou frias sobre a região parotídea conforme o alívio referido pelo paciente.',
      'Dieta pastosa e evitar alimentos ácidos, cítricos e que exijam muita mastigação, pois estimulam a salivação e a dor.',
      'Hidratação oral adequada; hidratação venosa se vômitos ou recusa importante.',
      'Higiene oral cuidadosa para reduzir o risco de infecção bacteriana secundária.',
      'Afastamento de creche, escola e atividades coletivas por 5 dias a partir do início do aumento da parótida, com isolamento por gotículas em ambiente hospitalar.',
      'Orquite: repouso no leito, elevação e suspensão escrotal, compressas frias e anti-inflamatório conforme bula; corticoide não demonstrou prevenir atrofia testicular e não é recomendado de rotina. Avaliação urológica quando a dor for intensa ou houver dúvida com torção testicular.',
      'Meningite asséptica: hidratação, analgesia e observação; antibiótico apenas até afastar etiologia bacteriana, conforme avaliação do líquor e protocolo do serviço.',
      'Pancreatite: jejum inicial conforme tolerância, hidratação venosa, analgesia e reintrodução alimentar progressiva, conforme protocolo do serviço.',
      'Parotidite bacteriana secundária (eritema, flutuação, pus): antibiótico com cobertura para Staphylococcus aureus e anaeróbios, conforme protocolo, e avaliação cirúrgica se abscesso.',
      'Avaliação audiológica se houver queixa de perda auditiva, zumbido ou desequilíbrio.',
      'Verificar e atualizar a situação vacinal da criança e dos contatos; a vacinação pós-exposição não previne a doença no contato já exposto, mas protege em exposições futuras e é recomendada em situação de surto.'
    ],
    medicamentos: [
      { medId: 'paracetamol', esquema: 'Dor e febre: 10 a 15 mg/kg/dose VO a cada 6 horas, conforme bula.' },
      { medId: 'dipirona', esquema: 'Alternativa analgésica e antitérmica: 10 a 15 mg/kg/dose VO ou IV a cada 6 horas, conforme bula.' },
      { medId: 'ibuprofeno', esquema: 'Dor e inflamação, inclusive na orquite: 5 a 10 mg/kg/dose VO a cada 6 a 8 horas, conforme bula; evitar se desidratação ou suspeita de dengue.' },
      { medId: 'soro_fisiologico', esquema: 'Hidratação venosa com SF 0,9% quando houver vômitos ou recusa oral, conforme protocolo do serviço.' },
      { medId: 'cefalexina', esquema: 'Apenas em parotidite bacteriana secundária leve, conforme cobertura para Staphylococcus aureus: 50 a 100 mg/kg/dia VO dividida a cada 6 horas, conforme protocolo do serviço.' },
      { medId: 'amoxicilina_clavulanato', esquema: 'Parotidite bacteriana com necessidade de cobertura para anaeróbios: 45 a 50 mg/kg/dia (componente amoxicilina) VO dividida 12/12 h, conforme protocolo do serviço.' },
      { medId: null, nome: 'Vacina tríplice viral ou tetraviral', esquema: 'Atualização do esquema conforme o Calendário Nacional de Vacinação; em situação de surto, vacinação de bloqueio dos suscetíveis conforme orientação da vigilância epidemiológica.' }
    ],
    criteriosInternacao: [
      'Vômitos persistentes, desidratação ou incapacidade de ingerir líquidos.',
      'Sinais meníngeos ou neurológicos exigindo investigação de líquor.',
      'Orquite com dor intensa não controlada ou dúvida diagnóstica com torção testicular.',
      'Pancreatite com dor abdominal importante e intolerância alimentar.',
      'Suspeita de parotidite bacteriana com abscesso.',
      'Perda auditiva aguda.',
      'Imunossupressão ou comorbidade relevante.'
    ],
    criteriosUTI: [
      'Encefalite com rebaixamento de consciência ou estado de mal convulsivo.',
      'Pancreatite grave com instabilidade hemodinâmica ou disfunção orgânica.',
      'Desidratação grave com choque refratário à reposição inicial.',
      'Comprometimento de via aérea por edema cervical extenso.'
    ],
    criteriosAlta: [
      'Dor controlada com analgesia oral e boa aceitação de líquidos e dieta pastosa.',
      'Afebril ou com febre em declínio e sem sinais meníngeos.',
      'Ausência de sinais de complicação em evolução.',
      'Avaliação urológica concluída nos casos de orquite, com afastamento de torção testicular.',
      'Responsável orientado sobre afastamento por 5 dias e sobre sinais de alarme.',
      'Situação vacinal verificada e surto comunicado à vigilância quando aplicável.'
    ],
    orientacoes: [
      'Oferecer alimentos macios e pastosos e evitar frutas cítricas, sucos ácidos, vinagre e alimentos duros, que aumentam a dor.',
      'Fazer compressas mornas ou frias no rosto, conforme o que aliviar mais.',
      'Manter boa higiene da boca e escovar os dentes com cuidado.',
      'Manter a criança em casa por 5 dias a partir do início do inchaço, evitando contato com pessoas não vacinadas e gestantes.',
      'Dar apenas os remédios prescritos para dor e febre.',
      'Em adolescentes do sexo masculino, observar dor ou inchaço nos testículos e procurar atendimento no mesmo dia se ocorrer: é importante descartar torção do testículo, que é uma urgência cirúrgica.',
      'Retornar imediatamente se houver dor de cabeça forte, vômitos repetidos, pescoço duro, sonolência, convulsão, dor forte na barriga, ou se a criança passar a ouvir menos de um lado.',
      'Levar o cartão de vacina de todos os moradores da casa à unidade de saúde.'
    ],
    retorno: 'Reavaliação em 48 a 72 horas ou antes se sinais de alarme; nos casos com orquite, reavaliação em 24 a 48 horas; avaliação audiológica ambulatorial se houver qualquer queixa auditiva.',
    prevencao: [
      'Vacinação com tríplice viral aos 12 meses e tetraviral aos 15 meses, conforme o Calendário Nacional de Vacinação, garantindo duas doses.',
      'Vacinação de bloqueio de suscetíveis em situação de surto, conforme orientação da vigilância epidemiológica.',
      'Afastamento do caso das atividades coletivas por 5 dias a partir do início do aumento parotídeo.',
      'Precauções por gotículas em ambiente hospitalar.',
      'Higiene das mãos e não compartilhamento de copos, talheres e garrafas.',
      'Notificação de surtos à vigilância municipal conforme normativa local.',
      'Manutenção de coberturas vacinais adequadas em escolas e comunidades ribeirinhas e indígenas.'
    ],
    fontes: [
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
      { nome: 'Calendário Nacional de Vacinação – Ministério da Saúde', ano: 2025 },
      { nome: 'Nelson Textbook of Pediatrics, 22ª edição', ano: 2024 },
      { nome: 'Tratado de Pediatria – Sociedade Brasileira de Pediatria', ano: 2022 }
    ],
    atualizadoEm: '2026-09'
  },

  // =====================================================================
  // OUTRAS DOENÇAS PREVALENTES
  // =====================================================================
  {
    id: 'hepatite_a',
    nome: 'Hepatite A',
    categoria: 'gastrointestinal',
    amazonia: false,
    cid10: 'B15',
    tags: ['febre', 'ictericia', 'vomitos', 'dor_abdominal', 'diarreia', 'fraqueza', 'hepatomegalia', 'prurido', 'alteracao_consciencia', 'sangramento'],
    definicao: 'Hepatite viral aguda de transmissão fecal-oral causada pelo vírus da hepatite A, caracterizada por pródromo inespecífico seguido de icterícia, colúria, acolia fecal e hepatomegalia dolorosa. É autolimitada na grande maioria das crianças, mas pode evoluir para hepatite fulminante em uma pequena proporção dos casos.',
    epidemiologia: 'A hepatite A tem forte relação com saneamento básico e qualidade da água. Na Região Norte, onde grande parte da população utiliza água de rio, poço ou chuva sem tratamento adequado e o esgotamento sanitário é limitado, a soroprevalência na infância historicamente é alta e surtos comunitários e em creches são frequentes, especialmente no período de cheia dos rios, quando fossas e igarapés transbordam e contaminam a água de uso doméstico. Em crianças menores de 6 anos a infecção costuma ser anictérica e passar despercebida, mantendo a transmissão silenciosa no domicílio. A hepatite A é doença de notificação compulsória. A vacina hepatite A está disponível no Calendário Nacional aos 15 meses.',
    agente: 'Vírus da hepatite A (HAV), RNA vírus do gênero Hepatovirus, família Picornaviridae.',
    transmissao: 'Fecal-oral: contato pessoa a pessoa em domicílios e creches, ingestão de água contaminada e de alimentos crus ou mal cozidos, incluindo moluscos e pescado de águas contaminadas. A excreção viral nas fezes é máxima nas 2 semanas que antecedem a icterícia e cai rapidamente após seu início.',
    incubacao: '15 a 50 dias (média de 28 a 30 dias).',
    manifestacoes: [
      'Fase prodrômica de 3 a 10 dias: febre, mal-estar, astenia, náuseas, vômitos, inapetência, aversão a alimentos gordurosos e a odores fortes, dor em hipocôndrio direito e, por vezes, diarreia.',
      'Fase ictérica: icterícia de escleras e pele, colúria (urina escura como refrigerante) e acolia ou hipocolia fecal (fezes claras), com melhora paradoxal dos sintomas prodrômicos e da febre.',
      'Hepatomegalia dolorosa à palpação e, com menor frequência, esplenomegalia e adenomegalia.',
      'Prurido cutâneo nas formas colestáticas.',
      'Em menores de 6 anos, mais de 70% dos casos são anictéricos e oligossintomáticos, manifestando-se apenas como quadro gastrointestinal inespecífico.',
      'Fase de convalescença com normalização progressiva das transaminases em 4 a 8 semanas; astenia pode persistir.',
      'Formas atípicas: colestática (icterícia e prurido prolongados por semanas a meses) e recidivante (novo pico de transaminases após melhora), ambas de bom prognóstico.',
      'Hepatite fulminante (rara): icterícia intensa, redução do tamanho do fígado, sangramento, alargamento do tempo de protrombina, hipoglicemia e encefalopatia hepática.'
    ],
    sinaisAlarme: [
      'Sonolência, confusão, inversão do ciclo sono-vigília, agitação, flapping ou qualquer alteração do comportamento (encefalopatia hepática).',
      'Sangramento de gengivas, epistaxe, equimoses, sangramento digestivo.',
      'Vômitos incoercíveis e incapacidade de ingerir líquidos.',
      'Icterícia rapidamente progressiva com redução do tamanho do fígado à palpação.',
      'Hipoglicemia, hálito hepático ou ascite.',
      'INR ou tempo de protrombina alargados.',
      'Febre alta persistente após o início da icterícia.',
      'Lactente, desnutrido, hepatopata crônico ou imunossuprimido.'
    ],
    diagnosticoDiferencial: ['hepatites virais B, C, D e E', 'mononucleose', 'citomegalovirose', 'leptospirose', 'malaria', 'febre_amarela', 'dengue com hepatite', 'febre_tifoide', 'hepatite autoimune', 'hepatotoxicidade por medicamentos (paracetamol, isoniazida) e por plantas medicinais', 'colestase e obstrução biliar', 'doença de Wilson em escolares e adolescentes'],
    exames: ['sorologia anti-HAV IgM e IgG', 'alt', 'ast', 'bilirrubinas', 'coagulograma', 'glicemia', 'albumina', 'hemograma', 'ureia', 'creatinina', 'eletrolitos', 'sorologias para hepatites B e C', 'ultrassonografia de abdome', 'amonia sérica (se encefalopatia)'],
    criteriosDiagnosticos: [
      'Caso suspeito: quadro agudo de icterícia, colúria e acolia, ou elevação de transaminases com sintomas compatíveis, ou contato com caso confirmado de hepatite A.',
      'Confirmação laboratorial compatível: anti-HAV IgM reagente. O anti-HAV IgG isolado indica infecção passada ou imunidade vacinal.',
      'Transaminases habitualmente muito elevadas (frequentemente acima de 10 vezes o limite superior), com ALT em geral maior que AST.',
      'Bilirrubina direta predominante na fase ictérica.',
      'Coagulograma com INR é o exame mais importante para avaliar gravidade: alargamento sugere disfunção hepatocelular significativa.',
      'Glicemia deve ser monitorizada, pela possibilidade de hipoglicemia na disfunção hepática.',
      'Ultrassonografia abdominal quando houver dúvida com causa obstrutiva.',
      'Notificação compulsória e investigação de contatos e da fonte comum (água, creche, alimento).'
    ],
    classificacaoGravidade: [
      { nivel: 'Hepatite A não complicada', criterios: 'Criança com icterícia, boa aceitação oral, sem vômitos incoercíveis, sem alteração do sensório, com INR normal. Acompanhamento ambulatorial com orientação e reavaliação clínica e laboratorial.' },
      { nivel: 'Forma prolongada ou colestática', criterios: 'Icterícia e prurido persistentes por mais de 4 a 6 semanas, com bilirrubina elevada e transaminases em queda, sem sinais de insuficiência hepática. Acompanhamento ambulatorial especializado e manejo do prurido.' },
      { nivel: 'Hepatite grave ou fulminante', criterios: 'Encefalopatia hepática de qualquer grau, INR alargado, hipoglicemia, sangramento, redução do fígado ou vômitos incoercíveis. Internação imediata e contato precoce com centro de transplante hepático.' }
    ],
    tratamento: [
      'Não há tratamento antiviral específico: a conduta é de suporte e de vigilância ativa dos sinais de insuficiência hepática.',
      'Repouso relativo conforme a tolerância; não há evidência que justifique repouso absoluto prolongado.',
      'Dieta livre, conforme a aceitação, com boa oferta calórica; a restrição rígida de gorduras não é necessária, embora alimentos gordurosos possam ser mal tolerados na fase prodrômica.',
      'Hidratação oral frequente; hidratação venosa com soro glicosado e eletrólitos se vômitos ou aceitação insuficiente, com atenção à glicemia.',
      'Suspender medicamentos hepatotóxicos e desnecessários; usar paracetamol com cautela e em dose mínima eficaz ou preferir dipirona conforme avaliação, evitando anti-inflamatórios não esteroidais.',
      'Orientar rigorosamente contra o uso de chás, garrafadas, plantas medicinais e medicamentos por conta própria, prática comum na região e com risco de agravar a lesão hepática.',
      'Prurido nas formas colestáticas: medidas gerais (banho morno, hidratante, unhas curtas); colestiramina pode ser considerada conforme avaliação especializada e bula.',
      'Precauções de contato e higiene rigorosa das mãos; afastamento de creche e escola por 7 dias após o início da icterícia.',
      'Profilaxia pós-exposição para contatos domiciliares e próximos suscetíveis: vacina hepatite A em até 14 dias da exposição; imunoglobulina humana normal para menores de 12 meses, imunossuprimidos e hepatopatas crônicos, conforme protocolo do CRIE.',
      'Investigar a fonte de contaminação (água de consumo, creche, alimentos) e acionar a vigilância sanitária e epidemiológica.',
      'Monitorizar INR, glicemia, bilirrubinas e transaminases nos casos com vômitos, icterícia intensa ou qualquer sinal de alarme; a piora do INR indica transferência para serviço com suporte hepático.'
    ],
    medicamentos: [
      { medId: 'sais_reidratacao_oral', esquema: 'Manutenção da hidratação em vigência de vômitos ou baixa aceitação, conforme plano A ou B do MS.' },
      { medId: 'soro_fisiologico', esquema: 'Hidratação venosa com SF 0,9% associada a glicose conforme necessidade, com monitorização de glicemia e eletrólitos, conforme protocolo do serviço.' },
      { medId: 'dipirona', esquema: 'Antitérmico e analgésico, conforme avaliação individual: 10 a 15 mg/kg/dose VO ou IV a cada 6 horas, conforme bula.' },
      { medId: 'paracetamol', esquema: 'Usar com cautela na hepatite aguda: apenas se necessário, na menor dose eficaz e respeitando o intervalo e a dose máxima da bula; evitar em disfunção hepática significativa, confirmar conforme protocolo.' },
      { medId: null, nome: 'Vacina hepatite A', esquema: 'Rotina aos 15 meses pelo Calendário Nacional de Vacinação; profilaxia pós-exposição de contatos suscetíveis a partir de 12 meses, preferencialmente em até 14 dias da exposição.' },
      { medId: null, nome: 'Imunoglobulina humana normal', esquema: 'Profilaxia pós-exposição em menores de 12 meses, imunossuprimidos e hepatopatas crônicos, preferencialmente em até 14 dias da exposição, dose e via conforme protocolo do CRIE e bula, confirmar conforme protocolo.' },
      { medId: null, nome: 'Colestiramina', esquema: 'Prurido colestático persistente: indicação e dose conforme avaliação de gastroenterologia pediátrica e bula, confirmar conforme protocolo.' },
      { medId: null, nome: 'Vitamina K (fitomenadiona)', esquema: 'Em caso de alargamento do tempo de protrombina, administração conforme protocolo do serviço e bula, com reavaliação do INR, confirmar conforme protocolo.' }
    ],
    criteriosInternacao: [
      'Vômitos persistentes ou incapacidade de manter hidratação e aporte calórico por via oral.',
      'Qualquer sinal de encefalopatia hepática, mesmo discreto (sonolência, irritabilidade, confusão).',
      'INR ou tempo de protrombina alargados.',
      'Hipoglicemia documentada.',
      'Sangramento espontâneo.',
      'Icterícia intensa e rapidamente progressiva ou redução do tamanho do fígado.',
      'Lactente, desnutrido grave, hepatopata crônico ou imunossuprimido.',
      'Impossibilidade de reavaliação ambulatorial frequente, situação comum em comunidades distantes.'
    ],
    criteriosUTI: [
      'Encefalopatia hepática graus III e IV ou rebaixamento progressivo do nível de consciência.',
      'Coagulopatia grave com sangramento ativo.',
      'Hipoglicemia refratária.',
      'Insuficiência hepática aguda com necessidade de suporte avançado ou de avaliação para transplante hepático.',
      'Instabilidade hemodinâmica, insuficiência renal ou edema cerebral.'
    ],
    criteriosAlta: [
      'Boa aceitação oral, sem vômitos, com hidratação mantida.',
      'Ausência de sinais de encefalopatia e INR normal ou em normalização.',
      'Glicemia estável.',
      'Bilirrubinas e transaminases em queda ou estáveis, com melhora clínica.',
      'Responsável orientado sobre sinais de alarme neurológicos e de sangramento.',
      'Retorno ambulatorial agendado e contatos domiciliares avaliados para profilaxia.',
      'Notificação realizada.'
    ],
    orientacoes: [
      'A recuperação é lenta: pode levar de 4 a 8 semanas até a criança voltar ao normal, e o cansaço é comum nesse período.',
      'Oferecer a alimentação que a criança aceitar, com boa quantidade de calorias; não é preciso dieta sem gordura rígida, mas alimentos muito gordurosos podem cair mal no começo.',
      'Não dar nenhum remédio, chá, garrafada ou planta medicinal sem orientação médica: podem piorar o fígado.',
      'Lavar bem as mãos com água e sabão após usar o banheiro, trocar fraldas e antes de preparar alimentos.',
      'Ferver ou clorar a água de beber e de preparar alimentos, especialmente se vier de rio, igarapé, poço ou chuva.',
      'Manter a criança fora da creche ou escola por 7 dias depois do início do amarelão.',
      'Levar todos os moradores da casa à unidade de saúde para avaliar vacina ou imunoglobulina.',
      'Procurar atendimento imediatamente se a criança ficar sonolenta, confusa, agitada, trocar o dia pela noite, sangrar pela gengiva ou nariz, vomitar muito ou o amarelão piorar rápido.'
    ],
    retorno: 'Reavaliação clínica em 7 dias e, nos casos com icterícia importante, reavaliação em 48 a 72 horas com repetição de transaminases, bilirrubinas e coagulograma; retorno imediato diante de qualquer sinal neurológico ou sangramento. Acompanhamento até a normalização clínica e laboratorial.',
    prevencao: [
      'Vacina hepatite A aos 15 meses, dose única, conforme o Calendário Nacional de Vacinação, com ampliação de faixa conforme normativa vigente.',
      'Profilaxia pós-exposição de contatos suscetíveis com vacina ou imunoglobulina, conforme idade e condição clínica.',
      'Tratamento da água de consumo: fervura, cloração ou filtração, medida essencial em comunidades ribeirinhas e periurbanas.',
      'Melhoria do saneamento, destino adequado de dejetos e afastamento de fossas das fontes de água.',
      'Higiene das mãos e higiene alimentar, evitando alimentos crus e moluscos de procedência duvidosa.',
      'Afastamento de creche e escola por 7 dias após o início da icterícia e reforço das rotinas de higiene em creches.',
      'Notificação compulsória e investigação de surtos e de fonte comum pela vigilância.'
    ],
    fontes: [
      { nome: 'Protocolo Clínico e Diretrizes Terapêuticas para Hepatite A – Ministério da Saúde', ano: 2023 },
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
      { nome: 'Calendário Nacional de Vacinação – Ministério da Saúde', ano: 2025 },
      { nome: 'Nelson Textbook of Pediatrics, 22ª edição', ano: 2024 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'febre_tifoide',
    nome: 'Febre tifoide',
    categoria: 'infecciosa',
    amazonia: false,
    cid10: 'A01.0',
    tags: ['febre', 'cefaleia', 'dor_abdominal', 'diarreia', 'vomitos', 'exantema', 'hepatomegalia', 'esplenomegalia', 'alteracao_consciencia', 'sangramento', 'fraqueza', 'calafrios'],
    definicao: 'Doença bacteriana sistêmica causada por Salmonella enterica sorotipo Typhi, transmitida por água e alimentos contaminados, caracterizada por febre prolongada e progressiva, cefaleia, dor abdominal, hepatoesplenomegalia e possibilidade de complicações graves como hemorragia e perfuração intestinal na terceira semana de doença.',
    epidemiologia: 'A febre tifoide permanece endêmica nas regiões Norte e Nordeste do Brasil, com os maiores coeficientes de incidência historicamente registrados em estados amazônicos, associada à ausência de saneamento, ao consumo de água não tratada de rios e igarapés e ao consumo de pescado e alimentos manipulados sem higiene. Surtos de fonte comum ocorrem em comunidades ribeirinhas e em áreas periurbanas, com maior risco durante a cheia, quando a contaminação fecal da água aumenta. Portadores crônicos assintomáticos, que eliminam a bactéria pelas fezes por mais de um ano, são reservatórios importantes e frequentemente manipuladores de alimentos. A febre tifoide é doença de notificação compulsória.',
    agente: 'Salmonella enterica subespécie enterica sorotipo Typhi. Salmonella Paratyphi A, B e C causam a febre paratifoide, clinicamente semelhante e mais branda.',
    transmissao: 'Fecal-oral, por ingestão de água e alimentos contaminados por fezes ou urina de doentes ou portadores; contato direto pessoa a pessoa é menos frequente. Moscas podem atuar como vetores mecânicos. O homem é o único reservatório.',
    incubacao: '1 a 3 semanas (média de 8 a 14 dias), variando conforme o inóculo.',
    manifestacoes: [
      'Primeira semana: febre de início insidioso e ascensão progressiva em escada, cefaleia frontal intensa, mal-estar, anorexia, mialgia e dor abdominal difusa.',
      'Bradicardia relativa (dissociação pulso-temperatura, sinal de Faget), presente em parte dos casos e mais descrita em adultos.',
      'Alterações intestinais variáveis: constipação é mais comum em adultos, enquanto em crianças a diarreia é frequente, por vezes com aspecto de sopa de ervilha.',
      'Segunda semana: prostração acentuada, hepatoesplenomegalia, distensão abdominal, torpor e fácies típica de apatia (estado tífico).',
      'Roséola tífica: máculas eritematosas de 2 a 4 mm, escassas e fugazes, em tronco e abdome, mais difíceis de identificar em pele pigmentada.',
      'Terceira semana: risco máximo de complicações, com hemorragia digestiva e perfuração intestinal na região ileocecal.',
      'Manifestações neurológicas: confusão, delírio, apatia intensa, convulsão e, raramente, meningite.',
      'Em lactentes e crianças pequenas o quadro pode ser inespecífico, com febre, vômitos, diarreia e distensão abdominal, simulando sepse ou gastroenterite grave.',
      'Complicações adicionais: miocardite, hepatite tífica, colecistite, osteomielite (especialmente em portadores de anemia falciforme), pneumonia e abscessos.',
      'Recaída em 5 a 15% dos casos, geralmente 1 a 3 semanas após o término do antibiótico, habitualmente mais branda.'
    ],
    sinaisAlarme: [
      'Dor abdominal intensa e localizada, defesa ou descompressão dolorosa, distensão abdominal com desaparecimento do timpanismo hepático (suspeita de perfuração intestinal).',
      'Melena, enterorragia, palidez súbita, taquicardia e hipotensão (hemorragia digestiva).',
      'Alteração de consciência, delírio, torpor ou convulsão.',
      'Choque, perfusão lentificada, oligúria.',
      'Vômitos incoercíveis e desidratação.',
      'Icterícia ou sinais de disfunção hepática.',
      'Febre por mais de 7 dias sem foco definido em criança de área endêmica.',
      'Lactente, desnutrido grave, anemia falciforme ou imunossuprimido.'
    ],
    diagnosticoDiferencial: ['malaria', 'dengue', 'leptospirose', 'febre_amarela', 'sepse', 'tuberculose', 'leishmaniose_visceral', 'hepatite_a', 'mononucleose', 'abscesso hepático e apendicite', 'doenca_chagas aguda', 'endocardite infecciosa', 'linfoma e leucemia'],
    exames: ['hemocultura', 'coprocultura', 'urocultura', 'mielocultura (maior sensibilidade, conforme disponibilidade)', 'hemograma', 'pcr', 'ast', 'alt', 'bilirrubinas', 'eletrolitos', 'ureia', 'creatinina', 'radiografia de abdome em pé ou decúbito lateral (pesquisa de pneumoperitônio)', 'radiografia_torax', 'gota espessa para malária', 'sorologia_dengue', 'coagulograma'],
    criteriosDiagnosticos: [
      'Caso suspeito: febre persistente por 3 dias ou mais, com cefaleia, mal-estar e sintomas abdominais, em pessoa procedente de área endêmica ou com consumo de água ou alimentos de procedência duvidosa.',
      'Confirmação laboratorial compatível: isolamento de Salmonella Typhi em hemocultura (maior positividade na primeira semana), mielocultura (maior sensibilidade e menos afetada por antibiótico prévio), coprocultura ou urocultura (positividade maior a partir da segunda e terceira semanas).',
      'Colher hemoculturas, preferencialmente em mais de uma amostra e antes do início do antibiótico.',
      'Hemograma tipicamente sem leucocitose, podendo apresentar leucopenia com aneosinofilia; plaquetopenia pode ocorrer.',
      'O teste sorológico de Widal tem baixa acurácia e não deve ser utilizado isoladamente para decisão diagnóstica.',
      'Em área endêmica, é obrigatório afastar malária com gota espessa ou teste rápido em toda criança com febre prolongada.',
      'Radiografia de abdome com pneumoperitônio confirma perfuração intestinal e indica avaliação cirúrgica imediata.',
      'Notificação compulsória, investigação de fonte comum e pesquisa de portadores entre manipuladores de alimentos.'
    ],
    classificacaoGravidade: [
      { nivel: 'Não complicada', criterios: 'Febre e sintomas gerais com criança alerta, hidratada, tolerando via oral, sem sinais abdominais de alarme e sem alteração de consciência. Antibiótico oral e reavaliação frequente, quando houver garantia de seguimento.' },
      { nivel: 'Complicada', criterios: 'Vômitos persistentes, desidratação, dor abdominal importante, sangramento digestivo, icterícia, miocardite ou febre com toxemia. Internação, antibiótico parenteral e monitorização.' },
      { nivel: 'Grave', criterios: 'Perfuração intestinal, hemorragia digestiva volumosa, choque, alteração grave de consciência, delírio ou convulsão. Internação em UTI, suporte hemodinâmico, avaliação cirúrgica e consideração de corticoide conforme protocolo.' }
    ],
    tratamento: [
      'Antibioticoterapia dirigida, considerando o perfil de sensibilidade local, já que há resistência crescente a ampicilina, cloranfenicol, sulfametoxazol com trimetoprima e, em algumas regiões do mundo, a fluoroquinolonas.',
      'Ceftriaxona intravenosa é a escolha para casos que exigem internação, para lactentes e para quadros complicados, com duração habitual de 10 a 14 dias.',
      'Azitromicina por via oral é opção eficaz para casos não complicados, com boa penetração intracelular, por 5 a 7 dias conforme protocolo.',
      'Cloranfenicol, ampicilina e sulfametoxazol com trimetoprima permanecem como alternativas onde o isolado for comprovadamente sensível, conforme antibiograma e protocolo do serviço.',
      'Ajustar o esquema conforme o resultado da hemocultura e do antibiograma.',
      'A febre costuma levar de 3 a 5 dias para ceder mesmo com antibiótico eficaz; esse retardo não deve, isoladamente, motivar troca precoce do esquema.',
      'Hidratação oral ou venosa conforme o estado de hidratação e a tolerância; correção de distúrbios eletrolíticos.',
      'Antitérmico com paracetamol ou dipirona; evitar anti-inflamatórios não esteroidais e ácido acetilsalicílico pelo risco de sangramento digestivo.',
      'Dieta leve e fracionada conforme a tolerância; evitar dieta zero desnecessária, mas manter jejum e avaliação cirúrgica imediata diante de suspeita de perfuração.',
      'Evitar antiespasmódicos, antidiarreicos e opiáceos que reduzam a motilidade intestinal.',
      'Complicações graves com choque ou alteração importante do sensório: considerar corticoide em dose alta por curto período, conforme protocolo do serviço e avaliação especializada.',
      'Perfuração intestinal: ressuscitação volêmica, antibiótico de amplo espectro com cobertura para anaeróbios e Gram-negativos e cirurgia de urgência.',
      'Precauções de contato e higiene rigorosa; investigar e tratar portadores crônicos entre contatos, especialmente manipuladores de alimentos, conforme protocolo.',
      'Notificação compulsória e investigação epidemiológica da fonte de contaminação (água, alimento, manipulador).'
    ],
    medicamentos: [
      { medId: 'ceftriaxona', esquema: 'Casos que exigem internação ou complicados: 50 a 100 mg/kg/dia IV uma vez ao dia ou dividida 12/12 h (máximo 2 a 4 g/dia), por 10 a 14 dias, conforme protocolo do serviço.' },
      { medId: 'azitromicina', esquema: 'Casos não complicados com tolerância oral: 10 a 20 mg/kg/dia VO uma vez ao dia (máximo 500 a 1.000 mg/dia) por 5 a 7 dias, conforme protocolo do serviço.' },
      { medId: 'sulfametoxazol_trimetoprim', esquema: 'Alternativa apenas quando o isolado for sensível: 40 mg/kg/dia de sulfametoxazol e 8 mg/kg/dia de trimetoprima VO dividida 12/12 h por 14 dias, conforme antibiograma.' },
      { medId: null, nome: 'Cloranfenicol', esquema: 'Alternativa histórica onde houver sensibilidade comprovada e disponibilidade: dose e duração conforme protocolo do Ministério da Saúde e bula, com monitorização hematológica, confirmar conforme protocolo.' },
      { medId: 'metronidazol', esquema: 'Associado à cobertura para anaeróbios em caso de perfuração intestinal, conforme protocolo cirúrgico do serviço.' },
      { medId: 'sais_reidratacao_oral', esquema: 'Reidratação e manutenção conforme plano A ou B do MS.' },
      { medId: 'ringer_lactato', esquema: 'Expansão volêmica em desidratação grave ou choque: conforme protocolo de ressuscitação do serviço.' },
      { medId: 'paracetamol', esquema: 'Febre e dor: 10 a 15 mg/kg/dose VO a cada 6 horas, conforme bula.' },
      { medId: 'dipirona', esquema: 'Alternativa antitérmica: 10 a 15 mg/kg/dose VO ou IV a cada 6 horas, conforme bula.' },
      { medId: 'dexametasona', esquema: 'Apenas em formas graves com choque ou alteração importante do sensório, em curso curto e sob avaliação especializada, conforme protocolo do serviço, confirmar conforme protocolo.' }
    ],
    criteriosInternacao: [
      'Vômitos persistentes, desidratação ou intolerância à via oral.',
      'Dor abdominal importante, distensão ou qualquer suspeita de complicação intestinal.',
      'Sangramento digestivo.',
      'Alteração de consciência, delírio ou convulsão.',
      'Toxemia, febre alta persistente ou piora após 5 a 7 dias de antibiótico.',
      'Lactente, desnutrido grave, anemia falciforme ou imunossuprimido.',
      'Icterícia ou suspeita de miocardite.',
      'Impossibilidade de reavaliação diária, comum em comunidades de difícil acesso.'
    ],
    criteriosUTI: [
      'Choque séptico ou hipovolêmico por hemorragia digestiva.',
      'Perfuração intestinal com peritonite e necessidade de cirurgia e suporte hemodinâmico.',
      'Rebaixamento importante do nível de consciência ou estado de mal convulsivo.',
      'Insuficiência respiratória ou miocardite com disfunção ventricular.',
      'Insuficiência renal aguda ou disfunção orgânica múltipla.'
    ],
    criteriosAlta: [
      'Afebril por pelo menos 48 horas e com melhora do estado geral e do apetite.',
      'Aceitação adequada de dieta e líquidos por via oral.',
      'Ausência de sinais abdominais de alarme e de sangramento.',
      'Antibiótico em curso com esquema e duração compreendidos pelo responsável, quando a transição para via oral for possível.',
      'Orientação sobre risco de recaída em 1 a 3 semanas e sobre sinais de alarme.',
      'Notificação realizada, investigação de fonte comum iniciada e contatos avaliados.',
      'Retorno agendado, incluindo coproculturas de controle quando indicadas pelo serviço.'
    ],
    orientacoes: [
      'Dar o antibiótico até o último dia indicado, mesmo com a febre já tendo passado; a febre demora de 3 a 5 dias para ceder.',
      'A doença pode voltar 1 a 3 semanas depois do fim do tratamento; se a febre retornar, procurar a unidade de saúde.',
      'Não dar remédios para segurar a diarreia nem antiespasmódicos sem orientação: podem aumentar o risco de complicação no intestino.',
      'Ferver ou clorar toda a água de beber, de fazer gelo e de preparar alimentos, principalmente se for de rio, igarapé, poço ou chuva.',
      'Lavar as mãos com água e sabão após usar o banheiro e antes de preparar ou servir alimentos.',
      'Evitar que a pessoa doente ou recém-curada prepare alimentos para outras pessoas até a liberação do serviço de saúde.',
      'Lavar e cozinhar bem os alimentos; evitar pescado cru ou mal cozido e alimentos vendidos sem condições de higiene.',
      'Procurar atendimento imediatamente se houver dor forte na barriga, barriga muito inchada e dura, fezes pretas ou com sangue, palidez, desmaio, confusão, sonolência ou convulsão.'
    ],
    retorno: 'Reavaliação em 48 a 72 horas durante o tratamento ambulatorial, com atenção especial na terceira semana de doença, período de maior risco de complicações; retorno imediato diante de dor abdominal intensa, sangramento ou alteração de consciência. Consulta de revisão 2 a 4 semanas após o término do antibiótico para pesquisa de recaída e, quando indicado, coproculturas de controle para identificar estado de portador.',
    prevencao: [
      'Tratamento da água de consumo por fervura, cloração ou filtração, medida central em comunidades ribeirinhas e periurbanas do Amazonas.',
      'Saneamento básico, destino adequado de dejetos e proteção das fontes de água contra contaminação fecal.',
      'Higiene das mãos e higiene na manipulação e no preparo de alimentos; cozimento adequado de pescado.',
      'Identificação, tratamento e afastamento de portadores crônicos, especialmente manipuladores de alimentos, conforme protocolo do Ministério da Saúde.',
      'Notificação compulsória e investigação de surtos de fonte comum pela vigilância epidemiológica e sanitária.',
      'Controle de moscas e destino adequado do lixo.',
      'Vacina contra febre tifoide não faz parte do Calendário Nacional de Vacinação e sua indicação é restrita a situações específicas, conforme orientação da vigilância.'
    ],
    fontes: [
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
      { nome: 'Manual Integrado de Vigilância e Controle da Febre Tifoide – Ministério da Saúde', ano: 2010 },
      { nome: 'OMS – Typhoid fever: diagnosis, treatment and prevention', ano: 2019 },
      { nome: 'Nelson Textbook of Pediatrics, 22ª edição', ano: 2024 }
    ],
    atualizadoEm: '2026-09'
  }

];
