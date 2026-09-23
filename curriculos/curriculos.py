#!/usr/bin/env python3
"""Grades curriculares: ENEM, grandes vestibulares, Medicina e Direito
(nacional + Amazonas: UFAM, UEA, Fametro, Nilton Lins, Afya).

Sem dependências (só stdlib). Uso:
  python3 curriculos.py                 -> menu interativo
  python3 curriculos.py medicina        -> mostra uma seção
  python3 curriculos.py -b anatomia     -> busca termo em tudo
  python3 curriculos.py --json > g.json -> exporta tudo em JSON

Aviso: resumo de referência. Editais, PPCs e matrizes mudam todo ano;
confirme sempre no site oficial de cada instituição/banca.
"""
import json
import sys

# ---------------------------------------------------------------- ENEM
ENEM = {
    "Formato": [
        "180 questões objetivas (45 por área) + redação, em 2 domingos",
        "Dia 1: Linguagens + Ciências Humanas + Redação (5h30)",
        "Dia 2: Ciências da Natureza + Matemática (5h)",
        "Correção por TRI; usado no SISU, ProUni, FIES e vestibulares próprios",
    ],
    "Linguagens, Códigos e suas Tecnologias": [
        "Língua Portuguesa: interpretação, gêneros textuais, gramática em uso, variação linguística",
        "Literatura: Quinhentismo ao Contemporâneo, Modernismo, literatura afro/indígena",
        "Língua estrangeira (Inglês ou Espanhol): 5 questões de leitura",
        "Artes: vanguardas, arte brasileira, patrimônio, música, dança, teatro",
        "Educação Física: corpo, saúde, esporte, práticas corporais",
        "Tecnologias da informação e comunicação",
    ],
    "Ciências Humanas e suas Tecnologias": [
        "História do Brasil: Colônia, Império, República, Era Vargas, Ditadura, Redemocratização",
        "História Geral: Antiguidade, Idade Média, Moderna, Revoluções, Guerras, Guerra Fria",
        "Geografia: cartografia, clima, relevo, hidrografia, urbanização, agrária, geopolítica, meio ambiente",
        "Filosofia: antiga, medieval, moderna, contemporânea, ética e política",
        "Sociologia: clássicos (Durkheim, Weber, Marx), cidadania, movimentos sociais, trabalho, cultura",
    ],
    "Ciências da Natureza e suas Tecnologias": [
        "Biologia: ecologia, genética, evolução, citologia, fisiologia humana, botânica, zoologia, saúde",
        "Química: estequiometria, soluções, termoquímica, cinética, equilíbrio, eletroquímica, orgânica, ambiental",
        "Física: mecânica, termologia, óptica, ondulatória, eletricidade, magnetismo, energia",
    ],
    "Matemática e suas Tecnologias": [
        "Aritmética: razão, proporção, porcentagem, escalas, grandezas",
        "Álgebra: funções (1º/2º grau, exp., log.), sequências (PA/PG)",
        "Geometria plana, espacial e analítica; trigonometria",
        "Estatística (média, moda, mediana, gráficos), probabilidade e combinatória",
        "Matemática financeira (juros simples/compostos)",
    ],
    "Redação (dissertativo-argumentativa, 0-1000)": [
        "C1: norma culta", "C2: tema + repertório + tipo textual",
        "C3: projeto de texto/argumentação", "C4: coesão",
        "C5: proposta de intervenção (agente, ação, meio, finalidade, detalhamento) com respeito aos DH",
    ],
}

