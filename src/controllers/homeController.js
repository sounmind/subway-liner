import {
  getDistanceAndTimeBetweenStations,
  getSubwayPasserbyTime,
} from "../subwayApi";
import { timeInterval } from "../utils";

export const home = (req, res) => res.render("home", { pageTitle: "Home" });

export const search = async ({ query: { start, end } }, res) => {
  const {
    data: {
      StationDstncReqreTimeHm: { row: stationList },
    },
  } = await getDistanceAndTimeBetweenStations(0, 999);
  const {
    data: {
      CardSubwayTime: { row: timeList },
    },
  } = await getSubwayPasserbyTime(0, 999);

  const startStationTimes = timeList.find((station) => {
    let tempStart = start;
    if (tempStart === "삼성") {
      tempStart = "삼성(무역센터)";
    }
    return station.SUB_STA_NM.startsWith(tempStart);
  });
  const endStationTimes = timeList.find((station) => {
    let tempEnd = end;
    if (tempEnd === "삼성") {
      tempEnd = "삼성(무역센터)";
    }
    return station.SUB_STA_NM.startsWith(tempEnd);
  });

  const stationIn = Math.floor(
    startStationTimes[timeInterval[new Date().getHours()] + "_RIDE_NUM"] / 30
  );

  const stationOut = Math.floor(
    endStationTimes[timeInterval[new Date().getHours()] + "_ALIGHT_NUM"] / 30
  );

  const startStation = stationList.find(
    (station) => station.STATN_NM === start
  );
  const endStation = stationList.find((station) => station.STATN_NM === end);
  const MINUTE_PER_KILLOMETER = 1.89;

  const distance =
    Math.floor(Math.abs(startStation.ACMTL - endStation.ACMTL) * 10) / 10;
  const time = Math.ceil(MINUTE_PER_KILLOMETER * distance);

  res.render("search", {
    startStation,
    endStation,
    stationIn,
    stationOut,
    distance,
    time,
    pageTitle: "Search",
  });
};
