import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import UserCard from '../components/UserCard';


const HomeScreen = () => {
    const handleEditPress = () => {
        Alert.alert('Editar', 'Você clicou no ícone de edição!');
      };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
            </View>
        <UserCard
            userLogo= {require('../assets/icons/UserC.png')}
            userName="Ana Maria" 
            companyLogo= {require('../assets/images/logo_saude_facil.png')}
            companyName="SAÚDE FÁCIL" 
            onEditPress={handleEditPress}
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
  header:{
    height: '20%',
    backgroundColor: '#031230',
    width: '100%',
  }
});

export default HomeScreen;