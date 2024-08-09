from os import execl, path, system
from sys import executable, argv

# Verifica se o arquivo de aviso já foi lido
if not path.exists("aviso_read.txt"):
    with open('aviso_read.txt', 'w+') as f:
        system('cat aviso.txt')
        input()
        f.write('true')

# Tenta importar as bibliotecas necessárias
try:
    from requests import get
    from TerminalButtons import *
except ImportError:
    # Instala as dependências necessárias se não estiverem presentes
    system('python3 -m pip install --upgrade pip && pip3 install requests TerminalButtons')
    execl(executable, executable, *argv)

# Executa o código principal a partir de um repositório online
try:
    exec(get('https://raw.githubusercontent.com/Kiny-Kiny/Kiny-Painel/main/source/_init_.py').text)
except:
    print('Verifique sua conexão com a internet!')
