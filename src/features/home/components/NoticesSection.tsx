import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Notice } from "../types";

type NoticesSectionProps = {
  notices: Notice[];
  onPressAdd?: () => void;
};

const NoticesSection: React.FC<NoticesSectionProps> = ({
  notices,
  onPressAdd,
}) => (
  <View className="px-6 py-6 border-t border-gray-200">
    <View className="flex-row items-center justify-between mb-4">
      <Text className="text-xl font-extrabold text-gray-900">공지사항</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        className="w-8 h-8 rounded-full border border-gray-300 items-center justify-center"
        onPress={onPressAdd}
      >
        <Text className="text-gray-500 text-xl">+</Text>
      </TouchableOpacity>
    </View>
    <View className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {notices.map((item, index) => (
        <View
          key={item.id}
          className={`px-4 py-3 ${index < notices.length - 1 ? "border-b border-gray-100" : ""}`}
        >
          <Text className="text-gray-700">{item.text}</Text>
        </View>
      ))}
    </View>
  </View>
);

export default NoticesSection;
