#!/usr/bin/env python3
"""Uso: python3 validar.py <arquivo_novas.json> <trilha: medicina|residencia|enem|direito|oab>
Valida um lote de questões novas contra o catálogo e o banco existente."""
import json, sys, re, collections, pathlib
REPO = pathlib.Path("/home/user/Kiny-Painel/curriculos")
arq, trilha = sys.argv[1], sys.argv[2]
novas = json.load(open(arq, encoding="utf-8"))
mapa = json.load(open(REPO / "dados/medicina/mapa.json"))
enem = json.load(open(REPO / "dados/enem/matriz.json"))
temas = {t["id"]: {s["id"] for s in t["subtemas"]} for t in mapa["temas"]}
esp = {e["id"] for a in mapa["areas"] for e in a["especialidades"]}
assuntos = {}
for a in enem["areas"]:
    for d in a["disciplinas"]:
        for s in d["assuntos"]:
            assuntos[s["id"]] = (set(s.get("subassuntos", [])), d["nome"], a["id"])
existentes = []
for t in ["enem", "medicina", "residencia", "direito", "oab"]:
    existentes += json.load(open(REPO / f"questoes/{t}.json", encoding="utf-8"))
ids = {q["id"] for q in existentes}
norm = lambda s: re.sub(r"\W+", " ", s.lower()).strip()
enuns = {norm(q["enunciado"])[:120] for q in existentes}
prefixo = {"medicina": "med-", "residencia": "res-", "enem": "ene-", "direito": "dir-", "oab": "oab-"}[trilha]
erros = []; vistos = set()
for n, q in enumerate(novas):
    onde = f"#{n} {q.get('id')}"
    for c in ["id", "area", "enunciado", "alternativas", "correta", "explicacao", "disciplina", "dificuldade", "fonte"]:
        if c not in q: erros.append(f"{onde}: falta {c}")
    if not str(q.get("id", "")).startswith(prefixo) or not re.fullmatch(prefixo + r"[0-9a-f]{8}", str(q.get("id", ""))): erros.append(f"{onde}: id deve ser {prefixo}<8 hex>")
    if q.get("id") in ids or q.get("id") in vistos: erros.append(f"{onde}: id repetido")
    vistos.add(q.get("id"))
    alts = q.get("alternativas", [])
    if len(alts) != 5 or len(set(alts)) != 5: erros.append(f"{onde}: 5 alternativas diferentes")
    if q.get("correta") not in range(5): erros.append(f"{onde}: correta 0-4"); continue
    L = [len(a) for a in alts]; c = L[q["correta"]]; o = max(L[:q["correta"]] + L[q["correta"] + 1:])
    if c > o * 1.25 and c - o > 20: erros.append(f"{onde}: correta visivelmente mais longa ({c} x {o})")
    if re.search(r"\b(alternativa|opção|letra)\s+[A-E]\b", q.get("explicacao", ""), re.I): erros.append(f"{onde}: explicação cita letra")
    if re.search(r"todas as anteriores|nenhuma das anteriores", " ".join(alts), re.I): erros.append(f"{onde}: 'todas/nenhuma das anteriores'")
    if q.get("dificuldade") not in (1, 2, 3): erros.append(f"{onde}: dificuldade 1-3")
    if norm(q.get("enunciado", ""))[:120] in enuns: erros.append(f"{onde}: enunciado duplicado de questão existente")
    if trilha in ("medicina", "residencia"):
        t = q.get("tema")
        if t not in temas: erros.append(f"{onde}: tema inexistente {t}")
        elif q.get("subtema") not in (None, *temas[t]): erros.append(f"{onde}: subtema {q.get('subtema')} não é do tema")
        if q.get("especialidade") not in esp: erros.append(f"{onde}: especialidade inexistente {q.get('especialidade')}")
    elif trilha == "enem":
        t = q.get("tema")
        if t not in assuntos: erros.append(f"{onde}: assunto inexistente {t}")
        else:
            subs, disc, area = assuntos[t]
            if q.get("subtema") not in (None, *subs): erros.append(f"{onde}: subtema não é subassunto de {t}")
            if q.get("disciplina") != disc: erros.append(f"{onde}: disciplina deve ser '{disc}'")
            if q.get("areaEnem") != area: erros.append(f"{onde}: areaEnem deve ser '{area}'")
    else:
        if q.get("disciplina") != q.get("area"): erros.append(f"{onde}: disciplina deve ser igual a area")
pos = collections.Counter(q.get("correta") for q in novas)
print(f"{len(novas)} questões · posições da correta: {dict(sorted(pos.items()))} · áreas: {dict(collections.Counter(q.get('area') for q in novas))}")
if pos and max(pos.values()) - min(pos.get(i, 0) for i in range(5)) > max(3, len(novas) // 8): erros.append(f"posição da correta desequilibrada: {dict(pos)}")
print("\n".join(erros) if erros else "OK — sem erros")
sys.exit(1 if erros else 0)
