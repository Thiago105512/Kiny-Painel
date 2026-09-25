/* ============================================================
   01-base — utilidades puras (sem estado do app)
   ============================================================ */
/** Registro de eventos delegados (preenchido pelos módulos; ver 06-ui). */
const ACOES = {}, MUDANCAS = {}, ENTRADAS = {}, FORMS = {};
const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const LETRAS = "ABCDE";
const DIA = 86400000;

/** Texto normalizado para busca: minúsculo e sem acentos. */
const norm = s => String(s ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const slug = s => norm(s).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48) || "item";
const novoId = (p = "x") => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

/** Datas sempre em horário local no formato AAAA-MM-DD. */
const diaISO = (d = new Date()) => { const x = new Date(d); return x.getFullYear() + "-" + String(x.getMonth() + 1).padStart(2, "0") + "-" + String(x.getDate()).padStart(2, "0"); };
const hoje = () => diaISO();
const somaDias = (iso, n) => { const [a, m, d] = iso.split("-").map(Number); return diaISO(new Date(a, m - 1, d + n)); };
const dataBR = iso => { if (!iso) return "—"; const [a, m, d] = String(iso).slice(0, 10).split("-"); return `${d}/${m}/${a}`; };
const dataCurta = ts => new Date(ts).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
const diasAte = iso => Math.round((new Date(iso + "T00:00:00") - new Date(hoje() + "T00:00:00")) / DIA);
const quando = iso => { const n = diasAte(iso); return n < -1 ? `atrasada ${-n} dias` : n === -1 ? "ontem" : n === 0 ? "hoje" : n === 1 ? "amanhã" : `em ${n} dias`; };
const mmss = ms => { const s = Math.max(0, Math.round(ms / 1000)), h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), x = s % 60; return (h ? h + ":" + String(m).padStart(2, "0") : m) + ":" + String(x).padStart(2, "0"); };
const horas = seg => { const m = Math.round(seg / 60); return m < 60 ? m + " min" : Math.floor(m / 60) + " h " + String(m % 60).padStart(2, "0"); };
const pct = (a, b) => b ? Math.round(a / b * 100) : 0;

const embaralhar = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const unicos = a => [...new Set(a.filter(x => x != null && x !== ""))];
const porChave = (a, f) => a.reduce((m, x) => { const k = f(x); (m[k] = m[k] || []).push(x); return m; }, {});
const ordenarPt = (a, f = x => x) => a.slice().sort((x, y) => String(f(x)).localeCompare(String(f(y)), "pt"));

/** localStorage tolerante a falhas (aba privada, bloqueio, prévia). */
const ls = {
  get(k, def = null) { try { const v = localStorage.getItem(k); return v == null ? def : JSON.parse(v); } catch (e) { return def; } },
  /** Devolve false quando o navegador recusa (cota cheia, aba privada). */
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } },
  del(k) { try { localStorage.removeItem(k); } catch (e) { } },
};

/** Carrega um script de CDN sob demanda (PDF, planilha, DOCX). */
const _scripts = {};
function carregarScript(src) {
  return _scripts[src] || (_scripts[src] = new Promise((ok, erro) => {
    const s = document.createElement("script"); s.src = src; s.onload = ok;
    s.onerror = () => { delete _scripts[src]; erro(new Error("Não foi possível carregar " + src.split("/").pop() + ". Verifique a conexão.")); };
    document.head.appendChild(s);
  }));
}

/** Similaridade de nomes (Jaccard de palavras significativas). Usada só como sugestão. */
const PARADAS = new Set("a o e de da do das dos em no na nos nas i ii iii iv v vi vii viii ix x para com sem ao aos".split(" "));
const palavras = s => new Set(norm(s).split(/[^a-z0-9]+/).filter(w => w.length > 2 && !PARADAS.has(w)));
function similaridade(a, b) { const A = palavras(a), B = palavras(b); if (!A.size || !B.size) return 0; let i = 0; A.forEach(w => B.has(w) && i++); return i / (A.size + B.size - i); }
