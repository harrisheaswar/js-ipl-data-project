import fs from "fs";

const matches=JSON.parse(fs.readFileSync("../data/matches.json","utf-8"));
const deliveries=JSON.parse(fs.readFileSync("../data/deliveries.json","utf-8"));