import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const services = [
  {
    icon: "document-text-outline",
    title: "AI Resume Optimization",
    description:
      "Maximize impact with ATS-ready resumes",
  },
  {
    icon: "people-outline",
    title: "Intelligent Talent Matchmaking",
    description:
      "Connect top talents with ideal opportunities",
  },
  {
    icon: "trending-up-outline",
    title: "Skill Gap Analysis and Personalized",
    description:
      "Learning paths to advance your career",
  },
];

const jobs = [
  {
    title: "Senior Product Designer",
    company: "Tech Solutions Inc.",
    location: "Lagos, Nigeria",
  },
  {
    title: "Data Analyst",
    company: "Global Analytics",
    location: "Abuja, Nigeria",
  },
  {
    title: "React Developer",
    company: "Innovate Labs",
    location: "Remote",
  },
];

export default function Index() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Ionicons
                name="document-text"
                size={18}
                color="#ffffff"
              />
            </View>

            <Text style={styles.logoText}>Resumint</Text>
          </View>

          <Pressable style={styles.demoButton}>
            <Text style={styles.demoText}>See Demo</Text>
          </Pressable>
        </View>

        {/* HERO */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>
            Smart Hiring Starts Here
          </Text>

          <Text style={styles.heroSubtitle}>
            Optimize Resumes and Recruit Top Talent effortlessly
            with AI powered tools and ATS intelligence.
          </Text>

          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>
              GET STARTED
            </Text>
          </Pressable>

          {/* HERO ILLUSTRATION */}
          <View style={styles.heroIllustration}>
            <View style={styles.illustrationCircle}>
              <Ionicons
                name="people"
                size={42}
                color="#1677D2"
              />
            </View>

            <View style={styles.laptop}>
              <View style={styles.laptopScreen}>
                <View style={styles.screenHeader}>
                  <View style={styles.smallCircle} />
                  <View style={styles.smallCircle} />
                  <View style={styles.smallCircle} />
                </View>

                <View style={styles.chartContainer}>
                  <View style={[styles.chartBar, { height: 25 }]} />
                  <View style={[styles.chartBar, { height: 45 }]} />
                  <View style={[styles.chartBar, { height: 65 }]} />
                  <View style={[styles.chartBar, { height: 38 }]} />
                </View>
              </View>

              <View style={styles.laptopBase} />
            </View>

            <View style={styles.person personOne}>
              <Ionicons
                name="person"
                size={27}
                color="#1677D2"
              />
            </View>

            <View style={styles.person personTwo}>
              <Ionicons
                name="person"
                size={25}
                color="#4BA4E8"
              />
            </View>

            <View style={styles.floatingIcon}>
              <Ionicons
                name="briefcase"
                size={20}
                color="#1677D2"
              />
            </View>

            <View style={styles.floatingIconTwo}>
              <Ionicons
                name="checkmark-circle"
                size={24}
                color="#1677D2"
              />
            </View>
          </View>
        </View>

        {/* INTRODUCTION */}
        <View style={styles.introSection}>
          <Text style={styles.sectionTitle}>
            Streamline your{"\n"}Recruitment Journey
          </Text>

          <Text style={styles.introText}>
            We bring you an end to end, AI driven recruitment
            and career platform built to bridge the gap between
            job seekers and hiring teams.
          </Text>
        </View>

        {/* SERVICES */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>
            Our Services
          </Text>

          {services.map((service, index) => (
            <Pressable
              key={index}
              style={styles.serviceCard}
            >
              <View style={styles.serviceIcon}>
                <Ionicons
                  name={service.icon}
                  size={28}
                  color="#1677D2"
                />
              </View>

              <View style={styles.serviceContent}>
                <Text style={styles.serviceTitle}>
                  {service.title}
                </Text>

                <Text style={styles.serviceDescription}>
                  {service.description}
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={18}
                color="#9AA9B8"
              />
            </Pressable>
          ))}
        </View>

        {/* JOBS */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>
            Latest Jobs
          </Text>

          {jobs.map((job, index) => (
            <View key={index} style={styles.jobCard}>
              <View style={styles.jobInfo}>
                <View style={styles.jobTitleRow}>
                  <View style={styles.bullet} />

                  <Text style={styles.jobTitle}>
                    {job.title}
                  </Text>
                </View>

                <Text style={styles.company}>
                  {job.company}
                </Text>

                <Text style={styles.location}>
                  {job.location}
                </Text>
              </View>

              <Pressable style={styles.applyButton}>
                <Text style={styles.applyText}>
                  Apply Now
                </Text>
              </Pressable>
            </View>
          ))}
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerLogo}>
            Resumint
          </Text>

          <Text style={styles.footerText}>
            Smarter hiring. Better careers.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scrollContent: {
    paddingBottom: 40,
  },

  /* HEADER */

  header: {
    height: 58,
    backgroundColor: "#1677D2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  logoIcon: {
    width: 30,
    height: 30,
    borderRadius: 7,
    backgroundColor: "#0D5FAE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },

  logoText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  demoButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 6,
  },

  demoText: {
    color: "#1677D2",
    fontSize: 11,
    fontWeight: "700",
  },

  /* HERO */

  hero: {
    alignItems: "center",
    paddingHorizontal: 22,
    paddingTop: 42,
  },

  heroTitle: {
    fontSize: 29,
    lineHeight: 35,
    fontWeight: "800",
    color: "#263746",
    textAlign: "center",
  },

  heroSubtitle: {
    marginTop: 12,
    maxWidth: 340,
    fontSize: 13,
    lineHeight: 19,
    color: "#687887",
    textAlign: "center",
  },

  primaryButton: {
    marginTop: 19,
    backgroundColor: "#1677D2",
    paddingHorizontal: 27,
    paddingVertical: 11,
    borderRadius: 6,
    elevation: 2,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  /* ILLUSTRATION */

  heroIllustration: {
    height: 225,
    width: "100%",
    marginTop: 25,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },

  illustrationCircle: {
    position: "absolute",
    left: "10%",
    top: 58,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#E7F3FF",
    justifyContent: "center",
    alignItems: "center",
  },

  laptop: {
    width: 150,
    alignItems: "center",
    marginTop: 20,
  },

  laptopScreen: {
    width: 135,
    height: 100,
    backgroundColor: "#EAF5FF",
    borderWidth: 5,
    borderColor: "#1677D2",
    borderRadius: 8,
    padding: 7,
  },

  screenHeader: {
    flexDirection: "row",
    gap: 4,
  },

  smallCircle: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#73B8ED",
  },

  chartContainer: {
    flexDirection: "row",
    height: 70,
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 8,
  },

  chartBar: {
    width: 15,
    backgroundColor: "#5AA9E6",
    borderRadius: 3,
  },

  laptopBase: {
    width: 165,
    height: 9,
    borderRadius: 8,
    backgroundColor: "#1677D2",
  },

  person: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E7F3FF",
    alignItems: "center",
    justifyContent: "center",
  },

  personOne: {
    right: "10%",
    top: 28,
  },

  personTwo: {
    left: "18%",
    bottom: 25,
  },

  floatingIcon: {
    position: "absolute",
    right: "5%",
    bottom: 32,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#EAF5FF",
    alignItems: "center",
    justifyContent: "center",
  },

  floatingIconTwo: {
    position: "absolute",
    left: "5%",
    bottom: 48,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#EAF5FF",
    alignItems: "center",
    justifyContent: "center",
  },

  /* INTRO */

  introSection: {
    paddingHorizontal: 28,
    alignItems: "center",
    marginTop: 8,
  },

  sectionTitle: {
    fontSize: 21,
    lineHeight: 26,
    fontWeight: "700",
    textAlign: "center",
    color: "#34495A",
  },

  introText: {
    marginTop: 12,
    textAlign: "center",
    fontSize: 12,
    lineHeight: 18,
    color: "#7B8995",
  },

  /* GENERAL SECTION */

  section: {
    marginTop: 27,
    paddingHorizontal: 22,
  },

  sectionHeading: {
    fontSize: 18,
    fontWeight: "600",
    color: "#34495A",
    marginBottom: 12,
  },

  /* SERVICE CARD */

  serviceCard: {
    minHeight: 70,
    borderWidth: 1,
    borderColor: "#B9D1E5",
    borderRadius: 10,
    marginBottom: 9,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  serviceIcon: {
    width: 49,
    height: 49,
    borderRadius: 8,
    backgroundColor: "#EAF5FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  serviceContent: {
    flex: 1,
  },

  serviceTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#41576A",
    marginBottom: 4,
  },

  serviceDescription: {
    fontSize: 10,
    color: "#82919D",
    lineHeight: 14,
  },

  /* JOB CARD */

  jobCard: {
    minHeight: 69,
    borderWidth: 1,
    borderColor: "#C3D5E4",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 11,
    marginBottom: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  jobInfo: {
    flex: 1,
    paddingRight: 10,
  },

  jobTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  bullet: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#1677D2",
    marginRight: 7,
  },

  jobTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#526576",
  },

  company: {
    fontSize: 10,
    color: "#8996A2",
    marginTop: 5,
    marginLeft: 12,
  },

  location: {
    fontSize: 9,
    color: "#A2ADB6",
    marginTop: 2,
    marginLeft: 12,
  },

  applyButton: {
    backgroundColor: "#1677D2",
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 6,
  },

  applyText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },

  /* FOOTER */

  footer: {
    marginTop: 25,
    paddingTop: 22,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: "#E6EDF2",
    alignItems: "center",
  },

  footerLogo: {
    color: "#1677D2",
    fontSize: 18,
    fontWeight: "800",
  },

  footerText: {
    marginTop: 5,
    color: "#9AA7B2",
    fontSize: 10,
  },
});