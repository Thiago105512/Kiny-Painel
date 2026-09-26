# Auditoria completa de lote (questões nunca revisadas) — Medicina/Residência

App pessoal de estudo (pt-BR). A dona do app exige: questões **sem formulação errada, sem resposta errada, e nada mecânico, repetitivo, curto ou padronizado**. Você faz DUAS etapas, nesta ordem, na pasta do seu lote.

## Etapa 1 — resolução às cegas (siga VERIFICADOR.md, Etapa 1)
Leia só <LOTE>.cego.json e grave <LOTE>.respostas.json. Não abra outros arquivos antes de gravar.

## Etapa 2 — revisão editorial profunda (Modo C de INSTRUCOES_REVISAO3.md, com as regras extras abaixo)
Entrada <LOTE>.orig.json → saída <LOTE>.novo.json com TODAS as questões (mesmos ids, mesma ordem) + <LOTE>.mudancas.json.
Não mude: id, area, tema, subtema, disciplina, especialidade, fonte, ano, prova.

### 1. Correção absoluta (prioridade máxima)
- Toda questão em que sua resposta às cegas divergiu do gabarito, ou que você marcou ambígua/baixa confiança, deve ser investigada a fundo (WebSearch em diretrizes brasileiras/internacionais vigentes em 2026: MS/PCDT, SBC, SBD, SBP, FEBRASGO, SBPT, AHA/ACLS 2025, KDIGO, GOLD 2026, GINA, ADA etc.). Corrija gabarito, alternativas ou enunciado; se o tema for controverso, mude o ângulo para algo consensual.
- Conferir também as que você acertou: dado numérico, dose, ponto de corte, nomenclatura, epônimo, fisiologia. Nada inventado.
- Uma única alternativa defensável; distratores plausíveis mas inequivocamente errados.

### 2. Nada mecânico nem padronizado
O banco abusa de aberturas "Homem de 58 anos…/Mulher de 45 anos…" e de fechos "Qual é a conduta mais adequada?". Reescreva para variar como nas provas reais (UFAM, ENARE, USP, UNIFESP, SUS-SP):
- **Aberturas variadas**: cenário primeiro ("Na UBS ribeirinha…", "Durante o plantão no PS…", "Na visita domiciliar…", "No ambulatório de pré-natal…"), queixa primeiro ("Há três dias, …"), dado de exame primeiro, fala do paciente entre aspas, acompanhante que relata, encaminhamento/interconsulta, texto-base (trecho de diretriz, tabela, resultado de exame). Nomes fictícios ocasionais. Para ciências básicas, enunciados conceituais bem construídos também valem.
- **Fechos específicos** ligados ao raciocínio pedido: "Qual exame confirma o diagnóstico?", "Qual mecanismo explica a hipercalemia?", "O próximo passo, antes da alta, é…", "Qual achado torna a hipótese X improvável?", "A melhor explicação para a piora é…". Evite repetir o mesmo fecho dentro do lote (no máximo 3 vezes o mesmo).
- Tipos de raciocínio variados: diagnóstico, exame, conduta, mecanismo, complicação, prognóstico, prevenção, interpretação de exame, farmacologia, ética/saúde coletiva.
- Nada de "Assinale a alternativa correta" solto nem pergunta que se responde sem ler o caso.

### 3. Tamanho e profundidade
- Proporção de prova real: curtas (<200 car.) no máximo 15% do lote e só quando conceituais; a maioria com vinheta clínica de 250–700 caracteres com dados relevantes (sinais vitais, exame físico, exames) e 1–2 distratores clínicos plausíveis no próprio caso.
- Sem encher linguiça: todo dado do enunciado deve ter função (sustentar a resposta ou afastar um distrator).

### 4. Explicação e dificuldade
Como no Modo C: por que a correta está certa + por que cada distrator erra, sem citar letras; "Para lembrar: …" real e verificável em cerca de metade; dificuldade 1/2/3 coerente.

### 5. Validação
`SEM_DISTRIBUICAO=1 python3 /home/user/Kiny-Painel/curriculos/ferramentas/validar_rees.py <LOTE>` (rode na pasta do lote) → "OK — sem erros".
Relatório final curto: nº de questões, divergências às cegas (ids e desfecho), gabaritos alterados (ids e motivo), nº de enunciados reescritos para variar/aprofundar.
