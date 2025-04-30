import './globals.css'
import './normalize.css'
import './theme.css'
import './typography.css'

import { getCookie } from 'cookies-next/server'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { ViewTransitions } from 'next-view-transitions'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Theme } from '@/components/ThemeSwitch'

export const metadata: Metadata = {
  title: 'Nils Schönwald - Frontend Developer',
  description: 'Frontend Developer based in Hamburg',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const theme = await getCookie('theme', { cookies })

  return (
    <ViewTransitions>
      <html lang="en" data-theme={theme || null}>
        <body>
          <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-between gap-8 px-8 md:gap-16">
            <Header />
            <main className="mx-auto">{children}</main>
            <Footer theme={theme as Theme} />
          </div>
        </body>
      </html>
    </ViewTransitions>
  )
}
