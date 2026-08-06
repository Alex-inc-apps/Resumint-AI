import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../components/header";
import TextInputField from "../components/textInput";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { role } = useLocalSearchParams();

  const loginUser = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      alert("Please enter your email and password.");
      return;
    }

    try {
      console.log({
        email,
        password,
        role,
      });

      const response = await axios.post(
        "https://automated-resume-screener-interview.onrender.com/api/login",
        {
          email: trimmedEmail,
          password: trimmedPassword,
          role: role,
        },
      );

      await AsyncStorage.setItem("token", response.data.token);

      console.log(response.data);

      console.log(JSON.stringify(response.data));
      if (response.data?.success || response.status === 200) {
        if (response.data?.profile?.role === "recruiter") {
          router.push("/resume-upload-recruiter");
        } else if (response.data?.profile?.role === "candidate") {
          router.push("/resume-upload-applicant");
        } else {
          alert(
            "Please clarify the role returned by the backend API. Only 'candidate' and 'recruiter' are supported.",
          );
          return;
        }

        alert("Login successful!");
      } else {
        alert(response.data?.message || "Login failed.");
      }
    } catch (error) {
      console.error(JSON.stringify(error.response?.data || error.message));
      alert(error.response?.data?.message || "Login failed.");
    }
  };

  return (
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
            value={email}
            onChangeText={setEmail}
          />

          {/* Password text input */}
          <TextInputField
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {/* Continue button */}
          <TouchableOpacity style={styles.buttonStyle} onPress={loginUser}>
            <Text style={styles.buttonTextStyle}>Continue</Text>
          </TouchableOpacity>

          <View style={{ alignItems: "flex-end" }}>
            {/* Forgot password */}

            <TouchableOpacity onPress={() => router.push("/forgot-password")}>
              <Text
                style={[
                  styles.forgotPasswordLinkStyle,
                  { alignSelf: "flex-end" },
                ]}
              >
                Forgot password?
              </Text>
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
    textDecorationLine: "underline",
  },
});
