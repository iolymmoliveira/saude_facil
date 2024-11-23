import * as SQLite from 'expo-sqlite';

export async function updatePatient(data: any) {
  const db = await SQLite.openDatabaseAsync('banco.db');
  try {
    const result = await db.runAsync(
      'UPDATE pacientes SET name = ?, cartaoSus = ?, cpf = ?, password = ? WHERE id = ?',
      [data.name, data.cartaoSus, data.cpf, data.password, data.id]
    );
    return result.changes;
  } catch (error) {
    console.error('Erro ao atualizar paciente:', error);
    return null;
  }
}

export async function removePatient(id: string) {
  const db = await SQLite.openDatabaseAsync('banco.db');
  try {
    const result = await db.runAsync('DELETE FROM pacientes WHERE id = ?', [id]);
    return result.changes;
  } catch (error) {
    console.error('Erro ao remover paciente:', error);
    return null;
  }
}

export async function showPatient(id: string) {
  const db = await SQLite.openDatabaseAsync('banco.db');
  try {
    const result = await db.getFirstAsync('SELECT * FROM pacientes WHERE id = ?', [id]);
    return result;
  } catch (error) {
    console.error('Erro ao buscar paciente:', error);
    return null;
  }
}

export async function addPatient(data: any) {
  const db = await SQLite.openDatabaseAsync('banco.db');
  try {
    const result = await db.runAsync(
      'INSERT INTO pacientes (name, cartaoSus, cpf, password) VALUES (?, ?, ?, ?)',
      [data.name, data.cartaoSus, data.cpf, data.password]
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error('Erro ao adicionar paciente:', error);
    return null;
  }
}
