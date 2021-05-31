import styled from '@emotion/styled'
import NextLink, { LinkProps } from 'next/link'
import { AnchorHTMLAttributes, FC } from 'react'
import { VscLinkExternal } from 'react-icons/vsc'

import { timings } from '../../data/config'

const ExternalIcon = styled(VscLinkExternal)`
  font-size: 0.8em;
`

const StyledA = styled.a`
  position: relative;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  white-space: nowrap;
  transition: color ${timings.transition}ms;

  ::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: currentColor;
    transform: scaleX(0);
    transition: transform ${timings.transition}ms;
  }

  :hover::after {
    transform: scaleX(1);
  }

  &,
  &:visited {
    color: var(--Typography-linkColor);
  }

  :hover {
    color: var(--Typography-linkHover);
  }

  :active {
    color: var(--Typography-linkActive);
  }
`

export const Link: FC<AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps> = ({
  href,
  children,
  className,
  ...p
}) => {
  const isExternal = href.includes('http')
  const isHash = href.startsWith('#')

  if (isHash) {
    return (
      <StyledA
        href={href}
        className={className}
        target={isExternal ? '_blank' : '_self'}
      >
        {children}
        {isExternal && <ExternalIcon />}
      </StyledA>
    )
  }

  return (
    <NextLink {...p} href={href} passHref={isExternal}>
      <StyledA
        href={href}
        className={className}
        target={isExternal ? '_blank' : '_self'}
      >
        {children}
        {/* {isExternal && <ExternalIcon />} */}
      </StyledA>
    </NextLink>
  )
}
