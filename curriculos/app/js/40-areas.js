/* ============================================================
   40-areas — "Áreas" (#/areas): trocar a área de estudo (objetivo do perfil) com um toque.
   Cada cartão troca perfil.objetivo e leva à página principal da área; o progresso de cada
   área fica guardado (é por trilha), então trocar não apaga nada.
   Vestibulares usa o conteúdo do ENEM (OBJ_CONTEUDO em 27-curso). UFAM e UEA ali são só rótulo.
   Concursos (#/concursos, #/concursos/<subárea>[/<cargo>]): em breve — lista subáreas e cargos
   de dados/concursos.json, sem trocar o objetivo; "Tenho interesse" fica em perfil.interessesConcursos.
   ============================================================ */
/** [objetivo, título do cartão, descrição, figura, cor]. A ordem é a da tela. */
const AREAS_ESTUDO = [
  ["medicina", "Medicina — graduação", "Matérias da faculdade, casos clínicos e questões", "estetoscopio", "#C0265F"],
  ["residencia", "Residência médica", "Provas de residência e revisão por grandes áreas", "ambulancia", "#B45309"],
  ["enem", "ENEM", "Questões, redação e as matérias do ensino médio", "livro", "#2340B8"],
  ["vestibulares", "Vestibulares", "PSC/UFAM, SIS/UEA e Macro/UEA — por enquanto com as questões no estilo ENEM, que cobrem os mesmos conteúdos", "lampada", "#0F766E"],
  ["direito", "Direito — graduação", "Disciplinas do curso de Direito", "balanca", "#6D28D9"],
  ["oab", "OAB", "Exame de Ordem", "balanca", "#475569"],
];
const CONCURSOS = () => DADOS.concursos?.subareas || [];
const subConcurso = id => CONCURSOS().find(s => s.id === id);
const interessesConc = () => { const v = store.doc("perfil").interessesConcursos; return Array.isArray(v) ? v : []; };
const temInteresse = chave => interessesConc().includes(chave);
/** Origem da lista (ex.: blocos do CNU), em texto pequeno — sem link. */
const fonteConc = S => S.fonteCurta ? `<p class="small muted fonte-conc" title="${esc(S.fonte || "")}">Fonte: ${esc(S.fonteCurta)}</p>` : "";
const SELO_BREVE = `<span class="selo-breve"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>Em breve</span>`;
/** Figura e cor de cada subárea de concurso (as que não estão aqui usam a pasta cinza). */
const ARTE_CONC = { cnu: ["grade", "#2340B8"], saude: ["estetoscopio", "#C0265F"], "tribunais-mp": ["balanca", "#6D28D9"], "policial-seguranca": ["escudo", "#1D4ED8"],
  "fiscal-controle": ["grafico", "#B45309"], educacao: ["livro", "#0F766E"], administrativo: ["maleta", "#475569"], bancarios: ["chave", "#A16207"], legislativo: ["casa", "#15803D"], _: ["maleta", "#475569"] };
const CRUMB_AREAS = ["Áreas", "#/areas"], CRUMB_CONC = ["Concursos", "#/concursos"];

rota("/areas", () => {
  const atual = objetivoEscolhido();
  const cartao = ([k, t, d, fig, cor]) => { const eu = k === atual;
    return `<button type="button" class="area-card" data-act="area-escolher" data-v="${k}" style="--h:${cor}" ${eu ? 'aria-current="true"' : ""} aria-label="${esc(t)}${eu ? " — área atual" : ""}. ${esc(d)}">
      ${ilustra(fig, cor, "g")}<div>${eu ? `<span class="selo-aqui">✓ Você está aqui</span>` : ""}<b>${esc(t)}</b><small>${esc(d)}</small></div></button>`; };
  return {
    secao: "areas", titulo: "Áreas de estudo", voltar: true,
    sub: atual ? `Agora: <b>${esc(OBJETIVOS[atual] || atual)}</b>. Toque em outra área para trocar.` : "Toque numa área para estudar só o conteúdo dela.",
    html: `<p class="area-nota">Seu progresso em cada área fica guardado: trocar de área não apaga nada.</p>
      <div class="areas-lista">${AREAS_ESTUDO.map(cartao).join("")}
        <a class="area-card em-breve" href="#/concursos" style="--h:#A16207" aria-label="Concursos — em breve. Ver as áreas e cargos que vão chegar">${ilustra("maleta", "#A16207", "g")}<div>${SELO_BREVE}<b>Concursos</b><small>CNU, saúde, tribunais, polícia, educação e outros</small></div></a></div>`,
  };
});
ACOES["area-escolher"] = el => {
  const o = el.dataset.v; if (!OBJETIVOS[o]) return;
  const P = store.doc("perfil"), nome = NOME_CURTO_OBJ[o] || OBJETIVOS[o];
  if (P.objetivo === o) toast("Você já está estudando " + nome);
  else { P.objetivo = o; P.boasVindas = true; store.mudou("perfil"); toast("Agora você está estudando " + nome); }
  ir(AREA_DO_OBJ[o]?.h || "#/");
};

