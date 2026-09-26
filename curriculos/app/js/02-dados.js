/* ============================================================
   02-dados — catálogo: entidades estáticas e seus índices.
   DADOS é embutido pelo build a partir de dados/ e questoes/.
   Nada aqui é dado do usuário (isso fica em 03-store).
   ============================================================ */

const TRILHAS = {
  medicina:   { nome: "Medicina – graduação", curto: "Medicina", dominio: "medicina" },
  residencia: { nome: "Residência médica", curto: "Residência", dominio: "medicina" },
  enem:       { nome: "ENEM e vestibulares", curto: "ENEM", dominio: "enem" },
  direito:    { nome: "Direito – graduação", curto: "Direito", dominio: "direito" },
  oab:        { nome: "OAB – 1ª fase", curto: "OAB", dominio: "direito" },
};
const DIFICULDADE = { 1: "Fácil", 2: "Média", 3: "Difícil" };
const PENDENTE = "Dado curricular pendente de validação";

/* ---------- Temas (entidade central) ----------
   Um tema médico pertence a N especialidades e N disciplinas (muitos-para-muitos).
   Assuntos do ENEM também são temas (dominio "enem"), com área e disciplina. */
const AREAS_MED = DADOS.mapa?.areas || [];
const ESPECIALIDADES = {};
AREAS_MED.forEach(a => (a.especialidades || []).forEach(e => { ESPECIALIDADES[e.id] = { ...e, area: a.id, areaNome: a.nome }; }));

const TEMAS = {};
(DADOS.mapa?.temas || []).forEach(t => {
  TEMAS[t.id] = { dominio: "medicina", sinonimos: [], especialidades: [], disciplinas: [], subtemas: [], objetivos: [], resumo: "", ...t };
});
const ENEM_AREAS = DADOS.enem?.areas || [];
const ENEM_DISC = {};
ENEM_AREAS.forEach(a => (a.disciplinas || []).forEach(d => {
  ENEM_DISC[d.id] = { ...d, area: a.id, areaNome: a.nome };
  (d.assuntos || []).forEach(s => {
    TEMAS[s.id] = {
      id: s.id, nome: s.nome, dominio: "enem", area: a.id, areaNome: a.nome, disciplinaId: d.id, disciplinas: [d.nome],
      especialidades: [], sinonimos: [], objetivos: [], resumo: s.teoria || "",
      subtemas: (s.subassuntos || []).map(n => ({ id: s.id + "." + slug(n), nome: n })),
    };
  });
}));
const temaPorNome = (() => {
  const idx = {};
  Object.values(TEMAS).forEach(t => [t.nome, ...(t.sinonimos || [])].forEach(n => { idx[norm(n)] = t.id; }));
  return nome => idx[norm(nome)] || null;
})();
const nomeTema = id => TEMAS[id]?.nome || id || "—";
const nomeSubtema = (tid, sid) => (TEMAS[tid]?.subtemas || []).find(s => s.id === sid)?.nome || null;
const espPorNome = nome => Object.values(ESPECIALIDADES).find(e => norm(e.nome) === norm(nome))?.id || null;

/* ---------- Questões ----------
   Formato interno curto: t trilha, a área, q enunciado, o alternativas, c correta, e explicação. */
/** Área do conhecimento do ENEM: pelo tema ou, sem tema, pelo nome da disciplina. */
const AREA_CURTA = { linguagens: "Linguagens", humanas: "Humanas", natureza: "Natureza", matematica: "Matemática", redacao: "Redação" };
const nomeAreaEnem = id => AREA_CURTA[id] || ENEM_AREAS.find(a => a.id === id)?.nome || id || "";
const areaEnemDe = q => TEMAS[q.tema]?.area || Object.values(ENEM_DISC).find(d => norm(d.nome) === norm(q.disciplina ?? q.disc ?? q.area ?? ""))?.area || null;
const normQuestao = (q, t, src = "banco") => ({
  id: q.id, t, a: q.area || q.a || "Geral", q: q.enunciado ?? q.q, o: q.alternativas ?? q.o, c: q.correta ?? q.c, e: q.explicacao ?? q.e ?? "",
  tema: q.tema ?? null, subtema: q.subtema ?? null, esp: q.especialidade ?? q.esp ?? null,
  disc: q.disciplina ?? q.disc ?? q.area ?? q.a ?? null, dif: q.dificuldade ?? q.dif ?? null,
  fonte: q.fonte ?? (src === "banco" ? "autoral" : src), ano: q.ano ?? null, prova: q.prova ?? null, src,
  ae: q.areaEnem ?? q.ae ?? (t === "enem" ? areaEnemDe(q) : null),
  serie: q.serie ?? null, parte: q.parte ?? null, partes: q.partes ?? null, rev: q.revisado ?? null,
});
const QUESTOES_BASE = Object.entries(DADOS.banco || {}).flatMap(([t, arr]) => arr.map(q => normQuestao(q, t)));

/* ---------- Casos clínicos (educacionais) ---------- */
const CASOS_BASE = (DADOS.casos || []).map(c => ({
  ...c, src: "banco",
  temaId: c.temaId || temaPorNome(c.tema) || null,
  espId: c.espId || espPorNome(c.especialidade) || null,
}));

/* ---------- Instituições e matrizes curriculares ----------
   Instituição → Curso → Matriz (versão) → Período → Disciplina/Módulo → Unidade → Tema.
   Matrizes de fábrica vêm de dados/grades; as importadas ficam no banco do usuário (store "grades")
   e têm prioridade quando usam o mesmo id. */
const INSTITUICOES_BASE = DADOS.instituicoes || [];
const GRADES_BASE = DADOS.grades || [];
const CURSOS = { medicina: "Medicina", direito: "Direito" };

/* ---------- Guia de referência (antigo "Grade") ---------- */
const GUIA = DADOS.guia || {};
const NOME_GUIA = { enem: "ENEM", vestibulares: "Vestibulares", medicina: "Medicina – graduação", residencia: "Residência médica", direito: "Direito – graduação", oab: "OAB e pós" };

const REDACAO = DADOS.redacao || { competencias: [], zeram: [], estrutura: {}, propostas: [], repertorios: [] };
