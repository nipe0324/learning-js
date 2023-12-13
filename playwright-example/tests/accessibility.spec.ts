import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('homepage', () => {
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    const accessibilityReport = await new AxeBuilder({ page }).analyze();

    expect(accessibilityReport.violations.length).toEqual(2);
  });
});
