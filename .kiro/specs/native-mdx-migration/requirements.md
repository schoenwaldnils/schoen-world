# Requirements Document

## Introduction

This feature migrates the current MDX content management system from `next-mdx-remote-client` to Next.js's native MDX support. The migration will leverage Next.js 15's improved MDX integration while maintaining the existing content structure and ensuring the system can easily swap between local MDX files and external markdown sources in the future.

## Glossary

- **MDX System**: The content management system that processes and renders MDX (Markdown with JSX) files
- **Content Utilities**: The utility functions in `src/app/utils/content.ts` that handle content discovery and metadata extraction
- **Page Routes**: Dynamic routes that render static pages from MDX files located in `src/app/[...path]/content/`
- **Note Routes**: Dynamic routes that render blog posts from MDX files located in `src/app/n/[slug]/content/`
- **MDX Components**: Custom React components that replace default HTML elements in rendered MDX content
- **Frontmatter**: YAML metadata at the top of MDX files containing title, description, dates, and other metadata
- **Content Abstraction Layer**: A separation layer that isolates content source implementation from content consumption

## Requirements

### Requirement 1

**User Story:** As a developer, I want to use Next.js's native MDX support, so that I benefit from better performance and official framework integration

#### Acceptance Criteria

1. WHEN THE MDX System processes content, THE MDX System SHALL use Next.js native MDX compilation instead of next-mdx-remote-client
2. THE MDX System SHALL maintain support for remark-gfm plugin for GitHub Flavored Markdown
3. THE MDX System SHALL preserve all existing custom MDX Components (headings, links, images, code blocks, tables, blockquotes)
4. THE MDX System SHALL render content with identical visual output compared to the current implementation
5. THE MDX System SHALL support frontmatter parsing using gray-matter

### Requirement 2

**User Story:** As a developer, I want to maintain the current content structure, so that existing MDX files require no modifications

#### Acceptance Criteria

1. THE MDX System SHALL continue reading Page Routes from `src/app/[...path]/content/` directory
2. THE MDX System SHALL continue reading Note Routes from `src/app/n/[slug]/content/` directory
3. THE MDX System SHALL preserve the date-prefixed filename format for blog posts (YYYY-MM-DD-slug.mdx)
4. THE MDX System SHALL extract metadata from frontmatter without requiring file format changes
5. THE MDX System SHALL support nested directory structures for pages

### Requirement 3

**User Story:** As a developer, I want a content abstraction layer, so that I can easily swap between local MDX files and external markdown sources

#### Acceptance Criteria

1. THE Content Utilities SHALL provide a consistent interface for retrieving content regardless of source
2. THE Content Utilities SHALL separate content fetching logic from content rendering logic
3. THE Content Utilities SHALL expose functions that return standardized content objects with metadata and content properties
4. WHERE external markdown sources are used, THE Content Utilities SHALL support the same interface without modifying consuming components
5. THE Content Utilities SHALL maintain backward compatibility with existing function signatures (getPage, getNote, getNotes, listPagePaths, listNoteSlugs)

### Requirement 4

**User Story:** As a developer, I want to remove unnecessary dependencies, so that the project has a smaller bundle size and fewer maintenance concerns

#### Acceptance Criteria

1. WHEN migration is complete, THE MDX System SHALL remove next-mdx-remote-client from package.json dependencies
2. THE MDX System SHALL remove remark-frontmatter from package.json dependencies if no longer needed
3. THE MDX System SHALL remove remark-mdx-frontmatter from package.json dependencies if no longer needed
4. THE MDX System SHALL retain gray-matter for frontmatter parsing
5. THE MDX System SHALL retain remark-gfm for GitHub Flavored Markdown support

### Requirement 5

**User Story:** As a content author, I want all existing pages and blog posts to work without modification, so that I don't need to update content files

#### Acceptance Criteria

1. THE MDX System SHALL render all existing static pages (home, imprint, privacy) without errors
2. THE MDX System SHALL render all existing blog posts without errors
3. THE MDX System SHALL preserve all metadata fields (title, description, publishedAt, updatedAt, tags, image)
4. THE MDX System SHALL maintain correct URL routing for all pages and posts
5. THE MDX System SHALL generate correct OpenGraph metadata for all content

### Requirement 6

**User Story:** As a developer, I want to maintain build performance, so that static site generation remains fast

#### Acceptance Criteria

1. THE MDX System SHALL generate static params for all pages at build time
2. THE MDX System SHALL generate static params for all notes at build time
3. THE MDX System SHALL compile MDX content at build time for static pages
4. THE MDX System SHALL maintain or improve build time compared to current implementation
5. THE MDX System SHALL support Next.js caching mechanisms for compiled MDX

### Requirement 7

**User Story:** As a developer, I want proper TypeScript types, so that I have type safety when working with content

#### Acceptance Criteria

1. THE Content Utilities SHALL maintain existing TypeScript interfaces (Metadata, ContentItem, ContentMeta, ContentType)
2. THE MDX System SHALL provide proper types for MDX component props
3. THE Content Utilities SHALL export types for use in consuming components
4. THE MDX System SHALL have no TypeScript errors after migration
5. THE Content Utilities SHALL maintain type safety for async operations
