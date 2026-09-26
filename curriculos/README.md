# Gabarito Amazonas — sistema pessoal de estudos

App de estudo para **Medicina (UFAM, UEA e outras faculdades)** e **ENEM/vestibulares**, com Direito/OAB mantidos como trilhas extras. Sai como **um único arquivo** (`app.html`), sem servidor nem dependências obrigatórias. Aberto pelo link do Claude, sincroniza os dados na sua conta. Aberto direto do arquivo, guarda tudo no navegador.

## Estrutura

```
curriculos/
  app.html              ← GERADO pelo build (não editar)
  build_app.py          ← valida os dados e monta o app.html
  curriculos.py         ← guia de referência (CLI) — também embutido no app
  app/
    shell.html          ← casca HTML (topo, navegação, <main>)
    estilo.css          ← tokens de cor (claro/escuro) e componentes
    js/                 ← código, concatenado em ordem de nome
      01-base.js          utilidades (datas, texto, localStorage, CDN sob demanda)
      02-dados.js         catálogo: temas, especialidades, ENEM, questões, casos, instituições
      03-store.js         banco do usuário (documentos + sincronização + migração v1)
      04-estudo.js        regras: tentativas, caderno de erros, revisão espaçada, flashcards, desempenho, matrizes
      05-ia.js            assistente com contexto automático da página
      06-ui.js            roteador, layout, componentes e o player de questões compartilhado
      10-inicio.js … 23-busca.js   uma página/módulo por arquivo
      99-main.js          inicialização e contagem do tempo de estudo
  dados/
    instituicoes.json   ← faculdades (UFAM, UEA, FAMETRO, Nilton Lins, Afya) + fontes oficiais a importar
    grades/<id>.json    ← matrizes OFICIAIS (uma por instituição/curso/versão): UFAM Medicina 2025/2; demais pendentes
    medicina/mapa.json  ← Área → Especialidade → Tema (128 temas, subtemas, objetivos, resumo)
    medicina/casos.json ← casos clínicos educacionais
    enem/matriz.json    ← Área → Disciplina → Assunto → Subassunto (130 assuntos)
    enem/redacao.json   ← competências, o que zera, estrutura, propostas autorais, repertórios
  questoes/<trilha>.json ← banco de questões (enem, medicina, residencia, direito, oab)
  jogos/                ← conteúdo dos jogos (JSON gerado pelos gerar_*.py ao lado — edite o script, não o JSON)
  testes/               ← testes de navegador (Playwright)
```

Depois de editar qualquer arquivo de `app/`, `dados/`, `questoes/` ou `curriculos.py`:

```bash
python3 curriculos/build_app.py
```

O build **interrompe** se encontrar um erro: questão sem 5 alternativas distintas, gabarito inválido, tema inexistente, matriz com instituição não cadastrada, CH não numérica etc.

## Modelo de dados

### Conteúdo (versionado no repositório)

| Entidade | Onde | Relações |
|---|---|---|
| Institution | `dados/instituicoes.json` | 1—N Curriculum |
| Course | campo `curso` da matriz (`medicina`, `direito`) | — |
| Curriculum / CurriculumVersion | `dados/grades/<inst>-<curso>-<versao>.json` | `status`: pendente, importado ou validado; `fonte` com o documento de origem |
| AcademicPeriod | `periodos[]` da matriz | 1—N itens |
| Discipline / Module | `periodos[].itens[]` com `tipo` `disciplina` ou `modulo`, `codigo`, `nome`, `ch` (null se não constar) | N—N Topic (`temas[]`) |
| Unit | `itens[].unidades[]` | N—N Topic |
| Specialty | `mapa.json › areas[].especialidades[]` | N—N Topic |
| **Topic (Tema)** | `mapa.json › temas[]` e assuntos do ENEM | entidade central, usada por disciplinas, especialidades, questões, flashcards, casos, notas, materiais e revisões |
| Subtopic | `temas[].subtemas[]` | 1 tema |
| LearningObjective | `temas[].objetivos[]` (sugestão) e `unidades[].objetivos[]` (oficial, se importado) | — |
| Question | `questoes/*.json`, com `tema`, `subtema`, `especialidade`, `disciplina`, `dificuldade`, `fonte`, `ano` e `prova` | N—1 Topic |
| ClinicalCase | `dados/medicina/casos.json` | N—1 Topic, N—1 Specialty |
| Exam (formato de prova) | `FORMATO` em `18-simulados.js` | pesos por área |

Um tema como *Hipertensão arterial* existe **uma vez só**. As disciplinas e os módulos de cada matriz apontam para ele, assim como as especialidades.

### Dados do usuário (documentos em `data/users/<id>/…` na conta e `gab2:<doc>` no navegador)

