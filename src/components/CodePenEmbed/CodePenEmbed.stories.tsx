import { FC } from 'react'

import { ICodePenEmbedFields } from '../../@types/generated/contentful'
import { CodePenEmbed as CodePenEmbedComponent } from './CodePenEmbed'

export default {
  title: 'Code Pen Embed',
  component: CodePenEmbedComponent,
  parameters: {
    percy: { skip: true }, // part of article
  },
}

const mock = {
  title: 'flexbox-sticky-footer',
  username: 'schoenwaldnils',
  id: 'c00705534da233982aa90ed744e36377',
  height: 610,
  defaultPanes: ['css', 'result'],
} as unknown as ICodePenEmbedFields

export const CodePenEmbed: FC = () => <CodePenEmbedComponent {...mock} />
