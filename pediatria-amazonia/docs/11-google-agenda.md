# 11. Levar os plantões para a agenda do Gmail

Há dois caminhos, e o primeiro não exige configuração nenhuma.

## 1. Arquivo .ics (funciona em qualquer agenda)

Em **Plantões › Levar para a agenda do celular**, toque em **Arquivo deste mês (.ics)** ou em **Todos os próximos**. O arquivo baixado abre no Google Agenda, no Calendário do iPhone e no Outlook, e cada plantão vira um evento com o local, a duração, o valor e a situação.

É um retrato do momento: alterar um plantão no aplicativo depois disso não muda o evento já importado. Para isso existe o segundo caminho.

## 2. Ligação direta com o Google

Assim os eventos são criados e **atualizados** sozinhos, e os compromissos que já estão na sua agenda aparecem dentro do calendário do aplicativo, junto dos plantões.

Isso precisa de um ID de cliente OAuth, criado uma vez:

1. Abra o [console do Google Cloud](https://console.cloud.google.com/) com a mesma conta do Gmail e selecione (ou crie) um projeto — pode ser o mesmo projeto do Firebase.
2. Em **APIs e serviços › Biblioteca**, ative a **Google Calendar API**.
3. Em **APIs e serviços › Tela de permissão OAuth**, configure a tela: tipo **Externo**, nome do aplicativo (Mucurinha), e-mail de contato. Em **Usuários de teste**, acrescente o seu e-mail e o da outra pessoa — enquanto o aplicativo estiver como "em teste", só esses e-mails conseguem autorizar, o que para duas pessoas basta.
4. Em **Escopos**, inclua `https://www.googleapis.com/auth/calendar`.
5. Em **APIs e serviços › Credenciais › Criar credenciais › ID do cliente OAuth**, escolha **Aplicativo da Web**. Em **Origens JavaScript autorizadas**, informe exatamente o endereço de onde o aplicativo é aberto — por exemplo `https://seu-projeto.web.app` (e `http://localhost:8080`, se for testar na sua máquina). Não é preciso URI de redirecionamento.
6. Copie o ID gerado (termina em `.apps.googleusercontent.com`) e cole em **Dados › Agenda do Google**.
7. Toque em **Conectar à conta do Google**, autorize, escolha em qual agenda gravar e pronto.

### O que acontece depois

- **Enviar ao Google Agenda** cria os eventos do mês escolhido. Enviar de novo **atualiza** os mesmos eventos em vez de duplicar, porque cada plantão guarda o identificador do seu evento.
- Um plantão apagado no aplicativo some da agenda no próximo envio.
- **Mostrar os compromissos do Google** traz para o calendário do mês o que já está marcado na sua agenda (consultas, aula, compromisso pessoal), com um 📆 no dia e a lista ao abrir o dia. Esses compromissos são apenas exibidos: o aplicativo não os altera.
- Plantão noturno vira um evento que termina no dia seguinte; plantão sem horário vira evento de dia inteiro. O fuso é o de Manaus (UTC−4), gravado explicitamente no evento.

### Onde isso não funciona

- No visualizador de artefatos do claude.ai a rede é bloqueada: nem o Google nem o Firebase respondem ali. Use o endereço publicado.
- O Google recusa origens que não estejam na lista do passo 5. Se aparecer um erro de origem, é isso: o endereço de onde o aplicativo foi aberto precisa estar lá, letra por letra.

### Sobre privacidade

A autorização é dada diretamente ao Google, pelo navegador, e o token fica só na memória da aba — nada passa por servidor nosso, e nada de paciente vai para a agenda: os eventos levam apenas local, horário, valor e situação do plantão.
