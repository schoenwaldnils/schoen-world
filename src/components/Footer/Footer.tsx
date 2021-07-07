import styled from '@emotion/styled'
import { FC } from 'react'
import { WebVitals } from 'web-vitals-react-hook'

import { social } from '../../data/config'
import { upFromBreakpoint } from '../../utils/mixins'
import { baseColors } from '../GlobalStyles/theme'
import { SocialIcon } from '../SocialIcon'
import { ThemeSwitch } from '../ThemeSwitch'
import { Headline4, Link } from '../Typography'

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  grid-gap: 2rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  color: var(--Footer-color);
  background-color: var(--Footer-background);
  border-bottom: solid 2px var(--Theme-themeColor);

  ${upFromBreakpoint('medium')} {
    flex-direction: row;
    justify-content: space-around;
    padding-top: 2rem;
    padding-bottom: 2rem;
    font-size: 0.8rem;
  }

  --Typography-headlineColor: var(--Footer-color);
  --Typography-linkColor: ${baseColors.redPlus2};
  --Typography-linkHover: ${baseColors.redPlus2};
  --Typography-linkActive: ${baseColors.redPlus2};

  [color-scheme='dark'] {
    --Typography-linkColor: ${baseColors.redPlus1};
    --Typography-linkHover: ${baseColors.white};
    --Typography-linkActive: ${baseColors.white};
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  grid-gap: 1rem;
  align-items: center;
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

const Copy = styled.div`
  text-align: center;

  span {
    white-space: nowrap;
  }
`

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

const StyledWebVitals = styled(WebVitals)`
  --metricGood: lightgreen;

  grid-row-gap: 0.5em;
  margin-top: 0;
  margin-bottom: 0;

  > * {
    white-space: nowrap;
  }
`

export const Footer: FC = () => {
  return (
    <FooterContainer>
      <Content>
        <ThemeSwitch />

        <SocialLinks>
          {socialLinks.map((i) => (
            <SocialIcon name={i.name} href={i.href} key={i.href} />
          ))}
        </SocialLinks>
      </Content>

      <Content>
        <Nav>
          {footerNav.map((item) => (
            <NavItem href={item.url} title={item.text} key={item.text}>
              {item.text}
            </NavItem>
          ))}
        </Nav>

        <Copy>
          <span>{`© ${new Date().getFullYear()}`}</span>{' '}
          <span>Nils Schönwald</span>
        </Copy>
      </Content>

      <Content>
        <Headline4>Web Vitals</Headline4>
        <StyledWebVitals LinkComponent={Link} />
      </Content>
    </FooterContainer>
  )
}
