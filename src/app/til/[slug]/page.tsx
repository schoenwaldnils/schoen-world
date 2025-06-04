import { notFound } from 'next/navigation'

import { MDX } from '@/components/MDX'
import { getTilPost, getTilPostsMetadata } from '@/lib/utils/content'
import { formatDate } from '@/lib/utils/formatDate'

export function generateStaticParams() {
  const posts = getTilPostsMetadata()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getTilPost(slug)

  if (!post) {
    return {
      title: 'Not Found',
      description: 'The post you are looking for does not exist.',
    }
  }

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      type: 'article',
      publishedTime: post.metadata.publishedAt,
      url: `/til/${post.slug}`,
      images: [
        {
          url: post.metadata.image
            ? post.metadata.image
            : `/og?title=${encodeURIComponent(post.metadata.title)}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metadata.title,
      description: post.metadata.description,
      images: [
        post.metadata.image
          ? post.metadata.image
          : `/og?title=${encodeURIComponent(post.metadata.title)}`,
      ],
    },
  }
}

export default async function TilPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getTilPost(slug)

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
