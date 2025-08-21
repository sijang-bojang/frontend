import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

type IntroStepProps = {
  onStart: () => void;
};

const IntroStep: React.FC<IntroStepProps> = ({ onStart }) => (
  <View className="px-6 pt-12 bg-white">
    <Text className="text-3xl font-extrabold text-gray-900 mb-3">
      투어를 시작하시겠습니까?
    </Text>
    <Text className="text-gray-600 mb-8">
      AI가 코스를 짜드려요. 간단한 선호도만 알려주세요.
    </Text>

    <TouchableOpacity
      activeOpacity={0.9}
      className="bg-indigo-600 rounded-2xl py-4 items-center"
      onPress={onStart}
    >
      <Text className="text-white font-semibold text-lg">Start</Text>
    </TouchableOpacity>
  </View>
);

export default IntroStep;
