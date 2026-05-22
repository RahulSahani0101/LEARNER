const { chromium } = require('playwright');

const baseUrl = 'http://localhost:5173';

async function login(page, email, password) {
  await page.goto(`${baseUrl}/login`, { waitUntil: 'networkidle' });
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(password);
  await page.locator('button', { hasText: 'Sign In' }).click();
  await page.waitForURL(/\/dashboard/);
}

async function assertRoute(page, route, headingText) {
  await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' });
  await page.getByRole('heading', { name: headingText }).first().waitFor({ timeout: 10000 });
}

(async () => {
  const browser = await chromium.launch({ headless: true });

  const learnerContext = await browser.newContext();
  const learnerPage = await learnerContext.newPage();
  await login(learnerPage, 'demo@javadevmastery.com', 'Password@123');

  const learnerChecks = [
    ['/dashboard', 'Code Today, Build Tomorrow.'],
    ['/courses', 'Courses'],
    ['/dsa', 'DSA Tracker'],
    ['/interview-prep', 'Interview Prep'],
    ['/ai-mentor', 'AI Mentor'],
    ['/roadmap', 'Learning Roadmap'],
    ['/leaderboard', 'Leaderboard'],
    ['/projects', 'Projects'],
    ['/resume-builder', 'Resume Builder'],
    ['/community', 'Community'],
    ['/settings', 'Settings'],
  ];

  for (const [route, heading] of learnerChecks) {
    await assertRoute(learnerPage, route, heading);
  }

  await learnerContext.close();

  const adminContext = await browser.newContext();
  const adminPage = await adminContext.newPage();
  await login(adminPage, 'admin@javadevmastery.com', 'Password@123');
  await assertRoute(adminPage, '/admin', 'Admin Overview');

  await adminContext.close();
  await browser.close();

  process.stdout.write('UI_SMOKE_PASS');
})().catch(async (error) => {
  console.error(error);
  process.exit(1);
});
