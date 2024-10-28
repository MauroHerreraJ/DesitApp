import { Text, View, TextInput, StyleSheet, Pressable, Vibration, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import * as SMS from 'expo-sms';

function MessageConfig() {

    const [Number, SetNumber] = useState({
        number: "",
    });

    const [Message, SetMessage] = useState({
        message: "",
    });

    const sendSms = async () => {
        // Validación para asegurar que el número y el mensaje no estén vacíos
        if (!Number.number) {
            Alert.alert("Error", "Por favor, ingresa un número de teléfono válido.");
            return;
        }
        if (!Message.message) {
            Alert.alert("Error", "Por favor, ingresa un mensaje.");
            return;
        }

        try {
            Vibration.vibrate(500);
            const { result } = await SMS.sendSMSAsync(
              [Number.number], // Usar el número de teléfono ingresado
              Message.message  // Usar el mensaje ingresado
            );
            if (result === 'sent') {
              Alert.alert('SMS enviado');
            } else {
             
            }
        } catch (error) {
            console.error("Error enviando SMS: ", error);
            Alert.alert("Error", "Ocurrió un error al intentar enviar el SMS.");
        }
    };

    const delayOn = () => {
        sendSms();
        setTimeout(async() => { 
          const message = 'rl2:1';  
          console.log('demora On');
          await pubpush({ message });
        }, 2000);
    };

    return (
        <>
            <Text>Contacto de Emergencia</Text>
            <View style={styles.imputContainer}>
                <View style={styles.textContainer}>
                    <TextInput
                        style={styles.textImput}
                        placeholder='Ingrese el Número de Teléfono '
                        placeholderTextColor="#616060"
                        keyboardType='phone-pad' // Añadir teclado numérico para teléfonos
                        onChangeText={(text) => SetNumber({ number: text })}
                        value={Number.number}
                    />
                    <MaterialIcons name={"phone"} size={24} color="#000" style={styles.icon} />
                </View>
                <View style={styles.textContainer}>
                    <TextInput
                        style={styles.textImput}
                        placeholder='Ingrese el mensaje a enviar '
                        placeholderTextColor="#616060"
                        onChangeText={(text) => SetMessage({ message: text })}
                        value={Message.message}
                    />
                    <MaterialIcons name={"message"} size={24} color="#000" style={styles.icon} />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable
                    onPress={sendSms}
                    style={styles.button}
                >
                    <Text style={styles.textButton}>CONTINUAR</Text>
                </Pressable>
            </View>
        </>
    );
}

export default MessageConfig;

const styles = StyleSheet.create({
    imputContainer: {
        padding: 20,
        marginTop: 5
    },
    textContainer: {
        marginTop: 3,
        marginBottom: 15,
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#ffffff",
        backgroundColor: "#ffffff",
        borderRadius: 6,
    },
    textImput: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ffffff",
        backgroundColor: "#ffffff",
        width: "100%",
        padding: 12,
        color: "#120438",
        borderRadius: 6,
    },
    icon: {
        marginRight: 10,
    },
    buttonContainer: {
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    textButton: {
        color: '#fff',
        fontSize: 16,
    },
});
