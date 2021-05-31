import styled from '@emotion/styled'
import { FC } from 'react'
import { WiDaySunny, WiMoonAltWaningCrescent5 } from 'react-icons/wi'

import { Toggle } from '../Toggle'

const IconLight = WiDaySunny

const IconDark = styled(WiMoonAltWaningCrescent5)`
  transform: rotate(-30deg);
`

interface ThemeSwitchViewProps {
  toggleTheme: () => void
  isDark?: boolean
}

export const ThemeSwitchView: FC<ThemeSwitchViewProps> = ({
  toggleTheme,
  isDark = false,
}) => {
  return (
    <Toggle
      left={<IconDark />}
      right={<IconLight />}
      isLeft={isDark}
      toggleIsLeft={toggleTheme}
    />
  )
}
