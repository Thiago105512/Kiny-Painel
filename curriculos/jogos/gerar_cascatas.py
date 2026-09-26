#!/usr/bin/env python3
"""Gera curriculos/jogos/cascatas.json (jogo "Cascata") e valida o conteúdo.

Cada cascata: 5 a 7 passos na ORDEM CORRETA (o app embaralha).
Uso: python3 curriculos/jogos/gerar_cascatas.py
"""
import json
import os
import sys

N_CASCATAS = 36
MIN_PASSOS, MAX_PASSOS = 5, 7
MAX_PASSO = 60
MAX_EXPL = 240
AREAS = {"fisiologia", "fisiopatologia", "farmacologia", "microbiologia",
         "procedimento", "embriologia", "clinica"}

# (titulo, area, nivel, [passos em ordem], explicacao)
CASCATAS = [
    ("Sistema renina-angiotensina-aldosterona", "fisiologia", 1, [
        "Queda da perfusão renal ou do Na+ na mácula densa",
        "Células justaglomerulares liberam renina",
        "Renina converte angiotensinogênio em angiotensina I",
        "ECA (pulmão) converte angiotensina I em II",
        "Angiotensina II estimula a secreção de aldosterona",
        "Aldosterona reabsorve Na+ e água no ducto coletor",
        "Volemia e pressão arterial sobem",
    ], "O angiotensinogênio vem do fígado e a ECA está no endotélio, sobretudo pulmonar. "
       "IECA e BRA bloqueiam o eixo; espironolactona bloqueia a aldosterona."),

    ("Coagulação: via comum", "fisiologia", 2, [
        "Fator X é ativado em Xa",
        "Xa se une ao Va: complexo protrombinase",
        "Protrombina (II) é convertida em trombina",
        "Trombina cliva fibrinogênio em fibrina",
        "Monômeros de fibrina se polimerizam",
        "Fator XIIIa estabiliza a fibrina (ligações cruzadas)",
    ], "As vias intrínseca (TTPa) e extrínseca (TP) convergem no fator X. "
       "Rivaroxabana e apixabana inibem o Xa; dabigatrana inibe a trombina."),

    ("Potencial de ação do miócito ventricular", "fisiologia", 2, [
        "Repouso (fase 4) em cerca de -90 mV",
        "Estímulo de célula vizinha atinge o limiar",
        "Fase 0: abrem canais rápidos de Na+",
        "Fase 1: saída transitória de K+",
        "Fase 2: platô com entrada de Ca2+ (canal L)",
        "Fase 3: saída de K+ repolariza a célula",
    ], "O platô prolonga o período refratário e impede a tetania cardíaca. "
       "Antiarrítmicos classe I agem na fase 0 e classe III prolongam a fase 3."),

    ("Ciclo do Plasmodium no ser humano", "microbiologia", 1, [
        "Anopheles fêmea inocula esporozoítos na pele",
        "Esporozoítos invadem hepatócitos",
        "Esquizogonia hepática gera merozoítos",
        "Merozoítos invadem hemácias",
        "Trofozoíto vira esquizonte na hemácia",
        "Hemácias rompem e liberam merozoítos: febre",
        "Parte vira gametócito, ingerido pelo mosquito",
    ], "No P. vivax, hipnozoítos ficam latentes no fígado e causam recaídas: "
       "por isso a primaquina (ou tafenoquina) entra no tratamento."),

    ("Doença de Chagas por via oral", "microbiologia", 2, [
        "Triatomíneo ou fezes contaminam açaí ou caldo de cana",
        "Tripomastigotas metacíclicos são ingeridos",
        "Parasitas invadem a mucosa gástrica",
        "Na célula viram amastigotas e se multiplicam",
        "Amastigotas viram tripomastigotas e rompem a célula",
        "Tripomastigotas no sangue: fase aguda da doença",
    ], "É a principal forma de transmissão na Amazônia, com surtos familiares. "
       "Branqueamento/pasteurização do açaí previne. Tratar com benznidazol."),

    ("Síntese dos hormônios tireoidianos", "fisiologia", 2, [
        "Iodeto entra no tireócito pelo simportador NIS",
        "Pendrina transporta o iodeto para o coloide",
        "TPO oxida o iodo e iodina a tireoglobulina",
        "TPO acopla MIT e DIT, formando T3 e T4",
        "Tireoglobulina volta ao tireócito por endocitose",
        "Proteólise libera T3 e T4 no sangue",
    ], "O TSH estimula todas as etapas. Metimazol e PTU inibem a TPO; "
       "o PTU também reduz a conversão periférica de T4 em T3."),

    ("Cetoacidose diabética", "fisiopatologia", 2, [
        "Deficiência de insulina com excesso de glucagon",
        "Lipólise aumentada libera ácidos graxos",
        "Fígado oxida ácidos graxos em corpos cetônicos",
        "Cetoácidos consomem o bicarbonato",
        "Acidose metabólica com ânion gap elevado",
        "Respiração de Kussmaul compensa a acidose",
    ], "Em paralelo, a hiperglicemia causa diurese osmótica e desidratação. "
       "Tratamento: volume, insulina e reposição de potássio."),

    ("Choque séptico", "fisiopatologia", 2, [
        "PAMPs do patógeno ativam receptores (TLR)",
        "Liberação maciça de citocinas (TNF, IL-1, IL-6)",
        "Óxido nítrico causa vasodilatação e extravasamento",
        "Queda da resistência vascular: hipotensão",
        "Hipoperfusão tecidual eleva o lactato",
        "Disfunção de múltiplos órgãos",
    ], "Choque séptico: vasopressor para PAM ≥ 65 mmHg e lactato > 2 mmol/L "
       "apesar de volume. Antibiótico na 1ª hora; noradrenalina é a 1ª escolha."),

    ("Crise de asma alérgica", "fisiopatologia", 2, [
        "Célula dendrítica capta o alérgeno inalado",
        "Linfócitos Th2 são ativados (IL-4, IL-5, IL-13)",
        "Plasmócitos produzem IgE, que cobre os mastócitos",
        "Nova exposição: alérgeno degranula o mastócito",
        "Histamina e leucotrienos: broncoconstrição",
        "Fase tardia: eosinófilos mantêm a inflamação",
    ], "Broncodilatador alivia a fase imediata; corticoide inalado controla a "
       "inflamação tardia e é a base do tratamento de manutenção."),

    ("Da aterosclerose ao infarto", "fisiopatologia", 1, [
        "Lesão endotelial (HAS, fumo, dislipidemia)",
        "LDL entra na íntima e é oxidada",
        "Macrófagos fagocitam o LDL oxidado",
        "Células espumosas formam a estria gordurosa",
        "Músculo liso migra e forma a capa fibrosa",
        "Placa instável se rompe",
        "Trombo oclusivo causa necrose: IAM",
    ], "Placas com capa fina e núcleo lipídico grande rompem mais. "
       "Estatina estabiliza a placa; AAS e reperfusão tratam o trombo."),

    ("Cirrose até a ascite", "fisiopatologia", 3, [
        "Fibrose distorce os sinusoides hepáticos",
        "Maior resistência gera hipertensão portal",
        "Vasodilatação esplâncnica (óxido nítrico)",
        "Queda do volume arterial efetivo",
        "Ativação do SRAA, simpático e ADH",
        "Rins retêm sódio e água",
        "Líquido extravasa para o peritônio: ascite",
    ], "GASA ≥ 1,1 g/dL indica ascite por hipertensão portal. "
       "Tratamento: restrição de sódio, espironolactona ± furosemida, paracentese."),

    ("Formação da urina no néfron", "fisiologia", 1, [
        "Filtração do plasma no glomérulo",
        "Túbulo proximal reabsorve ~65% do Na+ e a glicose",
        "Ramo descendente de Henle reabsorve água",
        "Ramo ascendente espesso: cotransporte Na-K-2Cl",
        "Túbulo distal reabsorve NaCl e cálcio",
        "Ducto coletor ajusta água (ADH) e Na+ (aldosterona)",
    ], "Cada segmento é alvo de um diurético: acetazolamida (proximal), "
       "furosemida (alça), tiazídico (distal), espironolactona (coletor)."),

    ("Digestão e absorção de gordura", "fisiologia", 1, [
        "Lipases lingual e gástrica iniciam a digestão",
        "Bile emulsifica a gordura no duodeno",
        "Lipase pancreática gera ácidos graxos e monoglicerídeos",
        "Micelas levam os lipídios à borda em escova",
        "Enterócito ressintetiza triglicerídeos",
        "Triglicerídeos são empacotados em quilomícrons",
        "Quilomícrons entram nos linfáticos (lácteos)",
    ], "Falta de bile ou de lipase pancreática causa esteatorreia e "
       "deficiência de vitaminas lipossolúveis (A, D, E, K)."),

    ("Resposta imune humoral adaptativa", "fisiologia", 2, [
        "Célula dendrítica captura o antígeno no tecido",
        "Migra ao linfonodo e apresenta via MHC II",
        "Linfócito T CD4+ é ativado",
        "T auxiliar ativa o linfócito B específico",
        "Linfócito B prolifera e vira plasmócito",
        "Plasmócitos secretam anticorpos",
        "Anticorpos neutralizam e opsonizam o antígeno",
    ], "Também surgem linfócitos B de memória, base da resposta mais rápida "
       "na reexposição e do efeito das vacinas."),

    ("Hemostasia primária", "fisiologia", 1, [
        "Lesão endotelial expõe o colágeno",
        "vWF liga a plaqueta ao colágeno (GP Ib)",
        "Plaquetas se ativam e mudam de forma",
        "Liberam ADP e tromboxano A2",
        "Novas plaquetas são recrutadas",
        "GP IIb/IIIa liga fibrinogênio: tampão plaquetário",
    ], "AAS bloqueia o tromboxano A2; clopidogrel bloqueia o receptor de ADP. "
       "Doença de von Willebrand prejudica a adesão."),

    ("ACLS na fibrilação ventricular", "procedimento", 2, [
        "Confirmar PCR e iniciar RCP de alta qualidade",
        "Monitor/desfibrilador mostra FV",
        "1º choque (bifásico 120–200 J)",
        "RCP imediata por 2 minutos",
        "Ritmo ainda chocável: 2º choque",
        "Adrenalina 1 mg IV/IO após o 2º choque",
        "Amiodarona 300 mg após o 3º choque",
    ], "Adrenalina se repete a cada 3–5 min; amiodarona 2ª dose de 150 mg. "
       "Nunca interromper a RCP por mais de 10 s."),

    ("Sequência rápida de intubação", "procedimento", 2, [
        "Preparar material, drogas, monitor e plano B",
        "Pré-oxigenar com O2 a 100% por 3 minutos",
        "Indução com hipnótico (etomidato, cetamina)",
        "Bloqueador neuromuscular (succinilcolina, rocurônio)",
        "Aguardar 45–60 s até o relaxamento muscular",
        "Laringoscopia e passagem do tubo",
        "Confirmar posição com capnografia",
    ], "Otimizar a hemodinâmica ocorre em paralelo à pré-oxigenação. Hipnótico e "
       "bloqueador vêm em sequência imediata; capnografia é o padrão-ouro de confirmação."),

    ("Atendimento inicial ao trauma (XABCDE)", "procedimento", 1, [
        "X: conter hemorragia exsanguinante",
        "A: via aérea com proteção da coluna cervical",
        "B: respiração e ventilação",
        "C: circulação e controle de sangramento",
        "D: avaliação neurológica (Glasgow, pupilas)",
        "E: exposição e prevenção de hipotermia",
    ], "Só se passa à etapa seguinte após tratar o problema encontrado. "
       "O X (torniquete, compressão) entrou no PHTLS por matar em minutos."),

    ("Ciclo menstrual", "fisiologia", 1, [
        "Dia 1: menstruação, hormônios ovarianos baixos",
        "FSH recruta folículos (fase folicular)",
        "Folículo dominante eleva o estradiol",
        "Pico de LH",
        "Ovulação cerca de 36 h após o início do pico",
        "Corpo lúteo secreta progesterona (fase lútea)",
        "Sem gravidez, o corpo lúteo regride",
    ], "A fase lútea dura cerca de 14 dias e é a mais constante. "
       "Com gravidez, o hCG mantém o corpo lúteo."),

    ("Mecanismo do parto (cefálico)", "clinica", 2, [
        "Insinuação (com flexão da cabeça)",
        "Descida pela pelve",
        "Rotação interna",
        "Desprendimento da cabeça (deflexão)",
        "Rotação externa (restituição)",
        "Desprendimento dos ombros e do corpo",
    ], "São os tempos do mecanismo de parto na apresentação cefálica fletida. "
       "A rotação interna leva o occipício ao púbis."),

    ("Períodos clínicos do parto", "clinica", 1, [
        "Fase latente: contrações irregulares",
        "Dilatação (fase ativa)",
        "Expulsão do feto",
        "Dequitação (saída da placenta)",
        "Greenberg: 1ª hora pós-parto",
    ], "O 4º período (Greenberg) é o de maior risco de hemorragia pós-parto. "
       "Ocitocina 10 UI IM logo após o nascimento é a profilaxia."),

    ("Desenvolvimento embrionário inicial", "embriologia", 1, [
        "Fecundação na ampola da tuba: zigoto",
        "Clivagem em blastômeros",
        "Mórula",
        "Blastocisto (embrioblasto e trofoblasto)",
        "Início da implantação no endométrio (6º–7º dia)",
        "Disco bilaminar (epiblasto e hipoblasto)",
        "Gastrulação: disco trilaminar",
    ], "A gastrulação, na 3ª semana, forma ectoderma, mesoderma e endoderma "
       "a partir do epiblasto, pela linha primitiva."),

    ("Eritropoiese", "fisiologia", 2, [
        "Hipóxia renal estimula a liberação de EPO",
        "EPO age nas progenitoras eritroides",
        "Proeritroblasto",
        "Eritroblastos sintetizam hemoglobina",
        "Núcleo é expulso",
        "Reticulócito sai para o sangue",
        "Amadurece em hemácia em 1–2 dias",
    ], "Reticulócitos altos indicam medula respondendo (hemólise, sangramento). "
       "Na doença renal crônica falta EPO: anemia normocítica."),

    ("Metabolismo da bilirrubina", "fisiologia", 1, [
        "Macrófagos degradam hemácias senescentes",
        "Heme-oxigenase converte heme em biliverdina",
        "Biliverdina vira bilirrubina não conjugada",
        "Liga-se à albumina e chega ao fígado",
        "UGT1A1 conjuga com ácido glicurônico",
        "Bilirrubina conjugada é excretada na bile",
        "Bactérias formam urobilinogênio e estercobilina",
    ], "Hemólise eleva a indireta; obstrução biliar eleva a direta, com colúria "
       "e acolia. Gilbert: redução leve da UGT1A1."),

    ("Contração do músculo esquelético", "fisiologia", 2, [
        "Neurônio motor libera acetilcolina",
        "ACh ativa receptores nicotínicos da placa",
        "Potencial de ação percorre os túbulos T",
        "Receptor DHP abre o RyR: Ca2+ sai do retículo",
        "Ca2+ liga a troponina C e expõe a actina",
        "Pontes cruzadas de miosina deslizam os filamentos",
    ], "O relaxamento exige ATP e recaptação do Ca2+ pela SERCA. "
       "Na miastenia gravis, anticorpos bloqueiam o receptor nicotínico."),

    ("Secreção de insulina pela célula beta", "fisiologia", 2, [
        "Glicose entra na célula beta (GLUT2)",
        "Metabolismo da glicose eleva o ATP",
        "ATP fecha canais de K+ sensíveis a ATP",
        "Membrana despolariza",
        "Canais de Ca2+ voltagem-dependentes se abrem",
        "Entrada de Ca2+ dispara exocitose de insulina",
    ], "Sulfonilureias fecham o canal de K-ATP sem depender da glicose, "
       "por isso causam hipoglicemia."),

    ("Caminho de um fármaco oral", "farmacologia", 1, [
        "Comprimido se desintegra e dissolve no TGI",
        "Absorção pela mucosa intestinal",
        "Veia porta leva ao fígado: 1ª passagem",
        "Chega à circulação sistêmica",
        "Distribui-se aos tecidos e ao sítio de ação",
        "Eliminação renal do fármaco e metabólitos",
    ], "O efeito de primeira passagem reduz a biodisponibilidade oral. "
       "Vias sublingual e IV escapam dele."),

    ("Ação do omeprazol", "farmacologia", 2, [
        "Pró-fármaco é absorvido e chega à célula parietal",
        "Acumula-se nos canalículos ácidos",
        "Meio ácido o converte na forma ativa",
        "Liga-se de forma covalente à H+/K+-ATPase",
        "Bloqueia a etapa final da secreção ácida",
    ], "Por precisar de ácido para ativar, deve ser tomado 30–60 min antes do "
       "café da manhã. O efeito dura até a síntese de novas bombas."),

    ("Intoxicação por paracetamol", "farmacologia", 3, [
        "Dose tóxica satura glicuronidação e sulfatação",
        "Mais fármaco vai ao citocromo CYP2E1",
        "Forma-se o metabólito tóxico NAPQI",
        "NAPQI esgota a glutationa hepática",
        "NAPQI se liga às proteínas do hepatócito",
        "Necrose centrolobular (zona 3)",
    ], "N-acetilcisteína repõe a glutationa; é mais eficaz nas primeiras 8 h. "
       "Use o nomograma de Rumack-Matthew."),

    ("Replicação do HIV", "microbiologia", 2, [
        "gp120 liga CD4 e correceptor (CCR5/CXCR4)",
        "gp41 faz a fusão do envelope",
        "Transcriptase reversa: RNA vira DNA",
        "Integrase insere o DNA viral no genoma",
        "Transcrição e tradução de proteínas virais",
        "Montagem e brotamento na membrana",
        "Protease cliva poliproteínas: vírion maduro",
    ], "Cada etapa é alvo de antirretrovirais: tenofovir (TR), dolutegravir "
       "(integrase), inibidores de protease, maraviroque (CCR5)."),

    ("Ciclo da Leishmania no ser humano", "microbiologia", 2, [
        "Flebotomíneo fêmea inocula promastigotas",
        "Macrófagos fagocitam as promastigotas",
        "Viram amastigotas no fagolisossomo",
        "Amastigotas se multiplicam e rompem o macrófago",
        "Infectam novos macrófagos",
        "Flebotomíneo ingere macrófagos infectados",
    ], "Na Amazônia predomina a leishmaniose tegumentar (L. guyanensis, "
       "L. braziliensis). O mosquito-palha pica ao entardecer."),

    ("Ciclo do Ascaris lumbricoides", "microbiologia", 1, [
        "Ingestão de ovos embrionados",
        "Larvas eclodem no intestino delgado",
        "Atravessam a parede e vão ao fígado pelo sangue",
        "Chegam aos pulmões (síndrome de Löffler)",
        "Sobem pelos brônquios e são deglutidas",
        "Viram vermes adultos no intestino delgado",
        "Fêmeas eliminam ovos nas fezes",
    ], "O ciclo pulmonar explica tosse e eosinofilia (Löffler). "
       "Albendazol 400 mg dose única é o tratamento."),

    ("Neurulação", "embriologia", 2, [
        "Notocorda induz o ectoderma acima dela",
        "Forma-se a placa neural",
        "Bordas se elevam: pregas e sulco neural",
        "Pregas se fundem: tubo neural",
        "Neuróporo cranial fecha (cerca do dia 25)",
        "Neuróporo caudal fecha (cerca do dia 28)",
    ], "Falha no fechamento cranial causa anencefalia; no caudal, "
       "espinha bífida. Ácido fólico antes da concepção previne."),

    ("Cadeia de sobrevivência na PCR", "clinica", 1, [
        "Reconhecer a PCR e acionar o SAMU (192)",
        "RCP precoce de alta qualidade",
        "Desfibrilação rápida (DEA)",
        "Suporte avançado de vida",
        "Cuidados pós-PCR",
        "Recuperação e reabilitação",
    ], "Cadeia única da AHA (2025), para qualquer idade e local. Cada minuto sem "
       "RCP e desfibrilação reduz muito a chance de sobreviver à FV."),

    ("Punção venosa periférica", "procedimento", 1, [
        "Higienizar as mãos e identificar o paciente",
        "Garrotear acima do local escolhido",
        "Antissepsia da pele",
        "Puncionar com o bisel para cima",
        "Confirmar refluxo de sangue",
        "Soltar o garrote",
        "Fixar o cateter e descartar a agulha",
    ], "Não palpe o local após a antissepsia. Descarte a agulha direto na "
       "caixa de perfurocortantes, sem reencapar."),

    ("Pré-eclâmpsia", "fisiopatologia", 3, [
        "Invasão trofoblástica falha nas artérias espiraladas",
        "Isquemia placentária",
        "Placenta libera sFlt-1 (antiangiogênico)",
        "Disfunção endotelial materna",
        "HAS após 20 semanas, com proteinúria ou lesão de órgão",
        "Formas graves: HELLP ou eclâmpsia",
    ], "AAS em baixa dose e cálcio previnem em gestantes de risco. "
       "Sulfato de magnésio previne e trata a eclâmpsia."),
]


