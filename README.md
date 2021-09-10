# Desafio Stefanini Brasil

## Antes de começar....

- [Keep it simple](https://pt.wikipedia.org/wiki/Princ%C3%ADpio_KISS), entendemos que você possui suas prioridades e nossa proposta é com esse desafio é ter uma idéia geral de como você faz seus códigos, toma suas decisões arquiteturais e o seu conhecimento geral sobre os assuntos abordados.

O desafio que propomos é provisionar uma infraestrutura na AWS, em que se tenha uma lambda que sejá capaz de registrar em um banco de dados relacional ou não relacional, dados sobre funcionários de uma empresa.

## Requisitos
 1. Utilizar Clean Architecture
 2. Seu desafio precisa estar versionado no Github, em um repositório público.
 3. Documentação é primordial e vamos nos guiar por ela ;)
 4. Um funcionário deve possuir como atributos : Id , Idade , Nome e Cargo<br/>
 5. Salvar as informações necessárias em um banco de dados relacional ou não relacional de sua escolha dentro de uma infraestrutura AWS<br/>
 6. Será necessário que a Lambda consiga consultar, deletar e atualizar um funcionário e que ele esteja acessível via internet.<br/>
 7. Os recursos podem ser provisionados por serveless framework ou terraform.
 8. Realizar testes unitário com JEST.

 ### Requisitos instalação

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) ou [npm](https://www.npmjs.com/)

**Siga os passos a seguir**

```bash
# Clone o projeto e acesse a pasta
$ git clone https://github.com/luanfj/serverless-challenge-stefanini.git && cd serverless-challenge-stefanini

# Instale as dependências
$ yarn
# ou
$ npm install

# Para realizar os testes unitários
$ yarn test
# ou
$ npm run test

# Para pdoer utilizar a CLI do serverless é preciso instalá-lo globalmente
$ npm install -g serverless

# Para subir para a AWS é preciso criar um usuário do IAM
# Saiba mais neste link: https://docs.aws.amazon.com/pt_br/IAM/latest/UserGuide/id_users_create.html#id_users_create_console
# Após criar seu usuário configure sua chave usando
$ serverless config credentials -o --provider aws --key SUA_KEY --secret SUA_SECRET_KEY

# Para finalizar faça o deploy com:
$ serverless deploy
```

### Estrutura do projeto

A estrutura deste projeto não segue à risca o modelo proposto por Uncle Bob [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html), porém se baseia em um modelo um pouco similar.

```
src
 └ users            → Módulo de usuários
    └ controller    → Handlers para as rotas
    └ dtos          → Interfaces Transfer Object para manter o padrão na transferência de dados
    └ interfaces    → Tipagem para objetos dentro do módulo
    └ routes        → Direcionamento das rotas do módulo
    └ services      → Regras de negócio do módulo
    └ tests         → Pasta para testes unitários ou funcionais
  └ utils           → Funções gerais utilizadas em diferentes serviços ou módulos
  └ handler.ts      → Ponto de entrada da aplicação
  └ routes          → Direcionador de rotas gerais (note que temos as rotas específicas de cada módulo e as rotas principais)
```

### Responsabilidades

#### Routes

As rotas possuem a responsabilidade de verificar o formato da solicitação e seus parâmetros e chamar o Controller correspondente repassando a solicitação recebida.

#### Controllers

Os controllers, por sua vez, possui a responsabilidade de extrair os parâmetros da solicitação, fazer o contato com o Service específico desta solicitação e retornar uma resposta que será enviada ao usuário.

#### Services

Os services são responsáveis pelas regras de negócio e por fazer a comunicação com o Banco de Dados e retornar um resultado (ou não) ao Controller.

Por ser um projeto relativamente simples (em termos de regras de negócio) não vi a necessidade de separar as tarefas dos services, porém para uma estrutura mais "Clean", os services poderiam cuidar apenas das regras de negócio, enquanto um diretório chamado "Repository" poderia ser responsável por gerenciar os dados no banco de dados
