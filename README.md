# Flugo – Sistema de Cadastro de Colaboradores

Aplicação desenvolvida como parte de um **Desafio**, com foco na criação de um sistema moderno de cadastro e gerenciamento de colaboradores, utilizando formulário multi-step, persistência em tempo real e uma interface alinhada a um produto real.

---

## 📋 Índice

- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Funcionalidades](#-funcionalidades)
- [Formulário Multi-step](#-formulário-multi-step)
- [Credenciais de Teste](#-credenciais-de-teste)
- [Configuração do Firebase](#-configuração-do-firebase)
- [Instalação e Execução](#️-instalação-e-execução)
- [UI/UX](#-uiux)
- [Arquitetura](#️-arquitetura)
- [Acesso Online](#-acesso-online)
- [Observações Finais](#-observações-finais)
- [Autor](#-autor)

---

## 🧩 Tecnologias Utilizadas

- **[React](https://reactjs.org/)** com **[Vite](https://vitejs.dev/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Material UI (MUI)](https://mui.com/)**
- **[Firebase](https://firebase.google.com/)**
  - **Authentication** - Autenticação de usuários
  - **Firestore** - Banco de dados em tempo real
- **[Yarn](https://yarnpkg.com/)**

---

## ✨ Funcionalidades

- ✅ Autenticação de usuários
- ✅ Rotas protegidas
- ✅ Gerenciamento de colaboradores (CRUD completo)
  - Criar colaborador (formulário multi-step)
  - Editar colaborador
  - Ativar / Inativar colaborador (soft delete)
- ✅ Validação de e-mail único (não permite duplicidade de colaboradores)
- ✅ Sincronização em tempo real com Firestore (`onSnapshot`)
- ✅ Tema global customizado com identidade visual
- ✅ Feedback visual (loading e snackbar)
- ✅ Sidebar com navegação e estado ativo
- ✅ Tela inicial com estado vazio (hero)

---

## 🧭 Formulário Multi-step

O cadastro de colaboradores foi implementado utilizando um **formulário multi-step**, conforme solicitado no desafio, utilizando o **Stepper do Material UI**.

### Etapas do cadastro:

#### 1️⃣ Informações Básicas

- Nome
- E-mail
- Status (ativo/inativo)

#### 2️⃣ Informações Profissionais

- Departamento

### Regras aplicadas:

- ✔️ Todos os campos são obrigatórios
- ✔️ Validação por etapa
- ✔️ Não é possível avançar sem preencher corretamente
- ✔️ Feedback visual entre as etapas

---

## 🔐 Credenciais de Teste

Para facilitar a avaliação, foi criado um usuário de teste que permite acessar e testar todas as funcionalidades do sistema (CRUD completo).

```
Email: teste@flugo.com
Senha: @Flugo123
```

---

## 🔥 Configuração do Firebase

Para rodar o projeto localmente, crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

> ⚠️ **Nota de Segurança:** As credenciais reais estão configuradas apenas no ambiente de produção (Vercel). Para rodar localmente, utilize suas próprias credenciais do Firebase.

---

## ⚙️ Instalação e Execução

### Pré-requisitos

- Node.js 18+ instalado
- Yarn instalado

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/gkramerdev/employee-register.git
cd employee-register
```

### 2️⃣ Instalar as dependências

```bash
yarn install
```

### 3️⃣ Configurar variáveis de ambiente

Crie o arquivo `.env` conforme indicado na [seção de configuração do Firebase](#-configuração-do-firebase).

### 4️⃣ Iniciar o servidor de desenvolvimento

```bash
yarn dev
```

A aplicação estará disponível em:

```
http://localhost:5173
```

---

## 🎨 UI/UX

- 🎯 Interface construída com Material UI
- 🎨 Tema global customizado com identidade visual da aplicação
- 📱 Layout limpo, moderno e responsivo
- ✨ Componentes alinhados ao protótipo fornecido
- 💡 Experiência focada em clareza, usabilidade e feedback visual

---

## 🏗️ Arquitetura

O projeto foi estruturado seguindo boas práticas de organização:

- `pages/` – Telas principais da aplicação
- `components/` – Componentes reutilizáveis
- `services/` – Camada de acesso ao Firebase (Firestore)
- `hooks/` – Hooks customizados (ex: useSnackbar)
- `routes/` – Configuração de rotas protegidas
- `theme/` – Configuração de tema global do MUI

A separação por responsabilidades facilita manutenção, escalabilidade e legibilidade do código.

---

## 🌐 Acesso Online

**Aplicação disponível em:** [https://flugo-register-employee.vercel.app](https://flugo-register-employee.vercel.app)

> 💡 Para testar rapidamente, acesse o link acima. Para rodar localmente e avaliar o código, siga as instruções de instalação.

---

## 📌 Observações Finais

- 📝 Este projeto foi desenvolvido exclusivamente para fins de avaliação técnica
- 🏗️ O foco foi em arquitetura limpa, UX consistente e comportamento próximo de um produto real
- 🗑️ O sistema utiliza **soft delete**, permitindo ativar e inativar colaboradores sem remoção definitiva do banco de dados
- ⚡ Sincronização em tempo real garante que mudanças sejam refletidas instantaneamente
- 🔒 Rotas protegidas garantem acesso apenas a usuários autenticados

---

## 👨‍💻 Autor

**Desenvolvido por Giancarlo Kramer**

---
