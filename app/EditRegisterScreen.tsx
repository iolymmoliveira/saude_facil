import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, Modal } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useRoute } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import { DatabaseTransaction } from 'expo-sqlite/src/SQLite';
import { useNavigation } from '@react-navigation/native';
import { validateCNS, validateCPF, validateEmail, validatePhone, validateName } from '../utils/validation';

import Input from '../components/Input';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';

const EditRegisterScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [userData, setUserData] = useState(null);
  const { control, handleSubmit, formState: { errors } } = useForm();

  const goToInitialScreen = () => {
    navigation.navigate('InitialScreen');
  };

  useEffect(() => {
    const route = useRoute();
    const { userId } = parseInt(route.params?.userId);
    
    if (!userId) {
      Alert.alert('Erro', 'ID do usuário não fornecido.');
      navigation.goBack();
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM pacientes WHERE id = ?',
        [userId],
        (_, result) => {
          if (result.rows.length > 0) {
            setUserData(result.rows.item(0));
          } else {
            Alert.alert('Erro', 'Usuário não encontrado.');
            navigation.goBack();
          }
        },
        (_, error) => {
          console.error('Erro ao buscar usuário:', error);
          Alert.alert('Erro', 'Ocorreu um erro ao buscar os dados do usuário.');
        }
      );
    });
  }, [route.params, navigation]);

  const onSubmit = (data) => {

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE pacientes SET nome = ?, cartaoSus = ?, cpf = ?, email = ?, telefone = ? WHERE id = ?',
        [data.nome, data.cartaoSus, data.cpf, data.email, data.telefone, route.params.userId],
        (_, result) => {
          if (result.rowsAffected > 0) {
            Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
            navigation.goBack();
          } else {
            Alert.alert('Erro', 'Não foi possível atualizar os dados.');
          }
        },
        (_, error) => {
          console.error('Erro ao atualizar usuário:', error);
          Alert.alert('Erro', 'Ocorreu um erro ao atualizar os dados.');
        }
      );
    });
  };

  const handleDelete = () => {
    Alert.alert(
      'Confirmação de exclusão',
      'Tem certeza que deseja excluir este cadastro?',
      [
        { text: 'Cancelar', onPress: () => {}, style: 'cancel' },
        {
          text: 'Excluir',
          onPress: () => {
            db.transaction((tx) => {
              tx.executeSql('DELETE FROM pacientes WHERE id = ?', [route.params.userId]);
            });
            navigation.navigate('InitialScreen');
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Header
        icon={require('../assets/icons/arrow_back.png')}
        logo={require('../assets/images/logo_saude_facil.png')}
        title="Alteração no Cadastro"
        onBackPress={goToInitialScreen}
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.instructions}>Edite os dados abaixo:</Text>
          <View>
            <Controller
              control={control}
              name="nome"
              rules={{
                required: 'O nome é obrigatório.',
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Nome Completo"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Digite seu nome completo"
                />
              )}
            />
            {errors.nome && <Text style={styles.error}>{errors.nome.message}</Text>}
            <Controller
              control={control}
              name="cartaoSus"
              rules={{
                required: 'O CNS é obrigatório.',
                validate: (value) => validateCNS(value) || 'O CNS inserido é inválido.',
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
            {errors.cartaoSus && <Text style={styles.error}>{errors.cartaoSus.message}</Text>}
            <Controller
              control={control}
              name="cpf"
              rules={{
                required: 'O CPF é obrigatório.',
                validate: (value) => validateCPF(value) || 'O CPF inserido é inválido.',
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
            <Controller
              control={control}
              name="email"
              rules={{
                required: 'O email é obrigatório.',
                validate: (value) => validateEmail(value) || 'O email inserido é inválido.',
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Email"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Digite seu email"
                  keyboardType="email-address"
                  type="email-address"
                />
              )}
            />
            {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
            <Controller
              control={control}
              name="telefone"
              rules={{
                required: 'O telefone é obrigatório.',
                validate: (value) => validatePhone(value) || 'O telefone inserido é inválido.',
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Telefone"
                  value={value}
                  onChangeText={onChange}
                  placeholder="(XX) XXXX-XXXX"
                  keyboardType="phone-pad"
                />
              )}
            />
            {errors.telefone && <Text style={styles.error}>{errors.telefone.message}</Text>}
          </View>
          <View style={styles.containerButtons}>
            <Button
              text="Salvar Alterações"
              onClick={handleSubmit(onSubmit)}
              groundColor="#35816A"
              textColor="white"
            />
            <Button
              text="Excluir Cadastro"
              onClick={handleSubmit(handleDelete)}
              groundColor="#e75e5e"
              textColor="black"
            />

            <Modal visible={isModalVisible}>
              <Text>Tem certeza que deseja excluir este cadastro?</Text>
              <View style={styles.buttonContainer}>
                <Button text="Cancelar" onPress={() => setIsModalVisible(false)} />
                <Button text="Excluir" onPress={confirmDelete} />
              </View>
            </Modal>
          </View>
        </View>
      </ScrollView>
      <Footer icons={[]} />
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

export default EditRegisterScreen;