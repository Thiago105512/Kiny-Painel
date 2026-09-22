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
    leishmaniose_visceral: {
      linhas: [
        { ordem: 1, rotulo: 'Primeira escolha em pediatria', tipo: 'primeira',
          opcoes: [
            { medId: 'anfotericina_b_lipossomal', nome: 'Anfotericina B lipossomal', esquema: '3 mg/kg/dia IV por 7 dias, ou 4 mg/kg/dia por 5 dias, conforme o Manual de vigilância e tratamento das leishmanioses', quando: 'Primeira escolha em menores de 1 ano, em criança com sinais de gravidade, desnutrição grave, coinfecção HIV, insuficiência renal ou hepática, e em falha ou toxicidade ao antimonial', quando_obs: '', obs: 'Menor toxicidade e internação mais curta. Monitorar potássio, magnésio, função renal e reação infusional.' }
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
            { medId: 'dapsona', nome: 'Dapsona', esquema: 'Dose mensal supervisionada e dose diária autoadministrada, conforme faixa de peso da cartela infantil, em torno de 2 mg/kg/dia', quando: 'Componente do esquema PQT-U', obs: 'Investigar deficiência de G6PD quando disponível, e monitorar hemoglobina pelo risco de hemólise e de metemoglobinemia.', verificar: true },
            { medId: 'clofazimina', nome: 'Clofazimina', esquema: 'Dose mensal supervisionada e dose em dias alternados ou diária conforme faixa de peso da cartela infantil', quando: 'Componente do esquema PQT-U, agora também na forma paucibacilar segundo o esquema único', obs: 'Orientar sobre o escurecimento reversível da pele e ressecamento cutâneo, causa frequente de abandono na adolescência.', verificar: true }
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
