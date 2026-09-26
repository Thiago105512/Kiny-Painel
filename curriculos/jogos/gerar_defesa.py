#!/usr/bin/env python3
"""Gera curriculos/jogos/defesa.json (jogo "Defesa antimicrobiana") e valida.

Invasores (situações infecciosas) descem pela tela; o jogador escolhe, entre
4 armas (a certa + 3 sorteadas fora de "aceitaveis"), a que neutraliza cada um.
Condutas de 1ª linha no Brasil (MS/PCDTs, Guia de Vigilância, manuais de
malária, leishmanioses, hanseníase e TB; SBI/SBPT/Febrasgo).
Uso: python3 curriculos/jogos/gerar_defesa.py
"""
import json
import os
import re
import sys

MAX_NOME = 34
MAX_DETALHE = 90
MAX_PORQUE = 180
MAX_ARMADILHA = 120
POR_FASE = {1: 25, 2: 25, 3: 20}
TIPOS = {"bacteria", "virus", "fungo", "protozoario", "helminto"}

# (id, nome, classe, cor)
ARMAS = [
    ("sem-antibiotico", "Sem antibiótico (suporte)", "Conduta", "#9E9E9E"),
    ("drenagem-cirurgia", "Drenagem/cirurgia", "Conduta", "#795548"),
    ("amoxicilina", "Amoxicilina", "Penicilina", "#42A5F5"),
    ("amoxicilina-clavulanato", "Amoxicilina-clavulanato", "Penicilina + inibidor de betalactamase", "#1E88E5"),
    ("penicilina-g-benzatina", "Penicilina G benzatina", "Penicilina", "#1565C0"),
    ("penicilina-g-cristalina", "Penicilina G cristalina", "Penicilina", "#0D47A1"),
    ("oxacilina", "Oxacilina", "Penicilina antiestafilocócica", "#26C6DA"),
    ("cefalexina", "Cefalexina", "Cefalosporina 1ª geração", "#66BB6A"),
    ("ceftriaxona", "Ceftriaxona", "Cefalosporina 3ª geração", "#2E7D32"),
    ("piperacilina-tazobactam", "Piperacilina-tazobactam", "Penicilina antipseudomonas + inibidor", "#00897B"),
    ("meropenem", "Meropenem", "Carbapenêmico", "#C62828"),
    ("vancomicina", "Vancomicina", "Glicopeptídeo", "#AD1457"),
    ("metronidazol", "Metronidazol", "Nitroimidazol", "#8E24AA"),
    ("doxiciclina", "Doxiciclina", "Tetraciclina", "#F9A825"),
    ("azitromicina", "Azitromicina", "Macrolídeo", "#FB8C00"),
    ("nitrofurantoina", "Nitrofurantoína", "Nitrofurano", "#FDD835"),
    ("sulfametoxazol-trimetoprima", "Sulfametoxazol-trimetoprima", "Sulfonamida + inibidor de folato", "#EF6C00"),
    ("ciprofloxacino", "Ciprofloxacino", "Fluoroquinolona", "#D84315"),
    ("esquema-ripe", "Esquema RIPE", "Antituberculosos", "#5D4037"),
    ("pqt-u", "PQT-U", "Poliquimioterapia da hanseníase", "#6D4C41"),
    ("oseltamivir", "Oseltamivir", "Antiviral (inibidor de neuraminidase)", "#00ACC1"),
    ("aciclovir", "Aciclovir", "Antiviral (análogo de nucleosídeo)", "#0097A7"),
    ("nistatina", "Nistatina", "Antifúngico poliênico tópico", "#C0CA33"),
    ("fluconazol", "Fluconazol", "Antifúngico azólico", "#9CCC65"),
    ("anfotericina-b", "Anfotericina B", "Antifúngico poliênico sistêmico", "#FFB300"),
    ("benznidazol", "Benznidazol", "Antiprotozoário (tripanossomicida)", "#EC407A"),
    ("artemeter-lumefantrina", "Artemeter+lumefantrina", "Antimalárico (ACT)", "#D81B60"),
    ("cloroquina-primaquina", "Cloroquina+primaquina", "Antimalárico", "#E53935"),
    ("antimoniato-meglumina", "Antimoniato de meglumina", "Antimonial pentavalente", "#7E57C2"),
    ("pentamidina", "Pentamidina", "Diamidina aromática", "#5E35B1"),
    ("albendazol", "Albendazol", "Benzimidazol (anti-helmíntico)", "#8D6E63"),
    ("ivermectina", "Ivermectina", "Avermectina (anti-helmíntico)", "#A1887F"),
]

