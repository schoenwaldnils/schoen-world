import styled from '@emotion/styled'
import { GetStaticProps, GetStaticPropsResult, NextPage } from 'next'
import { FaRssSquare } from 'react-icons/fa'

import { IPost } from '../../@types/generated/contentful'
import { ItemList } from '../../components/ItemList'
import { Page } from '../../components/Page'
import { PostTeaser } from '../../components/PostTeaser'
import { Stack } from '../../components/Stack'
import { getEntryCollection } from '../../utils/contentful'
import { generateRss } from '../../utils/generateRss'
import { upFromBreakpoint } from '../../utils/mixins'

const Content = styled.div`
  padding: 1rem;

  ${upFromBreakpoint('small')} {
    padding: 3rem;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
`

const RssLink = styled.a`
  display: inline-block;
  color: var(--Theme-colorRss, orange);

  > svg {
    display: block;
    cursor: pointer;
  }
`

const IndexPage: NextPage<{ posts: IPost[] }> = ({ posts }) => (
  <Page>
    <Content>
      <Stack>
        <Header>
          <RssLink href="/rss.xml" target="rss">
            <FaRssSquare />
          </RssLink>
        </Header>

        <ItemList itemMinWidth={400}>
          {posts.map((i) => (
            <PostTeaser {...i.fields} key={i.sys.id} />
          ))}
        </ItemList>
      </Stack>
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

  await generateRss(posts)

  return {
    props: {
      preview,
      posts,
    },
  }
}
