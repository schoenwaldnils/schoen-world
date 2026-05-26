import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import qs from 'query-string'

import { MDX } from '@/components/MDX'
import { getNote, listNoteSlugs } from '@/utils/content'
import { formatDate } from '@/utils/formatDate'
import { getServerSideURL } from '@/utils/getBaseURL'

export function generateStaticParams() {
  const slugs = listNoteSlugs()

  return slugs.map((slug) => ({
    slug,
  }))
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params
  const post = await getNote(slug)

  if (!post) {
    return {
      title: 'Not Found',
      description: 'The post you are looking for does not exist.',
    }
  }

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  const {
    metadata: { title, description, publishedAt },
  } = post

  const ogImage = `/og?${qs.stringify({ title, description })}`

  return {
    title,
    description,
    alternates: {
      canonical: `/n/${slug}`,
    },
    openGraph: {
      type: 'article',
      locale: 'en_US',
      publishedTime: publishedAt,
      modifiedTime: post.metadata.updatedAt || publishedAt,
      url: `/n/${slug}`,
      images: [{ url: ogImage }, ...previousImages],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function Notes({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getNote(slug)

  if (!post?.content) {
    notFound()
  }

  const {
    metadata: { title, description, publishedAt, updatedAt, image },
    content,
  } = post

  const baseURL = getServerSideURL()
  const url = `${baseURL}/n/${post.slug}`
  const imageURL = image
    ? new URL(image, baseURL).toString()
    : `${baseURL}/og?${qs.stringify({ title, description })}`

  return (
    <article>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: title,
            datePublished: publishedAt,
            dateModified: updatedAt || publishedAt,
            description,
            image: imageURL,
            url,
            mainEntityOfPage: { '@type': 'WebPage', '@id': url },
            author: {
              '@type': 'Person',
              name: 'Nils Schönwald',
              url: baseURL,
            },
            publisher: {
              '@type': 'Person',
              name: 'Nils Schönwald',
              url: baseURL,
            },
          }).replace(/</g, '\\u003c'),
        }}
      />

      <h1 className="h1">{title}</h1>

      {publishedAt && (
        <p className="mt-2 mb-8 text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(publishedAt)}
        </p>
      )}

      <MDX source={content} />
    </article>
  )
}
