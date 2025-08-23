import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  Text,
  View,
} from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

interface IconButtonProps {
  id: string;
  image: any;
  leftRatio: number;
  topRatio: number;
  size?: number;
  label?: string;
  onPress: () => void;
  disabled?: boolean;
}

export default function IconButton({
  id,
  image,
  leftRatio,
  topRatio,
  size = 120,
  label,
  onPress,
  disabled = false,
}: IconButtonProps) {
  const [animation] = useState(new Animated.Value(1));

  const handlePress = () => {
    if (disabled) return;

    Animated.sequence([
      Animated.timing(animation, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(animation, {
        toValue: 1.1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onPress();
  };

  const left = screenWidth * leftRatio;
  const top = screenHeight * topRatio;

  return (
    <Animated.View
      style={{
        position: "absolute",
        left,
        top,
        transform: [{ scale: animation }],
        alignItems: "center",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <TouchableOpacity
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: disabled ? 0.1 : 0.3,
          shadowRadius: 8,
          elevation: disabled ? 2 : 8,
        }}
        activeOpacity={disabled ? 1.0 : 0.8}
        onPress={handlePress}
        disabled={disabled}
      >
        <Image
          source={image}
          style={{
            width: size,
            height: size,
            opacity: disabled ? 0.7 : 1,
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* 라벨 텍스트 */}
      {label && (
        <View
          className={`-mt-6 px-2 py-1 rounded-lg ${disabled ? "bg-gray-500/70" : "bg-black/70"}`}
        >
          <Text
            className={`text-center ${disabled ? "text-gray-300" : "text-white"}`}
            style={{ fontFamily: "ChosunCentennial" }}
          >
            {label}
          </Text>
        </View>
      )}
    </Animated.View>
  );
}
