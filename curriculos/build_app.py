#!/usr/bin/env python3
"""Atualiza a grade embutida no app.html a partir de curriculos.py.
Uso: python3 build_app.py  (rode sempre que editar curriculos.py)"""
import json, re, pathlib
from curriculos import SECOES

p = pathlib.Path(__file__).with_name("app.html")
dados = json.dumps({k: v[1] for k, v in SECOES.items()}, ensure_ascii=False, separators=(",", ":"))
html = re.sub(r"/\*GRADE\*/.*?/\*FIM\*/", lambda m: "/*GRADE*/" + dados + "/*FIM*/", p.read_text(encoding="utf-8"), flags=re.S)
p.write_text(html, encoding="utf-8")
print("app.html atualizado")
