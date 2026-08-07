import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { Tabs } from "expo-router";
import { View } from "react-native";

const RTabsLayout = () => {
  const TabIcon = ({ name, focused }) => {
    return (
      <View style={{ gap: 10, alignItems: "center" }}>
        {focused ? (
          <Octicons name="home" size={24} color={"black"} />
        ) : (
          <Octicons name="home" size={24} color={"#C1B9F9"} />
        )}
      </View>
    );
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
          borderWidth: 0,
          height: 100,
          paddingTop: 20,
          marginHorizontal: 20,
          position: "absolute",
          borderRadius: 50,
          bottom: 20,
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "#C1B9F9",
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",

          tabBarIcon: ({ focused, color }) => {
            return <TabIcon name={"Home"} focused={focused} />;
          },
        }}
      />
      <Tabs.Screen
        name="resume-analysis"
        options={{
          title: "Resume Analysis",
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome5
              name="file-contract"
              size={24}
              color={focused ? "black" : "#C1B9F9"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="candidate-list"
        options={{
          title: "Candidate List",
          tabBarIcon: ({ focused, color }) => (
            <MaterialIcons
              name="work"
              size={24}
              color={focused ? "black" : "#C1B9F9"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="rankings"
        options={{
          title: "Rankings",
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome5
              name="user"
              size={24}
              color={focused ? "black" : "#C1B9F9"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="ai-question-assistant"
        options={{
          title: "AI Question Assistant",
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome5
              name="user"
              size={24}
              color={focused ? "black" : "#C1B9F9"}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default RTabsLayout;
