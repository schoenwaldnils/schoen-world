import fs from 'fs'
import { evaluate } from 'next-mdx-remote-client/rsc'
import path from 'path'

// Base metadata that all content types share
export interface Metadata extends Record<string, unknown> {
  title: string
  description?: string
  image?: string
  publishedAt: string
  updatedAt?: string
  tags?: string[]
}

// Generic content item
export interface ContentItem {
  metadata: Metadata
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

// Full MDX processing with frontmatter (for individual pages)
async function readMDXFile(filePath: string): Promise<{
  metadata: Metadata
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
    metadata: result.frontmatter as Metadata,
    content: rawContent,
  }
}

async function getMDXData(dir: string): Promise<ContentItem[]> {
  const mdxFiles = getMDXFiles(dir)

  const results = await Promise.all(
    mdxFiles.map(async (file) => {
      const { metadata, content } = await readMDXFile(path.join(dir, file))
      const slug = extractSlugFromFilename(file)
      const publishedAt = extractDateFromFilename(file)
      return {
        metadata: {
          ...metadata,
          publishedAt: metadata.publishedAt || publishedAt,
        } satisfies Metadata,
        slug,
        content,
      } satisfies ContentItem
    }),
  )

  return results
}

// Notes-specific functions
export async function getNotes(): Promise<ContentItem[]> {
  const noteDirectory = path.join(
    process.cwd(),
    'src',
    'app',
    'content',
    'notes',
  )
  return getMDXData(noteDirectory)
}

export async function getNote(slug: string): Promise<ContentItem | null> {
  const files = await getNotes()
  const matchingFile = files.find((file) => file.slug === slug)

  if (!matchingFile) {
    return null
  }

  return matchingFile
}

// Static page functions
export async function getAllPages(): Promise<ContentItem[]> {
  const pagesDirectory = path.join(
    process.cwd(),
    'src',
    'app',
    'content',
    'pages',
  )
  return getMDXData(pagesDirectory)
}

export async function getPage(slug: string): Promise<ContentItem | null> {
  const pages = await getAllPages()
  const matchingPage = pages.find((page) => page.slug === slug)

  if (!matchingPage) {
    return null
  }

  return matchingPage
}
