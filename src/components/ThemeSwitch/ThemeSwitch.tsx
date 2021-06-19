import { FC, useEffect, useRef, useState } from 'react'

import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '../../utils/localStorage'
import { Theme, ThemeSwitchView } from './ThemeSwitchView'

export const ThemeSwitch: FC = (props) => {
  const docRef = useRef<HTMLBodyElement>()
  const [theme, setTheme] = useState<Theme>()

  useEffect(() => {
    if (!docRef.current) {
      docRef.current = document.firstElementChild as HTMLBodyElement
    }
  }, [])

  useEffect(() => {
    docRef.current.setAttribute('color-scheme', theme)
  }, [theme])

  useEffect(() => {
    if (!theme) {
      const localTheme = getLocalStorage('theme')
      setTheme((localTheme as Theme) || 'auto')
    } else if (theme !== 'auto') {
      setLocalStorage('theme', theme)
    } else {
      removeLocalStorage('theme')
    }
  }, [theme])

  return <ThemeSwitchView {...props} setTheme={setTheme} theme={theme} />
}
