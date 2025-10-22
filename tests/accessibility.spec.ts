import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test.describe('Accessibility Tests', () => {
  // Array of URLs to test for accessibility
  const urlsToTest = ['/', '/til', '/imprint']

  // Consolidated WCAG compliance tests - run all checks on one page load
  test.describe('WCAG Compliance', () => {
    urlsToTest.forEach((url) => {
      test(`should meet WCAG 2.1 AA standards on ${url}`, async ({ page }) => {
        await page.goto(url)
        await page.waitForLoadState('domcontentloaded')

        // Run comprehensive accessibility scan with all WCAG AA rules
        const accessibilityScanResults = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'best-practice'])
          .analyze()

        expect(accessibilityScanResults.violations).toEqual([])
      })
    })
  })

  test.describe('Keyboard Navigation', () => {
    test('should be navigable with keyboard on homepage', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('domcontentloaded')

      // Test tab navigation
      await page.keyboard.press('Tab')

      // Get the first focusable element that's not a Next.js dev tool
      const focusedElement = page.locator(
        ':focus:not([data-nextjs-dev-tools-button])',
      )

      if ((await focusedElement.count()) > 0) {
        await expect(focusedElement.first()).toBeVisible()

        // Ensure focused element has proper accessibility attributes
        const accessibilityScanResults = await new AxeBuilder({ page })
          .include(':focus')
          .exclude('[data-nextjs-dev-tools-button]')
          .exclude('nextjs-portal')
          .withTags(['wcag2a'])
          .analyze()

        expect(accessibilityScanResults.violations).toEqual([])
      }
    })
  })
})
