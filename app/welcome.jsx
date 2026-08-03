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
        <View style={styles.cardContainer}>
          <Image
            source={require("../assets/images/Applicant-img.png")}
            style={styles.imageStyle}
          />

          <Text style={styles.roleTextStyle}>Applicant</Text>

          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => router.push("/create")}
          >
            <Text style={styles.buttonTextStyle}>Continue</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardContainer}>
          <Image
            source={require("../assets/images/Recruiter-img.png")}
            style={styles.imageStyle}
          />
          <Text style={styles.roleTextStyle}>Recruiter</Text>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => router.push("/sign-in")}
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
    borderWidth: 1,
    borderColor: "#E5E5EA",
    backgroundColor: "#F5F5F5",
  },
  imageStyle: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    alignSelf: "center",
  },
  roleTextStyle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111111",
  },
  buttonStyle: {
    backgroundColor: "#1F6FEB",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 18,
    alignItems: "center",
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});
