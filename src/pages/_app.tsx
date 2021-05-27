import { AppProps } from 'next/dist/next-server/lib/router/router'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import { ReactNode } from 'react'

import { Favicons } from '../components/Favicons'
import { GlobalStyles } from '../components/GlobalStyles'
import { twitter } from '../data/config'

const TimelineApp = ({ Component, pageProps }: AppProps): ReactNode => {
  return (
    <>
      <Head>
        <Favicons />
      </Head>
      <GlobalStyles />

      <DefaultSeo
        defaultTitle={'Schönwald'}
        description={'Thoughts on CSS, JS, and overall clean code.'}
        defaultOpenGraphImageWidth={200}
        defaultOpenGraphImageHeight={200}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: 'https://blog.schoen.world',
          images: [
            {
              url: 'https://blog.schoen.world/assets/images/icon-on-black.png',
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
          site: twitter.username,
        }}
      />

      <Component {...pageProps} />
    </>
  )
}

export default TimelineApp
