import { View, Text, Image, StyleSheet, Platform, ImageBackground, Pressable } from "react-native";


function Welcome({ navigation }) {

    function pressHandler() {
        navigation.navigate("Configuration");
    }
    return (
        <>
                <View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Bienvenido!</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Pressable
                            onPress={pressHandler} 
                            style={styles.button}
                        >
                            <Text style={styles.textButton}>Continuar</Text>
                        </Pressable>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image source={require("../assets/cba-logo3.png")}
                            style={{ width: 270, height: 100}} />
                    </View>
                </View>
        </>
    )
}

export default Welcome;

const styles = StyleSheet.create({
    textContainer: {
        padding: 25,
    },
    text: {
        padding: 16,
        fontSize: 35,
        color: "#EB7F27",
        textAlign: "center",
        marginTop: 80,
        fontFamily: "open-sans-bold"
    },
    buttonContainer: {
        marginTop: 350,
         alignItems: "center"
    },
    button: {
        padding:20,
        width:250,
        height:70,
        margin: 8,
        borderRadius: 8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        backgroundColor: '#EB7F27',
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        alignItems: "center",
        opacity:0.9

    },
    textButton: {
        color: "white",
        fontSize: 20
    },
    rootScreen: {
        flex: 1
    },
   imageContainer:{
    alignItems:"center",
    marginTop:70,
    marginBottom:5
   },
   textImage: {
    textAlign: "center",
    fontSize: 14,
    color:"white"
   }
})

