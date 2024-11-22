import React from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as SQLite from 'expo-sqlite';
import { getUserInfo } from '../database/GetUserInfo';  // Corrigido o caminho da importação
import { useNavigation, NavigationProp } from '@react-navigation/native';

import Input from '../components/Input';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';

// Tipando os dados do formulário
interface FormData {
  cns: string;
  cpf: string;
};

// Definindo o tipo para as rotas
type RootStackParamList = {
  InitialScreen: undefined;
  HomeScreen: { user: any };
  RegisterScreen: undefined;
};

// Função para buscar usuário no banco de dados
async function fetchUserInfo(cns: string, cpf: string) {
  const userInfo = await getUserInfo(cns, cpf);
  console.log('Info do usuário obtida:', userInfo);
  return userInfo;
}

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
  // Função de navegação
  const goToInitialScreen = () => {
    navigation.navigate('InitialScreen');
  };

  // Controle do formulário
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [isLoading, setIsLoading] = React.useState(false); // Estado para controle de carregamento

  // Função que será chamada ao enviar o formulário
  // Em LoginScreen

const onSubmit: SubmitHandler<FormData> = async (data) => {
  setIsLoading(true); // Começa o carregamento
  try {
    console.log('Iniciando validação...', data); // Para debug

    // Buscar o usuário no banco de dados
    const user = await fetchUserInfo(data.cns, data.cpf);

    if (user) {
      console.log('Usuário encontrado:', user); // Para debug
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      navigation.navigate('HomeScreen', { user }); // Passando o parâmetro 'user' para a HomeScreen
    } else {
      console.log('Nenhum usuário encontrado para os dados fornecidos.'); // Para debug
      Alert.alert('Erro', 'CNS e CPF não coincidem.');
    }
  } catch (error) {
    console.error('Erro ao tentar realizar o login:', error); // Para debug
    Alert.alert('Erro', `Ocorreu um erro ao verificar o login: ${error.message}`);
  } finally {
    setIsLoading(false); // Finaliza o carregamento
  }
};


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
            {isLoading ? (
              <ActivityIndicator size="large" color="#35816A" />
            ) : (
              <>
                <Button
                  text="Entrar"
                  onClick={handleSubmit(onSubmit)}
                  groundColor="#35816A"
                  textColor="white"
                />
                <Button
                  text="Criar Conta"
                  onClick={() => navigation.navigate('RegisterScreen')}
                  groundColor="#F1F1F1"
                  textColor="black"
                />
              </>
            )}
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

export default LoginScreen;
