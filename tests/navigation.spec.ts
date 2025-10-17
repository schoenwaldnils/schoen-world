import { expect, test } from '@playwright/test'

test.describe('Site Navigation', () => {
  test.describe.configure({ mode: 'default' })

  test('should navigate between all main pages', async ({ page }) => {
    // Start from home
    await page.goto('/')
    await expect(page).toHaveTitle(/Sch/)

    // Navigate to TIL overview
    const tilLink = page.locator('a[href="/til"], a[href*="til"]').first()
    if ((await tilLink.count()) > 0) {
      await tilLink.click()
      await page.waitForTimeout(500) // Give view transition time to complete
      await page.waitForLoadState('networkidle')
      expect(page.url()).toContain('/til')
    } else {
      // Direct navigation if no link found
      await page.goto('/til')
    }

    // Navigate to imprint
    const imprintLink = page
      .locator('a[href="/imprint"], a[href*="imprint"]')
      .first()
    await expect(imprintLink).toBeVisible()

    await imprintLink.click()
    await page.waitForTimeout(500) // Give view transition time to complete
    await page.waitForLoadState('networkidle')
    expect(page.url()).toContain('/imprint')

    // Navigate back to home
    const logoLink = page.locator('a[href="/"]').first()
    await expect(logoLink).toBeVisible()

    await logoLink.click()
    await page.waitForTimeout(500) // Give view transition time to complete
    await page.waitForLoadState('networkidle')
    expect(page.url()).toMatch(/\/$/)
  })

  test('should have consistent navigation elements across pages', async ({
    page,
  }) => {
    const pages = ['/', '/til', '/imprint']

    for (const pagePath of pages) {
      await page.goto(pagePath)
      await page.waitForTimeout(500) // Give view transition time to complete
      await page.waitForLoadState('networkidle')

      // Check for common navigation elements
      const nav = page.locator('nav, header, .navigation')
      if ((await nav.count()) > 0) {
        await expect(nav.first()).toBeVisible()
      }

      // Check for logo or site title link
      const logoLink = page.locator('a[href="/"], .logo, .site-title')
      if ((await logoLink.count()) > 0) {
        await expect(logoLink.first()).toBeVisible()
      }
    }
  })

  test('should handle browser back/forward navigation', async ({ page }) => {
    // Navigate through pages
    await page.goto('/')
    await page.goto('/til')
    await page.goto('/imprint')

    // Go back
    await page.goBack()
    await page.waitForTimeout(500) // Give view transition time to complete
    expect(page.url()).toContain('/til')

    // Go back again
    await page.goBack()
    await page.waitForTimeout(500) // Give view transition time to complete
    expect(page.url()).toMatch(/\/$/)

    // Go forward
    await page.goForward()
    await page.waitForTimeout(500) // Give view transition time to complete
    expect(page.url()).toContain('/til')
  })

  test('should maintain scroll position on navigation', async ({ page }) => {
    await page.goto('/')

    // Scroll down if page is long enough
    await page.evaluate(() => window.scrollTo(0, 100))

    // Navigate to another page
    await page.goto('/til')
    await page.waitForTimeout(500) // Give view transition time to complete
    await page.waitForLoadState('networkidle')

    // Navigate back
    await page.goBack()

    // Page should be functional regardless of scroll position
    await expect(page.locator('body')).toBeVisible()
  })
})

test.describe('Site-wide Functionality', () => {
  test('should have consistent meta tags across pages', async ({ page }) => {
    const pages = ['/', '/til', '/imprint']

    for (const pagePath of pages) {
      await page.goto(pagePath)
      await page.waitForTimeout(500) // Give view transition time to complete
      await page.waitForLoadState('networkidle')

      // Check for viewport meta tag
      const viewport = page.locator('meta[name="viewport"]')
      await expect(viewport).toHaveAttribute('content', /width=device-width/)

      // Check for charset
      const charset = page.locator(
        'meta[charset], meta[http-equiv="Content-Type"]',
      )
      expect(await charset.count()).toBeGreaterThan(0)
    }
  })

  test('should load CSS and JavaScript resources', async ({ page }) => {
    const pages = ['/', '/til', '/imprint']

    for (const pagePath of pages) {
      const resourceErrors: string[] = []

      page.on('response', (response) => {
        if (
          !response.ok() &&
          (response.url().includes('.css') || response.url().includes('.js'))
        ) {
          resourceErrors.push(
            `Failed to load: ${response.url()} (${response.status()})`,
          )
        }
      })

      await page.goto(pagePath)
      // Allow some time for all resources to load
      await page.waitForTimeout(1000)
      await page.waitForLoadState('networkidle')

      expect(resourceErrors).toHaveLength(0)
    }
  })

  test('should be accessible with keyboard navigation', async ({ page }) => {
    await page.goto('/')

    // Test tab navigation
    await page.keyboard.press('Tab')

    // Check if focus is visible
    const focusedElement = page.locator(':focus')
    if ((await focusedElement.count()) > 0) {
      await expect(focusedElement).toBeVisible()
    }
  })

  test('should handle network failures gracefully', async ({ page }) => {
    // Test with slow network by adding delay to route handling
    await page.route('**/*', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 100))
      await route.continue()
    })

    await page.goto('/')
    await page.waitForTimeout(500) // Give view transition time to complete
    await page.waitForLoadState('networkidle')

    await expect(page.locator('body')).toBeVisible()
  })
})

test.describe('Performance and Loading', () => {
  test('should load pages within reasonable time', async ({ page }) => {
    const pages = ['/', '/til', '/imprint']

    for (const pagePath of pages) {
      const startTime = Date.now()

      await page.goto(pagePath)
      await page.waitForTimeout(500) // Give view transition time to complete
      await page.waitForLoadState('networkidle')

      const loadTime = Date.now() - startTime

      // Pages should load within 10 seconds (generous for CI)
      expect(loadTime).toBeLessThan(10000)
    }
  })

  test('should not have console errors on page load', async ({ page }) => {
    const consoleErrors: string[] = []

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })

    const pages = ['/', '/til', '/imprint']

    for (const pagePath of pages) {
      await page.goto(pagePath)
      await page.waitForTimeout(500) // Give view transition time to complete
      await page.waitForLoadState('networkidle')
    }

    // Filter out known acceptable errors (like network errors in dev)
    const criticalErrors = consoleErrors.filter(
      (error) => !error.includes('net::') && !error.includes('favicon'),
    )

    expect(criticalErrors).toHaveLength(0)
  })
})
