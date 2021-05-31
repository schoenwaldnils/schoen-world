import { FC } from 'react'

import { IAuthorFields } from '../../@types/generated/contentful'
import { Author as AuthorComponent } from './Author'
import mock from './authorMock.json'

export default {
  title: 'Author',
  component: AuthorComponent,
}

export const Author: FC = () => (
  <AuthorComponent {...(mock as unknown as IAuthorFields)} />
)
