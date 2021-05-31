import styled from '@emotion/styled'
import qs from 'qs'
import { FC } from 'react'

const getParams = (width: number, height?: number, retina = false) => {
  const retinaFactor = 1.5
  const params = {
    fm: 'webp', // format
    q: retina ? 50 : 70, // quality
    w: null,
    h: null,
    fit: null,
  }

  if (width) {
    params.w = retina ? Math.floor(width * retinaFactor) : width
  }

  if (height) {
    params.h = retina ? Math.floor(width * retinaFactor) : width
    params.fit = 'fill'
  }

  const string = qs.stringify(params, { skipNulls: true })

  return string
}

const pictureViewports = {
  lg: 768,
  md: 620,
  sm: 320,
}

const Img = styled.img<{
  width?: number
  height?: number
  backgroundColor?: string
}>`
  ${(p) => p.width && p.height && `aspect-ratio: ${p.width} / ${p.height};`}

  background-color: ${(p) =>
    p.backgroundColor ? p.backgroundColor : 'transparent'};
`

type ImageType = {
  src: string
  alt?: string
  width?: number
  height?: number
  color?: string
  lazy?: boolean
}

export const Image: FC<ImageType> = ({
  src,
  alt,
  width,
  height,
  color,
  lazy,
  ...props
}) => {
  const viewportKeys = Object.keys(pictureViewports)
  const maxWidth = width || 2560

  const ratio = height && height / width

  return (
    <picture>
      {width < pictureViewports.sm && (
        <source
          srcSet={`
        ${src}?${getParams(width, height)} 1x,
        ${src}?${getParams(width, height, true)} 2x
        `}
          key={width}
        />
      )}

      {maxWidth >= pictureViewports.sm &&
        viewportKeys.map((identifier, key) => {
          const currentViewport = pictureViewports[identifier]
          const nextViewport = viewportKeys[key - 1] || null
          const imageSize = pictureViewports[nextViewport] || maxWidth

          if (currentViewport >= maxWidth) return null
          return (
            <source
              srcSet={`
            ${src}?${getParams(imageSize, Math.round(imageSize * ratio))} 1x,
            ${src}?${getParams(
                imageSize,
                Math.round(imageSize * ratio),
                true,
              )} 2x
            `}
              media={`(min-width: ${pictureViewports[identifier]}px)`}
              key={imageSize + maxWidth}
            />
          )
        })}

      <source
        srcSet={`
        ${src}?${getParams(320, Math.round(320 * ratio))} 1x,
        ${src}?${getParams(320, Math.round(320 * ratio), true)} 2x
        `}
      />

      <Img
        src={`${src}?${getParams(320, null)}`}
        backgroundColor={color}
        width={width}
        height={height}
        alt={alt}
        loading={lazy ? 'lazy' : 'eager'}
        {...props}
      />
    </picture>
  )
}
