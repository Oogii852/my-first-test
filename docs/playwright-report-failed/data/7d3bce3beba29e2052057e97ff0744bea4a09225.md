# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fail.spec.ts >> Санаатай унагасан assertion (Алхам 4)
- Location: fail-demo/fail.spec.ts:2:5

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('.title')
Expected: "Products-WRONG"
Received: "Products"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" locator('.title') with timeout 5000ms
  - waiting for locator('.title')
    14 × locator resolved to <span class="title" data-test="title">Products</span>
       - unexpected value "Products"

```

```yaml
- text: Products
```

# Test source

```ts
  1 | import { test, expect } from '@playwright/test';
  2 | test('Санаатай унагасан assertion (Алхам 4)', async ({ page }) => {
  3 |   await page.goto('https://www.saucedemo.com/');
  4 |   await page.fill('#user-name', 'standard_user');
  5 |   await page.fill('#password', 'secret_sauce');
  6 |   await page.click('#login-button');
> 7 |   await expect(page.locator('.title')).toHaveText('Products-WRONG');
    |                                        ^ Error: expect(locator).toHaveText(expected) failed
  8 | });
  9 | 
```