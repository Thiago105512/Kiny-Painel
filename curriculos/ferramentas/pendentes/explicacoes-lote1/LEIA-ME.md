# Revisão de explicações — lote 1 (NÃO integrado ao app)

Revisão feita por professores (set/2026) seguindo `../../INSTRUCOES_EXPLICACOES.md`, pausada a pedido da dona do app antes da integração.

- `x1.orig.json` / `x2.orig.json`: as 200 questões como estavam (x1: cardiologia e anestesiologia; x2: cirurgia geral, um pouco de cardiologia e dermatologia).
- `x1.revisao.json` / `x2.revisao.json`: correções propostas — 75 no total (2 erros, 73 melhorias). Cada item: `id`, `problema`, `gravidade`, `campos` (texto novo completo).
- Erros: res-c5ce10eb (classificação de infarto pela Quinta Definição Universal, 2026) e res-1de200a6 (idade de risco na diretriz europeia de 2022).

Para integrar: questões com `enunciado`/`alternativas`/`correta` alterados precisam antes de nova resolução às cegas (`cegas.py`); depois aplicar os `campos` em `questoes/*.json`, rodar o build e os testes.
