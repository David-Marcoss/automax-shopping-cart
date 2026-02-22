# automax-shopping-cart

Uma aplicação web para consultar os carrinhos de compras provenientes de um sistema externo de e-commerce.

---

## Arquitetura da Aplicação

A aplicação segue o padrão cliente-servidor:

- **Front-end** → Interface da aplicação  
- **Back-end** → API responsável pelas regras de negócio  
- **Banco de Dados (SQLite)** → Persistência dos dados  

---

## Tecnologias Utilizadas

### Infraestrutura
- Docker
- Docker Compose

### Front-end
- React
- TailwindCSS
- Shadcn

### Back-end
- TypeScript
- Express.js
- Prisma

### Banco de Dados
- SQLite

---

# Executando o Projeto

## 1️⃣ Clonando o Repositório

```bash
git clone https://github.com/David-Marcoss/automax-shopping-cart.git
cd automax-shopping-cart
```

---

# 🔹 Executando com Docker (Recomendado)

```bash
docker compose up --build
```

### Acessos

Front-end:
```
http://localhost:5173
```

API:
```
http://localhost:3000
```

---

# 🔹 Executando SEM Docker

Caso prefira rodar localmente sem Docker, siga os passos abaixo.

---

## 📌 Pré-requisitos

- Node.js 18+
- NPM ou Yarn

---

## 🔧 1. Configurando variáveis de ambiente

### Back-end

Acesse a pasta:

```bash
cd back-end
```

Crie um arquivo `.env` na raiz da pasta e copie o conteúdo do:

```
.env.example
```

---

### Front-end

Acesse a pasta:

```bash
cd front-end
```

Crie um arquivo `.env` na raiz da pasta e copie o conteúdo do:

```
.env.example
```

---

## 🗄 2. Instalando dependências e configurando o banco (Back-end)

Dentro da pasta `back-end`:

```bash
npm install
```

Gerar o Prisma Client:

```bash
npm run prisma:generate
```

Aplicar as migrations:

```bash
npm run migrate:dev
```

Iniciar o servidor:

```bash
npm run dev
```

A API estará disponível em:

```
http://localhost:3000
```

---

## 🎨 3. Instalando dependências e iniciando o Front-end

Em outro terminal, dentro da pasta `front-end`:

```bash
npm install
npm run dev
```

A aplicação estará disponível em:

```
http://localhost:5173
```

---

# 🧪 Executando os Testes

Dentro da pasta `back-end`:

```bash
npm run test
```

---

# 📌 Observações

- O banco SQLite será criado automaticamente como `dev.db` na pasta do back-end.
- Certifique-se de que a API esteja rodando antes de acessar o front-end.
- Caso altere o schema do Prisma, execute novamente:

```bash
npm run migrate:dev
```