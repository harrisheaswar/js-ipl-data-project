import fs from "fs";

const matches = JSON.parse(fs.readFileSync("../data/matches.json", "utf-8"));
const deliveries = JSON.parse(
  fs.readFileSync("../data/deliveries.json", "utf-8")
);

export function extraRunsConcededByYear(matches, deliveries, year = 2016) {
  const idArr = matches
    .filter((match) => {
      let matchYear = match["season"];

      if (parseInt(matchYear) === year) {
        return true;
      }
    })
    .map((match) => match["id"]);

  const set = new Set(idArr);

  const resultObj = deliveries.reduce((resObj, delivery) => {
    const id = delivery["match_id"];
    const bowling = delivery["bowling_team"];

    if (set.has(id)) {
      if (!resObj.hasOwnProperty(bowling)) {
        resObj[bowling] = 0;
      }
      resObj[bowling] += parseInt(delivery["extra_runs"]);
    }
    return resObj;
  }, {});

  return resultObj;
}

//write and dump to .json
function dumpJSONToFile(extraRunsResult1) {
  const jsonRes = JSON.stringify(extraRunsResult1, null, 2);

  fs.writeFileSync(
    "../public/output/extraRunsConcededByYear.json",
    jsonRes,
    "utf-8"
  );
}

function runAndDump() {
  const extraRunsResult1 = extraRunsConcededByYear(matches, deliveries);

  dumpJSONToFile(extraRunsResult1);
}

runAndDump();
