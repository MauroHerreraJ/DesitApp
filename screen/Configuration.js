import { View, Text, Button, TextInput, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { GlobalStyles } from "../constans/Colors";
import { postUserData } from "../util/Api";
import { MaterialIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import SaveButton from "../component/SaveButton";
import AsyncStorage from "@react-native-async-storage/async-storage";


function Configuration() {

    const navigation = useNavigation();
    const [licencias, setLicencias] = useState({
        panicAppCode: "",
        targetDeviceCode: "",
        accountNumber: "",
        Nombre: "",
        Apellido: "",
        Documento: "",
        Direccion: "",
        Barrio: ""
    });

    const [currentStep, setCurrentStep] = useState(1);
    const [result, setResult] = useState(null)
    const [isButtonEnabled, setIsButtonEnabled] = useState(false)
    useEffect(() => {
        if (licencias.panicAppCode && licencias.targetDeviceCode && licencias.accountNumber && licencias.Nombre && licencias.Apellido && licencias.Documento && licencias.Direccion && licencias.Barrio) {
            setIsButtonEnabled(true);
        } else {
            setIsButtonEnabled(false);
        }
    }, [licencias]);


    const [isLoading, setIsLoading] = useState(false);


    const handleChange = (name, value) => {
        setLicencias({ ...licencias, [name]: value });
    }

    const saveData = async () => {
        // Construir el array que espera el servidor
        const data = {
            panicAppCode: licencias.panicAppCode,
            targetDeviceCode: licencias.targetDeviceCode,
            accountNumber: licencias.accountNumber,
            userCustomFields: [
                {
                    Nombre: licencias.Nombre
                },
                {
                    Apellido: licencias.Apellido
                },
                {
                    Documento: licencias.Documento
                },
                {
                    Direccion: licencias.Direccion
                },
                {
                    Barrio: licencias.Barrio
                }
            ]
        }
        try {
            setIsLoading(true);
            console.log('Datos enviados al servidor:', data);
            const result = await postUserData(data);  // Enviar el array
            setResult(result);
            await AsyncStorage.setItem('@licencias', JSON.stringify(result));
            console.log("Datos Guardados");
            navigation.replace('Principal');

            console.log('Respuesta del servidor:', result);
        } catch (error) {
            console.error('Error al hacer el POST:', error);
        } finally {
            setIsLoading(false);
        }
    };
    // Función para avanzar al siguiente paso
    const nextStep = () => {
        if (currentStep < 3) setCurrentStep(currentStep + 1);
    };

    // Función para retroceder al paso anterior
    const previousStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    // Renderizado condicional basado en el paso actual
    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <>                  
                        <View style={styles.imputContainer}>
                            <View>
                                <Text style={styles.text}>Codigo de alta</Text>
                                <View style={styles.textContainer}>
                                    <TextInput
                                        style={styles.textImput}
                                        placeholder='Ingrese Código'
                                        onChangeText={(text) => handleChange("panicAppCode", text)}
                                        value={licencias.panicAppCode}
                                    />
                                    <MaterialIcons name={"vpn-key"} size={24} color="#000" style={styles.icon} />
                                </View>
                            </View>
                            <View>
                                <Text style={styles.text}>Número de Equipo</Text>
                                <View style={styles.textContainer}>
                                    <TextInput
                                        style={styles.textImput}
                                        placeholder='Ingrese número de equipo'
                                        onChangeText={(text) => handleChange("targetDeviceCode", text)}
                                        value={licencias.targetDeviceCode}
                                    />
                                    <MaterialIcons name={"vpn-key"} size={24} color="#000" style={styles.icon} />
                                </View>
                            </View>
                            <View>
                                <Text style={styles.text}>Número de Cuenta</Text>
                                <View style={styles.textContainer}>
                                    <TextInput
                                        style={styles.textImput}
                                        placeholder='Ingrese número de cuenta'
                                        onChangeText={(text) => handleChange("accountNumber", text)}
                                        value={licencias.accountNumber}
                                    />
                                    <MaterialIcons name={"vpn-key"} size={24} color="#000" style={styles.icon} />
                                </View>
                            </View>
                        </View>                  
                    </>
                );
            case 2:
                return (
                    <>
                     <KeyboardAwareScrollView
                     contentContainerStyle={{ flexGrow: 1 }}
                     enableOnAndroid={true}
                     extraHeight={150}>
                        <View style={styles.imputContainer}>

                            <View>
                                <Text style={styles.text}>Nombre</Text>
                                <View style={styles.textContainer}>
                                    <TextInput
                                        style={styles.textImput}
                                        placeholder='Ingrese su Nombre'
                                        onChangeText={(text) => handleChange("Nombre", text)}
                                        value={licencias.Nombre}
                                    />
                                    <MaterialIcons name={"person"} size={24} color="#000" style={styles.icon} />
                                </View>
                            </View>
                            <View>
                                <Text style={styles.text}>Apellido</Text>
                                <View style={styles.textContainer}>
                                    <TextInput
                                        style={styles.textImput}
                                        placeholder='Ingrese su Apellido'
                                        onChangeText={(text) => handleChange("Apellido", text)}
                                        value={licencias.Apellido}
                                    />
                                    <MaterialIcons name={"person"} size={24} color="#000" style={styles.icon} />
                                </View>
                            </View>
                            <View>
                                <Text style={styles.text}>Documento</Text>
                                <View style={styles.textContainer}>
                                    <TextInput
                                        style={styles.textImput}
                                        placeholder='Ingrese su documento'
                                        onChangeText={(text) => handleChange("Documento", text)}
                                        value={licencias.Documento}
                                    />
                                    <MaterialIcons name={"subtitles"} size={24} color="#000" style={styles.icon} />
                                </View>
                            </View>
                            <View>
                                <Text style={styles.text}>Direccion</Text>
                                <View style={styles.textContainer}>
                                    <TextInput
                                        style={styles.textImput}
                                        placeholder='Ingrese su direccion'
                                        onChangeText={(text) => handleChange("Direccion", text)}
                                        value={licencias.Direccion}
                                    />
                                    <MaterialIcons name={"location-on"} size={24} color="#000" style={styles.icon} />
                                </View>
                            </View>
                            <View>
                                <Text style={styles.text}>Barrio</Text>
                                <View style={styles.textContainer}>
                                    <TextInput
                                        style={styles.textImput}
                                        placeholder='Ingrese su Barrio'
                                        onChangeText={(text) => handleChange("Barrio", text)}
                                        value={licencias.Barrio}
                                    />
                                    <MaterialIcons name={"location-on"} size={24} color="#000" style={styles.icon} />
                                </View>
                            </View>
                        </View>
                        </KeyboardAwareScrollView>
                    </>
                );
            default:
                return null;
        }
    };
    return (
        <>
            {isLoading ? (
                <View style={styles.containerActivity}>
                    <ActivityIndicator size="large" color="#ffffff" />
                </View>
            ) : (
                <>
                    <View >
                        {renderStep()}
                    </View>
                    {currentStep > 1 && (
                        <View style={styles.button2}>
                            
                            <Button title="Anterior" onPress={previousStep} />
                        </View>
                    )}
                    {currentStep < 2 ? (
                        <View style={styles.button1}>
                            <Button title="Siguiente" onPress={nextStep}  />
                        </View>
                    ) : (
                        <View style={styles.button}>
                            <SaveButton onPress={saveData} isEnabled={isButtonEnabled} />
                        </View>
                    )}
                </>
            )}
        </>
    );
}

export default Configuration;

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
    },
    button: {
        marginTop: 1

    },
    buttonUpdateI: {
        paddingTop: 5,
        paddingBottom: 10,
        borderRadius: 5,
        marginTop: 30,
        backgroundColor: GlobalStyles.colors.inputcontainer,
        width: 120,
        alignContent: 'center'
    },
    buttonContainer: {
        marginHorizontal: 1,
        marginTop: 20,
    },
    imputContainer: {
        padding: 20,
        marginTop: 5
    },
    text: {
        color: "black"
    },
    container: {
        flexDirection: 'row',

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
    containerActivity: {
        flex: 1,
        justifyContent: 'center',
    },
    backgroundImage: {
        opacity: 1,
    },
    button1: {
        marginTop: 30,
        width: 189,
        height: 100,
        marginLeft: 215,
    },
    button2: {
        marginTop: 10,
        width: 189,
        height: 100,
        marginLeft: 215,
    }
})