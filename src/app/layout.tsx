import './globals.css'
import type { Metadata } from 'next'
import { Inter, Raleway } from 'next/font/google'
import { ViewTransitions } from 'next-view-transitions'
import Header from '@/components/Header'
import Avatar from '@/components/Avatar'
import Footer from '@/components/Footer'

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
      <html lang="en" className={`${inter.variable} ${raleway.variable}`}>
        <body className="flex flex-col min-h-svh max-w-6xl mx-auto antialiased">
          <Header />
          <main className="flex-grow max-w-2xl mx-auto px-4 py-20">
            <Avatar />
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ViewTransitions>
  )
}
