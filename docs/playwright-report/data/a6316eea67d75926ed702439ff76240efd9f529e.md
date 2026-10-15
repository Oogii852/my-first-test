# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: mytest.spec.ts >> амжилтгүй нэвтрэх
- Location: tests/mytest.spec.ts:32:5

# Error details

```
Error: page.goto: WebKit encountered an internal error
Call log:
  - navigating to "https://www.saucedemo.com/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect, Page } from '@playwright/test';
  2  | 
  3  | const URL = 'https://www.saucedemo.com';
  4  | 
  5  | // Нэвтрэх туслах функц: тест бүр өөрөө нэвтэрдэг тул тестүүд хоорондоо хамааралгүй (test isolation)
  6  | async function login(page: Page, user = 'standard_user', pass = 'secret_sauce') {
> 7  |   await page.goto(URL);
     |              ^ Error: page.goto: WebKit encountered an internal error
  8  |   await page.getByPlaceholder('Username').fill(user);
  9  |   await page.getByPlaceholder('Password').fill(pass);
  10 |   await page.getByRole('button', { name: 'Login' }).click();
  11 | }
  12 | 
  13 | // Гарах туслах функц: цэсийг нээгээд Logout дарна.
  14 | // Logout нь button эсвэл link байж болох тул .or() ашиглав.
  15 | async function logout(page: Page) {
  16 |   await page.getByRole('button', { name: 'Open Menu' }).click();
  17 |   await page
  18 |     .getByRole('link', { name: 'Logout' })
  19 |     .or(page.getByRole('button', { name: 'Logout' }))
  20 |     .click();
  21 |   // Гарсны дараа нэвтрэх хуудас дахин харагдана
  22 |   await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  23 | }
  24 | 
  25 | test('амжилттай нэвтрэх', async ({ page }) => {
  26 |   await login(page);
  27 |   await expect(page).toHaveURL(/inventory/);
  28 |   await expect(page.getByText('Products', { exact: true })).toBeVisible();
  29 |   await logout(page);
  30 | });
  31 | 
  32 | test('амжилтгүй нэвтрэх', async ({ page }) => {
  33 |   await login(page, 'standard_user', 'buruu_nuuts_ug');
  34 |   // Алдааны мессеж гарч, inventory хуудас руу орохгүй
  35 |   await expect(page.getByText('Username and password do not match')).toBeVisible();
  36 |   await expect(page).not.toHaveURL(/inventory/);
  37 | });
  38 | 
  39 | test('бараа сагслах', async ({ page }) => {
  40 |   await login(page);
  41 |   // Эхний барааг сагсанд хийнэ
  42 |   await page.getByRole('button', { name: 'Add to cart' }).first().click();
  43 |   // Сагсны тэмдэг дээр 1 гарна
  44 |   await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  45 |   await logout(page);
  46 | });
  47 | 
```