import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

import UserCard from '../components/UserCard';
import Cards from '../components/Cards';
import Footer from '../components/Footer';

// Dados fictícios para os cards
const cardData = [
  { iconSource: require('../assets/images/logo_enfermagem.png'), title: 'Enfermagem', subtitle: 'Primeiro Atendimento' },
  { iconSource: require('../assets/images/logo_especialista.png'), title: 'Médico', subtitle: 'Agende Consulta com o Médico Especialista' },
  { iconSource: require('../assets/images/logo_medicine.png'), title: 'Medicamentos', subtitle: 'Solicite seus Medicamentos' },
  { iconSource: require('../assets/images/logo_vacinacao.png'), title: 'Vacinação', subtitle: 'Agende sua Vacinação' },
  { iconSource: require('../assets/images/logo_healthcare.png'), title: 'Minha Saúde', subtitle: 'Seu Histórico de Saúde' },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Garantir que route.params tenha o parâmetro 'user' e que 'user' não seja undefined
  const { user } = route.params || {};  // Se 'route.params' não existir, 'user' será undefined

  // Garantir que o 'user' seja um objeto válido antes de usá-lo
  const [currentUser, setCurrentUser] = useState(user || { name: 'Nome não disponível', cartaoSus: '', id: null });

  // Função para editar o cadastro do usuário
  const handleEditPress = () => {
    navigation.navigate('EditRegisterScreen', { userId: currentUser.id, updateUser: setCurrentUser });
  };

  // Atualizando o estado quando os parâmetros de navegação mudam (ex: após salvar as alterações)
  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.updatedUser) {
        setCurrentUser(route.params.updatedUser);
      }
    }, [route.params?.updatedUser])
  );

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
      
      {/* Passando o estado atualizado do usuário */}
      <UserCard
        userLogo={require('../assets/icons/UserC.png')}
        companyLogo={require('../assets/images/logo_saude_facil.png')}
        companyName="SAÚDE FÁCIL"
        userName={currentUser.name} // Passando o nome atualizado
        cardNumber={currentUser.cartaoSus} // Passando o cartão SUS atualizado
        userId={currentUser.id} // Passando o ID
        onEditPress={handleEditPress}
      />
      
      {/* Cards de funcionalidade */}
      <View style={styles.containerCards}>
        {cardData.map((card, index) => (
          <Cards key={index} {...card} />
        ))}
      </View>
      
      <Footer
        icons={[
          require('../assets/icons/HomeBlue.png'),
          require('../assets/icons/UserC.png'),
          require('../assets/icons/Message.png'),
          require('../assets/icons/Settings.png'),
          require('../assets/icons/Close.png'),
        ]}
        onClosePress={handleClosePress} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#FFFFFF' },
  header: { height: '20%', backgroundColor: '#031230', width: '100%' },
  containerCards: { flex: 1, width: '88%', marginTop: 80 },
});

export default HomeScreen;
