import fs from "fs";

const matches=JSON.parse(fs.readFileSync("../data/matches.json","utf-8"));

console.log(matches);

export function matchesPerYear(matches){
    let resultObj={};

    for(let index=0;index<matches.length;index++){

        if(resultObj.hasOwnProperty(matches[index]["season"])){
            resultObj[matches[index]["season"]]=resultObj[matches[index]["season"]]+1;
        }else{
            resultObj[matches[index]["season"]]=1;
        }
    }

    return resultObj;

}

function dumpJsonToFile(result){
    const jsonRes=JSON.stringify(result);
    fs.writeFileSync("../public/output/matchesPerYear.json",jsonRes,"utf-8");
    

};

function runAndDumpRes(){
    const matchesPerYearResult=matchesPerYear(matches);

    dumpJsonToFile(matchesPerYearResult);
}

runAndDumpRes();