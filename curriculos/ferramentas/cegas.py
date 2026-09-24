#!/usr/bin/env python3
"""cegas.py <lote>: gera <lote>.cego.json (sem gabarito/explicação). cegas.py <lote> comparar: compara <lote>.respostas.json com o gabarito."""
import json, sys
lote = sys.argv[1]; novo = json.load(open(f"{lote}.novo.json"))
if len(sys.argv) == 2:
    json.dump([{"id": q["id"], "area": q["area"], "enunciado": q["enunciado"], "alternativas": q["alternativas"]} for q in novo], open(f"{lote}.cego.json", "w"), ensure_ascii=False, indent=1)
    print(len(novo), "questões em", f"{lote}.cego.json")
else:
    r = {x["id"]: x for x in json.load(open(f"{lote}.respostas.json"))}; dif = 0
    for q in novo:
        x = r.get(q["id"])
        if not x: print("SEM RESPOSTA", q["id"]); continue
        if x["resposta"] != q["correta"] or x.get("ambigua"):
            dif += 1; print(f"== {q['id']} gabarito={q['correta']} cego={x['resposta']} conf={x.get('confianca')} ambigua={x.get('ambigua')}\n   {x.get('justificativa','')}")
    print(f"divergências/ambiguidades: {dif} de {len(novo)}")
