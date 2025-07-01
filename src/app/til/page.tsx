import { Rss } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

import { TilPosts } from '@/components/TilPosts'

const title = 'Today I Learned'
const description = 'Things I learn and want to remember.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    type: 'website',
    url: `/til`,
    images: [
      {
        url: `/opengraph-image?title=${title}&description=${description}`,
      },
    ],
  },
}

// export async function generateMetadata(
//   props: unknown,
//   parent: ResolvingMetadata,
// ): Promise<Metadata> {
//   // optionally access and extend (rather than replace) parent metadata
//   const previousImages = (await parent).openGraph?.images || []

//   return {
//     metadataBase: new URL(
//       process.env.NEXT_PUBLIC_URL || 'https://schoen.world',
//     ),
//     title: 'Today I Learned',
//     description: 'Things I learn and want to remember.',
//     openGraph: {
//       type: 'website',
//       url: `/til`,
//       images: [
//         {
//           url: `/opengraph-image?type=page&slug=til`,
//         },
//         ...previousImages,
//       ],
//     },
//     // twitter: {
//     //   card: 'summary_large_image',
//     //   title: post.metadata.title,
//     //   description: post.metadata.description,
//     // },
//   }
// }

export default function Page() {
  return (
    <section className="flex flex-col gap-12">
      <div className="flex items-center justify-between">
        <h1 className="h1">Today I Learned</h1>
        <Link
          href="/rss.xml"
          target="_blank"
          className="rounded-sm bg-orange-400 p-1 text-white transition-colors hover:bg-orange-500"
          title="Subscribe to RSS feed"
        >
          <Rss size={16} strokeWidth={3} />
        </Link>
      </div>
      <TilPosts />
    </section>
  )
}
