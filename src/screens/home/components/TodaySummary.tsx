import React from "react";
import { View, Text } from "react-native";

type SummaryItem = {
  id: number | string;
  label: string;
  value: string;
  dotClass: string; // 색 점 클래스
};

type TodaySummaryProps = {
  items: SummaryItem[];
};

const TodaySummary: React.FC<TodaySummaryProps> = ({ items }) => {
  return (
    <View className="px-6 mt-4">
      <View className="bg-white rounded-2xl border border-gray-200 p-5">
        <Text className="text-slate-900 font-semibold mb-3">오늘의 요약</Text>
        {items.map((item, idx) => (
          <View
            key={item.id}
            className={`flex-row items-center py-2 ${idx < items.length - 1 ? "border-b border-gray-100" : ""}`}
          >
            <View className={`w-2 h-2 rounded-full mr-3 ${item.dotClass}`} />
            <Text className="text-slate-500 mr-2 text-xs">{item.label}</Text>
            <Text className="text-slate-800 font-medium">{item.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default TodaySummary;
