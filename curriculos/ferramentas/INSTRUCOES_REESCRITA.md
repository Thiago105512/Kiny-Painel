# Reescrita de questões — instruções comuns

Contexto: app pessoal de estudos (Medicina, Residência, ENEM, Direito, OAB — português do Brasil). O dono reclamou: "as perguntas não podem ser curtas, devem ter diversos graus de complexidade, contextos etc." Hoje os enunciados têm ~100–200 caracteres e quase não há questões difíceis. Você vai REESCREVER um lote.

Pasta: /tmp/claude-0/-home-user-Kiny-Painel/1a6e6749-2018-5b88-94f4-cc7b8d68edda/scratchpad/rees
Entrada: <LOTE>.orig.json → Saída: <LOTE>.novo.json (array JSON, UTF-8, ensure_ascii=False).
Validador: `python3 validar_rees.py <LOTE>` (rodar dentro da pasta) — deve terminar com "OK — sem erros". Corrija e repita até passar.

## Formato
- Mantenha EXATAMENTE os mesmos ids e NÃO altere: id, area, tema, subtema, disciplina, areaEnem, especialidade, fonte. Mantenha "ano"/"prova" como no original (não invente banca/ano).
- Pode reescrever: enunciado, alternativas, correta, explicacao, dificuldade. O assunto continua sendo o mesmo tema/subtema (pode aprofundar ou mudar o ângulo dentro dele).
- 5 alternativas distintas, plausíveis, de tamanho parecido (a correta não pode ser visivelmente a mais longa), sem "todas/nenhuma das anteriores". Posição da correta (0–4) equilibrada no lote.
- Explicação ≥ 200 caracteres: por que a correta está certa E por que os principais distratores estão errados. NUNCA cite letras ("alternativa B", "(C)") — o app embaralha as alternativas.
- TAMANHO PROPORCIONAL (atualização do dono do app: "não é obrigatório as perguntas serem grandes; use a proporcionalidade com sabedoria e estatística"). Os enunciados devem variar como nas provas reais da área — curtas (< 250 caracteres), médias (250–599) e longas (≥ 600) — nas proporções que o validador indica para a trilha do lote (ele imprime a distribuição e o alvo). O tamanho deve servir ao conteúdo: questão conceitual direta pode ser curta; caso clínico/caso concreto/texto-base pede mais. Tamanho NÃO define dificuldade: haja questões curtas difíceis e longas fáceis. Não encha linguiça para alongar. Use "\n\n" para separar texto-base/caso do comando (o app mostra as quebras de linha).
- Dificuldade: 1 Fácil (20–35% do lote), 2 Média (35–55%), 3 Difícil (20–35%). O nível tem de ser REAL:
  - Fácil: contexto curto e claro; reconhecimento direto de um conceito central.
  - Média: aplicar o conceito a uma situação, interpretar dados/texto, ou distinguir entre duas alternativas próximas.
  - Difícil: raciocínio em várias etapas, integração de 2+ conceitos, dados a calcular/interpretar, exceção à regra, pegadinha conceitual legítima, distratores muito próximos.
- Varie contextos e formatos: caso concreto, texto-base, dados/tabela em texto, situação do cotidiano, afirmativas I/II/III ("está correto o que se afirma em…"), asserção-razão, gráfico descrito em texto, cálculo etc. Não repita o mesmo molde em sequência.

## Conteúdo (obrigatório)
- Exatidão acima de tudo: cada gabarito deve estar inequivocamente correto e com apenas uma resposta defensável. Confira cálculos duas vezes. Se um ponto é controverso, desatualizado ou varia entre diretrizes/jurisprudência, escolha outro ângulo do mesmo tema.
- Não invente citações atribuídas a autores, obras, jornais ou instituições reais, nem estatísticas oficiais. Textos-base são de sua autoria (pode indicar "Texto elaborado para fins didáticos.") ou trechos de domínio público reproduzidos com exatidão (ex.: artigos de lei que você conhece literalmente). Dados numéricos de contexto devem ser claramente hipotéticos.
- Pessoas nos casos são fictícias. Conteúdo educacional (não é orientação de atendimento real nem consultoria jurídica).
- Não atribua as questões a bancas/provas reais — são autorais.

## Como trabalhar
- Escreva em partes com scripts Python que acumulam as questões (ex.: parte1.py, parte2.py… cada um fazendo append num arquivo intermediário <LOTE>.parcial.json; no fim, grave <LOTE>.novo.json), para não estourar a saída de uma única ferramenta. Não mexa em arquivos de outros lotes nem no repositório.
- Ao final, rode o validador e releia TODAS as questões conferindo gabarito por gabarito (imprima enunciado + alternativa correta), corrigindo o que estiver duvidoso.

## Relatório final (curto)
Distribuição de dificuldade, tamanho médio, e lista das questões em que você teve dúvida de gabarito ou escolheu uma diretriz/entendimento específico (com a referência), para revisão.
