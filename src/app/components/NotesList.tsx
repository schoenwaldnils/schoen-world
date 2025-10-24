import { Link } from 'next-view-transitions'

import { getNotes } from '@/utils/content'
import { formatDate } from '@/utils/formatDate'

export const NotesList = ({ tag }: { tag?: string }) => {
  const allNotes = getNotes()
    .filter((note) => !tag || note.metadata.tags?.includes(tag))
    .sort((a, b) => {
      if (a.metadata.publishedAt && b.metadata.publishedAt) {
        return (
          new Date(b.metadata.publishedAt).getTime() -
          new Date(a.metadata.publishedAt).getTime()
        )
      }
      return 0
    })

  return (
    <div className="grid grid-cols-[1fr_auto] gap-4 gap-y-8">
      {allNotes.map(
        ({ slug, metadata: { title, description, publishedAt } }) => (
          <Link
            key={slug}
            href={`/n/${slug}`}
            className="col-span-2 grid grid-cols-subgrid p-2 transition-colors hover:bg-brand/10 dark:hover:bg-white/5"
          >
            <article className="col-span-2 grid grid-cols-subgrid">
              <div className="col-start-1 text-neutral-900 dark:text-neutral-100">
                <h2 className="h4 mt-0">{title}</h2>

                {description && (
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {description}
                  </p>
                )}
              </div>

              {publishedAt && (
                <p className="col-start-2 text-neutral-600 tabular-nums dark:text-neutral-400">
                  {formatDate(publishedAt)}
                </p>
              )}
            </article>
          </Link>
        ),
      )}
    </div>
  )
}