/* ---------- Concursos (em breve) ---------- */
const linhaInteresses = () => {
  const nomes = interessesConc().map(ch => { const [s, c] = ch.split("/"), S = subConcurso(s), C = S?.cargos.find(x => x.id === c); return C ? `<a href="#/concursos/${esc(s)}/${esc(c)}">${esc(C.nome)}</a>` : ""; }).filter(Boolean);
  return `<p class="area-nota"><b>Seus interesses:</b> ${nomes.length ? nomes.join(", ") : "nenhum ainda. Toque em “Tenho interesse” nos cargos que quer estudar."}</p>`;
};
const btnInteresse = (s, c, nome) => { const on = temInteresse(s + "/" + c);
  return `<button type="button" class="btn ${on ? "azul" : "sec"} interesse" data-act="conc-interesse" data-v="${esc(s + "/" + c)}" aria-pressed="${on}" aria-label="Tenho interesse em ${esc(nome)}">${on ? "✓ Tenho interesse" : "Tenho interesse"}</button>`; };
const AVISO_CONC = `<div class="aviso em-breve-aviso"><span><b>Em breve.</b> Ainda não há questões de concursos. Marque “Tenho interesse” nos cargos que quer estudar: assim sabemos o que preparar primeiro. Sua área de estudo atual não muda.</span></div>`;
rota("/concursos", () => ({
  secao: "areas", crumbs: [CRUMB_AREAS], titulo: "Concursos", sub: "Em breve · conteúdo em preparação",
  html: `${linhaInteresses()}${AVISO_CONC}
    <div class="areas-lista">${CONCURSOS().map(s => `<a class="area-card${s.destaque ? " destaque" : ""}" href="#/concursos/${esc(s.id)}" style="--h:${(ARTE_CONC[s.id] || ARTE_CONC._)[1]}">${ilustra(...(ARTE_CONC[s.id] || ARTE_CONC._), "m")}<div>${s.destaque ? `<span class="pill azul">Destaque</span>` : ""}<b>${esc(s.nome)}</b><small>${esc(s.destaque ? `${s.descricao || ""} · ${s.cargos.length} ${(s.rotuloItens || "cargos").toLowerCase()}` : s.cargos.map(c => c.nome).join(" · "))}</small></div>${SELO_BREVE}</a>`).join("")}</div>`,
}));
rota("/concursos/:sub", ({ sub }) => {
  const S = subConcurso(sub); if (!S) return paginaNaoEncontrada();
  return {
    secao: "areas", crumbs: [CRUMB_AREAS, CRUMB_CONC], titulo: S.nome, sub: (S.descricao ? esc(S.descricao) + " · " : "") + "em breve",
    html: `<h2 class="sec">${esc(S.rotuloItens || "Cargos")}</h2>${fonteConc(S)}<div class="cargos-lista">${S.cargos.map(c => `<div class="cargo-card"><a href="#/concursos/${esc(S.id)}/${esc(c.id)}"><b>${esc(c.nome)}</b><small>Em breve · Conteúdo em preparação</small></a>${btnInteresse(S.id, c.id, c.nome)}</div>`).join("")}</div>
      <p class="small muted">Sem questões ainda. Marcar interesse não troca sua área de estudo.</p>`,
  };
});
rota("/concursos/:sub/:cargo", ({ sub, cargo }) => {
  const S = subConcurso(sub), C = S?.cargos.find(x => x.id === cargo); if (!C) return paginaNaoEncontrada();
  return {
    secao: "areas", crumbs: [CRUMB_AREAS, CRUMB_CONC, [S.nome, "#/concursos/" + S.id]], titulo: C.nome, sub: esc(S.nome) + " · em breve",
    html: `<section class="caixa pilha"><p><b>Conteúdo em preparação.</b> Ainda não há questões para ${esc(C.nome)}. Marque “Tenho interesse” para entrar na lista de prioridades.</p>
      <div class="linha">${btnInteresse(S.id, C.id, C.nome)}</div>${fonteConc(S)}</section>`,
  };
});
ACOES["conc-interesse"] = el => {
  const ch = el.dataset.v, [s, c] = String(ch).split("/"), C = subConcurso(s)?.cargos.find(x => x.id === c); if (!C) return;
  const P = store.doc("perfil"), lista = interessesConc().filter(x => x !== ch), on = !temInteresse(ch);
  P.interessesConcursos = on ? [...lista, ch] : lista; store.mudou("perfil");
  toast(on ? `Anotado: interesse em ${C.nome}` : `Interesse em ${C.nome} removido`); atualizar();
};
