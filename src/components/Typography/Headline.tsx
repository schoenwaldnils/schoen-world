import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { upFromBreakpoint } from '../../utils/mixins'

export const h1Styles = css`
  font-family: var(--Typography-headlineFontFamily);
  font-size: 2rem;
  font-weight: var(--Typography-headlineWeight);
  line-height: 1.1;
  color: var(--Typography-headlineColor, inherit);

  ${upFromBreakpoint('small')} {
    font-size: 2.75rem;
  }
`

export const Headline1 = styled.h1`
  ${h1Styles}
`

export const h2Styles = css`
  font-family: var(--Typography-headlineFontFamily);
  font-size: 1.75rem;
  font-weight: var(--Typography-headlineWeight);
  line-height: 1.2;
  color: var(--Typography-headlineColor, inherit);

  ${upFromBreakpoint('small')} {
    font-size: 2.25rem;
  }
`

export const Headline2 = styled.h2`
  ${h2Styles}
`

export const h3Styles = css`
  font-family: var(--Typography-headlineFontFamily);
  font-size: 1.5rem;
  font-weight: var(--Typography-headlineWeight);
  line-height: 1.3;
  color: var(--Typography-headlineColor, inherit);

  ${upFromBreakpoint('small')} {
    font-size: 1.75rem;
  }
`

export const Headline3 = styled.h3`
  ${h3Styles}
`

export const h4Styles = css`
  font-family: var(--Typography-headlineFontFamily);
  font-size: 1.25rem;
  font-weight: var(--Typography-headlineWeight);
  line-height: 1.2;
  color: var(--Typography-headlineColor, inherit);

  ${upFromBreakpoint('small')} {
    font-size: 1.5rem;
  }
`

export const Headline4 = styled.h4`
  ${h4Styles}
`

export const sublineStyles = css`
  font-family: var(--Typography-headlineFontFamily);
  font-size: 0.75rem;
  font-weight: var(--Typography-headlineWeight);
  line-height: 1.4;
  letter-spacing: 0.15em;
  color: var(--Typography-headlineColor, inherit);
  text-transform: uppercase;
`

export const Subline = styled.div`
  ${sublineStyles}
`
