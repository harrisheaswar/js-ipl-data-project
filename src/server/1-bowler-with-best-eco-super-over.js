import fs from "fs";

const deliveries = JSON.parse(
  fs.readFileSync("../data/deliveries.json", "utf-8")
);

export function bowlerWithBestEcoSuperOver(deliveries) {
  let bowlersList = deliveries.reduce((resObj, delivery) => {
    if (delivery["is_super_over"] === "1") {
      let bowler = delivery["bowler"];
      let wideRuns = delivery["wide_runs"];
      let noBallRuns = delivery["noball_runs"];
      let batsmanRuns = delivery["batsman_runs"];

      if (!resObj.hasOwnProperty(bowler)) {
        resObj[bowler] = {
          runs: 0,
          balls: 0,
        };
      }

      if (wideRuns && parseInt(wideRuns) > 0) {
        resObj[bowler].runs += parseInt(wideRuns);
      } else if (noBallRuns && parseInt(noBallRuns) > 0) {
        resObj[bowler].runs += parseInt(noBallRuns);
      } else if (batsmanRuns && parseInt(batsmanRuns) > 0) {
        resObj[bowler].runs += parseInt(batsmanRuns);
        resObj[bowler].balls += 1;
      } else {
        resObj[bowler].balls += 1;
      }
    }
    return resObj;
  }, {});

  let bestBowler;
  let bestEco = Number.MAX_SAFE_INTEGER;
  for (let bowler in bowlersList) {
    let eco = (bowlersList[bowler]["runs"] / bowlersList[bowler]["balls"]) * 6;

    if (eco < bestEco) {
      bestBowler = bowler;
      bestEco = eco;
    }
  }

  let resultObj = {
    bowler: bestBowler,
    economy: bestEco,
  };

  return resultObj;
}

//write and dump to .json
function dumpJSONToFile(bowlerWithBestEcoSuperOver1) {
  const jsonRes = JSON.stringify(bowlerWithBestEcoSuperOver1, null, 2);

  fs.writeFileSync(
    "../public/output/bowlerWithBestEcoSuperOver.json",
    jsonRes,
    "utf-8"
  );
}

function runAndDump() {
  const bowlerWithBestEcoSuperOver1 = bowlerWithBestEcoSuperOver(deliveries);

  dumpJSONToFile(bowlerWithBestEcoSuperOver1);
}

runAndDump();
