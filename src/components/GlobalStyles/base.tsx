import { css } from '@emotion/react'

import { upFromBreakpoint } from '../../utils/mixins'

export default css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    word-break: break-word;
  }

  *:focus {
    outline: solid 2px var(--Typography-focus);
  }

  html {
    /* stylelint-disable-next-line max-line-length */
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
      sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    font-display: swap;

    ${upFromBreakpoint('medium')} {
      font-size: 20px;
    }
  }

  body {
    display: flex;
    flex-direction: column;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: var(--Body-textColor);
    text-rendering: optimizeLegibility;
    background-color: var(--Body-background);
  }

  /* textarea:focus,
  input:focus {
    outline: 1px solid var(--color-green);
  } */

  h1,
  h2,
  h3,
  h4,
  p,
  figure {
    margin: 0;
    font-weight: inherit;
    line-height: inherit;
  }

  @media print {
    h1,
    h2,
    h3,
    h4 {
      page-break-after: avoid;
    }
  }

  img,
  video,
  svg {
    max-width: 100%;
    height: auto;
  }

  button {
    color: inherit;
  }
`
