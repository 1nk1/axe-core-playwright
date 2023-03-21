"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axe_playwright_1 = require("axe-playwright");
const test_1 = require("@playwright/test");
const playwright_1 = __importDefault(require("@axe-core/playwright"));
const assert_1 = __importDefault(require("assert"));
//@ts-ignore
let browser;
let page;
let context;
const URL = 'https://dequeuniversity.com/demo/mars/';
test_1.test.describe('Playwright web page accessibility test', () => {
    test_1.test.beforeEach(async () => {
        // @ts-ignore
        browser = await test_1.chromium.launch((0, test_1.defineConfig)());
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto(URL);
        await (0, axe_playwright_1.injectAxe)(page);
    });
    test_1.test.afterEach(async () => {
        await browser.close();
    });
    test_1.test.afterAll(async () => {
        // const result = await new AxeBuilder( { page })
        // // .withRules(['ACT'])
        // .withTags(['wcag2a'])
        // .options({
        //     preload: true,
        //     frameWaitTime: 2500,
        //     iframes: true,
        //     xpath: true,
        //     absolutePaths: true,
        //     selectors: true,
        //     performanceTimer: true,
        //     ancestry: true,
        //     reporter: 'v2',
        // })
        // console.log(result);
    });
    (0, test_1.test)(`Check accessibility accord to 'Open calendar' button in the current page: [${URL}] => Observing the rules of ['wcag2a']`, async () => {
        const addAnotherTripButton = await page.locator('span[class="add-buttons wrapper add-trip add-leg-width"] a');
        const openCalendarButton = await page.locator('div[class="dynamic"] span[class="wrapper departure-date"] button');
        await addAnotherTripButton.click();
        await openCalendarButton.click();
        const datePicker = await page.frameLocator('table[class="ui-datepicker-calendar"]');
        (0, test_1.expect)(datePicker).toBeTruthy();
        // const result = await new AxeBuilder( { page })
        // // .withRules(['ACT'])
        // .withTags(['wcag2a'])
        // .options({
        //     preload: true,
        //     frameWaitTime: 2500,
        //     iframes: true,
        //     xpath: true,
        //     absolutePaths: true,
        //     selectors: true,
        //     performanceTimer: true,
        //     ancestry: true,
        //     reporter: 'v2',
        //     resultTypes: ['violations']
        // })
        // console.log(result);
        const reportRes = await new playwright_1.default({ page })
            .withTags(['wcag2a'])
            .withRules(['html-lang', 'image-alt', 'aria-allowed-attr', 'tab-index'])
            // .disableRules('color-contrast')
            .options({
            preload: true,
            iframes: true,
            reporter: 'v2',
        }).analyze().then(function (results) {
            assert_1.default.equal(results.violations, 0);
            assert_1.default.equal(results.passes, 1);
            console.log(reportRes);
        });
    });
    (0, test_1.test)(`Check accessibility accord to 'Add new calendar' link in the current page: [${URL}] => Observing the rules of ['wcag2a']`, async () => {
        const addNewCalendarLink = await page.locator('span[class="add-buttons wrapper add-trip add-leg-width"] a');
        await (0, test_1.expect)(addNewCalendarLink).toBeVisible();
        const reportRes = await new playwright_1.default({ page })
            .withTags(['wcag2a'])
            .withRules(['html-lang', 'image-alt', 'aria-allowed-attr', 'tab-index'])
            // .disableRules('color-contrast')
            .options({
            preload: true,
            iframes: true,
            reporter: 'v2',
        }).analyze().then(function (results) {
            assert_1.default.equal(results.violations, 0);
            assert_1.default.equal(results.passes, 1);
            console.log(reportRes);
        });
    });
    (0, test_1.test)(`Check accessibility accord to 'Change language' in the current page: [${URL}] => Observing the rules of ['wcag2a']`, async () => {
        await page.locator('table[class="ui-datepicker-calendar"]');
        const changeLanguageLink = await page.locator('li[class="language-select dropdown"]', { hasText: 'Your language' });
        await changeLanguageLink.click();
        const reportRes = await new playwright_1.default({ page })
            .withTags(['wcag2a'])
            .withRules(['html-lang', 'image-alt', 'aria-allowed-attr', 'tab-index'])
            // .disableRules('color-contrast')
            .options({
            preload: true,
            iframes: true,
            reporter: 'v2',
        }).analyze().then(function (results) {
            assert_1.default.equal(results.violations, 0);
            assert_1.default.equal(results.passes, 1);
            console.log(reportRes);
        });
    });
    (0, test_1.test)(`Check accessibility accord to 'Open calendar' button in the current page: [${URL}] => Observing the rules of ['wcag2aa']`, async () => {
        const addAnotherTripButton = await page.locator('span[class="add-buttons wrapper add-trip add-leg-width"] a');
        const openCalendarButton = await page.locator('div[class="dynamic"] span[class="wrapper departure-date"] button');
        await addAnotherTripButton.click();
        await openCalendarButton.click();
        const datePicker = await page.frameLocator('table[class="ui-datepicker-calendar"]');
        (0, test_1.expect)(datePicker).toBeTruthy();
        const reportRes = await new playwright_1.default({ page })
            .withTags(['wcag2aa'])
            .withRules(['html-lang', 'image-alt', 'aria-allowed-attr', 'tab-index'])
            // .disableRules('color-contrast')
            .options({
            preload: true,
            iframes: true,
            reporter: 'v2',
        }).analyze().then(function (results) {
            assert_1.default.equal(results.violations, 13);
            assert_1.default.equal(results.passes, 1);
            console.log(reportRes);
        });
    });
    (0, test_1.test)(`Check accessibility accord to 'Add new calendar' link in the current page: [${URL}] => Observing the rules of ['wcag2aa']`, async () => {
        const addNewCalendarLink = await page.locator('span[class="add-buttons wrapper add-trip add-leg-width"] a');
        await (0, test_1.expect)(addNewCalendarLink).toBeVisible();
        const reportRes = await new playwright_1.default({ page })
            .withTags(['wcag2aa'])
            .withRules(['html-lang', 'image-alt', 'aria-allowed-attr', 'tab-index'])
            // .disableRules('color-contrast')
            .options({
            preload: true,
            iframes: true,
            reporter: 'v2',
        }).analyze().then(function (results) {
            assert_1.default.equal(results.violations, 13);
            assert_1.default.equal(results.passes, 1);
            console.log(reportRes);
        });
    });
    (0, test_1.test)(`Check accessibility accord to 'Change language' in the current page: [${URL}] => Observing the rules of ['wcag2aa']`, async () => {
        await page.locator('table[class="ui-datepicker-calendar"]');
        const changeLanguageLink = await page.locator('li[class="language-select dropdown"]', { hasText: 'Your language' });
        await changeLanguageLink.click();
        const reportRes = await new playwright_1.default({ page })
            .withTags(['wcag2aa'])
            .withRules(['html-lang', 'image-alt', 'aria-allowed-attr', 'tab-index'])
            // .disableRules('color-contrast')
            .options({
            preload: true,
            iframes: true,
            reporter: 'v2',
        }).analyze().then(function (results) {
            assert_1.default.equal(results.violations, 13);
            assert_1.default.equal(results.passes, 1);
            console.log(reportRes);
        });
    });
    (0, test_1.test)(`Check accessibility accord to 'Open calendar' button in the current page: [${URL}] => Observing the rules of ['wcag2aaa']`, async () => {
        const addAnotherTripButton = await page.locator('span[class="add-buttons wrapper add-trip add-leg-width"] a');
        const openCalendarButton = await page.locator('div[class="dynamic"] span[class="wrapper departure-date"] button');
        await addAnotherTripButton.click();
        await openCalendarButton.click();
        const datePicker = await page.frameLocator('table[class="ui-datepicker-calendar"]');
        (0, test_1.expect)(datePicker).toBeTruthy();
        const reportRes = await new playwright_1.default({ page })
            .withTags(['wcag2aaa'])
            .withRules(['html-lang', 'image-alt', 'aria-allowed-attr', 'tab-index'])
            // .disableRules('color-contrast')
            .options({
            preload: true,
            iframes: true,
            reporter: 'v2',
        }).analyze().then(function (results) {
            assert_1.default.equal(results.violations, 13);
            assert_1.default.equal(results.passes, 1);
            console.log(reportRes);
        });
    });
    (0, test_1.test)(`Check accessibility accord to 'Add new calendar' link in the current page: [${URL}] => Observing the rules of ['wcag2aaa']`, async () => {
        const addNewCalendarLink = await page.locator('span[class="add-buttons wrapper add-trip add-leg-width"] a');
        await (0, test_1.expect)(addNewCalendarLink).toBeVisible();
        const reportRes = await new playwright_1.default({ page })
            .withTags(['wcag2aaa'])
            .withRules(['html-lang', 'image-alt', 'aria-allowed-attr', 'tab-index'])
            // .disableRules('color-contrast')
            .options({
            preload: true,
            iframes: true,
            reporter: 'v2',
            frameWaitTime: 1000,
            xpath: true,
            selectors: true
        }).analyze().then(function (results) {
            assert_1.default.equal(results.violations, 0);
            assert_1.default.equal(results.passes, 1);
            console.log(reportRes);
        });
    });
    (0, test_1.test)(`Check accessibility accord to 'Change language' in the current page: [${URL}] => Observing the rules of ['wcag2aaa']`, async () => {
        await page.locator('table[class="ui-datepicker-calendar"]');
        const changeLanguageLink = await page.locator('li[class="language-select dropdown"]', { hasText: 'Your language' });
        await changeLanguageLink.click();
        const reportRes = await new playwright_1.default({ page })
            .withTags(['wcag2aaa'])
            .withRules(['html-lang', 'image-alt', 'aria-allowed-attr', 'tab-index'])
            // .disableRules('color-contrast')
            .options({
            preload: true,
            iframes: true,
            reporter: 'v2',
        }).analyze().then(function (results) {
            assert_1.default.equal(results.violations, 0);
            assert_1.default.equal(results.passes, 1);
            console.log(reportRes);
        });
    });
});
//# sourceMappingURL=UI_check_rules_accord_wcag2_deque_mars.spec.js.map