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
    <View style={styles.containerInput}>
      <Text style={styles.label}>{label}</Text>
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
  containerInput: {
    paddingTop: 8,
    paddingBottom: 8,
    fontFamily: 'MontserratRegular',
    fontSize: 14,
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    height: 50,
    marginTop: 8
  },
  label: {
    marginTop: 10,
  }
});

export default Input;