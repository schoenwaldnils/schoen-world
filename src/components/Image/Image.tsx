/* eslint-disable jsx-a11y/alt-text */
import NextImage, { ImageProps } from 'next/image'
import { FC } from 'react'

type ImageType =
  | (ImageProps & { isExternal?: never })
  | (Exclude<ImageProps, 'src'> & {
      src: string
      isExternal: boolean
    })

export const Image: FC<ImageType> = ({ isExternal, ...props }) => {
  if (isExternal) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img {...props} src={props.src as string} loading="lazy" />
    )
  }

  const isContentful = (props.src as string).includes('ctfassets')

  if (isContentful) {
    props.src = `https:${props.src}` as typeof props.src
  }

  return <NextImage {...props} />
}
