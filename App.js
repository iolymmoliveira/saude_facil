import React from 'react';
import LoginScreen from './screens/LoginScreen';
import { StyleSheet } from 'react-native';
import globalStyles from './global.css';

StyleSheet.create(globalStyles);

export default function App() {
  return (
    <LoginScreen />
  );
}
