import Link from 'next/link'

import { getTilPostsMetadata } from '@/lib/utils/content'
import { formatDate } from '@/lib/utils/formatDate'

export function TilPosts() {
  const allTils = getTilPostsMetadata()

  return (
    <div className="grid grid-cols-[1fr_auto] gap-4 gap-y-8">
      {allTils.map((post) => (
        <Link
          key={post.slug}
          href={`/til/${post.slug}`}
          className="col-span-2 grid grid-cols-subgrid p-2 transition-colors hover:bg-brand/10 dark:hover:bg-white/5"
        >
          <article className="col-span-2 grid grid-cols-subgrid">
            <div className="col-start-1 text-neutral-900 dark:text-neutral-100">
              <h2 className="h4 mt-0">{post.metadata.title}</h2>

              <p className="text-neutral-600 dark:text-neutral-400">
                {post.metadata.description}
              </p>
            </div>

            <p className="col-start-2 text-neutral-600 tabular-nums dark:text-neutral-400">
              {formatDate(post.metadata.publishedAt)}
            </p>
          </article>
        </Link>
      ))}
    </div>
  )
}
