import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import UserCard from '../components/UserCard';
import Cards from '../components/Cards';
import Footer from '../components/Footer';

// Dados fictícios para os cards, que podem ser passados ou atualizados conforme necessário
const cardData = [
  {
    iconSource: require('../assets/images/logo_enfermagem.png'),
    title: 'Enfermagem',
    subtitle: 'Primeiro Atendimento',
  },
  {
    iconSource: require('../assets/images/logo_especialista.png'),
    title: 'Médico',
    subtitle: 'Agende Consulta com o Médico Especialista',
  },
  {
    iconSource: require('../assets/images/logo_medicine.png'),
    title: 'Medicamentos',
    subtitle: 'Solicite seus Medicamentos',
  },
  {
    iconSource: require('../assets/images/logo_vacinacao.png'),
    title: 'Vacinação',
    subtitle: 'Agende sua Vacinação',
  },
  {
    iconSource: require('../assets/images/logo_healthcare.png'),
    title: 'Minha Saúde',
    subtitle: 'Seu Histórico de Saúde',
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Pegando o usuário da rota
  const { user } = route.params;  // O usuário é passado da tela de login para a HomeScreen

  // Função para editar o cadastro do usuário
  const handleEditPress = () => {
    navigation.navigate('EditRegisterScreen', { userId: user.id });
  };

  // Função para fechar o aplicativo (placeholder para futura funcionalidade)
  const handleClosePress = () => {
    Alert.alert(
      'Fechar Aplicativo',
      'Esta funcionalidade ainda não está disponível. Por favor, minimize ou feche o aplicativo manualmente.',
      [{ text: 'Entendido', onPress: () => {} }]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header com a cor de fundo, você pode adicionar conteúdo aqui */}
      <View style={styles.header} />
      
      {/* Passando o nome do usuário, o cartão SUS, e outros dados para o UserCard */}
      <UserCard
        userLogo={require('../assets/icons/UserC.png')}
        companyLogo={require('../assets/images/logo_saude_facil.png')}
        companyName="SAÚDE FÁCIL"
        userName={user.name} // Passando o nome do usuário
        cardNumber={user.cartaoSus}  // Passando o cartão Sus
        onEditPress={handleEditPress}  // Função de edição do cadastro
      />
      
      {/* Cards de funcionalidade */}
      <View style={styles.containerCards}>
        {cardData.map((card, index) => (
          <Cards key={index} {...card} />
        ))}
      </View>
      
      {/* Footer com ícones de navegação */}
      <Footer
        icons={[
          require('../assets/icons/HomeBlue.png'),
          require('../assets/icons/UserC.png'),
          require('../assets/icons/Message.png'),
          require('../assets/icons/Settings.png'),
          require('../assets/icons/Close.png'),
        ]}
        onClosePress={handleClosePress}  // Fechar o aplicativo
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: '20%',
    backgroundColor: '#031230',
    width: '100%',
  },
  containerCards: {
    flex: 1,
    width: '88%',
    marginTop: 80,  // Distância dos cards após o UserCard
  },
});

export default HomeScreen;
