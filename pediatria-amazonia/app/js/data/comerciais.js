window.PED = window.PED || {}; var PED = window.PED; PED.data = PED.data || {};

/**
 * Nomes comerciais brasileiros dos medicamentos do app.
 * Objetivo: permitir que o médico reconheça e busque o fármaco tanto pelo nome
 * genérico quanto pela marca que aparece no receituário ou na caixa da família.
 * Fontes: Bulário Eletrônico da ANVISA e RENAME / Ministério da Saúde.
 */
PED.data.comerciais = {
  // chave = id do medicamento em PED.data.medicamentos
  porMedicamento: {

    // ---------------- Antimaláricos ----------------
    artemeter_lumefantrina: {
      generico: 'Artemeter + lumefantrina',
      marcas: ['Coartem'],
      apelidos: ['ACT', 'coartem'],
      obs: 'Não é vendido em farmácia: distribuição exclusiva do Programa Nacional de Controle da Malária (Ministério da Saúde), em blíster por faixa de peso. Comprimido dispersível para crianças.'
    },
    cloroquina: {
      generico: 'Cloroquina (difosfato)',
      marcas: [],
      obs: 'Comercializado principalmente como genérico. Distribuição pelo Programa Nacional de Controle da Malária (Ministério da Saúde), comprimido de 150 mg base.'
    },
    primaquina: {
      generico: 'Primaquina',
      marcas: [],
      obs: 'Sem marca comercial no varejo. Distribuição exclusiva do Programa Nacional de Controle da Malária (Ministério da Saúde), comprimidos de 5 mg (infantil) e 15 mg.'
    },
    artesunato: {
      generico: 'Artesunato',
      marcas: [],
      associacoes: ['Artesunato + mefloquina (ASMQ, coformulação Farmanguinhos)'],
      obs: 'Injetável para malária grave, sem venda em farmácia. Distribuição pelo Ministério da Saúde / Programa Nacional de Controle da Malária.'
    },

    // ---------------- Analgésicos e antitérmicos ----------------
    paracetamol: {
      generico: 'Paracetamol',
      marcas: ['Tylenol', 'Tylenol Bebê', 'Dôrico', 'Parador'],
      associacoes: [
        'Tylenol Sinus (paracetamol + pseudoefedrina)',
        'Resfenol (paracetamol + clorfeniramina + cafeína)',
        'Naldecon (paracetamol + fenilefrina + clorfeniramina)'
      ],
      apelidos: ['tylenol', 'gotinha de febre'],
      obs: 'A família chama a solução oral de gotas (200 mg/mL) e a apresentação da criança maior de suspensão (32 mg/mL). Conferir a concentração: as gotas são muito mais concentradas.'
    },
    dipirona: {
      generico: 'Dipirona (metamizol)',
      marcas: ['Novalgina', 'Anador', 'Magnopyrol'],
      associacoes: [
        'Dorflex (dipirona + orfenadrina + cafeína)',
        'Buscopan Composto (escopolamina + dipirona)',
        'Lisador (dipirona + prometazina + adifenina)'
      ],
      apelidos: ['novalgina', 'gotas de febre'],
      obs: 'Muito conhecida como gotas (500 mg/mL) e como Novalgina infantil em solução de 50 mg/mL. Não confundir as duas concentrações.'
    },
    ibuprofeno: {
      generico: 'Ibuprofeno',
      marcas: ['Alivium', 'Advil', 'Ibupril', 'Buscofem'],
      apelidos: ['alivium'],
      obs: 'As gotas de Alivium existem em 50 mg/mL e 100 mg/mL: conferir na embalagem antes de calcular a dose.'
    },

    // ---------------- Antibióticos ----------------
    amoxicilina: {
      generico: 'Amoxicilina',
      marcas: ['Amoxil', 'Novocilin', 'Hiconcil', 'Velamox'],
      associacoes: ['Clavulin (amoxicilina + clavulanato)'],
      apelidos: ['amoxi'],
      obs: 'Disponível como genérico na farmácia básica. Suspensão de 250 mg/5 mL e de 400 mg/5 mL.'
    },
    amoxicilina_clavulanato: {
      generico: 'Amoxicilina + clavulanato de potássio',
      marcas: ['Clavulin', 'Clavulin BD'],
      apelidos: ['clavulin'],
      obs: 'Clavulin BD é a apresentação de 12 em 12 horas (400 mg/5 mL). Guardar a suspensão na geladeira depois de reconstituir.'
    },
    penicilina_benzatina: {
      generico: 'Penicilina G benzatina',
      marcas: ['Benzetacil', 'Bepeben'],
      apelidos: ['benzetacil', 'injeção na nádega'],
      obs: 'Aplicação intramuscular profunda, frascos de 600.000 UI e 1.200.000 UI. Manter observação por 30 minutos após a aplicação.'
    },
    penicilina_cristalina: {
      generico: 'Penicilina G cristalina (potássica)',
      marcas: [],
      obs: 'Comercializado principalmente como genérico, de uso hospitalar (frasco-ampola de 5.000.000 UI).'
    },
    ampicilina: {
      generico: 'Ampicilina',
      marcas: [],
      associacoes: ['Ampicilina + sulbactam (Unasyn)'],
      obs: 'Comercializado principalmente como genérico injetável de uso hospitalar. O nome histórico Binotal já não circula.'
    },
    ceftriaxona: {
      generico: 'Ceftriaxona',
      marcas: ['Rocefin', 'Triaxton'],
      apelidos: ['rocefin'],
      obs: 'Frasco-ampola IV ou IM. Não administrar junto com soluções que contenham cálcio (Ringer lactato) no neonato.'
    },
    cefalexina: {
      generico: 'Cefalexina',
      marcas: ['Keflex', 'Ceporexin'],
      apelidos: ['keflex'],
      obs: 'Suspensão oral de 250 mg/5 mL, muito usada em infecção de pele e do trato urinário.'
    },
    cefotaxima: {
      generico: 'Cefotaxima',
      marcas: ['Claforan'],
      obs: 'Cefalosporina injetável de escolha no neonato, no lugar da ceftriaxona.'
    },
    azitromicina: {
      generico: 'Azitromicina',
      marcas: ['Zitromax', 'Azi'],
      apelidos: ['azitro'],
      obs: 'Suspensão de 200 mg/5 mL, em geral 1 vez ao dia por 3 a 5 dias.'
    },
    claritromicina: {
      generico: 'Claritromicina',
      marcas: ['Klaricid', 'Klaricid UD'],
      apelidos: ['klaricid'],
      obs: 'Suspensão de 250 mg/5 mL. Klaricid UD é a apresentação de dose única diária, não usada em lactentes.'
    },
    gentamicina: {
      generico: 'Gentamicina',
      marcas: ['Garamicina'],
      obs: 'Injetável de uso hospitalar; a mesma marca existe em apresentação tópica e oftálmica.'
    },
    oxacilina: {
      generico: 'Oxacilina',
      marcas: [],
      obs: 'Comercializado principalmente como genérico injetável de uso hospitalar (frasco-ampola de 500 mg).'
    },
    vancomicina: {
      generico: 'Vancomicina',
      marcas: ['Vancocina'],
      obs: 'Uso hospitalar IV, com infusão lenta em pelo menos 60 minutos.'
    },
    metronidazol: {
      generico: 'Metronidazol',
      marcas: ['Flagyl', 'Flagyl Pediátrico'],
      apelidos: ['flagyl'],
      obs: 'A suspensão pediátrica (benzoilmetronidazol) tem 40 mg/mL. A mesma marca existe em gel vaginal e creme.'
    },
    nitrofurantoina: {
      generico: 'Nitrofurantoína',
      marcas: ['Macrodantina'],
      apelidos: ['macrodantina'],
      obs: 'Cápsulas de 100 mg. Não usar em menores de 1 mês nem em pielonefrite.'
    },
    sulfametoxazol_trimetoprim: {
      generico: 'Sulfametoxazol + trimetoprima (SMX-TMP)',
      marcas: ['Bactrim', 'Bactrim F', 'Infectrin'],
      apelidos: ['bactrim', 'sulfa'],
      obs: 'Suspensão de 200 + 40 mg/5 mL. As doses pediátricas são calculadas pela trimetoprima.'
    },
    doxiciclina: {
      generico: 'Doxiciclina',
      marcas: ['Vibramicina'],
      obs: 'Comprimidos de 100 mg. Tomar com bastante água e sentado, evitando deitar logo em seguida.'
    },

    // ---------------- Antiparasitários ----------------
    albendazol: {
      generico: 'Albendazol',
      marcas: ['Zentel'],
      apelidos: ['remédio de verme'],
      obs: 'Suspensão de 40 mg/mL e comprimido mastigável de 400 mg. Disponível como genérico na farmácia básica e nas campanhas de vermifugação.'
    },
    mebendazol: {
      generico: 'Mebendazol',
      marcas: ['Pantelmin'],
      apelidos: ['remédio de verme'],
      obs: 'Suspensão de 100 mg/5 mL, em geral 2 vezes ao dia por 3 dias. Disponível na farmácia básica.'
    },
    ivermectina: {
      generico: 'Ivermectina',
      marcas: ['Revectina'],
      apelidos: ['revectina'],
      obs: 'Comprimidos de 6 mg, dose calculada por peso. Não usar em crianças com menos de 15 kg.'
    },
    praziquantel: {
      generico: 'Praziquantel',
      marcas: ['Cisticid', 'Cestox'],
      obs: 'Comprimidos de 500 mg e 600 mg. Para esquistossomose também é distribuído pelo Ministério da Saúde em áreas endêmicas.'
    },
    nitazoxanida: {
      generico: 'Nitazoxanida',
      marcas: ['Annita'],
      apelidos: ['annita'],
      obs: 'Suspensão oral de 20 mg/mL, tomada com alimento, 2 vezes ao dia por 3 dias.'
    },
    permetrina: {
      generico: 'Permetrina tópica',
      marcas: ['Nedax', 'Kwell', 'Escabin'],
      apelidos: ['remédio de piolho', 'remédio de sarna'],
      obs: 'Loção a 5% para escabiose e loção ou xampu a 1% para pediculose. Uso externo: nunca ingerir.'
    },
    benznidazol: {
      generico: 'Benznidazol',
      marcas: [],
      apelidos: ['rochagan'],
      obs: 'Não é vendido em farmácia. Produção LAFEPE e distribuição exclusiva do Ministério da Saúde para doença de Chagas; o nome histórico era Rochagan. Comprimido dispersível de 12,5 mg para crianças.'
    },
    antimoniato_meglumina: {
      generico: 'Antimoniato de meglumina',
      marcas: ['Glucantime'],
      apelidos: ['glucantime'],
      obs: 'Ampolas de 5 mL (81 mg de Sb+5 por mL) distribuídas exclusivamente pelo Programa de Vigilância das Leishmanioses do Ministério da Saúde. Doses em mg de antimônio pentavalente por kg.'
    },
    anfotericina_b_lipossomal: {
      generico: 'Anfotericina B lipossomal',
      marcas: ['AmBisome'],
      obs: 'Fornecida pelo Ministério da Saúde para leishmaniose visceral, primeira escolha em lactentes e casos graves. Não confundir com a anfotericina B desoxicolato, que tem doses diferentes.'
    },

    // ---------------- Tuberculose e hanseníase ----------------
    rifampicina: {
      generico: 'Rifampicina',
      marcas: [],
      associacoes: [
        'RHZE (rifampicina + isoniazida + pirazinamida + etambutol)',
        'RH (rifampicina + isoniazida)',
        'PQT-U (rifampicina + dapsona + clofazimina)'
      ],
      obs: 'Não é vendida em farmácia: distribuição exclusiva do Programa Nacional de Controle da Tuberculose e do Programa Nacional de Controle da Hanseníase. Suspensão de 20 mg/mL para crianças. Avisar que deixa urina e suor alaranjados.'
    },
    isoniazida: {
      generico: 'Isoniazida',
      marcas: [],
      associacoes: [
        'RHZE (rifampicina + isoniazida + pirazinamida + etambutol)',
        'RH (rifampicina + isoniazida)',
        '3HP (rifapentina + isoniazida)'
      ],
      obs: 'Distribuição exclusiva do Programa Nacional de Controle da Tuberculose, para tratamento e para infecção latente. Não há apresentação de farmácia.'
    },
    pirazinamida: {
      generico: 'Pirazinamida',
      marcas: [],
      associacoes: ['RHZE (rifampicina + isoniazida + pirazinamida + etambutol)'],
      obs: 'Distribuição exclusiva do Programa Nacional de Controle da Tuberculose. Há suspensão de 30 mg/mL para uso pediátrico nas unidades de referência.'
    },
    etambutol: {
      generico: 'Etambutol',
      marcas: [],
      associacoes: ['RHZE (rifampicina + isoniazida + pirazinamida + etambutol)'],
      obs: 'Distribuição exclusiva do Programa Nacional de Controle da Tuberculose. Uso restrito em menores de 10 anos pelo risco de neurite óptica.'
    },
    dapsona: {
      generico: 'Dapsona',
      marcas: [],
      associacoes: ['PQT-U (rifampicina + dapsona + clofazimina)'],
      obs: 'Fornecida em cartela pelo Programa Nacional de Controle da Hanseníase (Ministério da Saúde); não é encontrada em farmácia comum.'
    },
    clofazimina: {
      generico: 'Clofazimina',
      marcas: [],
      associacoes: ['PQT-U (rifampicina + dapsona + clofazimina)'],
      apelidos: ['lamprene'],
      obs: 'Vem na cartela da PQT-U do Programa Nacional de Controle da Hanseníase, sem venda em farmácia. Escurece a pele de forma reversível: avisar a família.'
    },

    // ---------------- Respiratório ----------------
    salbutamol: {
      generico: 'Salbutamol (albuterol)',
      marcas: ['Aerolin', 'Aerojet'],
      apelidos: ['bombinha'],
      obs: 'A família chama o aerossol de bombinha (100 mcg por jato). Usar sempre com espaçador na criança.'
    },
    ipratropio: {
      generico: 'Brometo de ipratrópio',
      marcas: ['Atrovent'],
      associacoes: ['Combivent (ipratrópio + salbutamol)'],
      apelidos: ['atrovent'],
      obs: 'Solução para nebulização de 0,25 mg/mL, prescrita em gotas. Evitar contato com os olhos durante a nebulização.'
    },

    // ---------------- Corticoides ----------------
    prednisolona: {
      generico: 'Prednisolona',
      marcas: ['Predsim', 'Prelone'],
      apelidos: ['predsim'],
      obs: 'Conhecida como gotas: Predsim 11 mg/mL e solução de 3 mg/mL. Conferir a concentração antes de prescrever.'
    },
    dexametasona: {
      generico: 'Dexametasona',
      marcas: ['Decadron', 'Decadron Elixir'],
      associacoes: ['Duo-Decadron (acetato + fosfato de dexametasona)'],
      apelidos: ['decadron'],
      obs: 'Elixir de 0,1 mg/mL para uso oral e ampola de 4 mg/mL para uso IV ou IM; na crupe a ampola pode ser dada por via oral.'
    },
    hidrocortisona: {
      generico: 'Hidrocortisona (succinato sódico)',
      marcas: ['Solu-Cortef'],
      obs: 'Frasco-ampola de 100 mg e 500 mg para uso IV. Corticoide de escolha na insuficiência adrenal.'
    },
    metilprednisolona: {
      generico: 'Metilprednisolona (succinato sódico)',
      marcas: ['Solu-Medrol'],
      obs: 'Frasco-ampola IV. Não confundir com Depo-Medrol, que é acetato de depósito para uso intramuscular.'
    },

    // ---------------- Emergência e neurologia ----------------
    adrenalina: {
      generico: 'Adrenalina (epinefrina)',
      marcas: [],
      obs: 'Comercializada principalmente como genérico, em ampolas de 1 mg/mL (1:1000). No Brasil não há autoinjetor amplamente disponível.'
    },
    midazolam: {
      generico: 'Midazolam',
      marcas: ['Dormonid', 'Dormire'],
      apelidos: ['dormonid'],
      obs: 'Ampolas de 5 mg/mL e 1 mg/mL. Medicamento de controle especial (Portaria 344/98), receita B1.'
    },
    diazepam: {
      generico: 'Diazepam',
      marcas: ['Valium', 'Dienpax', 'Compaz'],
      apelidos: ['valium'],
      obs: 'Ampola de 5 mg/mL, também usada por via retal na convulsão. Receita B1 de controle especial.'
    },
    fenobarbital: {
      generico: 'Fenobarbital',
      marcas: ['Gardenal', 'Fenocris'],
      apelidos: ['gardenal', 'gotas de gardenal'],
      obs: 'Gotas de 40 mg/mL para uso crônico e ampola de 100 mg/mL para uso parenteral. Receita B1.'
    },
    fenitoina: {
      generico: 'Fenitoína',
      marcas: ['Hidantal', 'Fenital'],
      apelidos: ['hidantal'],
      obs: 'Ampola de 50 mg/mL; diluir apenas em soro fisiológico e infundir lentamente com monitorização cardíaca.'
    },
    ondansetrona: {
      generico: 'Ondansetrona',
      marcas: ['Zofran', 'Vonau', 'Vonau Flash', 'Nausedron'],
      apelidos: ['vonau'],
      obs: 'Vonau Flash é o comprimido orodispersível que derrete na língua, útil na criança que vomita.'
    },

    // ---------------- Reidratação, micronutrientes e soluções ----------------
    sais_reidratacao_oral: {
      generico: 'Sais de reidratação oral (SRO) de osmolaridade reduzida',
      marcas: ['Pedialyte'],
      apelidos: ['sro', 'envelope de soro', 'soro da OMS'],
      obs: 'O envelope da OMS é distribuído gratuitamente pelo SUS. Pedialyte é a solução pronta de farmácia, de composição parecida mas não idêntica.'
    },
    zinco: {
      generico: 'Zinco (sulfato de zinco)',
      marcas: [],
      obs: 'Comercializado principalmente como genérico ou manipulado. A solução de 4 mg/mL e o comprimido dispersível são fornecidos pelo SUS junto com o SRO no tratamento da diarreia.'
    },
    sulfato_ferroso: {
      generico: 'Sulfato ferroso',
      marcas: ['Fer-in-Sol'],
      apelidos: ['gotas de ferro'],
      obs: 'Gotas com 25 mg de ferro elementar por mL, distribuídas pelo Programa Nacional de Suplementação de Ferro. Noripurum e Neutrofer são outros sais de ferro, com doses diferentes.'
    },
    vitamina_a: {
      generico: 'Vitamina A (palmitato de retinol)',
      marcas: ['Arovit'],
      obs: 'As megadoses de 100.000 UI e 200.000 UI são fornecidas pelo Programa Nacional de Suplementação de Vitamina A do Ministério da Saúde.'
    },
    soro_fisiologico: {
      generico: 'Soro fisiológico (cloreto de sódio 0,9%)',
      marcas: ['Rinosoro'],
      apelidos: ['soro', 'SF 0,9%'],
      obs: 'Bolsas e frascos hospitalares são vendidos sem marca (Halex Istar, Fresenius, Baxter, Eurofarma). Rinosoro é a apresentação nasal a 0,9%.'
    },
    ringer_lactato: {
      generico: 'Ringer lactato (solução de Hartmann)',
      marcas: [],
      obs: 'Comercializado sem marca, em bolsas hospitalares (Halex Istar, Fresenius, Baxter). Contém cálcio: não infundir na mesma via que a ceftriaxona.'
    },
    glicose: {
      generico: 'Glicose (dextrose) intravenosa',
      marcas: [],
      apelidos: ['soro glicosado', 'SG 5%'],
      obs: 'Comercializada sem marca, em ampolas a 25% e 50% e bolsas a 5% e 10%. No lactente, corrigir hipoglicemia com glicose a 10%.'
    },
    sulfato_magnesio: {
      generico: 'Sulfato de magnésio',
      marcas: [],
      obs: 'Comercializado principalmente como genérico, em ampolas a 10% e 50%. Não confundir com leite de magnésia (hidróxido de magnésio), que é laxante.'
    },
    cetamina: {
      generico: 'Cetamina (quetamina)',
      marcas: ['Ketalar', 'Ketamin'],
      apelidos: ['keta'],
      obs: 'Frasco-ampola de 50 mg/mL, uso hospitalar sob monitorização. Medicamento de controle especial (Portaria 344/98).'
    },

    // ---------------- Soros antivenenos ----------------
    soro_antibotropico: {
      generico: 'Soro antibotrópico (SAB)',
      marcas: ['Instituto Butantan', 'Fundação Ezequiel Dias (FUNED)', 'Instituto Vital Brazil'],
      apelidos: ['soro de jararaca'],
      obs: 'Não tem nome comercial nem venda em farmácia: as marcas são os institutos produtores. Distribuição exclusiva do Ministério da Saúde para os pontos de soroterapia do SUS.'
    },
    soro_antilaquetico: {
      generico: 'Soro antibotrópico-laquético (SABL)',
      marcas: ['Instituto Butantan', 'Fundação Ezequiel Dias (FUNED)'],
      apelidos: ['soro de surucucu'],
      obs: 'Produzido pelos institutos públicos e distribuído apenas pelo Ministério da Saúde. Usado quando não se pode diferenciar acidente botrópico de laquético na Amazônia.'
    },
    soro_anticrotalico: {
      generico: 'Soro anticrotálico (SAC)',
      marcas: ['Instituto Butantan', 'Fundação Ezequiel Dias (FUNED)', 'Instituto Vital Brazil'],
      apelidos: ['soro de cascavel'],
      obs: 'Sem nome comercial: as marcas são os institutos produtores. Distribuição exclusiva do Ministério da Saúde para as unidades de referência.'
    },
    soro_antielapidico: {
      generico: 'Soro antielapídico (SAEl)',
      marcas: ['Instituto Butantan', 'Instituto Vital Brazil'],
      apelidos: ['soro de coral'],
      obs: 'Soro de produção limitada, sem venda em farmácia. Distribuição exclusiva do Ministério da Saúde para os pontos de soroterapia.'
    },
    soro_antiescorpionico: {
      generico: 'Soro antiescorpiônico (SAEsc)',
      marcas: ['Instituto Butantan', 'Fundação Ezequiel Dias (FUNED)'],
      apelidos: ['soro de escorpião'],
      obs: 'Sem nome comercial: as marcas são os institutos produtores. Distribuição exclusiva do Ministério da Saúde; na falta dele, o soro antiaracnídico pode substituí-lo.'
    },
    soro_antiaracnidico: {
      generico: 'Soro antiaracnídico (SAAr)',
      marcas: ['Instituto Butantan'],
      apelidos: ['soro de aranha'],
      obs: 'Sem nome comercial nem venda em farmácia. Distribuição exclusiva do Ministério da Saúde; cobre Phoneutria, Loxosceles e escorpiões do gênero Tityus.'
    }
  },

  // Índice inverso pronto para busca: nome comercial em minúsculas e sem acento -> id do medicamento
  // (o app também gera isso sozinho a partir de marcas, aqui entram grafias alternativas e apelidos)
  sinonimos: {
    'coartem': 'artemeter_lumefantrina',
    'artemeter': 'artemeter_lumefantrina',
    'tylenol': 'paracetamol',
    'tilenol': 'paracetamol',
    'dorico': 'paracetamol',
    'acetaminofeno': 'paracetamol',
    'novalgina': 'dipirona',
    'novalgin': 'dipirona',
    'anador': 'dipirona',
    'dorflex': 'dipirona',
    'metamizol': 'dipirona',
    'alivium': 'ibuprofeno',
    'aliviun': 'ibuprofeno',
    'advil': 'ibuprofeno',
    'ibupril': 'ibuprofeno',
    'buscofem': 'ibuprofeno',
    'amoxil': 'amoxicilina',
    'amoxi': 'amoxicilina',
    'novocilin': 'amoxicilina',
    'clavulin': 'amoxicilina_clavulanato',
    'clavulim': 'amoxicilina_clavulanato',
    'benzetacil': 'penicilina_benzatina',
    'benzetacyl': 'penicilina_benzatina',
    'bepeben': 'penicilina_benzatina',
    'rocefin': 'ceftriaxona',
    'rocephin': 'ceftriaxona',
    'triaxton': 'ceftriaxona',
    'keflex': 'cefalexina',
    'ceporexin': 'cefalexina',
    'claforan': 'cefotaxima',
    'zitromax': 'azitromicina',
    'azitromax': 'azitromicina',
    'azitro': 'azitromicina',
    'klaricid': 'claritromicina',
    'claricid': 'claritromicina',
    'garamicina': 'gentamicina',
    'vancocina': 'vancomicina',
    'flagyl': 'metronidazol',
    'flagil': 'metronidazol',
    'macrodantina': 'nitrofurantoina',
    'bactrim': 'sulfametoxazol_trimetoprim',
    'bactrin': 'sulfametoxazol_trimetoprim',
    'infectrin': 'sulfametoxazol_trimetoprim',
    'sulfa': 'sulfametoxazol_trimetoprim',
    'vibramicina': 'doxiciclina',
    'zentel': 'albendazol',
    'pantelmin': 'mebendazol',
    'revectina': 'ivermectina',
    'cisticid': 'praziquantel',
    'cestox': 'praziquantel',
    'annita': 'nitazoxanida',
    'anita': 'nitazoxanida',
    'nedax': 'permetrina',
    'kwell': 'permetrina',
    'escabin': 'permetrina',
    'rochagan': 'benznidazol',
    'glucantime': 'antimoniato_meglumina',
    'glucantin': 'antimoniato_meglumina',
    'ambisome': 'anfotericina_b_lipossomal',
    'anbisome': 'anfotericina_b_lipossomal',
    'lamprene': 'clofazimina',
    'rhze': 'rifampicina',
    'rifaldin': 'rifampicina',
    'aerolin': 'salbutamol',
    'aerojet': 'salbutamol',
    'bombinha': 'salbutamol',
    'albuterol': 'salbutamol',
    'atrovent': 'ipratropio',
    'predsim': 'prednisolona',
    'prelone': 'prednisolona',
    'decadron': 'dexametasona',
    'solu cortef': 'hidrocortisona',
    'solucortef': 'hidrocortisona',
    'solu medrol': 'metilprednisolona',
    'solumedrol': 'metilprednisolona',
    'epinefrina': 'adrenalina',
    'dormonid': 'midazolam',
    'dormire': 'midazolam',
    'valium': 'diazepam',
    'dienpax': 'diazepam',
    'compaz': 'diazepam',
    'gardenal': 'fenobarbital',
    'fenocris': 'fenobarbital',
    'hidantal': 'fenitoina',
    'fenital': 'fenitoina',
    'zofran': 'ondansetrona',
    'vonau': 'ondansetrona',
    'vonau flash': 'ondansetrona',
    'nausedron': 'ondansetrona',
    'ondansetron': 'ondansetrona',
    'pedialyte': 'sais_reidratacao_oral',
    'sro': 'sais_reidratacao_oral',
    'soro oral': 'sais_reidratacao_oral',
    'fer in sol': 'sulfato_ferroso',
    'ferinsol': 'sulfato_ferroso',
    'arovit': 'vitamina_a',
    'retinol': 'vitamina_a',
    'rinosoro': 'soro_fisiologico',
    'soro fisiologico': 'soro_fisiologico',
    'hartmann': 'ringer_lactato',
    'ringer': 'ringer_lactato',
    'soro glicosado': 'glicose',
    'dextrose': 'glicose',
    'ketalar': 'cetamina',
    'ketamin': 'cetamina',
    'quetamina': 'cetamina',
    'soro de jararaca': 'soro_antibotropico',
    'soro de surucucu': 'soro_antilaquetico',
    'soro de cascavel': 'soro_anticrotalico',
    'soro de coral': 'soro_antielapidico',
    'soro de escorpiao': 'soro_antiescorpionico',
    'soro de aranha': 'soro_antiaracnidico'
  },

  aviso: 'Nomes comerciais servem para reconhecimento e conferência. A prescrição pelo nome genérico é a regra no SUS (Lei 9.787/1999). Apresentações e concentrações variam entre marcas: conferir sempre na embalagem.',

  fontes: [
    { nome: 'Bulário Eletrônico da ANVISA', ano: 2025 },
    { nome: 'Relação Nacional de Medicamentos Essenciais (RENAME) - Ministério da Saúde', ano: 2024 },
    { nome: 'Guia de Vigilância em Saúde e Manual de Diagnóstico e Tratamento de Acidentes por Animais Peçonhentos - Ministério da Saúde', ano: 2024 }
  ],

  atualizadoEm: '2026-09'
};

if (typeof module !== 'undefined' && module.exports) { module.exports = PED.data.comerciais; }
