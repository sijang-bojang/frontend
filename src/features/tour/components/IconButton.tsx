import React, { useState, useEffect } from "react";
import { TouchableOpacity, Image, Animated, Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

interface IconButtonProps {
  id: string;
  image: any;
  leftRatio: number;
  topRatio: number;
  size?: number;
  onPress: () => void;
}

export default function IconButton({
  id,
  image,
  leftRatio,
  topRatio,
  size = 120,
  onPress,
}: IconButtonProps) {
  const [animation] = useState(new Animated.Value(1));

  const handlePress = () => {
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
      }}
    >
      <TouchableOpacity
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
        onPress={handlePress}
      >
        <Image
          source={image}
          style={{ width: size, height: size }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </Animated.View>
  );
}
