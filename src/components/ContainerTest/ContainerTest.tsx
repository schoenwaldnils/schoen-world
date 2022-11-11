import styled from '@emotion/styled'
import Script from 'next/script'
import { FC } from 'react'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const Container = styled.div`
  width: 500px;
  height: 200px;
  resize: both;
  background-color: #f00;
  padding: 5em 1em;

  @container (min-width: 200px) {
    background-color: #f0f;
  }
`

export const ContainerTest: FC = () => {
  return (
    <Wrapper>
      <Script
        src="https://unpkg.com/container-query-polyfill/cqfill.iife.min.js"
        strategy="afterInteractive"
      />
      <Container>Component: ContainerTest</Container>
    </Wrapper>
  )
}
