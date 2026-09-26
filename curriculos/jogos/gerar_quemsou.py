#!/usr/bin/env python3
"""Gera curriculos/jogos/quemsou.json (jogo "Quem sou eu?") e valida o conteúdo.

Cada grupo: 8–10 doenças, 10–14 perguntas de sim/não. Para cada pergunta,
"sim" lista as doenças em que a resposta é SIM (as demais são NÃO).
O conjunto de perguntas precisa distinguir todo par de doenças do grupo.
Uso: python3 curriculos/jogos/gerar_quemsou.py
"""
import itertools
import json
import os
import sys

N_GRUPOS = 8
MIN_DOENCAS, MAX_DOENCAS = 8, 10
MIN_PERG, MAX_PERG = 10, 14
MAX_PERGUNTA = 60
MAX_NOTA = 140

GRUPOS = [
    {
        "id": "qs-febris",
        "titulo": "Doenças febris da Amazônia",
        "notas": {
            "Malária": "Febre em picos com calafrios; gota espessa confirma. P. vivax predomina na Amazônia.",
            "Dengue": "Febre, dor retro-orbital e mialgia. Risco maior na defervescência, por extravasamento plasmático.",
            "Chikungunya": "Febre alta com artralgia intensa e simétrica, que pode durar meses.",
            "Zika": "Febre baixa, exantema pruriginoso e conjuntivite. Na gestação, causa microcefalia.",
            "Oropouche": "Febre, cefaleia e mialgia semelhantes à dengue; transmitida pelo maruim (Culicoides paraensis).",
            "Febre amarela": "Forma grave com icterícia, hemorragia e sinal de Faget. Prevenida por vacina.",
            "Leptospirose": "Após enchentes: febre, mialgia na panturrilha e sufusão conjuntival; forma de Weil com icterícia.",
            "Hepatite A": "Transmissão fecal-oral; icterícia após pródromo febril. Autolimitada e com vacina no PNI.",
            "Febre tifoide": "Salmonella Typhi: febre prolongada, bradicardia relativa, roséolas e hepatoesplenomegalia.",
        },
        "perguntas": [
            ("É transmitida por inseto vetor?",
             ["Malária", "Dengue", "Chikungunya", "Zika", "Oropouche", "Febre amarela"]),
            ("O agente é um vírus?",
             ["Dengue", "Chikungunya", "Zika", "Oropouche", "Febre amarela", "Hepatite A"]),
            ("O agente é uma bactéria?", ["Leptospirose", "Febre tifoide"]),
            ("O agente é um protozoário?", ["Malária"]),
            ("O vetor principal é o Aedes aegypti?", ["Dengue", "Chikungunya", "Zika"]),
            ("É transmitida pelo maruim (Culicoides)?", ["Oropouche"]),
            ("Transmissão fecal-oral (água ou alimento)?", ["Hepatite A", "Febre tifoide"]),
            ("Ligada à urina de rato e a enchentes?", ["Leptospirose"]),
            ("Diagnóstico clássico pela gota espessa?", ["Malária"]),
            ("Artralgia intensa que pode durar meses?", ["Chikungunya"]),
            ("Exantema pruriginoso com conjuntivite é típico?", ["Zika"]),
            ("Dor forte na panturrilha é típica?", ["Leptospirose"]),
            ("Febre com bradicardia relativa (Faget)?", ["Febre amarela", "Febre tifoide"]),
            ("Maior risco é o extravasamento plasmático?", ["Dengue"]),
        ],
    },
    {
        "id": "qs-exantematicas",
        "titulo": "Doenças exantemáticas da infância",
        "notas": {
            "Sarampo": "Tosse, coriza e conjuntivite; manchas de Koplik e exantema craniocaudal. Vacina tríplice viral.",
            "Rubéola": "Exantema leve com linfonodos retroauriculares e occipitais. Grave na gestação (síndrome congênita).",
            "Varicela": "Vesículas pruriginosas em vários estágios ao mesmo tempo (polimorfismo regional).",
            "Eritema infeccioso": "Parvovírus B19: face esbofeteada e depois exantema rendilhado nos membros.",
            "Exantema súbito": "Herpesvírus 6: 3 dias de febre alta; o exantema aparece quando a febre cede.",
            "Escarlatina": "Estreptococo do grupo A: exantema áspero (lixa), língua em framboesa e sinal de Pastia.",
            "Mão-pé-boca": "Coxsackie: vesículas na boca, nas mãos e nos pés; comum em creches.",
            "Doença de Kawasaki": "Febre ≥ 5 dias, conjuntivite, lábios fissurados; risco de aneurisma coronariano. Trata com imunoglobulina.",
        },
        "perguntas": [
            ("O agente é um vírus?",
             ["Sarampo", "Rubéola", "Varicela", "Eritema infeccioso", "Exantema súbito", "Mão-pé-boca"]),
            ("O agente é uma bactéria?", ["Escarlatina"]),
            ("Tem vacina no calendário do PNI?", ["Sarampo", "Rubéola", "Varicela"]),
            ("O exantema é vesicular?", ["Varicela", "Mão-pé-boca"]),
            ("Lesões em estágios diferentes ao mesmo tempo?", ["Varicela"]),
            ("Tem manchas de Koplik?", ["Sarampo"]),
            ("O exantema surge quando a febre cede?", ["Exantema súbito"]),
            ("Face esbofeteada é típica?", ["Eritema infeccioso"]),
            ("Língua em framboesa é típica?", ["Escarlatina", "Doença de Kawasaki"]),
            ("Risco de aneurisma coronariano?", ["Doença de Kawasaki"]),
            ("Linfonodos retroauriculares e occipitais?", ["Rubéola"]),
            ("Causada pelo parvovírus B19?", ["Eritema infeccioso"]),
            ("Vesículas na boca, nas mãos e nos pés?", ["Mão-pé-boca"]),
        ],
    },
    {
        "id": "qs-dortoracica",
        "titulo": "Causas de dor torácica",
        "notas": {
            "Infarto agudo do miocárdio": "Dor em aperto > 20 min, com troponina elevada. ECG em até 10 min da chegada.",
            "Angina estável": "Dor aos esforços que alivia com repouso ou nitrato em poucos minutos.",
            "Dissecção de aorta": "Dor súbita, rasgando, para o dorso; assimetria de pulsos. Não anticoagular.",
            "Tromboembolismo pulmonar": "Dispneia súbita, taquicardia e dor pleurítica; angio-TC confirma.",
            "Pneumotórax": "Dor súbita e dispneia; murmúrio abolido e timpanismo. Hipertensivo: descompressão imediata.",
            "Pericardite aguda": "Dor que melhora ao inclinar para frente; atrito pericárdico e supra de ST difuso.",
            "Doença do refluxo": "Pirose e regurgitação, pioram deitado após refeições; melhoram com IBP.",
            "Costocondrite": "Dor reproduzida à palpação das junções costocondrais; benigna.",
            "Pneumonia": "Febre, tosse produtiva e dor pleurítica, com consolidação na radiografia.",
        },
        "perguntas": [
            ("Tem origem cardíaca?",
             ["Infarto agudo do miocárdio", "Angina estável", "Pericardite aguda"]),
            ("Troponina elevada é a regra?", ["Infarto agudo do miocárdio"]),
            ("Dor aos esforços que alivia em repouso?", ["Angina estável"]),
            ("Dor rasgando que irradia para o dorso?", ["Dissecção de aorta"]),
            ("Diferença de pulso ou PA entre os braços?", ["Dissecção de aorta"]),
            ("Ligada a TVP e imobilização?", ["Tromboembolismo pulmonar"]),
            ("Murmúrio abolido com timpanismo?", ["Pneumotórax"]),
            ("Melhora ao inclinar o tronco para frente?", ["Pericardite aguda"]),
            ("Supra de ST difuso com infra de PR?", ["Pericardite aguda"]),
            ("Pirose que piora ao deitar após comer?", ["Doença do refluxo"]),
            ("Dor reproduzida à palpação do tórax?", ["Costocondrite"]),
            ("Febre e tosse produtiva?", ["Pneumonia"]),
            ("Dor pleurítica (piora ao inspirar)?",
             ["Tromboembolismo pulmonar", "Pneumotórax", "Pericardite aguda", "Pneumonia"]),
        ],
    },
    {
        "id": "qs-anemias",
        "titulo": "Anemias",
        "notas": {
            "Ferropriva": "Microcítica e hipocrômica, ferritina baixa. Em adulto, investigar sangramento digestivo.",
            "Deficiência de B12": "Macrocítica com sintomas neurológicos; causa clássica: anemia perniciosa.",
            "Deficiência de folato": "Macrocítica sem sintomas neurológicos; etilismo, gestação e má alimentação.",
            "Anemia de doença crônica": "Normocítica, ferro baixo com ferritina normal ou alta (hepcidina elevada).",
            "Talassemia beta menor": "Microcitose acentuada com Hb pouco baixa e HbA2 aumentada; ferritina normal.",
            "Anemia falciforme": "HbS: crises vaso-oclusivas, hemólise e asplenia funcional. Triada no teste do pezinho.",
            "Esferocitose hereditária": "Esferócitos, CHCM alto e esplenomegalia; Coombs negativo.",
            "Deficiência de G6PD": "Hemólise após oxidantes (primaquina, sulfas, fava); corpúsculos de Heinz.",
            "Anemia aplásica": "Pancitopenia com medula hipocelular na biópsia; reticulócitos baixos.",
            "Hemolítica autoimune": "Anticorpos contra hemácias: Coombs direto positivo e esferócitos. Trata com corticoide.",
        },
        "perguntas": [
            ("É microcítica?", ["Ferropriva", "Talassemia beta menor"]),
            ("É macrocítica?", ["Deficiência de B12", "Deficiência de folato"]),
            ("Ferritina baixa?", ["Ferropriva"]),
            ("Ferro baixo com ferritina normal ou alta?", ["Anemia de doença crônica"]),
            ("Causa sintomas neurológicos?", ["Deficiência de B12"]),
            ("É hereditária?",
             ["Talassemia beta menor", "Anemia falciforme", "Esferocitose hereditária",
              "Deficiência de G6PD"]),
            ("HbA2 aumentada na eletroforese?", ["Talassemia beta menor"]),
            ("Crises vaso-oclusivas dolorosas?", ["Anemia falciforme"]),
            ("Hemólise após primaquina, sulfas ou fava?", ["Deficiência de G6PD"]),
            ("Esferócitos no sangue periférico?", ["Esferocitose hereditária", "Hemolítica autoimune"]),
            ("Coombs direto positivo?", ["Hemolítica autoimune"]),
            ("Pancitopenia com medula hipocelular?", ["Anemia aplásica"]),
        ],
    },
    {
        "id": "qs-hepatites",
        "titulo": "Hepatites virais e outras hepatopatias",
        "notas": {
            "Hepatite A": "Fecal-oral, aguda e autolimitada; não cronifica. Vacina no PNI aos 15 meses.",
            "Hepatite B": "Vírus de DNA, transmissão sexual, parenteral e vertical. Vacina ao nascer.",
            "Hepatite C": "Parenteral; cronifica na maioria. Antivirais de ação direta curam > 95%.",
            "Hepatite D": "Vírus defectivo: só infecta quem tem HBV. Relevante na Amazônia ocidental.",
            "Hepatite E": "Fecal-oral, em geral autolimitada, mas grave em gestantes.",
            "Hepatite autoimune": "Mulheres jovens, IgG alta e anticorpo antimúsculo liso; responde a corticoide.",
            "Hepatite alcoólica": "AST/ALT > 2, com AST raramente > 300; icterícia em etilista pesado.",
            "Hepatite por paracetamol": "Lesão aguda com transaminases muito altas; antídoto: N-acetilcisteína.",
            "Doença de Wilson": "Acúmulo de cobre: ceruloplasmina baixa e anel de Kayser-Fleischer.",
        },
        "perguntas": [
            ("É causada por vírus?",
             ["Hepatite A", "Hepatite B", "Hepatite C", "Hepatite D", "Hepatite E"]),
            ("Transmissão fecal-oral?", ["Hepatite A", "Hepatite E"]),
            ("Transmissão sexual ou parenteral?", ["Hepatite B", "Hepatite C", "Hepatite D"]),
            ("Tem vacina no calendário do PNI?", ["Hepatite A", "Hepatite B"]),
            ("O vírus é de DNA?", ["Hepatite B"]),
            ("Só infecta quem já tem o vírus B?", ["Hepatite D"]),
            ("Antivirais de ação direta curam > 95%?", ["Hepatite C"]),
            ("Especialmente grave em gestantes?", ["Hepatite E"]),
            ("Anticorpo antimúsculo liso e IgG alta?", ["Hepatite autoimune"]),
            ("AST/ALT maior que 2?", ["Hepatite alcoólica"]),
            ("Antídoto é a N-acetilcisteína?", ["Hepatite por paracetamol"]),
            ("Anel de Kayser-Fleischer?", ["Doença de Wilson"]),
            ("É doença genética?", ["Doença de Wilson"]),
        ],
    },
    {
        "id": "qs-pneumonias",
        "titulo": "Pneumonias por agente",
        "notas": {
            "Pneumococo": "Principal causa de pneumonia comunitária; diplococo Gram-positivo; consolidação lobar.",
            "Haemophilus influenzae": "Cocobacilo Gram-negativo, comum em DPOC e tabagistas.",
            "Staphylococcus aureus": "Pós-influenza e em usuários de drogas IV; pneumatoceles e abscessos.",
            "Klebsiella": "Etilistas e diabéticos; escarro em geleia de groselha e abaulamento de cisura.",
            "Pseudomonas": "Hospitalar, ventilação mecânica, fibrose cística e bronquiectasias.",
            "Mycoplasma": "Atípica em jovens; aglutininas frias e miringite bolhosa. Betalactâmico não age.",
            "Legionella": "Atípica grave: diarreia, hiponatremia; ar-condicionado. Antígeno urinário.",
            "Pneumocystis": "Fungo em HIV com CD4 < 200; hipoxemia e infiltrado intersticial. Trata com SMX-TMP.",
            "Anaeróbios": "Após aspiração (etilismo, disfagia); escarro pútrido e abscesso pulmonar.",
        },
        "perguntas": [
            ("Causa mais comum de pneumonia comunitária?", ["Pneumococo"]),
            ("É um agente atípico?", ["Mycoplasma", "Legionella"]),
            ("É bactéria Gram-positiva?", ["Pneumococo", "Staphylococcus aureus"]),
            ("É bactéria Gram-negativa?",
             ["Haemophilus influenzae", "Klebsiella", "Pseudomonas", "Legionella"]),
            ("É um fungo?", ["Pneumocystis"]),
            ("Diplococo lanceolado?", ["Pneumococo"]),
            ("Pneumatoceles após gripe (influenza)?", ["Staphylococcus aureus"]),
            ("Escarro em geleia de groselha?", ["Klebsiella"]),
            ("Típica em fibrose cística e hospitalar?", ["Pseudomonas"]),
            ("Hiponatremia e ligada a ar-condicionado?", ["Legionella"]),
            ("Aglutininas frias e miringite bolhosa?", ["Mycoplasma"]),
            ("Típica de HIV com CD4 < 200?", ["Pneumocystis"]),
            ("Escarro pútrido após aspiração?", ["Anaeróbios"]),
            ("Cocobacilo comum na DPOC?", ["Haemophilus influenzae"]),
        ],
    },
    {
        "id": "qs-tireoide",
        "titulo": "Doenças da tireoide",
        "notas": {
            "Doença de Graves": "Autoimune (TRAb): hipertireoidismo, bócio difuso, oftalmopatia e mixedema pré-tibial.",
            "Tireoidite de Hashimoto": "Principal causa de hipotireoidismo onde há iodo suficiente; anti-TPO positivo.",
            "Tireoidite subaguda": "De Quervain: tireoide dolorosa após virose, VHS alta, captação baixa.",
            "Bócio multinodular tóxico": "Idosos: vários nódulos autônomos causando hipertireoidismo.",
            "Adenoma tóxico": "Doença de Plummer: nódulo único quente que suprime o resto da glândula.",
            "Carcinoma papilífero": "Câncer de tireoide mais comum; corpos psamomatosos, disseminação linfática.",
            "Carcinoma medular": "Células C: calcitonina elevada; pode ser familiar (NEM 2, gene RET).",
            "Tireoidite pós-parto": "Autoimune, até 1 ano após o parto; tireotoxicose e depois hipotireoidismo.",
            "Carcinoma anaplásico": "Idosos, massa cervical de crescimento muito rápido; prognóstico muito ruim.",
        },
        "perguntas": [
            ("Pode causar tireotoxicose?",
             ["Doença de Graves", "Tireoidite subaguda", "Bócio multinodular tóxico",
              "Adenoma tóxico", "Tireoidite pós-parto"]),
            ("É autoimune?", ["Doença de Graves", "Tireoidite de Hashimoto", "Tireoidite pós-parto"]),
            ("Principal causa de hipotireoidismo?", ["Tireoidite de Hashimoto"]),
            ("Oftalmopatia e mixedema pré-tibial?", ["Doença de Graves"]),
            ("Tireoide dolorosa após virose?", ["Tireoidite subaguda"]),
            ("Captação de iodo radioativo baixa?", ["Tireoidite subaguda", "Tireoidite pós-parto"]),
            ("Nódulo único hipercaptante (quente)?", ["Adenoma tóxico"]),
            ("Vários nódulos autônomos em idoso?", ["Bócio multinodular tóxico"]),
            ("É uma neoplasia maligna?",
             ["Carcinoma papilífero", "Carcinoma medular", "Carcinoma anaplásico"]),
            ("Corpos psamomatosos na histologia?", ["Carcinoma papilífero"]),
            ("Calcitonina elevada?", ["Carcinoma medular"]),
            ("Associado à NEM 2?", ["Carcinoma medular"]),
            ("Crescimento muito rápido em idoso?", ["Carcinoma anaplásico"]),
            ("Surge até 1 ano após o parto?", ["Tireoidite pós-parto"]),
        ],
    },
    {
        "id": "qs-icterneo",
        "titulo": "Causas de icterícia neonatal",
        "notas": {
            "Icterícia fisiológica": "Surge após 24 h, pico no 3º–5º dia e some em até 2 semanas no RN saudável.",
            "Icterícia do leite materno": "Após a 1ª semana em RN bem, mamando e ganhando peso; manter o aleitamento.",
            "Isoimunização Rh": "Mãe Rh- sensibilizada: hemólise grave, icterícia < 24 h, hidropsia. Prevenção: imunoglobulina anti-D.",
            "Incompatibilidade ABO": "Mãe O e RN A ou B; hemólise em geral mais leve que a do Rh, já no 1º filho.",
            "Deficiência de G6PD": "Hemólise após oxidantes (naftalina, sulfas); ligada ao X, mais em meninos.",
            "Esferocitose hereditária": "Hemólise com esferócitos e história familiar; pode exigir exsanguineotransfusão.",
            "Atresia de vias biliares": "Colestase com acolia e colúria; cirurgia de Kasai antes de 60 dias de vida.",
            "Síndrome de Crigler-Najjar": "Falta genética da UGT1A1: bilirrubina indireta muito alta e risco de kernicterus.",
            "Hipotireoidismo congênito": "Icterícia prolongada, hérnia umbilical e macroglossia; TSH alto no pezinho.",
        },
        "perguntas": [
            ("Surge nas primeiras 24 h de vida?", ["Isoimunização Rh", "Incompatibilidade ABO"]),
            ("É causa hemolítica?",
             ["Isoimunização Rh", "Incompatibilidade ABO", "Deficiência de G6PD",
              "Esferocitose hereditária"]),
            ("Mãe Rh negativo sensibilizada?", ["Isoimunização Rh"]),
            ("Mãe tipo O e RN A ou B?", ["Incompatibilidade ABO"]),
            ("É hereditária (genética)?",
             ["Deficiência de G6PD", "Esferocitose hereditária", "Síndrome de Crigler-Najjar"]),
            ("É deficiência de uma enzima?", ["Deficiência de G6PD", "Síndrome de Crigler-Najjar"]),
            ("Hemólise após naftalina ou sulfas?", ["Deficiência de G6PD"]),
            ("Falta genética da UGT1A1?", ["Síndrome de Crigler-Najjar"]),
            ("Bilirrubina direta (conjugada) elevada?", ["Atresia de vias biliares"]),
            ("Tratada com a cirurgia de Kasai?", ["Atresia de vias biliares"]),
            ("Após 24 h e some em até 2 semanas?", ["Icterícia fisiológica"]),
            ("Ligada à amamentação, após a 1ª semana?", ["Icterícia do leite materno"]),
            ("TSH elevado no teste do pezinho?", ["Hipotireoidismo congênito"]),
        ],
    },
]


