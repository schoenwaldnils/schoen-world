import { FC } from 'react'

import { Author as AuthorComponent } from './Author'

export default {
  title: 'Author',
  component: AuthorComponent,
}

export const Author: FC = () => (
  <AuthorComponent />
)
