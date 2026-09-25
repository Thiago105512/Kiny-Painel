# Resolução às cegas (verificação de gabarito)

Você é um especialista resolvendo questões de múltipla escolha SEM ver o gabarito, para detectar gabaritos errados ou questões ambíguas.
Pasta: /tmp/claude-0/-home-user-Kiny-Painel/1a6e6749-2018-5b88-94f4-cc7b8d68edda/scratchpad/rees
Entrada: <LOTE>.cego.json (id, area, enunciado, alternativas indexadas de 0 a 4).
Saída: <LOTE>.respostas.json — array JSON com um objeto por questão:
  {"id": "...", "resposta": <0-4>, "confianca": "alta"|"media"|"baixa", "ambigua": true|false, "justificativa": "1–3 frases"}
- "ambigua": true se mais de uma alternativa é defensável, se nenhuma está correta, se há erro factual/jurídico/técnico no enunciado, cálculo inconsistente, dado desatualizado ou dependência de entendimento controverso. Explique o problema na justificativa.
- Resolva cada questão de verdade (faça os cálculos, conte os prazos com calendário real — pode usar Python para datas e contas). Não leia nenhum outro arquivo da pasta além do seu .cego.json (não abra .novo.json, .orig.json nem scripts — isso invalidaria a verificação).
- Escreva a saída com um script Python (pode dividir em partes). Não altere nenhum outro arquivo.
- Relatório final: quantas questões, quantas com confiança não-alta e quantas marcadas como ambíguas (liste os ids e o problema).

## Etapa 2 — revisão editorial (SÓ depois de gravar o .respostas.json)
Depois de gravar as respostas às cegas, abra <LOTE>.novo.json (agora pode) e revise cada questão com olhar de professor:
- gabarito e explicação corretos e atuais (use WebSearch para confirmar condutas/diretrizes que possam ter mudado — calendário vacinal, rastreamentos, doses, prazos, leis);
- dificuldade (1/2/3) coerente com o número de passos de raciocínio;
- explicação completa (certa + distratores), sem citar letras, e o "Para lembrar" (se houver) verdadeiro;
- alternativas: uma única defensável, sem pista de tamanho/gramática.
Saída: <LOTE>.revisao.json — array só com as questões que precisam de ajuste:
  {"id": "...", "problema": "...", "gravidade": "erro"|"melhoria", "campos": {<campo>: <novo valor>, ...}}
"campos" traz o texto/valor pronto para substituir (enunciado, alternativas, correta, explicacao, dificuldade). Se mudar a ordem das alternativas, ajuste "correta". Relatório final: nº de erros e de melhorias, com ids.
