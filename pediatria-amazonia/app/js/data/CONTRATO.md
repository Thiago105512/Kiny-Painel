# Contrato dos arquivos de dados (PED.data.*)

Todos os arquivos em `app/js/data/` são scripts JS puros (sem módulos ES, sem `export`), carregados por `<script>` no `index.html`.
Cada arquivo começa com `window.PED = window.PED || {}; PED.data = PED.data || {};` e atribui **um** objeto/array a `PED.data.<nome>`.

Regras clínicas obrigatórias:
- Nunca inventar doses. Usar apenas valores amplamente documentados (Ministério da Saúde, SBP, OMS/OPAS, PALS/AHA, bulas). Se houver dúvida, colocar `verificar: true` e nota "confirmar conforme protocolo/bula".
- Toda entrada terapêutica tem `fontes: [{nome, ano}]` e `atualizadoEm: 'AAAA-MM'`.
- Linguagem de apoio à decisão: "considerar", "compatível com", "avaliar", "confirmar conforme protocolo". Nunca "diagnóstico: X".
- Textos em português do Brasil. Sem markdown dentro das strings (texto simples).

## PED.data.doencas  (array)
```js
{
  id: 'malaria',                       // slug único, sem acento
  nome: 'Malária',
  categoria: 'amazonia'|'respiratoria'|'gastrointestinal'|'infecciosa'|'dermatologica'|'nutricional'|'neurologica'|'urinaria'|'toxicologica',
  amazonia: true,                      // aparece na aba Amazônia
  cid10: 'B54',
  tags: ['febre','calafrios','ictericia'],   // ids de sintomas (ver queixas)
  definicao: '...',
  epidemiologia: '...',                // com ênfase regional no Amazonas quando aplicável
  agente: '...',
  transmissao: '...',
  incubacao: '...',
  manifestacoes: ['...'],
  sinaisAlarme: ['...'],
  diagnosticoDiferencial: ['dengue','leptospirose'],   // ids de doenças (ou texto livre se não existir)
  exames: ['gota_espessa','hemograma'],               // ids de exames (ver exames) ou texto livre
  criteriosDiagnosticos: ['...'],
  classificacaoGravidade: [{nivel:'Leve', criterios:'...'}, ...],
  tratamento: ['...'],                 // passos em texto
  medicamentos: [{medId:'artemeter_lumefantrina', esquema:'...'}],   // medId = id em medicamentos, ou null com nome livre {nome:'...'}
  criteriosInternacao: ['...'],
  criteriosUTI: ['...'],
  criteriosAlta: ['...'],
  orientacoes: ['...'],                // aos responsáveis
  retorno: '...',
  prevencao: ['...'],
  fontes: [{nome:'Guia de Tratamento da Malária no Brasil – MS', ano: 2021}],
  atualizadoEm: '2026-09'
}
```

## PED.data.medicamentos (array)
```js
{
  id: 'amoxicilina',
  nome: 'Amoxicilina',
  classe: 'Antibiótico – penicilina',
  apresentacoes: [
    {descricao:'Suspensão oral 250 mg/5 mL', mg:250, ml:5, tipo:'suspensao', via:'VO'},
    {descricao:'Comprimido 500 mg', mg:500, ml:null, tipo:'comprimido', via:'VO'},
    {descricao:'Frasco-ampola 1 g (pó)', mg:1000, ml:null, tipo:'injetavel', via:'IV', reconstituicao:'diluir em 10 mL de AD (100 mg/mL)'}
  ],
  indicacoes: ['Pneumonia comunitária', 'Otite média aguda'],
  doses: [
    {
      indicacao: 'Pneumonia / OMA (dose alta)',
      mgKgDose: 45,            // mg/kg por dose (obrigatório para cálculo) — pode ser null se só mg/kg/dia
      mgKgDia: 90,             // mg/kg/dia (opcional)
      vezesDia: 2,             // nº de administrações/dia
      frequencia: '12/12 h',
      via: 'VO',
      doseMaxDose: 2000,       // mg, opcional
      doseMaxDia: 4000,        // mg, opcional
      duracao: '7 a 10 dias',
      faixaEtaria: '> 1 mês',  // opcional
      obs: '...'
    }
  ],
  diluicao: '...',             // texto ou null
  infusao: '...',              // velocidade, texto ou null
  contraindicacoes: ['...'],
  interacoes: ['...'],
  ajusteRenal: '...',
  ajusteHepatico: '...',
  efeitosAdversos: ['...'],
  fontes: [{nome:'...', ano:2024}],
  atualizadoEm: '2026-09',
  verificar: false
}
```

