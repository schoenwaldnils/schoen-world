import { notFound } from 'next/navigation'

import { CustomMDX } from '@/components/mdx'
import { getAllPages, getPageContent } from '@/lib/utils/content'

export function generateStaticParams() {
  const pages = getAllPages()

  return pages.map((page) => ({
    slug: page.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = getPageContent(slug)

  if (!page) {
    return null
  }

  const { title, description } = page.metadata

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `/${slug}`,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  }
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = getPageContent(slug)

  if (!page) {
    notFound()
  }

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
            url: `/${page.slug}`,
            author: {
              '@type': 'Person',
              name: 'Nils Schönwald',
            },
          }),
        }}
      />
      <article className="prose mt-8">
        <CustomMDX source={page.content} />
      </article>
    </>
  )
}
