import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import qs from 'query-string'

import { MDX } from '@/components/MDX'
import { getPage, listPagePaths } from '@/utils/content'
import { getServerSideURL } from '@/utils/getBaseURL'

export function generateStaticParams() {
  const pagePaths = listPagePaths()

  return pagePaths.map((path) => ({
    path,
  }))
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ path: string[] }>
}): Promise<Metadata> => {
  const { path } = await params
  const page = await getPage(path)

  if (!page) {
    notFound()
  }

  const urlPath =
    page.path.length === 1 && page.path[0] === 'home'
      ? ''
      : `/${page.path.join('/')}`

  const {
    metadata: { title, description },
  } = page

  const ogImage = `/og?${qs.stringify({ title, description })}`
  const canonical = urlPath === '' ? '/' : urlPath

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_US',
      url: urlPath,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  } satisfies Metadata
}

export default async function Page({
  params,
}: {
  params: Promise<{ path: string[] }>
}) {
  const { path } = await params
  const page = await getPage(path)

  if (!page) {
    notFound()
  }

  const urlPath =
    page.path.length === 1 && page.path[0] === 'home'
      ? ''
      : `/${page.path.join('/')}`

  const baseURL = getServerSideURL()
  const url = `${baseURL}${urlPath || '/'}`

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: page.metadata.title,
            description: page.metadata.description,
            url,
            author: {
              '@type': 'Person',
              name: 'Nils Schönwald',
              url: baseURL,
            },
          }).replace(/</g, '\\u003c'),
        }}
      />
      <article className="prose">
        <MDX source={page.content} />
      </article>
    </>
  )
}
