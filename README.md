## 1. O que é o projeto?

Este projeto é um **gestor de usuários** (painel administrativo) que permite:

- **Listar usuários** em uma tabela com paginação, ordenação e busca por nome.  
- **Criar novos usuários** com nome e e‑mail.  
- **Editar usuários existentes**.  
- **Ativar/Inativar usuários** através de um switch de status.  
- **Excluir usuários** com diálogo de confirmação.  
- **Gerenciar usuário logado** via contexto global (`CurrentUserContext`), com ações de login/logoff simuladas.

É um frontend SPA (Single Page Application) focado em CRUD de usuários.

---

## 2. Tecnologias principais e como são usadas

- **React 19 + TypeScript**  
  Usados para construir toda a interface e a lógica de componentes.  
  Exemplos:
  - `src/pages/UserListPage.tsx` – lista e filtra usuários.  
  - `src/pages/UserCreatePage.tsx` – formulário de criação.  
  - `src/pages/UserEditPage.tsx` – formulário de edição.

- **Vite**  
  Ferramenta de build e dev server.  
  Scripts em `package.json`:
  - `npm run dev` → sobe o servidor de desenvolvimento.  
  - `npm run build` → gera o build de produção (`dist/`).  
  - `npm run preview` → serve o build para teste local.

- **React Router (`react-router-dom`)**  
  Responsável pelas rotas da aplicação (definidas em `src/App.tsx`):
  - `/` → `UserListPage`  
  - `/create` → `UserCreatePage`  
  - `/edit/:id` → `UserEditPage`

- **Material UI (MUI) + MUI Data Grid**  
  Usados para layout e componentes visuais:
  - Botões, `Paper`, `TextField`, `Snackbar`, `Alert`, `Switch` (`@mui/material`).  
  - Tabela de usuários com paginação e ordenação (`@mui/x-data-grid`).

- **Context API (CurrentUserContext)**  
  Em `src/context/currentUserContext.tsx`, gerencia:
  - `currentUser` (usuário logado).  
  - `login()` → busca usuário atual via `usersApi.getCurrentUser()` com delay simulado.  
  - `logoff()` → limpa o usuário após delay.

- **MSW (Mock Service Worker)**  
  Permite simular a API de usuários em desenvolvimento.  
  Em `src/main.tsx`, o MSW é habilitado quando a variável `VITE_USE_MOCK` é `"true"`.

- **Jest + Testing Library**  
  Utilizados nos testes unitários e de integração em `src/components/tests/`:
  - Simulam interações do usuário (`userEvent`).  
  - Testam páginas (`UserListPage`, `UserCreatePage`) e o contexto global (`CurrentUserProvider`).

---

## 3. Como instalar Node 20 e npm

### 3.1. Verificar se já existe Node/NPM (Linux e Windows)

```bash
node -v
npm -v
```

Se as versões não aparecerem ou forem antigas, instale o Node 20.

### 3.2. Linux (via Node Version Manager – nvm, recomendado)

1. Instalar o `nvm`:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
```

2. Recarregar o shell:

```bash
source ~/.bashrc
```

3. Instalar e usar o Node 20:

```bash
nvm install 20
nvm use 20
```

4. Conferir versões:

```bash
node -v   # deve mostrar v20.x.x
npm -v
```

> Em outros sistemas operacionais, baixe o instalador oficial em `https://nodejs.org` e escolha a versão LTS mais próxima da 20.

### 3.3. Windows (instalador oficial)

1. Acesse o site oficial do Node:  
   `https://nodejs.org`
2. Baixe o instalador da versão **LTS** mais próxima da 20 (por exemplo, 20.x LTS).  
3. Execute o instalador (`.msi`) e siga o passo a passo padrão, deixando marcada a opção para instalar também o **npm**.  
4. Após a instalação, abra o **Prompt de Comando** ou **PowerShell** e verifique:

```bash
node -v
npm -v
```

Se aparecer uma versão `v20.x.x` para o Node e um número de versão para o npm, está pronto para uso.

