# 9. Design da interface

## Identidade
- **Estilo**: limpo, fundo branco/cinza-esverdeado muito claro, acento azul-esverdeado suave (`#1f8a9e`), verde para "Amazônia"/positivo (`#2e9e6b`), âmbar para atenção, vermelho para gravidade/emergência, roxo para itens informativos.
- **Tipografia**: fonte do sistema (rápida, legível em celular), 16 px base, títulos compactos.
- **Tokens** em `:root` (`css/styles.css`): cores, raio 14 px, sombra suave, altura do menu inferior.

## Layout
| Contexto | Comportamento |
|---|---|
| Celular (< 900 px) | Barra superior fixa (logo, busca, chip do paciente); conteúdo em coluna única; **menu inferior** com Início · Pacientes · Queixas · Doenças · Mais (abre grade com Amazônia, Medicamentos, Calculadoras, Emergências, Exames, Vacinas, Crescimento, Dados). Áreas seguras (notch) respeitadas. |
| Computador (≥ 900 px) | Barra lateral fixa com todos os módulos; conteúdo centralizado até 1080 px. |
| Impressão | Oculta navegação e botões; prescrição em fonte serifada com espaço para assinatura. |

## Componentes
- **Tiles** (botões grandes com ícone): queixas, calculadoras, emergências (variante vermelha), Amazônia (variante verde). Alvo mínimo de toque 44 px.
- **Cards** com título, **chips** de status (ativo, Amazônia, verificar, atrasada, pendente), **alertas** coloridos (vermelho = gravidade, âmbar = atenção, azul = apoio à decisão, verde = ok).
- **Toggles** para sintomas e sinais de gravidade (vermelho quando marcado).
- **Stepper** horizontal do fluxo de queixa (8 etapas, clicável).
- **Painel de resultado** verde com número grande, unidade e bloco de fórmula em monoespaçada; variante âmbar quando um limite foi aplicado.
- **Accordion** (`details`) para protocolos longos.
- **Tabelas** roláveis horizontalmente em telas estreitas.
- **Busca global** com resultados agrupados por categoria.
- **Toast** para confirmações rápidas.

## Linguagem e segurança visual
- Títulos das listas de hipóteses: "Diagnósticos diferenciais a considerar".
- Verbos: considerar, avaliar, compatível com, confirmar conforme protocolo.
- Rodapé em todas as telas clínicas: "Ferramenta de apoio… não substitui a decisão médica".
- Fontes e data de atualização ao final de cada protocolo, medicamento, exame, vacina e emergência; selo âmbar "verificar" quando aplicável.
- Alergia registrada aparece em vermelho no painel de dose e na prescrição.

## Acessibilidade
- Contraste AA nos textos, foco visível em campos, `aria-label` nos menus, tamanhos de toque generosos, sem dependência exclusiva de cor (ícones + texto).
