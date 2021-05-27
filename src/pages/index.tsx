import styled from '@emotion/styled'
import { NextPage } from 'next'

import { Page } from '../components/Page'
import { upFromBreakpoint } from '../utils/mixins'

const Content = styled.div`
  padding: 1rem;

  ${upFromBreakpoint('small')} {
    padding: 3rem;
  }
`

const IndexPage: NextPage = () => (
  <Page>
    <Content />
  </Page>
)

export default IndexPage
