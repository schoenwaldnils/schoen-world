import { ComponentPropsWithoutRef } from 'react'

import { NotesList, NotesListProps } from '@/components/NotesList'

export const MDXNotesList = (
  props: ComponentPropsWithoutRef<'div'> & NotesListProps,
) => <NotesList {...props} />
