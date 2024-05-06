import { test, expect } from '@playwright/test';

// 全てのテストの前に実行される処理
// https://demo.playwright.dev/todomvc にアクセスする
test.beforeEach(async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
});

test.describe('New Todo', () => {
  test('should add todo items', async ({ page }) => {
    // プレースホルダーでインプット要素を探す
    const newTodoInput = page.getByPlaceholder('What needs to be done?');

    // テキスト入力
    await newTodoInput.fill('寝る前に歯を磨く');

    // Enterキーを押す
    await newTodoInput.press('Enter');

    // 入力したTODOのテキストが表示されているか確認
    await expect(page.getByTestId('todo-title')).toHaveText([
      '寝る前に歯を磨く',
    ]);
  });
});
