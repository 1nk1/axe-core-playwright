import axi from 'axios';
import { test, expect } from '@playwright/test';
import axe from 'axe-core';

const baseURL: string = 'https://dequeuniversity.com/demo/mars/';

test.describe.parallel('GET some request', () => {
    
    test('GET /someone', () => {
        const resp = axi.get(baseURL);
        console.log(resp);
    })

    test.only('Simple API TEST - Asset Response Status', async ({request}) => {
        const response = await request.get(baseURL)
        const res = await axe.run(document);
        console.log(res);
        
        // const listOfRules = await axe.getRules(['wcag2a', 'wcag2aa', 'wcag2aaa']);
        // const conf = axe.configure({ allowedOrigins: ['<same_origin>', 'https://deque.com'] });
        // console.log(conf);

        
        // console.log(listOfRules);
        expect(response.status()).toBe(200)
        // console.log(response);
    })
})