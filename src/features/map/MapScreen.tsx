import React, { useMemo, useState, useRef } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
import { KAKAO_MAP_HTML } from "../../shared/constants/kakao";
import { MARKETS } from "../tour/data";
import { Market } from "../tour/types";

export default function MapScreen() {
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

  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [showMarketList, setShowMarketList] = useState(false);
  const webViewRef = useRef<WebView>(null);

  const handleMarketSelect = (market: Market) => {
    setSelectedMarket(market);
    setShowMarketList(false);

    // 시장의 좌표가 있으면 해당 위치로 이동
    if (market.latitude && market.longitude && webViewRef.current) {
      webViewRef.current.postMessage(
        JSON.stringify({
          type: "move_to_location",
          lat: market.latitude,
          lng: market.longitude,
        })
      );
    }
  };

  const handleWebViewMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      console.log("WebView 메시지:", data);
    } catch (error) {
      console.error("WebView 메시지 파싱 오류:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["left", "right"]}>
      {/* 상단 고정 시장 선택 */}
      <View className="absolute z-10 top-16 left-4 right-4">
        <TouchableOpacity
          onPress={() => setShowMarketList(!showMarketList)}
          className="bg-white rounded-full shadow-lg border border-gray-200 px-4 py-3 flex-row items-center"
        >
          <Ionicons name="location" size={20} color="#6B7280" />
          <Text className="flex-1 ml-3 text-gray-900 text-base">
            {selectedMarket ? selectedMarket.name : "시장을 선택하세요"}
          </Text>
          <Ionicons
            name={showMarketList ? "chevron-up" : "chevron-down"}
            size={20}
            color="#6B7280"
          />
        </TouchableOpacity>

        {/* 시장 목록 드롭다운 */}
        {showMarketList && (
          <View className="bg-white rounded-lg shadow-lg border border-gray-200 mt-2 max-h-60">
            <ScrollView className="max-h-60">
              {MARKETS.map((market) => (
                <TouchableOpacity
                  key={market.id}
                  onPress={() => handleMarketSelect(market)}
                  className="px-4 py-3 border-b border-gray-100"
                >
                  <Text className="text-gray-900 font-medium">
                    {market.name}
                  </Text>
                  <Text className="text-gray-500 text-sm mt-1">
                    {market.fullRegion}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      <View className="flex-1">
        <WebView
          ref={webViewRef}
          originWhitelist={["*"]}
          source={{ html: mapHtml }}
          onMessage={handleWebViewMessage}
          javaScriptEnabled={true}
        />
      </View>
    </SafeAreaView>
  );
}
