import { notFound } from 'next/navigation'

import { CustomMDX } from '@/components/mdx'
import { formatDate, getTilPost, getTilPosts } from '@/lib/utils/content'

export function generateStaticParams() {
  const posts = getTilPosts()

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
  const post = getTilPost(slug)
  if (!post) {
    return null
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata

  const ogImage = image ? image : `/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `/til/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function TilPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getTilPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <section>
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
            description: post.metadata.summary,
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
      <h1 className="title text-2xl font-semibold tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="mt-2 mb-8 flex items-center justify-between text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
      </div>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  )
}
