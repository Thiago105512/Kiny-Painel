# Mucurinha – mini sistema médico pediátrico para o Amazonas

Ferramenta de **apoio acadêmico e clínico** para atendimento infantil no contexto amazônico: paciente → queixa → sintomas → contexto epidemiológico → sinais de gravidade → diagnósticos diferenciais → exames → protocolos → tratamento → medicações → prescrição → evolução.

> Não substitui a avaliação e a decisão médica. Nenhuma tela emite diagnóstico automático. Toda dose e conduta deve ser conferida em protocolos oficiais (Ministério da Saúde, SBP, OMS/OPAS) e bulas antes de prescrever.

**Médica responsável (padrão do sistema):** Dra. Catarina Ribeiro de Queiroz · Pediatra · CRM/AM 10.677 · RQE 6.706 — identificação impressa na prescrição e registrada na evolução; editável em *Dados › Profissional responsável*.

## Executar o protótipo

Não há build nem dependências.

```bash
# opção 1: abrir diretamente
xdg-open pediatria-amazonia/app/index.html      # ou clique duplo no arquivo

# opção 2: servir localmente (habilita PWA/offline)
cd pediatria-amazonia/app && python3 -m http.server 8080
# acesse http://localhost:8080
```

No celular, abra a URL e use "Adicionar à tela inicial" para instalar como app.

## Conteúdo do MVP

| Módulo | Quantidade |
|---|---|
| Queixas com fluxo guiado | 46 |
| Doenças com protocolo padronizado (18 seções) | ver `docs/06-doencas.md` |
| Medicamentos com cálculo mg/kg → mL | ver `docs/07-medicamentos.md` |
| Calculadoras | 18 |
| Emergências com doses por peso | 14 |
| Exames com referências por idade | 39 |
| Vacinas (PNI) | calendário 0–14 anos |
| Módulo Amazônia | doenças regionais em destaque |
| Cadastro de pacientes, prescrição editável com confirmação, evolução SOAP com comparação | ✔ |

## Documentação (entregáveis)
1. [Arquitetura](docs/01-arquitetura.md)
2. [Mapa de telas](docs/02-mapa-de-telas.md)
3. [Banco de dados](docs/03-banco-de-dados.md) · [schema.sql](docs/schema.sql)
4. [Fluxo de navegação](docs/04-fluxo-de-navegacao.md)
5. [Estrutura dos módulos](docs/05-modulos.md)
6. [Lista inicial de doenças](docs/06-doencas.md)
7. [Lista inicial de medicamentos](docs/07-medicamentos.md)
8. [Calculadoras](docs/08-calculadoras.md)
9. [Design da interface](docs/09-design-interface.md)
10. Protótipo funcional: [`app/`](app/)

## Segurança clínica
- Cada item das bases (`app/js/data/*.js`) traz `fontes` e `atualizadoEm`; itens incertos são marcados com `verificar: true` e recebem selo visual.
- A prescrição só é emitida após a marcação "Revisei e confirmo".
- Dados dos pacientes ficam apenas no navegador (localStorage); use Dados › Exportar para backup.

## Como revisar/atualizar o conteúdo clínico
Edite os arquivos em `app/js/data/` seguindo `app/js/data/CONTRATO.md` e atualize `atualizadoEm` e `fontes`. Valide com:

```bash
cd pediatria-amazonia/app && node -e "global.window=global;for(const f of ['utils','store','data/sinais-gravidade','data/contexto-epidemiologico','data/queixas','data/doencas','data/medicamentos','data/emergencias','data/exames','data/vacinas','data/crescimento','calculators'])require('./js/'+f+'.js');console.log(Object.keys(PED.data))"
```

## Licença e uso
Uso educacional e de apoio clínico. O conteúdo clínico deve ser revisado por profissional habilitado antes de uso assistencial.
