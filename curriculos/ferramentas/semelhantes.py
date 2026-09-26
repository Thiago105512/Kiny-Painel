#!/usr/bin/env python3
"""semelhantes.py [limiar=0.55] — aponta pares de questões muito parecidas (mesma trilha e mesmo tema),
comparando enunciado + alternativa correta por similaridade de cosseno em bigramas de palavras e unigramas.
Saída: semelhantes.json com [{"a","b","trilha","tema","sim"}] (maior similaridade primeiro)."""
import json, sys, re, math, collections, itertools, unicodedata
R = "/home/user/Kiny-Painel/curriculos/questoes/"
LIM = float(sys.argv[1]) if len(sys.argv) > 1 else 0.55
PARE = set("a o e de da do das dos em no na nos nas um uma uns umas para por com sem que qual quais se ao aos as os é ou mais menos como sua seu seus suas pela pelo pelas pelos entre sobre este esta esse essa isso foi ser são está".split())
def tok(s):
    s = unicodedata.normalize("NFKD", s.lower()).encode("ascii", "ignore").decode()
    w = [x for x in re.findall(r"[a-z0-9]+", s) if x not in PARE and len(x) > 2]
    return collections.Counter(w + [a + "_" + b for a, b in zip(w, w[1:])])
def cos(a, b):
    num = sum(a[k] * b[k] for k in a.keys() & b.keys())
    return num / (math.sqrt(sum(v * v for v in a.values())) * math.sqrt(sum(v * v for v in b.values())) or 1)
pares = []
for t in ["medicina", "residencia", "enem", "direito", "oab"]:
    qs = json.load(open(R + t + ".json"))
    grupos = collections.defaultdict(list)
    for q in qs: grupos[q.get("tema") or q.get("area")].append(q)
    for tema, g in grupos.items():
        vs = [(q, tok(q["enunciado"] + " " + q["alternativas"][q["correta"]] * 2)) for q in g]
        for (qa, va), (qb, vb) in itertools.combinations(vs, 2):
            if qa.get("serie") and qa.get("serie") == qb.get("serie"): continue
            s = cos(va, vb)
            if s >= LIM: pares.append({"a": qa["id"], "b": qb["id"], "trilha": t, "tema": tema, "sim": round(s, 3)})
pares.sort(key=lambda x: -x["sim"])
json.dump(pares, open("semelhantes.json", "w"), ensure_ascii=False, indent=1)
print(len(pares), "pares com similaridade ≥", LIM, collections.Counter(p["trilha"] for p in pares))
