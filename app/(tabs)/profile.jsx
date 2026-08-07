import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Profile() {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");

      router.replace("/login");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={25} color="#1677FF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Profile</Text>

        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={55} color="#1677FF" />
          </View>

          <TouchableOpacity style={styles.cameraButton}>
            <Ionicons name="camera" size={16} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.name}>Your Name</Text>

        <Text style={styles.role}>Software Developer</Text>

        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={18} color="#1677FF" />

          <Text style={styles.editText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Resume Score */}
      <View style={styles.scoreCard}>
        <View>
          <Text style={styles.scoreLabel}>Resume Score</Text>

          <Text style={styles.score}>86%</Text>
        </View>

        <View style={styles.scoreCircle}>
          <Ionicons name="document-text" size={30} color="#1677FF" />
        </View>
      </View>

      {/* Personal Information */}
      <Text style={styles.sectionTitle}>Personal Information</Text>

      <View style={styles.infoCard}>
        <InfoRow icon="mail-outline" label="Email" value="your@email.com" />

        <InfoRow icon="call-outline" label="Phone" value="+234 800 000 0000" />

        <InfoRow icon="location-outline" label="Location" value="Nigeria" />
      </View>

      {/* Career Information */}
      <Text style={styles.sectionTitle}>Career Information</Text>

      <View style={styles.infoCard}>
        <InfoRow
          icon="briefcase-outline"
          label="Target Role"
          value="Software Developer"
        />

        <InfoRow
          icon="school-outline"
          label="Education"
          value="Computer Science"
        />

        <InfoRow
          icon="star-outline"
          label="Experience"
          value="Junior / Entry Level"
        />
      </View>

      {/* Account */}
      <Text style={styles.sectionTitle}>Account</Text>

      <TouchableOpacity style={styles.actionCard}>
        <View style={styles.actionLeft}>
          <View style={styles.iconBox}>
            <Ionicons name="document-text-outline" size={21} color="#1677FF" />
          </View>

          <Text style={styles.actionText}>My Resume</Text>
        </View>

        <Ionicons name="chevron-forward" size={20} color="#999" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionCard}>
        <View style={styles.actionLeft}>
          <View style={styles.iconBox}>
            <Ionicons name="notifications-outline" size={21} color="#1677FF" />
          </View>

          <Text style={styles.actionText}>Notifications</Text>
        </View>

        <Ionicons name="chevron-forward" size={20} color="#999" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionCard}>
        <View style={styles.actionLeft}>
          <View style={styles.iconBox}>
            <Ionicons name="help-circle-outline" size={21} color="#1677FF" />
          </View>

          <Text style={styles.actionText}>Help & Support</Text>
        </View>

        <Ionicons name="chevron-forward" size={20} color="#999" />
      </TouchableOpacity>

      {/* LOGOUT */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={21} color="#e53935" />

        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <Text style={styles.version}>Resumint AI • Version 1.0.0</Text>
    </ScrollView>
  );
}

/* Information Row */
function InfoRow({ icon, label, value }) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIcon}>
        <Ionicons name={icon} size={21} color="#1677FF" />
      </View>

      <View style={styles.infoTextContainer}>
        <Text style={styles.infoLabel}>{label}</Text>

        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
  },

  content: {
    paddingHorizontal: 18,
    paddingBottom: 40,
  },

  header: {
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: "#1677FF",
  },

  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 22,
    alignItems: "center",
    marginBottom: 18,

    elevation: 2,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  avatarContainer: {
    position: "relative",
    marginBottom: 12,
  },

  avatar: {
    width: 105,
    height: 105,
    borderRadius: 53,
    backgroundColor: "#E8F1FF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#1677FF",
  },

  cameraButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#1677FF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  name: {
    fontSize: 23,
    fontWeight: "700",
    color: "#222",
    marginTop: 3,
  },

  role: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },

  editButton: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1677FF",
    borderRadius: 9,
    paddingHorizontal: 18,
    paddingVertical: 9,
  },

  editText: {
    color: "#1677FF",
    fontWeight: "600",
    marginLeft: 7,
  },

  scoreCard: {
    backgroundColor: "#1677FF",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  scoreLabel: {
    color: "#FFFFFF",
    fontSize: 14,
    opacity: 0.9,
  },

  score: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "800",
    marginTop: 3,
  },

  scoreCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#333",
    marginBottom: 10,
    marginTop: 4,
  },

  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 20,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  infoTextContainer: {
    flex: 1,
  },

  infoLabel: {
    fontSize: 12,
    color: "#888",
    marginBottom: 3,
  },

  infoValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },

  actionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  actionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  actionText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },

  logoutButton: {
    marginTop: 15,
    backgroundColor: "#FFF0F0",
    borderRadius: 14,
    padding: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  logoutText: {
    color: "#E53935",
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 8,
  },

  version: {
    textAlign: "center",
    color: "#999",
    fontSize: 12,
    marginTop: 20,
  },
});
