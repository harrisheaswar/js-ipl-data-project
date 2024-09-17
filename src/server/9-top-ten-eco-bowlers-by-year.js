import fs from "fs";

const matches = JSON.parse(fs.readFileSync("../data/matches.json", "utf-8"));
const deliveries = JSON.parse(
  fs.readFileSync("../data/deliveries.json", "utf-8")
);

export function topTenEcoBowlersByYear(matches, deliveries, inputYear = 2015) {
  const idArr = matches.filter((match) => parseInt(match["season"]) === inputYear)
    .map((match) => match["id"]);

    const set=new Set(idArr);

  const resultObj = deliveries.reduce((resObj, delivery) => {
    let bowler = delivery["bowler"];
    let wideRuns = delivery["wide_runs"];

    let noBallRuns = delivery["noball_runs"];
    let batsmanRuns = delivery["batsman_runs"];

    let matchId = delivery["match_id"];

    if (set.has(matchId) && !resObj.hasOwnProperty(bowler)) {
      resObj[bowler] = {
        total_runs: 0,
        total_balls: 0,
      };
    }

    if ( set.has(matchId) && resObj.hasOwnProperty(bowler)) {

      if (wideRuns != "" && parseInt(wideRuns) > 0) {
        resObj[bowler]["total_runs"] += parseInt(wideRuns);
      } else if (noBallRuns != "" && parseInt(noBallRuns) > 0) {
        resObj[bowler]["total_runs"] += parseInt(noBallRuns);
      } else if (batsmanRuns != "" && parseInt(batsmanRuns) > 0) {
        resObj[bowler]["total_runs"] += parseInt(batsmanRuns);
        resObj[bowler]["total_balls"] += 1;
      } else {
        resObj[bowler]["total_balls"] += 1;
      }
    }

    return resObj;
  }, {});

  for (let name in resultObj) {
    let totalRuns = resultObj[name]["total_runs"];
    let totalBalls = resultObj[name]["total_balls"];

    let economy = (totalRuns / totalBalls) * 6;

    delete resultObj[name]["total_runs"];
    delete resultObj[name]["total_balls"];
    
    resultObj[name]["economy"] = economy;
  }

  const topTenEcoBowArr = Object.entries(resultObj)
    .sort((a, b) => a[1]["economy"] - b[1]["economy"])
    .slice(0, 10);

  return topTenEcoBowArr;
}

//write and dump to .json
function dumpJsonToFile(result) {
  const jsonResult = JSON.stringify(result, null, 2);
  fs.writeFileSync(
    "../public/output/topTenEcoBowlersByYear.json",
    jsonResult,
    "utf-8"
  );
}

function runAndDump() {
  const topTenEcoBowlersByYearResult = topTenEcoBowlersByYear(
    matches,
    deliveries
  );

  dumpJsonToFile(topTenEcoBowlersByYearResult);
}

runAndDump();
