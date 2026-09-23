# PedTudo – mini sistema médico pediátrico para o Amazonas

Ferramenta de **apoio acadêmico e clínico** para atendimento infantil no contexto amazônico: paciente → queixa → sintomas → contexto epidemiológico → sinais de gravidade → diagnósticos diferenciais → exames → protocolos → tratamento → medicações → prescrição → evolução.

> Não substitui a avaliação e a decisão médica. Nenhuma tela emite diagnóstico automático. Toda dose e conduta deve ser conferida em protocolos oficiais (Ministério da Saúde, SBP, OMS/OPAS) e bulas antes de prescrever.

**Médica responsável (padrão do sistema):** Dra. Catarina Ribeiro de Queiroz · Pediatra · CRM/AM 10.677 · RQE 6.706 — identificação impressa na prescrição e registrada na evolução; editável em *Dados › Profissional responsável*.

## Executar o protótipo

Não há build nem dependências.

```bash
# opção 1: abrir diretamente
xdg-open app/index.html      # ou clique duplo no arquivo

# opção 2: servir localmente (habilita PWA/offline)
cd app && python3 -m http.server 8080
# acesse http://localhost:8080
```

No celular, abra a URL e use "Adicionar à tela inicial" para instalar como app.

## Conteúdo do MVP

| Módulo | Quantidade |
|---|---|
| Flashcards de emergência (conduta, dose e diluição) | 130 |
| Medicações de emergência com preparo e diluição descritos | 65 |
| Queixas com fluxo guiado | 54 |
| Doenças com protocolo padronizado | 72 |
| Doenças com destaque amazônico | 24 |
| Medicamentos com cálculo por peso e nome comercial | 67 |
| Acidentes do dia a dia com protocolo | 16 |
| Agentes tóxicos com antídoto e conduta | 35 |
| Alternativas, segunda linha e off-label | 296 linhas, 733 opções |
| Calculadoras | 21 |
| Emergências com doses por peso | 14 |
| Exames com referências por idade | 39 |
| Vacinas do calendário nacional | 19 |
| Agravos de notificação compulsória | 43 |
| Unidades de saúde de Manaus e do interior | 159 |
| Municípios do Amazonas | 62 |
| Tipos de violência com protocolo | 8 |
| Sinais de gravidade e perguntas de contexto | 25 e 23 |
| Conceitos explicados na camada didática | 55 |
| Controle de plantões, horas e valores | ✔ |
| Mitos desfeitos com a correção | 146 |
| Perguntas de autoavaliação | 55 |
| Cadastro de pacientes, prescrição com confirmação, evolução SOAP | ✔ |

## Sincronizar entre aparelhos (opcional)

Sem configuração o aplicativo funciona só no navegador, como sempre. Com um projeto Firebase, os dados passam a acompanhar celular e computador e ganham cópia na nuvem. A mesclagem é feita registro a registro: vence a versão mais recente, as exclusões também viajam, e nenhum aparelho sobrescreve o outro em bloco. Instruções em [docs/10-firebase.md](docs/10-firebase.md).

Publicar no Firebase Hosting também dá ao aplicativo um endereço próprio e o funcionamento offline de verdade, que é o que importa no interior.

## Flashcards de emergência

Cada emergência vira cartões de estudo e de consulta rápida. **A pergunta aparece sozinha**: o quadro clínico, sem a resposta. Um toque mostra a conduta em ordem; outro toque mostra as doses — já calculadas para o peso — e **como diluir cada medicação**. Quem estuda tenta lembrar antes de virar; quem está na sala de emergência chega à dose em dois toques.

São 130 cartões: 14 de conduta (um por emergência) e 116 de medicação. Marcar "sei" ou "rever" alimenta um baralho só com o que ficou pela metade, e o progresso é pessoal de cada aparelho. No computador dá para estudar pelo teclado: espaço vira o cartão, as setas andam, `s` marca como sabido e `r` manda para a revisão.

O preparo (`app/js/data/preparo.js`) cobre 65 medicações de emergência com apresentação, passos da diluição, concentração final, velocidade de administração e os cuidados que evitam acidente — cada uma com fonte e data. Onde a concentração varia de hospital para hospital, o item diz isso com todas as letras em vez de inventar um número.

## Duas pessoas no mesmo aplicativo

Com um espaço compartilhado, duas pessoas veem e alteram o mesmo conteúdo, cada uma no seu aparelho e com a sua própria conta: o que uma lança aparece na outra em segundos. Cada registro guarda quem o fez, e o mês de plantões passa a mostrar a divisão por pessoa. Entrar num espaço exige o código **e** um convite para aquele e-mail — as regras de segurança que garantem isso são verificadas por um teste no emulador do Firestore. Passo a passo em [docs/10-firebase.md](docs/10-firebase.md).

