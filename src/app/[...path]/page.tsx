import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import qs from 'query-string'

import { MDX } from '@/components/MDX'
import { getPage, listPagePaths } from '@/utils/content'

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

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: urlPath,
      images: [
        {
          url: `/og?${qs.stringify({ title, description })}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
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

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            headline: page.metadata.title,
            description: page.metadata.description,
            url: urlPath,
            author: {
              '@type': 'Person',
              name: 'Nils Schönwald',
            },
          }),
        }}
      />
      <article className="prose">
        <MDX source={page.content} />
      </article>
    </>
  )
}
