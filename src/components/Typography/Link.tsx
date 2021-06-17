import styled from '@emotion/styled'
import NextLink, { LinkProps } from 'next/link'
import { AnchorHTMLAttributes, FC } from 'react'

// import { VscLinkExternal } from 'react-icons/vsc'
import { timings } from '../../data/config'

// const ExternalIcon = styled(VscLinkExternal)`
//   font-size: 0.7em;
//   margin-left: 0.5ch;
// `

const StyledA = styled.a`
  --verticalPadding: 0.5em;
  position: relative;
  display: inline-flex;
  align-items: center;
  margin-top: calc(var(--verticalPadding) * -1);
  margin-bottom: calc(var(--verticalPadding) * -1);
  padding-top: var(--verticalPadding);
  padding-bottom: var(--verticalPadding);
  text-decoration: none;
  white-space: nowrap;
  transition: color ${timings.transition}ms;

  ::after {
    content: '';
    position: absolute;
    bottom: var(--verticalPadding);
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

  if (isHash || isExternal) {
    return (
      <StyledA
        href={href}
        className={className}
        target={isExternal ? '_blank' : '_self'}
        {...(isExternal ? { rel: 'noopener' } : {})}
      >
        {children}
        {/* {isExternal && <ExternalIcon />} */}
      </StyledA>
    )
  }

  return (
    <NextLink {...p} href={href} passHref={isExternal}>
      <StyledA href={href} className={className}>
        {children}
      </StyledA>
    </NextLink>
  )
}
