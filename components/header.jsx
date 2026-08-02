import Ionicons from '@expo/vector-icons/Ionicons';
import { router, } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const Header = ({text}) => {

return(
<View style= { styles.safeAreaView }>
<Pressable onPress={() => {
    router.back()
}} style={styles.pressableStyle}>

<Ionicons  name="chevron-back-sharp" size={24} color="black" />

</Pressable>


<Text style= {styles.textStyle}>{text}</Text>

<View/>


</View>


)

}

export const styles = StyleSheet.create ({

    safeAreaView: {
        gap: 10,
        flexDirection: 'row',
        padding: 10, 
        alignItems: 'center', 
        justifyContent: 'space-between'
    },
    pressableStyle: {
        backgroundColor: 'white', 
        borderRadius: 20, 
        height: 32, 
        width: 32, 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    textStyle: { 
        fontSize: 20, 
        fontWeight: 'bold' 
    }

}
)

export default Header;