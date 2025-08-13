import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Alert } from "react-native";
import IntroStep from "./components/IntroStep";
import RegionSelect from "./components/RegionSelect";

export default function TourScreen() {
  const [step, setStep] = useState<"intro" | "region">("intro");

  const daejeonRegions = ["유성구", "서구", "중구", "동구", "대덕구"];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        {step === "intro" ? (
          <IntroStep onStart={() => setStep("region")} />
        ) : (
          <RegionSelect
            regions={daejeonRegions}
            onSelect={(name) => Alert.alert("지역 선택", `${name} 선택됨`)}
            onBack={() => setStep("intro")}
          />
        )}
        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
