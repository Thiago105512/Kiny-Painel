window.PED = window.PED || {}; var PED = window.PED; PED.data = PED.data || {};

/* Modulo de violencia contra criancas e adolescentes - apoio a decisao.
   Nao substitui a conduta clinica, a legislacao vigente nem os protocolos institucionais.
   Enderecos e telefones locais devem ser confirmados na rede do municipio. */

PED.data.violencia = {

  tipos: [
    {
      id: 'sexual',
      nome: 'Violência sexual',
      sinais: [
        'Relato da criança ou do adolescente de contato sexual, mesmo que breve, confuso ou parcial',
        'Lesão, sangramento, dor, fissura ou hematoma em região genital, anal ou oral sem explicação compatível',
        'Infecção sexualmente transmissível em criança fora do período neonatal',
        'Gravidez em menor de 14 anos, que configura estupro de vulnerável independentemente de consentimento',
        'Comportamento sexualizado incompatível com a fase do desenvolvimento',
        'Dor abdominal, disúria, enurese ou encoprese de início recente sem causa clínica',
        'Recusa intensa de se despir ou de ser examinada, medo específico de uma pessoa',
        'Corrimento vaginal ou uretral persistente em criança pequena'
      ],
      prazoCritico: 'Atendimento imediato; profilaxias têm janela de tempo',
      cor: 'vermelho'
    },
    {
      id: 'fisica',
      nome: 'Violência física',
      sinais: [
        'Lesão incompatível com a história contada ou com a fase do desenvolvimento motor',
        'Hematomas em áreas protegidas: orelhas, pescoço, tronco, face interna de coxas, nádegas, genitália',
        'Lesões com formato de objeto: fivela, cinto, fio, mão, mordida humana',
        'Queimaduras simétricas em luva ou em bota, ou queimadura circular de cigarro',
        'Fraturas múltiplas em estágios diferentes de consolidação',
        'Fratura de fêmur, úmero ou costela em lactente que ainda não anda',
        'Hemorragia retiniana, alteração do nível de consciência ou convulsão em lactente sem causa definida',
        'Demora inexplicada em procurar atendimento e histórias que mudam a cada relato'
      ],
      cor: 'vermelho'
    },
    {
      id: 'psicologica',
      nome: 'Violência psicológica',
      sinais: [
        'Humilhação, xingamento, ameaça ou ridicularização da criança na frente do profissional',
        'Rejeição explícita, isolamento imposto ou culpabilização constante da criança',
        'Criança excessivamente vigilante, retraída, assustada ou que busca aprovação o tempo todo',
        'Queda brusca do rendimento escolar, recusa de ir à escola, regressão de marcos já adquiridos',
        'Queixas somáticas repetidas sem causa orgânica: cefaleia, dor abdominal, insônia',
        'Adolescente com sintomas de ansiedade, depressão ou automutilação associados ao ambiente familiar',
        'Alienação parental ou uso da criança em conflito entre adultos'
      ],
      cor: 'ambar'
    },
    {
      id: 'negligencia',
      nome: 'Negligência e abandono',
      sinais: [
        'Desnutrição, déficit de crescimento ou baixo ganho de peso sem causa orgânica e com falha de cuidado',
        'Higiene precária persistente, dermatite de fralda grave e crônica, pediculose e escabiose não tratadas',
        'Faltas repetidas a consultas, calendário vacinal em atraso sem justificativa, abandono de tratamento crônico',
        'Criança pequena deixada sozinha ou aos cuidados de outra criança',
        'Não administração de medicamento essencial: antirretroviral, anticonvulsivante, insulina, tratamento de tuberculose',
        'Acidentes domésticos de repetição por falta de supervisão',
        'Abandono material ou afetivo, criança entregue a terceiros sem acompanhamento',
        'Falta de acesso à escola sem motivo justificado'
      ],
      cor: 'ambar'
    },
    {
      id: 'domestica',
      nome: 'Violência doméstica presenciada',
      sinais: [
        'Criança relata brigas, agressões ou ameaças entre os adultos da casa',
        'Mãe ou cuidadora com lesões, com medo de falar ou acompanhada por pessoa que não a deixa sozinha',
        'Criança com medo de voltar para casa, sobressalto a vozes altas, sono agitado, pesadelos',
        'Regressão do desenvolvimento, enurese secundária, agressividade ou retraimento após episódios em casa',
        'Registro anterior de ocorrência ou medida protetiva na família',
        'Ambiente com uso abusivo de álcool ou outras drogas associado a agressões'
      ],
      cor: 'ambar'
    },
    {
      id: 'autoprovocada',
      nome: 'Violência autoprovocada / tentativa de suicídio',
      sinais: [
        'Tentativa de suicídio, ingestão intencional de medicamento ou de substância tóxica',
        'Cortes, queimaduras ou escoriações autoprovocadas, em geral em antebraços e coxas',
        'Verbalização de querer morrer, de não ter saída ou de ser um peso para a família',
        'Plano, método escolhido ou acesso a meio letal: arma, medicamento acumulado, agrotóxico',
        'Despedidas, doação de objetos pessoais, mensagens de conteúdo suicida',
        'Isolamento súbito, mudança abrupta de comportamento, uso de álcool ou drogas',
        'Tentativa anterior, que é o principal fator de risco para nova tentativa'
      ],
      cor: 'vermelho'
    },
    {
      id: 'trabalho_infantil',
      nome: 'Trabalho infantil',
      sinais: [
        'Criança ou adolescente que trabalha em feira, porto, rua, roça, garimpo, pesca, olaria ou carvoaria',
        'Menor de 16 anos em qualquer trabalho, exceto aprendiz a partir de 14 anos',
        'Adolescente de 16 a 17 anos em trabalho noturno, perigoso, insalubre ou na Lista TIP',
        'Lesões, queimaduras, calos ou dores musculares compatíveis com esforço e com uso de ferramentas',
        'Exposição a agrotóxico, mercúrio, poeira, solvente, motosserra ou embarcação',
        'Evasão escolar, sonolência diurna e cansaço crônico',
        'Trabalho doméstico em casa de terceiros, comum em meninas'
      ],
      cor: 'ambar'
    },
    {
      id: 'trafico',
      nome: 'Tráfico de pessoas / exploração sexual',
      sinais: [
        'Adolescente com dinheiro, celular, roupas ou drogas sem origem explicada',
        'Relação com adulto muito mais velho apresentado como namorado, padrinho ou patrão',
        'Sexo em troca de dinheiro, comida, abrigo, combustível, passagem de barco ou proteção',
        'Adolescente deslocada de sua cidade, sem documentos, sem rede e sob controle de terceiro',
        'Acompanhante que responde por ela, não a deixa sozinha e controla o atendimento',
        'Trânsito por rota fluvial, garimpo, porto, balsa, obra ou fronteira sem responsável legal',
        'Sinais de cárcere, marcas de contenção, medo de retaliação contra a família',
        'Infecções sexualmente transmissíveis de repetição, gravidez na adolescência, aborto inseguro'
      ],
      cor: 'vermelho'
    }
  ],

  sinaisAlerta: [
    { id: 'lesao_incompativel', texto: 'Lesão incompatível com a história ou com a fase do desenvolvimento' },
    { id: 'historia_muda', texto: 'História que muda a cada relato ou diverge entre os acompanhantes' },
    { id: 'demora_atendimento', texto: 'Demora inexplicada em procurar atendimento após a lesão' },
    { id: 'lesoes_varias_idades', texto: 'Lesões em estágios diferentes de cicatrização ou de consolidação' },
    { id: 'lesao_area_protegida', texto: 'Lesão em área protegida: orelha, pescoço, tronco, nádegas, face interna das coxas, genitália' },
    { id: 'relato_crianca', texto: 'Relato espontâneo da criança ou do adolescente de agressão ou de contato sexual' },
    { id: 'lesao_genital', texto: 'Lesão, sangramento ou dor em região genital ou anal sem explicação compatível' },
    { id: 'ist_infantil', texto: 'Infecção sexualmente transmissível em criança fora do período neonatal' },
    { id: 'gravidez_menor14', texto: 'Gravidez em menor de 14 anos' },
    { id: 'comportamento_sexualizado', texto: 'Comportamento sexualizado incompatível com a idade' },
    { id: 'medo_acompanhante', texto: 'Medo, retraimento ou silêncio na presença de determinado acompanhante' },
    { id: 'acompanhante_controla', texto: 'Acompanhante que responde por tudo e não permite o atendimento a sós' },
    { id: 'faltas_repetidas', texto: 'Faltas repetidas a consultas, vacinas atrasadas ou abandono de tratamento' },
    { id: 'desnutricao_sem_causa', texto: 'Desnutrição ou baixo ganho de peso sem causa orgânica identificada' },
    { id: 'higiene_precaria', texto: 'Higiene precária persistente e cuidados básicos não oferecidos' },
    { id: 'regressao_desenvolvimento', texto: 'Regressão de marcos já adquiridos, enurese ou encoprese secundária' },
    { id: 'mudanca_comportamento', texto: 'Mudança abrupta de comportamento, isolamento ou queda do rendimento escolar' },
    { id: 'autolesao', texto: 'Marcas de autolesão, ideação suicida ou tentativa de suicídio' },
    { id: 'violencia_domestica_casa', texto: 'Relato de agressões entre adultos no domicílio' },
    { id: 'trabalho_precoce', texto: 'Criança ou adolescente em atividade de trabalho' },
    { id: 'saida_escola', texto: 'Evasão escolar ou criança fora da escola sem justificativa' },
    { id: 'uso_substancias_familia', texto: 'Uso abusivo de álcool ou outras drogas por cuidador, com repercussão no cuidado' },
    { id: 'sem_documentos_sem_rede', texto: 'Adolescente longe de sua cidade, sem documentos e sob controle de terceiro' },
    { id: 'bens_sem_origem', texto: 'Dinheiro, objetos ou drogas sem origem explicada, ou relação com adulto muito mais velho' }
  ],

  conduta: {
    geral: [
      '1. Garanta a segurança imediata: avalie risco de vida, estabilize o quadro clínico e verifique se a criança pode voltar para casa hoje',
      '2. Atenda em ambiente reservado, com tempo e sem pressa; ofereça a escuta a sós quando a idade permitir e sempre que houver suspeita de que o acompanhante seja o agressor',
      '3. Acolha sem julgar: diga que acredita, que a culpa não é da criança e que ela fez certo em contar',
      '4. Não reinquira sobre os detalhes do fato; registre apenas o que a criança disser espontaneamente, com as palavras dela entre aspas',
      '5. Faça o exame físico completo, com a criança despida por etapas, explicando cada passo e com acompanhante de confiança; descreva as lesões com localização, formato, tamanho e coloração',
      '6. Trate as lesões e a dor; em violência sexual, inicie as profilaxias com janela de tempo antes de qualquer outro encaminhamento',
      '7. Preencha a Ficha de Notificação Individual de Violência Interpessoal e Autoprovocada (SINAN); a suspeita já basta para notificar',
      '8. Comunique o Conselho Tutelar da região de moradia da criança, no mesmo dia, por escrito e com registro de quem recebeu',
      '9. Acione a autoridade policial quando houver crime em andamento, risco iminente ou necessidade de medida protetiva de urgência',
      '10. Avalie o risco de retorno ao domicílio: se houver risco, mantenha internação de proteção e acione o Conselho Tutelar e a rede antes da alta',
      '11. Encaminhe para acompanhamento: saúde mental, CREAS, CRAS, atenção primária da área e serviço de referência quando indicado',
      '12. Registre tudo no prontuário de forma objetiva, sigilosa e legível, incluindo os encaminhamentos, horários e nomes dos serviços acionados',
      '13. Agende o retorno e defina quem, na equipe, vai acompanhar o caso; violência sem seguimento se repete',
      '14. Informe à família, de forma clara e não acusatória, que a notificação é uma obrigação legal do serviço de saúde e é uma medida de proteção, não uma denúncia policial'
    ],
    porTipo: {

      sexual: {
        passos: [
          '1. Atenda agora: violência sexual é urgência, não agende para outro dia nem transfira antes do acolhimento inicial',
          '2. Registre a data e a hora prováveis do fato; é esse horário que define quais profilaxias ainda cabem',
          '3. Inicie a profilaxia pós-exposição ao HIV se a exposição for de risco e ocorreu há menos de 72 horas; a primeira dose deve ser dada o quanto antes, idealmente nas primeiras 2 horas',
          '4. Ofereça contracepção de emergência a meninas pós-menarca, até 5 dias do fato, com melhor eficácia quanto mais precoce',
          '5. Faça a profilaxia das IST não virais conforme o PCDT, com doses calculadas por peso',
          '6. Verifique a situação vacinal de hepatite B e complete o esquema; indique imunoglobulina humana anti-hepatite B quando não houver esquema vacinal completo comprovado',
          '7. Colete os exames de base antes do início das profilaxias, sem atrasar a primeira dose por causa dos exames',
          '8. Preserve vestígios: oriente a não lavar roupas, guarde as peças em saco de papel e faça a coleta conforme o protocolo institucional, no próprio serviço de saúde',
          '9. Notifique imediatamente no SINAN, em até 24 horas, e comunique o Conselho Tutelar no mesmo dia',
          '10. Comunique a autoridade policial; em menor de 14 anos, o fato configura estupro de vulnerável, crime de ação pública incondicionada',
          '11. Avalie o risco de retorno ao domicílio, sobretudo quando o suspeito reside com a criança, e acione a rede de proteção antes da alta',
          '12. Encaminhe ao serviço de referência hospitalar para violência sexual e garanta o retorno em 2 a 4 semanas para adesão, tolerância e sorologias de seguimento',
          '13. Ofereça atendimento psicossocial à criança e ao acompanhante protetivo desde a primeira consulta'
        ],
        janelas: [
          { acao: 'Profilaxia do HIV (PEP)', prazo: 'até 72 horas', obs: 'Iniciar o mais cedo possível, idealmente nas primeiras 2 horas; após 72 horas não está indicada. Duração de 28 dias, sem interrupção. Esquema e dose pediátrica conforme PCDT PEP do Ministério da Saúde, calcular por peso e idade', verificar: true },
          { acao: 'Contracepção de emergência', prazo: 'até 5 dias, idealmente 72 horas', obs: 'em meninas pós-menarca; levonorgestrel 1,5 mg por via oral em dose única; a eficácia é maior quanto mais precoce a administração' },
          { acao: 'Profilaxia de IST não virais', prazo: 'preferencialmente até 72 horas, mas pode ser feita depois desse prazo', obs: 'Cobertura para sífilis, gonorreia, clamídia e tricomoníase conforme o PCDT do Ministério da Saúde; doses pediátricas calculadas por peso, com ajuste ou adiamento do metronidazol quando houver intolerância', verificar: true },
          { acao: 'Vacina e imunoglobulina para hepatite B', prazo: 'vacina o quanto antes; imunoglobulina até 14 dias do fato, idealmente nas primeiras 48 horas', obs: 'Indicadas quando não houver esquema vacinal completo comprovado ou quando a criança for não respondedora. Aplicar vacina e imunoglobulina em locais anatômicos diferentes. Não é necessária se houver esquema completo documentado', verificar: true },
          { acao: 'Coleta de vestígios', prazo: 'idealmente até 72 horas do fato', obs: 'A coleta pode ser feita no próprio serviço de saúde, conforme a Lei 13.431/2017 e o Decreto 9.603/2018, com cadeia de custódia e sem reinquirir a criança. Orientar a não lavar o corpo nem as roupas e a guardar as peças em saco de papel. O atendimento em saúde nunca depende da perícia' },
          { acao: 'Exames de base (sorologias e teste de gravidez)', prazo: 'na primeira consulta, antes de iniciar as profilaxias', obs: 'Não atrasar a primeira dose das profilaxias esperando resultado de exame' },
          { acao: 'Retorno para seguimento', prazo: '2 a 4 semanas, 3 meses e 6 meses', obs: 'Avaliar adesão, tolerância, sorologias de seguimento e acompanhamento psicossocial' }
        ],
        medicamentos: [
          { nome: 'Profilaxia pós-exposição ao HIV (PEP)', dose: 'dose conforme PCDT PEP do Ministério da Saúde, calcular por peso', duracao: '28 dias, sem interrupção', obs: 'O esquema varia com a idade e o peso; em adolescentes a partir de 12 anos e com 35 kg ou mais, o esquema preferencial do PCDT é tenofovir associado a lamivudina e dolutegravir, uma vez ao dia. Em crianças menores, usar o esquema pediátrico do PCDT. Conferir sempre a versão vigente', verificar: true },
          { nome: 'Contracepção de emergência', dose: 'levonorgestrel 1,5 mg por via oral em dose única', duracao: 'dose única', obs: 'Indicada em meninas pós-menarca, até 5 dias do fato, com melhor eficácia quanto mais precoce. Alternativa em duas doses de 0,75 mg com intervalo de 12 horas quando só houver esta apresentação', verificar: true },
          { nome: 'Profilaxia de IST não virais (sífilis, gonorreia, clamídia e tricomoníase)', dose: 'dose conforme PCDT PEP do Ministério da Saúde, calcular por peso', duracao: 'dose única para a maior parte dos agentes; metronidazol conforme esquema do protocolo', obs: 'Esquema pediátrico com benzilpenicilina benzatina, ceftriaxona, azitromicina e metronidazol, com doses por peso e limite da dose de adulto. O metronidazol pode ser adiado quando houver intolerância ou uso concomitante da PEP. Conferir o protocolo vigente', verificar: true },
          { nome: 'Vacina hepatite B', dose: 'dose conforme o calendário vacinal e a idade', duracao: 'completar o esquema', obs: 'Aplicar quando não houver esquema completo comprovado; iniciar ou completar o esquema o quanto antes', verificar: true },
          { nome: 'Imunoglobulina humana anti-hepatite B (IGHAHB)', dose: 'dose conforme PCDT PEP do Ministério da Saúde, calcular por peso', duracao: 'dose única', obs: 'Indicada até 14 dias do fato, idealmente nas primeiras 48 horas, quando não houver esquema vacinal completo comprovado ou em não respondedores. Aplicar em local anatômico diferente do da vacina; disponível nos CRIE', verificar: true },
          { nome: 'Analgesia, antiemético e suporte clínico', dose: 'dose habitual por peso conforme o protocolo do serviço', duracao: 'conforme necessidade', obs: 'A tolerância à PEP melhora com antiemético; a má adesão nos primeiros dias é a principal causa de falha', verificar: true }
        ],
        exames: [
          'Teste rápido para HIV na criança e, quando possível, no suspeito, sem atrasar a primeira dose da PEP',
          'Teste rápido ou sorologia para sífilis (VDRL e teste treponêmico)',
          'Sorologia para hepatite B (HBsAg e anti-HBs) e para hepatite C',
          'Teste de gravidez em meninas pós-menarca',
          'Hemograma, transaminases e creatinina antes e durante a profilaxia antirretroviral',
          'Pesquisa de gonorreia, clamídia e tricomoníase conforme disponibilidade e protocolo do serviço',
          'Exame físico completo com descrição objetiva das lesões; não realizar exame genital invasivo apenas para fins de prova'
        ],
        oQueNaoFazer: [
          'Não reinquirir a criança sobre os detalhes do fato: a escuta especializada e o depoimento especial são do sistema de justiça',
          'Não exigir boletim de ocorrência, exame do IML ou autorização judicial para atender, medicar ou iniciar as profilaxias',
          'Não condicionar a notificação à autorização da família nem à concordância dos responsáveis',
          'Não fotografar lesões sem protocolo institucional, consentimento e guarda segura das imagens',
          'Não usar termos de julgamento no prontuário, como criança promíscua, sedutora, mãe negligente ou relato duvidoso',
          'Não realizar exame genital forçado, repetido ou apenas para colher prova',
          'Não confrontar o suspeito nem avisá-lo da suspeita, o que pode aumentar o risco para a criança',
          'Não atrasar a profilaxia do HIV esperando resultado de exame, perícia ou transferência',
          'Não devolver a criança ao domicílio sem avaliar o risco e sem acionar a rede de proteção',
          'Não anotar a suspeita em receitas, atestados ou documentos que possam chegar ao suspeito'
        ]
      },

      fisica: {
        passos: [
          '1. Estabilize primeiro: avalie via aérea, respiração, circulação, nível de consciência e trauma craniano',
          '2. Compare a lesão com a história contada e com a fase do desenvolvimento motor da criança; incompatibilidade é o principal sinal',
          '3. Faça o exame físico completo com a criança despida por etapas, incluindo couro cabeludo, orelhas, boca, dorso, nádegas, genitália e planta dos pés',
          '4. Descreva cada lesão com localização, formato, tamanho, cor e estágio de evolução, usando desenho corporal quando houver no serviço',
          '5. Ouça a criança a sós quando a idade permitir, sem reinquirir sobre os detalhes do fato',
          '6. Solicite exames de imagem e laboratoriais para avaliar lesões ocultas e diagnósticos diferenciais',
          '7. Internação de proteção sempre que houver risco de novo episódio, mesmo quando a lesão não exigir internação clínica',
          '8. Notifique no SINAN e comunique o Conselho Tutelar no mesmo dia',
          '9. Acione a autoridade policial nos casos graves, com risco iminente ou necessidade de medida protetiva de urgência',
          '10. Avalie os irmãos e as outras crianças do domicílio, que costumam estar sob o mesmo risco',
          '11. Defina o plano de seguimento com a atenção primária, o CREAS e a saúde mental antes da alta'
        ],
        exames: [
          'Radiografias conforme a suspeita clínica; inquérito ósseo (série óssea) em menores de 2 anos com suspeita de violência física',
          'Tomografia de crânio em lactente com alteração neurológica, vômitos, irritabilidade, fratura craniana ou suspeita de trauma craniano abusivo',
          'Fundo de olho por oftalmologista quando houver suspeita de trauma craniano abusivo, buscando hemorragia retiniana',
          'Hemograma, coagulograma e plaquetas para diferenciar de distúrbio de coagulação',
          'Transaminases, amilase e lipase e avaliação de imagem abdominal quando houver suspeita de trauma abdominal',
          'Cálcio, fósforo, fosfatase alcalina e vitamina D quando o diagnóstico diferencial incluir doença óssea',
          'Documentação fotográfica somente conforme protocolo institucional'
        ],
        oQueNaoFazer: [
          'Não reinquirir a criança sobre os detalhes do fato: a escuta especializada é do sistema de justiça',
          'Não exigir boletim de ocorrência para atender, examinar ou internar',
          'Não condicionar a notificação à autorização da família',
          'Não fotografar lesões sem protocolo institucional',
          'Não usar termos de julgamento no prontuário; descreva fatos e achados, não opiniões sobre os cuidadores',
          'Não dar alta para o mesmo ambiente sem avaliar o risco e sem acionar o Conselho Tutelar',
          'Não confrontar ou acusar o acompanhante dentro do consultório',
          'Não atribuir de imediato hematomas a manchas mongólicas, quedas ou doenças sem avaliar a compatibilidade e os diagnósticos diferenciais'
        ]
      },

      psicologica: {
        passos: [
          '1. Nomeie o que observou de forma objetiva: ameaças, humilhações, rejeição, isolamento imposto ou uso da criança em conflito entre adultos',
          '2. Ofereça escuta a sós ao adolescente e à criança em idade escolar, em ambiente reservado',
          '3. Avalie sintomas de ansiedade, depressão, autolesão e ideação suicida; pergunte diretamente sobre vontade de morrer',
          '4. Investigue queixas somáticas repetidas e afaste causas orgânicas sem abandonar a hipótese de violência',
          '5. Avalie o funcionamento escolar e a rede de apoio: quem protege esta criança hoje',
          '6. Notifique no SINAN e comunique o Conselho Tutelar; a violência psicológica também é de notificação obrigatória',
          '7. Encaminhe ao CREAS e ao serviço de saúde mental infantojuvenil ou CAPS infantil da região',
          '8. Ofereça orientação parental e encaminhe os cuidadores para apoio quando houver abertura, sem condicionar a proteção da criança a isso',
          '9. Agende retorno próximo e mantenha o caso em acompanhamento na atenção primária'
        ],
        exames: [
          'Não há exame que confirme violência psicológica; a avaliação é clínica',
          'Exames apenas para afastar causas orgânicas das queixas somáticas, conforme o quadro',
          'Avaliação de saúde mental estruturada e rastreio de risco de suicídio no adolescente'
        ],
        oQueNaoFazer: [
          'Não reinquirir a criança sobre os detalhes do fato',
          'Não exigir boletim de ocorrência para atender ou encaminhar',
          'Não condicionar a notificação à autorização da família',
          'Não fotografar lesões sem protocolo institucional',
          'Não usar termos de julgamento no prontuário sobre a criança ou os cuidadores',
          'Não minimizar dizendo que é só jeito de criar ou que não houve agressão física',
          'Não confrontar os cuidadores na frente da criança nem repetir a ela o que foi dito pelo adulto',
          'Não encerrar o caso apenas com orientação verbal, sem notificação e sem seguimento'
        ]
      },

      negligencia: {
        passos: [
          '1. Separe a falta de cuidado da falta de condições: pobreza, por si só, não é negligência; a resposta a vulnerabilidade social é a rede de assistência',
          '2. Avalie peso, estatura, perímetro cefálico e curva de crescimento, e compare com os registros anteriores',
          '3. Cheque o cartão de vacinas, a adesão a tratamentos crônicos e o comparecimento às consultas',
          '4. Examine higiene, pele, dentição, vestuário e sinais de exposição ou de falta de supervisão',
          '5. Verifique se há criança pequena sozinha ou sob cuidado de outra criança e se há acesso à escola',
          '6. Trate o que é clínico agora: desnutrição, anemia, parasitoses, infecção de pele, atraso vacinal',
          '7. Notifique no SINAN e comunique o Conselho Tutelar quando houver omissão de cuidado com risco à saúde ou ao desenvolvimento',
          '8. Encaminhe a família ao CRAS e, quando houver violação de direito, ao CREAS; acione a atenção primária para visita domiciliar',
          '9. Considere internação para investigação e proteção quando a desnutrição for grave ou houver risco imediato',
          '10. Registre o plano de cuidado com metas objetivas e reavaliação com data marcada'
        ],
        exames: [
          'Avaliação antropométrica completa com cálculo de escore Z e análise da curva',
          'Hemograma e ferritina para anemia; parasitológico de fezes conforme o contexto',
          'Exames para afastar causas orgânicas de déficit de crescimento conforme a clínica',
          'Avaliação do desenvolvimento neuropsicomotor e da saúde bucal',
          'Verificação documental da vacinação e da dispensação de medicamentos de uso contínuo'
        ],
        oQueNaoFazer: [
          'Não reinquirir a criança sobre os detalhes do fato',
          'Não exigir boletim de ocorrência para atender ou encaminhar',
          'Não condicionar a notificação à autorização da família',
          'Não fotografar lesões sem protocolo institucional',
          'Não usar termos de julgamento no prontuário, como mãe relapsa ou família desestruturada; descreva os fatos observados',
          'Não confundir pobreza com negligência nem notificar apenas por condição social, sem omissão de cuidado',
          'Não responsabilizar isoladamente a mãe sem avaliar os demais responsáveis e a rede de apoio',
          'Não dar alta sem garantir o acesso concreto ao que falta: medicamento, alimento, vacina, consulta'
        ]
      },

      domestica: {
        passos: [
          '1. Reconheça a criança que presencia violência entre adultos como vítima de violência psicológica, conforme a Lei 13.431/2017',
          '2. Atenda a criança e a mãe ou cuidadora separadamente, nunca na presença do suspeito',
          '3. Avalie o risco imediato: ameaça com arma, ameaça de morte, agressões em escalada, uso de álcool ou drogas, descumprimento de medida protetiva',
          '4. Trate as lesões da criança e avalie repercussões no sono, no comportamento, na escola e no desenvolvimento',
          '5. Informe a cuidadora sobre a Lei Maria da Penha, sobre a medida protetiva de urgência e sobre o Disque 180, sem exigir que ela denuncie para receber atendimento',
          '6. Notifique no SINAN a violência contra a criança e comunique o Conselho Tutelar',
          '7. Acione a delegacia especializada e, em risco iminente, a Polícia Militar pelo 190',
          '8. Encaminhe ao CREAS e ao serviço de saúde mental; ofereça apoio psicossocial à criança e à cuidadora protetiva',
          '9. Construa um plano de segurança concreto: para onde ir, com quem ficar, o que levar, a quem ligar',
          '10. Avalie os irmãos e agende retorno próximo'
        ],
        exames: [
          'Exame físico completo da criança com descrição das lesões, quando houver',
          'Avaliação do desenvolvimento e do comportamento, incluindo sono, alimentação e escola',
          'Rastreio de sintomas de ansiedade, depressão e estresse pós-traumático conforme a idade',
          'Não há exame laboratorial que confirme violência presenciada'
        ],
        oQueNaoFazer: [
          'Não reinquirir a criança sobre os detalhes do fato',
          'Não exigir boletim de ocorrência para atender ou encaminhar',
          'Não condicionar a notificação à autorização da família',
          'Não fotografar lesões sem protocolo institucional',
          'Não usar termos de julgamento no prontuário sobre a criança, a cuidadora ou a família',
          'Não atender a cuidadora na presença do suspeito nem entregar a ela documentos que revelem o encaminhamento se isso aumentar o risco',
          'Não cobrar da cuidadora que saia de casa ou que denuncie como condição para o cuidado da criança',
          'Não fazer mediação familiar nem conversa conjunta com agressor e vítima'
        ]
      },

      autoprovocada: {
        passos: [
          '1. Trate a emergência clínica: intoxicação, hemorragia, rebaixamento de consciência; acione o SAMU pelo 192 se necessário',
          '2. Mantenha a vigilância contínua: adolescente com risco de suicídio não fica sozinho, nem no banheiro',
          '3. Retire o acesso a meios letais no serviço e oriente a retirada em casa: medicamentos, armas, agrotóxicos, cordas',
          '4. Pergunte diretamente sobre ideação, plano, método, tentativa anterior e intenção atual; perguntar não induz ao suicídio',
          '5. Avalie a gravidade da tentativa, o grau de arrependimento ou de manutenção da intenção e a rede de apoio disponível',
          '6. Investigue as causas associadas, incluindo violência sexual, bullying, violência doméstica e uso de substâncias',
          '7. Interne quando houver risco alto, tentativa com método de alta letalidade, ausência de rede de apoio ou impossibilidade de supervisão',
          '8. Notifique imediatamente no SINAN, em até 24 horas; tentativa de suicídio é de notificação compulsória imediata',
          '9. Comunique o Conselho Tutelar, por se tratar de criança ou adolescente',
          '10. Encaminhe ao CAPS infantojuvenil ou serviço de saúde mental com data de consulta garantida, não apenas com encaminhamento no papel',
          '11. Oriente a família sobre supervisão, restrição de meios, sinais de alerta e o que fazer em uma crise',
          '12. Garanta contato ativo da equipe nos primeiros dias após a alta, período de maior risco de nova tentativa'
        ],
        exames: [
          'Conforme o método: glicemia, eletrólitos, função renal e hepática, gasometria, ECG e nível sérico do agente quando disponível',
          'Contato com o Centro de Informação Toxicológica para orientação nas intoxicações',
          'Beta-HCG em adolescentes do sexo feminino antes de medicações',
          'Avaliação clínica das lesões autoprovocadas e do risco de infecção',
          'Avaliação estruturada de risco de suicídio, com registro no prontuário'
        ],
        oQueNaoFazer: [
          'Não reinquirir a criança sobre os detalhes do fato quando houver violência associada; a escuta especializada é do sistema de justiça',
          'Não exigir boletim de ocorrência para atender',
          'Não condicionar a notificação à autorização da família',
          'Não fotografar lesões sem protocolo institucional',
          'Não usar termos de julgamento no prontuário, como gesto para chamar atenção ou simulação',
          'Não deixar o adolescente sozinho nem liberar para casa sem avaliação de risco e sem plano de segurança',
          'Não dar alta apenas com receita e encaminhamento sem vaga e sem data',
          'Não devolver ao adolescente ou à família a caixa de medicamentos usada na tentativa',
          'Não prometer sigilo absoluto ao adolescente quando há risco de vida; explique o que precisa ser compartilhado e com quem'
        ]
      },

      trabalho_infantil: {
        passos: [
          '1. Pergunte sobre trabalho na rotina: o que faz, onde, com quem, quantas horas, desde quando e se recebe pagamento',
          '2. Identifique a idade e a atividade: qualquer trabalho abaixo de 16 anos é proibido, exceto aprendiz a partir de 14 anos; trabalho perigoso, insalubre ou noturno é proibido abaixo de 18 anos',
          '3. Avalie as repercussões em saúde: lesões, dores, fadiga, exposição a agrotóxico, mercúrio, poeira, ruído, calor, ferramentas e embarcações',
          '4. Registre a exposição ocupacional no prontuário; em acidente, notifique também como acidente de trabalho em menor de 18 anos',
          '5. Verifique frequência escolar e sono',
          '6. Notifique no SINAN e comunique o Conselho Tutelar',
          '7. Encaminhe a família ao CRAS e ao CREAS e informe os canais do Ministério Público do Trabalho e do Programa de Erradicação do Trabalho Infantil',
          '8. Ofereça alternativas concretas à renda familiar por meio da assistência social, sem culpabilizar a família',
          '9. Agende retorno e acompanhe a saída da criança da atividade'
        ],
        exames: [
          'Conforme a exposição: hemograma, função renal e hepática',
          'Avaliação para exposição a agrotóxicos, incluindo colinesterase quando indicado e disponível',
          'Avaliação de exposição ao mercúrio em áreas de garimpo, conforme protocolo e disponibilidade regional',
          'Avaliação audiométrica e dermatológica quando a exposição justificar',
          'Avaliação nutricional e do desenvolvimento'
        ],
        oQueNaoFazer: [
          'Não reinquirir a criança sobre os detalhes do fato',
          'Não exigir boletim de ocorrência para atender ou encaminhar',
          'Não condicionar a notificação à autorização da família',
          'Não fotografar lesões sem protocolo institucional',
          'Não usar termos de julgamento no prontuário sobre a criança ou a família',
          'Não tratar o trabalho infantil como ajuda em casa, aprendizado de vida ou sinal de responsabilidade',
          'Não emitir declaração de aptidão para trabalho proibido a menores de 18 anos',
          'Não notificar sem oferecer à família o encaminhamento para a assistência social'
        ]
      },

      trafico: {
        passos: [
          '1. Priorize a segurança: atenda a adolescente a sós, em local reservado, e não deixe o acompanhante suspeito responder por ela',
          '2. Não faça perguntas investigativas sobre a rede ou sobre os aliciadores; isso é papel da polícia e do sistema de justiça e pode aumentar o risco',
          '3. Avalie e trate as necessidades clínicas imediatas: lesões, infecções, gravidez, uso de substâncias, desnutrição, abstinência',
          '4. Aplique o protocolo de violência sexual sempre que houver exploração sexual, respeitando as janelas de profilaxia',
          '5. Notifique imediatamente no SINAN, em até 24 horas, e comunique o Conselho Tutelar',
          '6. Acione a autoridade policial e o Ministério Público; em risco iminente, chame a Polícia Militar pelo 190',
          '7. Oriente sobre o Disque 100, que também recebe denúncia anônima de tráfico de pessoas e exploração sexual',
          '8. Avalie a necessidade de acolhimento institucional imediato quando não houver retorno seguro ao domicílio',
          '9. Encaminhe ao CREAS e ao serviço de referência; em município do interior, acione o Conselho Tutelar local e a delegacia do município',
          '10. Guarde o sigilo do endereço e do destino da adolescente; não informe a terceiros para onde ela foi'
        ],
        exames: [
          'Teste rápido para HIV, sífilis, hepatite B e hepatite C',
          'Teste de gravidez em meninas pós-menarca',
          'Pesquisa de gonorreia, clamídia e tricomoníase conforme disponibilidade',
          'Exame físico completo com descrição objetiva de lesões, marcas de contenção e sinais de maus-tratos',
          'Avaliação nutricional, de saúde mental e de uso de substâncias'
        ],
        oQueNaoFazer: [
          'Não reinquirir a criança ou a adolescente sobre os detalhes do fato: a escuta especializada é do sistema de justiça',
          'Não exigir boletim de ocorrência para atender',
          'Não condicionar a notificação à autorização da família',
          'Não fotografar lesões sem protocolo institucional',
          'Não usar termos de julgamento no prontuário, como prostituição infantil, garota de programa ou vida fácil; a expressão correta é exploração sexual',
          'Não entregar a adolescente ao acompanhante suspeito nem informar a ele os encaminhamentos',
          'Não abordar, confrontar ou identificar o suspeito dentro do serviço',
          'Não registrar em documentos visíveis o destino de acolhimento da adolescente',
          'Não tratar adolescente em exploração sexual como autora de ato infracional: ela é vítima'
        ]
      }
    }
  },

  legal: {
    notificacaoCompulsoria: {
      texto: 'Todo caso suspeito ou confirmado de violência contra criança ou adolescente deve ser notificado pelo serviço de saúde, público ou privado. A suspeita basta: não se aguarda confirmação, exame pericial, boletim de ocorrência nem autorização da família. A notificação é epidemiológica e de proteção, é sigilosa e não é denúncia policial',
      prazo: 'imediata, em até 24 horas',
      ficha: 'Ficha de Notificação Individual de Violência Interpessoal e Autoprovocada (SINAN)',
      base: 'Lei 13.431/2017; ECA art. 13 e 245; Portaria GM/MS de notificação compulsória',
      obs: 'Violência sexual, tentativa de suicídio e toda violência contra criança e adolescente são de notificação imediata, em até 24 horas, à vigilância epidemiológica municipal'
    },
    conselhoTutelar: {
      texto: 'Comunicação obrigatória ao Conselho Tutelar, independentemente de boletim de ocorrência',
      base: 'ECA art. 13',
      obs: 'A comunicação é dever do profissional de saúde e não depende de autorização da família. Fazer no mesmo dia, por escrito, com cópia no prontuário e registro do nome de quem recebeu, da data e da hora. Acionar o Conselho Tutelar da região de moradia da criança; nos municípios do interior, o Conselho Tutelar local'
    },
    escutaEspecializada: {
      texto: 'A Lei 13.431/2017 separa a escuta especializada, feita pelos órgãos de proteção e restrita ao estritamente necessário para o cuidado, do depoimento especial, que é a oitiva perante a autoridade policial ou judiciária. O serviço de saúde faz o acolhimento e o cuidado, registra o que a criança contar espontaneamente e evita a repetição do relato, que revitimiza',
      base: 'Lei 13.431/2017',
      obs: 'O profissional de saúde NÃO deve reinquirir a criança sobre os detalhes do fato'
    },
    sigilo: {
      texto: 'O caso é sigiloso. A notificação e a comunicação ao Conselho Tutelar não violam o sigilo profissional: são obrigação legal e proteção de criança e adolescente. Não revelar o caso a terceiros, não discutir em corredor, não registrar a suspeita em receitas, atestados ou documentos que possam chegar ao suspeito, e proteger o endereço e o destino da criança quando houver risco. Identificar-se como notificante é permitido e a ficha não é peça de acusação',
      base: 'ECA art. 13; Lei 13.431/2017; Código de Ética Médica, que ressalva o sigilo por dever legal e por justa causa'
    },
    documentacao: [
      'Descrever no prontuário com as palavras da criança entre aspas',
      'Registrar quem trouxe a criança, quem estava presente e o que cada acompanhante relatou, identificando a fonte de cada informação',
      'Descrever cada lesão com localização, formato, tamanho, cor e estágio de evolução, usando desenho corporal quando disponível',
      'Registrar data e hora do atendimento e, quando informado, data e hora prováveis do fato',
      'Registrar as profilaxias indicadas, com nome, dose, horário da primeira dose e orientação de continuidade',
      'Registrar os encaminhamentos feitos, com nome do serviço, forma de contato e nome de quem recebeu a comunicação',
      'Usar linguagem descritiva e objetiva, sem juízo de valor sobre a criança, a família ou o suspeito',
      'Evitar termos que enfraqueçam o registro, como suposta agressão ou relato duvidoso; escrever o que foi observado e o que foi relatado',
      'Guardar cópia da ficha de notificação e do ofício ao Conselho Tutelar no prontuário',
      'Registrar as recusas e as ausências, incluindo recusa de exame, de internação ou de retorno'
    ],
    outrasObrigacoes: [
      'Menor de 14 anos: qualquer ato sexual configura estupro de vulnerável, crime de ação pública incondicionada, independentemente de consentimento (Código Penal art. 217-A)',
      'O atendimento e a profilaxia em violência sexual não dependem de boletim de ocorrência, de perícia nem de autorização judicial',
      'A interrupção da gestação prevista em lei em caso de estupro não exige autorização judicial nem boletim de ocorrência; encaminhar ao serviço de referência',
      'Deixar de comunicar à autoridade competente caso de suspeita ou confirmação de maus-tratos contra criança ou adolescente é infração administrativa com pena de multa (ECA art. 245)',
      'A criança e o adolescente têm direito a acompanhante de sua confiança durante o atendimento'
    ]
  },

  servicos: [
    { nome: 'Delegacia Especializada em Proteção à Criança e ao Adolescente (DEPCA)', tipo: 'delegacia', cidade: 'Manaus', endereco: '', telefone: '', horario: '', obs: 'confirmar endereço e plantão' },
    { nome: 'Delegacia Especializada em Crimes Contra a Mulher (DECCM)', tipo: 'delegacia', cidade: 'Manaus', endereco: '', telefone: '', horario: '', obs: 'confirmar endereço e plantão; há unidades por zona da cidade e plantão 24 horas em unidade específica. Indicada quando a vítima adolescente é do sexo feminino ou quando há violência doméstica contra a mãe ou cuidadora' },
    { nome: 'Delegacia de plantão / Central de Flagrantes', tipo: 'delegacia', cidade: 'Manaus', endereco: '', telefone: '', horario: '24 horas', obs: 'confirmar endereço e plantão; acionar quando o fato ocorre fora do horário das delegacias especializadas' },
    { nome: 'Instituto Médico Legal (IML) de Manaus', tipo: 'pericia', cidade: 'Manaus', endereco: '', telefone: '', horario: '', obs: 'confirmar endereço e plantão. A perícia não é condição para o atendimento em saúde: atender e fazer as profilaxias primeiro' },
    { nome: 'Conselho Tutelar', tipo: 'protecao', cidade: 'Manaus', endereco: '', telefone: '', obs: 'Há conselhos por zona da cidade; acionar o da região de moradia da criança. Confirmar endereço e plantão do conselho da área de abrangência do serviço' },
    { nome: 'Serviço de referência hospitalar para violência sexual', tipo: 'saude', cidade: 'Manaus', endereco: '', telefone: '', obs: 'confirmar endereço e plantão junto à Secretaria Municipal de Saúde e à Secretaria de Estado da Saúde do Amazonas. O serviço deve dispor de profilaxia pós-exposição ao HIV, contracepção de emergência, profilaxia de IST, imunobiológicos para hepatite B e apoio psicossocial' },
    { nome: 'Pronto-socorro pediátrico de referência', tipo: 'saude', cidade: 'Manaus', endereco: '', telefone: '', obs: 'confirmar endereço e plantão. Para estabilização clínica, internação de proteção e investigação de violência física' },
    { nome: 'CREAS - Centro de Referência Especializado de Assistência Social', tipo: 'assistencia', cidade: 'Manaus', endereco: '', telefone: '', obs: 'confirmar endereço e plantão. Atende famílias e indivíduos com direitos violados; executa o PAEFI e o acompanhamento de casos de violência' },
    { nome: 'CRAS - Centro de Referência de Assistência Social', tipo: 'assistencia', cidade: 'Manaus', endereco: '', telefone: '', obs: 'confirmar endereço da unidade do território de moradia da família. Porta de entrada para benefícios, proteção social básica e apoio em situações de vulnerabilidade' },
    { nome: 'CAPS infantojuvenil (CAPSi)', tipo: 'saude_mental', cidade: 'Manaus', endereco: '', telefone: '', obs: 'confirmar endereço e horário. Encaminhamento para tentativa de suicídio, autolesão e sofrimento psíquico grave, com data de consulta garantida' },
    { nome: 'Ministério Público do Estado do Amazonas - Promotoria da Infância e Juventude', tipo: 'justica', cidade: 'Manaus', endereco: '', telefone: '', obs: 'confirmar endereço e plantão. Acionar quando a rede de proteção não responde, quando há necessidade de medida judicial ou quando há descumprimento de medida protetiva' },
    { nome: 'Defensoria Pública do Estado do Amazonas', tipo: 'justica', cidade: 'Manaus', endereco: '', telefone: '', obs: 'confirmar endereço e horário. Orientação e representação jurídica gratuita da família e da vítima' },
    { nome: 'Ministério Público do Trabalho - Procuradoria Regional do Trabalho no Amazonas', tipo: 'justica', cidade: 'Manaus', endereco: '', telefone: '', obs: 'confirmar endereço e horário. Acionar nos casos de trabalho infantil e de exploração do trabalho de adolescentes' },
    { nome: 'Vigilância Epidemiológica municipal', tipo: 'vigilancia', cidade: 'Manaus', endereco: '', telefone: '', obs: 'confirmar endereço e plantão. Destino da Ficha de Notificação Individual de Violência Interpessoal e Autoprovocada (SINAN)' },
    { nome: 'Conselho Tutelar do município', tipo: 'protecao', cidade: 'Interior do Amazonas', endereco: '', telefone: '', obs: 'confirmar endereço e plantão na sede do município; é o primeiro acionamento no interior' },
    { nome: 'Delegacia de Polícia Civil do município', tipo: 'delegacia', cidade: 'Interior do Amazonas', endereco: '', telefone: '', obs: 'confirmar endereço e plantão; em municípios sem delegacia especializada, a delegacia local registra a ocorrência' },
    { nome: 'Hospital de referência regional', tipo: 'saude', cidade: 'Interior do Amazonas', endereco: '', telefone: '', obs: 'confirmar o hospital de referência da calha ou da região de saúde e o fluxo de transferência fluvial ou aérea' },
    { nome: 'DSEI - Distrito Sanitário Especial Indígena', tipo: 'saude_indigena', cidade: 'Amazonas', endereco: '', telefone: '', obs: 'confirmar o DSEI de referência do território. Acionar nos casos envolvendo crianças indígenas, junto com a liderança local e o Conselho Tutelar' }
  ],

  telefones: [
    { nome: 'Disque 100 - Direitos Humanos', numero: '100', obs: 'denúncia anônima, 24 h, nacional; recebe denúncias de violência contra criança e adolescente, exploração sexual e tráfico de pessoas' },
    { nome: 'Conselho Tutelar', numero: '', obs: 'confirmar o número do Conselho Tutelar da região de moradia da criança e manter afixado no serviço' },
    { nome: 'Polícia Militar', numero: '190', obs: 'risco iminente, crime em andamento, necessidade de proteção imediata' },
    { nome: 'SAMU', numero: '192', obs: 'emergência clínica, tentativa de suicídio, intoxicação, transporte de urgência' },
    { nome: 'Disque 180 - Mulher', numero: '180', obs: 'violência contra a mulher, inclusive adolescentes do sexo feminino; orienta sobre medida protetiva' },
    { nome: 'Corpo de Bombeiros', numero: '193', obs: 'resgate e emergências' },
    { nome: 'Polícia Civil', numero: '197', obs: 'informações e denúncias à Polícia Civil; confirmar a cobertura no município' },
    { nome: 'Vigilância Epidemiológica municipal', numero: '', obs: 'confirmar o número local para a notificação imediata em até 24 horas' },
    { nome: 'Centro de Informação Toxicológica', numero: '', obs: 'confirmar o número do CIT de referência do estado para orientação nas intoxicações' }
  ],

  interior: {
    texto: 'Nos municípios do interior do Amazonas, acionar o Conselho Tutelar local, a delegacia de polícia civil do município e, quando necessário, o hospital de referência regional. Em comunidade indígena, envolver o DSEI correspondente e a liderança local, respeitando a Lei 13.431/2017.',
    passos: [
      'Não espere a transferência para iniciar o cuidado: atendimento, profilaxias da violência sexual e notificação começam no município onde a criança está',
      'A profilaxia do HIV tem janela de 72 horas e o transporte fluvial pode levar dias; inicie a primeira dose localmente e transfira em seguida',
      'Comunique o Conselho Tutelar local no mesmo dia, por escrito, e registre o nome de quem recebeu',
      'Notifique à vigilância epidemiológica do município; se não houver internet, use o telefone e envie a ficha assim que possível',
      'Acione a delegacia do município; onde não houver delegacia especializada, a delegacia comum registra a ocorrência',
      'Combine a transferência com o hospital de referência da calha ou da região de saúde, por via fluvial ou aérea, e registre os horários',
      'Avalie o risco de retorno ao domicílio considerando a distância, a ausência de rede e o convívio com o suspeito na mesma comunidade',
      'Em comunidade indígena, acione o DSEI, o polo base e a liderança local, com intérprete quando necessário e respeito à organização da comunidade',
      'Em área de garimpo, de fronteira ou de rota fluvial, considere exploração sexual e tráfico de pessoas e comunique também o Ministério Público',
      'Registre quem ficou responsável pelo seguimento na unidade local antes de encerrar o caso'
    ]
  },

  aviso: 'A suspeita basta para notificar. A notificação de violência contra criança e adolescente é obrigatória para o profissional de saúde, é feita a partir da suspeita e não depende de confirmação, de boletim de ocorrência ou de autorização da família. Não notificar configura infração administrativa (ECA art. 245).',

  avisoEnderecos: 'Os endereços, telefones e horários dos serviços locais devem ser confirmados e mantidos atualizados pelo serviço de saúde. Os campos em branco significam que a informação não foi confirmada, e não que o serviço não exista. Os números 100, 180, 190, 192 e 193 são nacionais.',

  fontes: [
    { nome: 'Linha de Cuidado para a Atenção Integral à Saúde de Crianças, Adolescentes e suas Famílias em Situação de Violências - Ministério da Saúde', ano: 2014 },
    { nome: 'Lei 13.431/2017 - Sistema de Garantia de Direitos da Criança e do Adolescente Vítima ou Testemunha de Violência', ano: 2017 },
    { nome: 'Decreto 9.603/2018 - regulamenta a Lei 13.431/2017 (escuta especializada, depoimento especial e coleta de vestígios)', ano: 2018 },
    { nome: 'Protocolo Clínico e Diretrizes Terapêuticas para Profilaxia Pós-Exposição de Risco à Infecção pelo HIV, IST e Hepatites Virais - Ministério da Saúde', ano: 2022 },
    { nome: 'Protocolo Clínico e Diretrizes Terapêuticas para Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis - Ministério da Saúde', ano: 2022 },
    { nome: 'Norma Técnica Prevenção e Tratamento dos Agravos Resultantes da Violência Sexual contra Mulheres e Adolescentes - Ministério da Saúde', ano: 2015 },
    { nome: 'Estatuto da Criança e do Adolescente (Lei 8.069/1990)', ano: 1990 },
    { nome: 'Sociedade Brasileira de Pediatria - Manual de Atendimento às Crianças e Adolescentes Vítimas de Violência', ano: 2018 },
    { nome: 'Guia de Vigilância em Saúde e instrutivo da Ficha de Notificação de Violência Interpessoal e Autoprovocada (SINAN) - Ministério da Saúde', ano: 2024 }
  ],

  atualizadoEm: '2026-09'
};
