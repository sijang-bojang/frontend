import React from "react";
import { View, Text, Image } from "react-native";

interface MissionCompleteBadgeProps {
  size?: number;
  textSize?: string;
}

const MissionCompleteBadge: React.FC<MissionCompleteBadgeProps> = ({
  size = 96, // w-24 h-24 = 96px
  textSize = "text-lg",
}) => {
  return (
    <View className="absolute inset-0 items-center justify-center z-10">
      <Image
        source={require("../../../assets/images/mission_icons/mission_complete.png")}
        className="opacity-80"
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
      <Text
        className={`absolute font-bold ${textSize}`}
        style={{
          fontFamily: "ChosunCentennial",
          transform: [{ rotate: "-10deg" }],
          color: "#cf2423",
        }}
      >
        완료
      </Text>
    </View>
  );
};

export default MissionCompleteBadge;
