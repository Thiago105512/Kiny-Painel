/* Flashcards de emergência – PedTudo
   Monta cartões a partir das emergências já verificadas (PED.data.emergencias) e do
   preparo das medicações (PED.data.preparo). Nada de conteúdo clínico novo mora aqui:
   este arquivo só organiza o que já tem fonte e data.

   A regra do cartão: a pergunta aparece sozinha. O primeiro toque mostra a conduta.
   O segundo mostra as doses e a diluição. Quem estuda tenta lembrar antes de ver. */
window.PED = window.PED || {};
PED.flash = (function () {
  const S = () => PED.store;
  const E = () => (PED.data && PED.data.emergencias) || [];
  const P = () => (PED.data && PED.data.preparo) || [];
  const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();

  /** Preparo correspondente a uma dose, pelo nome exato e, se não houver, pelo começo do nome. */
  function preparoDe(nome) {
    const n = norm(nome);
    for (const p of P()) if ((p.nomes || []).some(x => norm(x) === n)) return p;
    for (const p of P()) if ((p.nomes || []).some(x => n.startsWith(norm(x)) || norm(x).startsWith(n))) return p;
    return null;
  }

  /* ---------- Cartões ---------- */
  /** Cartão de conduta: o quadro clínico na frente, os passos e as drogas atrás. */
  function cartaConduta(e) {
    return {
      id: 'c:' + e.id,
      tipo: 'conduta',
      emergenciaId: e.id,
      icone: e.icone || '🚨',
      cor: e.cor,
      titulo: e.nome,
      contexto: 'Conduta',
      pergunta: 'Diante deste quadro, qual é a conduta, em ordem?',
      sinais: (e.reconhecimento || []).slice(0, 3),
      passos: (e.passos || []).map(x => String(x).replace(/^\s*\d+[.)]\s*/, '')),
      doses: (e.doses || []),
      materiais: e.materiais || [],
      criteriosUTI: e.criteriosUTI || [],
      fontes: e.fontes || [],
      atualizadoEm: e.atualizadoEm,
    };
  }

  /** Cartão de medicação: qual a dose, a via e como preparar. */
  function cartaMedicacao(e, d, i) {
    const prep = preparoDe(d.nome);
    return {
      id: 'm:' + e.id + ':' + i,
      tipo: 'medicacao',
      emergenciaId: e.id,
      icone: '💉',
      cor: e.cor,
      titulo: d.nome,
      contexto: e.nome,
      pergunta: 'Nesta situação: para que serve, qual a dose e como preparar?',
      indicacao: d.indicacao || '',
      via: d.via || '',
      repeticao: d.repeticao || '',
      dose: d,
      preparo: prep,
      fontes: (prep && prep.fontes && prep.fontes.length ? prep.fontes : e.fontes) || [],
      atualizadoEm: (prep && prep.atualizadoEm) || e.atualizadoEm,
    };
  }

  /** Só entram como cartão de medicação as doses que a mão realmente prepara. */
  const medicavel = (d) => !!(d && (d.mgKg != null || d.doseFixa != null || d.porGravidade || (d.apresentacao && d.concentracaoMgMl != null)));

  function cartasDaEmergencia(e) {
    const out = [cartaConduta(e)];
    (e.doses || []).forEach((d, i) => { if (medicavel(d)) out.push(cartaMedicacao(e, d, i)); });
    return out;
  }

  /* ---------- Baralhos ---------- */
  function baralhos() {
    const es = E();
    const lista = [
      { id: 'tudo', nome: 'Tudo', icone: '🗂️', descricao: 'Condutas e medicações de todas as emergências.' },
      { id: 'condutas', nome: 'Só condutas', icone: '🧭', descricao: 'Um cartão por emergência: reconhecer e conduzir.' },
      { id: 'medicacoes', nome: 'Só medicações', icone: '💉', descricao: 'Dose, via, preparo e diluição de cada droga.' },
      { id: 'rever', nome: 'As que marquei para rever', icone: '🔁', descricao: 'Volta só no que ficou pela metade.' },
    ];
    es.forEach(e => lista.push({ id: 'e:' + e.id, nome: e.nome, icone: e.icone || '🚨', emergencia: e.id, descricao: 'Conduta e medicações desta emergência.' }));
    return lista.map(b => Object.assign(b, { total: cartas(b.id).length }));
  }

  function cartas(baralhoId) {
    const es = E();
    if (baralhoId === 'condutas') return es.map(cartaConduta);
    if (baralhoId === 'medicacoes') {
      const out = [];
      es.forEach(e => (e.doses || []).forEach((d, i) => { if (medicavel(d)) out.push(cartaMedicacao(e, d, i)); }));
      return out;
    }
    if (baralhoId === 'rever') {
      const marcas = S().pref('flash') || {};
      return cartas('tudo').filter(c => (marcas[c.id] || {}).estado === 'rever');
    }
    if (baralhoId && baralhoId.indexOf('e:') === 0) {
      const e = es.find(x => x.id === baralhoId.slice(2));
      return e ? cartasDaEmergencia(e) : [];
    }
    const out = [];
    es.forEach(e => out.push.apply(out, cartasDaEmergencia(e)));
    return out;
  }

  const baralho = (id) => baralhos().find(b => b.id === id) || null;

  /* ---------- O que já foi estudado ---------- */
  const marcas = () => S().pref('flash') || {};
  const estado = (cartaId) => (marcas()[cartaId] || {}).estado || null;
  function marcar(cartaId, novoEstado) {
    const m = marcas();
    if (!novoEstado) delete m[cartaId];
    else m[cartaId] = { estado: novoEstado, em: new Date().toISOString() };
    S().pref('flash', m);
    return novoEstado;
  }
  function progresso(baralhoId) {
    const cs = cartas(baralhoId), m = marcas();
    let sei = 0, rever = 0;
    cs.forEach(c => { const e = (m[c.id] || {}).estado; if (e === 'sei') sei++; else if (e === 'rever') rever++; });
    return { total: cs.length, sei, rever, novas: cs.length - sei - rever, porcento: cs.length ? Math.round(100 * sei / cs.length) : 0 };
  }
  function limpar(baralhoId) {
    const m = marcas();
    cartas(baralhoId).forEach(c => delete m[c.id]);
    S().pref('flash', m);
  }

  /** Embaralhamento estável: a mesma semente devolve sempre a mesma ordem. */
  function embaralhar(lista, semente) {
    const out = lista.slice();
    let s = Number(semente) || 1;
    const rnd = () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648; };
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      const t = out[i]; out[i] = out[j]; out[j] = t;
    }
    return out;
  }

  return { baralhos, baralho, cartas, cartasDaEmergencia, preparoDe, marcar, estado, progresso, limpar, embaralhar, medicavel };
})();
