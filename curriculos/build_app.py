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
import json, pathlib, sys
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
    }
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
    dados_js = "const DADOS = " + json.dumps(dados, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/") + ";"
    html = (app / "shell.html").read_text(encoding="utf-8")
    html = html.replace("/*ESTILO*/", (app / "estilo.css").read_text(encoding="utf-8"), 1)
    html = html.replace("/*DADOS*/", dados_js, 1)
    html = html.replace("/*CODIGO*/", js.replace("</script", "<\\/script"), 1)
    (AQUI / "app.html").write_text(html, encoding="utf-8")
    kb = len(html.encode("utf-8")) // 1024
    print(f"app.html gerado ({kb} KB): questões {sum(map(len, banco.values()))}, temas {len(mapa.get('temas', []))}, "
          f"assuntos ENEM {sum(len(d.get('assuntos', [])) for a in enem.get('areas', []) for d in a.get('disciplinas', []))}, "
          f"casos {len(dados['casos'])}, matrizes {len(dados['grades'])}")
