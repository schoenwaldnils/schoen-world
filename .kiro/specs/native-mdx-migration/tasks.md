# Implementation Plan

- [ ] 1. Install dependencies and update configuration
  - Install `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react` packages
  - Update `next.config.ts` to use `createMDX` with frontmatter plugins
  - Remove `transpilePackages` configuration for next-mdx-remote-client
  - _Requirements: 1.1, 1.2, 4.1, 4.2, 4.3_

- [ ] 2. Create mdx-components.tsx file
  - Create `mdx-components.tsx` at project root (or in `src/` if applicable)
  - Export `useMDXComponents` function with all custom component mappings
  - Map existing MDX components (H1-H4, MDXLink, MDXImage, Code, Pre, Blockquote, Table, MDXStageHome)
  - _Requirements: 1.3, 2.3_

- [ ] 3. Update content utilities for dynamic imports
  - Modify `getPage` function to return file path information needed for dynamic imports
  - Modify `getNote` function to return file path information needed for dynamic imports
  - Ensure `listPagePaths` and `listNoteSlugs` continue to work correctly
  - Keep `gray-matter` usage for metadata extraction in listing functions (getNotes, getAllContent)
  - _Requirements: 3.1, 3.2, 3.3, 3.5_

- [ ] 4. Update page routes to use dynamic imports
  - Modify `src/app/[...path]/page.tsx` to dynamically import MDX files
  - Import both default component and metadata from MDX files
  - Remove usage of `<MDX source={...}>` wrapper component
  - Maintain existing metadata generation logic
  - _Requirements: 1.1, 2.1, 2.4, 5.1, 5.4_

- [ ] 5. Update note routes to use dynamic imports
  - Modify `src/app/n/[slug]/page.tsx` to dynamically import MDX files
  - Import both default component and metadata from MDX files
  - Remove usage of `<MDX source={...}>` wrapper component
  - Maintain existing metadata display and date formatting
  - _Requirements: 1.1, 2.2, 2.4, 5.2, 5.4_

- [ ] 6. Remove old MDX wrapper component
  - Delete `src/app/components/MDX/index.tsx` file
  - Keep individual component files (Headings, MDXLink, MDXImage, Code, etc.)
  - Update any remaining imports that reference the old MDX wrapper
  - _Requirements: 1.1, 4.1_

- [ ] 7. Clean up dependencies
  - Remove `next-mdx-remote-client` from package.json
  - Verify all remark plugins are correctly listed (keep remark-gfm, remark-frontmatter, remark-mdx-frontmatter, gray-matter)
  - Run `npm install` or `pnpm install` to update lockfile
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 8. Build and verify
  - Run `npm run build` to verify static generation works
  - Check that all pages generate without errors
  - Check that all blog posts generate without errors
  - Verify build time is acceptable
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 6.1, 6.2, 6.3, 6.4_

- [ ]\* 9. Run E2E tests
  - Run existing Playwright tests with `npm run test:e2e`
  - Verify all tests pass without modification
  - Check accessibility tests still pass
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ]\* 10. Manual verification
  - Start dev server and verify homepage renders
  - Verify static pages (imprint, privacy) render correctly
  - Verify blog listing page (/til) shows all posts
  - Verify individual blog posts render with correct metadata
  - Verify code syntax highlighting works
  - Verify custom MDX components (StageHome) work
  - Verify dark/light theme switching works
  - Verify OpenGraph images generate correctly
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 7.4_
