import Document, { Head, Html, Main, NextScript } from 'next/document'
import { ReactNode } from 'react'

import { Favicons } from '../components/Favicons'

const SchoenWorldDoc = (): ReactNode => {
  return (
    <Html lang="en">
      <Head>
        <Favicons />
      </Head>
      <body>
        <Main />

        <NextScript />
      </body>
    </Html>
  )
}

SchoenWorldDoc.getInitialProps = Document.getInitialProps

SchoenWorldDoc.renderDocument = Document.renderDocument

export default SchoenWorldDoc
