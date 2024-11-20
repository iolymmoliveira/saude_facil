import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import LogoImage from "../components/LogoImage";
import Title from "../components/Title";
import { useNavigation } from "@react-navigation/native";

const SkeletonLoader = () => {
  const AnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const circleAnimated = () => {
      AnimatedValue.setValue(0);
      Animated.timing(AnimatedValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => {
        circleAnimated();
      });
    };

    circleAnimated();  
  }, [AnimatedValue]);

  const loaderX = AnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 100]
  });

  return (
    <View style={styles.loaderContainer}>
      <View style={styles.loader}>
        <Animated.View
          style={{
            width: '200%',
            height: '100%',
            opacity: 1,
            backgroundColor: '#5A85D9',
            transform: [{ translateX: loaderX }]
          }}
        />
      </View>
    </View>
  );
};

export default function App() {
  const navigation = useNavigation();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      navigation.navigate('InitialScreen');
    }, 1500);
    return () => clearTimeout(timeOut);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LogoImage source={require('../assets/images/logo_saude_facil.png')} />
      <Title text="SAÚDE FÁCIL" />
      <SkeletonLoader />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#031230",
    alignItems: "center",
    justifyContent: "center",
  },
  loaderContainer: {
    marginTop: 20,
    width: 60,
    height: 60,
  },
  loader: {
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    backgroundColor: '#FFFFFF', 
    overflow: 'hidden' 
  }
});

