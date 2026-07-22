const { test, expect } = require('@playwright/test');

test('renders employment docs and updates when selections change', async ({ page }) => {
  await page.goto('/index.html');

  await expect(page.locator('h1')).toHaveText('Employment Docs');

  const card = page.locator('#card-container .card').first();
  await expect(card).toBeVisible();
  await expect(card.locator('h3')).toHaveText('Oracle');
  await expect(card.locator('.doc-links a')).toHaveCount(6);

  await page.selectOption('#emp-name', 'john doe');
  await page.selectOption('#company', 'United Online');

  await expect(page.locator('#card-container .card').first().locator('h3')).toHaveText('United Online');
});
