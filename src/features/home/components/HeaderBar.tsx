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
            resizeMode="contain"
            className="h-12 w-32 ml-2"
          />
        </View>
      </View>
    </View>
  );
};

export default HeaderBar;
