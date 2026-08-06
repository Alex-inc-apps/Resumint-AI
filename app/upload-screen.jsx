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

      if (result.canceled) {
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
      });
    } catch (error) {
      Alert.alert("Error", "Unable to open file picker. Please try again.");
      console.error("Document picker error:", error);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault?.();

    const droppedFiles = event.dataTransfer?.files;
    const droppedFile = droppedFiles?.[0];

    if (!droppedFile) {
      return;
    }

    setResume({
      name: droppedFile.name,
      uri: droppedFile.name,
    });
  };

  const handleUpload = () => {
    if (!resume) {
      Alert.alert("No file selected", "Please select a file to upload.");
      return;
    }

    router.push("/upload-success");
  };
  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <Header text={"Upload Your Resume"} />

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

          <TouchableOpacity
            style={styles.dropZoneStyle}
            onPress={pickResume}
            onDragOver={(event) => event.preventDefault?.()}
            onDrop={handleDrop}
          >
            <Text style={styles.helperTextStyle}>
              {resume
                ? "File selected. You can browse again to change it."
                : "or Drag and drop your file here"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.uploadButtonStyle} onPress={handleUpload}>
        <Text style={styles.uploadButtonTextStyle}>Upload</Text>
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
