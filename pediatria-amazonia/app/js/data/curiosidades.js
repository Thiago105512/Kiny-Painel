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
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: a vacina é a única proteção de verdade. A primeira dose é aos nove meses e tem o reforço aos quatro anos, e é isso que a caderneta precisa mostrar. Quem vai trabalhar ou morar na mata, no ramal ou no garimpo tem que estar vacinado antes de ir, com pelo menos dez dias de antecedência.' }
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
,

  // Uma a duas por medicamento. Aparecem na ficha do medicamento.
  porMedicamento: {

    artemeter_lumefantrina: [
      { tipo: 'sabia', texto: 'A artemisinina vem da Artemisia annua, o qinghao da medicina chinesa. Tu Youyou encontrou a pista num texto do século IV de Ge Hong, que mandava espremer a planta em água fria: foi o que a levou a abandonar a fervura e extrair o princípio ativo a frio. Rendeu o Nobel de 2015.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: esse remédio precisa ser tomado junto com comida ou com leite, senão o corpo aproveita pouco. São seis tomadas em três dias e nenhuma pode faltar. Se a criança vomitar em menos de uma hora, repita aquela dose.' }
    ],

    cloroquina: [
      { tipo: 'sabia', texto: 'A cloroquina nasceu da busca por um substituto sintético do quinino, que vinha da casca da quina andina. Foi sintetizada na Alemanha em 1934 e descartada por suposta toxicidade, sendo redescoberta pelos aliados durante a Segunda Guerra, quando o acesso à quina do Pacífico foi cortado.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: esse comprimido é amargo mesmo, e é melhor dar junto com comida para não embrulhar o estômago. Guarde a cartela longe do alcance das crianças, porque em criança pequena poucos comprimidos já são perigosos.' }
    ],

    primaquina: [
      { tipo: 'sabia', texto: 'A primaquina é o único medicamento disponível na rede que age nos hipnozoítos, as formas adormecidas do P. vivax dentro do fígado. Essas formas só foram demonstradas experimentalmente no início dos anos 1980, por Wojciech Krotoski, o que explica por que durante décadas a recaída foi confundida com reinfecção.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: esse é o remédio que tira a malária de dentro do fígado para ela não voltar daqui a uns meses. Por isso ele continua mesmo depois que a febre passou. Se a urina ficar bem escura, cor de coca-cola, ou a criança ficar amarela e muito pálida, pare e volte na mesma hora.' }
    ],

    artesunato: [
      { tipo: 'sabia', texto: 'Os grandes ensaios com artesunato venoso, entre eles o AQUAMAT em crianças africanas, mostraram redução clara de mortalidade na malária grave em comparação com o quinino, e por isso a OMS substituiu o quinino como primeira escolha.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: como a criança está grave e vomitando, o remédio vai direto na veia, que age mais rápido e não depende do estômago. Assim que ela conseguir beber e comer, a gente troca para o comprimido e completa o tratamento.' }
    ],

    paracetamol: [
      { tipo: 'sabia', texto: 'O paracetamol foi sintetizado em 1893 e ficou esquecido por cinquenta anos. Só nos anos 1940 Brodie e Axelrod mostraram que ele era o metabólito ativo da acetanilida, muito mais tóxica, e a partir daí ele virou o antitérmico mais usado do mundo.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: o antitérmico serve para o conforto da criança, não para fazer a febre desaparecer por completo. Febre que cede e volta é esperado. Respeite o intervalo entre as doses e nunca dê dois remédios diferentes que tenham o mesmo princípio, porque em excesso esse aqui machuca o fígado.' }
    ],

    dipirona: [
      { tipo: 'sabia', texto: 'A dipirona foi retirada do mercado nos Estados Unidos, no Reino Unido e em alguns países nórdicos pelo risco de agranulocitose, e segue sendo um analgésico de primeira linha no Brasil, na Alemanha e na Espanha. É um dos exemplos mais citados de como a avaliação de risco e benefício varia entre agências reguladoras.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: conte as gotas olhando o frasco, uma a uma, e anote a hora em que deu. Na correria é fácil dar de novo achando que ainda não deu. Se aparecer mancha vermelha no corpo, ferida na boca ou febre com dor de garganta forte durante o uso, pare e traga a criança.' }
    ],

    ibuprofeno: [
      { tipo: 'sabia', texto: 'O ibuprofeno foi desenvolvido por Stewart Adams, na Inglaterra, nos anos 1960. Ele testou uma das primeiras doses em si mesmo, para uma dor de cabeça, antes de dar uma palestra, e a dor passou. A patente saiu em 1962 e o medicamento virou um dos mais vendidos do mundo.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: esse remédio precisa ser dado sempre com comida, nunca de barriga vazia, porque irrita o estômago. E se a criança estiver vomitando muito, com diarreia ou urinando pouco, é melhor não dar e me procurar: nessas horas ele pode judiar do rim.' }
    ],

    amoxicilina: [
      { tipo: 'sabia', texto: 'A amoxicilina foi desenvolvida no início dos anos 1970 a partir da ampicilina, com uma única hidroxila a mais. Essa pequena mudança dobrou a absorção pela boca e permitiu dar de oito em oito, e depois de doze em doze horas, o que mudou a pediatria ambulatorial.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: depois de pronto, o xarope fica na geladeira e vale só por sete a dez dias, conforme a bula. Agite bem antes de cada dose. Mesmo que a criança melhore no terceiro dia, o frasco vai até o fim, porque parar no meio é o que ensina a bactéria a não obedecer mais ao remédio.' }
    ],

    amoxicilina_clavulanato: [
      { tipo: 'sabia', texto: 'O ácido clavulânico foi isolado do Streptomyces clavuligerus e quase não tem ação antibiótica própria: ele funciona como isca, sendo destruído pela betalactamase da bactéria no lugar da amoxicilina. É um dos primeiros exemplos de inibidor suicida usado na clínica.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: esse é mais forte que o comum, e é normal amolecer o intestino. Dar no começo da refeição diminui bastante isso. Se vier diarreia com sangue ou muito líquida e frequente, avise antes de parar por conta própria.' }
    ],

    penicilina_benzatina: [
      { tipo: 'sabia', texto: 'A benzatina é uma sal de liberação lenta: a penicilina fica presa num depósito no músculo e vai sendo solta por semanas. É essa insolubilidade proposital que permite proteger uma criança com febre reumática com uma injeção a cada vinte e um dias, e o Streptococcus pyogenes nunca desenvolveu resistência à penicilina.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: essa injeção dói mesmo, não tem jeito de não doer, e o remédio fica trabalhando por semanas. Se for para proteger o coração, ela precisa ser repetida sempre na data, por anos, mesmo com a criança se sentindo ótima. É a repetição que protege.' }
    ],

    penicilina_cristalina: [
      { tipo: 'sabia', texto: 'A penicilina cristalina tem meia-vida muito curta, de cerca de meia hora, o que obriga a doses de quatro em quatro horas. Foi essa limitação farmacocinética, e não falta de eficácia, que motivou a criação das formas de depósito como a procaína e a benzatina.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: esse antibiótico só funciona se for dado de quatro em quatro horas, dia e noite, por isso a criança vai acordar algumas vezes de madrugada para receber. Não é descuido da equipe, é o jeito certo de usar esse remédio.' }
    ],

    ampicilina: [
      { tipo: 'sabia', texto: 'A ampicilina foi a primeira penicilina de espectro ampliado e continua insubstituível numa situação específica da pediatria: a cobertura de Listeria monocytogenes no recém-nascido, contra a qual as cefalosporinas não têm ação.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: esse remédio entra na veia porque o bebê é muito pequeno e precisamos ter certeza de que a dose inteira chega ao sangue. Assim que ele estiver melhor e os exames permitirem, a gente conversa sobre a alta.' }
    ],

    ceftriaxona: [
      { tipo: 'sabia', texto: 'A meia-vida longa da ceftriaxona permite dose única diária, mas ela se liga ao cálcio e pode precipitar: por isso é proibida junto com soluções com cálcio em recém-nascidos, situação em que se prefere a cefotaxima. Ela também atravessa bem a barreira hematoencefálica inflamada, o que a fez virar pilar do tratamento da meningite.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: uma aplicação por dia já é suficiente, porque esse remédio fica bastante tempo no corpo. Não é dose fraca, é remédio de ação longa.' }
    ],

    cefalexina: [
      { tipo: 'sabia', texto: 'A cefalexina descende de uma cefalosporina isolada de um fungo colhido num emissário de esgoto na Sardenha, em 1945, por Giuseppe Brotzu, que estranhou a baixa incidência de febre tifoide entre quem se banhava ali perto.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: esse é para infecção de pele e precisa ser dado de seis em seis ou de oito em oito horas, dividido certinho no dia. Guarde na geladeira depois de preparado e agite antes de cada dose.' }
    ],

    cefotaxima: [
      { tipo: 'sabia', texto: 'A cefotaxima é preferida à ceftriaxona em recém-nascidos porque não desloca a bilirrubina da albumina nem precipita com cálcio, dois problemas com peso real na primeira semana de vida.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: escolhemos esse antibiótico porque é o mais seguro para bebê recém-nascido. Ele vai na veia, em horários fixos, e a equipe vai conferindo os exames todos os dias.' }
    ],

    azitromicina: [
      { tipo: 'sabia', texto: 'A azitromicina foi descoberta em 1980 num laboratório de Zagreb, na então Iugoslávia, pela equipe de Slobodan Djokic, e é uma das poucas grandes descobertas farmacêuticas do século XX vindas do leste europeu. Ela se acumula dentro dos macrófagos, que a carregam até o foco: por isso a dose dura dias depois de terminada.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: são só três a cinco dias de remédio, mas o efeito continua por mais de uma semana dentro do corpo. Então, mesmo que o frasco acabe, o tratamento ainda está agindo. Não precisa pedir mais.' }
    ],

    claritromicina: [
      { tipo: 'sabia', texto: 'A claritromicina nasceu de uma modificação química da eritromicina feita para resistir ao ácido do estômago, que destruía boa parte da dose original e causava a cólica clássica dos macrolídeos antigos.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: o gosto é amargo e muitas crianças reclamam. Dar junto com um pouco de comida ou logo depois ajuda. Não misture no frasco da mamadeira inteira, porque se ela não terminar, perde parte da dose.' }
    ],

    gentamicina: [
      { tipo: 'sabia', texto: 'Existe uma convenção discreta de nomenclatura: antibióticos derivados de Streptomyces terminam em micina com y no original, como estreptomicina, e os derivados de Micromonospora terminam em micina com i, como gentamicina. O nome já conta de onde veio a molécula.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: esse remédio é muito eficaz, mas precisa ser bem dosado porque em excesso pode afetar o rim e a audição. Por isso pesamos a criança direitinho e usamos pelo menor tempo possível. Se você notar que ela parou de responder quando chamam, me avise.' }
    ],

    oxacilina: [
      { tipo: 'sabia', texto: 'A oxacilina foi desenhada nos anos 1960 com uma cadeia lateral volumosa que impede a penicilinase do estafilococo de alcançar o anel betalactâmico. Foi a primeira vez que se projetou deliberadamente uma molécula contra um mecanismo de resistência conhecido.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: esse antibiótico é específico para a bactéria que dá infecção de pele e de osso mais grave. O tratamento costuma ser longo, e o tempo de veia depende de como a febre e os exames forem respondendo, não de um número fixo de dias.' }
    ],

    vancomicina: [
      { tipo: 'sabia', texto: 'As primeiras preparações de vancomicina eram tão impuras e marrons que ganharam o apelido de lama do Mississipi. Boa parte da toxicidade renal atribuída a ela nos anos 1950 vinha dessas impurezas, e não da molécula.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: esse remédio precisa correr devagar na veia. Se correr rápido, a criança fica vermelha no pescoço e no rosto e sente coceira. Se isso acontecer, chame a enfermagem: é só diminuir a velocidade, não é alergia ao remédio.' }
    ],

    metronidazol: [
      { tipo: 'sabia', texto: 'O metronidazol veio da azomicina, um antibiótico de Streptomyces, e foi lançado nos anos 1960 contra tricomoníase. A atividade contra anaeróbios foi descoberta por acaso, quando uma paciente em tratamento teve também a gengivite resolvida.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: esse remédio deixa um gosto de metal na boca e pode escurecer um pouco a urina, e as duas coisas são esperadas e passam quando acabar. Dar com comida ajuda no enjoo.' }
    ],

    nitrofurantoina: [
      { tipo: 'sabia', texto: 'A nitrofurantoína atinge concentrações altas na urina e concentrações baixíssimas no sangue e nos tecidos. É exatamente por isso que serve para cistite e não serve para pielonefrite nem para infecção com febre, uma distinção que continua sendo motivo frequente de erro de prescrição.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: a urina vai ficar amarela bem escura ou meio marrom durante o tratamento, e isso é do próprio remédio. Dê sempre com comida, porque de estômago vazio costuma dar enjoo.' }
    ],

    sulfametoxazol_trimetoprim: [
      { tipo: 'sabia', texto: 'A combinação bloqueia dois pontos seguidos da mesma via do folato da bactéria, um dos primeiros exemplos de bloqueio sequencial na farmacologia. As sulfas descendem do Prontosil, o primeiro antibacteriano sintético eficaz, de 1935, que rendeu o Nobel a Gerhard Domagk.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: ofereça bastante água durante o tratamento. E se aparecer mancha vermelha espalhada pelo corpo, bolha, ou ferida na boca e nos olhos, pare o remédio e traga a criança na hora, porque esse é o tipo de alergia que precisa ser vista logo.' }
    ],

    doxiciclina: [
      { tipo: 'sabia', texto: 'A proibição das tetraciclinas em menores de oito anos vem da tetraciclina antiga. Os dados acumulados com doxiciclina em cursos curtos não mostram manchamento dentário relevante, e por isso ela é hoje recomendada em qualquer idade para riquetsioses, em que o atraso do tratamento custa vidas.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: dê com bastante água e não deixe a criança deitar logo depois, para o comprimido não ficar parado no meio do peito. Durante o tratamento, evite sol forte e use camiseta e boné, porque a pele queima com muito mais facilidade.' }
    ],

    albendazol: [
      { tipo: 'sabia', texto: 'Os benzimidazóis se ligam à tubulina do verme e impedem a formação do citoesqueleto, o que faz o parasito perder a capacidade de absorver glicose e morrer aos poucos. Foram criados primeiro para uso veterinário e depois trazidos para a medicina humana.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: dar junto com um alimento gorduroso, um pedaço de peixe ou um pouco de leite, aumenta o efeito quando o verme está fora do intestino. E lembre que o remédio mata os de agora, não impede de pegar de novo: quem impede é água tratada, mão lavada e sandália no pé.' }
    ],

    mebendazol: [
      { tipo: 'sabia', texto: 'O mebendazol é absorvido em pequena quantidade e age principalmente dentro da luz do intestino. Isso o torna excelente para verminose intestinal e inadequado para parasitos em tecido, situação em que se prefere o albendazol.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: pode ser que apareçam vermes nas fezes nos dias seguintes, e isso é sinal de que o remédio funcionou. Se a família toda estiver com o mesmo problema, o ideal é tratar todo mundo junto e cortar o cobertor da cama de quem coça de noite.' }
    ],

    ivermectina: [
      { tipo: 'sabia', texto: 'A avermectina saiu de uma amostra de solo colhida perto de um campo de golfe em Ito, no Japão, por Satoshi Omura. Com William Campbell, ele dividiu o Nobel de 2015 com Tu Youyou. O medicamento é doado há décadas para campanhas de oncocercose e mudou a história da cegueira dos rios na África.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: esse comprimido é tomado de estômago vazio, com água. Em geral repete uma vez, uma ou duas semanas depois, para pegar os bichinhos que estavam em ovo na primeira vez. Sem essa segunda dose, a coceira costuma voltar.' }
    ],

    praziquantel: [
      { tipo: 'sabia', texto: 'O praziquantel foi desenvolvido nos anos 1970 numa colaboração entre dois laboratórios alemães e mudou o tratamento da esquistossomose no mundo inteiro. Ele provoca contração violenta e paralisia do verme, além de expor seu tegumento ao sistema imune do hospedeiro.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: o comprimido é grande e bem amargo. Pode ser partido e dado com um pouco de comida ou suco. É tomado em uma ou duas doses no mesmo dia, e depois acabou.' }
    ],

    nitazoxanida: [
      { tipo: 'sabia', texto: 'A nitazoxanida age em giárdia, ameba e criptosporídio por um mecanismo pouco comum: interfere numa enzima de transferência de elétrons que os parasitos anaeróbios usam e as células humanas não possuem.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: a urina pode ficar de um amarelo bem forte, quase esverdeado, durante o tratamento, e isso é normal. Dê com comida, de doze em doze horas, por três dias.' }
    ],

    permetrina: [
      { tipo: 'sabia', texto: 'As piretrinas vêm da flor do crisântemo e eram usadas como pó inseticida desde o século XIX. A permetrina é a versão sintética estável, e é a mesma substância com que se impregnam os mosquiteiros de longa duração distribuídos contra a malária.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: passe em todo o corpo do pescoço para baixo, sem esquecer entre os dedos, embaixo da unha, atrás da orelha e no umbigo. Em bebê e criança pequena, passa também no couro cabeludo e no rosto, evitando os olhos. Deixa agir de oito a doze horas, banho pela manhã, e todo mundo da casa faz no mesmo dia.' }
    ],

    benznidazol: [
      { tipo: 'sabia', texto: 'Existem apenas dois medicamentos para a doença de Chagas no mundo, ambos dos anos 1970. A chance de cura parasitológica é alta na fase aguda e em crianças, e cai muito na fase crônica do adulto, o que torna o diagnóstico precoce na infância decisivo.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: o tratamento é longo, de cerca de dois meses, e pode dar mancha na pele e enjoo. Se aparecer mancha, me avise antes de parar, porque quase sempre dá para continuar. Tratar agora, ainda criança, é o que evita o problema no coração daqui a muitos anos.' }
    ],

    antimoniato_meglumina: [
      { tipo: 'sabia', texto: 'O uso de antimonial contra leishmaniose foi introduzido em 1912 pelo médico brasileiro Gaspar Vianna, com o tártaro emético, e é uma das contribuições brasileiras clássicas à terapêutica mundial. Mais de um século depois, os antimoniais seguem em uso de primeira linha no país.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: são muitos dias de injeção seguidos e é preciso vir todos os dias, sem faltar. Durante o tratamento a criança pode sentir dor no corpo e nas juntas. Faremos exames de sangue e do coração ao longo do caminho, porque esse remédio é forte e a gente acompanha de perto.' }
    ],

    anfotericina_b_lipossomal: [
      { tipo: 'sabia', texto: 'A anfotericina B vem do Streptomyces nodosus, isolado de solo do rio Orinoco, na Venezuela, em 1955. O nome vem de anfótero: a molécula tem uma parte que gosta de água e outra que gosta de gordura, e é isso que a faz abrir poros na membrana do fungo. A versão lipossomal a envolve em gordura e reduz muito a toxicidade renal.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: é a forma mais moderna e mais segura desse remédio, aplicada na veia devagar. Pode dar febre e calafrio durante a aplicação, e isso é reação esperada, não é piora da doença.' }
    ],

    rifampicina: [
      { tipo: 'sabia', texto: 'O nome rifampicina é uma brincadeira dos pesquisadores do laboratório Lepetit, em Milão, com o filme francês Rififi, que eles tinham acabado de ver. A molécula veio de uma bactéria de solo colhida numa praia da Riviera francesa.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: a urina, o suor e a lágrima vão ficar alaranjados, cor de laranja mesmo, e isso é do remédio, não é sangue. Pode manchar roupa e lente de contato. É um bom sinal, quer dizer que ela tomou. Dê em jejum, uma hora antes do café.' }
    ],

    isoniazida: [
      { tipo: 'sabia', texto: 'Em 1952, no hospital Sea View, em Nova York, pacientes graves de tuberculose tratados com um derivado da isoniazida ficaram tão eufóricos que foram fotografados dançando nos corredores. Esse efeito colateral levou diretamente ao desenvolvimento do primeiro antidepressivo, a iproniazida.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: esse remédio é tomado de estômago vazio, uma hora antes do café, todo dia, sem falhar. Se a criança ficar amarela nos olhos, com enjoo forte ou dor na barriga em cima, do lado direito, pare e traga para ser vista.' }
    ],

    pirazinamida: [
      { tipo: 'sabia', texto: 'A pirazinamida só funciona em meio ácido, dentro do macrófago e nas lesões inflamadas, e é inativa contra o bacilo em cultura comum. Foi essa ação num nicho que nenhum outro fármaco alcançava que permitiu encurtar o tratamento da tuberculose de doze para seis meses.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: esse é um dos remédios que permitem que o tratamento dure seis meses e não um ano inteiro. Ele fica apenas nos dois primeiros meses. Depois, a criança continua com menos comprimidos.' }
    ],

    etambutol: [
      { tipo: 'sabia', texto: 'A toxicidade característica do etambutol é a neurite óptica, com perda da visão de cores, especialmente a distinção entre verde e vermelho. Por isso ele foi durante muito tempo evitado em crianças pequenas, que não sabem relatar a queixa, embora hoje seja considerado seguro nas doses recomendadas.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: se a criança começar a reclamar que está enxergando embaçado ou trocando as cores, me avise logo. É raro, mas é a única coisa desse remédio que precisa de atenção rápida.' }
    ],

    dapsona: [
      { tipo: 'sabia', texto: 'A dapsona foi o primeiro tratamento realmente eficaz contra a hanseníase, testada em Carville, nos Estados Unidos, nos anos 1940 pela equipe de Guy Faget. Ela substituiu o óleo de chaulmoogra, usado por séculos na Índia e na China, e permitiu esvaziar os leprosários.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: esse remédio pode deixar a criança um pouco mais pálida com o tempo, e por isso vamos repetir o exame de sangue. É esperado e a gente acompanha. Não pare por conta própria se notar isso, me procure antes.' }
    ],

    clofazimina: [
      { tipo: 'sabia', texto: 'A clofazimina é um corante que se deposita nos tecidos, e por isso escurece a pele com um tom acinzentado ou avermelhado que leva meses a anos para sair depois do fim do tratamento. Esse efeito visível é uma das principais causas de abandono do tratamento da hanseníase.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: a pele vai escurecer, principalmente nos lugares onde tem mancha, e isso assusta quem não sabe. Não é a doença piorando, é o remédio. A cor volta ao normal depois que o tratamento acaba, embora demore. Se alguém falar alguma coisa na escola, me conte que a gente resolve.' }
    ],

    salbutamol: [
      { tipo: 'sabia', texto: 'O salbutamol foi o primeiro beta-2 seletivo, criado nos anos 1960 na Inglaterra por David Jack e sua equipe, justamente para separar a broncodilatação do efeito cardíaco da isoprenalina, que estava associada a um excesso de mortes por asma naquela década.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: com o espaçador o remédio chega ao pulmão, sem ele a maior parte fica na boca. Um jato de cada vez, e a criança respira normal umas cinco a dez vezes dentro do espaçador antes do jato seguinte. O tremor na mão e o coração mais acelerado depois são do remédio e passam em pouco tempo.' }
    ],

    ipratropio: [
      { tipo: 'sabia', texto: 'O ipratrópio é um parente sintético da atropina, da beladona. Antes dele, gerações de asmáticos fumavam cigarro de estramônio, planta da mesma família, e o efeito real vinha justamente dos alcaloides anticolinérgicos que a fumaça carregava.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: esse vem junto com a bombinha azul nas crises mais fortes. Segure bem a máscara no rosto, cobrindo nariz e boca, porque se o remédio escapar para o olho pode deixar a vista embaçada e a pupila grande por algumas horas.' }
    ],

    prednisolona: [
      { tipo: 'sabia', texto: 'O corticoide na crise de asma não age nos primeiros minutos: o efeito clínico começa por volta de quatro a seis horas, porque depende de transcrição gênica. Ele não é o remédio que melhora agora, é o que impede a criança de voltar piorada à noite.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: é um remédio forte, mas usado poucos dias como agora ele não faz o mal que as pessoas falam. Não engrossa o osso nem vicia num tratamento de três a cinco dias. Dê de manhã, com comida, e pode acontecer de a criança ficar com mais fome e mais agitada nesses dias.' }
    ],

    dexametasona: [
      { tipo: 'sabia', texto: 'A dexametasona tem potência anti-inflamatória cerca de vinte e cinco vezes maior que a da hidrocortisona e meia-vida biológica longa, de até três dias. É isso que permite, na laringite, resolver o quadro com uma dose única e mandar a criança para casa.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: uma dose só já resolve, porque esse remédio fica agindo por vários dias. Não precisa continuar em casa nem comprar mais. Se a tosse rouca voltar forte à noite, aí sim a gente reavalia.' }
    ],

    hidrocortisona: [
      { tipo: 'sabia', texto: 'A cortisona foi testada pela primeira vez em 1948, numa paciente com artrite reumatoide acamada que voltou a andar em dias. O efeito foi tão espetacular que Hench, Kendall e Reichstein receberam o Nobel já em 1950, apenas dois anos depois.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: esse remédio vai na veia agora porque age mais rápido por ali e a criança está muito ruim. É o mesmo tipo de remédio do comprimido, só que na forma injetável.' }
    ],

    metilprednisolona: [
      { tipo: 'sabia', texto: 'A metilprednisolona tem efeito mineralocorticoide desprezível, ao contrário da hidrocortisona, que retém sódio de forma relevante. Por isso é preferida quando se quer anti-inflamação potente sem mexer no volume e no potássio.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: é o mesmo remédio anti-inflamatório forte, na veia, e o efeito não é imediato: começa a valer depois de algumas horas. Por isso a bombinha continua sendo feita enquanto isso.' }
    ],

    adrenalina: [
      { tipo: 'sabia', texto: 'A adrenalina foi o primeiro hormônio isolado em forma pura e cristalizada, em 1901, pelo químico japonês Jokichi Takamine. Na anafilaxia, ela é o único tratamento que salva vida: anti-histamínico e corticoide são apenas adjuvantes e nunca devem atrasar a injeção.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: a injeção vai na lateral da coxa, no músculo, e age em minutos. Depois de melhorar, a criança ainda precisa ficar em observação por algumas horas, porque a reação pode voltar. Se em casa isso acontecer de novo, corra para o serviço de saúde mais próximo.' }
    ],

    midazolam: [
      { tipo: 'sabia', texto: 'O midazolam tem uma propriedade química incomum: no frasco, em pH ácido, ele é solúvel em água, e no sangue, em pH fisiológico, fecha um anel e vira lipofílico, atravessando rápido para o cérebro. É por isso que funciona por via nasal e bucal, sem veia, na convulsão em que o acesso demora.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: esse remédio corta a convulsão e deixa a criança bem sonolenta depois, às vezes por algumas horas. Esse sono é do remédio, não é a criança piorando.' }
    ],

    diazepam: [
      { tipo: 'sabia', texto: 'Leo Sternbach tinha abandonado uma linha de pesquisa quando, ao limpar a bancada em 1957, um frasco esquecido foi enviado para teste por acaso: era o clordiazepóxido, o primeiro benzodiazepínico. O diazepam veio na sequência e virou o medicamento mais prescrito do mundo nos anos 1970.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: usamos para parar a convulsão. Ela vai dormir bastante depois, e a gente fica monitorando a respiração dela enquanto isso. Esse sono é esperado.' }
    ],

    fenobarbital: [
      { tipo: 'sabia', texto: 'O fenobarbital é o anticonvulsivante mais antigo ainda em uso: seu efeito antiepiléptico foi descoberto por acaso em 1912, por Alfred Hauptmann, que o usava como sedativo noturno numa enfermaria e reparou que as crises dos pacientes tinham cessado.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: é um remédio antigo, muito conhecido e seguro, e deixa a criança sonolenta nos primeiros dias. A sonolência diminui com o tempo. O importante é dar no mesmo horário todo dia e nunca parar de repente.' }
    ],

    fenitoina: [
      { tipo: 'sabia', texto: 'A fenitoína foi descoberta em 1938 por Merritt e Putnam, que testaram compostos em gatos para achar um anticonvulsivante que não sedasse, ao contrário dos barbitúricos. Foi o primeiro antiepiléptico encontrado por triagem racional em vez de acaso clínico.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: esse precisa entrar na veia bem devagar, por isso a demora. Se a veia ficar vermelha, dolorida ou inchada durante a aplicação, chame a enfermagem imediatamente.' }
    ],

    ondansetrona: [
      { tipo: 'sabia', texto: 'A ondansetrona foi criada nos anos 1980 contra o vômito da quimioterapia com cisplatina, que até então era tão intenso que fazia pacientes abandonarem o tratamento. Só depois passou a ser usada na gastroenterite, onde uma dose única aumenta bastante a chance de a reidratação oral dar certo e evita punção venosa.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: esse remédio serve para segurar o vômito e assim conseguirmos dar o soro pela boca, evitando a veia. Em dez ou quinze minutos a gente já recomeça o soro, de colher em colher.' }
    ],

    sais_reidratacao_oral: [
      { tipo: 'sabia', texto: 'A fórmula atual tem osmolaridade reduzida, 245 mOsm por litro, e substituiu a antiga em 2002 porque diminui o volume das fezes, os vômitos e a necessidade de hidratação venosa. O segredo do soro é o cotransporte de sódio e glicose, que continua funcionando mesmo no intestino doente.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: o soro de envelope se dissolve em um litro de água limpa, nem mais nem menos, e não pode adoçar nem virar suco. Dura vinte e quatro horas, depois joga fora e faz outro. Se a criança vomitar, espere dez minutos e recomece devagar, de colher.' }
    ],

    zinco: [
      { tipo: 'sabia', texto: 'O zinco na diarreia não é suplemento genérico: ele encurta o episódio, reduz a gravidade e ainda diminui a ocorrência de novos episódios nos dois a três meses seguintes. Por isso a recomendação é manter os dez a catorze dias mesmo depois de a diarreia acabar.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: esse continua mesmo depois que a diarreia parar, até completar os dias que anotei aqui. Ele ajuda o intestino a se recuperar e evita que volte logo. Dê junto com um pouco de comida, senão pode enjoar.' }
    ],

    sulfato_ferroso: [
      { tipo: 'sabia', texto: 'Só uma pequena fração do ferro do sulfato ferroso é absorvida, e a hepcidina, hormônio do fígado, bloqueia essa absorção por horas após uma dose. É por isso que esquemas de dose única diária, ou mesmo em dias alternados, podem absorver mais ferro total do que doses fracionadas várias vezes ao dia.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: o cocô vai ficar escuro, quase preto, e isso é normal. Dê com suco de fruta ácida, como laranja ou acerola, e nunca junto com leite ou chá, que atrapalham. Pode manchar o dente um pouco: dê com canudo ou colher no fundo da boca e escove depois.' }
    ],

    vitamina_a: [
      { tipo: 'sabia', texto: 'A suplementação de vitamina A reduz a mortalidade no sarampo e é uma das intervenções de saúde pública mais custo-efetivas já medidas. A deficiência ainda é a principal causa evitável de cegueira infantil no mundo, começando pela cegueira noturna.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: é uma cápsula que a gente corta a ponta e pinga na boca da criança, e serve para proteger os olhos e as defesas dela. É repetida a cada seis meses até os cinco anos. Traga sempre a Caderneta para eu anotar.' }
    ],

    soro_fisiologico: [
      { tipo: 'sabia', texto: 'O soro fisiológico não é tão fisiológico: tem 154 mEq por litro de cloreto, bem acima dos cerca de 100 do plasma, e volumes grandes produzem acidose metabólica hiperclorêmica. É uma das razões pelas quais soluções balanceadas vêm ganhando espaço na ressuscitação volêmica.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: é água com sal na medida do sangue, para repor o que a criança perdeu vomitando e com diarreia. Não é remédio nem alimento, é reposição, e por isso corre rápido no começo.' }
    ],

    ringer_lactato: [
      { tipo: 'sabia', texto: 'Sydney Ringer descobriu sua solução por engano em 1882: o técnico usou água de torneira de Londres, e não destilada, e os corações de rã continuaram batendo por horas. O cálcio e o potássio da água explicaram tudo. O lactato foi acrescentado nos anos 1930 pelo pediatra Alexis Hartmann, e por isso a solução também se chama de Hartmann.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: é um soro parecido com o líquido do próprio corpo, com os sais na proporção certa. Repõe o que se perdeu sem desequilibrar o sangue da criança.' }
    ],

    glicose: [
      { tipo: 'sabia', texto: 'A criança pequena tem reserva hepática de glicogênio para poucas horas de jejum, e a desnutrida ou a com malária grave faz hipoglicemia com muita facilidade. Glicemia capilar em toda criança com alteração de consciência é regra, não zelo excessivo.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: o açúcar do sangue dela estava baixo, e é por isso que ela estava tão molinha e sonolenta. Vamos corrigir agora pela veia e depois voltar a alimentar em intervalos curtos, para não cair de novo.' }
    ],

    sulfato_magnesio: [
      { tipo: 'sabia', texto: 'O mesmo sulfato de magnésio que relaxa a musculatura lisa do brônquio na asma grave é o padrão-ouro da eclâmpsia na obstetrícia, e o antídoto da intoxicação é o gluconato de cálcio. O primeiro sinal de excesso é a perda dos reflexos profundos, que por isso são checados durante a infusão.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: é um remédio que relaxa o pulmão e usamos quando a bombinha e o corticoide não foram suficientes. Corre devagar na veia e ela pode sentir calor no corpo durante a aplicação.' }
    ],

    cetamina: [
      { tipo: 'sabia', texto: 'A cetamina é um anestésico dissociativo que, diferente de quase todos os outros, preserva o drive respiratório e os reflexos de via aérea e ainda é broncodilatadora. Está na Lista de Medicamentos Essenciais da OMS justamente por ser o anestésico mais seguro onde não há anestesista nem ventilador.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: ela vai ficar com os olhos abertos e parecendo acordada, mas não vai sentir dor e não vai lembrar do procedimento. Pode ter sonho estranho ao acordar, e por isso vamos deixar o ambiente calmo e com pouca luz.' }
    ],

    soro_antibotropico: [
      { tipo: 'sabia', texto: 'Todo o soro antiveneno brasileiro é produzido em cavalos por instituições públicas, Butantan, Fundação Ezequiel Dias e Instituto Vital Brazil, e distribuído gratuitamente pelo SUS. A dose depende da quantidade de veneno inoculado, ou seja, da gravidade, e não do peso: criança recebe o mesmo número de ampolas que adulto.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: esse é o único remédio que desmancha o veneno, e ele só existe no hospital. Vamos aplicar na veia e ficar olhando de perto, porque pode dar reação alérgica, e a equipe está preparada para isso. Não se corta e não se amarra a mordida.' }
    ],

    soro_antilaquetico: [
      { tipo: 'sabia', texto: 'O soro antibotrópico-laquético cobre tanto Bothrops quanto Lachesis e é usado quando não se pode excluir a surucucu, o que é comum em acidente ocorrido dentro de mata primária amazônica. A presença de bradicardia, hipotensão, cólica e diarreia após a picada sugere componente laquético.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: como a picada foi dentro da mata fechada, usamos um soro que cobre os dois tipos de cobra, para não correr risco. O tratamento é o mesmo: na veia, com a equipe acompanhando.' }
    ],

    soro_anticrotalico: [
      { tipo: 'sabia', texto: 'No acidente crotálico a dor local é pequena e o que domina é a neurotoxicidade, com a fácies miastênica de pálpebra caída, e a rabdomiólise com urina cor de coca-cola. É um acidente que engana justamente por machucar pouco onde mordeu.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: essa mordida dói pouco, e é justamente por isso que assusta menos do que deveria. O veneno age nos músculos e nos nervos. Precisamos que ela beba e receba bastante líquido para proteger o rim.' }
    ],

    soro_antielapidico: [
      { tipo: 'sabia', texto: 'O acidente elapídico, por coral verdadeira, é raro mas é o de maior risco de parada respiratória, porque o veneno bloqueia a junção neuromuscular. Toda criança com suspeita deve ser mantida em ambiente com material de intubação disponível, mesmo parecendo bem à admissão.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: essa cobra deixa pouca marca, mas o veneno dela pode enfraquecer os músculos da respiração nas horas seguintes. Por isso ela vai ficar internada e vigiada, mesmo estando bem agora.' }
    ],

    soro_antiescorpionico: [
      { tipo: 'sabia', texto: 'A maior parte dos acidentes por escorpião é leve e precisa apenas de analgesia. A soroterapia é reservada aos casos com manifestação sistêmica, e a criança pequena é o grupo em que essas manifestações aparecem mais rápido e com menos aviso.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: a maioria das picadas é só dor forte e passa com remédio para dor. Vamos ficar observando algumas horas porque em criança pequena o veneno pode dar sintoma no corpo todo, e aí existe o soro. Vômito repetido e suor frio são os sinais que a gente vigia.' }
    ],

    soro_antiaracnidico: [
      { tipo: 'sabia', texto: 'O soro antiaracnídico brasileiro é trivalente e cobre Phoneutria, Loxosceles e escorpião do gênero Tityus. Na maioria dos acidentes por armadeira em criança, porém, o tratamento é analgesia com anestésico local e observação, sem soro.' },
      { tipo: 'explicarFamilia', texto: 'Para explicar em casa: na maior parte das vezes o tratamento é aliviar a dor e observar, e não precisa de soro. Vamos ficar juntos umas horas para ter certeza de que ela está bem antes de ir para casa.' }
    ]

  }
