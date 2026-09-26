#!/usr/bin/env python3
"""Gera curriculos/jogos/emergencias.json (jogo "Salve o paciente") e valida.

Cada caso: etapas com monitor (FC, PA, SatO2, FR, ritmo) e 3-4 ações.
Cada ação leva a outra etapa ou a um final. Pontos: +10 ideal, +5 aceitável,
-5 inadequada, -10 perigosa.
Uso: python3 curriculos/jogos/gerar_emergencias.py
"""
import json
import os
import re
import sys

RITMOS = {"sinusal", "fa", "tv", "fv", "assistolia", "bradi", "bav3",
          "taqui-sinusal", "flutter", "aesp"}
SEM_PULSO = {"fv", "assistolia", "aesp"}
AVATARES = {"homem", "mulher", "idoso", "idosa", "crianca", "gestante"}
PONTOS = {10, 5, -5, -10}
TIPOS_FINAL = {"bom", "parcial", "ruim"}


def V(fc, pa, sat, fr, ritmo):
    return {"FC": fc, "PA": pa, "SatO2": sat, "FR": fr, "ritmo": ritmo}


def A(txt, vai, nota, pontos):
    return {"txt": txt, "vai": vai, "nota": nota, "pontos": pontos}


def E(texto, vitais, acoes):
    return {"texto": texto, "vitais": vitais, "acoes": acoes}


def F(tipo, texto):
    return {"tipo": tipo, "texto": texto}


CASOS = []

# ---------------------------------------------------------------- em-01 FV
CASOS.append({
    "id": "em-01",
    "titulo": "Colapso na sala de espera",
    "paciente": "Jorge, 62 anos",
    "avatar": "homem",
    "cenario": "Jorge aguardava atendimento por dor no peito. De repente, cai da cadeira e não responde.",
    "diagnostico": "Parada cardiorrespiratória em fibrilação ventricular",
    "inicio": "e1",
    "etapas": {
        "e1": E("Não responde, sem respiração normal e sem pulso. As pás do monitor mostram ritmo caótico.",
                V(0, "0x0", 0, 0, "fv"), [
                    A("Iniciar RCP de alta qualidade e desfibrilar já", "e2",
                      "Certo. FV é ritmo chocável: RCP imediata e choque o mais cedo possível.", 10),
                    A("Medir a glicemia capilar antes de tudo", "e1b",
                      "Atraso. Cada minuto sem RCP e sem choque reduz a sobrevida.", -10),
                    A("Amiodarona 300 mg IV antes do choque", "e1b",
                      "Errado. Antiarrítmico vem depois do 3º choque, não no lugar dele.", -5),
                    A("Intubar antes de começar compressões", "e1b",
                      "Errado. Via aérea avançada não pode atrasar compressões e choque.", -10),
                ]),
        "e1b": E("Dois minutos se passaram sem choque. O monitor segue em fibrilação ventricular.",
                 V(0, "0x0", 0, 0, "fv"), [
                     A("Choque agora e RCP por 2 minutos", "e2",
                       "Recuperou. Ainda há chance: choque e compressões sem pausas longas.", 5),
                     A("Choque sincronizado (cardioversão)", "f-ruim",
                       "Errado. Na FV não há QRS para sincronizar: o choque pode não sair.", -10),
                     A("Adrenalina IV e aguardar sem compressões", "f-ruim",
                       "Perigoso. Sem compressões, a droga não circula.", -10),
                 ]),
        "e2": E("Após 1 choque e 2 min de RCP, o ritmo continua FV. Acesso venoso pronto.",
                V(0, "0x0", 0, 0, "fv"), [
                    A("Novo choque, RCP e adrenalina 1 mg IV", "e3",
                      "Certo. No ritmo chocável, adrenalina após o 2º choque, a cada 3–5 min.", 10),
                    A("Parar 30 segundos para palpar pulso", "e2b",
                      "Inadequado. Checagem de pulso deve durar menos de 10 s.", -5),
                    A("Pausar compressões para intubar", "e2b",
                      "Inadequado. Priorize compressões; bolsa-máscara basta por ora.", -5),
                ]),
        "e2b": E("A pausa foi longa. Ritmo ainda em FV, e a equipe aguarda sua ordem.",
                 V(0, "0x0", 0, 0, "fv"), [
                     A("Choque, retomar RCP e adrenalina 1 mg IV", "e3",
                       "Retomou o algoritmo. Minimize pausas daqui em diante.", 5),
                     A("Declarar óbito agora", "f-ruim",
                       "Precoce. FV mantida com causas não tratadas ainda merece reanimação.", -10),
                     A("Bicarbonato de sódio de rotina", "f-ruim",
                       "Sem benefício de rotina na PCR; só em situações específicas.", -10),
                 ]),
        "e3": E("Terceiro choque aplicado. Após 2 min, o ritmo persiste em FV.",
                V(0, "0x0", 0, 0, "fv"), [
                    A("Choque e amiodarona 300 mg IV", "e4",
                      "Certo. FV refratária: amiodarona 300 mg (2ª dose 150 mg).", 10),
                    A("Choque e lidocaína IV", "e4",
                      "Aceitável. Lidocaína é alternativa à amiodarona.", 5),
                    A("Suspender a reanimação", "f-ruim",
                      "Precoce. Ainda há ritmo chocável e opções de tratamento.", -10),
                ]),
        "e4": E("Após o choque, surge ritmo organizado com pulso. Retorno da circulação!",
                V(98, "86x52", 93, 14, "sinusal"), [
                    A("ECG, PAM ≥65, SatO2 92–98% e cateterismo", "f-bom",
                      "Certo. Cuidado pós-PCR: evite hipotensão e hipóxia, trate a causa.", 10),
                    A("O2 a 100% contínuo, sem alvo de saturação", "f-parcial",
                      "Hiperóxia prolongada pode piorar a lesão. Alvo: SatO2 92–98%.", -5),
                    A("Transferir para a enfermaria", "f-ruim",
                      "Perigoso. Pós-PCR exige UTI, monitor e reperfusão coronária.", -10),
                ]),
    },
    "finais": {
        "f-bom": F("bom", "Jorge tinha supra de ST, foi à hemodinâmica e recebeu stent. Teve controle de temperatura na UTI e alta sem sequelas."),
        "f-parcial": F("parcial", "Jorge sobreviveu, mas o pós-PCR sem alvos claros prolongou a UTI e deixou déficit cognitivo leve."),
        "f-ruim": F("ruim", "Atrasos no choque e pausas longas: Jorge não recuperou a circulação."),
    },
    "debriefing": [
        "FV/TV sem pulso: RCP imediata e choque o mais cedo possível.",
        "Adrenalina 1 mg a cada 3–5 min após o 2º choque; amiodarona 300 mg após o 3º.",
        "Compressões: 100–120/min, 5–6 cm, retorno total do tórax, pausas <10 s.",
        "Pós-RCE: PAM ≥65, SatO2 92–98%, ECG, controle de temperatura e cateterismo se indicado.",
    ],
    "referencia": "AHA 2025 / ACLS",
})

