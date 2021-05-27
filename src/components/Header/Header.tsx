import styled from '@emotion/styled'
import Link from 'next/link'
import { FC } from 'react'

import { colors } from '../../data/colors'
import { ReactComponent as LogoSvg } from './schoenwald-logo.svg'

const HeaderContainer = styled.header`
  padding: 1rem;
  color: ${colors.headerColor};
  background-color: ${colors.headerBackground};
`

const LogoWrapper = styled.a`
  font-size: 3.5rem;
  cursor: pointer;

  > svg {
    display: block;
    width: ${970 / 160}em;
  }
`

export const Header: FC = () => {
  return (
    <HeaderContainer>
      <Link href="/">
        <LogoWrapper>
          <LogoSvg />
        </LogoWrapper>
      </Link>
    </HeaderContainer>
  )
}
