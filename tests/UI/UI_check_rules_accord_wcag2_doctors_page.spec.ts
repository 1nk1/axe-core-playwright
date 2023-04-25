import {
  test,
  defineConfig,
  Browser,
  BrowserContext,
  firefox,
} from "@playwright/test";
import { Page } from "playwright";
import { injectAxe } from "axe-playwright";
import AxeBuilder from "@axe-core/playwright";

import writeJsonToFile from "../../utils/writeJson";
import readJsonFile from "../../utils/readJson";
import createReport from "../../utils/createReport";

let browser: Browser;
let page: Page;
let context: BrowserContext;
const URL: string =
  "https://ej2.syncfusion.com/showcase/angular/appointmentplanner/#/doctors";

test.describe("Playwright web page accessibility test", async () => {
  test.beforeEach(async () => {
    // @ts-ignore
    browser = await firefox.launch(defineConfig);
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto(URL);
    await injectAxe(page);
  });

  test(`Check accessibility accord to 'Add new Doctor' button in the current page: [${URL}] => Observing the rules of ['wcag2a', 'wcag2aa', 'wcag2aaa', 'ACT']`, async () => {
    const addNewDoctorButton = page.getByRole("button", {
      name: "Add New Doctor",
    });
    await addNewDoctorButton.click();
    const dialogFrame = page.locator('div [class*="new-doctor-dialog"]');
    await dialogFrame
      ?.locator('div [class="name-container"] input[name="Name"]')
      .fill("Someone");
    await dialogFrame
      ?.locator('div [class="gender-container"] input[name="Mobile"]')
      .fill("0631212121");
    await dialogFrame
      ?.locator('div [class="email-container"] input[name="Email"]')
      .fill("someone@hotmail.com");
    await dialogFrame
      ?.locator('div [class="education-container"] input[name="Education"]')
      .fill("Medicine University");

    const reportResultAnalyze = await new AxeBuilder({ page })
      .withTags([
        "wcag2a",
        "wcag2aa",
        "wcag2aaa",
        "wcag21aa",
        "wcag21a",
        "wcag22aa",
      ])
      .withRules([
        "aria-allowed-role",
        "aria-dialog-name",
        "aria-hidden-body",
        "aria-hidden-focus",
        "aria-required-attr",
        "aria-roles",
        "aria-valid-attr-value",
        "aria-valid-attr",
        "autocomplete-valid",
        "avoid-inline-spacing",
        "button-name",
        "bypass",
        "color-contrast",
        "document-title",
        "duplicate-id-active",
        "duplicate-id-aria",
        "duplicate-id",
        "empty-heading",
        "form-field-multiple-labels",
        "heading-order",
        "html-has-lang",
        "html-lang-valid",
        "image-alt",
        "image-redundant-alt",
        "label-title-only",
        "label",
        "landmark-main-is-top-level",
        "landmark-no-duplicate-banner",
        "landmark-no-duplicate-main",
        "landmark-one-main",
        "html-lang",
      ])
      .options({
        preload: true,
        iframes: true,
        reporter: "v2",
        resultTypes: ["inapplicable", "incomplete", "passes", "violations"],
      })
      .analyze();

    const fileName = "AxiosResultsTest.json";

    writeJsonToFile(reportResultAnalyze, fileName);
    const jsonFile = await readJsonFile(fileName);
    createReport(jsonFile, fileName);
  });
  test.afterEach(async () => {
    await browser.close();
  });
});
