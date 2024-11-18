import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

interface InputProps {
  label: string;
  icon?: string;
  type: any;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: any;
}

const Input: React.FC<InputProps> = ({ label, icon, value, onChangeText, keyboardType, placeholder }) => {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput 
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    height: 50,
    marginTop: 8
  }
});

export default Input;