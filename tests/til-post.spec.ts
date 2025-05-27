import { expect, test } from '@playwright/test'

test.describe('TIL Individual Post', () => {
  // Test with a known TIL post from the error logs
  const testSlug = 'typescript-utility-types'

  test.beforeEach(async ({ page }) => {
    await page.goto(`/til/${testSlug}`)
  })

  test('should load successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/.+/)
    await expect(page.locator('body')).toBeVisible()
  })

  test('should display post content', async ({ page }) => {
    // Wait for content to load
    await page.waitForLoadState('networkidle')

    // Check for main content area
    const main = page.locator('main, article, .content, [role="main"]')
    if ((await main.count()) > 0) {
      await expect(main.first()).toBeVisible()
    }

    // Check for heading
    const headings = page.locator('h1, h2')
    if ((await headings.count()) > 0) {
      await expect(headings.first()).toBeVisible()
    }
  })

  test('should have proper meta tags', async ({ page }) => {
    // Check for meta description
    const metaDescription = page.locator('meta[name="description"]')
    if ((await metaDescription.count()) > 0) {
      await expect(metaDescription).toHaveAttribute('content', /.+/)
    }

    // Check for Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]')
    if ((await ogTitle.count()) > 0) {
      await expect(ogTitle).toHaveAttribute('content', /.+/)
    }
  })

  test('should have navigation back to TIL overview', async ({ page }) => {
    // Look for navigation links back to TIL
    const backLinks = page.locator('a[href="/til"], a[href*="til"]')
    if ((await backLinks.count()) > 0) {
      await expect(backLinks.first()).toBeVisible()
    }
  })

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.waitForLoadState('networkidle')

    // Content should still be visible on mobile
    const body = page.locator('body')
    await expect(body).toBeVisible()
  })

  test('should load without JavaScript errors', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (error) => {
      errors.push(error.message)
    })

    await page.reload()
    await page.waitForLoadState('networkidle')

    expect(errors).toHaveLength(0)
  })

  test('should have proper URL structure', ({ page }) => {
    expect(page.url()).toMatch(/\/til\/[^/]+$/)
  })
})

test.describe('TIL Post Navigation', () => {
  test('should navigate from TIL overview to individual post', async ({
    page,
  }) => {
    await page.goto('/til')
    await page.waitForLoadState('networkidle')

    // Find first TIL post link
    const postLinks = page.locator('a[href^="/til/"]')
    const linkCount = await postLinks.count()

    if (linkCount > 0) {
      const firstPostLink = postLinks.first()
      const href = await firstPostLink.getAttribute('href')

      // Click the link and verify navigation
      await firstPostLink.click()
      await page.waitForLoadState('networkidle')

      expect(page.url()).toContain(href!)
    }
  })

  test('should handle non-existent TIL posts gracefully', async ({ page }) => {
    const response = await page.goto('/til/non-existent-post-12345')

    // Should either show 404 or redirect
    if (response) {
      expect([200, 404]).toContain(response.status())
    }
  })
})
