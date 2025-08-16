import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HeaderBar: React.FC = () => (
  <View className="bg-white px-5 py-4 border-b border-gray-200">
    <View className="flex-row items-center justify-between">
      <Ionicons name="chevron-back" size={22} color="#64748b" />
      <Text className="text-sm font-bold tracking-wider text-slate-600">
        TIMELINE
      </Text>
      <Ionicons name="ellipsis-horizontal" size={22} color="#64748b" />
    </View>
  </View>
);

export default HeaderBar;
