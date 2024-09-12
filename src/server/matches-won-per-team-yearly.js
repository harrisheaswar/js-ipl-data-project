import fs from "fs";

const matchesList=JSON.parse(fs.readFileSync("../data/matches.json"));


export function matchesWonByTeamYearWise(matchesList){
    let teamResults={};
    
    //pushing team names as keys into teamResult object. The key inturn is an object
    for(let index=0;index<matchesList.length;index++){
            
        
        let team1=matchesList[index]["team1"];
        let year=matchesList[index]["season"];
        let team2=matchesList[index]["team2"];

        //Adding teams into the object.Checking both team 1 and 2 from matchesArr
            if(team1!=undefined && !teamResults.hasOwnProperty(team1)){
                teamResults[team1]={};  
            }
            if(team2!=undefined && !teamResults.hasOwnProperty(team2)){
                teamResults[team2]={}; 
            }
            
            
        //initialise number of matches won per team per year to 0
            if(year!=undefined && !teamResults[team1].hasOwnProperty(year)){
                teamResults[team1][year]=0;
            }
            if(year!=undefined && !teamResults[team2].hasOwnProperty(year)){
                teamResults[team2][year]=0;
            }
        
    }
    
    for(let index=0;index<matchesList.length;index++){

        let winner=matchesList[index]["winner"];
        let year=matchesList[index]["season"];
        //checking for winners and no winners
        if(winner!=undefined && teamResults[winner]!=undefined && teamResults[winner][year]!=undefined){
            teamResults[winner][year]=teamResults[winner][year]+1;
        }
    }


        return teamResults;

}

function dumpJsonToFile(result){
    const jsonResult=JSON.stringify(result,null,2);
    fs.writeFileSync("../public/output/matchesWonPerTeamYearly.json",jsonResult,"utf-8");
}



function runAndDump(){
    const matchesWonByTeamResult=matchesWonByTeamYearWise(matchesList);

    dumpJsonToFile(matchesWonByTeamResult);
}

runAndDump();