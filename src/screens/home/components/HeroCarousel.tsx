import React, { useMemo, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { HeroCard } from "../types";

const SCREEN_WIDTH = Dimensions.get("window").width;
const HORIZONTAL_PADDING = 16; // 24px total margin both sides
const CARD_GAP = 12;
const CARD_WIDTH = SCREEN_WIDTH - HORIZONTAL_PADDING * 2; // full-bleed with padding

type HeroCarouselProps = {
  cards: HeroCard[];
  onPressCard?: (card: HeroCard) => void;
};

const HeroCarousel: React.FC<HeroCarouselProps> = ({ cards, onPressCard }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const viewabilityConfig = useMemo(
    () => ({ viewAreaCoveragePercentThreshold: 60 }),
    []
  );
  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems && viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index ?? 0);
    }
  });

  const renderItem: ListRenderItem<HeroCard> = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onPressCard?.(item)}
      style={{ width: CARD_WIDTH, marginRight: CARD_GAP }}
      className={`rounded-2xl p-6 ${item.colorClass ?? "bg-indigo-500"}`}
    >
      <Text className="text-white text-2xl font-extrabold mb-2">
        {item.title}
      </Text>
      {item.description ? (
        <Text className="text-white/90 mb-4">{item.description}</Text>
      ) : null}
      {item.ctaText ? (
        <View className="self-start bg-white/20 px-3 py-2 rounded-full">
          <Text className="text-white font-medium">{item.ctaText} →</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );

  return (
    <View className="mt-3">
      <FlatList
        data={cards}
        keyExtractor={(item) => String(item.id)}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={CARD_WIDTH + CARD_GAP}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: HORIZONTAL_PADDING }}
        renderItem={renderItem}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig}
      />
      {/* 인디케이터 */}
      <View className="flex-row items-center justify-center mt-3">
        {cards.map((_, idx) => (
          <View
            key={idx}
            className={`${idx === activeIndex ? "bg-slate-700" : "bg-slate-300"} w-2 h-2 rounded-full mx-1`}
          />
        ))}
      </View>
    </View>
  );
};

export default HeroCarousel;
