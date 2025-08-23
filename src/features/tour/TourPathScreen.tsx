import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  ScrollView,
  Alert,
  Animated,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Market } from "./types";
import { Course } from "../../shared/api";

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
  const [buttonAnimations] = useState(() =>
    new Map()
      .set("mission_0", new Animated.Value(1))
      .set("mission_1", new Animated.Value(1))
      .set("mission_2", new Animated.Value(1))
      .set("spot_0", new Animated.Value(1))
      .set("spot_1", new Animated.Value(1))
      .set("spot_2", new Animated.Value(1))
      .set("spot_3", new Animated.Value(1))
      .set("spot_4", new Animated.Value(1))
  );

  // 아이콘 버튼 설정 배열
  const iconButtons = [
    {
      id: "mission_0",
      image: require("../../assets/images/course/mission.png"),
      leftRatio: 0.25,
      topRatio: 0.38,
      onPress: () => {
        const anim = buttonAnimations.get("mission_0");
        if (anim) {
          Animated.sequence([
            Animated.timing(anim, {
              toValue: 0.8,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.spring(anim, {
              toValue: 1.1,
              friction: 3,
              tension: 40,
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 1,
              duration: 100,
              useNativeDriver: true,
            }),
          ]).start();
        }
        console.log("미션 버튼 클릭");
      },
    },
    {
      id: "mission_1",
      image: require("../../assets/images/course/mission.png"),
      leftRatio: 0.7,
      topRatio: 0.5,
      onPress: () => {
        const anim = buttonAnimations.get("mission_1");
        if (anim) {
          Animated.sequence([
            Animated.timing(anim, {
              toValue: 0.8,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.spring(anim, {
              toValue: 1.1,
              friction: 3,
              tension: 40,
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 1,
              duration: 100,
              useNativeDriver: true,
            }),
          ]).start();
        }
        console.log("미션 버튼 클릭");
      },
    },
    {
      id: "mission_2",
      image: require("../../assets/images/course/mission.png"),
      leftRatio: 0.05,
      topRatio: 0.07,
      onPress: () => {
        const anim = buttonAnimations.get("mission_2");
        if (anim) {
          Animated.sequence([
            Animated.timing(anim, {
              toValue: 0.8,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.spring(anim, {
              toValue: 1.1,
              friction: 3,
              tension: 40,
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 1,
              duration: 100,
              useNativeDriver: true,
            }),
          ]).start();
        }
        console.log("미션 버튼 클릭");
      },
    },
    {
      id: "spot_0",
      image: require("../../assets/images/course/spot.png"),
      leftRatio: 0.69,
      topRatio: 0.02,
      onPress: () => {
        const anim = buttonAnimations.get("spot_0");
        if (anim) {
          Animated.sequence([
            Animated.timing(anim, {
              toValue: 0.8,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.spring(anim, {
              toValue: 1.1,
              friction: 3,
              tension: 40,
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 1,
              duration: 100,
              useNativeDriver: true,
            }),
          ]).start();
        }
        console.log("스팟 버튼 클릭");
      },
    },
    {
      id: "spot_1",
      image: require("../../assets/images/course/spot.png"),
      leftRatio: 0.35,
      topRatio: 0.18,
      onPress: () => {
        const anim = buttonAnimations.get("spot_1");
        if (anim) {
          Animated.sequence([
            Animated.timing(anim, {
              toValue: 0.8,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.spring(anim, {
              toValue: 1.1,
              friction: 3,
              tension: 40,
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 1,
              duration: 100,
              useNativeDriver: true,
            }),
          ]).start();
        }
        console.log("스팟 버튼 클릭");
      },
    },
    {
      id: "spot_2",
      image: require("../../assets/images/course/spot.png"),
      leftRatio: 0.58,
      topRatio: 0.33,
      onPress: () => {
        const anim = buttonAnimations.get("spot_2");
        if (anim) {
          Animated.sequence([
            Animated.timing(anim, {
              toValue: 0.8,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.spring(anim, {
              toValue: 1.1,
              friction: 3,
              tension: 40,
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 1,
              duration: 100,
              useNativeDriver: true,
            }),
          ]).start();
        }
        console.log("스팟 버튼 클릭");
      },
    },
    {
      id: "spot_3",
      image: require("../../assets/images/course/spot.png"),
      leftRatio: 0.22,
      topRatio: 0.58,
      onPress: () => {
        const anim = buttonAnimations.get("spot_3");
        if (anim) {
          Animated.sequence([
            Animated.timing(anim, {
              toValue: 0.8,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.spring(anim, {
              toValue: 1.1,
              friction: 3,
              tension: 40,
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 1,
              duration: 100,
              useNativeDriver: true,
            }),
          ]).start();
        }
        console.log("스팟 버튼 클릭");
      },
    },
    {
      id: "spot_4",
      image: require("../../assets/images/course/spot.png"),
      leftRatio: 0.67,
      topRatio: 0.72,
      onPress: () => {
        const anim = buttonAnimations.get("spot_4");
        if (anim) {
          Animated.sequence([
            Animated.timing(anim, {
              toValue: 0.8,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.spring(anim, {
              toValue: 1.1,
              friction: 3,
              tension: 40,
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 1,
              duration: 100,
              useNativeDriver: true,
            }),
          ]).start();
        }
        console.log("스팟 버튼 클릭");
      },
    },
  ];

  // 아이콘 버튼 렌더링 함수
  const renderIconButton = (button: any) => {
    const left = screenWidth * button.leftRatio;
    const top = screenHeight * button.topRatio;
    const anim = buttonAnimations.get(button.id);

    return (
      <Animated.View
        key={button.id}
        style={{
          position: "absolute",
          left: left,
          top: top,
          transform: [{ scale: anim || 1 }],
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
          onPress={button.onPress}
        >
          <Image
            source={button.image}
            style={{ width: 120, height: 120 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Animated.View>
    );
  };

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
              className="text-2xl  text-black text-left"
              style={{ fontFamily: "ChosunCentennial" }}
            >
              {courseData.name}
            </Text>
          </View>

          {/* 미션 아이콘 버튼 */}
          {iconButtons.map(renderIconButton)}

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
