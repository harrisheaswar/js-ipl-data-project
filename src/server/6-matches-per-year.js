import fs from "fs";

const matches=JSON.parse(fs.readFileSync("../data/matches.json","utf-8"));

export function matchesPerYear(matches){

 const result=matches.reduce((resultObj,match)=>{
        let year=match["season"];

        if(!resultObj.hasOwnProperty(year)){
            resultObj[year]=1;
        }else{
            resultObj[year]+=1;
        }

        return resultObj;
    },{});

    return result;
}





//write and dump to .json
function dumpJsonToFile(result){
    const jsonRes=JSON.stringify(result,null,2);
    fs.writeFileSync("../public/output/matchesPerYear.json",jsonRes,"utf-8");
    

};

function runAndDumpRes(){
    const matchesPerYearResult=matchesPerYear(matches);

    dumpJsonToFile(matchesPerYearResult);
}

runAndDumpRes();