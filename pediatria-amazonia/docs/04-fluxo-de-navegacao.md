# 4. Fluxo de navegação

## 4.1 Fluxo clínico principal

```
Início
  └─► Pacientes ─► Cadastro/seleção do paciente (idade, peso, zona)  ──┐
  └─► Queixas ──► Queixa principal                                      │
                     │ 1. Sintomas associados (toggles) + anamnese     │
                     │ 2. Contexto epidemiológico amazônico ◄──────────┘ (zona/município vêm do cadastro)
                     │ 3. Sinais de gravidade  ──► alerta vermelho ──► Emergências (doses por peso)
                     │ 4. Diagnósticos diferenciais a considerar (ordenados; "reforçada pelo contexto")
                     │ 5. Exames sugeridos (queixa + hipóteses) ──► biblioteca de exames (referências por idade)
                     │ 6. Protocolos das hipóteses (alarme, critérios, gravidade, internação)
                     │ 7. Tratamento: medicamentos do protocolo ──► painel de dose (peso → mg → mL) ──► "adicionar à prescrição"
                     └ 8. Registro: salvar atendimento ──► Prescrição (revisar + confirmar ──► imprimir) ──► Evolução SOAP
```

## 4.2 Fluxos secundários
- **Emergência direta**: Início → Emergências → informar peso → protocolo com doses calculadas.
- **Consulta rápida**: busca global → doença / medicamento / exame / calculadora.
- **Seguimento**: Paciente → Evolução SOAP → comparar últimas evoluções; Crescimento → medidas seriadas e percentis; Vacinas → pendências.
- **Amazônia**: aba dedicada → doença regional → protocolo → medicamentos com cálculo.

## 4.3 Regras de navegação
- O paciente ativo é lembrado entre sessões e alimenta peso, idade, sexo, altura e zona em todas as telas.
- Sem paciente, o "peso rápido" permite calcular doses (emergências, medicamentos, calculadoras) sem cadastro.
- O rascunho do fluxo de queixa permanece em memória ao navegar entre etapas; "Reiniciar fluxo" limpa.
- A prescrição só é emitida (impressão) após a marcação "Revisei e confirmo".
- Toda saída clínica traz fontes e data de atualização; itens com `verificar` recebem selo âmbar.