## Agenda do Gmail

Os plantões vão para o calendário de duas formas: um arquivo `.ics`, que entra em qualquer agenda sem configuração nenhuma, ou a ligação direta com o Google, que cria e **atualiza** os eventos sozinha e ainda traz os compromissos já marcados na agenda para dentro do calendário do aplicativo. Instruções em [docs/11-google-agenda.md](docs/11-google-agenda.md).

## Plantões

Aba para registrar cada plantão e acompanhar o que entra no mês.

- **Locais de trabalho** com valor da hora ou valor fechado, carga habitual e dia de pagamento. Hapvida e CardioBaby já vêm cadastrados.
- **Lançamento em poucos toques**: local em botão, data digitada, entrada e saída aceitando 19 ou 1900, e a duração calculada na hora. Plantão noturno atravessa a meia-noite sem precisar avisar.
- **Situação de cada plantão**: previsto, realizado, faturado ou pago, com data de pagamento e valor recebido quando diferente do previsto.
- **Calendário do mês inteiro**, que é a primeira coisa que aparece ao abrir o aplicativo. Cada dia mostra os plantões por cor de local e as horas do dia; tocar num dia abre o que está marcado e permite lançar ali.
- **Painel do mês** com horas trabalhadas, previsão do total, quanto já foi recebido e quanto falta receber, mais a divisão por local e os últimos seis meses.
- **Agenda** dos plantões futuros, duplicação de um plantão para a semana seguinte e exportação da planilha do mês para a contabilidade.

## Uso rápido

O aplicativo foi feito para digitar o mínimo durante o atendimento.

- **Só o nome é obrigatório** no cadastro. Todo o resto pode ser preenchido depois, durante a consulta.
- **Datas são digitadas**, não escolhidas em calendário. Aceita 21092026, 210926 ou 21/09/2026.
- **A idade substitui a data de nascimento**. Digite 3a2m, 14m ou 20d e a data é calculada.
- **Toda pergunta tem resposta de um toque**, mais um campo Outros para observação livre.
- **Estado, cidade, zona e bairro são escolhidos**, com Amazonas e Manaus em primeiro lugar. O sistema traz 62 municípios, as sete zonas de Manaus e 122 unidades de saúde públicas e privadas.
- **Sexo, zona e prematuridade são botões**, não listas suspensas.
- **Na emergência o peso fica em destaque**, com atalhos de peso e estimativa por idade quando não há balança.

## Genérico e nome comercial

Cada medicamento mostra o genérico e as marcas comerciais, e a busca funciona nos dois sentidos. Digitar Benzetacil encontra a penicilina benzatina; digitar dipirona mostra Novalgina. Medicamentos distribuídos apenas pelo sistema público trazem essa informação, para não procurar em farmácia.

## Alternativas e off-label

Cada doença traz, além da primeira escolha, as alternativas em alergia, a segunda linha na falha terapêutica, o que fazer quando o medicamento não está disponível na comunidade, o que é usado off-label com a justificativa, e o que é comumente prescrito mas não recomendado.

## Proteção contra violência

Rastreio dentro do fluxo do atendimento, com oito tipos de violência. Ao marcar a suspeita, o aplicativo mostra as janelas de tempo das profilaxias, o que fazer em ordem, o que não fazer, as obrigações legais e para onde encaminhar. A suspeita já obriga a notificar, independentemente de confirmação ou de boletim de ocorrência.

## Acidentes do dia a dia

Dezesseis protocolos para o que enche o pronto-socorro pediátrico: queimadura, ingestão de medicamento, intoxicação doméstica, cáustico, pilha botão, engasgo, corpo estranho digestivo e nasal, afogamento, traumatismo cranioencefálico, queda, mordedura de cão, choque elétrico, ferimento cortocontuso, intoxicação por planta e por fumaça.

Com as ferramentas que a decisão exige na hora:

- **Superfície queimada por Lund-Browder**, que corrige a proporção maior da cabeça na criança, com Parkland, separação das primeiras oito horas, soma da manutenção hídrica e contagem a partir do horário da queimadura.
- **Quando tomografar no trauma de crânio**, com a regra PECARN separada para menores de 2 anos e para 2 anos ou mais.
- **Profilaxia da raiva** por tipo de exposição e condição do animal, e **profilaxia do tétano** por situação vacinal e tipo de ferimento.
- **35 agentes tóxicos** com dose tóxica, quadro, antídoto, indicação de carvão ativado e conduta, com busca por três letras.
- **27 condutas a nunca fazer**, começando por não provocar vômito em nenhuma intoxicação.

