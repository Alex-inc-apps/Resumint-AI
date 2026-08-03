

import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/header";
import TextInputField from "../components/textInput";



const SignIn = () => {

    return(

       <SafeAreaView style={styles.safeAreaViewStyle}>
             <Header text={"Sign In"} />
       
             <View style={styles.contentContainer}>

                {/* Image logo */}
               <Image
                 source={require("../assets/images/Resumint-R2(1).png")}
                 style={styles.imageStyle}
               />
       
       {/* Sign In text below the image */}
               <Text style={styles.titleStyle}>Sign In</Text>


               {/* Work email text input */}
               <View style={styles.formContainer}>
                 <TextInputField
                   placeholder="Enter your work email"
                   keyboardType="email-address"
                 />
       
                {/* Password text input */}
                 <TextInputField
                   placeholder="Enter your password"
                   secureTextEntry
                 />

                {/* Continue button */}
                 <TouchableOpacity style={styles.buttonStyle}>
                   <Text style={styles.buttonTextStyle}>Continue</Text>
                 </TouchableOpacity>
       

                 <View style={{alignItems: 'flex-end'}}>

                    {/* Forgot password */}
                  
                   <TouchableOpacity onPress={() => router.push("/forgot-password")}>
                    
                     <Text style={[styles.forgotPasswordLinkStyle, {alignSelf: 'flex-end'}]}>Forgot password?</Text>
                   </TouchableOpacity>
                 </View>
               </View>
             </View>
           </SafeAreaView>
         );
       };
       
       export default SignIn;
       
       const styles = StyleSheet.create({
         safeAreaViewStyle: {
           flex: 1,
           backgroundColor: "#FFFFFF",
         },
         contentContainer: {
           paddingHorizontal: 40,
           paddingBottom: 20,
         },
         imageStyle: {
           width: 200,
           height: 200,
           resizeMode: "contain",
           alignSelf: "center",
         },
         titleStyle: {
           fontSize: 24,
           fontWeight: "700",
           textAlign: "center",
           marginTop: 10,
           marginBottom: 24,
           color: "#111111",
         },
         formContainer: {
           gap: 12,
         },
         buttonStyle: {
           backgroundColor: "#1F6FEB",
           borderRadius: 14,
           paddingVertical: 15,
           alignItems: "center",
           marginTop: 8,
         },
         buttonTextStyle: {
           color: "#FFFFFF",
           fontSize: 16,
           fontWeight: "700",
         },
         signInContainer: {
           flexDirection: "row",
           justifyContent: "center",
           alignItems: "center",
           marginTop: 14,
         },
         signInTextStyle: {
           color: "#6C6C70",
           fontSize: 14,
         },
         forgotPasswordLinkStyle: {
           color: "#000000",
           fontSize: 14,
           fontWeight: "700",
           textDecorationLine: 'underline'
         },
       });
       