# ---------------------------------------------------------------- em-02 IAMCSST
CASOS.append({
    "id": "em-02",
    "titulo": "Dor no peito no interior",
    "paciente": "Raimundo, 58 anos",
    "avatar": "homem",
    "cenario": "Hospital de um município do interior do Amazonas. Dor em aperto no peito há 2 h, com suor frio. Hemodinâmica só em Manaus.",
    "diagnostico": "Infarto agudo do miocárdio com supradesnivelamento do ST (parede anterior)",
    "inicio": "e1",
    "etapas": {
        "e1": E("Raimundo é hipertenso e fumante. A dor irradia para o braço esquerdo.",
                V(96, "150x90", 95, 20, "sinusal"), [
                    A("ECG de 12 derivações em até 10 minutos", "e2",
                      "Certo. Na dor torácica, o ECG precoce define a conduta.", 10),
                    A("Colher troponina e esperar o resultado", "e1b",
                      "Inadequado. No supra de ST, não se espera troponina para reperfundir.", -5),
                    A("Omeprazol IV e reavaliar depois", "e1b",
                      "Inadequado. Dor típica exige ECG antes de pensar em causas gástricas.", -5),
                    A("Alta com analgésico", "f-ruim",
                      "Perigoso. Dor torácica típica não pode sair sem ECG.", -10),
                ]),
        "e1b": E("Passaram-se 40 minutos. A dor continua forte e a troponina ainda não saiu.",
                 V(106, "140x86", 95, 22, "taqui-sinusal"), [
                     A("Fazer o ECG agora", "e2",
                       "Recuperou, mas 40 min de músculo cardíaco foram perdidos.", 5),
                     A("Continuar aguardando a troponina", "f-ruim",
                       "Perigoso. Tempo é miocárdio.", -10),
                     A("Morfina e observar", "f-ruim",
                       "Mascarar a dor sem diagnóstico atrasa a reperfusão.", -10),
                 ]),
        "e2": E("ECG: supradesnivelamento do ST de V1 a V4. Dor há 2h30.",
                V(100, "146x88", 95, 20, "sinusal"), [
                    A("AAS 300 mg + clopidogrel e ativar reperfusão", "e3",
                      "Certo. Antiagregação dupla e decisão imediata sobre reperfusão.", 10),
                    A("Só oxigênio e observar", "e2b",
                      "Inadequado. O2 só se SatO2 <90%; o essencial é reperfundir.", -5),
                    A("Heparina e internar na enfermaria", "e2b",
                      "Inadequado. Sem reperfusão, o infarto se completa.", -10),
                ]),
        "e2b": E("A dor persiste e surgem extrassístoles. O supra de ST continua.",
                 V(112, "138x84", 94, 22, "taqui-sinusal"), [
                     A("AAS + clopidogrel e decidir a reperfusão já", "e3",
                       "Recuperou. Ainda dentro da janela de 12 h.", 5),
                     A("Aguardar curva de troponina", "f-ruim",
                       "Perigoso. Supra de ST com dor é indicação de reperfusão imediata.", -10),
                     A("Diazepam para ansiedade", "f-ruim",
                       "Tratar ansiedade não trata o infarto.", -10),
                 ]),
        "e3": E("A transferência para angioplastia em Manaus levaria mais de 120 min. Sem contraindicações a fibrinolítico.",
                V(98, "140x86", 96, 20, "sinusal"), [
                    A("Fibrinólise (tenecteplase) em até 30 min", "e4",
                      "Certo. Se a angioplastia demora >120 min, fibrinólise é a escolha.", 10),
                    A("Transferir sem fibrinólise, mesmo com atraso", "e3b",
                      "Inadequado. O atraso >120 min anula a vantagem da angioplastia.", -5),
                    A("Aguardar vaga de UTI sem reperfundir", "f-ruim",
                      "Perigoso. Reperfusão não espera leito.", -10),
                ]),
        "e3b": E("Após 4 h de viagem, Raimundo chega a Manaus com dor e hipotensão.",
                 V(116, "98x64", 93, 24, "taqui-sinusal"), [
                     A("Angioplastia primária imediata", "f-parcial",
                       "Correto agora, mas o atraso custou músculo cardíaco.", 5),
                     A("Esperar estabilizar para cateterismo eletivo", "f-ruim",
                       "Perigoso. Instabilidade no IAM pede cateterismo de urgência.", -10),
                     A("Heparina e cateterismo em 48 h", "f-ruim",
                       "Perigoso. Supra de ST com dor não pode esperar.", -10),
                 ]),
        "e4": E("60–90 min após o fibrinolítico: dor aliviou e o supra de ST caiu mais de 50%.",
                V(84, "130x80", 97, 18, "sinusal"), [
                    A("Transferir para cateterismo em 2 a 24 h", "f-bom",
                      "Certo. Estratégia fármaco-invasiva: cateterismo mesmo com sucesso.", 10),
                    A("Alta em 48 h sem cateterismo", "f-parcial",
                      "Inadequado. Há risco de reoclusão sem estudo coronário.", -5),
                    A("Repetir o fibrinolítico", "f-ruim",
                      "Perigoso. Houve sucesso; repetir só aumenta o risco de sangramento.", -10),
                ]),
    },
    "finais": {
        "f-bom": F("bom", "Raimundo recebeu stent na artéria descendente anterior em Manaus. Função cardíaca preservada e alta em 4 dias."),
        "f-parcial": F("parcial", "Raimundo sobreviveu, mas ficou com disfunção do ventrículo esquerdo e insuficiência cardíaca."),
        "f-ruim": F("ruim", "Sem reperfusão a tempo, Raimundo evoluiu com choque cardiogênico e óbito."),
    },
    "debriefing": [
        "ECG em até 10 min na dor torácica; não espere troponina se há supra de ST.",
        "Angioplastia primária se porta-balão ≤120 min; senão, fibrinólise em até 30 min.",
        "Após fibrinólise: cateterismo em 2–24 h, ou imediato se falhar (resgate).",
        "O2 só se SatO2 <90%. AAS + inibidor P2Y12 o quanto antes.",
    ],
    "referencia": "Diretriz SBC IAM com supra de ST / AHA-ACC 2025 SCA",
})

# ---------------------------------------------------------------- em-03 Anafilaxia
CASOS.append({
    "id": "em-03",
    "titulo": "Reação na UPA",
    "paciente": "Ana, 28 anos",
    "avatar": "mulher",
    "cenario": "Minutos após receber dipirona IM na UPA, Ana tem placas vermelhas no corpo, voz rouca e falta de ar.",
    "diagnostico": "Anafilaxia com choque",
    "inicio": "e1",
    "etapas": {
        "e1": E("Urticária difusa, lábios inchados, sibilos e tontura. Pele fria.",
                V(128, "80x50", 90, 30, "taqui-sinusal"), [
                    A("Adrenalina 0,5 mg IM na coxa", "e2",
                      "Certo. Adrenalina IM (1 mg/mL, 0,01 mg/kg, máx. 0,5 mg) é a 1ª droga.", 10),
                    A("Anti-histamínico e corticoide IV", "e1b",
                      "Errado. Não tratam o choque nem o edema de via aérea.", -10),
                    A("Adrenalina 1 mg IV em bolus", "e1b",
                      "Perigoso. Bolus IV de 1 mg (dose de PCR) causa arritmias graves.", -10),
                ]),
        "e1b": E("Ana piora: estridor, sonolência e pressão ainda mais baixa.",
                 V(142, "68x40", 85, 34, "taqui-sinusal"), [
                     A("Adrenalina IM, O2 e deitar com pernas elevadas", "e2",
                       "Recuperou. Adrenalina IM sem demora, mesmo atrasada.", 5),
                     A("Aguardar o efeito do corticoide", "f-ruim",
                       "Perigoso. Corticoide demora horas e não reverte o choque.", -10),
                     A("Sentar a paciente para respirar melhor", "f-ruim",
                       "Perigoso. Em choque, ficar de pé ou sentada pode levar à parada.", -10),
                 ]),
        "e2": E("Após a adrenalina IM, leve melhora. Ainda hipotensa e com sibilos.",
                V(118, "88x56", 93, 26, "taqui-sinusal"), [
                    A("Deitar, O2 e cristaloide 20 mL/kg rápido", "e4",
                      "Certo. Anafilaxia causa grande perda de volume para os tecidos.", 10),
                    A("Nada mais, só observar", "e2b",
                      "Inadequado. Choque sem volume tende a voltar.", -5),
                    A("Adrenalina 1 mg IV em bolus", "f-ruim",
                      "Perigoso. Adrenalina IV só em infusão, monitorizada.", -10),
                ]),
        "e2b": E("Dez minutos depois, a pressão volta a cair.",
                 V(132, "76x46", 91, 28, "taqui-sinusal"), [
                     A("Repetir adrenalina IM e dar cristaloide", "e3",
                       "Recuperou. Adrenalina IM pode ser repetida a cada 5–15 min.", 5),
                     A("Salbutamol inalatório isolado", "f-ruim",
                       "Inadequado. Ajuda o broncoespasmo, mas não trata o choque.", -5),
                     A("Corticoide e aguardar", "f-ruim",
                       "Perigoso. Não é tratamento de 1ª linha.", -10),
                 ]),
        "e3": E("Após 2 doses IM e 2 L de cristaloide, a pressão segue baixa.",
                V(124, "82x48", 93, 26, "taqui-sinusal"), [
                    A("Infusão contínua de adrenalina IV monitorizada", "e4",
                      "Certo. Anafilaxia refratária: adrenalina em infusão e ajuda da UTI.", 10),
                    A("Terceira dose de adrenalina IM", "e4",
                      "Aceitável, mas após 2 doses sem resposta a infusão IV é preferível.", 5),
                    A("Aguardar mais 30 minutos", "f-ruim",
                      "Perigoso. Choque refratário não melhora sozinho.", -10),
                ]),
        "e4": E("Ana melhora: pressão normal, sem sibilos, urticária diminuindo.",
                V(96, "112x70", 97, 18, "sinusal"), [
                    A("Observar ≥6 h, registrar alergia e prescrever adrenalina", "f-bom",
                      "Certo. Risco de reação bifásica; alta com plano e encaminhamento.", 10),
                    A("Internar em observação e registrar a alergia", "f-bom",
                      "Aceitável. Faltou prescrever adrenalina autoinjetável e orientar.", 5),
                    A("Alta em 1 hora com anti-histamínico", "f-parcial",
                      "Inadequado. Precoce demais e sem plano para nova reação.", -5),
                ]),
    },
    "finais": {
        "f-bom": F("bom", "Ana recebeu alta no dia seguinte, com alergia à dipirona registrada e encaminhamento ao alergista."),
        "f-parcial": F("parcial", "Ana voltou à noite com nova reação (bifásica). Foi tratada, mas o risco era evitável."),
        "f-ruim": F("ruim", "Sem adrenalina a tempo, Ana evoluiu com edema de glote e parada cardíaca."),
    },
    "debriefing": [
        "Adrenalina IM na coxa é a 1ª e principal droga: 0,01 mg/kg (máx. 0,5 mg), repetir em 5–15 min.",
        "Anti-histamínico e corticoide não substituem a adrenalina.",
        "Paciente deitado com pernas elevadas, O2 e cristaloide rápido.",
        "Refratária após 2 doses IM: adrenalina em infusão IV contínua.",
        "Observar, registrar a alergia e orientar sobre reação bifásica.",
    ],
    "referencia": "WAO 2020 / ASBAI Anafilaxia",
})

