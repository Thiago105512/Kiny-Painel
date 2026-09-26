#!/usr/bin/env python3
"""Uso: python3 validar_rees.py <lote>   (ex.: enem-2) — compara <lote>.novo.json com <lote>.orig.json"""
import json, sys, re, collections
lote = sys.argv[1]
orig = {q["id"]: q for q in json.load(open(f"{lote}.orig.json"))}
novo = json.load(open(f"{lote}.novo.json"))
E = []; ids = [q.get("id") for q in novo]
if set(ids) != set(orig) or len(ids) != len(orig): E.append(f"ids diferentes do original: faltam {sorted(set(orig)-set(ids))[:5]} sobram {sorted(set(ids)-set(orig))[:5]}")
FIXOS = ["area", "tema", "subtema", "disciplina", "areaEnem", "especialidade", "fonte"]
L = []
for q in novo:
    o = orig.get(q.get("id")); onde = q.get("id")
    if not o: continue
    for c in FIXOS:
        if q.get(c) != o.get(c): E.append(f"{onde}: campo '{c}' não pode mudar ({o.get(c)!r} -> {q.get(c)!r})")
    en = q.get("enunciado", ""); L.append(len(en))
    if len(en) < 80: E.append(f"{onde}: enunciado curto demais ({len(en)} < 80)")
    a = q.get("alternativas", [])
    if len(a) != 5 or len(set(a)) != 5: E.append(f"{onde}: precisa de 5 alternativas distintas")
    if q.get("correta") not in range(5): E.append(f"{onde}: correta 0-4"); continue
    la = [len(x) for x in a]; c = la[q["correta"]]; m = max(la[:q["correta"]] + la[q["correta"]+1:])
    if c > m * 1.25 and c - m > 20: E.append(f"{onde}: correta visivelmente mais longa ({c} x {m})")
    ex = q.get("explicacao", "")
    if len(ex) < 200: E.append(f"{onde}: explicação curta ({len(ex)} < 200)")
    if re.search(r"\b(alternativa|opção|letra)\s+[A-E]\b|\([A-E]\)", ex): E.append(f"{onde}: explicação cita letra (as alternativas são embaralhadas no app)")
    if re.search(r"todas as anteriores|nenhuma das anteriores|todas as alternativas", " ".join(a), re.I): E.append(f"{onde}: 'todas/nenhuma das anteriores'")
    if q.get("dificuldade") not in (1, 2, 3): E.append(f"{onde}: dificuldade 1-3")
    for k in q:
        if k not in ("id","area","enunciado","alternativas","correta","explicacao","tema","subtema","especialidade","disciplina","areaEnem","dificuldade","fonte","ano","prova","revisado","serie","parte","partes"): E.append(f"{onde}: campo desconhecido {k}")
n = len(novo); dif = collections.Counter(q.get("dificuldade") for q in novo); pos = collections.Counter(q.get("correta") for q in novo)
print(f"{n} questões · enunciado: mín {min(L) if L else 0}, médio {sum(L)//max(1,len(L))}, máx {max(L) if L else 0} · dificuldade {dict(sorted(dif.items()))} · posição da correta {dict(sorted(pos.items()))}")
for d, lo, hi in [(1, .20, .35), (2, .35, .55), (3, .20, .35)]:
    if __import__("os").environ.get("SEM_DISTRIBUICAO") == "1": break   # lotes de ajuste pontual (sem reequilibrar níveis)
    if not lo <= dif.get(d, 0) / max(1, n) <= hi: E.append(f"distribuição: dificuldade {d} deve ficar entre {int(lo*100)}% e {int(hi*100)}% (está {dif.get(d,0)}/{n})")
if __import__("os").environ.get("SEM_DISTRIBUICAO") != "1" and pos and max(pos.values()) - min(pos.get(i, 0) for i in range(5)) > max(3, n // 8): E.append(f"posição da correta desequilibrada: {dict(pos)}")
# Proporção de tamanhos inspirada no perfil real de cada prova: curta < 250, média 250–599, longa ≥ 600 caracteres
FAIXAS = {"enem": [(.10, .20), (.45, .60), (.25, .40)], "residencia": [(.10, .20), (.50, .65), (.20, .35)],
          "medicina": [(.10, .20), (.50, .65), (.20, .30)], "direito": [(.15, .25), (.50, .65), (.15, .25)], "oab": [(.10, .20), (.55, .70), (.15, .25)]}
import os
trilha = lote.split("-")[0]; fx = FAIXAS.get(trilha, FAIXAS["medicina"])   # lotes de auditoria (aud*) são de Medicina
if os.environ.get("ALVO"): fx = [tuple(map(float, p.split(","))) for p in os.environ["ALVO"].split(";")]   # lotes de ampliação/ajuste
SEM_DIST = os.environ.get("SEM_DISTRIBUICAO") == "1"
cls = [0 if l < 250 else 1 if l < 600 else 2 for l in L]
for i, nome in enumerate(["curtas (<250)", "médias (250–599)", "longas (≥600)"]):
    fr = cls.count(i) / max(1, len(L)); lo, hi = fx[i]
    print(f"  {nome}: {cls.count(i)} ({round(fr*100)}%) — alvo {int(lo*100)}–{int(hi*100)}%")
    if not SEM_DIST and not lo - 0.02 <= fr <= hi + 0.02: E.append(f"proporção de enunciados {nome}: {round(fr*100)}% fora do alvo {int(lo*100)}–{int(hi*100)}%")
# nível e tamanho não são a mesma coisa: exige questões difíceis curtas e fáceis longas também, sem ser regra fixa
if not SEM_DIST and not os.environ.get("ALVO") and not any(c == 0 and q.get("dificuldade") == 3 for c, q in zip(cls, novo)) and len(novo) >= 40: E.append("inclua ao menos uma questão curta e difícil (tamanho não define dificuldade)")
print("\n".join(E) if E else "OK — sem erros"); sys.exit(1 if E else 0)
