import Image from 'next/image'
import nilsPhoto from './nils-schoenwald.jpg'
import css from './Avatar.module.css'

export const Avatar = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`${css.avatarContainer} ${className}`}>
      <Image
        src={nilsPhoto}
        alt="Nils Schönwald"
        width={200}
        height={200}
        className={css.avatarImage}
        priority
      />
    </div>
  )
}
