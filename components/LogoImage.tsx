import React from 'react';
import { Image, ImageSourcePropType, StyleSheet } from 'react-native';

const LogoImage: React.FC<{ source: ImageSourcePropType }> = ({ source }) => {
  return <Image source={source} style={styles.image} />;
}

const styles = StyleSheet.create({
    image:{
    width: 400,
    height: 400,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"

    },
});

export default LogoImage;
