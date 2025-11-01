# Design Document

## Overview

This design outlines the migration from `next-mdx-remote-client` to Next.js's native MDX support using the `@next/mdx` package. The migration will maintain the current content structure while introducing a cleaner architecture that separates content sourcing from rendering. The design prioritizes flexibility to support future migration to external content sources (CMS, database, API) without requiring changes to consuming components.

### Key Design Principles

1. **Separation of Concerns**: Content fetching, metadata extraction, and rendering are distinct responsibilities
2. **Abstraction Layer**: A consistent interface shields consumers from implementation details
3. **Zero Content Changes**: All existing MDX files work without modification
4. **Future-Proof**: Easy swap between local files and external sources
5. **Type Safety**: Full TypeScript support throughout the stack

## Architecture

### Current Architecture

```
┌─────────────────┐
│  Page Component │
│   (page.tsx)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────────┐
│ Content Utils   │─────▶│  File System     │
│ (content.ts)    │      │  (MDX files)     │
└────────┬────────┘      └──────────────────┘
         │
         ▼
┌─────────────────┐
│  MDX Component  │
│  (MDX/index.tsx)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  MDXRemote      │
│  (runtime)      │
└─────────────────┘
```

### New Architecture

```
┌─────────────────┐
│  Page Component │
│   (page.tsx)    │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────┐
│     Content Abstraction Layer       │
│         (content.ts)                │
│  ┌─────────────┬─────────────────┐  │
│  │  Metadata   │   Content       │  │
│  │  Functions  │   Functions     │  │
│  └─────────────┴─────────────────┘  │
└────────┬────────────────────────────┘
         │
         ├──────────────┬──────────────┐
         ▼              ▼              ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ File System  │ │ Future: CMS  │ │ Future: API  │
│ (MDX files)  │ │              │ │              │
└──────────────┘ └──────────────┘ └──────────────┘
         │
         ▼
┌─────────────────┐
│  Native MDX     │
│  Import/Compile │
└─────────────────┘
```

## Components and Interfaces

### 1. Next.js Configuration

**File**: `next.config.ts`

The configuration will use `@next/mdx` to enable native MDX support:

```typescript
import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  // ... existing config
}

const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
```

**Key Decisions**:

- Use string-based plugin names for Turbopack compatibility
- Keep `remark-gfm` for GitHub Flavored Markdown support
- Remove `transpilePackages: ['next-mdx-remote-client']` as it's no longer needed

### 2. MDX Components Configuration

**File**: `mdx-components.tsx` (new, root level)

This file is required by `@next/mdx` and defines global component mappings:

```typescript
import type { MDXComponents } from 'mdx/types'
import { H1, H2, H3, H4 } from '@/components/MDX/Headings'
import { MDXLink } from '@/components/MDX/MDXLink'
import { MDXImage } from '@/components/MDX/MDXImage'
import { Blockquote } from '@/components/MDX/Blockquote'
import { Code, Pre } from '@/components/MDX/Code'
import { Table } from '@/components/MDX/Table'
import { MDXStageHome } from '@/components/MDX/MDXStageHome'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    a: MDXLink,
    img: MDXImage,
    blockquote: Blockquote,
    code: Code,
    pre: Pre,
    Image: MDXImage,
    Table,
    StageHome: MDXStageHome,
    ...components,
  }
}
```

**Key Decisions**:

- Reuse all existing custom components
- Allow component overrides via spread operator
- Place at root level as required by Next.js

### 3. Content Utilities Refactor

**File**: `src/app/utils/content.ts`

The content utilities will be refactored to support both local MDX files and future external sources:

#### Interface Definitions (unchanged)

```typescript
export interface Metadata extends Record<string, unknown> {
  title: string
  description?: string
  image?: string
  publishedAt?: string
  updatedAt?: string
  tags?: string[]
}

export type ContentType = 'page' | 'note'

export interface ContentMeta {
  metadata: Metadata
  slug: string
  path: string[]
  type: ContentType
  filePath: string
}

export interface ContentItem extends ContentMeta {
  content: string | React.ComponentType // Support both string and component
}
```

#### New: Content Source Strategy Pattern

```typescript
// Strategy interface for different content sources
interface ContentSource {
  listPaths(type: ContentType): Promise<string[][]>
  getMetadata(path: string[], type: ContentType): Promise<ContentMeta | null>
  getContent(path: string[], type: ContentType): Promise<ContentItem | null>
}

// Local file system implementation
class LocalMDXSource implements ContentSource {
  // Implementation using fs and dynamic imports
}

// Future: External source implementation
class ExternalMDXSource implements ContentSource {
  // Implementation using fetch/API calls
}

// Current active source (can be swapped)
const contentSource: ContentSource = new LocalMDXSource()
```

