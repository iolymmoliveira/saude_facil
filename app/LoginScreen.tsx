import React from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as SQLite from 'expo-sqlite';
import { DatabaseTransaction } from 'expo-sqlite/src/SQLite';
import { useNavigation } from '@react-navigation/native';
import { validateCNS, validateCPF } from '../utils/validation';

import Input from '../components/Input';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';

const LoginScreen = () => {
  const navigation = useNavigation();

  const goToInitialScreen = () => {
    navigation.navigate('InitialScreen');
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  interface QueryResult {
    rows: {
      _array: any[];
    };
  }

  const validateLogin = async (data: { cns: string; cpf: string }) => {
    try {
      const { cns, cpf } = data;

      const db = await SQLite.openDatabaseAsync('banco.db');

      db.transaction((tx: DatabaseTransaction) => {
        tx.executeSql(
          'SELECT * FROM pacientes WHERE cartaoSus = ? AND cpf = ?',
          [cns, cpf],
          (_, result: QueryResult) => {
            if (result.rows.length > 0) {
              Alert.alert('Sucesso', 'Login realizado com sucesso!');
              navigation.navigate('HomeScreen');
            } else {
              Alert.alert('Erro', 'Campo CNS ou CPF incorreto.');
            }
          },
          (_, error) => {
            console.error('Erro ao validar login:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao validar os dados.');
          }
        );
      });
    } catch (error) {
      console.error('Erro ao validar login:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao validar os dados.');
    }
  };

  const onSubmit = (data: { cns: string; cpf: string; }) => {
    const isCNSValid = validateCNS(data.cns);
    const isCPFValid = validateCPF(data.cpf);

    if (!isCNSValid || !isCPFValid) {
      Alert.alert('Erro', 'CNS ou CPF inválido.');
      return;
    }

    validateLogin(data);
  }

  return (
    <View style={styles.container}>
      <Header
        icon={require('../assets/icons/arrow_back.png')}
        logo={require('../assets/images/logo_saude_facil.png')}
        title="Entrar"
        onBackPress={goToInitialScreen}
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.welcome}>Bem vindo(a)!</Text>
          <Text style={styles.instructions}>Informe os dados abaixo:</Text>
          <View>
            <Controller
              control={control}
              name="cns"
              rules={{
                required: 'O CNS é obrigatório.',
                validate: (value) =>
                  validateCNS(value) || 'O CNS inserido é inválido.',
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  label="CNS - Número do Cartão Nacional de Saúde"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Digite o número do CNS"
                  keyboardType="numeric"
                  type="numeric"
                />
              )}
            />
            {errors.cns && <Text style={styles.error}>{errors.cns.message}</Text>}
            <Controller
              control={control}
              name="cpf"
              rules={{
                required: 'O CPF é obrigatório.',
                validate: (value) =>
                  validateCPF(value) || 'O CPF inserido é inválido.',
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  label="CPF - Número de Cadastro de Pessoa Física"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Digite o número do CPF"
                  keyboardType="numeric"
                  type="numeric"
                />
              )}
            />
            {errors.cpf && <Text style={styles.error}>{errors.cpf.message}</Text>}
          </View>
          <View style={styles.containerButtons}>
            <Button
              text="Entrar"
              // onClick={handleSubmit(onSubmit)}
              onClick={() => navigation.navigate('HomeScreen')}
              groundColor="#35816A"
              textColor="white"
            />
            <Button
              text="Criar Conta"
              onClick={() => navigation.navigate('RegisterScreen')}
              groundColor="#F1F1F1"
              textColor="black"
            />
          </View>
        </View>
      </ScrollView>
      <Footer icons={[
      ]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#F1F1F1',
    borderRadius: 16,
    margin: 16,
    padding: 18,
  },
  welcome: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'MontserratBold',
    marginBottom: 10,
  },
  instructions: {
    fontSize: 14,
    fontFamily: 'MontserratSemiBold',
    marginBottom: 20,
  },
  containerButtons: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  error: {
    color: 'red',
    fontSize: 14,
  },
});

export default LoginScreen;
