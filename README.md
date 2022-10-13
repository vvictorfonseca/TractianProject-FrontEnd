# <p align = "center"> TRACTIAN - Project </p>

##  :user: Credencias de acesso

- Logar como admin: email: adm@tractian.com, password: 123456

- Logar como usuário na empresa Freios Supremos: email: emerson@gmail.com, password: 123456

##  :clipboard: Usabilidade

Existem duas formas de logar, usando a conta de administrador e a conta de usuário de empresa.

- Logando como admin você tem a disponibilidade de criar novas empresas e criar usuários para determinada empresa.

- Para um usuáio de empresa, basta clicar na empresa que trabalha e efetuar o login passado pelo admin. Você só conseguirá logar na empresa que o admin te cadastrou.

##  :clipboard: Descrição

HomeCare é uma aplicação de prestação de serviços domésticos. Profissionais podem se cadastrar e escolhero tipo de serviço que irá prestar, FAXINA, JARDINAGEM ou SERVIÇOS ELÉTRICOS. Por outro lado, qualquer pessoa que necessita de algum serviço desse tipo, pode se cadastrar como cliente e contratar o serviço desses profissionais.

***
##  :hammer: Principais Funcionalidades

- Profissionais podem criar uma descrição e atualizá-la quando quiser.
- Profissionais recebem a notificação de alguma reserva de serviço feito por algum cliente e possuem a opção de aceitar ou não o trabalho. Caso rejeite, a solicitação é apagada imediatamente.
- Na página dos clientes, os profissionais são filtrados a partir de sua localização.
- Clientes podem atualizar sua localização a qualquer momento.
- Clientes podem escolher a categoria de serviço que querem contratar.
- Clientes podem solicitar um trabalho escolhendo a data para que o serviço seja prestado.
- Clientes possuem uma aba "requests" contendo todas suas solicitações de serviços e seus status, aceito ou pendente.

***

## :computer:	 Tecnologias e Ferramentas usadas

- React.js
- Node.js
- Express.js
- PostgresSQL
- Prisma
- JWTs & refresh tokens

***
## 🏁 Rodando a aplicação

Certifique-se que voce tem a ultima versão estável do Node.js e npm rodando localmente.

Primeiro, faça o clone desse repositório na sua maquina:

```
git clone https://github.com/vvictorfonseca/homeCare-frontEnd-Autoral.git
```

Depois, dentro da pasta, rode o seguinte comando para instalar as dependencias.

```
npm install
```

Finalizado o processo, é só inicializar o servidor. OBS: o back-end deve estar rodando.
```
npm start
```