# (fase, tipo, nome, detalhe, certa, [aceitaveis], porque, armadilha)
INVASORES = [
    # ---------------- FASE 1: clássicos ----------------
    (1, "bacteria", "Faringite estreptocócica",
     "Criança de 8 anos, febre, exsudato amigdaliano, sem tosse, teste rápido positivo",
     "penicilina-g-benzatina", ["amoxicilina"],
     "S. pyogenes segue 100% sensível à penicilina. Benzatina IM dose única (ou amoxicilina 10 dias) previne febre reumática.",
     "Azitromicina: só na alergia à penicilina; há resistência crescente do estreptococo a macrolídeos."),
    (1, "virus", "Resfriado comum",
     "Adulto com coriza, espirros e tosse leve há 3 dias, afebril",
     "sem-antibiotico", [],
     "Infecção viral autolimitada (rinovírus). Hidratação, lavagem nasal e sintomáticos. Antibiótico não encurta nem previne complicações.",
     "Amoxicilina: secreção nasal amarelada não indica infecção bacteriana."),
    (1, "bacteria", "Sífilis primária",
     "Úlcera genital única, indolor, de fundo limpo; VDRL 1:32",
     "penicilina-g-benzatina", [],
     "Sífilis recente (primária, secundária, latente precoce): penicilina G benzatina 2,4 milhões UI IM dose única (PCDT IST).",
     "Doxiciclina: alternativa apenas na alergia à penicilina, fora da gestação."),
    (1, "bacteria", "Cistite não complicada",
     "Mulher de 25 anos, não gestante, disúria e polaciúria, sem febre ou dor lombar",
     "nitrofurantoina", [],
     "Nitrofurantoína 5 dias (ou fosfomicina) é 1ª linha: boa sensibilidade da E. coli e pouco dano colateral à microbiota.",
     "Ciprofloxacino: reservar para pielonefrite; resistência alta e efeitos adversos graves."),
    (1, "fungo", "Candidíase oral (sapinho)",
     "Lactente de 2 meses com placas brancas removíveis na língua e mucosa jugal",
     "nistatina", [],
     "Candidíase oral do lactente: nistatina suspensão oral tópica 4x/dia por 7 a 14 dias.",
     "Fluconazol: reservar para casos refratários ou imunossuprimidos."),
    (1, "virus", "Síndrome gripal em gestante",
     "Gestante de 20 semanas, febre súbita, tosse, mialgia há 1 dia",
     "oseltamivir", [],
     "Gestante é grupo de risco: oseltamivir 75 mg 12/12 h por 5 dias, idealmente até 48 h, sem esperar exame (MS).",
     "Azitromicina: influenza é viral; ATB só se houver pneumonia bacteriana secundária."),
    (1, "virus", "Herpes-zóster",
     "Idoso de 70 anos, vesículas dolorosas em faixa torácica unilateral há 48 h",
     "aciclovir", [],
     "Antiviral nas primeiras 72 h reduz dor aguda e duração das lesões, sobretudo em idosos (aciclovir 800 mg 5x/dia, 7 dias).",
     None),
    (1, "helminto", "Ancilostomíase",
     "Criança com anemia ferropriva; EPF com ovos de ancilostomídeo",
     "albendazol", [],
     "Albendazol 400 mg dose única é o tratamento de escolha para ancilostomídeos; tratar também a anemia com ferro.",
     "Ivermectina: eficácia baixa contra ancilostomídeos."),
    (1, "helminto", "Estrongiloidíase",
     "Diarreia e eosinofilia; larvas rabditoides de Strongyloides nas fezes",
     "ivermectina", [],
     "Ivermectina 200 mcg/kg é a droga de escolha contra Strongyloides stercoralis, com cura bem superior à do albendazol.",
     "Albendazol: taxa de cura bem menor contra Strongyloides."),
    (1, "protozoario", "Malária vivax",
     "Manaus, febre com calafrios em dias alternados; gota espessa: P. vivax",
     "cloroquina-primaquina", [],
     "Cloroquina 3 dias (esquizonticida) + primaquina 7 dias (elimina hipnozoítos e evita recaída). Guia de malária do MS.",
     "Artemeter+lumefantrina: esquema para P. falciparum; sozinho não elimina hipnozoítos do vivax."),
    (1, "protozoario", "Malária falciparum não grave",
     "Garimpeiro, febre alta; gota espessa: P. falciparum, sem sinais de gravidade",
     "artemeter-lumefantrina", [],
     "P. falciparum não complicado: artemeter+lumefantrina 3 dias + primaquina em dose única (gametocitocida).",
     "Cloroquina+primaquina: o P. falciparum é resistente à cloroquina na Amazônia."),
    (1, "bacteria", "Tuberculose pulmonar",
     "Tosse há 4 semanas, emagrecimento; TRM-TB detectável, sem resistência à rifampicina",
     "esquema-ripe", [],
     "Esquema básico: 2 meses de RIPE (rifampicina, isoniazida, pirazinamida, etambutol) + 4 meses de RI.",
     "Ciprofloxacino: quinolona em monoterapia gera resistência e não é esquema para TB."),
    (1, "bacteria", "Hanseníase multibacilar",
     "Múltiplas placas hipoestésicas e espessamento do nervo ulnar",
     "pqt-u", [],
     "Mais de 5 lesões ou nervo acometido: PQT-U (rifampicina, dapsona, clofazimina) por 12 doses mensais supervisionadas.",
     "Esquema RIPE: é para tuberculose; hanseníase usa PQT-U."),
    (1, "virus", "Diarreia aguda aquosa",
     "Criança de 3 anos, 4 evacuações líquidas/dia, sem sangue, hidratada",
     "sem-antibiotico", [],
     "Maioria viral e autolimitada. Plano A: soro de reidratação oral, manter alimentação e zinco. Antibiótico só se disenteria ou cólera.",
     "Metronidazol: não há indicação sem amebíase ou giardíase comprovada."),
    (1, "bacteria", "Abscesso cutâneo simples",
     "Nódulo flutuante de 3 cm na coxa, sem febre nem celulite ao redor",
     "drenagem-cirurgia", [],
     "Coleção purulenta se resolve com incisão e drenagem. Antibiótico fica para abscessos extensos, sinais sistêmicos ou imunossupressão.",
     "Cefalexina: antibiótico não penetra bem na coleção e não substitui a drenagem."),
    (1, "bacteria", "Otite média aguda",
     "Criança de 2 anos, otalgia, febre, tímpano abaulado; sem antibiótico recente",
     "amoxicilina", [],
     "Amoxicilina em dose alta (80 a 90 mg/kg/dia) é 1ª escolha: cobre bem pneumococo, principal agente.",
     "Amoxicilina-clavulanato: reservar para falha, ATB nos últimos 30 dias ou otite com conjuntivite."),
    (1, "bacteria", "Meningite bacteriana",
     "Adulto de 30 anos, febre, rigidez de nuca, líquor turvo com neutrófilos",
     "ceftriaxona", [],
     "Empírico no adulto imunocompetente: ceftriaxona 2 g 12/12 h (+ dexametasona). Não atrasar o ATB por exames.",
     "Vancomicina: associar só se suspeita de pneumococo resistente; sozinha não cobre meningococo."),
    (1, "bacteria", "Pneumonia comunitária leve",
     "Adulto de 35 anos, sem comorbidades, CURB-65 = 0, tratamento ambulatorial",
     "amoxicilina", ["azitromicina", "doxiciclina"],
     "PAC ambulatorial sem comorbidades: amoxicilina ou macrolídeo (doxiciclina como alternativa), por 5 a 7 dias.",
     "Ciprofloxacino: fraco contra pneumococo; quinolona respiratória fica para comorbidades."),
    (1, "protozoario", "Amebíase intestinal",
     "Disenteria com cólica; trofozoítos de E. histolytica nas fezes",
     "metronidazol", [],
     "Amebíase invasiva: metronidazol (tecidual) por 7 a 10 dias, seguido de amebicida luminal.",
     "Albendazol: sem ação contra Entamoeba histolytica."),
    (1, "protozoario", "Tricomoníase",
     "Corrimento amarelo-esverdeado bolhoso, colo em framboesa",
     "metronidazol", [],
     "Trichomonas vaginalis: metronidazol 2 g VO dose única ou 500 mg 12/12 h por 7 dias; tratar parceria sexual.",
     "Fluconazol: antifúngico, sem ação contra protozoário."),
    (1, "bacteria", "Vaginose bacteriana",
     "Corrimento acinzentado, odor de peixe, teste das aminas positivo, pH > 4,5",
     "metronidazol", [],
     "Metronidazol 500 mg 12/12 h por 7 dias (oral ou gel vaginal). Não é IST: não se trata a parceria.",
     "Fluconazol: trata candidíase, não a disbiose por Gardnerella."),
    (1, "fungo", "Candidíase vulvovaginal",
     "Corrimento branco grumoso, prurido intenso, pH vaginal < 4,5",
     "fluconazol", ["nistatina"],
     "Fluconazol 150 mg VO dose única ou azólico/nistatina creme vaginal por 7 a 14 dias; ambos 1ª linha no PCDT IST.",
     "Metronidazol: trata vaginose e tricomoníase; pode até precipitar candidíase."),
    (1, "virus", "Bronquiolite viral",
     "Lactente de 6 meses, coriza e sibilos, SpO2 95%, mamando bem",
     "sem-antibiotico", [],
     "Doença viral (VSR). Suporte: lavagem nasal, hidratação e O2 se SpO2 < 90-92%. Sem ATB, corticoide ou broncodilatador de rotina.",
     "Azitromicina: não altera o curso da bronquiolite."),
    (1, "bacteria", "Celulite não purulenta",
     "Placa quente e eritematosa na perna, sem abscesso, sem sinais sistêmicos",
     "cefalexina", ["amoxicilina-clavulanato"],
     "Celulite leve: tratamento oral contra estreptococo e S. aureus sensível. Cefalexina 500 mg 6/6 h por 5 a 7 dias.",
     "Vancomicina: celulite leve sem risco de MRSA não precisa de ATB venoso."),
    (1, "virus", "Dengue sem sinais de alarme",
     "Febre, mialgia, dor retro-orbitária, prova do laço negativa, sem alarme",
     "sem-antibiotico", [],
     "Grupo A: hidratação oral vigorosa, dipirona ou paracetamol. Evitar AINE e AAS. Retorno no fim da febre.",
     "Doxiciclina: não trata arbovirose; só se leptospirose for a hipótese."),

    # ---------------- FASE 2: intermediário ----------------
    (2, "protozoario", "Leishmaniose cutânea no Amazonas",
     "Úlcera de bordas elevadas na perna, Manaus; PCR: L. (V.) guyanensis",
     "pentamidina", [],
     "No AM predomina L. guyanensis, que responde melhor ao isetionato de pentamidina (esquema curto, IM) que ao antimonial.",
     "Antimoniato de meglumina: resposta pior contra L. guyanensis e mais toxicidade."),
    (2, "protozoario", "Leishmaniose cutânea braziliensis",
     "Úlcera indolor, adulto hígido do Pará; PCR: L. (V.) braziliensis",
     "antimoniato-meglumina", [],
     "L. braziliensis: antimoniato de meglumina 10 a 20 mg Sb/kg/dia por 20 dias segue como 1ª escolha fora de contraindicações.",
     "Pentamidina: preferida para L. guyanensis; contra L. braziliensis a resposta é inferior."),
    (2, "protozoario", "Calazar na gestante",
     "Gestante com febre, hepatoesplenomegalia e pancitopenia; rK39 +",
     "anfotericina-b", [],
     "Leishmaniose visceral na gestação: anfotericina B lipossomal. O antimonial é contraindicado (tóxico e abortivo).",
     "Antimoniato de meglumina: contraindicado na gestação."),
    (2, "protozoario", "Doença de Chagas aguda oral",
     "Surto familiar após açaí artesanal; febre, edema; tripomastigotas no sangue",
     "benznidazol", [],
     "Toda forma aguda deve ser tratada: benznidazol 5 mg/kg/dia (adulto) por 60 dias. Notificação imediata.",
     "Albendazol: anti-helmíntico, sem ação contra Trypanosoma cruzi."),
    (2, "virus", "Febre do Oropouche",
     "Manaus, febre, cefaleia intensa, mialgia; RT-PCR para OROV positivo",
     "sem-antibiotico", [],
     "Arbovirose sem antiviral específico: repouso, hidratação, analgésicos. Atenção a recidiva de sintomas e a gestantes.",
     "Doxiciclina: vírus não responde a ATB."),
    (2, "bacteria", "Neurossífilis",
     "HIV+, uveíte e VDRL reagente no líquor",
     "penicilina-g-cristalina", [],
     "Neurossífilis (inclui sífilis ocular): penicilina G cristalina 18 a 24 milhões UI/dia IV por 14 dias.",
     "Penicilina G benzatina: não atinge nível treponemicida no líquor."),
    (2, "bacteria", "Sífilis latente na gestante",
     "Gestante de 14 semanas, VDRL 1:8, teste treponêmico +, tempo desconhecido",
     "penicilina-g-benzatina", [],
     "Latente tardia ou de duração ignorada: benzatina 2,4 milhões UI/semana por 3 semanas. Única que trata o feto.",
     "Ceftriaxona: não é considerada tratamento adequado na gestante; o RN seria tratado como exposto."),
    (2, "bacteria", "Bacteriúria assintomática gestante",
     "16 semanas, assintomática; urocultura > 100 mil UFC de E. coli sensível",
     "cefalexina", ["nitrofurantoina", "amoxicilina", "amoxicilina-clavulanato"],
     "Na gestação a bacteriúria assintomática deve ser tratada (previne pielonefrite e parto prematuro), guiada pelo antibiograma.",
     "Sem antibiótico: é justamente a exceção em que se trata. Ciprofloxacino: evitado na gestação."),
    (2, "bacteria", "Pielonefrite aguda",
     "Febre 39 °C, dor lombar e vômitos; sem fatores de risco para multirresistente",
     "ceftriaxona", [],
     "Pielonefrite com vômitos exige terapia parenteral inicial: ceftriaxona 1 g/dia, depois VO conforme cultura.",
     "Meropenem: reservar para ESBL ou sepse com risco de multirresistência."),
    (2, "fungo", "Criptococose meníngea",
     "HIV com CD4 40, cefaleia há 2 semanas; tinta nanquim positiva no líquor",
     "anfotericina-b", [],
     "Indução com anfotericina B (+ flucitosina) e controle da pressão liquórica; fluconazol só na consolidação.",
     "Fluconazol: isolado na indução tem mortalidade maior."),
    (2, "fungo", "Pneumocistose",
     "HIV com CD4 90, dispneia progressiva, LDH alta, infiltrado intersticial bilateral",
     "sulfametoxazol-trimetoprima", [],
     "Pneumocystis jirovecii: SMX-TMP em dose alta por 21 dias (+ corticoide se PaO2 < 70 mmHg).",
     "Pentamidina: alternativa de 2ª linha, mais tóxica."),
    (2, "virus", "Encefalite herpética",
     "Febre, confusão e crise focal; RM com lesão em lobo temporal",
     "aciclovir", [],
     "Suspeitou, iniciar aciclovir IV 10 mg/kg 8/8 h imediatamente; atraso aumenta mortalidade e sequelas.",
     "Ceftriaxona: cobre meningite bacteriana, não o HSV."),
    (2, "bacteria", "Colite por C. difficile",
     "Diarreia após clindamicina, toxina A/B positiva, leucócitos 18 mil",
     "vancomicina", [],
     "Vancomicina ORAL 125 mg 6/6 h por 10 dias é 1ª linha; suspender o antibiótico causador se possível.",
     "Metronidazol: inferior à vancomicina oral, sobretudo em forma grave."),
    (2, "bacteria", "Uretrite por clamídia",
     "Homem com disúria e secreção mucoide; NAAT para C. trachomatis positivo",
     "azitromicina", ["doxiciclina"],
     "Chlamydia trachomatis: azitromicina 1 g VO dose única ou doxiciclina 100 mg 12/12 h por 7 dias. Tratar parcerias.",
     "Ceftriaxona: cobre gonococo, mas não clamídia (bactéria intracelular)."),
    (2, "bacteria", "Leptospirose grave",
     "Após enchente: icterícia rubínica, oligúria e sufusão conjuntival",
     "ceftriaxona", ["penicilina-g-cristalina"],
     "Forma grave (Weil): internar e iniciar penicilina G cristalina ou ceftriaxona IV, além de suporte renal.",
     "Doxiciclina: via oral é só para forma leve ambulatorial."),
    (2, "bacteria", "Leptospirose leve",
     "Febre e dor em panturrilhas após enchente, sem sinais de alerta",
     "doxiciclina", ["amoxicilina"],
     "Fase precoce ambulatorial: doxiciclina 100 mg 12/12 h ou amoxicilina 500 mg 8/8 h por 5 a 7 dias.",
     "Sem antibiótico: iniciar ATB cedo reduz a chance de evolução para forma grave."),
    (2, "bacteria", "Febre maculosa",
     "Febre, exantema palmoplantar após picada de carrapato em área rural",
     "doxiciclina", [],
     "Rickettsia rickettsii: doxiciclina em qualquer idade, iniciada já na suspeita. Atraso eleva muito a letalidade.",
     "Amoxicilina: betalactâmicos não agem contra riquétsias intracelulares."),
    (2, "virus", "Mononucleose infecciosa",
     "Adolescente, faringite, linfonodos cervicais, esplenomegalia, linfócitos atípicos",
     "sem-antibiotico", [],
     "Epstein-Barr: suporte e evitar esporte de contato por risco de ruptura esplênica.",
     "Amoxicilina: não trata EBV e causa exantema na maioria dos casos."),
    (2, "virus", "Varicela em criança hígida",
     "Criança de 5 anos, sem comorbidades, vesículas em estágios diferentes",
     "sem-antibiotico", [],
     "Criança saudável < 12 anos: sintomáticos, cortar unhas, evitar AAS. Aciclovir para > 12 anos, doença crônica ou imunossupressão.",
     "Aciclovir: benefício pequeno na criança hígida; não é rotina."),
    (2, "protozoario", "Toxoplasmose ganglionar",
     "Mulher imunocompetente, não gestante; linfonodos cervicais, IgM e IgG +",
     "sem-antibiotico", [],
     "Forma linfonodal no imunocompetente é autolimitada. Tratar só se gestante, imunossuprimido, ocular ou sintomas graves.",
     "SMX-TMP: reservado para retinocoroidite ou imunossuprimidos."),
    (2, "bacteria", "Hanseníase paucibacilar",
     "Duas manchas hipocrômicas hipoestésicas; baciloscopia negativa",
     "pqt-u", [],
     "Até 5 lesões e baciloscopia negativa: PQT-U por 6 doses mensais (rifampicina, dapsona e clofazimina).",
     "Doxiciclina: não é tratamento para Mycobacterium leprae."),
    (2, "helminto", "Larva migrans cutânea",
     "Lesão serpiginosa e pruriginosa no pé após andar descalço na areia",
     "ivermectina", ["albendazol"],
     "Bicho-geográfico (Ancylostoma de cão/gato): ivermectina dose única ou albendazol 3 dias.",
     "Fluconazol: não é micose, é larva de helminto."),
    (2, "helminto", "Oxiuríase",
     "Criança com prurido anal noturno; ovos na fita gomada",
     "albendazol", [],
     "Enterobius vermicularis: albendazol 400 mg, repetir em 2 semanas; tratar contactantes e reforçar higiene.",
     "Ivermectina: menos eficaz contra Enterobius."),
    (2, "bacteria", "Coqueluche",
     "Lactente de 2 meses, tosse paroxística, cianose e apneia",
     "azitromicina", [],
     "Bordetella pertussis: azitromicina (1ª escolha em < 6 meses). Quimioprofilaxia de contatos.",
     "SMX-TMP: contraindicado antes de 2 meses (kernicterus)."),
    (2, "bacteria", "Bacteremia por MRSA",
     "Hemocultura: S. aureus resistente à oxacilina; febre associada a cateter",
     "vancomicina", [],
     "MRSA invasivo: vancomicina IV, retirar o cateter e fazer ecocardiograma.",
     "Oxacilina: por definição inativa contra MRSA."),

    # ---------------- FASE 3: difícil / stewardship ----------------
    (3, "bacteria", "Bacteriúria assintomática idosa",
     "Idosa de 75 anos, sem sintomas urinários; urocultura > 100 mil UFC de E. coli",
     "sem-antibiotico", [],
     "Fora da gestação e de procedimento urológico, bacteriúria assintomática não se trata: não reduz desfechos e seleciona resistência.",
     "Nitrofurantoína: parece 'inofensiva', mas tratar colonização só gera resistência e efeitos adversos."),
    (3, "bacteria", "Descalonar: MSSA na hemocultura",
     "Em vancomicina; hemocultura: S. aureus sensível à oxacilina",
     "oxacilina", [],
     "Para MSSA, betalactâmico antiestafilocócico (oxacilina) é superior à vancomicina: descalonar assim que sair o antibiograma.",
     "Vancomicina: manter é pior para MSSA (mais falha e mortalidade)."),
    (3, "virus", "Rinossinusite viral",
     "Congestão e rinorreia purulenta há 5 dias, melhorando, sem febre alta",
     "sem-antibiotico", [],
     "Menos de 10 dias e melhorando: quase sempre viral. Lavagem nasal e sintomáticos; secreção purulenta não indica bactéria.",
     "Amoxicilina: só se > 10 dias, piora bifásica ou febre alta com dor facial."),
    (3, "bacteria", "Empiema pleural",
     "PAC com derrame loculado; toracocentese: pus, pH 6,9",
     "drenagem-cirurgia", [],
     "Empiema exige drenagem torácica (ou videotoracoscopia). O antibiótico acompanha, mas sem drenar não há cura.",
     "Meropenem: escalar ATB não resolve coleção não drenada."),
    (3, "bacteria", "Sepse urinária por ESBL",
     "Pielonefrite com choque; urocultura: E. coli produtora de ESBL",
     "meropenem", [],
     "ESBL com infecção grave: carbapenêmico é o tratamento de escolha.",
     "Piperacilina-tazobactam: maior mortalidade que o meropenem em bacteremia por ESBL (MERINO)."),
    (3, "bacteria", "Poupar carbapenêmico na PAV",
     "PAV por P. aeruginosa sensível a pip-tazo e meropenem; paciente estável",
     "piperacilina-tazobactam", [],
     "Com antibiograma sensível, prefira o antipseudomonas de menor espectro e poupe carbapenêmico para evitar resistência.",
     "Meropenem: eficaz, mas desnecessário; pressiona surgimento de KPC e Pseudomonas resistente."),
    (3, "protozoario", "Abscesso hepático amebiano",
     "Febre e dor em hipocôndrio direito; abscesso de 5 cm, sorologia amebiana +",
     "metronidazol", [],
     "Metronidazol cura a maioria sem punção, seguido de amebicida luminal. Drenar só se risco de ruptura ou sem resposta.",
     "Drenagem/cirurgia: não é rotina no abscesso amebiano (diferente do piogênico)."),
    (3, "protozoario", "Malária mista",
     "Gota espessa com P. falciparum e P. vivax, sem sinais de gravidade",
     "artemeter-lumefantrina", [],
     "Mista: tratar como falciparum (artemeter+lumefantrina 3 dias) e associar primaquina 7 dias para os hipnozoítos do vivax.",
     "Cloroquina+primaquina: deixa o P. falciparum sem cobertura."),
    (3, "virus", "Faringite viral",
     "Dor de garganta com tosse, coriza, rouquidão e conjuntivite; Centor 0",
     "sem-antibiotico", [],
     "Tosse, coriza e conjuntivite sugerem vírus (adenovírus). Centor baixo: nem testar nem tratar com ATB.",
     "Penicilina G benzatina: sem estreptococo não há o que prevenir."),
    (3, "virus", "Bronquite aguda",
     "Adulto hígido, tosse produtiva há 10 dias, afebril, ausculta e sinais vitais normais",
     "sem-antibiotico", [],
     "Bronquite aguda é viral e a tosse pode durar até 3 semanas. Expectoração colorida não justifica ATB.",
     "Azitromicina: não encurta a tosse e seleciona pneumococo resistente."),
    (3, "bacteria", "Fasciíte necrosante",
     "Dor desproporcional, bolhas hemorrágicas, crepitação e hipotensão",
     "drenagem-cirurgia", [],
     "Emergência cirúrgica: desbridamento amplo imediato define a sobrevida; ATB de amplo espectro vem junto, não no lugar.",
     "Meropenem: sem desbridamento, a mortalidade continua altíssima."),
    (3, "fungo", "Candidúria assintomática",
     "Paciente com sonda vesical, sem febre ou sintomas; urina com Candida",
     "sem-antibiotico", [],
     "Candidúria assintomática é colonização: retirar ou trocar a sonda. Tratar só neutropênicos ou antes de procedimento urológico.",
     "Fluconazol: tratar colonização seleciona Candida resistente."),
    (3, "fungo", "Esofagite por Candida",
     "HIV com CD4 120, odinofagia; EDA com placas brancas no esôfago",
     "fluconazol", [],
     "Candidíase esofágica exige tratamento sistêmico: fluconazol VO por 14 a 21 dias.",
     "Nistatina: ação tópica, não atinge adequadamente o esôfago."),
    (3, "fungo", "Mucormicose rinocerebral",
     "Diabético em cetoacidose, necrose negra no palato e edema periorbitário",
     "anfotericina-b", ["drenagem-cirurgia"],
     "Tripé: anfotericina B lipossomal em dose alta + desbridamento cirúrgico agressivo + correção da cetoacidose.",
     "Fluconazol: Mucorales são intrinsecamente resistentes."),
    (3, "fungo", "Histoplasmose disseminada",
     "HIV com CD4 30, febre, pancitopenia e hepatoesplenomegalia; antígeno +",
     "anfotericina-b", [],
     "Forma disseminada grave: indução com anfotericina B lipossomal e depois itraconazol.",
     "Fluconazol: pouca atividade contra Histoplasma."),
    (3, "bacteria", "Shigelose na criança",
     "Criança com disenteria e febre, sem toxemia; tratamento ambulatorial",
     "ciprofloxacino", ["azitromicina"],
     "Diarreia com sangue na criança: ciprofloxacino VO 3 dias (MS/OMS); azitromicina é alternativa.",
     "SMX-TMP: alta resistência da Shigella; não usar empiricamente."),
    (3, "bacteria", "E. coli produtora de Shiga",
     "Diarreia sanguinolenta sem febre; STEC (O157) confirmada",
     "sem-antibiotico", [],
     "Antibiótico aumenta liberação da toxina e o risco de síndrome hemolítico-urêmica. Hidratação e vigilância renal.",
     "Ciprofloxacino: certo na shigelose, perigoso na STEC."),
    (3, "virus", "SRAG por influenza tardia",
     "Internado por SRAG no 5º dia de sintomas; influenza A detectada",
     "oseltamivir", [],
     "Na SRAG o oseltamivir está indicado mesmo após 48 h do início dos sintomas, pois ainda reduz mortalidade.",
     "Sem antibiótico: a janela de 48 h não se aplica a casos graves hospitalizados."),
    (3, "bacteria", "Prevenção de febre reumática",
     "Jovem com cardite reumática prévia; profilaxia secundária",
     "penicilina-g-benzatina", [],
     "Profilaxia secundária: penicilina G benzatina IM a cada 21 dias, por anos, conforme o grau de cardite.",
     "Amoxicilina: não é esquema de profilaxia; a adesão à benzatina é o que protege."),
    (3, "bacteria", "Neurossífilis congênita",
     "RN de mãe não tratada, VDRL reagente no líquor",
     "penicilina-g-cristalina", [],
     "Sífilis congênita com neurossífilis: penicilina G cristalina IV por 10 dias.",
     "Penicilina G benzatina: dose única só para RN assintomático com exames normais."),
]


