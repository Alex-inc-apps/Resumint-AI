import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const ResumeFeedback = () => {
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchResumeFeedback = async () => {
    try {
      setLoading(true);
      setError("");

      const token = await AsyncStorage.getItem("token");

      console.log("TOKEN EXISTS:", !!token);

      if (!token) {
        throw new Error("Login token not found");
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

      console.log("FEEDBACK RESPONSE:", data);

      if (!response.ok) {
        throw new Error(data?.message || "Failed to fetch resume feedback");
      }

      if (data.success) {
        setFeedback(data.data);
      } else {
        throw new Error("Feedback was not returned");
      }
    } catch (error) {
      console.log("FEEDBACK ERROR:", error);
      setError(error.message || "Unable to load resume feedback.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumeFeedback();
  }, []);

  /* LOADING */
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#1683E8" />

          <Text style={styles.loadingText}>Loading resume feedback...</Text>
        </View>
      </SafeAreaView>
    );
  }

  /* ERROR */
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Ionicons name="alert-circle-outline" size={50} color="#E74C3C" />

          <Text style={styles.errorText}>{error}</Text>

          <TouchableOpacity
            style={styles.retryButton}
            onPress={fetchResumeFeedback}
          >
            <Text style={styles.retryText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  /* BACKEND DATA */

  const overallScore = parseInt(feedback?.overallMatch?.score) || 0;

  const keywords = parseInt(feedback?.sectionScores?.keywords) || 0;

  const formatting = parseInt(feedback?.sectionScores?.formatting) || 0;

  const actionVerbs = parseInt(feedback?.sectionScores?.actionVerbs) || 0;

  const highlights = feedback?.keyHighlights || [];

  const suggestions = feedback?.actionableFeedback || [];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={27} color="#1683E8" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Resume Feedback</Text>

          <View style={styles.headerRight} />
        </View>

        {/* SCORE SECTION */}

        <View style={styles.scoreCard}>
          <View style={styles.scoreBox}>
            <Text style={styles.scoreNumber}>{overallScore}%</Text>

            <Text style={styles.scoreLabel}>Score</Text>
          </View>

          <View style={styles.verticalLine} />

          <View style={styles.scoreBox}>
            <Text style={styles.scoreNumber}>{keywords}%</Text>

            <Text style={styles.scoreLabel}>Keywords</Text>
          </View>

          <View style={styles.verticalLine} />

          <View style={styles.scoreBox}>
            <Text style={styles.scoreNumber}>{formatting}%</Text>

            <Text style={styles.scoreLabel}>ATS</Text>
          </View>
        </View>

        {/* SKILLS / KEY HIGHLIGHTS */}

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleContainer}>
              <Ionicons
                name="checkmark-circle-outline"
                size={22}
                color="#1683E8"
              />

              <Text style={styles.cardTitle}>Skills Match</Text>
            </View>

            <Text style={styles.viewText}>View all</Text>
          </View>

          <Text style={styles.cardSubText}>
            {highlights.length} key strengths identified
          </Text>

          {highlights.map((item, index) => (
            <View key={index} style={styles.listRow}>
              <Text style={styles.bullet}>•</Text>

              <Text style={styles.listText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* MISSING / IMPROVEMENT */}

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleContainer}>
              <Ionicons name="bulb-outline" size={22} color="#1683E8" />

              <Text style={styles.cardTitle}>Improvement Suggestions</Text>
            </View>
          </View>

          {suggestions.length > 0 ? (
            suggestions.map((item, index) => (
              <View key={index} style={styles.listRow}>
                <Text style={styles.bullet}>•</Text>

                <Text style={styles.listText}>{item}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>
              No improvement suggestions available.
            </Text>
          )}
        </View>

        {/* SECTION SCORES */}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Section Scores</Text>

          <View style={styles.sectionRow}>
            <Text style={styles.sectionName}>Formatting</Text>

            <Text style={styles.sectionScore}>{formatting}%</Text>
          </View>

          <View style={styles.sectionRow}>
            <Text style={styles.sectionName}>Keywords</Text>

            <Text style={styles.sectionScore}>{keywords}%</Text>
          </View>

          <View style={styles.sectionRow}>
            <Text style={styles.sectionName}>Action Verbs</Text>

            <Text style={styles.sectionScore}>{actionVerbs}%</Text>
          </View>
        </View>

        {/* AI SUMMARY */}

        <View style={styles.card}>
          <View style={styles.cardTitleContainer}>
            <Ionicons name="sparkles-outline" size={22} color="#1683E8" />

            <Text style={styles.cardTitle}>AI Resume Summary</Text>
          </View>

          <Text style={styles.summaryText}>
            {feedback?.overallMatch?.remarks ||
              "Your resume has been analyzed successfully."}
          </Text>
        </View>

        {/* BUTTONS */}

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.downloadButton} onPress={() => {}}>
            <Ionicons name="download-outline" size={19} color="#555555" />

            <Text style={styles.downloadText}>Download Report</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.improveButton}
            onPress={() => router.push("/mockInterview")}
          >
            <Text style={styles.improveText}>Improve Resume</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResumeFeedback;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scrollContent: {
    paddingBottom: 30,
  },

  header: {
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E7EAF2",
  },

  backButton: {
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#1683E8",
  },

  headerRight: {
    width: 45,
  },

  scoreCard: {
    marginHorizontal: 18,
    marginTop: 18,
    marginBottom: 16,
    backgroundColor: "#1683E8",
    borderRadius: 14,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  scoreBox: {
    flex: 1,
    alignItems: "center",
  },

  scoreNumber: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "800",
  },

  scoreLabel: {
    color: "#FFFFFF",
    fontSize: 12,
    marginTop: 4,
  },

  verticalLine: {
    width: 1,
    height: 42,
    backgroundColor: "rgba(255,255,255,0.4)",
  },

  card: {
    marginHorizontal: 18,
    marginBottom: 12,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E6ED",
    borderRadius: 12,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  cardTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  cardTitle: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "700",
    color: "#333333",
  },

  viewText: {
    fontSize: 13,
    color: "#1683E8",
    fontWeight: "600",
  },

  cardSubText: {
    color: "#777777",
    fontSize: 13,
    marginBottom: 10,
  },

  listRow: {
    flexDirection: "row",
    marginTop: 8,
  },

  bullet: {
    color: "#1683E8",
    fontSize: 18,
    marginRight: 8,
  },

  listText: {
    flex: 1,
    color: "#666666",
    fontSize: 14,
    lineHeight: 20,
  },

  emptyText: {
    color: "#999999",
    fontSize: 14,
    marginTop: 10,
  },

  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  sectionName: {
    color: "#666666",
    fontSize: 14,
  },

  sectionScore: {
    color: "#1683E8",
    fontSize: 14,
    fontWeight: "700",
  },

  summaryText: {
    color: "#666666",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 12,
  },

  buttonRow: {
    flexDirection: "row",
    marginHorizontal: 18,
    marginTop: 5,
    gap: 10,
  },

  downloadButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  downloadText: {
    color: "#555555",
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 5,
  },

  improveButton: {
    flex: 1,
    backgroundColor: "#1683E8",
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: "center",
    justifyContent: "center",
  },

  improveText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  loadingText: {
    marginTop: 12,
    color: "#777777",
    fontSize: 14,
  },

  errorText: {
    marginTop: 12,
    marginBottom: 18,
    color: "#777777",
    fontSize: 15,
    textAlign: "center",
  },

  retryButton: {
    backgroundColor: "#1683E8",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 10,
  },

  retryText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
