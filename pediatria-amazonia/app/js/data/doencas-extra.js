window.PED = window.PED || {}; var PED = window.PED; PED.data = PED.data || {};
// Base complementar de doenças – apoio à decisão em pediatria (ênfase Amazonas)
// Contrato: app/js/data/CONTRATO.md (PED.data.doencas). Este arquivo é concatenado em PED.data.doencas.
// Conteúdo de apoio à decisão clínica. Confirmar sempre conforme protocolo vigente e bula.

PED.data.doencasExtra = [

  // =====================================================================
  // EXANTEMÁTICAS E INFECCIOSAS GERAIS
  // =====================================================================
  {
    id: 'sarampo',
    nome: 'Sarampo',
    categoria: 'infecciosa',
    amazonia: false,
    cid10: 'B05',
    tags: ['febre', 'exantema', 'tosse', 'coriza', 'conjuntivite', 'dispneia', 'diarreia', 'fraqueza', 'linfonodomegalia', 'alteracao_consciencia'],
    definicao: 'Doença exantemática viral aguda, altamente contagiosa, caracterizada por febre alta, tosse, coriza, conjuntivite (triade catarral), enantema com manchas de Koplik e exantema maculopapular morbiliforme de progressão craniocaudal. Evolui com imunossupressão transitória, o que explica as complicações bacterianas e a letalidade em desnutridos e lactentes.',
    epidemiologia: 'O Brasil perdeu o certificado de eliminação do sarampo em 2019 após surtos sustentados iniciados no Amazonas e em Roraima, com transmissão associada ao fluxo migratório e a bolsões de baixa cobertura vacinal. Manaus e municípios do interior registraram milhares de casos, com óbitos concentrados em menores de 1 ano e desnutridos. A cobertura da triplice viral em muitos municípios amazônicos permanece abaixo da meta de 95%, e populações indígenas, ribeirinhas e de difícil acesso têm risco elevado de surto explosivo. Considerar sarampo em toda criança com febre e exantema, sobretudo com história de viagem, contato com caso suspeito ou vacinação incompleta.',
    agente: 'Vírus do sarampo (Morbillivirus, família Paramyxoviridae), RNA vírus de genótipo único sorologicamente, com alta transmissibilidade (R0 de 12 a 18).',
    transmissao: 'Via aérea, por aerossóis e gotículas respiratórias, com o vírus permanecendo suspenso no ar por até 2 horas em ambiente fechado. O período de transmissibilidade vai de 4 a 6 dias antes até 4 dias após o aparecimento do exantema (em imunossuprimidos, enquanto durar a doença).',
    incubacao: '7 a 21 dias, em média 10 dias até o início da febre e cerca de 14 dias até o exantema.',
    manifestacoes: [
      'Fase prodrômica ou catarral de 2 a 4 dias: febre alta (frequentemente acima de 38,5 a 40 graus), tosse seca intensa, coriza e conjuntivite com fotofobia, com aspecto de criança muito toxemiada.',
      'Manchas de Koplik: pontos brancos ou branco-azulados sobre base eritematosa na mucosa jugal, junto aos molares, 1 a 2 dias antes do exantema e desaparecendo em 2 a 3 dias; achado muito sugestivo quando presente.',
      'Exantema maculopapular morbiliforme, não pruriginoso, iniciando na região retroauricular e na linha de implantação dos cabelos, com progressão craniocaudal em 3 dias e tendência à confluência em face e tronco.',
      'A febre costuma persistir durante os primeiros 2 a 3 dias do exantema; febre que reaparece ou persiste após o 3º a 4º dia de exantema sugere complicação bacteriana.',
      'Descamação furfurácea fina na fase de convalescença, com escurecimento residual das lesões.',
      'Linfonodomegalia cervical e occipital, diarreia e vômitos com desidratação, sobretudo em lactentes e desnutridos.',
      'Complicações: otite média aguda (a mais frequente), pneumonia viral ou bacteriana secundária (principal causa de óbito), laringotraqueobronquite, diarreia, ceratite e ulcera de córnea por hipovitaminose A, encefalite aguda (cerca de 1 em 1.000 casos) e, tardiamente, panencefalite esclerosante subaguda.'
    ],
    sinaisAlarme: [
      'Desconforto respiratório, taquipneia, tiragem, gemência ou saturação abaixo de 92% (pneumonia).',
      'Estridor em repouso ou rouquidão intensa (laringotraqueíte).',
      'Convulsão, sonolência, irritabilidade extrema, rigidez de nuca ou alteração do nível de consciência (encefalite).',
      'Febre que persiste ou reaparece após o 3º a 4º dia do exantema.',
      'Incapacidade de beber ou mamar, vômitos persistentes e sinais de desidratação.',
      'Dor ocular, fotofobia intensa, opacidade ou ulceração de córnea, olhos secos (xeroftalmia).',
      'Desnutrição grave, imunossupressão ou idade menor de 12 meses.',
      'Exantema hemorrágico ou petéquias (sarampo hemorrágico, forma grave e rara).'
    ],
    diagnosticoDiferencial: ['rubeola', 'exantema_subito', 'eritema_infeccioso', 'escarlatina', 'mononucleose', 'dengue', 'zika', 'chikungunya', 'mao_pe_boca', 'farmacodermia e síndrome de hipersensibilidade a drogas', 'doença de Kawasaki', 'riquetsioses'],
    exames: ['sorologia IgM e IgG para sarampo (coleta na primeira consulta, do 1º ao 30º dia do exantema)', 'RT-PCR para sarampo em urina e swab de nasofaringe ou orofaringe (coletar até o 7º dia do exantema, ideal até o 5º)', 'hemograma', 'pcr', 'radiografia_torax', 'sorologia_dengue', 'sorologia_arboviroses', 'eletrolitos', 'liquor'],
    criteriosDiagnosticos: [
      'Caso suspeito (definição do Ministério da Saúde): toda pessoa com febre e exantema maculopapular, acompanhados de tosse ou coriza ou conjuntivite, independentemente da idade e da situação vacinal.',
      'Notificação imediata, em até 24 horas, à vigilância epidemiológica municipal, estadual e federal; não aguardar a confirmação laboratorial.',
      'Coletar amostra de sangue para sorologia no primeiro atendimento e amostras de urina e secreção respiratória para identificação viral (genotipagem), conforme orientação da vigilância.',
      'IgM reagente em paciente vacinado nos últimos 30 dias exige investigação de reação vacinal versus doença, com discussão junto à vigilância e genotipagem.',
      'Quadro clínico compatível com vínculo epidemiológico a caso confirmado também define caso, conforme critério da vigilância.',
      'Linguagem de apoio à decisão: registrar caso compatível com sarampo, mantendo a confirmação conforme protocolo de vigilância.'
    ],
    classificacaoGravidade: [
      { nivel: 'Não complicado', criterios: 'Criança maior de 1 ano, eutrófica, hidratada, sem desconforto respiratório, sem sinais oculares e aceitando líquidos. Manejo domiciliar com vitamina A, sintomáticos, isolamento e reavaliação programada.' },
      { nivel: 'Complicado', criterios: 'Otite média aguda, pneumonia, diarreia com desidratação, laringotraqueíte, xeroftalmia ou febre persistente após o 3º dia de exantema. Internação ou observação, antibiótico conforme a complicação e vitamina A.' },
      { nivel: 'Grave ou muito grave', criterios: 'Insuficiência respiratória, estridor em repouso, convulsão ou alteração de consciência, desidratação grave, desnutrição grave, imunossupressão, lesão de córnea ou sarampo hemorrágico. Internação imediata e avaliação de UTI.' }
    ],
    tratamento: [
      'Não existe antiviral específico: o tratamento é de suporte, com hidratação, nutrição, controle da febre e tratamento precoce das complicações.',
      'Administrar vitamina A para TODA criança com sarampo, independentemente do estado nutricional, no dia do diagnóstico e repetir no dia seguinte (duas doses), conforme o Ministério da Saúde e a OMS: menores de 6 meses 50.000 UI, de 6 a 11 meses 100.000 UI e a partir de 12 meses 200.000 UI, por via oral. Em criança com sinais oculares de deficiência de vitamina A, repetir uma terceira dose 4 a 6 semanas depois, conforme protocolo.',
      'Isolamento respiratório para aerossóis desde a suspeita até 4 dias após o início do exantema (enquanto durar a doença em imunossuprimidos); em hospital, quarto privativo com porta fechada e máscara N95 ou PFF2 para os profissionais.',
      'Antitérmico e analgesia com paracetamol ou dipirona; evitar ácido acetilsalicílico.',
      'Hidratação oral com sais de reidratação oral; fluidos intravenosos apenas se a via oral for insuficiente ou houver desidratação grave.',
      'Manter aleitamento materno e alimentação; ofertar refeições fracionadas e acompanhar o peso, pois o sarampo precipita desnutrição.',
      'Antibiótico apenas para complicação bacteriana documentada ou fortemente suspeita: amoxicilina para otite média aguda e pneumonia não grave, penicilina cristalina ou ceftriaxona para pneumonia grave; não usar antibiótico profilático de rotina.',
      'Oxigênio suplementar se saturação abaixo de 92% e suporte ventilatório conforme a gravidade.',
      'Cuidados oculares: limpeza com soro fisiológico, colírio ou pomada antibiótica se conjuntivite purulenta ou lesão de córnea, com avaliação oftalmológica quando disponível.',
      'Bloqueio vacinal em até 72 horas da exposição para contatos suscetíveis a partir de 6 meses de idade; imunoglobulina humana normal em até 6 dias para menores de 6 meses, gestantes e imunossuprimidos, conforme o CRIE e a vigilância.',
      'Busca ativa de contatos, avaliação da situação vacinal e vacinação de bloqueio na comunidade, escola ou unidade de saúde.'
    ],
    medicamentos: [
      { medId: 'vitamina_a', esquema: 'Para todos os casos, VO, no diagnóstico e repetir no dia seguinte: menores de 6 meses 50.000 UI por dose; 6 a 11 meses 100.000 UI por dose; 12 meses ou mais 200.000 UI por dose. Terceira dose em 4 a 6 semanas se houver sinais oculares de deficiência, conforme protocolo do MS.' },
      { medId: 'paracetamol', esquema: 'Febre e dor: 10 a 15 mg/kg/dose VO a cada 6 horas, conforme bula.' },
      { medId: 'dipirona', esquema: 'Alternativa antitérmica: 10 a 15 mg/kg/dose VO ou IV a cada 6 horas, conforme bula.' },
      { medId: 'sais_reidratacao_oral', esquema: 'Reidratação e manutenção nas perdas por diarreia e vômitos, conforme o plano A ou B do AIDPI.' },
      { medId: 'amoxicilina', esquema: 'Complicação bacteriana (otite média aguda ou pneumonia não grave): 50 mg/kg/dia VO dividida 8/8 h ou 12/12 h (até 80 a 90 mg/kg/dia conforme diretriz), por 7 a 10 dias.' },
      { medId: 'ceftriaxona', esquema: 'Pneumonia grave ou complicação bacteriana grave: 50 a 100 mg/kg/dia IV, 1 vez ao dia ou 12/12 h, conforme protocolo.' },
      { medId: 'soro_fisiologico', esquema: 'Higiene ocular e nasal; expansão volêmica 10 a 20 mL/kg IV em desidratação grave ou choque, conforme protocolo.' },
      { medId: null, nome: 'Imunoglobulina humana normal', esquema: 'Profilaxia pós-exposição em até 6 dias para menores de 6 meses, gestantes suscetíveis e imunossuprimidos, dose e via conforme o manual do CRIE do Ministério da Saúde; confirmar conforme protocolo.' }
    ],
    criteriosInternacao: [
      'Menores de 12 meses com quadro toxemiado ou qualquer complicação.',
      'Pneumonia, laringotraqueíte com estridor em repouso ou saturação abaixo de 92%.',
      'Desidratação moderada ou grave, vômitos incoercíveis ou recusa alimentar.',
      'Desnutrição grave ou imunossupressão.',
      'Sinais neurológicos: convulsão, sonolência, rigidez de nuca.',
      'Lesão ocular com risco de ceratomalácia.',
      'Impossibilidade de isolamento domiciliar adequado, vulnerabilidade social ou dificuldade de retorno (comunidades distantes, ribeirinhas ou indígenas).'
    ],
    criteriosUTI: [
      'Insuficiência respiratória com necessidade de ventilação não invasiva ou mecânica.',
      'Estridor com obstrução grave de via aérea sem resposta ao tratamento inicial.',
      'Encefalite com rebaixamento do nível de consciência, estado de mal epiléptico ou sinais de hipertensão intracraniana.',
      'Choque séptico ou instabilidade hemodinâmica.',
      'Sarampo hemorrágico ou coagulopatia.'
    ],
    criteriosAlta: [
      'Afebril ou em queda da febre por 24 a 48 horas, sem sinais de complicação em evolução.',
      'Aceitação oral de líquidos e alimentos, hidratação adequada.',
      'Saturação igual ou maior que 92% em ar ambiente e sem desconforto respiratório.',
      'Duas doses de vitamina A administradas e registradas.',
      'Responsável orientado sobre isolamento domiciliar até o 4º dia do exantema, sinais de alarme e retorno.',
      'Caso notificado, amostras coletadas e contatos avaliados pela vigilância.'
    ],
    orientacoes: [
      'Manter a criança em casa, sem escola, creche ou visitas, até 4 dias após o início das manchas; evitar contato com bebês menores de 1 ano, gestantes e pessoas com imunidade baixa.',
      'Oferecer líquidos com frequência e manter o peito ou a alimentação habitual em pequenas porções.',
      'Ambiente arejado e com pouca luz se houver fotofobia; limpar os olhos com soro fisiológico.',
      'Não usar ácido acetilsalicílico; usar somente os antitérmicos orientados.',
      'Retornar imediatamente se respiração rápida ou difícil, chiado ou barulho ao respirar, lábios roxos, recusa de líquidos, vômitos repetidos, sonolência, convulsão, dor ou mancha no olho, ou se a febre voltar depois de melhorar.',
      'Levar o cartão de vacina de todos os moradores da casa à unidade de saúde para atualização.'
    ],
    retorno: 'Reavaliação clínica em 24 a 48 horas nos casos não complicados (em 24 horas se menor de 1 ano ou desnutrido) e retorno imediato diante de qualquer sinal de alarme; nova consulta ao final do quadro para avaliar peso, estado nutricional e atualização vacinal.',
    prevencao: [
      'Vacinação: triplice viral aos 12 meses e tetraviral (ou triplice viral mais varicela) aos 15 meses, com duas doses até os 29 anos conforme o calendário do Ministério da Saúde.',
      'Dose zero da triplice viral a partir dos 6 meses em situação de surto ou viagem para área de transmissão; essa dose não substitui as doses do calendário.',
      'Vacinação de bloqueio de contatos suscetíveis em até 72 horas da exposição e busca ativa de faltosos.',
      'Imunoglobulina humana normal em até 6 dias para contatos suscetíveis com contraindicação à vacina, conforme o CRIE.',
      'Manutenção de coberturas vacinais acima de 95% em todos os municípios, com atenção a comunidades indígenas, ribeirinhas e de difícil acesso.',
      'Isolamento respiratório de casos suspeitos e uso de máscara N95 ou PFF2 pelos profissionais durante o atendimento.',
      'Notificação imediata e investigação de todos os casos suspeitos.'
    ],
    fontes: [
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
      { nome: 'Nota Técnica e Manual de Vigilância do Sarampo – Ministério da Saúde', ano: 2023 },
      { nome: 'OMS – Measles vaccines: WHO position paper', ano: 2017 },
      { nome: 'Sociedade Brasileira de Pediatria – Documento Científico sobre Sarampo', ano: 2019 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'rubeola',
    nome: 'Rubéola',
    categoria: 'infecciosa',
    amazonia: false,
    cid10: 'B06',
    tags: ['febre', 'exantema', 'linfonodomegalia', 'artralgia', 'conjuntivite', 'coriza', 'cefaleia', 'fraqueza'],
    definicao: 'Doença exantemática viral aguda, geralmente benigna na infância, caracterizada por exantema maculopapular róseo, febre baixa e linfonodomegalia retroauricular, occipital e cervical posterior. Sua importância maior está no risco de síndrome da rubéola congênita quando a infecção ocorre na gestação.',
    epidemiologia: 'O Brasil recebeu em 2015 o certificado de eliminação da rubéola e da síndrome da rubéola congênita nas Américas, mas a queda da cobertura da triplice viral e a circulação do vírus em outros países mantêm o risco de reintrodução. No Amazonas, a mobilidade fluvial e fronteiriça e bolsões de baixa cobertura vacinal tornam essencial notificar e investigar todo caso de febre e exantema. Adolescentes e mulheres em idade fértil não vacinadas são o grupo de maior preocupação.',
    agente: 'Vírus da rubéola (gênero Rubivirus, família Matonaviridae), RNA vírus.',
    transmissao: 'Gotículas respiratórias e contato direto com secreções nasofaríngeas; transmissão vertical transplacentária na gestação. Transmissibilidade de 5 a 7 dias antes até 5 a 7 dias após o início do exantema; lactentes com rubéola congênita eliminam vírus por meses.',
    incubacao: '14 a 21 dias, em média 17 dias.',
    manifestacoes: [
      'Pródromo curto e discreto ou ausente em crianças: febre baixa, mal-estar, coriza leve, conjuntivite sem secreção e cefaleia.',
      'Linfonodomegalia retroauricular, occipital e cervical posterior, dolorosa, surgindo 1 a 2 dias antes do exantema e podendo persistir por semanas; é o sinal mais característico.',
      'Exantema maculopapular róseo, de lesões menores e menos confluentes que as do sarampo, com início na face e progressão craniocaudal rápida, durando cerca de 3 dias.',
      'Enantema com petéquias no palato mole (manchas de Forchheimer), achado inespecífico.',
      'Artralgia e artrite, sobretudo em adolescentes do sexo feminino, acometendo pequenas articulações das mãos, punhos e joelhos, com resolução em dias a semanas.',
      'Criança geralmente em bom estado geral, com toxemia muito menor que no sarampo.',
      'Complicações raras: púrpura trombocitopênica, encefalite e artrite persistente.'
    ],
    sinaisAlarme: [
      'Sangramento, petéquias ou equimoses (púrpura trombocitopênica pós-infecciosa).',
      'Convulsão, sonolência, cefaleia intensa ou alteração do nível de consciência (encefalite).',
      'Febre alta e toxemia importante, que apontam para outro diagnóstico (considerar sarampo, dengue ou infecção bacteriana).',
      'Contato de gestante suscetível com o caso, situação que exige avaliação e sorologia imediatas da gestante.',
      'Recém-nascido com baixo peso, catarata, surdez, cardiopatia ou hepatoesplenomegalia (investigar rubéola congênita).'
    ],
    diagnosticoDiferencial: ['sarampo', 'exantema_subito', 'eritema_infeccioso', 'escarlatina', 'mononucleose', 'dengue', 'zika', 'chikungunya', 'enteroviroses', 'farmacodermia'],
    exames: ['sorologia IgM e IgG para rubéola (coleta no primeiro atendimento)', 'RT-PCR para rubéola em swab de nasofaringe e urina até o 5º dia do exantema', 'hemograma', 'pcr', 'sorologia_dengue', 'sorologia_arboviroses', 'coagulograma'],
    criteriosDiagnosticos: [
      'Caso suspeito (Ministério da Saúde): toda pessoa com febre e exantema maculopapular acompanhado de linfonodomegalia retroauricular, occipital ou cervical, independentemente da idade e do estado vacinal.',
      'Notificação imediata em até 24 horas à vigilância epidemiológica; a investigação de febre com exantema é integrada entre sarampo e rubéola.',
      'Coletar sorologia no primeiro contato e amostras para identificação viral conforme orientação da vigilância.',
      'O diagnóstico clínico isolado é pouco confiável, pois muitos exantemas virais são indistinguíveis; a confirmação é laboratorial.',
      'Em contato de gestante, avaliar a sorologia da gestante com urgência, pois a conduta obstétrica depende do resultado.',
      'Registrar como quadro compatível com rubéola, mantendo confirmação conforme protocolo de vigilância.'
    ],
    classificacaoGravidade: [
      { nivel: 'Não complicada', criterios: 'Criança em bom estado geral, febre baixa, exantema e linfonodomegalia, sem sangramento ou sinal neurológico. Manejo domiciliar com sintomáticos, afastamento e notificação.' },
      { nivel: 'Com complicação', criterios: 'Artrite significativa, plaquetopenia com sangramento cutâneo ou mucoso. Avaliação laboratorial e observação, com internação conforme a intensidade.' },
      { nivel: 'Grave', criterios: 'Encefalite, púrpura com sangramento importante ou plaquetopenia grave. Internação imediata e suporte especializado.' }
    ],
    tratamento: [
      'Não há antiviral específico: o tratamento é sintomático e de suporte.',
      'Antitérmico e analgesia com paracetamol ou dipirona; ibuprofeno pode ser considerado para artralgia em criança sem plaquetopenia e sem suspeita de dengue.',
      'Repouso relativo, hidratação e alimentação habitual.',
      'Isolamento respiratório por gotículas por 7 dias após o início do exantema; afastamento de escola e creche pelo mesmo período.',
      'Afastar rigorosamente o contato do caso com gestantes, especialmente no primeiro trimestre.',
      'Investigar e notificar; realizar bloqueio vacinal dos contatos suscetíveis conforme a vigilância.',
      'Plaquetopenia com sangramento: avaliação hematológica e conduta conforme protocolo; evitar anti-inflamatórios não esteroidais nesse contexto.',
      'Encefalite: internação, suporte neurológico e controle de convulsões conforme protocolo.'
    ],
    medicamentos: [
      { medId: 'paracetamol', esquema: 'Febre e dor: 10 a 15 mg/kg/dose VO a cada 6 horas, conforme bula.' },
      { medId: 'dipirona', esquema: 'Alternativa antitérmica: 10 a 15 mg/kg/dose VO ou IV a cada 6 horas, conforme bula.' },
      { medId: 'ibuprofeno', esquema: 'Artralgia ou artrite, apenas se afastada plaquetopenia e dengue: 5 a 10 mg/kg/dose VO a cada 6 a 8 horas, conforme bula.' },
      { medId: null, nome: 'Vacina triplice viral (bloqueio)', esquema: 'Bloqueio vacinal de contatos suscetíveis a partir de 12 meses (ou dose zero a partir de 6 meses em surto), conforme orientação da vigilância; contraindicada em gestantes e imunossuprimidos.' }
    ],
    criteriosInternacao: [
      'Plaquetopenia com sangramento ativo ou púrpura extensa.',
      'Manifestação neurológica: convulsão, alteração de consciência, cefaleia intensa.',
      'Artrite incapacitante com dor não controlada em domicílio.',
      'Desidratação ou recusa alimentar mantida.',
      'Dúvida diagnóstica com quadro toxemiado, necessitando investigação de sarampo, dengue ou infecção bacteriana.'
    ],
    criteriosUTI: [
      'Encefalite com rebaixamento do nível de consciência ou estado de mal epiléptico.',
      'Sangramento grave com instabilidade hemodinâmica.',
      'Insuficiência respiratória ou necessidade de proteção de via aérea.'
    ],
    criteriosAlta: [
      'Melhora clínica, afebril e sem sinais de sangramento ou comprometimento neurológico.',
      'Aceitação oral adequada.',
      'Plaquetas em recuperação quando havia plaquetopenia, conforme avaliação.',
      'Responsável orientado sobre isolamento por 7 dias do exantema e sobre evitar contato com gestantes.',
      'Caso notificado e contatos avaliados pela vigilância.'
    ],
    orientacoes: [
      'Manter a criança em casa por 7 dias após o início das manchas, sem escola nem creche.',
      'Evitar de todo modo o contato com gestantes; avisar imediatamente qualquer gestante que tenha tido contato com a criança para que procure a unidade de saúde.',
      'Oferecer líquidos e manter a alimentação habitual.',
      'Retornar se surgirem manchas roxas ou sangramento na gengiva ou no nariz, sonolência, convulsão, dor de cabeça forte, dor ou inchaço nas articulações que impeça o movimento.',
      'Atualizar o cartão de vacina de todos os moradores da casa, em especial adolescentes e mulheres em idade fértil.'
    ],
    retorno: 'Reavaliação em 48 a 72 horas ou antes se surgirem sinais de alarme; retorno programado para conferência do resultado sorológico e atualização vacinal da família.',
    prevencao: [
      'Vacinação: triplice viral aos 12 meses e tetraviral aos 15 meses, com duas doses até os 29 anos conforme o calendário nacional.',
      'Vacinação de mulheres em idade fértil não gestantes, com orientação para evitar gravidez por 30 dias após a dose.',
      'Bloqueio vacinal de contatos suscetíveis, exceto gestantes e imunossuprimidos.',
      'Triagem sorológica no pré-natal e vacinação no puerpério das gestantes suscetíveis.',
      'Notificação imediata e investigação integrada de todo caso de febre com exantema.',
      'Isolamento por gotículas por 7 dias após o início do exantema.'
    ],
    fontes: [
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
      { nome: 'OPAS/OMS – Plano de ação para a eliminação do sarampo, rubéola e SRC nas Américas', ano: 2016 },
      { nome: 'Sociedade Brasileira de Pediatria – Tratado de Pediatria', ano: 2022 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'varicela',
    nome: 'Varicela (catapora)',
    categoria: 'infecciosa',
    amazonia: false,
    cid10: 'B01',
    tags: ['febre', 'exantema', 'lesoes_pele', 'prurido', 'feridas', 'cefaleia', 'fraqueza', 'dispneia', 'alteracao_consciencia'],
    definicao: 'Infecção primária pelo vírus varicela-zóster, caracterizada por exantema vesicular pruriginoso de aparecimento em surtos, com lesões em diferentes estágios evolutivos ao mesmo tempo (máculas, pápulas, vesículas, pústulas e crostas), acompanhada de febre. Em geral benigna em crianças saudáveis, mas com risco de infecção bacteriana secundária grave e complicações neurológicas e pulmonares.',
    epidemiologia: 'Doença de alta transmissibilidade, com surtos frequentes em creches e escolas. No Amazonas, surtos em comunidades indígenas e ribeirinhas podem ser explosivos por aglomeração domiciliar e baixa cobertura vacinal, com maior gravidade em desnutridos. A vacina varicela foi incorporada ao calendário do SUS na tetraviral aos 15 meses e em segunda dose aos 4 anos, reduzindo internações. As complicações bacterianas por Streptococcus pyogenes e Staphylococcus aureus, incluindo celulite, fasceíte necrosante e sepse, são a principal causa de internação, sobretudo em locais com dificuldade de higiene.',
    agente: 'Vírus varicela-zóster (VVZ, herpesvírus humano tipo 3).',
    transmissao: 'Via aérea por aerossóis e gotículas e por contato direto com o conteúdo das vesículas. Transmissibilidade de 1 a 2 dias antes do exantema até que todas as lesões estejam em crosta (em geral 5 a 7 dias).',
    incubacao: '10 a 21 dias, em média 14 a 16 dias; pode se estender até 28 dias após uso de imunoglobulina.',
    manifestacoes: [
      'Pródromo de febre baixa a moderada, mal-estar, cefaleia e inapetência por 24 a 48 horas, mais evidente em adolescentes.',
      'Exantema vesicular pruriginoso com início em couro cabeludo, face e tronco, de distribuição centrípeta, poupando relativamente as extremidades.',
      'Polimorfismo regional: presença simultânea de máculas, pápulas, vesículas de conteúdo claro (aspecto de gota de orvalho), pústulas e crostas na mesma área, achado característico.',
      'Aparecimento em surtos sucessivos por 3 a 5 dias, com febre acompanhando cada surto.',
      'Acometimento de mucosas oral, conjuntival e genital, com úlceras rasas e dolorosas.',
      'Prurido intenso, com escoriações que favorecem infecção bacteriana secundária.',
      'Complicações: impetiginização, celulite, abscesso, fasceíte necrosante e sepse; ataxia cerebelar aguda (em geral benigna); encefalite; pneumonia por varicela (mais comum em adolescentes, imunossuprimidos e lactentes); varicela hemorrágica; plaquetopenia; síndrome de Reye se uso de ácido acetilsalicílico.'
    ],
    sinaisAlarme: [
      'Lesão com eritema, calor, dor desproporcional, endurecimento ou secreção purulenta ao redor, ou febre que reaparece após 3 a 4 dias (infecção bacteriana secundária, celulite ou fasceíte).',
      'Toxemia, hipotensão, exantema escarlatiniforme ou taquicardia (suspeita de choque tóxico estreptocócico ou estafilocócico).',
      'Taquipneia, tosse, dor torácica ou saturação abaixo de 92% (pneumonia por varicela).',
      'Ataxia, alteração da marcha, convulsão, sonolência, rigidez de nuca ou confusão.',
      'Vesículas hemorrágicas, sangramento ou petéquias.',
      'Imunossupressão, uso de corticoide sistêmico, quimioterapia, recém-nascido ou menor de 1 ano.',
      'Vômitos persistentes com letargia (considerar síndrome de Reye se houve uso de ácido acetilsalicílico).'
    ],
    diagnosticoDiferencial: ['mao_pe_boca', 'escabiose_impetigo', 'herpes zóster disseminado', 'herpes simples disseminado', 'estrófulo e prurigo por picada de inseto', 'varíola dos macacos (mpox)', 'riquetsiose (febre maculosa)', 'farmacodermia bolhosa'],
    exames: ['hemograma', 'pcr', 'hemocultura', 'radiografia_torax', 'ast', 'alt', 'coagulograma', 'liquor', 'PCR para varicela-zóster em raspado de vesícula ou liquor (casos atípicos ou graves)', 'cultura de secreção de lesão infectada'],
    criteriosDiagnosticos: [
      'Diagnóstico eminentemente clínico: exantema vesicular pruriginoso, polimorfo, de distribuição centrípeta, com febre e história de contato nas 2 a 3 semanas anteriores.',
      'Exames laboratoriais não são necessários no caso típico; reservados para formas atípicas, graves, imunossuprimidos ou dúvida diagnóstica.',
      'Notificação de surtos (dois ou mais casos vinculados em instituição) e de casos graves internados, conforme a vigilância epidemiológica.',
      'Considerar infecção bacteriana secundária diante de febre que persiste ou retorna após o 3º ao 4º dia e de lesões com sinais flogísticos.',
      'Em imunossuprimidos e recém-nascidos, tratar como quadro potencialmente grave desde a suspeita, conforme protocolo.'
    ],
    classificacaoGravidade: [
      { nivel: 'Leve', criterios: 'Criança saudável maior de 1 ano, com lesões em número limitado, febre baixa e bom estado geral. Manejo domiciliar com sintomáticos, cuidados de pele e isolamento.' },
      { nivel: 'Moderada', criterios: 'Lesões numerosas ou em mucosas com dor, febre alta persistente, impetiginização localizada ou desidratação leve. Antibiótico tópico ou oral conforme indicação e reavaliação em 24 a 48 horas.' },
      { nivel: 'Grave', criterios: 'Celulite extensa, abscesso, suspeita de fasceíte necrosante, choque tóxico, pneumonia, encefalite, varicela hemorrágica, imunossupressão, recém-nascido ou lactente jovem. Internação, antiviral intravenoso e antibiótico conforme protocolo.' }
    ],
    tratamento: [
      'A maioria dos casos em crianças saudáveis requer apenas tratamento sintomático e cuidados de pele.',
      'Antitérmico: paracetamol ou dipirona. NÃO usar ácido acetilsalicílico (risco de síndrome de Reye) e evitar anti-inflamatórios não esteroidais, pela associação com infecção invasiva de pele por Streptococcus pyogenes.',
      'Controle do prurido: banhos frescos, compressas, anti-histamínico oral (por exemplo dexclorfeniramina ou hidroxizina, conforme bula), unhas curtas e limpas e roupas leves de algodão.',
      'Higiene da pele com água e sabão; não usar talco, pomadas oclusivas ou produtos caseiros sobre as lesões.',
      'Aciclovir oral pode ser considerado nas primeiras 24 a 72 horas do exantema para grupos de maior risco: maiores de 12 anos, casos secundários no domicílio (geralmente mais graves), pneumopatas e dermatopatas crônicos, uso crônico de salicilato e uso de corticoide inalatório ou sistêmico em curso; não é indicado de rotina em criança saudável.',
      'Aciclovir intravenoso para imunossuprimidos, recém-nascidos, varicela disseminada, pneumonia, encefalite e varicela hemorrágica.',
      'Infecção bacteriana secundária: cefalexina ou amoxicilina com clavulanato para casos leves a moderados; oxacilina ou ceftriaxona intravenosas e avaliação cirúrgica se celulite extensa, abscesso ou suspeita de fasceíte necrosante (emergência cirúrgica).',
      'Isolamento de aerossóis e de contato desde a suspeita até que todas as lesões estejam em crosta; afastamento de escola e creche pelo mesmo período.',
      'Profilaxia pós-exposição: vacina varicela em até 5 dias (idealmente 72 horas) para contatos suscetíveis a partir de 9 meses (conforme a situação), ou imunoglobulina específica antivaricela-zóster em até 96 horas para imunossuprimidos, gestantes suscetíveis, recém-nascidos de mãe com varicela de 5 dias antes a 2 dias após o parto e prematuros, conforme o CRIE.',
      'Hidratação e analgesia para lesões orais; oferecer dieta fria e pastosa.'
    ],
    medicamentos: [
      { medId: null, nome: 'Aciclovir', esquema: 'VO: 20 mg/kg/dose 4 vezes ao dia (máximo 800 mg por dose) por 5 dias, iniciado idealmente nas primeiras 24 a 72 horas, nos grupos de risco. IV: 10 mg/kg/dose (ou 500 mg/m2/dose) a cada 8 horas por 7 a 10 dias em imunossuprimidos e formas graves. Confirmar conforme protocolo e bula, com ajuste para função renal e hidratação adequada.' },
      { medId: 'paracetamol', esquema: 'Febre e dor: 10 a 15 mg/kg/dose VO a cada 6 horas, conforme bula. Não usar ácido acetilsalicílico.' },
      { medId: 'dipirona', esquema: 'Alternativa antitérmica: 10 a 15 mg/kg/dose VO ou IV a cada 6 horas, conforme bula.' },
      { medId: 'cefalexina', esquema: 'Infecção bacteriana secundária leve a moderada: 50 mg/kg/dia VO dividida 6/6 h (até 100 mg/kg/dia em infecção mais extensa, máximo 4 g/dia) por 7 a 10 dias.' },
      { medId: 'amoxicilina_clavulanato', esquema: 'Alternativa para pele e partes moles: 45 a 50 mg/kg/dia (componente amoxicilina) VO dividida 12/12 h por 7 a 10 dias, conforme bula.' },
      { medId: 'ceftriaxona', esquema: 'Celulite extensa ou sepse: 50 a 100 mg/kg/dia IV, associada a antimicrobiano com cobertura para Staphylococcus aureus conforme protocolo.' },
      { medId: null, nome: 'Imunoglobulina humana antivaricela-zóster (IGHAVZ)', esquema: 'Profilaxia pós-exposição em até 96 horas para imunossuprimidos, gestantes suscetíveis, recém-nascidos de risco e prematuros; dose e via conforme o manual do CRIE do Ministério da Saúde; confirmar conforme protocolo.' },
      { medId: null, nome: 'Dexclorfeniramina', esquema: 'Prurido: uso oral conforme bula e faixa etária (em geral a partir de 2 anos), com atenção à sedação; confirmar conforme bula.' }
    ],
    criteriosInternacao: [
      'Suspeita de infecção bacteriana invasiva: celulite extensa, abscesso, fasceíte necrosante, choque tóxico ou sepse.',
      'Pneumonia, desconforto respiratório ou saturação abaixo de 92%.',
      'Manifestação neurológica: ataxia grave, convulsão, alteração de consciência.',
      'Varicela hemorrágica ou plaquetopenia com sangramento.',
      'Imunossupressão, uso de corticoide sistêmico, recém-nascido ou lactente jovem.',
      'Desidratação ou impossibilidade de ingestão por lesões orais dolorosas.',
      'Impossibilidade de cuidado e isolamento domiciliar adequados.'
    ],
    criteriosUTI: [
      'Insuficiência respiratória por pneumonia com necessidade de suporte ventilatório.',
      'Choque séptico ou choque tóxico.',
      'Encefalite com rebaixamento do nível de consciência ou estado de mal epiléptico.',
      'Fasceíte necrosante com necessidade de desbridamento amplo e suporte hemodinâmico.',
      'Coagulopatia com sangramento grave.'
    ],
    criteriosAlta: [
      'Todas as lesões em fase de crosta, sem novas vesículas por pelo menos 24 a 48 horas.',
      'Afebril por 24 a 48 horas, sem sinais de infecção bacteriana em atividade.',
      'Aceitação oral adequada de líquidos e alimentos.',
      'Antibiótico oral tolerado para completar o tratamento, quando indicado.',
      'Responsável orientado sobre cuidados de pele, sinais de alarme e retorno.'
    ],
    orientacoes: [
      'Manter a criança em casa, sem escola ou creche, até todas as feridas estarem em casquinha (em geral 5 a 7 dias).',
      'Evitar contato com bebês pequenos, gestantes que nunca tiveram catapora e pessoas com imunidade baixa (quimioterapia, transplante, HIV).',
      'Cortar e manter as unhas limpas, dar banho normal com água e sabão e vestir roupas leves para diminuir a coçadura.',
      'Não passar pomadas caseiras, talco, pasta de dente, borra de café ou folhas sobre as bolhas: aumentam o risco de infecção.',
      'Nunca dar ácido acetilsalicílico (AAS ou aspirina) nem anti-inflamatórios como ibuprofeno e nimesulida.',
      'Retornar imediatamente se a febre voltar depois de melhorar, se alguma ferida ficar vermelha, quente, inchada ou com pus, se houver dor forte na pele, falta de ar, sonolência, convulsão, dificuldade para andar ou manchas roxas.'
    ],
    retorno: 'Reavaliação em 48 a 72 horas nos casos leves, em 24 horas em lactentes e desnutridos, e retorno imediato diante de sinais de infecção de pele, respiratórios ou neurológicos; consulta de seguimento para atualização vacinal da criança e dos contatos.',
    prevencao: [
      'Vacinação: tetraviral (sarampo, caxumba, rubéola e varicela) aos 15 meses e segunda dose de varicela aos 4 anos, conforme o calendário do SUS.',
      'Vacinação de bloqueio de contatos suscetíveis em até 5 dias da exposição, conforme orientação da vigilância.',
      'Imunoglobulina específica antivaricela-zóster para contatos de risco em até 96 horas, conforme o CRIE.',
      'Isolamento de casos até que todas as lesões estejam em crosta, com precaução de aerossóis e contato no ambiente hospitalar.',
      'Higiene das mãos e cuidados de pele para reduzir a infecção bacteriana secundária.',
      'Notificação de surtos em creches, escolas e comunidades.'
    ],
    fontes: [
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
      { nome: 'Manual dos Centros de Referência para Imunobiológicos Especiais (CRIE) – Ministério da Saúde', ano: 2023 },
      { nome: 'Sociedade Brasileira de Pediatria – Tratado de Pediatria', ano: 2022 },
      { nome: 'Nelson Textbook of Pediatrics, 21ª edição', ano: 2020 }
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
    definicao: 'Doença exantemática viral do lactente causada principalmente pelo herpesvírus humano tipo 6, caracterizada por febre alta de 3 a 5 dias em criança com bom estado geral, seguida de exantema maculopapular que surge justamente quando a febre cessa. É uma das principais causas de febre sem sinais localizatórios e de convulsão febril entre 6 meses e 2 anos.',
    epidemiologia: 'Acomete predominantemente lactentes de 6 a 24 meses, com pico entre 6 e 15 meses; quase todas as crianças foram infectadas até os 3 anos. Distribuição universal, sem sazonalidade marcante. No Amazonas, sua importância prática é ser a principal causa de febre alta sem foco em lactentes e de idas repetidas ao pronto atendimento, sendo essencial diferenciá-la de dengue, malária e infecção bacteriana grave em área endêmica antes de atribuir o quadro a ela.',
    agente: 'Herpesvírus humano tipo 6 (HHV-6B) na maioria dos casos e herpesvírus humano tipo 7 (HHV-7) em parte deles; enterovírus e adenovírus produzem quadros semelhantes.',
    transmissao: 'Contato com saliva de adultos e crianças portadores assintomáticos, que eliminam o vírus de forma intermitente por toda a vida; transmissão intradomiciliar é a regra.',
    incubacao: '5 a 15 dias, em média 9 a 10 dias.',
    manifestacoes: [
      'Febre alta de início abrupto, frequentemente de 39 a 40 graus, com duração de 3 a 5 dias, em criança que permanece com bom estado geral e ativa entre os picos.',
      'Poucos achados ao exame: hiperemia discreta de orofaringe, coriza leve, edema palpebral, linfonodomegalia cervical e occipital.',
      'Desaparecimento abrupto da febre (crise) seguido, em horas, pelo surgimento do exantema, sequência que é a marca da doença.',
      'Exantema maculopapular róseo, de 2 a 5 mm, não pruriginoso, com início em tronco e pescoço e extensão para face e membros proximais, durando de horas a 2 ou 3 dias.',
      'Manchas de Nagayama: úlceras ou pápulas eritematosas na úvula e no palato mole.',
      'Diarreia leve, irritabilidade e inapetência durante a fase febril.',
      'Convulsão febril em cerca de 10 a 15% dos casos, muitas vezes a primeira da vida da criança.'
    ],
    sinaisAlarme: [
      'Criança toxemiada, prostrada ou irritada mesmo com a febre controlada.',
      'Petéquias, púrpura ou qualquer sangramento.',
      'Rigidez de nuca, abaulamento de fontanela, vômitos persistentes ou alteração do nível de consciência.',
      'Convulsão prolongada (mais de 5 minutos), focal ou repetida no mesmo episódio febril, ou recuperação lenta da consciência.',
      'Idade menor de 3 meses com febre (investigar infecção bacteriana grave conforme protocolo).',
      'Desidratação, recusa alimentar ou desconforto respiratório.',
      'Febre que persiste após o surgimento do exantema ou além de 5 dias.',
      'História de viagem ou residência em área endêmica sem investigação de malária e dengue.'
    ],
    diagnosticoDiferencial: ['dengue', 'malaria', 'sarampo', 'rubeola', 'eritema_infeccioso', 'escarlatina', 'infeccao_urinaria', 'meningite', 'sepse', 'farmacodermia (exantema após antibiótico iniciado na fase febril)'],
    exames: ['hemograma', 'pcr', 'urina_1', 'urocultura', 'gota_espessa', 'teste rápido para malária em área endêmica', 'sorologia_dengue', 'hemocultura', 'liquor'],
    criteriosDiagnosticos: [
      'Diagnóstico clínico e retrospectivo: lactente de 6 a 24 meses com febre alta de 3 a 5 dias, bom estado geral e exantema que surge quando a febre desaparece.',
      'Não há indicação de sorologia ou PCR para HHV-6 na prática assistencial de rotina.',
      'Durante a fase febril, o diagnóstico é de exclusão: em criança febril sem foco, avaliar risco de infecção bacteriana grave conforme a idade e o protocolo do serviço, e solicitar gota espessa ou teste rápido em área endêmica de malária.',
      'Atenção à armadilha comum: exantema que aparece após o início de um antibiótico prescrito na fase febril costuma ser roséola, e não alergia ao medicamento; registrar a hipótese para não rotular a criança como alérgica indevidamente.',
      'Registrar como quadro compatível com exantema súbito, mantendo vigilância clínica conforme protocolo.'
    ],
    classificacaoGravidade: [
      { nivel: 'Típico e benigno', criterios: 'Lactente com febre alta, bom estado geral entre os picos, sem sinais de alarme e sem sinal localizatório preocupante. Manejo domiciliar com antitérmico, hidratação e reavaliação.' },
      { nivel: 'Com convulsão febril simples', criterios: 'Crise generalizada com menos de 15 minutos, única em 24 horas, com recuperação completa da consciência. Observação, orientação aos pais e afastamento de causa neurológica; internação geralmente desnecessária.' },
      { nivel: 'Atípico ou com sinais de alarme', criterios: 'Convulsão complexa, sinais meníngeos, toxemia, petéquias, febre prolongada ou menor de 3 meses. Investigação ampliada e internação conforme protocolo de febre sem foco.' }
    ],
    tratamento: [
      'Tratamento exclusivamente sintomático: não há antiviral indicado em criança imunocompetente.',
      'Antitérmico conforme a necessidade e o conforto da criança (paracetamol ou dipirona); não alternar antitérmicos de forma rígida nem usar doses acima do recomendado.',
      'Hidratação oral frequente e manutenção do aleitamento e da alimentação habitual.',
      'Evitar banho gelado, álcool e compressas frias agressivas; roupas leves e ambiente arejado.',
      'Convulsão febril: proteger a criança, lateralizar, não introduzir objetos na boca, cronometrar a crise; se a crise durar mais de 5 minutos, tratar como estado de mal em início, conforme o protocolo de emergência (benzodiazepínico).',
      'Em área endêmica, solicitar gota espessa ou teste rápido para malária em todo lactente com febre, antes de atribuir o quadro a doença viral benigna.',
      'Não prescrever antibiótico para exantema viral; reavaliar o uso quando o exantema surgir após antibiótico iniciado na fase febril.',
      'Orientar retorno imediato diante de sinais de alarme; a febre alta isolada em criança com bom estado geral não é, por si, indicação de internação.'
    ],
    medicamentos: [
      { medId: 'paracetamol', esquema: 'Febre e desconforto: 10 a 15 mg/kg/dose VO a cada 6 horas, conforme bula.' },
      { medId: 'dipirona', esquema: 'Alternativa antitérmica: 10 a 15 mg/kg/dose VO ou IV a cada 6 horas, conforme bula.' },
      { medId: 'ibuprofeno', esquema: 'Alternativa antitérmica em criança sem suspeita de dengue e sem desidratação: 5 a 10 mg/kg/dose VO a cada 6 a 8 horas, conforme bula.' },
      { medId: 'sais_reidratacao_oral', esquema: 'Reposição de perdas se diarreia ou ingestão reduzida, conforme plano A do AIDPI.' },
      { medId: 'midazolam', esquema: 'Apenas se convulsão com mais de 5 minutos: uso conforme o protocolo de emergência do serviço (dose e via conforme protocolo e bula).' }
    ],
    criteriosInternacao: [
      'Menor de 3 meses com febre, conforme protocolo de febre sem sinais localizatórios.',
      'Convulsão febril complexa, prolongada ou com recuperação incompleta da consciência.',
      'Suspeita de meningite, sepse ou outra infecção bacteriana grave.',
      'Desidratação ou recusa alimentar mantida.',
      'Aspecto toxemiado, petéquias ou instabilidade.',
      'Impossibilidade de reavaliação em tempo hábil (comunidade distante, transporte fluvial demorado).'
    ],
    criteriosUTI: [
      'Estado de mal epiléptico refratário.',
      'Rebaixamento persistente do nível de consciência ou necessidade de proteção de via aérea.',
      'Choque ou instabilidade hemodinâmica (sugerindo diagnóstico alternativo, como sepse ou dengue grave).',
      'Encefalite associada ao HHV-6, rara e mais frequente em imunossuprimidos.'
    ],
    criteriosAlta: [
      'Criança em bom estado geral, hidratada e aceitando líquidos.',
      'Ausência de sinais de alarme após período de observação.',
      'Exames de triagem tranquilizadores quando solicitados (incluindo pesquisa de malária em área endêmica).',
      'Responsável orientado sobre o curso esperado da doença, manejo da febre e sinais de alarme.',
      'Retorno garantido e acessível.'
    ],
    orientacoes: [
      'A febre alta pode durar de 3 a 5 dias; o importante é como a criança fica entre os picos de febre, não o valor do termômetro.',
      'Oferecer líquidos com frequência, manter o peito e a alimentação habitual, roupas leves e ambiente arejado.',
      'Dar o antitérmico nos intervalos orientados, sem repetir antes do tempo nem aumentar a dose.',
      'Quando a febre passar, podem aparecer manchas rosadas no corpo: isso é a fase final da doença, não é alergia nem piora, e costuma sumir em 1 a 3 dias.',
      'Se a criança tiver convulsão: deitar de lado, afastar objetos, não colocar nada na boca, marcar a hora e procurar atendimento; se durar mais de 5 minutos, chamar socorro imediatamente.',
      'Retornar imediatamente se surgirem manchas roxas, vômitos repetidos, sonolência, choro inconsolável, pescoço duro, dificuldade para respirar, recusa de líquidos ou febre que continua depois de aparecerem as manchas.'
    ],
    retorno: 'Reavaliação em 24 a 48 horas enquanto durar a febre, com retorno imediato se surgirem sinais de alarme; em área endêmica, reavaliar obrigatoriamente se a febre persistir além de 3 dias para repetir a pesquisa de malária e reconsiderar dengue.',
    prevencao: [
      'Não há vacina disponível; a infecção é praticamente universal na primeira infância.',
      'Higiene das mãos e cuidado com o compartilhamento de utensílios, chupetas e mamadeiras reduzem a transmissão por saliva.',
      'Evitar beijar o rosto e a boca de lactentes pequenos.',
      'Orientação antecipatória aos pais sobre febre e convulsão febril reduz idas desnecessárias e ansiedade.',
      'Manter o calendário vacinal em dia para reduzir outras causas febris e permitir melhor avaliação do lactente com febre.'
    ],
    fontes: [
      { nome: 'Sociedade Brasileira de Pediatria – Tratado de Pediatria', ano: 2022 },
      { nome: 'Nelson Textbook of Pediatrics, 21ª edição', ano: 2020 },
      { nome: 'Manual AIDPI Criança – Ministério da Saúde', ano: 2017 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'eritema_infeccioso',
    nome: 'Eritema infeccioso (quinta doença, parvovírus B19)',
    categoria: 'infecciosa',
    amazonia: false,
    cid10: 'B08.3',
    tags: ['febre', 'exantema', 'artralgia', 'palidez', 'fraqueza', 'cefaleia', 'coriza', 'prurido'],
    definicao: 'Doença exantemática causada pelo parvovírus B19, caracterizada por eritema facial intenso com aspecto de face esbofeteada, seguido de exantema reticulado ou rendilhado em tronco e membros, com recidivas desencadeadas por sol, calor e exercício. Em pacientes com anemia hemolítica crônica pode causar crise aplásica transitória, e na gestação pode levar a hidropisia fetal.',
    epidemiologia: 'Acomete principalmente escolares de 5 a 15 anos, com surtos em escolas no fim do inverno e na primavera nas regiões de clima temperado e distribuição menos sazonal na Amazônia. Sua relevância regional maior está na população com doença falciforme e outras anemias hemolíticas, frequentes no Norte e Nordeste, nas quais o parvovírus B19 é a principal causa de crise aplásica com queda abrupta da hemoglobina, além do risco para gestantes suscetíveis.',
    agente: 'Parvovírus humano B19 (Erythroparvovirus), que infecta precursores eritroides da medula óssea.',
    transmissao: 'Gotículas respiratórias e contato com secreções; também por via transplacentária e por hemoderivados. A transmissibilidade ocorre na fase febril prodrômica e cessa com o surgimento do exantema, de modo que a criança com exantema tipicamente já não transmite.',
    incubacao: '4 a 14 dias até os pródromos, podendo chegar a 21 dias até o exantema.',
    manifestacoes: [
      'Pródromo inespecífico e leve: febre baixa, cefaleia, coriza, mialgia e mal-estar, por 2 a 3 dias, fase em que a criança transmite.',
      'Primeira fase do exantema: eritema intenso, confluente e quente em ambas as bochechas, com palidez perioral, aspecto de face esbofeteada.',
      'Segunda fase, em 1 a 4 dias: exantema maculopapular em tronco e superfícies extensoras dos membros que clareia no centro, assumindo aspecto reticulado ou rendilhado, por vezes pruriginoso.',
      'Terceira fase: recidivas do exantema por semanas, desencadeadas por exposição ao sol, calor, banho quente, exercício ou estresse.',
      'Artralgia e artrite simétrica de pequenas articulações, mais comuns em adolescentes e adultos do sexo feminino, com duração de dias a semanas.',
      'Síndrome papular-purpúrica em luvas e meias: edema, eritema e petéquias em mãos e pés, mais em adolescentes.',
      'Crise aplásica transitória em portadores de anemia falciforme, esferocitose ou talassemia: palidez intensa, fraqueza, taquicardia e queda abrupta da hemoglobina com reticulocitopenia, geralmente sem o exantema clássico.',
      'Em imunossuprimidos: anemia crônica por infecção persistente.'
    ],
    sinaisAlarme: [
      'Palidez acentuada, fraqueza, taquicardia, dispneia ou sopro novo em criança com anemia hemolítica conhecida (crise aplásica).',
      'Criança com doença falciforme e febre: avaliar como emergência, conforme protocolo específico.',
      'Sangramento, petéquias ou púrpura extensa.',
      'Artrite incapacitante ou com febre alta persistente (reavaliar diagnóstico, incluindo artrite séptica).',
      'Contato de gestante suscetível com o caso (risco de hidropisia fetal), exigindo encaminhamento ao pré-natal.',
      'Imunossupressão com anemia progressiva.',
      'Edema generalizado, alteração de consciência ou convulsão.'
    ],
    diagnosticoDiferencial: ['rubeola', 'sarampo', 'escarlatina', 'exantema_subito', 'mononucleose', 'dengue', 'chikungunya', 'lupus eritematoso sistêmico juvenil', 'artrite idiopática juvenil', 'farmacodermia', 'anemia_ferropriva'],
    exames: ['hemograma', 'contagem de reticulócitos', 'sorologia IgM e IgG para parvovírus B19', 'PCR para parvovírus B19 (imunossuprimidos e crise aplásica)', 'pcr', 'vhs', 'bilirrubinas', 'ferritina', 'sorologia_dengue'],
    criteriosDiagnosticos: [
      'Diagnóstico clínico no caso típico: face esbofeteada seguida de exantema reticulado em escolar com bom estado geral.',
      'Sorologia IgM para parvovírus B19 indicada em gestantes expostas, em crise aplásica, em artrite persistente e em casos atípicos ou duvidosos.',
      'Em imunossuprimidos, a sorologia pode ser falsamente negativa; solicitar PCR conforme protocolo.',
      'Hemograma com reticulócitos é obrigatório em criança com anemia hemolítica conhecida e suspeita de parvovirose, para identificar crise aplásica.',
      'Não é doença de notificação compulsória, mas surtos escolares devem ser comunicados à vigilância para orientar gestantes e pacientes de risco.',
      'Registrar como quadro compatível com eritema infeccioso, mantendo confirmação laboratorial conforme indicação.'
    ],
    classificacaoGravidade: [
      { nivel: 'Típico e benigno', criterios: 'Criança saudável com exantema característico, bom estado geral, sem anemia de base. Manejo domiciliar com sintomáticos e orientação; não necessita afastamento escolar, pois já não transmite.' },
      { nivel: 'Com manifestação articular', criterios: 'Artralgia ou artrite simétrica com limitação funcional. Analgesia e anti-inflamatório conforme avaliação, com reavaliação em dias e investigação se não melhorar.' },
      { nivel: 'Grave', criterios: 'Crise aplásica transitória em anemia hemolítica, anemia crônica em imunossuprimido, miocardite ou síndrome hemofagocítica. Internação, hemograma seriado, transfusão quando indicada e avaliação hematológica.' }
    ],
    tratamento: [
      'Criança saudável: tratamento sintomático apenas. Não há antiviral específico.',
      'Antitérmico e analgesia com paracetamol ou dipirona; ibuprofeno pode ser usado para artralgia em criança sem contraindicação e sem suspeita de dengue.',
      'Orientar que o exantema pode reaparecer por semanas com sol, calor e exercício, sem significar recaída ou nova infecção.',
      'Não há necessidade de afastamento escolar na fase do exantema, pois a transmissibilidade cessa quando ele surge; a criança deve ser afastada apenas se ainda estiver febril.',
      'Crise aplásica: internação, monitorização de hemoglobina e reticulócitos, transfusão de concentrado de hemácias conforme protocolo hematológico e precaução de gotículas e contato, pois nesses pacientes a carga viral é alta e há transmissão.',
      'Imunossuprimido com anemia persistente: avaliação especializada; imunoglobulina intravenosa pode ser indicada conforme protocolo.',
      'Gestante exposta: encaminhar ao pré-natal para sorologia e, se infecção aguda, seguimento ultrassonográfico para hidropisia fetal.',
      'Evitar rotular como alergia medicamentosa quando o exantema aparece durante uso de antibiótico.'
    ],
    medicamentos: [
      { medId: 'paracetamol', esquema: 'Febre e dor: 10 a 15 mg/kg/dose VO a cada 6 horas, conforme bula.' },
      { medId: 'ibuprofeno', esquema: 'Artralgia ou artrite, afastada dengue e plaquetopenia: 5 a 10 mg/kg/dose VO a cada 6 a 8 horas, conforme bula.' },
      { medId: 'dipirona', esquema: 'Alternativa antitérmica e analgésica: 10 a 15 mg/kg/dose VO ou IV a cada 6 horas, conforme bula.' },
      { medId: null, nome: 'Concentrado de hemácias', esquema: 'Crise aplásica com anemia sintomática: transfusão conforme protocolo de hemoterapia e avaliação hematológica; não há dose fixa, individualizar.' },
      { medId: null, nome: 'Imunoglobulina humana intravenosa', esquema: 'Infecção persistente com anemia crônica em imunossuprimido: indicação e dose conforme protocolo do serviço e avaliação especializada; confirmar conforme protocolo.' }
    ],
    criteriosInternacao: [
      'Crise aplásica: queda abrupta de hemoglobina com reticulocitopenia, palidez intensa ou repercussão cardiovascular.',
      'Criança com doença falciforme, esferocitose ou talassemia com febre e palidez.',
      'Anemia sintomática em imunossuprimido.',
      'Artrite com dor incapacitante ou suspeita de artrite séptica.',
      'Plaquetopenia com sangramento.',
      'Miocardite ou insuficiência cardíaca.'
    ],
    criteriosUTI: [
      'Insuficiência cardíaca descompensada ou miocardite com instabilidade.',
      'Anemia grave com choque ou necessidade de suporte hemodinâmico.',
      'Síndrome hemofagocítica associada.',
      'Insuficiência respiratória.'
    ],
    criteriosAlta: [
      'Estabilidade clínica, sem palidez progressiva.',
      'Hemoglobina estável ou em recuperação, com reticulócitos em ascensão nos casos de crise aplásica.',
      'Ausência de sinais de descompensação cardiovascular.',
      'Seguimento hematológico agendado quando aplicável.',
      'Responsável orientado sobre recidiva do exantema, sinais de alarme e retorno.'
    ],
    orientacoes: [
      'As manchas podem voltar por algumas semanas quando a criança toma sol, corre ou toma banho quente: isso é esperado e não significa que a doença voltou.',
      'A criança pode voltar à escola quando estiver sem febre, porque na fase das manchas ela já não transmite.',
      'Avisar a escola e a família se houver gestante ou pessoa com anemia (doença falciforme, talassemia) em contato, para que procurem orientação médica.',
      'Oferecer líquidos e manter a alimentação habitual; usar o analgésico orientado se houver dor nas juntas.',
      'Retornar imediatamente se a criança ficar muito pálida, cansada, com falta de ar, coração acelerado ou muito sonolenta, especialmente se já tem anemia conhecida.'
    ],
    retorno: 'Reavaliação em 7 a 10 dias nos casos típicos, ou antes se houver artralgia persistente; em criança com anemia hemolítica, hemograma com reticulócitos e reavaliação em 24 a 48 horas ou conforme orientação do hematologista.',
    prevencao: [
      'Não há vacina disponível.',
      'Higiene das mãos e etiqueta respiratória, especialmente na fase febril, quando há transmissão.',
      'Comunicar surtos escolares para que gestantes suscetíveis e pacientes com anemia hemolítica ou imunossupressão recebam orientação.',
      'Precaução de gotículas e contato no hospital para pacientes com crise aplásica ou infecção crônica.',
      'Acompanhamento pré-natal com orientação sobre exposição a exantemas.'
    ],
    fontes: [
      { nome: 'Sociedade Brasileira de Pediatria – Tratado de Pediatria', ano: 2022 },
      { nome: 'Nelson Textbook of Pediatrics, 21ª edição', ano: 2020 },
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'mao_pe_boca',
    nome: 'Doença mão-pé-boca',
    categoria: 'infecciosa',
    amazonia: false,
    cid10: 'B08.4',
    tags: ['febre', 'exantema', 'lesoes_pele', 'dor_garganta', 'desidratacao', 'vomitos', 'prurido', 'alteracao_consciencia'],
    definicao: 'Enterovirose aguda, em geral benigna e autolimitada, caracterizada por febre, enantema vesicular e ulcerado na cavidade oral e exantema vesicular ou maculopapular em mãos, pés, nádegas e região perioral. O principal risco é a desidratação por recusa alimentar decorrente da dor oral; o enterovírus 71 se associa a formas neurológicas graves.',
    epidemiologia: 'Muito frequente em creches e pré-escolas, acometendo sobretudo menores de 5 anos, com surtos ao longo de todo o ano em clima quente e úmido, padrão da Amazônia. A transmissão fecal-oral é favorecida por saneamento precário e uso de água de igarapés e poços, e a aglomeração domiciliar em comunidades ribeirinhas facilita a disseminação intrafamiliar. Surtos por enterovírus 71, com complicações neurológicas e cardiopulmonares, já foram descritos na Ásia e merecem vigilância quando há casos graves agrupados.',
    agente: 'Enterovírus, principalmente Coxsackievirus A16 e A6; enterovírus 71 associa-se a formas neurológicas e a quadros mais graves; Coxsackie A6 causa lesões mais extensas e descamação e perda de unhas na convalescença.',
    transmissao: 'Fecal-oral, contato com secreções de orofaringe, saliva, conteúdo das vesículas e fômites. A eliminação viral nas fezes pode durar semanas após a melhora clínica.',
    incubacao: '3 a 6 dias (variação de 2 a 10 dias).',
    manifestacoes: [
      'Febre baixa a moderada por 1 a 3 dias, com inapetência, irritabilidade e dor de garganta.',
      'Enantema: vesículas e úlceras rasas e dolorosas em língua, mucosa jugal, palato e pilares amigdalianos, causando recusa alimentar e sialorreia.',
      'Exantema vesicular ou maculopapular de formato oval, com halo eritematoso, em palmas das mãos, plantas dos pés, dorso de mãos e pés, nádegas e região perioral, podendo ser doloroso mais do que pruriginoso.',
      'Na infecção por Coxsackie A6, lesões mais numerosas e extensas, com bolhas, acometimento perioral e de tronco, que podem simular varicela ou impetigo bolhoso.',
      'Recusa de líquidos e sinais de desidratação, principal complicação em lactentes.',
      'Convalescença: descamação de mãos e pés em 1 a 3 semanas e onicomadese (perda das unhas) em 1 a 2 meses, achados benignos.',
      'Formas graves (raras, associadas ao enterovírus 71): meningite asséptica, romboencefalite com mioclonias e ataxia, paralisia flácida aguda, edema pulmonar e miocardite.'
    ],
    sinaisAlarme: [
      'Recusa completa de líquidos, redução da diurese, boca seca, olhos fundos ou letargia (desidratação).',
      'Mioclonias ou abalos ao adormecer, ataxia, tremores, sonolência, irritabilidade extrema ou convulsão.',
      'Vômitos persistentes, rigidez de nuca ou cefaleia intensa.',
      'Taquicardia, taquipneia, sudorese, palidez ou hipotensão (miocardite e edema pulmonar por enterovírus 71).',
      'Febre alta por mais de 3 dias ou febre que retorna após melhora.',
      'Lesões com sinais de infecção bacteriana secundária: pus, calor, vermelhidão progressiva.',
      'Lactente menor de 3 meses com quadro compatível.'
    ],
    diagnosticoDiferencial: ['varicela', 'herpangina', 'gengivoestomatite herpética primária', 'escabiose_impetigo', 'escarlatina', 'aftas e estomatite aftosa recorrente', 'farmacodermia', 'eritema multiforme'],
    exames: ['hemograma', 'pcr', 'eletrolitos', 'sodio', 'glicemia', 'liquor', 'PCR para enterovírus em swab de orofaringe, fezes ou liquor (casos graves ou surtos)', 'gasometria', 'radiografia_torax'],
    criteriosDiagnosticos: [
      'Diagnóstico clínico: febre com úlceras orais dolorosas e vesículas em mãos, pés e nádegas em criança menor de 5 anos, geralmente com contato em creche.',
      'Exames laboratoriais não são necessários nos casos típicos; reservados para formas graves, neurológicas ou investigação de surto.',
      'Punção lombar indicada diante de sinais neurológicos ou meníngeos, conforme protocolo.',
      'Investigação virológica com PCR para enterovírus e comunicação à vigilância em surtos com casos graves ou agrupamento de manifestações neurológicas.',
      'Diferenciar de varicela pelo padrão de distribuição (acral e perioral, com poupa do couro cabeludo) e pela ausência de lesões em diferentes estágios no mesmo local.',
      'Registrar como quadro compatível com doença mão-pé-boca, mantendo vigilância de sinais de alarme.'
    ],
    classificacaoGravidade: [
      { nivel: 'Leve', criterios: 'Febre baixa, poucas lesões orais, criança aceitando líquidos e em bom estado geral. Manejo domiciliar com analgesia, hidratação e orientação.' },
      { nivel: 'Moderada', criterios: 'Lesões orais numerosas e dolorosas com ingestão reduzida, desidratação leve a moderada ou lesões cutâneas extensas. Analgesia otimizada, reidratação oral supervisionada ou observação em unidade.' },
      { nivel: 'Grave', criterios: 'Desidratação grave, sinais neurológicos (mioclonias, ataxia, sonolência, convulsão), suspeita de miocardite ou edema pulmonar. Internação imediata e avaliação de UTI.' }
    ],
    tratamento: [
      'Tratamento de suporte: não há antiviral específico disponível na rede.',
      'Analgesia é a prioridade, pois permite a ingestão: paracetamol ou dipirona em horários regulares; ibuprofeno como alternativa em criança hidratada e sem contraindicação.',
      'Oferecer líquidos frios e gelados, sorvete, gelatina, iogurte e alimentos pastosos e não ácidos; evitar sucos cítricos, alimentos salgados, quentes ou condimentados.',
      'Hidratação oral com sais de reidratação oral em pequenos volumes e alta frequência; hidratação intravenosa se recusa persistente ou desidratação moderada a grave.',
      'Manter o aleitamento materno; oferecer o peito com mais frequência e por menos tempo.',
      'Cuidados locais: higiene da boca com água; soluções tópicas anestésicas orais somente conforme orientação e bula, com cautela em lactentes pelo risco de aspiração e toxicidade.',
      'Não usar antibiótico, corticoide ou antiviral de rotina; antibiótico apenas se infecção bacteriana secundária de pele comprovada.',
      'Afastamento de creche enquanto houver febre e lesões ativas; retorno conforme orientação da instituição, lembrando que a eliminação viral nas fezes persiste por semanas, tornando a higiene das mãos mais importante que o afastamento prolongado.',
      'Formas neurológicas ou cardiopulmonares: internação, monitorização, suporte ventilatório e hemodinâmico conforme protocolo.'
    ],
    medicamentos: [
      { medId: 'paracetamol', esquema: 'Dor oral e febre: 10 a 15 mg/kg/dose VO a cada 6 horas, conforme bula; manter horário regular nas primeiras 48 horas para permitir a ingestão.' },
      { medId: 'dipirona', esquema: 'Analgesia e febre: 10 a 15 mg/kg/dose VO ou IV a cada 6 horas, conforme bula.' },
      { medId: 'ibuprofeno', esquema: 'Alternativa analgésica em criança hidratada e sem suspeita de dengue: 5 a 10 mg/kg/dose VO a cada 6 a 8 horas, conforme bula.' },
      { medId: 'sais_reidratacao_oral', esquema: 'Reidratação e manutenção: pequenos volumes, oferta frequente, conforme plano A ou B do AIDPI.' },
      { medId: 'soro_fisiologico', esquema: 'Hidratação venosa e expansão 10 a 20 mL/kg IV em desidratação grave, conforme protocolo.' },
      { medId: 'ringer_lactato', esquema: 'Alternativa para expansão volêmica em desidratação grave, 10 a 20 mL/kg IV, conforme protocolo.' },
      { medId: 'cefalexina', esquema: 'Apenas se infecção bacteriana secundária da pele: 50 mg/kg/dia VO dividida 6/6 h por 7 dias, conforme bula.' }
    ],
    criteriosInternacao: [
      'Desidratação moderada a grave ou falha da reidratação oral.',
      'Recusa completa de líquidos por dor, apesar da analgesia adequada.',
      'Qualquer sinal neurológico: mioclonias, ataxia, sonolência, convulsão, rigidez de nuca.',
      'Suspeita de miocardite ou edema pulmonar: taquicardia desproporcional, taquipneia, sudorese, palidez.',
      'Lactente menor de 3 meses.',
      'Infecção bacteriana secundária extensa.',
      'Dificuldade de retorno e reavaliação (comunidade distante).'
    ],
    criteriosUTI: [
      'Edema pulmonar ou insuficiência respiratória.',
      'Miocardite com instabilidade hemodinâmica ou choque.',
      'Romboencefalite, paralisia flácida aguda ou rebaixamento do nível de consciência.',
      'Estado de mal epiléptico.'
    ],
    criteriosAlta: [
      'Aceitação oral adequada e hidratação restabelecida.',
      'Dor controlada com analgesia oral.',
      'Ausência de sinais neurológicos ou cardiopulmonares.',
      'Diurese normal e sinais vitais estáveis.',
      'Responsável orientado sobre hidratação, higiene das mãos e sinais de alarme.'
    ],
    orientacoes: [
      'O mais importante é a criança beber líquidos: oferecer água, água de coco, leite, gelatina, sorvete e alimentos gelados e macios, em pouca quantidade e muitas vezes ao dia.',
      'Evitar suco de limão, laranja e outros alimentos ácidos, salgados, quentes ou apimentados, que ardem nas feridas da boca.',
      'Dar o remédio para dor no horário orientado, inclusive antes das refeições, para facilitar a alimentação.',
      'Lavar bem as mãos após trocar fraldas e antes de preparar alimentos; a criança elimina o vírus nas fezes por semanas.',
      'Não furar as bolhas; manter a pele limpa e seca.',
      'É normal a pele das mãos e dos pés descascar depois de 1 a 3 semanas e, às vezes, as unhas caírem depois de 1 a 2 meses: elas nascem de novo.',
      'Retornar imediatamente se a criança parar de beber, urinar pouco, ficar muito sonolenta ou irritada, tiver tremores ou abalos ao dormir, andar cambaleando, vomitar muito, ficar ofegante, pálida ou suada.'
    ],
    retorno: 'Reavaliação em 24 a 48 horas nos casos com ingestão reduzida e em lactentes, ou em 48 a 72 horas nos casos leves; retorno imediato diante de qualquer sinal de alarme, sobretudo neurológico.',
    prevencao: [
      'Não há vacina disponível no Brasil.',
      'Higiene das mãos com água e sabão, principalmente após a troca de fraldas e o uso do banheiro e antes das refeições.',
      'Limpeza e desinfecção de brinquedos, superfícies e objetos compartilhados em creches.',
      'Não compartilhar copos, talheres, mamadeiras e chupetas.',
      'Afastamento da creche enquanto houver febre e lesões ativas.',
      'Água tratada e saneamento; cuidado com a água de igarapés e poços para consumo e higiene.',
      'Comunicação de surtos à vigilância, especialmente com casos neurológicos.'
    ],
    fontes: [
      { nome: 'Sociedade Brasileira de Pediatria – Tratado de Pediatria', ano: 2022 },
      { nome: 'Nelson Textbook of Pediatrics, 21ª edição', ano: 2020 },
      { nome: 'OMS – A Guide to Clinical Management and Public Health Response for Hand, Foot and Mouth Disease', ano: 2011 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'escarlatina',
    nome: 'Escarlatina',
    categoria: 'infecciosa',
    amazonia: false,
    cid10: 'A38',
    tags: ['febre', 'exantema', 'dor_garganta', 'linfonodomegalia', 'vomitos', 'dor_abdominal', 'cefaleia', 'lesoes_pele'],
    definicao: 'Quadro de faringoamigdalite estreptocócica acompanhado de exantema micropapular difuso, produzido pela toxina eritrogênica do Streptococcus pyogenes. Caracteriza-se por exantema com textura de lixa, palidez perioral, língua em framboesa e descamação na convalescença. O tratamento antibiótico previne a febre reumática.',
    epidemiologia: 'Predomina entre 5 e 15 anos, sendo rara antes dos 3 anos. Ocorre em surtos escolares e familiares. Na Amazônia, a alta prevalência de faringoamigdalites estreptocócicas e de piodermites, aliada ao acesso irregular ao diagnóstico e ao tratamento completo, mantém a febre reumática e a glomerulonefrite pós-estreptocócica como problemas relevantes, com casos de cardiopatia reumática em adolescentes. A aglomeração domiciliar e escolar favorece a transmissão.',
    agente: 'Streptococcus pyogenes (estreptococo beta-hemolítico do grupo A) produtor de exotoxinas pirogênicas (toxina eritrogênica).',
    transmissao: 'Gotículas respiratórias e contato próximo com secreções de orofaringe; raramente por alimentos contaminados. A transmissibilidade cessa após 24 a 48 horas de antibiótico eficaz.',
    incubacao: '1 a 4 dias (2 a 5 dias).',
    manifestacoes: [
      'Início abrupto com febre alta, dor de garganta intensa, cefaleia, vômitos e dor abdominal, esta última frequente e capaz de simular abdome agudo.',
      'Orofaringe hiperemiada, amígdalas aumentadas com exsudato, petéquias no palato e linfonodomegalia cervical anterior dolorosa.',
      'Exantema micropapular difuso, eritematoso, de textura áspera semelhante a lixa, iniciando no pescoço e tronco e generalizando em 24 a 48 horas, com poupa de palmas e plantas.',
      'Sinal de Filatov: palidez perioral contrastando com a face ruborizada.',
      'Sinal de Pastia: linhas eritematosas ou purpúricas nas dobras (fossa antecubital, axila, virilha), que persistem após o desaparecimento do exantema.',
      'Língua em morango branco nos primeiros dias (saburra branca com papilas salientes), evoluindo para língua em framboesa (vermelha e com papilas proeminentes) do 4º ao 5º dia.',
      'Descamação lamelar ou em retalhos de mãos e pés na convalescença, de 7 a 21 dias após o início.',
      'Complicações supurativas: abscesso peritonsilar, adenite supurada, otite média, sinusite; não supurativas: febre reumática e glomerulonefrite pós-estreptocócica.'
    ],
    sinaisAlarme: [
      'Dificuldade para engolir a própria saliva, sialorreia, trismo, voz abafada ou desvio da úvula (abscesso peritonsilar ou retrofaríngeo).',
      'Estridor, dispneia ou dificuldade para respirar.',
      'Toxemia, hipotensão, exantema com descamação precoce e diarreia (suspeita de síndrome do choque tóxico estreptocócico).',
      'Dor articular migratória, dispneia, sopro novo ou movimentos involuntários semanas depois (febre reumática).',
      'Urina escura, edema palpebral, oligúria ou hipertensão 1 a 3 semanas depois (glomerulonefrite pós-estreptocócica).',
      'Desidratação por recusa de líquidos.',
      'Lesão de pele com dor desproporcional, eritema em expansão rápida e toxemia (infecção invasiva ou fasceíte).'
    ],
    diagnosticoDiferencial: ['faringoamigdalite_estreptococica', 'sarampo', 'rubeola', 'mononucleose', 'doença de Kawasaki', 'síndrome do choque tóxico', 'farmacodermia', 'dengue', 'eritema_infeccioso'],
    exames: ['teste rápido para estreptococo do grupo A (swab de orofaringe)', 'cultura de orofaringe (swab)', 'hemograma', 'pcr', 'vhs', 'ASLO (útil apenas retrospectivamente, não no diagnóstico agudo)', 'urina_1', 'creatinina', 'hemocultura'],
    criteriosDiagnosticos: [
      'Quadro clínico compatível: faringoamigdalite com exantema em lixa, palidez perioral, sinal de Pastia e língua em framboesa, em escolar.',
      'Confirmação preferencial com teste rápido para estreptococo do grupo A; se negativo em criança com quadro muito sugestivo, confirmar com cultura de orofaringe quando disponível.',
      'ASLO não serve para o diagnóstico agudo: eleva-se de 1 a 3 semanas após a infecção e é útil apenas na investigação de febre reumática e glomerulonefrite.',
      'Na ausência de teste rápido ou cultura, situação comum no interior, usar escore clínico (McIsaac) e o conjunto de achados típicos para decidir o tratamento, conforme protocolo do serviço.',
      'Investigar urina 1 e pressão arterial em toda criança com história recente de estreptococcia e edema ou urina escura.',
      'Registrar como quadro compatível com escarlatina, com confirmação conforme protocolo.'
    ],
    classificacaoGravidade: [
      { nivel: 'Leve a moderada', criterios: 'Febre, odinofagia e exantema típico, com boa aceitação oral e sem sinais de complicação supurativa. Antibiótico ambulatorial e sintomáticos.' },
      { nivel: 'Com complicação supurativa', criterios: 'Abscesso peritonsilar ou retrofaríngeo, adenite supurada, otite complicada, ou desidratação por recusa de líquidos. Internação, antibiótico parenteral e avaliação otorrinolaringológica.' },
      { nivel: 'Grave ou invasiva', criterios: 'Síndrome do choque tóxico estreptocócico, fasceíte necrosante, sepse ou obstrução de via aérea. Emergência: internação em UTI, antibiótico intravenoso e avaliação cirúrgica.' }
    ],
    tratamento: [
      'Antibiótico é indicado para erradicar o estreptococo, encurtar o quadro, reduzir a transmissão e, principalmente, prevenir a febre reumática (a prevenção se mantém se iniciado em até 9 dias do início dos sintomas).',
      'Primeira escolha: penicilina benzatina em dose única intramuscular ou amoxicilina por via oral por 10 dias; a duração completa de 10 dias é essencial para a erradicação, mesmo com melhora rápida.',
      'Alergia à penicilina: azitromicina por 5 dias ou claritromicina por 10 dias; cefalexina por 10 dias pode ser usada em alergia não anafilática, conforme avaliação.',
      'Analgesia e antitérmico com paracetamol ou dipirona; ibuprofeno pode ser usado para dor de garganta intensa em criança hidratada e sem contraindicação.',
      'Hidratação com líquidos frios, alimentos pastosos e gelados; evitar alimentos ácidos e quentes.',
      'Afastamento de escola e creche até 24 horas após o início do antibiótico eficaz.',
      'Não é necessário tratar contatos assintomáticos nem repetir cultura após o tratamento em criança assintomática, exceto em situações especiais (surtos, história familiar de febre reumática), conforme protocolo.',
      'Complicação supurativa: antibiótico parenteral (penicilina cristalina ou ceftriaxona), avaliação otorrinolaringológica e drenagem quando indicada.',
      'Orientar vigilância para sinais de febre reumática e glomerulonefrite nas semanas seguintes, com avaliação da urina e da pressão arterial no retorno.'
    ],
    medicamentos: [
      { medId: 'penicilina_benzatina', esquema: 'Dose única IM: 600.000 UI em crianças com menos de 27 kg e 1.200.000 UI em crianças com 27 kg ou mais; opção preferencial quando há dúvida sobre a adesão ao tratamento oral de 10 dias.' },
      { medId: 'amoxicilina', esquema: '50 mg/kg/dia VO, em 1 ou 2 tomadas diárias (máximo 1 g/dia), por 10 dias completos.' },
      { medId: 'azitromicina', esquema: 'Alergia à penicilina: 12 mg/kg/dia VO 1 vez ao dia (máximo 500 mg/dia) por 5 dias, conforme bula e protocolo.' },
      { medId: 'claritromicina', esquema: 'Alergia à penicilina: 15 mg/kg/dia VO dividida 12/12 h (máximo 1 g/dia) por 10 dias.' },
      { medId: 'cefalexina', esquema: 'Alergia não anafilática à penicilina: 40 a 50 mg/kg/dia VO dividida 12/12 h ou 6/6 h (máximo 2 g/dia) por 10 dias.' },
      { medId: 'paracetamol', esquema: 'Febre e dor: 10 a 15 mg/kg/dose VO a cada 6 horas, conforme bula.' },
      { medId: 'ibuprofeno', esquema: 'Odinofagia intensa, em criança hidratada e sem suspeita de dengue: 5 a 10 mg/kg/dose VO a cada 6 a 8 horas, conforme bula.' },
      { medId: 'penicilina_cristalina', esquema: 'Complicação supurativa ou infecção invasiva, em internação: 100.000 a 200.000 UI/kg/dia IV dividida 4/4 h ou 6/6 h, conforme protocolo.' }
    ],
    criteriosInternacao: [
      'Suspeita de abscesso peritonsilar ou retrofaríngeo: trismo, sialorreia, voz abafada, abaulamento de parede faríngea.',
      'Desidratação ou incapacidade de ingerir líquidos e medicação.',
      'Toxemia, hipotensão ou suspeita de infecção invasiva.',
      'Obstrução de via aérea ou estridor.',
      'Complicação renal aguda com hipertensão, oligúria ou edema importante.',
      'Impossibilidade de tratamento e retorno ambulatorial adequados.'
    ],
    criteriosUTI: [
      'Síndrome do choque tóxico estreptocócico ou choque séptico.',
      'Obstrução de via aérea com necessidade de intervenção.',
      'Fasceíte necrosante com necessidade de desbridamento e suporte hemodinâmico.',
      'Insuficiência respiratória ou disfunção de múltiplos órgãos.'
    ],
    criteriosAlta: [
      'Afebril e com melhora da odinofagia, aceitando líquidos e alimentos.',
      'Antibiótico oral tolerado, com esquema de 10 dias garantido ou dose intramuscular já aplicada.',
      'Ausência de complicação supurativa ativa.',
      'Pressão arterial normal e urina sem alterações significativas quando avaliadas.',
      'Responsável orientado sobre a importância de completar o antibiótico e sobre os sinais de febre reumática e glomerulonefrite.'
    ],
    orientacoes: [
      'Dar o antibiótico todos os dias, nos horários certos, até o último dia (10 dias), mesmo que a criança melhore em 2 ou 3 dias: isso evita problema no coração (febre reumática) e nos rins.',
      'Se foi feita a injeção de penicilina benzatina, o tratamento já está completo com essa dose.',
      'A criança pode voltar à escola 24 horas após começar o antibiótico e não ter mais febre.',
      'Oferecer líquidos gelados, sorvete, gelatina e comida macia; evitar alimentos ácidos, quentes e apimentados.',
      'A pele das mãos e dos pés pode descascar de 1 a 3 semanas depois: isso é esperado e não precisa de tratamento.',
      'Retornar imediatamente se a criança não conseguir engolir a saliva, babar muito, tiver dificuldade para abrir a boca ou para respirar, ou se ficar muito prostrada.',
      'Procurar a unidade se, nas semanas seguintes, aparecerem inchaço nos olhos ou nas pernas, urina escura ou em pouca quantidade, dor que muda de articulação, falta de ar ou movimentos involuntários.'
    ],
    retorno: 'Reavaliação em 48 a 72 horas se não houver melhora; consulta de seguimento ao final do antibiótico e reavaliação em 2 a 4 semanas com medida da pressão arterial e exame de urina para rastrear glomerulonefrite e sinais de febre reumática.',
    prevencao: [
      'Diagnóstico e tratamento completo e precoce das faringoamigdalites estreptocócicas, principal medida de prevenção da febre reumática.',
      'Higiene das mãos, etiqueta respiratória e não compartilhamento de copos e talheres.',
      'Afastamento escolar por 24 horas após o início do antibiótico.',
      'Tratamento adequado de piodermites, que também são porta de entrada para glomerulonefrite pós-estreptocócica.',
      'Investigação e tratamento de contatos sintomáticos em surtos familiares e escolares.',
      'Profilaxia secundária com penicilina benzatina em quem já teve febre reumática, conforme protocolo do Ministério da Saúde.'
    ],
    fontes: [
      { nome: 'Diretrizes Brasileiras para o Diagnóstico, Tratamento e Prevenção da Febre Reumática – SBC/SBP/SBR', ano: 2009 },
      { nome: 'Sociedade Brasileira de Pediatria – Tratado de Pediatria', ano: 2022 },
      { nome: 'Nelson Textbook of Pediatrics, 21ª edição', ano: 2020 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'coqueluche',
    nome: 'Coqueluche',
    categoria: 'respiratoria',
    amazonia: false,
    cid10: 'A37',
    tags: ['tosse', 'coriza', 'vomitos', 'dispneia', 'febre', 'palidez', 'convulsao', 'alteracao_consciencia', 'fraqueza'],
    definicao: 'Infecção respiratória bacteriana aguda, de alta transmissibilidade, causada pela Bordetella pertussis, caracterizada por acessos de tosse paroxística seguidos de guincho inspiratório e vômitos pós-tosse. Em lactentes menores de 6 meses pode se manifestar por apneia, cianose e evoluir para coqueluche maligna, com hiperleucocitose e hipertensão pulmonar.',
    epidemiologia: 'Doença reemergente no Brasil desde 2011, com maior letalidade em menores de 6 meses, faixa ainda não totalmente imunizada. No Amazonas, a cobertura incompleta da pentavalente e da dTpa em gestantes, somada à dificuldade de acesso e à demora no diagnóstico em comunidades ribeirinhas e indígenas, contribui para internações tardias e óbitos. Adolescentes e adultos com imunidade em declínio, incluindo pais e irmãos, são a principal fonte de infecção para o lactente. Considerar coqueluche em todo lactente com tosse paroxística, apneia ou cianose, mesmo sem febre.',
    agente: 'Bordetella pertussis; Bordetella parapertussis causa quadro semelhante e mais leve.',
    transmissao: 'Gotículas respiratórias de pessoa doente, com transmissibilidade muito alta entre contatos domiciliares. O período de transmissão vai do início dos sintomas catarrais até 3 semanas após o começo dos paroxismos, reduzindo-se a 5 dias após o início do antibiótico adequado.',
    incubacao: '5 a 10 dias, podendo chegar a 21 dias.',
    manifestacoes: [
      'Fase catarral (1 a 2 semanas): coriza, espirros, tosse leve e febre baixa ou ausente, indistinguível de um resfriado; é a fase de maior transmissibilidade.',
      'Fase paroxística (2 a 6 semanas): acessos de tosse seca, em salvas, sem pausa para respirar, seguidos de guincho inspiratório, congestão facial, cianose, protrusão da língua e vômitos pós-tosse; a criança fica bem entre os acessos.',
      'Petéquias em face e pescoço e hemorragia subconjuntival pela pressão dos paroxismos.',
      'Lactentes menores de 3 a 6 meses frequentemente não fazem o guincho: apresentam apneia, cianose, engasgos, bradicardia e dificuldade para mamar, e a tosse pode ser discreta.',
      'Fase de convalescença (semanas a meses): redução gradual da frequência e da intensidade dos acessos, com possibilidade de recrudescência a cada nova infecção viral.',
      'Ausência de febre alta é a regra; febre alta sugere pneumonia secundária.',
      'Coqueluche maligna: hiperleucocitose acentuada (leucócitos frequentemente acima de 50.000/mm3 com linfocitose), taquicardia, insuficiência respiratória e hipertensão pulmonar, com alta letalidade em lactentes.',
      'Complicações: pneumonia (principal causa de óbito), atelectasia, pneumotórax, convulsões, encefalopatia hipóxica, hérnias e desnutrição por vômitos repetidos.'
    ],
    sinaisAlarme: [
      'Apneia, cianose ou engasgo durante os acessos de tosse, principalmente em menores de 6 meses.',
      'Dificuldade para mamar, recusa alimentar ou perda de peso.',
      'Taquipneia, tiragem, gemência ou saturação abaixo de 92% entre os acessos (sugere pneumonia).',
      'Leucocitose acima de 20.000 a 30.000/mm3 com linfocitose, e sobretudo acima de 50.000/mm3 (risco de coqueluche maligna).',
      'Taquicardia persistente e sinais de hipertensão pulmonar.',
      'Convulsão, sonolência ou alteração do nível de consciência.',
      'Idade menor de 3 meses com qualquer suspeita, prematuridade ou cardiopatia.',
      'Desidratação por vômitos pós-tosse repetidos.'
    ],
    diagnosticoDiferencial: ['bronquiolite', 'pneumonia', 'asma', 'tuberculose', 'aspiração de corpo estranho', 'refluxo gastroesofágico com aspiração', 'infecção por Mycoplasma, adenovírus ou Chlamydia trachomatis', 'fibrose cística'],
    exames: ['hemograma', 'PCR (biologia molecular) para Bordetella pertussis em aspirado ou swab de nasofaringe', 'cultura de nasofaringe para Bordetella (meio específico)', 'radiografia_torax', 'pcr', 'gasometria', 'eletrolitos', 'sodio', 'glicemia'],
    criteriosDiagnosticos: [
      'Caso suspeito em menores de 6 meses (Ministério da Saúde): tosse de qualquer duração com pelo menos um dos sinais de tosse paroxística, guincho, vômito pós-tosse, apneia ou cianose.',
      'Caso suspeito em maiores de 6 meses: tosse por 14 dias ou mais associada a tosse paroxística, guincho ou vômito pós-tosse.',
      'Notificação imediata à vigilância epidemiológica e coleta de material de nasofaringe antes do início do antibiótico, sempre que possível; não retardar o tratamento por causa da coleta.',
      'Hemograma com leucocitose e linfocitose absoluta reforça a suspeita em lactentes, mas sua ausência não exclui; leucocitose muito elevada é marcador de gravidade.',
      'Radiografia de tórax se suspeita de pneumonia, atelectasia ou pneumotórax; pode mostrar infiltrado peri-hilar com aspecto de coração felpudo.',
      'Registrar como quadro compatível com coqueluche e iniciar tratamento e quimioprofilaxia dos contatos conforme protocolo, sem aguardar confirmação laboratorial.'
    ],
    classificacaoGravidade: [
      { nivel: 'Leve', criterios: 'Criança maior, com paroxismos sem cianose ou apneia, alimentando-se bem, sem sinais respiratórios entre os acessos. Tratamento ambulatorial com macrolídeo e orientação.' },
      { nivel: 'Moderada', criterios: 'Paroxismos frequentes com vômitos e redução da ingestão, lactente de 3 a 6 meses, ou leucocitose moderada. Observação hospitalar, monitorização e suporte alimentar.' },
      { nivel: 'Grave', criterios: 'Menor de 3 meses, apneia, cianose, saturação abaixo de 92%, pneumonia, convulsão, leucocitose acima de 50.000/mm3 ou sinais de hipertensão pulmonar. Internação com monitorização contínua e avaliação de UTI.' }
    ],
    tratamento: [
      'Iniciar antibiótico assim que houver suspeita, sem aguardar confirmação laboratorial: o antibiótico reduz a transmissão e, se iniciado na fase catarral, atenua o quadro; iniciado na fase paroxística, altera pouco a evolução da tosse, mas ainda é indicado para interromper a cadeia de transmissão.',
      'Primeira escolha: azitromicina, inclusive em menores de 1 mês, em que é o macrolídeo preferido pelo menor risco de estenose hipertrófica do piloro em comparação à eritromicina.',
      'Alternativas: claritromicina a partir de 1 mês de idade; sulfametoxazol-trimetoprim a partir de 2 meses em caso de contraindicação ou intolerância aos macrolídeos.',
      'Internação obrigatória de menores de 3 meses e de todo lactente com apneia, cianose, dificuldade alimentar ou complicação; monitorização cardiorrespiratória contínua e oximetria.',
      'Suporte: ambiente calmo, com mínimo estímulo; aspiração suave de secreções apenas quando necessária, pois a manipulação desencadeia paroxismos; oxigênio se saturação abaixo de 92%.',
      'Nutrição e hidratação: mamadas ou refeições fracionadas e frequentes após os acessos; sonda nasogástrica ou hidratação intravenosa se ingestão insuficiente ou vômitos repetidos.',
      'Não usar antitussígenos, sedativos, anti-histamínicos, corticoides ou broncodilatadores de rotina: não têm eficácia comprovada na coqueluche.',
      'Antibiótico adicional para pneumonia bacteriana secundária, conforme o protocolo de pneumonia.',
      'Coqueluche maligna com hiperleucocitose: avaliação em UTI; exsanguineotransfusão ou leucaférese podem ser consideradas em centros de referência, conforme protocolo.',
      'Quimioprofilaxia dos contatos domiciliares e de risco com o mesmo esquema de macrolídeo do tratamento, conforme indicação da vigilância epidemiológica.',
      'Precaução para gotículas por 5 dias após o início do antibiótico (ou 3 semanas se não tratado).'
    ],
    medicamentos: [
      { medId: 'azitromicina', esquema: 'Menores de 6 meses: 10 mg/kg/dia VO 1 vez ao dia por 5 dias. A partir de 6 meses: 10 mg/kg no 1º dia (máximo 500 mg) e 5 mg/kg/dia do 2º ao 5º dia (máximo 250 mg/dia). Mesmo esquema para quimioprofilaxia de contatos. Confirmar conforme protocolo do MS e bula.' },
      { medId: 'claritromicina', esquema: 'A partir de 1 mês de idade: 15 mg/kg/dia VO dividida 12/12 h (máximo 1 g/dia) por 7 dias. Não indicada em menores de 1 mês.' },
      { medId: 'sulfametoxazol_trimetoprim', esquema: 'Alternativa a partir de 2 meses, em contraindicação aos macrolídeos: 40 mg/kg/dia de sulfametoxazol e 8 mg/kg/dia de trimetoprim VO dividida 12/12 h por 14 dias. Contraindicado em menores de 2 meses.' },
      { medId: 'soro_fisiologico', esquema: 'Instilação nasal e aspiração suave de secreções quando necessário; hidratação intravenosa quando a via oral for insuficiente, conforme protocolo.' },
      { medId: 'paracetamol', esquema: 'Febre ou desconforto: 10 a 15 mg/kg/dose VO a cada 6 horas, conforme bula.' },
      { medId: 'ceftriaxona', esquema: 'Apenas se pneumonia bacteriana secundária grave: 50 a 100 mg/kg/dia IV, conforme o protocolo de pneumonia.' }
    ],
    criteriosInternacao: [
      'Idade menor de 3 meses com suspeita de coqueluche (internação de regra).',
      'Apneia, cianose ou engasgos durante os paroxismos.',
      'Saturação abaixo de 92% ou desconforto respiratório entre os acessos.',
      'Dificuldade alimentar, vômitos repetidos, desidratação ou perda de peso.',
      'Leucocitose acima de 30.000 a 50.000/mm3 com linfocitose.',
      'Pneumonia, atelectasia, pneumotórax, convulsão ou encefalopatia.',
      'Prematuridade, cardiopatia, pneumopatia ou imunossupressão.',
      'Impossibilidade de retorno rápido em caso de piora (comunidade distante ou transporte fluvial demorado).'
    ],
    criteriosUTI: [
      'Apneias recorrentes ou necessidade de suporte ventilatório.',
      'Insuficiência respiratória ou hipoxemia refratária.',
      'Hiperleucocitose acentuada com sinais de hipertensão pulmonar ou choque.',
      'Convulsões ou encefalopatia.',
      'Instabilidade hemodinâmica.'
    ],
    criteriosAlta: [
      'Ausência de apneia, cianose ou dessaturação por pelo menos 24 a 48 horas de observação.',
      'Aceitação alimentar adequada e ganho ou estabilização de peso.',
      'Paroxismos menos frequentes e tolerados sem necessidade de oxigênio.',
      'Antibiótico completo ou esquema oral garantido até o término.',
      'Contatos domiciliares avaliados, com quimioprofilaxia e atualização vacinal orientadas.',
      'Responsável orientado sobre a duração prolongada da tosse e sobre os sinais de alarme.'
    ],
    orientacoes: [
      'A tosse pode durar semanas ou até 2 a 3 meses e melhora aos poucos; isso não significa que o tratamento falhou.',
      'Dar o antibiótico até o último dia, mesmo com a tosse continuando: ele serve principalmente para a criança não transmitir a doença.',
      'Alimentar em pequenas quantidades e várias vezes ao dia, de preferência logo após um acesso de tosse; manter o peito.',
      'Manter o ambiente calmo, sem fumaça de cigarro nem de fogão a lenha, e evitar mexer demais no bebê, pois isso provoca os acessos.',
      'Levar todos os contatos da casa à unidade de saúde para avaliação, remédio preventivo e atualização das vacinas.',
      'Retornar imediatamente se o bebê parar de respirar, ficar roxo ou molinho durante a tosse, se cansar para mamar, ficar ofegante, muito pálido, sonolento ou tiver convulsão.'
    ],
    retorno: 'Reavaliação em 24 a 48 horas nos lactentes tratados em casa e em 48 a 72 horas nas crianças maiores; retorno imediato diante de apneia, cianose ou dificuldade alimentar; consulta de seguimento para avaliar peso, nutrição e atualização vacinal da criança e dos contatos.',
    prevencao: [
      'Vacinação: pentavalente (DTP-HB-Hib) aos 2, 4 e 6 meses, com reforços de DTP aos 15 meses e aos 4 anos, conforme o calendário nacional.',
      'Vacina dTpa na gestante a partir da 20ª semana, em todas as gestações, medida de maior impacto na proteção do recém-nascido.',
      'Estratégia de cocoon: vacinação de dTpa em profissionais de saúde e atualização vacinal dos contatos domiciliares de lactentes.',
      'Quimioprofilaxia com macrolídeo para contatos domiciliares e de risco, conforme indicação da vigilância epidemiológica.',
      'Notificação imediata de casos suspeitos e investigação de comunicantes.',
      'Precaução para gotículas e afastamento até 5 dias de antibiótico eficaz.'
    ],
    fontes: [
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
      { nome: 'Sociedade Brasileira de Pediatria – Documento Científico sobre Coqueluche', ano: 2021 },
      { nome: 'Nelson Textbook of Pediatrics, 21ª edição', ano: 2020 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'mononucleose',
    nome: 'Mononucleose infecciosa',
    categoria: 'infecciosa',
    amazonia: false,
    cid10: 'B27',
    tags: ['febre', 'dor_garganta', 'linfonodomegalia', 'esplenomegalia', 'hepatomegalia', 'fraqueza', 'exantema', 'ictericia', 'cefaleia', 'dispneia'],
    definicao: 'Síndrome clínica causada principalmente pelo vírus Epstein-Barr, caracterizada pela triade febre, faringoamigdalite e linfonodomegalia, com linfocitose atípica, hepatoesplenomegalia e fadiga prolongada. O uso de aminopenicilinas nesse contexto costuma provocar exantema maculopapular extenso que não caracteriza alergia verdadeira.',
    epidemiologia: 'A infecção pelo vírus Epstein-Barr é universal e, em países de baixa e média renda, ocorre precocemente: na Amazônia a maioria das crianças se infecta antes dos 5 anos, geralmente de forma assintomática ou como faringite inespecífica. A forma clássica de mononucleose predomina em adolescentes e adultos jovens. A importância prática é evitar o uso desnecessário de antibiótico, reconhecer a esplenomegalia e orientar a restrição de esportes de contato, além de não rotular a criança como alérgica à amoxicilina após o exantema típico.',
    agente: 'Vírus Epstein-Barr (herpesvírus humano tipo 4) na maioria dos casos; síndrome semelhante pode ser causada por citomegalovírus, toxoplasmose, HIV agudo, adenovírus e herpesvírus humano tipo 6.',
    transmissao: 'Contato íntimo com saliva (doença do beijo), compartilhamento de copos, talheres e mamadeiras; menos comumente por transfusão e transplante. A eliminação viral pode persistir por meses após a doença e de forma intermitente por toda a vida.',
    incubacao: '30 a 50 dias em adolescentes; mais curta e frequentemente indefinida em crianças pequenas.',
    manifestacoes: [
      'Pródromo de mal-estar, fadiga, cefaleia, mialgia e febre por vários dias antes do quadro faríngeo.',
      'Febre prolongada, muitas vezes por 1 a 2 semanas, com fadiga intensa e desproporcional aos demais achados.',
      'Faringoamigdalite exsudativa, por vezes com aspecto membranoso acinzentado, petéquias no palato e halitose, indistinguível clinicamente da faringite estreptocócica.',
      'Linfonodomegalia generalizada, com predomínio cervical posterior, simétrica, móvel e dolorosa; esse padrão cervical posterior é bastante sugestivo.',
      'Esplenomegalia em cerca de metade dos casos, geralmente a partir da segunda semana, e hepatomegalia com elevação de transaminases; icterícia é menos comum.',
      'Edema palpebral bilateral (sinal de Hoagland) e edema de úvula.',
      'Exantema maculopapular extenso e pruriginoso em grande parte dos pacientes que recebem amoxicilina ou ampicilina; reação relacionada ao contexto da infecção, não indicando necessariamente alergia permanente.',
      'Complicações: obstrução de via aérea por hipertrofia amigdaliana e adenoidiana, ruptura esplênica (rara e grave), anemia hemolítica, plaquetopenia, hepatite, meningoencefalite, síndrome de Guillain-Barré e ataxia.'
    ],
    sinaisAlarme: [
      'Estridor, dispneia, respiração ruidosa ao dormir ou sialorreia (obstrução de via aérea por hipertrofia linfoide).',
      'Dor abdominal intensa, dor no ombro esquerdo, palidez ou hipotensão (suspeita de ruptura esplênica, emergência cirúrgica).',
      'Icterícia, sangramento, petéquias ou palidez importante.',
      'Cefaleia intensa, rigidez de nuca, convulsão, alteração de consciência ou fraqueza progressiva dos membros.',
      'Desidratação por recusa de líquidos decorrente da dor de garganta.',
      'Febre persistente por mais de 2 a 3 semanas ou perda de peso significativa (reavaliar diagnóstico, incluindo neoplasia hematológica e tuberculose).',
      'Imunossupressão conhecida.'
    ],
    diagnosticoDiferencial: ['faringoamigdalite_estreptococica', 'escarlatina', 'citomegalovirose', 'toxoplasmose adquirida', 'infecção aguda pelo HIV', 'hiv_pediatrico', 'leucemia e linfoma', 'hepatite_a', 'tuberculose', 'leishmaniose_visceral', 'doença de Kawasaki'],
    exames: ['hemograma', 'pesquisa de linfócitos atípicos no esfregaço de sangue periférico', 'ast', 'alt', 'bilirrubinas', 'sorologia para Epstein-Barr (anti-VCA IgM e IgG, anti-EBNA)', 'teste de anticorpos heterófilos (monoteste), de menor sensibilidade em menores de 4 anos', 'teste rápido para estreptococo do grupo A', 'ultrassonografia de abdome (avaliação de baço e fígado)', 'sorologia para HIV', 'pcr', 'vhs'],
    criteriosDiagnosticos: [
      'Quadro clínico compatível: febre prolongada, faringoamigdalite exsudativa, linfonodomegalia cervical posterior e fadiga, com ou sem hepatoesplenomegalia.',
      'Hemograma com linfocitose e presença de linfócitos atípicos (tipicamente acima de 10% do total de linfócitos) reforça a hipótese.',
      'Sorologia específica para Epstein-Barr é o método mais confiável em crianças; anticorpos heterófilos têm baixa sensibilidade em menores de 4 anos.',
      'Teste rápido ou cultura para estreptococo pode ser positivo por colonização; a presença de exsudato não autoriza, isoladamente, assumir etiologia estreptocócica quando o quadro é sugestivo de mononucleose.',
      'Elevação de transaminases é frequente e habitualmente transitória; solicitar AST, ALT e bilirrubinas nos casos com hepatomegalia ou icterícia.',
      'Considerar sorologia para HIV em adolescentes com síndrome mononucleose-símile, conforme protocolo e após aconselhamento.',
      'Registrar como quadro compatível com mononucleose infecciosa, com confirmação sorológica conforme indicação.'
    ],
    classificacaoGravidade: [
      { nivel: 'Leve a moderada', criterios: 'Febre, faringite e linfonodomegalia com boa aceitação oral, sem esplenomegalia volumosa nem sinais de obstrução. Manejo domiciliar com repouso, analgesia e hidratação.' },
      { nivel: 'Com complicação', criterios: 'Desidratação por odinofagia, hepatite com icterícia, plaquetopenia, anemia hemolítica ou esplenomegalia importante. Observação ou internação conforme a intensidade, com exames seriados.' },
      { nivel: 'Grave', criterios: 'Obstrução de via aérea, suspeita de ruptura esplênica, manifestação neurológica, citopenias graves ou síndrome hemofagocítica. Internação imediata, avaliação especializada e UTI conforme necessidade.' }
    ],
    tratamento: [
      'Tratamento de suporte: repouso relativo conforme a tolerância, hidratação e analgesia. Não há antiviral indicado na mononucleose não complicada (o aciclovir reduz a eliminação viral, mas não muda a evolução clínica).',
      'Analgesia e antitérmico com paracetamol ou dipirona; ibuprofeno pode ser usado se não houver plaquetopenia nem suspeita de dengue.',
      'Evitar amoxicilina e ampicilina quando houver suspeita de mononucleose, pelo exantema característico; se o exantema ocorrer, explicar à família que não se trata necessariamente de alergia permanente à penicilina e registrar o episódio de forma clara no prontuário.',
      'Antibiótico apenas se houver faringite estreptocócica confirmada em concomitância, preferindo nesse caso penicilina benzatina ou outro antibiótico que não seja aminopenicilina.',
      'Restrição de esportes de contato, educação física, lutas e atividades com risco de trauma abdominal por pelo menos 3 a 4 semanas do início dos sintomas, e por mais tempo se a esplenomegalia persistir, conforme reavaliação clínica ou ultrassonográfica.',
      'Corticoide sistêmico não é indicado de rotina; pode ser considerado em situações específicas, como obstrução iminente de via aérea por hipertrofia amigdaliana, plaquetopenia grave ou anemia hemolítica, conforme avaliação especializada.',
      'Obstrução de via aérea: internação, cabeceira elevada, oxigênio, corticoide conforme avaliação e suporte otorrinolaringológico.',
      'Hidratação intravenosa se a odinofagia impedir a ingestão.',
      'Explicar que a fadiga pode durar semanas a alguns meses e que o retorno às atividades deve ser gradual.'
    ],
    medicamentos: [
      { medId: 'paracetamol', esquema: 'Febre e dor: 10 a 15 mg/kg/dose VO a cada 6 horas, conforme bula.' },
      { medId: 'dipirona', esquema: 'Alternativa analgésica e antitérmica: 10 a 15 mg/kg/dose VO ou IV a cada 6 horas, conforme bula.' },
      { medId: 'ibuprofeno', esquema: 'Odinofagia intensa, se não houver plaquetopenia nem suspeita de dengue: 5 a 10 mg/kg/dose VO a cada 6 a 8 horas, conforme bula.' },
      { medId: 'prednisolona', esquema: 'Apenas em situações selecionadas (obstrução de via aérea iminente, plaquetopenia grave, anemia hemolítica): 1 a 2 mg/kg/dia VO (máximo 60 mg/dia) por curto período, conforme avaliação especializada e protocolo. Não usar de rotina.' },
      { medId: 'dexametasona', esquema: 'Alternativa em obstrução de via aérea, conforme protocolo do serviço e avaliação especializada; confirmar dose conforme protocolo.' },
      { medId: 'penicilina_benzatina', esquema: 'Somente se houver faringite estreptocócica confirmada concomitante: dose única IM de 600.000 UI (menos de 27 kg) ou 1.200.000 UI (27 kg ou mais), evitando aminopenicilinas.' },
      { medId: 'soro_fisiologico', esquema: 'Hidratação intravenosa quando a ingestão oral estiver comprometida, conforme protocolo.' }
    ],
    criteriosInternacao: [
      'Obstrução de via aérea, estridor ou dispneia.',
      'Desidratação ou incapacidade de ingerir líquidos por odinofagia.',
      'Suspeita de ruptura esplênica ou dor abdominal intensa.',
      'Hepatite com icterícia importante ou coagulopatia.',
      'Plaquetopenia com sangramento ou anemia hemolítica sintomática.',
      'Manifestação neurológica.',
      'Dúvida diagnóstica com suspeita de neoplasia hematológica.'
    ],
    criteriosUTI: [
      'Obstrução grave de via aérea com necessidade de intervenção.',
      'Choque hemorrágico por ruptura esplênica.',
      'Insuficiência hepática aguda.',
      'Manifestação neurológica grave: encefalite, estado de mal, Guillain-Barré com comprometimento respiratório.',
      'Síndrome hemofagocítica associada ao Epstein-Barr.'
    ],
    criteriosAlta: [
      'Via aérea pérvia e ausência de desconforto respiratório.',
      'Aceitação oral adequada e hidratação restabelecida.',
      'Ausência de dor abdominal e estabilidade hemodinâmica.',
      'Exames laboratoriais em melhora ou estáveis quando alterados.',
      'Família orientada sobre restrição de esportes de contato e sobre a duração da fadiga.',
      'Seguimento ambulatorial agendado.'
    ],
    orientacoes: [
      'O cansaço pode durar várias semanas: retomar as atividades aos poucos, respeitando o ritmo da criança ou do adolescente.',
      'Não praticar esportes de contato, lutas, educação física ou brincadeiras com risco de pancada na barriga por pelo menos 3 a 4 semanas, porque o baço pode estar aumentado e há risco de ruptura.',
      'Oferecer líquidos gelados e alimentos macios; evitar alimentos ácidos, quentes e duros.',
      'Não compartilhar copos, talheres, garrafas e escovas de dente; evitar beijos na boca enquanto houver sintomas.',
      'Se aparecerem manchas vermelhas no corpo depois do antibiótico, avisar a equipe: na mononucleose isso é comum e nem sempre significa alergia.',
      'Retornar imediatamente se houver dor forte na barriga, principalmente do lado esquerdo ou no ombro esquerdo, palidez, desmaio, dificuldade para respirar, ronco alto com pausas ao dormir, pele ou olhos amarelos, manchas roxas ou sonolência.'
    ],
    retorno: 'Reavaliação em 5 a 7 dias para acompanhar a febre, o baço e a aceitação oral, com retorno imediato diante de sinais de alarme; nova avaliação em 3 a 4 semanas antes da liberação para esportes de contato e, quando alterados, repetição de hemograma e transaminases.',
    prevencao: [
      'Não há vacina disponível.',
      'Evitar o compartilhamento de copos, talheres, mamadeiras, chupetas e escovas de dente.',
      'Higiene das mãos e etiqueta respiratória.',
      'Orientação a adolescentes sobre transmissão pela saliva.',
      'Cuidado redobrado com contato próximo de pacientes imunossuprimidos.',
      'Uso criterioso de aminopenicilinas em faringites sem confirmação estreptocócica, o que também reduz rótulos equivocados de alergia.'
    ],
    fontes: [
      { nome: 'Sociedade Brasileira de Pediatria – Tratado de Pediatria', ano: 2022 },
      { nome: 'Nelson Textbook of Pediatrics, 21ª edição', ano: 2020 },
      { nome: 'Sociedade Brasileira de Infectologia – Diretrizes de infecções por herpesvírus', ano: 2021 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'caxumba',
    nome: 'Caxumba (parotidite infecciosa)',
    categoria: 'infecciosa',
    amazonia: false,
    cid10: 'B26',
    tags: ['febre', 'dor_local', 'cefaleia', 'vomitos', 'dor_abdominal', 'rigidez_nuca', 'fraqueza', 'linfonodomegalia', 'alteracao_consciencia'],
    definicao: 'Infecção viral aguda sistêmica com tropismo por glândulas salivares e outros tecidos glandulares e pelo sistema nervoso central, caracterizada por aumento doloroso das parótidas, uni ou bilateral. As principais complicações são meningite asséptica, orquiepididimite em adolescentes, pancreatite e surdez neurossensorial.',
    epidemiologia: 'Apesar da vacinação, surtos continuam a ocorrer em escolas, universidades, quartéis e comunidades com cobertura vacinal insuficiente, inclusive em municípios do Amazonas. A maioria dos casos ocorre em crianças em idade escolar e adolescentes. A doença não é de notificação individual em todo o país, mas surtos devem ser notificados e investigados. A imunidade após duas doses da triplice viral é alta, embora possa haver casos em vacinados, geralmente mais leves.',
    agente: 'Vírus da caxumba (Orthorubulavirus, família Paramyxoviridae).',
    transmissao: 'Gotículas respiratórias e contato com saliva de pessoa infectada e com objetos contaminados. Transmissibilidade de 2 dias antes até 5 dias após o início da parotidite (período de isolamento recomendado).',
    incubacao: '12 a 25 dias, em média 16 a 18 dias.',
    manifestacoes: [
      'Pródromo de 1 a 2 dias com febre baixa, cefaleia, mialgia, mal-estar e inapetência.',
      'Aumento doloroso da parótida, inicialmente unilateral e tornando-se bilateral em cerca de 70% dos casos em 2 a 3 dias; o lobo da orelha é deslocado para cima e para fora e o ângulo da mandíbula fica apagado.',
      'Dor que piora ao mastigar, ao abrir a boca e com alimentos ácidos; trismo e otalgia referida.',
      'Edema e eritema do óstio do ducto de Stensen na mucosa jugal, sem saída de pus (a presença de pus sugere parotidite bacteriana).',
      'Acometimento de glândulas submandibulares e sublinguais em parte dos casos.',
      'Meningite asséptica, com cefaleia, vômitos, rigidez de nuca e febre, podendo ocorrer antes, durante ou após a parotidite e até sem parotidite; costuma ter evolução benigna.',
      'Orquiepididimite em adolescentes e adultos pós-puberais, com dor testicular intensa, edema, febre alta e risco de atrofia testicular; ooforite, mastite e pancreatite (dor abdominal alta e vômitos) também podem ocorrer.',
      'Surdez neurossensorial, geralmente unilateral, complicação rara mas potencialmente permanente; encefalite é rara.'
    ],
    sinaisAlarme: [
      'Cefaleia intensa, vômitos persistentes, rigidez de nuca, fotofobia, sonolência ou convulsão (meningite ou encefalite).',
      'Dor e edema testicular em adolescente, com febre alta.',
      'Dor abdominal alta persistente com vômitos (pancreatite).',
      'Perda auditiva ou queixa de zumbido e desequilíbrio.',
      'Parótida muito endurecida, eritematosa e com saída de pus pelo ducto, ou toxemia (parotidite bacteriana).',
      'Desidratação por dor à deglutição.',
      'Edema cervical importante com desconforto respiratório ou disfagia grave.'
    ],
    diagnosticoDiferencial: ['parotidite bacteriana (supurativa)', 'parotidite recorrente juvenil', 'cálculo de glândula salivar (sialolitíase)', 'linfadenite cervical e adenite bacteriana', 'mononucleose', 'abscesso dentário', 'tumor de parótida', 'parotidite por HIV', 'hiv_pediatrico'],
    exames: ['amilase sérica e amilase salivar', 'lipase (se suspeita de pancreatite)', 'hemograma', 'pcr', 'liquor', 'sorologia IgM e IgG para caxumba', 'RT-PCR para vírus da caxumba em saliva, swab de ducto de Stensen ou urina', 'ultrassonografia de parótidas ou de bolsa escrotal', 'glicemia'],
    criteriosDiagnosticos: [
      'Diagnóstico clínico: aumento doloroso agudo de parótidas, uni ou bilateral, com duração de pelo menos 2 dias e sem outra causa aparente, com ou sem história de contato.',
      'Amilase sérica elevada apoia a origem salivar; lipase elevada sugere pancreatite associada.',
      'Sorologia IgM ou RT-PCR indicadas em investigação de surto, casos atípicos, complicações e em pacientes vacinados, conforme orientação da vigilância.',
      'Punção lombar indicada diante de sinais meníngeos; o liquor mostra pleocitose com predomínio linfocitário, glicose normal ou levemente baixa e proteína pouco elevada.',
      'Notificar surtos (dois ou mais casos relacionados) à vigilância epidemiológica e investigar a situação vacinal dos contatos.',
      'Avaliação audiológica quando houver queixa auditiva, conforme protocolo.',
      'Registrar como quadro compatível com caxumba, mantendo confirmação conforme protocolo.'
    ],
    classificacaoGravidade: [
      { nivel: 'Não complicada', criterios: 'Parotidite com febre e dor, boa aceitação oral, sem sinais meníngeos, testiculares ou abdominais. Manejo domiciliar com analgesia, hidratação e isolamento por 5 dias.' },
      { nivel: 'Com complicação', criterios: 'Meningite asséptica com bom estado geral, orquiepididimite, pancreatite leve ou desidratação por dor. Observação ou internação conforme a intensidade, com analgesia e suporte.' },
      { nivel: 'Grave', criterios: 'Encefalite, meningite com alteração de consciência, pancreatite grave, surdez súbita ou desidratação grave. Internação, investigação ampliada e avaliação especializada.' }
    ],
    tratamento: [
      'Não há antiviral específico: o tratamento é sintomático e de suporte.',
      'Analgesia e antitérmico com paracetamol ou dipirona; ibuprofeno é útil pelo componente inflamatório e doloroso, em criança hidratada e sem contraindicação.',
      'Compressas mornas ou frias sobre a parótida, conforme o conforto do paciente.',
      'Dieta pastosa, de fácil mastigação, evitando alimentos ácidos e cítricos, que aumentam a dor por estimular a salivação.',
      'Hidratação oral frequente; hidratação intravenosa se a dor impedir a ingestão.',
      'Higiene oral cuidadosa.',
      'Orquiepididimite: repouso no leito, suspensório escrotal ou apoio, compressas frias e analgesia com anti-inflamatório; corticoide não demonstrou prevenir a atrofia testicular e não é indicado de rotina.',
      'Meningite asséptica: internação para observação e analgesia, hidratação e controle de vômitos; antibiótico apenas até afastar meningite bacteriana, conforme o protocolo de meningite.',
      'Pancreatite: jejum ou dieta conforme tolerância, hidratação intravenosa, analgesia e controle laboratorial, conforme protocolo.',
      'Isolamento respiratório por gotículas e afastamento de escola, creche e trabalho por 5 dias a partir do início da parotidite.',
      'Avaliação audiológica se houver queixa auditiva; a vacinação pós-exposição não previne a doença no contato já exposto, mas protege em exposições futuras e é recomendada para atualizar o esquema.'
    ],
    medicamentos: [
      { medId: 'paracetamol', esquema: 'Dor e febre: 10 a 15 mg/kg/dose VO a cada 6 horas, conforme bula.' },
      { medId: 'ibuprofeno', esquema: 'Dor e inflamação, inclusive na orquiepididimite, em paciente hidratado e sem suspeita de dengue: 5 a 10 mg/kg/dose VO a cada 6 a 8 horas, conforme bula.' },
      { medId: 'dipirona', esquema: 'Alternativa analgésica e antitérmica: 10 a 15 mg/kg/dose VO ou IV a cada 6 horas, conforme bula.' },
      { medId: 'soro_fisiologico', esquema: 'Hidratação intravenosa quando a via oral estiver comprometida pela dor ou por vômitos, conforme protocolo.' },
      { medId: 'ondansetrona', esquema: 'Vômitos persistentes na meningite asséptica ou pancreatite: uso conforme protocolo do serviço e bula.' },
      { medId: 'cefalexina', esquema: 'Apenas se parotidite bacteriana confirmada ou fortemente suspeita (pus pelo ducto, toxemia): 50 mg/kg/dia VO dividida 6/6 h, com reavaliação; formas graves exigem antibiótico parenteral com cobertura para Staphylococcus aureus, conforme protocolo.' }
    ],
    criteriosInternacao: [
      'Sinais meníngeos, cefaleia intensa, vômitos persistentes ou alteração de consciência.',
      'Orquiepididimite com dor intensa não controlada ou dúvida com torção testicular (avaliação cirúrgica urgente).',
      'Pancreatite com vômitos e desidratação.',
      'Desidratação ou incapacidade de ingerir líquidos.',
      'Suspeita de parotidite bacteriana com toxemia.',
      'Surdez súbita ou outra complicação neurológica.'
    ],
    criteriosUTI: [
      'Encefalite com rebaixamento do nível de consciência ou estado de mal epiléptico.',
      'Pancreatite grave com instabilidade hemodinâmica.',
      'Insuficiência respiratória ou necessidade de proteção de via aérea.',
      'Choque de qualquer etiologia associada.'
    ],
    criteriosAlta: [
      'Dor controlada com analgesia oral e boa aceitação de líquidos e alimentos.',
      'Afebril ou com febre em queda, sem sinais meníngeos em evolução.',
      'Ausência de vômitos e hidratação adequada.',
      'Liquor e exames compatíveis com evolução benigna, quando realizados.',
      'Responsável orientado sobre isolamento por 5 dias, sinais de alarme e retorno.',
      'Avaliação audiológica agendada quando indicada.'
    ],
    orientacoes: [
      'Manter a criança em casa, sem escola nem creche, por 5 dias a partir do início do inchaço no rosto.',
      'Oferecer comida macia e pastosa e evitar limão, laranja, abacaxi, vinagre e alimentos duros, que aumentam a dor.',
      'Fazer compressas mornas ou frias no rosto, conforme o que aliviar mais, e dar o remédio para dor nos horários orientados.',
      'Adolescentes devem evitar esforço físico enquanto houver dor; em caso de dor ou inchaço nos testículos, procurar atendimento no mesmo dia.',
      'Retornar imediatamente se houver dor de cabeça forte, vômitos repetidos, pescoço duro, sonolência, convulsão, dor forte na barriga, dor nos testículos ou queixa de que está ouvindo menos de um lado.',
      'Levar o cartão de vacina de todos os moradores da casa para atualização da triplice viral.'
    ],
    retorno: 'Reavaliação em 48 a 72 horas ou antes se houver piora; retorno imediato diante de sinais meníngeos, dor testicular ou dor abdominal intensa; consulta de seguimento para avaliar audição se houver qualquer queixa auditiva.',
    prevencao: [
      'Vacinação: triplice viral aos 12 meses e tetraviral (ou triplice viral com varicela) aos 15 meses, com duas doses conforme o calendário nacional.',
      'Atualização vacinal de adolescentes e adultos jovens suscetíveis, especialmente em surtos escolares e em instituições.',
      'Isolamento por gotículas e afastamento por 5 dias do início da parotidite.',
      'Higiene das mãos e não compartilhamento de copos, talheres e garrafas.',
      'Notificação e investigação de surtos, com busca ativa e bloqueio vacinal dos contatos suscetíveis.',
      'Orientação de que a vacina aplicada após a exposição não evita aquele episódio, mas protege em exposições futuras.'
    ],
    fontes: [
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
      { nome: 'Sociedade Brasileira de Pediatria – Tratado de Pediatria', ano: 2022 },
      { nome: 'Nelson Textbook of Pediatrics, 21ª edição', ano: 2020 }
    ],
    atualizadoEm: '2026-09'
  },

  // =====================================================================
  // OUTRAS PREVALENTES
  // =====================================================================
  {
    id: 'hepatite_a',
    nome: 'Hepatite A',
    categoria: 'gastrointestinal',
    amazonia: false,
    cid10: 'B15',
    tags: ['ictericia', 'febre', 'vomitos', 'dor_abdominal', 'diarreia', 'hepatomegalia', 'fraqueza', 'prurido', 'sangramento', 'alteracao_consciencia'],
    definicao: 'Hepatite viral aguda de transmissão fecal-oral causada pelo vírus da hepatite A, geralmente benigna e autolimitada na infância, frequentemente anictérica em menores de 6 anos. Não cronifica, mas pode evoluir, de forma rara, para hepatite fulminante, e é causa frequente de surtos onde há saneamento precário.',
    epidemiologia: 'A região Norte tem historicamente as maiores taxas de infecção pelo vírus da hepatite A do país, associadas à ausência de saneamento básico, ao consumo de água de igarapés, poços e rios sem tratamento e às enchentes, que contaminam poços e quintais. Surtos em escolas, creches e comunidades ribeirinhas são comuns no período de cheia. A introdução da vacina no calendário infantil aos 15 meses (dose única) reduziu a incidência em crianças, mas a suscetibilidade de adolescentes e adultos não vacinados permanece, e nestes a doença é mais grave. Notificação compulsória.',
    agente: 'Vírus da hepatite A (HAV), da família Picornaviridae, RNA vírus muito resistente no ambiente.',
    transmissao: 'Fecal-oral: água e alimentos contaminados (inclusive frutos do mar e hortaliças), contato pessoa a pessoa em domicílio e creches, e más condições de higiene. A eliminação viral nas fezes é máxima nas 2 semanas anteriores ao início da icterícia e reduz-se após a primeira semana de icterícia.',
    incubacao: '15 a 50 dias, em média 28 a 30 dias.',
    manifestacoes: [
      'Fase prodrômica de 3 a 10 dias: febre baixa, mal-estar, inapetência importante, náuseas, vômitos, dor abdominal em hipocôndrio direito e, por vezes, diarreia; aversão a alimentos gordurosos e ao cheiro de comida.',
      'Fase ictérica: icterícia de pele e escleras, colúria (urina escura, cor de refrigerante) e acolia ou hipocolia fecal (fezes claras); com o surgimento da icterícia, a febre e os sintomas gerais costumam melhorar.',
      'Hepatomegalia dolorosa à palpação e, menos frequentemente, esplenomegalia e linfonodomegalia.',
      'Prurido cutâneo nas formas colestáticas, que podem prolongar a icterícia por semanas.',
      'Em menores de 6 anos, a infecção costuma ser anictérica e oligossintomática, podendo passar por gastroenterite; essas crianças são importantes disseminadoras em creches.',
      'Elevação acentuada de transaminases, frequentemente acima de 10 vezes o limite superior, com ALT em geral maior que AST, e aumento de bilirrubina direta.',
      'Recuperação completa em 2 a 8 semanas na maioria; formas prolongadas ou recidivantes ocorrem em uma minoria, sem cronificação.',
      'Hepatite fulminante (rara, menos de 1%): icterícia intensa, redução do fígado à palpação, sonolência, confusão, flapping e sangramento, com alargamento do tempo de protrombina.'
    ],
    sinaisAlarme: [
      'Sonolência, confusão, agitação, inversão do ciclo do sono, flapping (asterixe) ou qualquer alteração do comportamento (encefalopatia hepática).',
      'Sangramento de gengivas, epistaxe, equimoses ou sangramento digestivo.',
      'Vômitos incoercíveis e incapacidade de ingerir líquidos, com desidratação.',
      'Redução do tamanho do fígado com piora da icterícia.',
      'Alargamento do tempo de protrombina ou RNI elevado (RNI acima de 1,5 é sinal de alarme; acima de 2 sugere falência hepática).',
      'Hipoglicemia.',
      'Icterícia que se prolonga por mais de 8 a 12 semanas ou piora progressiva.',
      'Ascite ou edema.'
    ],
    diagnosticoDiferencial: ['hepatites B, C, D e E', 'mononucleose', 'leptospirose', 'malaria', 'febre_amarela', 'dengue', 'febre_tifoide', 'hepatite medicamentosa ou por plantas e chás', 'doenças metabólicas e autoimunes do fígado', 'colecistite e colelitíase', 'leishmaniose_visceral'],
    exames: ['sorologia anti-HAV IgM (confirmatório na fase aguda) e anti-HAV IgG', 'alt', 'ast', 'bilirrubinas', 'coagulograma', 'glicemia', 'albumina', 'hemograma', 'ureia', 'creatinina', 'sorologias para hepatites B e C', 'ultrassonografia de abdome', 'gota_espessa', 'sorologia_dengue'],
    criteriosDiagnosticos: [
      'Caso suspeito: criança com icterícia aguda, colúria, acolia fecal ou elevação de transaminases, com ou sem sintomas gastrointestinais, especialmente com história de contato ou exposição a água e alimentos de procedência duvidosa.',
      'Confirmação: anti-HAV IgM reagente em amostra de sangue.',
      'Notificação compulsória das hepatites virais à vigilância epidemiológica, com investigação de contatos e da fonte comum em surtos.',
      'Solicitar coagulograma (tempo de protrombina e RNI) em todo caso com icterícia, pois é o melhor marcador precoce de gravidade; a magnitude das transaminases não indica gravidade.',
      'Solicitar glicemia, especialmente em lactentes e em casos com vômitos, pelo risco de hipoglicemia.',
      'Afastar outras causas de icterícia febril em área endêmica: solicitar pesquisa de malária, sorologia para dengue e avaliar leptospirose conforme a história.',
      'Registrar como quadro compatível com hepatite A, com confirmação sorológica conforme protocolo.'
    ],
    classificacaoGravidade: [
      { nivel: 'Leve (forma comum)', criterios: 'Icterícia com bom estado geral, aceitando líquidos, sem sangramento nem alteração neurológica, RNI normal. Acompanhamento ambulatorial com repouso relativo e reavaliação.' },
      { nivel: 'Moderada ou colestática', criterios: 'Vômitos com ingestão reduzida, icterícia intensa e prolongada com prurido, ou desidratação leve. Observação, hidratação e reavaliação laboratorial frequente.' },
      { nivel: 'Grave ou fulminante', criterios: 'Encefalopatia hepática, sangramento, RNI acima de 1,5 (ou acima de 2 sem encefalopatia), hipoglicemia, redução do fígado ou vômitos incoercíveis. Internação imediata e contato com centro de transplante hepático.' }
    ],
    tratamento: [
      'Não há tratamento antiviral específico: o manejo é de suporte, com foco na hidratação, na nutrição e na vigilância de sinais de falência hepática.',
      'Dieta livre conforme a aceitação da criança, sem restrição de gordura obrigatória; o importante é manter o aporte calórico, oferecendo alimentos que a criança tolere, em pequenas porções e várias vezes ao dia.',
      'Hidratação oral frequente; hidratação intravenosa com glicose se vômitos, recusa alimentar ou hipoglicemia.',
      'Repouso relativo conforme a disposição da criança; não é necessário repouso absoluto no leito.',
      'Suspender medicamentos hepatotóxicos e desnecessários; evitar chás e preparações caseiras com potencial hepatotóxico, prática comum na região.',
      'Antitérmico e analgesia: usar paracetamol com cautela e em doses habituais, sem ultrapassar a dose máxima diária, ou preferir dipirona conforme avaliação; evitar anti-inflamatórios não esteroidais.',
      'Antieméticos como ondansetrona podem ser usados para vômitos, conforme protocolo e bula.',
      'Prurido colestático: medidas locais e anti-histamínico conforme avaliação; colestiramina apenas conforme prescrição especializada.',
      'Monitorar RNI, glicemia, transaminases e bilirrubinas conforme a gravidade; piora do RNI ou surgimento de sonolência exige internação imediata.',
      'Isolamento entérico e higiene rigorosa das mãos; afastar de creche e escola por 1 semana após o início da icterícia.',
      'Profilaxia pós-exposição dos contatos domiciliares e de creche suscetíveis: vacina hepatite A, e imunoglobulina humana normal em menores de 1 ano, imunossuprimidos e hepatopatas, conforme o CRIE e a vigilância.'
    ],
    medicamentos: [
      { medId: 'sais_reidratacao_oral', esquema: 'Reposição de perdas por vômitos e diarreia e manutenção da hidratação, conforme plano A ou B do AIDPI.' },
      { medId: 'soro_fisiologico', esquema: 'Hidratação intravenosa quando a via oral estiver comprometida; associar glicose conforme necessidade, com controle de glicemia, segundo protocolo.' },
      { medId: 'glicose', esquema: 'Correção de hipoglicemia e manutenção do aporte de glicose na hepatite grave, conforme protocolo do serviço.' },
      { medId: 'ondansetrona', esquema: 'Vômitos persistentes: uso conforme protocolo do serviço e bula.' },
      { medId: 'paracetamol', esquema: 'Se necessário para febre ou dor: 10 a 15 mg/kg/dose VO a cada 6 horas, respeitando rigorosamente a dose máxima diária; usar com cautela em hepatopatia e evitar em hepatite grave, conforme avaliação.' },
      { medId: 'dipirona', esquema: 'Alternativa antitérmica: 10 a 15 mg/kg/dose VO ou IV a cada 6 horas, conforme bula e avaliação clínica.' },
      { medId: null, nome: 'Vitamina K (fitomenadiona)', esquema: 'Em caso de alargamento do tempo de protrombina, dose e via conforme protocolo do serviço; a resposta ao uso auxilia a diferenciar deficiência de vitamina K de falência hepatocelular. Confirmar conforme protocolo e bula.' },
      { medId: null, nome: 'Imunoglobulina humana normal', esquema: 'Profilaxia pós-exposição em menores de 1 ano, imunossuprimidos e hepatopatas crônicos, preferencialmente em até 14 dias da exposição, conforme o manual do CRIE; confirmar conforme protocolo.' }
    ],
    criteriosInternacao: [
      'Qualquer sinal de encefalopatia hepática: sonolência, confusão, irritabilidade, inversão do sono, flapping.',
      'RNI ou tempo de protrombina alargados.',
      'Sangramento espontâneo.',
      'Vômitos incoercíveis, desidratação ou hipoglicemia.',
      'Icterícia intensa e progressiva com piora do estado geral.',
      'Lactente com hepatite aguda.',
      'Comorbidade hepática prévia ou imunossupressão.',
      'Impossibilidade de reavaliação e retorno em tempo adequado (comunidade distante).'
    ],
    criteriosUTI: [
      'Encefalopatia hepática grau II ou maior.',
      'Coagulopatia com sangramento ativo.',
      'Hipoglicemia refratária ou instabilidade hemodinâmica.',
      'Insuficiência hepática aguda com indicação de contato com centro de transplante.',
      'Insuficiência respiratória ou necessidade de proteção de via aérea.'
    ],
    criteriosAlta: [
      'Aceitação oral adequada, sem vômitos, hidratação e glicemia normais.',
      'Ausência de encefalopatia e de sangramento.',
      'RNI normal ou em normalização.',
      'Icterícia estável ou em regressão, com bom estado geral.',
      'Família orientada sobre higiene, isolamento entérico e sinais de alarme.',
      'Seguimento laboratorial ambulatorial agendado.'
    ],
    orientacoes: [
      'A criança pode comer normalmente o que aceitar, em pequenas quantidades e várias vezes ao dia; não é preciso dieta sem gordura, mas alimentos muito gordurosos costumam ser mal tolerados.',
      'Oferecer bastante líquido; a urina escura melhora com a hidratação e com a recuperação do fígado.',
      'Não dar nenhum remédio, chá, garrafada ou xarope por conta própria: muitos fazem mal ao fígado.',
      'Lavar bem as mãos com água e sabão após usar o banheiro, trocar fraldas e antes de preparar alimentos; usar água tratada, fervida ou clorada para beber e preparar comida.',
      'Manter a criança fora da escola ou creche por 1 semana após o começo da icterícia.',
      'Levar todos os moradores da casa à unidade de saúde para avaliação e vacina.',
      'Retornar imediatamente se a criança ficar sonolenta, confusa, agitada, trocar o dia pela noite, sangrar pela gengiva ou pelo nariz, aparecerem manchas roxas, vomitar sem parar ou se a barriga inchar.'
    ],
    retorno: 'Reavaliação clínica e laboratorial (transaminases, bilirrubinas e RNI) em 3 a 7 dias na fase aguda, com retorno imediato diante de sinais de alarme; seguimento a cada 2 a 4 semanas até a normalização clínica e laboratorial.',
    prevencao: [
      'Vacinação: vacina hepatite A em dose única aos 15 meses no calendário do SUS (podendo ser administrada até antes dos 5 anos em quem perdeu a dose), e esquema de duas doses na rede privada e no CRIE conforme indicação.',
      'Saneamento básico, tratamento e cloração da água para consumo; ferver ou clorar a água de poços, igarapés e rios, especialmente nas cheias.',
      'Higiene das mãos com água e sabão após o uso do banheiro e a troca de fraldas e antes do preparo de alimentos.',
      'Destino adequado de dejetos e cuidado com fossas próximas a poços.',
      'Lavagem de frutas e hortaliças e cozimento adequado de frutos do mar.',
      'Vacinação de bloqueio e imunoglobulina para contatos suscetíveis conforme a vigilância; afastamento de creche por 1 semana após o início da icterícia.',
      'Notificação compulsória e investigação de surtos, com busca da fonte comum.'
    ],
    fontes: [
      { nome: 'Protocolo Clínico e Diretrizes Terapêuticas para Hepatite A – Ministério da Saúde', ano: 2023 },
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
      { nome: 'Sociedade Brasileira de Pediatria – Tratado de Pediatria', ano: 2022 }
    ],
    atualizadoEm: '2026-09'
  },

  {
    id: 'febre_tifoide',
    nome: 'Febre tifoide',
    categoria: 'infecciosa',
    amazonia: false,
    cid10: 'A01.0',
    tags: ['febre', 'cefaleia', 'dor_abdominal', 'diarreia', 'vomitos', 'esplenomegalia', 'hepatomegalia', 'exantema', 'fraqueza', 'alteracao_consciencia', 'sangramento'],
    definicao: 'Doença bacteriana sistêmica causada pela Salmonella enterica sorotipo Typhi, transmitida por água e alimentos contaminados, caracterizada por febre prolongada e progressiva, cefaleia, dor abdominal, alteração do hábito intestinal e toxemia. As complicações temidas são hemorragia e perfuração intestinal na terceira semana de doença.',
    epidemiologia: 'No Brasil, a febre tifoide concentra-se nas regiões Norte e Nordeste, onde persistem deficiências de saneamento e abastecimento de água. No Amazonas, ocorre de forma endêmica com surtos associados ao consumo de água de rios, igarapés e poços não tratados, a alimentos manipulados por portadores crônicos e às enchentes. Deve ser considerada em toda criança com febre prolongada e dor abdominal em área endêmica, sobretudo quando a pesquisa de malária é negativa. Doença de notificação compulsória.',
    agente: 'Salmonella enterica sorotipo Typhi; a Salmonella Paratyphi A, B e C causa quadro semelhante e mais brando (febre paratifoide).',
    transmissao: 'Fecal-oral, por ingestão de água e alimentos contaminados por fezes ou urina de doentes e de portadores crônicos; também por manipuladores de alimentos portadores assintomáticos e por moscas. O ser humano é o único reservatório.',
    incubacao: '1 a 3 semanas, em média 8 a 14 dias, dependendo do inóculo.',
    manifestacoes: [
      'Primeira semana: febre de início insidioso e ascendente, em escada, atingindo 39 a 40 graus, com cefaleia intensa, mal-estar, anorexia, tosse seca e dor abdominal difusa.',
      'Dissociação pulso-temperatura (bradicardia relativa em relação à febre), achado clássico, porém inconstante e pouco frequente em crianças.',
      'Segunda semana: toxemia, prostração, abdome distendido e doloroso, hepatoesplenomegalia, e possível torpor ou apatia intensa (estado tifoso).',
      'Roséolas tíficas: máculas róseas de 2 a 4 mm, esparsas, em tronco e abdome, que desaparecem à digitopressão; pouco visíveis em pele escura e pouco frequentes.',
      'Alteração do hábito intestinal: obstipação é comum em crianças maiores e adultos, enquanto diarreia predomina em lactentes; fezes com aspecto de sopa de ervilha nas formas diarreicas.',
      'Terceira semana: risco máximo de complicações, com hemorragia digestiva (melena, enterorragia) e perfuração intestinal (dor abdominal súbita e intensa, defesa, descompressão dolorosa, queda do estado geral), além de choque séptico.',
      'Outras complicações: miocardite, pneumonia, encefalopatia tífica, osteomielite (especialmente em doença falciforme), colecistite e abscessos.',
      'Laboratorialmente, leucopenia ou leucócitos normais com aneosinofilia, plaquetopenia e elevação discreta de transaminases; leucocitose sugere complicação, como perfuração.'
    ],
    sinaisAlarme: [
      'Dor abdominal súbita e intensa, abdome em tábua, defesa ou descompressão dolorosa (suspeita de perfuração intestinal, emergência cirúrgica).',
      'Melena, enterorragia, hematêmese ou palidez com taquicardia (hemorragia digestiva).',
      'Alteração do nível de consciência, delírio, torpor, convulsão ou sinais meníngeos.',
      'Hipotensão, extremidades frias, tempo de enchimento capilar prolongado ou oligúria (choque séptico).',
      'Distensão abdominal progressiva com parada de eliminação de gases e fezes.',
      'Desidratação grave e vômitos incoercíveis.',
      'Febre persistente por mais de 7 dias sem diagnóstico em área endêmica.',
      'Comorbidade: desnutrição grave, doença falciforme, imunossupressão.'
    ],
    diagnosticoDiferencial: ['malaria', 'leptospirose', 'dengue', 'tuberculose', 'leishmaniose_visceral', 'hepatite_a', 'infeccao_urinaria', 'sepse', 'apendicite aguda', 'mononucleose', 'abscesso intra-abdominal', 'endocardite'],
    exames: ['hemocultura (padrão-ouro, com maior positividade na 1ª e 2ª semanas; colher antes do antibiótico)', 'coprocultura (maior positividade a partir da 2ª a 3ª semana e no portador)', 'mielocultura (maior sensibilidade, inclusive após antibiótico)', 'hemograma', 'pcr', 'ast', 'alt', 'eletrolitos', 'ureia', 'creatinina', 'gota_espessa', 'sorologia_dengue', 'radiografia de abdome em pé e decúbito (pesquisa de pneumoperitônio)', 'urocultura'],
    criteriosDiagnosticos: [
      'Caso suspeito: febre persistente por vários dias, de início insidioso, com cefaleia, dor abdominal, alteração do hábito intestinal e toxemia, em residente ou procedente de área endêmica ou com exposição a água ou alimentos de risco.',
      'Confirmação por isolamento da Salmonella Typhi em hemocultura, coprocultura, mielocultura ou cultura de outro sítio estéril.',
      'Colher hemoculturas (preferencialmente duas a três amostras) antes de iniciar o antibiótico, sem, contudo, retardar o tratamento em paciente grave.',
      'A reação de Widal tem baixa sensibilidade e especificidade e não deve ser usada isoladamente para diagnóstico ou para decidir tratamento; interpretar com cautela e conforme protocolo.',
      'Notificação compulsória à vigilância epidemiológica, com investigação da fonte de infecção, de contatos e de portadores.',
      'Afastar malária com gota espessa ou teste rápido em toda criança febril na Amazônia antes de assumir outro diagnóstico.',
      'Radiografia de abdome em pé e hemograma seriado diante de piora abdominal, para pesquisa de perfuração.',
      'Registrar como quadro compatível com febre tifoide, com confirmação conforme protocolo.'
    ],
    classificacaoGravidade: [
      { nivel: 'Não complicada', criterios: 'Febre e sintomas sistêmicos com bom estado de hidratação, sem toxemia intensa, sem sinais abdominais de alarme e com tolerância à via oral. Pode ser tratada ambulatorialmente com antibiótico oral e reavaliação frequente, conforme protocolo e condições de retorno.' },
      { nivel: 'Complicada', criterios: 'Vômitos com intolerância oral, desidratação, toxemia importante, hepatoesplenomegalia dolorosa, plaquetopenia ou sangramento leve. Internação com antibiótico parenteral e monitorização.' },
      { nivel: 'Grave', criterios: 'Perfuração ou hemorragia intestinal, choque séptico, encefalopatia tífica com alteração de consciência ou convulsão, miocardite. Internação em UTI, antibiótico parenteral, suporte e avaliação cirúrgica imediata.' }
    ],
    tratamento: [
      'Iniciar antibiótico assim que houver suspeita clínica consistente, após a coleta de culturas quando possível; a escolha deve considerar o perfil local de resistência e as orientações do Ministério da Saúde.',
      'Ceftriaxona intravenosa é a escolha para casos graves, hospitalizados ou com intolerância oral.',
      'Azitromicina por via oral é opção para casos não complicados, com boa atividade contra cepas resistentes.',
      'Cloranfenicol e sulfametoxazol-trimetoprim foram historicamente usados pelo Ministério da Saúde e permanecem como opções onde a sensibilidade estiver documentada; a resistência crescente limita seu uso empírico. Ciprofloxacino tem uso restrito em pediatria, reservado a situações específicas conforme avaliação e protocolo.',
      'Duração habitual: 10 a 14 dias, conforme o antimicrobiano e a resposta clínica; a defervescência costuma ocorrer em 3 a 5 dias e não indica falha se ainda houver febre no início do tratamento.',
      'Hidratação e correção de distúrbios hidroeletrolíticos; manter aporte calórico com dieta leve e fracionada, sem restrição desnecessária.',
      'Antitérmico com paracetamol ou dipirona; evitar anti-inflamatórios não esteroidais pelo risco de sangramento digestivo.',
      'Evitar laxantes, enemas e antiespasmódicos, pelo risco de precipitar perfuração intestinal.',
      'Vigilância abdominal rigorosa na segunda e terceira semanas: exame seriado, hemograma e radiografia de abdome diante de piora; perfuração é emergência cirúrgica.',
      'Corticoide (dexametasona) em altas doses pode ser considerado em formas graves com choque, delírio, torpor ou coma, conforme avaliação especializada e protocolo do serviço.',
      'Investigar e tratar portadores crônicos identificados na investigação epidemiológica, conforme protocolo da vigilância; afastar manipuladores de alimentos até a negativação das culturas.',
      'Precauções entéricas durante a internação e higiene rigorosa no domicílio.'
    ],
    medicamentos: [
      { medId: 'ceftriaxona', esquema: 'Casos graves ou hospitalizados: 50 a 100 mg/kg/dia IV, 1 vez ao dia ou dividida 12/12 h (máximo 2 a 4 g/dia), por 10 a 14 dias, conforme resposta clínica e protocolo.' },
      { medId: 'azitromicina', esquema: 'Casos não complicados: 10 a 20 mg/kg/dia VO 1 vez ao dia (máximo 500 a 1.000 mg/dia) por 5 a 7 dias, conforme protocolo e perfil de sensibilidade; confirmar conforme protocolo.' },
      { medId: 'sulfametoxazol_trimetoprim', esquema: 'Opção quando houver sensibilidade documentada: 40 mg/kg/dia de sulfametoxazol e 8 mg/kg/dia de trimetoprim VO dividida 12/12 h por 14 dias; não usar empiricamente em áreas com resistência. Contraindicado em menores de 2 meses.' },
      { medId: null, nome: 'Cloranfenicol', esquema: 'Esquema historicamente recomendado pelo Ministério da Saúde (50 mg/kg/dia, dividido em 4 tomadas, por 14 a 21 dias), hoje limitado pela resistência e pela toxicidade hematológica; usar somente com sensibilidade documentada e monitorização, confirmando conforme protocolo e bula.' },
      { medId: 'dexametasona', esquema: 'Apenas em formas graves com choque, torpor, delírio ou coma, conforme avaliação especializada e protocolo do serviço; confirmar conforme protocolo.' },
      { medId: 'soro_fisiologico', esquema: 'Hidratação e expansão volêmica 10 a 20 mL/kg IV em desidratação grave ou choque, conforme protocolo.' },
      { medId: 'ringer_lactato', esquema: 'Alternativa para expansão volêmica e reposição, conforme protocolo.' },
      { medId: 'paracetamol', esquema: 'Febre e dor: 10 a 15 mg/kg/dose VO a cada 6 horas, conforme bula; evitar anti-inflamatórios não esteroidais pelo risco de sangramento.' },
      { medId: 'dipirona', esquema: 'Alternativa antitérmica: 10 a 15 mg/kg/dose VO ou IV a cada 6 horas, conforme bula.' }
    ],
    criteriosInternacao: [
      'Toxemia importante, prostração ou alteração do nível de consciência.',
      'Vômitos, intolerância à via oral ou desidratação.',
      'Dor abdominal intensa, distensão abdominal ou qualquer suspeita de complicação abdominal.',
      'Sangramento digestivo ou plaquetopenia significativa.',
      'Lactentes e crianças desnutridas.',
      'Comorbidade: doença falciforme, imunossupressão, cardiopatia.',
      'Impossibilidade de tratamento supervisionado e de retorno em tempo hábil (comunidades ribeirinhas e de difícil acesso).'
    ],
    criteriosUTI: [
      'Choque séptico ou instabilidade hemodinâmica.',
      'Perfuração intestinal com peritonite e necessidade de cirurgia.',
      'Hemorragia digestiva volumosa com repercussão hemodinâmica.',
      'Encefalopatia tífica com rebaixamento do nível de consciência ou convulsões.',
      'Miocardite com insuficiência cardíaca ou arritmia.',
      'Insuficiência respiratória.'
    ],
    criteriosAlta: [
      'Afebril por 48 horas ou mais, com melhora clara do estado geral.',
      'Abdome indolor, sem distensão e sem sinais de complicação.',
      'Aceitação oral adequada e tolerância ao antibiótico oral para completar o esquema.',
      'Ausência de sangramento e exames laboratoriais em recuperação.',
      'Família orientada sobre a necessidade de completar o antibiótico, higiene e sinais de alarme.',
      'Investigação epidemiológica em andamento, com orientação sobre coproculturas de controle conforme protocolo.'
    ],
    orientacoes: [
      'Dar o antibiótico todos os dias, no horário certo, até o fim do tratamento, mesmo que a febre passe antes; a febre pode demorar de 3 a 5 dias para ceder.',
      'Não dar laxante, remédio para prender ou soltar o intestino, chá purgante nem fazer lavagem intestinal: isso pode furar o intestino.',
      'Oferecer água tratada, fervida ou clorada e alimentos bem cozidos, em pequenas porções.',
      'Lavar as mãos com água e sabão após usar o banheiro e antes de preparar comida; separar e lavar bem os utensílios do doente.',
      'Pessoas da casa que trabalham manipulando alimentos devem procurar a unidade de saúde para avaliação.',
      'Retornar imediatamente se houver dor forte e repentina na barriga, barriga inchada e dura, fezes pretas ou com sangue, vômito com sangue, palidez, desmaio, confusão, sonolência ou convulsão.'
    ],
    retorno: 'Reavaliação em 48 a 72 horas nos casos ambulatoriais, com atenção especial ao exame do abdome entre a segunda e a terceira semanas de doença; retorno imediato diante de sinais de alarme; consulta ao término do antibiótico e coproculturas de controle conforme orientação da vigilância para identificar portador crônico.',
    prevencao: [
      'Água tratada, fervida ou clorada para beber, preparar alimentos, escovar os dentes e fazer gelo, especialmente em comunidades abastecidas por rios, igarapés e poços.',
      'Saneamento básico, destino adequado de dejetos e proteção de poços contra contaminação, sobretudo em períodos de cheia.',
      'Higiene das mãos e higiene no preparo de alimentos; cozimento adequado e lavagem de frutas e hortaliças.',
      'Identificação, tratamento e acompanhamento de portadores crônicos, com afastamento de manipuladores de alimentos até negativação das culturas.',
      'Investigação de surtos e busca de fonte comum pela vigilância epidemiológica.',
      'Vacina contra febre tifoide disponível para situações específicas (viajantes e controle de surtos), não integrando o calendário básico de rotina; indicação conforme o Ministério da Saúde e o CRIE.',
      'Notificação compulsória de todos os casos suspeitos e confirmados.'
    ],
    fontes: [
      { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
      { nome: 'Manual Integrado de Vigilância e Controle da Febre Tifoide – Ministério da Saúde', ano: 2010 },
      { nome: 'OMS – Typhoid vaccines: WHO position paper', ano: 2018 },
      { nome: 'Nelson Textbook of Pediatrics, 21ª edição', ano: 2020 }
    ],
    atualizadoEm: '2026-09'
  },
