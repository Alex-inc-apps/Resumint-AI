import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/header";

const { width, height } = Dimensions.get("screen");

const UploadScreen = () => {
  const [resume, setResume] = useState(null);

  const pickResume = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ],
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        setResume(result.assets?.[0]);
        console.log(result.assets?.[0]);
      }

      const selectedFile = result.assets?.[0];
      if (!selectedFile) {
        return;
      }

      setResume({
        name: selectedFile.name,
        uri: selectedFile.uri,
        mimeType: selectedFile.mimeType || "application/pdf",
      });
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      Alert.alert("Error", "Unable to open file picker. Please try again.");
    }
  };

  const handleUpload = async () => {
    if (!resume?.uri) {
      Alert.alert("Please select a resume.");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        Alert.alert("Error", "Please sign in before uploading your resume.");
        return;
      }

      const formData = new FormData();
      formData.append("file", {
        uri: resume.uri,
        name: resume.name,
        type: resume.mimeType || "application/pdf",
      });

      const response = await axios.post(
        "https://automated-resume-screener-interview.onrender.com/api/candidate/resume/file",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log(response.data);

      if (response.data.success) {
        Alert.alert("Resume uploaded successfully!");
        router.push("/upload-success");
      } else {
        Alert.alert(response.data.message);
      }
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      Alert.alert("Error", "Unable to upload file. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <Header
        text="Upload Your Resume"
        showMenuButton={false}
        showNotification={false}
        showProfileImage={false}
      />

      <View style={styles.contentContainer}>
        <View style={styles.infoBlock}>
          <Text style={styles.sectionTitleStyle}>Upload Your Resume</Text>
          <Text style={styles.descriptionStyle}>
            Upload your resume so we can help you match with jobs.
          </Text>
        </View>

        <View style={styles.uploadCard}>
          <ImageBackground
            source={require("../assets/images/upload-box.png")}
            style={styles.imageBackgroundStyle}
            resizeMode="cover"
          >
            {resume ? (
              <View style={styles.fileInfoCard}>
                <Text style={styles.fileNameText}>{resume.name}</Text>
                <Text style={styles.fileSelectedText}>File selected</Text>
              </View>
            ) : (
              <Image
                source={require("../assets/images/folder.icon.png")}
                style={styles.folderIconStyle}
              />
            )}
          </ImageBackground>

          <TouchableOpacity
            style={styles.browseButtonStyle}
            onPress={pickResume}
          >
            <Text style={styles.browseButtonTextStyle}>Browse</Text>
          </TouchableOpacity>

          <Text>
            {resume
              ? resume.name
              : "No file selected. Please select a file to upload."}
          </Text>

          <Text style={styles.helperTextStyle}>
            {resume && "File selected. You can browse again to change it."}
          </Text>
          <View />
        </View>
      </View>

      <TouchableOpacity style={styles.uploadButtonStyle} onPress={handleUpload}>
        <Text style={styles.uploadButtonTextStyle}>Upload</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.uploadButtonStyle}
        onPress={() => router.push("/dashboard")}
      >
        <Text style={styles.uploadButtonTextStyle}>procceed to Dashboard</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default UploadScreen;

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
  infoBlock: {
    marginBottom: 20,
  },
  sectionTitleStyle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 6,
  },
  descriptionStyle: {
    fontSize: 14,
    color: "#4C4C4C",
  },
  uploadCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 18,
    alignItems: "center",
    gap: 14,
    paddingVertical: 20,
  },
  imageBackgroundStyle: {
    width: 250,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    overflow: "hidden",
  },
  fileInfoCard: {
    width: 190,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "rgba(7, 17, 45, 0.08)",
    alignItems: "center",
  },
  fileNameText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#07112D",
    textAlign: "center",
  },
  fileSelectedText: {
    marginTop: 8,
    fontSize: 13,
    color: "#4C4C4C",
  },
  folderIconStyle: {
    width: 56,
    height: 56,
  },
  browseButtonStyle: {
    backgroundColor: "#07112D",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  browseButtonTextStyle: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  dropZoneStyle: {
    width: "100%",
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  helperTextStyle: {
    fontSize: 14,
    color: "#646464",
    textAlign: "center",
  },
  uploadButtonStyle: {
    width: width * 0.6,
    backgroundColor: "#1F6FEB",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 110,
  },
  uploadButtonTextStyle: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
