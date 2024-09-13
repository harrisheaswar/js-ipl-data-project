import fs from "fs";

const deliveries=JSON.parse(fs.readFileSync("../data/deliveries.json","utf-8"));
const matches=JSON.parse(fs.readFileSync("../data/matches.json","utf-8"));

export function findStrikeRateOfAllBySeason(){
    
    let strikeByYearObj={};
    let idToYear={};
    let yearAndPlayerData={};

        //mapping all the year with ids
        for(let index=0;index<matches.length;index++){
            let year=matches[index]["season"];
            let matchId=matches[index]["id"];

                if(year!=undefined && !idToYear.hasOwnProperty(year)){
                    if(matchId!=undefined){
                        idToYear[matchId]=year;
                    }
                }

            
        }
       
        for(let index=0;index<deliveries.length;index++){
            let deliveryId=deliveries[index]["match_id"];
            let batsman=deliveries[index]["batsman"];
            let totalRuns=deliveries[index]["total_runs"];
            let wideRuns=deliveries[index]["wide_runs"];

            let batsmanRuns=deliveries[index]["batsman_runs"];
            let noBallRuns=deliveries[index]["no_ballRuns"];
            let year=idToYear[deliveryId];

            if(!yearAndPlayerData.hasOwnProperty(year)){
                
                yearAndPlayerData[year]={};
            }

                if(batsman!=undefined && !yearAndPlayerData[year].hasOwnProperty(batsman)){
                    yearAndPlayerData[year][batsman]={
                        total_runs:0,
                        total_balls:0
                    };
                
                }
                    if(batsmanRuns!=undefined && parseInt(batsmanRuns)>0 ){
                        yearAndPlayerData[year][batsman]["total_runs"]+=parseInt(batsmanRuns);
                        yearAndPlayerData[year][batsman]["total_balls"]+=1;
                    }else if(noBallRuns!=undefined && parseInt(noBallRuns)>1 ){
                        yearAndPlayerData[year][batsman]["total_runs"]+=parseInt(noBallRuns)-1;
                    }else if(totalRuns!=undefined && parseInt(totalRuns)>0 && parseInt(noBallRuns)===0 && parseInt(wideRuns)===0){
                        yearAndPlayerData[year][batsman]["total_balls"]+=1;
                    }


            
        }
        

        for(let year in yearAndPlayerData){
            strikeByYearObj[year]={};
            for(let player in yearAndPlayerData[year]){
                let totalRuns=yearAndPlayerData[year][player]["total_runs"];
                let totalBalls=yearAndPlayerData[year][player]["total_balls"];
                let strikeRate;

                if(totalBalls!==0){
                    strikeRate=(totalRuns/totalBalls)*100;
                }else{
                    strikeRate=0;
                }

                strikeByYearObj[year][player]=strikeRate;
            }
        }

        return strikeByYearObj;

}


function dumpJsonToFile(result){
    const jsonRes=JSON.stringify(result,null,2);
    fs.writeFileSync("../public/output/findStrikeRateOfAllBySeason.json",jsonRes,"utf-8");
    

};

function runAndDumpRes(){
    const findStrikeRateOfAllBySeason1=findStrikeRateOfAllBySeason(matches);

    dumpJsonToFile(findStrikeRateOfAllBySeason1);
}

runAndDumpRes();