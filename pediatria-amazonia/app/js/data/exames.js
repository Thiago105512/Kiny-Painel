window.PED = window.PED || {}; PED.data = PED.data || {};
// Exames complementares – valores de referência pediátricos por faixa etária e apoio à interpretação.
// Os intervalos variam entre laboratórios e métodos: confirmar sempre com a referência do laboratório local.
// Faixas etárias: RN (0–28 dias), lactente (1–23 meses), pré-escolar (2–5 anos), escolar (6–11 anos), adolescente (12–18 anos).

PED.data.exames = [
  {
    id: 'hemograma', nome: 'Hemograma completo', categoria: 'hematologia',
    descricao: 'Avaliação quantitativa e morfológica de hemácias (Hb, Ht, VCM, HCM, RDW), leucócitos com diferencial e plaquetas. Valores fisiologicamente muito variáveis com a idade (poliglobulia neonatal, nadir de Hb aos 2–3 meses, predomínio linfocitário até 4–5 anos).',
    referencias: [
      { faixa: 'RN (0–28 d)', valores: 'Hb 13,5–19,5 g/dL (cordão 13,5–20; 2 semanas 12,5–20,5); Ht 42–65%; VCM 98–118 fL; leucócitos 9.000–30.000/mm³ (1ª semana), 5.000–21.000 (2ª–4ª semana); neutrófilos predominam nos primeiros 3–5 dias; plaquetas 150.000–450.000/mm³; reticulócitos 3–7% (1º dia), < 1% após 1 semana.' },
      { faixa: 'Lactente (1–23 m)', valores: 'Hb 1 mês 10,7–17,1; 2 meses 9,4–13,0 (nadir fisiológico 2–3 meses, mínimo ~9,0); 3–6 meses 9,5–13,5; 6–24 meses 10,5–13,5 g/dL; Ht 33–39%; VCM 70–86 fL; leucócitos 6.000–17.500/mm³ com predomínio de linfócitos (linfócitos 4.000–10.500); neutrófilos 1.000–8.500; plaquetas 150.000–450.000.' },
      { faixa: 'Pré-escolar (2–5 a)', valores: 'Hb 11,5–13,5 g/dL (OMS: anemia se < 11,0 em 6–59 meses); Ht 34–40%; VCM 75–87 fL; leucócitos 5.500–15.500/mm³; neutrófilos 1.500–8.500; linfócitos 2.000–8.000 (predomínio até 4–5 anos); plaquetas 150.000–450.000.' },
      { faixa: 'Escolar (6–11 a)', valores: 'Hb 11,5–15,5 g/dL (OMS: anemia se < 11,5 em 5–11 anos); Ht 35–45%; VCM 77–95 fL; leucócitos 4.500–13.500/mm³; neutrófilos 1.800–8.000; linfócitos 1.500–6.500; plaquetas 150.000–450.000.' },
      { faixa: 'Adolescente (12–18 a)', valores: 'Hb meninas 12,0–16,0; meninos 13,0–16,0 g/dL (OMS: anemia se < 12,0 em 12–14 anos; ≥ 15 anos: < 12,0 F e < 13,0 M); Ht 36–46% (F) / 37–49% (M); VCM 78–98 fL; leucócitos 4.500–11.000/mm³; neutrófilos 1.800–8.000; plaquetas 150.000–450.000.' }
    ],
    interpretacao: [
      'Anemia: usar pontos de corte por idade (OMS). Microcítica (VCM baixo, RDW alto): compatível com ferropenia – muito prevalente na Amazônia; RDW normal com microcitose: considerar talassemia menor. Normocítica: infecção aguda/crônica, malária, hemólise, doença renal. Macrocítica: deficiência de B12/folato, hipotireoidismo.',
      'Anemia + plaquetopenia em área endêmica: considerar malária (solicitar gota espessa), dengue, leishmaniose visceral (pancitopenia + esplenomegalia + febre prolongada), sepse, leucemia (blastos, pancitopenia).',
      'Leucocitose com neutrofilia e desvio à esquerda (bastões > 10%, granulações tóxicas): compatível com infecção bacteriana; leucócitos > 15.000–20.000 com PCR elevada aumentam a probabilidade de infecção bacteriana grave em lactente febril, mas não excluem se normais.',
      'Leucopenia/neutropenia: infecções virais (dengue, arboviroses), febre tifoide, leishmaniose visceral, malária, sepse grave (RN), medicamentos, leucemia. Neutropenia grave < 500/mm³ com febre = emergência.',
      'Linfocitose acentuada: coqueluche (lactente com tosse paroxística e linfócitos > 20.000), viroses, mononucleose (linfócitos atípicos).',
      'Eosinofilia (> 500/mm³): helmintíases (estrongiloidíase, toxocaríase, ascaridíase), alergia, medicamentos; eosinofilia importante + hepatomegalia: considerar toxocaríase/larva migrans visceral.',
      'Plaquetopenia < 100.000: dengue com sinais de alarme (avaliar hematócrito seriado – hemoconcentração ≥ 20% sugere extravasamento), malária, sepse, PTI (isolada, criança bem), leucemia; < 20.000 ou sangramento ativo: avaliar transfusão.',
      'Hematócrito seriado na dengue: aumento ≥ 10–20% em relação ao basal ou valores > 38–40% em crianças com sinais de alarme indicam extravasamento plasmático.',
      'RN: leucócitos < 5.000 ou > 25.000, relação I/T (imaturos/totais) > 0,2 e plaquetopenia são compatíveis com sepse neonatal.'
    ],
    quandoSolicitar: [
      'Febre sem foco em < 3 meses; febre ≥ 5 dias; suspeita de infecção bacteriana grave, sepse ou malária.',
      'Palidez, fadiga, sopro, desnutrição, triagem de anemia (rotina aos 12 meses e conforme risco), retorno de tratamento com ferro.',
      'Dengue/arboviroses (hematócrito e plaquetas seriados), sangramentos, petéquias, adenomegalia, hepatoesplenomegalia, dor óssea.',
      'Pré-operatório, doenças crônicas, uso de medicamentos mielotóxicos.'
    ],
    fontes: [
      { nome: 'Nelson Textbook of Pediatrics, 22ª ed. – Reference ranges', ano: 2024 },
      { nome: 'The Harriet Lane Handbook, 23ª ed.', ano: 2023 },
      { nome: 'OMS – Haemoglobin concentrations for the diagnosis of anaemia (atualização)', ano: 2024 },
      { nome: 'SBP – Tratado de Pediatria, 5ª ed. (Hematologia)', ano: 2022 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'pcr', nome: 'Proteína C reativa (PCR)', categoria: 'bioquimica',
    descricao: 'Proteína de fase aguda produzida pelo fígado sob estímulo de IL-6. Eleva-se em 6–12 h após o estímulo inflamatório, com pico em 36–48 h e meia-vida de ~19 h. Unidades variam (mg/L ou mg/dL): 1 mg/dL = 10 mg/L.',
    referencias: [
      { faixa: 'RN (0–28 d)', valores: '< 5–10 mg/L (< 1,0 mg/dL). Elevação fisiológica leve nas primeiras 48–72 h de vida (até 10–15 mg/L) pode ocorrer; em RN, a sensibilidade é baixa nas primeiras 12 h de infecção – repetir em 24 h.' },
      { faixa: 'Lactente, pré-escolar, escolar e adolescente', valores: '< 5 mg/L (< 0,5 mg/dL) na maioria dos laboratórios (alguns adotam < 3 mg/L ou < 10 mg/L).' }
    ],
    interpretacao: [
      'PCR < 20 mg/L (< 2 mg/dL): baixa probabilidade de infecção bacteriana grave, sobretudo se febre > 12 h; valores entre 20 e 40 mg/L são indeterminados (viroses como adenovírus e influenza também elevam).',
      'PCR > 40–80 mg/L (> 4–8 mg/dL) em lactente febril: aumenta a probabilidade de infecção bacteriana grave (pneumonia bacteriana, pielonefrite, bacteremia, meningite, artrite séptica); > 100 mg/L reforça fortemente.',
      'Elevações também em malária (pode ser muito alta), dengue (geralmente < 30–50 mg/L), doença de Kawasaki (≥ 30 mg/L é critério laboratorial), doenças reumatológicas, pós-operatório, queimaduras.',
      'Útil para acompanhar a resposta ao tratamento (queda esperada de ~50% a cada 24–48 h com antibiótico eficaz); PCR persistentemente elevada: considerar complicação (empiema, abscesso) ou falha terapêutica.',
      'Não usar isoladamente para decidir antibiótico: integrar com clínica, idade, tempo de febre e outros exames (procalcitonina, se disponível, é mais precoce e específica).'
    ],
    quandoSolicitar: [
      'Lactente/criança febril sem foco; suspeita de sepse, pneumonia, pielonefrite, meningite, osteoartrite.',
      'Acompanhamento terapêutico de infecções bacterianas graves; suspeita de doença de Kawasaki ou doença inflamatória.'
    ],
    fontes: [
      { nome: 'Nelson Textbook of Pediatrics, 22ª ed.', ano: 2024 },
      { nome: 'AAP – Clinical Practice Guideline: Evaluation and Management of Well-Appearing Febrile Infants 8 to 60 Days Old', ano: 2021 },
      { nome: 'The Harriet Lane Handbook, 23ª ed.', ano: 2023 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'vhs', nome: 'Velocidade de hemossedimentação (VHS)', categoria: 'hematologia',
    descricao: 'Medida indireta de proteínas de fase aguda (fibrinogênio, imunoglobulinas). Eleva-se lentamente (24–48 h) e normaliza em semanas; influenciada por anemia (aumenta), policitemia e microcitose (diminuem).',
    referencias: [
      { faixa: 'RN (0–28 d)', valores: '0–2 mm/h (fisiologicamente baixa pelo hematócrito elevado e baixo fibrinogênio).' },
      { faixa: 'Lactente a escolar', valores: '3–13 mm/h (aceito até 10–15 mm/h; método de Westergren).' },
      { faixa: 'Adolescente', valores: 'Meninos ≤ 15 mm/h; meninas ≤ 20 mm/h.' }
    ],
    interpretacao: [
      'VHS > 40 mm/h: compatível com processo inflamatório/infeccioso significativo (osteomielite, artrite séptica, tuberculose, abscesso, doença de Kawasaki, febre reumática, doenças autoimunes, neoplasias).',
      'Útil na suspeita de febre reumática (critério menor: VHS ≥ 60 mm/h em população de risco moderado/alto; ≥ 30 em baixo risco) e no seguimento de osteomielite/artrite séptica e doenças reumatológicas.',
      'Valor normal não exclui infecção nas primeiras 24–48 h; PCR é mais sensível para infecção aguda. Anemia grave eleva a VHS artificialmente.'
    ],
    quandoSolicitar: [
      'Suspeita de febre reumática, osteomielite, artrite séptica, tuberculose, doença de Kawasaki, artrite idiopática juvenil e outras doenças inflamatórias crônicas; febre de origem indeterminada.'
    ],
    fontes: [
      { nome: 'Nelson Textbook of Pediatrics, 22ª ed.', ano: 2024 },
      { nome: 'AHA – Revision of the Jones Criteria for the Diagnosis of Acute Rheumatic Fever', ano: 2015 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'sodio', nome: 'Sódio sérico (Na)', categoria: 'bioquimica',
    descricao: 'Principal cátion extracelular; reflete o balanço de água livre. Distúrbios frequentes em diarreia/desidratação, uso inadequado de soros, SIADH (pneumonia, meningite, pós-operatório) e insuficiência adrenal.',
    referencias: [
      { faixa: 'Todas as idades (RN a adolescente)', valores: '135–145 mEq/L (RN prematuro pode variar 130–145 nos primeiros dias).' }
    ],
    interpretacao: [
      'Hiponatremia < 135 mEq/L: avaliar volemia. Hipovolêmica (diarreia com reposição de água livre, perdas renais, insuficiência adrenal – com hiperpotassemia), euvolêmica (SIADH em pneumonia/meningite/pós-operatório, soros hipotônicos), hipervolêmica (síndrome nefrótica, ICC, cirrose).',
      'Hiponatremia sintomática (convulsão, coma; geralmente < 120–125 mEq/L): salina 3% 3–5 mL/kg em 10–20 min, repetir até cessar sintomas (eleva o Na ~3–5 mEq/L); correção total ≤ 8–10 mEq/L em 24 h (risco de desmielinização osmótica).',
      'Hipernatremia > 145 (grave > 160) mEq/L: desidratação com perda de água livre (diarreia, febre, ingestão insuficiente – RN em aleitamento com baixa oferta), diabetes insipidus, excesso de sódio (fórmulas mal preparadas, SRO caseiro). Corrigir lentamente (queda ≤ 10–12 mEq/L em 24 h) pelo risco de edema cerebral.',
      'Na dengue e nas pneumonias graves, hiponatremia leve é comum e geralmente indica SIADH: restringir água livre, usar soluções isotônicas de manutenção (SF 0,9% + glicose 5%).',
      'Usar soluções isotônicas como soro de manutenção em crianças hospitalizadas (AAP 2018) para prevenir hiponatremia iatrogênica.'
    ],
    quandoSolicitar: [
      'Desidratação moderada/grave, diarreia prolongada, vômitos persistentes, rebaixamento ou convulsão, poliúria/polidipsia, uso de soro IV por > 24 h, síndrome nefrótica, meningite, pós-operatório, desnutrição grave, insuficiência adrenal.'
    ],
    fontes: [
      { nome: 'AAP – Clinical Practice Guideline: Maintenance Intravenous Fluids in Children', ano: 2018 },
      { nome: 'Nelson Textbook of Pediatrics, 22ª ed.', ano: 2024 },
      { nome: 'SBP – Tratado de Pediatria, 5ª ed. (Distúrbios hidroeletrolíticos)', ano: 2022 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'potassio', nome: 'Potássio sérico (K)', categoria: 'bioquimica',
    descricao: 'Principal cátion intracelular. Valores mais altos em RN. Hemólise da amostra, garroteamento prolongado e leucocitose/trombocitose extremas causam pseudo-hiperpotassemia.',
    referencias: [
      { faixa: 'RN (0–28 d)', valores: '3,7–5,9 mEq/L (prematuros até 6,5 sem alteração de ECG nos primeiros dias; confirmar sem hemólise).' },
      { faixa: 'Lactente (1–23 m)', valores: '4,1–5,3 mEq/L.' },
      { faixa: 'Pré-escolar e escolar (2–11 a)', valores: '3,4–4,7 mEq/L.' },
      { faixa: 'Adolescente (12–18 a)', valores: '3,5–5,1 mEq/L.' }
    ],
    interpretacao: [
      'Hipopotassemia < 3,5 mEq/L (grave < 2,5 ou com sintomas/ECG): diarreia, vômitos, desnutrição grave, diuréticos, beta-2 agonistas em altas doses, cetoacidose durante a insulina, alcalose, hiperaldosteronismo, anfotericina. ECG: onda U, achatamento de T, QT prolongado, arritmias.',
      'Reposição: VO (SRO, xarope de KCl 1–2 mEq/kg/dia) sempre que possível; IV apenas com diurese presente – 0,5–1 mEq/kg em 1–2 h (máx. 20–40 mEq/h em adolescente; concentração ≤ 40 mEq/L em veia periférica, ≤ 80 em central) com monitorização.',
      'Hiperpotassemia > 5,5 mEq/L (grave > 6,5–7 ou com alterações no ECG: T apiculada, QRS alargado, bradiarritmia): insuficiência renal aguda, rabdomiólise (crotálico), lise tumoral, acidose, hemólise, insuficiência adrenal, medicamentos (IECA, espironolactona). Primeiro descartar hemólise da amostra.',
      'Tratamento da hiperpotassemia com ECG alterado: gluconato de cálcio 10% 0,5–1 mL/kg IV lento (estabiliza membrana), glicose + insulina (0,1 U/kg de insulina regular com 2 mL/kg de glicose 25%), salbutamol nebulizado, bicarbonato se acidose, furosemida, resina de troca, diálise.'
    ],
    quandoSolicitar: [
      'Desidratação grave, diarreia prolongada, desnutrição grave (antes de realimentar), insuficiência renal, cetoacidose diabética, rabdomiólise/acidente crotálico, uso de diuréticos ou IECA, arritmias, fraqueza muscular, íleo paralítico.'
    ],
    fontes: [
      { nome: 'The Harriet Lane Handbook, 23ª ed.', ano: 2023 },
      { nome: 'Nelson Textbook of Pediatrics, 22ª ed.', ano: 2024 },
      { nome: 'AHA – PALS Guidelines', ano: 2020 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'calcio', nome: 'Cálcio sérico (total e ionizado)', categoria: 'bioquimica',
    descricao: 'Cálcio total depende da albumina (corrigir: Ca corrigido = Ca medido + 0,8 × (4 − albumina g/dL)); o cálcio ionizado é a fração fisiologicamente ativa e não depende da albumina.',
    referencias: [
      { faixa: 'RN (0–28 d)', valores: 'Total 7,6–10,4 mg/dL nos primeiros 10 dias (nadir fisiológico em 24–48 h); ionizado 1,05–1,37 mmol/L (4,2–5,5 mg/dL). Hipocalcemia neonatal: total < 8 mg/dL (a termo) ou < 7 (pré-termo), ionizado < 1,0–1,1 mmol/L.' },
      { faixa: 'Lactente (1–23 m)', valores: 'Total 9,0–11,0 mg/dL; ionizado 1,12–1,32 mmol/L (4,5–5,3 mg/dL).' },
      { faixa: 'Pré-escolar e escolar (2–11 a)', valores: 'Total 8,8–10,8 mg/dL; ionizado 1,12–1,32 mmol/L.' },
      { faixa: 'Adolescente (12–18 a)', valores: 'Total 8,4–10,2 mg/dL; ionizado 1,12–1,32 mmol/L.' }
    ],
    interpretacao: [
      'Hipocalcemia (total < 8,5 mg/dL corrigido ou ionizado < 1,1 mmol/L): RN (prematuridade, filho de mãe diabética, asfixia; tardia por fórmula rica em fosfato/hipoparatireoidismo), deficiência de vitamina D/raquitismo, hipoalbuminemia (desnutrição, síndrome nefrótica – checar ionizado), sepse, pancreatite, transfusão maciça (citrato), hipomagnesemia, síndrome de DiGeorge, insuficiência renal.',
      'Sintomas: tetania, sinais de Chvostek/Trousseau, laringoespasmo, convulsão, QT longo, apneia em RN. Sintomática: gluconato de cálcio 10% 0,5–1 mL/kg IV lento (10–20 min) com monitorização; corrigir magnésio associado.',
      'Hipercalcemia (> 11 mg/dL; grave > 14): hipervitaminose D, hiperparatireoidismo, imobilização, neoplasias, hipercalcemia idiopática da infância (síndrome de Williams), intoxicação por vitamina A. Tratamento inicial: hidratação com SF, furosemida após hidratação.',
      'Raquitismo: cálcio normal ou baixo, fósforo baixo, fosfatase alcalina muito elevada, PTH elevado, 25-OH-vitamina D < 20 ng/mL.'
    ],
    quandoSolicitar: [
      'Convulsão (especialmente RN e lactente), tetania, apneia/estridor no RN, suspeita de raquitismo ou deficiência de vitamina D, desnutrição grave, síndrome nefrótica, insuficiência renal, transfusão maciça, sepse/choque, pancreatite, uso prolongado de anticonvulsivantes.'
    ],
    fontes: [
      { nome: 'Nelson Textbook of Pediatrics, 22ª ed.', ano: 2024 },
      { nome: 'The Harriet Lane Handbook, 23ª ed.', ano: 2023 },
      { nome: 'SBP – Documento Científico: Hipovitaminose D em pediatria', ano: 2016 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'magnesio', nome: 'Magnésio sérico (Mg)', categoria: 'bioquimica',
    descricao: 'Cátion intracelular essencial à função neuromuscular e à regulação do PTH; hipomagnesemia causa hipocalcemia refratária e hipopotassemia refratária.',
    referencias: [
      { faixa: 'RN (0–28 d)', valores: '1,5–2,2 mg/dL (0,6–0,9 mmol/L).' },
      { faixa: 'Lactente a adolescente', valores: '1,7–2,4 mg/dL (0,7–1,0 mmol/L); alguns laboratórios 1,6–2,6 mg/dL.' }
    ],
    interpretacao: [
      'Hipomagnesemia < 1,6 mg/dL: diarreia crônica, desnutrição grave (repor no protocolo OMS), má absorção, diuréticos, anfotericina, cisplatina, cetoacidose, síndrome de realimentação, hipomagnesemia familiar. Sintomas: tremor, tetania, convulsão, arritmias (torsades). Corrigir com sulfato de magnésio 25–50 mg/kg IV em 20–30 min (máx. 2 g) e repor cálcio/potássio.',
      'Hipermagnesemia > 2,5–3 mg/dL: insuficiência renal, RN de mãe tratada com sulfato de magnésio (hipotonia, apneia), uso de antiácidos/laxantes com Mg. Sintomas graves > 5 mg/dL: hiporreflexia, bradicardia, depressão respiratória – gluconato de cálcio, hidratação, diálise.'
    ],
    quandoSolicitar: [
      'Hipocalcemia ou hipopotassemia refratárias, convulsão sem causa, desnutrição grave, diarreia crônica, arritmias, RN de mãe em uso de sulfato de magnésio, insuficiência renal, síndrome de realimentação.'
    ],
    fontes: [
      { nome: 'Nelson Textbook of Pediatrics, 22ª ed.', ano: 2024 },
      { nome: 'The Harriet Lane Handbook, 23ª ed.', ano: 2023 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'glicemia', nome: 'Glicemia (capilar e sérica)', categoria: 'bioquimica',
    descricao: 'Glicose plasmática em jejum ou aleatória. A glicemia capilar é útil na triagem à beira-leito, mas valores baixos devem ser confirmados no laboratório (glicemia sérica cai ~5–7 mg/dL por hora na amostra sem fluoreto).',
    referencias: [
      { faixa: 'RN (0–28 d)', valores: 'Primeiras 48 h: ≥ 40–45 mg/dL é aceito como limite operacional (SBP/AAP); após 48 h: ≥ 50 mg/dL; valores de alvo ≥ 60 mg/dL em RN de risco após 48 h (Pediatric Endocrine Society). Hipoglicemia persistente após 72 h: investigar.' },
      { faixa: 'Lactente a adolescente', valores: 'Jejum 60–99 mg/dL (normal 70–99); hipoglicemia < 60 mg/dL com sintomas ou < 45–50 mg/dL; glicemia de jejum 100–125 = glicemia de jejum alterada; ≥ 126 em jejum ou ≥ 200 aleatória com sintomas = diabetes (ADA).' }
    ],
    interpretacao: [
      'Hipoglicemia: causas frequentes – jejum prolongado em lactente, gastroenterite, sepse, malária grave (e quinina), desnutrição grave, insuficiência adrenal, intoxicação (álcool, salicilato, sulfonilureia), erros inatos (hipoglicemia cetótica idiopática é a mais comum entre 1–5 anos). Tratar imediatamente (ver emergência hipoglicemia) e coletar amostra crítica se recorrente.',
      'Hiperglicemia: diabetes tipo 1 (poliúria, polidipsia, perda de peso; cetoacidose se glicemia > 200 + pH < 7,3 ou HCO3 < 15 + cetonemia/cetonúria), hiperglicemia de estresse (sepse, convulsão, corticoide, salbutamol – geralmente < 200–250 mg/dL e transitória).',
      'Em toda criança com rebaixamento, convulsão, hipotonia ou choque: medir glicemia capilar imediatamente.',
      'Malária por P. falciparum grave: hipoglicemia é critério de gravidade (OMS: < 40 mg/dL); monitorar a cada 4–6 h durante tratamento com quinina/artesunato.'
    ],
    quandoSolicitar: [
      'Rebaixamento de consciência, convulsão, choque, sepse, malária grave, desnutrição grave, RN de risco (PIG, GIG, filho de mãe diabética, prematuro), jejum prolongado, vômitos incoercíveis, poliúria/polidipsia, intoxicações, uso de corticoide/insulina.'
    ],
    fontes: [
      { nome: 'SBP – Hipoglicemia neonatal: Documento Científico', ano: 2021 },
      { nome: 'Pediatric Endocrine Society – Recommendations for Evaluation and Management of Persistent Hypoglycemia in Neonates, Infants and Children', ano: 2015 },
      { nome: 'ADA – Standards of Care in Diabetes', ano: 2024 },
      { nome: 'OMS – Guidelines for Malaria (critérios de malária grave)', ano: 2023 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'ureia', nome: 'Ureia', categoria: 'bioquimica',
    descricao: 'Produto do catabolismo proteico excretado pelo rim; menos específica que a creatinina (varia com dieta, hidratação, sangramento digestivo, catabolismo). BUN (nitrogênio ureico) = ureia ÷ 2,14.',
    referencias: [
      { faixa: 'RN (0–28 d)', valores: 'Ureia 5–25 mg/dL (BUN 2–12); pode ser mais alta nos primeiros dias com baixa oferta hídrica.' },
      { faixa: 'Lactente a adolescente', valores: 'Ureia 10–40 mg/dL (BUN 5–18 mg/dL).' }
    ],
    interpretacao: [
      'Ureia elevada com creatinina normal e relação ureia/creatinina > 40 (BUN/Cr > 20): compatível com desidratação/pré-renal, hemorragia digestiva, dieta hiperproteica, corticoide, catabolismo.',
      'Ureia e creatinina elevadas proporcionalmente: lesão renal intrínseca (glomerulonefrite pós-estreptocócica, síndrome hemolítico-urêmica, necrose tubular, nefrotoxicidade, malária grave, leptospirose) ou obstrução.',
      'Ureia baixa: desnutrição, hepatopatia grave, hiper-hidratação.',
      'Na desidratação grave e no choque, a ureia sobe antes da creatinina e é útil para monitorar a resposta à reidratação.'
    ],
    quandoSolicitar: [
      'Desidratação grave, oligúria, edema, hematúria, hipertensão, suspeita de lesão renal aguda (sepse, malária grave, leptospirose, acidente crotálico/botrópico, SHU), uso de nefrotóxicos, hemorragia digestiva, desnutrição.'
    ],
    fontes: [
      { nome: 'Nelson Textbook of Pediatrics, 22ª ed.', ano: 2024 },
      { nome: 'The Harriet Lane Handbook, 23ª ed.', ano: 2023 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'creatinina', nome: 'Creatinina sérica', categoria: 'bioquimica',
    descricao: 'Marcador de filtração glomerular; depende da massa muscular, por isso os valores normais aumentam com a idade. Estimar TFG pela fórmula de Schwartz (bedside 2009): TFG (mL/min/1,73 m²) = 0,413 × estatura (cm) ÷ creatinina (mg/dL).',
    referencias: [
      { faixa: 'RN (0–28 d)', valores: '0,3–1,0 mg/dL nos primeiros 2–3 dias (reflete a creatinina materna), caindo para 0,2–0,4 mg/dL até 2 semanas (a termo); prematuros permanecem mais altos por mais tempo.' },
      { faixa: 'Lactente (1–23 m)', valores: '0,2–0,4 mg/dL.' },
      { faixa: 'Pré-escolar (2–5 a)', valores: '0,3–0,7 mg/dL.' },
      { faixa: 'Escolar (6–11 a)', valores: '0,5–1,0 mg/dL.' },
      { faixa: 'Adolescente (12–18 a)', valores: '0,5–1,0 mg/dL (meninos até 1,2 mg/dL após a puberdade).' }
    ],
    interpretacao: [
      'Lesão renal aguda (KDIGO pediátrico): aumento da creatinina ≥ 0,3 mg/dL em 48 h ou ≥ 1,5× o basal em 7 dias, ou diurese < 0,5 mL/kg/h por 6–12 h. Uma creatinina de 1,0 mg/dL pode ser normal em adolescente mas indica TFG muito reduzida em lactente – sempre interpretar pela idade/estatura.',
      'TFG estimada (Schwartz) < 90: reduzida; < 60 por > 3 meses: doença renal crônica estágio 3 ou pior; < 30: ajustar doses de medicamentos e encaminhar à nefrologia.',
      'Causas de LRA na região: desidratação grave, sepse, malária grave, leptospirose, acidente crotálico (rabdomiólise) e botrópico, glomerulonefrite pós-infecciosa (piodermite), SHU, nefrotóxicos (aminoglicosídeo, AINE, anfotericina, contraste).',
      'Creatinina baixa: desnutrição/baixa massa muscular (pode mascarar disfunção renal – usar cistatina C se disponível).'
    ],
    quandoSolicitar: [
      'Oligúria, edema, hematúria, hipertensão, desidratação grave, choque, sepse, malária grave, leptospirose, acidentes ofídicos, uso de nefrotóxicos (ajuste de dose), síndrome nefrótica/nefrítica, ITU febril recorrente, cetoacidose, antes de contraste.'
    ],
    fontes: [
      { nome: 'Schwartz GJ et al. – New equations to estimate GFR in children with CKD (JASN)', ano: 2009 },
      { nome: 'KDIGO – Clinical Practice Guideline for Acute Kidney Injury', ano: 2012 },
      { nome: 'The Harriet Lane Handbook, 23ª ed.', ano: 2023 },
      { nome: 'Nelson Textbook of Pediatrics, 22ª ed.', ano: 2024 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'ast', nome: 'AST (TGO) – aspartato aminotransferase', categoria: 'bioquimica',
    descricao: 'Enzima presente em fígado, músculo esquelético e cardíaco, hemácias e rim; menos específica para lesão hepática que a ALT. Valores são mais altos em RN e lactentes.',
    referencias: [
      { faixa: 'RN (0–28 d)', valores: '35–140 U/L (0–5 dias); pode permanecer elevada até 2–3× o valor do adulto no primeiro mês.' },
      { faixa: 'Lactente (1–23 m)', valores: '15–60 U/L.' },
      { faixa: 'Pré-escolar (2–5 a)', valores: '15–50 U/L.' },
      { faixa: 'Escolar (6–11 a)', valores: '10–50 U/L.' },
      { faixa: 'Adolescente (12–18 a)', valores: '10–40 U/L.' }
    ],
    interpretacao: [
      'AST e ALT elevadas em conjunto: lesão hepatocelular – hepatites virais (A, B, E), dengue (elevação de AST > ALT é típica; AST/ALT > 1.000 U/L é sinal de gravidade/dengue grave), febre amarela (elevações muito altas com icterícia), leptospirose, malária, sepse, medicamentos (paracetamol, antituberculostáticos, valproato), esteatose.',
      'AST muito elevada com ALT normal ou pouco elevada: origem muscular – rabdomiólise (acidente crotálico, convulsão prolongada, miosite viral, distrofias musculares – dosar CPK), hemólise, infarto.',
      'Dengue: AST/ALT > 1.000 U/L é critério de dengue grave (MS); elevação moderada (200–500) ocorre em muitos casos com sinais de alarme – monitorar.',
      'Elevações > 10× o limite superior: hepatite viral aguda, isquemia, paracetamol; investigar coagulograma e bilirrubinas (função hepática).'
    ],
    quandoSolicitar: [
      'Icterícia, hepatomegalia, dengue com sinais de alarme ou grave, febre amarela, leptospirose, malária grave, suspeita de hepatite viral, intoxicação por paracetamol, uso de tuberculostáticos/anticonvulsivantes/antifúngicos, rabdomiólise, miopatias, sepse, síndrome de Reye.'
    ],
    fontes: [
      { nome: 'The Harriet Lane Handbook, 23ª ed.', ano: 2023 },
      { nome: 'Nelson Textbook of Pediatrics, 22ª ed.', ano: 2024 },
      { nome: 'Ministério da Saúde – Dengue: diagnóstico e manejo clínico – adulto e criança, 6ª ed.', ano: 2024 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'alt', nome: 'ALT (TGP) – alanina aminotransferase', categoria: 'bioquimica',
    descricao: 'Enzima predominantemente hepática; marcador mais específico de lesão hepatocelular que a AST.',
    referencias: [
      { faixa: 'RN (0–28 d)', valores: '6–50 U/L (0–5 dias).' },
      { faixa: 'Lactente (1–23 m)', valores: '5–45 U/L.' },
      { faixa: 'Pré-escolar (2–5 a)', valores: '5–45 U/L.' },
      { faixa: 'Escolar (6–11 a)', valores: '10–35 U/L.' },
      { faixa: 'Adolescente (12–18 a)', valores: '10–35 U/L (limites propostos para triagem de esteatose: > 22 U/L meninas e > 26 U/L meninos – NASPGHAN).' }
    ],
    interpretacao: [
      'ALT > 2× o limite superior persistente (> 3–6 meses): investigar hepatopatia crônica (hepatite B/C, esteatose/obesidade, doença celíaca, Wilson, autoimune, deficiência de alfa-1-antitripsina).',
      'ALT > 10× (> 500 U/L): hepatite viral aguda (A é a mais comum na infância na região), paracetamol, isquemia/choque, febre amarela, dengue grave, leptospirose (geralmente < 200), hepatite autoimune.',
      'ALT normal com AST elevada sugere origem muscular ou hemólise.',
      'Em dengue: acompanhar junto com AST; > 1.000 U/L = dengue grave.'
    ],
    quandoSolicitar: [
      'Icterícia, hepatomegalia, colúria/acolia, dengue com sinais de alarme, febre amarela, hepatite viral, obesidade (triagem de esteatose a partir de 9–11 anos), uso de hepatotóxicos, doença celíaca, fadiga crônica inexplicada.'
    ],
    fontes: [
      { nome: 'The Harriet Lane Handbook, 23ª ed.', ano: 2023 },
      { nome: 'NASPGHAN – Clinical Practice Guideline for the Diagnosis and Treatment of NAFLD in Children', ano: 2017 },
      { nome: 'Nelson Textbook of Pediatrics, 22ª ed.', ano: 2024 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'bilirrubinas', nome: 'Bilirrubinas (total, direta e indireta)', categoria: 'bioquimica',
    descricao: 'Bilirrubina indireta (não conjugada) reflete hemólise/imaturidade hepática; direta (conjugada) reflete colestase/lesão hepatocelular. Em RN, interpretar pela idade em horas e fatores de risco (nomograma de Bhutani/curvas AAP 2022).',
    referencias: [
      { faixa: 'RN (0–28 d)', valores: 'Icterícia fisiológica a termo: pico de 5–12 mg/dL entre 3º–5º dia, resolvendo em 1–2 semanas (prematuros: pico até 15 mg/dL, mais tardio). Direta normal < 1,0 mg/dL (ou < 20% da total). Icterícia nas primeiras 24 h, BT > 12–15 mg/dL, aumento > 0,5 mg/dL/h ou icterícia > 2 semanas (a termo) são patológicas até prova contrária. Colestase neonatal: BD > 1,0 mg/dL.' },
      { faixa: 'Lactente a adolescente', valores: 'Total 0,2–1,2 mg/dL; direta 0–0,3 mg/dL; indireta 0,2–0,9 mg/dL.' }
    ],
    interpretacao: [
      'RN: indicar fototerapia/exsanguineotransfusão pelas curvas da AAP (2022) conforme idade em horas, idade gestacional e fatores de risco (isoimunização, deficiência de G6PD, sepse, asfixia, albumina < 3). Investigar hemólise se icterícia < 24 h: tipagem, Coombs direto, hematócrito, reticulócitos, G6PD.',
      'Icterícia prolongada (> 14 dias a termo/> 21 pré-termo) com BD > 1 mg/dL = colestase: urgente investigar atresia de vias biliares (cirurgia ideal < 60 dias), além de infecção urinária, sepse, TORCH, hipotireoidismo, galactosemia, deficiência de alfa-1-antitripsina.',
      'Criança maior com predomínio de indireta: hemólise (malária, deficiência de G6PD – comum na Amazônia, esferocitose, anemia falciforme), síndrome de Gilbert (leve, jejum/infecção). Predomínio de direta: hepatite viral aguda (A/B/E), febre amarela, leptospirose (icterícia rubínica com BD alta e transaminases pouco elevadas), dengue grave, sepse, medicamentos, obstrução biliar.',
      'Malária grave (OMS): bilirrubina > 3 mg/dL com parasitemia > 100.000/µL é critério de gravidade; febre amarela: icterícia + oligúria + sangramento = forma grave.'
    ],
    quandoSolicitar: [
      'Icterícia em qualquer idade (RN: com ou sem fatores de risco, conforme triagem transcutânea), colúria/acolia, hepatoesplenomegalia, hemólise suspeita, malária, febre amarela, leptospirose, hepatites, dengue grave, sepse.'
    ],
    fontes: [
      { nome: 'AAP – Clinical Practice Guideline Revision: Management of Hyperbilirubinemia in the Newborn Infant 35 or More Weeks of Gestation', ano: 2022 },
      { nome: 'SBP – Icterícia neonatal (Documento Científico)', ano: 2021 },
      { nome: 'Nelson Textbook of Pediatrics, 22ª ed.', ano: 2024 },
      { nome: 'OMS – Guidelines for Malaria', ano: 2023 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'gasometria', nome: 'Gasometria (arterial, venosa ou capilar)', categoria: 'gasometria',
    descricao: 'Avalia oxigenação (PaO2, SatO2 – apenas arterial), ventilação (PCO2) e equilíbrio ácido-base (pH, HCO3, BE). A gasometria venosa/capilar é adequada para pH, PCO2 (≈ +5 mmHg) e HCO3, mas não para PaO2. Lactato costuma vir junto.',
    referencias: [
      { faixa: 'RN (0–28 d)', valores: 'Arterial: pH 7,30–7,40 (cordão arterial ≥ 7,20 normal); PaCO2 35–45 mmHg; PaO2 50–80 mmHg (a termo após estabilização); HCO3 18–24 mEq/L; BE −5 a +2. Prematuros toleram pH ≥ 7,25 e PCO2 até 55–60 (hipercapnia permissiva).' },
      { faixa: 'Lactente a adolescente', valores: 'Arterial: pH 7,35–7,45; PaCO2 35–45 mmHg; PaO2 80–100 mmHg; HCO3 22–26 mEq/L; BE −2 a +2; SatO2 ≥ 95%. Venosa: pH 7,31–7,41; PvCO2 41–51 mmHg; HCO3 23–28. Lactato < 2 mmol/L. Ânion gap (Na − (Cl + HCO3)) 8–16 mEq/L.' }
    ],
    interpretacao: [
      'Acidose metabólica (pH < 7,35, HCO3 < 22): com ânion gap elevado – cetoacidose diabética, acidose láctica (choque, sepse, malária grave, convulsão), insuficiência renal, intoxicações (salicilato, metanol, etilenoglicol), erros inatos; com ânion gap normal (hiperclorêmica) – diarreia (perda de HCO3), acidose tubular renal, excesso de SF 0,9%.',
      'Alcalose metabólica (pH > 7,45, HCO3 > 26): vômitos/estenose hipertrófica do piloro (hipoclorêmica, hipocalêmica), diuréticos, fibrose cística, hiperaldosteronismo.',
      'Acidose respiratória (PCO2 > 45): hipoventilação – crise asmática grave (PCO2 normal ou alta em criança taquipneica = fadiga/gravidade), bronquiolite, depressão do SNC (intoxicação, convulsão), doença neuromuscular, obstrução de via aérea. Alcalose respiratória: hiperventilação – ansiedade, febre, dor, salicilato (fase inicial), sepse precoce, TCE.',
      'Compensação esperada: acidose metabólica – PCO2 = 1,5 × HCO3 + 8 (± 2); se PCO2 maior que o esperado, há acidose respiratória associada (falência ventilatória).',
      'PaO2/FiO2 < 300 com infiltrado bilateral: síndrome do desconforto respiratório agudo pediátrico (PARDS – OI ≥ 4 ou P/F ≤ 300).',
      'Lactato > 2 mmol/L: hipoperfusão/sepse; > 4 mmol/L: choque com alta mortalidade – reavaliar a cada 2–4 h como meta de reanimação. Torniquete prolongado eleva falsamente o lactato.'
    ],
    quandoSolicitar: [
      'Choque, sepse, insuficiência respiratória (crise asmática grave, bronquiolite grave, pneumonia com hipoxemia), cetoacidose diabética, desidratação grave, rebaixamento de consciência, intoxicações, malária grave, convulsão prolongada, pós-PCR, RN com desconforto respiratório ou asfixia, erros inatos suspeitos.'
    ],
    fontes: [
      { nome: 'The Harriet Lane Handbook, 23ª ed.', ano: 2023 },
      { nome: 'Nelson Textbook of Pediatrics, 22ª ed.', ano: 2024 },
      { nome: 'PALICC-2 – Pediatric Acute Respiratory Distress Syndrome: Consensus Recommendations', ano: 2023 },
      { nome: 'Surviving Sepsis Campaign Pediátrico', ano: 2020 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'urina_1', nome: 'Urina tipo 1 (EAS / sumário de urina)', categoria: 'urina',
    descricao: 'Exame físico-químico (fita reagente) e sedimentoscopia. A qualidade da coleta é decisiva: jato médio após higiene (criança com controle esfincteriano), cateterismo vesical ou punção suprapúbica em lactentes; saco coletor serve apenas para triagem (se normal, afasta ITU; se alterado, confirmar com coleta estéril).',
    referencias: [
      { faixa: 'RN (0–28 d)', valores: 'Densidade 1.001–1.020 (capacidade de concentração limitada); pH 5–7; proteína negativa/traços; leucócitos < 5–10/campo; hemácias < 5/campo; uratos amorfos (mancha rosada na fralda) são comuns e benignos.' },
      { faixa: 'Lactente a adolescente', valores: 'Densidade 1.005–1.030; pH 4,5–8,0; proteína negativa (traços aceitáveis se densidade alta; relação proteína/creatinina < 0,2 mg/mg em > 2 anos, < 0,5 em 6–24 meses); glicose negativa; cetonas negativas (podem aparecer no jejum/vômitos); nitrito negativo; esterase leucocitária negativa; leucócitos < 5/campo (< 10.000/mL); hemácias < 3–5/campo; cilindros hialinos ocasionais; bilirrubina/urobilinogênio negativos ou traço.' }
    ],
    interpretacao: [
      'ITU: esterase leucocitária positiva e/ou nitrito positivo com piúria (≥ 5 leucócitos/campo ou ≥ 10/mm³) sugerem ITU – confirmar com urocultura de coleta adequada. Nitrito tem alta especificidade, mas baixa sensibilidade em lactentes (esvaziamento frequente); bacteriúria ao Gram de urina não centrifugada é útil.',
      'Hematúria: > 5 hemácias/campo. Dismórficas/cilindros hemáticos + proteinúria + edema/hipertensão: glomerulonefrite (pós-estreptocócica após piodermite/faringite – comum na região; nefropatia por IgA; lúpus). Hemácias isomórficas: ITU, litíase, hipercalciúria, trauma, esquistossomose urinária (não no Brasil). Fita positiva sem hemácias: hemoglobinúria (hemólise – malária, G6PD) ou mioglobinúria (rabdomiólise – acidente crotálico).',
      'Proteinúria: transitória (febre, exercício, desidratação) ou ortostática (adolescentes) são benignas; persistente ≥ 2+ com edema e hipoalbuminemia: síndrome nefrótica (relação P/C > 2 mg/mg).',
      'Cetonúria com glicosúria: cetoacidose diabética; cetonúria isolada: jejum/vômitos. Glicosúria sem hiperglicemia: tubulopatia (Fanconi).',
      'Densidade > 1.025: desidratação; densidade fixa < 1.010 com poliúria: diabetes insipidus ou doença renal crônica; densidade 1.030+ com proteína: pode gerar falso-positivo de proteinúria na fita.',
      'Bilirrubina positiva: hepatite/colestase; urobilinogênio aumentado: hemólise ou hepatite; cilindros leucocitários: pielonefrite.'
    ],
    quandoSolicitar: [
      'Febre sem foco (especialmente < 2 anos), disúria, polaciúria, dor lombar, urina turva/fétida, hematúria, edema, hipertensão, poliúria, dor abdominal recorrente, icterícia, desidratação, rabdomiólise suspeita, sepse, RN com icterícia prolongada ou baixo ganho de peso.'
    ],
    fontes: [
      { nome: 'AAP – Clinical Practice Guideline: Urinary Tract Infection in Febrile Infants and Children 2 to 24 Months (reafirmada 2016)', ano: 2011 },
      { nome: 'SBP – Infecção do trato urinário: Documento Científico', ano: 2016 },
      { nome: 'Nelson Textbook of Pediatrics, 22ª ed.', ano: 2024 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'urocultura', nome: 'Urocultura com antibiograma', categoria: 'microbiologia',
    descricao: 'Padrão-ouro para infecção do trato urinário. O critério de positividade depende do método de coleta; sempre coletar antes do antibiótico e semear em até 1–2 h (ou refrigerar a 4 °C por até 24 h).',
    referencias: [
      { faixa: 'Jato médio (criança com controle esfincteriano ou lactente com coleta limpa)', valores: 'Positiva se ≥ 100.000 UFC/mL de um único uropatógeno (50.000–100.000 com sintomas e piúria: provável, repetir se dúvida).' },
      { faixa: 'Cateterismo vesical', valores: 'Positiva se ≥ 50.000 UFC/mL de um único uropatógeno com piúria (AAP); 10.000–50.000 com sintomas: possível.' },
      { faixa: 'Punção suprapúbica', valores: 'Qualquer crescimento de bacilo Gram-negativo ou > 1.000 UFC/mL de cocos Gram-positivos.' },
      { faixa: 'Saco coletor', valores: 'Não serve para confirmar ITU (falso-positivo de até 85%); serve apenas para afastar quando negativo. Resultado positivo deve ser confirmado por coleta estéril antes de rotular como ITU.' }
    ],
    interpretacao: [
      'Uropatógenos mais comuns: Escherichia coli (70–90%), Klebsiella, Proteus (meninos, litíase), Enterococcus, Pseudomonas (anomalias/instrumentação), Staphylococcus saprophyticus (adolescentes).',
      'Crescimento de múltiplos microrganismos, flora mista ou lactobacilos/difteroides: contaminação – repetir coleta.',
      'Antibiograma: orientar troca de antibiótico em 48–72 h; resistência de E. coli a SMX-TMP e ampicilina é elevada no Brasil; cefalosporinas de 1ª geração (cefalexina) e amoxicilina-clavulanato são opções orais; ITU febril em < 2–3 meses ou toxemia: internar e tratar IV.',
      'Após ITU febril: ultrassom de rins e vias urinárias; uretrocistografia se ultrassom alterado, ITU recorrente ou atípica (não E. coli, sepse, sem resposta em 48 h).',
      'Bacteriúria assintomática não deve ser tratada (exceto gestantes).'
    ],
    quandoSolicitar: [
      'Toda suspeita de ITU (febre sem foco em < 2 anos, sintomas urinários, urina 1 alterada), antes de iniciar antibiótico; RN com icterícia prolongada, sepse ou baixo ganho de peso; recorrência de sintomas após tratamento (não é necessário controle de cura de rotina em criança assintomática).'
    ],
    fontes: [
      { nome: 'AAP – Clinical Practice Guideline: Urinary Tract Infection in Febrile Infants and Children 2 to 24 Months', ano: 2011 },
      { nome: 'AAP – Subcommittee on UTI – Reaffirmation', ano: 2016 },
      { nome: 'SBP – Infecção do trato urinário: Documento Científico', ano: 2016 },
      { nome: 'NICE – Urinary tract infection in under 16s: diagnosis and management (NG224)', ano: 2022 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'liquor', nome: 'Líquor (LCR) – exame quimiocitológico, bacterioscopia e cultura', categoria: 'liquor',
    descricao: 'Análise do líquido cefalorraquidiano obtido por punção lombar: celularidade com diferencial, proteína, glicose (comparar com glicemia simultânea), Gram, cultura, látex/PCR para bactérias e vírus, pesquisa de BAAR/cultura para TB, tinta da China/antígeno criptocócico quando indicado.',
    referencias: [
      { faixa: 'RN a termo (0–28 d)', valores: 'Células 0–20/mm³ (aceito até 30 em RN a termo; até 60% de polimorfonucleares nos primeiros dias); proteína 20–170 mg/dL (média 90; prematuros até 150–200); glicose 34–119 mg/dL (≥ 50–60% da glicemia; relação líquor/sangue média 0,8); hemácias ausentes (punção traumática é comum – corrigir 1 leucócito para cada 500–1.000 hemácias).' },
      { faixa: 'Lactente (1–23 m)', valores: '1–3 meses: células 0–10/mm³ (predomínio mononuclear), proteína 20–100 mg/dL (até 60 após 2 meses); > 3 meses: células 0–5/mm³, sem polimorfonucleares; proteína 15–45 mg/dL; glicose 40–80 mg/dL (≥ 60% da glicemia).' },
      { faixa: 'Pré-escolar a adolescente', valores: 'Células 0–5/mm³ (linfócitos/monócitos; 0 polimorfonucleares); proteína 15–45 mg/dL; glicose 40–80 mg/dL (> 50–60% da glicemia simultânea); pressão de abertura 10–20 cmH2O (até 28 em crianças sedadas); aspecto límpido e incolor.' }
    ],
    interpretacao: [
      'Meningite bacteriana: aspecto turvo, células geralmente > 1.000/mm³ (pode ser 100–10.000) com predomínio de polimorfonucleares (> 60–80%), proteína > 100 mg/dL, glicose < 40 mg/dL ou relação líquor/sangue < 0,4, Gram positivo em 60–90% dos não tratados; látex útil se antibiótico prévio. Em RN, qualquer valor acima dos limites deve ser tratado como meningite até prova contrária.',
      'Meningite viral/asséptica (enterovírus, arbovírus, caxumba): células 10–500/mm³ com predomínio de linfócitos (nas primeiras 24–48 h pode haver predomínio de PMN), proteína normal ou pouco elevada (< 100), glicose normal.',
      'Meningite tuberculosa: líquor límpido/xantocrômico, células 50–500/mm³ com predomínio linfocitário, proteína elevada (100–500 mg/dL, pode formar véu), glicose baixa (< 40–50 mg/dL); BAAR raramente positivo; solicitar TRM-TB, cultura e ADA; iniciar tratamento empírico se forte suspeita (evolução subaguda, RX de tórax, contato, PT).',
      'Meningite fúngica (criptococo – imunossuprimidos/HIV): pleocitose linfocitária moderada, proteína alta, glicose baixa; tinta da China/antígeno criptocócico positivo; pressão de abertura muito elevada.',
      'Encefalite herpética: pleocitose linfocitária, hemácias/xantocromia, proteína elevada, glicose normal; PCR para HSV; iniciar aciclovir empírico na suspeita. Malária cerebral: líquor geralmente normal (excluir meningite com PL se não houver contraindicação).',
      'Líquor com antibiótico prévio (meningite parcialmente tratada): Gram/cultura podem negativar; celularidade, proteína e glicose permanecem alteradas por 24–48 h; usar látex/PCR.',
      'Punção traumática: relação hemácias/leucócitos ≈ 500–1.000:1 é esperada; se leucócitos excedem a proporção, considerar meningite.',
      'Contraindicações de PL (fazer imagem/tratar antes): sinais de hipertensão intracraniana/herniação (papiledema, anisocoria, postura, bradicardia + hipertensão), déficit focal, Glasgow < 9 ou queda rápida, instabilidade hemodinâmica/respiratória, coagulopatia/plaquetas < 50.000, infecção no local, convulsão recente prolongada. Nunca atrasar o antibiótico pela PL.'
    ],
    quandoSolicitar: [
      'Suspeita de meningite/encefalite: febre + rigidez de nuca, abaulamento de fontanela, irritabilidade/letargia, convulsão febril complexa ou em < 12 meses com vacinação incompleta, petéquias com febre, sepse neonatal ou em < 3 meses com febre (lactentes 8–21 dias sempre; 22–60 dias conforme marcadores inflamatórios), rebaixamento com febre, cefaleia intensa com vômitos e febre, suspeita de neurotuberculose/neurocriptococose, hidrocefalia infecciosa.'
    ],
    fontes: [
      { nome: 'Nelson Textbook of Pediatrics, 22ª ed.', ano: 2024 },
      { nome: 'The Harriet Lane Handbook, 23ª ed.', ano: 2023 },
      { nome: 'AAP – Evaluation and Management of Well-Appearing Febrile Infants 8 to 60 Days Old', ano: 2021 },
      { nome: 'Ministério da Saúde – Guia de Vigilância em Saúde, 6ª ed. (Meningites)', ano: 2023 },
      { nome: 'Ministério da Saúde – Manual de Recomendações para o Controle da Tuberculose no Brasil', ano: 2019 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'gota_espessa', nome: 'Gota espessa / esfregaço para malária', categoria: 'infeccioso',
    descricao: 'Exame parasitológico direto do sangue periférico, padrão-ouro e método oficial do Programa Nacional de Prevenção e Controle da Malária: permite identificar a espécie (P. vivax, P. falciparum, P. malariae, mistas), o estágio e quantificar a parasitemia. Resultado em 30–60 min; sensibilidade de ~50–100 parasitos/µL em microscopista treinado.',
    referencias: [
      { faixa: 'Todas as idades', valores: 'Resultado normal: negativo (ausência de plasmódios em 100 campos). Semiquantitativo em cruzes (MS): +/2 = 40–60 parasitos/100 campos; + = 1 parasito/campo (≈ 500/mm³); ++ = 2–20 parasitos/campo (≈ 501–10.000/mm³); +++ = 21–200 parasitos/campo (≈ 10.001–100.000/mm³); ++++ = > 200 parasitos/campo (> 100.000/mm³). Contagem por mm³: parasitos por 200 leucócitos × (leucócitos/mm³ ÷ 200).' }
    ],
    interpretacao: [
      'Positivo: iniciar tratamento no mesmo dia conforme espécie, idade/peso e gravidade (Guia de Tratamento da Malária no Brasil – MS): P. vivax/ovale – cloroquina 3 dias + primaquina (7 dias na dose de 0,5 mg/kg/dia ou 14 dias a 0,25 mg/kg/dia; dose ajustada; contraindicada em < 6 meses, gestantes e deficiência de G6PD); P. falciparum – artemeter+lumefantrina (ou artesunato+mefloquina) 3 dias + primaquina dose única 0,5 mg/kg no 1º dia (> 6 meses); mista – ACT + primaquina 7 dias.',
      'Hiperparasitemia (P. falciparum > 100.000/mm³ ou ++++, ou > 2% das hemácias em não imunes) é critério de malária grave (MS/OMS) – artesunato IV/IM e internação; outros critérios: prostração, alteração de consciência, convulsões, insuficiência respiratória, choque, icterícia (BT > 3 mg/dL), hipoglicemia, acidose, anemia grave (Hb < 5 g/dL ou Ht < 15% em < 12 anos), IRA, hemoglobinúria, sangramento. P. vivax também causa malária grave em crianças na Amazônia.',
      'Negativo com forte suspeita clínica (febre em área endêmica, exposição): repetir a cada 12–24 h por 2–3 dias (parasitemia oscila com o ciclo, especialmente P. falciparum sequestrado); considerar teste rápido e PCR se disponível. Uma única lâmina negativa não exclui malária.',
      'Lâmina de verificação de cura (LVC): P. falciparum em dias 3, 7, 14, 21, 28, 35 e 42; P. vivax em dias 3, 7, 14, 21, 28, 42 e 63 (recaída por hipnozoítos). Parasitemia no dia 3 > 25% da inicial: suspeitar de falha terapêutica.',
      'Gametócitos isolados de P. falciparum após tratamento não indicam falha (podem persistir por semanas) – indicação de primaquina em dose única.',
      'Anemia, plaquetopenia e esplenomegalia acompanham; em lactentes a apresentação pode ser inespecífica (irritabilidade, recusa alimentar, vômitos, palidez, sem padrão febril clássico).'
    ],
    quandoSolicitar: [
      'Toda criança com febre (ou história de febre nos últimos 30 dias) residente ou procedente de área endêmica (Amazônia Legal), independentemente de outros sintomas; anemia inexplicada, esplenomegalia, icterícia, convulsão ou rebaixamento com febre; RN de mãe com malária na gestação (transmissão congênita); controle de cura (LVC).'
    ],
    fontes: [
      { nome: 'Ministério da Saúde – Guia de Tratamento da Malária no Brasil, 2ª ed.', ano: 2021 },
      { nome: 'Ministério da Saúde – Manual de Diagnóstico Laboratorial da Malária', ano: 2009 },
      { nome: 'OMS – Guidelines for Malaria', ano: 2023 },
      { nome: 'Ministério da Saúde – Guia de Vigilância em Saúde, 6ª ed.', ano: 2023 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'teste_rapido_malaria', nome: 'Teste rápido para malária (TDR – imunocromatográfico)', categoria: 'infeccioso',
    descricao: 'Detecta antígenos parasitários no sangue capilar: HRP2 (específico de P. falciparum) e pLDH (pan-Plasmodium ou específico de P. vivax) ou aldolase. Resultado em 15–20 min; indicado pelo MS em áreas sem microscopia disponível ou para diagnóstico oportuno em serviços de urgência. Não quantifica a parasitemia nem substitui a lâmina para controle de cura.',
    referencias: [
      { faixa: 'Todas as idades', valores: 'Negativo: ausência de antígenos detectáveis. Sensibilidade > 90–95% para P. falciparum com parasitemia > 100–200/µL; menor para P. vivax e para parasitemias baixas (< 100–200/µL). Especificidade ~95–99%.' }
    ],
    interpretacao: [
      'Positivo para P. falciparum (HRP2) ou pan/vivax (pLDH): tratar imediatamente conforme espécie indicada; solicitar gota espessa para confirmar espécie, quantificar parasitemia e avaliar gravidade.',
      'HRP2 pode permanecer positivo por 2–4 semanas após tratamento eficaz (antígeno persistente): não usar para diagnóstico de falha ou recrudescência; pLDH negativa em poucos dias após a cura.',
      'Negativo com alta suspeita clínica: não exclui malária (parasitemia baixa, deleção do gene hrp2/hrp3 descrita na Amazônia para P. falciparum, efeito prozona em parasitemias muito altas): fazer gota espessa e repetir em 12–24 h.',
      'Infecções mistas podem ser subestimadas; P. malariae tem baixa detecção.',
      'Resultado inválido (sem linha controle): repetir com novo dispositivo.'
    ],
    quandoSolicitar: [
      'Suspeita de malária em local/horário sem microscopia disponível (unidades ribeirinhas, indígenas, atendimento noturno), para reduzir o tempo até o tratamento; triagem em emergência com febre de área endêmica, sempre complementada pela gota espessa quando possível.'
    ],
    fontes: [
      { nome: 'Ministério da Saúde – Guia de Tratamento da Malária no Brasil, 2ª ed.', ano: 2021 },
      { nome: 'Ministério da Saúde – Nota Técnica sobre uso de testes rápidos para malária', ano: 2019 },
      { nome: 'OMS – Malaria rapid diagnostic test performance (product testing)', ano: 2021 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'ns1_dengue', nome: 'Antígeno NS1 – dengue', categoria: 'infeccioso',
    descricao: 'Detecção da proteína não estrutural 1 do vírus dengue no soro por ELISA ou teste rápido imunocromatográfico. Útil na fase aguda (viremia): do 1º ao 5º dia (idealmente até o 3º) de sintomas. Sensibilidade 60–90% (menor em infecção secundária e por sorotipo DENV-4); especificidade > 95%.',
    referencias: [
      { faixa: 'Todas as idades', valores: 'Não reagente (negativo) em pessoas não infectadas. Reagente indica infecção aguda por dengue (não diferencia sorotipo). Janela ideal: 1º–5º dia de febre (em alguns casos até o 7º–9º dia).' }
    ],
    interpretacao: [
      'NS1 reagente: caso confirmado de dengue (MS) – classificar (grupos A, B, C, D), orientar hidratação, sinais de alarme e retorno; notificar. Não altera a conduta clínica, que é baseada na classificação de risco.',
      'NS1 não reagente entre o 1º e o 5º dia: não exclui dengue (sensibilidade limitada, sobretudo em infecção secundária, frequente em áreas endêmicas como o Amazonas); manter conduta clínica e solicitar sorologia IgM a partir do 6º dia (ou RT-PCR até o 5º dia).',
      'Após o 5º–6º dia, o exame de escolha passa a ser a sorologia IgM; após o 7º dia o NS1 é habitualmente negativo.',
      'Reatividade cruzada com Zika é rara para NS1 (ao contrário da sorologia IgG); em coinfecções/áreas com zika e chikungunya, solicitar painel de arboviroses conforme clínica.',
      'Em situações de epidemia, o MS pode orientar a confirmação por critério clínico-epidemiológico, reservando exames para casos graves, atípicos, gestantes, crianças pequenas e óbitos.'
    ],
    quandoSolicitar: [
      'Febre aguda (≤ 5 dias) com suspeita de dengue: febre + 2 ou mais de náuseas/vômitos, exantema, mialgia/artralgia, cefaleia/dor retro-orbital, petéquias/prova do laço positiva, leucopenia, em área com transmissão; prioritário em crianças com sinais de alarme, lactentes, comorbidades e casos internados.'
    ],
    fontes: [
      { nome: 'Ministério da Saúde – Dengue: diagnóstico e manejo clínico – adulto e criança, 6ª ed.', ano: 2024 },
      { nome: 'Ministério da Saúde – Guia de Vigilância em Saúde, 6ª ed. (Arboviroses urbanas)', ano: 2023 },
      { nome: 'OPAS/OMS – Dengue: guidelines for patient care in the Region of the Americas, 2ª ed.', ano: 2016 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'sorologia_dengue', nome: 'Sorologia para dengue (IgM / IgG)', categoria: 'infeccioso',
    descricao: 'ELISA de captura para IgM (MAC-ELISA) e IgG. IgM surge a partir do 5º–6º dia de sintomas (pico na 2ª semana) e persiste por 2–3 meses; IgG surge na 2ª semana na infecção primária (persiste por toda a vida) e desde os primeiros dias, em títulos altos, na infecção secundária.',
    referencias: [
      { faixa: 'Todas as idades', valores: 'IgM não reagente e IgG não reagente: sem evidência de infecção (se colhida antes do 6º dia, repetir). IgM reagente: infecção recente/aguda (a partir do 6º dia). IgG reagente isolada: infecção pregressa ou vacinação. Soroconversão ou aumento ≥ 4× nos títulos de IgG entre amostras pareadas (intervalo 14–21 dias): confirmação.' }
    ],
    interpretacao: [
      'IgM reagente a partir do 6º dia de sintomas: caso confirmado de dengue recente (MS). Pode permanecer positiva por 2–3 meses, logo não confirma que a doença atual é dengue se houve episódio recente prévio.',
      'IgM não reagente colhida antes do 6º dia não exclui: repetir após o 6º dia. Colhida após o 6º dia e negativa: dengue improvável – considerar outras arboviroses (chikungunya, zika, oropouche, mayaro), malária, leptospirose, febre tifoide, sepse.',
      'IgG positiva com IgM negativa: infecção pregressa (comum em residentes de área endêmica) ou vacinação (Qdenga); infecção secundária (IgG alta precoce) associa-se a maior risco de dengue grave.',
      'Reatividade cruzada entre flavivírus (dengue, zika, febre amarela – inclusive vacinal): IgM/IgG de dengue podem ser falso-positivas em zika e vice-versa; na dúvida, RT-PCR ou PRNT.',
      'A conduta é clínica (classificação de risco e hidratação): não aguardar sorologia para tratar.'
    ],
    quandoSolicitar: [
      'Suspeita de dengue com ≥ 6 dias de sintomas (ou NS1 negativo na fase aguda), casos com sinais de alarme/graves, internados, óbitos suspeitos, investigação epidemiológica; diferenciação com outras arboviroses quando o quadro é atípico.'
    ],
    fontes: [
      { nome: 'Ministério da Saúde – Dengue: diagnóstico e manejo clínico – adulto e criança, 6ª ed.', ano: 2024 },
      { nome: 'Ministério da Saúde – Guia de Vigilância em Saúde, 6ª ed.', ano: 2023 },
      { nome: 'OPAS/OMS – Dengue: guidelines for patient care in the Region of the Americas', ano: 2016 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'sorologia_arboviroses', nome: 'Sorologia para arboviroses (zika, chikungunya, febre amarela, oropouche, mayaro)', categoria: 'infeccioso',
    descricao: 'Pesquisa de IgM (e IgG) por ELISA para arbovírus circulantes na Amazônia. A janela e a especificidade variam: chikungunya IgM surge do 5º–7º dia e persiste meses; zika IgM do 5º dia (cruza com dengue); febre amarela IgM do 5º–6º dia (cruza com outros flavivírus e com a vacina recente); oropouche IgM do 5º–7º dia (ELISA/LACEN – testes disponíveis principalmente na rede de vigilância); mayaro IgM (cruza com chikungunya).',
    referencias: [
      { faixa: 'Todas as idades', valores: 'Não reagente: sem evidência de infecção recente (repetir se colhida antes do 5º–6º dia). Reagente para IgM: infecção recente compatível, sujeita a confirmação por RT-PCR na fase aguda ou por PRNT/soroconversão para flavivírus. Vacinação recente contra febre amarela (até 30–60 dias) gera IgM positiva.' }
    ],
    interpretacao: [
      'Chikungunya: febre alta + poliartralgia intensa/edema articular (em lactentes: exantema, vesículas/bolhas, hiperpigmentação, encefalite neonatal por transmissão intraparto); IgM reagente do 5º–7º dia confirma; artralgia pode persistir meses (fase subaguda/crônica).',
      'Zika: exantema pruriginoso precoce, conjuntivite não purulenta, febre baixa ou ausente; IgM cruza com dengue – confirmar com RT-PCR (sangue até 5 dias; urina até 14 dias). Gestantes: notificar e acompanhar (síndrome congênita); RN com microcefalia/alterações neurológicas: sorologia IgM no RN e na mãe.',
      'Febre amarela: febre, icterícia, oligúria, sangramentos, AST/ALT muito elevadas em não vacinado com exposição silvestre (Amazonas – ACRV); IgM reagente em não vacinado recentemente é forte evidência; confirmar por RT-PCR (até o 10º dia) ou PRNT; notificação imediata.',
      'Oropouche: febre, cefaleia intensa, mialgia, artralgia, fotofobia, recorrência dos sintomas em 1–2 semanas, meningite asséptica; surtos em Amazonas/Pará/Rondônia (2023–2025); diagnóstico principalmente por RT-PCR na fase aguda (LACEN); sorologia IgM em fase convalescente; casos em gestantes exigem investigação (transmissão vertical descrita).',
      'Mayaro: quadro semelhante à chikungunya (artralgia prolongada) em áreas de floresta; IgM cruza com chikungunya – confirmar por PCR/PRNT.',
      'Resultados sorológicos isolados devem ser integrados com clínica, epidemiologia e tempo de doença; falsos positivos por reação cruzada são frequentes entre flavivírus e entre alfavírus.'
    ],
    quandoSolicitar: [
      'Síndrome febril aguda com exantema, artralgia, conjuntivite, icterícia ou sintomas neurológicos em área endêmica após o 5º–6º dia de sintomas (na fase aguda, preferir RT-PCR); gestantes com exantema; RN com microcefalia/calcificações; casos graves ou atípicos; investigação de surto (encaminhar ao LACEN).'
    ],
    fontes: [
      { nome: 'Ministério da Saúde – Guia de Vigilância em Saúde, 6ª ed. (Arboviroses)', ano: 2023 },
      { nome: 'Ministério da Saúde – Chikungunya: manejo clínico', ano: 2017 },
      { nome: 'Ministério da Saúde – Febre amarela: guia para profissionais de saúde', ano: 2018 },
      { nome: 'Ministério da Saúde – Notas Técnicas sobre a febre do Oropouche', ano: 2024 },
      { nome: 'OPAS/OMS – Alerta epidemiológico: Oropouche na Região das Américas', ano: 2024 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'rt_pcr_arboviroses', nome: 'RT-PCR para arboviroses (dengue, zika, chikungunya, oropouche, febre amarela, mayaro)', categoria: 'infeccioso',
    descricao: 'Detecção molecular do RNA viral (RT-PCR em tempo real, frequentemente em painel multiplex dengue/zika/chikungunya) em soro/plasma na fase de viremia; para zika, a urina amplia a janela. Realizado nos LACEN/laboratórios de referência; alta especificidade e identificação do sorotipo/genótipo.',
    referencias: [
      { faixa: 'Todas as idades', valores: 'Não detectável em não infectados ou fora da janela de viremia. Janelas: dengue – soro até o 5º dia (ideal 1º–3º); zika – soro até o 5º dia, urina até o 14º dia; chikungunya – soro até o 8º dia; oropouche – soro até o 5º–7º dia (líquor em casos neurológicos); febre amarela – soro até o 10º dia (também tecidos/urina); mayaro – soro até o 5º–7º dia.' }
    ],
    interpretacao: [
      'Detectável: caso confirmado da arbovirose identificada (não exclui coinfecção – painéis multiplex ajudam); em dengue informa o sorotipo (DENV-1 a 4), relevante para vigilância e risco de infecção secundária.',
      'Não detectável dentro da janela: torna a infecção menos provável, mas não a exclui (viremia baixa/curta, coleta tardia, transporte inadequado); complementar com NS1 (dengue) e sorologia IgM após o 6º dia.',
      'Coleta após a janela de viremia: resultado negativo não tem valor – solicitar sorologia.',
      'Prioridade de uso (MS): casos graves/óbitos, gestantes, RN com suspeita de síndrome congênita, quadros neurológicos, áreas com circulação de múltiplos arbovírus ou em investigação de surtos (oropouche, mayaro, febre amarela).',
      'Amostra: sangue em tubo seco/EDTA, refrigerado a 2–8 °C e enviado em até 48 h (ou congelado a −70 °C); urina para zika em frasco estéril refrigerado.'
    ],
    quandoSolicitar: [
      'Suspeita de arbovirose nos primeiros 5 dias de sintomas (até 8 para chikungunya, 14 dias em urina para zika, 10 para febre amarela), especialmente casos graves, internados, gestantes, lactentes, quadros neurológicos e situações de vigilância; suspeita de oropouche ou mayaro (sorologia pouco disponível).'
    ],
    fontes: [
      { nome: 'Ministério da Saúde – Guia de Vigilância em Saúde, 6ª ed. (Arboviroses)', ano: 2023 },
      { nome: 'Ministério da Saúde – Dengue: diagnóstico e manejo clínico – adulto e criança, 6ª ed.', ano: 2024 },
      { nome: 'Ministério da Saúde – Nota Técnica: diagnóstico laboratorial da febre do Oropouche', ano: 2024 },
      { nome: 'CDC – Zika virus testing guidance', ano: 2019 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'hemocultura', nome: 'Hemocultura', categoria: 'microbiologia',
    descricao: 'Cultura de sangue para bactérias e fungos (frascos pediátricos aeróbios; anaeróbios e fungos conforme suspeita). O volume de sangue é o principal determinante da sensibilidade; colher com antissepsia rigorosa, antes do antibiótico (sem atrasá-lo), idealmente 2 amostras de sítios diferentes.',
    referencias: [
      { faixa: 'Volume recomendado por peso', valores: '≤ 1 kg: 0,5–1 mL; 1–2 kg: 1–1,5 mL; 2–12 kg: 2–3 mL por frasco (mínimo 1 mL em RN); 12–36 kg: 5 mL; > 36 kg: 8–10 mL por frasco (≈ 1 mL/kg até 10 mL, ou 1–2% da volemia no total). Resultado esperado: negativo (sem crescimento em 5 dias); a maioria dos verdadeiros positivos cresce em 24–48 h.' }
    ],
    interpretacao: [
      'Crescimento de patógeno reconhecido (S. pneumoniae, S. aureus, E. coli, Salmonella, Klebsiella, N. meningitidis, H. influenzae, Streptococcus do grupo B em RN, Listeria, Candida): bacteremia verdadeira – ajustar antibiótico pelo antibiograma, definir duração e investigar foco (endocardite se S. aureus persistente, osteomielite, meningite).',
      'Estafilococos coagulase-negativos, difteroides, Bacillus, Micrococcus em 1 de 2 amostras, com crescimento tardio (> 48 h): provável contaminação – valorizar apenas em RN, portadores de cateter central, próteses ou imunossuprimidos.',
      'Salmonella não tifoide/S. Typhi: comum em febre prolongada em áreas com saneamento precário; tratar bacteremia por Salmonella em < 3 meses e imunossuprimidos.',
      'Hemocultura negativa não exclui infecção bacteriana (antibiótico prévio, volume insuficiente, bacteremia intermitente); sensibilidade global 30–60% na sepse.',
      'Tempo de positividade < 12–24 h correlaciona-se com carga bacteriana alta e gravidade; em RN, colher também líquor e urocultura conforme protocolo.'
    ],
    quandoSolicitar: [
      'Sepse/choque séptico, febre em RN e lactentes < 3 meses (protocolo do lactente febril), febre em neutropênico ou imunossuprimido, pneumonia grave/complicada, meningite, osteoartrite, celulite extensa, febre prolongada sem foco (≥ 7 dias – incluir febre tifoide), endocardite suspeita, febre em portador de cateter central, desnutrição grave com febre/hipotermia.'
    ],
    fontes: [
      { nome: 'IDSA/ASM – A Guide to Utilization of the Microbiology Laboratory for Diagnosis of Infectious Diseases', ano: 2018 },
      { nome: 'The Harriet Lane Handbook, 23ª ed.', ano: 2023 },
      { nome: 'Surviving Sepsis Campaign Pediátrico', ano: 2020 },
      { nome: 'AAP – Evaluation and Management of Well-Appearing Febrile Infants 8 to 60 Days Old', ano: 2021 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'radiografia_torax', nome: 'Radiografia de tórax', categoria: 'imagem',
    descricao: 'Incidências PA (ou AP em lactentes) e perfil. Não é necessária de rotina na pneumonia comunitária não complicada tratada ambulatorialmente (SBP/BTS), mas é indicada em casos graves, internados, hipoxemia, suspeita de complicação, falha terapêutica ou dúvida diagnóstica. Interpretar sempre com a clínica.',
    referencias: [
      { faixa: 'RN e lactente', valores: 'Timo proeminente (sinal da vela) é normal até 2–3 anos; índice cardiotorácico até 0,6 no RN e 0,55 no lactente; tórax mais arredondado; expiração/rotação simulam infiltrados e cardiomegalia.' },
      { faixa: 'Pré-escolar a adolescente', valores: 'Índice cardiotorácico < 0,5; hilos simétricos; seios costofrênicos livres; cúpula direita até 1–2 cm mais alta; 8–9 arcos costais posteriores visíveis em boa inspiração.' }
    ],
    interpretacao: [
      'Consolidação lobar/segmentar com broncograma aéreo: compatível com pneumonia bacteriana (pneumococo); pneumonia redonda em pré-escolares é frequentemente pneumocócica.',
      'Infiltrado intersticial/peribrônquico bilateral com hiperinsuflação e atelectasias: compatível com infecção viral (bronquiolite) ou asma; não indica antibiótico.',
      'Derrame pleural (velamento do seio costofrênico, linha de Damoiseau; confirmar com ultrassom): pneumonia complicada – considerar toracocentese/drenagem; pneumatoceles, abscesso e pneumotórax sugerem S. aureus.',
      'Padrão miliar (micronódulos difusos), adenopatia hilar/mediastinal, atelectasia por compressão brônquica ou consolidação persistente: considerar tuberculose (pontuação do MS para TB na criança); cavitação em adolescentes.',
      'Cardiomegalia (ICT > 0,5 após 1 ano) com congestão: cardiopatia, miocardite (dengue, chikungunya, viral), febre reumática; cardiomegalia com pulmões limpos: derrame pericárdico.',
      'Hiperinsuflação unilateral/atelectasia com história de engasgo: corpo estranho (RX em expiração ou decúbito lateral); pneumomediastino/enfisema subcutâneo em crise asmática grave.',
      'RX normal não exclui pneumonia precoce, bronquiolite ou asma; RX de controle só é indicado em pneumonia complicada, redonda, atelectasia persistente ou sintomas persistentes após 4–6 semanas.'
    ],
    quandoSolicitar: [
      'Pneumonia grave ou com necessidade de internação, hipoxemia, falha após 48–72 h de antibiótico, suspeita de derrame/empiema ou abscesso, tosse > 3 semanas/suspeita de TB, febre prolongada sem foco com leucocitose, suspeita de corpo estranho, trauma torácico, cardiopatia/insuficiência cardíaca, crise asmática grave com assimetria ou dor torácica, RN com desconforto respiratório.'
    ],
    fontes: [
      { nome: 'SBP – Diretrizes brasileiras em pneumonia adquirida na comunidade em pediatria', ano: 2007 },
      { nome: 'BTS – Guidelines for the management of community acquired pneumonia in children (update)', ano: 2011 },
      { nome: 'IDSA/PIDS – Management of Community-Acquired Pneumonia in Infants and Children Older Than 3 Months', ano: 2011 },
      { nome: 'Ministério da Saúde – Manual de Recomendações para o Controle da Tuberculose no Brasil', ano: 2019 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'elisa_leishmaniose', nome: 'Sorologia para leishmaniose visceral (ELISA / IFI)', categoria: 'infeccioso',
    descricao: 'Pesquisa de anticorpos anti-Leishmania por imunofluorescência indireta (IFI) ou ELISA, disponíveis na rede pública (LACEN). Sensibilidade 85–95% em imunocompetentes; menor em coinfecção HIV. Anticorpos persistem por meses a anos após a cura, e podem ser positivos em infecção assintomática.',
    referencias: [
      { faixa: 'Todas as idades', valores: 'IFI: não reagente ou títulos < 1:40; reagente/positivo ≥ 1:80 (títulos 1:40 são indeterminados – repetir em 30 dias). ELISA: não reagente (abaixo do cut-off do kit).' }
    ],
    interpretacao: [
      'Sorologia reagente + quadro clínico compatível (febre prolongada > 2 semanas, esplenomegalia volumosa, hepatomegalia, palidez, emagrecimento, pancitopenia, hipergamaglobulinemia/inversão albumina-globulina) em área de transmissão: caso confirmado por critério laboratorial (MS) – iniciar tratamento (anfotericina B lipossomal 3 mg/kg/dia por 7 dias é a 1ª escolha em crianças no Brasil desde 2022; antimoniato de meglumina como alternativa).',
      'Sorologia não reagente com forte suspeita: não exclui (fase muito inicial, imunossuprimidos, HIV) – realizar rK39 e exame parasitológico (aspirado de medula óssea: sensibilidade 60–85%; baço > 95%, mas com risco).',
      'Reações cruzadas: doença de Chagas, leishmaniose tegumentar, malária, hanseníase, tuberculose e outras – interpretar no contexto clínico.',
      'Não usar sorologia para controle de cura (permanece positiva); o acompanhamento é clínico (febre, baço, peso, hemograma) por 12 meses.',
      'Leishmaniose visceral não tratada em crianças pequenas tem letalidade elevada; sinais de gravidade (MS): idade < 1 ano, desnutrição grave, sangramento, infecção bacteriana associada, icterícia, edema, Hb < 7, neutrófilos < 500, plaquetas < 50.000, creatinina elevada.'
    ],
    quandoSolicitar: [
      'Febre prolongada (> 7–14 dias) com esplenomegalia e/ou hepatomegalia, pancitopenia, emagrecimento, em criança procedente de área com transmissão (na Amazônia: Pará, Tocantins, Roraima, Maranhão; casos esporádicos no Amazonas), especialmente < 5 anos; febre em criança com HIV; suspeita de calazar em desnutrido grave.'
    ],
    fontes: [
      { nome: 'Ministério da Saúde – Manual de Vigilância e Controle da Leishmaniose Visceral', ano: 2014 },
      { nome: 'Ministério da Saúde – Guia de Vigilância em Saúde, 6ª ed.', ano: 2023 },
      { nome: 'Ministério da Saúde – Nota Informativa: anfotericina B lipossomal como primeira escolha para LV', ano: 2022 },
      { nome: 'OPAS – Leishmanioses: manual para diagnóstico e tratamento nas Américas', ano: 2022 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'rk39', nome: 'Teste rápido rK39 (leishmaniose visceral)', categoria: 'infeccioso',
    descricao: 'Teste imunocromatográfico que detecta anticorpos contra o antígeno recombinante K39 de Leishmania infantum/donovani em sangue total, soro ou plasma, com resultado em 10–20 min. Incorporado pelo MS como teste de triagem/diagnóstico na rede de atenção; sensibilidade ~90–95% e especificidade ~90–95% em imunocompetentes no Brasil; menor sensibilidade em pacientes com HIV.',
    referencias: [
      { faixa: 'Todas as idades', valores: 'Não reagente: sem anticorpos detectáveis. Reagente: presença de anticorpos anti-rK39 (linha teste + linha controle). Inválido: sem linha controle – repetir.' }
    ],
    interpretacao: [
      'Reagente + quadro clínico compatível em área endêmica: pode confirmar o caso e autorizar o início do tratamento (MS), dispensando o aspirado de medula na maioria dos casos.',
      'Reagente em pessoa assintomática: infecção assintomática ou cicatriz sorológica – não tratar; acompanhar clinicamente.',
      'Não reagente com forte suspeita: solicitar IFI/ELISA e/ou exame parasitológico (aspirado de medula – pesquisa direta, cultura, PCR); em pacientes com HIV a sensibilidade cai para 60–80%.',
      'Permanece positivo após a cura – não serve para controle de cura nem para diagnóstico de recidiva (usar parasitológico).',
      'Reações cruzadas possíveis com doença de Chagas e leishmaniose tegumentar.'
    ],
    quandoSolicitar: [
      'Suspeita clínica de leishmaniose visceral (febre prolongada + esplenomegalia ± pancitopenia) em área com transmissão, como primeiro exame na atenção primária/emergência; diagnóstico rápido em crianças graves antes de transferência.'
    ],
    fontes: [
      { nome: 'Ministério da Saúde – Manual de Vigilância e Controle da Leishmaniose Visceral', ano: 2014 },
      { nome: 'Ministério da Saúde – Nota Técnica: uso do teste rápido rK39 para LV', ano: 2015 },
      { nome: 'OPAS – Leishmanioses: manual para diagnóstico e tratamento nas Américas', ano: 2022 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'exame_parasitologico_fezes', nome: 'Exame parasitológico de fezes (EPF)', categoria: 'microbiologia',
    descricao: 'Pesquisa de ovos, cistos, larvas e trofozoítos por métodos de sedimentação (Hoffman/Lutz), flutuação (Faust – protozoários), Kato-Katz (quantificação de helmintos, especialmente Schistosoma mansoni), Baermann-Moraes/Rugai (larvas de Strongyloides stercoralis) e fita adesiva de Graham (Enterobius). Solicitar 3 amostras em dias alternados (MIF ou frasco com conservante) para aumentar a sensibilidade.',
    referencias: [
      { faixa: 'Todas as idades', valores: 'Resultado normal: negativo para ovos, cistos e larvas. Achado de Entamoeba coli, Endolimax nana, Iodamoeba butschlii e Blastocystis (sem sintomas) é considerado comensal/não patogênico e não exige tratamento de rotina.' }
    ],
    interpretacao: [
      'Ascaris lumbricoides, Trichuris trichiura, ancilostomídeos (anemia ferropriva), Strongyloides (eosinofilia; risco de hiperinfecção com corticoide/imunossupressão – tratar sempre com ivermectina), Enterobius (prurido anal – fita de Graham), Hymenolepis nana, Taenia sp.: tratar conforme espécie (albendazol, mebendazol, ivermectina, praziquantel) e orientar higiene/saneamento; alta prevalência na região justifica tratamento periódico empírico (albendazol) em > 1–2 anos conforme programa.',
      'Giardia lamblia (cistos/trofozoítos): diarreia crônica, distensão, má absorção, baixo ganho de peso – tratar (metronidazol, tinidazol, nitazoxanida). Entamoeba histolytica/dispar (indistinguíveis à microscopia): tratar se sintomas de disenteria ou colite; amebíase invasiva: sorologia/antígeno.',
      'Kato-Katz: contagem de ovos por grama de fezes (S. mansoni – baixa < 100, moderada 100–399, alta ≥ 400 ovos/g) orienta intensidade e resposta ao praziquantel; esquistossomose é focal na Amazônia (Pará/Maranhão) – considerar história de exposição.',
      'Exame negativo não exclui parasitose (eliminação intermitente): repetir com 3 amostras e método específico (Baermann para Strongyloides, Graham para oxiúros).',
      'Diarreia aguda aquosa geralmente é viral e não requer EPF; solicitar em diarreia persistente (> 14 dias), disenteria, eosinofilia, anemia, desnutrição, dor abdominal recorrente, prurido anal, antes de corticoterapia (Strongyloides).'
    ],
    quandoSolicitar: [
      'Diarreia persistente ou crônica, disenteria, dor abdominal recorrente, distensão, baixo ganho de peso/desnutrição, anemia ferropriva, eosinofilia, prurido anal, eliminação de vermes, antes de corticoide/imunossupressão (pesquisar Strongyloides), avaliação de saúde de crianças de comunidades sem saneamento e indígenas.'
    ],
    fontes: [
      { nome: 'Ministério da Saúde – Guia de Vigilância em Saúde, 6ª ed. (Geo-helmintíases, Esquistossomose)', ano: 2023 },
      { nome: 'SBP – Tratado de Pediatria, 5ª ed. (Parasitoses intestinais)', ano: 2022 },
      { nome: 'OMS – Guideline: preventive chemotherapy to control soil-transmitted helminth infections', ano: 2017 },
      { nome: 'Nelson Textbook of Pediatrics, 22ª ed.', ano: 2024 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'baciloscopia', nome: 'Baciloscopia (pesquisa de BAAR)', categoria: 'microbiologia',
    descricao: 'Pesquisa direta de bacilos álcool-ácido resistentes (Ziehl-Neelsen ou fluorescência) em escarro (2 amostras: na consulta e na manhã seguinte), escarro induzido, lavado gástrico (3 manhãs consecutivas em jejum, em crianças que não expectoram), líquor, líquido pleural ou outros materiais. Em crianças a TB é paucibacilar: baciloscopia positiva em < 15–20% dos casos (maior em adolescentes com cavitação).',
    referencias: [
      { faixa: 'Todas as idades', valores: 'Negativa: ausência de BAAR em 100 campos. Positiva (MS): 1–9 BAAR/100 campos – relatar o número; + (10–99 BAAR/100 campos); ++ (1–10 BAAR/campo em 50 campos); +++ (> 10 BAAR/campo em 20 campos).' }
    ],
    interpretacao: [
      'Baciloscopia positiva em material respiratório + clínica/RX compatíveis: tuberculose pulmonar bacilífera – iniciar tratamento (esquema RHZ(E) em doses fixas combinadas conforme peso; crianças < 10 anos: RHZ), notificar, investigar contatos; isolamento respiratório enquanto bacilífero (raro em crianças pequenas).',
      'Baciloscopia negativa não exclui TB na criança (paucibacilar): utilizar o sistema de pontuação do MS (quadro clínico-radiológico, contato, prova tuberculínica/IGRA, estado nutricional: ≥ 40 pontos = muito provável; 30–35 = possível), TRM-TB e cultura.',
      'BAAR positivo em urina ou outros líquidos: podem ser micobactérias não tuberculosas – confirmar com cultura/identificação.',
      'Controle de tratamento em bacilíferos: baciloscopia mensal (ou ao menos no 2º, 4º e 6º mês); persistência positiva no 4º mês sugere falha/resistência – cultura com teste de sensibilidade.',
      'Hanseníase: a baciloscopia de raspado intradérmico (lóbulos de orelha, cotovelos, lesão) classifica em paucibacilar (negativa) ou multibacilar (índice baciloscópico > 0) – relevante na região Norte.'
    ],
    quandoSolicitar: [
      'Tosse ≥ 2–3 semanas, febre vespertina, perda de peso, sudorese noturna, contato com adulto com TB, RX sugestivo, adenopatia crônica, meningite subaguda, derrame pleural; sintomático respiratório em adolescentes; controle mensal de tratamento em bacilíferos; suspeita de hanseníase multibacilar (raspado dérmico).'
    ],
    fontes: [
      { nome: 'Ministério da Saúde – Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed. atualizada', ano: 2019 },
      { nome: 'Ministério da Saúde – Manual Técnico para o Diagnóstico Bacteriológico da Tuberculose', ano: 2022 },
      { nome: 'OMS – Consolidated guidelines on tuberculosis: Module 5 – Management of tuberculosis in children and adolescents', ano: 2022 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'teste_rapido_molecular_tb', nome: 'Teste rápido molecular para tuberculose (TRM-TB / GeneXpert MTB/RIF)', categoria: 'microbiologia',
    descricao: 'PCR em tempo real automatizada que detecta DNA de Mycobacterium tuberculosis e mutações associadas à resistência à rifampicina em ~2 horas, em escarro, escarro induzido, lavado gástrico, líquor, aspirado de linfonodo e outros materiais (Xpert Ultra tem maior sensibilidade em paucibacilares). Recomendado pelo MS/OMS como teste inicial em crianças e adolescentes com suspeita de TB.',
    referencias: [
      { faixa: 'Todas as idades', valores: 'MTB não detectado: sem DNA detectável na amostra. MTB detectado (muito baixo/baixo/médio/alto) + rifampicina sensível/resistente/indeterminada. Traços (Xpert Ultra) em criança/liquor/HIV: considerar positivo; em adulto com TB prévia pode ser DNA residual. Sensibilidade em crianças: ~60–70% em relação à cultura (maior em lavado gástrico/escarro induzido e em fluorescência); especificidade > 95%.' }
    ],
    interpretacao: [
      'MTB detectado, rifampicina sensível: iniciar tratamento padrão (RHZ ou RHZE conforme idade/peso), notificar e investigar contatos; não requer confirmação por baciloscopia.',
      'MTB detectado, resistência à rifampicina: encaminhar à referência terciária de TB drogarresistente; solicitar cultura com teste de sensibilidade completo; não iniciar esquema básico.',
      'MTB não detectado: não exclui TB na criança (paucibacilar) – usar sistema de pontuação do MS, RX, prova tuberculínica/IGRA, cultura; tratar empiricamente se pontuação ≥ 40 ou forte suspeita (meningite TB, TB miliar, imunossuprimido).',
      'Não usar para controle de cura ou em pessoa em tratamento (detecta DNA de bacilos mortos por meses); para retratamento, solicitar cultura e teste de sensibilidade.',
      'Líquor: TRM-TB (Ultra) com sensibilidade 70–90% em meningite tuberculosa – resultado negativo não exclui; iniciar tratamento empírico na suspeita.'
    ],
    quandoSolicitar: [
      'Toda suspeita de TB pulmonar ou extrapulmonar em criança/adolescente (tosse ≥ 2 semanas, contato, RX sugestivo, pontuação intermediária), incluindo lavado gástrico em quem não expectora; suspeita de meningite TB (líquor); linfadenite crônica (aspirado); pessoas vivendo com HIV; suspeita de resistência (contato com TB-DR, falha de tratamento).'
    ],
    fontes: [
      { nome: 'Ministério da Saúde – Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed. atualizada', ano: 2019 },
      { nome: 'OMS – Consolidated guidelines on tuberculosis: Module 3 – Diagnosis (rapid diagnostics)', ano: 2024 },
      { nome: 'OMS – Module 5: Management of tuberculosis in children and adolescents', ano: 2022 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'prova_tuberculinica', nome: 'Prova tuberculínica (PT / PPD RT23)', categoria: 'infeccioso',
    descricao: 'Injeção intradérmica de 0,1 mL (2 UT) de PPD RT23 na face anterior do antebraço, com leitura da induração (não do eritema) em milímetros após 48–72 h (até 96 h). Indica infecção latente ou ativa pelo M. tuberculosis; não distingue as duas nem confirma doença. Alternativa ≥ 2 anos: IGRA (dosagem de interferon-gama), não afetado pela BCG.',
    referencias: [
      { faixa: 'Todas as idades (MS 2019)', valores: 'Induração < 5 mm: não reator. ≥ 5 mm: reator (interpretado como infecção pelo M. tuberculosis, independentemente da vacinação BCG, segundo o Manual do MS 2019). Em vacinados com BCG há < 2 anos, indurações de 5–9 mm podem refletir a vacina – interpretar com o contexto (contato). Reação vesicular/necrótica = forte reator.' }
    ],
    interpretacao: [
      'PT ≥ 5 mm em contato de TB pulmonar sem doença ativa (RX normal, assintomático): infecção latente – tratar (isoniazida 6–9 meses ou rifampicina 4 meses; 3HP em ≥ 2 anos), após excluir TB ativa.',
      'Contatos < 10 anos com PT < 5 mm: repetir em 8 semanas (viragem tuberculínica = aumento ≥ 10 mm); crianças < 5 anos contatos de bacilíferos: avaliar quimioprofilaxia primária conforme protocolo; RN contato de mãe bacilífera: isoniazida (ou rifampicina) por 3 meses, PT e depois BCG conforme resultado.',
      'No sistema de pontuação para TB na criança (MS): PT ≥ 5 mm soma 10 pontos (junto com RX, contato, sintomas e nutrição); ≥ 40 pontos = diagnóstico muito provável.',
      'PT negativa não exclui TB: anergia em desnutrição grave, TB miliar/meningite, HIV, corticoide/imunossupressores, sarampo/vacinas de vírus vivo nas últimas 4–6 semanas, < 3 meses de idade e nas primeiras 2–10 semanas após a infecção.',
      'Falsos positivos: micobactérias não tuberculosas, BCG recente; em pessoas vivendo com HIV, PT ≥ 5 mm indica tratamento da infecção latente.'
    ],
    quandoSolicitar: [
      'Contatos de caso de TB (todas as idades), investigação de TB ativa em criança (pontuação do MS), antes de imunobiológicos/imunossupressão, pessoas vivendo com HIV, RN de mãe com TB, crianças indígenas/institucionalizadas em rastreamento conforme programa.'
    ],
    fontes: [
      { nome: 'Ministério da Saúde – Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed. atualizada', ano: 2019 },
      { nome: 'Ministério da Saúde – Protocolo de vigilância da infecção latente pelo M. tuberculosis', ano: 2018 },
      { nome: 'OMS – Consolidated guidelines on tuberculosis: Module 1 – Prevention (TB preventive treatment)', ano: 2024 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'coagulograma', nome: 'Coagulograma (TP/INR, TTPa, fibrinogênio)', categoria: 'hematologia',
    descricao: 'Avaliação da via extrínseca (TP/INR – fatores VII, X, V, II, fibrinogênio; dependente de vitamina K), intrínseca (TTPa – fatores VIII, IX, XI, XII) e fibrinogênio. RN têm valores fisiologicamente prolongados (imaturidade hepática e baixos fatores dependentes de vitamina K).',
    referencias: [
      { faixa: 'RN (0–28 d)', valores: 'TP 10–16 s (INR até 1,5–1,6 no 1º dia, normalizando até 5º dia com vitamina K); TTPa 30–55 s (prematuros até 70 s); fibrinogênio 150–350 mg/dL; plaquetas 150.000–450.000/mm³.' },
      { faixa: 'Lactente a adolescente', valores: 'TP 11–14 s (atividade > 70%; INR 0,9–1,2); TTPa 25–35 s (lactentes até 40 s; relação paciente/controle < 1,2–1,3); fibrinogênio 150–400 mg/dL; D-dímero < 500 ng/mL; tempo de trombina 14–21 s.' }
    ],
    interpretacao: [
      'TP e TTPa prolongados com fibrinogênio baixo, plaquetopenia e D-dímero alto: coagulação intravascular disseminada (sepse, malária grave, dengue grave, leptospirose, acidente botrópico/crotálico/laquético, leucemia, asfixia neonatal).',
      'TP prolongado isolado (INR > 1,5): deficiência de vitamina K (doença hemorrágica do RN – sem vitamina K ao nascer; colestase, má absorção, antibióticos prolongados), intoxicação por cumarínicos (raticida), insuficiência hepática (febre amarela, hepatite fulminante, dengue grave, paracetamol) – responde à vitamina K se deficiência; não responde se hepatopatia.',
      'TTPa prolongado isolado com TP normal: hemofilia A/B (meninos, hemartroses, sangramento após procedimentos), doença de von Willebrand, anticoagulante lúpico (sem sangramento – comum após infecções virais), heparina; fazer teste de mistura e dosagem de fatores.',
      'Acidente ofídico: usar o tempo de coagulação (TC) para triagem; TP/TTPa/fibrinogênio quantificam a coagulopatia por consumo e monitoram a resposta ao soro (fibrinogênio < 100 mg/dL e incoagulabilidade indicam soro adicional).',
      'Dengue: plaquetopenia com coagulograma geralmente normal; TP/TTPa prolongados e fibrinogênio baixo ocorrem na dengue grave (sangramento maior, hepatite grave).',
      'Antes de procedimentos invasivos (PL, drenagem, cirurgia) em pacientes com sangramento, hepatopatia, sepse ou plaquetopenia; em criança sem história de sangramento e sem doença, o coagulograma pré-operatório de rotina tem baixo rendimento.'
    ],
    quandoSolicitar: [
      'Sangramento anormal (gengivorragia, epistaxe recorrente, equimoses extensas, hemartrose, sangramento pós-procedimento), acidente ofídico, dengue grave, sepse/choque, malária grave, leptospirose, febre amarela, insuficiência hepática, icterícia colestática, intoxicação por raticida, RN sem vitamina K com sangramento, púrpura fulminante, antes de PL em paciente com plaquetopenia/coagulopatia suspeita.'
    ],
    fontes: [
      { nome: 'The Harriet Lane Handbook, 23ª ed.', ano: 2023 },
      { nome: 'Nelson Textbook of Pediatrics, 22ª ed. (Hemostasis)', ano: 2024 },
      { nome: 'Ministério da Saúde – Manual de Diagnóstico e Tratamento de Acidentes por Animais Peçonhentos', ano: 2001 },
      { nome: 'Ministério da Saúde – Dengue: diagnóstico e manejo clínico, 6ª ed.', ano: 2024 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'tempo_coagulacao', nome: 'Tempo de coagulação (TC – método de Lee-White)', categoria: 'hematologia',
    descricao: 'Teste à beira-leito: 1–2 mL de sangue venoso em tubo de vidro seco (13 × 100 mm) a 37 °C ou temperatura ambiente, inclinado a cada 30–60 s até formar coágulo firme. Exame fundamental e acessível para triagem e acompanhamento da coagulopatia nos acidentes ofídicos (botrópico, crotálico, laquético), recomendado pelo MS em toda unidade que atende esses acidentes.',
    referencias: [
      { faixa: 'Todas as idades (MS)', valores: 'Normal: até 9–10 minutos. Prolongado: 10–30 minutos. Incoagulável: > 30 minutos (sem formação de coágulo). Método pouco sensível para outras coagulopatias.' }
    ],
    interpretacao: [
      'TC prolongado ou incoagulável em vítima de picada de serpente: confirma envenenamento com ação coagulante (botrópico, crotálico ou laquético), mesmo sem sinais locais evidentes; ajuda a classificar (botrópico leve pode ter TC alterado; a gravidade depende principalmente do quadro local e sistêmico).',
      'Repetir 12–24 h após a soroterapia: TC persistentemente incoagulável indica necessidade de dose adicional de soro (botrópico: + 2 ampolas); normalização geralmente em 6–24 h após dose adequada.',
      'TC normal na admissão não exclui envenenamento (pode alterar-se nas horas seguintes): repetir em 6–12 h se clínica sugestiva ou serpente identificada como peçonhenta.',
      'Acidente elapídico não altera o TC (ação neurotóxica); escorpionismo e araneísmo por Phoneutria também não.',
      'Erros técnicos comuns: tubo plástico, agitação excessiva, volume inadequado, sangue com anticoagulante – repetir com técnica correta.'
    ],
    quandoSolicitar: [
      'Todo acidente ofídico (na admissão e 12–24 h após o soro), inclusive quando a serpente não foi identificada; suspeita de envenenamento em criança com sangramento após picada; monitoramento em locais sem coagulograma automatizado.'
    ],
    fontes: [
      { nome: 'Ministério da Saúde/FUNASA – Manual de Diagnóstico e Tratamento de Acidentes por Animais Peçonhentos, 2ª ed.', ano: 2001 },
      { nome: 'Ministério da Saúde – Guia de Vigilância em Saúde, 6ª ed. (Acidentes por animais peçonhentos)', ano: 2023 },
      { nome: 'Instituto Butantan – Protocolos de atendimento', ano: 2022 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'cpk', nome: 'Creatinofosfoquinase (CPK / CK total)', categoria: 'bioquimica',
    descricao: 'Enzima muscular (esquelética, cardíaca, cerebral). Marcador de lesão muscular (rabdomiólise) e miopatias; valores variam com massa muscular, sexo, etnia e exercício. CK-MB e troponina são os marcadores cardíacos.',
    referencias: [
      { faixa: 'RN (0–28 d)', valores: 'Elevada nos primeiros 3–5 dias de vida (até 5–10× o valor do adulto pelo trauma do parto), normalizando na 1ª–2ª semana.' },
      { faixa: 'Lactente a escolar', valores: '20–200 U/L (aproximadamente; varia com o método).' },
      { faixa: 'Adolescente', valores: 'Meninas 20–180 U/L; meninos 30–300 U/L (maior massa muscular; após exercício intenso pode subir 2–5×).' }
    ],
    interpretacao: [
      'CPK > 5× o limite superior (geralmente > 1.000 U/L) com mialgia e urina escura: rabdomiólise – acidente crotálico (mialgia + urina cor de coca-cola + fácies miastênica), convulsão prolongada/estado de mal, miosite viral aguda benigna (influenza – dor em panturrilhas, CPK 1.000–10.000, autolimitada), exercício extremo, hipertermia, síndrome compartimental, toxinas. Risco de lesão renal aguda por mioglobinúria se > 5.000–10.000 U/L: hidratação vigorosa, monitorar creatinina, K, cálcio e fósforo.',
      'CPK persistentemente elevada (> 3–10×) em menino pré-escolar com atraso motor, quedas, sinal de Gowers ou pseudo-hipertrofia de panturrilhas: suspeitar de distrofia muscular de Duchenne (CPK 10.000–50.000 U/L) – encaminhar à neurologia; também elevada em dermatomiosite juvenil, hipotireoidismo, miopatias metabólicas.',
      'Elevação leve/moderada: injeções IM, exercício, convulsão breve, hipotireoidismo; interpretar com clínica. CK-MB > 5% do total ou troponina elevada: lesão miocárdica (miocardite por dengue/chikungunya/viral, doença de Kawasaki, cardiotoxicidade do escorpionismo grave).',
      'Acompanhamento seriado (a cada 12–24 h): pico em 24–72 h e queda de ~40%/dia após cessar a agressão; elevação persistente sugere lesão em curso.'
    ],
    quandoSolicitar: [
      'Acidente crotálico (admissão e seriado), mialgia intensa com urina escura, convulsão prolongada, síndrome compartimental, miosite viral, hipertermia maligna/síndrome neuroléptica, suspeita de distrofia muscular ou miopatia (atraso motor, fraqueza), rabdomiólise por exercício, escorpionismo grave (com CK-MB/troponina), miocardite suspeita.'
    ],
    fontes: [
      { nome: 'The Harriet Lane Handbook, 23ª ed.', ano: 2023 },
      { nome: 'Nelson Textbook of Pediatrics, 22ª ed.', ano: 2024 },
      { nome: 'Ministério da Saúde – Manual de Diagnóstico e Tratamento de Acidentes por Animais Peçonhentos', ano: 2001 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'lactato', nome: 'Lactato sérico', categoria: 'gasometria',
    descricao: 'Produto do metabolismo anaeróbio; marcador de hipoperfusão tecidual/hipóxia e de gravidade na sepse e no choque. Coletar sem torniquete prolongado, em tubo com fluoreto ou na gasometria, e processar rapidamente.',
    referencias: [
      { faixa: 'RN (0–28 d)', valores: '< 2,5 mmol/L após as primeiras horas de vida (valores até 3–4 mmol/L podem ocorrer nas primeiras 2–6 h e no cordão umbilical).' },
      { faixa: 'Lactente a adolescente', valores: 'Arterial 0,5–1,6 mmol/L; venoso < 2,0 mmol/L (< 18 mg/dL; 1 mmol/L = 9 mg/dL). Elevado > 2 mmol/L; grave > 4 mmol/L.' }
    ],
    interpretacao: [
      'Lactato > 2 mmol/L em criança com suspeita de infecção: indica hipoperfusão/disfunção – tratar como sepse com risco; > 4 mmol/L associa-se a maior mortalidade e define necessidade de reanimação agressiva (SSC 2020 sugere usar tendências, não valores isolados, para guiar fluidos).',
      'Clearance de lactato (queda ≥ 10–20% em 2–4 h ou normalização em 6 h) é meta de reanimação e indicador de bom prognóstico; lactato persistentemente elevado: reavaliar volume, vasoativos, foco infeccioso, disfunção miocárdica.',
      'Malária grave: lactato > 5 mmol/L (acidose láctica) é critério de gravidade e preditor de morte (OMS); também elevado em convulsão (transitório, normaliza em 1–2 h), hipoglicemia, choque de qualquer etiologia, intoxicações (metformina, cianeto, CO, salicilato), erros inatos (acidemias, defeitos mitocondriais – lactato persistentemente elevado sem hipoperfusão), insuficiência hepática (menor clearance), uso de salbutamol/adrenalina em altas doses (lactato tipo B, sem hipoperfusão).',
      'Lactato normal não exclui choque compensado; integrar com enchimento capilar, diurese, consciência e gasometria.'
    ],
    quandoSolicitar: [
      'Sepse/choque de qualquer etiologia (admissão e seriado a cada 2–6 h), malária grave, cetoacidose, convulsão prolongada, intoxicações, desidratação grave, rebaixamento inexplicado, suspeita de erro inato do metabolismo (acidose com ânion gap alto, hipoglicemia, hiperamonemia), pós-PCR, asfixia neonatal.'
    ],
    fontes: [
      { nome: 'Surviving Sepsis Campaign Pediátrico', ano: 2020 },
      { nome: 'OMS – Guidelines for Malaria (malária grave)', ano: 2023 },
      { nome: 'The Harriet Lane Handbook, 23ª ed.', ano: 2023 },
      { nome: 'Nelson Textbook of Pediatrics, 22ª ed.', ano: 2024 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'eletrolitos', nome: 'Eletrólitos (painel: Na, K, Cl, Ca, Mg, P)', categoria: 'bioquimica',
    descricao: 'Painel resumido para interpretação conjunta dos distúrbios hidroeletrolíticos; consultar os itens individuais (sódio, potássio, cálcio, magnésio) para detalhes. Cloro e fósforo incluídos aqui.',
    referencias: [
      { faixa: 'RN (0–28 d)', valores: 'Na 135–145; K 3,7–5,9; Cl 97–110 mEq/L; Ca total 7,6–10,4 mg/dL (ionizado 1,05–1,37 mmol/L); Mg 1,5–2,2 mg/dL; P 4,5–9,0 mg/dL (fisiologicamente alto).' },
      { faixa: 'Lactente (1–23 m)', valores: 'Na 135–145; K 4,1–5,3; Cl 98–107 mEq/L; Ca 9,0–11,0 mg/dL; Mg 1,7–2,4 mg/dL; P 4,5–6,7 mg/dL.' },
      { faixa: 'Pré-escolar e escolar (2–11 a)', valores: 'Na 135–145; K 3,4–4,7; Cl 98–107 mEq/L; Ca 8,8–10,8 mg/dL; Mg 1,7–2,4 mg/dL; P 4,5–5,5 mg/dL (escolar 3,6–5,6).' },
      { faixa: 'Adolescente (12–18 a)', valores: 'Na 135–145; K 3,5–5,1; Cl 98–107 mEq/L; Ca 8,4–10,2 mg/dL; Mg 1,7–2,4 mg/dL; P 2,7–4,5 mg/dL.' }
    ],
    interpretacao: [
      'Diarreia com desidratação: hiponatremia ou hipernatremia, hipopotassemia e acidose hiperclorêmica; repor pelo plano de hidratação e potássio após diurese.',
      'Vômitos/estenose de piloro: alcalose metabólica hipoclorêmica e hipopotassêmica – corrigir com SF + KCl.',
      'Desnutrição grave/síndrome de realimentação: hipofosfatemia, hipopotassemia e hipomagnesemia nos primeiros 3–5 dias de realimentação – monitorar e repor (protocolo OMS).',
      'Hiperfosfatemia + hipocalcemia + hiperpotassemia + hiperuricemia: síndrome de lise tumoral ou insuficiência renal; hipofosfatemia + hipercalciúria: raquitismo hipofosfatêmico; fósforo baixo e fosfatase alcalina alta: raquitismo carencial.',
      'Cloro > 110 com acidose de ânion gap normal: excesso de SF 0,9% ou acidose tubular; cloro < 95: vômitos, fibrose cística (suor), diuréticos.',
      'Ânion gap = Na − (Cl + HCO3): 8–16 mEq/L; elevado em cetoacidose, acidose láctica, intoxicações e uremia.'
    ],
    quandoSolicitar: [
      'Desidratação moderada/grave, vômitos persistentes, diarreia prolongada, desnutrição grave (antes e durante realimentação), cetoacidose, insuficiência renal, síndrome nefrótica, convulsão, arritmia, uso de diuréticos/soro IV prolongado, lise tumoral, raquitismo, sepse/choque.'
    ],
    fontes: [
      { nome: 'The Harriet Lane Handbook, 23ª ed.', ano: 2023 },
      { nome: 'Nelson Textbook of Pediatrics, 22ª ed.', ano: 2024 },
      { nome: 'OMS – Guideline: Updates on the management of severe acute malnutrition in infants and children', ano: 2013 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'albumina', nome: 'Albumina sérica', categoria: 'bioquimica',
    descricao: 'Principal proteína plasmática, sintetizada no fígado (meia-vida ~20 dias); reflete estado nutricional crônico, síntese hepática, perdas (renal, intestinal, pele) e inflamação (reagente de fase aguda negativo).',
    referencias: [
      { faixa: 'RN (0–28 d)', valores: '2,6–3,6 g/dL (a termo; prematuros 1,8–3,0).' },
      { faixa: 'Lactente (1–23 m)', valores: '2,8–4,6 g/dL (1–3 meses 2,8–4,3; após 3 meses 3,4–4,6).' },
      { faixa: 'Pré-escolar (2–5 a)', valores: '3,5–5,2 g/dL.' },
      { faixa: 'Escolar e adolescente (6–18 a)', valores: '3,7–5,6 g/dL.' }
    ],
    interpretacao: [
      'Hipoalbuminemia < 2,5 g/dL com edema e proteinúria maciça (relação proteína/creatinina > 2 mg/mg): síndrome nefrótica (lesão mínima é a causa mais comum em 2–8 anos – corticoide); sem proteinúria: enteropatia perdedora de proteína, desnutrição grave (kwashiorkor: edema + albumina < 2,5–3,0), hepatopatia crônica, queimaduras extensas.',
      'Dengue: queda da albumina (< 3,5 g/dL ou queda ≥ 0,5 g/dL) é marcador precoce de extravasamento plasmático – junto com hemoconcentração e derrames, indica sinais de alarme/gravidade.',
      'Sepse, doenças inflamatórias, doença de Kawasaki (albumina ≤ 3,0 g/dL é achado laboratorial de suporte) e pós-operatório reduzem a albumina por redistribuição/inflamação, independentemente da nutrição.',
      'Hipoalbuminemia reduz o cálcio total (corrigir) e altera a ligação de fármacos (fenitoína); albumina < 2,0 g/dL em síndrome nefrótica com anasarca refratária: considerar albumina 20% 0,5–1 g/kg + furosemida.',
      'Albumina elevada: hemoconcentração/desidratação.'
    ],
    quandoSolicitar: [
      'Edema, síndrome nefrótica, desnutrição grave (especialmente edematosa), dengue com sinais de alarme, hepatopatia crônica/insuficiência hepática, diarreia crônica/má absorção, queimaduras, sepse grave, doença de Kawasaki, avaliação nutricional em doença crônica.'
    ],
    fontes: [
      { nome: 'The Harriet Lane Handbook, 23ª ed.', ano: 2023 },
      { nome: 'Ministério da Saúde – Dengue: diagnóstico e manejo clínico – adulto e criança, 6ª ed.', ano: 2024 },
      { nome: 'Nelson Textbook of Pediatrics, 22ª ed.', ano: 2024 },
      { nome: 'AHA – Diagnosis, Treatment, and Long-Term Management of Kawasaki Disease', ano: 2017 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'ferritina', nome: 'Ferritina sérica', categoria: 'hematologia',
    descricao: 'Reflete os estoques de ferro; é o exame mais sensível para deficiência de ferro, mas é reagente de fase aguda (eleva-se em infecção/inflamação, hepatopatia, malignidade), o que limita a interpretação em áreas com alta carga de infecções – dosar PCR junto.',
    referencias: [
      { faixa: 'RN (0–28 d)', valores: '25–200 ng/mL ao nascer; sobe para 200–600 ng/mL no 1º mês (degradação de hemácias fetais).' },
      { faixa: 'Lactente (1–23 m)', valores: '2–5 meses: 50–200 ng/mL; 6–23 meses: 7–140 ng/mL. Deficiência de ferro (OMS): < 12 ng/mL (< 5 anos) ou < 30 ng/mL na presença de inflamação (PCR elevada).' },
      { faixa: 'Pré-escolar e escolar (2–11 a)', valores: '7–140 ng/mL. Deficiência: < 12 ng/mL (< 5 anos) e < 15 ng/mL (≥ 5 anos); < 30 ng/mL se inflamação.' },
      { faixa: 'Adolescente (12–18 a)', valores: 'Meninas 7–140 ng/mL; meninos 7–140 (até 200) ng/mL. Deficiência: < 15 ng/mL (< 30 com inflamação).' }
    ],
    interpretacao: [
      'Ferritina baixa (< 12–15 ng/mL, ou < 30 com PCR elevada): deficiência de ferro confirmada (com ou sem anemia) – tratar com ferro elementar 3–5 mg/kg/dia por 3–6 meses (SBP), investigar dieta, parasitoses (ancilostomídeos), perdas sanguíneas; reavaliar hemoglobina em 30–60 dias. Ferritina normal com PCR alta não exclui ferropenia: considerar saturação de transferrina < 16% e receptor solúvel de transferrina.',
      'Ferritina muito elevada (> 500 ng/mL) com febre prolongada, citopenias, hepatoesplenomegalia, hipertrigliceridemia/hipofibrinogenemia: considerar linfohistiocitose hemofagocítica (HLH – primária ou secundária a infecções como leishmaniose visceral, dengue, EBV, leucemia) – ferritina > 10.000 é altamente sugestiva; síndrome de ativação macrofágica na artrite idiopática juvenil sistêmica.',
      'Elevações moderadas (150–1.000): infecção aguda (dengue tem ferritina alta, com pico na fase crítica; malária), inflamação crônica, hepatopatia, transfusões repetidas/sobrecarga de ferro (talassemia, anemia falciforme – ferritina > 1.000 indica quelação), doença de Still.',
      'Suplementação profilática (SBP/MS): ferro 1 mg/kg/dia dos 3 (ou 6) meses aos 24 meses em aleitamento; prematuros/baixo peso a partir de 30 dias em doses maiores – não depende de ferritina.'
    ],
    quandoSolicitar: [
      'Anemia microcítica/hipocrômica, triagem de ferropenia (12 meses, e conforme risco: prematuridade, baixo peso, dieta pobre em ferro, aleitamento exclusivo prolongado sem suplementação, adolescentes com menstruação abundante, atletas), palidez, fadiga, pica, baixo rendimento escolar; febre prolongada com citopenias/hepatoesplenomegalia (HLH), doenças hemolíticas com transfusões (sobrecarga), dengue grave (marcador de inflamação).'
    ],
    fontes: [
      { nome: 'OMS – Guideline on use of ferritin concentrations to assess iron status in individuals and populations', ano: 2020 },
      { nome: 'SBP – Consenso sobre anemia ferropriva: atualização', ano: 2021 },
      { nome: 'The Harriet Lane Handbook, 23ª ed.', ano: 2023 },
      { nome: 'Histiocyte Society – HLH-2004 diagnostic criteria', ano: 2007 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'tsh', nome: 'TSH (hormônio tireoestimulante) e T4 livre', categoria: 'bioquimica',
    descricao: 'TSH é o exame mais sensível para disfunção tireoidiana primária; interpretar com T4 livre. No RN há pico fisiológico de TSH nas primeiras 24–48 h (não colher o teste do pezinho antes de 48 h de vida). O Teste do Pezinho (triagem neonatal) dosa TSH em papel-filtro entre o 3º e o 5º dia de vida.',
    referencias: [
      { faixa: 'RN (0–28 d)', valores: 'TSH 1–4 dias: até 39 mUI/L (pico fisiológico); 5–28 dias: 1,7–9,1 mUI/L. T4 livre 0,8–2,8 ng/dL (1ª semana até 3,5). Teste do pezinho (TSH em papel-filtro): valor de corte para reconvocação geralmente ≥ 10 mUI/L (varia entre programas estaduais: 6–10); ≥ 20–30 mUI/L: convocação imediata para dosagem sérica.' },
      { faixa: 'Lactente (1–23 m)', valores: 'TSH 0,7–8,0 mUI/L (1–5 meses 1,7–9,1); T4 livre 0,9–2,3 ng/dL.' },
      { faixa: 'Pré-escolar e escolar (2–11 a)', valores: 'TSH 0,7–6,0 mUI/L (alguns laboratórios 0,5–5,0); T4 livre 0,9–1,9 ng/dL.' },
      { faixa: 'Adolescente (12–18 a)', valores: 'TSH 0,5–4,5 mUI/L; T4 livre 0,8–1,8 ng/dL.' }
    ],
    interpretacao: [
      'TSH elevado com T4 livre baixo: hipotireoidismo primário – no RN (hipotireoidismo congênito – triagem alterada: confirmar com TSH e T4 livre séricos e iniciar levotiroxina 10–15 mcg/kg/dia imediatamente, idealmente até 14 dias de vida, sem aguardar imagem); na criança/adolescente: tireoidite de Hashimoto (anti-TPO), deficiência de iodo, pós-radiação; sintomas: baixa estatura/desaceleração do crescimento, ganho de peso, constipação, sonolência, bócio, atraso puberal.',
      'TSH elevado (4,5–10) com T4 livre normal: hipotireoidismo subclínico – repetir em 4–8 semanas com anti-TPO; a maioria normaliza; tratar se TSH > 10, bócio, anticorpos positivos ou sintomas. TSH discretamente elevado é frequente em obesidade (não tratar) e em síndrome de Down (monitorar anualmente).',
      'TSH suprimido (< 0,1) com T4 livre/T3 elevados: hipertireoidismo – doença de Graves (adolescentes, TRAb), tireoidite subaguda (fase inicial), RN de mãe com Graves (hipertireoidismo neonatal transitório – acompanhar).',
      'TSH baixo/normal com T4 livre baixo: hipotireoidismo central (hipopituitarismo – investigar outras deficiências, RM de sela) ou síndrome do eutireoidiano doente em pacientes graves (não tratar; repetir após recuperação).',
      'RN com teste do pezinho alterado: convocar em até 24–48 h; lembrar que o TSH pode ser falsamente baixo em prematuros (elevação tardia – repetir com 2–4 semanas) e alterado por exposição a iodo (antissépticos).'
    ],
    quandoSolicitar: [
      'Teste do pezinho alterado ou não realizado; icterícia prolongada, hipotonia, macroglossia, hérnia umbilical, constipação e hipoatividade no RN/lactente; desaceleração do crescimento, baixa estatura, bócio, atraso ou precocidade puberal, obesidade com sinais clínicos, síndrome de Down/Turner (rotina anual), diabetes tipo 1 (rotina), taquicardia/perda de peso/exoftalmia, fadiga e hipercolesterolemia, uso de amiodarona/lítio, RN de mãe com doença tireoidiana.'
    ],
    fontes: [
      { nome: 'SBP – Departamento de Endocrinologia: Hipotireoidismo congênito – Documento Científico', ano: 2018 },
      { nome: 'European Society for Paediatric Endocrinology – Consensus Guidelines on Congenital Hypothyroidism (update)', ano: 2021 },
      { nome: 'Ministério da Saúde – Programa Nacional de Triagem Neonatal: Manual Técnico', ano: 2016 },
      { nome: 'The Harriet Lane Handbook, 23ª ed.', ano: 2023 }
    ],
    atualizadoEm: '2026-09'
  }
];
