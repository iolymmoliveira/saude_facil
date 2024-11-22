// RegisterScreen.js

import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert, StyleSheet, Text, View, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as SQLite from 'expo-sqlite';
import { createTables } from '../database/CreateTables'; // Ajuste o caminho conforme necessário
import Input from '../components/Input';
import Button from '../components/Button';
import Header from '../components/Header';
import Footer from '../components/Footer';

const registerUser = async (data), navigation => {
  try {
    const { name, cns, cpf, password } = data;
    const db = await SQLite.openDatabaseAsync('banco.db');

    // Verifica se o usuário já existe
    const result = await db.getAllAsync('SELECT * FROM pacientes WHERE cartaoSus = ? OR cpf = ?', [cns, cpf]);
    if (result.length > 0) {
      Alert.alert('Erro', 'Usuário já existe com esse CNS ou CPF.');
    } else {
      // Insere o novo usuário
      const insertResult = await db.runAsync('INSERT INTO pacientes (name, cartaoSus, cpf, password) VALUES (?, ?, ?, ?)', [name, cns, cpf, password]);
      
      // Verifica se a inserção foi bem-sucedida
      if (insertResult.changes > 0) {
        Alert.alert('Sucesso', 'Usuário registrado com sucesso!', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('LoginScreen'),
          },
        ]);
      } else {
        Alert.alert('Erro', 'Ocorreu um erro ao registrar os dados.');
      }
    }
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    Alert.alert('Erro', 'Ocorreu um erro ao registrar os dados.');
  }
};

const RegisterScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    console.log('Chamando a função para criar as tabelas...');
    createTables();  // Cria as tabelas quando a tela de registro for carregada
  }, []);

  const goToInitialScreen = () => {
    navigation.navigate('InitialScreen');
  };

  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    registerUser(data);
  };

  return (
    <View style={styles.container}>
      <Header
        icon={require('../assets/icons/arrow_back.png')}
        logo={require('../assets/images/logo_saude_facil.png')}
        title="Registrar"
        onBackPress={goToInitialScreen}
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.welcome}>Crie sua Conta</Text>
          <Text style={styles.instructions}>Informe os dados abaixo para criar sua conta:</Text>

          <Controller
            control={control}
            name="name"
            rules={{ required: 'O nome é obrigatório.' }}
            render={({ field: { onChange, value } }) => (
              <Input label="Nome Completo" value={value} onChangeText={onChange} placeholder="Digite seu nome" />
            )}
          />
          {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

          <Controller
            control={control}
            name="cns"
            rules={{ required: 'O CNS é obrigatório.' }}
            render={({ field: { onChange, value } }) => (
              <Input label="CNS - Número do Cartão Nacional de Saúde" value={value} onChangeText={onChange} placeholder="Digite o número do CNS" keyboardType="numeric" />
            )}
          />
          {errors.cns && <Text style={styles.error}>{errors.cns.message}</Text>}

          <Controller
            control={control}
            name="cpf"
            rules={{ required: 'O CPF é obrigatório.' }}
            render={({ field: { onChange, value } }) => (
              <Input label="CPF - Número de Cadastro de Pessoa Física" value={value} onChangeText={onChange} placeholder="Digite o número do CPF" keyboardType="numeric" />
            )}
          />
          {errors.cpf && <Text style={styles.error}>{errors.cpf.message}</Text>}

          <Controller
            control={control}
            name="password"
            rules={{ required: 'A senha é obrigatória.' }}
            render={({ field: { onChange, value } }) => (
              <Input label="Senha" value={value} onChangeText={onChange} placeholder="Digite sua senha" secureTextEntry />
            )}
          />
          {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

          <View style={styles.containerButtons}>
            <Button text="Criar Conta" onClick={handleSubmit(onSubmit)} groundColor="#35816A" textColor="white" />
          </View>
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

export default RegisterScreen;
