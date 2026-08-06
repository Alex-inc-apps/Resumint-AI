import { router } from "expo-router";
import { useEffect, useRef } from "react";
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/header";

const { width } = Dimensions.get("screen");

const JobDecsSuccess = () => {
  const scale = useRef(new Animated.Value(0.7)).current;
  const pulse = useRef(new Animated.Value(1)).current;
  const glow = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        speed: 12,
        bounciness: 8,
      }),
      Animated.parallel([
        Animated.sequence([
          Animated.timing(pulse, {
            toValue: 1.05,
            duration: 220,
            useNativeDriver: true,
          }),
          Animated.timing(pulse, {
            toValue: 1,
            duration: 220,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(glow, {
            toValue: 1.05,
            duration: 220,
            useNativeDriver: true,
          }),
          Animated.timing(glow, {
            toValue: 0.95,
            duration: 220,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ]).start(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, {
            toValue: 1.04,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulse, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(glow, {
            toValue: 1.02,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(glow, {
            toValue: 0.98,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    });
  }, [glow, pulse, scale]);

  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <Header text={"Successfully Uploaded"} />
      <View style={styles.contentContainer}>
        <Animated.View
          style={[
            styles.badgeContainer,
            {
              transform: [{ scale }, { scaleX: pulse }, { scaleY: pulse }],
              opacity: glow,
            },
          ]}
        >
          <Animated.View
            style={[styles.outerCircle, { transform: [{ scale: glow }] }]}
          />
          <View style={styles.middleCircle} />
          <View style={styles.innerCircle}>
            <Text style={styles.checkmark}>✓</Text>
          </View>
        </Animated.View>

        <Text style={styles.successText}>Job Description Uploaded!</Text>
        <>
          <Text style={styles.successSubText}>
            You are all set! {"\n"}
            Job Description has been uploaded successfully
          </Text>
          <Text style={styles.successSubSubText}>
            We have sent a confirmation to the candidate email.
          </Text>
        </>
      </View>
      <TouchableOpacity
        style={styles.continueBtn}
        onPress={() => router.push("(tabs)/home")}
      >
        <Text style={styles.continueText}>Continue to Dashboard</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default JobDecsSuccess;

const styles = StyleSheet.create({
  safeAreaViewStyle: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: 100,
  },
  badgeContainer: {
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  outerCircle: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#DDF0FF",
  },
  middleCircle: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#8AC0FF",
  },
  innerCircle: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#2D6CF6",
    alignItems: "center",
    justifyContent: "center",
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 56,
    fontWeight: "900",
    lineHeight: 56,
  },
  successText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2253E1",
    textAlign: "center",
  },
  successSubText: {
    fontSize: 14,
    color: "#4C4C4C",
    textAlign: "center",
    marginTop: 8,
  },
  successSubSubText: {
    fontSize: 14,
    color: "#4C4C4C",
    textAlign: "center",
    marginTop: 4,
    fontStyle: "italic",
    fontWeight: "300",
  },
  continueBtn: {
    width: width * 0.6,
    backgroundColor: "#1F6FEB",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 110,
  },
  continueText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
