import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
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

const ResumeAnalysis = () => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchResumeAnalysis = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        Alert.alert("Error", "You are not logged in.");
        return;
      }

      const response = await fetch(
        "https://automated-resume-screener-interview.onrender.com/api/candidate/resume/feedback",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();

      console.log("RESUME ANALYSIS:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch resume analysis");
      }

      if (data.success) {
        setAnalysis(data.data);
      } else {
        Alert.alert("Error", data.message || "Could not get resume analysis");
      }
    } catch (error) {
      console.log("Failed to fetch resume analysis:", error);
      Alert.alert("Error", "Unable to load your resume analysis.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumeAnalysis();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1683E8" />
        <Text style={styles.loadingText}>Analysing your resume...</Text>
      </View>
    );
  }

  if (!analysis) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>No resume analysis available.</Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const overallMatch = analysis.overallMatch || {};
  const sectionScores = overallMatch.sectionScores || {};

  return (
    <View style={styles.container}>
      {/* Back */}
      <TouchableOpacity style={styles.backRow} onPress={() => router.back()}>
        <Text style={styles.backArrow}>‹</Text>
        <Text style={styles.backText}>Back to Dashboard</Text>
      </TouchableOpacity>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Title */}
        <Text style={styles.pageTitle}>Resume Analysis</Text>

        {/* Target Role */}
        <Text style={styles.targetRole}>
          Target Role: {analysis.targetRole || "Not specified"}
        </Text>

        {/* Overall Score */}
        <View style={styles.scoreCard}>
          <Text style={styles.scoreText}>{overallMatch.score || "0"}</Text>

          <Text style={styles.scoreLabel}>Overall Match Score</Text>
        </View>

        {/* Remarks */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Overall Feedback</Text>

          <Text style={styles.remarks}>
            {overallMatch.remarks || "No feedback available yet."}
          </Text>
        </View>

        {/* Section Scores */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Section Scores</Text>

          <View style={styles.scoreRow}>
            <Text style={styles.scoreName}>Formatting</Text>

            <Text style={styles.sectionScore}>
              {sectionScores.formatting || "0"}
            </Text>
          </View>

          <View style={styles.scoreRow}>
            <Text style={styles.scoreName}>Keywords</Text>

            <Text style={styles.sectionScore}>
              {sectionScores.keywords || "0"}
            </Text>
          </View>

          <View style={styles.scoreRow}>
            <Text style={styles.scoreName}>Action Verbs</Text>

            <Text style={styles.sectionScore}>
              {sectionScores.actionVerbs || "0"}
            </Text>
          </View>
        </View>

        {/* Key Highlights */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Key Highlights</Text>

          {analysis.keyHighlights && analysis.keyHighlights.length > 0 ? (
            analysis.keyHighlights.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>

                <Text style={styles.listText}>{item}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No highlights available.</Text>
          )}
        </View>

        {/* Actionable Feedback */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Actionable Feedback</Text>

          {analysis.actionableFeedback &&
          analysis.actionableFeedback.length > 0 ? (
            analysis.actionableFeedback.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>

                <Text style={styles.listText}>{item}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>
              No actionable feedback available.
            </Text>
          )}
        </View>

        {/* Buttons */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.back()}
        >
          <Text style={styles.primaryButtonText}>Back to Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push("/resumeFeedback")}
        >
          <Text style={styles.secondaryButtonText}>View My Feedback</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ResumeAnalysis;

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 40,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },

  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: "#777777",
  },

  errorText: {
    fontSize: 16,
    color: "#777777",
    textAlign: "center",
    marginBottom: 20,
  },

  backRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },

  backArrow: {
    fontSize: 32,
    color: "#1683E8",
    marginRight: 8,
    lineHeight: 32,
  },

  backText: {
    fontSize: 16,
    color: "#1683E8",
    fontWeight: "600",
  },

  pageTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111111",
    textAlign: "center",
    marginBottom: 8,
  },

  targetRole: {
    fontSize: 14,
    color: "#777777",
    textAlign: "center",
    marginBottom: 20,
  },

  scoreCard: {
    backgroundColor: "#F4F8F4",
    borderRadius: 16,
    paddingVertical: 25,
    alignItems: "center",
    marginBottom: 18,
  },

  scoreText: {
    fontSize: 48,
    fontWeight: "800",
    color: "#45A049",
  },

  scoreLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555555",
    marginTop: 4,
  },

  card: {
    backgroundColor: "#F7F9FC",
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#333333",
    marginBottom: 12,
  },

  remarks: {
    fontSize: 14,
    lineHeight: 21,
    color: "#666666",
  },

  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E8ED",
  },

  scoreName: {
    fontSize: 14,
    color: "#666666",
  },

  sectionScore: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1683E8",
  },

  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },

  bullet: {
    fontSize: 18,
    color: "#1683E8",
    marginRight: 8,
  },

  listText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: "#666666",
  },

  emptyText: {
    fontSize: 14,
    color: "#999999",
  },

  primaryButton: {
    backgroundColor: "#1683E8",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 5,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  secondaryButton: {
    borderWidth: 1,
    borderColor: "#1683E8",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 12,
  },

  secondaryButtonText: {
    color: "#1683E8",
    fontSize: 15,
    fontWeight: "700",
  },

  backButton: {
    backgroundColor: "#1683E8",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 10,
  },

  backButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
