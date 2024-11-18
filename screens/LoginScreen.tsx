import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Input from '../components/Input';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { validateCNS } from '../utils/validation';
import * as SQLite from 'expo-sqlite'; 
import { DatabaseTransaction } from 'expo-sqlite/src/SQLite';

const LoginScreen = () => {
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  const validateLogin = async (data: { cns: string; }) => {
    try {
      const { cns } = data;

      const db = await SQLite.openDatabaseAsync('banco.db');

      db.transaction((tx: DatabaseTransaction) => {
        tx.executeSql(
          'SELECT * FROM pacientes WHERE cartaoSus = cns',
          [cns],
          (_, result: QueryResult) => {
            if (result.rows.length > 0) {
              Alert.alert('Sucesso', 'Login realizado com sucesso!');
            } else {
              Alert.alert('Erro', 'CNS incorreto.');
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


  // const onSubmit = (data: { cns: string; }) => {
  //   const errors = validateCNS(data.cns);

  //   if (errors ) {
  //     Alert.alert('Erro', `${errors || ''}`);
  //     return;
  //   } 

  //   validateLogin(data);
  // };

  const onSubmit = (data: { cns: string; }) => {
    const isValid = validateCNS(data.cns);

    if (!isValid) {
      Alert.alert('Erro', 'CNS inválido.');
      return;
    }

    validateLogin(data);
  }

  return (
    <View style={styles.container}>
      <Header
        icon={require('../assets/icons/arrow_back.png')}
        logo={require('../assets/images/logo_saude_facil.png')}
        title="Home Screen"
      />
      <View style={styles.content}>
        <Text style={styles.welcome}>Bem vindo(a)!</Text>
        <Text style={styles.instructions}>Informe os dados abaixo:</Text>
        <View>
          <Controller
            control={control}
            name="cns"
            rules={{
              validate: (value) => validateCNS(value),
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
        </View>
        <View style={styles.containerButtons}>
          <Button
            text="Entrar"
            onClick={handleSubmit(onSubmit)}
            groundColor="#35816A"
            textColor="white"
          />
          <Button
            text="Criar Conta"
            onClick={() => Alert.alert('Criar Conta')}
            groundColor="#F1F1F1"
            textColor="black"
          />
        </View>
      </View>
      <Footer icons={[]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    borderRadius: 16,
    margin: 16,
    padding: 18,
  },
  welcome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  instructions: {
    fontSize: 14,
    marginBottom: 20,
  },
  containerButtons: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default LoginScreen;
