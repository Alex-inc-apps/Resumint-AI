import { router } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const services = [
  {
    title: "AI Resume Optimization",
    description: "Maximize Impact Modern ATS and Role Requirements",
    image: "https://placehold.co/60x60/1348D5/ffffff?text=AI",
  },
  {
    title: "Intelligent Talent Matchmaking",
    description: "Predictive Skills Analysis and Instant Fit Scoring",
    image: "https://placehold.co/60x60/1348D5/ffffff?text=TM",
  },
  {
    title: "Skill Gap Analysis and Personalized Learning paths",
    description: "Tailored Roadmaps to help you acquire the right skills",
    image: "https://placehold.co/60x60/1348D5/ffffff?text=SG",
  },
];

// Static for now — no public "latest jobs" endpoint exists yet in the backend README
const latestJobs = [
  {
    title: "Senior Product Designer",
    company: "Apex Innovation ~ Abuja (Remote)",
  },
  { title: "Data Analysis", company: "Betalo LTD ~ Lagos (on site)" },
  { title: "React Developer", company: "Vought Initiative ~ Lagos (on site)" },
];

const Welcome = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Top nav */}
        <View style={styles.navBar}>
          <View style={styles.logoRow}>
            <Text style={styles.logoText}>Resumint</Text>
          </View>
          <TouchableOpacity style={styles.demoButton}>
            <Text style={styles.demoButtonText}>See Demo</Text>
          </TouchableOpacity>
        </View>

        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Smart Hiring Starts Here</Text>
          <Text style={styles.heroSubtitle}>
            Optimize Resume and Recruit top talent effortlessly with Ai powered
            matching ATS intelligence.
          </Text>

          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={() => router.push("/welcome")}
          >
            <Text style={styles.getStartedText}>GET STARTED</Text>
          </TouchableOpacity>

          <Image
            source={{
              uri: "https://placehold.co/400x260/f0f0f0/1348D5?text=Illustration",
            }}
            style={styles.heroImage}
          />
        </View>

        {/* Streamline section */}
        <View style={styles.streamlineSection}>
          <Text style={styles.streamlineTitle}>
            Streamline your{"\n"}Recruitment Journey
          </Text>
          <Text style={styles.streamlineText}>
            We bring to you an end to end, AI driven recruitment and career
            platform built to bridge the gap between job seekers and hiring
            teams.
          </Text>
        </View>

        {/* Our Services */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Our Services</Text>
          {services.map((service, index) => (
            <View key={index} style={styles.serviceCard}>
              <Image
                source={{ uri: service.image }}
                style={styles.serviceImage}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceDescription}>
                  {service.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Latest Jobs */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Latest Jobs</Text>
          {latestJobs.map((job, index) => (
            <View key={index} style={styles.jobCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.jobTitle}>• {job.title}</Text>
                <Text style={styles.jobCompany}>{job.company}</Text>
              </View>
              <TouchableOpacity style={styles.applyButton}>
                <Text style={styles.applyButtonText}>Apply Now</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },

  navBar: {
    backgroundColor: "#1348D5",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  logoRow: { flexDirection: "row", alignItems: "center" },
  logoText: { color: "white", fontSize: 18, fontWeight: "bold" },
  demoButton: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  demoButtonText: { color: "#1348D5", fontWeight: "600", fontSize: 13 },

  hero: { alignItems: "center", paddingHorizontal: 20, paddingTop: 30 },
  heroTitle: { fontSize: 28, fontWeight: "bold", textAlign: "center" },
  heroSubtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginTop: 12,
    lineHeight: 20,
  },

  getStartedButton: {
    backgroundColor: "#1348D5",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  getStartedText: { color: "white", fontWeight: "bold", fontSize: 14 },

  heroImage: { width: "100%", height: 220, marginTop: 30, borderRadius: 12 },

  streamlineSection: {
    paddingHorizontal: 20,
    marginTop: 30,
    alignItems: "center",
  },
  streamlineTitle: { fontSize: 22, fontWeight: "bold", textAlign: "center" },
  streamlineText: {
    fontSize: 13,
    color: "#555",
    textAlign: "center",
    marginTop: 12,
    lineHeight: 19,
  },

  sectionContainer: { paddingHorizontal: 20, marginTop: 30 },
  sectionTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 14 },

  serviceCard: {
    flexDirection: "row",
    gap: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  serviceImage: { width: 50, height: 50, borderRadius: 8 },
  serviceTitle: { fontWeight: "600", fontSize: 14 },
  serviceDescription: { fontSize: 12, color: "#777", marginTop: 2 },

  jobCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  jobTitle: { fontWeight: "600", fontSize: 14 },
  jobCompany: { fontSize: 12, color: "#777", marginTop: 2 },
  applyButton: {
    backgroundColor: "#1E1E1E",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  applyButtonText: { color: "white", fontSize: 12, fontWeight: "600" },
});
