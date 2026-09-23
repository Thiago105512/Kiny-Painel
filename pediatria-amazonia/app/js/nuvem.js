/* Sincronização opcional com o Firebase – PedTudo
   Sem configuração, o aplicativo funciona exatamente como antes, só no aparelho.
   Configurado, os dados passam a existir também na conta no Firebase e acompanham
   celular e computador. Com um espaço compartilhado, duas pessoas veem e alteram
   o mesmo conteúdo: cada uma no seu aparelho, tudo no mesmo lugar.

   Como a mesclagem funciona: cada registro tem `atualizadoEm`. Ao sincronizar,
   vence a versão mais recente de cada registro, e as exclusões viajam como lápides.
   Não há sobrescrita cega de um aparelho sobre o outro. A gravação é feita dentro de
   uma transação, para que dois aparelhos gravando ao mesmo tempo não se apaguem. */
window.PED = window.PED || {};
PED.nuvem = (function () {
  const S = () => PED.store;
  let app = null, auth = null, db = null, sdk = null;
  let parar = null;                  // encerra a escuta em tempo real
  let timer = null;                  // espera o teclado parar antes de enviar
  let ultimoEnviado = '';            // evita reenviar o que já está igual lá
  let estado = { ligado: false, usuario: null, sincronizando: false, ultimaSync: null, erro: null, ouvindo: false };
  const avisos = [];                 // quem quer redesenhar a tela quando chegar algo

  const config = () => S().pref('firebase') || null;
  const configurado = () => { const c = config(); return !!(c && c.apiKey && c.projectId); };
  const espaco = () => S().pref('espaco') || null;
  const getEstado = () => Object.assign({}, estado, { configurado: configurado(), espaco: espaco() });
  function aoAplicar(fn) { if (typeof fn === 'function') avisos.push(fn); }
  const avisar = () => avisos.forEach(f => { try { f(); } catch (e) { console.warn('nuvem: aviso falhou', e); } });

  /** Carrega o SDK sob demanda. Dentro do artifact do claude.ai a rede é bloqueada e isto falha por projeto. */
  async function carregarSDK() {
    if (sdk) return sdk;
    const base = 'https://www.gstatic.com/firebasejs/10.12.2/';
    const [fbApp, fbAuth, fbStore] = await Promise.all([
      import(base + 'firebase-app.js'),
      import(base + 'firebase-auth.js'),
      import(base + 'firebase-firestore.js'),
    ]);
    sdk = { fbApp, fbAuth, fbStore };
    return sdk;
  }

  async function iniciar() {
    if (!configurado()) throw new Error('Firebase ainda não configurado.');
    if (app) return true;
    const { fbApp, fbAuth, fbStore } = await carregarSDK();
    app = fbApp.initializeApp(config());
    auth = fbAuth.getAuth(app);
    db = fbStore.getFirestore(app);
    fbAuth.onAuthStateChanged(auth, (u) => {
      estado.usuario = u ? { uid: u.uid, email: u.email } : null;
      estado.ligado = !!u;
      if (u) ouvir().catch(e => { estado.erro = mensagemErro(e); });
      else pararDeOuvir();
      avisar();
    });
    S().aoMudar(agendarEnvio);
    return true;
  }

  async function entrar(email, senha) {
    await iniciar();
    const { fbAuth } = sdk;
    try {
      await fbAuth.signInWithEmailAndPassword(auth, email, senha);
    } catch (e) {
      if (e && /user-not-found|invalid-credential/.test(e.code || '')) await fbAuth.createUserWithEmailAndPassword(auth, email, senha);
      else throw e;
    }
    estado.erro = null;
    return true;
  }
  async function sair() {
    pararDeOuvir();
    if (auth && sdk) await sdk.fbAuth.signOut(auth);
    estado.ligado = false; estado.usuario = null;
  }

  /* ---------- Mesclagem ---------- */
  const maisNovo = (a, b) => {
    const da = (a && a.atualizadoEm) || '', dbb = (b && b.atualizadoEm) || '';
    return da >= dbb ? a : b;
  };
  /** Une local e remoto registro a registro, respeitando as lápides dos dois lados. */
  function mesclar(local, remoto) {
    const saida = JSON.parse(JSON.stringify(local));
    const lapides = {};
    for (const col of S().COLECOES) {
      const rl = ((remoto.removidos || {})[col]) || {}, ll = ((local.removidos || {})[col]) || {};
      lapides[col] = Object.assign({}, ll, rl);
    }
    for (const col of S().COLECOES) {
      const mapa = new Map();
      for (const x of (local[col] || [])) if (x && x.id) mapa.set(x.id, x);
      for (const x of (remoto[col] || [])) {
        if (!x || !x.id) continue;
        mapa.set(x.id, mapa.has(x.id) ? maisNovo(mapa.get(x.id), x) : x);
      }
      // um registro apagado só volta se foi editado depois da exclusão
      for (const [id, quando] of Object.entries(lapides[col] || {})) {
        const r = mapa.get(id);
        if (r && (r.atualizadoEm || '') <= quando) mapa.delete(id);
      }
      saida[col] = Array.from(mapa.values());
    }
    saida.removidos = lapides;
    // preferências: as deste aparelho mandam (nome da profissional, chaves, espaço), o resto vem de lá
    saida.prefs = Object.assign({}, remoto.prefs || {}, local.prefs || {});
    // as conferências clínicas são de todo mundo: valem item a item, pela data
    const rv = mesclarRevisoes((remoto.prefs || {}).revisoes, (local.prefs || {}).revisoes);
    if (rv) saida.prefs.revisoes = rv; else delete saida.prefs.revisoes;
    return saida;
  }

  /** Conferências clínicas: cada item vale por si, vence a marcação mais recente (inclusive a que desfaz). */
  function mesclarRevisoes(a, b) {
    if (!a && !b) return null;
    const saida = Object.assign({}, a || {});
    for (const [k, v] of Object.entries(b || {})) {
      const atual = saida[k];
      if (!atual || String((v || {}).em || '') >= String((atual || {}).em || '')) saida[k] = v;
    }
    return saida;
  }

  /** O que é gravado na nuvem: nada de configuração de aparelho. */
  const PREFS_LOCAIS = ['firebase', 'espaco', 'google', 'googleEventos', 'googleUltimoEnvio', 'emailNuvem', 'ultimaSync', 'ultimoBackup', 'profissional', 'vistaPlantao', 'pesoRapido', 'ultimoPacienteId', 'flash', 'googleMostrar'];
  function paraNuvem(d) {
    const copia = JSON.parse(JSON.stringify(d));
    copia.prefs = Object.assign({}, copia.prefs || {});
    PREFS_LOCAIS.forEach(k => delete copia.prefs[k]);
    return copia;
  }

  /* ---------- Espaço compartilhado ---------- */
  const ALFABETO = 'abcdefghjkmnpqrstuvwxyz23456789';     // sem letras que se confundem ao ditar
  function novoCodigo() {
    let s = '';
    for (let i = 0; i < 8; i++) s += ALFABETO[Math.floor(Math.random() * ALFABETO.length)];
    return 'ped-' + s.slice(0, 4) + '-' + s.slice(4);
  }
  const limparCodigo = (c) => String(c || '').trim().toLowerCase().replace(/\s+/g, '');
  const chaveEmail = (e) => String(e || '').trim().toLowerCase();
  const equipeRef = (id) => sdk.fbStore.doc(db, 'equipes', id);

  async function exigirConta() {
    await iniciar();
    if (!auth.currentUser) throw new Error('Entre com e-mail e senha antes.');
    return auth.currentUser;
  }
  const meuCartao = (u) => ({ nome: (S().load().prefs.profissional || {}).nome || '', email: u.email || '', desde: new Date().toISOString() });

  /** Cria um espaço e leva para ele o que já existe neste aparelho. */
  async function criarEspaco(nome) {
    const u = await exigirConta();
    const { fbStore } = sdk;
    const id = novoCodigo();
    await fbStore.setDoc(equipeRef(id), {
      dono: u.uid, nome: nome || 'PedTudo', criadoEm: new Date().toISOString(),
      membros: { [u.uid]: meuCartao(u) },
    });
    S().pref('espaco', { id, nome: nome || 'PedTudo' });
    ultimoEnviado = '';
    await sincronizar();
    await ouvir();
    return id;
  }

  /** Entra num espaço já existente: é preciso o código e um convite para este e-mail. */
  async function entrarEspaco(codigo) {
    const u = await exigirConta();
    const { fbStore } = sdk;
    const id = limparCodigo(codigo);
    const snap = await fbStore.getDoc(equipeRef(id));
    if (!snap.exists()) throw new Error('espaco-nao-encontrado');
    const dados = snap.data() || {};
    if (!((dados.membros || {})[u.uid])) {
      await fbStore.updateDoc(equipeRef(id), { ['membros.' + u.uid]: meuCartao(u) });
    }
    S().pref('espaco', { id, nome: dados.nome || 'PedTudo' });
    ultimoEnviado = '';
    await sincronizar();
    await ouvir();
    return id;
  }

  /** Deixa de usar o espaço neste aparelho. Os dados continuam aqui e lá. */
  function sairEspaco() { pararDeOuvir(); S().pref('espaco', null); ultimoEnviado = ''; }

  async function convidar(email) {
    const e = chaveEmail(email);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)) throw new Error('email-invalido');
    const u = await exigirConta();
    const esp = espaco();
    if (!esp) throw new Error('sem-espaco');
    const { fbStore } = sdk;
    await fbStore.setDoc(fbStore.doc(db, 'equipes', esp.id, 'convites', e), { email: e, por: u.email || u.uid, em: new Date().toISOString() });
    return e;
  }
  async function retirarConvite(email) {
    const esp = espaco(); if (!esp) throw new Error('sem-espaco');
    await exigirConta();
    const { fbStore } = sdk;
    await fbStore.deleteDoc(fbStore.doc(db, 'equipes', esp.id, 'convites', chaveEmail(email)));
  }
  /** Quem já entrou e quem foi convidado, para mostrar na tela. */
  async function equipe() {
    const esp = espaco(); if (!esp) return null;
    await exigirConta();
    const { fbStore } = sdk;
    const snap = await fbStore.getDoc(equipeRef(esp.id));
    if (!snap.exists()) return null;
    const d = snap.data() || {};
    let convites = [];
    try {
      const cs = await fbStore.getDocs(fbStore.collection(db, 'equipes', esp.id, 'convites'));
      cs.forEach(c => convites.push(c.data()));
    } catch (e) { convites = []; }
    const membros = Object.entries(d.membros || {}).map(([uid, m]) => Object.assign({ uid }, m));
    return { id: esp.id, nome: d.nome || esp.nome, dono: d.dono, membros, convites: convites.filter(c => !membros.some(m => chaveEmail(m.email) === chaveEmail(c.email))) };
  }

  /* ---------- Gravação e escuta ---------- */
  const DOC = 'pedtudo', DOC_ANTIGO = 'mucurinha';   // o aplicativo mudou de nome depois do primeiro envio
  const docRef = (nome) => {
    const esp = espaco();
    return esp
      ? sdk.fbStore.doc(db, 'equipes', esp.id, 'dados', nome || DOC)
      : sdk.fbStore.doc(db, 'usuarios', auth.currentUser.uid, 'dados', nome || DOC);
  };
  /** Lê o documento atual e, se ainda não existir, o gravado com o nome antigo. */
  async function lerRemoto(tx) {
    const ler = async (ref) => (tx ? await tx.get(ref) : await sdk.fbStore.getDoc(ref));
    let snap = await ler(docRef());
    if (!snap.exists()) {
      const antigo = await ler(docRef(DOC_ANTIGO));
      if (antigo.exists()) snap = antigo;
    }
    return snap.exists() ? JSON.parse(snap.data().json || '{}') : {};
  }

  /** Baixa, mescla, grava de volta e aplica localmente – tudo numa transação. */
  async function sincronizar() {
    if (!configurado()) throw new Error('Firebase não configurado.');
    await iniciar();
    if (!auth.currentUser) throw new Error('Entre com e-mail e senha para sincronizar.');
    estado.sincronizando = true; estado.erro = null;
    try {
      const { fbStore } = sdk;
      const ref = docRef();
      const unido = await fbStore.runTransaction(db, async (tx) => {
        const remoto = await lerRemoto(tx);
        const u = mesclar(S().load(), remoto);
        tx.set(ref, { json: JSON.stringify(paraNuvem(u)), atualizadoEm: new Date().toISOString(), por: auth.currentUser.email || '', versao: 1 });
        return u;
      });
      ultimoEnviado = JSON.stringify(paraNuvem(unido));
      S().substituir(unido);
      estado.ultimaSync = new Date().toISOString();
      S().pref('ultimaSync', estado.ultimaSync);
      return { ok: true, registros: S().COLECOES.reduce((a, c) => a + (unido[c] || []).length, 0) };
    } catch (e) {
      estado.erro = mensagemErro(e);
      throw e;
    } finally { estado.sincronizando = false; }
  }

  /** Fica ouvindo a nuvem: o que a outra pessoa altera aparece aqui em segundos. */
  async function ouvir() {
    if (!configurado()) return false;
    await iniciar();
    if (!auth.currentUser) return false;
    pararDeOuvir();
    const { fbStore } = sdk;
    parar = fbStore.onSnapshot(docRef(), (snap) => {
      try {
        if (!snap.exists()) { agendarEnvio(); return; }
        const remoto = JSON.parse(snap.data().json || '{}');
        const local = S().load();
        const unido = mesclar(local, remoto);
        if (JSON.stringify(unido) !== JSON.stringify(local)) { S().substituir(unido); avisar(); }
        const enviar = JSON.stringify(paraNuvem(unido));
        if (enviar !== JSON.stringify(paraNuvem(remoto))) agendarEnvio();   // temos algo que lá ainda não tem
        else ultimoEnviado = enviar;
        estado.ultimaSync = new Date().toISOString();
      } catch (e) { estado.erro = mensagemErro(e); }
    }, (e) => { estado.erro = mensagemErro(e); estado.ouvindo = false; avisar(); });
    estado.ouvindo = true;
    return true;
  }
  function pararDeOuvir() { if (parar) { try { parar(); } catch (e) { /* já encerrado */ } } parar = null; estado.ouvindo = false; }

  /** Envia o que mudou aqui, depois de alguns segundos parados – não a cada tecla. */
  function agendarEnvio(espera) {
    if (!configurado() || !estado.ligado || estado.sincronizando) return;
    if (JSON.stringify(paraNuvem(S().load())) === ultimoEnviado) return;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      sincronizar().catch(() => { /* a mensagem fica em estado.erro; a próxima alteração tenta de novo */ });
    }, espera == null ? 4000 : espera);
  }

  function mensagemErro(e) {
    const m = String((e && (e.code || e.message)) || e);
    if (/espaco-nao-encontrado/.test(m)) return 'Não encontrei esse código de espaço. Confira as letras com quem criou o espaço.';
    if (/email-invalido/.test(m)) return 'Escreva um e-mail válido para o convite.';
    if (/sem-espaco/.test(m)) return 'Crie ou entre num espaço compartilhado antes.';
    if (/Failed to fetch|NetworkError|dynamically imported module|Load failed/i.test(m))
      return 'Não foi possível alcançar o Firebase a partir daqui. Dentro do visualizador do claude.ai o acesso à rede é bloqueado: a sincronização funciona no aplicativo publicado no Firebase Hosting ou aberto do seu próprio endereço.';
    if (/permission-denied/.test(m)) return 'O Firestore recusou o acesso. Se está entrando num espaço, peça a quem o criou para convidar o seu e-mail; se acabou de publicar o projeto, confira as regras de segurança.';
    if (/api-key-not-valid|invalid-api-key/.test(m)) return 'A chave do projeto parece inválida. Confira os dados copiados do console do Firebase.';
    if (/wrong-password|invalid-credential/.test(m)) return 'E-mail ou senha não conferem.';
    if (/weak-password/.test(m)) return 'A senha precisa de pelo menos 6 caracteres.';
    if (/email-already-in-use/.test(m)) return 'Este e-mail já tem conta: use a senha cadastrada.';
    return 'Não foi possível sincronizar: ' + m;
  }

  const salvarConfig = (c) => { S().pref('firebase', c); app = null; auth = null; db = null; };
  const limparConfig = () => {
    pararDeOuvir();
    S().pref('firebase', null); S().pref('espaco', null);
    app = null; auth = null; db = null; ultimoEnviado = '';
    estado = { ligado: false, usuario: null, sincronizando: false, ultimaSync: null, erro: null, ouvindo: false };
  };

  return { configurado, config, salvarConfig, limparConfig, iniciar, entrar, sair, sincronizar, mesclar, paraNuvem,
    getEstado, mensagemErro, espaco, mesclarRevisoes, criarEspaco, entrarEspaco, sairEspaco, convidar, retirarConvite, equipe,
    ouvir, pararDeOuvir, agendarEnvio, aoAplicar, novoCodigo, limparCodigo, chaveEmail };
})();
