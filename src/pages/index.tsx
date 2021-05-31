import styled from '@emotion/styled'
import { GetStaticProps, GetStaticPropsResult, NextPage } from 'next'

import { IPage } from '../@types/generated/contentful'
import { Page } from '../components/Page'
import { RichText } from '../components/RichText'
import { getPageBySlug } from '../utils/contentful'
import { maxWidthText, upFromBreakpoint } from '../utils/mixins'

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
      <RichText content={page.fields.richText} />
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
  const page = (await getPageBySlug('about', preview)) as IPage

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
