#!/usr/bin/env python3
"""cobertura.py <trilha> — lista temas/áreas da trilha com a contagem atual de questões (menos cobertos primeiro)."""
import json, sys, collections
R = "/home/user/Kiny-Painel/curriculos/"; t = sys.argv[1]
qs = json.load(open(R + f"questoes/{t}.json"))
if t in ("medicina", "residencia"):
    m = json.load(open(R + "dados/medicina/mapa.json")); c = collections.Counter(q["tema"] for q in qs)
    esp = {e["id"]: e["nome"] for a in m["areas"] for e in a["especialidades"]}
    for tm in sorted(m["temas"], key=lambda x: c[x["id"]]):
        print(f'{c[tm["id"]]:3d}  tema={tm["id"]}  ({tm["nome"]})  especialidades={tm.get("especialidades")}  subtemas={[s["id"] for s in tm["subtemas"]]}')
    print("\nespecialidades válidas:", esp)
elif t == "enem":
    e = json.load(open(R + "dados/enem/matriz.json")); c = collections.Counter(q["tema"] for q in qs)
    L = [(c[s["id"]], s["id"], s["nome"], d["nome"], a["id"], s.get("subassuntos", [])) for a in e["areas"] for d in a["disciplinas"] for s in d["assuntos"]]
    for n, i, nome, d, a, subs in sorted(L): print(f"{n:3d}  tema={i} ({nome})  disciplina={d}  areaEnem={a}  subtemas={subs}")
else:
    c = collections.Counter(q["area"] for q in qs)
    for a, n in sorted(c.items(), key=lambda x: x[1]): print(f"{n:3d}  area={a}")
print(f"\nexemplo de questão existente (formato):\n{json.dumps({k: v for k, v in qs[0].items()}, ensure_ascii=False, indent=1)[:1500]}")
