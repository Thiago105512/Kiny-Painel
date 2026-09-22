window.PED = window.PED || {}; var PED = window.PED; PED.data = PED.data || {};
/* Listas de apoio ao preenchimento rápido: o campo sugere ao digitar as primeiras letras,
   sem obrigar a rolar listas longas. Todas aceitam texto livre. */
PED.data.apoioEntrada = {
  // 62 municípios do Amazonas
  municipios: ['Manaus', 'Parintins', 'Itacoatiara', 'Manacapuru', 'Coari', 'Tefé', 'Tabatinga', 'Maués', 'Manicoré', 'Humaitá',
    'Iranduba', 'Lábrea', 'São Gabriel da Cachoeira', 'Benjamin Constant', 'Eirunepé', 'Borba', 'Careiro', 'Carauari', 'Autazes', 'Barcelos',
    'Alvarães', 'Amaturá', 'Anamã', 'Anori', 'Apuí', 'Atalaia do Norte', 'Barreirinha', 'Beruri', 'Boa Vista do Ramos', 'Boca do Acre',
    'Caapiranga', 'Canutama', 'Careiro da Várzea', 'Codajás', 'Envira', 'Fonte Boa', 'Guajará', 'Ipixuna', 'Itamarati', 'Itapiranga',
    'Japurá', 'Juruá', 'Jutaí', 'Manaquiri', 'Maraã', 'Nhamundá', 'Nova Olinda do Norte', 'Novo Airão', 'Novo Aripuanã', 'Pauini',
    'Presidente Figueiredo', 'Rio Preto da Eva', 'Santa Isabel do Rio Negro', 'Santo Antônio do Içá', 'São Paulo de Olivença',
    'São Sebastião do Uatumã', 'Silves', 'Tapauá', 'Tonantins', 'Uarini', 'Urucará', 'Urucurituba'],

  alergias: ['Nenhuma conhecida', 'Penicilina', 'Amoxicilina', 'Cefalosporina', 'Sulfa', 'Dipirona', 'Ibuprofeno', 'AAS',
    'Azitromicina', 'Anti-inflamatório', 'Corticoide', 'Iodo', 'Látex', 'Ovo', 'Leite de vaca (APLV)', 'Amendoim',
    'Frutos do mar', 'Picada de inseto', 'Soro heterólogo'],

  comorbidades: ['Nenhuma', 'Asma', 'Rinite alérgica', 'Dermatite atópica', 'Anemia falciforme', 'Epilepsia', 'Paralisia cerebral',
    'Cardiopatia congênita', 'Síndrome de Down', 'Desnutrição', 'Obesidade', 'Diabetes tipo 1', 'HIV', 'Prematuridade',
    'Refluxo gastroesofágico', 'Infecção urinária de repetição', 'Nefropatia', 'Hepatopatia', 'Imunodeficiência', 'Autismo'],

  medicamentosUso: ['Nenhum', 'Salbutamol', 'Budesonida inalatória', 'Sulfato ferroso', 'Vitamina D', 'Prednisolona',
    'Fenobarbital', 'Carbamazepina', 'Ácido valproico', 'Hidroxiureia', 'Ácido fólico', 'Antirretroviral', 'Insulina',
    'Loratadina', 'Omeprazol'],

  queixasLivres: ['Febre', 'Tosse', 'Diarreia', 'Vômitos', 'Dor abdominal', 'Dor de garganta', 'Falta de ar', 'Manchas na pele',
    'Coceira', 'Dor de cabeça', 'Convulsão', 'Picada de inseto', 'Mordida de animal', 'Ferida', 'Choro sem parar', 'Não mama bem'],

  // Atalhos de peso para uso em emergência sem balança
  pesosRapidos: [3, 5, 8, 10, 12, 15, 20, 25, 30, 40, 50],

  zonas: [['urbana', 'Urbana'], ['rural', 'Rural'], ['ribeirinha', 'Ribeirinha'], ['indigena', 'Indígena']],
  atualizadoEm: '2026-09'
};
