"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axe_html_reporter_1 = require("axe-html-reporter");
const createReport = async (rawAxeResults, reportFileName, projectKey = "") => (0, axe_html_reporter_1.createHtmlReport)({
    results: rawAxeResults,
    options: {
        reportFileName: `${reportFileName}.html` ?? "axe-core-report.html",
        customSummary: "report",
        projectKey: projectKey,
        outputDirPath: "axe-core/reports/",
        doNotCreateReportFile: false,
    },
});
exports.default = createReport;
//# sourceMappingURL=createReport.js.map