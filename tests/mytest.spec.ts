import { test, expect } from '@playwright/test';

// 1. Зөв username болон password ашиглан амжилттай нэвтрэх
test('амжилттай нэвтрэх', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Нэвтэрсний дараа Products харагдах ёстой
  await expect(page.getByText('Products')).toBeVisible();

  // Menu нээнэ
  await page.getByRole('button', { name: 'Open Menu' }).click();

  // Logout товч харагдахыг шалгана
  const logoutButton = page.locator('#logout_sidebar_link');
  await expect(logoutButton).toBeVisible();

  // Logout хийнэ
  await logoutButton.click();

  // Login хуудас руу буцсан эсэхийг шалгана
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});


// 2. Буруу password ашиглахад алдааны мессеж гаргах
test('амжилтгүй нэвтрэх', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('wrong_password');
  await page.getByRole('button', { name: 'Login' }).click();

  // Буруу password үед алдааны мессеж харагдах ёстой
  await expect(
    page.getByText('Username and password do not match')
  ).toBeVisible();

  // Login хуудас дээр хэвээр байгаа эсэхийг шалгана
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});


// 3. Нэвтэрсний дараа бараа сагслах
test('барааг сагслах', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Нэвтэрсэн эсэхийг шалгана
  await expect(page.getByText('Products')).toBeVisible();

  // Эхний барааг сагсанд нэмнэ
  await page.getByRole('button', { name: /Add to cart/ }).first().click();

  // Сагсанд 1 бараа нэмэгдсэн эсэхийг шалгана
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // Menu нээнэ
  await page.getByRole('button', { name: 'Open Menu' }).click();

  // Logout товч харагдахыг шалгана
  const logoutButton = page.locator('#logout_sidebar_link');
  await expect(logoutButton).toBeVisible();

  // Logout хийнэ
  await logoutButton.click();

  // Login хуудас руу буцсан эсэхийг шалгана
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});