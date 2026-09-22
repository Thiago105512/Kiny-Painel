window.PED = window.PED || {}; var PED = window.PED; PED.data = PED.data || {};
// Escore-z (desvios-padrão) das curvas de crescimento da OMS – WHO Child Growth Standards 2006 (0–5 anos)
// e WHO Growth Reference 2007 (5–19 anos, apenas cortes de classificação). Tabelas usadas na Caderneta
// da Criança (Ministério da Saúde) e no SISVAN para classificação do estado nutricional.
// Peso em kg; comprimento/estatura e perímetro cefálico em cm; IMC em kg/m².

PED.data.zscore = {
  aproximado: true,
  nota: 'Valores de referência aproximados das tabelas de escore-z da OMS (2006/2007). Confirmar nas curvas oficiais da Caderneta da Criança antes de decisões de classificação nutricional.',
  // Cada índice tem M (meninos) e F (meninas); cada linha traz os pontos de corte em escore-z
  // (sd3neg = −3 DP, sd2neg = −2 DP, sd1neg = −1 DP, sd0 = mediana, sd1 = +1 DP, sd2 = +2 DP, sd3 = +3 DP).
  indices: {
    // Peso para idade (kg) – OMS 2006, 0 a 60 meses
    pesoIdade: {
      M: [
        { meses: 0, sd3neg: 2.1, sd2neg: 2.5, sd1neg: 2.9, sd0: 3.3, sd1: 3.9, sd2: 4.4, sd3: 5.0 },
        { meses: 1, sd3neg: 2.9, sd2neg: 3.4, sd1neg: 3.9, sd0: 4.5, sd1: 5.1, sd2: 5.8, sd3: 6.6 },
        { meses: 2, sd3neg: 3.8, sd2neg: 4.3, sd1neg: 4.9, sd0: 5.6, sd1: 6.3, sd2: 7.1, sd3: 8.0 },
        { meses: 3, sd3neg: 4.4, sd2neg: 5.0, sd1neg: 5.7, sd0: 6.4, sd1: 7.2, sd2: 8.0, sd3: 9.0 },
        { meses: 4, sd3neg: 4.9, sd2neg: 5.6, sd1neg: 6.2, sd0: 7.0, sd1: 7.8, sd2: 8.7, sd3: 9.7 },
        { meses: 6, sd3neg: 5.7, sd2neg: 6.4, sd1neg: 7.1, sd0: 7.9, sd1: 8.8, sd2: 9.8, sd3: 10.9 },
        { meses: 9, sd3neg: 6.4, sd2neg: 7.1, sd1neg: 8.0, sd0: 8.9, sd1: 9.9, sd2: 11.0, sd3: 12.3 },
        { meses: 12, sd3neg: 6.9, sd2neg: 7.7, sd1neg: 8.6, sd0: 9.6, sd1: 10.8, sd2: 12.0, sd3: 13.3 },
        { meses: 15, sd3neg: 7.4, sd2neg: 8.3, sd1neg: 9.2, sd0: 10.3, sd1: 11.5, sd2: 12.8, sd3: 14.3 },
        { meses: 18, sd3neg: 7.8, sd2neg: 8.8, sd1neg: 9.8, sd0: 10.9, sd1: 12.2, sd2: 13.7, sd3: 15.3 },
        { meses: 24, sd3neg: 8.6, sd2neg: 9.7, sd1neg: 10.8, sd0: 12.2, sd1: 13.6, sd2: 15.3, sd3: 17.1 },
        { meses: 30, sd3neg: 9.4, sd2neg: 10.5, sd1neg: 11.8, sd0: 13.3, sd1: 15.0, sd2: 16.9, sd3: 19.0 },
        { meses: 36, sd3neg: 10.0, sd2neg: 11.3, sd1neg: 12.7, sd0: 14.3, sd1: 16.2, sd2: 18.3, sd3: 20.7 },
        { meses: 42, sd3neg: 10.6, sd2neg: 12.0, sd1neg: 13.6, sd0: 15.3, sd1: 17.4, sd2: 19.7, sd3: 22.4 },
        { meses: 48, sd3neg: 11.2, sd2neg: 12.7, sd1neg: 14.4, sd0: 16.3, sd1: 18.6, sd2: 21.2, sd3: 24.2 },
        { meses: 54, sd3neg: 11.8, sd2neg: 13.4, sd1neg: 15.2, sd0: 17.3, sd1: 19.8, sd2: 22.7, sd3: 26.0 },
        { meses: 60, sd3neg: 12.4, sd2neg: 14.1, sd1neg: 16.0, sd0: 18.3, sd1: 21.0, sd2: 24.2, sd3: 27.9 }
      ],
      F: [
        { meses: 0, sd3neg: 2.0, sd2neg: 2.4, sd1neg: 2.8, sd0: 3.2, sd1: 3.7, sd2: 4.2, sd3: 4.8 },
        { meses: 1, sd3neg: 2.7, sd2neg: 3.2, sd1neg: 3.6, sd0: 4.2, sd1: 4.8, sd2: 5.5, sd3: 6.2 },
        { meses: 2, sd3neg: 3.4, sd2neg: 3.9, sd1neg: 4.5, sd0: 5.1, sd1: 5.8, sd2: 6.6, sd3: 7.5 },
        { meses: 3, sd3neg: 4.0, sd2neg: 4.5, sd1neg: 5.2, sd0: 5.8, sd1: 6.6, sd2: 7.5, sd3: 8.5 },
        { meses: 4, sd3neg: 4.4, sd2neg: 5.0, sd1neg: 5.7, sd0: 6.4, sd1: 7.3, sd2: 8.2, sd3: 9.3 },
        { meses: 6, sd3neg: 5.1, sd2neg: 5.7, sd1neg: 6.5, sd0: 7.3, sd1: 8.2, sd2: 9.3, sd3: 10.6 },
        { meses: 9, sd3neg: 5.8, sd2neg: 6.5, sd1neg: 7.3, sd0: 8.2, sd1: 9.3, sd2: 10.5, sd3: 12.0 },
        { meses: 12, sd3neg: 6.3, sd2neg: 7.0, sd1neg: 7.9, sd0: 8.9, sd1: 10.1, sd2: 11.5, sd3: 13.1 },
        { meses: 15, sd3neg: 6.7, sd2neg: 7.6, sd1neg: 8.5, sd0: 9.6, sd1: 10.9, sd2: 12.4, sd3: 14.1 },
        { meses: 18, sd3neg: 7.2, sd2neg: 8.1, sd1neg: 9.1, sd0: 10.2, sd1: 11.6, sd2: 13.2, sd3: 15.1 },
        { meses: 24, sd3neg: 8.1, sd2neg: 9.0, sd1neg: 10.2, sd0: 11.5, sd1: 13.0, sd2: 14.8, sd3: 17.0 },
        { meses: 30, sd3neg: 8.9, sd2neg: 10.0, sd1neg: 11.2, sd0: 12.7, sd1: 14.4, sd2: 16.5, sd3: 19.0 },
        { meses: 36, sd3neg: 9.6, sd2neg: 10.8, sd1neg: 12.2, sd0: 13.9, sd1: 15.8, sd2: 18.1, sd3: 20.9 },
        { meses: 42, sd3neg: 10.3, sd2neg: 11.6, sd1neg: 13.1, sd0: 15.0, sd1: 17.2, sd2: 19.8, sd3: 23.0 },
        { meses: 48, sd3neg: 10.9, sd2neg: 12.3, sd1neg: 14.0, sd0: 16.1, sd1: 18.5, sd2: 21.5, sd3: 25.2 },
        { meses: 54, sd3neg: 11.5, sd2neg: 13.0, sd1neg: 14.9, sd0: 17.2, sd1: 19.9, sd2: 23.2, sd3: 27.4 },
        { meses: 60, sd3neg: 12.1, sd2neg: 13.7, sd1neg: 15.8, sd0: 18.2, sd1: 21.2, sd2: 24.9, sd3: 29.5 }
      ]
    },
    // Estatura para idade (cm) – comprimento deitado até 24 meses, altura em pé a partir de 24 meses
    estaturaIdade: {
      M: [
        { meses: 0, sd3neg: 44.2, sd2neg: 46.1, sd1neg: 48.0, sd0: 49.9, sd1: 51.8, sd2: 53.7, sd3: 55.6 },
        { meses: 1, sd3neg: 48.9, sd2neg: 50.8, sd1neg: 52.8, sd0: 54.7, sd1: 56.7, sd2: 58.6, sd3: 60.6 },
        { meses: 2, sd3neg: 52.4, sd2neg: 54.4, sd1neg: 56.4, sd0: 58.4, sd1: 60.4, sd2: 62.4, sd3: 64.4 },
        { meses: 3, sd3neg: 55.3, sd2neg: 57.3, sd1neg: 59.4, sd0: 61.4, sd1: 63.5, sd2: 65.5, sd3: 67.6 },
        { meses: 4, sd3neg: 57.6, sd2neg: 59.7, sd1neg: 61.8, sd0: 63.9, sd1: 66.0, sd2: 68.0, sd3: 70.1 },
        { meses: 6, sd3neg: 61.2, sd2neg: 63.3, sd1neg: 65.5, sd0: 67.6, sd1: 69.8, sd2: 71.9, sd3: 74.0 },
        { meses: 9, sd3neg: 65.2, sd2neg: 67.5, sd1neg: 69.7, sd0: 72.0, sd1: 74.2, sd2: 76.5, sd3: 78.7 },
        { meses: 12, sd3neg: 68.6, sd2neg: 71.0, sd1neg: 73.4, sd0: 75.7, sd1: 78.1, sd2: 80.5, sd3: 82.9 },
        { meses: 15, sd3neg: 71.6, sd2neg: 74.1, sd1neg: 76.6, sd0: 79.1, sd1: 81.7, sd2: 84.2, sd3: 86.7 },
        { meses: 18, sd3neg: 74.2, sd2neg: 76.9, sd1neg: 79.6, sd0: 82.3, sd1: 85.0, sd2: 87.7, sd3: 90.4 },
        { meses: 24, sd3neg: 78.0, sd2neg: 81.0, sd1neg: 84.1, sd0: 87.1, sd1: 90.2, sd2: 93.2, sd3: 96.3 },
        { meses: 30, sd3neg: 81.7, sd2neg: 85.1, sd1neg: 88.5, sd0: 91.9, sd1: 95.3, sd2: 98.7, sd3: 102.1 },
        { meses: 36, sd3neg: 85.0, sd2neg: 88.7, sd1neg: 92.4, sd0: 96.1, sd1: 99.8, sd2: 103.5, sd3: 107.2 },
        { meses: 42, sd3neg: 88.0, sd2neg: 91.9, sd1neg: 95.9, sd0: 99.9, sd1: 103.8, sd2: 107.8, sd3: 111.7 },
        { meses: 48, sd3neg: 90.7, sd2neg: 94.9, sd1neg: 99.1, sd0: 103.3, sd1: 107.5, sd2: 111.7, sd3: 115.9 },
        { meses: 54, sd3neg: 93.4, sd2neg: 97.8, sd1neg: 102.3, sd0: 106.7, sd1: 111.1, sd2: 115.5, sd3: 119.9 },
        { meses: 60, sd3neg: 96.1, sd2neg: 100.7, sd1neg: 105.3, sd0: 110.0, sd1: 114.6, sd2: 119.2, sd3: 123.9 }
      ],
      F: [
        { meses: 0, sd3neg: 43.6, sd2neg: 45.4, sd1neg: 47.3, sd0: 49.1, sd1: 51.0, sd2: 52.9, sd3: 54.7 },
        { meses: 1, sd3neg: 47.8, sd2neg: 49.8, sd1neg: 51.7, sd0: 53.7, sd1: 55.6, sd2: 57.6, sd3: 59.5 },
        { meses: 2, sd3neg: 51.0, sd2neg: 53.0, sd1neg: 55.0, sd0: 57.1, sd1: 59.1, sd2: 61.1, sd3: 63.2 },
        { meses: 3, sd3neg: 53.5, sd2neg: 55.6, sd1neg: 57.7, sd0: 59.8, sd1: 61.9, sd2: 64.0, sd3: 66.1 },
        { meses: 4, sd3neg: 55.6, sd2neg: 57.8, sd1neg: 59.9, sd0: 62.1, sd1: 64.3, sd2: 66.4, sd3: 68.6 },
        { meses: 6, sd3neg: 58.9, sd2neg: 61.2, sd1neg: 63.5, sd0: 65.7, sd1: 68.0, sd2: 70.3, sd3: 72.5 },
        { meses: 9, sd3neg: 62.9, sd2neg: 65.3, sd1neg: 67.7, sd0: 70.1, sd1: 72.6, sd2: 75.0, sd3: 77.4 },
        { meses: 12, sd3neg: 66.3, sd2neg: 68.9, sd1neg: 71.4, sd0: 74.0, sd1: 76.6, sd2: 79.2, sd3: 81.7 },
        { meses: 15, sd3neg: 69.3, sd2neg: 72.0, sd1neg: 74.8, sd0: 77.5, sd1: 80.2, sd2: 83.0, sd3: 85.7 },
        { meses: 18, sd3neg: 72.0, sd2neg: 74.9, sd1neg: 77.8, sd0: 80.7, sd1: 83.6, sd2: 86.5, sd3: 89.4 },
        { meses: 24, sd3neg: 76.0, sd2neg: 79.3, sd1neg: 82.5, sd0: 85.7, sd1: 88.9, sd2: 92.2, sd3: 95.4 },
        { meses: 30, sd3neg: 80.1, sd2neg: 83.6, sd1neg: 87.1, sd0: 90.7, sd1: 94.2, sd2: 97.7, sd3: 101.3 },
        { meses: 36, sd3neg: 83.6, sd2neg: 87.4, sd1neg: 91.2, sd0: 95.1, sd1: 98.9, sd2: 102.7, sd3: 106.5 },
        { meses: 42, sd3neg: 86.8, sd2neg: 90.9, sd1neg: 95.0, sd0: 99.0, sd1: 103.1, sd2: 107.2, sd3: 111.2 },
        { meses: 48, sd3neg: 89.8, sd2neg: 94.1, sd1neg: 98.4, sd0: 102.7, sd1: 107.0, sd2: 111.3, sd3: 115.7 },
        { meses: 54, sd3neg: 92.6, sd2neg: 97.1, sd1neg: 101.6, sd0: 106.2, sd1: 110.7, sd2: 115.2, sd3: 119.8 },
        { meses: 60, sd3neg: 95.2, sd2neg: 99.9, sd1neg: 104.7, sd0: 109.4, sd1: 114.2, sd2: 118.9, sd3: 123.7 }
      ]
    },
    // Peso para comprimento/estatura (kg), 45 a 110 cm – base da classificação de desnutrição aguda.
    // Tabela de peso para COMPRIMENTO (OMS 0–2 anos, criança deitada); a tabela de peso para altura
    // (criança em pé, a partir de 2 anos) tem valores ligeiramente menores para a mesma medida.
    pesoEstatura: {
      M: [
        { cm: 45, sd3neg: 1.9, sd2neg: 2.0, sd1neg: 2.2, sd0: 2.4, sd1: 2.7, sd2: 3.0, sd3: 3.3 },
        { cm: 50, sd3neg: 2.6, sd2neg: 2.8, sd1neg: 3.0, sd0: 3.3, sd1: 3.6, sd2: 4.0, sd3: 4.4 },
        { cm: 55, sd3neg: 3.6, sd2neg: 3.8, sd1neg: 4.2, sd0: 4.5, sd1: 5.0, sd2: 5.4, sd3: 6.0 },
        { cm: 60, sd3neg: 4.7, sd2neg: 5.1, sd1neg: 5.5, sd0: 6.0, sd1: 6.5, sd2: 7.1, sd3: 7.8 },
        { cm: 65, sd3neg: 5.7, sd2neg: 6.2, sd1neg: 6.7, sd0: 7.3, sd1: 7.9, sd2: 8.6, sd3: 9.4 },
        { cm: 70, sd3neg: 6.6, sd2neg: 7.2, sd1neg: 7.8, sd0: 8.4, sd1: 9.2, sd2: 10.0, sd3: 10.9 },
        { cm: 75, sd3neg: 7.5, sd2neg: 8.1, sd1neg: 8.8, sd0: 9.5, sd1: 10.3, sd2: 11.3, sd3: 12.3 },
        { cm: 80, sd3neg: 8.2, sd2neg: 8.9, sd1neg: 9.6, sd0: 10.4, sd1: 11.4, sd2: 12.4, sd3: 13.6 },
        { cm: 85, sd3neg: 9.1, sd2neg: 9.8, sd1neg: 10.6, sd0: 11.5, sd1: 12.5, sd2: 13.6, sd3: 14.9 },
        { cm: 90, sd3neg: 10.1, sd2neg: 10.9, sd1neg: 11.8, sd0: 12.7, sd1: 13.8, sd2: 15.0, sd3: 16.4 },
        { cm: 95, sd3neg: 11.0, sd2neg: 11.9, sd1neg: 12.8, sd0: 13.9, sd1: 15.1, sd2: 16.4, sd3: 17.9 },
        { cm: 100, sd3neg: 12.0, sd2neg: 12.9, sd1neg: 14.0, sd0: 15.2, sd1: 16.5, sd2: 18.0, sd3: 19.6 },
        { cm: 105, sd3neg: 13.0, sd2neg: 14.1, sd1neg: 15.3, sd0: 16.6, sd1: 18.1, sd2: 19.8, sd3: 21.7 },
        { cm: 110, sd3neg: 14.2, sd2neg: 15.4, sd1neg: 16.8, sd0: 18.3, sd1: 20.0, sd2: 21.9, sd3: 24.1 }
      ],
      F: [
        { cm: 45, sd3neg: 1.9, sd2neg: 2.1, sd1neg: 2.3, sd0: 2.5, sd1: 2.7, sd2: 3.0, sd3: 3.3 },
        { cm: 50, sd3neg: 2.6, sd2neg: 2.8, sd1neg: 3.1, sd0: 3.4, sd1: 3.7, sd2: 4.0, sd3: 4.5 },
        { cm: 55, sd3neg: 3.5, sd2neg: 3.8, sd1neg: 4.2, sd0: 4.5, sd1: 5.0, sd2: 5.5, sd3: 6.1 },
        { cm: 60, sd3neg: 4.5, sd2neg: 4.9, sd1neg: 5.4, sd0: 5.9, sd1: 6.4, sd2: 7.1, sd3: 7.8 },
        { cm: 65, sd3neg: 5.5, sd2neg: 5.9, sd1neg: 6.5, sd0: 7.1, sd1: 7.8, sd2: 8.6, sd3: 9.5 },
        { cm: 70, sd3neg: 6.3, sd2neg: 6.9, sd1neg: 7.5, sd0: 8.2, sd1: 9.0, sd2: 9.9, sd3: 10.9 },
        { cm: 75, sd3neg: 7.1, sd2neg: 7.7, sd1neg: 8.4, sd0: 9.1, sd1: 10.0, sd2: 11.0, sd3: 12.2 },
        { cm: 80, sd3neg: 7.8, sd2neg: 8.5, sd1neg: 9.2, sd0: 10.1, sd1: 11.0, sd2: 12.1, sd3: 13.4 },
        { cm: 85, sd3neg: 8.7, sd2neg: 9.4, sd1neg: 10.3, sd0: 11.2, sd1: 12.3, sd2: 13.5, sd3: 14.9 },
        { cm: 90, sd3neg: 9.7, sd2neg: 10.5, sd1neg: 11.4, sd0: 12.5, sd1: 13.7, sd2: 15.0, sd3: 16.5 },
        { cm: 95, sd3neg: 10.6, sd2neg: 11.5, sd1neg: 12.6, sd0: 13.7, sd1: 15.0, sd2: 16.5, sd3: 18.2 },
        { cm: 100, sd3neg: 11.6, sd2neg: 12.6, sd1neg: 13.7, sd0: 15.0, sd1: 16.5, sd2: 18.1, sd3: 20.0 },
        { cm: 105, sd3neg: 12.7, sd2neg: 13.8, sd1neg: 15.1, sd0: 16.5, sd1: 18.2, sd2: 20.0, sd3: 22.2 },
        { cm: 110, sd3neg: 14.0, sd2neg: 15.3, sd1neg: 16.7, sd0: 18.3, sd1: 20.2, sd2: 22.3, sd3: 24.7 }
      ]
    },
    // IMC para idade (kg/m²) – até 24 meses calculado com o comprimento; a partir de 24 meses com a altura em pé
    imcIdade: {
      M: [
        { meses: 0, sd3neg: 10.2, sd2neg: 11.1, sd1neg: 12.2, sd0: 13.4, sd1: 14.8, sd2: 16.3, sd3: 18.1 },
        { meses: 1, sd3neg: 11.3, sd2neg: 12.4, sd1neg: 13.6, sd0: 14.9, sd1: 16.3, sd2: 17.8, sd3: 19.4 },
        { meses: 2, sd3neg: 12.5, sd2neg: 13.7, sd1neg: 15.0, sd0: 16.3, sd1: 17.8, sd2: 19.4, sd3: 21.1 },
        { meses: 3, sd3neg: 13.1, sd2neg: 14.3, sd1neg: 15.5, sd0: 16.9, sd1: 18.4, sd2: 20.0, sd3: 21.8 },
        { meses: 4, sd3neg: 13.4, sd2neg: 14.5, sd1neg: 15.8, sd0: 17.2, sd1: 18.7, sd2: 20.3, sd3: 22.1 },
        { meses: 6, sd3neg: 13.6, sd2neg: 14.7, sd1neg: 16.0, sd0: 17.3, sd1: 18.8, sd2: 20.5, sd3: 22.3 },
        { meses: 9, sd3neg: 13.6, sd2neg: 14.7, sd1neg: 15.8, sd0: 17.2, sd1: 18.6, sd2: 20.3, sd3: 22.1 },
        { meses: 12, sd3neg: 13.4, sd2neg: 14.4, sd1neg: 15.5, sd0: 16.8, sd1: 18.2, sd2: 19.8, sd3: 21.6 },
        { meses: 15, sd3neg: 13.1, sd2neg: 14.1, sd1neg: 15.2, sd0: 16.4, sd1: 17.8, sd2: 19.4, sd3: 21.2 },
        { meses: 18, sd3neg: 12.9, sd2neg: 13.9, sd1neg: 14.9, sd0: 16.1, sd1: 17.5, sd2: 19.0, sd3: 20.8 },
        { meses: 24, sd3neg: 12.9, sd2neg: 13.8, sd1neg: 14.8, sd0: 16.0, sd1: 17.3, sd2: 18.9, sd3: 20.6 },
        { meses: 30, sd3neg: 12.6, sd2neg: 13.6, sd1neg: 14.6, sd0: 15.8, sd1: 17.1, sd2: 18.6, sd3: 20.2 },
        { meses: 36, sd3neg: 12.4, sd2neg: 13.4, sd1neg: 14.4, sd0: 15.6, sd1: 16.9, sd2: 18.4, sd3: 20.0 },
        { meses: 42, sd3neg: 12.2, sd2neg: 13.2, sd1neg: 14.3, sd0: 15.4, sd1: 16.8, sd2: 18.2, sd3: 19.8 },
        { meses: 48, sd3neg: 12.1, sd2neg: 13.1, sd1neg: 14.1, sd0: 15.3, sd1: 16.7, sd2: 18.2, sd3: 19.9 },
        { meses: 54, sd3neg: 12.0, sd2neg: 13.0, sd1neg: 14.0, sd0: 15.3, sd1: 16.6, sd2: 18.2, sd3: 20.0 },
        { meses: 60, sd3neg: 12.0, sd2neg: 12.9, sd1neg: 14.0, sd0: 15.2, sd1: 16.6, sd2: 18.3, sd3: 20.3 }
      ],
      F: [
        { meses: 0, sd3neg: 10.1, sd2neg: 11.1, sd1neg: 12.2, sd0: 13.3, sd1: 14.6, sd2: 16.1, sd3: 17.7 },
        { meses: 1, sd3neg: 10.8, sd2neg: 12.0, sd1neg: 13.2, sd0: 14.6, sd1: 16.0, sd2: 17.5, sd3: 19.1 },
        { meses: 2, sd3neg: 11.8, sd2neg: 13.0, sd1neg: 14.3, sd0: 15.8, sd1: 17.3, sd2: 19.0, sd3: 20.7 },
        { meses: 3, sd3neg: 12.4, sd2neg: 13.6, sd1neg: 14.9, sd0: 16.4, sd1: 17.9, sd2: 19.7, sd3: 21.5 },
        { meses: 4, sd3neg: 12.7, sd2neg: 13.9, sd1neg: 15.2, sd0: 16.7, sd1: 18.3, sd2: 20.0, sd3: 22.0 },
        { meses: 6, sd3neg: 13.0, sd2neg: 14.1, sd1neg: 15.5, sd0: 16.9, sd1: 18.5, sd2: 20.3, sd3: 22.3 },
        { meses: 9, sd3neg: 12.9, sd2neg: 14.1, sd1neg: 15.3, sd0: 16.7, sd1: 18.3, sd2: 20.1, sd3: 22.1 },
        { meses: 12, sd3neg: 12.7, sd2neg: 13.8, sd1neg: 15.0, sd0: 16.4, sd1: 17.9, sd2: 19.6, sd3: 21.6 },
        { meses: 15, sd3neg: 12.5, sd2neg: 13.5, sd1neg: 14.7, sd0: 16.0, sd1: 17.5, sd2: 19.2, sd3: 21.1 },
        { meses: 18, sd3neg: 12.3, sd2neg: 13.3, sd1neg: 14.4, sd0: 15.7, sd1: 17.2, sd2: 18.8, sd3: 20.8 },
        { meses: 24, sd3neg: 12.4, sd2neg: 13.3, sd1neg: 14.4, sd0: 15.7, sd1: 17.1, sd2: 18.7, sd3: 20.6 },
        { meses: 30, sd3neg: 12.3, sd2neg: 13.2, sd1neg: 14.3, sd0: 15.5, sd1: 16.9, sd2: 18.5, sd3: 20.4 },
        { meses: 36, sd3neg: 12.1, sd2neg: 13.1, sd1neg: 14.2, sd0: 15.4, sd1: 16.8, sd2: 18.4, sd3: 20.3 },
        { meses: 42, sd3neg: 12.0, sd2neg: 12.9, sd1neg: 14.0, sd0: 15.3, sd1: 16.8, sd2: 18.4, sd3: 20.4 },
        { meses: 48, sd3neg: 11.8, sd2neg: 12.8, sd1neg: 14.0, sd0: 15.3, sd1: 16.8, sd2: 18.5, sd3: 20.6 },
        { meses: 54, sd3neg: 11.7, sd2neg: 12.7, sd1neg: 13.9, sd0: 15.3, sd1: 16.8, sd2: 18.7, sd3: 20.8 },
        { meses: 60, sd3neg: 11.6, sd2neg: 12.7, sd1neg: 13.9, sd0: 15.3, sd1: 16.9, sd2: 18.8, sd3: 21.1 }
      ]
    },
    // Perímetro cefálico para idade (cm) – OMS 2007, 0 a 36 meses
    perimetroCefalico: {
      M: [
        { meses: 0, sd3neg: 30.7, sd2neg: 31.9, sd1neg: 33.2, sd0: 34.5, sd1: 35.7, sd2: 37.0, sd3: 38.3 },
        { meses: 1, sd3neg: 33.8, sd2neg: 34.9, sd1neg: 36.1, sd0: 37.3, sd1: 38.4, sd2: 39.6, sd3: 40.8 },
        { meses: 2, sd3neg: 35.6, sd2neg: 36.8, sd1neg: 38.0, sd0: 39.1, sd1: 40.3, sd2: 41.5, sd3: 42.6 },
        { meses: 3, sd3neg: 37.0, sd2neg: 38.1, sd1neg: 39.3, sd0: 40.5, sd1: 41.7, sd2: 42.9, sd3: 44.1 },
        { meses: 4, sd3neg: 38.0, sd2neg: 39.2, sd1neg: 40.4, sd0: 41.6, sd1: 42.8, sd2: 44.0, sd3: 45.2 },
        { meses: 6, sd3neg: 39.7, sd2neg: 40.9, sd1neg: 42.1, sd0: 43.3, sd1: 44.6, sd2: 45.8, sd3: 47.0 },
        { meses: 9, sd3neg: 41.2, sd2neg: 42.5, sd1neg: 43.7, sd0: 45.0, sd1: 46.3, sd2: 47.5, sd3: 48.8 },
        { meses: 12, sd3neg: 42.2, sd2neg: 43.5, sd1neg: 44.8, sd0: 46.1, sd1: 47.4, sd2: 48.6, sd3: 49.9 },
        { meses: 18, sd3neg: 43.4, sd2neg: 44.7, sd1neg: 46.0, sd0: 47.4, sd1: 48.7, sd2: 50.0, sd3: 51.4 },
        { meses: 24, sd3neg: 44.2, sd2neg: 45.5, sd1neg: 46.9, sd0: 48.3, sd1: 49.6, sd2: 51.0, sd3: 52.3 },
        { meses: 30, sd3neg: 44.8, sd2neg: 46.1, sd1neg: 47.5, sd0: 48.9, sd1: 50.3, sd2: 51.7, sd3: 53.1 },
        { meses: 36, sd3neg: 45.2, sd2neg: 46.6, sd1neg: 48.0, sd0: 49.5, sd1: 50.9, sd2: 52.3, sd3: 53.7 }
      ],
      F: [
        { meses: 0, sd3neg: 30.3, sd2neg: 31.5, sd1neg: 32.7, sd0: 33.9, sd1: 35.1, sd2: 36.2, sd3: 37.4 },
        { meses: 1, sd3neg: 33.0, sd2neg: 34.2, sd1neg: 35.4, sd0: 36.5, sd1: 37.7, sd2: 38.9, sd3: 40.1 },
        { meses: 2, sd3neg: 34.6, sd2neg: 35.8, sd1neg: 37.0, sd0: 38.3, sd1: 39.5, sd2: 40.7, sd3: 41.9 },
        { meses: 3, sd3neg: 35.8, sd2neg: 37.1, sd1neg: 38.3, sd0: 39.5, sd1: 40.8, sd2: 42.0, sd3: 43.3 },
        { meses: 4, sd3neg: 36.8, sd2neg: 38.1, sd1neg: 39.3, sd0: 40.6, sd1: 41.8, sd2: 43.1, sd3: 44.4 },
        { meses: 6, sd3neg: 38.3, sd2neg: 39.6, sd1neg: 40.9, sd0: 42.2, sd1: 43.5, sd2: 44.8, sd3: 46.1 },
        { meses: 9, sd3neg: 39.8, sd2neg: 41.2, sd1neg: 42.5, sd0: 43.8, sd1: 45.2, sd2: 46.5, sd3: 47.8 },
        { meses: 12, sd3neg: 40.8, sd2neg: 42.2, sd1neg: 43.5, sd0: 44.9, sd1: 46.3, sd2: 47.6, sd3: 49.0 },
        { meses: 18, sd3neg: 42.1, sd2neg: 43.5, sd1neg: 44.9, sd0: 46.2, sd1: 47.6, sd2: 49.0, sd3: 50.4 },
        { meses: 24, sd3neg: 43.0, sd2neg: 44.4, sd1neg: 45.8, sd0: 47.2, sd1: 48.6, sd2: 50.0, sd3: 51.4 },
        { meses: 30, sd3neg: 43.7, sd2neg: 45.1, sd1neg: 46.5, sd0: 47.9, sd1: 49.3, sd2: 50.7, sd3: 52.2 },
        { meses: 36, sd3neg: 44.3, sd2neg: 45.7, sd1neg: 47.1, sd0: 48.5, sd1: 49.9, sd2: 51.3, sd3: 52.7 }
      ]
    }
  },
  classificacao: {
    pesoIdade: [
      { z: '< -3', rotulo: 'Muito baixo peso para a idade', cor: 'vermelho', conduta: 'Avaliar desnutrição aguda e crônica: medir peso para estatura, perímetro braquial (PB) e pesquisar edema bilateral. Seguir o protocolo de desnutrição do app; investigar causas orgânicas e sociais, tratar comorbidades e garantir acompanhamento mensal.' },
      { z: '-3 a < -2', rotulo: 'Baixo peso para a idade', cor: 'ambar', conduta: 'Confirmar medidas e classificar também por peso/estatura e estatura/idade. Orientação alimentar, busca de causas (infecções de repetição, verminose, insegurança alimentar), suplementação conforme protocolo e retorno em 30 dias.' },
      { z: '-2 a +2', rotulo: 'Peso adequado para a idade', cor: 'verde', conduta: 'Manter puericultura de rotina e registro na Caderneta da Criança.' },
      { z: '> +2', rotulo: 'Peso elevado para a idade', cor: 'ambar', conduta: 'Não classificar excesso de peso só por este índice: avaliar por IMC/idade ou peso/estatura.' }
    ],
    estaturaIdade: [
      { z: '< -3', rotulo: 'Muito baixa estatura para a idade', cor: 'vermelho', conduta: 'Desnutrição crônica grave (stunting). Investigar causas nutricionais, infecciosas, endócrinas e genéticas; avaliar história familiar e encaminhar para avaliação especializada.' },
      { z: '-3 a < -2', rotulo: 'Baixa estatura para a idade', cor: 'ambar', conduta: 'Desnutrição crônica (stunting). Reforçar alimentação, tratar parasitoses e anemia, corrigir determinantes sociais e monitorar velocidade de crescimento a cada 3 meses.' },
      { z: '>= -2', rotulo: 'Estatura adequada para a idade', cor: 'verde', conduta: 'Manter acompanhamento de rotina.' }
    ],
    pesoEstatura: [
      { z: '< -3', rotulo: 'Magreza acentuada (desnutrição aguda grave)', cor: 'vermelho', conduta: 'Desnutrição aguda grave. Aplicar o protocolo de desnutrição do app: teste do apetite, pesquisa de edema e de sinais de perigo; internar se complicações, edema, recusa alimentar ou idade < 6 meses. PB < 11,5 cm (6–59 meses) classifica igualmente como grave.' },
      { z: '-3 a < -2', rotulo: 'Magreza (desnutrição aguda moderada)', cor: 'ambar', conduta: 'Desnutrição aguda moderada. Suplementação alimentar, tratamento de infecções, vitamina A e antiparasitário conforme protocolo, com reavaliação em 7–15 dias. PB 11,5–12,5 cm é equivalente.' },
      { z: '-2 a +1', rotulo: 'Eutrofia', cor: 'verde', conduta: 'Manter acompanhamento de rotina e orientação alimentar.' },
      { z: '+1 a +2', rotulo: 'Risco de sobrepeso', cor: 'ambar', conduta: 'Orientar alimentação e atividade física; reavaliar em 1–3 meses.' },
      { z: '+2 a +3', rotulo: 'Sobrepeso', cor: 'ambar', conduta: 'Intervenção alimentar e de atividade física; rastrear comorbidades e acompanhar mensalmente.' },
      { z: '> +3', rotulo: 'Obesidade', cor: 'vermelho', conduta: 'Avaliação clínica ampliada (comorbidades metabólicas, causas secundárias) e encaminhamento para equipe multiprofissional.' }
    ],
    imcIdade: [
      { z: '< -3', rotulo: 'Magreza acentuada', cor: 'vermelho', conduta: 'Mesma conduta da magreza acentuada por peso/estatura: protocolo de desnutrição aguda grave.' },
      { z: '-3 a < -2', rotulo: 'Magreza', cor: 'ambar', conduta: 'Mesma conduta da magreza por peso/estatura: suporte nutricional e reavaliação precoce.' },
      { z: '-2 a +1', rotulo: 'Eutrofia', cor: 'verde', conduta: 'Manter acompanhamento de rotina.' },
      { z: '+1 a +2', rotulo: 'Risco de sobrepeso (< 5 anos) / Sobrepeso (5 a 19 anos)', cor: 'ambar', conduta: 'Cortes do SISVAN: até 5 anos incompletos este intervalo é risco de sobrepeso; de 5 a 19 anos já é sobrepeso.' },
      { z: '+2 a +3', rotulo: 'Sobrepeso (< 5 anos) / Obesidade (5 a 19 anos)', cor: 'ambar', conduta: 'Cortes do SISVAN: até 5 anos incompletos é sobrepeso; de 5 a 19 anos é obesidade.' },
      { z: '> +3', rotulo: 'Obesidade (< 5 anos) / Obesidade grave (5 a 19 anos)', cor: 'vermelho', conduta: 'Avaliação de comorbidades e encaminhamento multiprofissional.' }
    ],
    perimetroCefalico: [
      { z: '< -2', rotulo: 'Microcefalia', cor: 'vermelho', conduta: 'Confirmar a medida com fita inelástica no maior perímetro occipitofrontal, repetindo 3 vezes. Investigar infecções congênitas (STORCH, incluindo Zika), avaliar desenvolvimento neuropsicomotor e encaminhar para neuropediatria e triagem auditiva/visual.' },
      { z: '-2 a +2', rotulo: 'Perímetro cefálico adequado', cor: 'verde', conduta: 'Manter medição em toda consulta de puericultura até 2 anos.' },
      { z: '> +2', rotulo: 'Macrocefalia', cor: 'ambar', conduta: 'Comparar com o PC dos pais, avaliar fontanela, suturas, sinais de hipertensão intracraniana e desenvolvimento; ultrassonografia transfontanelar se fontanela aberta e encaminhamento se cruzamento rápido de curvas.' }
    ]
  },
  // Condutas recomendadas por faixa, referenciando o protocolo de desnutrição do app
  alertas: {
    desnutricaoGrave: 'Peso para estatura (ou IMC/idade) < −3 escore-z, PB < 11,5 cm em 6–59 meses ou edema bilateral de membros inferiores definem desnutrição aguda grave: aplicar o protocolo de desnutrição do app, fazer teste do apetite e buscar sinais de perigo. Internar se houver complicações, edema, anorexia, hipoglicemia, hipotermia, desidratação grave ou idade < 6 meses; iniciar realimentação cautelosa (risco de síndrome de realimentação), antibiótico conforme protocolo, vitamina A e correção de micronutrientes.',
    desnutricaoModerada: 'Peso para estatura (ou IMC/idade) entre −3 e −2 escore-z ou PB 11,5–12,5 cm definem desnutrição aguda moderada: manejo ambulatorial com suporte alimentar, tratamento de infecções e parasitoses, ferro e vitamina A conforme protocolo, e reavaliação em 7–15 dias. Peso/idade ou estatura/idade < −2 exigem, além disso, busca de determinantes sociais e de insegurança alimentar.',
    microcefalia: 'Perímetro cefálico < −2 escore-z para idade e sexo define microcefalia (Ministério da Saúde adota, no recém-nascido a termo, PC ≤ 30,24 cm para meninas e ≤ 30,54 cm para meninos como microcefalia grave, e ≤ 31,5 cm / ≤ 31,9 cm como triagem). Confirmar a medida, investigar infecções congênitas (incluindo Zika), avaliar neuroimagem e desenvolvimento, e notificar conforme vigilância.'
  },
  interpolacao: {
    metodo: 'Interpolação linear entre os pontos de corte de escore-z da linha de idade ou comprimento mais próxima; valores fora de -3 a +3 são extrapolados e sinalizados como aproximados.'
  },
  fontes: [
    { nome: 'WHO Child Growth Standards 2006', ano: 2006 },
    { nome: 'WHO Growth Reference 5-19 years', ano: 2007 },
    { nome: 'SISVAN / Caderneta da Criança – Ministério da Saúde', ano: 2024 }
  ],
  atualizadoEm: '2026-09'
};
