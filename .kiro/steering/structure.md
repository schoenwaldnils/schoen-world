# Project Structure

## Root Directory

- `src/app/` - Next.js App Router application code
- `tests/` - Playwright end-to-end tests
- `certificates/` - Local HTTPS certificates
- `.kiro/` - Kiro AI assistant configuration and steering rules

## Application Structure (`src/app/`)

### Core App Files

- `layout.tsx` - Root layout with theme support and global structure
- `page.tsx` - Homepage (redirects to home slug)
- `globals.css` - Global styles and CSS reset
- `theme.css` - CSS custom properties for theming
- `typography.css` - Typography styles
- `highlightjs.css` - Syntax highlighting styles

### Routing

- `[slug]/page.tsx` - Dynamic page routing for static content
- `n/[slug]/page.tsx` - Blog post routing (notes)
- `til/page.tsx` - TIL (Today I Learned) overview page
- `og/route.tsx` - Dynamic OpenGraph image generation
- `rss.xml/route.ts` - RSS feed generation
- `sitemap.ts` - Sitemap generation

### Components (`src/app/components/`)

Components follow a consistent structure:

- Each component has its own folder
- `ComponentName.tsx` - Main component file
- `ComponentName.module.css` - Component-specific styles
- `index.ts` - Barrel export

**Key Components:**

- `Header/` - Site navigation and logo
- `Footer/` - Site footer with theme switcher
- `StageHome/` - Homepage hero section
- `ThemeSwitch/` - Dark/light theme toggle
- `Avatar/` - Author avatar component
- `Logo/` - Site logo component
- `Link/` - Custom link component
- `Code/` - Code syntax highlighting components
- `MDX/` - MDX content rendering components
- `OgImage/` - OpenGraph image component

### Content (`src/app/content/`)

- `pages/` - Static MDX pages (home, imprint, privacy)
- `notes/` - Blog posts/articles in MDX format with date-based naming

### Utilities (`src/app/utils/`)

- `cn.ts` - Class name utility (clsx + tailwind-merge)
- `content.ts` - Content parsing and management utilities
- `formatDate.ts` - Date formatting utilities

## File Naming Conventions

- Components use PascalCase folders and files
- Pages use kebab-case for routes
- Blog posts use date prefix: `YYYY-MM-DD-title.mdx`
- CSS modules use `ComponentName.module.css`
- Utility files use camelCase

## Import Patterns

- Use `@/` alias for imports from `src/app/`
- Barrel exports from component index files
- Simple import sorting with ESLint plugin

## Testing Structure (`tests/`)

- One test file per major feature/page
- Tests follow naming: `feature.spec.ts`
- Focus on user journeys and navigation flows
