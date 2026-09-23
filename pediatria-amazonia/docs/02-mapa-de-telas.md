# 2. Mapa de telas

Rotas do protótipo (`#/…`). Cada tela indica objetivo, conteúdo e ações.

| # | Rota | Tela | Conteúdo / ações |
|---|---|---|---|
| 1 | `#/` | Início | Blocos por intenção: **Atender agora** (Emergências, Começar por queixa, Acidentes, Pacientes), peso para cálculo, faixa compacta dos plantões (hoje e o próximo), queixas frequentes, **Consultar**, **Estudar** e **Registrar e organizar**. |
| 2 | `#/pacientes` | Lista de pacientes | Lista ordenada por atualização, chip "ativo", desmarcar ativo, novo. |
| 3 | `#/pacientes/novo` · `#/pacientes/:id/editar` | Cadastro | Nome, nascimento (idade automática), sexo, peso, altura, PC, IMC/SC calculados, prematuridade/IG, alergias, comorbidades, medicamentos em uso, internações, histórico vacinal, município, zona (urbana/rural/indígena/ribeirinha), responsável. |
| 4 | `#/pacientes/:id?tab=resumo` | Paciente – Resumo | Dados antropométricos calculados, alergias em destaque, atalhos para atendimento, SOAP e prescrição. |
| 5 | `?tab=atendimentos` | Paciente – Atendimentos | Histórico de fluxos de queixa salvos (queixa, sintomas, hipóteses, gravidade); reabrir. |
| 6 | `?tab=evolucao` | Paciente – Evolução SOAP | Lista de evoluções; nova; comparar as duas últimas lado a lado. |
| 7 | `?tab=prescricoes` | Paciente – Prescrições | Rascunhos e emitidas; nova. |
| 8 | `?tab=crescimento` | Paciente – Crescimento | Percentis aproximados (peso/idade, estatura/idade, PC/idade, IMC/idade, peso/estatura), marcos do desenvolvimento com alerta de atraso, registro de medidas seriadas. |
| 9 | `?tab=vacinas` | Paciente – Vacinas | Calendário vs. doses realizadas: feitas, pendentes, atrasadas; marcar dose com data. |
| 10 | `#/queixas` | Queixas | Grade de 45 queixas por grupo (febre, respiratório, GI, neurológico, geral, pele, urinário, acidentes, RN). |
| 11 | `#/queixas/:id` | Fluxo da queixa (8 etapas) | 1 Sintomas → 2 Contexto epidemiológico → 3 Sinais de gravidade → 4 Diferenciais → 5 Exames → 6 Protocolos → 7 Tratamento/doses → 8 Prescrição/registro. |
| 12 | `#/doencas` · `#/doencas/:id` | Doenças e protocolos | Lista por categoria; protocolo com 18 seções padronizadas, links para exames e medicamentos com cálculo. |
| 13 | `#/amazonia` | Amazônia | Doenças regionais em destaque, perguntas-chave de contexto, atalhos para emergências regionais. |
| 14 | `#/medicamentos` · `#/medicamentos/:id` | Medicamentos | Filtro; ficha completa; painel de dose (esquema + apresentação → mg → mL, máximos, fórmula), adicionar à prescrição. |
| 15 | `#/calculadoras` · `#/calculadoras/:id` | Calculadoras | 18 calculadoras com autopreenchimento do paciente ativo e fórmula exibida. |
| 16 | `#/emergencias` · `#/emergencias/:id` | Emergências | 14 protocolos: reconhecimento, passos, doses calculadas pelo peso, materiais, critérios de UTI. |
| 17 | `#/exames` · `#/exames/:id` | Exames | Biblioteca com referências por idade, quando solicitar e interpretação. |
| 18 | `#/vacinas` | Vacinas | Calendário PNI por idade e detalhes por vacina (situações especiais, atraso). |
| 19 | `#/crescimento` | Crescimento | Sinais vitais por idade, marcos, tabelas OMS. |
| 20 | `#/prescricao/nova` · `#/prescricao/:id` · `?print=1` | Prescrição | Itens editáveis (medicamento, dose, via, intervalo, horários, duração, orientações), confirmação obrigatória, impressão. |
| 21 | `#/evolucao/nova` · `#/evolucao/:id` | Evolução SOAP | Sinais vitais + S/O/A/P; pré-preenchida a partir do fluxo de queixa. |
| 22 | `#/neonatal` | Recém-nascido | Protocolos neonatais, limiares de fototerapia e exsanguineotransfusão por hora de vida, zonas de Kramer, reanimação em sala de parto com Apgar e tubo por peso, sepse neonatal. |
| 23 | `#/notificacao` · `#/notificacao/:id` | Notificação compulsória | 43 agravos separados entre imediatos (24 h) e semanais, com sistema, ficha, prazo e dados pré-preenchidos a partir do paciente e do atendimento. |
| 24 | `#/revisao` | Revisão clínica | Itens das bases sinalizados para conferência, com registro de quem conferiu e quando. |
| 25 | `#/unidades` | Unidades de saúde | 122 unidades de Manaus e do interior, filtradas por cidade, tipo e zona, com referências destacadas. |
| 26 | `#/violencia` · `#/violencia/:tipo` | Proteção | Oito tipos de violência, janelas de tempo das profilaxias, conduta em ordem, o que não fazer, obrigações legais e serviços de encaminhamento. |
| 27 | `#/aprender` | Aprender e explicar | Frases prontas para a família, informações sobre os municípios e perguntas de autoavaliação. |
| 28 | `#/entender` · `#/entender/:id` | Entender | 55 conceitos com o que é, por que acontece, o que muda na criança, quando preocupa, mitos e a frase para a família. Aparecem automaticamente nas queixas e nas doenças. |
| 29 | `#/acidentes` · `#/acidentes/:ferramenta` | Acidentes | 16 protocolos e as ferramentas: superfície queimada, PECARN, profilaxia da raiva e do tétano, agentes tóxicos. |
| 30 | `#/plantoes` · `/dia/:data` · `/novo` · `/:id` · `/agenda` · `/locais` | Plantões (planner) | Calendário do mês inteiro, com os plantões de cada dia por cor de local e as horas do dia, alternando com a lista; a tela de um dia mostra o que está marcado e lança ali; painel com horas, previsão, recebido e a receber; divisão por local e série de seis meses; agenda; locais com valores; planilha do mês; envio para a agenda do Google e arquivo .ics. É também o que abre na tela inicial. |
| 31 | `#/flashcards` · `#/flashcards/:baralho` | Flashcards | Baralhos (tudo, só condutas, só medicações, as marcadas para rever e um por emergência) e o cartão: pergunta sozinha, um toque mostra a conduta, outro mostra doses calculadas e diluição. Marcação sei/rever, embaralhar, teclado. |
| 32 | `#/config` | Dados | Profissional responsável (nome, especialidade, CRM, RQE – padrão: Dra. Catarina Ribeiro de Queiroz, Pediatra, CRM/AM 10.677, RQE 6.706), exportar/importar JSON, apagar, contagem das bases carregadas a sincronização opcional pelo Firebase, o espaço compartilhado entre duas pessoas (criar, convidar por e-mail, entrar por código) e a ligação com a agenda do Google. |

## Elementos globais
- **Barra superior**: logotipo, busca global (queixas, doenças, medicamentos, calculadoras, emergências, exames, vacinas, pacientes) e chip do paciente ativo (nome, idade, peso).
- **Menu inferior (celular)**: Início · Pacientes · Queixas · Doenças · Mais (Amazônia, Medicamentos, Calculadoras, Emergências, Exames, Vacinas, Crescimento, Dados).
- **Menu lateral (computador)**: todos os itens.
- **Rodapé de segurança**: aviso "ferramenta de apoio; não substitui a decisão médica" em todas as telas clínicas.
