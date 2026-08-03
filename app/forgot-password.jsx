
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/header";



const ForgotPassword = () => {

    return(

        <SafeAreaView>
            <Header
            text={'Forgot Password'}
            />


            <Text style={styles.textStyle}>Enter the email associated with your account and we’ll send a reset link.</Text>

            <Text style={[styles.textStyle, {fontSize: 16, fontWeight: '500', color:}]}>Email</Text>
        </SafeAreaView>

    )

}

export default ForgotPassword;



const styles = StyleSheet.create({
    textStyle: {marginHorizontal: 20, 
        marginTop: 30,
        fontSize: 15
    }
}
)