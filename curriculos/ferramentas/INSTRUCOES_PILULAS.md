# Pílulas de conhecimento — instruções comuns

App pessoal de estudos (Medicina/Residência, ENEM/vestibulares, Direito/OAB — português do Brasil). A nova seção "Estudar" mostra PÍLULAS: pequenas unidades de conhecimento (curiosidades, datas, pessoas, conceitos, macetes, pegadinhas de prova, comparações) feitas para APRENDER de verdade, não para entreter. O dono tem baixa visão: textos curtos, claros, sem poluição.

Método (baseado em evidência — Dunlosky 2013, prática de recuperação, espaçamento, elaboração, exemplos concretos):
1. O app mostra primeiro a PERGUNTA (o aluno tenta lembrar — recuperação/pré-teste).
2. Depois revela a RESPOSTA curta, o TEXTO (explicação) e o PORQUÊ (por que isso importa / como cai na prova / a conexão que faz lembrar — elaboração).
3. Opcional: EXEMPLO concreto. Quem "não sabia" vira flashcard com revisão espaçada.

Pasta: /tmp/claude-0/-home-user-Kiny-Painel/1a6e6749-2018-5b88-94f4-cc7b8d68edda/scratchpad/pilulas
Saída: <LOTE>.json (array JSON, UTF-8, ensure_ascii=False). Validador: `python3 validar_pilulas.py <LOTE>.json` → "OK — sem erros".
Temas válidos para ligar a pílula: `python3 cobertura.py medicina` e `python3 cobertura.py enem` (ids em tema=...). Direito não tem ids de tema (use tema null e area = ramo, ex. "Constitucional").

## Campos
- id: "pil-" + 8 hex (secrets.token_hex(4)); dominio: "medicina" | "enem" | "direito"
- tipo: curiosidade | data | pessoa | conceito | macete | pegadinha | comparacao (≥5 tipos no lote; nenhum > 35%)
- area: disciplina/especialidade/ramo legível (ex.: "Cardiologia", "História", "Penal"); tema: id válido ou null (ligue sempre que houver tema correspondente)
- titulo (≤70): nome curto e concreto ("Laennec e o primeiro estetoscópio")
- pergunta (≤170): pergunta de recuperação, respondível em uma frase, que faça pensar ("Por que Laennec enrolou um papel para auscultar uma paciente em 1816?")
- resposta (≤130): resposta direta à pergunta
- texto (≤480): explicação clara com o essencial (quem, o quê, quando, como, por quê)
- porque (≤240): por que importa / conexão com a prova ou a prática / gancho de memória
- exemplo (opcional, ≤240): caso ou aplicação concreta
- ano (inteiro, obrigatório para tipo data; a.C. negativo; pode usar em pessoa/curiosidade quando houver data central)
- pessoa (nome) e vida (ex.: "1781–1826"), obrigatórios para tipo pessoa

## Tipos (o que se espera)
- curiosidade: fato surpreendente MAS útil, que ancora um conceito cobrado (a origem de um nome, um experimento histórico, um paradoxo que explica o mecanismo).
- data: marco com ano, contexto e consequência (linha do tempo).
- pessoa: quem foi, contribuição principal, epônimo/obra e por que ainda importa.
- conceito: ideia-chave frequentemente cobrada, explicada de forma que não se esquece.
- macete: mnemônico/regra prática CORRETA e consagrada (não invente siglas duvidosas; explique o que cada letra significa).
- pegadinha: confusão clássica de prova ("parece X mas é Y") e como não cair.
- comparacao: X vs. Y em 2–3 diferenças decisivas.

## Rigor (obrigatório)
- Só fatos que você tem certeza; datas, nomes e atribuições conferidos. Se houver controvérsia histórica, diga "tradicionalmente atribuído" ou escolha outro fato. NÃO invente citações entre aspas de pessoas reais (paráfrase é ok). Sem estatísticas inventadas.
- Conteúdo educacional (não é orientação médica ou jurídica individual). Leis/diretrizes vigentes.
- Nada repetido: títulos e fatos distintos entre si.

## Como trabalhar
- Gere em partes com scripts Python com prefixo <LOTE>; não mexa em outros arquivos nem no repositório.
- Rode o validador e releia todas conferindo cada fato, data e nome.
- Relatório final curto: quantidade por tipo e área, e a lista de itens em que você teve qualquer dúvida factual.
