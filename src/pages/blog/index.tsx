import styled from '@emotion/styled'
import { GetStaticProps, GetStaticPropsResult, NextPage } from 'next'

import { IPost } from '../../@types/generated/contentful'
import { ItemList } from '../../components/ItemList'
import { Page } from '../../components/Page'
import { PostTeaser } from '../../components/PostTeaser'
import { getEntryCollection } from '../../utils/contentful'
import { upFromBreakpoint } from '../../utils/mixins'

const Content = styled.div`
  padding: 1rem;

  ${upFromBreakpoint('small')} {
    padding: 3rem;
  }
`

const IndexPage: NextPage<{ posts: IPost[] }> = ({ posts }) => (
  <Page>
    <Content>
      <ItemList itemMinWidth={400}>
        {posts.map((i) => (
          <PostTeaser {...i.fields} key={i.sys.id} />
        ))}
      </ItemList>
    </Content>
  </Page>
)

export default IndexPage

export const getStaticProps: GetStaticProps = async ({
  preview = false,
}): Promise<
  GetStaticPropsResult<{
    preview: boolean
    posts: IPost[]
  }>
> => {
  const posts = await getEntryCollection('post', false, '-fields.date')

  return {
    props: {
      preview,
      posts,
    },
  }
}
