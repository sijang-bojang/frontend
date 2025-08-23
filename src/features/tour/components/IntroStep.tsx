import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

type IntroStepProps = {
  onStart: () => void;
};

const IntroStep: React.FC<IntroStepProps> = ({ onStart }) => (
  <View className="flex-1 bg-white px-6">
    <View className="flex-1 justify-center">
      <Text className="text-3xl font-extrabold text-gray-900 mb-4 text-center">
        투어를 시작하시겠습니까?
      </Text>
      <Text className="text-gray-600 mb-12 text-center text-lg">
        AI가 코스를 짜드려요. 간단한 선호도만 알려주세요.
      </Text>

      <TouchableOpacity
        activeOpacity={0.9}
        className="bg-indigo-600 rounded-2xl py-4 items-center mx-4"
        onPress={onStart}
      >
        <Text className="text-white font-semibold text-lg">시작하기</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default IntroStep;
