import React from 'react';
import { View, Image, StyleSheet, ImageSourcePropType, TouchableOpacity } from 'react-native';

interface FooterProps {
  icons: ImageSourcePropType[];
  onClosePress?: () => void;
}

const Footer: React.FC<FooterProps> = ({ icons, onClosePress }) => {
  return (
    <View style={styles.footer}>
    {icons.map((icon, index) => (
      <TouchableOpacity key={index} onPress={() => {
        if (index === icons.length - 1 && onClosePress) {
          onClosePress();
        }
      }}>
        <Image source={icon} style={styles.icon} />
      </TouchableOpacity>
    ))}
  </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    height: 60,
    width: '100%',
    backgroundColor: '#031230',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default Footer;