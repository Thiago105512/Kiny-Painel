# Luz — agente de apoio emocional

Um agente de IA no terminal para conversar nos dias difíceis, registrar o humor
e praticar pequenas ações que ajudam a sair da depressão (ativação comportamental,
TCC, respiração, rotina e autocompaixão).

> ⚠️ **Não substitui psicólogo, psiquiatra ou emergência.**
> Em crise: **CVV 188** (24h, gratuito, ou chat em https://cvv.org.br) · **SAMU 192**.
> Atendimento gratuito em saúde mental: **CAPS** e **UBS** (SUS) e clínicas-escola de psicologia.

## Versão web

Também existe uma versão para abrir no navegador, em `web/luz.html`, publicada
como artifact no Claude. Nela a memória fica guardada na sua conta.

## Como usar

```bash
cd agente_bem_estar
pip install -r requirements.txt
export ANTHROPIC_API_KEY="sua-chave"   # crie em https://console.anthropic.com
python3 agente.py
```

## Comandos

| Comando      | O que faz                                        |
|--------------|--------------------------------------------------|
| `/humor`     | registra como você está (0 a 10) e uma anotação  |
| `/historico` | mostra seus últimos registros em barras          |
| `/respirar`  | exercício guiado de respiração 4-7-8             |
| `/apoio`     | contatos de apoio (CVV, CAPS)                    |
| `/memoria`   | mostra, corrige ou apaga o que a Luz lembra      |
| `/nova`      | começa conversa nova (a memória continua)        |
| `/sair`      | encerra                                          |

A Luz lembra de você entre as sessões: a cada poucas mensagens ela atualiza
suas anotações (do que você gosta, pessoas importantes, o que ajudou, metas
combinadas), além da conversa recente e do histórico de humor. Os dados
ficam só no seu computador, em `~/.agente_bem_estar/` (mude com `AGENTE_DADOS`).
Para usar outro modelo, defina `AGENTE_MODELO`.
