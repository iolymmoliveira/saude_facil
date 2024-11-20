import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import LogoImage from "../components/LogoImage";
import Title from "../components/Title";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";

export default function InitialScreen() {
    const navigation = useNavigation();
    const [selectedButton, setSelectedButton] = useState<string | null>(null);

    const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
    navigation.navigate({
        name: buttonName === 'Entrar' ? 'LoginScreen' : 'RegisterScreen',
    });
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <LogoImage source={require("../assets/images/logo_saude_facil.png")} />
                <Title text="SAÚDE FÁCIL" />

                <View style={styles.buttonContainer}>
                    <Button
                        text="Entrar"
                        groundColor="#35816A"
                        textColor="#FFFFFF"
                        onClick={() => {
                            handleButtonClick('Entrar');
                        }}
                    />

                    <Button
                        text="Criar Conta"
                        groundColor="transparent"
                        textColor="#FFFFFF"
                        onClick={() => {
                            handleButtonClick('RegisterScreen');
                        }}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#031230",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    content: {
        alignItems: "center",
    },
    buttonContainer: {
        marginTop: 20,
    },
});