# ---------------------------------------------------------------- em-04 Choque séptico
CASOS.append({
    "id": "em-04",
    "titulo": "Febre e confusão na idosa",
    "paciente": "Dona Maria, 74 anos",
    "avatar": "idosa",
    "cenario": "Dona Maria tem ardor para urinar há 3 dias. Hoje está confusa, com febre e dor nas costas à direita.",
    "diagnostico": "Choque séptico de foco urinário (pielonefrite obstrutiva)",
    "inicio": "e1",
    "etapas": {
        "e1": E("Temperatura 38,9 °C, pele moteada, confusa. Giordano positivo à direita.",
                V(118, "82x44", 93, 26, "taqui-sinusal"), [
                    A("Lactato, hemoculturas, antibiótico e 30 mL/kg", "e2",
                      "Certo. Pacote da 1ª hora: culturas, antibiótico e cristaloide.", 10),
                    A("Aguardar a urocultura para escolher antibiótico", "e1b",
                      "Perigoso. Antibiótico empírico deve sair em até 1 h.", -10),
                    A("Dipirona e reavaliar em 2 horas", "e1b",
                      "Inadequado. Tratar a febre não trata a sepse.", -5),
                ]),
        "e1b": E("Uma hora depois: mais sonolenta, pressão menor, lactato 5 mmol/L.",
                 V(128, "74x40", 91, 30, "taqui-sinusal"), [
                     A("Culturas, antibiótico e 30 mL/kg agora", "e2",
                       "Recuperou, mas cada hora de atraso no antibiótico aumenta a mortalidade.", 5),
                     A("Continuar aguardando exames", "f-ruim",
                       "Perigoso. O choque progride.", -10),
                     A("Só hidrocortisona IV", "f-ruim",
                       "Perigoso. Corticoide não substitui antibiótico nem volume.", -10),
                 ]),
        "e2": E("Após 30 mL/kg de cristaloide, a PAM segue abaixo de 65 mmHg. Lactato 4.",
                V(116, "84x46", 94, 24, "taqui-sinusal"), [
                    A("Noradrenalina para PAM ≥65 mmHg", "e3",
                      "Certo. Vasopressor de 1ª escolha; pode iniciar em veia periférica.", 10),
                    A("Mais 3 L de cristaloide sem reavaliar", "e2b",
                      "Inadequado. Volume guiado por resposta; excesso causa congestão.", -5),
                    A("Dopamina como primeira escolha", "e2b",
                      "Inadequado. Dopamina causa mais arritmias que noradrenalina.", -5),
                ]),
        "e2b": E("Surgem estertores nos pulmões e a saturação cai. Pressão ainda baixa.",
                 V(124, "80x42", 88, 32, "taqui-sinusal"), [
                     A("Parar volume, O2 e iniciar noradrenalina", "e3",
                       "Recuperou. Vasopressor para PAM ≥65 e suporte ventilatório.", 5),
                     A("Mais volume para subir a pressão", "f-ruim",
                       "Perigoso. Piora o edema pulmonar.", -10),
                     A("Furosemida IV em bolus", "f-ruim",
                       "Perigoso. Diurético em choque agrava a hipotensão.", -10),
                 ]),
        "e3": E("Com noradrenalina, PAM 70. Ultrassom: cálculo no ureter e rim direito dilatado.",
                V(98, "104x54", 95, 22, "sinusal"), [
                    A("Desobstrução urológica de urgência", "f-bom",
                      "Certo. Controle do foco: rim obstruído infectado precisa de drenagem.", 10),
                    A("Só manter o antibiótico", "f-parcial",
                      "Inadequado. Sem drenar o foco, a sepse tende a persistir.", -5),
                    A("Trocar o antibiótico todo dia", "f-parcial",
                      "Inadequado. O problema é o foco obstruído, não o antibiótico.", -5),
                ]),
    },
    "finais": {
        "f-bom": F("bom", "Após cateter duplo J, Dona Maria saiu da noradrenalina em 48 h e teve alta em uma semana."),
        "f-parcial": F("parcial", "Dona Maria ficou dias na UTI e teve lesão renal até a drenagem ser feita."),
        "f-ruim": F("ruim", "O choque progrediu para falência de múltiplos órgãos e óbito."),
    },
    "debriefing": [
        "Pacote da 1ª hora: lactato, hemoculturas, antibiótico, 30 mL/kg de cristaloide se hipotensão ou lactato ≥4.",
        "Noradrenalina é o vasopressor de 1ª escolha; alvo PAM ≥65 mmHg.",
        "Reavalie a resposta ao volume; excesso de fluido causa congestão.",
        "Controle do foco: drenar, desobstruir ou retirar a fonte o quanto antes.",
    ],
    "referencia": "Surviving Sepsis Campaign 2021 / ILAS",
})

# ---------------------------------------------------------------- em-05 CAD
CASOS.append({
    "id": "em-05",
    "titulo": "Jovem com vômitos e respiração funda",
    "paciente": "Lucas, 19 anos",
    "avatar": "homem",
    "cenario": "Lucas tem diabetes tipo 1 e parou a insulina há 3 dias. Vômitos, dor abdominal e respiração rápida e profunda.",
    "diagnostico": "Cetoacidose diabética com hipocalemia",
    "inicio": "e1",
    "etapas": {
        "e1": E("Glicemia 480 mg/dL, pH 7,10, bicarbonato 8, cetonemia positiva. Mucosas secas.",
                V(124, "96x60", 98, 30, "taqui-sinusal"), [
                    A("SF 0,9% 1 a 1,5 L na 1ª hora", "e2",
                      "Certo. Hidratação é a 1ª medida e já reduz a glicemia.", 10),
                    A("Insulina regular IV em bolus antes de tudo", "e1b",
                      "Perigoso. Insulina sem saber o potássio pode causar hipocalemia grave.", -10),
                    A("Bicarbonato IV para corrigir o pH", "e1b",
                      "Inadequado. Só se pH <6,9; e empurra o potássio para dentro da célula.", -5),
                ]),
        "e1b": E("O potássio caiu para 2,6 mEq/L. Lucas está fraco e com extrassístoles.",
                 V(118, "94x58", 98, 28, "taqui-sinusal"), [
                     A("Suspender insulina, repor KCl IV e hidratar", "e3",
                       "Recuperou. K+ baixo é perigoso: repor antes de continuar a insulina.", 5),
                     A("Aumentar a insulina", "f-ruim",
                       "Perigoso. Derruba ainda mais o potássio: risco de arritmia fatal.", -10),
                     A("Dar mais bicarbonato", "f-ruim",
                       "Perigoso. Piora a hipocalemia.", -10),
                 ]),
        "e2": E("Após 1 L de SF, sai o potássio: 3,1 mEq/L. Diurese presente.",
                V(112, "104x64", 98, 28, "taqui-sinusal"), [
                    A("Repor KCl IV e adiar insulina até K+ ≥3,5", "e3",
                      "Certo. Com K+ <3,5 a insulina espera; reponha o potássio antes.", 10),
                    A("Iniciar insulina 0,1 U/kg/h já", "e1b",
                      "Perigoso. Com K+ 3,1 a insulina leva à hipocalemia grave.", -10),
                    A("Não repor potássio, pois ele já está no soro", "e1b",
                      "Errado. O SF 0,9% não tem potássio.", -10),
                ]),
        "e3": E("Com a reposição, o potássio está em 3,8 mEq/L. Glicemia ainda 400 mg/dL.",
                V(106, "110x70", 98, 26, "taqui-sinusal"), [
                    A("Insulina regular IV contínua 0,1 U/kg/h", "e4",
                      "Certo. Insulina em bomba, mantendo K+ entre 4 e 5 com reposição.", 10),
                    A("Insulina NPH SC em dose alta", "f-parcial",
                      "Inadequado. Absorção imprevisível no desidratado; prefira IV.", -5),
                    A("Não usar insulina: a glicemia já cai com soro", "f-ruim",
                      "Perigoso. Sem insulina, a cetose não resolve.", -10),
                ]),
        "e4": E("Horas depois: glicemia 240 mg/dL, pH 7,25 e bicarbonato 14. Ainda há acidose.",
                V(96, "116x72", 98, 22, "sinusal"), [
                    A("Associar SG 5% e manter a insulina IV", "f-bom",
                      "Certo. A glicose evita hipoglicemia enquanto a insulina fecha a acidose.", 10),
                    A("Desligar a insulina IV, pois a glicemia caiu", "f-ruim",
                      "Perigoso. A acidose volta; o alvo é resolver a cetose, não a glicemia.", -10),
                    A("Passar para SC e desligar a bomba na hora", "f-parcial",
                      "Inadequado. A acidose não resolveu e falta sobreposição de 1–2 h.", -5),
                ]),
    },
    "finais": {
        "f-bom": F("bom", "A acidose resolveu em 16 h. Lucas passou para insulina SC com sobreposição e recebeu educação em diabetes."),
        "f-parcial": F("parcial", "A cetoacidose voltou e Lucas passou mais 2 dias internado."),
        "f-ruim": F("ruim", "Lucas teve arritmia grave por hipocalemia e foi para a UTI em estado crítico."),
    },
    "debriefing": [
        "Hidratação com SF 0,9% é a 1ª medida.",
        "Potássio antes da insulina: se K+ <3,5, repor e adiar a insulina.",
        "Insulina regular IV 0,1 U/kg/h; com glicemia ~250, associar soro glicosado.",
        "Bicarbonato só se pH <6,9.",
        "Resolução: pH >7,3, bicarbonato ≥15 ou ânion gap normal; sobrepor SC por 1–2 h.",
    ],
    "referencia": "ADA 2024 Hyperglycemic Crises / SBD 2025",
})

