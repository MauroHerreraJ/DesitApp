import { View, StyleSheet, ImageBackground,Alert } from "react-native";
import { styles1,styles2,styles3,styles4 } from "../constans/Styles";
import * as SMS from 'expo-sms';

import PrimaryButton from "../component/PrimaryButton";
import SecondaryButton from "../component/SecondaryButton";



  const AllButtons = () => {

    const sendSms = async () => {
      const { result } = await SMS.sendSMSAsync(
        ['3513869148'], // Número de teléfono al que enviar el SMS
        'Hola, este es un mensaje de prueba!' // Contenido del SMS
      );
      if (result === 'sent') {
        Alert.alert('SMS enviado');
      } else {
        Alert.alert('Error al enviar SMS');
      }
    };
  
  return (
    <>
            <ImageBackground
                source={require('../assets/civico.jpg')}
                resizeMode="cover"
                style={styles.rootScreen}>
                <View style={styles.seconButtonContainer}>
                    <SecondaryButton onPress={sendSms} name={"wb-sunny"} styles={styles1.buttonContainer}
                        text={"Encender"}
                        text2={"Reflector"} />
                    <SecondaryButton onPress={sendSms} name={"notifications-active"} styles={styles2.buttonContainer}
                        text={"Encender"}
                        text2={"Sirena"} />
                </View>
                <View style={styles.lowSeconButtonContainer}>
                    <SecondaryButton onPress={sendSms} name={"pause-circle"} styles={styles3.buttonContainer}
                        text={""}
                        text2={"Desactivar"} />
                    <SecondaryButton onPress={sendSms} name={"telegram"} styles={styles4.buttonContainer}
                        text={"Enviar"}
                        text2={"Mensaje"} />
                </View>
                <View style={styles.primaryButtonContainer}>
                    <PrimaryButton onPress={sendSms} />
                </View>
            </ImageBackground>
        </>
    );
  }
export default AllButtons;

const styles = StyleSheet.create({
    primaryButtonContainer: {
        marginTop:20
    },
    seconButtonContainer: {
        marginTop:70,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    lowSeconButtonContainer: {
      marginTop:10,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
  },
    
    rootScreen: {
        flex: 1
    }
})