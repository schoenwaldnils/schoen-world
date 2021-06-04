import NextImage, { ImageProps } from 'next/image'
import qs from 'qs'
import { FC } from 'react'

const contentfulLoader = ({ src, width, quality }) => {
  const params = {
    fm: 'webp', // format
    w: width || null,
    q: quality || 75,
  }

  return `https:${src}?${qs.stringify(params, { skipNulls: true })}`
}

export const Image: FC<ImageProps> = ({ src, ...props }) => {
  if (src.includes('ctfassets')) {
    return <NextImage loader={contentfulLoader} src={src} {...props} />
  }

  // eslint-disable-next-line jsx-a11y/alt-text
  return <img src={src} {...props} />
}
