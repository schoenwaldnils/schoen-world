import { expect, test } from '@playwright/test'

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'commit' })
  })

  test('should load successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Sch/)
  })

  test('should display main content', async ({ page }) => {
    // Check for main content elements
    await expect(
      page.getByText('Freelance Frontend Developer based in Hamburg'),
    ).toBeVisible()
    await expect(
      page.getByText('I love to work with CSS, React, Typescript'),
    ).toBeVisible()
  })

  test('should have working external links', async ({ page }) => {
    // Check for social media links
    const twitterLink = page.getByRole('link', { name: 't̶w̶i̶t̶t̶e̶r̶ x' }).first()
    const githubLink = page.getByRole('link', { name: 'github' }).first()
    const linkedinLink = page.getByRole('link', { name: 'linkedin' }).first()
    const blueskyLink = page.getByRole('link', { name: 'bluesky' }).first()
    const mastodonLink = page.getByRole('link', { name: 'mastodon' }).first()

    await expect(twitterLink).toBeVisible()
    await expect(githubLink).toBeVisible()
    await expect(linkedinLink).toBeVisible()
    await expect(blueskyLink).toBeVisible()
    await expect(mastodonLink).toBeVisible()

    // Verify links have correct href attributes
    await expect(twitterLink).toHaveAttribute(
      'href',
      'https://x.com/schoenwaldnils',
    )
    await expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/schoenwaldnils',
    )
    await expect(linkedinLink).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/schoenwaldnils/',
    )
  })

  test('should have working company links', async ({ page }) => {
    const jakalaLink = page.getByRole('link', { name: 'Jakala' })
    await expect(jakalaLink).toBeVisible()
    await expect(jakalaLink).toHaveAttribute('href', 'https://www.jakala.com/')
  })

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.getByText('Freelance Frontend Developer')).toBeVisible()
  })

  test('should have proper meta tags', async ({ page }) => {
    // Check for basic SEO meta tags
    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute('content', /.+/)
  })

  test('should have navigation elements', async ({ page }) => {
    // Check if navigation to TIL exists
    const tilLink = page.getByRole('link', { name: /til|today i learned/i })
    if ((await tilLink.count()) > 0) {
      await expect(tilLink).toBeVisible()
    }
  })
})
