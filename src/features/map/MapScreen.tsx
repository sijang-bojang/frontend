import React, { useMemo, useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
import { KAKAO_MAP_HTML } from "../../shared/constants/kakao";
import { Market } from "../tour/types";
import { Spot } from "../../shared/types/market";
import { useMarkets } from "../../shared/hooks/useMarkets";
import {
  fetchSpotsByMarket,
  fetchCoursesByMarket,
  Course,
} from "../../shared/api";
import { useCourseStore } from "../../shared/stores/courseStore";
import SpotInfoModal from "./components/SpotInfoModal";

export default function MapScreen() {
  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      green: "bg-green-500",
      blue: "bg-blue-500",
      red: "bg-red-500",
      orange: "bg-orange-500",
      purple: "bg-purple-500",
      gray: "bg-gray-500",
    };
    return colorMap[color] || "bg-gray-500";
  };

  const initialLat = 36.3681; // 충남대학교 근처
  const initialLng = 127.345;
  const mapHtml = useMemo(() => KAKAO_MAP_HTML(initialLat, initialLng), []);

  const { markets, loading, error } = useMarkets();
  const { currentCourse } = useCourseStore();

  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [showMarketList, setShowMarketList] = useState(false);
  const [spots, setSpots] = useState<Spot[]>([]);
  const [spotsLoading, setSpotsLoading] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  const [showSpotModal, setShowSpotModal] = useState(false);

  // 코스 관련 상태 추가
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showCourseList, setShowCourseList] = useState(false);
  const [coursesLoading, setCoursesLoading] = useState(false);

  const webViewRef = useRef<WebView>(null);

  // 현재 진행중인 코스가 있으면 자동으로 선택
  useEffect(() => {
    if (currentCourse && !selectedCourse) {
      setSelectedCourse(currentCourse);
      // 코스의 첫 번째 스팟으로 지도 이동
      if (currentCourse.courseSpots.length > 0) {
        const firstSpot = currentCourse.courseSpots[0];
        moveToLocation(firstSpot.latitude, firstSpot.longitude);
        // 코스 스팟들을 지도에 표시
        showCourseSpotsOnMap(currentCourse.courseSpots);
      }
    }
  }, [currentCourse]);

  const moveToLocation = (lat: number, lng: number) => {
    if (webViewRef.current) {
      webViewRef.current.postMessage(
        JSON.stringify({
          type: "move_to_location",
          lat: lat,
          lng: lng,
        })
      );
    }
  };

  const showCourseSpotsOnMap = (courseSpots: Course["courseSpots"]) => {
    if (webViewRef.current) {
      // 코스 스팟들을 Spot 형태로 변환
      const spotsForMap = courseSpots.map((courseSpot, index) => ({
        spotId: courseSpot.spotId,
        spotName: courseSpot.spotName,
        category: courseSpot.category,
        description: courseSpot.description,
        latitude: courseSpot.latitude,
        longitude: courseSpot.longitude,
        stepNumber: courseSpot.stepNumber,
        color: getCourseSpotColor(index, courseSpots.length),
      }));

      webViewRef.current.postMessage(
        JSON.stringify({
          type: "show_course_spots",
          spots: spotsForMap,
        })
      );
    }
  };

  const getCourseSpotColor = (index: number, total: number) => {
    const colors = ["green", "blue", "red", "orange", "purple"];
    return colors[index % colors.length];
  };

  const handleMarketSelect = async (market: Market) => {
    setSelectedMarket(market);
    setShowMarketList(false);
    setSelectedCourse(null); // 시장 선택 시 코스 선택 해제

    // 시장의 좌표가 있으면 해당 위치로 이동
    if (market.latitude && market.longitude) {
      moveToLocation(market.latitude, market.longitude);
    }

    // 해당 시장의 스팟 데이터 로드
    await loadSpotsForMarket(market.marketId);

    // 해당 시장의 코스 데이터 로드
    await loadCoursesForMarket(market.marketId);

    // 코스가 있으면 코스 선택 UI 표시
    if (courses.length > 0) {
      setShowCourseList(true);
    }
  };

  const handleCourseSelect = async (course: Course) => {
    setSelectedCourse(course);
    setShowCourseList(false);

    // 코스의 첫 번째 스팟으로 지도 이동
    if (course.courseSpots.length > 0) {
      const firstSpot = course.courseSpots[0];
      moveToLocation(firstSpot.latitude, firstSpot.longitude);

      // 코스 스팟들을 지도에 표시
      showCourseSpotsOnMap(course.courseSpots);
    }
  };

  const loadCoursesForMarket = async (marketId: number) => {
    try {
      setCoursesLoading(true);
      const coursesData = await fetchCoursesByMarket(marketId);
      setCourses(coursesData);
    } catch (error) {
      console.error("코스 데이터 로드 실패:", error);
    } finally {
      setCoursesLoading(false);
    }
  };

  const loadSpotsForMarket = async (marketId: number) => {
    try {
      setSpotsLoading(true);

      // 실제 API 호출 (테스트 데이터 대신)
      const spotsData = await fetchSpotsByMarket(marketId);

      setSpots(spotsData);

      // 지도에 스팟 마커 표시
      if (webViewRef.current && spotsData.length > 0) {
        webViewRef.current.postMessage(
          JSON.stringify({
            type: "show_spots",
            spots: spotsData,
          })
        );
      }
    } catch (error) {
      console.error("스팟 데이터 로드 실패:", error);
    } finally {
      setSpotsLoading(false);
    }
  };

  // 코스 스팟 정보를 Spot 형태로 변환하는 함수
  const convertCourseSpotToSpot = (
    courseSpot: Course["courseSpots"][0]
  ): Spot => {
    return {
      spotId: courseSpot.spotId,
      marketId: selectedMarket?.marketId || 0,
      name: courseSpot.spotName,
      category: courseSpot.category,
      description: courseSpot.description,
      latitude: courseSpot.latitude,
      longitude: courseSpot.longitude,
      marketName: selectedMarket?.name || "",
      imageUrl: null, // 코스 스팟에는 이미지가 없을 수 있음
      missionCount: 0,
      courseNames: [selectedCourse?.name || ""],
    };
  };

  // 코스 스팟 클릭 핸들러
  const handleCourseSpotClick = (courseSpot: Course["courseSpots"][0]) => {
    const spotData = convertCourseSpotToSpot(courseSpot);
    setSelectedSpot(spotData);
    setShowSpotModal(true);
  };

  // WebView 메시지 핸들러 업데이트
  const handleWebViewMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      console.log("WebView 메시지:", data);

      if (data.type === "spot_clicked") {
        // 코스 스팟인지 일반 스팟인지 확인
        if (data.spot.stepNumber && selectedCourse) {
          // 코스 스팟인 경우
          const courseSpot = selectedCourse.courseSpots.find(
            (spot) => spot.spotId === data.spot.spotId
          );
          if (courseSpot) {
            handleCourseSpotClick(courseSpot);
          }
        } else {
          // 일반 스팟인 경우
          setSelectedSpot(data.spot);
          setShowSpotModal(true);
        }
      }
    } catch (error) {
      console.error("WebView 메시지 파싱 오류:", error);
    }
  };

  const handleCloseSpotModal = () => {
    setShowSpotModal(false);
    setSelectedSpot(null);
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["left", "right"]}>
      {/* 상단 고정 시장/코스 선택 */}
      <View className="absolute z-10 top-16 pt-2 left-4 right-4">
        <TouchableOpacity
          onPress={() => setShowMarketList(!showMarketList)}
          activeOpacity={1}
          className="bg-white rounded-full shadow-lg border border-gray-200 px-4 py-3 flex-row items-center"
        >
          <Ionicons name="location" size={20} color="#6B7280" />
          <Text className="flex-1 ml-3 text-gray-900 text-base">
            {selectedCourse
              ? selectedCourse.name
              : selectedMarket
                ? selectedMarket.name
                : "시장을 선택하세요"}
          </Text>
          {currentCourse && !selectedCourse && (
            <View className="bg-green-100 px-2 py-1 rounded-full mr-2">
              <Text className="text-green-700 text-xs font-medium">진행중</Text>
            </View>
          )}
          <Ionicons
            name={showMarketList ? "chevron-up" : "chevron-down"}
            size={20}
            color="#6B7280"
          />
        </TouchableOpacity>

        {/* 시장/코스 목록 드롭다운 */}
        {showMarketList && (
          <View className="bg-white rounded-lg shadow-lg border border-gray-200 mt-2">
            {loading ? (
              <View className="p-4 items-center">
                <ActivityIndicator size="small" color="#6B7280" />
                <Text className="text-gray-500 mt-2">
                  데이터를 불러오는 중...
                </Text>
              </View>
            ) : error ? (
              <View className="p-4 items-center">
                <Text className="text-red-500 text-center">{error}</Text>
              </View>
            ) : (
              <View>
                {/* 진행중인 코스 섹션 - 진행중인 코스가 있을 때만 표시 */}
                {currentCourse && (
                  <View className="border-b border-gray-200">
                    <View className="px-4 py-2 bg-green-50">
                      <Text className="text-green-800 font-semibold text-sm">
                        진행중인 코스
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedCourse(currentCourse);
                        setSelectedMarket(
                          markets.find(
                            (m) => m.marketId === currentCourse.marketId
                          ) || null
                        );
                        setShowMarketList(false);

                        // 코스의 첫 번째 스팟으로 지도 이동
                        if (currentCourse.courseSpots.length > 0) {
                          const firstSpot = currentCourse.courseSpots[0];
                          moveToLocation(
                            firstSpot.latitude,
                            firstSpot.longitude
                          );
                          showCourseSpotsOnMap(currentCourse.courseSpots);
                        }
                      }}
                      className="px-4 py-3"
                    >
                      <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center flex-1">
                          <Ionicons name="map" size={20} color="#059669" />
                          <View className="ml-3 flex-1 justify-center">
                            <Text className="text-green-900 font-bold text-base">
                              {currentCourse.name}
                            </Text>
                          </View>
                        </View>
                        <View className="bg-green-500 px-2 py-1 rounded-full ml-3">
                          <Text className="text-white text-xs font-bold">
                            진행중
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}

                {/* 시장 목록 섹션 */}
                <View>
                  <View className="px-4 py-2 bg-gray-50">
                    <Text className="text-gray-700 font-semibold text-sm">
                      시장 선택
                    </Text>
                  </View>
                  {markets.map((market: Market) => (
                    <TouchableOpacity
                      key={market.marketId}
                      onPress={() => handleMarketSelect(market)}
                      className="px-4 py-3 border-b border-gray-100"
                    >
                      <View className="flex-row items-center justify-between">
                        <View className="flex-1">
                          <Text className="text-gray-900 font-medium">
                            {market.name}
                          </Text>
                          <Text className="text-gray-500 text-sm mt-1">
                            {market.address}
                          </Text>
                        </View>
                        <Ionicons
                          name="chevron-forward"
                          size={16}
                          color="#9CA3AF"
                        />
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}
      </View>

      {/* 스팟 로딩 인디케이터 */}
      {spotsLoading && (
        <View className="absolute z-10 top-48 left-4 bg-white rounded-lg shadow-lg px-4 py-2">
          <View className="flex-row items-center">
            <ActivityIndicator size="small" color="#6B7280" />
            <Text className="ml-2 text-gray-700 text-sm">
              스팟 정보를 불러오는 중...
            </Text>
          </View>
        </View>
      )}

      <View className="flex-1">
        <WebView
          ref={webViewRef}
          originWhitelist={["*"]}
          source={{ html: mapHtml }}
          onMessage={handleWebViewMessage}
          javaScriptEnabled={true}
        />
      </View>

      {/* 스팟 정보 모달 */}
      <SpotInfoModal
        visible={showSpotModal}
        spot={selectedSpot}
        onClose={handleCloseSpotModal}
        isCourseSpot={
          selectedCourse && selectedSpot
            ? selectedCourse.courseSpots.some(
                (spot) => spot.spotId === selectedSpot.spotId
              )
            : false
        }
        courseInfo={
          selectedCourse && selectedSpot
            ? {
                courseName: selectedCourse.name,
                stepNumber:
                  selectedCourse.courseSpots.find(
                    (spot) => spot.spotId === selectedSpot.spotId
                  )?.stepNumber || 1,
                totalSteps: selectedCourse.courseSpots.length,
                courseType: selectedCourse.typeNames,
              }
            : undefined
        }
      />
    </SafeAreaView>
  );
}
