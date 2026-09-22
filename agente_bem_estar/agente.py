"""
Agente de apoio emocional (bem-estar) no terminal, usando a API do Claude.

Não substitui psicólogo ou psiquiatra. Contatos de apoio: comando /apoio.
"""

import json
import os
import sys
from datetime import datetime
from pathlib import Path

try:
    import anthropic
except ImportError:
    print("Instale a dependência primeiro:  pip install -r requirements.txt")
    sys.exit(1)

MODELO = os.environ.get("AGENTE_MODELO", "claude-opus-5")
PASTA_DADOS = Path(os.environ.get("AGENTE_DADOS", Path.home() / ".agente_bem_estar"))
ARQ_HUMOR = PASTA_DADOS / "humor.json"
ARQ_CONVERSA = PASTA_DADOS / "conversa.json"
ARQ_MEMORIA = PASTA_DADOS / "memoria.json"
MAX_MENSAGENS_SALVAS = 40
RESUMIR_A_CADA = 3  # mensagens da pessoa entre uma atualização da memória e outra

CONTATOS_APOIO = """
Contatos de apoio:
  • CVV: ligue 188 (24h, gratuito) ou chat em https://cvv.org.br
  • SAMU: 192
  • CAPS e UBS da sua cidade: atendimento gratuito em saúde mental (SUS)
"""

LEMBRETE_APOIO = (
    "\n(Se estiver pesado demais agora, o CVV atende 24h pelo 188 ou em cvv.org.br. "
    "A Luz continua aqui com você.)\n"
)

PALAVRAS_RISCO = (
    "me matar", "suicid", "tirar minha vida", "tirar a minha vida",
    "não quero mais viver", "nao quero mais viver", "quero morrer", "me machucar", "me cortar",
)

SISTEMA = """Você é "Luz", uma companhia de apoio emocional em português do Brasil. \
Você conversa com uma pessoa que está lidando com depressão e quer se sentir melhor e \
retomar a própria vida.

Quem é a pessoa para você: alguém inteiro, com história, interesses, relações, planos e \
qualidades, não um "caso" ou um risco a ser gerenciado. Tenha curiosidade genuína por ela: \
do que ela gosta ou já gostou, o que dá sentido à vida dela, quem é importante, o que está \
funcionando, mesmo que pouco.

Como você age:
- Acolha primeiro. Valide o que a pessoa sente sem julgar e sem pressa de "consertar".
- Fale de forma calorosa, simples e natural, como uma boa amiga que entende do assunto. \
Respostas curtas (2 a 6 frases), a não ser que a pessoa peça mais. No máximo uma pergunta por vez.
- Tristeza, cansaço, desânimo, choro, "não aguento mais" ou "estou mal" fazem parte da \
depressão e merecem acolhimento e conversa, não alarme. Não fale de suicídio, crise ou \
números de emergência a menos que a própria pessoa traga esse assunto.
- Ajude de forma prática quando fizer sentido: uma pequena ação concreta para hoje, \
perguntas gentis para olhar pensamentos muito duros de outro ângulo, respiração, sono, \
rotina, sol, movimento, contato com pessoas, retomar algo que a pessoa gostava, \
autocompaixão, pequenas vitórias.
- Celebre qualquer avanço, por menor que seja, e lembre a pessoa dos progressos que \
aparecem no registro de humor.
- Quando for natural na conversa, e sem repetir toda hora, incentive o cuidado com um \
profissional (psicólogo, psiquiatra, CAPS/UBS pelo SUS, clínicas-escola de psicologia \
gratuitas ou de baixo custo). Não faça diagnósticos nem indique remédios.

Só se a pessoa falar claramente em se matar, se machucar ou não querer mais viver: \
continue calorosa e presente, pergunte com cuidado se ela está segura agora e mencione \
uma vez o CVV (188, 24h, gratuito, ou chat em cvv.org.br) e chamar alguém de confiança. \
Depois siga a conversa normalmente, com a pessoa, e não em cima do assunto."""


def carregar(arquivo, padrao):
    try:
        return json.loads(arquivo.read_text(encoding="utf-8"))
    except (FileNotFoundError, json.JSONDecodeError):
        return padrao


def salvar(arquivo, dados):
    PASTA_DADOS.mkdir(parents=True, exist_ok=True)
    arquivo.write_text(json.dumps(dados, ensure_ascii=False, indent=2), encoding="utf-8")


def tem_sinal_de_risco(texto):
    texto = texto.lower()
    return any(p in texto for p in PALAVRAS_RISCO)


def resumo_humor(registros, ultimos=10):
    if not registros:
        return "A pessoa ainda não registrou o humor."
    linhas = [f"- {r['data']}: {r['nota']}/10" + (f" — {r['nota_texto']}" if r.get("nota_texto") else "")
              for r in registros[-ultimos:]]
    media = sum(r["nota"] for r in registros[-ultimos:]) / len(registros[-ultimos:])
    return "Registro de humor recente (0 = péssimo, 10 = ótimo):\n" + "\n".join(linhas) + f"\nMédia: {media:.1f}"


