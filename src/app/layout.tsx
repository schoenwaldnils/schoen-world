import './normalize.css'
import './theme.css'
import './globals.css'
import './typography.css'
import type { Metadata } from 'next'
import { ViewTransitions } from 'next-view-transitions'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import css from './layout.module.css'
import { Theme, ThemeInitializer } from '@/components/ThemeSwitch'
import { cookies } from 'next/headers'

export const metadata: Metadata = {
  title: 'Nils Schönwald - Frontend Developer',
  description: 'Frontend Developer based in Hamburg',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')

  return (
    <ViewTransitions>
      <html lang="en" data-theme={theme?.value || null}>
        <head>
          <ThemeInitializer />
        </head>
        <body>
          <div className={css.main}>
            <Header />
            <main className={css.mainContent}>{children}</main>
            <Footer theme={theme?.value as Theme} />
          </div>
        </body>
      </html>
    </ViewTransitions>
  )
}
