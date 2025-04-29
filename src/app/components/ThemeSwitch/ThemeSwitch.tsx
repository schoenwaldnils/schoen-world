'use client'

import { Fragment, useCallback, useEffect, useState } from 'react'
import { SunIcon, MoonIcon, SunMoonIcon } from 'lucide-react'
import css from './ThemeSwitch.module.css'
import { cookies } from 'next/headers'
import { setCookie } from '@/actions'
import { deleteCookie } from '@/actions'

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

  const handleSetTheme = useCallback(async (newTheme: Theme) => {
    if (newTheme === 'system') {
      await deleteCookie('theme')
      document.documentElement.removeAttribute('data-theme')
    } else {
      await setCookie('theme', newTheme)
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
            onChange={() => handleSetTheme(id as Theme)}
            id={`theme-${id}`}
            name="theme"
            checked={theme === id}
            className={css.input}
            aria-label={`Set theme to ${id}`}
            aria-hidden={true}
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