PEDIDO_MEMORIA = """Você cuida das anotações de memória da "Luz", uma companhia de apoio \
emocional, sobre a pessoa com quem ela conversa. Essas anotações permitem que a Luz continue \
de onde parou em vez de recomeçar do zero.

Atualize as anotações atuais com o que for importante na conversa recente. Guarde, quando \
aparecer: como a pessoa gosta de ser chamada; pessoas importantes; interesses e coisas de que \
gosta ou gostava; rotina, trabalho ou estudo; o que está pesando agora; o que ajudou e o que \
não ajudou; metas e pequenas tarefas combinadas e se foram feitas; conquistas; se faz \
acompanhamento profissional ou toma remédio.

Regras: tópicos curtos, em português, no máximo 1500 caracteres. Mantenha o que continua \
válido, atualize o que mudou e remova o que ficou velho. Não invente nada. Não guarde \
detalhes de crise além de uma linha neutra, se necessário. Responda só com as anotações.

Anotações atuais:
{memoria}

Conversa recente:
{conversa}"""


def texto_memoria(memoria):
    if memoria.get("texto"):
        return ("Suas anotações sobre a pessoa, de conversas anteriores "
                "(use com naturalidade, sem recitar):\n" + memoria["texto"])
    return "Vocês ainda não se conhecem bem: aos poucos, com leveza, procure conhecer a pessoa."


def atualizar_memoria(cliente, memoria, mensagens, pendentes):
    recente = mensagens[-2 * max(pendentes, 4):]
    conversa = "\n".join(("Pessoa: " if m["role"] == "user" else "Luz: ") + m["content"] for m in recente)
    if not conversa:
        return memoria
    try:
        resposta = cliente.messages.create(
            model=MODELO,
            max_tokens=2000,
            output_config={"effort": "low"},
            messages=[{"role": "user", "content": PEDIDO_MEMORIA.format(
                memoria=memoria.get("texto") or "(nenhuma ainda)", conversa=conversa)}],
        )
    except anthropic.APIError:
        return memoria
    texto = "".join(b.text for b in resposta.content if b.type == "text").strip()
    if resposta.stop_reason == "refusal" or not texto:
        return memoria
    memoria = {"texto": texto[:4000], "atualizado": datetime.now().strftime("%d/%m/%Y %H:%M")}
    salvar(ARQ_MEMORIA, memoria)
    return memoria


def editar_memoria(memoria):
    print("\nO que a Luz lembra de você:\n")
    print(memoria.get("texto") or "(nada ainda — as anotações aparecem depois de algumas mensagens)")
    print("\nDigite um novo texto para substituir (termine com uma linha só com '.'),")
    print("'apagar' para apagar tudo, ou Enter para manter como está.")
    primeira = input("> ").strip()
    if not primeira:
        print()
        return memoria
    if primeira.lower() == "apagar":
        memoria = {"texto": "", "atualizado": ""}
        salvar(ARQ_MEMORIA, memoria)
        print("Memória apagada.\n")
        return memoria
    linhas = [primeira]
    while (linha := input("> ")) != ".":
        linhas.append(linha)
    memoria = {"texto": "\n".join(linhas).strip()[:4000], "atualizado": datetime.now().strftime("%d/%m/%Y %H:%M")}
    salvar(ARQ_MEMORIA, memoria)
    print("Salvo.\n")
    return memoria


def registrar_humor(registros):
    try:
        nota = int(input("De 0 (péssimo) a 10 (ótimo), como você está agora? ").strip())
        if not 0 <= nota <= 10:
            raise ValueError
    except ValueError:
        print("Tudo bem, pode tentar de novo com um número de 0 a 10.\n")
        return None
    texto = input("Quer anotar algo sobre o dia? (Enter para pular) ").strip()
    registro = {"data": datetime.now().strftime("%d/%m/%Y %H:%M"), "nota": nota, "nota_texto": texto}
    registros.append(registro)
    salvar(ARQ_HUMOR, registros)
    print("Registrado. Obrigado por cuidar de você. 💛\n")
    return registro


def mostrar_historico(registros):
    if not registros:
        print("Nenhum registro ainda. Use /humor para começar.\n")
        return
    for r in registros[-14:]:
        barra = "█" * r["nota"] + "░" * (10 - r["nota"])
        extra = f"  {r['nota_texto']}" if r.get("nota_texto") else ""
        print(f"{r['data']}  {barra} {r['nota']:>2}{extra}")
    print()


def responder(cliente, mensagens, registros, memoria):
    sistema = [
        {"type": "text", "text": SISTEMA, "cache_control": {"type": "ephemeral"}},
        {"type": "text", "text": texto_memoria(memoria) + "\n\n" + resumo_humor(registros)},
    ]
    print("\nLuz: ", end="", flush=True)
    with cliente.beta.messages.stream(
        model=MODELO,
        max_tokens=4000,
        system=sistema,
        messages=mensagens,
        output_config={"effort": "medium"},
        # Se o modelo principal recusar, a API tenta automaticamente um modelo alternativo.
        betas=["server-side-fallback-2026-07-01"],
        extra_body={"fallbacks": "default"},
    ) as stream:
        for texto in stream.text_stream:
            print(texto, end="", flush=True)
        final = stream.get_final_message()
    print("\n")

    if final.stop_reason == "refusal":
        print("(Não consegui responder a isso. Pode tentar dizer de outro jeito?)\n")
    texto = "".join(b.text for b in final.content if b.type == "text")
    return texto or "Estou aqui com você."


