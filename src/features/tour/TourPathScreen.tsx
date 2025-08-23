import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Alert,
  Animated,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Market } from "./types";
import { Course, fetchSpotDetail, fetchSpotMissions } from "../../shared/api";
import IconButton from "./components/IconButton";
import MissionInfoModal, { MissionInfo } from "./components/MissionInfoModal";
import { useCourseStore } from "../../shared/stores/courseStore";
import { useNavigation } from "@react-navigation/native";

// 네비게이션 타입 정의
type RootStackParamList = {
  Map: {
    spotToShow?: {
      spotId: string;
      name: string;
      latitude: number;
      longitude: number;
    };
  };
};

type NavigationProp = {
  navigate: (
    screen: keyof RootStackParamList,
    params?: RootStackParamList[keyof RootStackParamList]
  ) => void;
};

// API 응답 구조에 맞는 타입 정의
interface ApiMissionResponse {
  id: number;
  missionId: number;
  missionTitle: string;
  missionType: "VISIT" | "PHOTO" | "REVIEW" | "PURCHASE";
  rewardPoints: number;
  spotId: number;
  spotName: string;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

interface TourPathScreenProps {
  selectedMarket: Market;
  courseData: Course;
  onBack: () => void;
  onReset: () => void;
}

export default function TourPathScreen({
  courseData,
  onReset,
}: TourPathScreenProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [selectedSpotInfo, setSelectedSpotInfo] = useState<MissionInfo | null>(
    null
  );
  const [isSpotModalVisible, setIsSpotModalVisible] = useState(false);
  const [isSpotLoading, setIsSpotLoading] = useState(false);

  // Course store 사용
  const {
    detailedCourse: detailedCourseData,
    isLoading,
    setCurrentCourse,
    fetchCourseDetail,
    clearCourse,
  } = useCourseStore();

  // 네비게이션 훅 사용
  const navigation = useNavigation<NavigationProp>();

  // 지도에서 보기 기능
  const handleShowOnMap = () => {
    if (selectedSpotInfo) {
      // 모달을 먼저 닫고, 완전히 닫힌 후 상태 정리
      setIsSpotModalVisible(false);

      // 모달이 완전히 닫힌 후 상태 정리 (애니메이션 완료 후)
      setTimeout(() => {
        setSelectedSpotInfo(null);
      }, 300); // slide 애니메이션 완료 후

      // 지도 화면으로 이동하고 해당 스팟 정보 전달
      // detailedCourseData에서 해당 스팟의 GPS 좌표를 찾아서 전달
      if (detailedCourseData?.courseSpots) {
        const courseSpot = detailedCourseData.courseSpots.find(
          (spot) => spot.spotId.toString() === selectedSpotInfo.id
        );

        if (courseSpot) {
          navigation.navigate("Map", {
            spotToShow: {
              spotId: selectedSpotInfo.id,
              name: selectedSpotInfo.name,
              latitude: courseSpot.latitude,
              longitude: courseSpot.longitude,
            },
          });
        } else {
          // GPS 좌표를 찾을 수 없는 경우 기본값 사용
          navigation.navigate("Map", {
            spotToShow: {
              spotId: selectedSpotInfo.id,
              name: selectedSpotInfo.name,
              latitude: 36.3681, // 기본값
              longitude: 127.345,
            },
          });
        }
      } else {
        // courseSpots가 없는 경우 기본값 사용
        navigation.navigate("Map", {
          spotToShow: {
            spotId: selectedSpotInfo.id,
            name: selectedSpotInfo.name,
            latitude: 36.3681, // 기본값
            longitude: 127.345,
          },
        });
      }
    }
  };

  // 코스 상세 정보 가져오기
  useEffect(() => {
    // 현재 코스를 store에 설정
    setCurrentCourse(courseData);

    // 코스 상세 정보 가져오기 (store에서 중복 호출 방지)
    fetchCourseDetail(courseData.courseId);
  }, [courseData.courseId, setCurrentCourse, fetchCourseDetail]);

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
        label: "",
        onPress: () => console.log("미션 버튼 클릭"),
      },
      {
        id: "mission_1",
        image: require("../../assets/images/course/mission.png"),
        leftRatio: 0.7,
        topRatio: 0.5,
        label: "",
        onPress: () => console.log("미션 버튼 클릭"),
      },
      {
        id: "mission_2",
        image: require("../../assets/images/course/mission.png"),
        leftRatio: 0.05,
        topRatio: 0.07,
        label: "",
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
            { left: 0.6, top: 0.72 },
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
            { left: 0.6, top: 0.72 },
          ];
          leftRatio = positions[index]?.left || 0.5;
          topRatio = positions[index]?.top || 0.5;
        }

        return {
          id: `spot_${index}`,
          image: require("../../assets/images/course/spot.png"),
          leftRatio,
          topRatio,
          label: spot.spotName,
          onPress: () => handleSpotPress(`spot_${index}`),
        };
      });

    return [...missionButtons, ...spotButtons];
  }, [detailedCourseData]);

  // spot 버튼 핸들러
  const handleSpotPress = async (spotId: string) => {
    if (!detailedCourseData?.courseSpots) {
      return;
    }

    // courseSpots에서 해당 spot 정보 찾기
    const spotIndex = parseInt(spotId.split("_")[1]);

    // API의 courseSpots 배열에서 해당 인덱스의 spot 가져오기
    const courseSpot = detailedCourseData.courseSpots[spotIndex];

    if (courseSpot) {
      try {
        // 로딩 상태 없이 바로 모달 표시
        // setIsSpotLoading(true); // 로딩 상태 제거

        // 스팟 미션 정보만 가져오기 (새로운 API 구조 사용)
        const spotMissions = await fetchSpotMissions(courseSpot.spotId);

        // API 응답 로그 출력
        console.log(
          `/api/spots/${courseSpot.spotId}/missions 응답:`,
          spotMissions
        );

        // 새로운 API 구조에 맞게 SpotInfo 형식으로 변환
        const spotInfo: MissionInfo = {
          id: courseSpot.spotId.toString(),
          name: courseSpot.spotName,
          description: courseSpot.description,
          category: courseSpot.category,
          address: `${detailedCourseData.marketName} 내부`,
          missionCount: spotMissions.length,
          visitMissionTitles: spotMissions
            .filter((mission: any) => mission.missionType === "VISIT")
            .map((mission: any) => mission.title),
          missions: spotMissions.map((mission: any) => ({
            id: mission.missionId,
            missionId: mission.missionId,
            missionTitle: mission.title,
            missionType: mission.missionType,
            rewardPoints: mission.rewardPoints,
            spotId: courseSpot.spotId,
            spotName:
              mission.spotNames && mission.spotNames.length > 0
                ? mission.spotNames[0]
                : courseSpot.spotName,
            description: mission.description || "미션 설명이 준비 중입니다.",
          })),
        };

        setSelectedSpotInfo(spotInfo);
        setIsSpotModalVisible(true);
      } catch (error) {
        console.error("스팟 정보 조회 실패:", error);
        Alert.alert(
          "스팟 정보 조회 실패",
          "스팟의 미션 정보를 불러오는데 실패했습니다.\n잠시 후 다시 시도해주세요."
        );
      }
      // finally 블록 제거 (로딩 상태 설정하지 않음)
    }
  };

  // 도전하기 버튼 핸들러
  const handleChallenge = () => {
    console.log("도전하기 버튼 클릭됨!");
    console.log("선택된 스팟:", selectedSpotInfo?.name);
    console.log("미션 정보:", selectedSpotInfo?.missions);

    // TODO: 실제 미션 도전 로직 구현
    Alert.alert(
      "미션 도전",
      "미션 도전이 시작되었습니다!\n(현재는 로그만 출력됩니다)"
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
          onPress: () => {
            // courseStore에서 현재 코스 제거
            clearCourse();
            // 투어 처음 화면으로 돌아가기
            onReset();
          },
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
      {/* 고정 제목 */}
      <View className="absolute top-0 left-0 right-0 z-10 px-4 py-4 mx-4">
        <Text
          className="text-2xl text-black text-left"
          style={{
            fontFamily: "ChosunCentennial",
            textShadowColor: "white",
            textShadowOffset: { width: 3, height: 3 },
            textShadowRadius: 6,
          }}
        >
          {detailedCourseData?.name || courseData.name}
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <ImageBackground
          source={require("../../assets/images/course_background.jpg")}
          style={{
            width: screenWidth,
            height: screenHeight * 0.85,
          }}
          resizeMode="cover"
        >
          <SafeAreaView className="flex-1" edges={["left", "right"]}>
            {/* 아이콘 버튼들 */}
            {currentIconButtons.map((button) => (
              <IconButton
                key={button.id}
                id={button.id}
                image={button.image}
                leftRatio={button.leftRatio}
                topRatio={button.topRatio}
                label={button.label}
                onPress={button.onPress}
                disabled={false} // 로딩 상태와 관계없이 항상 활성화
              />
            ))}
          </SafeAreaView>
        </ImageBackground>
      </ScrollView>

      {/* 고정 플로팅 버튼들 */}
      <View className="absolute bottom-8 left-6 z-10">
        {/* X 버튼 (위로 튀어나옴) */}
        {isMenuOpen && (
          <Animated.View
            style={{
              transform: [
                {
                  translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, -40],
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
            className="mb-2"
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

      {/* Spot 정보 모달 */}
      <MissionInfoModal
        visible={isSpotModalVisible}
        spotInfo={selectedSpotInfo}
        onClose={() => {
          setIsSpotModalVisible(false);
          // 모달이 완전히 닫힌 후 상태 정리 (애니메이션 완료 후)
          setTimeout(() => {
            setSelectedSpotInfo(null);
          }, 300); // slide 애니메이션 완료 후
        }}
        onChallenge={handleChallenge}
        onShowOnMap={handleShowOnMap}
      />
    </View>
  );
}