# ---------------------------------------------------------------- em-06 Asma
CASOS.append({
    "id": "em-06",
    "titulo": "Chiado que não passa",
    "paciente": "Pedro, 7 anos",
    "avatar": "crianca",
    "cenario": "Pedro tem asma e tosse há 2 dias. Hoje fala só palavras soltas e usa a musculatura do pescoço para respirar.",
    "diagnostico": "Crise asmática grave na criança",
    "inicio": "e1",
    "etapas": {
        "e1": E("Tiragem intercostal, sibilos difusos, agitado. Não consegue completar frases.",
                V(140, "100x60", 88, 44, "taqui-sinusal"), [
                    A("O2 + salbutamol/ipratrópio seriados + corticoide", "e2",
                      "Certo. Broncodilatador a cada 20 min na 1ª hora e corticoide cedo.", 10),
                    A("Radiografia de tórax antes de tratar", "e1b",
                      "Inadequado. Crise grave se trata primeiro; RX só se suspeita de complicação.", -5),
                    A("Diazepam para acalmar a criança", "e1b",
                      "Perigoso. Sedar asmático grave deprime a respiração.", -10),
                ]),
        "e1b": E("Pedro piora: mais cansado, saturação caindo.",
                 V(152, "102x62", 85, 50, "taqui-sinusal"), [
                     A("O2, salbutamol + ipratrópio e corticoide agora", "e2",
                       "Recuperou. Tratamento imediato ainda muda o desfecho.", 5),
                     A("Esperar o resultado do RX", "f-ruim",
                       "Perigoso. A criança se cansa e para de respirar.", -10),
                     A("Mais sedativo", "f-ruim",
                       "Perigoso. Pode levar à parada respiratória.", -10),
                 ]),
        "e2": E("Após 1 h de tratamento, melhora pequena. Ainda com esforço importante.",
                V(144, "104x64", 90, 42, "taqui-sinusal"), [
                    A("Sulfato de magnésio IV 40–50 mg/kg em 20 min", "e3",
                      "Certo. Crise grave sem resposta na 1ª hora: MgSO4 IV (máx. 2 g).", 10),
                    A("Aminofilina IV de rotina", "e2b",
                      "Inadequado. Pouco benefício e muitos efeitos adversos.", -5),
                    A("Antibiótico empírico", "e2b",
                      "Inadequado. Sem sinal de infecção bacteriana.", -5),
                    A("Alta com bombinha para casa", "f-ruim",
                      "Perigoso. Criança ainda em crise grave.", -10),
                ]),
        "e2b": E("Pedro está sonolento e com o tórax mais silencioso.",
                 V(158, "100x60", 87, 46, "taqui-sinusal"), [
                     A("MgSO4 IV, nebulização contínua e chamar a UTI", "e3",
                       "Recuperou. Tórax silencioso e sonolência são sinais de alarme.", 5),
                     A("Mais aminofilina", "f-ruim",
                       "Perigoso. Risco de arritmia e convulsão sem ganho.", -10),
                     A("Sedativo para dormir", "f-ruim",
                       "Perigoso. Pode causar parada respiratória.", -10),
                 ]),
        "e3": E("Uma hora após o magnésio: fala frases, saturação melhor com O2.",
                V(122, "102x62", 95, 30, "taqui-sinusal"), [
                    A("Internar, espaçar salbutamol e manter corticoide", "f-bom",
                      "Certo. Internar, espaçar inalações e planejar a alta com controle.", 10),
                    A("Alta imediata sem corticoide", "f-parcial",
                      "Inadequado. Alta cedo e sem corticoide leva à recaída.", -5),
                    A("Suspender O2 e broncodilatador agora", "f-parcial",
                      "Inadequado. A melhora ainda é recente.", -5),
                ]),
    },
    "finais": {
        "f-bom": F("bom", "Pedro teve alta em 2 dias com corticoide oral, corticoide inalatório e plano escrito para crises."),
        "f-parcial": F("parcial", "Pedro voltou em 24 h com nova crise e precisou reinternar."),
        "f-ruim": F("ruim", "Pedro evoluiu com insuficiência respiratória e precisou de intubação na UTI."),
    },
    "debriefing": [
        "Sinais de gravidade: fala palavras soltas, tiragem, SatO2 <92%, sonolência, tórax silencioso.",
        "O2 (alvo 94–98%), salbutamol a cada 20 min e ipratrópio na 1ª hora.",
        "Corticoide sistêmico na 1ª hora.",
        "Sem resposta: sulfato de magnésio IV. Evite sedativos.",
    ],
    "referencia": "GINA 2025 / SBP",
})

