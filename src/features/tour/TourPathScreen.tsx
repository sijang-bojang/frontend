import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Alert,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Market } from "./types";
import { Course } from "../../shared/api";
import IconButton from "./components/IconButton";
import {
  iconButtonsData3Spots,
  iconButtonsData4Spots,
  iconButtonsData5Spots,
} from "./data/iconButtons";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

interface TourPathScreenProps {
  selectedMarket: Market;
  courseData: Course;
  onBack: () => void;
}

export default function TourPathScreen({
  selectedMarket,
  courseData,
  onBack,
}: TourPathScreenProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  // 코스 데이터의 spotCount에 따라 적절한 아이콘 데이터 선택
  const currentIconButtons = useMemo(() => {
    const spotCount = courseData.spotCount || 3; // 기본값 3

    switch (spotCount) {
      case 3:
        return iconButtonsData3Spots;
      case 4:
        return iconButtonsData4Spots;
      case 5:
        return iconButtonsData5Spots;
      default:
        return iconButtonsData3Spots; // 기본값
    }
  }, [courseData.spotCount]);

  const toggleMenu = () => {
    if (isMenuOpen) {
      // 메뉴 닫기
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setIsMenuOpen(false));
    } else {
      // 메뉴 열기
      setIsMenuOpen(true);
      Animated.timing(animation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleQuitCourse = () => {
    Alert.alert(
      "코스 그만두기",
      "코스를 그만두시겠습니까? \n모든 미션 내역이 사라집니다.",
      [
        {
          text: "계속하기",
          style: "cancel",
        },
        {
          text: "그만두기",
          style: "destructive",
          onPress: onBack,
        },
      ]
    );
  };

  return (
    <View className="flex-1">
      <ImageBackground
        source={require("../../assets/images/course_background.jpg")}
        style={{
          width: screenWidth,
          height: screenHeight * 0.85,
        }}
        resizeMode="cover"
      >
        <SafeAreaView className="flex-1" edges={["left", "right"]}>
          {/* 헤더 오버레이 */}
          <View className="px-4 py-4 mx-4">
            <Text
              className="text-2xl text-black text-left"
              style={{ fontFamily: "ChosunCentennial" }}
            >
              {courseData.name}
            </Text>
          </View>

          {/* 아이콘 버튼들 */}
          {currentIconButtons.map((button) => (
            <IconButton
              key={button.id}
              id={button.id}
              image={button.image}
              leftRatio={button.leftRatio}
              topRatio={button.topRatio}
              onPress={button.onPress}
            />
          ))}

          {/* 코스 그만두기 플로팅 버튼들 */}
          <View className="absolute bottom-8 left-6">
            {/* X 버튼 (위로 튀어나옴) */}
            {isMenuOpen && (
              <Animated.View
                style={{
                  transform: [
                    {
                      translateY: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, -60],
                      }),
                    },
                    {
                      scale: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.5, 1],
                      }),
                    },
                  ],
                  opacity: animation,
                }}
                className="mb-4"
              >
                <TouchableOpacity
                  onPress={handleQuitCourse}
                  className="bg-rose-400 rounded-full p-4 shadow-lg"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}
                >
                  <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
              </Animated.View>
            )}

            {/* ... 버튼 (메인) */}
            <TouchableOpacity
              onPress={toggleMenu}
              className="bg-gray-400 rounded-full p-4 shadow-lg"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <Ionicons name="ellipsis-horizontal" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
