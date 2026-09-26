# Revisão editorial de lote existente (Modo C) e casos em sequência (Modo S)

App pessoal de estudos (Medicina, Residência, ENEM, Direito, OAB — português do Brasil). A dona do app pediu revisão de tamanho, ordem, dificuldade, explicações e curiosidades.
Mantenha EXATAMENTE os ids e NÃO altere: id, area, tema, subtema, disciplina, areaEnem, especialidade, fonte, ano, prova.

## Modo C — REVISÃO EDITORIAL (lotes "-ed")
Entrada <LOTE>.orig.json → saída <LOTE>.novo.json com TODAS as questões do lote (alteradas ou não), mesma ordem.
Revise cada questão como professor(a) da área e corrija o que for preciso:
1. Gabarito e atualidade: uma única alternativa defensável; conteúdo vigente em 2026 (leis, súmulas, diretrizes, calendário vacinal, edital/estrutura do ENEM). Na dúvida sobre algo que pode ter mudado, confirme com WebSearch; se não der para confirmar, troque o ângulo da questão.
2. Pista de tamanho/gramática: a correta não pode ser visivelmente a mais longa nem a única que concorda com o comando.
3. Enunciado: se estiver seco demais para o que cobra, dê contexto (caso, situação, texto-base, dados) — respeitando a proporção real da prova: ENEM e OAB quase sempre com texto-base/caso; Residência com vinheta clínica; Direito (faculdade) pode ter questões diretas. Não encha linguiça.
4. Explicação: por que a correta está certa + por que cada distrator plausível erra; ≥200 caracteres; nunca cite letras (o app embaralha). Em cerca de metade, acrescente no fim "Para lembrar: …" com um gancho REAL e verificável (curiosidade histórica, origem de um termo, data, macete, comparação, pegadinha clássica).
5. Dificuldade (1/2/3) pelo número de passos de raciocínio (1 reconhecer; 2 aplicar/distinguir; 3 várias etapas, cálculo, exceção).
Validador: `SEM_DISTRIBUICAO=1 python3 validar_rees.py <LOTE>` → "OK — sem erros".
Grave também <LOTE>.mudancas.json: [{"id", "o_que_mudou": "gabarito|alternativas|enunciado|explicacao|dificuldade", "motivo": "..."}] só das questões alteradas (com "gabarito" quando a resposta correta mudou de conteúdo).

## Modo S — CASOS EM SEQUÊNCIA (lotes "-serie")
Questões NOVAS (siga também INSTRUCOES_NOVAS.md para formato, ids e validação com validar_novas.py). Cada caso vira 2 ou 3 questões encadeadas, como no Teste de Progresso e na residência:
- Campo extra em cada questão: "serie": "s-<6 hex>" (igual nas partes do mesmo caso), "parte": 1..N, "partes": N.
- Parte 1: caso completo (identificação, queixa, história, exame físico, exames iniciais) → pergunta de diagnóstico ou raciocínio inicial.
- Partes 2..N: começam com "(Continuação) " + um resumo de 1 frase do caso + a evolução/dados novos (resultado de exame, piora, resposta ao tratamento) → pergunta sobre exame, conduta, complicação, mecanismo ou prognóstico. Cada parte deve ser respondível sozinha, sem entregar a resposta da parte anterior de forma que a torne trivial.
- Pode incluir "imagem descrita em texto" (ECG, radiografia, lâmina, lesão de pele) com achados objetivos, como a prova descreveria.
