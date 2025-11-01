import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

// Base metadata that all content types share
export interface Metadata extends Record<string, unknown> {
  title: string
  description?: string
  image?: string
  publishedAt?: string
  updatedAt?: string
  tags?: string[]
}

// Content type based on location
export type ContentType = 'page' | 'note'

// Lightweight item with just metadata (no content)
export interface ContentMeta {
  metadata: Metadata
  slug: string
  path: string[]
  type: ContentType
  filePath: string
}

// Generic content item with path information
export interface ContentItem extends ContentMeta {
  content: string
}

// Extract date from filename (format: YYYY-MM-DD-slug.mdx)
function extractDateFromFilename(filename: string): string | null {
  const dateMatch = filename.match(/^(\d{4}-\d{2}-\d{2})-/)
  return dateMatch ? dateMatch[1] : null
}

// Extract slug from filename (remove date prefix and extension)
function extractSlugFromFilename(filename: string): string {
  return filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.mdx$/, '')
}

// Recursively find all MDX files in a directory
function findMDXFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return []
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const files: string[] = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      files.push(...findMDXFiles(fullPath))
    } else if (entry.isFile() && path.extname(entry.name) === '.mdx') {
      files.push(fullPath)
    }
  }

  return files
}

// Read and parse a single MDX file (returns raw content string)
function readMDXFile(filePath: string): {
  metadata: Metadata
  content: string
} {
  const rawContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(rawContent) as unknown as {
    data: Metadata
    content: string
  }

  return {
    metadata: data,
    content,
  }
}

// Read only frontmatter from MDX (fast, no MDX compilation)
function readMDXFrontmatter(filePath: string): Metadata {
  const rawContent = fs.readFileSync(filePath, 'utf-8')
  const { data } = matter(rawContent) as unknown as { data: Metadata }
  return data
}

// List all page paths (for generateStaticParams) - only reads filenames
export function listPagePaths(): string[][] {
  const contentDirectory = path.join(
    process.cwd(),
    'src',
    'app',
    '[...path]',
    'content',
  )

  const mdxFiles = findMDXFiles(contentDirectory)

  return mdxFiles.map((filePath) => {
    const relativePath = path.relative(contentDirectory, filePath)
    const pathSegments = relativePath.split(path.sep)
    const filename = pathSegments[pathSegments.length - 1]
    const folderPath = pathSegments.slice(0, -1)
    const slug = extractSlugFromFilename(filename)

    return [...folderPath, slug]
  })
}

// List all note slugs (for generateStaticParams) - only reads filenames
export function listNoteSlugs(): string[] {
  const contentDirectory = path.join(
    process.cwd(),
    'src',
    'app',
    'n',
    '[slug]',
    'content',
  )

  const mdxFiles = findMDXFiles(contentDirectory)

  return mdxFiles.map((filePath) => {
    const filename = path.basename(filePath)
    return extractSlugFromFilename(filename)
  })
}

// Get a single specific page by path
// eslint-disable-next-line @typescript-eslint/require-await
export async function getPage(
  pathSegments: string[],
): Promise<ContentItem | null> {
  'use cache'

  const contentDirectory = path.join(
    process.cwd(),
    'src',
    'app',
    '[...path]',
    'content',
  )

  // Build potential file path
  const fileName = pathSegments[pathSegments.length - 1]
  const folderPath = pathSegments.slice(0, -1)
  const filePath = path.join(contentDirectory, ...folderPath, `${fileName}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const { metadata, content } = readMDXFile(filePath)

  return {
    metadata,
    slug: fileName,
    content,
    path: pathSegments,
    type: 'page',
    filePath,
  }
}

// Get a single specific note by slug
// eslint-disable-next-line @typescript-eslint/require-await
export async function getNote(slug: string): Promise<ContentItem | null> {
  'use cache'

  const contentDirectory = path.join(
    process.cwd(),
    'src',
    'app',
    'n',
    '[slug]',
    'content',
  )

  // Find file matching this slug (with or without date prefix)
  const mdxFiles = findMDXFiles(contentDirectory)
  const matchingFile = mdxFiles.find((file) => {
    const filename = path.basename(file)
    return extractSlugFromFilename(filename) === slug
  })

  if (!matchingFile) {
    return null
  }

  const { metadata, content } = readMDXFile(matchingFile)
  const filename = path.basename(matchingFile)
  const dateFromFilename = extractDateFromFilename(filename)

  return {
    metadata: {
      ...metadata,
      publishedAt: metadata.publishedAt || dateFromFilename || undefined,
    },
    slug,
    content,
    path: ['n', slug],
    type: 'note',
    filePath: matchingFile,
  }
}

// Get all notes with metadata only (for listings like /til)
// eslint-disable-next-line @typescript-eslint/require-await
export async function getNotes(tag?: string): Promise<ContentMeta[]> {
  'use cache'

  const contentDirectory = path.join(
    process.cwd(),
    'src',
    'app',
    'n',
    '[slug]',
    'content',
  )

  const mdxFiles = findMDXFiles(contentDirectory)

  const results = mdxFiles.map((filePath) => {
    const metadata = readMDXFrontmatter(filePath)
    const filename = path.basename(filePath)
    const slug = extractSlugFromFilename(filename)
    const dateFromFilename = extractDateFromFilename(filename)

    return {
      metadata: {
        ...metadata,
        publishedAt: metadata.publishedAt || dateFromFilename || undefined,
      },
      slug,
      path: ['n', slug],
      type: 'note' as const,
      filePath,
    } satisfies ContentMeta
  })

  return results
}

// Get all pages (rarely needed, but kept for completeness)
export function getAllPages(): ContentItem[] {
  const contentDirectory = path.join(
    process.cwd(),
    'src',
    'app',
    '[...path]',
    'content',
  )

  const mdxFiles = findMDXFiles(contentDirectory)

  const results = mdxFiles.map((filePath) => {
    const { metadata, content } = readMDXFile(filePath)
    const relativePath = path.relative(contentDirectory, filePath)
    const pathSegments = relativePath.split(path.sep)
    const filename = pathSegments[pathSegments.length - 1]
    const folderPath = pathSegments.slice(0, -1)
    const slug = extractSlugFromFilename(filename)
    const urlPath = [...folderPath, slug]

    return {
      metadata,
      slug,
      content,
      path: urlPath,
      type: 'page',
      filePath,
    } satisfies ContentItem
  })

  return results
}

// Get all content metadata (pages + notes) - for RSS, sitemap, etc.
export async function getAllContent(): Promise<ContentMeta[]> {
  'use cache'

  const contentDirectory = path.join(
    process.cwd(),
    'src',
    'app',
    '[...path]',
    'content',
  )

  const pageFiles = findMDXFiles(contentDirectory)
  const pages = pageFiles.map((filePath) => {
    const metadata = readMDXFrontmatter(filePath)
    const relativePath = path.relative(contentDirectory, filePath)
    const pathSegments = relativePath.split(path.sep)
    const filename = pathSegments[pathSegments.length - 1]
    const folderPath = pathSegments.slice(0, -1)
    const slug = extractSlugFromFilename(filename)
    const urlPath = [...folderPath, slug]

    return {
      metadata,
      slug,
      path: urlPath,
      type: 'page' as const,
      filePath,
    } satisfies ContentMeta
  })

  const notes = await getNotes()

  return [...pages, ...notes]
}
