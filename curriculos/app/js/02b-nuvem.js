/* ============================================================
   02b-nuvem — Firebase para a versão pública (GitHub Pages, sem conta Claude).
   Dentro do Claude nada disto roda: lá o armazenamento é o do próprio artefato.
   Fora dele, se DADOS.firebase existir (dados/firebase.json), o app:
     - entra de forma anônima e automática (reportes e calibração chegam ao banco);
     - oferece "Entrar com Google" para sincronizar entre aparelhos.
   NUVEM.use(nome) imita window.claude.use: "user" → {id()}, "db" → {doc(p), collection(p)},
   com os mesmos caminhos (data/users/<uid>/<doc>, reportes/<id>, calibracao/<id>…),
   então o 03-store funciona igual nos dois ambientes.
   ============================================================ */
const NUVEM = (() => {
  const VERSAO = "10.12.2", BASE = `https://www.gstatic.com/firebasejs/${VERSAO}/`;
  const cfg = () => (typeof DADOS !== "undefined" && DADOS.firebase && DADOS.firebase.projectId) ? DADOS.firebase : null;
  const disponivel = () => !(window.claude && window.claude.use) && !!cfg();
  let pronto = null, auth = null, fs = null;

  const script = src => new Promise((ok, erro) => {
    const s = document.createElement("script"); s.src = src; s.async = false;
    s.onload = ok; s.onerror = () => erro(new Error("não carregou " + src)); document.head.appendChild(s);
  });
  // Firestore recusa undefined; os documentos do app são JSON puro, então a ida e volta limpa tudo.
  const limpo = o => JSON.parse(JSON.stringify(o));

  function iniciar() {
    if (pronto) return pronto;
    pronto = (async () => {
      for (const f of ["firebase-app-compat.js", "firebase-auth-compat.js", "firebase-firestore-compat.js"]) await script(BASE + f);
      const app = window.firebase.apps.length ? window.firebase.app() : window.firebase.initializeApp(cfg());
      auth = app.auth(); fs = app.firestore();
      try { await auth.getRedirectResult(); } catch (e) { /* login por redirecionamento que falhou: segue anônimo */ }
      await new Promise(ok => { const off = auth.onAuthStateChanged(() => { off(); ok(); }); });
      if (!auth.currentUser) await auth.signInAnonymously();
      return true;
    })().catch(e => { console.warn("Firebase indisponível:", e.message); return false; });
    return pronto;
  }

  const db = {
    doc: p => ({ set: o => fs.doc(p).set(limpo(o)), get: () => fs.doc(p).get() }),
    collection: p => fs.collection(p),
  };
  const user = { id: async () => auth?.currentUser?.uid || null };

  /** Equivalente a window.claude.use, ou null se não houver nuvem. */
  async function use() {
    if (!disponivel() || !(await iniciar())) return null;
    return async nome => (nome === "db" ? db : nome === "user" ? user : null);
  }

  function estado() {
    const u = auth?.currentUser;
    if (!disponivel()) return { tipo: "off" };
    if (!u) return { tipo: "carregando" };
    if (u.isAnonymous) return { tipo: "anonimo" };
    return { tipo: "google", email: u.email || "", nome: u.displayName || "" };
  }

  async function entrarGoogle() {
    if (!(await iniciar())) return "Não foi possível falar com o servidor. Confira a internet.";
    const prov = new window.firebase.auth.GoogleAuthProvider();
    try {
      // Mantém o mesmo usuário: o que foi feito até agora neste aparelho vira parte da conta Google.
      if (auth.currentUser?.isAnonymous) await auth.currentUser.linkWithPopup(prov);
      else await auth.signInWithPopup(prov);
    } catch (e) {
      if (e.code === "auth/credential-already-in-use" && e.credential) await auth.signInWithCredential(e.credential);
      else if (e.code === "auth/popup-blocked" || e.code === "auth/operation-not-supported-in-this-environment") { await auth.signInWithRedirect(prov); return null; }
      else if (e.code === "auth/popup-closed-by-user" || e.code === "auth/cancelled-popup-request") return "Login cancelado.";
      else return "Não foi possível entrar (" + (e.code || e.message) + ").";
    }
    location.reload();   // recomeça já com a conta Google: o store mescla o que está neste aparelho com a nuvem
    return null;
  }

  async function sair() {
    if (!(await iniciar())) return;
    await auth.signOut(); location.reload();
  }

  return { disponivel, use, estado, entrarGoogle, sair, iniciar };
})();
