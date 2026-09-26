#!/usr/bin/env python3
"""ecg.py — gera traçados de ECG DIDÁTICOS (simulados) em SVG, no papel milimetrado padrão
(25 mm/s, 10 mm/mV). Cada batimento é soma de gaussianas (P, Q, R, S, T); arritmias são montadas
controlando os intervalos. Saída: curriculos/dados/imagens/<id>.svg + imagens.json (legendas)."""
import json, math, random, pathlib
import numpy as np
OUT = pathlib.Path(__file__).resolve().parents[2] / "dados" / "imagens"
FS = 500                        # amostras por segundo
MM_S, MM_MV = 25, 10            # velocidade do papel e ganho

def g(t, c, a, w): return a * np.exp(-((t - c) ** 2) / (2 * w ** 2))

def batimento(t, t0, pr=0.16, qrs=0.09, p=0.15, r=1.2, q=-0.1, s=-0.25, tamp=0.3, st=0.0, qt=0.40, delta=False, largo=False, tpontudo=False, sem_p=False):
    """Soma um complexo com início da onda P em t0 (s)."""
    y = np.zeros_like(t)
    if not sem_p: y += g(t, t0 + 0.05, p, 0.022)
    tq = t0 + pr                             # início do QRS
    k = qrs / 0.09
    if delta:                                 # onda delta: rampa lenta no início do QRS
        y += np.clip((t - (tq - 0.04)) / 0.06, 0, 1) * (t < tq + 0.03) * 0.45
    y += g(t, tq + 0.012 * k, q, 0.008 * k) + g(t, tq + 0.04 * k, r, 0.012 * k * (1.9 if largo else 1)) + g(t, tq + 0.07 * k, s, 0.012 * k)
    jt = tq + qrs                             # ponto J
    if st: y += st * ((t > jt) & (t < tq + qt - 0.08)) * 1.0 + g(t, jt, st * 0.4, 0.01)
    tw = 0.028 if tpontudo else 0.045
    y += g(t, tq + qt - 0.09, tamp + (st * 0.7 if st > 0 else 0), tw)
    return y

def base(dur): t = np.arange(0, dur, 1 / FS); return t, np.zeros_like(t)

def svg(t, y, titulo, derivacao="DII", altura_mm=40, ruido=0.012, extra_lbl=None):
    """Papel milimetrado + traçado. y em mV."""
    random.seed(1); y = np.where(t < 0.45, 0, y) + np.random.default_rng(7).normal(0, ruido, len(y))   # 0,45 s iniciais livres para a calibração
    L = t[-1] * MM_S; H = altura_mm; mid = H * 0.6
    pts = " ".join(f"{x * MM_S:.1f},{mid - v * MM_MV:.1f}" for x, v in zip(t[::3], y[::3]))
    cal = f'<path class="tr" d="M0 {mid}h2v-10h5v10h2"/>'   # calibração 1 mV = 10 mm
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {L:.1f} {H}" role="img" aria-label="{titulo}" class="ecg">'
            f'<defs><pattern id="mm" width="1" height="1" patternUnits="userSpaceOnUse"><path class="fino" d="M1 0V1M0 1H1" fill="none"/></pattern><pattern id="cm" width="5" height="5" patternUnits="userSpaceOnUse"><rect width="5" height="5" fill="url(#mm)"/><path class="grosso" d="M5 0V5M0 5H5" fill="none"/></pattern></defs>'
            f'<rect width="100%" height="100%" class="pap"/><rect width="100%" height="100%" fill="url(#cm)"/>{cal}'
            f'<text x="13" y="5" class="lbl">{derivacao}</text><polyline class="tr" points="{pts}"/></svg>')

def ritmo(rr, dur=10, **kw):
    t, y = base(dur); x = 0.3
    for i in range(200):
        if x > dur - 0.2: break
        r = rr[i % len(rr)] if isinstance(rr, list) else rr
        y += batimento(t, x, **(kw(i) if callable(kw) else kw)) if not callable(kw) else batimento(t, x, **kw(i))
        x += r
    return t, y

def estrip(nome, **kw):
    t, y = base(10); x = 0.3; return t, y

