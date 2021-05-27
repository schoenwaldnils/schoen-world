import styled from '@emotion/styled'
import NextLink, { LinkProps } from 'next/link'
import { AnchorHTMLAttributes, FC } from 'react'
import { VscLinkExternal } from 'react-icons/vsc'

import { colors } from '../../data/colors'
import { timings } from '../../data/config'

const ExternalIcon = styled(VscLinkExternal)`
  position: absolute;
  right: 0;
  bottom: calc(100% - 0.5em);
  font-size: 0.5em;
  opacity: 0;
  transform: translateY(100%);
  transition: transform ${timings.transition}ms, opacity ${timings.transition}ms;
`

const StyledA = styled.a`
  position: relative;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  white-space: nowrap;

  &,
  &:visited {
    color: ${colors.typographyLinkColor};
  }

  :active {
    color: ${colors.typographyLinkActive};
  }

  :hover {
    color: ${colors.typographyLinkHover};

    text-decoration: underline;

    ${ExternalIcon} {
      opacity: 1;
      transform: translateY(0);
    }
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
        {/* {isExternal && <ExternalIcon />} */}
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
