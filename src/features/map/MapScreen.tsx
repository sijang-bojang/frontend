import React, { useMemo, useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
import { KAKAO_MAP_HTML } from "../../shared/constants/kakao";
import { Market } from "../tour/types";
import { Spot } from "../../shared/types/market";
import { useMarkets } from "../../shared/hooks/useMarkets";
import { fetchSpotsByMarket } from "../../shared/api";
import SpotInfoModal from "./components/SpotInfoModal";

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

  const { markets, loading, error } = useMarkets();
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [showMarketList, setShowMarketList] = useState(false);
  const [spots, setSpots] = useState<Spot[]>([]);
  const [spotsLoading, setSpotsLoading] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  const [showSpotModal, setShowSpotModal] = useState(false);
  const webViewRef = useRef<WebView>(null);

  const handleMarketSelect = async (market: Market) => {
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

    // 해당 시장의 스팟 데이터 로드
    await loadSpotsForMarket(market.marketId);
  };

  const loadSpotsForMarket = async (marketId: number) => {
    try {
      setSpotsLoading(true);

      // 실제 API 호출 (테스트 데이터 대신)
      const spotsData = await fetchSpotsByMarket(marketId);

      setSpots(spotsData);

      // 지도에 스팟 마커 표시
      if (webViewRef.current && spotsData.length > 0) {
        webViewRef.current.postMessage(
          JSON.stringify({
            type: "show_spots",
            spots: spotsData,
          })
        );
      }
    } catch (error) {
      console.error("스팟 데이터 로드 실패:", error);
    } finally {
      setSpotsLoading(false);
    }
  };

  const handleWebViewMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      console.log("WebView 메시지:", data);

      if (data.type === "spot_clicked") {
        setSelectedSpot(data.spot);
        setShowSpotModal(true);
      }
    } catch (error) {
      console.error("WebView 메시지 파싱 오류:", error);
    }
  };

  const handleCloseSpotModal = () => {
    setShowSpotModal(false);
    setSelectedSpot(null);
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["left", "right"]}>
      {/* 상단 고정 시장 선택 */}
      <View className="absolute z-10 top-16 pt-2 left-4 right-4">
        <TouchableOpacity
          onPress={() => setShowMarketList(!showMarketList)}
          activeOpacity={1}
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
            {loading ? (
              <View className="p-4 items-center">
                <ActivityIndicator size="small" color="#6B7280" />
                <Text className="text-gray-500 mt-2">
                  시장 데이터를 불러오는 중...
                </Text>
              </View>
            ) : error ? (
              <View className="p-4 items-center">
                <Text className="text-red-500 text-center">{error}</Text>
              </View>
            ) : (
              <ScrollView className="max-h-60">
                {markets.map((market: Market) => (
                  <TouchableOpacity
                    key={market.marketId}
                    onPress={() => handleMarketSelect(market)}
                    className="px-4 py-3 border-b border-gray-100"
                  >
                    <Text className="text-gray-900 font-medium">
                      {market.name}
                    </Text>
                    <Text className="text-gray-500 text-sm mt-1">
                      {market.address}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
        )}
      </View>

      {/* 스팟 로딩 인디케이터 */}
      {spotsLoading && (
        <View className="absolute z-10 top-32 left-4 bg-white rounded-lg shadow-lg px-4 py-2">
          <View className="flex-row items-center">
            <ActivityIndicator size="small" color="#6B7280" />
            <Text className="ml-2 text-gray-700 text-sm">
              스팟 정보를 불러오는 중...
            </Text>
          </View>
        </View>
      )}

      <View className="flex-1">
        <WebView
          ref={webViewRef}
          originWhitelist={["*"]}
          source={{ html: mapHtml }}
          onMessage={handleWebViewMessage}
          javaScriptEnabled={true}
        />
      </View>

      {/* 스팟 정보 모달 */}
      <SpotInfoModal
        visible={showSpotModal}
        spot={selectedSpot}
        onClose={handleCloseSpotModal}
      />
    </SafeAreaView>
  );
}
