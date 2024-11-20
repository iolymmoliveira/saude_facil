import React from 'react';
import { View, Image, StyleSheet, ImageSourcePropType } from 'react-native';

interface FooterProps {
  icons: ImageSourcePropType[]; // Array of icon image sources
}

const Footer: React.FC<FooterProps> = ({ icons }) => {
  return (
    <View style={styles.footer}>
      {icons.map((icon, index) => (
        <Image key={index} source={icon} style={styles.icon} />
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