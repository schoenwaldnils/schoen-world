import { Metadata } from 'next'

import Page from './[slug]/page'

const title = 'Nils Schönwald'
const description = 'Software engineer and tinkerer.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    type: 'website',
    url: `/`,
    images: [
      {
        url: `/opengraph-image?title=${title}&description=${description}`,
      },
    ],
  },
}

export default function Home() {
  return <Page params={Promise.resolve({ slug: 'home' })} />
}
