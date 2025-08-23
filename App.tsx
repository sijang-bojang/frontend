import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Font from "expo-font";
import { View, Text } from "react-native";

import "./global.css";

// 스크린 컴포넌트들 import
import HomeScreen from "./src/features/home/HomeScreen";
import MissionScreen from "./src/features/mission/MissionScreen";
import TourScreen from "./src/features/tour/TourScreen";
import MapScreen from "./src/features/map/MapScreen";
import ProfileScreen from "./src/features/profile/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        ChosunCentennial: require("./src/assets/fonts/ChosunCentennial_ttf.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>폰트 로딩 중...</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName: keyof typeof Ionicons.glyphMap;

                if (route.name === "Home") {
                  iconName = focused ? "home" : "home-outline";
                } else if (route.name === "Mission") {
                  iconName = focused ? "warning" : "warning-outline";
                } else if (route.name === "Tour") {
                  return <Entypo name="flag" size={size} color={color} />;
                } else if (route.name === "Map") {
                  iconName = focused ? "map" : "map-outline";
                } else if (route.name === "Profile") {
                  iconName = focused ? "person" : "person-outline";
                } else {
                  iconName = "help-outline";
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: "#0F0D85",
              tabBarInactiveTintColor: "#6b7280",
              tabBarStyle: {
                backgroundColor: "#ffffff",
                borderTopWidth: 0, // 상단 테두리 제거
                paddingTop: 5,
                paddingHorizontal: 20, // 좌우 패딩 추가
                height: 80, // 높이 증가
                borderTopLeftRadius: 20, // 위쪽 왼쪽 둥근 모서리
                borderTopRightRadius: 20, // 위쪽 오른쪽 둥근 모서리
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: -2,
                },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 10,
              },
              tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: "600",
                marginTop: 6,
              },
              tabBarIconStyle: {
                marginTop: 6,
              },
              headerShown: false,
            })}
          >
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: "홈",
                tabBarLabel: "홈",
              }}
            />
            <Tab.Screen
              name="Map"
              component={MapScreen}
              options={{
                title: "지도",
                tabBarLabel: "지도",
              }}
            />
            <Tab.Screen
              name="Tour"
              component={TourScreen}
              options={{
                title: "투어",
                tabBarLabel: "투어",
              }}
            />
            <Tab.Screen
              name="Mission"
              component={MissionScreen}
              options={{
                title: "미션",
                tabBarLabel: "미션",
              }}
            />
            <Tab.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                title: "마이페이지",
                tabBarLabel: "마이페이지",
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