# ---------------------------------------------------------------- em-07 Pneumotórax hipertensivo
CASOS.append({
    "id": "em-07",
    "titulo": "Moto contra o poste",
    "paciente": "Carlos, 25 anos",
    "avatar": "homem",
    "cenario": "Motociclista bateu em um poste. Chega à sala vermelha agitado, com dor no lado esquerdo do tórax.",
    "diagnostico": "Pneumotórax hipertensivo traumático",
    "inicio": "e1",
    "etapas": {
        "e1": E("Murmúrio abolido e hipertimpanismo à esquerda, jugulares ingurgitadas, traqueia desviada à direita.",
                V(132, "78x50", 84, 36, "taqui-sinusal"), [
                    A("Descompressão imediata no 5º EIC, linha axilar média", "e2",
                      "Certo. Diagnóstico é clínico: descomprimir já, com agulha ou dedo.", 10),
                    A("Radiografia de tórax para confirmar", "e1b",
                      "Perigoso. Pneumotórax hipertensivo não espera exame de imagem.", -10),
                    A("Intubar e ventilar com pressão positiva", "e1b",
                      "Perigoso. Ventilação positiva aumenta a tensão no tórax.", -10),
                    A("Cristaloide 2 L rápido", "e1b",
                      "Inadequado. O choque é obstrutivo: volume não resolve.", -5),
                ]),
        "e1b": E("Carlos fica pálido e confuso. Pulso fino, quase sem pressão.",
                 V(148, "60x34", 76, 40, "taqui-sinusal"), [
                     A("Descomprimir o tórax agora", "e2",
                       "Recuperou no limite. A descompressão reverte o choque obstrutivo.", 5),
                     A("Continuar aguardando o RX", "f-ruim",
                       "Perigoso. Evolui para parada em AESP.", -10),
                     A("Adrenalina IV", "f-ruim",
                       "Perigoso. Não trata a causa obstrutiva.", -10),
                 ]),
        "e2": E("Saída de ar sob pressão. Carlos melhora rápido.",
                V(112, "104x66", 93, 26, "taqui-sinusal"), [
                    A("Drenagem torácica em selo d'água", "e3",
                      "Certo. A descompressão é ponte: o tratamento definitivo é o dreno.", 10),
                    A("Deixar só a agulha e mandar para a TC", "e2b",
                      "Inadequado. Agulha dobra ou sai; o pneumotórax volta.", -5),
                    A("Retirar a agulha e observar", "e2b",
                      "Inadequado. Sem dreno, a tensão se refaz.", -5),
                ]),
        "e2b": E("Minutos depois, a pressão volta a cair e a saturação despenca.",
                 V(128, "84x54", 86, 34, "taqui-sinusal"), [
                     A("Nova descompressão e dreno torácico", "e3",
                       "Recuperou. Agora com drenagem definitiva.", 5),
                     A("Observar mais um pouco", "f-ruim",
                       "Perigoso. Recidiva de hipertensivo leva à parada.", -10),
                     A("Mais volume sem drenar", "f-ruim",
                       "Perigoso. Não resolve a obstrução.", -10),
                 ]),
        "e3": E("Dreno saiu ar e 300 mL de sangue. Carlos está estável.",
                V(100, "112x70", 96, 20, "sinusal"), [
                    A("Reavaliar ABCDE, RX de controle, e-FAST e analgesia", "f-bom",
                      "Certo. Reavaliação primária completa após cada intervenção.", 10),
                    A("Clampear o dreno para evitar perda de sangue", "f-ruim",
                      "Perigoso. Dreno clampeado pode recriar o hipertensivo.", -10),
                    A("Alta em 2 horas", "f-parcial",
                      "Inadequado. Trauma torácico com dreno exige internação.", -5),
                ]),
    },
    "finais": {
        "f-bom": F("bom", "Carlos ficou 4 dias com dreno, o pulmão expandiu e ele teve alta sem outras lesões graves."),
        "f-parcial": F("parcial", "Carlos voltou com o pulmão colabado e precisou de nova drenagem."),
        "f-ruim": F("ruim", "Sem descompressão a tempo, Carlos evoluiu para parada em AESP."),
    },
    "debriefing": [
        "Pneumotórax hipertensivo é diagnóstico clínico: não espere RX.",
        "Adulto: descompressão no 4º–5º EIC, linha axilar média (ou toracostomia digital).",
        "O tratamento definitivo é a drenagem torácica em selo d'água.",
        "Ventilação com pressão positiva piora o hipertensivo não drenado.",
    ],
    "referencia": "ATLS 10ª edição",
})

# ---------------------------------------------------------------- em-08 AVC isquêmico
CASOS.append({
    "id": "em-08",
    "titulo": "Fala enrolada de repente",
    "paciente": "Dona Tereza, 68 anos",
    "avatar": "idosa",
    "cenario": "Às 14h a família viu a boca torta e fraqueza no braço direito. Estava bem às 13h30. Chega às 14h40.",
    "diagnostico": "AVC isquêmico agudo (artéria cerebral média esquerda)",
    "inicio": "e1",
    "etapas": {
        "e1": E("Afasia, hemiparesia direita. NIHSS 10. Pulso irregular. Último momento bem: 13h30.",
                V(92, "196x108", 96, 18, "fa"), [
                    A("Glicemia capilar e TC de crânio sem contraste já", "e2",
                      "Certo. Excluir hipoglicemia e sangramento o mais rápido possível.", 10),
                    A("Nifedipino sublingual para baixar a PA", "e1b",
                      "Perigoso. Queda brusca da PA amplia a área isquêmica.", -10),
                    A("AAS 300 mg antes da TC", "e1b",
                      "Perigoso. Sem TC, pode ser hemorragia; e contraindica trombólise.", -10),
                    A("Aguardar coagulograma antes da TC", "e1b",
                      "Inadequado. Sem anticoagulante em uso, não se espera exame.", -5),
                ]),
        "e1b": E("Tempo perdido: o déficit piorou e agora são 15h40.",
                 V(96, "188x104", 95, 18, "fa"), [
                     A("Glicemia e TC de crânio agora", "e2",
                       "Recuperou. Ainda dentro da janela de 4,5 h.", 5),
                     A("Esperar a família trazer os exames antigos", "f-ruim",
                       "Perigoso. Tempo é cérebro.", -10),
                     A("Heparina plena empírica", "f-ruim",
                       "Perigoso. Não é tratamento do AVC agudo e aumenta sangramento.", -10),
                 ]),
        "e2": E("TC sem sangramento. Glicemia 132. Pressão ainda alta.",
                V(94, "196x108", 96, 18, "fa"), [
                    A("Anti-hipertensivo IV até PA <185x110", "e3",
                      "Certo. Para trombolisar, a PA deve estar abaixo de 185x110.", 10),
                    A("Trombolisar com a PA 196x108", "f-ruim",
                      "Perigoso. PA acima do limite aumenta o risco de hemorragia.", -10),
                    A("Desistir da trombólise pela PA alta", "f-parcial",
                      "Inadequado. PA alta se controla; não é motivo para perder a janela.", -5),
                ]),
        "e3": E("PA 176x98 após anti-hipertensivo IV. São 2h45 do início dos sintomas.",
                V(90, "176x98", 96, 18, "fa"), [
                    A("Trombólise IV e angio-TC para trombectomia", "e4",
                      "Certo. Trombolítico na janela de 4,5 h e busca de oclusão de grande vaso.", 10),
                    A("Esperar ressonância para confirmar", "e3b",
                      "Inadequado. TC sem sangramento basta para trombolisar.", -5),
                    A("AAS e heparina em vez da trombólise", "f-parcial",
                      "Inadequado. Perde o benefício da reperfusão.", -5),
                ]),
        "e3b": E("A ressonância atrasou 1 hora. Já são 3h50 do início.",
                 V(92, "178x100", 96, 18, "fa"), [
                     A("Trombolisar agora e pedir angio-TC", "e4",
                       "Recuperou. Ainda na janela, mas com menos benefício.", 5),
                     A("Esperar laudo formal da ressonância", "f-parcial",
                       "Inadequado. A janela de 4,5 h se fecha.", -10),
                     A("Iniciar AAS e internar", "f-parcial",
                       "Inadequado. Perde a reperfusão.", -5),
                 ]),
        "e4": E("Angio-TC: oclusão da artéria cerebral média esquerda (M1). Trombolítico infundido.",
                V(88, "170x94", 96, 18, "fa"), [
                    A("Trombectomia e PA <180x105 nas 24 h", "f-bom",
                      "Certo. Oclusão de grande vaso: trombectomia soma benefício.", 10),
                    A("AAS e heparina logo após a trombólise", "f-ruim",
                      "Perigoso. Antitrombóticos só após 24 h e TC de controle.", -10),
                    A("Deixar a PA livre após a trombólise", "f-ruim",
                      "Perigoso. PA >180x105 após trombólise aumenta hemorragia.", -10),
                ]),
    },
    "finais": {
        "f-bom": F("bom", "Após a trombectomia, a fala voltou. Dona Tereza iniciou anticoagulação pela FA no tempo certo e teve alta andando."),
        "f-parcial": F("parcial", "Dona Tereza sobreviveu, mas ficou com afasia e fraqueza do braço direito."),
        "f-ruim": F("ruim", "Dona Tereza teve transformação hemorrágica e ficou com sequelas graves."),
    },
    "debriefing": [
        "Glicemia e TC sem contraste imediatas; o horário que vale é o último momento bem.",
        "Trombólise IV até 4,5 h com PA <185x110 antes e <180x105 nas 24 h seguintes.",
        "Oclusão de grande vaso: trombectomia mecânica, mesmo após trombólise.",
        "Sem antitrombóticos nas 24 h após trombólise. Não baixar PA com nifedipino SL.",
    ],
    "referencia": "AHA/ASA AVC isquêmico agudo 2026 / SBDCV / Linha de cuidado AVC – MS",
})

