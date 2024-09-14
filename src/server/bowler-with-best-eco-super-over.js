import fs from "fs";

const deliveries=JSON.parse(fs.readFileSync("../data/deliveries.json","utf-8"));


export function bowlerWithBestEcoSuperOver(deliveries){

    let bowlerList={};
    let resultObj={};

    //saving bowlers(super-over) as keys and storing number of runs conceded and number of balls bowled
        for(let index=0;index<deliveries.length;index++){
            let bowler=deliveries[index]["bowler"];
            
            if(deliveries[index]["is_super_over"]==="1" && !bowlerList.hasOwnProperty(bowler)){
                bowlerList[bowler]={
                    total_runs:0,
                    total_balls:0
                }
            }else if(deliveries[index]["is_super_over"]==="1"){
                
                const wideRuns=parseInt(deliveries[index]["wide_runs"]);
                const noBallRuns=parseInt(deliveries[index]["noball_runs"]);
                const batsmanRuns=parseInt(deliveries[index]["batsman_runs"]);


                if(wideRuns>0){
                    bowlerList[bowler]["total_runs"]+=wideRuns;
                }else if(noBallRuns>0){
                    bowlerList[bowler]["total_runs"]+=noBallRuns;
                }else if(batsmanRuns>0){
                    bowlerList[bowler]["total_runs"]+=batsmanRuns;
                    bowlerList[bowler]["total_balls"]+=1;
                }else{
                    bowlerList[bowler]["total_balls"]+=1;
                }
            }
        }

    //calculating best economy from all the super-over bowlers 
    let bestBowler;
    let bestEconomy=Number.MAX_SAFE_INTEGER;
        for(let bowler in bowlerList){
            //economy is total_run/total_overs OR (total_runs/total_balls)*6
            let economy=(bowlerList[bowler]["total_runs"]/bowlerList[bowler]["total_balls"])*6;
            if(economy<bestEconomy){
                bestBowler=bowler;
                bestEconomy=economy;
                
            }
        }
        //saving the results of the best super over bowler by economy in the below object
    resultObj[bestBowler]=bestEconomy;
    
    return resultObj;

}

function dumpJSONToFile(bowlerWithBestEcoSuperOver1){
    const jsonRes=JSON.stringify(bowlerWithBestEcoSuperOver1,null,2);

    fs.writeFileSync("../public/output/bowlerWithBestEcoSuperOver.json",jsonRes,"utf-8");
}


function runAndDump(){
    const bowlerWithBestEcoSuperOver1=bowlerWithBestEcoSuperOver(deliveries);

    dumpJSONToFile(bowlerWithBestEcoSuperOver1);
}

runAndDump();