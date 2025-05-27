# Playwright E2E Tests

This directory contains end-to-end tests for the Schoen.World website using Playwright.

## Test Structure

### Test Files

- **`home.spec.ts`** - Tests for the home page (`/`)

  - Content verification
  - External links functionality
  - Responsive design
  - Meta tags validation

- **`til-overview.spec.ts`** - Tests for the TIL overview page (`/til`)

  - Page heading and metadata
  - TIL posts display
  - Navigation to individual posts
  - Responsive design

- **`til-post.spec.ts`** - Tests for individual TIL posts (`/til/[slug]`)

  - Content loading and display
  - Meta tags and SEO
  - Navigation functionality
  - Error handling for non-existent posts

- **`imprint.spec.ts`** - Tests for the imprint page (`/imprint`)

  - Legal content verification
  - Accessibility compliance
  - Proper heading hierarchy
  - Meta tags validation

- **`navigation.spec.ts`** - Cross-page navigation and site-wide functionality
  - Navigation between pages
  - Browser back/forward functionality
  - Consistent navigation elements
  - Performance and loading tests
  - Console error detection

## Running Tests

### Prerequisites

Make sure your development server is running:

```bash
npm run dev
```

The tests are configured to automatically start the dev server, but you can also run it manually.

### Test Commands

```bash
# Run all tests
npm run test:e2e

# Run tests with UI mode (interactive)
npm run test:e2e:ui

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Debug tests step by step
npm run test:e2e:debug

# Show test report
npm run test:e2e:report
```

### Running Specific Tests

```bash
# Run only home page tests
npx playwright test home.spec.ts

# Run only TIL tests
npx playwright test til-*.spec.ts

# Run tests matching a pattern
npx playwright test --grep "should load successfully"
```

## Test Configuration

The tests are configured in `playwright.config.ts` with the following settings:

- **Base URL**: `https://localhost:3002` (matches your dev server)
- **Browsers**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **HTTPS**: Configured to ignore self-signed certificate errors
- **Parallel execution**: Enabled for faster test runs
- **Retries**: 2 retries on CI, 0 locally

## Test Features

### Responsive Testing

Tests run on both desktop and mobile viewports to ensure responsive design works correctly.

### Cross-browser Testing

Tests run on multiple browsers to catch browser-specific issues.

### Error Detection

Tests monitor for:

- JavaScript console errors
- Network request failures
- Page load errors
- Accessibility issues

### Performance Monitoring

Tests verify:

- Page load times
- Resource loading
- Network failure handling

## Writing New Tests

When adding new tests:

1. Follow the existing naming convention: `[page-name].spec.ts`
2. Use descriptive test names that explain what is being tested
3. Include proper error handling and conditional checks
4. Test both positive and negative scenarios
5. Ensure tests are responsive and cross-browser compatible

### Example Test Structure

```typescript
import { test, expect } from '@playwright/test'

test.describe('Page Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/page-path')
  })

  test('should load successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Expected Title/)
    await expect(page.locator('body')).toBeVisible()
  })

  // More tests...
})
```

## Troubleshooting

### Common Issues

1. **HTTPS Certificate Errors**: The config includes `ignoreHTTPSErrors: true` to handle self-signed certificates.

2. **Port Conflicts**: Make sure port 3002 is available or update the config.

3. **Slow Tests**: Use `page.waitForLoadState('networkidle')` to ensure content is fully loaded.

4. **Flaky Tests**: Add proper waits and use conditional checks for optional elements.

### Debug Mode

Use debug mode to step through tests:

```bash
npm run test:e2e:debug
```

This opens the Playwright Inspector where you can:

- Step through test actions
- Inspect page elements
- View network requests
- See console logs

## CI/CD Integration

The tests are configured for CI environments with:

- Increased retries (2 on CI)
- Single worker process
- HTML reporter for test results

To run in CI mode:

```bash
CI=true npx playwright test
```
