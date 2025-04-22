import { Link } from '@/components/Link/Link'
import css from './Footer.module.css'

export const Footer = () => {
  const socialLinks = [
    {
      name: 'x',
      href: 'https://x.com/schoenwaldnils',
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
    { name: 'github', href: 'https://github.com/schoenwaldnils', newTab: true },
    {
      name: 'linkedin',
      href: 'https://www.linkedin.com/in/schoenwaldnils',
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

      <p className={css.footerText}>
        &copy; {new Date().getFullYear()} Nils Schönwald
      </p>

      <div className={css.footerNav}>
        {legalLinks.map((link) => (
          <Link key={link.name} href={link.href} className={css.footerLink}>
            {link.name}
          </Link>
        ))}
      </div>
    </footer>
  )
}
