#!/usr/bin/env python3
"""calibrar.py <contribuicoes.json> [--aplicar] — calibra a dificuldade pelo uso.
Entrada: lista de documentos da coleção compartilhada "calibracao" (cada um {q: {qid: 0|1}, ts}),
exportada com ArtifactData (list). Gera calibracao_total.json ({q: {qid: [n, acertos]}, ts}) para
gravar em calibracao_total/geral, e lista as questões cujo nível observado difere do declarado.
Nível observado pela 1ª tentativa: ≥75% de acerto → 1 (fácil); 45–75% → 2; <45% → 3.
Com --aplicar, ajusta "dificuldade" no banco quando há ≥ MIN respostas e grava "calibrado": {n, acerto}."""
import json, sys, time, collections
R = "/home/user/Kiny-Painel/curriculos/questoes/"; MIN = 30
docs = json.load(open(sys.argv[1])); docs = [d.get("data", d) for d in (docs if isinstance(docs, list) else docs.get("docs", []))]
tot = collections.defaultdict(lambda: [0, 0])
for d in docs:
    for qid, ok in (d.get("q") or {}).items(): tot[qid][0] += 1; tot[qid][1] += 1 if ok else 0
json.dump({"q": tot, "ts": int(time.time() * 1000)}, open("calibracao_total.json", "w"))
nivel = lambda p: 1 if p >= .75 else 2 if p >= .45 else 3
aplicar = "--aplicar" in sys.argv; mud = 0
for t in ["medicina", "residencia", "enem", "direito", "oab"]:
    qs = json.load(open(R + t + ".json")); alterou = False
    for q in qs:
        n, ac = tot.get(q["id"], [0, 0])
        if n < MIN: continue
        obs = nivel(ac / n)
        if obs != q.get("dificuldade"):
            print(f"{q['id']}: declarado {q.get('dificuldade')} · observado {obs} ({ac}/{n} = {ac/n:.0%})"); mud += 1
            if aplicar: q["dificuldade"] = obs; q["calibrado"] = {"n": n, "acerto": round(ac / n, 3)}; alterou = True
    if alterou: json.dump(qs, open(R + t + ".json", "w"), ensure_ascii=False, indent=1); open(R + t + ".json", "a").write("\n")
print(f"{len(docs)} contribuições · {len(tot)} questões com dados · {sum(1 for v in tot.values() if v[0] >= MIN)} com ≥{MIN} respostas · {mud} níveis {'ajustados' if aplicar else 'a ajustar'}")
print("Gravar calibracao_total.json em calibracao_total/geral (ArtifactData set).")
