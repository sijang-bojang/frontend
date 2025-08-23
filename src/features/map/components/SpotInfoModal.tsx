import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  Dimensions,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Spot } from "../../../shared/types/market";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

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
  isLoading = false,
}: SpotInfoModalProps) {
  const translateY = useSharedValue(screenHeight);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      // 모달이 열릴 때
      opacity.value = withTiming(1, { duration: 300 });
      translateY.value = withTiming(0, { duration: 400 });
    } else {
      // 모달이 닫힐 때
      opacity.value = withTiming(0, { duration: 300 });
      translateY.value = withTiming(screenHeight, { duration: 400 });
    }
  }, [visible]);

  const gestureHandler =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: (_, context: any) => {
        context.startY = translateY.value;
      },
      onActive: (event, context: any) => {
        const newTranslateY = context.startY + event.translationY;
        // 위로는 드래그하지 못하도록 제한
        translateY.value = Math.max(0, newTranslateY);
      },
      onEnd: (event) => {
        // 드래그 거리가 충분하면 모달 닫기
        if (event.translationY > 100 || event.velocityY > 500) {
          translateY.value = withTiming(screenHeight, { duration: 300 });
          opacity.value = withTiming(0, { duration: 300 });
          runOnJS(onClose)();
        } else {
          // 원래 위치로 돌아가기
          translateY.value = withTiming(0, { duration: 300 });
        }
      },
    });

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const modalStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const handleBackdropPress = () => {
    onClose();
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
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />

      {/* 모달 컨텐츠 */}
      <Animated.View
        style={modalStyle}
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[90%] shadow-2xl"
      >
        {/* 드래그 핸들 */}
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View className="items-center pt-3 pb-2">
            <View className="w-12 h-1 bg-gray-300 rounded-full" />
          </Animated.View>
        </PanGestureHandler>

        <ScrollView
          className="flex-1 px-6 pt-4"
          showsVerticalScrollIndicator={false}
        >
          {/* 로딩 상태 */}
          {isLoading && (
            <View className="mb-6 p-8 items-center">
              <ActivityIndicator size="large" color="#10B981" />
              <Text className="text-gray-600 mt-4 text-center">
                스팟 정보를 불러오는 중...
              </Text>
            </View>
          )}

          {/* 스팟 정보 (로딩이 완료된 경우에만 표시) */}
          {!isLoading && spot && (
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
