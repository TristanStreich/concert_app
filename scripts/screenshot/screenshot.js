// Simple screenshot script for capturing scrolled pages
const puppeteer = require('puppeteer');

async function captureScrolledScreenshot() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  // Navigate to the page
  await page.goto('http://localhost:2424', { waitUntil: 'networkidle0' });

  // Wait a bit for React to render
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Scroll to bottom
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  // Wait a moment for scroll to complete
  await new Promise(resolve => setTimeout(resolve, 500));

  // Take screenshot
  await page.screenshot({ path: process.argv[2] || '/tmp/scrolled-screenshot.png' });

  await browser.close();
  console.log('Screenshot saved');
}

captureScrolledScreenshot().catch(console.error);
