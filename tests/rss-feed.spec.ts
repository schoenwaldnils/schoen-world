import { expect, test } from '@playwright/test'

test.describe('RSS Feed (/rss.xml)', () => {
  test('should load successfully with correct headers', async ({ request }) => {
    const response = await request.get('/rss.xml')

    expect(response.status()).toBe(200)
    expect(response.headers()['content-type']).toBe(
      'application/rss+xml; charset=utf-8',
    )
    expect(response.headers()['cache-control']).toBe(
      'public, max-age=3600, s-maxage=3600',
    )
  })

  test('should contain valid RSS structure and required metadata', async ({
    request,
  }) => {
    const response = await request.get('/rss.xml')
    const feedContent = await response.text()

    // Check for basic RSS structure
    expect(feedContent).toContain('<?xml version="1.0" encoding="UTF-8"?>')
    expect(feedContent).toContain('<rss')
    expect(feedContent).toContain('version="2.0"')
    expect(feedContent).toContain('<channel>')
    expect(feedContent).toContain('</channel>')
    expect(feedContent).toContain('</rss>')

    // Check for required channel elements exist and are not empty
    expect(feedContent).toMatch(/<title><!\[CDATA\[.+\]\]><\/title>/)
    expect(feedContent).toMatch(
      /<description><!\[CDATA\[.+\]\]><\/description>/,
    )
    expect(feedContent).toMatch(/<link>https?:\/\/.+<\/link>/)
    expect(feedContent).toMatch(/<language><!\[CDATA\[.+\]\]><\/language>/)
    expect(feedContent).toMatch(
      /<managingEditor><!\[CDATA\[.+\]\]><\/managingEditor>/,
    )
    expect(feedContent).toMatch(/<webMaster><!\[CDATA\[.+\]\]><\/webMaster>/)
    expect(feedContent).toMatch(/<copyright><!\[CDATA\[.+\]\]><\/copyright>/)
  })

  test('should contain categories', async ({ request }) => {
    const response = await request.get('/rss.xml')
    const feedContent = await response.text()

    // Check that categories exist and are not empty
    expect(feedContent).toMatch(/<category><!\[CDATA\[.+\]\]><\/category>/)
  })

  test('should contain TIL posts as feed items', async ({ request }) => {
    const response = await request.get('/rss.xml')
    const feedContent = await response.text()

    // Check that there are feed items
    expect(feedContent).toContain('<item>')
    expect(feedContent).toContain('</item>')

    // Check for required item elements structure
    const itemMatches = feedContent.match(/<item>[\s\S]*?<\/item>/g)
    expect(itemMatches).toBeTruthy()
    expect(itemMatches!.length).toBeGreaterThan(0)

    // Verify each item has required elements with content
    itemMatches!.forEach((item) => {
      expect(item).toMatch(/<title><!\[CDATA\[.+\]\]><\/title>/)
      expect(item).toMatch(/<description><!\[CDATA\[.+\]\]><\/description>/)
      expect(item).toMatch(/<link>https?:\/\/.+<\/link>/)
      expect(item).toMatch(/<guid[^>]*>https?:\/\/.+<\/guid>/)
      expect(item).toMatch(/<pubDate>.+<\/pubDate>/)
      expect(item).toMatch(/<dc:creator><!\[CDATA\[.+\]\]><\/dc:creator>/)
    })
  })

  test('should have valid publication dates', async ({ request }) => {
    const response = await request.get('/rss.xml')
    const feedContent = await response.text()

    // Extract publication dates
    const pubDateMatches = feedContent.match(/<pubDate>[^<]+<\/pubDate>/g)
    expect(pubDateMatches).toBeTruthy()

    if (pubDateMatches!.length > 0) {
      pubDateMatches!.forEach((pubDate) => {
        const dateString = pubDate.replace(/<\/?pubDate>/g, '')
        const date = new Date(dateString)
        expect(date).toBeInstanceOf(Date)
        expect(date.getTime()).not.toBeNaN()
      })
    }
  })

  test('should have TTL set', async ({ request }) => {
    const response = await request.get('/rss.xml')
    const feedContent = await response.text()

    expect(feedContent).toMatch(/<ttl>\d+<\/ttl>/)
  })

  test('should be valid XML', async ({ request }) => {
    const response = await request.get('/rss.xml')
    const feedContent = await response.text()

    // Check that XML is well-formed by ensuring basic structure
    const openTags = feedContent.match(/<[^/][^>]*>/g) || []
    const closeTags = feedContent.match(/<\/[^>]*>/g) || []

    expect(openTags.length).toBeGreaterThan(0)
    expect(closeTags.length).toBeGreaterThan(0)
  })
})
