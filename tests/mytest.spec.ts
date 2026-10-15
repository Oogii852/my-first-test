import { test, expect, Page } from '@playwright/test';

const URL = 'https://www.saucedemo.com';

// Нэвтрэх туслах функц: тест бүр өөрөө нэвтэрдэг тул тестүүд хоорондоо хамааралгүй (test isolation)
async function login(page: Page, user = 'standard_user', pass = 'secret_sauce') {
  await page.goto(URL);
  await page.getByPlaceholder('Username').fill(user);
  await page.getByPlaceholder('Password').fill(pass);
  await page.getByRole('button', { name: 'Login' }).click();
}

// Гарах туслах функц: цэсийг нээгээд Logout дарна.
// Logout нь button эсвэл link байж болох тул .or() ашиглав.
async function logout(page: Page) {
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page
    .getByRole('link', { name: 'Logout' })
    .or(page.getByRole('button', { name: 'Logout' }))
    .click();
  // Гарсны дараа нэвтрэх хуудас дахин харагдана
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
}

test('амжилттай нэвтрэх', async ({ page }) => {
  await login(page);
  await expect(page).toHaveURL(/inventory/);
  await expect(page.getByText('Products', { exact: true })).toBeVisible();
  await logout(page);
});

test('амжилтгүй нэвтрэх', async ({ page }) => {
  await login(page, 'standard_user', 'buruu_nuuts_ug');
  // Алдааны мессеж гарч, inventory хуудас руу орохгүй
  await expect(page.getByText('Username and password do not match')).toBeVisible();
  await expect(page).not.toHaveURL(/inventory/);
});

test('бараа сагслах', async ({ page }) => {
  await login(page);
  // Эхний барааг сагсанд хийнэ
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  // Сагсны тэмдэг дээр 1 гарна
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  await logout(page);
});
