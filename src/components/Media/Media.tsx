import styled from '@emotion/styled'
import { FC } from 'react'

import { IMediaFields } from '../../@types/generated/contentful'
import { Image } from '../Image'
import { sublineStyles } from '../Typography'
import { Video } from '../Video'
import { YoutubeEmbed } from '../YoutubeEmbed'

const Figure = styled.figure`
  display: inline-block;
  margin-right: 0;
  margin-left: 0;
`

const Figcaption = styled.figcaption`
  ${sublineStyles}
  text-transform: none;
`

const FigureComponent: FC<{ description?: string }> = ({
  children,
  description,
}) => (
  <Figure>
    {children}
    {description && <Figcaption>{description}</Figcaption>}
  </Figure>
)

export const Media: FC<IMediaFields> = ({
  asset,
  description,
  altText,
  youtubeVideoId,
}) => {
  if (asset) {
    if (!asset.fields?.file?.url) {
      return null
    }

    const fileType = asset.fields.file.contentType

    if (fileType.includes('image')) {
      return (
        <FigureComponent description={description}>
          <Image src={asset.fields?.file?.url} alt={altText} />
        </FigureComponent>
      )
    }

    if (fileType.includes('video')) {
      return (
        <FigureComponent description={description}>
          <Video src={asset.fields?.file?.url} />
        </FigureComponent>
      )
    }

    return null
  }

  if (youtubeVideoId) {
    return <YoutubeEmbed id={youtubeVideoId} title={description} />
  }

  return null
}
