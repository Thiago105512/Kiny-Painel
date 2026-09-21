/* Mucurinha – aplicação (roteador hash + telas). Sem dependências externas. */
window.PED = window.PED || {};
(function () {
  const U = PED.util, S = PED.store, esc = U.esc, f = U.fmt;
  const D = () => PED.data;
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  /* ---------------- Estado global ---------------- */
  const state = {
    pacienteId: S.pref('ultimoPacienteId') || null,
    atendimento: null,         // rascunho do fluxo de queixa
    prescricaoDraft: null,
  };
  const paciente = () => state.pacienteId ? S.byId('pacientes', state.pacienteId) : null;
  function idadePaciente(p) { p = p || paciente(); return p ? U.idade(p.dataNascimento) : null; }
  function pesoAtivo() { const p = paciente(); if (p && p.peso) return Number(p.peso); const q = S.pref('pesoRapido'); return q ? Number(q) : null; }
  const profissional = () => S.pref('profissional') || {};
  const profissionalLinha = () => { const pr = profissional(); return [pr.tratamento, pr.nome].filter(Boolean).join(' ') + [pr.especialidade, pr.crm, pr.rqe].filter(Boolean).map(x => ' · ' + x).join(''); };
  function setPaciente(id) { state.pacienteId = id; S.pref('ultimoPacienteId', id); renderChrome(); }

  const NAV = [
    { path: '/', nome: 'Início', ic: '🏠' },
    { path: '/pacientes', nome: 'Pacientes', ic: '🧒' },
    { path: '/queixas', nome: 'Queixas', ic: '🩺' },
    { path: '/doencas', nome: 'Doenças', ic: '📚' },
    { path: '/amazonia', nome: 'Amazônia', ic: '🌳' },
    { path: '/medicamentos', nome: 'Medicamentos', ic: '💊' },
    { path: '/calculadoras', nome: 'Calculadoras', ic: '🧮' },
    { path: '/emergencias', nome: 'Emergências', ic: '🚨' },
    { path: '/exames', nome: 'Exames', ic: '🧪' },
    { path: '/vacinas', nome: 'Vacinas', ic: '💉' },
    { path: '/crescimento', nome: 'Crescimento', ic: '📈' },
    { path: '/config', nome: 'Dados', ic: '⚙️' },
  ];

  /* ---------------- Roteador ---------------- */
  const routes = [];
  function route(pattern, fn) { routes.push({ re: new RegExp('^' + pattern.replace(/:(\w+)/g, '([^/]+)') + '$'), keys: (pattern.match(/:(\w+)/g) || []).map(k => k.slice(1)), fn }); }
  function parseHash() {
    const h = location.hash.replace(/^#/, '') || '/';
    const [path, qs] = h.split('?');
    const query = {}; (qs || '').split('&').filter(Boolean).forEach(kv => { const [k, v] = kv.split('='); query[decodeURIComponent(k)] = decodeURIComponent(v || ''); });
    return { path, query };
  }
  function go(path) { location.hash = '#' + path; }
  function render() {
    const { path, query } = parseHash();
    const main = $('#main');
    for (const r of routes) {
      const m = path.match(r.re);
      if (m) { const params = {}; r.keys.forEach((k, i) => params[k] = decodeURIComponent(m[i + 1])); try { main.innerHTML = r.fn(params, query) || ''; } catch (e) { console.error(e); main.innerHTML = `<div class="alert red"><strong>Erro ao renderizar a tela</strong>${esc(e.message)}</div>`; } window.scrollTo(0, 0); renderChrome(); bindMain(); return; }
    }
    main.innerHTML = '<div class="empty">Página não encontrada.</div>';
  }
  window.addEventListener('hashchange', render);

  /* ---------------- Cromo (barra superior, navegação) ---------------- */
  function renderChrome() {
    const { path } = parseHash();
    const active = (p) => (p === '/' ? path === '/' : path.startsWith(p)) ? 'active' : '';
    const side = $('#sidenav'); const bottom = $('#bottomnav'); const more = $('#moremenu');
    side.innerHTML = NAV.map(n => `<a href="#${n.path}" class="${active(n.path)}"><span class="ic">${n.ic}</span>${n.nome}</a>`).join('');
    const main5 = NAV.slice(0, 4);
    bottom.innerHTML = main5.map(n => `<a href="#${n.path}" class="${active(n.path)}"><span class="ic">${n.ic}</span>${n.nome}</a>`).join('') +
      `<a href="javascript:void(0)" id="moreBtn" class="${NAV.slice(4).some(n => active(n.path)) ? 'active' : ''}"><span class="ic">☰</span>Mais</a>`;
    more.innerHTML = NAV.slice(4).map(n => `<a href="#${n.path}" class="${active(n.path)}"><span class="ic">${n.ic}</span>${n.nome}</a>`).join('');
    $('#moreBtn').onclick = () => more.classList.toggle('open');
    $$('a', more).forEach(a => a.onclick = () => more.classList.remove('open'));
    const p = paciente(); const chip = $('#patientChip');
    if (p) { const id = idadePaciente(p); chip.className = 'patient-chip'; chip.innerHTML = `🧒 ${esc(p.nome.split(' ')[0])} · ${id ? esc(id.texto) : ''}${p.peso ? ' · ' + f(p.peso) + ' kg' : ''}`; chip.onclick = () => go('/pacientes/' + p.id); }
    else { const pr = S.pref('pesoRapido'); chip.className = 'patient-chip none'; chip.innerHTML = pr ? `⚖️ ${f(pr)} kg (peso rápido)` : '👤 Sem paciente'; chip.onclick = () => go('/pacientes'); }
  }

  /* ---------------- Busca global ---------------- */
  function buscar(q) {
    q = U.normalize(q); if (q.length < 2) return [];
    const out = [];
    const push = (cat, nome, href, extra) => out.push({ cat, nome, href, extra });
    (D().queixas || []).forEach(x => { if (U.normalize(x.nome).includes(q)) push('Queixa', x.nome, '/queixas/' + x.id); });
    (D().doencas || []).forEach(x => { if (U.normalize(x.nome).includes(q) || (x.tags || []).some(t => t.includes(q))) push(x.amazonia ? 'Amazônia' : 'Doença', x.nome, '/doencas/' + x.id); });
    (D().medicamentos || []).forEach(x => { if (U.normalize(x.nome).includes(q) || U.normalize(x.classe).includes(q)) push('Medicamento', x.nome, '/medicamentos/' + x.id, x.classe); });
    (PED.calc.calculadoras || []).forEach(x => { if (U.normalize(x.nome).includes(q)) push('Calculadora', x.nome, '/calculadoras/' + x.id); });
    (D().emergencias || []).forEach(x => { if (U.normalize(x.nome).includes(q)) push('Emergência', x.nome, '/emergencias/' + x.id); });
    (D().exames || []).forEach(x => { if (U.normalize(x.nome).includes(q)) push('Exame', x.nome, '/exames/' + x.id); });
    (D().vacinas || []).forEach(x => { if (U.normalize(x.nome).includes(q)) push('Vacina', x.nome, '/vacinas'); });
    S.col('pacientes').forEach(x => { if (U.normalize(x.nome).includes(q)) push('Paciente', x.nome, '/pacientes/' + x.id); });
    return out.slice(0, 25);
  }
  function bindSearch() {
    const inp = $('#globalSearch'), box = $('#searchResults');
    const run = U.debounce(() => {
      const r = buscar(inp.value);
      if (!r.length) { box.style.display = 'none'; box.innerHTML = ''; return; }
      box.innerHTML = r.map(x => `<a href="#${x.href}"><span class="cat">${esc(x.cat)}</span>${esc(x.nome)}${x.extra ? ' <small class="muted">· ' + esc(x.extra) + '</small>' : ''}</a>`).join('');
      box.style.display = 'block';
    }, 120);
    inp.addEventListener('input', run);
    inp.addEventListener('focus', run);
    document.addEventListener('click', (e) => { if (!e.target.closest('.searchbox')) box.style.display = 'none'; });
    box.addEventListener('click', () => { box.style.display = 'none'; inp.value = ''; });
  }

  /* ---------------- Helpers de UI ---------------- */
  const disclaimer = `<p class="disclaimer">Ferramenta de apoio acadêmico e clínico. Não substitui a avaliação e a decisão médica. Conferir doses e condutas em protocolos oficiais e bulas antes de prescrever.</p>`;
  const nomeDoenca = (id) => { const d = (D().doencas || []).find(x => x.id === id); return d ? d.nome : id; };
  const nomeExame = (id) => { const e = (D().exames || []).find(x => x.id === id); return e ? e.nome : id; };
  const nomeMed = (id) => { const m = (D().medicamentos || []).find(x => x.id === id); return m ? m.nome : id; };
  const linkExames = (ids) => (ids || []).map(id => { const e = (D().exames || []).find(x => x.id === id); return e ? `<a class="chip" href="#/exames/${e.id}">${esc(e.nome)}</a>` : `<span class="chip gray">${esc(id)}</span>`; }).join(' ');
  const linkDoencas = (ids) => (ids || []).map(id => { const d = (D().doencas || []).find(x => x.id === id); return d ? `<a class="chip ${d.amazonia ? 'green' : ''}" href="#/doencas/${d.id}">${esc(d.nome)}</a>` : `<span class="chip gray">${esc(id)}</span>`; }).join(' ');
  function pesoBox(ctxLabel) {
    const p = paciente(); const peso = pesoAtivo();
    return `<div class="card compact" style="display:flex;gap:.6rem;align-items:center;flex-wrap:wrap">
      <div style="flex:1;min-width:180px"><strong>${p ? '🧒 ' + esc(p.nome) : '⚖️ Peso para cálculo'}</strong><br><small class="muted">${p ? (idadePaciente(p) || {}).texto || '' : ctxLabel || 'Sem paciente selecionado: informe o peso.'}</small></div>
      <div style="display:flex;gap:.4rem;align-items:center"><input type="number" step="0.1" id="pesoRapido" value="${peso || ''}" placeholder="kg" style="width:96px" ${p ? 'disabled' : ''}> <span>kg</span>
      ${p ? `<button class="btn sm ghost" data-act="trocarPaciente">Trocar</button>` : `<button class="btn sm" data-act="setPesoRapido">OK</button>`}</div></div>`;
  }
  function doseRow(peso, d) {
    // d: {nome, mgKg, unidade, doseMax, concentracaoMgMl, via, apresentacao, doseFixa, porGravidade, repeticao, obs, faixaPesoMin, faixaPesoMax, verificar}
    let valor = '', formula = '';
    if (d.porGravidade) {
      const pg = Array.isArray(d.porGravidade) ? d.porGravidade.map(g => `<b>${esc(g.gravidade)}</b>: ${g.ampolasMin != null ? (g.ampolasMax != null && g.ampolasMax !== g.ampolasMin ? f(g.ampolasMin) + '–' + f(g.ampolasMax) : f(g.ampolasMin)) : esc(g.dose || '')} ${esc(g.unidade || d.unidade || 'ampolas')}`) : Object.entries(d.porGravidade).map(([k, v]) => `<b>${esc(k)}</b>: ${esc(v)}`);
      valor = pg.join('<br>'); formula = 'Dose por gravidade clínica – igual para crianças e adultos (não depende do peso)';
    }
    else if (d.doseFixa != null) { if (d.faixaPesoMin != null && peso != null && (peso < d.faixaPesoMin || (d.faixaPesoMax != null && peso >= d.faixaPesoMax))) return ''; valor = `${f(d.doseFixa)} ${d.unidade}`; formula = 'Dose fixa'; }
    else if (d.mgKg != null && peso) {
      let dose = d.mgKg * peso; let lim = '';
      if (d.doseMax != null && dose > d.doseMax) { dose = d.doseMax; lim = ` (limitada ao máx. ${f(d.doseMax)} ${d.unidade})`; }
      valor = `<strong>${f(dose)} ${d.unidade}</strong>${lim}`;
      formula = `${f(d.mgKg)} ${d.unidade}/kg × ${f(peso)} kg = ${f(d.mgKg * peso)} ${d.unidade}`;
      if (d.concentracaoMgMl) { const ml = dose / d.concentracaoMgMl; valor += ` = <strong>${f(ml)} mL</strong>`; formula += ` ÷ ${f(d.concentracaoMgMl, 3)} mg/mL = ${f(ml)} mL`; }
    } else if (d.mgKg != null) { valor = `${f(d.mgKg)} ${d.unidade}/kg${d.doseMax ? ' (máx. ' + f(d.doseMax) + ' ' + d.unidade + ')' : ''}`; formula = 'Informe o peso para calcular'; }
    else { valor = d.obs || '—'; }
    return `<tr><td><strong>${esc(d.nome)}</strong><br><small class="muted">${esc(d.indicacao || '')}${d.apresentacao ? ' · ' + esc(d.apresentacao) : ''}</small></td><td>${valor}${d.verificar ? ' <span class="chip amber">verificar</span>' : ''}<br><small class="muted">${esc(formula)}</small></td><td>${esc(d.via || '')}${d.repeticao ? '<br><small>' + esc(d.repeticao) + '</small>' : ''}${d.obs && d.mgKg != null ? '<br><small class="muted">' + esc(d.obs) + '</small>' : ''}</td></tr>`;
  }

  /* ---------------- Telas ---------------- */
  route('/', () => {
    const p = paciente(); const q = D().queixas || [];
    const destaque = ['febre', 'febre_calafrios', 'febre_exantema', 'tosse', 'dispneia', 'diarreia', 'vomitos', 'convulsao', 'acidente_ofidico', 'rn_febre', 'lesoes_pele', 'ictericia'];
    return `
      <div class="card" style="background:linear-gradient(135deg,#e3f3f5,#e4f5ec);border:none">
        <h1>Mucurinha</h1>
        <p>Apoio à decisão clínica em pediatria para o contexto amazônico: queixas, diagnósticos diferenciais, protocolos, doses por peso e emergências.</p>
        <p class="muted"><small>${esc(profissionalLinha())}</small></p>
        <div class="btnrow">
          <a class="btn" href="#/queixas">🩺 Iniciar por queixa</a>
          <a class="btn danger" href="#/emergencias">🚨 Emergências</a>
          <a class="btn secondary" href="#/pacientes/novo">➕ Novo paciente</a>
        </div>
      </div>
      ${pesoBox('Informe o peso para calcular doses nas telas de medicamentos e emergências.')}
      ${p ? '' : `<div class="alert blue"><strong>Dica</strong>Cadastre ou selecione um paciente para preencher automaticamente idade, peso, altura e contexto epidemiológico em todas as telas.</div>`}
      <div class="section-title"><h2>Queixas frequentes</h2><a href="#/queixas">ver todas</a></div>
      <div class="grid">${destaque.map(id => q.find(x => x.id === id)).filter(Boolean).map(x => `<a class="tile" href="#/queixas/${x.id}"><span class="ic">${x.icone || '•'}</span>${esc(x.nome)}</a>`).join('')}</div>
      <div class="section-title"><h2>Atalhos</h2></div>
      <div class="grid">
        <a class="tile amazon" href="#/amazonia"><span class="ic">🌳</span>Amazônia<small>doenças regionais</small></a>
        <a class="tile" href="#/medicamentos"><span class="ic">💊</span>Medicamentos<small>dose por peso</small></a>
        <a class="tile" href="#/calculadoras"><span class="ic">🧮</span>Calculadoras</a>
        <a class="tile" href="#/exames"><span class="ic">🧪</span>Exames</a>
        <a class="tile" href="#/vacinas"><span class="ic">💉</span>Vacinas</a>
        <a class="tile" href="#/crescimento"><span class="ic">📈</span>Crescimento</a>
      </div>
      ${disclaimer}`;
  });

  /* ---- Pacientes ---- */
  route('/pacientes', () => {
    const ps = S.col('pacientes').slice().sort((a, b) => (b.atualizadoEm || '').localeCompare(a.atualizadoEm || ''));
    return `<div class="section-title"><h1>Pacientes</h1><a class="btn sm" href="#/pacientes/novo">➕ Novo</a></div>
      ${state.pacienteId ? `<div class="btnrow"><button class="btn sm ghost" data-act="limparPaciente">Desmarcar paciente ativo</button></div>` : ''}
      ${ps.length ? `<div class="list">${ps.map(p => { const id = U.idade(p.dataNascimento); return `<a class="row" href="#/pacientes/${p.id}"><span class="ic">${p.sexo === 'F' ? '👧' : '👦'}</span><div class="grow"><div class="title">${esc(p.nome)} ${p.id === state.pacienteId ? '<span class="chip green">ativo</span>' : ''}</div><div class="sub">${id ? id.texto : ''} · ${p.peso ? f(p.peso) + ' kg' : 'peso —'} · ${esc(p.municipio || '')} ${p.zona ? '· ' + esc(p.zona) : ''}</div></div></a>`; }).join('')}</div>` : `<div class="empty">Nenhum paciente cadastrado.<br><a class="btn" style="margin-top:.8rem" href="#/pacientes/novo">Cadastrar primeiro paciente</a></div>`}
      ${disclaimer}`;
  });

  function formPaciente(p) {
    p = p || {};
    const opt = (v, l, cur) => `<option value="${v}" ${cur === v ? 'selected' : ''}>${l}</option>`;
    return `<form id="formPaciente" class="card">
      <div class="fields">
        <div class="field full"><label>Nome *</label><input name="nome" required value="${esc(p.nome || '')}"></div>
        <div class="field"><label>Data de nascimento *</label><input type="date" name="dataNascimento" required value="${esc(p.dataNascimento || '')}"></div>
        <div class="field"><label>Idade (calculada)</label><input id="idadeCalc" disabled value="${p.dataNascimento ? (U.idade(p.dataNascimento) || {}).texto || '' : ''}"></div>
        <div class="field"><label>Sexo</label><select name="sexo">${opt('M', 'Masculino', p.sexo)}${opt('F', 'Feminino', p.sexo)}</select></div>
        <div class="field"><label>Peso (kg)</label><input type="number" step="0.01" name="peso" value="${p.peso || ''}"></div>
        <div class="field"><label>Altura (cm)</label><input type="number" step="0.1" name="altura" value="${p.altura || ''}"></div>
        <div class="field"><label>Perímetro cefálico (cm)</label><input type="number" step="0.1" name="pc" value="${p.pc || ''}"></div>
        <div class="field"><label>IMC (calculado)</label><input id="imcCalc" disabled></div>
        <div class="field"><label>Superfície corporal (calculada)</label><input id="scCalc" disabled></div>
        <div class="field"><label>Prematuridade</label><select name="prematuro">${opt('nao', 'Não', p.prematuro || 'nao')}${opt('sim', 'Sim', p.prematuro)}</select></div>
        <div class="field"><label>Idade gestacional ao nascer (sem)</label><input type="number" step="1" name="igNascimento" value="${p.igNascimento || ''}"></div>
        <div class="field"><label>Município de origem</label><input name="municipio" value="${esc(p.municipio || '')}" placeholder="ex.: Manaus, Tefé, Tabatinga"></div>
        <div class="field"><label>Zona</label><select name="zona">${opt('', '—', p.zona || '')}${opt('urbana', 'Urbana', p.zona)}${opt('rural', 'Rural', p.zona)}${opt('indigena', 'Indígena', p.zona)}${opt('ribeirinha', 'Ribeirinha', p.zona)}</select></div>
        <div class="field full"><label>Alergias</label><input name="alergias" value="${esc(p.alergias || '')}" placeholder="ex.: penicilina (urticária)"></div>
        <div class="field full"><label>Comorbidades</label><input name="comorbidades" value="${esc(p.comorbidades || '')}"></div>
        <div class="field full"><label>Medicamentos em uso</label><input name="medicamentosUso" value="${esc(p.medicamentosUso || '')}"></div>
        <div class="field full"><label>Histórico de internações</label><textarea name="internacoes">${esc(p.internacoes || '')}</textarea></div>
        <div class="field full"><label>Histórico vacinal (resumo)</label><textarea name="historicoVacinal">${esc(p.historicoVacinal || '')}</textarea><small class="muted">O controle dose a dose fica na aba Vacinas do paciente.</small></div>
        <div class="field full"><label>Responsável / contato</label><input name="responsavel" value="${esc(p.responsavel || '')}"></div>
      </div>
      <input type="hidden" name="id" value="${esc(p.id || '')}">
      <div class="btnrow"><button class="btn" type="submit">💾 Salvar</button><a class="btn ghost" href="#/pacientes">Cancelar</a></div>
    </form>`;
  }
  route('/pacientes/novo', () => `<h1>Novo paciente</h1>${formPaciente()}`);
  route('/pacientes/:id/editar', ({ id }) => { const p = S.byId('pacientes', id); if (!p) return '<div class="empty">Paciente não encontrado.</div>'; return `<h1>Editar paciente</h1>${formPaciente(p)}`; });

  route('/pacientes/:id', ({ id }, q) => {
    const p = S.byId('pacientes', id); if (!p) return '<div class="empty">Paciente não encontrado.</div>';
    const tab = q.tab || 'resumo'; const idade = U.idade(p.dataNascimento);
    const tabs = [['resumo', 'Resumo'], ['atendimentos', 'Atendimentos'], ['evolucao', 'Evolução SOAP'], ['prescricoes', 'Prescrições'], ['crescimento', 'Crescimento'], ['vacinas', 'Vacinas']];
    let body = '';
    if (tab === 'resumo') {
      const imc = U.imc(p.peso, p.altura), sc = U.scMosteller(p.peso, p.altura);
      body = `<div class="card"><dl class="kv">
        <dt>Idade</dt><dd>${idade ? esc(idade.texto) + ' (' + esc(U.faixaEtaria(idade.totalMeses)) + ')' : '—'}</dd>
        <dt>Nascimento</dt><dd>${U.fmtDate(p.dataNascimento)}</dd>
        <dt>Sexo</dt><dd>${p.sexo === 'F' ? 'Feminino' : 'Masculino'}</dd>
        <dt>Peso / Altura</dt><dd>${p.peso ? f(p.peso) + ' kg' : '—'} / ${p.altura ? f(p.altura) + ' cm' : '—'}${p.pc ? ' · PC ' + f(p.pc) + ' cm' : ''}</dd>
        <dt>IMC</dt><dd>${imc ? f(imc, 1) + ' kg/m²' : '—'}</dd>
        <dt>Superfície corporal</dt><dd>${sc ? f(sc, 2) + ' m²' : '—'}</dd>
        <dt>Prematuridade</dt><dd>${p.prematuro === 'sim' ? 'Sim' + (p.igNascimento ? ' (' + p.igNascimento + ' sem)' : '') : 'Não'}</dd>
        <dt>Alergias</dt><dd>${p.alergias ? '<span class="chip red">' + esc(p.alergias) + '</span>' : '—'}</dd>
        <dt>Comorbidades</dt><dd>${esc(p.comorbidades || '—')}</dd>
        <dt>Medicamentos em uso</dt><dd>${esc(p.medicamentosUso || '—')}</dd>
        <dt>Internações</dt><dd>${esc(p.internacoes || '—')}</dd>
        <dt>Histórico vacinal</dt><dd>${esc(p.historicoVacinal || '—')}</dd>
        <dt>Origem</dt><dd>${esc(p.municipio || '—')} ${p.zona ? '· <span class="chip green">' + esc(p.zona) + '</span>' : ''}</dd>
        <dt>Responsável</dt><dd>${esc(p.responsavel || '—')}</dd></dl>
        <div class="btnrow"><a class="btn" href="#/queixas">🩺 Novo atendimento por queixa</a><a class="btn secondary" href="#/evolucao/nova?pacienteId=${p.id}">📝 Evolução SOAP</a><a class="btn secondary" href="#/prescricao/nova?pacienteId=${p.id}">📄 Prescrição</a></div></div>`;
    } else if (tab === 'atendimentos') {
      const at = S.where('atendimentos', a => a.pacienteId === p.id).sort((a, b) => b.criadoEm.localeCompare(a.criadoEm));
      body = at.length ? `<div class="list">${at.map(a => `<div class="row"><span class="ic">🩺</span><div class="grow"><div class="title">${esc(a.queixaNome)}</div><div class="sub">${U.fmtDateTime(a.criadoEm)} · sintomas: ${(a.sintomas || []).length} · hipóteses: ${(a.hipoteses || []).map(h => esc(h.nome)).join(', ') || '—'}</div>${(a.gravidade || []).length ? `<div><span class="chip red">${a.gravidade.length} sinal(is) de gravidade</span></div>` : ''}</div><button class="btn sm ghost" data-act="abrirAtendimento" data-id="${a.id}">Abrir</button></div>`).join('')}</div>` : '<div class="empty">Nenhum atendimento registrado.</div>';
    } else if (tab === 'evolucao') {
      const ev = S.where('evolucoes', e => e.pacienteId === p.id).sort((a, b) => b.data.localeCompare(a.data));
      body = `<div class="btnrow"><a class="btn" href="#/evolucao/nova?pacienteId=${p.id}">➕ Nova evolução</a>${ev.length >= 2 ? `<button class="btn secondary" data-act="compararSOAP">Comparar últimas</button>` : ''}</div><div id="soapCompare"></div>` +
        (ev.length ? `<div class="list">${ev.map(e => `<a class="row" href="#/evolucao/${e.id}"><span class="ic">📝</span><div class="grow"><div class="title">${U.fmtDateTime(e.data)}</div><div class="sub">S: ${esc((e.s || '').slice(0, 80))}…</div><div class="sub">A: ${esc((e.a || '').slice(0, 80))}</div></div></a>`).join('')}</div>` : '<div class="empty">Sem evoluções.</div>');
    } else if (tab === 'prescricoes') {
      const pr = S.where('prescricoes', x => x.pacienteId === p.id).sort((a, b) => b.criadoEm.localeCompare(a.criadoEm));
      body = `<div class="btnrow"><a class="btn" href="#/prescricao/nova?pacienteId=${p.id}">➕ Nova prescrição</a></div>` + (pr.length ? `<div class="list">${pr.map(x => `<a class="row" href="#/prescricao/${x.id}"><span class="ic">📄</span><div class="grow"><div class="title">${U.fmtDateTime(x.criadoEm)} ${x.confirmada ? '<span class="chip green">emitida</span>' : '<span class="chip amber">rascunho</span>'}</div><div class="sub">${(x.itens || []).map(i => esc(i.medicamento)).join(', ')}</div></div></a>`).join('')}</div>` : '<div class="empty">Sem prescrições.</div>');
    } else if (tab === 'crescimento') {
      body = telaCrescimentoPaciente(p);
    } else if (tab === 'vacinas') {
      body = telaVacinasPaciente(p);
    }
    return `<div class="section-title"><h1>${esc(p.nome)}</h1><div class="btnrow" style="margin:0">${state.pacienteId === p.id ? '<span class="chip green">paciente ativo</span>' : `<button class="btn sm green" data-act="ativarPaciente" data-id="${p.id}">Selecionar</button>`}<a class="btn sm ghost" href="#/pacientes/${p.id}/editar">Editar</a><button class="btn sm ghost" data-act="excluirPaciente" data-id="${p.id}">Excluir</button></div></div>
      <div class="tabs">${tabs.map(([k, l]) => `<button class="${tab === k ? 'active' : ''}" data-act="tab" data-tab="${k}" data-id="${p.id}">${l}</button>`).join('')}</div>${body}${disclaimer}`;
  });

  function telaCrescimentoPaciente(p) {
    const idade = U.idade(p.dataNascimento); const C = D().crescimento || {}; const cur = C.curvasOMS;
    const meds = S.where('medidas', m => m.pacienteId === p.id).sort((a, b) => a.data.localeCompare(b.data));
    const m = idade ? idade.totalMeses : null; let perc = '';
    if (cur && m != null && p.sexo) {
      const rows = [];
      const add = (label, val, tab, key) => { if (val == null || !tab) return; const pc = PED.calc.percentilAprox(Number(val), PED.calc.linhaCurva(tab, p.sexo, key)); rows.push(`<tr><td>${label}</td><td>${f(val)}</td><td>${pc ? pc.p : '—'}</td><td>${pc && (pc.p === '< 3' || pc.p === '> 97') ? '<span class="chip red">alerta</span>' : pc ? '<span class="chip green">faixa habitual</span>' : ''}</td></tr>`); };
      add('Peso/idade', p.peso, cur.pesoIdade, m); add('Estatura/idade', p.altura, cur.estaturaIdade, m); if (m <= 36) add('PC/idade', p.pc, cur.perimetroCefalico, m);
      const imc = U.imc(p.peso, p.altura); if (imc) add('IMC/idade', imc.toFixed(1), cur.imcIdade, m);
      if (p.peso && p.altura && cur.pesoEstatura) add('Peso/estatura', p.peso, cur.pesoEstatura, Number(p.altura));
      perc = `<div class="card"><h2>📈 Percentis (OMS, aproximado)</h2><div class="tablewrap"><table><tr><th>Índice</th><th>Valor</th><th>Percentil</th><th></th></tr>${rows.join('')}</table></div><small class="muted">Interpolação aproximada entre percentis das tabelas OMS 2006. Confirmar nas curvas oficiais da Caderneta da Criança.</small></div>`;
    }
    const marcos = (C.marcos || []).filter(x => m != null && x.idadeMeses <= m + 0.01);
    const proximos = (C.marcos || []).filter(x => m != null && x.idadeMeses > m).slice(0, 6);
    const marcosHtml = m == null ? '' : `<div class="card"><h2>🧩 Marcos do desenvolvimento</h2><p class="muted">Marcos esperados até a idade atual (${esc(idade.texto)}). Marque os já alcançados; os não alcançados geram alerta de acompanhamento.</p>
      ${marcos.length ? `<div class="tablewrap"><table><tr><th>Idade</th><th>Domínio</th><th>Marco</th><th>Alcançado</th></tr>${marcos.map(x => { const k = x.idadeMeses + '|' + x.marco; const ok = (p.marcos || {})[k]; return `<tr><td>${x.idadeMeses} m</td><td>${esc(x.dominio)}</td><td>${esc(x.marco)}${x.alerta ? '<br><small class="muted">Alerta: ' + esc(x.alerta) + '</small>' : ''}</td><td><input type="checkbox" class="marcoChk" data-k="${esc(k)}" data-id="${p.id}" ${ok ? 'checked' : ''}> ${!ok && m >= x.idadeMeses + 3 ? '<span class="chip red">avaliar atraso</span>' : ''}</td></tr>`; }).join('')}</table></div>` : '<p class="muted">Sem marcos para a idade.</p>'}
      ${proximos.length ? `<details><summary>Próximos marcos</summary><div class="body">${U.list(proximos.map(x => x.idadeMeses + ' m – ' + x.dominio + ': ' + x.marco))}</div></details>` : ''}</div>`;
    const medidasHtml = `<div class="card"><h2>📏 Medidas ao longo do tempo</h2>
      <form id="formMedida" class="fields"><input type="hidden" name="pacienteId" value="${p.id}"><div class="field"><label>Data</label><input type="date" name="data" value="${U.today()}"></div><div class="field"><label>Peso (kg)</label><input type="number" step="0.01" name="peso"></div><div class="field"><label>Altura (cm)</label><input type="number" step="0.1" name="altura"></div><div class="field"><label>PC (cm)</label><input type="number" step="0.1" name="pc"></div><div class="field"><label>&nbsp;</label><button class="btn block" type="submit">Registrar</button></div></form>
      ${meds.length ? `<div class="tablewrap"><table><tr><th>Data</th><th>Idade</th><th>Peso</th><th>Altura</th><th>PC</th><th>IMC</th><th></th></tr>${meds.map(x => { const i = U.idade(p.dataNascimento, x.data + 'T12:00:00'); const imc = U.imc(x.peso, x.altura); return `<tr><td>${U.fmtDate(x.data)}</td><td>${i ? esc(i.texto) : ''}</td><td>${x.peso ? f(x.peso) : '—'}</td><td>${x.altura ? f(x.altura) : '—'}</td><td>${x.pc ? f(x.pc) : '—'}</td><td>${imc ? f(imc, 1) : '—'}</td><td><button class="btn sm ghost" data-act="delMedida" data-id="${x.id}" data-pid="${p.id}">✕</button></td></tr>`; }).join('')}</table></div>` : '<p class="muted">Nenhuma medida registrada. Registrar medidas atualiza o peso/altura atuais do paciente.</p>'}</div>`;
    return perc + marcosHtml + medidasHtml + `<div class="btnrow"><a class="btn secondary" href="#/crescimento">Ver tabelas de referência</a></div>`;
  }

  function telaVacinasPaciente(p) {
    const idade = U.idade(p.dataNascimento); const m = idade ? idade.totalMeses : 0;
    const feitas = S.where('vacinasRealizadas', v => v.pacienteId === p.id);
    const isDone = (vid, i) => feitas.find(v => v.vacinaId === vid && v.doseIndex === i);
    const rows = []; let pend = 0, atras = 0;
    (D().vacinas || []).forEach(v => (v.doses || []).forEach((d, i) => {
      const done = isDone(v.id, i); const due = d.idadeMeses <= m; const late = !done && d.idadeMeses + 1 < m && due; if (!done && due) pend++; if (late) atras++;
      rows.push(`<tr class="${done ? '' : late ? 'late' : ''}"><td>${esc(v.nome)}</td><td>${esc(d.rotulo)}${d.dose ? '<br><small class="muted">' + esc(d.dose) + '</small>' : ''}</td><td>${done ? `<span class="chip green">feita ${U.fmtDate(done.data)}</span>` : late ? '<span class="chip red">atrasada</span>' : due ? '<span class="chip amber">pendente</span>' : '<span class="chip gray">futura</span>'}</td><td>${done ? `<button class="btn sm ghost" data-act="desfazerVacina" data-id="${done.id}" data-pid="${p.id}">desfazer</button>` : `<button class="btn sm ${due ? '' : 'ghost'}" data-act="marcarVacina" data-pid="${p.id}" data-vid="${v.id}" data-i="${i}">marcar</button>`}</td></tr>`);
    }));
    return `<div class="card"><h2>💉 Situação vacinal</h2><p>${pend ? `<span class="chip amber">${pend} dose(s) pendente(s)</span>` : '<span class="chip green">Sem doses pendentes</span>'} ${atras ? `<span class="chip red">${atras} atrasada(s)</span>` : ''}</p>
      ${atras ? '<div class="alert amber"><strong>Esquema atrasado</strong>Considerar atualização conforme orientações do PNI para esquemas em atraso (ver módulo Vacinas › atraso de esquema). Não reiniciar esquemas.</div>' : ''}
      <div class="tablewrap"><table><tr><th>Vacina</th><th>Dose</th><th>Status</th><th></th></tr>${rows.join('')}</table></div>${U.fontes(D().vacinas && D().vacinas[0])}</div>`;
  }

  /* ---- Queixas (fluxo principal) ---- */
  const GRUPOS = { febre: 'Febre', respiratorio: 'Respiratório', gastrointestinal: 'Gastrointestinal', neurologico: 'Neurológico', geral: 'Geral', pele: 'Pele', urinario: 'Urinário', acidentes: 'Acidentes e intoxicações', neonatal: 'Recém-nascido' };
  route('/queixas', (p, q) => {
    const qs = D().queixas || []; const grupos = {};
    qs.forEach(x => { (grupos[x.grupo] = grupos[x.grupo] || []).push(x); });
    return `<h1>Queixa principal</h1><p class="muted">Escolha a queixa para iniciar o fluxo: sintomas associados → contexto epidemiológico → sinais de gravidade → diagnósticos diferenciais → exames → protocolos → tratamento → prescrição.</p>
      ${pesoBox()}
      ${Object.keys(GRUPOS).filter(g => grupos[g]).map(g => `<div class="section-title"><h2>${GRUPOS[g]}</h2></div><div class="grid">${grupos[g].map(x => `<a class="tile ${g === 'acidentes' ? 'red' : ''}" href="#/queixas/${x.id}"><span class="ic">${x.icone || '•'}</span>${esc(x.nome)}</a>`).join('')}</div>`).join('')}
      ${disclaimer}`;
  });

  function novoAtendimento(queixa) {
    const p = paciente();
    const ctx = {};
    if (p && p.zona && p.zona !== 'urbana') ctx['zona'] = p.zona;
    if (p && p.municipio) ctx['municipio'] = p.municipio;
    return { id: null, pacienteId: p ? p.id : null, queixaId: queixa.id, queixaNome: queixa.nome, etapa: 0, sintomas: [], contexto: ctx, gravidade: [], hipoteses: [], examesSelecionados: [], notas: '', criadoEm: new Date().toISOString() };
  }
  const ETAPAS = ['Sintomas', 'Contexto', 'Gravidade', 'Diferenciais', 'Exames', 'Protocolos', 'Tratamento', 'Prescrição'];

  function contextoTags(at) {
    const tags = new Set();
    (D().contextoEpidemiologico || []).forEach(c => {
      const v = at.contexto[c.id];
      if (c.tipo === 'bool') {
        const marcado = v === true; const aplica = c.tagQuandoNao ? (v === false) : marcado;   // tagQuandoNao: a tag vale quando a resposta é "não"
        if (aplica) (c.tags || []).forEach(t => tags.add(t));
      }
      if (c.tipo === 'select' && v) { tags.add(v); const por = c.tagsPorOpcao || c.opcoesTags; if (por) (por[v] || []).forEach(t => tags.add(t)); else (c.tags || []).forEach(t => tags.add(t)); }
      if (c.tipo === 'text' && v && c.id !== 'municipio') (c.tags || []).forEach(t => tags.add(t));
    });
    if (at.contexto.zona) tags.add(at.contexto.zona);
    return tags;
  }
  function diferenciais(queixa, at) {
    const tags = contextoTags(at); const sint = new Set(at.sintomas); const out = new Map();
    (queixa.diferenciais || []).forEach((r, idx) => {
      const se = r.se || {};
      const okS = !(se.sintomas && se.sintomas.length) || se.sintomas.every(s => sint.has(s));
      const okC = !(se.contexto && se.contexto.length) || se.contexto.some(c => tags.has(c));
      if (!okS || !okC) return;
      const especifica = !!((se.sintomas && se.sintomas.length) || (se.contexto && se.contexto.length));
      (r.hipoteses || []).forEach(h => {
        const key = h.doencaId || h.nome; const cur = out.get(key) || { doencaId: h.doencaId || null, nome: h.doencaId ? nomeDoenca(h.doencaId) : h.nome, notas: [], peso: 0 };
        if (h.nota) cur.notas.push(h.nota); cur.peso += especifica ? 2 : 1; if (especifica) cur.reforcada = true; out.set(key, cur);
      });
    });
    return Array.from(out.values()).sort((a, b) => b.peso - a.peso);
  }

  route('/queixas/:id', ({ id }, q) => {
    const queixa = (D().queixas || []).find(x => x.id === id); if (!queixa) return '<div class="empty">Queixa não encontrada.</div>';
    if (!state.atendimento || state.atendimento.queixaId !== id) state.atendimento = novoAtendimento(queixa);
    const at = state.atendimento; if (q.etapa != null) at.etapa = Number(q.etapa);
    const p = paciente(); const idade = idadePaciente(); const peso = pesoAtivo();
    const steps = `<div class="steps">${ETAPAS.map((e, i) => `<span class="${i < at.etapa ? 'done' : i === at.etapa ? 'cur' : ''}" data-act="etapa" data-i="${i}" style="cursor:pointer">${i + 1}. ${e}</span>`).join('')}</div>`;
    const nav = (prev, next, label) => `<div class="btnrow">${prev ? `<button class="btn ghost" data-act="etapa" data-i="${at.etapa - 1}">← Voltar</button>` : ''}${next ? `<button class="btn" data-act="etapa" data-i="${at.etapa + 1}">${label || 'Continuar'} →</button>` : ''}</div>`;
    let body = '';
    const lactenteJovem = idade && idade.totalMeses < 3 && (queixa.grupo === 'febre' || queixa.grupo === 'neonatal' || at.sintomas.includes('febre'));
    const alertaLactente = lactenteJovem ? `<div class="alert red"><strong>Lactente jovem (&lt; 3 meses) com febre</strong>Considerar avaliação completa para infecção bacteriana grave conforme protocolo (hemograma, urina, hemocultura; líquor conforme idade e estado clínico). Baixo limiar para internação.</div>` : '';

    if (at.etapa === 0) {
      body = `<div class="card"><h2>1. Sintomas associados</h2><p class="muted">Marque o que está presente.</p>
        <div class="toggles">${(queixa.sintomasAssociados || []).map(s => `<span class="toggle ${at.sintomas.includes(s.id) ? 'on' : ''}" data-act="togSintoma" data-id="${s.id}">${esc(s.nome)}</span>`).join('')}</div>
        <h3 style="margin-top:1rem">Anamnese dirigida</h3>${U.list(queixa.perguntas)}
        <div class="field"><label>Notas</label><textarea id="notasAt">${esc(at.notas || '')}</textarea></div>${nav(false, true)}</div>`;
    } else if (at.etapa === 1) {
      body = `<div class="card"><h2>2. Contexto epidemiológico amazônico</h2>${p && p.zona ? `<p class="muted">Zona do cadastro: <span class="chip green">${esc(p.zona)}</span>${p.municipio ? ' · ' + esc(p.municipio) : ''}</p>` : ''}
        ${(D().contextoEpidemiologico || []).map(c => {
          const v = at.contexto[c.id];
          if (c.tipo === 'bool' && c.tagQuandoNao) return `<div class="field"><label>${esc(c.pergunta)}</label><select class="ctxTri" data-id="${c.id}"><option value="">—</option><option value="sim" ${v === true ? 'selected' : ''}>Sim</option><option value="nao" ${v === false ? 'selected' : ''}>Não</option></select>${c.porque ? '<small class="muted">' + esc(c.porque) + '</small>' : ''}</div>`;
          if (c.tipo === 'bool') return `<div class="check"><input type="checkbox" class="ctxBool" data-id="${c.id}" ${v === true ? 'checked' : ''}><div>${esc(c.pergunta)}${c.porque ? '<br><small class="muted">' + esc(c.porque) + '</small>' : ''}</div></div>`;
          if (c.tipo === 'select') return `<div class="field"><label>${esc(c.pergunta)}</label><select class="ctxSel" data-id="${c.id}"><option value="">—</option>${(c.opcoes || []).map(o => { const val = typeof o === 'string' ? o : o.valor; const lab = typeof o === 'string' ? o : o.rotulo; return `<option value="${esc(val)}" ${v === val ? 'selected' : ''}>${esc(lab)}</option>`; }).join('')}</select></div>`;
          return `<div class="field"><label>${esc(c.pergunta)}</label><input class="ctxText" data-id="${c.id}" value="${esc(v || '')}"></div>`;
        }).join('')}${nav(true, true)}</div>`;
    } else if (at.etapa === 2) {
      const sg = D().sinaisGravidade || []; const rel = new Set(queixa.sinaisGravidade || []);
      const ordered = sg.slice().sort((a, b) => (rel.has(b.id) - rel.has(a.id)));
      body = `${alertaLactente}<div class="card"><h2>3. Sinais de gravidade</h2><p class="muted">Sinais destacados são os mais relevantes para esta queixa. Qualquer sinal marcado gera alerta.</p>
        <div class="toggles">${ordered.map(s => `<span class="toggle red ${at.gravidade.includes(s.id) ? 'on' : ''}" data-act="togGrav" data-id="${s.id}" title="${esc(s.descricao)}" style="${rel.has(s.id) ? 'border-color:#f3c1bd' : ''}">${rel.has(s.id) ? '⚠️ ' : ''}${esc(s.nome)}</span>`).join('')}</div>
        ${at.gravidade.length ? `<div class="alert red" style="margin-top:.8rem"><strong>⚠️ Sinais de gravidade presentes – avaliar emergência</strong>${at.gravidade.map(id => { const s = sg.find(x => x.id === id); return s ? `<div style="margin:.3rem 0"><b>${esc(s.nome)}:</b> ${esc(s.acao)}</div>` : ''; }).join('')}<a class="btn danger sm" href="#/emergencias">Abrir emergências</a></div>` : '<div class="alert green">Nenhum sinal de gravidade marcado. Reavaliar periodicamente.</div>'}
        ${nav(true, true)}</div>`;
    } else if (at.etapa === 3) {
      const dx = diferenciais(queixa, at); const tags = Array.from(contextoTags(at));
      body = `${alertaLactente}<div class="card"><h2>4. Diagnósticos diferenciais a considerar</h2>
        <p class="muted">Hipóteses compatíveis com: <b>${esc(queixa.nome)}</b>${at.sintomas.length ? ' + ' + at.sintomas.map(s => { const x = (queixa.sintomasAssociados || []).find(y => y.id === s); return esc(x ? x.nome : s); }).join(', ') : ''}${tags.length ? ' · contexto: ' + tags.map(t => `<span class="chip green">${esc(t)}</span>`).join(' ') : ''}</p>
        <div class="alert blue"><strong>Apoio à decisão</strong>Lista ordenada por compatibilidade com sintomas e contexto. Não constitui diagnóstico. Selecione as hipóteses em consideração para orientar exames e protocolos.</div>
        <div class="list">${dx.map(h => { const on = at.hipoteses.some(x => (x.doencaId || x.nome) === (h.doencaId || h.nome)); const d = h.doencaId ? (D().doencas || []).find(x => x.id === h.doencaId) : null; return `<div class="row" style="${on ? 'border-color:var(--primary);background:var(--primary-soft)' : ''}"><input type="checkbox" data-act="togHip" data-key="${esc(h.doencaId || h.nome)}" ${on ? 'checked' : ''} style="width:22px;height:22px"><div class="grow"><div class="title">${esc(h.nome)} ${h.reforcada ? '<span class="chip amber">reforçada pelo contexto</span>' : ''} ${d && d.amazonia ? '<span class="chip green">Amazônia</span>' : ''}</div>${h.notas.length ? `<div class="sub">${h.notas.map(esc).join(' · ')}</div>` : ''}</div>${d ? `<a class="btn sm ghost" href="#/doencas/${d.id}">protocolo</a>` : ''}</div>`; }).join('') || '<div class="empty">Sem hipóteses cadastradas para esta combinação.</div>'}</div>
        ${nav(true, true)}</div>`;
    } else if (at.etapa === 4) {
      const ex = new Set(queixa.exames || []);
      at.hipoteses.forEach(h => { const d = h.doencaId ? (D().doencas || []).find(x => x.id === h.doencaId) : null; if (d) (d.exames || []).forEach(e => ex.add(e)); });
      body = `<div class="card"><h2>5. Exames a considerar</h2><p class="muted">Sugeridos pela queixa e pelas hipóteses selecionadas. Marque os solicitados.</p>
        ${Array.from(ex).map(e => { const info = (D().exames || []).find(x => x.id === e); return `<div class="check"><input type="checkbox" data-act="togExame" data-id="${esc(e)}" ${at.examesSelecionados.includes(e) ? 'checked' : ''}><div>${esc(info ? info.nome : e)} ${info ? `<a href="#/exames/${info.id}" class="muted" style="font-size:.8rem">(referências)</a>` : ''}</div></div>`; }).join('') || '<p class="muted">Sem exames sugeridos.</p>'}
        <h3 style="margin-top:1rem">Conduta inicial sugerida</h3>${U.list(queixa.condutaInicial)}${U.fontes(queixa)}${nav(true, true)}</div>`;
    } else if (at.etapa === 5) {
      const ds = at.hipoteses.map(h => h.doencaId && (D().doencas || []).find(x => x.id === h.doencaId)).filter(Boolean);
      body = `<div class="card"><h2>6. Protocolos das hipóteses selecionadas</h2>${ds.length ? ds.map(d => `<details><summary>${esc(d.nome)} ${d.amazonia ? '<span class="chip green">Amazônia</span>' : ''}</summary><div class="body">
          <h3>Sinais de alarme</h3>${U.list(d.sinaisAlarme)}<h3>Critérios diagnósticos</h3>${U.list(d.criteriosDiagnosticos)}<h3>Classificação de gravidade</h3>${(d.classificacaoGravidade || []).map(c => `<p><b>${esc(c.nivel)}:</b> ${esc(c.criterios)}</p>`).join('')}<h3>Critérios de internação</h3>${U.list(d.criteriosInternacao)}<a class="btn sm secondary" href="#/doencas/${d.id}">Protocolo completo</a>${U.fontes(d)}</div></details>`).join('') : '<div class="empty">Selecione hipóteses na etapa 4 para ver os protocolos.</div>'}${nav(true, true)}</div>`;
    } else if (at.etapa === 6) {
      const ds = at.hipoteses.map(h => h.doencaId && (D().doencas || []).find(x => x.id === h.doencaId)).filter(Boolean);
      body = `${pesoBox()}<div class="card"><h2>7. Tratamento e medicações</h2><p class="muted">Doses calculadas com peso ${peso ? '<b>' + f(peso) + ' kg</b>' : '<span class="chip red">não informado</span>'}. Adicione à prescrição os itens que a médica decidir utilizar.</p>
        ${ds.length ? ds.map(d => `<details open><summary>${esc(d.nome)}</summary><div class="body">${U.list(d.tratamento)}<h3>Medicamentos do protocolo</h3>${(d.medicamentos || []).map(m => { const med = m.medId ? (D().medicamentos || []).find(x => x.id === m.medId) : null; return `<div class="row"><span class="ic">💊</span><div class="grow"><div class="title">${esc(med ? med.nome : (m.nome || m.medId))}</div><div class="sub">${esc(m.esquema || '')}</div></div>${med ? `<button class="btn sm" data-act="calcMed" data-id="${med.id}">Calcular / prescrever</button>` : ''}</div>`; }).join('') || '<p class="muted">Sem medicamentos vinculados.</p>'}${U.fontes(d)}</div></details>`).join('') : '<div class="empty">Selecione hipóteses na etapa 4.</div>'}
        <div id="calcMedBox"></div>
        <h3>Itens já adicionados à prescrição</h3>${itensPrescricaoDraft()}
        ${nav(true, true, 'Ir para prescrição')}</div>`;
    } else {
      body = `<div class="card"><h2>8. Prescrição e registro</h2>
        ${p ? `<p>Paciente: <b>${esc(p.nome)}</b></p>` : '<div class="alert amber"><strong>Sem paciente</strong>Selecione ou cadastre um paciente para salvar o atendimento e emitir a prescrição.</div>'}
        <p>Itens na prescrição: <b>${(state.prescricaoDraft && state.prescricaoDraft.itens.length) || 0}</b></p>
        <div class="btnrow">${p ? `<button class="btn green" data-act="salvarAtendimento">💾 Salvar atendimento</button><button class="btn" data-act="irPrescricao">📄 Revisar e emitir prescrição</button><a class="btn secondary" href="#/evolucao/nova?pacienteId=${p.id}">📝 Evolução SOAP</a>` : `<a class="btn" href="#/pacientes/novo">➕ Cadastrar paciente</a><a class="btn secondary" href="#/pacientes">Selecionar paciente</a>`}<button class="btn ghost" data-act="reiniciarAt">Reiniciar fluxo</button></div>
        ${nav(true, false)}</div>`;
    }
    return `<div class="section-title"><h1>${queixa.icone || ''} ${esc(queixa.nome)}</h1>${p ? `<span class="chip green">${esc(p.nome.split(' ')[0])}${idade ? ' · ' + esc(idade.texto) : ''}</span>` : ''}</div>${steps}${body}${disclaimer}`;
  });

  function itensPrescricaoDraft() {
    const d = state.prescricaoDraft; if (!d || !d.itens.length) return '<p class="muted">Nenhum item.</p>';
    return `<div class="list">${d.itens.map((i, idx) => `<div class="row"><span class="ic">📄</span><div class="grow"><div class="title">${esc(i.medicamento)}</div><div class="sub">${esc(i.dose)} · ${esc(i.via)} · ${esc(i.intervalo)} · ${esc(i.duracao)}</div></div><button class="btn sm ghost" data-act="delItemDraft" data-i="${idx}">✕</button></div>`).join('')}</div>`;
  }

  /** Painel de cálculo de dose de um medicamento (usado no fluxo e na tela do medicamento) */
  function painelDoseMed(med, peso, opts) {
    opts = opts || {};
    const idade = idadePaciente();
    const doses = med.doses || [];
    const aps = (med.apresentacoes || []).filter(a => a.mg != null);
    const sel = opts.doseIdx != null ? opts.doseIdx : 0, apIdx = opts.apIdx != null ? opts.apIdx : 0;
    const d = doses[sel]; const ap = aps[apIdx];
    const un = (d && d.unidade) || (ap && ap.unidade) || 'mg';   // mg, UI, jatos, comprimidos…
    let res = '';
    if (d && peso) {
      const mgkg = d.mgKgDose != null ? d.mgKgDose : (d.mgKgDia != null && d.vezesDia ? d.mgKgDia / d.vezesDia : null);
      if (mgkg != null) {
        let dose = mgkg * peso; const al = [];
        if (d.doseMaxDose && dose > d.doseMaxDose) { al.push(`Dose por administração limitada ao máximo de ${f(d.doseMaxDose)} ${un}.`); dose = d.doseMaxDose; }
        const dia = dose * (d.vezesDia || 1);
        if (d.doseMaxDia && dia > d.doseMaxDia) al.push(`Dose diária (${f(dia)} ${un}) excede o máximo diário de ${f(d.doseMaxDia)} ${un}: reduzir.`);
        let vol = null, conc = null; if (ap && ap.ml) { conc = ap.mg / ap.ml; vol = dose / conc; }
        const comp = (ap && !ap.ml && ap.mg) ? dose / ap.mg : null;
        res = `<div class="result ${al.length ? 'warn' : ''}"><div class="big">${f(dose)} ${esc(un)}${vol != null ? ' = ' + f(vol) + ' mL' : ''}${comp != null ? ' = ' + f(comp, 2) + ' ' + esc(ap.tipo || 'unidade') + '(s)' : ''}</div><div>por administração · ${esc(d.frequencia)} · ${esc(d.via)}${d.duracao ? ' · ' + esc(d.duracao) : ''}</div>
          <div class="formula">Dose = ${f(mgkg)} ${un}/kg × ${f(peso)} kg = ${f(mgkg * peso)} ${un}${d.mgKgDose == null ? ` (a partir de ${f(d.mgKgDia)} ${un}/kg/dia ÷ ${d.vezesDia})` : ''}${vol != null ? `\nConcentração = ${f(ap.mg)} ${un} ÷ ${f(ap.ml)} mL = ${f(conc)} ${un}/mL\nVolume = ${f(dose)} ${un} ÷ ${f(conc)} ${un}/mL = ${f(vol)} mL` : ''}\nDose diária = ${f(dose)} × ${d.vezesDia || 1} = ${f(dia)} ${un}/dia (${f(dia / peso)} ${un}/kg/dia)</div>
          ${d.faixasPeso ? `<div><small class="muted">Esquema prático por faixa de peso: ${esc(d.faixasPeso)}</small></div>` : ''}
          ${al.map(a => `<div class="alert amber" style="margin:.4rem 0 0">${esc(a)}</div>`).join('')}</div>`;
      } else if (d.mlKgDose != null) {
        res = `<div class="result"><div class="big">${f(d.mlKgDose * peso)} mL</div><div>${esc(d.frequencia)} · ${esc(d.via)}</div><div class="formula">${f(d.mlKgDose)} mL/kg × ${f(peso)} kg = ${f(d.mlKgDose * peso)} mL</div></div>`;
      } else if (d.doseFixa) {
        res = `<div class="result"><div class="big" style="font-size:1.1rem">${esc(d.doseFixa)}</div><div>${esc(d.frequencia)} · ${esc(d.via)}</div>${d.faixasPeso ? `<div class="formula">Por faixa de peso (paciente: ${f(peso)} kg): ${esc(d.faixasPeso)}</div>` : ''}${d.faixasIdade ? `<div class="formula">Por idade: ${esc(d.faixasIdade)}</div>` : ''}</div>`;
      } else res = `<div class="alert blue">Esquema sem dose por kg cadastrada: ${esc(d.obs || 'ver protocolo')}</div>`;
    } else if (!peso) res = '<div class="alert amber">Informe o peso para calcular.</div>';
    const idadeAlert = (d && d.faixaEtaria && idade) ? `<small class="muted">Faixa etária do esquema: ${esc(d.faixaEtaria)} · paciente: ${esc(idade.texto)}</small>` : '';
    const p = paciente();
    const alergia = (p && p.alergias && U.normalize(p.alergias).includes(U.normalize(med.nome).slice(0, 6))) ? `<div class="alert red"><strong>⚠️ Alergia registrada</strong>${esc(p.alergias)}</div>` : '';
    return `<div class="card" id="painelDose" data-med="${med.id}"><h2>💊 ${esc(med.nome)} <small class="muted">${esc(med.classe)}</small></h2>${alergia}
      <div class="fields"><div class="field full"><label>Esquema / indicação</label><select id="doseSel">${doses.map((x, i) => `<option value="${i}" ${i === sel ? 'selected' : ''}>${esc(x.indicacao)} – ${x.mgKgDose != null ? f(x.mgKgDose) + ' ' + (x.unidade || 'mg') + '/kg/dose' : x.mgKgDia != null ? f(x.mgKgDia) + ' ' + (x.unidade || 'mg') + '/kg/dia' : x.mlKgDose != null ? f(x.mlKgDose) + ' mL/kg' : x.doseFixa ? 'dose fixa/por faixa' : 'ver obs.'} ${esc(x.frequencia)} ${esc(x.via)}</option>`).join('')}</select></div>
      <div class="field full"><label>Apresentação</label><select id="apSel">${aps.map((a, i) => `<option value="${i}" ${i === apIdx ? 'selected' : ''}>${esc(a.descricao)}</option>`).join('')}</select></div></div>
      ${d ? `<p><small class="muted">${esc(d.obs || '')}${d.doseMaxDose ? ' · Máx./dose: ' + f(d.doseMaxDose) + ' ' + esc(un) : ''}${d.doseMaxDia ? ' · Máx./dia: ' + f(d.doseMaxDia) + ' ' + esc(un) : ''}</small></p>${idadeAlert}` : ''}
      ${res}
      <div class="btnrow"><button class="btn" data-act="addItemDraft" data-med="${med.id}" data-dose="${sel}" data-ap="${apIdx}">➕ Adicionar à prescrição</button><a class="btn ghost sm" href="#/medicamentos/${med.id}">ficha completa</a></div>${U.fontes(med)}</div>`;
  }
  function montarItem(med, doseIdx, apIdx, peso) {
    const d = (med.doses || [])[doseIdx] || {}; const aps = (med.apresentacoes || []).filter(a => a.mg != null); const ap = aps[apIdx];
    const mgkg = d.mgKgDose != null ? d.mgKgDose : (d.mgKgDia != null && d.vezesDia ? d.mgKgDia / d.vezesDia : null);
    let doseTxt = '', calc = '';
    const un = d.unidade || (ap && ap.unidade) || 'mg';
    if (mgkg != null && peso) { let dose = mgkg * peso; if (d.doseMaxDose && dose > d.doseMaxDose) dose = d.doseMaxDose; doseTxt = `${f(dose)} ${un}`; if (ap && ap.ml) doseTxt += ` (${f(dose / (ap.mg / ap.ml))} mL de ${ap.descricao})`; else if (ap && ap.mg) doseTxt += ` (${f(dose / ap.mg, 2)} ${ap.tipo || 'un'} de ${ap.descricao})`; calc = `${f(mgkg)} ${un}/kg × ${f(peso)} kg`; }
    else if (d.mlKgDose != null && peso) { doseTxt = `${f(d.mlKgDose * peso)} mL`; calc = `${f(d.mlKgDose)} mL/kg × ${f(peso)} kg`; }
    else if (d.doseFixa) { doseTxt = d.doseFixa; calc = d.faixasPeso ? 'Faixa de peso: ' + d.faixasPeso : ''; }
    else doseTxt = d.obs || 'definir';
    const n = d.vezesDia || 1; const horarios = n === 1 ? '08h' : n === 2 ? '08h – 20h' : n === 3 ? '06h – 14h – 22h' : n === 4 ? '06h – 12h – 18h – 24h' : n === 6 ? '4/4 h' : `${n}x/dia`;
    return { medicamento: med.nome, apresentacao: ap ? ap.descricao : '', dose: doseTxt, via: d.via || '', intervalo: d.frequencia || '', horarios, duracao: d.duracao || '', orientacoes: d.obs || '', calculo: calc, fonte: (med.fontes || []).map(x => x.nome).join('; ') };
  }

  /* ---- Doenças ---- */
  const CATS = { amazonia: 'Amazônia', respiratoria: 'Respiratórias', gastrointestinal: 'Gastrointestinais', infecciosa: 'Infecciosas', dermatologica: 'Pele', nutricional: 'Nutricionais', neurologica: 'Neurológicas', urinaria: 'Urinárias', toxicologica: 'Toxicológicas' };
  route('/doencas', (p, q) => {
    const ds = (D().doencas || []).slice().sort((a, b) => a.nome.localeCompare(b.nome)); const cats = {};
    ds.forEach(d => (cats[d.categoria] = cats[d.categoria] || []).push(d));
    return `<h1>Doenças e protocolos</h1><p class="muted">${ds.length} protocolos padronizados (definição, epidemiologia, clínica, alarme, exames, gravidade, tratamento, internação, alta, orientações, prevenção).</p>
      ${Object.keys(cats).map(c => `<div class="section-title"><h2>${CATS[c] || c}</h2></div><div class="list">${cats[c].map(d => `<a class="row" href="#/doencas/${d.id}"><span class="ic">${d.amazonia ? '🌳' : '📘'}</span><div class="grow"><div class="title">${esc(d.nome)}</div><div class="sub">${esc((d.definicao || '').slice(0, 110))}…</div></div></a>`).join('')}</div>`).join('')}${disclaimer}`;
  });
  function telaDoenca(d) {
    const sec = (t, html) => `<details><summary>${t}</summary><div class="body">${html}</div></details>`;
    const peso = pesoAtivo();
    return `<div class="section-title"><h1>${esc(d.nome)}</h1><span>${d.amazonia ? '<span class="chip green">Amazônia</span>' : ''}${d.cid10 ? '<span class="chip gray">CID-10 ' + esc(d.cid10) + '</span>' : ''}</span></div>
      <div class="card"><p>${esc(d.definicao)}</p>${(d.sinaisAlarme || []).length ? `<div class="alert red"><strong>Sinais de alarme</strong>${U.list(d.sinaisAlarme)}</div>` : ''}</div>
      ${sec('Epidemiologia (Amazonas)', `<p>${esc(d.epidemiologia)}</p>`)}
      ${sec('Agente, transmissão e incubação', `<dl class="kv"><dt>Agente</dt><dd>${esc(d.agente)}</dd><dt>Transmissão</dt><dd>${esc(d.transmissao)}</dd><dt>Incubação</dt><dd>${esc(d.incubacao)}</dd></dl>`)}
      ${sec('Manifestações clínicas', U.list(d.manifestacoes))}
      ${sec('Diagnósticos diferenciais', `<p>${linkDoencas(d.diagnosticoDiferencial)}</p>`)}
      ${sec('Exames', `<p>${linkExames(d.exames)}</p>`)}
      ${sec('Critérios diagnósticos', U.list(d.criteriosDiagnosticos))}
      ${sec('Classificação de gravidade', (d.classificacaoGravidade || []).map(c => `<p><b>${esc(c.nivel)}:</b> ${esc(c.criterios)}</p>`).join(''))}
      ${sec('Tratamento', U.list(d.tratamento))}
      ${sec('Medicamentos' + (peso ? ` (peso ${f(peso)} kg)` : ''), (d.medicamentos || []).map(m => { const med = m.medId ? (D().medicamentos || []).find(x => x.id === m.medId) : null; return `<div class="row"><span class="ic">💊</span><div class="grow"><div class="title">${esc(med ? med.nome : (m.nome || m.medId))}</div><div class="sub">${esc(m.esquema || '')}</div></div>${med ? `<a class="btn sm" href="#/medicamentos/${med.id}">calcular</a>` : ''}</div>`; }).join('') || '<p class="muted">—</p>')}
      ${sec('Critérios de internação', U.list(d.criteriosInternacao))}
      ${sec('Critérios de UTI', U.list(d.criteriosUTI))}
      ${sec('Critérios de alta', U.list(d.criteriosAlta))}
      ${sec('Orientação aos responsáveis', U.list(d.orientacoes))}
      ${sec('Retorno', `<p>${esc(d.retorno)}</p>`)}
      ${sec('Prevenção', U.list(d.prevencao))}
      <div class="card compact">${U.fontes(d)}</div>${disclaimer}`;
  }
  route('/doencas/:id', ({ id }) => { const d = (D().doencas || []).find(x => x.id === id); return d ? telaDoenca(d) : '<div class="empty">Não encontrada.</div>'; });

  /* ---- Amazônia ---- */
  route('/amazonia', () => {
    const ordem = ['malaria', 'dengue', 'oropouche', 'mayaro', 'chikungunya', 'zika', 'febre_amarela', 'leishmaniose_visceral', 'leishmaniose_tegumentar', 'doenca_chagas', 'leptospirose', 'tuberculose', 'hanseniase', 'parasitoses_intestinais', 'acidente_ofidico', 'escorpionismo', 'araneismo'];
    const ds = D().doencas || []; const lista = ordem.map(id => ds.find(d => d.id === id)).filter(Boolean).concat(ds.filter(d => d.amazonia && !ordem.includes(d.id)));
    return `<div class="card" style="background:linear-gradient(135deg,#e4f5ec,#e3f3f5);border:none"><h1>🌳 Amazônia</h1><p>Doenças prevalentes na região amazônica com epidemiologia regional, sintomas, diagnóstico, exames, tratamento e sinais de gravidade. Sempre perguntar: município, zona (rural, ribeirinha, indígena), entrada em mata, contato com água de rio, viagem recente.</p></div>
      <div class="grid wide">${lista.map(d => `<a class="tile amazon" href="#/doencas/${d.id}"><span class="ic">${{ malaria: '🦟', dengue: '🦟', oropouche: '🦟', mayaro: '🦟', chikungunya: '🦟', zika: '🦟', febre_amarela: '🦟', leishmaniose_visceral: '🐕', leishmaniose_tegumentar: '🩹', doenca_chagas: '🫐', leptospirose: '🌊', tuberculose: '🫁', hanseniase: '🖐️', parasitoses_intestinais: '🪱', acidente_ofidico: '🐍', escorpionismo: '🦂', araneismo: '🕷️' }[d.id] || '🌿'}</span>${esc(d.nome)}<small>${esc((d.agente || '').slice(0, 40))}</small></a>`).join('')}</div>
      <div class="card"><h2>Contexto epidemiológico – perguntas-chave</h2>${U.list((D().contextoEpidemiologico || []).map(c => c.pergunta))}</div>
      <div class="card"><h2>Emergências regionais</h2><div class="btnrow"><a class="btn danger" href="#/emergencias/acidente_ofidico">🐍 Acidente ofídico</a><a class="btn danger" href="#/emergencias/escorpionismo">🦂 Escorpionismo</a><a class="btn secondary" href="#/doencas/malaria">🦟 Malária grave</a><a class="btn secondary" href="#/doencas/dengue">🦟 Dengue grave</a></div></div>${disclaimer}`;
  });

  /* ---- Medicamentos ---- */
  route('/medicamentos', (p, q) => {
    const ms = (D().medicamentos || []).slice().sort((a, b) => a.nome.localeCompare(b.nome)); const cls = {};
    ms.forEach(m => { const k = String(m.classe || 'Outros').split(' –')[0].split(' (')[0]; (cls[k] = cls[k] || []).push(m); });
    return `<h1>Medicamentos pediátricos</h1>${pesoBox('Informe o peso para calcular doses ao abrir um medicamento.')}
      <div class="field"><input id="filtroMed" placeholder="Filtrar por nome ou classe…"></div>
      <div id="listaMed">${Object.keys(cls).sort().map(c => `<div class="section-title"><h2>${esc(c)}</h2></div><div class="list">${cls[c].map(m => `<a class="row medrow" data-n="${esc(U.normalize(m.nome + ' ' + m.classe))}" href="#/medicamentos/${m.id}"><span class="ic">💊</span><div class="grow"><div class="title">${esc(m.nome)} ${m.verificar ? '<span class="chip amber">verificar</span>' : ''}</div><div class="sub">${esc(m.classe)} · ${(m.doses || []).length} esquema(s)</div></div></a>`).join('')}</div>`).join('')}</div>${disclaimer}`;
  });
  route('/medicamentos/:id', ({ id }) => {
    const m = (D().medicamentos || []).find(x => x.id === id); if (!m) return '<div class="empty">Não encontrado.</div>';
    const peso = pesoAtivo();
    return `${pesoBox()}${painelDoseMed(m, peso)}
      <div class="card"><h2>Ficha</h2><dl class="kv"><dt>Classe</dt><dd>${esc(m.classe)}</dd><dt>Indicações</dt><dd>${(m.indicacoes || []).map(esc).join('; ')}</dd><dt>Apresentações</dt><dd>${U.list((m.apresentacoes || []).map(a => a.descricao + (a.reconstituicao ? ' – ' + a.reconstituicao : '')))}</dd></dl>
        <h3>Esquemas posológicos</h3><div class="tablewrap"><table><tr><th>Indicação</th><th>Dose</th><th>Freq.</th><th>Via</th><th>Máximo</th><th>Duração</th></tr>${(m.doses || []).map(d => `<tr><td>${esc(d.indicacao)}${d.faixaEtaria ? '<br><small class="muted">' + esc(d.faixaEtaria) + '</small>' : ''}</td><td>${d.mgKgDose != null ? f(d.mgKgDose) + ' ' + esc(d.unidade || 'mg') + '/kg/dose' : ''}${d.mgKgDia != null ? '<br>' + f(d.mgKgDia) + ' ' + esc(d.unidade || 'mg') + '/kg/dia' : ''}${d.mlKgDose != null ? f(d.mlKgDose) + ' mL/kg' : ''}${d.doseFixa && d.mgKgDose == null && d.mlKgDose == null ? esc(d.doseFixa) : ''}${d.verificar ? ' <span class="chip amber">verificar</span>' : ''}</td><td>${esc(d.frequencia)}</td><td>${esc(d.via)}</td><td>${d.doseMaxDose ? f(d.doseMaxDose) + ' ' + esc(d.unidade || 'mg') + '/dose' : ''}${d.doseMaxDia ? '<br>' + f(d.doseMaxDia) + ' ' + esc(d.unidade || 'mg') + '/dia' : ''}</td><td>${esc(d.duracao || '')}</td></tr>${d.obs ? `<tr><td colspan="6"><small class="muted">${esc(d.obs)}</small></td></tr>` : ''}`).join('')}</table></div>
        <dl class="kv" style="margin-top:.8rem"><dt>Diluição</dt><dd>${esc(m.diluicao || '—')}</dd><dt>Infusão</dt><dd>${esc(m.infusao || '—')}</dd><dt>Contraindicações</dt><dd>${U.list(m.contraindicacoes)}</dd><dt>Interações</dt><dd>${U.list(m.interacoes)}</dd><dt>Ajuste renal</dt><dd>${esc(m.ajusteRenal || '—')}</dd><dt>Ajuste hepático</dt><dd>${esc(m.ajusteHepatico || '—')}</dd><dt>Efeitos adversos</dt><dd>${U.list(m.efeitosAdversos)}</dd></dl>${U.fontes(m)}</div>${disclaimer}`;
  });

  /* ---- Calculadoras ---- */
  route('/calculadoras', () => {
    const cs = PED.calc.calculadoras; const g = {}; cs.forEach(c => (g[c.grupo] = g[c.grupo] || []).push(c));
    return `<h1>Calculadoras pediátricas</h1>${pesoBox('Peso, altura e idade do paciente ativo são preenchidos automaticamente.')}
      ${Object.keys(g).map(k => `<div class="section-title"><h2>${esc(k)}</h2></div><div class="grid">${g[k].map(c => `<a class="tile" href="#/calculadoras/${c.id}"><span class="ic">${c.icone}</span>${esc(c.nome)}</a>`).join('')}</div>`).join('')}${disclaimer}`;
  });
  route('/calculadoras/:id', ({ id }) => {
    const c = PED.calc.calculadoras.find(x => x.id === id); if (!c) return '<div class="empty">Não encontrada.</div>';
    const p = paciente(); const idade = idadePaciente(); const pesoQ = pesoAtivo();
    const auto = { peso: pesoQ, altura: p && p.altura, idadeMeses: idade ? Math.round(idade.totalMeses) : null, sexo: p && p.sexo, pc: p && p.pc };
    return `<h1>${c.icone} ${esc(c.nome)}</h1><p class="muted">${esc(c.descricao)}</p>
      <form id="formCalc" class="card" data-id="${c.id}"><div class="fields">${c.campos.map(k => {
        const v = k.fromPatient && auto[k.fromPatient] != null ? auto[k.fromPatient] : (k.default != null ? k.default : '');
        if (k.tipo === 'select') return `<div class="field"><label>${esc(k.label)}</label><select name="${k.id}">${k.opcoes.map(o => `<option value="${esc(o[0])}" ${String(v) === String(o[0]) ? 'selected' : ''}>${esc(o[1])}</option>`).join('')}</select></div>`;
        return `<div class="field"><label>${esc(k.label)}</label><input type="number" name="${k.id}" step="${k.step || 'any'}" value="${v == null ? '' : v}" placeholder="${esc(k.placeholder || '')}"></div>`;
      }).join('')}</div><div class="btnrow"><button class="btn" type="submit">Calcular</button></div><div id="calcOut"></div></form>${disclaimer}`;
  });
  function renderCalcOut(r) {
    if (!r) return '<div class="alert amber">Preencha os campos necessários.</div>';
    return `<div class="result">${r.resultados.map(x => `<div style="margin:.2rem 0"><span class="${x.destaque ? 'big' : ''}">${esc(x.valor)}</span> <b>${esc(x.unidade || '')}</b> <span class="muted">– ${esc(x.label)}</span></div>`).join('')}<div class="formula">${esc(r.formula || '')}</div></div>
      ${(r.alertas || []).map(a => `<div class="alert amber">${esc(a)}</div>`).join('')}<div class="source">Fontes: ${(r.fontes || []).map(esc).join('; ')}</div>`;
  }

  /* ---- Emergências ---- */
  route('/emergencias', () => {
    const es = D().emergencias || [];
    return `<div class="card" style="background:var(--red-soft);border-color:#f3c1bd"><h1>🚨 Emergências pediátricas</h1><p>Informe o peso: as doses das drogas de emergência são calculadas automaticamente. Confirmar sempre com a equipe e o protocolo institucional.</p></div>${pesoBox()}
      <div class="grid">${es.map(e => `<a class="tile red" href="#/emergencias/${e.id}"><span class="ic">${e.icone || '🚨'}</span>${esc(e.nome)}</a>`).join('')}</div>
      <div class="btnrow"><a class="btn secondary" href="#/calculadoras/tubo">🩺 Tubo e materiais por idade</a><a class="btn secondary" href="#/calculadoras/sinaisvitais">❤️ Sinais vitais por idade</a></div>${disclaimer}`;
  });
  route('/emergencias/:id', ({ id }) => {
    const e = (D().emergencias || []).find(x => x.id === id); if (!e) return '<div class="empty">Não encontrada.</div>';
    const peso = pesoAtivo(); const idade = idadePaciente();
    return `<div class="section-title"><h1>${e.icone || '🚨'} ${esc(e.nome)}</h1><span class="chip red">${esc(e.cor || 'emergência')}</span></div>${pesoBox()}
      <div class="card"><h2>Reconhecimento</h2>${U.list(e.reconhecimento)}</div>
      <div class="card"><h2>Passos</h2><ol>${(e.passos || []).map(x => `<li>${esc(x)}</li>`).join('')}</ol></div>
      <div class="card"><h2>Doses ${peso ? `<span class="chip green">${f(peso)} kg</span>` : '<span class="chip red">informe o peso</span>'}</h2><div class="tablewrap"><table><tr><th>Droga</th><th>Dose calculada</th><th>Via / repetição</th></tr>${(e.doses || []).map(d => doseRow(peso, d)).join('')}</table></div>${idade && idade.totalMeses < 1 ? '<div class="alert amber">Recém-nascido: usar protocolos neonatais específicos (reanimação neonatal SBP).</div>' : ''}</div>
      ${(e.materiais || []).length ? `<div class="card"><h2>Materiais</h2>${U.list(e.materiais)}</div>` : ''}
      ${(e.criteriosUTI || []).length ? `<div class="card"><h2>Critérios de UTI / transferência</h2>${U.list(e.criteriosUTI)}</div>` : ''}
      <div class="card compact">${U.fontes(e)}</div>${disclaimer}`;
  });

  /* ---- Exames ---- */
  route('/exames', () => {
    const ex = (D().exames || []).slice(); const cats = {}; ex.forEach(x => (cats[x.categoria] = cats[x.categoria] || []).push(x));
    const nomes = { hematologia: 'Hematologia', bioquimica: 'Bioquímica', gasometria: 'Gasometria', urina: 'Urina', liquor: 'Líquor', infeccioso: 'Infecciosos / sorologias', microbiologia: 'Microbiologia', imagem: 'Imagem', outros: 'Outros' };
    return `<h1>Exames</h1><p class="muted">Valores de referência por faixa etária, indicações e interpretação de apoio.</p>${Object.keys(cats).map(c => `<div class="section-title"><h2>${nomes[c] || esc(c)}</h2></div><div class="list">${cats[c].map(x => `<a class="row" href="#/exames/${x.id}"><span class="ic">🧪</span><div class="grow"><div class="title">${esc(x.nome)}</div><div class="sub">${esc((x.descricao || '').slice(0, 100))}</div></div></a>`).join('')}</div>`).join('')}${disclaimer}`;
  });
  route('/exames/:id', ({ id }) => {
    const x = (D().exames || []).find(e => e.id === id); if (!x) return '<div class="empty">Não encontrado.</div>';
    const idade = idadePaciente();
    return `<h1>🧪 ${esc(x.nome)}</h1><div class="card"><p>${esc(x.descricao)}</p>${idade ? `<p class="muted">Paciente ativo: ${esc(idade.texto)} (${esc(U.faixaEtaria(idade.totalMeses))})</p>` : ''}
      ${(x.referencias || []).length ? `<h3>Valores de referência</h3><div class="tablewrap"><table><tr><th>Faixa</th><th>Valores</th></tr>${x.referencias.map(r => `<tr><td>${esc(r.faixa)}</td><td>${esc(r.valores)}</td></tr>`).join('')}</table></div>` : ''}
      ${(x.quandoSolicitar || []).length ? `<h3>Quando solicitar</h3>${U.list(x.quandoSolicitar)}` : ''}<h3>Interpretação (apoio)</h3>${U.list(x.interpretacao)}${U.fontes(x)}</div>${disclaimer}`;
  });

  /* ---- Vacinas ---- */
  route('/vacinas', () => {
    const vs = D().vacinas || []; const p = paciente();
    const porIdade = {}; vs.forEach(v => (v.doses || []).forEach(d => (porIdade[d.idadeMeses] = porIdade[d.idadeMeses] || []).push({ v, d })));
    const rot = (m) => m === 0 ? 'Ao nascer' : m < 12 ? m + ' meses' : m % 12 === 0 ? (m / 12) + ' anos' : (Math.floor(m / 12)) + ' anos e ' + (m % 12) + ' m';
    return `<h1>💉 Vacinação</h1><p class="muted">Calendário Nacional de Vacinação (PNI/MS) – crianças e adolescentes.</p>${p ? `<div class="btnrow"><a class="btn" href="#/pacientes/${p.id}?tab=vacinas">Ver situação vacinal de ${esc(p.nome.split(' ')[0])}</a></div>` : '<div class="alert blue">Selecione um paciente para ver vacinas realizadas, pendentes e atrasadas.</div>'}
      <div class="card"><h2>Calendário por idade</h2><div class="tablewrap"><table><tr><th>Idade</th><th>Vacinas</th></tr>${Object.keys(porIdade).map(Number).sort((a, b) => a - b).map(m => `<tr><td><b>${rot(m)}</b></td><td>${porIdade[m].map(x => `<span class="chip">${esc(x.v.nome)}: ${esc(x.d.dose || x.d.rotulo)}</span>`).join(' ')}</td></tr>`).join('')}</table></div></div>
      <div class="card"><h2>Vacinas – detalhes</h2>${vs.map(v => `<details><summary>${esc(v.nome)}</summary><div class="body"><dl class="kv"><dt>Protege contra</dt><dd>${esc(v.protege)}</dd><dt>Via</dt><dd>${esc(v.via)}</dd><dt>Esquema</dt><dd>${U.list((v.doses || []).map(d => d.rotulo + (d.dose ? ' – ' + d.dose : '')))}</dd><dt>Situações especiais</dt><dd>${esc(v.situacoesEspeciais || '—')}</dd><dt>Esquema atrasado</dt><dd>${esc(v.atrasoEsquema || '—')}</dd></dl>${U.fontes(v)}</div></details>`).join('')}</div>${disclaimer}`;
  });

  /* ---- Crescimento (referências) ---- */
  route('/crescimento', () => {
    const C = D().crescimento || {}; const p = paciente();
    const tab = (t, key) => t ? `<div class="tablewrap"><table><tr><th>${key}</th><th>p3</th><th>p15</th><th>p50</th><th>p85</th><th>p97</th></tr>${t.map(r => `<tr><td>${r.meses != null ? r.meses + ' m' : r.cm + ' cm'}</td><td>${f(r.p3)}</td><td>${f(r.p15)}</td><td>${f(r.p50)}</td><td>${f(r.p85)}</td><td>${f(r.p97)}</td></tr>`).join('')}</table></div>` : '';
    const cur = C.curvasOMS || {};
    return `<h1>📈 Crescimento e desenvolvimento</h1>${p ? `<div class="btnrow"><a class="btn" href="#/pacientes/${p.id}?tab=crescimento">Ver avaliação de ${esc(p.nome.split(' ')[0])}</a><a class="btn secondary" href="#/calculadoras/percentis">Calculadora de percentis</a></div>` : `<div class="btnrow"><a class="btn secondary" href="#/calculadoras/percentis">Calculadora de percentis</a></div>`}
      <div class="card"><h2>Sinais vitais por idade</h2><div class="tablewrap"><table><tr><th>Faixa</th><th>FC (bpm)</th><th>FR (irpm)</th><th>PAS (mmHg)</th><th>PAD (mmHg)</th></tr>${(C.sinaisVitais || []).map(s => `<tr><td>${esc(s.faixa)}</td><td>${s.fc[0]}–${s.fc[1]}</td><td>${s.fr[0]}–${s.fr[1]}</td><td>${s.pas[0]}–${s.pas[1]}</td><td>${s.pad ? s.pad[0] + '–' + s.pad[1] : '—'}</td></tr>`).join('')}</table></div></div>
      <div class="card"><h2>Marcos do desenvolvimento</h2><div class="tablewrap"><table><tr><th>Idade</th><th>Domínio</th><th>Marco</th><th>Alerta</th></tr>${(C.marcos || []).map(m => `<tr><td>${m.idadeMeses} m</td><td>${esc(m.dominio)}</td><td>${esc(m.marco)}</td><td><small>${esc(m.alerta || '')}</small></td></tr>`).join('')}</table></div></div>
      ${['pesoIdade', 'estaturaIdade', 'perimetroCefalico', 'imcIdade', 'pesoEstatura'].map(k => cur[k] ? `<details><summary>${{ pesoIdade: 'Peso/idade', estaturaIdade: 'Estatura/idade', perimetroCefalico: 'Perímetro cefálico/idade', imcIdade: 'IMC/idade', pesoEstatura: 'Peso/estatura' }[k]} (OMS)</summary><div class="body"><h3>Meninos</h3>${tab(cur[k].M, k === 'pesoEstatura' ? 'Compr.' : 'Idade')}<h3>Meninas</h3>${tab(cur[k].F, k === 'pesoEstatura' ? 'Compr.' : 'Idade')}</div></details>` : '').join('')}
      <div class="card compact">${U.fontes(C)}${cur.nota ? '<p class="muted"><small>' + esc(cur.nota) + '</small></p>' : ''}</div>${disclaimer}`;
  });

  /* ---- Prescrição ---- */
  function prescricaoForm(pr) {
    const p = pr.pacienteId ? S.byId('pacientes', pr.pacienteId) : null; const idade = p ? U.idade(p.dataNascimento) : null;
    const item = (i, idx) => `<div class="card compact prescItem" data-i="${idx}"><div class="fields">
      <div class="field"><label>Medicamento</label><input name="medicamento" value="${esc(i.medicamento)}"></div><div class="field"><label>Apresentação</label><input name="apresentacao" value="${esc(i.apresentacao || '')}"></div>
      <div class="field"><label>Dose</label><input name="dose" value="${esc(i.dose)}"></div><div class="field"><label>Via</label><input name="via" value="${esc(i.via)}"></div>
      <div class="field"><label>Intervalo</label><input name="intervalo" value="${esc(i.intervalo)}"></div><div class="field"><label>Horários</label><input name="horarios" value="${esc(i.horarios || '')}"></div>
      <div class="field"><label>Duração</label><input name="duracao" value="${esc(i.duracao)}"></div><div class="field full"><label>Orientações</label><input name="orientacoes" value="${esc(i.orientacoes || '')}"></div>
      ${i.calculo ? `<div class="field full"><small class="muted">Cálculo: ${esc(i.calculo)}${i.fonte ? ' · Fonte: ' + esc(i.fonte) : ''}</small></div>` : ''}</div><button type="button" class="btn sm ghost" data-act="delItemPresc" data-i="${idx}">Remover item</button></div>`;
    return `<form id="formPresc" class="card" data-id="${pr.id || ''}"><h2>📄 Prescrição ${pr.confirmada ? '<span class="chip green">emitida</span>' : '<span class="chip amber">rascunho – revisar</span>'}</h2>
      ${p ? `<p><b>${esc(p.nome)}</b> · ${idade ? esc(idade.texto) : ''} · ${p.peso ? f(p.peso) + ' kg' : ''}${p.alergias ? ` · <span class="chip red">Alergia: ${esc(p.alergias)}</span>` : ''}</p>` : `<div class="field"><label>Paciente</label><select name="pacienteId"><option value="">—</option>${S.col('pacientes').map(x => `<option value="${x.id}" ${state.pacienteId === x.id ? 'selected' : ''}>${esc(x.nome)}</option>`).join('')}</select></div>`}
      <div id="prescItens">${(pr.itens || []).map(item).join('')}</div>
      <div class="btnrow"><button type="button" class="btn secondary sm" data-act="addItemVazio">➕ Item em branco</button><a class="btn secondary sm" href="#/medicamentos">💊 Adicionar pelo banco de medicamentos</a></div>
      <div class="field"><label>Orientações gerais</label><textarea name="orientacoesGerais">${esc(pr.orientacoesGerais || '')}</textarea></div>
      <div class="field"><label>Retorno</label><input name="retorno" value="${esc(pr.retorno || '')}" placeholder="ex.: reavaliar em 48 h ou antes se sinais de alarme"></div>
      <div class="check"><input type="checkbox" name="confirmada" ${pr.confirmada ? 'checked' : ''}><div><b>Revisei e confirmo esta prescrição</b><br><small class="muted">A emissão exige revisão e confirmação pela médica responsável. Doses calculadas são sugestões e devem ser conferidas.</small></div></div>
      <div class="btnrow"><button class="btn" type="submit">💾 Salvar</button>${pr.id ? `<a class="btn secondary" href="#/prescricao/${pr.id}?print=1">🖨️ Visualizar / imprimir</a>` : ''}</div></form>`;
  }
  route('/prescricao/nova', (p, q) => {
    const pr = state.prescricaoDraft || { itens: [] }; pr.pacienteId = q.pacienteId || pr.pacienteId || state.pacienteId || null;
    if (q.pacienteId && !state.pacienteId) setPaciente(q.pacienteId);
    state.prescricaoDraft = pr;
    return `<h1>Nova prescrição</h1>${prescricaoForm(pr)}${disclaimer}`;
  });
  route('/prescricao/:id', ({ id }, q) => {
    const pr = S.byId('prescricoes', id); if (!pr) return '<div class="empty">Não encontrada.</div>';
    if (q.print) {
      const p = S.byId('pacientes', pr.pacienteId); const idade = p ? U.idade(p.dataNascimento) : null;
      if (!pr.confirmada) return `<div class="alert amber"><strong>Prescrição não confirmada</strong>Revise e confirme antes de emitir.</div><a class="btn" href="#/prescricao/${pr.id}">Voltar à edição</a>`;
      return `<div class="prescricao"><h3>Prescrição pediátrica</h3><p class="muted" style="margin-top:-.3rem"><small>${esc(profissionalLinha())}</small></p><p><b>Paciente:</b> ${esc(p ? p.nome : '—')}${idade ? ' · ' + esc(idade.texto) : ''}${p && p.peso ? ' · ' + f(p.peso) + ' kg' : ''}<br><b>Data:</b> ${U.fmtDateTime(pr.emitidaEm || pr.atualizadoEm)}</p><hr>
        ${(pr.itens || []).map((i, n) => `<div class="item"><b>${n + 1}. ${esc(i.medicamento)}</b>${i.apresentacao ? ' – ' + esc(i.apresentacao) : ''}<br>${esc(i.dose)} · ${esc(i.via)} · ${esc(i.intervalo)}${i.horarios ? ' (' + esc(i.horarios) + ')' : ''} · ${esc(i.duracao)}${i.orientacoes ? '<br><i>' + esc(i.orientacoes) + '</i>' : ''}</div>`).join('')}
        ${pr.orientacoesGerais ? `<p><b>Orientações:</b> ${esc(pr.orientacoesGerais)}</p>` : ''}${pr.retorno ? `<p><b>Retorno:</b> ${esc(pr.retorno)}</p>` : ''}<br><p>_____________________________________<br>${esc([profissional().tratamento, profissional().nome].filter(Boolean).join(' '))}<br>${esc([profissional().especialidade, profissional().crm, profissional().rqe].filter(Boolean).join(' · '))}</p></div>
        <div class="btnrow no-print"><button class="btn" onclick="window.print()">🖨️ Imprimir</button><a class="btn ghost" href="#/prescricao/${pr.id}">Editar</a></div>`;
    }
    return `<h1>Prescrição</h1>${prescricaoForm(pr)}${disclaimer}`;
  });

  /* ---- Evolução SOAP ---- */
  function soapForm(e) {
    const p = e.pacienteId ? S.byId('pacientes', e.pacienteId) : null;
    return `<form id="formSoap" class="card" data-id="${e.id || ''}"><input type="hidden" name="pacienteId" value="${esc(e.pacienteId || '')}">
      ${p ? `<p><b>${esc(p.nome)}</b></p>` : ''}<div class="fields"><div class="field"><label>Data/hora</label><input type="datetime-local" name="data" value="${esc((e.data || new Date().toISOString()).slice(0, 16))}"></div>
      <div class="field"><label>Peso (kg)</label><input type="number" step="0.01" name="peso" value="${e.peso || (p && p.peso) || ''}"></div><div class="field"><label>Temp (°C)</label><input type="number" step="0.1" name="temp" value="${e.temp || ''}"></div><div class="field"><label>FC</label><input type="number" name="fc" value="${e.fc || ''}"></div><div class="field"><label>FR</label><input type="number" name="fr" value="${e.fr || ''}"></div><div class="field"><label>SatO2 (%)</label><input type="number" name="sat" value="${e.sat || ''}"></div><div class="field"><label>PA</label><input name="pa" value="${esc(e.pa || '')}" placeholder="90/60"></div></div>
      <div class="field"><label>S — Subjetivo</label><textarea name="s">${esc(e.s || '')}</textarea></div>
      <div class="field"><label>O — Objetivo</label><textarea name="o">${esc(e.o || '')}</textarea></div>
      <div class="field"><label>A — Avaliação (hipóteses em consideração)</label><textarea name="a">${esc(e.a || '')}</textarea></div>
      <div class="field"><label>P — Plano</label><textarea name="p">${esc(e.p || '')}</textarea></div>
      <div class="btnrow"><button class="btn" type="submit">💾 Salvar evolução</button>${e.id ? `<button type="button" class="btn ghost" data-act="delSoap" data-id="${e.id}" data-pid="${e.pacienteId}">Excluir</button>` : ''}</div></form>`;
  }
  route('/evolucao/nova', (p, q) => {
    const pid = q.pacienteId || state.pacienteId; if (!pid) return `<div class="alert amber"><strong>Selecione um paciente</strong></div><a class="btn" href="#/pacientes">Pacientes</a>`;
    const at = state.atendimento; const e = { pacienteId: pid };
    if (at && at.pacienteId === pid) { e.s = `Queixa: ${at.queixaNome}. Sintomas: ${at.sintomas.join(', ')}. ${at.notas || ''}`; e.a = at.hipoteses.length ? 'Diagnósticos diferenciais em consideração: ' + at.hipoteses.map(h => h.nome).join(', ') : ''; e.o = at.gravidade.length ? 'Sinais de gravidade: ' + at.gravidade.join(', ') : ''; }
    return `<h1>📝 Nova evolução (SOAP)</h1>${soapForm(e)}${disclaimer}`;
  });
  route('/evolucao/:id', ({ id }) => { const e = S.byId('evolucoes', id); if (!e) return '<div class="empty">Não encontrada.</div>'; return `<h1>📝 Evolução</h1>${soapForm(e)}${disclaimer}`; });

  /* ---- Configurações / dados ---- */
  route('/config', () => `<h1>⚙️ Dados e configurações</h1>
    <div class="card"><h2>Armazenamento local</h2><p class="muted">Os dados ficam apenas neste navegador (localStorage). Exporte regularmente. Não inclua dados sensíveis em dispositivos compartilhados.</p>
      <div class="btnrow"><button class="btn" data-act="exportar">⬇️ Exportar JSON</button><label class="btn secondary" style="cursor:pointer">⬆️ Importar JSON<input type="file" id="importFile" accept="application/json" style="display:none"></label><button class="btn danger" data-act="resetar">Apagar tudo</button></div>
      <p>Pacientes: ${S.col('pacientes').length} · Atendimentos: ${S.col('atendimentos').length} · Evoluções: ${S.col('evolucoes').length} · Prescrições: ${S.col('prescricoes').length}</p></div>
    <div class="card"><h2>👩‍⚕️ Profissional responsável</h2><p class="muted">Aparece na prescrição, na evolução e na tela inicial.</p>
      <form id="formProf"><div class="fields"><div class="field"><label>Tratamento</label><input name="tratamento" value="${esc(profissional().tratamento || '')}"></div><div class="field full"><label>Nome</label><input name="nome" value="${esc(profissional().nome || '')}"></div><div class="field"><label>Especialidade</label><input name="especialidade" value="${esc(profissional().especialidade || '')}"></div><div class="field"><label>CRM</label><input name="crm" value="${esc(profissional().crm || '')}"></div><div class="field"><label>RQE</label><input name="rqe" value="${esc(profissional().rqe || '')}"></div></div><div class="btnrow"><button class="btn" type="submit">💾 Salvar</button></div></form></div>
    <div class="card"><h2>Bases clínicas carregadas</h2><dl class="kv"><dt>Doenças</dt><dd>${(D().doencas || []).length}</dd><dt>Medicamentos</dt><dd>${(D().medicamentos || []).length}</dd><dt>Queixas</dt><dd>${(D().queixas || []).length}</dd><dt>Calculadoras</dt><dd>${PED.calc.calculadoras.length}</dd><dt>Emergências</dt><dd>${(D().emergencias || []).length}</dd><dt>Exames</dt><dd>${(D().exames || []).length}</dd><dt>Vacinas</dt><dd>${(D().vacinas || []).length}</dd></dl>
      <p class="muted"><small>Cada item exibe suas fontes (MS, SBP, OMS/OPAS, PALS, bulas) e a data da última atualização. O sistema não gera diagnóstico automático e não substitui a decisão médica.</small></p></div>
    <div class="card"><h2>Sobre</h2><p>Mucurinha – protótipo MVP de apoio à decisão clínica pediátrica no Amazonas. Versão 0.1.0.</p></div>`);

  /* ---------------- Eventos ---------------- */
  function formData(form) { const o = {}; new FormData(form).forEach((v, k) => o[k] = typeof v === 'string' ? v.trim() : v); return o; }

  function bindMain() {
    const main = $('#main');
    // Peso rápido
    const pr = $('#pesoRapido');
    if (pr && !pr.disabled) pr.addEventListener('change', () => { S.pref('pesoRapido', pr.value ? Number(pr.value) : null); render(); });

    // Formulário de paciente
    const fp = $('#formPaciente');
    if (fp) {
      const upd = () => { const d = formData(fp); const id = U.idade(d.dataNascimento); $('#idadeCalc').value = id ? id.texto : ''; const imc = U.imc(Number(d.peso), Number(d.altura)); $('#imcCalc').value = imc ? f(imc, 1) + ' kg/m²' : ''; const sc = U.scMosteller(Number(d.peso), Number(d.altura)); $('#scCalc').value = sc ? f(sc, 2) + ' m²' : ''; };
      fp.addEventListener('input', upd); upd();
      fp.addEventListener('submit', (e) => { e.preventDefault(); const d = formData(fp); const prev = d.id ? S.byId('pacientes', d.id) : null; const obj = Object.assign({}, prev || {}, d, { peso: d.peso ? Number(d.peso) : null, altura: d.altura ? Number(d.altura) : null, pc: d.pc ? Number(d.pc) : null }); if (!obj.id) delete obj.id; const saved = S.upsert('pacientes', obj); if (obj.peso) S.upsert('medidas', { pacienteId: saved.id, data: U.today(), peso: obj.peso, altura: obj.altura, pc: obj.pc }); setPaciente(saved.id); U.toast('Paciente salvo'); go('/pacientes/' + saved.id); });
    }
    // Medidas
    const fm = $('#formMedida');
    if (fm) fm.addEventListener('submit', (e) => { e.preventDefault(); const d = formData(fm); if (!d.peso && !d.altura && !d.pc) return; const m = S.upsert('medidas', { pacienteId: d.pacienteId, data: d.data, peso: d.peso ? Number(d.peso) : null, altura: d.altura ? Number(d.altura) : null, pc: d.pc ? Number(d.pc) : null }); const p = S.byId('pacientes', d.pacienteId); if (p) { if (m.peso) p.peso = m.peso; if (m.altura) p.altura = m.altura; if (m.pc) p.pc = m.pc; S.upsert('pacientes', p); } U.toast('Medida registrada'); render(); });
    $$('.marcoChk', main).forEach(c => c.addEventListener('change', () => { const p = S.byId('pacientes', c.dataset.id); p.marcos = p.marcos || {}; p.marcos[c.dataset.k] = c.checked; S.upsert('pacientes', p); render(); }));

    // Fluxo da queixa
    const notas = $('#notasAt'); if (notas) notas.addEventListener('input', () => state.atendimento.notas = notas.value);
    $$('.ctxBool', main).forEach(c => c.addEventListener('change', () => { state.atendimento.contexto[c.dataset.id] = c.checked; }));
    $$('.ctxSel', main).forEach(c => c.addEventListener('change', () => { state.atendimento.contexto[c.dataset.id] = c.value; }));
    $$('.ctxTri', main).forEach(c => c.addEventListener('change', () => { state.atendimento.contexto[c.dataset.id] = c.value === 'sim' ? true : c.value === 'nao' ? false : undefined; }));
    $$('.ctxText', main).forEach(c => c.addEventListener('input', () => { state.atendimento.contexto[c.dataset.id] = c.value; }));
    $$('[data-act="togHip"]', main).forEach(c => c.addEventListener('change', () => { const at = state.atendimento; const key = c.dataset.key; const q = (D().queixas || []).find(x => x.id === at.queixaId); const h = diferenciais(q, at).find(x => (x.doencaId || x.nome) === key); if (c.checked) { if (h && !at.hipoteses.some(x => (x.doencaId || x.nome) === key)) at.hipoteses.push({ doencaId: h.doencaId, nome: h.nome }); } else at.hipoteses = at.hipoteses.filter(x => (x.doencaId || x.nome) !== key); render(); }));
    $$('[data-act="togExame"]', main).forEach(c => c.addEventListener('change', () => { const at = state.atendimento; if (c.checked) { if (!at.examesSelecionados.includes(c.dataset.id)) at.examesSelecionados.push(c.dataset.id); } else at.examesSelecionados = at.examesSelecionados.filter(x => x !== c.dataset.id); }));

    // Calculadora
    const fc = $('#formCalc');
    if (fc) { const run = () => { const c = PED.calc.calculadoras.find(x => x.id === fc.dataset.id); const r = c.calc(formData(fc), paciente()); $('#calcOut').innerHTML = renderCalcOut(r); }; fc.addEventListener('submit', (e) => { e.preventDefault(); run(); }); fc.addEventListener('input', run); run(); }

    // Painel de dose (selects)
    const painel = $('#painelDose');
    if (painel) { const upd = () => { const med = (D().medicamentos || []).find(x => x.id === painel.dataset.med); const html = painelDoseMed(med, pesoAtivo(), { doseIdx: Number($('#doseSel').value), apIdx: Number($('#apSel').value) }); painel.outerHTML = html; bindMain(); }; $('#doseSel').addEventListener('change', upd); $('#apSel').addEventListener('change', upd); }

    // Filtro de medicamentos
    const fmed = $('#filtroMed'); if (fmed) fmed.addEventListener('input', () => { const q = U.normalize(fmed.value); $$('.medrow', main).forEach(r => r.style.display = !q || r.dataset.n.includes(q) ? '' : 'none'); $$('.section-title', $('#listaMed')).forEach(t => { const l = t.nextElementSibling; t.style.display = $$('.medrow', l).some(r => r.style.display !== 'none') ? '' : 'none'; }); });

    // Prescrição
    const fpr = $('#formPresc');
    if (fpr) fpr.addEventListener('submit', (e) => {
      e.preventDefault(); const d = formData(fpr); const itens = $$('.prescItem', fpr).map(el => { const o = {}; $$('input', el).forEach(i => o[i.name] = i.value.trim()); const prev = (state.prescricaoDraft && state.prescricaoDraft.itens[Number(el.dataset.i)]) || {}; return Object.assign({}, prev, o); });
      const prev = fpr.dataset.id ? S.byId('prescricoes', fpr.dataset.id) : null;
      const pid = (prev && prev.pacienteId) || d.pacienteId || (state.prescricaoDraft && state.prescricaoDraft.pacienteId) || state.pacienteId;
      if (!pid) { U.toast('Selecione o paciente'); return; }
      const obj = Object.assign({}, prev || {}, { pacienteId: pid, itens, orientacoesGerais: d.orientacoesGerais, retorno: d.retorno, confirmada: !!d.confirmada, atendimentoId: (state.atendimento && state.atendimento.id) || (prev && prev.atendimentoId) || null });
      if (obj.confirmada && !obj.emitidaEm) { obj.emitidaEm = new Date().toISOString(); obj.profissional = profissionalLinha(); }
      if (!fpr.dataset.id) { delete obj.id; }
      const saved = S.upsert('prescricoes', obj); state.prescricaoDraft = null; U.toast(obj.confirmada ? 'Prescrição emitida' : 'Rascunho salvo'); go('/prescricao/' + saved.id + (obj.confirmada ? '?print=1' : ''));
    });
    // SOAP
    const fs = $('#formSoap');
    if (fs) fs.addEventListener('submit', (e) => { e.preventDefault(); const d = formData(fs); const prev = fs.dataset.id ? S.byId('evolucoes', fs.dataset.id) : null; const obj = Object.assign({}, prev || {}, d, { data: d.data ? new Date(d.data).toISOString() : new Date().toISOString(), profissional: profissionalLinha() }); if (!fs.dataset.id) delete obj.id; S.upsert('evolucoes', obj); const p = S.byId('pacientes', d.pacienteId); if (p && d.peso && Number(d.peso) !== p.peso) { p.peso = Number(d.peso); S.upsert('pacientes', p); } U.toast('Evolução salva'); go('/pacientes/' + d.pacienteId + '?tab=evolucao'); });
    const fprof = $('#formProf'); if (fprof) fprof.addEventListener('submit', (e) => { e.preventDefault(); S.pref('profissional', formData(fprof)); U.toast('Profissional salvo'); render(); });
    // Importar
    const imp = $('#importFile'); if (imp) imp.addEventListener('change', () => { const fr = new FileReader(); fr.onload = () => { try { S.importJSON(fr.result); U.toast('Dados importados'); render(); } catch (e) { alert('Arquivo inválido: ' + e.message); } }; fr.readAsText(imp.files[0]); });
  }

  // Delegação de cliques por data-act
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-act]'); if (!el) return; const act = el.dataset.act; const at = state.atendimento;
    const acts = {
      setPesoRapido() { const v = $('#pesoRapido').value; S.pref('pesoRapido', v ? Number(v) : null); render(); },
      trocarPaciente() { go('/pacientes'); },
      limparPaciente() { setPaciente(null); render(); },
      ativarPaciente() { setPaciente(el.dataset.id); U.toast('Paciente selecionado'); render(); },
      excluirPaciente() { if (!confirm('Excluir paciente e todos os registros vinculados?')) return; const id = el.dataset.id; ['atendimentos', 'evolucoes', 'prescricoes', 'vacinasRealizadas', 'medidas'].forEach(c => S.where(c, x => x.pacienteId === id).forEach(x => S.remove(c, x.id))); S.remove('pacientes', id); if (state.pacienteId === id) setPaciente(null); go('/pacientes'); },
      tab() { go('/pacientes/' + el.dataset.id + '?tab=' + el.dataset.tab); },
      etapa() { if (!at) return; at.etapa = Number(el.dataset.i); render(); },
      togSintoma() { const id = el.dataset.id; const i = at.sintomas.indexOf(id); if (i >= 0) at.sintomas.splice(i, 1); else at.sintomas.push(id); el.classList.toggle('on'); },
      togGrav() { const id = el.dataset.id; const i = at.gravidade.indexOf(id); if (i >= 0) at.gravidade.splice(i, 1); else at.gravidade.push(id); render(); },
      calcMed() { const med = (D().medicamentos || []).find(x => x.id === el.dataset.id); $('#calcMedBox').innerHTML = painelDoseMed(med, pesoAtivo()); bindMain(); $('#calcMedBox').scrollIntoView({ behavior: 'smooth' }); },
      addItemDraft() { const med = (D().medicamentos || []).find(x => x.id === el.dataset.med); const item = montarItem(med, Number(el.dataset.dose), Number(el.dataset.ap), pesoAtivo()); state.prescricaoDraft = state.prescricaoDraft || { pacienteId: state.pacienteId, itens: [] }; state.prescricaoDraft.itens.push(item); U.toast('Item adicionado à prescrição'); if (at && location.hash.includes('/queixas/')) render(); },
      delItemDraft() { state.prescricaoDraft.itens.splice(Number(el.dataset.i), 1); render(); },
      delItemPresc() { const idx = Number(el.dataset.i); if (state.prescricaoDraft) state.prescricaoDraft.itens.splice(idx, 1); const form = $('#formPresc'); if (form.dataset.id) { const pr = S.byId('prescricoes', form.dataset.id); pr.itens.splice(idx, 1); S.upsert('prescricoes', pr); } render(); },
      addItemVazio() { const form = $('#formPresc'); const item = { medicamento: '', apresentacao: '', dose: '', via: 'VO', intervalo: '', horarios: '', duracao: '', orientacoes: '' }; if (form.dataset.id) { const pr = S.byId('prescricoes', form.dataset.id); pr.itens.push(item); S.upsert('prescricoes', pr); } else { state.prescricaoDraft = state.prescricaoDraft || { pacienteId: state.pacienteId, itens: [] }; state.prescricaoDraft.itens.push(item); } render(); },
      salvarAtendimento() { if (!at || !state.pacienteId) return; at.pacienteId = state.pacienteId; const saved = S.upsert('atendimentos', Object.assign({}, at)); at.id = saved.id; U.toast('Atendimento salvo'); render(); },
      irPrescricao() { if (at && state.pacienteId && !at.id) { at.pacienteId = state.pacienteId; const saved = S.upsert('atendimentos', Object.assign({}, at)); at.id = saved.id; } state.prescricaoDraft = state.prescricaoDraft || { itens: [] }; state.prescricaoDraft.pacienteId = state.pacienteId; go('/prescricao/nova?pacienteId=' + state.pacienteId); },
      reiniciarAt() { const q = (D().queixas || []).find(x => x.id === at.queixaId); state.atendimento = novoAtendimento(q); render(); },
      abrirAtendimento() { const a = S.byId('atendimentos', el.dataset.id); state.atendimento = Object.assign({}, a, { etapa: 3 }); go('/queixas/' + a.queixaId); },
      compararSOAP() { const pid = location.hash.match(/pacientes\/([^/?]+)/)[1]; const ev = S.where('evolucoes', x => x.pacienteId === pid).sort((a, b) => b.data.localeCompare(a.data)).slice(0, 2); $('#soapCompare').innerHTML = `<div class="soap-compare">${ev.map(x => `<div class="card compact"><b>${U.fmtDateTime(x.data)}</b><br><small>${x.peso ? 'Peso ' + f(x.peso) + ' kg · ' : ''}${x.temp ? 'T ' + x.temp + ' °C · ' : ''}${x.fc ? 'FC ' + x.fc + ' · ' : ''}${x.fr ? 'FR ' + x.fr + ' · ' : ''}${x.sat ? 'Sat ' + x.sat + '% · ' : ''}${x.pa ? 'PA ' + esc(x.pa) : ''}</small><p><b>S:</b> ${esc(x.s)}</p><p><b>O:</b> ${esc(x.o)}</p><p><b>A:</b> ${esc(x.a)}</p><p><b>P:</b> ${esc(x.p)}</p></div>`).join('')}</div>`; },
      delSoap() { if (!confirm('Excluir evolução?')) return; S.remove('evolucoes', el.dataset.id); go('/pacientes/' + el.dataset.pid + '?tab=evolucao'); },
      delMedida() { S.remove('medidas', el.dataset.id); render(); },
      marcarVacina() { const data = prompt('Data da dose (AAAA-MM-DD):', U.today()); if (!data) return; S.upsert('vacinasRealizadas', { pacienteId: el.dataset.pid, vacinaId: el.dataset.vid, doseIndex: Number(el.dataset.i), data }); render(); },
      desfazerVacina() { S.remove('vacinasRealizadas', el.dataset.id); render(); },
      exportar() { const blob = new Blob([S.exportJSON()], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'mucurinha-' + U.today() + '.json'; a.click(); },
      resetar() { if (confirm('Apagar todos os dados locais?')) { S.reset(); setPaciente(null); render(); } },
    };
    if (acts[act]) { e.preventDefault(); acts[act](); }
  });

  /* ---------------- Init ---------------- */
  function init() {
    bindSearch();
    if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(() => {});
    render();
  }
  document.addEventListener('DOMContentLoaded', init);
  PED.app = { render, go, state, paciente, pesoAtivo, diferenciais, buscar };
})();
