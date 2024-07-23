import { View, StyleSheet, Text, Pressable } from "react-native";

function SaveButton({ onPress, isEnabled }) {


    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable
                style={[styles.buttonInnerContainer, !isEnabled&& styles.pressed]}
                onPress={onPress}
                disabled={!isEnabled}
                android_ripple={{ color: "#222266" }}
            > 
                <Text style={styles.buttonText}>Guardar</Text>
            </Pressable>
        </View>
    );
}
export default SaveButton;

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 10, 
        margin: 4,
        overflow: "hidden",
        marginTop: 230
    },
    buttonInnerContainer: {
        backgroundColor: "#0b0b61",
        paddingVertical: 18,
        paddingHorizontal: 16,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontSize: 18
    },
    pressed: {
        opacity: 0.55
    }
});