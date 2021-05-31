const baseColors = {
  black: '#000000',
  almostblack: '#181818',
  charcoal: '#323537',
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

const lightColors = {
  ...baseColors,

  bodyBackground: baseColors.white,
  bodyColor: baseColors.charcoal,
  headerBackground: baseColors.charcoal,
  headerColor: baseColors.white,

  socialIconColor: baseColors.white,
  socialIconBackground: baseColors.grayDark,

  footerColor: baseColors.white,
  footerBackground: baseColors.charcoal,

  postTeaserHeadline: baseColors.grayDark,

  typographyHeadline1Color: 'inherit',
  typographyHeadline2Color: 'inherit',
  typographyHeadline3Color: 'inherit',
  typographyHeadline4Color: 'inherit',
  typographyHeadline5Color: 'inherit',
  typographyHeadline6Color: 'inherit',
  typographySublineColor: 'inherit',

  typographyLinkColor: baseColors.brand,
  typographyLinkHover: baseColors.charcoal,
  typographyLinkActive: baseColors.charcoal,

  typographyHr: baseColors.brand,

  codeInlineColor: baseColors.black,
  codeInlineBackground: baseColors.grayLightest,

  avatarBackground: baseColors.white,
}

export const getColors = (isDark: boolean): typeof lightColors => {
  if (isDark) {
    return {
      ...lightColors,

      bodyBackground: baseColors.almostblack,
      bodyColor: baseColors.grayLight,

      codeInlineColor: baseColors.white,
      codeInlineBackground: baseColors.grayDark,
    }
  }

  return lightColors
}

export const colors = getColors(false)
