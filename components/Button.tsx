import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ButtonProps {
  text: string;
  groundColor?: string;
  textColor?: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, groundColor = '#35816A', textColor = '#FFFFFF', onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onClick}
      >
      <View style={[styles.button, { backgroundColor: groundColor}]}>
        <Text style={[styles.buttonText, { color: textColor}]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  button: {
    width: 200,
    backgroundColor: '#35816A',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'MontserratBold'
  },
});

export default Button;