# ---------------------------------------------------------------- em-09 HPP
CASOS.append({
    "id": "em-09",
    "titulo": "Sangramento após o parto",
    "paciente": "Joana, 30 anos",
    "avatar": "gestante",
    "cenario": "Parto vaginal há 20 minutos, placenta saiu completa. Sangramento vaginal volumoso e contínuo.",
    "diagnostico": "Hemorragia pós-parto por atonia uterina",
    "inicio": "e1",
    "etapas": {
        "e1": E("Útero amolecido acima da cicatriz umbilical. Perda estimada de 800 mL. Índice de choque 1,3.",
                V(118, "90x58", 97, 22, "taqui-sinusal"), [
                    A("Pedir ajuda, massagem uterina, ocitocina IV, 2 acessos", "e2",
                      "Certo. Hora de ouro: medidas simultâneas e rápidas.", 10),
                    A("Aguardar para ver se o sangramento para", "e1b",
                      "Perigoso. A hemorragia pós-parto mata em poucas horas.", -10),
                    A("Só soro e observar", "e1b",
                      "Inadequado. Sem uterotônico, o útero continua atônico.", -5),
                ]),
        "e1b": E("Perda já de 1.500 mL. Joana está pálida e sonolenta.",
                 V(136, "76x44", 96, 26, "taqui-sinusal"), [
                     A("Massagem, ocitocina, ácido tranexâmico e sangue", "e2b",
                       "Recuperou. Tudo ao mesmo tempo, com protocolo de transfusão.", 5),
                     A("Aguardar o hemograma", "f-ruim",
                       "Perigoso. Transfusão na HPP grave é decisão clínica.", -10),
                     A("Dopamina para subir a pressão", "f-ruim",
                       "Perigoso. O choque é hemorrágico: precisa de sangue.", -10),
                 ]),
        "e2": E("Ocitocina em curso. O útero contrai parcialmente, mas o sangramento continua.",
                V(122, "88x54", 97, 22, "taqui-sinusal"), [
                    A("Ácido tranexâmico 1 g IV em 10 minutos", "e3",
                      "Certo. Até 3 h do parto, reduz morte por sangramento.", 10),
                    A("Suspender a ocitocina: não funcionou", "e2b",
                      "Inadequado. Mantenha a ocitocina e associe outras medidas.", -5),
                    A("Esperar a hemoglobina para decidir", "e2b",
                      "Inadequado. A hemoglobina cai tarde na hemorragia aguda.", -5),
                ]),
        "e2b": E("O sangramento continua. Pressão caindo, extremidades frias.",
                 V(132, "80x48", 96, 24, "taqui-sinusal"), [
                     A("Ácido tranexâmico IV e hemoderivados", "e3",
                       "Recuperou. Tranexâmico cedo e reposição com sangue.", 5),
                     A("Cristaloide 4 L sem hemoderivados", "f-ruim",
                       "Perigoso. Excesso de cristaloide piora a coagulopatia.", -10),
                     A("Esperar a próxima avaliação", "f-ruim",
                       "Perigoso. Cada minuto conta.", -10),
                 ]),
        "e3": E("Ainda há sangramento moderado com útero pouco contraído. Joana não é hipertensa.",
                V(120, "90x56", 97, 22, "taqui-sinusal"), [
                    A("Metilergometrina ou misoprostol; balão se persistir", "e4",
                      "Certo. Uterotônicos de 2ª linha e tamponamento com balão.", 10),
                    A("Histerectomia imediata como primeira medida", "f-parcial",
                      "Inadequado. Cirurgia vem após falha das medidas menos invasivas.", -5),
                    A("Mais cristaloide e nada mais", "f-ruim",
                      "Perigoso. Não trata a atonia.", -10),
                ]),
        "e4": E("Útero bem contraído, sangramento cessou. Joana está mais corada.",
                V(98, "102x64", 98, 18, "sinusal"), [
                    A("Monitorar, manter ocitocina e rever os 4 Ts", "f-bom",
                      "Certo. Vigilância intensiva e busca de trauma, tecido e coagulopatia.", 10),
                    A("Enfermaria comum sem monitorização", "f-parcial",
                      "Inadequado. Risco de novo sangramento nas próximas horas.", -5),
                    A("Alta em 6 horas", "f-parcial",
                      "Inadequado. HPP grave exige observação prolongada.", -5),
                ]),
    },
    "finais": {
        "f-bom": F("bom", "Joana recebeu 2 bolsas de sangue, não precisou de cirurgia e foi para casa com o bebê em 3 dias."),
        "f-parcial": F("parcial", "Joana sobreviveu, mas precisou de reintervenção e UTI."),
        "f-ruim": F("ruim", "Joana evoluiu com choque hemorrágico grave e coagulopatia. Uma morte materna evitável."),
    },
    "debriefing": [
        "Causas: 4 Ts – tônus (atonia, a mais comum), trauma, tecido e trombina.",
        "Atonia: massagem uterina bimanual e ocitocina IV imediatas.",
        "Ácido tranexâmico 1 g IV em 10 min nas primeiras 3 h; pode repetir.",
        "Índice de choque (FC/PAS) ≥1 sinaliza perda grave: pense em transfusão.",
        "2ª linha: metilergometrina (evitar se hipertensa), misoprostol, balão.",
    ],
    "referencia": "OMS 2023 HPP / MS – Estratégia Zero Morte Materna por Hemorragia (OPAS)",
})

# ---------------------------------------------------------------- em-10 Botrópico
CASOS.append({
    "id": "em-10",
    "titulo": "Picada no roçado",
    "paciente": "Seu Benedito, 55 anos",
    "avatar": "homem",
    "cenario": "Agricultor ribeirinho picado no pé por cobra há 2 h, no roçado. A família amarrou um pano apertado na perna.",
    "diagnostico": "Acidente botrópico (jararaca) moderado",
    "inicio": "e1",
    "etapas": {
        "e1": E("Pé e perna inchados até o joelho, dor intensa, gengiva sangrando. Tempo de coagulação: incoagulável.",
                V(104, "132x84", 97, 20, "taqui-sinusal"), [
                    A("Retirar o garrote, hidratar e soro antibotrópico IV", "e2",
                      "Certo. O soro específico IV é o tratamento; garrote piora a lesão.", 10),
                    A("Cortar e sugar o local da picada", "e1b",
                      "Perigoso. Aumenta sangramento e infecção, sem remover veneno.", -10),
                    A("Manter o garrote e aguardar exames", "e1b",
                      "Perigoso. Garrote concentra o veneno e favorece necrose.", -10),
                    A("Soro antiveneno só se piorar", "e1b",
                      "Inadequado. Já há sangramento e edema: soro indicado agora.", -5),
                ]),
        "e1b": E("Uma hora depois: mais sangramento, urina escura e pouca diurese.",
                 V(118, "100x62", 96, 22, "taqui-sinusal"), [
                     A("Tirar o garrote, soro antibotrópico IV e hidratar", "e2",
                       "Recuperou. Ainda há tempo de neutralizar o veneno circulante.", 5),
                     A("Plasma fresco sem soro antiveneno", "f-ruim",
                       "Perigoso. O veneno consome os fatores de novo.", -10),
                     A("Transferir sem aplicar o soro", "f-ruim",
                       "Perigoso. O soro deve ser dado onde houver.", -10),
                 ]),
        "e2": E("Durante a infusão do soro, surgem placas vermelhas e coceira. Sem hipotensão.",
                V(112, "124x78", 96, 22, "taqui-sinusal"), [
                    A("Pausar, tratar a reação e reiniciar o soro", "e3",
                      "Certo. Trate a reação (adrenalina se anafilaxia) e complete o soro.", 10),
                    A("Suspender o soro definitivamente", "e2b",
                      "Perigoso. Sem a dose completa, o envenenamento progride.", -10),
                    A("Ignorar e acelerar a infusão", "e2b",
                      "Inadequado. A reação pode evoluir para anafilaxia.", -5),
                ]),
        "e2b": E("O sangramento gengival persiste e a diurese está baixa.",
                 V(116, "104x66", 95, 22, "taqui-sinusal"), [
                     A("Controlar a reação e completar o soro", "e3",
                       "Recuperou. A dose completa é essencial.", 5),
                     A("Transfundir plasma sem soro", "f-ruim",
                       "Perigoso. Não neutraliza o veneno.", -10),
                     A("Aguardar melhora espontânea", "f-ruim",
                       "Perigoso. Risco de lesão renal e hemorragia grave.", -10),
                 ]),
        "e3": E("Soro completo. Dor e edema importantes no membro; diurese ainda limítrofe.",
                V(98, "122x76", 97, 18, "sinusal"), [
                    A("Hidratar, elevar o membro, analgesia e TC em 24 h", "f-bom",
                      "Certo. Diurese adequada protege o rim; TC mostra a resposta ao soro.", 10),
                    A("Anti-inflamatório (AINE) para a dor", "f-parcial",
                      "Inadequado. AINE piora o risco renal e de sangramento.", -5),
                    A("Antibiótico profilático de rotina", "f-parcial",
                      "Inadequado. Antibiótico só se houver infecção ou abscesso.", -5),
                ]),
    },
    "finais": {
        "f-bom": F("bom", "Em 24 h a coagulação normalizou, a função renal foi preservada e Seu Benedito voltou ao roçado sem sequelas."),
        "f-parcial": F("parcial", "Seu Benedito teve lesão renal e abscesso na perna, com internação prolongada."),
        "f-ruim": F("ruim", "Sem soro a tempo, Seu Benedito evoluiu com insuficiência renal e hemorragia grave."),
    },
    "debriefing": [
        "Não usar garrote, não cortar nem sugar. Elevar o membro e hidratar.",
        "Soro antibotrópico IV conforme gravidade: leve 3, moderado 6, grave 12 ampolas (MS).",
        "Tempo de coagulação guia o diagnóstico e o controle (repetir em 24 h).",
        "Reação ao soro: pausar, tratar e completar a dose. Pré-medicação não é rotina.",
    ],
    "referencia": "MS – Guia de Vigilância em Saúde / Manual de acidentes por animais peçonhentos",
})

