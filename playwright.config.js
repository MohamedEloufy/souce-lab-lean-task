// playwright.config.js
module.exports = {
  timeout: 30000,
  retries: 0,
  testDir: './tests',
  use: {
    headless: false, 
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    baseURL: 'https://www.saucedemo.com',
    viewport: null,
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
  ],
  reporter: [
  ['list'],
  ['html', { outputFolder: 'playwright-report', open: 'never' }]
],
  
};
