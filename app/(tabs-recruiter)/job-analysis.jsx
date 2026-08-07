import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/header";

const ResumeAnalysis = () => {
  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <Header text={"Job Matches"} />
      <View style={styles.contentContainer}>
        <Text style={styles.titleStyle}>
          Welcome to the Job Matches Screen!
        </Text>
        <Text style={styles.descriptionStyle}>
          This is the main landing page of the app.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ResumeAnalysis;

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
    color: '#1348D5',
    marginBottom: 10,
  },
  descriptionStyle: {
    fontSize: 16,
  },
});
