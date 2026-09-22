# 7. Lista inicial de medicamentos (66)

Banco em `app/js/data/medicamentos.js`. Cada item traz apresentações (mg e mL para cálculo de volume), esquemas por indicação (mg/kg/dose, mg/kg/dia, frequência, via, dose máxima, duração, faixa etária), diluição, infusão, contraindicações, interações, ajuste renal e hepático, efeitos adversos, fontes e data de atualização. O selo **verificar** marca esquemas em que os protocolos divergem e a conferência na bula/protocolo é obrigatória.

| Medicamento | Classe | Esquemas | Exemplo de dose | Verificar |
|---|---|---|---|---|
| Artemeter + lumefantrina | Antimalárico – derivado de artemisinina (ACT) | 1 | 1 a 4 comprimidos por dose conforme faixa de peso (ver faixa |  |
| Cloroquina (difosfato) | Antimalárico – 4-aminoquinolina | 2 | 10 mg/kg/dose 1x/dia |  |
| Primaquina | Antimalárico – 8-aminoquinolina (hipnozoiticida / gametocitocida) | 2 | 0.5 mg/kg/dose 1x/dia |  |
| Artesunato | Antimalárico – derivado de artemisinina (parenteral) | 2 | 3 mg/kg/dose 0, 12 e 24 h; depois 1x/dia |  |
| Paracetamol | Analgésico e antitérmico | 2 | 12.5 mg/kg/dose 6/6 h (até 4/4 h, máximo 5 doses/dia) | ⚠️ |
| Dipirona (metamizol) | Analgésico e antitérmico – pirazolona | 2 | 12.5 mg/kg/dose 6/6 h |  |
| Ibuprofeno | Anti-inflamatório não esteroidal (AINE) | 2 | 7.5 mg/kg/dose 6/6 h a 8/8 h |  |
| Amoxicilina | Antibiótico – penicilina (aminopenicilina) | 4 | 25 mg/kg/dose 12/12 h (ou 8/8 h) |  |
| Amoxicilina + clavulanato | Antibiótico – penicilina com inibidor de betalactamase | 3 | 25 mg/kg/dose 12/12 h (formulação 7:1) ou 8/8 h (4:1) | ⚠️ |
| Penicilina G benzatina | Antibiótico – penicilina de depósito (IM) | 3 | 50000 UI/kg/dose Dose única |  |
| Penicilina G cristalina (potássica) | Antibiótico – penicilina natural (IV) | 3 | 50000 UI/kg/dose 6/6 h |  |
| Ampicilina | Antibiótico – aminopenicilina (parenteral) | 3 | 50 mg/kg/dose 6/6 h |  |
| Ceftriaxona | Antibiótico – cefalosporina de 3ª geração | 3 | 50 mg/kg/dose 1x/dia (ou 12/12 h) |  |
| Cefalexina | Antibiótico – cefalosporina de 1ª geração (oral) | 3 | 12.5 mg/kg/dose 6/6 h (ou 25 mg/kg 12/12 h para faringite) |  |
| Cefotaxima | Antibiótico – cefalosporina de 3ª geração (parenteral) | 3 | 50 mg/kg/dose 8/8 h |  |
| Azitromicina | Antibiótico – macrolídeo (azalídeo) | 4 | 10 mg/kg/dose 1x/dia | ⚠️ |
| Claritromicina | Antibiótico – macrolídeo | 1 | 7.5 mg/kg/dose 12/12 h |  |
| Gentamicina | Antibiótico – aminoglicosídeo | 2 | 7.5 mg/kg/dose 24/24 h | ⚠️ |
| Oxacilina | Antibiótico – penicilina antiestafilocócica | 3 | 25 mg/kg/dose 6/6 h |  |
| Vancomicina | Antibiótico – glicopeptídeo | 3 | 15 mg/kg/dose 6/6 h | ⚠️ |
| Metronidazol | Antimicrobiano – nitroimidazol (antiprotozoário e anaerobicida) | 3 | 5 mg/kg/dose 8/8 h |  |
| Nitrofurantoína | Antibiótico urinário – nitrofurano | 2 | 1.5 mg/kg/dose 6/6 h |  |
| Sulfametoxazol + trimetoprima (SMX-TMP) | Antibiótico – sulfonamida + inibidor da di-hidrofolato redutase | 3 | 4 mg/kg/dose 12/12 h |  |
| Doxiciclina | Antibiótico – tetraciclina | 2 | 2.2 mg/kg/dose 12/12 h | ⚠️ |
| Albendazol | Anti-helmíntico – benzimidazol | 3 | 12 a 23 meses: 200 mg dose única; >= 2 anos: 400 mg dose úni | ⚠️ |
| Mebendazol | Anti-helmíntico – benzimidazol | 2 | 100 mg 12/12 h por 3 dias, independente do peso |  |
| Ivermectina | Antiparasitário – avermectina | 2 | 0.2 mg/kg/dose 1x/dia |  |
| Praziquantel | Anti-helmíntico – pirazinoisoquinolina (trematódeos e cestódeos) | 2 | 60 mg/kg/dose Dose única |  |
| Nitazoxanida | Antiparasitário de amplo espectro – tiazolida | 1 | 7.5 mg/kg/dose 12/12 h |  |
| Permetrina (tópica) | Escabicida / pediculicida – piretroide tópico | 2 | Aplicar em toda a pele do pescoço aos pés (em lactentes incl |  |
| Benznidazol | Antiparasitário – nitroimidazol (tripanossomicida) | 1 | 3.75 mg/kg/dose 12/12 h (ou 8/8 h) |  |
| Antimoniato de meglumina (Glucantime) | Antimonial pentavalente – antileishmania | 3 | 15 mg/kg/dose 1x/dia |  |
| Anfotericina B lipossomal | Antifúngico / antileishmania – poliênico (formulação lipídica) | 3 | 3 mg/kg/dose 1x/dia | ⚠️ |
| Rifampicina | Antimicobacteriano – rifamicina | 5 | 15 mg/kg/dose 1x/dia, em jejum |  |
| Isoniazida | Antimicobacteriano – hidrazida | 3 | 10 mg/kg/dose 1x/dia, em jejum |  |
| Pirazinamida | Antimicobacteriano – análogo da nicotinamida | 2 | 35 mg/kg/dose 1x/dia, em jejum |  |
| Etambutol | Antimicobacteriano – inibidor da síntese de arabinogalactano | 2 | 20 mg/kg/dose 1x/dia, em jejum | ⚠️ |
| Dapsona | Antimicobacteriano / antiprotozoário – sulfona | 2 | 1.5 mg/kg/dose 1x/dia (autoadministrada) + dose mensal supervisionada igual |  |
| Clofazimina | Antimicobacteriano – riminofenazina | 2 | 1 mg/kg/dose 1x/dia (< 30 kg e > 50 kg) ou em dias alternados (30 a 50 kg) |  |
| Salbutamol | Broncodilatador – beta-2 agonista de curta ação | 3 | 2 a 4 jatos (100 mcg/jato) por ciclo; crises moderadas a gra | ⚠️ |
| Brometo de ipratrópio | Broncodilatador – anticolinérgico de curta ação | 2 | < 20 kg: 0,25 mg; >= 20 kg: 0,5 mg por nebulização, junto co |  |
| Prednisolona | Corticoide sistêmico (oral) | 4 | 1 mg/kg/dose 1x/dia (pela manhã) ou dividida 12/12 h |  |
| Dexametasona | Corticoide sistêmico de longa ação | 5 | 0.6 mg/kg/dose Dose única | ⚠️ |
| Hidrocortisona (succinato sódico) | Corticoide sistêmico de curta ação (com efeito mineralocorticoide) | 4 | 4 mg/kg/dose 6/6 h | ⚠️ |
| Metilprednisolona (succinato sódico) | Corticoide sistêmico de ação intermediária (parenteral) | 2 | 1 mg/kg/dose 12/12 h (até 6/6 h em crise muito grave conforme protocolo) |  |
| Adrenalina (epinefrina) | Simpaticomimético – agonista alfa e beta-adrenérgico | 4 | 0.01 mg/kg/dose Repetir a cada 5 a 15 min se necessário (até 3 doses) | ⚠️ |
| Midazolam | Benzodiazepínico de ação curta | 6 | 0.2 mg/kg/dose Dose única; pode repetir uma vez após 5 a 10 min | ⚠️ |
| Diazepam | Benzodiazepínico de ação longa | 3 | 0.2 mg/kg/dose Pode repetir uma vez após 5 a 10 min |  |
| Fenobarbital | Anticonvulsivante – barbitúrico | 2 | 20 mg/kg/dose Dose única; doses adicionais de 5 a 10 mg/kg a cada 15 a 30 min se |  |
| Fenitoína | Anticonvulsivante – hidantoína | 2 | 20 mg/kg/dose Dose única; adicional de 5 a 10 mg/kg se persistir após 10 a 20 mi |  |
| Ondansetrona | Antiemético – antagonista 5-HT3 | 2 | 0.15 mg/kg/dose Dose única (pode repetir 1 vez após 8 h se necessário) |  |
| Sais de reidratação oral (SRO) | Solução de reidratação oral – osmolaridade reduzida (OMS) | 2 | 10 mL/kg |  |
| Zinco (sulfato de zinco) | Micronutriente – suplemento mineral | 2 | < 6 meses: 10 mg/dia; >= 6 meses: 20 mg/dia, por 10 a 14 dia |  |
| Sulfato ferroso | Antianêmico – sal de ferro oral (doses em ferro elementar) | 3 | 3 mg/kg/dose 1x/dia (ou dividido em 2 tomadas), longe das refeições |  |
| Vitamina A (palmitato de retinol) | Vitamina lipossolúvel – suplemento (doses em UI) | 2 | 6 a 11 meses: 100.000 UI (1 dose); 12 a 59 meses: 200.000 UI |  |
| Soro fisiológico (cloreto de sódio 0,9%) | Solução cristaloide isotônica | 4 | 20 mL/kg |  |
| Ringer lactato (solução de Hartmann) | Solução cristaloide isotônica balanceada | 3 | 20 mL/kg | ⚠️ |
| Glicose (dextrose) IV | Solução glicosada – correção de hipoglicemia e aporte calórico | 3 | 500 mg/kg/dose Dose única; repetir glicemia em 15 a 30 min e manter infusão cont |  |
| Sulfato de magnésio | Eletrólito / broncodilatador adjuvante / anticonvulsivante (eclâmpsia) | 4 | 50 mg/kg/dose Dose única (pode repetir uma vez em 4 a 6 h conforme protocolo) |  |
| Cetamina | Anestésico dissociativo – antagonista NMDA | 4 | 1 mg/kg/dose Doses adicionais de 0,5 mg/kg a cada 5 a 10 min se necessário | ⚠️ |
| Soro antibotrópico (SAB) | Soro heterólogo antiveneno (imunoglobulina equina) | 1 | Leve: 2 a 4 ampolas; Moderado: 4 a 8 ampolas; Grave: 12 ampo |  |
| Soro antibotrópico-laquético (SABL) | Soro heterólogo antiveneno (imunoglobulina equina) | 1 | Moderado: 10 ampolas; Grave: 20 ampolas |  |
| Soro anticrotálico (SAC) | Soro heterólogo antiveneno (imunoglobulina equina) | 1 | Leve: 5 ampolas; Moderado: 10 ampolas; Grave: 20 ampolas |  |
| Soro antielapídico (SAEl) | Soro heterólogo antiveneno (imunoglobulina equina) | 1 | Todos os casos considerados potencialmente graves: 10 ampola |  |
| Soro antiescorpiônico (SAEsc) | Soro heterólogo antiveneno (imunoglobulina equina) | 1 | Moderado: 2 a 3 ampolas; Grave: 4 a 6 ampolas |  |
| Soro antiaracnídico (SAAr) | Soro heterólogo antiveneno (imunoglobulina equina) | 1 | Phoneutria moderado: 2 a 4 ampolas; grave: 5 a 10 ampolas. L |  |

## Cálculo automático

Peso → mg/kg/dose → dose em mg (limitada à dose máxima) → concentração da apresentação (mg ÷ mL) → volume em mL. Exemplo: 14 kg × 10 mg/kg = 140 mg; 200 mg/5 mL = 40 mg/mL; 140 ÷ 40 = 3,5 mL. A fórmula é exibida em todas as telas. Soros antivenenos são dosados por gravidade (número de ampolas), nunca por peso.
