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
    </View>

    {/* 공지사항 목록 */}
    <View className="space-y-3">
      {notices.map((item) => (
        <View
          key={item.id}
          className="bg-white px-4 py-3 border-b border-gray-100"
        >
          <Text className="text-gray-700 text-base">{item.text}</Text>
        </View>
      ))}
    </View>
  </View>
);

export default NoticesSection;
