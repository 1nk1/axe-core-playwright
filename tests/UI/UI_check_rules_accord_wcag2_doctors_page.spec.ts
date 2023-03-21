import {test, defineConfig, Browser, BrowserContext,  chromium} from '@playwright/test';
import { Page } from 'playwright';
import { injectAxe } from "axe-playwright";
import AxeBuilder from '@axe-core/playwright';


let browser: Browser 
let page: Page
let context: BrowserContext
const URL: string = 'https://ej2.syncfusion.com/showcase/angular/appointmentplanner/#/doctors';


test.describe('Playwright web page accessibility test', async () => {
    test.beforeEach(async () => {
        // @ts-ignore
        browser = await chromium.launch(defineConfig())
        context = await browser.newContext()
        page = await context.newPage();
        await page.goto(URL)
        await injectAxe(page)
    })

    test(`Check accessibility accord to 'Add new Doctor' button in the current page: [${URL}] => Observing the rules of ['wcag2a', 'wcag2aa', 'wcag2aaa', 'ACT']`, async () => {

        const addNewDoctorButton = await page.getByRole('button', {name: 'Add New Doctor'})
        await addNewDoctorButton.click();
        const dialogFrame = await page.locator('div [class*="new-doctor-dialog"]');
        await dialogFrame?.locator('div [class="name-container"] input[name="Name"]').fill('Someone');
        await dialogFrame?.locator('div [class="gender-container"] input[name="Mobile"]').fill('0631212121');
        await dialogFrame?.locator('div [class="email-container"] input[name="Email"]').fill('someone@hotmail.com');
        await dialogFrame?.locator('div [class="education-container"] input[name="Education"]').fill('Medicine University');

        const reportRes = await new AxeBuilder({page})
            .withTags([
            'wcag2a',
            'wcag2aa',
            'wcag2aaa',
            'wcag21aa',
            'wcag21a',
            'wcag22aa'])
            .withRules([''])
            .options({
                preload: true,
                iframes: true,
                reporter: 'v2',
            }).analyze();

        console.log(reportRes)

    })
    test.afterEach(async () => {
        await browser.close()
    })
})
