import fs from 'fs'
import { evaluate } from 'next-mdx-remote-client/rsc'
import { getFrontmatter } from 'next-mdx-remote-client/utils'
import path from 'path'

// Base metadata that all content types share
export interface BaseMetadata extends Record<string, unknown> {
  title: string
  description?: string
  image?: string
}

// TIL-specific metadata
export interface TilMetadata extends BaseMetadata {
  publishedAt: string
}

// Static page metadata
export interface PageMetadata extends BaseMetadata {
  publishedAt: string
}

// Generic content item
export interface ContentItem<T extends BaseMetadata> {
  metadata: T
  slug: string
  content: string
}

// Extract date from filename (format: YYYY-MM-DD-slug.mdx)
function extractDateFromFilename(filename: string): string {
  const dateMatch = filename.match(/^(\d{4}-\d{2}-\d{2})-/)
  return dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0]
}

// Extract slug from filename (remove date prefix and extension)
function extractSlugFromFilename(filename: string): string {
  return filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.mdx$/, '')
}

// Generic file utilities
function getMDXFiles(dir: string): string[] {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

// Fast frontmatter-only extraction (for listing pages)
function readMDXMetadata<T extends BaseMetadata>(filePath: string): T {
  const rawContent = fs.readFileSync(filePath, 'utf-8')
  const { frontmatter } = getFrontmatter<T>(rawContent)
  return frontmatter
}

// Full MDX processing with frontmatter (for individual pages)
async function readMDXFile<T extends BaseMetadata>(
  filePath: string,
): Promise<{
  metadata: T
  content: string
}> {
  const rawContent = fs.readFileSync(filePath, 'utf-8')

  // Use evaluate to parse frontmatter properly
  const result = await evaluate({
    source: rawContent,
    options: {
      parseFrontmatter: true,
    },
  })

  return {
    metadata: result.frontmatter as T,
    content: rawContent,
  }
}

// Fast metadata extraction for listing pages
function getMDXMetadata<T extends BaseMetadata>(dir: string): ContentItem<T>[] {
  const mdxFiles = getMDXFiles(dir)
  return mdxFiles
    .map((file) => {
      const metadata = readMDXMetadata<T>(path.join(dir, file))
      const slug = extractSlugFromFilename(file)
      const publishedAt = extractDateFromFilename(file)
      return {
        metadata: {
          ...metadata,
          publishedAt: metadata.publishedAt || publishedAt,
        },
        slug,
        content: '', // Empty content for metadata-only queries
      }
    })
    .sort((a, b) => {
      if (
        a.metadata.publishedAt &&
        b.metadata.publishedAt &&
        new Date(a.metadata.publishedAt as string) >
          new Date(b.metadata.publishedAt as string)
      ) {
        return -1
      }
      return 1
    })
}

async function getMDXData<T extends BaseMetadata>(
  dir: string,
): Promise<ContentItem<T>[]> {
  const mdxFiles = getMDXFiles(dir)
  const results = await Promise.all(
    mdxFiles.map(async (file) => {
      const { metadata, content } = await readMDXFile<T>(path.join(dir, file))
      const slug = extractSlugFromFilename(file)
      const publishedAt = extractDateFromFilename(file)
      return {
        metadata: {
          ...metadata,
          publishedAt: metadata.publishedAt || publishedAt,
        },
        slug,
        content,
      }
    }),
  )
  return results
}

// TIL-specific functions
export function getTilPostsMetadata(): ContentItem<TilMetadata>[] {
  const tilDirectory = path.join(process.cwd(), 'src', 'app', 'content', 'til')
  return getMDXMetadata<TilMetadata>(tilDirectory)
}

export async function getTilPosts(): Promise<ContentItem<TilMetadata>[]> {
  const tilDirectory = path.join(process.cwd(), 'src', 'app', 'content', 'til')
  return getMDXData<TilMetadata>(tilDirectory)
}

export async function getTilPost(
  slug: string,
): Promise<ContentItem<TilMetadata> | null> {
  const files = await getTilPosts()
  const matchingFile = files.find((file) => file.slug === slug)

  if (!matchingFile) {
    return null
  }

  return matchingFile
}

// Static page functions
export function getAllPagesMetadata(): ContentItem<PageMetadata>[] {
  const pagesDirectory = path.join(
    process.cwd(),
    'src',
    'app',
    'content',
    'pages',
  )
  return getMDXMetadata<PageMetadata>(pagesDirectory)
}

export async function getAllPages(): Promise<ContentItem<PageMetadata>[]> {
  const pagesDirectory = path.join(
    process.cwd(),
    'src',
    'app',
    'content',
    'pages',
  )
  return getMDXData<PageMetadata>(pagesDirectory)
}

export async function getPage(
  slug: string,
): Promise<ContentItem<PageMetadata> | null> {
  const pages = await getAllPages()
  const matchingPage = pages.find((page) => page.slug === slug)

  if (!matchingPage) {
    return null
  }

  return matchingPage
}
