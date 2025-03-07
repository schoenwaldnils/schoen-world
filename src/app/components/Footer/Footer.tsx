import css from './Footer.module.css'

export const Footer = () => {
  const links = [
    { name: '@schoenwaldnils', url: 'https://x.com/schoenwaldnils' },
    { name: 'github', url: 'https://github.com/schoenwaldnils' },
    { name: 'linkedin', url: 'https://www.linkedin.com/in/schoenwaldnils' },
  ]

  return (
    <footer className={css.footer}>
      {links.map((link) => (
        <a
          key={link.name}
          className={css.footerLink}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.name}
        </a>
      ))}
    </footer>
  )
}
