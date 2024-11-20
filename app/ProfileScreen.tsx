
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function ProfileScreen({ navigation }) {
  const [name, setName] = useState('nome');
  const [cpf, setCpf] = useState('cpf');
  const [susCard, setSusCard] = useState('cartão sus');
  const [phone, setPhone] = useState('fone');

  const handleEdit = () => {
    Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
  };

  const handleDelete = () => {
    Alert.alert('Confirmação', 'Perfil excluído com sucesso!');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={cpf}
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Cartão SUS"
        value={susCard}
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={phone}
        onChangeText={setPhone}
      />
      <Button title="Salvar Alterações" onPress={handleEdit} />
      <Button title="Excluir Perfil" color="red" onPress={handleDelete} />
      <Button title="Sair" onPress={() => navigation.navigate('Login')} />
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
