import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { FC } from 'react'

import { IMediaFields } from '../../@types/generated/contentful'
import { Avatar } from '../Avatar'
import { Image } from '../Image'
import { sublineStyles } from '../Typography'
import { Video } from '../Video'
import { YoutubeEmbed } from '../YoutubeEmbed'

const floatCss = (float: 'left' | 'right') => css`
  display: inline;
  float: ${float || 'none'};
  margin-right: ${float === 'left' ? '.5em' : '0'};
  margin-bottom: 0.5em;
  margin-left: ${float === 'right' ? '.5em' : '0'};
`

const Figure = styled.figure<{
  width?: number
  float?: 'left' | 'right'
}>`
  display: inline-block;

  ${(p) => p.width && `width: ${p.width}px;`}
  ${(p) => p.float && floatCss(p.float)};
`

const Figcaption = styled.figcaption`
  ${sublineStyles}
  text-transform: none;
`

const FigureComponent: FC<{
  width?: number
  float?: 'left' | 'right'
  description?: string
}> = ({ children, float, width, description }) => (
  <Figure float={float} width={width}>
    {children}
    {description && <Figcaption>{description}</Figcaption>}
  </Figure>
)

export const Media: FC<IMediaFields> = ({
  internalName,
  asset,
  description,
  altText,
  youtubeVideoId,
  float,
  width,
}) => {
  if (asset) {
    if (!asset.fields?.file?.url) {
      return null
    }

    if (internalName === 'Nils profile picture') {
      return <Avatar src={asset.fields?.file?.url} alt="Nils Schönwald" />
    }

    const file = asset.fields.file
    const fileType = file.contentType

    if (fileType.includes('image')) {
      return (
        <FigureComponent description={description} float={float} width={width}>
          <Image
            src={file.url}
            alt={altText}
            width={file.details.image.width}
            height={file.details.image.height}
          />
        </FigureComponent>
      )
    }

    if (fileType.includes('video')) {
      return (
        <FigureComponent description={description} float={float} width={width}>
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
