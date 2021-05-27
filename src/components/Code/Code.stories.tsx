import { FC } from 'react'

import { CodeBlock } from './CodeBlock'
import { CodeInline } from './CodeInline'

export default {
  title: 'Code',
}

export const Inline: FC = () => <CodeInline>some code</CodeInline>

export const Block: FC = () => (
  <CodeBlock internalName="lorem" syntax="html" code="some code more code" />
)