| Documento | Conteúdo |
|---|---|
| `perfil` | faculdade, matriz, período atual, metas |
| `prog-<trilha>` | QuestionAttempt de cada questão: `n`, `ac`, histórico `[ts, resposta, certo, ms, origem]`, flags `m` (marcada) e `r` (revisar) |
| `erros` | caderno de erros: resposta, motivo (sugerido ou escolhido), comentário, flashcard e revisão espaçada |
| `cards` | Flashcard: frente, verso, tema, subtema, origem, dificuldade e SRS (etapa, facilidade, próxima data, histórico) |
| `revisoes` | Review de cada tema (SRS) |
| `dias` | StudySession diária: questões, acertos, segundos e temas estudados |
| `plano` | StudyPlan: data, disciplina, tema, minutos, nº de questões, revisão e se foi concluído |
| `simulados` | Simulation: histórico com acertos por área, tempo e filtros |
| `redacoes` | Essay: texto, autoavaliação e estimativa da IA por competência |
| `notas`, `materiais` | anotações e materiais por tema; PDFs no armazenamento do app |
| `questoes`, `casos` | questões e casos criados por você ou pela IA |
| `grades`, `instituicoes` | matrizes importadas ou editadas (cada item com `conferido`) e faculdades adicionadas |
| `academico` | Meu curso: situação de cada disciplina da matriz, notas, média final, faltas e as provas/trabalhos (com a revisão montada no `plano`) |
| `ajudas` | pedidos de correção/ajuda à IA (prova, trabalho, apresentação, pesquisa, resumo) e as respostas |
| `backups` | registro dos backups automáticos (não entra no próprio backup) |

**Revisão espaçada:** etapas de 1 → 7 → 30 → 90 dias; depois disso, o intervalo × a facilidade.

| Nota | Efeito |
|---|---|
| Errei | volta ao início |
| Difícil | repete a etapa com metade do intervalo |
| Bom | avança uma etapa |
| Fácil | pula uma etapa |

Na revisão de um tema, a nota vem do aproveitamento nas questões: menos de 50% = errei, menos de 70% = difícil, menos de 90% = bom, o resto = fácil.

## Como inserir a matriz oficial

1. **Pelo app** (recomendado): Medicina → UFAM (ou UEA) → **Importar matriz**.
   - Envie PDF, XLSX/CSV, DOCX ou TXT, ou cole o texto.
   - Escolha **Interpretar por regras** ou **Estruturar com IA**.
   - Revise a tabela e salve. A matriz entra como "Importada — conferir".
   - Em **Conferir com o documento**, marque item a item (ou o período inteiro) conforme o PDF. Só com tudo conferido o botão **Marcar matriz como validada** é liberado.
   - Na página da UFAM, os links oficiais têm o botão **Importar este documento**, que já preenche a fonte.
2. **Pelo repositório:** crie `dados/grades/ufam-medicina-<versao>.json` no formato abaixo e rode o build.

```json
{"id":"ufam-medicina-2025-2","instituicao":"ufam","curso":"medicina","versao":"PPC 2025/2","status":"importado",
 "fonte":{"tipo":"pdf","ref":"https://…","titulo":"PPC Medicina UFAM"},
 "periodos":[{"numero":1,"nome":"1º período","itens":[
   {"id":"anatomia-1","tipo":"disciplina","codigo":"XXX000","nome":"Nome exato do documento","ch":null,"temas":[],"unidades":[]}]}]}
```

Nunca preencha disciplina, CH ou período sem documento oficial. Sem dado, o app mostra "Dado curricular pendente de validação".

## Backup

- **Automático semanal:** na abertura do app, se o último backup tiver mais de 7 dias.
  - Na conta, grava um arquivo JSON no armazenamento do app.
  - Sem conta, guarda uma cópia neste navegador e mostra no Início um aviso para baixar.
- **Restaurar:** em Biblioteca → Dados. Antes de restaurar, o app salva o estado atual ("antes de restaurar").
- **Arquivos antigos:** só são apagados pelo botão "Apagar antigos (manter 4)".

## Testes

Precisam de Node e Playwright. Na raiz do repositório:

```bash
python3 curriculos/build_app.py
python3 -m http.server 8765 &
node curriculos/testes/fumaca.js     # 41 rotas em 390/768/1280 px: erros de JS e rolagem horizontal
node curriculos/testes/fluxos.js     # os 5 fluxos de estudo de ponta a ponta
node curriculos/testes/migracao.js   # migração do formato antigo e sincronização com a conta
node curriculos/testes/curso.js      # Meu curso: objetivo, situação, notas, faltas, provas com revisão, histórico
node curriculos/testes/humor.js      # Pausa para rir: cartão, sem repetição, foco no objetivo, esconder/religar
node curriculos/testes/jogos.js      # Jogos: os 5 jogos do começo ao fim, recorde, caderno de erros, foco no objetivo
node curriculos/testes/jornada.js    # Jornada (XP, níveis, missões, medalhas) e jogos novos: Caso do dia, Termo, Pares, Onde fica?
node curriculos/testes/simulacoes.js # Plantão no PS, Salve o paciente, Defesa, Cascata, Quem sou eu?, Rumo ao Milhão, Caça-palavras
node curriculos/testes/letras.js     # encaixe do texto: todas as telas, 360/390 px, letras Normal a Enorme (nada sai da caixa)
node curriculos/testes/etapa2.js     # mapa mental, erros em lote, backup semanal, conferência da matriz
```
