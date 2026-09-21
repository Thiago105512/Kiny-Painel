# 5. Estrutura dos módulos

```
pediatria-amazonia/
├── README.md                     ← como executar, escopo do MVP, avisos
├── docs/                         ← entregáveis 1–9
│   ├── 01-arquitetura.md
│   ├── 02-mapa-de-telas.md
│   ├── 03-banco-de-dados.md  + schema.sql
│   ├── 04-fluxo-de-navegacao.md
│   ├── 05-modulos.md
│   ├── 06-doencas.md
│   ├── 07-medicamentos.md
│   ├── 08-calculadoras.md
│   └── 09-design-interface.md
└── app/                          ← protótipo funcional (entregável 10)
    ├── index.html                ← casca da aplicação e carregamento das bases
    ├── manifest.webmanifest      ← instalação como app (PWA)
    ├── sw.js                     ← cache offline
    ├── css/styles.css            ← design system
    └── js/
        ├── utils.js              ← idade, IMC, SC, formatação, escape
        ├── store.js              ← persistência local (coleções)
        ├── seguranca.js          ← faixa etária, alergia por classe, conferência da prescrição
        ├── calculators.js        ← 20 calculadoras declarativas + motor de escore-z
        ├── app.js                ← roteador, telas, fluxo, prescrição, SOAP
        └── data/                 ← conhecimento clínico (com fontes/data)
            ├── CONTRATO.md       ← esquema de cada base
            ├── queixas.js        ← 45 queixas, sintomas, regras de diferenciais
            ├── sinais-gravidade.js
            ├── contexto-epidemiologico.js
            ├── doencas.js        ← protocolos padronizados
            ├── medicamentos.js   ← banco com apresentações e esquemas mg/kg
            ├── emergencias.js    ← 14 protocolos com doses por peso
            ├── exames.js         ← referências por idade
            ├── vacinas.js        ← calendário PNI
            └── crescimento.js    ← sinais vitais, marcos, tabelas OMS
```

## Módulos funcionais

| Módulo | Responsabilidade | Depende de |
|---|---|---|
| **Pacientes** | Cadastro, idade automática, IMC/SC, alergias, zona/município; medidas seriadas; marcos; situação vacinal | store, utils, crescimento, vacinas |
| **Queixas** | Fluxo de 8 etapas; motor de diferenciais por sintomas + contexto; sinais de gravidade com alerta | queixas, sinais-gravidade, contexto, doencas, exames, medicamentos |
| **Doenças / Amazônia** | Protocolos padronizados (18 seções); aba regional com destaque | doencas, medicamentos, exames |
| **Medicamentos** | Banco; painel de dose (peso → mg/kg → mg → concentração → mL) com máximos e fórmula; alergia | medicamentos, paciente ativo |
| **Calculadoras** | 18 calculadoras autopreenchidas com fórmula visível | calculators, crescimento |
| **Emergências** | Reconhecimento, passos, doses por peso (ou por gravidade para soros), materiais, UTI | emergencias, paciente/peso rápido |
| **Exames** | Biblioteca com referências por faixa etária | exames |
| **Vacinas** | Calendário PNI; realizadas/pendentes/atrasadas por paciente | vacinas, store |
| **Crescimento** | Percentis aproximados OMS, marcos, sinais vitais por idade | crescimento, calculators |
| **Prescrição** | Rascunho a partir do fluxo/banco; itens editáveis; confirmação obrigatória; impressão | store, medicamentos |
| **Evolução SOAP** | Registro por atendimento; pré-preenchimento; comparação lado a lado | store |
| **Segurança** | Trava de faixa etária e peso, alergia por classe com reatividade cruzada, duplicidade e sobreposição na prescrição, duas vias para antimicrobianos | seguranca, medicamentos, paciente |
| **Neonatologia** | Protocolos do recém-nascido, limiares de fototerapia por hora de vida, reanimação, sepse neonatal | neonatal, medicamentos |
| **Notificação** | Agravos compulsórios separados por prazo, com dados da ficha pré-preenchidos pelo paciente e pelo atendimento | notificacao, paciente, atendimento |
| **Revisão clínica** | Lista os itens sinalizados nas bases e registra quem conferiu e quando | bases, store |
| **Dados** | Exportar/importar/apagar; cópia de segurança com lembrete; contagem das bases | store |

## Convenções de código
- Sem módulos ES (funciona em `file://`); namespaces `PED.util`, `PED.store`, `PED.calc`, `PED.data`, `PED.app`.
- Telas devolvem HTML como string; eventos via `data-act` (delegação) e `bindMain()`.
- Texto sempre escapado com `esc()`.
- Toda base clínica traz `fontes` e `atualizadoEm`; `verificar: true` marca itens a revisar.
