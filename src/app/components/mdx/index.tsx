import { MDXRemote } from 'next-mdx-remote-client/rsc'
import React from 'react'
import highlight from 'remark-sugar-high'

import { Blockquote } from './Blockquote'
import { H1, H2, H3, H4 } from './Headings'
import { MDXImage } from './MDXImage'
import { MDXLink } from './MDXLink'
import { MDXStageHome } from './MDXStageHome'
import { Table } from './Table'

const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  a: MDXLink,
  img: MDXImage,
  blockquote: Blockquote,
  Image: MDXImage,
  Table,
  StageHome: MDXStageHome,
}

export function MDX({ source }: { source: string }) {
  return (
    <section className="mdx">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [highlight],
          },
          parseFrontmatter: true,
        }}
      />
    </section>
  )
}
