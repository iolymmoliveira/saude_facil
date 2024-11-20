import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType, TouchableOpacity } from 'react-native';

interface HeaderProps {
  icon: ImageSourcePropType;
  logo: ImageSourcePropType;
  title: string;
  onBackPress?: () => void
}

const Header: React.FC<HeaderProps> = ({ icon, logo, title, onBackPress }) => {
  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={onBackPress}>
          <Image source={icon} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
        <Image source={logo} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 110,
    backgroundColor: '#031230',
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  icon: {
    width: 36,
    height: 36,
    marginBottom: 10,
    marginTop: 25
  },
  logo: {
    width: 90,
    height: 90,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10
  },
});

export default Header;
