export interface IconButtonData {
  id: string;
  image: any;
  leftRatio: number;
  topRatio: number;
  onPress: () => void;
}

// Mission 버튼들 (고정)
const missionButtons: IconButtonData[] = [
  {
    id: "mission_1",
    image: require("../../../assets/images/course/mission.png"),
    leftRatio: 0.25,
    topRatio: 0.38,
    onPress: () => console.log("미션 버튼 클릭"),
  },
  {
    id: "mission_2",
    image: require("../../../assets/images/course/mission.png"),
    leftRatio: 0.7,
    topRatio: 0.5,
    onPress: () => console.log("미션 버튼 클릭"),
  },
  {
    id: "mission_3",
    image: require("../../../assets/images/course/mission.png"),
    leftRatio: 0.05,
    topRatio: 0.07,
    onPress: () => console.log("미션 버튼 클릭"),
  },
];

// Spot 3개일 때
export const iconButtonsData3Spots: IconButtonData[] = [
  ...missionButtons,
  {
    id: "spot_1",
    image: require("../../../assets/images/course/spot.png"),
    leftRatio: 0.4,
    topRatio: 0.15,
    onPress: () => console.log("스팟 0 버튼 클릭"),
  },
  {
    id: "spot_2",
    image: require("../../../assets/images/course/spot.png"),
    leftRatio: 0.58,
    topRatio: 0.35,
    onPress: () => console.log("스팟 1 버튼 클릭"),
  },
  {
    id: "spot_3",
    image: require("../../../assets/images/course/spot.png"),
    leftRatio: 0.25,
    topRatio: 0.6,
    onPress: () => console.log("스팟 2 버튼 클릭"),
  },
];

// Spot 4개일 때
export const iconButtonsData4Spots: IconButtonData[] = [
  ...missionButtons,
  {
    id: "spot_1",
    image: require("../../../assets/images/course/spot.png"),
    leftRatio: 0.69,
    topRatio: 0.02,
    onPress: () => console.log("스팟 0 버튼 클릭"),
  },
  {
    id: "spot_2",
    image: require("../../../assets/images/course/spot.png"),
    leftRatio: 0.35,
    topRatio: 0.18,
    onPress: () => console.log("스팟 1 버튼 클릭"),
  },
  {
    id: "spot_3",
    image: require("../../../assets/images/course/spot.png"),
    leftRatio: 0.38,
    topRatio: 0.5,
    onPress: () => console.log("스팟 2 버튼 클릭"),
  },
  {
    id: "spot_4",
    image: require("../../../assets/images/course/spot.png"),
    leftRatio: 0.67,
    topRatio: 0.72,
    onPress: () => console.log("스팟 3 버튼 클릭"),
  },
];

// Spot 5개일 때 (기존)
export const iconButtonsData5Spots: IconButtonData[] = [
  ...missionButtons,
  {
    id: "spot_1",
    image: require("../../../assets/images/course/spot.png"),
    leftRatio: 0.69,
    topRatio: 0.02,
    onPress: () => console.log("스팟 0 버튼 클릭"),
  },
  {
    id: "spot_2",
    image: require("../../../assets/images/course/spot.png"),
    leftRatio: 0.35,
    topRatio: 0.18,
    onPress: () => console.log("스팟 1 버튼 클릭"),
  },
  {
    id: "spot_3",
    image: require("../../../assets/images/course/spot.png"),
    leftRatio: 0.58,
    topRatio: 0.33,
    onPress: () => console.log("스팟 2 버튼 클릭"),
  },
  {
    id: "spot_4",
    image: require("../../../assets/images/course/spot.png"),
    leftRatio: 0.22,
    topRatio: 0.58,
    onPress: () => console.log("스팟 3 버튼 클릭"),
  },
  {
    id: "spot_5",
    image: require("../../../assets/images/course/spot.png"),
    leftRatio: 0.67,
    topRatio: 0.72,
    onPress: () => console.log("스팟 4 버튼 클릭"),
  },
];

// 기본값 (5개)
// export const iconButtonsData = iconButtonsData3Spots;
