import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';

interface CardsProps {
    iconSource: ImageSourcePropType;
    title: string;
    subtitle: string;
  }

const Cards: React.FC<CardsProps>= ({ iconSource, title, subtitle }) => {
  return (
    <View style={styles.card}>
      <Image source={iconSource} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    padding: 10,
    borderRadius: 10,
    width: '100%',
    marginBottom: 10,
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  textContainer: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000'
  },
  subtitle: {
    fontSize: 14,
    color: '#000000',
  },
});

export default Cards;