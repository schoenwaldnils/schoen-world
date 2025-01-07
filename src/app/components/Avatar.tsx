import Image from 'next/image'
import nilsPhoto from './nils-schoenwald.jpg'

const Avatar = () => {
  return (
    <div className="flex justify-end mb-8">
      <Image
        src={nilsPhoto}
        alt="Nils Schönwald"
        width={200}
        height={200}
        className="rounded-full grayscale contrast-[1.05] brightness-[1.15] hover:grayscale-[0.25] transition-all border-2 border-charcoal dark:border-white"
        priority
      />
    </div>
  )
}

export default Avatar
