import styled from '@emotion/styled'
import { FC } from 'react'

import { Footer } from '../Footer'
import { Header } from '../Header'

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Content = styled.section`
  flex-grow: 1;
`

export const Page: FC = ({ children }) => {
  return (
    <PageContainer>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </PageContainer>
  )
}
