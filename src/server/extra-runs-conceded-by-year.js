import fs from "fs";

const matches=JSON.parse(fs.readFileSync("../data/matches.json","utf-8"));
const deliveries=JSON.parse(fs.readFileSync("../data/deliveries.json","utf-8"));

// Some teams did not play in the year 2016. They are also included here.
export function extraRunsConcededByYear(matches,deliveries,year=2016){

    const matchIds=[];
    const resultObj={};
    //save the match ids in an array where season is 2015. Saving team names as keys in resultObj
        for(let index=0;index<matches.length;index++){
           const team1=matches[index]["team1"];
           const team2=matches[index]["team2"];
            if(matches[index]["season"]!=undefined && parseInt(matches[index]["season"])===year){
                matchIds.push(matches[index].id);
            }

            if(!resultObj.hasOwnProperty(team1)){
                    resultObj[team1]=0;
            }
            if(!resultObj.hasOwnProperty(team2)){
                resultObj[team2]=0;
            }

        }
        //Comparing delivery match id and matchesId array(we made in the previous step)
        for(let index=0;index<deliveries.length;index++){
            
           
            if(deliveries[index]["match_id"]!=undefined && matchIds.includes(deliveries[index]["match_id"])){ 
                const bowlingTeam=deliveries[index]["bowling_team"];
                
                // Pushing extra runs into resultObj
                if(bowlingTeam!=undefined && resultObj.hasOwnProperty(bowlingTeam)){
                    const extraRuns=deliveries[index]["extra_runs"];
                        
                    if(extraRuns!=undefined){
                        resultObj[bowlingTeam]+=parseInt(extraRuns);
                    }
                }
            }
        }
        
        return resultObj;
    
}

function dumpJSONToFile(extraRunsResult1){
    const jsonRes=JSON.stringify(extraRunsResult1,null,2);

    fs.writeFileSync("../public/output/extraRunsConcededByYear.json",jsonRes,"utf-8");
}


function runAndDump(){
    const extraRunsResult1=extraRunsConcededByYear(matches,deliveries);

    dumpJSONToFile(extraRunsResult1);
}

runAndDump();