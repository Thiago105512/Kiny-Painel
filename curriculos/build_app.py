#!/usr/bin/env python3
"""Monta o app.html: embute a grade (de curriculos.py) e o banco de questões
(de questoes/<trilha>.json). Rode sempre que editar esses arquivos:
  python3 build_app.py
Também valida as questões (5 alternativas, gabarito 0-4, ids únicos)."""
import json, pathlib, re, sys
from curriculos import SECOES

AQUI = pathlib.Path(__file__).parent
TRILHAS = ["enem", "medicina", "residencia", "direito", "oab"]


def carregar_banco():
    banco, ids, erros = {}, set(), []
    for t in TRILHAS:
        arq = AQUI / "questoes" / f"{t}.json"
        itens = json.loads(arq.read_text(encoding="utf-8"))
        for n, q in enumerate(itens):
            onde = f"{arq.name}#{n} ({q.get('id')})"
            if q.get("id") in ids:
                erros.append(f"{onde}: id repetido")
            ids.add(q.get("id"))
            if len(q.get("alternativas", [])) != 5 or len(set(q["alternativas"])) != 5:
                erros.append(f"{onde}: precisa de 5 alternativas diferentes")
            if q.get("correta") not in range(5):
                erros.append(f"{onde}: 'correta' deve ser 0-4")
            if not q.get("enunciado") or not q.get("area"):
                erros.append(f"{onde}: falta enunciado ou área")
        banco[t] = itens
    return banco, erros


def embutir(html, marca, dados):
    js = json.dumps(dados, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
    return re.sub(rf"/\*{marca}\*/.*?/\*FIM\*/", lambda m: f"/*{marca}*/{js}/*FIM*/", html, count=1, flags=re.S)


if __name__ == "__main__":
    banco, erros = carregar_banco()
    if erros:
        print("\n".join(erros)); sys.exit(1)
    p = AQUI / "app.html"
    html = p.read_text(encoding="utf-8")
    html = embutir(html, "GRADE", {k: v[1] for k, v in SECOES.items()})
    html = embutir(html, "BANCO", banco)
    p.write_text(html, encoding="utf-8")
    print("app.html atualizado:", {t: len(v) for t, v in banco.items()}, "total", sum(map(len, banco.values())))
