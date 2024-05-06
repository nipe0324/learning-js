<!-- omit in toc -->
# playwright example

https://playwright.dev/

- [Commands](#commands)
- [Best Practices](#best-practices)
  - [テスト哲学](#テスト哲学)
  - [ベストプラクティス](#ベストプラクティス)
- [Write tests](#write-tests)
  - [Locators](#locators)
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

- E2Eテストではユーザーに見える振る舞いをテストする
    - エンドユーザーに対して機能することを検証するためのもののため、関数名や配列などユーザーが見ない知らない実装の詳細に依存することは避ける
- 可能な限りテスト同士を分離させる
    - テストの分離により、再現性が向上し、デバッグが容易になり、連鎖的なテストの失敗を防ぐことができる
- サードパーティに依存したテストを避ける
    - 自分がコントロールできるものだけをテストする。
    - 外部サイトやサードパーティのテストは、テスト速度の低下やテストも失敗しやすくなる。

### ベストプラクティス

<!-- omit in toc -->
#### ロケーターを使う

ロケーターは、要素が表示かつ有効になるまで自動で待機してリトライする機能がある。テストのレジリエンスを高めるため利用推奨

```ts
// 👍
page.getByRole('button', { name: 'submit' });
```

XSSやCSSではなく、ユーザー向けの属性の利用を推奨。

```ts
// 👎 DOM構造やCSSは変わりやすいのでテストが失敗しやすくなる
page.locator('button.buttonIcon.episode-actions-later');

// 👍
page.getByRole('button', { name: 'submit' });
```

<!-- omit in toc -->
#### test generatorでlocatorを生成する

[test generator](https://playwright.dev/docs/codegen)でテストを生成できる。ロール、テキスト、test idなどからレジリエンスが高くユニークに識別できるロケーターを生成してくれる。

<!-- omit in toc -->
#### web first assertions を使う

[web first assertions](https://playwright.dev/docs/test-assertions)を使うことで要素が有効になるまで待機してくれるのでテストの実行が安定する。

```ts
// 👍 要素が有効になるまで待機してくれる
await expect(page.getByText('welcome')).toBeVisible();

// 👎 すぐにアサーションが走ってしまう
expect(await page.getByText('welcome').isVisible()).toBe(true);
```

<!-- omit in toc -->
#### Playwrightの関連ツールを使う

- [VS Code extension](https://playwright.dev/docs/getting-started-vscode) : テストの作成、実行、デバッグ時に優れた開発者体験を得られる
- [test generator](https://playwright.dev/docs/codegen) : テストを生成し、ロケーターを選択できる
- [trade viewer](https://playwright.dev/docs/trace-viewer) : タイムライン表示、各アクションのDOMスナップショットの検査、ネットワークリクエストの表示などのトレースができる
- [UI Mode](https://playwright.dev/docs/test-ui-mode) : タイムトラベル機能を使いながらテストを探索、実行、デバッグできる。

<!-- omit in toc -->
#### すべてのブラウザーでテストする

Playwrightでは簡単に複数ブラウザでテストを実行できる。
すべてのブラウザでテストをすることで、すべてのユーザーに対してアプリケーションが動作することを確認できる。

```ts
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
```

More: https://playwright.dev/docs/best-practices

## Write tests

Playwrightのテストはシンプルで、アクションを実行し、そして、期待に対して状態をアサートする

### Locators

ロケーターは、ページ上の要素を見つけるために使う

- `page.getByRole()`: 明示的か暗黙的なアクセサビリティ属性で要素を探す
- `page.getByText()`: テキストで要素を探す
- `page.getByLabel()`: フォームコントロールの関連づいたラベルのテキストを要素を探す。フォームで利用する。
- `page.getByPlaceholder()`: プレースホルダーによって要素を探す。関連づいたラベルがないフォームコントロールで利用する
- `page.getByAltText()`: alt属性によって要素を探す。主に画像に使う。
- `page.getByTestId()`: `data-testid`属性によって要素を探す。ロールやテキストの値が重要な場合は、`getByRole()`や`getByText()`の使用をするか判断必要。

`locator.filter()`メソッドでフィルターができる

```js
await page
    .getByRole('listitem')
    .filter({ hasText: /Product 2/ }) // filter by text
    .getByRole('button', { name: 'Add to cart' })
    .click();
```

リストの要素を検証する

```js
// リストの要素が3つあることを検証する
await expect(page.getByRole('listitem')).toHaveCount(3);

// リストの要素の値がapple, banana, orangeであることを検証する
await expect(page
    .getByRole('listitem'))
    .toHaveText(['apple', 'banana', 'orange']);
```

More: https://playwright.dev/docs/locators

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

- Test generator: https://playwright.dev/docs/codegen
  - 使い方のイメージがつくので動画みると良い
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

Playwrightは、ブラウザコンテキストと呼ばれる分離された環境でテストを実行する。認証が必要なサービスにおいて毎回のテストで認証を実行するのは面倒。そのため、既存の認証済みの状態をロードすることができる。これにｙり、テストで認証する必要があなくなり、テスト実行が高速化される。

認証状態を保持する`.auth`ディレクトリを作成し、`.gitignore`に追加しておく

```sh
mkdir -p playwright/.auth
echo "\nplaywright/.auth" >> .gitignore
```

すべてのテストでアカウントを共有する

```ts
// tests/auth.setup.ts
import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
    // 認証ステップ（自分自身の操作に置き換えてください）
    await page.goto('https://github.com/login');
    await page.getByLabel('Username or email address').fill('username');
    await page.getByLabel('Password').fill('password');
    await page.getByRole('button', { name: 'Sign in' }).click();

    // ページがcookieを受け取るまで待つ
    // ログインフローでは、複数回のリダイレクトが起きたりするた最終的なログイン後のURLになるまで待つ
    await page.waitForURL('https://github.com/');
    // 別の方法としてページを確認する方法もある
    // await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible();

    // 認証状態をファイルに保存する
    await page.context().storageState({ path: authFile });
})
```

プロジェクトの設定ファイルに追加する

```ts
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defaultConfig({
  projjects: [
    // Setup project
    { name: 'setup', testMatch: /.*\.setup\.ts/ },

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // 認証状態を事前に読み込む
        storageState: 'palywright/.auth/user.json',
      },
      dependencies: ['setup'],
    }

    // ...
  ]
})
```

テストを書く

```ts
import { test } from '@playwright/test';

test('test', async ({ page }) => {
  // page is authenticated
})
```

More: https://playwright.dev/docs/auth

### Othrs

- Browsers: https://playwright.dev/docs/browsers
- Chrome Extensions: https://playwright.dev/docs/chrome-extensions
- Mock APIs: https://playwright.dev/docs/mock
- Mock Browser APIs: https://playwright.dev/docs/mock-browser-apis
- Screenshots: https://playwright.dev/docs/screenshots
- Visual comparisions: https://playwright.dev/docs/test-snapshots