## Entender: a camada didática

Cada tela ensina. Ao abrir uma queixa, o aplicativo explica primeiro o que aquilo é. São 55 conceitos, de febre e infecção viral a sepse, escore-z, arbovirose e resistência antimicrobiana, cada um com cinco partes:

- **O que é**, com a definição precisa e os números que importam.
- **Por que acontece**, com o mecanismo fisiológico completo, sem diluir.
- **O que muda na criança**, e no lactente e no recém-nascido quando é o caso.
- **Quando preocupa**, com os sinais que mudam a conduta.
- **Mitos frequentes**, com a correção. São 146 pares, incluindo os que circulam entre profissionais: hemograma não decide vírus ou bactéria, proteína C reativa baixa não tranquiliza, pressão normal não exclui choque.

Cada conceito traz ainda a frase pronta para explicar à família, em palavras simples, com botão de copiar. A tela Entender reúne todos, com busca, e a busca global também os encontra.

## Aprender e explicar

Cada doença e cada medicamento trazem, ao final da tela e recolhidas para não atrapalhar, curiosidades e uma frase pronta para explicar à família em palavras simples. A tela Aprender reúne essas frases por assunto, informações sobre os municípios do Amazonas e perguntas para a médica se testar.

## Segurança da prescrição

O sistema confere automaticamente cada item antes da emissão e exibe o alerta na tela de dose e na prescrição:

- **Faixa etária e de peso** de cada esquema, extraída das bases. Exemplo: primaquina abaixo de 6 meses e doxiciclina abaixo de 8 anos são bloqueadas com pedido de confirmação.
- **Alergia por classe e princípio ativo**, com reatividade cruzada entre penicilinas e cefalosporinas e entre anti-inflamatórios e dipirona. Restrições dirigidas à gestante ou à lactante não geram alerta no paciente pediátrico.
- **Duplicidade de princípio ativo** na mesma prescrição e sobreposição com os medicamentos em uso do cadastro.
- **Antimicrobianos** são impressos em duas vias, conforme a RDC 20/2011.

Nenhum alerta impede a prescrição: ele pede confirmação explícita, e a decisão continua sendo da médica.

## Estado nutricional

O escore-z usa as tabelas oficiais da OMS (2006 e 2007) para peso/idade, estatura/idade, peso/estatura, IMC/idade e perímetro cefálico, com a classificação do SISVAN. Desnutrição aguda grave, baixa estatura e microcefalia aparecem com a conduta correspondente.

## Testes

```bash
cd pediatria-amazonia && node testes/testes.js
```

Cobrem as fórmulas das calculadoras, o escore-z contra valores conhecidos da OMS, as regras de segurança da prescrição e a integridade cruzada das bases.

## Documentação (entregáveis)
1. [Arquitetura](docs/01-arquitetura.md)
2. [Mapa de telas](docs/02-mapa-de-telas.md)
3. [Banco de dados](docs/03-banco-de-dados.md) · [schema.sql](docs/schema.sql)
4. [Fluxo de navegação](docs/04-fluxo-de-navegacao.md)
5. [Estrutura dos módulos](docs/05-modulos.md)
6. [Lista inicial de doenças](docs/06-doencas.md)
7. [Lista inicial de medicamentos](docs/07-medicamentos.md)
8. [Calculadoras](docs/08-calculadoras.md)
9. [Design da interface](docs/09-design-interface.md)
10. Protótipo funcional: [`app/`](app/)

## Segurança clínica
- Cada item das bases (`app/js/data/*.js`) traz `fontes` e `atualizadoEm`; itens incertos são marcados com `verificar: true` e recebem selo visual.
- A prescrição só é emitida após a marcação "Revisei e confirmo".
- Dados dos pacientes ficam apenas no navegador (localStorage); use Dados › Exportar para backup.

## Como revisar/atualizar o conteúdo clínico
Edite os arquivos em `app/js/data/` seguindo `app/js/data/CONTRATO.md` e atualize `atualizadoEm` e `fontes`. Valide com:

```bash
cd pediatria-amazonia/app && node -e "global.window=global;for(const f of ['utils','store','data/sinais-gravidade','data/contexto-epidemiologico','data/queixas','data/doencas','data/medicamentos','data/emergencias','data/exames','data/vacinas','data/crescimento','calculators'])require('./js/'+f+'.js');console.log(Object.keys(PED.data))"
```

## Licença e uso
Uso educacional e de apoio clínico. O conteúdo clínico deve ser revisado por profissional habilitado antes de uso assistencial.
