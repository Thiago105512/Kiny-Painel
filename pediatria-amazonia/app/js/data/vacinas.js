window.PED = window.PED || {}; PED.data = PED.data || {};
// Calendário Nacional de Vacinação da Criança e do Adolescente (PNI / Ministério da Saúde, 2024–2025), 0–14 anos.
// Notas técnicas do PNI mudam com frequência (produtos, faixas etárias, campanhas): confirmar sempre a Instrução Normativa vigente.
// Esquema geral: BCG e HepB ao nascer; 2 m: penta + VIP + pneumo 10 + rotavírus; 3 m: meningo C; 4 m: penta + VIP + pneumo 10 + rotavírus;
// 5 m: meningo C; 6 m: penta + VIP (+ influenza e covid-19 anuais/sazonais); 9 m: febre amarela; 12 m: tríplice viral + pneumo 10 (reforço) + meningo C (reforço);
// 15 m: DTP (1º reforço) + VIP (reforço) + hepatite A + tetra viral (SCR + varicela); 4 anos: DTP (2º reforço) + varicela (2ª dose) + febre amarela (reforço);
// 9–14 anos: HPV dose única; 11–14 anos: meningo ACWY; 10–14 anos: dengue (municípios prioritários); ≥ 7 anos: dT a cada 10 anos (ou dTpa em situações especiais).

