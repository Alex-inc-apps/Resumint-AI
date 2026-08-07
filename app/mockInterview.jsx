import { Feather, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const BASE_URL = "https://automated-resume-screener-interview.onrender.com/api";

export default function MockInterview() {
  const { jobId } = useLocalSearchParams();

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(true);

  // Temporary AI feedback values for the UI
  const [confidence, setConfidence] = useState(82);
  const [sentiment, setSentiment] = useState("Positive");
  const [tip, setTip] = useState("Quantify Result for Impact");

  const fetchInterviewQuestion = async () => {
    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("token");

      if (!token) {
        Alert.alert("Error", "You are not logged in.");
        return;
      }

      if (!jobId) {
        Alert.alert("Error", "Job ID is missing.");
        return;
      }

      const response = await fetch(
        `${BASE_URL}/candidate/jobs/${jobId}/questions`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();

      console.log("Interview questions:", data);

      if (!response.ok) {
        throw new Error(data?.message || "Failed to load interview question");
      }

      if (data?.questions && data.questions.length > 0) {
        setQuestion(data.questions[0].question);
      } else {
        setQuestion("No interview questions available for this job yet.");
      }
    } catch (error) {
      console.log("Mock interview error:", error);
      Alert.alert("Error", "Unable to load interview question.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterviewQuestion();
  }, [jobId]);

  const practiceAnswer = () => {
    Alert.alert(
      "Practice Answer",
      "Practice answering this question clearly and confidently.",
    );
  };

  const uploadAndApply = () => {
    router.push("/upload-screen");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="#1976D2" />

            <Text style={styles.backText}>Back to Dashboard</Text>
          </TouchableOpacity>

          <View style={styles.profileCircle}>
            <Ionicons name="person" size={25} color="#fff" />
          </View>
        </View>

        {/* TITLE */}
        <Text style={styles.title}>Mock Interview</Text>

        {/* QUESTION CARD */}
        <View style={styles.questionCard}>
          {loading ? (
            <ActivityIndicator size="small" color="#168FEA" />
          ) : (
            <Text style={styles.questionText}>{question}</Text>
          )}

          {/* PRACTICE ANSWER */}
          <TouchableOpacity
            style={styles.practiceButton}
            onPress={practiceAnswer}
          >
            <Feather name="mic" size={21} color="#168FEA" />

            <Text style={styles.practiceText}>Practice Answer</Text>
          </TouchableOpacity>
        </View>

        {/* AI FEEDBACK */}
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackTitle}>AI Feedback</Text>

          <View style={styles.feedbackRow}>
            <Text style={styles.feedbackLabel}>Confidence:</Text>

            <Text style={styles.feedbackValue}>{confidence}%</Text>
          </View>

          <View style={styles.feedbackRow}>
            <Text style={styles.feedbackLabel}>Sentiment:</Text>

            <View style={styles.sentimentBadge}>
              <Text style={styles.sentimentText}>{sentiment}</Text>
            </View>
          </View>

          <View style={styles.tipContainer}>
            <Text style={styles.tipLabel}>Tip:</Text>

            <Text style={styles.tipText}>{tip}</Text>
          </View>
        </View>

        {/* UPLOAD & APPLY */}
        <TouchableOpacity style={styles.applyButton} onPress={uploadAndApply}>
          <Text style={styles.applyButtonText}>Upload resume & Apply</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 35,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 35,
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },

  backText: {
    color: "#1976D2",
    fontSize: 16,
    marginLeft: 2,
  },

  profileCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E8A6A6",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    textAlign: "center",
    color: "#1675D1",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 25,
  },

  questionCard: {
    backgroundColor: "#FFFDF3",
    borderRadius: 15,
    paddingHorizontal: 22,
    paddingVertical: 28,
    minHeight: 270,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28,
  },

  questionText: {
    textAlign: "center",
    color: "#555555",
    fontSize: 17,
    lineHeight: 25,
    fontWeight: "500",
    marginBottom: 35,
  },

  practiceButton: {
    width: "90%",
    height: 58,
    borderWidth: 1.5,
    borderColor: "#168FEA",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  practiceText: {
    color: "#168FEA",
    fontSize: 17,
    fontWeight: "600",
    marginLeft: 10,
  },

  feedbackContainer: {
    paddingHorizontal: 5,
    marginBottom: 80,
  },

  feedbackTitle: {
    color: "#168FEA",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },

  feedbackRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  feedbackLabel: {
    color: "#666666",
    fontSize: 16,
  },

  feedbackValue: {
    color: "#555555",
    fontSize: 16,
    marginLeft: 5,
  },

  sentimentBadge: {
    backgroundColor: "#D9F5EC",
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginLeft: 7,
  },

  sentimentText: {
    color: "#42A88A",
    fontSize: 14,
    fontWeight: "600",
  },

  tipContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },

  tipLabel: {
    color: "#666666",
    fontSize: 16,
  },

  tipText: {
    color: "#666666",
    fontSize: 16,
    marginLeft: 4,
  },

  applyButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    height: 55,
    backgroundColor: "#168FEA",
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },

  applyButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
