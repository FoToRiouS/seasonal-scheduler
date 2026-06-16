# 📅 Seasonal Scheduler (Anime Scheduler) 🌟

Seja bem-vindo ao **Seasonal Scheduler**! Este é um sistema completo e containerizado projetado para catalogar, agendar e acompanhar lançamentos de animes por temporada. Ele se integra diretamente com a API do **MyAnimeList** 🌸 e possui um bot do **Telegram** 🤖 para manter você atualizado com notificações de novos episódios!

---

## 🚀 Arquitetura do Projeto

O projeto é dividido em múltiplos microsserviços integrados de forma transparente via **Docker Compose**:

*   **🖥️ Frontend (`scheduler-front-next`)**: Desenvolvido em **Next.js** (TypeScript/React) com suporte nativo a rotas de autenticação, perfil de usuário, calendários de lançamentos e listas personalizadas.
*   **⚙️ Backend (`scheduler-back`)**: Uma API robusta em **Spring Boot** (Java 24) construída com Maven, gerenciando controle de acesso por JWT, integrações externas (MyAnimeList & Telegram) e migrações de banco de dados via **Flyway**.
*   **🌐 Nginx (`nginx`)**: Atua como Proxy Reverso direcionando o tráfego HTTP/HTTPS, além de gerenciar a validação SSL e encaminhamento de webhooks para o Telegram.
*   **🗄️ Database (`db`)**: Instância do **MySQL 8.1** com persistência de dados.
*   **⚡ Cache & Session (`redis`)**: Instância do **Redis** para caching rápido e gestão de sessões.

---

## 🛠️ Tecnologias Utilizadas

### Frontend 📱
*   **Next.js 15** (App Router)
*   **React** & **TypeScript**
*   **Pnpm** (Gerenciador de pacotes)

### Backend ☕
*   **Java 24** & **Spring Boot**
*   **Spring Data JPA** & **Hibernate**
*   **Spring Security** & **JWT**
*   **Flyway** (Migrations)
*   **MapStruct** & **Maven**

### Infraestrutura 🐳
*   **Docker** & **Docker Compose**
*   **Nginx** (Proxy Reverso & SSL)
*   **MySQL 8.1**
*   **Redis**

---

## 📋 Pré-requisitos

Para rodar este projeto localmente ou em produção, você precisará ter instalado:
*   [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) 🐳
*   [Pnpm](https://pnpm.io/) (caso queira rodar o frontend fora do Docker) 📦
*   [Java 24](https://adoptium.net/) & [Maven](https://maven.apache.org/) (caso queira rodar o backend fora do Docker) ☕

---

## ⚙️ Configuração e Execução

### 1. Clonar o Repositório 📂
```bash
git clone https://github.com/usuario/seasonal-scheduler.git
cd seasonal-scheduler
```

### 2. Configurar Variáveis de Ambiente 🔑
Crie um arquivo `.env` na raiz do projeto (ou utilize variáveis de ambiente no seu host) para definir as credenciais do banco de dados e chaves de APIs:
```env
MYSQL_USER=seu_usuario
MYSQL_PASSWORD=sua_senha
# Adicione outras variáveis necessárias para o Spring Boot e Next.js
```

### 3. Iniciar a Aplicação com Docker 🐳
Para subir todos os serviços de uma só vez (Banco de dados, Redis, Backend, Frontend e Nginx):
```bash
docker compose up -d --build
```
Após o build e inicialização dos containers:
*   O **Frontend** estará acessível em `http://localhost` (ou no domínio configurado).
*   O **Backend** estará disponível internamente e os webhooks do Telegram responderão na rota `/telegram/update`.

---

## 🔒 Segurança e SSL (HTTPS) 🔑

Para configurar certificados SSL gratuitos (Let's Encrypt) com renovação automática no ambiente Docker, consulte o nosso guia detalhado passo a passo:

👉 **[HOWTO-SSL.md](HOWTO-SSL.md)** 👈

---

## 📁 Estrutura de Pastas

*   `./scheduler-front-next` 💻: Código-fonte do frontend em Next.js.
*   `./scheduler-back` ☕: Código-fonte da API em Spring Boot.
*   `./nginx` 🌐: Arquivos de configuração do servidor Nginx.
*   `./docker-compose.yaml` 🐳: Orquestração de todos os containers.
*   `./HOWTO-SSL.md` 🔒: Guia de instalação e renovação de certificados SSL.

---

## 👥 Contribuição

Fique à vontade para abrir Issues ou enviar Pull Requests! Toda contribuição é super bem-vinda para tornar o agendador de animes ainda melhor! 🚀

---

## 📄 Licença

Este projeto está sob a licença correspondente do repositório. Consulte o autor para mais detalhes. 😉

---
Feito com 💖 para os amantes de animes! 🍿🎬