# ------------------------------------------------------ VESTIBULARES
VESTIBULARES = {
    "FUVEST (USP)": [
        "1ª fase: 90 questões de conhecimentos gerais (todas as disciplinas do EM)",
        "2ª fase: Português + Redação e questões discursivas das disciplinas da carreira",
        "Medicina: ênfase Biologia/Química/Física | Direito: ênfase Humanas (ver edital)",
        "Lista de obras literárias obrigatórias (muda periodicamente)",
    ],
    "Unicamp (Comvest)": [
        "1ª fase: 72 questões objetivas interdisciplinares",
        "2ª fase: redação + questões dissertativas por área, com peso por curso",
        "Leituras obrigatórias; forte interpretação e interdisciplinaridade",
    ],
    "UNESP (Vunesp)": [
        "1ª fase: 90 questões (Linguagens, Humanas, Natureza, Matemática)",
        "2ª fase: questões discursivas + redação",
    ],
    "UERJ": [
        "Exame de Qualificação: 60 questões objetivas (2 chances por ano)",
        "Exame Discursivo: redação + disciplinas específicas por curso",
    ],
    "UFPR / UFRGS / UnB (PAS e vestibular)": [
        "Provas próprias com lista de obras; UnB tem o PAS (seriado, 3 etapas)",
    ],
    "Medicina privada (Einstein, Santa Casa-SP, PUC etc.)": [
        "Provas próprias com foco em Biologia e Química; algumas usam nota do ENEM",
    ],
    "SISU / Enem": [
        "Porta de entrada para Unifesp, UFMG, UFRJ, UFAM (parte das vagas) e quase todas as federais",
        "Pesos por área definidos por curso (Medicina: Natureza/Redação costumam pesar mais)",
    ],
    "UFAM – PSC (Processo Seletivo Contínuo)": [
        "Seriado em 3 etapas (1º, 2º e 3º ano do EM), conteúdo do ano cursado",
        "Parte das vagas também via SISU/Enem",
        "Lista de obras e conteúdos definida em edital (conferir o edital vigente)",
    ],
    "UEA – Vestibular e SIS (Sistema de Ingresso Seriado)": [
        "Vestibular (acesso direto) + SIS em 3 etapas ao longo do EM",
        "Reserva de vagas para quem cursou o EM no Amazonas e para o interior",
        "Conteúdos definidos em edital (conferir o edital vigente)",
    ],
    "Fametro / Nilton Lins / Afya (Amazonas)": [
        "Vestibular próprio (prova objetiva + redação) ou aproveitamento da nota do ENEM",
        "Formas de ingresso e financiamento: dado pendente de validação (conferir edital)",
    ],
}

# ---------------------------------------------------------- MEDICINA
MEDICINA = {
    "Base legal (DCN – Res. CNE/CES nº 3/2014)": [
        "6 anos (12 semestres), carga mínima 7.200 h",
        "Internato: mínimo 35% da carga horária, 2 anos",
        "30% do internato em Atenção Básica e Urgência/Emergência do SUS",
        "Eixos: Atenção à Saúde, Gestão em Saúde, Educação em Saúde",
    ],
    "Ciclo básico (1º-2º ano)": [
        "Anatomia", "Histologia e Embriologia", "Biologia Celular e Molecular",
        "Bioquímica", "Biofísica", "Fisiologia", "Genética", "Imunologia",
        "Microbiologia", "Parasitologia", "Metodologia Científica e Bioestatística",
        "Saúde Coletiva / Introdução ao SUS", "Psicologia Médica", "Ética e Bioética",
    ],
    "Ciclo clínico (3º-4º ano)": [
        "Patologia Geral e Especial", "Farmacologia", "Semiologia/Propedêutica",
        "Clínica Médica: Cardio, Pneumo, Gastro, Nefro, Endócrino, Hemato, Reumato, Infecto, Neuro, Dermato",
        "Cirurgia Geral e Técnica Operatória", "Anestesiologia", "Ortopedia/Traumatologia",
        "Pediatria", "Ginecologia e Obstetrícia", "Psiquiatria/Saúde Mental",
        "Otorrino, Oftalmo, Urologia", "Epidemiologia", "Medicina de Família e Comunidade",
        "Medicina Legal e Deontologia", "Radiologia/Diagnóstico por Imagem",
    ],
    "Internato (5º-6º ano)": [
        "Clínica Médica", "Cirurgia Geral", "Pediatria", "Ginecologia e Obstetrícia",
        "Medicina de Família e Comunidade / Saúde Coletiva", "Urgência e Emergência",
        "Saúde Mental", "Estágios eletivos",
    ],
    "Referências nacionais": [
        "FMUSP (São Paulo) e FMRP-USP (Ribeirão Preto): currículo integrado, forte em pesquisa",
        "Unifesp – Escola Paulista de Medicina", "Unicamp – FCM", "UFMG", "UFRJ", "UFRGS",
        "Metodologias: tradicional, integrada e PBL (aprendizagem baseada em problemas)",
    ],
    "UFAM – Faculdade de Medicina (Manaus)": [
        "Dado curricular pendente de validação: importe a matriz oficial no app (Medicina → Importar matriz)",
    ],
    "UEA – Escola Superior de Ciências da Saúde (ESA)": [
        "Dado curricular pendente de validação: importe a matriz oficial no app (Medicina → Importar matriz)",
    ],
    "Fametro (Manaus)": [
        "Dado curricular pendente de validação: importe a matriz oficial no app (Medicina → Importar matriz)",
    ],
    "Nilton Lins (Manaus)": [
        "Dado curricular pendente de validação: importe a matriz oficial no app (Medicina → Importar matriz)",
    ],
    "Afya (unidade no Amazonas)": [
        "Dado curricular pendente de validação: importe a matriz oficial no app (Medicina → Importar matriz)",
    ],
}

