import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HeaderBar: React.FC = () => {
  return (
    <View className=" px-5 py-3 border-b border-gray-200">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Image
            source={require("../../../assets/images/logo.png")}
            className="w-14 h-14 -mr-1.5"
            resizeMode="contain"
          />
          <Text
            className="text-3xl font-extrabold"
            style={{ color: "#0F0D85", letterSpacing: -1.5 }}
          >
            시장보장
          </Text>
        </View>
        <Ionicons name="notifications-outline" size={24} color="#6b7280" />
      </View>
    </View>
  );
};

export default HeaderBar;
