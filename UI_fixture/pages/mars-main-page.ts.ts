// mars-main-page.ts
import { Locator, Page, BrowserContext } from '@playwright/test';
import { checkA11y } from 'axe-playwright';
import { analyzePage } from '../../src/utils';
import testPages from '../../cli/dist/src/lib/axe-test-urls';

export class MainMarsPage {
     readonly page: Page
     readonly context: BrowserContext
     readonly changeLanguageLink: Locator
     readonly openCalendarButton: Locator
     readonly addAnotherTripButton: Locator
     readonly calendarDatePicker: Locator

    constructor(page: Page, context: BrowserContext) {
        this.page = page
        this.context = this.context
        this.changeLanguageLink = page.locator('li[class="language-select dropdown"]', { hasText: 'Your language' })
        this.addAnotherTripButton = page.locator('span[class="add-buttons wrapper add-trip add-leg-width"] a')
        this.openCalendarButton = page.locator('div[class="dynamic"] span[class="wrapper departure-date"] button')
        this.calendarDatePicker = page.locator('table[class="ui-datepicker-calendar"]')
    }

    async goto(URL: string = 'https://dequeuniversity.com/demo/mars/') {
        await this.page.goto(URL)
    }

    async ActivateCalendarButton() {
        await this.addAnotherTripButton.click()
    }

    async OpenCalendar() {
        await this.openCalendarButton.click()
    }

    async checkA11y() {
        await checkA11y(this.page, this.context, {axeOptions:
        {
            reporter: 'v2',
            preload: true,
            iframes: true,
            xpath: true,
            selectors: true,
            frameWaitTime: 1000,
            resultTypes: ['violations'],
            runOnly: ['wcag2a', 'wcag2aa', 'wcag2aaa'],
            // runOnly: {
            //     values: ['wcag2a', 'wcag2aa', 'wcag2aaa']
            // },
            ancestry: true
        }})
    }

    async pageObjectModel() {
        await this.goto()
        await this.ActivateCalendarButton()
        await this.OpenCalendar()
        await this.checkA11y()
    }
}