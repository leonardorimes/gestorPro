# GestorPro

Sistema **full stack multiusuário** de gestão de clientes, serviços e ordens de serviço — Next.js 16 (App Router + TypeScript) + Prisma + PostgreSQL. Autenticação JWT + bcrypt, dashboard com métricas e CRUD completo com isolamento de dados por usuário.

🔗 **Deploy:** [gestorpro.leonardorimes.dev](https://gestorpro.leonardorimes.dev)

## Funcionalidades

| Módulo | O que faz | Status |
|---|---|:-:|
| **Autenticação** `/login` `/entrar` | JWT + bcrypt: login, criação de conta, sessão com HttpOnly cookie, middleware de proteção de rotas | ✅ |
| **Dashboard** `/` | KPIs de ordens de serviço (abertas, em andamento, finalizadas, canceladas), totais de clientes (PF/PJ, ativos), faturamento total, faturamento do mês, ticket médio, gráfico de distribuição de clientes | ✅ |
| **Clientes** `/client` | CRUD completo: criar, listar, editar, excluir. Suporte a Pessoa Física e Jurídica, validação de unicidade por usuário (e-mail, documento) | ✅ |
| **Serviços** `/service` | CRUD completo: criar, listar, editar, excluir. Nome único por usuário, preço decimal, tipo de serviço | ✅ |
| **Ordens de Serviço** `/serviceorder` | CRUD completo: criar, listar, editar, excluir. Estados (OPEN, IN_PROGRESS, COMPLETED, CANCELED), relacionamento com cliente e serviço, datas de início/fim | ✅ |
| **Isolamento de dados** | Row-Level Security via userId: cada usuário só acessa seus próprios dados (clientes, serviços, ordens) | ✅ |

### Proteção de rotas

Páginas protegidas verificam a sessão JWT via middleware. Usuários não autenticados são redirecionados automaticamente para `/login`.

## Stack

- **Frontend:** [Next.js 16](https://nextjs.org/) (App Router), [React 19](https://react.dev/), [TypeScript 5](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Backend:** Next.js Server Actions, [Prisma 6](https://www.prisma.io/) (ORM)
- **Banco de dados:** [PostgreSQL](https://www.postgresql.org/)
- **Autenticação:** JWT ([jose](https://github.com/panva/jose)), [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- **Deploy:** [Vercel](https://vercel.com/)

## Capturas de tela

### Login

<img src="docs/screenshots/gestorpro-login.png" alt="Tela de login" width="800" />

### Dashboard

> 📷 Em breve

## Setup local

### 1. Clonar o repositório

```bash
git clone https://github.com/leonardorimes/gestorpro.git
cd gestorpro
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Copie o arquivo `.env.example` para `.env` e preencha com suas credenciais:

```bash
cp .env.example .env
```

Variáveis necessárias:

| Variável | Descrição | Exemplo |
|---|---|---|
| `DATABASE_URL` | URL de conexão do PostgreSQL | `postgresql://user:password@localhost:5432/gestorpro` |
| `JWT_SECRET` | Chave secreta para assinar tokens JWT (mínimo 32 caracteres) | `seu-secret-super-seguro-aqui` |

> ⚠️ **Atenção:** Nunca commite o arquivo `.env` com credenciais reais. Use valores fortes em produção.

### 4. Rodar migrações do banco

```bash
npx prisma migrate dev
```

Isso criará as tabelas `users`, `clients`, `services` e `service_orders` no banco PostgreSQL.

### 5. Gerar o Prisma Client

```bash
npx prisma generate
```

### 6. Rodar o projeto

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) e crie sua conta em `/login`.

## Scripts disponíveis

| Script | Comando | Descrição |
|---|---|---|
| Desenvolvimento | `npm run dev` | Inicia o servidor Next.js em modo desenvolvimento (porta 3000) |
| Build | `npm run build` | Gera o Prisma Client e compila o projeto para produção |
| Produção | `npm start` | Inicia o servidor Next.js em modo produção (após `build`) |
| Lint | `npm run lint` | Executa o ESLint para verificar padrões de código |
| Prisma Studio | `npx prisma studio` | Abre interface visual para explorar o banco de dados |

## Deploy na Vercel

O projeto é um app Next.js padrão — a Vercel detecta tudo sozinha. Nenhuma configuração extra é necessária (`vercel.json` não existe).

### 1. Importar o repositório

1. [vercel.com/new](https://vercel.com/new) → **Import Git Repository** → `leonardorimes/gestorpro`.
2. **Framework Preset**: Next.js (automático). Root Directory: `./`.
3. **Deploy**. Sem variáveis de ambiente, o build falhará — configure as variáveis no próximo passo.

### 2. Configurar variáveis de ambiente

Em **Project → Settings → Environment Variables**, adicionar (marcar Production, Preview, Development):

| Variável | Valor |
|---|---|
| `DATABASE_URL` | URL do seu banco PostgreSQL (Supabase, Neon, Railway, etc.) |
| `JWT_SECRET` | Chave secreta forte (gere com `openssl rand -base64 32`) |

Depois de salvar, **Deployments → menu ⋯ → Redeploy** para o novo build pegar as variáveis.

### 3. Rodar migrações no banco de produção

Com o `DATABASE_URL` de produção configurado no `.env`:

```bash
npx prisma migrate deploy
```

### 4. Deploys automáticos

Todo `git push` na branch `main` gera um deploy de produção; qualquer outra branch / PR gera um Preview com URL própria.

## Estrutura do projeto

```
prisma/
  schema.prisma            # Modelos User, Client, Service, ServiceOrder
  migrations/              # Histórico de migrações do banco

app/
  (rotas protegidas)
    page.tsx               # Dashboard (métricas, ações rápidas)
    client/                # CRUD de clientes
      page.tsx             # Criar cliente
      listar/page.tsx      # Listar clientes
      editar/[id]/page.tsx # Editar cliente
      components/          # Formulários e modais
    service/               # CRUD de serviços
      page.tsx
      listar/page.tsx
      editar/[id]/page.tsx
      components/
    serviceorder/          # CRUD de ordens de serviço
      page.tsx
      listar/page.tsx
      editar/[id]/page.tsx
      components/
    _components/           # Componentes compartilhados (MetricCard, etc.)
  (rotas públicas)
    login/page.tsx         # Login
    entrar/page.tsx        # Criar conta
  actions/
    auth.ts                # registerUser, loginUser, encrypt, decrypt
    client.ts              # CRUD de clientes (Server Actions)
    service.ts             # CRUD de serviços + métricas (Server Actions)
  types/
    ClientTypes.ts
    ServiceTypes.ts
  layout.tsx               # Layout global
  globals.css              # Estilos Tailwind

lib/
  auth-server.ts           # getCurrentUser (verificação JWT)
  auth-client.ts           # Utilitários de autenticação client-side
  prisma.ts                # Instância do Prisma Client

.env.example               # Template de variáveis de ambiente
```

## Schema do banco (Prisma)

### User

Usuário do sistema. Cada usuário tem seus próprios clientes, serviços e ordens.

| Campo | Tipo | Restrições |
|---|---|---|
| id | UUID | PK, auto-gerado |
| email | String | Único |
| username | String | — |
| password | String | Hashed com bcrypt |
| createdAt | DateTime | Auto |

### Client

Cliente (Pessoa Física ou Jurídica) pertencente a um usuário.

| Campo | Tipo | Restrições |
|---|---|---|
| id | UUID | PK, auto-gerado |
| name | String | — |
| email | String | Único por userId |
| tipo | TipoPessoa | FISICA ou JURIDICA |
| documento | String | CPF/CNPJ, único por userId |
| isActive | Boolean | Padrão: true |
| userId | UUID | FK → User |
| createdAt | DateTime | Auto |
| updatedAt | DateTime | Auto |

### Service

Serviço oferecido pelo usuário.

| Campo | Tipo | Restrições |
|---|---|---|
| id | UUID | PK, auto-gerado |
| name | String | Único por userId |
| description | String? | — |
| serviceType | String | Tipo do serviço |
| price | Decimal | Preço (10,2) |
| isActive | Boolean | Padrão: true |
| userId | UUID | FK → User |
| createdAt | DateTime | Auto |
| updatedAt | DateTime | Auto |

### ServiceOrder

Ordem de serviço vinculando cliente e serviço.

| Campo | Tipo | Restrições |
|---|---|---|
| id | UUID | PK, auto-gerado |
| userId | UUID | FK → User |
| clientId | UUID | FK → Client |
| serviceId | UUID | FK → Service |
| serviceName | String | Cache do nome do serviço |
| servicePrice | Decimal | Cache do preço do serviço |
| status | ServiceOrderStatus | OPEN, IN_PROGRESS, COMPLETED, CANCELED |
| startedAt | DateTime? | — |
| finishedAt | DateTime? | — |
| createdAt | DateTime | Auto |
| updatedAt | DateTime | Auto |

## Autor

Desenvolvido por **Leonardo Rimes** — desenvolvedor full stack júnior.

- 🐙 GitHub: [@leonardorimes](https://github.com/leonardorimes)
- 💼 LinkedIn: [TODO]
- 📧 E-mail: [TODO]

---

Projeto desenvolvido com foco em boas práticas de desenvolvimento full stack, arquitetura escalável e experiência do usuário.
