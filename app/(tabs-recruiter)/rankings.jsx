import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/header";

const Rankings = () => {
  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <Header text={"Profile"} />
      <View style={styles.contentContainer}>
        <Text style={styles.titleStyle}>Rankings</Text>
        <Text style={styles.descriptionStyle}>
          Here are the rankings.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Rankings;

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
    color: '#1348D5',
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
  },
  descriptionStyle: {
    fontSize: 16,
  },
});
