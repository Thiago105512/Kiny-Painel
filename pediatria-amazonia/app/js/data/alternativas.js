window.PED = window.PED || {}; var PED = window.PED; PED.data = PED.data || {};

PED.data.alternativas = {
  porDoenca: {
    malaria: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - malária por P. vivax não complicada', tipo: 'primeira',
          opcoes: [
            { medId: 'cloroquina', nome: 'Cloroquina', esquema: '25 mg/kg de dose total VO em 3 dias (10 mg/kg no 1o dia e 7,5 mg/kg no 2o e no 3o dia), conforme tabela por faixa de peso do Guia de Tratamento da Malária', quando: 'P. vivax ou P. ovale confirmados em gota espessa ou teste rápido, sem sinais de gravidade', obs: 'Administrar após alimentação para reduzir intolerância gástrica. Repetir a dose se houver vômito em até 30 minutos.' },
            { medId: 'primaquina', nome: 'Primaquina', esquema: '0,5 mg/kg/dia VO por 7 dias, associada à cloroquina, conforme faixa de peso', quando: 'Cura radical das formas hepáticas de P. vivax, em criança acima de 6 meses sem deficiência de G6PD conhecida', obs: 'Avaliar risco de hemólise. Orientar o responsável a suspender e procurar serviço se houver urina escura ou palidez súbita.' }
          ] },
        { ordem: 2, rotulo: 'Primeira escolha - malária por P. falciparum não complicada', tipo: 'primeira',
          opcoes: [
            { medId: 'artemeter_lumefantrina', nome: 'Artemeter + lumefantrina', esquema: 'VO 12/12 h por 3 dias, número de comprimidos por faixa de peso conforme o Guia de Tratamento da Malária', quando: 'P. falciparum ou infecção mista, criança com peso igual ou acima de 5 kg, sem critérios de gravidade', obs: 'Administrar junto com alimento gorduroso ou leite materno para melhorar a absorção.' },
            { medId: 'primaquina', nome: 'Primaquina', esquema: '0,75 mg/kg VO em dose única no 1o dia (ação gametocitocida), conforme faixa de peso', quando: 'Complemento do esquema para P. falciparum, acima de 6 meses', obs: 'Dose única, não confundir com o esquema de 7 dias do P. vivax.' }
          ] },
        { ordem: 3, rotulo: 'Malária grave - conduta de primeira escolha', tipo: 'primeira',
          opcoes: [
            { medId: 'artesunato', nome: 'Artesunato endovenoso', esquema: '3 mg/kg/dose IV se peso abaixo de 20 kg e 2,4 mg/kg/dose IV se peso igual ou acima de 20 kg, nos tempos 0, 12 e 24 h e depois a cada 24 h, até tolerar via oral', quando: 'Qualquer sinal de gravidade: alteração de consciência, convulsão, icterícia, hipoglicemia, anemia grave, desconforto respiratório, choque, oligúria, parasitemia alta', obs: 'Após melhora, completar com curso oral de artemeter + lumefantrina. Iniciar sem aguardar transferência.' },
            { medId: 'glicose', nome: 'Glicose', esquema: 'Glicose a 10% 2 a 5 mL/kg IV em bolus na hipoglicemia documentada ou suspeita', quando: 'Hipoglicemia é frequente na malária grave e no uso de quinina', obs: 'Monitorar glicemia capilar seriada.' }
          ] },
        { ordem: 4, rotulo: 'Alternativa quando o esquema de escolha não está disponível na comunidade', tipo: 'alternativa',
          opcoes: [
            { medId: 'artesunato', nome: 'Artesunato retal (pré-referência)', esquema: '10 mg/kg por via retal em dose única antes do transporte', quando: 'Criança com malária grave em comunidade ribeirinha ou indígena sem acesso venoso e com transporte prolongado até a referência', obs: 'Medida de pré-referência recomendada pela OMS. Não substitui o tratamento completo, transferir sempre. Confirmar disponibilidade e apresentação conforme protocolo/bula.', verificar: true },
            { medId: 'artemeter_lumefantrina', nome: 'Artemeter + lumefantrina', esquema: 'VO 12/12 h por 3 dias conforme faixa de peso', quando: 'Alternativa quando há falha ou indisponibilidade de cloroquina para P. vivax, situação prevista no Guia de Tratamento da Malária', obs: 'Discutir com a referência regional ou com o polo de malária antes de trocar o esquema do P. vivax. Confirmar conforme protocolo/bula.', verificar: true }
          ] },
        { ordem: 5, rotulo: 'Segunda linha / suspeita de falha terapêutica', tipo: 'segunda',
          opcoes: [
            { medId: null, nome: 'Reavaliação parasitológica e notificação de suspeita de falha', esquema: '', quando: 'Persistência ou recorrência da parasitemia após esquema completo e supervisionado', obs: 'Considerar má adesão, vômitos, dose inadequada por peso e reinfecção antes de assumir resistência. Encaminhar ao serviço de referência em malária para definição do esquema de resgate.' },
            { medId: 'ceftriaxona', nome: 'Ceftriaxona', esquema: '50 a 100 mg/kg/dia IV, conforme protocolo do serviço', quando: 'Avaliar quando há suspeita de coinfecção bacteriana ou sepse concomitante na criança gravemente enferma', obs: 'Não usar de rotina apenas pela febre da malária.' }
          ] },
        { ordem: 6, rotulo: 'Adjuvante / sintomático', tipo: 'adjuvante',
          opcoes: [
            { medId: 'paracetamol', nome: 'Paracetamol', esquema: '10 a 15 mg/kg/dose VO a cada 6 h, máximo 5 doses ao dia', quando: 'Febre ou dor', obs: 'Preferir ao anti-inflamatório enquanto não afastada dengue concomitante, coinfecção frequente no Amazonas.' },
            { medId: 'sais_reidratacao_oral', nome: 'Sais de reidratação oral', esquema: 'Conforme plano de hidratação e perdas', quando: 'Vômitos, febre alta e ingesta reduzida', obs: '' }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: 'primaquina', nome: 'Primaquina em menores de 6 meses e em gestantes', esquema: '', quando: '', obs: 'Contraindicada nessas situações pelo risco de hemólise. Considerar cloroquina profilática semanal conforme orientação do Guia de Tratamento da Malária e discussão com a referência.' },
            { medId: null, nome: 'Tratamento presuntivo sem confirmação laboratorial', esquema: '', quando: '', obs: 'Evitar quando há acesso a gota espessa ou teste rápido, pelo risco de mascarar outras causas de febre. Em área remota sem diagnóstico disponível e criança grave, o tratamento presuntivo pode ser considerado com notificação e transferência.' }
          ] }
      ],
      naoFarmacologico: [
        'Tratamento supervisionado e notificação compulsória imediata no SIVEP-Malária.',
        'Busca ativa de casos no domicílio e na comunidade, especialmente em área ribeirinha, garimpo e terra indígena.',
        'Orientar uso de mosquiteiro impregnado com inseticida de longa duração e telagem, quando disponível.',
        'Retorno programado com nova lâmina de controle conforme o esquema utilizado.',
        'Orientar sinais de alarme ao responsável, com plano de transporte fluvial combinado antecipadamente.'
      ],
      fontes: [ { nome: 'Ministério da Saúde - Guia de Tratamento da Malária no Brasil', ano: 2024 }, { nome: 'OMS - Guidelines for malaria', ano: 2023 } ],
      atualizadoEm: '2026-09'
    },

    dengue: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha', tipo: 'primeira',
          opcoes: [
            { medId: 'sais_reidratacao_oral', nome: 'Sais de reidratação oral', esquema: 'Grupos A e B: 60 a 80 mL/kg/dia VO, sendo um terço com sais de reidratação oral e o restante com líquidos caseiros, ofertados de forma fracionada', quando: 'Dengue sem sinais de alarme, criança que aceita via oral', obs: 'A hidratação é a intervenção central. Reavaliar aceitação e diurese.' },
            { medId: 'paracetamol', nome: 'Paracetamol', esquema: '10 a 15 mg/kg/dose VO a cada 6 h, máximo 5 doses ao dia', quando: 'Febre e dor', obs: 'Analgésico e antitérmico de escolha na dengue.' }
          ] },
        { ordem: 2, rotulo: 'Dengue com sinais de alarme ou grave - expansão volêmica', tipo: 'primeira',
          opcoes: [
            { medId: 'soro_fisiologico', nome: 'Soro fisiológico 0,9%', esquema: '10 mL/kg IV em até 1 h (grupo C) ou 20 mL/kg em até 20 min (grupo D), repetindo conforme reavaliação e protocolo vigente', quando: 'Sinais de alarme, choque ou extravasamento plasmático', obs: 'Reavaliar a cada etapa com hematócrito, diurese, perfusão e sinais vitais.' },
            { medId: 'ringer_lactato', nome: 'Ringer lactato', esquema: 'Mesmos volumes do soro fisiológico, conforme grupo de classificação de risco', quando: 'Alternativa ao soro fisiológico, considerar quando há necessidade de grandes volumes pelo menor risco de acidose hiperclorêmica', obs: 'Evitar em hepatopatia grave descompensada.' }
          ] },
        { ordem: 3, rotulo: 'Alternativa para febre e dor quando o paracetamol não é suficiente ou não está disponível', tipo: 'alternativa',
          opcoes: [
            { medId: 'dipirona', nome: 'Dipirona', esquema: '10 a 15 mg/kg/dose VO ou IV a cada 6 h, conforme apresentação e idade mínima da bula', quando: 'Febre alta ou dor com resposta insuficiente ao paracetamol', obs: 'Não usar em menores de 3 meses ou abaixo de 5 kg. Raro risco de agranulocitose e de hipotensão quando administrada rapidamente por via IV. Confirmar conforme protocolo/bula.', verificar: true }
          ] },
        { ordem: 4, rotulo: 'Adjuvante / sintomático', tipo: 'adjuvante',
          opcoes: [
            { medId: 'ondansetrona', nome: 'Ondansetrona', esquema: '0,15 mg/kg/dose VO ou IV, máximo 4 a 8 mg por dose, conforme protocolo do serviço', quando: 'Avaliar quando o vômito impede a reidratação oral e ameaça a via oral', obs: 'Uso em gastroenterite e em quadros febris agudos da criança é off-label no Brasil, ver linha específica. Atenção ao prolongamento do intervalo QT.' }
          ] },
        { ordem: 5, rotulo: 'Uso off-label', tipo: 'offlabel',
          opcoes: [
            { medId: 'ondansetrona', nome: 'Ondansetrona para vômitos da dengue e de gastroenterite', esquema: '0,15 mg/kg/dose ou 2 mg de 8 a 15 kg e 4 mg acima de 15 kg, dose única, podendo repetir conforme protocolo do serviço', quando: 'Vômitos persistentes que impedem a hidratação oral e levariam à hidratação venosa', obs: 'Off-label: a bula brasileira registra náusea e vômito por quimioterapia, radioterapia e pós-operatório. O uso em vômito agudo da criança tem apoio de ensaios clínicos e de revisões sistemáticas que mostram redução da necessidade de hidratação venosa, mas não consta em bula. Avaliar QT e evitar associação com outras drogas que prolongam QT.' }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: null, nome: 'Ácido acetilsalicílico (AAS) e outros salicilatos', esquema: '', quando: '', obs: 'Contraindicados na dengue pelo risco de sangramento e de acidose, e associados à síndrome de Reye na criança. Substituir por paracetamol.' },
            { medId: 'ibuprofeno', nome: 'Anti-inflamatórios não esteroidais (ibuprofeno, diclofenaco, nimesulida)', esquema: '', quando: '', obs: 'Evitar durante a fase aguda pelo risco de sangramento digestivo e de lesão renal, conforme o manual de manejo clínico da dengue.' },
            { medId: 'prednisolona', nome: 'Corticoide sistêmico na dengue', esquema: '', quando: '', obs: 'Sem benefício demonstrado em ensaios clínicos para prevenir choque ou sangramento. Reservar apenas para indicações independentes, como asma concomitante.' },
            { medId: null, nome: 'Antibiótico de rotina na síndrome febril indiferenciada', esquema: '', quando: '', obs: 'Não indicado apenas pela febre. Avaliar foco bacteriano, e em área endêmica sempre afastar malária e leptospirose antes de assumir infecção bacteriana.' }
          ] }
      ],
      naoFarmacologico: [
        'Classificação de risco por grupos A, B, C e D a cada reavaliação, com prova do laço quando indicada.',
        'Cartão de acompanhamento e retorno diário até 48 h após a queda da febre, período de maior risco de agravamento.',
        'Orientar sinais de alarme: dor abdominal intensa, vômitos persistentes, sangramento, letargia, tontura ao levantar, queda da diurese.',
        'Em comunidade distante, combinar antecipadamente o meio de transporte e o contato com a referência antes do período crítico.',
        'Notificação compulsória e eliminação de criadouros no domicílio.'
      ],
      fontes: [ { nome: 'Ministério da Saúde - Dengue: diagnóstico e manejo clínico, criança e adulto', ano: 2024 }, { nome: 'OPAS - Diretrizes para o diagnóstico e tratamento da dengue', ano: 2022 } ],
      atualizadoEm: '2026-09'
    },

    chikungunya: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - fase aguda', tipo: 'primeira',
          opcoes: [
            { medId: 'paracetamol', nome: 'Paracetamol', esquema: '10 a 15 mg/kg/dose VO a cada 6 h, máximo 5 doses ao dia', quando: 'Febre e dor articular na fase aguda, enquanto não afastada dengue concomitante', obs: 'Analgésico de escolha na fase aguda por causa da circulação simultânea de dengue no Amazonas.' },
            { medId: 'sais_reidratacao_oral', nome: 'Sais de reidratação oral', esquema: 'Conforme plano de hidratação e aceitação', quando: 'Febre alta, recusa alimentar e risco de desidratação', obs: '' }
          ] },
        { ordem: 2, rotulo: 'Alternativa para dor não controlada na fase aguda', tipo: 'alternativa',
          opcoes: [
            { medId: 'dipirona', nome: 'Dipirona', esquema: '10 a 15 mg/kg/dose VO ou IV a cada 6 h, respeitando idade mínima da bula', quando: 'Dor ou febre com resposta insuficiente ao paracetamol', obs: 'Não usar em menores de 3 meses ou abaixo de 5 kg.' },
            { medId: 'ibuprofeno', nome: 'Ibuprofeno', esquema: '5 a 10 mg/kg/dose VO a cada 6 a 8 h', quando: 'Alternativa para dor articular somente após a fase febril e apenas quando dengue estiver afastada', obs: 'Não utilizar enquanto houver possibilidade de dengue. Confirmar conforme protocolo/bula e avaliar hidratação e função renal.', verificar: true }
          ] },
        { ordem: 3, rotulo: 'Segunda linha - fase subaguda com artrite persistente', tipo: 'segunda',
          opcoes: [
            { medId: 'prednisolona', nome: 'Prednisolona', esquema: '0,5 a 1 mg/kg/dia VO por período curto, com redução gradual, conforme resposta', quando: 'Avaliar na fase subaguda ou crônica com artrite incapacitante, após afastada infecção ativa e dengue', obs: 'Não indicada na fase aguda febril. Uso orientado preferencialmente com apoio de reumatologia pediátrica.' }
          ] },
        { ordem: 4, rotulo: 'Uso off-label - artropatia crônica refratária', tipo: 'offlabel',
          opcoes: [
            { medId: null, nome: 'Metotrexato em baixa dose', esquema: 'Dose semanal definida por reumatologia pediátrica', quando: 'Artropatia crônica pós-chikungunya que não responde a analgesia e a corticoide, apenas em serviço especializado', obs: 'Off-label para chikungunya: o metotrexato tem registro para artrite idiopática juvenil, e o uso na artropatia pós-chikungunya deriva de séries de casos e da experiência descrita em protocolos assistenciais, sobretudo em adultos. Exige acompanhamento com hemograma e transaminases, e suplementação de ácido fólico. Confirmar conforme protocolo/bula e indicação especializada.', verificar: true },
            { medId: null, nome: 'Hidroxicloroquina', esquema: 'Dose definida por reumatologia pediátrica', quando: 'Alternativa considerada em artropatia crônica pós-chikungunya em serviço especializado', obs: 'Off-label para essa indicação. Evidência limitada e inconsistente em crianças, exige avaliação oftalmológica e acompanhamento especializado. Confirmar conforme protocolo/bula.', verificar: true }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: null, nome: 'Ácido acetilsalicílico (AAS)', esquema: '', quando: '', obs: 'Evitar pelo risco de sangramento caso o quadro seja dengue, e pela associação com síndrome de Reye em crianças.' },
            { medId: null, nome: 'Codeína e outros opioides em menores de 12 anos', esquema: '', quando: '', obs: 'Codeína é contraindicada abaixo de 12 anos pela variabilidade de metabolização e risco de depressão respiratória. Priorizar analgesia não opioide e medidas físicas.' },
            { medId: 'prednisolona', nome: 'Corticoide na fase aguda febril', esquema: '', quando: '', obs: 'Não recomendado enquanto houver febre e possibilidade de dengue, pelo risco de agravamento e de mascarar complicações.' }
          ] }
      ],
      naoFarmacologico: [
        'Repouso relativo com mobilização precoce e suave das articulações acometidas.',
        'Crioterapia local nas articulações doloridas por 10 a 15 min, várias vezes ao dia.',
        'Fisioterapia e reabilitação precoces nas formas subaguda e crônica.',
        'Hidratação abundante e observação de sinais de alarme de dengue enquanto o diagnóstico não estiver definido.',
        'Atenção especial ao recém-nascido de mãe com chikungunya no periparto, pelo risco de forma neonatal grave.'
      ],
      fontes: [ { nome: 'Ministério da Saúde - Chikungunya: manejo clínico', ano: 2022 }, { nome: 'Sociedade Brasileira de Pediatria - Documento científico sobre arboviroses na infância', ano: 2023 } ],
      atualizadoEm: '2026-09'
    },

    zika: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha', tipo: 'primeira',
          opcoes: [
            { medId: 'paracetamol', nome: 'Paracetamol', esquema: '10 a 15 mg/kg/dose VO a cada 6 h, máximo 5 doses ao dia', quando: 'Febre baixa, cefaleia e mialgia', obs: 'Não existe antiviral específico, o manejo é sintomático e de suporte.' },
            { medId: 'sais_reidratacao_oral', nome: 'Sais de reidratação oral e líquidos', esquema: 'Oferta fracionada conforme aceitação', quando: 'Manutenção da hidratação na fase aguda', obs: '' }
          ] },
        { ordem: 2, rotulo: 'Alternativa para febre e dor', tipo: 'alternativa',
          opcoes: [
            { medId: 'dipirona', nome: 'Dipirona', esquema: '10 a 15 mg/kg/dose VO a cada 6 h, respeitando idade mínima da bula', quando: 'Alternativa quando o paracetamol não controla a febre ou não está disponível na unidade', obs: 'Não usar em menores de 3 meses ou abaixo de 5 kg.' }
          ] },
        { ordem: 3, rotulo: 'Adjuvante / sintomático para o exantema pruriginoso', tipo: 'adjuvante',
          opcoes: [
            { medId: null, nome: 'Anti-histamínico oral (dexclorfeniramina ou loratadina)', esquema: 'Dose conforme idade e peso na bula do produto disponível', quando: 'Prurido importante associado ao exantema', obs: 'Preferir anti-histamínico de segunda geração pela menor sedação. Confirmar conforme protocolo/bula.', verificar: true },
            { medId: null, nome: 'Medidas tópicas de conforto', esquema: '', quando: 'Prurido leve', obs: 'Banho morno, compressas frias e hidratante sem perfume costumam ser suficientes.' }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: null, nome: 'Ácido acetilsalicílico (AAS) e anti-inflamatórios não esteroidais', esquema: '', quando: '', obs: 'Evitar até afastar dengue, pelo risco hemorrágico, e pela associação do AAS com síndrome de Reye na criança.' },
            { medId: null, nome: 'Antiviral ou imunoglobulina para zika', esquema: '', quando: '', obs: 'Não há tratamento antiviral específico com eficácia demonstrada. O cuidado é sintomático e de vigilância neurológica.' },
            { medId: null, nome: 'Antibiótico para o exantema febril', esquema: '', quando: '', obs: 'Não indicado na ausência de foco bacteriano identificado.' }
          ] }
      ],
      naoFarmacologico: [
        'Notificação compulsória e investigação de gestante exposta na família e na comunidade.',
        'Em recém-nascido exposto, avaliar perímetro cefálico, exame neurológico, triagem auditiva e avaliação oftalmológica, com seguimento em estimulação precoce.',
        'Orientar sinais de alerta neurológico: fraqueza progressiva, alteração da marcha, parestesias, que sugerem síndrome de Guillain-Barré.',
        'Controle vetorial no domicílio e uso de repelente adequado à idade.',
        'Reavaliar em 48 a 72 h, pois dengue pode ter apresentação inicial semelhante.'
      ],
      fontes: [ { nome: 'Ministério da Saúde - Vírus Zika no Brasil, resposta do SUS e manejo clínico', ano: 2023 }, { nome: 'OPAS - Orientações para vigilância e manejo de infecção por zika', ano: 2022 } ],
      atualizadoEm: '2026-09'
    },

    febre_amarela: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - suporte, não há antiviral específico', tipo: 'primeira',
          opcoes: [
            { medId: 'soro_fisiologico', nome: 'Soro fisiológico 0,9%', esquema: 'Expansão de 10 a 20 mL/kg IV conforme perfusão, repetindo com reavaliação, e manutenção conforme necessidade hídrica', quando: 'Desidratação, hipotensão ou sinais de má perfusão na forma grave', obs: 'Cuidado com sobrecarga em criança com disfunção hepática e renal.' },
            { medId: 'paracetamol', nome: 'Paracetamol', esquema: '10 a 15 mg/kg/dose VO a cada 6 h, com dose diária reduzida se houver hepatite aguda', quando: 'Febre e dor', obs: 'Avaliar redução da dose máxima diária diante de elevação importante de transaminases. Confirmar conforme protocolo/bula.', verificar: true }
          ] },
        { ordem: 2, rotulo: 'Alternativa para febre e dor', tipo: 'alternativa',
          opcoes: [
            { medId: 'dipirona', nome: 'Dipirona', esquema: '10 a 15 mg/kg/dose VO ou IV a cada 6 h', quando: 'Alternativa quando o paracetamol está limitado pela hepatotoxicidade ou indisponível', obs: 'Monitorar pressão arterial na administração venosa.' }
          ] },
        { ordem: 3, rotulo: 'Adjuvante na forma grave', tipo: 'adjuvante',
          opcoes: [
            { medId: 'glicose', nome: 'Glicose', esquema: 'Glicose a 10% 2 a 5 mL/kg IV na hipoglicemia, seguida de infusão contínua com taxa de infusão ajustada', quando: 'Hipoglicemia, comum na insuficiência hepática aguda', obs: 'Monitorar glicemia capilar com frequência.' },
            { medId: null, nome: 'Vitamina K (fitomenadiona)', esquema: 'Dose conforme idade e protocolo do serviço, por via IV lenta', quando: 'Coagulopatia com alargamento do tempo de protrombina na forma hepatorrenal', obs: 'Confirmar conforme protocolo/bula. Considerar hemocomponentes conforme sangramento e discussão com a referência.', verificar: true },
            { medId: 'ondansetrona', nome: 'Ondansetrona', esquema: '0,15 mg/kg/dose conforme protocolo do serviço', quando: 'Vômitos que impedem hidratação ou agravam desconforto', obs: 'Uso em vômito agudo da criança é off-label no Brasil.' }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: null, nome: 'Ácido acetilsalicílico e anti-inflamatórios não esteroidais', esquema: '', quando: '', obs: 'Contraindicados pelo risco de sangramento na coagulopatia e de lesão renal aguda.' },
            { medId: null, nome: 'Antiviral específico para febre amarela', esquema: '', quando: '', obs: 'Não existe antiviral com eficácia comprovada. O cuidado é de suporte intensivo e transferência precoce.' },
            { medId: 'prednisolona', nome: 'Corticoide sistêmico de rotina', esquema: '', quando: '', obs: 'Sem benefício demonstrado na febre amarela. Reservar apenas para indicações independentes.' }
          ] }
      ],
      naoFarmacologico: [
        'Notificação imediata e isolamento vetorial do paciente nos primeiros dias de viremia.',
        'Transferência precoce para unidade com terapia intensiva e possibilidade de terapia renal substitutiva, especialmente em comunidade distante.',
        'Verificar e atualizar a situação vacinal da criança e dos contatos, a vacina é a principal medida de prevenção.',
        'Monitorar diurese, nível de consciência, sangramentos e função hepática e renal.',
        'Evitar procedimentos invasivos desnecessários na vigência de coagulopatia.'
      ],
      fontes: [ { nome: 'Ministério da Saúde - Guia de vigilância em saúde, febre amarela', ano: 2023 }, { nome: 'OPAS - Manejo clínico da febre amarela', ano: 2022 } ],
      atualizadoEm: '2026-09'
    },

    oropouche: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - suporte sintomático', tipo: 'primeira',
          opcoes: [
            { medId: 'paracetamol', nome: 'Paracetamol', esquema: '10 a 15 mg/kg/dose VO a cada 6 h, máximo 5 doses ao dia', quando: 'Febre, cefaleia intensa e mialgia, apresentação típica da febre do Oropouche', obs: 'Não há antiviral específico. Manter vigilância porque a recorrência dos sintomas em 1 a 2 semanas é frequente.' },
            { medId: 'sais_reidratacao_oral', nome: 'Sais de reidratação oral', esquema: 'Oferta fracionada conforme aceitação e perdas', quando: 'Prevenção e correção de desidratação leve a moderada', obs: '' }
          ] },
        { ordem: 2, rotulo: 'Alternativa para febre e dor', tipo: 'alternativa',
          opcoes: [
            { medId: 'dipirona', nome: 'Dipirona', esquema: '10 a 15 mg/kg/dose VO ou IV a cada 6 h, respeitando idade mínima da bula', quando: 'Alternativa quando o paracetamol não controla a febre ou está indisponível na comunidade', obs: 'Não usar em menores de 3 meses ou abaixo de 5 kg.' }
          ] },
        { ordem: 3, rotulo: 'Segunda linha - suspeita de complicação ou de diagnóstico alternativo', tipo: 'segunda',
          opcoes: [
            { medId: 'ceftriaxona', nome: 'Ceftriaxona', esquema: '100 mg/kg/dia IV, dose máxima conforme protocolo, quando há suspeita de meningite bacteriana', quando: 'Avaliar diante de sinais meníngeos, alteração de consciência ou toxemia, situação em que a meningoencefalite bacteriana deve ser tratada empiricamente até esclarecimento', obs: 'A febre do Oropouche pode cursar com meningismo, mas a conduta segura é cobrir bactéria até afastar.' },
            { medId: null, nome: 'Reavaliação diagnóstica para dengue, malária e leptospirose', esquema: '', quando: 'Febre persistente ou piora clínica em área endêmica', obs: 'No Amazonas a sobreposição de arboviroses e malária é regra, repetir gota espessa ou teste rápido e sorologias conforme disponibilidade.' }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: null, nome: 'Ácido acetilsalicílico e anti-inflamatórios não esteroidais', esquema: '', quando: '', obs: 'Evitar enquanto dengue não estiver afastada, pelo risco de sangramento.' },
            { medId: 'prednisolona', nome: 'Corticoide na síndrome febril indiferenciada', esquema: '', quando: '', obs: 'Não indicado. Pode mascarar infecção bacteriana e piorar desfechos em arboviroses e em malária.' },
            { medId: null, nome: 'Antibiótico de rotina na febre sem foco', esquema: '', quando: '', obs: 'Reservar para suspeita fundamentada de infecção bacteriana, não prescrever apenas pela duração da febre.' }
          ] }
      ],
      naoFarmacologico: [
        'Notificação e coleta de amostra para diagnóstico laboratorial conforme fluxo da vigilância estadual.',
        'Orientar o responsável sobre a recorrência dos sintomas em até 2 semanas, que não significa falha do tratamento.',
        'Proteção contra o vetor Culicoides paraensis, que é de pequeno porte e atravessa telas comuns, orientar mosquiteiro de malha fina.',
        'Retorno imediato diante de rigidez de nuca, sonolência, convulsão ou sangramento.',
        'Atenção a gestantes na família, pela investigação em curso de transmissão vertical.'
      ],
      fontes: [ { nome: 'Ministério da Saúde - Nota técnica e orientações sobre febre do Oropouche', ano: 2024 }, { nome: 'OPAS - Alerta epidemiológico Oropouche', ano: 2024 } ],
      atualizadoEm: '2026-09'
    },

    mayaro: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - suporte sintomático', tipo: 'primeira',
          opcoes: [
            { medId: 'paracetamol', nome: 'Paracetamol', esquema: '10 a 15 mg/kg/dose VO a cada 6 h, máximo 5 doses ao dia', quando: 'Febre e artralgia da fase aguda', obs: 'Não há antiviral específico. Quadro semelhante ao da chikungunya, com artralgia que pode persistir.' },
            { medId: 'sais_reidratacao_oral', nome: 'Sais de reidratação oral', esquema: 'Oferta fracionada conforme aceitação', quando: 'Manutenção da hidratação', obs: '' }
          ] },
        { ordem: 2, rotulo: 'Alternativa para dor e febre', tipo: 'alternativa',
          opcoes: [
            { medId: 'dipirona', nome: 'Dipirona', esquema: '10 a 15 mg/kg/dose VO ou IV a cada 6 h, respeitando idade mínima da bula', quando: 'Alternativa quando o paracetamol não controla a dor ou não está disponível', obs: 'Não usar em menores de 3 meses ou abaixo de 5 kg.' },
            { medId: 'ibuprofeno', nome: 'Ibuprofeno', esquema: '5 a 10 mg/kg/dose VO a cada 6 a 8 h', quando: 'Artralgia persistente após a fase febril, somente com dengue afastada', obs: 'Não utilizar enquanto houver possibilidade de dengue. Avaliar hidratação e função renal. Confirmar conforme protocolo/bula.', verificar: true }
          ] },
        { ordem: 3, rotulo: 'Segunda linha - artralgia persistente', tipo: 'segunda',
          opcoes: [
            { medId: 'prednisolona', nome: 'Prednisolona', esquema: '0,5 a 1 mg/kg/dia VO por curto período com redução gradual', quando: 'Avaliar na artrite persistente e incapacitante após a fase aguda, com infecção ativa e dengue afastadas', obs: 'Evidência extrapolada do manejo da chikungunya, uso preferencialmente com apoio especializado. Confirmar conforme protocolo/bula.', verificar: true }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: null, nome: 'Ácido acetilsalicílico (AAS)', esquema: '', quando: '', obs: 'Evitar pelo risco hemorrágico caso o quadro seja dengue e pela associação com síndrome de Reye.' },
            { medId: 'prednisolona', nome: 'Corticoide na fase febril aguda', esquema: '', quando: '', obs: 'Não recomendado na síndrome febril indiferenciada, pode mascarar infecção bacteriana e agravar arbovirose.' },
            { medId: null, nome: 'Antibiótico empírico sem foco definido', esquema: '', quando: '', obs: 'Não indicado. Em área endêmica, afastar malária antes de considerar antibiótico pela febre.' }
          ] }
      ],
      naoFarmacologico: [
        'Notificação e coleta de amostra, o diagnóstico diferencial com dengue e chikungunya depende de laboratório de referência.',
        'Repouso relativo com mobilização articular suave e crioterapia local.',
        'Proteção contra o vetor, o Mayaro circula em ciclo silvestre e a exposição é maior em áreas de mata e de garimpo.',
        'Reavaliação em 48 a 72 h ou antes, diante de sinais de alarme de dengue.',
        'Fisioterapia se a artralgia persistir por mais de 3 semanas.'
      ],
      fontes: [ { nome: 'Ministério da Saúde - Guia de vigilância em saúde, arboviroses emergentes', ano: 2023 }, { nome: 'Sociedade Brasileira de Pediatria - Documento científico sobre arboviroses na infância', ano: 2023 } ],
      atualizadoEm: '2026-09'
    },

    leptospirose: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - forma leve, ambulatorial', tipo: 'primeira',
          opcoes: [
            { medId: 'amoxicilina', nome: 'Amoxicilina', esquema: '50 mg/kg/dia VO divididos a cada 8 h por 5 a 7 dias, máximo 500 mg por dose', quando: 'Forma anictérica leve em criança menor de 8 anos, iniciada o mais precocemente possível', obs: 'O benefício é maior quando iniciada nos primeiros dias de sintomas.' }
          ] },
        { ordem: 2, rotulo: 'Primeira escolha - forma grave (síndrome de Weil, hemorragia pulmonar)', tipo: 'primeira',
          opcoes: [
            { medId: 'penicilina_cristalina', nome: 'Penicilina G cristalina', esquema: '50.000 a 100.000 UI/kg/dia IV divididas a cada 6 h por 7 dias', quando: 'Forma ictérica, insuficiência renal, hemorragia ou instabilidade', obs: 'Atentar para reação de Jarisch-Herxheimer nas primeiras horas.' },
            { medId: 'ceftriaxona', nome: 'Ceftriaxona', esquema: '50 a 100 mg/kg/dia IV a cada 12 a 24 h por 7 dias', quando: 'Alternativa de igual eficácia à penicilina na forma grave, útil quando a via de acesso é limitada ou há dúvida diagnóstica com outras causas de sepse', obs: 'Posologia mais cômoda em unidade com poucos recursos de enfermagem.' },
            { medId: 'soro_fisiologico', nome: 'Soro fisiológico 0,9%', esquema: 'Expansão de 10 a 20 mL/kg IV conforme perfusão e reavaliação', quando: 'Hipovolemia e lesão renal aguda, que costuma ser não oligúrica e perdedora de potássio', obs: 'Monitorar potássio e diurese.' }
          ] },
        { ordem: 3, rotulo: 'Alternativa em alergia a penicilina', tipo: 'alternativa',
          opcoes: [
            { medId: 'azitromicina', nome: 'Azitromicina', esquema: '10 mg/kg/dia VO no 1o dia e 5 mg/kg/dia do 2o ao 5o dia, ou conforme protocolo do serviço', quando: 'Alergia a betalactâmicos na forma leve', obs: 'Confirmar conforme protocolo/bula, a evidência em leptospirose vem de ensaios com macrolídeos em adultos.', verificar: true },
            { medId: 'ceftriaxona', nome: 'Ceftriaxona', esquema: '50 a 100 mg/kg/dia IV', quando: 'Alergia não grave a penicilina, sem anafilaxia, na forma grave', obs: 'Reatividade cruzada com cefalosporinas de terceira geração é baixa, mas evitar se houve anafilaxia.' }
          ] },
        { ordem: 4, rotulo: 'Uso off-label', tipo: 'offlabel',
          opcoes: [
            { medId: 'doxiciclina', nome: 'Doxiciclina em menores de 8 anos', esquema: '2 a 4 mg/kg/dia VO divididos a cada 12 h por 5 a 7 dias, máximo 100 mg por dose', quando: 'Forma leve quando há necessidade de cobrir também riquetsioses, ou quando amoxicilina não está disponível na comunidade', obs: 'Off-label abaixo de 8 anos no Brasil, por restrição de bula relacionada ao risco de alteração dentária. Cursos curtos de até 21 dias com doxiciclina têm risco muito baixo de manchamento dentário segundo a Academia Americana de Pediatria e o CDC, o que sustenta o uso em situações selecionadas. Registrar justificativa em prontuário.' }
          ] },
        { ordem: 5, rotulo: 'Segunda linha / falha ou indisponibilidade', tipo: 'segunda',
          opcoes: [
            { medId: 'ampicilina', nome: 'Ampicilina', esquema: '50 a 100 mg/kg/dia IV divididos a cada 6 h', quando: 'Alternativa hospitalar quando a penicilina cristalina não está disponível na unidade', obs: '' },
            { medId: null, nome: 'Reavaliação diagnóstica e transferência', esquema: '', quando: 'Ausência de melhora em 48 a 72 h de antibiótico adequado', obs: 'Rever diagnósticos diferenciais frequentes no Amazonas: malária grave, dengue grave, febre amarela, hepatites virais e sepse bacteriana.' }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: null, nome: 'Anti-inflamatórios não esteroidais', esquema: '', quando: '', obs: 'Evitar pelo risco de agravar a lesão renal aguda e o sangramento.' },
            { medId: 'prednisolona', nome: 'Corticoide de rotina na forma grave', esquema: '', quando: '', obs: 'Uso em hemorragia alveolar é controverso e sem evidência consistente. Considerar somente em unidade de terapia intensiva e com discussão especializada.' },
            { medId: null, nome: 'Quimioprofilaxia indiscriminada após enchente', esquema: '', quando: '', obs: 'Não indicada de rotina para crianças. Avaliar caso a caso, com a vigilância epidemiológica, apenas em exposição de alto risco.' }
          ] }
      ],
      naoFarmacologico: [
        'Notificação compulsória e investigação de exposição a água de enchente, lama, roedores e enchentes de igarapés, comuns no ciclo das cheias no Amazonas.',
        'Antibiótico não deve ser retardado à espera de sorologia, a microaglutinação positiva costuma demorar.',
        'Monitorar diurese, potássio, função renal, plaquetas e oxigenação, a hemorragia pulmonar é a principal causa de óbito.',
        'Transferência precoce para unidade com hemodiálise diante de lesão renal aguda ou de hipoxemia.',
        'Orientação de prevenção na comunidade: calçado fechado, luvas, armazenamento de alimentos e controle de roedores.'
      ],
      fontes: [ { nome: 'Ministério da Saúde - Leptospirose: diagnóstico e manejo clínico', ano: 2023 }, { nome: 'OPAS/OMS - Leptospirosis, human, guidance for diagnosis and management', ano: 2022 } ],
      atualizadoEm: '2026-09'
    },
    leishmaniose_visceral: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha em pediatria', tipo: 'primeira',
          opcoes: [
            { medId: 'anfotericina_b_lipossomal', nome: 'Anfotericina B lipossomal', esquema: '3 mg/kg/dia IV por 7 dias, ou 4 mg/kg/dia por 5 dias, conforme o Manual de vigilância e tratamento das leishmanioses', quando: 'Primeira escolha em menores de 1 ano, em criança com sinais de gravidade, desnutrição grave, coinfecção HIV, insuficiência renal ou hepática, e em falha ou toxicidade ao antimonial', obs: 'Menor toxicidade e internação mais curta. Monitorar potássio, magnésio, função renal e reação infusional.' }
          ] },
        { ordem: 2, rotulo: 'Alternativa quando a anfotericina lipossomal não está disponível', tipo: 'alternativa',
          opcoes: [
            { medId: 'antimoniato_meglumina', nome: 'Antimoniato de meglumina', esquema: '20 mg de Sb5+/kg/dia IV ou IM por 20 a 30 dias, máximo de 3 ampolas ao dia', quando: 'Criança acima de 1 ano, sem sinais de gravidade e sem contraindicação cardíaca, hepática ou renal', obs: 'Exige eletrocardiograma antes e durante o tratamento, além de controle de transaminases, amilase, lipase e função renal. Contraindicado em menores de 1 ano.' },
            { medId: null, nome: 'Anfotericina B desoxicolato', esquema: '1 mg/kg/dia IV por 14 a 20 dias, conforme o manual do Ministério da Saúde', quando: 'Alternativa quando não há a formulação lipossomal nem antimonial, em unidade com monitorização', obs: 'Toxicidade renal e infusional maior. Hidratar bem e repor eletrólitos. Confirmar conforme protocolo/bula.', verificar: true }
          ] },
        { ordem: 3, rotulo: 'Segunda linha / falha terapêutica ou recidiva', tipo: 'segunda',
          opcoes: [
            { medId: 'anfotericina_b_lipossomal', nome: 'Anfotericina B lipossomal em esquema estendido', esquema: 'Dose e duração definidas pelo serviço de referência, geralmente com dose total acumulada maior', quando: 'Recidiva, falha ao antimonial ou coinfecção com HIV', obs: 'Encaminhar ao serviço de referência em leishmanioses para definição do esquema e do seguimento.' }
          ] },
        { ordem: 4, rotulo: 'Adjuvante / tratamento das complicações', tipo: 'adjuvante',
          opcoes: [
            { medId: 'ceftriaxona', nome: 'Ceftriaxona', esquema: '50 a 100 mg/kg/dia IV', quando: 'Infecção bacteriana associada, complicação frequente e principal causa de óbito no calazar', obs: 'Investigar pneumonia, otite, infecção urinária e sepse em toda criança com calazar e piora clínica.' },
            { medId: 'sulfato_ferroso', nome: 'Sulfato ferroso', esquema: '3 a 5 mg de ferro elementar/kg/dia VO, após a fase aguda', quando: 'Anemia carencial associada, após controle da doença', obs: 'Na fase aguda a anemia é principalmente da própria doença, a transfusão é decidida por critérios clínicos.' }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: 'antimoniato_meglumina', nome: 'Antimoniato de meglumina em menores de 1 ano ou em criança grave', esquema: '', quando: '', obs: 'Contraindicado nessas situações pelo risco de cardiotoxicidade e de óbito. Usar anfotericina B lipossomal.' },
            { medId: null, nome: 'Tratamento empírico sem confirmação diagnóstica', esquema: '', quando: '', obs: 'Evitar iniciar sem teste rápido rK39, sorologia ou parasitológico, salvo em criança grave em local remoto, com discussão da referência e coleta prévia de amostras.' }
          ] }
      ],
      naoFarmacologico: [
        'Notificação compulsória e busca de casos caninos e humanos na comunidade.',
        'Avaliar e tratar desnutrição, anemia e infecções associadas, que determinam a letalidade.',
        'Usar o escore de gravidade do Ministério da Saúde para decidir internação e transferência.',
        'Seguimento clínico por 12 meses após o tratamento, para detectar recidiva.',
        'Controle vetorial no peridomicílio e proteção com mosquiteiro de malha fina, o flebotomíneo atravessa telas comuns.'
      ],
      fontes: [ { nome: 'Ministério da Saúde - Manual de vigilância e controle da leishmaniose visceral', ano: 2022 }, { nome: 'OPAS - Diretrizes para o tratamento das leishmanioses na Região das Américas', ano: 2022 } ],
      atualizadoEm: '2026-09'
    },

    leishmaniose_tegumentar: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha', tipo: 'primeira',
          opcoes: [
            { medId: 'antimoniato_meglumina', nome: 'Antimoniato de meglumina', esquema: 'Forma cutânea: 10 a 20 mg de Sb5+/kg/dia IV ou IM por 20 dias. Forma mucosa: 20 mg de Sb5+/kg/dia por 30 dias, conforme o manual do Ministério da Saúde', quando: 'Leishmaniose tegumentar confirmada em criança acima de 1 ano, sem contraindicação cardíaca, hepática, renal ou pancreática', obs: 'Exige eletrocardiograma e controle laboratorial. Criança costuma tolerar melhor que adulto, mas a monitorização é obrigatória.' }
          ] },
        { ordem: 2, rotulo: 'Alternativa quando o antimonial é contraindicado ou indisponível', tipo: 'alternativa',
          opcoes: [
            { medId: null, nome: 'Isetionato de pentamidina', esquema: '4 mg/kg/dose IM ou IV em dias alternados, número de doses conforme a forma clínica e o manual do Ministério da Saúde', quando: 'Contraindicação ou falha ao antimonial, ou lesões por Leishmania guyanensis, predominante no Amazonas', obs: 'Monitorar glicemia pelo risco de hipoglicemia e de diabetes, e a pressão arterial durante a aplicação. Confirmar conforme protocolo/bula.', verificar: true },
            { medId: 'anfotericina_b_lipossomal', nome: 'Anfotericina B lipossomal', esquema: 'Dose e duração conforme o serviço de referência', quando: 'Forma mucosa, forma disseminada, falha terapêutica ou contraindicação às demais opções', obs: 'Requer internação e monitorização. Encaminhar ao serviço de referência.' }
          ] },
        { ordem: 3, rotulo: 'Segunda linha / casos refratários', tipo: 'segunda',
          opcoes: [
            { medId: null, nome: 'Miltefosina', esquema: 'Cerca de 2,5 mg/kg/dia VO por 28 dias, conforme protocolo do serviço de referência e faixa de peso', quando: 'Opção oral em leishmaniose tegumentar, útil quando a via parenteral supervisionada é inviável em comunidade distante', obs: 'Disponibilidade restrita no SUS e acesso pela referência estadual. Contraindicada na gestação, exige contracepção em adolescentes. Confirmar conforme protocolo/bula.', verificar: true }
          ] },
        { ordem: 4, rotulo: 'Adjuvante / tratamento da infecção secundária', tipo: 'adjuvante',
          opcoes: [
            { medId: 'cefalexina', nome: 'Cefalexina', esquema: '50 mg/kg/dia VO divididos a cada 6 h por 7 a 10 dias', quando: 'Infecção bacteriana secundária da úlcera, com celulite periférica, secreção purulenta ou dor desproporcional', obs: 'Tratar a infecção secundária antes de julgar falha terapêutica da leishmaniose.' },
            { medId: null, nome: 'Curativo e limpeza da lesão', esquema: '', quando: 'Toda úlcera cutânea', obs: 'Limpeza com soro fisiológico e curativo não aderente. Evitar produtos cáusticos e receitas caseiras irritantes.' }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: null, nome: 'Termoterapia e infiltração intralesional em criança', esquema: '', quando: '', obs: 'Não recomendadas de rotina na faixa pediátrica no protocolo brasileiro, ficam restritas a situações selecionadas em serviço de referência.' },
            { medId: null, nome: 'Uso de cáusticos, ervas e cauterização caseira na úlcera', esquema: '', quando: '', obs: 'Prática comum na comunidade, aumenta o risco de infecção secundária e de cicatriz. Orientar ativamente contra.' },
            { medId: 'antimoniato_meglumina', nome: 'Antimonial em menores de 1 ano', esquema: '', quando: '', obs: 'Contraindicado, avaliar alternativas com o serviço de referência.' }
          ] }
      ],
      naoFarmacologico: [
        'Confirmação por pesquisa direta em raspado de lesão, quando disponível, antes de iniciar o tratamento.',
        'Notificação compulsória e registro fotográfico da lesão para comparar na reavaliação.',
        'Tratamento supervisionado, com apoio do agente comunitário nas comunidades ribeirinhas e indígenas.',
        'Seguimento por 3 meses após o fim do tratamento para avaliar cicatrização, e por 6 a 12 meses para detectar recidiva ou acometimento mucoso.',
        'Avaliação otorrinolaringológica em lesões extensas, múltiplas, ou acima da cintura, pelo risco de forma mucosa tardia.'
      ],
      fontes: [ { nome: 'Ministério da Saúde - Manual de vigilância da leishmaniose tegumentar', ano: 2022 }, { nome: 'OPAS - Diretrizes para o tratamento das leishmanioses na Região das Américas', ano: 2022 } ],
      atualizadoEm: '2026-09'
    },

    doenca_chagas: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha', tipo: 'primeira',
          opcoes: [
            { medId: 'benznidazol', nome: 'Benznidazol', esquema: '5 a 10 mg/kg/dia VO divididos a cada 12 h por 60 dias, conforme o PCDT de Doença de Chagas e a faixa de peso', quando: 'Fase aguda confirmada, incluindo os surtos de transmissão oral por açaí e bacaba, situação típica do Amazonas', obs: 'Tratar o mais precocemente possível, a eficácia na fase aguda é alta. Monitorar hemograma, transaminases e aparecimento de exantema.' }
          ] },
        { ordem: 2, rotulo: 'Alternativa / segunda linha', tipo: 'segunda',
          opcoes: [
            { medId: null, nome: 'Nifurtimox', esquema: '8 a 10 mg/kg/dia VO divididos a cada 8 h por 60 dias, conforme faixa de peso e protocolo', quando: 'Alternativa quando há intolerância, reação adversa importante ou falha ao benznidazol', obs: 'Acesso pelo Ministério da Saúde e pela OPAS. Efeitos adversos digestivos e neurológicos mais frequentes. Confirmar conforme protocolo/bula.', verificar: true }
          ] },
        { ordem: 3, rotulo: 'Conduta em reação adversa ao benznidazol', tipo: 'alternativa',
          opcoes: [
            { medId: null, nome: 'Suspensão temporária e reintrodução escalonada', esquema: '', quando: 'Exantema leve a moderado, sintoma digestivo ou neuropatia incipiente', obs: 'Discutir com a referência. Exantema grave, síndrome de Stevens-Johnson, neutropenia ou hepatite exigem suspensão definitiva e troca de fármaco.' },
            { medId: null, nome: 'Anti-histamínico oral', esquema: 'Dose conforme idade e bula do produto disponível', quando: 'Exantema leve durante o tratamento, para permitir a continuidade sob vigilância', obs: 'Confirmar conforme protocolo/bula. Não mascarar reação grave.', verificar: true }
          ] },
        { ordem: 4, rotulo: 'Adjuvante / sintomático', tipo: 'adjuvante',
          opcoes: [
            { medId: 'paracetamol', nome: 'Paracetamol', esquema: '10 a 15 mg/kg/dose VO a cada 6 h', quando: 'Febre da fase aguda', obs: '' },
            { medId: 'diazepam', nome: 'Diazepam', esquema: '0,2 a 0,3 mg/kg/dose IV lenta, máximo conforme protocolo', quando: 'Convulsão na meningoencefalite chagásica aguda, complicação rara e grave', obs: 'Manejo em unidade com suporte ventilatório, transferir precocemente.' }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: 'prednisolona', nome: 'Corticoide de rotina na fase aguda', esquema: '', quando: '', obs: 'Não indicado, pode aumentar a parasitemia. Reservar a situações específicas com avaliação especializada, como miocardite grave.' },
            { medId: null, nome: 'Tratamento sem confirmação laboratorial', esquema: '', quando: '', obs: 'Coletar parasitológico direto, gota espessa ou sorologia antes de iniciar, salvo em surto oral já confirmado com nexo epidemiológico claro e discussão com a vigilância.' },
            { medId: 'benznidazol', nome: 'Interrupção precoce do benznidazol por melhora clínica', esquema: '', quando: '', obs: 'O curso de 60 dias deve ser completo, a melhora dos sintomas ocorre antes da cura parasitológica.' }
          ] }
      ],
      naoFarmacologico: [
        'Notificação imediata e investigação de surto, a transmissão oral por polpa de açaí ou bacaba contaminada gera casos em grupo familiar.',
        'Investigar e tratar todos os expostos do mesmo lote de alimento ou da mesma comunidade.',
        'Eletrocardiograma e avaliação cardiológica na fase aguda e no seguimento.',
        'Orientar boas práticas de coleta, branqueamento e higienização da polpa de frutos amazônicos.',
        'Seguimento sorológico prolongado, a negativação é lenta e a criança tratada precocemente tem alta chance de cura.'
      ],
      fontes: [ { nome: 'Ministério da Saúde - Protocolo Clínico e Diretrizes Terapêuticas da Doença de Chagas', ano: 2022 }, { nome: 'OPAS - Guidelines for the diagnosis and treatment of Chagas disease', ano: 2019 } ],
      atualizadoEm: '2026-09'
    },

    tuberculose: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - esquema básico', tipo: 'primeira',
          opcoes: [
            { medId: 'rifampicina', nome: 'Rifampicina', esquema: '15 mg/kg/dia VO (faixa de 10 a 20), 2 meses de fase intensiva e 4 meses de manutenção, conforme faixa de peso e apresentação dispersível', quando: 'Tuberculose pulmonar ou extrapulmonar confirmada ou com escore clínico-radiológico compatível, em criança abaixo de 10 anos', obs: 'Em criança menor de 10 anos o esquema é RHZ na fase intensiva e RH na manutenção, sem etambutol de rotina. A partir de 10 anos utiliza-se RHZE.' },
            { medId: 'isoniazida', nome: 'Isoniazida', esquema: '10 mg/kg/dia VO (faixa de 7 a 15), pelos 6 meses', quando: 'Componente do esquema básico', obs: 'Monitorar transaminases se houver sintomas. Considerar piridoxina em desnutrido, em adolescente e em pessoa vivendo com HIV.' },
            { medId: 'pirazinamida', nome: 'Pirazinamida', esquema: '35 mg/kg/dia VO (faixa de 30 a 40), nos 2 primeiros meses', quando: 'Fase intensiva do esquema básico', obs: '' }
          ] },
        { ordem: 2, rotulo: 'Acréscimo conforme idade e forma clínica', tipo: 'alternativa',
          opcoes: [
            { medId: 'etambutol', nome: 'Etambutol', esquema: '20 mg/kg/dia VO (faixa de 15 a 25), nos 2 primeiros meses', quando: 'Criança a partir de 10 anos, ou formas extensas e com alta carga bacilar em menores de 10 anos conforme avaliação, e nos esquemas com suspeita de resistência', obs: 'Avaliar acuidade visual e discriminação de cores quando a criança colabora.' }
          ] },
        { ordem: 3, rotulo: 'Adjuvante - corticoide em formas graves', tipo: 'adjuvante',
          opcoes: [
            { medId: 'prednisolona', nome: 'Prednisolona', esquema: '1 a 2 mg/kg/dia VO por 4 semanas, com redução gradual, máximo conforme protocolo', quando: 'Meningoencefalite tuberculosa, pericardite, tuberculose miliar grave e obstrução brônquica por gânglio', obs: 'Somente associado ao esquema antituberculose em curso.' },
            { medId: 'dexametasona', nome: 'Dexametasona', esquema: 'Dose conforme protocolo do serviço, na fase inicial da meningite tuberculosa, com redução gradual', quando: 'Alternativa parenteral ao corticoide oral na meningoencefalite tuberculosa', obs: 'Confirmar conforme protocolo/bula.', verificar: true }
          ] },
        { ordem: 4, rotulo: 'Segunda linha / falha, resistência ou intolerância', tipo: 'segunda',
          opcoes: [
            { medId: null, nome: 'Esquema para tuberculose drogarresistente definido por serviço de referência terciária', esquema: '', quando: 'Falha do esquema básico, contato com caso resistente, teste rápido molecular com resistência à rifampicina, ou toxicidade que impeça o esquema padrão', obs: 'Nunca montar esquema de resgate isoladamente. Encaminhar ao serviço de referência em tuberculose e comunicar a coordenação estadual do programa.' }
          ] },
        { ordem: 5, rotulo: 'Uso off-label', tipo: 'offlabel',
          opcoes: [
            { medId: null, nome: 'Levofloxacino e outros fármacos de segunda linha em criança', esquema: 'Dose definida pelo serviço de referência conforme peso', quando: 'Tuberculose resistente ou intolerância aos fármacos de primeira linha, sob condução especializada', obs: 'As fluoroquinolonas são off-label na faixa pediátrica para essa indicação no Brasil, por restrição de bula ligada ao risco osteoarticular. O uso é recomendado pela OMS e pelo Ministério da Saúde no manejo da tuberculose drogarresistente em crianças, com monitorização. Confirmar conforme protocolo do serviço de referência.', verificar: true }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: null, nome: 'Monoterapia ou acréscimo de um único fármaco a um esquema em falência', esquema: '', quando: '', obs: 'Prática que gera resistência. Toda mudança de esquema deve ser feita pelo serviço de referência.' },
            { medId: null, nome: 'Interrupção do tratamento pela melhora clínica', esquema: '', quando: '', obs: 'O esquema de 6 meses deve ser completado. Abandono é a principal causa de falência e de resistência.' },
            { medId: null, nome: 'Exigir confirmação bacteriológica antes de tratar a criança', esquema: '', quando: '', obs: 'A tuberculose infantil é paucibacilar. O diagnóstico usa o sistema de pontuação clínico, radiológico, epidemiológico e prova tuberculínica ou IGRA, e a ausência de baciloscopia não afasta a doença.' }
          ] }
      ],
      naoFarmacologico: [
        'Tratamento diretamente observado, com apoio do agente comunitário de saúde e adaptação logística em comunidade fluvial.',
        'Investigação de contatos intradomiciliares e tratamento da infecção latente nos contatos indicados.',
        'Testagem para HIV em todo caso de tuberculose.',
        'Avaliação nutricional e acompanhamento do ganho de peso, com reajuste das doses conforme o peso a cada consulta.',
        'Notificação compulsória e registro no sistema de informação do programa de tuberculose.'
      ],
      fontes: [ { nome: 'Ministério da Saúde - Manual de recomendações para o controle da tuberculose no Brasil', ano: 2024 }, { nome: 'OMS - Consolidated guidelines on tuberculosis, management in children and adolescents', ano: 2022 } ],
      atualizadoEm: '2026-09'
    },

    hanseniase: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - poliquimioterapia única (PQT-U)', tipo: 'primeira',
          opcoes: [
            { medId: 'rifampicina', nome: 'Rifampicina', esquema: 'Dose mensal supervisionada, ajustada por faixa de peso e idade conforme as cartelas infantis do esquema PQT-U, por 6 meses na forma paucibacilar e 12 meses na multibacilar', quando: 'Hanseníase confirmada em criança, em qualquer forma clínica', obs: 'Em menor de 30 kg a dose é calculada por peso, cerca de 10 a 20 mg/kg mensal. Confirmar conforme protocolo/bula e cartela disponível.', verificar: true },
            { medId: 'dapsona', nome: 'Dapsona', esquema: 'Dose mensal supervisionada e dose diária autoadministrada, conforme faixa de peso da cartela infantil, em torno de 2 mg/kg/dia', quando: 'Componente do esquema PQT-U', obs: 'Investigar deficiência de G6PD quando disponível, e monitorar hemoglobina pelo risco de hemólise e de metemoglobinemia. Confirmar conforme protocolo/bula e cartela disponível.', verificar: true },
            { medId: 'clofazimina', nome: 'Clofazimina', esquema: 'Dose mensal supervisionada e dose em dias alternados ou diária conforme faixa de peso da cartela infantil', quando: 'Componente do esquema PQT-U, agora também na forma paucibacilar segundo o esquema único', obs: 'Orientar sobre o escurecimento reversível da pele e ressecamento cutâneo, causa frequente de abandono na adolescência. Confirmar conforme protocolo/bula e cartela disponível.', verificar: true }
          ] },
        { ordem: 2, rotulo: 'Alternativa em intolerância ou contraindicação a um dos fármacos', tipo: 'alternativa',
          opcoes: [
            { medId: null, nome: 'Esquema substitutivo com ofloxacino, minociclina ou claritromicina', esquema: 'Definido pelo serviço de referência conforme o fármaco substituído e o peso', quando: 'Intolerância grave ou contraindicação à dapsona, à rifampicina ou à clofazimina', obs: 'Esquemas substitutivos constam das diretrizes do Ministério da Saúde, mas a composição em pediatria deve ser definida pela referência. Confirmar conforme protocolo.', verificar: true },
            { medId: null, nome: 'Suspensão da dapsona em anemia hemolítica', esquema: '', quando: 'Queda importante de hemoglobina, icterícia ou cianose por metemoglobinemia', obs: 'Suspender e encaminhar imediatamente à referência para redefinição do esquema.' }
          ] },
        { ordem: 3, rotulo: 'Tratamento das reações hansênicas', tipo: 'adjuvante',
          opcoes: [
            { medId: 'prednisolona', nome: 'Prednisolona', esquema: '1 a 2 mg/kg/dia VO, com redução gradual e lenta conforme resposta', quando: 'Reação tipo 1 (reversa) e reação tipo 2 com neurite, iridociclite ou orquite, e em qualquer dano neural agudo', obs: 'Manter a poliquimioterapia durante a reação. Associar profilaxia de estrongiloidíase antes de corticoide prolongado em área endêmica.' },
            { medId: 'clofazimina', nome: 'Clofazimina em dose anti-inflamatória', esquema: 'Dose aumentada conforme orientação da referência, por período limitado', quando: 'Reação tipo 2 recorrente ou dependente de corticoide', obs: 'Confirmar conforme protocolo/bula e conduzir com a referência.', verificar: true }
          ] },
        { ordem: 4, rotulo: 'Adjuvante - profilaxia antes de corticoide prolongado', tipo: 'adjuvante',
          opcoes: [
            { medId: 'ivermectina', nome: 'Ivermectina', esquema: '200 mcg/kg VO em dose única, repetida conforme protocolo, em criança acima de 15 kg', quando: 'Prevenção de hiperinfecção por Strongyloides antes ou no início de corticoterapia prolongada, em área endêmica como a Amazônia', obs: 'Alternativa com albendazol quando a ivermectina não está disponível. Confirmar conforme protocolo/bula.', verificar: true }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: null, nome: 'Talidomida em crianças e em adolescentes do sexo feminino', esquema: '', quando: '', obs: 'Não recomendada na faixa pediátrica de rotina e proibida em mulheres em idade fértil sem os controles rigorosos previstos em lei, pelo risco teratogênico. Reação tipo 2 na criança é conduzida com corticoide e apoio da referência.' },
            { medId: null, nome: 'Interrupção da poliquimioterapia durante a reação hansênica', esquema: '', quando: '', obs: 'Erro frequente. A reação não indica falha nem alergia ao esquema, a poliquimioterapia deve continuar.' },
            { medId: null, nome: 'Tratamento sem classificação operacional e sem avaliação neurológica', esquema: '', quando: '', obs: 'A avaliação do grau de incapacidade e o exame neurológico simplificado orientam o seguimento e devem ser feitos no diagnóstico e na alta.' }
          ] }
      ],
      naoFarmacologico: [
        'Notificação compulsória, exame de todos os contatos domiciliares e dos contatos sociais próximos.',
        'Vacinação BCG nos contatos conforme as diretrizes vigentes, e avaliação de quimioprofilaxia com rifampicina dose única segundo a recomendação nacional.',
        'Avaliação neurológica simplificada e do grau de incapacidade física no diagnóstico, durante o tratamento e na alta.',
        'Autocuidado com mãos, pés e olhos, orientado de forma lúdica e com a família.',
        'Enfrentamento do estigma na escola e na comunidade, com apoio do agente comunitário.'
      ],
      fontes: [ { nome: 'Ministério da Saúde - Diretrizes para vigilância, atenção e eliminação da hanseníase como problema de saúde pública', ano: 2022 }, { nome: 'OMS - Guidelines for the diagnosis, treatment and prevention of leprosy', ano: 2018 } ],
      atualizadoEm: '2026-09'
    },

    acidente_ofidico: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - soroterapia específica', tipo: 'primeira',
          opcoes: [
            { medId: 'soro_antibotropico', nome: 'Soro antibotrópico (SAB)', esquema: 'Leve 2 a 4 ampolas, moderado 4 a 8 ampolas, grave 12 ampolas, IV, conforme o manual do Ministério da Saúde', quando: 'Acidente por jararaca e afins, com edema, dor, equimose, bolhas ou sangramento', obs: 'A dose é a mesma para criança e adulto, pois depende da quantidade de veneno inoculado, não do peso. Diluir conforme protocolo e infundir com monitorização.' },
            { medId: 'soro_anticrotalico', nome: 'Soro anticrotálico (SAC)', esquema: 'Leve 5 ampolas, moderado 10 ampolas, grave 20 ampolas, IV', quando: 'Acidente crotálico, com fácies miastênica, mialgia, urina escura e pouca reação local', obs: 'Risco de rabdomiólise e de lesão renal aguda, hidratar precocemente.' },
            { medId: 'soro_antilaquetico', nome: 'Soro antilaquético (SAL)', esquema: 'Moderado 10 ampolas, grave 20 ampolas, IV', quando: 'Acidente laquético, por surucucu, frequente em área de mata na Amazônia, com quadro local botrópico associado a vagotonia, bradicardia, hipotensão, vômitos e diarreia', obs: 'Na indisponibilidade do SAL, o soro antibotrópico-laquético é a opção prevista.' },
            { medId: 'soro_antielapidico', nome: 'Soro antielapídico (SAE)', esquema: '10 ampolas IV em todos os casos, independentemente da gravidade aparente', quando: 'Acidente elapídico, por coral verdadeira, com ptose, oftalmoplegia e risco de insuficiência respiratória', obs: 'Todo acidente elapídico é considerado potencialmente grave, soroterapia imediata e vigilância respiratória.' }
          ] },
        { ordem: 2, rotulo: 'Alternativa quando o soro específico não está disponível na unidade', tipo: 'alternativa',
          opcoes: [
            { medId: 'soro_antibotropico', nome: 'Soro antibotrópico-laquético ou antibotrópico-crotálico', esquema: 'Número de ampolas conforme a gravidade e o manual do Ministério da Saúde', quando: 'Alternativa prevista quando o soro monovalente correspondente não está disponível no ponto de atendimento', obs: 'Em comunidade ribeirinha ou indígena, acionar imediatamente o polo de soroterapia da região e o transporte, o tempo até a soroterapia determina o prognóstico. Confirmar disponibilidade conforme a rede estadual.', verificar: true },
            { medId: 'soro_fisiologico', nome: 'Hidratação venosa e medidas de suporte durante o transporte', esquema: 'Soro fisiológico 0,9% conforme necessidade hídrica e perfusão, com atenção à diurese', quando: 'Enquanto o soro específico não está disponível e durante o transporte para a referência', obs: 'Manter membro elevado, analgesia, e evitar torniquete, sucção e incisão.' }
          ] },
        { ordem: 3, rotulo: 'Conduta na reação anafilática à soroterapia', tipo: 'primeira',
          opcoes: [
            { medId: 'adrenalina', nome: 'Adrenalina', esquema: '0,01 mg/kg IM na face anterolateral da coxa, máximo 0,5 mg por dose, repetível a cada 5 a 15 min', quando: 'Reação anafilática durante a infusão do soro', obs: 'Primeira medida da anafilaxia. Suspender temporariamente a infusão, tratar e reiniciar mais lentamente, a soroterapia não pode ser abandonada.' },
            { medId: 'hidrocortisona', nome: 'Hidrocortisona', esquema: '4 a 10 mg/kg/dose IV conforme protocolo do serviço', quando: 'Adjuvante na reação à soroterapia, após a adrenalina', obs: 'Não substitui a adrenalina e não previne a reação bifásica de forma isolada.' }
          ] },
        { ordem: 4, rotulo: 'Adjuvante - infecção secundária e dor', tipo: 'adjuvante',
          opcoes: [
            { medId: 'amoxicilina_clavulanato', nome: 'Amoxicilina + clavulanato', esquema: '50 mg/kg/dia de amoxicilina VO divididos a cada 8 ou 12 h por 7 dias', quando: 'Sinais de infecção secundária no acidente botrópico, como celulite e abscesso, complicação comum pela flora oral da serpente', obs: 'Não indicado como profilaxia de rotina em todo acidente, avaliar sinais clínicos.' },
            { medId: 'dipirona', nome: 'Dipirona', esquema: '10 a 15 mg/kg/dose IV ou VO a cada 6 h', quando: 'Dor local intensa', obs: 'Preferir analgésico não anti-inflamatório pelo distúrbio de coagulação.' }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: null, nome: 'Torniquete, garrote, sucção, incisão e aplicação de substâncias na picada', esquema: '', quando: '', obs: 'Práticas comuns na comunidade que aumentam necrose, infecção e amputação, sem qualquer benefício. Orientar ativamente contra.' },
            { medId: null, nome: 'Anti-inflamatórios não esteroidais e ácido acetilsalicílico', esquema: '', quando: '', obs: 'Evitar pelo distúrbio de coagulação induzido pelo veneno e pelo risco renal.' },
            { medId: null, nome: 'Pré-medicação sistemática com corticoide e anti-histamínico antes do soro', esquema: '', quando: '', obs: 'Não é recomendada de rotina no manual brasileiro e não substitui a vigilância. O essencial é ter adrenalina preparada e monitorizar durante a infusão.' },
            { medId: null, nome: 'Retardar a soroterapia à espera de identificação da serpente', esquema: '', quando: '', obs: 'A indicação é clínica e epidemiológica. Não atrasar a soroterapia.' }
          ] }
      ],
      naoFarmacologico: [
        'Notificação compulsória e registro do tempo entre a picada e a soroterapia.',
        'Manter o membro elevado e em repouso, limpar a ferida, avaliar perfusão distal e síndrome compartimental.',
        'Monitorar tempo de coagulação, diurese, função renal e sangramentos, com reavaliação em 12 e 24 h.',
        'Verificar e atualizar a profilaxia antitetânica, que deve ser feita após a normalização da coagulação nos acidentes botrópicos.',
        'Plano regional de transporte fluvial e aéreo definido antecipadamente para comunidades distantes dos polos de soroterapia.'
      ],
      fontes: [ { nome: 'Ministério da Saúde - Manual de diagnóstico e tratamento de acidentes por animais peçonhentos', ano: 2024 }, { nome: 'OMS - Guidelines for the management of snakebites', ano: 2016 } ],
      atualizadoEm: '2026-09'
    },

    escorpionismo: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - soroterapia nos casos moderados e graves', tipo: 'primeira',
          opcoes: [
            { medId: 'soro_antiescorpionico', nome: 'Soro antiescorpiônico (SAEEs)', esquema: 'Moderado 2 a 3 ampolas, grave 4 a 6 ampolas, IV, conforme o manual do Ministério da Saúde', quando: 'Manifestação sistêmica: vômitos repetidos, sudorese profusa, agitação, taquicardia, hipertensão, sialorreia, tremores, priapismo, edema pulmonar ou choque', obs: 'Criança pequena evolui mais rápido para forma grave. A soroterapia é urgente e a dose não depende do peso.' },
            { medId: 'soro_antiaracnidico', nome: 'Soro antiaracnídico (SAAr)', esquema: 'Mesmo número de ampolas do soro antiescorpiônico conforme a gravidade', quando: 'Alternativa de igual eficácia quando o soro antiescorpiônico específico não está disponível na unidade', obs: 'Opção prevista no manual do Ministério da Saúde.' }
          ] },
        { ordem: 2, rotulo: 'Primeira escolha no caso leve - analgesia', tipo: 'primeira',
          opcoes: [
            { medId: null, nome: 'Lidocaína 2% sem vasoconstritor, infiltração local', esquema: 'Cerca de 1 mL por vez em criança, conforme protocolo do serviço, respeitando a dose máxima por peso', quando: 'Dor local intensa no acidente leve, que é a apresentação mais comum', obs: 'Analgesia local é a base do tratamento do caso leve. Confirmar dose máxima conforme protocolo/bula.', verificar: true },
            { medId: 'dipirona', nome: 'Dipirona', esquema: '10 a 15 mg/kg/dose VO ou IV a cada 6 h', quando: 'Dor local, isolada ou associada à infiltração', obs: '' }
          ] },
        { ordem: 3, rotulo: 'Alternativa quando não há lidocaína ou a dor persiste', tipo: 'alternativa',
          opcoes: [
            { medId: 'paracetamol', nome: 'Paracetamol', esquema: '10 a 15 mg/kg/dose VO a cada 6 h', quando: 'Alternativa analgésica no caso leve, especialmente em unidade sem anestésico local', obs: '' },
            { medId: null, nome: 'Compressas mornas no local da picada', esquema: '', quando: 'Medida adjuvante de analgesia no acidente leve', obs: 'Medida simples, útil enquanto a criança permanece em observação.' }
          ] },
        { ordem: 4, rotulo: 'Adjuvante nas complicações do caso grave', tipo: 'adjuvante',
          opcoes: [
            { medId: 'ondansetrona', nome: 'Ondansetrona', esquema: '0,15 mg/kg/dose IV conforme protocolo do serviço', quando: 'Vômitos incoercíveis, que são o principal marcador de gravidade na criança', obs: 'Não retardar a soroterapia para tratar o vômito, o vômito repetido já indica soro.' },
            { medId: 'adrenalina', nome: 'Adrenalina', esquema: '0,01 mg/kg IM na anafilaxia à soroterapia, e infusão contínua no choque conforme protocolo de terapia intensiva', quando: 'Reação anafilática ao soro ou choque cardiogênico', obs: 'Edema agudo de pulmão e choque cardiogênico exigem terapia intensiva e transferência.' },
            { medId: 'midazolam', nome: 'Midazolam', esquema: 'Dose conforme protocolo do serviço, na menor dose eficaz', quando: 'Agitação intensa ou convulsão no caso grave, em ambiente monitorizado', obs: 'Usar com cautela pelo risco de depressão respiratória, somente com suporte ventilatório disponível.' }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: null, nome: 'Torniquete, incisão, sucção e substâncias caseiras na picada', esquema: '', quando: '', obs: 'Sem benefício e com risco de infecção e de lesão local.' },
            { medId: null, nome: 'Soroterapia no acidente leve com dor apenas local', esquema: '', quando: '', obs: 'Não indicada. O caso leve é tratado com analgesia e observação de 6 a 12 h, especialmente em menores de 7 anos.' },
            { medId: null, nome: 'Codeína e outros opioides em menores de 12 anos para a dor', esquema: '', quando: '', obs: 'Codeína é contraindicada abaixo de 12 anos. A analgesia local com lidocaína é mais eficaz e mais segura nesse acidente.' },
            { medId: null, nome: 'Alta precoce da criança pequena sem período de observação', esquema: '', quando: '', obs: 'Menores de 7 anos podem evoluir para forma grave em poucas horas. Manter observação em unidade com condições de soroterapia.' }
          ] }
      ],
      naoFarmacologico: [
        'Notificação compulsória e identificação do animal quando possível, sem atrasar o atendimento.',
        'Observação mínima de 6 a 12 h para menores de 7 anos, mesmo em caso aparentemente leve.',
        'Monitorização cardíaca, oximetria, glicemia e avaliação de sinais de edema pulmonar nos casos moderados e graves.',
        'Eletrocardiograma e, quando disponível, avaliação da função cardíaca nos casos graves.',
        'Prevenção domiciliar: manter quintal limpo, vedar ralos, afastar entulho e lenha das paredes da casa.'
      ],
      fontes: [ { nome: 'Ministério da Saúde - Manual de diagnóstico e tratamento de acidentes por animais peçonhentos', ano: 2024 }, { nome: 'Sociedade Brasileira de Pediatria - Documento científico sobre acidentes por animais peçonhentos', ano: 2023 } ],
      atualizadoEm: '2026-09'
    },

    araneismo: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - soroterapia conforme o gênero e a gravidade', tipo: 'primeira',
          opcoes: [
            { medId: 'soro_antiaracnidico', nome: 'Soro antiaracnídico (SAAr)', esquema: 'Loxoscelismo cutâneo-hemolítico ou forma cutânea extensa: 5 ampolas IV. Foneutrismo moderado: 2 a 4 ampolas. Foneutrismo grave: 5 a 10 ampolas. Conforme o manual do Ministério da Saúde', quando: 'Acidente por Loxosceles com forma sistêmica ou lesão extensa, e acidente por Phoneutria moderado ou grave, sobretudo em criança pequena', obs: 'A maioria dos acidentes por Phoneutria é leve e não necessita de soro. Em criança pequena o limiar de gravidade é menor.' },
            { medId: null, nome: 'Soro antilatrodéctico (SALatr)', esquema: '1 a 2 ampolas IM ou IV, conforme a gravidade e o manual do Ministério da Saúde', quando: 'Latrodectismo com manifestações sistêmicas, como dor abdominal intensa, sudorese, tremores e hipertensão', obs: 'Disponibilidade restrita a alguns centros. Acionar a referência regional. Confirmar conforme protocolo.', verificar: true }
          ] },
        { ordem: 2, rotulo: 'Primeira escolha no acidente leve - analgesia', tipo: 'primeira',
          opcoes: [
            { medId: null, nome: 'Lidocaína 2% sem vasoconstritor, infiltração ou bloqueio local', esquema: 'Cerca de 1 a 3 mL conforme o local e o peso, respeitando a dose máxima por peso', quando: 'Dor intensa no foneutrismo leve, que é a apresentação mais frequente', obs: 'Confirmar dose máxima conforme protocolo/bula. Pode ser repetida conforme o manual.', verificar: true },
            { medId: 'dipirona', nome: 'Dipirona', esquema: '10 a 15 mg/kg/dose VO ou IV a cada 6 h', quando: 'Dor local, isolada ou associada ao bloqueio', obs: '' }
          ] },
        { ordem: 3, rotulo: 'Adjuvante no loxoscelismo', tipo: 'adjuvante',
          opcoes: [
            { medId: 'prednisolona', nome: 'Prednisolona', esquema: '1 mg/kg/dia VO por cerca de 5 dias, conforme o manual do Ministério da Saúde', quando: 'Loxoscelismo cutâneo, associado ou não à soroterapia, para reduzir a inflamação local', obs: 'Não substitui a soroterapia nas formas com hemólise.' },
            { medId: 'cefalexina', nome: 'Cefalexina', esquema: '50 mg/kg/dia VO divididos a cada 6 h por 7 a 10 dias', quando: 'Infecção secundária da lesão necrótica', obs: 'Avaliar clinicamente, não usar como profilaxia de rotina.' }
          ] },
        { ordem: 4, rotulo: 'Uso off-label', tipo: 'offlabel',
          opcoes: [
            { medId: 'dapsona', nome: 'Dapsona no loxoscelismo cutâneo', esquema: 'Cerca de 1 mg/kg/dia VO por período curto, definido com a referência', quando: 'Lesão necrótica cutânea extensa por Loxosceles, em serviço com possibilidade de monitorização hematológica', obs: 'Off-label: a dapsona tem registro para hanseníase e dermatite herpetiforme, e o uso no loxoscelismo deriva de séries de casos e de modelos experimentais, com evidência controversa. Exige pesquisa de deficiência de G6PD e controle de hemograma pelo risco de hemólise e de metemoglobinemia. Confirmar conforme protocolo/bula e discutir com a referência.', verificar: true }
          ] },
        { ordem: 5, rotulo: 'Adjuvante no caso grave', tipo: 'adjuvante',
          opcoes: [
            { medId: 'diazepam', nome: 'Diazepam', esquema: '0,1 a 0,2 mg/kg/dose IV lenta, conforme protocolo do serviço', quando: 'Espasmos musculares intensos no latrodectismo', obs: 'Monitorizar nível de consciência e respiração.' },
            { medId: 'adrenalina', nome: 'Adrenalina', esquema: '0,01 mg/kg IM, máximo 0,5 mg por dose', quando: 'Reação anafilática durante a soroterapia', obs: 'Suspender a infusão, tratar e reiniciar mais lentamente.' }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: null, nome: 'Desbridamento cirúrgico precoce da lesão loxoscélica', esquema: '', quando: '', obs: 'Deve ser postergado até a demarcação da necrose, o desbridamento precoce amplia a perda tecidual.' },
            { medId: null, nome: 'Torniquete, incisão, sucção e aplicação de substâncias caseiras', esquema: '', quando: '', obs: 'Sem benefício e com risco de infecção e de piora da lesão.' },
            { medId: 'soro_antiaracnidico', nome: 'Soroterapia em todo acidente por Phoneutria', esquema: '', quando: '', obs: 'A maioria dos casos é leve e se resolve com analgesia e observação. Reservar o soro para casos moderados e graves, e ter atenção redobrada em menores de 7 anos.' },
            { medId: null, nome: 'Antibiótico profilático em toda picada de aranha', esquema: '', quando: '', obs: 'Não indicado sem sinais de infecção secundária.' }
          ] }
      ],
      naoFarmacologico: [
        'Notificação compulsória e tentativa de identificação da aranha, sem retardar o atendimento.',
        'Observação de 6 a 12 h em menores de 7 anos no foneutrismo, pelo risco de evolução para forma grave.',
        'No loxoscelismo, monitorar hemoglobina, urina e função renal por pelo menos 72 h a 7 dias, pela hemólise tardia.',
        'Cuidados locais da ferida com limpeza, curativo e avaliação seriada da demarcação da necrose.',
        'Prevenção domiciliar: sacudir roupas e calçados, afastar camas das paredes, limpar atrás de móveis e quadros.'
      ],
      fontes: [ { nome: 'Ministério da Saúde - Manual de diagnóstico e tratamento de acidentes por animais peçonhentos', ano: 2024 }, { nome: 'Sociedade Brasileira de Pediatria - Documento científico sobre acidentes por animais peçonhentos', ano: 2023 } ],
      atualizadoEm: '2026-09'
    },
    pneumonia: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - tratamento ambulatorial', tipo: 'primeira',
          opcoes: [
            { medId: 'amoxicilina', nome: 'Amoxicilina', esquema: '50 mg/kg/dia VO divididos a cada 8 h por 7 a 10 dias, podendo chegar a 80 a 90 mg/kg/dia em áreas com pneumococo de sensibilidade reduzida', quando: 'Pneumonia comunitária típica em criança previamente hígida, sem sinais de gravidade e com boa aceitação oral', obs: 'Reavaliar em 48 a 72 h. A criança de 2 meses a 5 anos com taquipneia e sem tiragem pode ser tratada em casa com retorno programado.' }
          ] },
        { ordem: 2, rotulo: 'Primeira escolha - pneumonia grave, tratamento hospitalar', tipo: 'primeira',
          opcoes: [
            { medId: 'penicilina_cristalina', nome: 'Penicilina G cristalina', esquema: '100.000 a 200.000 UI/kg/dia IV divididas a cada 6 h', quando: 'Pneumonia grave a partir de 2 meses, com tiragem subcostal, hipoxemia ou recusa alimentar', obs: 'Passar para via oral após 48 a 72 h de melhora clínica, completando o curso.' },
            { medId: 'ampicilina', nome: 'Ampicilina', esquema: '100 a 200 mg/kg/dia IV divididos a cada 6 h', quando: 'Alternativa de igual eficácia à penicilina cristalina na pneumonia grave', obs: '' },
            { medId: 'gentamicina', nome: 'Gentamicina', esquema: '5 a 7,5 mg/kg/dia IV a cada 24 h, associada a ampicilina', quando: 'Menor de 2 meses com pneumonia, em que a cobertura precisa incluir germes do período neonatal', obs: 'Nessa faixa etária considerar sempre a condução hospitalar.' }
          ] },
        { ordem: 3, rotulo: 'Alternativa em alergia a penicilina', tipo: 'alternativa',
          opcoes: [
            { medId: 'azitromicina', nome: 'Azitromicina', esquema: '10 mg/kg/dia VO por 5 dias, ou 10 mg/kg no 1o dia e 5 mg/kg/dia do 2o ao 5o dia', quando: 'Alergia a betalactâmicos, incluindo reação grave, na pneumonia não grave', obs: 'Cobre também os agentes atípicos. Atenção à resistência crescente do pneumococo a macrolídeos.' },
            { medId: 'claritromicina', nome: 'Claritromicina', esquema: '15 mg/kg/dia VO divididos a cada 12 h por 7 a 10 dias', quando: 'Alternativa ao macrolídeo de escolha, ou quando há suspeita de pneumonia atípica em escolar e adolescente', obs: '' },
            { medId: 'cefalexina', nome: 'Cefalexina', esquema: '50 a 100 mg/kg/dia VO divididos a cada 6 h', quando: 'Alergia não grave a penicilina, sem anafilaxia, em criança com pneumonia não grave', obs: 'Evitar se houve anafilaxia, angioedema ou reação cutânea grave a betalactâmico.' }
          ] },
        { ordem: 4, rotulo: 'Segunda linha / falha terapêutica ou complicação', tipo: 'segunda',
          opcoes: [
            { medId: 'ceftriaxona', nome: 'Ceftriaxona', esquema: '50 a 100 mg/kg/dia IV ou IM a cada 12 a 24 h', quando: 'Falha do esquema inicial em 48 a 72 h, pneumonia com derrame pleural, criança gravemente enferma, ou impossibilidade de via oral em comunidade distante antes da transferência', obs: 'A via intramuscular permite iniciar o tratamento em unidade básica ribeirinha enquanto se organiza o transporte.' },
            { medId: 'oxacilina', nome: 'Oxacilina', esquema: '100 a 200 mg/kg/dia IV divididos a cada 6 h, associada a ceftriaxona quando indicado', quando: 'Suspeita de pneumonia estafilocócica: pneumatoceles, derrame volumoso, evolução rápida, lesão cutânea associada', obs: '' },
            { medId: 'vancomicina', nome: 'Vancomicina', esquema: '40 a 60 mg/kg/dia IV divididos a cada 6 a 8 h', quando: 'Suspeita de Staphylococcus aureus resistente à meticilina ou pneumococo com resistência elevada, em criança grave', obs: 'Monitorar função renal e, quando disponível, nível sérico.' }
          ] },
        { ordem: 5, rotulo: 'Adjuvante / sintomático', tipo: 'adjuvante',
          opcoes: [
            { medId: 'paracetamol', nome: 'Paracetamol', esquema: '10 a 15 mg/kg/dose VO a cada 6 h', quando: 'Febre e dor torácica', obs: '' },
            { medId: 'salbutamol', nome: 'Salbutamol', esquema: 'Spray com espaçador, 2 a 4 jatos, ou nebulização conforme protocolo', quando: 'Avaliar quando há sibilância associada e história de asma ou de broncoespasmo', obs: 'Não indicado de rotina na pneumonia sem sibilância.' },
            { medId: null, nome: 'Oxigenoterapia', esquema: 'Cateter nasal ou máscara para manter saturação igual ou acima de 92% a 94%, conforme protocolo do serviço', quando: 'Hipoxemia, que é o principal marcador de gravidade', obs: 'Em comunidade sem oxímetro, usar frequência respiratória, tiragem, gemência e cianose como parâmetros.' }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: 'prednisolona', nome: 'Corticoide sistêmico na pneumonia', esquema: '', quando: '', obs: 'Sem benefício demonstrado na pneumonia comunitária da criança sem broncoespasmo. Reservar para asma associada ou para indicação específica.' },
            { medId: null, nome: 'Xaropes antitussígenos, mucolíticos e expectorantes', esquema: '', quando: '', obs: 'Sem eficácia comprovada em criança e com risco de eventos adversos. Não recomendados pelas diretrizes pediátricas.' },
            { medId: null, nome: 'Fisioterapia respiratória de rotina na pneumonia', esquema: '', quando: '', obs: 'Revisões sistemáticas não mostram redução de tempo de internação nem de mortalidade na pneumonia não complicada.' },
            { medId: 'azitromicina', nome: 'Macrolídeo como primeira escolha em lactente e pré-escolar', esquema: '', quando: '', obs: 'O pneumococo é o principal agente bacteriano nessa faixa e a amoxicilina é superior. Reservar o macrolídeo para alergia ou suspeita de agente atípico.' }
          ] }
      ],
      naoFarmacologico: [
        'Contagem da frequência respiratória por 1 minuto com a criança calma, e busca de tiragem subcostal, critérios da estratégia AIDPI.',
        'Oximetria de pulso sempre que disponível, incluindo nas unidades fluviais.',
        'Hidratação adequada e manutenção do aleitamento materno.',
        'Retorno em 48 h ou imediatamente se houver piora, com plano de transporte combinado em comunidade distante.',
        'Revisão do calendário vacinal, sobretudo pneumocócica, Haemophilus influenzae b, influenza e covid-19.'
      ],
      fontes: [ { nome: 'Sociedade Brasileira de Pediatria - Diretrizes de pneumonia adquirida na comunidade em pediatria', ano: 2023 }, { nome: 'OMS - Pocket book of hospital care for children', ano: 2013 } ],
      atualizadoEm: '2026-09'
    },

    bronquiolite: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - medidas de suporte', tipo: 'primeira',
          opcoes: [
            { medId: null, nome: 'Oxigenoterapia e suporte respiratório', esquema: 'Oxigênio suplementar para manter saturação igual ou acima de 90% a 92%, cânula nasal de alto fluxo ou CPAP conforme disponibilidade e gravidade', quando: 'Hipoxemia ou desconforto respiratório importante', obs: 'Principal medida terapêutica com benefício demonstrado, junto com hidratação e aspiração de vias aéreas.' },
            { medId: 'soro_fisiologico', nome: 'Soro fisiológico 0,9% nasal', esquema: 'Instilação nasal seguida de aspiração suave das narinas, antes das mamadas e quando houver obstrução', quando: 'Obstrução nasal, causa importante do desconforto no lactente que respira preferencialmente pelo nariz', obs: 'Medida de higiene nasal, não confundir com nebulização de soro fisiológico como tratamento.' },
            { medId: null, nome: 'Hidratação e manutenção do aleitamento', esquema: 'Oferta fracionada, sonda enteral ou hidratação venosa quando há risco de aspiração ou desconforto intenso', quando: 'Dificuldade de aceitação oral pelo esforço respiratório', obs: 'Cuidado com hiper-hidratação, existe risco de secreção inapropriada de hormônio antidiurético.' }
          ] },
        { ordem: 2, rotulo: 'Teste terapêutico, apenas em casos selecionados', tipo: 'alternativa',
          opcoes: [
            { medId: 'salbutamol', nome: 'Salbutamol', esquema: 'Teste único com spray e espaçador ou nebulização, mantendo somente se houver resposta objetiva documentada', quando: 'Avaliar em lactente com sibilância recorrente, atopia pessoal ou familiar marcante, em que asma do lactente é hipótese concorrente', obs: 'As diretrizes não recomendam o uso rotineiro na bronquiolite. Suspender se não houver melhora objetiva após o teste.' },
            { medId: 'adrenalina', nome: 'Adrenalina nebulizada', esquema: 'Nebulização conforme protocolo do serviço, com observação da resposta', quando: 'Avaliar como medida de resgate temporária no lactente com desconforto grave em pronto-socorro, enquanto se organiza o suporte ou a transferência', obs: 'Efeito transitório, sem redução de internação em revisões sistemáticas. Exige monitorização. Confirmar conforme protocolo do serviço.', verificar: true }
          ] },
        { ordem: 3, rotulo: 'Uso off-label', tipo: 'offlabel',
          opcoes: [
            { medId: null, nome: 'Solução salina hipertônica a 3% nebulizada', esquema: 'Nebulização conforme protocolo do serviço, em ambiente hospitalar', quando: 'Avaliar em lactente internado com bronquiolite e internação prevista mais prolongada, em serviços que adotam essa prática', obs: 'Off-label: preparação e uso nebulizado não constam de bula específica para essa indicação. A evidência é heterogênea, com possível pequena redução de tempo de internação em alguns estudos e ausência de efeito em outros. Não usar em pronto-socorro para decidir alta e monitorar broncoespasmo durante a nebulização. Confirmar conforme protocolo/bula do preparo utilizado.', verificar: true }
          ] },
        { ordem: 4, rotulo: 'Situação especial - prevenção, não tratamento', tipo: 'adjuvante',
          opcoes: [
            { medId: null, nome: 'Palivizumabe ou anticorpo monoclonal de ação prolongada contra o VSR', esquema: 'Dose e periodicidade conforme o protocolo de imunização passiva vigente', quando: 'Profilaxia em prematuros e cardiopatas elegíveis, antes e durante a sazonalidade do VSR', obs: 'É medida preventiva, não tem papel no tratamento da bronquiolite instalada. Confirmar critérios de elegibilidade, dose e intervalo conforme protocolo/bula vigente.', verificar: true }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: null, nome: 'Antibiótico na bronquiolite viral', esquema: '', quando: '', obs: 'Não indicado. A etiologia é viral e o antibiótico não altera a evolução. Reservar para infecção bacteriana documentada, como otite média aguda ou pneumonia bacteriana concomitante.' },
            { medId: 'prednisolona', nome: 'Corticoide sistêmico ou inalatório na bronquiolite', esquema: '', quando: '', obs: 'Sem benefício demonstrado em ensaios clínicos e revisões sistemáticas, não reduz internação nem duração dos sintomas no primeiro episódio.' },
            { medId: 'soro_fisiologico', nome: 'Nebulização com soro fisiológico isolado como tratamento da bronquiolite', esquema: '', quando: '', obs: 'Prática frequente e sem benefício terapêutico demonstrado. Pode atrasar a alta, gerar custo e cansar o lactente. A higiene nasal com instilação e aspiração é medida diferente e essa sim é útil.' },
            { medId: null, nome: 'Antitussígenos, descongestionantes e mucolíticos', esquema: '', quando: '', obs: 'Contraindicados em lactentes pelo risco de eventos adversos graves e ausência de eficácia.' },
            { medId: null, nome: 'Fisioterapia respiratória de rotina no lactente com bronquiolite', esquema: '', quando: '', obs: 'Não recomendada de rotina na bronquiolite não complicada, sem benefício em revisões sistemáticas.' },
            { medId: null, nome: 'Radiografia de tórax de rotina', esquema: '', quando: '', obs: 'Não indicada no quadro típico, aumenta a prescrição desnecessária de antibiótico. Reservar para dúvida diagnóstica ou piora inesperada.' }
          ] }
      ],
      naoFarmacologico: [
        'Higiene nasal com soro fisiológico e aspiração suave antes das mamadas.',
        'Fracionamento da dieta e manutenção do aleitamento materno.',
        'Elevação da cabeceira e observação de sinais de esgotamento respiratório.',
        'Isolamento de contato e higiene das mãos, o VSR se transmite facilmente em enfermaria e em domicílio.',
        'Orientar o responsável quanto aos sinais de piora e ao pico de gravidade entre o terceiro e o quinto dia de doença, especialmente quando o retorno depende de transporte fluvial.'
      ],
      fontes: [ { nome: 'Sociedade Brasileira de Pediatria - Diretrizes para o manejo da bronquiolite viral aguda', ano: 2023 }, { nome: 'OMS - Pocket book of hospital care for children', ano: 2013 } ],
      atualizadoEm: '2026-09'
    },

    asma: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha na crise', tipo: 'primeira',
          opcoes: [
            { medId: 'salbutamol', nome: 'Salbutamol', esquema: 'Spray com espaçador, 4 a 10 jatos a cada 20 min na primeira hora, ou nebulização com 0,07 a 0,15 mg/kg/dose, conforme protocolo do serviço', quando: 'Toda crise de asma, desde a leve até a grave', obs: 'Spray com espaçador é tão eficaz quanto a nebulização na crise leve e moderada, com menos efeitos adversos, e funciona bem em unidade sem rede de oxigênio.' },
            { medId: 'prednisolona', nome: 'Prednisolona', esquema: '1 a 2 mg/kg/dia VO, máximo de 40 mg ao dia, por 3 a 5 dias', quando: 'Crise moderada e grave, e crise leve que não responde à primeira hora de broncodilatador', obs: 'Administrar precocemente, na primeira hora. Curso curto não exige desmame.' }
          ] },
        { ordem: 2, rotulo: 'Associação na crise moderada e grave', tipo: 'alternativa',
          opcoes: [
            { medId: 'ipratropio', nome: 'Brometo de ipratrópio', esquema: 'Associado ao salbutamol nas três primeiras nebulizações ou doses, conforme protocolo do serviço', quando: 'Crise moderada e grave, na primeira hora de tratamento', obs: 'Benefício demonstrado nas primeiras horas, sem vantagem em manter após a estabilização.' },
            { medId: 'hidrocortisona', nome: 'Hidrocortisona', esquema: '4 a 8 mg/kg/dose IV a cada 6 h, conforme protocolo do serviço', quando: 'Alternativa ao corticoide oral quando há vômitos, rebaixamento de consciência ou crise grave com via oral inviável', obs: 'A via oral é preferida quando a criança tolera, com eficácia equivalente.' },
            { medId: 'metilprednisolona', nome: 'Metilprednisolona', esquema: '1 a 2 mg/kg/dia IV dividida conforme protocolo do serviço', quando: 'Alternativa parenteral ao corticoide na crise grave hospitalizada', obs: '' }
          ] },
        { ordem: 3, rotulo: 'Segunda linha na crise grave refratária', tipo: 'segunda',
          opcoes: [
            { medId: 'sulfato_magnesio', nome: 'Sulfato de magnésio', esquema: '40 a 50 mg/kg IV em 20 a 30 min, máximo de 2 g, dose única', quando: 'Crise grave sem resposta adequada após a primeira hora de broncodilatador e corticoide, em ambiente monitorizado', obs: 'Monitorar pressão arterial e reflexos. Ver também a marcação de uso off-label nesta mesma doença.' },
            { medId: 'adrenalina', nome: 'Adrenalina', esquema: '0,01 mg/kg IM, máximo 0,5 mg por dose', quando: 'Crise gravíssima com risco iminente, anafilaxia associada ou tórax silencioso sem resposta ao inalatório', obs: 'Não substitui o broncodilatador inalatório na crise habitual.' }
          ] },
        { ordem: 4, rotulo: 'Uso off-label', tipo: 'offlabel',
          opcoes: [
            { medId: 'sulfato_magnesio', nome: 'Sulfato de magnésio intravenoso na crise asmática da criança', esquema: '40 a 50 mg/kg IV em 20 a 30 min, máximo de 2 g', quando: 'Crise grave refratária ao tratamento inicial, em unidade com monitorização', obs: 'Off-label: a bula brasileira registra indicações obstétricas e reposição de magnésio, não a crise asmática pediátrica. O uso é recomendado por diretrizes nacionais e internacionais de asma, com evidência de redução de internação na crise grave. Registrar a justificativa em prontuário.' }
          ] },
        { ordem: 5, rotulo: 'Adjuvante e manutenção após a crise', tipo: 'adjuvante',
          opcoes: [
            { medId: null, nome: 'Corticoide inalatório (beclometasona ou budesonida)', esquema: 'Dose conforme faixa etária e gravidade, mantida de forma contínua', quando: 'Início ou reforço do tratamento de manutenção na alta, medida que mais reduz recaída e nova internação', obs: 'Toda criança que teve crise deve sair com plano de manutenção e reavaliação agendada. Confirmar dose conforme protocolo/bula do produto disponível.', verificar: true },
            { medId: null, nome: 'Oxigenoterapia', esquema: 'Para manter saturação igual ou acima de 94%, conforme protocolo do serviço', quando: 'Hipoxemia na crise moderada e grave', obs: '' }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: null, nome: 'Antibiótico na crise de asma', esquema: '', quando: '', obs: 'Não indicado. A maioria das crises tem gatilho viral ou ambiental. Reservar para infecção bacteriana documentada.' },
            { medId: null, nome: 'Xaropes expectorantes, mucolíticos e antitussígenos', esquema: '', quando: '', obs: 'Sem benefício na crise e com risco de piorar a tosse e a broncoconstrição.' },
            { medId: null, nome: 'Sedativos e ansiolíticos na crise', esquema: '', quando: '', obs: 'Contraindicados fora de ambiente com suporte ventilatório, pelo risco de depressão respiratória e de mascarar a exaustão.' },
            { medId: null, nome: 'Aminofilina intravenosa de rotina', esquema: '', quando: '', obs: 'Não recomendada de rotina pela estreita janela terapêutica e pela toxicidade. Restrita a terapia intensiva em casos selecionados.' },
            { medId: 'salbutamol', nome: 'Alta sem plano de manutenção e sem técnica inalatória revista', esquema: '', quando: '', obs: 'Principal causa de retorno ao pronto-socorro. Sempre demonstrar o uso do espaçador e entregar plano de ação por escrito.' }
          ] }
      ],
      naoFarmacologico: [
        'Uso de espaçador com todas as idades, com máscara até cerca de 4 anos, e demonstração prática da técnica.',
        'Plano de ação escrito para a família, adaptado ao letramento e ao acesso da comunidade.',
        'Identificação e controle de gatilhos: fumaça de fogão a lenha, queimadas, mofo, poeira, tabagismo passivo, exposição comum na região amazônica.',
        'Revisão da adesão à medicação de manutenção e do calendário vacinal, incluindo influenza.',
        'Combinar antecipadamente o plano de transporte em comunidade distante, para crises que não respondem em casa.'
      ],
      fontes: [ { nome: 'Sociedade Brasileira de Pediatria - Diretrizes de manejo da asma na infância', ano: 2023 }, { nome: 'Global Initiative for Asthma - Estratégia global para manejo da asma', ano: 2024 } ],
      atualizadoEm: '2026-09'
    },

    infeccao_urinaria: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - tratamento ambulatorial', tipo: 'primeira',
          opcoes: [
            { medId: 'cefalexina', nome: 'Cefalexina', esquema: '50 a 100 mg/kg/dia VO divididos a cada 6 h, por 7 a 10 dias na pielonefrite e 3 a 5 dias na cistite', quando: 'Infecção urinária em criança acima de 3 meses, com boa aceitação oral e sem toxemia', obs: 'Colher urocultura antes de iniciar sempre que possível e ajustar conforme o antibiograma.' },
            { medId: 'amoxicilina_clavulanato', nome: 'Amoxicilina + clavulanato', esquema: '50 mg/kg/dia de amoxicilina VO divididos a cada 8 ou 12 h', quando: 'Alternativa de primeira escolha oral, considerando o perfil local de resistência', obs: 'Resistência de Escherichia coli à amoxicilina isolada é elevada, por isso a associação.' }
          ] },
        { ordem: 2, rotulo: 'Primeira escolha - pielonefrite com toxemia ou lactente pequeno', tipo: 'primeira',
          opcoes: [
            { medId: 'ceftriaxona', nome: 'Ceftriaxona', esquema: '50 a 75 mg/kg/dia IV ou IM a cada 24 h', quando: 'Criança toxemiada, vômitos, menor de 3 meses, ou impossibilidade de via oral', obs: 'A dose única diária permite início em unidade básica ribeirinha e transição oral após melhora. Evitar em recém-nascido com icterícia.' },
            { medId: 'gentamicina', nome: 'Gentamicina', esquema: '5 a 7,5 mg/kg/dia IV a cada 24 h, associada a ampicilina no lactente pequeno', quando: 'Alternativa hospitalar, especialmente em menores de 3 meses, associada a ampicilina', obs: 'Monitorar função renal, evitar em nefropatia.' },
            { medId: 'ampicilina', nome: 'Ampicilina', esquema: '100 a 200 mg/kg/dia IV divididos a cada 6 h', quando: 'Cobertura de Enterococcus no lactente menor de 3 meses, associada a aminoglicosídeo', obs: '' }
          ] },
        { ordem: 3, rotulo: 'Alternativa em alergia a betalactâmico ou a sulfa', tipo: 'alternativa',
          opcoes: [
            { medId: 'sulfametoxazol_trimetoprim', nome: 'Sulfametoxazol + trimetoprima', esquema: '8 a 10 mg de trimetoprima/kg/dia VO divididos a cada 12 h', quando: 'Alternativa em alergia a betalactâmico, guiada por antibiograma, em criança acima de 2 meses', obs: 'Contraindicada em menores de 2 meses e na deficiência de G6PD. Resistência regional pode ser alta, usar preferencialmente com cultura.' },
            { medId: 'nitrofurantoina', nome: 'Nitrofurantoína', esquema: '5 a 7 mg/kg/dia VO divididos a cada 6 h', quando: 'Cistite não complicada em criança acima de 1 mês, e alternativa quando há alergia a sulfa', obs: 'Não serve para pielonefrite, pois não atinge concentração adequada no parênquima renal e no sangue. Contraindicada em menores de 1 mês e na deficiência de G6PD.' },
            { medId: 'gentamicina', nome: 'Gentamicina', esquema: '5 a 7,5 mg/kg/dia IV ou IM a cada 24 h', quando: 'Alergia grave a betalactâmicos e a sulfa, na pielonefrite', obs: 'Monitorar função renal.' }
          ] },
        { ordem: 4, rotulo: 'Segunda linha / falha terapêutica ou germe resistente', tipo: 'segunda',
          opcoes: [
            { medId: null, nome: 'Reajuste guiado por urocultura e antibiograma, com apoio da referência', esquema: '', quando: 'Ausência de melhora em 48 a 72 h, urocultura com germe resistente, ou infecção urinária de repetição', obs: 'Em bactéria produtora de betalactamase de espectro estendido, o esquema deve ser definido com a referência, frequentemente com carbapenêmico hospitalar. Investigar uropatia obstrutiva e refluxo.' },
            { medId: 'ceftriaxona', nome: 'Ceftriaxona', esquema: '50 a 75 mg/kg/dia IV', quando: 'Falha do tratamento oral inicial em criança com pielonefrite', obs: 'Reavaliar aderência, vômitos e dose antes de assumir resistência.' }
          ] },
        { ordem: 5, rotulo: 'Adjuvante / sintomático', tipo: 'adjuvante',
          opcoes: [
            { medId: 'paracetamol', nome: 'Paracetamol', esquema: '10 a 15 mg/kg/dose VO a cada 6 h', quando: 'Febre e dor lombar ou suprapúbica', obs: '' },
            { medId: null, nome: 'Hidratação e higiene perineal', esquema: '', quando: 'Todos os casos', obs: 'Oferta regular de líquidos, tratamento de constipação e de oxiuríase, e orientação de higiene, que reduzem recorrência.' }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: 'nitrofurantoina', nome: 'Nitrofurantoína na pielonefrite ou em menores de 1 mês', esquema: '', quando: '', obs: 'Não atinge concentração tecidual e sérica adequada, e é contraindicada no recém-nascido pelo risco de hemólise.' },
            { medId: null, nome: 'Tratamento de bacteriúria assintomática', esquema: '', quando: '', obs: 'Não indicado em criança sem sintomas e sem uropatia, o tratamento seleciona germes resistentes.' },
            { medId: null, nome: 'Antibiótico guiado por urina colhida em saco coletor', esquema: '', quando: '', obs: 'Alta taxa de contaminação. O saco coletor só serve para afastar o diagnóstico quando negativo. Confirmar com jato médio, cateterismo ou punção suprapúbica antes de tratar.' },
            { medId: null, nome: 'Profilaxia antibiótica contínua de rotina após o primeiro episódio', esquema: '', quando: '', obs: 'Não indicada de rotina. Reservar para casos selecionados com refluxo de alto grau ou recorrência, definidos com nefrologia ou urologia pediátrica.' }
          ] }
      ],
      naoFarmacologico: [
        'Coleta adequada de urina antes do antibiótico, por jato médio na criança com controle esfincteriano ou por cateterismo no lactente.',
        'Ultrassonografia de rins e vias urinárias após o primeiro episódio febril, conforme protocolo do serviço.',
        'Investigação e tratamento de constipação e de disfunção miccional, causas frequentes de recorrência.',
        'Orientação de higiene, hidratação e micção regular, e tratamento de fimose sintomática quando indicado.',
        'Retorno programado com reavaliação clínica e resultado da urocultura, especialmente quando a família mora longe da unidade.'
      ],
      fontes: [ { nome: 'Sociedade Brasileira de Pediatria - Documento científico sobre infecção do trato urinário na infância', ano: 2023 }, { nome: 'OMS - Pocket book of hospital care for children', ano: 2013 } ],
      atualizadoEm: '2026-09'
    },

    meningite: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - antibiótico empírico imediato', tipo: 'primeira',
          opcoes: [
            { medId: 'ceftriaxona', nome: 'Ceftriaxona', esquema: '100 mg/kg/dia IV divididos a cada 12 h, dose máxima conforme protocolo, por 7 a 14 dias segundo o agente', quando: 'Meningite bacteriana a partir de 1 a 3 meses de idade, iniciada na primeira hora do atendimento', obs: 'Não retardar o antibiótico à espera da punção lombar ou da tomografia. Colher hemocultura antes quando isso não atrasar.' },
            { medId: 'ampicilina', nome: 'Ampicilina', esquema: '200 a 400 mg/kg/dia IV divididos a cada 6 h', quando: 'Menor de 1 a 3 meses, associada a cefotaxima ou a aminoglicosídeo, para cobrir Listeria e Enterococcus', obs: '' },
            { medId: 'gentamicina', nome: 'Gentamicina', esquema: '5 a 7,5 mg/kg/dia IV, conforme idade gestacional e pós-natal no lactente pequeno', quando: 'Associada à ampicilina no lactente menor de 1 mês', obs: 'Monitorar função renal.' }
          ] },
        { ordem: 2, rotulo: 'Alternativa em alergia a betalactâmico ou indisponibilidade', tipo: 'alternativa',
          opcoes: [
            { medId: 'cefotaxima', nome: 'Cefotaxima', esquema: '200 a 300 mg/kg/dia IV divididos a cada 6 a 8 h', quando: 'Alternativa à ceftriaxona, preferida no recém-nascido e no lactente com icterícia ou hiperbilirrubinemia', obs: 'A ceftriaxona desloca a bilirrubina da albumina, por isso a cefotaxima é preferida no período neonatal.' },
            { medId: null, nome: 'Esquema alternativo definido com infectologia em alergia grave a betalactâmicos', esquema: '', quando: 'História de anafilaxia a penicilina e a cefalosporina', obs: 'Combinações com cloranfenicol, vancomicina ou meropenem são opções descritas, mas a escolha deve ser individualizada com a referência. Confirmar conforme protocolo.', verificar: true }
          ] },
        { ordem: 3, rotulo: 'Segunda linha / suspeita de pneumococo resistente ou falha', tipo: 'segunda',
          opcoes: [
            { medId: 'vancomicina', nome: 'Vancomicina', esquema: '60 mg/kg/dia IV divididos a cada 6 h, associada à ceftriaxona', quando: 'Suspeita ou confirmação de pneumococo com sensibilidade reduzida às cefalosporinas, ou ausência de melhora com esquema inicial', obs: 'Monitorar função renal e nível sérico quando disponível.' },
            { medId: null, nome: 'Repetir a punção lombar e discutir com a referência', esquema: '', quando: 'Ausência de melhora clínica em 48 a 72 h, ou agente incomum', obs: 'Investigar complicações: empiema subdural, abscesso, ventriculite, trombose venosa. Considerar neuroimagem.' }
          ] },
        { ordem: 4, rotulo: 'Adjuvante - corticoide e controle de convulsões', tipo: 'adjuvante',
          opcoes: [
            { medId: 'dexametasona', nome: 'Dexametasona', esquema: '0,15 mg/kg/dose IV a cada 6 h por 2 a 4 dias, iniciada antes ou junto com a primeira dose do antibiótico', quando: 'Avaliar em meningite por Haemophilus influenzae b, e conforme protocolo do serviço em meningite pneumocócica, para reduzir sequela auditiva', obs: 'Benefício maior quando iniciada antes do antibiótico. Não iniciar tardiamente. Não indicada em meningite meningocócica nem no recém-nascido.' },
            { medId: 'diazepam', nome: 'Diazepam', esquema: '0,2 a 0,3 mg/kg/dose IV lenta, ou 0,5 mg/kg por via retal quando não há acesso venoso', quando: 'Convulsão em curso', obs: 'A via retal é alternativa prática em unidade de comunidade sem acesso venoso imediato.' },
            { medId: 'midazolam', nome: 'Midazolam', esquema: 'Dose conforme protocolo do serviço, por via IV, IM, nasal ou bucal', quando: 'Alternativa ao diazepam para a crise convulsiva, útil quando não há acesso venoso', obs: 'Monitorar respiração.' },
            { medId: 'fenitoina', nome: 'Fenitoína', esquema: 'Ataque de 20 mg/kg IV em infusão lenta, com monitorização cardíaca', quando: 'Crise que persiste após duas doses de benzodiazepínico', obs: 'Não administrar em bolus rápido pelo risco de arritmia e de hipotensão.' },
            { medId: 'fenobarbital', nome: 'Fenobarbital', esquema: 'Ataque de 20 mg/kg IV', quando: 'Alternativa à fenitoína, e de escolha no recém-nascido', obs: 'Risco de depressão respiratória, ter suporte ventilatório disponível.' }
          ] },
        { ordem: 5, rotulo: 'Quimioprofilaxia dos contatos', tipo: 'adjuvante',
          opcoes: [
            { medId: 'rifampicina', nome: 'Rifampicina', esquema: 'Meningococo: 10 mg/kg a cada 12 h por 2 dias, e 5 mg/kg a cada 12 h em menores de 1 mês. Haemophilus influenzae b: 20 mg/kg/dia por 4 dias. Máximo de 600 mg por dose', quando: 'Contatos domiciliares e íntimos de doença meningocócica, e contatos de Haemophilus influenzae b conforme os critérios da vigilância', obs: 'Orientar a coloração alaranjada de urina e de secreções. Iniciar o mais precocemente possível, idealmente em até 48 h.' },
            { medId: 'ceftriaxona', nome: 'Ceftriaxona', esquema: 'Dose única IM, conforme idade e protocolo da vigilância', quando: 'Alternativa de quimioprofilaxia quando a rifampicina não é adequada ou não está disponível na comunidade', obs: 'Confirmar dose conforme protocolo da vigilância epidemiológica.', verificar: true }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: null, nome: 'Atrasar o antibiótico para realizar punção lombar ou tomografia', esquema: '', quando: '', obs: 'Erro grave, cada hora de atraso aumenta a mortalidade e a sequela. Colher hemocultura e iniciar o antibiótico, a punção pode ser feita depois.' },
            { medId: 'dexametasona', nome: 'Dexametasona iniciada após várias horas de antibiótico', esquema: '', quando: '', obs: 'Sem benefício quando iniciada tardiamente. Também não é recomendada no recém-nascido nem na meningite meningocócica.' },
            { medId: 'soro_fisiologico', nome: 'Restrição hídrica rotineira', esquema: '', quando: '', obs: 'Prática antiga sem respaldo. A conduta atual é manter euvolemia e perfusão cerebral adequadas, corrigindo a hipovolemia, com atenção ao sódio.' },
            { medId: null, nome: 'Quimioprofilaxia de contatos escolares sem indicação da vigilância', esquema: '', quando: '', obs: 'A indicação depende do agente e do tipo de contato. Seguir a orientação da vigilância epidemiológica, para evitar uso desnecessário.' }
          ] }
      ],
      naoFarmacologico: [
        'Notificação compulsória imediata e comunicação à vigilância epidemiológica para bloqueio de contatos.',
        'Isolamento respiratório por gotículas nas primeiras 24 h de antibiótico na suspeita de meningococo.',
        'Monitorização neurológica, de sinais de hipertensão intracraniana, de sódio e de glicemia.',
        'Triagem auditiva antes da alta em toda criança com meningite bacteriana.',
        'Revisão e atualização do calendário vacinal do caso e dos contatos, meningocócica, pneumocócica e Haemophilus influenzae b.'
      ],
      fontes: [ { nome: 'Ministério da Saúde - Guia de vigilância em saúde, meningites', ano: 2023 }, { nome: 'Sociedade Brasileira de Pediatria - Documento científico sobre meningites bacterianas', ano: 2022 } ],
      atualizadoEm: '2026-09'
    },

    sepse: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - primeira hora', tipo: 'primeira',
          opcoes: [
            { medId: 'soro_fisiologico', nome: 'Soro fisiológico 0,9%', esquema: 'Bolus de 10 a 20 mL/kg IV em 5 a 20 min, reavaliando após cada alíquota, até 40 a 60 mL/kg na primeira hora quando há resposta e não há sinais de sobrecarga', quando: 'Choque séptico ou hipoperfusão', obs: 'Reavaliar entre os bolus buscando hepatomegalia, estertores e piora respiratória. Em contexto sem terapia intensiva, ser mais cauteloso com grandes volumes.' },
            { medId: 'ringer_lactato', nome: 'Ringer lactato', esquema: 'Mesmos volumes do soro fisiológico', quando: 'Alternativa preferida quando se antecipa necessidade de grandes volumes, pelo menor risco de acidose hiperclorêmica', obs: '' },
            { medId: 'ceftriaxona', nome: 'Ceftriaxona', esquema: '100 mg/kg/dia IV, primeira dose na primeira hora, conforme protocolo', quando: 'Antibiótico empírico de amplo espectro na sepse comunitária a partir de 1 a 3 meses', obs: 'Colher hemocultura antes quando isso não atrasar a administração. O antibiótico na primeira hora é a medida com maior impacto na mortalidade.' }
          ] },
        { ordem: 2, rotulo: 'Ampliação do espectro conforme o foco suspeito', tipo: 'alternativa',
          opcoes: [
            { medId: 'oxacilina', nome: 'Oxacilina', esquema: '100 a 200 mg/kg/dia IV divididos a cada 6 h', quando: 'Suspeita de foco cutâneo, osteoarticular ou pneumonia necrotizante por Staphylococcus aureus sensível', obs: '' },
            { medId: 'vancomicina', nome: 'Vancomicina', esquema: '40 a 60 mg/kg/dia IV divididos a cada 6 a 8 h', quando: 'Suspeita de Staphylococcus aureus resistente à meticilina, infecção de cateter ou sepse hospitalar', obs: 'Monitorar função renal e nível sérico quando disponível.' },
            { medId: 'metronidazol', nome: 'Metronidazol', esquema: '30 mg/kg/dia IV divididos a cada 8 h', quando: 'Foco abdominal ou suspeita de anaeróbios', obs: '' },
            { medId: 'ampicilina', nome: 'Ampicilina', esquema: '200 a 400 mg/kg/dia IV divididos a cada 6 h, associada a gentamicina', quando: 'Lactente menor de 1 a 3 meses, para cobrir Listeria e Enterococcus', obs: '' },
            { medId: 'gentamicina', nome: 'Gentamicina', esquema: '5 a 7,5 mg/kg/dia IV', quando: 'Associada ao betalactâmico no lactente pequeno e em suspeita de foco urinário', obs: '' }
          ] },
        { ordem: 3, rotulo: 'Situação regional - sepse com suspeita de malária grave', tipo: 'primeira',
          opcoes: [
            { medId: 'artesunato', nome: 'Artesunato endovenoso', esquema: '3 mg/kg/dose IV se peso abaixo de 20 kg e 2,4 mg/kg/dose se peso igual ou acima de 20 kg, nos tempos 0, 12 e 24 h', quando: 'Criança gravemente enferma em área endêmica do Amazonas com gota espessa ou teste rápido positivo, ou com alta suspeita clínica sem possibilidade imediata de exame', obs: 'Malária grave e sepse bacteriana coexistem com frequência, considerar tratar ambas na criança gravemente enferma.' }
          ] },
        { ordem: 4, rotulo: 'Segunda linha - choque refratário a volume', tipo: 'segunda',
          opcoes: [
            { medId: 'adrenalina', nome: 'Adrenalina', esquema: 'Infusão contínua iniciada em 0,05 a 0,1 mcg/kg/min, titulada conforme resposta, conforme protocolo do serviço', quando: 'Choque que persiste após 40 a 60 mL/kg de volume, preferencialmente no choque frio da criança', obs: 'Pode ser iniciada em veia periférica bem posicionada ou em acesso intraósseo enquanto se obtém acesso central, medida importante em unidade sem terapia intensiva.' },
            { medId: 'hidrocortisona', nome: 'Hidrocortisona', esquema: '1 a 2 mg/kg/dose IV a cada 6 h, ou conforme protocolo do serviço', quando: 'Choque resistente a catecolaminas, ou suspeita de insuficiência adrenal, como em uso crônico de corticoide ou púrpura fulminante', obs: 'Não indicada em toda sepse, apenas no choque refratário.' },
            { medId: 'glicose', nome: 'Glicose', esquema: 'Glicose a 10% 2 a 5 mL/kg IV na hipoglicemia, seguida de infusão de manutenção', quando: 'Hipoglicemia, frequente no lactente com sepse e na malária grave', obs: 'Checar glicemia capilar em toda criança gravemente enferma.' }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: null, nome: 'Atrasar o antibiótico à espera de exames ou de transferência', esquema: '', quando: '', obs: 'A primeira dose deve ser dada na unidade onde a criança está, inclusive em unidade básica ribeirinha, antes do transporte.' },
            { medId: 'hidrocortisona', nome: 'Corticoide de rotina em toda sepse', esquema: '', quando: '', obs: 'Sem benefício demonstrado fora do choque refratário a catecolaminas ou da insuficiência adrenal.' },
            { medId: null, nome: 'Coloides e amido hidroxietílico para expansão', esquema: '', quando: '', obs: 'Amido está associado a maior mortalidade e lesão renal. A expansão inicial é com cristaloide.' },
            { medId: null, nome: 'Bicarbonato de sódio de rotina na acidose do choque', esquema: '', quando: '', obs: 'Sem benefício demonstrado e com riscos. O tratamento da acidose é a restauração da perfusão.' },
            { medId: null, nome: 'Antitérmico como única resposta à febre na criança toxemiada', esquema: '', quando: '', obs: 'Erro frequente. Avaliar perfusão, consciência, frequência respiratória e cardíaca, a febre isolada não exclui sepse.' }
          ] }
      ],
      naoFarmacologico: [
        'Reconhecimento precoce por triagem com sinais de alarme, tempo de enchimento capilar, nível de consciência e frequências.',
        'Acesso venoso em até 5 min ou acesso intraósseo, sem hesitar, também na unidade de comunidade.',
        'Oxigenoterapia e monitorização contínua, com glicemia capilar imediata.',
        'Controle do foco: drenagem de abscesso, remoção de cateter infectado, desbridamento quando indicado.',
        'Comunicação precoce com a central de regulação e plano de transporte aéreo ou fluvial, informando a hora da primeira dose de antibiótico.'
      ],
      fontes: [ { nome: 'Sociedade Brasileira de Pediatria - Documento científico sobre sepse em pediatria', ano: 2023 }, { nome: 'Surviving Sepsis Campaign - Diretrizes pediátricas internacionais', ano: 2020 } ],
      atualizadoEm: '2026-09'
    },

    doenca_diarreica: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - reidratação e zinco', tipo: 'primeira',
          opcoes: [
            { medId: 'sais_reidratacao_oral', nome: 'Sais de reidratação oral de osmolaridade reduzida', esquema: 'Plano A, manutenção com 50 a 100 mL após cada evacuação em menores de 2 anos e 100 a 200 mL nos maiores. Plano B, 50 a 100 mL/kg em 4 a 6 h na unidade de saúde', quando: 'Diarreia sem desidratação (plano A) e com desidratação leve a moderada (plano B)', obs: 'Base do tratamento, reduz mortalidade. Ofertar em pequenos volumes e com frequência, mesmo se houver vômito.' },
            { medId: 'zinco', nome: 'Zinco', esquema: '10 mg/dia VO em menores de 6 meses e 20 mg/dia a partir de 6 meses, por 10 a 14 dias', quando: 'Toda criança menor de 5 anos com diarreia aguda', obs: 'Reduz a duração e a gravidade do episódio e a incidência nos meses seguintes. Frequentemente esquecido na prescrição.' }
          ] },
        { ordem: 2, rotulo: 'Primeira escolha - desidratação grave (plano C)', tipo: 'primeira',
          opcoes: [
            { medId: 'ringer_lactato', nome: 'Ringer lactato', esquema: 'Menores de 1 ano: 30 mL/kg em 1 h e depois 70 mL/kg em 5 h. Maiores de 1 ano: 30 mL/kg em 30 min e depois 70 mL/kg em 2 h e 30 min', quando: 'Desidratação grave, choque hipovolêmico ou incapacidade de reidratação oral', obs: 'Solução preferida no plano C. Reavaliar a cada 15 a 30 min e iniciar sais de reidratação oral assim que a criança puder beber.' },
            { medId: 'soro_fisiologico', nome: 'Soro fisiológico 0,9%', esquema: 'Mesmos volumes do plano C', quando: 'Alternativa quando o Ringer lactato não está disponível na unidade, situação comum em comunidade ribeirinha', obs: 'Atenção à acidose hiperclorêmica com grandes volumes.' }
          ] },
        { ordem: 3, rotulo: 'Antibiótico apenas em situações selecionadas', tipo: 'alternativa',
          opcoes: [
            { medId: 'azitromicina', nome: 'Azitromicina', esquema: '10 mg/kg/dia VO por 3 dias, ou conforme protocolo do serviço', quando: 'Disenteria com sangue e febre, suspeita de Shigella, e suspeita de cólera grave conforme orientação da vigilância', obs: 'Escolha atual na disenteria pela resistência crescente a outros fármacos.' },
            { medId: 'ceftriaxona', nome: 'Ceftriaxona', esquema: '50 a 75 mg/kg/dia IV ou IM', quando: 'Disenteria em criança toxemiada, lactente pequeno, desnutrido grave ou com suspeita de bacteremia', obs: '' },
            { medId: 'metronidazol', nome: 'Metronidazol', esquema: '30 a 50 mg/kg/dia VO divididos a cada 8 h por 5 a 10 dias, conforme o agente', quando: 'Amebíase invasiva ou giardíase confirmadas ou fortemente suspeitadas, diagnósticos frequentes na região', obs: '' },
            { medId: 'nitazoxanida', nome: 'Nitazoxanida', esquema: '7,5 mg/kg/dose VO a cada 12 h por 3 dias, conforme faixa etária da bula', quando: 'Alternativa em giardíase, criptosporidíase e diarreia persistente com parasitas identificados', obs: 'Confirmar idade mínima e apresentação conforme a bula.', verificar: true }
          ] },
        { ordem: 4, rotulo: 'Uso off-label', tipo: 'offlabel',
          opcoes: [
            { medId: 'ondansetrona', nome: 'Ondansetrona em vômitos da gastroenterite aguda', esquema: 'Dose única VO de 2 mg entre 8 e 15 kg e 4 mg acima de 15 kg, ou 0,15 mg/kg/dose, conforme protocolo do serviço', quando: 'Vômitos que impedem a reidratação oral e levariam a hidratação venosa ou internação, em criança acima de 6 meses', obs: 'Off-label: a bula registra náusea e vômito associados a quimioterapia, radioterapia e pós-operatório. O uso na gastroenterite tem apoio de ensaios clínicos e de revisões sistemáticas que mostram aumento do sucesso da reidratação oral e redução de hidratação venosa. Dose única, não prolongar. Atenção ao intervalo QT e à possível diarreia como efeito adverso.' }
          ] },
        { ordem: 5, rotulo: 'Adjuvante / suporte', tipo: 'adjuvante',
          opcoes: [
            { medId: 'glicose', nome: 'Glicose', esquema: 'Glicose a 10% 2 a 5 mL/kg IV na hipoglicemia documentada', quando: 'Hipoglicemia, mais comum em desnutrido e em lactente com recusa alimentar prolongada', obs: '' },
            { medId: null, nome: 'Manutenção da alimentação e do aleitamento', esquema: '', quando: 'Todos os casos', obs: 'Não suspender o leite materno nem jejuar. A realimentação precoce reduz a duração da diarreia.' }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: null, nome: 'Antidiarreicos e antiespasmódicos em criança (loperamida, difenoxilato, escopolamina)', esquema: '', quando: '', obs: 'Contraindicados na criança. Risco de íleo paralítico, distensão abdominal, sonolência, depressão respiratória e mascaramento da perda de líquidos. A loperamida está associada a eventos graves e a óbito em lactentes.' },
            { medId: null, nome: 'Antibiótico de rotina na diarreia aquosa aguda', esquema: '', quando: '', obs: 'A maioria é viral, especialmente rotavírus e norovírus. O antibiótico não encurta o quadro e aumenta a resistência e o risco de síndrome hemolítico-urêmica em infecção por Escherichia coli produtora de toxina Shiga.' },
            { medId: null, nome: 'Refrigerante, suco industrializado e soro caseiro mal preparado como reidratação', esquema: '', quando: '', obs: 'Osmolaridade e composição inadequadas, podem piorar a diarreia e causar distúrbio de sódio. Orientar o preparo correto do sal de reidratação oral com água tratada ou fervida.' },
            { medId: null, nome: 'Jejum e diluição do leite', esquema: '', quando: '', obs: 'Prática antiga e prejudicial. Manter alimentação habitual e aleitamento materno.' },
            { medId: null, nome: 'Antiemético de uso contínuo por vários dias', esquema: '', quando: '', obs: 'Não indicado, o objetivo é viabilizar a reidratação oral, não suprimir o sintoma de forma prolongada.' }
          ] }
      ],
      naoFarmacologico: [
        'Classificação do estado de hidratação em planos A, B e C a cada avaliação.',
        'Orientação prática do preparo do sal de reidratação oral com água segura, e entrega de envelopes suficientes para a família em comunidade distante.',
        'Manutenção do aleitamento materno e realimentação precoce com alimentos habituais.',
        'Orientar sinais de alarme: sede intensa, olhos fundos, letargia, redução da diurese, sangue nas fezes, vômitos incoercíveis.',
        'Revisão da vacinação contra rotavírus, higiene das mãos, saneamento e cuidado com a água de igarapé e de poço.'
      ],
      fontes: [ { nome: 'Ministério da Saúde - Manejo da criança com diarreia e desidratação, AIDPI', ano: 2023 }, { nome: 'OMS/UNICEF - Diarrhoea treatment guidelines', ano: 2013 } ],
      atualizadoEm: '2026-09'
    },

    parasitoses_intestinais: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - helmintíases', tipo: 'primeira',
          opcoes: [
            { medId: 'albendazol', nome: 'Albendazol', esquema: '400 mg VO em dose única para criança a partir de 2 anos, e 200 mg entre 1 e 2 anos, repetindo em 2 a 3 semanas na enterobíase. Na estrongiloidíase, 400 mg/dia por 3 dias', quando: 'Ascaridíase, ancilostomíase, tricuríase, enterobíase e estrongiloidíase, e em tratamento coletivo periódico onde indicado', obs: 'Muito usado em quimioterapia preventiva em áreas de alta prevalência, como comunidades ribeirinhas e indígenas.' },
            { medId: 'mebendazol', nome: 'Mebendazol', esquema: '100 mg VO a cada 12 h por 3 dias, ou 500 mg em dose única', quando: 'Alternativa de igual eficácia para os principais helmintos intestinais, útil quando o albendazol não está disponível', obs: 'Menos eficaz na estrongiloidíase.' }
          ] },
        { ordem: 2, rotulo: 'Primeira escolha - protozooses', tipo: 'primeira',
          opcoes: [
            { medId: 'metronidazol', nome: 'Metronidazol', esquema: 'Giardíase: 15 mg/kg/dia VO divididos a cada 8 h por 5 a 7 dias. Amebíase intestinal: 30 a 50 mg/kg/dia divididos a cada 8 h por 7 a 10 dias', quando: 'Giardíase e amebíase confirmadas ou com forte suspeita clínica e epidemiológica', obs: 'Orientar sobre gosto metálico e náusea, causas frequentes de abandono.' }
          ] },
        { ordem: 3, rotulo: 'Alternativa quando há intolerância ou falha', tipo: 'alternativa',
          opcoes: [
            { medId: 'nitazoxanida', nome: 'Nitazoxanida', esquema: '7,5 mg/kg/dose VO a cada 12 h por 3 dias, conforme faixa etária da bula', quando: 'Alternativa em giardíase, criptosporidíase e em intolerância ao metronidazol', obs: 'Confirmar idade mínima e apresentação conforme a bula.', verificar: true },
            { medId: 'ivermectina', nome: 'Ivermectina', esquema: '200 mcg/kg VO em dose única, repetida conforme a indicação, em criança acima de 15 kg', quando: 'Estrongiloidíase, e alternativa em escabiose associada, situação comum na mesma criança', obs: 'Primeira escolha na estrongiloidíase disseminada e antes de corticoterapia prolongada em área endêmica.' },
            { medId: 'praziquantel', nome: 'Praziquantel', esquema: 'Teníase: 5 a 10 mg/kg VO em dose única. Himenolepíase: 25 mg/kg em dose única, conforme protocolo', quando: 'Teníase, himenolepíase e esquistossomose conforme a situação epidemiológica', obs: 'Confirmar dose conforme o agente e o protocolo vigente.', verificar: true }
          ] },
        { ordem: 4, rotulo: 'Uso off-label', tipo: 'offlabel',
          opcoes: [
            { medId: 'ivermectina', nome: 'Ivermectina em criança abaixo de 15 kg', esquema: '200 mcg/kg VO em dose única, com cálculo cuidadoso do peso', quando: 'Estrongiloidíase ou escabiose em criança abaixo de 15 kg quando as alternativas falharam ou não estão disponíveis, com avaliação individual', obs: 'Off-label: a bula restringe o uso a crianças acima de 15 kg, por ausência de estudos formais nessa faixa, e não por toxicidade demonstrada. Séries de casos e revisões sistemáticas sugerem perfil de segurança semelhante. Registrar a justificativa, discutir com a referência e confirmar conforme protocolo/bula.', verificar: true },
            { medId: 'albendazol', nome: 'Albendazol em criança abaixo de 1 ano', esquema: '200 mg VO em dose única, conforme orientação da referência', quando: 'Helmintíase sintomática em lactente abaixo de 1 ano, em área de alta carga parasitária', obs: 'Off-label abaixo de 1 ano no Brasil. A OMS admite o uso em campanhas a partir de 12 meses e descreve experiência em lactentes menores em contextos selecionados. Avaliar risco-benefício individual. Confirmar conforme protocolo/bula.', verificar: true }
          ] },
        { ordem: 5, rotulo: 'Adjuvante', tipo: 'adjuvante',
          opcoes: [
            { medId: 'sulfato_ferroso', nome: 'Sulfato ferroso', esquema: '3 a 5 mg de ferro elementar/kg/dia VO por 3 a 6 meses', quando: 'Anemia associada a ancilostomíase ou a parasitose crônica', obs: 'Tratar o parasita e a anemia, a reposição isolada não resolve a perda contínua.' },
            { medId: null, nome: 'Tratamento simultâneo dos conviventes', esquema: '', quando: 'Enterobíase e escabiose, em que a reinfecção familiar é a regra', obs: 'Tratar todos os moradores da casa e higienizar roupas de cama e de uso pessoal.' }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: null, nome: 'Antiparasitário empírico repetido sem avaliação clínica', esquema: '', quando: '', obs: 'O tratamento periódico em massa segue critérios da vigilância. Fora disso, evitar cursos repetidos sem sintomas nem exame, o que gera custo e resistência.' },
            { medId: 'ivermectina', nome: 'Ivermectina como antiviral ou para outras indicações sem evidência', esquema: '', quando: '', obs: 'Não há evidência que sustente uso antiviral. Restringir às indicações parasitárias aprovadas.' },
            { medId: null, nome: 'Purgantes, laxantes e chás vermífugos caseiros', esquema: '', quando: '', obs: 'Práticas comuns na comunidade, sem eficácia comprovada e com risco de desidratação e de intoxicação, especialmente em lactentes.' },
            { medId: 'albendazol', nome: 'Antiparasitário isolado na estrongiloidíase grave do imunossuprimido', esquema: '', quando: '', obs: 'Nessa situação a ivermectina é a escolha e o caso deve ser conduzido com a referência, pelo risco de hiperinfecção.' }
          ] }
      ],
      naoFarmacologico: [
        'Exame parasitológico de fezes quando disponível, com amostras seriadas, sobretudo antes de corticoterapia.',
        'Saneamento, destino adequado de dejetos, calçado fechado e água tratada ou fervida.',
        'Higiene das mãos e das unhas, e higienização de roupas de cama na enterobíase.',
        'Tratamento simultâneo de conviventes nas parasitoses de transmissão domiciliar.',
        'Avaliação nutricional e de anemia, e acompanhamento do crescimento na parasitose crônica.'
      ],
      fontes: [ { nome: 'Ministério da Saúde - Guia prático de tratamento das parasitoses intestinais', ano: 2022 }, { nome: 'OMS - Preventive chemotherapy for soil-transmitted helminthiases', ano: 2022 } ],
      atualizadoEm: '2026-09'
    },
    escabiose_impetigo: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - escabiose', tipo: 'primeira',
          opcoes: [
            { medId: 'permetrina', nome: 'Permetrina 5% loção ou creme', esquema: 'Aplicar em todo o corpo do pescoço para baixo, e também no couro cabeludo e na face em lactentes, deixar por 8 a 12 h e lavar. Repetir em 7 dias. A partir de 2 meses de idade', quando: 'Escabiose em qualquer faixa etária a partir de 2 meses, incluindo lactentes', obs: 'Tratar simultaneamente todos os moradores da casa, mesmo assintomáticos, e lavar roupas de cama e de uso pessoal.' },
            { medId: 'ivermectina', nome: 'Ivermectina', esquema: '200 mcg/kg VO em dose única, repetida em 7 a 14 dias, em criança acima de 15 kg', quando: 'Escabiose extensa, crostosa, em surto familiar ou comunitário, e quando a aplicação tópica é inviável', obs: 'Muito útil em surtos em comunidade indígena ou ribeirinha e em instituições, pela facilidade de administração supervisionada.' }
          ] },
        { ordem: 2, rotulo: 'Primeira escolha - impetigo', tipo: 'primeira',
          opcoes: [
            { medId: null, nome: 'Mupirocina 2% pomada', esquema: 'Aplicar a cada 8 h por 5 a 7 dias nas lesões, após limpeza com água e sabão', quando: 'Impetigo localizado, com poucas lesões e sem sinais sistêmicos', obs: 'O tópico isolado costuma ser suficiente no impetigo limitado. Confirmar disponibilidade e apresentação conforme protocolo/bula.', verificar: true },
            { medId: 'cefalexina', nome: 'Cefalexina', esquema: '50 mg/kg/dia VO divididos a cada 6 h por 7 dias', quando: 'Impetigo extenso, múltiplas lesões, lesões em várias regiões, ou falha do tratamento tópico', obs: 'Cobre Staphylococcus aureus e Streptococcus pyogenes, agentes habituais.' }
          ] },
        { ordem: 3, rotulo: 'Alternativa em alergia a penicilina ou a cefalosporina', tipo: 'alternativa',
          opcoes: [
            { medId: 'azitromicina', nome: 'Azitromicina', esquema: '10 mg/kg/dia VO por 3 a 5 dias', quando: 'Alergia grave a betalactâmicos no impetigo extenso', obs: 'Atenção à resistência crescente do estafilococo a macrolídeos.' },
            { medId: 'sulfametoxazol_trimetoprim', nome: 'Sulfametoxazol + trimetoprima', esquema: '8 a 10 mg de trimetoprima/kg/dia VO divididos a cada 12 h por 7 dias', quando: 'Alternativa quando há suspeita de Staphylococcus aureus resistente à meticilina de origem comunitária, ou alergia a betalactâmicos', obs: 'Contraindicado em menores de 2 meses e na deficiência de G6PD. Cobertura fraca para Streptococcus pyogenes.' },
            { medId: 'amoxicilina_clavulanato', nome: 'Amoxicilina + clavulanato', esquema: '50 mg/kg/dia de amoxicilina VO divididos a cada 8 ou 12 h', quando: 'Alternativa ao tratamento oral do impetigo, e opção quando há celulite associada', obs: 'Não usar em alergia a penicilina.' }
          ] },
        { ordem: 4, rotulo: 'Segunda linha - complicação ou falha', tipo: 'segunda',
          opcoes: [
            { medId: 'oxacilina', nome: 'Oxacilina', esquema: '100 a 200 mg/kg/dia IV divididos a cada 6 h', quando: 'Celulite extensa, abscesso com repercussão sistêmica ou criança toxemiada', obs: 'Drenagem do abscesso é parte essencial do tratamento.' },
            { medId: 'penicilina_benzatina', nome: 'Penicilina G benzatina', esquema: '600.000 UI IM em dose única se peso abaixo de 27 kg, e 1.200.000 UI se peso igual ou acima, conforme protocolo', quando: 'Alternativa em criança com baixa adesão ao esquema oral, ou piodermite estreptocócica em comunidade distante com retorno difícil', obs: 'Dose única supervisionada resolve o problema da adesão em área remota. Não cobre estafilococo resistente.' }
          ] },
        { ordem: 5, rotulo: 'Uso off-label', tipo: 'offlabel',
          opcoes: [
            { medId: 'ivermectina', nome: 'Ivermectina em criança abaixo de 15 kg', esquema: '200 mcg/kg VO em dose única, repetida em 7 a 14 dias, com cálculo cuidadoso do peso', quando: 'Escabiose crostosa, surto comunitário ou falha do tratamento tópico em criança abaixo de 15 kg, com avaliação individual', obs: 'Off-label: a bula restringe a criança acima de 15 kg, por ausência de estudos formais nessa faixa e não por toxicidade demonstrada. Revisões sistemáticas e séries em manejo de surtos sugerem segurança semelhante. Registrar a justificativa, preferir o tópico quando ele for viável e confirmar conforme protocolo/bula.', verificar: true },
            { medId: 'permetrina', nome: 'Permetrina tópica em menores de 2 meses', esquema: 'Aplicação conforme a orientação da referência', quando: 'Escabiose no lactente muito pequeno, quando não há alternativa segura disponível', obs: 'Off-label abaixo de 2 meses no Brasil. Alguns protocolos internacionais descrevem uso com tempo de contato reduzido nessa faixa. Discutir com dermatologia ou com a referência antes de prescrever. Confirmar conforme protocolo/bula.', verificar: true }
          ] },
        { ordem: 6, rotulo: 'Adjuvante / sintomático', tipo: 'adjuvante',
          opcoes: [
            { medId: null, nome: 'Anti-histamínico oral (dexclorfeniramina ou loratadina)', esquema: 'Dose conforme idade e peso da bula do produto disponível', quando: 'Prurido intenso da escabiose, que pode persistir por 2 a 4 semanas após o tratamento eficaz', obs: 'Explicar à família que o prurido residual não significa falha do tratamento. Confirmar conforme protocolo/bula.', verificar: true },
            { medId: null, nome: 'Limpeza das lesões e cuidados com a pele', esquema: '', quando: 'Impetigo e escabiose escoriada', obs: 'Água e sabão, remoção suave das crostas, corte das unhas e hidratação da pele.' }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: null, nome: 'Enxofre, querosene, óleo queimado e outras preparações caseiras', esquema: '', quando: '', obs: 'Práticas frequentes na comunidade, causam dermatite de contato, queimadura química e infecção secundária. Orientar ativamente contra.' },
            { medId: null, nome: 'Corticoide tópico isolado no prurido antes de tratar a escabiose', esquema: '', quando: '', obs: 'Mascara o quadro, favorece a escabiose crostosa e atrasa o diagnóstico.' },
            { medId: null, nome: 'Tratar apenas a criança sem tratar os conviventes', esquema: '', quando: '', obs: 'Principal causa de recidiva. Tratar todos os moradores no mesmo dia.' },
            { medId: null, nome: 'Antibiótico sistêmico para impetigo com poucas lesões', esquema: '', quando: '', obs: 'O tratamento tópico é suficiente e reduz exposição desnecessária. Reservar o oral para lesões extensas, sistêmicas ou refratárias.' }
          ] }
      ],
      naoFarmacologico: [
        'Tratamento simultâneo de todos os moradores do domicílio na escabiose, no mesmo dia.',
        'Lavagem de roupas de cama, toalhas e roupas de uso pessoal com água quente, ou vedação em saco plástico por 3 a 7 dias quando não há como lavar.',
        'Busca ativa e abordagem coletiva em surtos em comunidade indígena, ribeirinha, creche e instituição.',
        'Vigilância de complicações do impetigo estreptocócico, sobretudo glomerulonefrite pós-estreptocócica, com controle de pressão arterial e de urina.',
        'Corte de unhas, higiene das mãos e cuidado com a pele para reduzir a autoinoculação.'
      ],
      fontes: [ { nome: 'Ministério da Saúde - Dermatologia na atenção básica', ano: 2022 }, { nome: 'OMS - Ectoparasites, scabies control guidelines', ano: 2020 } ],
      atualizadoEm: '2026-09'
    },

    anemia_ferropriva: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - tratamento', tipo: 'primeira',
          opcoes: [
            { medId: 'sulfato_ferroso', nome: 'Sulfato ferroso', esquema: '3 a 5 mg de ferro elementar/kg/dia VO, em 1 a 2 tomadas, por 3 a 6 meses, mantendo por pelo menos 2 a 3 meses após a normalização da hemoglobina', quando: 'Anemia ferropriva confirmada ou fortemente suspeitada em criança', obs: 'Preferir tomada longe das refeições e do leite, associada a fonte de vitamina C quando possível. Orientar sobre escurecimento das fezes e possível desconforto gástrico.' }
          ] },
        { ordem: 2, rotulo: 'Profilaxia e situações associadas', tipo: 'primeira',
          opcoes: [
            { medId: 'sulfato_ferroso', nome: 'Sulfato ferroso profilático', esquema: '1 a 2 mg de ferro elementar/kg/dia VO, conforme idade, prematuridade e recomendação do programa nacional de suplementação', quando: 'Lactentes a partir de 3 a 6 meses, prematuros e crianças de baixo peso ao nascer, conforme a recomendação vigente', obs: 'Confirmar o esquema conforme o programa nacional de suplementação de ferro e a faixa etária.', verificar: true },
            { medId: 'albendazol', nome: 'Albendazol', esquema: '400 mg VO em dose única a partir de 2 anos, conforme indicação', quando: 'Anemia em área de alta prevalência de ancilostomíase, onde a perda sanguínea intestinal é causa frequente', obs: 'Tratar o helminto junto com a reposição, a suplementação isolada não corrige a perda contínua.' },
            { medId: 'vitamina_a', nome: 'Vitamina A', esquema: 'Dose conforme faixa etária do programa nacional de suplementação', quando: 'Criança com carências múltiplas em área de insegurança alimentar, conforme o programa vigente', obs: 'A deficiência de vitamina A contribui para anemia em populações vulneráveis. Confirmar dose conforme o programa.', verificar: true }
          ] },
        { ordem: 3, rotulo: 'Uso off-label', tipo: 'offlabel',
          opcoes: [
            { medId: 'sulfato_ferroso', nome: 'Ferro oral em dias alternados ou em dose única diária', esquema: 'Dose diária equivalente administrada em dias alternados, conforme protocolo do serviço', quando: 'Avaliar quando há má tolerância gastrointestinal ou baixa adesão ao esquema fracionado', obs: 'Off-label quanto ao intervalo: a bula prevê tomadas diárias. Estudos de cinética da hepcidina mostram maior absorção fracionada com doses em dias alternados, com eficácia semelhante e melhor tolerância, principalmente em adolescentes. Evidência ainda limitada em lactentes. Confirmar conforme protocolo/bula.', verificar: true }
          ] },
        { ordem: 4, rotulo: 'Segunda linha / ausência de resposta', tipo: 'segunda',
          opcoes: [
            { medId: null, nome: 'Reavaliação diagnóstica antes de trocar o ferro', esquema: '', quando: 'Hemoglobina sem elevação esperada após 4 semanas de reposição adequada', obs: 'Investigar adesão, dose, perda sanguínea contínua, parasitose, doença celíaca, talassemia, anemia de doença crônica e deficiência de vitamina B12 ou de folato, além de hemoglobinopatias.' },
            { medId: null, nome: 'Ferro parenteral ou transfusão', esquema: 'Indicação e dose definidas pelo serviço de referência', quando: 'Intolerância grave comprovada ao ferro oral, má absorção, ou anemia grave sintomática com repercussão hemodinâmica', obs: 'Transfusão é decisão clínica, não laboratorial isolada. Encaminhar à referência. Confirmar conforme protocolo.', verificar: true }
          ] },
        { ordem: 5, rotulo: 'Adjuvante', tipo: 'adjuvante',
          opcoes: [
            { medId: null, nome: 'Ácido fólico', esquema: 'Dose conforme idade e protocolo do serviço', quando: 'Anemia carencial mista ou desnutrição associada, conforme avaliação', obs: 'Não indicado de rotina na anemia ferropriva isolada. Confirmar conforme protocolo/bula.', verificar: true },
            { medId: null, nome: 'Orientação alimentar', esquema: '', quando: 'Todos os casos', obs: 'Reforçar carnes, vísceras, peixe regional, feijão e folhas escuras, com fonte de vitamina C na mesma refeição, e evitar leite de vaca em excesso e chá junto às refeições.' }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: 'sulfato_ferroso', nome: 'Interrupção do ferro assim que a hemoglobina normaliza', esquema: '', quando: '', obs: 'Erro frequente. É necessário continuar por 2 a 3 meses adicionais para repor os estoques, caso contrário a anemia recidiva.' },
            { medId: null, nome: 'Leite de vaca integral em excesso no lactente', esquema: '', quando: '', obs: 'Grande volume de leite de vaca reduz a absorção de ferro e pode causar perda sanguínea intestinal oculta, causa comum de anemia refratária.' },
            { medId: null, nome: 'Polivitamínicos e tônicos sem dose adequada de ferro', esquema: '', quando: '', obs: 'Não substituem a dose terapêutica de ferro elementar. Verificar sempre a quantidade de ferro elementar na apresentação.' },
            { medId: null, nome: 'Transfusão baseada apenas no valor da hemoglobina', esquema: '', quando: '', obs: 'A decisão depende da tolerância clínica, da velocidade de instalação e da presença de descompensação. Anemia crônica bem tolerada raramente exige transfusão.' }
          ] }
      ],
      naoFarmacologico: [
        'Aleitamento materno exclusivo até 6 meses e introdução alimentar adequada, com alimentos ricos em ferro.',
        'Triagem de anemia conforme a rotina da atenção básica, com atenção às populações ribeirinha e indígena, de maior prevalência.',
        'Investigação e tratamento de parasitoses intestinais e de perdas sanguíneas.',
        'Acompanhamento do crescimento, do desenvolvimento e do desempenho escolar, afetados pela ferropenia mesmo sem anemia.',
        'Retorno em 30 dias para avaliar adesão e resposta, com nova hemoglobina em 4 a 8 semanas.'
      ],
      fontes: [ { nome: 'Sociedade Brasileira de Pediatria - Consenso sobre anemia ferropriva', ano: 2021 }, { nome: 'OMS - Guideline on use of ferrous salts supplementation in infants and children', ano: 2016 } ],
      atualizadoEm: '2026-09'
    },

    desnutricao: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - estabilização inicial', tipo: 'primeira',
          opcoes: [
            { medId: null, nome: 'Fórmula terapêutica F-75 na fase de estabilização', esquema: 'Oferta fracionada a cada 2 a 3 h, conforme o protocolo de manejo da desnutrição aguda grave, sem forçar ganho de peso nesta fase', quando: 'Desnutrição aguda grave com complicação, nas primeiras 24 a 72 h de internação', obs: 'A realimentação rápida nessa fase provoca síndrome de realimentação, que pode ser fatal. Confirmar volumes conforme o protocolo do serviço.', verificar: true },
            { medId: 'sais_reidratacao_oral', nome: 'Sais de reidratação oral para desnutrido (ReSoMal ou solução recomendada pelo protocolo)', esquema: 'Oferta lenta e fracionada, conforme o protocolo específico para desnutrição grave', quando: 'Desidratação na criança com desnutrição aguda grave', obs: 'A criança gravemente desnutrida tem excesso de sódio corporal e deficiência de potássio, por isso a solução e o ritmo são diferentes dos habituais. Confirmar conforme o protocolo.', verificar: true }
          ] },
        { ordem: 2, rotulo: 'Primeira escolha - antibiótico de rotina na desnutrição aguda grave', tipo: 'primeira',
          opcoes: [
            { medId: 'amoxicilina', nome: 'Amoxicilina', esquema: '50 mg/kg/dia VO divididos a cada 12 h por 5 a 7 dias, conforme o protocolo', quando: 'Desnutrição aguda grave sem complicação, em tratamento ambulatorial, mesmo sem sinais evidentes de infecção', obs: 'Recomendação do protocolo da OMS e do Ministério da Saúde: a infecção é frequentemente oculta no desnutrido grave, que não faz febre nem leucocitose.' },
            { medId: 'ampicilina', nome: 'Ampicilina associada a gentamicina', esquema: 'Ampicilina 100 a 200 mg/kg/dia IV a cada 6 h, com gentamicina 5 a 7,5 mg/kg/dia IV a cada 24 h', quando: 'Desnutrição aguda grave com complicação, internada, com letargia, hipotermia, hipoglicemia ou sinais de infecção', obs: 'Monitorar função renal com o aminoglicosídeo, a criança desnutrida é mais vulnerável.' },
            { medId: 'ceftriaxona', nome: 'Ceftriaxona', esquema: '50 a 100 mg/kg/dia IV', quando: 'Criança gravemente enferma, com suspeita de sepse ou falha do esquema inicial', obs: 'Atenção à hipoalbuminemia grave, discutir com a referência.' }
          ] },
        { ordem: 3, rotulo: 'Transição e reabilitação nutricional', tipo: 'alternativa',
          opcoes: [
            { medId: null, nome: 'Fórmula F-100 ou alimento terapêutico pronto para uso (RUTF)', esquema: 'Progressão conforme o protocolo, após retorno do apetite e resolução das complicações', quando: 'Fase de reabilitação, quando se busca ganho de peso acelerado', obs: 'O alimento terapêutico pronto para uso permite tratamento ambulatorial e é especialmente útil em comunidade distante. Confirmar disponibilidade e esquema conforme o protocolo.', verificar: true }
          ] },
        { ordem: 4, rotulo: 'Micronutrientes e correção de carências', tipo: 'adjuvante',
          opcoes: [
            { medId: 'vitamina_a', nome: 'Vitamina A', esquema: 'Dose conforme faixa etária do protocolo, com atenção a não repetir se houve dose recente', quando: 'Desnutrição aguda grave, sobretudo com sinais oculares de carência', obs: 'Confirmar dose e intervalo conforme o protocolo vigente.', verificar: true },
            { medId: 'zinco', nome: 'Zinco', esquema: '10 a 20 mg/dia VO conforme a idade, por 10 a 14 dias, e conforme o protocolo na desnutrição', quando: 'Diarreia associada e reposição de micronutrientes', obs: '' },
            { medId: null, nome: 'Ácido fólico', esquema: 'Dose conforme o protocolo do serviço', quando: 'Reposição na desnutrição aguda grave', obs: 'Confirmar conforme protocolo/bula.', verificar: true },
            { medId: 'albendazol', nome: 'Albendazol', esquema: '400 mg VO em dose única a partir de 2 anos, e 200 mg entre 1 e 2 anos', quando: 'Na fase de reabilitação, após estabilização, em área de alta prevalência de helmintos', obs: 'Não administrar na fase aguda de estabilização.' },
            { medId: 'sulfato_ferroso', nome: 'Sulfato ferroso', esquema: '3 mg de ferro elementar/kg/dia VO, iniciado apenas na fase de reabilitação', quando: 'Anemia na criança desnutrida, somente após recuperação do apetite e do ganho de peso', obs: 'Não iniciar ferro na fase de estabilização, pelo risco de agravar a infecção e o estresse oxidativo.' },
            { medId: 'glicose', nome: 'Glicose', esquema: 'Glicose a 10% 5 mL/kg IV na hipoglicemia, ou oferta oral de solução açucarada quando a criança está consciente', quando: 'Hipoglicemia, causa frequente de óbito nas primeiras horas', obs: 'Checar glicemia na admissão e manter alimentação frequente, inclusive à noite.' }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: 'sulfato_ferroso', nome: 'Ferro na fase de estabilização', esquema: '', quando: '', obs: 'Contraindicado nessa fase. O ferro livre favorece infecção e estresse oxidativo no desnutrido grave, iniciar apenas na reabilitação.' },
            { medId: 'ringer_lactato', nome: 'Expansão volêmica rápida com grandes volumes', esquema: '', quando: '', obs: 'A criança gravemente desnutrida tem função cardíaca comprometida e faz insuficiência cardíaca com facilidade. A reidratação é lenta e por via oral ou enteral, salvo choque com critérios definidos, quando os volumes e as taxas seguem o protocolo específico.' },
            { medId: null, nome: 'Realimentação rápida com alta oferta calórica na admissão', esquema: '', quando: '', obs: 'Provoca síndrome de realimentação, com hipofosfatemia, hipocalemia e morte súbita. Progredir conforme o protocolo.' },
            { medId: null, nome: 'Estimulantes de apetite e anabolizantes', esquema: '', quando: '', obs: 'Sem indicação e com risco. A recuperação depende de aporte nutricional adequado, tratamento das infecções e estímulo.' },
            { medId: 'prednisolona', nome: 'Corticoide para ganho de peso', esquema: '', quando: '', obs: 'Sem indicação nutricional e com aumento do risco infeccioso.' }
          ] }
      ],
      naoFarmacologico: [
        'Classificação antropométrica com peso, estatura, índice de massa corporal e perímetro braquial, além de busca de edema bilateral.',
        'Prevenção da hipotermia e da hipoglicemia, com aquecimento, contato pele a pele e alimentação frequente inclusive noturna.',
        'Estímulo ao desenvolvimento, brincadeira e vínculo com o cuidador durante a internação.',
        'Avaliação social, insegurança alimentar, acesso à água e inserção em programas de transferência de renda e de alimentação.',
        'Seguimento ambulatorial prolongado com controle de peso semanal no início, em articulação com a equipe de saúde da família e o agente comunitário.'
      ],
      fontes: [ { nome: 'Ministério da Saúde - Manejo da criança com desnutrição aguda grave', ano: 2023 }, { nome: 'OMS - Guideline on the management of acute malnutrition in infants and children', ano: 2023 } ],
      atualizadoEm: '2026-09'
    },

    ictericia_neonatal: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha', tipo: 'primeira',
          opcoes: [
            { medId: null, nome: 'Fototerapia', esquema: 'Fototerapia contínua de alta intensidade, indicada conforme nomograma por idade em horas, idade gestacional e fatores de risco', quando: 'Hiperbilirrubinemia indireta acima do limiar de tratamento para a idade em horas', obs: 'Medida não medicamentosa e principal tratamento. Manter aleitamento frequente, proteger os olhos e monitorar temperatura e hidratação.' },
            { medId: null, nome: 'Aumento da frequência das mamadas', esquema: 'Amamentação em livre demanda, com pelo menos 8 a 12 mamadas ao dia, e apoio à pega', quando: 'Icterícia associada à baixa ingesta nos primeiros dias, causa muito frequente', obs: 'Avaliar peso, diurese e evacuações. Suplementar com leite humano ordenhado ou fórmula somente quando indicado.' }
          ] },
        { ordem: 2, rotulo: 'Segunda linha - hiperbilirrubinemia grave ou em ascensão apesar da fototerapia', tipo: 'segunda',
          opcoes: [
            { medId: null, nome: 'Exsanguineotransfusão', esquema: 'Indicação conforme nomograma, idade gestacional e presença de sinais de encefalopatia bilirrubínica', quando: 'Níveis de bilirrubina em zona de exsanguineotransfusão, ou sinais neurológicos agudos', obs: 'Procedimento de referência terciária. Em comunidade distante, acionar transporte imediatamente ao aproximar do limiar, sem esperar o valor de troca.' },
            { medId: null, nome: 'Imunoglobulina humana intravenosa', esquema: '0,5 a 1 g/kg IV em 2 h, podendo repetir conforme protocolo do serviço', quando: 'Avaliar na doença hemolítica isoimune por incompatibilidade Rh ou ABO, com bilirrubina em ascensão apesar de fototerapia intensiva, como medida para reduzir a necessidade de exsanguineotransfusão', obs: 'Evidência de benefício controversa em ensaios mais recentes. Decisão com a referência neonatal. Confirmar conforme protocolo/bula.', verificar: true }
          ] },
        { ordem: 3, rotulo: 'Tratamento da causa quando identificada', tipo: 'alternativa',
          opcoes: [
            { medId: 'ampicilina', nome: 'Ampicilina associada a gentamicina', esquema: 'Ampicilina conforme idade gestacional e pós-natal, com gentamicina, segundo o protocolo neonatal', quando: 'Icterícia com sinais de sepse neonatal, letargia, instabilidade térmica ou icterícia precoce nas primeiras 24 h de vida', obs: 'Icterícia nas primeiras 24 h nunca é fisiológica, investigar hemólise e infecção.' },
            { medId: 'penicilina_cristalina', nome: 'Penicilina G cristalina', esquema: 'Conforme o protocolo de sífilis congênita, por 10 dias', quando: 'Icterícia com hepatoesplenomegalia e suspeita de sífilis congênita, diagnóstico a ser sempre afastado', obs: 'Verificar a sorologia materna e o seguimento no pré-natal.' },
            { medId: 'soro_fisiologico', nome: 'Hidratação venosa', esquema: 'Conforme necessidade hídrica e perdas, quando a via oral é insuficiente', quando: 'Desidratação associada, que agrava a hiperbilirrubinemia', obs: 'Priorizar a via enteral e o leite materno sempre que possível.' }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: 'fenobarbital', nome: 'Fenobarbital para reduzir a bilirrubina', esquema: '', quando: '', obs: 'Prática antiga, sem benefício demonstrado no tratamento da hiperbilirrubinemia neonatal e com risco de sedação e de prejuízo à amamentação.' },
            { medId: null, nome: 'Banho de sol como tratamento da icterícia', esquema: '', quando: '', obs: 'Prática domiciliar muito difundida e sem eficácia como tratamento, com risco de queimadura, hipertermia e desidratação, além de atrasar o atendimento. Pode dar falsa segurança à família.' },
            { medId: null, nome: 'Suspensão do aleitamento materno de rotina', esquema: '', quando: '', obs: 'Não indicada na maioria dos casos. A conduta é aumentar a frequência das mamadas. A suspensão temporária é exceção, discutida com a referência.' },
            { medId: null, nome: 'Avaliação da icterícia apenas pela inspeção visual', esquema: '', quando: '', obs: 'A inspeção subestima a gravidade, sobretudo em pele mais pigmentada. Usar bilirrubina transcutânea ou sérica sempre que disponível.' },
            { medId: 'glicose', nome: 'Soro glicosado oral para reduzir bilirrubina', esquema: '', quando: '', obs: 'Sem eficácia, reduz a ingesta de leite e pode piorar a icterícia.' }
          ] }
      ],
      naoFarmacologico: [
        'Avaliação da icterícia em todo recém-nascido antes da alta e no seguimento nas primeiras 48 a 72 h, com bilirrubina transcutânea quando disponível.',
        'Uso de nomograma por idade em horas, e não apenas do valor absoluto de bilirrubina.',
        'Apoio efetivo à amamentação, com avaliação da pega e do ganho de peso.',
        'Triagem de tipagem sanguínea e Coombs quando a mãe é Rh negativo ou O, e pesquisa de deficiência de G6PD quando disponível.',
        'Plano de seguimento e de transporte definido antecipadamente para recém-nascidos de comunidades distantes, com orientação clara sobre sinais de alerta neurológico.'
      ],
      fontes: [ { nome: 'Sociedade Brasileira de Pediatria - Documento científico sobre hiperbilirrubinemia indireta no recém-nascido', ano: 2021 }, { nome: 'Ministério da Saúde - Atenção à Saúde do Recém-Nascido, guia para profissionais de saúde', ano: 2014 } ],
      atualizadoEm: '2026-09'
    },

    sepse_neonatal: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - sepse precoce, até 72 h de vida', tipo: 'primeira',
          opcoes: [
            { medId: 'ampicilina', nome: 'Ampicilina', esquema: '100 a 200 mg/kg/dia IV, com intervalo conforme idade gestacional e pós-natal, podendo chegar a 300 mg/kg/dia na meningite', quando: 'Sepse neonatal precoce, para cobrir Streptococcus do grupo B, Listeria e Enterococcus', obs: 'Colher hemocultura antes da primeira dose sempre que isso não atrasar o início.' },
            { medId: 'gentamicina', nome: 'Gentamicina', esquema: '4 a 5 mg/kg/dose IV, com intervalo de 24 a 48 h conforme idade gestacional e pós-natal', quando: 'Associada à ampicilina no esquema empírico da sepse precoce', obs: 'A dose estendida por peso e idade é a prática atual. Monitorar função renal e, quando disponível, nível sérico.' }
          ] },
        { ordem: 2, rotulo: 'Primeira escolha - sepse tardia', tipo: 'primeira',
          opcoes: [
            { medId: 'oxacilina', nome: 'Oxacilina', esquema: '100 a 200 mg/kg/dia IV, intervalo conforme idade', quando: 'Sepse tardia com suspeita de foco cutâneo, de cateter ou de origem comunitária, associada a aminoglicosídeo', obs: 'Em recém-nascido internado há muito tempo, o esquema deve considerar a flora e o perfil de resistência da unidade.' },
            { medId: 'vancomicina', nome: 'Vancomicina', esquema: '15 mg/kg/dose IV, intervalo conforme idade gestacional e pós-natal', quando: 'Suspeita de Staphylococcus coagulase negativo ou de Staphylococcus aureus resistente à meticilina em sepse tardia hospitalar, sobretudo associada a cateter', obs: 'Monitorar função renal e nível sérico quando disponível. Descalonar assim que o resultado da cultura permitir.' },
            { medId: 'cefotaxima', nome: 'Cefotaxima', esquema: '100 a 200 mg/kg/dia IV, intervalo conforme idade', quando: 'Suspeita de meningite neonatal, associada à ampicilina', obs: 'Preferida à ceftriaxona no período neonatal. Evitar o uso empírico prolongado, pelo risco de seleção de resistência e de candidíase.' }
          ] },
        { ordem: 3, rotulo: 'Alternativa quando a cefotaxima não está disponível', tipo: 'alternativa',
          opcoes: [
            { medId: 'ceftriaxona', nome: 'Ceftriaxona', esquema: 'Dose conforme protocolo, apenas em situação excepcional no período neonatal', quando: 'Alternativa quando não há cefotaxima na unidade e há necessidade de cefalosporina de terceira geração', obs: 'Evitar no recém-nascido com icterícia ou hiperbilirrubinemia, pelo deslocamento da bilirrubina da albumina, e não usar junto com soluções contendo cálcio. Confirmar conforme protocolo/bula e discutir com a referência.', verificar: true },
            { medId: 'penicilina_cristalina', nome: 'Penicilina G cristalina', esquema: 'Dose conforme idade e protocolo neonatal', quando: 'Após identificação de Streptococcus do grupo B ou de Treponema pallidum, para descalonar o esquema', obs: 'Descalonar sempre que a cultura ou a sorologia permitirem.' }
          ] },
        { ordem: 4, rotulo: 'Segunda linha - suspeita de agente não bacteriano ou falha', tipo: 'segunda',
          opcoes: [
            { medId: null, nome: 'Aciclovir', esquema: '60 mg/kg/dia IV divididos a cada 8 h, conforme protocolo neonatal', quando: 'Suspeita de infecção neonatal por herpes simples: vesículas, convulsão, hepatite, sepse com culturas negativas e piora clínica', obs: 'Considerar precocemente, o atraso piora muito o prognóstico. Confirmar dose e duração conforme protocolo/bula.', verificar: true },
            { medId: null, nome: 'Ampliação de espectro definida com a referência neonatal', esquema: '', quando: 'Falha clínica, cultura com germe multirresistente, ou unidade com perfil epidemiológico específico', obs: 'Esquemas com carbapenêmico ou antifúngico devem ser definidos com a comissão de controle de infecção e com a referência.' }
          ] },
        { ordem: 5, rotulo: 'Adjuvante / suporte', tipo: 'adjuvante',
          opcoes: [
            { medId: 'soro_fisiologico', nome: 'Soro fisiológico 0,9%', esquema: 'Expansão de 10 mL/kg IV em 10 a 30 min, repetindo conforme reavaliação', quando: 'Choque séptico neonatal', obs: 'Volumes menores e reavaliação mais frequente que na criança maior.' },
            { medId: 'glicose', nome: 'Glicose', esquema: 'Glicose a 10% 2 mL/kg IV na hipoglicemia, seguida de infusão contínua com taxa de infusão de glicose adequada', quando: 'Hipoglicemia, frequente na sepse neonatal', obs: 'Monitorar glicemia seriada.' },
            { medId: 'adrenalina', nome: 'Adrenalina', esquema: 'Infusão contínua conforme protocolo neonatal, titulada pela resposta', quando: 'Choque refratário a volume', obs: 'Iniciar precocemente no choque que não responde a 2 expansões, com acesso seguro.' },
            { medId: 'fenobarbital', nome: 'Fenobarbital', esquema: 'Ataque de 20 mg/kg IV, com doses adicionais conforme protocolo', quando: 'Convulsão neonatal associada à sepse ou à meningite', obs: 'Manter suporte ventilatório disponível.' }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: 'ceftriaxona', nome: 'Ceftriaxona no recém-nascido ictérico ou em uso de cálcio', esquema: '', quando: '', obs: 'Contraindicada nessas situações pelo risco de encefalopatia bilirrubínica e de precipitação com cálcio. Preferir cefotaxima.' },
            { medId: 'cefotaxima', nome: 'Cefalosporina de terceira geração como esquema empírico de rotina', esquema: '', quando: '', obs: 'O uso empírico amplo se associa a resistência e a candidíase invasiva. Reservar para suspeita de meningite ou para orientação por cultura.' },
            { medId: null, nome: 'Manter antibiótico por 7 dias com culturas negativas e recém-nascido bem', esquema: '', quando: '', obs: 'Reavaliar em 36 a 48 h. A suspensão precoce diante de culturas negativas e boa evolução clínica é recomendada pelos programas de uso racional de antimicrobianos.' },
            { medId: null, nome: 'Imunoglobulina intravenosa de rotina na sepse neonatal', esquema: '', quando: '', obs: 'Ensaio clínico multicêntrico de grande porte não demonstrou redução de mortalidade nem de incapacidade. Não indicada de rotina.' },
            { medId: 'prednisolona', nome: 'Corticoide de rotina na sepse neonatal', esquema: '', quando: '', obs: 'Sem indicação fora do choque refratário com suspeita de insuficiência adrenal, conduzido pela referência.' }
          ] }
      ],
      naoFarmacologico: [
        'Identificação dos fatores de risco maternos: bolsa rota prolongada, febre materna, colonização por Streptococcus do grupo B, corioamnionite e prematuridade.',
        'Coleta de hemocultura e, quando indicado, de líquor antes do antibiótico, sem atrasar a primeira dose.',
        'Controle térmico, glicêmico e hemodinâmico, com contato pele a pele quando o estado clínico permite.',
        'Higiene das mãos e cuidado com cateteres, principal medida de prevenção da sepse tardia.',
        'Comunicação precoce com a referência neonatal e plano de transporte, com informação da hora da primeira dose de antibiótico.'
      ],
      fontes: [ { nome: 'Ministério da Saúde - Atenção à Saúde do Recém-Nascido, guia para profissionais de saúde', ano: 2014 }, { nome: 'Sociedade Brasileira de Pediatria - Documento científico sobre sepse neonatal', ano: 2022 } ],
      atualizadoEm: '2026-09'
    },
    desconforto_respiratorio_rn: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - suporte respiratório', tipo: 'primeira',
          opcoes: [
            { medId: null, nome: 'CPAP nasal precoce', esquema: 'Pressão inicial de 5 a 6 cmH2O, ajustada conforme esforço respiratório e oxigenação, com oxigênio titulado pela oximetria', quando: 'Recém-nascido com desconforto respiratório e esforço, sobretudo prematuro com doença da membrana hialina', obs: 'Medida não medicamentosa de maior impacto, iniciada ainda na sala de parto quando indicada. Reduz a necessidade de ventilação mecânica e de surfactante.' },
            { medId: null, nome: 'Oxigenoterapia com alvo de saturação controlado', esquema: 'Titular para manter saturação entre 90% e 95% no prematuro, conforme protocolo do serviço', quando: 'Hipoxemia', obs: 'Evitar hiperóxia, associada a retinopatia da prematuridade e a lesão pulmonar. Usar blender e oxímetro sempre que disponíveis.' }
          ] },
        { ordem: 2, rotulo: 'Primeira escolha - surfactante na doença da membrana hialina', tipo: 'primeira',
          opcoes: [
            { medId: null, nome: 'Surfactante exógeno (poractante alfa ou beractanto)', esquema: 'Dose inicial conforme o produto, em geral 100 a 200 mg/kg por via traqueal, com possibilidade de repetição conforme resposta e protocolo', quando: 'Doença da membrana hialina com necessidade de oxigênio acima do limiar do protocolo ou falha de CPAP', obs: 'Quanto mais precoce, maior o benefício. Técnicas menos invasivas de administração são usadas em serviços com experiência. Confirmar dose e técnica conforme protocolo/bula do produto disponível.', verificar: true }
          ] },
        { ordem: 3, rotulo: 'Antibiótico quando há suspeita de infecção', tipo: 'alternativa',
          opcoes: [
            { medId: 'ampicilina', nome: 'Ampicilina associada a gentamicina', esquema: 'Doses conforme idade gestacional e pós-natal do protocolo neonatal', quando: 'Avaliar quando o desconforto respiratório pode corresponder a pneumonia congênita ou sepse precoce: bolsa rota prolongada, febre materna, líquido fétido, leucopenia', obs: 'A pneumonia congênita por Streptococcus do grupo B é indistinguível da doença da membrana hialina no início. Reavaliar em 36 a 48 h e suspender se as culturas forem negativas e a evolução boa.' },
            { medId: 'cefotaxima', nome: 'Cefotaxima', esquema: 'Dose conforme idade e protocolo neonatal', quando: 'Suspeita de meningite associada, ou orientação por cultura', obs: 'Preferida à ceftriaxona no período neonatal.' }
          ] },
        { ordem: 4, rotulo: 'Adjuvante e prevenção da apneia da prematuridade', tipo: 'adjuvante',
          opcoes: [
            { medId: null, nome: 'Citrato de cafeína', esquema: 'Ataque de 20 mg/kg IV ou VO de citrato de cafeína e manutenção de 5 a 10 mg/kg/dia', quando: 'Prematuro com apneia da prematuridade, e para facilitar a extubação e a manutenção do CPAP', obs: 'Melhora desfechos respiratórios e do neurodesenvolvimento em prematuros. Confirmar dose conforme protocolo/bula do produto disponível.', verificar: true },
            { medId: 'glicose', nome: 'Glicose', esquema: 'Infusão contínua com taxa de infusão de glicose conforme protocolo, e glicose a 10% 2 mL/kg IV na hipoglicemia', quando: 'Manutenção metabólica no recém-nascido que não pode se alimentar, e correção de hipoglicemia', obs: 'Monitorar glicemia seriada, o desconforto respiratório aumenta o consumo energético.' },
            { medId: 'soro_fisiologico', nome: 'Soro fisiológico 0,9%', esquema: 'Expansão de 10 mL/kg IV em 10 a 30 min quando há sinais de hipovolemia', quando: 'Má perfusão associada', obs: 'Evitar expansões repetidas sem indicação clara, pelo risco de hemorragia peri-intraventricular no prematuro.' }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: null, nome: 'Oxigênio a 100% sem controle de oximetria', esquema: '', quando: '', obs: 'A hiperóxia é lesiva. Usar blender e oxímetro, e titular pelo alvo de saturação. Em unidade sem blender, acionar a referência e usar a menor fração possível.' },
            { medId: 'dexametasona', nome: 'Corticoide sistêmico precoce no prematuro para prevenir displasia broncopulmonar', esquema: '', quando: '', obs: 'O uso precoce de dexametasona se associa a paralisia cerebral e a pior neurodesenvolvimento. Se considerado, apenas tardiamente, em dose baixa e por decisão da referência neonatal.' },
            { medId: null, nome: 'Aspiração traqueal de rotina no recém-nascido com líquido meconial', esquema: '', quando: '', obs: 'Não é mais recomendada de rotina pelas diretrizes de reanimação neonatal, inclusive no recém-nascido não vigoroso. A prioridade é a ventilação com pressão positiva eficaz.' },
            { medId: 'ampicilina', nome: 'Antibiótico prolongado em todo desconforto respiratório', esquema: '', quando: '', obs: 'Reavaliar em 36 a 48 h. Antibiótico prolongado sem infecção comprovada aumenta enterocolite necrosante, candidíase e resistência.' },
            { medId: null, nome: 'Fisioterapia respiratória de rotina no prematuro em fase aguda', esquema: '', quando: '', obs: 'Não recomendada de rotina na fase aguda, pelo risco de instabilidade e de hemorragia peri-intraventricular.' }
          ] }
      ],
      naoFarmacologico: [
        'Controle térmico rigoroso desde a sala de parto, com saco plástico e touca no prematuro.',
        'Clampeamento oportuno do cordão e manuseio mínimo nas primeiras horas.',
        'Posicionamento adequado, cuidado postural e redução de ruído e de luz no cuidado do prematuro.',
        'Início precoce de leite materno, preferencialmente da própria mãe, e contato pele a pele quando o estado clínico permite.',
        'Acionamento precoce do transporte neonatal quando o serviço não dispõe de CPAP, surfactante ou ventilação mecânica, situação comum nos municípios do interior do Amazonas.'
      ],
      fontes: [ { nome: 'Sociedade Brasileira de Pediatria - Programa de Reanimação Neonatal e documentos de neonatologia', ano: 2022 }, { nome: 'Ministério da Saúde - Atenção à Saúde do Recém-Nascido, guia para profissionais de saúde', ano: 2014 } ],
      atualizadoEm: '2026-09'
    },

    hipoglicemia_neonatal: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - recém-nascido assintomático', tipo: 'primeira',
          opcoes: [
            { medId: null, nome: 'Leite materno ou leite materno ordenhado', esquema: 'Amamentação imediata ou oferta de leite ordenhado, com nova glicemia 30 a 60 min depois, conforme protocolo do serviço', quando: 'Hipoglicemia assintomática em recém-nascido de risco, com capacidade de sucção preservada', obs: 'Medida de primeira linha no assintomático. Manter contato pele a pele e controle térmico, o frio agrava a hipoglicemia.' }
          ] },
        { ordem: 2, rotulo: 'Primeira escolha - recém-nascido sintomático ou glicemia muito baixa', tipo: 'primeira',
          opcoes: [
            { medId: 'glicose', nome: 'Glicose', esquema: 'Glicose a 10% 2 mL/kg IV em bolus lento, seguida de infusão contínua com taxa de infusão de glicose de 4 a 8 mg/kg/min, ajustada pelas glicemias', quando: 'Hipoglicemia sintomática, com tremores, letargia, apneia, hipotonia ou convulsão, ou glicemia muito baixa conforme o limiar do protocolo', obs: 'Não usar soluções mais concentradas em veia periférica, pelo risco de lesão vascular. Repetir a glicemia 30 min após o bolus.' }
          ] },
        { ordem: 3, rotulo: 'Uso off-label', tipo: 'offlabel',
          opcoes: [
            { medId: null, nome: 'Gel de dextrose oral a 40%', esquema: '200 mg/kg, equivalente a 0,5 mL/kg do gel a 40%, massageado na mucosa oral, seguido de amamentação e de nova glicemia em 30 min', quando: 'Hipoglicemia assintomática ou levemente sintomática em recém-nascido de risco, como medida para evitar separação da mãe e hidratação venosa, sobretudo em unidade sem acesso venoso fácil', obs: 'Off-label no Brasil: não há apresentação registrada com essa indicação, e o produto costuma ser manipulado ou importado. A evidência é robusta, com ensaios clínicos randomizados e revisões sistemáticas mostrando redução de admissão em unidade neonatal e de separação mãe-bebê, e a prática consta de diretrizes internacionais. Confirmar disponibilidade, concentração e protocolo do serviço.', verificar: true }
          ] },
        { ordem: 4, rotulo: 'Segunda linha - hipoglicemia persistente ou refratária', tipo: 'segunda',
          opcoes: [
            { medId: 'glicose', nome: 'Aumento progressivo da taxa de infusão de glicose', esquema: 'Elevar a taxa de infusão em etapas, conforme glicemias, geralmente com necessidade de acesso central acima de 12,5% de concentração', quando: 'Glicemia que não normaliza com a infusão inicial', obs: 'Necessidade de taxa de infusão acima de 8 a 10 mg/kg/min sugere hiperinsulinismo e exige investigação e discussão com a referência.' },
            { medId: null, nome: 'Glucagon', esquema: 'Dose conforme protocolo do serviço, por via IV, IM ou subcutânea', quando: 'Hipoglicemia refratária enquanto se obtém ou se amplia o acesso venoso, sobretudo em filho de mãe diabética com boas reservas de glicogênio', obs: 'Medida temporária, não substitui a infusão de glicose. Confirmar dose conforme protocolo/bula.', verificar: true },
            { medId: null, nome: 'Investigação de hiperinsulinismo e de erro inato do metabolismo', esquema: 'Coleta de amostra crítica no momento da hipoglicemia, conforme protocolo', quando: 'Hipoglicemia persistente além de 48 a 72 h, ou com necessidade alta de glicose', obs: 'Encaminhar à referência em endocrinologia pediátrica. A amostra crítica colhida no momento da hipoglicemia é insubstituível.' }
          ] },
        { ordem: 5, rotulo: 'Adjuvante / tratamento da causa', tipo: 'adjuvante',
          opcoes: [
            { medId: 'ampicilina', nome: 'Ampicilina associada a gentamicina', esquema: 'Doses conforme o protocolo neonatal', quando: 'Avaliar quando a hipoglicemia vem acompanhada de letargia, instabilidade térmica ou outros sinais de sepse neonatal', obs: 'Hipoglicemia pode ser a primeira manifestação de sepse no recém-nascido.' },
            { medId: 'fenobarbital', nome: 'Fenobarbital', esquema: 'Ataque de 20 mg/kg IV', quando: 'Convulsão que persiste após a correção da glicemia', obs: 'Corrigir primeiro a glicemia, a convulsão hipoglicêmica costuma ceder com a correção.' }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: 'glicose', nome: 'Bolus repetidos de glicose sem infusão contínua', esquema: '', quando: '', obs: 'Provocam hipoglicemia de rebote por estímulo à liberação de insulina. Após o bolus, manter infusão contínua.' },
            { medId: null, nome: 'Água glicosada oral em mamadeira como tratamento', esquema: '', quando: '', obs: 'Prática comum, oferece pouca energia, prejudica o aleitamento e não corrige adequadamente a hipoglicemia.' },
            { medId: null, nome: 'Triagem de glicemia em recém-nascido a termo saudável e sem fatores de risco', esquema: '', quando: '', obs: 'Não indicada. Gera intervenções desnecessárias e separação mãe-bebê. Rastrear apenas recém-nascidos de risco: prematuro, pequeno ou grande para a idade gestacional, filho de mãe diabética e sintomáticos.' },
            { medId: null, nome: 'Separação da mãe e suspensão do aleitamento por hipoglicemia leve assintomática', esquema: '', quando: '', obs: 'A amamentação e o contato pele a pele fazem parte do tratamento. Evitar separação desnecessária.' }
          ] }
      ],
      naoFarmacologico: [
        'Contato pele a pele imediato e amamentação na primeira hora de vida, medidas que previnem a hipoglicemia.',
        'Controle térmico rigoroso, o frio aumenta o consumo de glicose.',
        'Rastreamento de glicemia apenas em recém-nascidos de risco, com horários definidos em protocolo.',
        'Alimentação frequente, a cada 2 a 3 h, no recém-nascido de risco.',
        'Coleta de amostra crítica antes de corrigir a glicemia quando há suspeita de causa endócrina ou metabólica.'
      ],
      fontes: [ { nome: 'Sociedade Brasileira de Pediatria - Documento científico sobre hipoglicemia neonatal', ano: 2021 }, { nome: 'Ministério da Saúde - Atenção à Saúde do Recém-Nascido, guia para profissionais de saúde', ano: 2014 } ],
      atualizadoEm: '2026-09'
    },

    sifilis_congenita: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - sífilis congênita confirmada ou muito provável', tipo: 'primeira',
          opcoes: [
            { medId: 'penicilina_cristalina', nome: 'Penicilina G cristalina', esquema: '50.000 UI/kg/dose IV a cada 12 h nos primeiros 7 dias de vida e a cada 8 h a partir do 8o dia, por 10 dias', quando: 'Recém-nascido com evidência clínica, laboratorial ou radiológica de sífilis congênita, e sempre que houver neurossífilis ou alteração do líquor', obs: 'Esquema de escolha e o único adequado quando há acometimento do sistema nervoso central. Interrupção de mais de 24 h exige reinício do esquema completo.' },
            { medId: null, nome: 'Penicilina G procaína', esquema: '50.000 UI/kg/dose IM a cada 24 h por 10 dias', quando: 'Alternativa prevista no protocolo quando o líquor é normal e não há sinais de neurossífilis, especialmente onde a manutenção do acesso venoso por 10 dias é inviável', obs: 'Muito útil em unidade de município do interior sem condições de manter acesso venoso. Confirmar conforme o PCDT vigente.', verificar: true }
          ] },
        { ordem: 2, rotulo: 'Situação de mãe tratada de forma inadequada com recém-nascido assintomático', tipo: 'alternativa',
          opcoes: [
            { medId: 'penicilina_benzatina', nome: 'Penicilina G benzatina', esquema: '50.000 UI/kg IM em dose única', quando: 'Recém-nascido assintomático, com exames normais e titulação de VDRL não maior que a materna, em situação específica prevista no protocolo, quando há garantia de seguimento', obs: 'Somente em situação estritamente definida pelo PCDT e com seguimento assegurado. Em população ribeirinha ou indígena, com risco de perda de seguimento, considerar o esquema completo. Confirmar conforme o PCDT vigente.', verificar: true },
            { medId: null, nome: 'Investigação completa antes de decidir o esquema', esquema: 'VDRL do recém-nascido em sangue periférico, hemograma, líquor, radiografia de ossos longos, avaliação hepática, oftalmológica e auditiva', quando: 'Todo recém-nascido de mãe com sífilis, antes de definir a conduta', obs: 'A decisão terapêutica depende do tratamento materno, da titulação comparada e dos exames do recém-nascido.' }
          ] },
        { ordem: 3, rotulo: 'Segunda linha / situações especiais', tipo: 'segunda',
          opcoes: [
            { medId: 'ceftriaxona', nome: 'Ceftriaxona', esquema: 'Dose e duração definidas pelo serviço de referência', quando: 'Situação excepcional de alergia comprovada à penicilina ou desabastecimento, sempre com aval de infectologia pediátrica', obs: 'A penicilina é o único fármaco com eficácia comprovada na sífilis congênita, inclusive na neurossífilis. A ceftriaxona tem dados limitados nessa indicação e não é equivalente. Diante de alergia, a conduta preferida é a dessensibilização à penicilina em ambiente hospitalar. Evitar no recém-nascido ictérico. Confirmar conforme protocolo e com a referência.', verificar: true }
          ] },
        { ordem: 4, rotulo: 'Adjuvante / tratamento das manifestações', tipo: 'adjuvante',
          opcoes: [
            { medId: null, nome: 'Fototerapia', esquema: 'Conforme nomograma por idade em horas', quando: 'Icterícia com hiperbilirrubinemia associada à sífilis congênita', obs: 'Medida não medicamentosa.' },
            { medId: 'sulfato_ferroso', nome: 'Sulfato ferroso', esquema: '2 a 3 mg de ferro elementar/kg/dia VO, iniciado conforme protocolo de seguimento', quando: 'Anemia no seguimento da criança com sífilis congênita', obs: 'Confirmar conforme protocolo do serviço.', verificar: true },
            { medId: 'ampicilina', nome: 'Ampicilina associada a gentamicina', esquema: 'Doses conforme protocolo neonatal', quando: 'Avaliar quando há suspeita simultânea de sepse bacteriana no recém-nascido gravemente enfermo', obs: 'A sífilis congênita grave pode se apresentar como sepse, considerar as duas hipóteses.' }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: null, nome: 'Esquemas com macrolídeo, como azitromicina ou eritromicina, para sífilis congênita', esquema: '', quando: '', obs: 'Não recomendados. Falha terapêutica documentada, resistência do Treponema pallidum a macrolídeos e ausência de passagem adequada pela barreira hematoencefálica.' },
            { medId: 'penicilina_benzatina', nome: 'Penicilina benzatina em dose única no recém-nascido sintomático ou com líquor alterado', esquema: '', quando: '', obs: 'Insuficiente. Não atinge concentração treponemicida no sistema nervoso central. Nesses casos, usar penicilina cristalina por 10 dias.' },
            { medId: null, nome: 'Alta sem seguimento sorológico programado', esquema: '', quando: '', obs: 'O seguimento com VDRL seriado e avaliação neurológica, auditiva e oftalmológica é obrigatório. Em comunidade distante, articular o retorno com a equipe local antes da alta.' },
            { medId: null, nome: 'Tratar apenas o recém-nascido sem tratar a mãe e a parceria sexual', esquema: '', quando: '', obs: 'Erro frequente que perpetua a transmissão. Tratar a mãe e as parcerias, e notificar.' }
          ] }
      ],
      naoFarmacologico: [
        'Notificação compulsória de sífilis congênita e de sífilis em gestante, com investigação do caso.',
        'Testagem rápida da mãe e das parcerias sexuais, e tratamento das parcerias.',
        'Avaliação completa do recém-nascido: líquor, hemograma, radiografia de ossos longos, função hepática, avaliação oftalmológica e auditiva.',
        'Seguimento com VDRL em 1, 3, 6, 12 e 18 meses, e avaliação do neurodesenvolvimento.',
        'Fortalecimento da testagem no pré-natal e no parto, inclusive em unidades fluviais e em áreas indígenas, onde a perda de seguimento é maior.'
      ],
      fontes: [ { nome: 'Ministério da Saúde - Protocolo Clínico e Diretrizes Terapêuticas para Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis', ano: 2022 }, { nome: 'OMS - Guidelines for the treatment of Treponema pallidum', ano: 2016 } ],
      atualizadoEm: '2026-09'
    },

    reanimacao_neonatal_dx: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - ventilação com pressão positiva', tipo: 'primeira',
          opcoes: [
            { medId: null, nome: 'Ventilação com pressão positiva com ar ambiente ou oxigênio titulado', esquema: 'Iniciar nos primeiros 60 segundos de vida, com 40 a 60 ventilações por minuto, com ar ambiente no recém-nascido a termo e fração de oxigênio inicial conforme a idade gestacional no prematuro', quando: 'Recém-nascido que não respira ou não tem respiração eficaz, ou com frequência cardíaca abaixo de 100 batimentos por minuto', obs: 'Medida isolada mais importante da reanimação neonatal. A grande maioria dos recém-nascidos responde apenas a isso, sem necessidade de qualquer medicamento.' },
            { medId: null, nome: 'Massagem cardíaca coordenada com a ventilação', esquema: 'Relação de 3 compressões para 1 ventilação, com técnica dos dois polegares, após ventilação eficaz com via aérea avançada quando possível', quando: 'Frequência cardíaca abaixo de 60 batimentos por minuto após 30 segundos de ventilação com pressão positiva eficaz', obs: 'Antes de iniciar a massagem, checar a eficácia da ventilação, que é a causa mais comum de falha.' }
          ] },
        { ordem: 2, rotulo: 'Segunda linha - medicação na reanimação', tipo: 'segunda',
          opcoes: [
            { medId: 'adrenalina', nome: 'Adrenalina', esquema: 'Via endovenosa ou intraóssea preferencial: 0,01 a 0,03 mg/kg por dose, equivalente a 0,1 a 0,3 mL/kg da solução a 1:10.000, repetida a cada 3 a 5 min. Via traqueal, quando o acesso ainda não foi obtido: 0,05 a 0,1 mg/kg', quando: 'Frequência cardíaca que permanece abaixo de 60 batimentos por minuto apesar de ventilação eficaz e de massagem cardíaca coordenada por 60 segundos', obs: 'A via endovenosa ou intraóssea é preferida, a via traqueal tem absorção errática. Cateterismo umbilical é a via de escolha na sala de parto.' },
            { medId: 'soro_fisiologico', nome: 'Soro fisiológico 0,9%', esquema: '10 mL/kg IV ou intraóssea em 5 a 10 min, podendo repetir', quando: 'Suspeita de hipovolemia: perda sanguínea aguda, descolamento de placenta, sangramento de cordão, palidez com má resposta à reanimação', obs: 'Infundir lentamente no prematuro, pelo risco de hemorragia peri-intraventricular. Considerar sangue O negativo quando há perda volumosa.' }
          ] },
        { ordem: 3, rotulo: 'Pós-reanimação - cuidados na encefalopatia hipóxico-isquêmica', tipo: 'primeira',
          opcoes: [
            { medId: null, nome: 'Hipotermia terapêutica', esquema: 'Iniciada nas primeiras 6 h de vida, com temperatura alvo conforme protocolo, em serviço com equipe e monitorização adequadas', quando: 'Recém-nascido com 35 semanas ou mais e encefalopatia hipóxico-isquêmica moderada ou grave, conforme critérios do protocolo', obs: 'Única intervenção com benefício comprovado na encefalopatia hipóxico-isquêmica. Em unidade sem o recurso, evitar a hipertermia e acionar o transporte imediatamente, pois a janela é curta.' },
            { medId: 'glicose', nome: 'Glicose', esquema: 'Infusão contínua com taxa de infusão adequada, e glicose a 10% 2 mL/kg IV na hipoglicemia', quando: 'Manutenção da glicemia na fase pós-reanimação', obs: 'Evitar tanto hipoglicemia quanto hiperglicemia, ambas pioram a lesão neurológica.' }
          ] },
        { ordem: 4, rotulo: 'Adjuvante pós-reanimação', tipo: 'adjuvante',
          opcoes: [
            { medId: 'fenobarbital', nome: 'Fenobarbital', esquema: 'Ataque de 20 mg/kg IV, com doses adicionais conforme protocolo', quando: 'Convulsão neonatal clínica ou eletrográfica após a asfixia', obs: 'Não indicado de forma profilática. Tratar as crises e monitorizar quando houver eletroencefalograma de amplitude integrada disponível.' },
            { medId: 'ampicilina', nome: 'Ampicilina associada a gentamicina', esquema: 'Doses conforme idade gestacional e pós-natal', quando: 'Avaliar quando há fatores de risco infecciosos, pois sepse e asfixia se apresentam de forma semelhante', obs: 'Reavaliar em 36 a 48 h e suspender se as culturas forem negativas e a evolução boa.' }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: null, nome: 'Naloxona na sala de parto', esquema: '', quando: '', obs: 'Não recomendada nas diretrizes atuais de reanimação neonatal. Pode desencadear convulsão em filho de mãe dependente de opioide. A conduta é ventilação com pressão positiva eficaz e suporte.' },
            { medId: null, nome: 'Bicarbonato de sódio durante a reanimação', esquema: '', quando: '', obs: 'Não recomendado. Associa-se a hemorragia peri-intraventricular no prematuro e não melhora desfechos. A acidose se corrige com ventilação e restauração da perfusão.' },
            { medId: null, nome: 'Aspiração traqueal de rotina no recém-nascido com líquido meconial', esquema: '', quando: '', obs: 'Não recomendada, inclusive no recém-nascido não vigoroso. Atrasa a ventilação, que é a prioridade.' },
            { medId: null, nome: 'Oxigênio a 100% de rotina na reanimação do recém-nascido a termo', esquema: '', quando: '', obs: 'Iniciar com ar ambiente no recém-nascido a termo e titular pela oximetria. O uso rotineiro de oxigênio a 100% se associa a maior mortalidade e a estresse oxidativo.' },
            { medId: null, nome: 'Hipertermia no pós-reanimação', esquema: '', quando: '', obs: 'A hipertermia agrava a lesão cerebral. Evitar aquecimento excessivo e monitorar a temperatura de forma contínua.' },
            { medId: 'adrenalina', nome: 'Adrenalina antes de garantir ventilação eficaz', esquema: '', quando: '', obs: 'Erro frequente. A bradicardia neonatal é quase sempre de origem respiratória. Corrigir a técnica de ventilação antes de progredir para medicação.' }
          ] }
      ],
      naoFarmacologico: [
        'Preparo do material e da equipe antes de todo parto, com checklist e definição de papéis.',
        'Clampeamento oportuno do cordão no recém-nascido que não precisa de reanimação, e controle térmico imediato.',
        'Passos iniciais em 30 segundos: aquecer, posicionar, aspirar vias aéreas se necessário, secar e estimular.',
        'Monitorização com oxímetro no membro superior direito e, quando disponível, monitor cardíaco, que é mais rápido para detectar a frequência cardíaca.',
        'Treinamento periódico da equipe em reanimação neonatal, incluindo as equipes de unidades fluviais e de municípios sem maternidade de referência.'
      ],
      fontes: [ { nome: 'Sociedade Brasileira de Pediatria - Diretrizes do Programa de Reanimação Neonatal', ano: 2022 }, { nome: 'ILCOR - Consenso internacional sobre reanimação neonatal', ano: 2023 } ],
      atualizadoEm: '2026-09'
    }
,
    sarampo: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - vitamina A universal e suporte', tipo: 'primeira',
          opcoes: [
            { medId: 'vitamina_a', nome: 'Vitamina A', esquema: 'VO no dia do diagnóstico e repetida no dia seguinte: menor de 6 meses 50.000 UI por dose, de 6 a 11 meses 100.000 UI por dose, 12 meses ou mais 200.000 UI por dose. Terceira dose após 4 a 6 semanas se houver sinais de deficiência de vitamina A ou desnutrição grave', quando: 'Toda criança com sarampo, independentemente do estado nutricional', obs: 'Reduz mortalidade e complicações oculares. É a única medida medicamentosa específica com benefício demonstrado no sarampo.' },
            { medId: 'paracetamol', nome: 'Paracetamol', esquema: '10 a 15 mg/kg/dose VO a cada 6 h, conforme bula', quando: 'Febre e dor', obs: '' },
            { medId: 'sais_reidratacao_oral', nome: 'Sais de reidratação oral', esquema: 'Após cada evacuação líquida ou vômito, conforme plano A ou B do Ministério da Saúde', quando: 'Prevenção e tratamento da desidratação, muito frequente pela diarreia e pelas lesões orais', obs: 'Manter aleitamento materno e alimentação.' }
          ] },
        { ordem: 2, rotulo: 'Alternativa antitérmica', tipo: 'alternativa',
          opcoes: [
            { medId: 'dipirona', nome: 'Dipirona', esquema: '10 a 15 mg/kg/dose VO ou IV a cada 6 h, conforme bula', quando: 'Alternativa quando o paracetamol não controla a febre ou não está disponível na comunidade', obs: 'Não usar em menores de 3 meses ou abaixo de 5 kg.' }
          ] },
        { ordem: 3, rotulo: 'Segunda linha - complicação bacteriana', tipo: 'segunda',
          opcoes: [
            { medId: 'amoxicilina', nome: 'Amoxicilina', esquema: '50 mg/kg/dia VO dividida a cada 8 ou 12 h, podendo chegar a 80 a 90 mg/kg/dia conforme a diretriz, por 7 a 10 dias', quando: 'Otite média aguda ou pneumonia não grave complicando o sarampo, complicações bacterianas frequentes nessa doença', obs: 'Antibiótico apenas na complicação documentada ou fortemente suspeitada, não de rotina.' },
            { medId: 'ceftriaxona', nome: 'Ceftriaxona', esquema: '50 a 100 mg/kg/dia IV, conforme protocolo do serviço', quando: 'Complicação bacteriana grave com internação, como pneumonia grave ou sepse', obs: '' },
            { medId: 'zinco', nome: 'Zinco', esquema: '10 mg/dia VO em menores de 6 meses e 20 mg/dia em maiores de 6 meses, por 10 a 14 dias', quando: 'Diarreia associada ao sarampo', obs: '' }
          ] },
        { ordem: 4, rotulo: 'Adjuvante - profilaxia pós-exposição dos contatos', tipo: 'adjuvante',
          opcoes: [
            { medId: null, nome: 'Vacina tríplice viral ou tetraviral (bloqueio vacinal)', esquema: 'Contatos suscetíveis em até 72 h da exposição, conforme idade e situação vacinal, incluindo dose zero de 6 a 11 meses, que não substitui o esquema de rotina', quando: 'Bloqueio de contatos suscetíveis, ação prioritária da vigilância', obs: 'Confirmar conforme o Calendário Nacional de Vacinação e a orientação da vigilância epidemiológica.', verificar: true },
            { medId: null, nome: 'Imunoglobulina humana normal', esquema: 'Preferencialmente em até 6 dias da exposição, dose e via conforme protocolo do CRIE e bula', quando: 'Contatos suscetíveis com contraindicação à vacina: menores de 6 meses, gestantes e imunossuprimidos', obs: 'Confirmar conforme protocolo/bula e disponibilidade no CRIE de referência.', verificar: true }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: null, nome: 'Ácido acetilsalicílico (AAS)', esquema: '', quando: '', obs: 'Evitar em viroses exantemáticas da infância pela associação com síndrome de Reye. Usar paracetamol ou dipirona.' },
            { medId: 'amoxicilina', nome: 'Antibiótico profilático de rotina no sarampo não complicado', esquema: '', quando: '', obs: 'Não indicado na criança sem sinais de complicação bacteriana. Aumenta resistência sem reduzir complicações nesse contexto.' },
            { medId: null, nome: 'Antiviral para sarampo', esquema: '', quando: '', obs: 'Não há antiviral com eficácia comprovada. O cuidado é de suporte, vitamina A e vigilância de complicações.' },
            { medId: null, nome: 'Atender caso suspeito sem isolamento respiratório por aerossóis', esquema: '', quando: '', obs: 'O sarampo é altamente transmissível. A falta de isolamento na unidade gera surtos com casos secundários em lactentes e imunossuprimidos.' }
          ] }
      ],
      naoFarmacologico: [
        'Notificação imediata e investigação de contatos pela vigilância epidemiológica.',
        'Isolamento respiratório por aerossóis desde a suspeita até 4 dias após o início do exantema, e durante toda a doença em imunossuprimidos.',
        'Higiene ocular com soro fisiológico e avaliação oftalmológica na fotofobia intensa, secreção purulenta ou suspeita de úlcera de córnea.',
        'Oxigênio suplementar se saturação abaixo de 92% e avaliação de suporte ventilatório na insuficiência respiratória.',
        'Busca ativa de não vacinados na comunidade, com atenção a áreas ribeirinhas e indígenas com cobertura vacinal mais baixa.'
      ],
      fontes: [ { nome: 'Ministério da Saúde - Guia de vigilância em saúde, sarampo', ano: 2023 }, { nome: 'OMS - Measles vaccines and clinical management position paper', ano: 2021 } ],
      atualizadoEm: '2026-09'
    },

    rubeola: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - sintomático', tipo: 'primeira',
          opcoes: [
            { medId: 'paracetamol', nome: 'Paracetamol', esquema: '10 a 15 mg/kg/dose VO a cada 6 h, conforme bula', quando: 'Febre e dor, quadro habitualmente leve e autolimitado', obs: 'Não há antiviral específico.' }
          ] },
        { ordem: 2, rotulo: 'Alternativa para febre, dor e artralgia', tipo: 'alternativa',
          opcoes: [
            { medId: 'dipirona', nome: 'Dipirona', esquema: '10 a 15 mg/kg/dose VO ou IV a cada 6 h, conforme bula', quando: 'Alternativa quando o paracetamol não controla a febre ou não está disponível', obs: 'Não usar em menores de 3 meses ou abaixo de 5 kg.' },
            { medId: 'ibuprofeno', nome: 'Ibuprofeno', esquema: '5 a 10 mg/kg/dose VO a cada 6 a 8 h, conforme bula', quando: 'Artralgia ou artrite, mais comum em adolescentes, quando não houver sangramento nem plaquetopenia', obs: 'Evitar enquanto dengue não estiver afastada e na púrpura trombocitopênica.' }
          ] },
        { ordem: 3, rotulo: 'Adjuvante - bloqueio vacinal e proteção de gestantes', tipo: 'adjuvante',
          opcoes: [
            { medId: null, nome: 'Vacina tríplice viral (bloqueio vacinal)', esquema: 'Contatos suscetíveis não gestantes em até 72 h da exposição, conforme o Calendário Nacional de Vacinação', quando: 'Bloqueio de contatos, medida de vigilância', obs: 'Contraindicada na gestação e na imunossupressão grave. Confirmar conforme protocolo e orientação da vigilância.', verificar: true },
            { medId: null, nome: 'Encaminhamento de gestante exposta ao pré-natal', esquema: 'Sorologia e acompanhamento conforme protocolo obstétrico', quando: 'Gestante suscetível exposta, principal risco da rubéola', obs: 'A gravidade da rubéola está na síndrome da rubéola congênita, não no caso índice.' }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: null, nome: 'Ácido acetilsalicílico (AAS)', esquema: '', quando: '', obs: 'Evitar em virose exantemática pela associação com síndrome de Reye e pelo risco de sangramento na púrpura pós-infecciosa.' },
            { medId: null, nome: 'Antibiótico para o exantema febril', esquema: '', quando: '', obs: 'Não indicado. O exantema da rubéola é viral e o antibiótico apenas expõe a criança a eventos adversos e a confusão com exantema medicamentoso.' },
            { medId: 'ibuprofeno', nome: 'Anti-inflamatório na vigência de plaquetopenia', esquema: '', quando: '', obs: 'Evitar na púrpura trombocitopênica pós-rubéola, pelo risco de sangramento.' },
            { medId: null, nome: 'Vacinar gestante como bloqueio', esquema: '', quando: '', obs: 'Contraindicado. A proteção da gestante suscetível exposta é feita por afastamento do caso e acompanhamento no pré-natal.' }
          ] }
      ],
      naoFarmacologico: [
        'Notificação imediata e investigação de contatos, com verificação da situação vacinal e sorológica das gestantes expostas.',
        'Afastamento de creche, escola e atividades coletivas até 7 dias após o início do exantema.',
        'Evitar rigorosamente contato com gestantes suscetíveis durante todo o período de transmissibilidade.',
        'Recém-nascido com suspeita de rubéola congênita: precauções de contato prolongadas e avaliação auditiva, oftalmológica, cardiológica e neurológica.',
        'Revisão da cobertura vacinal da família e da comunidade.'
      ],
      fontes: [ { nome: 'Ministério da Saúde - Guia de vigilância em saúde, rubéola e síndrome da rubéola congênita', ano: 2023 }, { nome: 'OPAS - Eliminação do sarampo e da rubéola nas Américas', ano: 2022 } ],
      atualizadoEm: '2026-09'
    },

    varicela: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - medidas gerais e conforto', tipo: 'primeira',
          opcoes: [
            { medId: 'paracetamol', nome: 'Paracetamol', esquema: '10 a 15 mg/kg/dose VO a cada 6 h, conforme bula', quando: 'Febre e dor na criança previamente hígida', obs: 'Antitérmico de escolha na varicela.' },
            { medId: null, nome: 'Cuidados com a pele', esquema: 'Banho diário com água e sabonete neutro, unhas curtas e limpas, roupas leves', quando: 'Todos os casos', obs: 'Não usar talco, pomadas com corante nem preparações caseiras sobre as lesões.' }
          ] },
        { ordem: 2, rotulo: 'Antiviral em grupos de maior risco', tipo: 'alternativa',
          opcoes: [
            { medId: null, nome: 'Aciclovir oral', esquema: '20 mg/kg/dose VO 4 vezes ao dia, máximo 800 mg por dose, por 5 dias, iniciado idealmente nas primeiras 24 a 48 h do exantema', quando: 'Avaliar em grupos de maior risco: maiores de 12 anos, segundo caso no domicílio, doença cutânea ou pulmonar crônica, uso de corticoide sistêmico ou de ácido acetilsalicílico crônico', obs: 'Não indicado de rotina na criança previamente hígida maior de 2 anos com quadro leve. Confirmar conforme protocolo do serviço e bula.', verificar: true },
            { medId: null, nome: 'Aciclovir intravenoso', esquema: '10 mg/kg/dose IV a cada 8 h, equivalente a 30 mg/kg/dia, por 7 a 10 dias, com hidratação adequada', quando: 'Imunossuprimidos, recém-nascidos e formas complicadas: pneumonia, encefalite, varicela disseminada', obs: 'Manter boa hidratação pelo risco de nefrotoxicidade. Confirmar conforme protocolo do serviço e bula.', verificar: true }
          ] },
        { ordem: 3, rotulo: 'Segunda linha - infecção bacteriana secundária de pele', tipo: 'segunda',
          opcoes: [
            { medId: 'cefalexina', nome: 'Cefalexina', esquema: '50 a 100 mg/kg/dia VO dividida a cada 6 h por 7 a 10 dias, conforme protocolo', quando: 'Infecção bacteriana secundária de pele não complicada, complicação mais frequente da varicela', obs: 'Novo pico febril após o terceiro dia sugere infecção secundária e motiva reavaliação.' },
            { medId: 'amoxicilina_clavulanato', nome: 'Amoxicilina + clavulanato', esquema: '45 a 50 mg/kg/dia do componente amoxicilina VO dividida a cada 12 h por 7 a 10 dias', quando: 'Piodermite extensa ou falha da cefalexina', obs: '' },
            { medId: 'ceftriaxona', nome: 'Ceftriaxona', esquema: '50 a 100 mg/kg/dia IV, associada a cobertura antiestafilocócica conforme protocolo do serviço', quando: 'Celulite extensa ou infecção invasiva com necessidade de internação', obs: 'Fasciíte necrotizante e choque tóxico exigem avaliação cirúrgica imediata.' }
          ] },
        { ordem: 4, rotulo: 'Adjuvante - prurido e profilaxia pós-exposição', tipo: 'adjuvante',
          opcoes: [
            { medId: null, nome: 'Anti-histamínico oral', esquema: 'Dose conforme idade, peso e bula do produto disponível', quando: 'Prurido intenso que leva à escoriação e à infecção secundária', obs: 'Confirmar conforme protocolo/bula.', verificar: true },
            { medId: null, nome: 'Vacina varicela (monovalente ou tetraviral)', esquema: 'Contato suscetível a partir de 9 meses, em até 5 dias da exposição, preferencialmente nas primeiras 72 h', quando: 'Profilaxia pós-exposição de contatos suscetíveis', obs: 'Confirmar conforme o Calendário Nacional e o CRIE.', verificar: true },
            { medId: null, nome: 'Imunoglobulina humana anti-varicela-zóster (IGHAVZ)', esquema: 'Preferencialmente em até 96 h da exposição, dose conforme protocolo do CRIE e bula', quando: 'Suscetíveis de alto risco: imunossuprimidos, gestantes, recém-nascido de mãe com varicela de 5 dias antes a 2 dias após o parto, prematuros conforme critério', obs: 'Confirmar conforme protocolo/bula e disponibilidade no CRIE. Em comunidade distante, acionar a referência precocemente pelo prazo curto.', verificar: true }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: null, nome: 'Ácido acetilsalicílico (AAS) na varicela', esquema: '', quando: '', obs: 'Contraindicado. A associação entre salicilato, varicela e síndrome de Reye é clássica e bem documentada, com encefalopatia e disfunção hepática graves. Substituir por paracetamol.' },
            { medId: 'ibuprofeno', nome: 'Ibuprofeno e outros anti-inflamatórios não esteroidais na fase aguda', esquema: '', quando: '', obs: 'Evitar na varicela pela associação descrita com infecção invasiva de pele e partes moles, incluindo fasciíte necrotizante por Streptococcus pyogenes.' },
            { medId: null, nome: 'Talco, pomadas com corante, mertiolate e preparações caseiras sobre as lesões', esquema: '', quando: '', obs: 'Práticas comuns que mascaram a evolução das lesões, dificultam a avaliação de infecção secundária e causam dermatite de contato.' },
            { medId: null, nome: 'Aciclovir de rotina na criança hígida com quadro leve', esquema: '', quando: '', obs: 'Benefício clínico pequeno e sem impacto em complicações na criança previamente hígida. Reservar para os grupos de risco e para as formas graves.' },
            { medId: null, nome: 'Liberar para creche ou escola antes de todas as lesões estarem em crosta', esquema: '', quando: '', obs: 'Mantém a transmissão. O afastamento vai até que todas as lesões estejam em crosta.' }
          ] }
      ],
      naoFarmacologico: [
        'Isolamento domiciliar e afastamento de creche e escola até que todas as lesões estejam em crosta; no hospital, precauções de aerossol e contato.',
        'Banho diário, unhas curtas e roupas leves para reduzir escoriação e infecção secundária.',
        'Hidratação oral e dieta pastosa e fria quando houver lesões orais dolorosas.',
        'Vigilância de novo pico febril, que deve motivar reavaliação imediata por suspeita de complicação bacteriana.',
        'Identificação precoce de contatos de alto risco no domicílio e na comunidade, para profilaxia dentro do prazo.'
      ],
      fontes: [ { nome: 'Sociedade Brasileira de Pediatria - Documento científico sobre varicela', ano: 2022 }, { nome: 'Ministério da Saúde - Manual dos Centros de Referência para Imunobiológicos Especiais (CRIE)', ano: 2023 } ],
      atualizadoEm: '2026-09'
    },

    exantema_subito: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - sintomático', tipo: 'primeira',
          opcoes: [
            { medId: 'paracetamol', nome: 'Paracetamol', esquema: '10 a 15 mg/kg/dose VO a cada 6 h, conforme bula', quando: 'Febre alta na fase pré-exantemática, que é a queixa principal', obs: 'O objetivo é o conforto da criança, não a normalização estrita da temperatura.' },
            { medId: 'sais_reidratacao_oral', nome: 'Sais de reidratação oral', esquema: 'Conforme plano A do Ministério da Saúde', quando: 'Diarreia associada ou risco de desidratação pela febre alta', obs: 'Manter aleitamento materno e alimentação conforme aceitação.' }
          ] },
        { ordem: 2, rotulo: 'Alternativa antitérmica', tipo: 'alternativa',
          opcoes: [
            { medId: 'dipirona', nome: 'Dipirona', esquema: '10 a 15 mg/kg/dose VO a cada 6 h, conforme bula', quando: 'Alternativa quando o paracetamol não controla o desconforto ou não está disponível', obs: 'Não usar em menores de 3 meses ou abaixo de 5 kg.' },
            { medId: 'ibuprofeno', nome: 'Ibuprofeno', esquema: '5 a 10 mg/kg/dose VO a cada 6 a 8 h, conforme bula', quando: 'Alternativa antitérmica e analgésica', obs: 'Evitar em desidratação, sangramento ou suspeita de dengue, diagnóstico diferencial relevante em área endêmica.' }
          ] },
        { ordem: 3, rotulo: 'Situação especial', tipo: 'segunda',
          opcoes: [
            { medId: null, nome: 'Conduta antiviral definida por infectologia', esquema: 'Indicação, fármaco e dose definidos por serviço especializado', quando: 'Imunossuprimidos ou quadros graves atribuídos ao herpes-vírus humano 6', obs: 'Não há indicação de antiviral na criança imunocompetente. Confirmar conforme protocolo do serviço.', verificar: true }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: null, nome: 'Antibiótico no exantema súbito', esquema: '', quando: '', obs: 'Não tem indicação. Causa frequente de erro: a febre alta por 3 a 5 dias leva à prescrição de antibiótico e, quando o exantema surge justamente com a queda da febre, ele é interpretado como alergia ao antibiótico, rotulando a criança indevidamente como alérgica por anos.' },
            { medId: null, nome: 'Banhos gelados, álcool e compressas frias agressivas', esquema: '', quando: '', obs: 'Causam desconforto, tremor e vasoconstrição, sem reduzir a febre de forma sustentada. O álcool ainda tem risco de absorção e intoxicação.' },
            { medId: null, nome: 'Alternância rotineira de dois antitérmicos sem orientação', esquema: '', quando: '', obs: 'Aumenta o risco de erro de dose e de intoxicação, sem benefício comprovado sobre o conforto.' },
            { medId: null, nome: 'Anticonvulsivante profilático após crise febril simples', esquema: '', quando: '', obs: 'Não indicado. A crise febril simples é benigna. A conduta é orientar a família sobre o manejo da crise e os sinais de alarme.' }
          ] }
      ],
      naoFarmacologico: [
        'Orientação estruturada sobre crise febril: decúbito lateral, não conter os movimentos, não colocar nada na boca, marcar o tempo e procurar atendimento.',
        'Hidratação oral frequente e manutenção do aleitamento materno.',
        'Explicar o padrão da doença: febre alta por 3 a 5 dias com criança em bom estado geral e exantema que surge quando a febre cede.',
        'Reavaliação obrigatória se a febre persistir além de 5 dias ou se surgir qualquer sinal de alarme.',
        'Evitar exames e antibióticos desnecessários quando o quadro é típico e a criança está em bom estado geral.'
      ],
      fontes: [ { nome: 'Sociedade Brasileira de Pediatria - Documento científico sobre exantemas na infância', ano: 2022 }, { nome: 'Ministério da Saúde - Guia de vigilância em saúde, doenças exantemáticas', ano: 2023 } ],
      atualizadoEm: '2026-09'
    },

    eritema_infeccioso: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - sintomático na forma clássica', tipo: 'primeira',
          opcoes: [
            { medId: 'paracetamol', nome: 'Paracetamol', esquema: '10 a 15 mg/kg/dose VO a cada 6 h, conforme bula', quando: 'Febre e dor, quando presentes, na forma clássica e autolimitada', obs: 'Não há antiviral específico e a maioria dos casos não exige medicação.' }
          ] },
        { ordem: 2, rotulo: 'Alternativa para febre, dor e artralgia', tipo: 'alternativa',
          opcoes: [
            { medId: 'dipirona', nome: 'Dipirona', esquema: '10 a 15 mg/kg/dose VO a cada 6 h, conforme bula', quando: 'Alternativa antitérmica e analgésica', obs: 'Não usar em menores de 3 meses ou abaixo de 5 kg.' },
            { medId: 'ibuprofeno', nome: 'Ibuprofeno', esquema: '5 a 10 mg/kg/dose VO a cada 6 a 8 h, conforme bula', quando: 'Artralgia e artrite, mais frequentes em adolescentes e em meninas', obs: 'Evitar se houver plaquetopenia, sangramento ou suspeita de dengue.' }
          ] },
        { ordem: 3, rotulo: 'Segunda linha - crise aplástica transitória', tipo: 'segunda',
          opcoes: [
            { medId: null, nome: 'Concentrado de hemácias', esquema: 'Transfusão conforme limiar clínico e protocolo do serviço de hemoterapia', quando: 'Crise aplástica transitória com anemia sintomática, sobretudo em criança com anemia falciforme, esferocitose ou outra hemólise crônica', obs: 'Monitorizar hemoglobina e reticulócitos. Manter precaução de gotículas, pois esses pacientes são altamente transmissíveis, ao contrário do caso clássico já exantemático.' }
          ] },
        { ordem: 4, rotulo: 'Uso off-label', tipo: 'offlabel',
          opcoes: [
            { medId: null, nome: 'Imunoglobulina humana intravenosa', esquema: 'Indicação, dose e duração definidas por hematologia e infectologia', quando: 'Aplasia pura de série vermelha persistente por parvovírus B19 em criança imunossuprimida', obs: 'Off-label: a imunoglobulina intravenosa não tem registro em bula para infecção por parvovírus B19. O uso é apoiado por séries de casos e por recomendações de sociedades de hematologia, com base na ausência de anticorpos neutralizantes próprios nesses pacientes. Confirmar conforme protocolo do serviço e bula.', verificar: true }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: null, nome: 'Antibiótico na forma clássica', esquema: '', quando: '', obs: 'Não indicado. O exantema em face esbofeteada e rendilhado é viral, e a prescrição leva a rótulo equivocado de alergia medicamentosa.' },
            { medId: 'prednisolona', nome: 'Corticoide na forma clássica', esquema: '', quando: '', obs: 'Sem indicação. O exantema é imunomediado e autolimitado.' },
            { medId: null, nome: 'Afastamento escolar após o surgimento do exantema', esquema: '', quando: '', obs: 'Desnecessário. A transmissibilidade ocorre na fase prodrômica, antes do exantema. O afastamento apenas prejudica a criança sem benefício epidemiológico.' },
            { medId: null, nome: 'Tranquilizar gestante exposta sem encaminhamento', esquema: '', quando: '', obs: 'A gestante exposta precisa de sorologia e de acompanhamento ecográfico no pré-natal de alto risco, pelo risco de hidropisia fetal.' }
          ] }
      ],
      naoFarmacologico: [
        'Orientar que o exantema pode recidivar por semanas com sol, calor e exercício, sem significar reinfecção nem falha de tratamento.',
        'Hidratação e manutenção das atividades habituais, sem indicação de repouso prolongado.',
        'Identificação de crianças com hemólise crônica na família e na comunidade, que são o grupo de risco para crise aplástica.',
        'Encaminhamento de gestante exposta ou infectada ao pré-natal de alto risco.',
        'Precaução de gotículas apenas nos casos de crise aplástica e em imunossuprimidos, que eliminam vírus de forma prolongada.'
      ],
      fontes: [ { nome: 'Sociedade Brasileira de Pediatria - Documento científico sobre exantemas na infância', ano: 2022 }, { nome: 'Ministério da Saúde - Guia de vigilância em saúde, doenças exantemáticas', ano: 2023 } ],
      atualizadoEm: '2026-09'
    },

    mao_pe_boca: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - analgesia programada e hidratação', tipo: 'primeira',
          opcoes: [
            { medId: 'paracetamol', nome: 'Paracetamol', esquema: '10 a 15 mg/kg/dose VO a cada 6 h, conforme bula, administrado cerca de 30 min antes das refeições', quando: 'Dor oral e febre, principal obstáculo à aceitação de líquidos', obs: 'A analgesia programada, e não conforme a necessidade, é o que permite manter a hidratação e evitar internação.' },
            { medId: 'sais_reidratacao_oral', nome: 'Sais de reidratação oral', esquema: 'Pequenos volumes frequentes, conforme plano A ou B do Ministério da Saúde', quando: 'Prevenção e tratamento da desidratação', obs: 'Oferecer líquidos gelados, sorvete, gelatina, leite e iogurte; evitar sucos ácidos, alimentos salgados, quentes ou condimentados.' }
          ] },
        { ordem: 2, rotulo: 'Alternativa analgésica', tipo: 'alternativa',
          opcoes: [
            { medId: 'dipirona', nome: 'Dipirona', esquema: '10 a 15 mg/kg/dose VO ou IV a cada 6 h, conforme bula', quando: 'Alternativa quando o paracetamol não controla a dor oral ou quando a via oral está muito comprometida', obs: 'Não usar em menores de 3 meses ou abaixo de 5 kg.' },
            { medId: 'ibuprofeno', nome: 'Ibuprofeno', esquema: '5 a 10 mg/kg/dose VO a cada 6 a 8 h, conforme bula', quando: 'Alternativa analgésica com componente anti-inflamatório', obs: 'Evitar se houver desidratação instalada.' }
          ] },
        { ordem: 3, rotulo: 'Segunda linha - recusa oral e desidratação', tipo: 'segunda',
          opcoes: [
            { medId: 'soro_fisiologico', nome: 'Soro fisiológico 0,9%', esquema: 'Expansão e hidratação venosa conforme plano C ou protocolo do serviço', quando: 'Recusa completa da via oral ou desidratação moderada a grave', obs: 'Reavaliar a analgesia, pois a recusa em geral é por dor e não por intolerância.' },
            { medId: 'ringer_lactato', nome: 'Ringer lactato', esquema: 'Alternativa cristaloide para expansão, conforme protocolo do serviço', quando: 'Alternativa ao soro fisiológico na desidratação moderada a grave', obs: '' },
            { medId: 'cefalexina', nome: 'Cefalexina', esquema: '50 a 100 mg/kg/dia VO dividida a cada 6 h por 7 dias, conforme protocolo', quando: 'Infecção bacteriana secundária das lesões cutâneas', obs: 'Apenas com sinais de infecção secundária, não de rotina.' }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: null, nome: 'Antibiótico na doença mão-pé-boca', esquema: '', quando: '', obs: 'Etiologia viral, por enterovírus e coxsackievírus. Antibiótico não altera a evolução e expõe a criança a efeitos adversos.' },
            { medId: null, nome: 'Soluções orais com anestésico tópico em lactentes', esquema: '', quando: '', obs: 'Evitar pelo risco de aspiração, de perda do reflexo de proteção da via aérea e de toxicidade sistêmica, incluindo metemoglobinemia com benzocaína. Em crianças maiores, apenas conforme prescrição e bula.' },
            { medId: null, nome: 'Corticoide tópico nas lesões orais e preparações caseiras', esquema: '', quando: '', obs: 'Sem benefício comprovado e com risco de agravar a lesão e de infecção secundária.' },
            { medId: null, nome: 'Exigir desaparecimento completo das lesões para retorno à creche', esquema: '', quando: '', obs: 'O retorno não depende do desaparecimento das lesões nem da eliminação viral fecal, que é prolongada. O critério é ausência de febre, de sialorreia por dor e de lesões vesiculares ativas.' }
          ] }
      ],
      naoFarmacologico: [
        'Analgesia em horários regulares, cerca de 30 min antes das refeições, para viabilizar a aceitação oral.',
        'Oferta de alimentos frios, pastosos e não ácidos, com líquidos em pequenos volumes e alta frequência.',
        'Higiene das lesões cutâneas com água e sabonete neutro.',
        'Monitorar sinais neurológicos e cardíacos, como mioclonias, ataxia, sonolência e taquicardia desproporcional, que indicam internação e avaliação especializada.',
        'Orientar sobre a descamação de mãos e pés e a possível queda de unhas semanas depois, fenômenos benignos que não exigem tratamento.'
      ],
      fontes: [ { nome: 'Sociedade Brasileira de Pediatria - Documento científico sobre exantemas na infância', ano: 2022 }, { nome: 'OPAS - Vigilância de enterovírus e doença mão-pé-boca', ano: 2023 } ],
      atualizadoEm: '2026-09'
    },

    escarlatina: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha', tipo: 'primeira',
          opcoes: [
            { medId: 'penicilina_benzatina', nome: 'Penicilina G benzatina', esquema: 'Dose única IM: 600.000 UI se peso abaixo de 27 kg e 1.200.000 UI se peso igual ou acima de 27 kg. Observar por 30 min após a aplicação', quando: 'Escarlatina confirmada ou com forte suspeita clínica, sobretudo quando há risco de baixa adesão ao esquema oral', obs: 'Dose única supervisionada resolve o problema da adesão e é a opção preferencial em comunidade ribeirinha ou indígena com retorno difícil.' },
            { medId: 'amoxicilina', nome: 'Amoxicilina', esquema: '50 mg/kg/dia VO, máximo 1 g ao dia, em 1 ou 2 tomadas por 10 dias', quando: 'Alternativa oral de primeira escolha, com boa aceitação em crianças pequenas', obs: 'A duração de 10 dias é essencial para a erradicação e não deve ser encurtada, mesmo com melhora rápida dos sintomas.' }
          ] },
        { ordem: 2, rotulo: 'Alternativa em alergia a penicilina', tipo: 'alternativa',
          opcoes: [
            { medId: 'cefalexina', nome: 'Cefalexina', esquema: '40 a 50 mg/kg/dia VO dividida a cada 12 h, máximo 1 g ao dia, por 10 dias', quando: 'Alergia não anafilática à penicilina', obs: 'Evitar se houve anafilaxia, angioedema ou reação cutânea grave a betalactâmico.' },
            { medId: 'azitromicina', nome: 'Azitromicina', esquema: '12 mg/kg/dia VO uma vez ao dia, máximo 500 mg ao dia, por 5 dias, conforme bula', quando: 'Alergia grave à penicilina', obs: 'Considerar o perfil de resistência local dos estreptococos a macrolídeos.' },
            { medId: 'claritromicina', nome: 'Claritromicina', esquema: '15 mg/kg/dia VO dividida a cada 12 h, máximo 500 mg por dose, por 10 dias', quando: 'Alternativa de macrolídeo em alergia grave à penicilina', obs: '' }
          ] },
        { ordem: 3, rotulo: 'Segunda linha - falha terapêutica ou forma invasiva', tipo: 'segunda',
          opcoes: [
            { medId: null, nome: 'Reavaliação em 48 a 72 h antes de trocar o antibiótico', esquema: '', quando: 'Persistência da febre após 48 a 72 h de antibiótico adequado', obs: 'Investigar complicação supurativa, como abscesso periamigdaliano e adenite supurada, má adesão ou diagnóstico alternativo, como mononucleose.' },
            { medId: 'penicilina_cristalina', nome: 'Penicilina G cristalina', esquema: '200.000 a 400.000 UI/kg/dia IV dividida a cada 4 ou 6 h, associada a clindamicina, conforme protocolo do serviço', quando: 'Infecção invasiva ou síndrome do choque tóxico estreptocócico, com internação', obs: 'A associação com clindamicina reduz a produção de toxinas. Expansão volêmica e avaliação cirúrgica são parte do manejo.' }
          ] },
        { ordem: 4, rotulo: 'Adjuvante / sintomático', tipo: 'adjuvante',
          opcoes: [
            { medId: 'paracetamol', nome: 'Paracetamol', esquema: '10 a 15 mg/kg/dose VO a cada 6 h, conforme bula', quando: 'Dor de garganta e febre', obs: '' },
            { medId: 'ibuprofeno', nome: 'Ibuprofeno', esquema: '5 a 10 mg/kg/dose VO a cada 6 a 8 h, conforme bula', quando: 'Odinofagia importante', obs: 'Evitar diante de suspeita de infecção invasiva de pele e partes moles ou de desidratação.' }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: 'amoxicilina', nome: 'Encurtar o curso oral para menos de 10 dias', esquema: '', quando: '', obs: 'A erradicação do estreptococo e a prevenção da febre reumática dependem dos 10 dias completos. A melhora clínica ocorre bem antes e não autoriza a suspensão.' },
            { medId: 'prednisolona', nome: 'Corticoide de rotina', esquema: '', quando: '', obs: 'Sem indicação. Reservar para obstrução de via aérea conforme avaliação especializada.' },
            { medId: null, nome: 'Tratamento de portadores assintomáticos de rotina', esquema: '', quando: '', obs: 'Não indicado. O portador assintomático tem baixo risco de complicação e de transmissão, e o tratamento gera uso desnecessário de antibiótico.' },
            { medId: null, nome: 'Dispensar a vigilância de complicações após a alta', esquema: '', quando: '', obs: 'Orientar retorno em 1 a 3 semanas para sinais de glomerulonefrite, como edema, urina escura e oligúria, e em 2 a 4 semanas para febre reumática, como artrite, cardite e coreia.' }
          ] }
      ],
      naoFarmacologico: [
        'Hidratação oral, dieta leve e fria, com atenção à aceitação de líquidos.',
        'Retorno à escola cerca de 24 h após o início do antibiótico eficaz, se a criança estiver afebril.',
        'Avaliação e tratamento de contatos domiciliares sintomáticos.',
        'Orientação escrita sobre sinais de glomerulonefrite e de febre reumática, com data de retorno definida.',
        'Em comunidade de difícil acesso, preferir a dose única intramuscular e registrar o retorno combinado com o agente comunitário.'
      ],
      fontes: [ { nome: 'Sociedade Brasileira de Pediatria - Documento científico sobre infecções estreptocócicas', ano: 2022 }, { nome: 'OMS - Rheumatic fever and rheumatic heart disease, technical report', ano: 2021 } ],
      atualizadoEm: '2026-09'
    },

    coqueluche: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - tratamento e quimioprofilaxia', tipo: 'primeira',
          opcoes: [
            { medId: 'azitromicina', nome: 'Azitromicina', esquema: 'Menores de 6 meses: 10 mg/kg/dia VO uma vez ao dia por 5 dias. Maiores de 6 meses: 10 mg/kg no 1o dia, máximo 500 mg, e 5 mg/kg/dia do 2o ao 5o dia, máximo 250 mg ao dia', quando: 'Tratamento do caso e quimioprofilaxia dos contatos, em qualquer idade, inclusive no menor de 1 mês', obs: 'Macrolídeo preferido no menor de 1 mês, situação em que a eritromicina é evitada pelo risco de estenose hipertrófica de piloro. Iniciada na fase catarral pode atenuar a evolução; após os paroxismos, mantém indicação para bloquear a transmissão.' }
          ] },
        { ordem: 2, rotulo: 'Alternativa quando o macrolídeo de escolha não está disponível ou é contraindicado', tipo: 'alternativa',
          opcoes: [
            { medId: 'claritromicina', nome: 'Claritromicina', esquema: '15 mg/kg/dia VO dividida a cada 12 h, máximo 1 g ao dia, por 7 dias', quando: 'Alternativa em maiores de 1 mês, inclusive quando a azitromicina não está disponível na unidade', obs: '' },
            { medId: 'sulfametoxazol_trimetoprim', nome: 'Sulfametoxazol + trimetoprima', esquema: '40 mg/kg/dia de sulfametoxazol e 8 mg/kg/dia de trimetoprima VO dividida a cada 12 h por 14 dias', quando: 'Alternativa em maiores de 2 meses com contraindicação ou intolerância a macrolídeos', obs: 'Contraindicado em menores de 2 meses e na deficiência de G6PD.' }
          ] },
        { ordem: 3, rotulo: 'Uso off-label', tipo: 'offlabel',
          opcoes: [
            { medId: 'azitromicina', nome: 'Azitromicina em recém-nascido e lactente menor de 6 meses', esquema: '10 mg/kg/dia VO uma vez ao dia por 5 dias', quando: 'Coqueluche confirmada ou suspeita, e quimioprofilaxia, em recém-nascido e lactente pequeno, faixa de maior letalidade', obs: 'Off-label: a bula brasileira não contempla essa faixa etária. A recomendação é explícita no Guia de Vigilância em Saúde e nas orientações do CDC, que preferem a azitromicina à eritromicina abaixo de 1 mês pelo menor risco de estenose hipertrófica de piloro. Monitorar vômitos em jato e ganho de peso nas semanas seguintes. Confirmar conforme protocolo e bula.', verificar: true }
          ] },
        { ordem: 4, rotulo: 'Adjuvante - suporte do lactente', tipo: 'adjuvante',
          opcoes: [
            { medId: 'soro_fisiologico', nome: 'Soro fisiológico 0,9%', esquema: 'Aspiração e higiene nasal suave antes das mamadas, e hidratação venosa quando houver intolerância oral, conforme protocolo do serviço', quando: 'Obstrução nasal e vômitos pós-tosse no lactente', obs: 'Aspiração suave, pois manipulação excessiva desencadeia paroxismos.' },
            { medId: 'paracetamol', nome: 'Paracetamol', esquema: '10 a 15 mg/kg/dose VO a cada 6 h, conforme bula', quando: 'Desconforto ou febre associada', obs: 'Febre alta não é típica da coqueluche e sugere complicação, como pneumonia bacteriana.' },
            { medId: null, nome: 'Vacina penta, DTP e dTpa', esquema: 'Esquema básico aos 2, 4 e 6 meses com reforços aos 15 meses e 4 anos; dTpa em gestantes a cada gestação a partir da 20a semana e em profissionais de saúde', quando: 'Atualização do esquema da criança e dos contatos, e estratégia do casulo em torno do lactente', obs: 'A doença não confere imunidade duradoura, a vacinação segue indicada após o episódio. Confirmar conforme o Calendário Nacional de Vacinação.', verificar: true }
          ] },
        { ordem: 5, rotulo: 'Segunda linha - coqueluche maligna', tipo: 'segunda',
          opcoes: [
            { medId: null, nome: 'Suporte intensivo com manejo de hipertensão pulmonar e consideração de exsanguineotransfusão ou leucoaférese', esquema: 'Indicação e técnica conforme protocolo do serviço de referência', quando: 'Coqueluche maligna do lactente: hiperleucocitose, hipertensão pulmonar, insuficiência respiratória e choque', obs: 'Letalidade alta. Transferir precocemente para unidade de terapia intensiva pediátrica antes da deterioração. Confirmar conforme protocolo do serviço de referência.', verificar: true }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: 'salbutamol', nome: 'Broncodilatadores na coqueluche', esquema: '', quando: '', obs: 'Sem benefício comprovado sobre os paroxismos, conforme revisões sistemáticas. Reservar apenas para sibilância concomitante documentada.' },
            { medId: 'prednisolona', nome: 'Corticoide na coqueluche', esquema: '', quando: '', obs: 'Sem benefício comprovado sobre a duração ou a gravidade da tosse. Não recomendado de rotina.' },
            { medId: null, nome: 'Antitussígenos, anti-histamínicos e xaropes para a tosse', esquema: '', quando: '', obs: 'Sem eficácia demonstrada nos paroxismos e com risco de eventos adversos em lactentes, incluindo sedação e depressão respiratória.' },
            { medId: null, nome: 'Aguardar confirmação laboratorial para iniciar o antibiótico e a profilaxia dos contatos', esquema: '', quando: '', obs: 'O bloqueio da transmissão depende do início precoce. Iniciar na suspeita clínica e epidemiológica, conforme o Guia de Vigilância em Saúde.' },
            { medId: null, nome: 'Dispensar a vacinação após o episódio por acreditar em imunidade definitiva', esquema: '', quando: '', obs: 'A imunidade pós-doença não é duradoura. Atualizar o esquema da criança e dos contatos.' }
          ] }
      ],
      naoFarmacologico: [
        'Notificação imediata e investigação de comunicantes pela vigilância epidemiológica.',
        'Quimioprofilaxia de todos os contatos domiciliares e dos contatos próximos de risco: lactentes menores de 1 ano, gestantes no terceiro trimestre, imunossuprimidos, profissionais e crianças de creches.',
        'Isolamento respiratório por gotículas e afastamento de creche e escola até completar 5 dias de antibiótico eficaz.',
        'Monitorização cardiorrespiratória e oximetria contínua no lactente, com oxigênio durante e após os paroxismos e ambiente calmo.',
        'Alimentação fracionada em pequenos volumes após os paroxismos, com sonda ou hidratação venosa se vômitos repetidos ou risco de aspiração.'
      ],
      fontes: [ { nome: 'Ministério da Saúde - Guia de vigilância em saúde, coqueluche', ano: 2023 }, { nome: 'Sociedade Brasileira de Pediatria - Documento científico sobre coqueluche', ano: 2022 } ],
      atualizadoEm: '2026-09'
    },
    mononucleose: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - suporte', tipo: 'primeira',
          opcoes: [
            { medId: 'paracetamol', nome: 'Paracetamol', esquema: '10 a 15 mg/kg/dose VO a cada 6 h, conforme bula', quando: 'Febre, odinofagia e mialgia', obs: 'O cuidado é de suporte, com repouso relativo conforme a tolerância e hidratação.' },
            { medId: 'sais_reidratacao_oral', nome: 'Sais de reidratação oral', esquema: 'Conforme plano A do Ministério da Saúde', quando: 'Ingestão reduzida pela odinofagia', obs: 'Dieta leve, fria e pastosa enquanto houver dor de garganta.' }
          ] },
        { ordem: 2, rotulo: 'Alternativa analgésica e antitérmica', tipo: 'alternativa',
          opcoes: [
            { medId: 'dipirona', nome: 'Dipirona', esquema: '10 a 15 mg/kg/dose VO ou IV a cada 6 h, conforme bula', quando: 'Alternativa quando o paracetamol não controla a dor ou a febre', obs: 'Não usar em menores de 3 meses ou abaixo de 5 kg.' },
            { medId: 'ibuprofeno', nome: 'Ibuprofeno', esquema: '5 a 10 mg/kg/dose VO a cada 6 a 8 h, conforme bula', quando: 'Odinofagia e mialgia importantes', obs: 'Evitar se houver plaquetopenia, sangramento ou hepatite significativa.' }
          ] },
        { ordem: 3, rotulo: 'Uso off-label - situações selecionadas', tipo: 'offlabel',
          opcoes: [
            { medId: 'prednisolona', nome: 'Prednisolona em obstrução de via aérea ou citopenia grave', esquema: '1 a 2 mg/kg/dia VO, máximo 60 mg ao dia, por curto período, conforme avaliação especializada', quando: 'Obstrução de via aérea superior por hipertrofia amigdaliana, anemia hemolítica grave ou plaquetopenia grave', obs: 'Off-label para mononucleose: o corticoide não tem registro em bula para essa indicação e os ensaios clínicos não mostram benefício sobre os sintomas habituais. O uso se apoia em séries de casos e na prática consagrada para as complicações citadas, nas quais o risco justifica a intervenção. Confirmar conforme protocolo do serviço e bula.', verificar: true },
            { medId: 'dexametasona', nome: 'Dexametasona em obstrução de via aérea superior', esquema: 'Dose e via conforme protocolo do serviço', quando: 'Alternativa parenteral ao corticoide oral na obstrução de via aérea por hipertrofia amigdaliana', obs: 'Mesma condição off-label da prednisolona nessa indicação. Confirmar conforme protocolo do serviço e bula.', verificar: true }
          ] },
        { ordem: 4, rotulo: 'Segunda linha - complicações', tipo: 'segunda',
          opcoes: [
            { medId: null, nome: 'Internação com monitorização e suporte de via aérea', esquema: 'Conforme protocolo do serviço', quando: 'Obstrução respiratória, desidratação por recusa oral, citopenias graves ou hepatite significativa', obs: 'Monitorizar hemograma e transaminases. Ruptura esplênica é rara, porém potencialmente fatal, e costuma ocorrer nas primeiras 3 a 4 semanas.' }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: 'prednisolona', nome: 'Corticoide na mononucleose sem obstrução de via aérea', esquema: '', quando: '', obs: 'Não recomendado. Ensaios clínicos não mostram benefício sobre febre, odinofagia ou tempo de doença, e há preocupação com imunossupressão em infecção viral ativa. Reservar para obstrução de via aérea e citopenias graves.' },
            { medId: 'amoxicilina', nome: 'Amoxicilina e ampicilina na suspeita de mononucleose', esquema: '', quando: '', obs: 'Evitar pelo alto risco de exantema maculopapular extenso, que não é alergia verdadeira mas leva a rótulo permanente e equivocado de alergia a penicilina. Se houver faringite estreptocócica comprovada, preferir outro antibiótico conforme protocolo.' },
            { medId: null, nome: 'Aciclovir na mononucleose', esquema: '', quando: '', obs: 'Não indicado. Reduz a eliminação viral orofaríngea sem alterar a evolução clínica.' },
            { medId: null, nome: 'Liberação precoce para esportes de contato', esquema: '', quando: '', obs: 'Restringir esportes de contato, lutas, educação física e atividades com risco de trauma abdominal por pelo menos 3 a 4 semanas do início dos sintomas, e por mais tempo se a esplenomegalia persistir, pelo risco de ruptura esplênica.' }
          ] }
      ],
      naoFarmacologico: [
        'Repouso relativo conforme tolerância, com retorno gradual às atividades.',
        'Restrição de esportes de contato e de trauma abdominal por 3 a 4 semanas, reavaliando a esplenomegalia.',
        'Dieta leve, fria e pastosa enquanto houver odinofagia, com hidratação frequente.',
        'Orientar que a fadiga pode persistir por semanas, o que evita investigações desnecessárias.',
        'Monitorar hemograma e transaminases nos casos com citopenias ou hepatite significativa.'
      ],
      fontes: [ { nome: 'Sociedade Brasileira de Pediatria - Documento científico sobre mononucleose infecciosa', ano: 2022 }, { nome: 'OPAS/OMS - Manejo de infecções virais na infância', ano: 2021 } ],
      atualizadoEm: '2026-09'
    },

    caxumba: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - analgesia e suporte', tipo: 'primeira',
          opcoes: [
            { medId: 'paracetamol', nome: 'Paracetamol', esquema: '10 a 15 mg/kg/dose VO a cada 6 h, conforme bula', quando: 'Dor parotídea e febre', obs: 'Não há antiviral específico. Compressas mornas ou frias conforme o alívio referido pela criança.' },
            { medId: 'ibuprofeno', nome: 'Ibuprofeno', esquema: '5 a 10 mg/kg/dose VO a cada 6 a 8 h, conforme bula', quando: 'Dor e inflamação, inclusive na orquite, em que o componente anti-inflamatório é útil', obs: 'Evitar se houver desidratação ou suspeita de dengue.' }
          ] },
        { ordem: 2, rotulo: 'Alternativa analgésica e hidratação', tipo: 'alternativa',
          opcoes: [
            { medId: 'dipirona', nome: 'Dipirona', esquema: '10 a 15 mg/kg/dose VO ou IV a cada 6 h, conforme bula', quando: 'Alternativa quando o paracetamol não controla a dor ou a via oral está comprometida', obs: 'Não usar em menores de 3 meses ou abaixo de 5 kg.' },
            { medId: 'soro_fisiologico', nome: 'Soro fisiológico 0,9%', esquema: 'Hidratação venosa conforme protocolo do serviço', quando: 'Vômitos ou recusa oral importante, inclusive na pancreatite', obs: '' }
          ] },
        { ordem: 3, rotulo: 'Segunda linha - parotidite bacteriana secundária', tipo: 'segunda',
          opcoes: [
            { medId: 'cefalexina', nome: 'Cefalexina', esquema: '50 a 100 mg/kg/dia VO dividida a cada 6 h, conforme protocolo do serviço', quando: 'Parotidite bacteriana secundária leve, com eritema, dor localizada e saída de secreção purulenta pelo ducto', obs: 'Cobertura para Staphylococcus aureus.' },
            { medId: 'amoxicilina_clavulanato', nome: 'Amoxicilina + clavulanato', esquema: '45 a 50 mg/kg/dia do componente amoxicilina VO dividida a cada 12 h, conforme protocolo do serviço', quando: 'Parotidite bacteriana com necessidade de cobertura para anaeróbios', obs: 'Avaliação cirúrgica se houver flutuação ou abscesso.' }
          ] },
        { ordem: 4, rotulo: 'Adjuvante - orquite e prevenção', tipo: 'adjuvante',
          opcoes: [
            { medId: null, nome: 'Repouso no leito, elevação e suspensão escrotal e compressas frias', esquema: '', quando: 'Orquite, complicação mais temida por adolescentes e familiares', obs: 'Avaliação urológica quando a dor for intensa ou houver dúvida com torção testicular, que é emergência cirúrgica.' },
            { medId: null, nome: 'Vacina tríplice viral ou tetraviral', esquema: 'Atualização conforme o Calendário Nacional de Vacinação e bloqueio de suscetíveis em situação de surto', quando: 'Atualização do esquema da criança e dos contatos', obs: 'A vacinação pós-exposição não previne a doença no contato já exposto, mas protege em exposições futuras. Confirmar conforme orientação da vigilância.', verificar: true }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: 'prednisolona', nome: 'Corticoide na orquite por caxumba', esquema: '', quando: '', obs: 'Não demonstrou prevenir atrofia testicular nem reduzir a duração dos sintomas. Não recomendado de rotina.' },
            { medId: null, nome: 'Antibiótico na parotidite viral', esquema: '', quando: '', obs: 'Não indicado. Reservar para parotidite bacteriana secundária, com eritema, flutuação ou secreção purulenta pelo ducto.' },
            { medId: null, nome: 'Alimentos ácidos e cítricos durante a parotidite', esquema: '', quando: '', obs: 'Estimulam a salivação e aumentam muito a dor. Orientar dieta pastosa e não ácida.' },
            { medId: null, nome: 'Dispensar avaliação audiológica diante de queixa auditiva', esquema: '', quando: '', obs: 'A caxumba pode causar surdez neurossensorial, habitualmente unilateral. Queixa de perda auditiva, zumbido ou desequilíbrio exige avaliação.' }
          ] }
      ],
      naoFarmacologico: [
        'Afastamento de creche, escola e atividades coletivas por 5 dias a partir do início do aumento da parótida, com isolamento por gotículas no hospital.',
        'Dieta pastosa, evitando alimentos ácidos, cítricos e que exijam muita mastigação.',
        'Higiene oral cuidadosa para reduzir o risco de infecção bacteriana secundária.',
        'Avaliação audiológica diante de queixa de perda auditiva, zumbido ou desequilíbrio.',
        'Verificação e atualização da situação vacinal da criança e dos contatos, com bloqueio em surtos.'
      ],
      fontes: [ { nome: 'Ministério da Saúde - Guia de vigilância em saúde, caxumba', ano: 2023 }, { nome: 'Sociedade Brasileira de Pediatria - Documento científico sobre parotidite infecciosa', ano: 2022 } ],
      atualizadoEm: '2026-09'
    },

    hepatite_a: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - suporte e vigilância de insuficiência hepática', tipo: 'primeira',
          opcoes: [
            { medId: 'sais_reidratacao_oral', nome: 'Sais de reidratação oral', esquema: 'Conforme plano A ou B do Ministério da Saúde', quando: 'Vômitos ou baixa aceitação oral na fase prodrômica', obs: 'Dieta livre conforme aceitação, com boa oferta calórica. A restrição rígida de gorduras não é necessária.' },
            { medId: 'soro_fisiologico', nome: 'Soro fisiológico 0,9% com glicose conforme necessidade', esquema: 'Hidratação venosa conforme protocolo do serviço, com monitorização de glicemia e eletrólitos', quando: 'Vômitos persistentes ou aceitação oral insuficiente', obs: 'Atenção à hipoglicemia, que é sinal de gravidade na hepatite aguda.' }
          ] },
        { ordem: 2, rotulo: 'Analgesia e antitérmico com cautela', tipo: 'alternativa',
          opcoes: [
            { medId: 'dipirona', nome: 'Dipirona', esquema: '10 a 15 mg/kg/dose VO ou IV a cada 6 h, conforme bula', quando: 'Febre e dor, conforme avaliação individual', obs: 'Alternativa ao paracetamol quando há preocupação com a função hepática.' },
            { medId: 'paracetamol', nome: 'Paracetamol', esquema: 'Apenas se necessário, na menor dose eficaz, respeitando intervalo e dose máxima da bula', quando: 'Febre e dor, com uso cauteloso na hepatite aguda', obs: 'Evitar em disfunção hepática significativa. Confirmar conforme protocolo/bula.', verificar: true }
          ] },
        { ordem: 3, rotulo: 'Uso off-label - prurido colestático', tipo: 'offlabel',
          opcoes: [
            { medId: null, nome: 'Colestiramina', esquema: 'Indicação e dose conforme avaliação de gastroenterologia pediátrica e bula', quando: 'Prurido colestático persistente e incapacitante na forma colestática prolongada', obs: 'Off-label: a bula registra hipercolesterolemia e, em alguns produtos, prurido por obstrução biliar parcial, não a hepatite A. O uso no prurido colestático é prática consagrada descrita em hepatologia pediátrica, com evidência de séries de casos. Interfere na absorção de vitaminas lipossolúveis e de outros medicamentos, exigindo espaçamento das tomadas. Confirmar conforme protocolo e bula.', verificar: true }
          ] },
        { ordem: 4, rotulo: 'Segunda linha - sinais de insuficiência hepática aguda', tipo: 'segunda',
          opcoes: [
            { medId: null, nome: 'Vitamina K (fitomenadiona)', esquema: 'Dose e via conforme protocolo do serviço e bula, com reavaliação do INR', quando: 'Alargamento do tempo de protrombina', obs: 'A piora do INR, sobretudo com encefalopatia, indica transferência imediata para serviço com suporte hepático. Confirmar conforme protocolo/bula.', verificar: true },
            { medId: null, nome: 'Transferência para serviço com suporte hepático', esquema: '', quando: 'INR em ascensão, hipoglicemia, sonolência, inversão do ciclo sono-vigília ou qualquer alteração de comportamento', obs: 'A hepatite fulminante é rara, mas a janela para transplante é estreita. Em município do interior, acionar a regulação precocemente.' }
          ] },
        { ordem: 5, rotulo: 'Adjuvante - profilaxia pós-exposição dos contatos', tipo: 'adjuvante',
          opcoes: [
            { medId: null, nome: 'Vacina hepatite A', esquema: 'Rotina aos 15 meses; profilaxia pós-exposição de contatos suscetíveis a partir de 12 meses, preferencialmente em até 14 dias da exposição', quando: 'Contatos domiciliares e próximos suscetíveis', obs: 'Confirmar conforme o Calendário Nacional de Vacinação e a orientação da vigilância.', verificar: true },
            { medId: null, nome: 'Imunoglobulina humana normal', esquema: 'Preferencialmente em até 14 dias da exposição, dose e via conforme protocolo do CRIE e bula', quando: 'Contatos menores de 12 meses, imunossuprimidos e hepatopatas crônicos', obs: 'Confirmar conforme protocolo/bula e disponibilidade no CRIE.', verificar: true }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: null, nome: 'Chás, garrafadas, plantas medicinais e medicamentos por conta própria', esquema: '', quando: '', obs: 'Prática muito comum na região e com risco real de agravar a lesão hepática, inclusive por hepatotoxicidade direta de algumas plantas. Orientar ativamente contra e perguntar de forma específica sobre o uso.' },
            { medId: 'ibuprofeno', nome: 'Anti-inflamatórios não esteroidais', esquema: '', quando: '', obs: 'Evitar na hepatite aguda pelo risco de sangramento digestivo e de lesão renal associada.' },
            { medId: null, nome: 'Repouso absoluto prolongado e dieta com restrição rígida de gorduras', esquema: '', quando: '', obs: 'Práticas antigas sem respaldo. O repouso é relativo, conforme a tolerância, e a dieta é livre, com boa oferta calórica.' },
            { medId: null, nome: 'Corticoide ou antiviral para hepatite A', esquema: '', quando: '', obs: 'Sem indicação e sem eficácia demonstrada. O cuidado é de suporte e de vigilância ativa.' }
          ] }
      ],
      naoFarmacologico: [
        'Precauções de contato e higiene rigorosa das mãos, com afastamento de creche e escola por 7 dias após o início da icterícia.',
        'Suspensão de medicamentos hepatotóxicos e desnecessários.',
        'Medidas gerais para o prurido colestático: banho morno, hidratante, unhas curtas.',
        'Investigação da fonte de contaminação, com acionamento da vigilância sanitária e epidemiológica, pois surtos por água e alimentos são comuns.',
        'Monitorização de INR, glicemia, bilirrubinas e transaminases nos casos com vômitos, icterícia intensa ou sinal de alarme.'
      ],
      fontes: [ { nome: 'Ministério da Saúde - Guia de vigilância em saúde, hepatites virais', ano: 2023 }, { nome: 'Sociedade Brasileira de Pediatria - Documento científico sobre hepatites virais na infância', ano: 2022 } ],
      atualizadoEm: '2026-09'
    },

    febre_tifoide: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha', tipo: 'primeira',
          opcoes: [
            { medId: 'ceftriaxona', nome: 'Ceftriaxona', esquema: '50 a 100 mg/kg/dia IV uma vez ao dia ou dividida a cada 12 h, máximo 2 a 4 g ao dia, por 10 a 14 dias, conforme protocolo do serviço', quando: 'Casos que exigem internação, lactentes e quadros complicados', obs: 'Considerar o perfil de resistência local, que é crescente para ampicilina, cloranfenicol e sulfametoxazol com trimetoprima.' },
            { medId: 'azitromicina', nome: 'Azitromicina', esquema: '10 a 20 mg/kg/dia VO uma vez ao dia, máximo 500 a 1.000 mg ao dia, por 5 a 7 dias, conforme protocolo do serviço', quando: 'Casos não complicados com boa tolerância oral, inclusive em tratamento ambulatorial em comunidade distante', obs: 'Boa penetração intracelular. A posologia em dose única diária facilita o tratamento supervisionado.' }
          ] },
        { ordem: 2, rotulo: 'Alternativa guiada por antibiograma', tipo: 'alternativa',
          opcoes: [
            { medId: 'sulfametoxazol_trimetoprim', nome: 'Sulfametoxazol + trimetoprima', esquema: '40 mg/kg/dia de sulfametoxazol e 8 mg/kg/dia de trimetoprima VO dividida a cada 12 h por 14 dias', quando: 'Alternativa apenas quando o isolado for comprovadamente sensível', obs: 'Contraindicado em menores de 2 meses e na deficiência de G6PD. Ajustar sempre pelo antibiograma.' },
            { medId: null, nome: 'Cloranfenicol', esquema: 'Dose e duração conforme protocolo do Ministério da Saúde e bula, com monitorização hematológica', quando: 'Alternativa histórica onde houver sensibilidade comprovada e disponibilidade', obs: 'Risco de aplasia medular e de síndrome cinzenta no lactente. Confirmar conforme protocolo/bula.', verificar: true }
          ] },
        { ordem: 3, rotulo: 'Uso off-label', tipo: 'offlabel',
          opcoes: [
            { medId: 'ciprofloxacino', nome: 'Ciprofloxacino', esquema: 'Dose e duração conforme protocolo do serviço e bula, guiado por antibiograma', quando: 'Avaliar em cepas multirresistentes com sensibilidade comprovada a fluoroquinolonas, ou quando as demais opções não estão disponíveis ou são contraindicadas', obs: 'Off-label em pediatria para essa indicação, por restrição de bula ligada ao risco osteoarticular observado em animais. A OMS e diretrizes internacionais reconhecem o uso em febre tifoide resistente na criança, com segurança apoiada por metanálises. Atenção à resistência crescente a quinolonas em cepas do sudeste asiático. Confirmar conforme protocolo do serviço e bula.', verificar: true }
          ] },
        { ordem: 4, rotulo: 'Adjuvante / suporte', tipo: 'adjuvante',
          opcoes: [
            { medId: 'sais_reidratacao_oral', nome: 'Sais de reidratação oral', esquema: 'Conforme plano A ou B do Ministério da Saúde', quando: 'Manutenção da hidratação', obs: 'Dieta leve e fracionada conforme tolerância, evitando jejum desnecessário.' },
            { medId: 'ringer_lactato', nome: 'Ringer lactato', esquema: 'Expansão volêmica conforme protocolo de ressuscitação do serviço', quando: 'Desidratação grave ou choque', obs: '' },
            { medId: 'paracetamol', nome: 'Paracetamol', esquema: '10 a 15 mg/kg/dose VO a cada 6 h, conforme bula', quando: 'Febre e dor', obs: 'Evitar anti-inflamatórios e ácido acetilsalicílico pelo risco de sangramento digestivo.' },
            { medId: 'metronidazol', nome: 'Metronidazol', esquema: 'Associado à cobertura para anaeróbios conforme protocolo cirúrgico do serviço', quando: 'Perfuração intestinal, complicação mais temida, associada a antibiótico de amplo espectro e cirurgia de urgência', obs: '' },
            { medId: 'dexametasona', nome: 'Dexametasona', esquema: 'Curso curto em dose alta conforme protocolo do serviço e avaliação especializada', quando: 'Formas graves com choque ou alteração importante do sensório', obs: 'Confirmar conforme protocolo/bula e avaliação especializada.', verificar: true }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: null, nome: 'Trocar o antibiótico apenas porque a febre persiste em 48 a 72 h', esquema: '', quando: '', obs: 'A febre costuma levar de 3 a 5 dias para ceder mesmo com antibiótico eficaz. Esse retardo isolado não indica falha nem troca precoce do esquema.' },
            { medId: null, nome: 'Antidiarreicos, antiespasmódicos e opiáceos que reduzem a motilidade', esquema: '', quando: '', obs: 'Evitar pelo risco de íleo, megacólon e perfuração intestinal.' },
            { medId: 'ibuprofeno', nome: 'Anti-inflamatórios não esteroidais e ácido acetilsalicílico', esquema: '', quando: '', obs: 'Evitar pelo risco de sangramento digestivo, complicação clássica da febre tifoide.' },
            { medId: null, nome: 'Antibiótico empírico sem coleta de hemocultura quando ela é possível', esquema: '', quando: '', obs: 'A hemocultura orienta o esquema diante da resistência crescente. Coletar antes da primeira dose sempre que isso não atrase o tratamento.' },
            { medId: null, nome: 'Alta sem investigação de portadores crônicos entre os contatos', esquema: '', quando: '', obs: 'Investigar e tratar portadores, especialmente manipuladores de alimentos, é o que interrompe a cadeia de transmissão.' }
          ] }
      ],
      naoFarmacologico: [
        'Notificação compulsória e investigação epidemiológica da fonte de contaminação: água, alimento ou manipulador.',
        'Precauções de contato e higiene rigorosa das mãos.',
        'Dieta leve e fracionada conforme tolerância, com jejum e avaliação cirúrgica imediata diante de suspeita de perfuração.',
        'Vigilância de dor abdominal intensa, distensão e sinais de peritonite entre a segunda e a terceira semana de doença.',
        'Orientação comunitária sobre tratamento da água e higiene de alimentos, essencial em comunidades sem saneamento.'
      ],
      fontes: [ { nome: 'Ministério da Saúde - Guia de vigilância em saúde, febre tifoide', ano: 2023 }, { nome: 'OMS - Typhoid fever, background document and treatment guidance', ano: 2019 } ],
      atualizadoEm: '2026-09'
    },

    hiv_pediatrico: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - terapia antirretroviral para todos', tipo: 'primeira',
          opcoes: [
            { medId: null, nome: 'Terapia antirretroviral combinada', esquema: 'Esquema, doses e apresentações definidos exclusivamente conforme o Protocolo Clínico e Diretrizes Terapêuticas para Manejo da Infecção pelo HIV em Crianças e Adolescentes do Ministério da Saúde vigente, com ajuste por peso e superfície corporal a cada consulta', quando: 'Toda criança e adolescente com diagnóstico confirmado, independentemente de sintomas ou de contagem de CD4, o mais precocemente possível', obs: 'Nos casos de transmissão vertical, iniciar idealmente nas primeiras semanas de vida. Condução obrigatória em serviço especializado. Confirmar conforme protocolo e bula.', verificar: true }
          ] },
        { ordem: 2, rotulo: 'Profilaxia de infecções oportunistas', tipo: 'primeira',
          opcoes: [
            { medId: 'sulfametoxazol_trimetoprim', nome: 'Sulfametoxazol + trimetoprima (profilaxia)', esquema: '750 mg/m2/dia de sulfametoxazol, ou cerca de 5 mg/kg/dia de trimetoprima, VO em 1 a 2 tomadas, 3 vezes por semana ou diariamente, conforme o PCDT', quando: 'Toda criança exposta a partir de 4 a 6 semanas de vida até a definição diagnóstica, e crianças infectadas conforme idade e contagem de CD4', obs: 'Profilaxia para Pneumocystis jirovecii. Confirmar esquema conforme o PCDT vigente.', verificar: true },
            { medId: null, nome: 'Fórmula infantil', esquema: 'Garantida pelo serviço de saúde durante o período recomendado', quando: 'Toda criança exposta ao HIV, uma vez que o aleitamento materno é contraindicado', obs: 'Orientar inibição da lactação na mãe. Em comunidade distante, garantir o fornecimento contínuo e a água segura para o preparo, sem o que a substituição se torna mais arriscada que o próprio risco de transmissão.' }
          ] },
        { ordem: 3, rotulo: 'Segunda linha - tratamento de infecção oportunista', tipo: 'segunda',
          opcoes: [
            { medId: 'sulfametoxazol_trimetoprim', nome: 'Sulfametoxazol + trimetoprima (tratamento)', esquema: '15 a 20 mg/kg/dia de trimetoprima IV ou VO dividida a cada 6 ou 8 h por 21 dias', quando: 'Suspeita de pneumocistose, iniciando de forma empírica e imediata, sem aguardar confirmação', obs: 'A pneumocistose é a principal causa de morte no lactente com HIV não diagnosticado. Confirmar conforme protocolo do serviço.', verificar: true },
            { medId: 'prednisolona', nome: 'Prednisolona', esquema: '1 a 2 mg/kg/dia VO com desmame ao longo do tratamento, conforme protocolo do serviço', quando: 'Adjuvante na pneumocistose com hipoxemia', obs: 'Confirmar conforme protocolo do serviço.', verificar: true },
            { medId: null, nome: 'Fluconazol', esquema: 'Dose e duração conforme protocolo do serviço e bula', quando: 'Candidíase oral refratária ao tratamento tópico, ou candidíase esofágica', obs: 'Confirmar conforme protocolo/bula.', verificar: true },
            { medId: 'ceftriaxona', nome: 'Ceftriaxona', esquema: '50 a 100 mg/kg/dia IV, conforme protocolo do serviço', quando: 'Infecção bacteriana grave na criança com HIV, que tem risco aumentado de doença invasiva', obs: '' },
            { medId: 'azitromicina', nome: 'Azitromicina', esquema: 'Dose conforme indicação específica e protocolo do serviço', quando: 'Profilaxia ou tratamento de micobacteriose atípica e de infecções bacterianas conforme indicação', obs: 'Confirmar conforme protocolo/bula.', verificar: true }
          ] },
        { ordem: 4, rotulo: 'Uso off-label', tipo: 'offlabel',
          opcoes: [
            { medId: null, nome: 'Antirretrovirais fora da faixa etária, do peso ou da apresentação aprovada em bula', esquema: 'Definido exclusivamente pelo PCDT vigente e por infectologia pediátrica', quando: 'Situações em que o esquema recomendado para a criança usa fármaco ou formulação sem registro específico para aquela faixa de peso ou idade no Brasil', obs: 'Off-label por faixa etária ou apresentação: é situação frequente em pediatria do HIV, porque o registro em bula costuma ficar atrás da evidência. O uso é respaldado pelo PCDT do Ministério da Saúde, pelas diretrizes da OMS e por estudos de farmacocinética pediátrica. Nunca improvisar fracionamento de comprimido de adulto sem orientação do protocolo. Confirmar conforme protocolo e bula.', verificar: true }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: null, nome: 'Adiar a terapia antirretroviral à espera de CD4 ou de melhora clínica', esquema: '', quando: '', obs: 'Contrário à recomendação atual. O início precoce reduz mortalidade de forma marcante no lactente, e a indicação vale para todos, independentemente de sintomas ou de CD4.' },
            { medId: null, nome: 'Aleitamento materno por mãe vivendo com HIV', esquema: '', quando: '', obs: 'Contraindicado no Brasil, inclusive com carga viral indetectável, conforme protocolo do Ministério da Saúde. Também não usar leite de outra nutriz sem pasteurização em banco de leite.' },
            { medId: null, nome: 'Interromper a terapia antirretroviral por melhora clínica ou por carga viral indetectável', esquema: '', quando: '', obs: 'A interrupção leva a rebote virológico e a resistência. O tratamento é contínuo e por toda a vida.' },
            { medId: null, nome: 'Aplicar vacinas de agentes vivos sem avaliação do estado imunológico', esquema: '', quando: '', obs: 'Exigem avaliação prévia conforme o Manual do CRIE, pelo risco de doença vacinal em imunossupressão grave.' },
            { medId: null, nome: 'Revelação do diagnóstico à criança de forma abrupta ou por terceiros', esquema: '', quando: '', obs: 'A revelação deve ser gradual, adequada à idade e conduzida por equipe multiprofissional, com atenção ao sigilo, sobretudo em comunidades pequenas onde a exposição social é inevitável.' }
          ] }
      ],
      naoFarmacologico: [
        'Manejo da adesão como prioridade clínica, com acolhimento, apoio psicossocial, envolvimento do cuidador e dispensação adaptada à realidade ribeirinha, com apoio do agente comunitário e da referência.',
        'Suporte nutricional intensivo, com acompanhamento do crescimento e tratamento da desnutrição conforme protocolo específico.',
        'Calendário vacinal ampliado com vacinas do CRIE, avaliando o estado imunológico antes de agentes vivos.',
        'Cuidado com o sigilo e com a revelação diagnóstica gradual, conduzida por equipe multiprofissional.',
        'Monitorização laboratorial periódica de carga viral, CD4, hemograma, função renal e hepática e perfil metabólico, e rastreamento de infecções sexualmente transmissíveis em adolescentes.'
      ],
      fontes: [ { nome: 'Ministério da Saúde - PCDT para Manejo da Infecção pelo HIV em Crianças e Adolescentes', ano: 2023 }, { nome: 'OMS - Consolidated guidelines on HIV prevention, testing, treatment and service delivery', ano: 2021 } ],
      atualizadoEm: '2026-09'
    },

    glomerulonefrite_pos_estreptococica: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - controle da hipervolemia', tipo: 'primeira',
          opcoes: [
            { medId: null, nome: 'Restrição de sódio e de líquidos', esquema: 'Dieta sem sal de adição e restrição hídrica proporcional à diurese e às perdas insensíveis, conforme avaliação', quando: 'Enquanto houver edema, hipertensão ou oligúria', obs: 'Medida não medicamentosa central. A doença é autolimitada e o cuidado é de suporte.' },
            { medId: null, nome: 'Furosemida', esquema: '1 a 2 mg/kg/dose VO ou IV, repetida conforme resposta e protocolo do serviço, com monitorização de eletrólitos e diurese', quando: 'Hipervolemia, edema e hipertensão volume-dependente, que é o mecanismo predominante', obs: 'Diurético de alça é a medida medicamentosa inicial. Confirmar dose e intervalo conforme protocolo e bula.', verificar: true }
          ] },
        { ordem: 2, rotulo: 'Segunda linha - hipertensão sem resposta ao diurético', tipo: 'segunda',
          opcoes: [
            { medId: null, nome: 'Anti-hipertensivo adicional, por exemplo nifedipino, hidralazina ou nitroprussiato', esquema: 'Escolha, via, dose e velocidade de redução pressórica definidas conforme o protocolo de emergência hipertensiva do serviço e avaliação da nefrologia pediátrica', quando: 'Hipertensão que não responde ao diurético e à restrição, e emergência hipertensiva com encefalopatia', obs: 'Na emergência hipertensiva, a redução deve ser controlada e gradual, em ambiente monitorizado, evitando quedas abruptas. Evitar inibidores da enzima conversora de angiotensina na fase aguda com hipercalemia ou queda de função renal. Confirmar conforme protocolo e bula.', verificar: true },
            { medId: null, nome: 'Diálise', esquema: 'Indicação e modalidade conforme avaliação da nefrologia pediátrica', quando: 'Hipercalemia refratária, acidose grave, hipervolemia refratária com edema agudo de pulmão, uremia sintomática ou anúria prolongada', obs: 'Acionar a referência precocemente, antes da descompensação, especialmente quando o transporte é demorado.' }
          ] },
        { ordem: 3, rotulo: 'Erradicação do estreptococo e da fonte comunitária', tipo: 'adjuvante',
          opcoes: [
            { medId: 'penicilina_benzatina', nome: 'Penicilina G benzatina', esquema: 'Dose única IM: 600.000 UI se peso abaixo de 27 kg e 1.200.000 UI se peso igual ou acima de 27 kg', quando: 'Erradicação do estreptococo, para reduzir a circulação da cepa nefritogênica na comunidade', obs: 'Não altera o curso da glomerulonefrite já instalada, mas tem papel epidemiológico, sobretudo em surtos comunitários.' },
            { medId: 'amoxicilina', nome: 'Amoxicilina', esquema: '50 mg/kg/dia VO, máximo 1 g ao dia, por 10 dias', quando: 'Alternativa oral para erradicação', obs: '' },
            { medId: 'permetrina', nome: 'Permetrina 5%', esquema: 'Loção ou creme no corpo todo do pescoço para baixo, por 8 a 12 h, repetida após 7 dias, conforme protocolo do Ministério da Saúde', quando: 'Escabiose associada, no paciente e nos contatos domiciliares', obs: 'Na Amazônia a porta de entrada mais comum é a piodermite sobre escabiose. Tratar a escabiose e os contatos é o que interrompe o surto comunitário.' },
            { medId: 'cefalexina', nome: 'Cefalexina', esquema: '50 a 100 mg/kg/dia VO dividida a cada 6 h por 7 a 10 dias, conforme protocolo', quando: 'Piodermite associada', obs: '' }
          ] },
        { ordem: 4, rotulo: 'Alternativa em alergia a penicilina', tipo: 'alternativa',
          opcoes: [
            { medId: 'azitromicina', nome: 'Azitromicina', esquema: '12 mg/kg/dia VO uma vez ao dia, máximo 500 mg ao dia, por 5 dias, conforme bula', quando: 'Alergia à penicilina, para a erradicação do estreptococo', obs: 'Considerar o perfil de resistência local.' }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: 'prednisolona', nome: 'Corticoide e imunossupressores na forma clássica', esquema: '', quando: '', obs: 'Sem indicação. A glomerulonefrite pós-estreptocócica clássica é autolimitada e o cuidado é de suporte. Considerar investigação de outra glomerulopatia se a evolução fugir do esperado.' },
            { medId: null, nome: 'Nifedipino sublingual na crise hipertensiva', esquema: '', quando: '', obs: 'Não recomendado. A queda pressórica é abrupta e imprevisível, com risco de isquemia cerebral e miocárdica. A redução deve ser gradual e controlada, com agente e via definidos em protocolo.' },
            { medId: null, nome: 'Restrição proteica de rotina', esquema: '', quando: '', obs: 'Não indicada. Ajustar o aporte conforme função renal e avaliação nutricional, sem restrição rotineira que comprometa o crescimento.' },
            { medId: null, nome: 'Antibiótico para prevenir a glomerulonefrite após faringite ou piodermite', esquema: '', quando: '', obs: 'O antibiótico previne a febre reumática, mas não previne de forma confiável a glomerulonefrite. Não usar esse argumento para prescrever antibiótico em faringite viral.' },
            { medId: null, nome: 'Alta sem seguimento do complemento e da urina', esquema: '', quando: '', obs: 'Acompanhar pressão arterial, urina rotina e C3 até a normalização. C3 que não normaliza em 8 a 12 semanas sugere outra glomerulopatia e exige nefrologia.' }
          ] }
      ],
      naoFarmacologico: [
        'Controle rigoroso de peso diário, balanço hídrico, diurese e pressão arterial várias vezes ao dia nos casos internados.',
        'Tratamento simultâneo de escabiose e piodermite do paciente e dos contatos domiciliares, medida essencial para interromper surtos comunitários.',
        'Repouso relativo na fase aguda com hipertensão ou edema, com retorno gradual às atividades.',
        'Acompanhamento ambulatorial prolongado com pressão arterial, urina rotina e C3 até a normalização.',
        'Busca ativa de outros casos na comunidade, pois a glomerulonefrite pós-piodermite costuma ocorrer em surtos em áreas com escabiose endêmica.'
      ],
      fontes: [ { nome: 'Sociedade Brasileira de Pediatria - Documento científico sobre glomerulonefrite difusa aguda', ano: 2022 }, { nome: 'OMS - Rheumatic fever and streptococcal disease control', ano: 2021 } ],
      atualizadoEm: '2026-09'
    },

    otite_media_aguda: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - analgesia sempre e antibiótico quando indicado', tipo: 'primeira',
          opcoes: [
            { medId: 'paracetamol', nome: 'Paracetamol', esquema: '10 a 15 mg/kg/dose VO a cada 6 h, conforme bula, em horários regulares nas primeiras 48 h', quando: 'Todos os casos, com ou sem antibiótico, pois a otalgia é o que mais incomoda a criança', obs: 'A analgesia é prioridade e frequentemente é subvalorizada na prescrição.' },
            { medId: 'amoxicilina', nome: 'Amoxicilina', esquema: '80 a 90 mg/kg/dia VO dividida a cada 12 h, máximo 2 a 3 g ao dia, por 10 dias em menores de 2 anos, em otite grave ou com otorreia, e por 5 a 7 dias em maiores de 2 anos com quadro leve a moderado', quando: 'Antibiótico indicado em menores de 6 meses; de 6 a 23 meses com otite bilateral ou com otorreia; e em qualquer idade quando o quadro for grave, com otalgia moderada a intensa, dor por 48 h ou mais, ou temperatura igual ou superior a 39 graus', obs: 'Primeira escolha em dose alta para cobrir pneumococo com sensibilidade reduzida.' }
          ] },
        { ordem: 2, rotulo: 'Observação vigilante como alternativa ao antibiótico imediato', tipo: 'alternativa',
          opcoes: [
            { medId: null, nome: 'Observação vigilante por 48 a 72 h com analgesia e retorno assegurado', esquema: 'Analgesia regular e reavaliação em 48 a 72 h, com prescrição de resgate quando apropriado', quando: 'Avaliar em criança de 6 a 23 meses com otite unilateral não grave, e em maiores de 24 meses com quadro não grave', obs: 'Essa estratégia depende de retorno garantido. Em comunidade ribeirinha ou indígena com transporte fluvial e retorno incerto, costuma ser mais seguro tratar desde o início. Registrar a decisão e o plano combinado com a família.' }
          ] },
        { ordem: 3, rotulo: 'Alternativa em alergia a penicilina', tipo: 'alternativa',
          opcoes: [
            { medId: 'cefalexina', nome: 'Cefalexina', esquema: '50 mg/kg/dia VO dividida a cada 6 h, conforme protocolo do serviço', quando: 'Alergia não anafilática à penicilina', obs: 'Evitar se houve anafilaxia ou reação cutânea grave a betalactâmico.' },
            { medId: 'azitromicina', nome: 'Azitromicina', esquema: '10 mg/kg no 1o dia e 5 mg/kg/dia do 2o ao 5o dia VO, conforme bula', quando: 'Alergia grave à penicilina', obs: 'Menor atividade contra pneumococo resistente, o que exige reavaliação mais atenta em 48 a 72 h.' },
            { medId: 'claritromicina', nome: 'Claritromicina', esquema: '15 mg/kg/dia VO dividida a cada 12 h por 10 dias, máximo 1 g ao dia', quando: 'Alternativa de macrolídeo em alergia à penicilina', obs: '' }
          ] },
        { ordem: 4, rotulo: 'Segunda linha - falha terapêutica ou intolerância à via oral', tipo: 'segunda',
          opcoes: [
            { medId: 'amoxicilina_clavulanato', nome: 'Amoxicilina + clavulanato', esquema: '80 a 90 mg/kg/dia do componente amoxicilina VO dividida a cada 12 h, em formulação com baixa proporção de clavulanato, por 10 dias', quando: 'Falha terapêutica após 48 a 72 h, uso de amoxicilina nos últimos 30 dias, conjuntivite purulenta concomitante sugestiva de Haemophilus, ou otite recorrente', obs: 'Atenção à formulação: proporções altas de clavulanato aumentam diarreia sem ganho de cobertura.' },
            { medId: 'ceftriaxona', nome: 'Ceftriaxona', esquema: '50 mg/kg/dia IM ou IV uma vez ao dia por 1 a 3 dias, conforme protocolo do serviço', quando: 'Vômitos, intolerância à via oral ou falha terapêutica, inclusive como forma de iniciar o tratamento em unidade sem via oral viável', obs: 'A aplicação intramuscular permite tratar em unidade básica distante sem depender da adesão diária.' }
          ] },
        { ordem: 5, rotulo: 'Uso off-label', tipo: 'offlabel',
          opcoes: [
            { medId: 'amoxicilina', nome: 'Amoxicilina em dose alta, 80 a 90 mg/kg/dia', esquema: '80 a 90 mg/kg/dia VO dividida a cada 12 h, máximo 2 a 3 g ao dia', quando: 'Otite média aguda com indicação de antibiótico, especialmente em menores de 2 anos, em creche e com uso recente de antibiótico', obs: 'Off-label quanto à dose: a bula brasileira da amoxicilina prevê habitualmente 20 a 50 mg/kg/dia. A dose alta é recomendada por diretrizes nacionais e internacionais de otite e de pneumonia para superar pneumococo com sensibilidade intermediária às penicilinas, com segurança bem estabelecida. Registrar a justificativa e confirmar conforme protocolo e bula.', verificar: true }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: null, nome: 'Descongestionantes, anti-histamínicos e corticoides na otite média aguda', esquema: '', quando: '', obs: 'Sem benefício demonstrado sobre a dor, a duração ou a efusão, e com efeitos adversos, especialmente em lactentes.' },
            { medId: null, nome: 'Introduzir água, óleo, ervas, leite materno ou fumaça de cigarro no conduto auditivo', esquema: '', quando: '', obs: 'Práticas domiciliares frequentes, sem eficácia e com risco de otite externa, dermatite e queimadura. Perguntar ativamente e orientar contra.' },
            { medId: null, nome: 'Gotas otológicas potencialmente ototóxicas com membrana perfurada', esquema: '', quando: '', obs: 'Evitar formulações com aminoglicosídeo quando há perfuração ou tubo de ventilação, pelo risco de ototoxicidade. Verificar a composição conforme bula.' },
            { medId: 'azitromicina', nome: 'Macrolídeo como primeira escolha sem alergia a penicilina', esquema: '', quando: '', obs: 'Atividade insuficiente contra pneumococo resistente e Haemophilus. A amoxicilina em dose alta é superior.' },
            { medId: null, nome: 'Observação vigilante sem retorno assegurado', esquema: '', quando: '', obs: 'A estratégia exige reavaliação garantida em 48 a 72 h. Sem isso, o risco de mastoidite e de complicação supera o benefício de evitar o antibiótico.' }
          ] }
      ],
      naoFarmacologico: [
        'Otoscopia cuidadosa com avaliação de abaulamento, mobilidade e otorreia, que definem o diagnóstico e a indicação de antibiótico.',
        'Reavaliação em 48 a 72 h, com reexame da região mastoidea.',
        'Redução de fatores de risco: tabagismo passivo, uso de mamadeira deitado e chupeta após o primeiro ano.',
        'Revisão do calendário vacinal, sobretudo pneumocócica e influenza.',
        'Encaminhamento à otorrinolaringologia na otite recorrente, com 3 episódios em 6 meses ou 4 em 12 meses, efusão por mais de 3 meses, perfuração persistente ou suspeita de perda auditiva.'
      ],
      fontes: [ { nome: 'Sociedade Brasileira de Pediatria - Documento científico sobre otite média aguda', ano: 2023 }, { nome: 'OMS - Pocket book of hospital care for children', ano: 2013 } ],
      atualizadoEm: '2026-09'
    },

    faringoamigdalite_estreptococica: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha', tipo: 'primeira',
          opcoes: [
            { medId: 'penicilina_benzatina', nome: 'Penicilina G benzatina', esquema: 'Dose única IM: 600.000 UI se peso abaixo de 27 kg e 1.200.000 UI se peso igual ou acima de 27 kg. Observar por 30 min após a aplicação', quando: 'Faringoamigdalite estreptocócica confirmada por teste rápido ou cultura, ou com forte suspeita clínica em contexto de risco, sobretudo quando há risco de baixa adesão ou dificuldade de retorno', obs: 'Opção preferencial em comunidades ribeirinhas e indígenas, porque garante a erradicação em um único contato com o serviço.' },
            { medId: 'amoxicilina', nome: 'Amoxicilina', esquema: '50 mg/kg/dia VO, máximo 1 g ao dia, em 1 ou 2 tomadas por 10 dias', quando: 'Alternativa oral de primeira escolha, com boa aceitação', obs: 'O objetivo principal do antibiótico aqui é prevenir a febre reumática, e para isso a duração de 10 dias é necessária. Pode ser iniciado com segurança até o 9o dia de sintomas.' }
          ] },
        { ordem: 2, rotulo: 'Alternativa em alergia a penicilina', tipo: 'alternativa',
          opcoes: [
            { medId: 'cefalexina', nome: 'Cefalexina', esquema: '40 a 50 mg/kg/dia VO dividida a cada 12 h, máximo 1 g ao dia, por 10 dias', quando: 'Alergia não anafilática à penicilina', obs: 'Evitar se houve anafilaxia, angioedema ou reação cutânea grave a betalactâmico.' },
            { medId: 'azitromicina', nome: 'Azitromicina', esquema: '12 mg/kg/dia VO uma vez ao dia, máximo 500 mg ao dia, por 5 dias, conforme bula', quando: 'Alergia grave à penicilina', obs: 'Considerar a resistência local dos estreptococos a macrolídeos.' },
            { medId: 'claritromicina', nome: 'Claritromicina', esquema: '15 mg/kg/dia VO dividida a cada 12 h, máximo 500 mg por dose, por 10 dias', quando: 'Alternativa de macrolídeo em alergia grave à penicilina', obs: '' }
          ] },
        { ordem: 3, rotulo: 'Segunda linha - falha terapêutica ou complicação supurativa', tipo: 'segunda',
          opcoes: [
            { medId: 'amoxicilina_clavulanato', nome: 'Amoxicilina + clavulanato', esquema: '45 a 50 mg/kg/dia do componente amoxicilina VO dividida a cada 12 h, conforme protocolo do serviço', quando: 'Complicação supurativa ou falha terapêutica, conforme avaliação', obs: 'Antes de assumir falha, rever adesão, dose e diagnóstico alternativo.' },
            { medId: null, nome: 'Reavaliação em 48 a 72 h e investigação de diagnóstico alternativo', esquema: '', quando: 'Persistência da febre após 48 a 72 h de antibiótico adequado', obs: 'Considerar abscesso periamigdaliano, que exige avaliação otorrinolaringológica e drenagem, e mononucleose, em que a amoxicilina causa exantema.' }
          ] },
        { ordem: 4, rotulo: 'Uso off-label', tipo: 'offlabel',
          opcoes: [
            { medId: 'amoxicilina', nome: 'Amoxicilina em dose única diária por 10 dias', esquema: '50 mg/kg VO uma vez ao dia, máximo 1 g ao dia, por 10 dias', quando: 'Avaliar quando a adesão a múltiplas tomadas é o principal obstáculo, situação comum quando a família mora longe e o cuidador trabalha fora', obs: 'Off-label quanto à posologia: a bula prevê administração fracionada a cada 8 ou 12 h. A dose única diária por 10 dias é recomendada por diretrizes de faringite estreptocócica, com eficácia de erradicação comparável demonstrada em ensaios clínicos e metanálises. Confirmar conforme protocolo e bula.', verificar: true }
          ] },
        { ordem: 5, rotulo: 'Adjuvante / sintomático', tipo: 'adjuvante',
          opcoes: [
            { medId: 'paracetamol', nome: 'Paracetamol', esquema: '10 a 15 mg/kg/dose VO a cada 6 h, conforme bula, em horários regulares nos primeiros dias', quando: 'Dor de garganta e febre, sintoma que mais incomoda a criança', obs: '' },
            { medId: 'ibuprofeno', nome: 'Ibuprofeno', esquema: '5 a 10 mg/kg/dose VO a cada 6 a 8 h, conforme bula', quando: 'Odinofagia importante', obs: 'Evitar em desidratação ou suspeita de infecção invasiva de partes moles.' },
            { medId: 'dipirona', nome: 'Dipirona', esquema: '10 a 15 mg/kg/dose VO a cada 6 h, conforme bula', quando: 'Alternativa analgésica e antitérmica', obs: '' }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: null, nome: 'Antibiótico para faringite com características virais', esquema: '', quando: '', obs: 'Tosse, coriza, rouquidão, conjuntivite e úlceras orais indicam etiologia viral. Não prescrever antibiótico nesses casos é a principal medida de uso racional de antimicrobianos em pediatria, e evita rótulos falsos de alergia.' },
            { medId: 'amoxicilina', nome: 'Encurtar o curso oral para menos de 10 dias', esquema: '', quando: '', obs: 'A prevenção da febre reumática depende da erradicação, que exige os 10 dias completos, mesmo com a criança assintomática no terceiro dia.' },
            { medId: 'prednisolona', nome: 'Corticoide de rotina na faringoamigdalite', esquema: '', quando: '', obs: 'Não recomendado. O ganho sobre a dor é pequeno e transitório, e pode mascarar complicação supurativa. Reservar para obstrução de via aérea conforme avaliação especializada.' },
            { medId: null, nome: 'Tratar portadores assintomáticos de rotina', esquema: '', quando: '', obs: 'Não indicado. O portador crônico tem baixo risco de complicação e de transmissão.' },
            { medId: null, nome: 'Indicar amigdalectomia sem critérios estabelecidos', esquema: '', quando: '', obs: 'A indicação depende de episódios documentados e frequentes ou de abscessos de repetição, e deve ser avaliada por otorrinolaringologia.' }
          ] }
      ],
      naoFarmacologico: [
        'Teste rápido ou cultura sempre que disponível, para evitar antibiótico em faringite viral.',
        'Hidratação com líquidos frios, gelatina, sorvete e alimentos macios, evitando ácidos, quentes e condimentados.',
        'Afastamento escolar até 24 h após o início do antibiótico eficaz e resolução da febre.',
        'Reavaliação em 48 a 72 h e avaliação de contatos domiciliares sintomáticos.',
        'Orientação escrita sobre sinais de glomerulonefrite em 1 a 3 semanas e de febre reumática em 2 a 4 semanas, com data de retorno combinada.'
      ],
      fontes: [ { nome: 'Sociedade Brasileira de Pediatria - Documento científico sobre faringoamigdalites na infância', ano: 2023 }, { nome: 'OMS - Rheumatic fever and rheumatic heart disease, technical report', ano: 2021 } ],
      atualizadoEm: '2026-09'
    },
    laringite_viral: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - corticoide para todos os casos', tipo: 'primeira',
          opcoes: [
            { medId: 'dexametasona', nome: 'Dexametasona', esquema: 'Dose única de 0,15 a 0,6 mg/kg VO, IM ou IV, dose máxima habitualmente 10 a 16 mg. A dose de 0,6 mg/kg é a mais estudada e 0,15 mg/kg tem eficácia comparável nos casos leves', quando: 'Todos os casos de laringotraqueíte viral, inclusive os leves, pois reduz a gravidade, o tempo de permanência e o retorno ao serviço', obs: 'Preferir a via oral quando possível, reservando a intramuscular para vômitos ou dificuldade de deglutição. Confirmar apresentação e dose conforme protocolo do serviço e bula.', verificar: true },
            { medId: null, nome: 'Manter a criança calma e no colo do cuidador', esquema: 'Adiar procedimentos não essenciais e reduzir manipulação', quando: 'Todos os casos', obs: 'Choro e agitação aumentam a turbulência do fluxo aéreo e agravam a obstrução. Essa é a primeira medida, antes de qualquer fármaco.' }
          ] },
        { ordem: 2, rotulo: 'Alternativa quando não há dexametasona na unidade', tipo: 'alternativa',
          opcoes: [
            { medId: 'prednisolona', nome: 'Prednisolona', esquema: '1 a 2 mg/kg/dia VO, conforme protocolo do serviço', quando: 'Alternativa aceitável quando a dexametasona não está disponível, situação comum em unidade básica ribeirinha', obs: 'Pela meia-vida mais curta, pode exigir dose adicional no dia seguinte.' }
          ] },
        { ordem: 3, rotulo: 'Segunda linha - caso moderado a grave com estridor em repouso', tipo: 'segunda',
          opcoes: [
            { medId: 'adrenalina', nome: 'Adrenalina nebulizada', esquema: 'Solução de 1 mg/mL, 0,5 mL/kg por dose, máximo de 5 mL, diluída em soro fisiológico, com fluxo de oxigênio; pode ser repetida conforme resposta e protocolo do serviço', quando: 'Casos moderados a graves com estridor em repouso', obs: 'Melhora rápida por vasoconstrição da mucosa, com efeito de cerca de 2 h. Manter observação por 2 a 4 h após a nebulização e só dar alta se não houver estridor em repouso nesse período e se o corticoide tiver sido administrado. Necessidade de doses repetidas indica internação.' },
            { medId: null, nome: 'Oxigenoterapia', esquema: 'Se saturação abaixo de 92% ou desconforto importante, ofertado da forma menos incômoda possível, preferencialmente em fluxo livre próximo à face', quando: 'Hipoxemia ou desconforto respiratório importante', obs: 'Evitar máscaras que gerem agitação, pois o choro piora a obstrução.' }
          ] },
        { ordem: 4, rotulo: 'Uso off-label', tipo: 'offlabel',
          opcoes: [
            { medId: 'adrenalina', nome: 'Adrenalina por via inalatória (nebulização)', esquema: 'Solução de 1 mg/mL, 0,5 mL/kg por dose, máximo de 5 mL, diluída em soro fisiológico', quando: 'Crupe moderado a grave com estridor em repouso, enquanto o corticoide não faz efeito e durante a estabilização ou o transporte', obs: 'Off-label quanto à via: a bula da adrenalina registra as vias intramuscular, subcutânea e intravenosa, não a inalatória. O uso nebulizado no crupe é recomendado por diretrizes nacionais e internacionais, com benefício demonstrado em revisões sistemáticas. Exige monitorização de frequência cardíaca e observação prolongada pelo retorno dos sintomas ao fim do efeito.' },
            { medId: 'dexametasona', nome: 'Dexametasona injetável administrada por via oral', esquema: 'Conteúdo da ampola administrado por via oral, na dose de 0,15 a 0,6 mg/kg em dose única, conforme protocolo do serviço', quando: 'Avaliar quando não há apresentação oral de dexametasona na unidade, situação frequente em pronto-socorro e em unidade de comunidade', obs: 'Off-label quanto à via: a apresentação injetável não prevê administração oral em bula. A prática é amplamente descrita em protocolos de emergência pediátrica, com boa biodisponibilidade oral e eficácia equivalente. Confirmar conforme protocolo do serviço e bula.', verificar: true }
          ] },
        { ordem: 5, rotulo: 'Adjuvante / sintomático e diagnóstico diferencial', tipo: 'adjuvante',
          opcoes: [
            { medId: 'paracetamol', nome: 'Paracetamol', esquema: '10 a 15 mg/kg/dose VO a cada 6 h, conforme bula', quando: 'Febre e desconforto', obs: '' },
            { medId: 'ceftriaxona', nome: 'Ceftriaxona', esquema: '50 a 100 mg/kg/dia IV, associada a cobertura antiestafilocócica conforme protocolo do serviço', quando: 'Suspeita de traqueíte bacteriana ou epiglotite: toxemia, febre alta, sialorreia, posição de tripé, ausência de resposta à adrenalina e ao corticoide', obs: 'São diagnósticos diferenciais graves que mudam completamente a conduta e exigem via aérea avançada.' }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: null, nome: 'Umidificação, vapor e banheiro com chuveiro quente como tratamento', esquema: '', quando: '', obs: 'Não demonstraram eficácia em ensaios clínicos e não devem substituir o corticoide. Manter apenas se confortarem a criança e sem risco de queimadura, que é real com vapor de água fervente.' },
            { medId: null, nome: 'Antibiótico na laringotraqueíte viral', esquema: '', quando: '', obs: 'Não indicado. A etiologia é viral, sobretudo parainfluenza. Reservar para traqueíte bacteriana ou epiglotite, com internação e antibiótico parenteral.' },
            { medId: 'salbutamol', nome: 'Broncodilatadores no crupe', esquema: '', quando: '', obs: 'Sem indicação, pois a obstrução é alta e extratorácica. Usar apenas se houver sibilância concomitante documentada.' },
            { medId: null, nome: 'Exame de orofaringe, punção venosa e procedimentos não essenciais na criança com estridor em repouso', esquema: '', quando: '', obs: 'Podem precipitar obstrução completa, especialmente na suspeita de epiglotite. Adiar procedimentos e manter a criança calma no colo.' },
            { medId: 'adrenalina', nome: 'Alta logo após a nebulização de adrenalina', esquema: '', quando: '', obs: 'O efeito dura cerca de 2 h e os sintomas podem retornar. Observar por 2 a 4 h e garantir que o corticoide foi administrado antes da alta, sobretudo quando a família mora longe.' }
          ] }
      ],
      naoFarmacologico: [
        'Manter a criança calma e no colo do cuidador, adiando procedimentos não essenciais.',
        'Hidratação oral conforme aceitação, evitando punção venosa desnecessária nos casos leves e moderados.',
        'Observação por 2 a 4 h após adrenalina nebulizada antes de decidir a alta.',
        'Orientação escrita sobre sinais de retorno: estridor em repouso, tiragem, sonolência e cianose.',
        'Insuficiência respiratória iminente: acionar equipe com experiência em via aérea pediátrica, preparar tubo de diâmetro menor que o previsto para a idade e transferir para terapia intensiva.'
      ],
      fontes: [ { nome: 'Sociedade Brasileira de Pediatria - Documento científico sobre laringotraqueíte viral aguda', ano: 2023 }, { nome: 'OMS - Pocket book of hospital care for children', ano: 2013 } ],
      atualizadoEm: '2026-09'
    },

    hantavirose: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - suporte com manejo hídrico restritivo', tipo: 'primeira',
          opcoes: [
            { medId: null, nome: 'Internação precoce e monitorização contínua', esquema: 'Monitorização de frequência respiratória, oximetria, pressão arterial, diurese e, seriadamente, hematócrito e plaquetas', quando: 'Todo caso suspeito, mesmo na fase prodrômica', obs: 'A elevação do hematócrito com queda de plaquetas antecede a fase cardiopulmonar e é o sinal de alerta que motiva transferência antes da deterioração.' },
            { medId: 'soro_fisiologico', nome: 'Soro fisiológico 0,9%', esquema: 'Expansão volêmica criteriosa em alíquotas pequenas, com reavaliação frequente do estado respiratório; volume total e velocidade conforme protocolo do serviço', quando: 'Hipotensão e má perfusão, com muita cautela pelo extravasamento capilar pulmonar', obs: 'Diferente de outros choques: a infusão liberal de volume agrava o edema pulmonar. Confirmar conforme protocolo do serviço.', verificar: true }
          ] },
        { ordem: 2, rotulo: 'Segunda linha - suporte hemodinâmico precoce', tipo: 'segunda',
          opcoes: [
            { medId: 'adrenalina', nome: 'Adrenalina', esquema: 'Infusão contínua com dose titulada conforme resposta e protocolo da terapia intensiva pediátrica', quando: 'Choque com baixo débito, em que o uso precoce de droga vasoativa é preferido à expansão volêmica liberal', obs: 'Confirmar conforme protocolo do serviço.', verificar: true },
            { medId: null, nome: 'Noradrenalina e outros vasoativos ou inotrópicos, por exemplo dobutamina', esquema: 'Escolha do agente, dose e titulação definidas pelo protocolo de choque da terapia intensiva pediátrica', quando: 'Choque com disfunção miocárdica e baixo débito, característico da hantavirose', obs: 'Preferir o início precoce do vasoativo em vez de grandes volumes. Confirmar conforme protocolo e bula.', verificar: true },
            { medId: null, nome: 'Ventilação mecânica protetora e suporte extracorpóreo', esquema: 'Estratégia de síndrome do desconforto respiratório agudo conforme protocolo da terapia intensiva; ECMO descrita como resgate em centros selecionados', quando: 'Insuficiência respiratória na fase cardiopulmonar', obs: 'Confirmar conforme protocolo do serviço de referência.', verificar: true }
          ] },
        { ordem: 3, rotulo: 'Cobertura empírica enquanto o diagnóstico não está definido', tipo: 'alternativa',
          opcoes: [
            { medId: 'ceftriaxona', nome: 'Ceftriaxona', esquema: '50 a 100 mg/kg/dia IV, conforme protocolo do serviço', quando: 'Manter até que leptospirose e sepse bacteriana sejam razoavelmente afastadas, diagnósticos diferenciais frequentes na Amazônia', obs: 'A leptospirose grave é indistinguível no início e responde a antibiótico, por isso a cobertura empírica é justificada.' },
            { medId: 'ringer_lactato', nome: 'Ringer lactato', esquema: 'Alternativa cristaloide para expansão volêmica criteriosa, conforme protocolo do serviço', quando: 'Alternativa ao soro fisiológico, mantendo a mesma cautela com o volume', obs: 'Confirmar conforme protocolo do serviço.', verificar: true }
          ] },
        { ordem: 4, rotulo: 'Adjuvante / sintomático', tipo: 'adjuvante',
          opcoes: [
            { medId: 'paracetamol', nome: 'Paracetamol', esquema: '10 a 15 mg/kg/dose VO a cada 6 h, conforme bula', quando: 'Febre e dor', obs: 'Preferir em relação aos anti-inflamatórios não esteroidais.' },
            { medId: 'dipirona', nome: 'Dipirona', esquema: '10 a 15 mg/kg/dose VO ou IV a cada 6 h, conforme bula', quando: 'Alternativa antitérmica', obs: 'Atenção à hipotensão na administração venosa rápida, em paciente já instável.' }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: 'soro_fisiologico', nome: 'Expansão volêmica liberal com grandes volumes', esquema: '', quando: '', obs: 'Erro mais grave nessa doença. O extravasamento capilar pulmonar faz com que volumes generosos precipitem edema pulmonar e morte. Priorizar vasoativo precoce e alíquotas pequenas com reavaliação.' },
            { medId: null, nome: 'Antiviral para hantavirose', esquema: '', quando: '', obs: 'Não há antiviral com eficácia comprovada. O prognóstico depende do reconhecimento precoce e da transferência antes da insuficiência respiratória.' },
            { medId: 'ibuprofeno', nome: 'Anti-inflamatórios não esteroidais e ácido acetilsalicílico', esquema: '', quando: '', obs: 'Evitar pelo risco de sangramento e de lesão renal, enquanto dengue e outras causas hemorrágicas não estiverem afastadas.' },
            { medId: null, nome: 'Alta ou observação domiciliar do caso suspeito na fase prodrômica', esquema: '', quando: '', obs: 'A transição da fase prodrômica para a cardiopulmonar é abrupta, em horas. Todo caso suspeito deve ser internado em serviço com possibilidade de transferência rápida.' },
            { medId: null, nome: 'Varrer ou usar vassoura e água em ambiente fechado com fezes de roedor', esquema: '', quando: '', obs: 'Gera aerossóis e é a principal forma de contágio. Orientar a família e a comunidade sobre ventilação prévia, umidificação com desinfetante e proteção individual antes da limpeza.' }
          ] }
      ],
      naoFarmacologico: [
        'Notificação compulsória imediata e investigação do local provável de infecção.',
        'Internação de todo caso suspeito, mesmo na fase prodrômica, em serviço com possibilidade de transferência rápida para terapia intensiva.',
        'Oxigenoterapia precoce, acesso venoso instalado e equipe preparada para deterioração rápida.',
        'Manejo ambiental de roedores no domicílio e na área de exposição, com orientação sobre a técnica segura de limpeza de ambientes fechados.',
        'Orientação à família e à comunidade, pois a fonte de exposição frequentemente permanece ativa após o caso índice.'
      ],
      fontes: [ { nome: 'Ministério da Saúde - Guia de vigilância em saúde, hantavirose', ano: 2023 }, { nome: 'OPAS - Manejo clínico da síndrome cardiopulmonar por hantavírus', ano: 2022 } ],
      atualizadoEm: '2026-09'
    },

    acidente_arraia: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - imersão em água morna e analgesia', tipo: 'primeira',
          opcoes: [
            { medId: null, nome: 'Imersão da região atingida em água morna', esquema: 'Maior temperatura tolerável pela pele sem causar queimadura, em torno de 50 graus, por 30 a 90 min ou até o alívio da dor, acrescentando água quente aos poucos para manter a temperatura', quando: 'Medida inicial em todo acidente por arraia, pois o calor inativa componentes termolábeis do veneno', obs: 'É a medida mais eficaz para a dor. Testar sempre a temperatura com a mão ou o cotovelo de um adulto antes de imergir a criança e manter supervisão contínua, pelo risco real de queimadura em criança pequena ou com sensibilidade alterada.' },
            { medId: 'dipirona', nome: 'Dipirona', esquema: '10 a 15 mg/kg/dose VO ou IV a cada 6 h, conforme bula', quando: 'Analgesia sistêmica precoce, associada à imersão', obs: 'A dor é o principal problema inicial e costuma ser subtratada.' },
            { medId: 'soro_fisiologico', nome: 'Soro fisiológico 0,9%', esquema: 'Lavagem abundante da ferida e curativos diários', quando: 'Limpeza da ferida, com exploração cuidadosa e remoção de fragmentos do ferrão e de tecido tegumentar sob analgesia adequada', obs: '' }
          ] },
        { ordem: 2, rotulo: 'Alternativa e escalonamento da analgesia', tipo: 'alternativa',
          opcoes: [
            { medId: 'paracetamol', nome: 'Paracetamol', esquema: '10 a 15 mg/kg/dose VO a cada 6 h, conforme bula', quando: 'Alternativa analgésica quando a dipirona não está disponível ou é contraindicada', obs: '' },
            { medId: 'ibuprofeno', nome: 'Ibuprofeno', esquema: '5 a 10 mg/kg/dose VO a cada 6 a 8 h, conforme bula', quando: 'Analgesia e controle do edema', obs: 'Evitar em desidratação e avaliar função renal.' },
            { medId: null, nome: 'Anestésico local sem vasoconstritor, por exemplo lidocaína', esquema: 'Infiltração local ou bloqueio regional conforme protocolo do serviço e bula, respeitando a dose máxima por peso', quando: 'Dor que não cede com analgesia sistêmica e imersão, e para permitir a exploração da ferida', obs: 'Confirmar dose máxima conforme protocolo/bula.', verificar: true },
            { medId: null, nome: 'Analgésico opioide, por exemplo morfina', esquema: 'Indicação, dose e monitorização conforme protocolo do serviço e bula', quando: 'Dor intensa não controlada pelos analgésicos habituais', obs: 'Requer monitorização respiratória. Confirmar conforme protocolo/bula.', verificar: true }
          ] },
        { ordem: 3, rotulo: 'Antibiótico com cobertura para Aeromonas quando indicado', tipo: 'segunda',
          opcoes: [
            { medId: 'sulfametoxazol_trimetoprim', nome: 'Sulfametoxazol + trimetoprima', esquema: '40 mg/kg/dia de sulfametoxazol e 8 mg/kg/dia de trimetoprima VO dividida a cada 12 h, conforme protocolo do serviço', quando: 'Ferimento profundo, extenso, com retardo no atendimento, com corpo estranho, em imunossuprimido ou diabético, ou já com sinais de infecção', obs: 'Cobertura para Aeromonas hydrophila, agente típico de ferida de água doce. Contraindicado em menores de 2 meses.' },
            { medId: 'amoxicilina_clavulanato', nome: 'Amoxicilina + clavulanato', esquema: '45 a 50 mg/kg/dia do componente amoxicilina VO dividida a cada 12 h, conforme protocolo do serviço', quando: 'Cobertura para flora cutânea e anaeróbios, habitualmente associada a um agente com atividade contra Aeromonas', obs: 'Não cobre Aeromonas de forma confiável quando usada isoladamente.' },
            { medId: 'ceftriaxona', nome: 'Ceftriaxona', esquema: '50 a 100 mg/kg/dia IV, conforme protocolo do serviço', quando: 'Infecção grave com necessidade de internação, associada conforme necessidade a cobertura antiestafilocócica e para Aeromonas', obs: '' }
          ] },
        { ordem: 4, rotulo: 'Uso off-label', tipo: 'offlabel',
          opcoes: [
            { medId: 'ciprofloxacino', nome: 'Ciprofloxacino', esquema: 'Dose e duração conforme protocolo do serviço e bula', quando: 'Alternativa com boa cobertura para Aeromonas em adolescentes, em alergia à sulfa, ou quando o sulfametoxazol com trimetoprima é contraindicado ou indisponível na comunidade', obs: 'Off-label em criança para essa indicação, por restrição de bula ligada ao risco osteoarticular observado em animais jovens. O uso em infecções por Gram-negativos e por Aeromonas é respaldado por diretrizes e por metanálises que não confirmaram dano articular clinicamente relevante em crianças. Registrar a justificativa e confirmar conforme protocolo e bula.', verificar: true }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: null, nome: 'Torniquete, garrote ou faixa compressiva', esquema: '', quando: '', obs: 'Não usar. Agrava a isquemia e a necrose local, sem qualquer efeito sobre o veneno. Prática comum à beira do rio que precisa ser desfeita ativamente na orientação da comunidade.' },
            { medId: null, nome: 'Cortes, sucção, cauterização e aplicação de gelo, urina, fumo, borra de café, ervas ou querosene', esquema: '', quando: '', obs: 'Sem benefício e com aumento de infecção, queimadura química e extensão da lesão. O que alivia a dor é a imersão em água morna e a analgesia adequada.' },
            { medId: null, nome: 'Sutura primária e hermética da ferida', esquema: '', quando: '', obs: 'Contraindicada pelo alto risco de infecção. A ferida deve ser deixada aberta para cicatrização por segunda intenção ou com fechamento tardio, conforme protocolo.' },
            { medId: null, nome: 'Aguardar soro antiveneno específico', esquema: '', quando: '', obs: 'Não existe soro antiveneno para acidentes por arraia. Todo o cuidado é analgesia, limpeza, desbridamento, profilaxia antitetânica e antibiótico quando indicado.' },
            { medId: null, nome: 'Antibiótico de rotina em todo acidente', esquema: '', quando: '', obs: 'Não é obrigatório em ferimentos superficiais, limpos e atendidos precocemente. Indicar conforme os critérios de risco e reavaliar em 48 h.' }
          ] }
      ],
      naoFarmacologico: [
        'Profilaxia antitetânica conforme a situação vacinal e a característica do ferimento, incluindo imunoglobulina antitetânica quando indicada.',
        'Exploração e desbridamento do tecido desvitalizado conforme avaliação cirúrgica, sem sutura primária hermética.',
        'Curativos diários com soro fisiológico, elevação do membro e repouso relativo, com reavaliações frequentes.',
        'Acompanhamento prolongado da úlcera, que pode levar semanas a meses para cicatrizar, com atenção à dor, à funcionalidade e ao retorno à escola.',
        'Notificação no sistema de vigilância de animais peçonhentos e orientação preventiva: arrastar os pés ao entrar no rio, usar calçado e evitar bancos de areia rasos.'
      ],
      fontes: [ { nome: 'Ministério da Saúde - Manual de diagnóstico e tratamento de acidentes por animais peçonhentos', ano: 2024 }, { nome: 'Sociedade Brasileira de Pediatria - Documento científico sobre acidentes por animais peçonhentos', ano: 2023 } ],
      atualizadoEm: '2026-09'
    },

    ferimento_peixe: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - limpeza, exploração e analgesia', tipo: 'primeira',
          opcoes: [
            { medId: 'soro_fisiologico', nome: 'Soro fisiológico 0,9%', esquema: 'Lavagem imediata e abundante com água limpa e corrente e com soro fisiológico, seguida de antissepsia e de curativos diários', quando: 'Todo ferimento em ambiente aquático', obs: 'A limpeza precoce e a remoção de fragmentos de espinho, escamas e muco são o que mais reduz infecção.' },
            { medId: 'dipirona', nome: 'Dipirona', esquema: '10 a 15 mg/kg/dose VO ou IV a cada 6 h, conforme bula', quando: 'Analgesia para permitir a exploração adequada da ferida', obs: '' },
            { medId: null, nome: 'Imersão em água morna no ferimento por espinho de bagre ou mandi', esquema: 'Maior temperatura tolerável sem queimar, em torno de 50 graus, por 30 a 90 min, com teste prévio da temperatura por um adulto e supervisão contínua', quando: 'Dor intensa por ferroada de bagre, mandi e peixes peçonhentos de água doce', obs: 'Alivia a dor por inativação de componentes termolábeis do veneno. Risco real de queimadura se a temperatura não for testada.' }
          ] },
        { ordem: 2, rotulo: 'Antibiótico com cobertura obrigatória para Aeromonas quando indicado', tipo: 'primeira',
          opcoes: [
            { medId: 'sulfametoxazol_trimetoprim', nome: 'Sulfametoxazol + trimetoprima', esquema: '40 mg/kg/dia de sulfametoxazol e 8 mg/kg/dia de trimetoprima VO dividida a cada 12 h por 7 a 10 dias, conforme protocolo do serviço', quando: 'Ferimento profundo, por mordedura, em mãos e pés, com corpo estranho, com atendimento tardio, extenso, ou em criança imunossuprimida, desnutrida ou hepatopata', obs: 'Cobertura para Aeromonas. Contraindicado em menores de 2 meses.' },
            { medId: 'cefalexina', nome: 'Cefalexina', esquema: '50 a 100 mg/kg/dia VO dividida a cada 6 h, conforme protocolo', quando: 'Cobertura para estafilococos e estreptococos, sempre associada a um agente com atividade contra Aeromonas', obs: 'Não usar isoladamente em ferimento de ambiente aquático, pois não cobre Aeromonas de forma confiável.' },
            { medId: 'amoxicilina_clavulanato', nome: 'Amoxicilina + clavulanato', esquema: '45 a 50 mg/kg/dia do componente amoxicilina VO dividida a cada 12 h, conforme protocolo do serviço', quando: 'Cobertura para flora cutânea, anaeróbios e mordeduras, associada a agente com atividade contra Aeromonas', obs: 'Também não cobre Aeromonas de forma confiável quando isolada.' }
          ] },
        { ordem: 3, rotulo: 'Uso off-label', tipo: 'offlabel',
          opcoes: [
            { medId: 'ciprofloxacino', nome: 'Ciprofloxacino', esquema: 'Dose e duração conforme protocolo do serviço e bula', quando: 'Alternativa com boa atividade contra Aeromonas e Vibrio, útil em alergia à sulfa ou quando o sulfametoxazol com trimetoprima é contraindicado ou indisponível', obs: 'Off-label em criança por restrição de bula ligada ao risco osteoarticular observado em animais jovens. O uso é respaldado por diretrizes de infecção por Gram-negativos e por metanálises que não confirmaram dano articular clinicamente relevante em crianças. Registrar a justificativa e confirmar conforme protocolo e bula.', verificar: true },
            { medId: 'doxiciclina', nome: 'Doxiciclina em menores de 8 anos', esquema: 'Dose e duração conforme protocolo do serviço e bula', quando: 'Alternativa em infecções por Vibrio e em micobacteriose, conforme avaliação especializada, quando não há outra opção adequada', obs: 'Off-label abaixo de 8 anos no Brasil por restrição de bula relacionada ao risco de alteração dentária. Cursos curtos têm risco muito baixo de manchamento segundo a Academia Americana de Pediatria e o CDC. Confirmar conforme protocolo e bula.', verificar: true }
          ] },
        { ordem: 4, rotulo: 'Segunda linha - infecção grave ou de evolução arrastada', tipo: 'segunda',
          opcoes: [
            { medId: 'ceftriaxona', nome: 'Ceftriaxona', esquema: '50 a 100 mg/kg/dia IV, associada a cobertura antiestafilocócica e para Aeromonas conforme protocolo do serviço e antibiograma', quando: 'Infecção grave com necessidade de internação', obs: 'Drenagem de abscessos, desbridamento e exploração de mão com suspeita de tenossinovite não devem ser adiados.' },
            { medId: 'claritromicina', nome: 'Claritromicina', esquema: '15 mg/kg/dia VO dividida a cada 12 h, máximo 1 g ao dia, em tratamento prolongado por vários meses, isolada ou associada conforme orientação especializada', quando: 'Suspeita ou confirmação de Mycobacterium marinum, com nódulos de evolução arrastada em trajeto linear após contato com água e peixe', obs: 'Tratar habitualmente por pelo menos 4 a 8 semanas após a resolução das lesões. Confirmar conforme protocolo, cultura e antibiograma.', verificar: true }
          ] },
        { ordem: 5, rotulo: 'Adjuvante / sintomático', tipo: 'adjuvante',
          opcoes: [
            { medId: 'paracetamol', nome: 'Paracetamol', esquema: '10 a 15 mg/kg/dose VO a cada 6 h, conforme bula', quando: 'Analgesia e febre', obs: '' },
            { medId: 'ibuprofeno', nome: 'Ibuprofeno', esquema: '5 a 10 mg/kg/dose VO a cada 6 a 8 h, conforme bula', quando: 'Analgesia e controle do edema', obs: '' }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: 'cefalexina', nome: 'Cefalexina ou amoxicilina com clavulanato isoladas em ferida de ambiente aquático', esquema: '', quando: '', obs: 'Erro frequente e clinicamente relevante: nenhuma das duas cobre Aeromonas de forma confiável. A cobertura para Aeromonas é obrigatória nesse contexto, por associação ou por escolha específica.' },
            { medId: null, nome: 'Sutura primária e hermética de ferimento contaminado, profundo, por mordedura ou com atendimento tardio', esquema: '', quando: '', obs: 'Aumenta muito o risco de infecção. Deixar aberto ou considerar fechamento tardio, conforme protocolo.' },
            { medId: null, nome: 'Torniquete, cortes, sucção, cauterização, gelo direto sobre a pele, urina, fumo, borra de café ou querosene', esquema: '', quando: '', obs: 'Práticas caseiras comuns na pesca, sem benefício e com risco de queimadura química, necrose e infecção.' },
            { medId: null, nome: 'Retirada de anzol incrustado por pessoa não treinada', esquema: '', quando: '', obs: 'Não puxar no sentido inverso quando há farpa. A retirada deve ser feita por profissional, sob anestesia local, com a técnica adequada ao tipo de anzol. Ferimentos em face, olhos, pescoço ou próximos a vasos e tendões exigem avaliação especializada.' },
            { medId: null, nome: 'Alta sem reavaliação em 48 h', esquema: '', quando: '', obs: 'A infecção por Aeromonas tem evolução rápida. A reavaliação em 48 h é obrigatória e deve ser combinada considerando a distância e o transporte fluvial.' }
          ] }
      ],
      naoFarmacologico: [
        'Profilaxia antitetânica conforme a situação vacinal e o tipo de ferimento, com imunoglobulina quando indicada; ferimentos de pesca e contaminados com terra ou água de rio são geralmente de alto risco.',
        'Exploração da ferida sob analgesia adequada, com remoção de fragmentos de espinho, escamas, muco e matéria orgânica.',
        'Curativos diários com soro fisiológico e proteção da ferida do contato com a água do rio durante a cicatrização, o que exige negociação prática com a rotina de pesca e banho da família.',
        'Elevação do membro, repouso relativo e analgesia regular.',
        'Notificação de acidente por animal peçonhento quando houver envenenamento associado, conforme a ficha específica.'
      ],
      fontes: [ { nome: 'Ministério da Saúde - Manual de diagnóstico e tratamento de acidentes por animais peçonhentos', ano: 2024 }, { nome: 'Sociedade Brasileira de Pediatria - Documento científico sobre infecções de pele e partes moles', ano: 2022 } ],
      atualizadoEm: '2026-09'
    },

    miiase: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - remoção mecânica', tipo: 'primeira',
          opcoes: [
            { medId: null, nome: 'Oclusão do orifício e retirada da larva com pinça', esquema: 'Ocluir o orifício central com vaselina, pomada oclusiva ou esparadrapo por alguns minutos, para dificultar a respiração da larva e favorecer sua emersão, seguida de retirada com pinça em movimento suave e contínuo', quando: 'Miíase furunculoide, forma mais comum na criança', obs: 'Evitar romper ou fragmentar a larva, pois restos causam reação inflamatória intensa, granuloma e infecção secundária. Quando a extração não for completa, considerar pequena incisão sob anestesia local conforme protocolo do serviço.' },
            { medId: 'soro_fisiologico', nome: 'Soro fisiológico 0,9%', esquema: 'Limpeza abundante da lesão e curativos diários', quando: 'Miíase de ferida ou cavitária, com remoção mecânica de todas as larvas sob boa iluminação e analgesia adequada', obs: 'Associar desbridamento do tecido desvitalizado e curativos frequentes até que não restem larvas.' }
          ] },
        { ordem: 2, rotulo: 'Adjuvante para facilitar a remoção', tipo: 'adjuvante',
          opcoes: [
            { medId: null, nome: 'Anestésico local sem vasoconstritor, por exemplo lidocaína', esquema: 'Infiltração local conforme protocolo do serviço e bula, respeitando a dose máxima por peso', quando: 'Lesões dolorosas, criança pouco colaborativa ou localização delicada', obs: 'Confirmar dose máxima conforme protocolo/bula.', verificar: true },
            { medId: 'paracetamol', nome: 'Paracetamol', esquema: '10 a 15 mg/kg/dose VO a cada 6 h, conforme bula', quando: 'Analgesia durante o procedimento e nos dias seguintes', obs: '' },
            { medId: 'dipirona', nome: 'Dipirona', esquema: '10 a 15 mg/kg/dose VO ou IV a cada 6 h, conforme bula', quando: 'Alternativa analgésica', obs: '' },
            { medId: 'ibuprofeno', nome: 'Ibuprofeno', esquema: '5 a 10 mg/kg/dose VO a cada 6 a 8 h, conforme bula', quando: 'Analgesia e controle do edema', obs: '' }
          ] },
        { ordem: 3, rotulo: 'Uso off-label', tipo: 'offlabel',
          opcoes: [
            { medId: 'ivermectina', nome: 'Ivermectina oral como adjuvante na miíase', esquema: '200 microgramas/kg VO em dose única, podendo ser repetida conforme avaliação. Uso habitualmente restrito a crianças com peso igual ou superior a 15 kg', quando: 'Miíases extensas, cavitárias ou de difícil acesso, para imobilizar e matar as larvas e facilitar a remoção', obs: 'Off-label: a bula da ivermectina registra estrongiloidíase, oncocercose e escabiose, não a miíase, e restringe o uso a crianças com 15 kg ou mais. O emprego na miíase, inclusive cavitária e em miíase por Cochliomyia hominivorax, é descrito em séries de casos e em protocolos assistenciais. Confirmar indicação, peso mínimo e dose conforme protocolo do Ministério da Saúde e bula.', verificar: true },
            { medId: 'ivermectina', nome: 'Ivermectina tópica sobre a lesão', esquema: 'Aplicação tópica conforme protocolo do serviço', quando: 'Alternativa descrita para facilitar a saída das larvas quando a via oral não é adequada ou a criança tem menos de 15 kg', obs: 'Off-label quanto à via e à indicação, sem apresentação registrada para esse uso no Brasil. Descrita em relatos e séries de casos. Confirmar conforme protocolo do serviço.', verificar: true }
          ] },
        { ordem: 4, rotulo: 'Segunda linha - infecção bacteriana secundária', tipo: 'segunda',
          opcoes: [
            { medId: 'cefalexina', nome: 'Cefalexina', esquema: '50 a 100 mg/kg/dia VO dividida a cada 6 h por 7 a 10 dias, conforme protocolo', quando: 'Infecção bacteriana secundária, celulite ou febre', obs: 'Cobertura para estafilococos e estreptococos.' },
            { medId: 'amoxicilina_clavulanato', nome: 'Amoxicilina + clavulanato', esquema: '45 a 50 mg/kg/dia do componente amoxicilina VO dividida a cada 12 h, conforme protocolo do serviço', quando: 'Ferida extensa, cavitária ou com necessidade de cobertura para anaeróbios', obs: '' },
            { medId: 'ceftriaxona', nome: 'Ceftriaxona', esquema: '50 a 100 mg/kg/dia IV, conforme protocolo do serviço', quando: 'Infecção grave com necessidade de internação', obs: '' },
            { medId: 'metronidazol', nome: 'Metronidazol', esquema: 'Associado conforme protocolo do serviço', quando: 'Ferida fétida com suspeita de anaeróbios', obs: '' }
          ] },
        { ordem: 5, rotulo: 'Adjuvante - tratar as condições associadas', tipo: 'adjuvante',
          opcoes: [
            { medId: 'permetrina', nome: 'Permetrina', esquema: 'Loção ou creme a 5% para escabiose e loção a 1% para pediculose, conforme protocolo do Ministério da Saúde e bula', quando: 'Escabiose ou pediculose associadas, que criam as lesões de entrada para a mosca', obs: 'Sem tratar as condições de base, a recorrência é a regra.' },
            { medId: null, nome: 'Tratamento das demais condições predisponentes', esquema: '', quando: 'Otorreia crônica, feridas crônicas, desnutrição e lesões de coçadura', obs: 'A miíase costuma ser marcador de vulnerabilidade social e de acesso deficiente ao cuidado.' }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: null, nome: 'Querosene, óleo diesel, gasolina, creolina, tabaco ou cal sobre a lesão', esquema: '', quando: '', obs: 'Práticas muito comuns na região e francamente prejudiciais: causam queimadura química, dermatite grave, necrose e agravamento da ferida, além de risco de absorção sistêmica na criança. Perguntar ativamente se foram usadas e orientar contra.' },
            { medId: null, nome: 'Retirada da larva com força ou de forma incompleta', esquema: '', quando: '', obs: 'Fragmentos retidos causam reação inflamatória intensa, granuloma de corpo estranho e infecção secundária. Preferir oclusão prévia e movimento suave e contínuo.' },
            { medId: null, nome: 'Antibiótico sistêmico em toda miíase', esquema: '', quando: '', obs: 'Não indicado sem sinais de infecção bacteriana secundária. O tratamento é a remoção das larvas e o cuidado da ferida.' },
            { medId: null, nome: 'Remoção ambulatorial de miíase nasal, auricular, orbitária, oral ou perineal', esquema: '', quando: '', obs: 'Essas localizações exigem avaliação por otorrinolaringologia, oftalmologia ou cirurgia, com remoção sob sedação ou anestesia geral quando necessário e avaliação de extensão por imagem.' },
            { medId: null, nome: 'Alta sem avaliação social quando o quadro sugere negligência', esquema: '', quando: '', obs: 'Miíase extensa em criança com má higiene e feridas crônicas exige avaliação social e, quando indicada, articulação com a rede de proteção e comunicação ao Conselho Tutelar.' }
          ] }
      ],
      naoFarmacologico: [
        'Profilaxia antitetânica conforme a situação vacinal e o tipo de lesão.',
        'Curativos diários com soro fisiológico e cobertura adequada, com reavaliação frequente até a cicatrização.',
        'Tratamento simultâneo de escabiose, pediculose, otorreia crônica, feridas crônicas e desnutrição, sem o que a recorrência é a regra.',
        'Orientação sobre proteção de feridas com curativo, telas e higiene, em ambiente com alta densidade de moscas.',
        'Avaliação social e articulação com a rede de proteção quando houver sinais de negligência.'
      ],
      fontes: [ { nome: 'Ministério da Saúde - Dermatologia na atenção básica e vigilância de zoonoses', ano: 2022 }, { nome: 'Sociedade Brasileira de Pediatria - Documento científico sobre dermatoses parasitárias', ano: 2022 } ],
      atualizadoEm: '2026-09'
    },

    tungiase: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha - remoção mecânica com instrumental estéril', tipo: 'primeira',
          opcoes: [
            { medId: null, nome: 'Extração completa da pulga com agulha estéril ou cureta', esquema: 'Remoção sob antissepsia rigorosa, em ambiente de saúde, com instrumental estéril e individual, seguida de limpeza da cavidade com antisséptico e cobertura', quando: 'Tungíase com poucas lesões ou lesões sintomáticas', obs: 'Tratamento padrão. Realizar com analgesia adequada, especialmente em criança com muitas lesões. Em infestação intensa, programar sessões, priorizando as lesões mais dolorosas e as infectadas.' },
            { medId: 'soro_fisiologico', nome: 'Soro fisiológico 0,9%', esquema: 'Limpeza das lesões e curativos', quando: 'Após a remoção e no cuidado diário dos pés', obs: '' }
          ] },
        { ordem: 2, rotulo: 'Alternativa não invasiva, útil em infestação intensa e em ação comunitária', tipo: 'alternativa',
          opcoes: [
            { medId: null, nome: 'Dimeticona de baixa viscosidade tópica', esquema: 'Aplicação sobre as lesões duas vezes ao dia por vários dias consecutivos, conforme protocolo do serviço e bula', quando: 'Infestação intensa, criança que não tolera a remoção, ou programas comunitários em que a extração individual de dezenas de lesões é inviável', obs: 'Eficácia demonstrada para matar as pulgas incrustadas, com a vantagem de não ser invasiva. Confirmar disponibilidade e esquema conforme protocolo.', verificar: true },
            { medId: null, nome: 'Vaselina ou óleos oclusivos', esquema: 'Aplicação oclusiva conforme protocolo do serviço', quando: 'Medida auxiliar quando não há dimeticona disponível na comunidade', obs: 'Reduz a viabilidade do parasita. Medida paliativa, não substitui a remoção quando ela é possível. Confirmar conforme protocolo do serviço.', verificar: true }
          ] },
        { ordem: 3, rotulo: 'Segunda linha - infecção bacteriana secundária', tipo: 'segunda',
          opcoes: [
            { medId: 'cefalexina', nome: 'Cefalexina', esquema: '50 a 100 mg/kg/dia VO dividida a cada 6 h por 7 a 10 dias, conforme protocolo', quando: 'Infecção bacteriana secundária, complicação frequente e principal causa de morbidade', obs: 'Cobertura para estafilococos e estreptococos.' },
            { medId: 'amoxicilina_clavulanato', nome: 'Amoxicilina + clavulanato', esquema: '45 a 50 mg/kg/dia do componente amoxicilina VO dividida a cada 12 h, conforme protocolo do serviço', quando: 'Infecção extensa ou com necessidade de cobertura ampliada', obs: '' },
            { medId: 'sulfametoxazol_trimetoprim', nome: 'Sulfametoxazol + trimetoprima', esquema: '8 a 12 mg/kg/dia de trimetoprima VO dividida a cada 12 h, conforme protocolo do serviço e perfil local', quando: 'Suspeita de Staphylococcus aureus resistente à meticilina de origem comunitária, e alternativa em alergia a betalactâmicos', obs: 'Contraindicado em menores de 2 meses e na deficiência de G6PD.' },
            { medId: 'ceftriaxona', nome: 'Ceftriaxona', esquema: '50 a 100 mg/kg/dia IV, conforme protocolo do serviço', quando: 'Infecção grave, febre ou toxemia com necessidade de internação', obs: '' }
          ] },
        { ordem: 4, rotulo: 'Adjuvante / sintomático', tipo: 'adjuvante',
          opcoes: [
            { medId: 'paracetamol', nome: 'Paracetamol', esquema: '10 a 15 mg/kg/dose VO a cada 6 h, conforme bula', quando: 'Analgesia regular, pois a dor é subestimada e compromete a marcha e a frequência escolar', obs: '' },
            { medId: 'dipirona', nome: 'Dipirona', esquema: '10 a 15 mg/kg/dose VO a cada 6 h, conforme bula', quando: 'Alternativa analgésica', obs: '' },
            { medId: 'ibuprofeno', nome: 'Ibuprofeno', esquema: '5 a 10 mg/kg/dose VO a cada 6 a 8 h, conforme bula', quando: 'Analgesia e controle do edema', obs: '' }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: null, nome: 'Agulha, alfinete ou espinho compartilhado e não esterilizado para extrair o bicho-de-pé', esquema: '', quando: '', obs: 'Prática domiciliar muito comum e perigosa: causa infecção bacteriana secundária, tétano e risco de transmissão de patógenos de transmissão sanguínea, incluindo hepatites e HIV, quando o instrumento é compartilhado entre membros da família ou vizinhos. Orientar ativamente e oferecer a remoção no serviço.' },
            { medId: null, nome: 'Querosene, creolina, óleo diesel e outras substâncias cáusticas nos pés', esquema: '', quando: '', obs: 'Prática frequente na tentativa de matar a pulga. Causa queimadura química, dermatite de contato e agravamento da infecção, sem eficácia comprovada.' },
            { medId: 'ivermectina', nome: 'Ivermectina oral como tratamento de primeira linha', esquema: '', quando: '', obs: 'Eficácia não consistentemente demonstrada na tungíase, ao contrário do que ocorre na escabiose. Não deve ser considerada tratamento de primeira linha. Se cogitada em situação específica, seguir critérios de peso e idade e confirmar conforme protocolo e bula.' },
            { medId: null, nome: 'Tratar apenas a criança sem abordar a casa, os conviventes e os animais', esquema: '', quando: '', obs: 'A reinfestação ocorre em semanas. A tungíase é problema comunitário e ambiental, não apenas individual.' },
            { medId: null, nome: 'Alta sem atualização da profilaxia antitetânica', esquema: '', quando: '', obs: 'As lesões são portas de entrada clássicas para o tétano. Atualizar o esquema da criança e de toda a família.' }
          ] }
      ],
      naoFarmacologico: [
        'Profilaxia antitetânica conforme a situação vacinal e o tipo de lesão, com atualização do esquema de toda a família.',
        'Cuidados com os pés: lavagem diária com água e sabão, secagem entre os dedos, hidratação da pele, corte adequado das unhas e tratamento de fissuras e hiperceratose.',
        'Tratamento simultâneo dos demais moradores afetados.',
        'Manejo ambiental e animal: cimentar ou compactar o piso, manter o terreiro varrido e limpo, afastar chiqueiros, galinheiros e canis da casa e tratar os animais domésticos.',
        'Articulação com a equipe de saúde da família, com a escola e com a vigilância ambiental, com uso de calçado fechado como medida central de prevenção.'
      ],
      fontes: [ { nome: 'Ministério da Saúde - Dermatologia na atenção básica', ano: 2022 }, { nome: 'OMS - Tungiasis, neglected tropical diseases fact sheet and guidance', ano: 2023 } ],
      atualizadoEm: '2026-09'
    },

    larva_migrans_cutanea: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha', tipo: 'primeira',
          opcoes: [
            { medId: 'albendazol', nome: 'Albendazol', esquema: '400 mg VO uma vez ao dia por 3 a 5 dias, ou 10 a 15 mg/kg/dia, máximo 400 mg ao dia, em crianças menores, conforme protocolo do serviço e bula', quando: 'Larva migrans cutânea confirmada clinicamente pelo trajeto serpiginoso e pruriginoso', obs: 'A doença é autolimitada, mas o tratamento abrevia o curso, alivia o prurido intenso e reduz escoriação e infecção secundária. Confirmar conforme protocolo e bula, respeitando os critérios de idade mínima.', verificar: true }
          ] },
        { ordem: 2, rotulo: 'Alternativa', tipo: 'alternativa',
          opcoes: [
            { medId: 'ivermectina', nome: 'Ivermectina', esquema: '200 microgramas/kg VO em dose única, podendo ser repetida após 1 a 2 semanas conforme avaliação. Uso habitualmente restrito a crianças com peso igual ou superior a 15 kg', quando: 'Alternativa eficaz, especialmente útil quando a adesão a um curso de vários dias é difícil, situação comum em comunidade distante', obs: 'Confirmar indicação, peso mínimo e dose conforme protocolo do Ministério da Saúde e bula.', verificar: true },
            { medId: null, nome: 'Tiabendazol tópico', esquema: 'Aplicação sobre o trajeto e alguns centímetros à frente dele, 2 a 3 vezes ao dia por 7 a 10 dias, conforme disponibilidade, protocolo do serviço e bula', quando: 'Lesões poucas e localizadas, em especial em crianças pequenas nas quais o tratamento sistêmico é limitado por idade ou peso', obs: 'Aplicar à frente da extremidade visível, pois a larva costuma estar adiante do trajeto aparente. Confirmar conforme protocolo.', verificar: true }
          ] },
        { ordem: 3, rotulo: 'Segunda linha - apenas na indisponibilidade das opções anteriores', tipo: 'segunda',
          opcoes: [
            { medId: 'mebendazol', nome: 'Mebendazol', esquema: 'Dose e duração conforme protocolo do serviço e bula', quando: 'Apenas quando albendazol, ivermectina e tiabendazol tópico não estão disponíveis na unidade', obs: 'Eficácia inferior na larva migrans cutânea, não é a escolha preferencial. Confirmar conforme protocolo/bula.', verificar: true },
            { medId: null, nome: 'Reavaliação em 7 dias e novo curso conforme protocolo', esquema: '', quando: 'Ausência de resposta ao tratamento inicial', obs: 'Rever o diagnóstico e considerar novo curso conforme protocolo do serviço.' }
          ] },
        { ordem: 4, rotulo: 'Adjuvante - controle do prurido e da infecção secundária', tipo: 'adjuvante',
          opcoes: [
            { medId: null, nome: 'Anti-histamínico oral, por exemplo hidroxizina ou dexclorfeniramina', esquema: 'Dose conforme idade, peso e bula, com atenção à sedação', quando: 'Prurido intenso, que é o que leva a criança a escoriar e a infectar a lesão', obs: 'Confirmar conforme protocolo e bula.', verificar: true },
            { medId: null, nome: 'Corticoide tópico de baixa potência, por exemplo hidrocortisona 1%', esquema: 'Aplicação por curto período, associada ao antiparasitário, conforme avaliação e bula', quando: 'Alívio da inflamação e do prurido locais', obs: 'Não usar isoladamente sem o antiparasitário. Confirmar conforme protocolo.', verificar: true },
            { medId: 'cefalexina', nome: 'Cefalexina', esquema: '50 a 100 mg/kg/dia VO dividida a cada 6 h por 7 a 10 dias, conforme protocolo', quando: 'Infecção bacteriana secundária: impetiginização ou celulite', obs: '' },
            { medId: 'amoxicilina_clavulanato', nome: 'Amoxicilina + clavulanato', esquema: '45 a 50 mg/kg/dia do componente amoxicilina VO dividida a cada 12 h, conforme protocolo do serviço', quando: 'Infecção secundária extensa ou falha da cefalexina', obs: '' }
          ] },
        { ordem: 9, rotulo: 'Não recomendado de rotina', tipo: 'naorecomendado',
          opcoes: [
            { medId: null, nome: 'Tiabendazol por via oral', esquema: '', quando: '', obs: 'Não recomendado quando há alternativa melhor. A formulação oral tem alta frequência de náusea, vômitos, tontura e efeitos neurológicos, com eficácia não superior à do albendazol e da ivermectina, que são mais bem tolerados. A apresentação tópica é a que mantém espaço no tratamento.' },
            { medId: null, nome: 'Querosene, óleo diesel, cal, creolina, fumo ou folhas maceradas sobre as lesões', esquema: '', quando: '', obs: 'Práticas relatadas na região e causadoras de queimadura química e de dermatite de contato, sem eficácia sobre a larva.' },
            { medId: null, nome: 'Tentar retirar a larva com agulha ou objeto cortante', esquema: '', quando: '', obs: 'A larva costuma estar à frente da extremidade visível do trajeto. O procedimento apenas fere a pele, aumenta a dor e favorece infecção secundária.' },
            { medId: null, nome: 'Crioterapia com nitrogênio líquido sobre o trajeto', esquema: '', quando: '', obs: 'Técnica antiga, dolorosa, com baixa eficácia pelo mesmo motivo e com risco de bolha e de cicatriz, especialmente em criança.' },
            { medId: null, nome: 'Corticoide tópico isolado para o prurido', esquema: '', quando: '', obs: 'Alivia temporariamente sem eliminar a larva, prolongando o quadro. Associar sempre o antiparasitário.' }
          ] }
      ],
      naoFarmacologico: [
        'Controle do prurido com compressas frias, hidratação da pele e corte das unhas, medidas essenciais para reduzir escoriação.',
        'Higiene local com água e sabão e curativos quando houver lesões escoriadas ou infectadas.',
        'Profilaxia antitetânica conforme a situação vacinal, especialmente quando houver escoriações profundas.',
        'Avaliação de outras crianças da casa ou da turma expostas ao mesmo local, com orientação à comunidade sobre a área de risco identificada, geralmente areia ou solo úmido com fezes de cães e gatos.',
        'Prevenção: uso de calçado e de esteira ou canga na areia, e controle de cães e gatos com vermifugação periódica.'
      ],
      fontes: [ { nome: 'Ministério da Saúde - Dermatologia na atenção básica', ano: 2022 }, { nome: 'Sociedade Brasileira de Pediatria - Documento científico sobre dermatoses parasitárias', ano: 2022 } ],
      atualizadoEm: '2026-09'
    }
  },

  rotulosTipo: {
    primeira: { rotulo: 'Primeira escolha', cor: 'verde' },
    alternativa: { rotulo: 'Alternativa', cor: 'azul' },
    segunda: { rotulo: 'Segunda linha', cor: 'azul' },
    terceira: { rotulo: 'Terceira linha / casos refratários', cor: 'ambar' },
    adjuvante: { rotulo: 'Adjuvante / sintomático', cor: 'cinza' },
    offlabel: { rotulo: 'Uso off-label', cor: 'ambar' },
    naorecomendado: { rotulo: 'Não recomendado de rotina', cor: 'vermelho' }
  },

  avisoOfflabel: 'Opção marcada como off-label: uso fora da indicação, faixa etária ou via aprovada em bula no Brasil. Pode ser respaldada por literatura e por protocolos assistenciais, mas exige avaliação individual do risco-benefício, registro em prontuário e, quando possível, consentimento informado dos responsáveis e discussão com especialista ou referência regional.',

  aviso: 'Conteúdo de apoio à decisão clínica, não substitui o julgamento do médico assistente nem os protocolos oficiais vigentes. Antes de prescrever, considerar idade, peso, função renal e hepática, alergias, comorbidades, gravidez ou amamentação, interações e disponibilidade local. Sempre confirmar dose, diluição e duração na bula, no protocolo do serviço e nos manuais do Ministério da Saúde. Itens marcados com verificar exigem confirmação conforme protocolo ou bula antes do uso.',

  fontes: [
    { nome: 'Ministério da Saúde - Guia de Tratamento da Malária no Brasil', ano: 2024 },
    { nome: 'Ministério da Saúde - Dengue: diagnóstico e manejo clínico, criança e adulto', ano: 2024 },
    { nome: 'Ministério da Saúde - Chikungunya: manejo clínico', ano: 2022 },
    { nome: 'Ministério da Saúde - Manual de vigilância e tratamento das leishmanioses', ano: 2022 },
    { nome: 'Ministério da Saúde - Manual de diagnóstico e tratamento de acidentes por animais peçonhentos', ano: 2024 },
    { nome: 'Ministério da Saúde - Manual de recomendações para o controle da tuberculose no Brasil', ano: 2024 },
    { nome: 'Ministério da Saúde - Diretrizes para vigilância, atenção e eliminação da hanseníase', ano: 2022 },
    { nome: 'Ministério da Saúde - PCDT Doença de Chagas', ano: 2022 },
    { nome: 'Ministério da Saúde - Protocolo Clínico e Diretrizes Terapêuticas para Atenção Integral às Pessoas com IST (sífilis congênita)', ano: 2022 },
    { nome: 'Ministério da Saúde - Atenção à Saúde do Recém-Nascido, guia para profissionais de saúde', ano: 2014 },
    { nome: 'Ministério da Saúde - Manejo da criança com desnutrição aguda grave', ano: 2023 },
    { nome: 'Sociedade Brasileira de Pediatria - Tratados e Documentos Científicos (pneumologia, infectologia, neonatologia, emergência)', ano: 2024 },
    { nome: 'Sociedade Brasileira de Pediatria / Programa de Reanimação Neonatal - Diretrizes', ano: 2022 },
    { nome: 'OMS/OPAS - Pocket book of hospital care for children e diretrizes de manejo integrado', ano: 2013 },
    { nome: 'OMS - Guidelines for malaria', ano: 2023 },
    { nome: 'Bulas profissionais registradas na Anvisa', ano: 2025 }
  ],

  atualizadoEm: '2026-09'
};
