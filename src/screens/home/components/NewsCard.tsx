import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

type NewsCardProps = {
  onPressMore?: () => void;
};

const NewsCard: React.FC<NewsCardProps> = ({ onPressMore }) => (
  <View className="px-6 py-6">
    <Text className="text-xl font-extrabold text-gray-900 text-center">
      Sijang 소식
    </Text>
    <Text className="text-gray-600 text-center mt-2">
      최신 시장과 근처 가게 관련 소식을 알려드립니다.
    </Text>

    <View className="mt-6 rounded-2xl overflow-hidden">
      <View className="h-48 bg-pink-200" />
      <View className="bg-gray-200 p-5 items-center">
        <Text className="text-gray-700 mb-3">관련 새소식</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          className="px-5 py-2 rounded-full bg-pink-200"
          onPress={onPressMore}
        >
          <Text className="text-gray-900 font-medium">더보기 →</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default NewsCard;
