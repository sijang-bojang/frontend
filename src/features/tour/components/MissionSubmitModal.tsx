import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

interface MissionSubmitModalProps {
  visible: boolean;
  missionTitle: string;
  missionDescription: string;
  rewardPoints: number;
  onClose: () => void;
  onSubmit: (imageUri: string) => void;
}

export default function MissionSubmitModal({
  visible,
  missionTitle,
  missionDescription,
  rewardPoints,
  onClose,
  onSubmit,
}: MissionSubmitModalProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("권한 필요", "갤러리 접근 권한이 필요합니다.");
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    // 사용자에게 갤러리 또는 카메라 중 선택하도록 함
    Alert.alert("사진 선택", "어떤 방법으로 사진을 추가하시겠습니까?", [
      {
        text: "갤러리에서 선택",
        onPress: async () => {
          const hasPermission = await requestPermissions();
          if (!hasPermission) return;

          try {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 0.8,
            });

            if (!result.canceled && result.assets[0]) {
              setSelectedImage(result.assets[0].uri);
            }
          } catch (error) {
            Alert.alert("오류", "이미지를 선택하는 중 오류가 발생했습니다.");
          }
        },
      },
      {
        text: "카메라로 촬영",
        onPress: async () => {
          const { status } = await ImagePicker.requestCameraPermissionsAsync();
          if (status !== "granted") {
            Alert.alert("권한 필요", "카메라 접근 권한이 필요합니다.");
            return;
          }

          try {
            const result = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              aspect: [4, 3],
              quality: 0.8,
            });

            if (!result.canceled && result.assets[0]) {
              setSelectedImage(result.assets[0].uri);
            }
          } catch (error) {
            Alert.alert("오류", "사진을 촬영하는 중 오류가 발생했습니다.");
          }
        },
      },
      {
        text: "취소",
        style: "cancel",
      },
    ]);
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      Alert.alert("알림", "사진을 선택해주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(selectedImage);
      setSelectedImage(null);
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      Alert.alert("오류", "미션 제출 중 오류가 발생했습니다.");
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
                미션 도전하기
              </Text>
            </View>
            {/* 닫기 버튼 */}
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* 내용 */}
          <View className="p-4 pb-0">
            {/* 미션 제목과 포인트를 한 줄에 표시 */}
            <View className="flex-row items-center justify-between mb-3">
              <Text
                className="text-lg font-bold text-gray-800 flex-1 mr-3"
                style={{ fontFamily: "ChosunCentennial" }}
              >
                {missionTitle}
              </Text>

              {/* 보상 포인트를 제목 오른쪽에 표시 */}
              <View className="bg-orange-200 px-3 py-1 rounded-full">
                <Text
                  className="text-orange-800 text-sm font-bold"
                  style={{ fontFamily: "ChosunCentennial" }}
                >
                  {rewardPoints}P
                </Text>
              </View>
            </View>

            {/* 미션 설명 */}
            <View className="mb-4 p-3 bg-gray-50 rounded-lg">
              <Text
                className="text-gray-500 text-sm"
                style={{ fontFamily: "ChosunCentennial" }}
              >
                {missionDescription}
              </Text>
            </View>

            {/* 사진 업로드 영역 */}
            <View className="mb-4">
              {selectedImage ? (
                <View className="items-center">
                  <Image
                    source={{ uri: selectedImage }}
                    className="w-64 h-64 rounded-lg mb-4"
                    resizeMode="cover"
                  />
                  <TouchableOpacity
                    onPress={removeImage}
                    className="flex-row items-center bg-gray-50 border border-gray-200 px-3 py-2 rounded-full"
                  >
                    <Ionicons name="trash-outline" size={16} color="#374151" />
                    <Text
                      className="text-gray-700 font-medium ml-2 text-sm"
                      style={{ fontFamily: "ChosunCentennial" }}
                    >
                      사진 제거
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View className="items-center">
                  <TouchableOpacity onPress={pickImage}>
                    <View className="w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg items-center justify-center mb-4">
                      <Ionicons name="camera" size={40} color="#9CA3AF" />
                    </View>
                  </TouchableOpacity>
                  <Text
                    className="text-gray-500 text-center"
                    style={{ fontFamily: "ChosunCentennial" }}
                  >
                    사진 영역을 터치하여{"\n"}사진을 선택하세요
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* 버튼 영역 */}
          <View className="p-4 border-t border-gray-200 flex-row">
            {/* 제출 버튼 */}
            <TouchableOpacity
              className="flex-1 py-3 rounded-xl mr-2 items-center justify-center"
              style={{
                backgroundColor:
                  selectedImage && !isSubmitting
                    ? "#FB923C" // bg-orange-400
                    : "rgba(251, 146, 60, 0.4)", // bg-orange-400 with 40% opacity
              }}
              onPress={handleSubmit}
              disabled={!selectedImage || isSubmitting}
            >
              <Text
                className="text-white text-center font-medium"
                style={{ fontFamily: "ChosunCentennial" }}
              >
                {isSubmitting ? "제출 중..." : `제출하기 +${rewardPoints}P`}
              </Text>
            </TouchableOpacity>

            {/* 취소 버튼 */}
            <TouchableOpacity
              className="flex-1 border-2 border-orange-400 bg-white py-3 rounded-xl ml-2 items-center justify-center"
              onPress={onClose}
              disabled={isSubmitting}
            >
              <Text
                className="text-center text-orange-400 font-medium"
                style={{ fontFamily: "ChosunCentennial" }}
              >
                취소
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
