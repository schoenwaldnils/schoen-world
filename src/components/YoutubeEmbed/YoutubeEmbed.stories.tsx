import { FC } from 'react'

import { YoutubeEmbed as YoutubeEmbedComponent } from './YoutubeEmbed'

export default {
  title: 'Youtube Embed',
  component: YoutubeEmbedComponent,
  parameters: {
    percy: { skip: true }, // part of article
  },
}

export const YoutubeEmbed: FC = () => <YoutubeEmbedComponent id="lX6JcybgDFo" />
