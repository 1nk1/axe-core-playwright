"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const test_1 = require("@playwright/test");
const axe_core_1 = __importDefault(require("axe-core"));
const baseURL = 'https://dequeuniversity.com/demo/mars/';
test_1.test.describe.parallel('GET some request', () => {
    (0, test_1.test)('GET /someone', () => {
        const resp = axios_1.default.get(baseURL);
        console.log(resp);
    });
    test_1.test.only('Simple API TEST - Asset Response Status', async ({ request }) => {
        const response = await request.get(baseURL);
        const res = await axe_core_1.default.run(document);
        console.log(res);
        // const listOfRules = await axe.getRules(['wcag2a', 'wcag2aa', 'wcag2aaa']);
        // const conf = axe.configure({ allowedOrigins: ['<same_origin>', 'https://deque.com'] });
        // console.log(conf);
        // console.log(listOfRules);
        (0, test_1.expect)(response.status()).toBe(200);
        // console.log(response);
    });
});
//# sourceMappingURL=API_check_rules_accord_wcag2_deque_mars.spec.js.map