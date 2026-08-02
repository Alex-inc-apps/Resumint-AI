import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const ButtonSample =({backgroundColor, text, route}) => {
    return(

        <TouchableOpacity onPress={ ()  => {

            router.push(route)
        }}
            
            style={[styles.touchableStyle,  {backgroundColor: backgroundColor,  }]}>
            <Text>{text}</Text>

        </TouchableOpacity>

    )


}

export default ButtonSample;

const styles = StyleSheet.create({

    touchableStyle: {
        borderRadius: 20, 
        padding: 20,
        alignItems: 'center',
        marginHorizontal: 20
        
                }


}
)