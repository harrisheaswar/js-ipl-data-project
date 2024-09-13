import fs from "fs";

const matches=JSON.parse(fs.readFileSync("../data/matches.json","utf-8"));
const deliveries=JSON.parse(fs.readFileSync("../data/deliveries.json","utf-8"));


export function topTenEcoBowlersByYear(matches,deliveries,inputYear=2015){

    let matchIdList=[];         //to store atch ids of season 2015
    let bowlersList={};         //to store objects of bowlers and the total runs they conceded and also the total balls bowled in the year 
    let filteredList=[];

    //save the match ids in an array where season is 2015.
        for(let index=0;index<matches.length;index++){

            if(parseInt(matches[index]["season"])===inputYear){
                matchIdList.push(matches[index]["id"]);
            }

        }

        //I am using (total runs/total balls)*6 to calculate economic rate for the year
        for(let index=0;index<deliveries.length;index++){

            
            const deliveryMatchId=deliveries[index]["match_id"];
        
            const bowler=deliveries[index]["bowler"];
            if(bowler!=undefined && !bowlersList.hasOwnProperty(bowler) && matchIdList.includes(deliveryMatchId)){
                bowlersList[bowler]={
                    runs_conceded:0,
                    num_balls:0
                };
            }

            const wideRuns=deliveries[index]["wide_runs"];
            const noBallRuns=deliveries[index]["noball_runs"];
            const batsmanRuns=deliveries[index]["batsman_runs"];
            const bye=deliveries[index][""];

            //checking for wide, noball and batman runs
            if(bowlersList.hasOwnProperty(bowler) && matchIdList.includes(deliveryMatchId)){

                if((wideRuns!=undefined && parseInt(wideRuns)>0)){                              //checking for wide
                    bowlersList[bowler]["runs_conceded"]+=parseInt(wideRuns); 

                }else if(noBallRuns!=undefined && parseInt(noBallRuns)>0){                      //checking for no balls
                    bowlersList[bowler]["runs_conceded"]+=parseInt(noBallRuns);   

                }else if(batsmanRuns!=undefined && parseInt(batsmanRuns)>0){
                   
                    bowlersList[bowler]["runs_conceded"]+=parseInt(batsmanRuns);                    //checking for batsman runs
                    bowlersList[bowler]["num_balls"]+=1;
                
                }else{
                    bowlersList[bowler]["num_balls"]+=1;
                }
            }
            
        }

        for(let name in bowlersList){

            let totalRunsConceded=bowlersList[name]["runs_conceded"];
            let totalBallsBowled=bowlersList[name]["num_balls"]

            let economy=(totalRunsConceded/totalBallsBowled)*6;

            let bowlerStats={
                "bowler": name,
                "economy": economy
            }

            filteredList.push(bowlerStats);
        }
        //filtering top 10 by economy
        const resultArr=filteredList.sort((bowler1,bowler2)=>bowler1["economy"]-bowler2["economy"]).slice(0,10);
        return resultArr;
    
}


function dumpJsonToFile(result){
    const jsonResult=JSON.stringify(result,null,2);
    fs.writeFileSync("../public/output/topTenEcoBowlersByYear.json",jsonResult,"utf-8");
}



function runAndDump(){
    const topTenEcoBowlersByYearResult=topTenEcoBowlersByYear(matches,deliveries);

    dumpJsonToFile(topTenEcoBowlersByYearResult);
}

runAndDump();