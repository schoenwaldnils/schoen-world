import styled from '@emotion/styled'
import { GetStaticProps, GetStaticPropsResult, NextPage } from 'next'

import { IPage } from '../@types/generated/contentful'
import { Page } from '../components/Page'
import { RichText } from '../components/RichText'
import { Stack } from '../components/Stack'
import { Headline1 } from '../components/Typography'
import { getPageBySlug } from '../utils/contentful'
import { maxWidthText, stack, upFromBreakpoint } from '../utils/mixins'

const Content = styled.div`
  ${maxWidthText}
  display: flex;
  align-items: center;
  height: 100%;
  padding-top: 2rem;
  padding-bottom: 2rem;

  ${upFromBreakpoint('small')} {
    padding-top: 3rem;
    padding-bottom: 5rem;
  }
`

const IndexPage: NextPage<{ page: IPage }> = ({ page }) => (
  <Page>
    <Content>
      <Stack>
        <Headline1>{page.fields.title}</Headline1>
        <RichText content={page.fields.richText} />
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
    page?: IPage
  }>
> => {
  const page = (await getPageBySlug('404', preview)) as IPage

  if (!page) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      preview,
      page,
    },
  }
}
