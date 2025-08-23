export interface IconButtonData {
  id: string;
  image: any;
  leftRatio: number;
  topRatio: number;
  onPress: () => void;
}

export const iconButtonsData: IconButtonData[] = [
  {
    id: "mission_0",
    image: require("../../../assets/images/course/mission.png"),
    leftRatio: 0.25,
    topRatio: 0.38,
    onPress: () => console.log("미션 버튼 클릭"),
  },
  {
    id: "mission_1",
    image: require("../../../assets/images/course/mission.png"),
    leftRatio: 0.7,
    topRatio: 0.5,
    onPress: () => console.log("미션 버튼 클릭"),
  },
  {
    id: "mission_2",
    image: require("../../../assets/images/course/mission.png"),
    leftRatio: 0.05,
    topRatio: 0.07,
    onPress: () => console.log("미션 버튼 클릭"),
  },
  {
    id: "spot_0",
    image: require("../../../assets/images/course/spot.png"),
    leftRatio: 0.69,
    topRatio: 0.02,
    onPress: () => console.log("스팟 버튼 클릭"),
  },
  {
    id: "spot_1",
    image: require("../../../assets/images/course/spot.png"),
    leftRatio: 0.35,
    topRatio: 0.18,
    onPress: () => console.log("스팟 버튼 클릭"),
  },
  {
    id: "spot_2",
    image: require("../../../assets/images/course/spot.png"),
    leftRatio: 0.58,
    topRatio: 0.33,
    onPress: () => console.log("스팟 버튼 클릭"),
  },
  {
    id: "spot_3",
    image: require("../../../assets/images/course/spot.png"),
    leftRatio: 0.22,
    topRatio: 0.58,
    onPress: () => console.log("스팟 버튼 클릭"),
  },
  {
    id: "spot_4",
    image: require("../../../assets/images/course/spot.png"),
    leftRatio: 0.67,
    topRatio: 0.72,
    onPress: () => console.log("스팟 버튼 클릭"),
  },
];
