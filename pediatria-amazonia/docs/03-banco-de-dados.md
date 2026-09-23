# 3. Banco de dados

O MVP persiste em `localStorage` (coleções JSON) por meio de `app/js/store.js`. O esquema abaixo é o **modelo relacional alvo** (PostgreSQL) para a fase 2; os nomes das coleções locais espelham as tabelas. O DDL completo está em `docs/schema.sql`.

## 3.1 Modelo entidade-relacionamento (resumo)

```
paciente 1───n atendimento 1───n atendimento_sintoma
   │               │ 1───n atendimento_contexto
   │               │ 1───n atendimento_gravidade
   │               │ 1───n atendimento_hipotese ──► doenca
   │               │ 1───n atendimento_exame ──► exame
   │               └ 1───n prescricao 1───n prescricao_item ──► medicamento
   ├───n evolucao (SOAP)
   ├───n medida (peso/altura/PC seriados)
   └───n vacina_realizada ──► vacina

Bases clínicas (referência, versionadas):
doenca, doenca_medicamento, medicamento, apresentacao, esquema_dose,
queixa, queixa_sintoma, regra_diferencial, sinal_gravidade,
contexto_pergunta, emergencia, emergencia_dose, exame, exame_referencia,
vacina, vacina_dose, marco_desenvolvimento, curva_oms, sinal_vital_ref, fonte
```

## 3.2 Tabelas transacionais

| Tabela | Campos principais |
|---|---|
| `paciente` | id, nome, data_nascimento, sexo, peso_kg, altura_cm, pc_cm, prematuro, ig_nascimento_sem, alergias, comorbidades, medicamentos_uso, internacoes, historico_vacinal, municipio, zona (urbana/rural/indigena/ribeirinha), responsavel, criado_em, atualizado_em |
| `atendimento` | id, paciente_id, queixa_id, notas, criado_em, profissional_id |
| `atendimento_sintoma` | atendimento_id, sintoma_id |
| `atendimento_contexto` | atendimento_id, pergunta_id, valor (bool/text) |
| `atendimento_gravidade` | atendimento_id, sinal_id |
| `atendimento_hipotese` | atendimento_id, doenca_id (nullable), nome_livre, ordem |
| `atendimento_exame` | atendimento_id, exame_id, solicitado (bool), resultado |
| `evolucao` | id, paciente_id, atendimento_id, data, peso, temp, fc, fr, sat, pa, s, o, a, p |
| `prescricao` | id, paciente_id, atendimento_id, confirmada, emitida_em, profissional, orientacoes_gerais, retorno |
| `prescricao_item` | id, prescricao_id, medicamento_id (nullable), medicamento, apresentacao, dose, via, intervalo, horarios, duracao, orientacoes, calculo, fonte |
| `medida` | id, paciente_id, data, peso_kg, altura_cm, pc_cm |
| `vacina_realizada` | id, paciente_id, vacina_id, dose_index, data, lote |
| `local_trabalho` | id, nome, cor_idx, forma (hora/fixo), valor_hora, valor_fixo, carga_horas, dia_pagamento, obs |
| `plantao` | id, local_id, data, inicio, fim, forma, valor_hora, valor_fixo, acrescimo, desconto, status (previsto/realizado/faturado/pago), data_pagamento, valor_pago, obs |

## 3.3 Tabelas de conhecimento clínico

