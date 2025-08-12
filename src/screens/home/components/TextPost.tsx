import React from "react";
import { View, Text } from "react-native";

type TextPostProps = {
  author: string;
  time: string;
  content: string;
  accentColor?: string; // 배경 카드 색상
  textColor?: string; // 텍스트 색상
};

const TextPost: React.FC<TextPostProps> = ({
  author,
  time,
  content,
  accentColor = "bg-slate-400",
  textColor = "text-white",
}) => {
  return (
    <View className="px-6 mt-4">
      {/* 작성자 */}
      <View className="flex-row items-center mb-3">
        <View className="w-10 h-10 rounded-full bg-slate-300 mr-3" />
        <View>
          <Text className="text-slate-700 text-xs">{author}</Text>
          <Text className="text-slate-400 text-xs">{time}</Text>
        </View>
      </View>

      {/* 카드 */}
      <View className={`rounded-2xl ${accentColor} p-4`}>
        <Text className={`${textColor} text-base`}>{content}</Text>
      </View>
    </View>
  );
};

export default TextPost;
