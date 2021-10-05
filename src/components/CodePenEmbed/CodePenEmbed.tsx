import styled from '@emotion/styled'
import Head from 'next/head'
import { FC, useEffect, useRef } from 'react'

import { ICodePenEmbedFields } from '../../@types/generated/contentful'
import { Link } from '../Typography'

const HiddenScript = styled.div`
  height: 0;
  visibility: hidden;
`

export const CodePenEmbed: FC<ICodePenEmbedFields> = ({
  title,
  username,
  id,
  height = 300,
  defaultPanes,
}) => {
  const scriptRef = useRef<HTMLDivElement>()

  useEffect(() => {
    if (scriptRef.current) {
      const script = document.createElement('script')
      script.setAttribute(
        'src',
        'https://cpwebassets.codepen.io/assets/embed/ei.js',
      )
      script.setAttribute('async', 'true')
      scriptRef.current.appendChild(script)
    }
  }, [])

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://cdpn.io" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link rel="preconnect" href="https://codepen.io" />
        <link rel="preconnect" href="https://cpwebassets.codepen.io" />
      </Head>

      <p
        data-height={height}
        data-theme-id="26304"
        data-slug-hash={id}
        data-default-tab={defaultPanes.join(',')}
        data-user={username}
        data-embed-version="2"
        data-pen-title={title}
        className="codepen"
      >
        See the Pen{' '}
        <Link href={`https://codepen.io/${username}/pen/${id}/`}>{title}</Link>{' '}
        by {username} (
        <Link href={`https://codepen.io/${username}`}>@{username}</Link>) on{' '}
        <Link href="https://codepen.io">CodePen</Link>.
      </p>
      <HiddenScript ref={scriptRef} />
    </>
  )
}
