import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

import { FC } from 'react'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'

export const YoutubeEmbed: FC<{ id: string; title?: string }> = ({
  id,
  title,
}) => {
  return <LiteYouTubeEmbed id={id} title={title || ''} />
}
