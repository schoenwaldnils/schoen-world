import { FC } from 'react'

import { Video as VideoComponent } from './Video'

export default {
  title: 'Video',
  component: VideoComponent,
}

export const Video: FC = () => (
  <VideoComponent src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" />
)
