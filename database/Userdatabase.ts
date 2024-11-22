import * as SQLite from 'expo-sqlite';

const openDatabase = () => {
  const db = SQLite.openDatabase('banco.db');
  return db;
};

// Método para buscar usuários
export const getUsers = async () => {
  try {
    const db = openDatabase();
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM pacientes',
          [],
          (_, { rows: { _array } }) => resolve(_array),
          (_, error) => reject(error)
        );
      });
    });
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
};

// Método para deletar um usuário por ID
export const deleteUser = async (id) => {
  try {
    const db = openDatabase();
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM pacientes WHERE id = ?',
          [id],
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      });
    });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    throw error;
  }
};

// Método para atualizar dados do usuário
export const updateUser = async (id, data) => {
  try {
    const { name, cns, cpf, password } = data;
    const db = openDatabase();
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE pacientes SET name = ?, cartaoSus = ?, cpf = ?, password = ? WHERE id = ?',
          [name, cns, cpf, password, id],
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      });
    });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    throw error;
  }
};

// Método para criar tabelas (já existente, mas integrado nesse arquivo)
export const createTables = () => {
  const db = openDatabase();
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS pacientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        cartaoSus TEXT NOT NULL,
        cpf TEXT NOT NULL,
        password TEXT NOT NULL
      );`
    );
  });
};
