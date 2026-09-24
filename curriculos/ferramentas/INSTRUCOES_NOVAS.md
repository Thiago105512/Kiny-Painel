# Questões NOVAS — instruções comuns

App pessoal de estudos (Medicina, Residência, ENEM, Direito, OAB — português do Brasil). Você vai CRIAR questões novas, inéditas, para ampliar o banco.

Pasta: /tmp/claude-0/-home-user-Kiny-Painel/1a6e6749-2018-5b88-94f4-cc7b8d68edda/scratchpad/novas2
- Veja o que existe: `python3 cobertura.py <trilha>` (temas/áreas com contagem, ids válidos e o formato de uma questão). Priorize os temas/áreas MENOS cobertos, espalhando por todos.
- Leia algumas questões do banco atual (/home/user/Kiny-Painel/curriculos/questoes/<trilha>.json) para NÃO repetir enunciados/ângulos já cobertos e para copiar o formato exato dos campos.
- Saída: <LOTE>.json (array JSON, UTF-8, ensure_ascii=False). Validador: `python3 validar_novas.py <LOTE>.json <trilha>` — deve terminar com "OK — sem erros".

## Formato
- id: prefixo da trilha (med-/res-/ene-/dir-/oab-) + 8 hex aleatórios (use secrets.token_hex(4)); campos iguais aos do banco: area, enunciado, alternativas[5], correta (0–4), explicacao, tema, subtema, especialidade (medicina/residência), disciplina, areaEnem (ENEM), dificuldade (1–3), fonte "autoral", ano null, prova null. Direito/OAB: tema e subtema null e disciplina igual a area (use as áreas existentes).
- 5 alternativas distintas e plausíveis, de tamanho parecido (a correta não pode ser visivelmente a mais longa), sem "todas/nenhuma das anteriores"; posição da correta equilibrada.
- Explicação ≥ 200 caracteres: por que a correta está certa E por que os principais distratores estão errados; NUNCA cite letras (o app embaralha); cite a diretriz/artigo/súmula quando houver.
- TAMANHO PROPORCIONAL ao perfil real da prova (o validador mostra o alvo: curtas <250, médias 250–599, longas ≥600). O tamanho serve ao conteúdo; não encha linguiça. Tamanho não define dificuldade (inclua curtas difíceis e longas fáceis). Use "\n\n" entre texto-base/caso e o comando.
- Dificuldade REAL: 1 Fácil 20–35% (reconhecer conceito central), 2 Média 35–55% (aplicar/interpretar/distinguir próximas), 3 Difícil 20–35% (várias etapas, integração, cálculo, exceção, distratores muito próximos).
- Varie formatos: caso concreto/vinheta, texto-base, dados/tabela em texto, afirmativas I/II/III, asserção-razão, cálculo, gráfico descrito, comparação de dois textos.

## Conteúdo (obrigatório)
- Exatidão acima de tudo; uma única resposta defensável. Confira cálculos e datas com Python (calendário real). Evite pontos controversos, desatualizados ou que variam entre diretrizes; nada que dependa de feriado/ponto facultativo incerto.
- Nada de citações inventadas atribuídas a pessoas/obras/instituições reais nem estatísticas oficiais falsas; textos-base de sua autoria ("Texto elaborado para fins didáticos.") ou domínio público reproduzido com exatidão. Dados de contexto claramente hipotéticos. Pessoas fictícias. Não atribua a bancas reais.
- Conteúdo educacional (não é orientação de atendimento real nem consultoria jurídica).

## Como trabalhar
- Gere em partes com scripts Python (prefixo <LOTE>) para não estourar a saída de uma ferramenta; não mexa em outros arquivos nem no repositório.
- Rode o validador até passar e releia todas conferindo gabarito por gabarito.
- Relatório final curto: quantidade, distribuição (níveis/tamanhos), temas cobertos, e as questões em que escolheu diretriz/entendimento específico.
