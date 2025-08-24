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

export interface GeneralMission {
  missionId: number;
  title: string;
  description: string;
  rewardPoints: number;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  isCompleted: boolean;
  inProgress: boolean;
}

interface GeneralMissionModalProps {
  visible: boolean;
  mission: GeneralMission | null; // 단일 미션으로 변경
  onClose: () => void;
}

export default function GeneralMissionModal({
  visible,
  mission,
  onClose,
}: GeneralMissionModalProps) {
  if (!mission) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent={true}
      hardwareAccelerated={true}
    >
      <View className="flex-1 bg-black/40 justify-center items-center">
        <View
          className="bg-white rounded-2xl mx-6 shadow-2xl"
          style={{ width: screenWidth * 0.85 }}
        >
          {/* 헤더 */}
          <View className="flex-row items-center justify-between p-3 border-b border-gray-200">
            <View className="flex-row items-center">
              <Text
                className="pl-1 pt-1 text-xl font-bold text-orange-800"
                style={{ fontFamily: "ChosunCentennial" }}
              >
                일반 미션
              </Text>
            </View>
            {/* 닫기 버튼 */}
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* 내용 */}
          <View className="p-4 pb-0">
            {/* 미션 정보 */}
            <View className="mb-4">
              {/* 미션 제목과 포인트를 한 줄에 표시 */}
              <View className="flex-row items-center justify-between mb-0">
                <Text
                  className="text-lg font-bold text-gray-800 flex-1 mr-3"
                  style={{ fontFamily: "ChosunCentennial" }}
                >
                  {mission.title}
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
                  {mission.description}
                </Text>
              </View>
            </View>
          </View>

          {/* 버튼 영역 - "진행중인 미션!" 텍스트만 표시 */}
          <View className="p-4 border-t border-gray-200">
            <View className="bg-orange-100 py-3 rounded-xl">
              <Text
                className="text-center text-orange-700 font-medium"
                style={{ fontFamily: "ChosunCentennial" }}
              >
                진행중인 미션
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
