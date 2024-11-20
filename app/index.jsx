
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import LogoImage from "../components/LogoImage";
import Title from "../components/Title";
import { useNavigation } from "@react-navigation/native";

export default function App() {

  const SkeletonLoader = () => {
    return (
      <View style={styles.loaderContainer}>
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
            <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
            <SkeletonPlaceholder.Item marginLeft={20}>
              <SkeletonPlaceholder.Item width={120} height={20} borderRadius={4} />
              <SkeletonPlaceholder.Item marginTop={6} width={80} height={20} borderRadius={4} />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </View>
    );
  };

  const navigation = useNavigation();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      navigation.navigate('InitialScreen');
    }, 5000);
    return () => clearTimeout(timeOut);
  }, []);

  return (
    <View style={styles.container}>
      <LogoImage source={require('../assets/images/logo_saude_facil.png')}/>
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
  },

});
