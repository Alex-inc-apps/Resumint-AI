import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Header from "../../components/header";

const Profile = () => {
  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <Header text={"Profile"} />
      <View style={styles.contentContainer}>
        <Text style={styles.titleStyle}>Welcome to the Profile Screen!</Text>
        <Text style={styles.descriptionStyle}>
          This is the main landing page of the app.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

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
