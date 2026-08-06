import { router } from "expo-router";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/header";

const { width, height } = Dimensions.get("screen");
const Welcome = () => {
  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <Header text={"Welcome"} />

      <View style={styles.contentContainer}>
        {/* Image logo */}
        <Image
          source={require("../assets/images/Resumint-R2(1).png")}
          style={styles.newImageStyle}
        />

        <Text style={styles.welcomeText}>Welcome! Select your path</Text>

        <View style={[styles.cardContainer, { marginTop: -20 }]}>
          <Image
            source={require("../assets/images/Applicant-img.png")}
            style={[styles.imageStyle, { marginTop: -10 }]}
          />

          <Text style={styles.roleTextStyle}>Applicant</Text>

          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() =>
              router.push({
                pathname: "/create",
                params: {
                  role: "candidate",
                },
              })
            }
          >
            <Text style={styles.buttonTextStyle}>Continue</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.cardContainer, { marginTop: -40 }]}>
          <Image
            source={require("../assets/images/Recruiter-img.png")}
            style={styles.imageStyle}
          />
          <Text style={styles.roleTextStyle}>Recruiter</Text>
          <TouchableOpacity
            style={[styles.buttonStyle, { backgroundColor: "#07112D" }]}
            onPress={() =>
              router.push({
                pathname: "/create",
                params: {
                  role: "recruiter",
                },
              })
            }
          >
            <Text style={styles.buttonTextStyle}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  safeAreaViewStyle: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: "center",
  },
  cardContainer: {
    width: width * 0.9,
    height: height * 0.3,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 12,
    padding: 20,
    borderRadius: 16,
  },
  imageStyle: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: -20,
  },
  newImageStyle: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: -150,
    marginBottom: 20,
  },
  roleTextStyle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 10,
  },
  buttonStyle: {
    backgroundColor: "#1F6FEB",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 18,
    alignItems: "center",
    width: "60%",
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  welcomeText: {
    alignSelf: "center",
    fontSize: 23,
    fontWeight: "bold",
  },
});
