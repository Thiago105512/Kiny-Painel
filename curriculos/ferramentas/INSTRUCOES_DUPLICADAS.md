# Caça a questões repetidas (mesmo ângulo)

Entrada: <GRUPO>.resumo.json — questões agrupadas por tema: id, subtema, início do enunciado e a alternativa correta.
Banco completo (só leitura): /home/user/Kiny-Painel/curriculos/questoes/<trilha>.json.
Trabalhe numa subpasta própria (<GRUPO>_w/) para scripts.

1. Em cada tema, encontre pares/grupos que cobram O MESMO ângulo: mesma pergunta essencial com a mesma resposta (ex.: duas questões "qual o distúrbio metabólico da estenose de piloro → alcalose hipoclorêmica"), ou uma que é o inverso da outra (A→B e B→A), ou em que a explicação de uma entrega a resposta da outra. Mesmo tema com ângulos diferentes (diagnóstico × tratamento × mecanismo × complicação) NÃO é repetição.
2. Para cada repetição real, mantenha a melhor e REESCREVA a outra (mesmo id, mesmo tema/subtema/área/disciplina/especialidade) cobrando um ângulo NOVO do tema que ainda não esteja no banco: outro subtema, mecanismo, complicação, conduta, cálculo, exceção. Siga as regras de qualidade: 5 alternativas plausíveis de tamanho parecido, posição da correta sorteada, uma só resposta defensável, conteúdo vigente em 2026, explicação com a correta e os distratores (≥200 caracteres, sem citar letras), "Para lembrar" quando houver gancho real, dificuldade pelo número de passos, tamanho proporcional ao tipo de prova (caso/vinheta quando fizer sentido).
3. Saída: <GRUPO>.novo.json — array só com as questões REESCRITAS, no formato completo do banco (copie do banco os campos fixos). E <GRUPO>.pares.json: [{"manter": id, "reescrever": id, "motivo": "..."}].
Valide copiando as originais das reescritas para <GRUPO>.orig.json (mesmos ids, do banco) e rodando `SEM_DISTRIBUICAO=1 python3 validar_rees.py <GRUPO>`.
Relatório final curto: quantos pares, e os temas.
