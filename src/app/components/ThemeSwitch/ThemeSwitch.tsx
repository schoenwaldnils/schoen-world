'use client'

import { Suspense } from 'react'

import css from './ThemeSwitch.module.css'
import { ThemeSwitchIcons } from './ThemeSwitchIcons'

export const ThemeSwitch = () => {
  return (
    <div className={css.container}>
      <Suspense fallback={<>{null}</>}>
        <ThemeSwitchIcons />
      </Suspense>
    </div>
  )
}
