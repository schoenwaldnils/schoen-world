import type { MetadataRoute } from 'next'

import { getAllContent } from './utils/content'

export default function sitemap(): MetadataRoute.Sitemap {
  // Get all content items
  const allContent = getAllContent()

  // Map all content to sitemap entries with dynamic URLs
  const entries: MetadataRoute.Sitemap = allContent.map((item) => {
    // Use modifiedAt from frontmatter, fallback to updatedAt, then publishedAt
    const lastModified =
      (item.metadata as { modifiedAt?: string }).modifiedAt ||
      item.metadata.updatedAt ||
      item.metadata.publishedAt

    // Build URL from path: ['n', 'hello-world'] -> /n/hello-world
    // Handle special case: ['home'] -> / (root)
    const urlPath =
      item.path.length === 1 && item.path[0] === 'home'
        ? ''
        : `/${item.path.join('/')}`

    return {
      url: `https://schoen.world${urlPath}`,
      lastModified: lastModified
        ? new Date(lastModified).toISOString()
        : undefined,
    }
  })

  return entries
}
