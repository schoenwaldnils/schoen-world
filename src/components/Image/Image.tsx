/* eslint-disable jsx-a11y/alt-text */
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

type ImageType =
  | (ImageProps & { isExternal?: never })
  | (Exclude<ImageProps, 'src'> & {
      src: string
      isExternal: boolean
    })

export const Image: FC<ImageType> = ({ isExternal, ...props }) => {
  if (isExternal) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} src={props.src as string} loading="lazy" />
  }

  const isContentful = (props.src as string).includes('ctfassets')

  return (
    <NextImage
      loader={isContentful ? contentfulLoader : undefined}
      {...props}
    />
  )
}