,

  // Sobre o lugar: ajuda a médica a conversar com a família e a entender o contexto.
  // Distâncias e tempos de viagem são aproximados e variam muito com a cheia e a vazante.
  porLugar: {

    Manaus: [
      { tipo: 'regional', texto: 'Manaus é a única capital brasileira sem ligação rodoviária com o resto do país por estrada confiável: a BR-174 vai ao norte, para Boa Vista e a Venezuela, e a BR-319, para Porto Velho, permanece em grande parte sem pavimento e frequentemente intrafegável. Quase tudo que chega, inclusive paciente, vem por rio ou por avião.' },
      { tipo: 'pratica', texto: 'A malária em Manaus não é da área central: concentra-se na zona rural e periurbana, ao longo de igarapés, ramais e assentamentos, e nos municípios do entorno. Já as arboviroses circulam o ano todo no tecido urbano denso, com criadouro doméstico de água armazenada.' },
      { tipo: 'sabia', texto: 'No Encontro das Águas, o Rio Negro, escuro, mais quente e mais lento, e o Solimões, barrento, mais frio e mais rápido, correm lado a lado por vários quilômetros sem se misturar, por diferença de temperatura, densidade e velocidade. O Teatro Amazonas, de 1896, é o símbolo do dinheiro da borracha que construiu a cidade.' }
    ],

    Parintins: [
      { tipo: 'regional', texto: 'Parintins fica na ilha Tupinambarana, no baixo Amazonas, já na divisa com o Pará, e só se chega de barco ou de avião. São cerca de 370 km rio abaixo de Manaus, o que dá em torno de 18 a 20 horas em barco de linha, menos em lancha rápida.' },
      { tipo: 'sabia', texto: 'O Festival Folclórico de Parintins, na última semana de junho, divide a cidade inteira entre o Garantido, vermelho, e o Caprichoso, azul, e enche o bumbódromo. A divisão é levada tão a sério que o comércio local evita usar a cor do boi rival, e perguntar de qual boi a criança é costuma abrir qualquer conversa.' },
      { tipo: 'pratica', texto: 'Durante o festival a população da cidade multiplica e a demanda no pronto-socorro muda de perfil. Fora disso, a referência de alta complexidade é Manaus, o que significa transferência aérea ou mais de um dia de viagem.' }
    ],

    Itacoatiara: [
      { tipo: 'regional', texto: 'Itacoatiara está na margem esquerda do Amazonas e é um dos poucos municípios de porte do interior ligados a Manaus por estrada, pela AM-010, o que reduz muito o tempo de transferência em comparação com as cidades que dependem só do rio.' },
      { tipo: 'sabia', texto: 'O nome vem do tupi e quer dizer pedra pintada ou pedra riscada, por causa das inscrições rupestres encontradas em pedras da região. A cidade é também porto graneleiro de exportação, o que traz movimento de caminhão e de trabalhador de fora.' }
    ],

    Manacapuru: [
      { tipo: 'regional', texto: 'Manacapuru fica no Solimões, a cerca de 85 km de Manaus pela AM-070, depois de atravessar a ponte sobre o Rio Negro, o que a torna acessível de carro em pouco mais de uma hora e meia. É uma das principais fornecedoras de hortaliça e de fruta para a capital.' },
      { tipo: 'sabia', texto: 'Conhecida como Cidade Vermelha, Manacapuru viveu do cultivo de juta e malva, fibras trazidas por imigrantes japoneses e plantadas na várzea, e hoje é forte em abacaxi e olerícolas. O Festival de Cirandas é a grande festa local.' }
    ],

    Coari: [
      { tipo: 'regional', texto: 'Coari fica no Solimões, a cerca de 360 km de Manaus, alcançável apenas por rio ou por avião, com viagem de barco em torno de um dia. Abriga a base de Urucu, a maior província de petróleo e gás em terra do país, ligada a Manaus por gasoduto.' },
      { tipo: 'pratica', texto: 'A presença da indústria de óleo e gás traz fluxo de trabalhador de fora e renda de royalties, o que convive com indicadores sociais e de saneamento ainda ruins na periferia e nas comunidades de lago. Vale perguntar se a família mora na sede ou em comunidade de rio.' }
    ],

    Tefé: [
      { tipo: 'regional', texto: 'Tefé fica às margens do lago de mesmo nome, perto da foz do Rio Japurá no Solimões, a cerca de 520 km de Manaus, só por rio ou por avião. Funciona como polo de referência para todo o médio Solimões, recebendo pacientes de Alvarães, Uarini, Maraã e Japurá.' },
      { tipo: 'sabia', texto: 'A cidade, então chamada Ega, foi a base do naturalista inglês Henry Walter Bates por cerca de quatro anos e meio no século XIX, onde ele reuniu boa parte da coleção que sustentou sua descrição do mimetismo. Hoje sedia o Instituto Mamirauá, referência mundial em conservação de várzea e casa do uacari-branco.' }
    ],

    Tabatinga: [
      { tipo: 'regional', texto: 'Tabatinga fica na tríplice fronteira do alto Solimões: a cidade é contínua com Letícia, na Colômbia, separada apenas por uma rua, e Santa Rosa, no Peru, fica em frente, do outro lado do rio. Está a mais de mil quilômetros de Manaus, sem estrada, e a viagem de barco leva vários dias.' },
      { tipo: 'pratica', texto: 'A circulação transfronteiriça é cotidiana: a família pode ter feito consulta, comprado remédio ou vacinado a criança em outro país, com caderneta em espanhol ou sem registro. Vale perguntar isso explicitamente antes de considerar a criança não vacinada.' },
      { tipo: 'sabia', texto: 'A região do alto Solimões concentra a maior população Ticuna do Brasil, o povo indígena mais numeroso do país, presente em Tabatinga, Benjamin Constant, São Paulo de Olivença e Amaturá.' }
    ],

    'São Gabriel da Cachoeira': [
      { tipo: 'regional', texto: 'São Gabriel da Cachoeira, no alto Rio Negro, a cerca de 850 km de Manaus e sem estrada, é o município com a maior proporção de população indígena do Brasil. Em 2002 tornou-se o primeiro do país a cooficializar línguas indígenas: o nheengatu, o tukano e o baniwa têm ali o mesmo estatuto do português.' },
      { tipo: 'pratica', texto: 'É uma das áreas de maior transmissão de malária do estado, e muitas famílias chegam à sede depois de dias de viagem de canoa vindas do Içana, do Uaupés ou do Xié. Isso muda o cálculo do retorno: reavaliar em 48 horas pode ser inviável, e isso precisa ser considerado ao decidir entre acompanhar ali ou internar.' },
      { tipo: 'sabia', texto: 'O Pico da Neblina, ponto mais alto do Brasil, fica no território do município, dentro de terra indígena Yanomami, e seu nome em yanomami, Yaripo, quer dizer pico da lua.' }
    ],

    Barcelos: [
      { tipo: 'regional', texto: 'Barcelos, no médio Rio Negro, foi a primeira capital da Capitania de São José do Rio Negro, a partir de 1758, antes de a sede passar para Manaus. É o maior município do Amazonas em área e só se chega por rio ou avião, a cerca de 400 km de Manaus.' },
      { tipo: 'sabia', texto: 'A economia gira em torno do peixe ornamental: o cardinal tetra, chamado localmente de piaba, é capturado por pescadores ribeirinhos e exportado para aquários do mundo inteiro. A cidade tem festival próprio dedicado ao peixe ornamental, com dois grupos rivais, ao estilo dos bois de Parintins.' },
      { tipo: 'pratica', texto: 'É área de alta transmissão de malária, e o piabeiro passa dias acampado em igarapé de mata, com exposição noturna intensa. Perguntar pela ocupação do pai ou do irmão mais velho costuma explicar o caso da criança.' }
    ],

    Maués: [
      { tipo: 'regional', texto: 'Maués fica no rio Maués-Açu, a leste de Manaus, e é alcançada por rio ou avião. É conhecida como Terra do Guaraná: foi o povo Sateré-Mawé que domesticou o guaraná a partir do cipó nativo, e a região segue sendo a origem cultural e agrícola da planta.' },
      { tipo: 'sabia', texto: 'Entre os Sateré-Mawé, o ritual da tucandeira marca a passagem para a vida adulta masculina, com a luva cheia de formigas cujo ferrão provoca dor intensa por horas. Saber disso ajuda a entender queixas e marcas em adolescentes da etnia sem interpretá-las como violência.' }
    ],

    Humaitá: [
      { tipo: 'regional', texto: 'Humaitá fica no rio Madeira, no sul do estado, e é um dos poucos municípios amazonenses com ligação rodoviária utilizável: o trecho sul da BR-319 até Porto Velho, cerca de 200 km, é asfaltado, enquanto o trecho norte, em direção a Manaus, é precário. Na prática, a referência de alta complexidade da família costuma ser Porto Velho, e não a capital do próprio estado.' },
      { tipo: 'sabia', texto: 'O município é cortado pela Transamazônica, a BR-230, e por isso reúne população ribeirinha antiga, migrantes de colonização rodoviária dos anos 1970 e indígenas de vários povos do Madeira, com contextos de exposição bem diferentes entre si.' }
    ],

    Lábrea: [
      { tipo: 'historia', texto: 'Lábrea deu nome à febre negra de Lábrea, uma hepatite fulminante descrita em crianças da bacia do Purus em meados do século XX, com altíssima letalidade e um achado histológico próprio, a célula de Lábrea. Décadas depois ficou claro que se tratava de infecção pelo vírus da hepatite delta sobre hepatite B, e a região segue sendo de alta endemicidade para esses vírus.' },
      { tipo: 'regional', texto: 'A cidade fica no rio Purus, a centenas de quilômetros de Manaus, acessível por rio e por avião, com ligação rodoviária precária pela Transamazônica até Humaitá. É também área de alta transmissão de malária.' }
    ],

    'Benjamin Constant': [
      { tipo: 'regional', texto: 'Benjamin Constant fica na foz do rio Javari, no alto Solimões, vizinha de Tabatinga e de Atalaia do Norte, a mais de mil quilômetros de Manaus, sem estrada. Tem população Ticuna expressiva e forte circulação com Peru e Colômbia.' },
      { tipo: 'pratica', texto: 'Por estar na bacia do Javari, o município recebe pacientes de comunidades muito isoladas, cujo deslocamento se conta em dias. Isso pesa na decisão entre tratar ambulatorialmente com retorno marcado e internar ou transferir de uma vez.' }
    ],

    Manicoré: [
      { tipo: 'regional', texto: 'Manicoré fica no rio Madeira, entre Manaus e Humaitá, e é servida por rio e pela Transamazônica. A castanha-do-brasil e a pesca são atividades tradicionais, e a calha do Madeira tem histórico de garimpo de ouro em balsa.' },
      { tipo: 'pratica', texto: 'Onde há garimpo em balsa no Madeira há duas exposições a considerar: mercúrio, com repercussão neurológica e de desenvolvimento a longo prazo, e malária, pelo acampamento à beira de água parada. Perguntar se alguém da casa trabalha ou trabalhou em balsa muda a anamnese.' }
    ],

    Borba: [
      { tipo: 'sabia', texto: 'Borba, no rio Madeira, é considerada a mais antiga cidade do Amazonas: nasceu em 1728 como missão jesuítica com o nome de Trocano, décadas antes de Manaus ganhar importância. É referência histórica que costuma agradar às famílias locais.' },
      { tipo: 'regional', texto: 'O acesso é fluvial, a algumas horas de lancha de Manaus pelo Madeira, o que a torna relativamente próxima para os padrões do estado. Economia de pesca, agricultura familiar e extrativismo.' }
    ],

    Autazes: [
      { tipo: 'regional', texto: 'Autazes fica na região de lagos entre o Madeira e o Amazonas, a cerca de 110 km de Manaus, alcançada por trecho rodoviário da BR-319 mais travessia de balsa. É um dos maiores produtores de leite do estado, com pecuária de várzea.' },
      { tipo: 'sabia', texto: 'O município tem forte presença do povo Mura, historicamente conhecido pela resistência à colonização na calha do Madeira, e é palco da disputa em torno de um grande depósito de potássio. Contexto de território é assunto vivo ali e vale sensibilidade ao conversar com as famílias.' }
    ],

    Carauari: [
      { tipo: 'regional', texto: 'Carauari fica no médio rio Juruá, um dos rios mais sinuosos do mundo: em linha reta são centenas de quilômetros até Manaus, mas pelo rio a viagem se conta em muitos dias. O acesso é fluvial ou aéreo.' },
      { tipo: 'sabia', texto: 'A região do médio Juruá é referência nacional em extrativismo comunitário, com produção de óleos de andiroba e murumuru e manejo de pirarucu, feitos por associações de moradores de reservas extrativistas. É um dos lugares onde a economia da floresta em pé funcionou de fato.' }
    ],

    Eirunepé: [
      { tipo: 'regional', texto: 'Eirunepé fica no alto Juruá, no extremo sudoeste do estado, e é um dos municípios mais distantes de Manaus, com acesso por avião ou por viagens fluviais muito longas. A região foi frente de seringais no ciclo da borracha e mantém populações ribeirinhas dispersas.' },
      { tipo: 'pratica', texto: 'Em municípios assim, qualquer conduta que dependa de retorno rápido, de exame de controle ou de medicamento de farmácia privada precisa ser repensada: o que não puder ser feito ali provavelmente não será feito.' }
    ],

    'Presidente Figueiredo': [
      { tipo: 'regional', texto: 'Presidente Figueiredo fica a cerca de 100 km ao norte de Manaus pela BR-174, uma das poucas cidades do interior acessíveis por asfalto em pouco mais de uma hora. É conhecida como Terra das Cachoeiras e abriga a usina de Balbina, no rio Uatumã.' },
      { tipo: 'pratica', texto: 'A facilidade de acesso não elimina o risco: há transmissão de malária em ramais, sítios e áreas de igarapé do município, e crianças de Manaus que passam o fim de semana ali podem apresentar febre já de volta à capital.' }
    ],

    'Rio Preto da Eva': [
      { tipo: 'regional', texto: 'Rio Preto da Eva fica a cerca de 80 km de Manaus pela AM-010 e é um dos cinturões agrícolas que abastecem a capital com fruta e hortaliça. O acesso rodoviário facilita muito a transferência e o retorno para reavaliação.' }
    ],

    Iranduba: [
      { tipo: 'regional', texto: 'Iranduba fica logo depois da ponte sobre o Rio Negro, a poucos quilômetros de Manaus, o que a tornou praticamente conurbada com a capital. Concentra olarias que produzem boa parte do tijolo consumido em Manaus, além de horticultura.' },
      { tipo: 'pratica', texto: 'A proximidade faz com que muitas famílias de Iranduba se tratem em Manaus e vice-versa, e a criança pode ter iniciado o tratamento em um município e estar sendo reavaliada em outro. Vale perguntar onde foi o atendimento anterior antes de assumir que não houve nenhum.' }
    ],

    Careiro: [
      { tipo: 'regional', texto: 'O Careiro, também chamado Careiro Castanho, fica no início da BR-319 ao sul de Manaus, com acesso por estrada mais travessia de balsa. O abacaxi do Careiro é famoso no estado e sustenta boa parte da agricultura familiar local.' }
    ],

    'Novo Airão': [
      { tipo: 'regional', texto: 'Novo Airão fica no baixo Rio Negro e tem acesso rodoviário a Manaus pela AM-352, o que é incomum entre os municípios ribeirinhos. Fica em frente ao arquipélago de Anavilhanas, um dos maiores arquipélagos fluviais do mundo, com centenas de ilhas.' },
      { tipo: 'sabia', texto: 'A cidade é conhecida pelo artesanato em madeira e pelo turismo de botos no Rio Negro. Água preta como a do Negro é ácida e pobre em nutrientes, o que reduz muito a densidade de mosquito em relação aos rios de água branca como o Solimões, diferença que ajuda a entender por que o padrão de arbovirose e de malária não é o mesmo em todas as calhas.' }
    ],

    'Atalaia do Norte': [
      { tipo: 'regional', texto: 'Atalaia do Norte, no alto Solimões, é a porta de entrada da Terra Indígena Vale do Javari, área com a maior concentração de povos indígenas isolados e de recente contato do mundo. O acesso se dá por Tabatinga e Benjamin Constant, sem estrada até o restante do país.' },
      { tipo: 'pratica', texto: 'Em populações de recente contato, doenças respiratórias comuns podem ter evolução muito mais grave, e qualquer surto exige comunicação imediata com o distrito sanitário especial indígena. Não é exagero de protocolo, é história epidemiológica documentada.' }
    ],

    Tapauá: [
      { tipo: 'regional', texto: 'Tapauá fica no rio Purus, é um dos maiores municípios em área do estado e está entre os de maior incidência de malária do Amazonas. O acesso é fluvial ou aéreo e as comunidades se espalham por centenas de quilômetros de rio.' }
    ],

    'Santa Isabel do Rio Negro': [
      { tipo: 'regional', texto: 'Santa Isabel do Rio Negro fica no médio Rio Negro, entre Barcelos e São Gabriel da Cachoeira, sem acesso rodoviário. Tem população majoritariamente indígena e ribeirinha, com forte presença Baré, Baniwa e Tukano, e alta transmissão de malária.' }
    ],

    Apuí: [
      { tipo: 'regional', texto: 'Apuí fica no extremo sul do estado, sobre a Transamazônica, e é uma frente de expansão agropecuária, com pecuária, agricultura e garimpo, além de pressão de desmatamento. O perfil de exposição da criança ali é mais próximo do interior de Rondônia e do Mato Grosso do que da várzea amazônica.' },
      { tipo: 'sabia', texto: 'O município ganhou projeção pelo café agroflorestal produzido em sistema sombreado, hoje premiado e vendido como produto de origem, um contraponto local à pecuária extensiva.' }
    ],

    Codajás: [
      { tipo: 'regional', texto: 'Codajás, no Solimões, é conhecida como a terra do açaí e é um dos principais produtores do estado, com festival próprio dedicado ao fruto. O acesso é fluvial, a algumas horas de lancha de Manaus.' },
      { tipo: 'pratica', texto: 'Em municípios de forte produção e consumo de açaí, a orientação sobre lavagem e branqueamento da fruta antes do batimento é conversa de rotina, pela transmissão oral da doença de Chagas. O recado é sobre o preparo, nunca sobre deixar de consumir.' }
    ],

    'Boca do Acre': [
      { tipo: 'regional', texto: 'Boca do Acre fica onde o rio Acre deságua no Purus, no sul do estado, e tem ligação rodoviária pela BR-317 com Rio Branco, bem mais próxima que Manaus. Na prática a família pode ter vínculo assistencial com o Acre, e isso precisa ser checado antes de encaminhar para a capital amazonense.' },
      { tipo: 'sabia', texto: 'A região tem presença do povo Apurinã, do tronco aruák, distribuído ao longo do médio e baixo Purus.' }
    ],

    'Novo Aripuanã': [
      { tipo: 'regional', texto: 'Novo Aripuanã fica na confluência do rio Aripuanã com o Madeira, com acesso fluvial a partir de Manaus. Economia de pesca, castanha e extrativismo, com influência histórica do garimpo na calha do Madeira.' }
    ],

    Barreirinha: [
      { tipo: 'regional', texto: 'Barreirinha fica no rio Andirá, vizinha de Parintins, no baixo Amazonas, com acesso fluvial. Abriga parte da Terra Indígena Andirá-Marau, do povo Sateré-Mawé, compartilhada com Maués.' }
    ],

    'Fonte Boa': [
      { tipo: 'regional', texto: 'Fonte Boa fica no médio Solimões, entre Tefé e o alto Solimões, sem acesso rodoviário, com economia de pesca e agricultura de várzea. As referências de média complexidade da região são Tefé e Manaus, ambas a muitas horas de viagem.' }
    ],

    Nhamundá: [
      { tipo: 'sabia', texto: 'O rio Nhamundá é o cenário tradicional da lenda das icamiabas, as mulheres guerreiras sem homens que os cronistas do século XVI associaram às amazonas da mitologia grega. Foi dessa história que o maior rio do mundo, e depois o estado, receberam o nome de Amazonas.' },
      { tipo: 'regional', texto: 'O município fica na divisa com o Pará, no baixo Amazonas, com acesso fluvial e pela região de Parintins.' }
    ]

  }

};
