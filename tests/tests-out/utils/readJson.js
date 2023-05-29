"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const readJsonFile = async (jsonFileName) => {
    return await JSON.parse((0, fs_1.readFileSync)(jsonFileName ?? "AxeResults.json", "utf8"));
};
exports.default = readJsonFile;
//# sourceMappingURL=readJson.js.map