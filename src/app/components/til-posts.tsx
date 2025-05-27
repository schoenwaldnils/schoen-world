import Link from 'next/link'

import { formatDate, getTilPosts } from '@/lib/utils/content'

export function TilPosts() {
  const allTils = getTilPosts()

  return (
    <div>
      {allTils
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="mb-4 flex flex-col space-y-1"
            href={`/til/${post.slug}`}
          >
            <div className="flex w-full flex-col space-x-0 md:flex-row md:space-x-2">
              <p className="w-[100px] text-neutral-600 tabular-nums dark:text-neutral-400">
                {formatDate(post.metadata.publishedAt)}
              </p>
              <p className="tracking-tight text-neutral-900 dark:text-neutral-100">
                {post.metadata.title}
              </p>
            </div>
          </Link>
        ))}
    </div>
  )
}
