import { AppProps } from 'next/dist/next-server/lib/router/router'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import { ReactNode } from 'react'

import { Favicons } from '../components/Favicons'
import { GlobalStyles } from '../components/GlobalStyles'
import { twitter } from '../data/config'
import { seo } from '../data/seo'
import { StoreProvider } from '../provider/Store/StoreProvider'

const TimelineApp = ({ Component, pageProps }: AppProps): ReactNode => {
  return (
    <>
      <Head>
        <Favicons />
      </Head>

      <DefaultSeo
        defaultTitle={seo.title}
        description={seo.description}
        defaultOpenGraphImageWidth={200}
        defaultOpenGraphImageHeight={200}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: seo.url,
          images: [
            {
              url: seo.images.w200,
            },
          ],
        }}
        twitter={{
          cardType: 'summary',
          site: twitter.username,
        }}
      />

      <StoreProvider>
        <GlobalStyles />

        <Component {...pageProps} />
      </StoreProvider>
    </>
  )
}

export default TimelineApp
