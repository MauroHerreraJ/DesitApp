import { View, StyleSheet, ImageBackground,Vibration } from "react-native";
import { styles1 } from "../constans/Styles";
import { styles2 } from "../constans/Styles";
import { savePost } from "../util/Api";

import PrimaryButton from "../component/PrimaryButton";
import SecondaryButton from "../component/SecondaryButton";

function AllButtons() {

    const cuentaStore = 1
   
      const primaryButton = async () => {
        try {      
          Vibration.vibrate(500),
                  
          savePost(
            {
              evento: "120",
              evecuenta: cuentaStore,      
              detalle: "Pánico",
              critico:  "1"
            }
          )        
        } catch (error) {
          console.log(error);
      };} 
      
      const fireButton = async () => {
        try {      
          Vibration.vibrate(500),
                  
          savePost(
            {
              evento: "130",
              evecuenta: cuentaStore,      
              detalle: "Incendio",
              critico:  "1"
            }
          )        
        } catch (error) { 
          console.log(error);
      };}      

      const medicButton = async () => {
        try {      
          Vibration.vibrate(500),
                  
          savePost(
            {
              evento: "140",
              evecuenta: cuentaStore,      
              detalle: "Médico",
              critico:  "1"
            }
          )        
        } catch (error) {
          console.log(error);
      };}      

    return (
        <>
            <ImageBackground
                source={require('../assets/126353.jpg')}
                resizeMode="cover"
                style={styles.rootScreen}>
                <View style={styles.seconButtonContainer}>
                    <SecondaryButton onPress={fireButton} name={"local-fire-department"} styles={styles1.buttonContainer}
                        text={"Alerta"}
                        text2={"Incendio"} />
                    <SecondaryButton onPress={medicButton} name={"local-hospital"} styles={styles2.buttonContainer}
                        text={"Emergencia"}
                        text2={"Médica"} />
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
        flex: 0.8
    },
    seconButtonContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    rootScreen: {
        flex: 1
    }
})