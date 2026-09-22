window.PED = window.PED || {}; var PED = window.PED; PED.data = PED.data || {};

// Módulo de curiosidades e conversa com a família.
// Dois objetivos: ensinar um pouco à médica a cada tela aberta e dar a ela
// palavras prontas para falar com a criança e com o acompanhante.
// Nada aqui altera conduta. É apoio, contexto e linguagem.

PED.data.curiosidades = {

  // Uma a cinco por doença. Aparecem discretamente na tela da doença.
  porDoenca: {

    malaria: [
      { tipo: 'sabia', texto: 'O nome malária vem do italiano mala aria, ar ruim: antes de Laveran identificar o parasito dentro da hemácia, em 1880, culpava-se o ar dos pântanos. Ronald Ross demonstrou o papel do mosquito só em 1897.' },
      { tipo: 'regional', texto: 'O Amazonas concentra a maior parte dos casos de malária do Brasil, e a transmissão acompanha o ciclo das águas: a vazante deixa poças de margem limpa e ensolarada, criadouro preferido do Anopheles darlingi, o principal vetor da região.' },
      { tipo: 'historia', texto: 'O quinino, extraído da casca da quina pelos povos andinos e levado à Europa pelos jesuítas no século XVII, foi o primeiro tratamento eficaz de uma doença infecciosa com um princípio ativo isolado. A cloroquina nasceu da tentativa de sintetizar um substituto para ele.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: o mosquito da malária pica do fim da tarde até o amanhecer, dentro e perto de casa. Por isso o mosquiteiro na rede e na cama protege mais do que qualquer repelente passado de dia. E se a febre voltar depois do tratamento, é preciso voltar e fazer o exame de novo, porque esse tipo de malária pode acordar outra vez.' },
      { tipo: 'pratica', texto: 'Na prática: a gota espessa segue sendo o exame de escolha e pode ser repetida se a primeira vier negativa e a suspeita persistir, porque a parasitemia oscila ao longo do dia.' }
    ],

    dengue: [
      { tipo: 'historia', texto: 'A expressão febre quebra-ossos foi usada por Benjamin Rush em 1789, na Filadélfia, descrevendo a dor que parecia vir de dentro do osso. A origem da palavra dengue é discutida, com forte hipótese de vir do suaíli ka-dinga pepo, usado no leste africano para uma doença com dor e andar duro.' },
      { tipo: 'pratica', texto: 'Na prática: o risco de gravidade não está no pico da febre, e sim na queda dela. É entre o terceiro e o sétimo dia, quando a febre cede, que a criança pode extravasar plasma e piorar.' },
      { tipo: 'regional', texto: 'No Amazonas os quatro sorotipos já circularam, e o Aedes aegypti se reproduz o ano todo em reservatório de água domiciliar, bacia, calha e vasilhame de quintal, não em igarapé ou mata.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: quando a febre baixar, não relaxe. Esse é justamente o dia de olhar mais de perto. Se aparecer dor na barriga que não passa, vômito seguido, sangramento na gengiva ou no nariz, ou a criança ficar molinha e com a mão fria, volte na hora, mesmo de madrugada. E dê água, suco e soro o tempo todo, mais do que o normal.' }
    ],

    chikungunya: [
      { tipo: 'sabia', texto: 'Chikungunya vem da língua makonde, falada no norte de Moçambique e no sul da Tanzânia, e quer dizer mais ou menos aquele que se curva ou que anda encurvado, pela postura que a dor nas articulações impõe. A doença foi descrita pela primeira vez em 1952, num surto na região de Newala.' },
      { tipo: 'pratica', texto: 'Na prática: em lactentes o quadro articular é menos evidente e o que chama atenção é a irritabilidade, a recusa de movimentar um membro e as lesões de pele, que podem ser bolhosas e extensas nos menores de um ano.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: essa é a febre que dói nas juntas. A febre passa rápido, mas a dor pode demorar semanas e isso não quer dizer que o tratamento falhou nem que apareceu outra doença. Movimentar devagar, banho morno e compressa ajudam mais do que ficar parado na rede o dia inteiro.' }
    ],

    zika: [
      { tipo: 'sabia', texto: 'O vírus recebeu o nome da floresta Zika, em Uganda, onde foi isolado em 1947 de um macaco rhesus usado como sentinela para febre amarela. Zika quer dizer mato crescido, coberto de vegetação, na língua luganda.' },
      { tipo: 'pratica', texto: 'Na prática: a febre costuma ser baixa ou ausente, e o que leva a família ao posto é a mancha vermelha que coça e o olho vermelho sem secreção. Essa combinação, com pouca febre, é o que separa zika de dengue à beira do leito.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: é o mesmo mosquito da dengue, que nasce na água parada de dentro de casa. Se houver alguém grávida na casa, redobre o cuidado com o mosquito, porque nessa doença o maior risco é para o bebê que ainda está na barriga.' }
    ],

    febre_amarela: [
      { tipo: 'historia', texto: 'A vacina contra a febre amarela foi criada por Max Theiler a partir da cepa 17D e lhe rendeu o Nobel de 1951, até hoje o único concedido pelo desenvolvimento de uma vacina viral. O Brasil produz a sua própria vacina em Bio-Manguinhos, na Fiocruz.' },
      { tipo: 'regional', texto: 'Na Amazônia o ciclo é silvestre: os vetores são mosquitos de copa de mata, dos gêneros Haemagogus e Sabethes, e os macacos são vítimas, não culpados. Macaco morto encontrado na mata é aviso de circulação do vírus e deve ser notificado, nunca motivo para matar macaco.' },
      { tipo: 'pratica', texto: 'Na prática: o sinal de Faget, febre alta com pulso relativamente lento, descrito por Jean Charles Faget em New Orleans no século XIX, ainda é uma pista clássica, ainda que pouco sensível.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: a vacina é a única proteção de verdade, e uma dose já protege a vida toda a partir de um ano de idade. Quem vai trabalhar ou morar na mata, no ramal ou no garimpo precisa estar vacinado antes de ir, com pelo menos dez dias de antecedência.' }
    ],

    oropouche: [
      { tipo: 'sabia', texto: 'O vírus foi isolado em 1955 em Trinidad e Tobago, de um trabalhador florestal que vivia perto do rio Oropouche, e ficou com o nome do rio. O primeiro grande surto urbano documentado ocorreu em Belém, em 1961.' },
      { tipo: 'regional', texto: 'O vetor principal não é mosquito, é o maruim ou mosquito-pólvora, Culicoides paraensis, um inseto minúsculo que se cria em matéria orgânica úmida, como resto de cacho de banana e de bananeira caída no quintal. Por ser muito pequeno, ele atravessa telas e mosquiteiros de malha comum.' },
      { tipo: 'pratica', texto: 'Na prática: a recorrência dos sintomas dias depois da melhora, em geral com febre e cefaleia mais brandas, é característica e não significa nova infecção nem falha de tratamento.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: aqui o bichinho que passa essa febre é o maruim, aquele mosquitinho miúdo do fim da tarde, e não o mosquito da dengue. Limpar o quintal, tirar resto de bananeira e de cacho caído e não deixar monte de folha apodrecendo perto da casa diminui muito a quantidade dele.' }
    ],

    mayaro: [
      { tipo: 'sabia', texto: 'O vírus Mayaro foi isolado em 1954 em Trinidad, na região de Mayaro, e é parente próximo do chikungunya: os dois são alfavírus e dão o mesmo quadro de febre com artrite intensa.' },
      { tipo: 'regional', texto: 'Diferente da dengue, a febre do Mayaro tem ciclo silvestre e é transmitida por mosquitos de mata do gênero Haemagogus, os mesmos envolvidos na febre amarela silvestre. Por isso a exposição costuma ser à mata, ao ramal e ao trabalho no roçado, não ao quintal urbano.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: essa febre vem de mosquito da mata, não do mosquito de casa. Quem entra na mata deve usar roupa de manga comprida e calça, e passar repelente no que fica exposto, principalmente no começo da manhã e no fim da tarde.' }
    ],

    leptospirose: [
      { tipo: 'sabia', texto: 'A forma grave foi descrita por Adolf Weil em 1886 e ficou conhecida como doença de Weil. O nome do gênero vem do grego leptos, fino, e speira, espiral, pela forma da bactéria vista ao microscópio de campo escuro.' },
      { tipo: 'regional', texto: 'No Amazonas a curva de casos acompanha a cheia dos rios e as enxurradas urbanas: a água que invade a casa carrega urina de roedor, e a bactéria entra pela pele macerada dos pés e das pernas de quem passa horas dentro dela.' },
      { tipo: 'pratica', texto: 'Na prática: sufusão conjuntival sem secreção, com dor intensa na panturrilha e história de contato com água de enchente, é a tríade que mais ajuda a levantar a suspeita antes de qualquer exame.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: essa doença vem do xixi do rato, que fica na água suja da enchente e na lama. Se a criança precisar andar na água, tente proteger os pés e lavar bem depois com água limpa e sabão. Ferida aberta não pode entrar em água de enchente.' }
    ],

    leishmaniose_visceral: [
      { tipo: 'sabia', texto: 'Calazar vem do hindi kala azar, febre negra ou doença negra, pelo escurecimento da pele descrito nos doentes da Índia. O parasito foi visto quase ao mesmo tempo por William Leishman e Charles Donovan, em 1903, e as formas amastigotas ainda são chamadas de corpúsculos de Leishman-Donovan.' },
      { tipo: 'regional', texto: 'O vetor é o flebotomíneo Lutzomyia longipalpis, conhecido como mosquito-palha ou birigui, que voa baixo, em saltos curtos, e se cria em solo úmido com matéria orgânica, como galinheiro, chiqueiro e monte de folha ao redor da casa. O cão é o principal reservatório urbano.' },
      { tipo: 'pratica', texto: 'Na prática: febre arrastada de semanas com palidez progressiva e baço que cresce mais que o fígado, numa criança pequena e sem ganho de peso, é a apresentação clássica e muitas vezes chega tratada como outra coisa.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: o bichinho que passa essa doença é bem pequeno, voa baixinho e fica onde tem sujeira de bicho e folha molhada perto da casa. Limpar o terreiro, afastar galinheiro e chiqueiro de onde as crianças dormem e levar o cachorro para ser examinado ajudam a proteger a família toda.' }
    ],

    leishmaniose_tegumentar: [
      { tipo: 'sabia', texto: 'No Brasil a doença ganhou vários nomes populares conforme a região: ferida brava, úlcera de Bauru e, na forma que destrói o nariz e o palato, espúndia. A úlcera clássica tem borda elevada em moldura, fundo granuloso e, chamativamente, pouca dor.' },
      { tipo: 'regional', texto: 'Na Amazônia a transmissão é predominantemente silvestre e ocupacional: derrubada, abertura de ramal, extrativismo, garimpo e acampamento na mata. Historicamente os grandes picos acompanharam as frentes de abertura de estrada na região.' },
      { tipo: 'historia', texto: 'O tratamento com antimonial foi introduzido pelo médico brasileiro Gaspar Vianna em 1912, um avanço mundial na época. Vianna morreu dois anos depois, aos 29 anos, de tuberculose contraída no próprio laboratório.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: essa ferida não cicatriza sozinha e não é ferida de sujeira. O tratamento é longo e precisa ir até o fim, mesmo quando a ferida já parecer boa por fora, porque o que importa é matar o parasito por dentro.' }
    ],

    doenca_chagas: [
      { tipo: 'historia', texto: 'Em 1909, em Lassance, Minas Gerais, Carlos Chagas descreveu num só trabalho o parasito, o inseto transmissor e a doença humana. É um caso único na história da medicina, e ele batizou o parasito de Trypanosoma cruzi em homenagem a Oswaldo Cruz.' },
      { tipo: 'regional', texto: 'Na Amazônia a transmissão clássica pelo barbeiro domiciliado é rara: o que acontece aqui é a transmissão oral, por açaí, bacaba ou caldo de cana contaminado com triatomíneo triturado ou com suas fezes durante o preparo. Os surtos são familiares, atingem várias pessoas que comeram do mesmo lote e têm letalidade maior que a da forma vetorial.' },
      { tipo: 'pratica', texto: 'Na prática: por ser oral, a porta de entrada não deixa sinal de Romaña nem chagoma. O que aparece é febre prolongada, edema de face e de membros e, com frequência, miocardite já na fase aguda.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: o açaí é um alimento muito bom e não precisa deixar de dar à criança. O cuidado é com o preparo: a fruta tem que ser lavada bem e o açaí passar pelo branqueamento, que é a escaldada em água quente antes de bater. Açaí batido na hora, sem esse cuidado, é o que traz risco.' }
    ],

    tuberculose: [
      { tipo: 'historia', texto: 'Robert Koch anunciou a descoberta do bacilo em 24 de março de 1882, data que se tornou o Dia Mundial da Tuberculose. A vacina BCG leva as iniciais de Albert Calmette e Camille Guérin, que levaram treze anos passando a cepa bovina de cultura em cultura até torná-la inofensiva.' },
      { tipo: 'pratica', texto: 'Na prática: a tuberculose da criança é paucibacilar, e por isso a baciloscopia costuma ser negativa e a criança raramente transmite. O diagnóstico se apoia em quadro clínico, radiografia, contato com adulto bacilífero e prova tuberculínica, reunidos no sistema de pontuação do Ministério da Saúde.' },
      { tipo: 'regional', texto: 'O Amazonas tem uma das maiores incidências de tuberculose do Brasil, e ela é maior ainda entre indígenas e em áreas urbanas com moradia adensada. A busca do caso-índice adulto dentro da casa é parte do atendimento da criança, não uma etapa posterior.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: essa doença se pega respirando o mesmo ar de quem está tossindo há muito tempo, quase sempre alguém de dentro de casa. Por isso todo mundo que mora junto precisa ser examinado. O remédio é longo, de meses, e a criança melhora bem antes de acabar. Parar no meio é o que faz a doença voltar mais forte.' }
    ],

    hanseniase: [
      { tipo: 'historia', texto: 'O bacilo foi identificado pelo norueguês Gerhard Armauer Hansen em 1873 e foi o primeiro micro-organismo apontado como causa de uma doença humana, antes mesmo dos trabalhos de Koch. No Brasil, a Lei 9.010 de 1995 substituiu oficialmente a palavra lepra por hanseníase justamente para romper com o estigma.' },
      { tipo: 'pratica', texto: 'Na prática: mancha que não coça, não dói e onde a criança não sente o toque, o calor ou a picada é hanseníase até prova em contrário. O teste de sensibilidade com algodão e com a ponta e o cabo de uma caneta leva menos de um minuto e é o exame mais importante.' },
      { tipo: 'regional', texto: 'O Brasil é o segundo país do mundo em número de casos novos, e o Amazonas está entre os estados de alta endemicidade. Caso diagnosticado em menor de quinze anos é indicador de transmissão ativa e recente, e obriga o exame de todos os contatos da casa.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: essa doença tem cura e o tratamento é de graça. Logo nas primeiras doses a pessoa deixa de transmitir, então ninguém precisa ser afastado da família, da escola ou da mesa. O que a gente pede é que todos que moram na casa venham olhar a pele, porque quanto mais cedo se acha, menos marca fica.' }
    ],

    acidente_ofidico: [
      { tipo: 'historia', texto: 'Vital Brazil demonstrou, no início do século XX, que cada soro neutraliza o veneno do seu grupo de serpente e não o dos outros, e fundou o Instituto Butantan sobre essa ideia. Até hoje todo o soro antiveneno usado no Brasil é produzido por instituições públicas e distribuído gratuitamente pelo SUS.' },
      { tipo: 'regional', texto: 'Na Amazônia a grande maioria dos acidentes é botrópico, por Bothrops atrox, a jararaca-do-norte ou comum. A surucucu-pico-de-jaca, Lachesis muta, é a maior serpente peçonhenta das Américas e ocorre em mata primária, com acidentes bem mais raros mas de grande volume de veneno.' },
      { tipo: 'pratica', texto: 'Na prática: o tempo de coagulação alterado com dor e edema locais já define o tratamento botrópico, e a soroterapia não depende de identificar a serpente. A dose de soro é a mesma para criança e para adulto, porque se neutraliza o veneno inoculado, não o peso do paciente.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: não corte, não fure, não amarre e não passe nada na mordida, porque isso piora e atrapalha. Lave com água e sabão, deixe o braço ou a perna para cima e traga a criança o mais rápido possível. Não precisa matar nem trazer a cobra, e o remédio certo só existe no hospital.' }
    ],

    escorpionismo: [
      { tipo: 'sabia', texto: 'O escorpião existe há mais de 400 milhões de anos, está entre os primeiros animais a sair da água para a terra, e brilha em verde sob luz ultravioleta por uma substância da própria cutícula. Uma lanterna de luz negra à noite é um método simples e usado de busca no peridomicílio.' },
      { tipo: 'regional', texto: 'Na Amazônia predominam espécies do gênero Tityus, entre elas o escorpião-preto-da-amazônia, Tityus obscurus, cujos acidentes descritos na região podem cursar com manifestações neurológicas marcantes, como mioclonias e alterações da marcha e da fala, além da dor local.' },
      { tipo: 'pratica', texto: 'Na prática: na criança pequena a gravidade pode se instalar em poucas horas, e vômitos repetidos, sudorese profusa, agitação e taquicardia são sinais de alerta sistêmico, não reação à dor.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: escorpião gosta de entulho, tijolo empilhado, madeira encostada e canto escuro. Sacudir o calçado e a roupa antes de vestir, não deixar criança andando descalça no terreiro e manter a casa afastada do monte de lenha evitam a maior parte das picadas. Se picar criança pequena, venha na hora, mesmo que pareça só dor.' }
    ],

    araneismo: [
      { tipo: 'sabia', texto: 'A aranha armadeira, do gênero Phoneutria, tem esse nome porque, ao se sentir ameaçada, ergue as pernas dianteiras e se apoia nas traseiras, numa postura de ataque. Phoneutria vem do grego e quer dizer assassina. Ela não faz teia para caçar: procura abrigo em cacho de banana, pilha de roupa, calçado e entulho.' },
      { tipo: 'pratica', texto: 'Na prática: nem todo acidente por Phoneutria precisa de soro. A maioria é leve e se resolve com analgesia local e observação, ficando a soroterapia para as crianças com manifestações sistêmicas, que são também as de maior risco.' },
      { tipo: 'regional', texto: 'A aranha-marrom, do gênero Loxosceles, é responsável pelos quadros mais graves de necrose e hemólise no Sul e no Sudeste do país, mas é pouco frequente na região amazônica, onde o araneísmo de importância clínica é sobretudo por armadeira.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: essa aranha se esconde em cacho de banana, em roupa deixada no chão e dentro do calçado. Vale sacudir tudo antes de usar e não deixar roupa ou brinquedo empilhados no canto do quarto. Se picar, traga a criança para ser vista, mesmo que pareça só uma dor forte que vai passando.' }
    ],

    pneumonia: [
      { tipo: 'historia', texto: 'William Osler chamou a pneumonia de capitã dos exércitos da morte, retomando a expressão que John Bunyan usara no século XVII para a tuberculose. Só depois das vacinas conjugadas contra Haemophilus influenzae tipo b e contra o pneumococo a frase deixou de descrever a infância brasileira.' },
      { tipo: 'pratica', texto: 'Na prática: contar a frequência respiratória por um minuto inteiro, com a criança calma e sem febre alta no momento, continua sendo o teste mais sensível e mais barato de pneumonia na atenção básica. Ausculta normal não exclui.' },
      { tipo: 'regional', texto: 'No interior do Amazonas a fumaça de fogão a lenha dentro de casa e a fumaça das queimadas na estiagem são fatores de risco reais para infecção respiratória na criança pequena, e entram na anamnese junto com vacina e aleitamento.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: o que mais importa não é a febre, é a respiração. Levante a roupinha e olhe o peito da criança: se ela estiver respirando rápido, se a pele afundar entre as costelas ou embaixo das costelas a cada respiração, ou se ela ficar gemendo e não quiser mamar, volte imediatamente.' }
    ],

    bronquiolite: [
      { tipo: 'sabia', texto: 'O vírus sincicial respiratório foi descoberto em 1956 em chimpanzés com coriza, antes de ser reconhecido em crianças. Sincicial vem do efeito que ele causa nas células infectadas, que se fundem umas às outras formando massas com vários núcleos, os sincícios.' },
      { tipo: 'pratica', texto: 'Na prática: o quadro piora até o terceiro ou quarto dia e só depois melhora. Saber disso muda a conversa com a família e evita tanto a alta prematura no segundo dia quanto a troca desnecessária de conduta.' },
      { tipo: 'regional', texto: 'A sazonalidade do vírus sincicial no Norte do país não coincide com a do Sudeste: aqui a circulação se concentra nos meses de chuva, o que desloca o pico de internações em relação ao calendário a que a maior parte da literatura brasileira se refere.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: é um resfriado que desceu para o peito do bebê. Não existe remédio que corte, o que trata é limpar o narizinho com soro, oferecer o peito em mamadas menores e mais vezes, e olhar de perto a respiração. Se ele começar a respirar rápido demais, afundar o peito, ficar roxo em volta da boca ou parar de mamar, traga na hora.' }
    ],

    asma: [
      { tipo: 'sabia', texto: 'Asma vem do grego asthma, ofegar, palavra que já aparece na Ilíada para descrever a respiração curta. A doença é descrita em papiros egípcios e em textos hipocráticos, mas a ideia de que o problema é a inflamação, e não só o espasmo do brônquio, só se firmou nos anos 1980.' },
      { tipo: 'pratica', texto: 'Na prática: na crise leve e moderada, salbutamol com espaçador é tão eficaz quanto a nebulização, com menos taquicardia e menos tempo de sala. Espaçador improvisado com garrafa plástica tem eficácia demonstrada quando não há espaçador industrial disponível.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: a bombinha não vicia e não faz mal ao coração da criança. O que faz mal é a criança passar a noite sem conseguir respirar. Tem a bombinha que alivia na hora e a que protege todo dia, e a de todo dia precisa ser usada mesmo quando ela estiver bem, que é justamente por isso que ela está bem.' }
    ],

    infeccao_urinaria: [
      { tipo: 'pratica', texto: 'Na prática: em lactente febril sem foco, a urina é o exame que mais frequentemente dá o diagnóstico. Urina de saco coletor serve para afastar, nunca para confirmar: a taxa de falso-positivo é alta e um resultado positivo por saco precisa ser confirmado por jato médio, cateterismo ou punção suprapúbica antes de rotular a criança.' },
      { tipo: 'sabia', texto: 'A Escherichia coli responde pela grande maioria das infecções urinárias na infância, e a bactéria leva o nome de Theodor Escherich, pediatra austríaco que a descreveu em 1885 estudando fezes de recém-nascidos.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: xixi que arde, xixi com cheiro forte, febre sem tosse e sem diarreia, ou bebê que só tem febre e fica largado, podem ser infecção do xixi. Na hora de limpar, sempre da frente para trás, e não deixe a criança segurar o xixi por muito tempo brincando.' }
    ],

    meningite: [
      { tipo: 'historia', texto: 'A introdução da vacina conjugada contra Haemophilus influenzae tipo b no calendário brasileiro, em 1999, fez praticamente desaparecer a principal causa de meningite bacteriana em menores de cinco anos no país, em poucos anos. É um dos exemplos mais nítidos de impacto de vacina na pediatria brasileira.' },
      { tipo: 'pratica', texto: 'Na prática: em lactentes os sinais meníngeos clássicos costumam faltar. O que aparece é irritabilidade que piora no colo, gemência, recusa alimentar, fontanela tensa e convulsão. Rigidez de nuca ausente não afasta o diagnóstico nesta faixa.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: precisamos colher um exame do líquido das costas, e sei que assusta. A agulha entra bem abaixo de onde termina a medula, então ela não encosta na medula e não deixa a criança paralítica. Esse exame é o único jeito de saber qual é o germe e qual é o remédio certo.' },
      { tipo: 'regional', texto: 'Quem convive na mesma casa de um caso de meningite meningocócica tem indicação de quimioprofilaxia, e isso precisa ser organizado ainda na notificação, o que é especialmente trabalhoso quando a família vem de comunidade distante e volta de barco no mesmo dia.' }
    ],

    sepse: [
      { tipo: 'sabia', texto: 'A palavra sepse vem do grego sepsis, putrefação, usada nos textos hipocráticos para a decomposição da matéria. Levou mais de dois mil anos para virar o que é hoje: uma resposta desregulada do próprio organismo à infecção, e não a infecção em si.' },
      { tipo: 'pratica', texto: 'Na prática: a hipotensão na criança é sinal tardio, porque ela compensa com taquicardia e vasoconstrição por muito tempo. Enchimento capilar lento, extremidades frias, pulso fino e alteração do estado de consciência aparecem antes da pressão cair.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: a infecção se espalhou pelo corpo e vamos agir rápido, por isso tudo vai acontecer ao mesmo tempo: veia, exame, antibiótico e soro. Não é porque piorou agora, é porque cada minuto conta. Vou explicando cada coisa enquanto faço.' }
    ],

    doenca_diarreica: [
      { tipo: 'historia', texto: 'A reidratação oral foi testada em massa em 1971, nos campos de refugiados da guerra de Bangladesh, quando Dilip Mahalanabis, sem soro venoso suficiente, passou a distribuir a solução em baldes. A mortalidade despencou, e em 1978 a revista The Lancet chamou a descoberta de possivelmente o avanço médico mais importante do século.' },
      { tipo: 'sabia', texto: 'O que torna o soro oral eficaz é o cotransporte de sódio e glicose no intestino delgado, que continua funcionando mesmo com o intestino inflamado. Por isso a proporção entre sal e açúcar importa, e soro caseiro feito no olho, doce demais, pode piorar a diarreia por efeito osmótico.' },
      { tipo: 'pratica', texto: 'Na prática: o zinco por dez a catorze dias reduz a duração e a gravidade do episódio e ainda diminui a chance de novo episódio nos meses seguintes. É uma das intervenções de melhor relação custo e benefício da pediatria e segue sendo esquecida na prescrição.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: não corte a comida e não pare o peito, isso atrasa a melhora. O soro é dado de colher em colher, devagar, mesmo se vomitar: espere dez minutos e recomece. Volte na hora se a criança ficar sem urinar, com olho fundo, muito molinha, ou se aparecer sangue nas fezes.' }
    ],

    parasitoses_intestinais: [
      { tipo: 'historia', texto: 'O Jeca Tatu de Monteiro Lobato, preguiçoso e amarelo, foi reescrito pelo autor depois que ele conheceu o trabalho sanitarista de Belisário Penna: na nova versão o Jeca não era preguiçoso, estava doente de amarelão, a ancilostomíase, e voltou a trabalhar depois de tratado. A campanha popularizou a ideia de que verminose empobrece.' },
      { tipo: 'pratica', texto: 'Na prática: o Ascaris pode migrar quando há febre alta ou uso de alguns antiparasitários e sair pela boca ou pelo nariz, o que aterroriza a família. Avisar antes que isso pode acontecer evita pânico e abandono do tratamento.' },
      { tipo: 'regional', texto: 'Onde não há água tratada nem esgoto, a reinfecção é a regra, e tratar a criança sem falar de água e de calçado é tratar pela metade. A geo-helmintíase por ancilostomídeo entra pela pele do pé descalço, não pela boca.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: o remédio mata os vermes que estão agora, mas não impede de pegar de novo. O que impede é água fervida ou clorada para beber, lavar bem a mão antes de comer e depois do banheiro, e a criança de sandália no terreiro, porque um desses vermes entra pela sola do pé.' }
    ],

    escabiose_impetigo: [
      { tipo: 'historia', texto: 'A escabiose foi uma das primeiras doenças humanas com causa demonstrada: em 1687 Bonomo e Cestoni retiraram o ácaro da pele de doentes, desenharam-no e mostraram que ele produzia a doença, quase dois séculos antes da teoria dos germes.' },
      { tipo: 'pratica', texto: 'Na prática: a coceira piora à noite porque a fêmea escava o túnel nas horas de calor da pele sob a coberta. Em lactentes as lesões atingem palma, planta, couro cabeludo e face, regiões poupadas no escolar e no adulto.' },
      { tipo: 'sabia', texto: 'O impetigo por estreptococo pode ser seguido de glomerulonefrite pós-estreptocócica semanas depois, e a lesão de pele é, em muitas regiões, uma porta de entrada mais comum que a garganta. Por isso vale avisar a família sobre urina escura e inchaço no rosto após o quadro cutâneo.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: essa coceira é de um bichinho que fica na pele e passa de pessoa para pessoa no contato e na roupa de cama. Não é falta de banho. Todo mundo da casa precisa passar o remédio no mesmo dia, mesmo quem não está coçando, senão a coceira volta. Roupa e lençol lavados e secos no sol ou passados a ferro.' }
    ],

    anemia_ferropriva: [
      { tipo: 'sabia', texto: 'A anemia por falta de ferro é a carência nutricional mais comum do mundo, e o prejuízo que ela causa no desenvolvimento cognitivo da criança pequena pode não ser totalmente revertido pelo tratamento tardio. Por isso a profilaxia no lactente vale mais que o tratamento no pré-escolar.' },
      { tipo: 'pratica', texto: 'Na prática: vitamina C aumenta a absorção do ferro e leite, chá e café a reduzem de forma importante. Trocar o horário do sulfato ferroso para longe do leite, com um pouco de suco de fruta cítrica, resolve boa parte das falhas de resposta atribuídas à má adesão.' },
      { tipo: 'regional', texto: 'Na Amazônia a anemia muitas vezes tem mais de uma causa ao mesmo tempo: dieta pobre em ferro, malária de repetição e perda de sangue por ancilostomíase. Achar uma não dispensa procurar as outras.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: o cocô vai ficar escuro, quase preto, e isso é o esperado, não é sangue nem sinal de que fez mal. Dê o remédio com suco de laranja, de acerola ou de cupuaçu e nunca junto com o leite, porque o leite atrapalha. Mesmo quando ela melhorar, o remédio continua por mais uns meses para encher o estoque do corpo.' }
    ],

    desnutricao: [
      { tipo: 'historia', texto: 'Kwashiorkor não é palavra médica: é do idioma ga, de Gana, e foi trazida para a literatura por Cicely Williams em 1933. Quer dizer, aproximadamente, a doença que pega a criança quando nasce o próximo filho, ou seja, a criança desmamada cedo demais pela chegada do irmão.' },
      { tipo: 'pratica', texto: 'Na prática: a criança gravemente desnutrida faz hipoglicemia e hipotermia com facilidade e infecta sem febre e sem sinais clássicos. Reintroduzir energia rápido demais pode precipitar a síndrome de realimentação, por isso a fase inicial é deliberadamente lenta e cuidadosa.' },
      { tipo: 'regional', texto: 'No Amazonas a insegurança alimentar convive com abundância de peixe e de fruta: o gargalo costuma ser a renda, o transporte e o preço do alimento industrializado que substituiu o alimento local, não a ausência de comida na região.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: vamos recuperar o peso devagar de propósito. Se der muita comida de uma vez, o corpo dela, que está fraco, pode piorar. Serão refeições pequenas e frequentes, de dia e de noite, e cada semana a gente pesa para ver o caminho. Nada aqui é culpa da senhora, e a gente vai fazer isso junto.' }
    ]

  }

};
