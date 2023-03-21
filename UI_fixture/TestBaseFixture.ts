// check-wcag-rules.ts
import { test as base } from '@playwright/test'
import { MainMarsPage } from './pages/mars-main-page.ts'

type MarsFixture = { mainMarsPage: MainMarsPage };

export const test = base.extend<MarsFixture>({
    mainMarsPage: async ({ page, context }) => {
        const mainMarsPage = new MainMarsPage(page, context)
        await mainMarsPage.pageObjectModel()
    }
})
export { expect } from '@playwright/test'