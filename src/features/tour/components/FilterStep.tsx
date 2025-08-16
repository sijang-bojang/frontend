import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TourFilters, Market } from "../types";
import { FILTER_OPTIONS, FILTER_LABELS } from "../data";

type FilterStepProps = {
  selectedMarket: Market;
  onBack: () => void;
  onStartTour: (filters: TourFilters) => void;
};

const FilterStep: React.FC<FilterStepProps> = ({
  selectedMarket,
  onBack,
  onStartTour,
}) => {
  const [filters, setFilters] = useState<TourFilters>({
    vehicle: [],
    companion: [],
    duration: [],
    theme: [],
  });

  const toggleFilter = (category: keyof TourFilters, option: string) => {
    setFilters((prev) => {
      const currentOptions = prev[category];
      const newOptions = currentOptions.includes(option as any)
        ? currentOptions.filter((item) => item !== option)
        : [...currentOptions, option as any];

      return {
        ...prev,
        [category]: newOptions,
      };
    });
  };

  const resetFilters = () => {
    setFilters({
      vehicle: [],
      companion: [],
      duration: [],
      theme: [],
    });
  };

  const FilterSection = ({
    title,
    options,
    selectedOptions,
    onToggle,
  }: {
    title: string;
    options: string[];
    selectedOptions: string[];
    onToggle: (option: string) => void;
  }) => (
    <View className="mb-8">
      <Text className="text-lg font-semibold text-gray-900 mb-4">{title}</Text>
      <View className="flex-row flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selectedOptions.includes(option);
          return (
            <TouchableOpacity
              key={option}
              activeOpacity={0.7}
              onPress={() => onToggle(option)}
              className={`px-3 py-2 rounded-full border ${
                isSelected
                  ? "bg-indigo-600 border-indigo-600"
                  : "bg-white border-gray-300"
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  isSelected ? "text-white" : "text-gray-700"
                }`}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  const hasAnySelection = Object.values(filters).some(
    (options) => options.length > 0
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* 헤더 */}
      <View className="bg-white px-6 py-4 border-b border-gray-200">
        <View className="flex-row items-center">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onBack}
            className="mr-3"
          >
            <Ionicons name="chevron-back" size={24} color="#111827" />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-xl font-semibold text-gray-900">필터</Text>
            <Text className="text-sm text-gray-500 mt-1">
              {selectedMarket.name}
            </Text>
          </View>
        </View>
      </View>

      {/* 필터 컨텐츠 */}
      <ScrollView className="flex-1 px-6 pt-6">
        <FilterSection
          title={FILTER_LABELS.vehicle}
          options={FILTER_OPTIONS.vehicle}
          selectedOptions={filters.vehicle}
          onToggle={(option) => toggleFilter("vehicle", option)}
        />

        <FilterSection
          title={FILTER_LABELS.companion}
          options={FILTER_OPTIONS.companion}
          selectedOptions={filters.companion}
          onToggle={(option) => toggleFilter("companion", option)}
        />

        <FilterSection
          title={FILTER_LABELS.duration}
          options={FILTER_OPTIONS.duration}
          selectedOptions={filters.duration}
          onToggle={(option) => toggleFilter("duration", option)}
        />

        <FilterSection
          title={FILTER_LABELS.theme}
          options={FILTER_OPTIONS.theme}
          selectedOptions={filters.theme}
          onToggle={(option) => toggleFilter("theme", option)}
        />

        <View className="h-20" />
      </ScrollView>

      {/* 하단 버튼 */}
      <View className="bg-white px-6 py-4 border-t border-gray-200">
        <View className="flex-row gap-3">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={resetFilters}
            className="flex-1 py-4 rounded-2xl border border-gray-300 items-center"
          >
            <Text className="text-gray-700 font-semibold">초기화</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onStartTour(filters)}
            className={`flex-1 py-4 rounded-2xl items-center ${
              hasAnySelection ? "bg-indigo-600" : "bg-gray-300"
            }`}
            disabled={!hasAnySelection}
          >
            <Text
              className={`font-semibold ${
                hasAnySelection ? "text-white" : "text-gray-500"
              }`}
            >
              투어 시작하기
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FilterStep;
