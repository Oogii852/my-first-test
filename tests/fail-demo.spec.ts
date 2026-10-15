import { test, expect } from '@playwright/test';

// Зөвхөн DEMO_FAIL=1 үед ажиллана, ингэснээр үндсэн 9/9 ногоон хэвээр үлдэнэ
test.skip(!process.env.DEMO_FAIL, 'DEMO_FAIL=1 үед л ажиллана');

test('санаатай унах тест (Алхам 4)', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  // Санаатайгаар буруу URL шалгана -> assertion унана, trace-д харагдана
  await expect(page).toHaveURL(/buruu-url/);
});