---

## 4. Como clonar o projeto

No terminal, escolha a pasta onde quer salvar o projeto e rode:

```bash
git clone <URL_DO_REPOSITORIO>
```
---

## 5. Após o clone do projeto

Depois de clonar (ou copiar a pasta), você terá algo como:

```text
/projetos
  /painel
    package.json
    tsconfig.json
    vite.config.ts (se existir)
    /src
      /pages
      /components
      /context
      ...
```

É dentro da pasta `painel` que todos os comandos (npm) serão executados.

---

## 6. Entrar na pasta do projeto (sem caminho de disco)

A partir do diretório onde o projeto está, você pode usar:

```bash
cd painel
```

ou, se estiver um nível acima:

```bash
cd /painel
```

Depois disso, todos os comandos (`npm install`, `npm run dev`, etc.) rodam dentro da pasta `painel`.

---

## 7. Instalar dependências (npm install)

Com o terminal dentro da pasta `painel`:

```bash
npm install
```

Esse comando:

- Lê o `package.json`.  
- Baixa todas as dependências necessárias (React, Vite, MUI, Jest, Testing Library, etc).  
- Cria a pasta `node_modules`.

---

## 8. Iniciar o projeto (modo desenvolvimento)

Ainda na pasta `painel`, você pode usar **duas opções equivalentes**:

```bash
npm run dev
```

ou simplesmente:

```bash
npm start
```

Ambos os comandos vão:

- Subir um servidor de desenvolvimento (por padrão em `http://localhost:5173` ou `http://localhost:3000`).  
- Mostrar a URL exata no terminal.

Abra o navegador e acesse o endereço que aparecer, por exemplo:

```text
http://localhost:5173
```

### 8.1. Usando a API mockada (MSW)

Se quiser usar as rotas mockadas com **MSW**:

1. Crie um arquivo `.env` na raiz do projeto.  
2. Adicione:

```bash
VITE_USE_MOCK=true
```

Com isso, ao iniciar com `npm run dev`, o MSW será ativado antes de renderizar a aplicação e as chamadas para `usersApi` serão atendidas pelo mock.

---

## 9. Rodar testes unitários e de integração

Para executar os testes:

```bash
npm test
```

Por padrão, o Jest vai:

- Carregar a configuração de ambiente (`jest-environment-jsdom`).  
- Rodar os arquivos `.spec.tsx` e `.spec.ts` em `src/components/tests/`.

Você pode configurar filtros de teste usando opções do Jest (por exemplo, `--watch`, `--runTestsByPath`), se desejar.

---

## 10. Como cada teste funciona (resumo dos principais)

Os testes ficam em `src/components/tests/`. Alguns exemplos:

- **`userListPage.spec.tsx`**  
  - **Objetivo**: garantir que a listagem de usuários funcione.  
  - **Como funciona**:
    - Faz `jest.mock('../../api/users')` para simular a API de usuários.  
    - No teste `deve renderizar a listagem de usuários`:
      - Configura o mock de `usersApi.getAll` para retornar uma lista de usuários (João, Maria).  
      - Renderiza `UserListPage` dentro de um `MemoryRouter`.  
      - Verifica se o título `Usuários` aparece e se os nomes retornados estão na tela.  
    - No teste `deve filtrar usuários pelo nome digitado`:
      - Usa o mesmo mock de lista.  
      - Digita no campo `Pesquisar por nome`.  
      - Verifica se somente o usuário filtrado permanece na tela.

- **`UserCreatePage.integration.spec.tsx`**  
  - **Objetivo**: testar o fluxo de criação de usuário (integração simples da tela com a API mockada).  
  - **Como funciona**:
    - Mocka `usersApi.create`.  
    - Renderiza `UserCreatePage` dentro de `MemoryRouter` na rota `/create`.  
    - Preenche os campos `Nome` e `Email` com `userEvent.type`.  
    - Clica no botão `Salvar`.  
    - Usa `waitFor` para garantir que `usersApi.create` é chamado com `{ name, email }` corretamente.