TRACADOS = {}
def reg(id_, titulo, legenda, t, y, deriv="DII"):
    (OUT / f"{id_}.svg").write_text(svg(t, y, titulo, deriv))
    TRACADOS[id_] = {"titulo": titulo, "legenda": legenda, "tipo": "ecg", "credito": "Traçado didático simulado (Gabarito AM), 25 mm/s, 10 mm/mV"}

rng = np.random.default_rng(3)
# 1 Ritmo sinusal normal 75 bpm
t, y = base(10); x = .55
while x < 9.8: y += batimento(t, x); x += 0.8
reg("ecg-sinusal", "Ritmo sinusal normal", "Ondas P positivas antes de cada QRS, PR constante de 0,16 s, QRS estreito e RR regular de 0,80 s (FC 75 bpm).", t, y)
# 2 Taquicardia sinusal 125
t, y = base(10); x = .55
while x < 9.8: y += batimento(t, x, pr=0.14, qt=0.32); x += 0.48
reg("ecg-taqui-sinusal", "Taquicardia sinusal", "Ritmo regular com P sinusal antes de cada QRS e FC de cerca de 125 bpm (RR 0,48 s).", t, y)
# 3 Bradicardia sinusal 45
t, y = base(10); x = .6
while x < 9.8: y += batimento(t, x, qt=0.44); x += 1.33
reg("ecg-bradi-sinusal", "Bradicardia sinusal", "Ritmo regular com P sinusal antes de cada QRS, PR normal e FC de cerca de 45 bpm (RR 1,33 s).", t, y)
# 4 FA
t, y = base(10); x = .55
y += 0.05 * np.sin(2 * np.pi * 6.3 * t) + 0.04 * np.sin(2 * np.pi * 8.9 * t + 1) + 0.03 * np.sin(2 * np.pi * 5.1 * t + 2)
while x < 9.7: y += batimento(t, x, sem_p=True, qt=0.34); x += float(rng.uniform(0.38, 0.95))
reg("ecg-fa", "Fibrilação atrial", "Ausência de ondas P, linha de base com ondas fibrilatórias finas e intervalos RR irregularmente irregulares; QRS estreito.", t, y)
# 5 Flutter 4:1
t, y = base(10)
saw = 0.25 * (2 * ((t * 5) % 1) - 1) * -1          # ondas F a 300/min (0,2 s)
y += saw; x = .25
while x < 9.8: y += batimento(t, x, sem_p=True, qt=0.36); x += 0.8
reg("ecg-flutter", "Flutter atrial com condução 4:1", "Ondas F em 'dente de serrote' a cerca de 300/min, com um QRS a cada quatro ondas F (FC ventricular 75 bpm).", t, y)
# 6 BAV 1º
t, y = base(10); x = .55
while x < 9.6: y += batimento(t, x, pr=0.32, qt=0.42); x += 0.92
reg("ecg-bav1", "Bloqueio atrioventricular de 1º grau", "Toda P é seguida de QRS, mas o intervalo PR está fixo e prolongado (0,32 s, acima de 0,20 s).", t, y)
# 7 Wenckebach
t, y = base(10); x = .5; prs = [0.16, 0.26, 0.34, None]; i = 0
while x < 9.6:
    pr = prs[i % 4]
    if pr is None: y += g(t, x + 0.05, 0.15, 0.022)
    else: y += batimento(t, x, pr=pr)
    x += 0.8; i += 1
reg("ecg-wenckebach", "BAV de 2º grau Mobitz I (Wenckebach)", "O PR aumenta progressivamente (0,16 → 0,26 → 0,34 s) até que uma onda P não conduz (QRS ausente); depois o ciclo recomeça.", t, y)
# 8 Mobitz II
t, y = base(10); x = .55; i = 0
while x < 9.6:
    if i % 3 == 2: y += g(t, x + 0.05, 0.15, 0.022)
    else: y += batimento(t, x, pr=0.18, qrs=0.13, largo=True)
    x += 0.8; i += 1
