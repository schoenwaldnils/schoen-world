import { Link } from '@/components/Link'
import { Theme, ThemeSwitch } from '@/components/ThemeSwitch'
import css from './Footer.module.css'
import { cookies } from 'next/headers'

export const Footer = ({ theme }: { theme: Theme }) => {
  const socialLinks = [
    { name: 'github', href: 'https://github.com/schoenwaldnils', newTab: true },
    {
      name: 'linkedin',
      href: 'https://www.linkedin.com/in/schoenwaldnils',
      newTab: true,
    },
    {
      name: 'bluesky',
      href: 'https://bsky.app/profile/schoen.world',
      newTab: true,
    },
    {
      name: 'mastodon',
      href: 'https://mastodon.social/@schoenwaldnils',
      newTab: true,
    },
    {
      name: 't̶w̶i̶t̶t̶e̶r̶ x',
      href: 'https://x.com/schoenwaldnils',
      newTab: true,
    },
  ]

  const legalLinks = [{ name: 'imprint', href: '/imprint', newTab: false }]

  return (
    <footer className={css.footer}>
      <div className={css.footerNav}>
        {socialLinks.map((link) => {
          const props = {
            className: css.footerLink,
            href: link.href,
          }

          return (
            <Link key={link.name} {...props}>
              {link.name}
            </Link>
          )
        })}
      </div>

      <div className="flex items-center">
        <p className={css.footerText}>
          &copy; {new Date().getFullYear()} Nils Schönwald
        </p>
      </div>

      <div className={css.footerNav}>
        {legalLinks.map((link) => (
          <Link key={link.name} href={link.href} className={css.footerLink}>
            {link.name}
          </Link>
        ))}
      </div>

      <ThemeSwitch theme={theme} />
    </footer>
  )
}
