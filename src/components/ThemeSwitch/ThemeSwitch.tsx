import { FC, useCallback } from 'react'

import { Theme } from '../../@types/Theme'
import { SET_THEME, useStore } from '../../provider/Store'
import { ThemeSwitchView } from './ThemeSwitchView'

export const ThemeSwitch: FC = () => {
  const { store, dispatch } = useStore()

  const setTheme = useCallback(
    (theme: Theme) => {
      dispatch({ type: SET_THEME, theme })
    },
    [dispatch],
  )

  return <ThemeSwitchView setTheme={setTheme} theme={store.theme} />
}