def validar(armas, invasores):
    erros = []
    ids_armas = [a["id"] for a in armas]
    if len(set(ids_armas)) != len(ids_armas):
        erros.append("ids de armas duplicados")
    if not 26 <= len(armas) <= 32:
        erros.append(f"{len(armas)} armas (esperado 26-32)")
    for a in armas:
        if not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", a["id"]):
            erros.append(f"id de arma inválido: {a['id']}")
        if not re.fullmatch(r"#[0-9A-F]{6}", a["cor"]):
            erros.append(f"cor inválida: {a['id']}")
    cores = [a["cor"] for a in armas]
    if len(set(cores)) != len(cores):
        erros.append("cores repetidas")
    set_armas = set(ids_armas)
    ids = [i["id"] for i in invasores]
    if len(set(ids)) != len(ids):
        erros.append("ids de invasores duplicados")
    nomes = [i["nome"] for i in invasores]
    if len(set(nomes)) != len(nomes):
        erros.append("nomes de invasores duplicados")
    for i in invasores:
        iid = i["id"]
        if i["tipo"] not in TIPOS:
            erros.append(f"{iid}: tipo {i['tipo']}")
        if i["certa"] not in set_armas:
            erros.append(f"{iid}: certa inexistente {i['certa']}")
        for x in i["aceitaveis"]:
            if x not in set_armas:
                erros.append(f"{iid}: aceitável inexistente {x}")
            if x == i["certa"]:
                erros.append(f"{iid}: aceitável repete a certa")
        if len(set_armas) - 1 - len(i["aceitaveis"]) < 3:
            erros.append(f"{iid}: poucas armas para sortear distratores")
        for campo, lim in (("nome", MAX_NOME), ("detalhe", MAX_DETALHE),
                           ("porque", MAX_PORQUE), ("armadilha", MAX_ARMADILHA)):
            v = i.get(campo)
            if v is None:
                continue
            if not v.strip():
                erros.append(f"{iid}: {campo} vazio")
            if len(v) > lim:
                erros.append(f"{iid}: {campo} {len(v)} > {lim}: {v}")
    for fase, n in POR_FASE.items():
        c = sum(1 for i in invasores if i["fase"] == fase)
        if c != n:
            erros.append(f"fase {fase}: {c} invasores (esperado {n})")
    usados = {i["certa"] for i in invasores} | {x for i in invasores for x in i["aceitaveis"]}
    for a in sorted(set_armas - usados):
        print(f"aviso: arma nunca é resposta: {a}")
    return erros


