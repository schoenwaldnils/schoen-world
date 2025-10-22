# Technology Stack

## Core Framework

- **Next.js 15** with App Router
- **React 19** with TypeScript
- **Node.js** runtime

## Styling & UI

- **Tailwind CSS 4** for styling
- **CSS Modules** for component-specific styles
- **Lucide React** for icons
- **PostCSS** with custom media queries
- Dark/light theme support with CSS custom properties

## Content Management

- **MDX** for content authoring with `next-mdx-remote-client`
- **Remark** plugins for frontmatter and GitHub Flavored Markdown
- **Highlight.js** for syntax highlighting in code blocks

## Development Tools

- **TypeScript** with strict mode enabled
- **ESLint** with TypeScript and Prettier integration
- **Prettier** with Tailwind CSS plugin
- **Playwright** for end-to-end testing

## Build & Deployment

- **Turbopack** for faster builds
- **Sharp** for image optimization
- HTTPS development server on port 3002
- Self-signed certificates for local HTTPS

## Common Commands

### Development

```bash
npm run dev          # Start development server (https://localhost:3002)
npm run build        # Build for production
npm run start        # Start production server
```

### Code Quality

```bash
npm run lint         # Run Next.js linter
npm run lint:ts      # Run TypeScript ESLint
npm run lint:ts-fix  # Fix TypeScript linting issues
npm run lint:types   # Run TypeScript type checking
```

### Testing

```bash
npm run test:e2e         # Run Playwright tests
npm run test:e2e:ui      # Run tests with UI
npm run test:e2e:headed  # Run tests in headed mode
npm run test:e2e:debug   # Debug tests
npm run test:e2e:report  # Show test report
npm test                 # Run all linting and tests
```

## Path Aliases

- `@/*` maps to `./src/app/*` for cleaner imports
