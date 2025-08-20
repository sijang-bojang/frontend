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
  <View className="px-5 py-6">
    <View className="flex-row items-center justify-between mb-4">
      <Text className="text-xl font-bold text-gray-900">공지사항</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
        onPress={onPressAdd}
      >
        <Text className="text-gray-600 text-xl font-bold">+</Text>
      </TouchableOpacity>
    </View>

    {/* 공지사항 목록 */}
    <View className="space-y-3">
      {notices.map((item) => (
        <View
          key={item.id}
          className="bg-white rounded-xl border border-gray-100 px-4 py-3 shadow-sm"
        >
          <Text className="text-gray-700 text-base">{item.text}</Text>
        </View>
      ))}
    </View>
  </View>
);

export default NoticesSection;
