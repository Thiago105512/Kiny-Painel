/* Entrada rápida – PedTudo
   Objetivo: digitar o mínimo. Datas são digitadas (não selecionadas), a idade pode
   substituir a data de nascimento, e os campos de texto sugerem ao digitar as primeiras letras. */
window.PED = window.PED || {};
PED.entrada = (function () {
  const dois = (n) => String(n).padStart(2, '0');

  /* ---------- Datas digitadas ---------- */
  /** Aplica máscara DD/MM/AAAA enquanto a pessoa digita, aceitando só números. */
  function mascararData(valor) {
    const d = String(valor || '').replace(/\D/g, '').slice(0, 8);
    if (d.length <= 2) return d;
    if (d.length <= 4) return d.slice(0, 2) + '/' + d.slice(2);
    return d.slice(0, 2) + '/' + d.slice(2, 4) + '/' + d.slice(4);
  }
  /** Converte "21/09/2026", "210926", "21-9-26" em AAAA-MM-DD. Devolve null se incompleta. */
  function paraISO(texto) {
    const bruto = String(texto || '').trim();
    let dia, mes, ano;
    const partes = bruto.split(/[^0-9]+/).filter(Boolean);
    if (partes.length === 3) { dia = Number(partes[0]); mes = Number(partes[1]); ano = Number(partes[2]); }
    else {
      const d = bruto.replace(/\D/g, '');
      if (d.length !== 6 && d.length !== 8) return null;
      dia = Number(d.slice(0, 2)); mes = Number(d.slice(2, 4)); ano = Number(d.slice(4));
    }
    if (String(ano).length <= 2) { const atual = new Date().getFullYear(); const sec = Math.floor(atual / 100) * 100; ano = ano + sec > atual ? ano + sec - 100 : ano + sec; }
    if (!dia || dia > 31 || !mes || mes > 12 || ano < 1900) return null;
    const dt = new Date(ano, mes - 1, dia);
    if (dt.getDate() !== dia || dt.getMonth() !== mes - 1) return null;   // 31/02 etc.
    return ano + '-' + dois(mes) + '-' + dois(dia);
  }
  const deISO = (iso) => (!iso || iso.length < 10) ? '' : iso.slice(8, 10) + '/' + iso.slice(5, 7) + '/' + iso.slice(0, 4);

  /* ---------- Idade digitada ---------- */
  /** Interpreta "3a2m", "14 meses", "2 anos", "20d", "3a" e devolve o total em meses. */
  function lerIdade(texto) {
    const t = String(texto || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
    if (!t) return null;
    let meses = 0, achou = false;
    for (const m of t.matchAll(/(\d+(?:[.,]\d+)?)\s*(anos?|a(?![a-z])|meses|mes|m(?![a-z])|dias?|d(?![a-z])|semanas?|sem|s(?![a-z]))/g)) {
      const v = parseFloat(m[1].replace(',', '.')); const u = m[2][0]; achou = true;
      meses += u === 'a' ? v * 12 : u === 'm' ? v : u === 's' ? v * 7 / 30.44 : v / 30.44;
    }
    if (!achou) { const n = parseFloat(t.replace(',', '.')); if (!isNaN(n)) { meses = n * 12; achou = true; } }  // só número = anos
    return achou ? meses : null;
  }
  /** Data de nascimento aproximada a partir da idade em meses. */
  function nascimentoPorIdade(meses) {
    if (meses == null) return null;
    const d = new Date(); d.setDate(d.getDate() - Math.round(meses * 30.44));
    return d.toISOString().slice(0, 10);
  }

  /* ---------- Sugestões ao digitar ---------- */
  const listas = () => (PED.data && PED.data.apoioEntrada) || {};
  /** <datalist> nativo: sugere ao digitar as primeiras letras, sem obrigar a rolar. */
  function datalist(id, itens) {
    return `<datalist id="${id}">${(itens || []).map(x => `<option value="${String(x).replace(/"/g, '&quot;')}"></option>`).join('')}</datalist>`;
  }
  /** Sugestões de medicamento por nome genérico OU comercial. */
  function sugestoesMedicamento() {
    const meds = (PED.data && PED.data.medicamentos) || [];
    const com = (PED.data && PED.data.comerciais && PED.data.comerciais.porMedicamento) || {};
    const out = [];
    for (const m of meds) {
      out.push(m.nome);
      const c = com[m.id];
      if (c) (c.marcas || []).forEach(b => out.push(b + ' (' + m.nome + ')'));
    }
    return out;
  }

  /** Liga as máscaras e conversões dentro de um contêiner. */
  function ligar(raiz) {
    raiz = raiz || document;
    raiz.querySelectorAll('input[data-tipo="data"]').forEach(inp => {
      if (inp._ligado) return; inp._ligado = true;
      inp.setAttribute('inputmode', 'numeric');
      inp.setAttribute('placeholder', inp.getAttribute('placeholder') || 'dd/mm/aaaa');
      inp.setAttribute('maxlength', '10');
      inp.addEventListener('input', () => {
        const pos = inp.selectionStart, antes = inp.value.length;
        inp.value = mascararData(inp.value);
        if (pos != null && inp.value.length >= antes) inp.setSelectionRange(inp.value.length, inp.value.length);
        const iso = paraISO(inp.value);
        const alvo = inp.dataset.iso ? raiz.querySelector('#' + inp.dataset.iso) : null;
        if (alvo) alvo.value = iso || '';
        inp.classList.toggle('erro', inp.value.length === 10 && !iso);
        inp.dispatchEvent(new CustomEvent('dataPronta', { detail: iso, bubbles: true }));
      });
    });
  }

  return { mascararData, paraISO, deISO, lerIdade, nascimentoPorIdade, datalist, sugestoesMedicamento, ligar, listas };
})();