#### Public API Functions (signatures unchanged)

```typescript
// These functions remain the same for consumers
export function listPagePaths(): string[][]
export function listNoteSlugs(): string[]
export function getPage(pathSegments: string[]): ContentItem | null
export function getNote(slug: string): ContentItem | null
export function getNotes(): ContentMeta[]
export function getAllContent(): ContentMeta[]
```

**Key Decisions**:

- Maintain existing function signatures for backward compatibility
- Introduce strategy pattern internally for flexibility
- Support both string content (for metadata) and React components (for rendering)
- Keep synchronous API for now (Next.js handles async in components)

### 4. Page Route Updates

**File**: `src/app/[...path]/page.tsx`

Pages will use dynamic imports to load MDX files:

```typescript
import { notFound } from 'next/navigation'
import { getPage, listPagePaths } from '@/utils/content'

export function generateStaticParams() {
  return listPagePaths().map((path) => ({ path }))
}

export async function generateMetadata({ params }: Props) {
  const { path } = await params
  const page = getPage(path)

  if (!page) {
    return { title: 'Not Found' }
  }

  // ... metadata generation
}

export default async function Page({ params }: Props) {
  const { path } = await params
  const page = getPage(path)

  if (!page) {
    notFound()
  }

  // Dynamic import of MDX file
  const {default: MDXContent} = await import(
    `@/app/[...path]/content/${page.path.join('/')}.mdx`
  )

  return (
    <article className="prose">
      <MDXContent />
    </article>
  )
}
```

**Key Decisions**:

- Use dynamic imports for MDX files
- Maintain metadata extraction via content utilities
- Keep existing URL structure and routing logic
- Remove `<MDX source={...}>` wrapper component

### 5. Note Route Updates

**File**: `src/app/n/[slug]/page.tsx`

Similar pattern for blog posts:

```typescript
export default async function Notes({ params }: Props) {
  const { slug } = await params
  const post = getNote(slug)

  if (!post) {
    notFound()
  }

  const { metadata, filePath } = post

  // Dynamic import using the actual file path
  const MDXContent = await import(`@/${filePath}`).then((mod) => mod.default)

  return (
    <article>
      <h1>{metadata.title}</h1>
      {metadata.publishedAt && <p>{formatDate(metadata.publishedAt)}</p>}
      <MDXContent />
    </article>
  )
}
```

**Key Decisions**:

- Use file path from content utilities for accurate imports
- Handle date-prefixed filenames correctly
- Maintain existing metadata display logic

### 6. MDX Component Removal

**File**: `src/app/components/MDX/index.tsx`

This component will be removed as it's no longer needed. The `mdx-components.tsx` file at the root replaces its functionality.

**Migration Path**:

1. Move component mappings to `mdx-components.tsx`
2. Update imports in consuming components
3. Remove `MDX` wrapper component
4. Delete `src/app/components/MDX/index.tsx`

## Data Models

### Metadata Extraction

Metadata will continue to be extracted using `gray-matter` for consistency:

```typescript
import matter from 'gray-matter'
import fs from 'fs'

function readMDXFrontmatter(filePath: string): Metadata {
  const rawContent = fs.readFileSync(filePath, 'utf-8')
  const { data } = matter(rawContent)
  return data as Metadata
}
```

**Key Decisions**:

- Keep `gray-matter` for frontmatter parsing
- Separate metadata extraction from content compilation
- Cache metadata reads for performance

### Content Item Structure

```typescript
interface ContentItem {
  metadata: Metadata           // Parsed frontmatter
  slug: string                 // URL-friendly identifier
  path: string[]              // URL path segments
  type: 'page' | 'note'       // Content type
  filePath: string            // Relative file path for imports
  content?: string            // Raw content (optional, for external sources)
}
```

## Error Handling

### Build-Time Errors

1. **Missing MDX Files**: Return `null` from content utilities, let Next.js handle 404
2. **Invalid Frontmatter**: Log warning, use default metadata
3. **Import Errors**: Fail build with clear error message

```typescript
try {
  const MDXContent = await import(`@/${filePath}`)
  return MDXContent.default
} catch (error) {
  console.error(`Failed to import MDX file: ${filePath}`, error)
  notFound()
}
```

### Runtime Errors

