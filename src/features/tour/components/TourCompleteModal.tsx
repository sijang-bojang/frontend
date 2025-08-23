import React from "react";
import { View, Text, TouchableOpacity, Modal, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width: screenWidth } = Dimensions.get("window");

interface TourCompleteModalProps {
  visible: boolean;
  tourName: string;
  tourDescription: string;
  onChallenge: () => void;
  onOtherChoice: () => void;
}

export default function TourCompleteModal({
  visible,
  tourName,
  tourDescription,
  onChallenge,
  onOtherChoice,
}: TourCompleteModalProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onOtherChoice}
    >
      <View className="flex-1 bg-black/50 justify-center items-center px-6">
        <View
          className="bg-white rounded-2xl w-full max-w-sm"
          style={{ maxWidth: screenWidth - 48 }}
        >
          {/* 헤더 */}
          <View className="px-0 pt-0 pb-0">
            {/* 파란색 헤더 바 */}
            <View
              className="rounded-t-2xl py-4 px-6 mb-6"
              style={{ backgroundColor: "#0F0D85" }}
            >
              <Text className="text-lg font-bold text-white text-center">
                투어가 생성되었습니다
              </Text>
            </View>

            {/* 투어명 */}
            <View className="px-6 mb-4">
              <Text className="text-base text-gray-700 text-center">
                {/* <Text className="font-bold text-xl">투어명: </Text> */}
                <Text className="font-bold text-xl">{tourName}</Text>
              </Text>
            </View>

            {/* 투어 설명 */}
            <View className="px-6 mb-6">
              <Text className="text-base text-gray-700 leading-6 text-center">
                {tourDescription}
              </Text>
            </View>
          </View>

          {/* 버튼 영역 */}
          <View className="px-6 pb-6">
            {/* 버튼 가로 배치 */}
            <View className="flex-row">
              {/* 도전 버튼 */}
              <TouchableOpacity
                className="flex-1 py-4 rounded-xl mr-2 items-center justify-center"
                style={{ backgroundColor: "#0F0D85" }}
                onPress={onChallenge}
              >
                <Text className="text-white text-center font-bold text-lg">
                  도전!
                </Text>
              </TouchableOpacity>

              {/* 다른 선택지 버튼 */}
              <TouchableOpacity
                className="flex-1 bg-slate-200 py-4 rounded-xl ml-2 items-center justify-center"
                onPress={onOtherChoice}
              >
                <Text className="text-slate-700 text-center font-medium">
                  다른 선택지
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
