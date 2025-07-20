const { test, expect } = require('@playwright/test');

test('Complete checkout flow with 3 random items', async ({ page }) => {
  // Step 1: Login
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Step 2: Validate login success
  await expect(page.locator('.title')).toHaveText('Products');

  // Step 3: Select 3 random items
  const allItems = await page.$$('.inventory_item');
  expect(allItems.length).toBeGreaterThan(2);

  // Shuffle and pick 3 items
  const shuffled = allItems.sort(() => 0.5 - Math.random()).slice(0, 3);

  for (const item of shuffled) {
    const button = await item.$('button');
    await button.click();
  }

  // Step 4: Go to cart
  await page.click('.shopping_cart_link');

  // Step 5: Validate 3 items in cart
  const cartItems = await page.$$('.cart_item');
  expect(cartItems.length).toBe(3);

  // Step 6: Proceed to checkout
  await page.click('[data-test="checkout"]');

  // Step 7: Fill checkout info
  await page.fill('[data-test="firstName"]', 'John');
  await page.fill('[data-test="lastName"]', 'Doe');
  await page.fill('[data-test="postalCode"]', '12345');
  await page.click('[data-test="continue"]');

  // Step 8: Confirm checkout overview page
  await expect(page.locator('.title')).toHaveText('Checkout: Overview');
  await page.click('[data-test="finish"]');

  // Step 9: Assert success message
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  
});
