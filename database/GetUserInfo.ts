import * as SQLite from 'expo-sqlite';

// Função para buscar o usuário
export const getUserInfo = async (cns: string, cpf: string) => {
  try {
    // Abrindo o banco de dados
    const db = await SQLite.openDatabaseAsync('banco.db');
    
    // Realizando a consulta ao banco de dados
    const result = await db.getFirstAsync(
      'SELECT * FROM pacientes WHERE cartaoSus = ? AND cpf = ?',
      [cns, cpf]
    );

    // Verificando se o resultado foi encontrado
    if (result) {
      console.log('Usuário encontrado:', result); // Log do resultado
      return result;  // Retorna o resultado se o usuário for encontrado
    } else {
      console.log('Nenhum usuário encontrado para os dados fornecidos.');
      return null;  // Retorna null se o usuário não for encontrado
    }
  } catch (error) {
    // Tratando o erro se ocorrer
    console.error('Erro ao buscar usuário:', error);  // Log do erro caso algo falhe
    return null;  // Retorna null em caso de erro
  }
};




// Função para obter as informações do usuário com base no CNS e CPF
/*export const getUserInfo = async (cns, cpf) => {
  try {
    // Verificando se os parâmetros cns e cpf são passados como strings
    console.log('Buscando usuário com CNS:', String(cns), 'e CPF:', String(cpf));

    const db = await SQLite.openDatabaseAsync('banco.db');
    
    // Realizando a consulta no banco de dados
    const result = await db.getFirstAsync(
      'SELECT * FROM pacientes WHERE cartaoSus = ? AND cpf = ?',
      [String(cns), String(cpf)]  // Garantindo que sejam strings
    );

    if (result) {
      console.log('Usuário encontrado:', result); // Log do resultado
      return result;
    } else {
      console.log('Nenhum usuário encontrado para os dados fornecidos.');
      return null;
    }
  } catch (error) {
    console.error('Erro ao consultar o banco de dados:', error);
    return null;
  }
};*/


// Função para pegar um usuário pelo ID (caso necessário em outros pontos)
export const getUserById = async (userId) => {
  try {
    // Abrindo o banco de dados
    const db = await SQLite.openDatabaseAsync('banco.db');

    // Consultando o banco de dados com getFirstAsync
    const result = await db.getFirstAsync(
      'SELECT * FROM pacientes WHERE id = ?',
      [userId]
    );

    // Se o usuário for encontrado, retorna as informações
    if (result) {
      return result;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Erro ao pegar usuário pelo ID:', error);
    return null;
  }
};

// Função para inserir ou atualizar um usuário (exemplo de inserção)
export const insertOrUpdateUser = async (user) => {
  try {
    const { id, cartaoSus, cpf, name } = user;

    // Abrindo o banco de dados
    const db = await SQLite.openDatabaseAsync('banco.db');

    // Inserindo ou atualizando dados de um usuário
    const result = await db.runAsync(
      'INSERT OR REPLACE INTO pacientes (id, cartaoSus, cpf, name) VALUES (?, ?, ?, ?)',
      [id, cartaoSus, cpf, name]
    );

    return result; // Retorna o resultado da inserção ou atualização
  } catch (error) {
    console.error('Erro ao inserir ou atualizar usuário:', error);
    return null;
  }
};
