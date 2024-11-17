import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
//c

const Lista = () => {
  const [pacientes, setPacientes] = useState([]);

  // Função para abrir o banco de dados e garantir que a tabela "pacientes" existe
  const abrirBanco = async () => {
    try {
      const db = await SQLite.openDatabaseAsync('banco.db'); // Abrir o banco de dados

      // Criar a tabela de pacientes se não existir
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS pacientes (
          id INTEGER PRIMARY KEY NOT NULL, 
          nome TEXT, 
          cartaoSus TEXT, 
          email TEXT, 
          telefone TEXT
        )
      `);

      console.log('Banco de dados aberto e tabela criada (se não existia).');
      return db;
    } catch (error) {
      console.error('Erro ao abrir o banco:', error);
    }
  };

  // Função para carregar pacientes do banco
  const carregarPacientes = async () => {
    const db = await abrirBanco();

    try {
      // Consultar todos os pacientes
      const allRows = await db.getAllAsync('SELECT * FROM pacientes');
      console.log('Pacientes carregados:', allRows); // Log de pacientes carregados
      setPacientes(allRows); // Atualizar o estado com os dados dos pacientes
    } catch (error) {
      console.error('Erro ao carregar pacientes:', error);
    }
  };

  // Função para adicionar um novo paciente
  const adicionarPaciente = async () => {
    const db = await abrirBanco();

    try {
      // Inserir um novo paciente
      const result = await db.runAsync(
        'INSERT INTO pacientes (nome, cartaoSus, email, telefone) VALUES (?, ?, ?, ?)',
        'Novo Paciente', '12345', 'novo@email.com', '1111111111'
      );
      console.log('Novo paciente inserido:', result); // Log de resultado de inserção
      carregarPacientes(); // Atualizar a lista após a inserção
    } catch (error) {
      console.error('Erro ao adicionar paciente:', error);
    }
  };

  // Função para remover um paciente
  const removerPaciente = async (id) => {
    const db = await abrirBanco();

    try {
      // Remover o paciente com o id correspondente
      await db.runAsync('DELETE FROM pacientes WHERE id = ?', id);
      console.log(`Paciente com ID ${id} removido`);
      carregarPacientes(); // Atualizar a lista após a remoção
    } catch (error) {
      console.error('Erro ao remover paciente:', error);
    }
  };

  // Carregar pacientes assim que o componente for montado
  useEffect(() => {
    carregarPacientes();
  }, []);

  // Exibir lista de pacientes
  const renderItem = ({ item }) => (
    <View style={{ padding: 10 }}>
      <Text>{`Nome: ${item.nome}`}</Text>
      <Text>{`Cartão SUS: ${item.cartaoSus}`}</Text>
      <Text>{`Email: ${item.email}`}</Text>
      <Text>{`Telefone: ${item.telefone}`}</Text>
      <Button title="Remover" onPress={() => removerPaciente(item.id)} />
    </View>
  );

  return (
    <View>
      <Button title="Adicionar Paciente" onPress={adicionarPaciente} />
      {/* Renderizar a lista de pacientes */}
      {pacientes.length > 0 ? (
        <FlatList
          data={pacientes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text>Nenhum paciente encontrado.</Text>
      )}
    </View>
  );
};

export default Lista;
