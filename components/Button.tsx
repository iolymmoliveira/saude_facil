import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ButtonProps {
  text: string;
  groundColor?: string;
  textColor?: string;
  onClick: () => void;
  spacing?: number; // Nova propriedade para controlar o espaçamento
}

const Button: React.FC<ButtonProps> = ({ text, groundColor = '#35816A', textColor = '#FFFFFF', onClick, spacing = 6 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TouchableOpacity 
      style={[styles.container, { marginBottom: spacing }]} // Usando a propriedade spacing aqui
      onPress={onClick}
    >
      <View style={[styles.button, { backgroundColor: groundColor }]}>
        <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    fontFamily: 'MontserratBold',
  },
});

export default Button;
