import { test, expect } from '@playwright/test';

test('Handle Cookies Demo', async ({ browser }) => {

  const context = await browser.newContext();
  const page = await context.newPage();

  test.slow();

  // Add a cookie
  await context.addCookies([{
    name: 'MyCookie',
    value: '123456',
    url: 'http://www.automationpractice.pl/index.php'
  }]);

  console.log('Cookie added!');

  // 1) Open the URL
  await page.goto('http://www.automationpractice.pl/index.php');


  // 2) Retrieve the cookie by name
  const allCookiesAfterAdd = await context.cookies();
  const retrievedCookie = allCookiesAfterAdd.find((c) => c.name === 'MyCookie');

  console.log('Retrieved cookie details:', retrievedCookie);
  expect(retrievedCookie).toBeDefined();
  expect(retrievedCookie?.value).toBe('123456');

  // 3) Retrieve all cookies
  let allCookies = await context.cookies();
  console.log('Total number of cookies created:', allCookies.length);
  expect(allCookies.length).toBeGreaterThan(0);

  console.log('Printing all the cookies...');
  for (const cookie of allCookies) {
    console.log(`${cookie.name} : ${cookie.value}`);
  }

  // 4) Delete specific cookie by clearing all cookies (as Playwright doesn’t support deleting single cookie directly)
  await context.clearCookies();

  // Verify the number of cookies after deletion
  allCookies = await context.cookies();
  console.log('Number of cookies after deletion:', allCookies.length);
  expect(allCookies.length).toBe(0);

});
