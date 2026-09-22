window.PED = window.PED || {}; var PED = window.PED; PED.data = PED.data || {};

// PED.data.acidentes — acidentes da infância no cotidiano (queimadura, intoxicação,
// engasgo, afogamento, TCE, queda, mordedura, choque elétrico, ferimentos).
// Apoio à decisão: nunca "o diagnóstico é" ou "o tratamento é"; usar "considerar",
// "avaliar", "compatível com", "confirmar conforme protocolo/bula".
// Estrutura: protocolos (esquema de PED.data.doencas), queixas (esquema de PED.data.queixas),
// ferramentas (Lund-Browder, Parkland, PECARN, profilaxia de raiva e tétano, agentes tóxicos).

PED.data.acidentes = {
  protocolos: [],
  queixas: [],
  ferramentas: {},
  fontes: [
    { nome: 'Guia de Vigilância em Saúde – Ministério da Saúde', ano: 2024 },
    { nome: 'Normas Técnicas de Profilaxia da Raiva Humana – Ministério da Saúde', ano: 2014 },
    { nome: 'Nota Informativa sobre o esquema de profilaxia antirrábica humana – Ministério da Saúde', ano: 2022 },
    { nome: 'Tratado de Pediatria e documentos científicos – Sociedade Brasileira de Pediatria', ano: 2022 },
    { nome: 'PALS – Pediatric Advanced Life Support, American Heart Association', ano: 2020 },
    { nome: 'Nelson Textbook of Pediatrics', ano: 2020 },
    { nome: 'OMS/OPAS – Pocket Book of Hospital Care for Children e World Report on Child Injury Prevention', ano: 2013 },
    { nome: 'Centros de Informação e Assistência Toxicológica (CIATox) e Disque Intoxicação – Ministério da Saúde / Anvisa', ano: 2023 }
  ],
  atualizadoEm: '2026-09'
};
