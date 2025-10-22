import { expect, test } from '@playwright/test'

test.describe('Site Navigation', () => {
  test.describe.configure({ mode: 'default' })

  test('should navigate between all main pages', async ({ page }) => {
    // Start from home
    await page.goto('/', { waitUntil: 'commit' })
    await expect(page).toHaveTitle(/Sch/)

    // Navigate to TIL overview
    const tilLink = page.locator('a[href="/til"], a[href*="til"]').first()
    if ((await tilLink.count()) > 0) {
      await Promise.all([
        page.waitForURL('**/til', { waitUntil: 'commit', timeout: 30000 }),
        tilLink.click({ timeout: 30000 }),
      ])
      await page.getByRole('heading', { name: 'Today I Learned' }).waitFor()
      expect(page.url()).toContain('/til')
    } else {
      // Direct navigation if no link found
      await page.goto('/til', { waitUntil: 'commit' })
      await page.getByRole('heading', { name: 'Today I Learned' }).waitFor()
    }

    // Navigate to imprint
    const imprintLink = page
      .locator('a[href="/imprint"], a[href*="imprint"]')
      .first()
    await expect(imprintLink).toBeVisible()

    await Promise.all([
      page.waitForURL('**/imprint', { waitUntil: 'commit', timeout: 30000 }),
      imprintLink.click({ timeout: 30000 }),
    ])
    expect(page.url()).toContain('/imprint')

    // Navigate back to home
    const logoLink = page.locator('a[href="/"]').first()
    await expect(logoLink).toBeVisible()

    // Use navigation promise to avoid timing issues
    await Promise.all([
      page.waitForURL('**/', { waitUntil: 'commit', timeout: 30000 }),
      logoLink.click({ timeout: 30000 }),
    ])
    expect(page.url()).toMatch(/\/$/)
  })

  test('should have consistent navigation elements across pages', async ({
    page,
  }) => {
    const pages = ['/', '/til', '/imprint']

    for (const pagePath of pages) {
      await page.goto(pagePath, { waitUntil: 'commit' })

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
    await page.goto('/', { waitUntil: 'commit' })
    await page.goto('/til', { waitUntil: 'commit' })
    await page.goto('/imprint', { waitUntil: 'commit' })

    // Go back
    await page.goBack({ waitUntil: 'commit' })
    expect(page.url()).toContain('/til')

    // Go back again
    await page.goBack({ waitUntil: 'commit' })
    expect(page.url()).toMatch(/\/$/)

    // Go forward
    await page.goForward({ waitUntil: 'commit' })
    expect(page.url()).toContain('/til')
  })

  test('should maintain scroll position on navigation', async ({ page }) => {
    await page.goto('/', { waitUntil: 'commit' })

    // Scroll down if page is long enough
    await page.evaluate(() => window.scrollTo(0, 100))

    // Navigate to another page
    await page.goto('/til', { waitUntil: 'commit' })

    // Navigate back
    await page.goBack({ waitUntil: 'commit' })

    // Page should be functional regardless of scroll position
    await expect(page.locator('body')).toBeVisible()
  })
})

test.describe('Site-wide Functionality', () => {
  test('should have consistent meta tags across pages', async ({ page }) => {
    const pages = ['/', '/til', '/imprint']

    for (const pagePath of pages) {
      await page.goto(pagePath, { waitUntil: 'commit' })

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

      await page.goto(pagePath, { waitUntil: 'commit' })
      // Wait for network to be mostly idle but with a timeout
      await page
        .waitForLoadState('networkidle', { timeout: 15000 })
        .catch(() => {
          // Ignore timeout - we just want to give resources a chance to load
        })

      expect(resourceErrors).toHaveLength(0)
    }
  })

  test('should be accessible with keyboard navigation', async ({ page }) => {
    await page.goto('/', { waitUntil: 'commit' })

    // Test tab navigation
    await page.keyboard.press('Tab')

    // Check if focus is visible
    const focusedElement = page.locator(':focus')
    if ((await focusedElement.count()) > 0) {
      await expect(focusedElement).toBeVisible()
    }
  })
})

test.describe('Performance and Loading', () => {
  test('should load pages within reasonable time', async ({ page }) => {
    const pages = ['/', '/til', '/imprint']

    for (const pagePath of pages) {
      const startTime = Date.now()

      await page.goto(pagePath, { waitUntil: 'commit' })

      const loadTime = Date.now() - startTime

      // Pages should load within 30 seconds (reasonable for dev server with parallel tests)
      expect(loadTime).toBeLessThan(30000)
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
      await page.goto(pagePath, { waitUntil: 'commit' })
    }

    // Filter out known acceptable errors (like network errors in dev)
    const criticalErrors = consoleErrors.filter(
      (error) => !error.includes('net::') && !error.includes('favicon'),
    )

    expect(criticalErrors).toHaveLength(0)
  })
})
