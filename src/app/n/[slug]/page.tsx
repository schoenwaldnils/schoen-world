import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

import { MDX } from '@/components/MDX'
import { getNote, getNotes } from '@/utils/content'
import { formatDate } from '@/utils/formatDate'

export async function generateStaticParams() {
  const posts = await getNotes()

  return posts.map((post) => ({
    slug: post.slug,
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
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_URL || 'https://schoen.world',
    ),
    title: post.metadata.title,
    description: post.metadata.description,
    openGraph: {
      type: 'article',
      publishedTime: post.metadata.publishedAt,
      url: `/til/${post.slug}`,
      images: [
        {
          url: `/opengraph-image?type=til&slug=${post.slug}`,
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

  if (!post) {
    notFound()
  }

  return (
    <article>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.description,
            image: post.metadata.image
              ? post.metadata.image
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `/til/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'Nils Schönwald',
            },
          }),
        }}
      />

      <h1 className="h1">{post.metadata.title}</h1>

      <p className="mt-2 mb-8 text-sm text-neutral-600 dark:text-neutral-400">
        {formatDate(post.metadata.publishedAt)}
      </p>

      <MDX source={post.content} />
    </article>
  )
}
