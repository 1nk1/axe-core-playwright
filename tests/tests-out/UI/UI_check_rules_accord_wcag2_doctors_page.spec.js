"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const axe_playwright_1 = require("axe-playwright");
const playwright_1 = __importDefault(require("@axe-core/playwright"));
let browser;
let page;
let context;
const URL = 'https://ej2.syncfusion.com/showcase/angular/appointmentplanner/#/doctors';
test_1.test.describe('Playwright web page accessibility test', async () => {
    test_1.test.beforeEach(async () => {
        // @ts-ignore
        browser = await test_1.chromium.launch((0, test_1.defineConfig)());
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto(URL);
        await (0, axe_playwright_1.injectAxe)(page);
    });
    (0, test_1.test)(`Check accessibility accord to 'Add new Doctor' button in the current page: [${URL}] => Observing the rules of ['wcag2a', 'wcag2aa', 'wcag2aaa', 'ACT']`, async () => {
        const addNewDoctorButton = await page.getByRole('button', { name: 'Add New Doctor' });
        await addNewDoctorButton.click();
        const dialogFrame = await page.locator('div [class*="new-doctor-dialog"]');
        await dialogFrame?.locator('div [class="name-container"] input[name="Name"]').fill('Someone');
        await dialogFrame?.locator('div [class="gender-container"] input[name="Mobile"]').fill('0631212121');
        await dialogFrame?.locator('div [class="email-container"] input[name="Email"]').fill('someone@hotmail.com');
        await dialogFrame?.locator('div [class="education-container"] input[name="Education"]').fill('Medicine University');
        const reportRes = await new playwright_1.default({ page })
            .withTags([
            'wcag2a',
            'wcag2aa',
            'wcag2aaa',
            'wcag21aa',
            'wcag21a',
            'wcag22aa'
        ])
            .withRules([''])
            .options({
            preload: true,
            iframes: true,
            reporter: 'v2',
        }).analyze();
        console.log(reportRes);
    });
    test_1.test.afterEach(async () => {
        await browser.close();
    });
});
//# sourceMappingURL=UI_check_rules_accord_wcag2_doctors_page.spec.js.map