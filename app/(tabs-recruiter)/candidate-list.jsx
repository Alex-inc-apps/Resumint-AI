import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/header";

const CandidateList = () => {
  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <Header text={"My Resume"} />
      <View style={styles.contentContainer}>
        <Text style={styles.titleStyle}>Candidate List</Text>
        <Text style={styles.descriptionStyle}>
          Here are your candidate lists.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default CandidateList;

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
