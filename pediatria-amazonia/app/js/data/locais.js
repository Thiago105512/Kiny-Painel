window.PED = window.PED || {}; var PED = window.PED; PED.data = PED.data || {};

// Módulo de locais: estado, município, zona de Manaus, bairro e unidade de saúde.
// Tudo é SELEÇÃO - o médico nunca digita texto longo.
// Amazonas e Manaus vêm sempre primeiro, por serem o contexto de uso do aplicativo.

PED.data.locais = {

  estados: [
    { uf: 'AM', nome: 'Amazonas', destaque: true },
    { uf: 'RR', nome: 'Roraima' },
    { uf: 'PA', nome: 'Pará' },
    { uf: 'RO', nome: 'Rondônia' },
    { uf: 'AC', nome: 'Acre' },
    { uf: 'AL', nome: 'Alagoas' },
    { uf: 'AP', nome: 'Amapá' },
    { uf: 'BA', nome: 'Bahia' },
    { uf: 'CE', nome: 'Ceará' },
    { uf: 'DF', nome: 'Distrito Federal' },
    { uf: 'ES', nome: 'Espírito Santo' },
    { uf: 'GO', nome: 'Goiás' },
    { uf: 'MA', nome: 'Maranhão' },
    { uf: 'MT', nome: 'Mato Grosso' },
    { uf: 'MS', nome: 'Mato Grosso do Sul' },
    { uf: 'MG', nome: 'Minas Gerais' },
    { uf: 'PB', nome: 'Paraíba' },
    { uf: 'PR', nome: 'Paraná' },
    { uf: 'PE', nome: 'Pernambuco' },
    { uf: 'PI', nome: 'Piauí' },
    { uf: 'RJ', nome: 'Rio de Janeiro' },
    { uf: 'RN', nome: 'Rio Grande do Norte' },
    { uf: 'RS', nome: 'Rio Grande do Sul' },
    { uf: 'SC', nome: 'Santa Catarina' },
    { uf: 'SP', nome: 'São Paulo' },
    { uf: 'SE', nome: 'Sergipe' },
    { uf: 'TO', nome: 'Tocantins' }
  ],

  cidades: {
    // Amazonas: os 62 municípios. Os cinco maiores/de maior fluxo vêm primeiro, marcados como principais.
    AM: [
      { nome: 'Manaus', principal: true },
      { nome: 'Parintins', principal: true },
      { nome: 'Itacoatiara', principal: true },
      { nome: 'Manacapuru', principal: true },
      { nome: 'Coari', principal: true },
      { nome: 'Alvarães' },
      { nome: 'Amaturá' },
      { nome: 'Anamã' },
      { nome: 'Anori' },
      { nome: 'Apuí' },
      { nome: 'Atalaia do Norte' },
      { nome: 'Autazes' },
      { nome: 'Barcelos' },
      { nome: 'Barreirinha' },
      { nome: 'Benjamin Constant' },
      { nome: 'Beruri' },
      { nome: 'Boa Vista do Ramos' },
      { nome: 'Boca do Acre' },
      { nome: 'Borba' },
      { nome: 'Caapiranga' },
      { nome: 'Canutama' },
      { nome: 'Carauari' },
      { nome: 'Careiro' },
      { nome: 'Careiro da Várzea' },
      { nome: 'Codajás' },
      { nome: 'Eirunepé' },
      { nome: 'Envira' },
      { nome: 'Fonte Boa' },
      { nome: 'Guajará' },
      { nome: 'Humaitá' },
      { nome: 'Ipixuna' },
      { nome: 'Iranduba' },
      { nome: 'Itamarati' },
      { nome: 'Itapiranga' },
      { nome: 'Japurá' },
      { nome: 'Juruá' },
      { nome: 'Jutaí' },
      { nome: 'Lábrea' },
      { nome: 'Manaquiri' },
      { nome: 'Manicoré' },
      { nome: 'Maraã' },
      { nome: 'Maués' },
      { nome: 'Nhamundá' },
      { nome: 'Nova Olinda do Norte' },
      { nome: 'Novo Airão' },
      { nome: 'Novo Aripuanã' },
      { nome: 'Pauini' },
      { nome: 'Presidente Figueiredo' },
      { nome: 'Rio Preto da Eva' },
      { nome: 'Santa Isabel do Rio Negro' },
      { nome: 'Santo Antônio do Içá' },
      { nome: 'São Gabriel da Cachoeira' },
      { nome: 'São Paulo de Olivença' },
      { nome: 'São Sebastião do Uatumã' },
      { nome: 'Silves' },
      { nome: 'Tabatinga' },
      { nome: 'Tapauá' },
      { nome: 'Tefé' },
      { nome: 'Tonantins' },
      { nome: 'Uarini' },
      { nome: 'Urucará' },
      { nome: 'Urucurituba' }
    ],
    // Demais estados: capital e cidades de fronteira ou de fluxo com o Amazonas.
    RR: [
      { nome: 'Boa Vista', principal: true },
      { nome: 'Caracaraí' },
      { nome: 'Rorainópolis' },
      { nome: 'São Luiz do Anauá' }
    ],
    PA: [
      { nome: 'Belém', principal: true },
      { nome: 'Santarém', principal: true },
      { nome: 'Alenquer' },
      { nome: 'Altamira' },
      { nome: 'Itaituba' },
      { nome: 'Juruti' },
      { nome: 'Óbidos' },
      { nome: 'Oriximiná' },
      { nome: 'Faro' },
      { nome: 'Terra Santa' }
    ],
    RO: [
      { nome: 'Porto Velho', principal: true },
      { nome: 'Ariquemes' },
      { nome: 'Guajará-Mirim' },
      { nome: 'Ji-Paraná' },
      { nome: 'Machadinho do Oeste' }
    ],
    AC: [
      { nome: 'Rio Branco', principal: true },
      { nome: 'Cruzeiro do Sul', principal: true },
      { nome: 'Feijó' },
      { nome: 'Sena Madureira' },
      { nome: 'Tarauacá' },
      { nome: 'Santa Rosa do Purus' }
    ],
    MT: [
      { nome: 'Cuiabá', principal: true },
      { nome: 'Aripuanã' },
      { nome: 'Colniza' },
      { nome: 'Juína' }
    ],
    AL: [{ nome: 'Maceió', principal: true }],
    AP: [{ nome: 'Macapá', principal: true }, { nome: 'Santana' }],
    BA: [{ nome: 'Salvador', principal: true }],
    CE: [{ nome: 'Fortaleza', principal: true }],
    DF: [{ nome: 'Brasília', principal: true }],
    ES: [{ nome: 'Vitória', principal: true }],
    GO: [{ nome: 'Goiânia', principal: true }],
    MA: [{ nome: 'São Luís', principal: true }],
    MS: [{ nome: 'Campo Grande', principal: true }],
    MG: [{ nome: 'Belo Horizonte', principal: true }],
    PB: [{ nome: 'João Pessoa', principal: true }],
    PR: [{ nome: 'Curitiba', principal: true }],
    PE: [{ nome: 'Recife', principal: true }],
    PI: [{ nome: 'Teresina', principal: true }],
    RJ: [{ nome: 'Rio de Janeiro', principal: true }],
    RN: [{ nome: 'Natal', principal: true }],
    RS: [{ nome: 'Porto Alegre', principal: true }],
    SC: [{ nome: 'Florianópolis', principal: true }],
    SP: [{ nome: 'São Paulo', principal: true }],
    SE: [{ nome: 'Aracaju', principal: true }],
    TO: [{ nome: 'Palmas', principal: true }]
  },

  // Manaus tem 63 bairros oficiais distribuídos em 6 zonas urbanas.
  // A sétima entrada (rural/ribeirinha) não é zona oficial: existe para registrar
  // a criança que vem de comunidade de rio ou de ramal, situação frequente no atendimento.
  zonasManaus: [
    {
      id: 'centro_sul',
      nome: 'Centro-Sul',
      bairros: ['Adrianópolis', 'Aleixo', 'Chapada', 'Flores', 'Nossa Senhora das Graças', 'Parque 10 de Novembro', 'São Geraldo']
    },
    {
      id: 'centro_oeste',
      nome: 'Centro-Oeste',
      bairros: ['Alvorada', 'Da Paz', 'Dom Pedro', 'Lírio do Vale', 'Nova Esperança', 'Planalto', 'Redenção', 'Santo Agostinho']
    },
    {
      id: 'norte',
      nome: 'Norte',
      bairros: ['Cidade Nova', 'Colônia Santo Antônio', 'Lago Azul', 'Monte das Oliveiras', 'Nova Cidade', 'Novo Aleixo', 'Novo Israel', 'Santa Etelvina', 'Terra Nova']
    },
    {
      id: 'sul',
      nome: 'Sul',
      bairros: ['Betânia', 'Cachoeirinha', 'Centro', 'Colônia Oliveira Machado', 'Crespo', 'Distrito Industrial I', 'Educandos', 'Japiim', 'Morro da Liberdade', 'Nossa Senhora Aparecida', 'Petrópolis', 'Praça 14 de Janeiro', 'Presidente Vargas', 'Raiz', 'Santa Luzia', 'São Francisco', 'São Lázaro', 'Vila Buriti']
    },
    {
      id: 'leste',
      nome: 'Leste',
      bairros: ['Armando Mendes', 'Colônia Antônio Aleixo', 'Coroado', 'Distrito Industrial II', 'Gilberto Mestrinho', 'Jorge Teixeira', 'Mauazinho', 'Puraquequara', 'São José Operário', 'Tancredo Neves', 'Zumbi dos Palmares']
    },
    {
      id: 'oeste',
      nome: 'Oeste',
      bairros: ['Compensa', 'Glória', 'Ponta Negra', 'Santo Antônio', 'São Jorge', 'São Raimundo', 'Tarumã', 'Tarumã-Açu', 'Vila da Prata']
    },
    {
      id: 'rural',
      nome: 'Rural / ribeirinha',
      bairros: ['Comunidades do Rio Negro', 'Comunidades do Rio Amazonas', 'Comunidades do Rio Solimões', 'Área rural da BR-174', 'Área rural da AM-010', 'Ramal do Brasileirinho', 'Distrito de Nova Canaã']
    }
  ],

  unidades: [
    // ---------------------------------------------------------------
    // MANAUS - REDE PUBLICA - PRONTO-SOCORRO PEDIATRICO
    // ---------------------------------------------------------------
    {
      id: 'ps_crianca_zona_oeste_joaozinho',
      nome: 'Hospital e Pronto-Socorro da Criança da Zona Oeste (Joãozinho)',
      tipo: 'pronto_socorro', rede: 'publica',
      cidade: 'Manaus', zona: 'oeste', bairro: 'São Jorge',
      endereco: '', telefone: '',
      pediatria: true, urgencia: true,
      referenciaPara: ['urgência pediátrica', 'trauma pediátrico', 'queimaduras em criança'],
      obs: 'confirmar endereço e perfil de atendimento', verificar: true
    },
    {
      id: 'ps_crianca_zona_sul',
      nome: 'Hospital e Pronto-Socorro da Criança da Zona Sul',
      tipo: 'pronto_socorro', rede: 'publica',
      cidade: 'Manaus', zona: 'sul', bairro: 'Praça 14 de Janeiro',
      endereco: '', telefone: '',
      pediatria: true, urgencia: true,
      referenciaPara: ['urgência pediátrica'],
      obs: 'confirmar endereço e perfil de atendimento', verificar: true
    },
    {
      id: 'ps_crianca_zona_leste',
      nome: 'Hospital e Pronto-Socorro da Criança da Zona Leste',
      tipo: 'pronto_socorro', rede: 'publica',
      cidade: 'Manaus', zona: 'leste', bairro: 'São José Operário',
      endereco: '', telefone: '',
      pediatria: true, urgencia: true,
      referenciaPara: ['urgência pediátrica'],
      obs: 'confirmar endereço e perfil de atendimento', verificar: true
    },
    {
      id: 'icam',
      nome: 'Instituto da Criança do Amazonas (ICAM)',
      tipo: 'referencia', rede: 'publica',
      cidade: 'Manaus', zona: null, bairro: '',
      endereco: '', telefone: '',
      pediatria: true, urgencia: false,
      referenciaPara: ['especialidades pediátricas', 'cirurgia pediátrica', 'ambulatório de seguimento'],
      obs: 'confirmar endereço e perfil de atendimento', verificar: true
    },

    // ---------------------------------------------------------------
    // MANAUS - REDE PUBLICA - PRONTO-SOCORRO GERAL / HOSPITAL DE PORTA ABERTA
    // ---------------------------------------------------------------
    {
      id: 'ps_joao_lucio',
      nome: 'Hospital e Pronto-Socorro Dr. João Lúcio Pereira Machado',
      tipo: 'pronto_socorro', rede: 'publica',
      cidade: 'Manaus', zona: 'leste', bairro: 'Coroado',
      endereco: '', telefone: '',
      pediatria: true, urgencia: true,
      referenciaPara: ['trauma', 'emergência clínica e cirúrgica'],
      obs: 'porta aberta 24 h; atendimento predominantemente de adulto, confirmar retaguarda pediátrica', verificar: true
    },
    {
      id: 'ps_28_de_agosto',
      nome: 'Hospital e Pronto-Socorro 28 de Agosto',
      tipo: 'pronto_socorro', rede: 'publica',
      cidade: 'Manaus', zona: 'centro_sul', bairro: 'Parque 10 de Novembro',
      endereco: '', telefone: '',
      pediatria: false, urgencia: true,
      referenciaPara: ['emergência clínica e cirúrgica do adulto'],
      obs: 'confirmar endereço e perfil de atendimento', verificar: true
    },
    {
      id: 'ps_platao_araujo',
      nome: 'Hospital e Pronto-Socorro Dr. Aristóteles Platão Bezerra de Araújo (Platão Araújo)',
      tipo: 'pronto_socorro', rede: 'publica',
      cidade: 'Manaus', zona: 'leste', bairro: 'São José Operário',
      endereco: '', telefone: '',
      pediatria: true, urgencia: true,
      referenciaPara: ['emergência clínica e cirúrgica'],
      obs: 'confirmar endereço e perfil de atendimento', verificar: true
    },
    {
      id: 'hps_delphina_aziz',
      nome: 'Hospital e Pronto-Socorro Delphina Rinaldi Abdel Aziz',
      tipo: 'pronto_socorro', rede: 'publica',
      cidade: 'Manaus', zona: 'norte', bairro: 'Terra Nova',
      endereco: '', telefone: '',
      pediatria: true, urgencia: true,
      referenciaPara: ['emergência clínica', 'terapia intensiva', 'doenças respiratórias'],
      obs: 'confirmar endereço e perfil de atendimento', verificar: true
    },

    // ---------------------------------------------------------------
    // MANAUS - REDE PUBLICA - SPA E UPA
    // ---------------------------------------------------------------
    {
      id: 'spa_alvorada',
      nome: 'SPA Alvorada (Serviço de Pronto Atendimento)',
      tipo: 'upa', rede: 'publica',
      cidade: 'Manaus', zona: 'centro_oeste', bairro: 'Alvorada',
      endereco: '', telefone: '',
      pediatria: true, urgencia: true,
      obs: 'confirmar endereço e perfil de atendimento', verificar: true
    },
    {
      id: 'spa_coroado',
      nome: 'SPA Coroado (Serviço de Pronto Atendimento)',
      tipo: 'upa', rede: 'publica',
      cidade: 'Manaus', zona: 'leste', bairro: 'Coroado',
      endereco: '', telefone: '',
      pediatria: true, urgencia: true,
      obs: 'confirmar endereço e perfil de atendimento', verificar: true
    },
    {
      id: 'spa_sao_raimundo',
      nome: 'SPA São Raimundo (Serviço de Pronto Atendimento)',
      tipo: 'upa', rede: 'publica',
      cidade: 'Manaus', zona: 'oeste', bairro: 'São Raimundo',
      endereco: '', telefone: '',
      pediatria: true, urgencia: true,
      obs: 'confirmar endereço e perfil de atendimento', verificar: true
    },
    {
      id: 'spa_joventina_dias',
      nome: 'SPA Joventina Dias (Serviço de Pronto Atendimento)',
      tipo: 'upa', rede: 'publica',
      cidade: 'Manaus', zona: 'oeste', bairro: 'Compensa',
      endereco: '', telefone: '',
      pediatria: true, urgencia: true,
      obs: 'confirmar endereço e perfil de atendimento', verificar: true
    },
    {
      id: 'spa_danilo_correa',
      nome: 'SPA Danilo Corrêa (Serviço de Pronto Atendimento)',
      tipo: 'upa', rede: 'publica',
      cidade: 'Manaus', zona: 'leste', bairro: 'Jorge Teixeira',
      endereco: '', telefone: '',
      pediatria: true, urgencia: true,
      obs: 'confirmar endereço e perfil de atendimento', verificar: true
    },
    {
      id: 'spa_zona_sul',
      nome: 'SPA Zona Sul (Serviço de Pronto Atendimento)',
      tipo: 'upa', rede: 'publica',
      cidade: 'Manaus', zona: 'sul', bairro: '',
      endereco: '', telefone: '',
      pediatria: true, urgencia: true,
      obs: 'confirmar endereço e perfil de atendimento', verificar: true
    },
    {
      id: 'upa_campos_sales',
      nome: 'UPA Campos Sales (Unidade de Pronto Atendimento)',
      tipo: 'upa', rede: 'publica',
      cidade: 'Manaus', zona: 'sul', bairro: '',
      endereco: '', telefone: '',
      pediatria: true, urgencia: true,
      obs: 'confirmar endereço e perfil de atendimento', verificar: true
    },

    // ---------------------------------------------------------------
    // MANAUS - REDE PUBLICA - HOSPITAIS ESTADUAIS, FEDERAIS E DE REFERENCIA
    // ---------------------------------------------------------------
    {
      id: 'fmt_hvd',
      nome: 'Fundação de Medicina Tropical Doutor Heitor Vieira Dourado (FMT-HVD)',
      tipo: 'referencia', rede: 'publica',
      cidade: 'Manaus', zona: 'centro_oeste', bairro: 'Dom Pedro',
      endereco: 'Av. Pedro Teixeira, 25, Dom Pedro', telefone: '',
      pediatria: true, urgencia: true,
      referenciaPara: ['malária', 'arboviroses', 'leishmanioses', 'acidentes por animais peçonhentos', 'soros antivenenos', 'tuberculose', 'HIV', 'hepatites virais'],
      obs: 'referência estadual em doenças infecciosas e tropicais, com porta de entrada e atendimento pediátrico'
    },
    {
      id: 'hugv_ufam',
      nome: 'Hospital Universitário Getúlio Vargas (HUGV/UFAM)',
      tipo: 'hospital', rede: 'publica',
      cidade: 'Manaus', zona: 'sul', bairro: 'Praça 14 de Janeiro',
      endereco: 'Av. Apurinã, 4, Praça 14 de Janeiro', telefone: '',
      pediatria: true, urgencia: false,
      referenciaPara: ['especialidades pediátricas', 'ensino e pesquisa'],
      obs: 'hospital de ensino; verificar fluxo de regulação para consultas especializadas'
    },
    {
      id: 'fhaj_adriano_jorge',
      nome: 'Fundação Hospital Adriano Jorge (FHAJ)',
      tipo: 'hospital', rede: 'publica',
      cidade: 'Manaus', zona: 'sul', bairro: 'Cachoeirinha',
      endereco: '', telefone: '',
      pediatria: true, urgencia: false,
      referenciaPara: ['cirurgias eletivas', 'especialidades'],
      obs: 'confirmar endereço e perfil de atendimento', verificar: true
    },
    {
      id: 'hu_francisca_mendes',
      nome: 'Hospital Universitário Francisca Mendes',
      tipo: 'referencia', rede: 'publica',
      cidade: 'Manaus', zona: 'norte', bairro: 'Cidade Nova',
      endereco: '', telefone: '',
      pediatria: true, urgencia: false,
      referenciaPara: ['cardiopatia congênita', 'cirurgia cardiovascular', 'cardiologia pediátrica'],
      obs: 'confirmar endereço e perfil de atendimento', verificar: true
    },
    {
      id: 'fcecon',
      nome: 'Fundação Centro de Controle de Oncologia do Estado do Amazonas (FCECON)',
      tipo: 'referencia', rede: 'publica',
      cidade: 'Manaus', zona: 'centro_oeste', bairro: 'Planalto',
      endereco: '', telefone: '',
      pediatria: true, urgencia: false,
      referenciaPara: ['oncologia pediátrica', 'oncohematologia'],
      obs: 'confirmar endereço e perfil de atendimento', verificar: true
    },
    {
      id: 'hemoam',
      nome: 'Fundação de Hematologia e Hemoterapia do Amazonas (HEMOAM)',
      tipo: 'referencia', rede: 'publica',
      cidade: 'Manaus', zona: 'centro_sul', bairro: 'Chapada',
      endereco: '', telefone: '',
      pediatria: true, urgencia: false,
      referenciaPara: ['anemia falciforme', 'hemofilia', 'talassemia', 'citopenias', 'hemoterapia'],
      obs: 'confirmar endereço e perfil de atendimento', verificar: true
    },
    {
      id: 'fuam_alfredo_da_matta',
      nome: 'Fundação Alfredo da Matta (FUAM)',
      tipo: 'referencia', rede: 'publica',
      cidade: 'Manaus', zona: 'sul', bairro: 'Cachoeirinha',
      endereco: '', telefone: '',
      pediatria: true, urgencia: false,
      referenciaPara: ['hanseníase', 'dermatologia sanitária', 'infecções sexualmente transmissíveis'],
      obs: 'confirmar endereço e perfil de atendimento', verificar: true
    },
    {
      id: 'hospital_militar_area_manaus',
      nome: 'Hospital Militar de Área de Manaus (HMAM)',
      tipo: 'hospital', rede: 'publica',
      cidade: 'Manaus', zona: null, bairro: '',
      endereco: '', telefone: '',
      pediatria: true, urgencia: false,
      obs: 'atendimento restrito a militares e dependentes; confirmar endereço e perfil de atendimento', verificar: true
    },
    {
      id: 'casai_manaus',
      nome: 'Casa de Saúde Indígena (CASAI) Manaus',
      tipo: 'referencia', rede: 'publica',
      cidade: 'Manaus', zona: null, bairro: '',
      endereco: '', telefone: '',
      pediatria: true, urgencia: false,
      referenciaPara: ['apoio à criança indígena referenciada do interior'],
      obs: 'vinculada ao DSEI; confirmar endereço e fluxo de acolhimento', verificar: true
    },

    // ---------------------------------------------------------------
    // MANAUS - REDE PUBLICA - MATERNIDADES
    // ---------------------------------------------------------------
    {
      id: 'maternidade_balbina_mestrinho',
      nome: 'Maternidade Balbina Mestrinho',
      tipo: 'maternidade', rede: 'publica',
      cidade: 'Manaus', zona: 'sul', bairro: 'Centro',
      endereco: '', telefone: '',
      pediatria: true, urgencia: true,
      referenciaPara: ['parto', 'alojamento conjunto', 'recém-nascido'],
      obs: 'confirmar endereço e perfil de atendimento', verificar: true
    },
    {
      id: 'maternidade_ana_braga',
      nome: 'Maternidade Ana Braga',
      tipo: 'maternidade', rede: 'publica',
      cidade: 'Manaus', zona: 'leste', bairro: '',
      endereco: '', telefone: '',
      pediatria: true, urgencia: true,
      referenciaPara: ['parto de alto risco', 'UTI neonatal'],
      obs: 'confirmar endereço e perfil de atendimento', verificar: true
    },
    {
      id: 'maternidade_nazira_daou',
      nome: 'Maternidade Dona Nazira Daou',
      tipo: 'maternidade', rede: 'publica',
      cidade: 'Manaus', zona: 'leste', bairro: '',
      endereco: '', telefone: '',
      pediatria: true, urgencia: true,
      referenciaPara: ['parto', 'recém-nascido'],
      obs: 'confirmar zona, bairro, endereço e perfil de atendimento', verificar: true
    },
    {
      id: 'maternidade_moura_tapajoz',
      nome: 'Maternidade Dr. Moura Tapajóz',
      tipo: 'maternidade', rede: 'publica',
      cidade: 'Manaus', zona: 'centro_oeste', bairro: 'Alvorada',
      endereco: '', telefone: '',
      pediatria: true, urgencia: true,
      referenciaPara: ['parto', 'recém-nascido'],
      obs: 'confirmar endereço e perfil de atendimento', verificar: true
    },
    {
      id: 'maternidade_azilda_marreiro',
      nome: 'Maternidade Azilda Marreiro',
      tipo: 'maternidade', rede: 'publica',
      cidade: 'Manaus', zona: 'oeste', bairro: '',
      endereco: '', telefone: '',
      pediatria: true, urgencia: true,
      referenciaPara: ['parto', 'recém-nascido'],
      obs: 'confirmar endereço e perfil de atendimento', verificar: true
    },
    {
      id: 'instituto_mulher_dona_lindu',
      nome: 'Instituto da Mulher Dona Lindu',
      tipo: 'maternidade', rede: 'publica',
      cidade: 'Manaus', zona: 'norte', bairro: 'Cidade Nova',
      endereco: '', telefone: '',
      pediatria: true, urgencia: true,
      referenciaPara: ['parto', 'saúde da mulher', 'recém-nascido'],
      obs: 'confirmar endereço e perfil de atendimento', verificar: true
    },

    // ---------------------------------------------------------------
    // MANAUS - REDE PRIVADA
    // ---------------------------------------------------------------
    {
      id: 'hospital_adventista_manaus',
      nome: 'Hospital Adventista de Manaus',
      tipo: 'hospital', rede: 'privada',
      cidade: 'Manaus', zona: null, bairro: '',
      endereco: '', telefone: '',
      pediatria: true, urgencia: true,
      obs: 'confirmar endereço e perfil de atendimento', verificar: true
    },
    {
      id: 'hospital_santa_julia',
      nome: 'Hospital Santa Júlia',
      tipo: 'hospital', rede: 'privada',
      cidade: 'Manaus', zona: null, bairro: '',
      endereco: '', telefone: '',
      pediatria: true, urgencia: true,
      obs: 'confirmar endereço e perfil de atendimento', verificar: true
    },
    {
      id: 'hospital_beneficente_portuguesa',
      nome: 'Hospital Beneficente Portuguesa de Manaus',
      tipo: 'hospital', rede: 'privada',
      cidade: 'Manaus', zona: null, bairro: '',
      endereco: '', telefone: '',
      pediatria: true, urgencia: true,
      obs: 'confirmar endereço e perfil de atendimento', verificar: true
    },
    {
      id: 'hospital_samaritano_manaus',
      nome: 'Hospital Samaritano de Manaus',
      tipo: 'hospital', rede: 'privada',
      cidade: 'Manaus', zona: null, bairro: '',
      endereco: '', telefone: '',
      pediatria: true, urgencia: true,
      obs: 'confirmar endereço e perfil de atendimento', verificar: true
    },
    {
      id: 'hospital_unimed_manaus',
      nome: 'Hospital Unimed Manaus',
      tipo: 'hospital', rede: 'privada',
      cidade: 'Manaus', zona: null, bairro: '',
      endereco: '', telefone: '',
      pediatria: true, urgencia: true,
      obs: 'confirmar endereço e perfil de atendimento', verificar: true
    },
    {
      id: 'outro_servico_privado',
      nome: 'Outro serviço privado (registrar o nome no prontuário)',
      tipo: 'pronto_socorro', rede: 'privada',
      cidade: 'Manaus', zona: null, bairro: '',
      endereco: '', telefone: '',
      pediatria: true, urgencia: true,
      obs: 'opção de registro quando a criança foi atendida em serviço privado não listado nesta base; anotar o nome da unidade no prontuário', verificar: true
    },

    // ---------------------------------------------------------------
    // MANAUS - AMOSTRA DE UBS POR ZONA
    // As UBS são identificadas pelo bairro, como são conhecidas localmente.
    // Confirmar o nome oficial da unidade no CNES antes de usar em documento.
    // ---------------------------------------------------------------
    { id: 'ubs_aleixo', nome: 'UBS do Aleixo', tipo: 'ubs', rede: 'publica', cidade: 'Manaus', zona: 'centro_sul', bairro: 'Aleixo', endereco: '', telefone: '', pediatria: true, urgencia: false, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'ubs_parque_10', nome: 'UBS do Parque 10 de Novembro', tipo: 'ubs', rede: 'publica', cidade: 'Manaus', zona: 'centro_sul', bairro: 'Parque 10 de Novembro', endereco: '', telefone: '', pediatria: true, urgencia: false, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'ubs_sao_geraldo', nome: 'UBS do São Geraldo', tipo: 'ubs', rede: 'publica', cidade: 'Manaus', zona: 'centro_sul', bairro: 'São Geraldo', endereco: '', telefone: '', pediatria: true, urgencia: false, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'ubs_chapada', nome: 'UBS da Chapada', tipo: 'ubs', rede: 'publica', cidade: 'Manaus', zona: 'centro_sul', bairro: 'Chapada', endereco: '', telefone: '', pediatria: true, urgencia: false, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'ubs_flores', nome: 'UBS do Flores', tipo: 'ubs', rede: 'publica', cidade: 'Manaus', zona: 'centro_sul', bairro: 'Flores', endereco: '', telefone: '', pediatria: true, urgencia: false, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'ubs_adrianopolis', nome: 'UBS do Adrianópolis', tipo: 'ubs', rede: 'publica', cidade: 'Manaus', zona: 'centro_sul', bairro: 'Adrianópolis', endereco: '', telefone: '', pediatria: true, urgencia: false, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },

    { id: 'ubs_alvorada', nome: 'UBS do Alvorada', tipo: 'ubs', rede: 'publica', cidade: 'Manaus', zona: 'centro_oeste', bairro: 'Alvorada', endereco: '', telefone: '', pediatria: true, urgencia: false, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'ubs_planalto', nome: 'UBS do Planalto', tipo: 'ubs', rede: 'publica', cidade: 'Manaus', zona: 'centro_oeste', bairro: 'Planalto', endereco: '', telefone: '', pediatria: true, urgencia: false, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'ubs_redencao', nome: 'UBS da Redenção', tipo: 'ubs', rede: 'publica', cidade: 'Manaus', zona: 'centro_oeste', bairro: 'Redenção', endereco: '', telefone: '', pediatria: true, urgencia: false, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'ubs_da_paz', nome: 'UBS do Da Paz', tipo: 'ubs', rede: 'publica', cidade: 'Manaus', zona: 'centro_oeste', bairro: 'Da Paz', endereco: '', telefone: '', pediatria: true, urgencia: false, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'ubs_lirio_do_vale', nome: 'UBS do Lírio do Vale', tipo: 'ubs', rede: 'publica', cidade: 'Manaus', zona: 'centro_oeste', bairro: 'Lírio do Vale', endereco: '', telefone: '', pediatria: true, urgencia: false, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'ubs_santo_agostinho', nome: 'UBS do Santo Agostinho', tipo: 'ubs', rede: 'publica', cidade: 'Manaus', zona: 'centro_oeste', bairro: 'Santo Agostinho', endereco: '', telefone: '', pediatria: true, urgencia: false, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },

    { id: 'ubs_cidade_nova', nome: 'UBS da Cidade Nova', tipo: 'ubs', rede: 'publica', cidade: 'Manaus', zona: 'norte', bairro: 'Cidade Nova', endereco: '', telefone: '', pediatria: true, urgencia: false, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'ubs_novo_israel', nome: 'UBS do Novo Israel', tipo: 'ubs', rede: 'publica', cidade: 'Manaus', zona: 'norte', bairro: 'Novo Israel', endereco: '', telefone: '', pediatria: true, urgencia: false, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'ubs_monte_das_oliveiras', nome: 'UBS do Monte das Oliveiras', tipo: 'ubs', rede: 'publica', cidade: 'Manaus', zona: 'norte', bairro: 'Monte das Oliveiras', endereco: '', telefone: '', pediatria: true, urgencia: false, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'ubs_santa_etelvina', nome: 'UBS da Santa Etelvina', tipo: 'ubs', rede: 'publica', cidade: 'Manaus', zona: 'norte', bairro: 'Santa Etelvina', endereco: '', telefone: '', pediatria: true, urgencia: false, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'ubs_nova_cidade', nome: 'UBS da Nova Cidade', tipo: 'ubs', rede: 'publica', cidade: 'Manaus', zona: 'norte', bairro: 'Nova Cidade', endereco: '', telefone: '', pediatria: true, urgencia: false, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'ubs_colonia_santo_antonio', nome: 'UBS da Colônia Santo Antônio', tipo: 'ubs', rede: 'publica', cidade: 'Manaus', zona: 'norte', bairro: 'Colônia Santo Antônio', endereco: '', telefone: '', pediatria: true, urgencia: false, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },

    { id: 'ubs_japiim', nome: 'UBS do Japiim', tipo: 'ubs', rede: 'publica', cidade: 'Manaus', zona: 'sul', bairro: 'Japiim', endereco: '', telefone: '', pediatria: true, urgencia: false, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'ubs_petropolis', nome: 'UBS do Petrópolis', tipo: 'ubs', rede: 'publica', cidade: 'Manaus', zona: 'sul', bairro: 'Petrópolis', endereco: '', telefone: '', pediatria: true, urgencia: false, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'ubs_morro_da_liberdade', nome: 'UBS do Morro da Liberdade', tipo: 'ubs', rede: 'publica', cidade: 'Manaus', zona: 'sul', bairro: 'Morro da Liberdade', endereco: '', telefone: '', pediatria: true, urgencia: false, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'ubs_educandos', nome: 'UBS dos Educandos', tipo: 'ubs', rede: 'publica', cidade: 'Manaus', zona: 'sul', bairro: 'Educandos', endereco: '', telefone: '', pediatria: true, urgencia: false, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'ubs_colonia_oliveira_machado', nome: 'UBS da Colônia Oliveira Machado', tipo: 'ubs', rede: 'publica', cidade: 'Manaus', zona: 'sul', bairro: 'Colônia Oliveira Machado', endereco: '', telefone: '', pediatria: true, urgencia: false, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'ubs_raiz', nome: 'UBS da Raiz', tipo: 'ubs', rede: 'publica', cidade: 'Manaus', zona: 'sul', bairro: 'Raiz', endereco: '', telefone: '', pediatria: true, urgencia: false, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },

    { id: 'ubs_jorge_teixeira', nome: 'UBS do Jorge Teixeira', tipo: 'ubs', rede: 'publica', cidade: 'Manaus', zona: 'leste', bairro: 'Jorge Teixeira', endereco: '', telefone: '', pediatria: true, urgencia: false, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'ubs_sao_jose_operario', nome: 'UBS do São José Operário', tipo: 'ubs', rede: 'publica', cidade: 'Manaus', zona: 'leste', bairro: 'São José Operário', endereco: '', telefone: '', pediatria: true, urgencia: false, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'ubs_coroado', nome: 'UBS do Coroado', tipo: 'ubs', rede: 'publica', cidade: 'Manaus', zona: 'leste', bairro: 'Coroado', endereco: '', telefone: '', pediatria: true, urgencia: false, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'ubs_zumbi_dos_palmares', nome: 'UBS do Zumbi dos Palmares', tipo: 'ubs', rede: 'publica', cidade: 'Manaus', zona: 'leste', bairro: 'Zumbi dos Palmares', endereco: '', telefone: '', pediatria: true, urgencia: false, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'ubs_tancredo_neves', nome: 'UBS do Tancredo Neves', tipo: 'ubs', rede: 'publica', cidade: 'Manaus', zona: 'leste', bairro: 'Tancredo Neves', endereco: '', telefone: '', pediatria: true, urgencia: false, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'ubs_armando_mendes', nome: 'UBS do Armando Mendes', tipo: 'ubs', rede: 'publica', cidade: 'Manaus', zona: 'leste', bairro: 'Armando Mendes', endereco: '', telefone: '', pediatria: true, urgencia: false, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'ubs_colonia_antonio_aleixo', nome: 'UBS da Colônia Antônio Aleixo', tipo: 'ubs', rede: 'publica', cidade: 'Manaus', zona: 'leste', bairro: 'Colônia Antônio Aleixo', endereco: '', telefone: '', pediatria: true, urgencia: false, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },

    { id: 'ubs_compensa', nome: 'UBS da Compensa', tipo: 'ubs', rede: 'publica', cidade: 'Manaus', zona: 'oeste', bairro: 'Compensa', endereco: '', telefone: '', pediatria: true, urgencia: false, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'ubs_sao_raimundo', nome: 'UBS do São Raimundo', tipo: 'ubs', rede: 'publica', cidade: 'Manaus', zona: 'oeste', bairro: 'São Raimundo', endereco: '', telefone: '', pediatria: true, urgencia: false, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'ubs_vila_da_prata', nome: 'UBS da Vila da Prata', tipo: 'ubs', rede: 'publica', cidade: 'Manaus', zona: 'oeste', bairro: 'Vila da Prata', endereco: '', telefone: '', pediatria: true, urgencia: false, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'ubs_santo_antonio', nome: 'UBS do Santo Antônio', tipo: 'ubs', rede: 'publica', cidade: 'Manaus', zona: 'oeste', bairro: 'Santo Antônio', endereco: '', telefone: '', pediatria: true, urgencia: false, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'ubs_sao_jorge', nome: 'UBS do São Jorge', tipo: 'ubs', rede: 'publica', cidade: 'Manaus', zona: 'oeste', bairro: 'São Jorge', endereco: '', telefone: '', pediatria: true, urgencia: false, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'ubs_gloria', nome: 'UBS da Glória', tipo: 'ubs', rede: 'publica', cidade: 'Manaus', zona: 'oeste', bairro: 'Glória', endereco: '', telefone: '', pediatria: true, urgencia: false, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'ubs_taruma', nome: 'UBS do Tarumã', tipo: 'ubs', rede: 'publica', cidade: 'Manaus', zona: 'oeste', bairro: 'Tarumã', endereco: '', telefone: '', pediatria: true, urgencia: false, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },

    { id: 'ubs_fluvial_manaus', nome: 'Unidade Básica de Saúde Fluvial de Manaus (comunidades ribeirinhas)', tipo: 'ubs', rede: 'publica', cidade: 'Manaus', zona: 'rural', bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: false, obs: 'atendimento itinerante às comunidades de rio; confirmar calendário e ponto de atracação', verificar: true },
    { id: 'ubs_rural_br174', nome: 'UBS da área rural da BR-174', tipo: 'ubs', rede: 'publica', cidade: 'Manaus', zona: 'rural', bairro: 'Área rural da BR-174', endereco: '', telefone: '', pediatria: true, urgencia: false, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },

    // ---------------------------------------------------------------
    // INTERIOR DO AMAZONAS - HOSPITAL PUBLICO PRINCIPAL DO MUNICIPIO
    // Referência de primeira linha antes da remoção para Manaus.
    // Todos com zona: null. Confirmar nome oficial e retaguarda pediátrica no CNES.
    // ---------------------------------------------------------------
    { id: 'hosp_parintins_jofre_cohen', nome: 'Hospital Jofre Cohen', tipo: 'hospital', rede: 'publica', cidade: 'Parintins', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, referenciaPara: ['urgência da calha do Baixo Amazonas'], obs: 'confirmar endereço e perfil de atendimento', verificar: true },
    { id: 'hosp_itacoatiara_jose_mendes', nome: 'Hospital Regional José Mendes (Itacoatiara)', tipo: 'hospital', rede: 'publica', cidade: 'Itacoatiara', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, obs: 'confirmar endereço e perfil de atendimento', verificar: true },
    { id: 'hosp_manacapuru_lazaro_reis', nome: 'Hospital Regional Lázaro Reis (Manacapuru)', tipo: 'hospital', rede: 'publica', cidade: 'Manacapuru', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, obs: 'confirmar endereço e perfil de atendimento', verificar: true },
    { id: 'hosp_coari_regional', nome: 'Hospital Regional de Coari', tipo: 'hospital', rede: 'publica', cidade: 'Coari', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, obs: 'confirmar endereço e perfil de atendimento', verificar: true },
    { id: 'hosp_tefe_regional', nome: 'Hospital Regional de Tefé', tipo: 'hospital', rede: 'publica', cidade: 'Tefé', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, referenciaPara: ['urgência da calha do Médio Solimões'], obs: 'confirmar endereço e perfil de atendimento', verificar: true },
    { id: 'hosp_tabatinga_regional', nome: 'Hospital Regional de Tabatinga', tipo: 'hospital', rede: 'publica', cidade: 'Tabatinga', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, referenciaPara: ['urgência do Alto Solimões', 'fronteira com Colômbia e Peru'], obs: 'confirmar endereço e perfil de atendimento', verificar: true },
    { id: 'hosp_guarnicao_tabatinga', nome: 'Hospital de Guarnição de Tabatinga (Exército)', tipo: 'hospital', rede: 'publica', cidade: 'Tabatinga', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, obs: 'atendimento militar com apoio à população em situações pactuadas; confirmar fluxo', verificar: true },
    { id: 'hosp_guarnicao_sgc', nome: 'Hospital de Guarnição de São Gabriel da Cachoeira (Exército)', tipo: 'hospital', rede: 'publica', cidade: 'São Gabriel da Cachoeira', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, referenciaPara: ['Alto Rio Negro'], obs: 'confirmar fluxo de atendimento à população civil e indígena', verificar: true },
    { id: 'hosp_sgc_municipal', nome: 'Hospital de Guarnição / Unidade Mista de São Gabriel da Cachoeira', tipo: 'hospital', rede: 'publica', cidade: 'São Gabriel da Cachoeira', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'casai_sgc', nome: 'Casa de Saúde Indígena (CASAI) São Gabriel da Cachoeira', tipo: 'referencia', rede: 'publica', cidade: 'São Gabriel da Cachoeira', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: false, referenciaPara: ['criança indígena do Alto Rio Negro'], obs: 'vinculada ao DSEI Alto Rio Negro; confirmar endereço e fluxo', verificar: true },
    { id: 'hosp_humaita_regional', nome: 'Hospital Regional de Humaitá', tipo: 'hospital', rede: 'publica', cidade: 'Humaitá', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, referenciaPara: ['calha do Madeira'], obs: 'confirmar endereço e perfil de atendimento', verificar: true },
    { id: 'hosp_labrea_regional', nome: 'Hospital Regional de Lábrea', tipo: 'hospital', rede: 'publica', cidade: 'Lábrea', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, referenciaPara: ['calha do Purus'], obs: 'confirmar endereço e perfil de atendimento', verificar: true },
    { id: 'hosp_eirunepe_regional', nome: 'Hospital Regional de Eirunepé', tipo: 'hospital', rede: 'publica', cidade: 'Eirunepé', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, referenciaPara: ['calha do Juruá'], obs: 'confirmar endereço e perfil de atendimento', verificar: true },
    { id: 'hosp_maues_regional', nome: 'Hospital Regional de Maués', tipo: 'hospital', rede: 'publica', cidade: 'Maués', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, obs: 'confirmar endereço e perfil de atendimento', verificar: true },
    { id: 'hosp_manicore_regional', nome: 'Hospital Regional de Manicoré', tipo: 'hospital', rede: 'publica', cidade: 'Manicoré', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, obs: 'confirmar endereço e perfil de atendimento', verificar: true },
    { id: 'hosp_carauari_municipal', nome: 'Hospital Municipal de Carauari', tipo: 'hospital', rede: 'publica', cidade: 'Carauari', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'hosp_benjamin_constant', nome: 'Hospital Municipal de Benjamin Constant', tipo: 'hospital', rede: 'publica', cidade: 'Benjamin Constant', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'hosp_sao_paulo_olivenca', nome: 'Hospital Municipal de São Paulo de Olivença', tipo: 'hospital', rede: 'publica', cidade: 'São Paulo de Olivença', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'hosp_atalaia_do_norte', nome: 'Hospital Municipal de Atalaia do Norte', tipo: 'hospital', rede: 'publica', cidade: 'Atalaia do Norte', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'hosp_boca_do_acre', nome: 'Hospital Municipal de Boca do Acre', tipo: 'hospital', rede: 'publica', cidade: 'Boca do Acre', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'hosp_apui', nome: 'Hospital Municipal de Apuí', tipo: 'hospital', rede: 'publica', cidade: 'Apuí', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'hosp_barcelos', nome: 'Hospital Municipal de Barcelos', tipo: 'hospital', rede: 'publica', cidade: 'Barcelos', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'hosp_santa_isabel_rio_negro', nome: 'Hospital Municipal de Santa Isabel do Rio Negro', tipo: 'hospital', rede: 'publica', cidade: 'Santa Isabel do Rio Negro', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'hosp_novo_airao', nome: 'Hospital Municipal de Novo Airão', tipo: 'hospital', rede: 'publica', cidade: 'Novo Airão', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'hosp_presidente_figueiredo', nome: 'Hospital Municipal de Presidente Figueiredo', tipo: 'hospital', rede: 'publica', cidade: 'Presidente Figueiredo', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, referenciaPara: ['acidentes na BR-174'], obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'hosp_rio_preto_da_eva', nome: 'Hospital Municipal de Rio Preto da Eva', tipo: 'hospital', rede: 'publica', cidade: 'Rio Preto da Eva', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'hosp_iranduba', nome: 'Hospital Municipal de Iranduba', tipo: 'hospital', rede: 'publica', cidade: 'Iranduba', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'hosp_careiro', nome: 'Hospital Municipal do Careiro', tipo: 'hospital', rede: 'publica', cidade: 'Careiro', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'hosp_autazes', nome: 'Hospital Municipal de Autazes', tipo: 'hospital', rede: 'publica', cidade: 'Autazes', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'hosp_borba', nome: 'Hospital Municipal de Borba', tipo: 'hospital', rede: 'publica', cidade: 'Borba', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'hosp_nova_olinda_do_norte', nome: 'Hospital Municipal de Nova Olinda do Norte', tipo: 'hospital', rede: 'publica', cidade: 'Nova Olinda do Norte', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'hosp_barreirinha', nome: 'Hospital Municipal de Barreirinha', tipo: 'hospital', rede: 'publica', cidade: 'Barreirinha', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'hosp_nhamunda', nome: 'Hospital Municipal de Nhamundá', tipo: 'hospital', rede: 'publica', cidade: 'Nhamundá', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'hosp_urucara', nome: 'Hospital Municipal de Urucará', tipo: 'hospital', rede: 'publica', cidade: 'Urucará', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'hosp_codajas', nome: 'Hospital Municipal de Codajás', tipo: 'hospital', rede: 'publica', cidade: 'Codajás', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'hosp_anori', nome: 'Hospital Municipal de Anori', tipo: 'hospital', rede: 'publica', cidade: 'Anori', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'hosp_fonte_boa', nome: 'Hospital Municipal de Fonte Boa', tipo: 'hospital', rede: 'publica', cidade: 'Fonte Boa', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'hosp_jutai', nome: 'Hospital Municipal de Jutaí', tipo: 'hospital', rede: 'publica', cidade: 'Jutaí', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'hosp_santo_antonio_ica', nome: 'Hospital Municipal de Santo Antônio do Içá', tipo: 'hospital', rede: 'publica', cidade: 'Santo Antônio do Içá', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'hosp_envira', nome: 'Hospital Municipal de Envira', tipo: 'hospital', rede: 'publica', cidade: 'Envira', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'hosp_novo_aripuana', nome: 'Hospital Municipal de Novo Aripuanã', tipo: 'hospital', rede: 'publica', cidade: 'Novo Aripuanã', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'hosp_tapaua', nome: 'Hospital Municipal de Tapauá', tipo: 'hospital', rede: 'publica', cidade: 'Tapauá', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },
    { id: 'hosp_manaquiri', nome: 'Hospital Municipal de Manaquiri', tipo: 'hospital', rede: 'publica', cidade: 'Manaquiri', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, obs: 'confirmar nome oficial, endereço e perfil de atendimento', verificar: true },

    // ---------------------------------------------------------------
    // FORA DO AMAZONAS - REFERENCIA DE FLUXO E FRONTEIRA
    // ---------------------------------------------------------------
    { id: 'hosp_crianca_boa_vista_rr', nome: 'Hospital da Criança Santo Antônio (Boa Vista)', tipo: 'hospital', rede: 'publica', cidade: 'Boa Vista', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, referenciaPara: ['urgência pediátrica em Roraima'], obs: 'confirmar endereço e perfil de atendimento', verificar: true },
    { id: 'hosp_santarem_regional_pa', nome: 'Hospital Regional do Baixo Amazonas (Santarém)', tipo: 'hospital', rede: 'publica', cidade: 'Santarém', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, obs: 'confirmar endereço e perfil de atendimento', verificar: true },
    { id: 'hosp_porto_velho_cosme_damiao', nome: 'Hospital Infantil Cosme e Damião (Porto Velho)', tipo: 'hospital', rede: 'publica', cidade: 'Porto Velho', zona: null, bairro: '', endereco: '', telefone: '', pediatria: true, urgencia: true, referenciaPara: ['urgência pediátrica em Rondônia'], obs: 'confirmar endereço e perfil de atendimento', verificar: true }
  ],

  // Referências estaduais que o pediatra precisa saber de cor.
  referencias: [
    { assunto: 'Doenças infecciosas e tropicais', unidade: 'Fundação de Medicina Tropical Doutor Heitor Vieira Dourado (FMT-HVD)', obs: 'Malária, arboviroses, leishmanioses, acidentes por animais peçonhentos, soros antivenenos, tuberculose, HIV e hepatites virais. Porta de entrada em Manaus.' },
    { assunto: 'Emergência pediátrica e trauma', unidade: 'Hospital e Pronto-Socorro da Criança da Zona Oeste (Joãozinho), da Zona Sul e da Zona Leste', obs: 'Portas abertas 24 h para criança em Manaus. Para trauma grave de adolescente e adulto, o Hospital e Pronto-Socorro Dr. João Lúcio Pereira Machado.' },
    { assunto: 'Queimados', unidade: 'Hospital e Pronto-Socorro da Criança da Zona Oeste (Joãozinho)', obs: 'Confirmar a unidade de queimados pediátricos vigente antes de remover, porque o serviço já mudou de endereço em Manaus.' },
    { assunto: 'Oncologia pediátrica', unidade: 'Fundação Centro de Controle de Oncologia do Estado do Amazonas (FCECON)', obs: 'Suspeita de câncer na criança exige contato direto e encaminhamento rápido, sem esperar fila comum.' },
    { assunto: 'Hematologia e anemia falciforme', unidade: 'Fundação de Hematologia e Hemoterapia do Amazonas (HEMOAM)', obs: 'Triagem neonatal alterada para hemoglobinopatia, crise falcêmica, hemofilia e necessidade de hemocomponentes.' },
    { assunto: 'Cardiopatia congênita', unidade: 'Hospital Universitário Francisca Mendes', obs: 'Referência estadual em cirurgia cardiovascular. Recém-nascido com suspeita de cardiopatia crítica deve ser discutido antes da remoção.' },
    { assunto: 'Doenças raras e genética', unidade: 'Hospital Universitário Getúlio Vargas (HUGV/UFAM) e Instituto da Criança do Amazonas (ICAM)', obs: 'Confirmar qual serviço mantém o ambulatório de genética médica vigente, porque a oferta varia.' },
    { assunto: 'Hanseníase e dermatologia sanitária', unidade: 'Fundação Alfredo da Matta (FUAM)', obs: 'Lesão hipocrômica com alteração de sensibilidade em criança, contato domiciliar de hanseníase.' },
    { assunto: 'Saúde indígena', unidade: 'Casa de Saúde Indígena (CASAI) Manaus e Distritos Sanitários Especiais Indígenas (DSEI) do Amazonas', obs: 'Criança indígena referenciada do interior costuma chegar pela CASAI. Acionar o DSEI de origem para continuidade do cuidado, retorno e vacinação.' },
    { assunto: 'Intoxicações', unidade: 'Centro de Informação e Assistência Toxicológica do Amazonas (CIATox-AM)', obs: 'Orientação por telefone em intoxicação exógena, acidente com animal peçonhento e uso indevido de medicamento. Confirmar o número vigente antes do plantão.' },
    { assunto: 'Gestação de alto risco e recém-nascido grave', unidade: 'Maternidade Ana Braga e demais maternidades estaduais de Manaus', obs: 'Confirmar disponibilidade de UTI neonatal pela central de regulação antes de transferir.' },
    { assunto: 'Regulação e transporte do interior', unidade: 'Central de Regulação de Leitos e Urgências do Amazonas', obs: 'Remoção fluvial e aérea do interior para Manaus depende de regulação. Iniciar estabilização e contato o mais cedo possível, porque o tempo de deslocamento é longo.' }
  ],

  aviso: 'Nomes, endereços e perfis de atendimento das unidades mudam. Conferir a unidade de referência vigente antes de encaminhar, especialmente à noite e nos fins de semana. As entradas marcadas com verificar precisam de confirmação no CNES ou junto à regulação.',

  fontes: [
    { nome: 'Cadastro Nacional de Estabelecimentos de Saúde (CNES) - Ministério da Saúde', ano: 2025 },
    { nome: 'Secretaria Municipal de Saúde de Manaus (SEMSA)', ano: 2025 },
    { nome: 'Secretaria de Estado de Saúde do Amazonas (SES-AM)', ano: 2025 },
    { nome: 'Instituto Brasileiro de Geografia e Estatística (IBGE) - divisão territorial e municípios do Amazonas', ano: 2025 },
    { nome: 'Prefeitura de Manaus - divisão de bairros e zonas administrativas', ano: 2025 }
  ],

  atualizadoEm: '2026-09'
};
