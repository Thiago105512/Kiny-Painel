#!/usr/bin/env python3
"""Monta o app.html (arquivo único, leve) a partir de:
  app/shell.html + app/estilo.css + app/js/*.js   (código, em ordem de nome)
  questoes/<trilha>.json                          (banco de questões)
  dados/medicina/mapa.json, casos.json            (temas, especialidades, casos)
  dados/enem/matriz.json, redacao.json            (ENEM e redação)
  dados/instituicoes.json, dados/grades/*.json    (faculdades e matrizes oficiais)
  curriculos.py                                   (guia de referência)
Valida tudo antes de gravar. Uso:  python3 build_app.py
"""
import json, pathlib, re, sys
from curriculos import SECOES

AQUI = pathlib.Path(__file__).parent
TRILHAS = ["enem", "medicina", "residencia", "direito", "oab"]
erros = []


def ler(caminho, padrao=None):
    p = AQUI / caminho
    if not p.exists():
        if padrao is None:
            erros.append(f"{caminho}: arquivo não encontrado")
        return padrao
    try:
        return json.loads(p.read_text(encoding="utf-8"))
    except json.JSONDecodeError as e:
        erros.append(f"{caminho}: JSON inválido ({e})")
        return padrao


def catalogo_temas(mapa, enem):
    temas = {}
    for t in (mapa or {}).get("temas", []):
        temas[t["id"]] = {s["id"] for s in t.get("subtemas", [])}
    for a in (enem or {}).get("areas", []):
        for d in a.get("disciplinas", []):
            for s in d.get("assuntos", []):
                temas[s["id"]] = set(s.get("subassuntos", []))
    return temas


def validar_banco(banco, temas):
    ids = set()
    for t, itens in banco.items():
        for n, q in enumerate(itens):
            onde = f"questoes/{t}.json#{n} ({q.get('id')})"
            if q.get("id") in ids:
                erros.append(f"{onde}: id repetido")
            ids.add(q.get("id"))
            alts = q.get("alternativas", [])
            if len(alts) != 5 or len(set(alts)) != 5:
                erros.append(f"{onde}: precisa de 5 alternativas diferentes")
            if q.get("correta") not in range(5):
                erros.append(f"{onde}: 'correta' deve ser 0-4")
            if not q.get("enunciado") or not q.get("area"):
                erros.append(f"{onde}: falta enunciado ou área")
            tema = q.get("tema")
            if tema is not None and tema not in temas:
                erros.append(f"{onde}: tema '{tema}' não existe no catálogo")
            if q.get("dificuldade") not in (None, 1, 2, 3):
                erros.append(f"{onde}: dificuldade deve ser 1, 2 ou 3")


def validar_grade(g, arq, insts):
    for campo in ("id", "instituicao", "curso", "periodos"):
        if campo not in g:
            erros.append(f"{arq}: falta '{campo}'")
    if g.get("instituicao") not in insts:
        erros.append(f"{arq}: instituição '{g.get('instituicao')}' não cadastrada em dados/instituicoes.json")
    vistos = set()
    for p in g.get("periodos", []):
        for it in p.get("itens", []):
            if it.get("id") in vistos:
                erros.append(f"{arq}: item repetido '{it.get('id')}'")
            vistos.add(it.get("id"))
            if it.get("ch") is not None and not isinstance(it["ch"], (int, float)):
                erros.append(f"{arq}: CH de '{it.get('nome')}' deve ser número ou null")