1. **Component Errors**: Let React error boundaries handle
2. **Missing Components**: Provide fallback components in `mdx-components.tsx`

## Testing Strategy

### Unit Tests (Optional)

- Test content utility functions (getPage, getNote, etc.)
- Test metadata extraction
- Test slug generation and path handling

### Integration Tests

- Verify all existing pages render without errors
- Verify all blog posts render without errors
- Verify metadata is correctly extracted
- Verify custom components work in MDX

### E2E Tests (Existing)

- Run existing Playwright tests to ensure no regressions
- All tests should pass without modification

### Manual Testing Checklist

1. Homepage renders correctly
2. Static pages (imprint, privacy) render correctly
3. Blog post listing (/til) shows all posts
4. Individual blog posts render correctly
5. Code syntax highlighting works
6. Custom MDX components (StageHome, etc.) work
7. Dark/light theme works
8. OpenGraph images generate correctly
9. RSS feed generates correctly
10. Build completes without errors

## Migration Path

### Phase 1: Setup

1. Install `@next/mdx` and related packages
2. Create `mdx-components.tsx` at root
3. Update `next.config.ts` with MDX configuration

### Phase 2: Content Utilities

1. Refactor `content.ts` to support dynamic imports
2. Add `filePath` to return values
3. Keep existing function signatures

### Phase 3: Route Updates

1. Update `src/app/[...path]/page.tsx` to use dynamic imports
2. Update `src/app/n/[slug]/page.tsx` to use dynamic imports
3. Test each route type individually

### Phase 4: Cleanup

1. Remove `MDX` wrapper component
2. Remove `next-mdx-remote-client` from dependencies
3. Remove unused remark plugins
4. Update imports throughout codebase

### Phase 5: Verification

1. Run build and verify no errors
2. Run E2E tests
3. Manual testing of all pages
4. Performance comparison

## Performance Considerations

### Build Time

- Native MDX compilation should be faster than runtime compilation
- Static generation of all pages at build time
- Parallel compilation of MDX files

### Runtime

- No runtime MDX compilation (all done at build time)
- Smaller bundle size (no MDX runtime)
- Faster page loads

### Caching

- Next.js automatically caches compiled MDX
- Metadata extraction can be cached during build
- No need for custom caching logic

## Future Extensibility

### External Content Sources

To add support for external content (CMS, API, database):

1. Implement `ExternalMDXSource` class
2. Fetch content as string
3. Use `next-mdx-remote-client` or similar for runtime compilation
4. Swap `contentSource` instance
5. No changes needed in page components

Example:

```typescript
class CMSSource implements ContentSource {
  async getContent(path: string[], type: ContentType): Promise<ContentItem | null> {
    const response = await fetch(`https://cms.example.com/api/${type}/${path.join('/')}`)
    const data = await response.json()

    return {
      metadata: data.frontmatter,
      slug: path[path.length - 1],
      path,
      type,
      filePath: '', // Not applicable for external sources
      content: data.markdown, // Raw markdown string
    }
  }
}
```

### Hybrid Approach

Support both local and external content:

```typescript
class HybridSource implements ContentSource {
  constructor(
    private localSource: LocalMDXSource,
    private externalSource: ExternalMDXSource
  ) {}

  async getContent(path: string[], type: ContentType): Promise<ContentItem | null> {
    // Try local first, fallback to external
    return await this.localSource.getContent(path, type)
      ?? await this.externalSource.getContent(path, type)
  }
}
```

## Dependencies

### Add

- `@next/mdx`: ^15.0.0 (Next.js native MDX support)
- `@mdx-js/loader`: ^3.0.0 (MDX webpack loader)
- `@mdx-js/react`: ^3.0.0 (MDX React integration)
- `@types/mdx`: ^2.0.13 (already installed)

### Keep

- `gray-matter`: ^4.0.3 (frontmatter parsing)
- `remark-gfm`: ^4.0.1 (GitHub Flavored Markdown)
- `highlight.js`: ^11.11.1 (syntax highlighting)

### Remove

- `next-mdx-remote-client`: ^2.1.7 (replaced by @next/mdx)
- `remark-frontmatter`: ^5.0.0 (not needed with gray-matter)
- `remark-mdx-frontmatter`: ^5.2.0 (not needed with gray-matter)

## Rollback Plan

If issues arise during migration:

1. Revert `next.config.ts` changes
2. Restore `MDX` wrapper component
3. Revert page component changes
4. Reinstall `next-mdx-remote-client`
5. Remove `mdx-components.tsx`

All changes should be in a single PR/branch for easy rollback.
