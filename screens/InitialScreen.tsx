import React, {useState} from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import LogoImage from "../components/LogoImage";
import Title from "../components/Title";

export default function InitialScreen() {
    const [selectedButton, setSelectedButton] = useState<string | null>(null);
    return (

        <View style={styles.container}>
            <View style={styles.content}>
                <LogoImage source={require('../assets/images/logo_saude_facil.png')}
            />
            <Title text="SAÚDE FÁCIL" />
            
            <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            selectedButton === 'entrar' && styles.selectedButton
                        ]}
                        onPress={() => setSelectedButton('entrar')}
                    >
                        <Text style={[
                            styles.buttonText,
                            selectedButton === 'entrar' && styles.selectedButtonText
                        ]}>
                            Entrar
                        </Text>
                    </TouchableOpacity>
                
                    <TouchableOpacity
                        style={[
                            styles.button,
                            selectedButton === 'criarConta' && styles.selectedButton
                        ]}
                        onPress={() => setSelectedButton('criarConta')}
                        >
                        <Text style={[
                            styles.buttonText,
                            selectedButton === 'criarConta' && styles.selectedButtonText
                        ]}>
                            Criar Conta
                        </Text>
                    </TouchableOpacity>
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
    button: {
        backgroundColor: "#FFF",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginVertical: 10, 
        width: 200, 
        alignItems: "center",
    },
    selectedButton: {
        backgroundColor: "#35816A",
      },
      buttonText: {
          color: "#031230",
          fontWeight: "bold",
      },
       
    selectedButtonText: {
        color: "#FFF",
        fontWeight: "bold",
    },
});