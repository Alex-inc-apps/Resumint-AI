import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Header from "../../components/header";

const myResume = () => {
  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <Header text={"My Resume"} />
      <View style={styles.contentContainer}>
        <Text style={styles.titleStyle}>Welcome to the My Resume Screen!</Text>
        <Text style={styles.descriptionStyle}>
          This is the main landing page of the app.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default myResume;

const styles = StyleSheet.create({
  safeAreaViewStyle: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  titleStyle: {
    fontSize: 24,

    fontWeight: "700",
    color: "#111111",
    marginBottom: 10,
  },
  descriptionStyle: {
    fontSize: 16,
  },
});
