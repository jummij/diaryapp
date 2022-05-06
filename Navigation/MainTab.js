import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../components/Home";
import AllPosts from "../components/AllPosts";
import Ionicons from "@expo/vector-icons/Ionicons";
import Login from "../components/Login";
import RegisterScreen from "../components/Register";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName={Login}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Entries") {
            iconName = focused ? "ios-book" : "ios-book-outline";
          }
          return <Ionicons name={iconName} color="#ffb8d4" size={30} />;
        },
      })}
    >
      <Tab.Screen
        options={{
          tabBarStyle: { display: "none" },
          tabBarButton: (props) => null,
          headerShown: false,
        }}
        name="Login"
        component={Login}
      />
      <Tab.Screen
        options={{
          tabBarStyle: { display: "none" },
          tabBarButton: (props) => null,
          headerShown: false,
        }}
        name="Register"
        component={RegisterScreen}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Entries"
        component={AllPosts}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