AJUDA_COMANDOS = """Comandos:
  /humor      registrar como você está (0 a 10)
  /historico  ver seus últimos registros de humor
  /apoio      contatos de apoio (CVV, CAPS)
  /respirar   exercício rápido de respiração
  /memoria    ver, corrigir ou apagar o que a Luz lembra de você
  /nova       começar conversa nova (a Luz continua lembrando de você)
  /sair       encerrar
"""


def respirar():
    import time
    print("\nVamos respirar juntos: 4 segundos inspirando, 7 segurando, 8 soltando.\n")
    for ciclo in range(1, 4):
        for fase, segundos in (("Inspire pelo nariz", 4), ("Segure", 7), ("Solte pela boca", 8)):
            print(f"  [{ciclo}/3] {fase}...", end="", flush=True)
            time.sleep(segundos)
            print(" ✓")
    print("\nMuito bem. Como está seu corpo agora?\n")


def main():
    cliente = anthropic.Anthropic()
    registros = carregar(ARQ_HUMOR, [])
    conversa = carregar(ARQ_CONVERSA, {})
    if isinstance(conversa, list):  # formato antigo
        conversa = {"mensagens": conversa, "pendentes": 0}
    mensagens = conversa.get("mensagens", [])
    pendentes = conversa.get("pendentes", 0)
    memoria = carregar(ARQ_MEMORIA, {"texto": "", "atualizado": ""})
    avisou_apoio = False

    def guardar_conversa():
        salvar(ARQ_CONVERSA, {"mensagens": mensagens, "pendentes": pendentes})

    print("═" * 60)
    print("  Luz — seu agente de apoio emocional 💛")
    print("  Não substitui ajuda profissional.")
    print("═" * 60)
    print(AJUDA_COMANDOS)

    if mensagens:
        print("(Continuando a nossa última conversa.)\n")
    elif memoria.get("texto"):
        print("Luz: Oi de novo. Que bom te ver por aqui. Como você está hoje?\n")
    else:
        print("Luz: Oi. Que bom que você está aqui. Como você está se sentindo hoje?\n")

    while True:
        try:
            entrada = input("Você: ").strip()
        except (EOFError, KeyboardInterrupt):
            entrada = "/sair"

        if not entrada:
            continue
        comando = entrada.lower()
        if comando == "/sair":
            print("\nLuz: Obrigada por conversar comigo hoje. Um passo de cada vez. 💛\n")
            break
        if comando == "/humor":
            registrar_humor(registros)
            continue
        if comando == "/historico":
            mostrar_historico(registros)
            continue
        if comando in ("/apoio", "/ajuda"):
            print(CONTATOS_APOIO)
            continue
        if comando == "/respirar":
            respirar()
            continue
        if comando == "/memoria":
            memoria = editar_memoria(memoria)
            continue
        if comando in ("/nova", "/limpar"):
            if pendentes:
                print("Guardando o que é importante…")
                memoria = atualizar_memoria(cliente, memoria, mensagens, pendentes)
            mensagens, pendentes = [], 0
            guardar_conversa()
            print("Conversa nova. A Luz continua lembrando de você.\n")
            continue
        if comando.startswith("/"):
            print(AJUDA_COMANDOS)
            continue

        if not avisou_apoio and tem_sinal_de_risco(entrada):
            avisou_apoio = True
            print(LEMBRETE_APOIO)

        mensagens.append({"role": "user", "content": entrada})
        try:
            resposta = responder(cliente, mensagens, registros, memoria)
        except anthropic.AuthenticationError:
            mensagens.pop()
            print("\nChave da API inválida ou ausente. Defina ANTHROPIC_API_KEY.\n")
            continue
        except anthropic.APIConnectionError:
            mensagens.pop()
            print("\nSem conexão com a internet. Tente de novo em instantes.\n")
            continue
        except anthropic.APIStatusError as e:
            mensagens.pop()
            print(f"\nErro na API ({e.status_code}). Tente de novo em instantes.\n")
            continue

        mensagens.append({"role": "assistant", "content": resposta})
        pendentes += 1
        if pendentes >= RESUMIR_A_CADA:
            memoria_antes = memoria
            memoria = atualizar_memoria(cliente, memoria, mensagens, pendentes)
            if memoria is not memoria_antes:
                pendentes = 0
        mensagens = mensagens[-MAX_MENSAGENS_SALVAS:]
        if mensagens[0]["role"] != "user":
            mensagens = mensagens[1:]
        guardar_conversa()


if __name__ == "__main__":
    main()
