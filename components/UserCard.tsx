import React, { useState, useEffect } from 'react';
import { ImageSourcePropType } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface UserCardProps {
  userLogo: ImageSourcePropType;
  companyLogo: ImageSourcePropType;
  companyName: string,
  onEditPress: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ userLogo, companyLogo, companyName, onEditPress }) => {
  // const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState({ userId: 123 }); // Replace 123 with your desired ID
  const [userName, setUserName] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const db = SQLite.openDatabaseSync('banco.db');
        const db = await SQLite.openDatabaseSync('banco.db', {
          useNewConnection: true
        });

        db.transaction(tx => {
          tx.executeSql(
            'SELECT id, nome, cartaoSus FROM pacientes',
            [],
            (_, { rows: { _array } }) => {
              if (_array.length > 0) {
                setUserName(_array[0].nome || '');
                setCardNumber(_array[0].cartaoSus || '');
                setUserId(_array[0].id);
              } else {
                console.log('Nenhum dado encontrado');
              }
            },
            (_, error) => {
              console.error('Erro ao buscar dados:', error);
              return false;
            }
          );
        });
      } catch (error) {
        console.error('Erro ao abrir o banco de dados:', error);
      }
    };

    fetchData();
  }, []);

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