import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './fail-demo',
  outputDir: 'docs/artifacts-failed',
  reporter: [['html', { outputFolder: 'docs/playwright-report-failed', open: 'never' }]],
  use: { trace: 'on', video: 'on', screenshot: 'on' },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
});
