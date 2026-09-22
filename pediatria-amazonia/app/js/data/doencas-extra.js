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
,

  {
    id: 'hiv_pediatrico',
    nome: 'Infecção pelo HIV na criança e no adolescente',
    categoria: 'infecciosa',
    amazonia: false,
    cid10: 'B20',
    tags: ['febre', 'perda_peso', 'diarreia', 'tosse', 'linfonodomegalia', 'hepatomegalia', 'esplenomegalia', 'lesoes_pele', 'palidez', 'fraqueza', 'dispneia', 'feridas'],
    definicao: 'Infecção crônica pelo vírus da imunodeficiência humana, adquirida na infância principalmente por transmissão vertical, que leva a imunodeficiência progressiva com infecções oportunistas, comprometimento do crescimento e do desenvolvimento. Com diagnóstico precoce e terapia antirretroviral iniciada no primeiro ano de vida, a evolução muda radicalmente.',
    epidemiologia: 'A transmissão vertical responde pela maioria dos casos em menores de 13 anos no Brasil e pode ser reduzida a menos de 1% com pré-natal adequado, terapia antirretroviral materna, profilaxia no recém-nascido e não amamentação. No Amazonas, as barreiras geográficas ao pré-natal, a testagem tardia na gestação e a dificuldade de acesso a fórmula infantil em comunidades ribeirinhas e indígenas ainda resultam em casos de transmissão vertical evitáveis. Em adolescentes, a transmissão sexual é a principal via, com aumento de casos e diagnóstico tardio. Coinfecções relevantes na região incluem tuberculose, leishmaniose visceral, sífilis, hepatites virais e paracoccidioidomicose. A infecção pelo HIV é de notificação compulsória, assim como a gestante e a criança exposta.',
    agente: 'Vírus da imunodeficiência humana tipos 1 e 2 (HIV-1 predominante no Brasil), retrovírus com tropismo por linfócitos T CD4.',
    transmissao: 'Vertical (intraútero, intraparto e pelo aleitamento materno, que responde por parcela relevante do risco quando há amamentação), sexual em adolescentes, por sangue e hemoderivados e por uso de material perfurocortante contaminado. O aleitamento materno é contraindicado para mães vivendo com HIV no Brasil.',
    incubacao: 'Sem tratamento, a progressão é bimodal na transmissão vertical: cerca de 15 a 25% evoluem rapidamente com imunodeficiência grave nos primeiros 12 meses e os demais progridem ao longo de anos. A infecção aguda em adolescentes surge 2 a 4 semanas após a exposição.',
    manifestacoes: [
      'Criança exposta assintomática: a maioria dos recém-nascidos de mães vivendo com HIV é assintomática ao nascer e o diagnóstico depende de testagem programada.',
      'Sinais precoces de infecção não tratada em lactentes: ganho de peso insuficiente, déficit de crescimento, atraso do desenvolvimento neuropsicomotor, hepatoesplenomegalia e linfadenomegalia generalizada persistente.',
      'Candidíase oral persistente ou recorrente, especialmente após os 6 meses de idade, e candidíase esofágica com recusa alimentar e dor à deglutição.',
      'Diarreia crônica ou recorrente, parotidite crônica bilateral indolor e dermatite persistente.',
      'Infecções bacterianas graves e recorrentes: pneumonia, otite média de repetição, sinusite, sepse, meningite.',
      'Pneumonia por Pneumocystis jirovecii em lactentes de 3 a 6 meses: taquipneia progressiva, hipoxemia desproporcional à ausculta, tosse seca e febre, com alta letalidade.',
      'Pneumonia intersticial linfocítica em crianças maiores, com hipoxemia crônica e baqueteamento digital.',
      'Tuberculose pulmonar e extrapulmonar, com apresentações atípicas e maior gravidade.',
      'Herpes-zóster, molusco contagioso extenso, verrugas disseminadas e escabiose crostosa.',
      'Anemia, plaquetopenia e leucopenia.',
      'Encefalopatia pelo HIV: perda de marcos do desenvolvimento, microcefalia adquirida, espasticidade e regressão neurológica.',
      'Em adolescentes, infecção aguda com síndrome mononucleose-símile: febre, faringite, exantema, adenomegalia e úlceras orais.'
    ],
    sinaisAlarme: [
      'Taquipneia progressiva com hipoxemia em lactente de 3 a 6 meses (suspeita de pneumocistose, que exige tratamento empírico imediato).',
      'Saturação de oxigênio abaixo de 92% ou desconforto respiratório.',
      'Candidíase esofágica com recusa alimentar e desidratação.',
      'Perda de peso acelerada, desnutrição grave ou parada do crescimento.',
      'Regressão de marcos do desenvolvimento, convulsão, alteração de consciência ou sinais neurológicos focais.',
      'Febre prolongada com hepatoesplenomegalia e pancitopenia (considerar tuberculose disseminada, leishmaniose visceral e micoses sistêmicas).',
      'Sinais de sepse ou de meningite.',
      'Anemia grave ou sangramento por plaquetopenia.',
      'Abandono ou interrupção da terapia antirretroviral, com risco de falha virológica e resistência.'
    ],
    diagnosticoDiferencial: ['tuberculose', 'desnutricao', 'leishmaniose_visceral', 'imunodeficiências primárias', 'mononucleose', 'sífilis congênita', 'citomegalovirose congênita', 'toxoplasmose congênita', 'fibrose cística', 'doença celíaca e outras causas de má absorção', 'neoplasias hematológicas'],
    exames: ['carga viral do HIV (RNA quantitativo) para diagnóstico em menores de 18 meses', 'testes rápidos e imunoensaio para HIV a partir de 18 meses ou em adolescentes', 'contagem de linfócitos T CD4 e CD8', 'hemograma', 'ast', 'alt', 'creatinina', 'ureia', 'glicemia', 'radiografia_torax', 'prova_tuberculinica', 'teste_rapido_molecular_tb', 'baciloscopia', 'sorologia para hepatites B e C', 'sorologia para sífilis (VDRL e teste treponêmico)', 'sorologia para toxoplasmose', 'gasometria', 'lactato'],
    criteriosDiagnosticos: [
      'Em menores de 18 meses, os anticorpos maternos atravessam a placenta e permanecem detectáveis: o diagnóstico exige detecção viral direta por carga viral (RNA do HIV), conforme o fluxograma do Ministério da Saúde.',
      'Criança exposta: coletar carga viral conforme calendário estabelecido no PCDT (primeira coleta a partir das 2 semanas de vida ou conforme fluxo vigente, com repetições subsequentes); duas cargas virais detectáveis em amostras distintas são compatíveis com infecção.',
      'Em maiores de 18 meses e adolescentes, o diagnóstico segue o fluxograma com testes rápidos ou imunoensaios, com confirmação conforme a normativa vigente.',
      'Sempre repetir e confirmar resultados antes de comunicar o diagnóstico, seguindo o fluxograma oficial.',
      'Solicitar contagem de CD4 e carga viral no diagnóstico e no seguimento, para estadiamento e monitorização.',
      'Investigar coinfecções no diagnóstico: tuberculose (incluindo prova tuberculínica ou IGRA, radiografia de tórax e pesquisa conforme suspeita), sífilis, hepatites B e C e toxoplasmose.',
      'Avaliar crescimento, desenvolvimento neuropsicomotor e situação vacinal em toda consulta.',
      'Notificação compulsória de gestante com HIV, criança exposta e caso de infecção.'
    ],
    classificacaoGravidade: [
      { nivel: 'Criança exposta em investigação', criterios: 'Recém-nascido ou lactente de mãe vivendo com HIV, em profilaxia antirretroviral e profilaxia para pneumocistose conforme protocolo, com exames em andamento e sem confirmação diagnóstica. Acompanhamento em serviço especializado.' },
      { nivel: 'Infecção sem imunodeficiência significativa', criterios: 'Diagnóstico confirmado, assintomático ou com sintomas leves, CD4 adequado para a idade. Início imediato de terapia antirretroviral e acompanhamento regular.' },
      { nivel: 'Doença avançada ou imunodeficiência grave', criterios: 'Infecção oportunista definidora, desnutrição grave, encefalopatia, CD4 baixo para a idade ou apresentação com doença grave. Internação quando indicada, tratamento da infecção oportunista e início ou reinício da terapia antirretroviral conforme protocolo, atento à síndrome inflamatória de reconstituição imune.' }
    ],
    tratamento: [
      'A terapia antirretroviral é indicada para toda criança e adolescente com diagnóstico confirmado, independentemente de sintomas ou de contagem de CD4, e deve ser iniciada o mais precocemente possível, idealmente nas primeiras semanas de vida nos casos de transmissão vertical.',
      'O esquema antirretroviral, as doses e as apresentações pediátricas devem ser definidos estritamente conforme o Protocolo Clínico e Diretrizes Terapêuticas para Manejo da Infecção pelo HIV em Crianças e Adolescentes do Ministério da Saúde vigente, em serviço especializado, com ajuste por peso e superfície corporal a cada consulta.',
      'Profilaxia primária para Pneumocystis jirovecii com sulfametoxazol com trimetoprima em toda criança exposta a partir de 4 a 6 semanas de vida até a definição diagnóstica, e em crianças infectadas conforme idade e contagem de CD4, segundo o protocolo vigente.',
      'Suspeita de pneumocistose: iniciar tratamento empírico imediato com sulfametoxazol com trimetoprima em dose terapêutica, associado a corticoide quando houver hipoxemia, conforme protocolo do serviço, sem aguardar confirmação.',
      'Tratamento e profilaxia de outras infecções oportunistas (tuberculose, candidíase, toxoplasmose, micobacteriose atípica, criptococose) conforme protocolos específicos e sempre em articulação com infectologia pediátrica.',
      'Contraindicação ao aleitamento materno para mães vivendo com HIV, com garantia de fórmula infantil pelo serviço e orientação para inibição da lactação, conforme protocolo do Ministério da Saúde.',
      'Suporte nutricional intensivo: avaliação e acompanhamento do crescimento, correção de deficiências, tratamento de desnutrição conforme protocolo específico.',
      'Calendário vacinal ampliado, com vacinas do CRIE conforme indicação; vacinas de agentes vivos exigem avaliação do estado imunológico, conforme o Manual do CRIE.',
      'Manejo da adesão como prioridade clínica: acolhimento, apoio psicossocial, envolvimento do cuidador, estratégias de dispensação adaptadas à realidade ribeirinha e apoio de agentes comunitários e do serviço de referência.',
      'Cuidado com o sigilo e com a revelação diagnóstica à criança, de forma gradual e adequada à idade, conduzida por equipe multiprofissional.',
      'Rastreamento e tratamento de infecções sexualmente transmissíveis em adolescentes, com discussão sobre prevenção combinada.',
      'Monitorização laboratorial periódica de carga viral, CD4, hemograma, função renal e hepática e perfil metabólico, conforme o protocolo.'
    ],
    medicamentos: [
      { medId: 'sulfametoxazol_trimetoprim', esquema: 'Profilaxia para pneumocistose: 750 mg/m2/dia de sulfametoxazol (ou cerca de 5 mg/kg/dia de trimetoprima) VO, em 1 a 2 tomadas, 3 vezes por semana ou diariamente, conforme o PCDT do Ministério da Saúde. Tratamento da pneumocistose: 15 a 20 mg/kg/dia de trimetoprima IV ou VO dividida 6/6 ou 8/8 h por 21 dias, confirmar conforme protocolo do serviço.' },
      { medId: null, nome: 'Terapia antirretroviral combinada', esquema: 'Esquema e doses definidos exclusivamente conforme o PCDT de Manejo da Infecção pelo HIV em Crianças e Adolescentes do Ministério da Saúde vigente e a avaliação de infectologia pediátrica, com ajuste por peso e idade em cada consulta. Confirmar conforme protocolo e bula.' },
      { medId: 'prednisolona', esquema: 'Adjuvante na pneumocistose com hipoxemia: 1 a 2 mg/kg/dia VO com desmame ao longo do tratamento, conforme protocolo do serviço, confirmar conforme protocolo.' },
      { medId: null, nome: 'Fórmula infantil', esquema: 'Substituição do aleitamento materno garantida pelo serviço de saúde para toda criança exposta ao HIV, conforme protocolo do Ministério da Saúde.' },
      { medId: 'azitromicina', esquema: 'Profilaxia ou tratamento de micobacteriose atípica e de infecções bacterianas conforme indicação específica e protocolo do serviço, confirmar conforme protocolo.' },
      { medId: null, nome: 'Fluconazol', esquema: 'Candidíase oral refratária ou esofágica: dose e duração conforme protocolo do serviço e bula, confirmar conforme protocolo.' },
      { medId: 'ceftriaxona', esquema: 'Infecção bacteriana grave em criança com HIV: 50 a 100 mg/kg/dia IV, conforme protocolo do serviço.' }
    ],
    criteriosInternacao: [
      'Suspeita de pneumocistose ou qualquer pneumonia com hipoxemia.',
      'Infecção oportunista com necessidade de tratamento parenteral.',
      'Desnutrição grave com complicações.',
      'Diarreia crônica com desidratação ou distúrbio eletrolítico.',
      'Candidíase esofágica impedindo alimentação.',
      'Suspeita de tuberculose disseminada ou meningite.',
      'Anemia grave ou plaquetopenia com sangramento.',
      'Encefalopatia com regressão neurológica ou convulsão.',
      'Necessidade de investigação diagnóstica complexa ou de suporte para início da terapia antirretroviral com garantia de adesão.'
    ],
    criteriosUTI: [
      'Insuficiência respiratória com necessidade de suporte ventilatório, em especial na pneumocistose grave.',
      'Choque séptico.',
      'Rebaixamento importante do nível de consciência ou estado de mal convulsivo.',
      'Disfunção orgânica múltipla.',
      'Síndrome inflamatória de reconstituição imune com comprometimento de órgão vital.'
    ],
    criteriosAlta: [
      'Infecção aguda controlada, sem febre e sem necessidade de terapia parenteral.',
      'Ausência de hipoxemia e boa aceitação alimentar.',
      'Terapia antirretroviral iniciada ou ajustada, com esquema compreendido pelo cuidador e primeira dispensação garantida.',
      'Consulta em serviço especializado agendada e transporte ou apoio social organizados para comunidades distantes.',
      'Cuidador orientado sobre adesão, armazenamento das medicações, sigilo e sinais de alarme.',
      'Situação vacinal, nutricional e de coinfecções avaliada e encaminhada.',
      'Notificação realizada e vínculo com a atenção primária estabelecido.'
    ],
    orientacoes: [
      'O remédio antirretroviral deve ser dado todos os dias, no mesmo horário, sem falhar nenhum dia, mesmo quando a criança estiver bem: é isso que mantém o vírus controlado.',
      'Se faltar medicação, procurar o serviço antes de acabar; nunca interromper por conta própria.',
      'Levar todas as medicações e o cartão de acompanhamento em cada consulta.',
      'A criança não deve mamar no peito; a fórmula infantil é fornecida pelo serviço de saúde.',
      'Manter o calendário de vacinas em dia conforme a orientação do serviço especializado.',
      'Manter as consultas e as coletas de sangue nas datas marcadas, mesmo que a criança esteja bem, e avisar a equipe se houver dificuldade de transporte.',
      'Com o tratamento correto, a criança cresce, se desenvolve e vive normalmente; o diagnóstico será conversado com ela aos poucos, com apoio da equipe.',
      'Procurar atendimento se houver febre persistente, tosse, respiração rápida, diarreia prolongada, perda de peso, placas brancas na boca, feridas que não cicatrizam ou qualquer piora.',
      'A informação sobre o diagnóstico é sigilosa e protegida por lei; a equipe pode ajudar a decidir com quem compartilhar.'
    ],
    retorno: 'Acompanhamento em serviço de referência em infectologia pediátrica, com consultas mensais no primeiro ano de vida ou no início do tratamento e, depois, a cada 2 a 3 meses conforme estabilidade, com monitorização de carga viral e CD4 segundo o protocolo; retorno imediato diante de febre, sintomas respiratórios, perda de peso ou interrupção da medicação.',
    prevencao: [
      'Testagem para HIV no pré-natal em todos os trimestres e no parto, com testagem também do parceiro, e início imediato da terapia antirretroviral na gestante.',
      'Profilaxia antirretroviral no recém-nascido exposto conforme o risco e o protocolo vigente, iniciada preferencialmente nas primeiras horas de vida.',
      'Contraindicação do aleitamento materno e garantia de fórmula infantil, com inibição da lactação, conforme protocolo do Ministério da Saúde.',
      'Acompanhamento da criança exposta com coletas de carga viral nos prazos previstos e profilaxia para pneumocistose.',
      'Prevenção combinada em adolescentes: preservativos, testagem regular, profilaxia pré-exposição e profilaxia pós-exposição conforme indicação.',
      'Testagem e tratamento de infecções sexualmente transmissíveis e vacinação contra HPV e hepatite B.',
      'Fortalecimento do pré-natal e da testagem rápida em comunidades ribeirinhas e indígenas, com apoio de equipes fluviais e do Distrito Sanitário Especial Indígena.',
      'Notificação compulsória de gestantes, crianças expostas e casos confirmados.'
    ],
    fontes: [
      { nome: 'Protocolo Clínico e Diretrizes Terapêuticas para Manejo da Infecção pelo HIV em Crianças e Adolescentes – Ministério da Saúde', ano: 2024 },
      { nome: 'Protocolo Clínico e Diretrizes Terapêuticas para Prevenção da Transmissão Vertical de HIV, Sífilis e Hepatites Virais – Ministério da Saúde', ano: 2022 },
      { nome: 'Manual dos Centros de Referência para Imunobiológicos Especiais (CRIE) – Ministério da Saúde', ano: 2023 },
      { nome: 'OMS – Consolidated guidelines on HIV prevention, testing, treatment, service delivery and monitoring', ano: 2021 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'glomerulonefrite_pos_estreptococica',
    nome: 'Glomerulonefrite difusa aguda pós-estreptocócica',
    categoria: 'urinaria',
    amazonia: false,
    cid10: 'N00.9',
    tags: ['edema', 'reducao_diurese', 'cefaleia', 'vomitos', 'dor_abdominal', 'convulsao', 'alteracao_consciencia', 'dispneia', 'palidez', 'febre', 'fraqueza', 'sangramento'],
    definicao: 'Glomerulonefrite aguda imunomediada que surge 1 a 3 semanas após faringoamigdalite ou 3 a 6 semanas após piodermite por cepas nefritogênicas de Streptococcus pyogenes, caracterizada pela síndrome nefrítica: hematúria, edema, hipertensão arterial e oligúria, com consumo de complemento C3.',
    epidemiologia: 'É a causa mais comum de síndrome nefrítica aguda na criança, com pico entre 5 e 12 anos e predomínio no sexo masculino. No Amazonas e em toda a Região Norte tem forte associação com piodermite e escabiose infectada, condições muito prevalentes em comunidades ribeirinhas, indígenas e periurbanas com dificuldade de acesso à água, sabão e cuidados de pele. Surtos comunitários podem ocorrer após epidemias de impetigo. Ao contrário da febre reumática, o tratamento antibiótico da infecção estreptocócica não previne a glomerulonefrite, embora reduza a disseminação da cepa nefritogênica na comunidade. O prognóstico na infância é excelente na grande maioria dos casos.',
    agente: 'Cepas nefritogênicas de Streptococcus pyogenes (estreptococo beta-hemolítico do grupo A), por mecanismo imunomediado com deposição de imunocomplexos e ativação da via alternativa do complemento.',
    transmissao: 'A glomerulonefrite em si não é transmissível; transmite-se a infecção estreptocócica precedente, por gotículas respiratórias (faringite) ou contato direto com lesões de pele (impetigo, escabiose infectada).',
    incubacao: 'Período de latência de 1 a 3 semanas após faringoamigdalite e de 3 a 6 semanas após piodermite.',
    manifestacoes: [
      'Edema de início súbito, tipicamente periorbitário e matinal, podendo evoluir para edema de membros inferiores, ascite e anasarca.',
      'Hematúria macroscópica em cerca de 30 a 50% dos casos, com urina de cor escura, descrita como cor de coca-cola, refrigerante ou chá preto; hematúria microscópica é universal.',
      'Oligúria, com redução do volume e da frequência urinária.',
      'Hipertensão arterial, presente na maioria dos casos, frequentemente o achado de maior risco imediato.',
      'Sintomas gerais: mal-estar, cefaleia, náuseas, vômitos, dor abdominal, febre baixa e palidez.',
      'História de dor de garganta 1 a 3 semanas antes ou de feridas de pele, impetigo ou sarna infectada 3 a 6 semanas antes.',
      'Proteinúria em geral leve a moderada; síndrome nefrótica associada ocorre em minoria dos casos.',
      'Congestão circulatória por hipervolemia: dispneia, taquipneia, estertores pulmonares, hepatomegalia e ritmo de galope.',
      'Encefalopatia hipertensiva: cefaleia intensa, vômitos, alterações visuais, confusão e convulsão.',
      'Evolução habitual: diurese e pressão arterial normalizam em 1 a 2 semanas, hematúria macroscópica cede em poucos dias, hematúria microscópica pode persistir por 6 a 12 meses e a proteinúria por alguns meses; o C3 normaliza em até 8 a 12 semanas.'
    ],
    sinaisAlarme: [
      'Hipertensão arterial significativa para idade, sexo e estatura, especialmente com cefaleia, vômitos ou alterações visuais.',
      'Convulsão, sonolência, confusão ou déficit neurológico (encefalopatia hipertensiva).',
      'Dispneia, taquipneia, ortopneia, estertores pulmonares ou queda de saturação (congestão pulmonar e edema agudo de pulmão).',
      'Anúria ou oligúria importante e mantida.',
      'Anasarca com ganho de peso rápido.',
      'Elevação progressiva de ureia e creatinina, hipercalemia ou acidose metabólica.',
      'Palidez intensa e sinais de anemia dilucional grave.',
      'Persistência de C3 baixo além de 12 semanas ou hematúria macroscópica prolongada (sugere outro diagnóstico).'
    ],
    diagnosticoDiferencial: ['nefropatia por IgA', 'glomerulonefrite membranoproliferativa', 'nefrite lúpica', 'púrpura de Henoch-Schönlein com nefrite', 'síndrome hemolítico-urêmica', 'infeccao_urinaria com hematúria', 'litíase renal', 'hipercalciúria idiopática', 'síndrome nefrótica', 'glomerulonefrite associada a endocardite ou a abscesso'],
    exames: ['urina_1', 'ureia', 'creatinina', 'complemento C3 e C4', 'antiestreptolisina O (ASLO) e anti-DNase B', 'sodio', 'potassio', 'hemograma', 'albumina', 'proteinúria de 24 horas ou relação proteína/creatinina em amostra isolada', 'urocultura', 'radiografia_torax (se congestão)', 'gasometria', 'FAN e anti-DNA (se suspeita de lúpus)', 'cultura de orofaringe ou de lesão de pele'],
    criteriosDiagnosticos: [
      'Quadro clínico de síndrome nefrítica aguda: hematúria, edema, hipertensão e oligúria, com ou sem insuficiência renal.',
      'Urina rotina com hematúria, cilindros hemáticos ou hemácias dismórficas e proteinúria variável.',
      'Evidência de infecção estreptocócica prévia: cultura positiva, ASLO elevado (mais sensível após faringite) ou anti-DNase B elevado (mais sensível após piodermite).',
      'Consumo de complemento com C3 baixo e C4 habitualmente normal é achado característico e deve normalizar em até 8 a 12 semanas.',
      'Ureia e creatinina para avaliar função renal; eletrólitos com atenção a potássio e sódio.',
      'A biópsia renal não é indicada de rotina; considerar quando houver curso atípico: anúria, insuficiência renal rapidamente progressiva, síndrome nefrótica importante, C3 persistentemente baixo além de 12 semanas, ausência de evidência de infecção estreptocócica ou hematúria macroscópica recorrente.',
      'Medir a pressão arterial com manguito adequado e comparar com tabelas de referência por idade, sexo e estatura em toda avaliação.'
    ],
    classificacaoGravidade: [
      { nivel: 'Leve', criterios: 'Hematúria e edema discreto, pressão arterial normal ou minimamente elevada, diurese preservada, ureia e creatinina normais. Acompanhamento ambulatorial próximo com restrição de sal e controle diário de peso, diurese e pressão arterial.' },
      { nivel: 'Moderada', criterios: 'Hipertensão arterial que requer tratamento, edema significativo, oligúria ou elevação leve de ureia e creatinina, sem congestão pulmonar nem sinais neurológicos. Internação para monitorização, restrição hidrossalina, diurético e anti-hipertensivo.' },
      { nivel: 'Grave', criterios: 'Encefalopatia hipertensiva, convulsão, congestão pulmonar ou edema agudo de pulmão, anúria, insuficiência renal com hipercalemia ou acidose grave. Internação em unidade de maior complexidade, tratamento da emergência hipertensiva e avaliação de diálise.' }
    ],
    tratamento: [
      'O tratamento é de suporte, com foco no controle da hipervolemia e da hipertensão, enquanto a doença segue seu curso autolimitado.',
      'Restrição de sódio (dieta sem sal de adição) e restrição hídrica proporcional à diurese e às perdas insensíveis, conforme avaliação, enquanto houver edema, hipertensão ou oligúria.',
      'Controle rigoroso de peso diário, balanço hídrico, diurese e pressão arterial várias vezes ao dia nos casos internados.',
      'Diurético de alça (furosemida) é a medida inicial para hipervolemia, edema e hipertensão volume-dependente, conforme protocolo do serviço.',
      'Anti-hipertensivo adicional quando a hipertensão não responde ao diurético e à restrição: escolha e dose conforme protocolo de nefrologia pediátrica; evitar inibidores da enzima conversora de angiotensina na fase aguda com hipercalemia ou queda de função renal.',
      'Emergência hipertensiva com encefalopatia: redução controlada e gradual da pressão arterial em ambiente monitorizado, com medicação parenteral conforme protocolo do serviço, evitando quedas abruptas.',
      'Antibiótico (penicilina benzatina em dose única ou amoxicilina por 10 dias) para erradicar o estreptococo e reduzir a disseminação da cepa nefritogênica na comunidade, embora não altere o curso da glomerulonefrite já instalada.',
      'Tratamento concomitante da escabiose e da piodermite, quando presentes, incluindo os contatos domiciliares, medida essencial para interromper surtos comunitários.',
      'Restrição proteica não é indicada de rotina; ajustar aporte conforme função renal e avaliação nutricional.',
      'Corticoide e imunossupressores não são indicados na forma clássica.',
      'Repouso relativo durante a fase aguda com hipertensão ou edema, retornando às atividades conforme melhora.',
      'Diálise em caso de hipercalemia refratária, acidose grave, hipervolemia refratária com edema agudo de pulmão, uremia sintomática ou anúria prolongada, conforme avaliação da nefrologia pediátrica.',
      'Acompanhamento ambulatorial prolongado com controle de pressão arterial, urina rotina e C3 até a normalização.'
    ],
    medicamentos: [
      { medId: null, nome: 'Furosemida', esquema: 'Hipervolemia, edema e hipertensão volume-dependente: 1 a 2 mg/kg/dose VO ou IV, repetida conforme resposta e protocolo do serviço, com monitorização de eletrólitos e diurese. Confirmar dose e intervalo conforme protocolo e bula.' },
      { medId: 'penicilina_benzatina', esquema: 'Erradicação do estreptococo: dose única IM de 600.000 UI em peso abaixo de 27 kg e 1.200.000 UI em peso igual ou acima de 27 kg.' },
      { medId: 'amoxicilina', esquema: 'Alternativa oral para erradicação: 50 mg/kg/dia VO (máximo 1 g/dia) por 10 dias.' },
      { medId: 'azitromicina', esquema: 'Alergia à penicilina: 12 mg/kg/dia VO uma vez ao dia (máximo 500 mg/dia) por 5 dias, conforme bula.' },
      { medId: 'permetrina', esquema: 'Escabiose associada, no paciente e nos contatos: loção ou creme a 5% em aplicação no corpo todo do pescoço para baixo, por 8 a 12 horas, repetida após 7 dias, conforme protocolo do MS.' },
      { medId: 'cefalexina', esquema: 'Piodermite associada: 50 a 100 mg/kg/dia VO dividida a cada 6 horas por 7 a 10 dias, conforme protocolo.' },
      { medId: null, nome: 'Anti-hipertensivo adicional (por exemplo, nifedipino, hidralazina ou nitroprussiato)', esquema: 'Escolha, via, dose e velocidade de redução pressórica definidas conforme o protocolo de emergência hipertensiva do serviço e avaliação da nefrologia pediátrica. Confirmar conforme protocolo e bula.' }
    ],
    criteriosInternacao: [
      'Hipertensão arterial significativa ou de difícil controle.',
      'Oligúria acentuada ou anúria.',
      'Edema importante, anasarca ou ganho de peso rápido.',
      'Sinais de congestão pulmonar ou insuficiência cardíaca.',
      'Elevação de ureia e creatinina ou distúrbio eletrolítico (hipercalemia, hiponatremia, acidose).',
      'Cefaleia intensa, vômitos, alterações visuais, convulsão ou alteração de consciência.',
      'Dúvida diagnóstica ou curso atípico que exija investigação.',
      'Impossibilidade de aferição diária da pressão arterial e da diurese em casa ou de retorno rápido ao serviço.'
    ],
    criteriosUTI: [
      'Encefalopatia hipertensiva com convulsão ou rebaixamento do nível de consciência.',
      'Edema agudo de pulmão ou insuficiência respiratória.',
      'Hipercalemia grave com alterações eletrocardiográficas ou arritmia.',
      'Insuficiência renal aguda com necessidade de diálise de urgência.',
      'Instabilidade hemodinâmica ou necessidade de anti-hipertensivo em infusão contínua com monitorização invasiva.'
    ],
    criteriosAlta: [
      'Pressão arterial controlada e estável, dentro da faixa adequada para idade, sexo e estatura.',
      'Diurese restabelecida e peso em queda ou estabilizado, com edema em regressão.',
      'Ureia, creatinina e eletrólitos estáveis ou em melhora.',
      'Ausência de sinais de congestão pulmonar e de manifestações neurológicas.',
      'Antibiótico de erradicação administrado e escabiose ou piodermite tratadas, incluindo contatos.',
      'Responsável orientado sobre restrição de sal, controle de peso e diurese e sinais de alarme.',
      'Retorno ambulatorial agendado com nefrologia ou pediatria, com plano de controle de pressão arterial, urina rotina e C3.'
    ],
    orientacoes: [
      'Preparar a comida sem sal de adição e não colocar sal na mesa; evitar caldo em cubo, temperos prontos, embutidos, enlatados, salgadinhos, charque e pescado salgado enquanto durar o inchaço e a pressão alta.',
      'Oferecer líquidos na quantidade orientada pela equipe, sem ultrapassar o volume indicado.',
      'Anotar todos os dias o peso da criança e observar a quantidade de xixi.',
      'A urina escura costuma clarear em poucos dias; um pouco de sangue invisível pode continuar por meses e isso é esperado.',
      'Dar o antibiótico até o final, quando prescrito; se foi aplicada a injeção, o tratamento já está completo.',
      'Tratar a sarna e as feridas de pele de toda a família ao mesmo tempo, conforme a orientação recebida.',
      'Voltar às consultas marcadas mesmo que a criança pareça bem: os exames de urina e de sangue precisam ser repetidos até normalizar.',
      'Procurar atendimento imediatamente se houver dor de cabeça forte, vômitos, alterações na visão, convulsão, sonolência, falta de ar, criança urinando muito pouco ou nada, ou inchaço piorando rapidamente.'
    ],
    retorno: 'Reavaliação em 24 a 72 horas nos casos leves acompanhados em casa, com aferição de pressão arterial e avaliação de diurese e peso; consultas semanais até a normalização da pressão arterial e da diurese; urina rotina e complemento C3 repetidos em 6 a 12 semanas, com encaminhamento à nefrologia pediátrica se o C3 permanecer baixo além de 12 semanas, se a proteinúria persistir além de 6 meses ou se houver hematúria macroscópica recorrente.',
    prevencao: [
      'Diagnóstico e tratamento precoces das infecções estreptocócicas de garganta e de pele, reduzindo a circulação de cepas nefritogênicas na comunidade.',
      'Tratamento simultâneo de escabiose e piodermite em todos os contatos domiciliares, medida de maior impacto na Região Norte.',
      'Higiene pessoal, acesso a água e sabão e cuidado precoce de feridas e picadas infectadas.',
      'Higiene das mãos, corte de unhas e lavagem de roupas de cama em surtos de impetigo.',
      'Busca ativa de casos em surtos comunitários de piodermite, com avaliação de pressão arterial e urina.',
      'Não há vacina disponível contra o estreptococo do grupo A.',
      'Orientar que o tratamento antibiótico da infecção não impede a glomerulonefrite, mas reduz a transmissão na comunidade.'
    ],
    fontes: [
      { nome: 'Tratado de Pediatria – Sociedade Brasileira de Pediatria', ano: 2022 },
      { nome: 'Documento Científico do Departamento de Nefrologia – Sociedade Brasileira de Pediatria', ano: 2021 },
      { nome: 'Nelson Textbook of Pediatrics, 22ª edição', ano: 2024 },
      { nome: 'KDIGO Clinical Practice Guideline for the Management of Glomerular Diseases', ano: 2021 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'otite_media_aguda',
    nome: 'Otite média aguda',
    categoria: 'respiratoria',
    amazonia: false,
    cid10: 'H66.9',
    tags: ['febre', 'dor_local', 'coriza', 'tosse', 'vomitos', 'diarreia', 'fraqueza', 'linfonodomegalia'],
    definicao: 'Infecção aguda da orelha média, caracterizada por início súbito de sinais e sintomas de inflamação associados à presença de efusão na orelha média, evidenciada por abaulamento da membrana timpânica, otorreia recente ou otalgia intensa. É uma das infecções bacterianas mais frequentes da infância e uma das principais causas de prescrição de antibióticos em pediatria.',
    epidemiologia: 'Acomete principalmente crianças de 6 a 24 meses, com pico de incidência nessa faixa pela anatomia da tuba auditiva. Fatores de risco incluem frequência a creche, ausência de aleitamento materno, uso de chupeta, exposição à fumaça de cigarro e de fogão a lenha e história familiar. No Amazonas, a exposição intensa à fumaça de lenha em domicílios ribeirinhos, a alta frequência de infecções respiratórias virais e a dificuldade de acesso ao otoscópio e ao especialista favorecem diagnósticos tardios, otites supuradas crônicas e perda auditiva com impacto no desenvolvimento da linguagem e na aprendizagem escolar. A mastoidite, embora rara, é mais vista onde o tratamento é retardado.',
    agente: 'Streptococcus pneumoniae, Haemophilus influenzae não tipável e Moraxella catarrhalis são as principais bactérias; Streptococcus pyogenes e Staphylococcus aureus em menor proporção. Vírus respiratórios frequentemente precedem e coexistem com a infecção bacteriana.',
    transmissao: 'Não se transmite a otite em si: transmitem-se as infecções respiratórias virais e a colonização bacteriana da nasofaringe, por gotículas e contato.',
    incubacao: 'Surge habitualmente 2 a 7 dias após o início de uma infecção viral de vias aéreas superiores.',
    manifestacoes: [
      'Otalgia de início súbito, que em lactentes se expressa por irritabilidade, choro inconsolável, despertares noturnos e manipulação ou tração da orelha.',
      'Febre, presente em cerca de metade a dois terços dos casos, habitualmente moderada.',
      'Antecedente recente de coriza, obstrução nasal e tosse.',
      'Otoscopia com membrana timpânica abaulada, hiperemiada ou opaca, com mobilidade reduzida à otoscopia pneumática quando disponível.',
      'Otorreia purulenta de início agudo, quando ocorre perfuração espontânea, geralmente acompanhada de alívio da dor.',
      'Hipoacusia, sensação de ouvido tampado e, em crianças maiores, zumbido.',
      'Irritabilidade, recusa alimentar, vômitos e diarreia em lactentes, sintomas inespecíficos que podem dominar o quadro.',
      'Otite média com efusão (persistência de líquido sem sinais agudos) pode permanecer por semanas após o episódio e não requer antibiótico.',
      'Complicações: perfuração timpânica persistente, otite média crônica supurativa, mastoidite, paralisia facial periférica, labirintite, meningite e abscesso intracraniano.'
    ],
    sinaisAlarme: [
      'Edema, eritema, dor retroauricular ou deslocamento do pavilhão auricular para fora e para baixo (mastoidite).',
      'Paralisia facial periférica.',
      'Rigidez de nuca, cefaleia intensa, vômitos, alteração de consciência ou convulsão (complicação intracraniana).',
      'Vertigem intensa, nistagmo ou perda auditiva súbita e importante.',
      'Toxemia, prostração ou sinais de sepse.',
      'Febre alta persistente após 48 a 72 horas de antibiótico adequado.',
      'Menor de 6 meses com otite média aguda.',
      'Otorreia persistente por mais de 2 semanas ou recorrente.'
    ],
    diagnosticoDiferencial: ['otite externa aguda', 'corpo estranho em conduto auditivo', 'dor referida por erupção dentária ou abscesso dentário', 'faringoamigdalite_estreptococica', 'adenite cervical', 'parotidite (caxumba)', 'miringite bolhosa', 'disfunção tubária e otite média com efusão', 'trauma ou barotrauma', 'mastoidite'],
    exames: ['otoscopia (preferencialmente pneumática)', 'hemograma (apenas se toxemia ou suspeita de complicação)', 'pcr', 'cultura de secreção otológica (otorreia persistente ou falha terapêutica)', 'hemocultura (se sepse)', 'tomografia de mastoide e crânio (suspeita de mastoidite ou complicação intracraniana)', 'audiometria ou avaliação audiológica (após episódios recorrentes ou efusão persistente)', 'timpanometria'],
    criteriosDiagnosticos: [
      'O diagnóstico exige otoscopia: sinais de efusão na orelha média associados a sinais e sintomas agudos de inflamação.',
      'Critérios aceitos: abaulamento moderado a intenso da membrana timpânica, ou otorreia de início recente não atribuível a otite externa, ou abaulamento leve associado a otalgia de início nas últimas 48 horas ou a hiperemia intensa da membrana.',
      'Hiperemia isolada da membrana timpânica, sem abaulamento e sem efusão, não estabelece o diagnóstico e pode decorrer de choro ou febre.',
      'Otite média com efusão (líquido sem sinais agudos) deve ser diferenciada da otite média aguda, pois não se beneficia de antibiótico.',
      'Avaliar sempre o outro ouvido e a orofaringe, e examinar mastoide e pares cranianos.',
      'Exames de imagem apenas diante de suspeita de complicação supurativa.',
      'Avaliação audiológica indicada após episódios recorrentes, efusão persistente por mais de 3 meses ou suspeita de atraso de linguagem.'
    ],
    classificacaoGravidade: [
      { nivel: 'Não grave', criterios: 'Otalgia leve por menos de 48 horas e temperatura abaixo de 39 graus nas últimas 24 horas, em criança com bom estado geral. Em maiores de 2 anos com quadro unilateral, a observação vigilante por 48 a 72 horas com analgesia é opção, desde que haja garantia de reavaliação.' },
      { nivel: 'Grave', criterios: 'Otalgia moderada a intensa, otalgia por 48 horas ou mais, ou temperatura igual ou superior a 39 graus. Antibioticoterapia indicada em qualquer idade.' },
      { nivel: 'Complicada', criterios: 'Mastoidite, paralisia facial, labirintite, complicação intracraniana, sepse ou falha terapêutica com toxemia. Internação, antibiótico parenteral e avaliação otorrinolaringológica de urgência.' }
    ],
    tratamento: [
      'Analgesia é prioridade em todos os casos, independentemente de se prescrever ou não antibiótico: paracetamol, dipirona ou ibuprofeno, em horários regulares nas primeiras 48 horas.',
      'Antibiótico indicado sempre em menores de 6 meses; em crianças de 6 a 23 meses com otite bilateral ou com qualquer otorreia; e em qualquer idade quando o quadro for grave (otalgia moderada a intensa, dor por 48 horas ou mais, ou temperatura igual ou superior a 39 graus).',
      'Observação vigilante por 48 a 72 horas, com analgesia e reavaliação garantida, pode ser considerada em crianças de 6 a 23 meses com otite unilateral não grave e em maiores de 24 meses com quadro não grave; essa estratégia exige retorno assegurado, o que deve ser ponderado em comunidades de difícil acesso.',
      'Amoxicilina é o antibiótico de primeira escolha, em dose alta, por 10 dias em menores de 2 anos e nos casos graves ou com otorreia, e por 5 a 7 dias em crianças maiores de 2 anos com quadro leve a moderado.',
      'Amoxicilina com clavulanato é indicada quando houver uso de amoxicilina nos últimos 30 dias, conjuntivite purulenta concomitante (sugestiva de Haemophilus), otite recorrente ou falha terapêutica após 48 a 72 horas.',
      'Alergia à penicilina: cefalexina ou outra cefalosporina em alergia não anafilática; azitromicina ou claritromicina em alergia grave, considerando menor eficácia contra pneumococo resistente.',
      'Ceftriaxona intramuscular ou intravenosa é opção em vômitos, intolerância à via oral ou falha terapêutica, conforme protocolo do serviço.',
      'Reavaliar em 48 a 72 horas: a ausência de melhora indica falha terapêutica e necessidade de ampliar o espectro e de reexaminar a mastoide.',
      'Não usar descongestionantes, anti-histamínicos ou corticoides, que não trazem benefício.',
      'Gotas otológicas com antibiótico podem ser indicadas em otorreia por perfuração ou em portadores de tubo de ventilação, conforme avaliação; evitar gotas potencialmente ototóxicas com membrana perfurada, conforme bula.',
      'Não introduzir água, óleo, ervas, fumaça de cigarro, leite materno ou qualquer substância no conduto auditivo.',
      'Mastoidite ou complicação: internação, antibiótico parenteral de amplo espectro, imagem e avaliação otorrinolaringológica para eventual drenagem.',
      'Encaminhar à otorrinolaringologia se otite recorrente (3 episódios em 6 meses ou 4 em 12 meses), efusão persistente por mais de 3 meses, perfuração persistente ou suspeita de perda auditiva.'
    ],
    medicamentos: [
      { medId: 'amoxicilina', esquema: 'Primeira escolha: 80 a 90 mg/kg/dia VO dividida 12/12 h (máximo 2 a 3 g/dia), por 10 dias em menores de 2 anos, em otite grave ou com otorreia, e por 5 a 7 dias em maiores de 2 anos com quadro leve a moderado.' },
      { medId: 'amoxicilina_clavulanato', esquema: 'Falha terapêutica, uso recente de amoxicilina, conjuntivite purulenta associada ou otite recorrente: 80 a 90 mg/kg/dia do componente amoxicilina VO dividida 12/12 h, em formulação com baixa proporção de clavulanato, por 10 dias.' },
      { medId: 'ceftriaxona', esquema: 'Intolerância à via oral ou falha terapêutica: 50 mg/kg/dia IM ou IV uma vez ao dia por 1 a 3 dias, conforme protocolo do serviço.' },
      { medId: 'cefalexina', esquema: 'Alergia não anafilática à penicilina: 50 mg/kg/dia VO dividida 6/6 h, conforme protocolo do serviço.' },
      { medId: 'azitromicina', esquema: 'Alergia grave à penicilina: 10 mg/kg no 1º dia e 5 mg/kg/dia do 2º ao 5º dia VO, conforme bula, considerando menor atividade contra pneumococo resistente.' },
      { medId: 'claritromicina', esquema: 'Alternativa em alergia à penicilina: 15 mg/kg/dia VO dividida 12/12 h por 10 dias (máximo 1 g/dia).' },
      { medId: 'paracetamol', esquema: 'Analgesia e febre: 10 a 15 mg/kg/dose VO a cada 6 horas, conforme bula.' },
      { medId: 'ibuprofeno', esquema: 'Analgesia: 5 a 10 mg/kg/dose VO a cada 6 a 8 horas, conforme bula.' },
      { medId: 'dipirona', esquema: 'Alternativa analgésica e antitérmica: 10 a 15 mg/kg/dose VO a cada 6 horas, conforme bula.' }
    ],
    criteriosInternacao: [
      'Suspeita de mastoidite, paralisia facial ou complicação intracraniana.',
      'Toxemia, prostração ou suspeita de sepse.',
      'Vômitos persistentes ou incapacidade de tomar o antibiótico por via oral.',
      'Menor de 3 meses com febre e otite média aguda.',
      'Falha terapêutica com piora clínica apesar de antibiótico adequado.',
      'Imunossupressão ou comorbidade relevante.',
      'Impossibilidade de reavaliação em 48 a 72 horas em comunidade distante, quando o quadro exigir vigilância.'
    ],
    criteriosUTI: [
      'Complicação intracraniana com rebaixamento de consciência, convulsão ou hipertensão intracraniana.',
      'Sepse ou choque séptico.',
      'Necessidade de suporte ventilatório ou hemodinâmico durante o tratamento de complicação supurativa.'
    ],
    criteriosAlta: [
      'Dor controlada com analgesia oral e febre em resolução.',
      'Ausência de sinais de mastoidite ou de complicação neurológica.',
      'Tolerância ao antibiótico por via oral, com esquema e duração compreendidos pelo responsável.',
      'Responsável orientado sobre sinais de alarme e sobre a necessidade de completar o tratamento.',
      'Reavaliação agendada e, quando indicado, encaminhamento à otorrinolaringologia e à avaliação audiológica.'
    ],
    orientacoes: [
      'Dar o remédio para dor em horários regulares nos primeiros dias: a dor de ouvido costuma ser forte e melhora bem com analgesia.',
      'Se o médico optou por aguardar sem antibiótico, retornar em 48 a 72 horas se não houver melhora, ou antes se piorar.',
      'Quando houver antibiótico, dar todos os dias até o fim, mesmo com a criança melhor.',
      'Não colocar nada dentro do ouvido: água, óleo, ervas, fumaça de cigarro, leite materno, algodão com produtos ou gotas não prescritas.',
      'Se sair pus do ouvido, limpar apenas a parte externa com gaze ou pano limpo e comunicar o serviço.',
      'Evitar fumaça de cigarro e de fogão a lenha dentro de casa e reduzir o uso de chupeta.',
      'Manter o aleitamento materno e as vacinas em dia, especialmente a pneumocócica e a da gripe.',
      'Retornar imediatamente se houver inchaço ou vermelhidão atrás da orelha, orelha empurrada para fora, boca torta, dor de cabeça forte, vômitos, pescoço duro, sonolência, convulsão ou febre que continua depois de 3 dias de antibiótico.',
      'Se a criança parecer não ouvir bem, demorar a falar ou pedir muito para repetir, comunicar na consulta: pode ser necessário avaliar a audição.'
    ],
    retorno: 'Reavaliação em 48 a 72 horas nos casos em observação vigilante e em todos os lactentes; nos demais, retorno ao final do tratamento ou antes se não houver melhora. Reavaliação da membrana timpânica em 4 a 6 semanas nos casos com otorreia ou efusão, e encaminhamento audiológico se a efusão persistir por mais de 3 meses ou houver suspeita de perda auditiva.',
    prevencao: [
      'Vacinação pneumocócica conjugada e vacina influenza anual, conforme o Calendário Nacional de Vacinação.',
      'Aleitamento materno exclusivo até os 6 meses e complementado até 2 anos ou mais.',
      'Evitar alimentar o lactente deitado com mamadeira e reduzir o uso de chupeta após os 6 meses.',
      'Eliminar a exposição à fumaça de cigarro e reduzir a exposição à fumaça de fogão a lenha, com ventilação adequada da cozinha.',
      'Higiene das mãos e manejo adequado das infecções respiratórias virais.',
      'Tratamento adequado dos episódios agudos para prevenir otite crônica supurativa e perda auditiva.',
      'Acesso a otoscópio e capacitação das equipes de atenção primária e de unidades fluviais para diagnóstico correto.',
      'Vigilância do desenvolvimento da linguagem em crianças com otites de repetição.'
    ],
    fontes: [
      { nome: 'AAP Clinical Practice Guideline: The Diagnosis and Management of Acute Otitis Media', ano: 2013 },
      { nome: 'Tratado de Pediatria – Sociedade Brasileira de Pediatria', ano: 2022 },
      { nome: 'Nelson Textbook of Pediatrics, 22ª edição', ano: 2024 },
      { nome: 'Manual AIDPI Criança – Ministério da Saúde', ano: 2017 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'faringoamigdalite_estreptococica',
    nome: 'Faringoamigdalite estreptocócica',
    categoria: 'respiratoria',
    amazonia: false,
    cid10: 'J03.0',
    tags: ['febre', 'dor_garganta', 'linfonodomegalia', 'cefaleia', 'vomitos', 'dor_abdominal', 'exantema', 'fraqueza'],
    definicao: 'Infecção aguda da faringe e das amígdalas por Streptococcus pyogenes, caracterizada por dor de garganta de início súbito, febre, exsudato amigdaliano e adenomegalia cervical anterior dolorosa, tipicamente sem tosse nem coriza. Seu tratamento adequado previne a febre reumática.',
    epidemiologia: 'Representa cerca de 15 a 30% das faringites agudas em crianças de 5 a 15 anos, sendo incomum abaixo dos 3 anos. No Amazonas, a importância clínica está na prevenção da febre reumática e da cardiopatia reumática crônica, que permanecem prevalentes em populações com dificuldade de acesso ao diagnóstico e ao antibiótico, e no combate ao uso indiscriminado de antibióticos em faringites virais, que representam a maioria dos casos. Em comunidades ribeirinhas, a dose única de penicilina benzatina tem vantagem prática evidente sobre esquemas orais de 10 dias, pela garantia de tratamento completo em uma única visita.',
    agente: 'Streptococcus pyogenes (estreptococo beta-hemolítico do grupo A). Estreptococos dos grupos C e G podem causar faringite, sem risco de febre reumática.',
    transmissao: 'Gotículas respiratórias e contato direto com secreções de nasofaringe de doentes ou portadores; a transmissibilidade é maior na fase aguda e cessa cerca de 24 horas após o início do antibiótico eficaz.',
    incubacao: '2 a 5 dias.',
    manifestacoes: [
      'Início súbito de dor de garganta intensa e febre, frequentemente acompanhadas de cefaleia, mal-estar, náuseas, vômitos e dor abdominal, especialmente em escolares.',
      'Amígdalas hiperemiadas e aumentadas, com exsudato branco-amarelado em placas ou puntiforme.',
      'Petéquias em palato mole e úvula edemaciada e hiperemiada.',
      'Adenomegalia cervical anterior (submandibular e jugulodigástrica) dolorosa à palpação.',
      'Ausência de tosse, coriza, rouquidão, conjuntivite, úlceras orais e diarreia, cuja presença sugere fortemente etiologia viral.',
      'Halitose e odinofagia intensa com dificuldade para deglutir alimentos sólidos.',
      'Exantema micropapular áspero caracteriza a forma escarlatiniforme (escarlatina).',
      'Complicações supurativas: abscesso periamigdaliano e retrofaríngeo, adenite cervical supurada, otite média, sinusite e, raramente, infecção invasiva.',
      'Complicações não supurativas: febre reumática (prevenível com antibiótico adequado) e glomerulonefrite difusa aguda (não prevenível pelo antibiótico).'
    ],
    sinaisAlarme: [
      'Trismo, voz abafada, sialorreia, desvio de úvula ou abaulamento assimétrico de palato (abscesso periamigdaliano).',
      'Rigidez de nuca, torcicolo, dor à mobilização cervical ou abaulamento de parede posterior da faringe (abscesso retrofaríngeo).',
      'Estridor, dispneia ou incapacidade de deglutir a própria saliva.',
      'Toxemia, hipotensão ou exantema descamativo difuso (síndrome do choque tóxico).',
      'Desidratação por recusa de líquidos.',
      'Febre persistente após 48 a 72 horas de antibiótico adequado.',
      'Edema periorbitário, urina escura ou oligúria após o quadro (glomerulonefrite).',
      'Artrite migratória, dispneia, sopro novo ou movimentos involuntários semanas depois (febre reumática).'
    ],
    diagnosticoDiferencial: ['faringite viral (adenovírus, rinovírus, influenza, coronavírus)', 'mononucleose', 'herpangina e gengivoestomatite herpética', 'mao_pe_boca', 'escarlatina', 'difteria', 'abscesso periamigdaliano e retrofaríngeo', 'candidíase orofaríngea', 'faringite gonocócica em adolescentes', 'agranulocitose e leucemia', 'doença de Kawasaki'],
    exames: ['teste rápido para antígeno de estreptococo do grupo A em swab de orofaringe', 'cultura de orofaringe (swab)', 'hemograma (apenas em quadros atípicos ou graves)', 'pcr', 'sorologia para Epstein-Barr e teste de anticorpos heterófilos (suspeita de mononucleose)', 'urina_1 (vigilância de glomerulonefrite)', 'ureia', 'creatinina', 'antiestreptolisina O (ASLO) com valor apenas retrospectivo'],
    criteriosDiagnosticos: [
      'A distinção clínica entre faringite viral e estreptocócica é imperfeita: escores clínicos auxiliam, mas não substituem o teste microbiológico quando disponível.',
      'Escore de Centor modificado por McIsaac pontua: exsudato ou edema amigdaliano, adenomegalia cervical anterior dolorosa, febre relatada acima de 38 graus, ausência de tosse e idade de 3 a 14 anos (ponto adicional), com desconto para idade acima de 45 anos.',
      'Pontuação baixa torna a etiologia estreptocócica improvável e não justifica antibiótico nem testagem; pontuação intermediária ou alta indica realizar teste rápido ou cultura.',
      'Teste rápido positivo confirma; teste rápido negativo em criança ou adolescente com quadro sugestivo deve ser seguido de cultura de orofaringe, quando disponível, pela menor sensibilidade do teste rápido.',
      'Quando não houver teste disponível, decidir com base no quadro clínico e no risco individual e comunitário de febre reumática, conforme a realidade local, evitando a prescrição indiscriminada.',
      'Presença de tosse, coriza, rouquidão, conjuntivite, úlceras orais ou diarreia torna a etiologia estreptocócica improvável.',
      'ASLO não tem utilidade para o diagnóstico da infecção aguda.',
      'Não há indicação de teste de controle após o tratamento em pacientes assintomáticos; portadores crônicos assintomáticos não requerem tratamento de rotina.'
    ],
    classificacaoGravidade: [
      { nivel: 'Não complicada', criterios: 'Odinofagia, febre e exsudato com boa aceitação de líquidos, sem trismo, sem sinais de obstrução e sem toxemia. Tratamento ambulatorial com antibiótico e analgesia.' },
      { nivel: 'Com complicação supurativa', criterios: 'Abscesso periamigdaliano ou retrofaríngeo, adenite supurada ou celulite cervical. Internação, antibiótico parenteral, imagem e avaliação otorrinolaringológica para eventual drenagem.' },
      { nivel: 'Invasiva ou com complicação não supurativa', criterios: 'Síndrome do choque tóxico, bacteremia, glomerulonefrite pós-estreptocócica com hipertensão ou oligúria, ou febre reumática com cardite. Internação e manejo especializado.' }
    ],
    tratamento: [
      'Antibioticoterapia indicada quando houver confirmação por teste rápido ou cultura, ou forte suspeita clínica em contexto de risco, com o objetivo principal de prevenir a febre reumática, além de reduzir sintomas, transmissão e complicações supurativas.',
      'O tratamento pode ser iniciado com segurança até o 9º dia do início dos sintomas e ainda assim prevenir a febre reumática.',
      'Penicilina benzatina em dose única intramuscular é a opção preferencial quando há risco de baixa adesão ou dificuldade de retorno, situação frequente em comunidades ribeirinhas e indígenas.',
      'Amoxicilina por via oral por 10 dias é alternativa eficaz e bem tolerada, com posologia simples; a duração de 10 dias é necessária para a erradicação.',
      'Alergia à penicilina: cefalexina por 10 dias em alergia não anafilática; azitromicina por 5 dias ou claritromicina por 10 dias em alergia grave.',
      'Analgesia e antitérmico com paracetamol, dipirona ou ibuprofeno, em horários regulares nos primeiros dias, pois a dor é o sintoma que mais incomoda.',
      'Hidratação com líquidos frios, gelatina, sorvete e alimentos macios; evitar alimentos ácidos, quentes e condimentados.',
      'Não usar corticoide de rotina; reservar para obstrução de via aérea conforme avaliação especializada.',
      'Não prescrever antibiótico para faringite com características virais evidentes (tosse, coriza, rouquidão, conjuntivite, úlceras orais): essa é a principal medida de uso racional de antibióticos em pediatria.',
      'Afastamento escolar até 24 horas após o início do antibiótico eficaz e resolução da febre.',
      'Reavaliar em 48 a 72 horas: persistência da febre sugere complicação supurativa, má adesão ou diagnóstico alternativo, como mononucleose.',
      'Avaliar contatos domiciliares sintomáticos; não tratar portadores assintomáticos de rotina.',
      'Orientar vigilância para sinais de glomerulonefrite em 1 a 3 semanas e de febre reumática em 2 a 4 semanas.',
      'Indicação de amigdalectomia deve ser avaliada por otorrinolaringologia em casos de faringites estreptocócicas documentadas muito frequentes ou de abscessos de repetição, conforme critérios estabelecidos.'
    ],
    medicamentos: [
      { medId: 'penicilina_benzatina', esquema: 'Dose única IM: 600.000 UI em peso abaixo de 27 kg e 1.200.000 UI em peso igual ou acima de 27 kg. Observar por 30 minutos após a aplicação.' },
      { medId: 'amoxicilina', esquema: '50 mg/kg/dia VO (máximo 1 g/dia) em 1 ou 2 tomadas por 10 dias; não encurtar a duração.' },
      { medId: 'cefalexina', esquema: 'Alergia não anafilática à penicilina: 40 a 50 mg/kg/dia VO dividida 12/12 h (máximo 1 g/dia) por 10 dias.' },
      { medId: 'azitromicina', esquema: 'Alergia grave à penicilina: 12 mg/kg/dia VO uma vez ao dia (máximo 500 mg/dia) por 5 dias, conforme bula.' },
      { medId: 'claritromicina', esquema: 'Alergia grave à penicilina: 15 mg/kg/dia VO dividida 12/12 h (máximo 500 mg por dose) por 10 dias.' },
      { medId: 'amoxicilina_clavulanato', esquema: 'Complicação supurativa ou falha terapêutica, conforme avaliação: 45 a 50 mg/kg/dia do componente amoxicilina VO dividida 12/12 h, conforme protocolo do serviço.' },
      { medId: 'paracetamol', esquema: 'Dor e febre: 10 a 15 mg/kg/dose VO a cada 6 horas, conforme bula.' },
      { medId: 'ibuprofeno', esquema: 'Odinofagia: 5 a 10 mg/kg/dose VO a cada 6 a 8 horas, conforme bula.' },
      { medId: 'dipirona', esquema: 'Alternativa analgésica e antitérmica: 10 a 15 mg/kg/dose VO a cada 6 horas, conforme bula.' }
    ],
    criteriosInternacao: [
      'Suspeita de abscesso periamigdaliano ou retrofaríngeo.',
      'Incapacidade de deglutir líquidos ou saliva, com desidratação.',
      'Estridor, dispneia ou qualquer sinal de obstrução de via aérea.',
      'Toxemia, hipotensão ou suspeita de infecção invasiva.',
      'Vômitos persistentes que impeçam o uso do antibiótico oral.',
      'Falha do tratamento ambulatorial com piora clínica.',
      'Complicação não supurativa com repercussão (glomerulonefrite com hipertensão, cardite reumática).'
    ],
    criteriosUTI: [
      'Obstrução de via aérea superior com necessidade de via aérea artificial.',
      'Choque tóxico estreptocócico ou choque séptico.',
      'Mediastinite ou fasciíte cervical descendente.',
      'Insuficiência cardíaca por cardite reumática grave.'
    ],
    criteriosAlta: [
      'Afebril ou com febre em declínio e dor controlada com analgesia oral.',
      'Aceitação adequada de líquidos e do antibiótico por via oral, ou dose única de penicilina benzatina já administrada.',
      'Ausência de sinais de complicação supurativa ou de obstrução.',
      'Responsável orientado sobre a importância de completar 10 dias de antibiótico oral, quando for o caso.',
      'Orientação sobre vigilância de glomerulonefrite e de febre reumática, com retorno agendado.'
    ],
    orientacoes: [
      'Se foi indicado antibiótico por via oral, dar todos os dias até completar 10 dias, mesmo que a garganta melhore em 2 dias: parar antes aumenta o risco de problema no coração.',
      'Se foi aplicada a injeção de penicilina benzatina, o tratamento já está completo com a dose única.',
      'Dar o remédio para dor em horários regulares nos primeiros dias; a dor é o que mais incomoda.',
      'Oferecer líquidos gelados, gelatina, sorvete, iogurte e alimentos macios; evitar alimentos ácidos, quentes e temperados.',
      'A criança pode voltar à escola 24 horas depois de começar o antibiótico, se estiver sem febre.',
      'Nem toda dor de garganta precisa de antibiótico: quando há tosse, coriza, rouquidão e olhos vermelhos, geralmente é virose e o antibiótico não ajuda.',
      'Trocar a escova de dente após 24 a 48 horas de tratamento e não compartilhar copos e talheres.',
      'Nas semanas seguintes, observar inchaço nos olhos ou pernas, urina escura ou em pouca quantidade, dor e inchaço nas juntas, falta de ar ou movimentos involuntários, e procurar a unidade de saúde se aparecerem.',
      'Retornar imediatamente se houver dificuldade para respirar ou engolir saliva, boca que não abre, voz abafada, pescoço inchado ou febre que persiste após 3 dias de antibiótico.'
    ],
    retorno: 'Reavaliação em 48 a 72 horas se não houver melhora; retorno programado em 1 a 3 semanas para aferição de pressão arterial e urina rotina quando indicado, e orientação de vigilância para febre reumática por até 4 semanas. Encaminhamento à otorrinolaringologia se episódios documentados muito frequentes.',
    prevencao: [
      'Não há vacina disponível contra o estreptococo do grupo A.',
      'Diagnóstico e tratamento adequados da faringite estreptocócica, principal medida de prevenção primária da febre reumática.',
      'Uso racional de antibióticos, evitando prescrição em faringites de características virais.',
      'Higiene das mãos, etiqueta respiratória e não compartilhamento de copos, talheres e garrafas.',
      'Afastamento escolar por 24 horas após o início do antibiótico.',
      'Profilaxia secundária com penicilina benzatina em pacientes com febre reumática prévia, conforme o protocolo do Ministério da Saúde.',
      'Redução da aglomeração domiciliar e melhoria das condições de moradia.',
      'Garantia de acesso a testes rápidos e a penicilina benzatina nas unidades básicas e fluviais do interior.'
    ],
    fontes: [
      { nome: 'Diretrizes Brasileiras para o Diagnóstico e Tratamento da Febre Reumática – Sociedade Brasileira de Cardiologia e SBP', ano: 2009 },
      { nome: 'IDSA Clinical Practice Guideline for the Diagnosis and Management of Group A Streptococcal Pharyngitis', ano: 2012 },
      { nome: 'Tratado de Pediatria – Sociedade Brasileira de Pediatria', ano: 2022 },
      { nome: 'Nelson Textbook of Pediatrics, 22ª edição', ano: 2024 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'laringite_viral',
    nome: 'Laringotraqueíte viral aguda (crupe)',
    categoria: 'respiratoria',
    amazonia: false,
    cid10: 'J05.0',
    tags: ['tosse', 'estridor', 'dispneia', 'febre', 'coriza', 'alteracao_consciencia', 'palidez', 'fraqueza'],
    definicao: 'Infecção viral aguda da laringe, traqueia e brônquios que provoca edema subglótico, caracterizada pela tríade tosse metálica ou ladrante, rouquidão e estridor inspiratório, com graus variáveis de desconforto respiratório. É a principal causa de obstrução aguda de via aérea superior em crianças pequenas.',
    epidemiologia: 'Acomete principalmente crianças de 6 meses a 3 anos, com pico aos 2 anos e predomínio no sexo masculino. Nas regiões temperadas há sazonalidade de outono e inverno; no Amazonas os casos se distribuem ao longo do ano, com aumento no período chuvoso, acompanhando a circulação de vírus respiratórios. A exposição domiciliar à fumaça de fogão a lenha e ao tabagismo passivo agrava os sintomas. Em comunidades distantes, a principal preocupação é o reconhecimento precoce da obstrução grave e a disponibilidade de corticoide e de adrenalina nebulizada nas unidades básicas e fluviais, uma vez que o transporte até Manaus pode levar horas ou dias.',
    agente: 'Vírus parainfluenza tipos 1, 2 e 3 (principal causa, especialmente o tipo 1); vírus sincicial respiratório, influenza A e B (associado a formas mais graves), adenovírus, rinovírus, metapneumovírus e coronavírus sazonais.',
    transmissao: 'Gotículas respiratórias e contato com secreções e superfícies contaminadas.',
    incubacao: '2 a 6 dias, conforme o agente.',
    manifestacoes: [
      'Pródromo de 12 a 48 horas com coriza, obstrução nasal, febre baixa e tosse leve.',
      'Instalação, tipicamente noturna, de tosse metálica ou ladrante (semelhante a latido de cão), rouquidão e estridor inspiratório.',
      'Estridor inicialmente apenas ao choro, à agitação ou ao esforço, podendo progredir para estridor em repouso.',
      'Retração supraesternal e de fúrcula, e nos casos mais graves tiragem intercostal e subcostal e uso de musculatura acessória.',
      'Piora noturna e com choro e agitação; melhora com o ambiente calmo e com ar fresco e úmido, fenômeno frequentemente relatado pelos pais no trajeto até o serviço.',
      'Ausculta pulmonar habitualmente limpa, com transmissão do ruído laríngeo; murmúrio vesicular diminuído nos casos graves.',
      'Febre habitualmente baixa; febre alta com toxemia sugere traqueíte bacteriana ou epiglotite.',
      'Duração habitual de 3 a 7 dias, com pico de gravidade nas primeiras 24 a 48 horas.',
      'Crupe espasmódico: episódios recorrentes de início súbito noturno, sem pródromo infeccioso evidente e com resolução rápida.'
    ],
    sinaisAlarme: [
      'Estridor em repouso, especialmente se bifásico.',
      'Tiragem intensa, uso de musculatura acessória, batimento de asa nasal ou balanço tóraco-abdominal.',
      'Redução paradoxal do estridor com piora do estado geral (sinal de exaustão e de obstrução crítica, não de melhora).',
      'Cianose, palidez, saturação abaixo de 92% ou queda do murmúrio vesicular.',
      'Agitação intensa, sonolência, confusão ou rebaixamento do nível de consciência.',
      'Sialorreia, incapacidade de engolir, posição de tripé, pescoço estendido ou voz abafada (suspeita de epiglotite ou abscesso).',
      'Febre alta com toxemia e secreção purulenta (suspeita de traqueíte bacteriana).',
      'Menor de 6 meses, prematuro, portador de estenose subglótica prévia, anomalia de via aérea ou cardiopatia.',
      'Falta de resposta à adrenalina nebulizada ou necessidade de doses repetidas.'
    ],
    diagnosticoDiferencial: ['epiglotite', 'traqueíte bacteriana', 'abscesso retrofaríngeo', 'aspiração de corpo estranho', 'anafilaxia e angioedema', 'estenose subglótica e laringomalácia', 'papilomatose laríngea', 'difteria (crupe diftérico)', 'queimadura ou inalação de fumaça', 'compressão extrínseca por massa ou anel vascular', 'refluxo gastroesofágico com laringite'],
    exames: ['oximetria de pulso', 'avaliação clínica seriada com escore de Westley', 'radiografia cervical em anteroposterior (sinal da torre ou da ponta de lápis, apenas em dúvida diagnóstica)', 'radiografia_torax (se suspeita de outra causa)', 'hemograma (apenas se suspeita de infecção bacteriana)', 'pcr', 'gasometria (apenas em casos graves, sem retardar o tratamento)', 'painel viral (não altera conduta, uso epidemiológico)'],
    criteriosDiagnosticos: [
      'Diagnóstico clínico: tosse ladrante, rouquidão e estridor inspiratório de início agudo em criança de 6 meses a 3 anos, precedidos por sintomas de via aérea superior.',
      'Nenhum exame é necessário na apresentação típica; a prioridade é a avaliação da gravidade e o tratamento.',
      'Evitar manipulação de orofaringe, exames desconfortáveis, punções e procedimentos que provoquem choro em criança com estridor em repouso, pelo risco de agravar a obstrução.',
      'Escore de Westley auxilia a graduar a gravidade, considerando estridor, tiragem, entrada de ar, cianose e nível de consciência.',
      'Radiografia cervical apenas em dúvida diagnóstica ou evolução atípica, e nunca antes de estabilizar a criança.',
      'Considerar epiglotite quando houver sialorreia, disfagia, toxemia, ausência de tosse ladrante e posição de tripé, especialmente em criança não vacinada para Haemophilus influenzae tipo b.',
      'Considerar traqueíte bacteriana quando houver febre alta, toxemia e ausência de resposta ao tratamento habitual.',
      'Considerar corpo estranho quando houver início súbito sem pródromo, história de engasgo ou sintomas unilaterais.'
    ],
    classificacaoGravidade: [
      { nivel: 'Leve', criterios: 'Tosse ladrante ocasional, sem estridor em repouso, sem tiragem ou com tiragem leve, criança ativa e com boa aceitação oral. Corticoide em dose única e orientação domiciliar.' },
      { nivel: 'Moderada', criterios: 'Estridor em repouso com tiragem visível, mas sem agitação importante, sem cianose e com boa entrada de ar. Corticoide e observação em unidade de saúde por 2 a 4 horas; adrenalina nebulizada conforme evolução.' },
      { nivel: 'Grave', criterios: 'Estridor em repouso proeminente ou bifásico, tiragem intensa, agitação ou sonolência, entrada de ar reduzida, palidez ou cianose. Adrenalina nebulizada imediata, corticoide, oxigênio e observação prolongada, com indicação de internação.' },
      { nivel: 'Insuficiência respiratória iminente', criterios: 'Redução do estridor com piora clínica, letargia, cianose, saturação baixa apesar de oxigênio, exaustão ou apneia. Emergência: manejo de via aérea por equipe experiente e transferência para UTI.' }
    ],
    tratamento: [
      'Manter a criança calma e no colo do cuidador: choro e agitação aumentam a turbulência do fluxo aéreo e agravam a obstrução. Adiar procedimentos não essenciais.',
      'Corticoide para todos os casos, inclusive os leves, pois reduz a gravidade, o tempo de permanência e o retorno ao serviço: dexametasona em dose única é a opção de escolha, por via oral quando possível, ou intramuscular se vômitos ou dificuldade de deglutição.',
      'Prednisolona por via oral é alternativa aceitável quando a dexametasona não estiver disponível, conforme protocolo do serviço.',
      'Adrenalina nebulizada nos casos moderados a graves com estridor em repouso: proporciona melhora rápida por vasoconstrição da mucosa, com efeito que dura cerca de 2 horas.',
      'Após adrenalina nebulizada, manter a criança em observação por pelo menos 2 a 4 horas pelo risco de retorno dos sintomas ao término do efeito; a alta só deve ocorrer se não houver estridor em repouso nesse período e se o corticoide tiver sido administrado.',
      'Oxigênio suplementar se saturação abaixo de 92% ou desconforto importante, ofertado da forma menos incômoda possível, preferencialmente por oxigênio em fluxo livre próximo à face.',
      'Umidificação ou vapor não demonstraram eficácia e não devem substituir o tratamento; manter apenas se confortarem a criança, sem risco de queimadura.',
      'Antibióticos não são indicados na laringotraqueíte viral; reservar para traqueíte bacteriana ou epiglotite, com internação e antibiótico parenteral conforme protocolo.',
      'Broncodilatadores não têm indicação, exceto se houver sibilância concomitante.',
      'Hidratação oral conforme aceitação; evitar procedimentos venosos desnecessários nos casos leves e moderados.',
      'Insuficiência respiratória iminente: acionar equipe com experiência em via aérea pediátrica, preparar material para intubação com tubo de diâmetro menor que o previsto para a idade e transferir para UTI.',
      'Reavaliar a necessidade de nova dose de adrenalina; a exigência de doses repetidas indica internação.'
    ],
    medicamentos: [
      { medId: 'dexametasona', esquema: 'Dose única de 0,15 a 0,6 mg/kg VO, IM ou IV (dose máxima habitualmente 10 a 16 mg); a dose de 0,6 mg/kg é a mais estudada e 0,15 mg/kg tem eficácia comparável nos casos leves. Confirmar apresentação e dose conforme protocolo do serviço e bula.' },
      { medId: 'prednisolona', esquema: 'Alternativa quando não houver dexametasona: 1 a 2 mg/kg/dia VO, conforme protocolo do serviço; pode exigir dose adicional no dia seguinte pela meia-vida mais curta.' },
      { medId: 'adrenalina', esquema: 'Nebulização nos casos moderados a graves com estridor em repouso: adrenalina (solução 1 mg/mL) 0,5 mL/kg por dose, máximo de 5 mL, diluída em soro fisiológico, com fluxo de oxigênio; pode ser repetida conforme resposta e protocolo do serviço, mantendo observação mínima de 2 a 4 horas após.' },
      { medId: 'soro_fisiologico', esquema: 'Diluente para a nebulização e hidratação venosa quando indicada, conforme protocolo do serviço.' },
      { medId: 'paracetamol', esquema: 'Febre e desconforto: 10 a 15 mg/kg/dose VO a cada 6 horas, conforme bula.' },
      { medId: 'dipirona', esquema: 'Alternativa antitérmica: 10 a 15 mg/kg/dose VO a cada 6 horas, conforme bula.' },
      { medId: 'ceftriaxona', esquema: 'Apenas em suspeita de traqueíte bacteriana ou epiglotite, associada a cobertura antiestafilocócica conforme protocolo do serviço: 50 a 100 mg/kg/dia IV.' }
    ],
    criteriosInternacao: [
      'Estridor em repouso persistente após corticoide e observação adequada.',
      'Necessidade de duas ou mais doses de adrenalina nebulizada.',
      'Saturação abaixo de 92% ou necessidade de oxigênio.',
      'Desidratação ou incapacidade de ingerir líquidos.',
      'Menor de 6 meses, prematuro, portador de anomalia de via aérea, estenose subglótica prévia, síndrome genética ou cardiopatia.',
      'Suspeita de traqueíte bacteriana, epiglotite ou outra causa de obstrução.',
      'Retorno ao serviço no mesmo episódio após alta.',
      'Impossibilidade de retorno rápido ao serviço em caso de piora noturna, especialmente em comunidades ribeirinhas e indígenas com transporte demorado.'
    ],
    criteriosUTI: [
      'Insuficiência respiratória iminente ou instalada, com necessidade de intubação ou de suporte ventilatório.',
      'Redução do estridor com piora do estado geral, letargia ou exaustão.',
      'Cianose ou hipoxemia refratária a oxigênio.',
      'Necessidade de adrenalina nebulizada em intervalos muito curtos ou de infusão contínua conforme protocolo.',
      'Traqueíte bacteriana ou epiglotite com comprometimento de via aérea.'
    ],
    criteriosAlta: [
      'Ausência de estridor em repouso por pelo menos 2 a 4 horas após a última dose de adrenalina nebulizada.',
      'Corticoide administrado e documentado.',
      'Saturação igual ou maior que 92% em ar ambiente e ausência de tiragem significativa.',
      'Aceitação oral adequada e criança ativa.',
      'Responsável orientado sobre a piora noturna esperada e sobre sinais de alarme.',
      'Acesso garantido ao serviço em caso de piora, considerando a distância e o meio de transporte.'
    ],
    orientacoes: [
      'A tosse de cachorro e a rouquidão costumam piorar à noite e durar de 3 a 7 dias, melhorando a cada dia.',
      'Manter a criança calma e no colo: quanto mais ela chora, mais difícil fica a respiração.',
      'Pode-se levar a criança para um ambiente arejado ou mais fresco, o que costuma aliviar; não usar vapor de água quente nem panela no fogo, pelo risco de queimadura.',
      'Não usar xaropes para tosse, antialérgicos, descongestionantes, remédios caseiros ou antibiótico por conta própria.',
      'Oferecer líquidos em pequenas quantidades e com frequência.',
      'Evitar fumaça de cigarro e de fogão a lenha dentro de casa e manter o ambiente ventilado.',
      'Dormir com a cabeceira um pouco elevada pode ajudar.',
      'Procurar atendimento imediatamente se a criança apresentar barulho na respiração mesmo parada ou dormindo, afundamento das costelas ou do pescoço, lábios ou pontas dos dedos roxos, muita agitação seguida de sonolência, baba constante com dificuldade para engolir, ou se ficar quieta demais e cansada.',
      'Se a família mora longe, considerar permanecer próximo ao serviço de saúde na primeira noite após o atendimento.'
    ],
    retorno: 'Reavaliação em 24 horas nos casos moderados liberados após observação, ou antes se houver piora; nos casos leves, orientação para retorno imediato diante de estridor em repouso ou esforço respiratório. Encaminhar à otorrinolaringologia se houver episódios recorrentes, estridor persistente entre os episódios ou suspeita de anomalia de via aérea.',
    prevencao: [
      'Não há vacina específica contra os vírus parainfluenza; a vacinação anual contra influenza reduz casos graves associados a esse vírus.',
      'Vacinação contra Haemophilus influenzae tipo b (pentavalente) é essencial para a prevenção da epiglotite.',
      'Higiene das mãos e etiqueta respiratória, com atenção em creches.',
      'Evitar exposição à fumaça de cigarro e de fogão a lenha, com melhoria da ventilação domiciliar.',
      'Afastamento de creche durante a fase aguda e febril.',
      'Capacitação das equipes de atenção primária e fluviais para reconhecimento precoce da obstrução e disponibilidade de dexametasona e adrenalina para nebulização.',
      'Orientação antecipada às famílias de crianças com episódios recorrentes sobre reconhecimento dos sinais e conduta inicial.'
    ],
    fontes: [
      { nome: 'Tratado de Pediatria – Sociedade Brasileira de Pediatria', ano: 2022 },
      { nome: 'Nelson Textbook of Pediatrics, 22ª edição', ano: 2024 },
      { nome: 'Alberta Clinical Practice Guideline for the Diagnosis and Management of Croup', ano: 2022 },
      { nome: 'Manual AIDPI Criança – Ministério da Saúde', ano: 2017 }
    ],
    atualizadoEm: '2026-09'
  },

  // =====================================================================
  // AGRAVOS AMAZÔNICOS
  // =====================================================================
  {
    id: 'hantavirose',
    nome: 'Hantavirose (síndrome cardiopulmonar por hantavírus)',
    categoria: 'amazonia',
    amazonia: true,
    cid10: 'B33.4',
    tags: ['febre', 'mialgia', 'cefaleia', 'tosse', 'dispneia', 'vomitos', 'dor_abdominal', 'diarreia', 'palidez', 'sudorese', 'alteracao_consciencia', 'calafrios', 'fraqueza', 'sangramento'],
    definicao: 'Doença viral aguda transmitida por roedores silvestres, que evolui de um pródromo febril inespecífico para insuficiência respiratória aguda por extravasamento capilar pulmonar, com choque e alta letalidade. A fase cardiopulmonar se instala de forma abrupta, em horas.',
    epidemiologia: 'No Brasil, a hantavirose está associada ao contato com roedores silvestres em áreas rurais, de expansão agrícola e de desmatamento. Na Amazônia, os casos concentram-se em áreas de fronteira agrícola, assentamentos, ramais, garimpos, acampamentos e sítios, com destaque para atividades de limpeza de paióis, tulhas, galpões e casas fechadas há muito tempo, manuseio de grãos armazenados (milho, arroz, castanha), colheita, roçado e acampamento em mata. O período de maior risco coincide com a colheita e o armazenamento de grãos, quando a população de roedores aumenta. A letalidade da síndrome cardiopulmonar no Brasil é elevada, situando-se em torno de 40%, e o desfecho depende criticamente do reconhecimento precoce e do suporte intensivo. Casos em crianças são menos frequentes, mas ocorrem em famílias que residem ou trabalham nessas áreas. A hantavirose é de notificação compulsória imediata.',
    agente: 'Hantavírus (família Hantaviridae). No Brasil circulam os genótipos Araraquara, Juquitiba, Castelo dos Sonhos, Anajatuba, Laguna Negra e outros, com reservatórios em roedores silvestres das subfamílias Sigmodontinae, como Necromys lasiurus, Oligoryzomys spp. e Calomys spp.',
    transmissao: 'Inalação de aerossóis formados a partir de excretas secas (urina, fezes e saliva) de roedores infectados, principalmente em ambientes fechados e pouco ventilados, como paióis, galpões, tulhas, casas desabitadas e depósitos de grãos. Também por contato de mucosas ou de pele lesada com excretas e, raramente, por mordedura de roedor. A transmissão interpessoal não é descrita para os genótipos brasileiros, embora tenha sido documentada para o vírus Andes na Argentina e no Chile.',
    incubacao: '1 a 5 semanas, com média de 2 a 3 semanas.',
    manifestacoes: [
      'Fase prodrômica (3 a 6 dias): febre alta, mialgia intensa (especialmente em coxas, região lombar e dorso), cefaleia, calafrios, astenia e mal-estar, quadro indistinguível de outras viroses febris.',
      'Sintomas gastrointestinais proeminentes: náuseas, vômitos, dor abdominal e diarreia, que podem levar ao diagnóstico equivocado de abdome agudo ou gastroenterite.',
      'Ausência habitual de coriza, obstrução nasal, dor de garganta e conjuntivite, o que ajuda a diferenciar de outras infecções respiratórias.',
      'Fase cardiopulmonar, de instalação súbita: tosse seca, taquipneia, dispneia rapidamente progressiva e hipoxemia, evoluindo em horas para edema pulmonar não cardiogênico.',
      'Hipotensão e choque com redução do débito cardíaco e aumento da resistência vascular sistêmica, padrão distinto do choque séptico clássico.',
      'Estertores pulmonares difusos, taquicardia e má perfusão periférica.',
      'Achados laboratoriais característicos e precoces: hemoconcentração com hematócrito elevado, plaquetopenia, leucocitose com desvio à esquerda e presença de linfócitos atípicos ou imunoblastos.',
      'Hipoalbuminemia, elevação de transaminases e de desidrogenase lática, e acidose metabólica com lactato elevado.',
      'Radiografia de tórax com infiltrado intersticial bilateral que evolui para infiltrado alveolar difuso, com área cardíaca normal.',
      'Fase diurética e de convalescença nos sobreviventes, com poliúria e recuperação em dias a semanas, podendo persistir astenia por meses.',
      'Em crianças, o quadro pode ser confundido inicialmente com dengue, gastroenterite, pneumonia atípica ou leptospirose.'
    ],
    sinaisAlarme: [
      'Qualquer dispneia, taquipneia ou tosse em criança com pródromo febril e história de exposição a roedores: é o marco da transição para a fase cardiopulmonar e exige transferência imediata.',
      'Saturação de oxigênio abaixo de 92% ou queda progressiva.',
      'Hematócrito em elevação com plaquetopenia (hemoconcentração por extravasamento capilar).',
      'Hipotensão, taquicardia, enchimento capilar lentificado, extremidades frias ou oligúria.',
      'Plaquetas abaixo de 150.000/mm3 ou em queda rápida.',
      'Lactato elevado ou acidose metabólica.',
      'Alteração de consciência, agitação ou sonolência.',
      'Infiltrado pulmonar bilateral na radiografia de tórax.',
      'História de limpeza de paiol, tulha, galpão, casa fechada, manuseio de grãos armazenados ou acampamento em mata nas últimas 5 semanas.'
    ],
    diagnosticoDiferencial: ['dengue', 'leptospirose', 'malaria', 'sepse', 'pneumonia', 'febre_amarela', 'influenza grave', 'oropouche', 'riquetsiose e febre maculosa', 'histoplasmose pulmonar aguda', 'síndrome do desconforto respiratório agudo de outras causas', 'miocardite viral'],
    exames: ['sorologia IgM e IgG para hantavírus (ELISA) em laboratório de referência', 'RT-PCR para hantavírus em sangue ou coágulo (fase precoce)', 'hemograma com pesquisa de linfócitos atípicos e contagem de plaquetas', 'radiografia_torax', 'gasometria', 'lactato', 'albumina', 'ast', 'alt', 'ureia', 'creatinina', 'eletrolitos', 'coagulograma', 'sorologia_dengue', 'gota espessa para malária', 'hemocultura', 'imuno-histoquímica em material de necropsia (casos fatais)'],
    criteriosDiagnosticos: [
      'Caso suspeito (MS): paciente com febre, mialgia, cefaleia e sintomas gastrointestinais, seguidos de dispneia sem causa determinada ou com infiltrado pulmonar bilateral, associado a história de exposição a roedores nas últimas 5 semanas.',
      'Também é suspeito o paciente com enfermidade febril aguda e sinais de insuficiência respiratória com infiltrado intersticial bilateral, com ou sem antecedente de exposição conhecida, em área com casos.',
      'A tétrade laboratorial de alta suspeição é: trombocitopenia, hemoconcentração, leucocitose com desvio à esquerda e presença de linfócitos atípicos ou imunoblastos.',
      'Confirmação laboratorial compatível: IgM reagente para hantavírus, soroconversão de IgG, RT-PCR detectável ou imuno-histoquímica positiva.',
      'Coletar amostra de sangue na suspeita e encaminhar ao laboratório de referência conforme fluxo da vigilância; não aguardar resultado para iniciar suporte e transferência.',
      'Investigar ativamente a exposição: limpeza de paiol, tulha ou galpão, abertura de casa fechada, manuseio ou transporte de grãos armazenados, roçado, colheita, garimpo, acampamento ou caça.',
      'Afastar malária com gota espessa ou teste rápido e investigar dengue e leptospirose em paralelo, pois o diagnóstico diferencial é obrigatório na região.',
      'Notificação compulsória imediata em até 24 horas e investigação do local provável de infecção pela vigilância ambiental.'
    ],
    classificacaoGravidade: [
      { nivel: 'Fase prodrômica (suspeita)', criterios: 'Febre, mialgia, cefaleia e sintomas gastrointestinais com história de exposição a roedores, sem sintomas respiratórios e com radiografia de tórax normal. Internação para observação com monitorização respiratória e hematológica seriada: a piora é súbita.' },
      { nivel: 'Fase cardiopulmonar inicial', criterios: 'Tosse, taquipneia, hipoxemia leve e infiltrado intersticial bilateral, com pressão arterial ainda mantida. Transferência imediata para serviço com UTI, oxigenoterapia e restrição hídrica cuidadosa.' },
      { nivel: 'Fase cardiopulmonar grave', criterios: 'Edema pulmonar não cardiogênico, hipoxemia refratária, choque com baixo débito, acidose e oligúria. UTI com ventilação mecânica protetora, suporte inotrópico e monitorização hemodinâmica; considerar suporte extracorpóreo em centro com disponibilidade.' }
    ],
    tratamento: [
      'Não existe antiviral com eficácia comprovada: o tratamento é de suporte, e o prognóstico depende do reconhecimento precoce e da transferência antes da instalação da insuficiência respiratória.',
      'Todo caso suspeito deve ser internado, mesmo na fase prodrômica, em serviço com condição de monitorização e com possibilidade de transferência rápida para UTI.',
      'Monitorização contínua de frequência respiratória, oximetria, pressão arterial, diurese e, seriadamente, de hematócrito e plaquetas: a elevação do hematócrito com queda de plaquetas antecede a fase cardiopulmonar.',
      'Oxigenoterapia precoce para manter saturação adequada; instalar acesso venoso e preparar a equipe para deterioração rápida.',
      'Manejo hídrico criterioso e restritivo: o extravasamento capilar pulmonar faz com que a infusão liberal de volume agrave o edema pulmonar. Expansão volêmica deve ser feita em alíquotas pequenas, com reavaliação frequente, e o suporte hemodinâmico deve priorizar o uso precoce de droga vasoativa e inotrópica em vez de grandes volumes, conforme protocolo do serviço.',
      'Choque por hantavirose tem componente de disfunção miocárdica com baixo débito: considerar inotrópico conforme avaliação e protocolo, com monitorização hemodinâmica quando disponível.',
      'Ventilação mecânica protetora com estratégia de síndrome do desconforto respiratório agudo quando indicada, conforme protocolo da UTI pediátrica.',
      'Suporte extracorpóreo (ECMO) tem sido descrito como resgate em casos refratários, disponível apenas em centros selecionados.',
      'Correção de distúrbios eletrolíticos, acidose e suporte transfusional conforme necessidade e protocolo.',
      'Antibioticoterapia empírica inicial é frequentemente mantida até que sepse bacteriana e leptospirose sejam razoavelmente afastadas, conforme avaliação clínica e protocolo do serviço.',
      'Evitar anti-inflamatórios não esteroidais e ácido acetilsalicílico pelo risco de sangramento e de lesão renal, enquanto dengue e outras causas hemorrágicas não estiverem afastadas.',
      'Notificação compulsória imediata, investigação do local provável de infecção e adoção de medidas de manejo ambiental de roedores no domicílio e na área de exposição.',
      'Orientar a família e a comunidade sobre a técnica segura de limpeza de ambientes fechados, pois a fonte de exposição frequentemente permanece ativa.'
    ],
    medicamentos: [
      { medId: 'soro_fisiologico', esquema: 'Expansão volêmica criteriosa em alíquotas pequenas, com reavaliação frequente do estado respiratório, pelo risco de agravar o edema pulmonar; volume total e velocidade conforme protocolo do serviço, confirmar conforme protocolo.' },
      { medId: 'ringer_lactato', esquema: 'Alternativa cristaloide para expansão volêmica criteriosa, conforme protocolo do serviço, confirmar conforme protocolo.' },
      { medId: 'adrenalina', esquema: 'Suporte hemodinâmico no choque com baixo débito, em infusão contínua, com dose titulada conforme resposta e protocolo da UTI pediátrica, confirmar conforme protocolo.' },
      { medId: null, nome: 'Noradrenalina e outros vasoativos ou inotrópicos (por exemplo, dobutamina)', esquema: 'Escolha do agente, dose e titulação definidas pelo protocolo de choque da UTI pediátrica, com preferência pelo uso precoce em relação à expansão volêmica liberal. Confirmar conforme protocolo e bula.' },
      { medId: 'ceftriaxona', esquema: 'Cobertura empírica enquanto leptospirose e sepse bacteriana não forem afastadas: 50 a 100 mg/kg/dia IV, conforme protocolo do serviço.' },
      { medId: 'paracetamol', esquema: 'Febre e dor: 10 a 15 mg/kg/dose VO a cada 6 horas, conforme bula; preferir em relação a anti-inflamatórios não esteroidais.' },
      { medId: 'dipirona', esquema: 'Alternativa antitérmica: 10 a 15 mg/kg/dose VO ou IV a cada 6 horas, conforme bula.' }
    ],
    criteriosInternacao: [
      'Todo caso suspeito de hantavirose deve ser internado, ainda que na fase prodrômica e com bom estado geral.',
      'Febre com mialgia intensa e sintomas gastrointestinais em pessoa com exposição a roedores nas últimas 5 semanas.',
      'Plaquetopenia, hemoconcentração ou presença de linfócitos atípicos no hemograma.',
      'Qualquer sintoma respiratório.',
      'Alteração radiológica pulmonar.',
      'Impossibilidade de monitorização e de transferência rápida em caso de deterioração, situação comum em áreas rurais e de ramal.'
    ],
    criteriosUTI: [
      'Qualquer sinal de insuficiência respiratória, hipoxemia ou infiltrado pulmonar bilateral.',
      'Hipotensão, choque ou necessidade de droga vasoativa.',
      'Necessidade de ventilação mecânica ou não invasiva.',
      'Acidose metabólica com lactato elevado ou oligúria.',
      'Plaquetopenia acentuada com hemoconcentração progressiva.',
      'Alteração de consciência.',
      'Todo caso na fase cardiopulmonar, mesmo inicial, deve ser conduzido em UTI ou transferido com urgência para serviço que disponha dela.'
    ],
    criteriosAlta: [
      'Resolução da insuficiência respiratória, com saturação adequada em ar ambiente e sem necessidade de suporte.',
      'Estabilidade hemodinâmica sem drogas vasoativas por período adequado.',
      'Hematócrito, plaquetas e função renal em normalização.',
      'Radiografia de tórax em melhora.',
      'Aceitação oral adequada e diurese normal.',
      'Notificação realizada e investigação do local provável de infecção em andamento.',
      'Família orientada sobre manejo ambiental de roedores e sobre a técnica segura de limpeza, com visita da vigilância programada quando possível.',
      'Retorno ambulatorial agendado para acompanhamento da astenia e da função pulmonar.'
    ],
    orientacoes: [
      'Antes de entrar em paiol, tulha, galpão, depósito ou casa que ficou fechada, abrir portas e janelas e deixar arejar por pelo menos 30 minutos antes de entrar.',
      'Nunca varrer a seco nem usar vassoura ou ar comprimido em locais com sinais de rato: molhar todo o chão, as bancadas e os cantos com água e água sanitária diluída antes de limpar, e recolher com pano úmido.',
      'Usar luvas de borracha e, quando possível, máscara ao limpar esses locais; lavar as mãos com água e sabão em seguida.',
      'Recolher os roedores mortos com pá ou saco plástico, sem tocar com as mãos, e enterrar a pelo menos 50 cm de profundidade ou queimar conforme orientação da vigilância.',
      'Armazenar grãos, castanha, milho e arroz em recipientes fechados e elevados do chão, longe das paredes; manter alimentos e ração de animais fechados.',
      'Manter o terreno limpo, capinado e sem entulho, lenha e materiais encostados na casa; vedar buracos e frestas em paredes, telhados e assoalhos.',
      'Não dormir diretamente no chão em acampamentos, roçados ou ramais; acampar em áreas limpas e afastadas de tocas e depósitos de grãos.',
      'Informar sempre à equipe de saúde se a criança ou a família esteve em contato com roedores, paióis, grãos armazenados, casas fechadas, garimpo ou acampamento nas últimas semanas.',
      'Procurar atendimento imediatamente e informar essa exposição se surgir febre com dor no corpo, e voltar com urgência se aparecer qualquer falta de ar, tosse ou cansaço, ainda que leve: a piora é muito rápida.'
    ],
    retorno: 'Caso suspeito não se acompanha em casa: a conduta é internação e monitorização. Após a alta, reavaliação em 7 a 15 dias e acompanhamento ambulatorial por alguns meses, pois astenia, redução da tolerância ao esforço e alterações da função pulmonar podem persistir. A vigilância epidemiológica deve realizar investigação do local provável de infecção e busca ativa de outros casos na comunidade.',
    prevencao: [
      'Não há vacina disponível.',
      'Manejo ambiental de roedores: eliminação de fontes de alimento e abrigo, armazenamento correto de grãos em recipientes fechados e elevados, destino adequado do lixo e limpeza do terreno.',
      'Técnica segura de limpeza de ambientes fechados: arejar por 30 minutos antes de entrar, umedecer as superfícies com solução de água sanitária antes de limpar, nunca varrer a seco, usar luvas e máscara.',
      'Vedação de frestas e buracos em paredes, telhados, assoalhos e depósitos, mantendo lenha e materiais afastados das casas.',
      'Orientação a trabalhadores rurais, garimpeiros, extrativistas e acampantes sobre o risco em paióis, tulhas e casas desabitadas.',
      'Não dormir no chão em áreas de mata e evitar acampar próximo a depósitos de grãos e tocas de roedores.',
      'Notificação compulsória imediata e investigação do local provável de infecção com adoção de medidas de controle pela vigilância ambiental.',
      'Educação em saúde nas comunidades rurais e de ramal durante o período de colheita e armazenamento de grãos.'
    ],
    fontes: [
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
      { nome: 'Manual de Vigilância, Prevenção e Controle das Hantaviroses – Ministério da Saúde', ano: 2013 },
      { nome: 'OPAS/OMS – Hantavirus: epidemiologia e manejo clínico nas Américas', ano: 2021 },
      { nome: 'Nelson Textbook of Pediatrics, 22ª edição', ano: 2024 }
    ],
    atualizadoEm: '2026-09'
  }
,

  {
    id: 'acidente_arraia',
    nome: 'Acidente por arraia de água doce',
    categoria: 'amazonia',
    amazonia: true,
    cid10: 'T63.5',
    tags: ['dor_local', 'feridas', 'lesoes_pele', 'edema', 'febre', 'vomitos', 'sudorese', 'palidez', 'fraqueza', 'mialgia'],
    definicao: 'Acidente traumático e por envenenamento causado pelo ferrão caudal de arraias de água doce, que provoca dor local desproporcional e imediata, ferida perfurocortante contaminada e necrose tecidual de evolução lenta, com risco elevado de infecção secundária e de úlcera crônica.',
    epidemiologia: 'É um dos acidentes por animais aquáticos mais frequentes na Amazônia. As arraias de água doce do gênero Potamotrygon habitam rios, igarapés, lagos e praias de areia, permanecendo semienterradas no fundo, o que faz com que o acidente ocorra quando a pessoa pisa sobre o animal. Os casos concentram-se no período da vazante e da seca, quando o volume de água diminui, as praias afloram e as arraias ficam concentradas em áreas rasas onde crianças tomam banho, brincam e ajudam na pesca. Crianças e adolescentes de comunidades ribeirinhas são particularmente acometidos, quase sempre em pés, tornozelos e pernas. O acidente não é fatal na maioria dos casos, mas causa dor intensa, afastamento escolar prolongado, úlceras que demoram semanas a meses para cicatrizar e, com frequência, infecção secundária. Acidentes por animais peçonhentos são de notificação compulsória.',
    agente: 'Arraias de água doce da família Potamotrygonidae, especialmente do gênero Potamotrygon. O ferrão, localizado na base da cauda, é retrosserrilhado e recoberto por tecido tegumentar produtor de veneno com ação proteolítica, vasoconstritora e necrosante.',
    transmissao: 'Não é doença transmissível: trata-se de acidente por trauma e inoculação de veneno quando a pessoa pisa ou encosta na arraia semienterrada no fundo arenoso ou lodoso. O movimento defensivo da cauda crava o ferrão e, ao ser retirado, as serrilhas rasgam o tecido, podendo deixar fragmentos do ferrão e do tegumento na ferida.',
    incubacao: 'Não se aplica. A dor é imediata e atinge intensidade máxima em 30 a 90 minutos; a necrose local se manifesta ao longo de dias e a úlcera pode evoluir por semanas.',
    manifestacoes: [
      'Dor local imediata, intensa e desproporcional ao tamanho da ferida, em queimação ou latejante, com irradiação para todo o membro e pico entre 30 e 90 minutos.',
      'Ferida perfurocortante ou lacerante, frequentemente em pé, tornozelo ou perna, com bordas irregulares e sangramento variável.',
      'Edema local rapidamente progressivo, eritema, calor e palidez ao redor da lesão.',
      'Possível presença de fragmentos do ferrão, de serrilhas ou de tecido tegumentar retidos na ferida.',
      'Manifestações sistêmicas por reflexo doloroso intenso: náuseas, vômitos, sudorese fria, palidez, tontura, cefaleia, taquicardia, hipotensão e, em crianças, síncope.',
      'Evolução para necrose da pele e do tecido subcutâneo ao redor do ponto de entrada, em 2 a 7 dias, com formação de escara e posterior ulceração.',
      'Úlcera de bordas irregulares e fundo sujo, de cicatrização lenta, podendo levar semanas a meses.',
      'Infecção secundária frequente, com celulite, abscesso, linfangite, adenomegalia regional e febre.',
      'Complicações menos comuns: osteomielite, tenossinovite, artrite séptica e, em ferimentos de tronco ou abdome, lesão de órgãos internos.',
      'Tétano é risco real em comunidades com cobertura vacinal incompleta.'
    ],
    sinaisAlarme: [
      'Ferimento em tórax, abdome, pescoço ou face, com risco de lesão de órgão interno ou de grande vaso.',
      'Sangramento abundante ou pulsátil.',
      'Dor que não cede após as medidas iniciais e a analgesia adequada.',
      'Febre, eritema em expansão, secreção purulenta, linfangite ou adenomegalia dolorosa (infecção secundária).',
      'Perda de sensibilidade, perda de força, palidez distal ou ausência de pulso no membro (comprometimento vascular ou neurológico, síndrome compartimental).',
      'Área de necrose extensa ou de rápida progressão.',
      'Hipotensão, síncope, alteração de consciência ou sinais de choque.',
      'Vacinação antitetânica desatualizada ou desconhecida.',
      'Presença de corpo estranho visível ou suspeita de fragmento retido.'
    ],
    diagnosticoDiferencial: ['ferimento_peixe', 'acidente por peixe-elétrico ou por candiru', 'ferimento perfurante por objeto submerso (galho, vidro, prego)', 'acidente_ofidico', 'escorpionismo', 'celulite e erisipela', 'abscesso de partes moles', 'reação alérgica local', 'picada de inseto infectada', 'úlcera de leishmaniose_tegumentar em fase tardia'],
    exames: ['exame físico detalhado da ferida com pesquisa de corpo estranho', 'radiografia do local (pesquisa de fragmento de ferrão retido e de acometimento ósseo)', 'hemograma', 'pcr', 'cultura de secreção da ferida (se infecção)', 'hemocultura (se febre ou toxemia)', 'ultrassonografia de partes moles (suspeita de coleção ou corpo estranho)', 'cpk', 'creatinina', 'glicemia'],
    criteriosDiagnosticos: [
      'Diagnóstico clínico e epidemiológico: história de pisar em arraia ou de contato com o fundo do rio, igarapé ou praia, com dor imediata e intensa e ferida perfurocortante em membro inferior.',
      'A desproporção entre a intensidade da dor e o tamanho aparente da ferida é característica e deve orientar a suspeita mesmo quando o animal não foi visto.',
      'Inspecionar cuidadosamente a ferida sob boa iluminação e analgesia adequada, pesquisando fragmentos do ferrão e do tegumento.',
      'Radiografia do local é útil para identificar fragmentos radiopacos retidos e deve ser considerada em ferimentos profundos ou de evolução arrastada.',
      'Avaliar a situação vacinal antitetânica em todo acidente.',
      'Reavaliar entre 48 e 72 horas para identificar necrose e infecção secundária, que são a regra e não a exceção.',
      'Notificar o acidente conforme a ficha de acidentes por animais peçonhentos do Sistema de Informação de Agravos de Notificação.'
    ],
    classificacaoGravidade: [
      { nivel: 'Leve', criterios: 'Ferimento pequeno em extremidade, dor controlada com as medidas iniciais, sem sinais de infecção, sem corpo estranho e com boa perfusão. Atendimento ambulatorial com limpeza, imersão em água morna, analgesia, profilaxia antitetânica e reavaliação programada.' },
      { nivel: 'Moderado', criterios: 'Dor intensa e persistente, edema importante, ferida profunda ou extensa, suspeita de fragmento retido, ou sinais iniciais de infecção secundária. Observação em unidade, analgesia otimizada, exploração da ferida e antibioticoterapia.' },
      { nivel: 'Grave', criterios: 'Ferimento em tronco, abdome, pescoço ou face; sangramento importante; necrose extensa; celulite grave, abscesso, osteomielite ou sinais sistêmicos de infecção; comprometimento vascular ou neurológico. Internação, antibiótico parenteral e avaliação cirúrgica.' }
    ],
    tratamento: [
      'Primeiro atendimento: imersão da região atingida em água morna, na maior temperatura tolerável pela pele sem causar queimadura, em torno de 50 graus, por 30 a 90 minutos ou até o alívio da dor. O calor inativa componentes termolábeis do veneno e é a medida mais eficaz para a dor.',
      'Testar sempre a temperatura da água com a mão ou o cotovelo de um adulto antes de imergir a criança e manter supervisão contínua, pelo risco real de queimadura, especialmente em crianças pequenas e em áreas com sensibilidade alterada. Acrescentar água quente aos poucos para manter a temperatura durante a imersão.',
      'Não usar torniquete, garrote ou faixa compressiva; não fazer cortes, sucção, cauterização, aplicação de gelo, urina, fumo, borra de café, ervas, querosene ou qualquer substância caseira sobre a ferida.',
      'Analgesia sistêmica precoce e em dose adequada: a dor é o principal problema inicial. Considerar bloqueio anestésico local ou regional com anestésico sem vasoconstritor, conforme avaliação e protocolo do serviço, quando a dor não ceder.',
      'Limpeza abundante da ferida com água corrente limpa e soro fisiológico, seguida de antissepsia, com exploração cuidadosa e remoção de fragmentos do ferrão e de tecido tegumentar sob analgesia adequada.',
      'Desbridamento do tecido desvitalizado conforme avaliação cirúrgica; a ferida não deve ser suturada de forma primária e hermética, pelo alto risco de infecção, devendo ser deixada aberta para cicatrização por segunda intenção ou com fechamento tardio, conforme protocolo.',
      'Profilaxia antitetânica conforme a situação vacinal e a característica do ferimento, seguindo o Calendário Nacional de Vacinação e as orientações do Ministério da Saúde, incluindo imunoglobulina antitetânica quando indicada.',
      'Antibioticoterapia não é obrigatória em todos os casos, mas é indicada em ferimentos profundos, extensos, com retardo no atendimento, com corpo estranho, em imunossuprimidos, diabéticos ou quando já houver sinais de infecção. A cobertura deve contemplar bactérias de ambiente aquático, em especial Aeromonas hydrophila, além de estafilococos e estreptococos.',
      'Curativos diários com soro fisiológico e cobertura conforme a fase da ferida, com reavaliações frequentes; orientar elevação do membro e repouso relativo.',
      'Não existe soro antiveneno específico para acidentes por arraia.',
      'Acompanhamento prolongado da úlcera, que pode levar semanas a meses para cicatrizar, com atenção à dor, à funcionalidade e ao retorno às atividades escolares.',
      'Notificação do acidente no sistema de vigilância de animais peçonhentos e orientação preventiva à família e à comunidade.'
    ],
    medicamentos: [
      { medId: 'dipirona', esquema: 'Analgesia: 10 a 15 mg/kg/dose VO ou IV a cada 6 horas, conforme bula.' },
      { medId: 'paracetamol', esquema: 'Analgesia: 10 a 15 mg/kg/dose VO a cada 6 horas, conforme bula.' },
      { medId: 'ibuprofeno', esquema: 'Analgesia e controle do edema: 5 a 10 mg/kg/dose VO a cada 6 a 8 horas, conforme bula.' },
      { medId: null, nome: 'Analgésico opioide (por exemplo, morfina)', esquema: 'Dor intensa não controlada pelos analgésicos habituais: indicação, dose e monitorização conforme protocolo do serviço e bula, confirmar conforme protocolo.' },
      { medId: null, nome: 'Anestésico local sem vasoconstritor (por exemplo, lidocaína)', esquema: 'Infiltração local ou bloqueio regional para controle da dor e para exploração da ferida, conforme protocolo do serviço e bula, confirmar conforme protocolo.' },
      { medId: 'sulfametoxazol_trimetoprim', esquema: 'Cobertura para Aeromonas em ferimento de ambiente aquático: 40 mg/kg/dia de sulfametoxazol e 8 mg/kg/dia de trimetoprima VO dividida 12/12 h, conforme protocolo do serviço. Contraindicado em menores de 2 meses.' },
      { medId: 'ciprofloxacino', nome: 'Ciprofloxacino', esquema: 'Alternativa com boa cobertura para Aeromonas em adolescentes ou conforme avaliação individual: dose e duração conforme protocolo do serviço e bula, confirmar conforme protocolo.' },
      { medId: 'amoxicilina_clavulanato', esquema: 'Cobertura para flora cutânea e anaeróbios, habitualmente associada a cobertura para Aeromonas: 45 a 50 mg/kg/dia do componente amoxicilina VO dividida 12/12 h, conforme protocolo do serviço.' },
      { medId: 'ceftriaxona', esquema: 'Infecção grave com internação: 50 a 100 mg/kg/dia IV, associada conforme necessidade a cobertura antiestafilocócica e para Aeromonas, segundo protocolo do serviço.' },
      { medId: 'soro_fisiologico', esquema: 'Lavagem abundante da ferida e curativos diários com SF 0,9%.' },
      { medId: null, nome: 'Vacina antitetânica (dT ou dTpa) e imunoglobulina antitetânica', esquema: 'Profilaxia conforme a situação vacinal e o tipo de ferimento, segundo as orientações do Ministério da Saúde e do CRIE.' }
    ],
    criteriosInternacao: [
      'Ferimento em tronco, abdome, tórax, pescoço ou face.',
      'Dor intensa não controlada com analgesia oral.',
      'Infecção secundária com celulite extensa, abscesso, linfangite ou febre.',
      'Necrose extensa ou de progressão rápida, com necessidade de desbridamento cirúrgico.',
      'Suspeita de fragmento retido que exija exploração cirúrgica.',
      'Sinais de comprometimento vascular, neurológico ou de síndrome compartimental.',
      'Suspeita de osteomielite, artrite séptica ou tenossinovite.',
      'Criança imunossuprimida, desnutrida ou com comorbidade relevante.',
      'Impossibilidade de curativos diários e de reavaliação frequente, situação comum em comunidades ribeirinhas distantes.'
    ],
    criteriosUTI: [
      'Choque séptico ou sepse grave secundária à infecção da ferida.',
      'Fasciíte necrosante ou infecção invasiva de partes moles com instabilidade hemodinâmica.',
      'Lesão de órgão interno por ferimento de tronco ou abdome.',
      'Hemorragia significativa com repercussão hemodinâmica.',
      'Insuficiência respiratória ou renal associadas.'
    ],
    criteriosAlta: [
      'Dor controlada com analgesia por via oral.',
      'Ferida limpa, sem sinais de infecção ativa em progressão e com plano de curativo definido.',
      'Profilaxia antitetânica realizada e registrada.',
      'Antibiótico, quando indicado, em curso e compreendido pelo responsável.',
      'Perfusão, sensibilidade e mobilidade preservadas no membro acometido.',
      'Responsável orientado sobre curativos, elevação do membro, sinais de infecção e necessidade de reavaliações.',
      'Retorno agendado e, quando possível, articulação com a equipe de saúde da família ou unidade fluvial para os curativos.',
      'Acidente notificado.'
    ],
    orientacoes: [
      'Logo após o acidente, colocar o pé ou a perna dentro de uma bacia com água morna, o mais quente que a pele suportar sem queimar, por 30 a 90 minutos ou até a dor aliviar. Um adulto deve sempre testar a água antes com a própria mão e ficar do lado o tempo todo.',
      'Ir acrescentando água quente aos poucos para manter a temperatura, com cuidado para não queimar a criança.',
      'Não amarrar garrote, corda, pano ou faixa apertada no membro, não cortar a ferida, não chupar, não queimar e não colocar urina, fumo, borra de café, pó de café, querosene, folhas, ervas ou qualquer remédio caseiro.',
      'Procurar a unidade de saúde mesmo que a ferida pareça pequena: a dor é muito forte e a ferida costuma infeccionar e demorar a fechar.',
      'Levar o cartão de vacina para a equipe avaliar a vacina contra tétano.',
      'Fazer o curativo todos os dias como orientado e manter a perna elevada quando estiver sentado ou deitado.',
      'A ferida pode escurecer e virar uma casca preta nos primeiros dias e depois abrir numa ferida que demora semanas a meses para fechar; isso faz parte da evolução e exige acompanhamento.',
      'Voltar imediatamente se houver febre, vermelhidão que aumenta ao redor da ferida, pus, cheiro ruim, listras vermelhas subindo pela perna, íngua dolorida, dor que piora, ou se o pé ficar dormente, pálido ou frio.',
      'Para prevenir: ao entrar no rio, igarapé ou praia, arrastar os pés pelo fundo em vez de pisar firme, o que espanta a arraia; usar calçado fechado ou sandália na praia e ao pescar; evitar áreas rasas de fundo arenoso na vazante, quando as arraias ficam concentradas.'
    ],
    retorno: 'Reavaliação em 24 a 48 horas e depois a cada 2 a 3 dias nas primeiras duas semanas, período em que a necrose e a infecção secundária costumam se manifestar; acompanhamento semanal até a cicatrização completa da úlcera, com articulação com a unidade de saúde mais próxima ou equipe fluvial. Retorno imediato diante de febre, piora da dor ou sinais de infecção.',
    prevencao: [
      'Arrastar os pés pelo fundo ao caminhar dentro do rio, igarapé ou lago, em vez de pisar firme, para espantar as arraias enterradas na areia.',
      'Usar calçado fechado, bota de borracha ou sandália resistente ao entrar na água, especialmente em praias e áreas rasas.',
      'Evitar banho e pesca em áreas rasas de fundo arenoso ou lodoso durante a vazante e a seca, quando as arraias se concentram.',
      'Supervisão de adultos durante o banho de crianças em praias de rio e igarapés.',
      'Orientar crianças e adolescentes que ajudam na pesca sobre o manuseio seguro de redes, malhadeiras e do pescado.',
      'Manter o calendário vacinal antitetânico atualizado em toda a família, medida essencial em comunidades ribeirinhas.',
      'Capacitar as equipes de saúde locais e as unidades fluviais para o primeiro atendimento com imersão em água morna e para o reconhecimento de infecção secundária.',
      'Notificação dos acidentes para dimensionar o problema e orientar ações locais de prevenção.'
    ],
    fontes: [
      { nome: 'Manual de Diagnóstico e Tratamento de Acidentes por Animais Peçonhentos – Ministério da Saúde', ano: 2001 },
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
      { nome: 'Fundação de Medicina Tropical Doutor Heitor Vieira Dourado – protocolos de animais aquáticos da Amazônia', ano: 2022 },
      { nome: 'Tratado de Pediatria – Sociedade Brasileira de Pediatria', ano: 2022 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'ferimento_peixe',
    nome: 'Ferimento por peixe e infecção de ferida em ambiente aquático',
    categoria: 'amazonia',
    amazonia: true,
    cid10: 'T63.5',
    tags: ['feridas', 'dor_local', 'lesoes_pele', 'edema', 'febre', 'linfonodomegalia', 'fraqueza', 'prurido'],
    definicao: 'Ferimento perfurante, cortante ou por mordedura causado por peixes, espinhos, ferrões, nadadeiras, escamas, dentes, anzóis ou instrumentos de pesca, com risco particular de infecção por bactérias de ambiente aquático, como Aeromonas hydrophila e Mycobacterium marinum, além de tétano.',
    epidemiologia: 'É um agravo cotidiano em comunidades ribeirinhas, indígenas e de pescadores da Amazônia, onde crianças e adolescentes participam da pesca, do transporte e da limpeza do pescado desde cedo. Os ferimentos mais comuns ocorrem em mãos e dedos durante a manipulação do peixe e das redes, e em pés e pernas ao caminhar na água e nas praias. Peixes com espinhos e ferrões, como bagres, mandis, jaús, piranhas com dentes cortantes e traíras, além de anzóis e facas de limpeza, são as causas mais frequentes. A água de rio e igarapé é rica em Aeromonas hydrophila, que causa infecções de partes moles de evolução rápida, e em micobactérias de crescimento lento, em especial Mycobacterium marinum, responsável por nódulos e úlceras de evolução arrastada que muitas vezes são tratados por meses como piodermite comum. A cobertura vacinal antitetânica incompleta em comunidades distantes torna o tétano um risco concreto.',
    agente: 'Trauma mecânico por espinhos, ferrões, nadadeiras, dentes, escamas ou anzóis, com ou sem veneno associado (bagres e mandis possuem glândulas de veneno na base dos espinhos peitorais e dorsais). Agentes infecciosos relevantes: Aeromonas hydrophila e outras Aeromonas, Vibrio spp., Mycobacterium marinum e outras micobactérias de crescimento rápido, Staphylococcus aureus, Streptococcus pyogenes, Pseudomonas e Clostridium tetani.',
    transmissao: 'Não é doença transmissível entre pessoas. A contaminação ocorre no momento do trauma, pela introdução de água, muco do peixe, escamas e matéria orgânica na ferida, ou posteriormente, pelo contato continuado da ferida aberta com a água do rio, com o pescado e com redes e instrumentos de pesca.',
    incubacao: 'Infecção por Aeromonas: instalação rápida, em 8 a 48 horas. Infecção por Mycobacterium marinum: período longo, de 2 a 6 semanas ou mais. Tétano: 3 a 21 dias.',
    manifestacoes: [
      'Ferimento perfurante, cortante ou lacerante, mais comum em mãos, dedos, pés e pernas, com dor local imediata.',
      'Dor intensa e desproporcional quando há veneno associado, como nos espinhos de bagres e mandis, com edema e eritema locais.',
      'Presença frequente de corpo estranho retido: fragmento de espinho, escama, dente ou anzol, que pode não ser visível na inspeção inicial.',
      'Infecção precoce por Aeromonas: em 8 a 48 horas surgem eritema em expansão, edema importante, dor intensa, secreção serosa ou purulenta, bolhas, linfangite e febre, com evolução potencialmente rápida para celulite grave, abscesso e, raramente, fasciíte necrosante.',
      'Infecção por Mycobacterium marinum (granuloma de piscina ou de aquário): nódulo eritemato-violáceo indolor ou pouco doloroso que surge semanas após o ferimento, geralmente em dorso de mão ou dedo, podendo ulcerar e formar cadeia de nódulos ao longo do trajeto linfático, em padrão esporotricoide.',
      'Adenomegalia regional e linfangite.',
      'Evolução para tenossinovite, artrite séptica ou osteomielite em ferimentos profundos de mãos e dedos, especialmente por anzol ou espinho retido.',
      'Feridas crônicas e de cicatrização lenta, mantidas pelo contato continuado com a água do rio durante as atividades diárias.',
      'Tétano: trismo, rigidez de nuca, disfagia, espasmos musculares e riso sardônico, em pessoa com ferimento contaminado e vacinação incompleta.'
    ],
    sinaisAlarme: [
      'Eritema em rápida expansão, dor desproporcional, bolhas, áreas escurecidas ou crepitação (suspeita de infecção necrosante).',
      'Febre, calafrios, prostração ou toxemia.',
      'Linfangite ascendente e adenomegalia dolorosa.',
      'Secreção purulenta abundante, flutuação ou abscesso.',
      'Dor à mobilização de um dedo com edema fusiforme e postura em semiflexão (tenossinovite, urgência cirúrgica de mão).',
      'Limitação de movimento de articulação ou dor óssea persistente (artrite séptica ou osteomielite).',
      'Corpo estranho retido, anzol farpado incrustado ou ferimento profundo em mão.',
      'Trismo, rigidez, espasmos musculares ou disfagia (suspeita de tétano).',
      'Vacinação antitetânica desatualizada ou desconhecida.',
      'Ferida que não cicatriza após semanas ou nódulos em cadeia ao longo do braço (suspeita de Mycobacterium marinum).'
    ],
    diagnosticoDiferencial: ['acidente_arraia', 'escabiose_impetigo', 'celulite e erisipela de outras causas', 'leishmaniose_tegumentar', 'esporotricose', 'paracoccidioidomicose cutânea', 'micobacteriose atípica', 'hanseniase', 'larva_migrans_cutanea', 'miiase secundária em ferida', 'corpo estranho retido sem infecção', 'tuberculose cutânea'],
    exames: ['exame físico detalhado com pesquisa de corpo estranho', 'radiografia do local (fragmento de espinho, anzol, acometimento ósseo)', 'ultrassonografia de partes moles (coleção ou corpo estranho radiotransparente)', 'cultura de secreção da ferida com antibiograma', 'hemograma', 'pcr', 'vhs', 'hemocultura (se febre ou toxemia)', 'baciloscopia e cultura para micobactérias em fragmento de lesão (suspeita de Mycobacterium marinum)', 'biópsia de pele com histopatologia e cultura específica', 'glicemia'],
    criteriosDiagnosticos: [
      'Diagnóstico clínico e epidemiológico: ferimento ocorrido durante pesca, limpeza de pescado, banho de rio, manuseio de rede ou contato com água de rio e igarapé.',
      'Investigar sempre o mecanismo exato: espinho, ferrão, dente, escama, anzol, faca de limpeza, e o tempo decorrido até o atendimento.',
      'Pesquisar corpo estranho retido por inspeção sob boa iluminação e analgesia e, quando o ferimento for profundo ou a evolução arrastada, por radiografia ou ultrassonografia.',
      'Coletar cultura de secreção com antibiograma em toda ferida infectada, orientando a antibioticoterapia definitiva, já que Aeromonas apresenta resistência a penicilinas e a cefalosporinas de primeira geração.',
      'Considerar Mycobacterium marinum em ferida ou nódulo que não melhora após semanas de antibiótico convencional, especialmente em dorso de mão ou dedo, com nódulos em trajeto linfático; solicitar biópsia com cultura específica e informar ao laboratório a suspeita, pois exige meio e temperatura de incubação apropriados.',
      'Avaliar a situação vacinal antitetânica em todo ferimento.',
      'Avaliar função de tendões, sensibilidade e mobilidade em ferimentos de mão e dedos, encaminhando precocemente à cirurgia quando houver suspeita de tenossinovite.',
      'Considerar imunossupressão, diabetes, desnutrição e hepatopatia como fatores de risco para infecção grave por Aeromonas e Vibrio.'
    ],
    classificacaoGravidade: [
      { nivel: 'Leve', criterios: 'Ferimento superficial, limpo, sem corpo estranho, sem sinais de infecção e com atendimento precoce. Limpeza, curativo, profilaxia antitetânica e orientação, com reavaliação em 48 horas.' },
      { nivel: 'Moderado', criterios: 'Ferimento profundo, sujo ou com atendimento tardio, dor importante, suspeita de corpo estranho, ou infecção localizada com celulite sem repercussão sistêmica. Antibioticoterapia oral com cobertura para Aeromonas, exploração da ferida e reavaliação frequente.' },
      { nivel: 'Grave', criterios: 'Celulite extensa, abscesso, linfangite ascendente, tenossinovite, artrite séptica, osteomielite, febre, toxemia, suspeita de infecção necrosante ou de tétano. Internação, antibiótico parenteral e avaliação cirúrgica de urgência.' },
      { nivel: 'Crônico', criterios: 'Nódulos ou úlcera de evolução arrastada por semanas a meses, com suspeita de Mycobacterium marinum ou de outra causa granulomatosa. Biópsia, cultura específica e tratamento prolongado orientado por infectologia ou dermatologia.' }
    ],
    tratamento: [
      'Lavagem imediata e abundante da ferida com água limpa e corrente e com soro fisiológico, seguida de antissepsia.',
      'Exploração da ferida sob analgesia adequada, com remoção de fragmentos de espinho, escamas, muco e matéria orgânica; não suturar de forma primária e hermética ferimentos contaminados, profundos, por mordedura ou com atendimento tardio.',
      'Ferimento por espinho de bagre ou mandi com dor intensa: imersão da área em água morna, na maior temperatura tolerável sem queimar, em torno de 50 graus, por 30 a 90 minutos, com supervisão de um adulto e teste prévio da temperatura, medida que alivia a dor por inativação de componentes termolábeis do veneno.',
      'Não usar torniquete, cortes, sucção, cauterização, gelo direto sobre a pele, urina, fumo, borra de café, querosene ou preparações caseiras.',
      'Anzol incrustado: retirada apenas por profissional, sob anestesia local, com a técnica adequada ao tipo de anzol; não puxar no sentido inverso quando houver farpa. Ferimentos em face, olhos, pescoço ou próximos a vasos e tendões exigem avaliação especializada.',
      'Profilaxia antitetânica conforme a situação vacinal e o tipo de ferimento, seguindo as orientações do Ministério da Saúde, incluindo imunoglobulina antitetânica quando indicada. Ferimentos de pesca são frequentemente classificados como de alto risco para tétano.',
      'Antibioticoprofilaxia ou tratamento indicados em ferimentos profundos, por mordedura, em mãos e pés, com corpo estranho, com atendimento tardio, extensos, ou em crianças imunossuprimidas, desnutridas ou com hepatopatia. O esquema deve cobrir Aeromonas, além de estafilococos e estreptococos, o que habitualmente exige associação ou escolha específica.',
      'Sulfametoxazol com trimetoprima ou ciprofloxacino são opções com boa atividade contra Aeromonas; amoxicilina com clavulanato e cefalexina isoladas não cobrem Aeromonas de forma confiável e não devem ser usadas sozinhas nesse contexto.',
      'Infecção grave com internação: antibiótico parenteral de amplo espectro cobrindo Aeromonas e cocos Gram-positivos, conforme protocolo do serviço e antibiograma.',
      'Drenagem cirúrgica de abscessos, desbridamento de tecido desvitalizado e exploração de mão com suspeita de tenossinovite, sem retardo.',
      'Suspeita de Mycobacterium marinum: tratamento prolongado, habitualmente por vários meses e por pelo menos 4 a 8 semanas após a resolução das lesões, com esquemas que podem incluir claritromicina isolada ou associada, conforme orientação de infectologia ou dermatologia e conforme cultura e antibiograma; confirmar conforme protocolo.',
      'Curativos diários com soro fisiológico e cobertura conforme a fase da ferida; orientar que a ferida deve ser protegida do contato com a água do rio durante a cicatrização, o que exige negociação prática com a rotina de pesca e banho da família.',
      'Elevação do membro, repouso relativo e analgesia regular.',
      'Reavaliação obrigatória em 48 horas, pelo risco de infecção por Aeromonas de evolução rápida.',
      'Notificar acidentes por animais peçonhentos quando houver envenenamento associado, conforme a ficha específica.'
    ],
    medicamentos: [
      { medId: 'sulfametoxazol_trimetoprim', esquema: 'Cobertura para Aeromonas em ferimento de ambiente aquático: 40 mg/kg/dia de sulfametoxazol e 8 mg/kg/dia de trimetoprima VO dividida 12/12 h por 7 a 10 dias, conforme protocolo do serviço. Contraindicado em menores de 2 meses.' },
      { medId: 'ciprofloxacino', nome: 'Ciprofloxacino', esquema: 'Alternativa com boa atividade contra Aeromonas e Vibrio, conforme avaliação individual e disponibilidade: dose e duração conforme protocolo do serviço e bula, confirmar conforme protocolo.' },
      { medId: 'cefalexina', esquema: 'Cobertura para estafilococos e estreptococos, associada a um agente com atividade contra Aeromonas (não usar isoladamente em ferimento de ambiente aquático): 50 a 100 mg/kg/dia VO dividida a cada 6 horas, conforme protocolo.' },
      { medId: 'amoxicilina_clavulanato', esquema: 'Cobertura para flora cutânea, anaeróbios e mordeduras, associada a agente com atividade contra Aeromonas: 45 a 50 mg/kg/dia do componente amoxicilina VO dividida 12/12 h, conforme protocolo do serviço.' },
      { medId: 'ceftriaxona', esquema: 'Infecção grave com internação: 50 a 100 mg/kg/dia IV, associada a cobertura antiestafilocócica e para Aeromonas conforme protocolo do serviço e antibiograma.' },
      { medId: 'claritromicina', esquema: 'Suspeita ou confirmação de Mycobacterium marinum: 15 mg/kg/dia VO dividida 12/12 h (máximo 1 g/dia), em tratamento prolongado por vários meses, isolada ou associada conforme orientação de infectologia e antibiograma, confirmar conforme protocolo.' },
      { medId: 'doxiciclina', esquema: 'Alternativa em maiores de 8 anos para infecções por Vibrio e para micobacteriose, conforme avaliação especializada: dose e duração conforme protocolo do serviço e bula, confirmar conforme protocolo.' },
      { medId: 'dipirona', esquema: 'Analgesia: 10 a 15 mg/kg/dose VO ou IV a cada 6 horas, conforme bula.' },
      { medId: 'paracetamol', esquema: 'Analgesia e febre: 10 a 15 mg/kg/dose VO a cada 6 horas, conforme bula.' },
      { medId: 'ibuprofeno', esquema: 'Analgesia e controle do edema: 5 a 10 mg/kg/dose VO a cada 6 a 8 horas, conforme bula.' },
      { medId: 'soro_fisiologico', esquema: 'Lavagem abundante da ferida e curativos diários com SF 0,9%.' },
      { medId: null, nome: 'Vacina antitetânica (dT ou dTpa) e imunoglobulina antitetânica', esquema: 'Profilaxia conforme a situação vacinal e o tipo de ferimento, segundo as orientações do Ministério da Saúde e do CRIE. Ferimentos de pesca e contaminados com terra ou água de rio são geralmente de alto risco.' }
    ],
    criteriosInternacao: [
      'Celulite extensa, abscesso ou linfangite ascendente.',
      'Febre, calafrios ou toxemia.',
      'Suspeita de infecção necrosante de partes moles.',
      'Tenossinovite, artrite séptica ou osteomielite.',
      'Ferimento profundo de mão com comprometimento funcional ou necessidade de exploração cirúrgica.',
      'Corpo estranho ou anzol que exija remoção sob anestesia em centro cirúrgico.',
      'Suspeita de tétano.',
      'Criança imunossuprimida, desnutrida, diabética ou hepatopata com ferimento infectado.',
      'Impossibilidade de curativos diários, de antibiótico oral supervisionado ou de retorno rápido em comunidade distante.'
    ],
    criteriosUTI: [
      'Sepse ou choque séptico.',
      'Fasciíte necrosante ou mionecrose com instabilidade hemodinâmica.',
      'Tétano com espasmos generalizados, comprometimento respiratório ou disautonomia.',
      'Insuficiência respiratória ou disfunção orgânica múltipla.'
    ],
    criteriosAlta: [
      'Ausência de febre e de sinais de infecção em progressão.',
      'Ferida limpa, com plano de curativo definido e material disponível.',
      'Dor controlada com analgesia oral.',
      'Profilaxia antitetânica realizada e registrada.',
      'Antibiótico com cobertura adequada em curso e compreendido pelo responsável.',
      'Função e sensibilidade preservadas no membro, especialmente em ferimentos de mão.',
      'Responsável orientado sobre proteger a ferida do contato com a água do rio e sobre sinais de infecção.',
      'Retorno agendado e, quando possível, apoio da equipe de saúde da família ou unidade fluvial para os curativos.'
    ],
    orientacoes: [
      'Lavar a ferida imediatamente com bastante água limpa e sabão e procurar a unidade de saúde, mesmo que pareça pequena: feridas feitas na água do rio infeccionam com facilidade e rapidez.',
      'Em espetada de bagre ou mandi, com dor muito forte, mergulhar a área em água morna, o mais quente que a pele suportar sem queimar, por 30 a 90 minutos; um adulto deve testar a água antes e acompanhar o tempo todo.',
      'Nunca amarrar garrote, cortar, chupar, queimar ou colocar urina, fumo, borra de café, querosene, folhas ou remédio caseiro na ferida.',
      'Não tentar tirar anzol fisgado em casa, principalmente se estiver na mão, no rosto, perto do olho ou fundo: procurar o serviço de saúde.',
      'Levar o cartão de vacina: a vacina contra tétano é essencial nesse tipo de ferimento.',
      'Manter a ferida protegida e seca; evitar que a criança entre no rio, brinque na lama ou ajude na limpeza do peixe enquanto a ferida não fechar, combinando com a equipe alternativas possíveis para a rotina da família.',
      'Fazer os curativos todos os dias conforme a orientação e manter a mão ou o pé elevado.',
      'Voltar ao serviço em 2 dias para reavaliação, mesmo que pareça bem.',
      'Procurar atendimento imediatamente se houver febre, vermelhidão que se espalha rápido, inchaço com pele brilhante, bolhas, pus, cheiro ruim, listras vermelhas subindo pelo braço ou perna, íngua dolorida, dor que piora muito, dedo inchado que não dobra, ou dificuldade para abrir a boca e engolir.',
      'Se a ferida não fechar em algumas semanas ou surgirem carocinhos em fila subindo pelo braço, voltar: pode ser uma bactéria de crescimento lento que precisa de tratamento específico e prolongado.',
      'Para prevenir: usar luva ou pano grosso ao segurar o peixe e ao tirar o anzol, calçado fechado na pesca e na praia, e ter cuidado com bagres, mandis, piranhas e traíras ainda vivos no fundo da canoa.'
    ],
    retorno: 'Reavaliação obrigatória em 48 horas, pelo risco de infecção por Aeromonas de evolução rápida, e novamente em 5 a 7 dias; nas feridas infectadas, reavaliações a cada 2 a 3 dias até controle. Ferida que não cicatriza em 3 a 4 semanas ou que desenvolve nódulos em trajeto linfático exige reavaliação com biópsia e cultura para micobactérias e encaminhamento a dermatologia ou infectologia.',
    prevencao: [
      'Usar luvas, pano grosso ou alicate ao manusear peixes vivos, redes, malhadeiras e anzóis, especialmente bagres, mandis, piranhas e traíras.',
      'Usar calçado fechado ou bota de borracha na pesca, na praia e ao caminhar em áreas alagadas.',
      'Manter facas, anzóis e materiais de pesca limpos e organizados, fora do alcance de crianças pequenas.',
      'Lavar imediatamente qualquer ferimento ocorrido na pesca ou na limpeza do pescado e procurar avaliação.',
      'Manter feridas abertas protegidas e evitar contato com água de rio até a cicatrização.',
      'Manter o calendário vacinal antitetânico atualizado em toda a família, com atenção especial a pescadores e crianças que os acompanham.',
      'Educação em saúde nas comunidades de pesca sobre reconhecimento precoce de infecção e sobre a inadequação das práticas caseiras sobre feridas.',
      'Garantir disponibilidade de antibióticos com cobertura para Aeromonas e de imunobiológicos antitetânicos nas unidades básicas e fluviais.'
    ],
    fontes: [
      { nome: 'Manual de Diagnóstico e Tratamento de Acidentes por Animais Peçonhentos – Ministério da Saúde', ano: 2001 },
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
      { nome: 'Red Book – American Academy of Pediatrics (infecções por Aeromonas e Mycobacterium marinum)', ano: 2024 },
      { nome: 'Nelson Textbook of Pediatrics, 22ª edição', ano: 2024 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'miiase',
    nome: 'Miíase',
    categoria: 'amazonia',
    amazonia: true,
    cid10: 'B87',
    tags: ['lesoes_pele', 'feridas', 'prurido', 'dor_local', 'edema', 'picada_inseto', 'febre', 'linfonodomegalia'],
    definicao: 'Infestação de tecidos e órgãos de pessoas ou animais por larvas de moscas. Nas formas furunculoide e cavitária, a larva se desenvolve na pele íntegra ou em feridas e cavidades preexistentes, causando lesão dolorosa com orifício central, sensação de movimentação e risco de infecção secundária.',
    epidemiologia: 'A miíase é frequente em comunidades rurais, ribeirinhas e indígenas da Amazônia, favorecida pelo clima quente e úmido, pela convivência próxima com animais domésticos e de criação, pela presença de moscas atraídas por restos de alimento, pescado e lixo e pelo grande número de picadas de inseto e feridas expostas nas crianças. A forma furunculoide pelo berne, causada por Dermatobia hominis, é a mais comum e ocorre em áreas de mata e criação de gado. A forma cavitária e de ferida, causada principalmente por Cochliomyia hominivorax, a mosca da bicheira, aparece em feridas abertas, umbigo de recém-nascido, couro cabeludo com pediculose, lesões de escabiose infectada, ouvidos com otorreia e cavidade nasal e oral, sendo mais grave e mais frequente em crianças com má higiene, desnutrição, deficiência intelectual ou situação de vulnerabilidade social. A miíase em ferida de criança deve sempre motivar avaliação do cuidado e do contexto familiar.',
    agente: 'Dermatobia hominis (berne, mosca varejeira que deposita ovos por meio de outro inseto vetor) na forma furunculoide primária; Cochliomyia hominivorax (mosca da bicheira) e Chrysomya spp. e Lucilia spp. nas formas cavitárias e de ferida.',
    transmissao: 'Não há transmissão entre pessoas. Dermatobia hominis utiliza um inseto vetor, geralmente um mosquito ou mosca, para transportar seus ovos até a pele; o calor corporal estimula a eclosão e a larva penetra pela pele íntegra ou por orifício de picada. Cochliomyia hominivorax deposita ovos diretamente sobre feridas, secreções, mucosas ou cavidades, onde as larvas eclodem e se alimentam de tecido vivo.',
    incubacao: 'Na forma furunculoide, a larva leva de 5 a 12 semanas para completar o desenvolvimento, com lesão perceptível a partir de poucos dias após a penetração. Nas formas cavitárias e de ferida, as larvas eclodem em cerca de 12 a 24 horas e causam destruição tecidual rápida em poucos dias.',
    manifestacoes: [
      'Miíase furunculoide (berne): nódulo eritematoso, endurecido e doloroso, semelhante a furúnculo, com orifício central por onde se observa saída de secreção serossanguinolenta e, por vezes, a extremidade posterior da larva.',
      'Sensação de ferroada, pontada ou movimentação dentro da lesão, referida especialmente à noite, sintoma muito sugestivo.',
      'Localização preferencial em áreas expostas: couro cabeludo, face, pescoço, braços, pernas e dorso.',
      'Prurido e dor local de intensidade variável, com edema perilesional e adenomegalia regional.',
      'Miíase de ferida ou cavitária: ferida preexistente com larvas visíveis, odor fétido, secreção abundante, destruição de tecido e sangramento.',
      'Localizações graves: cavidade nasal, seios da face, ouvido, órbita, boca, gengiva, região perineal e umbigo do recém-nascido, com risco de invasão de estruturas profundas.',
      'Otite com miíase: otorreia fétida, dor intensa e visualização de larvas no conduto.',
      'Febre, mal-estar e sinais de infecção secundária bacteriana.',
      'Em lesões de couro cabeludo de crianças com pediculose intensa, pode haver destruição extensa e exposição óssea em casos negligenciados.',
      'Associação frequente com desnutrição, escabiose, pediculose, feridas crônicas e negligência no cuidado.'
    ],
    sinaisAlarme: [
      'Miíase em cavidade nasal, ouvido, órbita, boca ou seios da face, com risco de extensão para estruturas profundas e para o sistema nervoso central.',
      'Miíase em umbigo de recém-nascido ou em lactente pequeno.',
      'Febre, calafrios, celulite em expansão, linfangite ou toxemia.',
      'Destruição tecidual extensa, exposição de osso, cartilagem ou tendão.',
      'Sangramento importante da lesão.',
      'Cefaleia, rigidez de nuca, alteração de consciência ou sinais neurológicos em miíase de face e cabeça.',
      'Grande número de larvas ou lesões múltiplas.',
      'Criança desnutrida, imunossuprimida, com deficiência ou em situação de negligência e vulnerabilidade social.',
      'Vacinação antitetânica desatualizada.'
    ],
    diagnosticoDiferencial: ['furúnculo e abscesso cutâneo', 'escabiose_impetigo', 'tungiase', 'larva_migrans_cutanea', 'leishmaniose_tegumentar', 'picada de inseto infectada', 'cisto epidérmico infectado', 'corpo estranho com granuloma', 'esporotricose', 'úlcera crônica de outras causas'],
    exames: ['diagnóstico clínico com visualização da larva', 'identificação entomológica da larva removida (quando disponível)', 'hemograma', 'pcr', 'cultura de secreção da ferida (se infecção secundária)', 'radiografia ou tomografia de face e crânio (miíase nasal, orbitária ou auricular extensa)', 'ultrassonografia de partes moles (dúvida diagnóstica)', 'hemocultura (se toxemia)', 'exame_parasitologico_fezes e avaliação nutricional no contexto de vulnerabilidade'],
    criteriosDiagnosticos: [
      'Diagnóstico clínico: lesão nodular com orifício central e sensação de movimentação, ou ferida com larvas visíveis.',
      'A visualização direta da larva, espontânea ou após oclusão do orifício, confirma o diagnóstico.',
      'A oclusão do orifício com vaselina, esparadrapo ou substância oleosa por alguns minutos força a larva a emergir em busca de ar, facilitando a identificação e a retirada.',
      'Avaliar sempre a extensão da lesão, a presença de infecção secundária e o número de larvas.',
      'Em miíase nasal, auricular ou orbitária, indicar exame por especialista e imagem para avaliar extensão.',
      'Investigar e tratar as condições de base que permitiram a infestação: feridas crônicas, escabiose, pediculose, otorreia, desnutrição, deficiência de autocuidado.',
      'Avaliar o contexto de cuidado da criança: miíase extensa em ferida, especialmente em couro cabeludo, umbigo ou períneo, é sinal de alerta para negligência e exige avaliação social conforme protocolo do serviço e, quando indicado, comunicação ao Conselho Tutelar.',
      'Avaliar a situação vacinal antitetânica.'
    ],
    classificacaoGravidade: [
      { nivel: 'Leve (furunculoide localizada)', criterios: 'Uma ou poucas lesões em pele de tronco ou membros, sem infecção secundária significativa, criança em bom estado geral. Remoção ambulatorial da larva, curativo e orientação.' },
      { nivel: 'Moderada', criterios: 'Lesões múltiplas, miíase de ferida com número moderado de larvas, infecção secundária localizada ou localização em couro cabeludo. Remoção sob analgesia adequada, antibioticoterapia e reavaliação frequente.' },
      { nivel: 'Grave', criterios: 'Miíase cavitária em nariz, ouvido, órbita, boca ou períneo; miíase em recém-nascido; destruição tecidual extensa; celulite grave, toxemia ou suspeita de extensão para estruturas profundas. Internação, remoção sob sedação ou anestesia e avaliação especializada.' }
    ],
    tratamento: [
      'Miíase furunculoide: ocluir o orifício central com vaselina, pomada oclusiva ou esparadrapo por alguns minutos para dificultar a respiração da larva e favorecer sua emersão, seguida de retirada com pinça, com movimento suave e contínuo.',
      'Evitar romper ou fragmentar a larva durante a retirada, pois restos podem causar reação inflamatória intensa, granuloma e infecção secundária. Quando a extração não for completa, considerar pequena incisão sob anestesia local, conforme protocolo do serviço.',
      'Anestesia local pode ser usada para facilitar a remoção em lesões dolorosas, em crianças pouco colaborativas ou em localizações delicadas.',
      'Miíase de ferida ou cavitária: remoção mecânica de todas as larvas com pinça, sob boa iluminação e analgesia adequada, associada a limpeza abundante com soro fisiológico, desbridamento do tecido desvitalizado e curativos frequentes até que não restem larvas.',
      'Ivermectina por via oral pode ser usada como adjuvante para facilitar a remoção em miíases extensas, cavitárias ou de difícil acesso, imobilizando e matando as larvas; a indicação segue os critérios de peso e idade do Ministério da Saúde, sendo habitualmente reservada a crianças com peso igual ou superior a 15 kg, confirmar conforme protocolo e bula. Formulações tópicas de ivermectina também têm sido descritas conforme protocolo do serviço.',
      'Antibioticoterapia sistêmica quando houver infecção bacteriana secundária, celulite, febre ou ferida extensa, com cobertura para estafilococos e estreptococos e, conforme o contexto, para anaeróbios.',
      'Analgesia adequada durante o procedimento e nos dias seguintes.',
      'Profilaxia antitetânica conforme a situação vacinal e o tipo de lesão, seguindo as orientações do Ministério da Saúde.',
      'Miíase nasal, auricular, orbitária, oral ou perineal: avaliação por otorrinolaringologia, oftalmologia ou cirurgia, com remoção sob sedação ou anestesia geral quando necessário e avaliação de extensão por imagem.',
      'Curativos diários com soro fisiológico e cobertura adequada, com reavaliação frequente até a cicatrização.',
      'Tratar simultaneamente as condições associadas: escabiose, pediculose, otorreia crônica, feridas crônicas e desnutrição, pois sem isso a recorrência é a regra.',
      'Não usar querosene, óleo diesel, gasolina, creolina, tabaco, cal ou outras substâncias cáusticas sobre a lesão, práticas comuns na região e causadoras de queimadura química e agravamento da ferida.',
      'Avaliação social e, quando indicada, articulação com a rede de proteção e comunicação ao Conselho Tutelar em situações que sugiram negligência.'
    ],
    medicamentos: [
      { medId: 'ivermectina', esquema: 'Adjuvante em miíases extensas, cavitárias ou de difícil acesso: 200 microgramas/kg VO em dose única, podendo ser repetida conforme avaliação. Uso habitualmente restrito a crianças com peso igual ou superior a 15 kg; confirmar indicação, peso mínimo e dose conforme protocolo do Ministério da Saúde e bula.' },
      { medId: 'cefalexina', esquema: 'Infecção bacteriana secundária: 50 a 100 mg/kg/dia VO dividida a cada 6 horas por 7 a 10 dias, conforme protocolo.' },
      { medId: 'amoxicilina_clavulanato', esquema: 'Ferida extensa, cavitária ou com necessidade de cobertura para anaeróbios: 45 a 50 mg/kg/dia do componente amoxicilina VO dividida 12/12 h, conforme protocolo do serviço.' },
      { medId: 'ceftriaxona', esquema: 'Infecção grave com internação: 50 a 100 mg/kg/dia IV, conforme protocolo do serviço.' },
      { medId: 'metronidazol', esquema: 'Associado quando houver ferida fétida com suspeita de anaeróbios, conforme protocolo do serviço.' },
      { medId: 'paracetamol', esquema: 'Analgesia: 10 a 15 mg/kg/dose VO a cada 6 horas, conforme bula.' },
      { medId: 'dipirona', esquema: 'Analgesia: 10 a 15 mg/kg/dose VO ou IV a cada 6 horas, conforme bula.' },
      { medId: 'ibuprofeno', esquema: 'Analgesia e controle do edema: 5 a 10 mg/kg/dose VO a cada 6 a 8 horas, conforme bula.' },
      { medId: 'soro_fisiologico', esquema: 'Limpeza abundante da lesão e curativos diários com SF 0,9%.' },
      { medId: 'permetrina', esquema: 'Tratamento simultâneo de escabiose ou pediculose associadas: loção ou creme a 5% para escabiose e loção a 1% para pediculose, conforme protocolo do MS e bula.' },
      { medId: null, nome: 'Anestésico local sem vasoconstritor (por exemplo, lidocaína)', esquema: 'Infiltração local para facilitar a remoção das larvas, conforme protocolo do serviço e bula, confirmar conforme protocolo.' },
      { medId: null, nome: 'Vacina antitetânica (dT ou dTpa) e imunoglobulina antitetânica', esquema: 'Profilaxia conforme a situação vacinal e o tipo de lesão, segundo as orientações do Ministério da Saúde e do CRIE.' }
    ],
    criteriosInternacao: [
      'Miíase em cavidade nasal, ouvido, órbita, boca, seios da face ou períneo.',
      'Miíase em recém-nascido ou lactente pequeno, especialmente umbilical.',
      'Grande número de larvas ou destruição tecidual extensa.',
      'Infecção secundária com celulite extensa, abscesso, linfangite ou febre.',
      'Necessidade de remoção sob sedação ou anestesia geral.',
      'Sangramento importante.',
      'Criança desnutrida grave, imunossuprimida ou com deficiência que impeça o cuidado domiciliar.',
      'Situação de negligência ou vulnerabilidade social que comprometa o tratamento e o cuidado da ferida.'
    ],
    criteriosUTI: [
      'Sepse ou choque séptico secundário à infecção da ferida.',
      'Extensão para sistema nervoso central com meningite ou abscesso.',
      'Comprometimento de via aérea em miíase oral ou faríngea extensa.',
      'Tétano com espasmos generalizados ou comprometimento respiratório.',
      'Instabilidade hemodinâmica por sangramento ou infecção invasiva.'
    ],
    criteriosAlta: [
      'Todas as larvas removidas, confirmado por inspeção cuidadosa da lesão.',
      'Ferida limpa, em processo de granulação e sem sinais de infecção em progressão.',
      'Ausência de febre.',
      'Dor controlada com analgesia oral.',
      'Profilaxia antitetânica realizada e registrada.',
      'Condições associadas (escabiose, pediculose, otorreia, desnutrição) identificadas e em tratamento.',
      'Responsável orientado sobre curativos, sinais de alarme e prevenção de recorrência, com material de curativo garantido.',
      'Avaliação social realizada quando indicada e rede de proteção acionada nos casos necessários.',
      'Retorno agendado com a unidade de saúde da família ou equipe fluvial.'
    ],
    orientacoes: [
      'Não colocar querosene, óleo diesel, gasolina, creolina, cal, fumo ou qualquer produto forte na ferida: isso queima a pele, piora a lesão e não resolve o problema.',
      'A retirada das larvas deve ser feita na unidade de saúde; tentar espremer ou cavar a ferida em casa pode quebrar a larva dentro e piorar a inflamação.',
      'Manter a ferida limpa e coberta com curativo, trocando conforme a orientação recebida.',
      'Lavar bem as feridas, picadas e arranhões da criança todos os dias e mantê-los cobertos, pois é neles que a mosca coloca os ovos.',
      'Tratar sarna, piolho, ferida de ouvido e outras feridas de toda a família ao mesmo tempo, conforme a orientação, para evitar que a miíase volte.',
      'Manter o lixo em recipiente fechado, não deixar restos de comida, peixe ou carne expostos e manter o terreno limpo.',
      'Cuidar dos animais da casa, que também podem ter bicheira e atrair moscas; procurar orientação veterinária quando possível.',
      'Usar telas nas janelas quando possível, mosquiteiro e roupas que cubram os braços e as pernas em áreas com muita mosca e mosquito.',
      'Levar o cartão de vacina para avaliar a vacina contra tétano.',
      'Voltar imediatamente se houver febre, vermelhidão que se espalha, pus, cheiro forte, dor que piora, sangramento, inchaço no rosto, dor de cabeça forte, ou se aparecerem novas larvas.',
      'Voltar em todas as consultas marcadas até a ferida fechar completamente.'
    ],
    retorno: 'Reavaliação em 24 a 48 horas após a remoção, para confirmar que não restaram larvas e avaliar infecção secundária, e depois a cada 2 a 3 dias até a ferida estar limpa e em cicatrização; acompanhamento semanal até o fechamento completo. Reavaliação do estado nutricional, do calendário vacinal e das condições de higiene e cuidado da criança, com seguimento pela equipe de saúde da família.',
    prevencao: [
      'Lavar e cobrir feridas, picadas de inseto, arranhões e o coto umbilical do recém-nascido, impedindo que as moscas depositem ovos.',
      'Tratamento precoce de escabiose, pediculose, impetigo, otorreia crônica e feridas crônicas, que são as portas de entrada mais comuns.',
      'Higiene corporal regular e troca de roupas, com apoio às famílias que enfrentam dificuldade de acesso a água e sabão.',
      'Destino adequado do lixo em recipientes fechados, remoção de restos de alimento, pescado e carcaças e limpeza do terreno.',
      'Uso de telas em janelas, mosquiteiros e roupas que cubram braços e pernas em áreas de mata e criação de animais.',
      'Cuidado veterinário dos animais domésticos e de criação, tratando bicheiras que mantêm a população de moscas.',
      'Vigilância do cuidado de crianças pequenas, com deficiência ou acamadas, com atenção redobrada a ouvidos, nariz, boca e região perineal.',
      'Manutenção do calendário vacinal antitetânico atualizado.',
      'Educação em saúde nas comunidades sobre o risco das substâncias cáusticas aplicadas em feridas.'
    ],
    fontes: [
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
      { nome: 'Tratado de Pediatria – Sociedade Brasileira de Pediatria', ano: 2022 },
      { nome: 'Nelson Textbook of Pediatrics, 22ª edição', ano: 2024 },
      { nome: 'OPAS/OMS – Doenças tropicais negligenciadas relacionadas à pele', ano: 2022 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'tungiase',
    nome: 'Tungíase (bicho-de-pé)',
    categoria: 'amazonia',
    amazonia: true,
    cid10: 'B88.1',
    tags: ['lesoes_pele', 'prurido', 'dor_local', 'feridas', 'edema', 'febre', 'linfonodomegalia', 'picada_inseto'],
    definicao: 'Ectoparasitose cutânea causada pela penetração da fêmea grávida da pulga Tunga penetrans na epiderme, geralmente nos pés, formando uma pápula esbranquiçada com ponto central escuro, pruriginosa e dolorosa, com risco importante de infecção bacteriana secundária e de tétano.',
    epidemiologia: 'A tungíase é uma doença tropical negligenciada fortemente associada à pobreza, ao piso de terra batida, à ausência de calçados e à convivência com cães, porcos e galinhas. Na Amazônia é frequente em comunidades rurais, ribeirinhas, periurbanas e indígenas, com maior ocorrência no período seco, quando o solo arenoso e as áreas sombreadas ao redor das casas, chiqueiros e galinheiros favorecem o ciclo da pulga. Acomete de forma desproporcional crianças em idade escolar e idosos, e a carga parasitária costuma ser maior nos pés de crianças que brincam descalças no terreiro e na areia. As consequências vão além da lesão: dor ao caminhar, dificuldade de frequentar a escola, deformidade ungueal, infecção bacteriana secundária com risco de sepse e tétano, e estigma social. É doença frequentemente subestimada e raramente notificada, ainda que de grande impacto local.',
    agente: 'Tunga penetrans, pulga também conhecida como bicho-de-pé, jatecuba ou pulga-da-areia. A fêmea fecundada penetra na epiderme e sofre hipertrofia, aumentando de tamanho em cerca de 2.000 vezes enquanto desenvolve os ovos.',
    transmissao: 'Não há transmissão direta entre pessoas. A infestação ocorre pelo contato da pele, principalmente dos pés, com solo arenoso, seco e sombreado contaminado por pulgas, em terreiros, chiqueiros, currais, galinheiros e interior de casas com piso de terra batida. Cães, porcos, gatos, ratos e outros animais atuam como reservatórios e mantêm o ciclo no peridomicílio.',
    incubacao: 'A penetração é rápida e frequentemente despercebida. A lesão característica torna-se visível em 1 a 2 dias e a fêmea completa o ciclo em cerca de 3 a 4 semanas, quando expele os ovos e morre, com involução e descamação da lesão.',
    manifestacoes: [
      'Prurido e sensação de ferroada ou corpo estranho no local da penetração, frequentemente referidos antes de a lesão ser visível.',
      'Pápula ou nódulo esbranquiçado ou amarelado de 3 a 10 mm, com halo eritematoso e ponto central escuro, correspondente à porção posterior da pulga.',
      'Localização preferencial nos pés: região periungueal, subungueal, entre os dedos, na planta, no calcanhar e nas bordas laterais; também podem ocorrer em mãos, joelhos, nádegas e cotovelos em crianças que se sentam e engatinham no solo.',
      'Dor local que piora ao caminhar e ao calçar sapatos, com prejuízo à marcha, às brincadeiras e à frequência escolar.',
      'Saída de material esbranquiçado (ovos) pelo orifício central e, ao final do ciclo, formação de crosta escura com descamação.',
      'Lesões múltiplas e agrupadas em infestação intensa, com edema, deformidade dos dedos e das unhas e dificuldade de calçar.',
      'Infecção bacteriana secundária muito frequente: pústula, abscesso, celulite, linfangite, adenomegalia dolorosa e febre.',
      'Complicações em infestações graves ou negligenciadas: onicodistrofia, perda de unha, úlcera crônica, osteomielite, deformidade e limitação funcional, autoamputação de dedos em casos extremos e tétano.',
      'Fissuras e hiperceratose associadas em pés de crianças que andam descalças.',
      'Estigma e afastamento escolar associados às lesões visíveis e à dor.'
    ],
    sinaisAlarme: [
      'Febre, calafrios ou toxemia.',
      'Eritema em expansão, pústula, secreção purulenta, linfangite ou adenomegalia dolorosa.',
      'Abscesso, flutuação ou área de necrose.',
      'Dor óssea, limitação da mobilidade articular ou drenagem persistente (suspeita de osteomielite ou artrite séptica).',
      'Grande número de lesões, lesões confluentes, edema difuso do pé ou dificuldade de deambular.',
      'Trismo, rigidez de nuca, disfagia ou espasmos musculares (suspeita de tétano).',
      'Vacinação antitetânica desatualizada ou desconhecida.',
      'Criança desnutrida, diabética, imunossuprimida ou com anemia falciforme.',
      'Lesões em crianças pequenas com sinais de negligência e falta de cuidado.'
    ],
    diagnosticoDiferencial: ['escabiose_impetigo', 'miiase', 'larva_migrans_cutanea', 'verruga plantar', 'corpo estranho na planta do pé (espinho, farpa)', 'paroníquia e unha encravada', 'foliculite e furúnculo', 'picada de inseto infectada', 'granuloma de corpo estranho', 'melanoma subungueal (em lesões pigmentadas persistentes de adolescentes)'],
    exames: ['diagnóstico clínico com inspeção sob boa iluminação e, quando disponível, dermatoscopia', 'hemograma (se infecção secundária)', 'pcr', 'cultura de secreção da lesão (se infecção)', 'radiografia do pé (suspeita de osteomielite ou de corpo estranho)', 'hemocultura (se febre ou toxemia)', 'glicemia', 'avaliação nutricional'],
    criteriosDiagnosticos: [
      'Diagnóstico clínico: pápula esbranquiçada com ponto central escuro em pé de criança que anda descalça, com prurido e dor local.',
      'A dermatoscopia, quando disponível, auxilia ao mostrar o orifício central e a estrutura do parasita.',
      'Examinar sistematicamente todos os pés, dedos, regiões periungueais e subungueais, plantas, espaços interdigitais, calcanhares, mãos, joelhos e nádegas, pois lesões múltiplas são comuns e passam despercebidas.',
      'Classificar o estágio das lesões e estimar a carga parasitária, o que orienta a conduta e o acompanhamento.',
      'Identificar e registrar sinais de infecção bacteriana secundária, que é a principal causa de morbidade.',
      'Avaliar a situação vacinal antitetânica em todo paciente com tungíase, medida essencial dada a via de entrada e a associação descrita com tétano.',
      'Avaliar o ambiente domiciliar e peridomiciliar e a presença de animais, pois o tratamento individual sem manejo ambiental resulta em reinfestação.',
      'Rastrear outros moradores da casa, especialmente crianças e idosos, já que a infestação costuma ser familiar.'
    ],
    classificacaoGravidade: [
      { nivel: 'Leve', criterios: 'Poucas lesões (até cerca de 5), sem sinais de infecção secundária, marcha preservada, criança em bom estado geral. Remoção ambulatorial das pulgas, antissepsia, profilaxia antitetânica e orientação ambiental.' },
      { nivel: 'Moderada', criterios: 'Lesões múltiplas ou agrupadas, dor que limita a marcha, lesões periungueais ou subungueais, ou infecção secundária localizada. Remoção sob analgesia, antibioticoterapia oral e reavaliação em poucos dias.' },
      { nivel: 'Grave', criterios: 'Infestação intensa com dezenas de lesões, edema difuso do pé, celulite extensa, abscesso, linfangite, febre, deformidade ungueal importante, suspeita de osteomielite ou de tétano, ou criança com comorbidade. Internação, antibiótico parenteral e avaliação cirúrgica.' }
    ],
    tratamento: [
      'Remoção mecânica do parasita é o tratamento padrão: extração completa da pulga com agulha estéril ou cureta, sob antissepsia rigorosa, em ambiente de saúde e com instrumental estéril e individual.',
      'Não usar agulha, alfinete, espinho ou instrumento compartilhado e não reutilizado, prática comum na comunidade e associada a infecção secundária e a transmissão de patógenos de transmissão sanguínea.',
      'A cavidade resultante deve ser limpa com antisséptico e coberta; realizar a remoção com analgesia adequada, especialmente em crianças com muitas lesões.',
      'Em infestação intensa, programar sessões de remoção, priorizando as lesões mais dolorosas e as com sinais de infecção, com retornos frequentes.',
      'Aplicação tópica de dimeticona de baixa viscosidade duas vezes ao dia por vários dias tem eficácia demonstrada para matar as pulgas incrustadas e é uma alternativa não invasiva, especialmente útil em infestações intensas e em programas comunitários; disponibilidade e esquema conforme protocolo do serviço, confirmar conforme protocolo.',
      'Vaselina ou óleos oclusivos podem ser usados como medida auxiliar para reduzir a viabilidade do parasita quando não houver disponibilidade de dimeticona, conforme protocolo do serviço.',
      'Ivermectina oral não tem eficácia consistentemente demonstrada na tungíase e não deve ser considerada tratamento de primeira linha; seu uso eventual deve seguir avaliação individual, critérios de peso e idade e protocolo do serviço, confirmar conforme protocolo e bula.',
      'Antibioticoterapia sistêmica quando houver infecção bacteriana secundária, com cobertura para estafilococos e estreptococos; em infecção extensa, febre ou toxemia, internação e antibiótico parenteral.',
      'Profilaxia antitetânica conforme a situação vacinal e o tipo de lesão, seguindo as orientações do Ministério da Saúde; a atualização vacinal de toda a família é parte do cuidado.',
      'Analgesia regular, pois a dor costuma ser subestimada e compromete a marcha e a frequência escolar.',
      'Curativos e cuidados com os pés: lavagem diária com água e sabão, secagem entre os dedos, hidratação da pele, corte adequado das unhas e tratamento de fissuras e hiperceratose.',
      'Tratar simultaneamente os demais moradores afetados e orientar o manejo ambiental, sem o que a reinfestação ocorre em semanas.',
      'Manejo ambiental e animal: cimentar ou compactar o piso, manter o terreiro varrido e limpo, afastar chiqueiros, galinheiros e canis da casa e tratar os animais domésticos, conforme orientação veterinária disponível.',
      'Articulação com a equipe de saúde da família, com a escola e com a vigilância ambiental, uma vez que a tungíase é um problema comunitário e não apenas individual.'
    ],
    medicamentos: [
      { medId: null, nome: 'Dimeticona de baixa viscosidade tópica', esquema: 'Aplicação sobre as lesões duas vezes ao dia por vários dias consecutivos, conforme protocolo do serviço e bula; alternativa não invasiva à remoção mecânica, especialmente em infestação intensa. Confirmar disponibilidade e esquema conforme protocolo.' },
      { medId: 'cefalexina', esquema: 'Infecção bacteriana secundária: 50 a 100 mg/kg/dia VO dividida a cada 6 horas por 7 a 10 dias, conforme protocolo.' },
      { medId: 'amoxicilina_clavulanato', esquema: 'Infecção extensa ou com necessidade de cobertura ampliada: 45 a 50 mg/kg/dia do componente amoxicilina VO dividida 12/12 h, conforme protocolo do serviço.' },
      { medId: 'ceftriaxona', esquema: 'Infecção grave com internação: 50 a 100 mg/kg/dia IV, conforme protocolo do serviço.' },
      { medId: 'sulfametoxazol_trimetoprim', esquema: 'Alternativa em suspeita de Staphylococcus aureus resistente à meticilina de origem comunitária: 8 a 12 mg/kg/dia de trimetoprima VO dividida 12/12 h, conforme protocolo do serviço e perfil local. Contraindicado em menores de 2 meses.' },
      { medId: 'ivermectina', esquema: 'Eficácia não consistentemente demonstrada na tungíase; não é tratamento de primeira linha. Se considerada em situação específica, 200 microgramas/kg VO em dose única, habitualmente restrita a crianças com peso igual ou superior a 15 kg, confirmar conforme protocolo do Ministério da Saúde e bula.' },
      { medId: 'paracetamol', esquema: 'Analgesia: 10 a 15 mg/kg/dose VO a cada 6 horas, conforme bula.' },
      { medId: 'dipirona', esquema: 'Analgesia: 10 a 15 mg/kg/dose VO a cada 6 horas, conforme bula.' },
      { medId: 'ibuprofeno', esquema: 'Analgesia e controle do edema: 5 a 10 mg/kg/dose VO a cada 6 a 8 horas, conforme bula.' },
      { medId: 'soro_fisiologico', esquema: 'Limpeza das lesões e curativos com SF 0,9%.' },
      { medId: null, nome: 'Vacina antitetânica (dT ou dTpa) e imunoglobulina antitetânica', esquema: 'Profilaxia conforme a situação vacinal e o tipo de lesão, segundo as orientações do Ministério da Saúde e do CRIE; atualizar o esquema de toda a família.' }
    ],
    criteriosInternacao: [
      'Celulite extensa, abscesso ou linfangite ascendente.',
      'Febre, calafrios ou toxemia.',
      'Suspeita de osteomielite, artrite séptica ou necrose.',
      'Infestação muito intensa com incapacidade de deambular e necessidade de remoção sob sedação.',
      'Suspeita de tétano.',
      'Criança desnutrida grave, diabética, imunossuprimida ou com anemia falciforme e infecção associada.',
      'Impossibilidade de remoção adequada, de curativos e de acompanhamento no território, em comunidades muito distantes.',
      'Situação de negligência ou vulnerabilidade social grave.'
    ],
    criteriosUTI: [
      'Sepse ou choque séptico.',
      'Tétano com espasmos generalizados, comprometimento respiratório ou disautonomia.',
      'Fasciíte necrosante ou infecção invasiva de partes moles com instabilidade hemodinâmica.',
      'Disfunção orgânica múltipla.'
    ],
    criteriosAlta: [
      'Lesões removidas ou em tratamento tópico adequado, com plano definido para as lesões remanescentes.',
      'Ausência de febre e de sinais de infecção em progressão.',
      'Dor controlada e marcha possível.',
      'Profilaxia antitetânica realizada e registrada.',
      'Antibiótico, quando indicado, em curso e compreendido pelo responsável.',
      'Família orientada sobre cuidados com os pés, uso de calçados e manejo ambiental e animal.',
      'Demais moradores avaliados e tratados quando necessário.',
      'Retorno agendado com a equipe de saúde da família ou unidade fluvial e articulação com a escola quando houver afastamento.'
    ],
    orientacoes: [
      'Não tirar o bicho-de-pé em casa com agulha, alfinete, espinho ou canivete: além de doer e infeccionar, o mesmo instrumento usado em várias pessoas pode transmitir doenças. A retirada deve ser feita na unidade de saúde, com material estéril.',
      'Levar o cartão de vacina: a vacina contra o tétano é muito importante nesse caso, para a criança e para toda a família.',
      'Depois da retirada, lavar os pés todos os dias com água e sabão, secar bem entre os dedos e manter o curativo conforme orientado.',
      'Usar calçado fechado sempre que possível, inclusive dentro de casa e no terreiro; sandália é melhor do que andar descalço, mas o calçado fechado protege mais.',
      'Cortar as unhas dos pés retas e mantê-las limpas.',
      'Olhar os pés da criança todos os dias, inclusive entre os dedos e ao redor das unhas, e procurar a unidade de saúde assim que aparecer uma bolinha branca com pontinho preto.',
      'Examinar também os pés dos outros moradores da casa, especialmente das outras crianças e dos idosos.',
      'Manter o terreiro limpo e varrido, evitar areia solta acumulada perto da casa e, quando possível, cimentar ou compactar o chão de terra dos cômodos e da área de entrada.',
      'Afastar chiqueiro, galinheiro, curral e casinha de cachorro da casa e da área onde as crianças brincam, e cuidar dos animais, que também carregam o bicho-de-pé.',
      'Voltar imediatamente se houver febre, vermelhidão que aumenta, pus, inchaço do pé, listras vermelhas subindo pela perna, íngua dolorida, dor forte ao pisar, ou se a criança tiver dificuldade para abrir a boca, engolir ou apresentar rigidez no corpo.',
      'Se a criança faltar à escola por causa da dor nos pés, avisar a equipe de saúde para que o problema seja tratado de forma prioritária.'
    ],
    retorno: 'Reavaliação em 3 a 7 dias após a remoção para verificar cicatrização, identificar lesões não percebidas na primeira avaliação e tratar infecção secundária; nas infestações intensas, retornos semanais até o controle. Reavaliação em 2 a 4 semanas para detectar reinfestação e revisar as medidas ambientais, com visita domiciliar pela equipe de saúde da família quando possível.',
    prevencao: [
      'Uso regular de calçados fechados, inclusive dentro de casa e no terreiro, principal medida de proteção individual.',
      'Cimentação ou compactação do piso de terra batida das casas e das áreas de circulação, medida de maior impacto estrutural.',
      'Limpeza e varrição do terreiro, remoção de areia solta acumulada e de matéria orgânica no peridomicílio.',
      'Afastamento de chiqueiros, galinheiros, currais e canis das casas e das áreas de brincadeira das crianças.',
      'Cuidado e tratamento dos animais domésticos e de criação, que são reservatórios do parasita.',
      'Exame periódico dos pés das crianças em casa e na escola, com busca ativa e tratamento precoce.',
      'Aplicação de repelentes à base de óleo de coco ou formulações específicas sobre os pés, descrita como medida preventiva eficaz em estudos comunitários, conforme disponibilidade e protocolo local.',
      'Manutenção do calendário vacinal antitetânico atualizado em toda a comunidade.',
      'Abordagem comunitária coordenada, envolvendo escola, agentes comunitários de saúde e vigilância ambiental, uma vez que o tratamento individual isolado leva à reinfestação.',
      'Atenção à tungíase como marcador de vulnerabilidade social, com articulação com a assistência social quando necessário.'
    ],
    fontes: [
      { nome: 'OMS – Tungiasis: fact sheet and guidance on skin NTDs', ano: 2023 },
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
      { nome: 'OPAS/OMS – Doenças tropicais negligenciadas relacionadas à pele', ano: 2022 },
      { nome: 'Tratado de Pediatria – Sociedade Brasileira de Pediatria', ano: 2022 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'larva_migrans_cutanea',
    nome: 'Larva migrans cutânea (bicho geográfico)',
    categoria: 'amazonia',
    amazonia: true,
    cid10: 'B76.9',
    tags: ['lesoes_pele', 'prurido', 'feridas', 'dor_local', 'edema', 'febre', 'linfonodomegalia'],
    definicao: 'Dermatose parasitária causada pela penetração e migração intraepidérmica de larvas de ancilostomídeos de cães e gatos, caracterizada por lesão linear ou serpiginosa, eritematosa, muito pruriginosa e de progressão diária, tipicamente em pés, nádegas e coxas.',
    epidemiologia: 'É uma das dermatoses parasitárias mais comuns em regiões tropicais e uma queixa frequente em crianças na Amazônia. A infestação ocorre no contato da pele com solo arenoso, úmido e sombreado contaminado por fezes de cães e gatos, situação típica das praias fluviais que afloram na vazante e na seca dos rios, dos barrancos e dos terreiros de comunidades ribeirinhas, além de tanques de areia, quintais e áreas embaixo de casas suspensas. As praias de rio, muito frequentadas por crianças no período da seca e utilizadas também por animais, são cenário clássico da transmissão no Amazonas. A doença é autolimitada, mas o prurido intenso provoca escoriação e infecção bacteriana secundária, perda de sono e afastamento escolar. Também é frequente entre crianças que brincam em areia de construção e em barrancos próximos a moradias com cães sem cuidado veterinário.',
    agente: 'Larvas filariformes de ancilostomídeos de animais, principalmente Ancylostoma braziliense e Ancylostoma caninum, parasitas do intestino de cães e gatos. O ser humano é hospedeiro acidental e a larva não consegue atravessar a membrana basal, permanecendo confinada à epiderme.',
    transmissao: 'Contato direto da pele com solo ou areia contaminados por fezes de cães e gatos infectados, onde os ovos eclodem e as larvas se tornam infectantes em poucos dias em ambiente quente e úmido. Não há transmissão entre pessoas. Sentar, deitar ou andar descalço em areia de praia de rio, terreiro sombreado ou embaixo de casas suspensas são as situações de maior risco.',
    incubacao: 'A penetração provoca prurido e pápula em horas; o trajeto migratório característico costuma aparecer entre 1 e 5 dias após a exposição, podendo demorar semanas em alguns casos.',
    manifestacoes: [
      'Prurido intenso no local da penetração, frequentemente com piora noturna, que é a queixa dominante e causa perda de sono.',
      'Pápula ou vesícula eritematosa inicial no ponto de entrada.',
      'Lesão linear ou serpiginosa, discretamente elevada, eritematosa, com trajeto sinuoso que avança alguns milímetros a poucos centímetros por dia, conferindo o aspecto de mapa que dá origem ao nome popular.',
      'Localização preferencial em pés, espaços interdigitais, calcanhares, tornozelos, pernas, nádegas, coxas e, em lactentes e crianças pequenas, também em abdome, dorso e região genital, conforme a área que teve contato com o solo.',
      'Lesões múltiplas e agrupadas quando houve contato extenso, por exemplo ao sentar ou deitar diretamente na areia.',
      'Escoriações por coçadura, com crostas e, com frequência, impetiginização secundária.',
      'Vesículas e bolhas ao longo do trajeto em parte dos casos.',
      'Foliculite por larva migrans, com pápulas e pústulas foliculares, em áreas de contato prolongado, como nádegas.',
      'Edema local e, quando há infecção secundária, eritema em expansão, pus, linfangite, adenomegalia e febre.',
      'Evolução autolimitada em semanas a poucos meses, com a morte espontânea da larva, mas com desconforto prolongado se não tratada.',
      'Síndrome de Loeffler com eosinofilia e infiltrado pulmonar transitório é rara e descrita em infestações maciças.'
    ],
    sinaisAlarme: [
      'Febre, eritema em expansão, pústulas, secreção purulenta, linfangite ou adenomegalia dolorosa (infecção bacteriana secundária).',
      'Celulite extensa ou abscesso.',
      'Lesões muito numerosas ou extensas, com prurido incapacitante e perda importante de sono.',
      'Localização periorbitária, genital ou em mucosa.',
      'Tosse, dispneia e eosinofilia acentuada (suspeita de síndrome de Loeffler).',
      'Criança imunossuprimida, desnutrida ou com dermatite atópica extensa.',
      'Lesão que não regride após tratamento adequado ou que muda de aspecto, exigindo reavaliação diagnóstica.',
      'Escoriações profundas com risco de tétano em criança com vacinação incompleta.'
    ],
    diagnosticoDiferencial: ['escabiose_impetigo', 'tungiase', 'miiase', 'larva currens por Strongyloides stercoralis (trajeto muito mais rápido, em região perianal e tronco)', 'dermatite de contato', 'urticária e dermografismo', 'tinea corporis', 'picadas de inseto agrupadas (estrófulo)', 'granuloma anular', 'eritema migratório', 'fitofotodermatose'],
    exames: ['diagnóstico clínico pelo trajeto serpiginoso característico', 'dermatoscopia (auxiliar, quando disponível)', 'hemograma com contagem de eosinófilos', 'cultura de secreção da lesão (se infecção secundária)', 'pcr', 'radiografia_torax (apenas se sintomas respiratórios e eosinofilia acentuada)', 'exame_parasitologico_fezes (avaliação de parasitoses associadas)', 'biópsia de pele (apenas em casos atípicos ou dúvida diagnóstica)'],
    criteriosDiagnosticos: [
      'Diagnóstico eminentemente clínico: lesão linear ou serpiginosa, pruriginosa, com progressão diária visível, em criança com história de contato com areia ou solo, especialmente praia de rio, terreiro ou área sombreada com presença de cães e gatos.',
      'A progressão do trajeto entre um dia e outro, que pode ser marcada com caneta na pele para demonstração, confirma a suspeita clínica.',
      'Não há necessidade de exames laboratoriais na apresentação típica; eosinofilia pode estar presente mas não é obrigatória.',
      'Diferenciar da larva currens do Strongyloides stercoralis, cujo trajeto avança vários centímetros por hora, é predominantemente perianal e de tronco e associa-se a estrongiloidíase sistêmica.',
      'Identificar e registrar sinais de infecção bacteriana secundária, principal complicação.',
      'Biópsia é desnecessária e habitualmente não encontra a larva, pois esta costuma estar à frente do trajeto visível.',
      'Investigar exposição comum entre irmãos e colegas, pois surtos familiares e escolares após ida a praia de rio são frequentes.',
      'Avaliar a situação vacinal antitetânica quando houver escoriações profundas.'
    ],
    classificacaoGravidade: [
      { nivel: 'Leve', criterios: 'Uma ou poucas lesões, prurido tolerável, sem infecção secundária. Tratamento antiparasitário tópico ou oral conforme disponibilidade, controle do prurido e orientação preventiva.' },
      { nivel: 'Moderada', criterios: 'Lesões múltiplas, prurido intenso com perda de sono, escoriações extensas ou impetiginização localizada. Tratamento antiparasitário sistêmico, antibiótico para a infecção secundária e controle rigoroso do prurido.' },
      { nivel: 'Grave', criterios: 'Infestação extensa com dezenas de trajetos, celulite, abscesso, linfangite, febre, foliculite extensa, ou manifestações sistêmicas como síndrome de Loeffler. Internação quando houver infecção grave, antibiótico parenteral e avaliação especializada.' }
    ],
    tratamento: [
      'A doença é autolimitada, mas o tratamento está indicado para abreviar o curso, aliviar o prurido intenso e reduzir a escoriação e a infecção bacteriana secundária.',
      'Albendazol por via oral é a opção mais utilizada e eficaz, em curso curto, conforme o protocolo do serviço e a bula, respeitando os critérios de idade e peso.',
      'Ivermectina por via oral em dose única é alternativa eficaz, habitualmente restrita a crianças com peso igual ou superior a 15 kg, conforme os critérios do Ministério da Saúde e a bula; pode ser repetida conforme avaliação.',
      'Tiabendazol tópico pode ser considerado em lesões localizadas e poucas, especialmente em crianças menores nas quais o tratamento sistêmico é limitado, conforme disponibilidade, protocolo do serviço e bula.',
      'Mebendazol tem eficácia inferior na larva migrans cutânea e não é a escolha preferencial.',
      'Controle do prurido: anti-histamínico oral conforme bula, compressas frias, hidratação da pele e corte das unhas, medidas essenciais para reduzir a escoriação.',
      'Corticoide tópico de baixa potência pode ser associado por curto período para alívio da inflamação e do prurido, conforme avaliação e protocolo do serviço.',
      'Não usar querosene, óleo diesel, cal, creolina, fumo, folhas maceradas ou qualquer substância cáustica sobre as lesões, práticas relatadas na região e causadoras de queimadura química.',
      'Não tentar retirar a larva com agulha ou objeto cortante: a larva costuma estar à frente da extremidade visível do trajeto e o procedimento apenas fere a pele e favorece infecção.',
      'Antibioticoterapia sistêmica quando houver impetiginização, celulite ou abscesso, com cobertura para estafilococos e estreptococos.',
      'Profilaxia antitetânica conforme a situação vacinal e o tipo de lesão, especialmente quando houver escoriações profundas.',
      'Higiene local com água e sabão e curativos quando houver lesões escoriadas ou infectadas.',
      'Avaliar e tratar outras crianças da casa ou da turma expostas ao mesmo local, e orientar a comunidade sobre a área de risco identificada.',
      'Reavaliar em 7 dias: a ausência de resposta deve motivar revisão diagnóstica e novo curso de tratamento conforme protocolo.'
    ],
    medicamentos: [
      { medId: 'albendazol', esquema: 'Tratamento de escolha: 400 mg VO uma vez ao dia por 3 a 5 dias (ou 10 a 15 mg/kg/dia, máximo 400 mg/dia, em crianças menores), conforme protocolo do serviço e bula, respeitando os critérios de idade mínima. Confirmar conforme protocolo e bula.' },
      { medId: 'ivermectina', esquema: 'Alternativa: 200 microgramas/kg VO em dose única, podendo ser repetida após 1 a 2 semanas conforme avaliação. Uso habitualmente restrito a crianças com peso igual ou superior a 15 kg; confirmar indicação, peso mínimo e dose conforme protocolo do Ministério da Saúde e bula.' },
      { medId: null, nome: 'Tiabendazol tópico', esquema: 'Lesões poucas e localizadas, em especial em crianças pequenas: aplicação sobre o trajeto e alguns centímetros à frente dele, 2 a 3 vezes ao dia por 7 a 10 dias, conforme disponibilidade, protocolo do serviço e bula. Confirmar conforme protocolo.' },
      { medId: 'mebendazol', esquema: 'Eficácia inferior na larva migrans cutânea; não é a escolha preferencial. Uso apenas na indisponibilidade das opções anteriores, conforme protocolo do serviço e bula, confirmar conforme protocolo.' },
      { medId: null, nome: 'Anti-histamínico oral (por exemplo, hidroxizina ou dexclorfeniramina)', esquema: 'Controle do prurido: dose conforme idade, peso e bula, com atenção à sedação. Confirmar conforme protocolo e bula.' },
      { medId: null, nome: 'Corticoide tópico de baixa potência (por exemplo, hidrocortisona 1%)', esquema: 'Alívio da inflamação e do prurido por curto período, associado ao antiparasitário, conforme avaliação e bula. Confirmar conforme protocolo.' },
      { medId: 'cefalexina', esquema: 'Infecção bacteriana secundária (impetiginização, celulite): 50 a 100 mg/kg/dia VO dividida a cada 6 horas por 7 a 10 dias, conforme protocolo.' },
      { medId: 'amoxicilina_clavulanato', esquema: 'Infecção secundária extensa ou falha da cefalexina: 45 a 50 mg/kg/dia do componente amoxicilina VO dividida 12/12 h, conforme protocolo do serviço.' },
      { medId: 'paracetamol', esquema: 'Dor ou desconforto: 10 a 15 mg/kg/dose VO a cada 6 horas, conforme bula.' },
      { medId: 'soro_fisiologico', esquema: 'Limpeza das lesões escoriadas e curativos com SF 0,9%.' },
      { medId: null, nome: 'Vacina antitetânica (dT ou dTpa)', esquema: 'Atualização conforme a situação vacinal, especialmente quando houver escoriações profundas, segundo as orientações do Ministério da Saúde.' }
    ],
    criteriosInternacao: [
      'Celulite extensa, abscesso ou linfangite ascendente.',
      'Febre, calafrios ou toxemia associadas à infecção secundária.',
      'Lesões extremamente numerosas com prurido incapacitante e escoriações extensas infectadas.',
      'Manifestações sistêmicas como síndrome de Loeffler com desconforto respiratório.',
      'Criança imunossuprimida, desnutrida grave ou com dermatite atópica extensa e infecção associada.',
      'Impossibilidade de tratamento e de reavaliação no território, em comunidades distantes.'
    ],
    criteriosUTI: [
      'Sepse ou choque séptico secundário à infecção cutânea.',
      'Infecção necrosante de partes moles com instabilidade hemodinâmica.',
      'Insuficiência respiratória em síndrome de Loeffler grave ou em infestação maciça.',
      'Tétano com espasmos generalizados ou comprometimento respiratório.'
    ],
    criteriosAlta: [
      'Ausência de febre e de sinais de infecção bacteriana em progressão.',
      'Prurido controlado, permitindo sono adequado.',
      'Tratamento antiparasitário iniciado e esquema compreendido pelo responsável.',
      'Lesões escoriadas limpas e com plano de curativo definido.',
      'Profilaxia antitetânica avaliada e registrada.',
      'Família orientada sobre a fonte provável de exposição e sobre as medidas de prevenção.',
      'Irmãos e colegas expostos avaliados quando indicado.',
      'Retorno agendado em 7 dias para verificar a interrupção da progressão dos trajetos.'
    ],
    orientacoes: [
      'A lesão é causada por uma larva de verme de cachorro ou gato que anda debaixo da pele; ela não passa de pessoa para pessoa e não vai para dentro do corpo.',
      'Não tentar tirar a larva com agulha, alfinete ou faca: ela está sempre um pouco à frente da ponta do caminho que se vê, e furar a pele só machuca e infecciona.',
      'Não passar querosene, óleo diesel, creolina, cal, fumo, folhas ou qualquer produto forte na pele: queima e piora a lesão.',
      'Dar o remédio conforme a prescrição e usar o que foi indicado para a coceira; a coceira costuma melhorar em poucos dias.',
      'Cortar bem as unhas da criança e manter as mãos limpas para evitar que a coceira vire ferida infeccionada.',
      'Lavar a pele com água e sabão e manter as feridas cobertas quando houver escoriação.',
      'Para prevenir: não sentar nem deitar direto na areia da praia do rio, no barranco ou no terreiro; usar esteira, lona ou toalha grossa, e usar calçado fechado ou chinelo.',
      'Evitar que a criança brinque em areia onde cães e gatos costumam defecar, inclusive embaixo da casa e nas áreas sombreadas do quintal.',
      'Levar cães e gatos da casa para vermifugação regular sempre que houver essa possibilidade, e recolher as fezes dos animais do terreiro.',
      'Voltar em 7 dias para reavaliação, ou antes se aparecer febre, vermelhidão que aumenta, pus, inchaço, íngua dolorida ou listras vermelhas na pele.',
      'Se outras crianças da casa ou da escola estiveram no mesmo lugar e apareceram com lesões parecidas, levá-las também à unidade de saúde.'
    ],
    retorno: 'Reavaliação em 7 dias para confirmar a interrupção da progressão dos trajetos e a melhora do prurido; nas lesões infectadas, reavaliação em 48 a 72 horas. Ausência de resposta ao tratamento deve motivar revisão diagnóstica, considerando larva currens por Strongyloides stercoralis e outras dermatoses, e novo curso terapêutico conforme protocolo.',
    prevencao: [
      'Evitar contato direto da pele com areia e solo sombreado e úmido em praias de rio, barrancos, terreiros e áreas embaixo de casas suspensas.',
      'Usar esteira, lona ou toalha grossa para sentar e deitar na praia e usar calçado fechado ou chinelo ao caminhar nessas áreas.',
      'Recolher e dar destino adequado às fezes de cães e gatos no terreiro e nas áreas de brincadeira das crianças.',
      'Vermifugação periódica de cães e gatos domiciliados, conforme orientação veterinária disponível.',
      'Impedir o acesso de animais a tanques de areia, praias utilizadas por crianças e áreas de recreação escolar, cobrindo caixas de areia quando não estiverem em uso.',
      'Manter o terreiro limpo, varrido e sem acúmulo de areia e matéria orgânica em áreas sombreadas.',
      'Orientação comunitária durante a seca e a vazante, quando as praias de rio afloram e o número de casos aumenta.',
      'Educação em saúde nas escolas ribeirinhas sobre a forma de transmissão e sobre o abandono das práticas caseiras cáusticas.',
      'Manutenção do calendário vacinal antitetânico atualizado.'
    ],
    fontes: [
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
      { nome: 'OPAS/OMS – Doenças tropicais negligenciadas relacionadas à pele', ano: 2022 },
      { nome: 'Nelson Textbook of Pediatrics, 22ª edição', ano: 2024 },
      { nome: 'Tratado de Pediatria – Sociedade Brasileira de Pediatria', ano: 2022 }
    ],
    atualizadoEm: '2026-09'
  }

];
