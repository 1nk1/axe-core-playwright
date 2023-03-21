import { Browser, Page} from 'playwright'
import { injectAxe} from "axe-playwright"
import { test, chromium, expect, defineConfig, BrowserContext } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'assert';

//@ts-ignore
let browser: Browser
let page: Page
let context: BrowserContext
const URL: string = 'https://dequeuniversity.com/demo/mars/';


test.describe('Playwright web page accessibility test', () => {
    test.beforeEach(async () => {
        // @ts-ignore
        browser = await chromium.launch(defineConfig())
        context = await browser.newContext()
        page = await context.newPage()
        await page.goto(URL)
        await injectAxe(page)
    })

    
    test.afterEach(async () => {
        await browser.close()
    })

    test.afterAll(async () => {
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
        
    })

    test(`Check accessibility accord to 'Open calendar' button in the current page: [${URL}] => Observing the rules of ['wcag2a']`, async () => {

        const addAnotherTripButton = await page.locator('span[class="add-buttons wrapper add-trip add-leg-width"] a');
        const openCalendarButton = await page.locator('div[class="dynamic"] span[class="wrapper departure-date"] button');

        await addAnotherTripButton.click();
        await openCalendarButton.click();
        const datePicker = await page.frameLocator('table[class="ui-datepicker-calendar"]');

        expect(datePicker).toBeTruthy();
        
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

        const reportRes = await new AxeBuilder({page})
            .withTags(['wcag2a'])
            .withRules(['html-lang', 'image-alt', 'aria-allowed-attr', 'tab-index'])
            // .disableRules('color-contrast')
            .options({
                preload: true,
                iframes: true,
                reporter: 'v2',
            }).analyze().then(function(results) {
                assert.equal(results.violations, 0);
                assert.equal(results.passes, 1);
        console.log(reportRes)
        })
    })

    test(`Check accessibility accord to 'Add new calendar' link in the current page: [${URL}] => Observing the rules of ['wcag2a']`, async () => {

        const addNewCalendarLink = await page.locator('span[class="add-buttons wrapper add-trip add-leg-width"] a');
        await expect(addNewCalendarLink).toBeVisible();
        const reportRes = await new AxeBuilder({page})
        .withTags(['wcag2a'])
        .withRules(['html-lang', 'image-alt', 'aria-allowed-attr', 'tab-index'])
        // .disableRules('color-contrast')
        .options({
            preload: true,
            iframes: true,
            reporter: 'v2',
        }).analyze().then(function(results) {
            assert.equal(results.violations, 0);
            assert.equal(results.passes, 1);
    console.log(reportRes)
    })
    })

    test(`Check accessibility accord to 'Change language' in the current page: [${URL}] => Observing the rules of ['wcag2a']`, async () => {

        await page.locator('table[class="ui-datepicker-calendar"]');
        const changeLanguageLink = await page.locator('li[class="language-select dropdown"]', { hasText: 'Your language' });

        await changeLanguageLink.click();
        const reportRes = await new AxeBuilder({page})
        .withTags(['wcag2a'])
        .withRules(['html-lang', 'image-alt', 'aria-allowed-attr', 'tab-index'])
        // .disableRules('color-contrast')
        .options({
            preload: true,
            iframes: true,
            reporter: 'v2',
        }).analyze().then(function(results) {
            assert.equal(results.violations, 0);
            assert.equal(results.passes, 1);
    console.log(reportRes)
    })
    })

    test(`Check accessibility accord to 'Open calendar' button in the current page: [${URL}] => Observing the rules of ['wcag2aa']`, async () => {

        const addAnotherTripButton = await page.locator('span[class="add-buttons wrapper add-trip add-leg-width"] a');
        const openCalendarButton = await page.locator('div[class="dynamic"] span[class="wrapper departure-date"] button');

        await addAnotherTripButton.click();
        await openCalendarButton.click();
        const datePicker = await page.frameLocator('table[class="ui-datepicker-calendar"]');

        expect(datePicker).toBeTruthy();
        const reportRes = await new AxeBuilder({page})
        .withTags(['wcag2aa'])
        .withRules(['html-lang', 'image-alt', 'aria-allowed-attr', 'tab-index'])
        // .disableRules('color-contrast')
        .options({
            preload: true,
            iframes: true,
            reporter: 'v2',
        }).analyze().then(function(results) {
            assert.equal(results.violations, 13);
            assert.equal(results.passes, 1);
    console.log(reportRes)
    })
    })

    test(`Check accessibility accord to 'Add new calendar' link in the current page: [${URL}] => Observing the rules of ['wcag2aa']`, async () => {

        const addNewCalendarLink = await page.locator('span[class="add-buttons wrapper add-trip add-leg-width"] a');
        await expect(addNewCalendarLink).toBeVisible();
        const reportRes = await new AxeBuilder({page})
        .withTags(['wcag2aa'])
        .withRules(['html-lang', 'image-alt', 'aria-allowed-attr', 'tab-index'])
        // .disableRules('color-contrast')
        .options({
            preload: true,
            iframes: true,
            reporter: 'v2',
        }).analyze().then(function(results) {
            assert.equal(results.violations, 13);
            assert.equal(results.passes, 1);
    console.log(reportRes)
        })
    })

    test(`Check accessibility accord to 'Change language' in the current page: [${URL}] => Observing the rules of ['wcag2aa']`, async () => {

        await page.locator('table[class="ui-datepicker-calendar"]');
        const changeLanguageLink = await page.locator('li[class="language-select dropdown"]', { hasText: 'Your language' });

        await changeLanguageLink.click();
        const reportRes = await new AxeBuilder({page})
        .withTags(['wcag2aa'])
        .withRules(['html-lang', 'image-alt', 'aria-allowed-attr', 'tab-index'])
        // .disableRules('color-contrast')
        .options({
            preload: true,
            iframes: true,
            reporter: 'v2',
        }).analyze().then(function(results) {
            assert.equal(results.violations, 13);
            assert.equal(results.passes, 1);
    console.log(reportRes)
    })
    })
    test(`Check accessibility accord to 'Open calendar' button in the current page: [${URL}] => Observing the rules of ['wcag2aaa']`, async () => {

        const addAnotherTripButton = await page.locator('span[class="add-buttons wrapper add-trip add-leg-width"] a');
        const openCalendarButton = await page.locator('div[class="dynamic"] span[class="wrapper departure-date"] button');

        await addAnotherTripButton.click();
        await openCalendarButton.click();
        const datePicker = await page.frameLocator('table[class="ui-datepicker-calendar"]');

        expect(datePicker).toBeTruthy();
        const reportRes = await new AxeBuilder({page})
        .withTags(['wcag2aaa'])
        .withRules(['html-lang', 'image-alt', 'aria-allowed-attr', 'tab-index'])
        // .disableRules('color-contrast')
        .options({
            preload: true,
            iframes: true,
            reporter: 'v2',
        }).analyze().then(function(results) {
            assert.equal(results.violations, 13);
            assert.equal(results.passes, 1);
    console.log(reportRes)
    })
    })

    test(`Check accessibility accord to 'Add new calendar' link in the current page: [${URL}] => Observing the rules of ['wcag2aaa']`, async () => {

        const addNewCalendarLink = await page.locator('span[class="add-buttons wrapper add-trip add-leg-width"] a');
        await expect(addNewCalendarLink).toBeVisible();
        const reportRes = await new AxeBuilder({page})
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
        }).analyze().then(function(results) {
            assert.equal(results.violations, 0);
            assert.equal(results.passes, 1);
    console.log(reportRes)
    })
    })

    test(`Check accessibility accord to 'Change language' in the current page: [${URL}] => Observing the rules of ['wcag2aaa']`, async () => {

        await page.locator('table[class="ui-datepicker-calendar"]');
        const changeLanguageLink = await page.locator('li[class="language-select dropdown"]', { hasText: 'Your language' });

        await changeLanguageLink.click();
        const reportRes = await new AxeBuilder({page})
        .withTags(['wcag2aaa'])
        .withRules(['html-lang', 'image-alt', 'aria-allowed-attr', 'tab-index'])
        // .disableRules('color-contrast')
        .options({
            preload: true,
            iframes: true,
            reporter: 'v2',
        }).analyze().then(function(results) {
            assert.equal(results.violations, 0);
            assert.equal(results.passes, 1);
    console.log(reportRes)
    })
    })
})