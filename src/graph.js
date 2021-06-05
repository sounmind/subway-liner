// const {
//   data: {
//     CardSubwayStatsNew: { row },
//   },
// } = await getSubwayPasserby(1, 1000);
// res.send(row); // 602

class Station {
  constructor(lineName, stationName) {
    this.lineName = lineName;
    this.stationName = stationName;
  }
}

class Line {
  constructor() {}
}

class SubwayMap {
  constructor() {}
}
