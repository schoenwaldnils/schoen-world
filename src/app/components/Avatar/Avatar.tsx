import clsx from 'clsx'
import Image from 'next/image'

import css from './Avatar.module.css'
import nilsPhoto from './nils-schoenwald.jpg'

export const Avatar = ({ className }: { className?: string }) => {
  return (
    <Image
      src={nilsPhoto}
      alt="Nils Schönwald"
      width={200}
      height={200}
      className={clsx(css.avatarImage, className)}
      priority
    />
  )
}
