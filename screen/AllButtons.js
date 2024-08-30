import { View, StyleSheet, ImageBackground, Vibration, ScrollView } from "react-native";
import { styles1,styles2,styles3,styles4 } from "../constans/Styles";
import { savePost } from "../util/Api";

import PrimaryButton from "../component/PrimaryButton";
import SecondaryButton from "../component/SecondaryButton";

function AllButtons() {

  const cuentaStore = 1

  const primaryButton = async () => {
    try {
      Vibration.vibrate(500);
      await savePost(
        {
          evento: "120",
          evecuenta: cuentaStore,
          detalle: "Pánico",
          critico: "1"
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  const fireButton = async () => {
    try {
      Vibration.vibrate(500);
      await savePost(
        {
          evento: "130",
          evecuenta: cuentaStore,
          detalle: "Incendio",
          critico: "1"
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  const medicButton = async () => {
    try {
      Vibration.vibrate(500);
      await savePost(
        {
          evento: "140",
          evecuenta: cuentaStore,
          detalle: "Médico",
          critico: "1"
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
            <ImageBackground
                source={require('../assets/civico.jpg')}
                resizeMode="cover"
                style={styles.rootScreen}>
                <View style={styles.seconButtonContainer}>
                    <SecondaryButton onPress={fireButton} name={"wb-sunny"} styles={styles1.buttonContainer}
                        text={"Encender"}
                        text2={"Reflector"} />
                    <SecondaryButton onPress={medicButton} name={"notifications-active"} styles={styles2.buttonContainer}
                        text={"Encender"}
                        text2={"Sirena"} />
                </View>
                <View style={styles.lowSeconButtonContainer}>
                    <SecondaryButton onPress={fireButton} name={"pause-circle"} styles={styles3.buttonContainer}
                        text={""}
                        text2={"Desactivar"} />
                    <SecondaryButton onPress={medicButton} name={"telegram"} styles={styles4.buttonContainer}
                        text={"Enviar"}
                        text2={"Mensaje"} />
                </View>
                <View style={styles.primaryButtonContainer}>
                    <PrimaryButton onPress={primaryButton} />
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