import './globals.css'

import type { Metadata } from 'next'

import { Inter, Raleway } from 'next/font/google'
import { ViewTransitions } from 'next-view-transitions'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-raleway',
})

export const metadata: Metadata = {
  title: 'Nils Schönwald - Frontend Developer',
  description: 'Frontend Developer based in Hamburg',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        className={`${inter.className} ${raleway.variable} bg-white text-charcoal`}
      >
        <body className="flex flex-col min-h-svh antialiased">
          <main className="flex-grow max-w-2xl mx-auto">{children}</main>
          <Footer />
        </body>
      </html>
    </ViewTransitions>
  )
}

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
          className="text-gray-400 hover:text-brand transition-colors duration-200"
        >
          {link.name}
        </a>
      ))}
    </footer>
  )
}
