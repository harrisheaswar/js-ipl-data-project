import fs from "fs";

const deliveries = JSON.parse(
  fs.readFileSync(
    "/home/harrish-easwar/js-ipl-data-project/src/data/deliveries.json",
    "utf-8"
  )
);

export function highestNumOfDismissals(deliveries) {
  let playerListObj = deliveries.reduce((resObj, delivery) => {
    let playerOut = delivery["player_dismissed"];
    let bowler = delivery["bowler"];

    let wicketKeeperOrFielder = delivery["fielder"];

    if (playerOut) {
      if (!resObj.hasOwnProperty(playerOut)) {
        resObj[playerOut] = {};
      }

      if (bowler && !resObj[playerOut].hasOwnProperty(bowler)) {
        resObj[playerOut][bowler] = 0;
      }
      if (
        wicketKeeperOrFielder &&
        !resObj[playerOut].hasOwnProperty(wicketKeeperOrFielder)
      ) {
        resObj[playerOut][wicketKeeperOrFielder] = 0;
      }

      if (delivery["dismissal_kind"] === "stumped") {
        resObj[playerOut][wicketKeeperOrFielder] += 1;
        resObj[playerOut][bowler] += 1;
      } else if (delivery["dismissal_kind"] === "run out") {
        resObj[playerOut][wicketKeeperOrFielder] += 1;
      } else {
        resObj[playerOut][bowler] += 1;
      }
    }

    return resObj;
  }, {});

  let max = 0;
  let batsman;
  let bowler;

  for (let playerOut in playerListObj) {
    for (let dismisser in playerListObj[playerOut]) {
      if (playerListObj[playerOut][dismisser] > max) {
        max = playerListObj[playerOut][dismisser];
        batsman = playerOut;
        bowler = dismisser;
      }
    }
  }

  let resultObj = {};
  resultObj[batsman] = {
    bowler: bowler,
    num_of_outs: max,
  };

  return resultObj;
}

//write and dump to .json
function dumpJsonToFile(result) {
  const jsonRes = JSON.stringify(result, null, 2);
  fs.writeFileSync(
    "../public/output/highestNumOfDismissal.json",
    jsonRes,
    "utf-8"
  );
}

function runAndDumpRes() {
  const highestNumOfDismissals1 = highestNumOfDismissals(deliveries);

  dumpJsonToFile(highestNumOfDismissals1);
}

runAndDumpRes();
