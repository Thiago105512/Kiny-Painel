window.PED = window.PED || {}; PED.data = PED.data || {};
// Emergências pediátricas – algoritmos e doses por kg (apoio à decisão; confirmar sempre conforme protocolo local).
// Fontes gerais: PALS/AHA 2020; Ministério da Saúde (AIDPI, Guia de Vigilância em Saúde, Manual de Animais Peçonhentos);
// Sociedade Brasileira de Pediatria (Tratados e Documentos Científicos); Surviving Sepsis Campaign Pediátrico 2020; GINA 2024; ATLS 10ª ed.

PED.data.emergencias = [
  {
    id: 'pcr', nome: 'Parada cardiorrespiratória', cor: 'vermelho', icone: '🫀',
    reconhecimento: [
      'Criança irresponsiva, sem respiração ou apenas com gasping (respiração agônica).',
      'Ausência de pulso central palpável em até 10 segundos (braquial em lactentes; carotídeo ou femoral em crianças).',
      'Bradicardia (FC < 60 bpm) com sinais de má perfusão apesar de oxigenação e ventilação adequadas: iniciar compressões.',
      'Causas mais frequentes em pediatria: hipóxia/insuficiência respiratória e choque (PCR geralmente secundária, ritmo não chocável).'
    ],
    passos: [
      '1. Verificar segurança da cena; checar responsividade e respiração; chamar ajuda e acionar equipe/carro de parada; solicitar monitor/desfibrilador.',
      '2. Checar pulso por no máximo 10 s. Sem pulso ou FC < 60 bpm com má perfusão: iniciar RCP imediatamente.',
      '3. Compressões torácicas: 100–120/min, profundidade de 1/3 do diâmetro anteroposterior do tórax (cerca de 4 cm em lactentes e 5 cm em crianças), retorno completo do tórax, minimizar interrupções (< 10 s). Lactente: 2 polegares com mãos envolvendo o tórax (2 socorristas) ou 2 dedos; criança: 1 ou 2 mãos.',
      '4. Relação compressão:ventilação sem via aérea avançada: 30:2 (1 socorrista) ou 15:2 (2 socorristas). Ventilar com bolsa-válvula-máscara e O2 a 100%, apenas o suficiente para elevar o tórax.',
      '5. Instalar monitor/desfibrilador assim que disponível e avaliar o ritmo a cada 2 minutos.',
      '6. Ritmo CHOCÁVEL (FV / TV sem pulso): choque 2 J/kg → RCP 2 min → 2º choque 4 J/kg → RCP 2 min + adrenalina (repetir a cada 3–5 min) → 3º choque ≥ 4 J/kg (máximo 10 J/kg ou dose de adulto) → RCP 2 min + amiodarona ou lidocaína. Continuar ciclos.',
      '7. Ritmo NÃO CHOCÁVEL (assistolia / AESP): RCP contínua; adrenalina o mais precocemente possível (idealmente nos primeiros 5 min) e a cada 3–5 min; reavaliar ritmo a cada 2 min.',
      '8. Obter acesso vascular: IV periférico ou intraósseo (IO) sem demora (IO se não obtido IV em 60–90 s).',
      '9. Com via aérea avançada (tubo traqueal ou dispositivo supraglótico): compressões contínuas e 1 ventilação a cada 2–3 s (20–30/min) (PALS 2020). Confirmar posição do tubo com capnografia se disponível.',
      '10. Identificar e tratar causas reversíveis (H e T): hipóxia, hipovolemia, hidrogênio (acidose), hipo/hiperpotassemia, hipoglicemia, hipotermia; tensão (pneumotórax), tamponamento, toxinas, trombose (pulmonar/coronária).',
      '11. Considerar bicarbonato apenas em hiperpotassemia, intoxicação por tricíclicos ou acidose metabólica grave documentada; cálcio apenas em hipocalcemia, hiperpotassemia, hipermagnesemia ou intoxicação por bloqueador de canal de cálcio.',
      '12. Após retorno da circulação espontânea (RCE): cuidados pós-PCR – oxigenação alvo SpO2 94–99%, normocapnia, evitar hipotensão (PAS > percentil 5 para a idade), controle de temperatura (evitar febre; alvo 32–34 °C ou 36–37,5 °C conforme protocolo), glicemia, EEG se disponível, transferir para UTI pediátrica.',
      '13. Considerar interrupção da RCP conforme protocolo institucional, tempo de PCR, causa e resposta; envolver família e registrar.'
    ],
    doses: [
      { nome: 'Adrenalina (epinefrina)', indicacao: 'PCR – todos os ritmos', mgKg: 0.01, unidade: 'mg', doseMax: 1, apresentacao: 'Ampola 1 mg/mL (1:1.000) – diluir 1 mL em 9 mL de SF 0,9% = 1:10.000 (0,1 mg/mL)', concentracaoMgMl: 0.1, via: 'IV/IO', repeticao: 'a cada 3–5 min', obs: '0,1 mL/kg da solução 1:10.000. Administrar em bolus seguido de flush de 5 mL de SF.' },
      { nome: 'Adrenalina via traqueal', indicacao: 'PCR sem acesso IV/IO (via de exceção)', mgKg: 0.1, unidade: 'mg', doseMax: 2.5, apresentacao: 'Ampola 1 mg/mL (1:1.000) sem diluir', concentracaoMgMl: 1, via: 'ET', repeticao: 'a cada 3–5 min', obs: '0,1 mL/kg da solução 1:1.000, seguida de 5 mL de SF e ventilações. Preferir sempre IV/IO.' },
      { nome: 'Amiodarona', indicacao: 'FV / TV sem pulso refratária ao choque', mgKg: 5, unidade: 'mg', doseMax: 300, apresentacao: 'Ampola 150 mg/3 mL (50 mg/mL)', concentracaoMgMl: 50, via: 'IV/IO', repeticao: 'pode repetir até 2 vezes (máx. 15 mg/kg no total)', obs: 'Em PCR: bolus rápido. Com pulso (TV com pulso): infundir em 20–60 min com monitorização.' },
      { nome: 'Lidocaína', indicacao: 'FV / TV sem pulso (alternativa à amiodarona)', mgKg: 1, unidade: 'mg', doseMax: 100, apresentacao: 'Lidocaína 2% sem vasoconstritor (20 mg/mL)', concentracaoMgMl: 20, via: 'IV/IO', repeticao: 'dose única; manutenção 20–50 mcg/kg/min se RCE', obs: 'Bolus inicial 1 mg/kg.' },
      { nome: 'Desfibrilação – 1º choque', indicacao: 'FV / TV sem pulso', mgKg: 2, unidade: 'J', doseMax: 200, apresentacao: 'Desfibrilador manual; pás pediátricas para < 10 kg ou < 1 ano; DEA com atenuador pediátrico se < 8 anos', concentracaoMgMl: null, via: 'externa', repeticao: 'reavaliar ritmo após 2 min de RCP', obs: 'Retomar RCP imediatamente após o choque, sem checar pulso.' },
      { nome: 'Desfibrilação – 2º choque e seguintes', indicacao: 'FV / TV sem pulso persistente', mgKg: 4, unidade: 'J', doseMax: 360, apresentacao: 'Desfibrilador manual', concentracaoMgMl: null, via: 'externa', repeticao: 'a cada 2 min se ritmo persistir chocável', obs: 'Choques subsequentes ≥ 4 J/kg, máximo 10 J/kg ou dose máxima de adulto.' },
      { nome: 'Glicose 10%', indicacao: 'Hipoglicemia documentada durante PCR/pós-PCR', mgKg: 5, unidade: 'mL', doseMax: 250, apresentacao: 'Solução de glicose 10% (100 mg/mL)', concentracaoMgMl: 100, via: 'IV/IO', repeticao: 'conforme glicemia', obs: '0,5 g/kg (PALS 0,5–1 g/kg). Não administrar rotineiramente sem hipoglicemia confirmada.' },
      { nome: 'Bicarbonato de sódio 8,4%', indicacao: 'Hiperpotassemia, intoxicação por tricíclicos, acidose metabólica grave documentada', mgKg: 1, unidade: 'mEq', doseMax: 50, apresentacao: 'Solução 8,4% (1 mEq/mL); em RN diluir 1:1 com água destilada (4,2%)', concentracaoMgMl: null, via: 'IV/IO', repeticao: 'conforme gasometria', obs: 'Não usar rotineiramente em PCR. Garantir ventilação adequada. Não misturar na mesma linha com cálcio ou catecolaminas.' },
      { nome: 'Gluconato de cálcio 10%', indicacao: 'Hipocalcemia, hiperpotassemia, hipermagnesemia, intoxicação por bloqueador de canal de cálcio', mgKg: 0.6, unidade: 'mL', doseMax: 20, apresentacao: 'Gluconato de cálcio 10% (100 mg/mL = 9,3 mg/mL de cálcio elementar)', concentracaoMgMl: 100, via: 'IV/IO', repeticao: 'pode repetir em 10 min se necessário', obs: '60 mg/kg de gluconato de cálcio (equivalente a 20 mg/kg de cloreto de cálcio do PALS). Infundir lentamente, em veia calibrosa; extravasamento causa necrose.' },
      { nome: 'Atropina', indicacao: 'Bradicardia por tônus vagal aumentado ou bloqueio AV (não é droga de PCR)', mgKg: 0.02, unidade: 'mg', doseMax: 0.5, apresentacao: 'Ampola 0,25 mg/mL ou 0,5 mg/mL', concentracaoMgMl: 0.5, via: 'IV/IO', repeticao: 'pode repetir 1 vez em 5 min', obs: 'Dose mínima 0,1 mg. Na bradicardia com má perfusão a 1ª droga é adrenalina.' }
    ],
    materiais: [
      'Bolsa-válvula-máscara (250 mL neonatal; 450–500 mL lactente/criança; 1.000 mL escolar/adolescente) com reservatório e fonte de O2.',
      'Tubo traqueal: sem cuff = (idade em anos / 4) + 4; com cuff = (idade / 4) + 3,5. RN a termo 3,0–3,5; prematuro 2,5–3,0. Profundidade (cm) na comissura labial ≈ 3 × diâmetro interno do tubo.',
      'Lâmina de laringoscópio: reta (Miller) 0 para RN e 1 para lactentes até ~2 anos; reta ou curva (Macintosh) 2 para pré-escolares/escolares; 3 para adolescentes.',
      'Cânula orofaríngea (Guedel) medida da comissura labial ao ângulo da mandíbula; aspirador com sondas 8–14 Fr.',
      'Agulha intraóssea 15–18 G (tíbia proximal, 1–2 cm abaixo e medial à tuberosidade tibial) ou dispositivo motorizado.',
      'Desfibrilador com pás/eletrodos pediátricos (< 10 kg ou < 1 ano) e adultos (≥ 10 kg); DEA com atenuador para < 8 anos.',
      'Fita de Broselow ou tabela de peso estimado: peso (kg) ≈ (idade em anos × 2) + 8 (1–10 anos); lactentes ≈ (meses / 2) + 4.',
      'Capnógrafo/detector colorimétrico de CO2, oxímetro, monitor cardíaco, medicações do carro de parada organizadas por peso.'
    ],
    criteriosUTI: [
      'Toda criança com RCE após PCR deve ser admitida em UTI pediátrica (ou transferida assim que estável para transporte).',
      'Necessidade de ventilação mecânica, drogas vasoativas ou monitorização invasiva.',
      'Instabilidade hemodinâmica, arritmias recorrentes ou coma pós-PCR.'
    ],
    fontes: [
      { nome: 'AHA – Pediatric Advanced Life Support (PALS) Guidelines', ano: 2020 },
      { nome: 'SBP – Diretrizes de Reanimação Pediátrica', ano: 2021 },
      { nome: 'ILCOR – Consensus on Science with Treatment Recommendations (Pediatric)', ano: 2023 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'anafilaxia', nome: 'Anafilaxia', cor: 'vermelho', icone: '⚡',
    reconhecimento: [
      'Início agudo (minutos a poucas horas) de acometimento de pele/mucosas (urticária, angioedema, prurido, rubor) associado a comprometimento respiratório (dispneia, sibilância, estridor, hipoxemia) ou cardiovascular (hipotensão, síncope, hipotonia) ou sintomas gastrointestinais graves.',
      'Dois ou mais sistemas acometidos após exposição a alérgeno provável (alimento, picada de inseto, medicamento, látex, soro heterólogo).',
      'Hipotensão para a idade ou broncoespasmo/estridor após exposição a alérgeno conhecido, mesmo sem lesões cutâneas.',
      'Em lactentes os sinais podem ser inespecíficos: irritabilidade, choro persistente, sonolência, vômitos, palidez.'
    ],
    passos: [
      '1. Interromper a exposição ao agente (parar infusão de medicamento/soro; remover ferrão).',
      '2. Adrenalina IM na face anterolateral da coxa IMEDIATAMENTE: 0,01 mg/kg da solução 1 mg/mL (máx. 0,5 mg). Não há contraindicação absoluta. Repetir a cada 5–15 min se não houver melhora.',
      '3. Chamar ajuda; posicionar em decúbito dorsal com membros inferiores elevados (sentado se dispneia importante; decúbito lateral se vômitos). Evitar levantar a criança bruscamente.',
      '4. Oxigênio em alto fluxo (máscara não reinalante 10–15 L/min); monitorizar SpO2, FC, PA.',
      '5. Acesso venoso calibroso; se hipotensão ou má perfusão: SF 0,9% ou RL 20 mL/kg em bolus rápido, repetindo conforme resposta.',
      '6. Broncoespasmo persistente após adrenalina: salbutamol inalatório (spray com espaçador ou nebulização).',
      '7. Estridor/edema de via aérea: adrenalina nebulizada (adjuvante) e preparar via aérea avançada precocemente.',
      '8. Anafilaxia refratária (≥ 3 doses IM sem resposta ou choque): infusão contínua de adrenalina IV com bomba de infusão e monitorização em UTI.',
      '9. Medicamentos de 2ª linha (não substituem a adrenalina): anti-H1 (difenidramina) para sintomas cutâneos; corticoide (metilprednisolona ou hidrocortisona) pode reduzir reações prolongadas/bifásicas.',
      '10. Observação mínima de 6–8 h após resolução (12–24 h se reação grave, necessidade de mais de 1 dose de adrenalina ou asma associada) pelo risco de reação bifásica.',
      '11. Alta com plano de ação escrito, orientação sobre o agente desencadeante, prescrição de adrenalina autoinjetável quando disponível e encaminhamento ao alergologista.'
    ],
    doses: [
      { nome: 'Adrenalina IM', indicacao: 'Anafilaxia – 1ª linha', mgKg: 0.01, unidade: 'mg', doseMax: 0.5, apresentacao: 'Ampola 1 mg/mL (1:1.000) sem diluir', concentracaoMgMl: 1, via: 'IM (vasto lateral da coxa)', repeticao: 'a cada 5–15 min se necessário', obs: '0,01 mL/kg da solução 1 mg/mL. Doses práticas: < 25 kg 0,15 mg; 25–50 kg 0,3 mg; > 50 kg 0,5 mg (autoinjetores).' },
      { nome: 'Adrenalina infusão contínua', indicacao: 'Anafilaxia refratária/choque', mgKg: null, unidade: 'mcg/kg/min', doseMax: null, apresentacao: 'Diluir 1 mg em 100 mL de SF (10 mcg/mL) ou conforme padronização', concentracaoMgMl: null, via: 'IV contínua (bomba de infusão)', repeticao: 'titular a cada 2–5 min', obs: 'Iniciar 0,05–0,1 mcg/kg/min e titular até 1 mcg/kg/min conforme resposta. Preferir acesso central; monitorização contínua.', informativo: true, faixaMin: 0.05, faixaMax: 1, doseFixa: null },
      { nome: 'SF 0,9% ou Ringer lactato', indicacao: 'Hipotensão / má perfusão', mgKg: 20, unidade: 'mL', doseMax: 1000, apresentacao: 'Cristaloide isotônico', concentracaoMgMl: null, via: 'IV/IO em bolus (5–20 min)', repeticao: 'repetir conforme resposta (até 40–60 mL/kg)', obs: 'Reavaliar perfusão, FC, PA e sinais de sobrecarga após cada bolus.' },
      { nome: 'Salbutamol spray 100 mcg/jato', indicacao: 'Broncoespasmo associado', mgKg: null, doseFixa: 4, unidade: 'jatos', doseMax: 10, apresentacao: 'Aerossol 100 mcg/jato com espaçador', concentracaoMgMl: null, via: 'inalatória', repeticao: 'a cada 20 min na 1ª hora', obs: '4 jatos (< 20 kg) a 8 jatos (≥ 20 kg); ver crise asmática.', faixaPesoMin: 0, faixaPesoMax: 19.9 },
      { nome: 'Salbutamol spray 100 mcg/jato', indicacao: 'Broncoespasmo associado', mgKg: null, doseFixa: 8, unidade: 'jatos', doseMax: 10, apresentacao: 'Aerossol 100 mcg/jato com espaçador', concentracaoMgMl: null, via: 'inalatória', repeticao: 'a cada 20 min na 1ª hora', obs: 'Crianças ≥ 20 kg.', faixaPesoMin: 20, faixaPesoMax: null },
      { nome: 'Adrenalina nebulizada', indicacao: 'Estridor / edema laríngeo (adjuvante)', mgKg: 0.5, unidade: 'mL', doseMax: 5, apresentacao: 'Adrenalina 1 mg/mL (1:1.000) diluída em SF até 3–5 mL', concentracaoMgMl: 1, via: 'nebulização', repeticao: 'pode repetir em 20–30 min', obs: '0,5 mL/kg (máx. 5 mL). Não substitui a adrenalina IM.' },
      { nome: 'Difenidramina', indicacao: 'Sintomas cutâneos (2ª linha)', mgKg: 1, unidade: 'mg', doseMax: 50, apresentacao: 'Ampola 50 mg/mL', concentracaoMgMl: 50, via: 'IV lenta / IM', repeticao: 'a cada 6 h se necessário', obs: 'Alternativa VO: prometazina não recomendada em < 2 anos. Não retarda a adrenalina.' },
      { nome: 'Metilprednisolona', indicacao: 'Corticoide (2ª linha, prevenção de reação prolongada)', mgKg: 1, unidade: 'mg', doseMax: 125, apresentacao: 'Frasco-ampola 40, 125 ou 500 mg', concentracaoMgMl: null, via: 'IV', repeticao: 'a cada 6 h por 24–48 h se necessário', obs: '1–2 mg/kg. Alternativa: hidrocortisona 5–10 mg/kg IV (máx. 500 mg) ou prednisolona VO 1–2 mg/kg (máx. 40–60 mg).' },
      { nome: 'Glucagon', indicacao: 'Anafilaxia refratária em uso de betabloqueador', mgKg: 0.03, unidade: 'mg', doseMax: 1, apresentacao: 'Frasco 1 mg (pó liofilizado)', concentracaoMgMl: null, via: 'IV/IM', repeticao: 'pode repetir em 5 min; infusão 5–15 mcg/min', obs: '20–30 mcg/kg. Pode causar vômitos: proteger via aérea.' }
    ],
    materiais: [
      'Adrenalina 1 mg/mL sempre acessível (kit de anafilaxia em sala de vacinação, sala de soroterapia e emergência).',
      'Seringas de 1 mL, agulhas IM 25 × 7 mm (lactente) e 30 × 8 mm.',
      'Fonte de O2, máscara não reinalante, oxímetro, monitor, material de via aérea difícil (edema de glote).',
      'Cristaloide aquecido, equipo e material para acesso venoso/IO; espaçador e salbutamol spray.'
    ],
    criteriosUTI: [
      'Choque anafilático ou necessidade de adrenalina em infusão contínua.',
      'Obstrução de via aérea superior (estridor progressivo) ou necessidade de intubação.',
      'Broncoespasmo grave com hipoxemia persistente.',
      'Reação bifásica grave ou necessidade de mais de 2 doses de adrenalina IM.'
    ],
    fontes: [
      { nome: 'World Allergy Organization – Anaphylaxis Guidance', ano: 2020 },
      { nome: 'ASBAI/SBP – Guia prático de anafilaxia (atualização)', ano: 2021 },
      { nome: 'AHA – PALS Guidelines', ano: 2020 },
      { nome: 'Ministério da Saúde – Manual de Vigilância Epidemiológica de Eventos Adversos Pós-Vacinação (anafilaxia)', ano: 2021 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'convulsao', nome: 'Crise convulsiva aguda', cor: 'laranja', icone: '🧠',
    reconhecimento: [
      'Movimentos tônico-clônicos generalizados ou focais, olhar fixo/desvio ocular, automatismos, perda de consciência, cianose, sialorreia, liberação esfincteriana.',
      'Em lactentes e RN: crises sutis (movimentos de pedalar, sucção, apneia, desvio ocular, mioclonias).',
      'Crise febril simples: 6 meses a 5 anos, generalizada, < 15 min, única em 24 h, sem déficit pós-ictal; complexa se focal, > 15 min ou recorrente em 24 h.',
      'Investigar causas: febre (crise febril, meningite, encefalite, malária cerebral), hipoglicemia, distúrbios eletrolíticos (hiponatremia), trauma, intoxicação, epilepsia prévia com má adesão.'
    ],
    passos: [
      '1. Anotar o horário de início; proteger a criança de traumas; não conter os movimentos nem introduzir objetos na boca; decúbito lateral.',
      '2. ABC: aspirar secreções, O2 por máscara (alvo SpO2 ≥ 94%), monitorizar; obter acesso venoso quando possível.',
      '3. Glicemia capilar imediata: se < 60 mg/dL (ou < 45 em RN), corrigir com glicose IV (ver hipoglicemia).',
      '4. Crise com duração ≥ 5 min: benzodiazepínico (1ª linha). Sem acesso venoso: midazolam IM ou intranasal/bucal, ou diazepam retal. Com acesso: diazepam IV lento ou midazolam IV.',
      '5. Se persistir após 5 min: repetir o benzodiazepínico uma única vez (máximo 2 doses no total, incluindo as feitas no pré-hospitalar) – atenção à depressão respiratória.',
      '6. Crise persistente após 2 doses de benzodiazepínico (10–20 min): tratar como estado de mal epiléptico – ver algoritmo específico (fenitoína, fenobarbital ou levetiracetam).',
      '7. Após controle: exame neurológico, procurar sinais meníngeos, fontanela, petéquias, sinais de trauma; medir temperatura, Na, Ca, Mg, glicemia; gota espessa em área endêmica de malária.',
      '8. Crise febril simples em criança bem entre 6 meses e 5 anos: geralmente não requer punção lombar nem exames de rotina; considerar PL em < 12 meses com vacinação incompleta (Hib/pneumo), sinais meníngeos, uso prévio de antibiótico ou aspecto tóxico.',
      '9. Crise afebril de primeira vez: avaliar EEG e neuroimagem eletivamente (urgente se déficit focal, trauma, sinais de hipertensão intracraniana ou < 6 meses).',
      '10. Orientar a família: posicionamento lateral, não colocar nada na boca, cronometrar, procurar serviço se > 5 min ou recorrência; antitérmicos não previnem crise febril.'
    ],
    doses: [
      { nome: 'Midazolam', indicacao: 'Crise ≥ 5 min – sem acesso venoso', mgKg: 0.2, unidade: 'mg', doseMax: 10, apresentacao: 'Ampola 5 mg/mL (usar apresentação de 5 mg/mL para IN/bucal)', concentracaoMgMl: 5, via: 'IM / intranasal / bucal', repeticao: 'pode repetir 1 vez após 5–10 min', obs: 'IN: metade do volume em cada narina com atomizador ou seringa. Doses práticas IM: 13–40 kg 5 mg; > 40 kg 10 mg. Monitorar respiração.' },
      { nome: 'Midazolam IV', indicacao: 'Crise ≥ 5 min – com acesso venoso', mgKg: 0.1, unidade: 'mg', doseMax: 5, apresentacao: 'Ampola 5 mg/mL ou 1 mg/mL', concentracaoMgMl: 5, via: 'IV lento (2–3 min)', repeticao: 'pode repetir 1 vez após 5 min', obs: '0,1–0,2 mg/kg. Risco de apneia – ter bolsa-válvula-máscara pronta.' },
      { nome: 'Diazepam IV', indicacao: 'Crise ≥ 5 min – com acesso venoso', mgKg: 0.3, unidade: 'mg', doseMax: 10, apresentacao: 'Ampola 10 mg/2 mL (5 mg/mL)', concentracaoMgMl: 5, via: 'IV lento (≤ 2 mg/min), sem diluir', repeticao: 'pode repetir 1 vez após 5–10 min', obs: '0,2–0,3 mg/kg. Não administrar IM (absorção errática). Ação curta: associar droga de 2ª linha se recorrência.' },
      { nome: 'Diazepam retal', indicacao: 'Crise ≥ 5 min – sem acesso venoso (alternativa ao midazolam)', mgKg: 0.5, unidade: 'mg', doseMax: 20, apresentacao: 'Ampola 10 mg/2 mL (5 mg/mL) administrada com seringa sem agulha ou sonda', concentracaoMgMl: 5, via: 'retal', repeticao: 'pode repetir 1 vez após 5–10 min', obs: '2–5 anos 0,5 mg/kg; 6–11 anos 0,3 mg/kg; ≥ 12 anos 0,2 mg/kg (máx. 20 mg).' },
      { nome: 'Fenobarbital', indicacao: 'Crise neonatal (1ª linha em RN) ou 2ª linha', mgKg: 20, unidade: 'mg', doseMax: 1000, apresentacao: 'Ampola 100 mg/mL ou 200 mg/2 mL', concentracaoMgMl: 100, via: 'IV lento (≤ 1 mg/kg/min; 15–20 min)', repeticao: 'dose adicional de 10 mg/kg (até 40 mg/kg total) se persistir', obs: 'Em RN é a 1ª escolha após corrigir glicemia/cálcio. Risco de depressão respiratória e hipotensão, sobretudo após benzodiazepínico.' },
      { nome: 'Glicose 10%', indicacao: 'Hipoglicemia associada', mgKg: 5, unidade: 'mL', doseMax: 250, apresentacao: 'Glicose 10% (100 mg/mL)', concentracaoMgMl: 100, via: 'IV/IO', repeticao: 'reavaliar glicemia em 15–30 min', obs: '0,5 g/kg; RN: 2 mL/kg (0,2 g/kg). Ver algoritmo de hipoglicemia.' }
    ],
    materiais: [
      'Glicosímetro, oxímetro, fonte de O2 e aspirador.',
      'Bolsa-válvula-máscara e material de via aérea (risco de depressão respiratória pós-benzodiazepínico).',
      'Midazolam 5 mg/mL com atomizador nasal ou seringa; diazepam ampola; seringa de 1 mL.',
      'Material para acesso venoso/intraósseo; cronômetro/relógio.'
    ],
    criteriosUTI: [
      'Crise que não cede após 2 doses de benzodiazepínico e 1 droga de 2ª linha (estado de mal refratário).',
      'Depressão respiratória com necessidade de suporte ventilatório.',
      'Rebaixamento persistente do nível de consciência, sinais de hipertensão intracraniana ou suspeita de encefalite/meningite grave.',
      'Instabilidade hemodinâmica ou crise por intoxicação/distúrbio metabólico grave.'
    ],
    fontes: [
      { nome: 'American Epilepsy Society – Guideline: Treatment of Convulsive Status Epilepticus', ano: 2016 },
      { nome: 'SBP – Documento Científico: Crises febris', ano: 2023 },
      { nome: 'AHA – PALS Guidelines', ano: 2020 },
      { nome: 'Ministério da Saúde – Protocolo Clínico e Diretrizes Terapêuticas da Epilepsia', ano: 2019 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'estado_mal_epileptico', nome: 'Estado de mal epiléptico', cor: 'vermelho', icone: '🧠',
    reconhecimento: [
      'Crise convulsiva contínua com duração ≥ 5 minutos (definição operacional para iniciar tratamento) ou crises recorrentes sem recuperação da consciência entre elas.',
      'Estado de mal estabelecido: persistência após 2 doses de benzodiazepínico (geralmente > 20–30 min).',
      'Estado de mal refratário: persistência após benzodiazepínico + 1 antiepiléptico de 2ª linha (geralmente > 40–60 min). Super-refratário: > 24 h apesar de anestésicos.',
      'Lembrar de estado de mal não convulsivo (rebaixamento persistente sem movimentos) – considerar EEG.'
    ],
    passos: [
      '0–5 min: ABC, O2, monitorização, decúbito lateral, glicemia capilar, acesso IV/IO; coletar glicemia, Na, Ca, Mg, gasometria, nível sérico de antiepilépticos (se em uso), hemograma, gota espessa em área endêmica.',
      '5–10 min: benzodiazepínico – midazolam IM/IN/bucal 0,2 mg/kg (máx. 10 mg) se sem acesso, ou diazepam IV 0,3 mg/kg (máx. 10 mg) / midazolam IV 0,1–0,2 mg/kg com acesso.',
      '10–15 min: se persistir, 2ª dose de benzodiazepínico (máximo 2 doses no total). Preparar droga de 2ª linha.',
      '15–20 min (estado de mal estabelecido): fenitoína 20 mg/kg IV em 20 min (máx. 1 g; velocidade ≤ 1 mg/kg/min, máx. 50 mg/min) com monitorização cardíaca; alternativas com eficácia equivalente: levetiracetam 60 mg/kg IV (máx. 4,5 g) ou ácido valproico 40 mg/kg IV (máx. 3 g). Em RN: fenobarbital 20 mg/kg é a 1ª escolha.',
      '20–40 min: se persistir, usar uma segunda droga de 2ª linha (fenobarbital 20 mg/kg IV ou outra das opções acima não utilizada). Providenciar vaga em UTI e material para intubação.',
      '40–60 min (refratário): sequência rápida de intubação e anestésico contínuo em UTI – midazolam (bolus 0,2 mg/kg + infusão 0,1–0,4 mg/kg/h, podendo aumentar), tiopental ou propofol conforme protocolo; EEG contínuo se disponível.',
      'Durante todo o atendimento: tratar causa (hipoglicemia, hiponatremia, hipocalcemia, febre, meningite/encefalite – antibiótico/aciclovir empíricos se suspeita, malária cerebral – artesunato), evitar hipertermia, proteger via aérea.',
      'Piridoxina 100 mg IV em lactentes < 18 meses com crises refratárias sem causa aparente (crise piridoxino-dependente).',
      'Após controle: manter antiepiléptico de manutenção, neuroimagem, EEG, avaliação neurológica.'
    ],
    doses: [
      { nome: 'Midazolam', indicacao: '1ª linha – sem acesso venoso', mgKg: 0.2, unidade: 'mg', doseMax: 10, apresentacao: 'Ampola 5 mg/mL', concentracaoMgMl: 5, via: 'IM / intranasal / bucal', repeticao: 'pode repetir 1 vez após 5 min', obs: 'Máximo 2 doses de benzodiazepínico no total.' },
      { nome: 'Diazepam IV', indicacao: '1ª linha – com acesso venoso', mgKg: 0.3, unidade: 'mg', doseMax: 10, apresentacao: 'Ampola 10 mg/2 mL (5 mg/mL)', concentracaoMgMl: 5, via: 'IV lento', repeticao: 'pode repetir 1 vez após 5 min', obs: '0,2–0,3 mg/kg.' },
      { nome: 'Diazepam retal', indicacao: '1ª linha – sem acesso venoso', mgKg: 0.5, unidade: 'mg', doseMax: 20, apresentacao: 'Ampola 10 mg/2 mL', concentracaoMgMl: 5, via: 'retal', repeticao: 'pode repetir 1 vez', obs: 'Ver ajuste por idade no algoritmo de convulsão.' },
      { nome: 'Fenitoína', indicacao: '2ª linha (estado de mal estabelecido)', mgKg: 20, unidade: 'mg', doseMax: 1000, apresentacao: 'Ampola 250 mg/5 mL (50 mg/mL); diluir apenas em SF 0,9% (precipita em glicose)', concentracaoMgMl: 50, via: 'IV em 20 min (≤ 1 mg/kg/min, máx. 50 mg/min)', repeticao: 'dose adicional de 5–10 mg/kg se persistir (máx. 30 mg/kg total)', obs: 'Monitorização cardíaca (arritmia, hipotensão). Não usar IM. Extravasamento causa necrose (síndrome da luva roxa). Manutenção 5–7 mg/kg/dia 12/12 h.' },
      { nome: 'Fenobarbital', indicacao: '2ª linha / 1ª escolha em RN', mgKg: 20, unidade: 'mg', doseMax: 1000, apresentacao: 'Ampola 100 mg/mL ou 200 mg/2 mL', concentracaoMgMl: 100, via: 'IV lento (≤ 1 mg/kg/min)', repeticao: 'dose adicional de 10 mg/kg (até 40 mg/kg) se persistir', obs: 'Alto risco de depressão respiratória após benzodiazepínico: preparar suporte ventilatório.' },
      { nome: 'Levetiracetam', indicacao: '2ª linha (alternativa à fenitoína)', mgKg: 60, unidade: 'mg', doseMax: 4500, apresentacao: 'Frasco 500 mg/5 mL (100 mg/mL); diluir em SF', concentracaoMgMl: 100, via: 'IV em 5–15 min', repeticao: 'dose única de ataque; manutenção 20–30 mg/kg/dose 12/12 h', obs: 'Perfil de segurança favorável (ESETT, 2019). Ajustar na insuficiência renal.' },
      { nome: 'Ácido valproico', indicacao: '2ª linha (alternativa)', mgKg: 40, unidade: 'mg', doseMax: 3000, apresentacao: 'Frasco-ampola 500 mg/5 mL (100 mg/mL)', concentracaoMgMl: 100, via: 'IV em 5–10 min', repeticao: 'manutenção 10–15 mg/kg/dose 8/8 h', obs: 'Evitar em < 2 anos, hepatopatia, suspeita de doença metabólica/mitocondrial e gestantes.' },
      { nome: 'Midazolam infusão contínua', indicacao: 'Estado de mal refratário (UTI, via aérea protegida)', mgKg: null, unidade: 'mg/kg/h', doseMax: null, apresentacao: 'Ampola 5 mg/mL diluída em SF/SG 5% (ex.: 1 mg/mL)', concentracaoMgMl: null, via: 'IV contínua', repeticao: 'titular a cada 5–15 min até cessar crises (idealmente com EEG)', obs: 'Bolus 0,2 mg/kg seguido de 0,1–0,4 mg/kg/h, podendo ser aumentada conforme protocolo de UTI; hipotensão e depressão respiratória esperadas.', informativo: true, faixaMin: 0.1, faixaMax: 0.4, doseFixa: null },
      { nome: 'Piridoxina (vitamina B6)', indicacao: 'Crises refratárias em < 18 meses sem causa definida', mgKg: null, doseFixa: 100, unidade: 'mg', doseMax: 100, apresentacao: 'Ampola 100 mg/mL ou 300 mg/mL', concentracaoMgMl: 100, via: 'IV lento (com monitorização – risco de apneia)', repeticao: 'dose única de prova; manter se resposta', obs: 'Dose fixa de 100 mg IV para teste terapêutico. Confirmar conforme protocolo de neurologia pediátrica.', verificar: true }
    ],
    materiais: [
      'Monitor multiparamétrico, oxímetro, capnografia se disponível, aspirador.',
      'Material completo de intubação e ventilação (bolsa-válvula-máscara, tubos, laringoscópio, drogas de sequência rápida).',
      'Bomba de infusão para fenitoína/levetiracetam/midazolam contínuo; glicosímetro.',
      'Antiepilépticos IV disponíveis (fenitoína, fenobarbital, levetiracetam ou valproato) e benzodiazepínicos.'
    ],
    criteriosUTI: [
      'Estado de mal estabelecido que exige droga de 2ª linha (monitorização) e todo estado de mal refratário.',
      'Necessidade de intubação, anestésicos contínuos ou EEG contínuo.',
      'Instabilidade hemodinâmica, hipertensão intracraniana, encefalite ou malária cerebral.'
    ],
    fontes: [
      { nome: 'American Epilepsy Society – Guideline: Treatment of Convulsive Status Epilepticus', ano: 2016 },
      { nome: 'ESETT – Established Status Epilepticus Treatment Trial (NEJM)', ano: 2019 },
      { nome: 'SBP – Tratado de Pediatria, 5ª ed. (Emergências neurológicas)', ano: 2022 },
      { nome: 'AHA – PALS Guidelines', ano: 2020 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'sepse', nome: 'Sepse e choque séptico', cor: 'vermelho', icone: '🦠',
    reconhecimento: [
      'Suspeita ou confirmação de infecção + sinais de disfunção orgânica: alteração do nível de consciência (irritabilidade, letargia), taquicardia ou bradicardia inexplicadas, taquipneia, tempo de enchimento capilar > 2 s (choque frio) ou < 1 s com pulsos amplos (choque quente), extremidades frias/moteadas, oligúria (< 1 mL/kg/h), hipotensão (sinal tardio).',
      'Temperatura > 38,5 °C ou < 36 °C; em RN e lactentes jovens: hipotermia, recusa alimentar, apneia, icterícia, hipotonia.',
      'Fatores de risco: < 1 mês, desnutrição grave, imunossupressão, cateter central, doença crônica, asplenia, pós-operatório, queimadura.',
      'Ferramentas: triângulo de avaliação pediátrica, PEWS, critérios de Phoenix (2024) para disfunção orgânica; lactato > 2 mmol/L reforça a suspeita.'
    ],
    passos: [
      '1. Reconhecer em até 15 min: sinais de infecção + hipoperfusão/disfunção orgânica → ativar protocolo de sepse.',
      '2. O2 suplementar (alvo SpO2 ≥ 94%); monitorização contínua; 2 acessos venosos ou intraósseo em até 5 min.',
      '3. Coletar hemocultura (2 amostras, antes do antibiótico, sem atrasá-lo), hemograma, PCR, lactato, gasometria, glicemia, eletrólitos, função renal/hepática, coagulograma, urina/urocultura; gota espessa em área endêmica; líquor se suspeita de meningite e estável.',
      '4. Antibiótico de amplo espectro em até 1 hora do reconhecimento: ceftriaxona (criança > 1 mês, comunitário); RN < 1 mês: ampicilina + gentamicina (ou cefotaxima); considerar oxacilina/vancomicina se foco de pele/cateter, e cobertura anaeróbica/antipseudomonas se foco abdominal, neutropenia ou infecção hospitalar. Artesunato IV se malária grave.',
      '5. Fluido: bolus de SF 0,9% ou RL 10–20 mL/kg em 5–20 min; reavaliar após cada bolus (FC, EC, pulsos, PA, consciência, diurese, hepatomegalia, estertores). Repetir até 40–60 mL/kg na 1ª hora se não houver sinais de sobrecarga. Em locais sem UTI, sem hipotensão, ser conservador (10–20 mL/kg) com reavaliação frequente (SSC 2020).',
      '6. Choque refratário a fluidos (após 40–60 mL/kg ou sinais de sobrecarga): iniciar vasoativo, mesmo em acesso periférico diluído: adrenalina (choque frio/disfunção miocárdica) ou noradrenalina (choque quente/vasodilatado). Dopamina se as anteriores indisponíveis.',
      '7. Corrigir hipoglicemia (glicose 10%) e hipocalcemia (gluconato de cálcio); manter glicemia < 180 mg/dL.',
      '8. Choque resistente a catecolaminas: hidrocortisona IV; avaliar ecocardiograma, pressão venosa central, ScvO2; considerar milrinona/vasopressina em UTI.',
      '9. Controle do foco: drenagem de abscesso, retirada de cateter, cirurgia se indicado. Ajustar antibiótico em 48–72 h conforme culturas.',
      '10. Metas: EC ≤ 2 s, pulsos periféricos normais, extremidades aquecidas, diurese ≥ 1 mL/kg/h, consciência normal, PA normal para a idade, lactato em queda.',
      '11. Considerar intubação precoce se choque refratário, insuficiência respiratória ou rebaixamento (cetamina como indutor de escolha; evitar etomidato).',
      '12. Transferir para UTI pediátrica; reavaliação seriada e comunicação com a família.'
    ],
    doses: [
      { nome: 'SF 0,9% ou Ringer lactato', indicacao: 'Ressuscitação volêmica', mgKg: 20, unidade: 'mL', doseMax: 1000, apresentacao: 'Cristaloide isotônico (preferir soluções balanceadas se disponíveis)', concentracaoMgMl: null, via: 'IV/IO em 5–20 min', repeticao: 'repetir até 40–60 mL/kg na 1ª hora, reavaliando após cada bolus', obs: '10 mL/kg em RN, cardiopatas, desnutridos graves, anemia grave ou se sistema sem UTI e sem hipotensão.' },
      { nome: 'Ceftriaxona', indicacao: 'Sepse comunitária > 1 mês (empírico)', mgKg: 50, unidade: 'mg', doseMax: 2000, apresentacao: 'Frasco-ampola 1 g (reconstituir 1 g em 10 mL = 100 mg/mL)', concentracaoMgMl: 100, via: 'IV em 30 min', repeticao: '12/12 h (100 mg/kg/dia; máx. 4 g/dia)', obs: 'Meningite: 100 mg/kg na 1ª dose, depois 50 mg/kg 12/12 h. Evitar em RN com hiperbilirrubinemia e não infundir junto com cálcio.' },
      { nome: 'Ampicilina', indicacao: 'Sepse neonatal (com gentamicina)', mgKg: 50, unidade: 'mg', doseMax: 2000, apresentacao: 'Frasco-ampola 500 mg / 1 g', concentracaoMgMl: null, via: 'IV', repeticao: 'RN ≤ 7 dias: 12/12 h; RN > 7 dias: 8/8 h ou 6/6 h; meningite 100 mg/kg/dose', obs: 'Dose de 50 mg/kg/dose. Confirmar intervalo conforme idade gestacional e pós-natal (Neofax/SBP).' },
      { nome: 'Gentamicina', indicacao: 'Sepse neonatal (com ampicilina)', mgKg: 5, unidade: 'mg', doseMax: 200, apresentacao: 'Ampola 40 mg/mL ou 10 mg/mL (pediátrica)', concentracaoMgMl: 40, via: 'IV em 30 min', repeticao: 'RN a termo: 24/24 h (4–5 mg/kg); prematuros: intervalos maiores (36–48 h); > 1 mês: 7,5 mg/kg/dia', obs: 'Dose única diária. Monitorar função renal e nível sérico quando possível; confirmar conforme protocolo neonatal.', verificar: true },
      { nome: 'Adrenalina infusão contínua', indicacao: 'Choque séptico frio / disfunção miocárdica refratário a fluidos', mgKg: null, unidade: 'mcg/kg/min', doseMax: null, apresentacao: 'Ex.: 0,3 × peso (kg) mg em 50 mL de SF → 1 mL/h = 0,1 mcg/kg/min', concentracaoMgMl: null, via: 'IV contínua (periférico diluído até acesso central)', repeticao: 'titular a cada 5–10 min', obs: 'Iniciar 0,05–0,3 mcg/kg/min; doses > 0,3 mcg/kg/min têm efeito predominantemente alfa (vasoconstritor); titular até 1 mcg/kg/min conforme resposta.', informativo: true, faixaMin: 0.05, faixaMax: 0.3, doseFixa: null },
      { nome: 'Noradrenalina infusão contínua', indicacao: 'Choque séptico quente (vasodilatado) refratário a fluidos', mgKg: null, unidade: 'mcg/kg/min', doseMax: null, apresentacao: 'Ampola 4 mg/4 mL (1 mg/mL) diluída em SG 5% ou SF', concentracaoMgMl: null, via: 'IV contínua (preferir acesso central)', repeticao: 'titular a cada 5–10 min', obs: 'Iniciar 0,05–0,1 mcg/kg/min; faixa usual 0,05–1 mcg/kg/min (até 2 mcg/kg/min em UTI).', informativo: true, faixaMin: 0.05, faixaMax: 1, doseFixa: null },
      { nome: 'Dopamina infusão contínua', indicacao: 'Alternativa quando adrenalina/noradrenalina indisponíveis', mgKg: null, unidade: 'mcg/kg/min', doseMax: null, apresentacao: 'Ampola 50 mg/10 mL (5 mg/mL)', concentracaoMgMl: null, via: 'IV contínua', repeticao: 'titular', obs: 'Faixa 5–10 mcg/kg/min (efeito beta) até 20 mcg/kg/min (alfa). SSC 2020 recomenda adrenalina ou noradrenalina como 1ª escolha.', informativo: true, faixaMin: 5, faixaMax: 20, doseFixa: null },
      { nome: 'Hidrocortisona', indicacao: 'Choque resistente a catecolaminas ou insuficiência adrenal suspeita', mgKg: 2, unidade: 'mg', doseMax: 100, apresentacao: 'Frasco-ampola 100 mg ou 500 mg', concentracaoMgMl: null, via: 'IV', repeticao: 'ataque 2 mg/kg e depois 1 mg/kg 6/6 h (ou 50–100 mg/m²/dia) enquanto em vasoativo', obs: 'Confirmar conforme protocolo institucional; não usar rotineiramente sem choque refratário.' },
      { nome: 'Glicose 10%', indicacao: 'Hipoglicemia na sepse', mgKg: 5, unidade: 'mL', doseMax: 250, apresentacao: 'Glicose 10% (100 mg/mL)', concentracaoMgMl: 100, via: 'IV/IO', repeticao: 'conforme glicemia', obs: '0,5 g/kg; RN 2 mL/kg. Manter infusão de manutenção com glicose após o bolus.' },
      { nome: 'Gluconato de cálcio 10%', indicacao: 'Hipocalcemia ionizada na sepse', mgKg: 0.5, unidade: 'mL', doseMax: 20, apresentacao: 'Gluconato de cálcio 10% (100 mg/mL)', concentracaoMgMl: 100, via: 'IV lento (10–20 min), veia calibrosa', repeticao: 'conforme cálcio ionizado', obs: '50 mg/kg (0,5 mL/kg); 0,5–1 mL/kg. Não misturar com bicarbonato ou ceftriaxona na mesma linha.' }
    ],
    materiais: [
      'Kit sepse: frascos de hemocultura pediátricos, tubos de coleta, lactato, glicosímetro, gasometria.',
      'Cristaloide aquecido, bombas de infusão ou seringas de 20–60 mL com torneira de 3 vias (push-pull) para bolus rápido, material de acesso IO.',
      'Vasoativos (adrenalina, noradrenalina) e tabela de diluição por peso; hidrocortisona.',
      'Monitor multiparamétrico, oxímetro, manguito de PA adequado, sonda vesical para diurese horária; antibióticos do protocolo institucional em estoque na emergência.'
    ],
    criteriosUTI: [
      'Choque séptico (necessidade de vasoativo) ou choque refratário a 40–60 mL/kg de fluido.',
      'Disfunção de ≥ 2 órgãos (respiratória, renal, hepática, hematológica, neurológica).',
      'Necessidade de ventilação mecânica ou de suporte ventilatório não invasivo.',
      'Lactato ≥ 4 mmol/L persistente, coagulação intravascular disseminada, púrpura fulminante.',
      'RN e lactentes < 3 meses com sepse grave.'
    ],
    fontes: [
      { nome: 'Surviving Sepsis Campaign – International Guidelines for Management of Septic Shock and Sepsis-Associated Organ Dysfunction in Children', ano: 2020 },
      { nome: 'Phoenix Sepsis Criteria (SCCM/JAMA)', ano: 2024 },
      { nome: 'AHA – PALS Guidelines', ano: 2020 },
      { nome: 'ILAS/SBP – Protocolo de Sepse Pediátrica', ano: 2021 },
      { nome: 'Ministério da Saúde – AIDPI Criança (Manual para Profissionais)', ano: 2017 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'choque', nome: 'Choque (abordagem geral)', cor: 'vermelho', icone: '💧',
    reconhecimento: [
      'Choque compensado: taquicardia, enchimento capilar prolongado (> 2 s) ou muito rápido, pulsos periféricos fracos ou amplos, extremidades frias/moteadas, oligúria, irritabilidade/ansiedade, PA ainda normal.',
      'Choque hipotensivo (descompensado): hipotensão para a idade (PAS < 60 mmHg em RN; < 70 em 1–12 meses; < 70 + 2 × idade em 1–10 anos; < 90 em ≥ 10 anos), pulsos centrais fracos, rebaixamento da consciência – sinal tardio e pré-parada.',
      'Tipos: hipovolêmico (diarreia, hemorragia, queimadura, dengue com extravasamento), distributivo (séptico, anafilático, neurogênico), cardiogênico (miocardite, cardiopatia, arritmia), obstrutivo (pneumotórax hipertensivo, tamponamento, TEP).',
      'Choque cardiogênico: hepatomegalia, estertores, ritmo de galope, cardiomegalia – cautela com fluidos.'
    ],
    passos: [
      '1. Reconhecer o choque e sua provável etiologia; acionar equipe; O2 em alto fluxo; monitorização (FC, SpO2, PA, ECG); posicionar.',
      '2. Acesso IV/IO em até 5 min; coletar glicemia, gasometria com lactato, eletrólitos, hemograma, tipagem sanguínea (se hemorragia), culturas (se infecção).',
      '3. Choque hipovolêmico/distributivo: bolus de cristaloide 20 mL/kg em 5–20 min, reavaliando após cada bolus; repetir conforme resposta (hipovolêmico: até 60 mL/kg ou mais; hemorrágico: hemoderivados precocemente após 1–2 bolus).',
      '4. Choque cardiogênico suspeito: bolus menores (5–10 mL/kg em 10–20 min) com reavaliação; iniciar inotrópico (adrenalina baixa dose, milrinona, dobutamina) e considerar ecocardiograma; tratar arritmia (cardioversão sincronizada 0,5–1 J/kg → 2 J/kg em taquiarritmia instável; adenosina em TSV estável).',
      '5. Choque obstrutivo: descompressão de pneumotórax hipertensivo (agulha no 2º EIC na linha hemiclavicular ou 4º–5º EIC na linha axilar anterior), pericardiocentese no tamponamento.',
      '6. Choque anafilático: adrenalina IM imediata (ver anafilaxia). Choque séptico: antibiótico em 1 h e vasoativos se refratário (ver sepse).',
      '7. Corrigir hipoglicemia e hipocalcemia; manter normotermia; corrigir acidose grave tratando a causa.',
      '8. Vasoativos se choque refratário a fluidos: adrenalina (frio) / noradrenalina (quente); podem ser iniciados em acesso periférico diluído.',
      '9. Considerar via aérea avançada se insuficiência respiratória, rebaixamento ou choque refratário; cetamina como indutor; ventilação com atenção ao retorno venoso.',
      '10. Metas de reanimação: EC ≤ 2 s, pulsos normais, PA normal, diurese ≥ 1 mL/kg/h, consciência normal, lactato em queda, ScvO2 ≥ 70%.'
    ],
    doses: [
      { nome: 'SF 0,9% ou Ringer lactato', indicacao: 'Choque hipovolêmico / distributivo', mgKg: 20, unidade: 'mL', doseMax: 1000, apresentacao: 'Cristaloide isotônico', concentracaoMgMl: null, via: 'IV/IO em 5–20 min', repeticao: 'repetir conforme reavaliação (até 60 mL/kg ou mais no hipovolêmico)', obs: 'Bolus de 5–10 mL/kg se choque cardiogênico, desnutrição grave ou RN.' },
      { nome: 'Cristaloide – choque cardiogênico', indicacao: 'Choque cardiogênico (bolus cauteloso)', mgKg: 10, unidade: 'mL', doseMax: 500, apresentacao: 'SF 0,9% ou RL', concentracaoMgMl: null, via: 'IV/IO em 10–20 min', repeticao: 'reavaliar hepatomegalia/estertores antes de repetir', obs: '5–10 mL/kg.' },
      { nome: 'Concentrado de hemácias', indicacao: 'Choque hemorrágico ou anemia grave com instabilidade', mgKg: 10, unidade: 'mL', doseMax: 500, apresentacao: 'Bolsa de concentrado de hemácias (tipado ou O negativo se emergência)', concentracaoMgMl: null, via: 'IV', repeticao: 'repetir conforme resposta; considerar plasma e plaquetas (protocolo de transfusão maciça 1:1:1)', obs: '10–20 mL/kg elevam a Hb em cerca de 2–3 g/dL (10 mL/kg ≈ +2 g/dL). Aquecer; monitorar cálcio.' },
      { nome: 'Adrenalina infusão contínua', indicacao: 'Choque frio / cardiogênico / refratário', mgKg: null, unidade: 'mcg/kg/min', doseMax: null, apresentacao: 'Diluição padrão: 0,3 × peso (kg) mg em 50 mL → 1 mL/h = 0,1 mcg/kg/min', concentracaoMgMl: null, via: 'IV contínua', repeticao: 'titular a cada 5–10 min', obs: 'Iniciar 0,05–0,3 mcg/kg/min; titular até 1 mcg/kg/min.', informativo: true, faixaMin: 0.05, faixaMax: 0.3, doseFixa: null },
      { nome: 'Noradrenalina infusão contínua', indicacao: 'Choque quente / vasodilatado', mgKg: null, unidade: 'mcg/kg/min', doseMax: null, apresentacao: 'Ampola 4 mg/4 mL', concentracaoMgMl: null, via: 'IV contínua', repeticao: 'titular', obs: '0,05–1 mcg/kg/min (até 2 em UTI).', informativo: true, faixaMin: 0.05, faixaMax: 1, doseFixa: null },
      { nome: 'Dobutamina infusão contínua', indicacao: 'Choque cardiogênico com PA preservada (inotrópico)', mgKg: null, unidade: 'mcg/kg/min', doseMax: null, apresentacao: 'Ampola 250 mg/20 mL (12,5 mg/mL)', concentracaoMgMl: null, via: 'IV contínua', repeticao: 'titular', obs: '2–20 mcg/kg/min; pode causar vasodilatação/hipotensão e taquicardia.', informativo: true, faixaMin: 2, faixaMax: 20, doseFixa: null },
      { nome: 'Milrinona infusão contínua', indicacao: 'Choque cardiogênico / choque frio com PA normal (inodilatador)', mgKg: null, unidade: 'mcg/kg/min', doseMax: null, apresentacao: 'Ampola 1 mg/mL (20 mL)', concentracaoMgMl: null, via: 'IV contínua', repeticao: 'titular', obs: '0,25–0,75 mcg/kg/min; ataque de 50 mcg/kg em 10–60 min é opcional (risco de hipotensão). Ajustar na insuficiência renal.', informativo: true, faixaMin: 0.25, faixaMax: 0.75, doseFixa: null },
      { nome: 'Cardioversão sincronizada', indicacao: 'Taquiarritmia com pulso e instabilidade (TSV, TV com pulso)', mgKg: 1, unidade: 'J', doseMax: 100, apresentacao: 'Desfibrilador manual em modo sincronizado', concentracaoMgMl: null, via: 'externa', repeticao: 'se ineficaz, 2 J/kg', obs: '0,5–1 J/kg no 1º choque; 2 J/kg no seguinte. Sedação/analgesia se possível sem atrasar.' },
      { nome: 'Adenosina', indicacao: 'TSV estável ou instável enquanto prepara cardioversão', mgKg: 0.1, unidade: 'mg', doseMax: 6, apresentacao: 'Ampola 6 mg/2 mL (3 mg/mL)', concentracaoMgMl: 3, via: 'IV/IO rápido (bolus + flush de 5–10 mL de SF, torneira de 3 vias, acesso proximal)', repeticao: '2ª dose 0,2 mg/kg (máx. 12 mg)', obs: 'Registrar ECG contínuo durante a administração.' },
      { nome: 'Gluconato de cálcio 10%', indicacao: 'Hipocalcemia / após transfusão maciça', mgKg: 0.5, unidade: 'mL', doseMax: 20, apresentacao: 'Gluconato de cálcio 10%', concentracaoMgMl: 100, via: 'IV lento', repeticao: 'conforme cálcio ionizado', obs: '50–100 mg/kg (0,5–1 mL/kg).' }
    ],
    materiais: [
      'Monitor multiparamétrico com ECG, oxímetro, manguitos de PA de tamanho adequado (largura ≈ 40% da circunferência do braço).',
      'Material de acesso venoso periférico, intraósseo e central; seringas de 20–60 mL e torneira de 3 vias para bolus rápido; bombas de infusão.',
      'Cristaloides aquecidos, hemoderivados (acesso ao banco de sangue), vasoativos diluídos conforme tabela por peso.',
      'Desfibrilador/cardioversor com pás pediátricas; agulhas 14–18 G para descompressão torácica; ultrassom à beira-leito se disponível.'
    ],
    criteriosUTI: [
      'Choque hipotensivo ou refratário a 40–60 mL/kg de fluido.',
      'Necessidade de drogas vasoativas, ventilação mecânica ou monitorização invasiva.',
      'Choque cardiogênico, obstrutivo ou hemorrágico com necessidade de transfusão maciça.',
      'Disfunção de múltiplos órgãos ou lactato persistentemente elevado.'
    ],
    fontes: [
      { nome: 'AHA – PALS Guidelines', ano: 2020 },
      { nome: 'Surviving Sepsis Campaign Pediátrico', ano: 2020 },
      { nome: 'SBP – Tratado de Pediatria, 5ª ed. (Choque na criança)', ano: 2022 },
      { nome: 'Nelson Textbook of Pediatrics, 22ª ed.', ano: 2024 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'hipoglicemia', nome: 'Hipoglicemia', cor: 'laranja', icone: '🍬',
    reconhecimento: [
      'Glicemia < 60 mg/dL com sintomas ou < 45–50 mg/dL em lactentes e crianças; em RN, conforme protocolo neonatal (geralmente < 40–45 mg/dL nas primeiras 48 h e < 50 mg/dL após).',
      'Sintomas adrenérgicos: sudorese, tremor, palidez, taquicardia, fome, irritabilidade. Neuroglicopênicos: sonolência, confusão, convulsão, coma, hipotonia; em RN: apneia, cianose, hipotermia, sucção débil, choro fraco.',
      'Situações de risco: jejum prolongado, diarreia/vômitos, desnutrição grave, sepse, malária grave (e uso de quinina), filhos de mãe diabética, prematuros, PIG/GIG, uso de insulina ou sulfonilureia, intoxicação por álcool ou salicilato, erros inatos do metabolismo, insuficiência adrenal.',
      'Sempre confirmar glicemia capilar em toda criança com rebaixamento de consciência ou convulsão.'
    ],
    passos: [
      '1. Confirmar com glicemia capilar; se possível colher amostra crítica (glicemia sérica, insulina, cortisol, GH, cetonas, lactato, amônia) antes de corrigir em hipoglicemia recorrente/sem causa aparente.',
      '2. Criança consciente, capaz de deglutir e sem vômitos: carboidrato rápido VO (10–15 g: 100–150 mL de suco, 1 colher de sopa de açúcar em água, ou leite materno/fórmula em lactentes); reavaliar glicemia em 15 min e repetir se necessário; oferecer alimento em seguida.',
      '3. Rebaixamento, convulsão ou incapacidade de deglutir: glicose IV em bolus – glicose 10% 2–5 mL/kg (0,2–0,5 g/kg) em criança; RN 2 mL/kg de glicose 10%. Evitar glicose 50% em pediatria (hiperosmolar; se única disponível, diluir 1:4 com água destilada para 10%).',
      '4. Sem acesso venoso: glucagon IM/SC (se reserva de glicogênio: não é eficaz em desnutrição grave ou jejum prolongado) ou glicose por sonda nasogástrica (AIDPI: 50 mL de água com açúcar ou leite via SNG).',
      '5. Após o bolus: manter infusão contínua de glicose (soro de manutenção com glicose 10% em lactentes ou 5–10% em crianças; RN: TIG 4–6 mg/kg/min, aumentar 2 mg/kg/min se persistir).',
      '6. Reavaliar glicemia 15–30 min após correção e depois a cada 1–2 h até estabilidade (> 60–70 mg/dL); alimentar assim que possível.',
      '7. Investigar e tratar a causa: sepse, malária, desnutrição grave (protocolo OMS: alimentar a cada 2 h, inclusive à noite), insuficiência adrenal (hidrocortisona), intoxicação, erro inato (se hipoglicemia recorrente, hipocetótica ou com hepatomegalia: encaminhar).',
      '8. Hipoglicemia por sulfonilureia/insulina: observação prolongada (24 h) pelo risco de recorrência.'
    ],
    doses: [
      { nome: 'Glicose 10% – RN e lactente jovem', indicacao: 'Hipoglicemia sintomática ou grave em RN', mgKg: 2, unidade: 'mL', doseMax: 20, apresentacao: 'Glicose 10% (100 mg/mL = 0,1 g/mL)', concentracaoMgMl: 100, via: 'IV/IO lento (2–3 min)', repeticao: 'reavaliar em 15–30 min; repetir se < 45 mg/dL e aumentar TIG', obs: '0,2 g/kg = 2 mL/kg de glicose 10%. Fórmula: mL de glicose 10% = g/kg desejado × peso (kg) × 10. Seguir de infusão contínua (TIG 4–8 mg/kg/min).', faixaPesoMin: 0, faixaPesoMax: 5.9 },
      { nome: 'Glicose 10% – criança', indicacao: 'Hipoglicemia com rebaixamento/convulsão', mgKg: 5, unidade: 'mL', doseMax: 250, apresentacao: 'Glicose 10% (100 mg/mL)', concentracaoMgMl: 100, via: 'IV/IO em 5–10 min', repeticao: 'reavaliar em 15–30 min; repetir se necessário', obs: '0,5 g/kg (PALS 0,5–1 g/kg; APLS/SBP 0,2–0,25 g/kg = 2–2,5 mL/kg como alternativa em hipoglicemia leve). Fórmula: mL de glicose 10% = g/kg × peso × 10. Preparo: 1 parte de glicose 50% + 4 partes de água destilada = glicose 10%.', faixaPesoMin: 6, faixaPesoMax: null },
      { nome: 'Glicose 25%', indicacao: 'Hipoglicemia (criança maior, quando glicose 10% indisponível)', mgKg: 2, unidade: 'mL', doseMax: 100, apresentacao: 'Glicose 25% (250 mg/mL) – diluir glicose 50% 1:1 com água destilada', concentracaoMgMl: 250, via: 'IV lento em veia calibrosa', repeticao: 'reavaliar em 15–30 min', obs: '0,5 g/kg = 2 mL/kg. Evitar em RN e lactentes (hiperosmolar).' },
      { nome: 'Glucagon', indicacao: 'Hipoglicemia sem acesso venoso (com reserva de glicogênio)', mgKg: 0.03, unidade: 'mg', doseMax: 1, apresentacao: 'Frasco 1 mg (pó) + diluente', concentracaoMgMl: 1, via: 'IM/SC', repeticao: 'pode repetir em 20 min', obs: '0,02–0,03 mg/kg; ≥ 25 kg: 1 mg; < 25 kg: 0,5 mg. Ineficaz em desnutrição grave/jejum prolongado; pode causar vômitos.' },
      { nome: 'Glicose oral (carboidrato rápido)', indicacao: 'Hipoglicemia leve, criança consciente', mgKg: null, doseFixa: 15, unidade: 'g', doseMax: 15, apresentacao: '1 colher de sopa de açúcar em 100 mL de água, 150 mL de suco ou 3 sachês de glicose', concentracaoMgMl: null, via: 'VO', repeticao: 'repetir em 15 min se glicemia < 70 mg/dL', obs: '10–15 g de carboidrato; lactentes: leite materno ou fórmula.' },
      { nome: 'Soro de manutenção com glicose (TIG)', indicacao: 'Após o bolus – prevenir recorrência', mgKg: null, unidade: 'mg/kg/min', doseMax: null, apresentacao: 'SG 10% (RN/lactentes) ou SG 5–10% + eletrólitos', concentracaoMgMl: null, via: 'IV contínua', repeticao: 'ajustar conforme glicemias seriadas', obs: 'TIG (mg/kg/min) = (% glicose × mL/h) / (6 × peso kg). Alvo 4–8 mg/kg/min; RN pode exigir até 10–12 (investigar hiperinsulinismo se > 8–10).', informativo: true, faixaMin: 4, faixaMax: 8, doseFixa: null }
    ],
    materiais: [
      'Glicosímetro com fitas e lancetas; tubos para amostra crítica (soro, fluoreto) quando indicado.',
      'Glicose 10%, 25% e 50% (com água destilada para diluição), glucagon, sonda nasogástrica.',
      'Material de acesso venoso/IO; bomba de infusão para manutenção.'
    ],
    criteriosUTI: [
      'Hipoglicemia com coma ou convulsão prolongada, ou refratária apesar de TIG > 10–12 mg/kg/min.',
      'Hipoglicemia associada a sepse, malária grave, insuficiência hepática, intoxicação grave ou erro inato descompensado (hiperamonemia, acidose).',
      'Necessidade de acesso central para glicose > 12,5% ou monitorização intensiva.'
    ],
    fontes: [
      { nome: 'AHA – PALS Guidelines', ano: 2020 },
      { nome: 'SBP – Hipoglicemia neonatal: Documento Científico do Departamento de Neonatologia', ano: 2021 },
      { nome: 'Pediatric Endocrine Society – Recommendations for Evaluation and Management of Persistent Hypoglycemia', ano: 2015 },
      { nome: 'Ministério da Saúde – AIDPI Criança / Manual de Atendimento da Criança com Desnutrição Grave', ano: 2005 },
      { nome: 'APLS – Advanced Paediatric Life Support, 7ª ed.', ano: 2023 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'crise_asmatica', nome: 'Crise asmática (exacerbação de asma)', cor: 'laranja', icone: '🫁',
    reconhecimento: [
      'Dispneia, sibilância, tosse, opressão torácica, tiragem, tempo expiratório prolongado; histórico de asma ou episódios recorrentes de sibilância.',
      'Leve/moderada: fala frases, prefere sentar, FR aumentada, sem uso de musculatura acessória, FC ≤ 200 (0–3 a) ou ≤ 180 (4–5 a) ou 100–120 (≥ 6 a), SpO2 90–95% em ar ambiente, PFE > 50% do previsto (≥ 6 anos).',
      'Grave: fala palavras, sentado inclinado, agitado, uso de musculatura acessória, FR > 30, FC > 200 (0–3 a) / > 180 (4–5 a) / > 120 (≥ 6 a), SpO2 < 90%, PFE ≤ 50%.',
      'Iminência de parada respiratória: sonolência, confusão, tórax silencioso, bradicardia, cianose, exaustão, incapacidade de falar/beber.',
      'Fatores de risco para crise fatal: crise prévia com intubação/UTI, ≥ 2 internações ou ≥ 3 idas à emergência no último ano, uso de > 1 frasco de salbutamol/mês, não uso de corticoide inalatório, alergia alimentar, problemas psicossociais.'
    ],
    passos: [
      '1. Avaliar gravidade (fala, consciência, FR, FC, uso de musculatura acessória, SpO2, PFE se ≥ 6 anos). Excluir anafilaxia, corpo estranho, pneumotórax, pneumonia.',
      '2. O2 para SpO2 alvo 94–98% (cânula nasal ou máscara), titulado.',
      '3. Beta-2 agonista de curta ação (salbutamol) por spray com espaçador (preferencial, inclusive em crise grave) ou nebulização com O2: 3 doses a cada 20 min na 1ª hora.',
      '4. Crise moderada/grave: associar ipratrópio às 3 primeiras doses de salbutamol (não manter após admissão).',
      '5. Corticoide sistêmico na 1ª hora para toda crise moderada/grave e para crise leve sem resposta imediata: prednisolona/prednisona VO (metilprednisolona ou hidrocortisona IV se vômitos ou grave). Manter por 3–5 dias sem desmame.',
      '6. Reavaliar após 1 hora (após as 3 doses): boa resposta (SpO2 ≥ 94%, sem tiragem, PFE > 70%) → observar 1–2 h e alta com plano; resposta parcial → manter salbutamol a cada 1–4 h, considerar internação; sem resposta/grave → sulfato de magnésio IV, manter salbutamol contínuo ou frequente, UTI.',
      '7. Crise grave sem resposta: sulfato de magnésio 50 mg/kg IV em 20 min (máx. 2 g); considerar salbutamol IV/terbutalina SC em UTI; evitar aminofilina de rotina.',
      '8. Sinais de falência respiratória: ventilação não invasiva ou intubação (cetamina como indutor, ventilação com tempo expiratório longo e baixa frequência, hipercapnia permissiva).',
      '9. Não indicar rotineiramente: antibióticos, RX de tórax (apenas se suspeita de complicação), fisioterapia, sedativos, mucolíticos.',
      '10. Alta: salbutamol a cada 4–6 h por 48 h, corticoide oral 3–5 dias, iniciar/ajustar corticoide inalatório, revisar técnica do espaçador, plano de ação escrito, retorno em 2–7 dias; orientar sinais de piora.'
    ],
    doses: [
      { nome: 'Salbutamol spray 100 mcg/jato (< 20 kg)', indicacao: 'Crise asmática – broncodilatador', mgKg: null, doseFixa: 4, unidade: 'jatos', doseMax: 10, apresentacao: 'Aerossol 100 mcg/jato com espaçador (máscara em < 4 anos); 1 jato por vez, 5–10 respirações', concentracaoMgMl: null, via: 'inalatória', repeticao: 'a cada 20 min por 3 doses; depois a cada 1–4 h conforme resposta', obs: 'Crise leve: 2–4 jatos; moderada/grave: 4–8 jatos (GINA: até 10). Crianças < 20 kg: 4 jatos por dose.', faixaPesoMin: 0, faixaPesoMax: 19.9 },
      { nome: 'Salbutamol spray 100 mcg/jato (≥ 20 kg)', indicacao: 'Crise asmática – broncodilatador', mgKg: null, doseFixa: 8, unidade: 'jatos', doseMax: 10, apresentacao: 'Aerossol 100 mcg/jato com espaçador', concentracaoMgMl: null, via: 'inalatória', repeticao: 'a cada 20 min por 3 doses; depois a cada 1–4 h', obs: 'Crianças ≥ 20 kg: 8 jatos por dose (até 10 em crise grave).', faixaPesoMin: 20, faixaPesoMax: null },
      { nome: 'Salbutamol nebulização', indicacao: 'Crise asmática moderada/grave (alternativa ao spray)', mgKg: 0.15, unidade: 'mg', doseMax: 5, apresentacao: 'Solução para nebulização 5 mg/mL (1 gota = 0,25 mg); diluir em 3–4 mL de SF, com O2 6–8 L/min', concentracaoMgMl: 5, via: 'nebulização', repeticao: 'a cada 20 min por 3 doses; depois a cada 1–4 h; contínua 0,5 mg/kg/h (máx. 15 mg/h) em UTI', obs: 'Dose mínima 2,5 mg (10 gotas); máxima 5 mg (20 gotas). 0,03 mL/kg da solução.' },
      { nome: 'Ipratrópio nebulização (< 20 kg)', indicacao: 'Crise moderada/grave – junto às 3 primeiras doses de salbutamol', mgKg: null, doseFixa: 250, unidade: 'mcg', doseMax: 500, apresentacao: 'Solução 0,25 mg/mL (20 gotas = 1 mL = 250 mcg)', concentracaoMgMl: 0.25, via: 'nebulização (junto com salbutamol)', repeticao: 'a cada 20 min por 3 doses', obs: '250 mcg = 20 gotas para < 20 kg (ou 40 mcg por jato: 4 jatos com espaçador).', faixaPesoMin: 0, faixaPesoMax: 19.9 },
      { nome: 'Ipratrópio nebulização (≥ 20 kg)', indicacao: 'Crise moderada/grave – junto às 3 primeiras doses de salbutamol', mgKg: null, doseFixa: 500, unidade: 'mcg', doseMax: 500, apresentacao: 'Solução 0,25 mg/mL (40 gotas = 2 mL = 500 mcg)', concentracaoMgMl: 0.25, via: 'nebulização', repeticao: 'a cada 20 min por 3 doses', obs: '500 mcg = 40 gotas para ≥ 20 kg (ou 8 jatos de 40 mcg com espaçador).', faixaPesoMin: 20, faixaPesoMax: null },
      { nome: 'Prednisolona / prednisona', indicacao: 'Corticoide sistêmico – 1ª hora', mgKg: 1, unidade: 'mg', doseMax: 40, apresentacao: 'Prednisolona solução oral 3 mg/mL ou 1 mg/mL; prednisona comprimidos 5 e 20 mg', concentracaoMgMl: 3, via: 'VO', repeticao: '1 vez/dia por 3–5 dias (sem desmame)', obs: '1–2 mg/kg/dia. Máximo 20 mg (< 2 anos), 30 mg (2–5 anos), 40 mg (≥ 6 anos) segundo GINA.' },
      { nome: 'Metilprednisolona', indicacao: 'Corticoide IV se vômitos ou crise grave', mgKg: 1, unidade: 'mg', doseMax: 60, apresentacao: 'Frasco-ampola 40 mg / 125 mg', concentracaoMgMl: null, via: 'IV', repeticao: 'a cada 6–12 h (1–2 mg/kg/dia; máx. 60 mg/dia)', obs: 'Alternativa: hidrocortisona 4–5 mg/kg/dose IV 6/6 h (máx. 200 mg/dose).' },
      { nome: 'Sulfato de magnésio', indicacao: 'Crise grave sem resposta à 1ª hora de tratamento', mgKg: 50, unidade: 'mg', doseMax: 2000, apresentacao: 'MgSO4 50% (500 mg/mL) ou 10% (100 mg/mL); diluir em SF para 50–100 mL', concentracaoMgMl: 500, via: 'IV em 20–30 min', repeticao: 'dose única (pode repetir 1 vez em UTI)', obs: '25–75 mg/kg (usar 50). Monitorar PA (hipotensão), FC e reflexos.' },
      { nome: 'Adrenalina IM', indicacao: 'Suspeita de anafilaxia com broncoespasmo', mgKg: 0.01, unidade: 'mg', doseMax: 0.5, apresentacao: 'Ampola 1 mg/mL', concentracaoMgMl: 1, via: 'IM', repeticao: 'a cada 5–15 min', obs: 'Não é tratamento de rotina da crise asmática.' },
      { nome: 'Terbutalina SC', indicacao: 'Crise grave sem resposta à inalação (UTI / sem via inalatória)', mgKg: 0.01, unidade: 'mg', doseMax: 0.4, apresentacao: 'Ampola 0,5 mg/mL', concentracaoMgMl: 0.5, via: 'SC', repeticao: 'a cada 20 min até 3 doses', obs: '0,01 mg/kg (0,02 mL/kg). Confirmar conforme protocolo institucional.', verificar: true }
    ],
    materiais: [
      'Espaçadores com máscara (lactentes e < 4 anos) e com bocal; salbutamol spray 100 mcg/jato; ipratrópio spray/solução.',
      'Nebulizador a jato com fonte de O2 (6–8 L/min), máscaras; oxímetro de pulso; medidor de pico de fluxo (≥ 6 anos).',
      'Fonte de O2 com cânula nasal e máscara; interface de VNI se disponível; material de intubação e cetamina.',
      'Corticoide oral e IV; sulfato de magnésio; bomba de infusão; plano de ação escrito para alta.'
    ],
    criteriosUTI: [
      'Crise grave sem resposta ao tratamento inicial (salbutamol + ipratrópio + corticoide + magnésio).',
      'Sinais de iminência de parada respiratória: sonolência, confusão, tórax silencioso, cianose, exaustão.',
      'SpO2 < 90% persistente apesar de O2; PaCO2 normal ou elevada em crise grave (fadiga); acidose.',
      'Necessidade de VNI, salbutamol contínuo/IV ou intubação; pneumotórax/pneumomediastino.'
    ],
    fontes: [
      { nome: 'GINA – Global Strategy for Asthma Management and Prevention', ano: 2024 },
      { nome: 'SBP/ASBAI – Consenso de Asma: Guia Prático de Atualização', ano: 2020 },
      { nome: 'Ministério da Saúde – Protocolo Clínico e Diretrizes Terapêuticas da Asma', ano: 2021 },
      { nome: 'AHA – PALS Guidelines (insuficiência respiratória)', ano: 2020 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'broncoespasmo', nome: 'Broncoespasmo / sibilância aguda', cor: 'amarelo', icone: '🌬️',
    reconhecimento: [
      'Sibilância, tempo expiratório prolongado, tiragem, tosse; pode ocorrer em asma, bronquiolite viral aguda (< 2 anos), anafilaxia, aspiração de corpo estranho, pneumonia, inalação de fumaça/irritantes.',
      'Lactente < 12 meses com primeiro episódio de sibilância em contexto viral: provável bronquiolite – broncodilatador e corticoide não são recomendados de rotina.',
      'Sibilância localizada, início súbito, história de engasgo: considerar corpo estranho.',
      'Sinais de gravidade: SpO2 < 92%, tiragem intensa, gemência, apneia (lactentes), cianose, incapacidade de mamar/beber, sonolência.'
    ],
    passos: [
      '1. Avaliar gravidade, SpO2 e contexto (asma conhecida, bronquiolite, anafilaxia, corpo estranho).',
      '2. Asma ou sibilância recorrente responsiva a broncodilatador: seguir o algoritmo de crise asmática (salbutamol spray com espaçador a cada 20 min por 3 doses; ipratrópio e corticoide conforme gravidade).',
      '3. Bronquiolite viral aguda: suporte – O2 se SpO2 < 92%, desobstrução nasal com SF, fracionar dieta, hidratação; evitar salbutamol de rotina (teste terapêutico único aceitável apenas em sibilantes recorrentes/história familiar de asma, mantendo somente se houver resposta objetiva); sem corticoide, sem antibiótico, sem nebulização com salina hipertônica de rotina na emergência.',
      '4. Anafilaxia: adrenalina IM imediata (ver anafilaxia).',
      '5. Suspeita de corpo estranho: não fazer varredura às cegas; RX de tórax em inspiração/expiração; broncoscopia.',
      '6. Reavaliar em 1 hora; internar se necessidade de O2, ingesta < 50% do habitual, apneia, gravidade ou fatores de risco (prematuridade, < 3 meses, cardiopatia, doença pulmonar crônica).'
    ],
    doses: [
      { nome: 'Salbutamol spray 100 mcg/jato (< 20 kg)', indicacao: 'Broncoespasmo responsivo a broncodilatador', mgKg: null, doseFixa: 4, unidade: 'jatos', doseMax: 10, apresentacao: 'Aerossol com espaçador e máscara', concentracaoMgMl: null, via: 'inalatória', repeticao: 'a cada 20 min por 3 doses; depois a cada 4–6 h', obs: 'Ver algoritmo completo em crise asmática.', faixaPesoMin: 0, faixaPesoMax: 19.9 },
      { nome: 'Salbutamol spray 100 mcg/jato (≥ 20 kg)', indicacao: 'Broncoespasmo responsivo a broncodilatador', mgKg: null, doseFixa: 8, unidade: 'jatos', doseMax: 10, apresentacao: 'Aerossol com espaçador', concentracaoMgMl: null, via: 'inalatória', repeticao: 'a cada 20 min por 3 doses; depois a cada 4–6 h', obs: 'Ver algoritmo completo em crise asmática.', faixaPesoMin: 20, faixaPesoMax: null },
      { nome: 'Salbutamol nebulização', indicacao: 'Broncoespasmo moderado/grave', mgKg: 0.15, unidade: 'mg', doseMax: 5, apresentacao: 'Solução 5 mg/mL diluída em 3–4 mL de SF, com O2', concentracaoMgMl: 5, via: 'nebulização', repeticao: 'a cada 20 min por 3 doses', obs: 'Mínimo 2,5 mg, máximo 5 mg.' },
      { nome: 'SF 0,9% nasal', indicacao: 'Bronquiolite – desobstrução nasal', mgKg: null, doseFixa: 1, unidade: 'mL', doseMax: 2, apresentacao: 'Soro fisiológico em gotas/jato em cada narina', concentracaoMgMl: null, via: 'nasal', repeticao: 'antes das mamadas e quando necessário', obs: '0,5–1 mL por narina seguido de aspiração suave.' }
    ],
    materiais: [
      'Espaçador com máscara/bocal, salbutamol spray, nebulizador com O2.',
      'Oxímetro, cânula nasal e máscara de O2; cateter nasal de alto fluxo se disponível (bronquiolite).',
      'Aspirador nasal e SF; sonda nasogástrica para dieta se necessário.'
    ],
    criteriosUTI: [
      'Insuficiência respiratória progressiva, apneias recorrentes, SpO2 < 90% em O2, necessidade de VNI/alto fluxo com falha ou intubação.',
      'Ver critérios de UTI em crise asmática.'
    ],
    fontes: [
      { nome: 'GINA – Global Strategy for Asthma Management and Prevention', ano: 2024 },
      { nome: 'SBP – Diretrizes para o manejo da infecção causada pelo VSR / bronquiolite viral aguda', ano: 2017 },
      { nome: 'AAP – Clinical Practice Guideline: Bronchiolitis', ano: 2014 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'desidratacao_grave', nome: 'Desidratação grave (Plano C)', cor: 'vermelho', icone: '🚱',
    reconhecimento: [
      'Dois ou mais dos sinais (AIDPI/OMS): letargia ou inconsciência; olhos fundos; não consegue beber ou bebe muito mal; sinal da prega cutânea desaparece muito lentamente (> 2 s).',
      'Outros: pulsos fracos/ausentes, enchimento capilar > 2 s, extremidades frias, taquipneia (acidose), oligúria/anúria, mucosas muito secas, fontanela deprimida, perda de peso ≥ 10% (lactentes) ou ≥ 9% (crianças maiores).',
      'Desidratação com choque: hipotensão, rebaixamento, pulsos centrais fracos – tratar como choque hipovolêmico.',
      'Atenção a grupos especiais: desnutrição grave (sinais pouco confiáveis; reidratação lenta), RN, cardiopatas, nefropatas, hipernatremia (irritabilidade, pele pastosa).'
    ],
    passos: [
      '1. Classificar (AIDPI: sem desidratação → Plano A; alguma desidratação → Plano B; desidratação grave → Plano C). Glicemia capilar; sódio e potássio se possível.',
      '2. Acesso venoso imediato (IO se não conseguir em 90 s). Se sinais de choque: bolus de 20 mL/kg de SF ou RL rápido, repetindo até melhora dos pulsos/perfusão, e depois seguir o Plano C.',
      '3. Plano C – Ringer lactato (ou SF 0,9%) 100 mL/kg: < 1 ano: 30 mL/kg em 1 hora + 70 mL/kg em 5 horas; ≥ 1 ano: 30 mL/kg em 30 minutos + 70 mL/kg em 2 horas e 30 minutos.',
      '4. Reavaliar a cada 15–30 min: se o pulso radial continuar fraco/ausente após a primeira fase, repetir 30 mL/kg. Sinais de sobrecarga (estertores, hepatomegalia): reduzir velocidade.',
      '5. Assim que a criança conseguir beber (geralmente após 3–4 h em lactentes e 1–2 h em maiores): oferecer SRO 5 mL/kg/hora junto com a hidratação venosa.',
      '6. Ao final (6 h em < 1 ano; 3 h em ≥ 1 ano) reclassificar: se ainda desidratada grave, repetir o Plano C; alguma desidratação → Plano B (SRO 50–100 mL/kg em 4 h); sem desidratação → Plano A.',
      '7. Sem acesso venoso possível: SRO por sonda nasogástrica 20 mL/kg/h por 6 h (120 mL/kg); reavaliar a cada hora; se vômitos repetidos ou distensão, reduzir velocidade; se não melhorar em 3 h, encaminhar para acesso IV.',
      '8. Após diurese, repor potássio (SRO ou KCl no soro de manutenção); corrigir hipoglicemia; tratar hipernatremia lentamente (queda de Na ≤ 10–12 mEq/L em 24 h).',
      '9. Desnutrição grave: evitar bolus rápidos; preferir SRO especial (ReSoMal) VO/SNG 5 mL/kg a cada 30 min por 2 h e depois 5–10 mL/kg/h; IV apenas se choque (15 mL/kg em 1 h com reavaliação rigorosa).',
      '10. Manter aleitamento materno; zinco por 10–14 dias; antibiótico apenas na disenteria (sangue nas fezes), cólera grave ou sepse; ondansetrona pode reduzir vômitos e falha da TRO. Evitar antidiarreicos.',
      '11. Orientar prevenção: higiene, água tratada, vacinação (rotavírus), retorno imediato com sinais de alarme.'
    ],
    doses: [
      { nome: 'Bolus inicial (choque hipovolêmico)', indicacao: 'Desidratação grave com sinais de choque', mgKg: 20, unidade: 'mL', doseMax: 1000, apresentacao: 'SF 0,9% ou Ringer lactato', concentracaoMgMl: null, via: 'IV/IO rápido (5–15 min)', repeticao: 'repetir até melhora da perfusão; depois seguir Plano C', obs: 'Em desnutrição grave: 15 mL/kg em 1 h, apenas se choque, com reavaliação rigorosa.' },
      { nome: 'Plano C – fase rápida (< 1 ano)', indicacao: 'Desidratação grave, lactente < 12 meses', mgKg: 30, unidade: 'mL', doseMax: 300, apresentacao: 'Ringer lactato (ou SF 0,9%)', concentracaoMgMl: null, via: 'IV/IO em 1 hora', repeticao: 'repetir 30 mL/kg se pulso radial ainda fraco/ausente', obs: 'Primeira fase do total de 100 mL/kg.', faixaEtaria: '< 1 ano' },
      { nome: 'Plano C – fase de manutenção (< 1 ano)', indicacao: 'Desidratação grave, lactente < 12 meses', mgKg: 70, unidade: 'mL', doseMax: 700, apresentacao: 'Ringer lactato (ou SF 0,9%)', concentracaoMgMl: null, via: 'IV em 5 horas', repeticao: 'reavaliar ao final (6 h) e reclassificar', obs: 'Iniciar SRO 5 mL/kg/h assim que conseguir beber.', faixaEtaria: '< 1 ano' },
      { nome: 'Plano C – fase rápida (≥ 1 ano)', indicacao: 'Desidratação grave, criança ≥ 12 meses', mgKg: 30, unidade: 'mL', doseMax: 1000, apresentacao: 'Ringer lactato (ou SF 0,9%)', concentracaoMgMl: null, via: 'IV/IO em 30 minutos', repeticao: 'repetir 30 mL/kg se pulso radial ainda fraco/ausente', obs: 'Primeira fase do total de 100 mL/kg.', faixaEtaria: '≥ 1 ano' },
      { nome: 'Plano C – fase de manutenção (≥ 1 ano)', indicacao: 'Desidratação grave, criança ≥ 12 meses', mgKg: 70, unidade: 'mL', doseMax: 2500, apresentacao: 'Ringer lactato (ou SF 0,9%)', concentracaoMgMl: null, via: 'IV em 2 horas e 30 minutos', repeticao: 'reavaliar ao final (3 h) e reclassificar', obs: 'Iniciar SRO 5 mL/kg/h assim que conseguir beber.', faixaEtaria: '≥ 1 ano' },
      { nome: 'SRO durante o Plano C', indicacao: 'Assim que conseguir beber', mgKg: 5, unidade: 'mL', doseMax: 250, apresentacao: 'Sais de reidratação oral (OMS, osmolaridade reduzida)', concentracaoMgMl: null, via: 'VO, por hora', repeticao: 'a cada hora até o fim da fase IV', obs: '5 mL/kg/hora.' },
      { nome: 'SRO por sonda nasogástrica', indicacao: 'Desidratação grave sem acesso venoso', mgKg: 20, unidade: 'mL', doseMax: 1000, apresentacao: 'SRO', concentracaoMgMl: null, via: 'SNG, por hora, durante 6 h', repeticao: 'reavaliar a cada hora; total 120 mL/kg em 6 h', obs: '20 mL/kg/hora. Reduzir se vômitos repetidos ou distensão abdominal.' },
      { nome: 'Plano B – SRO', indicacao: 'Alguma desidratação (após o Plano C ou desde o início)', mgKg: 75, unidade: 'mL', doseMax: 3000, apresentacao: 'SRO com copo/colher, em pequenos volumes frequentes', concentracaoMgMl: null, via: 'VO em 4 horas', repeticao: 'reavaliar a cada 1–2 h e ao final de 4 h', obs: '50–100 mL/kg em 4 h (usar 75). Se vomitar, aguardar 10 min e reiniciar mais lentamente.' },
      { nome: 'Ondansetrona', indicacao: 'Vômitos que impedem a TRO (≥ 6 meses)', mgKg: 0.15, unidade: 'mg', doseMax: 8, apresentacao: 'Solução oral 4 mg/5 mL, comprimido 4/8 mg, ampola 2 mg/mL', concentracaoMgMl: 0.8, via: 'VO / IV lento', repeticao: 'dose única (pode repetir 1 vez após 8 h)', obs: '0,15 mg/kg; doses práticas VO: 8–15 kg 2 mg; 15–30 kg 4 mg; > 30 kg 8 mg.' },
      { nome: 'Zinco (< 6 meses)', indicacao: 'Diarreia aguda – suplementação por 10–14 dias', mgKg: null, doseFixa: 10, unidade: 'mg', doseMax: 10, apresentacao: 'Sulfato de zinco solução oral 4 mg/mL ou comprimido dispersível 10 mg', concentracaoMgMl: null, via: 'VO', repeticao: '1 vez/dia por 10–14 dias', obs: 'Lactentes < 6 meses: 10 mg/dia.', faixaEtaria: '< 6 meses' },
      { nome: 'Zinco (≥ 6 meses)', indicacao: 'Diarreia aguda – suplementação por 10–14 dias', mgKg: null, doseFixa: 20, unidade: 'mg', doseMax: 20, apresentacao: 'Sulfato de zinco solução oral 4 mg/mL ou comprimido 20 mg', concentracaoMgMl: null, via: 'VO', repeticao: '1 vez/dia por 10–14 dias', obs: 'Crianças ≥ 6 meses: 20 mg/dia.', faixaEtaria: '≥ 6 meses' },
      { nome: 'Cloreto de potássio no soro de manutenção', indicacao: 'Reposição após diurese presente', mgKg: 2, unidade: 'mEq', doseMax: 80, apresentacao: 'KCl 19,1% (2,5 mEq/mL) ou 10% (1,34 mEq/mL) adicionado ao soro', concentracaoMgMl: null, via: 'IV diluída (≤ 40 mEq/L em periférico)', repeticao: 'por dia (2–3 mEq/kg/dia), ajustar pelo K sérico', obs: 'Nunca em bolus. Somente após confirmar diurese.' }
    ],
    materiais: [
      'Ringer lactato e SF 0,9% em quantidade suficiente (100 mL/kg), equipos macrogotas, bomba de infusão ou controle de gotejamento; material de acesso venoso e IO.',
      'SRO em sachês (OMS de osmolaridade reduzida), copos, colheres, sonda nasogástrica (6–10 Fr) e seringas.',
      'Balança para peso seriado, glicosímetro, tubos para Na/K/gasometria; zinco e ondansetrona.'
    ],
    criteriosUTI: [
      'Choque hipovolêmico refratário a 40–60 mL/kg ou necessidade de vasoativo.',
      'Rebaixamento persistente do nível de consciência, convulsões (hiponatremia/hipernatremia), hipernatremia > 160 mEq/L ou hiponatremia < 120 mEq/L.',
      'Insuficiência renal aguda (anúria persistente após reidratação), acidose grave (pH < 7,1), hipocalemia grave com arritmia.',
      'Desnutrição grave com choque ou sepse associada; íleo paralítico; sinais de sobrecarga com necessidade de ventilação.'
    ],
    fontes: [
      { nome: 'Ministério da Saúde – Manual AIDPI Criança: 2 meses a 5 anos', ano: 2017 },
      { nome: 'Ministério da Saúde – Manejo do paciente com diarreia (cartaz Planos A, B e C)', ano: 2023 },
      { nome: 'OMS – The Treatment of Diarrhoea: a manual for physicians and other senior health workers', ano: 2005 },
      { nome: 'SBP – Diarreia aguda: diagnóstico e tratamento (Guia Prático)', ano: 2017 },
      { nome: 'OMS – Pocket Book of Hospital Care for Children, 2ª ed.', ano: 2013 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'intoxicacao', nome: 'Intoxicação exógena aguda', cor: 'laranja', icone: '☠️',
    reconhecimento: [
      'História de exposição (medicamentos, produtos de limpeza, agrotóxicos/organofosforados, raticidas, plantas, derivados de petróleo, álcool, drogas) ou quadro súbito inexplicado em criança previamente hígida (1–5 anos: acidental; adolescentes: intencional).',
      'Toxíndromes: colinérgica (miose, sialorreia, broncorreia, bradicardia, diarreia, fasciculações – organofosforados/carbamatos); anticolinérgica (midríase, pele seca e quente, delirium, retenção urinária, taquicardia – anti-histamínicos, tricíclicos, plantas); simpaticomimética (midríase, taquicardia, hipertensão, agitação, hipertermia); opioide (miose, depressão respiratória, coma); sedativo-hipnótica (sonolência, ataxia, depressão respiratória).',
      'Sinais de gravidade: rebaixamento, convulsões, arritmia/QRS alargado, hipotensão, depressão respiratória, hipertermia, acidose metabólica com ânion gap elevado.',
      'Ligar para o Centro de Informação e Assistência Toxicológica – Disque-Intoxicação 0800 722 6001 (24 h) para orientação específica.'
    ],
    passos: [
      '1. ABCDE: via aérea, ventilação, circulação, glicemia capilar, nível de consciência, temperatura, ECG de 12 derivações (QRS, QT), monitorização. Tratar convulsão com benzodiazepínico; corrigir hipoglicemia.',
      '2. Identificar o agente: embalagem, quantidade máxima possível (contar comprimidos), horário, via; peso da criança; contatar CIATox (0800 722 6001).',
      '3. Descontaminação: pele/olhos – remover roupas e lavar abundantemente com água (proteger a equipe: organofosforados). Gastrointestinal: carvão ativado até 1–2 h da ingestão (mais tarde para liberação lenta/anticolinérgicos), apenas se via aérea protegida; NÃO induzir vômito; lavagem gástrica apenas em ingestão potencialmente letal há < 1 h e via aérea protegida.',
      '4. Contraindicações do carvão: cáusticos (ácidos/álcalis), hidrocarbonetos (querosene, gasolina), álcool, ferro, lítio, metais; rebaixamento sem via aérea protegida; íleo/obstrução.',
      '5. Cáusticos: nada por via oral, não neutralizar, não induzir vômito; endoscopia em 12–24 h se sintomas. Hidrocarbonetos: risco de pneumonite aspirativa – observação, RX se sintomas respiratórios.',
      '6. Antídotos conforme o agente: naloxona (opioides), flumazenil (benzodiazepínico puro, sem coingestão de tricíclico/convulsão), N-acetilcisteína (paracetamol, guiado pelo nomograma de Rumack-Matthew ≥ 4 h), atropina + pralidoxima (organofosforados), bicarbonato (tricíclicos com QRS > 100 ms, salicilatos), vitamina K (raticida cumarínico com sangramento/INR elevado), hidroxocobalamina (cianeto/fumaça), desferoxamina (ferro).',
      '7. Exames conforme suspeita: paracetamol sérico (4 h), gasometria, eletrólitos, glicemia, função renal/hepática, CPK, ECG seriado, RX se hidrocarboneto; toxicológico de urina se disponível.',
      '8. Eliminação aumentada: carvão em doses múltiplas (carbamazepina, fenobarbital, teofilina, dapsona), alcalinização urinária (salicilato), hemodiálise (salicilato grave, lítio, metanol/etilenoglicol, metformina com acidose) – discutir com CIATox.',
      '9. Observação mínima de 6 h para ingestões assintomáticas (24 h para paracetamol, liberação lenta, sulfonilureias, tricíclicos, difenoxilato, metadona).',
      '10. Notificação compulsória (SINAN); avaliar contexto: prevenção de acidentes, saúde mental do adolescente (intencional) e possibilidade de maus-tratos.'
    ],
    doses: [
      { nome: 'Carvão ativado', indicacao: 'Descontaminação gastrointestinal (≤ 1–2 h da ingestão)', mgKg: 1, unidade: 'g', doseMax: 50, apresentacao: 'Pó – suspender em água (1 g em 4–8 mL) ou sorbitol; frascos de 25–50 g', concentracaoMgMl: null, via: 'VO ou SNG (via aérea protegida se rebaixado)', repeticao: 'doses múltiplas 0,5 g/kg a cada 4 h para agentes selecionados', obs: '1 g/kg (máx. 50 g). Contraindicado em cáusticos, hidrocarbonetos, rebaixamento sem proteção de via aérea, íleo.' },
      { nome: 'Naloxona', indicacao: 'Intoxicação por opioide com depressão respiratória', mgKg: 0.1, unidade: 'mg', doseMax: 2, apresentacao: 'Ampola 0,4 mg/mL', concentracaoMgMl: 0.4, via: 'IV/IO/IM/IN', repeticao: 'a cada 2–3 min até resposta; infusão 2/3 da dose eficaz por hora se recorrência', obs: '0,1 mg/kg até 20 kg ou 5 anos; ≥ 20 kg: 2 mg. Meia-vida curta: observar recorrência (metadona, liberação lenta).' },
      { nome: 'Flumazenil', indicacao: 'Intoxicação isolada por benzodiazepínico com depressão respiratória', mgKg: 0.01, unidade: 'mg', doseMax: 0.2, apresentacao: 'Ampola 0,5 mg/5 mL (0,1 mg/mL)', concentracaoMgMl: 0.1, via: 'IV em 15–30 s', repeticao: 'a cada 1 min até dose total máxima de 1 mg', obs: 'Contraindicado se coingestão de tricíclico/pró-convulsivante, epilepsia em uso crônico de benzodiazepínico ou hipertensão intracraniana (risco de convulsão).' },
      { nome: 'N-acetilcisteína IV – dose de ataque', indicacao: 'Intoxicação por paracetamol (nomograma ou dose > 150 mg/kg / desconhecida)', mgKg: 150, unidade: 'mg', doseMax: 15000, apresentacao: 'Ampola 300 mg/3 mL (100 mg/mL) ou 600 mg/3 mL – diluir em SG 5% (volume por peso)', concentracaoMgMl: 100, via: 'IV em 60 min', repeticao: 'depois 50 mg/kg em 4 h e 100 mg/kg em 16 h (total 300 mg/kg em 21 h); prolongar se transaminases elevadas', obs: 'Iniciar idealmente até 8 h da ingestão. Reações anafilactoides: reduzir velocidade, anti-histamínico. Alternativa VO: 140 mg/kg de ataque, depois 70 mg/kg 4/4 h por 17 doses.' },
      { nome: 'Atropina', indicacao: 'Intoxicação por organofosforado/carbamato (síndrome colinérgica)', mgKg: 0.05, unidade: 'mg', doseMax: 2, apresentacao: 'Ampola 0,25 mg/mL ou 0,5 mg/mL (frascos de maior concentração em casos graves)', concentracaoMgMl: 0.5, via: 'IV/IM', repeticao: 'dobrar a dose a cada 3–5 min até secagem das secreções brônquicas (não usar pupila como alvo); depois infusão contínua', obs: '0,02–0,05 mg/kg (mínimo 0,1 mg). Não há dose máxima total; alvo é ausência de broncorreia.' },
      { nome: 'Pralidoxima', indicacao: 'Intoxicação por organofosforado (junto à atropina, até 24–48 h)', mgKg: 25, unidade: 'mg', doseMax: 2000, apresentacao: 'Frasco 200 mg/10 mL ou 1 g (pó) – diluir em SF', concentracaoMgMl: null, via: 'IV em 15–30 min', repeticao: 'repetir em 1 h se fraqueza persistir; infusão 10–20 mg/kg/h', obs: '25–50 mg/kg (máx. 2 g). Confirmar disponibilidade e dose conforme protocolo do CIATox.', verificar: true },
      { nome: 'Bicarbonato de sódio 8,4%', indicacao: 'Tricíclicos com QRS > 100 ms, arritmia ou hipotensão; salicilato (alcalinização)', mgKg: 1, unidade: 'mEq', doseMax: 100, apresentacao: 'Solução 8,4% (1 mEq/mL)', concentracaoMgMl: null, via: 'IV bolus', repeticao: 'repetir até QRS < 100 ms (alvo pH 7,45–7,55); depois infusão contínua', obs: '1–2 mEq/kg. Monitorar K e sódio.' },
      { nome: 'Vitamina K (fitomenadiona)', indicacao: 'Raticida cumarínico com sangramento ou INR elevado', mgKg: 0.3, unidade: 'mg', doseMax: 10, apresentacao: 'Ampola 10 mg/mL', concentracaoMgMl: 10, via: 'VO (preferencial) ou IV lenta', repeticao: 'diariamente por semanas (superwarfarinas) conforme INR', obs: '0,3 mg/kg (1–10 mg). Sem sangramento: não é necessária profilaxia; monitorar INR em 48–72 h. Sangramento grave: plasma fresco/complexo protrombínico.' },
      { nome: 'Diazepam', indicacao: 'Convulsão ou agitação grave (simpaticomiméticos, organofosforados)', mgKg: 0.3, unidade: 'mg', doseMax: 10, apresentacao: 'Ampola 10 mg/2 mL', concentracaoMgMl: 5, via: 'IV lento', repeticao: 'pode repetir em 5–10 min', obs: 'Evitar fenitoína em intoxicação (menos eficaz e arritmogênica em tricíclicos/cocaína).' },
      { nome: 'Lipídio 20% (emulsão lipídica)', indicacao: 'Toxicidade grave por anestésico local ou cardiotoxicidade lipofílica refratária', mgKg: 1.5, unidade: 'mL', doseMax: 100, apresentacao: 'Emulsão lipídica 20%', concentracaoMgMl: null, via: 'IV em 1 min; depois 0,25 mL/kg/min por 30–60 min', repeticao: 'pode repetir bolus 1–2 vezes se PCR persistente', obs: 'Uso de resgate; discutir com CIATox.', verificar: true }
    ],
    materiais: [
      'Telefone do CIATox (0800 722 6001) visível; carvão ativado, sonda nasogástrica, seringas de 60 mL.',
      'Kit de antídotos: naloxona, flumazenil, N-acetilcisteína, atropina (em quantidade), pralidoxima, bicarbonato, vitamina K, glucagon, emulsão lipídica, azul de metileno, hidroxocobalamina quando disponíveis.',
      'ECG de 12 derivações, monitor, glicosímetro, material de proteção individual para descontaminação, chuveiro/lavagem ocular.'
    ],
    criteriosUTI: [
      'Coma, convulsões recorrentes, depressão respiratória com necessidade de ventilação.',
      'Arritmias, QRS > 100 ms, QT longo, hipotensão ou choque.',
      'Intoxicação por organofosforado com broncorreia/fraqueza, tricíclicos sintomáticos, bloqueadores de canal de cálcio/betabloqueadores, salicilato grave, metanol/etilenoglicol, ferro grave.',
      'Necessidade de hemodiálise, infusões contínuas de antídoto ou paracetamol com hepatotoxicidade.'
    ],
    fontes: [
      { nome: 'Ministério da Saúde – Guia de Vigilância em Saúde (Intoxicação exógena)', ano: 2023 },
      { nome: 'ABRACIT/CIATox – Diretrizes de atendimento às intoxicações', ano: 2022 },
      { nome: 'AHA – PALS Guidelines (Toxicological emergencies)', ano: 2020 },
      { nome: 'Nelson Textbook of Pediatrics, 22ª ed. (Poisoning)', ano: 2024 },
      { nome: 'Goldfrank – Toxicologic Emergencies, 11ª ed.', ano: 2019 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'trauma', nome: 'Trauma pediátrico (atendimento inicial)', cor: 'vermelho', icone: '🚑',
    reconhecimento: [
      'Mecanismos de risco: queda > 3 m ou > 2× a altura da criança, atropelamento, ejeção de veículo, acidente de moto/bicicleta sem capacete, afogamento, queimaduras extensas, trauma penetrante, agressão; considerar violência/maus-tratos quando história incompatível com as lesões.',
      'Particularidades pediátricas: cabeça proporcionalmente grande (TCE frequente), via aérea estreita e anteriorizada, reserva fisiológica que mantém a PA até perda de 30–45% da volemia (hipotensão é tardia), lesões de órgãos internos sem fraturas, hipotermia rápida, distensão gástrica.',
      'Sinais de choque: taquicardia, enchimento capilar > 2 s, pulsos periféricos fracos, extremidades frias, rebaixamento, pressão de pulso estreitada; hipotensão = choque descompensado.',
      'Sinais de hipertensão intracraniana: rebaixamento progressivo, anisocoria, bradicardia + hipertensão + respiração irregular (tríade de Cushing), postura anormal.'
    ],
    passos: [
      'A – Via aérea com estabilização da coluna cervical (colar/coxins; alinhamento manual). Aspirar, elevar mandíbula (jaw thrust); cânula orofaríngea se inconsciente; intubação orotraqueal (com cuff) se Glasgow ≤ 8, apneia, obstrução, choque refratário ou queimadura de via aérea. Sequência rápida: cetamina (ou etomidato) + rocurônio/succinilcolina.',
      'B – Respiração: O2 a 100%, oxímetro, exame do tórax. Pneumotórax hipertensivo: descompressão imediata com agulha (2º EIC linha hemiclavicular ou 4º–5º EIC linha axilar anterior) e dreno torácico. Pneumotórax aberto: curativo de 3 pontas. Tórax instável/contusão pulmonar: analgesia, O2, considerar VM.',
      'C – Circulação: controlar hemorragia externa (compressão direta; torniquete em membro se exsanguinante). Dois acessos venosos calibrosos ou IO em 90 s. Bolus de cristaloide aquecido 20 mL/kg; se sem resposta após 1–2 bolus (ou choque grave): concentrado de hemácias 10–20 mL/kg + plasma + plaquetas (protocolo de transfusão maciça 1:1:1) e ácido tranexâmico até 3 h do trauma. Procurar sangramento oculto: tórax, abdome (FAST), pelve (cinta pélvica), ossos longos, retroperitônio; lactente: também crânio/couro cabeludo.',
      'D – Neurológico: Glasgow pediátrico, pupilas, glicemia capilar, sinais de lateralização. Sinais de herniação: elevar cabeceira 30°, hiperventilação breve (PaCO2 30–35) apenas como ponte, salina hipertônica 3% ou manitol, neurocirurgia. Evitar hipotensão e hipóxia (piores prognósticos no TCE).',
      'E – Exposição e ambiente: despir e examinar todo o corpo (incluindo dorso, com rolamento em bloco), depois cobrir e aquecer (mantas, fluidos aquecidos, sala aquecida) – prevenir hipotermia.',
      'Adjuntos: monitorização, sonda nasogástrica/orogástrica (orogástrica se suspeita de fratura de base de crânio), sonda vesical (se não houver sangue no meato/hematoma perineal), RX de tórax e pelve, FAST, gasometria com lactato, tipagem sanguínea, hemograma, coagulograma, amilase/lipase, transaminases, urina; TC de crânio conforme regras de decisão (PECARN); TC de abdome se FAST positivo estável, transaminases > 200 ou exame suspeito.',
      'Avaliação secundária (após estabilização): história AMPLA (Alergias, Medicamentos, Passado, Líquidos/última refeição, Ambiente/mecanismo), exame da cabeça aos pés, imobilização de fraturas, curativos, analgesia adequada, profilaxia antitetânica, antibiótico em fratura exposta/lesão penetrante.',
      'Queimaduras: parar o processo, resfriar com água corrente (≤ 20 min), calcular SCQ (Lund-Browder), Parkland 2–4 mL/kg/%SCQ de RL nas primeiras 24 h (metade em 8 h) + manutenção em < 30 kg, para queimaduras ≥ 10% SCQ; analgesia; encaminhar ao centro de queimados conforme critérios.',
      'Decidir transferência precoce para centro de trauma pediátrico/UTI; comunicar equipe receptora; documentar; considerar notificação de violência quando aplicável.'
    ],
    doses: [
      { nome: 'Cristaloide aquecido (SF 0,9% ou RL)', indicacao: 'Choque hemorrágico – reposição inicial', mgKg: 20, unidade: 'mL', doseMax: 1000, apresentacao: 'SF 0,9% ou Ringer lactato aquecido a 39 °C', concentracaoMgMl: null, via: 'IV/IO em bolus rápido', repeticao: 'repetir 1 vez se resposta transitória; depois hemoderivados', obs: 'ATLS 10ª ed.: 20 mL/kg (até 2 bolus) e transfundir precocemente se sem resposta.' },
      { nome: 'Concentrado de hemácias', indicacao: 'Choque hemorrágico sem resposta ao cristaloide', mgKg: 10, unidade: 'mL', doseMax: 500, apresentacao: 'CH tipado ou O negativo (emergência)', concentracaoMgMl: null, via: 'IV', repeticao: '10–20 mL/kg; repetir com plasma e plaquetas em proporção 1:1:1', obs: 'Aquecer; monitorar cálcio ionizado e coagulação.' },
      { nome: 'Ácido tranexâmico', indicacao: 'Hemorragia significativa – até 3 h do trauma', mgKg: 15, unidade: 'mg', doseMax: 1000, apresentacao: 'Ampola 250 mg/5 mL ou 500 mg/5 mL', concentracaoMgMl: 100, via: 'IV em 10 min', repeticao: 'seguida de 2 mg/kg/h por 8 h (máx. 125 mg/h) ou 2ª dose de 15 mg/kg', obs: '15 mg/kg (máx. 1 g) de ataque. Contraindicado se > 3 h do trauma.' },
      { nome: 'Salina hipertônica 3%', indicacao: 'Sinais de herniação / hipertensão intracraniana no TCE', mgKg: 3, unidade: 'mL', doseMax: 250, apresentacao: 'NaCl 3% (preparar: 10 mL de NaCl 20% + 90 mL de SF ≈ 2,8%)', concentracaoMgMl: null, via: 'IV em 10–20 min', repeticao: '3–5 mL/kg; repetir conforme Na sérico (alvo ≤ 160 mEq/L)', obs: 'Alternativa: manitol 20% 0,5–1 g/kg (2,5–5 mL/kg) IV em 20 min, se PA estável.' },
      { nome: 'Manitol 20%', indicacao: 'Hipertensão intracraniana (alternativa à salina hipertônica; evitar se hipotensão)', mgKg: 2.5, unidade: 'mL', doseMax: 250, apresentacao: 'Manitol 20% (200 mg/mL)', concentracaoMgMl: 200, via: 'IV em 20 min', repeticao: 'pode repetir a cada 4–6 h se osmolaridade < 320', obs: '0,5 g/kg = 2,5 mL/kg (0,5–1 g/kg). Monitorar diurese e osmolaridade.' },
      { nome: 'Cetamina (indução para intubação)', indicacao: 'Sequência rápida de intubação no trauma/choque', mgKg: 1, unidade: 'mg', doseMax: 100, apresentacao: 'Frasco 50 mg/mL (10 mL)', concentracaoMgMl: 50, via: 'IV/IO', repeticao: 'dose única (1–2 mg/kg)', obs: 'Preserva PA. Analgesia isolada: 0,25–0,5 mg/kg IV.' },
      { nome: 'Rocurônio (bloqueador neuromuscular)', indicacao: 'Sequência rápida de intubação', mgKg: 1, unidade: 'mg', doseMax: 100, apresentacao: 'Frasco 50 mg/5 mL (10 mg/mL)', concentracaoMgMl: 10, via: 'IV/IO', repeticao: 'dose única (0,6–1,2 mg/kg)', obs: 'Alternativa: succinilcolina 1–2 mg/kg (2 mg/kg em lactentes; evitar em hiperpotassemia, queimadura > 48 h, doença neuromuscular).' },
      { nome: 'Fentanil', indicacao: 'Analgesia de dor intensa', mgKg: 1, unidade: 'mcg', doseMax: 100, apresentacao: 'Ampola 50 mcg/mL', concentracaoMgMl: 0.05, via: 'IV lento (2–3 min) ou intranasal (1,5 mcg/kg)', repeticao: 'a cada 30–60 min conforme dor', obs: '1–2 mcg/kg. Risco de depressão respiratória e rigidez torácica em bolus rápido.' },
      { nome: 'Morfina', indicacao: 'Analgesia de dor intensa', mgKg: 0.1, unidade: 'mg', doseMax: 10, apresentacao: 'Ampola 10 mg/mL (diluir para 1 mg/mL)', concentracaoMgMl: 1, via: 'IV lento', repeticao: 'a cada 2–4 h', obs: '0,05–0,1 mg/kg. Monitorar respiração e PA.' },
      { nome: 'Dipirona', indicacao: 'Analgesia de dor leve/moderada', mgKg: 15, unidade: 'mg', doseMax: 1000, apresentacao: 'Ampola 500 mg/mL (1 g/2 mL); solução oral 500 mg/mL', concentracaoMgMl: 500, via: 'IV lento (diluída) / VO', repeticao: 'a cada 6 h', obs: '10–15 mg/kg; > 3 meses.' },
      { nome: 'Cefazolina (fratura exposta)', indicacao: 'Profilaxia em fratura exposta', mgKg: 30, unidade: 'mg', doseMax: 2000, apresentacao: 'Frasco-ampola 1 g', concentracaoMgMl: null, via: 'IV', repeticao: 'a cada 8 h por 24–72 h conforme classificação de Gustilo', obs: '25–30 mg/kg/dose (máx. 2 g). Associar gentamicina em Gustilo III.' },
      { nome: 'Fluido para queimados (Parkland)', indicacao: 'Queimadura ≥ 10% da SCQ – primeiras 24 h', mgKg: 3, unidade: 'mL', doseMax: null, apresentacao: 'Ringer lactato', concentracaoMgMl: null, via: 'IV em 24 h (metade nas primeiras 8 h após a queimadura)', repeticao: 'ajustar para diurese de 1 mL/kg/h (< 30 kg) ou 0,5 mL/kg/h', obs: 'Volume total (mL) = 2–4 mL × peso (kg) × %SCQ (o valor por kg aqui corresponde a 1% de SCQ). Somar manutenção com glicose em < 30 kg.' }
    ],
    materiais: [
      'Colar cervical pediátrico, prancha com coxim sob o tronco (lactentes/pré-escolares, pela cabeça grande), cinta pélvica improvisada com lençol.',
      'Material de via aérea por tamanho (tubos com cuff, lâminas 0–3, bougie, dispositivo supraglótico), aspirador, capnografia; agulhas 14–16 G e drenos torácicos (12–28 Fr por idade).',
      'Acesso IO (agulha manual/dispositivo), infusor rápido/aquecedor de fluidos, mantas térmicas, hemoderivados (banco de sangue), ácido tranexâmico.',
      'Ultrassom (FAST), RX portátil, TC; talas, curativos, sonda nasogástrica e vesical; fita de Broselow; balança.'
    ],
    criteriosUTI: [
      'Glasgow ≤ 12 ou queda ≥ 2 pontos, TCE com lesão em TC, sinais de hipertensão intracraniana.',
      'Choque hemorrágico, necessidade de transfusão maciça, vasoativos ou cirurgia de urgência.',
      'Insuficiência respiratória, tórax instável, contusão pulmonar extensa, necessidade de ventilação.',
      'Trauma raquimedular, queimadura > 20% da SCQ ou de via aérea, lesão de múltiplos sistemas, lesão vascular.'
    ],
    fontes: [
      { nome: 'ATLS – Advanced Trauma Life Support, 10ª ed. (Trauma pediátrico)', ano: 2018 },
      { nome: 'AHA – PALS Guidelines', ano: 2020 },
      { nome: 'Royal College of Paediatrics and Child Health – Tranexamic acid in major trauma (Evidence statement)', ano: 2012 },
      { nome: 'Brain Trauma Foundation – Guidelines for the Management of Pediatric Severe TBI, 3ª ed.', ano: 2019 },
      { nome: 'SBP – Tratado de Pediatria, 5ª ed. (Trauma pediátrico; Queimaduras)', ano: 2022 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'acidente_ofidico', nome: 'Acidente ofídico (serpentes peçonhentas)', cor: 'laranja', icone: '🐍',
    reconhecimento: [
      'Botrópico (jararaca, surucucurana, jararaca-do-norte – 85–90% dos casos na Amazônia): dor, edema progressivo, equimose, bolhas, sangramentos (gengivorragia, hematúria), tempo de coagulação (TC) alterado. Leve: edema local discreto, TC normal ou alterado; Moderado: edema evidente ultrapassando o segmento picado, hemorragia leve; Grave: edema intenso/extenso, bolhas, necrose, choque, sangramentos graves, oligúria/IRA.',
      'Crotálico (cascavel): sinais locais discretos; fácies miastênica (ptose palpebral, diplopia, oftalmoplegia), mialgia, urina escura (mioglobinúria), TC alterado. Leve: fácies discreta sem mialgia/urina escura; Moderado: fácies evidente + mialgia discreta + urina escura discreta; Grave: fácies intensa, mialgia intensa, urina escura, oligúria/IRA.',
      'Laquético (surucucu-pico-de-jaca – florestas da Amazônia): quadro semelhante ao botrópico + síndrome vagal (bradicardia, hipotensão, diarreia, dor abdominal, sudorese). Classificar como moderado ou grave.',
      'Elapídico (coral verdadeira): dor local discreta ou ausente; ptose, diplopia, dificuldade de deglutir, sialorreia, fraqueza muscular progressiva e insuficiência respiratória – sempre considerado grave.',
      'Crianças têm maior gravidade pela menor massa corporal (mesma quantidade de veneno) – a dose de soro é a mesma do adulto.'
    ],
    passos: [
      '1. Tranquilizar, manter em repouso com o membro elevado, lavar o local com água e sabão; retirar anéis/adornos. NÃO fazer torniquete, cortar, sugar, aplicar substâncias ou gelo no local.',
      '2. ABCDE; monitorização; acesso venoso em membro não afetado; hidratação (diurese ≥ 1–2 mL/kg/h); analgesia (dipirona/paracetamol; opioides em dor intensa; evitar AINE e injeções IM pelo risco de sangramento).',
      '3. Identificar o gênero (foto/descrição, quadro clínico) e classificar a gravidade. Colher TC (Lee-White), hemograma, creatinina, ureia, eletrólitos, CPK, urina 1, TP/TTPa se disponíveis.',
      '4. Soroterapia específica IV o mais rápido possível, com dose definida pela GRAVIDADE e não pelo peso (mesma dose para crianças e adultos): diluir as ampolas em SF 0,9% ou SG 5% (1:2 a 1:5; volumes menores em crianças pequenas) e infundir em 20–60 min. Não é necessário teste de sensibilidade.',
      '5. Antes e durante a infusão, ter adrenalina, anti-histamínico, corticoide e material de via aérea prontos. Reação precoce (urticária, broncoespasmo, hipotensão): interromper, tratar como anafilaxia (adrenalina IM) e reiniciar mais lentamente após controle. Pré-medicação com anti-H1/corticoide não é recomendada de rotina pelo MS, mas pode ser usada conforme protocolo local.',
      '6. Reavaliar TC 12–24 h após o soro: se persistir incoagulável, dose adicional (botrópico: 2 ampolas; crotálico: conforme protocolo).',
      '7. Cuidados locais: limpeza, membro elevado, drenagem de bolhas quando indicado, avaliar síndrome compartimental (dor desproporcional, parestesia, pulso reduzido – cirurgia), desbridamento de necrose após 48–72 h; antibiótico apenas se infecção secundária (abscesso, celulite: cobrir Gram-negativos e anaeróbios).',
      '8. Crotálico: hidratação vigorosa para prevenir IRA por mioglobinúria (diurese ≥ 2 mL/kg/h), considerar diurético osmótico/alcalinização conforme protocolo; monitorar CPK, creatinina e potássio.',
      '9. Elapídico: vigilância respiratória contínua; anticolinesterásico (neostigmina precedida de atropina) pode reverter o bloqueio neuromuscular (Micrurus com neurotoxina pós-sináptica); intubação/VM se insuficiência respiratória.',
      '10. Profilaxia antitetânica conforme situação vacinal; notificação compulsória (SINAN); alta após TC normal, ausência de sangramento, edema em regressão e função renal preservada; retorno para reavaliação (necrose tardia, doença do soro em 5–24 dias).'
    ],
    doses: [
      { nome: 'Soro antibotrópico (SAB) ou antibotrópico-laquético (SABL)', indicacao: 'Acidente botrópico – dose por gravidade', mgKg: null, doseFixa: null, unidade: 'ampolas', doseMax: 12, apresentacao: 'Ampola 10 mL; diluir em SF 0,9% ou SG 5% (1:2 a 1:5)', concentracaoMgMl: null, via: 'IV em 20–60 min', repeticao: 'dose adicional de 2 ampolas se TC persistir incoagulável após 12–24 h', obs: 'Dose definida pela gravidade, igual para crianças e adultos. Leve: 2–4 ampolas; Moderado: 4–8 ampolas; Grave: 12 ampolas.', porGravidade: [ { gravidade: 'Leve', ampolasMin: 2, ampolasMax: 4 }, { gravidade: 'Moderado', ampolasMin: 4, ampolasMax: 8 }, { gravidade: 'Grave', ampolasMin: 12, ampolasMax: 12 } ] },
      { nome: 'Soro anticrotálico (SAC) ou antibotrópico-crotálico (SABC)', indicacao: 'Acidente crotálico – dose por gravidade', mgKg: null, doseFixa: null, unidade: 'ampolas', doseMax: 20, apresentacao: 'Ampola 10 mL; diluir em SF 0,9% ou SG 5%', concentracaoMgMl: null, via: 'IV em 20–60 min', repeticao: 'dose adicional conforme evolução do TC e do quadro neuromuscular', obs: 'Dose definida pela gravidade, igual para crianças e adultos. Leve: 5 ampolas; Moderado: 10 ampolas; Grave: 20 ampolas.', porGravidade: [ { gravidade: 'Leve', ampolasMin: 5, ampolasMax: 5 }, { gravidade: 'Moderado', ampolasMin: 10, ampolasMax: 10 }, { gravidade: 'Grave', ampolasMin: 20, ampolasMax: 20 } ] },
      { nome: 'Soro antilaquético (SAL) ou antibotrópico-laquético (SABL)', indicacao: 'Acidente laquético – dose por gravidade', mgKg: null, doseFixa: null, unidade: 'ampolas', doseMax: 20, apresentacao: 'Ampola 10 mL; diluir em SF 0,9% ou SG 5%', concentracaoMgMl: null, via: 'IV em 20–60 min', repeticao: 'dose adicional conforme TC e evolução', obs: 'Dose definida pela gravidade, igual para crianças e adultos. Moderado: 10 ampolas; Grave: 20 ampolas. Não há classificação leve.', porGravidade: [ { gravidade: 'Moderado', ampolasMin: 10, ampolasMax: 10 }, { gravidade: 'Grave', ampolasMin: 20, ampolasMax: 20 } ] },
      { nome: 'Soro antielapídico (SAE)', indicacao: 'Acidente elapídico (coral verdadeira) – todos os casos são graves', mgKg: null, doseFixa: 10, unidade: 'ampolas', doseMax: 10, apresentacao: 'Ampola 10 mL; diluir em SF 0,9% ou SG 5%', concentracaoMgMl: null, via: 'IV em 20–60 min', repeticao: 'dose única', obs: '10 ampolas, igual para crianças e adultos, mesmo em casos sem sintomas neurológicos iniciais.', porGravidade: [ { gravidade: 'Grave', ampolasMin: 10, ampolasMax: 10 } ] },
      { nome: 'Dipirona', indicacao: 'Analgesia', mgKg: 15, unidade: 'mg', doseMax: 1000, apresentacao: 'Ampola 500 mg/mL; solução oral 500 mg/mL (1 gota = 25 mg)', concentracaoMgMl: 500, via: 'IV lento diluído ou VO (evitar IM)', repeticao: 'a cada 6 h', obs: '10–15 mg/kg; > 3 meses. Evitar AINE (sangramento e nefrotoxicidade).' },
      { nome: 'Paracetamol', indicacao: 'Analgesia (alternativa)', mgKg: 15, unidade: 'mg', doseMax: 750, apresentacao: 'Solução oral 200 mg/mL (1 gota = 10 mg) ou 100 mg/mL', concentracaoMgMl: 200, via: 'VO', repeticao: 'a cada 6 h (máx. 75 mg/kg/dia)', obs: '10–15 mg/kg/dose.' },
      { nome: 'Adrenalina IM (reação ao soro)', indicacao: 'Reação anafilática/anafilactoide à soroterapia', mgKg: 0.01, unidade: 'mg', doseMax: 0.5, apresentacao: 'Ampola 1 mg/mL', concentracaoMgMl: 1, via: 'IM (vasto lateral)', repeticao: 'a cada 5–15 min se necessário', obs: 'Interromper a infusão do soro, tratar e reiniciar mais lentamente após estabilização.' },
      { nome: 'Prometazina ou difenidramina (reação ao soro)', indicacao: 'Reação urticariforme leve à soroterapia / pré-medicação conforme protocolo local', mgKg: 1, unidade: 'mg', doseMax: 50, apresentacao: 'Difenidramina 50 mg/mL; prometazina 25 mg/mL (> 2 anos)', concentracaoMgMl: 50, via: 'IV lento ou IM', repeticao: 'a cada 6–8 h se necessário', obs: 'Difenidramina 1 mg/kg (máx. 50 mg); prometazina 0,5 mg/kg (máx. 25 mg) somente > 2 anos.' },
      { nome: 'Hidrocortisona (reação ao soro)', indicacao: 'Reação à soroterapia / pré-medicação conforme protocolo local', mgKg: 10, unidade: 'mg', doseMax: 500, apresentacao: 'Frasco-ampola 100 mg / 500 mg', concentracaoMgMl: null, via: 'IV', repeticao: 'a cada 6 h se necessário', obs: 'Adjuvante; a adrenalina IM é o tratamento da anafilaxia.' },
      { nome: 'Neostigmina (elapídico)', indicacao: 'Bloqueio neuromuscular no acidente elapídico', mgKg: 0.05, unidade: 'mg', doseMax: 2.5, apresentacao: 'Ampola 0,5 mg/mL', concentracaoMgMl: 0.5, via: 'IV lento', repeticao: 'repetir a cada 30 min conforme resposta (teste de neostigmina)', obs: 'Administrar atropina 0,02–0,05 mg/kg IV antes (prevenir efeitos muscarínicos). Confirmar conforme protocolo do MS/CIATox.', verificar: true },
      { nome: 'Atropina (pré-neostigmina)', indicacao: 'Antes da neostigmina no acidente elapídico', mgKg: 0.02, unidade: 'mg', doseMax: 1, apresentacao: 'Ampola 0,25 ou 0,5 mg/mL', concentracaoMgMl: 0.5, via: 'IV', repeticao: 'antes de cada dose de neostigmina', obs: 'Dose mínima 0,1 mg. Confirmar conforme protocolo.', verificar: true }
    ],
    materiais: [
      'Soros antiofídicos (SAB/SABL, SAC/SABC, SAL, SAE) refrigerados a 2–8 °C, SF/SG para diluição, equipo e bomba de infusão.',
      'Kit de anafilaxia (adrenalina, anti-histamínico, corticoide), O2, material de via aérea e ventilação (elapídico/laquético).',
      'Tubo de vidro para tempo de coagulação (Lee-White) e material de coleta laboratorial; fita métrica para medir o edema; máquina fotográfica/celular para documentar a serpente.',
      'Ficha de notificação (SINAN) e contato com CIATox/CIT para orientação (0800 722 6001).'
    ],
    criteriosUTI: [
      'Acidente grave com choque, sangramento importante, insuficiência renal aguda ou coagulopatia persistente.',
      'Acidente elapídico ou crotálico com sinais de insuficiência respiratória (paralisia bulbar/diafragmática).',
      'Síndrome compartimental com necessidade cirúrgica; rabdomiólise grave (CPK muito elevada, hiperpotassemia).',
      'Reação anafilática grave ao soro; crianças pequenas com acidente moderado/grave em serviço sem retaguarda.'
    ],
    fontes: [
      { nome: 'Ministério da Saúde/FUNASA – Manual de Diagnóstico e Tratamento de Acidentes por Animais Peçonhentos, 2ª ed.', ano: 2001 },
      { nome: 'Ministério da Saúde – Guia de Vigilância em Saúde, 6ª ed. (Acidentes por animais peçonhentos)', ano: 2023 },
      { nome: 'Instituto Butantan – Protocolos de soroterapia', ano: 2022 },
      { nome: 'SBP – Documento Científico: Acidentes por animais peçonhentos na infância', ano: 2019 }
    ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'escorpionismo', nome: 'Escorpionismo', cor: 'laranja', icone: '🦂',
    reconhecimento: [
      'Dor local imediata e intensa (queimação/ferroada), com ou sem edema/eritema discreto, parestesia, sudorese e piloereção local; ponto de inoculação nem sempre visível.',
      'Leve: apenas dor local e parestesia, sem manifestações sistêmicas (observar 4–6 h; crianças < 7 anos: 6–12 h).',
      'Moderado: dor local + manifestações sistêmicas discretas – sudorese, náuseas, vômitos ocasionais, taquicardia, taquipneia, agitação, hipertensão leve, sialorreia.',
      'Grave: vômitos profusos e incoercíveis, sudorese profusa, sialorreia intensa, agitação/prostração, bradicardia ou taquicardia, hipertensão ou hipotensão, arritmias, insuficiência cardíaca, edema agudo de pulmão, choque, convulsões, coma. Crianças pequenas (< 7 anos) evoluem mais rapidamente para gravidade (Tityus serrulatus).',
      'Na Amazônia (Tityus obscurus, Pará/Amazonas): quadro neurológico atípico – ataxia, mioclonias, disartria, tremores, disfagia, hipotonia, alucinações.'
    ],
    passos: [
      '1. Avaliar e classificar a gravidade na chegada e reavaliar frequentemente (o quadro sistêmico pode surgir em 1–3 h). Monitorizar FC, PA, FR, SpO2, temperatura; ECG e RX de tórax nos casos moderados/graves; glicemia, eletrólitos, CPK, amilase.',
      '2. Analgesia imediata: infiltração local com lidocaína 2% sem vasoconstritor (repetir até 3 vezes com intervalo de 30–60 min) e/ou dipirona; compressa morna local; opioides se dor refratária. Não usar torniquete nem incisões.',
      '3. Casos leves: tratamento sintomático e observação de 4–6 h (6–12 h em < 7 anos ou área de Tityus serrulatus/obscurus); alta com orientações e retorno se sintomas sistêmicos.',
      '4. Casos moderados: soro antiescorpiônico (SAEsc) ou antiaracnídico (SAAr) 2–3 ampolas IV; internação e observação.',
      '5. Casos graves: SAEsc/SAAr 4–6 ampolas IV o mais precocemente possível (idealmente nas primeiras 2 h), UTI, suporte hemodinâmico e respiratório. Diluir em SF, infundir em 20–30 min; adrenalina e material de anafilaxia à mão.',
      '6. Suporte: hidratação cautelosa (risco de edema pulmonar), antieméticos (ondansetrona), atropina apenas em bradicardia sintomática, O2 e VNI/VM no edema pulmonar, inotrópico (dobutamina) na disfunção miocárdica, controle da hipertensão apenas se grave e persistente (nifedipino/captopril com cautela).',
      '7. Evitar: atropina profilática, morfina em excesso, corticoide e anti-histamínico de rotina (sem benefício sobre o veneno).',
      '8. Profilaxia antitetânica não é necessária. Notificação compulsória (SINAN). Orientar prevenção domiciliar (vedação, calçados, telas).'
    ],
    doses: [
      { nome: 'Soro antiescorpiônico (SAEsc) ou antiaracnídico (SAAr)', indicacao: 'Escorpionismo – dose por gravidade', mgKg: null, doseFixa: null, unidade: 'ampolas', doseMax: 6, apresentacao: 'Ampola 5 mL; diluir em SF 0,9% (1:2 a 1:5)', concentracaoMgMl: null, via: 'IV em 20–30 min', repeticao: 'reavaliar em 1–2 h; dose adicional (2–3 ampolas) se progressão', obs: 'Dose definida pela gravidade, igual para crianças e adultos. Leve: não indicado (apenas analgesia); Moderado: 2–3 ampolas; Grave: 4–6 ampolas.', porGravidade: [ { gravidade: 'Leve', ampolasMin: 0, ampolasMax: 0 }, { gravidade: 'Moderado', ampolasMin: 2, ampolasMax: 3 }, { gravidade: 'Grave', ampolasMin: 4, ampolasMax: 6 } ] },
      { nome: 'Lidocaína 2% sem vasoconstritor', indicacao: 'Infiltração local para dor', mgKg: null, doseFixa: 2, unidade: 'mL', doseMax: 4, apresentacao: 'Lidocaína 2% (20 mg/mL) sem vasoconstritor, agulha fina', concentracaoMgMl: 20, via: 'infiltração local/bloqueio troncular', repeticao: 'até 3 vezes com intervalo de 30–60 min', obs: '1–2 mL em crianças (2–4 mL em adultos). Não exceder 4,5 mg/kg de lidocaína por aplicação (0,2 mL/kg de lidocaína 2%). Aspirar antes de injetar.' },
      { nome: 'Dipirona', indicacao: 'Analgesia sistêmica', mgKg: 15, unidade: 'mg', doseMax: 1000, apresentacao: 'Ampola 500 mg/mL; solução oral 500 mg/mL', concentracaoMgMl: 500, via: 'IV lento diluído / VO', repeticao: 'a cada 6 h', obs: '10–15 mg/kg; > 3 meses.' },
      { nome: 'Paracetamol', indicacao: 'Analgesia (alternativa)', mgKg: 15, unidade: 'mg', doseMax: 750, apresentacao: 'Solução oral 200 mg/mL (1 gota = 10 mg)', concentracaoMgMl: 200, via: 'VO', repeticao: 'a cada 6 h', obs: '10–15 mg/kg/dose.' },
      { nome: 'Ondansetrona', indicacao: 'Vômitos', mgKg: 0.15, unidade: 'mg', doseMax: 8, apresentacao: 'Ampola 2 mg/mL', concentracaoMgMl: 2, via: 'IV lento', repeticao: 'a cada 8 h', obs: '0,15 mg/kg.' },
      { nome: 'Atropina', indicacao: 'Bradicardia sintomática (não usar profilaticamente)', mgKg: 0.02, unidade: 'mg', doseMax: 0.5, apresentacao: 'Ampola 0,25 ou 0,5 mg/mL', concentracaoMgMl: 0.5, via: 'IV', repeticao: 'pode repetir 1 vez', obs: 'Dose mínima 0,1 mg.' },
      { nome: 'Adrenalina IM (reação ao soro)', indicacao: 'Reação anafilática ao soro', mgKg: 0.01, unidade: 'mg', doseMax: 0.5, apresentacao: 'Ampola 1 mg/mL', concentracaoMgMl: 1, via: 'IM', repeticao: 'a cada 5–15 min', obs: 'Interromper a infusão do soro e reiniciar após controle.' },
      { nome: 'Dobutamina infusão contínua', indicacao: 'Disfunção miocárdica / edema pulmonar por veneno escorpiônico', mgKg: null, unidade: 'mcg/kg/min', doseMax: null, apresentacao: 'Ampola 250 mg/20 mL', concentracaoMgMl: null, via: 'IV contínua (UTI)', repeticao: 'titular', obs: '5–15 mcg/kg/min conforme ecocardiograma/perfusão.', informativo: true, faixaMin: 5, faixaMax: 15, doseFixa: null }
    ],
    materiais: [
      'Soro antiescorpiônico/antiaracnídico refrigerado; SF para diluição; kit de anafilaxia.',
      'Lidocaína 2% sem vasoconstritor, seringas e agulhas finas; compressas mornas.',
      'Monitor, ECG, oxímetro, RX de tórax; O2, VNI/ventilador e dobutamina para casos graves.',
      'Ficha de notificação (SINAN); contato com CIATox (0800 722 6001).'
    ],
    criteriosUTI: [
      'Todo caso grave (vômitos incoercíveis, sudorese profusa, alteração hemodinâmica, arritmia, edema pulmonar, choque, convulsão, coma).',
      'Crianças < 7 anos com caso moderado em progressão, especialmente em área de Tityus serrulatus ou T. obscurus.',
      'Necessidade de vasoativo, inotrópico, ventilação ou monitorização invasiva.'
    ],
    fontes: [
      { nome: 'Ministério da Saúde/FUNASA – Manual de Diagnóstico e Tratamento de Acidentes por Animais Peçonhentos, 2ª ed.', ano: 2001 },
      { nome: 'Ministério da Saúde – Guia de Vigilância em Saúde, 6ª ed. (Escorpionismo)', ano: 2023 },
      { nome: 'Ministério da Saúde – Manual de Controle de Escorpiões', ano: 2009 },
      { nome: 'SBP – Documento Científico: Acidentes por animais peçonhentos na infância', ano: 2019 }
    ],
    atualizadoEm: '2026-09'
  }
];
