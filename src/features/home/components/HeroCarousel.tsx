import React, { useRef } from "react";
import { View, Text, TouchableOpacity, Image, Animated } from "react-native";

const MarketNewsCard: React.FC = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    // 스케일 애니메이션
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    console.log("더보기 버튼 클릭됨");
    // 여기에 네비게이션이나 모달 등을 추가할 수 있습니다
  };

  return (
    <View className="relative items-center">
      <View
        className="bg-white rounded-3xl shadow-2xl"
        style={{
          width: 300,
          height: 320,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.3,
          shadowRadius: 20,
          elevation: 20,
        }}
      >
        {/* 시장 사진 영역 */}
        <View className="w-full h-56 overflow-hidden rounded-t-3xl">
          <Image
            source={require("../../../assets/images/sijang.png")}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

        {/* 카드 내용 */}
        <View className="p-6 pb-4">
          <Text className="text-center text-gray-700 text-base font-medium mb-0">
            신탄진시장
          </Text>
          <Text className="text-center text-gray-900 text-lg font-semibold mb-6 leading-6">
            [NEW OPEN!] 새로운 반찬가게가 생겼어요
          </Text>
        </View>

        {/* 더보기 버튼 - 카드 하단에 걸쳐있게 */}
        <View className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
              className="bg-white rounded-3xl px-6 py-2 border border-gray-200"
              activeOpacity={1.0}
              onPress={handlePress}
            >
              <Text className="text-gray-900 font-semibold text-base">
                더보기 →
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default MarketNewsCard;
