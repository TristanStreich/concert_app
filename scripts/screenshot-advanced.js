#!/usr/bin/env node
/**
 * Advanced Puppeteer Screenshot Tool
 *
 * Usage:
 *   node scripts/screenshot-advanced.js [options]
 *
 * Options:
 *   --output=PATH          Output file path (default: /tmp/screenshot.png)
 *   --scroll=POSITION      Scroll position: top|middle|bottom|50% (default: top)
 *   --width=N              Viewport width (default: 1920)
 *   --height=N             Viewport height (default: 1080)
 *   --click=SELECTOR       Click element before screenshot
 *   --hover=SELECTOR       Hover over element before screenshot
 *   --wait=MS              Additional wait time in ms (default: 2000)
 *   --fullpage             Capture full scrollable page
 *   --element=SELECTOR     Capture only specific element
 *
 * Examples:
 *   # Scroll to bottom
 *   node scripts/screenshot-advanced.js --scroll=bottom --output=/tmp/bottom.png
 *
 *   # Mobile viewport
 *   node scripts/screenshot-advanced.js --width=375 --height=667 --output=/tmp/mobile.png
 *
 *   # Hover state
 *   node scripts/screenshot-advanced.js --hover=.add-show-button --output=/tmp/hover.png
 *
 *   # Full page
 *   node scripts/screenshot-advanced.js --fullpage --output=/tmp/fullpage.png
 */

const puppeteer = require('puppeteer');

// Parse command line arguments
const args = process.argv.slice(2).reduce((acc, arg) => {
  const [key, value] = arg.split('=');
  acc[key.replace('--', '')] = value || true;
  return acc;
}, {});

const config = {
  output: args.output || '/tmp/screenshot.png',
  scroll: args.scroll || 'top',
  width: parseInt(args.width) || 1920,
  height: parseInt(args.height) || 1080,
  click: args.click,
  hover: args.hover,
  wait: parseInt(args.wait) || 2000,
  fullpage: args.fullpage || false,
  element: args.element,
  url: args.url || 'http://localhost:2424'
};

async function captureScreenshot() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: config.width, height: config.height });

  console.log(`Navigating to ${config.url}...`);
  await page.goto(config.url, { waitUntil: 'networkidle0' });

  // Wait for React to render
  console.log(`Waiting ${config.wait}ms for page to render...`);
  await new Promise(resolve => setTimeout(resolve, config.wait));

  // Handle scrolling
  if (config.scroll !== 'top') {
    console.log(`Scrolling to: ${config.scroll}`);
    await page.evaluate((scrollPos) => {
      let scrollTo = 0;

      if (scrollPos === 'bottom') {
        scrollTo = document.body.scrollHeight;
      } else if (scrollPos === 'middle') {
        scrollTo = document.body.scrollHeight * 0.5;
      } else if (scrollPos.endsWith('%')) {
        const percent = parseInt(scrollPos) / 100;
        scrollTo = document.body.scrollHeight * percent;
      } else if (!isNaN(scrollPos)) {
        scrollTo = parseInt(scrollPos);
      }

      window.scrollTo(0, scrollTo);
    }, config.scroll);

    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Handle interactions
  if (config.click) {
    console.log(`Clicking: ${config.click}`);
    await page.click(config.click);
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  if (config.hover) {
    console.log(`Hovering: ${config.hover}`);
    await page.hover(config.hover);
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  // Take screenshot
  const screenshotOptions = {
    path: config.output
  };

  if (config.fullpage) {
    console.log('Capturing full page screenshot...');
    screenshotOptions.fullPage = true;
  } else if (config.element) {
    console.log(`Capturing element: ${config.element}`);
    const element = await page.$(config.element);
    if (!element) {
      throw new Error(`Element not found: ${config.element}`);
    }
    await element.screenshot({ path: config.output });
    await browser.close();
    console.log(`Screenshot saved to ${config.output}`);
    return;
  }

  await page.screenshot(screenshotOptions);

  await browser.close();
  console.log(`Screenshot saved to ${config.output}`);
}

captureScreenshot().catch(error => {
  console.error('Error capturing screenshot:', error.message);
  process.exit(1);
});
