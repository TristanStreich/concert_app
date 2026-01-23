# Screenshot Scripts

This directory contains Puppeteer-based screenshot tools for frontend development.

## Quick Reference

### Basic Screenshot (Bottom Scroll)

```bash
node scripts/screenshot.js /tmp/output.png
```

Captures a screenshot scrolled to the bottom of the page.

### Advanced Screenshots

```bash
node scripts/screenshot-advanced.js [options]
```

#### Common Examples

**Scroll to bottom:**
```bash
node scripts/screenshot-advanced.js --scroll=bottom --output=/tmp/bottom.png
```

**Scroll to middle:**
```bash
node scripts/screenshot-advanced.js --scroll=middle --output=/tmp/middle.png
```

**Scroll to 75%:**
```bash
node scripts/screenshot-advanced.js --scroll=75% --output=/tmp/scroll-75.png
```

**Mobile viewport:**
```bash
node scripts/screenshot-advanced.js --width=375 --height=667 --output=/tmp/mobile.png
```

**Tablet viewport:**
```bash
node scripts/screenshot-advanced.js --width=768 --height=1024 --output=/tmp/tablet.png
```

**Hover over button:**
```bash
node scripts/screenshot-advanced.js --hover=.add-show-button --output=/tmp/hover.png
```

**Click element then capture:**
```bash
node scripts/screenshot-advanced.js --click=.add-show-button --output=/tmp/after-click.png
```

**Full page screenshot:**
```bash
node scripts/screenshot-advanced.js --fullpage --output=/tmp/fullpage.png
```

**Capture specific element only:**
```bash
node scripts/screenshot-advanced.js --element=.artist-list-wrapper --output=/tmp/element.png
```

**Wait longer for slow pages:**
```bash
node scripts/screenshot-advanced.js --wait=5000 --output=/tmp/slow-page.png
```

**Combine multiple options:**
```bash
node scripts/screenshot-advanced.js \
  --width=375 \
  --height=667 \
  --scroll=bottom \
  --wait=3000 \
  --output=/tmp/mobile-bottom.png
```

## Available Options

| Option | Values | Default | Description |
|--------|--------|---------|-------------|
| `--output` | PATH | `/tmp/screenshot.png` | Where to save screenshot |
| `--scroll` | `top`, `middle`, `bottom`, `50%`, pixels | `top` | Scroll position |
| `--width` | Number | `1920` | Viewport width |
| `--height` | Number | `1080` | Viewport height |
| `--click` | CSS selector | - | Click element before screenshot |
| `--hover` | CSS selector | - | Hover element before screenshot |
| `--wait` | Milliseconds | `2000` | Wait time after page load |
| `--fullpage` | Boolean flag | `false` | Capture entire scrollable page |
| `--element` | CSS selector | - | Capture only specific element |
| `--url` | URL | `http://localhost:2424` | Page to capture |

## Common Viewport Sizes

**Mobile:**
- iPhone SE: `--width=375 --height=667`
- iPhone 12/13: `--width=390 --height=844`
- iPhone 14 Pro Max: `--width=430 --height=932`

**Tablet:**
- iPad Mini: `--width=768 --height=1024`
- iPad Pro: `--width=1024 --height=1366`

**Desktop:**
- Standard HD: `--width=1920 --height=1080`
- MacBook Pro: `--width=1440 --height=900`

## Tips

1. **Wait times:** If page isn't fully rendered, increase `--wait` value
2. **Element selectors:** Use Chrome DevTools to find correct CSS selectors
3. **Output location:** Always use `/tmp/` for screenshots to avoid cluttering the repo
4. **Scroll positions:** Use percentages for responsive scroll positions
5. **Debugging:** Check console output for errors if screenshot fails

## Integration with Claude Code

These scripts are designed to work with Claude Code's visual feedback loop:

1. **frontend-dev skill** uses basic screenshot for quick captures
2. **puppeteer agent** uses advanced screenshot for complex scenarios
3. Both save to `/tmp/` and return paths for Claude to read and display

## Troubleshooting

**"Connection refused" error:**
- Server not running → Start with `npm run dev`

**Element not found:**
- Wrong selector → Check with DevTools
- Page not loaded → Increase `--wait` time

**Screenshot is blank:**
- React not rendered yet → Increase `--wait` to 3000-5000ms

**Hover/click not working:**
- Element hidden or outside viewport → Check element is visible
- Need to scroll first → Combine with `--scroll` option
