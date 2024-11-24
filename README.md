# Saúde Fácil

## Descrição do Projeto

O **Saúde Fácil** é um aplicativo desenvolvido em **React Native** para facilitar o gerenciamento de informações básicas de saúde dos usuários. Ele permite cadastro, autenticação e visualização de funcionalidades relacionadas à saúde, como histórico médico e agendamentos.

---

## Funcionalidades Principais

1. **Login**:

   - Autenticação utilizando o **CNS (Cartão Nacional de Saúde)** e **CPF**.

2. **Cadastro de Usuários**:

   - Registro de novos usuários com informações como nome, CNS, CPF e senha.

3. **Tela Principal**:

   - Exibição de informações do usuário (nome e CNS).
   - Acesso a funcionalidades relacionadas ao perfil do usuário.

4. **Edição de Perfil**:

   - Atualização de dados cadastrais do usuário.

5. **CRUD Completo**:

   - Gerenciamento de dados no banco SQLite (criação, leitura, atualização e exclusão).

---

## Tecnologias Utilizadas

- **React Native**: Framework para desenvolvimento do aplicativo móvel.
- **Expo**: Plataforma para simplificar o desenvolvimento.
- **SQLite**: Banco de dados local para armazenamento das informações do usuário.

---

## Estrutura do Projeto

O projeto segue a arquitetura **MVC (Model View Controller)**, dividida da seguinte forma:

- **Model**:

  - Configuração do banco de dados e funções de manipulação (e.g., `CreateTables.ts`, `GetUserInfo.ts`).

- **View**:

  - Componentes e telas que compõem a interface do usuário (e.g., `LoginScreen.tsx`, `HomeScreen.tsx`, `UserCard`).

- **Controller**:

  - Gerenciamento da lógica do aplicativo e controle de fluxo entre telas.

---

## Banco de Dados

O banco de dados utiliza **SQLite**, com a seguinte tabela principal:

```sql
CREATE TABLE IF NOT EXISTS pacientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    cartaoSus TEXT,
    cpf TEXT UNIQUE,
    password TEXT
);
```

Funções principais implementadas no banco:

- Inserir novos usuários.
- Consultar usuários pelo CNS e CPF.
- Atualizar dados cadastrais.
- (Opcional) Excluir usuários.

---

## API(s) e Link do Repositório

- **API(s) utilizadas**: Não há integração com APIs externas, todo o gerenciamento é local.
- **Link do GitHub**: [Saúde Fácil](https://github.com/iolymmoliveira/saude_facil)

---

## Como Executar o Projeto

1. **Clone o Repositório**:

   ```bash
   git clone https://github.com/<iolymmoliveira>/<saudefacil>.git
   ```

2. **Instale as Dependências**:

   ```bash
   npm install
   ```

3. **Inicie o Projeto**:

   ```bash
   expo start
   ```

4. **Execute no Emulador ou Dispositivo Físico**:

   - Use o aplicativo Expo Go para rodar o projeto no celular.

---

## Possíveis Expansões

- Integração com APIs de saúde pública.
- Implementação de notificações para lembretes de consultas ou medicamentos.
- Controle mais avançado de permissões e segurança de dados.

---

## Licença

Este projeto é licenciado sob a licença MIT. Sinta-se à vontade para usá-lo e modificá-lo conforme necessário.

