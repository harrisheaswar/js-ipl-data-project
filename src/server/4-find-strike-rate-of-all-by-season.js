import fs from "fs";

const deliveries = JSON.parse(
  fs.readFileSync("../data/deliveries.json", "utf-8")
);
const matches = JSON.parse(fs.readFileSync("../data/matches.json", "utf-8"));

export function findStrikeRateOfAllBySeason(matches, deliveries) {
  const idToYearMap = matches.reduce((idObj, match) => {
    let id = match["id"];
    let year = match["season"];

    idObj[id] = year;

    return idObj;
  }, {});

  const batsmanObj = deliveries.reduce((resObj, delivery) => {
    let id = delivery["match_id"];
    let year = idToYearMap[id];
    let batsman = delivery["batsman"];

    if (!resObj.hasOwnProperty(year)) {
      resObj[year] = {};
    }

    if (!resObj[year].hasOwnProperty(batsman)) {
      resObj[year][batsman] = {
        total_runs: 0,
        total_balls: 0,
      };

      const runs = delivery["batsman_runs"];

      if (runs != "") {
        resObj[year][batsman]["total_runs"] += parseInt(runs);
        resObj[year][batsman]["total_balls"] += 1;
      }
    } else {
      const runs = delivery["batsman_runs"];

      if (runs != "") {
        resObj[year][batsman]["total_runs"] += parseInt(runs);
        resObj[year][batsman]["total_balls"] += 1;
      }
    }

    return resObj;
  }, {});

  let resultObj = {};

  for (let year in batsmanObj) {
    let player;
    let strike = 0;
    resultObj[year] = {};
    for (let name in batsmanObj[year]) {
      player = name;
      strike =
        (batsmanObj[year][name]["total_runs"] /
          batsmanObj[year][name]["total_balls"]) *
        100;
      resultObj[year][player] = strike;
    }
  }

  return resultObj;
}

//write and dump to .json
function dumpJsonToFile(result) {
  const jsonRes = JSON.stringify(result, null, 2);
  fs.writeFileSync(
    "../public/output/findStrikeRateOfAllBySeason.json",
    jsonRes,
    "utf-8"
  );
}

function runAndDumpRes() {
  const findStrikeRateOfAllBySeason1 = findStrikeRateOfAllBySeason(
    matches,
    deliveries
  );

  dumpJsonToFile(findStrikeRateOfAllBySeason1);
}

runAndDumpRes();
