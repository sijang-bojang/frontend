import React, { useMemo, useMemo as _memo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DAEJEON_REGIONS, searchMarkets } from "../data";
import { RegionKey, Market } from "../types";

type RegionSelectProps = {
  regions: string[];
  onSelect: (name: string) => void;
  onBack?: () => void;
};

const RegionSelect: React.FC<RegionSelectProps> = ({
  regions,
  onSelect,
  onBack,
}) => {
  const allRegions = useMemo(() => ["전체", ...regions], [regions]);
  const [active, setActive] = useState<RegionKey>(allRegions[0] as RegionKey);
  const [keyword, setKeyword] = useState("");
  const data = useMemo<Market[]>(
    () => searchMarkets(keyword, active),
    [keyword, active]
  );

  const handlePress = (name: string) => {
    setActive(name as RegionKey);
    onSelect(name);
  };

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
            <Ionicons name="chevron-back" size={20} color="#374151" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-gray-900">시장</Text>
        </View>
        <View className="flex-row items-center mt-4">
          <View className="flex-1 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
            <TextInput
              value={keyword}
              onChangeText={setKeyword}
              placeholder="시장 이름을 입력해주세요."
              placeholderTextColor="#9CA3AF"
              className="text-sm text-gray-800"
            />
          </View>
          <TouchableOpacity
            className="ml-3 w-9 h-9 rounded-full items-center justify-center"
            activeOpacity={0.7}
          >
            <Ionicons name="search-outline" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 컨텐츠 */}
      <View className="flex-row px-6 pt-4">
        {/* 좌측 지역 리스트 패널 */}
        <View className="w-36 bg-gray-200 rounded mr-4">
          {allRegions.map((name) => (
            <TouchableOpacity
              key={name}
              activeOpacity={0.8}
              onPress={() => handlePress(name)}
              className={`px-4 py-3 ${active === name ? "bg-white" : ""}`}
            >
              <Text
                className={`${active === name ? "font-bold text-gray-900" : "text-gray-800"}`}
              >
                {name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 우측 결과 영역: 시장 리스트 */}
        <View className="flex-1">
          <FlatList
            data={data}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.8}
                className="bg-white rounded-xl border border-gray-200 p-4 mb-2"
                onPress={() => onSelect(item.name)}
              >
                <Text className="text-gray-900 font-medium">{item.name}</Text>
                <Text className="text-gray-500 text-xs mt-1">
                  {item.region}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default RegionSelect;
