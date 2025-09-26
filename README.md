# Versus - Monorepo Laravel + Next.js

---

## Tecnologias Utilizadas

### Backend
- **Laravel 10**: Framework PHP para o desenvolvimento da API.
- **PostgreSQL**: Banco de dados relacional.
- **Laravel Queue**: Gerenciamento de filas para processamento de tarefas em segundo plano.

### Frontend
- **Next.js 15**: Framework React para o frontend, oferecendo SSR e SSG.
- **TailwindCSS**: Framework de CSS para estilização rápida e flexível.

---

## Pré-requisitos

Para rodar este projeto localmente, você precisa ter instalado:

- **Docker** (versão 24.x ou superior)
- **Docker Compose** (versão 2.x ou superior)
- **Node.js** (versão 18 ou superior) *(Opcional: necessário apenas para rodar o frontend fora do container)*
- **Composer** *(Opcional: necessário apenas para rodar o backend fora do container)*

---

## Estrutura do Repositório

```
/
├── backend/            # Backend em Laravel 10
├── frontend/           # Frontend em Next.js 15
└── docker-compose.yml  # Arquivo de orquestração do Docker
```

---

## ▶️ Como Rodar o Projeto Localmente com Docker

1. **Clone o repositório:**

```bash
git clone https://github.com/MarcelloMonteiro/versus.git
cd versus
```

2. **Configure as variáveis de ambiente:**

- **Backend:** Copie o arquivo `.env.example` para `.env` na pasta `/backend` e configure as variáveis se necessário.

3. **Suba os contêineres:**

```bash
docker-compose up -d --build
```

Este comando executará as seguintes ações:

- Instalará as dependências do backend e do frontend.
- Criará os contêineres: **backend (Laravel + PHP-FPM)**, **frontend (Next.js)** e **db (PostgreSQL)**.
- Rodará as migrations do banco de dados automaticamente.
- Iniciará o worker da fila.

4. **Verifique os logs (opcional):**

```bash
docker-compose logs -f
```

---

## Acessando a Aplicação

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:8000/api](http://localhost:8000/api)

---

