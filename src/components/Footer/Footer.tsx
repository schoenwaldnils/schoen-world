import styled from '@emotion/styled'
import { FC } from 'react'

import { social } from '../../data/config'
import { maxWidthText, upFromBreakpoint } from '../../utils/mixins'
import { SocialIcon } from '../SocialIcon'
import { ThemeSwitch } from '../ThemeSwitch'
import { Link } from '../Typography'

const FooterContainer = styled.footer`
  padding-top: 1rem;
  padding-bottom: 1rem;
  font-size: 1rem;
  color: var(--Footer-color);
  background-color: var(--Footer-background);
  border-bottom: solid 2px var(--Theme-themeColor);

  ${upFromBreakpoint('medium')} {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
`

const Content = styled.div`
  ${maxWidthText}
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  grid-gap: 1rem;
  align-items: center;

  ${upFromBreakpoint('small')} {
    flex-direction: row;
  }
`

const SocialLinks = styled.div`
  display: flex;
  grid-gap: 1em;
`

const socialLinks = [
  {
    name: 'Twitter',
    href: social.links.twitter,
  },
  {
    name: 'Github',
    href: social.links.github,
  },
]

const Copy = styled.div``

const footerNav = [
  {
    url: '/imprint',
    text: 'Imprint',
  },
]

const Nav = styled.nav`
  display: flex;
  grid-gap: 1em;
`

const NavItem = styled(Link)`
  &,
  &:visited {
    color: var(--Footer-color);
  }

  &:hover {
    color: var(--Footer-color);
    text-decoration: underline;
  }
`

export const Footer: FC = () => {
  return (
    <FooterContainer>
      <Content>
        <Copy>{`© ${new Date().getFullYear()} Nils Schönwald`}</Copy>

        <Nav>
          {footerNav.map((item) => (
            <NavItem href={item.url} title={item.text} key={item.text}>
              {item.text}
            </NavItem>
          ))}
        </Nav>

        <SocialLinks>
          {socialLinks.map((i) => (
            <SocialIcon name={i.name} href={i.href} key={i.href} />
          ))}
        </SocialLinks>

        <ThemeSwitch />
      </Content>
    </FooterContainer>
  )
}
