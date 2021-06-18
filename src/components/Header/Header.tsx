import styled from '@emotion/styled'
import Link from 'next/link'
import { FC } from 'react'

import { upFromBreakpoint } from '../../utils/mixins'
import { Link as TypographyLink } from '../Typography'
import { ReactComponent as LogoSvg } from './schoenwald-logo.svg'

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 1rem;
  padding: 1rem;
  color: var(--Header-color);
  background-color: var(--Header-background);

  ${upFromBreakpoint('medium')} {
    flex-direction: row;
    justify-content: space-between;
  }
`

const LogoWrapper = styled.a`
  display: block;
  cursor: pointer;

  > svg {
    display: block;
    width: 16rem;
  }
`

const Nav = styled.nav`
  display: flex;
  justify-content: space-evenly;
  grid-gap: 2rem;
`

const NavItem = styled(TypographyLink)`
  margin-right: 1em;
  margin-left: 1em;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: 0.15em;
  cursor: pointer;

  &,
  &:hover,
  &:visited {
    color: var(--Header-color);
  }
`

const navItems = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'Blog',
    url: '/blog',
  },
]

export const Header: FC = () => {
  return (
    <HeaderContainer>
      <Link href="/" passHref>
        <LogoWrapper aria-label="Logo with link to home page">
          <LogoSvg />
        </LogoWrapper>
      </Link>
      <Nav>
        {navItems.map((item) => (
          <NavItem href={item.url} key={`nav-item-${item.url}`}>
            {item.title}
          </NavItem>
        ))}
      </Nav>
    </HeaderContainer>
  )
}
