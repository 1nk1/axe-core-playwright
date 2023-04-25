import { AxeResults } from "axe-core";
import { createHtmlReport } from "axe-html-reporter";

const createReport = async (
  rawAxeResults: AxeResults,
  reportFileName: string,
  projectKey: string = ""
) =>
  createHtmlReport({
    results: rawAxeResults,
    options: {
      reportFileName: `${reportFileName}.html` ?? "axe-core-report.html",
      customSummary: "report",
      projectKey: projectKey,
      outputDirPath: "axe-core/reports/",
      doNotCreateReportFile: false,
    },
  });

export default createReport;
