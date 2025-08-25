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
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Spot } from "../../../shared/types/market";
import {
  getSpotImageId,
  hasSpotImage,
} from "../../../shared/constants/spotImageMapping";
import {
  getImageUrl,
  hasImageUrl,
} from "../../../shared/constants/imageMapping";
import { fetchAddressFromCoordinates } from "../../../shared/api";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

const { height: screenHeight } = Dimensions.get("window");
const DRAG_THRESHOLD = 100; // 드래그 임계값

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
  const [detailedAddress, setDetailedAddress] = useState<string>("");
  const [addressLoading, setAddressLoading] = useState(false);

  // 드래그 제스처 핸들러
  const panGestureHandler =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: (_, context) => {
        (context as any).startY = translateY.value;
      },
      onActive: (event, context) => {
        const startY = (context as any).startY || 0;
        const newTranslateY = startY + event.translationY;
        // 위로는 드래그 제한
        if (newTranslateY < 0) {
          translateY.value = 0;
        } else {
          translateY.value = newTranslateY;
        }
      },
      onEnd: (event) => {
        const shouldClose = event.translationY > DRAG_THRESHOLD;

        if (shouldClose) {
          // 모달을 닫기
          translateY.value = withTiming(screenHeight, { duration: 300 }, () => {
            runOnJS(onClose)();
          });
          opacity.value = withTiming(0, { duration: 300 });
        } else {
          // 원래 위치로 복귀
          translateY.value = withTiming(0, { duration: 300 });
        }
      },
    });

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

    const loadDetailedAddress = async () => {
      if (!spot) return;

      setAddressLoading(true);
      try {
        const address = await fetchAddressFromCoordinates(
          spot.latitude,
          spot.longitude
        );
        setDetailedAddress(address);
      } catch (error) {
        console.error("상세 주소 로딩 실패:", error);
        setDetailedAddress(`${spot.marketName} 내부`);
      } finally {
        setAddressLoading(false);
      }
    };

    if (visible && spot) {
      loadSpotImage();
      loadDetailedAddress();
    }
  }, [visible, spot]);

  const modalStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const handleBackdropPress = () => {
    translateY.value = withTiming(screenHeight, { duration: 300 }, () => {
      runOnJS(onClose)();
    });
    opacity.value = withTiming(0, { duration: 300 });
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
      <PanGestureHandler onGestureEvent={panGestureHandler}>
        <Animated.View
          style={modalStyle}
          className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl"
        >
          {/* 드래그 핸들 */}
          <View className="items-center pt-3 pb-2">
            <View className="w-12 h-1 bg-gray-300 rounded-full" />
          </View>

          <View className="px-6">
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

                {/* 태그/필터 섹션 */}
                <View className="ml-1 mb-1 flex-row space-x-2">
                  <View className="border border-gray-400 px-2.5 py-1 rounded-full">
                    <Text className="text-gray-400 text-base font-medium">
                      {spot.category}
                    </Text>
                  </View>
                </View>

                {/* 스팟 이름 */}
                <Text className="ml-1 text-3xl font-bold text-gray-900 mb-0">
                  {spot.name}
                </Text>

                {/* 주소 */}
                <View className="ml-1 mb-1">
                  {addressLoading ? (
                    <View className="flex-row items-center">
                      <ActivityIndicator size="small" color="#6B7280" />
                      <Text className="text-gray-400 text-base ml-2">
                        주소 정보를 가져오는 중...
                      </Text>
                    </View>
                  ) : (
                    <Text className="text-gray-500 text-lg">
                      {detailedAddress || `${spot.marketName} 내부`}
                    </Text>
                  )}
                </View>

                {/* 스팟 이미지와 설명 오버레이 */}
                {(imageLoading || imageUri) && (
                  <View className="mb-6 relative">
                    {imageLoading ? (
                      <View className="h-96 bg-gray-100 rounded-2xl items-center justify-center">
                        <ActivityIndicator size="large" color="#10B981" />
                        <Text className="text-gray-500 mt-2">
                          이미지 로딩 중...
                        </Text>
                      </View>
                    ) : imageUri ? (
                      <View className="relative">
                        <Image
                          source={{ uri: imageUri }}
                          className="w-full h-96 rounded-2xl"
                          resizeMode="cover"
                          onError={() => {
                            // 이미지 로딩 실패 시 처리
                            setImageUri(null);
                          }}
                        />
                        {/* 설명 텍스트 오버레이 */}
                        <View className="absolute bottom-0 left-0 right-0 p-4 rounded-b-2xl">
                          {/* 그라디언트 배경 */}
                          <LinearGradient
                            colors={[
                              "rgba(0,0,0,0)",
                              "rgba(0,0,0,0.2)",
                              "rgba(0,0,0,0.7)",
                              "rgba(0,0,0,0.9)",
                            ]}
                            locations={[0, 0.6, 0.8, 1]}
                            style={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              right: 0,
                              height: 340,
                              borderRadius: 16,
                            }}
                          />

                          {/* 텍스트 */}
                          <Text className="text-white text-lg leading-6 relative z-10 p-3">
                            {spot.description}
                          </Text>
                        </View>
                      </View>
                    ) : null}
                  </View>
                )}

                {/* 이미지가 없을 때 설명 텍스트만 표시 */}
                {!imageLoading && !imageUri && (
                  <View className="mb-6 p-4 bg-gray-50 rounded-2xl">
                    <Text className="text-gray-700 text-base leading-6">
                      {spot.description}
                    </Text>
                  </View>
                )}

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
          </View>
        </Animated.View>
      </PanGestureHandler>
    </Modal>
  );
}
