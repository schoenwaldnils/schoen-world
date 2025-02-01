// import Link from 'next/link'
import { Logo } from '@/components/Logo'

import css from './Header.module.css'

export const Header = () => {
  return (
    <header className={css.Header}>
      <Logo />
      {/* <nav>
        <ul className="flex gap-6">
          <li>
            <Link
              href="/"
              className="text-gray-500 dark:text-gray-300 hover:text-white transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="text-gray-500 dark:text-gray-300 hover:text-white transition-colors"
            >
              Blog
            </Link>
          </li>
        </ul>
      </nav> */}
    </header>
  )
}
