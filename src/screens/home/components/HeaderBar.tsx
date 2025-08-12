import React from "react";
import { View, Text } from "react-native";

const HeaderBar: React.FC = () => (
  <View className="bg-white px-6 py-4 border-b border-gray-200">
    <Text className="text-lg font-semibold text-gray-900 text-center">
      SijangMission 로고
    </Text>
  </View>
);

export default HeaderBar;
