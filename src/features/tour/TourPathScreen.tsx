import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  ScrollView,
  Alert,
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

          {/* 코스 그만두기 플로팅 버튼 */}
          <View className="absolute bottom-8 left-6">
            <TouchableOpacity
              onPress={handleQuitCourse}
              className="bg-red-500 rounded-full p-4 shadow-lg"
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
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
