import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useRoute, useNavigation } from '@react-navigation/native';
import Input from '../components/Input';
import Header from '../components/Header'; // Assumindo que o Header tem o formato desejado
import Footer from '../components/Footer';
import Button from '../components/Button';
import { updatePatient, removePatient, showPatient } from '../database/usePatientManager'; 

const EditRegisterScreen = () => {
  const [userData, setUserData] = useState(null);
  const { control, handleSubmit, reset } = useForm();
  const navigation = useNavigation();
  const route = useRoute();
  const userId = route.params?.userId;

  useEffect(() => {
    if (!userId) {
      Alert.alert('Erro', 'ID do usuário não fornecido.');
      navigation.goBack();
      return;
    }

    // Carrega dados do usuário
    showPatient(userId)
      .then((data) => {
        if (data) {
          setUserData(data);
          reset(data); // Preenche o formulário com os dados do usuário
        } else {
          Alert.alert('Erro', 'Usuário não encontrado.');
          navigation.goBack();
        }
      })
      .catch(() => Alert.alert('Erro', 'Erro ao carregar os dados.'));
  }, [userId, reset, navigation]);

  const onSubmit = (data) => {
    updatePatient({ ...data, id: userId })
      .then(() => {
        Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
        // Após salvar, navega de volta para a HomeScreen com os dados atualizados
        navigation.navigate('HomeScreen', { updatedUser: data });
      })
      .catch(() => Alert.alert('Erro', 'Erro ao atualizar os dados.'));
  };

  const handleDelete = () => {
    Alert.alert(
      'Confirmação de exclusão',
      'Tem certeza que deseja excluir este cadastro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: () => {
            removePatient(userId)
              .then(() => {
                Alert.alert('Sucesso', 'Conta excluída com sucesso.');
                navigation.navigate('InitialScreen'); // Redireciona para a tela inicial
              })
              .catch(() => Alert.alert('Erro', 'Erro ao excluir a conta.'));
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
    
      <Header
        icon={require('../assets/icons/arrow_back.png')}
        logo={require('../assets/images/logo_saude_facil.png')}
        title="Editar Cadastro"
        onBackPress={() => navigation.goBack()} // Função de retorno
        style={styles.header} // Aplicando o estilo de cabeçalho
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.instructions}>Edite os dados abaixo:</Text>

        {/* Campos do formulário */}
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input label="Nome Completo" value={value} onChangeText={onChange} />
          )}
        />
        <Controller
          control={control}
          name="cartaoSus"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Cartão SUS"
              value={value}
              onChangeText={onChange}
              keyboardType="numeric"
            />
          )}
        />
        <Controller
          control={control}
          name="cpf"
          render={({ field: { onChange, value } }) => (
            <Input
              label="CPF"
              value={value}
              onChangeText={onChange}
              keyboardType="numeric"
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Senha"
              value={value}
              onChangeText={onChange}
              secureTextEntry
            />
          )}
        />
    <View style={styles.containerButtons}>
      <Button 
        text="Salvar Alterações" 
        onClick={handleSubmit(onSubmit)} 
        groundColor="#35816A"
        textColor="white"
        spacing={20} // Ajuste o espaçamento entre os botões
      />
      <Button 
        text="Excluir Conta" 
        onClick={handleDelete} 
        groundColor="red"
        textColor="white"
        spacing={20} // Ajuste o espaçamento entre os botões
      />
    </View>

       
      </ScrollView>
      <Footer icons={[]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flexGrow: 1, backgroundColor: '#F1F1F1', borderRadius: 16, margin: 16, padding: 18 },
  welcome: { fontSize: 22, fontWeight: 'bold', fontFamily: 'MontserratBold', marginBottom: 10 },
  instructions: { fontSize: 14, fontFamily: 'MontserratSemiBold', marginBottom: 20 },
  containerButtons: { marginTop: 20, alignItems: 'center', justifyContent: 'space-between' },
  error: { color: 'red', fontSize: 14 },
});
export default EditRegisterScreen;