def validar(cascatas):
    erros = []
    if len(cascatas) != N_CASCATAS:
        erros.append(f"esperado {N_CASCATAS} cascatas, há {len(cascatas)}")
    titulos = [c["titulo"] for c in cascatas]
    if len(set(titulos)) != len(titulos):
        erros.append("títulos repetidos")
    for c in cascatas:
        cid = c["id"]
        if c["area"] not in AREAS:
            erros.append(f"{cid}: área inválida {c['area']}")
        if c["nivel"] not in (1, 2, 3):
            erros.append(f"{cid}: nível inválido")
        n = len(c["passos"])
        if not MIN_PASSOS <= n <= MAX_PASSOS:
            erros.append(f"{cid}: {n} passos")
        if len(set(c["passos"])) != n:
            erros.append(f"{cid}: passos repetidos")
        for p in c["passos"]:
            if len(p) > MAX_PASSO:
                erros.append(f"{cid}: passo com {len(p)} car.: {p}")
        if len(c["explicacao"]) > MAX_EXPL:
            erros.append(f"{cid}: explicação com {len(c['explicacao'])} car.")
    return erros


def main():
    cascatas = [
        {"id": f"cs-{i:02d}", "titulo": t, "area": a, "nivel": n,
         "passos": p, "explicacao": e}
        for i, (t, a, n, p, e) in enumerate(CASCATAS, 1)
    ]
    erros = validar(cascatas)
    if erros:
        print("\n".join(erros))
        sys.exit(1)
    destino = os.path.join(os.path.dirname(os.path.abspath(__file__)), "cascatas.json")
    with open(destino, "w", encoding="utf-8") as f:
        json.dump(cascatas, f, ensure_ascii=False, indent=1)
        f.write("\n")
    print(f"OK: {len(cascatas)} cascatas, "
          f"{sum(len(c['passos']) for c in cascatas)} passos -> {destino}")


if __name__ == "__main__":
    main()
