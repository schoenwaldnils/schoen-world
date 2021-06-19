import styled from '@emotion/styled'
import { FC } from 'react'

import { ThemeSwitch as ThemeSwitchComponent } from './ThemeSwitch'

export default {
  title: 'Theme Switch',
  component: ThemeSwitchComponent,
  parameters: {
    percy: { skip: true }, // part of footer
  },
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  > * + * {
    margin-top: 0.5rem;
  }
`

export const ThemeSwitch: FC = () => (
  <Container>
    <ThemeSwitchComponent />
  </Container>
)
