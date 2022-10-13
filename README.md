# <p align = "center"> TRACTIAN - Project </p>

## :bust_in_silhouette: Credencias de acesso

- Logar como admin: email: adm@tractian.com, password: 123456

- Logar como usuário na empresa Freios Supremos: email: emerson@gmail.com, password: 123456

***

##  🧑‍💻: Usabilidade

Existem duas formas de logar, usando a conta de administrador e a conta de usuário de empresa.

- Logando como admin você tem a disponibilidade de criar novas empresas e criar usuários para determinada empresa.

- Para um usuáio de empresa, basta clicar na empresa que trabalha e efetuar o login passado pelo admin. Você só conseguirá logar na empresa que o admin te cadastrou.

***

##  :clipboard: Descrição

Empresas que contraram o serviço desta aplicação são capazes de gerenciar os ativos (máquinas) de suas fábricas. Seus usuários são capazes de criar unidades, novas máquinas e obter informação destas em tempo real, podendo fazer atualizações a qualquer momento.  

***
##  :hammer: Principais Funcionalidades

- Pessoa logado como admin pode criar novas empresas e usuários pra essas empresas.
- Pessoa logada como usuária de empresa possui um overview da empresa em seu homePage, contendo o número de unidades, máquinas e usuários da empresa.
- Pessoa logada como usuária de empresa pode criar novas unidades e novas máquinas para alguma unidade específica. Possui também a opção de atualizar o healthLevel da máquina e, consequentemente seu status. Por último também é possível deletar unidade e máquinas (Para deletar uma unidade é necessário deletar suas máquinas antes).
- Pessoa logada como usuária de empresa clicando na opção "unit", é possível observar cada unidade da empresa separadamente com um gráfico mostrando quantas máquinas estão em um certo status, e clicando nesse status é exibido os nomes das máquinas dessa unidade que estão atualmente com esse status. Clicando no nome da máquina é exibido sua página de gerenciamento, possuindo informações da máquina e a disponibilidade de atualizar seu healthLevel. Podendo também criar uma nova máquina pra essa unidade ou deletar a máquina.

***

## :computer:	 Tecnologias e Ferramentas usadas

- React.js
- Node.js
- Typescript
- Express.js
- MongoDB
- Prisma
- Highcharts
- AntDesign
- JWTs & refresh tokens

***

## Link da aplicação deployada

- tractian-ten.vercel.app

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
