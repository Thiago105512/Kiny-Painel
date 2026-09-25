#!/usr/bin/env python3
"""aplicar_revisao_q.py <lote>: aplica <lote>.revisao.json (campos corrigidos pela revisão editorial) em <lote>.json.
Só aceita campos editáveis; confere que a questão continua com 5 alternativas distintas e gabarito 0–4."""
import json, sys
lote = sys.argv[1]; qs = json.load(open(f"{lote}.json")); por = {q["id"]: q for q in qs}
EDIT = {"enunciado", "alternativas", "correta", "explicacao", "dificuldade", "subtema"}
n = 0
for r in json.load(open(f"{lote}.revisao.json")):
    q = por.get(r["id"])
    if not q: print("id inexistente:", r["id"]); continue
    campos = {k: v for k, v in (r.get("campos") or {}).items() if k in EDIT}
    ign = set(r.get("campos") or {}) - EDIT
    if ign: print("ignorados em", r["id"], ign)
    novo = {**q, **campos}
    assert len(novo["alternativas"]) == 5 and len(set(novo["alternativas"])) == 5 and novo["correta"] in range(5), r["id"]
    q.update(campos); n += 1 if campos else 0
    print(f"{r['id']} [{r.get('gravidade')}] {', '.join(campos) or '(sem campos)'} — {r.get('problema','')[:140]}")
json.dump(qs, open(f"{lote}.json", "w"), ensure_ascii=False, indent=1)
print(f"{n} questões ajustadas em {lote}.json")
