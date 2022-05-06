import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./Navigation/MainTab";
import NewPost from "./components/NewPost";
import ViewPost from "./components/ViewPost";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={BottomTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Add" component={NewPost} options={{ title: "" }} />
        <Stack.Screen
          name="ViewPost"
          component={ViewPost}
          options={{ title: "" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
