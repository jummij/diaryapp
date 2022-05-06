import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewPost from "../components/NewPost";
import ViewPost from "../components/ViewPost";
import BottomTab from "./MainTab";

const Stack = createNativeStackNavigator();

//Tällä hetkellä tämä tiedosto ei ole käytössä, Stack navigaatio on App.js:ssä

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTab} />
      <Stack.Screen name="Add" component={NewPost} />
      <Stack.Screen name="ViewPost" component={ViewPost} />
    </Stack.Navigator>
  );
};

export default MainStack;
