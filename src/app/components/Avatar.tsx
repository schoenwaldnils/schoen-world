import Image from 'next/image'
import nilsPhoto from './nils-schoenwald.jpg'

const Avatar = () => {
  return (
    <div className="flex justify-end mb-8">
      <Image
        src={nilsPhoto}
        alt="Nils Schönwald"
        width={200}
        height={2006}
        className="rounded-full grayscale contrast-[1.05] brightness-[1.15] hover:grayscale-[0.25] transition-all"
        priority
      />
    </div>
  )
}

export default Avatar
