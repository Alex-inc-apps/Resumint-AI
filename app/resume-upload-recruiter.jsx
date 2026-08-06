import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/header";

const ResumeUploadRecruiter = () => {
  const [image, setImage] = useState(
    require("../assets/images/Applicant-img.png"),
  );

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const avatarSource = typeof image === "number" ? image : { uri: image };

  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <Header text={"Job Describtion"} />

      <View style={styles.contentContainer}>
        <View style={styles.greetingContainer}>
          <View style={styles.greetingRow}>
            <View style={styles.textContainer}>
              <Text style={styles.welcomeTextStyle}>Welcome back, Amara!</Text>
              <Text style={styles.subTextStyle}>
                Let us help you hire the next top talent.
              </Text>
            </View>
            <TouchableOpacity onPress={pickImage}>
              <Image source={avatarSource} style={styles.avatarStyle} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitleStyle}>Upload your job Description</Text>
          <Text style={styles.infoTextStyle}>
            Upload your job description so we can help you hire the next top
            role.
          </Text>
          <TouchableOpacity
            onPress={() => router.push("./create-job-listing")}
            style={styles.secondaryButtonStyle}
          >
            <Text style={styles.secondaryButtonTextStyle}>
              Click here to upload Job Description
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ResumeUploadRecruiter;

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
  greetingContainer: {
    marginBottom: 20,
  },
  greetingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatarStyle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginLeft: 12,
    backgroundColor: "#E9EEFF",
  },
  textContainer: {
    flex: 1,
  },
  welcomeTextStyle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2253E1",
    marginBottom: 6,
  },
  subTextStyle: {
    fontSize: 14,
    color: "#333333",
  },
  uploadCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 18,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  previewContainer: {
    alignItems: "center",
    gap: 12,
  },
  previewImageStyle: {
    width: 200,
    height: 200,
    borderRadius: 12,
  },

  uploadButtonTextStyle: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
  infoCard: {
    backgroundColor: "#DDE2F0",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  infoTitleStyle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 8,
  },
  infoTextStyle: {
    fontSize: 14,
    color: "#4C4C4C",
    marginBottom: 14,
  },
  secondaryButtonStyle: {
    backgroundColor: "#1348DF",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  secondaryButtonTextStyle: {
    color: "#fff",
    fontWeight: "700",
  },
});
