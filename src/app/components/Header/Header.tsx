import { Link } from 'next-view-transitions'

import { Logo } from '@/components/Logo'
import { cn } from '@/utils/cn'

import css from './Header.module.css'

export const Header = ({ className }: { className?: string }) => {
  return (
    <header className={cn(css.Header, className)}>
      <Link href="/" aria-label="Logo with link to home page">
        <Logo className="w-3xs" />
      </Link>

      <nav>
        <ul className="flex gap-6">
          <li>
            <Link
              href="/til"
              className="p-3 text-gray-700 transition-colors hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-white"
            >
              /til
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
