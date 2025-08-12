import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBar from "./components/HeaderBar";
import NewsCard from "./components/NewsCard";
import NoticesSection from "./components/NoticesSection";
import { Notice } from "./types";

export default function HomeScreen() {
  const notices: Notice[] = [
    { id: 1, text: "[미션] 공지내용" },
    { id: 2, text: "[미션] 공지내용" },
    { id: 3, text: "[미션] 공지내용" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <HeaderBar />
        <NewsCard />
        <NoticesSection notices={notices} />
      </ScrollView>
    </SafeAreaView>
  );
}
