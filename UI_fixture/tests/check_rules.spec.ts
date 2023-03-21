import { test as base, defineConfig, BrowserContext, chromium } from '@playwright/test'
import { MainMarsPage } from "../pages/mars-main-page.ts"
import { checkA11y, injectAxe} from "axe-playwright"
import { Browser, Page} from "playwright"

let browser: Browser
let page: Page
let context: BrowserContext
// const URL: string = 'https://dequeuniversity.com/demo/mars/';

const test = base.extend<{ marsPage: MainMarsPage }>({
    marsPage: async ({ page }) => {
        const marsPage = new MainMarsPage(page, context)
        await marsPage.pageObjectModel()
    }
})

test.describe('Playwright web page accessibility test', () => {
    test.beforeEach(async ({marsPage}) => {
        // @ts-ignore
        browser = await chromium.launch(defineConfig())
        context = await browser.newContext()
        page = await context.newPage()
        await marsPage.pageObjectModel()
        await injectAxe(page)
    })

    test('Should be to check item in Mars page on a exists accessibility items', async ({ marsPage }) => {
        await marsPage.pageObjectModel();
        await checkA11y(marsPage.page);
    })
})
