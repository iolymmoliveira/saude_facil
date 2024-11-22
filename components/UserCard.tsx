import React, { useState, useEffect } from 'react';
import { ImageSourcePropType } from 'react-native';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 



interface UserCardProps {
  userLogo: ImageSourcePropType;
  companyLogo: ImageSourcePropType;
  companyName: string;
  onEditPress: (userId: number) => void;
  userName: string;  // Recebendo o nome do usuário
  cardNumber: string;  // Recebendo o número do cartão SUS
  userId: number;  // Recebendo o ID do usuário
}

const UserCard: React.FC<UserCardProps> = ({ 
  userLogo, 
  companyLogo, 
  companyName, 
  onEditPress, 
  userName, 
  cardNumber, 
  userId 
}) => {

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={userLogo} style={styles.userLogo} />
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <View style={styles.companyInfo}>
          <Image source={companyLogo} style={styles.companyLogo} />
          <Text style={styles.companyName}>{companyName}</Text>
        </View>
      </View>
      <View style={styles.cardNumberContainer}>
        <Text style={styles.nomeCartao}>Nº do cartão:</Text>
        <TextInput
          style={styles.cardNumberInput}
          value={cardNumber}
          editable={false}
        />
        <TouchableOpacity onPress={() => onEditPress(userId)}>
          <Icon name="edit" size={24} color="#000" style={styles.editIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#5A85D9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    width: '88%',
    alignSelf: 'center',
    position: 'absolute',
    top: '3%',
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  userInfo: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  userLogo: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  userName: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  companyInfo: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: "center",
    marginLeft: 80,
    marginTop: -10,
  },
  companyLogo: {
    width: 90,
    height: 90,
    marginRight: 10,
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cardNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardNumberInput: {
    marginLeft: 10,
    flex: 1,
    color: '#FFFFFF',
  },
  nomeCartao: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  editIcon: {
    marginLeft: 10,
    color: '#FFFFFF',
    marginRight: 10,
  },
});

export default UserCard;

