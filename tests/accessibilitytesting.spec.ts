/*
1) Playwright can be used to test your application for many types of accessibility issues.
Examples:
    Missing or Improper ALT Text for Images
    Poor Color Contrast
    Missing Form Labels
    Keyboard Navigation Issues

Every website should follow WCAG guidelines.
    - Web Content Accessibility Guidelines (WCAG) 

Install @axe-core/playwright: 
    npm install @axe-core/playwright

https://www.npmjs.com/package/@axe-core/playwright


*/

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright'; 


test("accessibility test", async({page},testInfo)=>{

 //await page.goto('https://demowebshop.tricentis.com/');
await page.goto('https://www.w3.org/');



//1) Scanning detect all types of WCAG violations.
//const accessibilityScanResults=await new AxeBuilder({page}).analyze();

//expect(accessibilityScanResults.violations).toEqual([]);
// expect(accessibilityScanResults.violations.length).toEqual(0);

//2) Scanning for few WCAG violations

//const accessibilityScanResults=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();

//3) Scanning for fe WCAG violations with rules
const accessibilityScanResults=await new AxeBuilder({page}).disableRules(['duplicate-id']).analyze();


await testInfo.attach('accessibility results',{
                                                body: JSON.stringify(accessibilityScanResults,null,2),
                                                contentType:'application/json'
                                                });

console.log("Number of violations:====>",accessibilityScanResults.violations.length);
expect(accessibilityScanResults.violations.length).toEqual(0);



})



