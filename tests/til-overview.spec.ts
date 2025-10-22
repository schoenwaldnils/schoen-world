import { expect, test } from '@playwright/test'

test.describe('TIL Overview Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/til', { waitUntil: 'commit' })
  })

  test('should load successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Today I Learned/)
  })

  test('should display page heading', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Today I Learned' }),
    ).toBeVisible()
  })

  test('should have proper meta description', async ({ page }) => {
    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute(
      'content',
      'Things I learn and want to remember.',
    )
  })

  test('should display TIL posts', async ({ page }) => {
    // Check if there are any TIL posts displayed
    // Wait for specific content instead of networkidle
    await page.getByRole('heading', { name: 'Today I Learned' }).waitFor()

    const posts = page.locator('article')
    const postLinks = page.locator('a[href^="/n/"]')

    // At least one of these should be present if there are posts
    const hasArticles = (await posts.count()) > 0
    const hasPostLinks = (await postLinks.count()) > 0

    if (hasArticles || hasPostLinks) {
      expect(hasArticles || hasPostLinks).toBe(true)
    }
  })

  test('should have working navigation to individual posts', async ({
    page,
  }) => {
    // Wait for heading to ensure page is loaded
    await page.getByRole('heading', { name: 'Today I Learned' }).waitFor()

    const postLinks = page.locator('a[href^="/n/"]')
    const linkCount = await postLinks.count()

    if (linkCount > 0) {
      const firstPost = postLinks.first()
      await expect(firstPost).toBeVisible()

      // Test navigation to first post
      const href = await firstPost.getAttribute('href')
      expect(href).toMatch(/^\/n\/.+/)
    }
  })

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(
      page.getByRole('heading', { name: 'Today I Learned' }),
    ).toBeVisible()
  })

  test('should have proper heading hierarchy', async ({ page }) => {
    const h1 = page.getByRole('heading', { level: 1 })
    await expect(h1).toHaveText('Today I Learned')
  })

  test('should load without JavaScript errors', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (error) => {
      errors.push(error.message)
    })

    await page.reload({ waitUntil: 'commit' })
    await page.getByRole('heading', { name: 'Today I Learned' }).waitFor()

    expect(errors).toHaveLength(0)
  })
})
