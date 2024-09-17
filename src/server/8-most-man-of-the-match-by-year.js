import fs from "fs";

const matches = JSON.parse(fs.readFileSync("../data/matches.json", "utf-8"));

export function mostManOfTheMatchYearWise(matches) {
  let manOfMatchList = matches
    .filter((match) => match["player_of_match"] != "")
    .reduce((resObj, match) => {
      let year = match["season"];
      let manOfMatch = match["player_of_match"];

      if (!resObj.hasOwnProperty(year)) {
        resObj[year] = {};
      }

      if (!resObj[year].hasOwnProperty(manOfMatch)) {
        resObj[year][manOfMatch] = 1;
      } else {
        resObj[year][manOfMatch] += 1;
      }

      return resObj;
    }, {});

  let resultList = {};
  for (let year in manOfMatchList) {
    let player;
    let max = 0;
    resultList[year] = {};
    for (let name in manOfMatchList[year]) {
      if (manOfMatchList[year][name] > max) {
        max = manOfMatchList[year][name];
        player = name;
      }
    }
    resultList[year][player] = max;
  }

  return resultList;
}

//write and dump to .json
function dumpJsonToFile(result) {
  const jsonResult = JSON.stringify(result, null, 2);
  fs.writeFileSync(
    "../public/output/mostManOfTheMatchYearWise.json",
    jsonResult,
    "utf-8"
  );
}

function runAndDump() {
  const mostManOfTheMatchYearWise1 = mostManOfTheMatchYearWise(matches);

  dumpJsonToFile(mostManOfTheMatchYearWise1);
}

runAndDump();