reg("ecg-mobitz2", "BAV de 2º grau Mobitz II", "PR constante nos batimentos conduzidos e ondas P bloqueadas de repente, sem alongamento prévio do PR; QRS largo sugere bloqueio infra-hissiano.", t, y)
# 9 BAVT
t, y = base(10); x = .55
while x < 9.8: y += g(t, x + 0.05, 0.15, 0.022); x += 0.66     # P a ~90/min
x = .55
while x < 9.6: y += batimento(t, x, sem_p=True, pr=0, qrs=0.14, largo=True, r=1.0, s=-0.4, tamp=-0.35, qt=0.46); x += 1.55   # QRS ~39/min
reg("ecg-bavt", "Bloqueio atrioventricular total (3º grau)", "Ondas P regulares (~90/min) e QRS largos regulares (~40/min) sem relação entre si: dissociação atrioventricular com escape ventricular.", t, y)
# 10 TV
t, y = base(10); x = .5
while x < 9.8:
    tq = x; y += g(t, tq + 0.06, 1.3, 0.035) + g(t, tq + 0.15, -0.6, 0.04) + g(t, tq + 0.26, -0.35, 0.05); x += 0.35
reg("ecg-tv", "Taquicardia ventricular monomórfica", "Taquicardia regular de QRS largo (> 0,12 s) a cerca de 170 bpm, com complexos iguais entre si e sem ondas P relacionadas.", t, y)
# 11 FV
t, y = base(10)
env = 0.4 + 0.25 * np.sin(2 * np.pi * 0.35 * t)
y += env * (np.sin(2 * np.pi * 5.2 * t + np.sin(2 * np.pi * 1.1 * t) * 2) + 0.4 * np.sin(2 * np.pi * 7.7 * t))
reg("ecg-fv", "Fibrilação ventricular", "Ondulações caóticas de amplitude e frequência variáveis, sem QRS, ondas P ou T identificáveis.", t, y)
# 12 Torsades
t, y = base(10); f = 4.2
env = 0.15 + 0.95 * np.abs(np.sin(2 * np.pi * 0.2 * t)); ph = 2 * np.pi * f * t
y += env * (np.sin(ph) + 0.55 * np.sin(2 * ph)) * np.sign(np.cos(2 * np.pi * 0.2 * t) + 1e-9)   # pontas para cima e, após cada nó, para baixo
reg("ecg-torsades", "Torsades de pointes", "Taquicardia ventricular polimórfica com QRS que 'giram' em torno da linha de base, amplitude crescente e decrescente em fusos.", t, y)
# 13 WPW
t, y = base(10); x = .55
while x < 9.8: y += batimento(t, x, pr=0.10, qrs=0.12, delta=True); x += 0.8
reg("ecg-wpw", "Pré-excitação ventricular (Wolff-Parkinson-White)", "PR curto (0,10 s), onda delta (empastamento inicial do QRS) e QRS alargado (0,12 s), com ritmo sinusal.", t, y)
# 14 Hipercalemia
t, y = base(10); x = .55
while x < 9.8: y += batimento(t, x, p=0.07, qrs=0.13, tamp=0.95, tpontudo=True, qt=0.38); x += 0.8
reg("ecg-hipercalemia", "Hipercalemia", "Ondas T altas, estreitas e pontiagudas ('em tenda'), P achatada e QRS alargado, sinais progressivos de potássio elevado.", t, y)
# 15 Bigeminismo
t, y = base(10); x = .55; i = 0
while x < 9.6:
    if i % 2 == 0: y += batimento(t, x); x += 0.55
    else:
        tq = x + 0.05; y += g(t, tq + 0.05, 1.4, 0.03) + g(t, tq + 0.14, -0.5, 0.04) + g(t, tq + 0.33, -0.45, 0.06); x += 1.05
    i += 1
reg("ecg-bigeminismo", "Extrassístoles ventriculares em bigeminismo", "Alternância de um batimento sinusal normal com uma extrassístole ventricular precoce, de QRS largo e bizarro, sem P precedente e com pausa compensatória.", t, y)
# 16 Supra ST
t, y = base(10); x = .55
while x < 9.8: y += batimento(t, x, st=0.3, tamp=0.35); x += 0.85
reg("ecg-supra-st", "Supradesnivelamento do segmento ST", "Elevação do ponto J e do segmento ST de cerca de 3 mm (0,3 mV), convexa para cima e contínua com a onda T, em ritmo sinusal.", t, y)

(OUT / "imagens.json").write_text(json.dumps(TRACADOS, ensure_ascii=False, indent=1))
print(len(TRACADOS), "traçados em", OUT)
