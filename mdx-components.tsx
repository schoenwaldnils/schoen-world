import React, { ComponentPropsWithoutRef } from 'react'
import { Link } from 'next-view-transitions'
import { highlight } from 'sugar-high'

type HeadingProps = ComponentPropsWithoutRef<'h1'>
type ParagraphProps = ComponentPropsWithoutRef<'p'>
type ListProps = ComponentPropsWithoutRef<'ul'>
type ListItemProps = ComponentPropsWithoutRef<'li'>
type AnchorProps = ComponentPropsWithoutRef<'a'>
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>

const components = {
  h1: (props: HeadingProps) => (
    <h1 className="font-heading text-4xl font-medium mb-6 fade-in" {...props} />
  ),
  h2: (props: HeadingProps) => (
    <h2 className="font-heading text-2xl font-medium mt-8 mb-3" {...props} />
  ),
  h3: (props: HeadingProps) => (
    <h3 className="font-heading text-xl font-medium mt-8 mb-3" {...props} />
  ),
  h4: (props: HeadingProps) => (
    <h4 className="font-heading text-lg font-medium" {...props} />
  ),
  p: (props: ParagraphProps) => <p className="mb-4" {...props} />,
  ol: (props: ListProps) => (
    <ol className="list-decimal pl-5 space-y-2" {...props} />
  ),
  ul: (props: ListProps) => (
    <ul className="list-disc pl-5 space-y-1" {...props} />
  ),
  li: (props: ListItemProps) => <li className="pl-1" {...props} />,
  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className="font-medium text-white" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-medium text-white" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className =
      'text-brand dark:text-brand-light hover:text-brand-light hover:dark:text-brand-lighter link-underline'
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
  code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
    const codeHTML = highlight(children as string)
    return (
      <code
        className="bg-gray-800 px-2 py-1 rounded text-sm"
        dangerouslySetInnerHTML={{ __html: codeHTML }}
        {...props}
      />
    )
  },
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <table className="w-full text-gray-300">
      <thead>
        <tr>
          {data.headers.map((header, index) => (
            <th key={index} className="text-left p-2 border-b border-gray-700">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="p-2 border-b border-gray-700">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="ml-[0.075em] border-l-3 border-gray-700 pl-4 text-gray-400"
      {...props}
    />
  ),
}

declare global {
  type MDXProvidedComponents = typeof components
}

export function useMDXComponents(): MDXProvidedComponents {
  return components
}
