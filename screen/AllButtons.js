import { View, StyleSheet, ImageBackground,Alert,Dimensions,Vibration} from "react-native";
import { styles1,styles2,styles3,styles4 } from "../constans/Styles";
import * as SMS from 'expo-sms';

import PrimaryButton from "../component/PrimaryButton";
import SecondaryButton from "../component/SecondaryButton";

  const AllButtons = ({navigation}) => {

    const sendSms = async () => {
      Vibration.vibrate(500)
      const { result } = await SMS.sendSMSAsync(
        ['1165336342'], // Número de teléfono al que enviar el SMS
        'EVT;0052;120;0' // Contenido del SMS
      );
      if (result === 'sent') {
        Alert.alert('SMS enviado');
      }
    };
    const sendSmsLight = async () => {
      Vibration.vibrate(500)
      const { result } = await SMS.sendSMSAsync(
        ['1165336342'], // Número de teléfono al que enviar el SMS
        'EVT;0052;101;0' // Contenido del SMS
      );
      if (result === 'sent') {
        Alert.alert('SMS enviado');
      }
    };
    const sendSmsSiren = async () => {
      Vibration.vibrate(500)
      const { result } = await SMS.sendSMSAsync(
        ['1165336342'], // Número de teléfono al que enviar el SMS
        'EVT;0052;102;0' // Contenido del SMS
      );
      if (result === 'sent') {
        Alert.alert('SMS enviado');
      }
    };
    const sendSmsDeactivate = async () => {
      Vibration.vibrate(500)
      const { result } = await SMS.sendSMSAsync(
        ['1165336342'], // Número de teléfono al que enviar el SMS
        'EVT;0052;103;0' // Contenido del SMS
      );
      if (result === 'sent') {
        Alert.alert('SMS enviado');
      }
    };  
    const delayOn = () => {
      sendSms();
      setTimeout(async() => { 
        const  message = 'rl2:1';  
        console.log('demora On')
        await pubpush({message})}, 2000);
    }
  //   function Sms() {
  //     navigation.navigate("Message"); // Screen Contacto de emergencias
  // }
  return (
    <>
            <ImageBackground
                source={require('../assets/civico.jpg')}   
                resizeMode="cover"
                style={styles.rootScreen}>
                <View style={styles.seconButtonContainer}>
                    <SecondaryButton onPress={sendSmsLight} name={"wb-sunny"} styles={styles1.buttonContainer}
                        text={"Encender"}
                        text2={"Reflector"} />
                    <SecondaryButton onPress={sendSmsSiren} name={"notifications-active"} styles={styles2.buttonContainer}
                        text={"Encender"}
                        text2={"Sirena"} />
                </View>
                <View style={styles.lowSeconButtonContainer}>
                    <SecondaryButton onPress={sendSmsDeactivate} name={"pause-circle"} styles={styles3.buttonContainer}
                        text={""}
                        text2={"Desactivar"} />
                    {/* <SecondaryButton onPress={Sms} name={"local-post-office"} styles={styles4.buttonContainer}
                        text={"Contacto"}
                        text2={"Emergencia"} /> */}
                </View>
                <View style={styles.primaryButtonContainer}>
                    <PrimaryButton onPress={sendSms} />
                </View>
            </ImageBackground>
        </>
    );
  }
export default AllButtons;
const deviceWidth=Dimensions.get("window").width

const styles = StyleSheet.create({
    primaryButtonContainer: {
        marginTop: deviceWidth > 3000? 200:20,
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