import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import * as SQLite from 'expo-sqlite';

const App = () => {
  const [nome, setNome] = useState('');
  const [cartaoSus, setCartaoSus] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  // Criação do banco de dados
  const db = SQLite.openDatabaseAsync('banco.db'); // Usando openDatabaseSync diretamente

  // Função para criar tabela (caso não exista)
  const criarTabelas = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS pacientes (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, cartaoSus TEXT, email TEXT, telefone TEXT);'
      );
    });
  };

  useEffect(() => {
    // Chama a função de criação da tabela na primeira renderização
    criarTabelas();
  }, []);

  // Função para inserir dados no banco de dados
  const handleCadastro = () => {
    if (!nome || !cartaoSus || !email || !telefone) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    // Inserindo dados
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO pacientes (nome, cartaoSus, email, telefone) VALUES (?, ?, ?, ?)',
        [nome, cartaoSus, email, telefone],
        (_, result) => {
          console.log('Usuário cadastrado com sucesso!', result);
          alert('Usuário cadastrado com sucesso!');
        },
        (_, error) => {
          console.error('Erro ao cadastrar usuário:', error);
          alert('Erro ao cadastrar usuário');
        }
      );
    });
  };

  // Função para ver a lista de pacientes
  const handleVerLista = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM pacientes;',
        [],
        (_, result) => {
          console.log('Pacientes cadastrados:', result.rows._array);
          alert('Veja o console para ver a lista!');
        },
        (_, error) => {
          console.error('Erro ao buscar pacientes:', error);
          alert('Erro ao buscar pacientes');
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Pacientes</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={(text) => setNome(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Número do Cartão SUS"
        value={cartaoSus}
        onChangeText={(text) => setCartaoSus(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={telefone}
        onChangeText={(text) => setTelefone(text)}
      />

      <Pressable style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={handleVerLista}>
        <Text style={styles.buttonText}>Ver Lista</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '80%',
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default App;
