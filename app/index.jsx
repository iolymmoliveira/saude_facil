import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import * as SQLite from 'expo-sqlite'; 
import criarTabelas from '../database/criarTabelas';

const App = () => {
  const [nome, setNome] = useState('');
  const [cartaoSus, setCartaoSus] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const router = useRouter();

  const [db, setDb] = useState(null);

  useEffect(() => {
    const openDb = async () => {
      const database = await SQLite.openDatabaseAsync('banco.db');
      setDb(database);

      // Inicializa as tabelas no banco de dados
      criarTabelas(database);
    };

    openDb();
  }, []);

  const handle = async () => {
    if (!db) {
      console.error('Banco de dados não está inicializado!');
      alert('Erro ao acessar o banco de dados');
      return;
    }

    // Verifica se os campos não estão vazios
    if (!nome || !cartaoSus || !email || !telefone) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    try {
      // Inserção de dados de forma assíncrona
      const result = await db.runAsync(
        'INSERT INTO pacientes (nome, cartaoSus, email, telefone) VALUES (?, ?, ?, ?)',
        nome, cartaoSus, email, telefone
      );
      console.log('Usuário cadastrado com sucesso!', result);
      alert('Usuário cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      alert('Erro ao cadastrar usuário');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Bem Vindo(a)!</Text>
        <Text>Para realizar o cadastro, informe os dados:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          onChangeText={(text) => setNome(text)}
          value={nome}
        />
        <TextInput
          style={styles.input}
          placeholder="Número do cartão SUS"
          onChangeText={(text) => setCartaoSus(text)}
          value={cartaoSus}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          onChangeText={(text) => setTelefone(text)}
          value={telefone}
        />
      </View>
      <View style={styles.buttons}>
        {/* Botão de cadastro */}
        <Pressable style={styles.button} onPress={handle}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </Pressable>

        {/* Botão para navegar para a lista */}
        <Pressable style={styles.button} onPress={() => router.push('/lista')}>
          <Text style={styles.buttonText}>Ver lista</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
    gap: 400,
  },
  form: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '65%',
    height: 40,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  buttons: {
    width: '65%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    borderRadius: 5,
    alignItems: 'center',
    width: '35%',
    aspectRatio: 2.1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default App;