## PED.data.queixas (array)
```js
{
  id: 'febre_calafrios',
  nome: 'Febre + calafrios',
  grupo: 'febre'|'respiratorio'|'gastrointestinal'|'neurologico'|'geral'|'pele'|'urinario'|'acidentes'|'neonatal',
  icone: '🌡️',
  perguntas: ['Há quantos dias?', 'Padrão da febre?'],
  sintomasAssociados: [{id:'calafrios', nome:'Calafrios'}, ...],   // ids únicos globais
  sinaisGravidade: ['choque','alteracao_consciencia'],            // ids de PED.data.sinaisGravidade
  diferenciais: [
    { se: {}, hipoteses: [{doencaId:'malaria'}, {nome:'Infecção bacteriana', doencaId:null}] },  // regra base
    { se: {sintomas:['calafrios'], contexto:['rural','ribeirinha']}, hipoteses:[{doencaId:'malaria', nota:'alta prioridade: solicitar gota espessa'}] }
  ],
  exames: ['hemograma','gota_espessa'],
  condutaInicial: ['...'],
  fontes: [...], atualizadoEm:'2026-09'
}
```
Regra: `se.sintomas` = todos os ids devem estar marcados; `se.contexto` = ao menos um id de contexto marcado. Regra com `se: {}` é sempre aplicada.

## PED.data.sinaisGravidade (array)
`{id:'choque', nome:'Choque', descricao:'...', acao:'...'}`

## PED.data.contextoEpidemiologico (array)
`{id:'rural', pergunta:'Permanência em área rural?', tipo:'bool'|'text'|'select', opcoes:[...], tags:['rural']}` — ids usados nas regras de queixas.

## PED.data.emergencias (array)
```js
{
  id:'pcr', nome:'Parada cardiorrespiratória', cor:'vermelho', icone:'🫀',
  reconhecimento:['...'], passos:['...'],
  doses:[
    {nome:'Adrenalina', indicacao:'PCR', mgKg:0.01, unidade:'mg', doseMax:1, apresentacao:'1 mg/mL (1:1.000) diluída para 1:10.000 (0,1 mg/mL)', concentracaoMgMl:0.1, via:'IV/IO', repeticao:'a cada 3–5 min', obs:'...'}
    // se a dose for por kg em mL ou unidades, use unidade:'mL' ou 'UI' e mgKg = valor por kg; concentracaoMgMl pode ser null
    // faixaPesoMin/faixaPesoMax opcionais; doseFixa: valor quando não é por kg
  ],
  materiais:['...'], criteriosUTI:['...'], fontes:[...], atualizadoEm:'2026-09'
}
```

## PED.data.exames (array)
`{id:'hemograma', nome:'Hemograma', categoria:'hematologia'|'bioquimica'|'gasometria'|'urina'|'liquor'|'infeccioso'|'microbiologia', descricao:'...', referencias:[{faixa:'RN', valores:'Hb 13,5–19,5 g/dL ...'}], interpretacao:['...'], fontes:[...], atualizadoEm}`

## PED.data.vacinas (array)
`{id:'bcg', nome:'BCG', doses:[{idadeMeses:0, rotulo:'Ao nascer', dose:'Dose única'}], via:'ID', protege:'...', situacoesEspeciais:'...', atrasoEsquema:'...', fontes:[...]}`

## PED.data.crescimento (objeto)
```js
{
  sinaisVitais: [{faixa:'RN (0–28 d)', minMeses:0, maxMeses:1, fc:[100,180], fr:[30,60], pas:[60,90], pad:[30,60]}],
  marcos: [{idadeMeses:2, dominio:'motor'|'linguagem'|'social'|'cognitivo', marco:'...', alerta:'ausência aos X meses'}],
  curvasOMS: {
    pesoIdade:   {M:[{meses:0,p3:2.5,p15:2.9,p50:3.3,p85:3.9,p97:4.3}, ...], F:[...]},
    estaturaIdade: {M:[...], F:[...]},
    perimetroCefalico: {M:[...], F:[...]},
    imcIdade: {M:[...], F:[...]},
    pesoEstatura: {M:[{cm:65, p3:..,p50:..,p97:..}], F:[...]}
  },
  fontes:[...], atualizadoEm
}
```

## PED.data.preparo  (array)

Como preparar e diluir as medicações que aparecem em `PED.data.emergencias`. Não repete dose nem indicação: isso mora na emergência. Aqui fica o que a mão precisa na hora.

```js
{
  chave: 'adrenalina-iv',              // slug único
  nomes: ['Adrenalina (epinefrina)'],  // precisa casar com dose.nome de alguma emergência (há teste para isso)
  apresentacao: 'Ampola de 1 mL com 1 mg/mL (solução 1:1.000).',
  preparo: ['passo 1', 'passo 2'],     // o que fazer, na ordem
  concentracaoFinal: '0,1 mg/mL (1:10.000)',
  volumePorKg: '0,1 mL/kg da solução 1:10.000',   // opcional
  administrar: 'Bolus IV/IO rápido, seguido de flush de 5 mL de SF 0,9%.',
  cuidados: ['o que não pode acontecer'],
  verificar: true,                     // quando a concentração varia entre serviços
  fontes: [{ nome: 'PALS/AHA', ano: 2020 }],
  atualizadoEm: '2026-09',
}
```

`PED.flash` monta os cartões a partir de `emergencias` + `preparo`. Nenhum conteúdo clínico novo mora no módulo de flashcards.