RESIDENCIA_MEDICA = {
    "Provas": [
        "ENARE (Ebserh): exame nacional, inclui hospitais universitários como o HUGV/UFAM",
        "SUS-SP, USP (FMUSP/HC), Unifesp, Unicamp, UFRJ, UERJ, Santa Casa-SP, Einstein",
        "Amazonas: consultar os editais locais vigentes (dado pendente de validação)",
    ],
    "Conteúdo cobrado (acesso direto: 5 grandes áreas)": [
        "Clínica Médica", "Cirurgia Geral", "Pediatria", "Ginecologia e Obstetrícia",
        "Medicina Preventiva e Social (SUS, epidemiologia, ética, legislação)",
    ],
    "Especialidades de acesso direto mais concorridas": [
        "Dermatologia", "Oftalmologia", "Radiologia", "Ortopedia", "Psiquiatria",
        "Anestesiologia", "Clínica Médica", "Pediatria", "Cirurgia Geral", "Infectologia",
    ],
    "Etapas comuns": [
        "Prova objetiva (100-120 questões)", "Prova prática/multimídia (em algumas)",
        "Análise curricular (bônus PROVAB/Mais Médicos quando aplicável)",
    ],
}

# ------------------------------------------------------------ DIREITO
DIREITO = {
    "Base legal (DCN – Res. CNE/CES nº 5/2018, alt. nº 2/2021)": [
        "5 anos (10 semestres), carga mínima 3.700 h",
        "3 perspectivas: formação geral, técnico-jurídica e prático-profissional",
        "Prática jurídica (NPJ), TCC e atividades complementares obrigatórios",
        "Incentivo a formas consensuais de solução de conflitos",
    ],
    "Formação geral (1º-2º ano)": [
        "Introdução ao Estudo do Direito", "Teoria Geral do Estado e Ciência Política",
        "Filosofia e Filosofia do Direito", "Sociologia Jurídica", "Antropologia",
        "História do Direito", "Economia", "Psicologia Jurídica", "Ética",
        "Metodologia da Pesquisa", "Língua Portuguesa/Hermenêutica",
    ],
    "Formação técnico-jurídica": [
        "Direito Constitucional", "Direito Administrativo", "Direito Tributário e Financeiro",
        "Direito Penal", "Direito Civil (Geral, Obrigações, Contratos, Coisas, Família, Sucessões)",
        "Direito Empresarial", "Direito do Trabalho", "Direito Internacional Público e Privado",
        "Processo Civil", "Processo Penal", "Processo do Trabalho",
        "Direito Previdenciário", "Direito do Consumidor", "Direito Ambiental",
        "Direitos Humanos", "ECA", "Direito Digital (optativa em muitos cursos)",
    ],
    "Formação prático-profissional (4º-5º ano)": [
        "Núcleo de Prática Jurídica (NPJ) / escritório-modelo",
        "Estágio supervisionado", "Mediação, conciliação e arbitragem",
        "Oficinas de peças processuais", "TCC / monografia",
    ],
    "Referências nacionais": [
        "USP – Faculdade de Direito (Largo São Francisco)", "UFMG", "UERJ", "UnB",
        "UFPR", "UFRJ (Faculdade Nacional)", "UFPE", "FGV Direito SP e Rio",
    ],
    "UFAM – Faculdade de Direito (Manaus)": [
        "Dado curricular pendente de validação: importe a matriz oficial no app (Medicina → Importar matriz)",
    ],
    "UEA – Escola de Direito": [
        "Dado curricular pendente de validação: importe a matriz oficial no app (Medicina → Importar matriz)",
    ],
    "Fametro (Manaus)": [
        "Dado curricular pendente de validação: importe a matriz oficial no app (Medicina → Importar matriz)",
    ],
    "Nilton Lins (Manaus)": [
        "Dado curricular pendente de validação: importe a matriz oficial no app (Medicina → Importar matriz)",
    ],
    "Afya": [
        "Dado curricular pendente de validação: importe a matriz oficial no app (Medicina → Importar matriz)",
    ],
}

