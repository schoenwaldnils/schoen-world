import { css, Global } from '@emotion/react'
import Head from 'next/head'
import { FC, useEffect, useRef, useState } from 'react'

import { useStore } from '../../provider/Store'
import { LoadingSpinner } from '../LoadingSpinner'

const giscusStyles = css`
  .giscus,
  .giscus-frame {
    width: 100%;
  }

  .giscus-frame {
    border: none;
  }
`

export const GiscusComments: FC = () => {
  const { store } = useStore()
  const [loaded, setLoaded] = useState(false)
  const anchor = useRef<HTMLDivElement>()

  useEffect(() => {
    if (anchor.current) {
      const script = document.createElement('script')
      script.setAttribute('src', 'https://giscus.app/client.js')
      script.setAttribute('data-repo', 'schoenwaldnils/schoen-world')
      script.setAttribute('data-repo-id', 'MDEwOlJlcG9zaXRvcnkzNzEzNTc0NTA')
      script.setAttribute(
        'data-category-id',
        'MDE4OkRpc2N1c3Npb25DYXRlZ29yeTMyOTgxMzc5',
      )
      script.setAttribute('data-mapping', 'pathname')
      script.setAttribute('data-theme', store.themeIsDark ? 'dark' : 'light')
      script.setAttribute('crossorigin', 'anonymous')
      script.setAttribute('async', 'true')
      anchor.current.appendChild(script)
      setLoaded(true)
    }
  }, [store.themeIsDark])

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://giscus.app" />
      </Head>
      <Global styles={giscusStyles} />

      {!loaded && <LoadingSpinner />}

      <div ref={anchor} />
    </>
  )
}
