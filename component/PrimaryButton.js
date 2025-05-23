import { View, Pressable, StyleSheet, Platform, Text } from "react-native"
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../constans/Colors";

function PrimaryButton({ onPress, onPressIn, onPressOut }) {
    return <View >
        <Pressable 
        onPress={onPress} 
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={({ pressed }) => pressed && styles.pressed}>
            <View style={styles.buttonContainer}>
                <Ionicons name="warning" size={90} color="white" />
                <Text style={styles.textButton}>Pánico</Text>
            </View>
        </Pressable>
    </View>
}

export default PrimaryButton;

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 40,
        margin: 10,
        borderRadius: 26,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        backgroundColor: GlobalStyles.colors.titlecolor,
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        alignItems: "center"
    },
    pressed: {
        opacity: 0.5
    },
    textButton: {
        color: "white",
        fontSize: 17,
        width: "100%",
        textAlign: "center"
    }
})