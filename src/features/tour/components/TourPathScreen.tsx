import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Market } from "../types";
import { Course } from "../../../shared/api";

const { width: screenWidth } = Dimensions.get("window");
const GRID_SIZE = 6;
const CELL_SIZE = (screenWidth - 60) / GRID_SIZE; // 좌우 패딩 40씩

interface TourPathScreenProps {
  selectedMarket: Market;
  courseData: Course;
  onBack: () => void;
}

export default function TourPathScreen({
  selectedMarket,
  courseData,
  onBack,
}: TourPathScreenProps) {
  // 그리드 데이터 정의 (0: 빈칸, 1: 경로)
  // ㄹ 자 모양 경로
  const gridData = [
    [0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 0, 0],
  ];

  const renderGridCell = (row: number, col: number, cellType: number) => {
    const isStart = row === 0 && col === 0;
    const isFinish = row === 6 && col === 4;
    const isPath = cellType === 1;

    return (
      <View
        key={`${row}-${col}`}
        style={{
          width: CELL_SIZE,
          height: CELL_SIZE,
          borderWidth: 0.5,
          borderColor: "#E5E7EB",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "transparent",
          position: "relative",
        }}
      >
        {/* 경로 표시 */}
        {isPath && (
          <View
            style={{
              position: "absolute",
              width: CELL_SIZE,
              height: CELL_SIZE,
              backgroundColor: "#0F0D85",
              opacity: 0.3,
            }}
          />
        )}

        {isStart && (
          <View className="bg-blue-600 px-2 py-1 rounded z-10">
            <Text className="text-white font-bold text-xs">START</Text>
          </View>
        )}
        {isFinish && (
          <View className="bg-blue-600 px-2 py-1 rounded z-10">
            <Text className="text-white font-bold text-xs">FINISH</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["left", "right"]}>
      {/* 헤더 */}
      <View className="px-4 py-3 border-b border-gray-200">
        <View className="flex-row items-center justify-between mb-0">
          <TouchableOpacity onPress={onBack} className="p-2">
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <View className="flex-1 mx-3">
            <Text className="text-xl font-bold text-gray-900 text-center">
              {courseData.name}
            </Text>
          </View>
          <View className="w-10" />
        </View>
        <Text className="text-sm text-gray-600 text-center px-4">
          {courseData.description}
        </Text>
      </View>

      <View className="flex-1">
        {/* 코스 정보 */}
        <View className="px-4 py-4">
          <View className="flex-row items-center">
            <Ionicons name="location" size={16} color="#6B7280" />
            <Text className="ml-2 text-gray-700">{courseData.marketName}</Text>
          </View>
        </View>

        {/* 그리드 컨테이너 */}
        <View className="px-5 py-4">
          <View className="bg-gray-50 rounded-lg p-4">
            {gridData.map((row, rowIndex) => (
              <View key={rowIndex} className="flex-row">
                {row.map((cell, colIndex) =>
                  renderGridCell(rowIndex, colIndex, cell)
                )}
              </View>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
