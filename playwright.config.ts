import { defineConfig } from '@playwright/test';
import { expect } from '@playwright/test'
import matchers from 'expect-axe-playwright'

// This option without 'defineConfig' for example for ALLURE
// reporter: {
//     ["allure-playwright", {
//         detail: true,
//         outputFolder: "allure-results",
//         suiteTitle: false,
//     },
//         ];
// };

// This option without 'defineConfig' for example for JSON
// reporter: [['json', { outputFile: '../axe-core/playwright-report/playwright-report.json' }]],

expect.extend(matchers)


// This deep customize for all 'page' and other 'elements' which to wants check a11ly in general
// tips - If you wanna customizing and after checkally some 'elements' with define 'rules' and 'tags' you could to customized this in each test separate
// Set default - JSON REPORT
export default defineConfig({
    // reporter: [['json', { outputFile: '../axe-core/playwright-report/playwright-report.json' }]],
    reporter: [["allure-playwright", {
                detail: true,
                outputFolder: "../axe-core/playwright-report/playwright-report/axe-allure-ui-test",
                suiteTitle: true,
                open: true
            }]],
    use: {
        headless: false,
        viewport: { width: 1920, height: 1080 },
        ignoreHTTPSErrors: true,
        video: { mode: 'on', size: { width: 1920, height: 1080 }},
        axeOptions: {
            //TIPS - FOR ALL TEST IN THIS FIXTURE
            // runOnly: {
            //     // type: 'tag',
            //     // values: ['wcag2aa', 'wcag2aaa', 'wcag2a']
            // },
            resultTypes: ['violations', 'incomplete', 'inapplicable', 'passes'],
            reporter: 'v2',
            elementRef: true,
            iframes: true,
            ancestry: true,
            absolutePaths: true,
            selectors: true,
            xpath: true,
            pingWaitTime: 500,
            frameWaitTime: 250,
            performanceTimer: true,
            preload: true
        },
    },
});