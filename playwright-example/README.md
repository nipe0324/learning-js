<!-- omit in toc -->
# playwright example

https://playwright.dev/

- [Commands](#commands)
- [Best Practices](#best-practices)
  - [テスト哲学](#テスト哲学)
  - [ベストプラクティス](#ベストプラクティス)
- [Write tests](#write-tests)
  - [Actions](#actions)
  - [Assertions](#assertions)
  - [Test Hooks](#test-hooks)
  - [Annotations](#annotations)
  - [Others](#others)
- [Configuration](#configuration)
  - [Emulation](#emulation)
  - [Others](#others-1)
- [More](#more)
  - [Accessibility Testing](#accessibility-testing)
  - [API testing](#api-testing)
  - [Authentication](#authentication)
  - [Othrs](#othrs)


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

## Best Practices

レジリエンスのあるテストを作成するのに役立つプラクティス

### テスト哲学

- ユーザーに見える振る舞いをテストする
    - エンドユーザーに対して機能することを検証するためのもののため、関数名や配列などユーザーが見ない知らない実装の詳細に依存することは避ける
- 可能な限りテスト同士を分離させる
    - テストの分離により、再現性が向上し、デバッグが容易になり、連鎖的なテストの失敗を防ぐことができる
- サードパーティに依存したテストを避ける
    - 自分がコントロールできるものだけをテストする。
    - 外部サイトやサードパーティのテストは、テスト速度の低下やテストも失敗しやすくなる。

### ベストプラクティス

<!-- omit in toc -->
#### locatorを使う

TBD

<!-- omit in toc -->
#### locatorを生成する

TBD

<!-- omit in toc -->
#### 最初にアサーションを使う

```ts
// 👍
await expect(page.getByText('welcome')).toBeVisible();

// 👎
expect(await page.getByText('welcome').isVisible()).toBe(true);
```

<!-- omit in toc -->
#### Debugを設定する

TBD

<!-- omit in toc -->
#### Playwrightのツールを使う

TBD

<!-- omit in toc -->
#### すべてのブラウザーでテストする

TBD

More: https://playwright.dev/docs/best-practices

## Write tests

Playwrightのテストはシンプルで、アクションを実行し、そして、期待に対して状態をアサートする

### Actions

PlaywrightはHTMLのインプット要素とインタラクションができる

Navigation

```js
await page.goto('https://playwright.dev/');
```

Use a locator

```js
const getStarted = page.getByRole('link', { name: 'Get Started' }); 
await getStarted.click();
```

Text Input

```js
// Text input
await page.getByRole('textbox').fill('Peter');

// Date input
await page.getByLabel('Birth day').fill('2020-02-02');

// Time input
await page.getByLabel('Appointment time').fill('13:15');

// Local datetime input
await page.getByLabel('Local time').fill('2020-02-02T05:15');
```

Checkboxes and Radio Buttons

```js
// Check the checkbox
await page.getByLabel('I agree to the terms above').check();

// Assert the checked state
expect(page.getByLabel('Subscribe to newsletter')).toBeChecked();

// Select the radio button
await page.getByLabel('XL').check();
```

Select options

```js
// Single selection matching the value or label
await page.getByLabel('Choose a color').selectOption('blue');

// Single selection matching the label
await page.getByLabel('Choose a color').selectOption({ label: 'Blue' });

// Multiple selected items
await page.getByLabel('Choose multiple colors').selectOption(['red', 'green', 'blue']);
```

More (Mouse click, Kyes, Upload files, Focus, Drag and Drop): https://playwright.dev/docs/input

### Assertions

Playwrightは、`expect`でアサーションを行う。検証するためにマッチャーを使う。いくつかのアサーションはパスするかタイムアウトまで自動でリトライする

- General Matchers: https://playwright.dev/docs/api/class-genericassertions
- Async Matchers: https://playwright.dev/docs/api/class-locatorassertions

```js
expect(success).toBeTruthy();

// async mathcers
await expect(page).toHaveTitle(/Playwright/);

// popular async assertions as below
await expect(locator).toBeChecked();
await expect(locator).toBeEnabled();
await expect(locator).toBeVisible();
await expect(locator).toContainText();
await expect(locator).toHaveAttribute();
await expect(locator).toHaveText();
await expect(locator).toHaveValue();
await expect(locator).toHaveTitle();
await expect(locator).toHaveURL();
```

More(soft assertion, custome expect message, custom matchers, etc): https://playwright.dev/docs/test-assertions

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

## More

### Accessibility Testing

Playwrightは、多くの種類のアクセシビリティの問題を検出することができる

https://playwright.dev/docs/accessibility

```ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('homepage', () => {
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('https://your-site.com/');

    const accessibilityReport = await new AxeBuilder(page).analyze();

    expect(accessibilityReport.violations).toEqual([]);
  });
});
```

### API testing

PlaywrightからREST APIアクセスができる。

次のようなケースでよく使われる。

- サーバーAPIのテスト
- テスト前のサーバー状態を準備する
- テスト時・後のサーバーで事後条件を検証する

```ts
const REPO = 'test-repo-1';
const USER = 'github-username';

test('should create a bug report', async ({ request }) => {
  const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
    title: '[Bug] report 1',
    body: 'Bug description',
  });
  expect(newIssue.ok()).toBeTruthy();

  const issue = await request.get(`/repos/${USER}/${REPO}/issues`);
  expect(issue.ok()).toBeTruthy();
  expect(await issues.json()).toContainEqual(expect.objectContaining({
    title: '[Bug] report 1',
    body: 'Bug description',
  });
});
```

認証状態の再利用

```ts
const requestContext = await request.newContext({
  httpCredentials: {
    username: 'user',
    password: 'passwd',
  }
});

await requestContext.get(`https://api.example.com/login`);

// Save storage state into the file.
await requestContext.storageState({ path: 'state.json' });

// Create a new context with the saved storage state.
const context = await browser.newContext({ storageState: 'state.json' });
```

More: https://playwright.dev/docs/api-testing

### Authentication

TBD: https://playwright.dev/docs/auth

### Othrs

- Browsers: https://playwright.dev/docs/browsers
- Chrome Extensions: https://playwright.dev/docs/chrome-extensions
