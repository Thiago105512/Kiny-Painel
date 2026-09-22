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

];