| Tabela | Campos principais |
|---|---|
| `doenca` | id (slug), nome, categoria, amazonia, cid10, definicao, epidemiologia, agente, transmissao, incubacao, manifestacoes[], sinais_alarme[], criterios_diagnosticos[], classificacao_gravidade(json), tratamento[], criterios_internacao[], criterios_uti[], criterios_alta[], orientacoes[], retorno, prevencao[], fontes(json), atualizado_em |
| `doenca_medicamento` | doenca_id, medicamento_id, esquema |
| `medicamento` | id, nome, classe, indicacoes[], diluicao, infusao, contraindicacoes[], interacoes[], ajuste_renal, ajuste_hepatico, efeitos_adversos[], fontes, atualizado_em, verificar |
| `apresentacao` | id, medicamento_id, descricao, mg, ml, tipo, via, reconstituicao |
| `esquema_dose` | id, medicamento_id, indicacao, mg_kg_dose, mg_kg_dia, ml_kg_dose, vezes_dia, frequencia, via, dose_max_dose, dose_max_dia, duracao, faixa_etaria, obs, verificar |
| `queixa` | id, nome, grupo, icone, perguntas[], exames[], conduta_inicial[], fontes |
| `queixa_sintoma` | queixa_id, sintoma_id, nome |
| `regra_diferencial` | id, queixa_id, se_sintomas[], se_contexto[], hipoteses(json) |
| `sinal_gravidade` | id, nome, descricao, acao |
| `contexto_pergunta` | id, pergunta, tipo, opcoes[], tags[], porque |
| `emergencia` | id, nome, cor, reconhecimento[], passos[], materiais[], criterios_uti[], fontes |
| `emergencia_dose` | id, emergencia_id, nome, indicacao, mg_kg, unidade, dose_max, dose_fixa, por_gravidade(json), concentracao_mg_ml, apresentacao, via, repeticao, obs, verificar |
| `exame` | id, nome, categoria, descricao, quando_solicitar[], interpretacao[], fontes |
| `exame_referencia` | exame_id, faixa, valores |
| `vacina` / `vacina_dose` | id, nome, via, protege, situacoes_especiais, atraso_esquema / idade_meses, rotulo, dose |
| `marco_desenvolvimento` | idade_meses, dominio, marco, alerta |
| `curva_oms` | indice, sexo, chave (meses ou cm), p3, p15, p50, p85, p97 |
| `sinal_vital_ref` | faixa, min_meses, max_meses, fc_min, fc_max, fr_min, fr_max, pas_min, pas_max |
| `fonte` | id, nome, orgao (MS/SBP/OMS/OPAS/bula), ano, url |

## 3.4 Estrutura local (MVP)

```json
{
  "pacientes": [ { "id": "…", "nome": "…", "dataNascimento": "2022-03-10", "sexo": "F", "peso": 14, "altura": 96, "zona": "ribeirinha", "municipio": "Tefé", "alergias": "", "marcos": {"12|Anda com apoio": true} } ],
  "atendimentos": [ { "id": "…", "pacienteId": "…", "queixaId": "febre_calafrios", "sintomas": ["calafrios","cefaleia"], "contexto": {"zona":"ribeirinha","area_ribeirinha":true}, "gravidade": [], "hipoteses": [{"doencaId":"malaria","nome":"Malária"}], "examesSelecionados": ["gota_espessa"], "criadoEm": "…" } ],
  "evolucoes": [ { "id": "…", "pacienteId": "…", "data": "…", "peso": 14, "temp": 38.5, "s": "…", "o": "…", "a": "…", "p": "…" } ],
  "prescricoes": [ { "id": "…", "pacienteId": "…", "confirmada": true, "emitidaEm": "…", "itens": [ { "medicamento": "Paracetamol", "dose": "140 mg (7 mL de Solução oral 200 mg/mL…)", "via": "VO", "intervalo": "6/6 h", "horarios": "06h – 12h – 18h – 24h", "duracao": "se dor/febre", "calculo": "10 mg/kg × 14 kg" } ] } ],
  "vacinasRealizadas": [ { "pacienteId": "…", "vacinaId": "pentavalente", "doseIndex": 0, "data": "2022-05-10" } ],
  "medidas": [ { "pacienteId": "…", "data": "2026-09-21", "peso": 14, "altura": 96 } ],
  "prefs": { "pesoRapido": null, "ultimoPacienteId": "…", "profissional": { "tratamento": "Dra.", "nome": "Catarina Ribeiro de Queiroz", "especialidade": "Pediatra", "crm": "CRM/AM 10.677", "rqe": "RQE 6.706" } }
}
```
