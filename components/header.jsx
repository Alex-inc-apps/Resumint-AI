import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

<<<<<<< HEAD
const Header = ({
  text,
  showMenuButton = true,
  onMenuPress,
  showNotification = true,
  showProfileImage = false,
  profileImage,
  onProfileImagePress,
}) => {
=======

const Header = ({ text }) => {
>>>>>>> 231976957f1f540000a5fabbe0fc0f88226149bf
  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/welcome");
  };

  return (
    <View style={styles.safeAreaView}>
      <View style={styles.leftSection}>
        {showMenuButton ? (
          <Pressable
            onPress={onMenuPress || handleBackPress}
            style={styles.squareButtonStyle}
          >
            <Ionicons name="menu-outline" size={24} color="#111111" />
          </Pressable>
        ) : (
          <Pressable onPress={handleBackPress} style={styles.squareButtonStyle}>
            <Ionicons name="chevron-back-sharp" size={24} color="black" />
          </Pressable>
        )}
      </View>

      <Text style={styles.textStyle}>{text}</Text>

      <View style={styles.rightSection}>
        {showNotification ? (
          <Pressable style={styles.squareButtonStyle}>
            <Ionicons name="notifications-outline" size={22} color="#111111" />
          </Pressable>
        ) : null}

        {showProfileImage ? (
          <Pressable
            onPress={onProfileImagePress}
            style={styles.profileButtonStyle}
          >
            <Image
              source={
                typeof profileImage === "number"
                  ? profileImage
                  : { uri: profileImage }
              }
              style={styles.profileImageStyle}
            />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  safeAreaView: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E7EAF2",
  },
  leftSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  rightSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  squareButtonStyle: {
    backgroundColor: "#F2F4F8",
    borderRadius: 20,
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
  },
  profileButtonStyle: {
    marginLeft: 8,
    height: 40,
    width: 40,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#DDE2F0",
  },
  profileImageStyle: {
    width: "100%",
    height: "100%",
  },
  textStyle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: "#111111",
  },
});

export default Header;
