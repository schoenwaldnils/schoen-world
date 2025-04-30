import { ComponentPropsWithoutRef } from 'react'
import { highlight } from 'sugar-high'

import { Link } from '@/components/Link'
import { StageHome } from '@/components/StageHome'
import css from '@/MDXComponents.module.css'

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
  a: ({ href, ...props }: AnchorProps) =>
    href ? <Link href={href} {...props} /> : null,
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
  StageHome: (props: ComponentPropsWithoutRef<'div'>) => (
    <StageHome className={css.stageHome} {...props} />
  ),
}

declare global {
  type MDXProvidedComponents = typeof components
}

export function useMDXComponents(): MDXProvidedComponents {
  return components
}
