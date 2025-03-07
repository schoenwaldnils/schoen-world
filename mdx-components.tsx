import React, { ComponentPropsWithoutRef } from 'react'
import { Link } from 'next-view-transitions'
import { highlight } from 'sugar-high'
import css from '@/MDXComponents.module.css'

import { Avatar } from './src/app/components/Avatar'

type HeadingProps = ComponentPropsWithoutRef<'h1'>
type ParagraphProps = ComponentPropsWithoutRef<'p'>
type ListProps = ComponentPropsWithoutRef<'ul'>
type ListItemProps = ComponentPropsWithoutRef<'li'>
type AnchorProps = ComponentPropsWithoutRef<'a'>
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>

const components = {
  h1: (props: HeadingProps) => <h1 className={css.h1} {...props} />,
  h2: (props: HeadingProps) => <h2 className={css.h2} {...props} />,
  h3: (props: HeadingProps) => <h3 className={css.h3} {...props} />,
  h4: (props: HeadingProps) => <h4 className={css.h4} {...props} />,
  p: (props: ParagraphProps) => <p className={css.p} {...props} />,
  ol: (props: ListProps) => <ol className={css.ol} {...props} />,
  ul: (props: ListProps) => <ul className={css.ul} {...props} />,
  li: (props: ListItemProps) => <li className={css.li} {...props} />,
  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className={css.em} {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className={css.strong} {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className = css.link
    if (href?.startsWith('/')) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      )
    }
    if (href?.startsWith('#')) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      )
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    )
  },
  img: (props: ComponentPropsWithoutRef<'img'>) => (
    <img className={css.img} {...props} />
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote className={css.blockquote} {...props} />
  ),
  code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
    const codeHTML = highlight(children as string)
    return (
      <code
        className={css.code}
        dangerouslySetInnerHTML={{ __html: codeHTML }}
        {...props}
      />
    )
  },
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <table className={css.table}>
      <thead>
        <tr>
          {data.headers.map((header, index) => (
            <th key={index} className={css.th}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className={css.td}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  Avatar: (props: ComponentPropsWithoutRef<'div'>) => (
    <Avatar className={css.avatar} {...props} />
  ),
}

declare global {
  type MDXProvidedComponents = typeof components
}

export function useMDXComponents(): MDXProvidedComponents {
  return components
}
