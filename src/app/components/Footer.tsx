const Footer = () => {
  const links = [
    { name: '@schoenwaldnils', url: 'https://x.com/schoenwaldnils' },
    { name: 'github', url: 'https://github.com/schoenwaldnils' },
    { name: 'linkedin', url: 'https://www.linkedin.com/in/schoenwaldnils' },
  ]

  return (
    <footer className="flex justify-center mt-12 mb-12 space-x-4">
      {links.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 dark:text-gray-400 hover:text-brand-light hover:dark:text-brand-lighter link-underline"
        >
          {link.name}
        </a>
      ))}
    </footer>
  )
}

export default Footer
