import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";

const Home = () => {
  const [resumeScore, setResumeScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(
    require("../../assets/images/Applicant-img.png"),
  );

  const pickProfileImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Permission to access your photos is required.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const fetchResumeScore = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await axios.get(
        "https://automated-resume-screener-interview.onrender.com/api/candidate/score",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Resume score response:", response.data);
      const score = response.data?.data?.[0]?.overallscore;

      if (score !== undefined) {
        setResumeScore(score);
      }
    } catch (error) {
      console.log(
        "Failed to fetch resume score:",
        error.response.data || error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumeScore();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <Header
        text="Dashboard"
        showMenuButton={true}
        onMenuPress={() => setSidebarVisible(true)}
        showProfileImage={true}
        profileImage={profileImage}
        onProfileImagePress={pickProfileImage}
      />

      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Welcome */}
        <Text style={styles.welcomeText}>Welcome back, Amara!</Text>

        <Text style={styles.descriptionText}>
          Here is how ready you are for your next opportunity.
        </Text>

        {/* Resume Score */}
        <View style={styles.scoreCard}>
          <Text style={styles.scoreTitle}>Resume Score</Text>

          <Text style={styles.scoreText}>{resumeScore}%</Text>

          <Text style={styles.scoreStatus}>
            {resumeScore >= 70 ? "Good" : "Needs Improvement"}
          </Text>
        </View>

        {/* Top Priority */}
        <View style={styles.priorityCard}>
          <Text style={styles.priorityTitle}>YOUR TOP PRIORITY</Text>

          <Text style={styles.priorityHeading}>
            Improve your resume before applying
          </Text>

          <Text style={styles.priorityDescription}>
            Your resume is missing 3 key skills for your target role.
          </Text>

          <TouchableOpacity
            style={styles.analyzeButton}
            onPress={() => router.push("/(tabs)/myResume")}
          >
            <Text style={styles.analyzeButtonText}>Analyze Resume</Text>
          </TouchableOpacity>
        </View>

        {/* Interview Preparation */}
        <View style={styles.interviewSection}>
          <Text style={styles.interviewTitle}>INTERVIEW PREPARATION</Text>

          <Text style={styles.interviewScore}>65%</Text>

          <Text style={styles.interviewDescription}>Preparation Progress</Text>

          <Text style={styles.interviewAreas}>
            2 of 3 preparation areas completed
          </Text>

          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueButtonText}>
              Continue Preparation →
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeAreaViewStyle: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },

  welcomeText: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111111",
  },

  descriptionText: {
    fontSize: 14,
    color: "#777777",
    marginTop: 6,
    marginBottom: 20,
    lineHeight: 20,
  },

  scoreCard: {
    backgroundColor: "#F4F8F4",
    borderRadius: 16,
    padding: 22,
    marginBottom: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E4EEE4",
  },

  scoreTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#555555",
  },

  scoreText: {
    fontSize: 48,
    fontWeight: "800",
    marginTop: 5,
    color: "#45A049",
  },

  scoreStatus: {
    fontSize: 14,
    fontWeight: "600",
    color: "#45A049",
    marginTop: 3,
  },

  priorityCard: {
    backgroundColor: "#EEF6FF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: "#DCEBFA",
  },

  priorityTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: "#1473E6",
    marginBottom: 9,
    letterSpacing: 0.5,
  },

  priorityHeading: {
    fontSize: 19,
    fontWeight: "700",
    color: "#222222",
    marginBottom: 8,
  },

  priorityDescription: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 21,
    marginBottom: 18,
  },

  analyzeButton: {
    backgroundColor: "#1473E6",
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: "center",
  },

  analyzeButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  interviewSection: {
    backgroundColor: "#FAF8FF",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E9E0FA",
  },

  interviewTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: "#8A63D2",
    letterSpacing: 0.5,
  },

  interviewScore: {
    fontSize: 34,
    fontWeight: "800",
    color: "#8A63D2",
    marginTop: 7,
  },

  interviewDescription: {
    fontSize: 14,
    color: "#666666",
  },

  interviewAreas: {
    fontSize: 13,
    color: "#999999",
    marginTop: 8,
    marginBottom: 16,
  },

  continueButton: {
    borderWidth: 1,
    borderColor: "#C8B9E8",
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: "center",
  },

  continueButtonText: {
    color: "#7655B5",
    fontSize: 14,
    fontWeight: "700",
  },
});
