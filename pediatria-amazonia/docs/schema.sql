-- PedAmazônia – esquema relacional alvo (PostgreSQL 14+)
-- Fase 2: backend. O MVP usa localStorage com coleções homônimas (ver docs/03-banco-de-dados.md).

CREATE TYPE zona_t AS ENUM ('urbana','rural','indigena','ribeirinha');
CREATE TYPE sexo_t AS ENUM ('M','F');

-- ===================== Transacional =====================
CREATE TABLE paciente (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome             TEXT NOT NULL,
  data_nascimento  DATE NOT NULL,
  sexo             sexo_t NOT NULL,
  peso_kg          NUMERIC(5,2),
  altura_cm        NUMERIC(5,1),
  pc_cm            NUMERIC(4,1),
  prematuro        BOOLEAN DEFAULT FALSE,
  ig_nascimento_sem SMALLINT,
  alergias         TEXT,
  comorbidades     TEXT,
  medicamentos_uso TEXT,
  internacoes      TEXT,
  historico_vacinal TEXT,
  municipio        TEXT,
  zona             zona_t,
  responsavel      TEXT,
  criado_em        TIMESTAMPTZ NOT NULL DEFAULT now(),
  atualizado_em    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE atendimento (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  paciente_id   UUID NOT NULL REFERENCES paciente(id) ON DELETE CASCADE,
  queixa_id     TEXT NOT NULL,             -- FK lógica para queixa(id)
  notas         TEXT,
  profissional_id UUID,
  criado_em     TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE atendimento_sintoma  (atendimento_id UUID REFERENCES atendimento(id) ON DELETE CASCADE, sintoma_id TEXT NOT NULL, PRIMARY KEY (atendimento_id, sintoma_id));
CREATE TABLE atendimento_contexto (atendimento_id UUID REFERENCES atendimento(id) ON DELETE CASCADE, pergunta_id TEXT NOT NULL, valor TEXT, PRIMARY KEY (atendimento_id, pergunta_id));
CREATE TABLE atendimento_gravidade(atendimento_id UUID REFERENCES atendimento(id) ON DELETE CASCADE, sinal_id TEXT NOT NULL, PRIMARY KEY (atendimento_id, sinal_id));
CREATE TABLE atendimento_hipotese (id SERIAL PRIMARY KEY, atendimento_id UUID REFERENCES atendimento(id) ON DELETE CASCADE, doenca_id TEXT, nome_livre TEXT, ordem SMALLINT);
CREATE TABLE atendimento_exame    (id SERIAL PRIMARY KEY, atendimento_id UUID REFERENCES atendimento(id) ON DELETE CASCADE, exame_id TEXT NOT NULL, solicitado BOOLEAN DEFAULT TRUE, resultado TEXT);

CREATE TABLE evolucao (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  paciente_id   UUID NOT NULL REFERENCES paciente(id) ON DELETE CASCADE,
  atendimento_id UUID REFERENCES atendimento(id) ON DELETE SET NULL,
  data          TIMESTAMPTZ NOT NULL DEFAULT now(),
  peso_kg NUMERIC(5,2), temp_c NUMERIC(3,1), fc SMALLINT, fr SMALLINT, sat SMALLINT, pa TEXT,
  s TEXT, o TEXT, a TEXT, p TEXT
);

CREATE TABLE prescricao (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  paciente_id   UUID NOT NULL REFERENCES paciente(id) ON DELETE CASCADE,
  atendimento_id UUID REFERENCES atendimento(id) ON DELETE SET NULL,
  confirmada    BOOLEAN NOT NULL DEFAULT FALSE,
  emitida_em    TIMESTAMPTZ,
  orientacoes_gerais TEXT,
  retorno       TEXT,
  criado_em     TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE prescricao_item (
  id SERIAL PRIMARY KEY,
  prescricao_id UUID REFERENCES prescricao(id) ON DELETE CASCADE,
  medicamento_id TEXT, medicamento TEXT NOT NULL, apresentacao TEXT,
  dose TEXT NOT NULL, via TEXT, intervalo TEXT, horarios TEXT, duracao TEXT, orientacoes TEXT,
  calculo TEXT, fonte TEXT
);

CREATE TABLE medida (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), paciente_id UUID REFERENCES paciente(id) ON DELETE CASCADE, data DATE NOT NULL, peso_kg NUMERIC(5,2), altura_cm NUMERIC(5,1), pc_cm NUMERIC(4,1));
CREATE TABLE vacina_realizada (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), paciente_id UUID REFERENCES paciente(id) ON DELETE CASCADE, vacina_id TEXT NOT NULL, dose_index SMALLINT NOT NULL, data DATE NOT NULL, lote TEXT, UNIQUE (paciente_id, vacina_id, dose_index));

-- ===================== Conhecimento clínico =====================
CREATE TABLE fonte (id SERIAL PRIMARY KEY, nome TEXT NOT NULL, orgao TEXT, ano SMALLINT, url TEXT);

CREATE TABLE doenca (
  id TEXT PRIMARY KEY, nome TEXT NOT NULL, categoria TEXT NOT NULL, amazonia BOOLEAN DEFAULT FALSE, cid10 TEXT,
  definicao TEXT, epidemiologia TEXT, agente TEXT, transmissao TEXT, incubacao TEXT,
  manifestacoes TEXT[], sinais_alarme TEXT[], diagnostico_diferencial TEXT[], exames TEXT[],
  criterios_diagnosticos TEXT[], classificacao_gravidade JSONB, tratamento TEXT[],
  criterios_internacao TEXT[], criterios_uti TEXT[], criterios_alta TEXT[], orientacoes TEXT[], retorno TEXT, prevencao TEXT[],
  fontes JSONB, atualizado_em TEXT
);
CREATE TABLE medicamento (
  id TEXT PRIMARY KEY, nome TEXT NOT NULL, classe TEXT, indicacoes TEXT[], diluicao TEXT, infusao TEXT,
  contraindicacoes TEXT[], interacoes TEXT[], ajuste_renal TEXT, ajuste_hepatico TEXT, efeitos_adversos TEXT[],
  fontes JSONB, atualizado_em TEXT, verificar BOOLEAN DEFAULT FALSE
);
CREATE TABLE apresentacao (id SERIAL PRIMARY KEY, medicamento_id TEXT REFERENCES medicamento(id) ON DELETE CASCADE, descricao TEXT NOT NULL, mg NUMERIC, ml NUMERIC, tipo TEXT, via TEXT, reconstituicao TEXT);
CREATE TABLE esquema_dose (
  id SERIAL PRIMARY KEY, medicamento_id TEXT REFERENCES medicamento(id) ON DELETE CASCADE, indicacao TEXT NOT NULL,
  mg_kg_dose NUMERIC, mg_kg_dia NUMERIC, ml_kg_dose NUMERIC, vezes_dia SMALLINT, frequencia TEXT, via TEXT,
  dose_max_dose NUMERIC, dose_max_dia NUMERIC, duracao TEXT, faixa_etaria TEXT, obs TEXT, verificar BOOLEAN DEFAULT FALSE
);
CREATE TABLE doenca_medicamento (doenca_id TEXT REFERENCES doenca(id) ON DELETE CASCADE, medicamento_id TEXT REFERENCES medicamento(id), nome_livre TEXT, esquema TEXT);

CREATE TABLE queixa (id TEXT PRIMARY KEY, nome TEXT NOT NULL, grupo TEXT, icone TEXT, perguntas TEXT[], exames TEXT[], conduta_inicial TEXT[], sinais_gravidade TEXT[], fontes JSONB, atualizado_em TEXT);
CREATE TABLE queixa_sintoma (queixa_id TEXT REFERENCES queixa(id) ON DELETE CASCADE, sintoma_id TEXT NOT NULL, nome TEXT NOT NULL, PRIMARY KEY (queixa_id, sintoma_id));
CREATE TABLE regra_diferencial (id SERIAL PRIMARY KEY, queixa_id TEXT REFERENCES queixa(id) ON DELETE CASCADE, se_sintomas TEXT[], se_contexto TEXT[], hipoteses JSONB NOT NULL);
CREATE TABLE sinal_gravidade (id TEXT PRIMARY KEY, nome TEXT NOT NULL, descricao TEXT, acao TEXT);
CREATE TABLE contexto_pergunta (id TEXT PRIMARY KEY, pergunta TEXT NOT NULL, tipo TEXT NOT NULL, opcoes JSONB, tags TEXT[], porque TEXT);

CREATE TABLE emergencia (id TEXT PRIMARY KEY, nome TEXT NOT NULL, cor TEXT, icone TEXT, reconhecimento TEXT[], passos TEXT[], materiais TEXT[], criterios_uti TEXT[], fontes JSONB, atualizado_em TEXT);
CREATE TABLE emergencia_dose (
  id SERIAL PRIMARY KEY, emergencia_id TEXT REFERENCES emergencia(id) ON DELETE CASCADE, nome TEXT NOT NULL, indicacao TEXT,
  mg_kg NUMERIC, unidade TEXT, dose_max NUMERIC, dose_fixa NUMERIC, por_gravidade JSONB, concentracao_mg_ml NUMERIC,
  apresentacao TEXT, via TEXT, repeticao TEXT, obs TEXT, faixa_peso_min NUMERIC, faixa_peso_max NUMERIC, verificar BOOLEAN DEFAULT FALSE
);

CREATE TABLE exame (id TEXT PRIMARY KEY, nome TEXT NOT NULL, categoria TEXT, descricao TEXT, quando_solicitar TEXT[], interpretacao TEXT[], fontes JSONB, atualizado_em TEXT);
CREATE TABLE exame_referencia (id SERIAL PRIMARY KEY, exame_id TEXT REFERENCES exame(id) ON DELETE CASCADE, faixa TEXT NOT NULL, valores TEXT NOT NULL);

CREATE TABLE vacina (id TEXT PRIMARY KEY, nome TEXT NOT NULL, via TEXT, protege TEXT, situacoes_especiais TEXT, atraso_esquema TEXT, fontes JSONB, atualizado_em TEXT);
CREATE TABLE vacina_dose (id SERIAL PRIMARY KEY, vacina_id TEXT REFERENCES vacina(id) ON DELETE CASCADE, dose_index SMALLINT NOT NULL, idade_meses NUMERIC NOT NULL, rotulo TEXT, dose TEXT);

CREATE TABLE marco_desenvolvimento (id SERIAL PRIMARY KEY, idade_meses SMALLINT NOT NULL, dominio TEXT NOT NULL, marco TEXT NOT NULL, alerta TEXT);
CREATE TABLE curva_oms (id SERIAL PRIMARY KEY, indice TEXT NOT NULL, sexo sexo_t NOT NULL, chave NUMERIC NOT NULL, p3 NUMERIC, p15 NUMERIC, p50 NUMERIC, p85 NUMERIC, p97 NUMERIC, UNIQUE (indice, sexo, chave));
CREATE TABLE sinal_vital_ref (id SERIAL PRIMARY KEY, faixa TEXT, min_meses NUMERIC, max_meses NUMERIC, fc_min SMALLINT, fc_max SMALLINT, fr_min SMALLINT, fr_max SMALLINT, pas_min SMALLINT, pas_max SMALLINT, pad_min SMALLINT, pad_max SMALLINT);

CREATE INDEX ON atendimento (paciente_id, criado_em DESC);
CREATE INDEX ON evolucao (paciente_id, data DESC);
CREATE INDEX ON prescricao (paciente_id, criado_em DESC);
CREATE INDEX ON medida (paciente_id, data);
