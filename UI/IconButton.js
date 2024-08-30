import { Pressable } from "react-native";
import {Ionicons} from "@expo/vector-icons";

function IconButton({onPress}){
  return(
    <Pressable onPress={onPress} style={{marginRight:20}}>
        <Ionicons name="alert-circle-outline" size={30} color="black" />
    </Pressable>
  )
}
export default IconButton;