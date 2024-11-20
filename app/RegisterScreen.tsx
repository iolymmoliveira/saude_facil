
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [susCard, setSusCard] = useState('');
  const [phone, setPhone] = useState('');

  const handleRegister = () => {
    if (!name || !cpf || !susCard || !phone) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
      return;
    }
    Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        keyboardType="numeric"
        value={cpf}
        onChangeText={setCpf}
      />
      <TextInput
        style={styles.input}
        placeholder="Cartão SUS"
        keyboardType="numeric"
        value={susCard}
        onChangeText={setSusCard}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <Button title="Cadastrar" onPress={handleRegister} />
      <Button title="Voltar" color="#00f" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});