PED.data.vacinas = [
  {
    id: 'bcg', nome: 'BCG (bacilo de Calmette-Guérin)', tipo: 'Bactéria viva atenuada (Mycobacterium bovis)',
    doses: [ { idadeMeses: 0, rotulo: 'Ao nascer (ainda na maternidade; se não realizada, o mais cedo possível até 4 anos 11 meses e 29 dias)', dose: 'Dose única, 0,1 mL' } ],
    via: 'ID (intradérmica), inserção inferior do deltoide direito',
    protege: 'Formas graves de tuberculose (miliar e meníngea) em crianças pequenas; proteção parcial contra hanseníase.',
    situacoesEspeciais: 'Prematuros: vacinar quando atingirem 2 kg (e clinicamente estáveis). RN de mãe com HIV: vacinar ao nascer (assintomático); crianças com HIV: apenas se assintomáticas e sem imunodepressão, até 4 anos 11 meses e 29 dias. Contraindicações: imunodeficiências congênitas ou adquiridas, imunossupressão (quimioterapia, corticoide em dose imunossupressora, biológicos), RN de mãe que usou biológicos imunossupressores na gestação (adiar 6 meses ou conforme CRIE), peso < 2 kg, lesões de pele extensas no local. Contatos domiciliares de hanseníase: dose de BCG conforme cicatriz vacinal (sem cicatriz ou 1 cicatriz: 1 dose; após 12 meses de idade). Não é mais recomendada a revacinação por ausência de cicatriz (Nota Informativa MS 2019). Reações esperadas: nódulo, pústula, úlcera e cicatriz em 6–12 semanas; linfadenopatia axilar > 3 cm ou supurada e abscesso: notificar (isoniazida conforme protocolo).',
    atrasoEsquema: 'Aplicar em qualquer idade até 4 anos 11 meses e 29 dias em não vacinados; após 5 anos não é recomendada de rotina (exceto contatos de hanseníase e situações específicas). Não há intervalo mínimo com outras vacinas (pode ser simultânea a qualquer vacina).',
    contraindicacoes: ['Imunodeficiência congênita ou adquirida (incluindo criança com HIV sintomática)', 'Imunossupressão medicamentosa', 'Peso < 2.000 g', 'Dermatose extensa no local de aplicação'],
    fontes: [ { nome: 'Ministério da Saúde – Calendário Nacional de Vacinação (PNI)', ano: 2025 }, { nome: 'Ministério da Saúde – Instrução Normativa do Calendário Nacional de Vacinação', ano: 2024 }, { nome: 'Ministério da Saúde – Manual dos Centros de Referência para Imunobiológicos Especiais (CRIE), 5ª ed.', ano: 2019 }, { nome: 'SBP – Calendário de Vacinação da Criança', ano: 2024 } ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'hepatite_b', nome: 'Hepatite B (monovalente, recombinante)', tipo: 'Inativada (antígeno de superfície recombinante)',
    doses: [
      { idadeMeses: 0, rotulo: 'Ao nascer – idealmente nas primeiras 12–24 h de vida (até 30 dias)', dose: '1ª dose monovalente, 0,5 mL' },
      { idadeMeses: 2, rotulo: '2 meses (na pentavalente)', dose: 'Ver pentavalente' },
      { idadeMeses: 4, rotulo: '4 meses (na pentavalente)', dose: 'Ver pentavalente' },
      { idadeMeses: 6, rotulo: '6 meses (na pentavalente)', dose: 'Ver pentavalente' }
    ],
    via: 'IM (vasto lateral da coxa em < 2 anos; deltoide em maiores)',
    protege: 'Hepatite B aguda e crônica (cirrose, carcinoma hepatocelular), incluindo transmissão vertical – relevante pela alta endemicidade histórica na Amazônia ocidental.',
    situacoesEspeciais: 'RN de mãe HBsAg positiva: vacina + imunoglobulina anti-hepatite B (IGHAHB 0,5 mL IM) nas primeiras 12 h de vida (até 7 dias), em locais diferentes; sorologia (anti-HBs e HBsAg) aos 9–12 meses. Prematuros < 33 semanas ou < 2.000 g: dose ao nascer + 3 doses de pentavalente (2, 4, 6 meses) – total 4 doses; a dose ao nascer não é contabilizada como parte do esquema se peso < 2 kg. Imunodeprimidos, renais crônicos em diálise, transplantados: esquemas com dose dobrada e 4 doses (0, 1, 2, 6 meses) no CRIE; verificar anti-HBs após o esquema (≥ 10 UI/mL). Crianças ≥ 7 anos e adolescentes nunca vacinados: 3 doses de monovalente (0, 1 e 6 meses).',
    atrasoEsquema: 'Não reiniciar esquemas incompletos: completar as doses faltantes respeitando intervalo mínimo de 30 dias entre 1ª e 2ª e 60 dias entre 2ª e 3ª (3ª dose com pelo menos 6 meses da 1ª). Se a dose ao nascer não foi feita até 30 dias, iniciar diretamente com pentavalente aos 2 meses (3 doses). Crianças < 7 anos com esquema incompleto: completar com pentavalente; ≥ 7 anos: monovalente.',
    contraindicacoes: ['Anafilaxia a dose anterior ou a componente da vacina (levedura)'],
    fontes: [ { nome: 'Ministério da Saúde – Calendário Nacional de Vacinação (PNI)', ano: 2025 }, { nome: 'Ministério da Saúde – Instrução Normativa do Calendário Nacional de Vacinação', ano: 2024 }, { nome: 'Ministério da Saúde – Manual dos CRIE, 5ª ed.', ano: 2019 }, { nome: 'Ministério da Saúde – PCDT para Hepatite B e Coinfecções', ano: 2017 } ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'pentavalente', nome: 'Pentavalente (DTP + Hib + Hepatite B)', tipo: 'Inativada (toxoides diftérico e tetânico, células inteiras de pertussis, polissacarídeo conjugado de Hib, HBsAg recombinante)',
    doses: [
      { idadeMeses: 2, rotulo: '2 meses', dose: '1ª dose, 0,5 mL' },
      { idadeMeses: 4, rotulo: '4 meses', dose: '2ª dose, 0,5 mL' },
      { idadeMeses: 6, rotulo: '6 meses', dose: '3ª dose, 0,5 mL' }
    ],
    via: 'IM (vasto lateral da coxa)',
    protege: 'Difteria, tétano, coqueluche, doenças invasivas por Haemophilus influenzae tipo b (meningite, epiglotite, pneumonia) e hepatite B.',
    situacoesEspeciais: 'Prematuros e RN de baixo peso: vacinar na idade cronológica (2 meses), sem ajuste pela idade gestacional; internados podem ser vacinados na unidade neonatal. Eventos adversos graves à DTP (convulsão nas 72 h, episódio hipotônico-hiporresponsivo em 48 h, febre ≥ 39,5 °C ou choro persistente > 3 h): continuar com DTPa (acelular) pelo CRIE; encefalopatia nos 7 dias após a dose: contraindicação para o componente pertussis (usar DT + Hib + HepB). Crianças com HIV, asplenia, imunodeficiência ou transplante: mesmo esquema; Hib adicional após 12 meses conforme CRIE (dose de reforço de Hib aos 15 meses para essas condições). Idade máxima para pentavalente/DTP: 6 anos 11 meses e 29 dias.',
    atrasoEsquema: 'Nunca reiniciar: completar as 3 doses com intervalo mínimo de 30 dias (recomendado 60 dias) entre elas, até 6 anos 11 meses e 29 dias. Crianças de 12 meses a 4 anos não vacinadas com Hib: pentavalente conforme doses faltantes (Hib: 1 dose é suficiente a partir de 12–15 meses). Crianças ≥ 7 anos não vacinadas: dT (3 doses: 0, 2 e 4–8 meses) + hepatite B monovalente (3 doses) – Hib não é indicada após 5 anos exceto condições especiais (CRIE); adolescentes podem receber dTpa como uma das doses quando disponível.',
    contraindicacoes: ['Encefalopatia nos 7 dias após dose anterior de vacina com componente pertussis', 'Anafilaxia a dose anterior ou componente', 'Idade ≥ 7 anos (usar dT/dTpa)'],
    fontes: [ { nome: 'Ministério da Saúde – Calendário Nacional de Vacinação (PNI)', ano: 2025 }, { nome: 'Ministério da Saúde – Instrução Normativa do Calendário Nacional de Vacinação', ano: 2024 }, { nome: 'Ministério da Saúde – Manual de Vigilância Epidemiológica de Eventos Adversos Pós-Vacinação, 4ª ed.', ano: 2020 }, { nome: 'Ministério da Saúde – Manual dos CRIE, 5ª ed.', ano: 2019 } ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'vip', nome: 'VIP (poliomielite inativada, injetável)', tipo: 'Inativada (poliovírus 1, 2 e 3)',
    doses: [
      { idadeMeses: 2, rotulo: '2 meses', dose: '1ª dose, 0,5 mL' },
      { idadeMeses: 4, rotulo: '4 meses', dose: '2ª dose, 0,5 mL' },
      { idadeMeses: 6, rotulo: '6 meses', dose: '3ª dose, 0,5 mL (desde 2024 a 3ª dose é VIP, substituindo a VOP)' },
      { idadeMeses: 15, rotulo: '15 meses (reforço)', dose: 'Reforço, 0,5 mL (VIP; introduzido em 2024 em substituição ao reforço com VOP)' }
    ],
    via: 'IM (vasto lateral da coxa em < 2 anos; deltoide em maiores)',
    protege: 'Poliomielite (paralisia flácida aguda) pelos poliovírus 1, 2 e 3. O Brasil é livre de poliomielite desde 1989/1994, mas há risco de reintrodução com coberturas baixas – sobretudo em áreas de difícil acesso na Amazônia.',
    situacoesEspeciais: 'Desde novembro de 2024 o esquema é exclusivamente com VIP: 3 doses (2, 4 e 6 meses) + 1 reforço aos 15 meses; o reforço aos 4 anos foi removido (esquema completo com 4 doses de VIP). Crianças imunodeprimidas e contatos domiciliares de imunodeprimidos sempre recebem VIP (nunca VOP). Prematuros: idade cronológica. Crianças que iniciaram esquema com VOP: completar com VIP.',
    atrasoEsquema: 'Completar as doses faltantes sem reiniciar, com intervalo mínimo de 30 dias entre as 3 primeiras e reforço com ≥ 6 meses após a 3ª dose (a partir de 12 meses). Crianças de 1 a 4 anos sem nenhuma dose: 3 doses de VIP com intervalo de 30–60 dias + reforço 6 meses depois; crianças ≥ 5 anos não vacinadas: 3 doses de VIP (0, 1–2, 6–12 meses); todas até 14 anos devem ter esquema completo. Verificar Instrução Normativa vigente, pois o esquema foi alterado em 2024.',
    contraindicacoes: ['Anafilaxia a dose anterior ou componentes (neomicina, estreptomicina, polimixina B)'],
    fontes: [ { nome: 'Ministério da Saúde – Nota Técnica: substituição da VOP pela VIP no Calendário Nacional', ano: 2024 }, { nome: 'Ministério da Saúde – Calendário Nacional de Vacinação (PNI)', ano: 2025 }, { nome: 'Ministério da Saúde – Instrução Normativa do Calendário Nacional de Vacinação', ano: 2024 }, { nome: 'SBP – Calendário de Vacinação da Criança', ano: 2024 } ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'vop', nome: 'VOP (poliomielite oral bivalente – descontinuada na rotina em 2024)', tipo: 'Vírus vivos atenuados (poliovírus 1 e 3 – bivalente)',
    descontinuada: true,
    doses: [
      { idadeMeses: 15, rotulo: 'Esquema anterior (até 2024): 1º reforço aos 15 meses', dose: 'Substituída pelo reforço de VIP aos 15 meses' },
      { idadeMeses: 48, rotulo: 'Esquema anterior (até 2024): 2º reforço aos 4 anos', dose: 'Removido do calendário (não é mais aplicado)' }
    ],
    via: 'VO (2 gotas)',
    protege: 'Poliomielite (imunidade intestinal e de mucosa; era usada nos reforços e em campanhas de bloqueio).',
    situacoesEspeciais: 'Em novembro de 2024 o Brasil retirou a VOP da rotina, adotando esquema exclusivo com VIP (3 doses + reforço aos 15 meses), eliminando o risco de poliomielite associada ao vírus vacinal (VAPP) e de poliovírus derivado da vacina (cVDPV). A VOP permanece apenas como estratégia de resposta a surtos/bloqueio, a critério do MS. Crianças que já receberam doses de VOP têm o esquema considerado válido e completam com VIP. Nunca administrar VOP em imunodeprimidos ou contatos de imunodeprimidos, nem em crianças hospitalizadas.',
    atrasoEsquema: 'Não se aplica: doses faltantes de poliomielite devem ser completadas com VIP (ver vip). Doses anteriores de VOP contam para o esquema.',
    contraindicacoes: ['Uso de rotina descontinuado', 'Imunodeficiência ou contato domiciliar com imunodeprimido', 'Hospitalização', 'Vômito/diarreia grave no momento (adiar)'],
    fontes: [ { nome: 'Ministério da Saúde – Nota Técnica: substituição da VOP pela VIP no Calendário Nacional', ano: 2024 }, { nome: 'Ministério da Saúde – Calendário Nacional de Vacinação (PNI)', ano: 2025 }, { nome: 'OMS – Polio Eradication Strategy 2022–2026', ano: 2021 } ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'pneumo10', nome: 'Pneumocócica 10-valente conjugada (VPC10)', tipo: 'Inativada (polissacarídeos de 10 sorotipos conjugados a proteínas)',
    doses: [
      { idadeMeses: 2, rotulo: '2 meses', dose: '1ª dose, 0,5 mL' },
      { idadeMeses: 4, rotulo: '4 meses', dose: '2ª dose, 0,5 mL' },
      { idadeMeses: 12, rotulo: '12 meses (reforço; pode ser feito até 4 anos 11 meses e 29 dias)', dose: 'Reforço, 0,5 mL' }
    ],
    via: 'IM (vasto lateral da coxa em < 2 anos; deltoide em maiores)',
    protege: 'Doença pneumocócica invasiva (meningite, bacteremia, pneumonia bacterêmica), pneumonia e otite média aguda pelos sorotipos vacinais (1, 4, 5, 6B, 7F, 9V, 14, 18C, 19F, 23F) e proteção cruzada parcial contra 6A/19A.',
    situacoesEspeciais: 'Esquema 2 + 1 desde 2016. Crianças de 12 meses a 4 anos 11 meses e 29 dias nunca vacinadas: dose única. Prematuros: idade cronológica (esquema 3 + 1 pode ser indicado em < 32 semanas/< 1.500 g conforme CRIE/SBP). Condições de risco (HIV, asplenia anatômica ou funcional/anemia falciforme, imunodeficiências, transplante, doença renal crônica/síndrome nefrótica, cardiopatia ou pneumopatia crônica, diabetes, fístula liquórica, implante coclear, neoplasias): VPC13 no CRIE (esquema 3 + 1 em lactentes; dose única/complementar em maiores, até 5 anos ou conforme condição) e VPP23 a partir de 2 anos (1 dose ≥ 6–8 semanas após a última conjugada, com reforço em 5 anos). Em 2024 o MS incorporou a VPC13 também para crianças e adolescentes de 5–18 anos com condições de risco (CRIE) – confirmar Nota Técnica vigente.',
    atrasoEsquema: 'Não reiniciar. < 12 meses: completar 2 doses com intervalo mínimo de 30 dias + reforço aos 12 meses (≥ 60 dias após a 2ª). Iniciada entre 7 e 11 meses: 2 doses com 30–60 dias de intervalo + reforço aos 12 meses. Entre 12 meses e 4 anos 11 meses e 29 dias: dose única (independentemente de doses anteriores, se nenhuma foi feita após 12 meses). Não indicada de rotina a partir de 5 anos (exceto CRIE).',
    contraindicacoes: ['Anafilaxia a dose anterior ou componente'],
    fontes: [ { nome: 'Ministério da Saúde – Calendário Nacional de Vacinação (PNI)', ano: 2025 }, { nome: 'Ministério da Saúde – Instrução Normativa do Calendário Nacional de Vacinação', ano: 2024 }, { nome: 'Ministério da Saúde – Manual dos CRIE, 5ª ed.', ano: 2019 }, { nome: 'SBP – Calendário de Vacinação da Criança', ano: 2024 } ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'rotavirus', nome: 'Rotavírus humano monovalente (VRH – G1P[8])', tipo: 'Vírus vivo atenuado (oral)',
    doses: [
      { idadeMeses: 2, rotulo: '2 meses (1ª dose: de 1 mês e 15 dias até 3 meses e 15 dias)', dose: '1ª dose, 1,5 mL VO' },
      { idadeMeses: 4, rotulo: '4 meses (2ª dose: de 3 meses e 15 dias até 7 meses e 29 dias)', dose: '2ª dose, 1,5 mL VO' }
    ],
    via: 'VO',
    protege: 'Gastroenterite grave por rotavírus (desidratação, hospitalização e óbito por diarreia) – impacto expressivo na Região Norte.',
    situacoesEspeciais: 'Respeitar rigorosamente as janelas de idade (risco de invaginação intestinal em idades maiores): 1ª dose entre 1 mês e 15 dias e 3 meses e 15 dias; 2ª dose entre 3 meses e 15 dias e 7 meses e 29 dias, com intervalo mínimo de 30 dias. Se a criança regurgitar, cuspir ou vomitar após a dose, não repetir. Prematuros: idade cronológica, após alta hospitalar (não vacinar internados). Crianças com HIV expostas/assintomáticas: podem receber; imunodeficiência grave (SCID): contraindicada. Contatos de imunodeprimidos: podem receber (orientar higiene das fraldas por 7 dias).',
    atrasoEsquema: 'Não há resgate fora das janelas etárias: se a 1ª dose não foi feita até 3 meses e 15 dias, a criança não deve mais ser vacinada; se a 2ª dose não foi feita até 7 meses e 29 dias, o esquema fica incompleto (1 dose já confere proteção parcial). Intervalo mínimo entre doses: 30 dias.',
    contraindicacoes: ['Imunodeficiência grave (SCID)', 'História de invaginação intestinal', 'Malformação congênita do trato digestivo não corrigida', 'Anafilaxia a dose anterior', 'Fora das janelas de idade (1ª dose > 3 m 15 d; 2ª dose > 7 m 29 d)'],
    fontes: [ { nome: 'Ministério da Saúde – Calendário Nacional de Vacinação (PNI)', ano: 2025 }, { nome: 'Ministério da Saúde – Instrução Normativa do Calendário Nacional de Vacinação', ano: 2024 }, { nome: 'Ministério da Saúde – Manual de Vigilância Epidemiológica de Eventos Adversos Pós-Vacinação, 4ª ed.', ano: 2020 } ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'meningo_c', nome: 'Meningocócica C conjugada (MenC)', tipo: 'Inativada (polissacarídeo do sorogrupo C conjugado a proteína)',
    doses: [
      { idadeMeses: 3, rotulo: '3 meses', dose: '1ª dose, 0,5 mL' },
      { idadeMeses: 5, rotulo: '5 meses', dose: '2ª dose, 0,5 mL' },
      { idadeMeses: 12, rotulo: '12 meses (reforço; preferencialmente aos 12 meses, podendo ser até 4 anos 11 meses e 29 dias)', dose: 'Reforço, 0,5 mL' }
    ],
    via: 'IM (vasto lateral da coxa em < 2 anos; deltoide em maiores)',
    protege: 'Doença meningocócica invasiva pelo sorogrupo C (meningite e meningococcemia).',
    situacoesEspeciais: 'Crianças de 12 meses a 4 anos 11 meses e 29 dias não vacinadas: dose única. Condições de risco (asplenia, deficiência de complemento, uso de eculizumabe, HIV, imunodeficiências, transplante, doença falciforme): MenC/MenACWY com esquema adicional e reforços a cada 5 anos pelo CRIE; MenB disponível no CRIE para algumas condições. Em 2023–2025 o MS estudou a substituição da MenC pela MenACWY na rotina do lactente; confirmar Nota Técnica vigente. Vacina de escolha nos reforços quando disponível: MenACWY.',
    atrasoEsquema: 'Não reiniciar: < 12 meses: completar as 2 doses com intervalo mínimo de 30–60 dias + reforço aos 12 meses (≥ 60 dias após a 2ª dose); ≥ 12 meses até 4 anos 11 meses e 29 dias sem vacina ou sem reforço: dose única. De 5 a 10 anos não vacinadas: não é oferecida de rotina pelo PNI (avaliar dose única em situações especiais); 11–14 anos: MenACWY (ver meningo_acwy).',
    contraindicacoes: ['Anafilaxia a dose anterior ou componente'],
    fontes: [ { nome: 'Ministério da Saúde – Calendário Nacional de Vacinação (PNI)', ano: 2025 }, { nome: 'Ministério da Saúde – Instrução Normativa do Calendário Nacional de Vacinação', ano: 2024 }, { nome: 'Ministério da Saúde – Manual dos CRIE, 5ª ed.', ano: 2019 } ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'meningo_acwy', nome: 'Meningocócica ACWY conjugada (MenACWY)', tipo: 'Inativada (polissacarídeos dos sorogrupos A, C, W e Y conjugados a proteína)',
    doses: [
      { idadeMeses: 132, rotulo: '11 a 14 anos (dose única ou reforço)', dose: 'Dose única, 0,5 mL' }
    ],
    via: 'IM (deltoide)',
    protege: 'Doença meningocócica invasiva pelos sorogrupos A, C, W e Y; adolescentes são o principal grupo de portadores de meningococo, e a vacinação reduz a transmissão.',
    situacoesEspeciais: 'Introduzida em 2020 para 11–12 anos e ampliada em 2023 para 11–14 anos (uma dose, independentemente de doses prévias de MenC). Adolescentes com condições de risco (asplenia, complemento, HIV, eculizumabe): esquema de 2 doses com intervalo de 8 semanas e reforço a cada 5 anos (CRIE). Pode ser administrada simultaneamente com HPV, dTpa/dT, febre amarela e outras. Para lactentes, a MenACWY é utilizada no CRIE para condições especiais; a incorporação na rotina de lactentes foi anunciada/avaliada pelo MS – confirmar a Nota Técnica vigente.',
    atrasoEsquema: 'Adolescentes de 11 a 14 anos 11 meses e 29 dias sem MenACWY: dose única a qualquer momento nessa faixa etária. Adolescentes ≥ 15 anos não são contemplados pela rotina do PNI (disponível na rede privada/CRIE conforme indicação).',
    contraindicacoes: ['Anafilaxia a dose anterior ou componente'],
    fontes: [ { nome: 'Ministério da Saúde – Calendário Nacional de Vacinação (PNI)', ano: 2025 }, { nome: 'Ministério da Saúde – Nota Técnica: ampliação da MenACWY para 11–14 anos', ano: 2023 }, { nome: 'Ministério da Saúde – Manual dos CRIE, 5ª ed.', ano: 2019 } ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'febre_amarela', nome: 'Febre amarela (atenuada)', tipo: 'Vírus vivo atenuado (cepa 17DD)',
    doses: [
      { idadeMeses: 9, rotulo: '9 meses', dose: '1ª dose, 0,5 mL' },
      { idadeMeses: 48, rotulo: '4 anos (reforço; até 4 anos 11 meses e 29 dias)', dose: 'Reforço (dose única adicional), 0,5 mL' }
    ],
    via: 'SC (região deltoide ou face externa da coxa)',
    protege: 'Febre amarela silvestre (transmitida por Haemagogus e Sabethes em áreas de floresta) e urbana. Todo o estado do Amazonas e a Amazônia Legal são Área com Recomendação de Vacinação (ACRV), com casos humanos e epizootias em primatas registrados; a vacinação é exigida em toda a região.',
    situacoesEspeciais: 'Esquema desde 2020: 1 dose aos 9 meses + reforço aos 4 anos (crianças vacinadas < 5 anos precisam de 2 doses). Pessoas ≥ 5 anos (até 59 anos) nunca vacinadas: dose única (validade para toda a vida, conforme OMS/MS). Contraindicações absolutas: < 6 meses de idade, imunodeficiência grave (primária ou adquirida – HIV com CD4 < 200 ou < 15%, quimioterapia, biológicos, corticoide em dose imunossupressora), história de doença do timo, anafilaxia a ovo/gelatina/eritromicina, transplantados. Lactantes de crianças < 6 meses: adiar a vacinação ou suspender o aleitamento por 10 dias após a dose (risco de encefalite no lactente) – em área de risco, avaliar. Gestantes: contraindicada em geral (avaliar risco-benefício em surtos). ≥ 60 anos: avaliar (maior risco de eventos graves). Crianças com HIV assintomáticas e sem imunossupressão: podem receber. Não administrar simultaneamente com tríplice/tetra viral em < 2 anos: intervalo mínimo de 30 dias (interferência); a partir de 2 anos pode ser simultânea. Precaução: doença aguda febril moderada/grave (adiar).',
    atrasoEsquema: 'Crianças de 9 meses a 4 anos 11 meses e 29 dias: 1ª dose a qualquer momento e reforço aos 4 anos (ou 30 dias após a 1ª dose, se a 1ª dose foi feita aos 4 anos, considerar dose única se ≥ 5 anos no momento). Se a 1ª dose foi aplicada com ≥ 5 anos: dose única, sem reforço. Vacinada 1 vez antes dos 5 anos e sem reforço: aplicar 1 dose a qualquer idade. Viajantes para ACRV: vacinar ao menos 10 dias antes.',
    contraindicacoes: ['Idade < 6 meses', 'Imunodeficiência grave (HIV com imunossupressão, imunodeficiências primárias, quimioterapia, biológicos, corticoide em dose imunossupressora)', 'Doença do timo (timoma, timectomia, miastenia)', 'Anafilaxia a ovo, gelatina ou dose anterior', 'Gestação (avaliar risco-benefício)', 'Aleitamento de lactente < 6 meses (adiar ou suspender aleitamento por 10 dias)'],
    fontes: [ { nome: 'Ministério da Saúde – Calendário Nacional de Vacinação (PNI)', ano: 2025 }, { nome: 'Ministério da Saúde – Nota Informativa: esquema de febre amarela (dose + reforço aos 4 anos)', ano: 2020 }, { nome: 'Ministério da Saúde – Guia de Vigilância em Saúde, 6ª ed. (Febre amarela)', ano: 2023 }, { nome: 'OMS – Vaccines and vaccination against yellow fever: WHO position paper', ano: 2013 } ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'triplice_viral', nome: 'Tríplice viral (SCR – sarampo, caxumba e rubéola)', tipo: 'Vírus vivos atenuados',
    doses: [
      { idadeMeses: 12, rotulo: '12 meses', dose: '1ª dose, 0,5 mL' },
      { idadeMeses: 15, rotulo: '15 meses (como tetra viral SCRV ou SCR + varicela)', dose: '2ª dose, 0,5 mL' }
    ],
    via: 'SC (região deltoide ou face externa da coxa)',
    protege: 'Sarampo (encefalite, pneumonia, PESS), caxumba (orquite, meningite, surdez) e rubéola (síndrome da rubéola congênita).',
    situacoesEspeciais: 'Esquema completo: 2 doses para pessoas de 12 meses a 29 anos; 30–59 anos: 1 dose. Dose zero (6 a 11 meses) em surtos de sarampo ou viagem a área com transmissão – não conta como dose do esquema (repetir aos 12 e 15 meses). Crianças com HIV: vacinar se CD4 ≥ 15% (< 5 anos) ou ≥ 200 (≥ 5 anos) e assintomáticas. Contraindicações: imunodeficiência grave, gestação, anafilaxia a dose anterior ou a neomicina/gelatina (alergia a ovo NÃO contraindica). Adiar 30 dias após tríplice/varicela outra vacina de vírus vivo injetável (ou aplicar no mesmo dia); adiar após imunoglobulina/hemoderivados (3–11 meses conforme produto) e após transfusão. Não administrar simultaneamente com febre amarela em < 2 anos (intervalo de 30 dias). Profilaxia pós-exposição ao sarampo: vacina até 72 h (≥ 6 meses) ou imunoglobulina até 6 dias (< 6 meses, gestantes, imunodeprimidos). Notificar surto de sarampo imediatamente – a Região Norte teve surtos em 2018–2019 (Amazonas/Roraima).',
    atrasoEsquema: 'Crianças de 12 meses a 14 anos sem doses: 2 doses com intervalo mínimo de 30 dias (1ª dose SCR; 2ª dose como tetra viral se entre 15 meses e 4 anos, ou SCR + varicela). Com 1 dose feita após 12 meses: aplicar a 2ª dose a qualquer momento (intervalo ≥ 30 dias). Doses feitas antes de 12 meses não contam.',
    contraindicacoes: ['Imunodeficiência grave (congênita, adquirida, quimioterapia, corticoide em dose imunossupressora, biológicos)', 'Gestação', 'Anafilaxia a dose anterior, neomicina ou gelatina', 'Uso de imunoglobulina/hemoderivados recentes (adiar 3–11 meses)'],
    fontes: [ { nome: 'Ministério da Saúde – Calendário Nacional de Vacinação (PNI)', ano: 2025 }, { nome: 'Ministério da Saúde – Instrução Normativa do Calendário Nacional de Vacinação', ano: 2024 }, { nome: 'Ministério da Saúde – Guia de Vigilância em Saúde, 6ª ed. (Sarampo)', ano: 2023 }, { nome: 'Ministério da Saúde – Manual dos CRIE, 5ª ed.', ano: 2019 } ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'tetra_viral_varicela', nome: 'Tetra viral (SCRV) / Varicela', tipo: 'Vírus vivos atenuados (sarampo, caxumba, rubéola e varicela – cepa Oka)',
    doses: [
      { idadeMeses: 15, rotulo: '15 meses (tetra viral: 2ª dose de SCR + 1ª dose de varicela; de 15 meses até 4 anos 11 meses e 29 dias)', dose: '1ª dose de varicela (na tetra viral ou varicela monovalente + SCR), 0,5 mL' },
      { idadeMeses: 48, rotulo: '4 anos (varicela monovalente – 2ª dose; até 6 anos 11 meses e 29 dias)', dose: '2ª dose de varicela, 0,5 mL' }
    ],
    via: 'SC',
    protege: 'Varicela (catapora) e suas complicações (infecção bacteriana secundária, pneumonia, encefalite, síndrome de Reye), além de sarampo, caxumba e rubéola (componente SCR). A 2ª dose de varicela (introduzida em 2018) reduz a varicela de escape e surtos escolares.',
    situacoesEspeciais: 'Quando a tetra viral não está disponível, aplicar SCR + varicela monovalente no mesmo dia (locais diferentes) ou com intervalo de 30 dias. Crianças de 5 a 6 anos 11 meses e 29 dias sem varicela: 2 doses de varicela monovalente (intervalo de 3 meses; mínimo 30 dias). ≥ 7 anos: não é oferecida de rotina pelo PNI (CRIE em situações especiais: profissionais de saúde, comunicantes de imunodeprimidos, pré-transplante, HIV com CD4 ≥ 15–25%, doenças crônicas, antes de imunossupressão). Profilaxia pós-exposição: vacina em até 5 dias (idealmente 3) em suscetíveis ≥ 9 meses (em surto hospitalar/creche); imunoglobulina antivaricela-zóster (IGHAVZ) em até 96 h (até 10 dias) para imunodeprimidos, gestantes, RN de mãe com varicela 5 dias antes a 2 dias após o parto e prematuros. Contraindicações: imunodeficiência grave, gestação, anafilaxia a neomicina/gelatina; evitar salicilatos por 6 semanas após a vacina.',
    atrasoEsquema: 'Varicela: 1ª dose de 15 meses a 4 anos 11 meses e 29 dias (tetra viral se também precisar da 2ª dose de SCR; monovalente se SCR completa); 2ª dose aos 4 anos ou ≥ 3 meses após a 1ª (intervalo mínimo 30 dias), até 6 anos 11 meses e 29 dias. SCR: ver triplice_viral. Doses de tetra viral fora da faixa 15 meses–4 anos não são indicadas.',
    contraindicacoes: ['Imunodeficiência grave', 'Gestação', 'Anafilaxia a dose anterior, neomicina ou gelatina', 'Uso de imunoglobulina/hemoderivados recentes (adiar)'],
    fontes: [ { nome: 'Ministério da Saúde – Calendário Nacional de Vacinação (PNI)', ano: 2025 }, { nome: 'Ministério da Saúde – Instrução Normativa do Calendário Nacional de Vacinação', ano: 2024 }, { nome: 'Ministério da Saúde – Manual dos CRIE, 5ª ed.', ano: 2019 }, { nome: 'SBP – Calendário de Vacinação da Criança', ano: 2024 } ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'hepatite_a', nome: 'Hepatite A (inativada)', tipo: 'Inativada (vírus da hepatite A)',
    doses: [ { idadeMeses: 15, rotulo: '15 meses (de 12 meses a 4 anos 11 meses e 29 dias)', dose: 'Dose única, 0,5 mL' } ],
    via: 'IM (vasto lateral da coxa em < 2 anos; deltoide em maiores)',
    protege: 'Hepatite A (hepatite aguda, hepatite fulminante) – doença de transmissão fecal-oral muito prevalente em áreas com saneamento precário na Amazônia; a vacinação em dose única (desde 2014) reduziu drasticamente os casos.',
    situacoesEspeciais: 'O PNI oferece dose única; a SBP recomenda 2 doses (intervalo de 6 meses) – a 2ª dose pode ser feita na rede privada. CRIE: 2 doses (0 e 6 meses) para hepatopatias crônicas, portadores de hepatite B ou C, coagulopatias, HIV, imunodeficiências, doenças de depósito, fibrose cística, trissomias, candidatos a transplante, hemoglobinopatias. Pós-exposição (contatos suscetíveis ≥ 12 meses): vacina em até 14 dias; imunoglobulina para < 12 meses, imunodeprimidos e hepatopatas. Pode ser simultânea a qualquer vacina.',
    atrasoEsquema: 'Crianças de 12 meses a 4 anos 11 meses e 29 dias sem a vacina: dose única a qualquer momento. ≥ 5 anos: não ofertada de rotina pelo PNI (disponível no CRIE para condições especiais e na rede privada – esquema de 2 doses, 0 e 6 meses).',
    contraindicacoes: ['Anafilaxia a dose anterior ou componente'],
    fontes: [ { nome: 'Ministério da Saúde – Calendário Nacional de Vacinação (PNI)', ano: 2025 }, { nome: 'Ministério da Saúde – Instrução Normativa do Calendário Nacional de Vacinação', ano: 2024 }, { nome: 'Ministério da Saúde – Manual dos CRIE, 5ª ed.', ano: 2019 }, { nome: 'SBP – Calendário de Vacinação da Criança', ano: 2024 } ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'dtp', nome: 'DTP (tríplice bacteriana – reforços)', tipo: 'Inativada (toxoides diftérico e tetânico + células inteiras de pertussis)',
    doses: [
      { idadeMeses: 15, rotulo: '15 meses (1º reforço)', dose: '1º reforço, 0,5 mL' },
      { idadeMeses: 48, rotulo: '4 anos (2º reforço; até 6 anos 11 meses e 29 dias)', dose: '2º reforço, 0,5 mL' }
    ],
    via: 'IM (vasto lateral da coxa em < 2 anos; deltoide em maiores)',
    protege: 'Difteria, tétano e coqueluche (reforço da imunidade obtida com a pentavalente).',
    situacoesEspeciais: 'Idade máxima: 6 anos 11 meses e 29 dias; a partir de 7 anos usar dT (ou dTpa). Eventos adversos à DTP/penta (convulsão em 72 h, episódio hipotônico-hiporresponsivo, febre ≥ 39,5 °C, choro persistente ≥ 3 h): completar com DTPa (acelular) no CRIE; encefalopatia em 7 dias: contraindicação ao componente pertussis (usar DT). Crianças com doença neurológica em evolução: adiar até estabilização. Pode ser simultânea a qualquer vacina. Profilaxia do tétano em ferimentos: conforme número de doses e tipo de ferimento (≥ 3 doses e última < 5 anos: nada; ferimento de risco com última dose > 5 anos: reforço; < 3 doses ou desconhecido: vacina + imunoglobulina antitetânica em ferimentos de risco).',
    atrasoEsquema: 'Não reiniciar. O 1º reforço deve ser feito ≥ 6 meses após a 3ª dose de pentavalente (a partir de 12 meses); o 2º reforço ≥ 6 meses após o 1º (mínimo 12 meses recomendado). Crianças de 4 a 6 anos 11 meses e 29 dias que só têm as 3 doses básicas: 2 reforços com intervalo mínimo de 6 meses (se só houver tempo para 1 antes dos 7 anos, aplicar 1 e depois seguir com dT aos 10 anos após o último reforço). Crianças ≥ 7 anos sem esquema completo: dT (completar 3 doses) e reforço a cada 10 anos (5 anos em ferimentos graves).',
    contraindicacoes: ['Encefalopatia nos 7 dias após dose anterior com componente pertussis', 'Anafilaxia a dose anterior ou componente', 'Idade ≥ 7 anos (usar dT/dTpa)'],
    fontes: [ { nome: 'Ministério da Saúde – Calendário Nacional de Vacinação (PNI)', ano: 2025 }, { nome: 'Ministério da Saúde – Instrução Normativa do Calendário Nacional de Vacinação', ano: 2024 }, { nome: 'Ministério da Saúde – Manual de Vigilância Epidemiológica de Eventos Adversos Pós-Vacinação, 4ª ed.', ano: 2020 }, { nome: 'Ministério da Saúde – Guia de Vigilância em Saúde, 6ª ed. (Tétano acidental – profilaxia)', ano: 2023 } ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'dtpa', nome: 'dTpa (tríplice bacteriana acelular do tipo adulto) e dT (dupla adulto)', tipo: 'Inativada (toxoides diftérico e tetânico + componentes acelulares de pertussis em doses reduzidas)',
    doses: [
      { idadeMeses: 84, rotulo: 'A partir de 7 anos: dT a cada 10 anos após esquema completo (reforços de rotina do adolescente/adulto); dTpa em gestantes, puérperas e profissionais de saúde', dose: '0,5 mL' },
      { idadeMeses: 240, rotulo: 'Gestantes (a partir de 20 semanas, a cada gestação) – incluindo adolescentes grávidas', dose: '1 dose de dTpa por gestação (até 45 dias pós-parto se não vacinada), 0,5 mL' }
    ],
    via: 'IM (deltoide)',
    protege: 'Difteria, tétano e coqueluche em ≥ 7 anos; a dTpa na gestação protege o lactente nos primeiros meses (transferência de anticorpos) contra coqueluche grave – principal causa de morte por coqueluche em < 3 meses.',
    situacoesEspeciais: 'No PNI a dTpa está disponível para gestantes (a partir da 20ª semana, em todas as gestações – inclusive adolescentes), puérperas até 45 dias sem dTpa na gestação e profissionais de saúde (que atendem RN/gestantes), além de indicações do CRIE (≥ 7 anos com condições especiais). Adolescentes: o reforço de rotina do PNI aos 10 anos após o último reforço é com dT; a SBP/SBIm recomendam dTpa no reforço da adolescência (rede privada). Crianças ≥ 7 anos nunca vacinadas: dT 3 doses (0, 2, 4 meses; intervalos mínimos de 30 dias) – a dTpa pode substituir uma delas quando disponível; hepatite B monovalente 3 doses. Gestante com esquema incompleto: completar com dT e garantir 1 dTpa a partir de 20 semanas (mínimo 2 doses, uma delas dTpa, para proteção contra tétano neonatal). Estratégia cocoon (contatos do RN) não é rotina do PNI.',
    atrasoEsquema: 'Reforço de dT a cada 10 anos após esquema completo de 3 doses (5 anos em ferimentos graves ou gestação com última dose > 5 anos); doses de DTP/penta contam para o esquema básico. Adolescente com esquema incompleto: completar até 3 doses com dT (intervalos mínimos de 30 dias entre doses, idealmente 60), sem reiniciar.',
    contraindicacoes: ['Anafilaxia a dose anterior ou componente', 'Encefalopatia em 7 dias após dose com componente pertussis (usar dT)'],
    fontes: [ { nome: 'Ministério da Saúde – Calendário Nacional de Vacinação (PNI)', ano: 2025 }, { nome: 'Ministério da Saúde – Instrução Normativa do Calendário Nacional de Vacinação', ano: 2024 }, { nome: 'SBP/SBIm – Calendário de Vacinação do Adolescente', ano: 2024 }, { nome: 'Ministério da Saúde – Manual dos CRIE, 5ª ed.', ano: 2019 } ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'hpv', nome: 'HPV quadrivalente (tipos 6, 11, 16 e 18)', tipo: 'Inativada (partículas semelhantes a vírus – VLP recombinantes)',
    doses: [ { idadeMeses: 108, rotulo: '9 a 14 anos (meninas e meninos) – dose única desde abril de 2024', dose: 'Dose única, 0,5 mL' } ],
    via: 'IM (deltoide)',
    protege: 'Câncer de colo do útero, vulva, vagina, ânus, pênis e orofaringe associados aos HPV 16 e 18 (~70% dos cânceres cervicais) e verrugas anogenitais (HPV 6 e 11). Maior eficácia quando aplicada antes do início da vida sexual.',
    situacoesEspeciais: 'Esquema de dose única para 9–14 anos (adotado pelo PNI em 2024, conforme recomendação da OMS). Em 2025 o MS ampliou o resgate com dose única para adolescentes e jovens de 15 a 19 anos que não receberam a vacina (confirmar Nota Técnica vigente). Esquema de 3 doses (0, 2 e 6 meses) para: pessoas vivendo com HIV/aids, transplantados de órgãos sólidos ou medula, pacientes oncológicos em quimio/radioterapia (9–45 anos), vítimas de violência sexual (9–45 anos), usuários de PrEP (15–45 anos) e imunodeprimidos. Pode ser simultânea a MenACWY, dT/dTpa, febre amarela, hepatite B e outras. Gestação: não recomendada (adiar); se aplicada inadvertidamente, não há indicação de interrupção. Síncope pós-vacinal (reação vasovagal) é frequente em adolescentes: aplicar sentado e observar 15 min.',
    atrasoEsquema: 'Adolescentes de 9 a 14 anos 11 meses e 29 dias não vacinados: dose única a qualquer momento. Quem iniciou esquema de 2 doses antes de 2024 e recebeu apenas 1 dose é considerado vacinado (dose única). Imunodeprimidos: completar 3 doses (intervalos mínimos: 1 mês entre 1ª e 2ª; 3 meses entre 2ª e 3ª; 5 meses entre 1ª e 3ª) sem reiniciar. Adolescentes ≥ 15 anos: verificar estratégia de resgate vigente (2025) ou rede privada.',
    contraindicacoes: ['Anafilaxia a dose anterior ou componente (levedura)', 'Gestação (adiar)'],
    fontes: [ { nome: 'Ministério da Saúde – Nota Técnica: esquema de dose única da vacina HPV para 9–14 anos', ano: 2024 }, { nome: 'Ministério da Saúde – Calendário Nacional de Vacinação (PNI)', ano: 2025 }, { nome: 'OMS – Human papillomavirus vaccines: WHO position paper', ano: 2022 }, { nome: 'Ministério da Saúde – Instrução Normativa do Calendário Nacional de Vacinação', ano: 2024 } ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'influenza', nome: 'Influenza (gripe) – anual', tipo: 'Inativada (trivalente ou quadrivalente, composição atualizada anualmente pela OMS – hemisfério sul)',
    doses: [
      { idadeMeses: 6, rotulo: 'A partir de 6 meses até 5 anos 11 meses e 29 dias: anual (campanha ou rotina)', dose: 'Primovacinação (< 9 anos, 1ª vez na vida): 2 doses com intervalo de 30 dias; nos anos seguintes: 1 dose anual' },
      { idadeMeses: 18, rotulo: 'Exemplo de dose anual subsequente', dose: '1 dose anual (volume conforme bula do produto do ano: 0,25 mL para 6–35 meses em algumas apresentações; 0,5 mL a partir de 3 anos ou conforme fabricante)' }
    ],
    via: 'IM (vasto lateral da coxa em < 2 anos; deltoide em maiores)',
    protege: 'Influenza (A H1N1, A H3N2, B) e suas complicações (pneumonia, hospitalização, óbito) – lactentes e pré-escolares são grupo de alto risco; na Amazônia a sazonalidade da influenza é mais precoce (dezembro a maio), o que motivou campanhas antecipadas na região Norte.',
    situacoesEspeciais: 'Grupos prioritários do PNI incluem crianças de 6 meses a < 6 anos, gestantes, puérperas, indígenas, pessoas com comorbidades (asma, cardiopatia, diabetes, imunossupressão, doença renal/hepática, obesidade, síndrome de Down, trissomias, doença neurológica crônica), profissionais de saúde, e desde 2024 a vacina foi incorporada à rotina (fora da campanha) para crianças de 6 meses a 5 anos, gestantes e puérperas. Crianças < 9 anos vacinadas pela 1ª vez: 2 doses (intervalo 30 dias); se receberam ≥ 1 dose em anos anteriores: 1 dose. Alergia ao ovo: pode ser vacinada (anafilaxia prévia grave a ovo: vacinar em ambiente com suporte); síndrome de Guillain-Barré nas 6 semanas após dose anterior: avaliar risco-benefício. Pode ser simultânea a qualquer vacina (inclusive covid-19). Contraindicação: anafilaxia a dose anterior ou a componente. Vacina de vírus vivo atenuado (nasal) não é usada no PNI.',
    atrasoEsquema: 'A vacinação é anual: crianças de 6 meses a 5 anos que perderam a campanha podem ser vacinadas na rotina enquanto houver vacina da temporada. Primovacinadas que receberam apenas 1 dose: aplicar a 2ª dose com intervalo mínimo de 30 dias (se ainda na mesma temporada); caso contrário, no ano seguinte receber 1 dose (já é considerada primovacinada se recebeu ≥ 1 dose em ano anterior, conforme MS – confirmar Informe Técnico vigente, pois alguns anos exigem 2 doses se o esquema anterior foi incompleto).',
    contraindicacoes: ['Anafilaxia a dose anterior ou componente', 'Idade < 6 meses', 'Síndrome de Guillain-Barré nas 6 semanas após dose anterior (precaução)'],
    fontes: [ { nome: 'Ministério da Saúde – Informe Técnico da Campanha Nacional de Vacinação contra a Influenza', ano: 2025 }, { nome: 'Ministério da Saúde – Nota Técnica: incorporação da vacina influenza na rotina para crianças de 6 meses a 5 anos', ano: 2024 }, { nome: 'Ministério da Saúde – Calendário Nacional de Vacinação (PNI)', ano: 2025 }, { nome: 'SBP – Calendário de Vacinação da Criança', ano: 2024 } ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'covid19', nome: 'Covid-19 (vacina atualizada – rotina para 6 meses a < 5 anos e grupos prioritários)', tipo: 'Inativada/recombinante ou mRNA, conforme o produto da temporada (formulações atualizadas para variantes circulantes)',
    verificar: true,
    doses: [
      { idadeMeses: 6, rotulo: '6 meses a 4 anos 11 meses e 29 dias (esquema primário) – rotina desde 2024', dose: 'Esquema primário conforme o produto: 2 doses com intervalo de 4 semanas (Spikevax/Moderna pediátrica) ou 3 doses (Comirnaty/Pfizer pediátrica: 0, 4 e 8 semanas); imunocomprometidos: 3 doses + reforços' },
      { idadeMeses: 60, rotulo: '≥ 5 anos com comorbidades ou pertencentes a grupos prioritários (imunossuprimidos, doenças crônicas, indígenas, quilombolas, ribeirinhos etc.)', dose: 'Dose anual (ou a cada 6 meses em imunocomprometidos), conforme Informe Técnico vigente' }
    ],
    via: 'IM (vasto lateral da coxa em < 2 anos; deltoide em maiores)',
    protege: 'Formas graves de covid-19, hospitalização, síndrome inflamatória multissistêmica pediátrica (SIM-P) e óbito; crianças < 5 anos têm risco de hospitalização comparável ao de idosos jovens.',
    situacoesEspeciais: 'Desde 2024 a covid-19 integra o Calendário Nacional para crianças de 6 meses a 4 anos 11 meses e 29 dias (esquema primário), gestantes, puérperas, idosos e grupos prioritários (dose anual/semestral). O produto disponível na rede pública e o esquema (2 ou 3 doses; intervalo) mudam a cada temporada: confirmar o Informe Técnico/Instrução Normativa vigente antes de prescrever. Crianças com esquema primário completo e sem comorbidade não recebem reforço de rotina após os 5 anos. Imunocomprometidos (5–18 anos): esquema primário de 3 doses + reforços. Pode ser administrada simultaneamente com outras vacinas do calendário (inclusive influenza). Contraindicações: anafilaxia a dose anterior ou componente; miocardite/pericardite após dose anterior de vacina de mRNA (avaliar). Adiar em doença febril aguda.',
    atrasoEsquema: 'Crianças de 6 meses a 4 anos 11 meses e 29 dias que não iniciaram ou não completaram o esquema: completar as doses faltantes com o produto disponível, respeitando os intervalos mínimos do fabricante, sem reiniciar (esquemas iniciados com um produto podem ser completados com outro, conforme orientação do MS). Após os 5 anos, crianças saudáveis não vacinadas não são contempladas de rotina (somente grupos prioritários). Confirmar conforme Informe Técnico vigente.',
    contraindicacoes: ['Anafilaxia a dose anterior ou componente', 'Idade < 6 meses', 'Miocardite/pericardite após dose anterior de vacina de mRNA (precaução)'],
    fontes: [ { nome: 'Ministério da Saúde – Nota Técnica: incorporação da vacina covid-19 no Calendário Nacional de Vacinação', ano: 2024 }, { nome: 'Ministério da Saúde – Informe Técnico Operacional de Vacinação contra a covid-19', ano: 2025 }, { nome: 'Ministério da Saúde – Calendário Nacional de Vacinação (PNI)', ano: 2025 }, { nome: 'SBP – Nota de Alerta: vacinação de crianças contra covid-19', ano: 2024 } ],
    atualizadoEm: '2026-09'
  },
  {
    id: 'dengue', nome: 'Dengue (TAK-003 – Qdenga, tetravalente atenuada)', tipo: 'Vírus vivos atenuados recombinantes (DENV-1 a 4, base DENV-2)',
    doses: [
      { idadeMeses: 120, rotulo: '10 a 14 anos (municípios prioritários definidos pelo MS) – 1ª dose', dose: '1ª dose, 0,5 mL' },
      { idadeMeses: 123, rotulo: '3 meses após a 1ª dose – 2ª dose', dose: '2ª dose, 0,5 mL' }
    ],
    via: 'SC (deltoide)',
    protege: 'Dengue sintomática e hospitalização pelos 4 sorotipos (eficácia global ~61% contra dengue sintomática e ~84% contra hospitalização em 18 meses; maior para DENV-1 e DENV-2; evidência limitada para DENV-3 e DENV-4 em soronegativos).',
    situacoesEspeciais: 'Incorporada ao SUS em 2024 para crianças e adolescentes de 10 a 14 anos residentes em municípios prioritários (regiões de saúde com alta transmissão e predominância de DENV-2 – lista atualizada pelo MS; verificar se o município na Amazônia está contemplado), sem necessidade de sorologia prévia. Contraindicações: imunodeficiência congênita ou adquirida (HIV sintomático ou com imunossupressão, quimioterapia, corticoide em dose imunossupressora, biológicos), gestação e aleitamento, anafilaxia a dose anterior ou componente. Adiar em doença febril aguda e por 30 dias após dengue confirmada (aguardar 6 meses após dengue segundo alguns protocolos – confirmar). O MS orienta intervalo de 30 dias com outras vacinas de vírus vivo (tríplice viral, varicela, febre amarela) quando não aplicadas no mesmo dia; com vacinas inativadas (HPV, MenACWY, dT) pode ser simultânea ou sem intervalo – confirmar Informe Técnico vigente. Eventos adversos: febre, cefaleia, mialgia, reação local; não há sinal de dengue grave induzida em soronegativos até o momento.',
    atrasoEsquema: 'Esquema de 2 doses com intervalo de 3 meses; se a 2ª dose atrasar, aplicar assim que possível sem reiniciar (não há intervalo máximo definido; dentro da faixa etária do programa). Adolescentes que completam 15 anos após a 1ª dose podem completar a 2ª dose. A vacina só é oferecida na rede pública nos municípios prioritários; na rede privada está licenciada de 4 a 60 anos.',
    contraindicacoes: ['Imunodeficiência congênita ou adquirida', 'Gestação e lactação', 'Anafilaxia a dose anterior ou componente', 'Idade fora da faixa 4–60 anos (bula) / 10–14 anos (PNI)'],
    fontes: [ { nome: 'Ministério da Saúde – Informe Técnico Operacional: vacina dengue (TAK-003) no SUS', ano: 2024 }, { nome: 'CONITEC – Relatório de recomendação: vacina dengue tetravalente atenuada', ano: 2023 }, { nome: 'OMS – Dengue vaccine: WHO position paper (TAK-003)', ano: 2024 }, { nome: 'SBP/SBIm – Nota Técnica sobre a vacina dengue', ano: 2024 } ],
    atualizadoEm: '2026-09'
  }
];
