import React from 'react';
import { View, TextInput, Text } from 'react-native';

interface InputProps {
  label: string;
  icon?: string;
  type: 'text' | 'date';
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
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default Input;