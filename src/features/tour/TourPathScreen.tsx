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
import { Course, fetchSpotDetail, fetchSpotMissions, startUserMission, fetchUserMissionsByStatus, fetchMissionDetail, fetchUserCourseProgress } from "../../shared/api";
import IconButton from "./components/IconButton";
import MissionInfoModal, { MissionInfo } from "./components/MissionInfoModal";
import GeneralMissionModal, { GeneralMission } from "./components/GeneralMissionModal";
import { useCourseStore } from "../../shared/stores/courseStore";
import { useUserStore } from "../../shared/stores/userStore";
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
  
  // 일반 미션 모달 상태
  const [generalMissions, setGeneralMissions] = useState<GeneralMission[]>([]);
  const [selectedMission, setSelectedMission] = useState<GeneralMission | null>(null);
  const [isGeneralMissionModalVisible, setIsGeneralMissionModalVisible] = useState(false);
  const [courseProgress, setCourseProgress] = useState({ current: 0, total: 0, percentage: 0 });

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

  // 코스 진행도 가져오기
  useEffect(() => {
    const loadCourseProgress = async () => {
      if (!currentUser || !courseData.courseId) return;

      try {
        const userCourses = await fetchUserCourseProgress(currentUser.userId);
        const currentCourse = userCourses.find(course => course.courseId === courseData.courseId);
        
        if (currentCourse) {
          setCourseProgress({
            current: currentCourse.currentStep,
            total: currentCourse.totalSteps,
            percentage: currentCourse.progressPercentage
          });
        }
      } catch (error) {
        console.error('코스 진행도 조회 실패:', error);
      }
    };

    loadCourseProgress();
  }, [currentUser, courseData.courseId]);

  // API 데이터를 사용한 실제 아이콘 버튼 생성
  const currentIconButtons = useMemo(() => {
    if (!detailedCourseData?.courseSpots) return [];

    // mission 버튼들 (고정) - 이제 일반 미션 모달을 열도록 설정
    const missionButtons = [
      {
        id: "mission_0",
        image: require("../../assets/images/course/mission.png"),
        leftRatio: 0.25,
        topRatio: 0.38,
        label: "",
        onPress: () => handleMissionPress("mission_0"),
      },
      {
        id: "mission_1",
        image: require("../../assets/images/course/mission.png"),
        leftRatio: 0.7,
        topRatio: 0.5,
        label: "",
        onPress: () => handleMissionPress("mission_1"),
      },
      {
        id: "mission_2",
        image: require("../../assets/images/course/mission.png"),
        leftRatio: 0.05,
        topRatio: 0.07,
        label: "",
        onPress: () => handleMissionPress("mission_2"),
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
        // 스팟 미션 정보만 가져오기 (새로운 API 구조 사용)
        const spotMissions = await fetchSpotMissions(courseSpot.spotId);

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
        Alert.alert(
          "스팟 정보 조회 실패",
          "스팟의 미션 정보를 불러오는데 실패했습니다.\n잠시 후 다시 시도해주세요."
        );
      }
    }
  };

  // User store 사용
  const { currentUser } = useUserStore();

  // 미션 아이콘 버튼 핸들러
  const handleMissionPress = async (missionId: string) => {
    if (!currentUser) {
      Alert.alert(
        "로그인 필요",
        "미션을 확인하려면 로그인이 필요합니다."
      );
      return;
    }

    try {
      // 진행 중인 사용자 미션들 가져오기
      const inProgressMissions = await fetchUserMissionsByStatus(
        currentUser.userId,
        "IN_PROGRESS"
      );

      // 각 미션의 상세 정보 가져오기
      const missionDetails = await Promise.all(
        inProgressMissions.map(mission => fetchMissionDetail(mission.missionId))
      );

      // NON_VISIT 타입 (일반 미션)만 필터링
      const generalMissionList: GeneralMission[] = [];
      
      missionDetails.forEach((detail, index) => {
        const userMission = inProgressMissions[index];
        
        if (detail.isNonVisitType) {
          generalMissionList.push({
            missionId: detail.missionId,
            title: detail.title,
            description: detail.description,
            rewardPoints: detail.rewardPoints,
            status: userMission.status,
            isCompleted: userMission.completed,
            inProgress: userMission.inProgress
          });
        }
      });

      setGeneralMissions(generalMissionList);
      
      // 미션 버튼 ID에 따라 해당하는 미션 선택
      const missionIndex = parseInt(missionId.split('_')[1]); // mission_0, mission_1, mission_2에서 인덱스 추출
      const selectedMissionData = generalMissionList[missionIndex] || null;
      
      if (selectedMissionData) {
        setSelectedMission(selectedMissionData);
        setIsGeneralMissionModalVisible(true);
      } else {
        Alert.alert(
          '미션 없음',
          `${missionIndex + 1}번째 진행 중인 일반 미션이 없습니다.`
        );
      }
    } catch (error) {
      console.error('일반 미션 조회 실패:', error);
      Alert.alert(
        '미션 조회 실패',
        '미션 정보를 불러오는데 실패했습니다.'
      );
    }
  };

  // 도전하기 버튼 핸들러
  const handleChallenge = async () => {
    if (!selectedSpotInfo || !selectedSpotInfo.missions || selectedSpotInfo.missions.length === 0) {
      Alert.alert(
        "미션 도전 실패",
        "선택된 스팟의 미션 정보를 찾을 수 없습니다."
      );
      return;
    }

    if (!currentUser) {
      Alert.alert(
        "로그인 필요",
        "미션을 도전하려면 로그인이 필요합니다."
      );
      return;
    }

    try {
      // 첫 번째 미션을 도전 (예: VISIT 타입)
      const firstMission = selectedSpotInfo.missions[0];
      
      // 미션 시작 API 호출
      const userMissionResponse = await startUserMission(
        currentUser.userId,
        firstMission.missionId
      );

      Alert.alert(
        "미션 도전 시작!",
        `"${firstMission.missionTitle}" 미션을 시작했습니다!\n\n보상: ${firstMission.rewardPoints}포인트`,
        [
          {
            text: "확인",
            onPress: () => {
              // 모달 닫기
              setIsSpotModalVisible(false);
              setTimeout(() => {
                setSelectedSpotInfo(null);
              }, 300);
            },
          },
        ]
      );
    } catch (error) {
      console.error("미션 시작 실패:", error);
      Alert.alert(
        "미션 도전 실패",
        "미션 도전을 시작하는데 실패했습니다.\n잠시 후 다시 시도해주세요."
      );
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
      {/* 고정 제목과 진행도 */}
      <View className="absolute top-0 left-0 right-0 z-10 px-4 py-4 mx-4">
        <Text
          className="text-2xl text-black text-left mb-2"
          style={{
            fontFamily: "ChosunCentennial",
            textShadowColor: "white",
            textShadowOffset: { width: 3, height: 3 },
            textShadowRadius: 6,
          }}
        >
          {detailedCourseData?.name || courseData.name}
        </Text>
        
        {/* 코스 진행도 바 */}
        {courseProgress.total > 0 && (
          <View className="mt-2">
            <View className="flex-row justify-between items-center mb-1">
              <Text
                className="text-sm text-gray-700"
                style={{
                  fontFamily: "ChosunCentennial",
                  textShadowColor: "white",
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 3,
                }}
              >
                진행도: {courseProgress.current}/{courseProgress.total}
              </Text>
              <Text
                className="text-sm text-gray-700"
                style={{
                  fontFamily: "ChosunCentennial",
                  textShadowColor: "white",
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 3,
                }}
              >
                {Math.round(courseProgress.percentage)}%
              </Text>
            </View>
            <View className="w-full bg-white/70 rounded-full h-2">
              <View
                className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${courseProgress.percentage}%` }}
              />
            </View>
          </View>
        )}
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

      {/* 일반 미션 모달 */}
      <GeneralMissionModal
        visible={isGeneralMissionModalVisible}
        mission={selectedMission}
        onClose={() => {
          setIsGeneralMissionModalVisible(false);
          setSelectedMission(null);
        }}
      />
    </View>
  );
}
