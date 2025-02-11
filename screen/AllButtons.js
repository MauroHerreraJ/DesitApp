import { View, StyleSheet, ImageBackground, Alert, Dimensions, Vibration, Animated } from "react-native";
import { styles1, styles2, styles3, styles4 } from "../constans/Styles";
import { savePost } from "../util/Api";
import React, { useState, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";


import PrimaryButton from "../component/PrimaryButton";
import SecondaryButton from "../component/SecondaryButton";

const AllButtons = () => {
  const [showProgressBar, setShowProgressBar] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const startTimeRef = useRef(null);

  const handlePressIn = () => {
    setShowProgressBar(true);
    animatedValue.setValue(0);

    // Inicia la animación y usa el callback de start
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 900,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {

        // La barra de progreso se llenó
        enviarEvento("ALARM");
        setShowProgressBar(false);
      }
    });
  };

  const handlePressOut = () => {
    // Si se suelta antes de que la animación termine, se detiene
    animatedValue.stopAnimation();
    setShowProgressBar(false);
  };
  const barWidth = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  const enviarEvento = async (eventType) => {
    Vibration.vibrate(500);
    try {
      const result = await savePost({
        eventCode: "120"
      });
      console.log(`${eventType} enviado`, result);
    } catch (error) {
      console.error(error);
    }
  };

  const turnOnLight = async (eventType) => {
    Vibration.vibrate(500);
    try {
      const result = await savePost({
        eventCode: "122"
      });
      console.log(`${eventType} enviado`, result);
    } catch (error) {
      console.error(error);
    }
  };

  const turnOnSiren = async (eventType) => {
    Vibration.vibrate(500);
    try {
      const result = await savePost({
        eventCode: "121"
      });
      console.log(`${eventType} enviado`, result);
    } catch (error) {
      console.error(error);
    }
  };

  const disarm = async (eventType) => {
    Vibration.vibrate(500);
    try {
      const result = await savePost({
        eventCode: "104"
      });
      console.log(`${eventType} enviado`, result);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <ImageBackground
        source={require('../assets/civico.jpg')}
        resizeMode="cover"
        style={styles.rootScreen}>
           <View style={styles.seconButtonContainer}>
                    <SecondaryButton onPress={turnOnLight}  name={"wb-sunny"} styles={styles1.buttonContainer}
                        text={"Encender"}
                        text2={"Reflector"} />
                    <SecondaryButton onPress={turnOnSiren} name={"notifications-active"} styles={styles2.buttonContainer}
                        text={"Encender"}
                        text2={"Sirena"} />
                </View>
                <View style={styles.lowSeconButtonContainer}>
                    <SecondaryButton onPress={disarm} name={"pause-circle"} styles={styles3.buttonContainer}
                        text={""}
                        text2={"Desactivar"} />
                </View>

        <View style={styles.primaryButtonContainer}>
          <PrimaryButton onPressIn={handlePressIn} onPressOut={handlePressOut} />
        </View>
        {showProgressBar && (
          <View style={styles.progressBarContainer}>
            <Animated.View style={{ width: barWidth }}>
              <LinearGradient
                colors={["#0d47a1", "#0d47a1"]}
                style={styles.progressBar}
              />
            </Animated.View>
          </View>
        )}
      </ImageBackground>
    </>
  );
}
export default AllButtons;
const deviceWidth = Dimensions.get("window").width

const styles = StyleSheet.create({
  primaryButtonContainer: {
    marginTop: deviceWidth > 3000 ? 200 : 20,
  },
  seconButtonContainer: {
    marginTop: 70,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  lowSeconButtonContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  rootScreen: {
    flex: 1
  },
  progressBarContainer: {
    width: "100%",
    height: 15,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 55,
  },
  progressBar: {
    height: "100%",
    borderRadius: 8,
  },
})