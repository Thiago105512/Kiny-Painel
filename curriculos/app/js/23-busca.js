/* ============================================================
   23-busca — busca global (sem acento, sem maiúsculas) em temas, especialidades,
   disciplinas das matrizes, questões, flashcards, casos, anotações, materiais e repertórios.
   ============================================================ */
FORMS.busca = () => { const q = $("#busca-global").value.trim(); if (q) ir("#/busca/" + encodeURIComponent(q)); };
rota("/busca/:q", ({ q }) => {
  const n = norm(q), tem = s => norm(s).includes(n);
  const temas = Object.values(TEMAS).filter(t => tem(t.nome) || (t.sinonimos || []).some(tem) || (t.subtemas || []).some(s => tem(s.nome)))
    .sort((a, b) => (norm(b.nome).startsWith(n) - norm(a.nome).startsWith(n)) || a.nome.localeCompare(b.nome, "pt"));
  const esps = Object.values(ESPECIALIDADES).filter(e => tem(e.nome));
  const itens = grades().flatMap(g => itensGrade(g).filter(it => tem(it.nome) || (it.unidades || []).some(u => tem(u.nome))).map(it => ({ g, it })));
  const discRef = unicos(Object.values(TEMAS).flatMap(t => t.disciplinas || []).filter(tem));
  const qs = questoes().filter(x => tem(x.q) || tem(x.o.join(" ")));
  const cs = cards().filter(c => tem(c.frente) || tem(c.verso));
  const casos = todosCasos().filter(c => tem(c.titulo) || tem(c.tema || "") || tem(c.hda || ""));
  const notas = Object.entries(store.doc("notas").temas).filter(([, v]) => tem(v.texto || ""));
  const mats = Object.values(store.doc("materiais").itens).filter(m => tem(m.titulo) || tem(m.texto || ""));
  const reps = (REDACAO.repertorios || []).filter(r => tem(r.titulo) || tem(r.ideia));
  const pils = PILULAS.filter(p => tem(p.titulo) || tem(p.pergunta) || tem(p.texto) || tem(p.pessoa || ""));
  const total = temas.length + esps.length + itens.length + qs.length + cs.length + casos.length + notas.length + mats.length + reps.length + discRef.length + pils.length;
  const sec = (titulo, n, html) => n ? `<section><h2 class="sec">${titulo} <span class="small muted">${n}</span></h2>${html}</section>` : "";
  return {
    secao: "", titulo: `Busca: “${q}”`, sub: `${total} resultado(s)`,
    html: total ? [
      sec("Temas", temas.length, tabela([{ t: "Tema" }, { t: "Especialidade / área" }, { t: "Disciplinas relacionadas" }, { t: "Questões", num: 1 }], temas.slice(0, 30).map(t => [linkTema(t.id), esc(t.dominio === "enem" ? "ENEM · " + t.areaNome : (t.especialidades || []).map(e => ESPECIALIDADES[e]?.nome).filter(Boolean).join(", ")), `<span class="small">${(t.disciplinas || []).map(esc).join(", ")}</span>`, questoes().filter(x => x.tema === t.id).length]))),
      sec("Especialidades", esps.length, `<div class="chips">${esps.map(e => `<a class="chip" href="#/medicina/esp/${esc(e.id)}">${esc(e.nome)}</a>`).join("")}</div>`),
      sec("Nas matrizes das faculdades", itens.length, tabela([{ t: "Disciplina/módulo" }, { t: "Instituição" }, { t: "Período", num: 1 }], itens.slice(0, 30).map(({ g, it }) => [`<a href="#/medicina/grade/${esc(g.id)}/item/${esc(it.id)}">${esc(it.nome)}</a>`, esc(nomeInst(g.instituicao)), it.periodo + "º"]))),
      sec("Disciplinas de referência", discRef.length, `<p class="small">${discRef.map(d => `<a href="#/questoes" data-act="busca-disc" data-v="${esc(d)}">${esc(d)}</a>`).join(" · ")}</p>`),
      sec("Pílulas de estudo", pils.length, `<div class="lista-q">${pils.slice(0, 20).map(p => `<a href="#/estudar/p/${esc(p.id)}"><span class="txt">${esc(p.titulo)}</span><span class="meta"><span>${esc(TIPOS_PIL[p.tipo]?.[0] || p.tipo)}</span><span>${esc(p.area)}</span></span></a>`).join("")}</div>`),
      sec("Questões", qs.length, listaQuestoes(qs, 20)),
      sec("Flashcards", cs.length, tabelaCards(cs.slice(0, 20))),
      sec("Casos clínicos", casos.length, tabelaCasos(casos)),
      sec("Suas anotações", notas.length, tabela([{ t: "Tema" }, { t: "Trecho" }], notas.map(([t, v]) => { const i = norm(v.texto).indexOf(n); return [linkTema(t), `<span class="small">…${esc(v.texto.slice(Math.max(0, i - 60), i + 90))}…</span>`]; }))),
      sec("Materiais", mats.length, listaMateriais(mats)),
      sec("Repertórios de redação", reps.length, tabela([{ t: "Repertório" }, { t: "Ideia" }], reps.map(r => [esc(r.titulo), esc(r.ideia)]))),
    ].join("") : vazio(`Nada encontrado para “${esc(q)}”. Tente um termo mais curto ou um sinônimo (ex.: “IC” ou “insuficiência”).`),
  };
});
ACOES["busca-disc"] = el => { Object.assign(FQ, { trilha: "", disc: el.dataset.v, tema: "", subtema: "", status: [] }); ir("#/questoes"); };
