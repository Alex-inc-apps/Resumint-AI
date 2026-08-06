import { Stack } from "expo-router";

export default function RootLayout() {
  return (
   <Stack screenOptions={{headerShown: false}}>
    {/* <Stack.Screen name= 'index'/> */}
    <Stack.Screen name= 'create'/>
    <Stack.Screen name= 'sign-in'/>
    <Stack.Screen name= 'forgot-password'/>
    <Stack.Screen name= 'welcome'/>

  </Stack>
  )
}
 