def validar_pilulas(pils, temas):
    """Pílulas de estudo: id único, tipo e domínio válidos, tema existente, textos presentes."""
    tipos = {"curiosidade", "data", "pessoa", "conceito", "macete", "pegadinha", "comparacao"}
    vistos, erros = set(), []
    for p in pils:
        onde = f"pilulas ({p.get('id')})"
        if p.get("id") in vistos: erros.append(f"{onde}: id repetido")
        vistos.add(p.get("id"))
        if p.get("tipo") not in tipos: erros.append(f"{onde}: tipo inválido")
        if p.get("dominio") not in ("medicina", "enem", "direito"): erros.append(f"{onde}: domínio inválido")
        if p.get("tema") and p["tema"] not in temas: erros.append(f"{onde}: tema inexistente {p['tema']}")
        for c in ("titulo", "pergunta", "resposta", "texto", "porque", "area"):
            if not p.get(c): erros.append(f"{onde}: falta {c}")
        if p.get("tipo") == "data" and not isinstance(p.get("ano"), int): erros.append(f"{onde}: data sem ano")
    if erros: sys.exit("Pílulas inválidas:\n" + "\n".join(erros[:40]))


if __name__ == "__main__":
    banco = {t: ler(f"questoes/{t}.json", []) for t in TRILHAS}
    mapa = ler("dados/medicina/mapa.json", {})
    enem = ler("dados/enem/matriz.json", {})
    dados = {
        "guia": {k: v[1] for k, v in SECOES.items()},
        "banco": banco,
        "mapa": mapa,
        "enem": enem,
        "redacao": ler("dados/enem/redacao.json", {}),
        "casos": ler("dados/medicina/casos.json", []),
        "instituicoes": ler("dados/instituicoes.json", []),
        "grades": [],
        "pilulas": [p for arq in sorted((AQUI / "pilulas").glob("*.json")) for p in json.loads(arq.read_text(encoding="utf-8"))] if (AQUI / "pilulas").exists() else [],
    }
    validar_pilulas(dados["pilulas"], catalogo_temas(mapa, enem))
    # Humor (Pausa para rir): humor/*.json = [{id, texto, tipo, dominio}]
    dados["humor"] = [h for arq in sorted((AQUI / "humor").glob("*.json")) for h in json.loads(arq.read_text(encoding="utf-8"))] if (AQUI / "humor").exists() else []
    # Jogos: casos-dia.json, termo.json, pares.json (cada um opcional)
    def _jogo(nome):
        arq = AQUI / "jogos" / nome
        return json.loads(arq.read_text(encoding="utf-8")) if arq.exists() else []
    dados["jogos"] = {"casos": _jogo("casos-dia.json"), "termo": _jogo("termo.json"), "pares": _jogo("pares.json"),
                      "triagem": _jogo("triagem.json"), "emergencias": _jogo("emergencias.json"), "cascatas": _jogo("cascatas.json"),
                      "defesa": _jogo("defesa.json") or {}, "quemsou": _jogo("quemsou.json") or {}}
    for c in dados["jogos"]["emergencias"]:   # todo "vai" precisa apontar para uma etapa ou um final
        alvos = set(c.get("etapas", {})) | set(c.get("finais", {}))
        if c.get("inicio") not in c.get("etapas", {}) or any(a.get("vai") not in alvos for e in c["etapas"].values() for a in e.get("acoes", [])):
            erros.append(f"jogos/emergencias.json: {c.get('id')} tem ação apontando para etapa inexistente")
    _armas = {a["id"] for a in dados["jogos"]["defesa"].get("armas", [])}
    for i in dados["jogos"]["defesa"].get("invasores", []):
        if i.get("certa") not in _armas or any(x not in _armas for x in i.get("aceitaveis", [])):
            erros.append(f"jogos/defesa.json: {i.get('id')} aponta para arma inexistente")
    for c in dados["jogos"]["casos"]:
        if len(c.get("pistas", [])) != 5 or c.get("diagnostico") not in c.get("opcoes", []) or len(c["opcoes"]) != 6:
            erros.append(f"jogos/casos-dia.json: {c.get('id')} precisa de 5 pistas e 6 opções com o diagnóstico")
    for p in dados["jogos"]["termo"]:
        if not re.fullmatch(r"[A-Z]{5}", p.get("palavra", "")):
            erros.append(f"jogos/termo.json: palavra inválida {p.get('palavra')!r}")
    for c in dados["jogos"]["pares"]:
        esq = [a for a, _ in c.get("pares", [])]; dir_ = [b for _, b in c.get("pares", [])]
        if len(esq) < 6 or len(set(esq)) != len(esq) or len(set(dir_)) != len(dir_):
            erros.append(f"jogos/pares.json: {c.get('id')} precisa de 6+ pares sem repetição")
    _ids_h = [h.get("id") for h in dados["humor"]]
    if len(_ids_h) != len(set(_ids_h)) or any(not h.get("texto") or h.get("dominio") not in ("medicina", "enem", "direito") for h in dados["humor"]):
        erros.append("humor/*.json: ids repetidos, texto vazio ou domínio inválido")
    # Imagens didáticas (SVG) com legenda e crédito: dados/imagens/imagens.json + <id>.svg
    pasta_img = AQUI / "dados" / "imagens"
    meta_img = ler("dados/imagens/imagens.json", {})
    dados["imagens"] = {k: {**v, "svg": (pasta_img / f"{k}.svg").read_text(encoding="utf-8")} for k, v in meta_img.items() if (pasta_img / f"{k}.svg").exists()}
    for t, itens in banco.items():
        for q in itens:
            if q.get("imagem") and q["imagem"] not in dados["imagens"]:
                erros.append(f"questoes/{t}.json ({q.get('id')}): imagem '{q['imagem']}' não existe em dados/imagens")
    insts = {i["id"] for i in dados["instituicoes"]}
    for arq in sorted((AQUI / "dados" / "grades").glob("*.json")) if (AQUI / "dados" / "grades").exists() else []:
        g = json.loads(arq.read_text(encoding="utf-8"))
        validar_grade(g, f"dados/grades/{arq.name}", insts)
        dados["grades"].append(g)
    validar_banco(banco, catalogo_temas(mapa, enem))
    if erros:
        print("Build interrompido:\n  " + "\n  ".join(erros))
        sys.exit(1)

    # Campos nulos/vazios não vão para o app (o código trata ausência como null)
    for itens in banco.values():
        for i, q in enumerate(itens):
            itens[i] = {k: v for k, v in q.items() if v not in (None, "", [])}

    app = AQUI / "app"
    js = "\n".join(f"/* ---- {p.name} ---- */\n" + p.read_text(encoding="utf-8") for p in sorted((app / "js").glob("*.js")))
    # Confere a sintaxe do JavaScript antes de gerar (um erro de digitação derruba o app inteiro)
    import shutil, subprocess, tempfile
    if shutil.which("node"):
        with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False, encoding="utf-8") as tmp: tmp.write(js)
        r = subprocess.run(["node", "--check", tmp.name], capture_output=True, text=True)
        if r.returncode: print("Build interrompido: erro de sintaxe no JavaScript\n" + r.stderr[:1500]); sys.exit(1)
    dados_js = "const DADOS = " + json.dumps(dados, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/") + ";"
    html = (app / "shell.html").read_text(encoding="utf-8")
    html = html.replace("/*ESTILO*/", (app / "estilo.css").read_text(encoding="utf-8"), 1)
    html = html.replace("/*DADOS*/", dados_js, 1)
    html = html.replace("/*CODIGO*/", js.replace("</script", "<\\/script"), 1)
    (AQUI / "app.html").write_text(html, encoding="utf-8")
    kb = len(html.encode("utf-8")) // 1024
    print(f"app.html gerado ({kb} KB): questões {sum(map(len, banco.values()))}, temas {len(mapa.get('temas', []))}, "
          f"assuntos ENEM {sum(len(d.get('assuntos', [])) for a in enem.get('areas', []) for d in a.get('disciplinas', []))}, "
          f"casos {len(dados['casos'])}, matrizes {len(dados['grades'])}, pílulas {len(dados['pilulas'])}, piadas {len(dados['humor'])}, jogos {sum(len(v) if isinstance(v, list) else len(v.get('invasores', v.get('grupos', []))) for v in dados['jogos'].values())}, imagens {len(dados['imagens'])}")
