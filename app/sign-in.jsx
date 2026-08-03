

import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/header";



const SignIn = () => {

    return(

        <SafeAreaView>
            
            <Header
            text={'Sign In'}
            />

            <Image style={{height: 210, width: 210, alignSelf: 'center', marginTop: -50}} source={require('../assets/images/Resumint R 3.png')}/>

        </SafeAreaView>

    )

}

export default SignIn;