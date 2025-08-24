import React, { useMemo, useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { KAKAO_MAP_HTML } from "../../shared/constants/kakao";
import { Market } from "../tour/types";
import { Spot } from "../../shared/types/market";
import { useMarkets } from "../../shared/hooks/useMarkets";
import {
  fetchSpotsByMarket,
  fetchCoursesByMarket,
  fetchSpotDetail,
  Course,
} from "../../shared/api";
import { useCourseStore } from "../../shared/stores/courseStore";
import SpotInfoModal from "./components/SpotInfoModal";
import { useRoute } from "@react-navigation/native";

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

  // 사용자 위치 상태
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [locationLoading, setLocationLoading] = useState(true);

  // 지도 HTML 생성 (사용자 위치가 있을 때만)
  const mapHtml = useMemo(() => {
    if (userLocation) {
      return KAKAO_MAP_HTML(userLocation.latitude, userLocation.longitude);
    }
    // 사용자 위치가 없으면 기본 위치(대전역) 사용
    return KAKAO_MAP_HTML(36.3322, 127.4342);
  }, [userLocation]);

  const { markets, loading, error } = useMarkets();
  const { currentCourse } = useCourseStore();

  // 네비게이션 파라미터 받기
  const route = useRoute();
  const spotToShow = (route.params as any)?.spotToShow;

  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [showMarketList, setShowMarketList] = useState(false);
  const [spots, setSpots] = useState<Spot[]>([]);
  const [spotsLoading, setSpotsLoading] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  const [showSpotModal, setShowSpotModal] = useState(false);
  const [spotDetailLoading, setSpotDetailLoading] = useState(false);

  // 코스 관련 상태 추가
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showCourseList, setShowCourseList] = useState(false);
  const [coursesLoading, setCoursesLoading] = useState(false);

  const webViewRef = useRef<WebView>(null);

  // 사용자 위치를 지도에 표시하는 함수
  const showUserLocationOnMap = (lat: number, lng: number) => {
    if (webViewRef.current) {
      webViewRef.current.postMessage(
        JSON.stringify({
          type: "show_user_location",
          lat,
          lng,
        })
      );
    }
  };

  // 사용자 위치 가져오기
  const getUserLocation = async () => {
    try {
      setLocationLoading(true);

      // 위치 권한 요청
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setLocationLoading(false);
        return;
      }

      // 현재 위치 가져오기
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 10000,
        distanceInterval: 10,
      });

      const { latitude, longitude } = location.coords;

      setUserLocation({ latitude, longitude });

      // WebView에 사용자 위치 마커 표시 요청 (항상 표시)
      showUserLocationOnMap(latitude, longitude);
    } catch (error) {
      Alert.alert(
        "위치 정보 오류",
        "현재 위치를 가져올 수 없습니다. 기본 위치를 사용합니다."
      );
    } finally {
      setLocationLoading(false);
    }
  };

  // 앱 시작 시 사용자 위치 가져오기
  useEffect(() => {
    getUserLocation();
  }, []);

  // 사용자 위치가 설정될 때마다 지도에 표시
  useEffect(() => {
    if (userLocation && webViewRef.current) {
      setTimeout(() => {
        showUserLocationOnMap(userLocation.latitude, userLocation.longitude);
      }, 500);
    }
  }, [userLocation]);

  // currentCourse 변경 시 지도 상태 관리
  useEffect(() => {
    if (!currentCourse && webViewRef.current) {
      // 진행중인 코스가 없으면 spot 마커들만 제거하고 사용자 위치는 유지
      setTimeout(() => {
        webViewRef.current?.postMessage(
          JSON.stringify({
            type: "clear_spots_only",
          })
        );
        // 사용자 위치 다시 표시
        if (userLocation) {
          showUserLocationOnMap(userLocation.latitude, userLocation.longitude);
        }
      }, 100);
    }
  }, [currentCourse, userLocation]);

  // markets 데이터가 로드된 후 진행중인 코스가 있을 때만 코스 spot 데이터 로드
  useEffect(() => {
    if (markets && markets.length > 0 && currentCourse) {
      loadCurrentCourseSpots();
    }
  }, [markets, currentCourse]);

  // 진행중인 코스가 있을 때만 해당 코스의 spot들을 로드하는 함수
  const loadCurrentCourseSpots = async () => {
    if (!markets || markets.length === 0 || !currentCourse) return;

    try {
      setSpotsLoading(true);
      
      // courseStore에서 상세 정보 가져오기
      const { fetchCourseDetail } = useCourseStore.getState();
      await fetchCourseDetail(currentCourse.courseId);

      // 상세 정보가 업데이트된 후 코스 스팟들만 지도에 표시
      const { detailedCourse } = useCourseStore.getState();
      const courseToDisplay = detailedCourse || currentCourse;

      if (courseToDisplay.courseSpots.length > 0) {
        // 코스 스팟들을 지도에 표시
        setTimeout(() => {
          showCourseSpotsOnMap(courseToDisplay.courseSpots);
          // 지도를 코스 전체가 보이도록 조정
          centerMapOnCourse(courseToDisplay.courseSpots);
          // 사용자 위치도 함께 표시
          if (userLocation) {
            showUserLocationOnMap(userLocation.latitude, userLocation.longitude);
          }
        }, 500);
      }
    } catch (error) {
      // 에러 처리
    } finally {
      setSpotsLoading(false);
    }
  };

  // 현재 진행중인 코스가 있으면 자동으로 선택하고 지도에 표시
  useEffect(() => {
    if (currentCourse) {
      setSelectedCourse(currentCourse);

      // 기존 마커들 제거
      if (webViewRef.current) {
        webViewRef.current.postMessage(
          JSON.stringify({
            type: "clear_all_markers",
          })
        );
      }

      // API를 통해 상세 정보 가져오기
      const fetchAndDisplayCourse = async () => {
        const { fetchCourseDetail } = useCourseStore.getState();
        await fetchCourseDetail(currentCourse.courseId);

        // 상세 정보가 업데이트된 후 지도에 표시
        const { detailedCourse } = useCourseStore.getState();
        const courseToDisplay = detailedCourse || currentCourse;

        if (courseToDisplay.courseSpots.length > 0) {
          setTimeout(() => {
            showCourseSpotsOnMap(courseToDisplay.courseSpots);
            // 지도를 코스 전체가 보이도록 조정
            centerMapOnCourse(courseToDisplay.courseSpots);
            // 사용자 위치도 함께 표시
            if (userLocation) {
              showUserLocationOnMap(userLocation.latitude, userLocation.longitude);
            }
          }, 100);
        }
      };

      fetchAndDisplayCourse();
    } else {
      // 진행중인 코스가 없으면 선택된 코스와 시장을 초기화
      setSelectedCourse(null);
      setSelectedMarket(null);

      // 지도에서 모든 마커 제거
      if (webViewRef.current) {
        webViewRef.current.postMessage(
          JSON.stringify({
            type: "clear_all_markers",
          })
        );
      }
    }
  }, [currentCourse]);

  // spotToShow 파라미터가 있을 때 해당 스팟을 지도에 표시
  useEffect(() => {
    if (spotToShow && webViewRef.current) {
      // WebView가 로드될 때까지 기다린 후 실행 (빠른 반응)
      const executeSpotShow = () => {
        // 진행중인 코스가 있다면 3단계로 처리
        if (currentCourse) {
          // 진행중인 코스의 시장 찾기
          const courseMarket = markets.find(
            (market) => market.marketId === currentCourse.marketId
          );

          if (courseMarket) {
            // 선택된 시장을 진행중인 코스의 시장으로 변경
            setSelectedMarket(courseMarket);

            // 진행중인 코스 선택
            setSelectedCourse(currentCourse);

            // 2단계: 코스 상세 정보 가져오기 및 스팟 시각화
            const fetchAndDisplayCourse = async () => {
              try {
                const { fetchCourseDetail } = useCourseStore.getState();
                await fetchCourseDetail(currentCourse.courseId);

                // 상세 정보가 업데이트된 후 지도에 표시
                const { detailedCourse } = useCourseStore.getState();
                const courseToDisplay = detailedCourse || currentCourse;

                if (courseToDisplay.courseSpots.length > 0) {
                  // 코스 스팟들을 지도에 표시
                  showCourseSpotsOnMap(courseToDisplay.courseSpots);

                  // 3단계: 해당 스팟 위치로 이동 (즉시 실행)
                  setTimeout(() => {
                    webViewRef.current?.postMessage(
                      JSON.stringify({
                        type: "show_spot_on_map",
                        spot: {
                          latitude: spotToShow.latitude,
                          longitude: spotToShow.longitude,
                          name: spotToShow.name,
                        },
                      })
                    );
                    // 사용자 위치도 함께 표시
                    if (userLocation) {
                      showUserLocationOnMap(userLocation.latitude, userLocation.longitude);
                    }
                  }, 100);
                } else {
                  // 에러 처리 (로그 없이)
                }
              } catch (error) {
                // 에러 처리 (로그 없이)
              }
            };

            fetchAndDisplayCourse();
          } else {
            // 에러 처리 (로그 없이)
          }
        } else {
          // 진행중인 코스가 없다면 단순히 해당 위치로만 이동
          setTimeout(() => {
            webViewRef.current?.postMessage(
              JSON.stringify({
                type: "show_spot_on_map",
                spot: {
                  latitude: spotToShow.latitude,
                  longitude: spotToShow.longitude,
                  name: spotToShow.name,
                },
              })
            );
            // 사용자 위치도 함께 표시
            if (userLocation) {
              showUserLocationOnMap(userLocation.latitude, userLocation.longitude);
            }
          }, 100);
        }
      };

      // WebView가 이미 로드되어 있다면 즉시 실행, 아니면 짧게 대기
      if (webViewRef.current) {
        // WebView가 이미 준비되어 있다면 즉시 실행
        executeSpotShow();
      } else {
        // WebView가 아직 준비되지 않았다면 짧게 대기
        setTimeout(executeSpotShow, 200); // 0.2초로 단축
      }
    }
  }, [spotToShow, currentCourse, markets]);

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
        color: getCourseSpotColor(index),
      }));

      const message = {
        type: "show_course_spots",
        spots: spotsForMap,
      };

      webViewRef.current.postMessage(JSON.stringify(message));
    }
  };

  const centerMapOnCourse = (courseSpots: Course["courseSpots"]) => {
    if (webViewRef.current && courseSpots.length > 0) {
      // 모든 스팟의 좌표를 전달하여 지도가 모든 스팟을 포함하도록 조정
      webViewRef.current.postMessage(
        JSON.stringify({
          type: "fit_bounds_to_spots",
          spots: courseSpots.map((spot) => ({
            latitude: spot.latitude,
            longitude: spot.longitude,
          })),
        })
      );
    }
  };

  const getCourseSpotColor = (index: number) => {
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

    // 사용자 위치도 함께 표시
    if (userLocation) {
      showUserLocationOnMap(userLocation.latitude, userLocation.longitude);
    }

    // 코스가 있으면 코스 선택 UI 표시
    if (courses.length > 0) {
      setShowCourseList(true);
    }
  };

  const loadCoursesForMarket = async (marketId: number) => {
    try {
      setCoursesLoading(true);
      const coursesData = await fetchCoursesByMarket(marketId);
      setCourses(coursesData);
    } catch (error) {
      // 에러 처리 (로그 없이)
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
        
        // 사용자 위치도 함께 표시
        if (userLocation) {
          showUserLocationOnMap(userLocation.latitude, userLocation.longitude);
        }
      }
    } catch (error) {
      // 에러 처리 (로그 없이)
    } finally {
      setSpotsLoading(false);
    }
  };



  // WebView 메시지 핸들러 업데이트
  const handleWebViewMessage = async (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);

      if (data.type === "spot_clicked") {
        // spotId로 API 호출하여 상세 정보 가져오기
        try {
          setSpotDetailLoading(true);
          const spotDetail = await fetchSpotDetail(data.spot.spotId);

          // 진행중인 코스인지 확인
          const isCourseSpot = data.spot.stepNumber !== undefined;
          const courseToUse = selectedCourse || currentCourse;

          if (isCourseSpot && courseToUse) {
            // 코스 스팟인 경우 코스 정보 추가
            const spotWithCourseInfo = {
              ...spotDetail,
              courseNames: [courseToUse.name],
            };
            setSelectedSpot(spotWithCourseInfo);
          } else {
            // 일반 스팟인 경우
            setSelectedSpot(spotDetail);
          }

          setShowSpotModal(true);
        } catch (error) {
          // API 실패 시 WebView 데이터 사용
          const fallbackSpotData = {
            spotId: data.spot.spotId,
            marketId: selectedMarket?.marketId || 0,
            name: data.spot.spotName,
            category: data.spot.category,
            description: data.spot.description,
            latitude: data.spot.latitude,
            longitude: data.spot.longitude,
            marketName: selectedMarket?.name || "",
            imageUrl: null,
            missionCount: 0,
            courseNames: [],
            visitMissionTitles: [],
          };
          setSelectedSpot(fallbackSpotData);
          setShowSpotModal(true);
        } finally {
          setSpotDetailLoading(false);
        }
      } else if (data.type === "show_course_spots_response") {
        // 응답 처리
      } else if (data.type === "error") {
        // 에러 처리
      }
    } catch (error) {
      // 에러 처리 (로그 없이)
    }
  };

  const handleCloseSpotModal = () => {
    setShowSpotModal(false);
    setSelectedSpot(null);
  };

  // 진행중인 코스 스팟 방문 완료 처리
  const handleSpotVisitComplete = () => {
    // TODO: 스팟 방문 완료 로직 구현
    // 여기에 스팟 방문 완료 처리 로직을 추가할 수 있습니다
  };

  // 길찾기 기능
  const handleNavigateToSpot = () => {
    if (selectedSpot) {
      // TODO: 길찾기 앱 실행 로직 구현
      // 여기에 길찾기 앱 실행 로직을 추가할 수 있습니다
    }
  };

  // 지도에서 보기 기능
  const handleShowOnMap = () => {
    if (selectedSpot) {
      // 모달 닫기
      setShowSpotModal(false);

      // 지도를 해당 스팟 위치로 이동하고 확대
      if (webViewRef.current) {
        webViewRef.current.postMessage(
          JSON.stringify({
            type: "show_spot_on_map",
            spot: {
              latitude: selectedSpot.latitude,
              longitude: selectedSpot.longitude,
              name: selectedSpot.name,
            },
          })
        );
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["left", "right"]}>
      {/* 상단 고정 시장/코스 선택 */}
      <View className="absolute z-10 top-16 pt-2 left-4 right-4">
        <TouchableOpacity
          onPress={() => setShowMarketList(!showMarketList)}
          activeOpacity={1}
          className={`rounded-full shadow-lg border px-4 py-3 flex-row items-center ${
            selectedCourse
              ? selectedCourse.courseId === currentCourse?.courseId
                ? "bg-green-50 border-green-200" // 진행중인 코스 선택 시
                : "bg-blue-50 border-blue-200" // 다른 코스 선택 시
              : "bg-white border-gray-200" // 기본 상태
          }`}
        >
          <Ionicons
            name="location"
            size={20}
            color={
              selectedCourse
                ? selectedCourse.courseId === currentCourse?.courseId
                  ? "#059669" // 진행중인 코스
                  : "#2563EB" // 다른 코스
                : "#6B7280" // 기본 상태
            }
          />
          <Text
            className={`flex-1 ml-3 text-base font-medium ${
              selectedCourse
                ? selectedCourse.courseId === currentCourse?.courseId
                  ? "text-green-900" // 진행중인 코스
                  : "text-blue-900" // 다른 코스
                : "text-gray-900" // 기본 상태
            }`}
          >
            {selectedCourse
              ? selectedCourse.name
              : selectedMarket
                ? selectedMarket.name
                : "시장을 선택하세요"}
          </Text>
          {currentCourse && selectedCourse && (
            <View
              className={`px-2 py-1 rounded-full mr-2 ${
                selectedCourse.courseId === currentCourse.courseId
                  ? "bg-green-500" // 진행중인 코스
                  : "bg-blue-500" // 다른 코스
              }`}
            >
              <Text className="text-white text-xs font-medium">
                {selectedCourse.courseId === currentCourse.courseId
                  ? "진행중"
                  : "선택됨"}
              </Text>
            </View>
          )}
          <Ionicons
            name={showMarketList ? "chevron-up" : "chevron-down"}
            size={20}
            color={
              selectedCourse
                ? selectedCourse.courseId === currentCourse?.courseId
                  ? "#059669" // 진행중인 코스
                  : "#2563EB" // 다른 코스
                : "#6B7280" // 기본 상태
            }
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
                      onPress={async () => {
                        setSelectedCourse(currentCourse);
                        setSelectedMarket(
                          markets.find(
                            (m) => m.marketId === currentCourse.marketId
                          ) || null
                        );
                        setShowMarketList(false);

                        // 지도에 표시된 다른 마커들 제거
                        if (webViewRef.current) {
                          webViewRef.current.postMessage(
                            JSON.stringify({
                              type: "clear_all_markers",
                            })
                          );
                        }

                        // courseStore에서 상세 정보 가져오기
                        const { fetchCourseDetail } = useCourseStore.getState();
                        await fetchCourseDetail(currentCourse.courseId);

                        // 상세 정보가 업데이트된 후 지도에 표시
                        const { detailedCourse } = useCourseStore.getState();
                        const courseToDisplay = detailedCourse || currentCourse;

                        if (courseToDisplay.courseSpots.length > 0) {
                          // 약간의 지연을 두어 마커 제거 후 새로운 코스 표시
                          setTimeout(() => {
                            showCourseSpotsOnMap(courseToDisplay.courseSpots);
                            // 지도를 코스 전체가 보이도록 조정
                            centerMapOnCourse(courseToDisplay.courseSpots);
                            // 사용자 위치도 함께 표시
                            if (userLocation) {
                              showUserLocationOnMap(userLocation.latitude, userLocation.longitude);
                            }
                          }, 100);
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
          onLoadEnd={() => {
            // WebView 로드 완료 후 사용자 위치 표시
            if (userLocation) {
              setTimeout(() => {
                showUserLocationOnMap(userLocation.latitude, userLocation.longitude);
              }, 500);
            }
          }}
        />
      </View>

      {/* 스팟 정보 모달 */}
      <SpotInfoModal
        visible={showSpotModal}
        spot={selectedSpot}
        onClose={handleCloseSpotModal}
        isCourseSpot={
          selectedSpot && selectedCourse
            ? selectedCourse.courseSpots.some(
                (spot) => spot.spotId === selectedSpot.spotId
              )
            : false
        }
        courseInfo={
          selectedCourse && selectedSpot
            ? {
                courseName: selectedCourse.name || "알 수 없는 코스",
                stepNumber:
                  selectedCourse.courseSpots.find(
                    (spot) => spot.spotId === selectedSpot.spotId
                  )?.stepNumber || 1,
                totalSteps: selectedCourse.courseSpots.length,
                courseType: selectedCourse.typeNames || [],
              }
            : undefined
        }
        onSpotVisitComplete={handleSpotVisitComplete}
        onNavigateToSpot={handleNavigateToSpot}
        onShowOnMap={handleShowOnMap}
        isLoading={spotDetailLoading}
      />
    </SafeAreaView>
  );
}
