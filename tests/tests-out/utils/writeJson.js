"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
function writeJsonToFile(_reportResult, jsonFileName = "axe-core-report.json") {
    const data = JSON.stringify(_reportResult, null, 2);
    try {
        (0, fs_1.writeFileSync)(jsonFileName, data);
        console.log("File created successfully");
    }
    catch (err) {
        console.log(err.message);
    }
}
exports.default = writeJsonToFile;
//# sourceMappingURL=writeJson.js.map