POS_DIREITO = {
    "Exame da OAB – 1ª fase (80 questões, ~40 para passar)": [
        "Ética/Estatuto da OAB (maior peso)", "Constitucional", "Civil", "Processo Civil",
        "Penal", "Processo Penal", "Trabalho", "Processo do Trabalho", "Administrativo",
        "Tributário", "Empresarial", "Direitos Humanos", "ECA", "Consumidor",
        "Ambiental", "Internacional", "Filosofia do Direito", "Previdenciário",
    ],
    "Exame da OAB – 2ª fase": [
        "Escolhe 1 área: Civil, Penal, Trabalho, Tributário, Administrativo, Constitucional ou Empresarial",
        "1 peça prático-profissional + 4 questões discursivas (nota mínima 6,0)",
    ],
    "Carreiras (o 'equivalente à residência')": [
        "Magistratura, MP, Defensoria, Delegado, Procuradorias, AGU (concursos + 3 anos de prática para Mag/MP)",
        "Especialização, mestrado e doutorado (programas locais: dado pendente de validação)",
        "Escolas da magistratura e da advocacia do estado (conferir oferta local)",
    ],
}

SECOES = {
    "enem": ("ENEM – Matriz de Referência", ENEM),
    "vestibulares": ("Vestibulares (nacionais e Amazonas)", VESTIBULARES),
    "medicina": ("Medicina – Graduação", MEDICINA),
    "residencia": ("Residência Médica", RESIDENCIA_MEDICA),
    "direito": ("Direito – Graduação", DIREITO),
    "oab": ("Direito – OAB e Pós", POS_DIREITO),
}

B, G, C = "\033[1;34m", "\033[1;32m", "\033[0m"


def mostrar(chave):
    titulo, dados = SECOES[chave]
    print(f"\n{B}== {titulo} =={C}")
    for sub, itens in dados.items():
        print(f"\n{G}# {sub}{C}")
        for i in itens:
            print(f"  - {i}")


def buscar(termo):
    termo = termo.lower()
    for chave, (titulo, dados) in SECOES.items():
        for sub, itens in dados.items():
            for i in itens:
                if termo in i.lower() or termo in sub.lower():
                    print(f"[{titulo} > {sub}] {i}")


def menu():
    chaves = list(SECOES)
    while True:
        print(f"\n{B}Grades Curriculares{C}")
        for n, k in enumerate(chaves, 1):
            print(f" {n}. {SECOES[k][0]}")
        print(" b. Buscar termo   0. Sair")
        op = input("> ").strip().lower()
        if op == "0":
            return
        if op == "b":
            buscar(input("Termo: "))
        elif op.isdigit() and 1 <= int(op) <= len(chaves):
            mostrar(chaves[int(op) - 1])


if __name__ == "__main__":
    a = sys.argv[1:]
    if not a:
        menu()
    elif a[0] == "--json":
        print(json.dumps({k: v[1] for k, v in SECOES.items()}, ensure_ascii=False, indent=1))
    elif a[0] == "-b" and len(a) > 1:
        buscar(" ".join(a[1:]))
    elif a[0] in SECOES:
        mostrar(a[0])
    else:
        print("Seções:", ", ".join(SECOES), "| -b termo | --json")
