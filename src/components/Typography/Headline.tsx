import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { upFromBreakpoint } from '../../utils/mixins'

const baseStyles = css`
  font-family: var(--Typography-headlineFontFamily);
  font-weight: var(--Typography-headlineWeight);
  color: var(--Typography-headlineColor, inherit);
`

export const h1Styles = css`
  ${baseStyles}
  font-size: 2rem;
  line-height: 1.1;

  ${upFromBreakpoint('small')} {
    font-size: 2.75rem;
  }
`

export const Headline1 = styled.h1`
  ${h1Styles}
`

export const h2Styles = css`
  ${baseStyles}
  font-size: 1.75rem;
  line-height: 1.2;

  ${upFromBreakpoint('small')} {
    font-size: 2.25rem;
  }
`

export const Headline2 = styled.h2`
  ${h2Styles}
`

export const h3Styles = css`
  ${baseStyles}
  font-size: 1.5rem;
  line-height: 1.3;

  ${upFromBreakpoint('small')} {
    font-size: 1.75rem;
  }
`

export const Headline3 = styled.h3`
  ${h3Styles}
`

export const h4Styles = css`
  ${baseStyles}
  font-size: 1.25rem;
  line-height: 1.2;

  ${upFromBreakpoint('small')} {
    font-size: 1.5rem;
  }
`

export const Headline4 = styled.h4`
  ${h4Styles}
`

export const sublineStyles = css`
  ${baseStyles}
  font-size: 0.75rem;
  line-height: 1.4;
  letter-spacing: 0.15em;
  text-transform: uppercase;
`

export const Subline = styled.div`
  ${sublineStyles}
`
