#!/usr/bin/env python3
"""aplicar_revisao.py <LOTE> — aplica as correções de <LOTE>.revisao.json em <LOTE>.json e grava em /home/user/Kiny-Painel/curriculos/pilulas/<LOTE>.json"""
import json, sys
lote = sys.argv[1]; P = json.load(open(f"{lote}.json")); R = {r["id"]: r for r in json.load(open(f"{lote}.revisao.json"))}
n = 0
for p in P:
    r = R.get(p["id"])
    if r and r.get("correcao"):
        for k, v in r["correcao"].items():
            if k in p or k in ("exemplo", "ano", "pessoa", "vida"): p[k] = v; n += 1
json.dump(P, open(f"{lote}.json", "w"), ensure_ascii=False, indent=1)
json.dump(P, open(f"/home/user/Kiny-Painel/curriculos/pilulas/{lote}.json", "w"), ensure_ascii=False, indent=1)
print(f"{lote}: {len(P)} pílulas, {n} campos corrigidos, {sum(1 for r in R.values() if not r.get('ok'))} com apontamento")
