/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-case-declarations */
/* eslint-disable react/display-name */
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer'
import { BLOCKS, Document, INLINES, MARKS } from '@contentful/rich-text-types'
import styled from '@emotion/styled'
import React, { FC, ReactNode } from 'react'

import {
  ICodeBlock,
  ICodePenEmbed,
  IMedia,
} from '../../@types/generated/contentful'
import { getContentType } from '../../utils/getContentType'
import { CodeBlock, CodeInline } from '../Code'
import { CodePenEmbed } from '../CodePenEmbed'
import { ContentfulMedia } from '../Media'
import {
  h4Styles,
  Headline1,
  Headline2,
  Headline3,
  Headline4,
  Hr,
  LI,
  Link,
  OL,
  P,
  Quote,
  UL,
} from '../Typography'

const PageHeadline1 = styled.h1`
  ${h4Styles}
`

const RichTextContainer = styled.div`
  > * {
    margin-bottom: 1em;
  }

  ${Headline1},
  ${Headline2},
  ${Headline3},
  ${Headline4} {
    margin-top: 0.75em;
    margin-bottom: 0.25em;
  }

  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }
`

const options: Options = {
  renderNode: {
    [BLOCKS.HEADING_1]: (node: unknown, children: ReactNode) => (
      <PageHeadline1>{children}</PageHeadline1>
    ),
    [BLOCKS.HEADING_2]: (node: unknown, children: ReactNode) => (
      <Headline2>{children}</Headline2>
    ),
    [BLOCKS.HEADING_3]: (node: unknown, children: ReactNode) => (
      <Headline3>{children}</Headline3>
    ),
    [BLOCKS.HEADING_4]: (node: unknown, children: ReactNode) => (
      <Headline4>{children}</Headline4>
    ),
    [BLOCKS.UL_LIST]: (node: unknown, children: ReactNode) => (
      <UL>{children}</UL>
    ),
    [BLOCKS.OL_LIST]: (node: unknown, children: ReactNode) => (
      <OL>{children}</OL>
    ),
    [BLOCKS.LIST_ITEM]: (node: unknown, children: ReactNode) => (
      <LI>{children}</LI>
    ),
    [BLOCKS.PARAGRAPH]: (node: unknown, children: ReactNode[]) => {
      if (!children || (children.length === 1 && children[0] === ''))
        return null
      return <P>{children}</P>
    },
    [BLOCKS.QUOTE]: (node: unknown, children: ReactNode) => (
      <Quote>{children}</Quote>
    ),
    [BLOCKS.HR]: () => <Hr />,

    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      const unknownComponent = node.data.target

      const type = getContentType(unknownComponent)

      if (type === 'media') {
        const component = unknownComponent as IMedia

        return <ContentfulMedia {...component} />
      }

      if (type === 'codeBlock') {
        const component = unknownComponent as ICodeBlock

        return <CodeBlock {...component.fields} />
      }

      if (type === 'codePenEmbed') {
        const component = unknownComponent as ICodePenEmbed

        return <CodePenEmbed {...component.fields} />
      }
    },

    [INLINES.HYPERLINK]: (props, children: ReactNode) => {
      return <Link href={props.data.uri}>{children}</Link>
    },
  },
  renderMark: {
    [MARKS.CODE]: (text) => <CodeInline>{text}</CodeInline>,
  },
  renderText: (text: string) =>
    text.split('\n').map((t, i) =>
      i > 0 ? (
        <React.Fragment key={`${i}-${t.slice(0, 5)}`}>
          <br />
          {t}
        </React.Fragment>
      ) : (
        t
      ),
    ),
}

export const RichText: FC<{
  content?: Document
  className?: string
}> = ({ content, className }) => {
  return (
    <RichTextContainer className={className}>
      {documentToReactComponents(content, options)}
    </RichTextContainer>
  )
}
