# Revisão de explicações (professor) — Medicina/Residência

A revisão às cegas de set/2026 (158 questões) achou 100% dos gabaritos corretos, mas ~5% das explicações com
conduta desatualizada, dado impreciso ou "Para lembrar" fora do tema. Esta revisão passa o banco inteiro, por lotes,
com foco na EXPLICAÇÃO (sem descuidar do resto).

Entrada: <LOTE>.novo.json (questões completas). Saída: <LOTE>.revisao.json no formato do VERIFICADOR.md
([{"id","problema","gravidade":"erro"|"melhoria","campos":{campo: novo valor completo}}]; [] se nada).

Para cada questão, como professor exigente:
1. Resolva mentalmente antes de ler a explicação; se discordar do gabarito, investigue (WebSearch) e registre como erro.
2. Explicação: por que a correta está certa + por que cada distrator plausível erra; sem citar letras; nenhum dado
   inexato (doses, pontos de corte, epônimos, datas, mecanismos); diretriz citada deve ser a vigente em 2026
   (confira com WebSearch sempre que houver número, conduta, esquema ou ano que você não tenha certeza absoluta).
   Quando diretrizes divergem (brasileira × internacional), diga qual vale e por quê — e o enunciado deve deixar
   claro qual referência a questão cobra.
3. "Para lembrar": deve reforçar o conceito cobrado (não curiosidade solta, não repetir a primeira frase, não
   trazer tema de outra questão). Curiosidade histórica só se verdadeira e ligada ao ponto. Se não agrega, remova.
4. Enunciado e alternativas: só mexa se houver erro, ambiguidade, pista (tamanho/gramática, fecho que entrega a
   resposta) ou abertura/fecho padronizado repetido no lote. Se mexer, preserve o gabarito e o equilíbrio de
   tamanho das alternativas (a correta não pode virar a mais longa).
5. Frases longas demais (mais de ~35 palavras) viram duas — o app é lido no celular por aluna com baixa visão.
Não altere id, area, tema, subtema, especialidade, disciplina, fonte, ano, prova, familia, revisado.
Relatório final curto: nº de erros e melhorias (ids e motivo), fontes consultadas.
Questões com enunciado/alternativas/correta alterados passam por nova resolução às cegas antes de entrar.
