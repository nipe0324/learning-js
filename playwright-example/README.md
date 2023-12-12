# playwright example

https://playwright.dev/

## Commands

Run tests

```sh
npx playwright test

# headed mode
npx playwright test --headed

# UI mode
npx playwright test --ui

# Debug mode
npx playwright test --debug

# Specfic test
npx playwright test example.spec.ts:10 --debug
```

Show HTML Test report

```sh
npx playwright show-report
```

Recorde tests

```sh
npx playwright codegen demo.playwright.dev/todomvc
```

## Write tests

Playwrightのテストはシンプルで、アクションを実行し、そして、期待に対して状態をアサートする

### Actions

Navigation

```js
await page.goto('https://playwright.dev/');
```

Interactions

```js
// Create a locator.
const getStarted = page.getByRole('link', { name: 'Get Started' }); 

// Click it.
await getStarted.click();

// Basic actions as below.
locator.click();
locator.fill();
locator.press();
locator.check();
locator.uncheck();
locator.selectOption();
locator.setInputFiles();
locator.hover();
locator.focus();
```

### Assertions

```js
expect(success).toBeTruthy();

// async mathcers
await expect(page).toHaveTitle(/Playwright/);

// popular async assertions as below
// more: https://playwright.dev/docs/test-assertions
expect(locator).toBeChecked();
expect(locator).toBeEnabled();
expect(locator).toBeVisible();
expect(locator).toContainText();
expect(locator).toHaveAttribute();
expect(locator).toHaveText();
expect(locator).toHaveValue();
expect(locator).toHaveTitle();
expect(locator).toHaveURL();
```

### Test Hooks

```js
test.describe('navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });

  test('main navigation', async ({ page }) => {
    await expect(page).toHaveTitle(/Playwright/);
  });
});
```
