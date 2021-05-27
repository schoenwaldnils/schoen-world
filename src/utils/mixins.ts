import { css, SerializedStyles } from '@emotion/react'

import { breakpoints } from '../data/breakpoints'

export const upFromBreakpoint = (
  breakpoint: keyof typeof breakpoints,
): string => {
  return `@media (min-width: ${breakpoints[breakpoint]}px)`
}

export const upToBreakpoint = (
  breakpoint: keyof typeof breakpoints,
): string => {
  return `@media (max-width: ${breakpoints[breakpoint] - 1}px)`
}

export const maxWidth = css`
  --maxWidth: 80rem;
  --maxWidthPadding: 1rem;
  align-self: center;
  width: 100%;
  max-width: var(--maxWidth);
  margin-right: auto;
  margin-left: auto;
  padding-right: var(--maxWidthPadding);
  padding-left: var(--maxWidthPadding);

  ${upFromBreakpoint('small')} {
    --maxWidthPadding: 2rem;
  }
`
export const maxWidthText = css`
  ${maxWidth}
  --maxWidth: 50rem;
`

export const stack = (rem = 1): SerializedStyles => css`
  > * + * {
    margin-top: ${rem}rem !important;
  }
`

export const aspectRatio = (
  ratio: number,
  position: string | false = 'relative',
): SerializedStyles => css`
  ${position && `position: ${position}`};

  > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  > picture > img,
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: left;
  }

  ::after {
    content: '';
    display: block;
    padding-top: ${(100 / ratio).toFixed(4)}%;
  }
`
