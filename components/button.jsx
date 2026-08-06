import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const ButtonSample = ({ backgroundColor, text, route, width, height, fontColor, fontSize, }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(route);
      }}
      style={[styles.touchableStyle, { backgroundColor: backgroundColor, width: width, height: height }]}
    >
      <Text style={{color: fontColor, fontSize: fontSize, }}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonSample;

const styles = StyleSheet.create({
  touchableStyle: {
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    marginHorizontal: 20,
  },
  
});
