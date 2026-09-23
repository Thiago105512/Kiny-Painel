/* Persistência local (localStorage) – camada de dados do protótipo.
   Estrutura espelha o esquema relacional descrito em docs/03-banco-de-dados.md,
   permitindo migração futura para backend (IndexedDB/PostgreSQL). */
window.PED = window.PED || {};
PED.store = (function () {
  const KEY = 'pedtudo.v1';
  const empty = () => ({
    pacientes: [],        // cadastro
    atendimentos: [],     // cada atendimento: queixa, sintomas, contexto, gravidade, hipóteses
    evolucoes: [],        // SOAP por atendimento/paciente
    prescricoes: [],      // prescrições emitidas
    vacinasRealizadas: [],// {pacienteId, vacinaId, doseIndex, data}
    medidas: [],          // {pacienteId, data, peso, altura, pc}
    locaisTrabalho: [],   // {nome, forma, valorHora, valorFixo, cargaHoras, diaPagamento}
    plantoes: [],         // {localId, data, inicio, fim, forma, valores, status, dataPagamento}
    removidos: {},        // {colecao: {id: dataISO}} – lápides, para a exclusão também sincronizar
    prefs: { pesoRapido: null, ultimoPacienteId: null,
      // Profissional responsável (editável em Dados › Profissional)
      profissional: { nome: 'Catarina Ribeiro de Queiroz', tratamento: 'Dra.', especialidade: 'Pediatra', crm: 'CRM/AM 10.677', rqe: 'RQE 6.706' } }
  });
  let db = null;
  const ouvintes = [];          // avisados a cada alteração local, para a sincronização e a tela
  let silencio = 0;             // suspende o aviso enquanto aplicamos algo vindo de fora
  function notificar() { if (silencio) return; ouvintes.forEach(f => { try { f(); } catch (e) { console.warn('store: ouvinte falhou', e); } }); }
  /** Registra quem quer saber que os dados mudaram aqui neste aparelho. */
  function aoMudar(fn) { if (typeof fn === 'function') ouvintes.push(fn); }

  const KEY_ANTIGA = 'mucurinha.v1';      // nome anterior do aplicativo; migrado na primeira abertura
  function load() {
    if (db) return db;
    try {
      let raw = localStorage.getItem(KEY);
      if (!raw) {                           // o aplicativo mudou de nome: traz o que já estava gravado
        const antigo = localStorage.getItem(KEY_ANTIGA);
        if (antigo) { localStorage.setItem(KEY, antigo); raw = antigo; }
      }
      db = raw ? Object.assign(empty(), JSON.parse(raw)) : empty();
      db.prefs = Object.assign(empty().prefs, db.prefs || {});
      if (!db.prefs.profissional) db.prefs.profissional = empty().prefs.profissional;
    } catch (e) { console.warn('store: falha ao ler', e); db = empty(); }
    return db;
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(db)); }
    catch (e) { console.warn('store: falha ao gravar', e); }
    notificar();
  }
  const col = (name) => { const d = load(); if (!Array.isArray(d[name])) d[name] = []; return d[name]; };
  const byId = (name, id) => col(name).find(x => x.id === id) || null;
  function upsert(name, obj) {
    const c = col(name);
    if (!obj.id) obj.id = PED.util.uid();
    obj.atualizadoEm = new Date().toISOString();
    if (!obj.por) obj.por = quemSou();        // com duas pessoas no mesmo espaço, vale saber quem lançou
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
    const d = load();
    d.removidos = d.removidos || {};
    d.removidos[name] = d.removidos[name] || {};
    d.removidos[name][id] = new Date().toISOString();   // registra para que a exclusão chegue aos outros aparelhos
    save();
  }
  /** Coleções que guardam registros com id e data de atualização. */
  const COLECOES = ['pacientes', 'atendimentos', 'evolucoes', 'prescricoes', 'vacinasRealizadas', 'medidas', 'locaisTrabalho', 'plantoes'];
  /** Nome de quem está usando este aparelho, para assinar o que é criado aqui. */
  function quemSou() { const p = (load().prefs || {}).profissional || {}; return p.nome || ''; }
  function where(name, fn) { return col(name).filter(fn); }
  function pref(k, v) { const p = load().prefs; if (v === undefined) return p[k]; p[k] = v; save(); return v; }
  function exportJSON() { return JSON.stringify(load(), null, 2); }
  function importJSON(txt) { const o = JSON.parse(txt); db = Object.assign(empty(), o); save(); }
  function reset() { db = empty(); save(); }
  /** Substitui todo o conteúdo local por um estado já mesclado. */
  function substituir(novo) { silencio++; db = Object.assign(empty(), novo); try { save(); } finally { silencio--; } }
  return { load, save, col, byId, upsert, remove, where, pref, exportJSON, importJSON, reset, substituir, aoMudar, quemSou, COLECOES };
})();
