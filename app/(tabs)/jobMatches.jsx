import { Ionicons } from "@expo/vector-icons";
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

const BASE_URL = "https://automated-resume-screener-interview.onrender.com/api";

export default function JobMatches() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(`${BASE_URL}/candidate/jobs/score`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      console.log("JOB MATCHES:", data);

      if (!response.ok) {
        throw new Error(data?.message || "Failed to load jobs");
      }

      setJobs(data?.data || []);
    } catch (error) {
      console.log("Job matches error:", error);
      Alert.alert("Error", "Unable to load job matches.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1687E8" />
        <Text style={styles.loadingText}>Finding your best job matches...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="#1687E8" />
          <Text style={styles.backText}>Back to Dashboard</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>Job Matches</Text>

        {jobs.length === 0 ? (
          <View style={styles.emptyBox}>
            <Ionicons name="briefcase-outline" size={50} color="#1687E8" />
            <Text style={styles.emptyTitle}>No Job Matches Yet</Text>
            <Text style={styles.emptyText}>
              Upload and analyse your resume to see jobs that match your skills.
            </Text>
          </View>
        ) : (
          <>
            {/* Top Match */}
            {jobs[0]?.job && (
              <View style={styles.topMatchCard}>
                <View style={styles.profileRow}>
                  <View style={styles.companyIcon}>
                    <Ionicons name="person" size={28} color="#fff" />
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text style={styles.topMatchName}>Candidate Profile</Text>

                    <Text style={styles.topMatchRole}>
                      {jobs[0].job?.jobTitle || "Job Match"}
                    </Text>
                  </View>
                </View>

                <View style={styles.progressBackground}>
                  <View
                    style={[
                      styles.progress,
                      {
                        width: `${Math.min(
                          Number(jobs[0].overallscore || 0),
                          100,
                        )}%`,
                      },
                    ]}
                  />
                </View>
              </View>
            )}

            <Text style={styles.sectionTitle}>BEST JOB MATCHES</Text>

            {jobs.map((item, index) => {
              const job = item.job || {};

              const score = Number(item.overallscore || 0);

              return (
                <View style={styles.jobCard} key={job.jobId || job.id || index}>
                  <View style={styles.jobTop}>
                    <View style={styles.companyLogo}>
                      <Ionicons
                        name="business-outline"
                        size={28}
                        color="#1687E8"
                      />
                    </View>

                    <View style={styles.jobInfo}>
                      <Text style={styles.companyName}>
                        {job.companyName || "Company"}
                      </Text>

                      <Text style={styles.jobTitle}>
                        {job.jobTitle || "Job Position"}
                      </Text>

                      {job.location && (
                        <Text style={styles.location}>{job.location}</Text>
                      )}
                    </View>

                    <View style={styles.scoreCircle}>
                      <Text style={styles.scoreText}>{score}%</Text>
                    </View>
                  </View>

                  <Text style={styles.skillsText}>
                    {item.skillsmatched
                      ? `${Object.keys(item.skillsmatched).length} skills matched`
                      : "Skills matched"}
                  </Text>

                  <TouchableOpacity
                    style={styles.applyButton}
                    onPress={() => {
                      router.push({
                        pathname: "/mock-interview",
                        params: {
                          jobId: job.id || job.jobId || "",
                        },
                      });
                    }}
                  >
                    <Text style={styles.applyText}>Apply</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  loadingText: {
    marginTop: 12,
    color: "#555",
    fontSize: 14,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 15,
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },

  backText: {
    color: "#1687E8",
    fontSize: 15,
    marginLeft: 3,
  },

  content: {
    paddingHorizontal: 18,
    paddingBottom: 40,
  },

  title: {
    fontSize: 27,
    fontWeight: "700",
    color: "#1687E8",
    textAlign: "center",
    marginBottom: 20,
  },

  topMatchCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  companyIcon: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  topMatchName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },

  topMatchRole: {
    fontSize: 13,
    color: "#777",
    marginTop: 3,
  },

  progressBackground: {
    height: 9,
    backgroundColor: "#DCEEFF",
    borderRadius: 10,
    marginTop: 18,
    overflow: "hidden",
  },

  progress: {
    height: "100%",
    backgroundColor: "#1687E8",
    borderRadius: 10,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#777",
    marginBottom: 12,
  },

  jobCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E6E6E6",
  },

  jobTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  companyLogo: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: "#EEF7FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  jobInfo: {
    flex: 1,
  },

  companyName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },

  jobTitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 3,
  },

  location: {
    fontSize: 12,
    color: "#888",
    marginTop: 3,
  },

  scoreCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: "#1687E8",
    alignItems: "center",
    justifyContent: "center",
  },

  scoreText: {
    color: "#1687E8",
    fontWeight: "700",
    fontSize: 13,
  },

  skillsText: {
    fontSize: 12,
    color: "#777",
    marginTop: 12,
    marginBottom: 10,
  },

  applyButton: {
    height: 43,
    borderRadius: 8,
    backgroundColor: "#1687E8",
    alignItems: "center",
    justifyContent: "center",
  },

  applyText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },

  emptyBox: {
    marginTop: 80,
    alignItems: "center",
    paddingHorizontal: 25,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginTop: 15,
  },

  emptyText: {
    textAlign: "center",
    color: "#777",
    fontSize: 14,
    marginTop: 8,
    lineHeight: 21,
  },
});
