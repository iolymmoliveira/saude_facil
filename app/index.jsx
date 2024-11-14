import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
//import BANCO DE DADOS UTILIZADO


const App = () => {
  const [nome, setNome] = useState("");
  const [cartaoSus, setCartaoSus] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");


  const router = useRouter()

  const handle = async (e) => {
    e.preventDefault();

    //ALTERAR A CONST DA PROXIMA LINHA PARA O BANCO DE DADOS UTILIZADO
    const novoUsuarioRef = await firebase.firestore().collection("Pessoas").add({
      nome: nome,
      cartaoSus: cartaoSus,
      email: email,
      telefone: telefone
    })

    alert("Usuário criado com sucesso! ID: " + novoUsuarioRef.id)
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Bem Vindo(a)!</Text>
        <Text >Para realizar o cadastro, informe os dados:</Text><br />
        <TextInput
          style={styles.input}
          placeholder='Nome'
          onChangeText={text => setNome(text)}
          value={nome}
        />
        <TextInput
          style={styles.input}
          placeholder='Número do cartão SUS'
          onChangeText={text => setCartaoSus(text)}
          value={cartaoSus}
        />
        <TextInput
          style={styles.input}
          placeholder='email'
          onChangeText={text => setEmail(text)}
          value={email}
        />
         <TextInput
          style={styles.input}
          placeholder='Telefone'
          onChangeText={text => setTelefone(text)}
          value={telefone}
        />
      </View>
      <View style={styles.buttons}>
        <Pressable style={styles.button} onPress={handle}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => router.push("/lista")}>
          <Text style={styles.buttonText}>Ver lista</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
    gap: 400
  },
  form: {
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
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
    justifyContent: "center",
    borderRadius: 5,
    alignItems: 'center',
    width: "35%",
    aspectRatio: 2.10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  }
});

export default App;