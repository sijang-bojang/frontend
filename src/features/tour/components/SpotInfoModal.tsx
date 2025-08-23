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
  // 미션 정보 추가 - API 응답 구조에 맞게 수정
  missionCount?: number;
  visitMissionTitles?: string[];
  missions?: Array<{
    id: number;
    missionId: number;
    missionTitle: string; // title -> missionTitle으로 변경
    missionType: "VISIT" | "PHOTO" | "REVIEW" | "PURCHASE";
    rewardPoints: number;
    spotId: number;
    spotName: string;
    description?: string; // description 필드 추가
  }>;
}

interface SpotInfoModalProps {
  visible: boolean;
  spotInfo: SpotInfo | null;
  onClose: () => void;
  onChallenge?: () => void; // 도전하기 버튼 핸들러 추가
}

export default function SpotInfoModal({
  visible,
  spotInfo,
  onClose,
  onChallenge,
}: SpotInfoModalProps) {
  if (!spotInfo) return null;

  const handleChallenge = () => {
    if (onChallenge) {
      onChallenge();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View
          className="bg-white rounded-2xl mx-6"
          style={{ width: screenWidth * 0.85 }}
        >
          {/* 헤더 */}
          <View className="flex-row items-center justify-between p-3 border-b border-gray-200">
            <View className="flex-row items-center">
              <Text
                className="pl-2 pt-2 text-xl font-bold text-orange-800"
                style={{ fontFamily: "ChosunCentennial" }}
              >
                {spotInfo.missions && spotInfo.missions.length > 0
                  ? spotInfo.missions[0].spotName
                  : "미션 정보"}
              </Text>
            </View>
          </View>

          {/* 내용 */}
          <View className="p-4">
            {/* 미션 정보 */}
            {spotInfo.missions && spotInfo.missions.length > 0 ? (
              spotInfo.missions.map((mission, index) => (
                <View key={index} className="mb-4">
                  {/* 미션 제목과 포인트를 한 줄에 표시 */}
                  <View className="flex-row items-center justify-between mb-3">
                    <Text
                      className="text-lg font-bold text-gray-800 flex-1 mr-3"
                      style={{ fontFamily: "ChosunCentennial" }}
                    >
                      {mission.missionTitle}
                    </Text>

                    {/* 보상 포인트를 제목 오른쪽에 표시 */}
                    <View className="bg-orange-200 px-3 py-1 rounded-full">
                      <Text
                        className="text-orange-800 text-sm font-bold"
                        style={{ fontFamily: "ChosunCentennial" }}
                      >
                        {mission.rewardPoints}P
                      </Text>
                    </View>
                  </View>

                  {/* Description 섹션 */}
                  <View className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <Text
                      className="text-gray-500 text-sm"
                      style={{ fontFamily: "ChosunCentennial" }}
                    >
                      {" "}
                      {mission.description || "설명이 없습니다."}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <View className="mb-4">
                <View className="bg-gray-100 px-3 py-2 rounded-lg">
                  <Text
                    className="text-gray-600 text-center"
                    style={{ fontFamily: "ChosunCentennial" }}
                  >
                    이 스팟에는 현재 미션이 없습니다.
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* 버튼 영역 */}
          <View className="p-4 border-t border-gray-200 flex-row">
            {/* 도전하기 버튼 */}
            {spotInfo.missions && spotInfo.missions.length > 0 && (
              <TouchableOpacity
                onPress={handleChallenge}
                className="flex-1 bg-orange-500 py-3 rounded-xl mr-2"
              >
                <Text
                  className="text-center text-white font-medium"
                  style={{ fontFamily: "ChosunCentennial" }}
                >
                  도전하기
                </Text>
              </TouchableOpacity>
            )}

            {/* 닫기 버튼 */}
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 bg-gray-100 py-3 rounded-xl ml-2"
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
