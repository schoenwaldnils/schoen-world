import './normalize.css'
import './globals.css'
import './theme.css'
import './typography.css'
import './highlightjs.css'

import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { ViewTransitions } from 'next-view-transitions'

import { BackgroundBlobs } from '@/components/BackgroundBlobs'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { getServerSideURL } from '@/utils/getBaseURL'

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
  title: 'Nils Schönwald - Frontend Developer',
  description: 'Frontend Developer based in Hamburg',
  metadataBase: new URL(getServerSideURL()),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ViewTransitions>
      <html lang="en" className={`${Raleway.variable}`}>
        <body className="flex min-h-screen flex-col justify-between px-8">
          <BackgroundBlobs />
          <Header className="mx-auto w-full max-w-4xl" />
          <main className="mx-auto w-full max-w-2xl">{children}</main>
          <Footer className="mx-auto w-full max-w-4xl" />
        </body>
      </html>
    </ViewTransitions>
  )
}
