import fs from 'fs'
import { evaluate } from 'next-mdx-remote-client/rsc'
import { getFrontmatter } from 'next-mdx-remote-client/utils'
import path from 'path'

// Base metadata that all content types share
interface BaseMetadata extends Record<string, unknown> {
  title: string
}

// TIL-specific metadata
export interface TilMetadata extends BaseMetadata {
  publishedAt: string
  summary: string
  image?: string
}

// Static page metadata
export interface PageMetadata extends BaseMetadata {
  description: string
}

// Generic content item
export interface ContentItem<T extends BaseMetadata> {
  metadata: T
  slug: string
  content: string
}

// Date formatting utilities
export function formatDate(
  date: string,
  options: {
    includeRelative?: boolean
    style?: 'short' | 'long' | 'narrow'
    locale?: string
  } = {},
) {
  const { includeRelative = false, style = 'long', locale = 'en-US' } = options

  const targetDate = new Date(date)
  const fullDate = targetDate.toLocaleDateString(locale, {
    year: 'numeric',
    month: style,
    day: 'numeric',
  })

  if (!includeRelative) {
    return fullDate
  }

  const now = new Date()
  const diffInSeconds = (now.getTime() - targetDate.getTime()) / 1000

  // Convert to appropriate time unit
  const rtf = new Intl.RelativeTimeFormat(locale, {
    numeric: 'auto',
    style: 'long',
  })

  let relativeTime: string

  if (Math.abs(diffInSeconds) < 60) {
    relativeTime = rtf.format(-Math.round(diffInSeconds), 'second')
  } else if (Math.abs(diffInSeconds) < 3600) {
    relativeTime = rtf.format(-Math.round(diffInSeconds / 60), 'minute')
  } else if (Math.abs(diffInSeconds) < 86400) {
    relativeTime = rtf.format(-Math.round(diffInSeconds / 3600), 'hour')
  } else if (Math.abs(diffInSeconds) < 2592000) {
    relativeTime = rtf.format(-Math.round(diffInSeconds / 86400), 'day')
  } else if (Math.abs(diffInSeconds) < 31536000) {
    relativeTime = rtf.format(-Math.round(diffInSeconds / 2592000), 'month')
  } else {
    relativeTime = rtf.format(-Math.round(diffInSeconds / 31536000), 'year')
  }

  return `${fullDate} (${relativeTime})`
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
  return mdxFiles.map((file) => {
    const metadata = readMDXMetadata<T>(path.join(dir, file))
    const slug = path.basename(file, path.extname(file))
    return {
      metadata,
      slug,
      content: '', // Empty content for metadata-only queries
    }
  })
}

async function getMDXData<T extends BaseMetadata>(
  dir: string,
): Promise<ContentItem<T>[]> {
  const mdxFiles = getMDXFiles(dir)
  const results = await Promise.all(
    mdxFiles.map(async (file) => {
      const { metadata, content } = await readMDXFile<T>(path.join(dir, file))
      const slug = path.basename(file, path.extname(file))
      return {
        metadata,
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
  const tilDirectory = path.join(process.cwd(), 'src', 'app', 'content', 'til')
  const filePath = path.join(tilDirectory, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const { metadata, content } = await readMDXFile<TilMetadata>(filePath)
  return { metadata, slug, content }
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

export async function getPageContent(
  slug: string,
): Promise<ContentItem<PageMetadata> | null> {
  const pagesDirectory = path.join(
    process.cwd(),
    'src',
    'app',
    'content',
    'pages',
  )
  const filePath = path.join(pagesDirectory, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const { metadata, content } = await readMDXFile<PageMetadata>(filePath)
  return { metadata, slug, content }
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
