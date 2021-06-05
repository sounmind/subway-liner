import axios from "axios";
const KEY = "786e6279537669723132325245724178";
const subwayAPI = axios.create({
  baseURL: `http://openapi.seoul.go.kr:8088/${KEY}/json/`,
});

// 이전 달 기준, 호선, 역, 현재 시간대 별 승하차 인원 평균
export const getSubwayPasserbyTime = (startIndex, endIndex) => {
  const date = new Date();
  date.setMonth(date.getMonth()); // 한달 전
  let [year, month] = [date.getFullYear(), date.getMonth()];

  if (month === 0) {
    month = 12;
  }

  if (month < 10) {
    month = "0" + month;
  }

  return subwayAPI.get(
    "CardSubwayTime/" +
      startIndex +
      "/" +
      endIndex +
      "/" +
      year.toString() +
      month
  );
};

// 역 간 거리 (1 ~ 4호선)
export const getDistanceAndTimeBetweenStations = (startIndex, endIndex) => {
  return subwayAPI.get(
    "StationDstncReqreTimeHm/" + startIndex + "/" + endIndex
  );
};
