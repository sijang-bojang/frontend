import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HeaderBar: React.FC = () => {
  return (
    <View className=" px-5 py-3 border-b border-gray-200">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Image
            source={require("../../../assets/images/image.png")}
            className="w-32 h-12"
            resizeMode="contain"
          />
        </View>
        <Ionicons name="notifications-outline" size={24} color="#6b7280" />
      </View>
    </View>
  );
};

export default HeaderBar;
