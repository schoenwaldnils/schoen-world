import { Rss } from 'lucide-react'
import Link from 'next/link'

import { TilPosts } from '@/components/TilPosts'

export const metadata = {
  title: 'Today I Learned',
  description: 'Things I learn and want to remember.',
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
          <Rss size={16} strokeWidth={3} />
        </Link>
      </div>
      <TilPosts />
    </section>
  )
}
