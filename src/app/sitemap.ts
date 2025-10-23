import type { MetadataRoute } from 'next'

import { getAllPages, getNotes } from './utils/content'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all notes and pages
  const [notes, pages] = await Promise.all([getNotes(), getAllPages()])

  // Map notes to sitemap entries (notes have /n/ prefix)
  const notesEntries: MetadataRoute.Sitemap = notes.map((note) => {
    // Use modifiedAt from frontmatter, fallback to updatedAt, then publishedAt
    const lastModified =
      (note.metadata as { modifiedAt?: string }).modifiedAt ||
      note.metadata.updatedAt ||
      note.metadata.publishedAt

    return {
      url: `https://schoen.world/n/${note.slug}`,
      lastModified: new Date(lastModified).toISOString(),
    }
  })

  // Map pages to sitemap entries (pages at root level)
  const pagesEntries: MetadataRoute.Sitemap = pages.map((page) => {
    // Use modifiedAt from frontmatter, fallback to updatedAt, then publishedAt
    const lastModified =
      (page.metadata as { modifiedAt?: string }).modifiedAt ||
      page.metadata.updatedAt ||
      page.metadata.publishedAt

    return {
      url: `https://schoen.world${page.slug === 'home' ? '' : `/${page.slug}`}`,
      lastModified: new Date(lastModified).toISOString(),
    }
  })

  return [...notesEntries, ...pagesEntries]
}
