/* Persistência local (localStorage) – camada de dados do protótipo.
   Estrutura espelha o esquema relacional descrito em docs/03-banco-de-dados.md,
   permitindo migração futura para backend (IndexedDB/PostgreSQL). */
window.PED = window.PED || {};
PED.store = (function () {
  const KEY = 'mucurinha.v1';
  const empty = () => ({
    pacientes: [],        // cadastro
    atendimentos: [],     // cada atendimento: queixa, sintomas, contexto, gravidade, hipóteses
    evolucoes: [],        // SOAP por atendimento/paciente
    prescricoes: [],      // prescrições emitidas
    vacinasRealizadas: [],// {pacienteId, vacinaId, doseIndex, data}
    medidas: [],          // {pacienteId, data, peso, altura, pc}
    locaisTrabalho: [],   // {nome, forma, valorHora, valorFixo, cargaHoras, diaPagamento}
    plantoes: [],         // {localId, data, inicio, fim, forma, valores, status, dataPagamento}
    prefs: { pesoRapido: null, ultimoPacienteId: null,
      // Profissional responsável (editável em Dados › Profissional)
      profissional: { nome: 'Catarina Ribeiro de Queiroz', tratamento: 'Dra.', especialidade: 'Pediatra', crm: 'CRM/AM 10.677', rqe: 'RQE 6.706' } }
  });
  let db = null;

  function load() {
    if (db) return db;
    try {
      const raw = localStorage.getItem(KEY);
      db = raw ? Object.assign(empty(), JSON.parse(raw)) : empty();
      db.prefs = Object.assign(empty().prefs, db.prefs || {});
      if (!db.prefs.profissional) db.prefs.profissional = empty().prefs.profissional;
    } catch (e) { console.warn('store: falha ao ler', e); db = empty(); }
    return db;
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(db)); }
    catch (e) { console.warn('store: falha ao gravar', e); }
  }
  const col = (name) => { const d = load(); if (!Array.isArray(d[name])) d[name] = []; return d[name]; };
  const byId = (name, id) => col(name).find(x => x.id === id) || null;
  function upsert(name, obj) {
    const c = col(name);
    if (!obj.id) obj.id = PED.util.uid();
    obj.atualizadoEm = new Date().toISOString();
    if (!obj.criadoEm) obj.criadoEm = obj.atualizadoEm;
    const i = c.findIndex(x => x.id === obj.id);
    if (i >= 0) c[i] = obj; else c.push(obj);
    save();
    return obj;
  }
  function remove(name, id) {
    const c = col(name);
    const i = c.findIndex(x => x.id === id);
    if (i >= 0) c.splice(i, 1);
    save();
  }
  function where(name, fn) { return col(name).filter(fn); }
  function pref(k, v) { const p = load().prefs; if (v === undefined) return p[k]; p[k] = v; save(); return v; }
  function exportJSON() { return JSON.stringify(load(), null, 2); }
  function importJSON(txt) { const o = JSON.parse(txt); db = Object.assign(empty(), o); save(); }
  function reset() { db = empty(); save(); }
  return { load, save, col, byId, upsert, remove, where, pref, exportJSON, importJSON, reset };
})();
