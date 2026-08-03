import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/header";
import TextInputField from "../components/textInput";

const Create = () => {
  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <Header text={"Create Account"} />

      <View style={styles.contentContainer}>
        <Image
          source={require("../assets/images/Resumint-R2(1).png")}
          style={styles.imageStyle}
        />

        <Text style={styles.titleStyle}>Create account</Text>

        <View style={styles.formContainer}>
          <TextInputField
            label="Work email"
            placeholder="Enter your work email"
            keyboardType="email-address"
          />

          <TextInputField
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
          />

          <TouchableOpacity style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>Create account</Text>
          </TouchableOpacity>

          <View style={styles.signInContainer}>
            <Text style={styles.signInTextStyle}>
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/sign-in")}>
              <Text style={styles.signInLinkStyle}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Create;

const styles = StyleSheet.create({
  safeAreaViewStyle: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  contentContainer: {
    paddingHorizontal: 20,
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
  signInLinkStyle: {
    color: "#1F6FEB",
    fontSize: 14,
    fontWeight: "700",
  },
});
