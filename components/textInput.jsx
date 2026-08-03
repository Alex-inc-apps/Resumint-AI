import { StyleSheet, Text, TextInput, View } from "react-native";

const TextInputField = ({
  label,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  value,
  onChangeText,
}) => {
  return (
    <View>
      {label ? <Text style={styles.labelStyle}>{label}</Text> : null}

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#8E8E93"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={styles.inputStyle}
      />
    </View>
  );
};

export default TextInputField;

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1C1C1E",
    marginBottom: 6,
  },
  inputStyle: {
    backgroundColor: "#E5E5EA",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    color: "#1C1C1E",
    fontSize: 15,
  },
});