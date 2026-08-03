
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/header";
import TextInputField from "../components/textInput";



const ForgotPassword = () => {

    return(

        <SafeAreaView>
            <Header
            text={'Forgot Password'}
            />
        <View style={{marginHorizontal: 30}}>

            <Text style={styles.textStyle}>Enter the email associated with your account and we’ll send a reset link.</Text>
           
        </View>

        <View style={styles.ViewStyle}>

            <Text style={[styles.textStyle, {fontSize: 16, fontWeight: '500', opacity: 0.7 }]}>Email</Text>


            {/* Text input for mail */}
            <TextInputField 
            bordercolor={'#1348D5'}
            placeholder={'enter your work email'}
            />

            {/* send reset link button */}
            <TouchableOpacity style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>Send reset link</Text>
            </TouchableOpacity>


            {/* Back to Login */}
            <TouchableOpacity 
            onPress={() => {
                router.push('./sign-in')
            }}
            style={styles.backtoLoginStyle}>
            <Text>Back to login</Text>

            </TouchableOpacity>


        </View>
        </SafeAreaView>

    )

}

export default ForgotPassword;



const styles = StyleSheet.create({
    textStyle: { 
        marginTop: 30,
        fontSize: 15,
        opacity: 0.7
    },
    
    ViewStyle:{
        marginHorizontal: 30,
        gap: 10
        
    },

    mailTextStyle: {
        marginBottom: 20,

    },

     buttonStyle: {
           backgroundColor: "#1F6FEB",
           borderRadius: 14,
           paddingVertical: 15,
           alignItems: "center",
           marginTop: 10,
         },
         buttonTextStyle: {
           color: "#FFFFFF",
           fontSize: 16,
           fontWeight: "700",
         },

         backtoLoginStyle: {
            alignSelf: 'center',
            opacity: 0.6,
            marginTop: 10
         }
    

    
}
)