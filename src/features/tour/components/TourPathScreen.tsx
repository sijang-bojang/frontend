import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Market } from "../types";
import { Course } from "../../../shared/api";

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
  return (
    <View className="flex-1">
      <ImageBackground
        source={require("../../../assets/images/course_background.jpg")}
        style={{
          width: screenWidth,
          height: screenHeight * 0.9,
        }}
        resizeMode="cover"
      >
        <SafeAreaView className="flex-1" edges={["left", "right"]}>
          {/* 헤더 오버레이 */}
          <View className="px-4 py-3 bg-black/50 backdrop-blur-sm rounded-lg mx-4">
            <View className="flex-row items-center justify-between mb-0">
              <TouchableOpacity onPress={onBack} className="p-2">
                <Ionicons name="chevron-back" size={24} color="white" />
              </TouchableOpacity>
              <View className="flex-1 mx-3">
                <Text className="text-xl font-bold text-white text-center">
                  {courseData.name}
                </Text>
              </View>
              <View className="w-10" />
            </View>
            <Text className="text-sm text-white text-center px-4 opacity-90">
              {courseData.description}
            </Text>
          </View>

          {/* 코스 정보 오버레이 */}
          <View className="px-4 py-4">
            <View className="flex-row items-center">
              <Ionicons name="location" size={16} color="black" />
              <Text className="ml-2 text-black opacity-90">
                {courseData.marketName}
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
