import React, { useMemo } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { KAKAO_MAP_HTML } from "../../shared/constants/kakao";

export default function MapScreen() {
  const marketAreas = [
    {
      id: 1,
      name: "채소/과일 구역",
      location: "A구역 (입구에서 가까운 곳)",
      description: "신선한 채소와 과일을 구할 수 있는 구역",
      color: "green",
      status: "open",
      popularItems: ["신선 채소", "계절 과일", "건강 식재료"],
    },
    {
      id: 2,
      name: "수산물 구역",
      location: "B구역 (중앙부)",
      description: "바다에서 갓 잡아온 신선한 수산물",
      color: "blue",
      status: "open",
      popularItems: ["생선", "새우", "게", "조개류"],
    },
    {
      id: 3,
      name: "육류 구역",
      location: "C구역 (서쪽)",
      description: "엄선된 육류와 가공육",
      color: "red",
      status: "open",
      popularItems: ["소고기", "돼지고기", "닭고기", "양고기"],
    },
    {
      id: 4,
      name: "전통시장 맛집거리",
      location: "D구역 (동쪽)",
      description: "할머니 손맛이 가득한 전통 음식",
      color: "orange",
      status: "open",
      popularItems: ["국수", "떡볶이", "순대", "빈대떡"],
    },
    {
      id: 5,
      name: "공예품/기념품",
      location: "E구역 (북쪽)",
      description: "지역 특색이 담긴 공예품과 기념품",
      color: "purple",
      status: "open",
      popularItems: ["수제 공예품", "전통 소품", "기념품"],
    },
    {
      id: 6,
      name: "주차장",
      location: "시장 서쪽",
      description: "무료 주차 (2시간)",
      color: "gray",
      status: "open",
      popularItems: ["무료 주차", "2시간 제한"],
    },
  ];

  const nearbyPlaces = [
    {
      id: 1,
      name: "시장 공용 화장실",
      distance: "50m",
      color: "blue",
    },
    {
      id: 2,
      name: "ATM기",
      distance: "100m",
      color: "green",
    },
    {
      id: 3,
      name: "버스 정류장",
      distance: "200m",
      color: "orange",
    },
    {
      id: 4,
      name: "지하철역",
      distance: "500m",
      color: "purple",
    },
  ];

  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      green: "bg-green-500",
      blue: "bg-blue-500",
      red: "bg-red-500",
      orange: "bg-orange-500",
      purple: "bg-purple-500",
      gray: "bg-gray-500",
    };
    return colorMap[color] || "bg-gray-500";
  };

  const initialLat = 36.3681; // 충남대학교 근처
  const initialLng = 127.345;
  const mapHtml = useMemo(() => KAKAO_MAP_HTML(initialLat, initialLng), []);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="bg-white px-6 py-4 border-b border-gray-100">
        <Text className="text-2xl font-bold text-gray-900">시장 지도</Text>
        <Text className="text-gray-600">카카오 지도로 시장을 탐색해보세요</Text>
      </View>
      <View className="flex-1">
        <WebView originWhitelist={["*"]} source={{ html: mapHtml }} />
      </View>
    </SafeAreaView>
  );
}
