import Link from 'next/link'
import Logo from './Logo'

const Header = () => {
  return (
    <header className="flex justify-between items-center py-4 px-6">
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

export default Header
