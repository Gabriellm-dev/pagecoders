### API

Esta API permite gerenciar usuários, livros, empréstimos e classificações em uma biblioteca.

## Pré-requisitos

- Node.js
- PostgreSQL

## Passo a Passo para Configuração

### 1. Clonar o Repositório

```bash
git clone https://github.com/Gabriellm-dev/pagecoders.git
cd seu-repositorio
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e configure as seguintes variáveis:

```
DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
JWT_SECRET=sua_chave_secreta
```

Certifique-se de substituir `usuario`, `senha`, `localhost`, `5432` e `nome_do_banco` pelos valores corretos do seu banco de dados PostgreSQL. A chave `JWT_SECRET` deve ser uma string segura para assinatura dos tokens JWT.

### 4. Executar Migrações do Prisma

```bash
npx prisma migrate deploy
```

### 5. Rodar o Servidor

```bash
npm start
```

O servidor estará rodando em `http://localhost:3000`.

## Testando a API

Você pode testar a API utilizando ferramentas como Postman, Insomnia ou Thunder Client. Abaixo estão exemplos de requisições para cada endpoint.

### Endpoints

#### 1. Registro de Fulano

- **Método**: POST
- **URL**: `http://localhost:3000/auth/register`
- **Body**: JSON

```json
{
  "cpf": "12345678955",
  "email": "fulano@gmail.com",
  "senha": "senha123456",
  "nome": "Fulano",
  "rua": "Avenida Getúlio Vargas",
  "numero": 159,
  "bairro": "Vila Rubim",
  "cidade": "Vitória",
  "estado": "ES",
  "cep": "29025-230"
}
```

#### 2. Registro de Ciclano

- **Método**: POST
- **URL**: `http://localhost:3000/auth/register`
- **Body**: JSON

```json
{
  "cpf": "12345678900",
  "email": "ciclano@gmail.com",
  "senha": "abc123456",
  "nome": "Ciclano",
  "rua": "Escadaria Manjoli Antônio de Barros ",
  "numero": 170,
  "bairro": "São Benedito",
  "cidade": "Vitória",
  "estado": "ES",
  "cep": "29047-839"
}
```

#### 3. Login de Usuário Fulano (Vai gerar um TOKEN, copie para utilizar os outros ENDPOINTS)

- **Método**: POST
- **URL**: `http://localhost:3000/auth/login`
- **Body**: JSON

```json
{
  "email": "fulano@gmail.com",
  "senha": "senha123456"
}
```

#### 4. Registro de Livro de Fulano

- **Método**: POST
- **URL**: `http://localhost:3000/books`
- **Headers**: Authorization: `Bearer <token>`
- **Body**: JSON

```json
{
  "fkUserCpf": "12345678955",
  "name": "Pride and Prejudice",
  "publisher": "T. Egerton, Whitehall",
  "publicationDate": "1813-01-28",
  "editionNumber": 1,
  "authors": "Jane Austen",
  "genre": "Romance"
}
```

#### 5. Login de Usuário Ciclano (Vai gerar um TOKEN, copie para utilizar os outros ENDPOINTS)

- **Método**: POST
- **URL**: `http://localhost:3000/auth/login`
- **Body**: JSON

```json
{
  "email": "ciclano@gmail.com",
  "senha": "abc123456"
}
```

#### 6. Listagem de Livros (Ciclano visualiza um livro disponível e quer pegar emprestado)

- **Método**: GET
- **URL**: `http://localhost:3000/books`
- **Headers**: Authorization: `Bearer <token>`

#### 7. Solicitação de Empréstimo (Ciclano solicita o empréstimo do livro para Fulano)

- **Método**: POST
- **URL**: `http://localhost:3000/loans`
- **Headers**: Authorization: `Bearer <token>`
- **Body**: JSON

```json
{
  "userCpf": "12345678900",
  "bookCode": 1
}
```

#### 8. Listagem de Empréstimos

- **Método**: GET
- **URL**: `http://localhost:3000/loans`
- **Headers**: Authorization: `Bearer <token>`

#### 9. Autorização de Empréstimo (Fulano autoriza o empréstimo do livro para Ciclano)

- **Método**: PUT
- **URL****: `http://localhost:3000/loans/authorize/:loanId`
- **Headers**: Authorization: `Bearer <token>`

#### 10. Devolução de Livro (Ciclano devolve o livro para Fulano)

- **Método**: PUT
- **URL**: `http://localhost:3000/loans/return/:loanId`
- **Headers**: Authorization: `Bearer <token>`

#### 11. Classificação de Empréstimo (Ciclano faz a avaliação do empréstimo)

- **Método**: POST
- **URL**: `http://localhost:3000/loans/rate/:loanId`
- **Headers**: Authorization: `Bearer <token>`
- **Body**: JSON

```json
{
  "loanId": 1,
  "bookRating": 5,
  "userRating": 5,
  "comment": "Great book!"
}
```

#### 12. Registro de Classificação (Ciclano faz a avaliação da classificação)

- **Método**: POST
- **URL**: `http://localhost:3000/ratings`
- **Headers**: Authorization: `Bearer <token>`
- **Body**: JSON

```json
{
  "loanId": 1,
  "bookRating": 5,
  "userRating": 5,
  "comment": "Great book!"
}
```

#### 13. Atualização de Classificação

- **Método**: PUT
- **URL**: `http://localhost:3000/ratings/:ratingId`
- **Headers**: Authorization: `Bearer <token>`
- **Body**: JSON

```json
{
  "bookRating": 4,
  "userRating": 4,
  "comment": "Good book!"
}
```

#### 14. Exclusão de Classificação

- **Método**: DELETE
- **URL**: `http://localhost:3000/ratings/:ratingId`
- **Headers**: Authorization: `Bearer <token>`

#### 15. Listagem de Classificações

- **Método**: GET
- **URL**: `http://localhost:3000/ratings`
- **Headers**: Authorization: `Bearer <token>`

---

### Observação

Lembre-se de substituir `<token>` pelo token JWT obtido após o login. Certifique-se de que a URL e os parâmetros estejam corretos para cada endpoint.
