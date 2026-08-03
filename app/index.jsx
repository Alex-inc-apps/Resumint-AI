import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonSample from "../components/button";

export default function Index() {
  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      {/* Create Button */}
      <ButtonSample
        route={"/create"}
        text={"Create"}
        backgroundColor={"green"}
      />

      {/* Sign In Button */}
      <ButtonSample
        route={"/sign-in"}
        text={"Sign In"}
        backgroundColor={"blue"}
      />

      {/* Forgot Password Button */}
      <ButtonSample
        route={"/forgot-password"}
        text={"Forgot Password"}
        backgroundColor={"red"}
      />

      {/* Welcome page Button */}
      <ButtonSample
        route={"/welcome"}
        text={"Welcome"}
        backgroundColor={"orange"}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaViewStyle: {
    gap: 20,
    marginHorizontal: 30,
  },
});
