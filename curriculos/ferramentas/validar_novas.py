#!/usr/bin/env python3
"""Uso: python3 validar_novas.py <arquivo.json> <trilha: medicina|residencia|enem|direito|oab>
Questões NOVAS: checagens de formato/catálogo (validar_base.py) + proporção de tamanhos, níveis e explicação."""
import json, sys, re, subprocess, collections
arq, trilha = sys.argv[1], sys.argv[2]
r = subprocess.run(["python3", "validar_base.py", arq, trilha], capture_output=True, text=True)
E = [l for l in r.stdout.splitlines()[1:] if l.strip() and not l.startswith("OK")]
print(r.stdout.splitlines()[0] if r.stdout else r.stderr)
Q = json.load(open(arq)); n = len(Q); L = [len(q.get("enunciado", "")) for q in Q]
for q in Q:
    if len(q.get("enunciado", "")) < 80: E.append(f"{q.get('id')}: enunciado curto demais (<80)")
    if len(q.get("explicacao", "")) < 200: E.append(f"{q.get('id')}: explicação curta (<200)")
    if re.search(r"\([A-E]\)", q.get("explicacao", "")): E.append(f"{q.get('id')}: explicação cita letra")
FAIXAS = {"enem": [(.10, .20), (.45, .60), (.25, .40)], "residencia": [(.10, .20), (.50, .65), (.20, .35)],
          "medicina": [(.25, .40), (.40, .55), (.15, .25)], "direito": [(.25, .40), (.40, .55), (.15, .25)], "oab": [(.10, .20), (.55, .70), (.15, .25)]}
cls = [0 if l < 250 else 1 if l < 600 else 2 for l in L]
for i, nome in enumerate(["curtas (<250)", "médias (250–599)", "longas (≥600)"]):
    fr = cls.count(i) / max(1, n); lo, hi = FAIXAS[trilha][i]
    print(f"  {nome}: {cls.count(i)} ({round(fr*100)}%) — alvo {int(lo*100)}–{int(hi*100)}%")
    if not lo - .02 <= fr <= hi + .02: E.append(f"proporção {nome} fora do alvo")
dif = collections.Counter(q.get("dificuldade") for q in Q)
print(f"  dificuldade: {dict(sorted(dif.items()))}")
for d, lo, hi in [(1, .20, .35), (2, .35, .55), (3, .20, .35)]:
    if not lo <= dif.get(d, 0) / max(1, n) <= hi: E.append(f"dificuldade {d} fora de {int(lo*100)}–{int(hi*100)}%")
print("\n".join(E) if E else "OK — sem erros"); sys.exit(1 if E else 0)