def main():
    armas = [{"id": i, "nome": n, "classe": c, "cor": cor} for i, n, c, cor in ARMAS]
    invasores = []
    for k, (fase, tipo, nome, detalhe, certa, aceit, porque, armadilha) in enumerate(INVASORES, 1):
        inv = {"id": f"inv-{k:03d}", "fase": fase, "tipo": tipo, "nome": nome,
               "detalhe": detalhe, "certa": certa, "aceitaveis": aceit, "porque": porque}
        if armadilha:
            inv["armadilha"] = armadilha
        invasores.append(inv)
    erros = validar(armas, invasores)
    if erros:
        print("\n".join(erros))
        sys.exit(1)
    destino = os.path.join(os.path.dirname(os.path.abspath(__file__)), "defesa.json")
    with open(destino, "w", encoding="utf-8") as f:
        json.dump({"armas": armas, "invasores": invasores}, f, ensure_ascii=False, indent=1)
        f.write("\n")
    from collections import Counter
    print(f"OK: {len(armas)} armas, {len(invasores)} invasores -> {destino}")
    print("por fase:", dict(sorted(Counter(i["fase"] for i in invasores).items())))
    print("por tipo:", dict(Counter(i["tipo"] for i in invasores)))
    print("por fase/tipo:", dict(sorted(Counter((i["fase"], i["tipo"]) for i in invasores).items())))


if __name__ == "__main__":
    main()
