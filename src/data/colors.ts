const baseColors = {
  black: '#323537',
  grayDark: '#444444',
  gray: '#777777',
  grayLight: '#cccccc',
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
  bodyColor: baseColors.black,
  headerBackground: baseColors.black,
  headerColor: baseColors.white,

  socialIconColor: baseColors.white,
  socialIconBackground: baseColors.grayDark,

  footerColor: baseColors.white,
  footerBackground: baseColors.black,

  postTeaserHeadline: baseColors.grayDark,

  typographyHeadline1Color: 'inherit',
  typographyHeadline2Color: 'inherit',
  typographyHeadline3Color: 'inherit',
  typographyHeadline4Color: 'inherit',
  typographyHeadline5Color: 'inherit',
  typographyHeadline6Color: 'inherit',
  typographySublineColor: 'inherit',

  typographyLinkColor: baseColors.brand,
  typographyLinkHover: baseColors.black,
  typographyLinkActive: baseColors.black,

  typographyHr: baseColors.brand,

  codeInlineColor: baseColors.white,
  codeInlineBackground: baseColors.black,

  avatarBackground: baseColors.white,
}

export const getColors = (isDark: boolean): typeof lightColors => {
  if (isDark) {
    return {
      ...lightColors,

      bodyBackground: baseColors.grayDark,
      bodyColor: baseColors.white,
    }
  }

  return lightColors
}

export const colors = getColors(false)
