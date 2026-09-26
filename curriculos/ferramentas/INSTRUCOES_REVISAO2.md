# Revisão do banco — ampliação de questões curtas e ajuste de alternativas

App pessoal de estudos (Medicina, Residência, ENEM, Direito, OAB — português do Brasil). A dona do app reclamou que "há muitas questões muito curtas" e pediu revisão de tamanho, ordem, dificuldade e explicações.
Pasta de trabalho: a indicada no seu pedido. Entrada: <LOTE>.orig.json → Saída: <LOTE>.novo.json (array JSON, UTF-8, ensure_ascii=False).
Mantenha EXATAMENTE os mesmos ids e NÃO altere: id, area, tema, subtema, disciplina, areaEnem, especialidade, fonte, ano, prova.

## Modo A — AMPLIAÇÃO (lotes "-amp")
São as questões mais curtas do banco (≈160 caracteres, estilo "definição"). Reescreva cada uma no estilo das boas provas (Teste de Progresso, provas de faculdade, residência; em Direito, provas de faculdade/OAB):
- Mesmo tema/subtema e o MESMO conceito central, mas cobrado DENTRO de um contexto: caso clínico com idade, queixa, tempo de evolução, exame físico e exames (valores com unidades e referência quando necessário); situação de laboratório/experimento; caso concreto jurídico com datas, partes e fatos; texto-base autoral; dados ou tabela em texto.
- Inspirações de formato (varie, não repita em sequência): vinheta clínica → "qual o diagnóstico mais provável / próximo passo / mecanismo"; correlação básico-clínica ("o fármaco que causou isso atua em…"); interpretação de exame (gasometria, hemograma, espirometria, ECG descrito, LCR); cálculo com dados do caso; afirmativas I–IV; asserção-razão; "paciente evoluiu com X — qual complicação explica"; sequência de condutas; em Direito, caso com prazos contados em calendário real, "à luz do CC/CPC/CF, é correto afirmar".
- Tamanho: ALVO do lote ≈ 0–12% curtas (<250), 55–78% médias (250–599), 18–35% longas (≥600). Só fica curta a questão que genuinamente não ganha nada com contexto. Não encha linguiça: todo dado do caso deve servir ao raciocínio (inclusive dados que descartam distratores).
- Dificuldade REAL pelo número de passos de raciocínio (1 = reconhecer; 2 = aplicar/distinguir; 3 = integrar várias etapas, calcular, exceção). Reclassifique: com contexto, muitas sobem de 1 para 2. Distribuição do lote: fácil 20–35%, média 35–55%, difícil 20–35%.
- Validador: `ALVO="0,.12;.55,.78;.18,.35" python3 validar_rees.py <LOTE>` → "OK — sem erros".

## Modo B — AJUSTE (lotes "-aj")
São questões boas em que a alternativa correta está visivelmente mais longa que as outras (dá pista). Mantenha o enunciado (só corrija se houver erro) e:
- Ajuste as alternativas para tamanhos parecidos: encurte a correta sem perder a precisão e/ou deixe os distratores tão específicos quanto ela. Pode manter a posição da correta.
- Revise a explicação: cobre por que a correta está certa e por que cada distrator plausível erra; acrescente "Para lembrar: …" quando houver um gancho de memória real (epônimo, data, macete). Confira se a conduta continua atual em 2026.
- Confira a dificuldade (1/2/3) pelo número de passos.
- Validador: `SEM_DISTRIBUICAO=1 python3 validar_rees.py <LOTE>` → "OK — sem erros".

## Regras comuns
- 5 alternativas distintas e plausíveis, do mesmo tipo gramatical, sem "todas/nenhuma das anteriores". No Modo A, sorteie a posição da correta com random.shuffle (sem ciclo previsível).
- Explicação ≥ 200 caracteres, nunca cite letras (o app embaralha). Em cerca de metade, termine com "Para lembrar: …" (fato verdadeiro e verificável).
- Exatidão acima de tudo; uma única resposta defensável; condutas vigentes em 2026 (se mudou há pouco e você não tem certeza, escolha outro ângulo). Pessoas fictícias; nada de citação inventada; conteúdo educacional.
- Trabalhe em partes com scripts Python; não mexa em outros lotes nem no repositório. Ao final, releia gabarito por gabarito.
- Relatório final curto: distribuição de tamanho e dificuldade e as questões em que escolheu diretriz/entendimento específico.
