import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import "./global.css";

const Tab = createBottomTabNavigator();

export default function App() {
  return <SafeAreaProvider></SafeAreaProvider>;
}
