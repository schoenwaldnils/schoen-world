import { Rss as RssIcon } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { NotesList } from '@/components/NotesList'

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
          <RssIcon size={16} strokeWidth={3} />
        </Link>
      </div>
      <NotesList tag="til" />
    </section>
  )
}