/* ---------- Perguntas com resposta selecionável ----------
   Toda pergunta do aplicativo oferece respostas prontas para um toque e um campo
   "Outros" para observação livre. As opções são inferidas do texto da pergunta. */
PED.entrada.perguntas = (function () {
  const n = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const SIM_NAO = ['Sim', 'Não', 'Não sei'];

  const REGRAS = [
    { re: /quantos dias|ha quanto tempo|desde quando|dura(cao|ndo)|tempo de (evolucao|doenca|febre|sintoma)/, op: ['Hoje', '1 dia', '2 a 3 dias', '4 a 7 dias', '8 a 14 dias', 'Mais de 14 dias'] },
    { re: /quantas horas|ha quantas horas|hora de vida/, op: ['< 6 h', '6 a 12 h', '12 a 24 h', '24 a 48 h', '> 48 h'] },
    { re: /temperatura|quantos graus|febre aferida|tax\b/, op: ['Não aferida', 'Até 37,5 °C', '37,6 a 38,5 °C', '38,6 a 39,5 °C', 'Acima de 39,5 °C'] },
    { re: /padrao da febre|tipo de febre|como e a febre/, op: ['Contínua', 'Picos diários', 'Intermitente', 'Com calafrios', 'Cede com antitérmico', 'Não cede com antitérmico'] },
    { re: /quantas (vezes|evacuacoes|episodios|dejecoes)|frequencia (das|dos|de)/, op: ['1 a 3 vezes', '4 a 6 vezes', '7 a 10 vezes', 'Mais de 10 vezes', 'Incontáveis'] },
    { re: /aspecto|cor d[oa]|caracteristica d[oa]/, op: ['Normal', 'Alterado', 'Não observado'] },
    { re: /volume|quantidade/, op: ['Pequeno', 'Moderado', 'Grande'] },
    { re: /aceita(cao)? (de )?(liquido|alimento|dieta|mamada)|esta (mamando|comendo|bebendo)|alimenta/, op: ['Aceita bem', 'Aceita pouco', 'Recusa', 'Vomita tudo'] },
    { re: /diurese|urin(a|ou|ando)|fralda/, op: ['Normal', 'Diminuída', 'Muito diminuída', 'Ausente há mais de 6 h', 'Não sabe informar'] },
    { re: /intensidade|grau|quao (forte|intenso)|escala de dor/, op: ['Leve', 'Moderada', 'Intensa'] },
    { re: /vacina/, op: ['Em dia', 'Atrasada', 'Não sabe', 'Sem caderneta'] },
    { re: /medicamento|remedio|usou algo|automedica/, op: ['Nenhum', 'Antitérmico', 'Antibiótico', 'Chá ou caseiro', 'Outro'] },
    { re: /onde|local d[ao]|qual (regiao|parte|local)/, op: ['Localizada', 'Difusa', 'Migratória'] },
    { re: /piora|melhora|fator/, op: ['Piora progressiva', 'Estável', 'Em melhora', 'Alterna'] },
    { re: /quem (trouxe|acompanha)|acompanhante|responsavel/, op: ['Mãe', 'Pai', 'Avó ou avô', 'Outro familiar', 'Conselho tutelar', 'Desacompanhado'] },
    { re: /procurou|atendimento (previo|anterior)|ja foi atendid/, op: ['Primeira vez', 'UBS', 'UPA ou pronto-socorro', 'Internado recentemente'] },
  ];

  /** Opções sugeridas para uma pergunta. Devolve sempre ao menos Sim/Não/Não sei. */
  function opcoes(texto) {
    const t = n(texto);
    for (const r of REGRAS) if (r.re.test(t)) return r.op;
    return SIM_NAO;
  }

  /** HTML de uma pergunta respondível. `valor` = {opcao, obs}. */
  function html(id, texto, valor) {
    valor = valor || {};
    const ops = opcoes(texto);
    const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    return `<div class="pergunta" data-pid="${esc(id)}">
      <div class="pergTexto">${esc(texto)}</div>
      <div class="toggles">
        ${ops.map(o => `<span class="toggle ${valor.opcao === o ? 'on' : ''}" data-resp="${esc(o)}">${esc(o)}</span>`).join('')}
        <span class="toggle ${valor.opcao === '__outros' ? 'on' : ''}" data-resp="__outros">Outros…</span>
      </div>
      <input class="pergObs" placeholder="Observação (opcional)" value="${esc(valor.obs || '')}" autocomplete="off"
        style="${valor.opcao === '__outros' || valor.obs ? '' : 'display:none'}">
    </div>`;
  }

  /** Liga os toques dentro de um contêiner; chama onChange(id, {opcao, obs}). */
  function ligar(raiz, onChange) {
    (raiz || document).querySelectorAll('.pergunta[data-pid]').forEach(bloco => {
      if (bloco._ligado) return; bloco._ligado = true;
      const id = bloco.dataset.pid;
      const obs = bloco.querySelector('.pergObs');
      if (!obs) return;
      const estado = () => ({ opcao: (bloco.querySelector('.toggle.on') || {}).dataset ? bloco.querySelector('.toggle.on').dataset.resp : null, obs: obs.value });
      bloco.querySelectorAll('.toggle').forEach(b => b.addEventListener('click', () => {
        const ja = b.classList.contains('on');
        bloco.querySelectorAll('.toggle').forEach(x => x.classList.remove('on'));
        if (!ja) b.classList.add('on');
        const outros = !ja && b.dataset.resp === '__outros';
        obs.style.display = (outros || obs.value) ? '' : 'none';
        if (outros) obs.focus();
        onChange && onChange(id, estado());
      }));
      obs.addEventListener('input', () => onChange && onChange(id, estado()));
    });
  }

  /** Resumo em texto das respostas, para a evolução e a ficha. */
  function resumo(perguntas, respostas) {
    if (!respostas) return '';
    return (perguntas || []).map((p, i) => {
      const r = respostas['p' + i]; if (!r || (!r.opcao && !r.obs)) return null;
      const v = r.opcao === '__outros' ? (r.obs || 'outros') : (r.opcao || '') + (r.obs ? ' (' + r.obs + ')' : '');
      return p.replace(/\?$/, '') + ': ' + v;
    }).filter(Boolean).join('. ');
  }

  return { opcoes, html, ligar, resumo };
})();
