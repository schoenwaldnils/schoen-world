import { notFound } from 'next/navigation'

import { MDX } from '@/components/MDX'
import { getAllPagesMetadata, getPageContent } from '@/lib/utils/content'

export function generateStaticParams() {
  const pages = getAllPagesMetadata()

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
  const page = await getPageContent(slug)

  if (!page) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    }
  }

  return {
    title: page.metadata.title,
    description: page.metadata.description,
    openGraph: {
      title: page.metadata.title,
      description: page.metadata.description,
      type: 'website',
      url: page.slug === 'home' ? '' : `/${page.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: page.metadata.title,
      description: page.metadata.description,
    },
  }
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = await getPageContent(slug)

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
            url: page.slug === 'home' ? '' : `/${page.slug}`,
            author: {
              '@type': 'Person',
              name: 'Nils Schönwald',
            },
          }),
        }}
      />
      <article className="prose mt-8">
        <MDX source={page.content} />
      </article>
    </>
  )
}
