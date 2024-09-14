import fs from "fs";

const matches=JSON.parse(fs.readFileSync("../data/matches.json","utf-8"));



export function findAllByTossAndMatchWin(matches){

    let tossAndMatchWinList={};
    
    for(let index=0;index<matches.length;index++){

        const tossWinner=matches[index]["toss_winner"];
        const matchWinner=matches[index]["winner"];

        const team1=matches[index]["team1"];
        const team2=matches[index]["team2"];
           //saving all teams as keys in the tossAndMatchWinList Object
            if(!tossAndMatchWinList.hasOwnProperty(team1)){
                tossAndMatchWinList[team1]={
                    "tossAndMatchWinCount": 0
                }
            }
            if(!tossAndMatchWinList.hasOwnProperty(team2)){
                tossAndMatchWinList[team2]={
                    "tossAndMatchWinCount": 0
                }
            }

        
                if(tossWinner!="" && matchWinner!=""){
                    if(tossWinner===matchWinner && tossAndMatchWinList.hasOwnProperty(matchWinner)){
                        tossAndMatchWinList[matchWinner]["tossAndMatchWinCount"]+=1;
                    }
                }

    }

    return tossAndMatchWinList;
}




//write and dump to .json
function dumpJsonToFile(result){
    const jsonResult=JSON.stringify(result,null,2);
    fs.writeFileSync("../public/output/findAllByTossAndMatchWin.json",jsonResult,"utf-8");
}


function runAndDump(){
    const findAllByTossAndMatchWin1=findAllByTossAndMatchWin(matches);

    dumpJsonToFile(findAllByTossAndMatchWin1);
}

runAndDump();

