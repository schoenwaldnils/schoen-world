import Link from 'next/link'

import { Logo } from '@/components/Logo'

import css from './Header.module.css'

export const Header = () => {
  return (
    <header className={css.Header}>
      <Logo />
      <nav>
        <ul className="flex gap-6">
          <li>
            <Link
              href="/til"
              className="text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              /til
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
