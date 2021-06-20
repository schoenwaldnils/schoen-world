import { AppProps } from 'next/dist/next-server/lib/router/router'
import { DefaultSeo } from 'next-seo'
import { ReactNode } from 'react'

import { GlobalStyles } from '../components/GlobalStyles'
import { twitter } from '../data/config'
import { seo } from '../data/seo'

const TimelineApp = ({ Component, pageProps }: AppProps): ReactNode => {
  return (
    <>
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

      <GlobalStyles />

      <Component {...pageProps} />
    </>
  )
}

export default TimelineApp
