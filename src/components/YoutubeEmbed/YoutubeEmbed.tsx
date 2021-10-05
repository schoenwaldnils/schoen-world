import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

import qs from 'qs'
import { FC } from 'react'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'

export const YoutubeEmbed: FC<{ id: string; title?: string }> = ({
  id,
  title,
}) => {
  const params = {
    rel: '0',
  }

  return (
    <LiteYouTubeEmbed
      id={id}
      title={title || ''}
      playlist={false}
      params={qs.stringify(params)}
      announce="Watch" // TODO: remove when released https://github.com/ibrahimcesar/react-lite-youtube-embed/pull/34
    />
  )
}
