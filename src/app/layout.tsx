import './normalize.css'
import './design-tokens.css'
import './globals.css'
import type { Metadata } from 'next'
import { ViewTransitions } from 'next-view-transitions'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import css from './layout.module.css'

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
      <html lang="en">
        <body>
          <div className={css.main}>
            <Header />
            <main className={css.mainContent}>{children}</main>
            <Footer />
          </div>
        </body>
      </html>
    </ViewTransitions>
  )
}
