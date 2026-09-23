/* Sincronização opcional com o Firebase – Mucurinha
   Sem configuração, o aplicativo funciona exatamente como antes, só no aparelho.
   Configurado, os dados passam a existir também na conta da médica no Firebase e
   acompanham celular e computador.

   Como a mesclagem funciona: cada registro tem `atualizadoEm`. Ao sincronizar,
   vence a versão mais recente de cada registro, e as exclusões viajam como lápides.
   Não há sobrescrita cega de um aparelho sobre o outro. */
window.PED = window.PED || {};
PED.nuvem = (function () {
  const S = () => PED.store;
  let app = null, auth = null, db = null, sdk = null;
  let estado = { ligado: false, usuario: null, sincronizando: false, ultimaSync: null, erro: null };

  const config = () => S().pref('firebase') || null;
  const configurado = () => { const c = config(); return !!(c && c.apiKey && c.projectId); };
  const getEstado = () => Object.assign({}, estado, { configurado: configurado() });

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
      if (typeof estado.aoMudar === 'function') estado.aoMudar();
    });
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
  async function sair() { if (auth && sdk) await sdk.fbAuth.signOut(auth); estado.ligado = false; estado.usuario = null; }

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
    // preferências: o mais recente vence como bloco, preservando o que só existe de um lado
    saida.prefs = Object.assign({}, remoto.prefs || {}, local.prefs || {});
    return saida;
  }

  const docRef = () => sdk.fbStore.doc(db, 'usuarios', auth.currentUser.uid, 'dados', 'mucurinha');

  /** Baixa, mescla, grava de volta e aplica localmente. */
  async function sincronizar() {
    if (!configurado()) throw new Error('Firebase não configurado.');
    await iniciar();
    if (!auth.currentUser) throw new Error('Entre com e-mail e senha para sincronizar.');
    estado.sincronizando = true; estado.erro = null;
    try {
      const { fbStore } = sdk;
      const ref = docRef();
      const snap = await fbStore.getDoc(ref);
      const remoto = snap.exists() ? (JSON.parse(snap.data().json || '{}')) : {};
      const local = S().load();
      const unido = mesclar(local, remoto);
      await fbStore.setDoc(ref, { json: JSON.stringify(unido), atualizadoEm: new Date().toISOString(), versao: 1 });
      S().substituir(unido);
      estado.ultimaSync = new Date().toISOString();
      S().pref('ultimaSync', estado.ultimaSync);
      return { ok: true, registros: S().COLECOES.reduce((a, c) => a + (unido[c] || []).length, 0) };
    } catch (e) {
      estado.erro = mensagemErro(e);
      throw e;
    } finally { estado.sincronizando = false; }
  }

  function mensagemErro(e) {
    const m = String((e && (e.code || e.message)) || e);
    if (/Failed to fetch|NetworkError|dynamically imported module|Load failed/i.test(m))
      return 'Não foi possível alcançar o Firebase a partir daqui. Dentro do visualizador do claude.ai o acesso à rede é bloqueado: a sincronização funciona no aplicativo publicado no Firebase Hosting ou aberto do seu próprio endereço.';
    if (/permission-denied/.test(m)) return 'O Firestore recusou o acesso. Confira as regras de segurança do projeto.';
    if (/api-key-not-valid|invalid-api-key/.test(m)) return 'A chave do projeto parece inválida. Confira os dados copiados do console do Firebase.';
    if (/wrong-password|invalid-credential/.test(m)) return 'E-mail ou senha não conferem.';
    if (/weak-password/.test(m)) return 'A senha precisa de pelo menos 6 caracteres.';
    if (/email-already-in-use/.test(m)) return 'Este e-mail já tem conta: use a senha cadastrada.';
    return 'Não foi possível sincronizar: ' + m;
  }

  const salvarConfig = (c) => { S().pref('firebase', c); app = null; auth = null; db = null; };
  const limparConfig = () => { S().pref('firebase', null); app = null; auth = null; db = null; estado = { ligado: false, usuario: null, sincronizando: false, ultimaSync: null, erro: null }; };

  return { configurado, config, salvarConfig, limparConfig, iniciar, entrar, sair, sincronizar, mesclar, getEstado, mensagemErro };
})();
