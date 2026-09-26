#!/usr/bin/env python3
"""aplicar.py lote1 lote2 ... — substitui no repositório as questões reescritas (por id), marca "revisado" (AAAA-MM) e roda o build."""
import json, sys, subprocess, collections, datetime
MES = datetime.date.today().strftime("%Y-%m")
R = "/home/user/Kiny-Painel/curriculos/questoes/"
por = collections.defaultdict(dict)
for lote in sys.argv[1:]:
    for q in json.load(open(f"{lote}.novo.json")): por[lote.split("-")[0]][q["id"]] = q
for t, novos in por.items():
    arq = R + t + ".json"; base = json.load(open(arq)); n = 0
    for i, q in enumerate(base):
        if q["id"] in novos: base[i] = {**novos.pop(q["id"]), "revisado": MES}; n += 1
    assert not novos, f"ids não encontrados em {t}: {list(novos)[:3]}"
    json.dump(base, open(arq, "w"), ensure_ascii=False, indent=1); open(arq, "a").write("\n")
    print(f"{t}: {n} questões substituídas")
subprocess.run(["python3", "/home/user/Kiny-Painel/curriculos/build_app.py"], check=True)
