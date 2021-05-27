import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { colors } from '../../data/colors'
import { upFromBreakpoint } from '../../utils/mixins'

export const h1Styles = css`
  font-size: 2rem;
  font-weight: 400;
  line-height: 1.1;
  color: ${colors.typographyHeadline1Color};

  ${upFromBreakpoint('small')} {
    font-size: 2.75rem;
  }
`

export const Headline1 = styled.h1`
  ${h1Styles}
`

export const h2Styles = css`
  font-size: 1.75rem;
  font-weight: 400;
  line-height: 1.2;
  color: ${colors.typographyHeadline2Color};

  ${upFromBreakpoint('small')} {
    font-size: 2.25rem;
  }
`

export const Headline2 = styled.h2`
  ${h2Styles}
`

export const h3Styles = css`
  font-size: 1.5rem;
  font-weight: 400;
  color: ${colors.typographyHeadline3Color};

  ${upFromBreakpoint('small')} {
    font-size: 1.75rem;
  }
`

export const Headline3 = styled.h3`
  ${h3Styles}
`

export const h4Styles = css`
  font-size: 1.25rem;
  font-weight: 400;
  color: ${colors.typographyHeadline4Color};

  ${upFromBreakpoint('small')} {
    font-size: 1.5rem;
  }
`

export const Headline4 = styled.h4`
  ${h4Styles}
`

export const sublineStyles = css`
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: 0.15em;
  color: ${colors.typographySublineColor};
  text-transform: uppercase;
`

export const Subline = styled.div`
  ${sublineStyles}
`
