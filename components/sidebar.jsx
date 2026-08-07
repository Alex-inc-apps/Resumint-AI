import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const Sidebar = ({ visible, onClose }) => {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <Pressable style={styles.backdrop} onPress={onClose} />

      <View style={styles.sidebar}>
        <View style={styles.header}>
          <Text style={styles.logo}>Resumint AI</Text>

          <Pressable onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close-outline" size={25} color="#111111" />
          </Pressable>
        </View>

        <View style={styles.menuContainer}>
          <Pressable style={[styles.menuItem, styles.activeItem]}>
            <Ionicons name="grid-outline" size={21} color="#1473E6" />
            <Text style={styles.activeText}>Dashboard</Text>
          </Pressable>

          <Pressable
            style={styles.menuItem}
            onPress={() => router.push("/(tabs)/myResume")}
          >
            <Ionicons name="document-text-outline" size={21} color="#555555" />
            <Text style={styles.menuText}>Resume Analysis</Text>
          </Pressable>

          <Pressable
            style={styles.menuItem}
            onPress={() => router.push("/resumeFeedback")}
          >
            <Ionicons
              name="chatbox-ellipses-outline"
              size={21}
              color="#555555"
            />
            <Text style={styles.menuText}>Resume Feedback</Text>
          </Pressable>

          <Pressable
            style={styles.menuItem}
            onPress={() => router.push("/mockInterview")}
          >
            <Ionicons name="mic-outline" size={21} color="#555555" />
            <Text style={styles.menuText}>Mock Interview</Text>
          </Pressable>
        </View>

        <View style={styles.bottomMenu}>
          <Pressable style={styles.menuItem}>
            <Ionicons name="settings-outline" size={21} color="#555555" />
            <Text style={styles.menuText}>Settings</Text>
          </Pressable>

          <Pressable style={styles.menuItem} onPress={onClose}>
            <Ionicons name="log-out-outline" size={21} color="#D64545" />
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },

  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },

  sidebar: {
    width: "78%",
    height: "100%",
    backgroundColor: "#FFFFFF",
    paddingTop: 50,
    paddingHorizontal: 18,
    elevation: 10,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 35,
  },

  logo: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1473E6",
  },

  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F2F4F8",
    alignItems: "center",
    justifyContent: "center",
  },

  menuContainer: {
    gap: 8,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    paddingHorizontal: 14,
    borderRadius: 10,
  },

  activeItem: {
    backgroundColor: "#EEF6FF",
  },

  menuText: {
    marginLeft: 13,
    fontSize: 15,
    color: "#555555",
    fontWeight: "500",
  },

  activeText: {
    marginLeft: 13,
    fontSize: 15,
    color: "#1473E6",
    fontWeight: "700",
  },

  bottomMenu: {
    marginTop: "auto",
    paddingBottom: 25,
    gap: 8,
  },

  logoutText: {
    marginLeft: 13,
    fontSize: 15,
    color: "#D64545",
    fontWeight: "600",
  },
});
