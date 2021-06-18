import { NextPage } from 'next'
import Image from 'next/image'

import exampleImg from '../data/example.png'

const Page: NextPage = () => (
  <Image
    src={exampleImg}
    width={1024}
    height={700}
    layout="responsive"
    objectFit="cover"
    objectPosition="center"
    placeholder="blur"
  />
)

export default Page
