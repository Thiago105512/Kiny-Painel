# 10. Publicar no Firebase e sincronizar entre aparelhos

O aplicativo funciona sem nada disso: aberto de um arquivo ou de qualquer endereço, ele guarda tudo no próprio navegador. O Firebase resolve dois problemas concretos:

1. **Um endereço próprio, que funciona sem internet.** Publicado no Firebase Hosting, o Mucurinha vira um aplicativo instalável de verdade, com o cache offline funcionando. Isso importa no interior, onde o sinal falha.
2. **Os dados deixam de ficar presos em um navegador.** Com a sincronização ligada, pacientes, atendimentos, prescrições, evoluções e plantões passam a existir também na sua conta e acompanham celular e computador.

## Publicar

Uma vez, na sua máquina:

```bash
npm install -g firebase-tools
firebase login
cd pediatria-amazonia/app
firebase use --add            # escolha o seu projeto e dê o apelido "padrao"
firebase deploy --only hosting
```

O endereço sai no fim do comando, no formato `https://SEU-PROJETO.web.app`. Abra no celular e use "Adicionar à tela de início".

A cada atualização do aplicativo, repita apenas o `firebase deploy --only hosting`.

## Ligar a sincronização

1. No console do Firebase, em **Criação › Authentication**, ative o provedor **E-mail/senha**.
2. Em **Criação › Firestore Database**, crie o banco em modo de produção.
3. Publique as regras de segurança que acompanham o projeto:

```bash
firebase deploy --only firestore:rules
```

   O arquivo `app/firestore.rules` restringe tudo: cada conta só lê e grava os próprios dados, e nada fica público.

4. Em **Configurações do projeto › Seus aplicativos › Configuração do SDK**, copie o objeto de configuração.
5. No aplicativo, abra **Dados › Sincronização entre aparelhos**, cole a configuração, entre com e-mail e senha e toque em **Sincronizar agora**. O primeiro acesso com um e-mail novo já cria a conta.

Repita o passo 5 em cada aparelho, com o mesmo e-mail.

## Como a mesclagem se comporta

Cada registro carrega a data da última alteração. Ao sincronizar:

- vence a versão mais recente de cada registro, não o aparelho que sincronizou por último;
- exclusões viajam como marcas de remoção, então apagar no celular apaga no computador;
- um registro editado depois de ter sido apagado em outro aparelho volta, porque a edição é mais recente que a exclusão;
- nenhum aparelho sobrescreve o outro em bloco.

## Onde a sincronização não funciona

Dentro do visualizador de artefatos do claude.ai o acesso à rede é bloqueado, então a sincronização falha ali por projeto do ambiente, e o aplicativo avisa isso com todas as letras. Use o endereço do Firebase Hosting para sincronizar.

## Sobre os dados de pacientes

São dados de saúde de crianças. Três cuidados valem a pena:

- Use uma senha forte e exclusiva na conta do Firebase, e ative a verificação em duas etapas na conta Google que administra o projeto.
- Mantenha as regras de segurança deste repositório. Nunca abra o Firestore em modo de teste com prazo aberto.
- A exportação em **Dados › Exportar** continua sendo a cópia de segurança que não depende de ninguém.
