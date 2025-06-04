import { promises as fs } from 'fs'
import type { MetadataRoute } from 'next'
import path from 'path'

async function getMdxSlugs(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, {
    recursive: true,
    withFileTypes: true,
  })
  return entries
    .filter((entry) => entry.isFile() && entry.name === 'page.mdx')
    .map((entry) => {
      const relativePath = path.relative(
        dir,
        path.join(entry.parentPath, entry.name),
      )
      if (relativePath === 'page.mdx') {
        return ''
      }
      return path.dirname(relativePath)
    })
    .map((slug) => slug.replace(/\\/g, '/'))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const searchDirectory = path.join(process.cwd(), 'src', 'app')
  const slugs = await getMdxSlugs(searchDirectory)

  const pages: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `https://schoen.world${slug ? `/${slug}` : ''}`,
    lastModified: new Date().toISOString(),
  }))

  return pages
}
