import Link from 'next/link'

import { getNotes } from '@/utils/content'
import { formatDate } from '@/utils/formatDate'

export async function NotesList({ tag }: { tag?: string }) {
  const allNotes = (await getNotes())
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
      {allNotes.map((note) => (
        <Link
          key={note.slug}
          href={`/n/${note.slug}`}
          className="col-span-2 grid grid-cols-subgrid p-2 transition-colors hover:bg-brand/10 dark:hover:bg-white/5"
        >
          <article className="col-span-2 grid grid-cols-subgrid">
            <div className="col-start-1 text-neutral-900 dark:text-neutral-100">
              <h2 className="h4 mt-0">{note.metadata.title}</h2>

              <p className="text-neutral-600 dark:text-neutral-400">
                {note.metadata.description}
              </p>
            </div>

            <p className="col-start-2 text-neutral-600 tabular-nums dark:text-neutral-400">
              {formatDate(note.metadata.publishedAt)}
            </p>
          </article>
        </Link>
      ))}
    </div>
  )
}
