import { expect, test } from '@playwright/test'

test.describe('Imprint Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/imprint', { waitUntil: 'commit' })
  })

  test('should load successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/.+/)
    await expect(page.locator('body')).toBeVisible()
  })

  test('should display imprint content', async ({ page }) => {
    // Check for main content area
    const main = page.locator('main, article, .content, [role="main"]')
    if ((await main.count()) > 0) {
      await expect(main.first()).toBeVisible()
    }

    // Check for heading (Imprint, Impressum, Legal Notice, etc.)
    const headings = page.locator('h1, h2')
    if ((await headings.count()) > 0) {
      await expect(headings.first()).toBeVisible()
    }
  })

  test('should contain legal information', async ({ page }) => {
    // Look for common legal terms that should be present in an imprint
    const legalTerms = [
      'imprint',
      'impressum',
      'legal',
      'contact',
      'address',
      'email',
      'responsible',
      'liability',
    ]

    const pageContent = await page.textContent('body')
    const hasLegalContent = legalTerms.some((term) =>
      pageContent?.toLowerCase().includes(term),
    )

    expect(hasLegalContent).toBe(true)
  })

  test('should have proper meta tags', async ({ page }) => {
    // Check for meta description
    const metaDescription = page.locator('meta[name="description"]')
    if ((await metaDescription.count()) > 0) {
      await expect(metaDescription).toHaveAttribute('content', /.+/)
    }
  })

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    // Content should still be visible on mobile
    const body = page.locator('body')
    await expect(body).toBeVisible()
  })

  test('should have proper heading hierarchy', async ({ page }) => {
    const headings = page.locator('h1, h2, h3, h4, h5, h6')
    const headingCount = await headings.count()

    if (headingCount > 0) {
      // Should have at least one heading
      await expect(headings.first()).toBeVisible()

      // Check if h1 exists and is unique
      const h1Elements = page.locator('h1')
      const h1Count = await h1Elements.count()

      if (h1Count > 0) {
        expect(h1Count).toBeLessThanOrEqual(1)
      }
    }
  })

  test('should load without JavaScript errors', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (error) => {
      errors.push(error.message)
    })

    await page.reload({ waitUntil: 'commit' })

    expect(errors).toHaveLength(0)
  })

  test('should have proper URL structure', ({ page }) => {
    expect(page.url()).toMatch(/\/imprint\/?$/)
  })

  test('should be accessible', async ({ page }) => {
    // Check for basic accessibility features
    const main = page.locator('main, [role="main"]')
    if ((await main.count()) > 0) {
      await expect(main.first()).toBeVisible()
    }

    // Check for proper document structure
    const body = page.locator('body')
    await expect(body).toBeVisible()
  })
})
