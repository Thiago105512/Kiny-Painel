#!/usr/bin/env python3
"""cegas.py <lote>: gera <lote>.cego.json (sem gabarito/explicação), com a ordem das questões e das
alternativas embaralhadas (o mapa fica em <lote>.cego.mapa.json) para que a posição não denuncie a resposta.
cegas.py <lote> comparar: compara <lote>.respostas.json com o gabarito, desfazendo o embaralhamento."""
import json, sys, random, os
lote = sys.argv[1]; novo = json.load(open(f"{lote}.novo.json"))
if len(sys.argv) == 2:
    rnd = random.Random(); ordem = list(range(len(novo))); rnd.shuffle(ordem); cego, mapa = [], {}
    for i in ordem:
        q = novo[i]; perm = list(range(5)); rnd.shuffle(perm)   # perm[k] = índice original da alternativa mostrada em k
        cego.append({"id": q["id"], "area": q["area"], "enunciado": q["enunciado"], "alternativas": [q["alternativas"][j] for j in perm]}); mapa[q["id"]] = perm
    json.dump(cego, open(f"{lote}.cego.json", "w"), ensure_ascii=False, indent=1)
    json.dump(mapa, open(f"{lote}.cego.mapa.json", "w"))
    print(len(novo), "questões em", f"{lote}.cego.json")
else:
    mapa = json.load(open(f"{lote}.cego.mapa.json")) if os.path.exists(f"{lote}.cego.mapa.json") else {}
    r = {x["id"]: x for x in json.load(open(f"{lote}.respostas.json"))}; dif = 0
    for q in novo:
        x = r.get(q["id"])
        if not x: print("SEM RESPOSTA", q["id"]); continue
        resp = mapa[q["id"]][x["resposta"]] if q["id"] in mapa else x["resposta"]
        if resp != q["correta"] or x.get("ambigua"):
            dif += 1; print(f"== {q['id']} gabarito={q['correta']} cego={resp} conf={x.get('confianca')} ambigua={x.get('ambigua')}\n   {x.get('justificativa','')}")
    print(f"divergências/ambiguidades: {dif} de {len(novo)}")
