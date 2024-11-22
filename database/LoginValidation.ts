import * as SQLite from 'expo-sqlite';
import { Alert } from 'react-native';

export const validateLogin = async (
  data: { cns: string; cpf: string },
  navigation: any
) => {
  try {
    const { cns, cpf } = data;

    // Abre o banco de dados de forma assíncrona
    const db = await SQLite.openDatabaseAsync('banco.db');

    // Consulta SQL para verificar se o CNS e CPF combinam
    const result = await db.getAllAsync(
      'SELECT * FROM pacientes WHERE cartaoSus = ? AND cpf = ?',
      [cns, cpf]
    );

    if (result.length > 0) {
      const user = result[0]; // Primeiro registro encontrado
      console.log('Usuário autenticado:', user); // Aqui você verá o log no console
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      navigation.navigate('HomeScreen', { user }); // Navega para a tela de home passando os dados do usuário
      return { success: true, user };
    } else {
      console.warn('CNS e CPF não coincidem.'); // Mensagem de alerta no console
      Alert.alert('Erro', 'CNS e CPF não coincidem ou estão incorretos.');
      return { success: false };
    }
  } catch (error) {
    console.error('Erro ao validar login:', error);
    Alert.alert('Erro', 'Ocorreu um erro ao validar os dados.');
    return { success: false, error };
  }
};
