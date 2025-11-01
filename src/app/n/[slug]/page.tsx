import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

import { MDX } from '@/components/MDX'
import { getNote, listNoteSlugs } from '@/utils/content'
import { formatDate } from '@/utils/formatDate'

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

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    openGraph: {
      type: 'article',
      publishedTime: post.metadata.publishedAt,
      url: `/n/${post.slug}`,
      images: [
        {
          url: `/opengraph-image?type=n&slug=${post.slug}`,
        },
        ...previousImages,
      ],
    },
    // twitter: {
    //   card: 'summary_large_image',
    //   title: post.metadata.title,
    //   description: post.metadata.description,
    // },
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
    metadata: { title, description, publishedAt, image },
    content,
  } = post

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
            dateModified: publishedAt,
            description: description,
            image: image || `/og?title=${encodeURIComponent(title)}`,
            url: `/n/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'Nils Schönwald',
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
