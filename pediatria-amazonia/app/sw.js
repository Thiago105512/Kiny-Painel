/* Service worker simples: cache-first para uso offline em campo (ribeirinho/rural). */
const CACHE = 'mucurinha-v1';
const ASSETS = ['./', './index.html', './css/styles.css', './manifest.webmanifest',
  './js/utils.js', './js/store.js', './js/calculators.js', './js/app.js',
  './js/data/sinais-gravidade.js', './js/data/contexto-epidemiologico.js', './js/data/queixas.js', './js/data/doencas.js', './js/data/doencas-extra.js', './js/data/neonatal.js',
  './js/data/medicamentos.js', './js/data/emergencias.js', './js/data/exames.js', './js/data/vacinas.js', './js/data/crescimento.js', './js/data/zscore.js', './js/data/notificacao.js'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res; }).catch(() => caches.match('./index.html'))));
});
