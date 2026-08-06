import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name= 'index'/> */}
      <Stack.Screen name="create" />
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="welcome" />
      <Stack.Screen name="upload-screen" />
      <Stack.Screen name="resume-upload-applicant" />
      <Stack.Screen name="resume-upload-recruiter" />
      <Stack.Screen name="upload-success" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
