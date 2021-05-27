import { css } from '@emotion/react'

import { colors } from '../../data/colors'

export default css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    word-break: break-word;
  }

  *:focus {
    outline: solid 2px ${colors.info};
  }

  html {
    /* stylelint-disable-next-line max-line-length */
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
      sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-size: 16px;
    font-weight: 500;
    line-height: 1.5;
    font-display: swap;
  }

  body {
    display: flex;
    flex-direction: column;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${colors.bodyColor};
    text-rendering: optimizeLegibility;
    background-color: ${colors.bodyBackground};
  }

  /* textarea:focus,
  input:focus {
    outline: 1px solid var(--color-green);
  } */

  h1,
  h2,
  h3,
  h4,
  p {
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

  img {
    max-width: 100%;
    height: auto;
  }

  button {
    color: inherit;
  }
`
