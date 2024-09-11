import fs from "fs";
import csv from "csv-parser";

const parseCsv = (filePath)=> {
  return new Promise((resolve, reject)=> {
    const results=[];

    fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (data)=> results.push(data))
    .on("end",()=>resolve(results))
    .on("error",(err)=>reject(err));
  });
};

const filePath = "./src/data/matches.csv";

(async ()=>{
    try {
      const jsonData = await parseCsv(filePath);


      console.log("Parsed Csv Data:", jsonData);

      fs.writeFileSync("./src/data/matches.json",JSON.stringify(jsonData,null,2),"utf-8");
      console.log("JSON file created in the output folder");
    } catch(err){
      console.error("Error parsing CSV file:",err);
    }
})();