import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Market } from "../types";

type RegionSelectProps = {
  regions: string[];
  markets: Market[];
  onSelect: (market: Market) => void;
  onBack?: () => void;
  loading?: boolean;
};

const RegionSelect: React.FC<RegionSelectProps> = ({
  regions,
  markets,
  onSelect,
  onBack,
  loading = false,
}) => {
  const allRegions = useMemo(() => ["전체", ...regions], [regions]);
  const [active, setActive] = useState<string>("전체");
  const [keyword, setKeyword] = useState("");

  // 필터링된 시장 데이터
  const filteredMarkets = useMemo<Market[]>(() => {
    let filtered = markets;

    // 지역 필터링
    if (active !== "전체") {
      filtered = filtered.filter((market) => market.region === active);
    }

    // 키워드 검색
    if (keyword.trim()) {
      const searchTerm = keyword.toLowerCase().trim();
      filtered = filtered.filter(
        (market) =>
          market.name.toLowerCase().includes(searchTerm) ||
          market.fullRegion.toLowerCase().includes(searchTerm)
      );
    }

    return filtered;
  }, [markets, active, keyword]);

  const handlePress = (name: string) => {
    setActive(name);
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#6366F1" />
        <Text className="text-gray-600 mt-4">시장 정보를 불러오는 중...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      {/* 헤더 */}
      <View className="bg-white px-6 py-4 border-b border-gray-200">
        <View className="flex-row items-center">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onBack}
            className="mr-2"
          >
            <Ionicons name="chevron-back" size={22} color="#111827" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold text-gray-900">시장</Text>
        </View>
        <View className="flex-row items-center mt-4">
          <View className="flex-1 bg-gray-50 rounded-full px-4 py-3 border border-gray-200">
            <TextInput
              value={keyword}
              onChangeText={setKeyword}
              placeholder="시장 이름을 입력해주세요."
              placeholderTextColor="#9CA3AF"
              className="text-sm text-gray-800"
            />
          </View>
          <View className="ml-3 flex-row items-center">
            {keyword.length > 0 && (
              <TouchableOpacity
                className="w-9 h-9 rounded-full items-center justify-center mr-1"
                activeOpacity={0.7}
                onPress={() => setKeyword("")}
              >
                <Ionicons name="close" size={18} color="#9CA3AF" />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              className="w-9 h-9 rounded-full items-center justify-center"
              activeOpacity={0.7}
            >
              <Ionicons name="search-outline" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* 컨텐츠 */}
      <View className="flex-row flex-1">
        {/* 좌측 지역 리스트 패널 */}
        <View className="w-44 self-stretch border-r border-gray-100 bg-white">
          {allRegions.map((name) => (
            <TouchableOpacity
              key={name}
              activeOpacity={0.8}
              onPress={() => handlePress(name)}
              className={`px-6 py-5 border-b border-gray-100 flex-row items-center justify-between ${
                active === name ? "bg-indigo-50" : ""
              }`}
            >
              <View className="flex-row items-center">
                <Text
                  className={`${
                    active === name
                      ? "font-semibold text-indigo-700"
                      : "text-gray-600"
                  } text-base`}
                >
                  {name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* 우측 결과 영역: 시장 리스트 */}
        <View className="flex-1 px-6 pt-3 bg-white">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-sm text-gray-500">
              총 {filteredMarkets.length}곳
            </Text>
          </View>
          {filteredMarkets.length === 0 ? (
            <View className="flex-1 justify-center items-center">
              <Text className="text-gray-500 text-center">
                {keyword.trim()
                  ? "검색 결과가 없습니다."
                  : "해당 지역에 시장이 없습니다."}
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredMarkets}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  className="py-4 border-b border-gray-100 flex-row items-center justify-between"
                  onPress={() => onSelect(item)}
                >
                  <View className="flex-1 pr-3">
                    <Text
                      className="text-gray-900 font-medium"
                      numberOfLines={1}
                    >
                      {item.name}
                    </Text>
                    <Text
                      className="text-gray-500 text-xs mt-1"
                      numberOfLines={1}
                    >
                      {item.fullRegion}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default RegionSelect;
