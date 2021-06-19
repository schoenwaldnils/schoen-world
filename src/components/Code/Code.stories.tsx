import { FC } from 'react'

import { CodeBlock } from './CodeBlock'
import { CodeInline } from './CodeInline'

export default {
  title: 'Code',
  parameters: {
    percy: { skip: true }, // part of article
  },
}

export const Inline: FC = () => <CodeInline>some code</CodeInline>

export const Block: FC = () => (
  <CodeBlock
    internalName="lorem"
    syntax="css"
    code={
      'html,\nbody {\n  display: flex;\n  flex-direction: column;\n}\nbody {\n  min-height: 100vh;\n}'
    }
  />
)
