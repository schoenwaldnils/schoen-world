import { FC } from 'react'

import { Video as VideoComponent } from './Video'

export default {
  title: 'Video',
  component: VideoComponent,
  parameters: {
    percy: { skip: true },
  },
}

export const Video: FC = () => (
  <VideoComponent src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" />
)
