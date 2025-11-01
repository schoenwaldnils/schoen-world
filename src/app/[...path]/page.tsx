import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { MDX } from '@/components/MDX'
import { getPage, listPagePaths } from '@/utils/content'

export function generateStaticParams() {
  const pagePaths = listPagePaths()

  return pagePaths.map((path) => ({
    path,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ path: string[] }>
}): Promise<Metadata> {
  const { path } = await params
  const page = await getPage(path)

  if (!page) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    }
  }

  const urlPath =
    page.path.length === 1 && page.path[0] === 'home'
      ? ''
      : `/${page.path.join('/')}`

  return {
    title: page.metadata.title,
    description: page.metadata.description,
    openGraph: {
      title: page.metadata.title,
      description: page.metadata.description,
      type: 'website',
      url: urlPath,
      images: [
        {
          url: `/opengraph-image?title=${page.metadata.title}&description=${page.metadata.description || ''}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.metadata.title,
      description: page.metadata.description,
    },
  }
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
