import fs from "fs";

const deliveries=JSON.parse(fs.readFileSync("/home/harrish-easwar/js-ipl-data-project/src/data/deliveries.json","utf-8"));


export function highestNumOfDismissals(deliveries){
    let playerList={};
    let resultObj={};
    // creating an object of players who were dismissed and dismissed by who and number of times dismissed
    for(let index=0;index<deliveries.length;index++){

        const dismissedPlayer=deliveries[index]["player_dismissed"];
        const dismissedType=deliveries[index]["dismissal_kind"];
        const bowler=deliveries[index]["bowler"];
        const wicketKeeperOrFielder=deliveries[index]["fielder"];

        //if the main object does not have dismissed player then add them as obj key else it checks type of dimissal and adds player who dismissed. 
        if(dismissedPlayer!="" && !playerList.hasOwnProperty(dismissedPlayer)){
            playerList[dismissedPlayer]={};

        }else if(dismissedPlayer!="" && playerList.hasOwnProperty(dismissedPlayer)){

                //checking based on dismissal type. Stumped is considered for both keeper and bowler
                if(dismissedType!="" && dismissedType==="stumped"){
                    //bowler dismissal count increases
                        if(bowler!=""  && !playerList[dismissedPlayer].hasOwnProperty(bowler)){
                            playerList[dismissedPlayer][bowler]=1;
                        }else if(bowler!=""){
                            playerList[dismissedPlayer][bowler]+=1;
                        }

                        //wicket keeper dismissal count increases
                        if(wicketKeeperOrFielder!="" && !playerList[dismissedPlayer].hasOwnProperty(wicketKeeperOrFielder)){
                            playerList[dismissedPlayer][wicketKeeperOrFielder]=1;
                        }else{
                            playerList[dismissedPlayer][wicketKeeperOrFielder]+=1;
                        }
                }else if(dismissedType!="" && dismissedType==="run out"){
                        //checking for only run outs. Fielder gets this dismissal
                        if(wicketKeeperOrFielder!="" && !playerList[dismissedPlayer].hasOwnProperty(wicketKeeperOrFielder)){
                            playerList[dismissedPlayer][wicketKeeperOrFielder]=1;
                        }else{
                            playerList[dismissedPlayer][wicketKeeperOrFielder]+=1;
                        }
                }else{
                        //checking for only bowler dismissals
                        if(bowler!=""  && !playerList[dismissedPlayer].hasOwnProperty(bowler)){
                            playerList[dismissedPlayer][bowler]=1;
                        }else if(bowler!=""){
                            playerList[dismissedPlayer][bowler]+=1;
                        }
                }



            }

    }
    //searching the playerList Obj to check the player who was dismissed the most and by which player.
    let mostDismissed;
    let dismisserFinal;
    let numOfTimes=0;
    for(let dismissedPlayer in playerList){
        
        for(let dismisser in playerList[dismissedPlayer]){
            if(playerList[dismissedPlayer][dismisser]>numOfTimes){

                mostDismissed=dismissedPlayer;
                dismisserFinal=dismisser;
                numOfTimes=playerList[dismissedPlayer][dismisser];
            }
        }
    }
    //saving the results in an object
    resultObj[mostDismissed]={
        dismisser: dismisserFinal,
        no_of_times: numOfTimes
    };
    
    return resultObj;
}




//write and dump to .json
function dumpJsonToFile(result){
    const jsonRes=JSON.stringify(result,null,2);
    fs.writeFileSync("../public/output/highestNumOfDismissal.json",jsonRes,"utf-8");
    

};

function runAndDumpRes(){
    const highestNumOfDismissals1=highestNumOfDismissals(deliveries);

    dumpJsonToFile(highestNumOfDismissals1);
}

runAndDumpRes();