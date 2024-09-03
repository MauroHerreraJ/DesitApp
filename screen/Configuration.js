import { View, TouchableOpacity, Text, TouchableWithoutFeedback, Keyboard, TextInput,ActivityIndicator } from "react-native";
import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { GlobalStyles } from "../constans/Colors";
import { getLicenciaId, updateLicencia } from "../util/Api";
import { MaterialIcons } from "@expo/vector-icons";

import IconButton from "../UI/IconButton";
import SaveButton from "../component/SaveButton";
import AsyncStorage from "@react-native-async-storage/async-storage";



function Configuration() {

    const navigation = useNavigation();
    const [licencias, setLicencias] = useState({
        documento: '',
        nombre: '',
        codlincencia: '',
        asignada: 'asignada',
    })

    const [isButtonEnabled, setIsButtonEnabled] = useState(false)
    useEffect(() => {
         if (licencias.nombre  && licencias.documento && licencias.codlincencia) {
             setIsButtonEnabled(true);
         } else {
             setIsButtonEnabled(false);
         }
     }, [licencias]);


    const [isLoading, setIsLoading] = useState(false);


    const handleChange = (name, value) => {
        setLicencias({ ...licencias, [name]: value });
    }

    const handleSubmit = async () => {
        setIsLoading(true); // Mostrar el ActivityIndicator al iniciar la carga

        try {
            const res = await getLicenciaId(licencias.codlincencia);
            if (res.data.length > 0) {
                const Licencia = {
                    storagelicencia: res.data[0].codlincencia,
                    storageCuenta: res.data[0].cuenta,
                    storageCentral: res.data[0].central,
                    storageAsignada: res.data[0].asignada,
                    storagecodmovil: res.data[0].codmovil,
                    storageNombre: res.data[0].nombre,
                    storageDocumento: res.data[0].documento,
                    storageId: res.data[0]._id
                };

                if (res.data[0].asignada === 'asignada') {
                    alert('La licencia que intenta utilizar se encuentra asignada a otro usuario');
                } else {
                    await AsyncStorage.setItem('@licencias', JSON.stringify(Licencia));
                    console.log("Datos Guardados");

                    await updateLicencia(res.data[0]._id, licencias);
                    navigation.replace('Principal');
                }
            } else {
                console.log("No se encuentran datos");
            }
        } catch (error) {
            console.error("Error al cargar los datos", error);
        } finally {
            setIsLoading(false); // Ocultar el ActivityIndicator al finalizar la carga
        }
    };

    function saveData() {
        handleSubmit();
        console.log(licencias);
    }

    function modalHandler() {
        navigation.navigate("User");
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <IconButton title="Tap me" onPress={modalHandler} />
        });
    }, [navigation, modalHandler]);

    const Borrar = async () => {
        await AsyncStorage.removeItem('@licencias');
        console.log('borrado');
    };


    return (
        <ImageBackground source={require('../assets/fondoApp5.jpg')} resizeMode="cover" style={styles.rootScreen}>
            {isLoading ? ( // Mostrar el ActivityIndicator si isLoading es true
                <View style={styles.containerActivity}>
                <ActivityIndicator size="large" color="#ffffff" />
                </View>
            ) : (

            <>
                <View style={styles.imputContainer}>
                    <View>
                        <View>
                            <Text style={styles.text}>Apellido/Nombre</Text>
                            <View style={styles.textContainer}>
                                <TextInput
                                    style={styles.textImput}
                                    placeholder='Ingrese Apellido/Nombre'
                                    onChangeText={(text) => handleChange("nombre", text)}
                                    value={licencias}
                                />
                                <MaterialIcons name={"person"} size={24} color="#000" style={styles.icon} />
                            </View>
                        </View>
                        <View>
                            <Text style={styles.text}>Documento</Text>
                            <View style={styles.textContainer}>
                                <TextInput
                                    style={styles.textImput}
                                    placeholder='Ingrese número de documento'
                                    onChangeText={(text) => handleChange("documento", text)}
                                    value={licencias}
                                />
                                <MaterialIcons name={"subtitles"} size={24} color="#000" style={styles.icon} />
                            </View>
                        </View>
                        <View>
                            <Text style={styles.text}>Código de Alta</Text>
                            <View style={styles.textContainer}>
                                <TextInput
                                    style={styles.textImput}
                                    placeholder='Ingrese código de alta'
                                    onChangeText={(text) => handleChange("codlincencia", text)}
                                    value={licencias}
                                />
                                <MaterialIcons name={"vpn-key"} size={24} color="#000" style={styles.icon} />
                            </View>
                        </View>
                    </View>
                </View>



                <View style={styles.buttonContainer1}>
                    <TouchableOpacity style={styles.buttonUpdateI} onPress={Borrar}>
                        <Text>Borrar</Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.buttonContainer}>
                    <SaveButton onPress={saveData} isEnabled={isButtonEnabled} />
                </View>
            </>
            )}
        </ImageBackground>
    );
}
export default Configuration;

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1
    },
    buttonContainer: {
        marginTop: 210,
    },
    buttonUpdateI: {
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
        marginTop: 30,
        backgroundColor: GlobalStyles.colors.inputcontainer,
        width: 120,
        alignContent: 'center'
    },
    buttonContainer: {
        marginHorizontal: 1,
        marginTop: 150,
    },
    imputContainer: {
        padding: 20,
        marginTop: 50
    },
    text: {
        color: "white"
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
})