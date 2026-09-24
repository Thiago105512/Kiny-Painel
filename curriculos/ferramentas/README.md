# Ferramentas de conteúdo

Scripts e instruções usados para produzir e auditar o banco de questões e as pílulas de estudo.
Os scripts rodam dentro de uma pasta de trabalho (os lotes ficam lá); copie-os para essa pasta antes de usar.

| Arquivo | Para quê |
|---|---|
| `INSTRUCOES_NOVAS.md`, `validar_novas.py` (+ `validar_base.py`), `cobertura.py` | Criar questões novas: regras de formato, proporção de tamanhos por prova, níveis reais; `cobertura.py <trilha>` mostra os temas menos cobertos |
| `INSTRUCOES_REESCRITA.md`, `validar_rees.py`, `aplicar.py` | Reescrever lotes existentes mantendo ids e campos fixos; `aplicar.py` substitui no banco e roda o build |
| `VERIFICADOR.md`, `cegas.py` | Resolução às cegas: `cegas.py <lote>` gera o arquivo sem gabarito; `cegas.py <lote> comparar` aponta divergências e ambiguidades |
| `INSTRUCOES_PILULAS.md`, `validar_pilulas.py` | Pílulas de estudo (curiosidade, data, pessoa, conceito, macete, pegadinha, comparação) |
| `VERIFICADOR_PILULAS.md`, `aplicar_revisao.py` | Checagem de fatos das pílulas (com pesquisa na web) e aplicação das correções em `curriculos/pilulas/` |

Fluxo: gerar → validar → verificação independente (às cegas / checagem de fatos) → corrigir → integrar → `python3 curriculos/build_app.py` → testes em `curriculos/testes/`.
