import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ActionKey = "mission" | "map" | "tour" | "event";

type QuickActionsProps = {
  onPress?: (key: ActionKey) => void;
};

const ACTIONS: {
  key: ActionKey;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  bgClass: string;
  color: string;
}[] = [
  {
    key: "mission",
    label: "미션",
    icon: "trophy-outline",
    bgClass: "bg-orange-100",
    color: "#ea580c",
  },
  {
    key: "tour",
    label: "투어",
    icon: "map-outline",
    bgClass: "bg-teal-100",
    color: "#0d9488",
  },
  {
    key: "map",
    label: "지도",
    icon: "location-outline",
    bgClass: "bg-indigo-100",
    color: "#4f46e5",
  },
  {
    key: "event",
    label: "이벤트",
    icon: "gift-outline",
    bgClass: "bg-rose-100",
    color: "#e11d48",
  },
];

const QuickActions: React.FC<QuickActionsProps> = ({ onPress }) => {
  return (
    <View className="px-6 mt-4">
      <View className="flex-row justify-between">
        {ACTIONS.map((a) => (
          <TouchableOpacity
            key={a.key}
            activeOpacity={0.8}
            onPress={() => onPress?.(a.key)}
            className={`flex-1 mx-1 rounded-2xl ${a.bgClass} items-center py-4`}
          >
            <View className="w-10 h-10 rounded-full bg-white/70 items-center justify-center mb-2">
              <Ionicons name={a.icon} size={20} color={a.color} />
            </View>
            <Text className="text-slate-700 font-medium">{a.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default QuickActions;
