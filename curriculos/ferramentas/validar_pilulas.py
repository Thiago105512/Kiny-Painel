#!/usr/bin/env python3
"""Uso: python3 validar_pilulas.py <arquivo.json> — valida um lote de pílulas de conhecimento."""
import json, sys, re, collections, pathlib
R = pathlib.Path("/home/user/Kiny-Painel/curriculos")
P = json.load(open(sys.argv[1], encoding="utf-8"))
mapa = json.load(open(R / "dados/medicina/mapa.json")); enem = json.load(open(R / "dados/enem/matriz.json"))
TEMAS = {t["id"] for t in mapa["temas"]} | {s["id"] for a in enem["areas"] for d in a["disciplinas"] for s in d["assuntos"]}
existentes = set()
for f in (R / "pilulas").glob("*.json"): existentes |= {p["id"] for p in json.load(open(f))}
TIPOS = {"curiosidade", "data", "pessoa", "conceito", "macete", "pegadinha", "comparacao"}
DOM = {"medicina", "enem", "direito"}
LIM = {"titulo": 70, "pergunta": 170, "resposta": 130, "texto": 480, "porque": 240, "exemplo": 240}
E = []; vistos = set(); tit = set()
for n, p in enumerate(P):
    o = f"#{n} {p.get('id')}"
    for c in ["id", "dominio", "tipo", "area", "titulo", "pergunta", "resposta", "texto", "porque"]:
        if not p.get(c) and p.get(c) != 0: E.append(f"{o}: falta {c}")
    if not re.fullmatch(r"pil-[0-9a-f]{8}", str(p.get("id", ""))): E.append(f"{o}: id deve ser pil-<8 hex>")
    if p.get("id") in existentes or p.get("id") in vistos: E.append(f"{o}: id repetido")
    vistos.add(p.get("id"))
    if p.get("tipo") not in TIPOS: E.append(f"{o}: tipo inválido {p.get('tipo')}")
    if p.get("dominio") not in DOM: E.append(f"{o}: dominio inválido")
    if p.get("tema") is not None and p.get("tema") not in TEMAS: E.append(f"{o}: tema inexistente {p.get('tema')}")
    for c, m in LIM.items():
        if len(p.get(c) or "") > m: E.append(f"{o}: '{c}' longo demais ({len(p[c])} > {m})")
    if p.get("tipo") == "data" and not isinstance(p.get("ano"), int): E.append(f"{o}: tipo data exige 'ano' inteiro (a.C. negativo)")
    if p.get("tipo") == "pessoa" and not p.get("pessoa"): E.append(f"{o}: tipo pessoa exige 'pessoa' (nome) e, se possível, 'vida' (ex.: 1856–1939)")
    extras = set(p) - {"id", "dominio", "tipo", "area", "tema", "titulo", "pergunta", "resposta", "texto", "porque", "exemplo", "ano", "pessoa", "vida"}
    if extras: E.append(f"{o}: campos desconhecidos {extras}")
    k = re.sub(r"\W+", " ", (p.get("titulo") or "").lower()).strip()
    if k in tit: E.append(f"{o}: título repetido no lote")
    tit.add(k)
c = collections.Counter(p.get("tipo") for p in P)
print(f"{len(P)} pílulas · tipos {dict(c)} · com tema: {sum(1 for p in P if p.get('tema'))}")
if len(c) < 5: E.append("use pelo menos 5 tipos diferentes")
if max(c.values(), default=0) > len(P) * 0.35: E.append("nenhum tipo deve passar de 35% do lote")
print("\n".join(E) if E else "OK — sem erros"); sys.exit(1 if E else 0)
