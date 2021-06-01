import React, { FC } from 'react'

import { RichText as RichTextComponent } from './index'
import { richText } from './richText.mock' // contentful ID 4iGBcSU5HQj2vEcHn0Huts

export default {
  title: 'Typography / Rich Text',
  component: RichTextComponent,
  parameters: {
    percy: { skip: true }, // part of article
  },
}

export const RichText: FC = () => <RichTextComponent content={richText} />
