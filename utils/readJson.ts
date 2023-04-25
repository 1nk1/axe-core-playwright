import { readFileSync } from "fs";


const readJsonFile = async(jsonFileName: string) => {
	return await JSON.parse(readFileSync(jsonFileName ?? "AxeResults.json", "utf8"));
}

export default readJsonFile

