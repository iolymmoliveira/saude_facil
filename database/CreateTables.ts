import * as SQLite from 'expo-sqlite';
// Correct way to export the function
export const createTables = async () => {
  const db = await SQLite.openDatabaseAsync('banco.db');  // Abrir o banco de dados

  try {
    await db.runAsync(`
      PRAGMA journal_mode = WAL;

      CREATE TABLE IF NOT EXISTS pacientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        cartaoSus TEXT,
        cpf TEXT UNIQUE,
        password TEXT
      );
    `);

    console.log('Tabela pacientes criada com sucesso!');
    const result = await db.getAllAsync('PRAGMA table_info(pacientes)');
    console.log('Estrutura da tabela pacientes:', result);

  } catch (error) {
    console.error('Erro ao criar a tabela de pacientes:', error);
  }
};