- **`Header.spec.tsx`**  
  - **Objetivo**: checar o comportamento básico do componente de cabeçalho.  
  - **Como funciona**:
    - Renderiza `Header` dentro de `CurrentUserProvider` e `MemoryRouter`.  
    - Verifica se, sem usuário logado, o texto/botão `Logar` é exibido.

- **`CurrentUserContext.spec.tsx`**  
  - **Objetivo**: validar o contexto global de usuário atual (`CurrentUserProvider` + `useCurrentUser`).  
  - **Como funciona**:
    - Mocka `usersApi.getCurrentUser`.  
    - Cria um `TestComponent` que usa `useCurrentUser()` e exibe:
      - Estado de carregamento (`carregando`/`pronto`).  
      - Nome do usuário ou `sem usuário`.  
    - No teste:
      - Inicia com `sem usuário` na tela.  
      - Clica no botão `login` (que chama `login()` do contexto).  
      - Avança o tempo (`jest.useFakeTimers` + `advanceTimersByTime`) para simular o `setTimeout`.  
      - Usa `waitFor` para verificar se o nome do usuário retornado pelo mock (`Usuário Atual`) aparece na tela.

Esses testes garantem:

- Que a **lista de usuários** carrega, exibe e filtra corretamente.  
- Que a **criação de usuário** chama a API com os dados certos.  
- Que o **cabeçalho** mostra o estado correto quando não há usuário logado.  
- Que o **contexto de usuário atual** atualiza o estado global após login.

---

## 11. Estrutura de pastas e algumas funções do sistema

Estrutura simplificada:

```text
src/
  App.tsx                # Define rotas principais da aplicação
  main.tsx               # Ponto de entrada, inicializa React e MSW (mock)

  api/
    users.ts             # Funções de acesso à API de usuários (getAll, getById, create, update, delete, getCurrentUser, etc.)

  pages/
    UserListPage.tsx     # Tela de listagem, filtro, ativação/inativação, exclusão e navegação para criar/editar
    UserCreatePage.tsx   # Tela de criação de usuário
    UserEditPage.tsx     # Tela de edição de usuário

  components/
    Header.tsx           # Cabeçalho com ações ligadas ao usuário logado
    DeleteConfirmDialog.tsx  # Diálogo de confirmação para exclusão
    tests/
      userListPage.spec.tsx
      UserCreatePage.integration.spec.tsx
      Header.spec.tsx
      CurrentUserContext.spec.tsx

  context/
    currentUserContext.tsx  # Contexto global de usuário atual (login/logoff, loading, currentUser)
```

Algumas funções importantes:

- **`usersApi.getAll()`** – busca a lista de usuários para a `UserListPage`.  
- **`usersApi.create(data)`** – cria um novo usuário a partir dos dados do formulário (`UserCreatePage`).  
- **`usersApi.update(id, data)`** – atualiza um usuário (usado em `UserEditPage` e ao alternar status na listagem).  
- **`usersApi.delete(id)`** – remove um usuário selecionado na lista.  
- **`usersApi.getCurrentUser()`** – retorna o usuário logado (usado no `CurrentUserProvider.login`).  
- **`login()` / `logoff()`** (em `currentUserContext.tsx`) – controlam o estado glogal de autenticação simulada.

---

## Resumo rápido (0 → 100%)

1. **Instalar Node 20 + npm** (via `nvm` ou instalador).  
2. **Clonar ou copiar** o projeto.  
3. **Entrar na pasta** com `cd painel`.  
4. Rodar **`npm install`**.  
5. (Opcional) Criar `.env` e definir `VITE_USE_MOCK=true` para usar a API mockada.  
6. Rodar **`npm run dev`** e acessar a URL que aparecer (ex.: `http://localhost:5173`).  
7. Rodar **`npm test`** para executar os testes (lista, criação, header e contexto de usuário).  
8. Se quiser build de produção, rodar **`npm run build`** e servir a pasta `dist/`.

