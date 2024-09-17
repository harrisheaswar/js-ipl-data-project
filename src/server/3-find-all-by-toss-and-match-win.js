import fs from "fs";

const matches = JSON.parse(fs.readFileSync("../data/matches.json", "utf-8"));

export function findAllByTossAndMatchWin(matches) {
  let tossAndMatchWinList = matches
    .filter((match) => match["winner"] === match["toss_winner"])
    .reduce((resObj, match) => {
      let matchWinner = match["winner"];

      if (!resObj.hasOwnProperty(matchWinner)) {
        resObj[matchWinner] = 1;
      } else {
        resObj[matchWinner] += 1;
      }

      return resObj;
    }, {});

  return tossAndMatchWinList;
}

//write and dump to .json
function dumpJsonToFile(result) {
  const jsonResult = JSON.stringify(result, null, 2);
  fs.writeFileSync(
    "../public/output/findAllByTossAndMatchWin.json",
    jsonResult,
    "utf-8"
  );
}

function runAndDump() {
  const findAllByTossAndMatchWin1 = findAllByTossAndMatchWin(matches);

  dumpJsonToFile(findAllByTossAndMatchWin1);
}

runAndDump();
