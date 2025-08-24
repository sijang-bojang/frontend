import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Spot } from "../../../shared/types/market";
import { getSpotImageId, hasSpotImage } from "../../../shared/constants/spotImageMapping";
import { getImageUrl, hasImageUrl } from "../../../shared/constants/imageMapping";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const { height: screenHeight } = Dimensions.get("window");

interface SpotInfoModalProps {
  visible: boolean;
  spot: Spot | null;
  onClose: () => void;
  isCourseSpot?: boolean;
  courseInfo?: {
    courseName: string;
    stepNumber: number;
    totalSteps: number;
    courseType: string[];
  };
  onSpotVisitComplete?: () => void;
  onNavigateToSpot?: () => void;
  onShowOnMap?: () => void;
  isLoading?: boolean;
}

export default function SpotInfoModal({
  visible,
  spot,
  onClose,
  isCourseSpot = false,
  courseInfo,
  onSpotVisitComplete,
  onNavigateToSpot,
  onShowOnMap,
  isLoading = false,
}: SpotInfoModalProps) {
  const translateY = useSharedValue(screenHeight);
  const opacity = useSharedValue(0);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 300 });
      translateY.value = withTiming(0, { duration: 400 });
    } else {
      opacity.value = withTiming(0, { duration: 300 });
      translateY.value = withTiming(screenHeight, { duration: 400 });
    }
  }, [visible]);

  useEffect(() => {
    const loadSpotImage = () => {
      if (!spot || !hasSpotImage(spot.spotId)) {
        setImageUri(null);
        return;
      }

      setImageLoading(true);
      
      const imageId = getSpotImageId(spot.spotId);
      
      if (hasImageUrl(imageId)) {
        const imageUrl = getImageUrl(imageId);
        setImageUri(imageUrl);
      } else {
        setImageUri(null);
      }
      
      setImageLoading(false);
    };

    if (visible && spot) {
      loadSpotImage();
    }
  }, [visible, spot]);

  const modalStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const handleBackdropPress = () => {
    translateY.value = withTiming(screenHeight, { duration: 300 });
    opacity.value = withTiming(0, { duration: 300 });

    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!spot) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      {/* Backdrop */}
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        activeOpacity={1}
        onPress={handleBackdropPress}
      />

      {/* 모달 컨텐츠 */}
      <Animated.View
        style={modalStyle}
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[90%] shadow-2xl"
      >
        {/* 드래그 핸들 */}
        <View className="items-center pt-3 pb-2">
          <View className="w-12 h-1 bg-gray-300 rounded-full" />
        </View>

        <ScrollView
          className="flex-1 px-6 pt-4"
          showsVerticalScrollIndicator={false}
        >
          {/* 로딩 상태 */}
          {isLoading ? (
            <View className="mb-6 p-8 items-center">
              <ActivityIndicator size="large" color="#10B981" />
              <Text className="text-gray-600 mt-4 text-center">
                스팟 정보를 불러오는 중...
              </Text>
            </View>
          ) : (
            <>
              {/* 진행중인 코스 배지 */}
              {isCourseSpot && courseInfo && (
                <View className="mb-6 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border border-emerald-200">
                  <View className="flex-row items-center justify-between mb-3">
                    <View className="flex-row items-center">
                      <View className="w-3 h-3 bg-emerald-500 rounded-full mr-2 animate-pulse" />
                      <Text className="text-emerald-800 font-semibold text-base">
                        진행중인 코스
                      </Text>
                    </View>
                    <View className="bg-emerald-500 px-3 py-1 rounded-full">
                      <Text className="text-white text-sm font-bold">
                        {courseInfo.stepNumber} / {courseInfo.totalSteps}
                      </Text>
                    </View>
                  </View>

                  <Text className="text-emerald-900 font-bold text-lg mb-2">
                    {courseInfo.courseName}
                  </Text>

                  {/* 진행률 바 */}
                  <View className="bg-emerald-200 rounded-full h-2 mb-2">
                    <View
                      className="bg-emerald-500 h-2 rounded-full"
                      style={{
                        width: `${(courseInfo.stepNumber / courseInfo.totalSteps) * 100}%`,
                      }}
                    />
                  </View>

                  <Text className="text-emerald-700 text-sm text-center">
                    {Math.round(
                      (courseInfo.stepNumber / courseInfo.totalSteps) * 100
                    )}
                    % 완료
                  </Text>
                </View>
              )}

              {/* 스팟 이름과 카테고리 */}
              <View className="mb-6">
                <Text className="text-3xl font-bold text-gray-900 mb-3">
                  {spot.name}
                </Text>

                <View className="flex-row items-center">
                  <View className="bg-blue-100 px-4 py-2 rounded-full">
                    <Text className="text-blue-800 text-sm font-semibold">
                      {spot.category}
                    </Text>
                  </View>
                </View>
              </View>

              {/* 스팟 이미지 */}
              {(imageLoading || imageUri) && (
                <View className="mb-6">
                  {imageLoading ? (
                    <View className="h-48 bg-gray-100 rounded-2xl items-center justify-center">
                      <ActivityIndicator size="large" color="#10B981" />
                      <Text className="text-gray-500 mt-2">이미지 로딩 중...</Text>
                    </View>
                  ) : imageUri ? (
                    <Image
                      source={{ uri: imageUri }}
                      className="w-full h-48 rounded-2xl"
                      resizeMode="cover"
                    />
                  ) : null}
                </View>
              )}

              {/* 설명 */}
              <View className="mb-6 p-4 bg-gray-50 rounded-2xl">
                <Text className="text-gray-700 leading-6 text-base">
                  {spot.description}
                </Text>
              </View>

              {/* 액션 버튼들 */}
              {isCourseSpot && (
                <View className="mb-6 space-y-3">
                  <TouchableOpacity
                    onPress={onSpotVisitComplete}
                    className="bg-gradient-to-r from-emerald-500 to-green-500 py-4 px-6 rounded-2xl shadow-lg"
                  >
                    <View className="flex-row items-center justify-center">
                      <Ionicons
                        name="checkmark-circle"
                        size={24}
                        color="white"
                      />
                      <Text className="text-white font-bold text-lg ml-3">
                        이 스팟 방문 완료
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={onNavigateToSpot}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 py-4 px-6 rounded-2xl shadow-lg"
                  >
                    <View className="flex-row items-center justify-center">
                      <Ionicons name="navigate" size={20} color="white" />
                      <Text className="text-white font-bold text-lg ml-2">
                        길찾기
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={onShowOnMap}
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 py-4 px-6 rounded-2xl shadow-lg"
                  >
                    <View className="flex-row items-center justify-center">
                      <Ionicons name="map" size={20} color="white" />
                      <Text className="text-white font-bold text-lg ml-2">
                        지도에서 보기
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </>
          )}

          {/* 하단 여백 */}
          <View className="h-6" />
        </ScrollView>
      </Animated.View>
    </Modal>
  );
}