# ---------------------------------------------------------------- em-11 Dengue grave
CASOS.append({
    "id": "em-11",
    "titulo": "Quinto dia de febre",
    "paciente": "Luana, 24 anos",
    "avatar": "mulher",
    "cenario": "Manaus, época de chuvas. Febre há 5 dias que passou ontem. Hoje: dor abdominal forte, vômitos e tontura ao levantar.",
    "diagnostico": "Dengue grave com choque (grupo D)",
    "inicio": "e1",
    "etapas": {
        "e1": E("Extremidades frias, enchimento capilar lento, pulso fino. Pressão convergente.",
                V(124, "90x78", 97, 24, "taqui-sinusal"), [
                    A("SF 0,9% 20 mL/kg em 20 min e hematócrito", "e2",
                      "Certo. Grupo D: expansão rápida e reavaliação contínua.", 10),
                    A("Hidratação oral e retorno em 24 h", "e1b",
                      "Perigoso. Com sinais de choque, a hidratação é venosa e imediata.", -10),
                    A("Dipirona e aguardar o hemograma", "e1b",
                      "Inadequado. O choque se trata antes do resultado.", -5),
                    A("Anti-inflamatório para a dor", "e1b",
                      "Perigoso. AINE e AAS são contraindicados na dengue.", -10),
                ]),
        "e1b": E("Uma hora depois: pulso quase impalpável, sonolenta, sem urinar.",
                 V(138, "80x70", 96, 26, "taqui-sinusal"), [
                     A("SF 0,9% 20 mL/kg em 20 min e leito de UTI", "e2",
                       "Recuperou. Choque na dengue responde bem ao volume precoce.", 5),
                     A("Transfundir plaquetas", "f-ruim",
                       "Perigoso. Plaquetopenia não é a causa do choque.", -10),
                     A("Aguardar a sorologia", "f-ruim",
                       "Perigoso. O diagnóstico é clínico; o choque não espera.", -10),
                 ]),
        "e2": E("Após a 1ª expansão, melhora pequena. Hematócrito 48% (subiu). Plaquetas 30 mil, sem sangramento.",
                V(128, "94x74", 97, 24, "taqui-sinusal"), [
                    A("Repetir 20 mL/kg e reavaliar (até 3 vezes)", "e3",
                      "Certo. Hematócrito subindo indica extravasamento: mais volume.", 10),
                    A("Transfundir plaquetas", "e2b",
                      "Perigoso. Sem sangramento, não há indicação.", -10),
                    A("Parar o soro: já recebeu volume", "e2b",
                      "Inadequado. Ainda em choque, precisa de nova expansão.", -5),
                ]),
        "e2b": E("A pressão cai de novo e a diurese não aparece.",
                 V(140, "78x68", 96, 26, "taqui-sinusal"), [
                     A("Nova expansão 20 mL/kg e UTI", "e3",
                       "Recuperou. Volume e vigilância intensiva.", 5),
                     A("Furosemida para fazer urinar", "f-ruim",
                       "Perigoso. Diurético no choque piora a perfusão.", -10),
                     A("Mais plaquetas", "f-ruim",
                       "Perigoso. Não trata o extravasamento plasmático.", -10),
                 ]),
        "e3": E("Após nova expansão: pulso cheio, diurese presente. Hematócrito 42%.",
                V(96, "108x70", 98, 20, "sinusal"), [
                    A("Reduzir o soro aos poucos e reavaliar", "f-bom",
                      "Certo. Passe à manutenção (grupo C), com reavaliação clínica e de hematócrito.", 10),
                    A("Manter expansão rápida por horas", "f-parcial",
                      "Inadequado. Excesso de volume causa derrames e edema pulmonar.", -5),
                    A("Suspender o soro e dar alta", "f-ruim",
                      "Perigoso. A fase crítica ainda não acabou.", -10),
                ]),
    },
    "finais": {
        "f-bom": F("bom", "Luana passou a fase crítica em 48 h, reabsorveu o líquido e teve alta com orientações."),
        "f-parcial": F("parcial", "Luana teve derrame pleural e congestão pulmonar e precisou de UTI."),
        "f-ruim": F("ruim", "O choque se prolongou e Luana evoluiu com falência de órgãos."),
    },
    "debriefing": [
        "Defervescência (dias 3–7) é a fase crítica: atenção aos sinais de alarme.",
        "Choque (grupo D): SF 0,9% 20 mL/kg em 20 min, até 3 vezes, com reavaliação.",
        "Hematócrito subindo = extravasamento; caindo com choque = pense em sangramento.",
        "Plaquetas não se transfundem por número. Nada de AAS ou AINE.",
    ],
    "referencia": "MS – Dengue: diagnóstico e manejo clínico, 2024",
})

# ---------------------------------------------------------------- em-12 Hipercalemia
CASOS.append({
    "id": "em-12",
    "titulo": "Fraqueza no paciente renal",
    "paciente": "Seu Antônio, 70 anos",
    "avatar": "idoso",
    "cenario": "Seu Antônio faz hemodiálise e faltou às duas últimas sessões. Chega com fraqueza nas pernas e mal-estar.",
    "diagnostico": "Hipercalemia grave com alteração eletrocardiográfica",
    "inicio": "e1",
    "etapas": {
        "e1": E("Potássio 7,8 mEq/L. ECG: onda T apiculada, QRS largo e frequência baixa.",
                V(44, "100x60", 95, 18, "bradi"), [
                    A("Gluconato de cálcio 10% IV", "e2",
                      "Certo. Cálcio estabiliza a membrana do miocárdio em minutos.", 10),
                    A("Resina de troca oral e aguardar", "e1b",
                      "Inadequado. Age em horas; o ECG exige ação imediata.", -5),
                    A("Repetir o potássio para confirmar", "e1b",
                      "Perigoso. ECG alterado já confirma a urgência.", -10),
                ]),
        "e1b": E("O QRS alarga ainda mais e a frequência cai.",
                 V(32, "78x44", 93, 18, "bradi"), [
                     A("Gluconato de cálcio 10% IV agora", "e2",
                       "Recuperou. Cálcio primeiro, sempre que o ECG estiver alterado.", 5),
                     A("Esperar o resultado do novo potássio", "f-ruim",
                       "Perigoso. Evolui para FV ou assistolia.", -10),
                     A("Bicarbonato IV isolado", "f-ruim",
                       "Perigoso. Efeito fraco e lento sem acidose importante.", -10),
                 ]),
        "e2": E("O QRS estreitou e a frequência subiu. O potássio ainda é 7,8.",
                V(62, "110x68", 96, 18, "sinusal"), [
                    A("Insulina regular 10 U IV + glicose e salbutamol", "e3",
                      "Certo. Desloca o potássio para dentro das células.", 10),
                    A("Considerar resolvido: o ECG melhorou", "e2b",
                      "Perigoso. O cálcio protege, mas não baixa o potássio e dura pouco.", -10),
                    A("Furosemida IV em paciente anúrico", "e2b",
                      "Inadequado. Sem diurese, não há efeito.", -5),
                ]),
        "e2b": E("Trinta minutos depois, o QRS volta a alargar.",
                 V(48, "96x58", 95, 18, "bradi"), [
                     A("Repetir cálcio e fazer insulina + glicose", "e3",
                       "Recuperou. Cálcio pode ser repetido; agora desloque o potássio.", 5),
                     A("Não fazer nada", "f-ruim",
                       "Perigoso. Risco de parada.", -10),
                     A("Só resina de troca oral", "f-ruim",
                       "Perigoso. Lenta demais para o momento.", -10),
                 ]),
        "e3": E("Uma hora depois: potássio 6,4 mEq/L e ECG melhor. Glicemia 110.",
                V(76, "118x72", 97, 16, "sinusal"), [
                    A("Hemodiálise de urgência e vigiar glicemia", "f-bom",
                      "Certo. Diálise remove o potássio; insulina pode causar hipoglicemia.", 10),
                    A("Alta: o potássio caiu", "f-ruim",
                      "Perigoso. O efeito da insulina passa e o potássio volta a subir.", -10),
                    A("Só resina e observar", "f-parcial",
                      "Inadequado. No dialítico, o tratamento definitivo é a diálise.", -5),
                ]),
    },
    "finais": {
        "f-bom": F("bom", "Após a diálise, o potássio foi a 4,6 e o ECG normalizou. Seu Antônio voltou à rotina de sessões."),
        "f-parcial": F("parcial", "O potássio voltou a subir e Seu Antônio precisou de diálise de urgência à noite."),
        "f-ruim": F("ruim", "Seu Antônio evoluiu com fibrilação ventricular e parada cardíaca."),
    },
    "debriefing": [
        "Hipercalemia com ECG alterado: cálcio IV primeiro, repetir se o ECG não melhora.",
        "Deslocar K+ para a célula: insulina regular 10 U IV com glicose e salbutamol.",
        "Remover K+: hemodiálise (dialítico), diurético ou resinas.",
        "Vigie a glicemia após insulina: risco de hipoglicemia.",
    ],
    "referencia": "KDIGO / AHA 2025 – situações especiais do ACLS",
})


