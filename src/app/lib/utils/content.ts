import fs from 'fs'
import path from 'path'

// Base metadata that all content types share
interface BaseMetadata {
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

// Generic frontmatter parser
function parseFrontmatter<T extends BaseMetadata>(
  fileContent: string,
): { metadata: T; content: string } {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  const match = frontmatterRegex.exec(fileContent)
  const frontMatterBlock = match![1]
  const content = fileContent.replace(frontmatterRegex, '').trim()
  const frontMatterLines = frontMatterBlock.trim().split('\n')
  const metadata: Partial<T> = {}

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(': ')
    let value = valueArr.join(': ').trim()
    value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
    metadata[key.trim() as keyof T] = value as T[keyof T]
  })

  return { metadata: metadata as T, content }
}

// Generic file utilities
function getMDXFiles(dir: string): string[] {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

function readMDXFile<T extends BaseMetadata>(
  filePath: string,
): {
  metadata: T
  content: string
} {
  const rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter<T>(rawContent)
}

function getMDXData<T extends BaseMetadata>(dir: string): ContentItem<T>[] {
  const mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile<T>(path.join(dir, file))
    const slug = path.basename(file, path.extname(file))
    return {
      metadata,
      slug,
      content,
    }
  })
}

// TIL-specific functions
export function getTilPosts(): ContentItem<TilMetadata>[] {
  const tilDirectory = path.join(process.cwd(), 'src', 'app', 'content', 'til')
  return getMDXData<TilMetadata>(tilDirectory)
}

export function getTilPost(slug: string): ContentItem<TilMetadata> | null {
  const tilDirectory = path.join(process.cwd(), 'src', 'app', 'content', 'til')
  const filePath = path.join(tilDirectory, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const { metadata, content } = readMDXFile<TilMetadata>(filePath)
  return { metadata, slug, content }
}

// Static page functions
export function getPageContent(slug: string): ContentItem<PageMetadata> | null {
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

  const { metadata, content } = readMDXFile<PageMetadata>(filePath)
  return { metadata, slug, content }
}

export function getAllPages(): ContentItem<PageMetadata>[] {
  const pagesDirectory = path.join(
    process.cwd(),
    'src',
    'app',
    'content',
    'pages',
  )
  return getMDXData<PageMetadata>(pagesDirectory)
}
