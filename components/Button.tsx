import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ButtonProps {
  text: string;
  groundColor?: string;
  textColor?: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, groundColor = '#35816A', textColor = '#FFFFFF', onClick }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onClick}>
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
    justifyContent: 'center'
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
    fontSize: 16,
    fontWeight: '600'
  },
});

export default Button;