import { AxeResults } from "axe-core";
import { writeFileSync } from "fs";

function writeJsonToFile(_reportResult: AxeResults, jsonFileName = "axe-core-report.json") {
  const data = JSON.stringify(_reportResult, null, 2);
  try {
    writeFileSync(jsonFileName, data);
    console.log("File created successfully");
  } catch (err: any) {
    console.log(err.message);
  }
}

export default writeJsonToFile;
