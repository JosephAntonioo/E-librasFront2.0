http://192.168.56.101:5000/mediapipe
Anotações final da noite integração back end


A - Sobre rodar a API
----------------------
CMD ou Terminal raiz/do/projeto>main.py

A1º
	*Linux
	Abrir E-LibrasBack2.0 em um Linux ou em um Windows em que o 
	MediaPipe.solutions.Hands não esteja bugado
A1.1º
	*Linux
	Instalar todos os pacotes necessários basicamente,
	sudo python3 -m pip install *packageName*,
	os que estão em requirement estão obsoletos então
	podemos fazer uma task de limpeza de pacotes no futuro
A2º
	*Linux
	Compilar projeto
	raiz/do/projeto>main.py
A3º
	*Linux
	ifconfig no terminal e pega o endereço ip do linux
A3.1º
	*Windows
	Caso tenha problemas com rede tem o video explicando oq fazer,
	mas em poucas palavras:
		1ºAdap. Rede VMBox: INTEL PRO 1000 MT Desktop(NAT)
		2ºAdap. Rede VMBox: INTEL PRO 1000 MT Desktop(
							Host-only,
							'VirtualBox Host-only Ethernet Adapter)
A3.2º
	*Windows
	Caso ainda tenha problemas de rede verifique o seguinte link:
	https://askubuntu.com/questions/1224971/how-to-assign-static-ip-to-ubuntu-server-virtualbox
	
A4º
	*Linux
	Assim que o projeto estiver compilando preparado e pronto,
	testar via Postman o metodo principal '/mediapipe'
A5º
	*Windows
	Caso o teste no Linux tenha dado certo, prossiga para o teste
	no postman do Windows, a url é http://IPLINUX:PORTAAPI/mediapipe,
	e no body precisa conter um form-data com uma key imgData contendo
	um value com um arquivo do tipo foto .png ou .jpg creio que o formato
	e dimensões não importem contando que seja possível abrir
	
======================

B - Sobre rodar o Front
*Todos Windows/Mobile
----------------------
CMD ou Terminal(não testado) raiz/do/projeto>expo start

B1º
	Abrir E-LibrasFront2.0 em um VSCode, não testado em Linux.
B1.1º
	Instalar todos os pacotes necessários basicamente,
	npm install 
	instalada tudo mas no futo precisamos nos certificar dos pacotes
	instalados, por questão de segurança e desempenho, verificar as
	versões também é interessante mas creio ser algo mais local,
	baixa prioridade no momento.
B2º
	Compilar projeto
	raiz/do/projeto>expo start
B3º
	Com o app ExpoGo builde a aplicação em seu smartphone
B4º
	Aceitar o uso da camera caso primeiro uso
B4.1º
	Caso clicar fora da bosta e tem que instalar dnv ou limpar cache
B4.2º
	Caso clicar em não vai ficar em uma tela em branco do expo,
	e na próxima vez que abrir o app será solicitada novamente a 
	permissão até que seja aceita
B5º
	Ao carregar a tela inicial deve carregar:
		Camera
		Botões:
			Canto superior ao lado direito da tela:
				Ir para tela de informações
			Canto inferior ao centro da tela:
				Troca camera
				Capturar imagem
				Limpar textBox
		TextBox vazia
B5.1º
	As vezes o component da camera não está carregando legal quando faço
	muitas alterações sem refresh principalmente no html e css mas as 
	vezes no js também da dessas. SOLUÇÃO:comenta a tag <Camera> inteira
	só a tag oq tem dentro rlx, e a tag de fechamento também, tudo isso
	esperando carregar os erros e o acerto no mobile, ai quando tiver 
	tirado por completo volta a tag de abertura e depois a de fechamento
B6º
	Primeiro teste é girar a camera, está funcionando perfeitamente
B6.1º
	Aqui podemos englobar ou criar um novo elemento dentro de B apenas
	para falar da frontal e outro da traseira, mas como está em fase de
	teste não cabe documentar agora
B7º
	O segundo teste seria ir e voltar da tela de informações e se certificar
	do conteúdo contiduo nela.
B8º
	O terceiro teste é fundamental para o funcionamento do projeto,
	que é se certificar que está acontecendo a tradução para isso será
	feito um tópico apenas para testes dessa funcionalidade.

======================

C - Sobre a função de tradução
*Todos Windows/Mobile
----------------------
C1º
	Clicar no botão de captura de imagem
C1.1º
	[BUG][PRIORIDADE:MÉDIA-ALTA]
	Ao clicar no botao a imagem que é capturada ao invés de ser a mais recente
	é a penultima tirada, logo a primeira que for tirada ao iniciar o app, 
	indenpendente da vez, retornará null no metodo, apos isso enviara a 
	penultima foto tirada
TASK:
	Configurar url fetch para API no Linux
	Testar envios de imagens
	Testar retornos
	C1.1º
ATT:
	Deu problema por causa da rede da VM Linux então o próximo paso ou
	é tentar acertar esse problema de rede ou tentar rodar o media pipe 
	no windows
	