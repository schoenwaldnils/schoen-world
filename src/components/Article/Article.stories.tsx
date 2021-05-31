import { FC } from 'react'

import { IPostFields } from '../../@types/generated/contentful'
import { Article as ArticleComponent } from './Article'
import articleMock from './articleMock.json'

export default {
  title: 'Article',
  component: ArticleComponent,
}

export const Article: FC = () => (
  <ArticleComponent
    {...(articleMock as unknown as IPostFields)}
    showComments={false}
  />
)
