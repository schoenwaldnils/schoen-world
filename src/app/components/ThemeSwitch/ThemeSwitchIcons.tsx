'use clients'

import { getCookie } from 'cookies-next'
import { deleteCookie, setCookie } from 'cookies-next/client'
import { MoonIcon, SunIcon, SunMoonIcon } from 'lucide-react'
import { Fragment, useCallback, useEffect, useState } from 'react'

import css from './ThemeSwitch.module.css'

export type Theme = 'dark' | 'light' | 'system'

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

const THEME_COOKIE_NAME = 'theme'

const items: { id: Theme; icon: typeof SunIcon }[] = [
  {
    id: 'dark',
    icon: MoonIcon,
  },
  {
    id: 'light',
    icon: SunIcon,
  },
  {
    id: 'system',
    icon: SunMoonIcon,
  },
]

export const ThemeSwitchIcons = () => {
  const initialTheme = (getCookie(THEME_COOKIE_NAME) || 'system') as Theme

  const [theme, setTheme] = useState<Theme>(initialTheme)

  const preferedColorScheme = canUseDOM
    ? window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark'
    : 'dark'

  const handleSetTheme = useCallback(
    (newTheme: Theme) => {
      if (newTheme === 'system') {
        deleteCookie(THEME_COOKIE_NAME)
        document.documentElement.removeAttribute('data-theme')
      } else {
        setCookie(THEME_COOKIE_NAME, newTheme)

        if (
          (newTheme === 'dark' && preferedColorScheme !== 'dark') ||
          (newTheme === 'light' && preferedColorScheme !== 'light')
        ) {
          document.documentElement.setAttribute('data-theme', newTheme)
        }
      }

      setTheme(newTheme)
    },
    [preferedColorScheme],
  )

  useEffect(() => {
    if (canUseDOM) {
      handleSetTheme(initialTheme)
    }
  }, [])

  return (
    <>
      {items.map(({ id, icon: Icon }) => (
        <Fragment key={id}>
          <input
            type="radio"
            onChange={() => handleSetTheme(id)}
            id={`theme-${id}`}
            name="theme"
            checked={theme === id}
            className={css.input}
            aria-label={`Set theme to ${id}`}
          />
          <label htmlFor={`theme-${id}`} title={id} className={css.item}>
            <Icon size="1em" />
          </label>
        </Fragment>
      ))}
      <div className={css.indicator}>
        {items.map(({ id, icon: Icon }) => (
          <div className={css.item} key={id}>
            <Icon size="1em" />
          </div>
        ))}
      </div>
    </>
  )
}
