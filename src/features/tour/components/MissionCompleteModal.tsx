import React from "react";
import { Modal, View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width: screenWidth } = Dimensions.get("window");

export interface MissionStatusInfo {
  id: string;
  name: string;
  description: string;
  category: string;
  address?: string;
  missions?: Array<{
    id: number;
    missionId: number;
    missionTitle: string;
    missionType: "VISIT" | "PHOTO" | "REVIEW" | "PURCHASE";
    rewardPoints: number;
    spotId: number;
    spotName: string;
    description?: string;
    isCompleted: boolean;
  }>;
}

interface MissionStatusModalProps {
  visible: boolean;
  spotInfo: MissionStatusInfo | null;
  onClose: () => void;
  onShowOnMap?: () => void;
}

export default function MissionStatusModal({
  visible,
  spotInfo,
  onClose,
  onShowOnMap,
}: MissionStatusModalProps) {
  if (!spotInfo) return null;

  const handleShowOnMap = () => {
    if (onShowOnMap) {
      onShowOnMap();
    }
  };

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
                {spotInfo.missions && spotInfo.missions.length > 0
                  ? spotInfo.missions[0].spotName
                  : "미션 정보"}
              </Text>
            </View>
            {/* 닫기 버튼 */}
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* 내용 */}
          <View className="p-4 pb-0">
            {/* 완료 상태 표시 */}
            <View className="mb-4">
              <View className="px-4 py-3 rounded-lg items-center">
                <Ionicons name="checkmark-circle" size={48} color="#10B981" />
                <Text
                  className="text-green-800 text-2xl font-bold text-center mt-2"
                  style={{ fontFamily: "ChosunCentennial" }}
                >
                  완료한 미션입니다!
                </Text>
                <Text
                  className="text-green-700 text-center mt-2"
                  style={{ fontFamily: "ChosunCentennial" }}
                >
                  이 장소의 미션을 성공적으로 완료했습니다.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
