import Document, { Head, Html, Main, NextScript } from 'next/document'
import { ReactNode } from 'react'

const SchoenWorldDoc = (): ReactNode => {
  return (
    <Html lang="en">
      <Head />
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
