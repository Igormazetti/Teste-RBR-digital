# Teste RBR Digital

Este projeto é constituído por uma API (pasta backend) feita com Typescript, NodeJs, Express, MongoDb e Mongoose, o qual busca, cadastra, altera e deleta dados dos funcionários, e pelo frontend da aplicação (pasta frontend), feito com Typescript, NextJs e ChakraUi, o qual apresenta uma tabela ao usuário com as informações dos funcionários, com opções para adicionar, editar ou remover algum funcionário.

## Requisitos para rodar o projeto

- [Node LTS](https://nodejs.org/en)
  - Usando [`nvm`](https://github.com/nvm-sh/nvm)
    - `nvm install`
    - `nvm use`
- [Yarn 1.x](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) (Opcional)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Como rodar na minha máquina?

- Clone o projeto `git clone https://github.com/Igormazetti/Teste-RBR-digital.git`
- Ou clone o projeto com SSH `git clone git@github.com:Igormazetti/Teste-RBR-digital.git`

#### Backend

- Abra um terminal mo projeto e navegue até a pasta backend `cd backend`, ou clique com o botão direito em cima da pasta "backend" e selecione "Abrir no terminal Integrado"
- Rode `yarn` ou `npm i` para instalar os pacotes do projeto.
- Rode `yarn dev` ou `npm run dev`
- Pronto 🎉

#### Frontend

- Abra um terminal mo projeto e navegue até a pasta frontend `cd frontend`, ou clique com o botão direito em cima da pasta "frontend" e selecione "Abrir no terminal Integrado"
- Rode `yarn` ou `npm i` para instalar os pacotes do projeto.
- Rode `yarn dev` ou `npm run dev`
- Pronto 🎉

### Estrutura do projeto

#### Backend

- `./src`: Pasta contendo o principal conteúdo do projeto;
- `./.eslintrc.json`: Arquivo contendo as configurações o es-lint;
- `./.prettierrc`: Arquivo contendo as configurações do Prettier;
- `./src/common`: Pasta para incluir serviços que podem ser utilizados pela aplicação toda;
- `./src/common/error/CustomError.ts`: Serviço de captura de erro, utilizado para retornar os erros de forma simples. Este serviço recebe dois parâmetros, uma função e um código http, exemplo: ` throw new CustomError('Funcionário já cadastrado!', 422);`;
- `./src/middleware`: Pasta que contém os middlewares utilizados na aplicação. No caso em tela utilizei somente um middleware de interceptação de erro, para que o CustomError seja utilizado na aplicação corretamente;
- `./src/app.ts`: Arquivo com a configuração do express e conexão com o banco de dados MongoDB, utilizando mongoose.
- `./src/server.ts`: Arquivo que configura a porta e inicia o servidor. Não foram utilizadas variáveis de ambiente no projeto.
- `./src/modules`: Pasta que contém módulos de cada entidade existente no banco de dados. Cada módulo possui as camadas "models" que cria o schema daquela entidade no banco de dados, "repositories" que realiza as chamadas ao banco de dados, "services" que trata as regras de negócio e lida com caso de erros, "controllers" que são responsáveis por receber as requisições HTTP e retornar o resultado na requisição, e por fim "routes" onde são definidas as rotas e seus respectivos controllers.

#### Frontend

- `./app`: É a pasta onde ficam guardadas as páginas principais do projeto;
- `./app/page.tsx`: É a página principal do projeto, qual utiliza React-Query e Axios para buscar os dados dos funcionários e renderizá-los no componente de tabela;
- `./app/layout.tsx`: É o arquivo do Next.js define a estrutura básica, estilos globais e metadados aplicados a todas as páginas do aplicativo, garantindo consistência visual e funcional;
- `./app/providers.tsx`: É o arquivo onde coloco todos os providers da aplicação, para depois no arquivo layout, somente utilizar a tag `<Providers>` em volta da minha aplicação, deixando o código mais limpo;
- `./app/employees/[...actions]`: É a pasta contendo a página de adição e editão de funcionários;
- `./app/employees/[...actions]/page.tsx`: É a página para adicionar ou editar funcionários, ela funciona via server side, o que garante uma melhor performance ao código. A página valida os parâmetros da rota, caso seja "edit", ela irá buscar os dados do funcionário pelo id passado também nos parâmetros da rota, e renderizar o componente `<EmployeesForm` com os dados da requisição;
- `./app/employees/[...actions]/components/EmployeesForm.tsx`: Componente contendo o formulário dos funcionários, que de acordo com a ação indicada nos parâmetros da rota será um formulário para adicionar ou editar um funcionário. Caso seja editar, o formulário iniciará com os dados do funcionário preenchidos;
- `./libs/react-query/queryClient.ts`: Arquivo que instancia o react-query para utilizar no projeto;
- `./components`: Pasta para armazenar componentes que podem ser reutilizados no projeto;
- `<ButtonComponent>`: A ideia do componente de botão é tematizar melhor o projeto, para que ele possa servir como um adapter para qualquer padronização de design;
- `<Dialog>`: Componente de Modal que visa padronizar os tipos de modais que possam existir no projeto;
- `<EmployeesCard`: Componente de display dos dados de cada funcionário, somente renderizados no tamanho mobile, o qual deve receber como parãmetro as propriedades: "employee", "handleEdit" e "handleDelete", sendo a primeira os dados do funcionário daquele card, a segunda a função de editar o funcionário e por fim a função de excluir;
- `<EmployeesTable`: Componente de tabela que recebe como props "employees", sendo um array de dados dos funcionários, e "refetch", sendo uma função para atualizar a requisição dos dados. Neste componente contém a função 'handleRemoveEmployee' que realiza a deleção de um funcionário. Além disso, contém um input de busca que filtra os dados na tabela de acordo com o que foi digitado. Por fim, o campo "Nome" na tabela, funciona como uma ordenação em ordem alfabética ao clicar;
- `./utils`: Pasta contendo arquivos que podem ser utilizados na aplicação, tais como funções para formatar datas.
