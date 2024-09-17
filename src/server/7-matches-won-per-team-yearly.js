import fs from "fs";

const matchesList = JSON.parse(fs.readFileSync("../data/matches.json"));


export function matchesWonByTeamYearWise(matchesList) {

    const teamResult = matchesList.reduce((teamResults, match) => {
        let winner = match["winner"];
        let year = match["season"];

        if (winner != undefined && winner != "" && !teamResults.hasOwnProperty(winner)) {
            teamResults[winner] = {};
        }

        if (winner != "" && winner != undefined) {

            if (year != "" && !teamResults[winner].hasOwnProperty(year)) {
                teamResults[winner][year] = 1;
            } else {
                teamResults[winner][year] += 1;
            }
        }

        return teamResults;

    }, {});

    return teamResult;

}




//write and dump to .json
function dumpJsonToFile(result) {
    const jsonResult = JSON.stringify(result, null, 2);
    fs.writeFileSync("../public/output/matchesWonPerTeamYearly.json", jsonResult, "utf-8");
}



function runAndDump() {
    const matchesWonByTeamResult = matchesWonByTeamYearWise(matchesList);

    dumpJsonToFile(matchesWonByTeamResult);
}

runAndDump();