# =============================================================== validação
LIM = {"cenario": 220, "etapa": 240, "txt": 70, "nota": 160, "final": 240, "deb": 160}
RE_PA = re.compile(r"^(\d{1,3})x(\d{1,3})$")


def validar(casos):
    erros = []
    ids = set()
    if len(casos) != 12:
        erros.append(f"esperados 12 casos, há {len(casos)}")
    for c in casos:
        cid = c["id"]
        err = lambda m: erros.append(f"{cid}: {m}")  # noqa: E731
        if cid in ids:
            err("id duplicado")
        ids.add(cid)
        for k in ("titulo", "paciente", "avatar", "cenario", "diagnostico",
                  "inicio", "etapas", "finais", "debriefing", "referencia"):
            if not c.get(k):
                err(f"campo vazio: {k}")
        if c["avatar"] not in AVATARES:
            err(f"avatar inválido {c['avatar']}")
        if len(c["cenario"]) > LIM["cenario"]:
            err(f"cenario {len(c['cenario'])} car.")
        et, fi = c["etapas"], c["finais"]
        if not 4 <= len(et) <= 7:
            err(f"{len(et)} etapas (esperado 4–7)")
        if not 2 <= len(fi) <= 3:
            err(f"{len(fi)} finais (esperado 2–3)")
        if set(et) & set(fi):
            err("chave repetida entre etapas e finais")
        if c["inicio"] not in et:
            err("inicio não é etapa")
        tipos = set()
        for fk, f in fi.items():
            tipos.add(f["tipo"])
            if f["tipo"] not in TIPOS_FINAL:
                err(f"{fk}: tipo inválido")
            if len(f["texto"]) > LIM["final"]:
                err(f"{fk}: texto {len(f['texto'])} car.")
        if "bom" not in tipos or "ruim" not in tipos:
            err("precisa de final bom e ruim")
        if not 3 <= len(c["debriefing"]) <= 5:
            err("debriefing deve ter 3–5 itens")
        for d in c["debriefing"]:
            if len(d) > LIM["deb"]:
                err(f"debriefing {len(d)} car.: {d[:40]}")
        for ek, e in et.items():
            if len(e["texto"]) > LIM["etapa"]:
                err(f"{ek}: texto {len(e['texto'])} car.")
            v = e["vitais"]
            if set(v) != {"FC", "PA", "SatO2", "FR", "ritmo"}:
                err(f"{ek}: vitais incompletos")
                continue
            m = RE_PA.match(v["PA"])
            if not m:
                err(f"{ek}: PA mal formatada")
                continue
            pas, pad = int(m.group(1)), int(m.group(2))
            if v["ritmo"] not in RITMOS:
                err(f"{ek}: ritmo {v['ritmo']}")
            if v["ritmo"] in SEM_PULSO:
                if (v["FC"], pas, pad, v["SatO2"], v["FR"]) != (0, 0, 0, 0, 0):
                    err(f"{ek}: ritmo sem pulso com vitais não zerados")
            else:
                if not 20 <= v["FC"] <= 250:
                    err(f"{ek}: FC {v['FC']}")
                if not (40 <= pas <= 260 and 20 <= pad <= 160 and pas > pad):
                    err(f"{ek}: PA incoerente {v['PA']}")
                if not 50 <= v["SatO2"] <= 100:
                    err(f"{ek}: SatO2 {v['SatO2']}")
                if not 6 <= v["FR"] <= 70:
                    err(f"{ek}: FR {v['FR']}")
            if v["ritmo"] == "taqui-sinusal" and v["FC"] <= 100:
                err(f"{ek}: taqui-sinusal com FC {v['FC']}")
            if v["ritmo"] == "sinusal" and not 50 <= v["FC"] <= 100:
                err(f"{ek}: sinusal com FC {v['FC']}")
            if v["ritmo"] == "bradi" and v["FC"] >= 60:
                err(f"{ek}: bradi com FC {v['FC']}")
            if not 3 <= len(e["acoes"]) <= 4:
                err(f"{ek}: {len(e['acoes'])} ações")
            if max(a["pontos"] for a in e["acoes"]) <= 0:
                err(f"{ek}: nenhuma ação positiva")
            for a in e["acoes"]:
                if a["vai"] not in et and a["vai"] not in fi:
                    err(f"{ek}: vai inexistente {a['vai']}")
                if a["vai"] == ek:
                    err(f"{ek}: ação aponta para a própria etapa")
                if a["pontos"] not in PONTOS:
                    err(f"{ek}: pontos {a['pontos']}")
                if len(a["txt"]) > LIM["txt"]:
                    err(f"{ek}: txt {len(a['txt'])} car.: {a['txt']}")
                if len(a["nota"]) > LIM["nota"]:
                    err(f"{ek}: nota {len(a['nota'])} car.")
        # grafo: ciclos (DFS com cores), alcance, finais alcançáveis
        filhos = {k: [a["vai"] for a in e["acoes"]] for k, e in et.items()}
        cor = {}

        def dfs(n):
            cor[n] = 1
            for f in filhos.get(n, []):
                if f in fi:
                    continue
                if cor.get(f) == 1:
                    err(f"ciclo em {n}->{f}")
                elif f not in cor:
                    dfs(f)
            cor[n] = 2

        if c["inicio"] in et:
            dfs(c["inicio"])
        naoalc = set(et) - set(cor)
        if naoalc:
            err(f"etapas inalcançáveis: {sorted(naoalc)}")
        alc_fin = {f for k in cor for f in filhos[k] if f in fi}
        if set(fi) - alc_fin:
            err(f"finais inalcançáveis: {sorted(set(fi) - alc_fin)}")

        # finais bons alcançáveis de cada etapa
        memo = {}

        def chega_bom(n):
            if n in fi:
                return fi[n]["tipo"] == "bom"
            if n not in memo:
                memo[n] = False
                memo[n] = any(chega_bom(f) for f in filhos[n])
            return memo[n]

        recup = any(a["pontos"] < 0 and a["vai"] in et and chega_bom(a["vai"])
                    for e in et.values() for a in e["acoes"])
        if not recup:
            err("sem caminho de recuperação após erro")
        if not chega_bom(c["inicio"]):
            err("final bom inalcançável")
    return erros


def main():
    erros = validar(CASOS)
    if erros:
        print("ERROS:")
        for e in erros:
            print(" -", e)
        sys.exit(1)
    destino = os.path.join(os.path.dirname(os.path.abspath(__file__)), "emergencias.json")
    with open(destino, "w", encoding="utf-8") as fh:
        json.dump(CASOS, fh, ensure_ascii=False, indent=1)
        fh.write("\n")
    print(f"OK: {len(CASOS)} casos -> {destino}")
    for c in CASOS:
        print(f"  {c['id']}  {c['titulo']:<38} etapas={len(c['etapas'])} finais={len(c['finais'])}  [{c['diagnostico']}]")


if __name__ == "__main__":
    main()
