import { AxeResults } from "axe-core";
import { writeFileSync } from "fs";

function writeJsonToFile(_reportResult: AxeResults, jsonFileName = "axe-core-report.json") {
  const data = JSON.stringify(_reportResult, null, 2);
  writeFileSync(jsonFileName, data, (err: { message: any }) => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log("File created successfully");
  });
}

export default writeJsonToFile;
