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
}

export default function SpotInfoModal({
  visible,
  spot,
  onClose,
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
      <StatusBar backgroundColor="rgba(0,0,0,0.5)" barStyle="light-content" />

      {/* 배경 오버레이 */}
      <Animated.View style={overlayStyle} className="flex-1 bg-black/50">
        <TouchableOpacity
          className="flex-1"
          activeOpacity={1}
          onPress={handleBackdropPress}
        />
      </Animated.View>

      {/* 모달 컨텐츠 */}
      <Animated.View
        style={modalStyle}
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[85%]"
      >
        {/* 드래그 핸들 */}
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View className="items-center pt-3 pb-2">
            <View className="w-12 h-1 bg-gray-300 rounded-full" />
          </Animated.View>
        </PanGestureHandler>

        {/* 헤더 */}
        <View className="flex-row items-center justify-between px-6 pb-4 border-b border-gray-100">
          <Text className="text-xl font-bold text-gray-900">스팟 정보</Text>
          <TouchableOpacity
            onPress={onClose}
            className="p-2 rounded-full bg-gray-100"
          >
            <Ionicons name="close" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <ScrollView
          className="flex-1 px-6 pt-4"
          showsVerticalScrollIndicator={false}
        >
          {/* 스팟 이미지 */}
          {spot.imageUrl && (
            <View className="mb-6">
              <Image
                source={{ uri: spot.imageUrl }}
                className="w-full h-48 rounded-xl"
                resizeMode="cover"
              />
            </View>
          )}

          {/* 스팟 이름 */}
          <Text className="text-2xl font-bold text-gray-900 mb-3">
            {spot.name}
          </Text>

          {/* 카테고리 */}
          <View className="flex-row items-center mb-4">
            <View className="bg-blue-100 px-4 py-2 rounded-full">
              <Text className="text-blue-800 text-sm font-semibold">
                {spot.category}
              </Text>
            </View>
            {spot.missionCount && spot.missionCount > 0 && (
              <View className="bg-orange-100 px-4 py-2 rounded-full ml-3">
                <Text className="text-orange-800 text-sm font-semibold">
                  미션 {spot.missionCount}개
                </Text>
              </View>
            )}
          </View>

          {/* 시장 정보 */}
          <View className="flex-row items-center mb-6 p-4 bg-gray-50 rounded-xl">
            <Ionicons name="location" size={18} color="#6B7280" />
            <Text className="ml-3 text-gray-700 font-medium">
              {spot.marketName}
            </Text>
          </View>

          {/* 설명 */}
          <View className="mb-6">
            <Text className="text-gray-900 leading-7 text-base">
              {spot.description}
            </Text>
          </View>

          {/* 코스 정보 */}
          {spot.courseNames && spot.courseNames.length > 0 && (
            <View className="mb-6">
              <Text className="text-lg font-semibold text-gray-900 mb-3">
                포함된 코스
              </Text>
              {spot.courseNames.map((courseName, index) => (
                <View
                  key={index}
                  className="flex-row items-center p-4 bg-green-50 rounded-xl mb-3"
                >
                  <Ionicons name="map" size={18} color="#059669" />
                  <Text className="ml-3 text-green-800 font-medium">
                    {courseName}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </Animated.View>
    </Modal>
  );
}
