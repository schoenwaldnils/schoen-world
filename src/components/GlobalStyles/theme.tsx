import { css, SerializedStyles } from '@emotion/react'

export const baseColors = {
  black: '#0c0c0c',
  almostblack: '#181818',
  blacklight: '#2b2b2b',
  charcoal: '#363636',
  grayDark: '#444444',
  gray: '#808080',
  grayLight: '#c0c0c0',
  grayLightest: '#e6e6e6',
  white: '#ffffff',

  brand: '#ba3e48',
  twitter: '#55acee',

  interactivePlus2: '#75addb',
  interactivePlus1: '#558fbe',
  interactive: '#246396',
  interactiveMinus1: '#164063',
  interactiveMinus2: '#113655',

  info: '#ffff00',
  warning: '#c61010',
  success: '#3eba43',

  red: '#fc3848',
  redPlus1: '#fa707d',
  orange: '#ffb86c',
  green: '#19f9d8',
  blue: '#45a9f9',
  purple: '#b084eb',
  pink: '#ff9ac1',
}

/**
 * 1. setting transparent to rgba value due to a safari bug
 *    https://css-tricks.com/thing-know-gradients-transparent-black/
 */

const themeLight = css`
  :root {
    --Theme-themeColor: ${baseColors.brand};

    --Body-background: ${baseColors.white};
    --Body-textColor: ${baseColors.charcoal};

    --Typography-linkColor: ${baseColors.brand};
    --Typography-linkHover: ${baseColors.charcoal};
    --Typography-linkActive: ${baseColors.charcoal};

    --Typography-headline1Color: 'inherit';
    --Typography-headline2Color: 'inherit';
    --Typography-headline3Color: 'inherit';
    --Typography-headline4Color: 'inherit';
    --Typography-sublineColor: 'inherit';

    --Typography-hr: ${baseColors.brand};
    --Typography-blockquoteBackground: ${baseColors.grayLightest};

    --Typography-focus: ${baseColors.info};

    --Header-background: ${baseColors.charcoal};
    --Header-color: ${baseColors.white};

    --Footer-color: ${baseColors.white};
    --Footer-background: ${baseColors.charcoal};

    --SocialIcon-color: ${baseColors.white};
    --SocialIcon-front: ${baseColors.white};
    --SocialIcon-background: ${baseColors.grayDark};

    --SocialIcon-twitter: ${baseColors.twitter};

    --Toggle-background: ${baseColors.grayLight};

    --PostTeaser-color: 'inherit';
    --PostTeaser-background: ${baseColors.white};

    --CodeInline-color: ${baseColors.black};
    --CodeInline-background: ${baseColors.grayLightest};

    --Author-color: 'inherit';
    --Author-background: var(--PostTeaser-background);

    --Avatar-borderColor: ${baseColors.charcoal};
  }
`

const themeDark = css`
  :root {
    --Body-background: ${baseColors.almostblack};
    --Body-textColor: ${baseColors.grayLight};

    --Typography-linkColor: ${baseColors.redPlus1};
    --Typography-linkHover: ${baseColors.white};
    --Typography-linkActive: ${baseColors.white};

    --Typography-blockquoteBackground: ${baseColors.blacklight};

    --Header-background: ${baseColors.black};
    --Header-color: ${baseColors.grayLight};

    --Footer-color: ${baseColors.grayLight};
    --Footer-background: ${baseColors.black};

    --SocialIcon-color: ${baseColors.grayLight};
    --SocialIcon-front: ${baseColors.white};
    --SocialIcon-background: ${baseColors.almostblack};

    --Toggle-background: ${baseColors.blacklight};

    --PostTeaser-background: ${baseColors.blacklight};

    --CodeInline-color: ${baseColors.grayLight};
    --CodeInline-background: ${baseColors.black};

    --Avatar-borderColor: ${baseColors.white};
  }
`

export const theme = (isDark: boolean): SerializedStyles => {
  if (isDark) {
    return css`
      ${themeLight}

      ${themeDark}
    `
  }

  return themeLight
}
