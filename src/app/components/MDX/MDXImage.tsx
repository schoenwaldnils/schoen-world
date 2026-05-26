import Image from 'next/image'
import { ComponentPropsWithoutRef } from 'react'

export const MDXImage = (props: ComponentPropsWithoutRef<'img'>) => {
  if (!props.src || typeof props.src !== 'string') {
    return null
  }

  return (
    <Image
      src={props.src}
      alt={props.alt ?? ''}
      width={props.width ? Number(props.width) : 1600}
      height={props.height ? Number(props.height) : 1200}
      sizes="(max-width: 768px) 100vw, 672px"
      style={{ width: '100%', height: 'auto' }}
    />
  )
}
