import './normalize.css'
import './globals.css'
import './theme.css'
import './typography.css'
import './highlightjs.css'

import { getCookie } from 'cookies-next/server'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { cookies } from 'next/headers'
import { ViewTransitions } from 'next-view-transitions'

import { BackgroundBlobs } from '@/components/BackgroundBlobs'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Theme } from '@/components/ThemeSwitch'

import { getServerSideURL } from './utils/getURL'

const Raleway = localFont({
  src: [
    {
      path: '/fonts/Raleway/Raleway-VariableFont_wght.ttf',
      style: 'normal',
    },
  ],
  variable: '--font-raleway',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Nils Schönwald - Frontend Developer',
    template: '%s | Nils Schönwald',
  },
  description: 'Software engineer and tinkerer.',
  metadataBase: new URL(getServerSideURL()),
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const theme = await getCookie('theme', { cookies })

  return (
    <ViewTransitions>
      <html
        lang="en"
        data-theme={theme || null}
        className={`${Raleway.variable}`}
      >
        <body className="flex min-h-screen flex-col justify-between px-8">
          <BackgroundBlobs />
          <Header className="mx-auto w-full max-w-4xl" />
          <main className="mx-auto w-full max-w-2xl">{children}</main>
          <Footer theme={theme as Theme} className="mx-auto w-full max-w-4xl" />
        </body>
      </html>
    </ViewTransitions>
  )
}
