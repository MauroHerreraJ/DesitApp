import { View, TouchableOpacity, Text, TouchableWithoutFeedback, Keyboard, TextInput, ActivityIndicator } from "react-native";
import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { GlobalStyles } from "../constans/Colors";
import { postUserData } from "../util/Api";
import { MaterialIcons } from "@expo/vector-icons";

import IconButton from "../UI/IconButton";
import SaveButton from "../component/SaveButton";
import AsyncStorage from "@react-native-async-storage/async-storage";


function Configuration() {

    const navigation = useNavigation();
    const [licencias, setLicencias] = useState()
    const [result,setResult]= useState(null)

    // const [isButtonEnabled, setIsButtonEnabled] = useState(false)
    // useEffect(() => {
    //     if (licencias.nombre && licencias.documento && licencias.codlincencia) {
    //         setIsButtonEnabled(true);
    //     } else {
    //         setIsButtonEnabled(false);
    //     }
    // }, [licencias]);
 

    const [isLoading, setIsLoading] = useState(false);


    const handleChange = (name, value) => {
        setLicencias({ ...licencias, [name]: value });
    }

   

    const saveData = async () => {
        try {
          const result = await postUserData(licencias);
          setResult(result)
          console.log('Respuesta del servidor:', result);
        } catch (error) {
          console.error('Error al hacer el POST:', error);
        }
      };
    

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
        <ImageBackground
            // source={require('../assets/civico.jpg')}
            // resizeMode="cover"
            // style={styles.rootScreen}
            // imageStyle={styles.backgroundImage}
        >
            {isLoading ? ( // Mostrar el ActivityIndicator si isLoading es true
                <View style={styles.containerActivity}>
                    <ActivityIndicator size="large" color="#ffffff" />
                </View>
            ) : (
                <>
                    <View style={styles.imputContainer}>
                        <View>
                            {/* <View>
                                <Text style={styles.text}>Código de Alta</Text>
                                <View style={styles.textContainer}>
                                    <TextInput
                                        style={styles.textImput}
                                        placeholder='Ingrese código de alta'
                                        onChangeText={(text) => handleChange("codAlta", text)}
                                        value={licencias}
                                    />
                                    <MaterialIcons name={"vpn-key"} size={24} color="#000" style={styles.icon} />
                                </View>
                            </View> */}
                            <View>
                                <Text style={styles.text}>Nombre</Text>
                                <View style={styles.textContainer}>
                                    <TextInput
                                        style={styles.textImput}
                                        placeholder='Ingrese Nombre'
                                        onChangeText={(text) => handleChange("name", text)}
                                        value={licencias}
                                    />
                                    <MaterialIcons name={"person"} size={24} color="#000" style={styles.icon} />
                                </View>
                            </View>
                            {/* <View>
                                <Text style={styles.text}>Apellido</Text>
                                <View style={styles.textContainer}>
                                    <TextInput
                                        style={styles.textImput}
                                        placeholder='Ingrese Apellido'
                                        onChangeText={(text) => handleChange("Apellido", text)}
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
                                        onChangeText={(text) => handleChange("Documento", text)}
                                        value={licencias}
                                    />
                                    <MaterialIcons name={"subtitles"} size={24} color="#000" style={styles.icon} />
                                </View>
                            </View>
                            <View>
                                <Text style={styles.text}>Dirección</Text>
                                <View style={styles.textContainer}>
                                    <TextInput
                                        style={styles.textImput}
                                        placeholder='Ingrese su dirección'
                                        onChangeText={(text) => handleChange("Direccion", text)}
                                        value={licencias}
                                    />
                                    <MaterialIcons name={"subtitles"} size={24} color="#000" style={styles.icon} />
                                </View>
                            </View>
                            <View>
                                <Text style={styles.text}>Barrio</Text>
                                <View style={styles.textContainer}>
                                    <TextInput
                                        style={styles.textImput}
                                        placeholder='Ingrese su barrio'
                                        onChangeText={(text) => handleChange("Barrio", text)}
                                        value={licencias}
                                    />
                                    <MaterialIcons name={"subtitles"} size={24} color="#000" style={styles.icon} />
                                </View>
                            </View> */}
                            {/* <View>
                                <Text style={styles.text}>Número de equipo</Text>
                                <View style={styles.textContainer}>
                                    <TextInput
                                        style={styles.textImput}
                                        placeholder='Ingrese número de equipo'
                                        onChangeText={(text) => handleChange("equipo", text)}
                                        value={licencias}
                                    />
                                    <MaterialIcons name={"vpn-key"} size={24} color="#000" style={styles.icon} />
                                </View>
                            </View> */}
                        </View>
                    </View>
{/* 
                    <View style={styles.buttonContainer1}>
                        <TouchableOpacity style={styles.buttonUpdateI} onPress={Borrar}>
                            <Text>Borrar</Text>
                        </TouchableOpacity>
                    </View> */}

                    <View style={styles.buttonContainer}>
                        <SaveButton onPress={saveData} />
                        {result && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: 'bold' }}>Resultado del servidor:</Text>
          <Text>{JSON.stringify(result, null, 2)}</Text>
        </View>
      )}
                    </View>
                    <View>
                 
                    </View>
                </>
            )}
        </ImageBackground>
    );
}
export default Configuration;

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
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
        marginTop: 20,
    },
    imputContainer: {
        padding: 1,
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
    backgroundImage: {
        opacity: 1,
    }
})