def montar():
    grupos = []
    for g in GRUPOS:
        grupos.append({
            "id": g["id"],
            "titulo": g["titulo"],
            "doencas": list(g["notas"].keys()),
            "perguntas": [{"txt": t, "sim": s} for t, s in g["perguntas"]],
            "notas": g["notas"],
        })
    return grupos


def validar(grupos):
    erros = []
    if len(grupos) != N_GRUPOS:
        erros.append(f"esperado {N_GRUPOS} grupos, há {len(grupos)}")
    for g in grupos:
        gid, doencas = g["id"], g["doencas"]
        if not MIN_DOENCAS <= len(doencas) <= MAX_DOENCAS:
            erros.append(f"{gid}: {len(doencas)} doenças")
        if not MIN_PERG <= len(g["perguntas"]) <= MAX_PERG:
            erros.append(f"{gid}: {len(g['perguntas'])} perguntas")
        txts = [p["txt"] for p in g["perguntas"]]
        if len(set(txts)) != len(txts):
            erros.append(f"{gid}: perguntas repetidas")
        for p in g["perguntas"]:
            if len(p["txt"]) > MAX_PERGUNTA:
                erros.append(f"{gid}: pergunta com {len(p['txt'])} car.: {p['txt']}")
            fora = set(p["sim"]) - set(doencas)
            if fora:
                erros.append(f"{gid}: '{p['txt']}' cita doença fora do grupo: {fora}")
            if not p["sim"] or len(p["sim"]) == len(doencas):
                erros.append(f"{gid}: '{p['txt']}' não separa nada")
        assinatura = {d: tuple(d in p["sim"] for p in g["perguntas"]) for d in doencas}
        for a, b in itertools.combinations(doencas, 2):
            if assinatura[a] == assinatura[b]:
                erros.append(f"{gid}: '{a}' e '{b}' indistinguíveis")
        for d in doencas:
            nota = g["notas"].get(d)
            if not nota:
                erros.append(f"{gid}: sem nota para {d}")
            elif len(nota) > MAX_NOTA:
                erros.append(f"{gid}: nota de {d} com {len(nota)} car.")
    return erros


def main():
    grupos = montar()
    erros = validar(grupos)
    if erros:
        print("\n".join(erros))
        sys.exit(1)
    destino = os.path.join(os.path.dirname(os.path.abspath(__file__)), "quemsou.json")
    with open(destino, "w", encoding="utf-8") as f:
        json.dump({"grupos": grupos}, f, ensure_ascii=False, indent=1)
        f.write("\n")
    for g in grupos:
        print(f"  {g['id']}: {len(g['doencas'])} doenças, {len(g['perguntas'])} perguntas")
    print(f"OK: {len(grupos)} grupos -> {destino}")


if __name__ == "__main__":
    main()
