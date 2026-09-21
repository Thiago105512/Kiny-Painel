# 1. Arquitetura do sistema – PedAmazônia

## 1.1 Visão geral

PedAmazônia é um mini sistema de apoio à decisão clínica pediátrica voltado ao atendimento infantil no Amazonas. O MVP é uma **aplicação web responsiva sem backend** (HTML, CSS e JavaScript puros), instalável como PWA (Progressive Web App) e funcional offline, com persistência local no navegador. A arquitetura foi desenhada em camadas para permitir a evolução para um backend (API + banco relacional) e para um aplicativo nativo/híbrido sem reescrever as regras clínicas.

```
┌─────────────────────────────────────────────────────────────────┐
│  Camada de apresentação (app/index.html + css/styles.css)       │
│  • Roteador hash (#/rota)   • Menu inferior (celular)           │
│  • Barra lateral (desktop)  • Busca global   • Impressão        │
├─────────────────────────────────────────────────────────────────┤
│  Camada de aplicação (app/js/app.js)                            │
│  • Telas (views) por módulo   • Fluxo de queixa (8 etapas)      │
│  • Motor de diferenciais      • Painel de dose por peso         │
│  • Gerador de prescrição      • Evolução SOAP e comparação      │
├─────────────────────────────────────────────────────────────────┤
│  Camada de domínio (app/js/calculators.js, utils.js)            │
│  • 18 calculadoras   • Idade/IMC/SC   • Percentis OMS (aprox.)  │
├─────────────────────────────────────────────────────────────────┤
│  Camada de conhecimento clínico (app/js/data/*.js)              │
│  • doenças • medicamentos • queixas • sinais de gravidade       │
│  • contexto epidemiológico • emergências • exames • vacinas     │
│  • crescimento  → cada item com fontes e data de atualização    │
├─────────────────────────────────────────────────────────────────┤
│  Camada de persistência (app/js/store.js)                       │
│  • localStorage (MVP) → IndexedDB → API REST/PostgreSQL         │
│  • exportação/importação JSON                                   │
└─────────────────────────────────────────────────────────────────┘
```

## 1.2 Princípios de projeto

| Princípio | Como se materializa |
|---|---|
| Apoio, não substituição | Nenhuma tela emite diagnóstico. A saída é sempre "diagnósticos diferenciais a considerar", "compatível com", "avaliar", "confirmar conforme protocolo". |
| Segurança terapêutica | O sistema não inventa doses: só usa valores presentes na base (`medicamentos.js`, `emergencias.js`), cada um com `fontes` e `atualizadoEm`. Itens incertos recebem `verificar: true` e um selo visual. |
| Fórmula sempre visível | Toda dose ou cálculo mostra a fórmula utilizada (peso × mg/kg → mg → ÷ concentração → mL). |
| Simplicidade operacional | Sem build, sem dependências, sem servidor. Abre em qualquer navegador; funciona offline após o primeiro acesso. |
| Contexto amazônico embutido | O contexto epidemiológico (zona rural, ribeirinha, indígena, mata, água de rio, garimpo, açaí, malária prévia…) alimenta as regras de diferenciais. |
| Dados clínicos versionáveis | Bases em arquivos JS legíveis, revisáveis por médicos e auditáveis no git. |
| Evolução sem reescrita | Store com interface `upsert/where/byId` que espelha o esquema relacional em `docs/03-banco-de-dados.md`. |

## 1.3 Componentes

### Apresentação
- `index.html`: casca única (topbar com busca e "chip" do paciente ativo, `<main>`, menu lateral e menu inferior).
- `css/styles.css`: design system leve (tokens de cor, tiles, cards, chips, alertas, tabelas, formulários, impressão).
- `manifest.webmanifest` e `sw.js`: instalação como app e cache offline.

### Aplicação (`app.js`)
- **Roteador**: rotas declaradas com `route('/padrão/:param', fn)`; a função devolve HTML; `bindMain()` liga eventos após cada renderização; ações de clique usam `data-act` (delegação).
- **Estado**: `pacienteId` ativo (persistido), `atendimento` (rascunho do fluxo de queixa), `prescricaoDraft`.
- **Motor de diferenciais**: `diferenciais(queixa, atendimento)` aplica regras `{se:{sintomas, contexto}, hipoteses}`; regras específicas (com condição) reforçam a hipótese ("reforçada pelo contexto").
- **Painel de dose**: `painelDoseMed(med, peso)` calcula mg e mL a partir de esquema + apresentação, aplica máximos por dose/dia e alerta alergias do cadastro.
- **Prescrição**: rascunho acumulado a partir do fluxo/medicamentos → formulário editável → confirmação obrigatória → impressão.

### Domínio
- `calculators.js`: calculadoras declarativas (`campos` + `calc()`), autopreenchidas com peso/altura/idade/sexo do paciente ativo.
- `utils.js`: idade exata, faixa etária, IMC, SC (Mosteller), peso estimado, formatação pt-BR, escape de HTML.

### Conhecimento clínico (`js/data`)
Contratos documentados em `app/js/data/CONTRATO.md`. Todos os arquivos atribuem `PED.data.<nome>` e são carregados por `<script>` (sem módulos) para funcionar via `file://`.

### Persistência
- `store.js`: coleções `pacientes`, `atendimentos`, `evolucoes`, `prescricoes`, `vacinasRealizadas`, `medidas`, `prefs`. Exportação/importação JSON.

## 1.4 Roadmap técnico

| Fase | Entrega |
|---|---|
| MVP (atual) | Web app estático + PWA offline, dados locais, bases clínicas iniciais. |
| Fase 2 | Backend (Node/NestJS ou Django) + PostgreSQL (esquema em `docs/schema.sql`), autenticação, múltiplos profissionais, auditoria. |
| Fase 3 | App híbrido (Capacitor) reutilizando a mesma base; sincronização offline-first; z-score por LMS oficial. |
| Fase 4 | Integração com e-SUS/PEC, SINAN (notificações compulsórias: malária, dengue, leishmanioses, acidentes por animais peçonhentos). |

## 1.5 Segurança e LGPD (MVP)
- Dados ficam no dispositivo; recomenda-se uso em dispositivo pessoal com bloqueio de tela.
- Exportação manual (JSON) para backup; "Apagar tudo" na tela Dados.
- Evolução: criptografia local, login e trilha de auditoria na fase 2.
