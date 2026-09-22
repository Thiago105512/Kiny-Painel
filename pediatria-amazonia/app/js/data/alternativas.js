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
            { medId: 'artemeter_lumefantrina', nome: 'Artemeter + lumefantrina', esquema: 'VO 12/12 h por 3 dias conforme faixa de peso', quando: 'Alternativa quando há falha ou indisponibilidade de cloroquina para P. vivax, situação prevista no Guia de Tratamento da Malária', obs: 'Discutir com a referência regional ou com o polo de malária antes de trocar o esquema do P. vivax.', verificar: true }
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
