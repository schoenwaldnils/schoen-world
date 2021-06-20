import styled from '@emotion/styled'
import { FC } from 'react'
import { WiDaySunny, WiMoonAltWaningCrescent5 } from 'react-icons/wi'

import { MulToggle } from '../MulToggle'

const Toggle = styled(MulToggle)`
  font-size: 0.7em;
`

const IconLight = styled(WiDaySunny)`
  font-size: 1.5em;
`

const IconDark = styled(WiMoonAltWaningCrescent5)`
  font-size: 1.5em;
  transform: rotate(-30deg);
`

export type Theme = 'dark' | 'light' | 'auto'

interface ThemeSwitchViewProps {
  theme: Theme
  setTheme: (theme: Theme) => void
  isDark?: boolean
}

export const ThemeSwitchView: FC<ThemeSwitchViewProps> = ({
  theme = 'auto',
  setTheme,
}) => {
  const items = [
    {
      id: 'dark',
      node: <IconDark id="svg-moon" />,
    },
    {
      id: 'light',
      node: <IconLight id="svg-sun" />,
    },
    {
      id: 'auto',
      node: 'Auto',
    },
  ]

  return <Toggle value={theme} setValue={setTheme} items={items} />
}
