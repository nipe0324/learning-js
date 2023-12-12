<!-- omit in toc -->
# playwright example

https://playwright.dev/

- [Commands](#commands)
- [Write tests](#write-tests)
  - [Actions](#actions)
  - [Assertions](#assertions)
  - [Test Hooks](#test-hooks)
  - [Annotations](#annotations)
  - [Others](#others)
- [Configuration](#configuration)
  - [Emulation](#emulation)
  - [Others](#others-1)


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

more: https://playwright.dev/docs/test-cli

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

### Annotations

Group tests

```js
test.describe('two tests', () => {
  test('one', async ({ page }) => {
    // ...
  });

  test('two', async ({ page }) => {
    // ...
  });
});
```

Skip test

```js
test.skip('skip this test', async ({ page )} => {
  // This test is not run
});

// Conditionally skip a test
tess('skip this test', async ({ page, browserName }) => {
  test.skip(browserName === 'firefox', 'Still working on it';)
})
```

more: https://playwright.dev/docs/test-annotations

### Others

- Parameterrize tests: https://playwright.dev/docs/test-parameterize
- Fixtures: https://playwright.dev/docs/test-fixtures
- Global setup and teardown: https://playwright.dev/docs/test-global-setup-teardown
- Timeouts: https://playwright.dev/docs/test-timeouts
  - Test timeout: デフォルト 30000 ms
  - Expect timeout: デフォルト 5000 ms

## Configuration

### Emulation

- Devices
  - registory: https://github.com/microsoft/playwright/blob/main/packages/playwright-core/src/server/deviceDescriptorsSource.json
- Viewport
- Locale & Timezone
- Permissions
- Geolocation
- Color Scheme and Media
- User Agent
- Offline
- JavaScript Enabled

more: https://playwright.dev/docs/emulation

### Others

- Parallelism: https://playwright.dev/docs/test-parallel
- Projects: https://playwright.dev/docs/test-projects
  - 同じ設定を使ってテストを実行する論理的なグループ
- Reporter: https://playwright.dev/docs/test-reporters
  - Line, Dot, HTML, JSON などの形式でテスト結果を出力できる
