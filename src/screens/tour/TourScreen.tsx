import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View } from "react-native";
import IntroStep from "./components/IntroStep";
import RegionSelect from "./components/RegionSelect";

export default function TourScreen() {
  const [step, setStep] = useState<"intro" | "region">("intro");

  const daejeonRegions = ["유성구", "서구", "중구", "동구", "대덕구"];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {step === "intro" ? (
        <ScrollView className="flex-1">
          <IntroStep onStart={() => setStep("region")} />
          <View className="h-10" />
        </ScrollView>
      ) : (
        <RegionSelect
          regions={daejeonRegions}
          onSelect={() => {}}
          onBack={() => setStep("intro")}
        />
      )}
    </SafeAreaView>
  );
}
