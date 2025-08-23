import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export interface SpotInfo {
  id: string;
  name: string;
  description: string;
  category: string;
  address?: string;
  // 미션 정보 추가
  missionCount?: number;
  visitMissionTitles?: string[];
  missions?: Array<{
    missionId: number;
    title: string;
    description: string;
    missionType: "VISIT" | "PHOTO" | "REVIEW" | "PURCHASE";
    rewardPoints: number;
  }>;
}

interface SpotInfoModalProps {
  visible: boolean;
  spotInfo: SpotInfo | null;
  onClose: () => void;
}

export default function SpotInfoModal({
  visible,
  spotInfo,
  onClose,
}: SpotInfoModalProps) {
  if (!spotInfo) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View
          className="bg-white rounded-2xl mx-6 max-h-120"
          style={{ width: screenWidth * 0.85 }}
        >
          {/* 헤더 */}
          <View className="flex-row items-center justify-between p-3 border-b border-gray-200">
            <View className="flex-row items-center">
              <Text
                className="text-xl font-bold text-gray-800 ml-2"
                style={{ fontFamily: "ChosunCentennial" }}
              >
                {spotInfo.name}
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} className="p-2">
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* 내용 */}
          <ScrollView className="p-4">
            {/* 카테고리 */}
            <View className="mb-4">
              <Text
                className="text-sm text-gray-500 mb-1"
                style={{ fontFamily: "ChosunCentennial" }}
              >
                카테고리
              </Text>
              <View className="bg-blue-100 px-3 py-2 rounded-full self-start">
                <Text
                  className="text-blue-800 font-medium"
                  style={{ fontFamily: "ChosunCentennial" }}
                >
                  {spotInfo.category}
                </Text>
              </View>
            </View>

            {/* 설명 */}
            <View className="mb-4">
              <Text
                className="text-sm text-gray-500 mb-1"
                style={{ fontFamily: "ChosunCentennial" }}
              >
                설명
              </Text>
              <Text
                className="text-gray-800 leading-5"
                style={{ fontFamily: "ChosunCentennial" }}
              >
                {spotInfo.description}
              </Text>
            </View>

            {/* 미션 정보 */}
            {spotInfo.missionCount && spotInfo.missionCount > 0 && (
              <View className="mb-4">
                <Text
                  className="text-sm text-gray-500 mb-2"
                  style={{ fontFamily: "ChosunCentennial" }}
                >
                  미션 ({spotInfo.missionCount}개)
                </Text>

                {/* 방문 미션 제목들 */}
                {spotInfo.visitMissionTitles &&
                  spotInfo.visitMissionTitles.length > 0 && (
                    <View className="mb-3">
                      <Text
                        className="text-sm text-gray-600 mb-2"
                        style={{ fontFamily: "ChosunCentennial" }}
                      >
                        방문 미션
                      </Text>
                      {spotInfo.visitMissionTitles.map((title, index) => (
                        <View
                          key={index}
                          className="bg-green-100 px-3 py-2 rounded-lg mb-2"
                        >
                          <Text
                            className="text-green-800 font-medium"
                            style={{ fontFamily: "ChosunCentennial" }}
                          >
                            {title}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}

                {/* 상세 미션 정보 */}
                {spotInfo.missions && spotInfo.missions.length > 0 && (
                  <View>
                    <Text
                      className="text-sm text-gray-600 mb-2"
                      style={{ fontFamily: "ChosunCentennial" }}
                    >
                      상세 미션
                    </Text>
                    {spotInfo.missions.map((mission, index) => (
                      <View
                        key={index}
                        className="bg-purple-100 px-3 py-2 rounded-lg mb-2"
                      >
                        <View className="flex-row justify-between items-center mb-1">
                          <Text
                            className="text-purple-800 font-medium"
                            style={{ fontFamily: "ChosunCentennial" }}
                          >
                            {mission.title}
                          </Text>
                          <View className="bg-purple-200 px-2 py-1 rounded-full">
                            <Text
                              className="text-purple-800 text-xs"
                              style={{ fontFamily: "ChosunCentennial" }}
                            >
                              {mission.rewardPoints}P
                            </Text>
                          </View>
                        </View>
                        <Text
                          className="text-purple-700 text-sm"
                          style={{ fontFamily: "ChosunCentennial" }}
                        >
                          {mission.description}
                        </Text>
                        <View className="mt-1">
                          <Text
                            className="text-purple-600 text-xs"
                            style={{ fontFamily: "ChosunCentennial" }}
                          >
                            타입: {mission.missionType}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            )}
          </ScrollView>

          {/* 닫기 버튼 */}
          <View className="p-4 border-t border-gray-200">
            <TouchableOpacity
              onPress={onClose}
              className="bg-gray-100 py-3 rounded-xl"
            >
              <Text
                className="text-center text-gray-700 font-medium"
                style={{ fontFamily: "ChosunCentennial" }}
              >
                닫기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
