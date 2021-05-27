import { css } from '@emotion/react'

import { colors } from '../../data/colors'

export const highlightJs = css`
  .hljs {
    position: relative;
    display: block;
    padding: 0.5em 1em;
    overflow-x: auto;
    line-height: 1.8;
    color: ${colors.white};
    background: ${colors.black};
  }

  .hljs.css::after,
  .hljs.yaml::after,
  .hljs.html::after {
    position: absolute;
    top: 0.15rem;
    right: 0.5rem;
    color: ${colors.grayLight};
  }

  .hljs.css::after {
    content: 'css';
  }

  .hljs.html::after {
    content: 'html';
  }

  .hljs.yaml::after {
    content: 'yaml';
  }

  /* Atelier-Cave Comment */
  .hljs-comment,
  .hljs-quote {
    color: ${colors.gray};
  }

  .hljs-attribute,
  .hljs-regexp,
  .hljs-link,
  .hljs-tag,
  .hljs-selector-id {
    color: ${colors.white};
  }

  .hljs-addition,
  .hljs-attr,
  .hljs-selector-class,
  .hljs-number,
  .hljs-meta,
  .hljs-built_in,
  .hljs-builtin-name,
  .hljs-literal,
  .hljs-type,
  .hljs-params {
    color: ${colors.orange};
  }

  .hljs-string,
  .hljs-symbol,
  .hljs-bullet {
    color: ${colors.green};
  }

  .hljs-title,
  .hljs-section,
  .hljs-variable,
  .hljs-template-variable {
    color: ${colors.blue};
  }

  .hljs-keyword,
  .hljs-name,
  .hljs-selector-tag {
    color: ${colors.redPlus1};
  }

  .hljs-deletion,
  .hljs-addition {
    display: inline-block;
    width: 100%;
    color: #19171c;
  }

  .hljs-deletion {
    background-color: ${colors.purple};
  }

  .hljs-emphasis {
    font-style: italic;
  }

  .hljs-strong {
    font-weight: bold;
  }
`
