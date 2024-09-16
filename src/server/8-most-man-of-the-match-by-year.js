import fs from "fs";

const matches=JSON.parse(fs.readFileSync("../data/matches.json","utf-8"));


export function mostManOfTheMatchYearWise(matches){

    let manOfTheMatchList={};
    let resultObj={};

    for(let index=0;index<matches.length;index++){
        const year=matches[index]["season"];
        const manOfMatch=matches[index]["player_of_match"];
        
            if(!manOfTheMatchList.hasOwnProperty(year)){
                
                manOfTheMatchList[year]={};
            }

                if(manOfMatch!=undefined && !manOfTheMatchList[year].hasOwnProperty(manOfMatch)){
                    manOfTheMatchList[year][manOfMatch]=1;
                }else if(manOfMatch!=undefined){
                    manOfTheMatchList[year][manOfMatch]+=1;
                }    

    }

    for(let year in manOfTheMatchList){
        
        let max=0;
        let player;
        resultObj[year]={};
        for(let manOfMatch in manOfTheMatchList[year]){
            if(manOfTheMatchList[year][manOfMatch]>max){
                max=manOfTheMatchList[year][manOfMatch];
                player=manOfMatch;
            }
        }
       
        resultObj[year][player]=max;
    }

    return resultObj;

}




//write and dump to .json
function dumpJsonToFile(result){
    const jsonResult=JSON.stringify(result,null,2);
    fs.writeFileSync("../public/output/mostManOfTheMatchYearWise.json",jsonResult,"utf-8");
}



function runAndDump(){
    const mostManOfTheMatchYearWise1=mostManOfTheMatchYearWise(matches);

    dumpJsonToFile(mostManOfTheMatchYearWise1);
}

runAndDump();