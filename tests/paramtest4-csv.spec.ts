/*
Pre-requisite:
Install the csv-parse module to read CSV files:
    npm install csv-parse
*/

import { test, expect } from '@playwright/test';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

// ✅ Define the interface matching your CSV columns
interface LoginData {
    email: string;
    password: string;
    validity: string;
}

// Reading data from csv
const csvPath = 'testdata/data.csv';
const fileContent = fs.readFileSync(csvPath, { encoding: 'utf-8' }).replace(/^\uFEFF/, '');

// ✅ Type the records array explicitly
const records: LoginData[] = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
});

// Main test
test.describe('Login data driven test', () => { // ✅ Remove async from describe

    for (const data of records) {
        test(`Login test with email: "${data.email}" and password: "${data.password}"`, async ({ page }) => {
            await page.goto('https://demowebshop.tricentis.com/login');

            await page.locator('#Email').fill(data.email);
            await page.locator('#Password').fill(data.password);
            await page.locator('input[value="Log in"]').click();

            if (data.validity.toLowerCase() === 'valid') {
                const logoutLink = page.locator('a[href="/logout"]');
                await expect(logoutLink).toBeVisible({ timeout: 5000 });
            } else {
                const errorMessage = page.locator('.validation-summary-errors');
                await expect(errorMessage).toBeVisible({ timeout: 5000 });
                await expect(page).toHaveURL('https://demowebshop.tricentis.com/login');
            }
        });
    }
});

