import { FC } from 'react'

import { IPostFields } from '../../@types/generated/contentful'
import { PostTeaser as PostTeaserComponent } from './PostTeaser'
import mock from './postTeaserMock.json'

export default {
  title: 'Post Teaser',
  component: PostTeaserComponent,
}

export const PostTeaser: FC = () => (
  <PostTeaserComponent {...(mock as unknown as IPostFields)} />
)
