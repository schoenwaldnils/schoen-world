import './normalize.css'
import './globals.css'
import './theme.css'
import './typography.css'
import './highlightjs.css'

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
        <body className="flex min-h-screen flex-col justify-between gap-8 px-8 md:gap-16">
          <Header className="mx-auto w-full max-w-4xl" />
          <main className="mx-auto w-full max-w-2xl">{children}</main>
          <Footer theme={theme as Theme} className="mx-auto w-full max-w-4xl" />
        </body>
      </html>
    </ViewTransitions>
  )
}
