import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import UserCard from '../components/UserCard';
import Cards from '../components/Cards';
import Footer from '../components/Footer';

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

  const handleEditPress = () => {
    navigation.navigate('EditRegisterScreen', { userId });
  };

  const handleClosePress = () => {
    Alert.alert(
      'Fechar Aplicativo',
      'Esta funcionalidade ainda não está disponível. Por favor, minimize ou feche o aplicativo manualmente.',
      [{ text: 'Entendido', onPress: () => {} }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <UserCard
        userLogo={require('../assets/icons/UserC.png')}
        userName="Ana Maria"
        companyLogo={require('../assets/images/logo_saude_facil.png')}
        companyName="SAÚDE FÁCIL"
        onEditPress={handleEditPress}
      />
      <View style={styles.containerCards}>
        {cardData.map((card, index) => (
          <Cards
            key={index}
            {...card}
          />
        ))}
      </View>
      <Footer
        icons={[
          require('../assets/icons/HomeBlue.png'),
          require('../assets/icons/UserC.png'),
          require('../assets/icons/Message.png'),
          require('../assets/icons/Settings.png'),
          require('../assets/icons/Close.png')
        ]}
        onClosePress={handleClosePress}
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
    marginTop: 80,
  },
});

export default HomeScreen;