import React, { useState, useMemo, useEffect } from "react";
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
import { Course, fetchCourseDetail } from "../../shared/api";
import IconButton from "./components/IconButton";
import SpotInfoModal, { SpotInfo } from "./components/SpotInfoModal";
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
  const [selectedSpotInfo, setSelectedSpotInfo] = useState<SpotInfo | null>(
    null
  );
  const [isSpotModalVisible, setIsSpotModalVisible] = useState(false);
  const [detailedCourseData, setDetailedCourseData] = useState<Course | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  // 코스 상세 정보 가져오기
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setIsLoading(true);
        const detailedData = await fetchCourseDetail(courseData.courseId);
        setDetailedCourseData(detailedData);
      } catch (error) {
        console.error("코스 상세 정보 가져오기 실패:", error);
        // 실패 시 기본 데이터 사용
        setDetailedCourseData(courseData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseData();
  }, [courseData.courseId]);

  // API 데이터를 사용한 실제 아이콘 버튼 생성
  const currentIconButtons = useMemo(() => {
    if (!detailedCourseData?.courseSpots) return [];

    console.log("코스의 spot 개수:", detailedCourseData.courseSpots.length);

    // mission 버튼들 (고정)
    const missionButtons = [
      {
        id: "mission_0",
        image: require("../../assets/images/course/mission.png"),
        leftRatio: 0.25,
        topRatio: 0.38,
        onPress: () => console.log("미션 버튼 클릭"),
      },
      {
        id: "mission_1",
        image: require("../../assets/images/course/mission.png"),
        leftRatio: 0.7,
        topRatio: 0.5,
        onPress: () => console.log("미션 버튼 클릭"),
      },
      {
        id: "mission_2",
        image: require("../../assets/images/course/mission.png"),
        leftRatio: 0.05,
        topRatio: 0.07,
        onPress: () => console.log("미션 버튼 클릭"),
      },
    ];

    // API 데이터를 사용한 실제 spot 버튼들 생성 (최대 5개까지만)
    const maxSpots = Math.min(detailedCourseData.courseSpots.length, 5);
    const spotButtons = detailedCourseData.courseSpots
      .slice(0, maxSpots)
      .map((spot, index) => {
        // spot 개수에 따라 위치 비율 조정
        let leftRatio, topRatio;

        if (maxSpots === 3) {
          // 3개일 때
          const positions = [
            { left: 0.4, top: 0.15 },
            { left: 0.58, top: 0.35 },
            { left: 0.25, top: 0.6 },
          ];
          leftRatio = positions[index]?.left || 0.5;
          topRatio = positions[index]?.top || 0.5;
        } else if (maxSpots === 4) {
          // 4개일 때
          const positions = [
            { left: 0.4, top: 0.15 },
            { left: 0.58, top: 0.35 },
            { left: 0.38, top: 0.5 },
            { left: 0.67, top: 0.72 },
          ];
          leftRatio = positions[index]?.left || 0.5;
          topRatio = positions[index]?.top || 0.5;
        } else {
          // 5개일 때
          const positions = [
            { left: 0.69, top: 0.02 },
            { left: 0.35, top: 0.18 },
            { left: 0.58, top: 0.33 },
            { left: 0.22, top: 0.58 },
            { left: 0.67, top: 0.72 },
          ];
          leftRatio = positions[index]?.left || 0.5;
          topRatio = positions[index]?.top || 0.5;
        }

        return {
          id: `spot_${index}`,
          image: require("../../assets/images/course/spot.png"),
          leftRatio,
          topRatio,
          onPress: () => handleSpotPress(`spot_${index}`),
        };
      });

    return [...missionButtons, ...spotButtons];
  }, [detailedCourseData]);

  // spot 버튼 클릭 핸들러
  const handleSpotPress = (spotId: string) => {
    if (!detailedCourseData?.courseSpots) {
      return;
    }

    // courseSpots에서 해당 spot 정보 찾기ㄴ
    const spotIndex = parseInt(spotId.split("_")[1]);

    // API의 courseSpots 배열에서 해당 인덱스의 spot 가져오기
    const courseSpot = detailedCourseData.courseSpots[spotIndex];

    if (courseSpot) {
      // API 데이터를 SpotInfo 형식으로 변환
      const spotInfo: SpotInfo = {
        id: courseSpot.spotId.toString(),
        name: courseSpot.spotName,
        description: courseSpot.description,
        category: courseSpot.category,
        address: `${detailedCourseData.marketName} 내부`,
      };

      setSelectedSpotInfo(spotInfo);
      setIsSpotModalVisible(true);
    }
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

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text style={{ fontFamily: "ChosunCentennial" }}>
          코스 정보를 불러오는 중...
        </Text>
      </View>
    );
  }

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
              {detailedCourseData?.name || courseData.name}
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

      {/* Spot 정보 모달 */}
      <SpotInfoModal
        visible={isSpotModalVisible}
        spotInfo={selectedSpotInfo}
        onClose={() => {
          setIsSpotModalVisible(false);
          setSelectedSpotInfo(null);
        }}
      />
    </View>
  );
}
