'use client'

import { deleteCookie, setCookie } from 'cookies-next/client'
import { MoonIcon, SunIcon, SunMoonIcon } from 'lucide-react'
import { Fragment, useCallback, useState } from 'react'

import css from './ThemeSwitch.module.css'

export type Theme = 'dark' | 'light' | 'system'

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

export const ThemeSwitch = ({ theme: initialTheme }: { theme: Theme }) => {
  const [theme, setTheme] = useState<Theme>(initialTheme)

  const handleSetTheme = useCallback((newTheme: Theme) => {
    if (newTheme === 'system') {
      deleteCookie('theme')
      document.documentElement.removeAttribute('data-theme')
    } else {
      setCookie('theme', newTheme)
      document.documentElement.setAttribute('data-theme', newTheme)
    }

    setTheme(newTheme)
  }, [])

  return (
    <div className={css.container}>
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
    </div>
  )
}
