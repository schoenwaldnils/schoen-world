import NextImage, { ImageProps } from 'next/image'
import qs from 'qs'
import { FC } from 'react'

const contentfulLoader = ({ src, width, height, quality }) => {
  const params = {
    fm: 'webp', // format
    w: width || null,
    h: height || null,
    q: quality || 75,
  }

  return `https:${src}?${qs.stringify(params, { skipNulls: true })}`
}

export const Image: FC<ImageProps & { lazy?: boolean }> = ({
  lazy = true,
  ...props
}) => {
  return (
    <NextImage
      loader={contentfulLoader}
      loading={lazy ? 'lazy' : 'eager'}
      {...props}
    />
  )
}
